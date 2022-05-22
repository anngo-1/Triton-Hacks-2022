var socket = io();
const createproject = document.getElementById("createproject");
const list = document.getElementById("tempdiv")
const template = document.getElementById("temp");
const search = document.getElementById("search");
createproject.onclick = function() {
  location.href = "/Project/create-project.html"
}



search.onclick = function() {
  socket.emit("search");
}


socket.on("search", (array) =>{

const boxes = Array.from(document.getElementsByClassName('home-template list'));

boxes.forEach(box => {
  box.remove();
});

  
  for (var i = 0; i<array.length;i++) {

    const clone = template.cloneNode(true); // clone html template
  
 
  let postdata = JSON.stringify(array[i]);
    postdata = JSON.parse(postdata); 
    clone.id = postdata["id"]
 
    var title = clone.querySelector(".project_title");
    title.textContent = postdata["project_title"]

    var time = clone.querySelector(".project_time");
    time.textContent = postdata["type"] + " created on 5/21/22";

    var user = clone.querySelector(".project_author");
    user.innerHTML = "By " + postdata["user"]

      
    list.appendChild(clone);
    clone.style.display = "block"


  }
const currentboxes = Array.from(document.getElementsByClassName('home-template list'));

  currentboxes.forEach(cbox => {
    cbox.onclick = function() {
       sessionStorage.setItem("oso", cbox.id); 
      console.log(sessionStorage.getItem("oso"))
 location.href = "/Posts/posts.html"
      
    }
  })
  
  
})