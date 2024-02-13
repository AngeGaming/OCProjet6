addEventListener("DOMContentLoaded", async (e) => {
    await setLoginBtn();
});

const checkUserLoginState = () => {
    const token = localStorage.getItem("token");
    return token;
};

const isConnected = checkUserLoginState();

const setLoginBtn = () => {
    const login = document.querySelector(".login");
    if (isConnected) {
        login.innerHTML = "<li>logout</li>";
        login.addEventListener("click", () => {
            localStorage.removeItem("token");
            document.location.href = "index.html";
        });
    }
};

document.addEventListener("DOMContentLoaded", () => {
    if (isConnected) {
        // Add HTML content (edition mode)
        const header = document.querySelector("header");
        const headerEdition = `
        <div id="modal-header" class="modal-header_container" aria-hidden="true" role="dialog" aria-modal="true" aria-labelledby="title_modal">
            <div class="modal-header_display">
                <i class="fa-regular fa-pen-to-square fa-lg"></i>
                <p>Mode édition </p>
            </div>
        </div>
      `;
        header.insertAdjacentHTML("afterbegin", headerEdition);
    }

    // Remove filters
    const projectsFilters = document.querySelector(".btn-filter-container");
    if (isConnected) {
        projectsFilters.remove();
    }

    // Add HTML content (btn modifier) after "portfolio"
    const portfolio = document.querySelector(".portfolio-edit");
    if (isConnected) {
        const projectsModifier = `
            <div class="edit">
                <i class="fa-regular fa-pen-to-square fa-lg"></i>
                <p>Modifier</p>
            </div>
            `;
        portfolio.insertAdjacentHTML("beforeend", projectsModifier);
    }
});
