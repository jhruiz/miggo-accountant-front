
function obtenerUnidadesmedida(id){

  var url = 'unidadesmedidas/'+ id;
  
  $.ajax({
      method: "GET",
      url: url_back + url,
      headers: { 
                    Authorization: 'Bearer ' + localStorage.access_token
                },
      dataType: "json",
      success: function(respuesta) {
  
        respuesta.data.unidadpeso == 1 ? $('#unidadpeso').prop( "checked", true ) : $('#unidadpeso').prop( "checked", false );
                         
        if(respuesta.data.unidadpeso){
          $('#divFactorgramos').show();
        }
  
        $('#codigo').val(respuesta.data.codigo);
        $('#descripcion').val(respuesta.data.descripcion);
        $('#factorgramos').val(respuesta.data.factorgramos);

        if(respuesta.data.codigodianunidade_id){
          $('#codigodianunidade_id').val(respuesta.data.codigodianunidade_id);
          obtenerCodigodian(respuesta.data.codigodianunidade_id);
        }
  
      },
      error: function() {
          var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
          sweetMessage('error', mensaje);
      }
    })  
  }
  

  var obtenerCodigodian = function(id){
    let url= 'codigodianunidades/' + id;

    $.ajax({
    method: "GET",
    url: url_back + url,
    headers: { 
        Authorization: 'Bearer ' + localStorage.access_token
    },
    dataType: "json",
    success: function(respuesta) {
            $('#codigodianunidade').val(respuesta.data.codigo+'-'+respuesta.data.descripcion);
            // $('#codigodianunidade_id').val(respuesta.data.id);
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
        obtenerUnidadesmedida(localStorage.ver);
        localStorage.ver = '';
  });