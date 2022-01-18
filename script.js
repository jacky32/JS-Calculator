let displayString = "", currentNumber = "", previousNumber = "none";
const display = document.getElementById('display');

document.getElementById('main').addEventListener('click', (e)=>{
    switch(e.target.id){
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
            addNumber("*");
            break;
        case 'divide': 
            addNumber("/");
            break;
        case 'add': 
            addNumber("+");
            break;
        case 'subtract':
            addNumber("-");
            break;
        case 'reset': resetCalc(); break;
        case 'enter': operate(); break;
        case 'back': goBack(); break;
        case 'dash': console.log(","); break;
    }

});

function addNumber(number){
    display.textContent = displayString = displayString.concat(number);
    currentNumber = currentNumber.concat(number);
}

function resetCalc(){
    displayString= "";
    currentNumber="";
    previousNumber="none";
    display.textContent = "0";
}

function goBack(){
    display.textContent = displayString = displayString.slice(0,-1);
}

function operate(){
    let operatingA = displayString.split(",");
    console.log(operatingA);

}

function isNone() {
    return(previousNumber==="none");
}

function add(a,b){
    return a+b;
}

function subtract(a,b){
    return a-b;
}

function multiply(a,b){
    return a*b;
}

function divide(a,b){
    return (b==0) ? "Error" : (a/b);
}