let users  = [];
setURL('http://join.orhan-kacar.com/smallest_backend_ever');

let newID = 0;

async function init() {
    await downloadFromServer();
    users = JSON.parse(backend.getItem('users')) || [];
}

async function addUser(){
    let name = document.getElementById('inputName');
    let email = document.getElementById('inputEmail');
    let password = document.getElementById('inputPassword');
    

    users.push({name: name.value, email: email.value, password: password.value})
    await backend.setItem('users', JSON.stringify(users));
    console.log(newID);
    //weiterleitung zu Login-Seite
    window.location.href = 'index.html?msg=Du hast dich erfolgreich registriert!';
}
