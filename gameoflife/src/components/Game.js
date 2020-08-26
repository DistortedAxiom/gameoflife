import React, {useState, useEffect, useCallback, useRef} from 'react';
import produce from "immer";
import{ Button }from 'react-bootstrap';
import '../App.css'

let boardRows = 25;
let boardCols = 25;


export default function Game() {

    const emptyGrid = (rows, col) => {

        let newRow = new Array(rows);

        for (let i = 0; i < newRow.length; i++) {
            newRow[i] = new Array(col)
        }

        for (let i = 0; i < boardRows; i++) {
            for (let x = 0; x < boardCols; x++) {
                newRow[i][x] = 0
            }
        }

        return newRow
    }

    const changedGrid = (grid, x, y) => {

        let newGrid = JSON.parse(JSON.stringify(grid));

        let value = newGrid[x][y]

        if (value === 0) {
            newGrid[x][y] = 1
        }

        if (value === 1) {
            newGrid[x][y] = 0
        }

        setIsChanged(!isChanged)

        return newGrid

    }


    const randomGrid = () => {

        let table = emptyGrid(boardRows, boardCols)

        for (let i = 0; i < boardRows; i++) {
            for (let x = 0; x < boardCols; x++) {
                table[i][x] = Math.round(Math.random(2));
            }
        }

        return table

    }

    const [grid, setGrid] = useState(() => {
        return emptyGrid(boardRows, boardCols)
    })

    const [isChanged, setIsChanged] = useState(false)

    let count = 0

    const [generation, setGeneration] = useState(count)

    const [running, setRunning] = useState(false)

    const [speed, setSpeed] = useState(25)

    const runningRef = useRef(running);
    runningRef.current = running;

    const generationRef = useRef(generation)

    const speedRef = useRef(speed)
    speedRef.current = speed

    const changeHandler = (e) => {
        setSpeed(e.target.value)
    }

    const runSimulation = useCallback(() => {
        if (!runningRef.current) {
          return;
        }

        setGrid((oldGrid) => {
            return runGame(oldGrid)
        })

        generationRef.current = generationRef.current + 1
        setGeneration(generationRef.current)

        setTimeout(runSimulation, speedRef.current);

    }, []);

    const runGame = (oldGrid) => {
        return produce(oldGrid, gridCopy => {
            for (let i = 0; i < boardRows; i++) {
            for (let k = 0; k < boardCols; k++) {
                let neighbors = getNeighbors(oldGrid, i, k)

                if(oldGrid[i][k] === 0 && neighbors === 3){
                    gridCopy[i][k] = 1
                }
                if (neighbors < 2 || neighbors > 3) {
                    gridCopy[i][k] = 0;
                }

                else if (oldGrid[i][k] === 0 && neighbors === 3) {
                    gridCopy[i][k] = 1;
                }
            }
            }
        });
    }

    const getNeighbors = (board, i, k) => {

        let neighbors = 0;

        const direction = [
            [0, 1],
            [0, -1],
            [1, -1],
            [-1, 1],
            [1, 1],
            [-1, -1],
            [1, 0],
            [-1, 0],
        ];

        direction.forEach(([x, y]) => {
            const newI = i + x;
            const newK = k + y;
            if (newI >= 0 && newI < boardRows && newK >= 0 && newK < boardCols) {
              neighbors += board[newI][newK];
            }
          });

        return neighbors;
    }

    useEffect(() => {

    }, [grid])

    console.log(count)

    return (
        <div className="game-container">
            <div>
                <div style={{
                    display: "grid",
                    backgroundColor: "white",
                    gridTemplateColumns: `repeat(${boardCols}, 20px)`
                }}>
                    {grid.map((rows, k) =>
                      rows.map((columns, e) => (
                        <div
                            key={k-e}
                            onClick={() => {
                                if (!running) {
                                    const newGrid = produce(grid, copy => {
                                        return copy
                                    })
                                    setGrid(changedGrid(newGrid, k, e))
                                }
                            }}
                            style={{
                                width: 20,
                                height: 20,
                                backgroundColor: (columns === 1) ? "black" : "white",
                                border: "solid 1px black",
                            }}
                        />
          ))
        )}
                </div>
            </div>

            <div className="menu-container">
                <div>
                    <h2>Generation</h2>
                    <h3>{generation}</h3>
                </div>
                <div className="menu-button-container">
                    <Button onClick={() => {
                        setGrid(randomGrid())
                    }}>Generate tiles</Button>
                    <Button onClick={() => {
                        setRunning(true);
                        if (!running){
                        runningRef.current = true
                        runSimulation()
                        }
                    }}>Start</Button>
                    <Button onClick={() => {
                        setRunning(false);
                    }}>Stop</Button>
                    <Button onClick={() => {
                        setGrid(emptyGrid(boardRows, boardCols))
                        setRunning(false)
                        setGeneration(generationRef.current = 0)
                    }}>Clear</Button>
                </div>
                    <div>
                        <h3>Speed</h3>
                        <div>
                        <input type="range" min={25} max={2000} name="speed" onChange={changeHandler}/>
                        <h4>{speedRef.current} ms</h4>
                        </div>
                    </div>
            </div>
        </div>
    )
}
