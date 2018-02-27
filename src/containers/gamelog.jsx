import React, { Component } from 'react';
import '../css/app.css'
import {connect} from 'react-redux'

class GameLog extends Component {
  render() {
    let log = this.props.mapReducer.log
    return(
      <div className="gamelog">
        <h3>{log[log.length - 1]}</h3>
        <p>{log[log.length - 2]}</p>
        <p>{log[log.length - 3]}</p>
      </div>
    )
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

export default connect(mapStateToProps,mapDispatchToProps)(GameLog);
