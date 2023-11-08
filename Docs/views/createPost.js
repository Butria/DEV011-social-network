import { addPost } from '../functionAuth.js';

export const createPost = (navigateTo) => {
  const divCreatePost = document.createElement('div');
  divCreatePost.setAttribute('id', 'div-create-post');

  const form = document.createElement('form');
  divCreatePost.appendChild(form);

  const urlImg = document.createElement('input');
  urlImg.setAttribute('required', '');
  urlImg.setAttribute('id', 'url-img');
  urlImg.setAttribute('type', 'text');
  urlImg.setAttribute('placeholder', 'URL de tu foto');
  urlImg.value = '';
  form.appendChild(urlImg);

  urlImg.addEventListener('blur', () => {

  });
  const textArea = document.createElement('textarea');
  textArea.setAttribute('id', 'text-area');
  textArea.setAttribute('placeholder', 'Escribe en 140 palabras un encabezado para tu foto:');
  textArea.setAttribute('maxlength', '140');
  textArea.value = '';
  form.appendChild(textArea);

  const buttonSave = document.createElement('button');
  buttonSave.setAttribute('id', 'button-save');
  buttonSave.textContent = 'Guardar';
  form.appendChild(buttonSave);

  buttonSave.addEventListener('click', (e) => {
    e.preventDefault();
    const text = divCreatePost.querySelector('#text-area');
    const imagen = divCreatePost.querySelector('#url-img');
    const valor = urlImg.value;
    if (valor === '') {
      alert('El campo Url no puede estar vacío');
      urlImg.focus();
    } else {
      addPost(text.value, imagen.value);
      text.value = '';
      imagen.value = '';
      navigateTo('/muro');
    }
  });

  return divCreatePost;
};
