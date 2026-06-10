const prompt = require('./prompt');

class Cliente {
    constructor(id, nombre, dni, telefono, email) {
        this.id = id;
        this.nombre = nombre;
        this.dni = dni;
        this.telefono = telefono;
        this.email = email;
    }
}

// Base de datos en memoria
let clientes = [];

// Registrar cliente (US01)
function registrarCliente() {
    console.log("\n=== REGISTRAR NUEVO CLIENTE ===");
    const dni = prompt("Ingrese DNI del cliente:");
    if (!dni) {
        console.log("Error: El DNI es obligatorio.");
        return;
    }

    // Validar si ya existe un cliente con ese DNI
    const existe = clientes.find(c => c.dni === dni);
    if (existe) {
        console.log(`Error: Ya existe un cliente registrado con el DNI ${dni} (${existe.nombre}).`);
        return;
    }

    const nombre = prompt("Ingrese nombre del cliente:");
    if (!nombre) {
        console.log("Error: El nombre es obligatorio.");
        return;
    }

    const telefono = prompt("Ingrese teléfono del cliente:");
    const email = prompt("Ingrese email del cliente:");

    // Generar ID autoincremental
    const id = clientes.length > 0 ? Math.max(...clientes.map(c => c.id)) + 1 : 1;

    const nuevoCliente = new Cliente(id, nombre, dni, telefono, email);
    clientes.push(nuevoCliente);

    console.log("¡Cliente registrado con éxito!");
}

// Modificar cliente (US02)
function modificarCliente() {
    console.log("\n=== MODIFICAR CLIENTE ===");
    if (clientes.length === 0) {
        console.log("No hay clientes registrados en el sistema.");
        return;
    }

    const busqueda = prompt("Ingrese DNI o ID del cliente a modificar:");
    const cliente = clientes.find(c => c.dni === busqueda || c.id.toString() === busqueda);

    if (!cliente) {
        console.log("Error: Cliente no encontrado.");
        return;
    }

    console.log(`\nModificando cliente: ${cliente.nombre} (DNI: ${cliente.dni})`);
    console.log("(Presione ENTER sin escribir nada para conservar el valor actual)");

    const nuevoNombre = prompt(`Nombre [${cliente.nombre}]:`) || cliente.nombre;
    const nuevoTelefono = prompt(`Teléfono [${cliente.telefono || 'Sin registrar'}]:`) || cliente.telefono;
    const nuevoEmail = prompt(`Email [${cliente.email || 'Sin registrar'}]:`) || cliente.email;

    cliente.nombre = nuevoNombre;
    cliente.telefono = nuevoTelefono;
    cliente.email = nuevoEmail;

    console.log("¡Cliente modificado con éxito!");
}

// Listar clientes
function listarClientes() {
    console.log("\n==================== LISTA DE CLIENTES ====================");
    if (clientes.length === 0) {
        console.log("No hay clientes registrados.");
        console.log("===========================================================");
        return;
    }

    clientes.forEach(c => {
        console.log(`ID: ${c.id} | DNI: ${c.dni} | Nombre: ${c.nombre} | Tel: ${c.telefono || 'N/A'} | Email: ${c.email || 'N/A'}`);
    });
    console.log("===========================================================");
}

module.exports = {
    Cliente,
    clientes,
    registrarCliente,
    listarClientes,
    modificarCliente
};