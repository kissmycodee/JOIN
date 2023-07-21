async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html"); // "includes/Navbar.html"
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}

function showLogOut() {
    let logOut = document.getElementById('logOutButton');
    logOut.classList.remove('dnone');
    logOut.classList.remove('fadeout');
    logOut.classList.add('fadein');
    setTimeout(function(){logOut.classList.add('fadeout')}, 2750);
    setTimeout(function(){logOut.classList.add('dnone')}, 3000);
}

function logout(){
    window.location.href = `index.html?msg=Du hast dich erfolgreich ausgeloggt!`;
}