import { useEffect, useState } from "react";
import "./App.css";
import Board from "./components/Board";
import Selector from "./components/Selector";

function App() {
  const [showBoard, setShowBoard] = useState(false);
  const [showSelector, setShowSelector] = useState(false);

  useEffect(() => {
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    const page = params.get('page');
    if(page && page === "host"){
      setShowSelector(true);
    }
  }, []); 

  return (
    <div className="column-center">
      {!showBoard && !showSelector ? (
        <>
          <div className="logo logo-border-animation">
            <div className="logo-text">Xmas Bingo</div>
          </div>
          <div className="buttons">
            <div>
              {/* <button
                onClick={() => {
                  setShowSelector(true);
                }}
              >
                <span>Host</span>
              </button> */}
              <button
                style={{ marginLeft: "5px" }}
                onClick={() => {
                  setShowBoard(true);
                }}
              >
                <span>Play</span>
              </button>
            </div>
          </div>
        </>
      ) : showBoard ? (
        <Board />
      ) : (
        <Selector />
      )}
    </div>
  );
}

export default App;
