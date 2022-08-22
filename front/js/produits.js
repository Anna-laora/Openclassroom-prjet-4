const str = window.location; //Renvois a l'objet location qui contient des information à propros de l'emplacement courant du document
const url = new URL(str);
const id = url.searchParams.get("id");
const host = "http://localhost:3000/api/products"; //constante avec url api

let cardsFetch = function () {
  //fonction de la requete de api
  fetch(host)
    .then((reponse) => reponse.json())
    .then((data) => {
      console.log(data);

      let img = document.querySelector(".item__img"); //variable qui se referet a la balise  dans le html
      img.innerHTML = `<img src="${data.imageUrl}" alt="${data.altTxt}">`; // .innerHTML va mettre en place le HTML
    });
};
