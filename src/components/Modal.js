import React from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";

import Backdrop from "../UIElements/Backdrop";
import "./Modal.css";

// Two components on this file (for internal use):
const ModalOverlay = (props) => {
  const content = (
    <div className={`text-focus-in mymodal ${props.className}`} style={props.style}>
      <header
        className={`modal__header ${props.headerClass} d-flex justify-content-between`}
      >
        <div>
          <img
            style={{ maxWidth: "170px" }}
            alt='Artist logo'
            className="mt-3 image-model"
            src="https://res.cloudinary.com/dcvnw6hvt/image/upload/v1626381372/voga/kooky/logo-kooky_nb2h1c.png"
          />
        </div>
        <div
          className="modal__closer"
          onClick={() => {
            props.closeModal();
          }}
        >
          x
        </div>
      </header>
      <form
        //   Submit: check if submitted on (from props) or preventDefault to not reload page on filling form
        onSubmit={
          props.onSubmit ? props.onSubmit : (event) => event.preventDefault()
        }
      >
        <div className={`modal__content ${props.contentClass}`}>
          {props.children}
        </div>
        <footer className={`modal__footer ${props.footerClass}`}>
          {props.footer}
        </footer>
      </form>
    </div>
  );
  return ReactDOM.createPortal(content, document.getElementById("modal-hook"));
};

const Modal = (props) => {
  return (
    <React.Fragment>
      {props.show && <Backdrop onClick={props.onCancel} />}
      <CSSTransition
        in={props.show}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames="modal"
      >
        <ModalOverlay {...props} />
      </CSSTransition>
    </React.Fragment>
  );
};

export default Modal;
