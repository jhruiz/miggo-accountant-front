
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
    formData.append('_method', 'PUT');
    
    $.ajax({
        method: "POST",
        url: url_back + "metodospagos/"+localStorage.editar,
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
                var mensaje = ' Metodos de Pago actualizado de forma correcta.: '+ respuesta.data.descripcion;
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
        
        var crearHtmlCuentaPuc = function(data, base = null, id = null) {
                  var html = base? base : '<option value="" selected="true" disabled="disabled">Selecione...</option>';
                  $.each(data, function (key, item) {
                      if(id != item.id){
                          puc_id = item.puc_id? item.puc_id +'-' : ''; 
                          html += '<option value="'+ item.id+'">';
                          html += puc_id + item.descripcion;
                          html += '</option>';
                      }
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
                    $('#divC').show(); //TODO: llamar las transferencias 
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
                ObtenerSelectsCuentaBancaria(select, id, htmlB);
        },
      error: function() {
          var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
          sweetMessage('error', mensaje);
      }
    })  
    }
    
    function ObtenerSelectsCuentaBancaria(select, id = null, base = null) {
    
        $.ajax({
              type:"GET",
              url: url_back + 'cuentabancariapropias/'+ localStorage.empresa_id,
              headers: { 
                  Authorization: 'Bearer ' + localStorage.access_token
              },
              dataType: "json",
              success:function(respuesta){
    
                  $(select).html(crearHtmlCuentaBancarias(respuesta.data, id, base));
            },
          error: function() {
              var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
              sweetMessage('error', mensaje);
          }
        })  
    }
    
        var crearHtmlCuentaBancarias = function(data, id, base) {
        
            var htmlB = base? base: '<option value="" selected="true" disabled="disabled">Selecione...</option>';
            $.each(data, function (key, item) {
                if(id != item.id){
                    htmlB += '<option value="'+ item.id+'">';
                    htmlB += item.entidadfinanciera+ ' - ' + item.numerocuenta + ' - ' + item.tipocuenta.descripcion;
                    htmlB += '</option>';
                }
            });
        return htmlB;
    }
    
    
    $( document ).ready(function() {
        $('.preloader').hide("slow");
          validarLogin();
          obtenerMetodospago(localStorage.editar);
    
        $("#select-tipometodospagos").on("change",recargarTransferencia); 
        $('#descripcion').validCampo('abcdefghijklmnopqrstuvwxyziou 0123456789-');
    });