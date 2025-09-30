// import data
import { projectsData } from './data.js';

// function to create project cards
function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.innerHTML = `
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <a href="${project.path}" class="btn">View Project</a>
    `;
    return card;
}
// function to display projects
function displayProjects() {
    const container = document.getElementById('projects-container');
    projectsData.forEach(category => {
        category.projects.forEach(project => {
            const card = createProjectCard(project);
            container.appendChild(card);
        });
    });
}
// initialize display
document.addEventListener('DOMContentLoaded', displayProjects);