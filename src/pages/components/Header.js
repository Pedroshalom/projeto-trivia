import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { MD5 } from 'crypto-js';
import { connect } from 'react-redux';

class Header extends Component {
  state = {
    score: 0,
  };

  render() {
    const { name, email } = this.props;
    const gravatar = 'https://www.gravatar.com/avatar/';
    const hash = MD5(email).toString();
    const imgGravatar = `${gravatar}${hash}`;
    const { score } = this.state;
    return (
      <section>
        <div>
          <h1>GAME - TRIVIA </h1>
        </div>
        <div>
          <div>
            <p>
              Score:
              <span data-testid="header-score">{score}</span>
            </p>
          </div>
          <div>
            <img src={ imgGravatar } alt="profile" data-testid="header-profile-picture" />
            <p data-testid="header-player-name">{name}</p>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.user,
});

Header.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
  }),
}.isRequired;

export default connect(mapStateToProps)(Header);
