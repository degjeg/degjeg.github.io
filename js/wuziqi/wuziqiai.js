/**
 * Created by Administrator on 2017/3/14.
 */
const PLAYER_ME = 1;
const PLAYER_AI = 2;

const boardXCnt = 15;
const boardYCnt = 15;
// 玩家状态
var currentPlayerIndex = 0;
var players = [PLAYER_ME, PLAYER_AI];
var piecesTab = [];


//
var wins = [];


function gameOver(x, y) {
    var xCnt = 0;
    var yCnt = 0;
    var p = piecesTab[x][y];

    // x 方向
    for (var i = x; i >= 0; i--) {
        if(piecesTab[x][i] == p) {
            xCnt++;
        }
    }
    for (var i = x; i < boardXCnt; i++) {

    }

    // y 方向
    for (var i = y; i >= 0; i--) {

    }
    for (var i = y; i < boardYCnt; i++) {

    }
}
