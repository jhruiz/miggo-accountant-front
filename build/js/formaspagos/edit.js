
$("#form").submit(function(e) {
    e.preventDefault();   
    
    const form = document.getElementById('form');
    const formData = new FormData(form);
    
    var codigo = $('#codigo').val();
    var descripcion = $('#descripcion').val();
    var cantidadcuotas = $('#cantidadcuotas').val()? $('#cantidadcuotas').val() : '';
    var diasplazo = $('#diasplazo').val()? $('#diasplazo').val() : '';
    var tipoformaspago_id = $('#select-tipoformaspagos').val()? $('#select-tipoformaspagos').val() : '';
    var metodospago_id = $('#select-metodospagos').val()? $('#select-metodospagos').val() : '';
    
    formData.append("codigo", codigo);
    formData.append("descripcion", descripcion);
    formData.append("cantidadcuotas", cantidadcuotas); //TODO: la canidad
    formData.append("diasplazo", diasplazo);//credito y cuotas
    formData.append("tipoformaspago_id", tipoformaspago_id);
    formData.append("metodospago_id", metodospago_id);
    formData.append('_method', 'PUT');
    
    $.ajax({
        method: "POST",
        url: url_back + "formaspagos/"+localStorage.editar,
        headers: { 
            Authorization: 'Bearer ' + localStorage.access_token
        },
        dataType: "json",
        data: formData,
        contentType: false,//formData
        processData: false,//formData
        success: function(respuesta) {
    
                localStorage.editar = '';
                $('#ModalLong2').modal('hide');
                $('ModalLong2').removeClass('show');
                $('.modal-backdrop').remove();
                var mensaje = ' Forma Pago actualizado de forma correcta.: '+ respuesta.data.descripcion;
                sweetMessage('success', mensaje); 
                infoTable(); 
        },
        error: function(respuesta) {
    
            if(respuesta.responseJSON.error){
                $.each(respuesta.responseJSON.error.message, function (key, item) {
                    var mensaje = item[0];
                    sweetMessage('error', mensaje);
                });
    
            }else{
                var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
                sweetMessage('error', mensaje);
            }
        }
    });
    });
    
    
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
                recargarFormaspago(respuesta.data.tipoformaspago_id);
            }else{
                obtenerSelects('tipoformaspagos','#select-tipoformaspagos');
            }
    
            if(respuesta.data.metodospago_id){
                obtenerSelectMetodopago('metodospagos','#select-metodospagos', respuesta.data.metodospago_id);
            }else{
                obtenerSelectsMetodopago('empresas/'+localStorage.empresa_id+'/metodospagos','#select-metodospagos');
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
              obtenerSelectsMetodopago('empresas/'+localStorage.empresa_id+'/'+url, select, id, html);
      },
      error: function() {
          var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
          sweetMessage('error', mensaje);
      }
    })  
    }
    
    function obtenerSelectsMetodopago(url, select, id = null,  base = null) {
    
        $.ajax({
        method: "GET",
        url: url_back + url,
        headers: { 
            Authorization: 'Bearer ' + localStorage.access_token
        },
        dataType: "json",
        success: function(respuesta) {
    
            $(select).html(crearHtmlMetodopago(respuesta.data, base, id));
        },
        error: function() {
            var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
            sweetMessage('error', mensaje);
        }
        })     
    }
    
    var crearHtmlMetodopago = function(data, base = null, id = null) {
      var html = base? base: '<option value="" selected="true" disabled="disabled">Seleccione...</option>';
    
          $.each(data, function (key, item) {
              if(id != item.id){
                  html += '<option value="'+ item.id+'">';
                  html += item.codigo+'-'+item.descripcion+' => '+item.tipometodospago.descripcion;
                  html += '</option>';
              }
          });
          return html;
    }
    
    
    function recargarFormaspago (id = null){
        let tipoformaspago_id = $("#select-tipoformaspagos").val() ? $("#select-tipoformaspagos").val() : id;
    
        switch(parseInt(tipoformaspago_id)) {
            case 1:
                $('#divCon').show();
                $('#divDia').hide();
                $('#divCuo').hide();
    
                $('#cantidadcuotas').val('');
                $('#diasplazo').val('');
                obtenerSelectsMetodopago('empresas/'+localStorage.empresa_id+'/metodospagos','#select-metodospagos');
                break;
            case 2:
                $('#divDia').show();
                $('#divCon').hide();
                $('#divCuo').hide();
    
                $('#cantidadcuotas').val('');
                $('#diasplazo').val('');
                $('#select-metodospagos').val('');
                break;
            case 3:
                $('#divDia').show();
                $('#divCuo').show();
                $('#divCon').hide();
    
                $('#cantidadcuotas').val('');
                $('#diasplazo').val('');
                $('#select-metodospagos').val('');
                break;
            default:
                var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
                sweetMessage('error', mensaje);
            }
    }
    
    $( document ).ready(function() {
        $('.preloader').hide("slow");
          validarLogin();
          obtenerFormasPago(localStorage.editar);
    
        $("#select-tipoformaspagos").on("change",recargarFormaspago); 
        $('#descripcion').validCampo('abcdefghijklmnopqrstuvwxyziou 0123456789-');
    });
    