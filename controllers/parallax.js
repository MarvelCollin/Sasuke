document.addEventListener("DOMContentLoaded", function () {
    extend("components/app.html", "app", "menu_character");
    extend("components/navbar.html", "extend-navbar", "menu_character");
  
    const mountain = document.getElementById("mountain");
    const cloudBack = document.getElementById("cloud-back");
    const cloudFront = document.getElementById("cloud-front");
    const landingSection = document.querySelector('.landing-section');
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          window.addEventListener("scroll", parallaxScroll);
        } else {
          window.removeEventListener("scroll", parallaxScroll);
          hideAndNullifyImages();
        }
      });
    });
  
    observer.observe(landingSection);
  
    function parallaxScroll() {
      const scrollPercent =
        window.scrollY / (document.body.scrollHeight - window.innerHeight) / 2;
      const scale = 1 + scrollPercent;
  
      mountain.style.transform = `scale(${scale})`;
      cloudBack.style.transform = `scale(${scale})`;
      cloudFront.style.transform = `scale(${scale})`;
  
      if (window.innerHeight + window.scrollY / 4 >= document.body.scrollHeight) {
        hideAndNullifyImages();
      } else {
        showImages();
      }
    }
  
    function hideAndNullifyImages() {
      mountain.style.display = "none";
      cloudBack.style.display = "none";
      cloudFront.style.display = "none";
  
      mountain.src = "";
      cloudBack.innerHTML = "";
      cloudFront.innerHTML = "";
  
      document.body.style.overflowY = "auto";
    }
  
    function showImages() {
      mountain.style.display = "block";
      cloudBack.style.display = "block";
      cloudFront.style.display = "block";
  
      mountain.src = "../asset/home/mountain.webp";
      cloudBack.innerHTML = '<img src="../asset/home/cloud.webp" alt="Cloud">';
      cloudFront.innerHTML = '<img src="../asset/home/cloud.webp" alt="Cloud">';
  
      document.body.style.overflowY = "scroll";
    }
  });
  