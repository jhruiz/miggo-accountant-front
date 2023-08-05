
var loginFunction = function() {  

    var email = $('#email').val();
    var password = $('#password').val();

    $.ajax({
        method: 'POST',
        url: url_back + 'login?',
        contentType: "application/x-www-form-urlencoded",
        dataType: "json",
        data: { 
            email: email, password: password },
        success: function(respuesta) {

            if (respuesta.data) {
                //Almacena la información del usuario en el local storage
                localStorage.setItem('email', respuesta.data.email);
                localStorage.setItem('id', respuesta.data.id);
                localStorage.setItem('nombres', respuesta.data.tercero_id ? respuesta.data.tercero.nombres : 'Usuario');
                localStorage.setItem('empresa_id', respuesta.data.empresa_id);
                localStorage.setItem('empresa', respuesta.data.empresa.nombre);
                localStorage.setItem('msgpuc', respuesta.data.empresa.msgpuc);
                localStorage.setItem('pucedit', respuesta.data.empresa.pucedit);
                localStorage.setItem('moneda', respuesta.data.empresa.moneda);
                localStorage.setItem('nivelgasto', respuesta.data.empresa.nivelgasto);
                localStorage.setItem('sucursal', respuesta.data.empresa.empresa_id? respuesta.data.empresa.empresa_id : '');
                localStorage.setItem('access_token', respuesta.access_token);
                localStorage.setItem('perfile_id', respuesta.data.perfile_id);
                localStorage.setItem('nivelperfil', respuesta.data.perfile.nivel);
                localStorage.setItem('perfile', respuesta.data.perfile.descripcion);
                localStorage.setItem('decimalPeso', respuesta.data.empresa.decimale.decimalPeso);
                localStorage.setItem('decimalMoneda', respuesta.data.empresa.decimale.decimalMoneda);
                localStorage.setItem('date', new Date());            

                sweetMessage('success', 'login correcto'); 

                // window.location.href = window.location+'main/main.html';
                window.location.href =  url_front + 'main/main.html';
            } else {
                sweetMessage('warning', respuesta.message);
            }
            
        },
        error: function(data) {
            var mensaje = 'Se produjo un error. Por favor, inténtelo nuevamente'.
            sweetMessage('error', mensaje);
        }
      })
}

var enviarCorreo = function() {  
 
    url ='sendPasswordResetLink';
    var email = $('#forgot').val();

    $.ajax({
        method: 'POST',
        url: url_back + url,
        contentType: "application/x-www-form-urlencoded",
        dataType: "json",
        data: { email: email },
        success: function(respuesta) {

            console.log(respuesta);

            if (respuesta) {
                sweetMessage('success', 'Correo electrónico se envió con éxito'); 
                alert(respuesta.data);
                window.location.href =  home;
            } else {
                sweetMessage('warning', respuesta.mensaje);
            }
            
        },
        error: function(data) {
            console.log(data);
            if(data.responseJSON){
                if(data.responseJSON.message){
                    var mensaje = 'Se produjo un error.:'+ data.responseJSON.message;
                    sweetMessage('error', mensaje);
                }else if(data.responseJSON.error){
                    var mensaje = 'Se produjo un error.:'+ data.responseJSON.error;
                    sweetMessage('error', mensaje);
                }
            }
        }
      })


}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}


var cambioPassword = function () {

     var token = getParameterByName('token');
     var email = getParameterByName('email');
     var password = $('#password').val();
     var passwordConfirm = $('#password-confirm').val();
     var url = 'resetPassword';

     $.ajax({
        method: 'POST',
        url: url_back + url,
        contentType: "application/x-www-form-urlencoded",
        dataType: "json",
        data: { resetToken: token, email: email, password: password, password_confirmation: passwordConfirm  },
        success: function(respuesta) {

            if (respuesta) {
                console.log(respuesta.data)
                sweetMessage('success', 'La contraseña ha sido actualizada'); 
                window.location.href =  home;

            } else {
                sweetMessage('warning', respuesta.mensaje);
            }
            
        },
        error: function(data) {
            var mensaje = 'Se produjo un error. Por favor, inténtelo nuevamente'.
            sweetMessage('error', mensaje);
        }
      })



}

$( document ).ready(function() {
    localStorage.clear();
    $('#make-login').click(loginFunction);
    $('#make-forgot').click(enviarCorreo);
    $('#make-recover').click(cambioPassword);

});