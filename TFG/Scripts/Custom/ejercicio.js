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
    for (let i = 0; i < 2; i++)
    {
        matriz[i] = [];
        for (let j = 0; j < 8; j++)
        {
            matriz[i][j] = "";
            recuadro = `recuadro-blanco-${i}-${j}`;

            const fragmento = document.querySelector('#' + recuadro);
            const fragmentoElement = document.getElementById(recuadro);

            // Configuramos cuando esta encima del recuadro
            fragmento.addEventListener('dragover', e => {
                e.preventDefault();
                console.log("estoy encima de " + fragmento);
            });

            // Configuramos cuando se suelta en el recuadro
            fragmento.addEventListener('drop', e => {
                e.preventDefault();
                console.log("suelto en " + fragmento);

                if (ejecucion)
                {
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
                    fichaEjecucion.addEventListener('dblclick', () => {
                        const contenedorDiv = fichaEjecucion.parentElement;
                        while (contenedorDiv.firstChild) {
                            contenedorDiv.removeChild(contenedorDiv.firstChild);
                        }
                    });
                    fichaEjecucion.addEventListener('dragstart', e => {
                        const eliminarTexto = fichaEjecucion.querySelector('.eliminar-texto');
                        eliminarTexto.style.display = 'none';
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
                if (disco)
                {
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
                    fichaDisco.addEventListener('dblclick', () => {
                        const contenedorDiv = fichaDisco.parentElement;
                        while (contenedorDiv.firstChild) {
                            contenedorDiv.removeChild(contenedorDiv.firstChild);
                        }
                    });
                    fichaDisco.addEventListener('dragstart', e => {
                        const eliminarTexto = fichaDisco.querySelector('.eliminar-texto');
                        eliminarTexto.style.display = 'none';
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
                if (listo)
                {

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
                    fichaListo.addEventListener('dblclick', () => {
                        const contenedorDiv = fichaListo.parentElement;
                        while (contenedorDiv.firstChild) {
                            contenedorDiv.removeChild(contenedorDiv.firstChild);
                        }
                    });
                    fichaListo.addEventListener('dragstart', e => {
                        const eliminarTexto = fichaListo.querySelector('.eliminar-texto');
                        eliminarTexto.style.display = 'none';
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
                if (terminado)
                {

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
                    fichaTerminado.addEventListener('dblclick', () => {
                        const contenedorDiv = fichaTerminado.parentElement;
                        while (contenedorDiv.firstChild) {
                            contenedorDiv.removeChild(contenedorDiv.firstChild);
                        }
                    });
                    fichaTerminado.addEventListener('dragstart', e => {
                        const eliminarTexto = fichaTerminado.querySelector('.eliminar-texto');
                        eliminarTexto.style.display = 'none';
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
    }
}

// Funcion para agregar columnas (recuadros blancos)
function agregarColumna() {
    for (var i = 0; i < 2; i++) {

        // Crear un elemento div
        var nuevoDiv = document.createElement("div");
        // Agregar la clase 'recuadro-blanco' al elemento
        nuevoDiv.classList.add("recuadro-blanco");
        nuevoDiv.id = "recuadro-blanco-" + i + "-" + contadorColumnas;

        var id = "fila-" + i;
        // Obtener el elemento 'fila' por su id
        var fila = document.getElementById(id);

        console.log(fila);

        // Agregar el elemento div como un hijo de 'fila'
        fila.appendChild(nuevoDiv);
    }
    contadorColumnas++;
}


