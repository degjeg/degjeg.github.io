/**
 * Created by Administrator on 2017/3/14.
 */



var board = document.getElementById('board');
var context = board.getContext('2d');

const boardWidth = board.width;
const boardHeight = board.height;

const itemWidth = boardWidth / boardXCnt;
const itemHeight = boardHeight / boardYCnt;


function initPiecesTab() {
    for (var i = 0; i < itemHeight; i++) {
        piecesTab[i] = [];
        for (var j = 0; j < itemWidth; j++) {
            piecesTab[i][j] = 0;
        }
    }
}
function drawBoard() {
    for (var i = 0; i < boardXCnt; i++) { // 竖向的线
        context.moveTo(i * itemWidth + itemWidth / 2, itemHeight / 2);
        context.lineTo(i * itemWidth + itemWidth / 2, boardHeight - itemHeight / 2);
    }

    for (var j = 0; j < boardYCnt; j++) { // 横向的线
        context.moveTo(itemWidth / 2, j * itemHeight + itemHeight / 2);
        context.lineTo(boardWidth - itemWidth / 2, j * itemHeight + itemHeight / 2);
    }

    context.fillText(boardWidth + "," + boardHeight + context, 0, 100);

    context.strokeStyle = "#BFBFBF";
    context.stroke();
}

function drawPieces(x, y, player) {
    var rawX = x * itemWidth + itemWidth / 2;
    var rawY = y * itemHeight + itemHeight / 2;

    context.beginPath();
    context.arc(rawX, rawY, itemWidth * 0.4, 0, 360);
    context.closePath();

    var gradient = context.createRadialGradient(rawX + 2, rawY - 2, 15, rawX + 2, rawY - 2, 14);
    if (PLAYER_ME == player) {
        gradient.addColorStop(0, "#0a0a0a");
        gradient.addColorStop(1, "#636766");
    } else {
        gradient.addColorStop(0, "#d1d1d1");
        gradient.addColorStop(1, "#f9f9f9");
    }

    context.fillStyle = gradient;
    context.fill();
}


function go(x, y, player) {
    piecesTab[y][x] = player;
}
board.onclick = function (e) {
    // if (currentPlayer != PLAYER_ME) {
    //     return;
    // }
    var x = e.offsetX;
    var y = e.offsetY;

    var piecesX = Math.floor((x ) / itemWidth);
    var piecesY = Math.floor((y) / itemHeight);

    if (piecesTab[piecesY][piecesX] == 0) {

        var currentPlayer = players[( ++currentPlayerIndex + 1) % players.length];
        go(piecesX, piecesY, currentPlayer);
        drawPieces(piecesX, piecesY, currentPlayer);
    } else {
       // alert(piecesTab[piecesY][piecesX]);
    }
};

initPiecesTab();
drawBoard();
// drawPieces(3, 3, PLAYER_AI);
// drawPieces(4, 4, PLAYER_AI);
// drawPieces(6, 4, PLAYER_AI);
//
// drawPieces(3, 1 + 3, PLAYER_ME);
// drawPieces(4, 1 + 4, PLAYER_ME);
// drawPieces(6, 1 + 4, PLAYER_ME);
