import React, { Component } from 'react';
import Tile from './tile.js'

class Legend extends Component {
render() {
  return(
<div>
  <div className="legend-center">
    <div className="legend-item"><Tile className="box player-legend" type="player"/> Player</div>
    <div className="legend-item"><Tile className="box enemy-legend" type="enemy"/> Enemy</div>
    <div className="legend-item"><Tile className="box bonus-legend" type="bonus"/> Bonus</div>
    <div className="legend-item"><Tile className="box boss-legend" type="boss"/> Boss</div>
  </div>
</div>

  )
}

}

export default Legend
