document.addEventListener('DOMContentLoaded', () => {
    fetch('../assets.json')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('character-container');
            data.forEach(character => {
                const cardHTML = `
                    <div class="card">
                        <img src="character-card/${character.filename}" alt="${character.name}">
                        <div class="card-content">
                            <h3 class="character-name">${character.name}</h3>
                            <p>${character.description}</p>
                            <a href="#">READ MORE</a>
                        </div>
                    </div>
                `;
                container.insertAdjacentHTML('beforeend', cardHTML);
            });
        })
        .catch(error => console.error('Error fetching character data:', error));
});
