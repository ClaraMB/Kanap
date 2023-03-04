
var cartContent = [];
var currentKanap = {
    id: id,
    color: color,
    quantity: Number(quantity),
    price: data.price,
    imageUrl: imgUrl,
    altTxt: altText,
    name: kanap.name
};

cartContent = retrieveKanap() ? retrieveKanap() : []
console.log(cartContent)
cartContent.forEach((kanap) => {
    getKanap(kanap.id)
    displayKanap(kanap,currentKanap)
})

fetch("http://localhost:3000/api/products/" + id) // Appel à l'API pour récupérer l'image
.then(function(res) { // Réponse du backend sous format json
      return res.json(); // Retour du backend 
})
.then((currentKanap) => {
    data(currentKanap);
});

// Fonction pour récupérer le contenu du panier et le convertir en objet
function retrieveKanap() {
        const kanap = localStorage.getItem('cart')
        return JSON.parse(kanap)   
    }

// Fonction pour l'affichage des infos des canapés sur la page panier
function displayKanap(kanap,currentKanap){
    const article = createArticle(kanap)
    const sectionItems = document.getElementById('cart__items')
    sectionItems.appendChild(article)

    const div = createImageDiv(currentKanap)
    article.appendChild(div)
    
    const cartItemContent = createCartContent(kanap)
    article.appendChild(cartItemContent)
    displayArticle(article)
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
function createImageDiv(currentKanap){
    const div = document.createElement("div")
    div.classList.add("cart__item__img")
    const image = document.createElement("img")
    image.src = currentKanap.imageUrl
    image.alt = currentKanap.altTxt
    div.appendChild(image)
    return div
}

// Fonction pour créer la balise cart__item__content
function createCartContent(kanap){
    const cartItemContent = document.createElement("div")
    cartItemContent.classList.add("cart__item__content")
    const description = createDescription(kanap)
    const settings = createSettings(kanap) 
    
    cartItemContent.appendChild(description)
    cartItemContent.appendChild(settings)
    return cartItemContent
}

// Création de la balise cart__item__content__description
function createDescription(kanap) {
    const description = document.createElement("div")
    description.classList.add("cart__item__content__description")
    // Création de la balise h2 pour le nom du produit
    const h2 = document.createElement("h2")
    h2.textContent = kanap.name
    // Création de la balise p pour la couleur
    const pColor = document.createElement("p")
    pColor.textContent = kanap.color
    // Création de la balise p pour le prix
    const pPrice = document.createElement("p")
    pPrice.textContent = kanap.price + " €"
    
    div.appendChild(description)
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
    quantityDelete(settings)
    return "settings"
}

function quantityDelete(settings)
    const div = document.createElement("div")
    div.classList.add("cart__item__content__settings__delete")
    const pDelete = document.createElement("p")
    pDelete.textContent = "Supprimer"
    div.appendChild(pDelete)
    settings.appendChild(div)

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
    settings.appendChild(input)
}


