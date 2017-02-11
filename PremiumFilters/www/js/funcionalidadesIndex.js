function guardarIdioma(idioma){
  var db = window.openDatabase("PFDB", "1.0", "PremiumFilterDB", 200000);
  db.transaction(crearDB, errorCB, successCB);
}
