import { UPDATE_EXPRESSION, UPDATE_ANSWER } from './actions';

const initialState = {
  expression: '',
  answer: '',
};

const rootReducer = (state, action) => {
  const currentState = state === undefined ? initialState : state;
  switch (action.type) {
    case UPDATE_EXPRESSION:
      return { ...currentState, expression: action.payload };
    case UPDATE_ANSWER:
      return { ...currentState, answer: action.payload };
    default:
      return currentState;
  }
};

export default rootReducer;
