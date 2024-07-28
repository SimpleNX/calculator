const display = document.querySelector("#display");
const btnCont = document.querySelector("#op-btns");
const body = document.querySelector("body");
let firstNumber = null, operation = null,  secondNumber = null;

body.addEventListener("keydown", (event)=>{
    let btnHit = event.key;
    if(btnHit == "AC")
        setDefaultState();
    else if(btnHit == "="){
        if(firstNumber===null || secondNumber===null)
            displayResult("Operand missing!");
        else{
            displayResult(firstNumber);
            operation = null;
            secondNumber = null;
        }
    } 
    else{
        operate(btnHit);
    }
});

btnCont.addEventListener("click", (event)=>{
    let btnHit = event.target.id;
    if(btnHit == "AC"){
        setDefaultState();
    }
    else if(btnHit == "="){
        if(firstNumber===null || secondNumber===null)
            displayResult("Operand missing!");
        else{
            displayResult(firstNumber);
            operation = null;
            secondNumber = null;
        }
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
    let isOperator = (op) =>{
        return (op == "+" || op=="-" || op=="/" || op=="*" || op=="%");
    };
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
    else if(isOperator(argument)){
        operation = argument;
        if(operation == "%"){
            firstNumber = percent(firstNumber);
            secondNumber = 1;
        }
        else if(firstNumber && secondNumber){
            displayResult(firstNumber);
            secondNumber = null;
        }
    }
}

function displayResult(value){
    display.textContent = value;
}

function setDefaultState(){
    display.textContent = "0";
    firstNumber = null;
    operation = null;
    secondNumber = null;
}