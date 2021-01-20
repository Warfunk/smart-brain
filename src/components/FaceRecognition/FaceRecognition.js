import React from "react";
import "./FaceRecognition.css";

const FaceRecognition = (props) => {
  const { imgUrl, box } = props;
  const boxes = box.map((b) => (
    <div
      className="bounding-box"
      style={{
        top: b.topRow,
        right: b.rightCol,
        bottom: b.bottomRow,
        left: b.leftCol,
      }}
    ></div>
  ));

  return (
    <div className="center ma">
      <div className="absolute mt2">
        <img
          id="inputImage"
          alt="Enter proper jpg url please..."
          className="face-img"
          src={imgUrl}
        />
        {boxes}
      </div>
    </div>
  );
};

export default FaceRecognition;
