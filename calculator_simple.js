let currentTotal = 0;
let buffer = "0";
let operatorBuffer = null;

const buttons = document.querySelector(".buttons");
const calculatorDisplay = document.querySelector("#calculatorDisplay");
const resultDisplay = document.querySelector('#resultDisplay');

buttons.addEventListener("click", (event) => { handleButtonClick(event.target.innerHTML); } );

function handleButtonClick(buttonValue) {
    if(isNaN(parseInt(buttonValue))) {
        handleOperatorClick(buttonValue);
    }
    else {
        handleNumberClick(buttonValue);
    }

    calculatorDisplay.value = buffer;
}

function handleNumberClick(buttonValue) {
    if(buffer === "0") {
        buffer = buttonValue;
    }
    else {
        buffer += buttonValue;
    }
}

function handleOperatorClick(buttonValue) {
    console.log(buttonValue);

    switch(buttonValue) {
        case "C":
            buffer = "0";
            currentTotal = 0;
            operatorBuffer = null;
            showResult("");
            break;
        case "=":
            if(operatorBuffer === null) {
                return;
            }
            flushOperation(parseInt(buffer));
            buffer = "" + currentTotal;
            operatorBuffer = null;
            currentTotal = 0;
            break;
        case "←":
            if(buffer.length === 1) {
                buffer = "0";
            }
            else {
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;
        default:
            handleMath(buttonValue);
            break;
    }
}

function handleMath(buttonValue) {
    const internalBuffer = parseInt(buffer);

    if(currentTotal === 0) {
        currentTotal = internalBuffer;
        showResult (currentTotal + " " + buttonValue);
    }
    else {
        flushOperation(internalBuffer);
    }

    operatorBuffer = buttonValue;
    buffer = "0";
}

function flushOperation(internalBuffer) {
    if(operatorBuffer === "+") {
        currentTotal += internalBuffer;
    }
    else if(operatorBuffer === "-") {
        currentTotal -= internalBuffer;
    }
    else if(operatorBuffer === "*") {
        currentTotal *= internalBuffer;
    }
    else {
        if(internalBuffer === 0) {
            showResult("Älä laita tämmöstä.");
        }
        else {
            currentTotal /= internalBuffer;
        }
    }

    showResult(currentTotal + " " + operatorBuffer);
}

function showResult(message)
{
    resultDisplay.value = message;
}

function handleKeyPress() {
    const numberButtons = document.querySelectorAll(".number");
    const operatorButtons = document.querySelectorAll(".operator");
}