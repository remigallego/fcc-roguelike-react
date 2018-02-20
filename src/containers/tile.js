import React, { Component } from 'react';
import '../css/grid.css'


class Tile extends Component {
  constructor() {
    super()
    this.type = ""
  }


  render() {
    return(
      <div className={this.props.className} ></div>
    )

    }
}

export default Tile;
