var body = document.getElementById("add");
var html = sessionStorage.getItem("current");
const ret = document.getElementById("return");

ret.onclick = function() {
  location.href = "posts.html"
}
 body.innerHTML +=html;