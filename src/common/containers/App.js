import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import style from './App.scss';
import Slider from '../components/Slider';

class App extends Component {
  render() {
    return <Slider initialValue={ 0 } />

    return (
      <div className='App'>
        <header className='MainHeader'>
          <h1 className='Title'>Movie Board</h1>
          <nav className='MainNav'>
            <a href='#' className='isActive'>Explore</a>
            <a href='#'>My Movies</a>
          </nav>
        </header>
        <div className="container content">
          {this.props.children}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    version : state.version,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(dispatch);
}

export default connect(mapStateToProps)(App);
