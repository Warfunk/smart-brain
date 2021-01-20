import React from "react";
import "./Nav.css";

const Navigation = ({ onRouteChange, isSignedIn }) => {
  if (isSignedIn === true) {
    return (
      <nav className="nav">
        <p
          onClick={() => onRouteChange("signin")}
          className="fs link dim black underline pa3 pointer"
        >
          Sign Out
        </p>
      </nav>
    );
  } else {
    return (
      <nav className="nav">
        <p
          onClick={() => onRouteChange("signin")}
          className="fs link dim black underline pa3 pointer"
        >
          Sign In
        </p>
        <p
          onClick={() => onRouteChange("register")}
          className="fs link dim black underline pa3 pointer"
        >
          Register
        </p>
      </nav>
    );
  }
};

export default Navigation;
