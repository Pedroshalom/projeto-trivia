import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { MD5 } from 'crypto-js';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { name, email, score } = this.props;
    console.log(this.props);
    const gravatar = 'https://www.gravatar.com/avatar/';
    const hash = MD5(email).toString();
    const imgGravatar = `${gravatar}${hash}`;
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
  ...state.player,
});

Header.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
  }),
}.isRequired;

export default connect(mapStateToProps)(Header);
