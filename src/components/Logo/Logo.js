import React from "react";
import "./Logo.css";
import brain from "./brain.png";

const Logo = () => {
  return (
    <div className="ma4 mt0 brain">
      <img style={{ paddingTop: "3px" }} src={brain} alt="brain logo" />
    </div>
  );
};

export default Logo;
