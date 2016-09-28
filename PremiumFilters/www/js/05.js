
$(document).ready(function () {

    var webMethodGetTipoAplicacion = "http://a21287345-001-site1.etempurl.com/WCFPremiumFilters.asmx/GetTipoAplicacion";
    var webMethodGetMarcaVehiculo="http://a21287345-001-site1.etempurl.com/WCFPremiumFilters.asmx/GetMarcaVehiculo";
    var webMethodGetModelo="http://a21287345-001-site1.etempurl.com/WCFPremiumFilters.asmx/GetModelo";
    var webMethodGetCilindraje="http://a21287345-001-site1.etempurl.com/WCFPremiumFilters.asmx/GetCilindraje";
    var webMethodGetAir="http://a21287345-001-site1.etempurl.com/WCFPremiumFilters.asmx/GetFAire";
    var webMethodGetOil="http://a21287345-001-site1.etempurl.com/WCFPremiumFilters.asmx/GetFOil";
    var webMethodGetFuel="http://a21287345-001-site1.etempurl.com/WCFPremiumFilters.asmx/GetFFuel";
    var webMethodGetAC="http://a21287345-001-site1.etempurl.com/WCFPremiumFilters.asmx/GetFAirAC";

          //var parameters= "{'sCountry':'Polonia'}";
          
          //SI TIENE PARAMETROS ESTA ES LA MANERA DE PASARLOS
                /*var parameters = "{'idConcepto':'" + idConcepto + "','idConceptoRelacionado':'" + idConceptoRelacionado + "','idRelacion':'" + idRelacion + "','idCardinalidad':'" + idCardinalidad + "','idCardinalidadRelacionada':'" + idCardinalidadRelacionada + "','idOntologia':'" + idOntologia + "'}";*/
        //LLAMADO A JSON AJAX LIBRERIA DE JQUERY
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
});

function IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

function llenarTipoAplicacion(result) {
    
    var objJson = JSON.parse(result.d);
    var HtmltipoAplicacion;

    $.each(objJson, function (i, item) {
        //console.log(item.Id_TMk); 
        HtmltipoAplicacion = "<option value='" + item.Id_TMk + "'>" + item.TAplicacion + "</option>";
        $("#select1").append(HtmltipoAplicacion);
    });
}

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

function llenarAir(result) {
    //console.log(result.d);
        if (IsJsonString(result.d))
        {

        var objJsonAir = JSON.parse(result.d);
        var HtmlAir;
        
        $.each(objJsonAir, function (i, item) {
            //console.log(objJsonAir); 
            HtmlAir="<tr><td><a id='"+item.AIRE+"' src='#' onclick='llenarFiltro(this.id);'>"+item.AIRE+"</a></td><td>"+item.Maño+"</td></tr>"
            $("#tblAir").append(HtmlAir);
            
        });
    }
    else{
        alert(result.d);
    }
}

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

function llenarOil(result) {
    //console.log(result.d);
    var objJsonOil = JSON.parse(result.d);
    var HtmlOil;
    
    $.each(objJsonOil, function (i, item) {
        //console.log(objJsonAir); 
        HtmlOil="<tr><td><a id='"+item.ACEITE+"' src='#' onclick='llenarFiltro(this.id);'>"+item.ACEITE+"</a></td><td>"+item.Maño+"</td></tr>"
        $("#tblAceite").append(HtmlOil);
        
    });
}

function llenarFuel(result) {
    //console.log(result.d);
    var objJsonFuel = JSON.parse(result.d);
    var HtmlFuel;
    
    $.each(objJsonFuel, function (i, item) {
        //console.log(objJsonAir); 
        HtmlFuel="<tr><td><a id='"+item.COMBUSTIBLE+"' src='#' onclick='llenarFiltro(this.id);'>"+item.COMBUSTIBLE+"</a></td><td>"+item.Maño+"</td></tr>"
        $("#tblCombustible").append(HtmlFuel);
        
    });
}

function llenarAC(result) {
    //console.log(result.d);
    if (IsJsonString(result.d)){
    var objJsonAC = JSON.parse(result.d);
    var HtmlAC;
    
    $.each(objJsonAC, function (i, item) {
        //console.log(objJsonAir); 
        HtmlAC="<tr><td><a id='"+item.AIREAC+"' src='#' onclick='llenarFiltro(this.id);'>"+item.AIREAC+"</a></td><td>"+item.Maño+"</td></tr>"
        $("#tblAC").append(HtmlAC);
        
    });
    }
    else
    {
        alert(result.d);
    }
}




