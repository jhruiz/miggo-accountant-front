
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
    formData.append('_method', 'PUT');
    
    $.ajax({
        method: "POST",
        url: url_back + "chequeras/"+localStorage.editar,
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
                var mensaje = ' Chequera actualizado de forma correcta.: ';
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
    
    
    function obtenerChequera(id){
    var url = 'chequeras/'+ id;
    
    $.ajax({
        method: "GET",
        url: url_back + url,
        headers: { 
                      Authorization: 'Bearer ' + localStorage.access_token
                  },
        dataType: "json",
        success: function(respuesta) {
    
            $('#prefijo').val(respuesta.data.prefijo);
            $('#numeroinicial').val(respuesta.data.numeroinicial);
            $('#numerofinal').val(respuesta.data.numerofinal);
            $('#ultimoconsecutivo').val(respuesta.data.ultimoconsecutivo);
    
            if(respuesta.data.cuentabancaria_id){
                obtenerSelectCuentaB('cuentabancarias', '#select-cuentabancarias', respuesta.data.cuentabancaria_id);
            }else{
                obtenerSelectsCuentaB('cuentabancarias', '#select-cuentabancarias');
            }
        },
        error: function() {
            var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
            sweetMessage('error', mensaje);
        }
      })  
    }
    
    var obtenerSelectCuentaB = function(url, select, id){
    
          $.ajax({
          method: "GET",
          url: url_back + url + '/' +id,
          headers: { 
              Authorization: 'Bearer ' + localStorage.access_token
          },
          dataType: "json",
          success: function(respuesta) {
                  var html = '';
                  html += '<option value="'+ respuesta.data.id+'">';
                  html += respuesta.data.numerocuenta+'-'+respuesta.data.entidadfinanciera;
                  html += '</option>';
                  obtenerSelectsCuentaB(url, select, id, html);
          },
          error: function() {
              var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
              sweetMessage('error', mensaje);
          }
        })  
        }
        
        function obtenerSelectsCuentaB(url, select, id = null,  base = null) {
    
        $.ajax({
          method: "GET",
          url: url_back +'empresas/'+localStorage.empresa_id+'/'+url,
          headers: { 
              Authorization: 'Bearer ' + localStorage.access_token
          },
          dataType: "json",
          success: function(respuesta) {
        
              $(select).html(crearHtmlCuentaB(respuesta.data, base, id));
          },
          error: function() {
              var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
              sweetMessage('error', mensaje);
          }
        })     
        }
        
        var crearHtmlCuentaB = function(data, base = null, id = null) {
          if (base) {
                  var html = base;
                  $.each(data, function (key, item) {
                      if(id != item.id){
                          html += '<option value="'+ item.id+'">';
                          html += item.numerocuenta+'-'+item.entidadfinanciera;
                          html += '</option>';
                      }
                  });
              return html;
          } 
        }
    
    
        var ultimoconsecutivoCalculo = function(){
            $('#ultimoconsecutivo').val($('#numeroinicial').val() - 1);
        }
    
    
    $( document ).ready(function() {
        $('.preloader').hide("slow");
          validarLogin();
          obtenerChequera(localStorage.editar);
    
          $('#numeroinicial').on('blur', ultimoconsecutivoCalculo);
    });
    