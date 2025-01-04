document.getElementById("generate-btn").addEventListener("click", function () {
  const numbers = generateLottoNumbers();
  displayLottoBalls(numbers);
  playSound();
});

function generateLottoNumbers() {
  const numbers = [];
  while (numbers.length < 6) {
    const num = Math.floor(Math.random() * 45) + 1;
    if (!numbers.includes(num)) {
      numbers.push(num);
    }
  }
  numbers.sort((a, b) => a - b);
  return numbers;
}

function displayLottoBalls(numbers) {
  const container = document.getElementById("lotto-ball-container");
  container.innerHTML = ""; // 기존 볼 제거

  numbers.forEach((num) => {
    const ball = document.createElement("div");
    ball.classList.add("lotto-ball");
    ball.textContent = num;
    container.appendChild(ball);
  });
}

function playSound() {
  const sound = document.getElementById("sound-effect");
  sound.currentTime = 0; // 재생 위치 초기화
  sound.play();
}