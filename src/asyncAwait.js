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

fnlist.asyncAwait = async function () {
  try {
    var data = await simpleFetch("../data/first.json");
    var url2 = "../data/img/" + data.user.name + ".json";

    var data2 = await simpleFetch(url2);

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
    console.log("error during myGenerator : ", err);
  }
}