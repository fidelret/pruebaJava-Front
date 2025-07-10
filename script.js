
const apiUrl = "http://localhost:8080/api/articulos"; // URL de tu backend

const productosContainer = document.getElementById("productos"); // Contenedor en productos.html
const formArticulo = document.getElementById("form-articulo"); // Formulario para agregar artículos

// Cargar artículos desde backend
async function cargarArticulos() {
  try {
    const response = await fetch(apiUrl);
    const articulos = await response.json();
    mostrarArticulos(articulos);
  } catch (error) {
    console.error("Error al cargar artículos:", error);
  }
}

// Mostrar artículos en el HTML
function mostrarArticulos(articulos) {
  productosContainer.innerHTML = "";
  articulos.forEach(articulo => {
    const card = document.createElement("div");
    card.className = "producto-card";
    card.innerHTML = `
      <h3>${articulo.nombre}</h3>
      <p>${articulo.descripcion}</p>
      <p>Precio: $${articulo.precio}</p>
      <button onclick="eliminarArticulo(${articulo.id})">Eliminar</button>
    `;
    productosContainer.appendChild(card);
  });
}

// Agregar artículo desde el formulario
formArticulo.addEventListener("submit", async (e) => {
  e.preventDefault();
  const nombre = formArticulo.nombre.value;
  const descripcion = formArticulo.descripcion.value;
  const precio = parseFloat(formArticulo.precio.value);

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, descripcion, precio })
    });
    if (response.ok) {
      cargarArticulos();
      formArticulo.reset();
    } else {
      alert("Error al crear artículo.");
    }
  } catch (error) {
    console.error("Error al agregar artículo:", error);
  }
});

// Eliminar artículo
async function eliminarArticulo(id) {
  if (!confirm("¿Seguro que querés eliminar este artículo?")) return;
  try {
    const response = await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
    if (response.ok) {
      cargarArticulos();
    } else {
      alert("No se pudo eliminar el artículo.");
    }
  } catch (error) {
    console.error("Error al eliminar:", error);
  }
}

// Iniciar carga al abrir la página
window.addEventListener("DOMContentLoaded", cargarArticulos);
