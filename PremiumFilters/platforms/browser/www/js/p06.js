var totalPages;

//------------------------------------------------------------------------------
//  BLOQUE DE FUNCIONES JQUERY
//------------------------------------------------------------------------------
$(document).ready(function() {


    (function($) {
        $.get = function(key) {
            key = key.replace(/[\[]/, '\\[');
            key = key.replace(/[\]]/, '\\]');
            var pattern = "[\\?&]" + key + "=([^&#]*)";
            var regex = new RegExp(pattern);
            var url = unescape(window.location.href);
            var results = regex.exec(url);

            if (results === null) {
                return null;
            } else {
                return results[1];
            }

        }
    })(jQuery);


    var webMethodGetNumberPageAllfillters = "http://a21287345-001-site1.etempurl.com/WCFPremiumFilters.asmx/GetNumberPageAllfillters";
    var webMethodGetMovePageAllfillters = "http://a21287345-001-site1.etempurl.com/WCFPremiumFilters.asmx/MovePageAllfillters";
    var parametrosGetNumberPageAllfillters = "{'Tipo':'1'}";
    var parametrosMovePageAllfillters = "{'Page':'1','Tipo':'1'}";

    $.ajax({
        type: "POST",
        url: webMethodGetNumberPageAllfillters,
        data: parametrosGetNumberPageAllfillters,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: llenarNumPagesAllfillters,
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert(textStatus + ": " + XMLHttpRequest.responseText);
        }
    });

    $.ajax({
        type: "POST",
        url: webMethodGetMovePageAllfillters,
        data: parametrosMovePageAllfillters,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: llenarAllfilters,
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert(textStatus + ": " + XMLHttpRequest.responseText);
        }
    });

    //Evento jQuery que se encarga de llamar objeto AJAX que obtiene la informacíon del combo "Marca Vehículo".
    $("#select1").change(function() {
        var idTipoFiltro = document.getElementById("select1").value;
        var parametrosGetNumberPageAllfillters = "{'Tipo':'" + idTipoFiltro + "'}";
        var parametrosMovePageAllfillters = "{'Page':'1','Tipo':'" + idTipoFiltro + "'}";

        $.ajax({
            type: "POST",
            url: webMethodGetNumberPageAllfillters,
            data: parametrosGetNumberPageAllfillters,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: llenarNumPagesAllfillters,
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                alert(textStatus + ": " + XMLHttpRequest.responseText);
            }
        });

        $.ajax({
            type: "POST",
            url: webMethodGetMovePageAllfillters,
            data: parametrosMovePageAllfillters,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: llenarAllfilters,
            error: function(XMLHttpRequest, textStatus, errorThrown) {
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
    var webMethodGetFiltro = "http://a21287345-001-site1.etempurl.com/WCFPremiumFilters.asmx/GetFiltro";
    var parametrosGetFiltro = "{'PF_Ref':'" + id + "'}";
    $.ajax({
        type: "POST",
        url: webMethodGetFiltro,
        data: parametrosGetFiltro,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: detalleFiltro,
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert(textStatus + ": " + XMLHttpRequest.responseText);
        }
    });
}


//Función que se encarga de llenar el modal con los detalles del filtro seleccionado de cualquiera de las grillas.
function detalleFiltro(result) {
    var objJsonFiltro = JSON.parse(result.d);
    var HtmlFiltro;
    var rutaImgFiltro = "http://premiumfilters.com.co/ImagesFilters/";

    $.each(objJsonFiltro, function(i, item) {

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
}


function llenarGetSr_Allfilters(result) {

    if (IsJsonString(result.d)) {
        $("#pnlTodasRef").show();
        var objJsonAllfilters = JSON.parse(result.d);
        var HtmlAllfilters;

        $.each(objJsonAllfilters, function(i, item) {

            HtmlAllfilters += "<tr><td><a id='" + item["PREMIUM Ref"] + "' src='#' onclick='llenarFiltro(this.id);'>" + item["PREMIUM Ref"] + "</a></td><td>" + item.Tipo + "</td><td><a id='" + item["PREMIUM Ref"] + "' src='#' onclick='llenarAplicaciones(this.id);'>" + item.Aplicaciones + "</a></td><td><a id='" + item["PREMIUM Ref"] + "' src='#' onclick='llenarEquivalencias(this.id);'>" + item.Equivalencias + "</a></td></tr>"
        });
        $("#tbodyTodasRef").html(HtmlAllfilters);
    } else {
        $("#pnlTodasRef").hide();
    }
}


//Función que se encarga de llamar objeto AJAX para obtener la información de las aplicaciones segun el número de referencia.
function llenarAplicaciones(id) {
    var webMethodGetEme_Aplicaciones = "http://a21287345-001-site1.etempurl.com/WCFPremiumFilters.asmx/GetEme_Aplicaciones";
    var parametrosGetEme_Aplicaciones = "{'Pf_Ref':'" + id + "'}";
    $.ajax({
        type: "POST",
        url: webMethodGetEme_Aplicaciones,
        data: parametrosGetEme_Aplicaciones,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: detalleAplicaciones,
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert(textStatus + ": " + XMLHttpRequest.responseText);
        }
    });
}


//Función que se encarga de llenar el modal con los detalles de las aplicaciones.
function detalleAplicaciones(result) {
    var objJsondetalleAplicaciones = JSON.parse(result.d);
    var HtmldetalleAplicaciones;

    $.each(objJsondetalleAplicaciones, function(i, item) {
        HtmldetalleAplicaciones += "<tr><td>" + item.Fabricante + "</td><td>" + item.Modelo + "</td><td>" + item.McilL + "</td><td>" + item.Desde + "</td><td>" + item.Hasta + "</td><td>" + item.Motor + "</td></tr>"
    });

    $("#tbodyAplicaciones").html(HtmldetalleAplicaciones);
    $('#myModalAplicaciones').modal('show');
}


//Función que se encarga de llamar objeto AJAX para obtener la información de las equivalencias segun el número de referencia.
function llenarEquivalencias(id) {
    var webMethodGetEme_Equivalencias = "http://a21287345-001-site1.etempurl.com/WCFPremiumFilters.asmx/GetEme_Equivalencias";
    var parametrosGetEme_Equivalencias = "{'Pf_Ref':'" + id + "'}";
    $.ajax({
        type: "POST",
        url: webMethodGetEme_Equivalencias,
        data: parametrosGetEme_Equivalencias,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: detalleEquivalencias,
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert(textStatus + ": " + XMLHttpRequest.responseText);
        }
    });
}


//Función que se encarga de llenar el modal con los detalles de las equivalencias.
function detalleEquivalencias(result) {
    var objJsondetalleEquivalencias = JSON.parse(result.d);
    var HtmldetalleEquivalencias;

    $.each(objJsondetalleEquivalencias, function(i, item) {
        HtmldetalleEquivalencias += "<tr><td>" + item.Fabricante + "</td><td>" + item.Equivalencia + "</td></tr>"
    });

    $("#tbodyEquivalencias").html(HtmldetalleEquivalencias);
    $('#myModalEquivalencias').modal('show');
}


function llenarNumPagesAllfillters(result) {

    if (IsJsonString(result.d)) {
        var objJsonPages = JSON.parse(result.d);
        $.each(objJsonPages, function(i, item) {
            totalPages = item.Cantidad;
        });

        var numPageInicial = document.getElementById('hiddenPage').value;

        if (numPageInicial == 1) {
            $("#atrasButton").addClass("disabled");
        } else {
            $("#atrasButton").removeClass("disabled");
        }

        $("#pages").html("Página " + numPageInicial + " de " + totalPages);

    } else {

    }
}


function llenarAllfilters(result) {

    if (IsJsonString(result.d)) {
        $("#pnlTodas").show();
        var objJsonSrFichas = JSON.parse(result.d);
        var HtmlAllfilters;

        $.each(objJsonSrFichas, function(i, item) {
            HtmlAllfilters += "<tr>";
            HtmlAllfilters += "<td><a id='" + item["PREMIUM Ref"] + "' src='#' onclick='llenarFiltro(this.id)'>" + item["PREMIUM Ref"] + "</a></td>";
            HtmlAllfilters += "<td>" + item.Tipo + "</td>";
            HtmlAllfilters += "<td><a id='" + item["PREMIUM Ref"] + "' src='#' onclick='llenarAplicaciones(this.id);'>Ver</a></td>";
            HtmlAllfilters += "<td><a id='" + item["PREMIUM Ref"] + "' src='#' onclick='llenarEquivalencias(this.id);'>Ver</a></td>";
            HtmlAllfilters += "</tr>";
        });

        $("#tbodyTodas").html(HtmlAllfilters);
        $("#atrasButton").show();
        $("#siguienteButton").show();
    } else {
        navigator.notification.alert(
            msjSinResultados, // message
            alertDismissed, // callback
            'Información', // title
            'OK' // buttonName
        );
        $("#pnlTodas").hide();
    }
}


function siguienteFunction(numPage) {

    if (!$("#siguienteButton").hasClass("disabled")) {

        if (parseInt(numPage) == parseInt(totalPages) - 1) {
            $("#siguienteButton").addClass("disabled");
        } else {
            $("#siguienteButton").removeClass("disabled");
        }

        numPage = parseInt(numPage) + 1;
        document.getElementById('hiddenPage').value = numPage;
        var idTipoFiltro = document.getElementById("select1").value;
        var webMethodGetMovePageAllfillters = "http://a21287345-001-site1.etempurl.com/WCFPremiumFilters.asmx/MovePageAllfillters";
        var parametrosMovePageAllfillters = "{'Page':'" + numPage + "','Tipo':'" + idTipoFiltro + "'}";

        $.ajax({
            type: "POST",
            url: webMethodGetMovePageAllfillters,
            data: parametrosMovePageAllfillters,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: llenarAllfilters,
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                alert(textStatus + ": " + XMLHttpRequest.responseText);
            }
        });

        $("#pages").html("Página " + numPage + " de " + totalPages);

        if (numPage == 1) {
            $("#atrasButton").addClass("disabled");
        } else {
            $("#atrasButton").removeClass("disabled");
        }
    }

}


function atrasFunction(numPage) {

    if (!$("#atrasButton").hasClass("disabled")) {

        if (numPage == 2) {
            $("#atrasButton").addClass("disabled");
        } else {
            $("#atrasButton").removeClass("disabled");
        }

        numPage = parseInt(numPage) - 1;
        document.getElementById('hiddenPage').value = numPage;
        //var webMethodGetMovePageAllfillters="http://a21287345-001-site1.etempurl.com/WCFPremiumFilters.asmx/MovePageAllfillters";
        //var parametrosMovePageAllfillters="{'Page':'"+numPage+"'}";
        var idTipoFiltro = document.getElementById("select1").value;
        var webMethodGetMovePageAllfillters = "http://a21287345-001-site1.etempurl.com/WCFPremiumFilters.asmx/MovePageAllfillters";
        var parametrosMovePageAllfillters = "{'Page':'" + numPage + "','Tipo':'" + idTipoFiltro + "'}";

        $.ajax({
            type: "POST",
            url: webMethodGetMovePageAllfillters,
            data: parametrosMovePageAllfillters,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: llenarAllfilters,
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                alert(textStatus + ": " + XMLHttpRequest.responseText);
            }
        });


        $("#pages").html("Página " + numPage + " de " + totalPages);

        if (parseInt(numPage) == parseInt(totalPages)) {
            $("#siguienteButton").addClass("disabled");
        } else {
            $("#siguienteButton").removeClass("disabled");
        }
    }

}
