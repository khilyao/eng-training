import Notiflix from "notiflix";

import { Notify } from "notiflix/build/notiflix-notify-aio";

const card = {};

const vocRefs = {
  form: document.querySelector("form"),
  inputs: document.querySelectorAll("input"),
};

vocRefs.form.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(vocRefs.form);

  console.log(formData);

  localStorage.setItem("card", JSON.stringify(card));

  vocRefs.inputs.forEach((el) => (el.value = ""));
});
