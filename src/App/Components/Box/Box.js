import React, { useRef } from "react";
import "./Box.css";

const Box = ({
  id,
  onDelete,
  isControlsEnabled,
  setIsAlertActive,
  setAlertMessage,
}) => {
  const boxRef = useRef(null);

  const handleKeyPress = (event) => {
    if (!isControlsEnabled) {
      setAlertMessage("Please enable controls");
      setIsAlertActive(true);
      return;
    }

    const parentContainerheight = boxRef.current.offsetParent.offsetHeight;
    const parentContainerWidth = boxRef.current.offsetParent.offsetWidth;

    const rightBound = parentContainerWidth - 100;
    const bottomBound = parentContainerheight - 100;

    const leftPosition = Number(boxRef.current.style.left.split("px")[0]);
    const topPosition = Number(boxRef.current.style.top.split("px")[0]);

    let newPosition;

    if (event.key === "w" || event.key === "ArrowUp") {
      newPosition = topPosition - 1;
      if (newPosition >= 0) {
        boxRef.current.style.top = newPosition + "px";
      }
    } else if (event.key === "a" || event.key === "ArrowLeft") {
      newPosition = leftPosition - 1;
      if (newPosition >= 0) {
        boxRef.current.style.left = newPosition + "px";
      }
    } else if (event.key === "s" || event.key === "ArrowDown") {
      newPosition = topPosition + 1;
      if (newPosition <= bottomBound) {
        boxRef.current.style.top = newPosition + "px";
      }
    } else if (event.key === "d" || event.key === "ArrowRight") {
      newPosition = leftPosition + 1;
      if (newPosition <= rightBound) {
        boxRef.current.style.left = newPosition + "px";
      }
    } else if (event.key === "Delete") {
      onDelete(id);
    } else {
      setAlertMessage(
        "Please press w,a,s,d or arrows for box movement and delete for deleting selected box"
      );
      setIsAlertActive(true);
    }
  };

  const handleOnBlur = () => {
    boxRef.current.style.backgroundColor = "orange";
  };

  const handleOnClick = () => {
    boxRef.current.style.backgroundColor = "red";
  };

  return (
    <div
      id={id}
      tabIndex={0}
      ref={boxRef}
      onBlur={handleOnBlur}
      onClick={handleOnClick}
      onKeyDown={handleKeyPress}
      onKeyPressCapture={handleKeyPress}
      className="box"
      style={{ zIndex: Number(id) }}
    >
      {id}
    </div>
  );
};

export default Box;
