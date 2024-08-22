import { useState } from "react"

export default function GameBoard({onSelectSquare, gameBoard}) {
    

    // for(const turn of turns){
    //     const {square, player} = turn;
    //     const {row, col } = square;
    //     gameBoard[row][col] = player;
    // }
    // const [gameBoard, setGameBoard] = useState(initialGameBoard)

    // function handleSelectSqaure(rowI, colI) {
    //     setGameBoard((prevGameBoard) => {
    //         const updateBoard = [...prevGameBoard.map(innerArr => [...innerArr])]
    //         updateBoard[rowI][colI] = activePlayerSymbol;
    //         return updateBoard
    //     });
    //     onSelectSquare();
    // }

    return <ol id="game-board">
        {gameBoard.map((row, rowIndex) => <li key={rowIndex}>
            <ol>
                {row.map((playerSymbol, colIndex) => 
                <li key={colIndex}>
                    <button onClick={() =>onSelectSquare(rowIndex, colIndex)} 
                        disabled={playerSymbol!== null}>
                        {playerSymbol}
                    </button>
                </li>)}
            </ol>
        </li>)}
    </ol>
}