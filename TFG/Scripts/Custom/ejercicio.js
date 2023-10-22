const contenedorFichasEjecucion = document.querySelector('#contenedorFichaEjecucion');
const contenedorFichasDisco = document.querySelector('#contenedorFichaDisco');
const contenedorFichasListo = document.querySelector('#contenedorFichaListo');
const contenedorFichasTerminado = document.querySelector('#contenedorFichaTerminado');

var fichaInterna = false;
var ejecucion = false;
var disco = false;
var listo = false;
var terminado = false;
var matriz = [];

var elementoDiv;
var contadorColumnas = 8;

var numProcesos = 2;
var solucion;
$(document).ready(function () {
    inicializarDragDropsFichas();
    inicializarDragDropsMatriz();
});

function inicializarDragDropsFichas() {
    inicializarFichaEjecucion();
    inicializarFichaDisco();
    inicializarFichaListo();
    inicializarFichaTerminado();
}

// Ficha ejecución
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

// Ficha disco
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

// Ficha listo
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

// Ficha terminado
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
    for (let i = 0; i < numProcesos; i++)
    {
        matriz[i] = [];
        for (let j = 0; j < 8; j++)
        {
            matriz[i][j] = "";
            recuadro = `recuadro-blanco-${i}-${j}`;

            crearPropiedadesRecuadros(recuadro);
        }
    }
}

function crearPropiedadesRecuadros(elemento) {

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

// Funcion para agregar columnas (recuadros blancos)
function agregarColumna() {
    for (var i = 0; i < numProcesos; i++) {

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

function resolver() {
    for (var i = 0; i < numProcesos; i++) {
        matriz[i] = [];
        for (var j = 0; j < contadorColumnas; j++) {
            matriz[i][j] = "";
            recuadro = `recuadro-blanco-${i}-${j}`;
            const elemento = document.querySelector('#' + recuadro);

            const divHijo = elemento.querySelector('div'); // Cambia 'div' al selector adecuado

            // Obtén el id del div hijo
            if (divHijo) {
                const idDelDivHijo = divHijo.id;
                console.log('El id del div hijo es: ' + idDelDivHijo);
                if (idDelDivHijo == 'EjecucionIn') {
                    console.log('E');
                    matriz[i][j] = "E";
                }
                else if (idDelDivHijo == 'DiscoIn') {
                    console.log('D');
                    matriz[i][j] = "D";
                }
                else if (idDelDivHijo == 'ListoIn') {
                    console.log('L');
                    matriz[i][j] = "L";
                }
                else if (idDelDivHijo == 'TerminadoIn') {
                    console.log('T');
                    matriz[i][j] = "T";
                }
                else {
                    console.log('-');
                    matriz[i][j] = "-";
                }
            } else {
                console.log('-');
                matriz[i][j] = "-";
            }
        }
    }


    var data = {};

    var tllegada = [];
    tllegada.push(0);
    tllegada.push(10);

    var listaProcesos = [];
    var rafagas1 = [];
    rafagas1.push(20);
    rafagas1.push(10);
    rafagas1.push(20);
    listaProcesos.push(rafagas1);

    var rafagas2 = [];
    rafagas2.push(10);
    rafagas2.push(20);
    rafagas2.push(20);
    listaProcesos.push(rafagas2);

    data.tllegada = tllegada;
    data.listaProcesos = listaProcesos;

    solucion = true;

    $.ajax({
        url: '/Menu/FCFS',
        data: JSON.stringify(data),
        async: true,
        method: 'POST',
        contentType: 'application/json',
        success: function (data) {
            console.log(data);
            var contenido = "";

            console.log("------------");
            for (var i = 0; i < numProcesos; i++) {
                for (var j = 0; j < contadorColumnas; j++) {

                    console.log(data[i][j]);
                    console.log(matriz[i][j]);
                    recuadro = `recuadro-blanco-${i}-${j}`;
                    const elemento = document.querySelector('#' + recuadro);

                    if (matriz[i][j] != data[i][j]) {
                        solucion = false;

                        elemento.style.border = '1px solid red';
                        elemento.style.boxShadow = '0px 0px 10px rgba(255, 0, 0, 1)';

                    }
                    else {
                        elemento.style.border = '1px solid #ccc';
                        elemento.style.boxShadow = '5px 5px 10px rgba(0, 0, 0, 0.2)';
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
                    if (result.isConfirmed) {
                        // El usuario hizo clic en el botón "Aceptar"
                        console.log('Usuario aceptó la alerta.');
                    } else {
                        // El usuario cerró la alerta de alguna otra manera
                        console.log('Usuario cerró la alerta sin aceptar.');
                    }
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
                    if (result.isConfirmed) {
                        // El usuario hizo clic en el botón "Aceptar"
                        console.log('Usuario aceptó la alerta.');
                    } else {
                        // El usuario cerró la alerta de alguna otra manera
                        console.log('Usuario cerró la alerta sin aceptar.');
                    }
                });
            }
            console.log("------------");

        },
        error: function () {

        }
    });
}


