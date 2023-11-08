export const renderError = () => {
  console.log(window.location.pathname);
  const errorTitle = document.createElement('h2');
  errorTitle.setAttribute('id', 'error-title');
  errorTitle.textContent = '¡Santos mishis! El ratón que estabas siguiendo ha escapado. Error 404';

  return errorTitle;
};
