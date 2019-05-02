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
    this.state = {
      playerRedDisplay: this.symbols[0],
      playerBlueDisplay: this.symbols[0],
      round: 1,
      scoreRed: 0,
      scoreBlue: 0,
      resultDisplay: "",
      nextRound: false,
      nextFight: false,
      buttonsChoice: true,
    }
  }

  playerChoice = (move) => {
        this.setState({
          playerRed: this.symbols[move],
          playerBlue: this.symbols[Math.floor(Math.random()*5)],
          nextFight: true,
        })
  }

  decideWinner = () => {
    const {playerBlue, playerRed} = this.state
    this.setState({
      playerRedDisplay: this.state.playerRed,
      playerBlueDisplay: this.state.playerBlue,
      resultDisplay: this.state.playerRed + " versus " + this.state.playerBlue + " : ",
      nextFight: false,
      nextRound: true,
      buttonsChoice: false,
    })
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
          this.setState((preState) => {return {scoreRed : preState.scoreRed + 1}});
          return " red player wins ! "
        }
    this.setState((preState) => {return {scoreBlue : preState.scoreBlue + 1}});
    return " blue player wins !"
  }

  runGame = () => {
    let counter =0
    this.setState({nextFight: false, buttonsChoice: false})
    let myInterval = setInterval(() => {
      counter++

      if(counter > 10){
        clearInterval(myInterval)
        this.setState({winner: this.decideWinner()})
      }
    },100)
  }

  nextRound = () => {
    this.setState((preState) => {return {round : preState.round + 1}});
    this.setState({
      playerRedDisplay: this.symbols[0],
      playerBlueDisplay: this.symbols[0],
      nextFight: false,
      nextRound: false,
      buttonsChoice: true,
      resultDisplay: "",
      winner: "",
    })
  }

  render(){
    const nextRound = this.state.nextRound;
    const nextFight = this.state.nextFight;
    const buttonsChoice = this.state.buttonsChoice;
    let buttonNextDisplay;
    let buttonsChoiceDisplay;
    if (nextRound) {
      buttonNextDisplay = <div className="hud"><button onClick={this.nextRound}>NEXT ROUND</button></div>
    }
    if (nextFight) {
      buttonNextDisplay =  <div className="hud"><button onClick={this.runGame}>FIGHT!</button></div>
    }
    if (buttonsChoice) {
      buttonsChoiceDisplay =
      <div className="buttonsGroup" id="buttonsGroup">
          <div className="hud">Choose your weapon:</div>
          <input className = "buttonsPlay" alt = "button rock" onClick={() => this.playerChoice(0)} type = "image" src = "./img/rock.png" />
          <input className = "buttonsPlay" alt = "button paper" onClick={() => this.playerChoice(1)} type = "image" src = "./img/paper.png" />
          <input className = "buttonsPlay" alt = "button scissors" onClick={() => this.playerChoice(2)} type = "image" src = "./img/scissors.png" />
          <input className = "buttonsPlay" alt = "button lizard" onClick={() => this.playerChoice(3)} type = "image" src = "./img/lizard.png" />
          <input className = "buttonsPlay" alt = "button spock" onClick={() => this.playerChoice(4)} type = "image" src = "./img/spock.png" />
      </div>
    }
    return (
    <div id="conteneur-flexbox">
      <div className="hud" id="player-1">
        Player 1: {this.state.scoreRed}
      </div>{/*\div player-1*/}
      <div className="App" id="App">
        <div className="hud">ROUND: {this.state.round} </div>        
        <div className="sheldon"><img src="img/sheldon.gif" /></div>
        <div id="cards" className="cards">
            <PlayerCard
                color="red"
                symbol={this.state.playerRedDisplay}
                />
                <PlayerCard
                color="blue"
                symbol={this.state.playerBlueDisplay}
                />
        </div>
        <div className="hud">{this.state.resultDisplay} {this.state.winner}</div>
        {buttonsChoiceDisplay}
        {buttonNextDisplay}
      </div>{/*\div app*/}
      <div className="hud" id="player-2">
        Player 2: {this.state.scoreBlue}
      </div>{/*\div player-2*/}
    </div>//\conteneur-flexbox
      );
  }//\render
}//\class App

export default App;
