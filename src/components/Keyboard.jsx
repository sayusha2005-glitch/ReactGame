
const keyboardRows = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "BACKSPACE"]
];

function Keyboard({ onKeyPress, usedKeys }) {
  return (
    <div className="keyboard">
      {keyboardRows.map((row, rowIndex) => (
        <div className="keyboard-row" key={rowIndex}>
          {row.map((key) => (
            <button
              key={key}
              className={`key ${usedKeys[key.toLowerCase()] || ""} ${
                key === "ENTER" || key === "BACKSPACE" ? "wide" : ""
              }`}
              onClick={() => onKeyPress(key)}
            >
              {key === "BACKSPACE" ? "⌫" : key}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Keyboard;
