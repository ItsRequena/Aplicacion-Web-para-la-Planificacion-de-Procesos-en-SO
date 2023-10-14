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
                    const fichaDisco = document.querySelector('#Disco');
                    const fichaClonada = document.getElementById('Disco').cloneNode(true);
                    contenedorFichasDisco.appendChild(fichaClonada);

                    fichaDisco.id = "DiscoIn";
                    fichaDisco.classList.add('cruz-roja');

                    while (fragmento.firstChild) {
                        fragmento.removeChild(fragmento.firstChild);
                    }

                    fragmento.appendChild(fichaDisco);
                    inicializarFichaDisco();
                }
                if (listo)
                {
                    const fichaListo = document.querySelector('#Listo');
                    const fichaClonada = document.getElementById('Listo').cloneNode(true);
                    contenedorFichasListo.appendChild(fichaClonada);

                    fichaListo.id = "ListoIn";
                    fichaListo.classList.add('cruz-roja');

                    while (fragmento.firstChild) {
                        fragmento.removeChild(fragmento.firstChild);
                    }

                    fragmento.appendChild(fichaListo);
                    inicializarFichaListo();
                }
                if (terminado)
                {
                    const fichaTerminado = document.querySelector('#Terminado');
                    const fichaClonada = document.getElementById('Terminado').cloneNode(true);
                    contenedorFichasTerminado.appendChild(fichaClonada);

                    fichaTerminado.id = "TerminadoIn";
                    fichaTerminado.classList.add('cruz-roja');

                    while (fragmento.firstChild) {
                        fragmento.removeChild(fragmento.firstChild);
                    }

                    fragmento.appendChild(fichaTerminado);
                    inicializarFichaTerminado();
                }
            });
        }
    }
}


