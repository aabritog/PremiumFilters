var tipoGlobal;
var totalPages;

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

    var get = $.get("tipo");
    var tipo;
    if (get == "AC") {
        tipo = "AIRE ACONDICIONADO";

    } else {
        tipo = get;
    }
    tipoGlobal = tipo;


    var webMethodGetSr_Fichas = linkWS("GetSr_Fichas");
    var webMethodGetNumPages = linkWS("GetNumberPage");
    var webMethodGetMovePages = linkWS("MovePage");
    var parametrosSr_Fichas = "{'PF_Ref':'','Tipo':'" + tipo + "'}";
    var parametrosMovePage = "{'PF_Ref':'','Tipo':'" + tipo + "','Page':'1'}";


    $.ajax({
        type: "POST",
        url: webMethodGetNumPages,
        data: parametrosSr_Fichas,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: llenarNumPages,
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert(textStatus + ": " + XMLHttpRequest.responseText);
        }
    });

    $.ajax({
        type: "POST",
        url: webMethodGetMovePages,
        data: parametrosMovePage,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: llenarSrFichas,
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert(textStatus + ": " + XMLHttpRequest.responseText);
        }
    });



    //Evento jQuery que se encarga de llamar los objetos AJAX que van a obtener la información de cada una de las grillas de resultados.
    $("#btnBuscar").click(function() {


        var idPF_Ref = document.getElementById("inpBuscar").value
        parametrosSr_Fichas = "{'PF_Ref':'" + idPF_Ref + "','Tipo':'" + tipo + "'}";


        //Objeto AJAX para la grilla de los Filtros de Aire.
        $.ajax({
            type: "POST",
            url: webMethodGetSr_Fichas,
            data: parametrosSr_Fichas,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: llenarSrFichas,
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                navigator.notification.alert(
                    textStatus + ": " + XMLHttpRequest.responseText, // message
                    alertDismissed, // callback
                    'Error', // title
                    'OK' // buttonName
                );

            }
        });

        $("#siguienteButton").addClass("disabled");
        $("#atrasButton").addClass("disabled");
        document.getElementById('hiddenPage').value = 1;
        $("#pages").html("Página 1 de 1");
    });

    $("#btnLimpiar").click(function() {

        //var ref = window.open('https://docs.google.com/viewer?url=http://premiumfilters.com.co/PDFFilters/ACP-004.pdf&embedded=true', '_blank', 'location=yes');
        document.getElementById("inpBuscar").value = "";
        parametrosSr_Fichas = "{'PF_Ref':'','Tipo':'" + tipo + "'}";

        $("#siguienteButton").removeClass("disabled");
        $("#atrasButton").removeClass("disabled");
        document.getElementById('hiddenPage').value = 1;

        $.ajax({
            type: "POST",
            url: webMethodGetNumPages,
            data: parametrosSr_Fichas,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: llenarNumPages,
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                alert(textStatus + ": " + XMLHttpRequest.responseText);
            }
        });
        //Objeto AJAX para la grilla de los Filtros de Aire.
        $.ajax({
            type: "POST",
            url: webMethodGetMovePages,
            data: parametrosMovePage,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: llenarSrFichas,
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                alert(textStatus + ": " + XMLHttpRequest.responseText);
            }
        });




    });


});

//var numPage=1;



function IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

function llenarSrFichas(result) {

    if (IsJsonString(result.d)) {

        $("#pnlRefPremium").show();
        var objJsonSrFichas = JSON.parse(result.d);
        var HtmlSrFichas;


        $.each(objJsonSrFichas, function(i, item) {

            HtmlSrFichas += "<tr><td><a id='" + item["PREMIUM Ref"] + "' src='#' onclick='llenarFiltro(this.id)'>" + item["PREMIUM Ref"] + "</a></td><td>" + item.Tipo + "</td><td><a src='#' onclick='abrirPDF(\"" + item.FichaLink + "\");'>Ver</a></td></tr>";

        });
        $("#tbodySrFicha").html(HtmlSrFichas);
        $("#atrasButton").show();
        $("#siguienteButton").show();
    } else {
        navigator.notification.alert(
            msjSinResultados, // message
            alertDismissed, // callback
            'Información', // title
            'OK' // buttonName
        );
        $("#pnlRefPremium").hide();
    }
}


function abrirPDF(ruta) {

    var rutaGoogleDocs = 'https://docs.google.com/viewer?url=' + ruta + '&embedded=true';
    var ref = window.open(rutaGoogleDocs, '_blank', 'location=yes');

}

function llenarFiltro(id) {
    var webMethodGetFiltro = linkWS("GetFiltro");
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

function llenarNumPages(result) {

    if (IsJsonString(result.d)) {
        var objJsonPages = JSON.parse(result.d);
        //var totalPages;

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

function siguienteFunction(numPage) {
    if (!$("#siguienteButton").hasClass("disabled")) {

        if (parseInt(numPage) == parseInt(totalPages) - 1) {
            $("#siguienteButton").addClass("disabled");
        } else {
            $("#siguienteButton").removeClass("disabled");
        }

        numPage = parseInt(numPage) + 1;
        document.getElementById('hiddenPage').value = numPage;

        var webMethodGetMovePages = linkWS("MovePage");
        var parametrosMovePage = "{'PF_Ref':'','Tipo':'" + tipoGlobal + "','Page':'" + numPage + "'}";

        $.ajax({
            type: "POST",
            url: webMethodGetMovePages,
            data: parametrosMovePage,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: llenarSrFichas,
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


        var webMethodGetMovePages = linkWS("MovePage");
        var parametrosMovePage = "{'PF_Ref':'','Tipo':'" + tipoGlobal + "','Page':'" + numPage + "'}";

        $.ajax({
            type: "POST",
            url: webMethodGetMovePages,
            data: parametrosMovePage,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: llenarSrFichas,
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
