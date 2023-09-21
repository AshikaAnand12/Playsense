import React from 'react'
import { useState, useEffect } from 'react'

const Squares = () => {

    const [state,setState] = useState([['.', '.', '.'], ['.', '.', '.'], ['.', '.', '.']])
    const [player,setPlayer] = useState('X')
    const [winner,setWinner] = useState(false)
    const [draw,setDraw] = useState(false)

    useEffect(()=>{
        // console.log(state)
    },[state])

    const checkDraw =(boardState)=>{
        let full = true
        for(let i=0;i<3;i++){
            for(let j=2;j<3;j++){
                if(boardState[i][j]==='.'){
                    full = false
                }
            }
        }
        if(full){
            setDraw(true)
        }
    }

    const checkWinner =(boardState)=>{
        let flag = false
        
        //check rows
        for(let i=0;i<3;i++){
            if(boardState[i][0] === boardState[i][1] && boardState[i][1] === boardState[i][2] && boardState[i][0] !== '.'){
                flag = true
            }
        }
        //check cols
        for(let i=0;i<3;i++){
            if(boardState[0][i] === boardState[1][i] && boardState[1][i] === boardState[2][i] && boardState[0][i] !== '.'){
                flag = true
            }
        }
        //check diagonals
        if(boardState[0][0] === boardState[1][1] && boardState[1][1] === boardState[2][2] && boardState[0][0] !== '.'){
            flag = true
        }
        if(boardState[0][2] === boardState[1][1] && boardState[1][1] === boardState[2][0] && boardState[0][2] !== '.'){
            flag = true
        }
        
        if(flag){
            setWinner(true)
        }
        console.log(flag)
    }
    const clickHandler =(rowi,coli)=>{
        let newState = [...state]
        if(newState[rowi][coli] !== '.') return
        newState[rowi][coli] = player
        setState(newState)
        checkWinner(newState)
        checkDraw(newState)
        setPlayer(player==='X'?'O':'X')
    }

    return(
        <>
        {   state.map((row, rowi)=>{
            return (
                <>
                {  row.map((col, coli)=>{
                return <button key={coli} onClick={()=>clickHandler(rowi,coli)}>
                    {col}
                </button>
            })}<br/>
            </>)
            
        })}
        <button onClick= {()=>setState([['.', '.', '.'], ['.', '.', '.'], ['.', '.', '.']])}>Reset</button>
        {winner && <h3>{player==='X'?'O':'X'} won!</h3>}
        {draw && <h3>Draw!</h3>}
        </>
    )
}

const TicTacToe = () => {

    return (
        <div>
        <h1>Tic Tac Toe</h1>
        <Squares />
        </div>
    )
}

export default TicTacToe