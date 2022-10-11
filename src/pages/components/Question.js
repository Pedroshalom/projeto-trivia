import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import getQuestion from '../../services/questionsAPI';
import './Question.css';

class Question extends Component {
  state = {
    results: [],
    number: 0,
    timer: 30,
    isDisabled: false,
    answers: [],
    rightAnswer: '',
  };

  componentDidMount() {
    this.resultsAPI();
    this.timer();
  }

  timer = () => {
    const ONE_SECOND = 1000;
    const interval = setInterval(() => {
      const { timer } = this.state;
      this.setState((prevState) => ({ timer: prevState.timer - 1 }));
      if (timer === 0) {
        this.setState({ isDisabled: true, timer: 0 }, () => {
          clearInterval(interval);
        });
      }
    }, ONE_SECOND);
  };

  getAnswers = (results) => {
    const { number } = this.state;
    const question = results[number];
    const getAnswers = [question.correct_answer,
      ...question.incorrect_answers];
    const answers = this.shuffleArray(getAnswers);
    this.setState({ answers, rightAnswer: question.correct_answer });
  };

  conditionToStart = (response, results) => {
    const { history } = this.props;
    const resetToken = 3;
    if (response === resetToken) {
      window.localStorage.removeItem('token');
      history.push('/');
    } else {
      this.setState({ results, loading: true });
      this.getAnswers(results);
    }
  };

  resultsAPI = async () => {
    const API = await getQuestion();
    const { response_code: response, results } = API;
    this.conditionToStart(response, results);
  };

  // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  shuffleArray = (array) => {
    let currIndex = array.length;
    let randomIndex;

    while (currIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currIndex);
      currIndex -= 1;

      [array[currIndex], array[randomIndex]] = [
        array[randomIndex], array[currIndex]];
    }

    return array;
  };

  render() {
    const { results, answers, rightAnswer,
      number, loading, timer,
      isDisabled } = this.state;
    const question = results[number];
    if (!loading) {
      return <h1> LOADING... </h1>;
    }
    return (
      <section>
        <div>{`Question - ${number + 1}`}</div>
        <div>
          <h2 data-testid="question-category">{question.category}</h2>
          <h3 data-testid="question-text">{question.question}</h3>
          {timer}
          <div data-testid="answer-options">
            {answers.map((element, key) => (
              (element === rightAnswer) ? (
                <button
                  className="alternativa_correta"
                  type="button"
                  disabled={ isDisabled }
                  data-testid="correct-answer"
                  key={ key }
                >
                  {element}
                </button>
              ) : (
                <button
                  className="alternativa_errada"
                  type="button"
                  disabled={ isDisabled }
                  data-testid={ `wrong-answer-${key}` }
                  key={ key }
                >
                  {element}
                </button>
              )))}

          </div>
        </div>

      </section>
    );
  }
}

Question.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default connect()(Question);
