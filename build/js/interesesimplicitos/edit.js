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
    formData.append('_method', 'PUT');
    
    $.ajax({
        method: "POST",
        url: url_back + "interesesimplicitos/"+localStorage.editar,
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
                var mensaje = ' Intereses Implicitos actualizado de forma correcta.: ';
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
    
    
    function obtenerInteresesimplicito(id){
    
    var url = 'interesesimplicitos/'+ id;
    
    $.ajax({
        method: "GET",
        url: url_back + url,
        headers: { 
                      Authorization: 'Bearer ' + localStorage.access_token
                  },
        dataType: "json",
        success: function(respuesta) {
    
            $('#fechas').val(respuesta.data.fecha);
            $('#dias').val(respuesta.data.dias);
            $('#porcentajes').val(respuesta.data.porcentajes * 100);
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
          obtenerInteresesimplicito(localStorage.editar);
    
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
    