var socket = io();
const submit = document.getElementById("sub");
var title = document.getElementById("title");
var author = document.getElementById("author");
var imageurl = document.getElementById("imageurl")
var image = document.getElementById("realimage"); 

var check = [title, author, imageurl, image];









imageurl.addEventListener("change", function(){
  if (imageurl != "") {
  image.src = imageurl
  }
})

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
  socket.emit("createproject", title.value, author.value, time, imageurl.value);
    location.href = "../index.html"
  }
  

  
}


