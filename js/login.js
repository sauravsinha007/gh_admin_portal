
window.onload = function () {       
    //checkForAutomaticLogin();
        };

//$('#adminSignBtnId').bind('tap',function(e)
$('#adminSignBtnId').on('click', function(e) {
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    loginBtnAction();

 });

 $('#loginRememberMeBtn').click(function(){
            if($(this).prop("checked") == true){
              saveContentInLocalStorage("rememberMe_quizAdmin","YES");
            }
            else if($(this).prop("checked") == false){
              saveContentInLocalStorage("rememberMe_quizAdmin","NO");
              var lSavedEmailId  =   getStorageContentFromKey("savedEmailId_quizAdmin");
              var lSavedPassword =  getStorageContentFromKey("savedPassword_quizAdmin");
              if(lSavedEmailId.length > 0 && lSavedEmailId.length > 0)
              {
                  removeStorageContentWithKey("savedEmailId_quizAdmin");
                  removeStorageContentWithKey("savedPassword_quizAdmin");
                  removeStorageContentWithKey("savedUserId_quizAdmin");
                  removeStorageContentWithKey("savedUserName_quizAdmin");
              }
            }
        });


function loginBtnAction()
{
                    hidekeyboardFormLoginPage();
                    resetStyleOfControlsOfLoginView();
                    if(validateAdminLoginFileds() == false)
                    {
                        return false;
                    }
                      // moveOnAdminDashboardPage()
                      // return true;

                    var lEmail        = $("#inputEmail").val();
                    var lPswd         = $("#inputPassword").val();
                    autheticateUserFormServerWithInfo(lEmail,lPswd);
                   
}

function hidekeyboardFormLoginPage()
{
    $('.form-control').blur();
}

function resetStyleOfControlsOfLoginView()
{
    $("#inputEmail,#inputPassword").css({'border':'0px solid #ddd'});
}


function validateAdminLoginFileds()
{
    var lEmail        = $("#inputEmail").val();
    var lPswd         = $("#inputPassword").val();

    lEmail            = lEmail.trim();
    lPswd             = lPswd.trim();
    
    if(lEmail.length == 0
       || lPswd.length == 0)
    {
        if(lEmail.length == 0)
            $("#inputEmail").css({'border':'2px solid red'});
        if(lPswd.length == 0)
            $("#inputPassword").css({'border':'2px solid red'});
        
        return false;
    }
    return true;
}

function saveUserInformationInLocal(userInfo)
{
    var lEmail        = userInfo.adminEmailId;
    var lPswd         = userInfo.adminPassword;
    var lUserId       = userInfo.adminUserId;
    var lUserName     = userInfo.adminUserName;
    
    lPswd             = lPswd.trim();
    lEmail            = lEmail.trim();
    
    saveContentInLocalStorage("savedEmailId_quizAdmin",lEmail);
    saveContentInLocalStorage("savedPassword_quizAdmin",lPswd);
    saveContentInLocalStorage("savedUserId_quizAdmin",lUserId);
    saveContentInLocalStorage("savedUserName_quizAdmin",lUserName);
    
    UserDataModel.initialize(lEmail,lPswd,lUserId,lUserName);
}

function checkForAutomaticLogin(){
  var lSavedRememberMe  =   getStorageContentFromKey("rememberMe_quizAdmin");
  if(lSavedRememberMe && lSavedRememberMe.length > 0 && lSavedRememberMe == "YES")
  {
      $('#loginRememberMeBtn').prop('checked', true);

    var lSavedEmailId  =   getStorageContentFromKey("savedEmailId_quizAdmin");
    var lSavedPassword =  getStorageContentFromKey("savedPassword_quizAdmin");
    if(lSavedEmailId.length > 0 && lSavedEmailId.length > 0)
    {
        $("#inputEmail").val(lSavedEmailId);
        $("#inputPassword").val(lSavedPassword);
    }
  }
  else
  {
      $('#loginRememberMeBtn').prop('checked', false);
      $("#inputEmail").val("");
      $("#inputPassword").val("");
  }
   
    
}

function moveOnAdminDashboardPage()
{
  location.href='home.html';
}


function autheticateUserFormServerWithInfo(emailId,pswd)
{

    /*
    Request Url:
https://green-house-sa.herokuapp.com/login

Post Parameter:

{
    "email" : "admin@gmail.com",
    "password" : "123456"
}
    */

    startLoadingIndicatorWithLabel("Loading...");
    var lUrl = TxConstants.BaseUrl + "/login";
    console.log("Request Url: " + lUrl);


    $.ajax({
           type: "POST",
           url: lUrl,
           data: JSON.stringify({ "email": emailId, "password" : pswd}),
           dataType: "json",
           contentType: 'application/json',
           processData: false,
           crossDomain: true,
           headers: {
                "accept": "application/json",
                "Access-Control-Allow-Origin": "*"
             },
           success:function(responseStr){
            stopLoadingIngicator();
            console.log("Response === " +JSON.stringify(responseStr));
            didReceiveResponseOfAdminLoginWebService(responseStr);
           },
           error:  function(errorStr){
           stopLoadingIngicator();
           console.log("error in response" +JSON.stringify(errorStr));
           alert("errorStr" +JSON.stringify(errorStr));
           //navigator.notification.alert(TxConstants.ServerErrorMsg, clickOnOKAlertBtn, '', 'OK');
           }
           });
}

function autheticateUserFormServerWithInfo_old(emailId,pswd)
{
    /*
    Request Url:
https://green-house-sa.herokuapp.com/login

Post Parameter:

{
    "email" : "admin@gmail.com",
    "password" : "123456"
}
    */
      var lUrl = TxConstants.BaseUrl + "/login";

    startLoadingIndicatorWithLabel("Loading...");

    $.ajax({
    url: lUrl,
    type: 'POST',
    data: jQuery.param({ "email": emailId, "password" : pswd}) ,
    contentType: 'application/json',
    success: function (response) {
      stopLoadingIngicator();
        alert(response.status);
    },
    error: function () {
      stopLoadingIngicator();
        alert("error");
    }
}); 

}



function didReceiveResponseOfAdminLoginWebService(responseInfo)
{
    //alert("responseInfo = "+JSON.stringify(responseInfo));
    var lUserInfo = responseInfo.User;
    var lSucess = responseInfo.Success;
    if(lSucess == true)
    {
      moveOnAdminDashboardPage();
    }
    else
    {
        var lError= responseInfo.Message;
        alert(lError);
    }
}


