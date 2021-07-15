import React, { useState } from "react";
import bgImage from "../assets/bgimage.png";
import bgImageRed from "../assets/redBg.png";
import bgImageBlue from "../assets/blueBg.png";
import "./BackgroundImage.css";

const BackgroundImage = () => {
  const [bgImg] = useState(bgImage);
  return (
    <React.Fragment>
      <div className="img-container">
        <div className="target">
          <div className="original square">
            <img src={bgImg} alt="artist sit and sexy look"></img>
          </div>
        </div>
        <div className="blue square">
          <img src={bgImageBlue} alt="artist sit and sexy look"></img>
        </div>
        <div className="red square">
          <img src={bgImageRed} alt="artist sit and sexy look"></img>
        </div>
      </div>
      
    </React.Fragment>
  );
};

export default BackgroundImage;
