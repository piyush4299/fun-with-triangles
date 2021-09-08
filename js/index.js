const quizQuestions = [
    {
        question: "What is the third angle for the triangle where angle1 = 45° and angle2 = 45°?",
        options: {
            a: "45°",
            b: "90°",
            c: "60°"
        },
        correctAnswer: "b"
    },
    {
        question: "What is the third angle for the triangle where angle1 = 45° and angle2 = 45°?",
        options: {
            a: "obtuse",
            b: "acute",
            c: "right angled"
        },
        correctAnswer: "c"            
    },
    {
        question: "A triangle can have",
        options: {
            a: "one right angle",
            b: "two right angles"
        },
        correctAnswer: "a"            
    },
    {
        question: "Which of the following can form a right angled triangle?",
        options: {
            a: "14, 15, 26",
            b: "12, 16, 20"
        },
        correctAnswer: "b"            
    },
    {
        question: "Which of the following triangles are always similar?",
        options: {
            a: "Equilateral triangle",
            b: "Isosceles triangle"
        },
        correctAnswer: "a"            
    },
    {
        question: "If one angle of a triangle is obtuse, then which one of the following is the possible measure of remaining angles?",
        options: {
            a: "100°",
            b: "85°"
        },
        correctAnswer: "b"            
    },
    {
        question: "If the largest angle in a triangle is 70°, what is the least possible value of the smallest angle of the triangle?",
        options: {
            a: "30°",
            b: "10°"
        },
        correctAnswer: "a"            
    },
    {
        question: "The perimeter of scalene triangle with sides a, b, c is",
        options: {
            a: "a + b + c",
            b: "2a",
            c: "None of these"
        },
        correctAnswer: "a"            
    },
    {
        question: "A scalene triangle has ___ lines of symmetry",
        options: {
            a: "2",
            b: "0",
            c: "15"
        },
        correctAnswer: "b"            
    },
    {
        question: "There is a right triangle PQR where: angle Q = 90°; angle P = angle R. What is the measure of angles P and R?",
        options: {
            a: "85°",
            b: "65°",
            c: "45°"
        },
        correctAnswer: "c"            
    }
]

const getDOMElements = () => {
    return {
        angleOneInput: document.querySelector(".angleOneInput"),
        angleTwoInput: document.querySelector(".angleTwoInput"),
        angleThreeInput: document.querySelector(".angleThreeInput"),
        outputSection: document.querySelector(".outputSection"),
        baseInput: document.querySelector(".baseInput"),
        heightInput: document.querySelector(".heightInput"),
        hypotenuseOutput: document.querySelector(".hypotenuseOutput"),
        firstSide: document.querySelector(".firstSide"),
        secondSide: document.querySelector(".secondSide"),
        thirdSide: document.querySelector(".thirdSide"),
        areaOfTriangle: document.querySelector(".areaOfTriangle"),
        quizContainer: document.querySelector(".quiz"),
        submitBtn: document.querySelector(".submitBtn"),
        quizResult: document.querySelector(".quizResult")
    }
}

const validateTriangle = () => {
    const angleOne =  parseInt(getDOMElements().angleOneInput.value);
    const angleTwo = parseInt(getDOMElements().angleTwoInput.value);
    const angleThree = parseInt(getDOMElements().angleThreeInput.value);

    if(angleOne + angleTwo + angleThree === 180){
        getDOMElements().outputSection.innerHTML = "The triangle is possile and is valid";
        getDOMElements().outputSection.style.color = "green";
    }
    else{
        getDOMElements().outputSection.innerHTML = "The triangle is not possile";
        getDOMElements().outputSection.style.color = "red";
    }
}

const calculateHypotenuse = () => {
    const baseValue = parseFloat(getDOMElements().baseInput.value);
    const heightValue = parseFloat(getDOMElements().heightInput.value);

    const hypotenuse = Math.sqrt(Math.pow(baseValue,2) + Math.pow(heightValue,2));

    getDOMElements().hypotenuseOutput.innerHTML = "The hypotenuse is: " + hypotenuse.toString();
}

const calculateAreaOfTriangle = () => {
    const firstSide = parseFloat(getDOMElements().firstSide.value);
    const secondSide = parseFloat(getDOMElements().secondSide.value);
    const thirdSide = parseFloat(getDOMElements().thirdSide.value);

    const s = (firstSide + secondSide + thirdSide) / 2
    const area = Math.sqrt(s*(s-firstSide)*(s-secondSide)*(s-thirdSide));

    getDOMElements().areaOfTriangle.innerHTML = "The area of triangle is: " + area.toString();
}

function buildQuiz() {
    const DOMElements = getDOMElements();

    const questionsOutput = [];
    quizQuestions.forEach((currentQuestion,questionNumber) => {
        const options = [];

        for(optionLetter in currentQuestion.options){
            options.push(
                `<label>
                    <input class="optionsQuiz" type="radio" name="question${questionNumber}" value="${optionLetter}">
                    ${currentQuestion.options[optionLetter]}
                </label>`
            )
        }

        questionsOutput.push(
            `<div class="question">${currentQuestion.question}</div>
            <div class="answers">${options.join("")} </div>`
        );
    });

    getDOMElements().quizContainer.innerHTML = questionsOutput.join("");
}

window.onload = () => {
    buildQuiz();
    getDOMElements().submitBtn.addEventListener("click", showResult);
}

function showResult() {
    const answerContainers = getDOMElements().quizContainer.querySelectorAll('.answers');
    let numCorrect = 0;

    quizQuestions.forEach( (currentQuestion, questionNumber) => {
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;

        if(userAnswer === currentQuestion.correctAnswer){
        numCorrect++;
            answerContainers[questionNumber].style.color = 'lightgreen';
        }
        else{
            answerContainers[questionNumber].style.color = 'red';
        }
    });

    getDOMElements().quizResult.innerHTML = `Score: ${numCorrect} out of ${quizQuestions.length}`;
}