var fnlist = fnlist || {};

function simpleAjax(url, fnSuccess) {
  var req = new XMLHttpRequest();
  req.addEventListener("load", function() {
      let htData = JSON.parse(req.responseText);
      fnSuccess(htData);
  });
  req.open("GET", url);
  req.send();
}

fnlist.callbackhell = function() {
  var elLog = document.querySelector(".log");
  simpleAjax("../data/first.json", function(data) {
    try {
      var name = data.user.name;
      var imgUrl = "../data/img/" + name + ".json";
      simpleAjax(imgUrl, function(data2) {
        try {
          setTimeout(function(){
            try {
              var aImage = data2.images;
              aImage.forEach((v) => logMsg(elLog,v));
            } catch (err) {
              console.log('error 3' , err );
            }
          },500);
        } catch (err) {
          console.log('error 2' , err );
        }
      });
    } catch (err) {
      console.log("error 1: ", err);
    }
  });
};
