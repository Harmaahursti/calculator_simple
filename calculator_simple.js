/* Calculator with basic functionalities
        - addition
        - subtraction
        - multiplication
        - division
*/

//Initializing variables
let currentTotal = 0;
let buffer = "0";
let operatorBuffer = null;

//Creating context between javascript and html
const buttons = document.querySelector(".buttons");
const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const calculatorDisplay = document.querySelector("#calculatorDisplay");
const resultDisplay = document.querySelector('#resultDisplay');

//For handling button clicks
function handleButtonClick(buttonValue) {
    //Check if the pressed button is a number or an operator
    if(isNaN(parseInt(buttonValue))) {
        handleOperatorClick(buttonValue);
    }
    else {
        handleNumberClick(buttonValue);
    }

    calculatorDisplay.value = buffer;
}

//For handling operator button actions
function handleOperatorClick(buttonValue) {
    switch(buttonValue) {
        case "C":
            //Clear and format the screens, return to the initial status
            //and initialize variables for use in a new calculation
            buffer = "0";
            currentTotal = 0;
            operatorBuffer = null;
            showResult("");
            break;
        case "=":
            //If there is no previous calculation to display the results of
            //cancel the operation and display nothing.
            if(operatorBuffer === null) {
                return;
            }
            flushOperation(parseInt(buffer));
            buffer = "" + currentTotal;
            operatorBuffer = null;
            currentTotal = 0;
            break;
        case "←":
            //Backspace deletes numbers from the main screen one at a time
            //starting from the last one
            //If there are no more numbers, display 0
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

function handleNumberClick(buttonValue) {
    // Mikäli ruudulla on vain 0, korvataan 0 syötteellä, 
    // muussa tapauksessa lisätään syötetty numero ruudulla olevan numeron perään
    if(buffer === "0") {
        buffer = buttonValue;
    }
    else {
        buffer += buttonValue;
    }
}

function handleMath(buttonValue) {
    //Parse what is displayed on the main screen of the app (a string) 
    //into a variable for calculations
    const internalBuffer = parseInt(buffer);

    //If there is no previous calculation operation in memory, store the current
    //input into memory and display it and the current operation in the results area
    if(currentTotal === 0) {
        currentTotal = internalBuffer;
        showResult (currentTotal + " " + buttonValue);
    }
    //Otherwise handle the calculation operation and display the results
    else {
        flushOperation(internalBuffer);
    }

    //Set the current operation into memory, clear the buffer and the main screen
    //for a new input
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
        //Can't divide by 0, this warning is shown if someone tries this.
        if(internalBuffer === 0) {
            showResult("Don't divide by 0");
        }
        else {
            currentTotal /= internalBuffer;
        }
    }

    //Displaying the current total and the last used operator on the result display
    showResult(currentTotal + " " + operatorBuffer);
}

//Messages and results shown on the result screen
function showResult(message)
{
    resultDisplay.value = message;
}

//Using calculator with keypresses
//TODO
function handleKeyPress() {

}

//Adding listeners
buttons.addEventListener("click", (event) => { handleButtonClick(event.target.innerHTML); } );