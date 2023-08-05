var organizarDatos = function( data ) {  
    var arrUsuarios = [];

    data.forEach(element => {
        arrUsuario = [
            element.email,
            element.perfile.descripcion,
            element.tercero_id ? element.tercero.nombres : '',
            element.tercero_id ? element.tercero.apellidos : '',
            element.tercero_id ? element.tercero.identificacion : '',
        ];

        if(localStorage.nivelperfil == 2){
            arrUsuario.push( element.estatus ? '<div class="col text-center"> <a class="text-success" href="#" onclick="desactivar('+ element.id +')"><i class="fas fa-square"></i></a>' : '<div class="col text-center"> <a class="text-danger" href="#" onclick="desactivar('+ element.id +')"><i class="fas fa-square"></i></a>');
            arrUsuario.push('<div class="col text-center"> <button class="btn btn-success btn-sm" type="submit" onclick="verUsuario('+ element.id +')" data-toggle="modal" data-target="#exampleModalLong"><i class="nav-icon fas fa-search" aria-hidden="true"></i></button> &nbsp; <button class="btn btn-info btn-sm" type="submit" onclick="editarUsuario('+ element.id +')"><i class="nav-icon fa fa-pencil-alt" aria-hidden="true"></i></button> &nbsp;  <button class="btn btn-danger btn-sm" type="submit" onclick="eliminarUsuario('+ element.id +')"><i class="nav-icon fa fa-times" aria-hidden="true"></i></button>  </div>'); 
        }else if(localStorage.nivelperfil == 1){
            arrUsuario.push( element.estatus ? '<div class="col text-center"> <a class="text-success" href="#" onclick="desactivar('+ element.id +')"><i class="fas fa-square"></i></a>' : '<div class="col text-center"> <a class="text-danger" href="#" onclick="desactivar('+ element.id +')"><i class="fas fa-square"></i></a>');
            arrUsuario.push('<div class="col text-center"> <button class="btn btn-success btn-sm" type="submit" onclick="verUsuario('+ element.id +')" data-toggle="modal" data-target="#exampleModalLong"><i class="nav-icon fas fa-search" aria-hidden="true"></i></button> &nbsp; <button class="btn btn-info btn-sm" type="submit" onclick="editarUsuario('+ element.id +')"><i class="nav-icon fa fa-pencil-alt" aria-hidden="true"></i></button> &nbsp; </div>'); 
        }else if(localStorage.nivelperfil == 0){
            arrUsuario.push( element.estatus ? '<div class="col text-center"> <a class="text-success" href="#"><i class="fas fa-square"></i></a>' : '<div class="col text-center"> <a class="text-danger" href="#"><i class="fas fa-square"></i></a>');
            arrUsuario.push('<div class="col text-center"> <button class="btn btn-success btn-sm" type="submit" onclick="verUsuario('+ element.id +')" data-toggle="modal" data-target="#exampleModalLong"><i class="nav-icon fas fa-search" aria-hidden="true"></i></button> &nbsp; </div>'); 
        }

        arrUsuarios.push(arrUsuario);
    });

    return arrUsuarios;
}



function desactivar(id){

  var url_index = 'usuarios/index.html';
  var url = 'estatus/'+id;

  if (confirm('¿Está seguro que desea desactivar este Usuario?')){

    $.ajax({
            method: "GET",
            url: url_back + url,
            headers: { 
                Authorization: 'Bearer ' + localStorage.access_token
            },
            dataType: 'json',
            success: function(respuesta) {

              var mensaje = 'El usuario esta: ' + (respuesta.data.estatus ? 'Activo': 'Desactivado');
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



var generarDataTable = function( dataSet ) {

  $("#example1").DataTable({
    data: dataSet,
    destroy: true,
    columns: [
            { title: "Email" },
            { title: "Perfil" },
            { title: "Nombres" },
            { title: "Apellidos" },
            { title: "Identificación" },
            { title: "Estatus" },
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
var url = 'empresas/'+ localStorage.empresa_id+'/users';

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


var renderUsuario = function() {

var url ='usuarios/add.html';
//   var load_content = function(url){
  $('#main_content').load(url_front + url);
// }

}



function eliminarUsuario(id){//mensaje de desea borrar y eliminar

var url_eliminar = 'users/' + id;
var url_index = 'usuarios/index.html';

  if (confirm('¿Está seguro de Borrar?')){

          $.ajax({
                  method: "DELETE",
                  url: url_back + url_eliminar,
                  headers: { 
                                Authorization: 'Bearer ' + localStorage.access_token
                            },
                  dataType: "json",
                  success: function(respuesta) {

                      var mensaje = 'se borro exitosamente el usuario de email: ' + respuesta.data.email;
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

function editarUsuario(id){//render al editar

  var url_edit = 'usuarios/edit.html';

  $('#main_content').load(url_front + url_edit);
    localStorage.setItem('editar', id);
}

function verUsuario(id){

  $('#mymodal').html('');

  $('#mymodal').load('../usuarios/show.html',function(){
        $('#exampleModalLong').modal({show:true});
    });
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

  $("#crear").on("click",renderUsuario);

});
