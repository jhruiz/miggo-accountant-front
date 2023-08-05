var organizarDatos = function( data ) {
  var arrFormaspagos = [];
  data.forEach(element => {
      arrFormaspago = [
          element.codigo,
          element.descripcion,
          element.tipoformaspago.descripcion,
      ];

      if(localStorage.nivelperfil == 2){
        arrFormaspago.push('<div class="col text-center">  <button class="btn btn-success btn-sm" type="submit" onclick="verFormaspago('+ element.id +')" data-toggle="modal" data-target="#exampleModalLong"><i class="nav-icon fas fa-search" aria-hidden="true"></i></button> &nbsp; <button class="btn btn-info btn-sm" type="submit" onclick="editarFormaspago('+ element.id +')"><i class="nav-icon fa fa-pencil-alt" aria-hidden="true"></i></button> &nbsp;  <button class="btn btn-danger btn-sm" type="submit" onclick="eliminarFormaspago('+ element.id +')"><i class="nav-icon fa fa-times" aria-hidden="true"></i></button>  </div>'); 
      }else if(localStorage.nivelperfil == 1){
        arrFormaspago.push('<div class="col text-center">  <button class="btn btn-success btn-sm" type="submit" onclick="verFormaspago('+ element.id +')" data-toggle="modal" data-target="#exampleModalLong"><i class="nav-icon fas fa-search" aria-hidden="true"></i></button> &nbsp; <button class="btn btn-info btn-sm" type="submit" onclick="editarFormaspago('+ element.id +')"><i class="nav-icon fa fa-pencil-alt" aria-hidden="true"></i></button> </div>'); 
      }else if(localStorage.nivelperfil == 0){
        arrFormaspago.push('<div class="col text-center">  <button class="btn btn-success btn-sm" type="submit" onclick="verFormaspago('+ element.id +')" data-toggle="modal" data-target="#exampleModalLong"><i class="nav-icon fas fa-search" aria-hidden="true"></i></button> &nbsp;</div>'); 
      }

      arrFormaspagos.push(arrFormaspago);
  });

  return arrFormaspagos;
}


var generarDataTable = function( dataSet ) {

$("#example1").DataTable({
  data: dataSet,
  destroy: true,
  columns: [
          { title: "Codigo" },
          { title: "Descripcion" },
          { title: "Tipo Formas Pago" },
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
var url = 'empresas/'+localStorage.empresa_id+'/formaspagos';

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


var renderFormaspago = function() {
var url ='formaspagos/add.html';

$('#mymodal').load('../'+ url,function(){
          $('#ModalLong3').modal({show:true});
      });
}


function eliminarFormaspago(id){
var url_eliminar = 'formaspagos/' + id;
var url_index = 'formaspagos/index.html';

if (confirm('¿Está seguro de Borrar?')){

            $.ajax({
          method: "DELETE",
          url: url_back + url_eliminar,
          headers: { 
                        Authorization: 'Bearer ' + localStorage.access_token
                    },
          dataType: "json",
          success: function(respuesta) {

              var mensaje = 'se borro exitosamente el Formas Pagos: ' + respuesta.data.descripcion;
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

function editarFormaspago(id){
var url_edit = 'formaspagos/edit.html';

  $('#mymodal').html('');
    localStorage.setItem('editar', id);
    $('#mymodal').load('../' + url_edit ,function(){
          $('#ModalLong2').modal({show:true});
      });
}

function verFormaspago(id){
$('#mymodal').html('');
localStorage.setItem('ver', id);
$('#mymodal').load('../formaspagos/show.html',function(){
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

$("#crear").on("click",renderFormaspago);

});
