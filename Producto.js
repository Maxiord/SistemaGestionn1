const prompt = require('./prompt');
const Stock = require('./Stock');

class Producto {
    constructor(id, nombre, precio, categoria) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.categoria = categoria;
    }
}

// Base de datos en memoria para productos
let productos = [];

// Registrar producto (US03)
function registrarProducto() {
    console.log("\n=== REGISTRAR NUEVO PRODUCTO ===");
    const nombre = prompt("Ingrese nombre del producto:");
    if (!nombre) {
        console.log("Error: El nombre es obligatorio.");
        return;
    }

    const precioStr = prompt("Ingrese precio del producto:");
    const precio = parseFloat(precioStr);
    if (isNaN(precio) || precio <= 0) {
        console.log("Error: El precio debe ser un número mayor a 0.");
        return;
    }

    const categoria = prompt("Ingrese categoría del producto:");
    if (!categoria) {
        console.log("Error: La categoría es obligatoria.");
        return;
    }

    // Generar ID autoincremental
    const id = productos.length > 0 ? Math.max(...productos.map(p => p.id)) + 1 : 1;

    const nuevoProducto = new Producto(id, nombre, precio, categoria);
    productos.push(nuevoProducto);

    // Inicializar stock en 0
    Stock.inicializarStock(id);

    console.log(`¡Producto "${nombre}" registrado con éxito con ID: ${id} e inicializado en stock con 0 unidades!`);
}

// Modificar producto (US04)
function modificarProducto() {
    console.log("\n=== MODIFICAR PRODUCTO ===");
    if (productos.length === 0) {
        console.log("No hay productos registrados en el sistema.");
        return;
    }

    const idBusqueda = prompt("Ingrese el ID del producto a modificar:");
    const producto = productos.find(p => p.id.toString() === idBusqueda);

    if (!producto) {
        console.log("Error: Producto no encontrado.");
        return;
    }

    console.log(`\nModificando producto: ${producto.nombre} (Categoría: ${producto.categoria})`);
    console.log("(Presione ENTER sin escribir nada para conservar el valor actual)");

    const nuevoNombre = prompt(`Nombre [${producto.nombre}]:`) || producto.nombre;

    let nuevoPrecio = producto.precio;
    const nuevoPrecioStr = prompt(`Precio [$${producto.precio}]:`);
    if (nuevoPrecioStr) {
        const parsedPrecio = parseFloat(nuevoPrecioStr);
        if (isNaN(parsedPrecio) || parsedPrecio <= 0) {
            console.log("Error: Precio inválido. Se conservará el precio actual.");
        } else {
            nuevoPrecio = parsedPrecio;
        }
    }

    const nuevaCategoria = prompt(`Categoría [${producto.categoria}]:`) || producto.categoria;

    producto.nombre = nuevoNombre;
    producto.precio = nuevoPrecio;
    producto.categoria = nuevaCategoria;

    console.log("¡Producto modificado con éxito!");
}

// Listar productos
function listarProductos() {
    console.log("\n==================== LISTA DE PRODUCTOS ====================");
    if (productos.length === 0) {
        console.log("No hay productos registrados.");
        console.log("===========================================================");
        return;
    }

    productos.forEach(p => {
        console.log(`ID: ${p.id} | Nombre: ${p.nombre} | Categoría: ${p.categoria} | Precio: $${p.precio}`);
    });
    console.log("===========================================================");
}

module.exports = {
    Producto,
    productos,
    registrarProducto,
    modificarProducto,
    listarProductos
};
