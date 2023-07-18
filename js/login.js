let currentUser = [];
let currentUserName = [];

setURL('https://gruppe-08i.developerakademie.net/smallest_backend_ever');

async function init() {
    await downloadFromServer();
    users = JSON.parse(backend.getItem('users')) || [];
    messageBoxAnimation();
    rememberMe();
    
}

function messageBoxAnimation(){
    let message = document.getElementById('msgBox');
    setTimeout(function(){message.classList.add('fadeout')}, 2750);
    setTimeout(function(){message.classList.add('dnone')}, 3000);
}

function rememberMe(){
    const urlParams = new URLSearchParams(window.location.search);
    const msg = urlParams.get('msg');

    if(msg === "Du hast dich erfolgreich ausgeloggt!"){
        //nothing happenes
    } else {
        savedLogin();
    }
}

function savedLogin(){
    let currentUserAsText = localStorage.getItem("currentUser")
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    
    if (currentUserAsText) {
        let currentUser = JSON.parse(currentUserAsText);
        email.value = currentUser[0].email;
        password.value = currentUser[0].password;
    }
}

function login (){
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    let user = users.find(u => u.email == email.value && u.password == password.value);
    if (user) {
        saveLogin(user);
        window.location.href = `summary.html`;
    } else {
        shakeElement();
    }
}

function shakeElement() {
    let mailShake = document.getElementById("emailShake");
    let passwwordShake = document.getElementById("passwordShake");
    mailShake.classList.add("shake");
    passwwordShake.classList.add("shake")
    setTimeout(function () {
        mailShake.classList.remove("shake");
        passwwordShake.classList.remove("shake");
    }, 1000);
}

function saveLogin(user){
    let userEmail = user.email;
    let userPassword = user.password;
    let username = user.name;
    currentUserName.push(username);
    loginToLocalStorage("currentUserName", currentUserName);
    if (document.getElementById('rememberMe').checked == true) {
        currentUser.push({email: userEmail, password: userPassword});
        loginToLocalStorage("currentUser", currentUser);  
    }
}

function loginToLocalStorage(key, currentUser) {
    localStorage.setItem(key, JSON.stringify(currentUser));
}

function guestLogin(){
    localStorage.clear();
    window.location.href = 'summary.html'
}

function showPasswordIcon(){
    let password = document.getElementById('password');
    let lockIMG = document.getElementById("lockIMG");
    
    if(password.value.length > 0) {
        lockIMG.src = "assets/img/closedeye.svg";
    } else{
        lockIMG.src = "assets/img/password_input.svg";
    }
}

function showPassword(){
    let show = document.getElementById('password');
    let lock = document.getElementById('lockIMG');
    let eye = document.getElementById('eyeIMG');

    if (show.type == "password"){
        show.type = "text";
        eye.style.display = "block"
        lock.style.display = "none";
    } else {
        show.type = "password";
        eye.style.display = "none";
        lock.style.display = "block";
    }
}






