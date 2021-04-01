var game = {
    groundWidth : 700,
    groundHeight : 400,
    netWidth : 6,
    groundColor : "#000000",
    netColor : "#FFFFFF",
    finished:false,
    groundLayer : null,
    scoreLayer : null,
    playersBallLayer : null,

    scorePosPlayer1 : 300,
    scorePosPlayer2 : 365,

    wallSound : null,
    playerSound : null,

    ball : {
        width : 10,
        height : 10,
        color : "#FFFFFF",
        posX : 200,
        posY : 200,
        speed : 1,
        directionX: 1,
        directionY: 1,
        move : function() {
            this.posX += this.directionX * this.speed;
            this.posY += this.directionY * this.speed;
        },
        bounce : function(soundToPlay) {
            if ( this.posX > game.groundWidth || this.posX < 0 ) {
                this.directionX = -this.directionX;
                soundToPlay.play();
            }
            if ( this.posY > game.groundHeight || this.posY < 0  ) {
                this.directionY = -this.directionY;
                soundToPlay.play();
            }
        },
        collide : function(anotherItem) {
            return !(this.posX >= anotherItem.posX + anotherItem.width || this.posX <= anotherItem.posX - this.width
                || this.posY >= anotherItem.posY + anotherItem.height || this.posY <= anotherItem.posY - this.height);
        },
    },
    playerOne : {
        width : 10,
        height : 50,
        color : "#FFFFFF",
        posX : 30,
        posY : 200,
        score : 0,
        goUp : false,
        goDown : false,
        originalPosition : "left"
    },

    playerTwo : {
        width : 10,
        height : 50,
        color : "#FFFFFF",
        posX : 650,
        posY : 200,
        score : 0,
        goUp : false,
        goDown : false,
        originalPosition : "right"
    },
    init : function() {
        console.log("Création du terrain")
        this.groundLayer= game.display.createLayer("terrain", this.groundWidth, this.groundHeight, undefined, 0, "#000000", 0, 0);
        console.log("Création de la ligne de score")
        game.display.drawRectangleInLayer(this.groundLayer, this.netWidth, this.groundHeight, this.netColor, this.groundWidth/2 - this.netWidth/2, 0);
        console.log("Création des carrés de score")
        this.scoreLayer = game.display.createLayer("score", this.groundWidth, this.groundHeight, undefined, 1, undefined, 0, 0);
        game.display.drawTextInLayer(this.scoreLayer , "SCORE", "10px Arial", "#FF0000", 10, 10);

        console.log("Création joueur et balle")
        this.playersBallLayer = game.display.createLayer("joueursetballe", this.groundWidth, this.groundHeight, undefined, 2, undefined, 0, 0);
        game.display.drawTextInLayer(this.playersBallLayer, "JOUEURSETBALLE", "10px Arial", "#FF0000", 100, 100);
        game.initMouse(game.control.onMouseMove);
        console.log("Affichage du score")
        this.displayScore();
        console.log("Affichage de la balle")
        this.displayBall();
        console.log("Création des joueurs")
        this.displayPlayers();

        this.initKeyboard(game.control.onKeyDown, game.control.onKeyUp);
        this.initMouse(game.control.onMouseMove);
        this.playerSound= new Audio("./media/sounds/playerbounce.mp3");
        this.wallSound = new Audio("./media/sounds/wallbounce.mp3");
        game.ai.setPlayerAndBall(this.playerTwo, this.ball);
    },
    moveBall : function() {
        this.ball.move();
        this.ball.bounce(this.wallSound);
        this.displayBall();
    },
    displayScore : function() {
        game.display.drawTextInLayer(this.scoreLayer, this.playerOne.score, "60px Arial", "#FFFFFF", this.scorePosPlayer1, 55);
        game.display.drawTextInLayer(this.scoreLayer, this.playerTwo.score, "60px Arial", "#FFFFFF", this.scorePosPlayer2, 55);
    },

    displayBall : function() {
        game.display.drawRectangleInLayer(this.playersBallLayer, this.ball.width, this.ball.height, this.ball.color, this.ball.posX, this.ball.posY);
    },

    displayPlayers : function() {
        game.display.drawRectangleInLayer(this.playersBallLayer, this.playerOne.width, this.playerOne.height, this.playerOne.color, this.playerOne.posX, this.playerOne.posY);
        game.display.drawRectangleInLayer(this.playersBallLayer, this.playerTwo.width, this.playerTwo.height, this.playerTwo.color, this.playerTwo.posX, this.playerTwo.posY);
    },

    clearLayer : function(targetLayer) {
        targetLayer.clear();
    },

    initKeyboard : function(onKeyDownFunction, onKeyUpFunction) {
        window.onkeydown = onKeyDownFunction;
        window.onkeyup = onKeyUpFunction;
    },

    movePlayers : function() {
        if ( game.control.controlSystem === "KEYBOARD" ) {
            // keyboard control
            if ( game.playerOne.goUp ) {
                game.playerOne.posY-=5;
            } else if ( game.playerOne.goDown ) {
                game.playerOne.posY+=5;
            }
        } else if ( game.control.controlSystem === "MOUSE" ) {
            // mouse control
            if (game.playerOne.goUp && game.playerOne.posY > game.control.mousePointer)
                game.playerOne.posY-=5;
            else if (game.playerOne.goDown && game.playerOne.posY < game.control.mousePointer)
                game.playerOne.posY+=5;
        }
    },
    collideBallWithPlayersAndAction : function() {
        if(this.ball.posX<=0) {
            this.ball.speed = 0;
            this.playerTwo.score+=1;
            this.end();
        } else if(this.ball.posY>=game.groundWidth){
            this.ball.speed = 0;
            this.playerOne.score+=1;
            this.end();
        }
        if ( this.ball.collide(game.playerOne) ) {
            this.ball.speed+=0.1;
            game.ball.directionX = -game.ball.directionX;
            this.playerSound.play();
        }
        if ( this.ball.collide(game.playerTwo) ) {
            this.ball.speed+=0.1;
            game.ball.directionX = -game.ball.directionX;
            this.playerSound.play();
        }
    },
    initMouse : function(onMouseMoveFunction) {
        window.onmousemove = onMouseMoveFunction;
    },
    end: function(){
        console.log("Fin de la partie");
        this.end=true;
        this.ball.speed=0
        this.displayScore();
    }
};