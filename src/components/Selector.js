import { useEffect, useState } from "react";
import { data } from "../data/index";
const emojis = [...data];

function Selector() {
  const [allEmojis, setAllEmojis] = useState(emojis);
  const [selection, setSelection] = useState("");
  const [selections, setSelections] = useState([]);
  const [spinDisabled, setSpinDisabled] = useState(false);

  const handleBeforeUnload = (event) => {
    event.preventDefault();
    event.returnValue = "";
  };

  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const spin = () => {
    if (emojis.length <= 0) {
      return;
    }

    setSpinDisabled(true);

    let then = Date.now();

    function animate() {
      let index = Math.round(Math.random() * (allEmojis.length - 1));
      const currentSelection = allEmojis[index];
      setSelection(currentSelection);
      if (Date.now() - then > 500 || emojis.length <= 1) {
        setSelections((preState) => [...preState, currentSelection]);
        setAllEmojis(allEmojis.filter((item) => item !== currentSelection));
        setSpinDisabled(false);
      } else {
        window.requestAnimationFrame(animate);
      }
    }

    window.requestAnimationFrame(animate);
  };

  return (
    <>
      <div id="board" className="board">
        <div className="host emoji-container">
          {selection !== "" ? <p className="emoji">{selection}</p> : <div className="emoji">&nbsp;</div>}
        </div>
        <button className="spin-button" onClick={spin} disabled={spinDisabled}>
          <span>Spin</span>
        </button>
      </div>
      <div className="selections">
        {selections.length > 0 ? (
          selections.map((selected) => (
            <div className="emoji-selection-container" key={selected}>
              <p className="emoji-selection">{selected}</p>
            </div>
          ))
        ) : (
          <div className="emoji-selection-container">
            <div className="emoji-selection blank">&nbsp;</div>
          </div>
        )}
      </div>
    </>
  );
}

export default Selector;
