let tasks = [];
let categoryId;
let categoryColor;
let contacts  = [];
let chosenContacts = [];
let chosenContact = false;
let subtasks = [];
let priority = [];
setURL('https://gruppe-08i.developerakademie.net/smallest_backend_ever');

// load data  contacts from backendserver
async function initAddTaskPage() {
    await downloadFromServer();
    
    contacts = JSON.parse(backend.getItem('contacts')) || [];
    // console.log(contacts);
    renderContacts();
    document.getElementById('added-to-task-1').classList.remove('display-flex');
}

function priorityRed() {
    priority = "Urgent";
    let red = document.getElementById('PopUpMM_Priority_Labels_red');
    let yellow = document.getElementById('PopUpMM_Priority_Labels_yellow');
    let green = document.getElementById('PopUpMM_Priority_Labels_green');
    let urgent_img = document.getElementById('urgent_img');
    let medium_img = document.getElementById('medium_img');
    let low_img = document.getElementById('low_img');  
    red.classList.add('PopUpMM_Priority_Labels_red');
    yellow.classList.remove('PopUpMM_Priority_Labels_yellow');
    green.classList.remove('PopUpMM_Priority_Labels_green');  
    urgent_img.src="assets/img/prio_white arrows.svg";
    medium_img.src="assets/img/prio-medium.svg";
    low_img.src="assets/img/prio-low.svg";
    yellow.classList.add('PopUpMM_Priority_Labels_white');
    green.classList.add('PopUpMM_Priority_Labels_white');
    
}

function priorityYellow() {
    priority = "Medium";
    let yellow = document.getElementById('PopUpMM_Priority_Labels_yellow');
    let green = document.getElementById('PopUpMM_Priority_Labels_green');
    let red = document.getElementById('PopUpMM_Priority_Labels_red');
    let medium_img = document.getElementById('medium_img');
    let low_img = document.getElementById('low_img');
    let urgent_img = document.getElementById('urgent_img'); 
    yellow.classList.add('PopUpMM_Priority_Labels_yellow');
    green.classList.remove('PopUpMM_Priority_Labels_green');
    red.classList.remove('PopUpMM_Priority_Labels_red');  
    medium_img.src="assets/img/Capa 1_equals_evenWhite.svg";
    low_img.src="assets/img/prio-low.svg";
    urgent_img.src="assets/img/prio-urgent.svg";
    green.classList.add('PopUpMM_Priority_Labels_white');
    red.classList.add('PopUpMM_Priority_Labels_white');
}

function priorityGreen() {
    priority = "Low";
    let green = document.getElementById('PopUpMM_Priority_Labels_green');
    let red = document.getElementById('PopUpMM_Priority_Labels_red');
    let yellow = document.getElementById('PopUpMM_Priority_Labels_yellow');
    let low_img = document.getElementById('low_img');
    let urgent_img = document.getElementById('urgent_img');
    let medium_img = document.getElementById('medium_img');   
    green.classList.add('PopUpMM_Priority_Labels_green');
    red.classList.remove('PopUpMM_Priority_Labels_red');
    yellow.classList.remove('PopUpMM_Priority_Labels_yellow');   
    low_img.src="assets/img/Capa 1_whiteArrowsDown.svg";
    urgent_img.src="assets/img/prio-urgent.svg";
    medium_img.src="assets/img/prio-medium.svg";
    red.classList.add('PopUpMM_Priority_Labels_white');
    yellow.classList.add('PopUpMM_Priority_Labels_white');
}

function showCategorys() {
    document.getElementById('all-contacts').classList.remove('display-flex');
    let categorys = document.getElementById('all-categorys');

    if (categorys.classList.contains('display-flex')) {
        categorys.classList.remove('display-flex');
        categorys.innerHTML = '';
        document.getElementById('drop-down-box1').classList.remove('padding-bottom');
    } else {
        categorys.classList.add('display-flex');
        categorys.innerHTML += createCategorys();
        document.getElementById('drop-down-box1').classList.add('padding-bottom');
    }
}

function createCategorys() {
    return `
        <div class="category-color" onclick="createNewCategory()">
            <span class="category-text">New category</span>
        </div>
        <div class="category-color" onclikc="setCategory('Design', '#2AD300')">
            <span class="category-text">Design</span>
            <div class="color-point-green"></div>
        </div>
        <div class="category-color" onclick="setCategory('Backoffice', '#FF8A00')">
            <span class="category-text">Backoffice</span>
            <div class="color-point-orange"></div>
        </div>
        <div class="category-color" onclick="setCategory('Sales', '#E200BE')">
            <span class="category-text">Sales</span>
            <div class="color-point-lila"></div>
        </div>
        <div class="category-color" onclick="setCategory('Marketing', '#8AA4FF')">
            <span class="category-text">Marketing</span>
            <div class="color-point-lightblue"></div>
        </div>
    `;
}

function setCategory(category, color) {
    let categorys = document.getElementById('all-categorys');
    categorys.classList.remove('display-flex');
    categorys.innerHTML = '';
    document.getElementById('drop-down-box1').classList.remove('padding-bottom');
    document.getElementById('select-category').innerHTML = '';
    document.getElementById('select-category').innerHTML += showChosenCategory(category, color);
    categoryId = document.getElementById('chosen-category').innerHTML;
    categoryColor = color;
    checkForCategory();
}

function createCategorys() {
    return `
        <div class="category-color" onclick="createNewCategory()">
            <span class="category-text">New category</span>
        </div>
        <div class="category-color" onclick="setCategory('Design', '#2AD300')">
            <span class="category-text">Design</span>
            <div class="color-point-green"></div>
        </div>
        <div class="category-color" onclick="setCategory('Backoffice', '#FF8A00')">
            <span class="category-text">Backoffice</span>
            <div class="color-point-orange"></div>
        </div>
        <div class="category-color" onclick="setCategory('Sales', '#E200BE')">
            <span class="category-text">Sales</span>
            <div class="color-point-lila"></div>
        </div>
        <div class="category-color" onclick="setCategory('Marketing', '#8AA4FF')">
            <span class="category-text">Marketing</span>
            <div class="color-point-lightblue"></div>
        </div>
    `;
}

function showChosenCategory(category, color) {
    return `
        <div class="chosen-category-div">
            <span id="chosen-category" class="category-text chosen-text bg-white">${category}</span>
            <div style="background-color: ${color};" class="color-point"></div>
        </div>
    `;
}

//  Check if user already chose a category, if no ---> show text that choosing category is required
function checkForCategory() {
    if (categoryId == undefined) {
        document.getElementById('text-category-required').classList.add('display-flex');
    } else {
        document.getElementById('text-category-required').classList.remove('display-flex');
    }
}

// Create input field for the user to write a name for a new category
function createNewCategory() {
    document.getElementById('all-categorys').classList.remove('display-flex');
    document.getElementById('drop-down-box1').classList.remove('padding-bottom');
    document.getElementById('drop-down-box1').innerHTML = '';
    document.getElementById('drop-down-box1').innerHTML += showInputNewCategory();


    if (document.getElementById('colors-new-category').classList.contains('d-none')) {
        document.getElementById('colors-new-category').classList.remove('d-none');
    } else {
        document.getElementById('colors-new-category').innerHTML += createColorPicker();
        document.getElementById('text-category-required').classList.remove('display-flex');
    }
}

function showInputNewCategory() {
    return `
        <div class="new-div-category-input">
            <input id="input-new-cat" class="input-new-cat" type="text" placeholder="New category name">
            <div id="color-div-new"></div>
            <div class="container-icons-subtask div-new-cat" id="container-icons">
                <img onclick="createOldCategorys()" id="x-mark-new-cat" class="x-mark-subtask" src="../assets/img/icon-x.svg">
                <div id="border-line" class="border-line"></div>
                <img onclick="saveNewCategory()" class="hook" id="hook-category" src="../assets/img/icon-check2.svg">
            </div>
        </div>
    `;
}

function createOldCategorys() {
    document.getElementById('colors-new-category').classList.add('d-none');
    document.getElementById('text-category-required-name').classList.remove('display-flex');
    document.getElementById('drop-down-box1').innerHTML = '';
    document.getElementById('drop-down-box1').innerHTML += showOldCategorys();
    categoryId = undefined;
    categoryColor = undefined;
}

function createColorPicker() {
    return `
        <div onclick="choseColor('color-point-lightblue', '#8AA4FF')" class="color-point-lightblue"></div>
        <div onclick="choseColor('color-point-red', '#FF0000')" class="color-point-red"></div>
        <div onclick="choseColor('color-point-green', '#2AD300')" class="color-point-green"></div>
        <div onclick="choseColor('color-point-orange', '#FF8A00')" class="color-point-orange"></div>
        <div onclick="choseColor('color-point-lila', '#E200BE')" class="color-point-lila"></div>
        <div onclick="choseColor('color-point-darkblue', '#0038FF')" class="color-point-darkblue"></div>
    `;
}
function choseColor(className, color) {
    document.getElementById('colors-new-category').classList.add('d-none');
    document.getElementById('color-div-new').innerHTML += showChosenColor(className);
    categoryColor = color;
}
function showChosenColor(className) {
    return `
        <div class="${className}"></div>
    `;
}

function showOldCategorys() {
    return `
        <div onclick="showCategorys()" class="input-div-new">
            <span id="select-category" >Select task category</span>
            <img class="arrow-down" src="assets/img/icon-dropdown.svg">
        </div>
        <div class="all-categorys" id="all-categorys"></div>
    `;
}

// Check the requirements for saving new category name with color
function saveNewCategory() {
    let input = document.getElementById('input-new-cat').value;
    if (input.length == 0 || categoryColor == undefined) {
        document.getElementById('text-category-required-name').classList.add('display-flex');
    } else {
        document.getElementById('hook-category').classList.add('d-none');
        document.getElementById('border-line').classList.add('d-none');
        document.getElementById('x-mark-new-cat').classList.add('padding-left-30');
        categoryId = document.getElementById('input-new-cat').value;
        document.getElementById('text-category-required-name').classList.remove('display-flex');
        
    }
}

// show contacts from backend server
function showContacts() {
    // document.getElementById('all-categorys').classList.remove('display-flex');
    let contacts = document.getElementById('all-contacts');

    if (contacts.classList.contains('display-flex')) {
        contacts.classList.remove('display-flex');
        document.getElementById('drop-down-box').classList.remove('padding-bottom');
    } else {
        contacts.classList.add('display-flex');
        document.getElementById('drop-down-box').classList.add('padding-bottom');
    }
}

//  render contacts from backend 
function renderContacts() {
    let contacts2 = document.getElementById('all-contacts');
    contacts2.innerHTML = '';

    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];
        
        contacts2.innerHTML += createContacts(contact, i);
        
    }
}

function createContacts(contact, i) {
    return `
        <div class="container-contacts">
            <span style="margin: 0;">${contact["firstname"]} ${contact["surname"]}</span>
            <input onclick="checkIfChecked('checkbox${i}', ${i})" id="checkbox${i}" class="contact-checkbox" type="checkbox" name="box">
        </div>
    `;
}

// function checkbox if the current contact already chosen and in task
function checkIfChecked(id, i) {
    let check = contacts[i]["checked"];
    chosenContacts = [];
    for (let j = 0; j < contacts.length; j++) {
        let contact = contacts[j];

        let assignedTo = document.getElementById(`checkbox${j}`);
        if (assignedTo.checked == true) {
            let names = {
                        "firstname": contact["firstname"],
                        "lastname": contact["surname"],
                        "color": `farbe${j}`,
                        "ID": j,
                        'checked': true,          
                    }
                    chosenContacts.push(names);
        }  
    }
    renderContactsInits(chosenContacts);
}
function checkForChosenContact() {
    if (chosenContact == true) {
        document.getElementById('contact-required').classList.add('display-flex');
    } else {
        document.getElementById('contact-required').classList.remove('display-flex');
    }
}
function renderContactsInits(chosenContacts){
    let contactinitialscolor = document.getElementById('chosen-contacts');
    contactinitialscolor.innerHTML = "";
    for (let u = 0; u < chosenContacts.length; u++) {
        let contact = chosenContacts[u];
        // console.log(contact);
        contactinitialscolor.innerHTML += `
            <div class="chosencontacts ${contact["color"]}" id="chosencontacts${u}">${contact["firstname"].charAt(0)} ${contact["lastname"].charAt(0)}
        </div>`;
    }
}
function changeSubtaskInput() {
    let subtaskInput = document.getElementById('subtask-div');
    subtaskInput.innerHTML = '';
    subtaskInput.innerHTML += createNewSubtaskInput();
    document.getElementById('new-subtask').focus();
}
function createNewSubtaskInput() {
    return `
            <input class="input-subtask" type="text" id="new-subtask" placeholder="New Subtask">
            <div class="container-icons-subtask">
                <img onclick="showOldInput()" class="x-mark-subtask" src="assets/img/icon-x.svg">
                <div class="border-line"></div>
                <img onclick="setNewSubtask()" class="hook" src="assets/img/icon-check2.svg">
            </div>
    `;
}
function setNewSubtask() {
    let subcontent = document.getElementById('new-subtask').value;
    let newSubtask = document.getElementById('new-subtask-div');

    if (subcontent.length == 0) {
        document.getElementById('subtask-required').classList.add('display-flex');
    } else {
        newSubtask.innerHTML += newCheckBox(subcontent);
        let subtask = {
            'subtask': subcontent,
            'id': new Date().getTime(),
            'checked': false,
        }
        subtasks.push(subtask);
        let input = document.getElementById('subtask-div');
        input.innerHTML = '';
        input.innerHTML += createOldSubtastInput();
        document.getElementById('subtask-required').classList.remove('display-flex');
    }
}

function newCheckBox(subcontent) {
    return `
        <div >
            <input type="checkbox">
        <span class="subtask-text">${subcontent}</span>
        </div>
    `;
}

function showOldInput() {
    let input = document.getElementById('subtask-div');
    input.innerHTML = '';
    input.innerHTML += createOldSubtastInput();
    document.getElementById('subtask-required').classList.remove('display-flex');
}

function createOldSubtastInput() {
    return `
        <input class="input-subtask" type="text" placeholder="Add new subtask" onclick="changeSubtaskInput()">
        <img onclick="changeSubtaskInput()" src="assets/img/icon-add-plus-dark.svg">
    `;
}

function cancelNewTask() {
    document.getElementById('input-title').value = '';
    document.getElementById('input-description').value = '';
    document.getElementById('all-contacts').classList.remove('display-flex');
    document.getElementById('drop-down-box').classList.remove('padding-bottom');
    document.getElementById('input-date-add-task').value = '';
    document.getElementById('new-subtask-div').innerHTML = '';
    document.getElementById('text-category-required').classList.remove('display-flex');
    document.getElementById('contact-required').classList.remove('display-flex');
    document.getElementById('prio-required').classList.remove('display-flex');
    chosenContacts.splice(0);
    createOldCategorys();
    clear();
    renderContacts();
    document.getElementById('PopUpMM_Priority_Labels_red').classList.remove('PopUpMM_Priority_Labels_red');
    document.getElementById('PopUpMM_Priority_Labels_yellow').classList.remove('PopUpMM_Priority_Labels_yellow');
    document.getElementById('PopUpMM_Priority_Labels_green').classList.remove('PopUpMM_Priority_Labels_green');
}

function clear() {
    categoryId = undefined;
    categoryColor = undefined;
    chosenContact = false;
    chosenContacts.splice(0);
    let contactinitialscolor = document.getElementById('chosen-contacts');
    contactinitialscolor.innerHTML = "";
}

// add task function push in tasks 
function addNewTask() {
    let title = document.getElementById('input-title').value;
    let description = document.getElementById('input-description').value;
    let date = document.getElementById('input-date-add-task').value;

    let task = {
        'id': new Date().getTime(),
        "titles": title,
        'descriptions': description,
        'labels': categoryId,
        // 'labels': currentChosenCategory,
        'labelColor': categoryColor,
        'assignedto': chosenContacts,
        'dueDate': date,
        'prio': priority,
        'subtasks': subtasks,
        "category": "TASKS_todo"
    }


    // "ID": 0,
    // "titles": "Neue Webseite - online Termin",
    // "descriptions": "Neue JavaScript Funktionen und Spezial-Effekte müssen noch eingebaut werden",
    // "labels": "Design",
    // "Personell": "Front-End Developer",
    // "Dates": "2023-06-01",
    // "Priorities": "Urgent",
    // // "Subtasks": subtask,
    // "category": "TASKS_todo",

    tasks.push(task);
    console.log(tasks);
    checkForCategory();
    checkForChosenContact();
    pushTaskinBackend(tasks);
}


async function pushTaskinBackend(tasks){
    await backend.setItem('tasks', JSON.stringify(tasks));
}