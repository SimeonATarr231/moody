# Mood Board Generator

A small web app that pulls a random quote and shifts the page's background gradient to match a new mood — built to practice fetch, async/await, localStorage, and CSS transitions without any frameworks.

## Features

- Fetches random quotes from the [QuoteSlate API](https://github.com/musheer360/QuoteSlate)
- Background smoothly crossfades between curated gradient pairs on each new quote
- Save your favorite quotes — persisted with `localStorage`, so they survive a page refresh
- Falls back to local quotes if the API is unreachable

## Built with

- HTML5
- CSS3 (custom properties, gradients, transitions)
- Vanilla JavaScript (fetch API, async/await, localStorage)

## Run it locally

1. Clone this repo
2. Open `index.html` in your browser — no build step, no dependencies

## Live demo

[View it here](https://YOUR-USERNAME.github.io/mood-board/)

## What I learned

- Why CSS can't animate gradients directly, and the two-layer crossfade technique to fake it
- Handling API failures gracefully with try/catch and fallback data
- Reading and writing structured data to localStorage safely

Built by **Simeon A. Tarr**
[GitHub](https://github.com/SimeonATarr231) · [Facebook](https://www.facebook.com/cimmeek.cimmeek)