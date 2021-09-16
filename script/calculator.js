/*  JS code for the calculator project, under The Odin Project
    Started: September, 2021.
    Specification: - Basic calculator (executes the four basic operations);
                   - Has a display, a "clear" button, besides the buttons for the operations;
                   - Supports floating point numbers up to one decimal place (extra);
                   - Supports keyboard (extra);
                   - (TO DO);
*/

//Operations
const sum = (a, b) => {return a + b};
const subtract = (a, b) => {return a - b};
const multiply = (a, b) => {return a * b};
const divide = (a, b) => {
  if (b === 0) return 'err';
  return a / b;
}

//Executes one of the above with 2 operands;
const operate = (a, b, operation) => {
  switch (operation) {
    case '+': return sum(a, b);
    case '-': return subtract(a, b);
    case '*': return multiply(a, b);
    case '/': {
     let result = divide(a, b);
     if (result === 'err') {
       display.textContent = 'ERR, DESTROYING (no, but don\'t divide by 0)'
       firstValue = null;
       secondValue = null;
       operation = null;
       return 'err';
     }
     return result;
    }    
  }
}

//Hold inputted/displayed values and the operation chosen
//by the user
let firstValue = null;
let secondValue = null;
let operation = null;


/* This variable's purpose is to track the last input was whether
   a number or an operation, so we keep the display or we clear it
*/
let flag = 'number';

//Callback for operations buttons
const holdInfo = (e) => {
  if (display.textContent === '' || secondValue === 'err') {
    secondValue = null;
    return;
  }
  if (flag === 'operation') {
    operation = e.target.value;
    return;
  }
  if (firstValue === null || flag === 'equal') {
    firstValue = +display.textContent;
    operation = e.target.value;
  } else {
    secondValue = +display.textContent;
    secondValue = operate(firstValue, secondValue, operation); //Executes an operation when there're 2 values
    if (secondValue === 'err') return;
    display.textContent = secondValue;
    firstValue = secondValue;    
    operation = e.target.value;
  }  
  flag = 'operation';
}

//To manipulate the display
const display = document.getElementById('display');

//Callback for displaying the numbers
const displayNumbers = (e) => {  
  if (flag === 'operation' || flag === 'equal' || secondValue === 'err') {
    secondValue = null;
    display.textContent = '';
    display.textContent = e.target.value;
    flag = 'number';    
  } else {
    display.textContent += e.target.value;
  } 
};


//Callbacks for the numbers and operations buttons
const numbersBtn = Array.from(document.getElementsByClassName('number-btn'));
numbersBtn.forEach(element => {element.addEventListener('click', displayNumbers)});

const operationsBtn = Array.from(document.getElementsByClassName('operation-btn'));
operationsBtn.forEach(element => {element.addEventListener('click', holdInfo)});


//Callback for clearing the display
document.getElementById('clear-btn').addEventListener('click', () => {
  firstValue = null;
  operation = null;
  flag = 'number';
  display.textContent = '';
})

//Callback for backspace button
document.getElementById('bksp-btn').addEventListener('click', () => {
  display.textContent = display.textContent.slice(0, display.textContent.length - 1)
})

//Callback for the 'equal' button
document.getElementById('equal-btn').addEventListener('click', () => {
  if (display.textContent === '' || operation === null) {
    return;
  } 
  secondValue = +display.textContent;
  secondValue = operate(firstValue, secondValue, operation); //Executes an operation when there're 2 values
  if (secondValue === 'err') return;
  display.textContent = secondValue;
  firstValue = secondValue;    
  operation = null;
  flag = 'equal';  
})

