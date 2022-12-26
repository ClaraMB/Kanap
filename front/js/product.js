const searchParams = new URLSearchParams(window.location.search);
const id = searchParams.get('id');


fetch("http://localhost:3000/api/products/" + id) // Appel à l'API pour récupérer l'image
.then(function(res) { // Réponse du backend sous format json
      return res.json(); // Retour du backend 
})
.then(data => { // On stock le résultat dans une variable. récupération grâce à query selector
    const image = document.querySelector(".item__img"); 
    image.innerHTML = `<img src="` + data.imageUrl + `" alt="` + data.altTxt + `"> `;

    const name = document.querySelector("#title"); 
    name.innerHTML = `<h1 id="title">` + data.name + `</h1>`;

    const price = document.querySelector("#price"); 
    price.innerHTML = `<span id="price">` + data.price + `</span>`;

    const div = document.querySelector(".item__content__description"); 
    div.innerHTML = `<p id="description">` + data.description + ` </p>`;

    const select = document.querySelector("#colors"); 
    data.colors.forEach(color => {
        select.innerHTML += `<option value="` + color + `">` + color + `</option>`;
        });
})

.catch(function(err) {
    // Une erreur est survenue
})
