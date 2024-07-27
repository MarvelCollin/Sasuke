document.addEventListener("DOMContentLoaded", function () {
  extend("components/app.html", "app", "menu_character");
  extend("components/navbar.html", "extend-navbar", "menu_character");

  const mountain = document.getElementById("mountain");
  const cloudBack = document.getElementById("cloud-back");
  const cloudFront = document.getElementById("cloud-front");
  
  window.addEventListener("mousemove", function (event) {
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    const cloudBackX = (mouseX * 3 / windowWidth - 0.5) * 20; 
    const cloudBackY = (mouseY * 3/ windowHeight - 0.5) * 20;
    const cloudFrontX = (mouseX * 3 / windowWidth - 0.5) * 40;
    const cloudFrontY = (mouseY * 3/ windowHeight - 0.5) * 40;


    cloudBack.style.transform = `translate(${-cloudBackX}px, ${cloudBackY}px)`;
    // mountain.style.transform = `translate(${cloudBackX}px, ${-cloudBackY}px)`;
    cloudFront.style.transform = `translate(${-cloudFrontX}px, ${cloudFrontY}px)`;
  });
});
