const display = document.querySelector("#display");
const btnCont = document.querySelector("#op-btns");
const body = document.querySelector("body");
let firstNumber = null, operation = null,  secondNumber = null;
let inputStream = "";
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
    secondNumber = parseFloat(inputStream);
    try{
        if(isNaN(secondNumber))
            throw "Operand Missing";
    }
    catch(error){
        if(operation === "="){
            displayResult(error);
            inputStream = firstNumber.toString();
            firstNumber = null, secondNumber=null;
            operation = null;
        }
        return;
    }
    result = operate(operation);
    displayResult(result);
    secondNumber = null;
    inputStream = firstNumber.toString();
    firstNumber = null;
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
        firstNumber = (firstNumber.toFixed(3));
    }
    return firstNumber;
}

function displayResult(value){
    display.textContent = value;
}

function setDefaultState(text){
    display.textContent = text;
    firstNumber = null;
    operation = null;
    secondNumber = null;
    inputStream = "";
}

function handleInput(btnHit){
    if(btnHit == "Delete")
        setDefaultState("0");
    else if(btnHit === "Enter"){
        if(firstNumber === null)
            displayResult("Operand Missing");
        else if(secondNumber === null && inputStream.length>=0){
            handlePreviousProcess();
            setDefaultState(inputStream);
        }
    } 
    else if(btnHit==="Backspace"){
        inputStream = inputStream.substring(0, inputStream.length-1);
        displayResult(inputStream);
    }
    else{
        if(isOperator(btnHit) && inputStream.length!=0){
            if(firstNumber === null){
                firstNumber = parseFloat(inputStream);
                inputStream = "";
                operation = btnHit;
                if(operation == "%"){
                    operate(operation);
                    displayResult(firstNumber);
                    inputStream = firstNumber.toString();
                    firstNumber = null;
                    operation = null;
                }
            }
            else if(secondNumber===null){
                handlePreviousProcess(btnHit);
            }
        }
        else if(isNumericDot(btnHit) || isOperator(btnHit)){
            if(!(inputStream.includes(".")==true && btnHit == "."))
                inputStream += btnHit;
                displayResult(inputStream);
        }
    }
}