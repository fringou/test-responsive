// Récupère les liens de navigation
const navLinks = document.querySelectorAll('nav a');
// Affiche la section "Accueil" au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#accueil').style.display = 'block';
  });
// Boucle sur chaque lien de navigation
navLinks.forEach((link) => {
  // Ajoute un gestionnaire d'événement de clic sur chaque lien
  link.addEventListener("click", (event) => {
    // Empêche le comportement par défaut du lien
    event.preventDefault();

    // Récupère l'ID de la section correspondant au lien cliqué
    const sectionId = link.getAttribute("href");

    // Récupère la section correspondant à l'ID
    const section = document.querySelector(sectionId);

    // Affiche la section
    section.style.display = "block";

    // Masque toutes les autres sections
    const sections = document.querySelectorAll("main section");
    sections.forEach((s) => {
      if (s !== section) {
        s.style.display = "none";
      }
    });
  });
});

