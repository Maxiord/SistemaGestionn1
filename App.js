const prompt = require('./prompt');
const Cliente = require('./Cliente');
const Producto = require('./Producto');
const Proveedor = require('./Proveedor');
const Stock = require('./Stock');
const Compra = require('./Compra');
const Venta = require('./Venta');
const Reporte = require('./Reporte');

function presionarEnterParaContinuar() {
    prompt("\nPresione ENTER para continuar...");
}

function menuClientes() {
    let volver = false;
    while (!volver) {
        console.clear();
        console.log("=================================================");
        console.log("             GESTIÓN DE CLIENTES                 ");
        console.log("=================================================");
        console.log("1. Registrar Cliente (US01)");
        console.log("2. Modificar Cliente (US02)");
        console.log("3. Listar Clientes");
        console.log("4. Volver al Menú Principal");
        console.log("=================================================");
        
        const opcion = prompt("Seleccione una opción (1-4):");
        switch (opcion) {
            case '1':
                Cliente.registrarCliente();
                presionarEnterParaContinuar();
                break;
            case '2':
                Cliente.modificarCliente();
                presionarEnterParaContinuar();
                break;
            case '3':
                Cliente.listarClientes();
                presionarEnterParaContinuar();
                break;
            case '4':
                volver = true;
                break;
            default:
                console.log("Opción inválida. Reintente.");
                presionarEnterParaContinuar();
        }
    }
}

function menuProductos() {
    let volver = false;
    while (!volver) {
        console.clear();
        console.log("=================================================");
        console.log("             GESTIÓN DE PRODUCTOS                ");
        console.log("=================================================");
        console.log("1. Registrar Producto (US03)");
        console.log("2. Modificar Producto (US04)");
        console.log("3. Listar Productos");
        console.log("4. Volver al Menú Principal");
        console.log("=================================================");
        
        const opcion = prompt("Seleccione una opción (1-4):");
        switch (opcion) {
            case '1':
                Producto.registrarProducto();
                presionarEnterParaContinuar();
                break;
            case '2':
                Producto.modificarProducto();
                presionarEnterParaContinuar();
                break;
            case '3':
                Producto.listarProductos();
                presionarEnterParaContinuar();
                break;
            case '4':
                volver = true;
                break;
            default:
                console.log("Opción inválida. Reintente.");
                presionarEnterParaContinuar();
        }
    }
}

function menuProveedores() {
    let volver = false;
    while (!volver) {
        console.clear();
        console.log("=================================================");
        console.log("            GESTIÓN DE PROVEEDORES               ");
        console.log("=================================================");
        console.log("1. Registrar Proveedor (US05)");
        console.log("2. Listar Proveedores");
        console.log("3. Volver al Menú Principal");
        console.log("=================================================");
        
        const opcion = prompt("Seleccione una opción (1-3):");
        switch (opcion) {
            case '1':
                Proveedor.registrarProveedor();
                presionarEnterParaContinuar();
                break;
            case '2':
                Proveedor.listarProveedores();
                presionarEnterParaContinuar();
                break;
            case '3':
                volver = true;
                break;
            default:
                console.log("Opción inválida. Reintente.");
                presionarEnterParaContinuar();
        }
    }
}

function menuStock() {
    let volver = false;
    while (!volver) {
        console.clear();
        console.log("=================================================");
        console.log("               GESTIÓN DE STOCK                  ");
        console.log("=================================================");
        console.log("1. Consultar Stock (US08)");
        console.log("2. Actualizar Stock Manual (US09)");
        console.log("3. Volver al Menú Principal");
        console.log("=================================================");
        
        const opcion = prompt("Seleccione una opción (1-3):");
        switch (opcion) {
            case '1':
                Stock.consultarStock();
                presionarEnterParaContinuar();
                break;
            case '2':
                Stock.actualizarStockManual();
                presionarEnterParaContinuar();
                break;
            case '3':
                volver = true;
                break;
            default:
                console.log("Opción inválida. Reintente.");
                presionarEnterParaContinuar();
        }
    }
}

function menuReportes() {
    let volver = false;
    while (!volver) {
        console.clear();
        console.log("=================================================");
        console.log("             SISTEMA DE REPORTES                 ");
        console.log("=================================================");
        console.log("1. Reporte de Ventas (US10)");
        console.log("2. Reporte de Compras (US11)");
        console.log("3. Reporte de Stock / Inventario (US12)");
        console.log("4. Volver al Menú Principal");
        console.log("=================================================");
        
        const opcion = prompt("Seleccione una opción (1-4):");
        switch (opcion) {
            case '1':
                Reporte.generarReporteVentas();
                presionarEnterParaContinuar();
                break;
            case '2':
                Reporte.generarReporteCompras();
                presionarEnterParaContinuar();
                break;
            case '3':
                Reporte.generarReporteStock();
                presionarEnterParaContinuar();
                break;
            case '4':
                volver = true;
                break;
            default:
                console.log("Opción inválida. Reintente.");
                presionarEnterParaContinuar();
        }
    }
}

function main() {
    let salir = false;
    while (!salir) {
        console.clear();
        console.log("=================================================");
        console.log("    SISTEMA DE GESTIÓN - TIENDA DE TECNOLOGÍA    ");
        console.log("=================================================");
        console.log("1. Gestión de Clientes");
        console.log("2. Gestión de Productos");
        console.log("3. Gestión de Proveedores");
        console.log("4. Registrar Compra (US06)");
        console.log("5. Registrar Venta (US07)");
        console.log("6. Consultar / Modificar Stock");
        console.log("7. Reportes");
        console.log("8. Salir");
        console.log("=================================================");
        
        const opcion = prompt("Seleccione una opción (1-8):");
        switch (opcion) {
            case '1':
                menuClientes();
                break;
            case '2':
                menuProductos();
                break;
            case '3':
                menuProveedores();
                break;
            case '4':
                Compra.registrarCompra();
                presionarEnterParaContinuar();
                break;
            case '5':
                Venta.registrarVenta();
                presionarEnterParaContinuar();
                break;
            case '6':
                menuStock();
                break;
            case '7':
                menuReportes();
                break;
            case '8':
                console.log("\n¡Gracias por utilizar el sistema!");
                salir = true;
                break;
            default:
                console.log("Opción inválida. Reintente.");
                presionarEnterParaContinuar();
        }
    }
}

// Ejecutar menú si se ejecuta el archivo directamente
if (require.main === module) {
    main();
}

module.exports = {
    main
};
