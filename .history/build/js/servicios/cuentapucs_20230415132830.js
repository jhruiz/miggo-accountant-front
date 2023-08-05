$("#formCuenta").submit(function(e) {
    e.preventDefault();   
    
    const form = document.getElementById('formCuenta');
    const formData = new FormData(form);
    
    var cuentaingreso_id = $('#cuentaingreso_id').val();
    var cuentacosto_id = $('#cuentacosto_id').val();
    
    formData.append("cuentaingreso_id", cuentaingreso_id);
    formData.append("cuentacosto_id", cuentacosto_id);
    formData.append('_method', 'PUT');
    
    $.ajax({
        method: "POST",
        url: url_back + "serviciocuentas/"+localStorage.cuenta,
        headers: { 
            Authorization: 'Bearer ' + localStorage.access_token
        },
        dataType: "json",
        data: formData,
        contentType: false,//formData
        processData: false,//formData
        success: function(respuesta) {
    
                $('#ModalLong2').modal('hide');
                $('ModalLong2').removeClass('show');
                $('.modal-backdrop').remove();
                var mensaje = ' Cuentas Puc Asociadas actualizado de forma correcta.: ';
                sweetMessage('success', mensaje); 
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
    
    
    function obtenerServiciocuenta(id){
    var url = 'servicios/'+ id;
    
    $.ajax({
        method: "GET",
        url: url_back + url,
        headers: { 
                      Authorization: 'Bearer ' + localStorage.access_token
                  },
        dataType: "json",
        success: function(respuesta) {
          
          localStorage.setItem('cuenta', respuesta.data.serviciocuenta.id);
    
          if(respuesta.data.serviciocuenta.cuentaingreso_id){
            $('#cuentaingreso_id').val(respuesta.data.serviciocuenta.cuentaingreso_id);
            obtenerPuc('#cuentaingreso', respuesta.data.serviciocuenta.cuentaingreso_id);
          }
    
          if(respuesta.data.serviciocuenta.cuentacosto_id){
            $('#cuentacosto_id').val(respuesta.data.serviciocuenta.cuentacosto_id);
            obtenerPuc('#cuentacosto', respuesta.data.serviciocuenta.cuentacosto_id);
          }
    
        },
        error: function() {
            var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
            sweetMessage('error', mensaje);
        }
      })  
    }
    
    
        //******************************************************************************************************************************************************************************
        
        var obtenerPuc = function(input ,id){
            url_p= 'pucs/' + id;
            $.ajax({
            method: "GET",
            url: url_back + url_p,
            headers: { 
                Authorization: 'Bearer ' + localStorage.access_token
            },
            dataType: "json",
            success: function(respuesta) {
                // console.log()
                    $(input).val(respuesta.data.id+'-'+respuesta.data.descripcion);
                    $('#puc_id').val(respuesta.data.id);
            },
            error: function() {
                var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
                sweetMessage('error', mensaje);
            }
          })  
        }
        
        //******************************************************************************************************************************************************************************
    
        $( "#cuentaingreso" ).autocomplete({
           source: function( request, response ) {
               var url_puc = 'levelallpucs/41?level=1&search='+$('#cuentaingreso').val(); 
    
              $.ajax({
                method: "GET",
                url: url_back + url_puc,
                headers: { 
                   Authorization: 'Bearer ' + localStorage.access_token
               },
                dataType: "json",
                success: function(respuesta) {
                   response(respuesta);
                }
              });
           },
           autoFocus: true,
           minLength: 2,
           appendTo: "#ModalLong2",
           select: function (event, ui) {
             // Set selection
             $('#cuentaingreso').val(ui.item.label); // display the selected text
             $('#cuentaingreso_id').val(ui.item.value); // save selected id to input
             return false;
           }
        });
    
        $( "#cuentacosto" ).autocomplete({
                source: function( request, response ) {
                    var url_puc = 'levelallpucs/61?level=1&search='+$('#cuentacosto').val(); 
        
                   $.ajax({
                     method: "GET",
                     url: url_back + url_puc,
                     headers: { 
                        Authorization: 'Bearer ' + localStorage.access_token
                    },
                     dataType: "json",
                     success: function(respuesta) {
                        response(respuesta);
                     }
                   });
                },
                autoFocus: true,
                minLength: 2,
                appendTo: "#ModalLong2",
                select: function (event, ui) {
                  // Set selection
                  $('#cuentacosto').val(ui.item.label); // display the selected text
                  $('#cuentacosto_id').val(ui.item.value); // save selected id to input
                  return false;
                }
             });
    
    
    
    $( document ).ready(function() {
        $('.preloader').hide("slow");
          validarLogin();
          obtenerServiciocuenta(localStorage.editar);
    
    });