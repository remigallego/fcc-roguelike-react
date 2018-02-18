import React, { Component } from 'react';
import '../css/map.css'
import shortid from 'shortid'
import {connect} from 'react-redux'
import initTestMapAction from '../actions/initMap.js'
import updatePlayer from '../actions/updatePlayerPosition'
import Tile from './tile.js'

class Game extends Component {
  constructor(props) {
    super(props)
  this.renderMap = this.renderMap.bind(this)
  this.movePlayer = this.movePlayer.bind(this);
  }

  renderMap(gameMap) {
    if(gameMap !== null)
    {
      return gameMap.map((array, x)=>{
        return array.map((tile, y) => {
          let pos = {posX: x,posY: y}
          switch(tile)
          {
            case 0: {return (<Tile type="empty"   position={pos} />)}
            case 1: {return (<Tile type="wall"    className="box wall"   position={pos} />)}
            case 2: {return (<Tile type="player"  className="box player" position={pos} />)}
            default: {return 0;}
          }
        })
      })
    }
  }

  movePlayer(e) {
    e.preventDefault();
    console.log("Key Down: " + e.key);
    if(e.key === 'i' )
    {
        this.props.updatePlayer('INIT', this.props.mapReducer)
    }
    else if(e.key === 'z' || e.key == "ArrowUp")
      {
        this.props.updatePlayer('UP', this.props.mapReducer)
      }
    else if(e.key === 's' || e.key == "ArrowDown")
        {
          this.props.updatePlayer('DOWN', this.props.mapReducer)
        }
        else if(e.key === 'd' || e.key == "ArrowRight")
            {
              this.props.updatePlayer('RIGHT', this.props.mapReducer)
            }
            else if(e.key === 'q' || e.key == "ArrowLeft")
                {
                  this.props.updatePlayer('LEFT', this.props.mapReducer)
                }
  }

  componentWillMount() {
    console.log("mount");
    var p1 = new Promise((resolve, reject) => {
      this.props.initTestMap()
      resolve();
    });
    p1.then(() => {  this.props.updatePlayer('INIT', this.props.mapReducer)})

  }

  render() {
    console.log("Render Game Class");
    return (
      <div tabIndex="0" onKeyDown={this.movePlayer}>
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
    },
    updatePlayer: (dir, map) => {
      dispatch(
        updatePlayer(dir, map)
      )
    }
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(Game);
