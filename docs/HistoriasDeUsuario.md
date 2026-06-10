# Historias de Usuario

## US01 - Registrar Cliente

COMO vendedor

QUIERO registrar nuevos clientes

PARA asociarlos a futuras ventas.

### Criterios de aceptación

**Escenario: Registro exitoso de cliente**

DADO que me encuentro en el módulo de clientes

CUANDO ingreso correctamente los datos requeridos y confirmo la operación

ENTONCES el sistema debe registrar el cliente y mostrar un mensaje de éxito.

---

## US02 - Modificar Cliente

COMO vendedor

QUIERO modificar los datos de un cliente existente

PARA mantener actualizada su información.

### Criterios de aceptación

**Escenario: Modificación exitosa**

DADO que el cliente existe en el sistema

CUANDO actualizo sus datos y guardo los cambios

ENTONCES el sistema debe almacenar la nueva información correctamente.

---

## US03 - Registrar Producto

COMO administrador

QUIERO registrar nuevos productos

PARA incorporarlos al catálogo de ventas.

### Criterios de aceptación

**Escenario: Registro exitoso de producto**

DADO que dispongo de los datos del producto

CUANDO completo la información requerida y confirmo el registro

ENTONCES el sistema debe almacenar el producto correctamente.

---

## US04 - Modificar Producto

COMO administrador

QUIERO actualizar la información de un producto

PARA mantener el catálogo actualizado.

### Criterios de aceptación

**Escenario: Actualización exitosa**

DADO que el producto existe

CUANDO modifico sus datos y guardo los cambios

ENTONCES el sistema debe actualizar la información del producto.

---

## US05 - Registrar Proveedor

COMO administrador

QUIERO registrar proveedores

PARA gestionar las compras de mercadería.

### Criterios de aceptación

**Escenario: Registro exitoso de proveedor**

DADO que poseo los datos del proveedor

CUANDO completo el formulario y confirmo

ENTONCES el sistema debe registrar el proveedor correctamente.

---

## US06 - Registrar Compra

COMO encargado de compras

QUIERO registrar compras de productos

PARA actualizar el inventario disponible.

### Criterios de aceptación

**Escenario: Compra registrada**

DADO que existen proveedores y productos registrados

CUANDO ingreso los datos de la compra y confirmo

ENTONCES el sistema debe registrar la compra y aumentar el stock correspondiente.

---

## US07 - Registrar Venta

COMO vendedor

QUIERO registrar ventas de productos

PARA controlar las operaciones comerciales.

### Criterios de aceptación

**Escenario: Venta registrada**

DADO que existen productos con stock disponible

CUANDO registro una venta y la confirmo

ENTONCES el sistema debe guardar la venta y descontar automáticamente el stock.

---

## US08 - Consultar Stock

COMO administrador

QUIERO consultar el stock disponible

PARA conocer la cantidad actual de productos.

### Criterios de aceptación

**Escenario: Consulta de stock**

DADO que existen productos registrados

CUANDO accedo al módulo de stock

ENTONCES el sistema debe mostrar la cantidad disponible de cada producto.

---

## US09 - Actualizar Stock

COMO administrador

QUIERO actualizar manualmente el stock

PARA corregir diferencias de inventario.

### Criterios de aceptación

**Escenario: Actualización de stock**

DADO que selecciono un producto existente

CUANDO ingreso una nueva cantidad y confirmo

ENTONCES el sistema debe actualizar el stock correctamente.

---

## US10 - Generar Reporte de Ventas

COMO administrador

QUIERO generar reportes de ventas

PARA analizar el rendimiento comercial.

### Criterios de aceptación

**Escenario: Reporte generado**

DADO que existen ventas registradas

CUANDO solicito un reporte de ventas

ENTONCES el sistema debe mostrar la información correspondiente.

---

## US11 - Generar Reporte de Compras

COMO administrador

QUIERO generar reportes de compras

PARA controlar las adquisiciones realizadas.

### Criterios de aceptación

**Escenario: Reporte generado**

DADO que existen compras registradas

CUANDO solicito un reporte de compras

ENTONCES el sistema debe mostrar los datos correspondientes.

---

## US12 - Generar Reporte de Stock

COMO administrador

QUIERO generar reportes de stock

PARA conocer el estado actual del inventario.

### Criterios de aceptación

**Escenario: Reporte generado**

DADO que existen productos registrados

CUANDO solicito un reporte de stock

ENTONCES el sistema debe mostrar el inventario actualizado.

