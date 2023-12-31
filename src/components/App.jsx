//rafc (comando para que te arme la primera parte de la funcion)
//{key} es un identificador unico de ese elemento que renderizamos en una lista es importante que sea unico. en este caso index es unico porque los valores no van a cambiar nunca (del 0 al 8). sino habria que poner un valor unico como por ejemplo {userName}

//una prop nunca se puede mutar/modificar su valor. es una mala practica. para eso se usa sprad o rest operator. esto es igual a hacer una copia de ese prop para luego si poder modificarlo

//CREO CONSTANTE PARA UN TABLERO VACIO. LA HACEMOS UNA VARIABLE DE ESTADO, YA QUE LA USAREMOS PARA QUE CADA VEZ QUE HAGAN CLICK SE RELLENE

import { useState } from "react";
import confetti from "canvas-confetti";
import Square from "./Square";
import { TURNS } from "./Constants";
import { checkWinner } from "./Logic";
import { checkEndGame } from "./Logic";
import { WinnerModal } from "./WinnerModal";

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  //console.log(board);
  //estado para cada turno del jugador
  const [turn, setTurn] = useState(TURNS.X);
  //estado para el ganador
  const [winner, setWinner] = useState(null)

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
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
        confetti()
        setWinner(newWinner)
    }else if(checkEndGame(newBoard)){
        setWinner(false)//en caso de empate
    }
  }
  return (
    //TODO-actualizar estas secciones con componentes para que quede todo mas legible
    <main className="board">
      <h1>TIC TAC TOE</h1>
      <button onClick={resetGame}>Reset del juego</button>
      <section className="game">
        {board.map((square, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {square}
            </Square>
          );
        })}
      </section>
      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>
      <WinnerModal winner={winner} resetGame={resetGame}></WinnerModal>
    </main>
  );
}

export default App;
