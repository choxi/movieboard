import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class App extends Component {
  render(){
    return (
      <div className="container content">
        {this.props.children}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    version : state.version,
  	movies : state.movies,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(dispatch);
}

export default App;
