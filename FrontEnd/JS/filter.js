const gallery = document.querySelector(".gallery");
addEventListener("DOMContentLoaded", async (e) => {
    await fetchCategories();
    await generateWorks();
});

async function fetchCategories() {
    const divButtonFilter = document.querySelector(".btn-filter-container");
    if (!divButtonFilter) {
        return;
    }
    const response = await fetch("http://localhost:5678/api/categories");
    const data = await response.json();
    dataCategories = data;
    // création des boutons dans l'html avec les données de l'api ( titre et id )
    dataCategories.map((category) => {
        const button = document.createElement("button");
        button.dataset.id = category.id;
        button.textContent = category.name;
        button.className = "btn-filter";
        divButtonFilter.appendChild(button);
    });
}

function displayWorks(works) {
    for (let i = 0; i < works.length; i++) {
        const work = works[i];
        const sectionFigure = document.createElement("figure");
        const imageElement = document.createElement("img");
        imageElement.src = work.imageUrl;
        imageElement.alt = work.title;
        const descriptionElement = document.createElement("figcaption");
        descriptionElement.innerHTML = work.title;
        sectionFigure.appendChild(imageElement);
        sectionFigure.appendChild(descriptionElement);
        gallery.appendChild(sectionFigure);
    }
    return works;
}

async function generateWorks() {
    try {
        const response = await fetch("http://localhost:5678/api/works");
        const works = await response.json();
        let worksFilters = [];
        const btnFilters = document.querySelectorAll(
            ".btn-filter-container button"
        );
        btnFilters.forEach((btnFilter) =>
            btnFilter.addEventListener("click", () => {
                btnFilters.forEach((btnFilter2) =>
                    btnFilter2.classList.remove("btn-selected")
                );
                btnFilter.classList.add("btn-selected");
                if (btnFilter.dataset.id) {
                    worksFilters = works.filter(
                        (work) => work.category.id == btnFilter.dataset.id
                    );
                } else {
                    worksFilters = works;
                }
                gallery.innerHTML = "";
                if (worksFilters.length > 0) {
                    displayWorks(worksFilters);
                } else {
                    displayWorks(works);
                }
            })
        );
        displayWorks(works);
    } catch (err) {}
}
