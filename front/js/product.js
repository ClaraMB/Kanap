// Appel à l'API pour récupérer l'image
const searchParams = new URLSearchParams(window.location.search);
// on peut récupérer la valeur d'une clé
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
            quantity: null,
        }
        const color = document.querySelector("#colors").value
        const quantity = document.querySelector("#quantity").value
        // Si color est = à null ou vide ou bien quantity = null ou vide alors affiche le message
        if (color === "" || color == null || quantity == 0 || quantity == null || quantity >= 101) {
        alert ("Veuillez sélectionner une couleur et une quantité entre 1 et 100 svp")}
        else {
            dataProducts.color = color; 
            dataProducts.quantity = quantity ;
            
            var cart = JSON.parse(localStorage.getItem('cart')); 

// puis on vérifie si le produit existe déjà dans le LS
    // on vérifie avec .find() si l'id et la couleur d'un article sont déjà présents
    let kanap = cart?.find(
        (kanap) => kanap.id == dataProducts.id && kanap.color == dataProducts.color
    );

    // SI OUI > on ajoute la nouvelle quantité à l'ancienne
    if (kanap) {
        const newQuantity = +kanap.quantity + +dataProducts.quantity;
        dataProducts.quantity = JSON.stringify(newQuantity);
        alert("La quantité du produit a bien été mise à jour.");
        // et on réassigne kanap.quantity 
        kanap.quantity = newQuantity;

        const cartContent = cart.length > 0 ? cart : [dataProducts]
        localStorage.setItem('cart', JSON.stringify(cartContent));
    }
else{
     // si le produit n'existe pas déjà dans le LS on le push
    const cartContent = cart?.length > 0 ? [...cart, dataProducts] : [dataProducts]   
    localStorage.setItem('cart', JSON.stringify(cartContent));
    alert("Le produit a bien été ajouté au panier.")
}
        }
})


