var elem = document.querySelector(".main-carousel");
var flkty = new Flickity(elem, {
  // options
  cellAlign: "left",
  contain: true,
});

// element argument can be a selector string
//   for an individual element
var flkty = new Flickity(".main-carousel", {
  // options
});

const refs = {
  mainBlock: document.querySelector(".main-block-js"),
  cardsMenu: document.querySelector(".lesson-js"),
  startBtn: document.querySelector(".btn-start-js"),
  backBtn: document.querySelector(".btn-back-js"),
};

if (!localStorage.getItem("isStartMsgViewed")) {
  refs.startBtn.addEventListener("click", onStartBtnClick);
}

function onStartBtnClick() {
  generateStartTextMarkup();
  animateStartText();
  removeEventListenerStartBtn();
  addToLclStrgNote();
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
    }, 1500);

    setTimeout(() => {
      substartText.classList.add("opacity-0");
    }, 3000);
  }, 250);
}

function removeEventListenerStartBtn() {
  refs.startBtn.removeEventListener("click", onStartBtnClick);
}

function addToLclStrgNote() {
  localStorage.setItem("isStartMsgViewed", true);
}

generateCardsMarkup();

function generateCardsMarkup() {
  const cards = removeInfoItemsFromLocalStrg();

  const mainCarousel = document.querySelector(".main-carousel");

  const cardsMarkup = cards
    .map((el) => {
      return `<div class="carousel-cell"><img src="https://placehold.co/300x200/EEE/31343C" alt="" /></div>`;
    })
    .join("");
}

function removeInfoItemsFromLocalStrg() {
  const localStrgItems = Object.entries(localStorage);

  localStrgItems.forEach((el, index) => {
    if (el[0].slice(0, 2) === "is") {
      localStrgItems.splice(index, 1);
    }
  });

  return localStrgItems;
}
