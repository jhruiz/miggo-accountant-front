var organizarDatos = function( data ) { 
  var arrActivosfijos = [];
 console.log(data);
  // se recorre la respuesta y se genera un array de arrays.
  data.forEach(element => {
      arrActivosfijo = [
          element.codigo,
          element.nombre,
          element.gruposactivosfijo.descripcion,
          element.estadoactivo.descripcion,
          element.ciudade.descripcion,
      ];

      if(localStorage.nivelperfil == 2){
          arrActivosfijo.push('<div class="col text-center"> <button class="btn btn-success btn-sm" type="submit" onclick="verActivosfijo('+ element.id +')" data-toggle="modal" data-target="#exampleModalLong"><i class="nav-icon fas fa-search" aria-hidden="true"></i></button> &nbsp; <button class="btn btn-info btn-sm" type="submit" onclick="editarActivosfijo('+ element.id +')"><i class="nav-icon fa fa-pencil-alt" aria-hidden="true"></i></button> &nbsp;  <button class="btn btn-danger btn-sm" type="submit" onclick="eliminarActivosfijo('+ element.id +')"><i class="nav-icon fa fa-times" aria-hidden="true"></i></button>  </div>'); 
      }else if(localStorage.nivelperfil == 1){
          arrActivosfijo.push('<div class="col text-center"> <button class="btn btn-success btn-sm" type="submit" onclick="verActivosfijo('+ element.id +')" data-toggle="modal" data-target="#exampleModalLong"><i class="nav-icon fas fa-search" aria-hidden="true"></i></button> &nbsp; <button class="btn btn-info btn-sm" type="submit" onclick="editarActivosfijo('+ element.id +')"><i class="nav-icon fa fa-pencil-alt" aria-hidden="true"></i></button> &nbsp; </div>'); 
      }else if(localStorage.nivelperfil == 0){
          arrActivosfijo.push('<div class="col text-center"> <button class="btn btn-success btn-sm" type="submit" onclick="verActivosfijo('+ element.id +')" data-toggle="modal" data-target="#exampleModalLong"><i class="nav-icon fas fa-search" aria-hidden="true"></i></button> &nbsp; </div>'); 
      }

      arrActivosfijos.push(arrActivosfijo);
  });

  return arrActivosfijos;
}


var generarDataTable = function( dataSet ) {

$("#example1").DataTable({
  data: dataSet,
  destroy: true,
  columns: [
          { title: "Codigo" },
          { title: "Nombre" },
          { title: "Grupo Activo" },
          { title: "Estado" },
          { title: "Ciudad" },
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

var url = 'empresas/'+ localStorage.empresa_id+'/activosfijos';

  $.ajax({
          method: "GET",
          url: url_back + url,
          headers: { 
              Authorization: 'Bearer ' + localStorage.access_token
          },
          dataType: 'json',
          success: function(respuesta) {
              generarDataTable(organizarDatos(respuesta));
          },
          error: function() {
              var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde o la tabla esta vacia';
              sweetMessage('error', mensaje);
          }
      }) 

}


var renderActivosfijo = function() {

var url ='activosfijos/add.html';
//   var load_content = function(url){
$('#main_content').load(url_front + url);
// }



}



function eliminarActivosfijo(id){//mensaje de desea borrar y eliminar

var url_eliminar = 'activosfijos/' + id;
var url_index = 'activosfijos/index.html';

if (confirm('¿Está seguro de Borrar?')){

            $.ajax({
          method: "DELETE",
          url: url_back + url_eliminar,
          headers: { 
                        Authorization: 'Bearer ' + localStorage.access_token
                    },
          dataType: "json",
          success: function(respuesta) {

              var mensaje = 'se borro exitosamente el Activosfijo de Nombre: ' + respuesta.data.nombre;
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

function editarActivosfijo(id){
var url_edit = 'activosfijos/edit.html';

    localStorage.setItem('editar', id);
    $('#main_content').load(url_front + url_edit);

}

function verActivosfijo(id){
  var url_show = 'activosfijos/show.html';

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

$("#crear").on("click",renderActivosfijo);

});
