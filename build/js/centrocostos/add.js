$("#form").submit(function(e) {
    e.preventDefault();   
    
    const form = document.getElementById('form');
    const formData = new FormData(form);
    
     var id = localStorage.crear;
     var url = localStorage.url;
    
     switch (url) {
        case '':
            url = 'centrocostos';
            var nombre = $('#nombre').val();
            var descripcion = $('#descripcion').val();
            formData.append("nombre", nombre);
            formData.append("descripcion", descripcion);
            formData.append("empresa_id", localStorage.empresa_id);
            formData.append("creador_id", localStorage.id);
    
            break;
        case 'centrocostos':
            url = 'divisiones';
            var codigo = $('#codigo').val();
            var nombre = $('#nombre').val();
            var puc_id = $('#select-puc').val();
            formData.append("codigo", codigo);
            formData.append("nombre", nombre);
            formData.append("puc_id", puc_id);
            formData.append("centrocosto_id", id);
            formData.append("creador_id", localStorage.id);
    
            break;
    
        case 'divisiones':
            url = 'secciones';
            var codigo = $('#codigo').val();
            var nombre = $('#nombre').val();
            formData.append("codigo", codigo);
            formData.append("nombre", nombre);
            formData.append("divisione_id", id);
            formData.append("creador_id", localStorage.id);
    
            break;
    
        case 'secciones':
            url = 'dependencias';
            var codigo = $('#codigo').val();
            var nombre = $('#nombre').val();
            formData.append("codigo", codigo);
            formData.append("nombre", nombre);
            formData.append("seccione_id", id);
            formData.append("creador_id", localStorage.id);
    
            break;
    
        case 'dependencias':
            var mensaje = 'Se presentó un error. no puede crear una sub-dependencia';
            sweetMessage('info', mensaje);
            break;
            
        default:
            var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
            sweetMessage('error', mensaje);
            break;
     }
    
    // const output = document.getElementById('output');
    
    // for (const [key, value] of formData) {
    //   output.textContent += `${key}: ${value}\n`;
    // }
    
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
    
                var mensaje = 'se creo de forma correcta '+ url +'.: '+ respuesta.data.nombre;
                sweetMessage('success', mensaje); 
                $('#main_content').load(url_front + 'centrocostos/index.html');
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
    
    
    function switchcrear(url){ //TODO: required 
    
        bottones = '';
        bottones += '<div class="col-12 float-right">';
        bottones += '<button type="button" class="btn btn-secondary float-right" data-dismiss="modal">Cerrar</button>&nbsp;'; 
        bottones += '<button type="submit" id="form" class="btn btn-primary">Crear</button></div>';
    
        switch (url) {
            case '':
    
                html = '';
                html += '<div class="input-group mb-3">';
                html += '<div class="input-group-prepend">';
                html += '<span class="input-group-text"><i class="fas fa-signature"></i></span></div>';
                html += '<input type="text" id="nombre" class="form-control" placeholder="Nombre Centro de Costo"></div>';
              
                html += '<div class="input-group mb-3">';
                html += '<div class="input-group-prepend">';
                html += '<span class="input-group-text"><i class="fas fa-signature"></i></span></div>';
                html += '<input type="text" id="descripcion" class="form-control" placeholder="Descripcion Centro de Costo"></div>';
    
                html += bottones;
                $('#form').html(html);
                break;
    
            case 'centrocostos':
                html = '';
                html += '<div class="input-group mb-3">';
                html += '<div class="input-group-prepend">';
                html += '<span class="input-group-text"><i class="fas fa-signature"></i></span></div>';
                html += '<input type="text" id="codigo" class="form-control" placeholder="Codigo de La Division"></div>';
    
                html += '<div class="input-group mb-3">';
                html += '<div class="input-group-prepend">';
                html += '<span class="input-group-text"><i class="fas fa-signature"></i></span></div>';
                html += '<input type="text" id="nombre" class="form-control" placeholder="Nombre de La Division"></div>';
              
                html += '<div class="form-group">';
                html += '<label for="SelectBorder">Cuenta PUC</label>';
                html += '<select class="custom-select form-control-border" id="select-puc"></select></div>';
    
             
                html += bottones;
                $('#form').html(html);
                obtenerPucs();
                break;
    
            case 'divisiones':
                html = '';
                html += '<div class="input-group mb-3">';
                html += '<div class="input-group-prepend">';
                html += '<span class="input-group-text"><i class="fas fa-signature"></i></span></div>';
                html += '<input type="text" id="codigo" class="form-control" placeholder="Codigo de La Secciones"></div>';
    
                html += '<div class="input-group mb-3">';
                html += '<div class="input-group-prepend">';
                html += '<span class="input-group-text"><i class="fas fa-signature"></i></span></div>';
                html += '<input type="text" id="nombre" class="form-control" placeholder="Nombre"></div>';
             
                html += bottones;
                $('#form').html(html);
                break;
    
            case 'secciones':
                html = '';
                html += '<div class="input-group mb-3">';
                html += '<div class="input-group-prepend">';
                html += '<span class="input-group-text"><i class="fas fa-signature"></i></span></div>';
                html += '<input type="text" id="codigo" class="form-control" placeholder="Codigo de La Dependencias"></div>';
    
                html += '<div class="input-group mb-3">';
                html += '<div class="input-group-prepend">';
                html += '<span class="input-group-text"><i class="fas fa-signature"></i></span></div>';
                html += '<input type="text" id="nombre" class="form-control" placeholder="Nombre"></div>';
    
                html += bottones;
                $('#form').html(html);
                break;
    
            case 'dependencias':
                var mensaje = 'Se presentó un error. no puede crear una sub-dependencia';
                sweetMessage('info', mensaje);
                break;
    
            default:
                var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
                sweetMessage('error', mensaje);
                break;
        }
    
    }
    
    
    //******************************************************* trae todas las cuentas pucs ********************************************************
    var obtenerPucs = function(){
        var url_puc= 'allpucscentrocostos';
        $.ajax({
        method: "GET",
        url: url_back + url_puc,
        headers: { 
            Authorization: 'Bearer ' + localStorage.access_token
        },
        dataType: "json",
        success: function(respuesta) {
            $('#select-puc').html(crearHtmlshow(respuesta));
    
        },
        error: function() {
            var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
            sweetMessage('error', mensaje);
        }
      })  
    }
    
    var crearHtmlshow = function(data) {
                var html = '<option value="">Seleccione..</option>';
                $.each(data, function (key, item) {
                    html += '<option value="'+ item.id+'">';
                    html += item.id+'-'+item.descripcion;
                    html += '</option>';
                });
            return html;
    }
    
    $(document).ready(function() {
        $('.preloader').hide("slow");
          validarLogin();
          switchcrear(localStorage.url);
    
        $('#descripcion').validCampo('abcdefghijklmnopqrstuvwxyziou# 0123456789._-');
    });
    