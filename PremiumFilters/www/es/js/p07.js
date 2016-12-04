$(document).ready(function() {
    var htmlTabla;
    var db = window.openDatabase("PFDB", "1.0", "PremiumFilterDB", 500000);
    db.transaction(crearDB, errorCB, successCB);
    db.transaction(function(tx) {
        tx.executeSql('SELECT idRef FROM REFERENCIAS', [], function(tx, results) {
            var len = results.rows.length;

            if (len > 0) {
                for (var i = 0; i < len; i++) {
                    htmlTabla += "<tr>";
                    htmlTabla += "<td><a id='" + results.rows.item(i).idRef + "' src='#' onclick='llenarFiltro(this.id)'>" + results.rows.item(i).idRef + "</a></td>";
                    htmlTabla += "<td><a id='" + results.rows.item(i).idRef + "' src='#' onclick='eliminar(this.id);'>Eliminar</a></td>";
                    htmlTabla += "</tr>";




                }
                $("#tbodyFavorito").html(htmlTabla);

            } else {

                msjError(); // buttonName


            }

        }, errorCB);
    });




});

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
        //console.log(objJsonAir); 
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

function eliminar(id) {
    ref = id;
    eliminarFavorito();
    location.reload();
}