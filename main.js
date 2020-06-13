const addButton = document.getElementById("addButton");
const clearButton = document.getElementById("clearButton");
const modalSaveButton = document.getElementById("modalSaveButton");
const inputName = document.getElementById("inputName");
const inputNameModal = document.getElementById("inputNameModal");
const inputLink = document.getElementById("inputLink");
const inputLinkModal = document.getElementById("inputLinkModal");

addButton.addEventListener("click", add);
clearButton.addEventListener("click", clear);
modalSaveButton.addEventListener("click", update);

let context;

function add() {
    let url = "http://www." + inputLink.value; 
    addRow(url, inputName.value);
}

function clear() {
    inputName.value = null;
    inputLink.value = null;
}

function addRow(url, name) {
    let div = document.createElement('div');

    div.className = 'input-group mb-2';
    div.innerHTML = `
    <div class="input-group-prepend">
        <span class="input-group-text" id="basic-addon1">
            <img src="http://s2.googleusercontent.com/s2/favicons?domain_url=${url}"alt="Link">
        </span>
    </div>
    <a href="${url}" target="_blank" class="form-control">${name}</a>
    <div class="input-group-append" id="button-addon4">
        <button class="btn btn-outline-success" type="button" data-toggle="modal" data-target="#exampleModalCenter" onclick="addModalData(this)">
            <svg class="bi bi-pencil" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd"
                    d="M11.293 1.293a1 1 0 0 1 1.414 0l2 2a1 1 0 0 1 0 1.414l-9 9a1 1 0 0 1-.39.242l-3 1a1 1 0 0 1-1.266-1.265l1-3a1 1 0 0 1 .242-.391l9-9zM12 2l2 2-9 9-3 1 1-3 9-9z" />
                <path fill-rule="evenodd"
                    d="M12.146 6.354l-2.5-2.5.708-.708 2.5 2.5-.707.708zM3 10v.5a.5.5 0 0 0 .5.5H4v.5a.5.5 0 0 0 .5.5H5v.5a.5.5 0 0 0 .5.5H6v-1.5a.5.5 0 0 0-.5-.5H5v-.5a.5.5 0 0 0-.5-.5H3z" />
            </svg>
        </button>
        <button class="btn btn-outline-danger" type="button" onclick="removeRow(this)">
             <svg class="bi bi-trash" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                <path fill-rule="evenodd"
                    d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
             </svg>
        </button>
    </div>
    `;
    document.getElementById("linkContainer").appendChild(div);
    clear();
}

function removeRow(input){
    let borrar = confirm("¿Estás seguro que quieres borrar el link?");
    if (borrar){
        input.parentNode.parentNode.remove();
    }
}

function addModalData(input){
    context = input;
    let childrens = input.parentNode.parentNode.childNodes;
    inputLinkModal.value = childrens[3].getAttribute("href").substring(11);
    inputNameModal.value = childrens[3].innerHTML;
}

function update(){
    console.log("Descripcion modal: " + inputNameModal.value);
    console.log("Link modal: " + inputLinkModal.value);
    context.parentNode.parentNode.childNodes[3].innerHTML = inputNameModal.value;
    context.parentNode.parentNode.childNodes[3].setAttribute("href", "http://www." + inputLinkModal.value);
    context.parentNode.parentNode.childNodes[1].childNodes[1].childNodes[1].setAttribute("src", "http://s2.googleusercontent.com/s2/favicons?domain_url=http://www." + inputLinkModal.value);
}