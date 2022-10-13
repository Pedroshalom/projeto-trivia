import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Header from './components/Header';

const MIN_SCORE = 3;

class Feedback extends Component {
  playAgainClick = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    console.log(this.props);
    const { assertions } = this.props;
    return (
      <section>
        <Header />
        <div data-testid="feedback-text">Feedback</div>
        { parseFloat(assertions) < MIN_SCORE ? (
          <div data-testid="feedback-text">Could be better...</div>
        ) : (
          <div data-testid="feedback-text">Well Done!</div>
        )}
        <div>
          <button
            data-testid="btn-play-again"
            type="button"
            name="btnPlayAgain"
            onClick={ this.playAgainClick }
          >
            Play Again
          </button>
        </div>
      </section>
    );
  }
}

const mapStateToProps = ({ player }) => ({
  assertions: player.assertions,
});

Feedback.propTypes = {
  assertions: propTypes.number.isRequired,
  history: propTypes.shape().isRequired, // req 15
};

export default connect(mapStateToProps)(Feedback);
