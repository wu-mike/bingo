import { useEffect, useState } from "react";
import { data } from "../data/index";
const emojis = [...data];
const findBingo = (m) => {
  let selected = 0;

  for (let i = 0; i < 5; ++i) {
    selected = 0;
    for (let j = 0; j < 5; ++j) {
      let element = m[i][j];
      if (element.selected) {
        selected += 1;
      }
    }
    if (selected === 5) {
      return true;
    }
  }

  for (let i = 0; i < 5; ++i) {
    selected = 0;
    for (let j = 0; j < 5; ++j) {
      let element = m[j][i];
      if (element.selected) {
        selected += 1;
      }
    }
    if (selected === 5) {
      return true;
    }
  }

  selected = 0;
  for (let j = 0; j < 5; ++j) {
    let element = m[j][j];
    if (element.selected) {
      selected += 1;
    }
  }
  if (selected === 5) {
    return true;
  }

  selected = 0;
  for (let j = 0; j < 5; ++j) {
    let element = m[j][4 - j];
    if (element.selected) {
      selected += 1;
    }
  }
  if (selected === 5) {
    return true;
  }

  return false;
};

function Board() {
  const [matrix, setMatrix] = useState([]);
  const [showMessage, setShowMessage] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      // For legacy support
      e.returnValue = ''; 
      return '';
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    let selection = [...emojis];
    let column = [];
    for (let i = 0; i < 5; ++i) {
      let row = [];
      for (let j = 0; j < 5; ++j) {
        let index = Math.round(Math.random() * (selection.length - 1));
        let emoji = selection[index];
        selection.splice(index, 1);
        row.push({ emoji: emoji, selected: false });
      }
      column.push(row);
    }
    setMatrix(column);
  }, []);

  const selectEmoji = (ii, jj) => {
    const newMatrix = matrix.map((row, i) => {
      if (i === ii) {
        const selectedRow = row.map((item, j) => {
          if (j === jj) {
            return { ...item, selected: !item.selected };
          }
          return item;
        });
        return selectedRow;
      }
      return row;
    });
    setMatrix(newMatrix);
    if (findBingo(newMatrix)) {
      setShowMessage(true);
    }
  };

  return loading ? (
    <span className="loader"></span>
  ) : (
    <>
      <div id="board" className="board">
        {matrix.map((row, ii) => (
          <div className="row" key={ii}>
            {row.map((item, jj) => (
              <div
                className="emoji-container"
                key={`${ii}-${jj}`}
                onClick={() => {
                  selectEmoji(ii, jj);
                }}
              >
                <p id={`${ii}-${jj}`} className={`emoji ${item.selected && "emoji-spin"}`}>
                  {item.emoji}
                </p>
                {item.selected && <div className="dot">&nbsp;</div>}
              </div>
            ))}
          </div>
        ))}
      </div>
      {showMessage && (
        <div onClick={() => setShowMessage(false)} className="message">
          <div className="message-text">BINGO!</div>
        </div>
      )}
    </>
  );
}

export default Board;
