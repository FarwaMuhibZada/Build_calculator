export const UPDATE_EXPRESSION = 'UPDATE_EXPRESSION';
export const UPDATE_ANSWER = 'UPDATE_ANSWER';

export const updateExpression = (expression) => ({
  type: UPDATE_EXPRESSION,
  payload: expression,
});

export const updateAnswer = (answer) => ({
  type: UPDATE_ANSWER,
  payload: answer,
});
