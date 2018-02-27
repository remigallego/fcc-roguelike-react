import React, { Component } from 'react';
import {connect} from 'react-redux'
import '../css/infos.css'

class Infos extends Component {
  render() {
    return(
      <div>
        <div className="level-stats">
          <h3>Stage: {this.props.level}</h3>

        </div>
        <div className="player-stats">
          <h3>Player Stats</h3>
          <p>Level:{this.props.player.level}</p>
          <p>HP: {this.props.player.life}</p>
          <p>Attack: {this.props.player.attack}</p>
          <p>XP: {this.props.player.xp}</p>
        </div>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    player: state.mapReducer.player,
    level: state.mapReducer.level
  }
};


export default connect(mapStateToProps,null)(Infos);
