// import data
import projectsData from './data.js';

// function to create project cards
function createProjectCard(project) {
    const card = document.createElement('article');
    card.className = 'project project-tile';

    const img = document.createElement('img');
    img.className = 'project-image';
    img.src = project.image;
    console.log('Image source for project', project.title, ':', img.src);
    img.alt = project.title;

    const title = document.createElement('p');
    title.className = 'project-title';
    title.textContent = project.title;

    const link = document.createElement('a');
    link.href = project.path + (project.path.endsWith('/') ? '' : '/');
    link.target = '_blank';
    link.appendChild(img);
    link.appendChild(title);

    card.appendChild(link);
    return card;
}

function createCategorySection(category) {
    const section = document.createElement('section');
    section.className = 'category-section';

    const heading = document.createElement('h2');
    const headingText = category.id.replace(/_|-/g, ' ').toUpperCase();
    heading.textContent = headingText;
    // set an id for anchor linking
    section.id = category.id;
    section.appendChild(heading);

    const grid = document.createElement('div');
    grid.className = 'projects-grid';

    category.projects.forEach(project => {
        const card = createProjectCard(project);
        // assign ids to project tiles so nav anchors can target them
        const projectId = project.path.replace(/[\/]/g, '-').replace(/[^a-zA-Z0-9-_]/g, '');
        card.id = projectId;
        grid.appendChild(card);
    });

    section.appendChild(grid);
    return section;
}

function displayProjects() {
    const container = document.getElementById('projects-container');
    projectsData.forEach(category => {
        const catSection = createCategorySection(category);
        container.appendChild(catSection);
    });
}

// initialize display
function buildNavbar() {
    const navlist = document.getElementById('navlist');
    // Create a top-level link for each category and then project links
    projectsData.forEach(category => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.className = 'nav-link';
        a.href = `#${category.id}`;
        a.textContent = category.id.replace(/_|-/g, ' ').toUpperCase();
        li.appendChild(a);
        navlist.appendChild(li);

        // Add project sub-links
        category.projects.forEach(project => {
            const pli = document.createElement('li');
            pli.className = 'nav-subitem';
            const pa = document.createElement('a');
            pa.className = 'nav-link';
            const projectId = project.path.replace(/[\/]/g, '-').replace(/[^a-zA-Z0-9-_]/g, '');
            pa.href = `#${projectId}`;
            pa.textContent = project.title;
            pli.appendChild(pa);
            navlist.appendChild(pli);
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    buildNavbar();
    displayProjects();
});