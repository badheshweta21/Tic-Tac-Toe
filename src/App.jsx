
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import { useState } from "react";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./win";
import GameOver from "./components/GameOver";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],    
  [null, null, null]
]

function deriveActivePlayer(gameTurns) {
  let curPlayer = 'X';
  if(gameTurns.length>0 && gameTurns[0].player == 'X'){
    curPlayer = 'O';
  }
  return curPlayer
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  // const [hasWinner, setHasWinner] = useState(false)
  // const [activePlayer, setActivePlayer] = useState('X')
  const [player, setPlayers] = useState({X: 'Player 1', O: 'Player 2'})

  const activePlayer = deriveActivePlayer(gameTurns);

  let gameBoard = [...initialGameBoard].map(arr => [...arr]);

  for(const turn of gameTurns){
    const {square, player} = turn;
    const {row, col} = square;
    gameBoard[row][col]=player;
  }
  let winner;
  for(const combinations of WINNING_COMBINATIONS){
    const firtSquareSymbol = gameBoard[combinations[0].row][combinations[0].col];
    const second = gameBoard[combinations[1].row][combinations[1].col];
    const third = gameBoard[combinations[2].row][combinations[2].col];

    if(firtSquareSymbol && firtSquareSymbol === second && firtSquareSymbol===third){
      winner = player[firtSquareSymbol];
    }
  }

  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowI,colI){
    // setActivePlayer((curActivePlayer) => curActivePlayer === 'X' ? 'O' : 'X')
    setGameTurns(prevTurns => {
      let curPlayer = deriveActivePlayer(prevTurns);
  
      const updatedTurns = [{square: {row: rowI, col: colI}, player: curPlayer},
        ...prevTurns];
      return updatedTurns;
    })
  }

  function handleRestart() {
    setGameTurns([])
  }

  function handlePlayerNameChange(symbol, newName){
    setPlayers(prevPlayer => {
      return {
        ...prevPlayer,
        [symbol]: newName
      }
    })
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">      
          <Player initialName="Player 1" symbol="X" isActive={activePlayer === 'X'}
            onChangeName={handlePlayerNameChange}/>
          <Player initialName="Player 2" symbol="O" isActive={activePlayer === 'O'} 
          onChangeName={handlePlayerNameChange}/>
        </ol>
        {(winner || hasDraw )&& <GameOver winner={winner} onRestart={handleRestart}/>}
        <GameBoard gameBoard={gameBoard} onSelectSquare={handleSelectSquare}/>
      
      </div>
      <Log turns={gameTurns}/>
    </main>
  )
}

export default App
