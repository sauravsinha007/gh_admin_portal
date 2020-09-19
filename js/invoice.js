
var mInvoiceList = [];
var mPageNo = 0;
var mLimit = 20;

window.onload = function () {    
		fetchInvoiceListFromServer();   
        };


$('#previous_btn').on('click', function(e) {
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    var lClassName = $('#previous_btn').attr('class');
                    if(lClassName.indexOf("disabled") >= 0) {
                    	return false;
                    }
                    mPageNo = mPageNo - mLimit;
                    fetchInvoiceListFromServer()

 });

$('#next_btn').on('click', function(e) {
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    var lClassName = $('#next_btn').attr('class');
                    if(lClassName.indexOf("disabled") >= 0) {
                    	return false;
                    }
                    mPageNo = mPageNo + mLimit;
                    fetchInvoiceListFromServer()

 });

function invoiceBtnAction()
{
    location.href='home.html';
}


function fetchInvoiceListFromServer()
{
	/*
	{
    "pageno":0,
    "limit" : 50,
    "filter":
    {
        "invoiceNumber" : "1068"
    }
}
	*/
    startLoadingIndicatorWithLabel("Loading...");
    var lUrl = TxConstants.BaseUrl + "/getInvoices";
    console.log("Request Url: " + lUrl);
    $.ajax({
           type: "POST",
           url: lUrl,
           data: JSON.stringify({ "pageno": mPageNo, "limit" : mLimit}),
           dataType: "json",
           contentType: 'application/json',
           success:function(responseStr){
           stopLoadingIngicator();
           console.log("Response" +JSON.stringify(responseStr));
           didReceivedResponseOfInvoiceInfoList(responseStr);
           },
           error:  function(errorStr){
           stopLoadingIngicator();
           alert("errorStr" +JSON.stringify(errorStr));
           //navigator.notification.alert(TxConstants.ServerErrorMsg, clickOnOKAlertBtn, '', 'OK');
           }
           });
}


function didReceivedResponseOfInvoiceInfoList(responseInfo)
{
  $("#invoice_main_div").html("");
  if(responseInfo.Success == 1) {
  		mInvoiceList = [];
		mInvoiceList = responseInfo.result;

    	var lInvoiceHtml = "";
    
    	var lInvoiceHtml = "<table id='redeemPannelTable' class = 'table table-striped' style='border:none;'>";
    	lInvoiceHtml = lInvoiceHtml + "<thead><tr><th>Invoice No</th><th>Customer Name</th><th>Type</th><th>Invoice Date</th><th>Total Amount</th><th>Status</th></tr></thead>";
    	lInvoiceHtml = lInvoiceHtml + "<tbody>"
    	for(var i = 0; i < mInvoiceList.length ; i++)
    	{
      	  lInvoiceHtml = lInvoiceHtml +  createCellForInvoiceTableWithInfo(mInvoiceList[i],i);
   		 }
    	lInvoiceHtml = lInvoiceHtml + "</tbody></table>";
    	$("#invoice_main_div").html(lInvoiceHtml);
    	enableDisablepaginationView()
  }
  else 
  {

  }
   
}


function enableDisablepaginationView()
{
	$("#invoice_pagination").show();
	//page-item disabled
	var lPreviousClass = "page-item";
	var lNextClass = "page-item";

	if(mPageNo == 0) {
		lPreviousClass = "page-item disabled";
	}

	if(mInvoiceList.length < mLimit) {
		lNextClass = "page-item disabled";
	}

	$("#previous_btn").attr('class', lPreviousClass);
	$("#next_btn").attr('class', lNextClass);

	// $("#previous_btn").addClass(lPreviousClass);
	// $("#next_btn").addClass(lNextClass);
}


function createCellForInvoiceTableWithInfo(invoiceInfo,indexNo)
{
	var lCustomerInfo        = invoiceInfo.customer
    var lInvoiceNo     		 = invoiceInfo.invoiceNumber;
    var lCustomerName   	 = lCustomerInfo.full_name;
    var lType   			 = lCustomerInfo.category;
    var lCreateDate  	     = invoiceInfo.createdTime; 
    var lTotalAmt            =  "$" + invoiceInfo.finalPrice.toFixed(2);
    var lStatus              = invoiceInfo.status;

    var lFontColor           = "black";
    var lInvoiceStatus       = "";
    var lDate = new Date(lCreateDate * 1000);

    var lInvoiceDate  	     = getDateFormat(lDate);
    

	if(lStatus == 8000)
        lInvoiceStatus = "Due";
    else if(lStatus == 8001)
        lInvoiceStatus = "Paid";
    else if(lStatus == 8002)
        lInvoiceStatus = "Invalid";

    var lHtmlString = "";
    lHtmlString = lHtmlString + "<tr id='invoiceTr_"+indexNo+"'style='cursor:pointer;color:"+lFontColor+";'><td>" + lInvoiceNo + "</td><td>" + lCustomerName + "</td><td>" + lType + "</td><td>" + lInvoiceDate + "</td><td>" + lTotalAmt + "</td><td>" + lInvoiceStatus + "</td></tr>";

    return lHtmlString;
    
}


function getDateFormat(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
       day = '0' + day;

     var date = new Date();
     date.toLocaleDateString();

     return [day, month, year].join('/');
}

function  setValuesInControlsOfRedeemPannelEditorModal (self) {
  
    var lSplitArray      =  $(self).attr("id").split('_');
    var lItemIndex = lSplitArray[1];
    //alert(JSON.stringify(mQuizArray[lItemIndex]));
    var lSelectedRedeem = mRedeemHistoryList[lItemIndex];
    mSelectedRedeemRow = mRedeemHistoryList[lItemIndex];
    resetStyleOfRedeemEditorPannelControls();
    

    var lRedeemReqId     = lSelectedRedeem.RedeemReqId;
    var lRedeemReqPts    = lSelectedRedeem.RedeemReqPts;
    var lRedeemReqTime   = lSelectedRedeem.RedeemReqTime;
    var lRedeemStatus    = lSelectedRedeem.RedeemStatus;
    var lWalletType      = lSelectedRedeem.WalletType;
    var lRedeemStatusCode= lSelectedRedeem.RedeemStatusCode;
    var lUserName        = lSelectedRedeem.UserName;
     var lEmailId        = lSelectedRedeem.UserEmailId;
     var lMobileNo        = lSelectedRedeem.MobileNo;
     var lTotalPts        = lSelectedRedeem.TotalUserPts;
    var lSplitArray      =  lRedeemReqTime.split(' ');
    var lRedeemDate      = lSplitArray[1] + "&nbsp;" + lSplitArray[2] + "&nbsp;" + lSplitArray[3];
    var lRedeemTime      = lSplitArray[4];
    var lRedeemStatusStyle = "";
    
    var lHtmlString = "<table  class = 'table'>";
    lHtmlString = lHtmlString + "<tr><th>ReqId</th><th>Redeem Pts</th><th>Req Date</th><th>Wallet Type</td><th>Total Pts</th></tr>";
    lHtmlString = lHtmlString + "<tr id='redeemEditorPannelTr_"+lItemIndex+"'style='cursor:pointer;'><td>" + lRedeemReqId + "</td><td>" + lRedeemReqPts + "</td><td>" + lRedeemDate + "</td><td>" + lWalletType + "</td><td>"+ lTotalPts + "</td></tr>";
    lHtmlString = lHtmlString + "<tr><th>User Name</td><th>Email Id</td><th>Mobile No</th><th>Redeem Status</td><th>&nbsp;</th></tr>";
    lHtmlString = lHtmlString + "<tr 'style='cursor:pointer;'><td>" + lUserName + "</td><td>" + lEmailId + "</td><td>" + lMobileNo + "</td><td>" + lRedeemStatus + "</td><td>&nbsp;</td></tr>";
    lHtmlString = lHtmlString + "</tbody></table>";

    $("#userInfoDiv").html(lHtmlString);
    //getStorageContentFromKey("savedUserName_quizAdmin")
    var lAdminUserName               = "";//UserDataModel.UserId;
    var lAdminRedeemTransactionId    = "";
    var lAdminRedeemDate             = "";
    var lAdminRedeemStatus           = 0;
    var lAdminRedeemStatusCode       = "";
    var lRejectedReason               = "";
    $("#declineDiv").hide();
    $("#rejectedReasonTxtArea").val("");
    $("#redeemByLabel").html("Redeem By:");
    if(lRedeemStatusCode == 2 || lRedeemStatusCode == 3)
    {
        lAdminUserName            = lSelectedRedeem.admin_RedeemBy;
        lAdminRedeemTransactionId = lSelectedRedeem.admin_RedeemTransactionId;
        lAdminRedeemDate          = lSelectedRedeem.admin_RedeemDate;
        lAdminRedeemStatus        = lSelectedRedeem.admin_RedeemStatus;
        lRejectedReason           = lSelectedRedeem.RejectedReason;
        lAdminRedeemStatusCode    = lRedeemStatusCode;
        var lSplitArray           =  lAdminRedeemDate.split(' ');
        var lDate      = lSplitArray[1] + "&nbsp;" + lSplitArray[2] + "&nbsp;" + lSplitArray[3];
        var lTime      = lSplitArray[4];
        $("#redeemByLabel").html("Redeem By: ("+lDate + "&nbsp;" + lTime +")");
        if(lRedeemStatusCode == 3)
        {
          $("#declineDiv").show();
          $("#rejectedReasonTxtArea").val(lRejectedReason);
        }
    }
    $("#redeemByUserTxtFld").val(lAdminUserName);
    $("#transactionIdTxtFld").val(lAdminRedeemTransactionId);
    $("#redeemStatusDrpDown").val(lAdminRedeemStatusCode);
}
