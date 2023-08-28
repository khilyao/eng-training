const hasStorageGreetingProp = localStorage.getItem("isGreetingViewed");
const greetingSectionRefs = {
  greetingBlock: document.querySelector(".greeting-js"),
  btnStart: document.querySelector(".btn-greeting-js"),
};
const DEFAULT_TIMEOUT_DELAY = 500;

$("#fakeLoader").show();

isGreetingViewed(hasStorageGreetingProp);

setTimeout(() => {
  greetingSectionRefs.greetingBlock.classList.remove("hidden");

  addOpacityForEachEl();
}, DEFAULT_TIMEOUT_DELAY);

greetingSectionRefs.btnStart.addEventListener("click", onStartBtnClick);

function onStartBtnClick() {
  const appMenuRef = document.querySelector(".menu-js");

  greetingSectionRefs.greetingBlock.classList.add("hidden");
  $("#fakeLoader").show();

  setTimeout(() => {
    $("#fakeLoader").hide();

    appMenuRef.classList.remove("hidden");
  }, 400);

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
    $("#fakeLoader").show();

    setTimeout(() => {
      const appMenu = document.querySelector(".menu-js");

      appMenu.classList.remove("hidden");
    }, DEFAULT_TIMEOUT_DELAY);

    throw new Error("greeting has been viewed ");
  }
}
