const fs = require('fs');

/**
 * Muestra un mensaje en consola y lee de forma síncrona la entrada del usuario.
 * @param {string} mensaje El mensaje a mostrar al usuario.
 * @returns {string} La entrada del usuario limpia de saltos de línea.
 */
function prompt(mensaje) {
    process.stdout.write(mensaje + " ");
    const buffer = Buffer.alloc(1024);
    try {
        const bytesRead = fs.readSync(0, buffer, 0, 1024, null);
        // Retornamos quitando el salto de línea al final (soportando \r\n de Windows y \n de Unix)
        return buffer.toString('utf8', 0, bytesRead).replace(/\r?\n$/, '');
    } catch (e) {
        return "";
    }
}

module.exports = prompt;
