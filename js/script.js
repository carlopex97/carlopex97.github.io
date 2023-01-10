const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const game = new Game(ctx);

const btn = document.getElementById("start-btn");
btn.onclick = () => {
  /*const start = document.getElementById("start-btn");*/
  btn.style.visibility = "hidden";
  canvas.style.visibility = "visible";

  game.start();
};
const pauseButton = document.getElementById("pause-button");
pauseButton.addEventListener("click", () => {
  game.togglePause();
});
