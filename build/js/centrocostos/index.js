function verificarNivelperfil(llamado){
  if(llamado == 'eliminar'){
       if(localStorage.nivelperfil < 2){
          var mensaje = 'no tiene el nivel para eliminar el centro de costo';
          sweetMessage('info', mensaje);
          return false;
          } 
  }else if(llamado == 'editar'){
        if(localStorage.nivelperfil < 1){
          var mensaje = 'no tiene el nivel para editar el centro de costo';
          sweetMessage('info', mensaje);
          return false;
          }
    }else if(llamado == 'crear'){
        if(localStorage.nivelperfil < 1){
          var mensaje = 'no tiene el nivel para crear el centro de costo';
          sweetMessage('info', mensaje);
          return false;
          } 
    } 
}


function eliminarCentrocosto(){//mensaje de desea borrar y eliminar
  var id = $('#id').val();
  var url = $('#centrocosto').val();
  var url_eliminar = url+'/' + id;
  var url_index = 'centrocostos/index.html';

  if(verificarNivelperfil('eliminar')  == false){
    return false;
  } 

if(id){
  if (confirm('¿Está seguro de Borrar?')){

              $.ajax({
            method: "DELETE",
            url: url_back + url_eliminar,
            headers: { 
                          Authorization: 'Bearer ' + localStorage.access_token
                      },
            dataType: "json",
            success: function(respuesta) {

                var mensaje = 'se borro exitosamente '+ url +' : ' + respuesta.data.nombre;
                sweetMessage('success', mensaje);
                
                $('#main_content').load(url_front + url_index);
            },
            error: function() {
                var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
                sweetMessage('error', mensaje);
            }
          })  
  } else{
    return false;
  }
}else{
        var mensaje = 'Se presentó un error. Por favor, seleccione un elemento.';
        sweetMessage('error', mensaje);
    }
}

function verCentrocosto(){
  var id = $('#id').val();
  var url = $('#centrocosto').val();

  if(id){
    $('#mymodal').html('');
    localStorage.setItem('ver', id);
    localStorage.setItem('url', url);
    $('#mymodal').load('../centrocostos/show.html',function(){
          $('#ModalLong').modal({show:true});
      });
    }else{
        var mensaje = 'Se presentó un error. Por favor, seleccione un elemento.';
        sweetMessage('error', mensaje);
    }
}

function editarCentrocosto(){
  var id = $('#id').val();
  var url = $('#centrocosto').val();

  if(verificarNivelperfil('editar')  == false){
    return false;
  } 

  if(id){
    $('#mymodal').html('');
    localStorage.setItem('editar', id);
    localStorage.setItem('url', url);
    $('#mymodal').load('../centrocostos/edit.html',function(){
          $('#ModalLong2').modal({show:true});
      });
    }else{
        var mensaje = 'Se presentó un error. Por favor, seleccione un elemento.';
        sweetMessage('error', mensaje);
    }
}

function crearCentrocosto(){ //TODO: Las únicas cuentas elegibles para parametrizar las divisiones son las 5, 6 y 7 (es decir todas las que empiezan por ese dígito), es decir que debe traer: 51 – 52 – 53 – 61 – 62 – 71 – 72 -73 - 74
  $('#mymodal').html('');
  var id = $('#id').val();
  var url = $('#centrocosto').val();

 if(verificarNivelperfil('crear') == false){
    return false;
  } 

  if(localStorage.nivelgasto == 1){

    if(url =='' || url =='centrocostos'){
      if (id){
            localStorage.setItem('crear', id);
            localStorage.setItem('url', url);
          }else{
            localStorage.setItem('crear', '');
            localStorage.setItem('url', '');
          }
          $('#mymodal').load('../centrocostos/add.html',function(){
                      $('#ModalLong3').modal({show:true});
                  });
    }else{
          var mensaje = 'Se presentó un error. Por favor, Tome en cuenta que la empresa tiene un nivel de gasto Divisiones';
          sweetMessage('error', mensaje);
      }

  }else if(localStorage.nivelgasto == 2){

      if(url =='' || url =='centrocostos' || url == 'divisiones'){
          if (id){
            localStorage.setItem('crear', id);
            localStorage.setItem('url', url);
          }else{
            localStorage.setItem('crear', '');
            localStorage.setItem('url', '');
          }
          $('#mymodal').load('../centrocostos/add.html',function(){
                      $('#ModalLong3').modal({show:true});
                  });
      }else{
          var mensaje = 'Se presentó un error. Por favor, Tome en cuenta que la empresa tiene un nivel de gasto Secciones';
          sweetMessage('error', mensaje);
      }

  }else if(localStorage.nivelgasto == 3){
        if (id){
          localStorage.setItem('crear', id);
          localStorage.setItem('url', url);
        }else{
          localStorage.setItem('crear', '');
          localStorage.setItem('url', '');
        }

        if(url != 'dependencias'){
            $('#mymodal').load('../centrocostos/add.html',function(){
                          $('#ModalLong3').modal({show:true});
                      });
          }else{
            var mensaje = 'No puede crear una sub-dependencia';
            sweetMessage('info', mensaje);
          }
  }else{
          var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde. verifique tener un centro de costo asociado a la empresa';
          sweetMessage('error', mensaje);
  }

}

function obtenerCentrocostos() {
var url = 'empresas/'+ localStorage.empresa_id+'/centrocostos';

  $.ajax({
      method: "GET",
      url: url_back + url,    headers: { 
          Authorization: 'Bearer ' + localStorage.access_token
      },
      dataType: "json",
      success: function(respuesta) {
          $('#select-centrocostos').html(crearHtmlCentro(respuesta.data));
      },
      error: function() {
          var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
          sweetMessage('error', mensaje);
      }
    })     
  }
  
  var crearHtmlCentro = function(data) {
      var html = '';
          $.each(data, function (key, item) {
              html += '<option value="'+ item.id+'">';
              html += item.nombre;
              html += '</option>';
          });
      return html;
  }

  //************************************************Lista Centro de costo*****************************************************

  var organizarDatos = function( data ) {  
    var arrcentrocostos = [];
    var arrcentrocosto = [];
    var bool= 1;

    $.each(data, function(i, centrocosto) { //TODO: esto esta registrado en la empresa por el nivel debe ser tomado en cuenta 
         bool = 1;
        $.each(centrocosto.divisiones, function(j, divisiones) {
            bool = 1;
            $.each(divisiones.secciones, function(k, secciones) {
                bool = 1;
                $.each(secciones.dependencias, function(h, dependencias) {
                  arrcentrocosto.push(centrocosto.nombre);
                  arrcentrocosto.push(divisiones.codigo);
                  arrcentrocosto.push(divisiones.nombre);
                  arrcentrocosto.push(secciones.codigo);
                  arrcentrocosto.push(secciones.nombre);
                  arrcentrocosto.push(dependencias.codigo);
                  arrcentrocosto.push(dependencias.nombre);
                  arrcentrocostos.push(arrcentrocosto);
                  arrcentrocosto = [];
                  bool = 0;
                });

                    if(bool == 1 && k >= 0){
                      arrcentrocosto.push(centrocosto.nombre);
                      arrcentrocosto.push(divisiones.codigo);
                      arrcentrocosto.push(divisiones.nombre);
                      arrcentrocosto.push(secciones.codigo);
                      arrcentrocosto.push(secciones.nombre);
                      arrcentrocosto.push('');
                      arrcentrocosto.push('');
                      arrcentrocostos.push(arrcentrocosto);
                      arrcentrocosto = [];
                      bool = 0;
                    }

            });

                    if(bool == 1 && j >= 0){
                          arrcentrocosto.push(centrocosto.nombre);
                          arrcentrocosto.push(divisiones.codigo);
                          arrcentrocosto.push(divisiones.nombre);
                          arrcentrocosto.push('');
                          arrcentrocosto.push('');
                          arrcentrocosto.push('');
                          arrcentrocosto.push('');
                          arrcentrocostos.push(arrcentrocosto);
                          arrcentrocosto = [];
                          bool = 0;
                        }

          });

                      if(bool == 1 && i >= 0){
                          arrcentrocosto.push(centrocosto.nombre);
                          arrcentrocosto.push('');
                          arrcentrocosto.push('');
                          arrcentrocosto.push('');
                          arrcentrocosto.push('');
                          arrcentrocosto.push('');
                          arrcentrocosto.push('');
                          arrcentrocostos.push(arrcentrocosto);
                          arrcentrocosto = [];
                          bool = 0;
                        }
      });
    return arrcentrocostos;
}


var generarDataTable = function( dataSet ) {

  $("#example1").DataTable({
    data: dataSet,
    destroy: true,
    columns: [
            { title: "Centros" },
            { title: "Codigo" },
            { title: "Division" },
            { title: "Codigo" },
            { title: "Seccion" },
            { title: "Codigo" },
            { title: "Dependencia" },
            ],
    "responsive": true, "lengthChange": true, "autoWidth": false,
    "paging": true, "ordering": true, "info": true,
    lengthMenu: [
            [10, 25, 50, 100, -1],
            [10, 25, 50, 100, 'All'],
        ],
        "language": {
                url:"../../build/config/languagedatatable.json"
          },
          dom: 'Bfrtip',
         "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]
  }).buttons().container().appendTo('#example1_wrapper .col-md-6:eq(0)');

}


var infoTable = function(){
var url = 'getallcentros/' + localStorage.empresa_id;

    $.ajax({
            method: "GET",
            url: url_back + url,
            headers: { 
                Authorization: 'Bearer ' + localStorage.access_token
            },
            dataType: 'json',
            success: function(respuesta) {
                generarDataTable(organizarDatos(respuesta.data));
            },
            error: function() {
                var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde o la tabla esta vacia';
                sweetMessage('error', mensaje);
            }
        }) 
}

  //*************************************************************************************************************************

$( document ).ready(function() {
  $('.preloader').hide("slow");
  validarLogin();

  obtenerCentrocostos(); 
  infoTable();

  $('#select-centrocostos').on('click',function(){
    var centrocosto_id = $(this).val();
    var url_d ='centrocostos/'+centrocosto_id+'/divisiones';
    if(centrocosto_id){
        $.ajax({
            type:"GET",
            url: url_back + url_d,
            headers: { 
                  Authorization: 'Bearer ' + localStorage.access_token
            },
            dataType: "json",
            success:function(respuesta){

              // console.log(respuesta.data.length);
                $('#id').val(centrocosto_id);
                $('#centrocosto').val('centrocostos');
                if(respuesta.data.length != 0){
                    $('#select-secciones').html('');
                    $('#select-dependencias').html('');
                    $('#select-divisiones').html(crearHtmlCentro(respuesta.data));
                }else{
                  $('#select-divisiones').html('');
                  $('#select-secciones').html('');
                  $('#select-dependencias').html('');
                }
            }
        }); 
    }else if($(this).val() == ''){
         $('#select-divisiones').html('');
         $('#select-secciones').html('');
         $('#select-dependencias').html('');
    }
});

$('#select-divisiones').on('click',function(){
  var divisione_id = $(this).val();
  var url_d ='divisiones/'+divisione_id+'/secciones';
  if(divisione_id){
      $.ajax({
          type:"GET",
          url: url_back + url_d,
          headers: { 
                Authorization: 'Bearer ' + localStorage.access_token
          },
          dataType: "json",
          success:function(respuesta){

            $('#id').val(divisione_id);
            $('#centrocosto').val('divisiones');
            if(respuesta.data.length != 0){
                  $('#select-dependencias').html('');
                  $('#select-secciones').html(crearHtmlCentro(respuesta.data));
              }else{
                $('#select-secciones').html('');
                $('#select-dependencias').html('');
              }
          }
      }); 
  }else if($(this).val() == ''){
       $('#select-secciones').html('');
       $('#select-dependencias').html('');
  }
});

$('#select-secciones').on('click',function(){
  var seccione_id = $(this).val();
  var url_d ='secciones/'+seccione_id+'/dependencias';
  if(seccione_id){
      $.ajax({
          type:"GET",
          url: url_back + url_d,
          headers: { 
                Authorization: 'Bearer ' + localStorage.access_token
          },
          dataType: "json",
          success:function(respuesta){

              $('#id').val(seccione_id);
              $('#centrocosto').val('secciones');
              if(respuesta.data.length != 0){
                  $('#select-dependencias').html(crearHtmlCentro(respuesta.data));
              }else{
                 $('#select-dependencias').html('');
              }
          }
      }); 
  }else if($(this).val() == ''){
       $('#select-dependencias').html('');
  }
});

$('#select-dependencias').on('click',function(){
  var dependencia_id = $(this).val();
  if(dependencia_id){
      $('#id').val(dependencia_id);
      $('#centrocosto').val('dependencias');
  }
});

});