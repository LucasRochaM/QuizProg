const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'Para a nota de um aluno qual tipo de dados utilizar',
        choice1: 'char',
        choice2: 'Float',
        choice3: 'Int',
        choice4: 'String',
        answer: 2,
    },
    {
        question:
            "Qual dos seguintes é um operador de concatenação de strings válido?",
        choice1: "+",
        choice2: "*",
        choice3: ">",
        choice4: ";",
        answer: 1,
    },
    {
        question: "Para que serve o operador aritmético de módulo %?",
        choice1: "Calcular porcentagens",
        choice2: "Realizar calculos aritiméticos de investimentos",
        choice3: "Retornar o módulo matemático (valor absoluto)",
        choice4: "calcular o resto de uma divisão inteira",
        answer: 4,
    },
    {
        question: "Se um profissional está criando um site em HTML e ele quiser colocar uma barra horizontal em sua página, qual tag ele deve usar?",
        choice1: "<hr/>",
        choice2: "<br/>",
        choice3: "<line><line/>",
        choice4: "<br><br/>",
        answer: 1,
    },
    {
        question: "O que significa #include<stdio.h> ?",
        choice1: "Nada",
        choice2: "Declaração de variáveis",
        choice3: "Inclusão de biblioteca",
        choice4: "Pedir prioridade na execução",
        answer: 3,
    },
    {
        question: "O que significa ‘concatenar’?",
        choice1: "Um conjunto de caracteres",
        choice2: "Configurar o tipo de uma variável",
        choice3: "Dividir duas variáveis",
        choice4: "Unir dados de modo lógico ou manter ligação ou conexão entre eles",
        answer: 4,
    },
    {
        question: "O que são arrays?",
        choice1: "São estruturas de dados homogêneas que possibilitam o armazenamento de grupos de valores do mesmo tipo, em uma única variável",
        choice2: "São variáveis específicas para armazenamento de números inteiros",
        choice3: "Trata-se de uma forma de planejamento do algoritimo",
        choice4: "São formas de estruturar ou organizar dados na memória RAM do computador, de modo que você possa utilizar estes dados de uma forma mais eficiente",
        answer: 1,
    },
    {
        question: "Onde as variáveis ficam armazenadas?",
        choice1: "No programa/software",
        choice2: "Na memória RAM",
        choice3: "No banco de dados",
        choice4: "No banco de dados, no software e na memória RAM",
        answer: 2,
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 8

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()