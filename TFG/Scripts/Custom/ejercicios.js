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
                var cell3 = newRow.insertCell(3);

                cell1.textContent = "";
                cell2.textContent = "";
                cell2.textContent = "No hay ningún ejercicio";
                cell3.textContent = "";
                cell3.textContent = "";
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
                data.forEach(function (element) {
                    agregarFila(element.Id, element.HeuristicasId, element.NumProcesos, element.Subido);
                });
            }
        },
        error: function () {

        }
    });
});



function agregarFila(n, heuristica, numProcesos, subido) {
    var tbody = document.getElementById('table-body');
    var newRow = tbody.insertRow();
            
    var cell1 = newRow.insertCell(0);
    var cell2 = newRow.insertCell(1);
    var cell3 = newRow.insertCell(2);
    var cell4 = newRow.insertCell(3);
    var cell5 = newRow.insertCell(4);

    cell1.textContent = n;
    cell2.textContent = obtenerHeuristica(heuristica);
    cell3.textContent = numProcesos;
    cell4.textContent = subido;

    var button5 = document.createElement("button");
    button5.textContent = "Resolver";
    button5.classList.add("btnResolver");
    button5.id = "resolver-" + n;
    button5.addEventListener("click", function () {
        console.log("Botón clickeado");
        ResolverEjercicio(n);
    });
    cell5.appendChild(button5);


    const columnaBorrar = document.getElementById("columnaBorrar");
    $.ajax({
        url: '/Base/isProfesor',
        async: true,
        method: 'POST',
        success: function (data) {
            if (data == 'True') {
                columnaBorrar.hidden = false;
                var cell6 = newRow.insertCell(5);
                var button6 = document.createElement("button");
                button6.textContent = "Eliminar";
                button6.classList.add("btnEliminar");
                button6.id = "eliminar-" + n;
                cell6.appendChild(button6);
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

