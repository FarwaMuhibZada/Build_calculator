import { UPDATE_EXPRESSION, UPDATE_ANSWER } from './actions';

const initialState = {
  expression: '',
  answer: '',
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_EXPRESSION:
      return { ...state, expression: action.payload };
    case UPDATE_ANSWER:
      return { ...state, answer: action.payload };
    default:
      return state;
  }
};

export default rootReducer;
