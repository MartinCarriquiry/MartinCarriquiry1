"use strict";
function setLanguage(lang) {
  if (!["es", "en"].includes(lang)) lang = "es";
  document.querySelectorAll("[data-es][data-en]").forEach(el => { el.textContent = el.dataset[lang]; });
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-lang]").forEach(button => button.setAttribute("aria-pressed", String(button.dataset.lang === lang)));
  document.title = lang === "es" ? "Martín Carriquiry | Sistemas, QA y Datos" : "Martín Carriquiry | Systems, QA & Data";
  try { localStorage.setItem("language", lang); } catch (_) { /* Storage is optional. */ }
}
document.querySelectorAll("[data-lang]").forEach(button => button.addEventListener("click", () => setLanguage(button.dataset.lang)));
let language = "es";
try { language = localStorage.getItem("language") || "es"; } catch (_) { /* Keep Spanish default. */ }
setLanguage(language);
