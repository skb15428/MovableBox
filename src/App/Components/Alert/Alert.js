import React from "react";
import "./Alert.css";

const Alert = ({ message }) => {
  return (
    <div className="text-center">
      <div className="alert alert-danger" role="alert">
        {message}
      </div>
    </div>
  );
};

export default Alert;
