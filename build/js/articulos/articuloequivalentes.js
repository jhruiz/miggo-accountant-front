
$("#formEquivalente").submit(function(e) {
    e.preventDefault();   
    
    if($('#artículoequivalente0_id').val() != ''){
      enviarArticuloE($('#artículoequivalente0_id').val());
    }
    
    if($('#artículoequivalente1_id').val() != ''){
      enviarArticuloE($('#artículoequivalente1_id').val());
    }
    
    if($('#artículoequivalente2_id').val() != ''){
      enviarArticuloE($('#artículoequivalente2_id').val());
    }
    
    if($('#artículoequivalente3_id').val() != ''){
      enviarArticuloE($('#artículoequivalente3_id').val());
    }
    
    if($('#artículoequivalente4_id').val() != ''){
      enviarArticuloE($('#artículoequivalente4_id').val());
    }
    
    
    $('#ModalLong4').modal('hide');
    $('ModalLong4').removeClass('show');
    $('.modal-backdrop').remove();
    
    });
    
    
    function enviarArticuloE(id){
    
      const form = document.getElementById('formEquivalente');
      const formData = new FormData(form);
    
      formData.append('_method', 'PUT');
    
      $.ajax({
        method: "POST",
        url: url_back + "articulos/"+localStorage.editar+'/articuloequivalentes/'+ id,
        headers: { 
            Authorization: 'Bearer ' + localStorage.access_token
        },
        dataType: "json",
        data: formData,
        contentType: false,//formData
        processData: false,//formData
        success: function(respuesta) {
    
    
                var mensaje = ' Articulo Equivalente actualizado de forma correcta.: ';
                sweetMessage('success', mensaje); 
                
                // $('#main_content').load(url_front + 'articulos/edit.html');
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
    }
    
    
    function obtenerArticuloequivalentes(id){
    
    $.ajax({
        method: "GET",
        url: url_back + "articulos/"+id+'/articuloequivalentes',
        headers: { 
                      Authorization: 'Bearer ' + localStorage.access_token
                  },
        dataType: "json",
        success: function(respuesta) {
          
    
            console.log(respuesta.data);
    
          if(respuesta.data.length == 5){ 
             llenarArticuloequivalentes(respuesta.data);
          }else if(respuesta.data.length == 4){
              reiniciar(4);
              llenarArticuloequivalentes(respuesta.data);
          }else if(respuesta.data.length == 3){
              reiniciar(3);
              reiniciar(4);
              llenarArticuloequivalentes(respuesta.data);
          }else if(respuesta.data.length == 2){
              reiniciar(2);
              reiniciar(3);
              reiniciar(4);
              llenarArticuloequivalentes(respuesta.data);
          }else if(respuesta.data.length == 1){
              reiniciar(1);
              reiniciar(2);
              reiniciar(3);
              reiniciar(4);
              llenarArticuloequivalentes(respuesta.data);
          }else{
              reiniciar(0);
              reiniciar(1);
              reiniciar(2);
              reiniciar(3);
              reiniciar(4);
          }
    
        },
        error: function() {
            var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
            sweetMessage('error', mensaje);
        }
      })  
    }
    
    
    function reiniciar(id){
    
        $('#artículoequivalente'+id+'_id').val('');
        $('#artículoequivalente'+id).val('');
        $('#div'+id).hide();
        $('#artículoequivalente'+id).prop('readonly',false);
    }
    
    
        //******************************************************************************************************************************************************************************
        
        var llenarArticuloequivalentes = function(arre){
          
          arre.forEach(function callback(element, i) {
    
            $('#artículoequivalente'+ i +'_id').val(element.id);
            $('#artículoequivalente'+ i).val(element.codigo+'-'+element.nombre);
            $('#div'+i).show();
            $('#artículoequivalente'+ i).prop('readonly',true);
    
          });
    
    
        }
        
        //******************************************************************************************************************************************************************************
        
        $( "#artículoequivalente0" ).autocomplete({
           source: function( request, response ) {
    
               var url = 'equivalentes/'+localStorage.editar+'?search='+$('#artículoequivalente0').val(); 
    
              $.ajax({
                method: "GET",
                url: url_back + url,
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
           appendTo: "#ModalLong4",
           select: function (event, ui) {
             // Set selection
             $('#artículoequivalente0').val(ui.item.label); // display the selected text
             $('#artículoequivalente0_id').val(ui.item.value); // save selected id to input
             return false;
           }
        });
    
    
        $( "#artículoequivalente1" ).autocomplete({
           source: function( request, response ) {
    
               var url = 'equivalentes/'+localStorage.editar+'?search='+$('#artículoequivalente1').val(); 
    
              $.ajax({
                method: "GET",
                url: url_back + url,
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
           appendTo: "#ModalLong4",
           select: function (event, ui) {
             // Set selection
             $('#artículoequivalente1').val(ui.item.label); // display the selected text
             $('#artículoequivalente1_id').val(ui.item.value); // save selected id to input
             return false;
           }
        });
    
    
        $( "#artículoequivalente2" ).autocomplete({
           source: function( request, response ) {
    
               var url = 'equivalentes/'+localStorage.editar+'?search='+$('#artículoequivalente2').val(); 
    
              $.ajax({
                method: "GET",
                url: url_back + url,
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
           appendTo: "#ModalLong4",
           select: function (event, ui) {
             // Set selection
             $('#artículoequivalente2').val(ui.item.label); // display the selected text
             $('#artículoequivalente2_id').val(ui.item.value); // save selected id to input
             return false;
           }
        });
    
    
        $( "#artículoequivalente3" ).autocomplete({
           source: function( request, response ) {
    
               var url = 'equivalentes/'+localStorage.editar+'?search='+$('#artículoequivalente3').val(); 
    
              $.ajax({
                method: "GET",
                url: url_back + url,
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
           appendTo: "#ModalLong4",
           select: function (event, ui) {
             // Set selection
             $('#artículoequivalente3').val(ui.item.label); // display the selected text
             $('#artículoequivalente3_id').val(ui.item.value); // save selected id to input
             return false;
           }
        });
     
     
        $( "#artículoequivalente4" ).autocomplete({
           source: function( request, response ) {
    
               var url = 'equivalentes/'+localStorage.editar+'?search='+$('#artículoequivalente4').val(); 
    
              $.ajax({
                method: "GET",
                url: url_back + url,
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
           appendTo: "#ModalLong4",
           select: function (event, ui) {
             // Set selection
             $('#artículoequivalente4').val(ui.item.label); // display the selected text
             $('#artículoequivalente4_id').val(ui.item.value); // save selected id to input
             return false;
           }
        });
    
    
        var eliminarEquivalente = function(element){
          artículoequivalente_id = $(element+'_id').val();
    
            $.ajax({
            method: "DELETE",
            url: url_back + 'articulos/'+ localStorage.editar + '/articuloequivalentes/'+ artículoequivalente_id,
            headers: { 
                Authorization: 'Bearer ' + localStorage.access_token
            },
            dataType: "json",
            success: function(respuesta) {
    
                var mensaje = 'El Articulo Equivalente se elimino correctamente.';
                sweetMessage('success', mensaje);
                // $(element).val('');
    
                obtenerArticuloequivalentes(localStorage.editar);
    
    
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
          obtenerArticuloequivalentes(localStorage.editar);
    
    });