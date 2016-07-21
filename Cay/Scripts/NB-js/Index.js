! function () {
    var screen = document.getElementById("screen");
    var ctx = screen.getContext("2d");
    document.addEventListener("mousemove", function (e) {
        e.preventDefault();
        xm = e.clientX;
        ym = e.clientY;
    }, true);
    var texture;
    var scoreId = document.getElementById("score");
    var resize = function () {
        screen.width = window.innerWidth;
        screen.height = window.innerHeight;
        texture = document.createElement('canvas');
        texture.width = screen.width;
        texture.height = screen.height;
        var ict = texture.getContext('2d');
        for (var i = 0; i < screen.height + 3; i += 3) {
            ict.beginPath();
            ict.moveTo(0, i);
            ict.lineTo(screen.width, i);
            ict.strokeStyle = 'rgba(64,64,48,0.75)';
            ict.stroke();
            ict.closePath();
        }
    }
    window.addEventListener('resize', resize, false);
    resize();

    var x = 0,
		y = 0,
		xm = 0,
		ym = 0;
    var len = 200,
		score = 0,
		best = 0;
    var run = function () {
        requestAnimationFrame(run);
        ctx.clearRect(0, 0, screen.width, screen.height);

        var dx = xm - x;
        var dy = ym - y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        var a = Math.atan2(dy, dx);
        var hypo = len - dist;
        x = x - (hypo * Math.cos(a));
        y = y - (hypo * Math.sin(a) - 6);
        ctx.beginPath();
        ctx.strokeStyle = "#fff";
        ctx.lineWidth = 8;
        ctx.lineCap = "round";
        ctx.moveTo(xm, ym);
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.fillStyle = "#F00";
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(x, y, 40, a + 0.5 * Math.PI, a + 1.5 * Math.PI);
        ctx.fill();
        if (y >= ym) {
            score = 0;
            len = 200;
        }
        else {
            len *= 0.999;
            score++;
            if (score > best) best = score;
            scoreId.innerHTML = "分数: " + ("000" + score).slice(-4) + " 最好成绩: " + ("000" + best).slice(-4);
        }
        ctx.drawImage(texture, 0, 0);
    }
    requestAnimationFrame(run);
}();