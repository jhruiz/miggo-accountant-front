
$("#form").submit(function(e) {
    e.preventDefault();   
    
    const form = document.getElementById('form');
    const formData = new FormData(form);
    var url = 'perfiles';
    
    var descripcion = $('#descripcion').val();
    var nivel = $('#select-nivel').val()? $('#select-nivel').val() : ''; //
    
    formData.append("empresa_id", localStorage.empresa_id);
    formData.append("creador_id", localStorage.id);
    formData.append("descripcion", descripcion);
    formData.append("nivel", nivel);
    
    $.ajax({
        method: "POST",
        url: url_back + url,
        headers: { 
            Authorization: 'Bearer ' + localStorage.access_token
        },
        dataType: "json",
        data: formData,
        contentType: false,//formData
        processData: false,//formData
        success: function(respuesta) {
    
                $('#ModalLong3').modal('hide');
                $('ModalLong3').removeClass('show')
                $('.modal-backdrop').remove();
                var mensaje = 'se creo de forma correcta '+ respuesta.data.descripcion;
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
    
    $(document).ready(function() {
        $('.preloader').hide("slow");
          validarLogin();
    
        $('#descripcion').validCampo('abcdefghijklmnopqrstuvwxyziou# 0123456789._-');
    });
    
    