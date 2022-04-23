import React, { useState, useLayoutEffect, useEffect } from "react";
import "./Landing.css";
import Button from "../UIElements/Button";
import FormCompo from "./FormComponent";
import MapChart from "./MapComponent";
// const FormCompo = React.lazy(() => {
// import("./FormComponent");
// });

const Landing = () => {
  const [showModal, setShowModal] = useState(false);
  const [size, setSize] = useState([0, 0]);

  const errorHandler = () => {
    setShowModal(false);
  };

  const openCloseModal = () => {
    setShowModal(!showModal);
  };
  //! Get window size
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
console.log(size);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <React.Fragment>
      <div className="total-bg">
        <div className="name-brand col-12 mr-auto ml-auto">
            <img
              className={`mt-3 ${!showModal ? 'fade-in-left' : ''}`}
              alt="Artist on a bike"
              src="https://res.cloudinary.com/dcvnw6hvt/image/upload/v1626381372/voga/kooky/logo-kooky_nb2h1c.png"
            />
        </div>
        <div className="d-flex flex-column flex-md-row flex-lg-column text-cover-div">
          {!showModal && (
            <div className="landing-text mt-3 col-12 col-md-6 col-lg-12 fade-in-right">
              <span className="text-1">Tengo una </span>
              <span className="text-2">sorpresa para ti</span>
              <span className="text-3">Suscríbete y descúbrela</span>
            </div>
          )}
          <div className="cover mt-2 col-12 col-md-6 col-lg-12">
            <img
              className=" fade-in-right"
              alt="some making music"
              src="https://res.cloudinary.com/dcvnw6hvt/image/upload/v1626381200/voga/kooky/disco-kooky_lt5x6d.jpg"
            />
          </div>
        </div>
        <div>
          <FormCompo
            showModal={showModal}
            errorHandler={errorHandler}
            openCloseModal={openCloseModal}
          />
        </div>
        {!showModal && (
          <div className="actionBtn col-12 mt-5">
            <Button
              onClick={() => {
                openCloseModal();
              }}
            >
              {/* <span role="img" aria-label="tiger emoji">
                🐯{" "}
              </span> */}
              Regístrate
            </Button>
          </div>
        )}{" "}
      </div>
    </React.Fragment>
  );
};

export default Landing;
