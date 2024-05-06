const searchButton = document.getElementById('searchButton');
const loadingIndicator = document.getElementById('loadingGif');
const pokedexIdInput = document.getElementById('pokedexIdInput');
const display = document.getElementById('pokemonDisplay');

function performSearch() {
    const id = pokedexIdInput.value.trim();
    if (!id) return; 

    searchButton.disabled = true;
    loadingIndicator.style.display = 'block';
    display.style.display = 'none';

    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Pokémon not found');
            }
            return response.json();
        })
        .then(pokemon => {
            display.innerHTML = `
                <h2>${pokemon.name}</h2>
                <img src="${pokemon.sprites.front_default}" style="height: 138px" alt="${pokemon.name}">
                <p>Type: ${pokemon.types.map(type => type.type.name).join(', ')}</p>
            `;
            display.style.display = 'block';
        })
        .catch(err => {
            display.innerHTML = 'Failed to retrieve Pokémon. Please check the Pokédex ID.';
        })
        .finally(() => {
            searchButton.disabled = false;
            loadingIndicator.style.display = 'none';
        });
}

searchButton.addEventListener('click', performSearch);

pokedexIdInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        performSearch();
    }
});
