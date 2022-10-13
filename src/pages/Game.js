import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from './components/Header';
import Question from './components/Question';

class Game extends Component {
  render() {
    const { history } = this.props;
    return (
      <>
        <Header />
        <div><h2>GAME</h2></div>
        <Question history={ history } />
      </>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default Game;
