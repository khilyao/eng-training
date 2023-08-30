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

formRefs.form.addEventListener("submit", (e) => {
  e.preventDefault();

  const engWord = formRefs.form.querySelector("#eng-word").value.trim();
  const userLangWord = formRefs.form
    .querySelector("#user-lang-word")
    .value.trim();

  formDataArray.push({ engWord, userLangWord });

  formRefs.form.reset();

  updateWordList();
});

formRefs.submitBtn.addEventListener("click", () => {
  const engWord = formRefs.form.querySelector("#eng-word").value.trim();
  const userLangWord = formRefs.form
    .querySelector("#user-lang-word")
    .value.trim();
  const firstInput = [...formRefs.inputs][0];

  if (engWord && userLangWord) {
    Notiflix.Notify.success(`${engWord} successfully added`, {
      showOnlyTheLastOne: true,
    });
  }

  firstInput.focus();
});

formRefs.saveCardBtn.addEventListener("click", onSaveCardBtnClick);

function onSaveCardBtnClick() {
  if (formDataArray.length === 0) {
    Notiflix.Notify.warning(
      "Fill in the fields, then add to the card and try again",
      {
        showOnlyTheLastOne: true,
      }
    );
  }

  removeWordListMarkup();
  deactivateSaveBtn();
  clearValueInputs();
  showModal();
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
  localStorage.setItem(cardName, JSON.stringify(formDataArray));

  formDataArray.length = 0;
}

function showModal() {
  vex.dialog.prompt({
    message: "What do you want to name the card?",
    input:
      '<input class="vex-dialog-prompt-input" name="vex" type="text" placeholder="Card 1" autocomplete="off" required />',
    callback: function (value) {
      saveAllWordsToLocalStrg(value);
      showSuccessfulSaveCardMsg(value);
    },
  });
}

function clearValueInputs() {
  formRefs.inputs.forEach((el) => (el.value = ""));
}

function showSuccessfulSaveCardMsg(cardName) {
  Notiflix.Notify.success(`Your card ${cardName} successfully created`, {
    showOnlyTheLastOne: true,
  });
}
