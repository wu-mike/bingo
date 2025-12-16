import { useEffect, useState } from "react";
import "./App.css";
import Board from "./components/Board";
import Selector from "./components/Selector";

function App() {
  const [show, setShow] = useState(false);
  const [showBoard, setShowBoard] = useState(false);
  const [showSelector, setShowSelector] = useState(false);

  useEffect(() => {
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    const page = params.get('page');
    if(page){
      if(page === "host") {
        setShow(true);
        setShowSelector(true);
      }else if(page ==="2025christmasbingo"){
        const url = new URL(window.location.href);
        url.searchParams.set('page', 'home');
        window.history.replaceState(null, '', url.href);
        setShow(true);
      }
    }
  }, []); 

  const clickShowBoard = () => {
    const url = new URL(window.location.href);
    url.searchParams.set('page', 'board');
    window.history.replaceState(null, '', url.href);
    setShowBoard(true);
  }

  return (
    <div className="column-center">
      {!show ? (<div className="message">
          <div className="message-text">Please rescan <br/> QR code.</div>
        </div>) : !showBoard && !showSelector ? (
        <>
          <div className="logo logo-border-animation">
            <div className="logo-text">Xmas Bingo</div>
          </div>
          <div className="buttons">
            <div>
              <button
                style={{ marginLeft: "5px" }}
                onClick={clickShowBoard}
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
