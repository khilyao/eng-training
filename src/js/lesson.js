export function startLesson(cardName, cardBody) {
  addLessonMarkup(cardName);

  showEngWord(cardBody);
}

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

  const lessonPage = document.querySelector(".lesson-block");

  lessonPage.insertAdjacentHTML(
    "beforeend",
    `<p class="mb-16 text-2xl text-center text-white">${base[0].engWord}</p>
     <ul class="user-words-list-js sm:flex text-center text-white">
     <li class="user-word-js mr-2">Hello</li>
     <li class="user-word-js mr-2">Money</li>
     <li class="user-word-js mr-2">Lambda</li>
     <li class="user-word-js">Lorem</li>
     </ul>`
  );

  const listWords = document.querySelector(".user-words-list-js");

  listWords.addEventListener("click", onChooseAnswer);
}

function onChooseAnswer(e) {
  if (e.target.nodeName === "LI") {
  }
}
