let symbolpair2 = document.getElementById() 
let table = document.getElementById("lastprice");

// function lastPrice (symbolpair2)
//  {  
//   var symbolpair= symbolpair2
//   var interval = "1m"
//   var url = "https://data.binance.com/api/v3/klines?" +"symbol="+ symbolpair +"&interval="+ interval
//   var obj_array=JSON.parse(UrlFetchApp.fetch(url).getContentText().toString())
//   var prix1m= JSON.stringify(obj_array).split('","');

//   return parseFloat(prix1m[3]);
//   }
 
  // Supposons que les données JSON aient la structure suivante :
  let jsonData = [
    { nom: "Alice", age: 25 },
    { nom: "Bob", age: 30 },
    { nom: "Charlie", age: 35 }
  ];
  
  // Parcourez les données et créez dynamiquement les lignes
  jsonData.forEach(function(element) {
    // Créez une nouvelle ligne de tableau
    let row = table.insertRow();
  
    // Ajoutez des cellules pour chaque propriété de l'élément
    let cellNom = row.insertCell();
    cellNom.innerHTML = element.nom;
    let cellAge = row.insertCell();
    cellAge.innerHTML = element.age;
  });