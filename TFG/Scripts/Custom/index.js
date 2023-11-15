const nombreUsuario = document.getElementById("userName");

$(document).ready(function () {

    var userName = "";
    $.ajax({
        url: '/Base/GetUsername',
        data: JSON.stringify(data),
        async: true,
        method: 'POST',
        contentType: 'application/json',
        success: function (data) {
            userName = data;
            nombreUsuario.innerHTML = userName;

        }
    });

});