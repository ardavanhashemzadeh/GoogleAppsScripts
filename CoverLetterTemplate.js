function onOpen(e) {
  // Modified script from: https://www.makeuseof.com/tag/google-docs-scripts-automate/
  // And also inspired by: https://webapps.stackexchange.com/questions/47173/how-to-automatically-open-a-created-text-document-after-it-being-created
  // Display a dialog box for each field you need information for.
  
  var ui = DocumentApp.getUi();
  var positionResponse = ui.prompt('Position');
  var companyResponse = ui.prompt('Company');
  var sourceResponse = ui.prompt('Source');
  var date = new Date();

  //Make a copy of the template file
  var documentId = DriveApp.getFileById('1TyCLVCmnoLde2ovKg9VWLxj6GwZUkdnz8QaQ1trCHf4').makeCopy().getId();
      
  //Rename the copied file
  var documentName='Ardavan Hashemzadeh_' + companyResponse.getResponseText();
  DriveApp.getFileById(documentId).setName(documentName);

  //Get the document body as a variable
  var body = DocumentApp.openById(documentId).getBody();
    
  //Insert the entries into the document
  body.replaceText('##position##', positionResponse.getResponseText());
  body.replaceText('##company##', companyResponse.getResponseText());
  body.replaceText('##source##', sourceResponse.getResponseText()); 
  
  // create app and panel
  var url = DriveApp.getFileById(documentId).getUrl();
  var html = HtmlService.createHtmlOutput('<a href="' + url + '" target="_blank">' + documentName + '</a>');
  DocumentApp.getUi().showModalDialog(html, 'Click to Open');  
}
