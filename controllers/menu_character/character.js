document.addEventListener('DOMContentLoaded', () => {
    fetchJSONData('../controllers/json/characters/character-card.json')
        .then(cardData => {
            renderCharacterCards(cardData);
            addReadMoreEventListeners(cardData);
        })
        .catch(error => console.error('Error fetching card data:', error));
});

function fetchJSONData(url) {
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        });
}

function renderCharacterCards(cardData) {
    const container = document.getElementById('character-container');
    cardData.forEach(character => {
        const cardHTML = `
            <div class="card">
                <img src="${character.filename}" alt="${character.name}">
                <div class="card-content">
                    <h3 class="character-name">${character.name}</h3>
                    <a href="#" class="read-more" data-name="${character.name}">READ MORE</a>
                </div>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', cardHTML);
    });
}

function addReadMoreEventListeners(cardData) {
    document.querySelectorAll('.read-more').forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            openModal(event, cardData);
        });
    });
}

function openModal(event, cardData) {
    const name = event.target.getAttribute('data-name');

    fetchJSONData('../controllers/json/characters/character.json')
        .then(modalData => {
            const character = modalData.find(character => character.name === name);

            if (character) {
                const modalImage = document.getElementById('modal-character-image');
                modalImage.src = character.filename;
                modalImage.onload = () => {
                    applyBackgroundEffect(modalImage);
                };
                document.getElementById('modal-character-name').textContent = character.name;
                document.getElementById('modal-character-description').textContent = character.description;

                const modal = document.getElementById('character-modal');
                modal.style.display = "block";

                document.querySelector('.close-button').onclick = function() {
                    modal.style.display = "none";
                };

                window.onclick = function(event) {
                    if (event.target == modal) {
                        modal.style.display = "none";
                    }
                };
            } else {
                console.error('Character data not found');
            }
        })
        .catch(error => console.error('Error fetching modal data:', error));
}

function applyBackgroundEffect(imageElement) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const img = imageElement;
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    context.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight);
    const imageData = context.getImageData(0, 0, img.naturalWidth, img.naturalHeight);
    const data = imageData.data;
    let r = 0, g = 0, b = 0;
    let totalPixels = 0;

    for (let i = 0; i < data.length; i += 4) {
        const brightness = 0.34 * data[i] + 0.5 * data[i + 1] + 0.16 * data[i + 2];
        r += data[i] * brightness;
        g += data[i + 1] * brightness;
        b += data[i + 2] * brightness;
        totalPixels += brightness;
    }

    r = Math.floor(r / totalPixels);
    g = Math.floor(g / totalPixels);
    b = Math.floor(b / totalPixels);
    console.log(r + " " + g + " " + b);

    const averageColor = `rgb(${r}, ${g}, ${b})`;
    createBackgroundEffect(document.querySelector('.modal-left'), averageColor);
}

function createBackgroundEffect(container, color) {
    container.style.background = `
        radial-gradient(circle at 50% 50%, ${color} 40%, rgba(0, 0, 0, 0) 70%),
        url('../path/to/smoke-texture.png') repeat
    `;
    container.style.backgroundSize = 'cover';
}