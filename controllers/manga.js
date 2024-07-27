const mangas = [
  {
    filename: "../asset/manga/naruto-manga.jpg",
    title: "NARUTO",
    author: "MASHASHI KISHIMOTO",
    rating: "4.0",
    background: "../asset/manga/naruto-bg.jpg",
  },
  {
    filename: "../asset/manga/naruto-shippuden.jpg",
    title: "NARUTO SHIPPUDEN",
    author: "MASHASHI KISHIMOTO",
    rating: "4.5",
    background: "../asset/manga/naruto-shippuden-bg.jpg",
  },
  {
    filename: "../asset/manga/boruto.jpg",
    title: "BORUTO",
    author: "MASHASHI KISHIMOTO",
    rating: "-100",
    background: "../asset/manga/boruto-bg.avif",
  },
];

function createTemplate() {
  const container = document.createElement("div");
  container.className = "container";

  const detailHTML = `
    <div class="detail">
      <h1 id="title"></h1>
      <p class="author-p">AUTHOR : <span id="author"></span></p>
      <p class="rating-p">RATING : <span id="rating"></span> / 5</p>
      <button class="btn">SEE MORE</button>
    </div>
`;

  container.innerHTML += detailHTML;

  let carouselHTML = `
    <div class="carousel">
      <div class="carousel-inner">
  `;

  mangas.forEach((manga, index) => {
    carouselHTML += `
      <div class="carousel-item ${
        index === 0 ? "active" : ""
      }" id="${manga.title.toLowerCase().replace(" ", "-")}">
        <img onclick="switchCard('${manga.title}')" src="${
      manga.filename
    }" alt="${manga.title}">
      </div>
    `;
  });

  carouselHTML += `
      </div>
    </div>
  `;

  container.innerHTML += carouselHTML;
  document.body.appendChild(container);

  switchCard(mangas[0].title);
}

function switchCard(value) {
  currentIndex = 0;
  mangas.forEach((element) => {
    if (value === element.title) {
      $("body").css({
        backgroundImage: `url(${element.background})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        width: "100vw",
        height: "100vh",
      });
      currentIndex++;

      $("#title").text(element.title);
      $("#author").text(element.author);
      $("#rating").text(element.rating);
    }
  });

  const items = document.querySelectorAll(".carousel-item");
  const inner = document.querySelector(".carousel-inner");
  const cardWidth = items[0].offsetWidth;

  items.forEach((item) => {
    item.classList.remove("active");
  });

  const activeItem = Array.from(items).find(
    (item) => item.querySelector("img").alt === value
  );
  activeItem.classList.add("active");

  const newIndex = Array.from(items).indexOf(activeItem);

  let offset;
  if (newIndex > currentIndex) {
    offset = -newIndex * cardWidth;
  } else {
    offset = -newIndex * cardWidth;
  }
  console.log("asdasd");
  inner.style.transform = `translateX(${offset}px)`;
  currentIndex = newIndex;
}

document.addEventListener("DOMContentLoaded", createTemplate);
