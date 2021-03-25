var game = {
    groundWidth : 700,
    groundHeight : 400,
    groundColor: "#000000",
    netWidth : 6,
    netColor : "#FFFFFF",

    groundLayer : null,

    scorePosPlayer1 : 300,
    scorePosPlayer2 : 365,

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
        bounce : function() {
            if ( this.posX > game.groundWidth || this.posX < 0 )
                this.directionX = -this.directionX;
            if ( this.posY > game.groundHeight || this.posY < 0  )
                this.directionY = -this.directionY;
        }
    },
    playerOne : {
        width : 10,
        height : 50,
        color : "#FFFFFF",
        posX : 30,
        posY : 200,
        goUp : false,
        goDown : false
    },

    playerTwo : {
        width : 10,
        height : 50,
        color : "#FFFFFF",
        posX : 650,
        posY : 200,
        goUp : false,
        goDown : false
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

        console.log("Affichage du score")
        this.displayScore(0,0);
        console.log("Affichage de la balle")
        this.displayBall();
        console.log("Création des joueurs")
        this.displayPlayers();

        this.initKeyboard(game.control.onKeyDown, game.control.onKeyUp);

    },
    moveBall : function() {
        this.ball.move();
        this.ball.bounce();
        this.displayBall();
    },
    displayScore : function(scorePlayer1, scorePlayer2) {
        game.display.drawTextInLayer(this.scoreLayer, scorePlayer1, "60px Arial", "#FFFFFF", this.scorePosPlayer1, 55);
        game.display.drawTextInLayer(this.scoreLayer, scorePlayer2, "60px Arial", "#FFFFFF", this.scorePosPlayer2, 55);
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
        if (game.playerOne.goUp && game.playerOne.posY > 0)
            game.playerOne.posY-=5;
        else if (game.playerOne.goDown && game.playerOne.posY < game.groundHeight - game.playerOne.height)
            game.playerOne.posY+=5;
    },
};