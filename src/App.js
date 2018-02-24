import React, { Component } from 'react';
import './css/app.css';

import Game from './containers/game.js'
import Infos from './containers/infos.jsx'
import {connect} from 'react-redux'
import updatePlayerAction from './actions/updatePlayerPosition'
import generateMapAction from './actions/generateMap'
import generateMapDebug from './actions/generateMap'
import bonusAction from './actions/bonus.js'
import enemyAction from './actions/enemy.js'

class App extends Component {
  constructor() {
    super();
    this.movePlayer = this.movePlayer.bind(this);
    this.spawnPlayer = this.spawnPlayer.bind(this)
  }

  movePlayer(e) {
    let X = this.props.mapReducer.player.x;
    let Y = this.props.mapReducer.player.y;
    let gameMap = this.props.mapReducer.gameMap;
    e.preventDefault();
    if(     e.key === 'z' || e.key === "ArrowUp")
    {
        // If Bonus
        if(gameMap[Y-1][X] === 4)
        this.props.handleBonus()

        // If Enemy
        if(gameMap[Y-1][X] === 3)
        this.props.handleEnemy(this.props.mapReducer.level, [X,Y-1], this.props.mapReducer.enemyList);

      // Else
      this.props.updatePlayerPosition({command: 'update_player_up'}, this.props.mapReducer)
    }
    else if(e.key === 's' || e.key === "ArrowDown")
    {

        if(gameMap[Y+1][X] === 4)
        this.props.handleBonus()
      this.props.updatePlayerPosition({command: 'update_player_down'}, this.props.mapReducer)}
    else if(e.key === 'd' || e.key === "ArrowRight")
    {   if(gameMap[Y][X+1] === 4)
        this.props.handleBonus()
      this.props.updatePlayerPosition({command: 'update_player_right'}, this.props.mapReducer)}
    else if(e.key === 'q' || e.key === "ArrowLeft")
    {   if(gameMap[Y][X-1] === 4)
        this.props.handleBonus()
      this.props.updatePlayerPosition({command: 'update_player_left'}, this.props.mapReducer)}
  }

  spawnPlayer() {
    this.props.updatePlayerPosition({command: 'update_player_init', x: 30, y: 10}, this.props.mapReducer)
  }

  render() {
    return (
      <div className="App" tabIndex="0" onKeyDown={this.movePlayer}>
        <Game />
        <div className="buttons">
          <button onClick={this.spawnPlayer} >Spawn Player</button>
          <button onClick={() => {this.props.generateMap(60,60)} } >Generate Map</button>
          <button onClick={() => {generateMapDebug(60,60)} } >Generate Map Debug</button>
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
    generateMap:  (w, h) => {
      dispatch(generateMapAction(w, h));
    },
    handleBonus: () => {
      dispatch(
        bonusAction()
      );
    },
    handleEnemy: (lvl, pos, enemyList) => {
      dispatch(
        enemyAction(lvl, pos, enemyList)
      );
    },
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(App);

// export default App;
