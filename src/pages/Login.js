import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import logo from '../trivia.png';
import '../App.css';
import getToken from '../services/API';

class Login extends Component {
  state = {
    isDisabled: true,
    email: '',
    nome: '',
  };

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({
      [name]: value,
    }, () => {
      this.handleButtonDisable();
    });
  };

  handleButtonDisable = () => {
    const { email, nome } = this.state;
    const emailRegex = /\S+@\S+\.\S+/;
    const numName = 0;

    const ver1 = emailRegex.test(email);
    const ver2 = nome.length > numName;

    if (ver1 && ver2) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  };

  handleClick = async () => {
    const { history } = this.props;
    const key = await getToken();
    const { token } = key;
    localStorage.setItem('token', token);
    history.push('/game');
  };

  logClickSet = () => {
    const { history } = this.props;
    history.push('/settings');
  };

  render() {
    const { state } = this;
    const {
      email,
      nome,
      isDisabled,
    } = state;
    return (
      <div>
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
        </header>
        <form>
          <input
            type="text"
            placeholder="Qual seu e-mail no gravatar?"
            data-testid="input-gravatar-email"
            name="email"
            value={ email }
            onChange={ this.handleChange }
          />
          <input
            type="text"
            placeholder="Qual é o seu nome?"
            data-testid="input-player-name"
            name="nome"
            value={ nome }
            onChange={ this.handleChange }
          />
          <button
            type="button"
            disabled={ isDisabled }
            onClick={ this.handleClick }
            data-testid="btn-play"
          >
            Play

          </button>
          <button
            data-testid="btn-settings"
            type="button"
            name="btnSettings"
            onClick={ this.logClickSet }
          >
            Settings
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default connect()(Login);
