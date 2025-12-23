const treeImage = document.getElementById('treeImage');
const sparkleLayer = document.getElementById('sparkleLayer');
const messageBox = document.getElementById('messageBox');

const messages = [
  "You make this Christmas season unforgettable.",
  "Your smile is the brightest light tonight.",
  "May joy wrap you like a cozy blanket.",
  "You're the warm glow in this chilly night.",
  "Every snowflake feels happier because of you.",
  "Hope your heart twinkles like the star on top.",
  "You're the gift that makes this season magical.",
  "Wishing you laughter, warmth, and wonder.",
  "Your kindness is the best Christmas story.",
  "You light up the season in the sweetest way."
];

let messageIndex = 0;

// Handle image click
treeImage.addEventListener('pointerdown', (e) => {
  e.preventDefault();
  createSparkles(e);
  showMessage();
});

// Sparkle burst
function createSparkles(e) {
  const rect = treeImage.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  for (let i = 0; i < 10; i++) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    const angle = Math.random() * 2 * Math.PI;
    const radius = 20 + Math.random() * 30;
    const size = 6 + Math.random() * 10;

    sparkle.style.left = `${x + Math.cos(angle) * radius - size / 2}px`;
    sparkle.style.top = `${y + Math.sin(angle) * radius - size / 2}px`;
    sparkle.style.width = `${size}px`;
    sparkle.style.height = `${size}px`;

    sparkleLayer.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 1000);
  }
}

// Show animated message
function showMessage() {
  const note = document.createElement('div');
  note.className = 'note';
  note.textContent = messages[messageIndex % messages.length];
  messageBox.innerHTML = ''; // Clear previous
  messageBox.appendChild(note);
  messageIndex++;
}
