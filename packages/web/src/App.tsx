import { useState } from 'react'
import './App.css'

function App() {
  const [message, setMessage] = useState("Hi 👋");
  const apiEndpoint = import.meta.env.VITE_APP_API_URL

  function onClickEBridge() {
    fetch(apiEndpoint + '/todo-e-bridge')
      .then((response) => response.text())
      .then(setMessage);
  }

  function onClickSQS() {
    fetch(apiEndpoint + '/todo-sqs')
      .then((response) => response.text())
      .then(setMessage);
  }

  return (
    <div className="App">
      <div className="card">
        <button onClick={onClickEBridge}>
          Message is "<i>{message}</i>"
        </button>
      </div>
      <div className="card">
        <button onClick={onClickSQS}>
          Message is "<i>{message}</i>"
        </button>
      </div>
    </div>
  );
}

export default App
