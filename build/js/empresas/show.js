function obtenerretencionicas() {
    var url = 'empresas/'+ localStorage.empresa_id+'/icas';
    $('#select-retencionicas').html('');
    
    $.ajax({
        method: "GET",
        url: url_back + url,    headers: { 
            Authorization: 'Bearer ' + localStorage.access_token
        },
        dataType: "json",
        success: function(respuesta) {
          $('#select-retencionicas').html(crearHtmlICA(respuesta.data));
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
                $('#puc').val(respuesta.data.id+'-'+respuesta.data.descripcion);
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
    
    
            if(respuesta.data.imagen){
                const ul = document.getElementById("mostrarImagen");
                const imagen = document.createElement("img");
                imagen.width = 200;
                imagen.src = url_img + 'empresas/'+ respuesta.data.imagen;
                ul.appendChild(imagen);
              }else{
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
            }
    
            if(respuesta.data.tipocontribuyente_id){
                obtenerSelect('tipocontribuyentes', '#select-tipocontribuyentes', respuesta.data.tipocontribuyente_id);
            }
    
            if(respuesta.data.regimene_id){
                obtenerSelect('regimenes', '#select-regimenes', respuesta.data.regimene_id);
            }
    
            if(respuesta.data.personeria_id){
                obtenerSelect('personerias', '#select-personerias', respuesta.data.personeria_id);
            }
    
            if(respuesta.data.tiposociedade_id){
                obtenerSelect('tiposociedades', '#select-tiposociedades', respuesta.data.tiposociedade_id);
            }
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
    
        obtenerEmpresa(localStorage.ver);
        obtenerretencionicas();
    });