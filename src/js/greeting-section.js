const hasStorageGreetingProp = localStorage.getItem("isGreetingViewed");
const greetingSectionRefs = {
  preloader: document.querySelector(".preloader-js"),
  greetingBlock: document.querySelector(".greeting-js"),
  btnStart: document.querySelector(".btn-greeting-js"),
};
const DEFAULT_TIMEOUT_DELAY = 500;

isGreetingViewed(hasStorageGreetingProp);

setTimeout(() => {
  greetingSectionRefs.preloader.classList.add("hidden");
  greetingSectionRefs.greetingBlock.classList.remove("hidden");

  addOpacityForEachEl();
}, DEFAULT_TIMEOUT_DELAY);

greetingSectionRefs.btnStart.addEventListener("click", onStartBtnClick);

function onStartBtnClick() {
  const appMenuRef = document.querySelector(".menu-js");

  greetingSectionRefs.greetingBlock.classList.add("hidden");
  appMenuRef.classList.remove("hidden");

  localStorage.setItem("isGreetingViewed", true);
}

function addOpacityForEachEl() {
  const greetingBlockProps = Array.from(
    greetingSectionRefs.greetingBlock.children
  );
  let counter = DEFAULT_TIMEOUT_DELAY;

  greetingBlockProps.forEach((el) => {
    setTimeout(() => {
      el.classList.add("opacity-100");
    }, counter);
    counter += DEFAULT_TIMEOUT_DELAY;
  });
}

function isGreetingViewed(prop) {
  if (prop) {
    setTimeout(() => {
      const appMenu = document.querySelector(".menu-js");

      greetingSectionRefs.preloader.classList.add("hidden");
      appMenu.classList.remove("hidden");
    }, DEFAULT_TIMEOUT_DELAY);

    throw new Error("greeting has been viewed ");
  }
}
