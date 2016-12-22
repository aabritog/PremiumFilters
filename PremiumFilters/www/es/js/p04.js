//------------------------------------------------------------------------------
//  BLOQUE DE FUNCIONES JQUERY
//------------------------------------------------------------------------------
$(document).ready(function () {

    //Variables que contiene la ruta de los Web  Services a llamar.
    var webMethodGetSr_Referencias = linkWS('GetSr_Referencias');
    //console.log(webMethodGetSr_Referencias);
    //var webMethodGetSr_Referencias = "http://a21287345-001-site1.etempurl.com/WCFPremiumFilters.asmx/GetSr_Referencias";

    //Evento jQuery que se encarga de llamar los objetos AJAX que van a obtener la información de cada una de las grillas de resultados.
    $("#btnBuscar").click(function () {

        $("#bloquea").show();
        $("#fondoBlanco").show();

        var idPF_Ref = document.getElementById("inpBuscar").value
        var parametrosGetSr_Referencias = "{'PF_Ref':'" + idPF_Ref + "'}";

        if (idPF_Ref == "") {
            navigator.notification.alert(
                msjValidaciones("e", 1), // message
                alertDismissed, // callback
                'Información', // title
                'OK' // buttonName
            );

        } else {

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
        }
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
    $("#bloquea").show();
    $("#fondoBlanco").show();
    //var webMethodGetFiltro=  linkWS('GetFiltro');
    //console.log(webMethodGetFiltro);
    var webMethodGetFiltro = linkWS("GetFiltro");
    var parametrosGetFiltro = "{'PF_Ref':'" + id + "','sIdioma':'e'}";
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
function detalleFiltro(result) {
    var objJsonFiltro = JSON.parse(result.d);
    var HtmlFiltro;
    var rutaImgFiltro = "http://premiumfilters.com.co/ImagesFilters/";

    $.each(objJsonFiltro, function (i, item) {

        $("#imgFiltro").attr("src", rutaImgFiltro + item.IMG);
        $("#ref").html(item.PF_Ref);
        $("#linea").html(item.RefLinea);
        $("#tFiltro").html(item.TipoFiltro);
        $("#tipo").html(item.Tipo);
        $("#largo").html(item.DLargo);
        $("#alto").html(item.DAl);
        $("#rosca").html(item.DAncho);
    });
    $('#myModal').modal('show');
    $("#bloquea").hide();
    $("#fondoBlanco").hide();
}


//Función que se encarga de llenar la grila de los Filtros de Aire con la información obtenida del objeto AJAX.
function llenarSr_Referencias(result) {

    if (IsJsonString(result.d)) {

        $("#pnlRefPremium").show();
        var objJsonReferencias = JSON.parse(result.d);
        var HtmlReferencias;

        $.each(objJsonReferencias, function (i, item) {


            HtmlReferencias += "<tr>";
            HtmlReferencias += "<td><a id='" + item.PF_Ref + "' src='#' onclick='llenarFiltro(this.id);'>" + item.PF_Ref + "</a></td>";
            HtmlReferencias += "<td>" + item.Tipo + "</td>";
            HtmlReferencias += "<td><a id='" + item.PF_Ref + "' src='#' onclick='llenarAplicaciones(this.id);'>Ver</a></td>";
            HtmlReferencias += "<td>" + item.Fabricante + "</td>";
            HtmlReferencias += "<td><a id='" + item.PF_Ref + "' src='#' onclick='llenarEquivalencias(this.id);'>Ver</a></td>";
            HtmlReferencias += "</tr>"
        });
        $("#tbodyRefPremium").html(HtmlReferencias);
    } else {


        navigator.notification.alert(
            msjValidaciones("e", 0), // message
            alertDismissed, // callback
            'Información', // title
            'OK' // buttonName
        );
        $("#pnlRefPremium").hide();
    }

    //$.mobile.loading("hide");
    $("#bloquea").hide();
    $("#fondoBlanco").hide();
}


//Función que se encarga de llamar objeto AJAX para obtener la información de las aplicaciones segun el número de referencia.
function llenarAplicaciones(id) {

    $("#bloquea").show();
    $("#fondoBlanco").show();

    var webMethodGetEme_Aplicaciones = linkWS("GetEme_Aplicaciones");
    var parametrosGetEme_Aplicaciones = "{'Pf_Ref':'" + id + "'}";

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
function detalleAplicaciones(result) {
    var objJsondetalleAplicaciones = JSON.parse(result.d);
    var HtmldetalleAplicaciones;

    $.each(objJsondetalleAplicaciones, function (i, item) {
        HtmldetalleAplicaciones += "<tr><td>" + item.Fabricante + "</td><td>" + item.Modelo + "</td><td>" + item.McilL + "</td><td>" + item.Desde + "</td><td>" + item.Hasta + "</td><td>" + item.Motor + "</td></tr>"
    });

    $("#tbodyAplicaciones").html(HtmldetalleAplicaciones);
    $('#myModalAplicaciones').modal('show');
    $("#bloquea").hide();
    $("#fondoBlanco").hide();
}


//Función que se encarga de llamar objeto AJAX para obtener la información de las equivalencias segun el número de referencia.
function llenarEquivalencias(id) {
    $("#bloquea").show();
    $("#fondoBlanco").show();
    var webMethodGetEme_Equivalencias = linkWS("GetEme_Equivalencias");
    var parametrosGetEme_Equivalencias = "{'Pf_Ref':'" + id + "'}";

    $.ajax({
        type: "POST",
        url: webMethodGetEme_Equivalencias,
        data: parametrosGetEme_Equivalencias,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: detalleEquivalencias,
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(textStatus + ": " + XMLHttpRequest.responseText);
        }
    });
}


//Función que se encarga de llenar el modal con los detalles de las equivalencias.
function detalleEquivalencias(result) {
    var objJsondetalleEquivalencias = JSON.parse(result.d);
    var HtmldetalleEquivalencias;

    $.each(objJsondetalleEquivalencias, function (i, item) {
        HtmldetalleEquivalencias += "<tr><td>" + item.Fabricante + "</td><td>" + item.Equivalencia + "</td></tr>"
    });

    $("#tbodyEquivalencias").html(HtmldetalleEquivalencias);
    $('#myModalEquivalencias').modal('show');
    $("#bloquea").hide();
    $("#fondoBlanco").hide();
}
