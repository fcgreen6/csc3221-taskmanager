// Static elements that the user will interact with.
const addButton = document.getElementById("addButton");
const textInput = document.getElementById("textInput");
const listOutput = document.getElementById("listOutput");

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

function createElement(elementValue) {
    
    let elementInnerHTML = `<li>
    <p>${elementValue}</p>
    <button type="button" class="delete"></button>
    </li>`;

    listOutput.innerHTML += elementInnerHTML;
}

function updateDatabase() {

}

function loadData() {

}

function main() {
    
}