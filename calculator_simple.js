/*  Taskulaskin 
    Perustoiminnallisuudet:
        - yhteenlasku
        - vähennyslasku
        - kertolasku
        - jakolasku
*/

//muuttujien alustus
let currentTotal = 0;
let buffer = "0";
let operatorBuffer = null;

//kontekstin luominen HTML:n ja javascriptin välille
const buttons = document.querySelector(".buttons");
const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const calculatorDisplay = document.querySelector("#calculatorDisplay");
const resultDisplay = document.querySelector('#resultDisplay');

//Käsitellään mitä tapahtuu, kun painetaan jotain nappia
function handleButtonClick(buttonValue) {
    //Tarkistetaan onko painettu nappi numero- vai jokin muu
    if(isNaN(parseInt(buttonValue))) {
        handleOperatorClick(buttonValue);
    }
    else {
        handleNumberClick(buttonValue);
    }

    calculatorDisplay.value = buffer;
}

//Operaattorien (C(lear), +, -, *, /, backspace) toiminnot
function handleOperatorClick(buttonValue) {
    switch(buttonValue) {
        case "C":
            //Alustetaan muuttujat, tyhjennetään ruudut, palataan alkutilaan
            buffer = "0";
            currentTotal = 0;
            operatorBuffer = null;
            showResult("");
            break;
        case "=":
            //Jos ei ole laskutoimitusta, jota näyttää, keskeytetään eikä näytetä mitään
            if(operatorBuffer === null) {
                return;
            }
            flushOperation(parseInt(buffer));
            buffer = "" + currentTotal;
            operatorBuffer = null;
            currentTotal = 0;
            break;
        case "←":
            //Poistetaan numerot näytöltä yksi kerrallaan, jos ruudulla vain yksi numero, laitetaan näkyviin 0
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
    const internalBuffer = parseInt(buffer);

    if(currentTotal === 0) {
        currentTotal = internalBuffer;
        //Näytetään tulosnäytössä syötetty luku ja toimenpide
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
        //Koska 0 ei saa jakaa, näytetään ruudulla varoitus jos tätä yritetään
        if(internalBuffer === 0) {
            showResult("Älä laita tämmöstä.");
        }
        else {
            currentTotal /= internalBuffer;
        }
    }

    //Näytetään tulosnäytössä tulos ja viimeiseksi suoritetty operaatio
    showResult(currentTotal + " " + operatorBuffer);
}

//Tulosnäytöllä näytettävät asiat/viestit
function showResult(message)
{
    resultDisplay.value = message;
}

//Laskimen käyttäminen näppäimistöllä
function handleKeyPress() {

}

//Listenerien lisääminen
buttons.addEventListener("click", (event) => { handleButtonClick(event.target.innerHTML); } );