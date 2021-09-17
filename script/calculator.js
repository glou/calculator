/*  JS code for the calculator project, under The Odin Project
    Started: September, 2021.
    Ended: September, 16, 2021.
    Specification: - Basic calculator (executes the four basic operations);
                   - Has a display, a "clear" button and a backspace button, besides the buttons for the operations;
                   - Supports floating point numbers up to five decimal places;
                   - Supports keyboard;                   
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
       display.textContent = 'ERR, DESTROYING (no, but don\'t divide by 0)';
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
  if (pointBtn.disabled === true) {
    pointBtn.disabled = false;
  }
  if (firstValue === null || flag === 'equal') {
    firstValue = +display.textContent;
    operation = e.target.value;
  } else {
    secondValue = +display.textContent;
    secondValue = Math.round(operate(firstValue, secondValue, operation) * 100000) / 100000; //Executes an operation when there're 2 values, up to 5 decimal places
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


//Callbacks for the numbers buttons
const numbersBtn = Array.from(document.getElementsByClassName('number-btn'));
numbersBtn.forEach(element => {element.addEventListener('click', displayNumbers)});

//Callback for floating point
const pointBtn = document.getElementById('point');
pointBtn.addEventListener('click', () => {
  if (pointBtn.disabled === false) {
    display.textContent += '.';
    pointBtn.disabled = true;
  }

});

//Callback for the operations buttons
const operationsBtn = Array.from(document.getElementsByClassName('operation-btn'));
operationsBtn.forEach(element => {element.addEventListener('click', holdInfo)});


//Callback for clearing the display
const clearBtn = document.getElementById('clear-btn');
clearBtn.addEventListener('click', () => {
  firstValue = null;
  operation = null;
  flag = 'number';
  pointBtn.disabled = false;
  display.textContent = '';
})

//Callback for backspace button
const bkspBtn = document.getElementById('bksp-btn');
bkspBtn.addEventListener('click', () => {
  display.textContent = display.textContent.slice(0, display.textContent.length - 1)
})

//Callback for the 'equal' button
const equalBtn = document.getElementById('equal-btn');
equalBtn.addEventListener('click', () => {
  if (display.textContent === '' || operation === null) {
    return;
  } 
  secondValue = +display.textContent;
  secondValue = Math.round(operate(firstValue, secondValue, operation) * 100000) / 100000; //Executes an operation when there're 2 values, up to 5 decimal places
  if (secondValue === 'err') return;
  display.textContent = secondValue;
  firstValue = secondValue;    
  operation = null;
  flag = 'equal';
  if (display.textContent.indexOf('.') != -1) {
    pointBtn.disabled = true;
  }
})

//Keyboard support
const captureKeys = (e) => {
  switch (e.key) {
    case '0':
      numbersBtn[0].click();
      break;    
    case '1':
      numbersBtn[1].click();
      break;
    case '2':
      numbersBtn[2].click();
      break;
    case '3':
      numbersBtn[3].click();
      break;
    case '4':
      numbersBtn[4].click();
      break;
    case '5':
      numbersBtn[5].click();
      break;
    case '6':
      numbersBtn[6].click();
      break;
    case '7':
      numbersBtn[7].click();
      break;
    case '8':
      numbersBtn[8].click();
      break;
    case '9':
      numbersBtn[9].click();
      break;
    case '+':
      operationsBtn[0].click();
      break;
    case '-':
      operationsBtn[1].click();
      break;
    case '*':
      operationsBtn[2].click();
      break;
    case '/':
      operationsBtn[3].click();
      break;
    case '=':
      equalBtn.click();
      break;
    case '.':
      pointBtn.click();
      break;
    case 'Backspace':
      bkspBtn.click();
      break;
    case 'c':
    case 'C':
      clearBtn.click();
      break;
  }  
}

document.addEventListener('keydown', captureKeys);