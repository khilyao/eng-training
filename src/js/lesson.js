export function startLesson(cardName, cardBody) {
  addLessonMarkup(cardName, cardBody);
}

function addLessonMarkup(cardName, cardBody) {
  const mainContainerRef = document.getElementById("main-container");

  mainContainerRef.insertAdjacentHTML(
    "beforeend",
    `<div class="lesson-wrapper-js fixed top-0 left-0 w-screen h-screen">
      <h2 class="card-name absolute top-[100px] right-[140px] word-item inline-block rounded-md bg-black px-5 py-2.5 min-w-[100px] text-center uppercase text-white text-2xl border-2 border-white border-solid">${cardName}</h2>
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div class="progress-bar"></div>
        <p></p>
      </div>
     </div>`
  );
}
