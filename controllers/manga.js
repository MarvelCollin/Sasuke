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
    filename: "../asset/manga/boruto-bg.avif",
    title: "BORUTO",
    author: "MASHASHI KISHIMOTO",
    rating: "0",
    background: "../asset/manga/boruto-bg.avif",
  },
];

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
