import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from './components/Header';

const MIN_SCORE = 3;

class Feedback extends Component {
  render() {
    console.log(this.props);
    const { rightAnswers } = this.props;
    return (
      <section>
        <Header />
        <div data-testid="feedback-text">Feedback</div>
        { parseFloat(rightAnswers) < MIN_SCORE ? (
          <div data-testid="feedback-text">Could be better...</div>
        ) : (
          <div data-testid="feedback-text">Well Done!</div>
        )}
      </section>
    );
  }
}

const mapStateToProps = ({ player }) => ({
  rightAnswers: player.rightAnswers,
});

Feedback.propTypes = {
  rightAnswers: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, null)(Feedback);
