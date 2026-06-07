function doGet(e) {
  // Handle GET request parameters
  const params = e.parameter;
   
  return HtmlService.createTemplateFromFile('web').evaluate().setTitle("Agenda Google Script");
   
}

function obtenerDatosHTML(nombre){
  return HtmlService.createHtmlOutputFromFile(nombre).getContent();
}