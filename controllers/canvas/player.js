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
  jumping_up: [
    "../asset/game_asset/naruto/jumping_up/up0.png",
    "../asset/game_asset/naruto/jumping_up/up1.png",
  ],
  jumping_down: [
    "../asset/game_asset/naruto/jumping_down/down0.png",
    "../asset/game_asset/naruto/jumping_down/down1.png",
  ]
};

let playerX = 100;
let playerY;
let initialY;
let currentFrameIndex = 0;
let currentAnimationFrames = playerSprites.idle;
let pressedKeys = {};
let playerSpeed = 24;
let isPlayerWalking = false;
let isPlayerFacingLeft = false;
let normalDelay = 45;
let constandDelay = normalDelay;
let jumpingDelay = 30;
let idleDelay = 120;
let isJumping = false;
let jumpSpeed = 10;
let jumpHeight = 100;
let jumpHeightCounter = 0;
let isFalling = false;
let characterWidth = 90;
let characterHeight = 120;

function updatePlayerPosition() {
  playerY = canvas.height - characterHeight - 76; 
  initialY = playerY;
}

window.addEventListener('resize', updatePlayerPosition);
updatePlayerPosition();

document.addEventListener("keydown", (event) => {
  pressedKeys[event.key.toLowerCase()] = true;
  if (pressedKeys["w"] && !isJumping && !isFalling) {
    isJumping = true;
    jumpHeightCounter = 0;
    // ganti frame
    currentAnimationFrames = playerSprites.jumping_up;
    console.log("jumping")
  }
});

document.addEventListener("keyup", (event) => {
  pressedKeys[event.key.toLowerCase()] = false;
  if (!pressedKeys["d"] && !pressedKeys["a"]) {
    isPlayerWalking = false;
  }
});

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  updatePlayerPosition();
});

function movePlayer() {
  if (pressedKeys["d"] || pressedKeys["a"]) {
    isPlayerWalking = true;
    currentAnimationFrames = playerSprites.walking;
    constandDelay = normalDelay;
  } else if (!isJumping && !isFalling) {
    constandDelay = idleDelay;
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

  if (playerX >= canvas.width) {
    playerX = 0;
  } else if (playerX <= 0) {
    playerX = canvas.width;
  }
}

function handleJump() {
  // setelah tekan w
  if (isJumping) {
    // ganti frame jadi lompat
    currentAnimationFrames = playerSprites.jumping_up;
    // apakah sampai limit 
    if (jumpHeightCounter < jumpHeight) {
      // - (minus) naik
      playerY -= jumpSpeed;
      
      // nambahin counternya
      jumpHeightCounter += jumpSpeed;

      constandDelay = jumpingDelay;
    } else {
      // ganti fase jadi turun
      isJumping = false;
      isFalling = true;
    }
  } else if (isFalling) { // turun

    currentAnimationFrames = playerSprites.jumping_down;
    // apakah sampai initialY
    if (playerY < initialY) {
      // + (plus) turun
      playerY += jumpSpeed;
      constandDelay = jumpingDelay;
    } else {
      isFalling = false;
      constandDelay = normalDelay;
      // memastikan player diposisi awal
      playerY = initialY;

      // kalau ada ganti frame kejump, balikin lagi 
      currentAnimationFrames = isPlayerWalking ? playerSprites.walking : playerSprites.idle;
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
      ctx.drawImage(
        spriteImage,
        -playerX - characterWidth,
        playerY,
        characterWidth,
        characterHeight
      );
      ctx.restore();
    } else {
      ctx.drawImage(
        spriteImage,
        playerX,
        playerY,
        characterWidth,
        characterHeight
      );
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
  }, constandDelay);
}

function initializeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  updatePlayerPosition();
}

function startAnimation() {
  initializeCanvas();
  animate();
}

startAnimation();
