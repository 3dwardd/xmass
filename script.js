/* DOM references */
const greeting   = document.getElementById('greeting');     // “Merry Christmas, NAME!”
const sceneImage = document.getElementById('sceneImage');   // Interactive image
const sparkleLayer = document.getElementById('sparkleLayer'); // Sparkles overlay
const messageArea  = document.getElementById('messageArea');  // Ephemeral message container
const inputBox   = document.getElementById('inputBox');     // Name input panel
const nameInput  = document.getElementById('nameInput');    // Name field
const startBtn   = document.getElementById('startBtn');     // Start button
const hint       = document.getElementById('hint');         // “Press the image ✨”

/* State */
let started = false;       // Interaction enabled after name entered
let msgIndex = 0;          // Message cycler index
let imgIndex = 0;          // Image cycler index

/* Optional: rotate through multiple images (add these files to your repo) */
const images = [
  'xmas1.png',
  'xmas2.png',
  'xmas3.png'
];

/* Wonderful, joyful messages (10+) */
const messages = [
  "You make this Christmas season unforgettable.",
  "Your smile is the brightest star in my winter sky.",
  "May joy wrap you up like the coziest holiday blanket.",
  "You’re the warm glow that lights up this night.",
  "Every snowflake feels happier because of you.",
  "Hope your heart twinkles like the star on top.",
  "You’re the gift that makes this season magical.",
  "Wishing you laughter, warmth, and wonder tonight.",
  "Your kindness is the sweetest Christmas story.",
  "You light up the season in the most wonderful way.",
  "May love find you like snow finds rooftops — softly and surely.",
  "Thank you for being my favorite Christmas miracle."
];

/* Start: capture name, personalize header, fade away input, show hint */
startBtn.addEventListener('click', () => {
  const name = nameInput.value.trim();      // Read name
  if (!name) return;                        // Ignore empty

  greeting.innerHTML = `✨🌟 Merry Christmas, <strong>${escapeHTML(name)}</strong>! 🌟✨`; // Personalized
  inputBox.classList.add('fade-out');       // Animate panel out
  setTimeout(() => { inputBox.style.display = 'none'; }, 360); // Remove after fade
  hint.classList.add('show');               // Show “Press the image ✨”
  started = true;                           // Enable interactions
});

/* Image interaction: shake, sparkles, message, rotate image */
sceneImage.addEventListener('pointerdown', (e) => {
  if (!started) return;             // Only after start
  e.preventDefault();               // Mobile-friendly

  // 1) Shake
  sceneImage.classList.add('shake');
  setTimeout(() => sceneImage.classList.remove('shake'), 460);

  // 2) Sparkles at tap point
  createSparkles(e);

  // 3) Show a wonderful message (fades out after 5s)
  showMessage();

  // 4) Rotate to next image (if you added multiple)
  imgIndex = (imgIndex + 1) % images.length;
  sceneImage.src = images[imgIndex];
});

/* Sparkle burst near tap position */
function createSparkles(e) {
  const rect = sceneImage.getBoundingClientRect();  // Image bounds
  const x = e.clientX - rect.left;                  // Tap X inside image
  const y = e.clientY - rect.top;                   // Tap Y inside image

  for (let i = 0; i < 12; i++) {                    // 12 sparkles feels lively
    const s = document.createElement('div');        // Create sparkle
    s.className = 'sparkle';

    // Random direction and distance
    const angle = Math.random() * Math.PI * 2;
    const radius = 10 + Math.random() * 36;
    const size = 6 + Math.random() * 10;

    s.style.left = `${x + Math.cos(angle) * radius - size / 2}px`;
    s.style.top  = `${y + Math.sin(angle) * radius - size / 2}px`;
    s.style.width = `${size}px`;
    s.style.height = `${size}px`;

    sparkleLayer.appendChild(s);
    setTimeout(() => s.remove(), 1100);             // Cleanup
  }
}

/* Show one message, fade away after 5 seconds */
function showMessage() {
  const note = document.createElement('div');     // Bubble element
  note.className = 'note';
  note.textContent = messages[msgIndex % messages.length]; // Pick message
  msgIndex++;                                     // Next for next tap

  // Clear previous bubble before showing new one (keeps it clean)
  messageArea.innerHTML = '';
  messageArea.appendChild(note);
  setTimeout(() => note.remove(), 5000);          // Auto-vanish
}

/* Escape HTML for safe name display */
function escapeHTML(str) {
  const p = document.createElement('p');
  p.innerText = str;
  return p.innerHTML;
}
