const urlParams = new URLSearchParams(window.location.search);
const msg = urlParams.get('msg');
let msgBox = document.getElementById("msgBox");

if(msg){
    msgBox.innerHTML = msg;
} else {
    document.getElementById("msgBox").classList.add("dnone");
}