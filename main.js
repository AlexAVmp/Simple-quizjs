const quizData = [
    {
        question: "1. Where is the bird?",
        a: "Not a bird",
        b: "Not a bird",
        c: "Not a bird",
        d: "Bird",
        correct: "d",
    },
    {
        question: "2. Where is the bird?",
        a: "Not a bird",
        b: "Bird",
        c: "Not a bird",
        d: "Not a bird",
        correct: "b",
    },
    {
        question: "3. Where is the bird?",
        a: "Bird",
        b: "Not a bird",
        c: "Not a bird",
        d: "Not a bird",
        correct: "a",
    },
    {
        question: "4. Where is the bird?",
        a: "Not a bird",
        b: "Bird",
        c: "Not a bird",
        d: "Not a bird",
        correct: "b",
    },
];

const quiz = document.querySelector(".quiz");
const answerEls = document.querySelectorAll(".answer");
const questionEl = document.querySelector(".quiz__question");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const submitBtn = document.getElementById("quiz__submit");
const timeLeft = document.querySelector(".time_left");
const timeSec = document.querySelector(".time_sec");

let currentQuiz = 0;
let score = 0;
let timeValue = 20;
let counter = null;


loadQuiz();

function loadQuiz() {
    timeLeft.textContent = "Time Left:";

    startTimer(timeValue);

    deselectAnswers();

    const currentQuizData = quizData[currentQuiz];

    questionEl.innerText = currentQuizData.question;
    a_text.innerText = currentQuizData.a;
    b_text.innerText = currentQuizData.b;
    c_text.innerText = currentQuizData.c;
    d_text.innerText = currentQuizData.d;
}

function getSelected() {
    let answer = null;

    answerEls.forEach((answerEl) => {
        if (answerEl.checked) {
            answer = answerEl.id;
        }
    });

    return answer;
}

function deselectAnswers() {
    answerEls.forEach((answerEl) => {
        answerEl.checked = false;
    });
}

submitBtn.addEventListener("click", () => {
    const answer = getSelected();

        if (answer === quizData[currentQuiz].correct) {
            score++;
        }

        currentQuiz++;
        
        if (currentQuiz < quizData.length) {
            loadQuiz();
        } else {
            quiz.innerHTML = `
                <h2>${score}/${quizData.length}.</h2>
                <button onclick="location.reload()">Reload</button>
            `;
        }
});

function startTimer(time){
    clearInterval(counter);
    counter = setInterval(function() {
        timeSec.textContent = time;
        time--;

        if (time < 9){
            let addZero = timeSec.textContent;
            timeSec.textContent = "0" + addZero;
        }

        if (time < 0){
            clearInterval(counter);
            timeLeft.textContent = "Time Off:";
            
            currentQuiz++;

            if (currentQuiz < quizData.length) {
                loadQuiz();
            } else {
                quiz.innerHTML = `
                    <h2>${score}/${quizData.length}.</h2>
                    <button onclick="location.reload()">Reload</button>
                `;
            }

        }
    }, 1000);
}

