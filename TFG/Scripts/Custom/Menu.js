
const numProcesosInput = document.getElementById("numProcesos");
const procesosDiv = document.getElementById("Procesos");
numProcesosInput.addEventListener("input", function () {
    procesosDiv.innerHTML = ""; // Limpiar contenido anterior
    const numProcesos = parseInt(numProcesosInput.value);
    for (let i = 1; i <= numProcesos; i++) {
        const div = document.createElement(`div`);
        div.id = `proceso${i}`; // Asignar el ID único al div
        div.classList.add("text-center"); // Agregar la clase que centra el contenido
        div.innerHTML = `<h3 class="text-center">---------------- Proceso ${i} ----------------</h3>`;
        div.innerHTML += '<label for= "numProcesos">Introduzca el tiempo de llegada:&nbsp</label>'; 
        div.innerHTML += `<input type="text" id="tllegada${i}">`;
        div.innerHTML += '<br/>';
        div.innerHTML += '<label for= "numRafagas">Introduzca el número de ráfagas:&nbsp</label>';
        div.innerHTML += `<input type="text" id="numRafagas${i}">`;
        procesosDiv.appendChild(div);
    }
});
