$("#form").submit(function(e) {
    e.preventDefault();   
    
    const form = document.getElementById('form');
    const formData = new FormData(form);
    
    var porcentaje = $('#porcentaje').val() / 100;
    var descripcion = $('#descripcion').val();
    var inicio = $('#inicios').val();
    var fin = $('#fins').val();
    
    formData.append("porcentaje", porcentaje);
    formData.append("descripcion", descripcion);
    formData.append("inicio", inicio);
    formData.append("fin", fin);
    formData.append('_method', 'PUT');
    
    $.ajax({
        method: "POST",
        url: url_back + "listadescuentos/"+localStorage.editar,
        headers: { 
            Authorization: 'Bearer ' + localStorage.access_token
        },
        dataType: "json",
        data: formData,
        contentType: false,
        processData: false,
        success: function(respuesta) {
    
            localStorage.editar = '';
            $('#ModalLong2').modal('hide');
            $('ModalLong2').removeClass('show');
            $('.modal-backdrop').remove();
            var mensaje = ' Descuento actualizado de forma correcta.: '+ respuesta.data.descripcion;
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
    
    
    function obtenerListadescuento(id){
    
    var url = 'listadescuentos/'+ id;
    
    $.ajax({
        method: "GET",
        url: url_back + url,
        headers: { 
                      Authorization: 'Bearer ' + localStorage.access_token
                  },
        dataType: "json",
        success: function(respuesta) {
    
            $('#porcentaje').val(respuesta.data.porcentaje * 100);
            $('#descripcion').val(respuesta.data.descripcion);
            $('#inicios').val(respuesta.data.inicio);
            $('#fins').val(respuesta.data.fin);
        },
        error: function() {
            var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
            sweetMessage('error', mensaje);
        }
      })  
    }
    
    $(function() {
     $("#inicio").datetimepicker({
            locale: "es",
            format: "YYYY-MM-DD",  
            maxDate: moment().endOf('year'),
            minDate: moment(),
            timepicker:false,
            autoclose: true,
            showButtonPanel: true,
     });
    
     $("#fin").datetimepicker({
            locale: "es",
            format: "YYYY-MM-DD",  
            maxDate: moment().endOf('year'),
            minDate: moment(),
            timepicker:false,
            autoclose: true,
            showButtonPanel: true,
     });
    });
    
    
    $( document ).ready(function() {
        $('.preloader').hide("slow");
          validarLogin();
          obtenerListadescuento(localStorage.editar);
    
        $('#descripcion').validCampo('abcdefghijklmnopqrstuvwxyziou 0123456789-');
    });
    