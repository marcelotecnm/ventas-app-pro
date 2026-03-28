// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

// Configuración Firebase
const firebaseConfig = {
  apiKey: "AIzaSyC7mK4MITifHHyaPGA1nAPhMAO9-15rOsE",
  authDomain: "ventas-app-pro-a9301.firebaseapp.com",
  projectId: "ventas-app-pro-a9301",
  storageBucket: "ventas-app-pro-a9301.firebasestorage.app",
  messagingSenderId: "482441859104",
  appId: "1:482441859104:web:2e9a4de987b4e465996c45"
};

// Inicializar
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// CREATE
window.crearVenta = async () => {
  const producto = document.getElementById("producto").value;
  const precio = parseFloat(document.getElementById("precio").value);
  const cantidad = parseInt(document.getElementById("cantidad").value);

  await addDoc(collection(db, "ventas"), {
    producto,
    precio,
    cantidad,
    fecha: new Date().toISOString()
  });

  alert("Venta guardada");
  leerVentas();
};

// READ
async function leerVentas() {
  const lista = document.getElementById("listaVentas");
  lista.innerHTML = "";

  const querySnapshot = await getDocs(collection(db, "ventas"));

  querySnapshot.forEach((docSnap) => {
    const data = docSnap.data();

    const li = document.createElement("li");
    li.innerHTML = `
      ${data.producto} - $${data.precio} - Cant: ${data.cantidad}
      <button onclick="eliminarVenta('${docSnap.id}')">Eliminar</button>
      <button onclick="editarVenta('${docSnap.id}', '${data.producto}', ${data.precio}, ${data.cantidad})">Editar</button>
    `;

    lista.appendChild(li);
  });
}

// DELETE
window.eliminarVenta = async (id) => {
  await deleteDoc(doc(db, "ventas", id));
  leerVentas();
};

// UPDATE
window.editarVenta = async (id, producto, precio, cantidad) => {
  const nuevoProducto = prompt("Producto:", producto);
  const nuevoPrecio = prompt("Precio:", precio);
  const nuevaCantidad = prompt("Cantidad:", cantidad);

  await updateDoc(doc(db, "ventas", id), {
    producto: nuevoProducto,
    precio: parseFloat(nuevoPrecio),
    cantidad: parseInt(nuevaCantidad)
  });

  leerVentas();
};

// Inicializar lectura
leerVentas();

