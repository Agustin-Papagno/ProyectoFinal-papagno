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

function comprar() {
    const productos = JSON.parse(localStorage.getItem("productos")) || [];

    if (productos.length === 0) {
        Swal.fire({
            title: 'Carrito vacío',
            text: 'No hay productos para comprar.',
            icon: 'warning',
            confirmButtonColor: '#8B4513',
        });
        return;
    }

    Swal.fire({
        title: 'Compra realizada',
        text: 'Gracias por tu compra!',
        icon: 'success',
        confirmButtonColor: '#8B4513',
    });

    localStorage.removeItem("productos");
    revisarMensajeVacio();
    crearTarjetasProductos();
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("comprar")?.addEventListener("click", comprar);
});
