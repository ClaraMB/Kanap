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

// Récupération des données des canapés lors de l'ajout au panier
const colors = document.querySelector("#colors")
const quantity = document.querySelector("#quantity")
const price = document.querySelector("#price")

// Le choix de la couleur et quantité par l'utilisateur avec message erreur si non choisies
const button = document.querySelector("#addToCart")

    button.addEventListener("click", () => {
        let dataProducts = {
            id: id,
            color: null,
            quantity: null
        }
        const color = document.querySelector("#colors").value
        const quantity = document.querySelector("#quantity").value
        // Si color est = à null ou vide ou bien quantity = null ou vide alors affiche le message
        if (color === "" || color == null || quantity == 0 || quantity == null) {
        alert ("Veuillez sélectionner une couleur et une quantité")}
        else {
            dataProducts.color = color; 
            dataProducts.quantity = quantity ;

            var cart = JSON.parse(localStorage.getItem('cart')); 
            const cartContent = cart ? [...cart, dataProducts] : [dataProducts]   
            localStorage.setItem('cart', JSON.stringify(cartContent))
}
})

