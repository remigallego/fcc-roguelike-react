import React, { Component } from 'react';
import './css/app.css';

import Game from './containers/game.js'
import Infos from './containers/infos.jsx'
import GameLog from './containers/gamelog.jsx'
import {connect} from 'react-redux'
import updatePlayerAction from './actions/updatePlayerPosition'
import generateMapAction from './actions/generateMap'
import bonusAction from './actions/bonus.js'
import enemyAction from './actions/enemy.js'


class App extends Component {
  constructor() {
    super();
    this.movePlayer = this.movePlayer.bind(this);
    this.spawnPlayer = this.spawnPlayer.bind(this)
    this.startGame = this.startGame.bind(this);


    this.log = [];
  }


  movePlayer(e) {
    let X = this.props.mapReducer.player.x;
    let Y = this.props.mapReducer.player.y;
    let gameMap = this.props.mapReducer.gameMap;
    e.preventDefault();
    if(     e.key === 'z' || e.key === "ArrowUp")   // UP
    {
    // If Bonus
    if(gameMap[Y-1][X] === 4)
    this.props.handleBonus()
    // If Enemy
    if(gameMap[Y-1][X] === 3 || gameMap[Y-1][X] === 5)
    {this.props.handleEnemy([X,Y-1]);
     }

    // Else
    this.props.updatePlayerPosition({command: 'update_player_up'}, this.props.mapReducer)
    }
    else if(e.key === 's' || e.key === "ArrowDown") // DOWN
    {
    // If Bonus
    if(gameMap[Y+1][X] === 4)
    this.props.handleBonus()
    // If Enemy
    if(gameMap[Y+1][X] === 3 || gameMap[Y+1][X] === 5)
    this.props.handleEnemy([X,Y+1]);
    // Else
    this.props.updatePlayerPosition({command: 'update_player_down'}, this.props.mapReducer)
    }
    else if(e.key === 'd' || e.key === "ArrowRight")  // RIGHT
    {
    // If Bonus
    if(gameMap[Y][X+1] === 4)
    this.props.handleBonus()
    // If Enemy
    if(gameMap[Y][X+1] === 3 || gameMap[Y][X+1] === 5)
    this.props.handleEnemy([X+1,Y]);
    // Else
    this.props.updatePlayerPosition({command: 'update_player_right'}, this.props.mapReducer)
    }
    else if(e.key === 'q' || e.key === "ArrowLeft") // LEFT
    {
    // If Bonus
    if(gameMap[Y][X-1] === 4)
    this.props.handleBonus()
    // If Enemy
    if(gameMap[Y][X-1] === 3 || gameMap[Y][X-1] === 5)
    this.props.handleEnemy([X-1,Y]);
    // Else
    this.props.updatePlayerPosition({command: 'update_player_left'}, this.props.mapReducer)
    }
  }

  spawnPlayer() {
    this.props.updatePlayerPosition({command: 'update_player_init', x: 30, y: 10}, this.props.mapReducer)
  }

  startGame(lvl) {
    console.log("StartGame in App")
    this.props.generateMap(60,60,lvl)
    this.props.updatePlayerPosition({command: 'update_player_init', x: 30, y: 10}, this.props.mapReducer)
  }

  render() {

    if(this.props.mapReducer.nextLevel)
      {
      if(this.props.mapReducer.level >= 5)
        alert("You Win The Game!");
      else
      {
        this.startGame(this.props.mapReducer.level)
        alert("Congratulations, you beat the Boss! Stage: " + this.props.mapReducer.level)
      }
      }
    if(this.props.mapReducer.player.life <= 0)
      {
        alert("You are dead. Start again from Stage 1.");
        this.startGame(1)
      }

    return (
      <div className="App" tabIndex="0" onKeyDown={this.movePlayer}>
        <Game />
        <GameLog />
        <div className="buttons">
          <button onClick={() => { this.startGame(1) }} >START</button>
        </div>
        <Infos />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    mapReducer: state.mapReducer
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    updatePlayerPosition: (settings, map) => {
      dispatch(updatePlayerAction(settings, map))
    },
    generateMap:  (w, h, lvl) => {
      dispatch(generateMapAction(w, h, lvl));
    },
    handleBonus: () => {
      dispatch(
        bonusAction()
      );
    },
    handleEnemy: (pos) => {
      dispatch(
        enemyAction(pos)
      );
    }
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(App);

// export default App;
