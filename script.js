const inputBox = document.getElementById('inputBox');
const nameInput = document.getElementById('nameInput');
const startBtn = document.getElementById('startBtn');
const imageBox = document.getElementById('imageBox');
const sceneImage = document.getElementById('sceneImage');
const sparkleLayer = document.getElementById('sparkleLayer');
const messageArea = document.getElementById('messageArea');
const finalGreeting = document.getElementById('finalGreeting');
const snowContainer = document.getElementById('snowContainer');

let userName = "";
let imgIndex = 0;
let msgIndex = 0;
let started = false;
let snowSpeed = 5000; // default fall duration

const images = [
  "studio1.png", // corrected first image
  "xmas2.png",
  "xmas3.png",
  "xmas4.png",
  "xmas5.png",
  "xmas6.png",
  "xmas7.png"
];

const messages = [
  "Hi!, Meeting you last November was so unexpected — and it truly felt like a gift.",
  "Your energy is one of a kind, and it always leaves a mark.",
  "I admire the way you carry yourself with such attitude, positivity and honesty.",
  "I’m grateful for the chance to know you better.",
  "That 1st hangout was so far the best and I’ve genuinely enjoyed.",
  "I want you to know more but I’ll always respect your privacy and the space you need.",
  "looking forward to more hangouts together! if possible.. :)"
];

// Start button
startBtn.addEventListener('click', () => {
  userName = nameInput.value.trim();
  if (!userName) return;
  inputBox.classList.add('hidden');
  imageBox.classList.remove('hidden');
  started = true;
});

// Image click
sceneImage.addEventListener('click', (e) => {
  if (!started) return;

  // Shake
  sceneImage.classList.remove('shake');
  void sceneImage.offsetWidth;
  sceneImage.classList.add('shake');

  // Sparkles
  createSparkles(e);

  // Show message
  if (msgIndex < messages.length) {
    showMessage(messages[msgIndex]);
    msgIndex++;
    imgIndex = (imgIndex + 1) % images.length;
    sceneImage.src = images[imgIndex];
  } else if (msgIndex === messages.length) {
    // Hide image and message
    imageBox.classList.add('hidden');
    messageArea.innerHTML = "";
    msgIndex++;
  } else {
    // Final greeting
    finalGreeting.textContent = `✨ MERRY CHRISTMAS, ${userName}! ✨`;
    finalGreeting.classList.remove('hidden');
    startSnow();
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
    s.style.top = `${y + Math.sin(angle) * radius - size / 2}px`;
    s.style.width = `${size}px`;
    s.style.height = `${size}px`;
    sparkleLayer.appendChild(s);
    setTimeout(() => s.remove(), 1100);
  }
}

// Show message
function showMessage(msg) {
  const note = document.createElement('div');
  note.className = 'note';
  note.textContent = msg;
  messageArea.innerHTML = '';
  messageArea.appendChild(note);
  setTimeout(() => note.remove(), 5000);
}

// Snow effect
function startSnow() {
  setInterval(() => {
    const snowflake = document.createElement('div');
    snowflake.className = 'snowflake';
    snowflake.textContent = '❄';
    snowflake.style.left = Math.random() * window.innerWidth + 'px';
    snowflake.style.fontSize = (Math.random() * 1.5
