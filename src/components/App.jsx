//rafc (comando para que te arme la primera parte de la funcion)

import { useState } from "react";

//{key} es un identificador unico de ese elemento que renderizamos en una lista es importante que sea unico. en este caso index es unico porque los valores no van a cambiar nunca (del 0 al 8). sino habria que poner un valor unico como por ejemplo {userName}

//CREO CONSTANTE PARA UN TABLERO VACIO. LA HACEMOS UNA VARIABLE DE ESTADO, YA QUE LA USAREMOS PARA QUE CADA VEZ QUE HAGAN CLICK SE RELLENE
const TURNS = {
  X: "X",
  O: "O",
};

const Square = ({ children, isSelected, updateBoard, index }) => {
    const className = `square ${isSelected ? 'is-selected' : ''}`

    const handleClick = () => {
        updateBoard(index)
    }
  return <div onClick={handleClick} className={className}>{children}</div>;
};

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  //console.log(board);
  //estado para cada turno del jugador
  const [turn, setTurn] = useState(TURNS.X);

  const updateBoard = (index) =>{
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
  }
  return (
    <main className="board">
      <h1>TIC TAC TOE</h1>
      <section className="game">
        {board.map((_, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {board[index]}
            </Square>
          );
        })}
      </section>

      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>
    </main>
  );
}

export default App;
