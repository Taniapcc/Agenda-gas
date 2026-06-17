// Archivo funciones.gs
const HOJA = SpreadsheetApp.openById('1R--uMJRjDMD1S3B-ul22L9q0ZxUyE5x5LrpdCNxN_-I').getActiveSheet();
 
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
    return HOJA.getDataRange().getValues();
}

function insertarContacto(nombre, correo) {
   HOJA.appendRow([nombre,correo]);
}