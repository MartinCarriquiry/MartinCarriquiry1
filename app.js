// =========================
// Navigation between sections
// =========================
const sections = document.querySelectorAll(".section");
const sectBtns = document.querySelectorAll(".controls");
const sectBtn = document.querySelectorAll(".control");
const allSections = document.querySelector(".main-content");

function pageTransitions() {
    // Button active state
    for (let i = 0; i < sectBtn.length; i++) {
        sectBtn[i].addEventListener("click", function () {
            const currentBtn = document.querySelector(".active-btn");
            if (currentBtn) {
                currentBtn.classList.remove("active-btn");
            }
            this.classList.add("active-btn");
        });
    }

    // Section active state
    allSections.addEventListener("click", (e) => {
        const id = e.target.dataset.id;
        if (id) {
            sectBtns.forEach((btn) => {
                btn.classList.remove("active");
            });

            e.target.classList.add("active");

            sections.forEach((section) => {
                section.classList.remove("active");
            });

            const element = document.getElementById(id);
            if (element) {
                element.classList.add("active");
            }
        }
    });

    // Theme button
    const themeBtn = document.querySelector(".theme-btn");
    if (themeBtn) {
        themeBtn.addEventListener("click", () => {
            document.body.classList.toggle("light-mode");

            const isLight = document.body.classList.contains("light-mode");
            localStorage.setItem("theme", isLight ? "light" : "dark");
        });
    }
}

// =========================
// Language switch
// =========================
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

// =========================
// Initial load
// =========================
document.addEventListener("DOMContentLoaded", () => {
    pageTransitions();

    // Restore theme
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
        document.body.classList.add("light-mode");
    }

    // Restore language
    const savedLanguage = localStorage.getItem("language") || "es";
    setLanguage(savedLanguage);
});