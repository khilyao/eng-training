const vex = require("vex-js-fix");
import { showFakeLoader } from "./app-menu";
import congratulationsImg from "../assets/congratulations.png";
import smileImg from "../assets/smile.png";
import sadImg from "../assets/sad.png";

export function startLesson(cardName, cardBody) {
  addLessonMarkup(cardName);
  resetAllData();
  showEngWord(cardBody);
}

let correctWordCounter = 0;
let totalClicksOnAnswer = 0;
let userRandomWords;
let wrongWordsList = [];

const backBtnRef = document.querySelector(".btn-back-js");
backBtnRef.addEventListener("click", onBackBtn);

function onBackBtn() {
  const menuTemplateRefs = [
    ...document.querySelector(".template-list-js").children,
  ].slice(1);

  if (menuTemplateRefs.every((el) => el.classList.contains("hidden"))) {
    vex.dialog.confirm({
      message: "Are you sure you want to quit? All progress will be lost",
      callback: function (value) {
        if (value) {
          const lessonWrapper = document.querySelector(".lesson-wrapper-js");

          menuTemplateRefs[0].classList.remove("hidden");
          showFakeLoader();
          removeLessonMarkup(lessonWrapper);

          userRandomWords = undefined;
        }
      },
    });
  }
}

function addLessonMarkup(cardName) {
  const mainContainerRef = document.getElementById("main-container");

  mainContainerRef.insertAdjacentHTML(
    "beforeend",
    `  <div class="lesson-wrapper-js fixed top-0 left-0 w-screen h-screen">
    <h2
      class="card-name absolute top-[8%] left-1/2 -translate-x-1/2 word-item inline-block rounded-md font-bold bg-black px-5 py-2.5 min-w-[100px] text-center uppercase text-white text-lg sm:text-2xl border-2 border-white border-solid"
    >${cardName}</h2>
    <div class="progress-container absolute top-[20%] left-[50%] flex items-center w-[70%] max-w-[600px] h-[18px] sm:h-[20px] -translate-x-1/2 overflow-hidden rounded-md">
<div class="progress-pointer sm:text-xl transition-all" style="width:0%">0.00%</div>
    </div>
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[40%] sm:-translate-y-[35%] lg:-translate-y-[40%]">
      <div class="lesson-block">
      </div>
    </div>
  </div>`
  );
}

function removeLessonMarkup(lessonWrapper) {
  lessonWrapper.remove();
}

function showEngWord(cardBody) {
  const base = cardBody.sort(() => Math.random() - 0.5);
  const userWords = base.map((el) => el.userLangWord);

  if (base.length === 0) {
    if (wrongWordsList.length === 0) {
      animateGrade("passed");
      return;
    }

    if (wrongWordsList.length / (userRandomWords.length + 1) <= 0.3) {
      animateGrade("most");
      return;
    }

    animateGrade("failed");
    return;
  }

  addMarkupToLessonBlock(base, userWords);
}

function addMarkupToLessonBlock(base, userWords) {
  const lessonPage = document.querySelector(".lesson-block");
  const engWord = base[0].engWord;
  const userWordAnswer = base[0].userLangWord;
  if (userRandomWords === undefined) {
    userRandomWords = userWords
      .sort((a, b) => {
        a = Math.random() - 0.5;
        b = Math.random() - 0.5;

        return a - b;
      })
      .filter((el) => el !== userWordAnswer);
  }

  userRandomWords.sort((a, b) => {
    a = Math.random() - 0.5;
    b = Math.random() - 0.5;

    return a - b;
  });

  lessonPage.insertAdjacentHTML(
    "beforeend",
    `<p class="mb-8 sm:mb-10 lg:mb-28 text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-white">${engWord}</p>
     <ul class="user-words-list-js min-w-[100px] flex flex-col lg:flex-row text-center text-white">
     <li class="user-word-js w-full p-2.5 bg-[#2d2599] hover:bg-[#8f88ea] focus:bg-[#8f88ea] rounded-md text-xl sm:text-2xl lg:text-3xl cursor-pointer transition-colors transition-transform transition-duration-300 hover:scale-105 hover:text-[#972cfb] active:scale-95 mb-4 sm:mb-6 lg:p-4 lg:mr-10 lg:mb-0">${userRandomWords[0]}</li>
     <li class="user-word-js w-full p-2.5 bg-[#2d2599] hover:bg-[#8f88ea] focus:bg-[#8f88ea] rounded-md text-xl sm:text-2xl lg:text-3xl cursor-pointer transition-colors transition-transform transition-duration-300 hover:scale-105 hover:text-[#972cfb] active:scale-95 mb-4 sm:mb-6 lg:p-4 lg:mr-10 lg:mb-0">${userRandomWords[1]}</li>
     <li class="user-word-js w-full p-2.5 bg-[#2d2599] hover:bg-[#8f88ea] focus:bg-[#8f88ea] rounded-md text-xl sm:text-2xl lg:text-3xl cursor-pointer transition-colors transition-transform transition-duration-300 hover:scale-105 hover:text-[#972cfb] active:scale-95 mb-4 sm:mb-6 lg:p-4 lg:mr-10 lg:mb-0">${userRandomWords[2]}</li>
     <li class="user-word-js w-full p-2.5 bg-[#2d2599] hover:bg-[#8f88ea] focus:bg-[#8f88ea] rounded-md text-xl sm:text-2xl lg:text-3xl cursor-pointer transition-colors transition-transform transition-duration-300 hover:scale-105 hover:text-[#972cfb] active:scale-95 lg:p-4">${userRandomWords[3]}</li>
     </ul>`
  );

  const allAnswers = Array.from(document.querySelectorAll(".user-word-js")).map(
    (el) => el.textContent
  );

  const userLangWords = Array.from(document.querySelectorAll(".user-word-js"));

  if (!allAnswers.includes(userWordAnswer)) {
    const randomNumber = Math.floor(Math.random() * 4);
    userLangWords[randomNumber].textContent = userWordAnswer;
  }

  const listWords = document.querySelector(".user-words-list-js");

  base.splice(0, 1);

  listWords.addEventListener("click", (e) => {
    onChooseAnswer(e, userWordAnswer, base);
  });
}

function onChooseAnswer(e, userAnswer, baseData) {
  const lessonBlock = document.querySelector(".lesson-block");
  const engWord = e.target.textContent;

  if (e.target.nodeName !== "LI") return;

  if (engWord === userAnswer) {
    correctWordCounter += 1;
  }

  if (engWord !== userAnswer) {
    wrongWordsList.push({ engWord, userAnswer });
  }

  totalClicksOnAnswer += 1;

  clearLessonBlock(lessonBlock);
  updateLessonProgressBar(totalClicksOnAnswer);
  showEngWord(baseData);
}

function clearLessonBlock(block) {
  block.innerHTML = "";
}

function animateGrade(result) {
  switch (result) {
    case "passed":
      setTimeout(() => {
        const lesson = document.querySelector(".lesson-wrapper-js");
        lesson.innerHTML = `<div class="result-block-js px-2.5 fixed w-full flex flex-col items-center top-[20%] sm:top-[15%] left-1/2 -translate-x-1/2">
      <h1 class="mb-10 text-center text-3xl sm:text-4xl lg:text-6xl text-white">Congratulations!</h1>
      <img class="mb-10 sm:mb-12 lg:mb-16 w-[150px] sm:w-[180px] lg:w-[200px]" src="${congratulationsImg}" >
      <p class="text-3xl text-center lg:text-5xl text-white">You have no mistakes</p>
      </div>`;
      }, 500);
      break;

    case "most":
      setTimeout(() => {
        const lesson = document.querySelector(".lesson-wrapper-js");
        const mistakesMarkup = wrongWordsList
          .map((el) => `<li class="">${el.userAnswer}</li>`)
          .join("");

        lesson.innerHTML = `<div class="result-block-js px-2.5 fixed w-full flex flex-col items-center top-[20%] sm:top-[15%] left-1/2 -translate-x-1/2">
        <h1 class="mb-10 text-center text-3xl sm:text-4xl lg:text-6xl text-white">It was good</h1>
        <img class="mb-10 sm:mb-12 lg:mb-16 w-[150px] sm:w-[180px] lg:w-[200px]" src="${smileImg}" >
        <p class="text-3xl text-center lg:text-5xl text-white">But you have these mistakes</p>
        <ul class="
        ">${mistakesMarkup}</ul>
        </div>`;
      }, 500);
      break;

    case "failed":
      setTimeout(() => {
        const lesson = document.querySelector(".lesson-wrapper-js");
        const mistakesMarkup = wrongWordsList
          .map((el) => `<li>${el.userAnswer}</li>`)
          .join("");

        lesson.innerHTML = `<div class="result-block-js px-2.5 fixed w-full flex flex-col items-center top-[20%] sm:top-[15%] left-1/2 -translate-x-1/2">
        <h1 class="mb-10 text-center text-3xl sm:text-4xl lg:text-6xl text-white">You need more practice</h1>
        <img class="mb-10 sm:mb-12 lg:mb-16 w-[150px] sm:w-[180px] lg:w-[200px]" src="${sadImg}" >
        <p class="text-3xl text-center lg:text-5xl text-white">These are your mistakes</p>
        <ul class="
        ">${mistakesMarkup}</ul>
        </div>`;
      }, 500);
      break;
  }

  setTimeout(() => {
    const resultBlock = document.querySelector(".result-block-js");

    resultBlock.insertAdjacentHTML(
      "beforeend",
      `<button class="btn continue-btn-js tracking-wide transition-colors inline-block rounded mt-24 sm:mt-14 lg:mt-20 px-5 pb-2 pt-2.5 sm:px-6 sm:pb-2 sm:pt-2.5 lg:px-7 lg:pb-2.5 lg:pt-3 text-xl sm:text-2xl lg:text-3xl font-bold uppercase leading-normal text-neutral-50 transition opacity-0 transition-opacity duration-300 ease-in-out focus:outline-none focus:ring-0 text-white" type="button">Continue</button>`
    );

    setTimeout(() => {
      const continueBtn = resultBlock.querySelector(".continue-btn-js");

      continueBtn.classList.remove("opacity-0");

      continueBtn.addEventListener("click", onContinueGrade);
    }, 200);
  }, 1000);
}

function onContinueGrade() {
  const lessonWrapper = document.querySelector(".lesson-wrapper-js");

  lessonWrapper.remove();
  showFakeLoader();

  const appMenu = document.querySelector(".menu-js");
  appMenu.classList.remove("hidden");
}

function updateLessonProgressBar(counter) {
  const progressBar = document.querySelector(".progress-pointer");

  const value = ((counter / (userRandomWords.length + 1)) * 100).toFixed(2);

  progressBar.textContent = `${value}%`;
  progressBar.style.width = `${value}%`;
}

function resetAllData() {
  correctWordCounter = 0;
  totalClicksOnAnswer = 0;
  userRandomWords = undefined;
  wrongWordsList = [];
}
