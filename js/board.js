let priority = [];
let tasks = [];
let contacts = [];  // obwohl Daten vom Backend heruntergeladen werden, benötigen wir an dieser Stelle eigentlich kein lokales Array, um die Daten zwischenzuspeichern oder abzurufen. 
let chosenContacts = [];


/* --BackEnd Anbindung-- */

setURL('http://join.orhan-kacar.com/smallest_backend_ever');

async function init() {
    await downloadFromServer();
    contacts = JSON.parse(backend.getItem('contacts')) || [];
    tasks = JSON.parse(backend.getItem('tasks')) || [];
    console.log(tasks);
    // console.log(contacts);
    updateHTML();
}

/* -- lokales Array - Tasks-Beispieleinträge -- */

// let tasks = [
//     {
//     "ID": 0,
//     "titles": "Neue Webseite - online Termin",
//     "descriptions": "Neue JavaScript Funktionen und Spezial-Effekte müssen noch eingebaut werden",
//     "labels": "Design",
//     "Personell": "Front-End Developer",
//     "Dates": "2023-06-01",
//     "Priorities": "Urgent",
//     // "Subtasks": subtask,
//     "category": "TASKS_todo",
//     },
//     {
//     "ID": 1,
//     "titles": "Präsentation",
//     "descriptions": "Produktpräsentation unseres neuen Produkts 'Pokemon-Sammelalbum' ",
//     "labels": "Marketing",
//     "Personell": "Satoshi Nakamoto",
//     "Dates": "2023-05-01",
//     "Priorities": "Medium",
//     // "Subtasks": subtask,
//     "category": "TASKS_todo",
//     },  
//     {
//     "ID": 2,
//     "titles": "Druckerpapier bestellen",
//     "descriptions": "20 Pakete mit 80g-Papier(recyclet)",
//     "labels": "Backoffice",
//     "Personell": "Sebastian Grundig",
//     "Dates": "2023-04-21",
//     "Priorities": "Low",
//     // "Subtasks": subtask,
//     "category": "TASKS_todo",
//     },
//     {
//     "ID": 3,
//     "titles": "Kaffee Einkaufen",
//     "descriptions": "100 Pack Kaffee (aromatisch)",
//     "labels": "Backoffice",
//     "Personell": "Sebastian Grundig",
//     "Dates": "2023-07-21",
//     "Priorities": "Low",
//     // "Subtasks": subtask,
//     "category": "TASKS_inProgress",
//     }
// ];


/* --Search Funktionen-- */

function search() {
    let search = document.getElementById('searchTask').value;
    search = search.toLowerCase();
    generateEmptyBoard();
    for (let t = 0; t < tasks.length; t++) {
        let task = tasks[t];
        if(task['titles'].toLowerCase().includes(search) || task['descriptions'].toLowerCase().includes(search)) {
            document.getElementById(`${task[`category`]}`).innerHTML += templatePostit(task, t);
            renderPostit_Assignees(task, t);
        }
    }

}


/**
 * This function clear all tasks on the board
 */
function generateEmptyBoard() {
    document.getElementById('TASKS_todo').innerHTML = '';
    document.getElementById('TASKS_inProgress').innerHTML = '';
    document.getElementById('TASKS_awaitingFeedback').innerHTML = '';
    document.getElementById('TASKS_done').innerHTML = '';
}


/* --Highlight-Funktionen-- */

function highlight (id) {
    document.getElementById(id).classList.add('drag-area-highlight');
}


function removeHighlight (id) {
    document.getElementById(id).classList.remove('drag-area-highlight');
}


/* --Drag'N Drop Funktionen-- */


let currentDraggedElement;


function startDragging(ID) {           // löst den div-Container aus der normalen Strutur - zum Ziehen (Drag) - und weißt gleichzeitig eine eindeutige ID zu
    currentDraggedElement = ID;         
    console.log(currentDraggedElement);
}


function allowDrop(ev) {        // diese Funktion verändert das Standartverhalten von div-Containern, so, dass, wir ein Drag'nDrop-Element überhaupt über einem div-Conatiner abwerfen können
    ev.preventDefault();
}


// Drag'N Drop Hauptfunktion: Ist für die Zuweisung der neuen Category im Array-Tasks[] zuständig
function moveTo(category) {
    let index = tasks.findIndex((draggedElement) => draggedElement.id == currentDraggedElement);
    tasks[index]['category'] = category; // z.B. das Array tasks[{}]-Objekt mit ID 1: Das Feld 'category' ändert sich zu 'TASKS_inProgress' oder 'TASKS_todo'
    saveTask();
    updateHTML();
}
    

// damit nach Drag'N Drop die neue Category auch im Backend gespeichert wird, führen wir anschließend die saveTask() aus
async function saveTask() {
    await backend.setItem('tasks', JSON.stringify(tasks));
    console.log("Task saved");
}


/* --Filter/Render-Funktion-- */


function updateHTML() {            // diese Renderfunktion filtert die Objekte des JSON-Arrays zunächst nach 'category'. Entsprechend der zugewiesenen 'Standartcategory' werden diese direkt in die jeweiligen TASK-Felder hinein gerendert. Sämtliche JSON-Array Informationen werden durch die for-Schleifen ausgelesen und per 'element' und 'i' weitergegeben an die templatePostit () Funktion.
                                    // hängt eng mit Drag'N Drop zusammen, da zuerst gefiltert wird
    let open = tasks.filter(t => t['category'] == 'TASKS_todo');
    // console.log(open);
    document.getElementById('TASKS_todo').innerHTML = '';

    for (let i = 0; i < open.length; i++) {
        const element = open[i];
        // console.log(open);
        document.getElementById('TASKS_todo').innerHTML += templatePostit(element, i); renderPostit_Assignees(element, i);
        
    }


    let TASKS_inProgress = tasks.filter(t => t['category'] == 'TASKS_inProgress');
    
    document.getElementById('TASKS_inProgress').innerHTML = '';

    for (let i = 0; i < TASKS_inProgress.length; i++) {
        const element = TASKS_inProgress[i];
        document.getElementById('TASKS_inProgress').innerHTML += templatePostit(element, i); renderPostit_Assignees(element, i);

    }


    let TASKS_awaitingFeedback = tasks.filter(t => t['category'] == 'TASKS_awaitingFeedback');
    
    document.getElementById('TASKS_awaitingFeedback').innerHTML = '';

    for (let i = 0; i < TASKS_awaitingFeedback.length; i++) {
        const element = TASKS_awaitingFeedback[i];
        document.getElementById('TASKS_awaitingFeedback').innerHTML += templatePostit(element, i); renderPostit_Assignees(element, i);

    }


    let TASKS_done = tasks.filter(t => t['category'] == 'TASKS_done');
    
    document.getElementById('TASKS_done').innerHTML = '';

    for (let i = 0; i < TASKS_done.length; i++) {
        const element = TASKS_done[i];
        document.getElementById('TASKS_done').innerHTML += templatePostit(element, i); renderPostit_Assignees(element, i);

    }
    
}


function templatePostit(element,i) {
    return `
        <div draggable="true" ondragstart="startDragging(${element['id']})" onclick="slideIn(${i})" class="postIt" id="postIt">
        <div class="postItInterior">
            <div class="postIt_Head">
                <div class="postIt_Labels" id="postIt_Labels${i}" style="background-color: ${element['labelColor']}">${element['labels']}</div>
                <div class="postIT_Headline">${element['titles']}</div>
                <div class="postIt_TaskDescriptions">${element['descriptions']}</div>
            </div>
            <div class="postIt_Body">
                <div class="postIt_ProgressBar"></div>
                <div class="postIt_StatusAccomplished"></div>
            </div>
            <div class="postIt_Bottom">
                    <div class="postIt_Assignees" id="assignedStaff${element.id}">
                        
                    </div>
                    
                    <div id="postIt_PriorityClass" class="postIt_PriorityClass ${element['prio']}"></div>
                
            </div>
        </div>
    </div>
    `;
}


                                                    // diese Funktion soll auf den postIts die Assignees rendern
                                                    //das i als Input - woher? Vom Postit Feld mit id="assignedStaff${i}"?? Das müsste die Verknüpfung sein...
function renderPostit_Assignees(element, i){                
    let AssignedStaff = document.getElementById(`assignedStaff${element.id}`);
    AssignedStaff.innerHTML = '';

    for (let index = 0; index < element['assignedto'].length; index++) {
        let Assignee = element['assignedto'][index];
        // console.log(Assignee);
        AssignedStaff.innerHTML += `
        
        <div id="contact-initials" class="contact-initials ${Assignee['color']}">${Assignee['firstname'].charAt(0)}${Assignee['lastname'].charAt(0)}</div>
        `;
        
    }
    
}


/*  --PoPup Container--  */


function assignedToConnection(i){                   // diese Funktion soll innerhalb des geöffneten PopUpContainers die Assigned People rendern + anzeigen
    let assignedToConnection = document.getElementById(`Assignees${i}`);
    assignedToConnection.innerHTML = '';
    for (let c = 0; c < tasks[i]['assignedto'].length; c++) {
        let Assignee = tasks[i]['assignedto'][c];
        // console.log(Assignee);
        assignedToConnection.innerHTML += templateRender_PopUpAssignees(Assignee);
    }

}


function templateRender_PopUpAssignees(Assignee){
    return `
    <div class="PopUp_Assignees">
        <div id="contact-initials" class="contact-initials ${Assignee['color']}">${Assignee['firstname'].charAt(0)}${Assignee['lastname'].charAt(0)}</div>
        <div class="PopUp_Assign_people_names">${Assignee['firstname']} ${Assignee['lastname']}</div>
    </div>
    `;

}


function renderPopUpContainer(i) {
    let regularPopUpContainer = document.getElementById('popUpBackground');

    regularPopUpContainer.innerHTML = "";
    regularPopUpContainer.innerHTML = `

        <div id="popUpContainer" class="PopUpContainer">
        <img onclick="slideOut()" id="closePopUpContainer" class="xicon" src="assets/img/icon-x.svg" alt="">

        <div class="PopUpInterior">
            <div class="PopUp_Head">
                <div class="PopUp_Labels" id="LabelColor">${tasks[i]['labels']}</div>
                <div class="PopUp_Headline">${tasks[i]['titles']}</div>
                <div class="PopUp_Task">${tasks[i]['descriptions']}</div>
                
            </div>
            <div class="PopUp_Body">
                <div class="PopUp_Body_top">
                    <div class="PopUp_DueDate_1">Due Date:</div>
                    <div class="PopUp_DueDate_2">${tasks[i]['dueDate']}</div>
                </div>
                <div class="PopUp_Body_mid">
                    <div class="PopUp_Priority">Priority:</div>
                    <div class="PopUp_Priority_Label PopUp_${tasks[i]['prio']}"></div>
                </div>
                <div class="PopUp_Body_sub">
                    <div class="PopUp_Assign_title">Assigned to:</div>
                    
                </div>
            </div>
            <div id="PopUp_Bottom" class="PopUp_Bottom">
                <div id="Assignees${i}" class="PopUp_Assign_people">
                    <div id="contact-initials" class="contact-initials ">HS</div>
                    <div class="PopUp_Assign_people_names">Jolly Jumper</div>
                </div>
            </div>

            <div>
                <button onclick="renderPopUpContainer_modModus(${i})" class="editbtn"><img src="assets/img/pencil-no-bg.svg" alt=""></button>
            </div>
        </div>
    </div>
    `;
    document.getElementById('LabelColor').style.backgroundColor = tasks[i]['labelColor'];
}


/*  --PoPup Container_modModus--  */


function renderPopUpContainer_modModus(i) {
    Container_modModus = document.getElementById('popUpBackground');

    Container_modModus.innerHTML = "";
    Container_modModus.innerHTML = `

        <div id="popUpContainer" class="PopUpMMContainer">
        <img onclick="slideOut(${i})" class="xicon" src="assets/img/icon-x.svg" alt="">

        <div class="PopUpMM_Interior">
            <div class="PopUpModModus_Head">
            
                <div class="PopUpMM_title">Title</div>
                <input id="PopUpMM_title${i}" placeholder="Enter a title">
                
                <div class="PopUpMM_Description">Description</div>
                <textarea id="PopUpMM_Description_textarea${i}" placeholder="Enter a description"></textarea>
                
            </div>

            <div class="PopUpModModus_Body">
                
                    <div class="PopUpMM_DueDate_1">Due Date</div>
                    <input type="date" id="PopUpMM_dueDate${i}">
                                        
                    <div class="PopUpMM_Priority">Priority</div>
                    <div id="PoPUpMM_prioSetting" class="PopUpMM_Priority_Labels">
                        
                        <button onclick="priorityRed()" id="PopUpMM_Priority_Labels_red" class="PopUpMM_Priority_Labels_white">Urgent<img id="urgent_img" src="assets/img/prio-urgent.svg"></button>
                        <button onclick="priorityYellow()" id="PopUpMM_Priority_Labels_yellow" class="PopUpMM_Priority_Labels_white">Medium<img id="medium_img" src="assets/img/prio-medium.svg"></button>
                        <button onclick="priorityGreen()" id="PopUpMM_Priority_Labels_green" class="PopUpMM_Priority_Labels_white">Low<img id="low_img" src="assets/img/prio-low.svg"></button>
                    </div>      
            </div>

            <div class="PopUpModModus_Bottom">

                <div class="PopUpMM_assignedTo">
                        <div class="PopUpMM_Assign_title">Assigned to</div>
                        <div id="drop-down-box" class="PopUpMM_drop-down-box bg-white">
                            <div onclick="showContacts(${i})" class="PopUpMM_input-new-category">
                                    <span>Select contacts to assign</span>
                                    <img class="arrow-down" src="assets/img/icon-dropdown.svg">
                            </div>
                            <div class="all-contacts" id="all-contacts"></div>
                                <span class="PopUpMM_subtask-required" id="contact-required">Please choose at least one contact</span>

                            </div>
                        </div>

                        <div class="PopUpMM_chosen-contacts" id="chosen-contacts">
                                    
                            <!-- render checked contacts under selectoption -->
                        </div>
                </div>

                <div id ="PopUpMM_Assign_PeopleLogo" class="PopUpMM_Assign_PeopleLogo"></div>
            </div>

            <div>
                <button onclick="PUSH_PopUp_modModus_Modifications(${i})" id="PushBTN" class="editbtn"><img src="assets/img/pencil-no-bg.svg" alt=""></button>
            </div>
        </div>
    </div>
    </div>
    `; renderPopUp_modModus_Inside(i);
    showContacts(i);
}


function renderPopUp_modModus_Inside(i) {
    let PopUpMM_title = document.getElementById(`PopUpMM_title${i}`);
    let PopUpMM_Description_textarea = document.getElementById(`PopUpMM_Description_textarea${i}`);
    let PopUpMM_dueDate = document.getElementById(`PopUpMM_dueDate${i}`);
    
    PopUpMM_title.value = '';                    // Wenn input-Felder ausgelesen oder BESCHRIEBEN werden, dann benutzt man immer .value -- NICHT .innerHTML 
    PopUpMM_Description_textarea.value = '';    // Auch wenn textarea-Feldern ausgelesen oder BESCHRIEBEN werden, dann benutzt man immer .value -- NICHT .innerHTML 
    PopUpMM_dueDate.value = '';

    PopUpMM_title.value = tasks[i].titles;
    PopUpMM_Description_textarea.value = tasks[i].descriptions;
    PopUpMM_dueDate.value = tasks[i][`dueDate`];

    if (tasks[i]['prio'] == 'Urgent') {priorityRed()
    }

    if (tasks[i]['prio'] == 'Medium') {priorityYellow()
    }

    if (tasks[i]['prio'] == 'Low') {priorityGreen()
    }

}


// show contacts from backend server
function showContacts(i) {      
    let contacts = document.getElementById('all-contacts'); 

    if (contacts.classList.contains('display-flex')) {
        contacts.classList.remove('display-flex');
        document.getElementById('drop-down-box').classList.remove('padding-bottom');
    } else {
        contacts.classList.add('display-flex');
        document.getElementById('drop-down-box').classList.add('padding-bottom');
    }
    renderContacts(); 
    checkContactChosen(i);
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
            <input onclick="checkIfChecked(${i})" id="checkbox${i}" class="contact-checkbox" type="checkbox" name="box">
        </div>
    `;
}


function checkContactChosen(i){
    console.log(contacts);
    for (let u = 0; u < tasks[i]['assignedto'].length; u++) {
        let con = tasks[i]['assignedto'][u];
        // console.log(con);
        let contactCheck = contacts.findIndex((contact) => contact.surname == con['lastname']);
        // console.log(contactCheck);
        if (contactCheck > -1) {
            document.getElementById(`checkbox${contactCheck}`).checked = true;
            chosenContacts.push(con);
        }
    }
    checkIfChecked(i);
}


// function checkbox if the current contact already chosen and in task
function checkIfChecked(i) {
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
            <div class="PopUpMM_chosencontacts ${contact["color"]}" id="chosencontacts${u}">${contact["firstname"].charAt(0)} ${contact["lastname"].charAt(0)}
        </div>`;
    }
}


function PUSH_PopUp_modModus_Modifications (i) {
    let title = document.getElementById(`PopUpMM_title${i}`).value;
    let description = document.getElementById(`PopUpMM_Description_textarea${i}`).value;
    let date = document.getElementById(`PopUpMM_dueDate${i}`).value;
    let prio = priority;

    let id = tasks[i]['id'];
    let labels = tasks[i]['labels'];
    let label_coulor = tasks[i]['labelColor'];
    let subtask = tasks[i]['subtasks'];
    
    let data = {
        'id': id,
        'titles': title,
        'descriptions': description,
        'labels': labels,
        'labelColor': label_coulor,
        'dueDate': date,
        'prio': prio,
        'assignedto': chosenContacts,
        'subtasks': subtask,
        "category": "TASKS_todo"
    }
    tasks.splice(i, 1, data);       //im Array tasks an Stelle i, wird ein Datensatz gelöscht und ersetzt durch 'data'
    console.log(tasks);
    pushTaskEDITinBackend(tasks);
    slideOut(i);
    init();
    updateHTML ();
}


async function pushTaskEDITinBackend(tasks){
    await backend.setItem('tasks', JSON.stringify(tasks));
}


    /* --Slide Funktionen--*/


function slideIn(i){
    let popUpBackground = document.getElementById("popUpBackground");
    let popUpContainer = document.getElementById("popUpContainer");
    popUpContainer.classList.remove('slideout');
    popUpContainer.classList.add('slidein');
    popUpContainer.classList.remove("dnone");
    popUpBackground.classList.remove('fadeout');
    popUpBackground.classList.add('fadein');
    popUpBackground.classList.remove('dnone');
    renderPopUpContainer(i);
    assignedToConnection(i);

} 


function slideOut(i) {
    
    let popUpBackground = document.getElementById("popUpBackground");
    let popUpContainer = document.getElementById("popUpContainer");
    popUpContainer.classList.add('slideout');
    popUpBackground.classList.add('fadeout');
    setTimeout(function(){document.getElementById('popUpBackground').classList.add('dnone')}, 500);
    setTimeout(function(){document.getElementById('popUpContainer').classList.add('dnone')}, 500);

    updateHTML ();
}


/* --Priority Buttons-- */


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