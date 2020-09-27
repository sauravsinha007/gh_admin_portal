$('#invoice_id').click(function(){
            location.href='invoice.html';
        });



$('#import_customer_id').click(function(){

		$('input[type=file]').trigger('click');
       
    });

$('#export_customer_id').click(function(){

   processToExportCustomerFromServer()
       
    });


$('input[type=file]').change(function() {
    //$('input[type=text]').val($(this).val());

      var lFileName =  document.getElementById("import_file").files[0].name;  //$(this).val()
      console.log("File Path: " + lFileName);

      processToUploadFileOnServer(lFileName)
});




function processToUploadFileOnServer(fileName)
{

    var formData = new FormData();
    formData.append('customer', $('input[type=file]')[0].files[0]);

	startLoadingIndicatorWithLabel("Loading...");
    var lUrl = TxConstants.BaseUrl + "/uploadCustomer";
    console.log("Request Url: " + lUrl);
    $.ajax({
           type: "POST",
           url: lUrl,
           data: formData,
           contentType: false,
           processData: false,
           success:function(responseStr){
           stopLoadingIngicator();
           console.log("Response" +JSON.stringify(responseStr));
           //{"Success":1,"Message":"Customer Data inserted"}
           if(responseStr.Success == 1) {
           		alert("Customer Data Successfully inserted.");
           }
           else {
				alert("Message : " + responseStr.Message);
           }

           },
           error:  function(errorStr){
           stopLoadingIngicator();
           alert("Error : " +JSON.stringify(errorStr));
           //navigator.notification.alert(TxConstants.ServerErrorMsg, clickOnOKAlertBtn, '', 'OK');
           }
           });
   
}


function processToExportCustomerFromServer()
{
    startLoadingIndicatorWithLabel("Loading...");
    var lUrl = TxConstants.BaseUrl + "/exportCustomer";
    console.log("Request Url: " + lUrl);

    $.ajax({
           type: "GET",
           url: lUrl,
           success:function(responseStr){
           stopLoadingIngicator();
           console.log("Response" +JSON.stringify(responseStr));
           alert(responseStr);
           },
           error:  function(errorStr){
           stopLoadingIngicator();
           alert("errorStr" +JSON.stringify(errorStr));
           //navigator.notification.alert(TxConstants.ServerErrorMsg, clickOnOKAlertBtn, '', 'OK');
           }
           });
}