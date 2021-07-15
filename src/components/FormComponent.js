import React, { useState, useLayoutEffect, useEffect } from "react";
import { useForm } from "../hooks/form-hook";
import Modal from "./Modal";
import Input from "../UIElements/Input";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../utils/validators";
import Button from "../UIElements/Button";
import { useHttpClient } from "../hooks/http-hook";
import { useHistory, Link } from "react-router-dom";

const FormCompo = (props) => {
  const history = useHistory();
  const { sendRequest } = useHttpClient();
  const [hasValue, setHasValue] = useState(false);
  const [ipValue, setIpValue] = useState("");
  const [size, setSize] = useState([0, 0]);
  const [gender, setGender] = useState("");
  const [acceptData, setAcceptData] = useState(true);
  const [animate, setAnimate] = useState(false);
  // Initialize state with form-hook
  const [formState, inputHandler] = useForm(
    {
      name: { value: "", isValid: false },
      email: { value: "", isValid: false },
    },
    false
  );
  //! Get window size
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    const getGender = async () => {
      let gen = await sendRequest(
        `https://api.genderize.io/?name=${
          formState.inputs.name.value.split(" ")[0]
        }`
      );
      setGender(gen.gender);
    };

    if (formState.inputs.name.value) {
      getGender();
      return () => {};
    }
  }, [formState.inputs.name.value, sendRequest]);

  useEffect(() => {
    // get IP
    let ipValues;
    const getIPAddress = async () => {
      try {
        ipValues = await sendRequest(
          `https://geolocation-db.com/json/${process.env.REACT_APP_IP_DOMAIN_KEY}`
        );
        setIpValue(ipValues);
        setHasValue(true);
      } catch (err) {
        // console.log(err);
      }
    };

    console.log(acceptData);
    if (acceptData && props.showModal) {
      getIPAddress();
    }

    return () => {
      setHasValue(false);
    };
  }, [acceptData,hasValue, props.showModal, ipValue, sendRequest]);

  const sendData = async () => {
    console.log('sendData');
    const data = {
      name: formState.inputs.name.value,
      email: formState.inputs.email.value,
      gender: gender,
      IPv4: ipValue.IPv4,
      country: ipValue.country_name,
      city: ipValue.city,
      state: ipValue.state,
      windowW: size[0],
      windowH: size[1],
    };
    if (formState.isValid && acceptData) {
      setAnimate(!animate);
      // console.log(data);

      try {
        await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/form/send`,
          "POST",
          JSON.stringify(data),
          { "Content-Type": "application/json" }
        );
        props.openCloseModal();
        history.push("/thanks");
      } catch (err) {}
    }
  };

  const AcceptData = () => {
    setAcceptData(!acceptData);
  };
  return (
    <React.Fragment>
      {/* {isLoading && <LoadingSpinner asOverlay />} */}
      <Modal
        show={props.showModal}
        closeModal={() => props.openCloseModal()}
        onClear={props.errorHandler}
        // header={"Artist"}
        footer={
          <Button
            animate={animate ? "roll-out-blurred-right" : ""}
            disabled={!formState.isValid || !acceptData}
            onClick={() => sendData()}
          >
            {" "}
            Enviar{" "}
          </Button>
        }
      >
        {animate && <div className="loading-form">Loading</div>}
        {animate && (
          <div className="cover mt-5 col-12 col-md-8 col-lg-12 mr-auto ml-auto">
            <img
              className=" fade-in-right"
              alt="Artist making music"
              src="https://res.cloudinary.com/dcvnw6hvt/image/upload/v1626381200/voga/kooky/disco-kooky_lt5x6d.jpg"
            />
          </div>
        )}
        {!animate && (
          <React.Fragment>
            <Input
              element="input"
              id="name"
              type="text"
              label="Nombre"
              validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(3)]}
              errorText="Introduce un nombre"
              onInput={inputHandler}
            />
            <Input
              element="input"
              id="email"
              type="text"
              label="Correo"
              validators={[VALIDATOR_EMAIL(), VALIDATOR_REQUIRE()]}
              errorText="Introduce un correo válido"
              onInput={inputHandler}
            />
            <div className="col-12 col-md-6 col-lg-10 d-flex">
              <input
                type="checkbox"
                defaultChecked={true}
                onChange={() => {
                  AcceptData();
                }}
              />
              <label
                style={{
                  marginLeft: "8px",
                  color: "gray",
                  opacity: "0.6",
                  fontFamily: "Arial",
                  fontSize: "0.55em",
                }}
              >
                Sí, acepto las{" "}
                <Link to="/terminosYCondiciones" target="_blank">
                  políticas de privacidad
                </Link>{" "}
                del artista y recibir noticias, contenidos,
                comunicaciones relacionados a la marca.
              </label>
            </div>
          </React.Fragment>
        )}
      </Modal>
    </React.Fragment>
  );
};

export default FormCompo;
