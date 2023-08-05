
$("#form").submit(function(e) {
    e.preventDefault();   
    
    const form = document.getElementById('form');
    const formData = new FormData(form);
    
    var url = 'grupoinventarios';
    var grupoinventario_id = localStorage.crear;
    
    var descripcion = $('#descripcion').val();
    var codigo = $('#codigo').val();
    var posicion = $('#posicion').val();
    
    if(grupoinventario_id != ''){
        formData.append("grupoinventario_id", grupoinventario_id);
    }

    if(posicion == "grupoinventario"){
        formData.append("posicion", 1);
    }else if(posicion == "subgrupoinventario1"){
        formData.append("posicion", 2);
    }else if(posicion == "subgrupoinventario2"){
        formData.append("posicion", 3);
    }
    
    formData.append("empresa_id", localStorage.empresa_id);
    formData.append("creador_id", localStorage.id);
    formData.append("codigo", codigo);
    formData.append("descripcion", descripcion);
    
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
    
            localStorage.crear = '';
            if(respuesta){
                // $('#ModalLong').modal('hide');
                // $('ModalLong').removeClass('show')
                $('.modal-backdrop').remove();
    
                var mensaje = 'se creo de forma correcta '+ respuesta.data.descripcion;
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
    
    $(document).ready(function() {
        $('.preloader').hide("slow");
          validarLogin();
    
        $('#descripcion').validCampo('abcdefghijklmnopqrstuvwxyziou# 0123456789._-');
    });
    
    