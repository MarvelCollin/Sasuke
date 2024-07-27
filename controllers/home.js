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

                  const letteringDiv = pageElement.querySelector('.lettering');
                  if (letteringDiv) {
                      const imgElement = document.createElement('img');
                      imgElement.src = item.letter;
                      imgElement.classList.add('slide-in');
                      letteringDiv.appendChild(imgElement);
                  }
              }
          });
      })
      .catch((error) => console.error("Error loading JSON:", error));
});