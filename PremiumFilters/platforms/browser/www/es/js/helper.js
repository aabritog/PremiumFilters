var domainWS="http://operatecnologias-001-site1.dtempurl.com/WCFPremiumFilters.asmx/";
var consulta;
var consultaValidar = "";
var consultaExistencia = "";
var accion = "";
var parametros = [];
var ref;


function msjValidaciones(lang,tipo) {
    var msj = "";
    if (lang=="e"){
        switch(tipo){
            case 0: //para busqueda sin resultados
                msj="Búsqueda sin resultados";
                break;
            case 1: //valida campo de busqueda vacio
                msj="El campo de busqueda no puede estar vacío";
                break;
        }
    }

    return msj
}

function linkWS(method){
    var linkWS="";

    try{
        linkWS=domainWS.toString()+method.toString();
        //console.log(linkWS);
    }catch(e){
        console.log(e.toString());
    }

    return linkWS.toString();
}

function crearDB(tx) {
    //tx.executeSql('DROP TABLE IF EXISTS DEMO');
    tx.executeSql('CREATE TABLE IF NOT EXISTS REFERENCIAS (idRef varchar(50) NOT NULL)');
    //tx.executeSql('INSERT INTO DEMO (id, data) VALUES (1, "First row")');
    //tx.executeSql('UPDATE DEMO SET data="dataModificada" WHERE id = 1');
}

function errorCB(err) {
    alert("Error processing SQL: " + err.code);
}

function successCB() {
    console.log("success!");
}

function comprobarFavorito(idRef) {
    var db = window.openDatabase("PFDB", "1.0", "PremiumFilterDB", 200000);
    db.transaction(crearDB, errorCB, successCB);
    ref = idRef;

    consultaValidar = "SELECT idRef FROM REFERENCIAS WHERE idRef=?";

    parametros = [idRef];
    db.transaction(queryDB, errorCB);



}

function comprobarExistencia(idRef, termino) {
    var db = window.openDatabase("PFDB", "1.0", "PremiumFilterDB", 500000);
    db.transaction(crearDB, errorCB, successCB);
    db.transaction(function(tx) {
        tx.executeSql('SELECT idRef FROM REFERENCIAS WHERE idRef=?', [idRef], function(transaction, result) {

            if (result.rows.length == 0) {

                termino(false);
            } else {

                termino(true);
            }


        }, errorCB);
    });

}

function msjError() {
    navigator.notification.alert(
        'No tiene favoritos', // message
        alertDismissed, // callback
        'Información', // title
        'OK'
    );

}

function guardarFavorito() {
    var db = window.openDatabase("PFDB", "1.0", "PremiumFilterDB", 200000);

    consulta = "INSERT INTO REFERENCIAS (idRef) VALUES (?) ";

    parametros = [ref];

    db.transaction(queryDB, errorCB);


    navigator.notification.alert(
        'Agregado a Favoritos', // message
        alertDismissed, // callback
        'Información', // title
        'OK' // buttonName
    );

}

function alertDismissed() {
    // do something
}

function eliminarFavorito() {
    var db = window.openDatabase("PFDB", "1.0", "PremiumFilterDB", 200000);
    consulta = "DELETE FROM REFERENCIAS WHERE idRef=? ";
    parametros = [ref];
    db.transaction(queryDB, errorCB);

    navigator.notification.alert(
        'Eliminado de Favoritos', // message
        alertDismissed, // callback
        'Información', // title
        'OK' // buttonName
    );

    $("#bloquea").hide();
    $("#fondoBlanco").hide();

}

function queryDB(tx) {
    if (consultaValidar == "") {
        tx.executeSql(consulta, parametros, querySuccess, errorCB);
    } else {
        tx.executeSql(consultaValidar, parametros, querySuccessComprobar, errorCB);

    }
}

function queryExistenciaDB(tx) {
    console.log("ce: " + consultaExistencia);
    tx.executeSql(consultaExistencia, parametros, queryExistencia, errorCB);

}


function querySuccess(tx, results) {
    var ulElemento = $('#' + ref + 'F');
    if (ulElemento.hasClass("pollsNo")) {
        ulElemento.removeClass("pollsNo");
        ulElemento.addClass("pollsSi");
    } else {
        ulElemento.removeClass("pollsSi");
        ulElemento.addClass("pollsNo");
    }

}

function querySuccessComprobar(tx, results) {
    consultaValidar = "";
    var len = results.rows.length;
    console.log(len);
    if (len == 0) {
        guardarFavorito();
    } else {
        eliminarFavorito();
    }

}

function queryExistencia(tx, results) {
    var len = results.rows.length;
    console.log(len);

    for (var i = 0; i < len; i++) {
        console.log("Row = " + i + " idRef = " + results.rows.item(i).idRef);
    }

}

/*function changePage(page) {
    //$( ":mobile-pagecontainer" ).pagecontainer( "change", page, { changeHash: false } );
    $.mobile.changePage(page,{ changeHash: false});
}*/
