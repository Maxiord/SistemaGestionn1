const prompt = require('./prompt');

class Venta {
    constructor(id, clienteId, fecha, detalles, total) {
        this.id = id;
        this.clienteId = clienteId;
        this.fecha = fecha;
        this.detalles = detalles; // Array de { productoId, cantidad, precioUnitario }
        this.total = total;
    }
}

// Base de datos en memoria para ventas
let ventas = [];

// Registrar venta (US07)
function registrarVenta() {
    console.log("\n=== REGISTRAR NUEVA VENTA ===");

    // Carga perezosa de dependencias
    const { clientes, listarClientes } = require('./Cliente');
    const { productos, listarProductos } = require('./Producto');
    const Stock = require('./Stock');

    if (clientes.length === 0) {
        console.log("Error: No hay clientes registrados. Debe registrar un cliente primero.");
        return;
    }

    // 1. Seleccionar cliente
    listarClientes();
    const clienteBusqueda = prompt("Ingrese el DNI o ID del cliente:");
    const cliente = clientes.find(c => c.dni === clienteBusqueda || c.id.toString() === clienteBusqueda);
    if (!cliente) {
        console.log("Error: Cliente no encontrado.");
        return;
    }

    if (productos.length === 0) {
        console.log("Error: No hay productos registrados.");
        return;
    }

    // 2. Cargar detalles de la venta
    const detalles = [];
    let agregarMas = true;

    // Mostrar stock actual antes de iniciar
    Stock.consultarStock();

    while (agregarMas) {
        console.log("\n--- Agregar Producto a la Venta ---");
        const productoIdInput = prompt("Ingrese el ID del producto:");
        const producto = productos.find(p => p.id.toString() === productoIdInput);

        if (!producto) {
            console.log("Error: Producto no encontrado. Reintente.");
            continue;
        }

        const stockDisponible = Stock.stock[producto.id] !== undefined ? Stock.stock[producto.id] : 0;
        if (stockDisponible <= 0) {
            console.log(`Error: No hay stock disponible para "${producto.nombre}".`);
            continue;
        }

        const cantidadStr = prompt(`Ingrese la cantidad de "${producto.nombre}" a vender (Disponibles: ${stockDisponible}):`);
        const cantidad = parseInt(cantidadStr, 10);
        if (isNaN(cantidad) || cantidad <= 0) {
            console.log("Error: La cantidad debe ser un número entero mayor a 0.");
            continue;
        }

        // Validar si hay stock suficiente
        // Nota: Si el mismo producto ya está en el detalle temporal, debemos considerar la cantidad acumulada
        const yaAgregado = detalles.find(d => d.productoId === producto.id);
        const cantidadAcumulada = (yaAgregado ? yaAgregado.cantidad : 0) + cantidad;

        if (cantidadAcumulada > stockDisponible) {
            console.log(`Error: Stock insuficiente. Stock disponible: ${stockDisponible} | Intentó agregar total: ${cantidadAcumulada}`);
            continue;
        }

        if (yaAgregado) {
            yaAgregado.cantidad = cantidadAcumulada;
        } else {
            detalles.push({
                productoId: producto.id,
                nombre: producto.nombre,
                cantidad: cantidad,
                precioUnitario: producto.precio // Precio catálogo
            });
        }

        console.log(`Agregado: ${producto.nombre} x ${cantidad} unidad(es).`);

        const respuesta = prompt("¿Desea agregar otro producto a esta venta? (s/n):");
        if (respuesta.toLowerCase() !== 's') {
            agregarMas = false;
        }
    }

    if (detalles.length === 0) {
        console.log("Operación cancelada: No se ingresaron productos.");
        return;
    }

    // 3. Calcular total e ID de venta
    const total = detalles.reduce((sum, item) => sum + (item.cantidad * item.precioUnitario), 0);
    const id = ventas.length > 0 ? Math.max(...ventas.map(v => v.id)) + 1 : 1;

    const nuevaVenta = new Venta(id, cliente.id, new Date(), detalles, total);
    ventas.push(nuevaVenta);

    // 4. Actualizar el stock decrementándolo automáticamente
    detalles.forEach(item => {
        Stock.decrementarStock(item.productoId, item.cantidad);
    });

    console.log(`\n¡Venta registrada con éxito! ID de venta: ${id}. Total: $${total}`);
}

module.exports = {
    Venta,
    ventas,
    registrarVenta
};
