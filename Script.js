const paragraphs = [
  "Typing is a skill that improves with practice. The more you type, the faster and more accurate you become.",
  "RocketTyping is designed to make learning fun. With multilingual support and real-time stats, it's built for everyone.",
  "Speed matters, but accuracy is key. Focus on hitting the right keys before chasing high WPM scores.",
  "Consistency beats bursts of speed. Train daily, track your progress, and enjoy the journey.",
  "Your fingers are faster than you think. Let muscle memory take over and trust the rhythm."
];

let timer = 0;
let interval;
let mode = 15;
let startTime;
let typedChars = 0;
let correctChars = 0;

function setMode(seconds) {
  mode = seconds;
  resetTest();
}

function getRandomParagraph() {
  const randomIndex = Math.floor(Math.random() * paragraphs.length);
  return paragraphs[randomIndex];
}

function resetTest() {
  clearInterval(interval);
  document.getElementById("typing-input").value = "";
  document.getElementById("paragraph-display").innerText = getRandomParagraph();
  document.getElementById("timer").innerText = mode;
  document.getElementById("wpm").innerText = "0";
  document.getElementById("accuracy").innerText = "100%";
  timer = mode;
  typedChars = 0;
  correctChars = 0;
}

function startTimer() {
  startTime = Date.now();
  interval = setInterval(() => {
    timer--;
    document.getElementById("timer").innerText = timer;
    if (timer <= 0) {
      clearInterval(interval);
      document.getElementById("typing-input").disabled = true;
    }
  }, 1000);
}

document.getElementById("typing-input").addEventListener("input", () => {
  if (timer === mode) startTimer();

  const typed = document.getElementById("typing-input").value;
  const target = document.getElementById("paragraph-display").innerText;

  typedChars = typed.length;
  correctChars = 0;

  for (let i = 0; i < typed.length; i++) {
    if (typed[i] === target[i]) correctChars++;
  }

  const accuracy = typedChars ? Math.round((correctChars / typedChars) * 100) : 100;
  const elapsed = (mode - timer) / 60;
  const wpm = elapsed > 0 ? Math.round((correctChars / 5) / elapsed) : 0;

  document.getElementById("accuracy").innerText = ${accuracy}%;
  document.getElementById("wpm").innerText = wpm;
});

resetTest();