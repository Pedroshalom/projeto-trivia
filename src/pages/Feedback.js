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

  clickToRanking = () => {
    const { history } = this.props;
    history.push('/ranking');
  };

  render() {
    console.log(this.props);
    const { assertions, score } = this.props;
    return (
      <section>
        <Header />
        <div data-testid="feedback-text">Feedback</div>
        <div>
          <p>
            Total Score:
            {' '}
            <span data-testid="feedback-total-score">{score}</span>
          </p>
          <p>
            Assertions:
            {' '}
            <span data-testid="feedback-total-question">{assertions}</span>
          </p>

        </div>
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
        <button
          data-testid="btn-ranking"
          type="button"
          name="btnRanking"
          onClick={ this.clickToRanking }
        >
          Ranking
        </button>

      </section>
    );
  }
}

const mapStateToProps = ({ player }) => ({
  assertions: player.assertions,
  score: player.score,
});

Feedback.propTypes = {
  assertions: propTypes.number,
  history: propTypes.shape(), // req 15
  score: propTypes.number,
}.isRequired;

export default connect(mapStateToProps)(Feedback);
