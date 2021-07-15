import React from "react";
import "./Thanks.css";
import FooterCompo from "./Footer";
import Button from "../UIElements/Button";
import { Link } from "react-router-dom";

const ThanksComnpo = () => {
  return (
    <div className="thanks-bg content">
      <div className="name-brand col-12 mr-auto ml-auto fade-in-left">
        <img
          className="mt-2"
          alt="Artist on a bike"
          src="https://res.cloudinary.com/dcvnw6hvt/image/upload/v1626381372/voga/kooky/logo-kooky_nb2h1c.png"
        />
      </div>
      {/* <div className="video-box mr-auto ml-auto col-12 col-lg-4 col-md-12">
        <iframe
          width="320"
          height="315"
          src="https://www.youtube.com/embed/jSxPRIBMaKk"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div> */}
      {/* <div
        className="video mr-auto ml-auto justify-content-center"
        style={{
          position: "relative",
          paddingTop: "56.25%" 16:9 
          // paddingTop: 25,
          height: 0,
          overflow: "hidden"
        }}
      > */}
      <div 
      className="embed-responsive embed-responsive-16by9 col-xl-6 col-lg-8 col-md-6 col-10 mt-2 mr-auto ml-auto">
        <iframe
          className="embed-responsive-item video-box"
          title="Artist - Gracias"
          src="https://www.youtube.com/embed/BV9EWlc1o2A"
          // src="/media_assets/untitled_ixqzvf.mp4"
          importance="high"
          allow="autoplay"
          loading="eager"
          // allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          // allowFullScreen
        />

{/* <iframe width="560" height="315" src="https://www.youtube.com/embed/BV9EWlc1o2A" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> */}

      </div>

      <div className="ml-auto mr-auto thanks-msg col-12 mt-5">
        <h1><span className="pink-text">Gracias</span></h1>
        <span>
          ahora puedes darle click
          al botón de descarga para obtener
        </span>
        <br />
      </div>

      <div className="col-12 mt-5">
        <a
          href="https://www.youtube.com/watch?v=BV9EWlc1o2A"
          target="_blank"
          // download="Danny_Duran_ft_Alkilados_Misterio.mp3"
        >
          <Button >
              <span role="img" aria-label="tiger emoji">
                🐯{" "}
              </span>
              DESCARGAR
          </Button>
        </a>
      </div>
      <FooterCompo />
    </div>
  );
};

export default ThanksComnpo;
