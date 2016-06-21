var fnlist = fnlist || {};
var gen = null;


//simpleFetch and simpleSetTimeoutPromise function are in a 'promise.js'.

function *myGeneratorWithPromise() {
  try {
    var data = yield simpleFetch("../data/first.json");
    var url2 = "../data/img/" + data.user.name + ".json";

    var data2 = yield simpleFetch(url2);

    var aImage = data2.images;

    //parallel task using Promise.all function.
    var data3 = yield Promise.all([
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

//code : https://davidwalsh.name/async-generators.
function runGenerator(g) {
  var it = g(), ret;

  (function iterate(val){
    ret = it.next( val );

    if (!ret.done) {
      if ("then" in ret.value) {
        ret.value.then( iterate );
      }
      else {
        setTimeout( function(){
          iterate( ret.value );
        }, 0 );
      }
    }
  })();
}

fnlist.generatorAndPromise = function() {
  runGenerator(myGeneratorWithPromise);
}

