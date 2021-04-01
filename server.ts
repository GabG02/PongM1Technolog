import * as express from "express";
import {Router} from "express";
import * as bodyParser from "body-parser";
import * as fs from "fs";

let app = express();
let router = Router();
app.use(bodyParser.urlencoded({extended: true}));

router.get("/", async (request, response) => {
    try {
        response.status(200).sendFile(__dirname+"/public/index.html");
    } catch (Error) {
        console.log("erreur lors de la lecture : " + Error.message);
        response.status(500).send(JSON.stringify(Error));
    }
});
let folders = ["js","css","media/img","media/sounds"]
folders.forEach(el =>{
    fs.readdirSync(__dirname + "/public/"+el+"/").forEach(file => {
        console.log("FILE :" + file);

        router.get("/"+ el +"/" + file, async (request, response) => {
            try {

                response.status(200).sendFile(__dirname + "/public/"+el+"/"+file);
            } catch (Error) {
                console.log("erreur lors de la lecture : " + Error.message);
                response.status(500).send(JSON.stringify(Error));
            }
        });
    })
});


router.get("/", async (request, response) => {
    try {
        response.status(200).sendFile(__dirname+"/public/index.html");
    } catch (Error) {
        console.log("erreur lors de la lecture : " + Error.message);
        response.status(500).send(JSON.stringify(Error));
    }
});

router.post("/createGame", async (request, response) => {
    try {
        response.status(200).send(JSON.stringify(""));
    } catch (Error) {
        console.log("erreur lors de la lecture : " + Error.message);
        response.status(500).send(JSON.stringify(Error));
    }
});

app.use(router);

app.listen(3000, function () {
    console.log('SERVEUR LANCÉ SUR LE PORT ' + 3000)
});