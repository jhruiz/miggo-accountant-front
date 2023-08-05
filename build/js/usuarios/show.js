
//***************************************************trae valores de tercero y usuario si ya exiten (perfil,ciudad,tipodocumento)*******************
var obtenerCiudad = function(id){
    url_ciu= 'ciudades/' + id;
    $.ajax({
    method: "GET",
    url: url_back + url_ciu,
    headers: { 
        Authorization: 'Bearer ' + localStorage.access_token
    },
    dataType: "json",
    success: function(respuesta) {
            var htmlCiudades = '';
            htmlCiudades += '<option value="'+ respuesta.data.id+'">';
            htmlCiudades += respuesta.data.descripcion;
            htmlCiudades += '</option>';
            $('#select-ciudad').html(htmlCiudades);
    },
    error: function() {
        var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
        sweetMessage('error', mensaje);
    }
  })  
}

var obtenerPerfilSelect = function(url, select, id){
  url_tipo= url+ '/' +id;
  $.ajax({
  method: "GET",
  url: url_back + url_tipo,
  headers: { 
      Authorization: 'Bearer ' + localStorage.access_token
  },
  dataType: "json",
  success: function(respuesta) {
          var html = '';
          html += '<option value="'+ respuesta.data.id+'">';
          html += respuesta.data.descripcion+'-'+respuesta.data.nivel;
          html += '</option>';
          $(select).html(html);
  },
  error: function() {
      var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
      sweetMessage('error', mensaje);
  }
})  
}

//*******************************************************************************************************
var obtenerTercero = function(id){
    url_ter= 'terceros/' + id;
    $.ajax({
    method: "GET",
    url: url_back + url_ter,
    headers: { 
        Authorization: 'Bearer ' + localStorage.access_token
    },
    dataType: "json",
    success: function(respuesta) {
            $('#tercero').val(respuesta.data.identificacion+'-'+respuesta.data.nombres);
            $('#tercero_id').val(respuesta.data.id);
            $('#apellidos').val(respuesta.data.apellidos );
            $('#celular').val(respuesta.data.celular );
            $('#direccion').val(respuesta.data.direccion );
    },
    error: function() {
        var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
        sweetMessage('error', mensaje);
    }
  })  
}


//*************************************************************************************************************************

function obtenerUsuario(id){

var url = 'users/'+ id;

$.ajax({
    method: "GET",
    url: url_back + url,
    headers: { 
                  Authorization: 'Bearer ' + localStorage.access_token
              },
    dataType: "json",
    success: function(respuesta) {

        $('#email').val(respuesta.data.email);

          if(respuesta.data.imagen){
              $("#imagen").attr('src', url_img + 'users/'+ respuesta.data.imagen);
          }else{
            $("#imagen").attr("src","../usuarios/"+ 'defecto.jpg');
          }

        if(respuesta.data.perfile_id){
          obtenerPerfilSelect('perfiles', '#select-perfiles', respuesta.data.perfile_id);
        }

        if(respuesta.data.tercero_id){
            obtenerTercero(respuesta.data.tercero_id);
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

    obtenerUsuario(localStorage.ver);
});