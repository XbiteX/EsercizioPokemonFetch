# Pokémon Web App

## Descrizione
Un'applicazione web che permette agli utenti di:
- Visualizzare una lista di Pokémon.
- Catturare e gestire una collezione personale (MyPokemon).
- Ottenere dettagli sui Pokémon tramite la [Pokémon API](https://pokeapi.co/).


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

## 🛠️ Passaggi per il Deployment

### 1. Configura la Repository

- Carica il tuo progetto su un servizio Git (ad esempio **GitHub**, **GitLab**, o **Bitbucket**). Esegui questi comandi per inizializzare e caricare la tua repository:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/tuo-username/my-web-app.git
git push -u origin main
```

### 2. Collega la Repository a Vercel

1. Accedi al tuo account su [Vercel](https://vercel.com).
2. Clicca su **New Project**.
3. Seleziona il provider Git (es. **GitHub**) e autorizza l'accesso, se richiesto.
4. Trova e seleziona la repository del tuo progetto.

### 3. Configura le Impostazioni di Build

Durante la configurazione del progetto su Vercel:
- **Framework Preset**: Seleziona **Static Site** (l'impostazione predefinita per progetti in HTML/CSS/JS).
- **Root Directory**: Lascia il campo vuoto se i file del progetto si trovano nella root della repository.

### 4. Effettua il Deployment

- Clicca su **Deploy**. Vercel:
  - Analizzerà i file del tuo progetto.
  - Eseguirà il deployment automatico.
  - Genererà un URL univoco (es. `https://my-web-app.vercel.app`) per accedere alla tua applicazione.
