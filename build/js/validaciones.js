//******************************************************validaciones */


  $('.input-numero').on('input', function () { 
      $('.input-numero').numeric();
  });

  $('.input-numero-punto').on('input', function () { 
    $('.input-numero-punto').numeric(".");
});

$('.input-numero-coma').on('input', function () { 
    $('.input-numero-coma').numeric(",");
});

$('.input-numero-negativo').on('input', function () { 
    $('.input-numero-negativo').numeric({ negative : true });
});

$('.input-numero-decimalM').on('input', function () { 
  $('.input-numero-decimalM').numeric({ decimal: ",", decimalPlaces : parseInt(localStorage.decimalMoneda), negative : false });
});

$('.input-numero-decimalP').on('input', function () { 
  $('.input-numero-decimalP').numeric({ decimal: ",", decimalPlaces : parseInt(localStorage.decimalPeso), negative : false });
});

$('.input-numero-decimal2').on('input', function () { 
    $('.input-numero-decimal2').numeric({ decimal: ",", decimalPlaces : 2, negative : false });
});

$('.input-numero-decimal3').on('input', function () { 
    $('.input-numero-decimal3').numeric({ decimal: ",", decimalPlaces : 3, negative : false });
});

$('.input-numero-altDecimal').on('input', function () { 
    $('.input-numero-altDecimal').numeric({ altDecimal : "," });
});

$('.input-numero-msg').on('input', function () { 
    $('.input-numero-msg').numeric(null, console.log('valor correcto ejecuta funcion'));
});

$('.input-texto-espacio').bind('keypress', function(event) {
    var regex = new RegExp("^[a-zA-Z ]+$");
    var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    if (!regex.test(key)) {
      event.preventDefault();
      return false;
    }
  });

  $('.input-texto-alfanumerico').bind('keypress', function(event) {
    var regex = new RegExp("^[a-zA-Z0-9 ]+$");
    var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    if (!regex.test(key)) {
      event.preventDefault();
      return false;
   }
  });


// $('#email').validCampo('abcdefghijklmnopqrstuvwxyziou@0123456789._-');
  (function (a) {
    a.fn.validCampo=function(b){
    a(this).on({keypress:function(a){
    var c=a.which,
    d=a.keyCode,
    e=String.fromCharCode(c).toLowerCase(),
    f=b;
(-1!=f.indexOf(e)||9==d||37!=c&&37==d||39==d&&39!=c||8==d||46==d&&46!=c)&&161!=c||a.preventDefault()
}})}}( jQuery ));


// var emailPattern = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$";

// $('.input-email').on('input', function () { 
//     return $('.input-email').val().match(emailPattern) ? true : false;
// });


//***************************************************validaciones imagen******************************************************************************************

function validarImagen(datos) {
    
    var dataFI = $('#imagen').prop('files')[0];

    // valida el tamaño del archivo
    if(dataFI.size > 2000000) {
        var mensaje = 'El tamaño máximo del archivo es 2MB.';
        sweetMessage('warning', mensaje);
        $('#imagen').val('');
        return false;
    }

    // valida el formato del archivo
    if((dataFI.name.split('.')['1'].toLowerCase() != 'jpg') && (dataFI.name.split('.')['1'].toLowerCase() != 'jpeg') && (dataFI.name.split('.')['1'].toLowerCase() != 'png') && (dataFI.name.split('.')['1'].toLowerCase() != 'gif') && (dataFI.name.split('.')['1'].toLowerCase() != 'svg')) {
        console.log(dataFI.name.split('.')['1'].toLowerCase());
        var mensaje = 'Solo se permiten archivos en formato jpg o jpeg';
        sweetMessage('warning', mensaje);
        $('#imagen').val('');
        return false;
    }

return true;

}

function calcularDigito(){
    var arreglo,x,y,documentoElementos,i,documento,dv1;
    documento=document.getElementById("identificacion").value;
    if(isNaN(documento)){
      alert('Recuerde escribir el número de cédula o NIT sin puntos.');
    }else{
        arreglo=[];
        x=0;
        y=0;
        documentoElementos=documento.length;
        arreglo[1]=3;
        arreglo[2]=7;
        arreglo[3]=13;
        arreglo[4]=17;
        arreglo[5]=19;
        arreglo[6]=23;
        arreglo[7]=29;
        arreglo[8]=37;
        arreglo[9]=41;
        arreglo[10]=43;
        arreglo[11]=47;
        arreglo[12]=53;
        arreglo[13]=59;
        arreglo[14]=67;
        arreglo[15]=71;
          for(i=0;i<documentoElementos;i++){
            y=(documento.substr(i,1));
            x+=(y*arreglo[documentoElementos-i]);
          }
          y=x%11;
            if(y>1){
              dv1=11-y;
            }else{
              dv1=y;
            }
      // console.log(dv1);
    //   alert(dv1);
      $('#verificado').val(dv1);

    }
}


//************************************************************************************************************** */

moment.locale("es", {
  days: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
  daysShort: ['Dom','Lun','Mar','Mié','Juv','Vie','Sáb'],
  daysMin: ['Do','Lu','Ma','Mi','Ju','Vi','Sá'],
  months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
  monthsShort: ['Ene','Feb','Mar','Abr', 'May','Jun','Jul','Ago','Sep', 'Oct','Nov','Dic'],
  today: "Hoy",
});

//******************************************************************************************************************* */

var obtenerSelect = function(url, select, id){
  let url_tipo= url+ '/' +id;
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
          html += respuesta.data.descripcion;
          html += '</option>';
          obtenerSelects(url, select, id, html);
  },
  error: function() {
      var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
      sweetMessage('error', mensaje);
  }
})  
}

function obtenerSelects(url, select, id = null,  base = null) {

$.ajax({
  method: "GET",
  url: url_back + url,
  headers: { 
      Authorization: 'Bearer ' + localStorage.access_token
  },
  dataType: "json",
  success: function(respuesta) {

      $(select).html(crearHtml(respuesta.data, base, id));
  },
  error: function() {
      var mensaje = 'Se presentó un error. Por favor, inténtelo mas tarde.';
      sweetMessage('error', mensaje);
  }
})     
}

var crearHtml = function(data, base = null, id = null) {
  var html = base? base: '<option value="" selected="true" disabled="disabled">Seleccione...</option>';

      $.each(data, function (key, item) {
          if(id != item.id){
              html += '<option value="'+ item.id+'">';
              html += item.descripcion;
              html += '</option>';
          }
      });
      
      return html;
}

var actualizarmoneda = function (){
  $('.monedaSimbolo').text(localStorage.moneda);
}

function isEmpty( el ){
  return !$.trim(el.html())
}

function decimalLatinoShow(d){
   // console.log('type'+ jQuery.type(d));
 //console.log(d);
  var decimalLatino = d.toString();
  decimalLatino = decimalLatino.indexOf(".") > -1  ? decimalLatino.toString().replace('.', ',') : decimalLatino;
  return decimalLatino;
}

function decimalLatinoSave(valor){
  //console.log('type'+ jQuery.type(valor));
 // console.log(valor);
  var decimalLatino = valor.indexOf(",") > -1 ? valor.toString().replace(',', '.') : valor;
  return decimalLatino;
}
