
$("#form").submit(function(e) {
    e.preventDefault();   
    
    const form = document.getElementById('form');
    const formData = new FormData(form);
    
    var codigo = $('#codigo').val();
    var descripcion = $('#descripcion').val();
    var tipometodospago_id = $('#select-tipometodospagos').val();
    var cuentabancaria_id = $('#select-cuentabancarias').val()? $('#select-cuentabancarias').val() : '';
    
    formData.append("cuentabancaria_id", cuentabancaria_id);
    formData.append("codigo", codigo);
    formData.append("descripcion", descripcion);
    formData.append("tipometodospago_id", tipometodospago_id);
    formData.append("creador_id", localStorage.id);
    formData.append("empresa_id", localStorage.empresa_id);
    
    $.ajax({
        method: "POST",
        url: url_back + "metodospagos",
        headers: { 
            Authorization: 'Bearer ' + localStorage.access_token
        },
        dataType: "json",
        data: formData,
        contentType: false,
        processData: false,
        success: function(respuesta) {
    
                $('#ModalLong3').modal('hide');
                $('ModalLong3').removeClass('show');
                $('.modal-backdrop').remove();
                var mensaje = 'Metodos de Pago creado de forma correcta.: '+ respuesta.data.descripcion;
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
                  var html = '';
                  html += '<option value="'+ respuesta.data.id+'">';
                  html += respuesta.data.puc_id+'-'+respuesta.data.descripcion;
                  html += '</option>';
                  obtenerSelectsTipometodospago(url, select, id, html);
          },
          error: function() {
              var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
              sweetMessage('error', mensaje);
          }
        })  
        }
        
        function obtenerSelectsTipometodospago(url, select, id = null,  base = null) {
        $.ajax({
          method: "GET",
          url: url_back + url,
          headers: { 
              Authorization: 'Bearer ' + localStorage.access_token
          },
          dataType: "json",
          success: function(respuesta) {
        
                 $(select).html(crearHtmlCuentaPuc(respuesta.data, base, id));
          },
          error: function() {
              var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
              sweetMessage('error', mensaje);
          }
        })     
        }
        
    
    var crearHtmlCuentaPuc = function(data) {
        
            var html = '<option value="" selected="true" disabled="disabled">Selecione...</option>';
            $.each(data, function (key, item) {
                puc_id = item.puc_id? item.puc_id +'-' : ''; 
                html += '<option value="'+ item.id+'">';
                html += puc_id + item.descripcion;
                html += '</option>';
            });
        return html;
    }
    
    
    var recargarTransferencia = function(){
      var tipometodospago_id = $(this).val();
      var url ='tipometodospagos/'+tipometodospago_id;
      if(tipometodospago_id){
          $.ajax({
              type:"GET",
              url: url_back + url,
              headers: { 
                  Authorization: 'Bearer ' + localStorage.access_token
              },
              dataType: "json",
              success:function(respuesta){
    
                if(respuesta.data.clasificacion == 2){
                    $('#divC').show(); 
                    ObtenerSelectsCuentaBancaria('#select-cuentabancarias');
                }else{
                    $('#divC').hide();
                    $('#select-cuentabancarias').val('');
                }
              }
          }); 
      }else if($(this).val() == ''){
        $('#divC').hide();
      }
    }
    
    function ObtenerSelectsCuentaBancaria(select) {
    
        $.ajax({
              type:"GET",
              url: url_back + 'cuentabancariapropias/'+ localStorage.empresa_id,
              headers: { 
                  Authorization: 'Bearer ' + localStorage.access_token
              },
              dataType: "json",
              success:function(respuesta){
    
                  $(select).html(crearHtmlCuentaBancarias(respuesta.data));
            },
          error: function() {
              var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
              sweetMessage('error', mensaje);
          }
        })  
    }
    
    var crearHtmlCuentaBancarias = function(data) {
    
        var htmlB = '<option value="" selected="true" disabled="disabled">Selecione...</option>';
        $.each(data, function (key, item) {
                htmlB += '<option value="'+ item.id+'">';
                htmlB += item.entidadfinanciera+ ' - ' + item.numerocuenta + ' - ' + item.tipocuenta.descripcion;
                htmlB += '</option>';
        });
      return htmlB;
    }
    
    
    $( document ).ready(function() {
        $('.preloader').hide("slow");
        validarLogin();
    
        obtenerSelectsTipometodospago('tipometodospagos', '#select-tipometodospagos');
    
        $("#select-tipometodospagos").on("change",recargarTransferencia); 
        $('#descripcion').validCampo('abcdefghijklmnopqrstuvwxyziou 0123456789-');
    });