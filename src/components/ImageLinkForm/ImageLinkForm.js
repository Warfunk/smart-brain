import React from "react";
import "./ImageLinkForm.css";

const ImageLinkForm = ({ onInputChange, onButtonClick }) => {
  return (
    <div>
      <p className="f3">
        This Magic Brain will detect faces in your pictures. Try it!
      </p>
      <div className="center">
        <div className="pa4 br3 shadow-5 center form">
          <input
            className="f4 pa2 center"
            type="text"
            onChange={onInputChange}
          />
          <button
            onClick={onButtonClick}
            className=" grow f4 link ph3 pv2 div white purp"
          >
            Detect
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForm;
