var fnlist = fnlist || {};
var gen = null;

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

function simpleAjaxWithGenerator(url) {
  var req = new XMLHttpRequest();
  req.addEventListener("load", function() {
      let htData = JSON.parse(req.responseText);
      gen.next(htData);
  });
  req.open("GET", url);
  req.send();
}

function simpleSetTimeoutPromiseWithGenerator(nTime, aData) {
  setTimeout(function(){
    gen.next(aData);
  },nTime)
}

function getPromiseData(oPromise) {
    oPromise.then(function(data){
      gen.next(data);
    });
}

function *myGenerator() {
  try {
    var data = yield simpleAjaxWithGenerator("../data/first.json");
    var name = data.user.name;

    var oPromise = simpleFetch("../data/img/" + name + ".json");
    var data2 = yield getPromiseData(oPromise);

    var aImage = data2.images;
    var data3 = yield simpleSetTimeoutPromiseWithGenerator(500, aImage);

    var elLog = document.querySelector(".log");
    data3.forEach((v) => logMsg(elLog,v));

  } catch (err) {
    console.log("error during myGenerator : ", err);
  }
}

fnlist.generator = function() {
  gen = myGenerator();
  var result = gen.next();
}
