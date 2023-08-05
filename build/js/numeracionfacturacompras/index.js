
var organizarDatos = function( data ) {
    var arrNumeracionfacturacompras = [];
    data.forEach(element => {
        arrNumeracionfacturacompra = [
            element.numeroresolucion,
            element.prefijo,
            element.fecharesolucion,
            element.consecutivodesde,
            element.consecutivohasta,
        ];

        if(localStorage.nivelperfil == 2){
          arrNumeracionfacturacompra.push( element.habilitada ? '<div class="col text-center"> <a class="text-success" href="#" onclick="desactivar('+ element.id +')"><i class="fas fa-square"></i></a> &nbsp;</div>' : '<div class="col text-center"> <a class="text-danger" href="#" onclick="desactivar('+ element.id +')"><i class="fas fa-square"></i></a> &nbsp;</div>');
          arrNumeracionfacturacompra.push('<div class="col text-center">  <button class="btn btn-success btn-sm" type="submit" onclick="verNumeracionfacturacompra('+ element.id +')" data-toggle="modal" data-target="#exampleModalLong"><i class="nav-icon fas fa-search" aria-hidden="true"></i></button> &nbsp; <button class="btn btn-info btn-sm" type="submit" onclick="editarNumeracionfacturacompra('+ element.id +')"><i class="nav-icon fa fa-pencil-alt" aria-hidden="true"></i></button> &nbsp;  <button class="btn btn-danger btn-sm" type="submit" onclick="eliminarNumeracionfacturacompra('+ element.id +')"><i class="nav-icon fa fa-times" aria-hidden="true"></i></button>  </div>'); 
        }else if(localStorage.nivelperfil == 1){
          arrNumeracionfacturacompra.push( element.habilitada ? '<div class="col text-center"> <a class="text-success" href="#" onclick="desactivar('+ element.id +')"><i class="fas fa-square"></i></a> &nbsp;</div>' : '<div class="col text-center"> <a class="text-danger" href="#" onclick="desactivar('+ element.id +')"><i class="fas fa-square"></i></a> &nbsp;</div>');
          arrNumeracionfacturacompra.push('<div class="col text-center">  <button class="btn btn-success btn-sm" type="submit" onclick="verNumeracionfacturacompra('+ element.id +')" data-toggle="modal" data-target="#exampleModalLong"><i class="nav-icon fas fa-search" aria-hidden="true"></i></button> &nbsp; <button class="btn btn-info btn-sm" type="submit" onclick="editarNumeracionfacturacompra('+ element.id +')"><i class="nav-icon fa fa-pencil-alt" aria-hidden="true"></i></button> </div>'); 
        }else if(localStorage.nivelperfil == 0){
          arrNumeracionfacturacompra.push( element.habilitada ? '<div class="col text-center"> <a class="text-success" href="#"><i class="fas fa-square"></i></a> &nbsp;</div>' : '<div class="col text-center"> <a class="text-danger" href="#"><i class="fas fa-square"></i></a> &nbsp;</div>');
          arrNumeracionfacturacompra.push('<div class="col text-center">  <button class="btn btn-success btn-sm" type="submit" onclick="verNumeracionfacturacompra('+ element.id +')" data-toggle="modal" data-target="#exampleModalLong"><i class="nav-icon fas fa-search" aria-hidden="true"></i></button> &nbsp;</div>'); 
        }

        arrNumeracionfacturacompras.push(arrNumeracionfacturacompra);
    });

    return arrNumeracionfacturacompras;
}


var generarDataTable = function( dataSet ) {

  $("#example1").DataTable({
    data: dataSet,
    destroy: true,
    columns: [
            { title: "Numero Resolución" },
            { title: "Prefijo" },
            { title: "Fecha Resolución" },
            { title: "Consecutivo Desde" },
            { title: "Consecutivo Hasta" },
            { title: "habilitada" },
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

var url = 'empresas/'+ localStorage.empresa_id +'/numeracionfacturacompras';

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



function desactivar(id){

var url_index = 'numeracionfacturacompras/index.html';
var url = 'facturacomprasestatus/'+id;

if (confirm('¿Está seguro que desea cambiar el estado este Numero Factura de Compra?')){

  $.ajax({
          method: "GET",
          url: url_back + url,
          headers: { 
              Authorization: 'Bearer ' + localStorage.access_token
          },
          dataType: 'json',
          success: function(respuesta) {

            var mensaje = 'El Numero Factura de Compra esta: ' + (respuesta.data.habilitada ? 'Activo': 'Desactivado') + ' Resolucion: '+ respuesta.data.numeroresolucion;
              sweetMessage( respuesta.data.habilitada ? 'success' : 'error', mensaje);
             infoTable();
          },
          error: function() {
              var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde o la tabla esta vacia';
              sweetMessage('error', mensaje);
          }
      }) 
}
}


var renderNumeracionfacturacompra = function() {
var url ='numeracionfacturacompras/add.html';

  $('#mymodal').load('../'+ url,function(){
            $('#ModalLong3').modal({show:true});
        });
}



function eliminarNumeracionfacturacompra(id){//mensaje de desea borrar y eliminar

var url_eliminar = 'numeracionfacturacompras/' + id;
var url_index = 'numeracionfacturacompras/index.html';

  if (confirm('¿Está seguro de Borrar?')){

              $.ajax({
            method: "DELETE",
            url: url_back + url_eliminar,
            headers: { 
                          Authorization: 'Bearer ' + localStorage.access_token
                      },
            dataType: "json",
            success: function(respuesta) {

                var mensaje = 'se borro exitosamente el Numero Facturacion Compra: ' + respuesta.data.numeroresolucion;
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

function editarNumeracionfacturacompra(id){//render al editar
  var url_edit = 'numeracionfacturacompras/edit.html';

    $('#mymodal').html('');
      localStorage.setItem('editar', id);
      // localStorage.setItem('posicion', posicion);
      $('#mymodal').load('../' + url_edit ,function(){
            $('#ModalLong2').modal({show:true});
        });
}

function verNumeracionfacturacompra(id){
  $('#mymodal').html('');
  localStorage.setItem('ver', id);
  $('#mymodal').load('../numeracionfacturacompras/show.html',function(){
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

  $("#crear").on("click",renderNumeracionfacturacompra);

});
