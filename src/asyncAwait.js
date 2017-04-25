var fnlist = fnlist || {};

//This code is same as 'simpleFetch' function of promise.js
function simpleFetch2(url) {
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
      //reject("timeout error..");
    },nTime)
  });
}


fnlist.asyncAwait = async function () {
  try {
    var data = await simpleFetch2("../data/first.json");
    var url2 = "../data/img/" + data.user.name + ".json";

    var data2 = await simpleFetch2(url2);

    var aImage = data2.images;

    //parallel task using Promise.all function.
    var data3 = await Promise.all([
          simpleSetTimeoutPromise(100, aImage),
          simpleSetTimeoutPromise(500, "dummy"),
          simpleSetTimeoutPromise(1000, "dummy"),
          ]);

    var elLog = document.querySelector(".log");
    data3[0].forEach((v) => logMsg(elLog,v));

  } catch (err) {
    console.log(">.< error during myGenerator : ", err);
  }
}