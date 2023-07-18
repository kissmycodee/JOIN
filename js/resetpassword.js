setURL('https://gruppe-08i.developerakademie.net/smallest_backend_ever');

async function init(){
    await downloadFromServer();
    users = JSON.parse(backend.getItem('users')) || [];
}

async function resetPassword() {
    let newPassword = document.getElementById('newPassword');
    let confirmPassword = document.getElementById('confirmPassword');
    let email = getEmailURLParameter();

    let user = users.find(u => u.email === email);
    if (user.email === email) {
        if (newPassword.value === confirmPassword.value) {
            user.password = newPassword.value;
            await backend.setItem('users', JSON.stringify(users));
            resetYourPassword();
            setTimeout(function(){window.location.href = '/01Join/index.html'} , 3000);
        } else {
            passwordNotMatch();
            newPassword.value = '';
            confirmPassword.value = '';
        }
    }
}

function getEmailURLParameter(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const email = urlParams.get('email');
    return email;
}

function resetYourPassword() {
    let showMsg = document.getElementById("showMsg");
    showMsg.classList.add("btnEmailSend");
    passwordReset();
  
    setTimeout(function () {
      showMsg.classList.remove("btnEmailSend");
    }, 4000);
  }

function passwordReset() {
    let message = document.getElementById("showMsg");
    message.innerHTML = 
    `Your password has been reset!`
    ;
  }
  
  function passwordNotMatch() {
    let showMsg = document.getElementById("showMsg");
    showMsg.classList.add("btnEmailSend");
    passwordNo();
  
    setTimeout(function () {
      showMsg.classList.remove("btnEmailSend");
    }, 3000);
  }
  
  function passwordNo() {
    let message = document.getElementById("sendMailMsg");
    message.innerHTML = 
    'The passwords do not match!'
  ;
  }