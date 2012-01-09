Element.prototype.leftTopScreen = function () {
                var x = this.offsetLeft;
                var y = this.offsetTop;

                var element = this.offsetParent;

                while (element !== null) {
                    x = parseInt (x) + parseInt (element.offsetLeft);
                    y = parseInt (y) + parseInt (element.offsetTop);

                    element = element.offsetParent;
                }

                return new Array (x, y);
            }

extractValuesAndCheckClock = function() {
    var result = "FOUT!";
    var hours = $('#hours').val();
    var minutes = $('#minutes').val();
    if (clock.hours != hours || Math.abs(clock.minutes - minutes)>3) {
        result += " de lok staat op: " + clock.hours + ":" + clock.minutes;
    } else {
        result = "GOED ZO!";
    }
    alert(result);
}

var clock = {hours: 0, minutes: 0};
var drag = false;
var control = "minutes";
var clockOffsetPosition  = document.getElementById("clock").leftTopScreen();

setupClock = function (){
    redrawClock();
}

redrawClock = function() {
    var canvas = document.getElementById('clock');
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, 200, 200);
    ctx.lineWidth = 3
    ctx.lineCap = 'round'
    var correctedHours = +clock.hours + clock.minutes/60;
    //alert (correctedHours+"|"+hours+"|"+minutes);
    drawPointer(ctx, 100, 100, clock.minutes, 90);
    drawPointer(ctx, 100, 100, correctedHours * 5, 50);
}

drawPointer = function(ctx, x, y, minutes, length) {
    angle = Math.PI * minutes / 30
    ctx.beginPath();
    ctx.moveTo(x, y);
    var endX = x + Math.sin(angle) * length;
    var endY = y - Math.cos(angle) * length;
    ctx.lineTo(endX, endY);
    ctx.stroke();
    ctx.closePath();
}

Element.prototype.leftTopScreen = function () {
                var x = this.offsetLeft;
                var y = this.offsetTop;

                var element = this.offsetParent;

                while (element !== null) {
                    x = parseInt (x) + parseInt (element.offsetLeft);
                    y = parseInt (y) + parseInt (element.offsetTop);

                    element = element.offsetParent;
                }

                return new Array (x, y);
            }


$("#clock").mousedown(function(e){
    if (drag) {drag = false} else {
    var angle = - Math.atan2((e.clientX-100-clockOffsetPosition[0]), (e.clientY-100-clockOffsetPosition[1]))+Math.PI;
    var distanceToHours = Math.abs(angle - clock.hours * Math.PI/6 - clock.minutes * Math.PI/360);
    var distanceToMinutes = Math.abs(angle - clock.minutes * Math.PI/30);
    //alert(distanceToHours +" | "+ distanceToMinutes);
    if (distanceToHours < 0.05 || distanceToMinutes < 0.05) {
        drag = true;
        if (distanceToHours <= distanceToMinutes){
            control = "hours";
        } else {
            control = "minutes";
        }
    } }
});

$("#clock").mouseup(function(e){
   drag = false;
});

$("#clock").mousemove(function(e){
    if (drag) {
       var canvas = document.getElementById('clock');
    var ctx = canvas.getContext('2d');
    ctx.cursor
        var angle =  - Math.atan2((e.clientX-100-clockOffsetPosition[0]), (e.clientY-100-clockOffsetPosition[1]))+Math.PI ;
        if (control == "minutes") {
            clock.minutes = (angle * 30) / Math.PI;
        } else {
            clock.hours = Math.round((angle * 6) / Math.PI);
        }
        redrawClock();
    }
});