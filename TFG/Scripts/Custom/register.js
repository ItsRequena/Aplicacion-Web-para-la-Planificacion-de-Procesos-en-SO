function registrar() {
    var nombre = document.getElementById("nombre").value;
    var apellidos = document.getElementById("apellidos").value;
    var userName = document.getElementById("userName").value;
    var correo = document.getElementById("correo").value;
    var password = document.getElementById("password").value;
    if (nombre == "" || apellidos == "" || userName == "" || correo == "" || password == "") {
        Swal.fire({
            title: 'Error',
            text: 'No puede haber ningun campo vacio',
            icon: 'error', // Puedes cambiar el icono (warning, success, error, info, etc.)
            confirmButtonText: 'Aceptar', 
            confirmButtonColor: '#3085d6',
            allowOutsideClick: false 
        }).then((result) => {
        });
    }
    else if (!validarEmail(correo)) {
        Swal.fire({
            title: 'Error',
            text: 'El correo no tiene el formato correcto',
            icon: 'error', // Puedes cambiar el icono (warning, success, error, info, etc.)
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#3085d6', 
            allowOutsideClick: false 
        }).then((result) => {
        });
    }
    else {
        var data = {};
        data.nombre = nombre;
        data.apellidos = apellidos;
        data.userName = userName;
        data.correo = correo;
        data.password = password;

        $.ajax({
            url: '/Login/RegisterUser',
            data: JSON.stringify(data),
            async: false,
            method: 'POST',
            contentType: 'application/json',
            success: function (data) {
                console.log("ILLO");
                console.log(data);
                if (data == "0") {
                    Swal.fire({
                        title: 'Usuario Registrado',
                        text: 'Usuario registrado correctamente',
                        icon: 'success',
                        confirmButtonText: 'Aceptar',
                        confirmButtonColor: '#3085d6',
                        allowOutsideClick: false
                    }).then((result) => {
                        window.location.href = "/Login/index";
                    });
                }
                else if (data == "1") {
                    Swal.fire({
                        title: 'Error',
                        text: 'Ya existe el userName introducido',
                        icon: 'error',
                        confirmButtonText: 'Aceptar',
                        confirmButtonColor: '#3085d6',
                        allowOutsideClick: false
                    }).then((result) => {
                    });
                }
                else if (data == "2") {
                    Swal.fire({
                        title: 'Error',
                        text: 'Ya existe el email introducido',
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
                        text: 'Error al registrar los datos',
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
}

function validarEmail(email) {
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return regex.test(email);
}

function cambiarContraseña() {
    var userName = document.getElementById("nombre").value;
    var password = document.getElementById("password").value;
    var newpassword = document.getElementById("newpassword").value;

    var data = {};
    data.userName = userName;
    data.password = password;
    data.newpassword = newpassword;

    $.ajax({
        url: '/Login/CambiarPassword',
        data: JSON.stringify(data),
        async: false,
        method: 'POST',
        contentType: 'application/json',
        success: function (data) {
            console.log("ILLO");
            console.log(data);
            if (data == "0") {
                Swal.fire({
                    title: 'Contraseña Cambiada!',
                    text: 'Contraseña cambiada correctamente',
                    icon: 'success',
                    confirmButtonText: 'Aceptar',
                    confirmButtonColor: '#3085d6',
                    allowOutsideClick: false
                }).then((result) => {
                    window.location.href = "/Login/index";
                });
            }
            else if (data == "1") {
                Swal.fire({
                    title: 'Error',
                    text: 'El usuario y contraseña no coinciden con ningun usuario registrado',
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
                    text: 'Error al registrar los datos',
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

function recuperarContraseña() {

    var userName = document.getElementById("nombre").value;
    var email = document.getElementById("email").value;

    var data = {};
    data.userName = userName;
    data.email = email;

    $.ajax({
        url: '/Login/RecuperarPassword',
        data: JSON.stringify(data),
        async: false,
        method: 'POST',
        contentType: 'application/json',
        success: function (data) {
            console.log("ILLO");
            console.log(data);
            if (data == "0") {
                Swal.fire({
                    title: 'Correo enviado',
                    text: 'Se ha enviado un correo con la nueva contraseña. Por favor, revise la carpeta spam y siga los pasos del correo para reestablecer la contraseña.',
                    icon: 'success',
                    confirmButtonText: 'Aceptar',
                    confirmButtonColor: '#3085d6',
                    allowOutsideClick: false
                }).then((result) => {
                    window.location.href = "/Login/index";
                });
            }
            else if (data == "1") {
                Swal.fire({
                    title: 'Error',
                    text: 'El usuario y correo no coinciden con ningun usuario registrado',
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
                    text: 'Error al comprobar datos',
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