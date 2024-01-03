const numProcesosInput = document.getElementById("numProcesos");

const procesosDiv = document.getElementById("Procesos");
const procesos1Div = document.getElementById("procesosInfo-1");
const procesos2Div = document.getElementById("procesosInfo-2");
const procesos3Div = document.getElementById("procesosInfo-3");

const algoritmo = document.getElementById("algoritmo");

const tecnicaDiv = document.getElementById('divtecnica');
const tecnicaSelector = document.getElementById('tecnica');
const tecnicaLabel = document.querySelector('label[for="tecnica"]');

const cuantoDiv = document.getElementById('divcuanto');
const cuantoInput = document.getElementById('cuanto');
const cuantoLabel = document.querySelector('label[for="cuanto"]');

const contentContainer = document.getElementById('content-container');
const divGenerar = document.getElementById('divGenerar');
const botonesAgregaryQuitar = document.getElementById('botonesAgregaryQuitar');
const contenedorFichas = document.getElementById('contenedorFicha');

const botonGuardarEjercicio = document.getElementById('GuardarEjercicio');

const contenedorFichasEjecucion = document.querySelector('#contenedorFichaEjecucion');
const contenedorFichasDisco = document.querySelector('#contenedorFichaDisco');
const contenedorFichasListo = document.querySelector('#contenedorFichaListo');
const contenedorFichasTerminado = document.querySelector('#contenedorFichaTerminado');

const botonResolver = document.getElementById("botonResolver");

var numeroFilas = 2;
var numeroColumnas = 8;
var contadorColumnas = 8;

var algoritmoSelected = false;
var tecnicaSelected = false;
var numProcesosSelected = false;

var fichaInterna = false;
var ejecucion = false;
var disco = false;
var listo = false;
var terminado = false;

$(document).ready(function () {
    for (var i = 0; i <= 20; i++) {
        var option = document.createElement("option");
        option.value = i;
        if (i == 0) {
            option.text = "";
        }
        else {
            option.text = i;
        }
        document.getElementById("numProcesos").appendChild(option);
    }

    $.ajax({
        url: '/Base/isProfesor',
        async: true,
        method: 'POST',
        success: function (data) {
            console.log("AQUI!");
            console.log(data);
            if (data == 'True') {
                GuardarEjercicio.hidden = false;
            }
            else {
                GuardarEjercicio.hidden = true;
            }
        },
        error: function () {

        }
    });

});

//Funcion para la aparicion de las tecnicas cuando see pulsa sobre SJF
algoritmo.addEventListener("change", function () {
    const selectedOption = algoritmo.options[algoritmo.selectedIndex];
    if (!algoritmoSelected) {
        algoritmo.remove(0);
    }

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
    algoritmoSelected = true;
});


tecnicaSelector.addEventListener("change", function () {
    if (!tecnicaSelected) {
        tecnicaSelector.remove(0);
    }
    tecnicaSelected = true;
});

// Funcion para la aparición de las rafagas de un proceso
function cambioSeleccion(numProceso) {

    const miSelector = document.getElementById(`numRafagas${numProceso}`);

    const indiceSeleccionado = miSelector.selectedIndex; // Índice del elemento seleccionado
    const opcionSeleccionada = miSelector.options[indiceSeleccionado]; // Elemento de opción seleccionado
    const valorOpcionSeleccionada = opcionSeleccionada.value; // Valor del atributo "value" de la opción seleccionada

    const numRafagas = parseInt(valorOpcionSeleccionada);


    var index = "procesoInfo" + numProceso;
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
        divRafaga.classList.add("row"); // Agregar la clase que centra el contenido


        const divRelleno1 = document.createElement('div');
        divRelleno1.classList.add("col-md-2");
        divRafaga.appendChild(divRelleno1);

        // LABEL TIEMPO DE LA RAFAGA
        const divinputlabelRafaga = document.createElement('div');
        divinputlabelRafaga.classList.add("col-md-4");
        const labelRafaga = document.createElement('label');
        labelRafaga.htmlFor = `tProceso` + numProceso + `Rafaga${j}`;
        labelRafaga.textContent = `${j} Ráfaga: `;
        labelRafaga.classList.add("right");
        divinputlabelRafaga.appendChild(labelRafaga);
        divRafaga.appendChild(divinputlabelRafaga);

        // INPUT TEXT TIEMPO DE LA RAFAGA
        const divinputRafaga = document.createElement('div');
        divinputRafaga.classList.add("col-md-2");
        const inputRafaga = document.createElement('input');
        inputRafaga.type = 'text';
        inputRafaga.id = `tProceso` + numProceso + `Rafaga${j}`;
        inputRafaga.style.width = '50px';
        //inputRafaga.classList.add("text-center");
        divinputRafaga.appendChild(inputRafaga);
        divRafaga.appendChild(divinputRafaga);

        // LABEL INDICANDO EL TIPO
        const divlabelTipo = document.createElement('div');
        divlabelTipo.classList.add("col-md-4");
        const opcionesRafaga = document.createElement('label');
        if (j % 2 == 0) {
            opcionesRafaga.textContent = " Disco";
        }
        else {
            opcionesRafaga.textContent = " CPU";
        }
        opcionesRafaga.style.fontWeight = "bold";
        //opcionesRafaga.classList.add("text-center");
        divlabelTipo.appendChild(opcionesRafaga);
        divRafaga.appendChild(divlabelTipo);




        procesoDiv.appendChild(divRafaga)
    }
}

// Funcion para la aparición de los procesos
numProcesosInput.addEventListener("input", function () {

    if (!numProcesosSelected) {
        numProcesosInput.remove(0);
    }

    procesos1Div.innerHTML = "";
    procesos2Div.innerHTML = "";
    procesos3Div.innerHTML = "";
    const numProcesos = parseInt(numProcesosInput.value);
    for (let i = 1; i <= numProcesos; i++) {
        const div = document.createElement(`div`);
        div.id = `procesoInfo${i}`; // Asignar el ID único al div
        div.classList.add("text-center"); // Agregar la clase que centra el contenido

        // CABECERA
        const header = document.createElement('h5');
        header.classList.add('text-center');
        header.textContent = `Proceso ${i}`;
        div.appendChild(header);

        // LABEL TIEMPO DE LLEGADA
        const labelTllegada = document.createElement('label');
        labelTllegada.htmlFor = `tllegada${i}`;
        labelTllegada.textContent = 'Introduzca el tiempo de llegada: ';

        // INPUT TEXT TIEMPO DE LLEGADA
        const inputTllegada = document.createElement('input');
        inputTllegada.type = 'text';
        inputTllegada.id = `tllegada${i}`;
        inputTllegada.style.width = '50px';
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
        for (let optionValue = 0; optionValue <= 20; optionValue++) {
            if (optionValue == 0) {
                const option = document.createElement('option');
                option.value = optionValue;
                option.textContent = "";
                inputNumRafagas.appendChild(option);
            }
            if (optionValue % 2 != 0) {
                const option = document.createElement('option');
                option.value = optionValue;
                option.textContent = optionValue;
                inputNumRafagas.appendChild(option);
            }
        }
        labelNumRafagas.appendChild(inputNumRafagas);
        div.appendChild(labelNumRafagas);

        if (i % 3 == 1) {
            procesos1Div.appendChild(div);
        }
        else if (i % 3 == 2) {
            procesos2Div.appendChild(div);
        }
        else {
            procesos3Div.appendChild(div);
        }
    }
    numProcesosSelected = true;
    numeroFilas = numProcesosInput.value;
});


function comprobarElementos() {


    if (numProcesosInput.value == 0) {
        numProcesosInput.classList.add("errorTipo");
        mostrarMensajeError();
        return false;
    }

    if (algoritmo.value == "index") {
        algoritmo.classList.add("errorTipo");
        mostrarMensajeError();
        return false;
    }

    if (algoritmo.value == 'rr') {
        var cuanto = document.getElementById(`cuanto`);
        if (isNaN(cuanto.value)) {
            console.log("Cuanto mal 1!");
            cuantoInput.classList.add("errorTipo");
            mostrarMensajeError();
            return false;
        }
        else {
            if (cuanto.value % 10 != 0) {
                console.log("Cuanto mal 2!");
                cuantoInput.classList.add("errorTipo");
                mostrarMensajeError();
                return false;
            }
        }
    }

    for (let i = 0; i < numProcesosInput.value; i++) {

        // Obtenemos el tiempo de llegada del proceso
        var llegada = document.getElementById(`tllegada${i + 1}`);
        if (isNaN(llegada.value) || llegada.value == "") {
            llegada.classList.add("errorTipo");
            mostrarMensajeError();
            return false;
        }
        else {
            if (llegada.value % 10 != 0) {
                llegada.classList.add("errorTipo");
                mostrarMensajeError();
                return false;
            }
        }

        // Obtenemos las rafagas del proceso
        var numeroRafagas = document.getElementById(`numRafagas${i + 1}`);
        if (numeroRafagas.value == 0) {
            numeroRafagas.classList.add("errorTipo");
            mostrarMensajeError();
            return false;
        }

        for (let j = 1; j <= numeroRafagas.value; j++) {
            var rafaga = document.getElementById(`tProceso${i + 1}Rafaga${j}`);
            if (isNaN(rafaga.value) || rafaga.value == "") {
                rafaga.classList.add("errorTipo");
                mostrarMensajeError();
                return false;
            }
            else {
                if (rafaga.value % 10 != 0) {
                    rafaga.classList.add("errorTipo");
                    mostrarMensajeError();
                    return false;
                }
            }
        }
    }
    return true;
}

function generar() {

    botonesAgregaryQuitar.hidden = true;
    contenedorFichas.hidden = true;
    botonResolver.hidden = true;

    quitarColorRojo();
    eliminarContenido();

    var contenido = [];
    if (comprobarElementos()) {

        // Recogida de datos
        var data = {};
        console.log("numProcesos: " + numProcesosInput.value);
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
                    for (var clave in data) {
                        if (data.hasOwnProperty(clave)) {
                            console.log("Clave: " + clave);
                            console.log("Lista: " + data[clave].join(", ")); // Convierte la lista en una cadena y la imprime
                            numeroColumnas = data[clave].length;
                            contenido.push(data[clave].join(","));
                        }
                    }
                    calcular(contenido);
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
                    for (var clave in data) {
                        if (data.hasOwnProperty(clave)) {
                            console.log("Clave: " + clave);
                            console.log("Lista: " + data[clave].join(", ")); // Convierte la lista en una cadena y la imprime
                            numeroColumnas = data[clave].length;
                            contenido.push(data[clave].join(","));
                        }
                    }
                    calcular(contenido);
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
                    for (var clave in data) {
                        if (data.hasOwnProperty(clave)) {
                            console.log("Clave: " + clave);
                            console.log("Lista: " + data[clave].join(", ")); // Convierte la lista en una cadena y la imprime
                            numeroColumnas = data[clave].length;
                            contenido.push(data[clave].join(","));
                        }
                    }
                    calcular(contenido);
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
                    for (var clave in data) {
                        if (data.hasOwnProperty(clave)) {
                            console.log("Clave: " + clave);
                            console.log("Lista: " + data[clave].join(", ")); // Convierte la lista en una cadena y la imprime
                            numeroColumnas = data[clave].length;
                            contenido.push(data[clave].join(","));
                        }
                    }
                    calcular(contenido);
                    console.log("------------");
                },
                error: function () {

                }
            });
        }

    }
}

function practicar() {

    quitarColorRojo();
    eliminarContenido();

    var contenido = [];
    if (comprobarElementos()) {
        botonesAgregaryQuitar.hidden = false;
        contenedorFichas.hidden = false;
        botonResolver.hidden = false;

        if (crearMatrizVacia()) {


            inicializarDragDropsFichas();
            inicializarDragDropsMatriz();

        }
    }
}

function guardarEjercicio() {

    if (comprobarElementos()) {


        Swal.fire({
            title: '¿Estás seguro?',
            text: 'Se registrará el ejercicio y aparecerá en el listado de ejercicios',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí',
            cancelButtonText: 'No',
            allowOutsideClick: false
        }).then((result) => {
            if (result.isConfirmed) {

                var tllegada = [];
                var listaProcesos = [];
                var cuanto = 0;
                var heuristicaId = 0;
                for (let i = 0; i < numProcesosInput.value; i++) {

                    // Obtenemos el tiempo de llegada del proceso
                    var llegada = document.getElementById(`tllegada${i + 1}`);
                    tllegada.push(llegada.value);

                    // Obtenemos las rafagas del proceso
                    var numeroRafagas = document.getElementById(`numRafagas${i + 1}`);

                    var rafagas = "";
                    for (let j = 1; j <= numeroRafagas.value; j++) {
                        var rafaga = document.getElementById(`tProceso${i + 1}Rafaga${j}`);
                        rafagas += rafaga.value;
                        if (j != numeroRafagas.value) {
                            rafagas += ",";
                        }
                    }
                    console.log(rafagas);
                    listaProcesos.push(rafagas);

                }

                if (algoritmo.value == "fcfs") {
                    heuristicaId = 1;
                }
                if (algoritmo.value == 'sjf' && tecnicaSelector.value == "coop") {
                    heuristicaId = 2;
                }
                if (algoritmo.value == 'sjf' && tecnicaSelector.value == "aprop") {
                    heuristicaId = 3;
                }
                if (algoritmo.value == 'rr') {
                    heuristicaId = 4;
                    cuanto = cuantoInput.value;
                }

                data = {};
                data.heuristicaId = heuristicaId;
                data.tllegadas = tllegada;
                data.rafagas = listaProcesos;
                data.cuanto = cuanto;

                $.ajax({
                    url: '/Ejercicios/GuardarEjercicio',
                    data: JSON.stringify(data),
                    async: true,
                    method: 'POST',
                    contentType: 'application/json',
                    success: function (data) {
                        if (data == 0) {
                            Swal.fire('¡Ejercicio registrado!', 'El ejercicio se registró correctamente.', 'success');
                        }
                        else if (data == 1) {
                            Swal.fire({
                                title: 'Información',
                                text: 'Ya se ha registrado este ejercicio anteriormente',
                                icon: 'info',
                                confirmButtonText: 'Aceptar',
                                confirmButtonColor: '#3085d6',
                                allowOutsideClick: false
                            }).then((result) => {
                            });
                        }
                        else {
                            Swal.fire({
                                title: 'ERROR',
                                text: 'Error al guardar el ejercicio',
                                icon: 'error',
                                confirmButtonText: 'Aceptar',
                                confirmButtonColor: '#3085d6',
                                allowOutsideClick: false
                            }).then((result) => {
                            });
                        }
                    },
                    error: function () {
                        Swal.fire({
                            title: 'ERROR',
                            text: 'Error al guardar el ejercicio',
                            icon: 'error',
                            confirmButtonText: 'Aceptar',
                            confirmButtonColor: '#3085d6',
                            allowOutsideClick: false
                        }).then((result) => {
                        });
                    }
                });

            }
        });
    }

}

async function crearMatrizVacia() {

    divGenerar.hidden = false;

    for (var i = 0; i < numProcesosInput.value; i++) {
        // Crear una fila
        var fila = document.createElement('div');
        fila.className = 'fila';
        fila.id = 'fila-' + i;

        // Bucle interno
        for (var j = 0; j < 8; j++) {
            // Crear un recuadro blanco
            var recuadroBlanco = document.createElement('div');
            recuadroBlanco.className = 'recuadro-blanco';
            recuadroBlanco.id = 'recuadro-blanco-' + i + '-' + j;

            // Agregar el recuadro blanco a la fila
            fila.appendChild(recuadroBlanco);
        }

        // Agregar la fila al contenedor principal
        contentContainer.appendChild(fila);
    }
    return true;
}

async function calcular(lista) {

    console.log("**************");
    console.log(lista);
    var contenido = [];
    for (var k = 0; k < lista.length; k++) {
        contenido[k] = [];
        var fila = lista[k].split(',');
        contenido[k] = fila;
    }

    divGenerar.hidden = false;

    for (var i = 0; i < numeroFilas; i++) {
        // Crear una fila
        var fila = document.createElement('div');
        fila.className = 'fila';
        fila.id = 'fila-' + i;

        // Bucle interno
        for (var j = 0; j < numeroColumnas; j++) {
            // Crear un recuadro blanco
            var recuadroBlanco = document.createElement('div');
            recuadroBlanco.className = 'recuadro-blanco';
            recuadroBlanco.id = 'recuadro-blanco-' + i + '-' + j;

            // Agregar el recuadro blanco a la fila
            fila.appendChild(recuadroBlanco);
        }

        // Agregar la fila al contenedor principal
        contentContainer.appendChild(fila);
    }

    var fichaE = document.createElement("div");
    fichaE.id = "Ejecucion";
    fichaE.className = "ficha fichaEjecucion";
    fichaE.innerHTML = "E";

    var fichaD = document.createElement("div");
    fichaD.id = "Disco";
    fichaD.className = "ficha fichaDisco";
    fichaD.innerHTML = "D";

    var fichaL = document.createElement("div");
    fichaL.id = "Listo";
    fichaL.className = "ficha fichaListo";
    fichaL.innerHTML = "L";

    var fichaT = document.createElement("div");
    fichaT.id = "Terminado";
    fichaT.className = "ficha fichaTerminado";
    fichaT.innerHTML = "T";

    var recuadro = "";
    for (var i = 0; i < numeroFilas; i++) {

        // Bucle interno
        for (var j = 0; j < numeroColumnas; j++) {
            recuadro = `recuadro-blanco-${i}-${j}`;
            var ficha = contenido[i][j];
            console.log(ficha);
            switch (ficha) {
                case "E":
                    var elemento = document.querySelector('#' + recuadro);
                    var fichaClonada = fichaE.cloneNode(true);
                    elemento.appendChild(fichaClonada);
                    break;
                case "D":
                    var elemento = document.querySelector('#' + recuadro);
                    var fichaClonada = fichaD.cloneNode(true);
                    elemento.appendChild(fichaClonada);
                    break;
                case "L":
                    var elemento = document.querySelector('#' + recuadro);
                    var fichaClonada = fichaL.cloneNode(true);
                    elemento.appendChild(fichaClonada);
                    break;
                case "T":
                    var elemento = document.querySelector('#' + recuadro);
                    var fichaClonada = fichaT.cloneNode(true);
                    elemento.appendChild(fichaClonada);
                    break;
                default:
                    break;
            }
        }
    }
}

function mostrarMensajeError() {
    Swal.fire({
        title: 'ERROR',
        text: 'Hay errores en alguno de los campos rellenados',
        icon: 'error',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#3085d6',
        allowOutsideClick: false
    }).then((result) => {
    });
}


function eliminarContenido() {
    while (contentContainer.firstChild) {
        contentContainer.removeChild(contentContainer.firstChild);
    }
}


function quitarColorRojo() {
    var elementosConClase = document.querySelectorAll('.errorTipo');
    console.log("estoy en quitarColorRojo");
    console.log(elementosConClase);
    for (var i = 0; i < elementosConClase.length; i++) {
        console.log(elementosConClase[i]);
        elementosConClase[i].classList.remove('errorTipo');
    }
}

function resolver() {
    for (var i = 0; i < numProcesosInput.value; i++) {
        matriz[i] = [];
        for (var j = 0; j < contadorColumnas; j++) {
            matriz[i][j] = "";
            recuadro = `recuadro-blanco-${i}-${j}`;
            const elemento = document.querySelector('#' + recuadro);

            const divHijo = elemento.querySelector('div');

            // Obtén el id del div hijo
            if (divHijo) {
                const idDelDivHijo = divHijo.id;
                if (idDelDivHijo == 'EjecucionIn') {
                    matriz[i][j] = "E";
                }
                else if (idDelDivHijo == 'DiscoIn') {
                    matriz[i][j] = "D";
                }
                else if (idDelDivHijo == 'ListoIn') {
                    matriz[i][j] = "L";
                }
                else if (idDelDivHijo == 'TerminadoIn') {
                    matriz[i][j] = "T";
                }
                else {
                    matriz[i][j] = "-";
                }
            } else {
                matriz[i][j] = "-";
            }
        }
    }

    // Recogida de datos
    var data = {};
    var tllegada = [];
    var listaProcesos = [];
    for (let i = 0; i < numProcesosInput.value; i++) {

        // Obtenemos el tiempo de llegada del proceso
        var llegada = document.getElementById(`tllegada${i + 1}`);
        tllegada.push(llegada.value);

        // Obtenemos las rafagas del proceso
        var numeroRafagas = document.getElementById(`numRafagas${i + 1}`);

        var rafagas = [];
        for (let j = 1; j <= numeroRafagas.value; j++) {
            var rafaga = document.getElementById(`tProceso${i + 1}Rafaga${j}`);
            rafagas.push(rafaga.value);
        }
        var proceso = i;
        listaProcesos[i] = rafagas;

    }
    data.tllegada = tllegada;
    data.listaProcesos = listaProcesos;
    contenido = [];

    if (algoritmo.value == 'fcfs') {
        $.ajax({
            url: '/Menu/FCFS',
            data: JSON.stringify(data),
            async: true,
            method: 'POST',
            contentType: 'application/json',
            success: function (data) {
                for (var clave in data) {
                    if (data.hasOwnProperty(clave)) {
                        datos = [];
                        numeroColumnas = data[clave].length;
                        for (let k = 0; k < data[clave].length; k++) {
                            datos.push(data[clave][k]);
                        }
                        contenido.push(datos);
                    }
                }
                comprobarSoluciones(matriz, contenido);
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
                for (var clave in data) {
                    if (data.hasOwnProperty(clave)) {
                        datos = [];
                        numeroColumnas = data[clave].length;
                        for (let k = 0; k < data[clave].length; k++) {
                            datos.push(data[clave][k]);
                        }
                        contenido.push(datos);
                    }
                }
                comprobarSoluciones(matriz, contenido);
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
                for (var clave in data) {
                    if (data.hasOwnProperty(clave)) {
                        datos = [];
                        numeroColumnas = data[clave].length;
                        for (let k = 0; k < data[clave].length; k++) {
                            datos.push(data[clave][k]);
                        }
                        contenido.push(datos);
                    }
                }
                comprobarSoluciones(matriz, contenido);
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
                for (var clave in data) {
                    if (data.hasOwnProperty(clave)) {
                        datos = [];
                        numeroColumnas = data[clave].length;
                        for (let k = 0; k < data[clave].length; k++) {
                            datos.push(data[clave][k]);
                        }
                        contenido.push(datos);
                    }
                }
                comprobarSoluciones(matriz, contenido);
            },
            error: function () {

            }
        });
    }
}

function comprobarSoluciones(original, intento) {
    {
        var solucion = true;
        for (var i = 0; i < numProcesosInput.value; i++) {
            for (var j = 0; j < contadorColumnas; j++) {

                recuadro = `recuadro-blanco-${i}-${j}`;
                const elemento = document.querySelector('#' + recuadro);
                const divHijo = elemento.querySelector('div');

                if (intento[i][j] == '-' && original[i][j] == null) {
                    elemento.style.border = '1px solid #ccc';
                    elemento.style.boxShadow = '5px 5px 10px rgba(0, 0, 0, 0.2)';

                    if (divHijo) {
                        divHijo.style.removeProperty('border');
                    }
                }
                else if (intento[i][j] != original[i][j]) {
                    solucion = false;
                    elemento.style.border = '1px solid red';
                    elemento.style.boxShadow = '0px 0px 10px rgba(255, 0, 0, 1)';

                    if (divHijo) {
                        divHijo.style.border = '1px solid red';
                    }

                }
                else {
                    elemento.style.border = '1px solid #ccc';
                    elemento.style.boxShadow = '5px 5px 10px rgba(0, 0, 0, 0.2)';

                    if (divHijo) {
                        divHijo.style.removeProperty('border');
                    }
                }

            }
        }

        if (!solucion) {

            Swal.fire({
                title: 'Incorrecto',
                text: 'Hay errores en la planificación',
                icon: 'error', // Puedes cambiar el icono (warning, success, error, info, etc.)
                confirmButtonText: 'Aceptar', // Puedes personalizar el texto del botón
                confirmButtonColor: '#3085d6', // Puedes personalizar el color del botón
                allowOutsideClick: false // Puedes controlar si se permite hacer clic fuera del cuadro de diálogo
            }).then((result) => {
            });

        }
        else {
            Swal.fire({
                title: 'Correcto',
                text: 'La planificacion es correcta',
                icon: 'success', // Puedes cambiar el icono (warning, success, error, info, etc.)
                confirmButtonText: 'Aceptar', // Puedes personalizar el texto del botón
                confirmButtonColor: '#3085d6', // Puedes personalizar el color del botón
                allowOutsideClick: false // Puedes controlar si se permite hacer clic fuera del cuadro de diálogo
            }).then((result) => {
            });
        }

    }
}

// PROPIEDADES DE LAS FICHAS
function inicializarDragDropsFichas() {
    inicializarFichaEjecucion();
    inicializarFichaDisco();
    inicializarFichaListo();
    inicializarFichaTerminado();
}

function inicializarFichaEjecucion() {
    const fichaEjecucion = document.querySelector('#Ejecucion');
    fichaEjecucion.addEventListener('dragstart', e => {
        console.log("Start Ejecucion");
        ejecucion = true;
    });
    fichaEjecucion.addEventListener('dragend', e => {
        console.log("End Ejecucion");
        ejecucion = false;
    });
}

function inicializarFichaDisco() {
    const fichaDisco = document.querySelector('#Disco');
    fichaDisco.addEventListener('dragstart', e => {
        console.log("start Disco");
        disco = true;
    });
    fichaDisco.addEventListener('dragend', e => {
        console.log("end Disco");
        disco = false;
    });
}

function inicializarFichaListo() {
    const fichaListo = document.querySelector('#Listo');
    fichaListo.addEventListener('dragstart', e => {
        console.log("start Listo");
        listo = true;
    });
    fichaListo.addEventListener('dragend', e => {
        console.log("end Listo");
        listo = false;
    });
}

function inicializarFichaTerminado() {
    const fichaTerminado = document.querySelector('#Terminado');
    fichaTerminado.addEventListener('dragstart', e => {
        console.log("start Terminado");
        terminado = true;
    });
    fichaTerminado.addEventListener('dragend', e => {
        console.log("end Terminado");
        terminado = false;
    });
}

function inicializarDragDropsMatriz() {
    var recuadro = ""
    for (let i = 0; i < numProcesosInput.value; i++) {
        matriz[i] = [];
        for (let j = 0; j < 8; j++) {
            matriz[i][j] = "";
            recuadro = `recuadro-blanco-${i}-${j}`;

            crearPropiedadesRecuadros(recuadro);
        }
    }
}

function crearPropiedadesRecuadros(elemento) {
    console.log("---- X ----");
    console.log(elemento);
    const fragmento = document.querySelector('#' + elemento);

    // Configuramos cuando esta encima del recuadro
    fragmento.addEventListener('dragover', e => {
        e.preventDefault();
        console.log("estoy encima de " + fragmento);
    });

    // Configuramos cuando se suelta en el recuadro
    fragmento.addEventListener('drop', e => {
        e.preventDefault();
        console.log("suelto en " + fragmento);

        if (ejecucion) {
            // Eliminamos el contenido del recuadro de donde viene la anterior ficha
            if (fichaInterna) {
                const contenedorDiv = elementoDiv;
                while (contenedorDiv.firstChild) {
                    contenedorDiv.removeChild(contenedorDiv.firstChild);
                }
            }
            const fichaEjecucion = document.querySelector('#Ejecucion');

            // Clona la ficha y configura el estilo
            const fichaClonada = document.getElementById('Ejecucion').cloneNode(true);
            //Añadimos icono x
            /*
            const eliminarTexto = document.createElement('h3');
            eliminarTexto.className = 'eliminar-texto';
            eliminarTexto.textContent = 'x';
            fichaEjecucion.appendChild(eliminarTexto);

            //Configuramos caracteristicas de la ficha interna
            fichaEjecucion.addEventListener('mouseenter', () => {
                const eliminarTexto = fichaEjecucion.querySelector('.eliminar-texto');
                eliminarTexto.style.display = 'block';
            });
            fichaEjecucion.addEventListener('mouseleave', () => {
                const eliminarTexto = fichaEjecucion.querySelector('.eliminar-texto');
                eliminarTexto.style.display = 'none';
            });
            */
            fichaEjecucion.addEventListener('dblclick', () => {
                const contenedorDiv = fichaEjecucion.parentElement;
                while (contenedorDiv.firstChild) {
                    contenedorDiv.removeChild(contenedorDiv.firstChild);
                }
            });
            fichaEjecucion.addEventListener('dragstart', e => {
                //const eliminarTexto = fichaEjecucion.querySelector('.eliminar-texto');
                //eliminarTexto.style.display = 'none';
                ejecucíon = true;
                elementoDiv = fichaEjecucion.parentElement;
                fichaInterna = true;
            });
            fichaEjecucion.addEventListener('dragend', e => {
                ejecucíon = false;
                fichaInterna = false;
            });


            // Regresamos la copia original al punto inicial
            contenedorFichasEjecucion.appendChild(fichaClonada);

            // Renombramos el id de la ficha y lo introducimos en el recuadro
            fichaEjecucion.id = "EjecucionIn";
            while (fragmento.firstChild) {
                fragmento.removeChild(fragmento.firstChild);
            }

            fragmento.appendChild(fichaEjecucion);

            // Configuramos de nuevo la ficha ejecucion
            inicializarFichaEjecucion();
        }
        if (disco) {
            // Eliminamos el contenido del recuadro de donde viene la anterior ficha
            if (fichaInterna) {
                const contenedorDiv = elementoDiv;
                while (contenedorDiv.firstChild) {
                    contenedorDiv.removeChild(contenedorDiv.firstChild);
                }
            }
            const fichaDisco = document.querySelector('#Disco');

            // Clona la ficha y configura el estilo
            const fichaClonada = document.getElementById('Disco').cloneNode(true);
            //Añadimos icono x
            /*
            const eliminarTexto = document.createElement('h3');
            eliminarTexto.className = 'eliminar-texto';
            eliminarTexto.textContent = 'x';
            fichaDisco.appendChild(eliminarTexto);

            //Configuramos caracteristicas de la ficha interna
            fichaDisco.addEventListener('mouseenter', () => {
                const eliminarTexto = fichaDisco.querySelector('.eliminar-texto');
                eliminarTexto.style.display = 'block';
            });
            fichaDisco.addEventListener('mouseleave', () => {
                const eliminarTexto = fichaDisco.querySelector('.eliminar-texto');
                eliminarTexto.style.display = 'none';
            });
            */
            fichaDisco.addEventListener('dblclick', () => {
                const contenedorDiv = fichaDisco.parentElement;
                while (contenedorDiv.firstChild) {
                    contenedorDiv.removeChild(contenedorDiv.firstChild);
                }
            });
            fichaDisco.addEventListener('dragstart', e => {
                //const eliminarTexto = fichaDisco.querySelector('.eliminar-texto');
                //eliminarTexto.style.display = 'none';
                disco = true;
                elementoDiv = fichaDisco.parentElement;
                fichaInterna = true;
            });
            fichaDisco.addEventListener('dragend', e => {
                disco = false;
                fichaInterna = false;
            });


            // Regresamos la copia original al punto inicial
            contenedorFichasDisco.appendChild(fichaClonada);

            // Renombramos el id de la ficha y lo introducimos en el recuadro
            fichaDisco.id = "DiscoIn";
            while (fragmento.firstChild) {
                fragmento.removeChild(fragmento.firstChild);
            }

            fragmento.appendChild(fichaDisco);

            // Configuramos de nuevo la ficha disco
            inicializarFichaDisco();
        }
        if (listo) {

            // Eliminamos el contenido del recuadro de donde viene la anterior ficha
            if (fichaInterna) {
                const contenedorDiv = elementoDiv;
                while (contenedorDiv.firstChild) {
                    contenedorDiv.removeChild(contenedorDiv.firstChild);
                }
            }
            const fichaListo = document.querySelector('#Listo');

            // Clona la ficha y configura el estilo
            const fichaClonada = document.getElementById('Listo').cloneNode(true);
            //Añadimos icono x
            /*
            const eliminarTexto = document.createElement('h3');
            eliminarTexto.className = 'eliminar-texto';
            eliminarTexto.textContent = 'x';
            fichaListo.appendChild(eliminarTexto);

            //Configuramos caracteristicas de la ficha interna
            fichaListo.addEventListener('mouseenter', () => {
                const eliminarTexto = fichaListo.querySelector('.eliminar-texto');
                eliminarTexto.style.display = 'block';
            });
            fichaListo.addEventListener('mouseleave', () => {
                const eliminarTexto = fichaListo.querySelector('.eliminar-texto');
                eliminarTexto.style.display = 'none';
            });
            */
            fichaListo.addEventListener('dblclick', () => {
                const contenedorDiv = fichaListo.parentElement;
                while (contenedorDiv.firstChild) {
                    contenedorDiv.removeChild(contenedorDiv.firstChild);
                }
            });
            fichaListo.addEventListener('dragstart', e => {
                //const eliminarTexto = fichaListo.querySelector('.eliminar-texto');
                //eliminarTexto.style.display = 'none';
                listo = true;
                elementoDiv = fichaListo.parentElement;
                fichaInterna = true;
            });
            fichaListo.addEventListener('dragend', e => {
                listo = false;
                fichaInterna = false;
            });


            // Regresamos la copia original al punto inicial
            contenedorFichasListo.appendChild(fichaClonada);

            // Renombramos el id de la ficha y lo introducimos en el recuadro
            fichaListo.id = "ListoIn";
            while (fragmento.firstChild) {
                fragmento.removeChild(fragmento.firstChild);
            }

            fragmento.appendChild(fichaListo);

            // Configuramos de nuevo la ficha listo
            inicializarFichaListo();
        }
        if (terminado) {

            // Eliminamos el contenido del recuadro de donde viene la anterior ficha
            if (fichaInterna) {
                const contenedorDiv = elementoDiv;
                while (contenedorDiv.firstChild) {
                    contenedorDiv.removeChild(contenedorDiv.firstChild);
                }
            }
            const fichaTerminado = document.querySelector('#Terminado');

            // Clona la ficha y configura el estilo
            const fichaClonada = document.getElementById('Terminado').cloneNode(true);
            //Añadimos icono x
            /*
            const eliminarTexto = document.createElement('h3');
            eliminarTexto.className = 'eliminar-texto';
            eliminarTexto.textContent = 'x';
            fichaTerminado.appendChild(eliminarTexto);

            //Configuramos caracteristicas de la ficha interna
            fichaTerminado.addEventListener('mouseenter', () => {
                const eliminarTexto = fichaTerminado.querySelector('.eliminar-texto');
                eliminarTexto.style.display = 'block';
            });
            fichaTerminado.addEventListener('mouseleave', () => {
                const eliminarTexto = fichaTerminado.querySelector('.eliminar-texto');
                eliminarTexto.style.display = 'none';
            });
            */
            fichaTerminado.addEventListener('dblclick', () => {
                const contenedorDiv = fichaTerminado.parentElement;
                while (contenedorDiv.firstChild) {
                    contenedorDiv.removeChild(contenedorDiv.firstChild);
                }
            });
            fichaTerminado.addEventListener('dragstart', e => {
                //const eliminarTexto = fichaTerminado.querySelector('.eliminar-texto');
                //eliminarTexto.style.display = 'none';
                terminado = true;
                elementoDiv = fichaTerminado.parentElement;
                fichaInterna = true;
            });
            fichaTerminado.addEventListener('dragend', e => {
                terminado = false;
                fichaInterna = false;
            });


            // Regresamos la copia original al punto inicial
            contenedorFichasTerminado.appendChild(fichaClonada);

            // Renombramos el id de la ficha y lo introducimos en el recuadro
            fichaTerminado.id = "TerminadoIn";
            while (fragmento.firstChild) {
                fragmento.removeChild(fragmento.firstChild);
            }

            fragmento.appendChild(fichaTerminado);

            // Configuramos de nuevo la ficha terminado
            inicializarFichaTerminado();
        }
    });
}

function agregarColumna() {
    for (var i = 0; i < numProcesosInput.value; i++) {

        // Creación nuevo recuadro blanco
        var elemento = "recuadro-blanco-" + i + "-" + contadorColumnas;
        var nuevoDiv = document.createElement("div");
        nuevoDiv.classList.add("recuadro-blanco");
        nuevoDiv.id = elemento

        // Añadir a la fila
        var id = "fila-" + i;
        var fila = document.getElementById(id);
        fila.appendChild(nuevoDiv);

        // Inicializacion de las propiedades
        crearPropiedadesRecuadros(elemento);
    }
    contadorColumnas++;
}

function quitarColumna() {
    contadorColumnas--;
    for (var i = 0; i < numProcesosInput.value; i++) {
        var elemento = "recuadro-blanco-" + i + "-" + contadorColumnas;
        var cuadrado = document.getElementById(elemento);
        console.log("----------");
        console.log(elemento);
        console.log(cuadrado);
        var id = "fila-" + i;
        var fila = document.getElementById(id);
        console.log(fila);
        fila.removeChild(cuadrado);
    }
}
