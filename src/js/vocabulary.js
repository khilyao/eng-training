import Notiflix from "notiflix";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import closeSvg from "../assets/close.svg";

const vex = require("vex-js-fix");

export function vocabulary() {
  const formRefs = {
    form: document.querySelector("form"),
    inputs: document.querySelectorAll("input"),
    submitBtn: document.querySelector(".form-btn-js"),
    saveCardBtn: document.querySelector(".btn-save-js"),
  };

  let formDataArray = [];

  formRefs.form.addEventListener("submit", onSubmit);
  formRefs.submitBtn.addEventListener("click", onAddToCardBtn);
  formRefs.saveCardBtn.addEventListener("click", onSaveCardBtn);

  function onSubmit(e) {
    e.preventDefault();

    const engWord = formRefs.form.querySelector("#eng-word").value.trim();
    const userLangWord = formRefs.form
      .querySelector("#user-lang-word")
      .value.trim();
    const date = Date.now();
    formDataArray.push(normalizeText(engWord, userLangWord, date));
    formRefs.form.reset();

    updateWordList();
  }

  function normalizeText(...args) {
    let [engWord, userLangWord, date] = [...args];
    engWord = engWord[0].toUpperCase() + engWord.slice(1);
    userLangWord = userLangWord[0].toUpperCase() + userLangWord.slice(1);

    return { engWord, userLangWord, date };
  }

  function onAddToCardBtn() {
    const engWord = formRefs.form.querySelector("#eng-word").value.trim();
    const userLangWord = formRefs.form
      .querySelector("#user-lang-word")
      .value.trim();

    const firstInput = formRefs.form.elements[0];

    if (engWord && userLangWord) {
      Notiflix.Notify.success(`${engWord} successfully added`, {
        showOnlyTheLastOne: true,
        clickToClose: true,
      });
    }

    scrollToTop();
    firstInput.focus();
  }

  function onSaveCardBtn() {
    if (formDataArray.length === 0) {
      notifyUserAboutEmptyCard();
      return;
    }

    if (formDataArray.length < 5) {
      notifyUserAboutMinCountCards();
      return;
    }

    deactivateSaveBtn();
    clearValueInputs();
    showModalForCardName();
  }

  function updateWordList() {
    const wordsMarkup = formDataArray
      .sort((a, b) => a.date - b.date)
      .reverse()
      .map((el) => {
        return `<div class="word-item relative inline-block rounded px-2.5 py-2.5 mx-1.5 my-1.5 text-white text-sm">
         <button class="word-item-btn absolute p-0.5 bg-[#d4d4d4] top-0 right-0 translate-x-1/2 -translate-y-1/2 opacity-0 border border-neutral-500 rounded-[50%] hover:scale-110 transition duration-100 ease-linear" type="button">
         <svg class="w-[10px] h-[10px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="50px" height="50px"><path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z"/></svg>
         </button>
          <p>${el.engWord}</p></div>`;
      })
      .join(" ");
    const wordListLength = formDataArray.length;
    const isWordListRefCreated =
      Boolean(document.querySelector(".word-list")) === true;

    deleteWordList(isWordListRefCreated);

    formRefs.form.insertAdjacentHTML(
      "afterend",
      `<div class="word-list max-w-[400px] max-h-[200px] overflow-hidden px-5 pt-8 pb-5 -mx-1.5 -my-1.5 relative text-white w-full rounded-lg bg-fff">
        <div class="absolute top-2.5 left-5 mb-1 text-white">Card length: ${wordListLength}</div>
      </div>`
    );

    const wordListRef = document.querySelector(".word-list");
    wordListRef.insertAdjacentHTML("beforeend", wordsMarkup);

    addListenerToRemoveWord();

    if (formDataArray.length === 1) {
      notifyUserAboutMinCountCards();
    }

    if (formDataArray.length >= 5) {
      activateSaveBtn();
    }
  }

  function deleteWordList(isWordListRefCreated) {
    if (isWordListRefCreated) {
      const wordListRef = document.querySelector(".word-list");

      wordListRef.remove();
    }
  }

  function notifyUserAboutEmptyCard() {
    Notiflix.Notify.warning(
      "Fill in the fields, then add to the card and try again",
      {
        showOnlyTheLastOne: true,
        clickToClose: true,
      }
    );
  }

  function addListenerToRemoveWord() {
    const wordList = document.querySelector(".word-list");

    wordList.addEventListener("click", onRemoveWord);
  }

  function onRemoveWord(e) {
    const el = e.target;

    if (
      el.nodeName === "svg" ||
      el.nodeName === "path" ||
      el.nodeName === "BUTTON"
    ) {
      const word = el.parentElement.textContent.trim();

      removeWordFromList(el);
      removeSavedWord(word);
    }
  }

  function removeWordFromList(el) {
    el.parentElement.remove();
  }

  function removeSavedWord(word) {
    console.log(word);
    formDataArray.find((el) => el["engWord"] === word);
  }

  function notifyUserAboutMinCountCards() {
    Notiflix.Notify.info("The card must contain at least 5 words", {
      showOnlyTheLastOne: true,
      clickToClose: true,
      timeout: 4000,
    });
  }

  function removeWordListMarkup() {
    const wordListRef = document.querySelector(".word-list");

    if (wordListRef) {
      wordListRef.remove();
    }
  }

  function activateSaveBtn() {
    formRefs.saveCardBtn.classList.remove("bg-gray-600");
    formRefs.saveCardBtn.classList.add("bg-green-600", "hover:bg-green-500");
  }

  function deactivateSaveBtn() {
    formRefs.saveCardBtn.classList.remove("bg-green-600", "hover:bg-green-500");
    formRefs.saveCardBtn.classList.add("bg-gray-600");
  }

  function saveAllWordsToLocalStrg(cardName) {
    if (cardName) {
      localStorage.setItem(cardName, JSON.stringify(formDataArray));
    }

    formDataArray.length = 0;
  }

  function showModalForCardName() {
    vex.dialog.prompt({
      message: "What do you want to name the card?",
      input:
        '<input class="vex-dialog-prompt-input relative" name="vex" type="text" placeholder="Card 1" autocomplete="off" maxlength="12" required />',
      callback: function (value) {
        if (!value) {
          activateSaveBtn();
          return;
        }

        saveAllWordsToLocalStrg(value);
        showSuccessfulSaveCardMsg(value);
        removeWordListMarkup();
      },
      beforeClose: function () {
        const valueInput = document.querySelector(
          ".vex-dialog-prompt-input"
        ).value;
        const errorMsg = document.querySelector(".modal-error");
        const IsCardHasAlreadyCreated =
          checkIsCardHasAlreadyCreated(valueInput);

        if (IsCardHasAlreadyCreated) {
          if (!errorMsg) {
            addErrorMarkupParagraph();
          }
          return false;
        }

        return true;
      },
    });
  }

  function clearValueInputs() {
    formRefs.inputs.forEach((el) => (el.value = ""));
  }

  function checkIsCardHasAlreadyCreated(newCard) {
    const allCards = getAllCards();
    const allCardsArr = allCards.map((el) => el[0]);

    return allCardsArr.includes(newCard);
  }

  function getAllCards() {
    const localStrgItems = Object.entries(localStorage).filter((el) => {
      if (el[1] === "true" || el[1] === "false") {
        return false;
      }

      return true;
    });

    return localStrgItems;
  }

  function showSuccessfulSaveCardMsg(cardName) {
    if (cardName) {
      Notiflix.Notify.success(`Your card "${cardName}" successfully created`, {
        showOnlyTheLastOne: true,
        clickToClose: true,
      });
    }
  }

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function addErrorMarkupParagraph() {
    const vexDialogContainer = document.querySelector(".vex-dialog-input");

    vexDialogContainer.classList.add("relative");

    vexDialogContainer.insertAdjacentHTML(
      "beforeend",
      '<p class="modal-error absolute text-[12px] left-0 -bottom-[20px]" style="color: red">* This card name is already in use</p>'
    );
  }
}
