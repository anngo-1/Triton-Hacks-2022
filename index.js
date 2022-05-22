const express = require('express'); // express
const app = express();
const server = require('http').createServer(app); // create server
const path = require('path')
const io = require('socket.io')(server); //socket.io
const router = express.Router();


router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'index/index.html'));
});
app.use('/', router);




io.on('connection', (socket) => { 
  getproject(socket.id)
  console.log('user  ' + socket.id + ' connected');// when a user connects console.log

  
  socket.on('createproject', (title, id, type, url) => {
 
    createproject(title, id, type, url);

  })

  socket.on("search", () => {
    console.log("socket wroking")
    getproject(socket.id)
  })

  socket.on("getproject" , (docid) => {
 
    getspecificproject(docid, socket.id);
  })

  socket.on("createpost", (project, title, desc, time, author) => {

    createpost(project, title, desc, time, author);
  })

});


//firebase stuff
var admin = require("firebase-admin");
const { FieldValue } = require('firebase-admin/firestore');
var serviceAccount = require("./key.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://ocean-collaboration.firebaseio.com"
});

const db = admin.firestore();


async function createproject(ptitle, userid, gettime, type) {
  const projects = db.collection('projects').doc();
  
 await projects.set( {

    project_title: ptitle,
    user: userid,
    time: gettime,
    type: type,
    posts: [],
    id: projects.id
  })
  
}

async function getproject(socketid) {
  var arrproj = []
  const proj = db.collection('projects');
  const oso = await proj.get();

  oso.forEach(doc => {

    arrproj.push(doc.data())
    
  });

  io.to(socketid).emit("search", arrproj)
}


async function getspecificproject(projectid, socketid) {
  const project = db.collection('projects').doc(projectid);
  const doc = await project.get();
  io.to(socketid).emit("getproject",doc.data());
}

async function createpost(project, posttitle, postdesc, posttime, author) {

 const specific_project = db.collection('projects').doc(project);

  var postdata = {
    id: project,
    title: posttitle,
    desc: postdesc,
    author: author,
    time: posttime
  }


    await specific_project.update({
    posts: FieldValue.arrayUnion(postdata)
  });

}


app.use(express.static(path.join(__dirname, 'index'))); // use index folder



server.listen(3000); // run server

