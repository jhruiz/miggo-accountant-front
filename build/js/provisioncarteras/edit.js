$("#form").submit(function(e) {
    e.preventDefault();   
    
    const form = document.getElementById('form');
    const formData = new FormData(form);
    
    var metodoprovision = $('#select-metodoprovision').val();
    
    formData.append("metodoprovision", metodoprovision);
    formData.append('_method', 'PUT');
    
    $.ajax({
        method: "POST",
        url: url_back + "provisioncarteras/"+localStorage.editar,
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
            var mensaje = 'Provision Cartera actualizado de forma correcta.: ';
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
    
    function obtenerProvisioncartera(id){
    var url = 'provisioncarteras/'+ id;
    
    $.ajax({
        method: "GET",
        url: url_back + url,
        headers: { 
                      Authorization: 'Bearer ' + localStorage.access_token
                  },
        dataType: "json",
        success: function(respuesta) {
    
            $('#select-metodoprovision').val(respuesta.data.metodoprovision);
    
        },
        error: function() {
            var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
            sweetMessage('error', mensaje);
        }
      })  
    }
    
    var obtenerNiif = function(id){
        url_n= 'niifs/' + id;
        $.ajax({
        method: "GET",
        url: url_back + url_n,
        headers: { 
            Authorization: 'Bearer ' + localStorage.access_token
        },
        dataType: "json",
        success: function(respuesta) {
                $('#niif').val(respuesta.data.id+' - '+respuesta.data.descripcion);
                $('#niif_id').val(respuesta.data.id);
        },
        error: function() {
            var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
            sweetMessage('error', mensaje);
        }
      })  
    }
    
    $( "#niif" ).autocomplete({
            source: function( request, response ) {
                var url_niif = 'niifprovisioncarteras?search='+$('#niif').val(); 
    
               $.ajax({
                 method: "GET",
                 url: url_back + url_niif,
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
              $('#niif').val(ui.item.label); // display the selected text
              $('#niif_id').val(ui.item.value); // save selected id to input
              return false;
            }
         });
    
    
    $( document ).ready(function() {
        $('.preloader').hide("slow");
          validarLogin();
          obtenerProvisioncartera(localStorage.editar);
    
        $('#descripcion').validCampo('abcdefghijklmnopqrstuvwxyziou 0123456789-');
    });