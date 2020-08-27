import React, {useState, useEffect, useCallback, useRef} from 'react';
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import '../App.css'

export default function Rules() {

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div className="rules-container">
            <Button color="primary" onClick={toggle} style={{ marginBottom: '1rem' }}>Rules</Button>
            <Collapse isOpen={isOpen}>
            <Card>
                <CardBody className="cardBody">
                    <h2>Rules</h2>
                    <p>
                        A very famous cellular automaton is John Conway's Game of Life. This game is a class of discrete model known as a Cellular Automaton, abbreviated CA.
                    </p>
                    <p>
                        It's made up of a grid of cells (usually 2D, but can be any dimension) that follow a simple set of rules from which complex behaviors can emerge.
                    </p>
                    <p>
                        In the Game of Life, these rules examine each cell of the grid. For each cell, it counts that cell's eight neighbors (up, down, left, right, and diagonals), and then act on that result.
                    </p>
                    <div>
                        <li>Any live cell with fewer than two live neighbours dies, as if by underpopulation.</li>
                        <li>Any live cell with two or three live neighbours lives on to the next generation.</li>
                        <li>Any live cell with more than three live neighbours dies, as if by overpopulation.</li>
                        <li>Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.</li>
                    </div>
                </CardBody>
            </Card>
      </Collapse>
        </div>
    )

}
