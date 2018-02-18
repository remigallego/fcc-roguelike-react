import React, { Component } from 'react';
import './App.css';
import Game from './containers/game.js'
import {createStore, combineReducers} from 'redux'


class App extends Component {
  render() {
    return (
      <div className="App">
        <Game />
      </div>
    );
  }
}

//store.dispatch({type: 'INIT_MAP', payload: initMAP()})

export default App;
