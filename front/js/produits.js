const url = "http://localhost:3000/api/products";

// créé une carte produit et l'ajoute à son élément parent

function createCarteProduit(parent, produit) {
  // création du lien et ajout au body
  let carteProduit = createLink(parent, "./product.html?id=" + produit._id);

  // creation de l'article et ajoute de l'article au lien
  let articleProduit = createArticle(carteProduit);

  // création de l'image et ajout à l'article
  createImage(articleProduit, produit.imageUrl, produit.altTxt);

  // création du titre du produit et ajout à l'article
  createH3(articleProduit, produit.name, "productName");

  // création de la description du produit et ajout à l'article
  createParagraphe(articleProduit, produit.description, "productDescription");

  // retourne l'élément html créé
  return carteProduit;
}

function getAllProduits() {
  let cardsFetch = function () {
    //fonction qui va faire la requete get avec fetch
    fetch(url)
      .then((response) => response.json()) //reponse avec message dans la console
      .then((data) => {
        let produitsSection = document.getElementById("items"); //variable qui se referet a la balise section dans le html

        for (i = 0; i < data.length; i++) {
          // ici c'est la boucle for...of qui va afficher les produits

          createCarteProduit(produitsSection, data[i]); // .innerHTML va mettre cartes Produits dans produits section mais dans le HTML
        }
      })
      .catch((err) => console.log("Erreur:" + err)); //message si il y a une erreurs
  };
  cardsFetch();
}

function getIdUrl() {
  //récupération de la chaîne de requête dans l'url
  const queryString_url_id = window.location.search;

  // méthode pour extrair_ l'id
  const urlSearchParams = new URLSearchParams(queryString_url_id);

  let id = urlSearchParams.get("id");

  return id;
}

function createImageProduit(parent, produit, classHTML = "") {
  return createImage(parent, produit.imageUrl, produit.altTxt, classHTML);
}

function createDetailProduit(produit) {
  // récupération de l'élément ou on va ajouter l'image du produit
  let item_img = document.querySelector(".item__img");

  // création de l'image et ajout à div item__img
  createImageProduit(item_img, produit);

  // récupération de l'élément html où on va mettre la description
  let description = document.querySelector("#description");

  // ici pas besoin de créer un élément html, on ajoute directement le texte au paragraphe
  description.innerHTML = produit.description;

  // récupération de l'élément html où on va ajouter une nouvelle option
  let colors = document.querySelector("#colors");

  // ajout des options dans la liste déroulante
  for (i = 0; i < produit.colors.length; i++) {
    createOption(colors, produit.colors[i], produit.colors[i]);
  }
}

// récupère un produit selon son id passé dans l'url et l'insère dans la page
function getProduitById() {
  let id = getIdUrl();

  let cardFetch = function () {
    //fonction qui va faire la requete get avec fetch
    fetch(url + "/" + id)
      .then((response) => response.json()) //reponse avec message dans la console
      .then((leProduit) => {
        createDetailProduit(leProduit);
      })
      .catch((err) => console.log("Erreur:" + err)); //message si il y a une erreurs
  };
  cardFetch();
  addProduitPanier(produit);
}
