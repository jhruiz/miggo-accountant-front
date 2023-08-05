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
    var tipofacturacione_id = $('#select-tipofacturaciones').val();
    
    formData.append("numeroresolucion", numeroresolucion);
    formData.append("fecharesolucion", fecharesolucion);
    formData.append("prefijo", prefijo);
    formData.append("consecutivodesde", consecutivodesde);
    formData.append("consecutivohasta", consecutivohasta);
    formData.append("vigenciameses", vigenciameses);
    formData.append("alertaconsecutiva", alertaconsecutiva);
    formData.append("tipofacturacione_id", tipofacturacione_id);
    formData.append('_method', 'PUT');
    
    $.ajax({
        method: "POST",
        url: url_back + "numeracionfacturaventas/"+localStorage.editar,
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
            var mensaje = 'Numero Facturacion venta actualizado de forma correcta.: '+ respuesta.data.numeroresolucion;
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
    
    
    function obtenerNumeracionfacturaventa(id){
    var url = 'numeracionfacturaventas/'+ id;
    
    $.ajax({
        method: "GET",
        url: url_back + url,
        headers: { 
                      Authorization: 'Bearer ' + localStorage.access_token
                  },
        dataType: "json",
        success: function(respuesta) {
    
            $('#numeroresolucion').val(respuesta.data.numeroresolucion);
            $('#fecharesoluciones').val(respuesta.data.fecharesolucion);
            $('#prefijo').val(respuesta.data.prefijo);
            $('#consecutivodesde').val(respuesta.data.consecutivodesde);
            $('#consecutivohasta').val(respuesta.data.consecutivohasta);
            $('#vigenciameses').val(respuesta.data.vigenciameses);
            $('#alertaconsecutiva').val(respuesta.data.alertaconsecutiva);

            if(respuesta.data.tipofacturacione_id){
                obtenerSelect('tipofacturaciones','#select-tipofacturaciones',respuesta.data.tipofacturacione_id);
            }else{
                obtenerSelects('tipofacturaciones','#select-tipofacturaciones');
            }
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
          obtenerNumeracionfacturaventa(localStorage.editar);
    
        $('#numeroresolucion').validCampo('abcdefghijklmnopqrstuvwxyziou 0123456789-');
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
    