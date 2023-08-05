var organizarDatos = function( data ) {
    var arrListadescuentos = [];
    data.forEach(element => {
        arrListadescuento = [
            element.descripcion,
            element.porcentaje * 100,
            element.inicio,
            element.fin,
        ];

        if(localStorage.nivelperfil == 2){
          arrListadescuento.push('<div class="col text-center">  <button class="btn btn-success btn-sm" type="submit" onclick="verListadescuento('+ element.id +')" data-toggle="modal" data-target="#exampleModalLong"><i class="nav-icon fas fa-search" aria-hidden="true"></i></button> &nbsp; <button class="btn btn-info btn-sm" type="submit" onclick="editarListadescuento('+ element.id +')"><i class="nav-icon fa fa-pencil-alt" aria-hidden="true"></i></button> &nbsp;  <button class="btn btn-danger btn-sm" type="submit" onclick="eliminarListadescuento('+ element.id +')"><i class="nav-icon fa fa-times" aria-hidden="true"></i></button>  </div>'); 
        }else if(localStorage.nivelperfil == 1){
          arrListadescuento.push('<div class="col text-center">  <button class="btn btn-success btn-sm" type="submit" onclick="verListadescuento('+ element.id +')" data-toggle="modal" data-target="#exampleModalLong"><i class="nav-icon fas fa-search" aria-hidden="true"></i></button> &nbsp; <button class="btn btn-info btn-sm" type="submit" onclick="editarListadescuento('+ element.id +')"><i class="nav-icon fa fa-pencil-alt" aria-hidden="true"></i></button> </div>'); 
        }else if(localStorage.nivelperfil == 0){
          arrListadescuento.push('<div class="col text-center">  <button class="btn btn-success btn-sm" type="submit" onclick="verListadescuento('+ element.id +')" data-toggle="modal" data-target="#exampleModalLong"><i class="nav-icon fas fa-search" aria-hidden="true"></i></button> &nbsp;</div>'); 
        }
        arrListadescuentos.push(arrListadescuento);
    });

    return arrListadescuentos;
}


var generarDataTable = function( dataSet ) {
  $("#example1").DataTable({
    data: dataSet,
    destroy: true,
    columns: [
            { title: "Descuento" },
            { title: "Porcentaje %" },
            { title: "Inicio" },
            { title: "Fin" },
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
var url = 'empresas/'+localStorage.empresa_id+'/listadescuentos';

    $.ajax({
            method: "GET",
            url: url_back + url,
            headers: { 
                Authorization: 'Bearer ' + localStorage.access_token
            },
            dataType: 'json',
            success: function(respuesta) {
              console.log(respuesta);
                generarDataTable(organizarDatos(respuesta.data));
            },
            error: function() {
                var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde o la tabla esta vacia';
                sweetMessage('error', mensaje);
            }
        }) 

}


var renderListadescuento = function() {
var url ='listadescuentos/add.html';

  $('#mymodal').load('../'+ url,function(){
            $('#ModalLong3').modal({show:true});
        });
}



function eliminarListadescuento(id){
var url_eliminar = 'listadescuentos/' + id;
var url_index = 'listadescuentos/index.html';

  if (confirm('¿Está seguro de Borrar?')){

              $.ajax({
            method: "DELETE",
            url: url_back + url_eliminar,
            headers: { 
                          Authorization: 'Bearer ' + localStorage.access_token
                      },
            dataType: "json",
            success: function(respuesta) {

                var mensaje = 'se borro exitosamente el listadescuentos: ' + respuesta.data.descripcion;
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

function editarListadescuento(id){
  var url_edit = 'listadescuentos/edit.html';

    $('#mymodal').html('');
      localStorage.setItem('editar', id);
      $('#mymodal').load('../' + url_edit ,function(){
            $('#ModalLong2').modal({show:true});
        });
}

function verListadescuento(id){
  $('#mymodal').html('');
  localStorage.setItem('ver', id);
  $('#mymodal').load('../listadescuentos/show.html',function(){
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

  $("#crear").on("click",renderListadescuento);

});