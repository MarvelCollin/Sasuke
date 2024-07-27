document.addEventListener("DOMContentLoaded", function () {
  fetch("../models/anime.json")
    .then((response) => response.json())
    .then((animeData) => {
      const animeContainer = document.getElementById("anime-container");
      const detailsContainer = document.querySelector(".details");
      const modal = document.getElementById("modal");
      const modalImg = document.getElementById("modal-img");
      const modalClose = document.getElementById("modal-close");

      animeData.forEach((anime, index) => {
        const animeCard = document.createElement("div");
        animeCard.className = "anime-card";
        animeCard.dataset.index = index;

        animeCard.innerHTML = `
            <img src="${anime.cardfilename}" alt="${anime.name}">`;

        animeCard.addEventListener("click", () => {
          document.querySelectorAll(".anime-card").forEach((card) => {
            card.classList.remove("active");
          });
          animeCard.classList.add("active");
          animeContainer.style.backgroundImage = `url('${anime.background}')`;
          animeContainer.style.backgroundSize = "cover";
          animeContainer.style.backgroundPosition = "center";

          detailsContainer.innerHTML = `
              <div class="details-left">
                <div class="synopsis">
                  <h2>SYNOPSIS</h2>
                  <p>${anime.synopsis}</p>
                </div>
                <div class="gallery">
                  <h2>GALLERY</h2>
                  <div class="gallery-images">
                    ${anime.sliders
                      .map(
                        (slider) =>
                          `<img src="${slider.sliderPath}" alt="${anime.name}">`
                      )
                      .join("")}
                  </div>
                </div>
              </div>
              <div class="details-right">
                <div class="info">
                  <div class="info-item">
                    <span class="label">AUTHOR</span>
                    <span class="value">${anime.author}</span>
                  </div>
                  <div class="info-item">
                    <span class="label">DIRECTOR</span>
                    <span class="value">${anime.director}</span>
                  </div>
                  <div class="info-item">
                    <span class="label">STUDIO</span>
                    <span class="value">${anime.studio}</span>
                  </div>
                </div>
              </div>
            `;

          document.querySelectorAll(".gallery-images img").forEach((img) => {
            img.addEventListener("click", () => {
              modal.style.display = "block";
              modalImg.src = img.src;
            });
          });
        });

        animeContainer.appendChild(animeCard);
      });

      if (animeData.length > 0) {
        animeContainer.style.backgroundImage = `url('${animeData[0].background}')`;
        animeContainer.style.backgroundSize = "cover";
        animeContainer.style.backgroundPosition = "center";

        const firstAnime = animeData[0];
        detailsContainer.innerHTML = `
            <div class="details-left">
              <div class="synopsis">
                <h2>SYNOPSIS</h2>
                <p>${firstAnime.synopsis}</p>
              </div>
              <div class="gallery">
                <h2>GALLERY</h2>
                <div class="gallery-images">
                  ${firstAnime.sliders
                    .map(
                      (slider) =>
                        `<img src="${slider.sliderPath}" alt="${firstAnime.name}">`
                    )
                    .join("")}
                </div>
              </div>
            </div>
            <div class="details-right">
              <div class="info">
                <div class="info-item">
                  <span class="label">AUTHOR</span>
                  <span class="value">${firstAnime.author}</span>
                </div>
                <div class="info-item">
                  <span class="label">DIRECTOR</span>
                  <span class="value">${firstAnime.director}</span>
                </div>
                <div class="info-item">
                  <span class="label">STUDIO</span>
                  <span class="value">${firstAnime.studio}</span>
                </div>
              </div>
            </div>
          `;

        document.querySelectorAll(".gallery-images img").forEach((img) => {
          img.addEventListener("click", () => {
            modal.style.display = "block";
            modalImg.src = img.src;
          });
        });
      }

      modalClose.addEventListener("click", () => {
        modal.style.display = "none";
      });

      window.addEventListener("click", (event) => {
        if (event.target === modal) {
          modal.style.display = "none";
        }
      });
    })
    .catch((error) => console.error("Error fetching anime data:", error));
});
