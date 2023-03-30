
// on crée un tableau pour récupérer les ID de chaque produit du panier
var cartContent = [];

cartContent = retrieveKanap() ? retrieveKanap() : []
cartContent.forEach((kanap) => {
    fetch("http://localhost:3000/api/products/" + kanap.id) // Appel à l'API pour récupérer le detail du canape
    .then(function(res) { // Réponse du backend sous format json
        return res.json(); // Retour du backend 
    })
    .then((priceKanap) => {
        displayKanap(kanap, priceKanap);
    });  
})

// Fonction pour récupérer le contenu du panier et le convertir en objet
function retrieveKanap() {
        const kanap = localStorage.getItem('cart')
        return JSON.parse(kanap)   
    }

// Fonction pour l'affichage des infos des canapés sur la page panier
function displayKanap(kanap, priceKanap){
    const article = createArticle(kanap)
    const sectionItems = document.getElementById('cart__items')
    sectionItems.appendChild(article)

    const div = createImageDiv(priceKanap)
    article.appendChild(div)
    
    const cartItemContent = createCartContent(kanap, priceKanap)
    article.appendChild(cartItemContent)
    displayTotalQuantity(priceKanap)
    displayTotalPrice(priceKanap)
}
// Fonction pour faire le total du prix + le total de la quantité des articles

function displayTotalQuantity(){
    let total = 0
    const totalQuantity = document.querySelector("#totalQuantity")
    cartContent.forEach((priceKanap) => {
        total += +priceKanap.quantity
    })
    totalQuantity.textContent = total
}

function displayTotalPrice(kanap){
    let total = 0
    const totalPrice = document.querySelector("#totalPrice")
    cartContent.forEach((priceKanap) => {
        const totalUnitPrice = kanap.price * priceKanap.quantity
        total += totalUnitPrice
    })
    totalPrice.textContent = total
}

// Fonction pour pouvoir modifier et mettre à jour le total de la quantité et des articles du panier
function changePriceAndQuantity(id, newQuantity, priceKanap){
    const dataToUpdate = cartContent.find((kanap) => kanap.id === id)
    dataToUpdate.quantity = newQuantity
    displayTotalQuantity(priceKanap)
    console.log(priceKanap)
    displayTotalPrice(priceKanap)
}

// Fonction pour créer la balise "article"
function createArticle(kanap){
    const article = document.createElement("article")
    article.classList.add("cart__item")
    article.dataset.id = kanap.id
    article.dataset.color = kanap.color
    return article
}

// Fonction pour créer la balise div img
function createImageDiv(priceKanap){
    const div = document.createElement("div")
    div.classList.add("cart__item__img")
    const image = document.createElement("img")
    image.src = priceKanap.imageUrl
    image.alt = priceKanap.altTxt
    div.appendChild(image)
    return div
}

// Fonction pour créer la balise cart__item__content
function createCartContent(kanap, priceKanap){
    const cartItemContent = document.createElement("div")
    cartItemContent.classList.add("cart__item__content")
    const description = createDescription(kanap, priceKanap)
    const settings = createSettings(kanap) 
    
    cartItemContent.appendChild(description)
    cartItemContent.appendChild(settings)
    return cartItemContent
}

// Création de la balise cart__item__content__description
function createDescription(kanap, priceKanap) {
    const description = document.createElement("div")
    description.classList.add("cart__item__content__description")
    // Création de la balise h2 pour le nom du produit
    const h2 = document.createElement("h2")
    h2.textContent = priceKanap.name
    // Création de la balise p pour la couleur
    const pColor = document.createElement("p")
    pColor.textContent = kanap.color
    // Création de la balise p pour le prix
    const pPrice = document.createElement("p")
    pPrice.textContent = priceKanap.price + " €"
    
    description.appendChild(h2)
    description.appendChild(pColor)
    description.appendChild(pPrice)
    return description
    }

// Fonction pour créer la balise cart__item__content__settings avec les blocs Quantity et Delete
function createSettings(kanap){
    const settings = document.createElement("div")
    settings.classList.add("cart__item__content__settings")

    quantitySettings(settings, kanap)
    quantityDelete(settings, kanap)
    return settings
}

function quantityDelete(settings, kanap){ 
    const div = document.createElement("div")
    div.classList.add("cart__item__content__settings__delete")
    div.addEventListener("click", () => deleteKanap(kanap))
        

    const pDelete = document.createElement("p")
    pDelete.textContent = "Supprimer"
    div.appendChild(pDelete)
    settings.appendChild(div)
}

// Fonction pour pouvoir supprimer un produit du panier
function deleteKanap(kanap){
    const kanapToDelete = cartContent.findIndex(
        //Selection de l'element à supprimer en fonction de son id ET sa couleur
        (product) => product.id === kanap.id && product.color === kanap.color
    )
    cartContent.splice(kanapToDelete, 1)
    // mise à jour du localstorage
    localStorage.setItem("cart", JSON.stringify(cartContent));
            
    //Alerte produit supprimé
    alert("Ce produit a bien été supprimé du panier");
    document.location.reload();
    console.log(cartContent)
}

function quantitySettings(settings, kanap){
    const quantity = document.createElement("div")
    quantity.classList.add("cart__item__content__settings__quantity")
    const pQuantity = document.createElement("p")
    pQuantity.textContent = "Qté : "
    quantity.appendChild(pQuantity)
    const input = document.createElement("input")
    input.type = "number"
    input.classList.add("itemQuantity")
    input.name = "itemQuantity"
    input.min = "1"
    input.max = "100"
    input.value = kanap.quantity
    input.addEventListener('change', (priceKanap) => changePriceAndQuantity(kanap.id, input.value, priceKanap))

    quantity.appendChild(input)
    settings.appendChild(quantity)
}

