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
- [ ] **sidebar**
- [ ]  **darkmode**

## Requisiti tecnici
- [x] Usare la Fetch API per ottenere i dati dalla Pokémon API.
- [ ] Gestire gli errori mostrando messaggi appropriati.
- [ ] Organizzare il codice in modo modulare.

---

## Tecnologie utilizzate
- **HTML/CSS/JavaScript**
- **Fetch API**
- **Pokémon API**: [pokeapi.co](https://pokeapi.co/)
- **LocalStorage**: per la persistenza dei dati.
- **tailwind & daisyUI**: (https://tailwindcss.com/), (https://daisyui.com/)

## Installazione
1. Clona il repository:
   ```bash
   git clone https://github.com/username/EsercizioPokemonFetch
   cd EsercizioPokemonFetch
