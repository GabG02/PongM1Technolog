const  fs = require("fs");
const GameManager = require("./src/GameManager");
const gameManager = new GameManager();
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

io.on('connection', (socket) => {
    gameManager.addPlayer(socket);
});

let folders = ["js","css","media/img","media/sounds"]
folders.forEach(el =>{
    fs.readdirSync(__dirname + "/public/"+el+"/").forEach(file => {
        console.log("FILE :" + "/"+ el +"/" + file);

        app.get("/"+ el +"/" + file, async (request, response) => {
            try {
                response.status(200).sendFile(__dirname + "/public/"+el+"/"+file);
            } catch (Error) {
                console.log("erreur lors de la lecture : " + Error.message);
                response.status(500).send(JSON.stringify(Error));
            }
        });
    })
});

app.get("/socket.io/socket.io.js", async (request, response) => {
    try {
        response.status(200).sendFile(__dirname + "/node_modules/socket.io/client-dist/socket.io.js");
    } catch (Error) {
        console.log("erreur lors de la lecture : " + Error.message);
        response.status(500).send(JSON.stringify(Error));
    }
});

app.get("/", async (request, response) => {
    try {
        response.status(200).sendFile(__dirname+"/public/index.html");
    } catch (Error) {
        console.log("erreur lors de la lecture : " + Error.message);
        response.status(500).send(JSON.stringify(Error));
    }
});

app.post("/createGame", async (request, response) => {
    try {
        response.status(200).send(JSON.stringify(""));
    } catch (Error) {
        console.log("erreur lors de la lecture : " + Error.message);
        response.status(500).send(JSON.stringify(Error));
    }
});

let port = 3000;
http.listen(port, function () {
    console.log('SERVEUR LANCÉ SUR LE PORT ' + port)
});