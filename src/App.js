import React, { useState } from "react";
import Home from "./components/Home.js";
import Quiz from "./components/Quiz.js";
import "./style.css";

function App() {
  const [start, setStart] = useState(false);
  const startQuiz = () => setStart(true);
  return (
    <div className="App">
      {!start && <Home start={startQuiz} />}
      {start && <Quiz />}
    </div>
  );
}

export default App;
