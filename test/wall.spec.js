// /**
//  * @jest-environment jsdom
//  */
// import { renderWall } from "../src/views/wall.js";
// import * as myauth from "../src/functionAuth.js";

// describe("Renderizado de muro, cerrar sesion, tiene un boton", () => {
//   test("debería ser una función", () => {
//     expect(typeof renderWall).toBe("function");
//   });
//   test("Tiene un botón", () => {
//     const renderWallDOM = renderWall();
//     const haveAButton = renderWallDOM.querySelector("#button-acept");
//     expect(haveAButton).not.toBe(undefined);
//   });
//   test('Prueba si NavigateTo es llamado cuando se dispara el evento "navigateTo"', () => {
//     const DOM = document.createElement("div");
//     const navigateTo = jest.fn();
//     DOM.append(renderWall(navigateTo));
//     const logout = DOM.querySelector("#logout");
//     logout.click();
//     expect(navigateTo).toHaveBeenCalled();
//   });
//   test('Prueba si NavigateTo envía a / cuando se dispara el evento "navigateTo"', () => {
//     const DOM = document.createElement("div");
//     const navigateTo = jest.fn();
//     DOM.append(renderWall(navigateTo));
//     const logout = DOM.querySelector("#logout");
//     logout.click();
//     expect(navigateTo).toHaveBeenCalledWith("/");
//   });
// });

// describe("NavigateTo nuevo post", () => {
// eslint-disable-next-line max-len
//   test('Prueba si NavigateTo es llamado cuando se dispara el evento "navigateTo nuevo post"', () => {
//     const DOM = document.createElement("div");
//     const navigateTo = jest.fn();
//     DOM.append(renderWall(navigateTo));
//     const postOption = DOM.querySelector("#img-post");
//     postOption.click();
//     expect(navigateTo).toHaveBeenCalled();
//   });
// eslint-disable-next-line max-len
//   test('Prueba si NavigateTo envía a /crear_post cuando se dispara el evento "navigateTo"', () => {
//     const DOM = document.createElement("div");
//     const navigateTo = jest.fn();
//     DOM.append(renderWall(navigateTo));
//     const postOption = DOM.querySelector("#img-post");
//     postOption.click();
//     expect(navigateTo).toHaveBeenCalledWith("/crear_post");
//   });
// });

// describe("Pruebas para paintRealTime", () => {
//   beforeEach(() => {
//     // Configura el elemento ulCard en el documento para cada prueba
//     // const ulCard = document.createElement('ul');
//     // document.body.appendChild(ulCard);
//     // const liCard = document.createElement('li');
//     // liCard.setAttribute('id', 'li-card');
//     // ulCard.appendChild(liCard);
//     // console.log(liCard);
//   });

//   afterEach(() => {
//     // Limpia el documento después de cada prueba
//     document.body.innerHTML = "";
//   });
//   it("debería crear elementos liCard en ulCard", () => {
//     // Llama a la función paintRealTime con el querySnapshot
//     myauth.paintRealTime();
//     // console.log(prueba);
//     // Verifica que ulCard contenga elementos liCard
//     const DOM = document.createElement("div");
//     const navigateTo = jest.fn();
//     DOM.append(renderWall(navigateTo));
//     console.log(DOM);
//     const ulCard = DOM.querySelector("#ul-card");
//     console.log(ulCard, DOM);

//     const liCardElements = ulCard.querySelectorAll(".li-card");
//     // liCardElements;
//     console.log(typeof liCardElements, "lisssssssss");
//     console.log(Object.entries(liCardElements).length, "miooo");
//     expect(liCardElements).not.toBe(null);
//     // expect(Object.entries(liCardElements).length).toBe(querySnapshot.length);
//   });
//   it.skip("debería crear elementos con contenido correcto", () => {
//     // Simula un querySnapshot con datos de prueba
//     const querySnapshot = [
//       { data: () => ({ email: "usuario1", text: "Mensaje 1" }) },
//       { data: () => ({ email: "usuario2", text: "Mensaje 2" }) },
//     ];
//     const email = querySnapshot[0].data().email;
//     console.log(email); // Esto imprimirá 'usuario1'
//     // Llama a la función paintRealTime con el querySnapshot
//     // myauth.paintRealTime(querySnapshot);
//     // Verifica que los elementos creados tengan el contenido esperado
//     const DOM = document.createElement("div");
//     const navigateTo = jest.fn();
//     // DOM.append(renderWall(navigateTo));
//     DOM.append(renderWall(navigateTo)); // .myauth.paintRealTime(querySnapshot));
//     const ulCard = DOM.querySelector("#ul-card");
//     // const emailUserElements = ulCard.querySelector("#email-user");
//     const email1 = querySnapshot[0].data().email;
//     const email2 = querySnapshot[1].data().email;
//     const usuario1 = querySnapshot[0].data().text;
//     const usuario2 = querySnapshot[1].data().text;
//     console.log(email1, email2, usuario1, usuario2);
//     // myauth.paintRealTime(querySnapshot);
//     console.log('ULCARD: ', ulCard.childNodes.length);
//     const descriptionPostsElements = ulCard.querySelectorAll("#description-post");
//     console.log(descriptionPostsElements.length);
//     descriptionPostsElements.forEach((elem) => {
//       console.log(elem);
//     });
//     // descriptionPostsElements.textcontent = email1;
//     // expect(descriptionPostsElements.textcontent).toBe("usuario1");
//     // expect(usuario1).toBe("Mensaje 1");

//     // expect(email2).toBe("usuario2");
//     // expect(usuario2).toBe("Mensaje 2");
//   });

//   it.skip("debería crear elementos liCard en ulCard", () => {
//     const querySnapshot = [
//       { data: () => ({ email: "usuario1", text: "Mensaje 1" }) },
//       { data: () => ({ email: "usuario2", text: "Mensaje 2" }) },
//     ];

//     // Llama a la función paintRealTime con el querySnapshot

//     // console.log(prueba);
//     // Verifica que ulCard contenga elementos liCard
//     const DOM = document.createElement("div");
//     const navigateTo = jest.fn();
//     DOM.append(renderWall(navigateTo));
//     console.log(DOM);
//     const ulCard = DOM.querySelector("#ul-card");
//     myauth.paintRealTime((querySnapshot) => {
//       querySnapshot.forEach((liCard, index) => {
//         const data = querySnapshot[index].data(); // Obtiene los datos de querySnapshot
//         const emailElement = liCard.querySelector(".email");
//         const textElement = liCard.querySelector(".text");
//         emailElement.textContent = data.email;
//         textElement.textContent = data.text;
//       });
//     });

//     // console.log(ulCard, DOM);

//     const liCardElements = ulCard.querySelectorAll(".li-card");
//     console.log(liCardElements.length, "elementsss");
//     console.log(typeof liCardElements, "lisssssssss");
//     console.log(Object.entries(liCardElements).length, "miooo");
//     expect(liCardElements).not.toBe(null);
//     expect(liCardElements).toHaveLength(querySnapshot.length);
//     // expect(Object.entries(liCardElements).length).toBe(querySnapshot.length);
//   });
// });
