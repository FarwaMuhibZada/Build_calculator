import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateExpression, updateAnswer } from '../redux/actions';
import { evaluate } from 'mathjs';

const Calculator = () => {
  const dispatch = useDispatch();
  const expression = useSelector((state) => state.expression);
  const answer = useSelector((state) => state.answer);
  const [lastWasEquals, setLastWasEquals] = useState(false); // Track if last operation was "="

  const isOperator = (symbol) => /[*/+-]/.test(symbol);

  const calculate = () => {
    const trimmedExpression = expression.trim();
    if (isOperator(trimmedExpression.charAt(trimmedExpression.length - 1))) return;

    const parts = trimmedExpression.split(' ');
    const newParts = [];
    for (let i = parts.length - 1; i >= 0; i--) {
      if (['*', '/', '+'].includes(parts[i]) && isOperator(parts[i - 1])) {
        newParts.unshift(parts[i]);
        let j = 0;
        let k = i - 1;
        while (isOperator(parts[k])) {
          k--;
          j++;
        }
        i -= j;
      } else {
        newParts.unshift(parts[i]);
      }
    }
    const newExpression = newParts.join(' ');
    try {
      const result = evaluate(newExpression);
      dispatch(updateAnswer(result.toString()));
    } catch (error) {
      dispatch(updateAnswer('Error'));
    }
    dispatch(updateExpression(''));
  };

  const buttonPress = (symbol) => {
    if (symbol === 'clear') {
      dispatch(updateAnswer(''));
      dispatch(updateExpression('0'));
      setLastWasEquals(false);
    } else if (symbol === 'negative') {
      if (answer === '') return;
      dispatch(updateAnswer(answer.charAt(0) === '-' ? answer.slice(1) : `-${answer}`));
    } else if (symbol === 'percent') {
      if (answer === '') return;
      dispatch(updateAnswer((parseFloat(answer) / 100).toString()));
    } else if (isOperator(symbol)) {
      if (lastWasEquals) {
        // Start new calculation with the result of previous calculation
        dispatch(updateExpression(`${answer} ${symbol} `));
        setLastWasEquals(false);
      } else {
        dispatch(updateExpression(`${expression.trim()} ${symbol} `));
      }
    } else if (symbol === '=') {
      calculate();
      setLastWasEquals(true); // Set flag to true after "="
    } else if (symbol === '0') {
      if (expression.charAt(0) !== '0') {
        dispatch(updateExpression(`${expression}${symbol}`));
      }
    } else if (symbol === '.') {
      const lastNumber = expression.split(/[-+/*]/g).pop();
      if (!lastNumber) return;
      if (lastNumber.includes('.')) return;
      dispatch(updateExpression(`${expression}${symbol}`));
    } else {
      if (expression.charAt(0) === '0') {
        dispatch(updateExpression(`${expression.slice(1)}${symbol}`));
      } else {
        dispatch(updateExpression(`${expression}${symbol}`));
      }
    }
  };

  return (
    <div id="calculator">
      <div id="display" style={{ textAlign: 'right' }}>
        <div id="answer">{answer}</div>
        <div id="expression">{expression}</div>
      </div>
      <button
        id="clear"
        onClick={() => buttonPress('clear')}
        className="light-gray"
        type="button"
      >
        C
      </button>
      <button
        id="negative"
        onClick={() => buttonPress('negative')}
        className="light-gray"
        type="button"
      >
        +/-
      </button>
      <button
        id="percentage"
        onClick={() => buttonPress('percent')}
        className="light-gray"
        type="button"
      >
        %
      </button>
      <button
        id="divide"
        onClick={() => buttonPress('/')}
        className="yellow"
        type="button"
      >
        /
      </button>
      <button
        id="seven"
        onClick={() => buttonPress('7')}
        className="dark-gray"
        type="button"
      >
        7
      </button>
      <button
        id="eight"
        onClick={() => buttonPress('8')}
        className="dark-gray"
        type="button"
      >
        8
      </button>
      <button
        id="nine"
        onClick={() => buttonPress('9')}
        className="dark-gray"
        type="button"
      >
        9
      </button>
      <button
        id="multiply"
        onClick={() => buttonPress('*')}
        className="yellow"
        type="button"
      >
        *
      </button>
      <button
        id="four"
        onClick={() => buttonPress('4')}
        className="dark-gray"
        type="button"
      >
        4
      </button>
      <button
        id="five"
        onClick={() => buttonPress('5')}
        className="dark-gray"
        type="button"
      >
        5
      </button>
      <button
        id="six"
        onClick={() => buttonPress('6')}
        className="dark-gray"
        type="button"
      >
        6
      </button>
      <button
        id="subtract"
        onClick={() => buttonPress('-')}
        className="yellow"
        type="button"
      >
        -
      </button>
      <button
        id="one"
        onClick={() => buttonPress('1')}
        className="dark-gray"
        type="button"
      >
        1
      </button>
      <button
        id="two"
        onClick={() => buttonPress('2')}
        className="dark-gray"
        type="button"
      >
        2
      </button>
      <button
        id="three"
        onClick={() => buttonPress('3')}
        className="dark-gray"
        type="button"
      >
        3
      </button>
      <button
        id="add"
        onClick={() => buttonPress('+')}
        className="yellow"
        type="button"
      >
        +
      </button>
      <button
        id="zero"
        onClick={() => buttonPress('0')}
        className="dark-gray"
        type="button"
      >
        0
      </button>
      <button
        id="decimal"
        onClick={() => buttonPress('.')}
        className="dark-gray"
        type="button"
      >
        .
      </button>
      <button
        id="equals"
        onClick={() => buttonPress('=')}
        className="yellow"
        type="button"
      >
        =
      </button>
    </div>
  );
};

export default Calculator;
