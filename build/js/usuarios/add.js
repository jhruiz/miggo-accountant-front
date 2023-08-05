$("#form").submit(function(e) {
    e.preventDefault();   
    
    const form = document.getElementById('form');
    const formData = new FormData(form);
    
    var email = $('#email').val();
    var password = $('#password').val();
    var perfile_id = $('#select-perfiles').val()? $('#select-perfiles').val(): ''; 
    var tercero_id = $('#tercero_id').val();
    var imagen = $('#imagen')[0].files[0] ? $('#imagen')[0].files[0] : '';
    
    
    formData.append("empresa_id", localStorage.empresa_id);
    formData.append("creador_id", localStorage.id);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("perfile_id", perfile_id);
    formData.append("tercero_id", tercero_id);
    formData.append("imagen", imagen);
    
    // const output = document.getElementById('output');
    
    // for (const [key, value] of formData) {
    //   output.textContent += `${key}: ${value}\n`;
    // }
    
    $.ajax({
        method: "POST",
        url: url_back + "users",
        headers: { 
            Authorization: 'Bearer ' + localStorage.access_token
        },
        dataType: "json",
        data: formData,
        contentType: false,//formData
        processData: false,//formData
        success: function(respuesta) {
    
                var mensaje = 'Usuario creado de forma correcta: '+ respuesta.data.email;
                sweetMessage('success', mensaje); 
                $('#main_content').load(url_front + 'usuarios/index.html');
        },
        error: function(respuesta) {
            console.log(respuesta.responseJSON);
            if(respuesta.responseJSON.error){
                $.each(respuesta.responseJSON.error.message, function (key, item) {
                    var mensaje = item[0];
                    sweetMessage('error', mensaje);
                });
            }else if(respuesta.responseJSON.exception){
                var mensaje = 'El Correo no Parece Valido debe revisarlo, no le llegara el correo de verificacion';
                sweetMessage('info', mensaje);
                $('#main_content').load(url_front + 'usuarios/index.html');
            } else {
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
    
    /**
     * Genera el html con los departamentos configurados en la base de datos
     */
    
    
    var crearPerfilHtml = function(data) {
        var html = '<option value="" selected="true" disabled="disabled">Selecione...</option>';
        var arrayNivel = ['Ver (Nivel 0)', 'Crear y Editar (Nivel 1)', 'Eliminar (Nivel 2)'];
    
            $.each(data, function (key, item) {
                html += '<option value="'+ item.id+'">';
                html += item.descripcion+'-'+arrayNivel[item.nivel];
                html += '</option>';
            });
        return html;
    }
    
    var defaultImagen = function(){
        const ul = document.getElementById("mostrarImagen");
        const imagen = document.createElement("img");
        imagen.width = 200;
        imagen.src = url_front + 'usuarios/defecto.jpg';
        ul.appendChild(imagen);
    }
    
    //********************************************************************************************************************************************
    $( document ).ready(function() {
        $('.preloader').hide("slow");
        validarLogin();
        defaultImagen();
    
        obtenerPerfilSelects('perfiles', '#select-perfiles');
    
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