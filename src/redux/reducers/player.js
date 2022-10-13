import { ADD_USER, SCORE_POINTS, RIGHT_ANSWERS } from '../action';

const INITIAL_STATE = {
  gravatarEmail: '',
  name: '',
  score: 0,
  assertions: 0,
};

function player(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADD_USER:
    return {
      ...state,
      gravatarEmail: action.user.email,
      name: action.user.name,
    };
  case SCORE_POINTS:
    return {
      ...state,
      score: Number(action.points) + Number(state.score),
    };
  case RIGHT_ANSWERS:
    return {
      ...state,
      assertions: Number(action.rightAnswers),
    };
  default:
    return state;
  }
}

export default player;
