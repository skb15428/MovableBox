import React, { useEffect, useRef, useState } from "react";
import Box from "./Components/Box/Box";
import "./App.css";
import Alert from "./Components/Alert/Alert";

const App = () => {
  const [isenabled, setIsEnabled] = useState(true);
  const [isAlertActive, setIsAlertActive] = useState(false);
  const [boxes, setboxes] = useState([{ id: 1 }]);
  const [alertMessage, setAlertMessage] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAlertActive(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [isAlertActive]);

  const deleteBox = (id) => {
    setboxes((preValue) => preValue.filter((box) => box.id !== id));
  };
  const addBox = () => {
    let id = 1;
    if (boxes.length) {
      id = boxes[boxes.length - 1].id + 1;
    }
    setboxes([...boxes, { id }]);
  };

  return (
    <div className="container p-3">
      {isAlertActive && <Alert message={alertMessage} />}
      <h1 className="text-center mb-2">Movable box generator</h1>
      <div className="w-75 vh-75 mx-auto">
        <div className="w-100 h-100 box-container" ref={containerRef}>
          {boxes.map((b) => {
            return (
              <Box
                id={b.id}
                key={b.id}
                onDelete={deleteBox}
                isControlsEnabled={isenabled}
                setIsAlertActive={setIsAlertActive}
                setAlertMessage={setAlertMessage}
              />
            );
          })}
        </div>
        <div className="row text-center mt-3">
          <div className="col-md-6">
            <button className="btn btn-success" onClick={addBox}>
              Add box
            </button>
          </div>
          <div className="col-md-6">
            <button
              className={`btn btn-${isenabled ? "danger" : "primary"}`}
              onClick={() => setIsEnabled(!isenabled)}
            >
              {isenabled ? "Disable Controls" : "Enable Controls"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
