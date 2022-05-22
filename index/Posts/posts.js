var socket = io();
const ret = document.getElementById("return")
const post = document.getElementById("posts-register")
const title = document.getElementById("ptitle");
const auth = document.getElementById("auth")
const list = document.getElementById("divlist");
const template = document.getElementById("temp");
var id = sessionStorage.getItem("oso")


post.onclick = function() {
  location.href = "../CreatePost/create-post.html"
}

ret.onclick = function() {
  location.href = "../index.html"
}


  var x = sessionStorage.getItem("oso")

 socket.emit("getproject", (x));



  socket.on("getproject", (projdata) => {
    
    var data = JSON.stringify(projdata)
    data = JSON.parse(data)

  title.textContent = data["project_title"]

  auth.textContent = "By " + data["user"]
    //remove


    for (var i = 0; i<data["posts"].length;i++) {
     var clone = template.cloneNode(true);

      var posttitle = clone.querySelector(".post_title");
      clone.id = data["posts"][i]["desc"]
      console.log(data["posts"][i]["title"])
      posttitle.textContent = data["posts"][i]["title"];
      
      var postauth = clone.querySelector(".post_author");

      postauth.textContent = data["posts"][i]["author"];

      var posttime = clone.querySelector(".post_time");

      posttime.textContent = data["posts"][i]["time"];


    list.appendChild(clone);

      clone.style.display = "block";
      
    }
const currentboxes = Array.from(document.getElementsByClassName('posts-template list'));

  currentboxes.forEach(cbox => {
    cbox.onclick = function() {
      
   sessionStorage.setItem("current", cbox.id)    
 location.href = "templatepost.html"
      
    }
  })
  })

