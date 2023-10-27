import {
  GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword,
} from 'firebase/auth';
import {
  collection, addDoc, getDocs, onSnapshot, orderBy, query, doc, deleteDoc, getDoc, updateDoc,
} from 'firebase/firestore';
import { auth, db } from './conectionFirebase.js';

// import { router } from './router.js';

export function logInGoogle() {
  return new Promise((resolve, reject) => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        // El usuario ha iniciado sesión con Google exitosamente.
        const user = result.user;
        console.log('Usuario autenticado:', user);
        resolve('/muro'); // Resolvemos la promesa con el usuario
      })
      .catch((error) => {
        // Ocurrió un error durante el proceso de inicio de sesión.
        console.error('Error de autenticación con Google:', error);
        reject(error); // Rechazamos la promesa con el error
      });
  });
}

export function emailAuthentication(email, password) {
  return new Promise((resolve, reject) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((currentUser) => {
        const user = currentUser.user;
        // const userId = user.uid;
        // const userEmail = user.email;
        alert(`Usuario creado ${user}`);
        resolve('/muro');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('error al registrar usuario', error);
        if (errorCode === 'auth/email-already-in-use') {
          alert('El correo ya está en uso', errorMessage);
        } else if (errorCode === 'auth/invalid-email') {
          alert('El correo no es válido', errorMessage);
        } else if (errorCode === 'auth/invalid-password') {
          alert('La contraseña debe tener al menos 6 caracteres', errorMessage);
        }
        reject(error);
      });
  });
}

export function login(email, password) {
  return new Promise((resolve, reject) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        resolve(userCredential);
      }) // ...
      .catch((error) => {
        reject(error);
      });
  });
}

const postCollection = collection(db, 'posts');
export const addPost = (text, imagen) => {
 // const user = auth.currentUser;
  const userEmail = user.email;
  addDoc(postCollection, {
    text,
    email: userEmail,
    imagen,
    date: Date.now(),
    likes: [],
  });
};

// --------------------------manda a llamar los documentos de la coleccion-------------------------
export const querySnapshot = getDocs(postCollection);

// ------------------------ ordena de forma asc todos los post-------------------------------------
const orderPost = query(postCollection, orderBy('date', 'desc'));

// -------------------eliminar un documento---------------------------------------------------------
export const deletePost = async (postId) => {
  try {
    const postRef = doc(db, 'posts', postId);
    await deleteDoc(postRef);
    console.log('Documento eliminado con éxito');
  } catch (error) {
    console.error('Error al eliminar el documento:', error);
  }
};

// -------------------------renderiza los post en tiempo real---------------------------------------
export const paintRealTime = (callback) => onSnapshot(orderPost, callback);

// Función para agregar "me gusta" a una publicación
export async function likePost(postId) {
  // Verificar si el usuario ya ha dado "me gusta" a esta publicación
  const user = auth.currentUser;
  const email = user.email;
  console.log(email);
  const postRef = doc(db, 'posts', postId);
  console.log(postRef);

  try {
    const postSnapshot = await getDoc(postRef);

    if (postSnapshot.exists()) {
      const postData = postSnapshot.data();
      const likes = postData.likes || [];

      // Verificar si el usuario ya ha dado "me gusta"
      const userAlreadyLike = likes.includes(email);

      if (!userAlreadyLike) {
        likes.push(email);

        // Actualiza el campo "likes" en Firestore
        // eslint-disable-next-line object-shorthand
        await updateDoc(postRef, { likes: likes });
      } else {
        const index = likes.indexOf(email);
        likes.splice(index, 1);

        // eslint-disable-next-line object-shorthand
        await updateDoc(postRef, { likes: likes });
      }
    }
  } catch (error) {
    console.error('Error al dar "me gusta" a la publicación:', error);
  }
}

auth.onAuthStateChanged((user) => {
  if (user) {
    const email = user.email;
    localStorage.setItem('emailLogeado', email);
    console.log(email);
  }
});
// const user = auth.user;

// localStorage.setItem('emailLogeado', user);

export async function editPost(postId, text) {
  const postRef = doc(db, 'posts', postId);
  // eslint-disable-next-line object-shorthand
  await updateDoc(postRef, { text: text });
}
