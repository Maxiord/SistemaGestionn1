const prompt = require('./prompt');

// Base de datos en memoria para el stock (clave: productoId, valor: cantidad)
let stock = {};

// Inicializar stock para un nuevo producto (con cantidad 0)
function inicializarStock(productoId) {
    stock[productoId] = 0;
}

// Incrementar stock (compras)
function incrementarStock(productoId, cantidad) {
    if (stock[productoId] === undefined) {
        stock[productoId] = 0;
    }
    stock[productoId] += cantidad;
}

// Decrementar stock (ventas)
function decrementarStock(productoId, cantidad) {
    if (stock[productoId] === undefined) {
        stock[productoId] = 0;
    }
    stock[productoId] -= cantidad;
}

// Actualizar stock directamente (manual o ajuste)
function actualizarStock(productoId, cantidad) {
    stock[productoId] = cantidad;
}

// Consultar stock (US08)
function consultarStock() {
    // Requerimos Producto dentro de la función para evitar dependencias circulares en la carga
    const { productos } = require('./Producto');

    console.log("\n==================== STOCK DE PRODUCTOS ====================");
    if (productos.length === 0) {
        console.log("No hay productos registrados en el sistema.");
        console.log("===========================================================");
        return;
    }

    productos.forEach(p => {
        const cant = stock[p.id] !== undefined ? stock[p.id] : 0;
        console.log(`ID: ${p.id} | Producto: ${p.nombre} | Categoría: ${p.categoria} | Precio: $${p.precio} | Disponible: ${cant} unidades`);
    });
    console.log("===========================================================");
}

// Actualizar stock manualmente (US09)
function actualizarStockManual() {
    const { productos } = require('./Producto');

    console.log("\n=== ACTUALIZAR STOCK MANUALMENTE ===");
    if (productos.length === 0) {
        console.log("No hay productos registrados para actualizar stock.");
        return;
    }

    // Listar productos primero para facilitar la selección al usuario
    console.log("Productos disponibles:");
    productos.forEach(p => console.log(`  ID: ${p.id} - ${p.nombre} (Stock actual: ${stock[p.id] || 0})`));

    const idBusqueda = prompt("Ingrese el ID del producto a modificar:");
    const producto = productos.find(p => p.id.toString() === idBusqueda);

    if (!producto) {
        console.log("Error: Producto no encontrado.");
        return;
    }

    const nuevaCantidadStr = prompt(`Ingrese la nueva cantidad para ${producto.nombre} (actual: ${stock[producto.id] || 0}):`);
    const nuevaCantidad = parseInt(nuevaCantidadStr, 10);

    if (isNaN(nuevaCantidad) || nuevaCantidad < 0) {
        console.log("Error: La cantidad debe ser un número entero mayor o igual a 0.");
        return;
    }

    actualizarStock(producto.id, nuevaCantidad);
    console.log(`¡Stock de ${producto.nombre} actualizado con éxito a ${nuevaCantidad} unidades!`);
}

module.exports = {
    stock,
    inicializarStock,
    incrementarStock,
    decrementarStock,
    actualizarStock,
    consultarStock,
    actualizarStockManual
};
