$("#form").change(function(e) {
    e.preventDefault();   
    
    const form = document.getElementById('form');
    const formData = new FormData(form);
    
    var codigo = $('#codigo').val();
    var nombre = $('#nombre').val();
    var posnombre = $('#posnombre').val();
    var descripcion = $('#descripcion').val();
    var descuento = $('#descuento').val() / 100;
    var imagen = $('#imagen')[0].files[0] ? $('#imagen')[0].files[0] : '';
    
    var activo =$('#activo').is(':checked') ? 1 : 0;
    var estatusdescuento =$('#estatusdescuento').is(':checked') ? 1 : 0; //

    var grupoinventario_id = $('#id').val()? $('#id').val() : ''; 
    
    var costounitario = $('#costounitario').val();
    costounitario = decimalLatinoSave(costounitario);//no es vacio

    formData.append("codigo", codigo);
    formData.append("nombre", nombre);
    formData.append("costounitario", costounitario);
    formData.append("posnombre", posnombre);
    formData.append("descripcion", descripcion);
    formData.append("activo", activo);
    formData.append("descuento", descuento);
    formData.append("estatusdescuento", estatusdescuento);
    formData.append("imagen", imagen);
    formData.append("grupoinventario_id", grupoinventario_id);
    formData.append('_method', 'PUT');
    
    $.ajax({
        method: "POST",
        url: url_back + "servicios/"+localStorage.editar,
        headers: { 
            Authorization: 'Bearer ' + localStorage.access_token
        },
        dataType: "json",
        data: formData,
        contentType: false,
        processData: false,
        success: function(respuesta) {
    
                var mensaje = 'Servicio creado de forma correcta.: '+ respuesta.data.nombre;
                sweetMessage('success', mensaje); 
        },
        error: function(respuesta) {
            console.log(respuesta);
    
            if(respuesta.responseJSON.error){
                $.each(respuesta.responseJSON.error.message, function (key, item) {
                    var mensaje = item[0];
                    sweetMessage('error', mensaje);
                });
    
            }else{
                var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
                sweetMessage('error', mensaje);
            }
        }
    });
    });
    
    function obtenerServicio(id){
        var url = 'servicios/'+ id;
        
        $.ajax({
            method: "GET",
            url: url_back + url,
            headers: { 
                          Authorization: 'Bearer ' + localStorage.access_token
                      },
            dataType: "json",
            success: function(respuesta) {
    
                respuesta.data.activo == 1 ? $('#activo').prop( "checked", true ) : $('#activo').prop( "checked", false );
                respuesta.data.estatusdescuento == 1 ? $('#estatusdescuento').prop( "checked", true ) : $('#estatusdescuento').prop( "checked", false );
    
                $('#codigo').val(respuesta.data.codigo);
                $('#nombre').val(respuesta.data.nombre);
                $('#posnombre').val(respuesta.data.posnombre);
                $('#descripcion').val(respuesta.data.descripcion);
                $('#descuento').val(respuesta.data.descuento * 100);
                $('#descuentovlr').val(respuesta.data.descuentovlr);
                $('#descuentoafectavlr').val(respuesta.data.descuentoafectavlr);
                $('#costospromediobodegas').val(respuesta.data.costospromediobodegas);
                $('#ultimocosto').val(respuesta.data.ultimocosto);
                $('#fechaultimacompra').val(respuesta.data.fechaultimacompra);
               
                if(respuesta.data.imagen){
                    const ul = document.getElementById("mostrarImagen");
                    const imagen = document.createElement("img");
                    imagen.width = 200;
                    imagen.src = url_img + 'servicios/'+ respuesta.data.imagen;
                    ul.appendChild(imagen);
                  }else{
                    const ul = document.getElementById("mostrarImagen");
                    const imagen = document.createElement("img");
                    imagen.width = 200;
                    imagen.src = url_front + 'servicios/defecto.jpg';
                    ul.appendChild(imagen);
                  }
    
                if(respuesta.data.grupoinventario_id){
                        $('#id').val(respuesta.data.grupoinventario_id);
                        obtenerGrupoinventario(respuesta.data.grupoinventario_id);
                }else{
                     obtenerGrupoinventarios(); 
                }

                $('#costounitario').val(decimalLatinoShow(respuesta.data.costounitario));
    
            },
            error: function() {
                var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
                sweetMessage('error', mensaje);
            }
          })  
        }
    
    function obtenerGrupoinventario(id) { 
    var url = 'grupoinventarios/'+id;
    var grupopadre= '';
    
      $.ajax({
          method: "GET",
          url: url_back + url,    headers: { 
              Authorization: 'Bearer ' + localStorage.access_token
          },
          dataType: "json",
          success: function(respuesta) {
    
            let posicion = parseInt(respuesta.data.posicion);

                    if(posicion == 3){
                        $('#select-subgrupoinventario3').html('<option value="'+ respuesta.data.id+'" >'+respuesta.data.codigo+'-'+respuesta.data.descripcion+'</option>');
                        $('#select-subgrupoinventario2').html('<option value="'+ respuesta.data.grupoinventario.id+'" >'+respuesta.data.grupoinventario.codigo+'-'+respuesta.data.grupoinventario.descripcion+'</option>');
                        $('#select-subgrupoinventario1').html('<option value="'+ respuesta.data.grupoinventario.grupoinventario.id+'" >'+respuesta.data.grupoinventario.grupoinventario.codigo+'-'+respuesta.data.grupoinventario.grupoinventario.descripcion+'</option>');
    
                        grupopadre = '<option value="'+ respuesta.data.grupoinventario.grupoinventario.grupoinventario.id+'" >'+respuesta.data.grupoinventario.grupoinventario.grupoinventario.codigo+'-'+respuesta.data.grupoinventario.grupoinventario.grupoinventario.descripcion+'</option>';
    
                        obtenerGrupoinventarios(respuesta.data.grupoinventario.grupoinventario.grupoinventario.id, grupopadre);
                    }else if(posicion == 2){
                        $('#select-subgrupoinventario2').html('<option value="'+ respuesta.data.id+'" >'+respuesta.data.codigo+'-'+respuesta.data.descripcion+'</option>');
                        $('#select-subgrupoinventario1').html('<option value="'+ respuesta.data.grupoinventario.id+'" >'+respuesta.data.grupoinventario.codigo+'-'+respuesta.data.grupoinventario.descripcion+'</option>');
    
                        grupopadre = '<option value="'+ respuesta.data.grupoinventario.grupoinventario.id+'" >'+respuesta.data.grupoinventario.grupoinventario.codigo+'-'+respuesta.data.grupoinventario.grupoinventario.descripcion+'</option>';
    
                        obtenerGrupoinventarios(respuesta.data.grupoinventario.grupoinventario.id, grupopadre);
                    }else if(posicion == 1){
                        $('#select-subgrupoinventario1').html('<option value="'+ respuesta.data.id+'" >'+respuesta.data.codigo+'-'+respuesta.data.descripcion+'</option>');
    
                        grupopadre = '<option value="'+ respuesta.data.grupoinventario.id+'" >'+respuesta.data.grupoinventario.codigo+'-'+respuesta.data.grupoinventario.descripcion+'</option>';
    
                        obtenerGrupoinventarios(respuesta.data.grupoinventario.id, grupopadre);
                    }else if(posicion == 0){
    
                        grupopadre = '<option value="'+ respuesta.data.id+'" >'+respuesta.data.codigo+'-'+respuesta.data.descripcion+'</option>';
                        obtenerGrupoinventarios(respuesta.data.id, grupopadre);
                    }
          },
          error: function() {
              var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
              sweetMessage('error', mensaje);
          }
        })     
      }
    
    
    function obtenerGrupoinventarios(id = null, grupopadre = null) { 
    var url = 'grupoinventarios';
    
    $.ajax({
          method: "GET",
          url: url_back + url,    headers: { 
              Authorization: 'Bearer ' + localStorage.access_token
          },
          dataType: "json",
          success: function(respuesta) {
    
              $('#select-grupoinventario').html(crearHtmlGrupo(respuesta, id, grupopadre));
          },
          error: function() {
              var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
              sweetMessage('error', mensaje);
          }
        })     
      }
      
      var crearHtmlGrupo = function(data, id = null, grupopadre = null) {
            if(grupopadre != null){
                var html = grupopadre;
            }else{
                var html = '<option value="" selected="true" disabled="disabled">Selecione...</option>';
            }
              $.each(data, function (key, item) {
                if(localStorage.empresa_id == item.empresa_id && item.id != id){
                  html += '<option value="'+ item.id+'">';
                  html += item.codigo+'-'+item.descripcion;
                  html += '</option>';
                }
    
              });
          return html;
      }
    
     
    var recargarGrupoinventario = function(){ 
      var grupoinventario_id = $(this).val() ? $(this).val() : '';
      $('#id').val(grupoinventario_id);
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
    
                  if(respuesta.length != 0){
                      $('#select-subgrupoinventario3').html('');
                      $('#select-subgrupoinventario2').html('');
                      $('#select-subgrupoinventario1').html(crearHtmlGrupo(respuesta));
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
      var grupoinventario_id = $(this).val() ? $(this).val() : '';
      $('#id').val(grupoinventario_id);
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
    
                if(respuesta.length != 0){
                      $('#select-subgrupoinventario3').html('');
                      $('#select-subgrupoinventario2').html(crearHtmlGrupo(respuesta));
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
      var grupoinventario_id = $(this).val() ? $(this).val() : '';
      $('#id').val(grupoinventario_id);
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
    
                  if(respuesta.length != 0){
                      $('#select-subgrupoinventario3').html(crearHtmlGrupo(respuesta));
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
      var grupoinventario_id = $(this).val() ? $(this).val() : '';
      $('#id').val(grupoinventario_id);
    };
    
    $('.form-check-input').change(function(){    
        if(!$('input[id=color]').is(':checked')){
            $('#talla').prop( "checked", false);
        }
    });
    
    $('#talla').change(function(){    
        if(!$('input[id=color]').is(':checked')){
            $('.form-check-input').prop( "checked", false);
        }
    });
    
    $("#nombre").blur(function() {
             $("#posnombre").val($(this).val()); 
        });
    
    $( document ).ready(function() {
        $('.preloader').hide("slow");
        validarLogin();
        actualizarmoneda();
        obtenerServicio(localStorage.editar);
    
        $("#select-grupoinventario").on("change",recargarGrupoinventario);
        $("#select-subgrupoinventario1").on("change",recargarSubgrupoinventario1);
        $("#select-subgrupoinventario2").on("change",recargarSubgrupoinventario2);
        $("#select-subgrupoinventario3").on("change",recargarSubgrupoinventario3);
    
        $('#descripcion').validCampo('abcdefghijklmnopqrstuvwxyziou 0123456789-');
    });
    
    document.getElementById("imagen").onchange = function(e){
            if(validarImagen(e)){
                const ul = document.getElementById("mostrarImagen");
                ul.innerHTML = '';
                const imagen = document.createElement("img");
                const read = new FileReader();
                const file = this.files;
                
                read.onload = function(){
                    const result = this.result;
                    const url = result;
                    imagen.width = 200;
                    imagen.src = url;
                    ul.appendChild(imagen);
                }
                read.readAsDataURL(file[0]);
            }
        }
    
        $(function() {
     $("#fechainvima").datetimepicker({
            locale: "es",
            format: "YYYY-MM-DD",  
            maxDate: moment(),
            minDate: moment().subtract(99, 'year'),
            timepicker:false,
            autoclose: true,
            showButtonPanel: true
     });
    });
    

    //****************************************************configuracion */

    
function editarCuentapuc(){
    var url_edit = 'servicios/cuentapucs.html';
  
      $('#mymodal').html('');
        $('#mymodal').load('../' + url_edit ,function(){
              $('#ModalLong2').modal({show:true});
          });
  }
  
  function editarListaprecio(){
        var url = 'servicios/listaprecios.html';
      
          $('#mymodal').html('');
            $('#mymodal').load('../' + url ,function(){
                  $('#ModalLong').modal({show:true});
              });
      }
  
  function editarImpuesto(){
        var url = 'servicios/impuestos.html';
      
          $('#mymodal').html('');
            $('#mymodal').load('../' + url ,function(){
                  $('#ModalLong3').modal({show:true});
              });
      }
  