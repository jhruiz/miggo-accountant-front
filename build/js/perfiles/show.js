function obtenerPerfile(id){

    var url = 'perfiles/'+ id;
    
    $.ajax({
        method: "GET",
        url: url_back + url,
        headers: { 
                      Authorization: 'Bearer ' + localStorage.access_token
                  },
        dataType: "json",
        success: function(respuesta) {
            $('#select-nivel').val(respuesta.data.nivel);
            $('#descripcion').val(respuesta.data.descripcion);
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
        obtenerPerfile(localStorage.ver);
    
    });
    