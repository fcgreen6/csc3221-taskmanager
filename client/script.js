// HTTP request object...
const http = new coreHTTP;

// Static elements that the user will interact with.
const addButton = document.getElementById("addButton");
const textInput = document.getElementById("textInput");
const listOutput = document.getElementById("listOutput");

// The information from the database is loaded into this array when the app starts.
let taskElements = [];

// When the user adds a new task, the value of the text input is sent to the create element function.
addButton.addEventListener("click", () => {

    createElement(textInput.value);
});

/* This event listener handles any interaction the user has with dynamically generated elements.
The listener checks if the user has pressed the edit, delete, or complete buttons and calls the necessary function. */
listOutput.addEventListener("click", (event) => {

    if (event.target.matches(".delete")) {

        event.target.parentNode.remove();
    }
});

function createElement(elementValue, listIndex) {
    
    let elementInnerHTML = `<div data-index="${listIndex}>
    <p>${elementValue}</p>
    <button type="button" class="delete">Delete</button>
    <button type="button" class="complete">Complete</button>
    <button type="button" class="edit">Edit</button>
    </div>`;

    listOutput.innerHTML += elementInnerHTML;
}

function updateDatabase() {

}

async function loadData() {

    await http.get("/tm/tasks");

    if (http.error) {

        console.log(http.content);
    }
    else {

        // Elements from the database are added to an array and are only loaded from the database when it is first started.
        let dbResponse = JSON.parse(http.content);
        taskElements = dbResponse.tasksAll;
        
        for (let i = 0; i < taskElements.length; i++) {
            
            createElement(taskElements[i].name, taskElements[i]);
        }
    }
}

async function main() {
    
    await loadData();
    console.log("done");
}

main();