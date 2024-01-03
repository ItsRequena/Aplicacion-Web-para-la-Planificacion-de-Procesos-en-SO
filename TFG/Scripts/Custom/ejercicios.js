$(document).ready(function () {


    $.ajax({
        url: '/Ejercicios/obtenerEjercicios',
        async: true,
        method: 'POST',
        success: function (data) {
            console.log(data);
            if (data == 1) {
                var tbody = document.getElementById('table-body');
                var newRow = tbody.insertRow();
            
                var cell1 = newRow.insertCell(0);
                var cell2 = newRow.insertCell(1);
                var cell3 = newRow.insertCell(2);
                var cell4 = newRow.insertCell(3);

                cell1.textContent = "";
                cell2.textContent = "No hay ningún ejercicio";
                cell3.textContent = "";
                cell4.textContent = "";
            }
            else if (data == 2) {
                Swal.fire({
                    title: 'Error',
                    text: 'Error al cargar los ejercicios',
                    icon: 'error', 
                    confirmButtonText: 'Aceptar', 
                    confirmButtonColor: '#3085d6',
                    allowOutsideClick: false 
                }).then((result) => {});
            }
            else {
                data.ejercicios.forEach(function (element) {
                    var procesos = [];
                    data.procesos.forEach(function (proces) {
                        if (proces.EjercicioId == element.Id) {
                            procesos.push(proces);
                        }
                    });
                    agregarFila(element.Id, element.HeuristicasId, element.NumProcesos, element.Subido, procesos);
                });
            }
        },
        error: function () {

        }
    });
});



function agregarFila(n, heuristica, numProcesos, subido, procesos) {

    var tbody = document.getElementById('table-body');
    var newRow = tbody.insertRow();
            
    var cell1 = newRow.insertCell(0);
    var cell2 = newRow.insertCell(1);
    var cell3 = newRow.insertCell(2);
    var cell4 = newRow.insertCell(3);
    var cell5 = newRow.insertCell(4);
    var cell6 = newRow.insertCell(5);

    cell1.textContent = n;
    cell2.textContent = obtenerHeuristica(heuristica);
    cell3.textContent = numProcesos;

    var rafagas = "";
    procesos.forEach(function (proces) {
        var rafaga = proces.rafaga.split(",").join(" - ");
        rafagas += rafaga + "<br>";

    });
    cell4.innerHTML = rafagas;
    cell4.style.whiteSpace = "pre-line";
    cell4.classList.remove("text-center");

    cell5.textContent = subido;

    var button5 = document.createElement("button");
    button5.textContent = "Resolver";
    button5.classList.add("btnResolver");
    button5.id = "resolver-" + n;
    button5.addEventListener("click", function () {
        ResolverEjercicio(n);
    });
    cell6.appendChild(button5);


    const columnaBorrar = document.getElementById("columnaBorrar");
    $.ajax({
        url: '/Base/isProfesor',
        async: true,
        method: 'POST',
        success: function (data) {
            if (data == 'True') {
                columnaBorrar.hidden = false;
                var cell7 = newRow.insertCell(6);
                var button6 = document.createElement("button");
                button6.textContent = "Eliminar";
                button6.classList.add("btnEliminar");
                button6.id = "eliminar-" + n;
                button6.addEventListener("click", function () {
                    EliminarEjercicio(n);
                });
                cell7.appendChild(button6);
            }
            else {
                columnaBorrar.hidden = true;
            }
        },
        error: function () {
            return false;
        }
    });
}

function obtenerHeuristica(heuristicaId) {
    var heuristica = "";
    switch (heuristicaId) {
        case 1:
            heuristica = "FCFS";
            break;
        case 2:
            heuristica = "SJF cooperativo";
            break;
        case 3:
            heuristica = "SJF apropiativo";
            break;
        case 4:
            heuristica = "RR";
            break;
        default:
            break;
    }
    return heuristica;
}

function ResolverEjercicio(ejercicioId) {
    var data = {};
    data.ejercicioId = ejercicioId;

    $.ajax({
        url: '/Ejercicios/MostrarEjercicio',
        data: JSON.stringify(data),
        async: false,
        method: 'POST',
        contentType: 'application/json',
        success: function (data) { 
            window.location.href = '/Ejercicios/Ejercicio';
        },
        error: function () {
        }
    });

}

function EliminarEjercicio(ejercicioId) {
    var data = {};
    data.ejercicioId = ejercicioId;

    $.ajax({
        url: '/Ejercicios/EliminarEjercicio',
        data: JSON.stringify(data),
        async: false,
        method: 'POST',
        contentType: 'application/json',
        success: function (data) {
            console.log("---------");
            console.log(data);
            if (data == 0) {
                Swal.fire({
                    title: 'Eliminado',
                    text: 'Ejercicio eliminado!',
                    icon: 'success',
                    confirmButtonText: 'Aceptar',
                    confirmButtonColor: '#3085d6',
                    allowOutsideClick: false
                }).then((result) => { });
            }
            else {
                Swal.fire({
                    title: 'Error',
                    text: 'Error al eliminar el ejercicio',
                    icon: 'error',
                    confirmButtonText: 'Aceptar',
                    confirmButtonColor: '#3085d6',
                    allowOutsideClick: false
                }).then((result) => { });
            }
        },
        error: function () {
        }
    });

}

