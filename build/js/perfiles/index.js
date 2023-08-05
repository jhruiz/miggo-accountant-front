var organizarDatos = function( data ) {  
    var arrPerfiles = [];
    var arrayNivel = ['Ver (Nivel 0)', 'Crear y Editar (Nivel 1)', 'Eliminar (Nivel 2)'];
    data.forEach(element => {
        arrPerfile = [
            element.descripcion,
            arrayNivel[element.nivel],
        ];

        if(localStorage.nivelperfil == 2){
            arrPerfile.push('<div class="col text-center">  <button class="btn btn-success btn-sm" type="submit" onclick="verPerfile('+ element.id +')" data-toggle="modal" data-target="#exampleModalLong"><i class="nav-icon fas fa-search" aria-hidden="true"></i></button> &nbsp; <button class="btn btn-info btn-sm" type="submit" onclick="editarPerfile('+ element.id +')"><i class="nav-icon fa fa-pencil-alt" aria-hidden="true"></i></button> &nbsp;  <button class="btn btn-danger btn-sm" type="submit" onclick="eliminarPerfile('+ element.id +')"><i class="nav-icon fa fa-times" aria-hidden="true"></i></button>  </div>'); 
        }else if(localStorage.nivelperfil == 1){
            arrPerfile.push('<div class="col text-center">  <button class="btn btn-success btn-sm" type="submit" onclick="verPerfile('+ element.id +')" data-toggle="modal" data-target="#exampleModalLong"><i class="nav-icon fas fa-search" aria-hidden="true"></i></button> &nbsp; <button class="btn btn-info btn-sm" type="submit" onclick="editarPerfile('+ element.id +')"><i class="nav-icon fa fa-pencil-alt" aria-hidden="true"></i></button> </div>'); 
        }else if(localStorage.nivelperfil == 0){
            arrPerfile.push('<div class="col text-center">  <button class="btn btn-success btn-sm" type="submit" onclick="verPerfile('+ element.id +')" data-toggle="modal" data-target="#exampleModalLong"><i class="nav-icon fas fa-search" aria-hidden="true"></i></button> </div>'); 
        }

        arrPerfiles.push(arrPerfile);
    });

    return arrPerfiles;
}

var generarDataTable = function( dataSet ) {
  $("#example1").DataTable({
    data: dataSet,
    destroy: true,
    columns: [
            { title: "Descripcion" },
            { title: "Nivel" },
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
var url = 'perfiles';

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

var renderPerfile = function() {
var url = 'perfiles/add.html';
  
  $('#mymodal').html('');
  $('#mymodal').load('../' + url,function(){
            $('#ModalLong3').modal({show:true});
        });
}

function eliminarPerfile(id){//mensaje de desea borrar y eliminar
var url_eliminar = 'perfiles/' + id;
var url_index = 'perfiles/index.html';

  if (confirm('¿Está seguro de Borrar?')){

              $.ajax({
            method: "DELETE",
            url: url_back + url_eliminar,
            headers: { 
                          Authorization: 'Bearer ' + localStorage.access_token
                      },
            dataType: "json",
            success: function(respuesta) {

                var mensaje = 'se borro exitosamente el Perfiles: ' + respuesta.data.descripcion;
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

function editarPerfile(id){//render al editar
  var url_edit = 'perfiles/edit.html';

    $('#mymodal').html('');
      localStorage.setItem('editar', id);
      $('#mymodal').load('../'+ url_edit,function(){
            $('#ModalLong2').modal({show:true});
        });
}

function verPerfile(id){
    var url_show = 'perfiles/show.html';

    $('#mymodal').html('');
    localStorage.setItem('ver', id);
    $('#mymodal').load('../'+url_show,function(){
          $('#ModalLong').modal({show:true});
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
  // nivelPerfil(); //TODO: no dejar crear perfiles
  infoTable(); 

  var saludo = 'Hola '+ localStorage.nombres;
  $('#saludos').text(saludo);

  $("#crear").on("click",renderPerfile);

});