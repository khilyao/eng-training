import Notiflix from "notiflix";
import { Notify } from "notiflix/build/notiflix-notify-aio";

var vex = require("vex-js-fix");
vex.registerPlugin(require("vex-dialog"));
vex.defaultOptions.className = "vex-theme-wireframe";

const formRefs = {
  form: document.querySelector("form"),
  inputs: document.querySelectorAll("input"),
  submitBtn: document.querySelector(".form-btn-js"),
  saveCardBtn: document.querySelector(".btn-save-js"),
};

let formDataArray = [];

formRefs.form.addEventListener("submit", onSubmit);

formRefs.submitBtn.addEventListener("click", onSubmitBtn);

formRefs.saveCardBtn.addEventListener("click", onSaveCardBtn);

function onSubmit(e) {
  e.preventDefault();

  const engWord = formRefs.form.querySelector("#eng-word").value.trim();
  const userLangWord = formRefs.form
    .querySelector("#user-lang-word")
    .value.trim();
  const date = Date.now();

  formDataArray.push({ engWord, userLangWord, date });

  formRefs.form.reset();

  updateWordList();
}

function onSubmitBtn() {
  const engWord = formRefs.form.querySelector("#eng-word").value.trim();
  const userLangWord = formRefs.form
    .querySelector("#user-lang-word")
    .value.trim();

  const firstInput = formRefs.form.elements[0];

  if (engWord && userLangWord) {
    Notiflix.Notify.success(`${engWord} successfully added`, {
      showOnlyTheLastOne: true,
    });
  }

  firstInput.focus();
}

function onSaveCardBtn() {
  if (formDataArray.length === 0) {
    notifyUserAboutEmptyCard();
    return;
  }

  deactivateSaveBtn();
  clearValueInputs();
  showModalForCardName();
}

function updateWordList() {
  const wordsMarkup = formDataArray
    .reverse()
    .map((el) => {
      return `<div class="word-item inline-block rounded px-2.5 py-2.5 mx-1.5 my-1.5 text-white text-sm">${el.engWord}</div>`;
    })
    .join(" ");
  const wordListLength = formDataArray.length;

  isWordListCreated();

  formRefs.form.insertAdjacentHTML(
    "afterend",
    `<div class="word-list max-w-[400px] max-h-[200px] overflow-hidden px-5 pt-8 pb-5 -mx-1.5 -my-1.5 relative text-white w-full rounded-lg bg-fff">
      <div class="absolute top-2.5 left-5 mb-1 text-white">Card length: ${wordListLength}</div>
    </div>`
  );

  const wordListRef = document.querySelector(".word-list");

  wordListRef.insertAdjacentHTML("beforeend", wordsMarkup);

  activateSaveBtn();
}

function isWordListCreated() {
  const wordListRef = document.querySelector(".word-list");

  if (wordListRef) {
    wordListRef.remove();
  }
}

function notifyUserAboutEmptyCard() {
  Notiflix.Notify.warning(
    "Fill in the fields, then add to the card and try again",
    {
      showOnlyTheLastOne: true,
    }
  );
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
      const IsCardHasAlreadyCreated = checkIsCardHasAlreadyCreated(valueInput);

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
    });
  }
}

function addErrorMarkupParagraph() {
  const vexDialogContainer = document.querySelector(".vex-dialog-input");

  vexDialogContainer.classList.add("relative");

  vexDialogContainer.insertAdjacentHTML(
    "beforeend",
    '<p class="modal-error absolute text-[12px] left-0 -bottom-[20px]" style="color: red">* This card name is already in use</p>'
  );
}
