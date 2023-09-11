import List from "list.js";
import { startLesson, finishLesson } from "./lesson.js";

var options = {
  valueNames: ["name"],
  item: '<li class="flex items-center mb-2"><button class="btn name min-w-[100px] py-2.5 px-2.5 rounded uppercase cursor-pointer text-base tracking-[1px] text-white border-none font-normal hover:scale-105 focus:outline-none active:scale-95"></button></li>',
};
var values = "";
var userList = new List("cards", options, values);

export function cards() {
  const refs = {
    list: document.querySelector(".cards-list-js"),
    mainBlock: document.querySelector(".main-block-js"),

    startBtn: document.querySelector(".btn-start-js"),
    backBtn: document.querySelector(".btn-back-js"),
  };

  refs.startBtn.addEventListener("click", onStartBtn);
  refs.list.addEventListener("click", onCard);

  function onCard(e) {
    if (e.target.nodeName !== "BUTTON") {
      return;
    }

    const cardName = e.target.textContent;
    const cardBody = JSON.parse(localStorage.getItem(e.target.textContent));

    hideCurrentSection();
    startLesson(cardName, cardBody);
  }

  function hideCurrentSection() {
    const cardsMenu = document.querySelector(".lesson-js");

    toggleHiddenClass(cardsMenu);
  }

  function toggleHiddenClass(el) {
    el.classList.toggle("hidden");
  }

  function onStartBtn() {
    userList.clear();

    if (!localStorage.getItem("isStartMsgViewed")) {
      generateStartTextMarkup();
      animateStartText();
      addToLclStrgNote();
    }

    initMarkupStartSection();
  }

  function generateStartTextMarkup() {
    refs.mainBlock.insertAdjacentHTML(
      "beforeend",
      "<div class='start-text-wrapper-js fixed top-0 left-0 w-screen h-screen bg-black z-10'><p class='start-text-js absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl font-bold sm:text-4xl lg:text-6xl opacity-0 transition-opacity duration-500 ease-in-out text-white'>Let's start</p><p class='substart-text-js w-4/5 text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xl font-bold sm:text-4xl lg:text-6xl opacity-0 transition-opacity duration-500 ease-in-out text-white'>You have your word cards, choose one and study it</p>/div>"
    );
  }

  function animateStartText() {
    const startText = refs.mainBlock.querySelector(".start-text-js");
    const substartText = refs.mainBlock.querySelector(".substart-text-js");

    setTimeout(() => {
      removeOpacityFromAnEl(startText);

      setTimeout(() => {
        addOpacityClassToEl(startText);

        removeOpacityFromAnEl(substartText);
      }, 2000);

      setTimeout(() => {
        addOpacityClassToEl(substartText);
        setTimeout(() => {
          hideStartTextMarkup();
        }),
          300;
      }, 4000);
    }, 250);
  }

  function addOpacityClassToEl(el) {
    el.classList.add("opacity-0");
  }

  function removeOpacityFromAnEl(el) {
    el.classList.remove("opacity-0");
  }

  function hideStartTextMarkup() {
    const startTextWrapper = document.querySelector(".start-text-wrapper-js");

    startTextWrapper.classList.add("hidden");
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

    return parseToJSON(localStrgItems);
  }

  function parseToJSON(Array) {
    Array.forEach((el) => {
      const arr = JSON.parse(el[1]);
      el[1] = arr;
    });

    return Array;
  }

  function initMarkupStartSection() {
    const allCards = generateCardsMarkup();

    allCards.forEach(({ name }) => {
      userList.add({
        name,
      });
    });
  }
}
