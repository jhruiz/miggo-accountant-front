function obtenerMetodospago(id){
  var url = 'metodospagos/'+ id;
  
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
  
          if(respuesta.data.tipometodospago_id){
              obtenerSelectTipometodospago('tipometodospagos','#select-tipometodospagos', respuesta.data.tipometodospago_id);
              if(respuesta.data.cuentabancaria_id){
                  $('#divC').show(); 
                  ObtenerSelectCuentaBancaria('#select-cuentabancarias',respuesta.data.cuentabancaria_id);
              }
          }else{
              obtenerSelectsTipometodospago('tipometodospagos','#select-tipometodospagos');
          }
      },
      error: function() {
          var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
          sweetMessage('error', mensaje);
      }
    })  
  }
  
  var obtenerSelectTipometodospago = function(url, select, id){
        url_tipo= url+ '/' +id;
        $.ajax({
        method: "GET",
        url: url_back + url_tipo,
        headers: { 
            Authorization: 'Bearer ' + localStorage.access_token
        },
        dataType: "json",
        success: function(respuesta) {
                let html = '';
                let puc_id = respuesta.data.puc_id ? respuesta.data.puc_id +'-' : ''; 
                html += '<option value="'+ respuesta.data.id+'">';
                html += puc_id+respuesta.data.descripcion;
                html += '</option>';
               $(select).html(html);
        },
        error: function() {
            var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
            sweetMessage('error', mensaje);
        }
      })  
      }
      
  
  function ObtenerSelectCuentaBancaria(select, id) {
  
  $.ajax({
        type:"GET",
        url: url_back + 'cuentabancarias/'+ id,
        headers: { 
            Authorization: 'Bearer ' + localStorage.access_token
        },
        dataType: "json",
        success:function(respuesta){
  
              let htmlB = ''; 
              htmlB += '<option value="'+ respuesta.data.id+'">';
              htmlB += respuesta.data.entidadfinanciera+ ' - ' + respuesta.data.numerocuenta + ' - ' + respuesta.data.tipocuenta.descripcion;
              htmlB += '</option>';
              $(select).html(htmlB);
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
        obtenerMetodospago(localStorage.ver);
        localStorage.ver = '';
  });
  