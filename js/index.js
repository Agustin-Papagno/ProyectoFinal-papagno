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

crearTarjetasProductos(productos);