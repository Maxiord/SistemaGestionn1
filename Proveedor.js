const prompt = require('./prompt');

class Proveedor {
    constructor(id, nombre, telefono, email) {
        this.id = id;
        this.nombre = nombre;
        this.telefono = telefono;
        this.email = email;
    }
}

// Base de datos en memoria para proveedores
let proveedores = [];

// Registrar proveedor (US05)
function registrarProveedor() {
    console.log("\n=== REGISTRAR NUEVO PROVEEDOR ===");
    const nombre = prompt("Ingrese nombre del proveedor:");
    if (!nombre) {
        console.log("Error: El nombre es obligatorio.");
        return;
    }

    const telefono = prompt("Ingrese teléfono del proveedor:");
    const email = prompt("Ingrese email del proveedor:");

    // Generar ID autoincremental
    const id = proveedores.length > 0 ? Math.max(...proveedores.map(p => p.id)) + 1 : 1;

    const nuevoProveedor = new Proveedor(id, nombre, telefono, email);
    proveedores.push(nuevoProveedor);

    console.log(`¡Proveedor "${nombre}" registrado con éxito con ID: ${id}!`);
}

// Listar proveedores
function listarProveedores() {
    console.log("\n==================== LISTA DE PROVEEDORES ====================");
    if (proveedores.length === 0) {
        console.log("No hay proveedores registrados.");
        console.log("==============================================================");
        return;
    }

    proveedores.forEach(p => {
        console.log(`ID: ${p.id} | Nombre: ${p.nombre} | Tel: ${p.telefono || 'N/A'} | Email: ${p.email || 'N/A'}`);
    });
    console.log("==============================================================");
}

module.exports = {
    Proveedor,
    proveedores,
    registrarProveedor,
    listarProveedores
};
