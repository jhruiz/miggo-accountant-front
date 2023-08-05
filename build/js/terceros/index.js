var organizarDatos = function( data ) {
  var arrTerceros = [];
  data.forEach(element => {
      arrTercero = [
          element.nombres,
          element.apellidos,
          element.identificacion,
          element.email,
          element.telefono            
      ];

      if(localStorage.nivelperfil == 2){
          arrTercero.push('<div class="col text-center"> <button class="btn btn-success btn-sm" type="submit" onclick="verTercero('+ element.id +')" data-toggle="modal" data-target="#exampleModalLong"><i class="nav-icon fas fa-search" aria-hidden="true"></i></button> &nbsp; <button class="btn btn-info btn-sm" type="submit" onclick="editarTercero('+ element.id +')"><i class="nav-icon fa fa-pencil-alt" aria-hidden="true"></i></button> &nbsp;  <button class="btn btn-danger btn-sm" type="submit" onclick="eliminarTercero('+ element.id +')"><i class="nav-icon fa fa-times" aria-hidden="true"></i></button>  </div>'); 
      }else if(localStorage.nivelperfil == 1){
          arrTercero.push('<div class="col text-center"> <button class="btn btn-success btn-sm" type="submit" onclick="verTercero('+ element.id +')" data-toggle="modal" data-target="#exampleModalLong"><i class="nav-icon fas fa-search" aria-hidden="true"></i></button> &nbsp; <button class="btn btn-info btn-sm" type="submit" onclick="editarTercero('+ element.id +')"><i class="nav-icon fa fa-pencil-alt" aria-hidden="true"></i></button> &nbsp; </div>'); 
      }else if(localStorage.nivelperfil == 0){
          arrTercero.push('<div class="col text-center"> <button class="btn btn-success btn-sm" type="submit" onclick="verTercero('+ element.id +')" data-toggle="modal" data-target="#exampleModalLong"><i class="nav-icon fas fa-search" aria-hidden="true"></i></button> &nbsp; '); 
      }

      arrTerceros.push(arrTercero);
  });

  return arrTerceros;
}

var generarDataTable = function( dataSet ) {

$("#example1").DataTable({
  data: dataSet,
  destroy: true,
  columns: [
          { title: "Nombres" },
          { title: "Apellidos" },
          { title: "Identificación" },
          { title: "Email" },
          { title: "Telefono" },
          { title: "Acciones" },
          ],
  "responsive": true, "lengthChange": true, "autoWidth": false,
  "paging": true, "ordering": true, "info": true,  "scrollX": true,
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
var url = 'terceros';

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


var renderTercero = function() {
var url ='terceros/add.html';
$('#main_content').load(url_front + url);
}


function eliminarTercero(id){//mensaje de desea borrar y eliminar
var url_eliminar = 'terceros/' + id;

if (confirm('¿Está seguro de Borrar?')){

            $.ajax({
          method: "DELETE",
          url: url_back + url_eliminar,
          headers: { 
                        Authorization: 'Bearer ' + localStorage.access_token
                    },
          dataType: "json",
          success: function(respuesta) {

              var mensaje = 'se borro exitosamente el Tercero de email: ' + respuesta.data.email + ' de nombre: ' + respuesta.data.nombres;
              sweetMessage('success', mensaje);
              
              infoTable(); 
          },
          error: function(resp) {

              if(resp.responseJSON.error){
                  var mensaje = resp.responseJSON.error.message;
                  sweetMessage('error', mensaje);
              }else{
                  var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
                  sweetMessage('error', mensaje);
              }
          }
        })  
} else{
  return false;
}
}

function editarTercero(id){//render al editar
var url_edit = 'terceros/edit.html';

$('#main_content').load(url_front + url_edit);
  localStorage.setItem('editar', id);
}

function verTercero(id){
var url_show = 'terceros/show.html';

$('#main_content').load(url_front + url_show);
  localStorage.setItem('ver', id);
}

function nivelPerfil(){
if(localStorage.nivelperfil >= 1){
   $('#divCrear').show();
}
}

$( document ).ready(function() {
$('.preloader').hide("slow");
validarLogin();
nivelPerfil();
infoTable(); 

var saludo = 'Hola '+ localStorage.nombres;
$('#saludos').text(saludo);

$("#crear").on("click",renderTercero);

});