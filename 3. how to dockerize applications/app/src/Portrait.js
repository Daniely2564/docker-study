import React from "react";
import src from "./img/portrait.png";

const Main = ({ ...props }) => {
  return (
    <img src={src} style={{ width: "600px", height: "auto" }} {...props} />
  );
};

export default Main;
