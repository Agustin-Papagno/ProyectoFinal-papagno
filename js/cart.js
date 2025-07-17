const contenedorTarjetas = document.getElementById("productos-container");
const unidadesElement = document.getElementById("unidades");
const precioElement = document.getElementById("precio");
const carritoVacioElement = document.getElementById("carrito-vacio");
const totalesElement = document.getElementById("totales");
const reiniciarCarritoElement = document.getElementById("reiniciar");


function crearTarjetasProductos() {
    contenedorTarjetas.innerHTML = "";
    const productos = JSON.parse(localStorage.getItem("productos"));

    if (productos && productos.length > 0) {
        productos.forEach(producto => {
            const nuevosCafes = document.createElement("div");
            nuevosCafes.classList = "tarjeta-producto";
            nuevosCafes.innerHTML = `
        <img src="../img/${producto.id}.avif">
        <h3>${producto.nombre}</h3>
        <p>$${producto.precio}</p>
        <div>
        <button>-</button>
        <span class="cantidad">${producto.cantidad}</span>
        <button>+</button>
        </div>
        `;
            contenedorTarjetas.appendChild(nuevosCafes);
            nuevosCafes
                .getElementsByTagName("button")[1]
                .addEventListener("click", (e) => {

                    const cuentaElement = e.target.parentElement.getElementsByTagName("span")[0];
                    cuentaElement.innerText = agregarAlCarrito(producto);
                    actualizarTotales();

                })
            nuevosCafes
                .getElementsByTagName("button")[0]
                .addEventListener("click", (e) => {
                    restarAlCarrito(producto);
                    crearTarjetasProductos();
                    actualizarTotales();


                })
        });
    }
}

crearTarjetasProductos();
actualizarTotales();

fetch("./productos.json")
  .then(res => {
    if (!res.ok) throw new Error("Error al cargar productos.json");
    return res.json();
  })
  .then(data => {
    productosDisponibles = data;
    crearTarjetasProductos(productosDisponibles);
  })
  .catch(err => console.error("Fetch error:", err));

function actualizarTotales() {
    const productos = JSON.parse(localStorage.getItem("productos"));
    let unidades = 0;
    let precio = 0;
    if (productos && productos.length > 0) {
        productos.forEach(producto => {
            unidades += producto.cantidad
            precio += producto.precio * producto.cantidad;

        })
        unidadesElement.innerText = unidades;
        precioElement.innerText = precio;
    }

}

function revisarMensajeVacio() {
    const productos = JSON.parse(localStorage.getItem("productos"));
    carritoVacioElement.classList.toggle("escondido", productos && productos.length > 0);
    totalesElement.classList.toggle("escondido", !(productos && productos.length > 0));
}

revisarMensajeVacio();

reiniciarCarritoElement.addEventListener("click", reiniciarCarrito)

function reiniciarCarrito() {
    localStorage.removeItem("productos");
    revisarMensajeVacio();
    actualizarTotales();
    crearTarjetasProductos();
}
//formulario carrito
document.getElementById("formularioCheckout").addEventListener("submit", function (e) {
    e.preventDefault();

    // Capturar datos del formulario
    const nombre = document.getElementById("nombre").value.trim();
    const email = document.getElementById("email").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const direccion = document.getElementById("direccion").value.trim();
    const metodoPago = document.getElementById("metodoPago").value;

    // Validaciones básicas
    const tieneNumeros = /\d/;
    if (tieneNumeros.test(nombre)) {
        alert("El nombre no puede contener números.");
        return;
    }

    if (isNaN(telefono)) {
        alert("El teléfono solo debe contener números.");
        return;
    }

    if (!email.includes("@")) {
        alert("El email no es válido.");
        return;
    }

    // Obtener productos del carrito
    const productosCarrito = JSON.parse(localStorage.getItem("productos")) || [];

    if (productosCarrito.length === 0) {
        alert("El carrito está vacío.");
        return;
    }

    // Mostrar resumen de la compra :)
    const detalle = document.getElementById("detalleProductos");
    const total = document.getElementById("totalCompra");
    const datos = document.getElementById("datosComprador");
    const resumen = document.getElementById("resumenCompra");

    let totalCompra = 0;
    detalle.innerHTML = "";

    productosCarrito.forEach(producto => {
        detalle.innerHTML += `<p>${producto.nombre} x${producto.cantidad} - $${producto.precio * producto.cantidad}</p>`;
        totalCompra += producto.precio * producto.cantidad;
    });

    total.innerText = `Total: $${totalCompra}`;
    datos.innerHTML = `
      <strong>Nombre:</strong> ${nombre}<br>
      <strong>Email:</strong> ${email}<br>
      <strong>Teléfono:</strong> ${telefono}<br>
      <strong>Dirección:</strong> ${direccion}<br>
      <strong>Método de pago:</strong> ${metodoPago}
    `;

    resumen.style.display = "block"; 
    this.reset(); 

    // Limpiar carrito y actualizar vista del mismo
    localStorage.removeItem("productos");
    crearTarjetasProductos();
    actualizarTotales();
    revisarMensajeVacio();

    //alerta de compra realizada con sweets alerts!
    Swal.fire({
  title: '¡Compra realizada!',
  text: 'Gracias por tu compra. Te enviaremos la confirmación por email.',
  icon: 'success',
  confirmButtonColor: '#8B4513',
  confirmButtonText: 'Aceptar'
});
});

