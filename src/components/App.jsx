//rafc (comando para que te arme la primera parte de la funcion)

import { useState } from "react";

//{key} es un identificador unico de ese elemento que renderizamos en una lista es importante que sea unico. en este caso index es unico porque los valores no van a cambiar nunca (del 0 al 8). sino habria que poner un valor unico como por ejemplo {userName}

//una prop nunca se puede mutar/modificar su valor. es una mala practica. para eso se usa sprad o rest operator. esto es igual a hacer una copia de ese prop para luego si poder modificarlo

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
//COMBINACION DE GANADOR
const WINNER_COMBOS = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  //console.log(board);
  //estado para cada turno del jugador
  const [turn, setTurn] = useState(TURNS.X);
  //estado para el ganador
  const [winner, setWinner] = useState(null)

  const checkWinner = (boardToCheck) => {
    for(const combo of WINNER_COMBOS){
        const [a,b,c] = combo
        if (
            boardToCheck[a] &&
            boardToCheck[a] === boardToCheck[b] &&
            boardToCheck[a] === boardToCheck[c]
        ) {
            return boardToCheck[a]
        }
    }
    return null
  }

  const updateBoard = (index) =>{
    //este condicional se hace para no sobreescribir las posiciones
    if(board[index] || winner)return
    //actualiza el tablero
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    //este cambia el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    //revisa si hay ganador
    const newWinner = checkWinner(newBoard)
    if(newWinner){
        setWinner(newWinner)
    }
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

      <section>
        {
            winner != null && (
                <section className="winner">
                    <div className="text">
                        <h2>
                        {
                            winner === false
                            ? 'Empate'
                            : 'Gano'
                        }</h2>

                        <header className="win">
                            {winner && <Square>{winner}</Square>}
                        </header>
                        <footer>
                            <button>Empezar de nuevo</button>
                        </footer>
                    </div>
                </section>
            )
        }
      </section>
    </main>
  );
}

export default App;
