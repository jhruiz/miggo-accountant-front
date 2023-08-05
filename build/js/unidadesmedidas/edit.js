$("#form").submit(function(e) {
    e.preventDefault();   
    
    const form = document.getElementById('form');
    const formData = new FormData(form);
    
    var unidadpeso =$('#unidadpeso').is(':checked') ? 1 : 0;
    
    var codigo = $('#codigo').val();
    var descripcion = $('#descripcion').val();
    var factorgramos = $('#factorgramos').val();
    var codigodianunidade_id = $('#codigodianunidade_id').val();
    
    formData.append("codigo", codigo);
    formData.append("descripcion", descripcion);
    formData.append("codigodianunidade_id", codigodianunidade_id);
    formData.append("factorgramos", factorgramos);
    formData.append("unidadpeso", unidadpeso);
    formData.append('_method', 'PUT');
    
    $.ajax({
        method: "POST",
        url: url_back + "unidadesmedidas/"+localStorage.editar,
        headers: { 
            Authorization: 'Bearer ' + localStorage.access_token
        },
        dataType: "json",
        data: formData,
        contentType: false,//formData
        processData: false,//formData
        success: function(respuesta) {
    
            localStorage.editar = '';
            $('#ModalLong2').modal('hide');
            $('ModalLong2').removeClass('show');
            $('.modal-backdrop').remove();
            var mensaje = ' Unidad de Medida actualizado de forma correcta.: '+ respuesta.data.descripcion;
            sweetMessage('success', mensaje); 
            infoTable();
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
    });
    
    
    function obtenerUnidadesmedida(id){
    var url = 'unidadesmedidas/'+ id;
    
    $.ajax({
        method: "GET",
        url: url_back + url,
        headers: { 
                      Authorization: 'Bearer ' + localStorage.access_token
                  },
        dataType: "json",
        success: function(respuesta) {
    
            respuesta.data.unidadpeso == 1 ? $('#unidadpeso').prop( "checked", true ) : $('#unidadpeso').prop( "checked", false );
                           
            if(respuesta.data.unidadpeso){
              $('#divFactorgramos').show();
            }
    
            $('#codigo').val(respuesta.data.codigo);
            $('#descripcion').val(respuesta.data.descripcion);
            $('#factorgramos').val(respuesta.data.factorgramos);

            if(respuesta.data.codigodianunidade_id){
                $('#codigodianunidade_id').val(respuesta.data.codigodianunidade_id);
                obtenerCodigodian(respuesta.data.codigodianunidade_id);
            }
        },
        error: function() {
            var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
            sweetMessage('error', mensaje);
        }
      })  
    }
    
    $('#unidadpeso').change(function(){    
        if($('input[id=unidadpeso]').is(':checked')){
            $("#divFactorgramos").show();
        }else{
            $("#divFactorgramos").hide();
            $('#factorgramos').val('');
        }
    });

    $( "#codigodianunidade" ).autocomplete({
        source: function( request, response ) {
            var url = 'codigodianunidades?search='+$('#codigodianunidade').val(); 
 
           $.ajax({
             method: "GET",
             url: url_back + url,
             headers: { 
                Authorization: 'Bearer ' + localStorage.access_token
            },
             dataType: "json",
             success: function(respuesta) {
                response(respuesta);
             }
           });
        },
        autoFocus: true,
        minLength: 1,
        appendTo: "#ModalLong2",
        select: function (event, ui) {
          // Set selection
          $('#codigodianunidade').val(ui.item.label); // display the selected text
          $('#codigodianunidade_id').val(ui.item.value); // save selected id to input
          return false;
        }
     });

     var obtenerCodigodian = function(id){
     let url= 'codigodianunidades/' + id;

     $.ajax({
     method: "GET",
     url: url_back + url,
     headers: { 
         Authorization: 'Bearer ' + localStorage.access_token
     },
     dataType: "json",
     success: function(respuesta) {
             $('#codigodianunidade').val(respuesta.data.codigo+'-'+respuesta.data.descripcion);
            //  $('#codigodianunidade_id').val(respuesta.data.id);
     },
     error: function() {
         var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
         sweetMessage('error', mensaje);
     }
   })  
 }
    
    
    $( document ).ready(function() {
        $('.preloader').hide("slow");
          validarLogin();
          obtenerUnidadesmedida(localStorage.editar);
    
        $('#descripcion').validCampo('abcdefghijklmnopqrstuvwxyziou 0123456789-');
    });
    