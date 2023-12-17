const contenedorFichasEjecucion = document.querySelector('#contenedorFichaEjecucion');
const contenedorFichasDisco = document.querySelector('#contenedorFichaDisco');
const contenedorFichasListo = document.querySelector('#contenedorFichaListo');
const contenedorFichasTerminado = document.querySelector('#contenedorFichaTerminado');
const infoProcesos = document.querySelector('#infoProcesos');

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

    inicializarInfoProcesos();

    inicializarDragDropsFichas();
    inicializarDragDropsMatriz();
});

function inicializarInfoProcesos() {

    $.ajax({
        url: '/Ejercicios/isProfesor',
        async: true,
        method: 'POST',
        success: function (data) {

            if (data != "1" && data != "2") {
                $.ajax({
                    url: '/Ejercicios/ResolverEjercicioSeleccionado',
                    async: true,
                    method: 'POST',
                    success: function (data) {

                        console.log("NAZI!");
                        console.log(data);

                        console.log(data.procesos);
                        console.log(data.procesos.length);


                        for (let i = 0; i < data.procesos.length; i++) {

                            console.log("FOR FUERA -" + i);

                            // Crear el div
                            var divProcesosInfo = document.createElement("div");
                            divProcesosInfo.id = "procesos-info";

                            // Crear el encabezado h4
                            var pProceso = document.createElement("p");
                            pProceso.classList.add("text-center");
                            pProceso.textContent = "PROCESO " + (i + 1);
                            pProceso.style.fontWeight = "bold";

                            // Crear los párrafos
                            var pTiempoLlegada = document.createElement("p");
                            pTiempoLlegada.textContent = "Tiempo de llegada: " + data.procesos[i].tiempoLlegada + " segundos";

                            var pRafagas = document.createElement("p");
                            var textoRafagas = "Ráfagas: ";
                            var rafaga = data.procesos[i].rafaga.split(',');
                            for (let j = 0; j < rafaga.length; j++) {
                                console.log("FOR DENTRO -" + j);
                                if (j % 2 == 0) {
                                    textoRafagas += rafaga[j] + " CPU";
                                }
                                else {
                                    textoRafagas += rafaga[j] + " Disco";
                                }

                                if (j != rafaga.length - 1) {
                                    textoRafagas += " - ";
                                }
                            }
                            pRafagas.textContent = textoRafagas;

                            // Agregar los elementos al div
                            divProcesosInfo.appendChild(pProceso);
                            divProcesosInfo.appendChild(pTiempoLlegada);
                            divProcesosInfo.appendChild(pRafagas);

                            infoProcesos.appendChild(divProcesosInfo)
                        }

                    },
                    error: function () {
                        Swal.fire({
                            title: 'ERROR',
                            text: 'Se produjo un error al cargar el ejercicio',
                            icon: 'error',
                            confirmButtonText: 'Aceptar',
                            confirmButtonColor: '#3085d6',
                            allowOutsideClick: false
                        }).then((result) => {
                            if (result.isConfirmed) {
                                window.location.href = '/Ejercicios/MenuPrincipal';
                            } else {
                                window.location.href = '/Ejercicios/MenuPrincipal';
                            }
                        });
                    }
                });
            }

            else {
                Swal.fire({
                    title: 'ERROR',
                    text: 'Se produjo un error al cargar el ejercicio',
                    icon: 'error',
                    confirmButtonText: 'Aceptar',
                    confirmButtonColor: '#3085d6',
                    allowOutsideClick: false
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = '/Ejercicios/MenuPrincipal';
                    } else {
                        window.location.href = '/Ejercicios/MenuPrincipal';
                    }
                });
            }
        },
        error: function () {
            Swal.fire({
                title: 'ERROR',
                text: 'Se produjo un error al cargar el ejercicio',
                icon: 'error', 
                confirmButtonText: 'Aceptar', 
                confirmButtonColor: '#3085d6', 
                allowOutsideClick: false 
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = '/Ejercicios/MenuPrincipal';
                } else {
                    window.location.href = '/Ejercicios/MenuPrincipal';
                }
            });
        }
    });


}

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

function quitarColumna() {
    contadorColumnas--;
    for (var i = 0; i < numProcesos; i++) {
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

function resolver() {
    for (var i = 0; i < numProcesos; i++) {
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

    $.ajax({
        url: '/Menu/ResolverEjercicio',
        async: true,
        method: 'POST',
        success: function (data) {
            var contenido = "";
            var solucion = true;
            for (var i = 0; i < numProcesos; i++) {
                for (var j = 0; j < contadorColumnas; j++) {

                    console.log(data[i][j]);
                    console.log(matriz[i][j]);
                    recuadro = `recuadro-blanco-${i}-${j}`;
                    const elemento = document.querySelector('#' + recuadro);
                    const divHijo = elemento.querySelector('div');

                    if(matriz[i][j] == '-' && data[i][j] == null) {
                        elemento.style.border = '1px solid #ccc';
                        elemento.style.boxShadow = '5px 5px 10px rgba(0, 0, 0, 0.2)';

                        if (divHijo) {
                            divHijo.style.removeProperty('border');
                        }
                    }
                    else if (matriz[i][j] != data[i][j]) {
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


