$("#form").submit(function(e) {
    e.preventDefault();   
    
    const form = document.getElementById('form');
    const formData = new FormData(form);
    
    var email = $('#email').val();
    var password = $('#password').val();
    var perfile_id = $('#select-perfiles').val()? $('#select-perfiles').val(): ''; 
    var tercero_id = $('#tercero_id').val();
    var imagen = $('#imagen')[0].files[0] ? $('#imagen')[0].files[0] : '';
    
    formData.append("email", email);
    formData.append("password", password);
    formData.append("perfile_id", perfile_id);
    formData.append("tercero_id", tercero_id);
    formData.append("imagen", imagen);
    formData.append('_method', 'PUT');
    
    // const output = document.getElementById('output');
    
    // for (const [key, value] of formData) {
    //   output.textContent += `${key}: ${value}\n`;
    // }
    
    $.ajax({
        method: "POST",
        url: url_back + "users/"+localStorage.editar,
        headers: { 
            Authorization: 'Bearer ' + localStorage.access_token
        },
        dataType: "json",
        data: formData,
        contentType: false,//formData
        processData: false,//formData
        success: function(respuesta) {
    
            localStorage.editar = '';
            if(respuesta){
                var mensaje = 'Usuario actualizado de forma correcta nombres.: '+ respuesta.data.email;
                sweetMessage('success', mensaje); 
                $('#main_content').load(url_front + 'usuarios/index.html');
            } else {
                var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
                sweetMessage('error', mensaje);
                console.log(respuesta);               
            }
        },
        error: function(respuesta) {
    
            if(respuesta.responseJSON){
                if(respuesta.responseJSON.error){
                    $.each(respuesta.responseJSON.error.message, function (key, item) {
                        var mensaje = item[0];
                        sweetMessage('error', mensaje);
                    });
                }
            }else if(respuesta.responseJSON.exception){
                var mensaje = 'El Correo no Parece Valido debe revisarlo, no le llegara el correo de verificacion';
                sweetMessage('info', mensaje);
                $('#main_content').load(url_front + 'usuarios/index.html');
            }else {
                var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
                sweetMessage('error', mensaje);
            }
     
    
        }
    });
    });
    
    
    //***************************************************autocompletar*******************
    $( "#tercero" ).autocomplete({
        source: function( request, auto ) {
            var url_empl = 'empresas/'+ localStorage.empresa_id+ '/empleados?search='+$('#tercero').val();
    
           $.ajax({
             method: "GET",
             url: url_back + url_empl,
             headers: { 
                Authorization: 'Bearer ' + localStorage.access_token
            },
             dataType: "json",
             success: function(respuesta) {
                auto(respuesta);
             }
           });
        },
        autoFocus: true,
        minLength: 2,
        appendTo: "#ModalLong2",
        select: function (event, ui) {
          // Set selection
          $('#tercero').val(ui.item.label); // display the selected text
          $('#tercero_id').val(ui.item.value); // save selected id to input
          obtenerTercero(ui.item.value);
          return false;
        }
     });
    
    
     //*******************************************************************************************************
     var obtenerTercero = function(id){
        url_ter= 'terceros/' + id;
        $.ajax({
        method: "GET",
        url: url_back + url_ter,
        headers: { 
            Authorization: 'Bearer ' + localStorage.access_token
        },
        dataType: "json",
        success: function(respuesta) {
                $('#tercero').val(respuesta.data.identificacion+'-'+respuesta.data.nombres);
                $('#tercero_id').val(respuesta.data.id);
    
                $('#identificacion').val(respuesta.data.identificacion  );
                $('#verificado').val(respuesta.data.digitoverificacion );
                $('#apellidos').val(respuesta.data.apellidos );
                $('#celular').val(respuesta.data.celular );
                $('#direccion').val(respuesta.data.direccion );
        },
        error: function() {
            var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
            sweetMessage('error', mensaje);
        }
      })  
    }
    //***************************************************trae valores de tercero y usuario si ya exiten (perfil,ciudad,tipodocumento)*******************
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
    
    var obtenerPerfilSelect = function(url, select, id){
        url_tipo= url+ '/' +id;
        var arrayNivel = ['Ver (Nivel 0)', 'Crear y Editar (Nivel 1)', 'Eliminar (Nivel 2)'];
    
        $.ajax({
        method: "GET",
        url: url_back + url_tipo,
        headers: { 
            Authorization: 'Bearer ' + localStorage.access_token
        },
        dataType: "json",
        success: function(respuesta) {
                var html = '';
                html += '<option value="'+ respuesta.data.id+'">';
                html += respuesta.data.descripcion+'-'+ arrayNivel[respuesta.data.nivel];
                html += '</option>';
                obtenerPerfilSelects(url, select, id, html);
        },
        error: function() {
            var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
            sweetMessage('error', mensaje);
        }
      })  
    }
    
    //***************************************************trae valores masivos de perfil,ciudad,tipodocumento*******************
    function obtenerPerfilSelects(url, select, id = null,  base = null) {
    
        $.ajax({
            method: "GET",
            url: url_back + url,
            headers: { 
                Authorization: 'Bearer ' + localStorage.access_token
            },
            dataType: "json",
            success: function(respuesta) {
        
                $(select).html(crearPerfilHtml(respuesta.data, base, id));
            },
            error: function() {
                var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
                sweetMessage('error', mensaje);
            }
          })     
        }
        
        var crearPerfilHtml = function(data, base = null, id = null) {
             var arrayNivel = ['Ver (Nivel 0)', 'Crear y Editar (Nivel 1)', 'Eliminar (Nivel 2)'];
    
            if (base) {
                    var html = base;
                    $.each(data, function (key, item) {
                        if(id != item.id){
                            html += '<option value="'+ item.id+'">';
                            html += item.descripcion+'-'+arrayNivel[item.nivel];
                            html += '</option>';
                        }
                    });
                return html;
            } else {
                    var html = '<option value="" selected="true" disabled="disabled">Selecione...</option>';
                    $.each(data, function (key, item) {
                        html += '<option value="'+ item.id+'">';
                        html += item.descripcion+'-'+arrayNivel[item.nivel];
                        html += '</option>';
                    });
                return html;
            }
        }
    
    //*************************************************************************************************************************************
    function obtenerUsuario(id){
    
    var url = 'users/'+ id;
    
    $.ajax({
        method: "GET",
        url: url_back + url,
        headers: { 
                      Authorization: 'Bearer ' + localStorage.access_token
                  },
        dataType: "json",
        success: function(respuesta) {
    
            $('#email').val(respuesta.data.email);
    
            if(respuesta.data.imagen){
                const ul = document.getElementById("mostrarImagen");
                const imagen = document.createElement("img");
                imagen.width = 200;
                imagen.src = url_img + 'users/'+ respuesta.data.imagen;
                ul.appendChild(imagen);
              }else{
                const ul = document.getElementById("mostrarImagen");
                const imagen = document.createElement("img");
                imagen.width = 200;
                imagen.src = url_front + 'usuarios/defecto.jpg';
                ul.appendChild(imagen);
              }
    
    
            if(respuesta.data.perfile_id){
                obtenerPerfilSelect('perfiles', '#select-perfiles', respuesta.data.perfile_id);
            }else{
                obtenerPerfilSelects('perfiles', '#select-perfiles');
            }
    
            if(respuesta.data.tercero_id){
                if(respuesta.data.tercero.ciudade_id){
                  obtenerCiudad(respuesta.data.tercero.ciudade_id);
                }
              }
    
              if(respuesta.data.tercero_id){
                obtenerTercero(respuesta.data.tercero_id);
            }
    
        },
        error: function() {
            var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
            sweetMessage('error', mensaje);
        }
      })  
    }
    
    
    //********************************************************************************************************************************
    $( document ).ready(function() {
        $('.preloader').hide("slow");
          validarLogin();
    
        obtenerUsuario(localStorage.editar);
    
        $('#email').validCampo('abcdefghijklmnopqrstuvwxyziou@0123456789._-');
        $('#direccion').validCampo('abcdefghijklmnopqrstuvwxyziou()"0123456789._-#°');
    });
    
    $(function() {
        //Date picker
     $("#cumpleanio").datetimepicker({
            locale: "es",
            format: "YYYY-MM-DD",  
            //  defaultDate:"2012/01/01",
            maxDate: new Date("2010-01-01"),//TODO: fijar fecha automatica menos 15 años 
            minDate: '1950-01-01',
            timepicker:false,
            autoclose: true,
            showButtonPanel: true
     });
        // //Date and time picker
        // $('#cumpleaniotime').datetimepicker({ icons: { time: 'far fa-clock' } });
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