import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { history, renderWithRouterAndRedux } from './renderWithRouterAndRedux';
import App from '../../App';
import Login from '../../pages/Login';
import Game from '../../pages/Game';

describe('Teste da página de Login', () => {
  test('Banner de apresentação do Trivia', () => {
    renderWithRouterAndRedux(<Login />)
    const banner = screen.getByRole('banner');
    expect(banner).toBeInTheDocument()
  })
  test('Botão de play', () => {
    const { history } = renderWithRouterAndRedux(<Login />)
    const botaoPlay = screen.getByRole('button', {
      name: /play/i
    })
    expect(botaoPlay).toBeInTheDocument();
    userEvent.click(botaoPlay)
    const {
      location: { pathname },
    } = history;
    expect(pathname).toBe('/');
  })
})