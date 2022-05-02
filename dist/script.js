const container = document.querySelector(".container");
const numberArray = [];
const numberRange = 30;
const answer = document.querySelector(".answer");
const answerArray = [];
const result = document.querySelector(".result");
const startTime = new Date();
let stopTime = startTime;
let usedTime;
const submitButton = document.querySelector("#button");
const minute = document.querySelector(".minute");
const second = document.querySelector(".second");
const formResult = document.querySelector("#formResult");
const formTime = document.querySelector("#formTime");
for (let i = 0; i < numberRange; i++) {
    const number = generateUniqueNumber(numberArray, numberRange);
    numberArray.push(number);
    const newNumberElement = document.createElement("button");
    newNumberElement.classList.add("number-buttons");
    newNumberElement.innerText = number;
    container.appendChild(newNumberElement);
}
function generateUniqueNumber(array, range) {
    const number = Math.floor(Math.random() * range) + 1;
    if (array.indexOf(number) === -1) {
        return number;
    }
    return generateUniqueNumber(array, range);
}
container.addEventListener("click", e => {
    if (e.target instanceof HTMLButtonElement) {
        if (e.target.matches(".selected")) {
            if (e.target.innerText === answerArray[answerArray.length - 1]) {
                e.target.classList.remove("selected");
                answerArray.pop();
                answer.innerText = answerArray.toString();
            }
        }
        else {
            e.target.classList.add("selected");
            //   answer.innerText = " " + answer.innerText + e.target.innerText + ","
            answerArray.push(e.target.innerText);
            answer.innerText = answerArray.toString();
        }
    }
    if (allButtonSelected()) {
        result.innerText = checkAnswer();
        stopTime = new Date();
        usedTime = ((stopTime.valueOf() - startTime.valueOf()) / 1000).toString();
        result.innerText += "You used " + usedTime + " seconds";
    }
});
function allButtonSelected() {
    const buttons = document.querySelectorAll(".number-buttons");
    return Array.from(buttons).every(button => button.matches(".selected"));
}
function checkAnswer() {
    let result = "Congratulations. ";
    for (let i of answerArray) {
        if (answerArray[parseInt(i) - 1] === i) {
        }
        else {
            result = "Oops, something's not right. ";
        }
    }
    return result;
}
submitButton.addEventListener("mouseover", () => {
    formResult.value = checkAnswer();
    formTime.value = usedTime;
});
// the following code are copied from Botpoison
var formElement = document.getElementById("form");
var buttonElement = document.getElementById("button");
formElement.addEventListener("botpoison-challenge-start", function () {
    buttonElement.setAttribute("disabled", "disabled");
});
formElement.addEventListener("botpoison-challenge-success", function () {
    buttonElement.removeAttribute("disabled");
});
formElement.addEventListener("botpoison-challenge-error", function () {
    buttonElement.removeAttribute("disabled");
});
// stopwatch
setInterval(updatetime, 1000);
function updatetime() {
    const currentTime = new Date();
    let secondString = Math.floor(((currentTime.valueOf() - startTime.valueOf()) / 1000) % 60).toString();
    secondString = ("0" + secondString).slice(-2);
    second.innerText = secondString;
    let minuteString = Math.floor(((currentTime.valueOf() - startTime.valueOf()) / 1000) / 60).toString();
    minuteString = ("0" + minuteString).slice(-2);
    minute.innerText = minuteString;
}
