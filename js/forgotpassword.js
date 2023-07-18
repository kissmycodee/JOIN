async function onSubmit(event){
    event.preventDefault();
    let formData = new FormData (event.target);
    let response = await action(formData);
    if(response.ok){
        mailSend();
    } else {
        mailNotSend();
    }
    
}

function action (formData){
    const input = "https://gruppe-08i.developerakademie.net/01Join/php/send_mail.php"
    const requestInit ={
        method: 'post',
        body: formData
    };

    return fetch(
        input,
        requestInit
        );
}

function mailSend() {
    let showMsg = document.getElementById("sendMailMsg");
    showMsg.classList.add("btnEmailSend");
    mailSuccess();
  
    setTimeout(function () {
      showMsg.classList.remove("btnEmailSend");
    }, 3000);
  }
  
  function mailSuccess() {
    let message = document.getElementById("sendMailMsg");
    message.innerHTML = 
    `<img src="/src/img/icon-mail-flight.svg" alt="" />
    Email has been sent! `
    ;
  }
  
  function mailNotSend() {
    let showMsg = document.getElementById("sendMailMsg");
    showMsg.classList.add("btnEmailSend");
    mailFailure();
  
    setTimeout(function () {
      showMsg.classList.remove("btnEmailSend");
    }, 3000);
  }
  
  function mailFailure() {
    let message = document.getElementById("sendMailMsg");
    message.innerHTML = `
    Email has not been sent! `
  ;
  }