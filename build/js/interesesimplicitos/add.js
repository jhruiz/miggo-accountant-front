$("#form").submit(function(e) {
    e.preventDefault();   
    
    const form = document.getElementById('form');
    const formData = new FormData(form);
    
    var fecha = $('#fechas').val();
    var dias = $('#dias').val();
    var porcentajes = $('#porcentajes').val() / 100;
    
    formData.append("fecha", fecha);
    formData.append("dias", dias);
    formData.append("porcentajes", porcentajes);
    formData.append("creador_id", localStorage.id);
    formData.append("empresa_id", localStorage.empresa_id);
    
    $.ajax({
        method: "POST",
        url: url_back + "interesesimplicitos",
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
                var mensaje = 'Intereses Implicitos creado de forma correcta.: ';
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
    
    $( document ).ready(function() {
        $('.preloader').hide("slow");
        validarLogin();
    
        $('#descripcion').validCampo('abcdefghijklmnopqrstuvwxyziou 0123456789-');
    });
    
    $(function() {
     $("#fecha").datetimepicker({
            locale: "es",
            format: "YYYY-MM-DD",  
            minDate: moment().subtract(1, 'year'),
            timepicker:false,
            autoclose: true,
            showButtonPanel: true
     });
    });