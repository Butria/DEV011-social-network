/**
 * @jest-environment jsdom
 */
import { renderWelcome } from "../src/views/welcome.js";
import * as myauth from "../src/functionAuth.js";

describe("Boton para vista de registro", () => {
  test("Tiene un botón", () => {
    const renderWelcomeDOM = renderWelcome();
    const haveAButton = renderWelcomeDOM.querySelector(".register-button");
    expect(haveAButton).not.toBe(undefined);
  });
  test('Prueba si NavigateTo es llamado cuando se dispara el evento "navigateTo"', () => {
    const DOM = document.createElement("div");
    const navigateTo = jest.fn();
    DOM.append(renderWelcome(navigateTo));
    const registerButtonWelcome = DOM.querySelector(".register-button");
    registerButtonWelcome.click();
    expect(navigateTo).toHaveBeenCalled();
  });
  test('Prueba si NavigateTo envía a /registro cuando se dispara el evento "navigateTo"', () => {
    const DOM = document.createElement("div");
    const navigateTo = jest.fn();
    DOM.append(renderWelcome(navigateTo));
    const registerButtonWelcome = DOM.querySelector(".register-button");
    registerButtonWelcome.click();
    expect(navigateTo).toHaveBeenCalledWith("/registro");
  });

  test('Prueba que el botón de registro esté presente si el header no es nulo', () => {
    const header = document.createElement('header');
    const originalQuerySelector = document.querySelector;
    // eslint-disable-next-line consistent-return
    document.querySelector = jest.fn((selector) => {
      if (selector === 'header') {
        return header;
      }
    });

    const renderWelcomeDOM = renderWelcome();
    const registerButtonWelcome = renderWelcomeDOM.querySelector(".register-button");
    expect(registerButtonWelcome).not.toBe(null);

    document.querySelector = originalQuerySelector;
  });
});

describe("login button", () => {
  test("Test of click login button", () => {
    jest.spyOn(myauth, "login").mockImplementation(() => Promise.resolve({ email: "catgram23@gmail.com", password: "123456" }));
    const navigateTo = jest.fn();
    renderWelcome(navigateTo);
    const DOM = document.createElement("div");
    DOM.append(renderWelcome(navigateTo));
    const email = DOM.querySelector(".input-user");
    const password = DOM.querySelector(".input-pwd");
    email.value = "catgram@catgram.com";
    password.value = "123456";

    const loginButton = DOM.querySelector(".login-button");
    loginButton.addEventListener("click", () => navigateTo("/muro"));
    loginButton.click();
    expect(myauth.login).toHaveBeenCalledTimes(1);
    expect(navigateTo).toHaveBeenCalledWith("/muro");
  });

  test("Error de login", () => {
    const alertSpy = jest.spyOn(window, "alert").mockImplementation(() => {});
    jest.spyOn(myauth, "login").mockRejectedValue(new Error("Login failed"));
    const navigateTo = jest.fn();
    renderWelcome(navigateTo);
    const DOM = document.createElement("div");
    DOM.append(renderWelcome(navigateTo));
    const email = DOM.querySelector(".input-user");
    const password = DOM.querySelector(".input-pwd");
    email.value = "catgram@catgram.com";
    password.value = "123456";
    const loginButton = DOM.querySelector(".login-button");
    loginButton.click();
    alert("Login failed");
    expect(alertSpy).toHaveBeenCalledWith("Login failed");
  });
});

describe("login with google", () => {
  test("Test of click login with  google", () => {
    jest
      .spyOn(myauth, "logInGoogle")
      .mockImplementation(() => Promise.resolve());
    const DOM = document.createElement("div");
    DOM.append(renderWelcome());

    const googleButton = DOM.querySelector(".google-register-button");
    googleButton.click();
    expect(myauth.logInGoogle).toHaveBeenCalledTimes(1);
  });
});
