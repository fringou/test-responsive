const cardContainer = document.getElementById("card-container");
const paginationContainer = document.querySelector(".pagination-Container");

const cardForm = document.getElementById("cardForm");
const containerImg = document.getElementById("container-img");
const form = document.getElementById("form");
const imgBox = document.getElementById("imgBox");


let cardsData = [  {    image: "https://via.placeholder.com/150",    title: "Titre 1",    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",  },];

let currentPage = 1;
const itemsPerPage = 4;

const loadFile = (event) => {
  if (event && event.target && event.target.files.length) {
    let url = URL.createObjectURL(event.target.files[0]);
    let img = new Image();
    img.src=url;
    img.onload = () => {
       const width = img.width;  console.log(width);
       const height = img.height;  console.log(height);
      console.log(`L'image a une largeur de ${width}px et une hauteur de ${height}px`);
      imgBox.style.backgroundImage = `url(${url})`;
      containerImg.style.width = "300px";console.log(containerImg.style.width);
      containerImg.style.height = "400px";console.log(containerImg.style.height);
      form.style.display = "flex";
      cardContainer.style.display = "none";
    };
    
  }
};
cardForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const imageInput = document.getElementById("file");
  const titleInput = document.getElementById("titreBox");
  const textInput = document.getElementById("textBox");

  const newCard = {
    image: URL.createObjectURL(imageInput.files[0]),
    title: titleInput.value,
    text: textInput.value,
  };

  cardContainer.style.display ="inline-flex";
  cardContainer.style.flexWrap = "wrap";
  cardsData.push(newCard);
  updateCardsData();
  creerPagination();
});


const displayCards = () => {
  cardContainer.innerHTML = cardsData.map((card) => {
    return `
      <div class="card" style="width: 300px; height: 400px; background-color: transparent;border-radius: 10px; margin: 20px; display: inline-block;">
      <a href="${card.image}">
      <img class="card-image" src="${card.image}" style="width: 100%; height: 200px;border-radius: 10px; ">
      </a>
        <div class="card-content" style="margin: 0px;">
          <h2>${card.title}</h2>
          <p>${card.text}</p>
        </div>
      </div>
    `;
  }).join("");
};console.log("displaycards");
console.log(cardsData);



// Cette fonction met à jour l'affichage des cartes et de la pagination
const updateCardsData = () => {

  // Calculer les index de début et de fin pour l'affichage des cartes
  const indexStart = (currentPage - 1) * itemsPerPage;
  const indexEnd = indexStart + itemsPerPage;

  // Extraire un sous-ensemble de cartes à afficher
  const cardsDisplay = cardsData.slice(indexStart, indexEnd);

  // Générer le code HTML pour chaque carte et l'insérer dans la page
  cardContainer.innerHTML = cardsDisplay.map((card) => {
    return `
      <div class="card" style="width: 300px; height: 400px; background-color: transparent;border-radius: 10px; margin: 20px; display: inline-block;">
        <a href="${card.image}">
          <img class="card-image" src="${card.image}" style="width: 100%; height: 200px;border-radius: 10px; ">
        </a>  
        <div class="card-content" style="margin: 0px;">
          <h2>${card.title}</h2>
          <p>${card.text}</p>
        </div>
      </div>
    `;
  }).join("");
console.log(cardsData.length);
  // Mettre à jour la classe 'active' pour le lien de pagination correspondant à la page actuelle
  const paginationLinks = paginationContainer.querySelectorAll("a");
  
  paginationLinks.forEach((link, index) => {
    link.classList.toggle("active", index + 1 === currentPage);
    
  });
};


const creerPagination = () => {
  paginationContainer.innerHTML = "";
  const totalPages = Math.ceil(cardsData.length / itemsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    const lienPage = document.createElement("a");
    lienPage.textContent = i;
    lienPage.href = "#";
    lienPage.addEventListener("click", (event) => {
      event.preventDefault();
      currentPage = i;
      updateCardsData();
    });

    paginationContainer.appendChild(lienPage);
  }
};



 


loadFile();
displayCards();
updateCardsData();
creerPagination();