const userNameProfesor = document.getElementById("userNameProfesor");

$(document).ready(function () {

});

function asignarRolProfesor() {

    data = {};
    data.userName = userNameProfesor.value;

    $.ajax({
        url: '/Login/asignarRolProfesor',
        data: JSON.stringify(data),
        async: false,
        method: 'POST',
        contentType: 'application/json',
        success: function (data) {
            if (data == "0") {
                Swal.fire({
                    title: 'Usuario con rol de profesor',
                    text: 'Se ha cambiado el rol a profesor correctamente',
                    icon: 'success',
                    confirmButtonText: 'Aceptar',
                    confirmButtonColor: '#3085d6',
                    allowOutsideClick: false
                }).then((result) => {
                    window.location.href = "/Login/MenuPrincipal";
                });
            }
            else if (data == "1") {
                Swal.fire({
                    title: 'Error',
                    text: 'El usuario introducido no existe',
                    icon: 'error',
                    confirmButtonText: 'Aceptar',
                    confirmButtonColor: '#3085d6',
                    allowOutsideClick: false
                }).then((result) => {
                });
            }
            else {
                Swal.fire({
                    title: 'Error',
                    text: 'Error al consultar los datos',
                    icon: 'error',
                    confirmButtonText: 'Aceptar',
                    confirmButtonColor: '#3085d6',
                    allowOutsideClick: false
                }).then((result) => {
                });
            }
        },
        error: function () {

        }
    });

}