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

    menuRefs.mainMenu.classList.add("hidden");

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
}

export function showFakeLoader() {
  $("#fakeLoader").show();
  setTimeout(() => {
    $("#fakeLoader").hide();
  }, 200);
}
