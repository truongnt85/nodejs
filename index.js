var express=require("express");
var app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views","./views");

 var server = require("http").Server(app);
 var io = require("socket.io")(server);
 server.listen(3000);

 io.on("connection", function(socket){
    console.log("co nguoi ket noi den"+ socket.id);
   
    socket.on("disconnect",function(){
        console.log("disconnect from " + socket.id);
    })
    socket.on("Client-send-data",function(data){
        console.log(socket.id +" vua gui du lieu "+ data);
        //io.sockets.emit("Server-send-data",data+"-888");
        //socket.emit("Server-send-data",data+"-888");
        socket.broadcast.emit("Server-send-data",data+"-888");
    });
 });
 

app.get("/", function(req,res){
  res.render("mainpage");
});

