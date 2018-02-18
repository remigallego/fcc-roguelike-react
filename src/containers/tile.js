import React, { Component } from 'react';

class Tile extends Component {
render() {
  console.log("Render Tile Class");
  let type = "box " + this.props.type;
  return(
    <div className={type}  position={this.props.pos} />
  )
}
}


export default Tile;
