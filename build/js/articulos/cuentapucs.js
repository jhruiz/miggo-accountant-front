$("#formCuenta").submit(function(e) {
    e.preventDefault();   
    
    const form = document.getElementById('formCuenta');
    const formData = new FormData(form);
    
    var cuentainventario_id = $('#cuentainventario_id').val();
    var cuentaingreso_id = $('#cuentaingreso_id').val();
    var cuentacosto_id = $('#cuentacosto_id').val();
    
    formData.append("cuentainventario_id", cuentainventario_id);
    formData.append("cuentaingreso_id", cuentaingreso_id);
    formData.append("cuentacosto_id", cuentacosto_id);
    formData.append('_method', 'PUT');
    
    $.ajax({
        method: "POST",
        url: url_back + "articulocuentas/"+localStorage.cuenta,
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
    
    
    function obtenerArticulocuenta(id){
    var url = 'articulos/'+ id;
    
    $.ajax({
        method: "GET",
        url: url_back + url,
        headers: { 
                      Authorization: 'Bearer ' + localStorage.access_token
                  },
        dataType: "json",
        success: function(respuesta) {
          
          localStorage.setItem('cuenta', respuesta.data.articulocuenta.id);
    
          if(respuesta.data.articulocuenta.cuentainventario_id){
            $('#cuentainventario_id').val(respuesta.data.articulocuenta.cuentainventario_id);
            obtenerPuc('#cuentainventario', respuesta.data.articulocuenta.cuentainventario_id);
          }
    
          if(respuesta.data.articulocuenta.cuentaingreso_id){
            $('#cuentaingreso_id').val(respuesta.data.articulocuenta.cuentaingreso_id);
            obtenerPuc('#cuentaingreso', respuesta.data.articulocuenta.cuentaingreso_id);
          }
    
          if(respuesta.data.articulocuenta.cuentacosto_id){
            $('#cuentacosto_id').val(respuesta.data.articulocuenta.cuentacosto_id);
            obtenerPuc('#cuentacosto', respuesta.data.articulocuenta.cuentacosto_id);
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
                    // $('#puc_id').val(respuesta.data.id);
            },
            error: function() {
                var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
                sweetMessage('error', mensaje);
            }
          })  
        }
        
        //******************************************************************************************************************************************************************************
        
        $( "#cuentainventario" ).autocomplete({
           source: function( request, response ) {
               var url_puc = 'levelallpucs/14?level=1&search='+$('#cuentainventario').val(); 
    
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
             $('#cuentainventario').val(ui.item.label); // display the selected text
             $('#cuentainventario_id').val(ui.item.value); // save selected id to input
             return false;
           }
        });
    
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
          obtenerArticulocuenta(localStorage.editar);
    
    });