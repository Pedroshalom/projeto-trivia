import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import getQuestion from '../../services/questionsAPI';
import './Question.css';

class Question extends Component {
  state = {
    results: [],
    number: 0,
  };

  componentDidMount() {
    this.resultsAPI();
  }

  conditionToStart = (response, results) => {
    const { history } = this.props;
    const resetToken = 3;
    if (response === resetToken) {
      window.localStorage.removeItem('token');
      history.push('/');
    } else {
      this.setState({ results, loading: true });
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
    const { results, number, loading } = this.state;
    if (!loading) {
      return <h1> LOADING... </h1>;
    }
    const question = results[number];
    const getAnswers = [question.correct_answer,
      ...question.incorrect_answers];
    const answers = this.shuffleArray(getAnswers);
    console.log(answers);
    return (
      <section>
        <div>{`Question - ${number + 1}`}</div>
        <div>
          <h2 data-testid="question-category">{question.category}</h2>
          <h3 data-testid="question-text">{question.question}</h3>
          <div data-testid="answer-options">
            {answers.map((element, key) => (
              (element === question.correct_answer) ? (
                <button
                  className="alternativa_correta"
                  type="button"
                  data-testid="correct-answer"
                  key={ key }
                >
                  {element}
                </button>
              ) : (
                <button
                  className="alternativa_errada"
                  type="button"
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
