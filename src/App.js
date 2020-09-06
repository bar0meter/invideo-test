import React, { useState } from "react";
import "./App.css";
import Modal from "./components/UI/Modal";
import Form from "./components/Form";

function App() {
  const [displayModal, setDisplay] = useState(false);

  const toggleModalHandler = () => {
    setDisplay((prev) => {
      return !prev;
    });
  };

  const doneHandler = (output) => {
    console.log(output);
  };

  return (
    <div className="App">
      <Modal display={displayModal}>
        <Form onDone={doneHandler} />
      </Modal>
      <button onClick={toggleModalHandler}>Start</button>
    </div>
  );
}

export default App;
