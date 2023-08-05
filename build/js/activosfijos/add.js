$("#form").submit(function(e) {
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
    var puc_id = $('#puc_id').val();
    var imagen = $('#imagen')[0].files[0] ? $('#imagen')[0].files[0] : '';
    
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
    
    
    formData.append("creador_id", localStorage.id);
    formData.append("empresa_id", localStorage.empresa_id);
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
    formData.append("depreciaraniocompraniif", depreciaraniocompraniif);
    formData.append("depreciarmesescompraniif", depreciarmesescompraniif);
    formData.append("salvamentoniif", salvamentoniif);
    formData.append("vlrnrorazonable", vlrnrorazonable);
    formData.append("niif_id", niif_id);
    formData.append("imagen", imagen);
    
    $.ajax({
        method: "POST",
        url: url_back + "activosfijos",
        headers: { 
            Authorization: 'Bearer ' + localStorage.access_token
        },
        dataType: "json",
        data: formData,
        contentType: false,//formData
        processData: false,//formData
        success: function(respuesta) {
    
            if(respuesta){
                var mensaje = 'activo fijo creado de forma correcta: ';
                // var mensaje = 'activo fijo creado de forma correcta: '+ respuesta.data.tercero.nombres;
                sweetMessage('success', mensaje); 
                $('#main_content').load(url_front + 'activosfijos/index.html');
            } else {
                    sweetMessage('warning', respuesta);                
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
                    // console.log(respuesta);
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
    
    
    //***************************************************trae valores masivos de estadoactivo,gruposactivosfijos,*******************
    
    var obtenerGruposactivosfijos = function(){
        var url = 'empresas/'+ localStorage.empresa_id+'/gruposactivosfijos';
    
        $.ajax({
        method: "GET",
        url: url_back + url,
        headers: { 
            Authorization: 'Bearer ' + localStorage.access_token
        },
        dataType: "json",
        success: function(respuesta) {
    
            $('#select-gruposactivosfijo').html(crearHtml(respuesta.data));
    
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
    
    var nivelCentrocostos = function (select){
    
        if(localStorage.nivelgasto == 1){
    
            $.ajax({
                method: "GET",
                url: url_back + 'getalldivisiones/'+ localStorage.empresa_id,
                headers: { 
                    Authorization: 'Bearer ' + localStorage.access_token
                },
                dataType: "json",
                success: function(respuesta) {
                    
                    $(select).html(crearHtmlCosto(respuesta));
    
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
                    
                    $(select).html(crearHtmlCosto(respuesta));
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
                    
                    $(select).html(crearHtmlCosto(respuesta));
                },
                error: function() {
                    var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
                    sweetMessage('error', mensaje);
                }
            })  
        }
    
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
    
    //         $(select).html(crearHtml(respuesta.data, base, id));
    //     },
    //     error: function() {
    //         var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
    //         sweetMessage('error', mensaje);
    //     }
    //   })     
    // }
    
    var crearHtmlCosto = function(data) {
        var html = '<option value="" selected="true" disabled="disabled">Selecione...</option>';
                $.each(data, function (key, item) {
                    html += '<option value="'+ item.id+'">';
                    html += item.codigo+'-'+item.nombre;
                    html += '</option>';
                });
            return html;
    }
    
    // var crearHtml = function(data) {
    //     var html = '<option value="">Seleccione..</option>';
    //         $.each(data, function (key, item) {
    //             html += '<option value="'+ item.id+'">';
    //             html += item.descripcion;
    //             html += '</option>';
    //         });
    //     return html;
    // }
    
    var defaultImagen = function(){
        const ul = document.getElementById("mostrarImagen");
        const imagen = document.createElement("img");
        imagen.width = 200;
        imagen.src = url_front + 'activosfijos/defecto.jpg';
        ul.appendChild(imagen);
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
    
    //****************************************************************************************************************************************************************************
    
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
    
    //*************************************************************************************************************************************************************************
    
    $( document ).ready(function() {
        $('.preloader').hide("slow");
        validarLogin();
        defaultImagen();
        actualizarmoneda();
    
        obtenerDepartamentos();
        obtenerGruposactivosfijos();
        obtenerSelects('estadoactivos', '#select-estadoactivos');
        nivelCentrocostos('#select-nivelcentrocostos');
    
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
    