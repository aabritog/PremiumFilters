//$(document).ready(function () {
function funcionReady() {
    $("#bloquea").show();
    $("#fondoBlanco").show();
    var htmlTabla;
    var db = window.openDatabase("PFDB", "1.0", "PremiumFilterDB", 500000);
    db.transaction(crearDB, errorCB, successCB);
    db.transaction(function (tx) {
        tx.executeSql('SELECT idRef FROM REFERENCIAS', [], function (tx, results) {
            var len = results.rows.length;

            if (len > 0) {
                for (var i = 0; i < len; i++) {
                    htmlTabla += "<tr>";
                    htmlTabla += "<td><a id='" + results.rows.item(i).idRef + "' src='#' onclick='llenarFiltro(this.id)'>" + results.rows.item(i).idRef + "</a></td>";
                    htmlTabla += "<td><a id='" + results.rows.item(i).idRef + "' src='#' onclick='eliminar(this.id);'>Delete</a></td>";
                    htmlTabla += "</tr>";



                }
                $("#tbodyFavorito").html(htmlTabla);


            } else {
                $("#bloquea").hide();
                $("#fondoBlanco").hide();
                navigator.notification.alert(
                    'No favorites', // message
                    alertDismissed, // callback
                    'Information', // title
                    'OK'
                );
                //msjError(); // buttonName
                //                $("#bloquea").hide();
                //                $("#fondoBlanco").hide();


            }

            $("#bloquea").hide();
            $("#fondoBlanco").hide();


        }, errorCB);
    });

}


//});

function llenarFiltro(id) {
    $("#bloquea").show();
    $("#fondoBlanco").show();
    var webMethodGetFiltro = linkWS("GetFiltro");
    var parametrosGetFiltro = "{'PF_Ref':'" + id + "','sIdioma':'i'}";
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
        //console.log('ET_ANCHO: ' + item.ET_Ancho + ' typeof: ' + typeof (item.ET_Ancho));
        $("#imgFiltro").attr("src", rutaImgFiltro + item.IMG);
        $("#ref").html(item.PF_Ref);
        $("#linea").html(item.RefLinea);
        $("#tFiltro").html(item.TipoFiltro);
        $("#tipo").html(item.Tipo);
        $("#alto").html(item.DAl);
        $("#altoET").html(item.ET_Al);
        $("#LargoET").html(item.ET_Lar);
        if (item.ET_Ancho === null) {
            $("#AnchoET").hide();
            //$("#AnchoET").html(item.ET_Ancho);
            $("#largo").html(item.DAncho);
            $("#rosca").hide();
        } else {
            $("#AnchoET").show();
            $("#AnchoET").html(item.ET_Ancho);
            $("#largo").html(item.DLargo);
            $("#rosca").html(item.DAncho).show();
        }

    });
    $('#myModal').modal('show');
    $("#bloquea").hide();
    $("#fondoBlanco").hide();
}

function eliminar(id) {
    $("#bloquea").show();
    $("#fondoBlanco").show();
    ref = id;
    eliminarFavorito();
    location.reload();
}
