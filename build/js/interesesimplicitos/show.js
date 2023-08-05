function obtenerInteresesimplicito(id){
  var url = 'interesesimplicitos/'+ id;
  
  $.ajax({
      method: "GET",
      url: url_back + url,
      headers: { 
                    Authorization: 'Bearer ' + localStorage.access_token
                },
      dataType: "json",
      success: function(respuesta) {
  
          $('#fechas').val(respuesta.data.fecha);
          $('#dias').val(respuesta.data.dias);
          $('#porcentajes').val(respuesta.data.porcentajes * 100);
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
        obtenerInteresesimplicito(localStorage.ver);
        localStorage.ver = '';
  });
  