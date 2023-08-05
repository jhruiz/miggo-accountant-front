function obtenerFormasPago(id){
  var url = 'formaspagos/'+ id;
  
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
          $('#cantidadcuotas').val(respuesta.data.cantidadcuotas);
          $('#diasplazo').val(respuesta.data.diasplazo);
  
          if(respuesta.data.tipoformaspago_id){
              obtenerSelect('tipoformaspagos','#select-tipoformaspagos', respuesta.data.tipoformaspago_id);
              switch(respuesta.data.tipoformaspago_id) {
              case 1:
                  $('#divCon').show();
                  $('#divDia').hide();
                  $('#divCuo').hide();
                  break;
              case 2:
                  $('#divDia').show();
                  $('#divCon').hide();
                  $('#divCuo').hide();
                  break;
              case 3:
                  $('#divDia').show();
                  $('#divCuo').show();
                  $('#divCon').hide();
                  break;
              default:
                  var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
                  sweetMessage('error', mensaje);
              }
          }
  
          if(respuesta.data.metodospago_id){
              obtenerSelectMetodopago('metodospagos','#select-metodospagos', respuesta.data.metodospago_id);
          }
      },
      error: function() {
          var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
          sweetMessage('error', mensaje);
      }
    })  
  }
  
  var obtenerSelectMetodopago = function(url, select, id){
    let url_tipo= url+ '/' +id;
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
            html += respuesta.data.codigo+'-'+respuesta.data.descripcion+' => '+respuesta.data.tipometodospago.descripcion;
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
        obtenerFormasPago(localStorage.ver);
        localStorage.ver = '';
  });