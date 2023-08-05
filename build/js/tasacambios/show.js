function obtenerTasacambio(id){
  var url = 'tasacambios/'+ id;
  
  $.ajax({
      method: "GET",
      url: url_back + url,
      headers: { 
                    Authorization: 'Bearer ' + localStorage.access_token
                },
      dataType: "json",
      success: function(respuesta) {
          $('#moneda').val(respuesta.data.moneda);
          $('#tasa').val(respuesta.data.tasa);
          $('#fechas').val(respuesta.data.fecha);
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
        obtenerTasacambio(localStorage.ver);
        localStorage.ver = '';
  });