let level = 1;
let min = 0;
let sec = 0;
let timeInterval = null;
let operators = ['+', '-', '*', '/', '%'];
let fNumber;
let lNumber;
let selectedOperator;
let insertedAnswer;
let correctAnswer;
let answerData = [];
let qNumber = 0;

const selectElement = document.getElementById('level-select');
const secElement = document.getElementById('sec');
const minElement = document.getElementById('min');
const fNumberElement = document.getElementById('f-number');
const lNumberElement = document.getElementById('l-number');
const opElement = document.getElementById('op');
const answerElement = document.getElementById('answer');
const qNunmberElement = document.getElementById('qNunmber');
const cElement = document.getElementById('c');
const wElement = document.getElementById('w');
const sElement = document.getElementById('s');
const btnStartElement = document.getElementById('btn-start');
const btnSubmitElement = document.getElementById('btn-submit');
const btnSkipElement = document.getElementById('btn-skip');
const btnResetElement = document.getElementById('btn-reset');
const tBodyElement = document.getElementById('answer-body');

btnResetElement.disabled = true;
btnSubmitElement.disabled = true;
btnSkipElement.disabled = true;
selectElement.addEventListener("change", function () {
    level = parseInt(selectElement.value);
});

const start = () => {
    btnStartElement.disabled = true;
    btnSkipElement.disabled = false;
    btnResetElement.disabled = false;
    btnSubmitElement.disabled = false;
    manageTime();
}


const manageTime = () => {

    qNumber++;
    if (qNumber > 10) {
        btnSkipElement.disabled = true;
        btnResetElement.disabled = true;
        // btnSubmitElement.disabled = ;
        finalize();
        return;
    } else {

        qNunmberElement.textContent = qNumber;
        min = 0;
        sec = 0;

        generateQuestion(level);

        secElement.textContent = '00';
        minElement.textContent = '00';
        clearInterval(timeInterval);

        timeInterval = setInterval(() => {
            sec++;AS

            if (sec < 10) {
                secElement.textContent = '0' + sec;
            }
            else {
                secElement.textContent = sec + '';
            }
            if (sec == 60) {
                sec = 0;
                min++;
                minElement.textContent = '0' + min;
            }
            if (min == 2) {
                min = 0;
                skipQizz();
            }

        }, 1000);
    }


}

const generateQuestion = (selectedLevel) => {
    let maxNumber = 10

    if (selectedLevel == 2) {
        maxNumber = 50;
    } else if (selectedLevel == 3) {
        maxNumber = 100;
    }

    fNumber = Math.floor(Math.random() * maxNumber) + 1;
    lNumber = Math.floor(Math.random() * maxNumber) + 1;

    fNumberElement.textContent = fNumber;
    lNumberElement.textContent = lNumber;

    selectedOperator = operators[
        Math.floor(Math.random() * 5)
    ];

    opElement.textContent = selectedOperator;

}
const submitData = () => {
    insertedAnswer = parseFloat(answerElement.value);

    if (fNumber && lNumber && selectedOperator && (insertedAnswer || insertedAnswer == 0)) {

        switch (selectedOperator) {
            case '+': correctAnswer = fNumber + lNumber; break;
            case '-': correctAnswer = fNumber - lNumber; break;
            case '*': correctAnswer = fNumber * lNumber; break;
            case '/': correctAnswer = fNumber / lNumber; break;
            case '%': correctAnswer = fNumber % lNumber; break;
            default: alert('somthing went wromg'); return;
                break;
        }
        if (insertedAnswer == correctAnswer) {
            let obj = {
                'QNumber': 1,
                'Time': min + ':' + sec,
                'FirstNumber': fNumber,
                'LastNumber': lNumber,
                'Operator': selectedOperator,
                'UserAnswer': insertedAnswer,
                'CorrectAnswer': correctAnswer,
                'isCorrect': true,
                'isSkiped': false

            }
            answerData.push(obj);

        }
        else {
            let obj = {
                'QNumber': 1,
                'Time': min + ':' + sec,
                'FirstNumber': fNumber,
                'LastNumber': lNumber,
                'Operator': selectedOperator,
                'UserAnswer': insertedAnswer,
                'CorrectAnswer': correctAnswer,
                'isCorrect': false,
                'iskiped': false,

            }
            answerData.push(obj);
        }
        answerElement.value = '';
        manageTime();
        setStatisticsForLables();

    }

    else {
        alert('Try Again');
    }
}

const skipQizz = () => {

    if (qNumber > 10) {
        finalize();
        return;
    } else {

        let obj = {
            'QNumber': 1,
            'Time': min + ':' + sec,
            'FirstNumber': fNumber,
            'LastNumber': lNumber,
            'Operator': selectedOperator,
            'UserAnswer': '**',
            'CorrectAnswer': '**',
            'isCorrect': false,
            'isSkiped': true,

        }
        answerData.push(obj);
        answerElement.value = '';
        manageTime();
        setStatisticsForLables();
    }


}
const setStatisticsForLables = () => {

    let c = 0;
    let w = 0;
    let s = 0;

    for (let x = 0; x < answerData.length; x++) {
        let temp = answerData[x];
        if (temp.isCorrect) {
            c++;
        } else {
            w++;
        }
        if (temp.isSkiped) {
            s++;
        }
    }

    cElement.textContent = c;
    wElement.textContent = w;
    sElement.textContent = s;

}
const resetQizz = () => {

    btnSkipElement.disabled = true;
    btnResetElement.disabled = true;
    btnSubmitElement.disabled = true;

    btnStartElement.disabled = false;
    qNumber = 0;
    qNunmberElement.textContent = qNumber;
    answerData = [];
    setStatisticsForLables();
    clearInterval(timeInterval);
    minElement.textContent = '00';
    secElement.textContent = '00';
    fNumberElement.textContent = '??';
    lNumberElement.textContent = '??';
    opElement.textContent = '??';
    while (tBodyElement.firstChild) {
        tBodyElement.removeChild(tBodyElement.firstChild);
    }
    



}
const finalize = () => {
    answerData.forEach(data => {
        const row = document.createElement("tr");

        const cell1 = document.createElement("td");
        cell1.textContent = data.FirstNumber;
        row.appendChild(cell1);

        const cell2 = document.createElement("td");
        cell2.textContent = data.LastNumber;
        row.appendChild(cell2);


        const cell3 = document.createElement("td");
        cell3.textContent = data.Operator;
        row.appendChild(cell3);

        const cell4 = document.createElement("td");
        cell4.textContent = data.CorrectAnswer;
        row.appendChild(cell4);

        const cell5 = document.createElement("td");
        cell5.textContent = data.UserAnswer;
        row.appendChild(cell5);

        const cell6 = document.createElement("td");
        cell6.textContent = data.isCorrect ? "yes" : "No";
        row.appendChild(cell6);

        const cell7 = document.createElement("td");
        cell7.textContent = data.isSkiped ? "Yes" : "No";
        row.appendChild(cell7);

        const cell8 = document.createElement("td");
        cell8.textContent = data.Time;
        row.appendChild(cell8);

        tBodyElement.appendChild(row);

    });
}