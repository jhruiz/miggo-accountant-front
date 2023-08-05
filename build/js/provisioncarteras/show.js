function obtenerProvisioncartera(id){
  var url = 'provisioncarteras/'+ id;
  
  $.ajax({
      method: "GET",
      url: url_back + url,
      headers: { 
                    Authorization: 'Bearer ' + localStorage.access_token
                },
      dataType: "json",
      success: function(respuesta) {
  
          $('#select-metodoprovision').val(respuesta.data.metodoprovision);
  
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
        obtenerProvisioncartera(localStorage.ver);
        localStorage.ver = '';
  });
  