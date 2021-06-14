export const CanvasModule = function () {

    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0,0, canvas.offsetWidth, canvas.offsetHeight);

    this.drawText = function (text) {
        ctx.fillStyle = "#000000";
        ctx.font = '48px serif';
        ctx.fillText(text,10, 50);
    }

}

