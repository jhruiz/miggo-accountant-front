$("#form").change(function(e) {
    e.preventDefault();   
    
    const form = document.getElementById('form');
    const formData = new FormData(form);
    
    var nombre =$('#nombre').val();
    var codigo =$('#codigo').val();
    var direccion = $('#direccion').val();
    var adquisicionfecha = $('#adquisicionfechas').val();
    var depreciarmesescompra = $('#depreciarmesescompra').val();
    var depreciaraniocompra = $('#depreciaraniocompra').val();
    var salvamento = $('#salvamento').val();
    var depreciaranio = $('#depreciaranio').val();
    var depreciarmeses = $('#depreciarmeses').val();
    var residuo = $('#residuo').val();
    var observaciones = $('#observaciones').val();
    var costohora = $('#costohora').val();
    var imagen = $('#imagen')[0].files[0] ? $('#imagen')[0].files[0] : '';
    var puc_id = $('#puc_id').val();

    var depreciaraniocompraniif = $('#depreciaraniocompraniif').val();
    var depreciarmesescompraniif = $('#depreciarmesescompraniif').val();
    var salvamentoniif = $('#salvamentoniif').val();
    var vlrnrorazonable = $('#vlrnrorazonable').val();
    var niif_id = $('#niif_id').val();
    
    var alquilable =$('#alquilable').val()? 1 : 0;
    var ciudade_id = $('#select-ciudad').val()? $('#select-ciudad').val() : '';
    var centrocosto_id = $('#select-nivelcentrocostos').val()? $('#select-nivelcentrocostos').val() : ''; 
    var estadoactivo_id = $('#select-estadoactivos').val()? $('#select-estadoactivos').val() : ''; 
    var responsable_id = $('#tercero_id').val(); 
    var gruposactivosfijo_id = $('#select-gruposactivosfijo').val()? $('#select-gruposactivosfijo').val() : ''; 
    
    var nivelcentrocosto = '';
    if(localStorage.nivelgasto == 1){
        nivelcentrocosto = 'divisiones'; 
    }else if(localStorage.nivelgasto == 2){
        nivelcentrocosto = 'secciones'; 
    }else if(localStorage.nivelgasto == 3){
        nivelcentrocosto = 'dependencias';
    }
    
    formData.append("nombre", nombre);
    formData.append("codigo", codigo);
    formData.append("direccion", direccion);
    formData.append("adquisicionfecha", adquisicionfecha);
    formData.append("depreciarmesescompra", depreciarmesescompra);
    formData.append("depreciaraniocompra", depreciaraniocompra);
    formData.append("salvamento", salvamento);
    formData.append("depreciaranio", depreciaranio);
    formData.append("depreciarmeses", depreciarmeses);
    formData.append("residuo", residuo);
    formData.append("observaciones", observaciones);
    formData.append("costohora", costohora);
    formData.append("alquilable", alquilable);
    formData.append("ciudade_id", ciudade_id);
    formData.append("centrocosto_id", centrocosto_id);
    formData.append("nivelcentrocosto", nivelcentrocosto);
    formData.append("estadoactivo_id", estadoactivo_id);
    formData.append("responsable_id", responsable_id);
    formData.append("gruposactivosfijo_id", gruposactivosfijo_id);
    formData.append("puc_id", puc_id);
    formData.append("imagen", imagen);
    formData.append("depreciaraniocompraniif", depreciaraniocompraniif);
    formData.append("depreciarmesescompraniif", depreciarmesescompraniif);
    formData.append("salvamentoniif", salvamentoniif);
    formData.append("vlrnrorazonable", vlrnrorazonable);
    formData.append("niif_id", niif_id);
    formData.append('_method', 'PUT');

    // const output = document.getElementById('output');
    
    // for (const [key, value] of formData) {
    //   output.textContent += `${key}: ${value}\n`;
    // }


    $.ajax({
        method: "POST",
        url: url_back + "activosfijos/"+localStorage.editar,
        headers: { 
            Authorization: 'Bearer ' + localStorage.access_token
        },
        dataType: "json",
        data: formData,
        contentType: false,//formData
        processData: false,//formData
        // async: false,
        success: function(respuesta) {
    
                var mensaje = 'Activo fijo actualizado de forma correcta.: '+ respuesta.data.nombre + ' del grupo.: ' + respuesta.data.gruposactivosfijo.descripcion;
                sweetMessage('success', mensaje); 
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
    
    
    //***************************************************autocompletar*******************
    
    $( "#responsable" ).autocomplete({
            source: function( request, response ) {
                var url_empl = 'empresas/'+ localStorage.empresa_id+ '/empleados?search='+$('#responsable').val();
    
               // Fetch data
               $.ajax({
                 method: "GET",
                 url: url_back + url_empl,
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
              $('#responsable').val(ui.item.label); // display the selected text
              $('#tercero_id').val(ui.item.value); // save selected id to input
              return false;
            }
         });
    
    //***************************************************trae valores de tercero y Activosfijos si ya exiten (grupo,ciudad,tipoactivo,estadoactivo)*******************
    
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
                $('#responsable').val(respuesta.data.nombres);
                $('#tercero_id').val(respuesta.data.id);
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
    
    var obtenerGrupo = function(id){
        url_gru= 'gruposactivosfijos/'+id;
        $.ajax({
        method: "GET",
        url: url_back + url_gru,
        headers: { 
            Authorization: 'Bearer ' + localStorage.access_token
        },
        dataType: "json",
        success: function(respuesta) {
                var htmlGrupo = '';
                htmlGrupo += '<option value="'+ respuesta.data.id+'">';
                htmlGrupo += respuesta.data.descripcion;
                htmlGrupo += '</option>';
                obtenerGruposactivosfijos(htmlGrupo, id);
        },
        error: function() {
            var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
            sweetMessage('error', mensaje);
        }
      })  
    }
    
    
    //***************************************************trae valores masivos de estadoactivo,gruposactivosfijos*******************
    
    var obtenerGruposactivosfijos = function(base = null, id = null) {
        var url = 'empresas/'+ localStorage.empresa_id+'/gruposactivosfijos';
    
        $.ajax({
        method: "GET",
        url: url_back + url,
        headers: { 
            Authorization: 'Bearer ' + localStorage.access_token
        },
        dataType: "json",
        success: function(respuesta) {
    
            $('#select-gruposactivosfijo').html(crearHtml(respuesta.data, base, id));
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
    
    
    function obtenerActivosfijos(id){
    var url = 'activosfijos/'+ id;
    
    $.ajax({
        method: "GET",
        url: url_back + url,
        headers: { 
                      Authorization: 'Bearer ' + localStorage.access_token
                  },
        dataType: "json",
        success: function(respuesta) {
    
            respuesta.data.alquilable == 1 ? $('#alquilable').prop( "checked", true ) : $('#alquilable').prop( "checked", false );
    
            $('#codigo').val(respuesta.data.codigo);
            $('#nombre').val(respuesta.data.nombre);
            $('#direccion').val(respuesta.data.direccion);
            $('#adquisicionfechas').val(respuesta.data.adquisicionfecha);
            $('#depreciarmesescompra').val(respuesta.data.depreciaraniocompra);
            $('#depreciaraniocompra').val(respuesta.data.depreciarmesescompra);
            $('#salvamento').val(respuesta.data.salvamento);
            $('#depreciaranio').val(respuesta.data.depreciaranio);
            $('#depreciarmeses').val(respuesta.data.depreciarmeses);
            $('#residuo').val(respuesta.data.residuo);
            $('#observaciones').val(respuesta.data.observaciones);
            $('#costohora').val(respuesta.data.costohora);

            $('#depreciaraniocompraniif').val(respuesta.data.depreciaraniocompraniif);
            $('#depreciarmesescompraniif').val(respuesta.data.depreciarmesescompraniif);
            $('#salvamentoniif').val(respuesta.data.salvamentoniif);
            $('#vlrnrorazonable').val(respuesta.data.vlrnrorazonable);

            if(respuesta.data.imagen){
                const ul = document.getElementById("mostrarImagen");
                const imagen = document.createElement("img");
                imagen.width = 200;
                imagen.src = url_img + 'activosfijos/'+ respuesta.data.imagen;
                ul.appendChild(imagen);
              }else{
                const ul = document.getElementById("mostrarImagen");
                const imagen = document.createElement("img");
                imagen.width = 200;
                imagen.src = url_front + 'activosfijos/defecto.jpg';
                ul.appendChild(imagen);
              }
    
            if(respuesta.data.ciudade_id){
                obtenerCiudad(respuesta.data.ciudade_id);
            }
    
            if(respuesta.data.responsable_id){
                obtenerTercero(respuesta.data.responsable_id);
            }
            
            if(respuesta.data.gruposactivosfijo_id){
                obtenerGrupo(respuesta.data.gruposactivosfijo_id);
            }else{
                obtenerGruposactivosfijos();
            }
    
            if(respuesta.data.estadoactivo_id){
                obtenerSelect('estadoactivos', '#select-estadoactivos', respuesta.data.estadoactivo_id);
            }else{
                obtenerSelects('estadoactivos', '#select-estadoactivos');
            }
    
            if(respuesta.data.centrocosto_id){
                nivelCentrocosto('#select-nivelcentrocostos',respuesta.data.nivelcentrocosto, respuesta.data.centrocosto_id);
            }else{
                nivelCentrocostos('#select-nivelcentrocostos');
            }
    
            if(respuesta.data.puc_id){
                obtenerPuc(respuesta.data.puc_id, '#puc', 'pucs');
            }

            if(respuesta.data.niif_id){
                obtenerPuc(respuesta.data.niif_id, '#niif', 'niifs');
            }
        },
        error: function() {
            var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
            sweetMessage('error', mensaje);
        }
      })  
    }
    
    var nivelCentrocosto = function (select, nivel, id){
    
        if(localStorage.nivelgasto == 1 && nivel == 'divisiones'){
    
    $.ajax({
        method: "GET",
        url: url_back + 'divisiones/'+ id,
        headers: { 
            Authorization: 'Bearer ' + localStorage.access_token
        },
        dataType: "json",
        success: function(respuesta) {
            
            var htmlCentro = '';
                htmlCentro += '<option value="'+ respuesta.data.id+'">';
                htmlCentro += respuesta.data.codigo+'-'+respuesta.data.nombre;
                htmlCentro += '</option>';
            nivelCentrocostos(select, htmlCentro, id);
    
        },
        error: function() {
            var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
            sweetMessage('error', mensaje);
        }
    }) 
    
    }else if(localStorage.nivelgasto == 2 && nivel == 'secciones'){
    
    $.ajax({
        method: "GET",
        url: url_back + 'secciones/'+ id,
        headers: { 
            Authorization: 'Bearer ' + localStorage.access_token
        },
        dataType: "json",
        success: function(respuesta) {
            
            var htmlCentro = '';
                htmlCentro += '<option value="'+ respuesta.data.id+'">';
                htmlCentro += respuesta.data.codigo+'-'+respuesta.data.nombre;
                htmlCentro += '</option>';
            nivelCentrocostos(select, htmlCentro, id);
        },
        error: function() {
            var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
            sweetMessage('error', mensaje);
        }
    }) 
    
    }else if(localStorage.nivelgasto == 3 && nivel == 'dependencias'){
    
    $.ajax({
        method: "GET",
        url: url_back + 'dependencias/'+ id,
        headers: { 
            Authorization: 'Bearer ' + localStorage.access_token
        },
        dataType: "json",
        success: function(respuesta) {
            
            var htmlCentro = '';
                htmlCentro += '<option value="'+ respuesta.data.id+'">';
                htmlCentro += respuesta.data.codigo+'-'+respuesta.data.nombre;
                htmlCentro += '</option>';
            nivelCentrocostos(select, htmlCentro, id);
        },
        error: function() {
            var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
            sweetMessage('error', mensaje);
        }
    })  
    }else{
        var mensaje = 'Ocurrio un cambio en la configuracion del nivel de gasto debe asignar un nuevo centro de costo a este activo fijo.';
        sweetMessage('info', mensaje);
    
        nivelCentrocostos(select);
    }
    
    }
    
    
    //*******************************************************************************************************************************************************************************
    
    var nivelCentrocostos = function (select, base = null, id = null){
    
    if(localStorage.nivelgasto == 1){
    
        $.ajax({
            method: "GET",
            url: url_back + 'getalldivisiones/'+ localStorage.empresa_id,
            headers: { 
                Authorization: 'Bearer ' + localStorage.access_token
            },
            dataType: "json",
            success: function(respuesta) {
                
                $(select).html(crearHtmlCosto(respuesta, base, id));
    
            },
            error: function() {
                var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
                sweetMessage('error', mensaje);
            }
        }) 
    
    }else if(localStorage.nivelgasto == 2){
    
        $.ajax({
            method: "GET",
            url: url_back + 'getallsecciones/'+ localStorage.empresa_id,
            headers: { 
                Authorization: 'Bearer ' + localStorage.access_token
            },
            dataType: "json",
            success: function(respuesta) {
                
                $(select).html(crearHtmlCosto(respuesta, base, id));
            },
            error: function() {
                var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
                sweetMessage('error', mensaje);
            }
        }) 
        
    }else if(localStorage.nivelgasto == 3){
    
        $.ajax({
            method: "GET",
            url: url_back + 'getalldependencias/'+ localStorage.empresa_id,
            headers: { 
                Authorization: 'Bearer ' + localStorage.access_token
            },
            dataType: "json",
            success: function(respuesta) {
                
                $(select).html(crearHtmlCosto(respuesta, base, id));
            },
            error: function() {
                var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
                sweetMessage('error', mensaje);
            }
        })  
    }
    
    }
    
    var crearHtmlCosto = function(data, base = null, id = null) {
        var html = base? base: '<option value="" selected="true" disabled="disabled">Selecione...</option>' ;
            $.each(data, function (key, item) {
                if(id != item.id){
                    html += '<option value="'+ item.id+'">';
                    html += item.codigo+'-'+item.nombre;
                    html += '</option>';
                }
            });
        return html;
    }
    
    //******************************************************************************************************************************************************************************
    
    var obtenerPuc = function(id , select, url){
        let url_c = url +'/' + id;
        $.ajax({
        method: "GET",
        url: url_back + url_c,
        headers: { 
            Authorization: 'Bearer ' + localStorage.access_token
        },
        dataType: "json",
        success: function(respuesta) {
                $(select).val(respuesta.data.id+'-'+respuesta.data.descripcion);
                $(select+'_id').val(respuesta.data.id);
        },
        error: function() {
            var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
            sweetMessage('error', mensaje);
        }
      })  
    }
    
    //******************************************************************************************************************************************************************************
    
    $( "#puc" ).autocomplete({
            source: function( request, response ) {
                var url_puc = 'pucsactivosfijos?search='+$('#puc').val(); //TODO: buscar en todas las 15 y 16
    
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

         $( "#niif" ).autocomplete({
            source: function( request, response ) {
                var url_niif = 'niifsactivosfijos?search='+$('#niif').val(); //TODO: buscar en todas las 15 y 16
    
               $.ajax({
                 method: "GET",
                 url: url_back + url_niif,
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
              $('#niif').val(ui.item.label); // display the selected text
              $('#niif_id').val(ui.item.value); // save selected id to input
              return false;
            }
         });
    
    //********************************************************************************************************************************************************************
    
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
    
    //******************************************************************************************************************************************************************
    
    $( document ).ready(function() {
        $('.preloader').hide("slow");
          validarLogin();
          actualizarmoneda();

        obtenerActivosfijos(localStorage.editar);
        obtenerDepartamentos();
    
        $("#select-departamento").on("change",recargarDepartamento); 
    
        $('#direccion').validCampo('abcdefghijklmnopqrstuvwxyziou()"0123456789._-#°');
    });
    
    
    
    $(function() {
        //Date picker
     $("#adquisicionfecha").datetimepicker({
            locale: "es",
            format: "YYYY-MM-DD",  
            maxDate: moment(),
            minDate: moment().subtract(99, 'year'),
            timepicker:false,
            autoclose: true,
            showButtonPanel: true
     });
        // //Date and time picker
        // $('#adquisicionfechatime').datetimepicker({ icons: { time: 'far fa-clock' } });
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