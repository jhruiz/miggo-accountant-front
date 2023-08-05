var crearEmpresa = function(e){
    e.preventDefault();   
    
    const formEmpresa = document.getElementById('formEmpresa');
    const formData = new FormData(formEmpresa);
    
    var autoretenedor =$('#autoretenedor').is(':checked') ? 1 : 0; 
    var autoretenedorica =$('#autoretenedorica').is(':checked') ? 1 : 0; 
    var autoretenedorrenta =$('#autoretenedorrenta').is(':checked') ? 1 : 0;
    var ecommerce =$('#ecommerce').is(':checked') ? 1 : 0;
    var pucedit =$('#pucedit').is(':checked') ? 1 : 0;
    
    var nombre = $('#nombre').val();
    var razonsocial = $('#razonsocial').val();
    var nit = $('#identificacion').val();
    var digitoverificacion = $('#verificado').val();
    var direccion = $('#direccion').val();
    var telefono1 = $('#telefono1').val();
    var telefono2 = $('#telefono2').val();
    var email = $('#email').val();
    var representantelegal = $('#representantelegal').val();
    var moneda = $('#moneda').val();
    var texto1 = $('#texto1').val();
    var texto2 = $('#texto2').val();
    var texto3 = $('#texto3').val();
    var texto4 = $('#texto4').val();
    var fecharesolucion = $('#fecharesoluciones').val();
    var resolucionautoretenedor = $('#resolucionautoretenedor').val();
    var contactonombre = $('#contactonombre').val();
    var contactocelular = $('#contactocelular').val();
    var ciiuclase_id = $('#ciiu_id').val();
    var puc_id = $('#puc_id').val();
    var imagen = $('#imagen')[0].files[0] ? $('#imagen')[0].files[0] : ''; 
    
    var ciudade_id = $('#select-ciudad').val()? $('#select-ciudad').val() : ''; 
    var tipocontribuyente_id = $('#select-tipocontribuyentes').val()? $('#select-tipocontribuyentes').val() : ''; 
    var regimene_id = $('#select-regimenes').val()? $('#select-regimenes').val() : ''; 
    var personeria_id = $('#select-personerias').val()? $('#select-personerias').val() : ''; 
    var tiposociedade_id = $('#select-tiposociedades').val()? $('#select-tiposociedades').val() : ''; 
    var nivelgasto = $('#select-nivelcentro').val()? $('#select-nivelcentro').val() : ''; 
    var contacto_id = $('#select-contactos').val()? $('#select-contactos').val() : ''; 
    
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
    formData.append("moneda", moneda);
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
    formData.append("empresa_id", localStorage.empresa_id);
    formData.append("creador_id", localStorage.id);
    
    $.ajax({
        method: "POST",
        url: url_back + "empresas",
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
                if(e.target.id == "configurar"){
                    localStorage.setItem('editar', respuesta.data.id)
                    $('#main_content').load(url_front + 'empresas/edit.html');
                }else{
                    $('#main_content').load(url_front + 'empresas/index.html');
                }
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
    
    var defaultImage = function(){
        const ul = document.getElementById("mostrarImagen");
        const imagen = document.createElement("img");
        imagen.width = 200;
        imagen.src = url_front + 'empresas/defecto.jpg';
        ul.appendChild(imagen);
    }
    
    
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
    
        defaultImage();

        $("#crear").on("click",crearEmpresa);
        $("#configurar").on("click",crearEmpresa);
    
        obtenerDepartamentos();
        obtenerSelects('contactos', '#select-contactos');
        obtenerSelects('tipocontribuyentes', '#select-tipocontribuyentes');
        obtenerSelects('regimenes', '#select-regimenes');
        obtenerSelects('personerias', '#select-personerias');
        obtenerSelects('tiposociedades', '#select-tiposociedades');
    
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
    