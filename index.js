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




io.on('connection', (socket) => { // when a user connects console.log
  console.log('user  ' + socket.id + ' connected');

  
  socket.on('createproject', (title, id, time, url) => {
 
    createproject(title, id, time, url);

  })

  socket.on("search", () => {
    getproject(socket.id)
  })


});


//firebase stuff
var admin = require("firebase-admin");
const FieldValue = admin.firestore.FieldValue;
var serviceAccount = require("./key.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://ocean-collaboration.firebaseio.com"
});

const db = admin.firestore();


async function createproject(ptitle, userid, gettime, url) {
  const projects = db.collection('projects');
  
 await projects.add( {

    project_title: ptitle,
    user: userid,
    time: gettime,
    image_url: url,
    posts: []
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


async function createpost(project, posttitle, postdesc, posttime, author) {
  const specific_project = db.collection('projects').doc(project);
  var postdata = {
    title: posttitle,
    desc: postdesc,
    author: author,
    time: postttime
  }

  postdata = JSON.stringify(postdata);
  await specific_project.update({
    posts: FieldValue.arrayUnion(postdata)
  })

}


app.use(express.static(path.join(__dirname, 'index'))); // use index folder



server.listen(3000); // run server

