class Cliente {
    constructor(nombre, dni) {
        this.nombre = nombre;
        this.dni = dni;
    }
}

// Base de datos en memoria
let clientes = [];

// Registrar cliente
function registrarCliente() {
    const nombre = prompt("Ingrese nombre del cliente:");
    const dni = prompt("Ingrese DNI del cliente:");

    const cliente = new Cliente(nombre, dni);
    clientes.push(cliente);

    console.log("Cliente registrado con éxito!");
}

// Listar clientes
function listarClientes() {
    console.log("\n--- LISTA DE CLIENTES ---");

    if (clientes.length === 0) {
        console.log("No hay clientes registrados.");
        return;
    }

    clientes.forEach((c, i) => {
        console.log(`${i + 1}. ${c.nombre} - ${c.dni}`);
    });
}

module.exports = {
    registrarCliente,
    listarClientes
};
