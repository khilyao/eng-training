const vex = require("vex-js-fix");

export function appMenu() {
  const menuRefs = {
    mainMenu: document.querySelector(".menu-js"),
    startBtn: document.querySelector(".btn-start-js"),
    vocabularyBtn: document.querySelector(".btn-vocabulary-js"),
    progressBtn: document.querySelector(".btn-progress-js"),
    backBtn: document.querySelector(".btn-back-js"),
  };

  menuRefs.mainMenu.addEventListener("click", onMenuBtn);

  menuRefs.backBtn.addEventListener("click", onBackBtn);

  function onMenuBtn(e) {
    if (e.target.nodeName !== "BUTTON") return;

    const clickedBtn = e.target;

    showFakeLoader();
    addHiddenClass(menuRefs.mainMenu);
    showSectionByDataAttr(clickedBtn);
  }

  function onBackBtn(e) {
    const menuTemplateRefs = [
      ...document.querySelector(".template-list-js").children,
    ].slice(1);

    if (menuTemplateRefs.every((el) => el.classList.contains("hidden"))) {
      return;
    }
    const currentActiveBlock = menuTemplateRefs.find(
      (el) => !el.classList.contains("hidden")
    );

    addHiddenClass(currentActiveBlock);
    const currentBlockDataAttr = Object.keys(currentActiveBlock.dataset)[0];

    currentActiveBlock.dataset[currentBlockDataAttr] = false;

    addHiddenClass(this);
    $("#fakeLoader").show();

    setTimeout(() => {
      $("#fakeLoader").hide();
      removeHiddenClass(menuRefs.mainMenu);
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

    removeHiddenClass(elementToRemoveHiddenClass);
    removeHiddenClass(menuRefs.backBtn);
  }
}

function addHiddenClass(el) {
  el.classList.add("hidden");
}

function removeHiddenClass(el) {
  el.classList.remove("hidden");
}

export function showFakeLoader() {
  $("#fakeLoader").show();
  setTimeout(() => {
    $("#fakeLoader").hide();
  }, 200);
}
