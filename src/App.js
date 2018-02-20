import React, { Component } from 'react';
import './css/app.css';

import Game from './containers/game.js'
import Infos from './containers/infos.jsx'
import {createStore, combineReducers} from 'redux'
import {connect} from 'react-redux'
import updatePlayerAction from './actions/updatePlayerPosition'
import generateMapAction from './actions/generateMap'
import generateMapDebug from './actions/generateMap'

class App extends Component {
  constructor() {
    super();
    this.movePlayer = this.movePlayer.bind(this);
    this.spawnPlayer = this.spawnPlayer.bind(this)
  }

  movePlayer(e) {
    e.preventDefault();
    if(     e.key === 'z' || e.key == "ArrowUp")
    this.props.updatePlayer({command: 'update_player_up'}, this.props.mapReducer)
    else if(e.key === 's' || e.key == "ArrowDown")
    this.props.updatePlayer({command: 'update_player_down'}, this.props.mapReducer)
    else if(e.key === 'd' || e.key == "ArrowRight")
    this.props.updatePlayer({command: 'update_player_right'}, this.props.mapReducer)
    else if(e.key === 'q' || e.key == "ArrowLeft")
    this.props.updatePlayer({command: 'update_player_left'}, this.props.mapReducer)
  }

  spawnPlayer() {
    this.props.updatePlayer({command: 'update_player_init', x: 30, y: 10}, this.props.mapReducer)
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
    updatePlayer: (settings, map) => {
      dispatch(updatePlayerAction(settings, map))
    },
    generateMap:  (w, h) => {
      dispatch(generateMapAction(w, h));
    }
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(App);

// export default App;
