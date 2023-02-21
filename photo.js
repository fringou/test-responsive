// Définir les données pour les vignettes
let cardsData = [
  {
    image: "https://via.placeholder.com/150",
    title: "Titre 1",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    image: "https://via.placeholder.com/150",
    title: "Titre 2",
    text: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    image: "https://via.placeholder.com/150",
    title: "Titre 3",
    text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    image: "https://via.placeholder.com/150",
    title: "Titre 4",
    text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
  {
    image: "https://via.placeholder.com/150",
    title: "Titre 5",
    text: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    image: "https://via.placeholder.com/150",
    title: "Titre 6",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    image: "https://via.placeholder.com/150",
    title: "Titre 7",
    text: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    image: "https://via.placeholder.com/150",
    title: "Titre 8",
    text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    image: "https://via.placeholder.com/150",
    title: "Titre 9",
    text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
  {
    image: "https://via.placeholder.com/150",
    title: "Titre 10",
    text: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  }
];

const itemsParPage = 4;
const totalPages = Math.ceil(cardsData.length / itemsParPage);console.log(totalPages)
let currentPage = 1;

function createCard(cardsData) {
  // Créez une vignette
  const card = document.createElement("div");
  card.setAttribute(
    "style",
    "width: 300px; height: 400px; background-color: lightgray;border-radius: 10px; margin: 20px; display: inline-block;"
  );
  // Créez une image pour la vignette
  const cardImage = document.createElement("img");
  cardImage.src = cardsData.image;
  cardImage.setAttribute("style", "width: 100%; height: 200px;border-radius: 10px; ");
  card.appendChild(cardImage);

  // Créez un titre pour la vignette
  const cardTitle = document.createElement("h2");
  cardTitle.innerText = cardsData.title;
  cardTitle.setAttribute("style", "margin: 20px;");
  card.appendChild(cardTitle);

  // Créez un texte pour la vignette
  const cardText = document.createElement("p");
  cardText.innerText = cardsData.text;
  cardText.setAttribute("style", "margin: 20px;");
  card.appendChild(cardText);

  return card;
}

function updateCardsData() {
  // Référencez le conteneur des vignettes dans votre code
  const cardContainer = document.querySelector("#card-container");
  cardContainer.setAttribute(
    "style",
    "display: flex; justify-content: center; align-items: center; flex-wrap: wrap;"
  );
  cardContainer.innerHTML = "";

  const indexStart = (currentPage - 1) * itemsParPage;
  const indexEnd = indexStart + itemsParPage;
  const cardsDisplay = cardsData.slice(indexStart, indexEnd);

// Bouclez sur les données pour créer les vignettes
cardsDisplay.forEach((cardsData) => {
  const card = createCard(cardsData);
  // Ajoutez la vignette au conteneur
  cardContainer.appendChild(card);
});}
function creerPagination(){
  const paginationContainer = document.querySelector(".pagination-Container")
  paginationContainer.innerHTML ='';

  for (let i = 1; i <= totalPages; i++) {
    const lienPage = document.createElement('a');
    lienPage.textContent = i;
    lienPage.href = '#';
lienPage.addEventListener('click', événement => {
  événement.preventDefault();
  currentPage = i;
  updateCardsData();
});

paginationContainer.appendChild(lienPage);


}
}

updateCardsData();
creerPagination();


