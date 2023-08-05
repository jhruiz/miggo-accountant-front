$("#formEmpresa").change(function(e) {
    e.preventDefault();   
    
    const formEmpresa = document.getElementById('formEmpresa');
    const formData = new FormData(formEmpresa);
    
    var autoretenedor =$('#autoretenedor').is(':checked') ? 1 : 0; //
    var autoretenedorica =$('#autoretenedorica').is(':checked') ? 1 : 0; //
    var autoretenedorrenta =$('#autoretenedorrenta').is(':checked') ? 1 : 0;//
    var ecommerce =$('#ecommerce').is(':checked') ? 1 : 0;//
    var pucedit =$('#pucedit').is(':checked') ? 1 : 0;//
    
    var nombre = $('#nombre').val();//
    var razonsocial = $('#razonsocial').val();//
    var nit = $('#identificacion').val();//
    var digitoverificacion = $('#verificado').val();//
    var direccion = $('#direccion').val();//
    var telefono1 = $('#telefono1').val();//
    var telefono2 = $('#telefono2').val();//
    var email = $('#email').val();//
    var representantelegal = $('#representantelegal').val();//
    // var moneda = $('#moneda').val();
    var texto1 = $('#texto1').val();//
    var texto2 = $('#texto2').val();//
    var texto3 = $('#texto3').val();//
    var texto4 = $('#texto4').val();//
    var fecharesolucion = $('#fecharesoluciones').val();//
    var resolucionautoretenedor = $('#resolucionautoretenedor').val();//
    var contactonombre = $('#contactonombre').val();//
    var contactocelular = $('#contactocelular').val();//
    var ciiuclase_id = $('#ciiu_id').val();//
    var puc_id = $('#puc_id').val();//
    var imagen = $('#imagen')[0].files[0] ? $('#imagen')[0].files[0] : ''; //
    
    var ciudade_id = $('#select-ciudad').val()? $('#select-ciudad').val() : ''; //
    var tipocontribuyente_id = $('#select-tipocontribuyentes').val()? $('#select-tipocontribuyentes').val() : '';// 
    var regimene_id = $('#select-regimenes').val()? $('#select-regimenes').val() : ''; //
    var personeria_id = $('#select-personerias').val()? $('#select-personerias').val() : ''; //
    var tiposociedade_id = $('#select-tiposociedades').val()? $('#select-tiposociedades').val() : ''; //
    var nivelgasto = $('#select-nivelcentro').val()? $('#select-nivelcentro').val() : ''; //
    var contacto_id = $('#select-contactos').val()? $('#select-contactos').val() : ''; //
    
    formData.append("autoretenedor", autoretenedor);
    formData.append("autoretenedorica", autoretenedorica);
    formData.append("autoretenedorrenta", autoretenedorrenta);
    formData.append("ecommerce", ecommerce);
    formData.append("pucedit", pucedit);
    formData.append("nombre", nombre);
    formData.append("razonsocial", razonsocial);
    formData.append("nit", nit);
    formData.append("digitoverificacion", digitoverificacion);
    formData.append("direccion", direccion);
    formData.append("telefono1", telefono1);
    formData.append("telefono2", telefono2);
    formData.append("email", email);
    formData.append("representantelegal", representantelegal);
    // formData.append("moneda", moneda);
    formData.append("texto1", texto1);
    formData.append("texto2", texto2);
    formData.append("texto3", texto3);
    formData.append("texto4", texto4);
    formData.append("fecharesolucion", fecharesolucion);
    formData.append("resolucionautoretenedor", resolucionautoretenedor);
    formData.append("contactonombre", contactonombre);
    formData.append("contactocelular", contactocelular);
    formData.append("ciiuclase_id", ciiuclase_id);
    formData.append("puc_id", puc_id);
    formData.append("imagen", imagen);
    formData.append("ciudade_id", ciudade_id);
    formData.append("tipocontribuyente_id", tipocontribuyente_id);
    formData.append("regimene_id", regimene_id);
    formData.append("personeria_id", personeria_id);
    formData.append("tiposociedade_id", tiposociedade_id);
    formData.append("nivelgasto", nivelgasto);
    formData.append("contacto_id", contacto_id);
    formData.append('_method', 'PUT');
    
    
    $.ajax({
        method: "POST",
        url: url_back + "empresas/"+localStorage.editar,
        headers: { 
            Authorization: 'Bearer ' + localStorage.access_token
        },
        dataType: "json",
        data: formData,
        contentType: false,//formData
        processData: false,//formData
        // async: false,
        success: function(respuesta) {
    
                var mensaje = 'Empresa actualizado de forma correcta nombre.: '+ respuesta.data.nombre;
                sweetMessage('success', mensaje); 
        },
        error: function(respuesta) {
    
            console.log(respuesta.responseJSON);
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
    

    $('#select-retencionicas').on('click',function(){
      var ica_id = $(this).val();
      if(ica_id){
          $('#idica').val(ica_id);
      }
    });
    
    $('#autoretenedorica').on('click',function(){
      var bool = confirm('esta empresa es autoretenedor ICA?');
      if(bool){
          $('#autoretenedorica').prop('disabled', true);
          $('#autoretenedorica').prop( "checked", true );
          $('#crearica').prop('disabled', false);
          $('#verica').prop('disabled', false);
          $('#editarica').prop('disabled', false);
          $('#eliminarica').prop('disabled', false);
      }else{
        $('#autoretenedorica').prop( "checked", false);
      }
    });
    
    
    function eliminarRetencionica(e){
    e.preventDefault();   
    var id = $('#idica').val();
    var url_eliminar = 'icas/' + id;
    
    if(id){
    if (confirm('¿Está seguro de Borrar Este ICA?')){
    
                $.ajax({
              method: "DELETE",
              url: url_back + url_eliminar,
              headers: { 
                            Authorization: 'Bearer ' + localStorage.access_token
                        },
              dataType: "json",
              success: function(respuesta) {
    
                  var mensaje = 'se borro exitosamente '+ respuesta.data.actividad;
                  sweetMessage('success', mensaje);
    
                  obtenerretencionicas();
                  
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
          sweetMessage('error', mensaje);
      }
    }
    
    function verRetencionica(e){
    e.preventDefault();   
    var id = $('#idica').val();
    
    if(id){
      $('#mymodal').html('');
      localStorage.setItem('verica', id);
      $('#mymodal').load('../empresas/retencionicas/show.html',function(){
            $('#ModalLong').modal({show:true});
        });
      }else{
          var mensaje = 'Se presentó un error. Por favor, seleccione un elemento.';
          sweetMessage('error', mensaje);
      }
    }
    
    function editarRetencionica(e){
    e.preventDefault();  
    $('#mymodal').html('');
    var id = $('#idica').val();
    
    if(id){
      $('#mymodal').html('');
      localStorage.setItem('editarica', id);
      $('#mymodal').load('../empresas/retencionicas/edit.html',function(){
            $('#ModalLong2').modal({show:true});
        });
      }else{
          var mensaje = 'Se presentó un error. Por favor, seleccione un elemento.';
          sweetMessage('error', mensaje);
      }
    }
    
    var crearRetencionica = function(e){ //TODO: error se debe crear con la empresa que se edita
        e.preventDefault();   
        $('#mymodal').html('');
    
        $('#mymodal').load('../empresas/retencionicas/add.html',function(){
            $('#ModalLong3').modal({show:true});
        });
    }
    
    
    var verSocio = function(id) {
    event.preventDefault();
    
      $('#mymodal').html('');
      localStorage.setItem('vertercero', id);
      $('#mymodal').load('../terceros/socios/show.html',function(){
            $('#exampleModalLong').modal({show:true});
        });
    };
    
    
    var editarSocio = function(id) {
    event.preventDefault();
    
      $('#mymodal').html('');
      localStorage.setItem('editartercero', id);
    
      $('#mymodal').load('../terceros/socios/edit.html',function(){
            $('#ModalLong2').modal({show:true});
      });
    };
    
    var eliminarSocio = function(id) {
    event.preventDefault();
    
    var url_eliminar = 'socios/' + id;
    var url_index = 'empresas/edit.html';
    
      if (confirm('¿Está seguro de Borrar este Socio?')){
    
              $.ajax({
                method: "DELETE",
                url: url_back + url_eliminar,
                headers: { 
                              Authorization: 'Bearer ' + localStorage.access_token
                          },
                dataType: "json",
                success: function(respuesta) {
    
                    var mensaje = 'se borro exitosamente el Socio';
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
    };
    
    function obtenerretencionicas() {
    var url = 'empresas/'+ localStorage.editar+'/icas';
    $('#select-retencionicas').html('');
    
    $.ajax({
        method: "GET",
        url: url_back + url,    headers: { 
            Authorization: 'Bearer ' + localStorage.access_token
        },
        dataType: "json",
        success: function(respuesta) {
            if(respuesta.count < 5 && respuesta.count != 0){
               $('#crearica').prop('disabled', false);
                $('#select-retencionicas').html(crearHtmlICA(respuesta.data));
            }else{
               $('#crearica').prop('disabled', true);
               $('#select-retencionicas').html(crearHtmlICA(respuesta.data));
            }
        },
        error: function() {
            var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
            sweetMessage('error', mensaje);
        }
      })     
    }
    
    var crearHtmlICA = function(data) {
        var html = '';
            $.each(data, function (key, item) {
                html += '<option value="'+ item.id+'">';
                html += item.tarifa +'-'+ item.actividad;
                html += '</option>';
            });
        return html;
    }
    
    
    var obtenerCiiu = function(id){
        url_ci= 'ciiuclases/' + id;
        $.ajax({
        method: "GET",
        url: url_back + url_ci,
        headers: { 
            Authorization: 'Bearer ' + localStorage.access_token
        },
        dataType: "json",
        success: function(respuesta) {
                $('#ciiu').val(respuesta.data.codigo+'-'+respuesta.data.descripcion);
                $('#ciiu_id').val(respuesta.data.id);
        },
        error: function() {
            var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
            sweetMessage('error', mensaje);
        }
      })  
    }
    
    var obtenerPuc = function(id){
        url_p= 'pucs/' + id;
        $.ajax({
        method: "GET",
        url: url_back + url_p,
        headers: { 
            Authorization: 'Bearer ' + localStorage.access_token
        },
        dataType: "json",
        success: function(respuesta) {
                $('#puc').val(respuesta.data.codigo+'-'+respuesta.data.descripcion);
                $('#puc_id').val(respuesta.data.id);
        },
        error: function() {
            var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
            sweetMessage('error', mensaje);
        }
      })  
    }
    
    var obtenerCiudad = function(id){
        url_ciu= 'ciudades/' + id;
        $.ajax({
        method: "GET",
        url: url_back + url_ciu,
        headers: { 
            Authorization: 'Bearer ' + localStorage.access_token
        },
        dataType: "json",
        success: function(respuesta) {
                var htmlCiudades = '';
                if (respuesta.data.id) {
                    htmlCiudades += '<option value="'+ respuesta.data.id+'">';
                    htmlCiudades += respuesta.data.descripcion;
                    htmlCiudades += '</option>';
                }
                $('#select-ciudad').html(htmlCiudades);
        },
        error: function() {
            var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
            sweetMessage('error', mensaje);
        }
      })  
    }
    
    
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
    
    
    $( "#puc" ).autocomplete({
            source: function( request, response ) {
                var url_puc = 'allpucs/41?search='+$('#puc').val(); //TODO: buscar en todas las 41
    
               // Fetch data
               $.ajax({
                 method: "GET",
                 url: url_back + url_puc,
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
              $('#puc').val(ui.item.label); // display the selected text
              $('#puc_id').val(ui.item.value); // save selected id to input
              return false;
            }
         });
    
    
         var editarDecimal = function() {
        event.preventDefault();
        
        let id = $('#decimale').val();
          $('#mymodal').html('');
          localStorage.setItem('editardecimale', id);
        
          $('#mymodal').load('../empresas/decimale/edit.html',function(){
                $('#ModalLong2').modal({show:true});
          });
        };
    
    
    function obtenerEmpresa(id){
    var url = 'empresas/'+ id;
    
    $.ajax({
        method: "GET",
        url: url_back + url,
        headers: { 
                      Authorization: 'Bearer ' + localStorage.access_token
                  },
        dataType: "json",
        success: function(respuesta) {
    
            $('#nombre').val(respuesta.data.nombre);
            $('#razonsocial').val(respuesta.data.razonsocial);
            $('#identificacion').val(respuesta.data.nit);
            $('#verificado').val(respuesta.data.digitoverificacion);
            $('#direccion').val(respuesta.data.direccion);
            $('#telefono1').val(respuesta.data.telefono1);
            $('#telefono2').val(respuesta.data.telefono2);
            $('#email').val(respuesta.data.email);
            $('#representantelegal').val(respuesta.data.representantelegal);
            $('#moneda').val(respuesta.data.moneda);
            $('#texto1').val(respuesta.data.texto1);
            $('#texto2').val(respuesta.data.texto2);
            $('#texto3').val(respuesta.data.texto3);
            $('#texto4').val(respuesta.data.texto4);
            $('#fecharesoluciones').val(respuesta.data.fecharesolucion);
            $('#resolucionautoretenedor').val(respuesta.data.resolucionautoretenedor);
            $('#select-nivelcentro').val(respuesta.data.nivelgasto);
            $('#contactonombre').val(respuesta.data.contactonombre);
            $('#contactocelular').val(respuesta.data.contactocelular);
    
            $('#decimale').val(respuesta.data.decimale.id);
        
            let decimalMoneda = 'Cantidad decimales para la Moneda son: '+ respuesta.data.decimale.decimalMoneda;
            $('#decimalMoneda').text(decimalMoneda);
    
            let decimalPeso = 'Cantidad decimales para el Peso son: '+ respuesta.data.decimale.decimalPeso;
            $('#decimalPeso').text(decimalPeso);
    
            respuesta.data.autoretenedor == 1 ? $('#autoretenedor').prop( "checked", true ) : $('#autoretenedor').prop( "checked", false );
            respuesta.data.autoretenedorica == 1 ? $('#autoretenedorica').prop( "checked", true ) : $('#autoretenedorica').prop( "checked", false );
            respuesta.data.autoretenedorrenta == 1 ? $('#autoretenedorrenta').prop( "checked", true ) : $('#autoretenedorrenta').prop( "checked", false );
            respuesta.data.ecommerce == 1 ? $('#ecommerce').prop( "checked", true ) : $('#ecommerce').prop( "checked", false );
            respuesta.data.pucedit == 1 ? $('#pucedit').prop( "checked", true ) : $('#pucedit').prop( "checked", false );
           
            if($('input[id=pucedit]').is(':checked')){
               $('#pucedit').prop('disabled', true);
            }
    
            if($('input[id=autoretenedor]').is(':checked')){
                $("#div").show();
                $("#divf").show();
            }
    
            if(!$('input[id=autoretenedorica]').is(':checked')){
                $('#crearica').prop('disabled', true);
                $('#verica').prop('disabled', true);
                $('#editarica').prop('disabled', true);
                $('#eliminarica').prop('disabled', true);
    
            }else{
                $('#autoretenedorica').prop('disabled', true);
                $('#crearica').prop('disabled', false);
                $('#verica').prop('disabled', false);
                $('#editarica').prop('disabled', false);
                $('#eliminarica').prop('disabled', false);
            }
    
    
            if(respuesta.data.imagen){
                $('#mostrarImagen').html('');
                const ul = document.getElementById("mostrarImagen");
                const imagen = document.createElement("img");
                imagen.width = 200;
                imagen.src = url_img + 'empresas/'+ respuesta.data.imagen;
                ul.appendChild(imagen);
              }else{
                $('#mostrarImagen').html('');
                const ul = document.getElementById("mostrarImagen");
                const imagen = document.createElement("img");
                imagen.width = 200;
                imagen.src = url_front + 'empresas/defecto.jpg';
                ul.appendChild(imagen);
              }
    
            if(respuesta.data.ciudade_id){
                obtenerCiudad(respuesta.data.ciudade_id);
            }
    
            if(respuesta.data.puc_id){
                obtenerPuc(respuesta.data.puc_id);
            }
    
            if(respuesta.data.ciiuclase_id){
                obtenerCiiu(respuesta.data.ciiuclase_id);
            }
    
            if(respuesta.data.contacto_id){
                obtenerSelect('contactos', '#select-contactos', respuesta.data.contacto_id);
            }else{
                obtenerSelects('contactos', '#select-contactos');
            }
    
            if(respuesta.data.tipocontribuyente_id){
                obtenerSelect('tipocontribuyentes', '#select-tipocontribuyentes', respuesta.data.tipocontribuyente_id);
            }else{
                obtenerSelects('tipocontribuyentes', '#select-tipocontribuyentes');
            }
    
            if(respuesta.data.regimene_id){
                obtenerSelect('regimenes', '#select-regimenes', respuesta.data.regimene_id);
            }else{
                obtenerSelects('regimenes', '#select-regimenes');
            }
    
            if(respuesta.data.personeria_id){
                obtenerSelect('personerias', '#select-personerias', respuesta.data.personeria_id);
            }else{
                obtenerSelects('personerias', '#select-personerias');
            }
    
            if(respuesta.data.tiposociedade_id){
                obtenerSelect('tiposociedades', '#select-tiposociedades', respuesta.data.tiposociedade_id);
    
            }else{
                obtenerSelects('tiposociedades', '#select-tiposociedades');
            }
    
        },
        error: function() {
            var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
            sweetMessage('error', mensaje);
        }
      })  
    }
    
    
    $('#autoretenedor').change(function(){    
        if($('input[id=autoretenedor]').is(':checked')){
            $("#div").show();
            $("#divf").show();
        }else{
            $("#div").hide();
            $("#divf").hide();
        }
    });
    
    $('#pucedit').click(function(){    
        var bool = confirm(localStorage.msgpuc);
        if(bool){
            $('#pucedit').prop( "checked", true )
        }else{
            $('#pucedit').prop( "checked", false )
        }
    });
    
    
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
    
    
    $( document ).ready(function() {  
        $('.preloader').hide("slow");
          validarLogin();
    
        $("#identificacion").on("change",calcularDigito); // Digito de verificacion
    
        $("#crearica").on("click",crearRetencionica); 
        $("#editarica").on("click",editarRetencionica); 
        $("#verica").on("click",verRetencionica); 
        $("#eliminarica").on("click",eliminarRetencionica); 
    
        obtenerretencionicas();
        obtenerEmpresa(localStorage.editar);
        obtenerDepartamentos();
    
        $('#editarDecimal').on("click",editarDecimal);
        $("#select-departamento").on("change",recargarDepartamento); 
    
        $('#email').validCampo('abcdefghijklmnopqrstuvwxyziou@0123456789._-');
        $('#direccion').validCampo('abcdefghijklmnopqrstuvwxyziou()"0123456789._-#°');
    });
    
    
    $(function() {
        //Date picker
     $("#fecharesolucione").datetimepicker({
            locale: "es",
            format: "YYYY-MM-DD",  
            maxDate: moment(),
            minDate: moment().subtract(99, 'year'),
            timepicker:false,
            autoclose: true,
            showButtonPanel: true
     });
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