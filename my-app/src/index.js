import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Lifecycle from './add';


/**
 * 
 * @param {Object} props 
 * 
 * 函数定义组件。
 * 组件内部只需要渲染数据，而不state数据。（纯展示）
 * 大白话，只用来纯展示，不对数据进行操作，就可以用无状态组件（比如下面这个Square组件）
 * 注意要传入props
 */
function Square(props) {
    return (
        <button className="square" onClick={() => props.ccc()}>
            {props.value}
        </button>
    );
}


/**
 * 类定义组件
 * 上面那种通过function创建类的形式，在性能上、以及代码量可读性方面都要
 * 优于class创建组件的这种方式。不过在功能方面两者差异也很大。
 * class创建出来的类可以对数据进行操作、以及调用life cycle hooks。
 */
class Board extends React.Component {
    /**
     * 这里将props传入了构造器，class方式创建的组件必须总是调用带有props的构造器
     */
    constructor(props) {
        super(props);
        this.state = {
            square: Array(9).fill(null),
            xIsNext: true
        }
    }

    handleClick(i) {
        let squares = this.state.square.slice();
        if (calculateWinner(this.state.square) || squares[i]) {
            return false;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        let xIsNext = !this.state.xIsNext;
        this.setState({
            square: squares,
            xIsNext: xIsNext
        })
    }

    renderSquare(i) {
        return (
            <Square
                value={this.state.square[i]}
                ccc={() => this.handleClick(i)}
            />
        )
    }

    render() {
        let status;
        let winner = calculateWinner(this.state.square);
        if (winner) {
            status = winner + 'Winner';
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }
        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}



class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                    <Lifecycle />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
                
            </div>
        );
    }
}


// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);


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