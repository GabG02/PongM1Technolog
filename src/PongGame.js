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

        let init = {
            player1 : this.player1.id,
            player2 : this.player2.id,
            player3 : this.player3.id,
            player4 : this.player4.id
        }
        console.log("Envoi du message d'initialisation");
        this.sendToAll("InitPositions",init)
    }

    setUpTriggers(socket){
        console.log("Création des triggers");

        socket.on("disconnect", ()=>{
            this.sendToAll("FinDePartie");
        });
        socket.on("FinDePartie", () =>{
            this.sendToAll("FinDePartie");
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