$("#form").submit(function(e) {
    e.preventDefault();   
    
    const form = document.getElementById('form');
    const formData = new FormData(form);
    
    var prefijo = $('#prefijo').val();
    var numeroinicial = $('#numeroinicial').val();
    var numerofinal = $('#numerofinal').val();
    var ultimoconsecutivo = $('#ultimoconsecutivo').val();
    var cuentabancaria_id = $('#select-cuentabancarias').val()? $('#select-cuentabancarias').val() : '';
    
    formData.append("prefijo", prefijo);
    formData.append("numeroinicial", numeroinicial);
    formData.append("numerofinal", numerofinal);
    formData.append("ultimoconsecutivo", ultimoconsecutivo);
    formData.append("cuentabancaria_id", cuentabancaria_id);
    formData.append("creador_id", localStorage.id);
    
    $.ajax({
        method: "POST",
        url: url_back + "chequeras",
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
                var mensaje = 'Chequera creado de forma correcta.: ';
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
    
    function obtenerSelectsCuentaB(url, select, id = null) {
    
        $.ajax({
          method: "GET",
          url: url_back +'empresas/'+localStorage.empresa_id+'/'+url,
          headers: { 
              Authorization: 'Bearer ' + localStorage.access_token
          },
          dataType: "json",
          success: function(respuesta) {
        
              $(select).html(crearHtmlCuentaB(respuesta.data, id));
          },
          error: function() {
              var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
              sweetMessage('error', mensaje);
          }
        })     
        }
        
        var crearHtmlCuentaB = function(data, base = null, id = null) {
            var html = '<option value="" selected="true" disabled="disabled">Selecione...</option>';
                  $.each(data, function (key, item) {
                      if(id != item.id){
                          html += '<option value="'+ item.id+'">';
                          html += item.numerocuenta+'-'+item.entidadfinanciera;
                          html += '</option>';
                      }
                  });
              return html;
        }
    
        var ultimoconsecutivoCalculo = function(){
            $('#ultimoconsecutivo').val($('#numeroinicial').val() - 1);
        }
    
    $( document ).ready(function() {
        $('.preloader').hide("slow");
        validarLogin();
        $('#numeroinicial').on('blur', ultimoconsecutivoCalculo);
    
        obtenerSelectsCuentaB('cuentabancarias', '#select-cuentabancarias');
    });