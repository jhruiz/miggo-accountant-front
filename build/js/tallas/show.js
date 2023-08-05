
function obtenerTalla(id){

  var url = 'tallas/'+ id;
  
  $.ajax({
      method: "GET",
      url: url_back + url,
      headers: { 
                    Authorization: 'Bearer ' + localStorage.access_token
                },
      dataType: "json",
      success: function(respuesta) {
  
          $('#descripcion').val(respuesta.data.descripcion);
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
        obtenerTalla(localStorage.ver);
        localStorage.ver = '';
  });
  