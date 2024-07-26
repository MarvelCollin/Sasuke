import { ctx, canvas } from "./ctx.js";

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = 300;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

let particles = [];
const particleCount = 50;
let particleType = "snow"; 
let previousTheme = localStorage.getItem('theme') || "dark";

function createParticles() {
  particles = [];
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 10 + 1,
      speedX: particleType === "meteor" ? -6 : 0,
      speedY: particleType === "meteor" ? 6 : Math.random() * 1 + 0.5,
      opacity: Math.random() * 0.5 + 0.5,
    });
  }
}

createParticles();

function drawParticles() {
  particles.forEach((particle) => {
    ctx.beginPath();
    if (particleType === "meteor") {
      ctx.strokeStyle = `rgba(0, 0, 0, ${particle.opacity})`;
      ctx.moveTo(particle.x, particle.y);
      ctx.lineTo(particle.x - particle.speedX * 5, particle.y - particle.speedY * 5);
      ctx.stroke();
    }
    ctx.fillStyle = particleType === "snow" ? `rgba(255, 255, 255, ${particle.opacity})` : `rgba(0, 0, 0, ${particle.opacity})`;
    ctx.ellipse(
      particle.x,
      particle.y,
      particle.size / 2,
      particle.size / 2,
      0,
      0,
      360
    );
    ctx.fill();
  });
}

function updateParticles() {
  particles.forEach((particle) => {
    particle.x += particle.speedX;
    particle.y += particle.speedY;

    if (particle.x < 0 || particle.y > canvas.height) {
      particle.x = Math.random() * canvas.width;
      particle.y = 0;
    }
  });
}

function clearCanvas() {
  if (particleType === "snow") {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  } else if (particleType === "meteor") {
    ctx.fillStyle = "rgba(255, 255, 255, 0.1)"; 
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

function readTheme(){
  let currentTheme = localStorage.getItem('theme');
  if (currentTheme !== previousTheme) {
    previousTheme = currentTheme;
    particleType = currentTheme === "dark" ? "snow" : "meteor";
    createParticles();
  }
}

function animate() {
  clearCanvas();
  drawParticles();
  updateParticles();
  readTheme();
  requestAnimationFrame(animate);
}

animate();
