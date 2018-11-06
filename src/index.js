
import React from "react";
import ReactDOM from "react-dom";
import "./App.css";

function Square(props){
    return (<button type = 'text' id={props.value} className="square" onClick={() => props.onClick()}>{props.value}</button>);
}


class Box extends React.Component{
    constructor(){
        super();
        this.count = 0;
        this.gameStatus = "It's X's Turn";
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: 'true',
            previous_State : []
        };
        
    }
    goBack(){
        const square_copy = this.state.previous_State;
        square_copy.pop();
        this.count --;
        if (this.count%2 ==0){
            this.gameStatus = "Its X's turn";
        } else {
            this.gameStatus = "Its O's turn";
        }
        this.setState({squares: this.state.previous_State[this.count-1],xIsNext:!this.state.xIsNext,previous_State:square_copy});
    }
    handleClick(i) {
        const squareState = this.state.squares.slice();
        const square_copy = this.state.previous_State;
        square_copy.push(squareState);
        if(this.gameStatus.split(" ")[1] ==='Won' || this.gameStatus === 'Match Drawn' || squareState[i]){
            return;
        }

        const turn = !this.state.xIsNext;
        (turn) ? squareState[i] = 'O' : squareState[i] = 'X' ;
        const winner = calculateWinner(squareState);
        (winner) ? this.gameStatus= `${winner} Won`:(squareState[i] === 'O')? this.gameStatus= `It's X's turn` :this.gameStatus= `It's O's turn`;
        this.count++;
        if(this.count == 9 && (winner === null)){
            this.gameStatus = 'Match Drawn'; 
        }
        this.setState({squares: squareState,xIsNext:turn,previous_State:square_copy});
        ReactDOM.render(<button type = 'text' onClick={() => this.goBack()}>Go Back a move</button>,document.getElementById('move-history'));
    }
    render(){
        let board =[];
        const styles = {
            width:'50%'
        }
        this.state.squares.map((element,index) =>{
            board.push( <Square style={styles} key={index} value={element} onClick={() => this.handleClick(index)}/>);
        }); 
        board.push(<div key ='game'>{this.gameStatus}</div>);
        return (board);
    }
} 

function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

ReactDOM.render(
    <Box />,
    document.getElementById('root')
);
 