var organizarDatos = function( data ) {
  var arrServicios = [];
  data.forEach(element => {
      arrServicio = [
          element.codigo,
          element.nombre,
          element.costounitario,
          element.posnombre,
      ];

      if(localStorage.nivelperfil == 2){
        arrServicio.push('<div class="col text-center">  <button class="btn btn-success btn-sm" type="submit" onclick="verServicio('+ element.id +')" data-toggle="modal" data-target="#exampleModalLong"><i class="nav-icon fas fa-search" aria-hidden="true"></i></button> &nbsp; <button class="btn btn-info btn-sm" type="submit" onclick="editarServicio('+ element.id +')"><i class="nav-icon fa fa-pencil-alt" aria-hidden="true"></i></button> &nbsp;  <button class="btn btn-danger btn-sm" type="submit" onclick="eliminarServicio('+ element.id +')"><i class="nav-icon fa fa-times" aria-hidden="true"></i></button>  </div>'); 
      }else if(localStorage.nivelperfil == 1){
        arrServicio.push('<div class="col text-center">  <button class="btn btn-success btn-sm" type="submit" onclick="verServicio('+ element.id +')" data-toggle="modal" data-target="#exampleModalLong"><i class="nav-icon fas fa-search" aria-hidden="true"></i></button> &nbsp; <button class="btn btn-info btn-sm" type="submit" onclick="editarServicio('+ element.id +')"><i class="nav-icon fa fa-pencil-alt" aria-hidden="true"></i></button> </div>'); 
      }else if(localStorage.nivelperfil == 0){
        arrServicio.push('<div class="col text-center">  <button class="btn btn-success btn-sm" type="submit" onclick="verServicio('+ element.id +')" data-toggle="modal" data-target="#exampleModalLong"><i class="nav-icon fas fa-search" aria-hidden="true"></i></button> &nbsp;</div>'); 
      }

      arrServicios.push(arrServicio);
  });

  return arrServicios;
}


var generarDataTable = function( dataSet ) {

$("#example1").DataTable({
  data: dataSet,
  destroy: true,
  columns: [
          { title: "Codigo" },
          { title: "Nombre" },
          { title: "Costo Unitario" },
          { title: "POS Nombre" },
          { title: "Acciones" },
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
var url = 'servicios';

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


var renderServicio = function() {
var url ='servicios/add.html';

$('#main_content').load(url_front + url);
}

function eliminarServicio(id){
var url_eliminar = 'servicios/' + id;
var url_index = 'servicios/index.html';

if (confirm('¿Está seguro de Borrar?')){

            $.ajax({
          method: "DELETE",
          url: url_back + url_eliminar,
          headers: { 
                        Authorization: 'Bearer ' + localStorage.access_token
                    },
          dataType: "json",
          success: function(respuesta) {

              var mensaje = 'se borro exitosamente el Servicios: ' + respuesta.data.nombre;
              sweetMessage('success', mensaje);
              infoTable(); 
          },
          error: function() {
              var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
              sweetMessage('error', mensaje);
          }
        })  
} else{
  return false;
}
}

function editarServicio(id){
var url_edit = 'servicios/edit.html';
$('#main_content').load(url_front + url_edit);
  localStorage.setItem('editar', id);
}

function verServicio(id){
var url_ver = '/servicios/show.html';

localStorage.setItem('ver', id);
$('#main_content').load(url_front + url_ver);
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

$("#crear").on("click",renderServicio);

});

