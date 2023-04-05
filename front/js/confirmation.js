//On récupère l'ID du produit
function getProductId() {
    return new URL(location.href).searchParams.get("id")
}

const orderId = getProductId();

// on cible l'élément dans le DOM 
const confirmationOrder = document.getElementById("orderId");

// Fonction qui affiche le numéro de commande
function displayOrderId() {
    confirmationOrder.innerHTML = "</br>" + orderId;

    //On vide le local storage
    localStorage.clear();
}
displayOrderId(orderId)