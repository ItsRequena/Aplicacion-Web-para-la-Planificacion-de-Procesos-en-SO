const nombreUsuario = document.getElementById("userName");
const userNameLink = document.getElementById('userName');
const dropdownMenu = document.getElementById('dropdownMenu');

const AsignarProfesor = document.getElementById('AsignarProfesor');
$(document).ready(function () {
    var userName = "";
    $.ajax({
        url: '/Base/GetUsername',
        async: true,
        method: 'POST',
        contentType: 'application/json',
        success: function (data) {
            if (data == "logout") {
                window.location.href = '/Ejercicios/LoginView';
            }
            else {
                userName = data;
                nombreUsuario.innerHTML = userName;
            }

        }
    });

    $.ajax({
        url: '/Base/isProfesor',
        async: true,
        method: 'POST',
        success: function (data) {
            if (data == 'True') {
                console.log("-----");
                console.log(data);
                AsignarProfesor.hidden = false;
            }
            else {
                AsignarProfesor.hidden = true;
            }
        },
        error: function () {

        }
    });

});

userNameLink.addEventListener('mouseover', function () {
    var rect = userNameLink.getBoundingClientRect();
    dropdownMenu.style.display = 'block';
    dropdownMenu.style.top = rect.bottom + 'px';
    dropdownMenu.style.left = rect.left + 'px';
});

userNameLink.addEventListener('mouseout', function (event) {
    if (!userNameLink.contains(event.relatedTarget) && !dropdownMenu.contains(event.relatedTarget)) {
        dropdownMenu.style.display = 'none';
    }
});

dropdownMenu.addEventListener('mouseout', function (event) {
    if (!dropdownMenu.contains(event.relatedTarget)) {
        dropdownMenu.style.display = 'none';
    }
});