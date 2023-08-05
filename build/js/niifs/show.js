function obtenerNiif(id){

    var url = 'niifs/'+ id;
    
    $.ajax({
      method: "GET",
      url: url_back + url,
      headers: { 
                    Authorization: 'Bearer ' + localStorage.access_token
                },
      dataType: "json",
      success: function(respuesta) {
    
            if(respuesta.data.naturaleza != null){
              $('#divNaturaleza').show();
              $('#naturaleza').val(respuesta.data.naturaleza);
            }else{
              $("#divNaturaleza").hide();
            }
    
            $('#codigo').val(respuesta.data.codigo);
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
        obtenerNiif(localStorage.ver);
    
    });
    