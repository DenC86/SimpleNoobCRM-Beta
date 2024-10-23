let leads = JSON.parse(localStorage.getItem('leads')) || [];

document.getElementById('leadForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const fio = document.getElementById('fio').value;
    const company = document.getElementById('company').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;

    if (!fio || !company || !phone || !email) {
        alert("Заполните все поля");
        return;
    }

    const lead = { fio, company, phone, email, tasks: [], comments: [] };
    leads.push(lead);
    localStorage.setItem('leads', JSON.stringify(leads));
    renderLeads();
});

function renderLeads() {
    const leadList = document.getElementById('leadList');
    leadList.innerHTML = '';

    leads.forEach((lead, index) => {
        const leadElement = document.createElement('div');
        leadElement.classList.add('lead');
        leadElement.innerHTML = `
            <h3>${lead.fio} (${lead.company})</h3>
            <p>Phone: ${lead.phone}</p>
            <p>Email: ${lead.email}</p>

            <button onclick="deleteLead(${index})">Delete Lead</button>
            <button onclick="openEditModal(${index})">Edit Lead</button>

            <div>
                <h4>Tasks</h4>
                <button onclick="addTask(${index})">Add Task</button>
                <div id="tasks-${index}">
                    ${renderTasks(lead.tasks)}
                </div>
            </div>

            <div>
                <h4>Comments</h4>
                <textarea id="comment-${index}" maxlength="300" placeholder="Add a comment"></textarea>
                <button onclick="addComment(${index})">Add Comment</button>
                <div id="comments-${index}">
                    ${renderComments(lead.comments)}
                </div>
            </div>
        `;
        leadList.appendChild(leadElement);
    });
}

function renderTasks(tasks) {
    return tasks.map(task => `
        <p>${task.type}: ${task.details}</p>
    `).join('');
}

function renderComments(comments) {
    return comments.map(comment => `
        <p>${comment}</p>
    `).join('');
}

function deleteLead(index) {
    leads.splice(index, 1);
    localStorage.setItem('leads', JSON.stringify(leads));
    renderLeads();
}

function addTask(index) {
    const taskType = prompt("Enter task type (Call, Meeting, etc.):");
    const taskDetails = prompt("Enter task details:");
    if (taskType && taskDetails) {
        leads[index].tasks.push({ type: taskType, details: taskDetails });
        localStorage.setItem('leads', JSON.stringify(leads));
        renderLeads();
    }
}

function addComment(index) {
    const comment = document.getElementById(`comment-${index}`).value;
    if (comment) {
        leads[index].comments.push(comment);
        localStorage.setItem('leads', JSON.stringify(leads));
        renderLeads();
    }
}

// Модалка для редактирования
const editModal = document.getElementById('editLeadModal');
const closeModal = document.getElementsByClassName('close')[0];

let currentEditIndex;

function openEditModal(index) {
    currentEditIndex = index;
    const lead = leads[index];

    document.getElementById('editFio').value = lead.fio;
    document.getElementById('editCompany').value = lead.company;
    document.getElementById('editPhone').value = lead.phone;
    document.getElementById('editEmail').value = lead.email;

    editModal.style.display = 'block';
}

closeModal.onclick = function() {
    editModal.style.display = 'none';
}

window.onclick = function(event) {
    if (event.target === editModal) {
        editModal.style.display = 'none';
    }
}

document.getElementById('editLeadForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const fio = document.getElementById('editFio').value;
    const company = document.getElementById('editCompany').value;
    const phone = document.getElementById('editPhone').value;
    const email = document.getElementById('editEmail').value;

    if (!fio || !company || !phone || !email) {
        alert("Заполните все поля");
        return;
    }

    leads[currentEditIndex] = { ...leads[currentEditIndex], fio, company, phone, email };
    localStorage.setItem('leads', JSON.stringify(leads));
    editModal.style.display = 'none';
    renderLeads();
});

// Логика выхода
document.getElementById('logoutButton').addEventListener('click', function() {
    window.location.href = 'login.html';
});

window.onload = renderLeads;