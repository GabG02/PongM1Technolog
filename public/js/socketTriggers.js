socket = io();
socket.connect();

socket.on("FinDePartie", (obj) => {
    if(obj!==undefined){
        if(game.ball.posX !== undefined){
            game.ball.posX = obj.ballPosX;
        }
        if(game.ball.posX !== undefined) {
            game.ball.posY = obj.ballPosY;
        }
        game.leftScore = obj.leftScore;
        game.rightScore = obj.rightScore;
    }
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
    game.ball.directionX = obj.ball.dirX;
    game.ball.directionY = obj.ball.dirY;
    game.ball.posX= obj.ball.posX
    game.ball.posY= obj.ball.posY
    if(socket.id===game.playerOne.socket){
        game.control.currentPlayer = game.playerOne;
        game.playerOne.color="#a20000";
    } else if(socket.id===game.playerTwo.socket){
        game.control.currentPlayer = game.playerTwo;
        game.playerTwo.color="#a20000";
    } else if(socket.id===game.playerThree.socket){
        game.control.currentPlayer = game.playerThree;
        game.playerThree.color="#a20000";
    } else if(socket.id===game.playerFour.socket){
        game.control.currentPlayer = game.playerFour;
        game.playerFour.color="#a20000";
    }
    game.finished=false;
})