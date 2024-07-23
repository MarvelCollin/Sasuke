import { ctx, canvas } from "./ctx.js";

const animations = {
  naruto: {
    idle: [
      "../asset/game_asset/naruto/idle/idle0.png",
      "../asset/game_asset/naruto/idle/idle1.png",
      "../asset/game_asset/naruto/idle/idle2.png",
      "../asset/game_asset/naruto/idle/idle3.png",
      "../asset/game_asset/naruto/idle/idle4.png",
      "../asset/game_asset/naruto/idle/idle5.png",
    ],
    running_new: [
      "../asset/game_asset/naruto/running/running0.png",
      "../asset/game_asset/naruto/running/running1.png",
      "../asset/game_asset/naruto/running/running2.png",
      "../asset/game_asset/naruto/running/running3.png",
      "../asset/game_asset/naruto/running/running4.png",
      "../asset/game_asset/naruto/running/running5.png",
    ],
  },
};

const normalFrame = 35;
let delay = normalFrame;

let currImgPlayer = [];
let idling = animations.naruto.idle;
let scale = 3;
currImgPlayer = animations.naruto.running_new;

let currentFramePlayer = 0;

let keys = {};
let isMoving = false;
let isJumping = false;

let faced = 1;

const normalSpeed = 30;

let speed = normalSpeed;
let xPlayer = 100;
const floor = 600;
let yPlayer = floor;

let angle = 0;
let xTranslate = 0;
let yTranslate = 0;

let jumpHeight = 100;
let currHeight = 0;
let jumpSpeed = 20;
let goDown = false;

document.addEventListener("keydown", function (event) {
  keys[event.key.toLowerCase()] = true;
  if (keys["a"] || keys["d"]) {
    isMoving = true;
  }
  if (keys["w"]) {
    isJumping = true;
  }
});

document.addEventListener("keyup", function (event) {
  keys[event.key.toLowerCase()] = false;
  if (!keys["a"] || !keys["d"]) {
    isMoving = false;
  }
  if (!keys["w"]) {
    isJumping = false;
  }
});

document.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

function clear() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function move() {
  speed = normalSpeed;
  delay = normalFrame;

  if (keys["a"]) {
    faced = 0;
    xPlayer -= speed;
    currImgPlayer = animations.naruto.running_new;
  }

  if (keys["d"]) {
    faced = 1;
    xPlayer += speed;
    currImgPlayer = animations.naruto.running_new;
  }
}

function jump() {
  if (currHeight <= jumpHeight && !goDown) {
    yPlayer -= jumpSpeed;
    currHeight += jumpSpeed;
  } else {
    goDown = true;
    if (currHeight > 0) {
      yPlayer += jumpSpeed;
      currHeight -= jumpSpeed;
    } else {
      isJumping = false;
      goDown = false;
    }
  }
}

function draw(currImg) {
  let runImg = new Image();
  runImg.src = currImg;

  runImg.onload = function () {
    let width = runImg.width * scale;
    let height = runImg.height * scale;
    ctx.save();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (faced === 0) {
      ctx.scale(-1, 1);
      ctx.drawImage(
        runImg,
        -xPlayer,
        yPlayer,
        (runImg.width * -1) / 2,
        runImg.height / 2
      );
    } else {
      ctx.drawImage(
        runImg,
        xPlayer,
        yPlayer,
        runImg.width / 2,
        runImg.height / 2
      );
    }
    ctx.restore();
  };
}

function drawPlayer() {
  let currSrc = idling[currentFramePlayer];

  if (isMoving) {
    currSrc = currImgPlayer[currentFramePlayer];
    move();
  }

  if (isJumping) {
    jump();
  }

  currentFramePlayer = (currentFramePlayer + 1) % currImgPlayer.length;
  draw(currSrc);
}

function checkCollision() {
  //   if (xPlayer < 0) {
  //     xPlayer = 0;
  //   } else if (xPlayer >= canvas.width - 80) {
  //     xPlayer = canvas.width - 80;
  //   }
}

function animate() {
  drawPlayer();
  checkCollision();
  setTimeout(function () {
    requestAnimationFrame(animate);
  }, delay);
}

animate();
