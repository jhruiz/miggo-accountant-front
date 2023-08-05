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
  
        switchVer(url_centro, respuesta.data);
  
    },
    error: function() {
        var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
        sweetMessage('error', mensaje);
    }
  })  
  }
  
  
  function switchVer(url, data){ //TODO: required 
    bottones = '';
    bottones += '<div class="col-12 float-right">';
    bottones += '<button type="button" class="btn btn-secondary float-right" data-dismiss="modal">Cerrar</button></div>';
        
    switch (url) {
        case 'centrocostos':
            html = '';
            html += '<div class="input-group mb-3">';
            html += '<div class="input-group-prepend">';
            html += '<span class="input-group-text"><i class="fas fa-signature"></i></span></div>';
            html += '<input type="text" id="nombre" class="form-control" placeholder="Nombre" disabled></div>';
          
            html += '<div class="input-group mb-3">';
            html += '<div class="input-group-prepend">';
            html += '<span class="input-group-text"><i class="fas fa-signature"></i></span></div>';
            html += '<input type="text" id="descripcion" class="form-control" placeholder="Descripcion" disabled></div>';
         
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
            html += '<input type="text" id="codigo" class="form-control" placeholder="Codigo de La Division" disabled></div>';
  
            html += '<div class="input-group mb-3">';
            html += '<div class="input-group-prepend">';
            html += '<span class="input-group-text"><i class="fas fa-signature"></i></span></div>';
            html += '<input type="text" id="nombre" class="form-control" placeholder="Nombre" disabled></div>';
          
            html += '<div class="form-group">';
            html += '<label for="SelectBorder">Cuenta PUC</label>';
            html += '<select class="custom-select form-control-border" id="select-puc" disabled></select></div>';
         
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
            html += '<input type="text" id="codigo" class="form-control" placeholder="Codigo de La Secciones" disabled></div>';
  
            html += '<div class="input-group mb-3">';
            html += '<div class="input-group-prepend">';
            html += '<span class="input-group-text"><i class="fas fa-signature"></i></span></div>';
            html += '<input type="text" id="nombre" class="form-control" placeholder="Nombre" disabled></div>';
  
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
            html += '<input type="text" id="codigo" class="form-control" placeholder="Codigo de La Dependencias" disabled></div>';
  
            html += '<div class="input-group mb-3">';
            html += '<div class="input-group-prepend">';
            html += '<span class="input-group-text"><i class="fas fa-signature"></i></span></div>';
            html += '<input type="text" id="nombre" class="form-control" placeholder="Nombre" disabled></div>';
  
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
  
            var htmlcentro = '';
            htmlcentro += '<option value="'+ respuesta.data.id+'">';
            htmlcentro += respuesta.data.descripcion;
            htmlcentro += '</option>';
  
           $('#select-puc').html(htmlcentro);
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
      obtenerCentrocosto(localStorage.ver, localStorage.url);
  
  });