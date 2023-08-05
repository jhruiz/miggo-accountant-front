$("#form").submit(function(e) {
    e.preventDefault();   
    
    const form = document.getElementById('form');
    const formData = new FormData(form);
    
    var numeroresolucion = $('#numeroresolucion').val();
    var fecharesolucion = $('#fecharesoluciones').val();
    var prefijo = $('#prefijo').val();
    var consecutivodesde = $('#consecutivodesde').val();
    var consecutivohasta = $('#consecutivohasta').val();
    var vigenciameses = $('#vigenciameses').val();
    var alertaconsecutiva = $('#alertaconsecutiva').val();
    
    formData.append("numeroresolucion", numeroresolucion);
    formData.append("fecharesolucion", fecharesolucion);
    formData.append("prefijo", prefijo);
    formData.append("consecutivodesde", consecutivodesde);
    formData.append("consecutivohasta", consecutivohasta);
    formData.append("vigenciameses", vigenciameses);
    formData.append("alertaconsecutiva", alertaconsecutiva);
    formData.append("empresa_id", localStorage.empresa_id);
    formData.append("creador_id", localStorage.id);
    
    
    $.ajax({
        method: "POST",
        url: url_back + "numeracionfacturacompras",
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
                var mensaje = 'Numero Facturacion Compra creado de forma correcta.: '+ respuesta.data.numeroresolucion;
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
    
    
    $(function() {
     $("#fecharesolucion").datetimepicker({
            locale: "es",
            format: "YYYY-MM-DD",  
            maxDate: moment(),
            minDate: moment().subtract(99, 'year'),
            timepicker:false,
            autoclose: true,
            showButtonPanel: true,
     });
    });
    
    
    $( document ).ready(function() {
        $('.preloader').hide("slow");
        validarLogin();
    
        $('#numeroresolucion').validCampo('abcdefghijklmnopqrstuvwxyziou 0123456789-');
    });
    