import React from "react";
import "../../styles/UI/Modal.css";

const Modal = (props) => {
  return <div className="modal">{!!props.display && props.children}</div>;
};

export default Modal;
