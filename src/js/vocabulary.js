import Notiflix from "notiflix";

import { Notify } from "notiflix/build/notiflix-notify-aio";

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

  if (formDataArray.length === 20) {
    localStorage.setItem("formData", JSON.stringify(formDataArray));
  }
});

formRefs.submitBtn.addEventListener("click", () => {
  const engWord = formRefs.form.querySelector("#eng-word").value.trim();
  const userLangWord = formRefs.form
    .querySelector("#user-lang-word")
    .value.trim();
  const firstInput = [...formRefs.inputs][0];

  if (engWord && userLangWord) {
    Notiflix.Notify.success(`${engWord} successfully added`);
  }

  firstInput.focus();
});

formRefs.saveCardBtn.addEventListener("click", onSaveCardBtnClick);

function onSaveCardBtnClick() {
  if (formDataArray.length === 0) return;

  removeWordListElement();
  saveAllWordsToLocalStrg();
}

function updateWordList() {
  const wordsMarkup = formDataArray
    .reverse()
    .map((el) => {
      return `<div class="absolute top-2.5 left-5 mb-1 text-white">Card length: ${formDataArray.length}</div>
      <div class="word-item inline-block rounded px-2.5 py-2.5 mx-1.5 my-1.5 text-white text-sm">${el.engWord}</div>`;
    })
    .join(" ");

  isWordListCreated();

  formRefs.form.insertAdjacentHTML(
    "afterend",
    '<div class="word-list max-w-[400px] max-h-[200px] overflow-hidden px-5 pt-8 pb-5 -mx-1.5 -my-1.5 relative text-white w-full rounded-lg bg-fff"></div>'
  );

  const wordListRef = document.querySelector(".word-list");

  wordListRef.insertAdjacentHTML("beforeend", wordsMarkup);
}

function isWordListCreated() {
  const wordListRef = document.querySelector(".word-list");

  if (wordListRef) {
    wordListRef.remove();
  }
}

function removeWordListElement() {
  const wordListRef = document.querySelector(".word-list");

  wordListRef.remove();
}

function saveAllWordsToLocalStrg() {
  const uniqueKey = new Date().getTime();

  localStorage.setItem(uniqueKey, JSON.stringify(formDataArray));

  formDataArray.length = 0;
}
