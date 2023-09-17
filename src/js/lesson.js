export function startLesson(cardName, cardBody) {
  addLessonMarkup(cardName);

  showEngWord(cardBody);
}

let correctWordCounter = 0;

const backBtnRef = document.querySelector(".btn-back-js");
backBtnRef.addEventListener("click", onBackBtn);

function onBackBtn() {
  const lesson = document.querySelector(".lesson-wrapper-js");

  if (lesson) {
    removeLessonMarkup(lesson);
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
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <div class="lesson-block">
      </div>
    </div>
  </div>`
  );
}

function removeLessonMarkup(lessonBlock) {
  lessonBlock.remove();
}

function showEngWord(cardBody) {
  const base = cardBody.sort(() => Math.random() - 0.5);
  const userWords = base.map((el) => el.userLangWord);

  addMarkupToLessonBlock(base, userWords);
}

function addMarkupToLessonBlock(base, userWords) {
  const lessonPage = document.querySelector(".lesson-block");
  const engWord = base[0].engWord;
  const userWord = base[0].userLangWord;
  const userRandomWords = userWords
    .sort((a, b) => {
      a = Math.random() - 0.5;
      b = Math.random() - 0.5;

      return a - b;
    })
    .filter((el) => el !== userWord);

  lessonPage.insertAdjacentHTML(
    "beforeend",
    `<p class="mb-16 text-2xl text-center text-white">${engWord}</p>
     <ul class="user-words-list-js sm:flex text-center text-white">
     <li class="user-word-js mr-2">${userRandomWords[0]}</li>
     <li class="user-word-js mr-2">${userRandomWords[1]}</li>
     <li class="user-word-js mr-2">${userRandomWords[2]}</li>
     <li class="user-word-js">${userRandomWords[3]}</li>
     </ul>`
  );

  const randomItem = document.querySelectorAll(".user-word-js");
  const randomNumber = Math.floor(Math.random() * 4);

  randomItem[randomNumber].textContent = userWord;

  const listWords = document.querySelector(".user-words-list-js");

  base.splice(0, 1);

  listWords.addEventListener("click", (e) => {
    onChooseAnswer(e, userWord, base);
  });
}

function onChooseAnswer(e, userAnswer, baseData) {
  if (e.target.nodeName === "LI") {
    const lessonBlock = document.querySelector(".lesson-block");

    if (e.target.textContent === userAnswer) {
      correctWordCounter += 1;
      console.log(correctWordCounter);
      clearLessonBlock(lessonBlock);

      showEngWord(baseData);
    }

    if (e.target.textContent !== userAnswer) {
      clearLessonBlock(lessonBlock);

      showEngWord(baseData);
    }
  }
}

function clearLessonBlock(block) {
  block.innerHTML = "";
}
