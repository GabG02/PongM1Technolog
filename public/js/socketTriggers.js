socket = io();
socket.connect();

socket.on("FinDePartie", () => {
    game.finished=true;
});

socket.on("MAJPosition", (obj) => {
    if(obj.socketId !== socket.id){
        if(game.playerOne.socket === obj.socketId){
            game.playerOne.posY = obj.position
        } else if(game.playerTwo.socket === obj.socketId){
            game.playerTwo.posY = obj.position
        } else if(game.playerThree.socket === obj.socketId){
            game.playerThree.posY = obj.position
        } else if(game.playerFour.socket === obj.socketId){
            game.playerFour.posY = obj.position
        }
    }
});

socket.on("InitPositions",(obj)=>{
    game.playerOne.socket = obj.player1;
    game.playerTwo.socket = obj.player2;
    game.playerThree.socket = obj.player3;
    game.playerFour.socket = obj.player4;
    if(socket.id===game.playerOne.socket){
        game.control.currentPlayer = game.playerOne;
        game.playerOne.color="#a20000";
        game.playerTwo.color="#d03b02";
    } else if(socket.id===game.playerTwo.socket){
        game.control.currentPlayer = game.playerTwo;
        game.playerTwo.color="#a20000";
        game.playerOne.color="#d03b02";
    } else if(socket.id===game.playerThree.socket){
        game.control.currentPlayer = game.playerThree;
        game.playerThree.color="#a20000";
        game.playerFour.color="#d03b02";
    } else if(socket.id===game.playerFour.socket){
        game.control.currentPlayer = game.playerFour;
        game.playerFour.color="#a20000";
        game.playerThree.color="#d03b02";
    }
    game.finished=false;
})