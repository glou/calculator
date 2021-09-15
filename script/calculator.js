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
  if (b === 0) return 'HANDLE IT';
  return a / b;
}

//Executes one of the above with 2 operands;
const operate = (a, b, operation) => {
  switch (operation) {
    case '+': return sum(a, b);
    case '-': return subtract(a, b);
    case '*': return multiply(a, b);
    case '/': return divide(a, b);
  }
}

let actualValue = null;
let operation = null;

let flag = 'number';

const holdInfo = (e) => {
  if (display.textContent === '') return;
  if (actualValue === null) {
    actualValue = +display.textContent;
    operation = e.target.value;
  } else {
    if (flag === 'equal') {
      actualValue = +display.textContent;      
      operation = e.target.value;
    } else {
      actualValue = operate(actualValue, +display.textContent, operation);
      display.textContent = actualValue;
      operation = e.target.value;
    }
    
  }
  flag = 'operation';
}


const display = document.getElementById('display');

const displayNumbers = (e) => {
  if (flag === 'operation' || flag === 'equal') {
    display.textContent = '';
    display.textContent = e.target.value;
    flag = 'number';    
  } else {
    display.textContent += e.target.value;
  } 
};

const numbersBtn = Array.from(document.getElementsByClassName('number-btn'));
numbersBtn.forEach(element => {element.addEventListener('click', displayNumbers)});

const operationsBtn = Array.from(document.getElementsByClassName('operation-btn'));
operationsBtn.forEach(element => {element.addEventListener('click', holdInfo)});

document.getElementById('clear-btn').addEventListener('click', () => {
  actualValue = null;
  operation = null;
  flag = 'number';
  display.textContent = '';
})

document.getElementById('equal-btn').addEventListener('click', () => {
  if (display.textContent === '') return;
  actualValue = operate(actualValue, +display.textContent, operation);
  display.textContent = actualValue;
  flag = 'equal';
})