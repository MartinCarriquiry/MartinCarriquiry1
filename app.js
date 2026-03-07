const sections = document.querySelectorAll(".section");
const sectBtns = document.querySelectorAll(".controlls .control");
const allSections = document.querySelector(".main-content");

function pageTransitions() {
    sectBtns.forEach((btn) => {
        btn.addEventListener("click", function () {
            const currentBtn = document.querySelector(".active-btn");
            if (currentBtn) {
                currentBtn.classList.remove("active-btn");
            }
            this.classList.add("active-btn");
        });
    });

    if (allSections) {
        allSections.addEventListener("click", (e) => {
            const target = e.target.closest("[data-id]");
            if (!target) return;

            const id = target.dataset.id;
            sectBtns.forEach((btn) => btn.classList.remove("active"));
            target.classList.add("active");

            sections.forEach((section) => section.classList.remove("active"));
            const element = document.getElementById(id);
            if (element) {
                element.classList.add("active");
            }
        });
    }

    const themeBtn = document.querySelector(".theme-btn");
    if (themeBtn) {
        themeBtn.addEventListener("click", () => {
            document.body.classList.toggle("light-mode");
            const isLight = document.body.classList.contains("light-mode");
            localStorage.setItem("theme", isLight ? "light" : "dark");
        });
    }
}

function setLanguage(lang) {
    const elements = document.querySelectorAll("[data-es]");

    elements.forEach((el) => {
        const translatedText = el.getAttribute(`data-${lang}`);
        if (translatedText) {
            el.textContent = translatedText;
        }
    });

    document.documentElement.lang = lang;
    localStorage.setItem("language", lang);

    const btnEs = document.getElementById("btn-es");
    const btnEn = document.getElementById("btn-en");

    if (btnEs && btnEn) {
        btnEs.classList.toggle("active-lang", lang === "es");
        btnEn.classList.toggle("active-lang", lang === "en");
    }
}

window.setLanguage = setLanguage;

document.addEventListener("DOMContentLoaded", () => {
    pageTransitions();

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
        document.body.classList.add("light-mode");
    }

    const savedLanguage = localStorage.getItem("language") || "es";
    setLanguage(savedLanguage);
});
