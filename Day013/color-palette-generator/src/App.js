import React, { useState } from 'react';
import './App.css';

function App() {
  const [colors, setColors] = useState([]);

  const generateColors = () => {
    const newColors = Array.from({ length: 5 }, () => '#' + Math.floor(Math.random() * 16777215).toString(16));
    setColors(newColors);
  };

  return (
    <div className="App">
      <h1>Color Palette Generator</h1>
      <button onClick={generateColors}>Generate</button>
      <div className="palette">
        {colors.map((color, index) => (
          <div key={index} className="color" style={{ backgroundColor: color }}>
            <span>{color}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
