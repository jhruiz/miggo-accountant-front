$("#form").submit(function(e) {
    e.preventDefault();   
    
    const form = document.getElementById('form');
    const formData = new FormData(form);
    var url = 'decimales';
    
    var decimalPeso = $('#select-decimalpeso').val();
    var decimalMoneda = $('#select-decimalmoneda').val();
    
    formData.append("decimalPeso", decimalPeso);
    formData.append("decimalMoneda", decimalMoneda);
    formData.append('_method', 'PUT');
    
    $.ajax({
        method: "POST",
        url: url_back + url +"/"+localStorage.editardecimale,
        headers: { 
            Authorization: 'Bearer ' + localStorage.access_token
        },
        dataType: "json",
        data: formData,
        contentType: false,//formData
        processData: false,//formData
        success: function(respuesta) {
    
                $('#ModalLong2').modal('hide');
                $('#ModalLong2').removeClass('show')
                $('.modal-backdrop').remove();
    
                var mensaje = 'se actualizado de forma correcta';
                sweetMessage('success', mensaje); 
                localStorage.setItem('decimalPeso', decimalPeso);
                localStorage.setItem('decimalMoneda', decimalMoneda);
                obtenerEmpresa(localStorage.empresa_id);
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
    
    
    function obtenerDecimale(id){
    var url = 'decimales/'+ id;
    
    $.ajax({
        method: "GET",
        url: url_back + url,
        headers: { 
                      Authorization: 'Bearer ' + localStorage.access_token
                  },
        dataType: "json",
        success: function(respuesta) {
            $('#select-decimalpeso').val(respuesta.data.decimalPeso);
            $('#select-decimalmoneda').val(respuesta.data.decimalMoneda);
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
          obtenerDecimale(localStorage.editardecimale);
    
        $('#descripcion').validCampo('abcdefghijklmnopqrstuvwxyziou# 0123456789._-');
    });
    
    