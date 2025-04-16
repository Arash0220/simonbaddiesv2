const buttons = document.querySelectorAll(".button");
const startButton = document.getElementById("start");
const levelDisplay = document.getElementById("level");

let sequence = [];
let playerSequence = [];
let level = 0;
let isGameActive = false;

// Sound effects for each button
const sounds = {
  red: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"),
  blue: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"),
  green: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"),
  yellow: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"),
};

// Add event listeners to buttons
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if (isGameActive) {
      const color = button.getAttribute("data-color");
      playerSequence.push(color);
      playSound(color);
      checkSequence();
    }
  });
});

// Start the game
startButton.addEventListener("click", () => {
  if (!isGameActive) {
    startGame();
  }
});

// Start game function
function startGame() {
  sequence = [];
  playerSequence = [];
  level = 0;
  isGameActive = true;
  levelDisplay.textContent = `Level: ${level}`;
  nextLevel();
}

// Generate next level
function nextLevel() {
  level++;
  levelDisplay.textContent = `Level: ${level}`;
  playerSequence = [];
  const randomColor = ["red", "blue", "green", "yellow"][Math.floor(Math.random() * 4)];
  sequence.push(randomColor);
  playSequence();
}

// Play the sequence
function playSequence() {
  let i = 0;
  const interval = setInterval(() => {
    const color = sequence[i];
    highlightButton(color);
    playSound(color);
    i++;
    if (i >= sequence.length) {
      clearInterval(interval);
    }
  }, 1000);
}

// Highlight a button
function highlightButton(color) {
  const button = document.querySelector(`[data-color="${color}"]`);
  button.classList.add("active");
  setTimeout(() => {
    button.classList.remove("active");
  }, 500);
}

// Play sound
function playSound(color) {
  sounds[color].play();
}

// Check player's sequence
function checkSequence() {
  const index = playerSequence.length - 1;
  if (playerSequence[index] !== sequence[index]) {
    endGame();
    return;
  }
  if (playerSequence.length === sequence.length) {
    setTimeout(() => {
      nextLevel();
    }, 1000);
  }
}

// End game function
function endGame() {
  alert(`Game Over! You reached level ${level}.`);
  isGameActive = false;
  sequence = [];
  playerSequence = [];
  level = 0;
  levelDisplay.textContent = `Level: ${level}`;
}
//  to edit to add more game functions, audio ( to completely test out the baddeley memoriess)
