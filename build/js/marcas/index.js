
var organizarDatos = function( data ) {
  var arrMarcas = [];
  // se recorre la respuesta y se genera un array de arrays.
  data.forEach(element => {
      arrMarca = [
          element.descripcion,
      ];

      if(localStorage.nivelperfil == 2){
        arrMarca.push('<div class="col text-center">  <button class="btn btn-success btn-sm" type="submit" onclick="verMarca('+ element.id +')" data-toggle="modal" data-target="#exampleModalLong"><i class="nav-icon fas fa-search" aria-hidden="true"></i></button> &nbsp; <button class="btn btn-info btn-sm" type="submit" onclick="editarMarca('+ element.id +')"><i class="nav-icon fa fa-pencil-alt" aria-hidden="true"></i></button> &nbsp;  <button class="btn btn-danger btn-sm" type="submit" onclick="eliminarMarca('+ element.id +')"><i class="nav-icon fa fa-times" aria-hidden="true"></i></button>  </div>'); 
      }else if(localStorage.nivelperfil == 1){
        arrMarca.push('<div class="col text-center">  <button class="btn btn-success btn-sm" type="submit" onclick="verMarca('+ element.id +')" data-toggle="modal" data-target="#exampleModalLong"><i class="nav-icon fas fa-search" aria-hidden="true"></i></button> &nbsp; <button class="btn btn-info btn-sm" type="submit" onclick="editarMarca('+ element.id +')"><i class="nav-icon fa fa-pencil-alt" aria-hidden="true"></i></button> </div>'); 
      }else if(localStorage.nivelperfil == 0){
        arrMarca.push('<div class="col text-center">  <button class="btn btn-success btn-sm" type="submit" onclick="verMarca('+ element.id +')" data-toggle="modal" data-target="#exampleModalLong"><i class="nav-icon fas fa-search" aria-hidden="true"></i></button> &nbsp;</div>'); 
      }

      arrMarcas.push(arrMarca);
  });

  return arrMarcas;
}


var generarDataTable = function( dataSet ) {

$("#example1").DataTable({
  data: dataSet,
  columns: [
          { title: "Descripcion" },
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

var url = 'marcas';

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


var renderMarca = function() {
var url ='marcas/add.html';

$('#mymodal').load('../'+ url,function(){
          $('#ModalLong3').modal({show:true});
      });
}



function eliminarMarca(id){//mensaje de desea borrar y eliminar

var url_eliminar = 'marcas/' + id;
var url_index = 'marcas/index.html';

if (confirm('¿Está seguro de Borrar?')){

            $.ajax({
          method: "DELETE",
          url: url_back + url_eliminar,
          headers: { 
                        Authorization: 'Bearer ' + localStorage.access_token
                    },
          dataType: "json",
          success: function(respuesta) {

              var mensaje = 'se borro exitosamente el Marca: ' + respuesta.data.descripcion;
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
}

function editarMarca(id){//render al editar
var url_edit = 'marcas/edit.html';

  $('#mymodal').html('');
    localStorage.setItem('editar', id);
    // localStorage.setItem('posicion', posicion);
    $('#mymodal').load('../' + url_edit ,function(){
          $('#ModalLong2').modal({show:true});
      });
}

function verMarca(id){
$('#mymodal').html('');
localStorage.setItem('ver', id);
$('#mymodal').load('../marcas/show.html',function(){
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

$("#crear").on("click",renderMarca);

});
