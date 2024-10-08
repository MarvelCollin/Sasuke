import { ctx, canvas } from "./ctx.js";

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const backgroundImg = new Image();
const cloudImg = new Image();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

backgroundImg.src = "../asset/konoha-day.webp";
cloudImg.src = "../asset/akatsuki_cloud.png";

let cloudLeftX = -150;
let cloudRightX = canvas.width + 150;
let progressBarWidth = 0;
let progressMaxWidth = 400;
let loadingDuration = 10000;

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  let scale = Math.max(
    canvas.width / backgroundImg.width,
    canvas.height / backgroundImg.height
  );
  let x = canvas.width / 2 - (backgroundImg.width / 2) * scale;
  let y = canvas.height / 2 - (backgroundImg.height / 2) * scale;
  ctx.drawImage(
    backgroundImg,
    x,
    y,
    backgroundImg.width * scale,
    backgroundImg.height * scale
  );

  ctx.drawImage(
    cloudImg,
    cloudLeftX,
    canvas.height * 0.1 + 400,
    cloudImg.width / 2,
    cloudImg.height / 2
  );
  ctx.drawImage(
    cloudImg,
    cloudRightX,
    canvas.height * 0.1,
    cloudImg.width / 2,
    cloudImg.height / 2
  );

  if (progressBarWidth < progressMaxWidth) {
    progressBarWidth += progressMaxWidth / (loadingDuration / 16);
    document.getElementById("progress").style.width = progressBarWidth + "px";
  }
  if (cloudLeftX < canvas.width + 150) {
    cloudLeftX += canvas.width / (loadingDuration / 16.67);
  }
  if (cloudRightX > -150) {
    cloudRightX -= canvas.width / (loadingDuration / 16.67);
  }

  if (progressBarWidth < progressMaxWidth) {
    requestAnimationFrame(draw);
  } else {
    window.location.href = "home.html";
  }
}

backgroundImg.onload = function () {
  draw();
};
