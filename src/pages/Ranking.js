import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Ranking extends Component {
  loginButton = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    return (
      <div>
        <p data-testid="ranking-title">Ranking</p>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.loginButton }
        >
          Login

        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Ranking);
