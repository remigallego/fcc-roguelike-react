import React, { Component } from 'react';
import '../css/grid.css'
import shortid from 'shortid'
import {connect} from 'react-redux'
import initTestMapAction from '../actions/initMap.js'
import updatePlayer from '../actions/updatePlayerPosition'
import Tile from './tile.js'

class Game extends Component {
  constructor(props) {
    super(props)
  this.renderMap = this.renderMap.bind(this)

  }

  renderMap(gameMap) {
    console.log("renderMap(gameMap) [Game]");
    if(gameMap !== null)
    {
      return gameMap.map((array, x)=>{
        return array.map((tile, y) => {
          let tileId = {x: x, y: y}
          let id = x + "_" + y;
          switch(tile)
          {
            case 0: {return (<Tile id={id} className="box empty"  type="empty"/>)}
            case 1: {return (<Tile id={id} className="box wall"   type="wall"/>)}
            case 2: {return (<Tile id={id} className="box player" type="player"/>)}
            case 3: {return (<Tile id={id} className="box enemy" type="enemy"/>)}
            default: {return 0;}
          }
        })
      })
    }
  }


  render() {
    console.log("Render [Game]");
    return (
      <div  >
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
