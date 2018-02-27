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
      let player = this.props.mapReducer.player;
      return gameMap.map((array, x)=>{
        return array.map((tile, y) => {
          let id = x + "_" + y;
          let isVisible = false

          if(y <= player.x + 5 && y >= player.x- 5 && x <= player.y + 5 && x >= player.y - 5 )
            isVisible = true;

          switch(tile)
          {
            case 0: {return (<Tile key={id} id={id} className={"box empty " + isVisible} type="empty"/>)}
            case 1: {return (<Tile key={id} id={id} className={"box wall " + isVisible} type="wall"/>)}
            case 2: {return (<Tile key={id} id={id} className={"box player " + isVisible} type="player"/>)}
            case 3: {return (<Tile key={id} id={id} className={"box enemy " + isVisible} type="enemy"/>)}
            case 4: {return (<Tile key={id} id={id} className={"box bonus " + isVisible} type="bonus"/>)}
            case 5: {return (<Tile key={id} id={id} className={"box boss " + isVisible}  type="boss"/>)}
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

  }
};

export default connect(mapStateToProps,mapDispatchToProps)(Game);
