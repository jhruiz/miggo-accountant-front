function obtenerListadescuento(id){

    var url = 'listadescuentos/'+ id;
    
    $.ajax({
        method: "GET",
        url: url_back + url,
        headers: { 
                      Authorization: 'Bearer ' + localStorage.access_token
                  },
        dataType: "json",
        success: function(respuesta) {
    
            $('#porcentaje').val(respuesta.data.porcentaje * 100);
            $('#descripcion').val(respuesta.data.descripcion);
            $('#inicios').val(respuesta.data.inicio);
            $('#fins').val(respuesta.data.fin);
    
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
          obtenerListadescuento(localStorage.ver);
          localStorage.ver = '';
    });