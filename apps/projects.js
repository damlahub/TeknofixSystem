const getData = () => {
    const form = document.querySelector(".projectContent form");
    if (!form) return {}; 

    const formData = new FormData(form);
    const data = {};

    formData.forEach((value, key) => {
        data[key] = value;
    });

    return data; 
};

const saveProjectToStorage = (data) => {
    const projects = JSON.parse(localStorage.getItem('projects')) || [];
    projects.push(data);
    localStorage.setItem('projects', JSON.stringify(projects));
};

const loadProjectsFromStorage = () => {
    const projects = JSON.parse(localStorage.getItem('projects')) || [];
    projects.forEach((project, index) => addProjectToContent(project, index));
};

const addProjectToContent = (data, index) => {
    const projectsContent = document.querySelector(".cards");

    if (!projectsContent) return;

    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
        <h1>${data.hostname}</h1>
        <table>
            <tr>
                <th>Hostname</th>
                <td>${data.hostname}</td>
            </tr>
            <tr>
                <td>${data.installation}</td>
            </tr>
            <tr>
                <th>Programs</th>
                <td>${data.programs.replace(/\n/g, '<br>')}</td>
            </tr>
            <tr>
                <th>Programs To Delete</th>
                <td>${data.programs_to_delete.replace(/\n/g, '<br>')}</td>
            </tr>
        </table>
        <button class="deleteBtn" data-index="${index}">Delete</button>
    `;

    projectsContent.appendChild(card);
};

const removeProjectFromStorage = (index) => {
    const projects = JSON.parse(localStorage.getItem('projects')) || [];
    projects.splice(index, 1);
    localStorage.setItem('projects', JSON.stringify(projects));
};

const showPanel = () => {
    const addProjectBtn = document.querySelector("#addProjectBtn");

    if (!addProjectBtn) return;

    addProjectBtn.addEventListener("click", () => {
        const panel = document.querySelector(".panel");
        panel.style.visibility = "visible";

        const projectContent = document.createElement("article");
        projectContent.classList.add("projectContent");
        projectContent.innerHTML = `
            <h1>ADD PROJECT</h1>
            <form action="javascript:void(0);" method="post">
                <label for="hostname">Hostname:</label>
                <input type="text" id="hostname" name="hostname" required><br><br>

                <label>Installation Type:</label><br>
                <input type="radio" id="standard" name="installation" value="Standard Installation">
                <label for="standard">Standard Installation</label><br>

                <input type="radio" id="win11" name="installation" value="Windows 11">
                <label for="win11">Windows 11</label><br>

                <input type="radio" id="win10" name="installation" value="Windows 10">
                <label for="win10">Windows 10</label><br><br>

                <label for="programs">Programs:</label><br>
                <textarea id="programs" name="programs" rows="4" cols="50"></textarea><br><br>

                <label for="programs_to_delete">Programs to Delete:</label><br>
                <textarea id="programs_to_delete" name="programs_to_delete" rows="4" cols="50"></textarea><br><br>
                
                <div class="panelButtons">
                    <button type="submit" id="addBtn">Add</button>
                    <button type="button" id="cancelBtn">Cancel</button>
                </div>
            </form>
        `;

        panel.appendChild(projectContent);

        document.querySelector("#cancelBtn").addEventListener("click", () => {
            if (panel && projectContent) {
                panel.style.visibility = "hidden";
                projectContent.remove();
            }
        });

        document.querySelector("#addBtn").addEventListener("click", () => {
            const formData = getData();
            addProjectToContent(formData, localStorage.length); 
            saveProjectToStorage(formData); 
            panel.style.visibility = "hidden";
            projectContent.remove();
        });

        document.querySelector("#clearAllItem").addEventListener("click", () => {
            localStorage.removeItem('projects');
            document.querySelector(".cards").innerHTML = '';
        });
    });
};

document.addEventListener('click', (event) => {
    if (event.target && event.target.classList.contains('deleteBtn')) {
        const index = event.target.getAttribute('data-index');
        removeProjectFromStorage(index); 
        event.target.parentElement.remove(); 
    }
    if (event.target && event.target.classList.contains('clearBtn')) {
        localStorage.removeItem('projects');
    }
});

showPanel();
document.addEventListener('DOMContentLoaded', loadProjectsFromStorage);