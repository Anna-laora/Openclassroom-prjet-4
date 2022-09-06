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

// récupération de l'id dans l'url
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

// affiche toutes les informations d'un produit
function createDetailProduit(produit) {
  // récupération de l'élément ou on va ajouter l'image du produit
  let item_img = document.querySelector(".item__img");

  // création de l'image et ajout à div item__img
  createImageProduit(item_img, produit);

  // récupération de l'élément html où on va mettre la description
  let description = document.querySelector("#description");

  // ici pas besoin de créer un élément html, on ajoute directement le texte au paragraphe
  description.innerHTML = produit.description;

  // affichage du prix dans la balise span
  // récupération de la balise html
  let prix = document.getElementById("price");
  // on met dans la balise html le prix du produit
  prix.innerHTML = produit.price;

  // affichage du titre dans la balise h1
  // récupération de la balise h1
  let title = document.getElementById("title");
  // on met dans la balise html le titre du produit
  title.innerHTML = produit.name;

  //affichage du titre de la page par le nom du produit
  //Récupération de la balise
  let titlePage = document.querySelector("title");
  //on met dans la balise html le titre de la page du produit
  titlePage.innerHTML = produit.name;

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
}

// permet d'ajouter un produit au panier
function ajouterProduitPanier() {
  // récupération de la couleur, du modèle et de la quantité du produit
  let colorsHtml = document.getElementById("colors");
  let colors = colorsHtml.value;

  // récupération du nombre du produit
  let quantityHtml = document.getElementById("quantity");
  let quantity = parseInt(quantityHtml.value);

  // récupération de l'id du produit
  let id = getIdUrl();

  // permet de gérer les erreurs pour ajouter un produit au panier
  let aUneErreur = gestionErreurPanier(colors, quantity);

  if (aUneErreur == false) {
    // récupération du panier et on transforme la chaine comprise dans le panier en tableau
    let panier = JSON.parse(localStorage.getItem("panier"));

    // produit trouvé dans le panier
    let produitTrouve = false;

    // s'il n'y a pas de produit enregistré dans le local storage
    if (panier === null) {
      panier = [];
    }
    // sinon il y a des produits dans le panier
    else {
      // parcourir le panier pour retrouver le produit
      for (i = 0; i < panier.length; i++) {
        // si l'id du produit en cours de lecture est égale à mon produit avec la même couleur  dans le panier
        if (panier[i].id == id && panier[i].color == colors) {
          // mon produit est trouvé
          produitTrouve = true;
          // alors je modifie la quantité
          panier[i].quantity = panier[i].quantity + quantity;
        }
      }
    }

    // si le produit n'est pas trouvé dans le panier alors on le créé
    if (produitTrouve == false) {
      // on enregistre dans un objet le produit
      let produit = {
        id: id,
        color: colors,
        quantity: quantity,
      };

      // ajout du produit au tableau panier
      panier.push(produit);
    }

    // sauvegarde du panier dans le local storage
    localStorage.setItem("panier", JSON.stringify(panier));

    console.log(panier);
  }

  let sucessPanier = produitValider(colors, quantity);

  if (sucessPanier == true) {
  }
}

// permet de gérer les erreurs pour ajouter un produit au panier
function gestionErreurPanier(colors, quantity) {
  // récupération de la balise pour afficher les erreurs
  let errors = document.getElementById("errors");

  // on vide la partie des erreurs au cas où il y ait des erreurs d'écrit
  errors.innerHTML = "";

  // si on a pas sélectionné de couleur
  if (colors == "") {
    errors.innerHTML = "Veuillez sélectionner une couleur.<br/>";
  }

  // la quantité doit être comprise entre 1 et 100
  if (quantity < 1 || quantity > 100) {
    errors.innerHTML += "Veuillez saisir une quantité entre 1 et 100.";
  }

  // s'il n'y a pas d'erreur affichée alors on va gérer le produit dans le panier
  if (errors.innerHTML != "") {
    // retourne la valeur true pour dire qu'il y  a des erreurs
    return true;
  } else {
    // sinon on retourne false pour dire qu'il n'y a pas d'erreur
    return false;
  }
}

//gestion de la validation du panier
function produitValider(colors, quantity) {
  //Récupération de la balise pour afficher le message de validation du panier
  let succes = document.getElementById("succes");

  //si on a sécletionné la couleur
  if (colors == "colors") {
    succes.innerHTML = "Votre panier a bien été valider";
  }
  if (quantity < 1 || quantity > 100) {
    succes.innerHTML = "Votre panier a bien été valider";
  }
}
