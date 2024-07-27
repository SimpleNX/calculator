const display = document.querySelector("#display");
const btnCont = document.querySelector("#op-btns");
const body = document.querySelector("body");
let firstNumber = false, operation = "",  secondNumber = false;

body.addEventListener("keydown", (event)=>{
    let btnHit = event.key;
    if(btnHit == "AC"){
        clearDisplay();
        firstNumber = false;
        operation = false;
        secondNumber = false;
    }
    else if(btnHit == "="){
        if(!firstNumber || !secondNumber)
            displayResult("Operand missing!");
        else{
            displayResult(firstNumber);
            firstNumber = false;
            operation = false;
            secondNumber = false;
        }
    } 
    else{
        operate(btnHit);
    }
});

btnCont.addEventListener("click", (event)=>{
    let btnHit = event.target.id;
    if(btnHit == "AC"){
        clearDisplay();
        firstNumber = false;
        operation = false;
        secondNumber = false;
    }
    else if(btnHit == "="){
        displayResult(firstNumber);
        firstNumber = false;
        operation = false;
        secondNumber = false;
    } 
    else{
        operate(btnHit);
    }
});

function operate(argument){
    let add = (firstNumber, secondNumber) => (firstNumber + secondNumber);
    let subtract = (firstNumber, secondNumber)=>(firstNumber-secondNumber);
    let divide = (firstNumber, secondNumber)=>{
        return (secondNumber==0) ? "Division by 0 is not defined" : firstNumber/secondNumber;
    };
    let multiply = (firstNumber, secondNumber)=> (firstNumber*secondNumber);
    let percent = (firstNumber) => (firstNumber/100);
    if(!isNaN(+argument)){
        if(!firstNumber){
            firstNumber = +argument;
            displayResult(firstNumber);
        }
        else if(!secondNumber){
            secondNumber = +argument;
            displayResult(secondNumber);
            if(operation == "+")
                firstNumber = add(firstNumber, secondNumber);
            else if(operation == "-")
                firstNumber = subtract(firstNumber, secondNumber);
            else if(operation == "/")
                firstNumber = divide(firstNumber, secondNumber);
            else if(operation == "*")
                firstNumber = multiply(firstNumber, secondNumber);
        }
    }
    else{
        operation = argument;
        console.log(operation);
        if(operation == "%")
            firstNumber = percent(firstNumber);
    }
}

function displayResult(value){
    display.textContent = value;
}

function clearDisplay(){
    display.textContent = "";
}
