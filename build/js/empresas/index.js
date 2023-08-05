var organizarDatos = function( data ) {  
    var arrEmpresas = [];
    data.forEach(element => {
        arrEmpresa = [
            element.nombre,
            element.razonsocial,
            element.nit,
            element.telefono1,
            element.telefono2,
        ];

        if(localStorage.nivelperfil == 2){
            arrEmpresa.push('<div class="col text-center"> <button class="btn btn-success btn-sm" type="submit" onclick="verEmpresa('+ element.id +')" data-toggle="modal" data-target="#exampleModalLong"><i class="nav-icon fas fa-search" aria-hidden="true"></i></button> &nbsp; <button class="btn btn-info btn-sm" type="submit" onclick="editarEmpresa('+ element.id +')"><i class="nav-icon fa fa-pencil-alt" aria-hidden="true"></i></button> &nbsp;  <button class="btn btn-danger btn-sm" type="submit" onclick="eliminarEmpresa('+ element.id +')"><i class="nav-icon fa fa-times" aria-hidden="true"></i></button>  </div>'); 
        }else if(localStorage.nivelperfil == 1){
            arrEmpresa.push('<div class="col text-center"> <button class="btn btn-success btn-sm" type="submit" onclick="verEmpresa('+ element.id +')" data-toggle="modal" data-target="#exampleModalLong"><i class="nav-icon fas fa-search" aria-hidden="true"></i></button> &nbsp; <button class="btn btn-info btn-sm" type="submit" onclick="editarEmpresa('+ element.id +')"><i class="nav-icon fa fa-pencil-alt" aria-hidden="true"></i></button> &nbsp;  </div>'); 
        }else if(localStorage.nivelperfil == 0){
            arrEmpresa.push('<div class="col text-center"> <button class="btn btn-success btn-sm" type="submit" onclick="verEmpresa('+ element.id +')" data-toggle="modal" data-target="#exampleModalLong"><i class="nav-icon fas fa-search" aria-hidden="true"></i></button> &nbsp;  </div>'); 
        }

        arrEmpresas.push(arrEmpresa);
    });

    return arrEmpresas;
}


var generarDataTable = function( dataSet ) {

  $("#example1").DataTable({
    data: dataSet,
    columns: [
            { title: "Nombre" },
            { title: "Razon Social" },
            { title: "NIT" },
            { title: "Contacto 1" },
            { title: "Contacto 2" },
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
var url = 'sucursales/'+ localStorage.empresa_id;

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


var renderEmpresa = function() {
var url ='empresas/add.html';
  $('#main_content').load(url_front + url);
}


function eliminarEmpresa(id){
var url_eliminar = 'empresas/' + id;
var url_index = 'empresas/index.html';

  if (confirm('¿Está seguro de Borrar?')){

              $.ajax({
            method: "DELETE",
            url: url_back + url_eliminar,
            headers: { 
                          Authorization: 'Bearer ' + localStorage.access_token
                      },
            dataType: "json",
            success: function(respuesta) {

                var mensaje = 'se borro exitosamente la Sucursal : ' + respuesta.data.nombre;
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

function editarEmpresa(id){
  var url_edit = 'empresas/edit.html';
  localStorage.setItem('editar', id);
  $('#main_content').load(url_front + url_edit);
}

function verEmpresa(id){
    var url_ver = 'empresas/show.html';
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

  var saludo = 'Hola '+ localStorage.nombres;
  $('#saludos').text(saludo);

  $("#crear").on("click",renderEmpresa);
});
