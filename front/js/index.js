fetch("http://localhost:3000/api/products") // Appel à l'API pour récupérer sous forme de tableau la liste des produits
.then(function(res) { // Réponse du backend sous format json
      return res.json(); // Retour du backend 
})
  .then(tableaudekanap => { // On stock le résultat dans une variable. récupération grâce à l'id situé dans le DOM
    const section = document.getElementById("items"); // On ajoute de l'html en conservant toutes les lignes dans la balise section qui a pour id items
    tableaudekanap.forEach(kanap => {
    section.innerHTML += `<a href="./product.html?id=` + kanap._id + `"> 
    <article>
    <img src="` + kanap.imageUrl + `" alt="` + kanap.altTxt + `">
    <h3 class="productName">` + kanap.name + `</h3>
    <p class="productDescription">` + kanap.description + `</p>
    </article>
</a> `;
    });
})
.catch(function(err) {
    // Une erreur est survenue
});
