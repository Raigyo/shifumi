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
    this.playerChoice = this.playerChoice.bind(this)
    this.symbols = ["rock", "paper", "scissors", "lizard", "spock"]
    this.state = {playerRedDisplay: this.symbols[0], playerBlueDisplay: this.symbols[0]}
  }

  playerChoice = (move) => {
        this.setState({
          playerRed: this.symbols[move],
          playerBlue: this.symbols[Math.floor(Math.random()*5)],
          winner: "",
          versus: " versus "
        })
  }

  decideWinner = () => {
    const {playerBlue, playerRed} = this.state
    this.setState({
      playerRedDisplay: this.state.playerRed,
      playerBlueDisplay: this.state.playerBlue,
      resultDisplay: this.state.playerRed + " versus " + this.state.playerBlue,
    })
    console.log("playerRed: "+playerRed);
    console.log("playerBlue: "+playerBlue);
    if (playerRed === playerBlue){
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
        symbol={this.state.playerRedDisplay}
        />
        <PlayerCard
        color="blue"
        symbol={this.state.playerBlueDisplay}
        />
      <p>Debug: {this.state.playerRed} {this.state.versus} {this.state.playerBlue}</p>
      <p>{this.state.resultDisplay}</p>
      <p>{this.state.winner}</p>
        <div className="buttonsGroup">
          <input className = "buttonsPlay" alt = "button rock" onClick={() => this.playerChoice(0)} type = "image" src = "./img/rock.png" />
          <input className = "buttonsPlay" alt = "button paper" onClick={() => this.playerChoice(1)} type = "image" src = "./img/paper.png" />
          <input className = "buttonsPlay" alt = "button scissors" onClick={() => this.playerChoice(2)} type = "image" src = "./img/scissors.png" />
          <input className = "buttonsPlay" alt = "button lizard" onClick={() => this.playerChoice(3)} type = "image" src = "./img/lizard.png" />
          <input className = "buttonsPlay" alt = "button spock" onClick={() => this.playerChoice(4)} type = "image" src = "./img/spock.png" />
        </div>
        <button onClick={this.runGame}>Run Game</button>
      </div>
    );
  }
}

export default App;
