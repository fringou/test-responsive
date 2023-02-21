// Création des éléments HTML
var imageContainer = document.createElement("div");
imageContainer.setAttribute("class", "container-img");
imageContainer.setAttribute("id", "imgBox");


var fileInput = document.createElement("input");
fileInput.setAttribute("type", "file");
fileInput.setAttribute("name", "image");
fileInput.setAttribute("id", "file");
fileInput.setAttribute("accept", "image/*");
fileInput.setAttribute("style", "display:none;");
fileInput.addEventListener("change", loadFile);

var label = document.createElement("label");
label.setAttribute("for", "file");

var icon = document.createElement("i");
icon.setAttribute("class", "fa-solid fa-image");
icon.setAttribute("id", "upload-icon");


label.appendChild(icon);

var prevText = document.createElement("div");
prevText.setAttribute("id", "prevText");


var textBox = document.createElement("textarea");
textBox.setAttribute("id", "textBox");
textBox.setAttribute("placeholder", "commentaire");


// Ajout des éléments au conteneur
imageContainer.appendChild(fileInput);
imageContainer.appendChild(label);
imageContainer.appendChild(prevText);
imageContainer.appendChild(textBox);

// Ajout du conteneur au corps du document
var imageBlock = document.getElementById("imageBlock");
imageBlock.appendChild(imageContainer);

// Fonction pour charger une image dans l'élément
function loadFile(event) {
  var imgBox = document.getElementById("imgBox");
  imgBox.style.backgroundImage =
    "url(" + URL.createObjectURL(event.target.files[0]) + ")";
}
