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
        total += parseInt(totalUnitPrice)
    })
    totalPrice.textContent = total
}

// Fonction pour pouvoir modifier et mettre à jour le total de la quantité et des articles du panier
function changePriceAndQuantity(id, newQuantity, priceKanap){
    const dataToUpdate = cartContent.find((kanap) => kanap.id === id)
    dataToUpdate.quantity = newQuantity
    displayTotalQuantity(priceKanap)
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
    const settings = createSettings(kanap, priceKanap) 
    
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
function createSettings(kanap, priceKanap){
    const settings = document.createElement("div")
    settings.classList.add("cart__item__content__settings")

    quantitySettings(settings, kanap, priceKanap)
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
}

function quantitySettings(settings, kanap, priceKanap){
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
    input.addEventListener('change', () => changePriceAndQuantity(kanap.id, input.value, priceKanap))

    quantity.appendChild(input)
    settings.appendChild(quantity)
}

// FORMULAIRE

// sélectionner le bouton valider 
const orderButton = document.querySelector(".cart__order__form__submit")

const validationForm = {
    firstName: {
        element: document.getElementById("firstName"),
        regex: /^[A-Za-z][A-Za-z\é\è\ê\ë\ï\œ\-\s]+$/,
        errorMsg: "Prénom invalide"
    },
    lastName: {
        element: document.getElementById("lastName"),
        regex: /^[A-Za-z][A-Za-z\é\è\ê\ë\ï\œ\-\s]+$/,
        errorMsg: "Nom invalide"
    },
    address: {
        element: document.getElementById("address"),
        regex: /^[#.0-9a-zA-ZÀ-ÿ\s,-]{2,60}$/,
        errorMsg: "Adresse invalide"
    },
    city: {
        element: document.getElementById("city"),
        regex: /^[A-Za-z][A-Za-z\é\è\ê\ë\ï\œ\-\s]+$/,
        errorMsg: "Ville invalide"
    },
    email: {
        element: document.getElementById('email'),
        regex: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        errorMsg: "Email invalide"
    }
};

const firstNameInput = document.getElementById("firstName");
firstNameInput.addEventListener("change", () => checkInput(validationForm.firstName));

const lastNameInput = document.getElementById("lastName");
lastNameInput.addEventListener("change", () => checkInput(validationForm.lastName));

const addressInput = document.getElementById("address");
addressInput.addEventListener("change", () => checkInput(validationForm.address));

const cityInput = document.getElementById("city");
cityInput.addEventListener("change", () => checkInput(validationForm.city));

const emailInput = document.getElementById("email");
emailInput.addEventListener("change", () => checkInput(validationForm.email));

function checkInput(input) {
    const inputElement = input.element;
    const inputRegex = input.regex;
    const errorMsg = input.errorMsg;
    const errorDiv = input.element.nextElementSibling;
    const isRegexValid = inputRegex.test(inputElement.value);

    if (isRegexValid) {
        errorDiv.innerText = "";
    } else {
        errorDiv.innerText = errorMsg;
    }
    return isRegexValid;
}

// écoute du clic sur le bouton valider
orderButton.addEventListener("click", (e) => submitForm(e));

function submitForm(e) {
    e.preventDefault() // pour éviter que la page se recharge au clic
    if (cartContent.length === 0) // si le panier est vide affiche ce message d'erreur
    alert("Votre panier est vide, veuillez sélectionner des articles.")

    let contact = {
        firstName: firstNameInput.value,
        lastName: lastNameInput.value,
        address: addressInput.value,
        city: cityInput.value,
        email: emailInput.value
    };

    let products = cartContent.map(product => product.id)

    if (
        checkInput(validationForm.firstName) == false &&
        checkInput(validationForm.lastName) == false &&
        checkInput(validationForm.address) == false &&
        checkInput(validationForm.city) == false &&
        checkInput(validationForm.email) == false
        ){
        alert("Le formulaire est incorrect.");
    }
    if (
        cartContent.length > 0 &&
        checkInput(validationForm.firstName) &&
        checkInput(validationForm.lastName) &&
        checkInput(validationForm.address) &&
        checkInput(validationForm.city) &&
        checkInput(validationForm.email)
        ){
        // on enregistre le formulaire dans le LS
        localStorage.setItem("contact", JSON.stringify(contact));
        // on appelle la fonction qui envoie les données au serveur
        sendToServer();
    }

// Fonction qui envoie les données au serveur avec méthode POST

function sendToServer() {
    fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
    },
      body: JSON.stringify({contact, products}), // clefs contact et products
    })
      // on récupère et stock la réponse de l'API (orderId)
    .then((response) => {
        return response.json();
    })
    .then((server) => {
        const orderId = server.orderId;
        // si orderId n'est pas undefined l'utilisateur est redirigé vers la page confirmation
        if (orderId != undefined) {
            location.href = "confirmation.html?id=" + orderId;
            alert("Votre commande a bien été enregistrée");
        }
    });
}
};
