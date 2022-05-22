var socket = io();
const ret = document.getElementById("return");
const submit = document.getElementById("sub");
var title = document.getElementById("title");
var author = document.getElementById("author");
var type = document.getElementById("tags")

var check = [title, author, type];









submit.onclick = function() {
  var filled = true;
  var date = new Date(); // current date
  time = date.getHours() + ":" + date.getMinutes();
  time = JSON.stringify(time);


  
  for (var i = 0; i<check.length;i++) { // check if all fields are filled
    if (check[i].value == "") {
      filled = false;
      alert("field missing")
      break;
    } 
  }


  
  if (filled) {
    console.log("pressed")
  socket.emit("createproject", title.value, author.value, time, type.value);
    location.href = "../index.html"
  }
  

  
}




ret.onclick = function() {
  location.href = "../index.html"
}

