
$("#form").submit(function(e) {
    e.preventDefault();   
    
    const form = document.getElementById('form');
    const formData = new FormData(form);
    
    var descripcion = $('#descripcion').val();
    
    formData.append("descripcion", descripcion);
    formData.append("creador_id", localStorage.id);
    
    
    $.ajax({
        method: "POST",
        url: url_back + "marcas",
        headers: { 
            Authorization: 'Bearer ' + localStorage.access_token
        },
        dataType: "json",
        data: formData,
        contentType: false,
        processData: false,
        success: function(respuesta) {
    
            if(respuesta){
                $('.modal-backdrop').remove();
    
                var mensaje = 'Marca creado de forma correcta.: '+ respuesta.data.descripcion;
                sweetMessage('success', mensaje); 
                $('#main_content').load(url_front + 'marcas/index.html');
            } else {
                    sweetMessage('warning', respuesta);                
            }
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
    
    
    
    
    
    $( document ).ready(function() {
        $('.preloader').hide("slow");
        validarLogin();
    
        $('#descripcion').validCampo('abcdefghijklmnopqrstuvwxyziou 0123456789-');
    });
    
    