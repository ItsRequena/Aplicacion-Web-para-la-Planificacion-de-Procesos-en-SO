
function registrar() {
    var nombre = document.getElementById("nombre").value;
    console.log(nombre);
    var apellidos = document.getElementById("apellidos").value;
    console.log(apellidos);
    var userName = document.getElementById("userName").value;
    console.log(userName);
    var correo = document.getElementById("correo").value;
    console.log(correo);
    var pasword = document.getElementById("password").value;
    console.log(pasword);
    if (nombre == "" || apellidos == "" || userName == "" || correo == "" || pasword == "") {
        Swal.fire({
            title: 'Error',
            text: 'No puede haber ningun campo vacio',
            icon: 'error', // Puedes cambiar el icono (warning, success, error, info, etc.)
            confirmButtonText: 'Aceptar', // Puedes personalizar el texto del botón
            confirmButtonColor: '#3085d6', // Puedes personalizar el color del botón
            allowOutsideClick: false // Puedes controlar si se permite hacer clic fuera del cuadro de diálogo
        }).then((result) => {
        });
    }
    else if (!validarEmail(correo)) {
        Swal.fire({
            title: 'Error',
            text: 'El correo no tiene el formato correcto',
            icon: 'error', // Puedes cambiar el icono (warning, success, error, info, etc.)
            confirmButtonText: 'Aceptar', // Puedes personalizar el texto del botón
            confirmButtonColor: '#3085d6', // Puedes personalizar el color del botón
            allowOutsideClick: false // Puedes controlar si se permite hacer clic fuera del cuadro de diálogo
        }).then((result) => {
        });
    }
    else {
        Swal.fire({
            title: 'Usuario Registrado',
            text: 'Usuario registrado correctamente',
            icon: 'success', // Puedes cambiar el icono (warning, success, error, info, etc.)
            confirmButtonText: 'Aceptar', // Puedes personalizar el texto del botón
            confirmButtonColor: '#3085d6', // Puedes personalizar el color del botón
            allowOutsideClick: false // Puedes controlar si se permite hacer clic fuera del cuadro de diálogo
        }).then((result) => {
            if (result.isConfirmed) {

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
                        console.log("------------");
                        console.log(data);
                        var contenido = "";
                        for (var clave in data) {
                            if (data.hasOwnProperty(clave)) {
                                console.log("Clave: " + clave);
                                console.log("Lista: " + data[clave].join(", ")); // Convierte la lista en una cadena y la imprime
                                contenido += data[clave].join(", ") + "\n";
                            }
                        }
                        document.getElementById("mostrarSolucion").value = contenido;
                        console.log("------------");
                    },
                    error: function () {

                    }
                });



                //window.location.href = "/Login/index";
            }
        });
    }
}


function validarEmail(email) {
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return regex.test(email);
}