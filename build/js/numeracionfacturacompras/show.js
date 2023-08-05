function obtenerNumeracionfacturacompra(id){

    var url = 'numeracionfacturacompras/'+ id;
    
    $.ajax({
        method: "GET",
        url: url_back + url,
        headers: { 
                      Authorization: 'Bearer ' + localStorage.access_token
                  },
        dataType: "json",
        success: function(respuesta) {
    
            $('#numeroresolucion').val(respuesta.data.numeroresolucion);
            $('#fecharesoluciones').val(respuesta.data.fecharesolucion);
            $('#prefijo').val(respuesta.data.prefijo);
            $('#consecutivodesde').val(respuesta.data.consecutivodesde);
            $('#consecutivohasta').val(respuesta.data.consecutivohasta);
            $('#vigenciameses').val(respuesta.data.vigenciameses);
            $('#alertaconsecutiva').val(respuesta.data.alertaconsecutiva);
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
          obtenerNumeracionfacturacompra(localStorage.ver);
          localStorage.ver = '';
    });
    