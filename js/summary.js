setURL('https://gruppe-08i.developerakademie.net/smallest_backend_ever');

async function init() {
    await downloadFromServer();
    users = JSON.parse(backend.getItem('users')) || [];
    tasks = JSON.parse(backend.getItem('tasks')) || [];
    getLoggedUser();
    renderSummary();

}

function getCurrentUser() {
    return JSON.parse(localStorage.getItem("currentUserName"));
}

function getLoggedUser() {
    let welcomePhrase = setWelcomePhrase();
    let currentUser = getCurrentUser();
    let welcome = document.getElementById('welcomeName');
    if (currentUser) {
        let user = currentUser[0];
        welcome.innerHTML = renderWelcome(user, welcomePhrase);

    } else {
        welcome.innerHTML = renderWelcomeGuest(welcomePhrase);
    }
}

function setWelcomePhrase() {
    let welcomePhrase
    let currentTime = new Date();;
    currentTime = currentTime.getHours();
    if (currentTime >= 0 && currentTime < 12) { welcomePhrase = 'Good morning' };
    if (currentTime >= 12 && currentTime < 18) { welcomePhrase = 'Good afternoon' };
    if (currentTime >= 18) { welcomePhrase = 'Good evening' };
    return welcomePhrase;
}

function renderWelcomeGuest(welcomePhrase) {
    return `
        <span class="phrase">${welcomePhrase},</span>
        <span class="welcomeUsername">Guestuser</span>`;
}

function renderWelcome(user, welcomePhrase) {
    return `
        <span class="phrase">${welcomePhrase},</span>
        <span class="welcomeUsername">${user}</span>
        `;
}


function searchAmount(taskStatus) {
    let amount = 0;
    for (let t = 0; t < tasks.length; t++) {
        let task = tasks[t];
        if (task['category'].includes(taskStatus)) {
            amount++
        }
    }
    return amount;
}

function searchUrgentTask() {
    let urgentTasks = [];

    let urgentDate = '3000-01-01';
    let currentDate = getCurrentDate();

    for (let t = 0; t < tasks.length; t++) {
        let task = tasks[t];
        if (task['prio'].includes('Urgent') && !task['category'].includes('done')) {
            urgentTasks.push(task);

            if (task['dueDate'] <= urgentDate && task['dueDate'] >= currentDate) {
                urgentDate = task['dueDate'];
            }
        }
    }
    let amountUrgentTasks = urgentTasks.length;
    document.getElementById('urgentTasksAmount').innerHTML = `${amountUrgentTasks}`;

    let urgentDateArray = urgentDate.split('-');
    let monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    let month = monthNames[parseFloat(urgentDateArray[1]) - 1];
    document.getElementById('tasksDeadlineDate').innerHTML = `${month} ${urgentDateArray[2]}, ${urgentDateArray[0]}`
}

function getCurrentDate() {
    const t = new Date();
    const date = ('0' + t.getDate()).slice(-2);
    const month = ('0' + (t.getMonth() + 1)).slice(-2);
    const year = t.getFullYear();
    return `${year}-${month}-${date}`;
}

function renderSummary() {
    let amountTasks = searchAmount("");
    let amountinProgress = searchAmount('inProgress');
    let amountawaitingFeedback = searchAmount('awaitingFeedback');
    let amounttoDo = searchAmount('todo');
    let amountdone = searchAmount('done');

    document.getElementById('taskAmountBoard').innerHTML = `${amountTasks}`;
    document.getElementById('taskAmountinProgress').innerHTML = `${amountinProgress}`;
    document.getElementById('taskAmountawaitingFeedback').innerHTML = `${amountawaitingFeedback}`;
    document.getElementById('taskAmounttoDo').innerHTML = `${amounttoDo}`;
    document.getElementById('taskAmountdone').innerHTML = `${amountdone}`;
    searchUrgentTask();
}

function goToBoard() {
    window.location.href = 'board.html'
}