
//------------------------------------------------------------------------------
//  BLOQUE DE FUNCIONES JQUERY
//------------------------------------------------------------------------------
$(document).ready(function () {

    //Variables que contiene la ruta de los Web  Services a llamar.
    var webMethodGetTipoAplicacion = "http://a21287345-001-site1.etempurl.com/WCFPremiumFilters.asmx/GetTipoAplicacion";
    var webMethodGetMarcaVehiculo="http://a21287345-001-site1.etempurl.com/WCFPremiumFilters.asmx/GetMarcaVehiculo";
    var webMethodGetModelo="http://a21287345-001-site1.etempurl.com/WCFPremiumFilters.asmx/GetModelo";
    var webMethodGetCilindraje="http://a21287345-001-site1.etempurl.com/WCFPremiumFilters.asmx/GetCilindraje";
    var webMethodGetAir="http://a21287345-001-site1.etempurl.com/WCFPremiumFilters.asmx/GetFAire";
    var webMethodGetOil="http://a21287345-001-site1.etempurl.com/WCFPremiumFilters.asmx/GetFOil";
    var webMethodGetFuel="http://a21287345-001-site1.etempurl.com/WCFPremiumFilters.asmx/GetFFuel";
    var webMethodGetAC="http://a21287345-001-site1.etempurl.com/WCFPremiumFilters.asmx/GetFAirAC";
    var webMethodGetSr_Referencias ="http://a21287345-001-site1.etempurl.com/WCFPremiumFilters.asmx/GetSr_Referencias";


    //Objeto AJAX que se encarga de obtener la informacíon del combo "Tipo Aplicación".
    $.ajax({
            type: "POST",
            url: webMethodGetTipoAplicacion,
            //data: parameters,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: llenarTipoAplicacion,
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(textStatus + ": " + XMLHttpRequest.responseText);
            }
    });

    
    //Evento jQuery que se encarga de llamar objeto AJAX que obtiene la informacíon del combo "Marca Vehículo".
    $("#select1").change(function(){
        var idTipoAplicacion = document.getElementById("select1").value;
        var parametrosGetMarcaVehiculo="{'Id_TMk':'"+idTipoAplicacion+"'}";
        $.ajax({
                type: "POST",
                url: webMethodGetMarcaVehiculo,
                data: parametrosGetMarcaVehiculo,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: llenarMarcaVehiculo,
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert(textStatus + ": " + XMLHttpRequest.responseText);
                }
        });
    });


    //Evento jQuery que se encarga de llamar objeto AJAX que obtiene la informacíon del combo "Modelo".
    $("#select2").change(function(){
        var idMarcaVehiculo = document.getElementById("select2").value;
        //console.log(idMarcaVehiculo);
        var parametrosGetModelo = "{'Id_Mk':'"+ idMarcaVehiculo +"'}";
        $.ajax({
                type: "POST",
                url: webMethodGetModelo,
                data: parametrosGetModelo,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: llenarModelo,
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert(textStatus + ": " + XMLHttpRequest.responseText);
                }
        });
    }); 


    //Evento jQuery que se encarga de llamar objeto AJAX que obtiene la informacíon del combo "Cilindraje - Motor/Capacidad".
    $("#select3").change(function(){
        var idTipoAplicacion= document.getElementById("select1").value
        var idModelo = document.getElementById("select3").value;
        //console.log(idMarcaVehiculo);
        var parametrosGetCilindraje = "{'Id_RefMk':'" + idModelo + "','Id_TMk':'"+ idTipoAplicacion +"'}";
        $.ajax({
                type: "POST",
                url: webMethodGetCilindraje,
                data: parametrosGetCilindraje,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: llenarCilindraje,
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert(textStatus + ": " + XMLHttpRequest.responseText);
                }
        });
    }); 


    //Evento jQuery que se encarga de llamar los objetos AJAX que van a obtener la información de cada una de las grillas de resultados.
    $("#select4").change(function(){

        var idModelo= document.getElementById("select3").value
        var idCilindraje = document.getElementById("select4").value;
        var motCap;
       
        if (idCilindraje != '0'){
            motCap="";
        }
        else{
            motCap= $("#select4").text();
        }

        var parametrosGetAir = "{'Id_RefMk':'" + idModelo + "','McilL':'" + idCilindraje + "','MotCap':'"+ motCap +"'}";
        var parametrosGetOil = parametrosGetAir;
        var parametrosGetFuel = parametrosGetAir;
        var parametrosGetAC = parametrosGetAir;
        
        //console.log(idMarcaVehiculo);
         
        //Objeto AJAX para la grilla de los Filtros de Aire.
        $.ajax({
                type: "POST",
                url: webMethodGetAir,
                data: parametrosGetAir,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: llenarAir,
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert(textStatus + ": " + XMLHttpRequest.responseText);
                }
        });

        //Objeto AJAX para la grilla de los Filtros de Aceite.
        $.ajax({
                type: "POST",
                url: webMethodGetOil,
                data: parametrosGetOil,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: llenarOil,
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert(textStatus + ": " + XMLHttpRequest.responseText);
                }
        });

        //Objeto AJAX para la grilla de los Filtros de Combustible.
        $.ajax({
                type: "POST",
                url: webMethodGetFuel,
                data: parametrosGetFuel,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: llenarFuel,
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert(textStatus + ": " + XMLHttpRequest.responseText);
                }
        });

        //Objeto AJAX para la grilla de los Filtros de Aire Acondicionado.        
        $.ajax({
                type: "POST",
                url: webMethodGetAC,
                data: parametrosGetAC,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: llenarAC,
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert(textStatus + ": " + XMLHttpRequest.responseText);
                }
        });
    });   

//Evento jQuery que se encarga de llamar los objetos AJAX que van a obtener la información de cada una de las grillas de resultados.
    $("#btnBuscar").click(function(){

        var idPF_Ref = document.getElementById("inpBuscar").value
        var parametrosGetSr_Referencias = "{'PF_Ref':'" + idPF_Ref + "'}";

        console.log(idPF_Ref);
        console.log(parametrosGetSr_Referencias);
        console.log(webMethodGetSr_Referencias);
         
        //Objeto AJAX para la grilla de los Filtros de Aire.
        $.ajax({
                type: "POST",
                url: webMethodGetSr_Referencias,
                data: parametrosGetSr_Referencias,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: llenarSr_Referencias,
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert(textStatus + ": " + XMLHttpRequest.responseText);
                }
        });
    }); 

});




//------------------------------------------------------------------------------
//  BLOQUE DE FUNCIONES JAVASCRIPT
//------------------------------------------------------------------------------

//Función que se encarga de llenar transformar el resultado de formato string a formato Json.
function IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}


//Función que se encarga de llenar el combo "Tipo Aplicación" con la información obtenida del objeto AJAX.
function llenarTipoAplicacion(result) {
    
    var objJson = JSON.parse(result.d);
    var HtmltipoAplicacion;

    $.each(objJson, function (i, item) {
        //console.log(item.Id_TMk); 
        HtmltipoAplicacion = "<option value='" + item.Id_TMk + "'>" + item.TAplicacion + "</option>";
        $("#select1").append(HtmltipoAplicacion);
    });
}


//Función que se encarga de llenar el combo "Marca Vehiculo" con la información obtenida del objeto AJAX.
function llenarMarcaVehiculo(result) {
    //console.log(result.d);
    var objJsonMarcaVehiculo = JSON.parse(result.d);
    var HtmlMarcaVehiculo;
    HtmlMarcaVehiculo = "<option value='#'>Seleccione...</option>";
    $.each(objJsonMarcaVehiculo, function (i, item) {
        //console.log(item.Id_TMk); 
        HtmlMarcaVehiculo += "<option value='" + item.Id_Mk + "'>" + item.Marca + "</option>";
    });
    $("#select2").html(HtmlMarcaVehiculo);
}


//Función que se encarga de llenar el combo "Modelo" con la información obtenida del objeto AJAX.
function llenarModelo(result) {
    //console.log(result.d);
    var objJsonModelo = JSON.parse(result.d);
    var HtmlModelo;
    HtmlModelo = "<option value='#'>Seleccione...</option>";
    $.each(objJsonModelo, function (i, item) {
        //console.log(item.Id_TMk); 
        HtmlModelo += "<option value='" + item.Id_RefMk + "'>" + item.Ref_Marca + "</option>";
    });
    $("#select3").html(HtmlModelo);
}


//Función que se encarga de llenar el combo "Motor/Capacidad - Cilindraje" con la información obtenida del objeto AJAX.
function llenarCilindraje(result) {
    //console.log(result.d);
    var objJsonCilindraje = JSON.parse(result.d);
    var HtmlCilindraje;
    HtmlCilindraje = "<option value='#'>Seleccione...</option>";
    $.each(objJsonCilindraje, function (i, item) {
        //console.log(item.Id_TMk); 
        if (document.getElementById("select1").value==1 || document.getElementById("select1").value==4){
        HtmlCilindraje += "<option value='" + item.McilL + "'>" + item.Mcc + "</option>";
        //console.log('cilindraje: '+ item.McilL);
        $("#lblCilindraje").html('Cilindraje:');
    }
    else{
        HtmlCilindraje += "<option value='0'>" + item.MotCap + "</option>";
        $("#lblCilindraje").html('Motor/Capacidad:');
    }

    });

    $("#select4").html(HtmlCilindraje);
}


//Función que se encarga de llenar la grila de los Filtros de Aire con la información obtenida del objeto AJAX.
function llenarAir(result) {
    //console.log(result.d);
        if (IsJsonString(result.d)){

        $("#pnlAir").show();
        var objJsonAir = JSON.parse(result.d);
        var HtmlAir;

        $.each(objJsonAir, function (i, item) {
            //console.log(objJsonAir); 
            HtmlAir+="<tr><td><a id='"+item.AIRE+"' src='#' onclick='llenarFiltro(this.id);'>"+item.AIRE+"</a></td><td>"+item.Maño+"</td></tr>"
        });
        $("#tbodyAir").html(HtmlAir);
    }
    else{
        $("#pnlAir").hide();
    }
}


//Función que se encarga de llenar la grila de los Filtros de Aceite con la información obtenida del objeto AJAX.
function llenarOil(result) {
    //console.log(result.d);
    if(IsJsonString(result.d)){
        $("#pnlOil").show();
        var objJsonOil = JSON.parse(result.d);
        var HtmlOil;
        
        $.each(objJsonOil, function (i, item) {
            //console.log(objJsonAir); 
            HtmlOil+="<tr><td><a id='"+item.ACEITE+"' src='#' onclick='llenarFiltro(this.id);'>"+item.ACEITE+"</a></td><td>"+item.Maño+"</td></tr>"
        });
        $("#tbodyOil").html(HtmlOil);
    }
    else{
        $("#pnlOil").hide();
    }
}


//Función que se encarga de llenar la grila de los Filtros de Combustible con la información obtenida del objeto AJAX.
function llenarFuel(result) {
    //console.log(result.d);
    if(IsJsonString(result.d)){

        $("#pnlFuel").show();
        var objJsonFuel = JSON.parse(result.d);
        var HtmlFuel;
        
        $.each(objJsonFuel, function (i, item) {
            //console.log(objJsonAir); 
            HtmlFuel+="<tr><td><a id='"+item.COMBUSTIBLE+"' src='#' onclick='llenarFiltro(this.id);'>"+item.COMBUSTIBLE+"</a></td><td>"+item.Maño+"</td></tr>"
        });
        $("#tbodyFuel").html(HtmlFuel);
    }
    else{
        $("#pnlFuel").hide();
    }
}


//Función que se encarga de llenar la grila de los Filtros de Aire Acondicionado con la información obtenida del objeto AJAX.
function llenarAC(result) {
    //console.log(result.d);
    if (IsJsonString(result.d)){
        $("#pnlAC").show();
        var objJsonAC = JSON.parse(result.d);
        var HtmlAC;
        
        $.each(objJsonAC, function (i, item) {
            //console.log(objJsonAir); 
            HtmlAC+="<tr><td><a id='"+item.AIREAC+"' src='#' onclick='llenarFiltro(this.id);'>"+item.AIREAC+"</a></td><td>"+item.Maño+"</td></tr>"
        });
        $("#tbodyAC").html(HtmlAC);
    }
    else{
        $("#pnlAC").hide();
        //alert(result.d);
    }
}


//Función que se encarga de llamar objeto AJAX para obtener la información detallada del filtro seleccionado de cualquiera de las grillas.
function llenarFiltro(id) {
    var webMethodGetFiltro="http://a21287345-001-site1.etempurl.com/WCFPremiumFilters.asmx/GetFiltro";
    var parametrosGetFiltro="{'PF_Ref':'"+id+"'}";
        $.ajax({
                type: "POST",
                url: webMethodGetFiltro,
                data: parametrosGetFiltro,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: detalleFiltro,
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert(textStatus + ": " + XMLHttpRequest.responseText);
                }
        });
        //console.log(result.d);
}


//Función que se encarga de llenar el modal con los detalles del filtro seleccionado de cualquiera de las grillas.
function detalleFiltro(result){
    var objJsonFiltro = JSON.parse(result.d);
    var HtmlFiltro;
    var rutaImgFiltro= "http://premiumfilters.com.co/ImagesFilters/";

    $.each(objJsonFiltro, function (i, item) {
        //console.log(objJsonAir); 
        $("#imgFiltro").attr("src",rutaImgFiltro+item.IMG);
        $("#ref").html(item.PF_Ref);
        $("#linea").html(item.RefLinea);
        $("#tFiltro").html(item.TipoFiltro);
        $("#tipo").html(item.Tipo);
        $("#largo").html(item.DLargo);
        $("#alto").html(item.DAl);
        $("#rosca").html(item.DAncho);
    });
    $('#myModal').modal('show');
}


//Función que se encarga de llenar la grila de los Filtros de Aire con la información obtenida del objeto AJAX.
function llenarSr_Referencias(result) {
    //console.log(result.d);
        if (IsJsonString(result.d)){

        $("#pnlRefPremium").show();
        var objJsonReferencias = JSON.parse(result.d);
        var HtmlReferencias;
//console.log(result.d);
        $.each(objJsonReferencias, function (i, item) {
            //console.log(objJsonAir); 
            HtmlReferencias+="<tr><td><a src='#'>"+item.PF_Ref+"</a></td><td>"+item.Tipo+"</td><td>"+item.Aplicaciones+"</td><td>"+item.Fabricante+"</td><td>"+item.Equivalencias+"</td></tr>"
        });
        $("#tbodyRefPremium").html(HtmlReferencias);
    }
    else{
        $("#pnlRefPremium").hide();
    }
}
