import { WINNER_COMBOS } from "./Constants"
import Square from "./Square"

export const checkWinner = (boardToCheck) => {
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

 export const checkEndGame = (newBoard) =>{
    return newBoard.every((square) => square != null)
  }