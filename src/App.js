import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';

function App() {
  const [inputValue, setInputValue] = useState('');

  const echoInput = (event) => {
    setInputValue(event.target.value);
  }
  return (
    <div className="App">
      <h1>Good News App</h1>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <form>
        <label>
          Enter text:
          <input type='text' value={inputValue} onChange={echoInput} />
        </label>
      </form>
      <h2>Echo:</h2>
      <p>{inputValue}</p>
    </div>
  );
}

export default App;
