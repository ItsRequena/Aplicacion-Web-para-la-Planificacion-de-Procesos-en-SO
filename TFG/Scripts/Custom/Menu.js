const numProcesosInput = document.getElementById("numProcesos");
const procesosDiv = document.getElementById("Procesos");
const algoritmo = document.getElementById("algoritmo");

const tecnicaDiv = document.getElementById('divtecnica');
const tecnicaSelector = document.getElementById('tecnica');
const tecnicaLabel = document.querySelector('label[for="tecnica"]');

const cuantoDiv = document.getElementById('divcuanto');
const cuantoInput = document.getElementById('cuanto');
const cuantoLabel = document.querySelector('label[for="cuanto"]');



//Funcion para la aparicion de las tecnicas cuando see pulsa sobre SJF
algoritmo.addEventListener("change", function () {
    const selectedOption = algoritmo.options[algoritmo.selectedIndex];
    if (selectedOption.value == 'sjf') {
        tecnicaDiv.hidden = false;
        tecnicaSelector.hidden = false;
        tecnicaLabel.hidden = false;
        cuantoDiv.hidden = true;
        cuantoInput.hidden = true;
        cuantoLabel.hidden = true;
    }
    else if (selectedOption.value == 'rr') {
        tecnicaDiv.hidden = true;
        tecnicaSelector.hidden = true;
        tecnicaLabel.hidden = true;
        cuantoDiv.hidden = false;
        cuantoInput.hidden = false;
        cuantoLabel.hidden = false;
    }
    else {
        tecnicaDiv.hidden = true;
        tecnicaSelector.hidden = true;
        tecnicaLabel.hidden = true;
        cuantoDiv.hidden = true;
        cuantoInput.hidden = true;
        cuantoLabel.hidden = true;
    }
});

// Funcion para la aparición de las rafagas de un proceso
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
        divRafaga.id = "proceso" + numProceso + "-rafaga" + j; // Asignar el ID único al div
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
        inputRafaga.classList.add("text-center");
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
        opcionesRafaga.classList.add("text-center");
        divRafaga.appendChild(opcionesRafaga);

        procesoDiv.appendChild(divRafaga)
    }
}

// Funcion para la aparición de los procesos
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
        inputNumRafagas.setAttribute("onchange", "cambioSeleccion(" + i + ")");
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


// Funcion para calcular la planificacion FCFS
function calcular() {
    // Recogida de datos
    var data = {};
    console.log("numProcesos: " + numProcesosInput.value);
    //data.numProcesos = numProcesosInput.value;

    var tllegada = [];
    var listaProcesos = [];
    for (let i = 0; i < numProcesosInput.value; i++) {

        // Obtenemos el tiempo de llegada del proceso
        var llegada = document.getElementById(`tllegada${i + 1}`);
        console.log("tLLegada: " + llegada.value)
        tllegada.push(llegada.value);

        // Obtenemos las rafagas del proceso
        var numeroRafagas = document.getElementById(`numRafagas${i + 1}`);
        console.log("numero rafagas: " + numeroRafagas.value);

        var rafagas = [];
        for (let j = 1; j <= numeroRafagas.value; j++) {
            var rafaga = document.getElementById(`tProceso${i + 1}Rafaga${j}`);
            console.log("rafaga" + j + ": " + rafaga.value);
            rafagas.push(rafaga.value);
        }
        var proceso = i;
        console.log("proceso: " + proceso);
        listaProcesos[i] = rafagas;

    }
    console.log(data);
    data.tllegada = tllegada;
    data.listaProcesos = listaProcesos;

    console.log("Algoritmo: " + algoritmo.value);
    console.log("Tecnica: " + tecnicaSelector.value);

    if (algoritmo.value == 'fcfs') {
        $.ajax({
            url: '/Menu/FCFS',
            data: JSON.stringify(data),
            async: true,
            method: 'POST',
            contentType: 'application/json',
            success: function (data) {
                console.log("------------");
                console.log(data);
                var contenido = "";
                for (var clave in data) {
                    if (data.hasOwnProperty(clave)) {
                        console.log("Clave: " + clave);
                        console.log("Lista: " + data[clave].join(", ")); // Convierte la lista en una cadena y la imprime
                        contenido += data[clave].join(", ") + "\n";
                    }
                }
                document.getElementById("mostrarSolucion").value = contenido;
                console.log("------------");
            },
            error: function () {

            }
        });
    }
    if (algoritmo.value == 'sjf' && tecnicaSelector.value == "coop") {
        $.ajax({
            url: '/Menu/SJFcooperativo',
            data: JSON.stringify(data),
            async: false,
            method: 'POST',
            contentType: 'application/json',
            success: function (data) {
                console.log("------------");
                console.log(data);
                var contenido = "";
                for (var clave in data) {
                    if (data.hasOwnProperty(clave)) {
                        console.log("Clave: " + clave);
                        console.log("Lista: " + data[clave].join(", ")); // Convierte la lista en una cadena y la imprime
                        contenido += data[clave].join(", ") + "\n";
                    }
                }
                document.getElementById("mostrarSolucion").value = contenido;
                console.log("------------");
            },
            error: function () {

            }
        });
    }
    if (algoritmo.value == 'sjf' && tecnicaSelector.value == "aprop") {
        $.ajax({
            url: '/Menu/SJFapropiativo',
            data: JSON.stringify(data),
            async: false,
            method: 'POST',
            contentType: 'application/json',
            success: function (data) {
                console.log("------------");
                console.log(data);
                var contenido = "";
                for (var clave in data) {
                    if (data.hasOwnProperty(clave)) {
                        console.log("Clave: " + clave);
                        console.log("Lista: " + data[clave].join(", ")); // Convierte la lista en una cadena y la imprime
                        contenido += data[clave].join(", ") + "\n";
                    }
                }
                document.getElementById("mostrarSolucion").value = contenido;
                console.log("------------");
            },
            error: function () {

            }
        });
    }
    if (algoritmo.value == 'rr') {

        // Obtener el cuanto
        var cuanto = document.getElementById(`cuanto`);
        data.cuanto = cuanto.value;

        $.ajax({
            url: '/Menu/RR',
            data: JSON.stringify(data),
            async: false,
            method: 'POST',
            contentType: 'application/json',
            success: function (data) {
                console.log("------------");
                console.log(data);
                var contenido = "";
                for (var clave in data) {
                    if (data.hasOwnProperty(clave)) {
                        console.log("Clave: " + clave);
                        console.log("Lista: " + data[clave].join(", ")); // Convierte la lista en una cadena y la imprime
                        contenido += data[clave].join(", ") + "\n";
                    }
                }
                document.getElementById("mostrarSolucion").value = contenido;
                console.log("------------");
            },
            error: function () {

            }
        });
    }
}