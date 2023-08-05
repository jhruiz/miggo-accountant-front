
var crearTercero = function(e){
    e.preventDefault();   
    
    const formTercero = document.getElementById('formTercero');
    const formData = new FormData(formTercero);
    
    var imagen = $('#imagen')[0].files[0] ? $('#imagen')[0].files[0] : '';
    var nombres = $('#nombres').val();
    var apellidos = $('#apellidos').val();
    var razonsocial = $('#razonsocial').val();
    var representantelegal = $('#representantelegal').val();
    var identificacion = $('#identificacion').val();
    var digitoverificacion = $('#verificado').val();
    var celular = $('#celular').val();
    var direccion = $('#direccion').val();
    var direccion2 = $('#direccion2').val();
    var telefono = $('#telefono').val();
    var email = $('#email').val();
    var cumpleanios = $('#cumpleanios').val();
    var contactocelular = $('#contactocelular').val();
    var contactonombre = $('#contactonombre').val();
    var ciiuclase_id = $('#ciiu_id').val();
    
    var autoretenedorrenta =$('#autoretenedorrenta').is(':checked') ? 1 : 0;
    var autoretenedorica =$('#autoretenedorica').is(':checked') ? 1 : 0;
    
    var tipoidentificacione_id = $('#select-identificacion').val()? $('#select-identificacion').val() : ''; 
    var ciudade_id = $('#select-ciudad').val()? $('#select-ciudad').val() : ''; 
    var tipodireccione_id = $('#select-tipodirecciones').val()? $('#select-tipodirecciones').val() : ''; 
    var tipodireccione2_id = $('#select-tipodirecciones2').val()? $('#select-tipodirecciones2').val() : ''; 
    var personeria_id = $('#select-personerias').val()? $('#select-personerias').val() : ''; 
    var regimene_id = $('#select-regimenes').val()? $('#select-regimenes').val() : ''; 
    var tipocontribuyente_id = $('#select-tipocontribuyentes').val()? $('#select-tipocontribuyentes').val() : ''; 
    var contacto_id = $('#select-contactos').val()? $('#select-contactos').val() : ''; 
    
    formData.append("imagen", imagen);
    formData.append("nombres", nombres);
    formData.append("apellidos", apellidos);
    formData.append("razonsocial", razonsocial);
    formData.append("representantelegal", representantelegal);
    formData.append("identificacion", identificacion);
    formData.append("digitoverificacion", digitoverificacion);
    formData.append("celular", celular);
    formData.append("direccion", direccion);
    formData.append("direccion2", direccion2);
    formData.append("telefono", telefono);
    formData.append("email", email);
    formData.append("cumpleanios", cumpleanios);
    formData.append("contactocelular", contactocelular);
    formData.append("contactonombre", contactonombre);
    formData.append("ciiuclase_id", ciiuclase_id);
    formData.append("autoretenedorrenta", autoretenedorrenta);
    formData.append("autoretenedorica", autoretenedorica);
    formData.append("tipoidentificacione_id", tipoidentificacione_id);
    formData.append("ciudade_id", ciudade_id);
    formData.append("tipodireccione_id", tipodireccione_id);
    formData.append("tipodireccione2_id", tipodireccione2_id);
    formData.append("personeria_id", personeria_id);
    formData.append("regimene_id", regimene_id);
    formData.append("tipocontribuyente_id", tipocontribuyente_id);
    formData.append("contacto_id", contacto_id);
    formData.append("creador_id", localStorage.id);
    
    // const output = document.getElementById('output');
    
    // for (const [key, value] of formData) {
    //   output.textContent += `${key}: ${value}\n`;
    // }
    
    $.ajax({
        method: "POST",
        url: url_back + "terceros",
        headers: { 
            Authorization: 'Bearer ' + localStorage.access_token
        },
        dataType: "json",
        data: formData,
        contentType: false,//formData
        processData: false,//formData
        success: function(respuesta) {
    
          var mensaje = 'tercero actualizado de forma correcta nombres.: '+ respuesta.data.nombres;
          sweetMessage('success', mensaje); 
    
             if(e.target.id == "configurar"){
                  $('#main_content').load(url_front + 'terceros/edit.html');
                    localStorage.setItem('editar', respuesta.data.id);
             }else{
                  $('#main_content').load(url_front + 'terceros/index.html');
             }
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
    
    //***************************************************trae valores masivos de perfil,ciudad,tipodocumento*******************
    
    /**
     * Genera el html con los departamentos configurados en la base de datos
     */
    
     function obtenerDepartamentos() {
      url = 'paises/'+ 170 +'/departamentos';
    
        $.ajax({
            method: "GET",
            url: url_back + url,
            headers: { 
            Authorization: 'Bearer ' + localStorage.access_token
            },
            dataType: "json",
            success: function(respuesta) {
                $('#select-departamento').html(crearHtml(respuesta.data));
            },
            error: function() {
                var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
                sweetMessage('error', mensaje);
            }
        })     
    }
    
    
    // function obtenerSelects(url, select, id = null,  base = null) {
    
    // $.ajax({
    //     method: "GET",
    //     url: url_back + url,
    //     headers: { 
    //         Authorization: 'Bearer ' + localStorage.access_token
    //     },
    //     dataType: "json",
    //     success: function(respuesta) {
    
    //         $(select).html(crearHtml(respuesta.data));
    //         // $(select).html(crearHtml(respuesta.data, base, id));
    //     },
    //     error: function() {
    //         var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
    //         sweetMessage('error', mensaje);
    //     }
    //   })     
    // }
    
    //***************************************************autocompletar*******************
    
    $( "#ciiu" ).autocomplete({
            source: function( request, response ) {
                var url_ciiu = 'ciiuclases/?search='+$('#ciiu').val();
    
               // Fetch data
               $.ajax({
                 method: "GET",
                 url: url_back + url_ciiu,
                 headers: { 
                    Authorization: 'Bearer ' + localStorage.access_token
                },
                 dataType: "json",
                 success: function(respuesta) {
                    response(respuesta);
                 }
               });
            },
            minLength: 2,
            select: function (event, ui) {
              // Set selection
              $('#ciiu').val(ui.item.label); // display the selected text
              $('#ciiu_id').val(ui.item.value); // save selected id to input
              return false;
            }
         });
    
    //**************************************************************************************************************************************
    
    var crearHtml = function(data) {
            var html = '<option value="" selected="true" disabled="disabled">Selecione...</option>';
            $.each(data, function (key, item) {
                html += '<option value="'+ item.id+'">';
                html += item.descripcion;
                html += '</option>';
            });
        return html;
    }
    //********************************************************************************************************************************
    
    var recargarDepartamento = function(){
      var departamento_id = $(this).val();
      var url_d ='departamentos/'+departamento_id+'/ciudades';
      if(departamento_id){
          $.ajax({
              type:"GET",
              url: url_back + url_d,
              headers: { 
                  Authorization: 'Bearer ' + localStorage.access_token
              },
              dataType: "json",
              success:function(respuesta){
                  $('#select-ciudad').html(crearHtml(respuesta.data));
              }
          }); 
      }else if($(this).val() == ''){
           $('#select-ciudad').val('');
      }
    }
    
    var mostrardivDigito = function(){
      var tipoidentificacione_id = $("#select-identificacion").val() ;
      var url_d ='tipoidentificaciones/'+tipoidentificacione_id;
    
      if(tipoidentificacione_id){
          $.ajax({
              type:"GET",
              url: url_back + url_d,
              headers: { 
                  Authorization: 'Bearer ' + localStorage.access_token
              },
              dataType: "json",
              success:function(respuesta){
    
                  if(respuesta.data.digitoverificacion == 1){
                      $("#divDigito").show();
                  }else{
                      $("#divDigito").hide();
                      $("#verificado").val('');
                  }
              }
          }); 
      }
    }
    
    
    var defaultImagen = function(){
      const ul = document.getElementById("mostrarImagen");
      const imagen = document.createElement("img");
      imagen.width = 200;
      imagen.src = url_front + 'terceros/defecto.jpg';
      ul.appendChild(imagen);
    }
    
    //********************************************************************************************************************************
    
    $( document ).ready(function() {
        $('.preloader').hide("slow");
        validarLogin();
    
        defaultImagen();
    
        $("#crear").on("click",crearTercero);
        $("#configurar").on("click",crearTercero);
    
        $("#select-identificacion").on("change",mostrardivDigito);
        $("#identificacion").on("change",calcularDigito); 
        $("#select-departamento").on("change",recargarDepartamento);
    
        obtenerDepartamentos();
        obtenerSelects('tipoidentificaciones', '#select-identificacion');
        obtenerSelects('tipodirecciones', '#select-tipodirecciones');
        obtenerSelects('tipodirecciones', '#select-tipodirecciones2');
        obtenerSelects('regimenes', '#select-regimenes');
        obtenerSelects('personerias', '#select-personerias');
        obtenerSelects('tipocontribuyentes', '#select-tipocontribuyentes');
        obtenerSelects('contactos', '#select-contactos');
    
        $('#email').validCampo('abcdefghijklmnopqrstuvwxyziou@0123456789._-');
        $('#direccion').validCampo('abcdefghijklmnopqrstuvwxyziou()"0123456789._-#°');
        $('#direccion2').validCampo('abcdefghijklmnopqrstuvwxyziou()"0123456789._-#°');
    });
    
    
    $(function() {
     $("#cumpleanio").datetimepicker({
            // format: "DD-MM-YYYY",  
            format: "YYYY-MM-DD",  
            maxDate:  moment(),
            minDate: moment().subtract(99, 'year'),
            timepicker:false,
            autoclose: true,
            showButtonPanel: true,
            locale:'es',
     });
    //  console.log(moment.locale());
    
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
    