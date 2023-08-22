const hasStorageGreetingProp = localStorage.getItem("isGreetingViewed");

console.log(hasStorageGreetingProp);

const greetingSectionRefs = {
  preloader: document.querySelector(".preloader-js"),
  greetingBlock: document.querySelector(".greeting-js"),
  btnStart: document.querySelector(".btn-greeting-js"),
};

isGreetingViewed(hasStorageGreetingProp);

setTimeout(() => {
  greetingSectionRefs.preloader.classList.add("hidden");
  greetingSectionRefs.greetingBlock.classList.remove("hidden");

  addOpacityForEachEl();
}, 1000);

greetingSectionRefs.btnStart.addEventListener("click", onStartBtnClick);

function onStartBtnClick() {
  greetingSectionRefs.greetingBlock.classList.add("hidden");

  localStorage.setItem("isGreetingViewed", true);
}

function addOpacityForEachEl() {
  const greetingBlockProps = Array.from(
    greetingSectionRefs.greetingBlock.children
  );
  let counter = 200;

  greetingBlockProps.forEach((el) => {
    setTimeout(() => {
      el.classList.add("opacity-100");
    }, counter);
    counter += 400;
  });
}

function isGreetingViewed(prop) {
  if (prop) {
    setTimeout(() => {
      greetingSectionRefs.preloader.classList.add("hidden");
    }, 1000);

    throw new Error("greeting has been viewed ");
  }
}
