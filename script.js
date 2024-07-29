const display = document.querySelector("#display");
const btnCont = document.querySelector("#op-btns");
const body = document.querySelector("body");
let firstNumber = null, operation = null,  secondNumber = null;
let inputStream = "", precedeOp = "+";
let isOperator = (op) =>{
    return (op == "+" || op=="-" || op=="/" || op=="*" || op=="%");
};
let isNumericDot = (op) =>{
    let num = +op;
    return (!isNaN(num) || op==".");
};
body.addEventListener("keydown", (event)=>{
    let btnHit = event.key;
    handleInput(btnHit);
});

btnCont.addEventListener("click", (event)=>{
    let btnHit = event.target.id;
    handleInput(btnHit);
});

function handlePreviousProcess(opNow = null){
    secondNumber = +inputStream;
    if(precedeOp == "-")
        secondNumber *= -1;
    precedeOp = "+";
    result = operate(operation);
    displayResult(result);
    secondNumber = null;
    inputStream = "";
    operation = opNow;
}

function operate(argument){
    let add = (firstNumber, secondNumber) => (firstNumber + secondNumber);
    let subtract = (firstNumber, secondNumber)=>(firstNumber-secondNumber);
    let divide = (firstNumber, secondNumber)=>{
        return (secondNumber==0) ? Infinity : firstNumber/secondNumber;
    };
    let multiply = (firstNumber, secondNumber)=> (firstNumber*secondNumber);
    let percent = (firstNumber) => (firstNumber/100);
    if(isOperator(argument)){
        if(operation == "+")
            firstNumber = add(firstNumber, secondNumber);
        else if(operation == "-")
            firstNumber = subtract(firstNumber, secondNumber);
        else if(operation == "/")
            firstNumber = divide(firstNumber, secondNumber);
        else if(operation == "*")
            firstNumber = multiply(firstNumber, secondNumber);
        else if(operation == "%")
            firstNumber = percent(firstNumber);
        if(firstNumber === Infinity){
            firstNumber = null, secondNumber = null, operation = null, inputStream = "";
            return "Division by 0 is undefined";
        }
        firstNumber = (+firstNumber.toFixed(3));
    }
    return firstNumber;
}

function displayResult(value){
    display.textContent = value;
}

function setDefaultState(){
    display.textContent = "0";
    firstNumber = null;
    operation = null;
    secondNumber = null;
    inputStream = "";
}

function handleInput(btnHit){
    if(btnHit == "Delete")
        setDefaultState();
    else if(btnHit === "Enter"){
        if(secondNumber === null && inputStream.length>0){
            handlePreviousProcess();
        }
        else if(firstNumber===null || secondNumber===null && inputStream.length==0){
            displayResult("Operand missing!");
        }
    } 
    else if(btnHit==="Backspace"){
        console.log("Here");
        inputStream = inputStream.substring(0, inputStream.length-1);
        displayResult(inputStream);
    }
    else{
        if(isOperator(btnHit)){
            if(btnHit == "-" || btnHit == "+" && inputStream.length==0){
                precedeOp = btnHit;
            }
            else if(firstNumber === null){
                firstNumber = +inputStream;
                if(precedeOp == "-"){
                    firstNumber *= -1;
                    displayResult(firstNumber);
                }
                precedeOp = "+";
                inputStream = "";
                operation = btnHit;
                if(operation == "%"){
                    operate(operation);
                    displayResult(firstNumber);
                    operation = null;
                }
            }
            else if(secondNumber===null){
                handlePreviousProcess(btnHit);
            }
        }
        else if(isNumericDot(btnHit)){
            if(!(inputStream.includes(".")==true && btnHit == "."))
                inputStream += btnHit;
                displayResult(inputStream);
        }
    }
}