let allPokeContainer = document.getElementById('pokemon-container');
let modal = document.getElementById('modal');
let closeModal = document.getElementById('close-modal');

let lista = localStorage.getItem("MyPokemon") // prende la lista di pokemon da localstorage
let listMyPokemon = lista ? JSON.parse(lista) : [] // se sono presenti dati in localstorage li passa a listMyPokemon, se no ritorna una stringa vuota


const fetchPokemonData = async (pokemon) => {
    try {
        // Crea un elemento HTML per il Pokémon con immagine più grande
        const pokeElement = document.createElement('div'); 
        pokeElement.className = 'p-4 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 cursor-pointer flex flex-col items-center';

        // creazione dell'element per l'immagine
        const SpritePokemon = document.createElement('img')
        SpritePokemon.src = pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default
        SpritePokemon.className = "w-full h-48 object-contain mb-2 rounded-lg"
        SpritePokemon.id = "spritePokemon"

        // creazione del pulsante catch
        const pulsanteCatch = document.createElement('button')
        pulsanteCatch.id = "catch"
        pulsanteCatch.className = "bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
        pulsanteCatch.innerText = "Catch"

        // creazione del testo contenente il nome del pokemon
        const testo = document.createElement('h3')
        testo.innerText = pokemon.name
        testo.className= "text-xl font-semibold text-center capitalize mt-2"

        pokeElement.appendChild(SpritePokemon)
        pokeElement.appendChild(testo)
        pokeElement.appendChild(pulsanteCatch)


        // Aggiunge l'evento click all'immagine del pokemon per mostrare la finestra modale
        SpritePokemon.addEventListener('click', () => showModal(pokemon));

        // Aggiunge l'evento click per catttura eun pokemon ed aggiungerlo alla collezione
        pulsanteCatch.addEventListener('click', () => aggiornaMyPokemon(pokemon))


        // Aggiunge l'elemento alla griglia
        allPokeContainer.appendChild(pokeElement);

    } catch (error) {
        console.error('Errore nel fetch dei dati del Pokémon:', error);
    }
};


// Mostra la finestra modale con i dettagli del Pokémon
const showModal = (pokemon) => {
    document.getElementById('modal-img').src = pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default;
    document.getElementById('modal-name').textContent = pokemon.name;
    document.getElementById('modal-height').innerHTML = `Altezza: <span class="font-semibold">${pokemon.height / 10} m</span>`;
    document.getElementById('modal-weight').innerHTML = `Peso: <span class="font-semibold">${pokemon.weight / 10} kg</span>`;
    document.getElementById('modal-type').innerHTML = `Tipo: <span class="font-semibold">${pokemon.types.map(type => type.type.name).join(', ')}</span>`;
    document.getElementById('modal-abilities').innerHTML = `Abilità: <span class="font-semibold">${pokemon.abilities.map(ability => ability.ability.name).join(', ')}</span>`;

    modal.classList.remove('hidden');
};

// Chiude la finestra modale
closeModal.addEventListener('click', () => {modal.classList.add('hidden');});

// Chiude la finestra modale cliccando fuori dalla finestra
modal.addEventListener('click', (e) => {
if (e.target === modal) {
        modal.classList.add('hidden');
    }
});

//funzione per aggingere i pokemon alla lista persistente MyPokemon
function aggiornaMyPokemon(Pokemon){
    //controllo per verificare se Pokemon è già nella lista
    if(!listMyPokemon.includes(Pokemon)){
        listMyPokemon.push(Pokemon)
        localStorage.setItem("MyPokemon", JSON.stringify(listMyPokemon))
        console.log(listMyPokemon)
    }
}

document.addEventListener("DOMContentLoaded", () => {
    listMyPokemon.forEach(pokemon => fetchPokemonData(pokemon));
  });