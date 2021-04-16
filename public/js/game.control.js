game.control = {

    controlSystem : null,
    mousePointer : null,
    currentPlayer : null,

    onKeyDown : function(event) {
        if(!game.finished) {
            game.control.controlSystem = "KEYBOARD";

            if (event.keyCode == game.keycode.KEYDOWN) {
                game.control.currentPlayer.goDown = true;
            } else if (event.keyCode == game.keycode.KEYUP) {
                game.control.currentPlayer.goUp = true;
            }
        }
    },

    onKeyUp: function (event) {
        if(!game.finished) {
            if (event.keyCode == game.keycode.KEYDOWN) {
                game.control.currentPlayer.goDown = false;
            } else if (event.keyCode == game.keycode.KEYUP) {
                game.control.currentPlayer.goUp = false;
            }
        }
    },

    onMouseMove : function(event) {
        if(!game.finished) {
            game.control.controlSystem = "MOUSE";

            if (event) {
                game.control.mousePointer = event.clientY;
            }

            if (game.control.mousePointer > game.control.currentPlayer.posY) {
                game.control.currentPlayer.goDown = true;
                game.control.currentPlayer.goUp = false;
            } else if (game.control.mousePointer < game.control.currentPlayer.posY) {
                game.control.currentPlayer.goDown = false;
                game.control.currentPlayer.goUp = true;
            } else {
                game.control.currentPlayer.goDown = false;
                game.control.currentPlayer.goUp = false;
            }
        }
    }
}