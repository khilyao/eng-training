const menuRefs = {
  mainMenu: document.querySelector(".menu-js"),
  startBtn: document.querySelector(".btn-start-js"),
  vocabularyBtn: document.querySelector(".btn-vocabulary-js"),
  progressBtn: document.querySelector(".btn-progress-js"),
  backBtn: document.querySelector(".btn-back-js"),
};
let activeWindow = null;

menuRefs.mainMenu.addEventListener("click", onMenuBtnClick);

menuRefs.backBtn.addEventListener("click", onBackBtnClick);

function onMenuBtnClick(e) {
  if (e.target.nodeName !== "BUTTON") return;

  const clickedBtn = e.target;

  $("#fakeLoader").show();
  setTimeout(() => {
    $("#fakeLoader").hide();
  }, 400);

  menuRefs.mainMenu.classList.add("hidden");

  showSectionByDataAttr(clickedBtn);
}

function onBackBtnClick(e) {
  const menuTemplateRefs = [
    ...document.querySelector(".template-list-js").children,
  ].slice(1);

  const currentActiveBlock = menuTemplateRefs.find(
    (el) => !el.classList.contains("hidden")
  );

  currentActiveBlock.classList.add("hidden");
  const currentBlockDataAttr = Object.keys(currentActiveBlock.dataset)[0];

  currentActiveBlock.dataset[currentBlockDataAttr] = false;

  this.classList.add("hidden");
  $("#fakeLoader").show();

  setTimeout(() => {
    $("#fakeLoader").hide();
    menuRefs.mainMenu.classList.remove("hidden");
  }, 200);
}

function showSectionByDataAttr(btn) {
  const dataAttr = Object.keys(btn.dataset)[0];

  const menuTemplateRefs = [
    ...document.querySelector(".template-list-js").children,
  ];

  const elementToRemoveHiddenClass = menuTemplateRefs.find(
    (el) => el.dataset[dataAttr] !== undefined
  );

  elementToRemoveHiddenClass.dataset[dataAttr] = true;

  elementToRemoveHiddenClass.classList.remove("hidden");

  menuRefs.backBtn.classList.remove("hidden");
}
