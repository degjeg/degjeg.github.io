var clock = document.getElementById('clock');
clockContext = clock.getContext('2d');


const clockWidth = clock.width;
const clockHeight = clock.height;
const FRAME_WIDTH = 4;

function drawBackground() {
    // 1.画外边框(外圆)
    var radiusFrame = clockHeight / 2 - FRAME_WIDTH;

    clockContext.beginPath();
    clockContext.arc(0, 0, radiusFrame, 0, 360);
    clockContext.lineWidth = FRAME_WIDTH;
    clockContext.strokeStyle = "#000";
    clockContext.stroke();
    clockContext.closePath();

    // 2.画刻度

    var radiusScale = radiusFrame - 10;
    for (var minute = 1; minute <= 60; minute++) {
        // 12点为270度,每加1点加30度
        var angle = (270 + minute * 6); // 角度
        var radian = angle * 2 * Math.PI / 360; // 弧度

        var x = Math.cos(radian) * radiusScale;
        var y = Math.sin(radian) * radiusScale;

        clockContext.beginPath();
        if (minute % 15 == 0) { // 12,3,6,9
            clockContext.arc(x, y, 3, 0, 360);
            clockContext.fillStyle = "#000";
        } else if (minute % 5 == 0) { // 小时
            clockContext.arc(x, y, 2, 0, 360);
            clockContext.fillStyle = "#000";
        } else {
            clockContext.arc(x, y, 1, 0, 360);
            clockContext.fillStyle = "#ccc";
        }

        clockContext.arc(x, y, minute % 15 == 0 ? 3 : (minute % 5 == 0 ? 2 : 1), 0, 360);
        clockContext.lineWidth = FRAME_WIDTH;

        clockContext.closePath();
        clockContext.fill();

        // 写1-12的小时数
        x = Math.cos(radian) * (radiusScale - 12);
        y = Math.sin(radian) * (radiusScale - 12);
        if (minute % 5 == 0) {
            clockContext.textAlign = 'center';
            clockContext.textBaseline = 'middle';
            clockContext.fillText("" + minute / 5, x, y);
        }
    }
}

// 画指针
function drawHandles(h, m, s) {

    // 时
    clockContext.lineCap = 'round';
    var radiusFrame = clockHeight / 2 - FRAME_WIDTH - 40;
    var radius;
    var angle = (270 + (h + m / 60) * 30); // 角度
    var radian = angle * 2 * Math.PI / 360; // 弧度

    // 时针
    radius = radiusFrame / 2;
    clockContext.beginPath();
    clockContext.lineWidth = 3;
    clockContext.moveTo(0, 0);
    clockContext.lineTo(radius * Math.cos(radian), radius * Math.sin(radian));
    clockContext.closePath();
    clockContext.stroke();

    // 分针
    radius = radiusFrame * 3 / 4;
    angle = (270 + (m + s / 60) * 6); // 角度
    radian = angle * 2 * Math.PI / 360; // 弧度
    clockContext.beginPath();
    clockContext.lineWidth = 2;
    clockContext.moveTo(0, 0);
    clockContext.lineTo(radius * Math.cos(radian), radius * Math.sin(radian));
    clockContext.closePath();
    clockContext.stroke();

    // 秒针
    radius = radiusFrame;
    angle = (270 + s * 6); // 角度
    radian = angle * 2 * Math.PI / 360; // 弧度
    clockContext.fillStyle = "#f00";
    clockContext.strokeStyle = "#f00";
    clockContext.beginPath();
    clockContext.lineWidth = 1;
    clockContext.moveTo(0, 0);
    clockContext.lineTo(radius * Math.cos(radian), radius * Math.sin(radian));
    clockContext.closePath();
    clockContext.stroke();

    clockContext.beginPath();

    clockContext.arc(0, 0, 5, 0, 2 * Math.PI);
    clockContext.closePath();
    clockContext.fill();
}

function draw() {
    clockContext.save();
    clockContext.clearRect(0, 0, clockWidth, clockHeight);

    clockContext.translate(clockWidth / 2, clockHeight / 2);
    drawBackground();
    var now = new Date();
    drawHandles(now.getHours(), now.getMinutes(), now.getSeconds());
    clockContext.restore();
}
draw();
setInterval(draw, 1000);