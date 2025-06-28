// DOM Elements
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const reviewScreen = document.getElementById('review-screen');
const resultsScreen = document.getElementById('results-screen');
const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const continueBtn = document.getElementById('continue-btn');
const restartBtn = document.getElementById('restart-btn');
const shareBtn = document.getElementById('share-btn');
const difficultySelect = document.getElementById('difficulty');

// Quiz Elements
const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const feedbackElement = document.getElementById('feedback');
const currentScoreElement = document.getElementById('current-score');
const currentRoundElement = document.getElementById('current-round');
const currentQuestionElement = document.getElementById('current-question');
const reviewRoundElement = document.getElementById('review-round');
const roundScoreElement = document.getElementById('round-score');
const reviewQuestionsElement = document.getElementById('review-questions');
const finalScoreElement = document.getElementById('final-score');
const percentageElement = document.getElementById('percentage');
const roundScoresElement = document.getElementById('round-scores');
const performanceMessageElement = document.getElementById('performance-message');

// Quiz Variables
let rounds = [];
let currentRound = 0;
let currentQuestionIndex = 0;
let score = 0;
let roundScores = Array(10).fill(0);
let selectedOption = null;
let userAnswers = [];
let quizState = 'question'; // 'question' or 'answer'
// 👇 Add these two lines below
let timer;
let timeLeft = 15;

// Initialize Quiz
function initQuiz() {
    const difficulty = difficultySelect.value;
    rounds = getRounds(difficulty);
    currentRound = 0;
    currentQuestionIndex = 0;
    score = 0;
    roundScores = Array(10).fill(0);
    userAnswers = [];
    quizState = 'question';
    
    showScreen('quiz-screen');
    loadQuestion();
}

// Show Screen
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

// Load Question
function loadQuestion() {
    const question = rounds[currentRound][currentQuestionIndex];
    
    questionElement.textContent = question.question;
    optionsElement.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = option;
        button.addEventListener('click', () => selectOption(index));
        optionsElement.appendChild(button);
        
    });updateProgressBar();

    
    feedbackElement.textContent = '';
    feedbackElement.className = 'feedback';
    nextBtn.disabled = true;
    nextBtn.textContent = 'Check Answer';
    
    currentRoundElement.textContent = currentRound + 1;
    currentQuestionElement.textContent = currentQuestionIndex + 1;
    currentScoreElement.textContent = score;
    resetTimer(); // This will restart the countdown timer each time a question loads
}

// Select Option
function selectOption(index) {
    if (quizState !== 'question') return;
    
    // Deselect previous option if any
    if (selectedOption !== null) {
        optionsElement.children[selectedOption].classList.remove('selected');
    }
    
    // Select new option
    selectedOption = index;
    optionsElement.children[index].classList.add('selected');
    nextBtn.disabled = false;
}

// Check Answer
function checkAnswer() {
  stopTimer();  // 🛑 This will stop the countdown when an answer is selected
    if (selectedOption === null || quizState !== 'question') return;
    
    const question = rounds[currentRound][currentQuestionIndex];
    const isCorrect = selectedOption === question.answer;
    
    // Disable all options
    Array.from(optionsElement.children).forEach(button => {
        button.disabled = true;
    });
    
    // Mark correct and selected answers
    optionsElement.children[question.answer].classList.add('correct');
    if (!isCorrect) {
        optionsElement.children[selectedOption].classList.add('wrong');
    }
    
    // Update score if correct
    if (isCorrect) {
        score++;
        roundScores[currentRound]++;
    }
    
    // Store user answer for review
    userAnswers.push({
        question: question.question,
        options: question.options,
        correctAnswer: question.answer,
        userAnswer: selectedOption,
        reference: question.reference,
        isCorrect: isCorrect
    });
    
    // Show feedback
    if (isCorrect) {
        feedbackElement.textContent = `Correct! ${question.reference ? '(' + question.reference + ')' : ''}`;
        feedbackElement.className = 'feedback correct';
    } else {
        feedbackElement.textContent = `Incorrect. The correct answer is: ${question.options[question.answer]} ${question.reference ? '(' + question.reference + ')' : ''}`;
        feedbackElement.className = 'feedback wrong';
    }
    // 🔊 Play sound effect
playSound(isCorrect ? 'correct' : 'wrong');
    
    // Update UI
    currentScoreElement.textContent = score;
    nextBtn.textContent = currentQuestionIndex < 9 ? 'Next Question' : 'Finish Round';
    quizState = 'answer';
}

// Next Question
function nextQuestion() {
    if (quizState === 'question') {
        checkAnswer();
        return;
    }
    
    if (currentQuestionIndex < 9) {
        currentQuestionIndex++;
        selectedOption = null;
        quizState = 'question';
        loadQuestion();
    } else {
        showRoundReview();
    }
}

// Show Round Review
function showRoundReview() {
    reviewRoundElement.textContent = currentRound + 1;
    roundScoreElement.textContent = roundScores[currentRound];
    reviewQuestionsElement.innerHTML = '';
    
    userAnswers.forEach((answer, index) => {
        const reviewItem = document.createElement('div');
        reviewItem.className = `review-item ${answer.isCorrect ? 'correct' : 'incorrect'}`;
        
        const questionElement = document.createElement('div');
        questionElement.className = 'review-question';
        questionElement.textContent = `${index + 1}. ${answer.question}`;
        reviewItem.appendChild(questionElement);
        
        answer.options.forEach((option, i) => {
            const optionElement = document.createElement('div');
            optionElement.className = 'review-answer';
            
            if (i === answer.correctAnswer) {
                optionElement.classList.add('correct-answer');
                optionElement.innerHTML = `<i class="fas fa-check-circle"></i> ${option}`;
            } else if (i === answer.userAnswer && !answer.isCorrect) {
                optionElement.classList.add('user-answer', 'incorrect');
                optionElement.innerHTML = `<i class="fas fa-times-circle"></i> ${option}`;
            } else {
                optionElement.textContent = option;
            }
            
            reviewItem.appendChild(optionElement);
        });
        
        if (answer.reference) {
            const referenceElement = document.createElement('div');
            referenceElement.className = 'review-reference';
            referenceElement.textContent = answer.reference;
            reviewItem.appendChild(referenceElement);
        }
        
        reviewQuestionsElement.appendChild(reviewItem);
    });
    
    showScreen('review-screen');
}

// Continue to Next Round
function continueToNextRound() {
    if (currentRound < 9) {
        currentRound++;
        currentQuestionIndex = 0;
        userAnswers = [];
        quizState = 'question';
        loadQuestion();
        showScreen('quiz-screen');
    } else {
        showFinalResults();
    }
}

// Show Final Results
function showFinalResults() {
    finalScoreElement.textContent = score;
    const percentage = Math.round((score / 100) * 100);
    percentageElement.textContent = `${percentage}%`;
    
    // Set percentage color based on score
    if (percentage >= 80) {
        percentageElement.style.color = 'var(--correct-color)';
    } else if (percentage >= 50) {
        percentageElement.style.color = 'var(--highlight-color)';
    } else {
        percentageElement.style.color = 'var(--wrong-color)';
    }
    
    // Display round scores
    roundScoresElement.innerHTML = '';
    roundScores.forEach((roundScore, index) => {
        const roundScoreElement = document.createElement('div');
        roundScoreElement.className = 'round-score-item';
        
        if (roundScore === 10) {
            roundScoreElement.classList.add('perfect');
        } else if (roundScore >= 7) {
            roundScoreElement.classList.add('good');
        } else {
            roundScoreElement.classList.add('poor');
        }
        
        roundScoreElement.textContent = roundScore;
        roundScoresElement.appendChild(roundScoreElement);
    });
    
    // Set performance message
    if (percentage === 100) {
        performanceMessageElement.textContent = 'Perfect! You are a Bible expert!';
    } else if (percentage >= 80) {
        performanceMessageElement.textContent = 'Excellent! You know your Bible well!';
    } else if (percentage >= 60) {
        performanceMessageElement.textContent = 'Good job! Keep studying the Word!';
    } else if (percentage >= 40) {
        performanceMessageElement.textContent = 'Not bad! Try reading the Bible more often.';
    } else {
        performanceMessageElement.textContent = 'Keep practicing! The Bible is worth studying.';
    }
    
    showScreen('results-screen');
}

// Share Results
function shareResults() {
    const shareText = `I scored ${score}/100 on the Bible Quiz Pro! Can you beat my score?`;
    
    if (navigator.share) {
        navigator.share({
            title: 'Bible Quiz Pro Results',
            text: shareText,
            url: window.location.href
        }).catch(err => {
            console.log('Error sharing:', err);
            fallbackShare(shareText);
        });
    } else {
        fallbackShare(shareText);
    }
}

// Fallback for browsers that don't support Web Share API
function fallbackShare(shareText) {
    const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(window.location.href)}`;
    window.open(shareUrl, '_blank');
}

// Event Listeners
startBtn.addEventListener('click', initQuiz);
nextBtn.addEventListener('click', nextQuestion);
continueBtn.addEventListener('click', continueToNextRound);
restartBtn.addEventListener('click', () => {
    showScreen('start-screen');
});
shareBtn.addEventListener('click', shareResults);

// Initialize
showScreen('start-screen');
// === Enhancements Below ===

// XP and Streak System
let xp = 0;
let streak = 0;
function updateXPBar() {
    const bar = document.getElementById('xp-bar');
    if (bar) bar.style.width = Math.min(xp, 100) + '%';
}

// Daily Challenge Logic
function isNewDay() {
    const lastPlayed = localStorage.getItem('lastPlayed');
    const today = new Date().toDateString();
    return lastPlayed !== today;
}
function setTodayPlayed() {
    const today = new Date().toDateString();
    localStorage.setItem('lastPlayed', today);
}
function playDailyChallenge() {
    if (!isNewDay()) {
        alert('You already played today! Come back tomorrow!');
        return;
    }
    initQuiz();
    setTodayPlayed();
}

// Sound Effects
function playSound(type) {
    const correctSound = new Audio('https://actions.google.com/sounds/v1/cartoon/clang_and_wobble.ogg');
    const wrongSound = new Audio('https://actions.google.com/sounds/v1/cartoon/wood_plank_flicks.ogg');
    if (type === 'correct') correctSound.play();
    else wrongSound.play();
}

// Award Badge after final results
function getAward(percentage) {
    if (percentage === 100) return { text: "🏅 Perfect Scholar", class: "gold" };
    if (percentage >= 80) return { text: "🎖️ Bible Champion", class: "silver" };
    if (percentage >= 60) return { text: "🥉 Faithful Learner", class: "bronze" };
    return null;
}

// Modify showFinalResults to append award badge (place inside that function)
const award = getAward(percentage);
if (award) {
    const badge = document.createElement('div');
    badge.className = 'award-badge ' + award.class;
    badge.textContent = award.text;
    performanceMessageElement.appendChild(badge);
}

// Show Bible Fact (place this line inside checkAnswer(), after feedback is shown)
const fact = getFact(question);
if (fact) {
    const factDiv = document.createElement('div');
    factDiv.className = 'fact-box';
    factDiv.textContent = "Did you know? " + fact;
    feedbackElement.appendChild(factDiv);
}

document.body.insertBefore(toggleTheme, document.body.firstChild);
// Update Progress Bar
function updateProgressBar() {
    const percent = ((currentQuestionIndex + 1) / 10) * 100;
    const progressEl = document.getElementById('progress');
    if (progressEl) {
        progressEl.style.width = `${percent}%`;
    }
}
function resetTimer() {
    clearInterval(timer);
    timeLeft = 15;
    document.getElementById('time-left').textContent = timeLeft;

    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('time-left').textContent = timeLeft;

        if (timeLeft === 0) {
            clearInterval(timer);
            checkAnswer(); // auto-check
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(timer);
}
const verses = [
    "Proverbs 3:5 – Trust in the Lord with all your heart.",
    "Philippians 4:13 – I can do all things through Christ who strengthens me.",
    "Psalm 119:105 – Your word is a lamp to my feet.",
    "Isaiah 41:10 – Do not fear, for I am with you.",
    "Romans 8:28 – All things work together for good...",
    "Joshua 1:9 – Be strong and courageous!",
    "Psalm 23:1 – The Lord is my shepherd, I lack nothing."
];

function showVerseOfTheDay() {
    const verse = verses[Math.floor(Math.random() * verses.length)];
    const verseElement = document.getElementById('daily-verse');
    if (verseElement) verseElement.textContent = `"${verse}"`;
}

showVerseOfTheDay();
const darkToggle = document.getElementById('dark-toggle');

// Load saved mode
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    darkToggle.checked = true;
}

darkToggle.addEventListener('change', () => {
    if (darkToggle.checked) {
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
    } else {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
    }
});
