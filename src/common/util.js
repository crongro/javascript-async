
function logMsg(ele, msg) {
  var htmlstr = `<div> image name is ${msg} </div>`; 
  ele.innerHTML += htmlstr;
}

function setBGStyle(userClassName, ele) {
  var prev = document.querySelector("."+userClassName)
  if(prev) prev.className = "";

  ele.className += userClassName;
}

function $(selector) {
  return document.querySelector(selector);
}

