document.addEventListener("DOMContentLoaded", () => {
  fetch("../models/story.json")
    .then((response) => response.json())
    .then((data) => renderAccordion(data))
    .catch((error) => console.error("Error fetching data:", error));

  console.log("asodkas");
});

function renderAccordion(data) {
  const accordion = document.getElementById("accordion");
  data.forEach((item, index) => {
    const isActive = index === 0 ? " show" : "";
    const isCollapsed = index === 0 ? "" : " collapsed";

    const itemHTML = `
          <div class="accordion-item">
                <div class="accordion-header" id="heading${index}" data-target="#collapse${index}" >
                    <h2>
                        <button class="accordion-button${isCollapsed}" type="button" data-toggle="collapse" aria-expanded="true" aria-controls="collapse${index}">
                            <img src="../asset/uzumaki.png" alt="Logo" class="accordion-logo">
                            ${item.title}
                        </button>
                    </h2>
                </div>
                <div id="collapse${index}" class="accordion-collapse collapse${isActive}" aria-labelledby="heading${index}">
                    <div class="accordion-body">
                        <p>${item.description}</p>
                    </div>
                </div>
            </div>
        `;
    accordion.insertAdjacentHTML("beforeend", itemHTML);
  });

  addAccordionEventListeners();
}

function addAccordionEventListeners() {
  const accordionButtons = document.querySelectorAll(".accordion-header");

  accordionButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const target = document.querySelector(button.getAttribute("data-target"));

      target.classList.toggle("show");

      button.classList.toggle("collapsed");
    });
  });
}
