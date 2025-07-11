function agregarAlCarrito(producto) {
    let memoria = JSON.parse(localStorage.getItem("productos")) || [];

    const indiceProducto = memoria.findIndex(cafe => cafe.id === producto.id);

    let cuenta = 0;

    if (indiceProducto === -1) {
        const nuevoProducto = getNuevoProductoParaMemoria(producto);
        memoria.push(nuevoProducto);
        cuenta = 1;
    } else {
        memoria[indiceProducto].cantidad++;
        cuenta = memoria[indiceProducto].cantidad;
    }
    localStorage.setItem("productos", JSON.stringify(memoria));
   
    actualizarNumeroCarrito()
    return cuenta;



}
     

function restarAlCarrito(producto) {
    let memoria = JSON.parse(localStorage.getItem("productos")) || [];
    const indiceProducto = memoria.findIndex(cafe => cafe.id === producto.id);
    if (memoria[indiceProducto].cantidad === 1) {
        memoria.splice(indiceProducto, 1);
        localStorage.setItem("productos", JSON.stringify(memoria));
        cuenta = 1;

    } else {
        memoria[indiceProducto].cantidad--;
        cuenta = memoria[indiceProducto].cantidad;
    }
    localStorage.setItem("productos", JSON.stringify(memoria));
    actualizarNumeroCarrito();
    return cuenta;
}

function getNuevoProductoParaMemoria(producto) {
    return {
        ...producto,
        cantidad: 1
    };
}

const cuentaCarritoElement = document.getElementById("cuenta-carrito")

function actualizarNumeroCarrito() {
    const memoria = JSON.parse(localStorage.getItem("productos")) || [];
    if(memoria && memoria.length>0){
    const cuenta = memoria.reduce((acum, current) => acum + current.cantidad, 0);
    cuentaCarritoElement.innerText = cuenta;
    }
}