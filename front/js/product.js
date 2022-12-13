fetch("http://localhost:3000/api/products/107fb5b75607497b96722bda5b504926") // Appel à l'API pour récupérer sous forme de tableau la liste des produits
.then(function(res) { // Réponse du backend sous format json
      return res.json(); // Retour du backend 
})
  .then(data => { // On stock le résultat dans une variable. récupération grâce à l'id situé dans le DOM
    const div = document.querySelector(".item__img"); // On ajoute de l'html en conservant toutes les lignes dans la balise section qui a pour id items
    div.innerHTML += `<img src="` + data.imageUrl + `" alt="` + data.altTxt + `"> `;
})
.catch(function(err) {
    // Une erreur est survenue
});