function crearTablaContactosOk(obj) {
    // Validar datos
    if (!obj || obj.length === 0) {
        contenedorContactos.innerHTML = '<p class="alert alert-warning">No hay contactos.</p>';
        return;
    }

    // Crear tabla
    let tabla = document.createElement('table');
    tabla.id = 'tablaContactos';
    let thead = document.createElement('thead');
    let tbody = document.createElement('tbody');

    // Recorrer todas las filas
    obj.forEach((filaActual, i) => {
        let fila = document.createElement('tr');

        // Si es la cabecera (i === 0), creamos los <th> y añadimos una columna extra para acciones
        if (i === 0) {
            // Primero, las columnas de datos
            filaActual.forEach(celdaActual => {
                let th = document.createElement('th');
                th.textContent = celdaActual;
                fila.appendChild(th);
            });
            // Añadir columna de acciones (cabecera)
            let thAcciones = document.createElement('th');
            thAcciones.textContent = 'Acciones';
            fila.appendChild(thAcciones);
            thead.appendChild(fila);
        } 
        else {
            // Filas de datos
            // Recorremos las celdas de datos (todas las columnas)
            filaActual.forEach(celdaActual => {
                let td = document.createElement('td');
                td.textContent = celdaActual;
                fila.appendChild(td);
            });

            // Crear celda de acciones con botones
            let tdAcciones = document.createElement('td');
            tdAcciones.classList.add('text-center');

            // Botón Editar
            let btnEditar = document.createElement('button');
            btnEditar.textContent = 'Editar';
            btnEditar.classList.add('btn', 'btn-warning', 'btn-sm', 'me-1');
            // Usamos el índice de la fila (i) como identificador, pero en la hoja es i (porque i empieza en 1 para datos)
            // Pero ojo: la fila 1 del array corresponde a la fila 2 de la hoja (porque la fila 0 es cabecera)
            // Así que el número de fila en la hoja es i+1
            btnEditar.dataset.fila = i; // Guardamos el índice del array
            btnEditar.addEventListener('click', function() {
                editarContacto(i); // Llamamos a la función con el índice
            });

            // Botón Eliminar
            let btnEliminar = document.createElement('button');
            btnEliminar.textContent = 'Eliminar';
            btnEliminar.classList.add('btn', 'btn-danger', 'btn-sm');
            btnEliminar.dataset.fila = i;
            btnEliminar.addEventListener('click', function() {
                eliminarContacto(i);
            });

            tdAcciones.appendChild(btnEditar);
            tdAcciones.appendChild(btnEliminar);
            fila.appendChild(tdAcciones);

            tbody.appendChild(fila);
        }
    });

    // Estilos
    thead.classList.add('table-dark');
    tabla.classList.add('table', 'table-striped', 'border', 'border-4', 'table-dark', 'border-dark');
    tabla.appendChild(thead);
    tabla.appendChild(tbody);

    // Limpiar y mostrar
    contenedorContactos.innerHTML = '';
    contenedorContactos.appendChild(tabla);

    crearNotificacionOk('Contactos cargados correctamente', 'Éxito');
}