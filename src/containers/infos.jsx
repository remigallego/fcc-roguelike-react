import React, { Component } from 'react';
import {connect} from 'react-redux'
import '../css/infos.css'

class Infos extends Component {
  constructor()
  {
    super()
  }


  render() {
    return(
      <div>
        <div className="player-stats">
          <h3>Player Stats</h3>
          <p>Level:{this.props.player.level}</p>
          <p>Life: {this.props.player.life}</p>
          <p>Attack: {this.props.player.attack}</p>
        </div>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    player: state.playerReducer
  }
};


export default connect(mapStateToProps,null)(Infos);
