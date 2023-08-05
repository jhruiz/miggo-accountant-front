var load_content = function(url){
    $('#main_content').load(url_front + url);
}

/**
 * Funcion para obtener y renderizar el menu principal
 */
var infoMenu = function() {

    $.ajax({
        method: "GET",
        url: url_back+'cloudmenus',
        success: function(respuesta) {

            var htmlMenu = "";
            $.each(respuesta, function (key, item) {
                htmlMenu += '<li class="nav-item">';
                htmlMenu += '<a href="#" class="nav-link">';
                htmlMenu += '<i class="' + item.imagen + '"></i>';
                htmlMenu += '<p style="margin-left:10px;">';
                htmlMenu += item.descripcion
                htmlMenu += '<i class="right fas fa-angle-right"></i>';
                htmlMenu += '</p>';
                htmlMenu += '</a>';
                htmlMenu += '<ul class="nav nav-treeview">';

                $.each( item.hijos, function(k, i) {

                    htmlMenu += '<li class="nav-item">';
                    htmlMenu += '<a onclick="load_content(\'' + i.url + '\')" class="nav-link" style="margin-left:15px;">';
                    // htmlMenu += '<a href="' + url_front + i.url + '" class="nav-link" style="margin-left:15px;">';
                    htmlMenu += '<i class="far fa-circle nav-icon"></i>';
                    htmlMenu += '<p>' + i.descripcion + '</p>';
                    htmlMenu += '</a>';
                    htmlMenu += '</li>';

                });

                htmlMenu += '</ul>';
                htmlMenu += '</li>';

            });

            $('#main-menu').html(htmlMenu);

                
        },
        error: function() {
            var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
            sweetMessage('error', mensaje);
        }
    }) 
}



var clicLogout = function() {

    // var url = $(this).data('load'); 
    var url = 'logout';

    //para salir del sistema
    if(url == 'logout'){
                $.ajax({
                    method: "GET",
                    url: url_back + url,
                    headers: { 
                        Authorization: 'Bearer ' + localStorage.access_token
                    },
                    dataType: "json",
                    success: function(respuesta) {
                        console.log(respuesta.message);
                    },
                    error: function() {
                        var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
                        sweetMessage('error', mensaje);
                    }
                }) 
            localStorage.clear();
            window.location.href = home;
    } 
}

$( document ).ready(function() {
    infoMenu(); 

    $("#clicLogout").on("click",clicLogout);

});
