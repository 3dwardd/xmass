// Elements
const inputScreen = document.getElementById('inputScreen');
const inputBox = document.getElementById('inputBox');
const nameInput = document.getElementById('nameInput');
const startBtn = document.getElementById('startBtn');

const imageScreen = document.getElementById('imageScreen');
const imageBox = document.getElementById('imageBox');
const sceneImage = document.getElementById('sceneImage');
const sparkleLayer = document.getElementById('sparkleLayer');
const messageArea = document.getElementById('messageArea');

const finalScreen = document.getElementById('finalScreen');
const finalGreeting = document.getElementById('finalGreeting');

const snowContainer = document.getElementById('snowContainer');

// State
let userName = "";
let imgIndex = 0;
let msgIndex = 0;
let started = false;
let snowInterval = null;
let currentSnowDuration = 6000; // ms (slower at start)

// Assets
const images = [
  "studio1.png",  // first requested
  "studio2.png",
  "studio3.png",
  "studio4.png",
  "studio5.png",
  "studio6.png",
  "studio7.png"
];

const messages = [
  "Hi! Meeting you last November was unexpected",
  "Your energy is one of a kind, and it always leaves a mark.",
  "I admire the way you carry yourself with such attitude,positivity and joy.",
  "I’m grateful to get the chance to know you ",
  "The 1st hangout was so far the best and I genuinely enjoyed it",
  "I hope I can get the chance to be close with you, and promise that I’ll always respect your space and won't force anything.",
  "looking forward to more moments hangouts if possible.."
];

// Preload images (helps avoid flashing on swap)
preloadImages(images);

// Start: name capture
startBtn.addEventListener('click', onStart);
nameInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') onStart();
});

function onStart() {
  const name = nameInput.value.trim();
  if (!name) return;
  userName = name;

  // Hide input screen and show image screen
  inputScreen.classList.add('hidden');
  imageScreen.classList.remove('hidden');
  started = true;
}

// Image interaction
sceneImage.addEventListener('pointerdown', (e) => {
  if (!started) return;
  e.preventDefault();

  // Shake re-trigger
  sceneImage.classList.remove('shake');
  void sceneImage.offsetWidth;
  sceneImage.classList.add('shake');

  // Sparkles near pointer
  createSparkles(e);

  // Message + image rotation logic
  if (msgIndex < messages.length) {
    showMessage(messages[msgIndex]);
    msgIndex++;
    imgIndex = (imgIndex + 1) % images.length;
    sceneImage.src = images[imgIndex];
  } else if (msgIndex === messages.length) {
    // Hide image + messages after the 7th
    imageScreen.classList.add('hidden');
    messageArea.innerHTML = '';
    msgIndex++; // advance to final stage
  } else {
    // Final greeting stage
    finalGreeting.textContent = `✨ MERRY CHRISTMAS, ${escapeHTML(userName)}! ✨`;
    finalScreen.classList.remove('hidden');

    // Start snow; subsequent taps speed it up
    startSnow();
    speedUpSnow();
  }
});

// Sparkles
function createSparkles(e) {
  const rect = sceneImage.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  for (let i = 0; i < 12; i++) {
    const s = document.createElement('div');
    s.className = 'sparkle';
    const angle = Math.random() * Math.PI * 2;
    const radius = 10 + Math.random() * 36;
    const size = 6 + Math.random() * 10;
    s.style.left = `${x + Math.cos(angle) * radius - size / 2}px`;
    s.style.top  = `${y + Math.sin(angle) * radius - size / 2}px`;
    s.style.width  = `${size}px`;
    s.style.height = `${size}px`;
    sparkleLayer.appendChild(s);
    setTimeout(() => s.remove(), 1100);
  }
}

// Show message (allows one at a time; change to stacking by removing innerHTML = '')
function showMessage(msg) {
  const note = document.createElement('div');
  note.className = 'note';
  note.textContent = msg;
  messageArea.innerHTML = ''; // keep clean; show one
  messageArea.appendChild(note);
  setTimeout(() => note.remove(), 5000);
}

// Final screen interaction speeds up snow
finalScreen.addEventListener('pointerdown', speedUpSnow);

// Snow logic
function startSnow() {
  if (snowInterval) return; // already running
  snowInterval = setInterval(spawnSnowflake, 300);
}

function speedUpSnow() {
  // Increase rate and speed (shorter duration)
  currentSnowDuration = Math.max(1800, currentSnowDuration - 800);
}

function spawnSnowflake() {
  const flake = document.createElement('div');
  flake.className = 'snowflake';
  flake.textContent = Math.random() < 0.3 ? '❅' : '❄';

  const startLeft = Math.random() * window.innerWidth;
  const size = 0.8 + Math.random() * 1.8; // em
  const driftDuration = 3000 + Math.random() * 4000; // ms

  flake.style.left = `${startLeft}px`;
  flake.style.fontSize = `${size}em`;
  flake.style.opacity = '0.95';

  // Apply two animations: fall and drift; fall speed controlled by currentSnowDuration
  flake.style.animationDuration = `${currentSnowDuration}ms, ${driftDuration}ms`;

  snowContainer.appendChild(flake);

  // Cleanup after fall finishes
  setTimeout(() => flake.remove(), Math.max(currentSnowDuration, driftDuration) + 200);
}

// Utilities
function preloadImages(srcs) {
  srcs.forEach(src => {
    const img = new Image();
    img.src = src;
  });
}

function escapeHTML(str) {
  const p = document.createElement('p');
  p.innerText = str;
  return p.innerHTML;
}
