import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import Calculator from './components/Calculator';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <div className="container">
        <h1>Calculator Application</h1>
        <Calculator />
      </div>
    </Provider>
  );
}

export default App;
