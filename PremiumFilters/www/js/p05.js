
//------------------------------------------------------------------------------
//  BLOQUE DE FUNCIONES JQUERY
//------------------------------------------------------------------------------
$(document).ready(function () {

    //Variables que contiene la ruta de los Web  Services a llamar.
    var webMethodGetSt_CompetidoresRef ="http://a21287345-001-site1.etempurl.com/WCFPremiumFilters.asmx/GetSt_CompetidoresRef";

//Evento jQuery que se encarga de llamar los objetos AJAX que van a obtener la información de cada una de las grillas de resultados.
    $("#btnBuscar").click(function(){

        var idOtraRef = document.getElementById("inpBuscar").value
        var parametrosGetSt_CompetidoresRef = "{'OtraRef':'" + idOtraRef + "'}";
        
        //Objeto AJAX para la grilla de los Filtros de Aire.
        $.ajax({
                type: "POST",
                url: webMethodGetSt_CompetidoresRef,
                data: parametrosGetSt_CompetidoresRef,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: llenarSt_CompetidoresRef,
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
}


//Función que se encarga de llenar el modal con los detalles del filtro seleccionado de cualquiera de las grillas.
function detalleFiltro(result){
    var objJsonFiltro = JSON.parse(result.d);
    var HtmlFiltro;
    var rutaImgFiltro= "http://premiumfilters.com.co/ImagesFilters/";

    $.each(objJsonFiltro, function (i, item) {
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
function llenarSt_CompetidoresRef(result) {
    //console.log(result.d);
        if (IsJsonString(result.d)){

        $("#pnlEquivalencias").show();
        var objJsonCompetidoresRef = JSON.parse(result.d);
        var HtmlCompetidoresRef;
//console.log(result.d);
        $.each(objJsonCompetidoresRef, function (i, item) {
            HtmlCompetidoresRef+="<tr><td><a id='"+ item["PREMIUM Ref"] +"' src='#' onclick='llenarFiltro(this.id);'>"+item["PREMIUM Ref"]+"</a></td><td>"+item["Otra Ref"]+"</td><td>"+item.Fabricante+"</td><td><a id='"+ item["PREMIUM Ref"] +"' src='#' onclick='llenarAplicaciones(this.id);'>"+item.Aplicaciones+"</a></td></tr>"
        });
        $("#tbodyEquivalencias").html(HtmlCompetidoresRef);
    }
    else{
        $("#pnlEquivalencias").hide();
    }
}


//Función que se encarga de llamar objeto AJAX para obtener la información de las aplicaciones segun el número de referencia.
function llenarAplicaciones(id) {
    var webMethodGetEme_Aplicaciones ="http://a21287345-001-site1.etempurl.com/WCFPremiumFilters.asmx/GetEme_Aplicaciones";
    var parametrosGetEme_Aplicaciones="{'Pf_Ref':'"+id+"'}";
        $.ajax({
                type: "POST",
                url: webMethodGetEme_Aplicaciones,
                data: parametrosGetEme_Aplicaciones,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: detalleAplicaciones,
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert(textStatus + ": " + XMLHttpRequest.responseText);
                }
        });
}


//Función que se encarga de llenar el modal con los detalles de las aplicaciones.
function detalleAplicaciones(result){
    var objJsondetalleAplicaciones = JSON.parse(result.d);
    var HtmldetalleAplicaciones;

    $.each(objJsondetalleAplicaciones, function (i, item) {
        HtmldetalleAplicaciones+="<tr><td>"+item.Fabricante+"</td><td>"+item.Modelo+"</td><td>"+item.McilL+"</td><td>"+item.Desde+"</td><td>"+item.Hasta+"</td><td>"+item.Motor+"</td></tr>"
    });

    $("#tbodyAplicaciones").html(HtmldetalleAplicaciones);
    $('#myModalAplicaciones').modal('show');
}
