const url = "http://localhost:3000/api/products"; //constante avec url api
let cardsFetch = function () {
  //fonction qui va faire la requete get avec fetch
  fetch(url)
    .then((response) => response.json()) //reponse avec message dans la console
    .then((data) => {
      console.log(data);

      let produitsSection = document.getElementById("items"); //variable qui se referet a la balise section dans le html

      for (i = 0; i < data.length; i++) {
        // ici c'est la boucle for...of qui va afficher les produits

        const cartesProduits = `
          <a href="./product.html?id=${data[i]._id}">
            <article>
              <img
                src="${data[i].imageUrl}"
                alt="${data[i].altTxt}"
              />
              <h3 class="productName">${data[i].name}</h3>
              <p class="productDescription">
                ${data[i].description}
              </p>
            </article>
          </a>
        `;
        produitsSection.innerHTML += cartesProduits; // .innerHTML va mettre cartes Produits dans produits section mais dans le HTML
      }
    })
    .catch((err) => console.log("Erreur:" + err)); //message si il y a une erreurs
};
cardsFetch();
