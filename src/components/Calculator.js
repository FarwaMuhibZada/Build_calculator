import { evaluate } from 'mathjs';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateExpression, updateAnswer } from '../redux/actions';

function Calculator() {
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
    let i = parts.length - 1;

    while (i >= 0) {
      if (['*', '/', '+'].includes(parts[i]) && isOperator(parts[i - 1])) {
        newParts.unshift(parts[i]);
        let j = i - 1; // Use 'const' instead of 'let' for 'j'
        while (j >= 0 && isOperator(parts[j])) {
          j -= 1;
        }
        i = j;
      } else {
        newParts.unshift(parts[i]);
        i -= 1;
      }
    }

    const newExpression = newParts.join(' ');
    try {
      const result = evaluate(newExpression);
      dispatch(updateAnswer(result.toString()));
    } catch {
      dispatch(updateAnswer('Error'));
    }
    dispatch(updateExpression(''));
  };

  const buttonPress = (symbol) => {
    if (symbol === 'clear') {
      dispatch(updateAnswer(''));
      dispatch(updateExpression('0'));
      setLastWasEquals(false);
      return;
    }

    if (symbol === 'negative') {
      if (answer === '') return;
      dispatch(updateAnswer(answer.charAt(0) === '-' ? answer.slice(1) : `-${answer}`));
      return;
    }

    if (symbol === 'percent') {
      if (answer === '') return;
      dispatch(updateAnswer((parseFloat(answer) / 100).toString()));
      return;
    }

    if (isOperator(symbol)) {
      if (lastWasEquals) {
        // Start new calculation with the result of previous calculation
        dispatch(updateExpression(`${answer} ${symbol} `));
        setLastWasEquals(false);
      } else {
        dispatch(updateExpression(`${expression.trim()} ${symbol} `));
      }
      return;
    }

    if (symbol === '=') {
      calculate();
      setLastWasEquals(true); // Set flag to true after "="
      return;
    }

    if (symbol === '0') {
      if (expression.charAt(0) !== '0') {
        dispatch(updateExpression(`${expression}0`));
      }
      return;
    }

    if (symbol === '.') {
      const lastNumber = expression.split(/[-+/*]/g).pop();
      if (!lastNumber || lastNumber.includes('.')) return;
      dispatch(updateExpression(`${expression}.`));
      return;
    }

    if (expression.charAt(0) === '0') {
      dispatch(updateExpression(`${expression.slice(1)}${symbol}`));
    } else {
      dispatch(updateExpression(`${expression}${symbol}`));
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
}

export default Calculator;
