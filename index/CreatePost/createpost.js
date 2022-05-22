var socket = io();
const ret = document.getElementById("return")
const submit = document.getElementById("sub")
const auth = document.getElementById("auth");
const title = document.getElementById("title");
const project = sessionStorage.getItem("oso")


ret.onclick = function() {
  location.href = "../Posts/posts.html"
}
async function oso() {
    await tinymce.init({
      selector: 'textarea',
      plugins: 'a11ychecker advcode casechange export formatpainter image editimage linkchecker autolink lists checklist media mediaembed pageembed permanentpen powerpaste table advtable tableofcontents tinycomments tinymcespellchecker',
      toolbar: 'a11ycheck addcomment showcomments casechange checklist code export formatpainter image editimage pageembed permanentpen table tableofcontents',
      toolbar_mode: 'floating',
      tinycomments_mode: 'embedded',
      tinycomments_author: 'Author name',
  height : "960"
    })

 var desc = tinymce.activeEditor.getContent(); 
  
submit.onclick = function() {
desc = tinymce.activeEditor.getContent();
  console.log(project + ", " + title.value + ", " + desc + ", " + "2:22" + ", " + auth.value)
  
socket.emit("createpost", project, title.value, desc, "5-22-22", auth.value);
  location.href = "../Posts/posts.html"
}


  
 }

oso();


