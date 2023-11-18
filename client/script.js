// HTTP request object...
const http = new coreHTTP;

// Static elements that the user will interact with.
const addButton = document.getElementById("addButton");
const textInput = document.getElementById("textInput");
const listOutput = document.getElementById("listOutput");

// The information from the database is loaded into this array when the app starts.
let taskElements = [];

// Creates a new element in the HTML doccument.
function createElement(element, listIndex) {

    let elementInnerHTML;

    if (element.completed === true) {

        elementInnerHTML = `<div data-index="${listIndex}">
        <input type="checkbox" class = complete checked>
        <p class="task" style="text-decoration-line: line-through">${element.name}</p>
        <button type="button" class="delete">Delete</button>
        <button type="button" class="edit">Edit</button>
        </div>`;
    }
    else {

        elementInnerHTML = `<div data-index="${listIndex}">
        <input type="checkbox" class = complete>
        <p class="task">${element.name}</p>
        <button type="button" class="delete">Delete</button>
        <button type="button" class="edit">Edit</button>
        </div>`;
    }

    listOutput.innerHTML = elementInnerHTML + listOutput.innerHTML;
}

// User input disable.
function disableInput() {

    listOutput.innerHTML = "";
    addButton.setAttribute("disabled", "");
    textInput.setAttribute("disabled", "");
}

// User input enable.
function enableInput() {

    addButton.removeAttribute("disabled");
    textInput.removeAttribute("disabled");
}

// Gets all documents from the database and creates the taskElements array.
async function loadData() {

    await http.get("/tm/tasks");

    if (http.error) {

        console.log(http.content);
    }
    else {

        // Elements from the database are added to the taskElements array.
        let dbResponse = JSON.parse(http.content);
        taskElements = dbResponse.tasksAll;
        
        for (let i = 0; i < taskElements.length; i++) {
            
            createElement(taskElements[i], i);
        }
    }
}

// Sends a post request to the server based on the the selected element in the taskElements array.
async function postData(newElement) {

    disableInput();

    await http.post("/tm/tasks", JSON.stringify(newElement));

    if (http.error) {

        console.log(http.content);
    }
    else {

        await loadData();
    }

    enableInput();
}

// Sends a put request to the server based on the selected element in the taskElements array.
async function updateData(elementIndex) {

    disableInput();

    await http.put("/tm/tasks", JSON.stringify(taskElements[elementIndex]));

    if (http.error) {

        console.log(http.content);
    }
    else {

        await loadData();
    }

    enableInput();
}

// Sends a delete request to the server based on the the selected element in the taskElements array.
async function deleteData(elementIndex) {

    disableInput();

    await http.delete(`/tm/tasks/${taskElements[elementIndex]._id}`);

    if (http.error) {

        console.log(http.content);
    }
    else {

        await loadData();
    }

    enableInput();
}

async function addButtonAndEnter() {

    // If the update data member of the add button is populated it means that the element at that index is being updated.
    if (addButton.dataset.update) {

        // If the user tries to update with an empty string they delete the task. (There is no task left!)
        if (textInput.value === "") {

            await deleteData(addButton.dataset.update);
            addButton.removeAttribute("style");
            addButton.value = "Add";
            addButton.dataset.update = "";
            return;
        }

        // The updated information is updated in the database.
        taskElements[addButton.dataset.update].name = textInput.value;
        await updateData(addButton.dataset.update);

        // The add button regains its original functionality.
        addButton.removeAttribute("style");
        addButton.value = "Add";
        addButton.dataset.update = "";
    }
    else if (textInput.value !== "") {

        // A new element is added to the database and the tasks are refreshed.
        listOutput.innerHTML = "";
        await postData({name: textInput.value, completed: false});
    }

    textInput.value = "";
}

// addButtonAndEnter function is called when the add button is clicked.
addButton.addEventListener("click", () => {
    
    addButtonAndEnter();
});

// addButtonAndEnter function is called whenever the enter button is clicked.
textInput.addEventListener("keydown", async (event) => {

    if (event.key === "Enter") {

        addButtonAndEnter();
    }
});

/**
 * This event listener listens for events within all dynamically created data. Different functions are applied based on
 * which class of object is interacted with.
 */
listOutput.addEventListener("click", async (event) => {

    // The whole HTML element that is impacted.
    const element = event.target.parentNode;

    // The specific target element within the parent element.
    const targetChild = event.target;

    // User defined value of the element.
    const elementValue = element.querySelector(".task").innerHTML;

    // The index of the object representation of the element in the taskElements list.
    const elementIndex = element.dataset.index;

    if (targetChild.matches(".delete")) {

        // If a delete button is clicked the associated task is deleted.
        listOutput.innerHTML = "";
        await deleteData(elementIndex);

        textInput.value = "";
    }
    else if (targetChild.matches(".edit")) {

            /* If the edit button is clicked all tasks are temporaraly removed so that the user does not interact with them. */
            listOutput.innerHTML = `<p class="task">Updating Task: "${elementValue}"</p>`;
            textInput.value = elementValue;
            addButton.style = "background-color: #122be6";
            addButton.value = "Save";
            addButton.dataset.update = elementIndex;
    }
    else if (targetChild.matches(".complete")) {

        // When the complete button is clicked the task completion is changed to the opposite value.
        taskElements[elementIndex].completed = !(taskElements[elementIndex].completed);
        await updateData(elementIndex);

        textInput.value = "";
    }
});

// Data from the server is loaded when the app is initially started.
async function main() {
    
    disableInput();
    await loadData();
    enableInput();
}

main();