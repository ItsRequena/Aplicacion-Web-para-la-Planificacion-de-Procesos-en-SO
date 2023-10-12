const fichaEjecucion = document.querySelector('#Ejecucion');
const fichaDisco = document.querySelector('#Disco');
const fichaListo = document.querySelector('#Listo');
const fichaTerminado = document.querySelector('#Terminado');

var ejecucion = false;
var disco = false;
var listo = false;
var terminado = false;
var matriz = [];
$(document).ready(function () {
    inicializarDragDropsFichas();
    inicializarDragDropsMatriz();
});

function inicializarDragDropsFichas() {

    // Ficha ejecución
    fichaEjecucion.addEventListener('dragstart', e => {
        console.log("Start Ejecucion");
        ejecucion = true;
    });
    fichaEjecucion.addEventListener('dragend', e => {
        console.log("End Ejecucion");
        ejecucion = false;
    });

    // Ficha disco
    fichaDisco.addEventListener('dragstart', e => {
        console.log("start Disco");
        disco = true;
    });
    fichaDisco.addEventListener('dragend', e => {
        console.log("end Disco");
        disco = false;
    });

    // Ficha listo
    fichaListo.addEventListener('dragstart', e => {
        console.log("start Listo");
        listo = true;
    });
    fichaListo.addEventListener('dragstart', e => {
        console.log("end Listo");
        listo = false;
    });

    // Ficha terminado
    fichaTerminado.addEventListener('dragstart', e => {
        console.log("start Terminado");
        terminado = true;
    });
    fichaTerminado.addEventListener('dragstart', e => {
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
            console.log(recuadro);

            const fragmento = document.querySelector('#'+recuadro);
            console.log(fragmento);
            fragmento.addEventListener('dragover', e => {
                e.preventDefault();
                console.log("estoy encima de " + fragmento);
            });

            fragmento.addEventListener('drop', e => {
                console.log("suelto en " + fragmento);
                if (ejecucion) { fragmento.appendChild(fichaEjecucion); }
                if (disco) { fragmento.appendChild(fichaDisco); }
                if (listo) { fragmento.appendChild(fichaListo); }
                if (terminado) { fragmento.appendChild(fichaTerminado); }
            });
        }
    }
}


