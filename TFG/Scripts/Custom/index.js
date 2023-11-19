const nombreUsuario = document.getElementById("userName");

$(document).ready(function () {
    console.log("entro!");
    var userName = "";
    $.ajax({
        url: '/Base/GetUsername',
        async: true,
        method: 'POST',
        contentType: 'application/json',
        success: function (data) {
            userName = data;
            nombreUsuario.innerHTML = userName;

        }
    });

});