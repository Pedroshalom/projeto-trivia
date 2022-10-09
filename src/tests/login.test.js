import React from "react";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import App from "../App";

describe("Testa a pagina de login e seus componentes", () => {
  // texto dos inputs para os testes.
  const email = "teste@trybe.com";
  const name = "tryber";

  test("Teste se existe um input para nome e email", () => {
    renderWithRouterAndRedux(<App />);
    // Pegando os inputs pelo PlaceHolder
    const inputName = screen.getByPlaceholderText("Qual é o seu nome?");
    const inputEmail = screen.getByPlaceholderText(
      "Qual seu e-mail no gravatar?"
    );
    // teste para ver se os inputs existem na pagina
    expect(inputName).toBeInTheDocument();
    expect(inputEmail).toBeInTheDocument();
  });

  test("Verifica se pode preencher os inputs", () => {
    renderWithRouterAndRedux(<App />);
    // Pegando os inputs pelo PlaceHolder
    const inputName = screen.getByPlaceholderText("Qual é o seu nome?");
    const inputEmail = screen.getByPlaceholderText(
      "Qual seu e-mail no gravatar?"
    );
    //Ação de preencher os inputs com os textos de test
    userEvent.type(inputName, name);
    userEvent.type(inputEmail, email);
    //Teste para ver se os inputs foram preenchidos corretamente.
    expect(inputName).toHaveValue(name);
    expect(inputEmail).toHaveValue(email);
  });

  test("Verifica se existem 2 botões na tela de Login", () => {
    renderWithRouterAndRedux(<App />);
    // Pegando todos os botões existentes na tela e retorna um array
    const buttons = screen.getAllByRole("button");
    // Teste para ver se o tamanho do array de botões é igual a quantidade que espero que tenha de botões na tela
    expect(buttons).toHaveLength(2);
  });

  test("Verifica se o botão de play só habilita ao preencher os inputs e ao clicar nele te encaminha para outra pagina", async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    // Pegando os inputs e o botão de play
    const playBtn = screen.getByRole("button", { name: "Play" });
    const inputName = screen.getByPlaceholderText("Qual é o seu nome?");
    const inputEmail = screen.getByPlaceholderText(
      "Qual seu e-mail no gravatar?"
    );

    // Verifico se ele começa disabilitado
    expect(playBtn).toBeDisabled();
    // Preencho os inputs
    userEvent.type(inputName, name);
    userEvent.type(inputEmail, email);
    //Verifico se o botão foi habilitado
    expect(playBtn).toBeEnabled();

    //Ação de clicar no botão
    userEvent.click(playBtn);
    //Espero localizar na pagina um texto ou elemento
    await screen.findByText("Game");
    //novo endereço do site
    const { pathname } = history.location;
    //testo se o endereço mudou
    expect(pathname).toBe("/game");
  });

  test("Verifica se existe um botão Settings te encaminha para a pagina de configuração", async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    // Pegando o botão de Settings
    const settingsBtn = screen.getByRole("button", { name: "Settings" });

    //Testo pra ver se ele existe no documento
    expect(settingsBtn).toBeInTheDocument();
    //Clico no botão
    userEvent.click(settingsBtn);

    //Espero localizar um elemento ou texto na nova pagina
    await screen.findByText("SETTINGS");
    //Verifico se o endereço da pagina mudou
    const { pathname } = history.location;
    expect(pathname).toBe("/settings");
  });
});