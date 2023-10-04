class BackBtn {
  constructor({ selector }) {
    this.refs = this.getRefs(selector);
  }

  getRefs(selector) {
    const refs = {};
    refs.btn = document.querySelector(selector);

    return refs;
  }

  hide() {
    this.refs.btn.classList.add("hidden");
  }

  show() {
    this.refs.btn.classList.remove("hidden");
  }
}

export const backBtn = new BackBtn({ selector: ".btn-back-js" });
