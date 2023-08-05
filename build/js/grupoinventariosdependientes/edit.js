$("#form").submit(function(e) {
    e.preventDefault();   
    
    const form = document.getElementById('form');
    const formData = new FormData(form);
    
    var descripcion = $('#descripcion').val();
    var codigo = $('#codigo').val();
    
    formData.append("codigo", codigo);
    formData.append("descripcion", descripcion);
    formData.append('_method', 'PUT');
    
    $.ajax({
        method: "POST",
        url: url_back + "grupoinventarios/"+localStorage.editar,
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
                // $('#ModalLong').modal('hide');
                // $('ModalLong').removeClass('show')
                $('.modal-backdrop').remove();
    
                var mensaje = 'se actualizado de forma correcta.: '+ respuesta.data.descripcion;
                sweetMessage('success', mensaje); 
                $('#main_content').load(url_front + 'grupoinventarios/index.html');
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
    
    
    
    function obtenerGrupoinventario(id){
    
    var url = 'grupoinventarios/'+ id;
    
    $.ajax({
        method: "GET",
        url: url_back + url,
        headers: { 
                      Authorization: 'Bearer ' + localStorage.access_token
                  },
        dataType: "json",
        success: function(respuesta) {
            $('#codigo').val(respuesta.data.codigo);
            $('#descripcion').val(respuesta.data.descripcion);
        },
        error: function() {
            var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
            sweetMessage('error', mensaje);
        }
      })  
    }
    
    
    
    //******************************************************* trae todas las cuentas Grupoinventario ********************************************************
    
    
    $(document).ready(function() {
        $('.preloader').hide("slow");
          validarLogin();
          obtenerGrupoinventario(localStorage.editar);
    
        $('#descripcion').validCampo('abcdefghijklmnopqrstuvwxyziou# 0123456789._-');
    });
    
    