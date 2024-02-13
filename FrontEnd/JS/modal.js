const handleModal = (works) => {
    const modal = document.querySelector(".modal");
    const editButton = document.querySelector(".edit");
    const headerEditButton = document.querySelector(".modal-header_container");
    const close = document.querySelectorAll(".close");
    const modalItems = document.querySelector(".modal-items");
    const modalPage1 = document.querySelector(".modal-content");
    const modalPage2 = document.querySelector(".modal-add-img_content");
    const addImg = document.querySelector(".add-img");
    const backArrow = document.querySelector(".back-arrow");

    editButton.addEventListener("click", () => {
        modal.style.display = "flex";
        modalPage2.style.display = "none";
        modalPage1.style.display = "flex";
    });

    headerEditButton.addEventListener("click", () => {
        modal.style.display = "flex";
        modalPage2.style.display = "none";
        modalPage1.style.display = "flex";
    });

    close.forEach((item) =>
        item.addEventListener("click", () => {
            modal.style.display = "none";
        })
    );

    addImg.addEventListener("click", () => {
        modalPage1.style.display = "none";
        modalPage2.style.display = "flex";
    });

    backArrow.addEventListener("click", () => {
        modalPage1.style.display = "flex";
        modalPage2.style.display = "none";
    });

    works.map((work) => {
        const figure = document.createElement("figure");
        figure.innerHTML = `
            <img src="${work.imageUrl}" alt="${work.title}">
            <span class="trash-icon" data-id=${work.id}><i class="fa-solid fa-trash-can"></i></span>
        `;
        modalItems.appendChild(figure);
    });
};

const deleteModal = () => {
    // Delete image
    const urlApi = "http://localhost:5678/api/works";
    const deleteImg = document.querySelectorAll(".trash-icon");
    const token = window.localStorage.getItem("token");
    deleteImg.forEach((deleteImg) => {
        deleteImg.addEventListener("click", async () => {
            workId = deleteImg.dataset.id;
            if (token) {
                try {
                    const response = await fetch(`${urlApi}/${workId}`, {
                        method: "DELETE",
                        headers: { Authorization: `Bearer ${token}` },
                    });

                    if (response.status == 204) {
                        const figureElement = deleteImg.parentElement;
                        console.log(figureElement);
                        figureElement.remove();
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        });
    });
};

// Récupération des catégories dans le select
async function getCategories() {
    const response = await fetch("http://localhost:5678/api/categories");
    const categories = await response.json();
    const selectCategories = document.getElementById("categories");

    for (let i = 0; i < categories.length; i++) {
        let category = document.createElement("option");
        category.value = categories[i].id;
        category.innerText = categories[i].name;

        selectCategories.appendChild(category);
    }
}

// Quand on clique sur ajouter photo, ça clique en réalité sur l'input
const addButton = document.querySelector(".add-img_btn");
const addInput = document.querySelector(".input_file");

addButton.addEventListener("click", () => addInput.click());

// Preview image

function handleImageSelect(event) {
    const selectedImage = document.getElementById("selected-img");
    const file = event.target.files[0];
    const textElement = document.querySelector(".info-format");
    const addButton = document.querySelector(".add-img_btn");
    const previewSvg = document.querySelector(".add-img_preview svg");

    if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            selectedImage.src = e.target.result;
            textElement.style.display = "none";
            addButton.style.display = "none";
            previewSvg.style.display = "none";

            // Ajout d'une classe pour le rezize de l'image
            selectedImage.classList.add("selected-img2");
        };

        reader.readAsDataURL(file);
    }
}

// Changement de couleur du bouton valider quand tous les champs sont rempli

document.addEventListener("DOMContentLoaded", function () {
    const selectedImage = document.getElementById("selected-img");
    const inputTitle = document.querySelector(".input_title");
    const selectCategories = document.querySelector(".categories-select");

    function checkFormFields() {
        const btnValidate = document.querySelector(".validation-btn");
        if (
            selectedImage.src &&
            inputTitle.value.trim() !== "" &&
            selectCategories.value !== ""
        ) {
            btnValidate.classList.add("green-color");
        } else {
            btnValidate.classList.remove("green-color");
        }
    }
    selectedImage.addEventListener("load", checkFormFields);
    inputTitle.addEventListener("input", checkFormFields);
    selectCategories.addEventListener("change", checkFormFields);
});

// Ajouter une image a la galerie
async function createNewGalleryItem(e) {
    e.preventDefault();
    const token = window.localStorage.getItem("token");
    const urlApi = "http://localhost:5678/api/works";
    const selectedImageFile = document.getElementById("input_add_img").files[0];
    const inputTitle = document.querySelector(".input_title");
    const selectCategories = document.querySelector(".categories-select");
    const gallery = document.querySelector(".gallery");
    const modalContent = document.querySelector(".modal-add-ing_content");
    const formData = new FormData();

    formData.append("title", inputTitle.value);
    formData.append("image", selectedImageFile);
    formData.append("category", selectCategories.value);
    try {
        const response = await fetch(`${urlApi}`, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
            body: formData,
        });
        if (response.ok) {
            const responseData = await response.json();
            console.log("responseData", responseData);
            const newFigure = document.createElement("figure");
            const newImage = document.createElement("img");
            const newFigCaption = document.createElement("figcaption");

            newFigure.className = categorieInput.value;
            newImage.src = URL.createObjectURL(selectedImageFile);
            newFigCaption.textContent = titreInput.value;

            newFigure.appendChild(newImage);
            newFigure.appendChild(newFigCaption);
            gallery.appendChild(newFigure);

            closeModalHandler();

            addImageToModal(newImage);
        } else {
            console.error("Failed to add the image to the server.");
        }
    } catch (error) {
        console.error("An error occurred:", error);
    }
    portfolio.insertAdjacentHTML("afterend", modalContent);
}

const form = document.querySelector(".form-add-img");
form.addEventListener("submit", (e) => createNewGalleryItem(e));
