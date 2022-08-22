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
let reponse = fetch(`http://localhost:3000/api/products/${id}`);

//sélection de la classe où je vais injecter le code HTML
const positionElements = document.querySelector(".item__img");

//structure HTMl pour l'affichage du produit sélectionné
const structureProduits = ` <div class=" ${id}>
<img src="${id.imageUrl}" alt="${id.altTxt}"> </div>`;

//injecttion HTML dans la page produit
positionElements.innerHTML = structureProduits;
