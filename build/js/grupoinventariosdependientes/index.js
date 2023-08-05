
function verificarNivelperfil(llamado){
  if(llamado == 'eliminar'){
       if(localStorage.nivelperfil < 2){
          var mensaje = 'no tiene el nivel para eliminar la Grupo Inventario';
          sweetMessage('info', mensaje);
          return false;
          } 
  }else if(llamado == 'editar'){
        if(localStorage.nivelperfil < 1){
          var mensaje = 'no tiene el nivel para editar la Grupo Inventario';
          sweetMessage('info', mensaje);
          return false;
          }
    }else if(llamado == 'crear'){
        if(localStorage.nivelperfil < 1){
          var mensaje = 'no tiene el nivel para crear la Grupo Inventario';
          sweetMessage('info', mensaje);
          return false;
          } 
    } 
}


function eliminarGrupoinventario(){
  var id = $('#id').val();
  var posicion = $('#posicion').val();
  var url_eliminar = 'grupoinventarios/'+id;
  var url_index = 'grupoinventarios/index.html';

  if(verificarNivelperfil('eliminar')  == false){
    return false;
  } 

if(id){
  if (confirm('¿Está seguro de Borrar?')){

              $.ajax({
            method: "DELETE",
            url: url_back + url_eliminar,
            headers: { 
                          Authorization: 'Bearer ' + localStorage.access_token
                      },
            dataType: "json",
            success: function(respuesta) {

                var mensaje = 'se borro exitosamente : ' + respuesta.data.descripcion;
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
}else{
        var mensaje = 'Se presentó un error. Por favor, seleccione un elemento.';
        sweetMessage('info', mensaje);
    }
}

function verGrupoinventario(){
  var id = $('#id').val();

  if(id){
    $('#mymodal').html('');
    localStorage.setItem('ver', id);
    $('#mymodal').load('../grupoinventarios/show.html',function(){
          $('#ModalLong').modal({show:true});
      });
    }else{
        var mensaje = 'Se presentó un error. Por favor, seleccione un elemento.';
        sweetMessage('info', mensaje);
    }
}

function editarGrupoinventario(){
  var id = $('#id').val();
  var posicion = $('#posicion').val();

    if(verificarNivelperfil('editar')  == false){
     return false;
    } 
          if(id){
              var url = 'grupoinventarios/'+id;

               $.ajax({
                  method: "GET",
                  url: url_back + url,    headers: { 
                      Authorization: 'Bearer ' + localStorage.access_token
                  },
                  dataType: "json",
                  success: function(respuesta) {

                    if(respuesta.data.empresa_id == localStorage.empresa_id){

                          $('#mymodal').html('');
                          localStorage.setItem('editar', id);
                          // localStorage.setItem('posicion', posicion);
                          $('#mymodal').load('../grupoinventarios/edit.html',function(){
                                $('#ModalLong2').modal({show:true});
                            });
                    }else{
                      var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde. verifique que alla creado esta Grupo Inventario';
                      sweetMessage('error', mensaje);
                    }

                  },
                  error: function() {
                      var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
                      sweetMessage('error', mensaje);
                  }
                })
          }else{
              var mensaje = 'Se presentó un error. Por favor, seleccione un elemento.';
              sweetMessage('info', mensaje);
          }
}

function crearGrupoinventario(){ 
  $('#mymodal').html('');
  var id = $('#id').val();
  var posicion = $('#posicion').val();

    if(verificarNivelperfil('crear')  == false){
       return false;
    } 

    if(posicion !='subgrupoinventario3'){
            localStorage.setItem('crear', id);
            $('#mymodal').load('../grupoinventarios/add.html',function(){
                      $('#ModalLong3').modal({show:true});
                  });
    }else{
          var mensaje = 'Se presentó un error. Por favor, Tome en cuenta que solo puede Crear Grupo Inventarios de los 4 niveles presentes';
          sweetMessage('info', mensaje);
      }
}

function obtenerGrupoinventario() { 
var url = 'grupoinventarios';

// alert('test');

  $.ajax({
      method: "GET",
      url: url_back + url,    headers: { 
          Authorization: 'Bearer ' + localStorage.access_token
      },
      dataType: "json",
      success: function(respuesta) {

          $('#select-grupoinventario').html(crearHtml(respuesta));
      },
      error: function() {
          var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
          sweetMessage('error', mensaje);
      }
    })     
  }
  
  var crearHtml = function(data) {
      var html = '';
          $.each(data, function (key, item) {
            if(localStorage.empresa_id == item.empresa_id){
              html += '<option value="'+ item.id+'">';
              html += item.codigo+'-'+item.descripcion;
              html += '</option>';
            }

          });
      return html;
  }

  //************************************************Lista Grupoinventarios*****************************************************

  var organizarDatos = function( data ) {  
    var arrGrupoinventarios = [];
    var arrGrupoinventario = [];
    var bool= 1;

    $.each(data, function(i, grupoinventario) { 
         bool = 1;
        $.each(grupoinventario.grupoinventarios, function(j, subgrupoinventario1) {
            bool = 1;
            $.each(subgrupoinventario1.grupoinventarios, function(k, subgrupoinventario2) {
                bool = 1;
                $.each(subgrupoinventario2.grupoinventarios, function(h, subgrupoinventario3) {

                      arrGrupoinventario.push(grupoinventario.codigo+'-'+grupoinventario.descripcion);
                      arrGrupoinventario.push(subgrupoinventario1.codigo+'-'+subgrupoinventario1.descripcion);
                      arrGrupoinventario.push(subgrupoinventario2.codigo+'-'+subgrupoinventario2.descripcion);
                      arrGrupoinventario.push(subgrupoinventario3.codigo+'-'+subgrupoinventario3.descripcion);

                      arrGrupoinventarios.push(arrGrupoinventario);
                      arrGrupoinventario = [];
                      bool = 0;
                });

                    if(bool == 1 && k >= 0){

                      arrGrupoinventario.push(grupoinventario.codigo+'-'+grupoinventario.descripcion);
                      arrGrupoinventario.push(subgrupoinventario1.codigo+'-'+subgrupoinventario1.descripcion);
                      arrGrupoinventario.push(subgrupoinventario2.codigo+'-'+subgrupoinventario2.descripcion);
                      arrGrupoinventario.push('');
                      arrGrupoinventarios.push(arrGrupoinventario);
                      arrGrupoinventario = [];
                      bool = 0;
                    }

            });

                if(bool == 1 && j >= 0){

                    arrGrupoinventario.push(grupoinventario.codigo+'-'+grupoinventario.descripcion);
                    arrGrupoinventario.push(subgrupoinventario1.codigo+'-'+subgrupoinventario1.descripcion);
                    arrGrupoinventario.push('');
                    arrGrupoinventario.push('');
                    arrGrupoinventarios.push(arrGrupoinventario);
                    arrGrupoinventario = [];
                    bool = 0;
                }

          });

                if(bool == 1 && i >= 0){

                    arrGrupoinventario.push(grupoinventario.codigo+'-'+grupoinventario.descripcion);
                    arrGrupoinventario.push('');
                    arrGrupoinventario.push('');
                    arrGrupoinventario.push('');
                    arrGrupoinventarios.push(arrGrupoinventario);
                    arrGrupoinventario = [];
                    bool = 0;
                    }

      });

    return arrGrupoinventarios;
}


var generarDataTable = function( dataSet ) {

  $("#example1").DataTable({
    data: dataSet,
    columns: [
            { title: "Grupo Inventario" },
            { title: "Sub-Grupo inventario 1" },
            { title: "Sub-Grupo inventario 2" },
            { title: "Sub-Grupo inventario 3" },
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

var url = 'empresas/'+localStorage.empresa_id+'/grupoinventarios';

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

//*********************************************select Grupoinventario, subgrupoinventario1, cuenta, subcuenta, auxiliares**********************

var recargarGrupoinventario = function(){ 
  var grupoinventario_id = $(this).val();
  var url_d ='grupoinventariosdependientes/'+grupoinventario_id;
  if(grupoinventario_id){
      $.ajax({
          type:"GET",
          url: url_back + url_d,
          headers: { 
                Authorization: 'Bearer ' + localStorage.access_token
          },
          dataType: "json",
          success:function(respuesta){

              $('#id').val(grupoinventario_id);
              $('#posicion').val('grupoinventario');
              if(respuesta.length != 0){
                  $('#select-subgrupoinventario3').html('');
                  $('#select-subgrupoinventario2').html('');
                  $('#select-subgrupoinventario1').html(crearHtml(respuesta));
              }else{
                  $('#select-subgrupoinventario3').html('');
                  $('#select-subgrupoinventario2').html('');
                  $('#select-subgrupoinventario1').html('');
              }
          }
      }); 
  }else if($(this).val() == ''){
             $('#select-subgrupoinventario3').html('');
             $('#select-subgrupoinventario2').html('');
             $('#select-subgrupoinventario1').html('');
  }
}



var recargarSubgrupoinventario1 = function(){ 
  var grupoinventario_id = $(this).val();
  var url_d ='grupoinventariosdependientes/'+grupoinventario_id;

  if(grupoinventario_id){
      $.ajax({
          type:"GET",
          url: url_back + url_d,
          headers: { 
                Authorization: 'Bearer ' + localStorage.access_token
          },
          dataType: "json",
          success:function(respuesta){

            $('#id').val(grupoinventario_id);
            $('#posicion').val('subgrupoinventario1');
            if(respuesta.length != 0){
                  $('#select-subgrupoinventario3').html('');
                  $('#select-subgrupoinventario2').html(crearHtml(respuesta));
              }else{
                  $('#select-subgrupoinventario3').html('');
                  $('#select-subgrupoinventario2').html('');
              }
          }
      }); 
  }else if($(this).val() == ''){
    $('#select-subgrupoinventario3').html('');
    $('#select-subgrupoinventario2').html('');
  }
};


var recargarSubgrupoinventario2 = function(){ 
  var grupoinventario_id = $(this).val();
  var url_d ='grupoinventariosdependientes/'+grupoinventario_id;
  if(grupoinventario_id){
      $.ajax({
          type:"GET",
          url: url_back + url_d,
          headers: { 
                Authorization: 'Bearer ' + localStorage.access_token
          },
          dataType: "json",
          success:function(respuesta){

              $('#id').val(grupoinventario_id);
              $('#posicion').val('subgrupoinventario2');
              if(respuesta.length != 0){
                  $('#select-subgrupoinventario3').html(crearHtml(respuesta));
              }else{
                $('#select-subgrupoinventario3').html('');
              }
          }
      }); 
  }else if($(this).val() == ''){
      $('#select-subgrupoinventario3').html('');
  }
};


var recargarSubgrupoinventario3 = function(){ 
  var grupoinventario_id = $(this).val();
  if(grupoinventario_id){
    $('#id').val(grupoinventario_id);
    $('#posicion').val('subgrupoinventario3');
  }
};


  //*************************************************************************************************************************

$( document ).ready(function() {
  $('.preloader').hide("slow");
  validarLogin();

  obtenerGrupoinventario(); 
  infoTable();


  $("#select-grupoinventario").on("click",recargarGrupoinventario);
  $("#select-subgrupoinventario1").on("click",recargarSubgrupoinventario1);
  $("#select-subgrupoinventario2").on("click",recargarSubgrupoinventario2);
  $("#select-subgrupoinventario3").on("click",recargarSubgrupoinventario3);


});
