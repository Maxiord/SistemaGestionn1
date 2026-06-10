// Generar reportes del sistema (US10, US11, US12)

function generarReporteVentas() {
    console.log("\n==================== REPORTE DE VENTAS ====================");
    const { ventas } = require('./Venta');
    const { clientes } = require('./Cliente');

    if (ventas.length === 0) {
        console.log("No hay ventas registradas en el sistema.");
        console.log("===========================================================");
        return;
    }

    let ingresosTotales = 0;
    console.log(`Total de ventas registradas: ${ventas.length}\n`);

    ventas.forEach(v => {
        const cliente = clientes.find(c => c.id === v.clienteId);
        const clienteNombre = cliente ? cliente.nombre : `Desconocido (ID: ${v.clienteId})`;
        
        console.log(`Venta ID: ${v.id} | Fecha: ${v.fecha.toLocaleString()} | Cliente: ${clienteNombre}`);
        console.log("Detalle de productos vendidos:");
        v.detalles.forEach(d => {
            console.log(`  - ${d.nombre} (ID: ${d.productoId}) x ${d.cantidad} un. a $${d.precioUnitario} c/u (Subtotal: $${d.cantidad * d.precioUnitario})`);
        });
        console.log(`Total de esta venta: $${v.total}`);
        console.log("-----------------------------------------------------------");
        ingresosTotales += v.total;
    });

    console.log(`INGRESOS TOTALES POR VENTAS: $${ingresosTotales}`);
    console.log("===========================================================");
}

function generarReporteCompras() {
    console.log("\n==================== REPORTE DE COMPRAS ====================");
    const { compras } = require('./Compra');
    const { proveedores } = require('./Proveedor');

    if (compras.length === 0) {
        console.log("No hay compras registradas en el sistema.");
        console.log("===========================================================");
        return;
    }

    let egresosTotales = 0;
    console.log(`Total de compras registradas: ${compras.length}\n`);

    compras.forEach(c => {
        const proveedor = proveedores.find(p => p.id === c.proveedorId);
        const proveedorNombre = proveedor ? proveedor.nombre : `Desconocido (ID: ${c.proveedorId})`;

        console.log(`Compra ID: ${c.id} | Fecha: ${c.fecha.toLocaleString()} | Proveedor: ${proveedorNombre}`);
        console.log("Detalle de productos comprados:");
        c.detalles.forEach(d => {
            console.log(`  - ${d.nombre} (ID: ${d.productoId}) x ${d.cantidad} un. a $${d.precioUnitario} c/u (Subtotal: $${d.cantidad * d.precioUnitario})`);
        });
        console.log(`Total de esta compra: $${c.total}`);
        console.log("-----------------------------------------------------------");
        egresosTotales += c.total;
    });

    console.log(`EGRESOS TOTALES POR COMPRAS (INVERSIÓN): $${egresosTotales}`);
    console.log("===========================================================");
}

function generarReporteStock() {
    console.log("\n==================== REPORTE DE STOCK E INVENTARIO ====================");
    const { productos } = require('./Producto');
    const { stock } = require('./Stock');

    if (productos.length === 0) {
        console.log("No hay productos en el catálogo para generar reporte de stock.");
        console.log("=======================================================================");
        return;
    }

    let valorTotalInventario = 0;
    const productosBajoStock = [];

    console.log("Detalle del Inventario:");
    console.log("-----------------------------------------------------------------------");
    
    productos.forEach(p => {
        const cantidad = stock[p.id] !== undefined ? stock[p.id] : 0;
        const valorItem = cantidad * p.precio;
        valorTotalInventario += valorItem;

        console.log(`ID: ${p.id} | Producto: ${p.nombre.padEnd(25)} | Cantidad: ${cantidad.toString().padStart(4)} | Precio: $${p.precio.toString().padStart(7)} | Valor Total: $${valorItem.toString().padStart(8)}`);

        // Alerta de stock bajo (menos de 5 unidades)
        if (cantidad < 5) {
            productosBajoStock.push({ id: p.id, nombre: p.nombre, cantidad: cantidad });
        }
    });

    console.log("-----------------------------------------------------------------------");
    console.log(`VALOR TOTAL DEL INVENTARIO (a precio de venta): $${valorTotalInventario}`);
    console.log("-----------------------------------------------------------------------");

    console.log("\n⚠️ ALERTA DE STOCK BAJO (menos de 5 unidades):");
    if (productosBajoStock.length === 0) {
        console.log("  No hay productos con stock bajo. ¡Buen nivel de inventario!");
    } else {
        productosBajoStock.forEach(item => {
            console.log(`  - Producto: ${item.nombre} (ID: ${item.id}) | Quedan solo ${item.cantidad} unidades.`);
        });
    }
    console.log("=======================================================================");
}

module.exports = {
    generarReporteVentas,
    generarReporteCompras,
    generarReporteStock
};
