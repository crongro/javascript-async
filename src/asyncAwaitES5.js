function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var fnlist = fnlist || {};

var pm = new Promise(function (resolve, reject) {
  window.setTimeout(function () {
    resolve("ok!");
  }, 500);
});

fnlist.asyncAwait = _asyncToGenerator(function* () {
  try {
    var data = yield simpleFetch("../data/first.json");
    var url2 = "../data/img/" + data.user.name + ".json";

    var data2 = yield simpleFetch(url2);

    var aImage = data2.images;

    //parallel task using Promise.all function.
    var data3 = yield Promise.all([simpleSetTimeoutPromise(100, aImage), simpleSetTimeoutPromise(500, "dummy"), simpleSetTimeoutPromise(1000, "dummy")]);

    var elLog = document.querySelector(".log");
    data3[0].forEach(function (v) {
      return logMsg(elLog, v);
    });
  } catch (err) {
    console.log("error during myGenerator : ", err);
  }
});

// fnlist.asyncAwait = function() {
//   runAsync();
// }
