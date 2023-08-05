//***************************************************trae valores de tercero y tercero si ya exiten (perfil,ciudad,tipodocumento)*******************
var obtenerCiiu = function(id){
    url_ci= 'ciiuclases/' + id;
    $.ajax({
    method: "GET",
    url: url_back + url_ci,
    headers: { 
        Authorization: 'Bearer ' + localStorage.access_token
    },
    dataType: "json",
    success: function(respuesta) {
            $('#ciiu').val(respuesta.data.codigo+'-'+respuesta.data.descripcion);
            $('#ciiu_id').val(respuesta.data.id);
    },
    error: function() {
        var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
        sweetMessage('error', mensaje);
    }
    })  
}

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
            if (respuesta.data.id) {
                htmlCiudades += '<option value="'+ respuesta.data.id+'">';
                htmlCiudades += respuesta.data.descripcion;
                htmlCiudades += '</option>';
            }
            $('#select-ciudad').html(htmlCiudades);
    },
    error: function() {
        var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
        sweetMessage('error', mensaje);
    }
  })  
}


//******************************************************************************************************************************************

function obtenertercero(id){
var url = 'terceros/'+ id;

$.ajax({
  method: "GET",
  url: url_back + url,
  headers: { 
                Authorization: 'Bearer ' + localStorage.access_token
            },
  dataType: "json",
  success: function(respuesta) {

      $('#nombres').val(respuesta.data.nombres);
      $('#apellidos').val(respuesta.data.apellidos);
      $('#razonsocial').val(respuesta.data.razonsocial);
      $('#representantelegal').val(respuesta.data.representantelegal);
      $('#identificacion').val(respuesta.data.identificacion);
      $('#verificado').val(respuesta.data.digitoverificacion);
      $('#direccion').val(respuesta.data.direccion);
      $('#direccion2').val(respuesta.data.direccion2);
      $('#celular').val(respuesta.data.celular);
      $('#telefono').val(respuesta.data.telefono);
      $('#email').val(respuesta.data.email);
      $('#cumpleanios').val(respuesta.data.cumpleanios);
      $('#contactocelular').val(respuesta.data.contactocelular);
      $('#contactonombre').val(respuesta.data.contactonombre);

      respuesta.data.autoretenedorrenta == 1 ? $('#autoretenedorrenta').prop( "checked", true ) : $('#autoretenedorrenta').prop( "checked", false );
      respuesta.data.autoretenedorica == 1 ? $('#autoretenedorica').prop( "checked", true ) : $('#autoretenedorica').prop( "checked", false );
  
      if(respuesta.data.imagen){
          const ul = document.getElementById("mostrarImagen");
          const imagen = document.createElement("img");
          imagen.width = 200;
          imagen.src = url_img + 'terceros/'+ respuesta.data.imagen;
          ul.appendChild(imagen);
        }else{
          const ul = document.getElementById("mostrarImagen");
          const imagen = document.createElement("img");
          imagen.width = 200;
          imagen.src = url_front + 'terceros/defecto.jpg';
          ul.appendChild(imagen);
        }

     if(respuesta.data.ciiuclase_id){
          obtenerCiiu(respuesta.data.ciiuclase_id);
      }

      if(respuesta.data.ciudade_id){
          obtenerCiudad(respuesta.data.ciudade_id);
      }

      if(respuesta.data.tipoidentificacione_id){
          obtenerSelect('tipoidentificaciones', '#select-identificacion', respuesta.data.tipoidentificacione_id);
          
            if(respuesta.data.digitoverificacion != ''){
                $("#divDigito").show();
                }
      }

      if(respuesta.data.tipodireccione_id){
          obtenerSelect('tipodirecciones', '#select-tipodirecciones', respuesta.data.tipodireccione_id);

      }

      if(respuesta.data.tipodireccione2_id){
          obtenerSelect('tipodirecciones', '#select-tipodirecciones2', respuesta.data.tipodireccione2_id);

      }

      if(respuesta.data.regimene_id){
          obtenerSelect('regimenes', '#select-regimenes', respuesta.data.regimene_id);
      }

      if(respuesta.data.personeria_id){
          obtenerSelect('personerias', '#select-personerias', respuesta.data.personeria_id);
      }

      if(respuesta.data.tipocontribuyente_id){
          obtenerSelect('tipocontribuyentes', '#select-tipocontribuyentes', respuesta.data.tipocontribuyente_id);
      }

      if(respuesta.data.contacto_id){
          obtenerSelect('contactos', '#select-contactos', respuesta.data.contacto_id);
      }
        //***************** check*****************************

      if(respuesta.data.clientes){
          marcarCheck(respuesta.data.clientes, localStorage.empresa_id, '#cliente','#divC');
      }

      if(respuesta.data.proveedores){
          marcarCheck(respuesta.data.proveedores, localStorage.empresa_id, '#proveedore','#divP');
      }

      if(respuesta.data.empleados){
          marcarCheck(respuesta.data.empleados, localStorage.empresa_id, '#empleado','#divE');
      }

      if(respuesta.data.entnominas){
          marcarCheck(respuesta.data.entnominas, localStorage.empresa_id, '#entnomina','#divN');
      }

      if(respuesta.data.socios){
          marcarCheck(respuesta.data.socios, localStorage.empresa_id, '#socio','#divS');
      }

      if(respuesta.data.otrosterceros){
          marcarCheck(respuesta.data.otrosterceros, localStorage.empresa_id, '#otrostercero','#divO');
      }

      if(respuesta.data.mastercardyvisas){
          marcarCheck(respuesta.data.mastercardyvisas, localStorage.empresa_id, '#mastercardyvisa','#divM');
      }

  },
  error: function() {
      var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
      sweetMessage('error', mensaje);
  }
})  
}

//******************************************* marcar terceros cuando ya existen********************************************************************
// marcarCheck(respuesta.data.empleados, localStorage.empresa_id, '#empleado','#divE');

var marcarCheck = function(arre, empresa_id, html_id, div){

  $.each(arre, function (key, item) {
      if(empresa_id == arre[key].empresa_id){
          $(html_id).prop( "checked", true);
          $(div).show();
          $(html_id).prop('disabled', true);

          $(html_id+"_id").val(arre[key].id);
      }
  });
}

//************************************************************************************************************

var verificarSucursal = function(){
  if(localStorage.sucursal == ''){
  $("#divEmpresa").show();
  }
}

$( document ).ready(function() {
$('.preloader').hide("slow");
  validarLogin();
  obtenertercero(localStorage.ver);
  verificarSucursal();
  localStorage.ver = '';

});