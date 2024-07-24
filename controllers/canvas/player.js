import { ctx, canvas } from "./ctx.js";

const playerSprites = {
  idle: [
    "../asset/game_asset/naruto/idle/idle0.png",
    "../asset/game_asset/naruto/idle/idle1.png",
    "../asset/game_asset/naruto/idle/idle2.png",
    "../asset/game_asset/naruto/idle/idle3.png",
    "../asset/game_asset/naruto/idle/idle4.png",
    "../asset/game_asset/naruto/idle/idle5.png",
  ],
  walking: [
    "../asset/game_asset/naruto/running/running0.png",
    "../asset/game_asset/naruto/running/running1.png",
    "../asset/game_asset/naruto/running/running2.png",
    "../asset/game_asset/naruto/running/running3.png",
    "../asset/game_asset/naruto/running/running4.png",
    "../asset/game_asset/naruto/running/running5.png",
  ],
};

let playerX = 100;
let playerY = 100;  
let currentFrameIndex = 0;
let currentAnimationFrames = playerSprites.idle;
let pressedKeys = {};
let playerSpeed = 17;
let isPlayerWalking = false;
let isPlayerFacingLeft = false;
const animationDelay = 35;
let isJumping = false;
let jumpSpeed = 10;
let jumpHeight = 100;
let initialY = playerY;
let jumpFrameCounter = 0;

document.addEventListener("keydown", (event) => {
  pressedKeys[event.key.toLowerCase()] = true;
  if (pressedKeys["w"] && !isJumping) {
    isJumping = true;
    jumpFrameCounter = 0;
  }
});

document.addEventListener("keyup", (event) => {
  pressedKeys[event.key.toLowerCase()] = false;
  if (!pressedKeys["d"] && !pressedKeys["a"]) {
    isPlayerWalking = false;
    currentAnimationFrames = playerSprites.idle;
  }
});

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth + 100;
  canvas.height = window.innerHeight + 100;
});

function movePlayer() {
  if (pressedKeys["d"] || pressedKeys["a"]) {
    isPlayerWalking = true;
    currentAnimationFrames = playerSprites.walking;
  } else {
    isPlayerWalking = false;
    currentAnimationFrames = playerSprites.idle;
  }

  if (pressedKeys["d"]) {
    isPlayerFacingLeft = false;
    playerX += playerSpeed;
  } else if (pressedKeys["a"]) {
    isPlayerFacingLeft = true;
    playerX -= playerSpeed;
  }

  if(playerX >= canvas.width){
    playerX = 0;
  } else if(playerX <= 0){
    playerX = canvas.width;
  }
}

function handleJump() {
  if (isJumping) {
    if (jumpFrameCounter < jumpHeight && playerY > initialY - jumpHeight) {
      playerY -= jumpSpeed;
      jumpFrameCounter += jumpSpeed;
    } else if (playerY < initialY) {
      playerY += jumpSpeed;
    } else {
      isJumping = false;
      playerY = initialY;
    }
  }
}

function drawFrame(frameIndex) {
  const spriteImage = new Image();
  spriteImage.src = currentAnimationFrames[frameIndex];

  spriteImage.onload = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (isPlayerFacingLeft) {
      ctx.save();
      ctx.scale(-1, 1);
      ctx.drawImage(spriteImage, -playerX - (spriteImage.width / 4), playerY, (spriteImage.width / 4), spriteImage.height / 4);
      ctx.restore();
    } else {
      ctx.drawImage(spriteImage, playerX, playerY, spriteImage.width / 4, spriteImage.height / 4);
    }
  };
}

function animate() {
  currentFrameIndex = (currentFrameIndex + 1) % currentAnimationFrames.length;
  movePlayer();
  handleJump();
  drawFrame(currentFrameIndex);
  setTimeout(() => {
    requestAnimationFrame(animate);
  }, animationDelay);
}

function initializeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function startAnimation() {
  initializeCanvas();
  animate();
}

startAnimation();
