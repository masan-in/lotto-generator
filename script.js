document.getElementById('generate-btn').addEventListener('click', function() {
  const lottoBallContainer = document.getElementById('lotto-ball-container');
  lottoBallContainer.innerHTML = ''; // 기존 번호 초기화

  const numbers = generateLottoNumbers();
  numbers.forEach((number, index) => {
    const ball = document.createElement('div');
    ball.className = 'lotto-ball';
    ball.textContent = number;

    // 번호에 따라 색상 설정
    if (number >= 1 && number <= 10) {
      ball.style.backgroundColor = '#ffc107'; // 노랑
    } else if (number >= 11 && number <= 20) {
      ball.style.backgroundColor = '#2196f3'; // 파랑
    } else if (number >= 21 && number <= 30) {
      ball.style.backgroundColor = '#f44336'; // 빨강
    } else if (number >= 31 && number <= 40) {
      ball.style.backgroundColor = '#9e9e9e'; // 회색
    } else if (number >= 41 && number <= 45) {
      ball.style.backgroundColor = '#4caf50'; // 초록
    }

    // 각 볼에 애니메이션 딜레이 추가
    ball.style.animationDelay = `${index * 0.2}s`;
    lottoBallContainer.appendChild(ball);
  });

  // 소리 재생
  const soundEffect = document.getElementById('sound-effect');
  soundEffect.play();

  // 버튼 클릭 시 진동 효과 (모바일에서 동작)
  if (navigator.vibrate) {
    navigator.vibrate(100); // 100ms 동안 진동
  }
});

function generateLottoNumbers() {
  const numbers = [];
  while (numbers.length < 6) {
    const randomNumber = Math.floor(Math.random() * 45) + 1;
    if (!numbers.includes(randomNumber)) {
      numbers.push(randomNumber);
    }
  }
  numbers.sort((a, b) => a - b);
  return numbers;
}