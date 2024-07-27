document.addEventListener("DOMContentLoaded", function () {
  fetch("../models/home.json")
    .then((response) => response.json())
    .then((jsonData) => {
      jsonData.forEach((item) => {
        const pageElement = document.querySelector(`.${item.page}`);
        if (pageElement) {
          if (item.background.endsWith(".mp4")) {
            const videoElement = document.createElement("video");
            videoElement.src = item.background;
            videoElement.autoplay = true;
            videoElement.loop = true;
            videoElement.muted = true;
            videoElement.classList.add("background-video");
            pageElement.appendChild(videoElement);
          } else {
            pageElement.style.backgroundImage = `url(${item.background})`;
          }

          const letteringDiv = pageElement.querySelector(".lettering");
          if (letteringDiv) {
            const imgElement = document.createElement("img");
            imgElement.src = item.letter;
            imgElement.classList.add("slide-in");
            letteringDiv.appendChild(imgElement);
          }
        }
      });
    })
    .catch((error) => console.error("Error loading JSON:", error));

  fetch("../models/character-card.json")
    .then((response) => response.json())
    .then((jsonData) => {
      const cardContainer = document.getElementById("R-card-container");

      jsonData.slice(0, 3).forEach((item) => {
        const card = document.createElement("div");
        card.classList.add("R-card");

        const img = document.createElement("img");
        img.src = item.filename;
        card.appendChild(img);

        const header = document.createElement("div");
        header.classList.add("R-card-header");
        header.textContent = item.name;
        card.appendChild(header);

        const button = document.createElement("a");
        button.href = "#";
        button.classList.add("R-card-button");
        button.textContent = "SHOW MORE DETAIL";
        card.appendChild(button);

        cardContainer.appendChild(card);
      });
    })
    .catch((error) => console.error("Error loading JSON:", error));

  fetch("../models/anime.json")
    .then((response) => response.json())
    .then((jsonData) => {
      const cardContainer = document.getElementById("U-card-container");

      jsonData.slice(0, 3).forEach((item) => {
        const card = document.createElement("div");
        card.classList.add("U-card");

        const img = document.createElement("img");
        img.src = item.cardfilename;
        card.appendChild(img);

        const button = document.createElement("a");
        button.href = "#";
        button.classList.add("U-card-button");
        button.textContent = "SHOW MORE DETAIL";
        card.appendChild(button);

        cardContainer.appendChild(card);
      });
    })
    .catch((error) => console.error("Error loading JSON:", error));

  let currentPage = 0;
  const pages = document.querySelector(".pages img");
  const pageElements = document.querySelectorAll(".page");

  pages.addEventListener('click', function(){
    console.log("click");
    console.log(event.target)
  });
  
  pageElements.forEach((page, index) => {
    page.addEventListener("click", () => {
      if (
        (index % 2 === 0 && currentPage > 0) ||
        (index % 2 !== 0 && currentPage < pageElements.length / 2 - 1)
      ) {
        currentPage = index % 2 === 0 ? currentPage - 1 : currentPage + 1;
        updatePageView();
      }
    });
  });

  function updatePageView() {
    if (currentPage === 0) {
      pages.classList.remove("flipped");
    } else {
      pages.classList.add("flipped");
    }
  }
});
