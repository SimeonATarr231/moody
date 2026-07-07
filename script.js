// ---- CONFIG ----
const API_URL = 'https://quoteslate.vercel.app/api/quotes/random';

// Curated gradient pairs — each is [startColor, endColor]
const gradients = [
  ['#1B1F3B', '#4A314D'], // indigo → plum
  ['#C9713D', '#7C9885'], // sienna → sage
  ['#4A314D', '#C9713D'], // plum → sienna
  ['#7C9885', '#1B1F3B'], // sage → indigo
];

// Fallback quotes in case the API is down or rate-limited —
// never leave a user staring at a broken app.
const fallbackQuotes = [
  { quote: 'The only way to do great work is to love what you do.', author: 'Steve Jobs' },
  { quote: 'In the middle of difficulty lies opportunity.', author: 'Albert Einstein' },
];

// ---- DOM REFERENCES ----
const quoteText = document.getElementById('quote-text');
const quoteAuthor = document.getElementById('quote-author');
const newMoodBtn = document.getElementById('new-mood-btn');
const saveBtn = document.getElementById('save-btn');
const savedList = document.getElementById('saved-list');
const layerA = document.querySelector('.bg-layer-a');
const layerB = document.querySelector('.bg-layer-b');

// Tracks which background layer is currently visible,
// so we know which one to fade IN next time.
let activeLayer = layerA;
let inactiveLayer = layerB;

let currentQuote = null;

// ---- BACKGROUND CROSSFADE ----
function shiftBackground() {
  // pick a random gradient, different from what's showing now
  const [start, end] = gradients[Math.floor(Math.random() * gradients.length)];

  // set the HIDDEN layer's gradient first — the user can't see it change yet
  inactiveLayer.style.background = `linear-gradient(160deg, ${start}, ${end})`;

  // now fade it in, and fade the old one out — CSS transition (from our stylesheet) handles the animation
  inactiveLayer.style.opacity = '1';
  activeLayer.style.opacity = '0';

  // swap references so next call fades the OTHER layer in
  [activeLayer, inactiveLayer] = [inactiveLayer, activeLayer];
}

// ---- FETCH A NEW QUOTE ----
async function getNewMood() {
  quoteText.textContent = 'Loading...';
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('API request failed');
    const data = await response.json();

    currentQuote = { quote: data.quote, author: data.author };
  } catch (error) {
    // API down? Fall back so the app still works.
    console.error('Falling back to local quotes:', error);
    currentQuote = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
  }

  quoteText.textContent = `"${currentQuote.quote}"`;
  quoteAuthor.textContent = `— ${currentQuote.author}`;
  shiftBackground();
}

// ---- SAVE TO LOCALSTORAGE ----
function saveMood() {
  if (!currentQuote) return; // nothing to save yet

  const saved = JSON.parse(localStorage.getItem('savedMoods')) || [];
  saved.push(currentQuote);
  localStorage.setItem('savedMoods', JSON.stringify(saved));

  renderSavedList(saved);
}

function renderSavedList(saved) {
  savedList.innerHTML = ''; // clear and rebuild — simplest way to keep it in sync
  saved.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `"${item.quote}" — ${item.author}`;
    savedList.appendChild(li);
  });
}

// ---- LOAD SAVED MOODS ON PAGE LOAD ----
function loadSavedMoods() {
  const saved = JSON.parse(localStorage.getItem('savedMoods')) || [];
  renderSavedList(saved);
}

// ---- EVENT LISTENERS ----
newMoodBtn.addEventListener('click', getNewMood);
saveBtn.addEventListener('click', saveMood);

// ---- INIT ----
loadSavedMoods();
getNewMood();