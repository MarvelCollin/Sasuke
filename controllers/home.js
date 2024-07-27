document.addEventListener("DOMContentLoaded", function () {
  fetch("../models/home.json")
    .then((response) => response.json())
    .then((jsonData) => {
      jsonData.forEach((item) => {
        const pageElement = document.getElementById(item.page);
        if (pageElement) {
          if (item.background.endsWith(".mp4")) {
            const videoElement = document.createElement("video");
            videoElement.src = item.background;
            videoElement.autoplay = true;
            videoElement.loop = true;
            videoElement.muted = true;
            pageElement.appendChild(videoElement);
          } else {
            pageElement.style.backgroundImage = `url(${item.background})`;
          }
        }
      });
    })
    .catch((error) => console.error("Error pas load json:", error));
});
