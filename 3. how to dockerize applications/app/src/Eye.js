import React from "react";
import src from "./img/eye.png";

const Eye = ({ left, top, ...props }) => {
  return <img src={src} style={{ left, top }} {...props} />;
};

export default Eye;
