var fnlist = fnlist || {};

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






