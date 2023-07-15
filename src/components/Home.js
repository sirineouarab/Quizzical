import React from "react";
import "../style.css";

function Home(props) {
  return (
    <div className="Home">
      <h1 className="title">Quizzical</h1>
      <p className="paragraph">Start a computer science quiz now !</p>
      <button className="btn" onClick={props.start}>
        Start quiz
      </button>
    </div>
  );
}

export default Home;
