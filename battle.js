let allPokemons = []; // Array per contenere tutti i Pokémon
let pokemon1 = null; // Pokémon casuale 1
let pokemon2 = null; // Pokémon casuale 2

// Carica i Pokémon all'inizio
const fetchPokemons = async () => {
    try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=500');
        const data = await response.json();
        allPokemons = data.results;
    } catch (error) {
        console.error("Errore nel fetch dei Pokémon:", error);
    }
};

// Estrai un Pokémon casuale
const getRandomPokemon = async () => {
    const randomIndex = Math.floor(Math.random() * allPokemons.length);
    const response = await fetch(allPokemons[randomIndex].url);
    return response.json();
};

// Recupera l'evoluzione del Pokémon
const getEvolutionDetails = async (speciesUrl) => {
    try {
        const speciesResponse = await fetch(speciesUrl);
        const speciesData = await speciesResponse.json();
        const evolutionChainUrl = speciesData.evolution_chain.url;

        const evolutionResponse = await fetch(evolutionChainUrl);
        const evolutionData = await evolutionResponse.json();

        // Trova il nome della fase successiva di evoluzione
        const currentName = speciesData.name;
        let evolutionStage = evolutionData.chain;

        while (evolutionStage) {
            if (evolutionStage.species.name === currentName && evolutionStage.evolves_to.length > 0) {
                return evolutionStage.evolves_to[0].species.name; // Restituisci la prossima evoluzione
            }
            evolutionStage = evolutionStage.evolves_to[0];
        }
        return null; // Nessuna evoluzione trovata
    } catch (error) {
        console.error("Errore nel recupero delle evoluzioni:", error);
        return null;
    }
};

// Funzione per aggiornare le carte con immagini animate
const updatePokemonCard = (pokemonData, cardId, spriteId, nameId) => {
    document.getElementById(spriteId).innerHTML = `
        <img src="${pokemonData.sprites.other['official-artwork'].front_default}" alt="${pokemonData.name}" class="w-full h-full">
    `;
    document.getElementById(nameId).textContent = pokemonData.name.toUpperCase();
};

// Aggiungi animazioni coriandoli
const showConfetti = () => {
    const confettiContainer = document.createElement('div');
    confettiContainer.id = 'confetti';
    confettiContainer.innerHTML = `
        <div class="confetti-wrapper">
            ${Array(50).fill('<div class="confetti"></div>').join('')}
        </div>
    `;
    document.body.appendChild(confettiContainer);

    setTimeout(() => confettiContainer.remove(), 5000); // Rimuovi i coriandoli dopo 5 secondi
};

// Variabile per gestire l'interval dei confetti
let confettiInterval;

const showWinnerPopup = async (winner) => {
    const evolutionName = await getEvolutionDetails(winner.species.url);
    const evolutionMessage = evolutionName
        ? `${winner.name.toUpperCase()} has unleashed its evolved form, ${evolutionName.toUpperCase()}!`
        : `${winner.name.toUpperCase()} fought bravely and emerged victorious!`;

    const popup = document.createElement('div');
    popup.className = 'modal modal-open';
    popup.innerHTML = `
        <div class="modal-box text-center">
            <h2 class="text-3xl font-bold text-yellow-400">🏆 ${winner.name.toUpperCase()} WINS! 🏆</h2>
            <div class="mt-4">
                <img src="${winner.sprites.other['official-artwork'].front_default}" 
                     alt="${winner.name}" 
                     class="w-48 h-48 mx-auto"> <!-- Dimensioni aumentate -->
            </div>
            <p class="mt-4 text-lg text-white">${evolutionMessage}</p>
            <div class="modal-action justify-center">
                <button id="closePopup" class="btn btn-error">Close</button>
            </div>
        </div>
    `;
    document.body.appendChild(popup);

    // Avvia i confetti in modo continuo
    confettiInterval = setInterval(() => {
        party.confetti(document.querySelector('.modal-box'), { // confetti presi da libreria: party.js
            count: party.variation.range(20, 40),
            spread: 100,
            speed: 1.5,
            size: party.variation.range(1, 2),
        });
    }, 300); // Intervallo di 300ms per generare confetti continuamente

    // Aggiungi evento per chiudere il popup e fermare i confetti
    document.getElementById("closePopup").addEventListener("click", () => {
        clearInterval(confettiInterval); // Ferma i confetti
        popup.remove(); // Rimuovi il popup
    });
};

// Effetto di vittoria
const startBattle = () => {
    if (!pokemon1 || !pokemon2) {
        document.getElementById("battleLog").textContent = "Select Pokémon first!";
        return;
    }

    const log = document.getElementById("battleLog");
    log.textContent = "";

    const sprite1 = document.getElementById("sprite1");
    const sprite2 = document.getElementById("sprite2");

    // Simula attacco con animazioni
    sprite1.animate([
        { transform: "translateX(0)" },
        { transform: "translateX(50px) rotate(-10deg)" },
        { transform: "translateX(0)" }
    ], { duration: 1000 });

    sprite2.animate([
        { transform: "translateX(0)" },
        { transform: "translateX(-50px) rotate(10deg)" },
        { transform: "translateX(0)" }
    ], { duration: 1000 });

    setTimeout(() => {
        const winner = Math.random() < 0.5 ? pokemon1 : pokemon2;

        log.textContent = `${winner.name.toUpperCase()} WINS! 🎉`;
        log.classList.add("text-yellow-300", "font-extrabold");

        // Mostra popup vincitore e coriandoli
        showConfetti();
        showWinnerPopup(winner);

    }, 1200);
};

// Evento per iniziare il combattimento
document.getElementById("battleBtn").addEventListener("click", async () => {
    pokemon1 = await getRandomPokemon();
    pokemon2 = await getRandomPokemon();

    updatePokemonCard(pokemon1, "pokemon1", "sprite1", "name1");
    updatePokemonCard(pokemon2, "pokemon2", "sprite2", "name2");

    startBattle();
});

// Carica tutti i Pokémon
fetchPokemons();