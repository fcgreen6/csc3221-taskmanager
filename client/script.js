const addButton = document.getElementById("addButton");
const textInput = document.getElementById("textInput");
const listOutput = document.getElementById("listOutput");

addButton.addEventListener("click", createElement);

function createElement() {
    
    let elementInnerHTML = `<li>
    <p>${textInput.value}</p>
    <button type="button" class="delete"></button>
    </li>`;

    listOutput.innerHTML += elementInnerHTML;

    const deleteButton = listOutput.lastChild.querySelector(".delete");
}

