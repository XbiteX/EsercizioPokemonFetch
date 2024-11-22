//importazione di funzioni da utils.js
import * as utils from './utils.js';

let allPokeContainer = document.getElementById('pokemon-container');

let lista = localStorage.getItem("MyPokemon") // prende la lista di pokemon da localstorage
let listMyPokemon = lista ? JSON.parse(lista) : [] // se sono presenti dati in localstorage li passa a listMyPokemon, se no ritorna una stringa vuota

function creazioneSprite(pokemon){
        // Crea un elemento HTML per il Pokémon con immagine più grande
        const pokeElement = utils.creazionePokeElement();
        // creazione dell'element per l'immagine
        const SpritePokemon = utils.creazioneSprite(pokemon);
        // creazione del pulsante remove
        const pulsanteRemove = utils.creazionePulsante("red","remove","Remove");
        // creazione del testo contenente il nome del pokemon
        const testo = utils.creazioneTesto(pokemon);

        pokeElement.appendChild(SpritePokemon)
        pokeElement.appendChild(testo)
        pokeElement.appendChild(pulsanteRemove)

        // Aggiunge l'evento click all'immagine del pokemon per mostrare la finestra modale
        SpritePokemon.addEventListener('click', () => utils.showModal(pokemon));
        // Aggiunge l'evento click per catttura eun pokemon ed aggiungerlo alla collezione
        pulsanteRemove.addEventListener('click', () => rimuoviMyPokemon(pokemon))
        return pokeElement
}

async function fetchPokemonData(pokemon){
    try {
        // Crea un elemento HTML per il Pokémon con immagine più grande
        const pokeElement = creazioneSprite(pokemon)

        // Aggiunge l'elemento alla griglia
        allPokeContainer.appendChild(pokeElement);

        console.log(allPokeContainer)

    } catch (error) {
        console.error('Errore nel fetch dei dati del Pokémon:', error);
    }
};


utils.chiusuraModal();
//funzione per aggingere i pokemon alla lista persistente MyPokemon

function rimuoviMyPokemon(Pokemon){
    //controllo per verificare se Pokemon è nella lista
    if(listMyPokemon.includes(Pokemon)){
        let index = listMyPokemon.indexOf(Pokemon) //ritorna l'index dell'elemento "Pokemon" è in lista
        listMyPokemon.splice(index,1) //rimuovi l'elemento dalla lista
        localStorage.setItem("MyPokemon", JSON.stringify(listMyPokemon)) //aggiorna local storage
        settlement() //ricarica i pokemon in modo tale da aggiornare la lista dei pokemon catturati
    }
}

//funzione per impostare i pokemon catturati
function settlement(){
    allPokeContainer.innerHTML = ""; //imposta il tag div vuoto
    listMyPokemon.forEach(pokemon => fetchPokemonData(pokemon)); //caricamento dei pokemon nel div
}

settlement()