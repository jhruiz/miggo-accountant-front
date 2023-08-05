var obtenerListadescuento = function(){
    url_tipo= 'listadescuentos/' + localStorage.editar;
    $.ajax({
    method: "GET",
    url: url_back + url_tipo,
    headers: { 
        Authorization: 'Bearer ' + localStorage.access_token
    },
    dataType: "json",
    success: function(respuesta) {
      $('#listadescuento').text("Descuento: "+respuesta.data.descripcion);
    },
    error: function() {
        var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
        sweetMessage('error', mensaje);
    }
  })  
}


function obtenerServicio() {
  url = 'servicios';
  
  $.ajax({
      method: "GET",
      url: url_back + url,  
       headers: { 
          Authorization: 'Bearer ' + localStorage.access_token
      },
      dataType: "json",
      success: function(respuesta) {
          $('#select-servicios').html(crearHtmlSerArt(respuesta.data));
      },
      error: function() {
          var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
          sweetMessage('error', mensaje);
      }
    })     
  }


  function obtenerArticulo() {
    url = 'articulos';
    
    $.ajax({
        method: "GET",
        url: url_back + url,  
         headers: { 
            Authorization: 'Bearer ' + localStorage.access_token
        },
        dataType: "json",
        success: function(respuesta) {
            $('#select-articulos').html(crearHtmlSerArt(respuesta.data));
        },
        error: function() {
            var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
            sweetMessage('error', mensaje);
        }
      })     
    }


  var crearHtmlSerArt = function(data) {
    var html = '<option value="" selected="true" disabled="disabled">Selecione...</option>';
      $.each(data, function (key, item) {
          html += '<option value="'+ item.id+'">';
          html += item.codigo+'-'+item.nombre;
          html += '</option>';
      });
    return html;
  }



function obtenerCliente() {
  url = 'allclientes/'+ localStorage.empresa_id;
  
  $.ajax({
      method: "GET",
      url: url_back + url,  
       headers: { 
          Authorization: 'Bearer ' + localStorage.access_token
      },
      dataType: "json",
      success: function(respuesta) {
          $('#select-clientes').html(crearHtmlCliente(respuesta.data));
      },
      error: function() {
          var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
          sweetMessage('error', mensaje);
      }
    })     
  }


  var crearHtmlCliente = function(data) {
    var html = '<option value="" selected="true" disabled="disabled">Selecione...</option>';
      $.each(data, function (key, item) {
          html += '<option value="'+ item.id+'">';
          html += item.tercero.identificacion+'-'+item.tercero.nombres;
          html += '</option>';
      });
    return html;
  }


function obtenerGrupoinventario() {
url = 'allgrupoinventarios/'+ localStorage.empresa_id;

$.ajax({
    method: "GET",
    url: url_back + url,  
     headers: { 
        Authorization: 'Bearer ' + localStorage.access_token
    },
    dataType: "json",
    success: function(respuesta) {
        $('#select-grupoinventario').html(crearHtml(respuesta.data));
    },
    error: function() {
        var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
        sweetMessage('error', mensaje);
    }
  })     
}

function obteneraZonaventas() {
  url = 'allzonaventas/'+ localStorage.empresa_id;
  
  $.ajax({
      method: "GET",
      url: url_back + url,  
       headers: { 
          Authorization: 'Bearer ' + localStorage.access_token
      },
      dataType: "json",
      success: function(respuesta) {
          $('#select-zonaventas').html(crearHtml(respuesta.data));
      },
      error: function() {
          var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
          sweetMessage('error', mensaje);
      }
    })     
  }

var crearHtml = function(data) {
      var html = '<option value="" selected="true" disabled="disabled">Selecione...</option>';
        $.each(data, function (key, item) {
            html += '<option value="'+ item.id+'">';
            html += item.codigo+'-'+item.descripcion;
            html += '</option>';
        });
    return html;
}

  var organizarDatos = function( data ) {  
      let arrListadescuentos = [];
      let i = 0;
      let evaluar = $('#aplicable').val();

  switch (evaluar) { 
    case 'grupoinventarios': 


        $('#divC').hide();
        $('#divG').show();
        $('#divZ').hide();
        $('#divS').hide();
        $('#divA').hide();

          data.grupoinventarios.forEach(element => {
          arrListadescuento = [
              element.codigo,
              element.descripcion,
          ];
  
          i++;
          arrListadescuento.push('<div class="col text-center">  <button class="btn btn-danger btn-sm" type="submit" onclick="eliminarListadescuentoG('+ element.id +')"><i class="nav-icon fa fa-times" aria-hidden="true"></i></button> </div>'); 
  
          arrListadescuentos.push(arrListadescuento);
      });

      return arrListadescuentos;


      break;
    case 'zonaventas': 

        $('#divC').hide();
        $('#divG').hide();
        $('#divZ').show();
        $('#divS').hide();
        $('#divA').hide();

          data.zonaventas.forEach(element => {
            arrListadescuento = [
                element.codigo,
                element.descripcion,
            ];

            i++;
            arrListadescuento.push('<div class="col text-center">  <button class="btn btn-danger btn-sm" type="submit" onclick="eliminarListadescuentoG('+ element.id +')"><i class="nav-icon fa fa-times" aria-hidden="true"></i></button> </div>'); 

            arrListadescuentos.push(arrListadescuento);
        });

      return arrListadescuentos;

      break;
    case 'servicios': 

        $('#divC').hide();
        $('#divG').hide();
        $('#divZ').hide();
        $('#divS').show();
        $('#divA').hide();

          data.servicios.forEach(element => {
            arrListadescuento = [
                element.codigo,
                element.nombre,
            ];

            i++;
            arrListadescuento.push('<div class="col text-center">  <button class="btn btn-danger btn-sm" type="submit" onclick="eliminarListadescuentoG('+ element.id +')"><i class="nav-icon fa fa-times" aria-hidden="true"></i></button> </div>'); 

            arrListadescuentos.push(arrListadescuento);
        });

       return arrListadescuentos;

      break;		
    case 'articulos': 

          $('#divC').hide();
          $('#divG').hide();
          $('#divZ').hide();
          $('#divS').hide();
          $('#divA').show();

          data.articulos.forEach(element => {
            arrListadescuento = [
                element.codigo,
                element.nombre,
            ];

            i++;
            arrListadescuento.push('<div class="col text-center">  <button class="btn btn-danger btn-sm" type="submit" onclick="eliminarListadescuentoG('+ element.id +')"><i class="nav-icon fa fa-times" aria-hidden="true"></i></button> </div>'); 

            arrListadescuentos.push(arrListadescuento);
        });

        return arrListadescuentos;

      break;
    case 'clientes': 

          $('#divC').show();
          $('#divG').hide();
          $('#divZ').hide();
          $('#divS').hide();
          $('#divA').hide();

          data.clientes.forEach(element => {
            arrListadescuento = [
                element.tercero.identificacion,
                element.tercero.nombres,
            ];

            i++;
            arrListadescuento.push('<div class="col text-center">  <button class="btn btn-danger btn-sm" type="submit" onclick="eliminarListadescuentoG('+ element.id +')"><i class="nav-icon fa fa-times" aria-hidden="true"></i></button> </div>'); 

            arrListadescuentos.push(arrListadescuento);
        });

       return arrListadescuentos;

      break;
    default:

            $('#divC').hide();
            $('#divG').show();
            $('#divZ').hide();
            $('#divS').hide();
            $('#divA').hide();
            $('#aplicable').val('grupoinventarios'); 

            data.grupoinventarios.forEach(element => {
              arrListadescuento = [
                  element.codigo,
                  element.descripcion,
              ];

              i++;
              arrListadescuento.push('<div class="col text-center">  <button class="btn btn-danger btn-sm" type="submit" onclick="eliminarListadescuentoG('+ element.id +')"><i class="nav-icon fa fa-times" aria-hidden="true"></i></button> </div>'); 

              arrListadescuentos.push(arrListadescuento);
          });

          $('#select-aplicables option[value="grupoinventarios"]').attr("selected",true);
          return arrListadescuentos;
        }

  }

  
  var generarDataTable = function( dataSet ) {
  
    $("#example2").DataTable({
      data: dataSet,
      destroy: true,
      columns: [
              { title: "Codigo" },
              { title: "Nombre" },
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
    }).buttons().container().appendTo('#example2_wrapper .col-md-6:eq(0)');
  
  }
  
  
  
  var infoTable2 = function(){
  var url = 'listadescuentos/'+ localStorage.editar;
  
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
  
  
  
  
  function eliminarListadescuentoG(id){
    let evaluar = $('#aplicable').val() ? $('#aplicable').val() : 'grupoinventarios';
    let url_eliminar = 'listadescuentos/' + localStorage.editar +'/aplicables/'+id+'?aplicar='+ evaluar; 

  if(localStorage.nivelperfil == 2){

    if (confirm('¿Está seguro de Borrar?')){
  
                $.ajax({
              method: "DELETE",
              url: url_back + url_eliminar,
              headers: { 
                            Authorization: 'Bearer ' + localStorage.access_token
                        },
              dataType: "json",
              success: function(respuesta) {

                  var mensaje = 'se borro exitosamente la parte: ' + respuesta.data.descripcion;
                  sweetMessage('success', mensaje);
                  infoTable2();
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
    var mensaje = 'Para eliminar debe tener el nivel necesario.';
    sweetMessage('info', mensaje);
  }


  }

  $("#vincular").on('click',function(e){

    let evaluar = $('#aplicable').val() ? $('#aplicable').val(): '';
    let id = $('#id').val() ? $('#id').val(): '';
    let url = 'listadescuentos/'+ localStorage.editar +'/aplicables/'+id+'?aplicar='+ evaluar; 

    if(evaluar == '' || id == ''){
        var mensaje = 'debe selecionar un Valor'; 
        sweetMessage('info', mensaje);
        return false;
    }

  
  $.ajax({
          method: "PUT",
          url: url_back + url,
          headers: { 
              Authorization: 'Bearer ' + localStorage.access_token
          },
          dataType: 'json',
          success: function(respuesta) {
              var mensaje = 'se agrego exitosamente a la lista de descuento ' + respuesta.data.descripcion;
              sweetMessage('success', mensaje);
              infoTable2();
          },
          error: function() {
              var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde o la tabla esta vacia';
              sweetMessage('error', mensaje);
          }
      })
});
  
  
  $( document ).ready(function() {
    $('.preloader').hide("slow");
    validarLogin();
  
    infoTable2(); 
    obtenerGrupoinventario();
    obteneraZonaventas();
    obtenerCliente();
    obtenerArticulo();
    obtenerServicio();

    obtenerListadescuento();

    var saludos = 'Hola '+ localStorage.nombres;
    $('#saludos').text(saludos);

  
  });
  