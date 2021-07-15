import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faYoutube,
  faSpotify,
} from "@fortawesome/free-brands-svg-icons";
import "./footer.css";

const FooterCompo = () => {
  return (
    <div className="footer-box d-flex">
      <div className="col-2"></div>
      <div className="col-2 fade-in-right">
        <a href="https://www.instagram.com/">
          <FontAwesomeIcon icon={faInstagram} />
        </a>
      </div>

      <div className="col-2 fade-in-left">
        <a href="https://www.facebook.com/">
          <FontAwesomeIcon icon={faFacebook} />
        </a>
      </div>
      <div className="col-2 fade-in-bottom">
        <a href="https://www.youtube.com/">
          <FontAwesomeIcon icon={faYoutube} />
        </a>
      </div>
      <div className="col-2 fade-in-right">
        <a href="https://open.spotify.com/">
          <FontAwesomeIcon icon={faSpotify} />
        </a>
      </div>
      <div className="col-2"></div>
    </div>
  );
};

export default FooterCompo;
