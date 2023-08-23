const menuRefs = {
  mainMenu: document.querySelector(".menu-js"),
  startBtn: document.querySelector(".btn-start-js"),
};

menuRefs.startBtn.addEventListener("click", onMenuStartBtnClick);

function onMenuStartBtnClick() {
  showPreloader();

  menuRefs.mainMenu.classList.add("hidden");
}

function showPreloader() {
  const preloaderRef = document.querySelector(".preloader-js");

  preloaderRef.classList.remove("hidden");
  setTimeout(() => {
    preloaderRef.classList.add("hidden");
  }, 200);
}
