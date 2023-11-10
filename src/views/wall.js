import {
  paintRealTime,
  deletePost,
  likePost,
  editPost,
} from "../functionAuth.js";
import uploadPic from "../imgs/upload pic.png";
import logout from "../imgs/logout.png";
import editDescription from "../imgs/edit-text.png";
import heartIcon from "../imgs/heart.png";
import deleteIcon from "../imgs/delete.png";

export const renderWall = (navigateTo) => {
  const header = document.querySelector("header");
  if (header !== null) {
    header.style.display = "none";
  }

  const divContainer = document.createElement("div");
  divContainer.setAttribute("id", "div-container");

  const divlogo = document.createElement("div");
  divlogo.setAttribute("id", "div-logo");
  divContainer.appendChild(divlogo);

  const divMenu = document.createElement("div");
  divMenu.setAttribute("id", "div-menu");
  divContainer.appendChild(divMenu);

  const postOption = document.createElement("img");
  postOption.setAttribute("id", "img-post");
  postOption.src = uploadPic;
  divMenu.appendChild(postOption);

  postOption.addEventListener("click", () => {
    navigateTo("/crear_post");
  });

  const logoutButton = document.createElement("img");
  logoutButton.setAttribute("id", "logout");
  logoutButton.src = logout;
  divMenu.appendChild(logoutButton);

  logoutButton.addEventListener("click", () => {
    navigateTo("/");
  });

  const divPosts = document.createElement("div");
  divPosts.setAttribute("id", "div-posts");
  divContainer.appendChild(divPosts);

  const ulCard = document.createElement("ul");
  ulCard.setAttribute("id", "ul-card");
  divPosts.appendChild(ulCard);

  paintRealTime((querySnapshot) => {
    ulCard.textContent = "";
    querySnapshot.forEach((doc) => {
      const ul = divContainer.querySelector("#ul-card");
      const liCard = document.createElement("li");
      liCard.setAttribute("class", "li-card");
      ul.appendChild(liCard);

      const divDescription = document.createElement("div");
      divDescription.setAttribute("class", "div-description");
      liCard.appendChild(divDescription);

      const emailUser = document.createElement("p");
      emailUser.setAttribute("id", "email-user");
      emailUser.innerHTML = doc.data().email;
      divDescription.appendChild(emailUser);

      const postId = doc.id;
      const descriptionPosts = document.createElement("p");
      descriptionPosts.setAttribute("id", `description-post-${postId}`);
      descriptionPosts.setAttribute("class", "description-post");
      descriptionPosts.innerHTML = doc.data().text;
      divDescription.appendChild(descriptionPosts);

      const editPosts = document.createElement("img");
      editPosts.setAttribute("id", "edit-posts");
      editPosts.src = editDescription;
      divDescription.appendChild(editPosts);

      const buttonAcept = document.createElement("button");
      buttonAcept.setAttribute("id", "button-acept");
      buttonAcept.textContent = "Aceptar";
      buttonAcept.style.display = "none";
      divDescription.appendChild(buttonAcept);

      let isEditing = false;

      editPosts.addEventListener("click", () => {
        const editIconId = "edit-posts";
        localStorage.setItem("edititPostValue", editIconId);
        const editingDescription = localStorage.getItem("editPostValue");
        if (isEditing) {
          return;
        }

        const descriptionId = `description-post-${postId}`;
        const description = document.getElementById(descriptionId);

        if (!description) {
          return;
        }
        const currentEmail = localStorage.getItem("emailLogeado");
        const postEmail = doc.data().email;

        if (currentEmail !== postEmail) {
          // El usuario logueado no es el autor del post, no hagas nada
          return;
        }

        isEditing = true;
        if (editingDescription === null) {
          const input = document.createElement("input");
          input.setAttribute("id", descriptionId);
          input.value = description.textContent;
          description.parentNode.replaceChild(input, description);
          divDescription.querySelector("#button-acept").style.display = "block";

          const acceptButton = divDescription.querySelector("#button-acept");
          acceptButton.addEventListener("click", () => {
            const updatedDescription = input.value;
            editPost(postId, updatedDescription);
            const p = document.createElement("p");
            p.setAttribute("id", descriptionId);
            p.setAttribute("class", "description-post");
            p.innerHTML = updatedDescription;
            input.parentNode.replaceChild(p, input);
            divDescription.querySelector("#button-acept").style.display = "none";
            localStorage.removeItem("edititPostValue");

            isEditing = false;
          });
        } else { alert('Ya estás editando un post'); }
      });

      const imgPost = document.createElement("img");
      imgPost.setAttribute("id", "img-post-user");
      imgPost.src = doc.data().imagen;
      liCard.appendChild(imgPost);

      const divActions = document.createElement("div");
      divActions.setAttribute("id", "div-actions");
      liCard.appendChild(divActions);

      const imgHeart = document.createElement("img");
      imgHeart.setAttribute("id", "img-heart");
      imgHeart.src = heartIcon;
      divActions.appendChild(imgHeart);

      const likes = doc.data().likes;

      const counter = document.createElement("p");
      counter.setAttribute("id", "counter");
      counter.innerHTML = likes.length;
      divActions.appendChild(counter);

      const email = doc.data().email;
      const currentEmail = localStorage.getItem("emailLogeado");

      imgHeart.addEventListener("click", () => {
        likePost(postId, email);
      });

      const imgDelete = document.createElement("img");
      imgDelete.setAttribute("id", "img-delete");
      imgDelete.src = deleteIcon;
      divActions.appendChild(imgDelete);
      imgDelete.addEventListener("click", () => {
        if (email === currentEmail) {
          if (
            window.confirm(
              "Este post irá a la caja de arena, seguro que deseas eliminarlo?"
            )
          ) {
            deletePost(postId)
              .then(() => {
                liCard.remove();
              })
              .catch((error) => {});
          }
        } else {
          alert(
            "No eres el propietario de este post, así que no puedes eliminarlo"
          );
        }
      });
    });
  });
  return divContainer;
};
