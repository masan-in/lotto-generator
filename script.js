// 방문자 수 (1000부터 시작)
function updateVisitorCount() {
  let count = localStorage.getItem('visitorCount');
  if (count === null) { // localStorage에 값이 없는 경우
    count = 1000; // 기본값을 1000으로 설정
  } else {
    count = parseInt(count) + 1; // 값이 있으면 1 증가
  }
  localStorage.setItem('visitorCount', count);
  document.getElementById('visitor-count').textContent = count;
}

// 현재 시간 업데이트
function updateTime() {
  const now = new Date();
  const timeString = now.toLocaleTimeString();
  document.getElementById('time').textContent = timeString;
}

// 다크 모드 전환
document.getElementById('theme-toggle').addEventListener('click', function() {
  document.body.classList.toggle('dark-mode');
  const isDarkMode = document.body.classList.contains('dark-mode');
  this.textContent = isDarkMode ? '라이트 모드' : '다크 모드';
  localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
});

// 페이지 로드 시 초기 설정
window.onload = function() {
  document.getElementById('loading-spinner').style.display = 'none';
  updateVisitorCount(); // 방문자 수 업데이트
  updateTime(); // 현재 시간 업데이트
  const savedTheme = localStorage.getItem('theme') || 'light';
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    document.getElementById('theme-toggle').textContent = '라이트 모드';
  }
};

// 번호 생성 로직
document.getElementById('generate-btn').addEventListener('click', function() {
  const lottoBallContainer = document.getElementById('lotto-ball-container');
  lottoBallContainer.innerHTML = '';

  const numbers = generateLottoNumbers();
  numbers.forEach((number, index) => {
    const ball = document.createElement('div');
    ball.className = 'lotto-ball';
    ball.textContent = number;

    if (number >= 1 && number <= 10) {
      ball.style.backgroundColor = '#ffc107';
    } else if (number >= 11 && number <= 20) {
      ball.style.backgroundColor = '#2196f3';
    } else if (number >= 21 && number <= 30) {
      ball.style.backgroundColor = '#f44336';
    } else if (number >= 31 && number <= 40) {
      ball.style.backgroundColor = '#9e9e9e';
    } else if (number >= 41 && number <= 45) {
      ball.style.backgroundColor = '#4caf50';
    }

    ball.style.animationDelay = `${index * 0.2}s`;
    lottoBallContainer.appendChild(ball);
  });

  const soundEffect = document.getElementById('sound-effect');
  soundEffect.play();

  if (navigator.vibrate) {
    navigator.vibrate(100);
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

// 맨 위로 이동 버튼
window.onscroll = function() {
  const scrollButton = document.getElementById('scroll-to-top');
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    scrollButton.style.display = 'block';
  } else {
    scrollButton.style.display = 'none';
  }
};

document.getElementById('scroll-to-top').addEventListener('click', function() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
});

// 1초마다 시간 업데이트
setInterval(updateTime, 1000);
updateTime(); // 초기 실행