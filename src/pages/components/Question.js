import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPoints } from '../../redux/action';
import getQuestion from '../../services/questionsAPI';
import './Question.css';

class Question extends Component {
  state = {
    results: [],
    number: 0,
    timer: 30,
    isDisabled: false,
    answers: [],
    rightAlternative: '',
    marked: false,
    rightAnswers: 0,
    activateNext: false,
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
        this.setState({ isDisabled: true, timer: 0, marked: true }, () => {
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
    this.setState({ answers, rightAlternative: question.correct_answer });
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

  dispatchScore = (score) => {
    const { dispatch } = this.props;
    dispatch(getPoints(score));
  };

  sumPoints = () => {
    const { number, results, timer } = this.state;
    const points = { basePoints: 10, hard: 3, medium: 2, easy: 1 };
    const { difficulty } = results[number];
    if (difficulty === 'hard') {
      const score = points.basePoints + (points.hard * timer);
      this.dispatchScore(score);
    } else if (difficulty === 'medium') {
      const score = points.basePoints + (points.medium * timer);
      this.dispatchScore(score);
    } else {
      const score = points.basePoints + (points.easy * timer);
      this.dispatchScore(score);
    }
  };

  handleClick = ({ target }) => {
    const { rightAnswers } = this.state;
    const { id } = target;
    if (id === 'correct') {
      this.sumPoints();
      this.setState({ rightAnswers: rightAnswers + 1,
        marked: true,
        timer: 0,
        isDisabled: true,
        activateNext: true,
      });
    }
    this.setState({ marked: true, timer: 0, isDisabled: true, activateNext: true });
  };

  nextQuestion = () => {
    const { results, number } = this.state;
    const { history } = this.props;
    this.setState(
      (prevState) => (
        { timer: 30,
          marked: false,
          isDisabled: false,
          number: prevState.number + 1,
        }
      ),
      () => {
        this.timer();
        this.getAnswers(results);
      },
    );
    if (number === Number('4')) {
      history.push('/feedback');
    }
  };

  render() {
    const { results, answers, rightAlternative,
      number, loading, timer,
      isDisabled, marked, activateNext } = this.state;
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
              (element === rightAlternative) ? (
                <button
                  className={ marked ? 'alternativa_correta' : 'alternativa' }
                  type="button"
                  disabled={ isDisabled }
                  data-testid="correct-answer"
                  key={ key }
                  onClick={ this.handleClick }
                  id="correct"
                >
                  {element}
                </button>
              ) : (
                <button
                  className={ marked ? 'alternativa_errada' : 'alternativa' }
                  type="button"
                  disabled={ isDisabled }
                  data-testid={ `wrong-answer-${key}` }
                  key={ key }
                  onClick={ this.handleClick }
                >
                  {element}
                </button>

              )))}
            {
              ((activateNext) && (
                <button
                  data-testid="btn-next"
                  type="button"
                  onClick={ this.nextQuestion }
                >
                  Next
                </button>
              ))
            }
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
