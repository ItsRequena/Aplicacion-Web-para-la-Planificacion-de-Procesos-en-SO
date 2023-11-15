const nuevaCuentaLink = document.getElementById("nuevaCuenta");
const divMensajeError = document.getElementById("mensajeError");

$(document).ready(function () {

});


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

$('#access').off('click').click(function () {
    var data = {};
    while (divMensajeError.firstChild) {
        divMensajeError.removeChild(divMensajeError.firstChild);
    }
    var username = document.getElementById("userName").value;
    var password = document.getElementById("password").value;

    var nuevoDiv = document.createElement("div");
    console.log(username);
    console.log(password);
    if (username == "") {
        nuevoDiv.textContent = `El campo nombre de usuario no puede ser vacío`;
        nuevoDiv.classList.add("mensajeError");
        divMensajeError.appendChild(nuevoDiv);
    }
    else if (password == "") {
        nuevoDiv.textContent = `El campo contraseña no puede ser vacío`;
        nuevoDiv.classList.add("mensajeError");
        divMensajeError.appendChild(nuevoDiv);
    }
    else {
        data.userName = username;
        data.password = password;
        $.ajax({
            url: '/Login/Login',
            data: JSON.stringify(data),
            async: true,
            method: 'POST',
            contentType: 'application/json',
            success: function (data) {
                if (data == "1") {
                    Swal.fire({
                        title: 'Error',
                        text: 'Nombre de usuario y/o contraseña incorrectos',
                        icon: 'error',
                        confirmButtonText: 'Aceptar',
                        confirmButtonColor: '#3085d6',
                        allowOutsideClick: false
                    }).then((result) => {
                    });
                }
                else {

                    window.location.href = '/Login/MenuPrincipal';
                }
            }
        });
    }
});

nuevaCuentaLink.addEventListener("click", function (event) {
    event.preventDefault();
    window.location.href = "/Login/Register";
});

















/*
$('#access').off('click').click(function () {
    console.log("access");
    $.ajax({
        url: '/Login/Menu/',
        method: 'POST',
        success: function (data) {
            console.log("DENTRO DEL AJAX");
            window.location.href = '/Login/Menu/';
        }
    });
});


$('#drag').off('click').click(function () {
    console.log("drag");
    $.ajax({
        url: '/Login/Ejercicios',
        method: 'POST',
        success: function (data) {
            console.log("DENTRO DEL AJAX");
            //window.location.href = '/Login/Ejercicios';
        }
    });
});
*/