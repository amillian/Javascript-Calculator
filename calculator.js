const calculator = {
    displayValue: '0',
    firstOperand: null,
    waitingForOperand: false,
    operator: null,
  };
  

  function updateScreen() {
    const screen = document.querySelector('.screen');
    screen.value = calculator.displayValue;
  }
  
  updateScreen();

  function insertDigit(digit) {
    const { displayValue, waitingForOperand } = calculator;

    if (waitingForOperand === true) {
      calculator.displayValue = digit;
      calculator.waitingForOperand = false;
    } else {
      calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
    }
  }

  function insertDecimalt(dot) {
    // If the `displayValue` does not have a decimal point and you didn't just add an operand
    if (!calculator.displayValue.includes(dot) &&calculator.waitingForOperand != true ) {
      // add a decimal point
      calculator.displayValue += dot;
    }
  }
  function clearCalculator() {
    //clears the current entry only
    calculator.displayValue = '0';
  }

  function resetCalculator() {
    //clears the calculator entirely.
    calculator.waitingForOperand = false;
    calculator.displayValue = '0';
    calculator.operator = null;
    calculator.firstOperand = null;

  }

  function handleOperator(nextOperator) {
    const { firstOperand, displayValue, operator } = calculator
    const inputValue = parseFloat(displayValue);
    var result = 0;
  
    if (firstOperand === null) {
      calculator.firstOperand = inputValue;
    } else if (operator && calculator.waitingForOperand)  {
        calculator.operator = nextOperator;
      }
      else if (operator) {
        switch (operator){
            case "/":
                result = firstOperand / inputValue;
                break;
            case "*":
                result = firstOperand * inputValue;
                break;
            case "+":
                result = firstOperand + inputValue;
                break;
            case "-":
                result = firstOperand - inputValue;
                break;
            case "%":
                result = firstOperand % inputValue;
                break;
            case "^":
                result = Math.pow(firstOperand, inputValue);
                break;
        }
        calculator.displayValue = String(result);
        calculator.firstOperand = result;
      }
  
    calculator.waitingForOperand = true;
    calculator.operator = nextOperator;
  }

const keys = document.querySelector('.keys');
keys.addEventListener('click', (event) => {
    const target = event.target;
    if (target.classList.contains('operator')) {
        handleOperator(target.value);
        updateScreen();
    } else if (target.classList.contains('decimal')) {
        insertDecimalt(target.value);
        updateScreen();
    } else if (target.classList.contains('all-clear')) {
        resetCalculator();
        updateScreen();
    } else if (target.classList.contains('clear')) {
        clearCalculator();
        updateScreen();
    } else {  
        insertDigit(target.value);
        updateScreen();
    }
    console.log(calculator);
});