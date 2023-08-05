
$("#formPrecio").submit(function(e) {
    e.preventDefault(); 
    
      if($('#lista0').val()){
        enviaLista(0);
      }
    
      if($('#lista1').val()){
        enviaLista(1);
      }
    
      if($('#lista2').val()){
        enviaLista(2);
      }
    
    });
    
    
    
    function enviaLista(k){
      var lista = $('#lista'+k).val() ? $('#lista'+k).val() : null;
    
      if(lista){
    
        const form = document.getElementById('formPrecio');
        const formData = new FormData(form);
    
        var ecommerceprecio = $('#ecommerceprecio').val()? $('#ecommerceprecio').val() : '';
        var factorconversion = $('#factorconversion' + k).val()? $('#factorconversion' + k).val() : '';
        var unidadesmedida_id = $('#select-unidades' + k).val()? $('#select-unidades' + k).val() : '';
    
        var precio0 = $('#precio' +k+0).val()? $('#precio' +k+0).val() : '';
        var precio1 = $('#precio' +k+1).val()? $('#precio' +k+1).val() : '';
        var precio2 = $('#precio' +k+2).val()? $('#precio' +k+2).val() : '';
        var precio3 = $('#precio' +k+3).val()? $('#precio' +k+3).val() : '';
        var precio4 = $('#precio' +k+4).val()? $('#precio' +k+4).val() : '';
        var precio5 = $('#precio' +k+5).val()? $('#precio' +k+5).val() : '';
        var precio6 = $('#precio' +k+6).val()? $('#precio' +k+6).val() : '';
        var precio7 = $('#precio' +k+7).val()? $('#precio' +k+7).val() : '';
        var precio8 = $('#precio' +k+8).val()? $('#precio' +k+8).val() : '';
        var precio9 = $('#precio' +k+9).val()? $('#precio' +k+9).val() : '';
    
        formData.append("precio0", precio0);
        formData.append("precio1", precio1);
        formData.append("precio2", precio2);
        formData.append("precio3", precio3);
        formData.append("precio4", precio4);
        formData.append("precio5", precio5);
        formData.append("precio6", precio6);
        formData.append("precio7", precio7);
        formData.append("precio8", precio8);
        formData.append("precio9", precio9);
        formData.append("factorconversion", factorconversion);
        formData.append("ecommerceprecio", ecommerceprecio);
        formData.append("unidadesmedida_id", unidadesmedida_id);
        formData.append('_method', 'PUT');
    
             $.ajax({
              method: "POST",
              url: url_back + "unidadesmedidalistaprecios/"+lista,
              headers: { 
                  Authorization: 'Bearer ' + localStorage.access_token
              },
              dataType: "json",
              data: formData,
              contentType: false,//formData
              processData: false,//formData
              success: function(respuesta) {
    
                      var mensaje = 'Lista Precio Asociadas actualizado de forma correcta.: ';
                      sweetMessage('success', mensaje); 
                      regresa(true);
              },
              error: function(respuesta) {
    
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
    
        function regresa(bool) {
              if(bool){
                $('#ModalLong').modal('hide');
                $('ModalLong').removeClass('show');
                $('.modal-backdrop').remove();
              }
        };
      }
    
    
    var crearLista = function(e){
    e.preventDefault(); 
    
      const form = document.getElementById('formPrecio');
      const formData = new FormData(form);
    
      var articulo_id = localStorage.editar;
      var creador_id = localStorage.id;
    
      formData.append("articulo_id", articulo_id);
      formData.append("creador_id", creador_id);
    
      if('crear2'== e.target.id){
        var lista = '#lista2';
        $('#div2').hide();
        $(".lista2").prop('disabled', false);
    
      }else if('crear1'== e.target.id){
        var lista = '#lista1';
        $('#div1').hide();
        $(".lista1").prop('disabled', false);
    
      }
      
      $.ajax({
              method: "POST",
              url: url_back + "unidadesmedidalistaprecios",
              headers: { 
                  Authorization: 'Bearer ' + localStorage.access_token
              },
              dataType: "json",
              data: formData,
              contentType: false,//formData
              processData: false,//formData
              success: function(respuesta) {
    
                      var mensaje = 'Lista Precio Asociadas creado de forma correcta.: ';
                      sweetMessage('success', mensaje); 
                      obtenerListaprecio(localStorage.editar);
                      $('#div1').hide();
                      $('#div2').hide();
              },
              error: function(respuesta) {
    
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
    
    function validarCostounitario(e){
    
      if(parseInt($(this).val()) < parseInt($('#costounitario').val()) && e.target.id != 'factorconversion2' && e.target.id != 'factorconversion1' && e.target.id != 'select-unidades1' && e.target.id != 'select-unidades2'){
            var mensaje = 'el precio debe ser mayor al Costo Unitario.: ' + $('#costounitario').val();
            sweetMessage('info', mensaje);
            $(this).val('');
      }
    }
    
    
    function obtenerListaprecio(id){
    var url = 'articulos/'+ id;
    
    $.ajax({
        method: "GET",
        url: url_back + url,
        headers: { 
                      Authorization: 'Bearer ' + localStorage.access_token
                  },
        dataType: "json",
        success: function(respuesta) {
    
          $('#costounitario').val(respuesta.data.costounitario);
          arre = respuesta.data.unidadesmedidalistaprecio;
    
          ordenarPrecio(arre);
    
          if(arre.length == 1){
                $('#div1').show();
                $(".lista1").prop('disabled', true);
                $('#div2').show();
                $(".lista2").prop('disabled', true);
          }else if(arre.length == 2){
              $('#div2').show();
              $(".lista1").prop('disabled', false);
              $(".lista2").prop('disabled', true);
          }else if(arre.length == 3){
              $(".lista1").prop('disabled', false);
              $(".lista2").prop('disabled', false);
          }
    
        },
        error: function() {
            var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
            sweetMessage('error', mensaje);
        }
      })  
    }
    
    
    function ordenarPrecio(arre){
      var  k= 0;
    
    arre.forEach(function callback(element, i) {
    
      element.id ? $('#lista' + k).val(element.id): '';
    
      element.precio0 ? $('#precio'+ k + 0).val(element.precio0): '';
      element.precio1 ? $('#precio'+ k + 1).val(element.precio1): '';
      element.precio2 ? $('#precio'+ k + 2).val(element.precio2): '';
      element.precio3 ? $('#precio'+ k + 3).val(element.precio3): '';
      element.precio4 ? $('#precio'+ k + 4).val(element.precio4): '';
      element.precio5 ? $('#precio'+ k + 5).val(element.precio5): '';
      element.precio6 ? $('#precio'+ k + 6).val(element.precio6): '';
      element.precio7 ? $('#precio'+ k + 7).val(element.precio7): '';
      element.precio8 ? $('#precio'+ k + 8).val(element.precio8): '';
      element.precio9 ? $('#precio'+ k + 9).val(element.precio9): '';
      
            if(element.ecommerceprecio){
              $('#ecommerceprecio').val(element.ecommerceprecio);
            }
    
            if(element.factorconversion){
              $('#factorconversion'+i).val(element.factorconversion);
            }
    
            if(element.unidadesmedida_id){
            obtenerSelect('unidadesmedidas','#select-unidades'+i, element.unidadesmedida_id );
             }else{
            obtenerSelects('unidadesmedidas','#select-unidades'+i);
            }
    
            k++;
          });
          
    
        }
    
    
    $( document ).ready(function() {
        $('.preloader').hide("slow");
          validarLogin();
          obtenerListaprecio(localStorage.editar);
    
          $("#crear1").on("click",crearLista);
          $("#crear2").on("click",crearLista);
    
          $('.lista0').on("blur",validarCostounitario);
          $('.lista1').on("blur",validarCostounitario);
          $('.lista2').on("blur",validarCostounitario);
    });