import React, { Component } from 'react';
import Header from './components/Header';

class Feedback extends Component {
  render() {
    return (
      <section>
        <Header />
        <div data-testid="feedback-text">Feedback</div>
      </section>
    );
  }
}

export default Feedback;
