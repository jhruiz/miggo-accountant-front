function obtenerCuentabancaria(id){
    var url = 'cuentabancarias/'+ id;
    
    $.ajax({
        method: "GET",
        url: url_back + url,
        headers: { 
                      Authorization: 'Bearer ' + localStorage.access_token
                  },
        dataType: "json",
        success: function(respuesta) {
    
            $('#numerocuenta').val(respuesta.data.numerocuenta);
            $('#entidadfinanciera').val(respuesta.data.entidadfinanciera);
            $('#oficinanumero').val(respuesta.data.oficinanumero);
            $('#titularcuenta').val(respuesta.data.titularcuenta);
            $('#franquicia').val(respuesta.data.franquicia);
            $('#aperturas').val(respuesta.data.apertura);
            $('#vencimientos').val(respuesta.data.vencimiento);
            $('#cupo').val(respuesta.data.cupo);
    
            if(respuesta.data.tipocuenta_id){
                obtenerSelectCuenta('tipocuentas', '#select-tipocuentas', respuesta.data.tipocuenta_id);
    
                if(respuesta.data.tipocuenta_id == 5){
                    $('#divF').show();
                    $('#divA').show();
                    $('#divFv').show();
                    $('#divC').show();
                }
            }
        },
        error: function() {
            var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
            sweetMessage('error', mensaje);
        }
      })  
    }
    
    var obtenerSelectCuenta = function(url, select, id){
      url_tipo= url+ '/' +id;
      $.ajax({
      method: "GET",
      url: url_back + url_tipo,
      headers: { 
          Authorization: 'Bearer ' + localStorage.access_token
      },
      dataType: "json",
      success: function(respuesta) {
              var html = '';
              html += '<option value="'+ respuesta.data.id+'">';
              html += respuesta.data.puc_id+'-'+respuesta.data.descripcion;
              html += '</option>';
              $(select).html(html);
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
          obtenerCuentabancaria(localStorage.ver);
          localStorage.ver = '';
    });
    