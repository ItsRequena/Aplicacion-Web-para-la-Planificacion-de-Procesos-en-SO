function clearText(element) {
    if (element.value === "") {
        element.placeholder = "";
    }
}

function restoreTextU(element) {
    if (element.value === '') {
        element.placeholder = "Nombre de usuario";
    }
}

function restoreTextP(element) {
    if (element.value === '') {
        element.placeholder = "Contraseña";
    }
}




