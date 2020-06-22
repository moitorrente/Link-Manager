const addButton = document.getElementById("addButton");
const uploadButton = document.getElementById("uploadButton");
const downloadButton = document.getElementById("downloadButton");
const deleteAllButton = document.getElementById("deleteAllButton");
const openAllButton = document.getElementById("openAllButton");
const clearButton = document.getElementById("clearButton");
const modalSaveButton = document.getElementById("modalSaveButton");
const modalDeleteButton = document.getElementById("modalDeleteButton");
const inputName = document.getElementById("inputName");
const inputNameModal = document.getElementById("inputNameModal");
const inputLink = document.getElementById("inputLink");
const inputLinkModal = document.getElementById("inputLinkModal");
const fileDownloadName = document.getElementById("fileDownloadName");
const fileDownloadExtension = document.getElementById("fileDownloadExtension");
const fileSelector = document.getElementById('inputGroupFile04');
const titulo = document.getElementById('titulo');

addButton.addEventListener("click", add);
uploadButton.addEventListener("click", load);
downloadButton.addEventListener("click", download);
clearButton.addEventListener("click", clear);
modalSaveButton.addEventListener("click", update);
modalDeleteButton.addEventListener("click", deleteFromModal);
deleteAllButton.addEventListener("click", deleteAll);
openAllButton.addEventListener("click", openAll);
fileSelector.addEventListener('change', (event) => {
    const fileList = event.target.files;
    getAsText(fileList[0]);
});

let file;
let list;

let linkObjList = [];

const exampleList = {
    name: 'Nombre de ejemplo',
    elements: 4,
    data: [
        {
            url: 'http://www.google.es',
            name: 'Google'
        },
        {
            url: 'http://www.twitter.es',
            name: 'Twitter'
        },
        {
            url: 'http://www.nodesign.dev',
            name: 'NoDesignDev'
        },
        {
            url: 'http://www.stackoverflow.com',
            name: 'StackOverflow'
        }
    ]
}




function load() {
    titulo.value = file.name;
    for (let i = 0; i < file.data.length; i++) {
        addRow(file.data[i].url, file.data[i].name);
    }
}

function add() {
    if (inputLink.value == "" || inputName.value == "") {
        return false;
    }
    let url = "http://www." + inputLink.value;
    addRow(url, inputName.value);
    clear();
}

function clear() {
    inputName.value = null;
    inputLink.value = null;
}

function addRow(url, name) {
    let div = document.createElement('div');

    div.className = 'input-group mb-2 link-row';
    div.innerHTML = `
    <div class="input-group-prepend">
        <span class="input-group-text" id="basic-addon1">
            <img src="http://s2.googleusercontent.com/s2/favicons?sz=16&domain_url=${url}"alt="Link">
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

    let obj = {
        name: name,
        url: url
    }

    linkObjList.push(obj);
}

function removeRow(input) {
    let borrar = confirm("¿Estás seguro que quieres borrar el link?");
    if (borrar) {
        let url = input.parentNode.parentNode.childNodes[3].getAttribute("href");
        for (let i = 0; i < linkObjList.length; i++) {

            if (linkObjList[i].url == url) {
                linkObjList.splice(i, 1);
                break;
            }
        }

        input.parentNode.parentNode.remove();
    }
}

function addModalData(input) {
    context = input;
    let childrens = input.parentNode.parentNode.childNodes;
    inputLinkModal.value = childrens[3].getAttribute("href").substring(11);
    inputNameModal.value = childrens[3].innerHTML;
}


function update() {
    for (let i = 0; i < linkObjList.length; i++) {
        if (linkObjList[i].name == context.parentNode.parentNode.childNodes[3].innerHTML) {
            linkObjList[i].url = "http://www." + inputLinkModal.value;
            linkObjList[i].name = inputNameModal.value;
            break;
        }
    }
    context.parentNode.parentNode.childNodes[3].innerHTML = inputNameModal.value;
    context.parentNode.parentNode.childNodes[3].setAttribute("href", "http://www." + inputLinkModal.value);
    context.parentNode.parentNode.childNodes[1].childNodes[1].childNodes[1].setAttribute("src", "http://s2.googleusercontent.com/s2/favicons?domain_url=http://www." + inputLinkModal.value);
}

function deleteFromModal() {
    removeRow(context);
}

function download() {
    const obj = {
        name: titulo.value,
        elements: linkObjList.length,
        data: linkObjList
    }

    const text = JSON.stringify(obj);
    const extension = fileDownloadExtension.options[fileDownloadExtension.value].innerText;
    const filename = fileDownloadName.value + extension;
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

function deleteAll() {
    let borrar = confirm("¿Estás seguro que quieres borrar todos los links?");
    if (borrar) {
        let element = document.getElementsByClassName("link-row");
        for (let i = element.length - 1; i >= 0; i--) {
            element[i].parentNode.removeChild(element[i]);
        }
        linkObjList.length = 0;
    }
}

function openAll() {
    for (let i = 0; i < linkObjList.length; i++) {
        window.open(linkObjList[i].url, '_blank');
    }
}

$(".custom-file-input").on("change", function () {
    var fileName = $(this).val().split("\\").pop();
    $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
});


function getAsText(fileToRead) {
    let reader = new FileReader();
    reader.readAsText(fileToRead);
    reader.onload = loadHandler;
    reader.onerror = errorHandler;
}

function loadHandler(event) {
    file = JSON.parse(event.target.result);
    load(file);
}

function errorHandler(evt) {
    if (evt.target.error.name == "NotReadableError") {
        alert("No se puede leer el fichero");
    }
}
