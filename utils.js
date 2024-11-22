/*file contentente alcune funzioni comuni per gli script*/

//creazione del contenitore per la carta
export function creazionePokeElement(){
    const pokeElement = document.createElement('div');
    pokeElement.className = 'p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 cursor-pointer flex flex-col items-center carta';
    return pokeElement
}

//creazione dello sprite del pokemon
export function creazioneSprite(pokeData){
    const SpritePokemon = document.createElement('img');
    SpritePokemon.src = pokeData.sprites.other['official-artwork'].front_default || pokeData.sprites.front_default;
    SpritePokemon.className = "w-full h-48 object-contain mb-2 rounded-lg";
    SpritePokemon.id = "spritePokemon";
    return SpritePokemon;
}

//creazoine del pulsate di rimozione
export function creazionePulsante(color, id, testo){
    const pulsanteRemove = document.createElement('button')
    pulsanteRemove.id = id
    pulsanteRemove.className = `bg-${color}-500 hover:bg-${color}-400 text-white font-bold py-2 px-4 border-b-4 border-${color}-700 hover:border-${color}-500 rounded`
    pulsanteRemove.innerText = testo;
    return pulsanteRemove;
}

//creazione del testo contentente il nome del pokemon
export function creazioneTesto(pokeData){
    const testo = document.createElement('h3');
    testo.innerText = pokeData.name;
    testo.className= "text-xl font-semibold text-center capitalize mt-2";
    return testo;
}

// Mostra la finestra modale con i dettagli del Pokémon
export function showModal(pokemon){
    document.getElementById('modal-img').src = pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default;
    document.getElementById('modal-name').textContent = pokemon.name;
    document.getElementById('modal-height').innerHTML = `Altezza: <span class="font-semibold">${pokemon.height / 10} m</span>`;
    document.getElementById('modal-weight').innerHTML = `Peso: <span class="font-semibold">${pokemon.weight / 10} kg</span>`;
    document.getElementById('modal-type').innerHTML = `Tipo: <span class="font-semibold">${pokemon.types.map(type => type.type.name).join(', ')}</span>`;
    document.getElementById('modal-abilities').innerHTML = `Abilità: <span class="font-semibold">${pokemon.abilities.map(ability => ability.ability.name).join(', ')}</span>`;

    // Estrai l'attacco e la difesa
    const attack = pokemon.stats.find(stat => stat.stat.name === 'attack').base_stat;
    const defense = pokemon.stats.find(stat => stat.stat.name === 'defense').base_stat;

    // Aggiungi attacco e difesa al modale
    document.getElementById('modal-attack').innerHTML = `Attacco: <span class="font-semibold">${attack}</span>`;
    document.getElementById('modal-defense').innerHTML = `Difesa: <span class="font-semibold">${defense}</span>`;

       
    modal.classList.remove('hidden');
};

export function chiusuraModal(){
    let modal = document.getElementById('modal');
    let closeModal = document.getElementById('close-modal');
    
    // Chiude la finestra modale
    closeModal.addEventListener('click', () => { modal.classList.add('hidden'); });

    // Chiude la finestra modale cliccando fuori dalla finestra
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.add('hidden');
        }
    });

}