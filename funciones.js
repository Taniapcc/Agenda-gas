// Archivo funciones.gs
// Maneja funciones de google sheets
const ID_HOJA = '1R--uMJRjDMD1S3B-ul22L9q0ZxUyE5x5LrpdCNxN_-I';
// SpreadsheetApp.openById('AAA1R--uMJRjDMD1S3B-ul22L9q0ZxUyE5x5LrpdCNxN_-I').getActiveSheet();


function doGet(e) {
  // Handle GET request parameters
  const params = e.parameter;
  return HtmlService.createTemplateFromFile('web').evaluate().setTitle("Agenda Google Script");
}

function doPost(datos) {
  insertarContacto(datos.parameter.nombre, datos.parameter.correo);
  return HtmlService.createTemplateFromFile('web').evaluate().setTitle("Agenda Google Script");
}

// Cargar archivos html (cabecera,footer,main, etc)
function obtenerDatosHTML(nombre) {
  return HtmlService.createHtmlOutputFromFile(nombre).getContent();
}

// obtener datos de la hoja de datos
function obtenerContactos() {
  // return HOJA.getDataRange().getValues();

  try {
    let hoja = SpreadsheetApp.openById(ID_HOJA).getActiveSheet();
    let datos = hoja.getDataRange().getValues();

    return datos;
  } catch (e) {
    throw new Error('Error al obtener contactos: ' + e.message);
  }
}

function insertarContacto(nombre, apellidos, correo, telf) {
  try {

    let hoja = SpreadsheetApp.openById(ID_HOJA).getActiveSheet();
    hoja.appendRow([nombre, apellidos, correo, telf]);

    return true;
  } catch (e) {
    throw new Error('Error al insertar contacto: ' + e.message);
  }
}

function borrarContacto(numFila) {
  let hoja = SpreadsheetApp.openById(ID_HOJA).getActiveSheet();
  hoja.deleteRow(numFila);
}

function modificarContacto(numFila, datos) {
  let hoja = SpreadsheetApp.openById(ID_HOJA).getActiveSheet();
  let celdas = hoja.getRange("A" + numFila + ":D" + numFila);
  celdas.setValues([[datos.nombre, datos.apellidos, datos.correo, datos.telf]])
}

function importarContactos() {
  let url = 'https://randomuser.me/api/?results=5&inc=name,email,phone';
  let respuesta = UrlFetchApp.fetch(url).getContentText();
  let datos = JSON.parse(respuesta);
  //datos.results.forEach(contacto => Logger.log(contacto));
  datos.results.forEach(insertarContactoJson);
}

function insertarContactoJson(contacto) {
  let hoja = SpreadsheetApp.openById(ID_HOJA).getActiveSheet();
  hoja.appendRow([contacto.name.first, contacto.name.last, contacto.email, contacto.phone]);
}