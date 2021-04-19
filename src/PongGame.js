class PongGame{
    player1;
    player2;
    player3;
    player4;

    constructor(player1, player2, player3, player4) {
        this.player1 = player1;
        this.player2 = player2;
        this.player3 = player3;
        this.player4 = player4;
        [this.player1,this.player2,this.player3,this.player4].forEach(playerSocket => this.setUpTriggers(playerSocket));
        let dirX = Math.random()*2 * Math.random()>0.5?1:-1;
        let dirY = Math.random()*2 * Math.random()>0.5?1:-1;
        let init = {
            player1 : this.player1.id,
            player2 : this.player2.id,
            player3 : this.player3.id,
            player4 : this.player4.id,
            ball: {
                posX:350,
                posY:200,
                dirX:dirX,
                dirY:dirY
            }
        }
        console.log("Envoi du message d'initialisation");
        this.sendToAll("InitPositions",init)
    }

    setUpTriggers(socket){
        console.log("Création des triggers");

        socket.on("disconnect", ()=>{

            if(socket.id ===this.player1.id || socket.id===this.player2.id){
                this.sendToAll("FinDePartie",{leftScore:0,rightScore:1});
            } else if (socket.id ===this.player3.id || socket.id===this.player4.id){
                this.sendToAll("FinDePartie",{leftScore:1,rightScore:0});
            } else {
                this.sendToAll("FinDePartie");
            }
        });
        socket.on("FinDePartie", (obj) =>{
            this.sendToAll("FinDePartie",obj);
        });

        socket.on("MAJPosition", (position) =>{
            this.sendToAll("MAJPosition",{
                socketId: socket.id,
                position: position
            });
        });
    }

    sendToAll(message,object){
        if(object=== undefined){
            this.player1.emit(message);
            this.player2.emit(message);
            this.player3.emit(message);
            this.player4.emit(message);
        } else {
            this.player1.emit(message,object);
            this.player2.emit(message,object);
            this.player3.emit(message,object);
            this.player4.emit(message,object);
        }
    }
}
module.exports=PongGame;