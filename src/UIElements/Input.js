import React, { useReducer, useEffect } from "react";

import "./Input.css";
import { validate } from "../utils/validators";

// To feed the reducer:
const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        //   Copy old state:
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };
    case "TOUCH":
      return {
        ...state,
        isTouched: true,
      };
    default:
      return state;
  }
};

const Input = (props) => {
  // The reducer that receive state and update
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue || "",
    isTouched: false,
    isValid: props.initialValid || false,
  });

  //   Runs logic when some render changes (if props or inputState changes) this function run
  const { id, onInput } = props; // Load from props
  const { value, isValid } = inputState;

  // useEffect runs logic wnd something change
  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

  // change data handler:
  const changeHandler = (event) => {
    if (!event) {
      console.log("No Event");
    }

    if (!event.target) {
      //   Store the value and update state:
      dispatch({
        type: "CHANGE",
        val: event,
        validators: this.props.validators,
      });
    } else {
      //   Store the value and update state:
      dispatch({
        type: "CHANGE",
        val: event.target.value,
        validators: props.validators,
      });
    }
  };

  //   Touch handler to throw errors only if touch input:
  const touchHandler = () => {
    dispatch({ type: "TOUCH" });
  };

  // Create an form element (input AND textarea):
  // let element;
  var element;
  if (props.element === "input") {
    element = (
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onBlur={touchHandler}
        onChange={changeHandler}
        value={inputState.value}
      />
    );
  }
  if (props.element === "textarea") {
    element = (
      <textarea
        id={props.id}
        rows={props.rows || 3}
        placeholder={props.placeholder}
        onBlur={touchHandler}
        onChange={changeHandler}
        value={inputState.value}
      />
    );
  }
  if (props.element === "phonenumber") {
    element = (
      <span
        id={props.id}
        type={props.type}
        onBlur={touchHandler}
        onChange={changeHandler}
        value={props.value}
      >
        {" "}
        {props.theComponent}{" "}
      </span>
    );
  }
  return (
    <div
      className={`form-control ${
        !inputState.isValid && inputState.isTouched && "form-control--invalid"
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      {element}
      {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
    </div>
  );
};

export default Input;