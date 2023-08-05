var organizarDatos = function( data ) {
    var arrNumeracionfacturaventas = [];
    data.forEach(element => {
        arrNumeracionfacturaventa = [
            element.numeroresolucion,
            element.prefijo,
            element.fecharesolucion,
            element.consecutivodesde,
            element.consecutivohasta,
        ];

        if(localStorage.nivelperfil == 2){
          arrNumeracionfacturaventa.push( element.habilitada ? '<div class="col text-center"> <a class="text-success" href="#" onclick="desactivar('+ element.id +')"><i class="fas fa-square"></i></a> &nbsp;</div>' : '<div class="col text-center"> <a class="text-danger" href="#" onclick="desactivar('+ element.id +')"><i class="fas fa-square"></i></a> &nbsp;</div>');
          arrNumeracionfacturaventa.push('<div class="col text-center">  <button class="btn btn-success btn-sm" type="submit" onclick="verNumeracionfacturaventa('+ element.id +')" data-toggle="modal" data-target="#exampleModalLong"><i class="nav-icon fas fa-search" aria-hidden="true"></i></button> &nbsp; <button class="btn btn-info btn-sm" type="submit" onclick="editarNumeracionfacturaventa('+ element.id +')"><i class="nav-icon fa fa-pencil-alt" aria-hidden="true"></i></button> &nbsp;  <button class="btn btn-danger btn-sm" type="submit" onclick="eliminarNumeracionfacturaventa('+ element.id +')"><i class="nav-icon fa fa-times" aria-hidden="true"></i></button>  </div>'); 
        }else if(localStorage.nivelperfil == 1){
          arrNumeracionfacturaventa.push( element.habilitada ? '<div class="col text-center"> <a class="text-success" href="#" onclick="desactivar('+ element.id +')"><i class="fas fa-square"></i></a> &nbsp;</div>' : '<div class="col text-center"> <a class="text-danger" href="#" onclick="desactivar('+ element.id +')"><i class="fas fa-square"></i></a> &nbsp;</div>');
          arrNumeracionfacturaventa.push('<div class="col text-center">  <button class="btn btn-success btn-sm" type="submit" onclick="verNumeracionfacturaventa('+ element.id +')" data-toggle="modal" data-target="#exampleModalLong"><i class="nav-icon fas fa-search" aria-hidden="true"></i></button> &nbsp; <button class="btn btn-info btn-sm" type="submit" onclick="editarNumeracionfacturaventa('+ element.id +')"><i class="nav-icon fa fa-pencil-alt" aria-hidden="true"></i></button> </div>'); 
        }else if(localStorage.nivelperfil == 0){
          arrNumeracionfacturaventa.push( element.habilitada ? '<div class="col text-center"> <a class="text-success" href="#"><i class="fas fa-square"></i></a> &nbsp;</div>' : '<div class="col text-center"> <a class="text-danger" href="#"><i class="fas fa-square"></i></a> &nbsp;</div>');
          arrNumeracionfacturaventa.push('<div class="col text-center">  <button class="btn btn-success btn-sm" type="submit" onclick="verNumeracionfacturaventa('+ element.id +')" data-toggle="modal" data-target="#exampleModalLong"><i class="nav-icon fas fa-search" aria-hidden="true"></i></button> &nbsp;</div>'); 
        }

        arrNumeracionfacturaventas.push(arrNumeracionfacturaventa);
    });

    return arrNumeracionfacturaventas;
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
var url = 'empresas/'+ localStorage.empresa_id +'/numeracionfacturaventas';

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
var url_index = 'numeracionfacturaventas/index.html';
var url = 'facturaventasestatus/'+id;

if (confirm('¿Está seguro que desea cambiar el estado este Numero Factura de venta?')){

  $.ajax({
          method: "GET",
          url: url_back + url,
          headers: { 
              Authorization: 'Bearer ' + localStorage.access_token
          },
          dataType: 'json',
          success: function(respuesta) {

            var mensaje = 'El Numero Factura de venta esta: ' + (respuesta.data.habilitada ? 'Activo': 'Desactivado') + ' Resolucion: '+ respuesta.data.numeroresolucion;
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


var renderNumeracionfacturaventa = function() {
var url ='numeracionfacturaventas/add.html';

  $('#mymodal').load('../'+ url,function(){
            $('#ModalLong3').modal({show:true});
        });
}



function eliminarNumeracionfacturaventa(id){//mensaje de desea borrar y eliminar
var url_eliminar = 'numeracionfacturaventas/' + id;
var url_index = 'numeracionfacturaventas/index.html';

  if (confirm('¿Está seguro de Borrar?')){

              $.ajax({
            method: "DELETE",
            url: url_back + url_eliminar,
            headers: { 
                          Authorization: 'Bearer ' + localStorage.access_token
                      },
            dataType: "json",
            success: function(respuesta) {

                var mensaje = 'se borro exitosamente el Numero Facturacion venta: ' + respuesta.data.numeroresolucion;
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

function editarNumeracionfacturaventa(id){
  var url_edit = 'numeracionfacturaventas/edit.html';

    $('#mymodal').html('');
      localStorage.setItem('editar', id);
      $('#mymodal').load('../' + url_edit ,function(){
            $('#ModalLong2').modal({show:true});
        });
}

function verNumeracionfacturaventa(id){
  $('#mymodal').html('');
  localStorage.setItem('ver', id);
  $('#mymodal').load('../numeracionfacturaventas/show.html',function(){
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

  $("#crear").on("click",renderNumeracionfacturaventa);

});

