const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

export {ctx, canvas}

canvas.width = window.innerWidth;
canvas.height = 300;