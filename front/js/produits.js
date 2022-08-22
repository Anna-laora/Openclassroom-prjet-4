//récupération de la chaîne de requête dans l'url
const queryString_url_id = window.location.search;
console.log(queryString_url_id);

// méthode pour extrair_ l'id
const urlSearchParams = new URLSearchParams(queryString_url_id);
console.log(urlSearchParams);

const id = urlSearchParams.get("id");
console.log(id);

//affichage du produit (de l'objet) qui a été sélectionné par l'id
//---Méthode 2 : avec fetch et en mettent la valeur de l'id à la fin de l'url
let response = fetch(`http://localhost:3000/api/products/${id}`);
console.log(response);

//sélection de la classe où je vais injecter le code HTML
const poisitionElement = document.querySelector(".item__img");
console.log(poisitionElement);

//structure HTMl pour l'affichage du produit sélectionné
const structureProduits = `<img src="${response.imageUrl}" alt="${response.altTxt}">`;

//injecttion HTML dans la page produit
poisitionElement.innerHTML = poisitionElement;
