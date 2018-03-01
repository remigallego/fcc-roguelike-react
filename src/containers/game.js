import React, { Component } from 'react';
import '../css/grid.css'
import {connect} from 'react-redux'
import initTestMapAction from '../actions/initMap.js'
import Tile from './tile.js'
import bonusAction from '../actions/bonus.js'
import {random} from '../functions/generateMap.js'

class Game extends Component {
  constructor(props) {
    super(props)
  this.renderMap = this.renderMap.bind(this)
  }

  findLifeEnemy(pos) {
    // [x,y]
    // return health

  let arr = this.props.mapReducer.enemyList;
  for(let i = 0; i < arr.length ; i++)
  {
    if(arr[i].pos.toString() === pos.toString())
      return arr[i].life
  }
  return "N/A!"

  }

  renderMap(gameMap) {

    if(gameMap !== null)
    {
      let player = this.props.mapReducer.player;
      return gameMap.map((array, y)=>{
        return array.map((tile, x) => {
          let id = x + "_" + y;
          let isVisible = false
          let dim;
          if(y <= player.y + 5 && y >= player.y- 5 && x <= player.x + 5 && x >= player.x - 5)
            if(!((y >= player.y + 4 || y <= player.y - 4) && (x <= player.x - 4 || x >= player.x + 4)))
            {
            isVisible = true;
            if(y === player.y + 3 || y === player.y - 3 || x === player.x + 3 || x === player.x - 3)
              dim = "dim3"
            if(y === player.y + 4 || y === player.y - 4 || x === player.x + 4 || x === player.x - 4)
              dim = "dim2"
            if(y === player.y + 5 || y === player.y - 5 || x === player.x + 5 || x === player.x - 5)
              dim = "dim1"
            }

          switch(tile)
          {
            case 0: {return (<Tile key={id} id={id} className={"box empty " + isVisible + " " + dim} type="empty"/>)}
            case 1: {return (<Tile key={id} id={id} className={"box wall " + isVisible + " " + dim} type="wall"/>)}
            case 2: {return (<div><Tile key={id} id={id} className={"box player " + isVisible + " " + dim} type="player"/><div className="life life-player">{player.life}</div></div>)}
            case 3: {return (<div><Tile key={id} id={id} className={"box enemy " + isVisible + " " + dim} type="enemy"/><div className="life">{this.findLifeEnemy([x,y])}</div></div>)}
            case 4: {return (<Tile key={id} id={id} className={"box bonus " + isVisible + " " + dim} type="bonus"/>)}
            case 5: {return (<div><Tile key={id} id={id} className={"box boss " + isVisible + " " + dim}  type="boss"/><div className="life life-boss">{this.findLifeEnemy([x,y])}</div></div>)}
            default: {return 0;}
          }
        })
      })
    }
  }


  render() {
    return (
      <div className="map-container">
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
