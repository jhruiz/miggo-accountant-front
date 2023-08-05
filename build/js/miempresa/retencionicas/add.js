$("#form").submit(function(e) {
    e.preventDefault();   
    
    const form = document.getElementById('form');
    const formData = new FormData(form);
    var url = 'icas';
    
    var actividad = $('#actividad').val();
    var tarifa = $('#tarifa').val();
    
    formData.append("actividad", actividad);
    formData.append("tarifa", tarifa);
    formData.append("empresa_id", localStorage.empresa_id);
    formData.append("creador_id", localStorage.id);
    
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
    
            if(respuesta){
                $('#ModalLong3').modal('hide');
                $('#ModalLong3').removeClass('show')
                $('.modal-backdrop').remove();
    
                var mensaje = 'se creo de forma correcta .: '+ respuesta.data.actividad;
                sweetMessage('success', mensaje); 
                obtenerretencionicas();
    
            } else {
                var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
                sweetMessage('error', mensaje);
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
    
    
    $(document).ready(function() {
        $('.preloader').hide("slow");
          validarLogin();
          actualizarmoneda();
    });