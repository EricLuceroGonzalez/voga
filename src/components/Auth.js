import React, { useContext } from "react";

import { AuthContext } from "../utils/auth-context";
import { useHttpClient } from "../hooks/http-hook";
import { useHistory } from "react-router-dom";
import { useForm } from "../hooks/form-hook";
import Input from "../UIElements/Input";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../utils/validators";
import LoadingSpinner from "../UIElements/LoadingSpinner";
// import ErrorModal from "../UIElements/ErrorModal";
import Card from "../UIElements/Card";
import Button from "../UIElements/Button";
import "./Auth.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";

const Auth = () => {
  const auth = useContext(AuthContext);
  // LOGIN or SIGNUP state mode
  // const [isLoginMode, setIsLoginMode] = useState(true);
  // const [loginBtnDisabled, setLoginBtnDisabled] = useState(true);
  // const [cedulaIsValid, setCedulaIsValid] = useState(false);
  // is Loading is managed by hook
  const { isLoading, sendRequest } = useHttpClient();
  const history = useHistory();
  // Initialize state with form-hook
  const [formState, inputHandler] = useForm(
    {
      name: { value: "", isValid: false },
      password: { value: "", isValid: false },
    },
    false
  );

  const authSubmitHandler = async (event) => {
    event.preventDefault();
   
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "/user/loginUser",
          "POST",
          JSON.stringify({
            name: formState.inputs.name.value,
            password: formState.inputs.password.value,
          }),
          { "Content-Type": "application/json" }
        );
        await auth.login(responseData.name, responseData.userId, responseData.token);
        history.push("/privateDataAccess");
      } catch (err) {}
    
}

  // const errorHandler = () => {
  //   clearError();
  // };
  return (
    <React.Fragment>
      {/* <ErrorModal error={error} onClear={errorHandler} /> */}
      <div className="auth-view">
        <Card className="authentication">
          {isLoading && <LoadingSpinner asOverlay />}
          <h4 className="auth-title"> INICIAR SESIÓN</h4>
          <form onSubmit={authSubmitHandler}>
            <Input
              element="input"
              id="name"
              type="text"
              label="Usuario"
              validators={[VALIDATOR_REQUIRE]}
              errorText="Este campo es obligatorio"
              onInput={inputHandler}
            ></Input>
            <Input
              element="input"
              id="password"
              type="password"
              label="Contraseña"
              validators={[VALIDATOR_MINLENGTH(6), VALIDATOR_REQUIRE()]}
              errorText="Debe tener al menos 6 caracteres."
              onInput={inputHandler}
            ></Input>
              <Button type="submit">
                INICIAR SESIÓN <FontAwesomeIcon icon={faSignInAlt} />
              </Button>
          </form>
        </Card>
      </div>
    </React.Fragment>
  );
};
export default Auth;
