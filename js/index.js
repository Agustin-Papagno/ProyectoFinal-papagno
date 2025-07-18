//creando las tarjetas de los productos

const contenedorTarjetas = document.getElementById("productos-container");


function crearTarjetasProductos(productos) {
    productos.forEach(producto => {
        const nuevosCafes = document.createElement("div");
        nuevosCafes.classList = "tarjeta-producto";
        nuevosCafes.innerHTML = `
        <img src="./img/${producto.id}.avif">
        <h3>${producto.nombre}</h3>
        <p>$${producto.precio}</p>
        <button>Agregar al carrito</button>

        `


        contenedorTarjetas.appendChild(nuevosCafes);

        nuevosCafes.getElementsByTagName("button")[0].addEventListener("click", () => {
            agregarAlCarrito(producto);
            Swal.fire({
                title: 'Producto agregado',
                text: `"${producto.nombre}" se añadió al carrito`,
                icon: 'success',
                confirmButtonColor: '#8B4513',
                timer: 1500,
                showConfirmButton: false
            });
        });
    });
}


// 🔄 Cargar productos desde JSON
fetch('./productos.json')
    .then(response => {
        if (!response.ok) {
            throw new Error("No se pudo cargar el archivo JSON");
        }
        return response.json();
    })
    .then(data => {
        crearTarjetasProductos(data);
    })
    .catch(error => {
        console.error("Error al cargar los productos:", error);
    });

    if (localStorage.getItem("productos")) {
    mostrarCarrito();
    actualizarTotales();
    revisarMensajeVacio();
}
