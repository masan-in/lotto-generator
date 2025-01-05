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

// 번호 저장 기능
const savedNumbers = [];
document.getElementById('save-btn').addEventListener('click', function() {
  const numbers = Array.from(document.querySelectorAll('.lotto-ball')).map(ball => ball.textContent);
  savedNumbers.push(numbers.join(', '));
  updateSavedNumbersDisplay();
});

function updateSavedNumbersDisplay() {
  const savedNumbersList = document.getElementById('saved-numbers-list');
  savedNumbersList.innerHTML = '';
  savedNumbers.forEach((numbers, index) => {
    const listItem = document.createElement('li');
    listItem.textContent = `저장 ${index + 1}: ${numbers}`;
    savedNumbersList.appendChild(listItem);
  });
}

// 번호 공유 기능
document.getElementById('share-btn').addEventListener('click', function() {
  const numbers = Array.from(document.querySelectorAll('.lotto-ball')).map(ball => ball.textContent);
  const shareUrl = `${window.location.origin}${window.location.pathname}?numbers=${numbers.join(',')}`;
  navigator.clipboard.writeText(shareUrl).then(() => {
    alert('URL이 클립보드에 복사되었습니다!');
  });
});

// 번호 통계 기능
const numberStats = {};
function updateNumberStats(numbers) {
  numbers.forEach(num => {
    if (numberStats[num]) {
      numberStats[num]++;
    } else {
      numberStats[num] = 1;
    }
  });
}

document.getElementById('stats-btn').addEventListener('click', function() {
  const statsContent = document.getElementById('stats-content');
  statsContent.innerHTML = '';

  for (let num = 1; num <= 45; num++) {
    const statItem = document.createElement('div');
    statItem.textContent = `번호 ${num}: ${numberStats[num] || 0}회`;
    statsContent.appendChild(statItem);
  }
});

// 랜덤 이름 생성 기능
const names = ['영희', '철수', '민수', '지은', '현우', '수진', '태영', '혜린', '준호', '예진'];
document.getElementById('random-name-btn').addEventListener('click', function() {
  const randomName = names[Math.floor(Math.random() * names.length)];
  document.getElementById('random-name').textContent = randomName;
});

// 번호 생성 기록 기능
const history = [];
function updateHistory(numbers) {
  history.push(numbers.join(', '));
  const historyList = document.getElementById('history-list');
  historyList.innerHTML = '';
  history.forEach((numbers, index) => {
    const listItem = document.createElement('li');
    listItem.textContent = `기록 ${index + 1}: ${numbers}`;
    historyList.appendChild(listItem);
  });
}

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

  updateNumberStats(numbers); // 통계 업데이트
  updateHistory(numbers); // 기록 업데이트

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

  // URL에서 번호 불러오기
  const urlParams = new URLSearchParams(window.location.search);
  const numbers = urlParams.get('numbers');
  if (numbers) {
    const lottoBallContainer = document.getElementById('lotto-ball-container');
    lottoBallContainer.innerHTML = '';
    numbers.split(',').forEach((number, index) => {
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
  }
};
// 방문자 수를 로컬 스토리지에서 가져오거나 초기화
let totalVisitors = localStorage.getItem('totalVisitors');

if (totalVisitors === null) {
  totalVisitors = 0; // 초기값 설정
} else {
  totalVisitors = parseInt(totalVisitors); // 문자열을 숫자로 변환
}

// 방문자 수 증가
totalVisitors += 1;

// 로컬 스토리지에 저장
localStorage.setItem('totalVisitors', totalVisitors);

// 화면에 표시
document.getElementById('total-visitors').textContent = totalVisitors;

// 현재 시간 표시
function updateTime() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  document.getElementById('current-time').textContent = `${hours}:${minutes}:${seconds}`;
}

// 1초마다 시간 업데이트
setInterval(updateTime, 1000);
updateTime(); // 초기 실행

const fortunes = [
  "오늘은 행운이 가득할 날이에요!",
  "로또 번호가 당신을 부를 거예요!",
  "행운은 당신의 편!",
  "오늘은 특별한 날이 될 거예요!",
  "기대하세요, 큰 행운이 찾아올 거예요!"
];

function displayFortune() {
  const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
  alert(randomFortune); // 또는 화면에 메시지를 표시
}

document.getElementById('generate-btn').addEventListener('click', displayFortune);

const emojis = ['🍀', '🎉', '💰', '🍒', '⭐', '🌈'];

function displayRandomEmoji() {
  const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
  alert(`행운의 이모지: ${randomEmoji}`);
}

document.getElementById('generate-btn').addEventListener('click', displayRandomEmoji);