import React, { Component } from 'react';
import propTypes from 'prop-types';

class Feedback extends Component {
  playAgainClick = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    return (
      <div>
        <div data-testid="feedback-text">Feedback</div>
        <button
          data-testid="btn-play-again"
          type="button"
          name="btnPlayAgain"
          onClick={ this.playAgainClick }
        >
          Play Again
        </button>
      </div>
    );
  }
}

Feedback.propTypes = {
  history: propTypes.shape().isRequired, // req 15
};

export default Feedback;
