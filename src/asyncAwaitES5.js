function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var fnlist = fnlist || {};

//This code is same as 'simpleFetch' function of promise.js
function simpleFetch2(url) {
  return new Promise(function (resolve, reject) {
    var req = new XMLHttpRequest();
    req.addEventListener("load", function () {
      let htData = JSON.parse(req.responseText);
      if (typeof htData !== "object") reject("wrong data");else resolve(htData);
    });
    req.open("GET", url);
    req.send();
  });
}

function simpleSetTimeoutPromise(nTime, msg) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve(msg);
      //reject("timeout error..");
    }, nTime);
  });
}

fnlist.asyncAwait = _asyncToGenerator(function* () {
  try {
    var data = yield simpleFetch2("../data/first.json");
    var url2 = "../data/img/" + data.user.name + ".json";

    var data2 = yield simpleFetch2(url2);

    var aImage = data2.images;

    //parallel task using Promise.all function.
    var data3 = yield Promise.all([simpleSetTimeoutPromise(100, aImage), simpleSetTimeoutPromise(500, "dummy"), simpleSetTimeoutPromise(1000, "dummy")]);

    var elLog = document.querySelector(".log");
    data3[0].forEach(function (v) {
      return logMsg(elLog, v);
    });
  } catch (err) {
    console.log(">.< error during myGenerator : ", err);
  }
});
