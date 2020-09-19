/*
 http://localhost:8888/
 http://www.appkund.com/QuizApi
 http://54.153.93.130/
 */
var TxConstants = {
    BaseUrl: 'https://green-house-sa.herokuapp.com',
    NetworkErrorMsg:  'No internet available.',
    ServerErrorMsg:   'Could not connect to the server at this time.',
};




var  UserDataModel = {
    EmailId       :   '',
    Password      :   '',
    UserId        :   '',
    UserName      :   '',
initialize: function (pEmailID,pPswd,pUserId,pUserName)
    {
        this.EmailId      =   pEmailID;
        this.Password     =   pPswd;
        this.UserId       =   pUserId;
        this.UserName     =   pUserName;
        
    }
};

function isUserAleradyExist()
{
    var lSavedEmailId        =   getStorageContentFromKey("savedEmailId_quizApp");
    var lSavedPassword       =  getStorageContentFromKey("savedPassword_quizApp");
    var lSavedUserId         =  getStorageContentFromKey("savedUserId_quizApp");
    var lSavedUserName      =  getStorageContentFromKey("savedUserName_quizApp");
    
    if((lSavedEmailId && lSavedPassword ) && (lSavedEmailId.length > 0 && lSavedPassword.length > 0))
    {
        UserDataModel.initialize(lSavedEmailId,lSavedPassword,lSavedUserId,lSavedUserName);
        return true;
    }
    
    return false;
}

function logoutBtnAction()
{
    location.href='login.html';
}

function showServerErrorMessage()
{
    navigator.notification.alert(TxConstants.ServerErrorMsg, null, '', 'OK');
}

function saveContentInLocalStorage(key,value)
{
    localStorage.setItem(key, value); //saves to the database, key/value
    
}

function getStorageContentFromKey(key)
{
    return localStorage.getItem(key);
}

function removeStorageContentWithKey(key)
{
    return localStorage.removeItem(key); //deletes the matching item from the database
}

function IsEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}

function makeResponseInProperString(str)
{
   // \r\n<!-- Hosting24 Analytics Code -->\r\n<script type=\"text/javascript\" src=\"http://stats.hosting24.com/count.php\"></script>\r\n<!-- End Of Analytics Code -->\r\n"
    var lString = "";
     if (str.readyState==4 && str.status==200)
     {
         lString = str.responseText;
         lString = lString.replace("\r\n<!-- Hosting24 Analytics Code -->\r\n<script type=\"text/javascript\" src=\"http://stats.hosting24.com/count.php\"></script>\r\n<!-- End Of Analytics Code -->\r\n", "");
     }
    
    return lString;
}

function startLoadingIndicatorWithLabel(str)
{
    if (detectMobile() == false)
    {
        $('#overlay').show();
        return false;
    }
    else
    {
        if (typeof window.plugins.spinnerDialog != "undefined") {
            // safe to use the function
        }
    }
}

function stopLoadingIngicator()
{
    if (detectMobile() == false)
    {
        $('#overlay').hide();
        return false;
    }
    else
    {
        if (typeof window.plugins.spinnerDialog != "undefined") {
            // safe to use the function
        }
    }
}

function detectMobile()
{
    if( navigator.userAgent.match(/Android/i)
       || navigator.userAgent.match(/webOS/i)
       || navigator.userAgent.match(/iPhone/i)
       || navigator.userAgent.match(/iPad/i)
       || navigator.userAgent.match(/iPod/i)
       || navigator.userAgent.match(/BlackBerry/i)
       || navigator.userAgent.match(/Windows Phone/i)
       ){
        return true;
    }
    else {
        return false;
    }
}

var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

function openUrlInMobileBrowser(urlString)
{
    window.open(urlString, "_system");
}

function removeSavedUserInformation()
{
    removeStorageContentWithKey("savedEmailId_quizAdmin");
    removeStorageContentWithKey("savedPassword_quizAdmin");
    removeStorageContentWithKey("savedUserId_quizAdmin");
    removeStorageContentWithKey("savedUserName_quizAdmin");
}

function  logoutFromQuizOzWebAdminPannel () {
    var lSavedRememberMe  =   getStorageContentFromKey("rememberMe_quizAdmin");
      if(lSavedRememberMe.length > 0 && lSavedRememberMe == "NO")
      {
        removeSavedUserInformation();
      }
     
     window.location.href='../Html_Pages/login.html';
}