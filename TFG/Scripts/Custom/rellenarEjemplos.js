const tipoHeuristica = document.getElementById("tipoHeuristcia");
var fichaE = "";
var fichaD = "";
var fichaL = "";
var fichaT = "";

$(document).ready(function () {
    console.log("---");
    console.log(tipoHeuristica);
    console.log(tipoHeuristica.innerText);

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


    if (tipoHeuristica.innerText == "FCFS") {
        rellenarFCFS();
    }
    else if (tipoHeuristica.innerText == "SJF") {
        rellenarSJFaprop();
        rellenarSJFcoop();
    }
    else {
        rellenarRR();
    }

});

function rellenarFCFS() {

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

    // Fila 0
    var elemento = document.querySelector('#recuadro-blanco-0-0');
    var fichaClonada = fichaE.cloneNode(true);
    elemento.appendChild(fichaClonada);

    elemento = document.querySelector('#recuadro-blanco-0-1');
    fichaClonada = fichaE.cloneNode(true);
    elemento.appendChild(fichaClonada);

    elemento = document.querySelector('#recuadro-blanco-0-2');
    fichaClonada = fichaD.cloneNode(true);
    elemento.appendChild(fichaClonada);

    elemento = document.querySelector('#recuadro-blanco-0-3');
    fichaClonada = fichaE.cloneNode(true);
    elemento.appendChild(fichaClonada);

    elemento = document.querySelector('#recuadro-blanco-0-4');
    fichaClonada = fichaT.cloneNode(true);
    elemento.appendChild(fichaClonada);

    // Fila 1
    elemento = document.querySelector('#recuadro-blanco-1-1');
    fichaClonada = fichaL.cloneNode(true);
    elemento.appendChild(fichaClonada);

    elemento = document.querySelector('#recuadro-blanco-1-2');
    fichaClonada = fichaE.cloneNode(true);
    elemento.appendChild(fichaClonada);

    elemento = document.querySelector('#recuadro-blanco-1-3');
    fichaClonada = fichaD.cloneNode(true);
    elemento.appendChild(fichaClonada);

    elemento = document.querySelector('#recuadro-blanco-1-4');
    fichaClonada = fichaE.cloneNode(true);
    elemento.appendChild(fichaClonada);

    elemento = document.querySelector('#recuadro-blanco-1-5');
    fichaClonada = fichaE.cloneNode(true);
    elemento.appendChild(fichaClonada);

    elemento = document.querySelector('#recuadro-blanco-1-6');
    fichaClonada = fichaT.cloneNode(true);
    elemento.appendChild(fichaClonada);

}

function rellenarSJFaprop() {

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

    // Fila 0
    var elemento = document.querySelector('#recuadro-blancoA-0-0');
    var fichaClonada = fichaE.cloneNode(true);
    elemento.appendChild(fichaClonada);

    elemento = document.querySelector('#recuadro-blancoA-0-1');
    fichaClonada = fichaL.cloneNode(true);
    elemento.appendChild(fichaClonada);

    elemento = document.querySelector('#recuadro-blancoA-0-2');
    fichaClonada = fichaE.cloneNode(true);
    elemento.appendChild(fichaClonada);

    elemento = document.querySelector('#recuadro-blancoA-0-3');
    fichaClonada = fichaE.cloneNode(true);
    elemento.appendChild(fichaClonada);

    elemento = document.querySelector('#recuadro-blancoA-0-4');
    fichaClonada = fichaD.cloneNode(true);
    elemento.appendChild(fichaClonada);

    elemento = document.querySelector('#recuadro-blancoA-0-5');
    fichaClonada = fichaE.cloneNode(true);
    elemento.appendChild(fichaClonada);

    elemento = document.querySelector('#recuadro-blancoA-0-6');
    fichaClonada = fichaT.cloneNode(true);
    elemento.appendChild(fichaClonada);

    // Fila 1

    elemento = document.querySelector('#recuadro-blancoA-1-1');
    fichaClonada = fichaE.cloneNode(true);
    elemento.appendChild(fichaClonada);

    elemento = document.querySelector('#recuadro-blancoA-1-2');
    fichaClonada = fichaD.cloneNode(true);
    elemento.appendChild(fichaClonada);

    elemento = document.querySelector('#recuadro-blancoA-1-3');
    fichaClonada = fichaD.cloneNode(true);
    elemento.appendChild(fichaClonada);

    elemento = document.querySelector('#recuadro-blancoA-1-4');
    fichaClonada = fichaE.cloneNode(true);
    elemento.appendChild(fichaClonada);

    elemento = document.querySelector('#recuadro-blancoA-1-5');
    fichaClonada = fichaL.cloneNode(true);
    elemento.appendChild(fichaClonada);

    elemento = document.querySelector('#recuadro-blancoA-1-6');
    fichaClonada = fichaE.cloneNode(true);
    elemento.appendChild(fichaClonada);

    elemento = document.querySelector('#recuadro-blancoA-1-7');
    fichaClonada = fichaE.cloneNode(true);
    elemento.appendChild(fichaClonada);

    elemento = document.querySelector('#recuadro-blancoA-1-8');
    fichaClonada = fichaT.cloneNode(true);
    elemento.appendChild(fichaClonada);
}

function rellenarSJFcoop() {

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

    // Fila 0
    var elemento = document.querySelector('#recuadro-blancoC-0-0');
    var fichaClonada = fichaE.cloneNode(true);
    elemento.appendChild(fichaClonada);

    elemento = document.querySelector('#recuadro-blancoC-0-1');
    fichaClonada = fichaD.cloneNode(true);
    elemento.appendChild(fichaClonada);

    elemento = document.querySelector('#recuadro-blancoC-0-2');
    fichaClonada = fichaD.cloneNode(true);
    elemento.appendChild(fichaClonada);

    elemento = document.querySelector('#recuadro-blancoC-0-3');
    fichaClonada = fichaD.cloneNode(true);
    elemento.appendChild(fichaClonada);

    elemento = document.querySelector('#recuadro-blancoC-0-4');
    fichaClonada = fichaL.cloneNode(true);
    elemento.appendChild(fichaClonada);

    elemento = document.querySelector('#recuadro-blancoC-0-5');
    fichaClonada = fichaE.cloneNode(true);
    elemento.appendChild(fichaClonada);

    elemento = document.querySelector('#recuadro-blancoC-0-6');
    fichaClonada = fichaE.cloneNode(true);
    elemento.appendChild(fichaClonada);

    elemento = document.querySelector('#recuadro-blancoC-0-7');
    fichaClonada = fichaT.cloneNode(true);
    elemento.appendChild(fichaClonada);

    // Fila 1
    elemento = document.querySelector('#recuadro-blancoC-1-0');
    fichaClonada = fichaL.cloneNode(true);
    elemento.appendChild(fichaClonada);

    elemento = document.querySelector('#recuadro-blancoC-1-1');
    fichaClonada = fichaE.cloneNode(true);
    elemento.appendChild(fichaClonada);

    elemento = document.querySelector('#recuadro-blancoC-1-2');
    fichaClonada = fichaE.cloneNode(true);
    elemento.appendChild(fichaClonada);

    elemento = document.querySelector('#recuadro-blancoC-1-3');
    fichaClonada = fichaD.cloneNode(true);
    elemento.appendChild(fichaClonada);

    elemento = document.querySelector('#recuadro-blancoC-1-4');
    fichaClonada = fichaE.cloneNode(true);
    elemento.appendChild(fichaClonada);

    elemento = document.querySelector('#recuadro-blancoC-1-5');
    fichaClonada = fichaT.cloneNode(true);
    elemento.appendChild(fichaClonada);
}

function rellenarRR() {


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

    // Fila 0
    var elemento = document.querySelector('#recuadro-blancoR-0-0');
    var fichaClonada = fichaE.cloneNode(true);
    elemento.appendChild(fichaClonada);

    elemento = document.querySelector('#recuadro-blancoR-0-1');
    fichaClonada = fichaE.cloneNode(true);
    elemento.appendChild(fichaClonada);

    elemento = document.querySelector('#recuadro-blancoR-0-2');
    fichaClonada = fichaL.cloneNode(true);
    elemento.appendChild(fichaClonada);

    elemento = document.querySelector('#recuadro-blancoR-0-3');
    fichaClonada = fichaL.cloneNode(true);
    elemento.appendChild(fichaClonada);

    elemento = document.querySelector('#recuadro-blancoR-0-4');
    fichaClonada = fichaE.cloneNode(true);
    elemento.appendChild(fichaClonada);

    elemento = document.querySelector('#recuadro-blancoR-0-5');
    fichaClonada = fichaD.cloneNode(true);
    elemento.appendChild(fichaClonada);

    elemento = document.querySelector('#recuadro-blancoR-0-6');
    fichaClonada = fichaE.cloneNode(true);
    elemento.appendChild(fichaClonada);

    elemento = document.querySelector('#recuadro-blancoR-0-7');
    fichaClonada = fichaE.cloneNode(true);
    elemento.appendChild(fichaClonada);

    elemento = document.querySelector('#recuadro-blancoR-0-8');
    fichaClonada = fichaL.cloneNode(true);
    elemento.appendChild(fichaClonada);

    elemento = document.querySelector('#recuadro-blancoR-0-9');
    fichaClonada = fichaE.cloneNode(true);
    elemento.appendChild(fichaClonada);

    elemento = document.querySelector('#recuadro-blancoR-0-10');
    fichaClonada = fichaT.cloneNode(true);
    elemento.appendChild(fichaClonada);

    // Fila 1

    elemento = document.querySelector('#recuadro-blancoR-1-1');
    fichaClonada = fichaL.cloneNode(true);
    elemento.appendChild(fichaClonada);

    elemento = document.querySelector('#recuadro-blancoR-1-2');
    fichaClonada = fichaE.cloneNode(true);
    elemento.appendChild(fichaClonada);

    elemento = document.querySelector('#recuadro-blancoR-1-3');
    fichaClonada = fichaE.cloneNode(true);
    elemento.appendChild(fichaClonada);

    elemento = document.querySelector('#recuadro-blancoR-1-4');
    fichaClonada = fichaL.cloneNode(true);
    elemento.appendChild(fichaClonada);

    elemento = document.querySelector('#recuadro-blancoR-1-5');
    fichaClonada = fichaE.cloneNode(true);
    elemento.appendChild(fichaClonada);

    elemento = document.querySelector('#recuadro-blancoR-1-6');
    fichaClonada = fichaD.cloneNode(true);
    elemento.appendChild(fichaClonada);

    elemento = document.querySelector('#recuadro-blancoR-1-7');
    fichaClonada = fichaL.cloneNode(true);
    elemento.appendChild(fichaClonada);

    elemento = document.querySelector('#recuadro-blancoR-1-8');
    fichaClonada = fichaE.cloneNode(true);
    elemento.appendChild(fichaClonada);

    elemento = document.querySelector('#recuadro-blancoR-1-9');
    fichaClonada = fichaT.cloneNode(true);
    elemento.appendChild(fichaClonada);

}