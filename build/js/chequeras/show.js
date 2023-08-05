
function obtenerChequera(id){
  var url = 'chequeras/'+ id;
  
  $.ajax({
      method: "GET",
      url: url_back + url,
      headers: { 
                    Authorization: 'Bearer ' + localStorage.access_token
                },
      dataType: "json",
      success: function(respuesta) {
  
          $('#prefijo').val(respuesta.data.prefijo);
          $('#numeroinicial').val(respuesta.data.numeroinicial);
          $('#numerofinal').val(respuesta.data.numerofinal);
          $('#ultimoconsecutivo').val(respuesta.data.ultimoconsecutivo);
  
          if(respuesta.data.cuentabancaria_id){
              obtenerSelectCuentaB('cuentabancarias', '#select-cuentabancarias', respuesta.data.cuentabancaria_id);
          }
      },
      error: function() {
          var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
          sweetMessage('error', mensaje);
      }
    })  
  }
  
  var obtenerSelectCuentaB = function(url, select, id){
  
        $.ajax({
        method: "GET",
        url: url_back + url + '/' +id,
        headers: { 
            Authorization: 'Bearer ' + localStorage.access_token
        },
        dataType: "json",
        success: function(respuesta) {
                var html = '';
                html += '<option value="'+ respuesta.data.id+'">';
                html += respuesta.data.numerocuenta+'-'+respuesta.data.entidadfinanciera;
                html += '</option>';
              $(select).html(html);
        },
        error: function() {
            var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
            sweetMessage('error', mensaje);
        }
      })  
      }
  
  $( document ).ready(function() {
      $('.preloader').hide("slow");
        validarLogin();
        obtenerChequera(localStorage.ver);
        localStorage.ver = '';
  });