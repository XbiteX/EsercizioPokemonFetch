//importazione di funzioni da utils.js
import * as utils from './utils.js';

let allPokeContainer = document.getElementById('pokemon-container');


let lista = localStorage.getItem("MyPokemon") // prende la lista di pokemon da localstorage
let listMyPokemon = lista ? JSON.parse(lista) : [] // se sono presenti dati in localstorage li passa a listMyPokemon, se no ritorna una stringa vuota

const fetchPokemonData = async (pokemon) => {
    try {
        const response = await fetch(pokemon.url);
        const pokeData = await response.json();

        // Crea un elemento HTML per il Pokémon con immagine più grande
        const pokeElement = utils.creazionePokeElement();

        // creazione dell'element per l'immagine
        const SpritePokemon = utils.creazioneSprite(pokeData);

        // creazione del pulsante catch
        const pulsanteCatch = utils.creazionePulsante("blue","catch","Catch")

        // creazione del testo contenente il nome del pokemon
        const testo = utils.creazioneTesto(pokemon);

        pokeElement.appendChild(SpritePokemon)
        pokeElement.appendChild(testo)
        pokeElement.appendChild(pulsanteCatch)

        // Aggiunge l'evento click all'immagine del pokemon per mostrare la finestra modale
        SpritePokemon.addEventListener('click', () => utils.showModal(pokeData));

        // Aggiunge l'evento click per catttura eun pokemon ed aggiungerlo alla collezione
        pulsanteCatch.addEventListener('click', () => aggiornaMyPokemon(pokeData))


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


utils.chiusuraModal();

//funzione per aggingere i pokemon alla lista persistente MyPokemon
function aggiornaMyPokemon(Pokemon) {
    //controllo per verificare se Pokemon è già nella lista
    if (!listMyPokemon.includes(Pokemon)) {
        listMyPokemon.push(Pokemon)
        localStorage.setItem("MyPokemon", JSON.stringify(listMyPokemon))
    }
}

fetchPokemons();