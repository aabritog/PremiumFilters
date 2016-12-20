//------------------------------------------------------------------------------
//  BLOQUE DE FUNCIONES JQUERY
//------------------------------------------------------------------------------
var resultados = false;
$(document).ready(function () {

    
    $("#bloquea").show();
    $("#fondoBlanco").show();
    //Variables que contiene la ruta de los Web  Services a llamar.
    var webMethodGetTipoAplicacion = linkWS("GetTipoAplicacion");
    var webMethodGetMarcaVehiculo = linkWS("GetMarcaVehiculo");
    var webMethodGetModelo = linkWS("GetModelo");
    var webMethodGetCilindraje = linkWS("GetCilindraje");
    var webMethodGetAir = linkWS("GetFAire");
    var webMethodGetOil = linkWS("GetFOil");
    var webMethodGetFuel = linkWS("GetFFuel");
    var webMethodGetAC = linkWS("GetFAirAC");
    var webMethodGetSr_Referencias = linkWS("GetSr_Referencias");
    var parametrosGetTipoAplicacion = "{'sIdioma':'i'}";

    //Objeto AJAX que se encarga de obtener la informacíon del combo "Tipo Aplicación".
    $.ajax({
        type: "POST",
        url: webMethodGetTipoAplicacion,
        data: parametrosGetTipoAplicacion,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: llenarTipoAplicacion,
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(textStatus + ": " + XMLHttpRequest.responseText);
        }
    });




    //Evento jQuery que se encarga de llamar objeto AJAX que obtiene la informacíon del combo "Marca Vehículo".
    $("#select1").change(function () {
        $("#bloquea").show();
        $("#fondoBlanco").show();
        var idTipoAplicacion = document.getElementById("select1").value;
        var parametrosGetMarcaVehiculo = "{'Id_TMk':'" + idTipoAplicacion + "'}";
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
    $("#select2").change(function () {
        $("#bloquea").show();
        $("#fondoBlanco").show();
        var idMarcaVehiculo = document.getElementById("select2").value;

        var parametrosGetModelo = "{'Id_Mk':'" + idMarcaVehiculo + "'}";
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
    $("#select3").change(function () {
        $("#bloquea").show();
        $("#fondoBlanco").show();
        var idTipoAplicacion = document.getElementById("select1").value
        var idModelo = document.getElementById("select3").value;

        var parametrosGetCilindraje = "{'Id_RefMk':'" + idModelo + "','Id_TMk':'" + idTipoAplicacion + "','sIdioma':'i'}";
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
    $("#select4").change(function () {
        $("#bloquea").show();
        $("#fondoBlanco").show();

        var idModelo = document.getElementById("select3").value
        var idCilindraje = document.getElementById("select4").value;
        var motCap;

        if (document.getElementById("select1").value == 1 || document.getElementById("select1").value == 4) {
            motCap = '';
        } else {
            motCap = document.getElementById("select4").value;
            idCilindraje = '0';
        }
        /*if (idCilindraje != '0') {
            motCap = "";
        } else {
            motCap = $("#select4").text();
        }*/

        var parametrosGetAir = "{'Id_RefMk':'" + idModelo + "','McilL':'" + idCilindraje + "','MotCap':'" + motCap + "','sIdioma':'i'}";
        var parametrosGetOil = parametrosGetAir;
        var parametrosGetFuel = parametrosGetAir;
        var parametrosGetAC = parametrosGetAir;

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
    $("#btnBuscar").click(function () {

        $.mobile.loading("show", {
            text: "Cargando...",
            textVisible: true,
            theme: "a",
            html: ""
        });
        var idPF_Ref = document.getElementById("inpBuscar").value
        var parametrosGetSr_Referencias = "{'PF_Ref':'" + idPF_Ref + "'}";

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
console.log(result.d);
    var objJson = JSON.parse(result.d);
    var HtmltipoAplicacion;

    $.each(objJson, function (i, item) {

        HtmltipoAplicacion = "<option value='" + item.Id_TMk + "'>" + item.TAplicacion + "</option>";
        $("#select1").append(HtmltipoAplicacion);
    });

    $("#bloquea").hide();
    $("#fondoBlanco").hide();
}


//Función que se encarga de llenar el combo "Marca Vehiculo" con la información obtenida del objeto AJAX.
function llenarMarcaVehiculo(result) {

    var objJsonMarcaVehiculo = JSON.parse(result.d);
    var HtmlMarcaVehiculo;
    HtmlMarcaVehiculo = "<option value='#'>Select...</option>";
    $.each(objJsonMarcaVehiculo, function (i, item) {

        HtmlMarcaVehiculo += "<option value='" + item.Id_Mk + "'>" + item.Marca + "</option>";
    });
    $("#select2").html(HtmlMarcaVehiculo);
    $("#select3").html("<option value='#'>Select...</option>");
    $("#select4").html("<option value='#'>Select...</option>");
    $("#bloquea").hide();
    $("#fondoBlanco").hide();
}


//Función que se encarga de llenar el combo "Modelo" con la información obtenida del objeto AJAX.
function llenarModelo(result) {

    var objJsonModelo = JSON.parse(result.d);
    var HtmlModelo;
    HtmlModelo = "<option value='#'>Select...</option>";
    $.each(objJsonModelo, function (i, item) {

        HtmlModelo += "<option value='" + item.Id_RefMk + "'>" + item.Ref_Marca + "</option>";
    });
    $("#select3").html(HtmlModelo);
    $("#select4").html("<option value='#'>Select...</option>");
    $("#bloquea").hide();
    $("#fondoBlanco").hide();
}


//Función que se encarga de llenar el combo "Motor/Capacidad - Cilindraje" con la información obtenida del objeto AJAX.
function llenarCilindraje(result) {

    var objJsonCilindraje = JSON.parse(result.d);
    var HtmlCilindraje;
    HtmlCilindraje = "<option value='#'>Select...</option>";
    $.each(objJsonCilindraje, function (i, item) {

        if (document.getElementById("select1").value == 1 || document.getElementById("select1").value == 4) {
            HtmlCilindraje += "<option value='" + item.McilL + "'>" + item.Mcc + "</option>";

            $("#lblCilindraje").html('Cilindraje:');
        } else {
            HtmlCilindraje += "<option value='"+ item.MotCap +"'>" + item.MotCap + "</option>";
            $("#lblCilindraje").html('Motor/Capacidad:');
        }

    });

    $("#select4").html(HtmlCilindraje);
    $("#bloquea").hide();
    $("#fondoBlanco").hide();
}


//Función que se encarga de llenar la grila de los Filtros de Aire con la información obtenida del objeto AJAX.
function llenarAir(result) {

    if (IsJsonString(result.d)) {

        $("#pnlAir").show();
        var objJsonAir = JSON.parse(result.d);
        var HtmlAir;
        var resultFunction;

        $.each(objJsonAir, function (i, item) {


            comprobarExistencia(item.AIRE, function (r) {

                HtmlAir += "<tr><td><a id='" + item.AIRE + "' src='#' onclick='llenarFiltro(this.id);'>" + item.AIRE + "</a></td><td>" + item.Maño + "</td>"

                if (r) {
                    HtmlAir += "<td><ul id='" + item.AIRE + "F' class='pollsSi'><li><a onclick='comprobarFavorito(\"" + item.AIRE + "\");'>1</a></li></td></tr>"
                } else {
                    HtmlAir += "<td><ul id='" + item.AIRE + "F' class='pollsNo'><li><a onclick='comprobarFavorito(\"" + item.AIRE + "\");'>1</a></li></td></tr>"
                }
                $("#tbodyAir").html(HtmlAir);
            });

            resultados = true;

        });

    } else {
        $("#pnlAir").hide();
        
    }
}


//Función que se encarga de llenar la grila de los Filtros de Aceite con la información obtenida del objeto AJAX.
function llenarOil(result) {

    if (IsJsonString(result.d)) {
        $("#pnlOil").show();
        var objJsonOil = JSON.parse(result.d);
        var HtmlOil;

        $.each(objJsonOil, function (i, item) {

            comprobarExistencia(item.ACEITE, function (r) {

                HtmlOil += "<tr><td><a id='" + item.ACEITE + "' src='#' onclick='llenarFiltro(this.id);'>" + item.ACEITE + "</a></td><td>" + item.Maño + "</td>"
                //resultFunction=r;
                //return resultFunction;
                if (r) {
                    HtmlOil += "<td><ul id='" + item.ACEITE + "F' class='pollsSi'><li><a onclick='comprobarFavorito(\"" + item.ACEITE + "\");'>1</a></li></td></tr>"
                } else {
                    HtmlOil += "<td><ul id='" + item.ACEITE + "F' class='pollsNo'><li><a onclick='comprobarFavorito(\"" + item.ACEITE + "\");'>1</a></li></td></tr>"
                }
                $("#tbodyOil").html(HtmlOil);
            });

            resultados = true;
        });

    } else {
        $("#pnlOil").hide();
    }
}


//Función que se encarga de llenar la grila de los Filtros de Combustible con la información obtenida del objeto AJAX.
function llenarFuel(result) {

    if (IsJsonString(result.d)) {

        $("#pnlFuel").show();
        var objJsonFuel = JSON.parse(result.d);
        var HtmlFuel;

        $.each(objJsonFuel, function (i, item) {


            comprobarExistencia(item.COMBUSTIBLE, function (r) {

                HtmlFuel += "<tr><td><a id='" + item.COMBUSTIBLE + "' src='#' onclick='llenarFiltro(this.id);'>" + item.COMBUSTIBLE + "</a></td><td>" + item.Maño + "</td>"

                if (r) {
                    HtmlFuel += "<td><ul id='" + item.COMBUSTIBLE + "F' class='pollsSi'><li><a onclick='comprobarFavorito(\"" + item.COMBUSTIBLE + "\");'>1</a></li></td></tr>"
                } else {
                    HtmlFuel += "<td><ul id='" + item.COMBUSTIBLE + "F' class='pollsNo'><li><a onclick='comprobarFavorito(\"" + item.COMBUSTIBLE + "\");'>1</a></li></td></tr>"
                }
                $("#tbodyFuel").html(HtmlFuel);
            });

            resultados = true;

        });

    } else {
        $("#pnlFuel").hide();
    }
}


//Función que se encarga de llenar la grila de los Filtros de Aire Acondicionado con la información obtenida del objeto AJAX.
function llenarAC(result) {

    if (IsJsonString(result.d)) {
        $("#pnlAC").show();
        var objJsonAC = JSON.parse(result.d);
        var HtmlAC;

        $.each(objJsonAC, function (i, item) {


            comprobarExistencia(item.AIREAC, function (r) {

                HtmlAC += "<tr><td><a id='" + item.AIREAC + "' src='#' onclick='llenarFiltro(this.id);'>" + item.AIREAC + "</a></td><td>" + item.Maño + "</td>"

                if (r) {
                    HtmlAC += "<td><ul id='" + item.AIREAC + "F' class='pollsSi'><li><a onclick='comprobarFavorito(\"" + item.AIREAC + "\");'>1</a></li></td></tr>"
                } else {
                    HtmlAC += "<td><ul id='" + item.AIREAC + "F' class='pollsNo'><li><a onclick='comprobarFavorito(\"" + item.AIREAC + "\");'>1</a></li></td></tr>"
                }
                $("#tbodyAC").html(HtmlAC);
            });
            resultados = true;

        });

    } else {
        $("#pnlAC").hide();

    }

    //$.mobile.loading("hide");
    $("#bloquea").hide();
    $("#fondoBlanco").hide();
    /*if (!resultados) {
        navigator.notification.alert(
            msjValidaciones("e", 0), // message
            alertDismissed, // callback
            'Información', // title
            'OK' // buttonName
        );
    }*/

}
//Función que se encarga de llamar objeto AJAX para obtener la información detallada del filtro seleccionado de cualquiera de las grillas.
function llenarFiltro(id) {
    $("#bloquea").show();
    $("#fondoBlanco").show();
    var webMethodGetFiltro = linkWS("GetFiltro");
    var parametrosGetFiltro = "{'PF_Ref':'" + id + "'}";
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
    //$.mobile.loading("hide");
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

            HtmlReferencias += "<tr><td><a src='#'>" + item.PF_Ref + "</a></td><td>" + item.Tipo + "</td><td>" + item.Aplicaciones + "</td><td>" + item.Fabricante + "</td><td>" + item.Equivalencias + "</td></tr>"
        });
        $("#tbodyRefPremium").html(HtmlReferencias);
    } else {
        $("#pnlRefPremium").hide();
    }

    //$.mobile.loading("hide");
    $("#bloquea").hide();
    $("#fondoBlanco").hide();
}
