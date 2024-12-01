//importazione di funzioni da utils.js
import * as utils from './utils.js';

let allPokeContainer = document.getElementById('pokemon-container');
let debounceTimeout;
const filtro = document.getElementById('sort')
const pusanteFiltro = document.getElementById('filter')

const searchInput = document.getElementById("search-input");
let lista = localStorage.getItem("MyPokemon") // prende la lista di pokemon da localstorage
let listMyPokemon = lista ? JSON.parse(lista) : [] // se sono presenti dati in localstorage li passa a listMyPokemon, se no ritorna una stringa vuota

async function fetchPokemonData(pokemon) {
    try {
        const response = await fetch(pokemon.url);
        const pokeData = await response.json();

        // Crea un elemento HTML per il Pokémon con immagine più grande
        const pokeElement = utils.creazionePokeElement();

        // creazione dell'element per l'immagine
        const SpritePokemon = utils.creazioneSprite(pokeData);

        // creazione del pulsante catch
        const pulsanteCatch = utils.creazionePulsante("blue", "catch", "Catch")

        // creazione del testo contenente il nome del pokemon
        const testo = utils.creazioneTesto(pokemon);

        pokeElement.appendChild(SpritePokemon)
        pokeElement.appendChild(testo)
        pokeElement.appendChild(pulsanteCatch)

        // Aggiunge l'evento click all'immagine del pokemon per mostrare la finestra modale
        SpritePokemon.addEventListener('click', () => utils.showModal(pokeData));

        // Aggiunge l'evento click per catttura eun pokemon ed aggiungerlo alla collezione
        pulsanteCatch.addEventListener('click', () => {
            alert("Pokemon catturato!");
            aggiornaMyPokemon(pokeData);
        })


        // Aggiunge l'elemento alla griglia
        allPokeContainer.appendChild(pokeElement);

    } catch (error) {
        console.error('Errore nel fetch dei dati del Pokémon:', error);
    }
};

pusanteFiltro.addEventListener("click", ()=>{
    const opzioneSort = filtro.value;
    // prendi tutte le carte
    const cards = Array.from(document.querySelectorAll(".carta"));
    console.log(opzioneSort)
    console.log(cards)
    switch (opzioneSort) {
        case "a-z":
            cards.sort((a, b) => a.querySelector("h3").innerText.localeCompare(b.querySelector("h3").innerText));
          break;
        case "z-a":
            cards.sort((a, b) => b.querySelector("h3").innerText.localeCompare(a.querySelector("h3").innerText));
          break;
      }

    // ordina le carte


    // pulisci il container e riposiziona le carte ordinate
    allPokeContainer.innerHTML = "";
    cards.forEach(card => allPokeContainer.appendChild(card));
});

const fetchPokemons = async () => {
    try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=500');
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

// Funzione di debounce per ritardare la chiamata alla ricerca
const debounce = (func, delay) => {
    return (...args) => {
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(() => func(...args), delay);
    };
};

// Funzione per cercare i Pokémon mentre si scrive
if (searchInput) {
    searchInput.addEventListener("input", debounce(async () => {
        const searchTerm = searchInput.value.trim().toLowerCase();
        if (searchTerm) {
            // Esegui la ricerca dei Pokémon che iniziano con il nome
            await searchPokemons(searchTerm);
        } else {
            // Se l'input è vuoto, ricarica tutti i Pokémon
            allPokeContainer.innerHTML = ""; // Svuota il contenitore
            fetchPokemons();                 // Ricarica tutti i Pokémon
        }
    }, 500));  // Ritardo di 500 ms tra i caratteri digitati
}

// Funzione per cercare i Pokémon tramite nome che inizia con la ricerca
async function searchPokemons(searchTerm) {
    try {
        allPokeContainer.innerHTML = "";    // Pulisce la lista

        // Richiesta di ricerca dei Pokémon (limite 1000 per ottenere una lista di Pokémon)
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=1000`);
        if (!response.ok) throw new Error("Errore durante il caricamento dei Pokémon.");
        const data = await response.json();

        const filteredPokemons = data.results.filter(pokemon => pokemon.name.toLowerCase().startsWith(searchTerm));   // Usa startsWith per cercare i nomi che iniziano con il termine

        if (!filteredPokemons.length) {
            throw new Error("Nessun Pokémon trovato.")  // Se non ci sono Pokémon che corrispondono, ritorna un errore
        }

        // Per ogni Pokémon filtrato, richiediamo i dettagli
        filteredPokemons.forEach((pokemonData) => fetchPokemonData(pokemonData));


    } catch (error) {
        console.error("Errore nella ricerca dei Pokémon:", error.message);
        const errorMessage = document.createElement("div");
        errorMessage.classList.add("text-red-500", "text-center", "mt-4");
        errorMessage.innerHTML = `${error.message}`;
        pokemonList.appendChild(errorMessage);
    }
};


fetchPokemons();