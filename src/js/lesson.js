const vex = require("vex-js-fix");
import { showFakeLoader } from "./app-menu";

export function startLesson(cardName, cardBody) {
  addLessonMarkup(cardName);

  showEngWord(cardBody);
}

let correctWordCounter = 0;
let totalClicksOnAnswer = 0;
let userRandomWords;
const wrongWordsList = [];

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
      class="card-name absolute top-[100px] right-[140px] word-item inline-block rounded-md bg-black px-5 py-2.5 min-w-[100px] text-center uppercase text-white text-2xl border-2 border-white border-solid"
    >${cardName}</h2>
    <div class="progress-container">
    <div class="progress-pointer" style="width:0%">0.00%</div>
    </div>
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
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
      animateGrade();
    }

    return;
  }

  addMarkupToLessonBlock(base, userWords);
}

function addMarkupToLessonBlock(base, userWords) {
  const lessonPage = document.querySelector(".lesson-block");
  const engWord = base[0].engWord;
  const userWord = base[0].userLangWord;
  if (userRandomWords === undefined) {
    userRandomWords = userWords
      .sort((a, b) => {
        a = Math.random() - 0.5;
        b = Math.random() - 0.5;

        return a - b;
      })
      .filter((el) => el !== userWord);
  }

  userRandomWords.sort((a, b) => {
    a = Math.random() - 0.5;
    b = Math.random() - 0.5;

    return a - b;
  });

  lessonPage.insertAdjacentHTML(
    "beforeend",
    `<p class="mb-16 text-2xl text-center text-white">${engWord}</p>
     <ul class="user-words-list-js sm:flex text-center text-white">
     <li class="user-word-js sm:mr-6">${userRandomWords[0]}</li>
     <li class="user-word-js sm:mr-6">${userRandomWords[1]}</li>
     <li class="user-word-js sm:mr-6">${userRandomWords[2]}</li>
     <li class="user-word-js">${userRandomWords[3]}</li>
     </ul>`
  );

  const allAnswers = Array.from(document.querySelectorAll(".user-word-js")).map(
    (el) => el.textContent
  );

  const userLangWords = Array.from(document.querySelectorAll(".user-word-js"));

  if (!allAnswers.includes(userWord)) {
    const randomNumber = Math.floor(Math.random() * 4);
    userLangWords[randomNumber].textContent = userWord;
  }

  const listWords = document.querySelector(".user-words-list-js");

  base.splice(0, 1);

  listWords.addEventListener("click", (e) => {
    onChooseAnswer(e, userWord, base);
  });
}

function onChooseAnswer(e, userAnswer, baseData) {
  const lessonBlock = document.querySelector(".lesson-block");

  if (e.target.nodeName === "LI") {
    if (e.target.textContent === userAnswer) {
      correctWordCounter += 1;
    }

    if (e.target.textContent !== userAnswer) {
      wrongWordsList.push(userAnswer);
    }
  }

  totalClicksOnAnswer += 1;

  clearLessonBlock(lessonBlock);
  updateLessonProgressBar(totalClicksOnAnswer);
  showEngWord(baseData);
}

function clearLessonBlock(block) {
  block.innerHTML = "";
}

function animateGrade() {
  setTimeout(() => {
    const lesson = document.querySelector(".lesson-wrapper-js");

    lesson.innerHTML = `<h1 class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white">Congratulations</h1>`;
  }, 100);
}

function updateLessonProgressBar(counter) {
  const progressBar = document.querySelector(".progress-pointer");

  const value = ((counter / (userRandomWords.length + 1)) * 100).toFixed(2);

  progressBar.textContent = `${value}%`;
  progressBar.style.width = `${value}%`;
}
