var crearArticulo = function(e){
    e.preventDefault();   

    const form = document.getElementById('form');
    const formData = new FormData(form);

    var codigo = $('#codigo').val();
    var nombre = $('#nombre').val();
    var posnombre = $('#posnombre').val();
    var descripcion = $('#descripcion').val();
    var fechainvima = $('#fechainvimas').val();
    var referencia = $('#referencia').val();
    var plu = $('#plu').val();
    var reginvima = $('#reginvima').val();
    var existenciaminima = $('#existenciaminima').val();
    var cantidadordenar = $('#cantidadordenar').val();
    var descuento = $('#descuento').val() / 100;
    var imagen = $('#imagen')[0].files[0] ? $('#imagen')[0].files[0] : ''; //
    
    var activo =$('#activo').is(':checked') ? 1 : 0; //
    var lote =$('#lote').is(':checked') ? 1 : 0; //
    var serial =$('#serial').is(':checked') ? 1 : 0;// 
    var talla =$('#talla').is(':checked') ? 1 : 0; //
    var color =$('#color').is(':checked') ? 1 : 0; //
    
    var marca_id = $('#select-marcas').val()? $('#select-marcas').val() : '';
    var grupoinventario_id = $('#id').val()? $('#id').val() : ''; 
    
    var costounitario = $('#costounitario').val();
    var pesovolumen = !isEmpty($('#pesovolumen')) ?  $('#pesovolumen').val().toString() : '0';
    var costobarras = !isEmpty($('#costobarras')) ?  $('#costobarras').val().toString() : '0';

    costounitario = decimalLatinoSave(costounitario);//no es vacio
    costobarras = decimalLatinoSave(costobarras); // save en 0
    pesovolumen = decimalLatinoSave(pesovolumen); // save en 0

    formData.append("codigo", codigo);
    formData.append("nombre", nombre);
    formData.append("costounitario", costounitario);
    formData.append("posnombre", posnombre);
    formData.append("descripcion", descripcion);
    formData.append("costobarras", costobarras);
    formData.append("referencia", referencia);
    formData.append("plu", plu);
    formData.append("activo", activo);
    formData.append("lote", lote);
    formData.append("serial", serial);
    formData.append("talla", talla);
    formData.append("color", color);
    formData.append("pesovolumen", pesovolumen);
    formData.append("reginvima", reginvima);
    formData.append("fechainvima", fechainvima);
    formData.append("existenciaminima", existenciaminima);
    formData.append("cantidadordenar", cantidadordenar);
    formData.append("descuento", descuento);
    formData.append("imagen", imagen);
    formData.append("marca_id", marca_id);
    formData.append("grupoinventario_id", grupoinventario_id);
    formData.append("creador_id", localStorage.id);
    
    $.ajax({
        method: "POST",
        url: url_back + "articulos",
        headers: { 
            Authorization: 'Bearer ' + localStorage.access_token
        },
        dataType: "json",
        data: formData,
        contentType: false,
        processData: false,
        success: function(respuesta) {

            var mensaje = 'Articulo creado de forma correcta.: '+ respuesta.data.nombre;
            sweetMessage('success', mensaje); 

            if(e.target.id == "configurar"){
                localStorage.setItem('editar', respuesta.data.id)
                $('#main_content').load(url_front + 'articulos/edit.html');
            }else{
                $('#main_content').load(url_front + 'articulos/index.html');
            }

        },
        error: function(respuesta) {
            // console.log(respuesta);
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
    }

    
    var defaultImagen = function(){
            const ul = document.getElementById("mostrarImagen");
            const imagen = document.createElement("img");
            imagen.width = 200;
            imagen.src = url_front + 'articulos/defecto.jpg';
            ul.appendChild(imagen);
        }
    
    function obtenerGrupoinventarios() { 
    var url = 'grupoinventarios';
    
    $.ajax({
          method: "GET",
          url: url_back + url,    headers: { 
              Authorization: 'Bearer ' + localStorage.access_token
          },
          dataType: "json",
          success: function(respuesta) {
    
              $('#select-grupoinventario').html(crearHtmlGrupo(respuesta));
          },
          error: function() {
              var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
              sweetMessage('error', mensaje);
          }
        })     
      }
      
      var crearHtmlGrupo = function(data) {
          var html = '<option value="" selected="true" disabled="disabled">Selecione...</option>';
              $.each(data, function (key, item) {
                if(localStorage.empresa_id == item.empresa_id){
                  html += '<option value="'+ item.id+'">';
                  html += item.codigo+'-'+item.descripcion;
                  html += '</option>';
                }
    
              });
          return html;
      }
    
    
      
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
                  //$('#posicion').val('grupoinventario');
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
                //$('#posicion').val('subgrupoinventario1');
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
                  //$('#posicion').val('subgrupoinventario2');
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
      var grupoinventario_id = $(this).val();
      if(grupoinventario_id){
        $('#id').val(grupoinventario_id);
        //$('#posicion').val('subgrupoinventario3');
      }
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
            //  $(this).after( "<span> Introduce formato xxx-xxx-xxx </span>" );	
        });
    
    $( document ).ready(function() {
        $('.preloader').hide("slow");
        validarLogin();
        defaultImagen();
        obtenerGrupoinventarios();
        obtenerSelects('marcas','#select-marcas');

        $("#crear").on("click",crearArticulo);
        $("#configurar").on("click",crearArticulo);
    
        $("#select-grupoinventario").on("click",recargarGrupoinventario);
        $("#select-subgrupoinventario1").on("click",recargarSubgrupoinventario1);
        $("#select-subgrupoinventario2").on("click",recargarSubgrupoinventario2);
        $("#select-subgrupoinventario3").on("click",recargarSubgrupoinventario3);
    
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
    
    