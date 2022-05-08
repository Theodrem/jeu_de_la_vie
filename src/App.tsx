import "bulma/css/bulma.min.css";
import { FC, useState, useRef, useCallback } from "react";
import useInterval from "./useInterval";

const numRows = 20;
const numCols = 20;

const positions = [
  [0, 1], // droite
  [0, -1], // gauche
  [1, -1], // haut gauche
  [-1, 1], // haut droite
  [1, 1], // haut
  [-1, -1], // bas
  [1, 0], // bas droite
  [-1, 0], // bas gauche
];

const random = (): number[][] => {
  const rows = [];
  for (let i = 0; i < numRows; i++) {
    rows.push(Array.from(Array(numCols), () => (Math.random() > 0.7 ? 1 : 0)));
  }
  return rows;
};

const App: FC = () => {
  const [grid, setGrid] = useState(() => {
    return random();
  });

  const running = useCallback((grid) => {
    let gridCopy = JSON.parse(JSON.stringify(grid));
    for (let i = 0; i < numRows; i++) {
      for (let j = 0; j < numCols; j++) {
        let neighbors = 0;

        positions.forEach(([x, y]) => {
          const newI = i + x;
          const newJ = j + y;

          if (newI >= 0 && newI < numRows && newJ >= 0 && newJ < numCols) {
            neighbors += grid[newI][newJ];
          }
        });

        if (neighbors < 2 || neighbors > 3) {
          gridCopy[i][j] = 0;
        } else if (grid[i][j] === 0 && neighbors === 3) {
          gridCopy[i][j] = 1;
        }
      }
    }

    setGrid(gridCopy);
  }, []);

  useInterval(() => {
    running(grid);
  }, 150);

  return (
    <div className="container has-text-centered py-5">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${numCols}, 20px)`,
          width: "fit-content",
          margin: "0 auto",
        }}
      >
        {grid.map((rows, i) =>
          rows.map((col, k) => (
            <div
              key={`${i}-${k}`}
              onClick={() => {
                // Deep clone grid
                let newGrid = JSON.parse(JSON.stringify(grid));
                newGrid[i][k] = grid[i][k] ? 0 : 1;
                setGrid(newGrid);
              }}
              style={{
                width: 20,
                height: 20,
                backgroundColor: grid[i][k] ? "#1CB8A9" : undefined,
              }}
            ></div>
          ))
        )}
      </div>
    </div>
  );
};

export default App;
