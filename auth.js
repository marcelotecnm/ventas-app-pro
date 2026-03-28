import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";

  // Your web app's Firebase configuration
  const firebaseConfig = {
  apiKey: "AIzaSyC7mK4MITifHHyaPGA1nAPhMAO9-15rOsE",
  authDomain: "ventas-app-pro-a9301.firebaseapp.com",
  projectId: "ventas-app-pro-a9301",
  storageBucket: "ventas-app-pro-a9301.firebasestorage.app",
  messagingSenderId: "482441859104",
  appId: "1:482441859104:web:1a6ef3012f20ed0f996c45"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// REGISTRO
window.registrar = async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    alert("Usuario registrado correctamente");
    window.location.href = "ventas.html";
  } catch (error) {
    alert("Error: " + error.message);
  }
};

// LOGIN
window.login = async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert("Login exitoso");
    window.location.href = "index.html"; // redirige al CRUD
  } catch (error) {
    alert("Error: " + error.message);
  }
};
