
let currentQuestion = 0;
let correctAnswers = 0;
let totalQuestions = 10;
let questions = [];

function generateQuestions() {
  questions = [];
  for (let i = 0; i < totalQuestions; i++) {
    let a = Math.floor(Math.random() * 20) + 1;
    let b = Math.floor(Math.random() * 20) + 1;
    if (operator === '-') while (b > a) b = Math.floor(Math.random() * 20) + 1;
    if (operator === '/') {
      a = (Math.floor(Math.random() * 10) + 1) * (Math.floor(Math.random() * 10) + 1);
      b = Math.floor(Math.random() * 10) + 1;
    }
    questions.push({ a, b });
  }
}

function showQuestion() {
  if (currentQuestion < totalQuestions) {
    const q = questions[currentQuestion];
    document.getElementById('question').textContent = `Soal ${currentQuestion + 1}: ${q.a} ${operator} ${q.b} = ?`;
    document.getElementById('answer').value = '';
    document.getElementById('feedback').textContent = '';
  } else {
    document.getElementById('quiz').style.display = 'none';
    document.getElementById('result').style.display = 'block';
    document.getElementById('score').textContent = `Jawaban benar: ${correctAnswers} dari ${totalQuestions}`;
  }
}

function submitAnswer() {
  const userAnswer = parseFloat(document.getElementById('answer').value);
  const q = questions[currentQuestion];
  let correct = 0;
  switch (operator) {
    case '+': correct = q.a + q.b; break;
    case '-': correct = q.a - q.b; break;
    case '*': correct = q.a * q.b; break;
    case '/': correct = q.a / q.b; break;
  }
  if (userAnswer === correct) {
    correctAnswers++;
    document.getElementById('feedback').textContent = 'Benar!';
  } else {
    document.getElementById('feedback').textContent = `Salah! Jawaban yang benar: ${correct}`;
  }
  currentQuestion++;
  setTimeout(showQuestion, 1000);
}

// tambahkan di file script.js bagian score result
function showResult() {
  document.getElementById('quiz').style.display = 'none';
  document.getElementById('result').style.display = 'block';
  document.getElementById('score').textContent = `Jawaban benar: ${correctAnswers} dari ${totalQuestions}`;
  if (correctAnswers === totalQuestions) launchConfetti();
}

function launchConfetti() {
  const duration = 3 * 1000;
  const end = Date.now() + duration;
  (function frame() {
    confetti({
      particleCount: 5,
      startVelocity: 40,
      spread: 360,
      ticks: 60,
      origin: { y: 0.6 }
    });
    if (Date.now() < end) requestAnimationFrame(frame);
  }());
}


generateQuestions();
showQuestion();
