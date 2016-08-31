var fnlist = fnlist || {};

//This code is same as 'simpleFetch' function of promise.js
function simpleFetch(url) {
  return new Promise(function(resolve, reject){
    var req = new XMLHttpRequest();
    req.addEventListener("load", function() {
      let htData = JSON.parse(req.responseText);
      if(typeof htData !== "object") reject("wrong data");
      else resolve(htData);
    });
    req.open("GET", url);
    req.send();
  });
}

fnlist.observable = function() {
  var chainPromise = 
    Rx.Observable.just('../data/first.json')
                 .flatMap(simpleFetch)
                 .map( (x) => { return ("../data/img/" + x.user.name + ".json")})
                 .flatMap(simpleFetch)
                 .delay(500)
                 .subscribe((x) => { 
                    let elLog = document.querySelector(".log");
                    let aImage = x.images;
                    aImage.forEach((v) => logMsg(elLog,v));
                });
}






