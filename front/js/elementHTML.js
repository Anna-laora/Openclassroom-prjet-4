// ajoute une classe à un élément html s'il est défini
function addClassName(element, classHtml) {
  // si le paramètre classHTML est défini alors on ajoute une classe à l'élément
  if (classHtml != "") {
    // ajout de la classe html
    element.className = classHtml;
  }

  return element;
}

// créé un élément html et l'ajoute à son parent
function createElementHTML(parent, name, classHTML = "") {
  // création d'une balise html qui porte le nom "name" (exemple : h3, a, div, p, etc...)
  let element = document.createElement(name);

  // ajoute une class css à l'élément
  element = addClassName(element, classHTML);

  //
  // parent.innerHTML = element;

  parent.append(element);

  return element;
}

function createDiv(parent, classHTML = "") {
  return createElementHTML(parent, "div", classHTML);
}

function createOption(parent, value, content, classHTML = "") {
  let option = createElementHTML(parent, "option", classHTML);

  option.value = value;
  option.innerHTML = content;

  return option;
}

function createLink(parent, href, classHtml = "") {
  // création d'une balise html <a> et ajout au parent
  let link = createElementHTML(parent, "a", classHtml);

  // attribution du lien
  link.href = href;

  return link;
}

function createArticle(parent, classHtml = "") {
  // création d'une blaise html <article>
  let article = createElementHTML(parent, "article", classHtml);

  return article;
}

function createImage(parent, src, alt, classHtml = "") {
  // création d'une blaise html <img>
  let image = createElementHTML(parent, "img", classHtml);

  // définition de l'attribut src
  image.src = src;
  // définition de l'attribut alt
  image.alt = alt;

  return image;
}

function createH3(parent, title, classHtml = "") {
  // création d'une blaise html <h3>
  let h3 = createElementHTML(parent, "h3", classHtml);

  // définition du contenu du titre
  h3.innerHTML = title;

  return h3;
}

function createParagraphe(parent, content, classHtml = "") {
  // création d'une blaise html <p>
  let paragraphe = createElementHTML(parent, "p", classHtml);

  paragraphe.innerHTML = content;

  return paragraphe;
}
