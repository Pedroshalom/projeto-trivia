import { ADD_USER } from '../action';

const INITIAL_STATE = {
  email: '',
  name: '',
};

function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADD_USER:
    return {
      ...state,
      email: action.user.email,
      name: action.user.name,
    };
  default:
    return state;
  }
}

export default user;
