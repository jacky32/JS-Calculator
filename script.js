let displayString = "", previousNumber = "none", currentNumber = "";
const display = document.getElementById('display');

document.addEventListener('keydown', (e) => {
    if(!isNaN(Number(e.key))) addNumber(Number(e.key));
    else if(e.key == "*") pressKey("multiply");
    else if(e.key == "/") pressKey("divide");
    else if(e.key == "+") pressKey("add");
    else if(e.key == "-") pressKey("subtract");
    else if(e.key == ".") addDash();
    else if(e.key == "Backspace") goBack();
    else if(e.key == "Enter") operate();
});

document.getElementById('main').addEventListener('click', (e) => pressKey(e.target.id));

function pressKey(e){
    switch(e){
        case 'zero': 
            addNumber(0);
            break;
        case 'one': 
            addNumber(1);
            break;
        case 'two': 
            addNumber(2);
            break;
        case 'three': 
            addNumber(3); 
            break;
        case 'four': 
            addNumber(4);
            break;
        case 'five': 
            addNumber(5);
            break;
        case 'six': 
            addNumber(6);
            break;
        case 'seven': 
            addNumber(7);
            break;
        case 'eight': 
            addNumber(8);
            break;
        case 'nine': 
            addNumber(9);
            break;
        case 'multiply': 
            addOperator(" * ");
            break;
        case 'divide': 
            addOperator(" / ");
            break;
        case 'add': 
            addOperator(" + ");
            break;
        case 'subtract':
            addOperator(" - ");
            break;
        case 'reset': resetCalc(); break;
        case 'enter': operate(); break;
        case 'back': goBack(); break;
        case 'dash': addDash(); break;
    }
}
function addNumber(number){
    display.textContent = displayString = displayString.concat(number);
    previousNumber = "exists";
}

function addOperator(operator){
    if(isNone()) {
        if(operator == " - "){
            display.textContent = displayString = "-";
            previousNumber = "exists";
            currentNumber = "";
        }
    }
    else {
        if(displayString.endsWith(' ') || displayString.endsWith('-')){
            console.log("Double operator");
        }
        else {
            display.textContent = displayString = displayString.concat(operator);
            currentNumber = "";
        }
    }
}

function addDash(){
    if(!currentNumber.includes(".")){
        if (displayString.endsWith(" ")){
            display.textContent = displayString = displayString.concat('0.');
        }
        else if(isNone()){
            display.textContent = displayString = displayString.concat('0.');
        }
        else if(!displayString.endsWith(" ")){
            display.textContent = displayString = displayString.concat('.');
        }
        currentNumber = currentNumber.concat(".");
    }
}

function resetCalc(){
    displayString="";
    currentNumber="";
    previousNumber="none";
    display.textContent = "0";
}

function goBack(){
    display.textContent = displayString = displayString.slice(0,-1);
    if(displayString.length==0){
        resetCalc();
    }
}

function operate(){
    if(displayString.endsWith(" ")){
        displayString = displayString.slice(0,displayString.length-3);
    }
    let operatingA = displayString.split(" ");
    console.log(operatingA);
    while(operatingA.length!=1){
        if(operatingA.includes('*')){
            if(operatingA.includes('/')){
                if(operatingA.indexOf("*") < operatingA.indexOf('/')){
                    const multiplier = operatingA.indexOf('*');
                    operatingA[multiplier] = multiply(operatingA[multiplier-1],operatingA[multiplier+1]);
                    operatingA.splice(multiplier+1, 1);
                    operatingA.splice(multiplier-1, 1);
                }
                else {
                    const divider = operatingA.indexOf('/');
                    operatingA[divider] = divide(operatingA[divider-1],operatingA[divider+1]);
                    operatingA.splice(divider+1, 1);
                    operatingA.splice(divider-1, 1);
                }
            }
            else {
                const multiplier = operatingA.indexOf('*');
                operatingA[multiplier] = multiply(operatingA[multiplier-1],operatingA[multiplier+1]);
                operatingA.splice(multiplier+1, 1);
                operatingA.splice(multiplier-1, 1);
            }
        }
        else if(operatingA.includes('/')){
            const divider = operatingA.indexOf('/');
            operatingA[divider] = divide(operatingA[divider-1],operatingA[divider+1]);
            operatingA.splice(divider+1, 1);
            operatingA.splice(divider-1, 1);
        }
        else if(operatingA.includes('+')){
            const adder = operatingA.indexOf('+');
            operatingA[adder] = add(operatingA[adder-1],operatingA[adder+1]);
            operatingA.splice(adder+1, 1);
            operatingA.splice(adder-1, 1);
        }
        else if(operatingA.includes('-')){
            const subtractor = operatingA.indexOf('-');
            operatingA[subtractor] = subtract(operatingA[subtractor-1],operatingA[subtractor+1]);
            operatingA.splice(subtractor+1, 1);
            operatingA.splice(subtractor-1, 1);
        }
    }
    if(`${operatingA[0]}`.includes(".")){
        operatingA[0] = operatingA[0]*100000;
        operatingA[0] = Math.round(operatingA[0])/100000;
    }
    display.textContent = displayString = currentNumber = `${operatingA[0]}`;
}

function isNone() {
    return(previousNumber==="none");
}

function add(a,b){
    return Number(a)+Number(b);
}

function subtract(a,b){
    return Number(a)-Number(b);
}

function multiply(a,b){
    return Number(a)*Number(b);
}

function divide(a,b){
    return (Number(b)==0) ? "Error" : (Number(a)/Number(b));
}