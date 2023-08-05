$("#form").submit(function(e) {
    e.preventDefault();   
    
    const form = document.getElementById('form');
    const formData = new FormData(form);
    var url = 'icas';
    
    var actividad = $('#actividad').val();
    var tarifa = $('#tarifa').val();
    
    formData.append("actividad", actividad);
    formData.append("tarifa", tarifa);
    formData.append('_method', 'PUT');
    
    $.ajax({
        method: "POST",
        url: url_back + url +"/"+localStorage.editarica,
        headers: { 
            Authorization: 'Bearer ' + localStorage.access_token
        },
        dataType: "json",
        data: formData,
        contentType: false,//formData
        processData: false,//formData
        success: function(respuesta) {
    
            localStorage.editar = '';
            if(respuesta){
                $('#ModalLong2').modal('hide');
                $('#ModalLong2').removeClass('show');
                $('.modal-backdrop').remove();
    
                var mensaje = 'se actualizado de forma correcta '+ respuesta.data.actividad;
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
    
    
    function obtenerRetencionica(id){
    var url = 'icas/'+ id;
    
    $.ajax({
        method: "GET",
        url: url_back + url,
        headers: { 
                      Authorization: 'Bearer ' + localStorage.access_token
                  },
        dataType: "json",
        success: function(respuesta) {
            $('#tarifa').val(respuesta.data.tarifa);
            $('#actividad').val(respuesta.data.actividad);
        },
        error: function() {
            var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
            sweetMessage('error', mensaje);
        }
      })  
    }
    
    
    $(document).ready(function() {
        $('.preloader').hide("slow");
          validarLogin();
          obtenerRetencionica(localStorage.editarica);
          actualizarmoneda();

        $('#descripcion').validCampo('abcdefghijklmnopqrstuvwxyziou# 0123456789._-');
    });
    