const PongGame = require("./PongGame");

class GameManager{
    player1;
    player2;
    player3;
    player4;

    addPlayer(playerSocket){
        console.log(playerSocket.id +" connected");
        if(this.player1 === undefined){
            this.player1 = playerSocket
            playerSocket.on("disconnect", ()=>{
                console.log(playerSocket.id + " disconnected");
                    this.player1=undefined;
            });
        } else if(this.player2 === undefined){
            this.player2 = playerSocket
            playerSocket.on("disconnect", ()=>{
                console.log(playerSocket.id + " disconnected");
                    this.player2=undefined;
            });
        } else if(this.player3 === undefined){
            this.player3 = playerSocket
            playerSocket.on("disconnect", ()=>{
                    console.log(playerSocket.id + " disconnected");
                    this.player3=undefined;
            });
        } else if(this.player4 === undefined){
            this.player4 = playerSocket
            playerSocket.on("disconnect", ()=>{
                console.log(playerSocket.id + " disconnected");
                    this.player4=undefined;
            });
        }

        console.log("Player : \t"+this.player1?.id+"\t"+this.player2?.id+"\t"+this.player3?.id+"\t"+this.player4?.id);

        if(this.player1 !== undefined && this.player2 !== undefined && this.player3 !== undefined && this.player4 !== undefined){
            console.log("Création de la partie en cours")
            new PongGame(this.player1,this.player2, this.player3, this.player4);
            this.player1 = undefined;
            this.player2 = undefined;
            this.player3 = undefined;
            this.player4 = undefined;
        }
    }
}
module.exports=GameManager;