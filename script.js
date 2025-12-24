// Elements
const inputScreen = document.getElementById('inputScreen');
const nameInput = document.getElementById('nameInput');
const startBtn = document.getElementById('startBtn');

const imageScreen = document.getElementById('imageScreen');
const sceneImage = document.getElementById('sceneImage');
const sparkleLayer = document.getElementById('sparkleLayer');
const messageArea = document.getElementById('messageArea');

const finalScreen = document.getElementById('finalScreen');
const finalGreeting = document.getElementById('finalGreeting');

// State
let userName = "";
let imgIndex = 0;
let msgIndex = 0;

// Assets
const images = [
  "studio1.png",
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
  "I admire the way you carry yourself with such attitude, positivity and joy.",
  "I’m grateful to get the chance to know you",
  "The 1st hangout was so far the best and I genuinely enjoyed it",
  "I hope I can get the chance to be close with you, and promise that I’ll always respect your space and won't force anything.",
  "Looking forward to more moments and hangouts if possible.."
];

// Preload images
preloadImages(images);

// Start: name capture
startBtn.addEventListener('click', onStart);
nameInput.addEventListener('keydown', e => { if (e.key === 'Enter') onStart(); });

function onStart() {
  const name = nameInput.value.trim();
  if (!name) return;
  userName = name;
  inputScreen.classList.add('hidden');
  imageScreen.classList.remove('hidden');
}

// Image interaction
sceneImage.addEventListener('pointerdown', e => {
  e.preventDefault();

  // Sparkles at click
  createSparkles(e);

  // Show messages and rotate images
  if (msgIndex < messages.length) {
    showMessage(messages[msgIndex]);
    msgIndex++;
    imgIndex = (imgIndex + 1) % images.length;
    sceneImage.src = images[imgIndex];
  } else {
    // Immediately show BIG MERRY CHRISTMAS, NAME!
    imageScreen.classList.add('hidden');
    messageArea.innerHTML = '';
    finalGreeting.textContent = `MERRY CHRISTMAS, ${escapeHTML(userName)}!`;
    finalScreen.classList.remove('hidden');
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

// Show one message
function showMessage(msg) {
  const note = document.createElement('div');
  note.className = 'note';
  note.textContent = msg;
  messageArea.innerHTML = '';
  messageArea.appendChild(note);
  setTimeout(() => note.remove(), 5000);
}

// Utilities
function preloadImages(srcs) {
  srcs.forEach(src => { const img = new Image(); img.src = src; });
}
function escapeHTML(str) {
  const p = document.createElement('p');
  p.innerText = str;
  return p.innerHTML;
}
