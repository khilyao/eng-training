import List from "list.js";

var options = {
  valueNames: ["name"],
  item: '<li><h3 class="name"></h3></li>',
};
var values = "";
var userList = new List("cards", options, values);

const refs = {
  mainBlock: document.querySelector(".main-block-js"),
  cardsMenu: document.querySelector(".lesson-js"),
  startBtn: document.querySelector(".btn-start-js"),
  backBtn: document.querySelector(".btn-back-js"),
};

refs.startBtn.addEventListener("click", onStartBtnClick);

function onStartBtnClick() {
  if (!localStorage.getItem("isStartMsgViewed")) {
    generateStartTextMarkup();
    animateStartText();
    addToLclStrgNote();
  }

  createInitMarkupStartSection();
}

function generateStartTextMarkup() {
  refs.mainBlock.insertAdjacentHTML(
    "beforeend",
    "<p class='start-text-js absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl font-bold sm:text-4xl lg:text-6xl opacity-0 transition-opacity duration-500 ease-in-out text-white'>Let's start</p><p class='substart-text-js w-4/5 text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xl font-bold sm:text-4xl lg:text-6xl opacity-0 transition-opacity duration-500 ease-in-out text-white'>You have your word cards, choose one and study it</p>"
  );
}

function animateStartText() {
  const startText = refs.mainBlock.querySelector(".start-text-js");
  const substartText = refs.mainBlock.querySelector(".substart-text-js");

  setTimeout(() => {
    startText.classList.remove("opacity-0");

    setTimeout(() => {
      startText.classList.add("opacity-0");

      substartText.classList.remove("opacity-0");
    }, 2000);

    setTimeout(() => {
      substartText.classList.add("opacity-0");
    }, 4000);
  }, 250);
}

function addToLclStrgNote() {
  localStorage.setItem("isStartMsgViewed", true);
}

function generateCardsMarkup() {
  const cards = removeInfoItemsFromLocalStrg();

  const cardsMarkup = cards.map((el) => {
    return { name: el[0] };
  });

  return cardsMarkup;
}

function removeInfoItemsFromLocalStrg() {
  const localStrgItems = Object.entries(localStorage).filter((el) => {
    if (el[1] === "true" || el[1] === "false") {
      return false;
    }

    return true;
  });

  localStrgItems.forEach((el) => {
    const arr = JSON.parse(el[1]);
    el[1] = arr;
  });

  return localStrgItems;
}

function createInitMarkupStartSection() {
  const allCards = generateCardsMarkup();

  allCards.forEach(({ name }) => {
    userList.add({
      name,
    });
  });
}
