import React, {Component} from 'react';
import './App.css';

const PlayerCard =({color, symbol})=> {
  const style ={
    backgroundColor: color,
    backgroundImage: "url(./img/" + symbol + ".png)"

  }
  return(
    <div style = {style} className="player-card">
      {/*{symbol}*/}
    </div>
  )
}

class App extends Component {
  constructor(props){
    super(props)
    this.symbols = ["rock", "paper", "scissors", "lizard", "spock"]
    this.state = {}
  }

  decideWinner = () => {
    const {playerBlue, playerRed} = this.state
    if (playerRed == playerBlue){
      return " It's a draw !"
    }
    if (
          (playerRed==="scissors" && playerBlue ==="paper")||
          (playerRed==="paper" && playerBlue ==="rock")||
          (playerRed==="rock" && playerBlue ==="lizard")||
          (playerRed==="lizard" && playerBlue ==="spock")||
          (playerRed==="spock" && playerBlue ==="scissors")||
          (playerRed==="scissors" && playerBlue ==="lizard")||
          (playerRed==="lizard" && playerBlue ==="paper")||
          (playerRed==="paper" && playerBlue ==="spock")||
          (playerRed==="spock" && playerBlue ==="rock")||
          (playerRed==="rock" && playerBlue ==="scissors")
        )
        {
          return " Red player wins ! "
        }
    return " Blue player wins !"
  }

  runGame = () => {
    let counter =0
    let myInterval = setInterval(() => {
      counter++
      this.setState({
        playerRed: this.symbols[Math.floor(Math.random()*5)],
        playerBlue: this.symbols[Math.floor(Math.random()*5)],
        winner: "",
        versus: " versus "
      })
      if(counter > 10){
        clearInterval(myInterval)
        this.setState({winner: this.decideWinner()})
      }
    },100)
  }

  render(){
    return (
      <div className="App">
        <PlayerCard
        color="red"
        symbol={this.state.playerRed}
        />
        <PlayerCard
        color="blue"
        symbol={this.state.playerBlue}
        />
        <p>{this.state.playerRed} {this.state.versus} {this.state.playerBlue}</p>
        <div className="sheldon"> </div>
        <p>{this.state.winner}</p>
        <button onClick={this.runGame}>Run Game</button>
      </div>
    );
  }
}

export default App;
