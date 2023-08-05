

function verNiif(){
  var id = $('#id').val();

  if(id){
    $('#mymodal').html('');
    localStorage.setItem('ver', id);
    $('#mymodal').load('../niifs/show.html',function(){
          $('#ModalLong').modal({show:true});
      });
    }else{
        var mensaje = 'Se presentó un error. Por favor, seleccione un elemento.';
        sweetMessage('error', mensaje);
    }
}

function obtenerNiifs() {
var url = 'clasesniifs';

  $.ajax({
      method: "GET",
      url: url_back + url,   
      headers: { 
          Authorization: 'Bearer ' + localStorage.access_token
      },
      dataType: "json",
      success: function(respuesta) {
          $('#select-clases').html(crearHtml(respuesta));
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
            if(localStorage.empresa_id == item.empresa_id || item.empresa_id == null){
              html += '<option value="'+ item.id+'">';
              html += item.codigo+'-'+item.descripcion;
              html += '</option>';
            }

          });
      return html;
  }

  //************************************************Lista Niifs*****************************************************

  var organizarDatos = function( data ) {  
    var arrNiifs = [];
    var arrNiif = [];
    var bool= 1;

    $.each(data, function(i, clases) { 
         bool = 1;
        $.each(clases.niifs, function(j, grupos) {
            bool = 1;
            $.each(grupos.niifs, function(k, cuentas) {
                bool = 1;
                $.each(cuentas.niifs, function(h, subcuentas) {
                     bool = 1;
                     $.each(subcuentas.niifs, function(L, auxiliares) {               

                      arrNiif.push(clases.codigo+'-'+clases.descripcion);
                      arrNiif.push(grupos.codigo+'-'+grupos.descripcion);
                      arrNiif.push(cuentas.codigo+'-'+cuentas.descripcion);
                      arrNiif.push(subcuentas.codigo+'-'+subcuentas.descripcion);

                      if(auxiliares.empresa_id != null){
                        arrNiif.push(auxiliares.codigo+'-'+auxiliares.descripcion+' (#)');
                      }else{
                        arrNiif.push(auxiliares.codigo+'-'+auxiliares.descripcion);
                      }

                      arrNiifs.push(arrNiif);
                      arrNiif = [];
                      bool = 0;

                       });

                    if(bool == 1 && h >= 0){

                      arrNiif.push(clases.codigo+'-'+clases.descripcion);
                      arrNiif.push(grupos.codigo+'-'+grupos.descripcion);
                      arrNiif.push(cuentas.codigo+'-'+cuentas.descripcion);

                      if(subcuentas.empresa_id != null){
                         arrNiif.push(subcuentas.codigo+'-'+subcuentas.descripcion+' (#)');
                      }else{
                         arrNiif.push(subcuentas.codigo+'-'+subcuentas.descripcion);
                      }

                      arrNiif.push('');

                      arrNiifs.push(arrNiif);
                      arrNiif = [];
                      bool = 0;
                    }
                });

                    if(bool == 1 && k >= 0){

                      arrNiif.push(clases.codigo+'-'+clases.descripcion);
                      arrNiif.push(grupos.codigo+'-'+grupos.descripcion);

                      if(cuentas.empresa_id != null){
                        arrNiif.push(cuentas.codigo+'-'+cuentas.descripcion+' (#)');
                      }else{
                         arrNiif.push(cuentas.codigo+'-'+cuentas.descripcion);
                      }

                      arrNiif.push('');
                      arrNiif.push('');
                      arrNiifs.push(arrNiif);
                      arrNiif = [];
                      bool = 0;
                    }

            });

          });

      });

    return arrNiifs;
}


var generarDataTable = function( dataSet ) {

  $("#example1").DataTable({
    data: dataSet,
    columns: [
            { title: "Clases" },
            { title: "Grupos" },
            { title: "Cuentas" },
            { title: "Sub-Cuentas" },
            { title: "Auxiliares" },
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
var url = 'niifsallniveles';

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

//*********************************************select clases, grupos, cuenta, subcuenta, auxiliares**********************

var recargarClases = function(){ 
  var Niif_id = $(this).val();
  var url_d ='niifsdependientes/'+Niif_id;
  if(Niif_id){
      $.ajax({
          type:"GET",
          url: url_back + url_d,
          headers: { 
                Authorization: 'Bearer ' + localStorage.access_token
          },
          dataType: "json",
          success:function(respuesta){

              $('#id').val(Niif_id);
              $('#posicion').val('clases');
              if(respuesta.length != 0){
                  $('#select-auxiliares').html('');
                  $('#select-subcuentas').html('');
                  $('#select-cuentas').html('');
                  $('#select-grupos').html(crearHtml(respuesta));
              }else{
                $('#select-auxiliares').html('');
                  $('#select-subcuentas').html('');
                  $('#select-cuentas').html('');
                  $('#select-grupos').html('');
              }
          }
      }); 
  }else if($(this).val() == ''){
             $('#select-auxiliares').html('');
             $('#select-subcuentas').html('');
             $('#select-cuentas').html('');
             $('#select-grupos').html('');
  }
}



var recargarGrupos = function(){ 
  var Niif_id = $(this).val();
  var url_d ='niifsdependientes/'+Niif_id;

  if(Niif_id){
      $.ajax({
          type:"GET",
          url: url_back + url_d,
          headers: { 
                Authorization: 'Bearer ' + localStorage.access_token
          },
          dataType: "json",
          success:function(respuesta){

            $('#id').val(Niif_id);
            $('#posicion').val('grupos');
            if(respuesta.length != 0){
                  $('#select-auxiliares').html('');
                  $('#select-subcuentas').html('');
                  $('#select-cuentas').html(crearHtml(respuesta));
              }else{
                  $('#select-auxiliares').html('');
                  $('#select-subcuentas').html('');
                  $('#select-cuentas').html('');
              }
          }
      }); 
  }else if($(this).val() == ''){
    $('#select-auxiliares').html('');
    $('#select-subcuentas').html('');
    $('#select-cuentas').html('');
  }
};


var recargarCuentas = function(){ 
  var Niif_id = $(this).val();
  var url_d ='niifsdependientes/'+Niif_id;
  if(Niif_id){
      $.ajax({
          type:"GET",
          url: url_back + url_d,
          headers: { 
                Authorization: 'Bearer ' + localStorage.access_token
          },
          dataType: "json",
          success:function(respuesta){

              $('#id').val(Niif_id);
              $('#posicion').val('cuentas');
              if(respuesta.length != 0){
                  $('#select-auxiliares').html('');
                  $('#select-subcuentas').html(crearHtml(respuesta));
              }else{
                $('#select-auxiliares').html('');
                $('#select-subcuentas').html('');
              }
          }
      }); 
  }else if($(this).val() == ''){
      $('#select-auxiliares').html('');
      $('#select-subcuentas').html('');
  }
};



var recargarSubcuentas = function(){ 
  var Niif_id = $(this).val();
  var url_d ='niifsdependientes/'+Niif_id;
  if(Niif_id){
      $.ajax({
          type:"GET",
          url: url_back + url_d,
          headers: { 
                Authorization: 'Bearer ' + localStorage.access_token
          },
          dataType: "json",
          success:function(respuesta){

              $('#id').val(Niif_id);
              $('#posicion').val('subcuentas');
              if(respuesta.length != 0){
                  $('#select-auxiliares').html(crearHtml(respuesta));
              }else{
                  $('#select-auxiliares').html('');
              }
          }
      }); 
  }else if($(this).val() == ''){
      $('#select-auxiliares').html('');
  }
};


var recargarAuxiliares = function(){ 
  var Niif_id = $(this).val();
  if(Niif_id){
      $('#id').val(Niif_id);
      $('#posicion').val('auxiliares');
  }
};


  //*************************************************************************************************************************

$( document ).ready(function() {
  $('.preloader').hide("slow");
  validarLogin();

  obtenerNiifs(); 
  infoTable();


  $("#select-clases").on("click",recargarClases);
  $("#select-grupos").on("click",recargarGrupos);
  $("#select-cuentas").on("click",recargarCuentas);
  $("#select-subcuentas").on("click",recargarSubcuentas);
  $("#select-auxiliares").on("click",recargarAuxiliares);


});

