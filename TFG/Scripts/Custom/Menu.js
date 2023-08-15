
const numProcesosInput = document.getElementById("numProcesos");
const procesosDiv = document.getElementById("Procesos");



function cambioSeleccion(numProceso) {

    const miSelector = document.getElementById(`numRafagas${numProceso}`);

    const indiceSeleccionado = miSelector.selectedIndex; // Índice del elemento seleccionado
    const opcionSeleccionada = miSelector.options[indiceSeleccionado]; // Elemento de opción seleccionado
    const valorOpcionSeleccionada = opcionSeleccionada.value; // Valor del atributo "value" de la opción seleccionada

    const numRafagas = parseInt(valorOpcionSeleccionada);


    var index = "proceso" + numProceso;
    const procesoDiv = document.getElementById(index);
    //procesoDiv.innerHTML = ''; // Limpia contenido anterior

    // Seleccionar todos los elementos div con id que empiezan con "proceso1-rafaga"
    const elementosDiv = document.querySelectorAll('[id^="proceso' + numProceso + '-rafaga"]');
    // Iterar sobre los elementos y vaciar su contenido
    elementosDiv.forEach((elemento) => {
        elemento.innerHTML = ""; // Vaciar el contenido del div
    });

    for (let j = 1; j <= numRafagas; j++) {
        const divRafaga = document.createElement('div');
        divRafaga.id = "proceso" + numProceso + "-rafaga"+j; // Asignar el ID único al div
        divRafaga.classList.add("text-center"); // Agregar la clase que centra el contenido

        // LABEL TIEMPO DE LA RAFAGA
        const labelRafaga = document.createElement('label');
        labelRafaga.htmlFor = `tProceso` + numProceso + `Rafaga${j}`;
        labelRafaga.textContent = `${j} Ráfaga: `;
        divRafaga.appendChild(labelRafaga);

        // INPUT TEXT TIEMPO DE LA RAFAGA
        const inputRafaga = document.createElement('input');
        inputRafaga.type = 'text';
        inputRafaga.id = `tProceso` + numProceso + `Rafaga${j}`;
        divRafaga.appendChild(inputRafaga);

        // LABEL INDICANDO EL TIPO
        const opcionesRafaga = document.createElement('label');
        if (j % 2 == 0) {
            opcionesRafaga.textContent = ` Disco`;
        }
        else {
            opcionesRafaga.textContent = ` CPU`;
        }
        opcionesRafaga.style.fontWeight = "bold";
        divRafaga.appendChild(opcionesRafaga);

        procesoDiv.appendChild(divRafaga)
    }
}



numProcesosInput.addEventListener("input", function () {
    procesosDiv.innerHTML = ""; // Limpiar contenido anterior
    const numProcesos = parseInt(numProcesosInput.value);
    for (let i = 1; i <= numProcesos; i++) {
        const div = document.createElement(`div`);
        div.id = `proceso${i}`; // Asignar el ID único al div
        div.classList.add("text-center"); // Agregar la clase que centra el contenido

        // CABECERA
        //div.innerHTML = `<h3 class="text-center">---------------- Proceso ${i} ----------------</h3>`;
        const header = document.createElement('h3');
        header.classList.add('text-center');
        header.textContent = `---------------- Proceso ${i} ----------------`;
        div.appendChild(header);

        // LABEL TIEMPO DE LLEGADA
        //div.innerHTML += `<label for= "tllegada${i}">Introduzca el tiempo de llegada:&nbsp</label>`;
        const labelTllegada = document.createElement('label');
        labelTllegada.htmlFor = `tllegada${i}`;
        labelTllegada.textContent = 'Introduzca el tiempo de llegada: ';

        // INPUT TEXT TIEMPO DE LLEGADA
        //div.innerHTML += `<input type="text" id="tllegada${i}">`;
        const inputTllegada = document.createElement('input');
        inputTllegada.type = 'text';
        inputTllegada.id = `tllegada${i}`;
        labelTllegada.appendChild(inputTllegada);
        div.appendChild(labelTllegada);

        // SALTO DE LINEA
        //div.innerHTML += '<br/>';
        const br = document.createElement('br');
        div.appendChild(br);

        // LABEL NUMERO DE RAFAGAS
        //div.innerHTML += '<label for= "numRafagas">Introduzca el número de ráfagas:&nbsp</label>';
        const labelNumRafagas = document.createElement('label');
        labelNumRafagas.htmlFor = `numRafagas${i}`;
        labelNumRafagas.textContent = 'Introduzca el número de ráfagas: ';

        // div.innerHTML += `<input type="text" id="numRafagas${i}">`;
        // SELECT NUMERO DE RAFAGAS
        const inputNumRafagas = document.createElement('select');
        inputNumRafagas.id = `numRafagas${i}`;
        inputNumRafagas.setAttribute("onchange", "cambioSeleccion("+i+")");
        for (let optionValue = 1; optionValue <= 10; optionValue++) {
            const option = document.createElement('option');
            option.value = optionValue;
            option.textContent = optionValue;
            inputNumRafagas.appendChild(option);
        }
        labelNumRafagas.appendChild(inputNumRafagas);
        div.appendChild(labelNumRafagas);

        procesosDiv.appendChild(div);
    }
});


