let contacts  = [];
setURL('https://gruppe-08i.developerakademie.net/smallest_backend_ever');

async function init() {
    await downloadFromServer();
    contacts = JSON.parse(backend.getItem('contacts')) || [];
    contactinit();
    // console.log(contacts);
}

function slideIn(){
    let popup = document.getElementById("popup");
    let popUpContact = document.getElementById("mainPopUp");
    popUpContact.classList.remove('slideout');
    popUpContact.classList.add('slidein');
    popUpContact.classList.remove("dnone");
    popup.classList.remove('fadeout');
    popup.classList.add('fadein');
    popup.classList.remove('dnone');
    document.getElementById('contact-popup-name').value = '';
    document.getElementById('contact-popup-email').value = '';
    document.getElementById('contact-popup-phone').value = '';
} 

function slideOut() {
    let popup = document.getElementById("popup");
    let popUpContact = document.getElementById("mainPopUp");
    popUpContact.classList.add('slideout');
    popup.classList.add('fadeout');
    setTimeout(function(){popup.classList.add('dnone')}, 500);
    setTimeout(function(){popUpContact.classList.add('dnone')}, 500);
}

function slideInContact(){
    let contactslidein = document.getElementById(`contact-selection`);
    contactslidein.classList.add('slidein');
    setTimeout(function(){document.getElementById('contact-selection').classList.remove('slidein')}, 500);
    
} 
// popup edit slide
function slideEditIn(){
    let popup = document.getElementById("popupedit");
    let popUpContact = document.getElementById("mainPopUpedit");
    popUpContact.classList.remove('slideoutE');
    popUpContact.classList.add('slideinE');
    popUpContact.classList.remove("dnoneE");
    popup.classList.remove('fadeoutE');
    popup.classList.add('fadeinE');
    popup.classList.remove('dnoneE');
}
function slideEditOut() {
    let popup = document.getElementById("popupedit");
    let popUpContact = document.getElementById("mainPopUpedit");
    popUpContact.classList.add('slideoutE');
    popup.classList.add('fadeoutE');
    setTimeout(function(){document.getElementById('popupedit').classList.add('dnoneE')}, 500);
    setTimeout(function(){document.getElementById('mainPopUpedit').classList.add('dnoneE')}, 500);
}


// let contacts = [
//     {
        
//         "firstname": "Anton",
//         "surname": "Mayer",
//         "email": "antom@gmail.com",
//         "phone": "491111111111",
//     },
//     {
        
//         "firstname": "Anja",
//         "surname": "Schulz",
//         "email": "schulz@hotmail.com",
//         "phone": "491111111112",
//     },
//     {
        
//         "firstname": "Benedikt",
//         "surname": "Ziegler",
//         "email": "benedikt@gmail.com",
//         "phone": "491111111113",
//     },
//     {
        
//         "firstname": "David",
//         "surname": "Eisenberg",
//         "email": "davidberg@gmail.com",
//         "phone": "491111111114",
//     },
//     {
        
//         "firstname": "Eva",
//         "surname": "Fischer",
//         "email": "eva@gmail.com",
//         "phone": "491111111115",
//     },
//     {
        
//         "firstname": "Emmanuel",
//         "surname": "Mauer",
//         "email": "emmanuelMa@gmail.com",
//         "phone": "491111111116",
//     }
// ];

let sortetcontactlist = [];
let letters = [];
// let newcontact = [];
// funktionen aufruf 

function contactinit(){

    generateLetters();
    renderLetters();
    generateContactsList();

}
// firstletter sort and generate
function generateLetters(){
    letters = [];
    for (let i = 0; i < contacts.length; i++) {
        let firstletter = contacts[i]["firstname"].charAt(0);
        
        // wenn letters ein A ist und es nicht ein A beinhaltet 
        if (!letters.includes(firstletter)) {  
            letters.push(firstletter);
            // console.log(firstletter);
            letters.sort(); 
        }     
    }
}

function renderLetters() {
    let contact = document.getElementById('contact-list');
    contact.innerHTML = `` ;
    for (let i = 0; i < letters.length; i++) {
        let firstLetter = letters[i];
        contact.innerHTML += renderContacts(firstLetter, i);
        
    }
}
function renderContacts(firstLetter, i){
    return`
    <div class="contact-letter" id="contact-letter">${firstLetter}</div>
    <div class="contact-border" id="contact-border"></div>
    <div class="contact-list-order" id="contact-list-order${firstLetter}">
            
    </div>
    
    `;
}
function generateContactsList(){
    for (let i = 0; i < contacts.length; i++) {
        let contact = contacts[i];
        let firstletter = contacts[i]["firstname"].charAt(0);
        renderContactlist(i, contact, firstletter);
    }
}
function renderContactlist(i, contact, firstletter){
    let contactlist = document.getElementById(`contact-list-order${firstletter}`);
    contactlist.innerHTML += `
    <div class="contact-list-content" id="contact-list-content${i}" onclick="openContact(${i}); slideInContact()">
        <div class="contact-initials farbe${i}" id="contact-initials">${contact["firstname"].charAt(0)}${contact["surname"].charAt(0)}
        </div>
        <div class="contact-name" id="contact-name">
            <span>${contact["firstname"]} ${contact["surname"]}</span>
            <a href="mailto: ${contact["email"]}">${contact["email"]}</a>
        </div>
    </div>`;
}

function openContact(i){
    let contact = contacts[i];
    // console.log(contact);
    // console.log("laenge: ", contacts.length);
    let contactopen = document.getElementById('contact-selection');
    contactopen.innerHTML = "";
    contactopen.innerHTML = renderOpenContact(contact, i); 
    // contactopen.classList.add("displayON");  

    let contactopenn = document.getElementById('contact-selectionn');
    contactopenn.innerHTML = "";
    contactopenn.innerHTML = renderOpenContactmobile(contact, i);
    contactopenn.classList.add("displayON");  
    
  
    document.getElementById('contactbar').classList.add('dmobile');

    document.getElementById('openBtnn').classList.add('dnone');
    // }

}


function renderOpenContact(contact, i){
    return`    
                    <div class="contact-sel-content">
                        <div class="contact-selection-initials farbe${i}" >${contact["firstname"].charAt(0)}${contact["surname"].charAt(0)}
                        </div>
                        <div class="contact-selecetion-header">
                            <span>${contact["firstname"]} ${contact["surname"]}</span>
                            <a href="add_task.html">
                                <div class="contact-add-task" >
                                    <img src="assets/img/icon-plus-addtask.svg">
                                    <span>Add Task</span>   
                                </div>
                            </a>
                        </div>
                    </div>
                    <div class="contact-information-edit">
                        <span>Contact Information</span>
                        <div class="contact-information-edit-button" id="contact-information-edit-button" onclick="contactInformationEditButton(${i}), slideEditIn()">
                            <img src="assets/img/pencil-no-bg.svg">
                            <span>Edit Contact</span>
                        </div>
                    </div>
                    <div class="contact-information-mailphone">
                        <span>Email</span>
                        <a href="mailto: ${contact["email"]}">${contact["email"]}</a>
                        <span>Phone</span>
                        <a href="${contact["phone"]}" class="phone">${contact["phone"]}</a>
                    </div>   
    
    `;
}

function renderOpenContactmobile(contact, i){
    return`    
                    <div class="conttent">
                        <div class="content-sel-headern"><span>Kanban Project Management Tool</span></div>
                        <div class="content-sel-headerm">
                                <span>Contacts</span>
                                <span class="content-sel-headermm">Better with a Team</span>
                        </div>
                        <img src="assets/img/arrowleft.svg" onclick="backToContactList()" class="backarrow">
                    </div>
                    <div class="blueunderline"> </div>
                    <div class="contact-sel-content">
                        <div class="contact-selection-initials farbe${i}" >${contact["firstname"].charAt(0)}${contact["surname"].charAt(0)}
                        </div>
                        <div class="contact-selecetion-header">
                            <span>${contact["firstname"]} ${contact["surname"]}</span>
                            <a href="add_task.html">
                                <div class="contact-add-task" >
                                    <img src="assets/img/icon-plus-addtask.svg">
                                    <span>Add Task</span>
                                </div>
                            </a>
                            
                        </div>
                    </div>
                    <div class="contact-information-edit">
                        <span>Contact Information</span>
                        <div class="contact-information-edit-button" id="contact-information-edit-button" onclick="contactInformationEditButton(${i}), slideEditIn()">
                            <img src="assets/img/pencil-no-bg.svg">
                            <span>Edit Contact</span>
                        </div>
                    </div>
                    <div class="contact-information-mailphone">
                        <span>Email</span>
                        <a href="mailto: ${contact["email"]}">${contact["email"]}</a>
                        <span>Phone</span>
                        <a href="${contact["phone"]}" class="phone">${contact["phone"]}</a>
                    </div>   
    
    `;
}

function backToContactList(){
    
    document.getElementById('contact-selectionn').classList.remove("displayON");  
    
    document.getElementById('contactbar').classList.remove('dmobile');
    document.getElementById('openBtnn').classList.remove('dnone');

}

// button new contact push in array contacts
function addNewContact(){
    let fullname = document.getElementById('contact-popup-name').value;
    fullname = fullname.split(' ');
    firstn = fullname[0];
    lastn = fullname[1];
    let firstn2 = firstn.charAt(0).toUpperCase() + firstn.slice(1);
    let lastn2 = lastn.charAt(0).toUpperCase() + lastn.slice(1);
    let contactmail = document.getElementById('contact-popup-email').value;
    let contactphone = document.getElementById('contact-popup-phone').value;
    // console.log("firstname: ", firstn);
    let ifchecked = false;
    
    let newcontact = {
        
        "firstname": firstn2,
        "surname": lastn2,
        "email": contactmail,
        "phone": contactphone,
        "checked": ifchecked,
    }
    
    contacts.push(newcontact);
    pushContactBackend();
    // console.log(contacts);
    contactinit();
    successSlide();
}

function successSlide(){
    let success = document.getElementById("succesfulC");
    success.classList.remove("dnone");
    success.classList.remove("slideoutsmall");
    success.classList.add("slideinsmall");
    setTimeout(function(){success.classList.add('slideoutsmall')}, 2750);
    setTimeout(function(){success.classList.add('dnone')}, 3000);
}

async function pushContactBackend(){
    await backend.setItem('contacts', JSON.stringify(contacts));
}

// edit contact
function contactInformationEditButton(i){
    let popupedit = document.getElementById('popupedit');
    popupedit.innerHTML = "";
    popupedit.innerHTML = renderPopupEditContact(i);
    // console.log(i);

    let firstname = contacts[i]["firstname"];
    let surname = contacts[i]["surname"];
    let fullsname = firstname + " " + surname; 
    let email = contacts[i]["email"];
    let phone = contacts[i]["phone"];
    document.getElementById(`editName${i}`).value = fullsname;
    document.getElementById(`editEmail${i}`).value = email;
    document.getElementById(`editPhone${i}`).value = phone;
}

function renderPopupEditContact(i){
    return`
    <div class="popUpContactE" id="mainPopUpedit">
        <div class="popUpLeftE">
            <img class="logoimgE" src="assets/img/logo_light.png" alt="">
            <div class="popUpLeftTextE">
                <p class="popUpLeftHeaderE">Edit contact</p>
            </div>
            <img src="assets/img/Vector 5 (1).png" alt="">
        </div>
        <div class="popUpRightE">
            <img class="xiconE" id="closeBtnE" onclick="slideEditOut()" src="assets/img/icon-x.svg" alt="">
            <div class="popUpRightImgE" id="popupEditInitials">
                <div class="popUpRightImgBGE farbe${i}">${contacts[i]["firstname"].charAt(0)}${contacts[i]["surname"].charAt(0)}
                    
                    
                </div>                    
            </div>
            <form onsubmit="return false" class="popUpAddContactE">
                <div class="inputE">
                    <input required type="text" placeholder="Name" id="editName${i}">
                    <img src="assets/img/icon-user-grey.svg" alt="">
                </div>
                <div class="inputE">
                    <input required type="email" placeholder="Email" id="editEmail${i}">
                    <img src="assets/img/email_input.svg" alt="">
                </div>
                <div class="inputE">
                    <input required type="number" placeholder="Phone" id="editPhone${i}">
                    <img src="assets/img/icon-phone.svg" alt="">
                </div>
                <div class="popUpButtonE">
                    <button class="deleteBtnE buttonE" onclick="deleteEditContact(${i}), slideEditOut()">Delete</button>
                    <button class="saveBtnE buttonE" onclick="saveEditContact(${i}), slideEditOut()">Save</button>
                </div>
            </form>
        </div>
    </div>
    
    `;
}

function saveEditContact(i){
    let name = document.getElementById(`editName${i}`).value;
    let email = document.getElementById(`editEmail${i}`).value;
    let phone = document.getElementById(`editPhone${i}`).value;
    // console.log("name: ",name);
    // console.log("email: ",email);
    // console.log("phone: ",phone);


    fullname = name.split(' ');
    firstn = fullname[0];
    lastn = fullname[1];
    let firstn2 = firstn.charAt(0).toUpperCase() + firstn.slice(1);
    let lastn2 = lastn.charAt(0).toUpperCase() + lastn.slice(1);
    let ifchecked = false;
    let newcontact = {        
        "firstname": firstn2,
        "surname": lastn2,
        "email": email,
        "phone": phone,
        "checked": ifchecked,
    }
    contacts.splice(i, 1, newcontact);
    // console.log(contacts);
    pushContactBackend();
    contactinit();
    openContact(i);
}

// deleteContact
function deleteEditContact(i){
    document.getElementById('contact-selection').innerHTML = "";
    let firstletter = contacts[i]['firstname'].charAt(0);
    
    // console.log(firstletter);
    contacts.splice(i, 1);
    
    // console.log(letters); 
    pushContactBackend();
    contactinit();
    
}

// responsive function
