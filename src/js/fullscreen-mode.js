export default function fullscreen() {
  const fullscreenButton = document.getElementById("fullscreen-btn");
  const exitFullscreenButton = document.getElementById("exit-fullscreen-btn");

  fullscreenButton.addEventListener("click", onEnterFullscreen);
  exitFullscreenButton.addEventListener("click", onExitFullscreen);

  function onEnterFullscreen() {
    const element = document.documentElement;

    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }

    this.classList.toggle("hidden");
    exitFullscreenButton.classList.toggle("hidden");
  }

  function onExitFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }

    this.classList.toggle("hidden");
    fullscreenButton.classList.toggle("hidden");
  }
}
