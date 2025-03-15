const pElement = document.createElement('p');
pElement.textContent = 'Hello';
const h1Node = document.querySelector('h1');
h1Node.replaceWith(pElement);