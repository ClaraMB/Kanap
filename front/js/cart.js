const numberOfKanap = localStorage.length
console.log(numberOfKanap)
const cartContent = [];

for (let i = 0; i < numberOfKanap; i++) {
    const kanap = localStorage.getItem(localStorage.key(i))
    const kanapObject = JSON.parse(kanap)
    cartContent.push(numberOfKanap)
}

console.log(cartContent)