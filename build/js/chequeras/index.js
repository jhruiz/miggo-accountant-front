
var organizarDatos = function( data ) {
  var arrChequeras = [];
  data.forEach(element => {
      arrChequera = [
          element.cuentabancaria.entidadfinanciera,
          element.cuentabancaria.numerocuenta,
          element.prefijo,
          element.numeroinicial,
          element.numerofinal,
      ];

      if(localStorage.nivelperfil == 2){
        arrChequera.push( element.estatus ? '<div class="col text-center"> <a class="text-success" href="#" onclick="desactivar('+ element.id +')"><i class="fas fa-square"></i></a>' : '<div class="col text-center"> <a class="text-danger" href="#" onclick="desactivar('+ element.id +')"><i class="fas fa-square"></i></a>');
        arrChequera.push('<div class="col text-center">  <button class="btn btn-success btn-sm" type="submit" onclick="verChequera('+ element.id +')" data-toggle="modal" data-target="#exampleModalLong"><i class="nav-icon fas fa-search" aria-hidden="true"></i></button> &nbsp; <button class="btn btn-info btn-sm" type="submit" onclick="editarChequera('+ element.id +')"><i class="nav-icon fa fa-pencil-alt" aria-hidden="true"></i></button> &nbsp;  <button class="btn btn-danger btn-sm" type="submit" onclick="eliminarChequera('+ element.id +')"><i class="nav-icon fa fa-times" aria-hidden="true"></i></button>  </div>'); 
      }else if(localStorage.nivelperfil == 1){
        arrChequera.push( element.estatus ? '<div class="col text-center"> <a class="text-success" href="#" onclick="desactivar('+ element.id +')"><i class="fas fa-square"></i></a>' : '<div class="col text-center"> <a class="text-danger" href="#" onclick="desactivar('+ element.id +')"><i class="fas fa-square"></i></a>');
        arrChequera.push('<div class="col text-center">  <button class="btn btn-success btn-sm" type="submit" onclick="verChequera('+ element.id +')" data-toggle="modal" data-target="#exampleModalLong"><i class="nav-icon fas fa-search" aria-hidden="true"></i></button> &nbsp; <button class="btn btn-info btn-sm" type="submit" onclick="editarChequera('+ element.id +')"><i class="nav-icon fa fa-pencil-alt" aria-hidden="true"></i></button> </div>'); 
      }else if(localStorage.nivelperfil == 0){
        arrChequera.push( element.estatus ? '<div class="col text-center"> <a class="text-success" href="#"><i class="fas fa-square"></i></a>' : '<div class="col text-center"> <a class="text-danger" href="#"><i class="fas fa-square"></i></a>');
        arrChequera.push('<div class="col text-center">  <button class="btn btn-success btn-sm" type="submit" onclick="verChequera('+ element.id +')" data-toggle="modal" data-target="#exampleModalLong"><i class="nav-icon fas fa-search" aria-hidden="true"></i></button> &nbsp;</div>'); 
      }

      arrChequeras.push(arrChequera);
  });

  return arrChequeras;
}


var generarDataTable = function( dataSet ) {

$("#example1").DataTable({
  data: dataSet,
  destroy: true,
  columns: [
          { title: "Entidad Bancaria" },
          { title: "Numero de Cuenta" },
          { title: "Prefijo" },
          { title: "Numero Inicial" },
          { title: "Numero Final" },
          { title: "Estatus" },
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
var url = 'empresas/'+localStorage.empresa_id+'/chequeras';

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

function desactivar(id){
var url = 'estatuschequeras/'+id;

if (confirm('¿Está seguro que desea desactivar este Chequera?')){

$.ajax({
        method: "GET",
        url: url_back + url,
        headers: { 
            Authorization: 'Bearer ' + localStorage.access_token
        },
        dataType: 'json',
        success: function(respuesta) {

          var mensaje = 'la Chequera esta: ' + (respuesta.data.estatus ? 'Activo': 'Desactivado');
            sweetMessage( respuesta.data.estatus ? 'success' : 'error', mensaje);
            infoTable();
        },
        error: function() {
            var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde o la tabla esta vacia';
            sweetMessage('error', mensaje);
        }
    }) 
}
}

var renderChequera = function() {
var url ='chequeras/add.html';

$('#mymodal').load('../'+ url,function(){
          $('#ModalLong3').modal({show:true});
      });
}



function eliminarChequera(id){
var url_eliminar = 'chequeras/' + id;
var url_index = 'chequeras/index.html';

if (confirm('¿Está seguro de Borrar?')){

            $.ajax({
          method: "DELETE",
          url: url_back + url_eliminar,
          headers: { 
                        Authorization: 'Bearer ' + localStorage.access_token
                    },
          dataType: "json",
          success: function(respuesta) {

              var mensaje = 'se borro exitosamente la Chequera: ';
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

function editarChequera(id){
var url_edit = 'chequeras/edit.html';

  $('#mymodal').html('');
    localStorage.setItem('editar', id);
    $('#mymodal').load('../' + url_edit ,function(){
          $('#ModalLong2').modal({show:true});
      });
}

function verChequera(id){
$('#mymodal').html('');
localStorage.setItem('ver', id);
$('#mymodal').load('../chequeras/show.html',function(){
      $('#exampleModalLong').modal({show:true});
  });
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

$("#crear").on("click",renderChequera);

});

