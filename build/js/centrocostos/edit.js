$("#form").submit(function(e) {
    e.preventDefault();   
    
    const form = document.getElementById('form');
    const formData = new FormData(form);
    
     var edit= localStorage.editar;
     var url= localStorage.url;
    
     switch (url) {
        case 'centrocostos':
            var nombre = $('#nombre').val();
            var descripcion = $('#descripcion').val();
            formData.append("nombre", nombre);
            formData.append("descripcion", descripcion);
            break;
    
        case 'divisiones':
            var codigo = $('#codigo').val();
            var nombre = $('#nombre').val();
            var puc_id = $('#select-puc').val();
            formData.append("codigo", codigo);
            formData.append("nombre", nombre);
            formData.append("puc_id", puc_id);
            break;
    
        case 'secciones':
            var codigo = $('#codigo').val();
            var nombre = $('#nombre').val();
            formData.append("codigo", codigo);
            formData.append("nombre", nombre);
            break;
    
        case 'dependencias':
            var codigo = $('#codigo').val();
            var nombre = $('#nombre').val();
            formData.append("codigo", codigo);
            formData.append("nombre", nombre);
            break;
            
        default:
            break;
     }
    
    
    formData.append('_method', 'PUT');
    
    // const output = document.getElementById('output');
    
    // for (const [key, value] of formData) {
    //   output.textContent += `${key}: ${value}\n`;
    // }
    
    $.ajax({
        method: "POST",
        url: url_back + url +"/"+localStorage.editar,
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
    
                var mensaje = 'se actualizado de forma correcta '+ url +'.: '+ respuesta.data.nombre;
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
    
    
    
    function obtenerCentrocosto(id, url_centro){
    
    var url = url_centro +'/'+ id;
    
    $.ajax({
        method: "GET",
        url: url_back + url,
        headers: { 
                      Authorization: 'Bearer ' + localStorage.access_token
                  },
        dataType: "json",
        success: function(respuesta) {
            // $('#nombre').val(respuesta.data.nombre);
            switchEditar(url_centro, respuesta.data);
    
        },
        error: function() {
            var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
            sweetMessage('error', mensaje);
        }
      })  
    }
    
    
    function switchEditar(url, data){ //TODO: required 
        bottones = '';
        bottones += '<div class="col-12 float-right">';
        bottones += '<button type="button" class="btn btn-secondary float-right" data-dismiss="modal">Cerrar</button>&nbsp;';
        bottones += '<button type="submit" id="form" class="btn btn-primary">Actualizar</button></div>'; 
            
    
        switch (url) {
            case 'centrocostos':
                html = '';
                html += '<div class="input-group mb-3">';
                html += '<div class="input-group-prepend">';
                html += '<span class="input-group-text"><i class="fas fa-signature"></i></span></div>';
                html += '<input type="text" id="nombre" class="form-control" placeholder="Nombre"></div>';
              
                html += '<div class="input-group mb-3">';
                html += '<div class="input-group-prepend">';
                html += '<span class="input-group-text"><i class="fas fa-signature"></i></span></div>';
                html += '<input type="text" id="descripcion" class="form-control" placeholder="Descripcion"></div>';
             
                html += bottones;
                $('#form').html(html);
                $('#nombre').val(data.nombre);
                $('#descripcion').val(data.descripcion);
                break;
    
            case 'divisiones':
                html = '';
                html += '<div class="input-group mb-3">';
                html += '<div class="input-group-prepend">';
                html += '<span class="input-group-text"><i class="fas fa-signature"></i></span></div>';
                html += '<input type="text" id="codigo" class="form-control" placeholder="Codigo de La Division"></div>';
    
                html += '<div class="input-group mb-3">';
                html += '<div class="input-group-prepend">';
                html += '<span class="input-group-text"><i class="fas fa-signature"></i></span></div>';
                html += '<input type="text" id="nombre" class="form-control" placeholder="Nombre"></div>';
              
                html += '<div class="form-group">';
                html += '<label for="SelectBorder">Cuenta PUC</label>';
                html += '<select class="custom-select form-control-border" id="select-puc"></select></div>';
             
                html += bottones;
                $('#form').html(html);
                $('#codigo').val(data.codigo);
                $('#nombre').val(data.nombre);
                    if(data.puc_id){
                        obtenerPuc(data.puc_id);
                    }else{
                        obtenerPucs();
                    }
                    
                break;
    
            case 'secciones':
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
                $('#codigo').val(data.codigo);
                $('#nombre').val(data.nombre);
                break;
    
            case 'dependencias':
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
                $('#codigo').val(data.codigo);
                $('#nombre').val(data.nombre);
                break;
    
            default:
                var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde. switch';
                sweetMessage('error', mensaje);
                break;
        }
    
    }
    
    //******************************************************* Trae la cuenta Puc si existe********************************************************
    var obtenerPuc = function(id){
        url_puc= 'pucs/'+id;
        $.ajax({
        method: "GET",
        url: url_back + url_puc,
        headers: { 
            Authorization: 'Bearer ' + localStorage.access_token
        },
        dataType: "json",
        success: function(respuesta) {
                var htmlEstado = '';
                htmlEstado += '<option value="'+ respuesta.data.id+'">';
                htmlEstado += respuesta.data.id+'-'+respuesta.data.descripcion;
                htmlEstado += '</option>';
                obtenerPucs(htmlEstado, id);
        },
        error: function() {
            var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
            sweetMessage('error', mensaje);
        }
      })  
    }
    
    
    //******************************************************* trae todas las cuentas pucs ********************************************************
    var obtenerPucs = function(base = null, id = null){
        var url_puc= 'allpucscentrocostos';
        $.ajax({
        method: "GET",
        url: url_back + url_puc,
        headers: { 
            Authorization: 'Bearer ' + localStorage.access_token
        },
        dataType: "json",
        success: function(respuesta) {
    
            $('#select-puc').html(crearHtmlshow(respuesta, base, id));
    
        },
        error: function() {
            var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
            sweetMessage('error', mensaje);
        }
      })  
    }
    
    var crearHtmlshow = function(data, base = null, id = null) {
        var html = base? base : '<option value="">Seleccione..</option>';
        $.each(data, function (key, item) {
            if(id != item.id){
                html += '<option value="'+ item.id+'">';
                html += item.id+'-'+item.descripcion;
                html += '</option>';
            }
        });
        return html;
    }
    
    $(document).ready(function() {
        $('.preloader').hide("slow");
          validarLogin();
          obtenerCentrocosto(localStorage.editar, localStorage.url);
    
        $('#descripcion').validCampo('abcdefghijklmnopqrstuvwxyziou# 0123456789._-');
    });