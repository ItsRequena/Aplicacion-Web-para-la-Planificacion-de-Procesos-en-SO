const nuevaCuentaLink = document.getElementById("nuevaCuenta");

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
    data.userName = document.querySelector('#userName');
    data.password = document.querySelector('#password');
    $.ajax({
        url: '/Login/Login',
        data: JSON.stringify(data),
        async: true,
        method: 'POST',
        contentType: 'application/json',
        success: function (data) {
            console.log("DENTRO DEL AJAX");
            window.location.href = '/Login/Menu';
        }
    });
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