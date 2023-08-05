function obtenerRetencionica(id){
    var url = 'icas/'+ id;
    
    $.ajax({
        method: "GET",
        url: url_back + url,
        headers: { 
                      Authorization: 'Bearer ' + localStorage.access_token
                  },
        dataType: "json",
        success: function(respuesta) {
            $('#tarifa').val(respuesta.data.tarifa);
            $('#actividad').val(respuesta.data.actividad);
    
        },
        error: function() {
            var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
            sweetMessage('error', mensaje);
        }
      })  
    }
    
    $(document).ready(function() {
      $('.preloader').hide("slow");
        validarLogin();
        actualizarmoneda();
        obtenerRetencionica(localStorage.verica);
    
    });