var fnlist = fnlist || {};

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

function simpleSetTimeoutPromise(nTime, msg) {
  return new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve(msg);
    },nTime)
  });
}


fnlist.promise = function() {
  simpleFetch("../data/first.json")
    .then(function(data) {
      var name = data.user.name;
      var imgUrl = "../data/img/" + name + ".json";
      return simpleFetch(imgUrl);
    })
    .then(function(data2) {
      return simpleSetTimeoutPromise(500,data2);
    })
    .then(function(data3) {
      let elLog = document.querySelector(".log");
      let aImage = data3.images;
      aImage.forEach((v) => logMsg(elLog,v));
    })
    .catch(function(err){
      console.log("error : " + err);
    })
};

console.log("end");