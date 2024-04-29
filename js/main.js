
// DOM
const quiz = document.getElementById('quiz');
const questionTitle = document.getElementById('question');
const countQuestion = document.getElementById('count-question');
const numberQuestion = document.getElementById('question-number');
const tottleNumberOfQuestions = document.getElementById('col-num-que');
const nextBtn = document.getElementById('next-question-btn');
const submiteBtn = document.getElementById('submite-btn');
const questionImage = document.getElementById('question-image');
const resultModal = document.getElementById('result');
const scoreModal = document.getElementById('score');
const allInputs = document.querySelectorAll("input[type='radio']");
const answerLabel = document.querySelectorAll('.answer-label');

// Variáveis de controle
let currentQuestion = 0;
let answerd = 0;

// Manipulando dom de acordo com as informacoes do quiz
const loadQuiz = () => {
    countQuestion.innerHTML = `${currentQuestion + 1}`;
    tottleNumberOfQuestions.innerHTML = quizData.length;
    numberQuestion.innerHTML = `${currentQuestion + 1}`;
    questionTitle.innerHTML = quizData[currentQuestion].question;
    questionImage.src = quizData[currentQuestion].image;
    answerLabel[0].innerHTML = quizData[currentQuestion].a;
    answerLabel[1].innerHTML = quizData[currentQuestion].b;

    reset();

    if (currentQuestion == quizData.length - 1) {
        nextBtn.style.display = 'none';
        submiteBtn.style.display = 'block';
    }

    animatePage();
};


//reset input selection
const reset = () => {
    allInputs.forEach((allInputs) => {
        allInputs.checked = false;
    });
};


// select input
const getSelected = () => {
    let answer;

    allInputs.forEach((allInputs) => {
        if (allInputs.checked) answer = allInputs.value;
    });

    return answer;
};

// Animation page
const animatePage = () => {
    
    document.body.classList.remove('animate-page');
    void document.body.offsetWidth; // Forçar o reflow
    document.body.classList.add('animate-page');
};

// Next
nextBtn.addEventListener('click', () => {
    let answer = getSelected();

    if (answer) {
        if (answer === quizData[currentQuestion].correct) {
            answerd++;
        }

        currentQuestion++;
        if (currentQuestion < quizData.length) {
            loadQuiz();
        }
    } else {
        alert("Por favor, selecione uma resposta antes de continuar");
    }

    animatePage();
});

// Submit
submiteBtn.addEventListener('click', () => {
    let answer = getSelected();

    if (answer === quizData[currentQuestion].correct) {
        answerd++;
    }

    currentQuestion++;

    if (getSelected() && answerd >= 3) {
        quiz.style.display = 'none';
        resultModal.style.display = 'block';
        scoreModal.innerHTML = `Você respondeu sim para  ${answerd} perguntas <br> mas nem tudo está perdido<br>click no botão abaixo para salvar o seu casamento. `;
    }

    if (getSelected() && answerd <= 2) {
        quiz.style.display = 'none';
        resultModal.style.display = 'block';
        scoreModal.innerHTML = `Você respondeu sim para apenas ${answerd} perguntas <br>click no botão abaixo<br>para obter dicas para o seu casamento. `;
    }

    if (getSelected() && answerd == 0) {
        quiz.style.display = 'none';
        resultModal.style.display = 'block';
        scoreModal.innerHTML = `Você não respondeu nenhuma pergunta como SIM <br>parece que seu casamento é perfeito<br>para obter mais dicas para o seu casamento<br> click no botão abaixo`;
    }

    animatePage();
});

// Iniciar o quiz
loadQuiz();
