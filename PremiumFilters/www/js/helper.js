var consulta;
var consultaValidar = "";
var consultaExistencia = "";
var accion = "";
var parametros = [];
var ref;
const msjSinResultados="Búsqueda sin resultados";


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
    /*console.log(idRef);*/
    consultaValidar = "SELECT idRef FROM REFERENCIAS WHERE idRef=?";
    //db.transaction(queryDB,errorCB);

    //console.log("a: "+accion);

    /*if (accion=="insert"){

            consulta="INSERT INTO REFERENCIAS (idRef) VALUES (?) ";
        }else{
            consulta="DELETE FROM REFERENCIAS WHERE idRef=?";   
        }*/
    parametros = [idRef];
    /*console.log(consultaValidar + "p: " + parametros);*/
    db.transaction(queryDB, errorCB);



}
//var respuestaExistencia;
function comprobarExistencia(idRef, termino) {
    var db = window.openDatabase("PFDB", "1.0", "PremiumFilterDB", 500000);
    db.transaction(crearDB, errorCB, successCB);
    //idRef;

    //console.log(idRef);
    //consultaExistencia="SELECT idRef FROM REFERENCIAS WHERE idRef=?";
    //parametros=[idRef];
    //console.log("ce: "+consultaExistencia + "p: "+ parametros);
    db.transaction(function(tx) {
        tx.executeSql('SELECT idRef FROM REFERENCIAS WHERE idRef=?', [idRef], function(transaction, result) {
            //console.log(result.rows.length);
            if (result.rows.length == 0) {
                //respuestaExistencia=false;
                termino(false);
            } else {
                //respuestaExistencia=true;
                termino(true);
            }

            //termino(respuestaExistencia);
        }, errorCB);
    });
    //termino();//console.log(resulExistencia);
    //return resulExistencia;




}

function msjError(){
                    navigator.notification.alert(
                    'No tiene favoritos', // message
                    alertDismissed, // callback
                    'Información', // title
                    'OK'
                     );

}

function guardarFavorito() {
    var db = window.openDatabase("PFDB", "1.0", "PremiumFilterDB", 200000);
    //db.transaction(crearDB, errorCB, successCB);
    //ref=idRef;

    consulta = "INSERT INTO REFERENCIAS (idRef) VALUES (?) ";

    parametros = [ref];
    /*console.log(consulta + "p: " + parametros);*/
    db.transaction(queryDB, errorCB);


    navigator.notification.alert(
        'Agregado a Favoritos', // message
        alertDismissed, // callback
        'Información', // title
        'OK' // buttonName
    );
    //consultaValidar="";


}

function alertDismissed() {
    // do something
}

function eliminarFavorito() {
    var db = window.openDatabase("PFDB", "1.0", "PremiumFilterDB", 200000);
    //db.transaction(crearDB, errorCB, successCB);
    consulta = "DELETE FROM REFERENCIAS WHERE idRef=? ";
    parametros = [ref];
    //console.log(consulta + "p: " + parametros);
    db.transaction(queryDB, errorCB);

    navigator.notification.alert(
        'Eliminado de Favoritos', // message
        alertDismissed, // callback
        'Información', // title
        'OK' // buttonName
    );

}



/*var db = window.openDatabase("DBTest", "1.0", "PhoneGap Demo", 200000);
db.transaction(populateDB, errorCB, successCB);*/
function queryDB(tx) {
    /*console.log("cv: " + consultaValidar);*/
    if (consultaValidar == "") {
        tx.executeSql(consulta, parametros, querySuccess, errorCB);
    } else {
        tx.executeSql(consultaValidar, parametros, querySuccessComprobar, errorCB);

    }
}

function queryExistenciaDB(tx) {
    console.log("ce: " + consultaExistencia);
    //if (consultaValidar==""){
    tx.executeSql(consultaExistencia, parametros, queryExistencia, errorCB);
    //console.log("var boolResulQuery: "+boolResulQuery);
    //console.log("tx.executeSql: "+tx.executeSql(consultaExistencia, parametros, queryExistencia, errorCB));
    //return boolResulQuery;

    //}else{
    //  tx.executeSql(consultaValidar, parametros, querySuccessComprobar, errorCB);

    //}
}

/*function querySuccess(tx, results) {
// this will be empty since no rows were inserted.
console.log("Insert ID = " + results.insertId);
// this will be 0 since it is a select statement
console.log("Rows Affected = " + results.rowAffected);
// the number of rows returned by the select statement
console.log("Rows number = " + results.rows.length);
}*/

function querySuccess(tx, results) {
    //$('.polls').css('background-position','-54px 0');//background-position: -54px 0;
    var ulElemento = $('#' + ref + 'F');
    //console.log(ulElemento);
    if (ulElemento.hasClass("pollsNo")) {
        //console.log("pollsNo");
        ulElemento.removeClass("pollsNo");
        ulElemento.addClass("pollsSi");
    } else {
        //console.log("pollsSi");
        ulElemento.removeClass("pollsSi");
        ulElemento.addClass("pollsNo");
    }
    /*var len = results.rows.length;
    console.log("DEMO table: " + len + " rows found.");
    for (var i=0; i<len; i++){
        alert("Row = " + i + " ID = " + results.rows.item(i).id + " Data =  " + results.rows.item(i).data);*/


}

function querySuccessComprobar(tx, results) {
    //$('.polls').css('background-position','-54px 0');//background-position: -54px 0;
    consultaValidar = "";
    var len = results.rows.length;
    console.log(len);
    if (len == 0) {
        guardarFavorito();
    } else {
        eliminarFavorito();
    }
    /* console.log("DEMO table: " + len + " rows found.");
     for (var i=0; i<len; i++){
         alert("Row = " + i + " ID = " + results.rows.item(i).id + " Data =  " + results.rows.item(i).data);*/


}

function queryExistencia(tx, results) {
    //$('.polls').css('background-position','-54px 0');//background-position: -54px 0;
    //consultaValidar="";
    var len = results.rows.length;
    console.log(len);
    //console.log()
    /*if (len==0){
        return false;
    }
    else{
        return true;
    }*/
    // console.log("DEMO table: " + len + " rows found.");
    for (var i = 0; i < len; i++) {
        console.log("Row = " + i + " idRef = " + results.rows.item(i).idRef);
    }

}

//var db2 = window.openDatabase("Database", "1.0", "PhoneGap Demo", 200000);
