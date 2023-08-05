$("#form").submit(function(e) {
    e.preventDefault();   
    
    const form = document.getElementById('form');
    const formData = new FormData(form);
    
    var codigo = $('#codigo').val();
    var descripcion = $('#descripcion').val();
    var tipobodega_id = $('#select-tipobodegas').val();
    var cliente_id = $('#cliente_id').val();
    var proveedore_id = $('#proveedore_id').val();
    
    if(cliente_id){
        formData.append("cliente_id", cliente_id);
    }else if(proveedore_id){
        formData.append("proveedore_id", proveedore_id);
    }
    
    formData.append("codigo", codigo);
    formData.append("descripcion", descripcion);
    formData.append("tipobodega_id", tipobodega_id);
    formData.append("creador_id", localStorage.id);
    formData.append("empresa_id", localStorage.empresa_id);

    $.ajax({
        method: "POST",
        url: url_back + "bodegas",
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
            var mensaje = 'Bodega creado de forma correcta.: '+ respuesta.data.descripcion;
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


    function obtenerCliente (id){
        url= 'obtenerCliente/'+localStorage.empresa_id+'?tercero_id='+ id;
        $.ajax({
            method: "GET",
            url: url_back + url,
            headers: { 
                          Authorization: 'Bearer ' + localStorage.access_token
                      },
            dataType: "json",
            success: function(respuesta) {
        
                $('#cliente_id').val(respuesta.data.id); 
            },
            error: function() {
                var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
                sweetMessage('error', mensaje);
            }
          })  
     }


    $("#cliente").autocomplete({
        source: function( request, auto ) {
            var url = 'empresas/'+ localStorage.empresa_id+ '/clientes?search='+$('#cliente').val();
    
           $.ajax({
             method: "GET",
             url: url_back + url,
             headers: { 
                Authorization: 'Bearer ' + localStorage.access_token
            },
             dataType: "json",
             success: function(respuesta) {
                auto(respuesta);
             }
           });
        },
        autoFocus: true,
        minLength: 2,
        appendTo: "#ModalLong3",
        select: function (event, ui) {
          // Set selection
          $('#cliente').val(ui.item.label); // display the selected text
        //   $('#cliente_id').val(ui.item.value); // save selected id to input
          obtenerCliente(ui.item.value);
          return false;
        }
     });


     function obtenerProveedore (id){
        url= 'obtenerProveedore/'+localStorage.empresa_id+'?tercero_id='+ id;
        $.ajax({
            method: "GET",
            url: url_back + url,
            headers: { 
                          Authorization: 'Bearer ' + localStorage.access_token
                      },
            dataType: "json",
            success: function(respuesta) {
                $('#proveedore_id').val(respuesta.data.id); 
            },
            error: function() {
                var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
                sweetMessage('error', mensaje);
            }
          })  
     }
    
     $("#proveedore").autocomplete({
        source: function( request, auto ) {
            var url = 'empresas/'+ localStorage.empresa_id+ '/proveedores?search='+$('#proveedore').val();
    
           $.ajax({
             method: "GET",
             url: url_back + url,
             headers: { 
                Authorization: 'Bearer ' + localStorage.access_token
            },
             dataType: "json",
             success: function(respuesta) {
                auto(respuesta);
             }
           });
        },
        autoFocus: true,
        minLength: 2,
        appendTo: "#ModalLong3",
        select: function (event, ui) {
          // Set selection
          $('#proveedore').val(ui.item.label); // display the selected text
        //   $('#proveedore_id').val(ui.item.value); // save selected id to input
        obtenerProveedore(ui.item.value);
          return false;
        }
     });
    
        var evaluar = function(id = null){
            if($('#select-tipobodegas').val() != null){
             var id = $('#select-tipobodegas').val();
            }
    
            if(id == 2){
                $('#divP').show();
                $('#divC').hide();
                $('#cliente').val(''); 
                $('#cliente_id').val('');
            }else if(id == 3){
                $('#divP').hide();
                $('#divC').show();
                $('#proveedore').val(''); 
                $('#proveedore_id').val('');
            }else{ 
                $('#divP').hide();
                $('#divC').hide();
                $('#proveedore').val(''); 
                $('#proveedore_id').val('');
                $('#cliente').val(''); 
                $('#cliente_id').val('');
            }
        }
     


    
    $( document ).ready(function() {
        $('.preloader').hide("slow");
        validarLogin();
        obtenerSelects('tipobodegas', '#select-tipobodegas');

        $("#select-tipobodegas").on("change",evaluar); 

        $('#descripcion').validCampo('abcdefghijklmnopqrstuvwxyziou 0123456789-');
    });
    
    