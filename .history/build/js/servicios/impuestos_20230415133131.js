$("#formImpuesto").submit(function(e) {
    e.preventDefault(); 
    
      const form = document.getElementById('formImpuesto');
      const formData = new FormData(form);
    
      var adicionavalorcosto =$('#adicionavalorcosto').is(':checked') ? 1 : 0;
      var aplicarconsumocompra =$('#aplicarconsumocompra').is(':checked') ? 1 : 0;
      var adicionaconsumocosto =$('#adicionaconsumocosto').is(':checked') ? 1 : 0;
      var basereteica =$('#basereteica').is(':checked') ? 1 : 0;
      
    
      var ivacompra = $('#ivacompra').val()? $('#ivacompra').val()/100 : '';
      var ivaventa = $('#ivaventa').val()? $('#ivaventa').val()/100 : '';
      var impuestoconsumo = $('#impuestoconsumo').val()? $('#impuestoconsumo').val()/100 : '';
      var rtfcompraimpuesto = $('#rtfcompraimpuesto').val()? $('#rtfcompraimpuesto').val()/100 : '';
      var rtfventaimpuesto = $('#rtfventaimpuesto').val()? $('#rtfventaimpuesto').val()/100 : '';
      var ica = $('#ica').val()? $('#ica').val()/100 : '';
    
      var valorempaque = $('#valorempaque').val();
      var comprapuc_id = $('#comprapuc_id').val();
      var ventapuc_id = $('#ventapuc_id').val();
      var consumopuc_id = $('#consumopuc_id').val();
      var rtfcomprapuc_id = $('#rtfcomprapuc_id').val();
      var rtfventapuc_id = $('#rtfventapuc_id').val();
    
      var tipoimpuestocompra_id = $('#select-tipoimpuestocompras').val()? $('#select-tipoimpuestocompras').val() : '';
      var tipoimpuestoventa_id = $('#select-tipoimpuestoventas').val()? $('#select-tipoimpuestoventas').val() : '';
    
      formData.append("adicionavalorcosto", adicionavalorcosto);
      formData.append("aplicarconsumocompra", aplicarconsumocompra);
      formData.append("adicionaconsumocosto", adicionaconsumocosto);
      formData.append("basereteica", basereteica);
      formData.append("ivacompra", ivacompra);
      formData.append("ivaventa", ivaventa);
      formData.append("impuestoconsumo", impuestoconsumo);
      formData.append("valorempaque", valorempaque);
      formData.append("rtfcompraimpuesto", rtfcompraimpuesto);
      formData.append("rtfventaimpuesto", rtfventaimpuesto);
      formData.append("ica", ica);
      formData.append("comprapuc_id", comprapuc_id);
      formData.append("ventapuc_id", ventapuc_id);
      formData.append("consumopuc_id", consumopuc_id);
      formData.append("rtfcomprapuc_id", rtfcomprapuc_id);
      formData.append("rtfventapuc_id", rtfventapuc_id);
      formData.append("tipoimpuestocompra_id", tipoimpuestocompra_id);
      formData.append("tipoimpuestoventa_id", tipoimpuestoventa_id);
      formData.append('_method', 'PUT');
    
             $.ajax({
              method: "POST",
              url: url_back + "impuestos/"+ localStorage.impuesto,
              headers: { 
                  Authorization: 'Bearer ' + localStorage.access_token
              },
              dataType: "json",
              data: formData,
              contentType: false,//formData
              processData: false,//formData
              success: function(respuesta) {
    
                      $('#ModalLong3').modal('hide');
                      $('ModalLong3').removeClass('show');
                      $('.modal-backdrop').remove();
                      var mensaje = 'Impuesto servicio actualizado de forma correcta.: ';
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
    
    
    function obtenerImpuesto(id){ //TODO Porcentaje de Impuesto se trae desde las cuentas PUC, si se cambia alla al actualizar aqui cambia el valor 
    var url = 'servicios/'+ id;
    
    $.ajax({
        method: "GET",
        url: url_back + url,
        headers: { 
                      Authorization: 'Bearer ' + localStorage.access_token
                  },
        dataType: "json",
        success: function(respuesta) {
    
          localStorage.setItem('impuesto', respuesta.data.impuesto.id);
    
          respuesta.data.impuesto.adicionavalorcosto == 1 ? $('#adicionavalorcosto').prop( "checked", true ) : $('#adicionavalorcosto').prop( "checked", false );
          respuesta.data.impuesto.aplicarconsumocompra == 1 ? $('#aplicarconsumocompra').prop( "checked", true ) : $('#aplicarconsumocompra').prop( "checked", false );
          respuesta.data.impuesto.adicionaconsumocosto == 1 ? $('#adicionaconsumocosto').prop( "checked", true ) : $('#adicionaconsumocosto').prop( "checked", false );
          respuesta.data.impuesto.basereteica == 1 ? $('#basereteica').prop( "checked", true ) : $('#basereteica').prop( "checked", false );
    
          respuesta.data.impuesto.ica ?  $('#ica').val(respuesta.data.impuesto.ica * 100) : $('#ica').val(''); 
          respuesta.data.impuesto.valorempaque ?  $('#valorempaque').val(respuesta.data.impuesto.valorempaque) : $('#valorempaque').val('');
    
    
            if(respuesta.data.impuesto.tipoimpuestocompra_id){
               obtenerSelect('tipoimpuestos', '#select-tipoimpuestocompras', respuesta.data.impuesto.tipoimpuestocompra_id);
            }else{
              obtenerSelects('tipoimpuestos', '#select-tipoimpuestocompras');
            }
          
            if(respuesta.data.impuesto.tipoimpuestoventa_id){
               obtenerSelect('tipoimpuestos', '#select-tipoimpuestoventas', respuesta.data.impuesto.tipoimpuestoventa_id);
            }else{
               obtenerSelects('tipoimpuestos', '#select-tipoimpuestoventas');
            }
    
            if(respuesta.data.impuesto.comprapuc_id){
               $('#comprapuc_id').val(respuesta.data.impuesto.comprapuc_id);
               obtenerPuc('#comprapuc', respuesta.data.impuesto.comprapuc_id ,'#ivacompra');
            }
    
            if(respuesta.data.impuesto.ventapuc_id){
               $('#ventapuc_id').val(respuesta.data.impuesto.ventapuc_id);
               obtenerPuc('#ventapuc', respuesta.data.impuesto.ventapuc_id ,'#ivaventa');
            }
    
            if(respuesta.data.impuesto.consumopuc_id){
               $('#consumopuc_id').val(respuesta.data.impuesto.consumopuc_id);
               obtenerPuc('#consumopuc', respuesta.data.impuesto.consumopuc_id ,'#impuestoconsumo');
            }
    
            if(respuesta.data.impuesto.rtfcomprapuc_id){
               $('#rtfcomprapuc_id').val(respuesta.data.impuesto.rtfcomprapuc_id);
               obtenerPuc('#rtfcomprapuc', respuesta.data.impuesto.rtfcomprapuc_id ,'#rtfcompraimpuesto');
            }
    
            if(respuesta.data.impuesto.rtfventapuc_id){
               $('#rtfventapuc_id').val(respuesta.data.impuesto.rtfventapuc_id);
               obtenerPuc('#rtfventapuc', respuesta.data.impuesto.rtfventapuc_id ,'#rtfventaimpuesto');
            }
        },
        error: function() {
            var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
            sweetMessage('error', mensaje);
        }
      })  
    }
    
    
    
      var obtenerPuc = function(input, id, impuesto = null){
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
                    // $(input+'_id').val(respuesta.data.id);
                    if(impuesto != null){
                      $(impuesto).val(respuesta.data.impuesto);
                    }
            },
            error: function() {
                var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
                sweetMessage('error', mensaje);
            }
          })  
        }
        
        
        $( "#comprapuc" ).autocomplete({
           source: function( request, response ) {
               var url_puc = 'levelallpucs/240820?level=3&search='+$('#comprapuc').val(); 
    
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
           appendTo: "#ModalLong3",
           select: function (event, ui) {
            //  $('#comprapuc').val(ui.item.label); // display the selected text
             $('#comprapuc_id').val(ui.item.value); // save selected id to input
             obtenerPuc('#comprapuc', ui.item.value ,'#ivacompra');
    
             return false;
           }
        });
    
    
        $( "#ventapuc" ).autocomplete({
           source: function( request, response ) {
               var url_puc = 'levelallpucs/240810?level=3&search='+$('#ventapuc').val(); 
    
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
           appendTo: "#ModalLong3",
           select: function (event, ui) {
            //  $('#ventapuc').val(ui.item.label); // display the selected text
             $('#ventapuc_id').val(ui.item.value); // save selected id to input
             obtenerPuc('#ventapuc', ui.item.value ,'#ivaventa');
    
             return false;
           }
        });
    
    
        $( "#consumopuc" ).autocomplete({
           source: function( request, response ) {
               var url_puc = 'levelallpucs/246205?level=3&search='+$('#consumopuc').val(); 
    
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
           appendTo: "#ModalLong3",
           select: function (event, ui) {
            //  $('#consumopuc').val(ui.item.label); // display the selected text
             $('#consumopuc_id').val(ui.item.value); // save selected id to input
             obtenerPuc('#consumopuc', ui.item.value ,'#impuestoconsumo');
             return false;
           }
        });
    
    
        $( "#rtfcomprapuc" ).autocomplete({
           source: function( request, response ) {
               var url_puc = 'levelallpucs/2365?level=2&search='+$('#rtfcomprapuc').val(); 
    
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
           appendTo: "#ModalLong3",
           select: function (event, ui) {
            //  $('#rtfcomprapuc').val(ui.item.label); // display the selected text
             $('#rtfcomprapuc_id').val(ui.item.value); // save selected id to input
             obtenerPuc('#rtfcomprapuc', ui.item.value ,'#rtfcompraimpuesto');
    
             return false;
           }
        });
    
    
        $( "#rtfventapuc" ).autocomplete({
           source: function( request, response ) {
               var url_puc = 'levelallpucs/1355?level=2&search='+$('#rtfventapuc').val(); 
    
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
           appendTo: "#ModalLong3",
           select: function (event, ui) {
            //  $('#rtfventapuc').val(ui.item.label); // display the selected text
             $('#rtfventapuc_id').val(ui.item.value); // save selected id to input
             obtenerPuc('#rtfventapuc', ui.item.value ,'#rtfventaimpuesto');
    
             return false;
           }
        });
    
    
    $( document ).ready(function() {
        $('.preloader').hide("slow");
          validarLogin();
          obtenerImpuesto(localStorage.editar);
    });