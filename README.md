# Pokémon Web App

## Descrizione
Un'applicazione web che permette agli utenti di:
- Visualizzare una lista di Pokémon.
- Catturare e gestire una collezione personale (MyPokemon).
- Ottenere dettagli sui Pokémon tramite la [Pokémon API](https://pokeapi.co/).


## Struttura del progetto
- `src/`: Contiene il codice JavaScript/HTML/CSS principale.


## Funzionalità

### Checklist Attività
- [x] **Visualizzazione Pokémon**
  - [x] Recupero dei dati dalla Pokémon API.
  - [x] Mostrare le card con nome, sprite (immagine) e bottone "Catch".
- [x] **Cattura Pokémon**
  - [x] Implementare l'aggiunta alla lista personale (MyPokemon).
  - [x] Salvare la lista in **localStorage** per la persistenza.
- [x] **Visualizzazione dettagliata**
  - [x] Mostrare dettagli (tipo, abilità, statistiche) al click sull'immagine.
- [x] **Gestione MyPokemon**
  - [x] Mostrare tutti i Pokémon catturati in una sezione dedicata.
  - [x] Implementare il pulsante per rimuovere Pokémon dalla collezione.
- [x] **sidebar**
- [x]  **darkmode**

---

## Tecnologie utilizzate
- **HTML/CSS/JavaScript**
- **Fetch API**
- **Pokémon API**: [pokeapi.co](https://pokeapi.co/)
- **LocalStorage**: per la persistenza dei dati.
- **[tailwind](https://tailwindcss.com/) & [daisyUI](https://daisyui.com/)**

## Recupero delle liste di Pokémon con PokéAPI

Il progetto utilizza [PokéAPI](https://pokeapi.co/) per ottenere e visualizzare liste di Pokémon.

### Endpoint utilizzato:

GET https://pokeapi.co/api/v2/pokemon?limit={numero}&offset={offset}.

- **`limit`**: Specifica il numero di Pokémon da caricare per pagina.
- **`offset`**: Specifica da quale Pokémon iniziare (utile per la paginazione).

### Esempio di codice per ottenere la lista:

```javascript
fetch('https://pokeapi.co/api/v2/pokemon?limit=20&offset=0')
  .then(response => response.json())
  .then(data => {
    console.log(data.results);  // Array di Pokémon
  });
```
### struttura della risposta JSON:

```json
{
  "count": 1281,
  "next": "https://pokeapi.co/api/v2/pokemon?offset=2&limit=2",
  "previous": null,
  "results": [
    {
      "name": "bulbasaur",
      "url": "https://pokeapi.co/api/v2/pokemon/1/"
    },
    {
      "name": "ivysaur",
      "url": "https://pokeapi.co/api/v2/pokemon/2/"
    }
  ]
```

- **`url`**: l'endpoint per recuperare informazioni sui singoli pokemon


## Installazione
1. Clona il repository:
   ```bash
   git clone https://github.com/username/EsercizioPokemonFetch
   cd EsercizioPokemonFetch

## Deployment su vercel