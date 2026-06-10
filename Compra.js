const prompt = require('./prompt');

class Compra {
    constructor(id, proveedorId, fecha, detalles, total) {
        this.id = id;
        this.proveedorId = proveedorId;
        this.fecha = fecha;
        this.detalles = detalles; // Array de { productoId, cantidad, precioUnitario }
        this.total = total;
    }
}

// Base de datos en memoria para compras
let compras = [];

// Registrar compra (US06)
function registrarCompra() {
    console.log("\n=== REGISTRAR NUEVA COMPRA ===");
    
    // Carga perezosa de dependencias
    const { proveedores, listarProveedores } = require('./Proveedor');
    const { productos, listarProductos } = require('./Producto');
    const Stock = require('./Stock');

    if (proveedores.length === 0) {
        console.log("Error: No hay proveedores registrados. Debe registrar un proveedor primero.");
        return;
    }

    // 1. Seleccionar proveedor
    listarProveedores();
    const proveedorIdInput = prompt("Ingrese el ID del proveedor:");
    const proveedor = proveedores.find(p => p.id.toString() === proveedorIdInput);
    if (!proveedor) {
        console.log("Error: Proveedor no encontrado.");
        return;
    }

    if (productos.length === 0) {
        console.log("Error: No hay productos registrados. Debe registrar un producto primero.");
        return;
    }

    // 2. Cargar detalles de la compra
    const detalles = [];
    let agregarMas = true;

    listarProductos();

    while (agregarMas) {
        console.log("\n--- Agregar Producto a la Compra ---");
        const productoIdInput = prompt("Ingrese el ID del producto (o presione ENTER para finalizar/cancelar):");
        if (!productoIdInput) {
            break;
        }
        const producto = productos.find(p => p.id.toString() === productoIdInput);

        if (!producto) {
            console.log("Error: Producto no encontrado. Reintente.");
            continue;
        }

        const cantidadStr = prompt(`Ingrese la cantidad de "${producto.nombre}" a comprar:`);
        const cantidad = parseInt(cantidadStr, 10);
        if (isNaN(cantidad) || cantidad <= 0) {
            console.log("Error: La cantidad debe ser un número entero mayor a 0.");
            continue;
        }

        const precioStr = prompt(`Ingrese el precio de compra unitario para "${producto.nombre}" (Precio de venta sugerido: $${producto.precio}):`);
        const precioUnitario = parseFloat(precioStr);
        if (isNaN(precioUnitario) || precioUnitario <= 0) {
            console.log("Error: El precio de compra debe ser un número mayor a 0.");
            continue;
        }

        // Agregar al listado temporal de esta compra
        detalles.push({
            productoId: producto.id,
            nombre: producto.nombre,
            cantidad: cantidad,
            precioUnitario: precioUnitario
        });

        const respuesta = prompt("¿Desea agregar otro producto a esta compra? (s/n):");
        if (respuesta.toLowerCase() !== 's') {
            agregarMas = false;
        }
    }

    if (detalles.length === 0) {
        console.log("Operación cancelada: No se ingresaron productos.");
        return;
    }

    // 3. Calcular total e ID de compra
    const total = detalles.reduce((sum, item) => sum + (item.cantidad * item.precioUnitario), 0);
    const id = compras.length > 0 ? Math.max(...compras.map(c => c.id)) + 1 : 1;

    const nuevaCompra = new Compra(id, proveedor.id, new Date(), detalles, total);
    compras.push(nuevaCompra);

    // 4. Actualizar el stock incrementándolo
    detalles.forEach(item => {
        Stock.incrementarStock(item.productoId, item.cantidad);
    });

    console.log(`\n¡Compra registrada con éxito! ID de compra: ${id}. Total: $${total}`);
}

module.exports = {
    Compra,
    compras,
    registrarCompra
};
