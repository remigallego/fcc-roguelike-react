import React, { Component } from 'react';
import '../css/grid.css'
import {connect} from 'react-redux'
import initTestMapAction from '../actions/initMap.js'
import Tile from './tile.js'
import bonusAction from '../actions/bonus.js'

class Game extends Component {
  constructor(props) {
    super(props)
  this.renderMap = this.renderMap.bind(this)

  }

  renderMap(gameMap) {

    if(gameMap !== null)
    {
      return gameMap.map((array, x)=>{
        return array.map((tile, y) => {
          let id = x + "_" + y;
          switch(tile)
          {
            case 0: {return (<Tile key={id} id={id} className="box empty"  type="empty"/>)}
            case 1: {return (<Tile key={id} id={id} className="box wall"   type="wall"/>)}
            case 2: {return (<Tile key={id} id={id} className="box player" type="player"/>)}
            case 3: {return (<Tile key={id} id={id} className="box enemy" type="enemy"/>)}
            case 4: {return (<Tile key={id} id={id} className="box bonus" type="enemy"/>)}
            default: {return 0;}
          }
        })
      })
    }
  }


  render() {
    return (
      <div>
        <div className="map" >
          {this.renderMap(this.props.mapReducer.gameMap)}
        </div>

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
    initTestMap: () => {
      dispatch(
        initTestMapAction()
      );
    }
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(Game);
