let allPokeContainer = document.getElementById('pokemon-container');
let modal = document.getElementById('modal');
let closeModal = document.getElementById('close-modal');

const fetchPokemonData = async (pokemon) => {
    try {
        const response = await fetch(pokemon.url);
        const pokeData = await response.json();

        // Crea un elemento HTML per il Pokémon con immagine più grande
        const pokeElement = document.createElement('div');
        pokeElement.className = 'p-4 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 cursor-pointer flex flex-col items-center';
        pokeElement.innerHTML = `
            <img src="${pokeData.sprites.other['official-artwork'].front_default || pokeData.sprites.front_default}" 
                alt="${pokeData.name}" 
                class="w-full h-48 object-contain mb-2 rounded-lg"> <!-- Dimensione immagine aumentata -->
            <h3 class="text-xl font-semibold text-center capitalize mt-2">${pokeData.name}</h3> <!-- Testo un po' più grande -->
        `;

        // Aggiunge l'evento click per mostrare la finestra modale
        pokeElement.addEventListener('click', () => showModal(pokeData));

        // Aggiunge l'elemento alla griglia
        allPokeContainer.appendChild(pokeElement);

    } catch (error) {
        console.error('Errore nel fetch dei dati del Pokémon:', error);
    }
};

const fetchPokemons = async () => {
    try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
        const tuttiPokemon = await response.json();
        tuttiPokemon.results.forEach(pokemon => fetchPokemonData(pokemon));
    } catch (error) {
        console.error('Errore nel fetch dei Pokémon:', error);
    }
};

// Mostra la finestra modale con i dettagli del Pokémon
const showModal = (pokeData) => {
    document.getElementById('modal-img').src = pokeData.sprites.other['official-artwork'].front_default || pokeData.sprites.front_default;
    document.getElementById('modal-name').textContent = pokeData.name;
    document.getElementById('modal-height').innerHTML = `Altezza: <span class="font-semibold">${pokeData.height / 10} m</span>`;
    document.getElementById('modal-weight').innerHTML = `Peso: <span class="font-semibold">${pokeData.weight / 10} kg</span>`;
    document.getElementById('modal-type').innerHTML = `Tipo: <span class="font-semibold">${pokeData.types.map(type => type.type.name).join(', ')}</span>`;
    document.getElementById('modal-abilities').innerHTML = `Abilità: <span class="font-semibold">${pokeData.abilities.map(ability => ability.ability.name).join(', ')}</span>`;

    modal.classList.remove('hidden');
};

// Chiude la finestra modale
closeModal.addEventListener('click', () => {
    modal.classList.add('hidden');
});

// Chiude la finestra modale cliccando fuori dalla finestra
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.add('hidden');
    }
});

fetchPokemons();