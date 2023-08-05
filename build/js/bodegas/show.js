function obtenerBodega(id){
    var url = 'bodegas/'+ id;
    
    $.ajax({
        method: "GET",
        url: url_back + url,
        headers: { 
                      Authorization: 'Bearer ' + localStorage.access_token
                  },
        dataType: "json",
        success: function(respuesta) {
    
            $('#codigo').val(respuesta.data.codigo);
            $('#descripcion').val(respuesta.data.descripcion);
    
            if(respuesta.data.tipobodega_id){
                obtenerSelect('tipobodegas', '#select-tipobodegas', respuesta.data.tipobodega_id);
                evaluar(respuesta.data.tipobodega_id);
            }

            if(respuesta.data.cliente_id){
                obtenerClienteTercero(respuesta.data.cliente_id);
            }

            if(respuesta.data.proveedore_id){
                obtenerProveedoreTercero(respuesta.data.proveedore_id);
            }
        },
        error: function() {
            var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
            sweetMessage('error', mensaje);
        }
      })  
    }

    var evaluar = function(id = null){
        if($('#select-tipobodegas').val() != null){
         var id = $('#select-tipobodegas').val();
        }

        if(id == 2){
            $('#divP').show();
            $('#divC').hide();
            $('#cliente').val(''); 
            $('#cliente_id').val('');
        }else if(id == 3){
            $('#divP').hide();
            $('#divC').show();
            $('#proveedore').val(''); 
            $('#proveedore_id').val('');
        }else{ 
            $('#divP').hide();
            $('#divC').hide();
            $('#proveedore').val(''); 
            $('#proveedore_id').val('');
            $('#cliente').val(''); 
            $('#cliente_id').val('');
        }
    }


    
 var obtenerClienteTercero = function(id){
    url= 'clientes/' + id;
    $.ajax({
    method: "GET",
    url: url_back + url,
    headers: { 
        Authorization: 'Bearer ' + localStorage.access_token
    },
    dataType: "json",
    success: function(respuesta) {
            $('#cliente').val(respuesta.data.tercero.identificacion+'-'+respuesta.data.tercero.nombres);
            $('#cliente_id').val(id);
    },
    error: function() {
        var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
        sweetMessage('error', mensaje);
    }
  })  
}

var obtenerProveedoreTercero = function(id){
    url= 'proveedores/' + id;
    $.ajax({
    method: "GET",
    url: url_back + url,
    headers: { 
        Authorization: 'Bearer ' + localStorage.access_token
    },
    dataType: "json",
    success: function(respuesta) {
            $('#proveedore').val(respuesta.data.tercero.identificacion+'-'+respuesta.data.tercero.nombres);
            $('#proveedore_id').val(id);
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
          obtenerBodega(localStorage.ver);
          localStorage.ver = '';
    });
    