$("#formTercero").change(function(e) {
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
    formData.append('_method', 'PUT');
    
    // const output = document.getElementById('output');
    
    // for (const [key, value] of formData) {
    //   output.textContent += `${key}: ${value}\n`;
    // }
    
    $.ajax({
        method: "POST",
        url: url_back + "terceros/"+localStorage.editar,
        headers: { 
            Authorization: 'Bearer ' + localStorage.access_token
        },
        dataType: "json",
        data: formData,
        contentType: false,//formData
        processData: false,//formData
        // async: false,
        success: function(respuesta) {
    
            // localStorage.editar = '';
            if(respuesta){
                var mensaje = 'tercero actualizado de forma correcta nombres.: '+ respuesta.data.nombres;
                sweetMessage('success', mensaje); 
                // $('#main_content').load(url_front + 'terceros/index.html');
            } else {
                var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
                sweetMessage('error', mensaje);
            }
        },
        error: function(respuesta) {
    
            console.log(respuesta.responseJSON.error);
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
    
    
    //***************************************************trae valores de tercero y tercero si ya exiten (perfil,ciudad,tipodocumento)*******************
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
    
    //******************************************************************************************************************************************
    
    function obtenertercero(id){
    var url = 'terceros/'+ id;
    
    $.ajax({
        method: "GET",
        url: url_back + url,
        headers: { 
                      Authorization: 'Bearer ' + localStorage.access_token
                  },
        dataType: "json",
        success: function(respuesta) {
    
            $('#nombres').val(respuesta.data.nombres);
            $('#apellidos').val(respuesta.data.apellidos);
            $('#razonsocial').val(respuesta.data.razonsocial);
            $('#representantelegal').val(respuesta.data.representantelegal);
            $('#identificacion').val(respuesta.data.identificacion);
            $('#verificado').val(respuesta.data.digitoverificacion);
            $('#direccion').val(respuesta.data.direccion);
            $('#direccion2').val(respuesta.data.direccion2);
            $('#celular').val(respuesta.data.celular);
            $('#telefono').val(respuesta.data.telefono);
            $('#email').val(respuesta.data.email);
            $('#cumpleanios').val(respuesta.data.cumpleanios);
            $('#contactocelular').val(respuesta.data.contactocelular);
            $('#contactonombre').val(respuesta.data.contactonombre);
    
            respuesta.data.autoretenedorrenta == 1 ? $('#autoretenedorrenta').prop( "checked", true ) : $('#autoretenedorrenta').prop( "checked", false );
            respuesta.data.autoretenedorica == 1 ? $('#autoretenedorica').prop( "checked", true ) : $('#autoretenedorica').prop( "checked", false );
        
            if(respuesta.data.imagen){
                const ul = document.getElementById("mostrarImagen");
                const imagen = document.createElement("img");
                imagen.width = 200;
                imagen.src = url_img + 'terceros/'+ respuesta.data.imagen;
                ul.appendChild(imagen);
              }else{
                const ul = document.getElementById("mostrarImagen");
                const imagen = document.createElement("img");
                imagen.width = 200;
                imagen.src = url_front + 'terceros/defecto.jpg';
                ul.appendChild(imagen);
              }
    
           if(respuesta.data.ciiuclase_id){
                obtenerCiiu(respuesta.data.ciiuclase_id);
            }
    
            if(respuesta.data.ciudade_id){
                obtenerCiudad(respuesta.data.ciudade_id);
            }
    
            if(respuesta.data.tipoidentificacione_id){
                obtenerSelect('tipoidentificaciones', '#select-identificacion', respuesta.data.tipoidentificacione_id);
                if(respuesta.data.digitoverificacion != ''){
                    $("#divDigito").show();
                    }
            }else{
                obtenerSelects('tipoidentificaciones', '#select-identificacion');
            }
    
            if(respuesta.data.tipodireccione_id){
                obtenerSelect('tipodirecciones', '#select-tipodirecciones', respuesta.data.tipodireccione_id);
    
            }else{
                obtenerSelects('tipodirecciones', '#select-tipodirecciones');
            }
    
            if(respuesta.data.tipodireccione2_id){
                obtenerSelect('tipodirecciones', '#select-tipodirecciones2', respuesta.data.tipodireccione2_id);
    
            }else{
                obtenerSelects('tipodirecciones', '#select-tipodirecciones2');
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
    
            if(respuesta.data.tipocontribuyente_id){
                obtenerSelect('tipocontribuyentes', '#select-tipocontribuyentes', respuesta.data.tipocontribuyente_id);
            }else{
                obtenerSelects('tipocontribuyentes', '#select-tipocontribuyentes');
            }
    
            if(respuesta.data.contacto_id){
                obtenerSelect('contactos', '#select-contactos', respuesta.data.contacto_id);
            }else{
                obtenerSelects('contactos', '#select-contactos');
            }
    
              //***************** check*****************************
    
            if(respuesta.data.clientes){
                marcarCheck(respuesta.data.clientes, localStorage.empresa_id, '#cliente','#divC');
            }
    
            if(respuesta.data.proveedores){
                marcarCheck(respuesta.data.proveedores, localStorage.empresa_id, '#proveedore','#divP');
            }
    
            if(respuesta.data.empleados){
                marcarCheck(respuesta.data.empleados, localStorage.empresa_id, '#empleado','#divE');
            }
    
            if(respuesta.data.entnominas){
                marcarCheck(respuesta.data.entnominas, localStorage.empresa_id, '#entnomina','#divN');
            }
    
            if(respuesta.data.socios){
              marcarCheck(respuesta.data.socios, localStorage.empresa_id, '#socio','#divS');
            }
    
            if(respuesta.data.otrosterceros){
                marcarCheck(respuesta.data.otrosterceros, localStorage.empresa_id, '#otrostercero','#divO');
            }
    
            if(respuesta.data.mastercardyvisas){
                marcarCheck(respuesta.data.mastercardyvisas, localStorage.empresa_id, '#mastercardyvisa','#divM');
            }
    
        },
        error: function() {
            var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
            sweetMessage('error', mensaje);
        }
      })  
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
    
                  $("#verificado").val('');
    
                  if(respuesta.data.digitoverificacion == 1){
                      $("#divDigito").show();
                  }else{
                      $("#divDigito").hide();
                  }
              }
          }); 
      }
    }
    
    
    
    //******************************************* marcar terceros cuando ya existen********************************************************************
    // marcarCheck(respuesta.data.empleados, localStorage.empresa_id, '#empleado','#divE');
    
    var marcarCheck = function(arre, empresa_id, html_id, div){
    
      $.each(arre, function (key, item) {
          if(empresa_id == arre[key].empresa_id){
              $(html_id).prop( "checked", true);
              $(div).show();
              $(html_id).prop('disabled', true);
              $(html_id+"_id").val(arre[key].id);
    
              switch (html_id) { 
                              case '#cliente': 
                                    $('#entnomina').prop('disabled', true);
                                    $('#mastercardyvisa').prop('disabled', true);
                                break;
                              case '#proveedore': 
                                    $('#entnomina').prop('disabled', true);
                                    $('#mastercardyvisa').prop('disabled', true);
                                break;
                              case '#empleado': 
                                    $('#entnomina').prop('disabled', true);
                                    $('#mastercardyvisa').prop('disabled', true);
                                break;		
                              case '#entnomina': 
                                    $('#cliente').prop('disabled', true);
                                    $('#proveedore').prop('disabled', true);
                                    $('#empleado').prop('disabled', true);
                                    $('#socio').prop('disabled', true);
                                    $('#otrostercero').prop('disabled', true);
                                    $('#mastercardyvisa').prop('disabled', true);
                                break;	
                                case '#socio': 
                                    $('#entnomina').prop('disabled', true);
                                    $('#mastercardyvisa').prop('disabled', true);
                                break;
                                case '#otrostercero': 
                                    $('#entnomina').prop('disabled', true);
                                    $('#mastercardyvisa').prop('disabled', true);
                                break;
                                case '#mastercardyvisa': 
                                    $('#cliente').prop('disabled', true);
                                    $('#proveedore').prop('disabled', true);
                                    $('#empleado').prop('disabled', true);
                                    $('#socio').prop('disabled', true);
                                    $('#otrostercero').prop('disabled', true);
                                    $('#entnomina').prop('disabled', true);
                                break;
                                default:break;
    
                            }
          }
    
      });
    
    }
    
    //***************************************** Creacion Terceros Especificos **************************************************************************
    $('#cliente').click(function(){    
      if($('input[id=cliente]').is(':checked')){
            var bool = confirm('¿Desea que este tercero sea un cliente?');
            if(bool){
                $('#cliente').prop( "checked", true )
                $("#divC").show();
                $('#cliente').prop('disabled', true);
                creardetallesTercero(localStorage.editar, 'clientes');
                $('#entnomina').prop('disabled', true);
                $('#mastercardyvisa').prop('disabled', true);
            }else{
                $('#cliente').prop( "checked", false )
            }
        }
    });
    
    $('#proveedore').click(function(){    
    if($('input[id=proveedore]').is(':checked')){
          var bool = confirm('¿Desea que este tercero sea un Proveedor?');
          if(bool){
              $('#proveedore').prop( "checked", true )
              $("#divP").show();
              $('#proveedore').prop('disabled', true);
              creardetallesTercero(localStorage.editar, 'proveedores');
              $('#entnomina').prop('disabled', true);
              $('#mastercardyvisa').prop('disabled', true);
          }else{
              $('#proveedore').prop( "checked", false )
          }
      }
    });
    
    $('#empleado').click(function(){    
    if($('input[id=empleado]').is(':checked')){
          var bool = confirm('¿Desea que este tercero sea un Empleado?');
          if(bool){
              $('#empleado').prop( "checked", true )
              $("#divE").show();
              $('#empleado').prop('disabled', true);
              creardetallesTercero(localStorage.editar, 'empleados');
              $('#entnomina').prop('disabled', true);
              $('#mastercardyvisa').prop('disabled', true);
          }else{
              $('#empleado').prop( "checked", false )
          }
      }
    });
    
    $('#entnomina').click(function(){    
    if($('input[id=entnomina]').is(':checked')){
          var bool = confirm('¿Desea que este tercero sea un Entidades Nomina?');
          if(bool){
              $('#entnomina').prop( "checked", true )
              $("#divN").show();
              $('#entnomina').prop('disabled', true);
              creardetallesTercero(localStorage.editar, 'entnominas');
              $('#cliente').prop('disabled', true);
              $('#proveedore').prop('disabled', true);
              $('#empleado').prop('disabled', true);
              $('#socio').prop('disabled', true);
              $('#otrostercero').prop('disabled', true);
              $('#mastercardyvisa').prop('disabled', true);
          }else{
              $('#entnomina').prop( "checked", false )
          }
      }
    });
    
    $('#socio').click(function(){    
    if($('input[id=socio]').is(':checked')){
          var bool = confirm('¿Desea que este tercero sea un Socio?');
          if(bool){
              $('#socio').prop( "checked", true )
              $("#divS").show();
              $('#socio').prop('disabled', true);
              creardetallesTercero(localStorage.editar, 'socios');
              $('#entnomina').prop('disabled', true);
              $('#mastercardyvisa').prop('disabled', true);
          }else{
              $('#socio').prop( "checked", false )
          }
      }
    });
    
    $('#otrostercero').click(function(){    
    if($('input[id=otrostercero]').is(':checked')){
          var bool = confirm('¿Desea que este tercero sea un Otros Terceros?');
          if(bool){
              $('#otrostercero').prop( "checked", true )
              $("#divO").show();
              $('#otrostercero').prop('disabled', true);
              creardetallesTercero(localStorage.editar, 'otrosterceros');
              $('#entnomina').prop('disabled', true);
              $('#mastercardyvisa').prop('disabled', true);
          }else{
              $('#otrostercero').prop( "checked", false )
          }
      }
    });
    
    $('#mastercardyvisa').click(function(){    
    if($('input[id=mastercardyvisa]').is(':checked')){
          var bool = confirm('¿Desea que este tercero sea Catalogado como Mastercard o Visa?');
          if(bool){
              $('#mastercardyvisa').prop( "checked", true )
              $("#divM").show();
              $('#mastercardyvisa').prop('disabled', true);
              creardetallesTercero(localStorage.editar, 'mastercardyvisas');
              $('#cliente').prop('disabled', true);
              $('#proveedore').prop('disabled', true);
              $('#empleado').prop('disabled', true);
              $('#socio').prop('disabled', true);
              $('#otrostercero').prop('disabled', true);
              $('#entnomina').prop('disabled', true);
          }else{
              $('#mastercardyvisa').prop( "checked", false )
          }
      }
    });
    
    //*********************************************************Botones de terceros Especificos Clientes ****************************************************
    
    $("#clientebtnver").click(function(event) {
      event.preventDefault();
      var id =  $("#cliente_id").val();
    
      $('#mymodal').html('');
      localStorage.setItem('vertercero', id);
      $('#mymodal').load('../terceros/clientes/show.html',function(){
            $('#exampleModalLong').modal({show:true});
        });
    });
    
    $("#clientebtnedit").click(function(event) {
      event.preventDefault();
      var id =  $("#cliente_id").val();
    
      $('#mymodal').html('');
      localStorage.setItem('editartercero', id);
    
      $('#mymodal').load('../terceros/clientes/edit.html',function(){
            $('#ModalLong2').modal({show:true});
      });
    });
    
    $("#clientebtndelete").click(function(event) {
      event.preventDefault();
      var id =  $("#cliente_id").val();
      var url_eliminar = 'clientes/' + id;
      var url_index = 'terceros/edit.html';
    
        if (confirm('¿Está seguro de Borrar el Cliente?')){
    
                $.ajax({
                  method: "DELETE",
                  url: url_back + url_eliminar,
                  headers: { 
                                Authorization: 'Bearer ' + localStorage.access_token
                            },
                  dataType: "json",
                  success: function(respuesta) {
    
                      var mensaje = 'se borro exitosamente el Cliente';
                      sweetMessage('success', mensaje);
                      
                      // $('#main_content').load(url_front + url_index);
    
                      $('#cliente').prop( "checked", false)
                      $('#cliente').prop('disabled', false);
                      $("#divC").hide();
                  },
                  error: function() {
                      var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
                      sweetMessage('error', mensaje);
                  }
                })  
        } else{
          return false;
        }
    });
    
    //*********************************************************Botones de terceros Especificos Proveedor ****************************************************
    
    $("#proveedorebtnver").click(function(event) {
    event.preventDefault();
    var id =  $("#proveedore_id").val();
    
    $('#mymodal').html('');
    localStorage.setItem('vertercero', id);
    $('#mymodal').load('../terceros/proveedores/show.html',function(){
          $('#exampleModalLong').modal({show:true});
      });
    });
    
    
    $("#proveedorebtnedit").click(function(event) {
    event.preventDefault();
    var id =  $("#proveedore_id").val();
    
    $('#mymodal').html('');
    localStorage.setItem('editartercero', id);
    
    $('#mymodal').load('../terceros/proveedores/edit.html',function(){
          $('#ModalLong2').modal({show:true});
    });
    });
    
    $("#proveedorebtndelete").click(function(event) {
    event.preventDefault();
    var id =  $("#proveedore_id").val();
    
    var url_eliminar = 'proveedores/' + id;
    var url_index = 'terceros/edit.html';
    
      if (confirm('¿Está seguro de Borrar Este Proveedor?')){
    
              $.ajax({
                method: "DELETE",
                url: url_back + url_eliminar,
                headers: { 
                              Authorization: 'Bearer ' + localStorage.access_token
                          },
                dataType: "json",
                success: function(respuesta) {
    
                    var mensaje = 'se borro exitosamente el Proveedor';
                    sweetMessage('success', mensaje);
                    
                    $('#proveedore').prop( "checked", false)
                    $('#proveedore').prop('disabled', false);
                    $("#divP").hide();
                },
                error: function() {
                    var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
                    sweetMessage('error', mensaje);
                }
              })  
      } else{
        return false;
      }
    });
    
    
    
    //*********************************************************Botones de terceros Especificos Empleados ****************************************************
    
    $("#empleadobtnver").click(function(event) {
    event.preventDefault();
    var id =  $("#empleado_id").val();
    
      $('#mymodal').html('');
      localStorage.setItem('vertercero', id);
      $('#mymodal').load('../terceros/empleados/show.html',function(){
            $('#exampleModalLong').modal({show:true});
        });
    });
    
    
    $("#empleadobtnedit").click(function(event) {
    event.preventDefault();
    var id =  $("#empleado_id").val();
    
      $('#mymodal').html('');
      localStorage.setItem('editartercero', id);
    
      $('#mymodal').load('../terceros/empleados/edit.html',function(){
            $('#ModalLong2').modal({show:true});
      });
    });
    
    $("#empleadobtndelete").click(function(event) {
    event.preventDefault();
    var id =  $("#empleado_id").val();
    
    var url_eliminar = 'empleados/' + id;
    var url_index = 'terceros/edit.html';
    
      if (confirm('¿Está seguro de Borrar Este Empleado?')){
    
              $.ajax({
                method: "DELETE",
                url: url_back + url_eliminar,
                headers: { 
                              Authorization: 'Bearer ' + localStorage.access_token
                          },
                dataType: "json",
                success: function(respuesta) {
    
                    var mensaje = 'se borro exitosamente el Empleado';
                    sweetMessage('success', mensaje);
                    
                    $('#empleado').prop( "checked", false)
                    $('#empleado').prop('disabled', false);
                    $("#divE").hide();
                },
                error: function() {
                    var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
                    sweetMessage('error', mensaje);
                }
              })  
      } else{
        return false;
      }
    });
    
    
    //*********************************************************Botones de terceros Especificos Entidad Nomina ****************************************************
    
    $("#entnominabtnver").click(function(event) {
    event.preventDefault();
    var id =  $("#entnomina_id").val();
    
      $('#mymodal').html('');
      localStorage.setItem('vertercero', id);
      $('#mymodal').load('../terceros/entnominas/show.html',function(){
            $('#exampleModalLong').modal({show:true});
        });
    });
    
    
    $("#entnominabtnedit").click(function(event) {
    event.preventDefault();
    var id =  $("#entnomina_id").val();
    
      $('#mymodal').html('');
      localStorage.setItem('editartercero', id);
    
      $('#mymodal').load('../terceros/entnominas/edit.html',function(){
            $('#ModalLong2').modal({show:true});
      });
    });
    
    $("#entnominabtndelete").click(function(event) {
    event.preventDefault();
    var id =  $("#entnomina_id").val();
    
    var url_eliminar = 'entnominas/' + id;
    var url_index = 'terceros/edit.html';
    
      if (confirm('¿Está seguro de Borrar Esta Entidad Nomina?')){
    
              $.ajax({
                method: "DELETE",
                url: url_back + url_eliminar,
                headers: { 
                              Authorization: 'Bearer ' + localStorage.access_token
                          },
                dataType: "json",
                success: function(respuesta) {
    
                    var mensaje = 'se borro exitosamente la Entidad Nomina';
                    sweetMessage('success', mensaje);
                    
                    $('#entnomina').prop( "checked", false)
                    $('#entnomina').prop('disabled', false);
                    $("#divN").hide();
    
                    $('#cliente').prop('disabled', false);
                    $('#proveedore').prop('disabled', false);
                    $('#empleado').prop('disabled', false);
                    $('#socio').prop('disabled', false);
                    $('#otrostercero').prop('disabled', false);
                    $('#mastercardyvisa').prop('disabled', false);
                },
                error: function() {
                    var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
                    sweetMessage('error', mensaje);
                }
              })  
      } else{
        return false;
      }
    });
    
    //*********************************************************Botones de terceros Especificos Socio****************************************************
    
    $("#sociobtnver").click(function(event) {
    event.preventDefault();
    var id =  $("#socio_id").val();
    
      $('#mymodal').html('');
      localStorage.setItem('vertercero', id);
      $('#mymodal').load('../terceros/socios/show.html',function(){
            $('#exampleModalLong').modal({show:true});
        });
    });
    
    
    $("#sociobtnedit").click(function(event) {
    event.preventDefault();
    var id =  $("#socio_id").val();
    
      $('#mymodal').html('');
      localStorage.setItem('editartercero', id);
    
      $('#mymodal').load('../terceros/socios/edit.html',function(){
            $('#ModalLong2').modal({show:true});
      });
    });
    
    $("#sociobtndelete").click(function(event) {
    event.preventDefault();
    var id =  $("#socio_id").val();
    
    var url_eliminar = 'socios/' + id;
    var url_index = 'terceros/edit.html';
    
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
                    
                    $('#socio').prop( "checked", false)
                    $('#socio').prop('disabled', false);
                    $("#divS").hide();
                },
                error: function() {
                    var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
                    sweetMessage('error', mensaje);
                }
              })  
      } else{
        return false;
      }
    });
    
    
    var verificarSucursal = function(){
      if(localStorage.sucursal == ''){
        $("#divEmpresa").show();
      }
    }
    
    
    //*********************************************************Botones de Otro tercero****************************************************
    
    $("#otrostercerobtnver").click(function(event) {
    event.preventDefault();
    var id =  $("#otrostercero_id").val();
    
      $('#mymodal').html('');
      localStorage.setItem('vertercero', id);
      $('#mymodal').load('../terceros/otrosterceros/show.html',function(){
            $('#exampleModalLong').modal({show:true});
        });
    });
    
    
    $("#otrostercerobtnedit").click(function(event) {
        event.preventDefault();
        var id =  $("#otrostercero_id").val();
    
      $('#mymodal').html('');
      localStorage.setItem('editartercero', id);
    
      $('#mymodal').load('../terceros/otrosterceros/edit.html',function(){
            $('#ModalLong2').modal({show:true});
      });
    });
    
    $("#otrostercerobtndelete").click(function(event) {
    event.preventDefault();
    var id =  $("#otrostercero_id").val();
    
    var url_eliminar = 'otrosterceros/' + id;
    var url_index = 'terceros/edit.html';
    
      if (confirm('¿Está seguro de Borrar este Otro Tercero?')){
    
              $.ajax({
                method: "DELETE",
                url: url_back + url_eliminar,
                headers: { 
                              Authorization: 'Bearer ' + localStorage.access_token
                          },
                dataType: "json",
                success: function(respuesta) {
    
                    var mensaje = 'se borro exitosamente el Otro Tercero';
                    sweetMessage('success', mensaje);
                    
                    $('#otrostercero').prop( "checked", false)
                    $('#otrostercero').prop('disabled', false);
                    $("#divO").hide();
                },
                error: function() {
                    var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
                    sweetMessage('error', mensaje);
                }
              })  
      } else{
        return false;
      }
    });
    
    
    //*********************************************************Botones de Mastercard y Visa****************************************************
    
    $("#mastercardyvisabtnver").click(function(event) {
    event.preventDefault();
    var id =  $("#mastercardyvisa_id").val();
    
      $('#mymodal').html('');
      localStorage.setItem('vertercero', id);
      $('#mymodal').load('../terceros/mastercardyvisas/show.html',function(){
            $('#exampleModalLong').modal({show:true});
        });
    });
    
    
    $("#mastercardyvisabtnedit").click(function(event) {
    event.preventDefault();
    var id =  $("#mastercardyvisa_id").val();
    
      $('#mymodal').html('');
      localStorage.setItem('editartercero', id);
    
      $('#mymodal').load('../terceros/mastercardyvisas/edit.html',function(){
            $('#ModalLong2').modal({show:true});
      });
    });
    
    $("#mastercardyvisabtndelete").click(function(event) {
    event.preventDefault();
    var id =  $("#mastercardyvisa_id").val();
    
    var url_eliminar = 'mastercardyvisas/' + id;
    var url_index = 'terceros/edit.html';
    
      if (confirm('¿Está seguro de Borrar este Tercero?')){
    
              $.ajax({
                method: "DELETE",
                url: url_back + url_eliminar,
                headers: { 
                              Authorization: 'Bearer ' + localStorage.access_token
                          },
                dataType: "json",
                success: function(respuesta) {
    
                    var mensaje = 'se borro exitosamente el Tercero';
                    sweetMessage('success', mensaje);
                    
                    $('#mastercardyvisa').prop( "checked", false)
                    $('#mastercardyvisa').prop('disabled', false);
                    $("#divM").hide();
    
                    $('#cliente').prop('disabled', false);
                    $('#proveedore').prop('disabled', false);
                    $('#empleado').prop('disabled', false);
                    $('#socio').prop('disabled', false);
                    $('#otrostercero').prop('disabled', false);
                    $('#entnomina').prop('disabled', false);
                },
                error: function() {
                    var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
                    sweetMessage('error', mensaje);
                }
              })  
      } else{
        return false;
      }
    });
    //*********************************************************crear detalles de terceros****************************************************
    
    function creardetallesTercero(id, url){
    var url_tercero = 'terceros/edit.html';
    var url_store = url;
    
    const formTercero = document.getElementById('formTercero');
    const formData = new FormData(formTercero);
    
    formData.append("tercero_id", id);
    formData.append("empresa_id", localStorage.empresa_id);
    formData.append("creador_id", localStorage.id);
    
      $.ajax({
              method: "POST",
              url: url_back + url_store,
              headers: { 
                  Authorization: 'Bearer ' + localStorage.access_token
              },
              dataType: "json",
              data: formData,
              contentType: false,
              processData: false,
              success: function(respuesta) {
    
                htmlid = '#'+url.substr(0, url.length - 1)+"_id";
                $(htmlid).val(respuesta.data.id);
    
                var mensaje = 'Se creo Correctamente: ' + url;
                  sweetMessage('success', mensaje);
                  // $('#main_content').load(url_front + url_tercero);
              },
              error: function() {
                  var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde';
                  sweetMessage('error', mensaje);
              }
          }) 
    }
    
    
    //******************************************************************************************************************************************
    $( document ).ready(function() {
        $('.preloader').hide("slow");
          validarLogin();
    
          $("#select-identificacion").on("change",mostrardivDigito);
          $("#identificacion").on("change",calcularDigito); // Digito de verificacion
          $("#select-departamento").on("change",recargarDepartamento); 
    
        obtenertercero(localStorage.editar);
        obtenerDepartamentos();
        verificarSucursal();
    
        $('#email').validCampo('abcdefghijklmnopqrstuvwxyziou@0123456789._-');
        $('#direccion').validCampo('abcdefghijklmnopqrstuvwxyziou()"0123456789._-#°');
        $('#direccion2').validCampo('abcdefghijklmnopqrstuvwxyziou()"0123456789._-#°');
    });
    
    $(function() {
     $("#cumpleanio").datetimepicker({
            locale: "es",
            format: "YYYY-MM-DD",  
            maxDate: moment(),
            minDate: moment().subtract(99, 'year'),
            timepicker:false,
            autoclose: true,
            showButtonPanel: true,
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