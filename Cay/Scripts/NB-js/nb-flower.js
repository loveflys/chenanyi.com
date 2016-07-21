! function () {
    "use strict";
    var canvas = new ge1doot.Canvas();
    var ctx = canvas.ctx;
    var pointer = canvas.pointer;
    var vect = [],
		sw, nw, nh, py;
    var nbx = 15,
		nby = 0,
		cx = 0,
		cy = 0,
		ws = 0,
		hs = 0;
    var Vector = function (x, y) {
        this.x = x;
        this.y = y;
        this.x1 = 0;
        this.y1 = 0;
        this.x2 = 0;
        this.y2 = 0;
        this.zIndex = 0;
    }
    Vector.prototype.points = function () {
        this.x1 = this.x * ws;
        this.y1 = py + this.y * hs + sw * 0.5;
        var dx = cx - this.x1;
        var dy = cy - this.y1;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (pointer.isDown) {
            var rad = nw / 6;
            var len = 5;
        } else {
            var rad = nw / 4;
            var len = 1;
        }
        if (dist < rad) {
            var k = Math.PI * Math.abs(dist / rad);
            var M = Math.sin(k) * len;
            this.zIndex = (1 + 3 * (1 - Math.sin(k * .5)));
            this.x2 = 1 + this.x1 - dx * M;
            this.y2 = 1 + this.y1 - dy * M;
        }
        else {
            this.zIndex = 1000;
        }
    }
    Vector.prototype.draw = function (i) {
        ctx.beginPath();
        ctx.moveTo(this.x1 + sw * 0.35, this.y1);
        ctx.lineTo(this.x2 + sw * 0.35, this.y2);
        ctx.strokeStyle = "rgba(0,0,0,0.3)";
        ctx.stroke();
        ctx.beginPath();
        var c = Math.round(-196 + this.zIndex * 255);
        ctx.strokeStyle = "rgb(" +
			Math.round(c * pointer.y / nh) + "," +
			Math.round(c * .5) + "," +
			Math.round(c * pointer.x / nw) + ")";
        ctx.moveTo(this.x1, this.y1);
        ctx.lineTo(this.x2, this.y2);
        ctx.stroke();
    }
    canvas.resize = function () {
        nw = Math.max(canvas.width, canvas.height);
        nh = canvas.height * 0.6 - 6;
        py = canvas.height * 0.2 + 2;
        sw = Math.round(nw / 20);
        ws = nw / nbx;
        nby = Math.round(nbx * nh / nw);
        hs = (nh - sw) / nby;
        // ---- reset ----
        vect = [];
        var k = 0;
        for (var j = 0; j <= nby; j++) {
            for (var i = 0; i <= nbx; i++) {
                vect.push(
					new Vector(i, j)
				);
            }
        }
    }
    canvas.resize();
    var run = function () {
        requestAnimationFrame(run);
        // ---- clear background ----
        ctx.fillStyle = "#2a2a2a";
        ctx.fillRect(0, 0, canvas.width, canvas.height * 0.2);
        ctx.clearRect(0, canvas.height * 0.2, canvas.width, canvas.height * 0.6);
        ctx.fillRect(0, canvas.height * 0.8, canvas.width, canvas.height * 0.2);
        // ---- easing mouse ----
        cx += (pointer.x - cx) * 0.1;
        cy += (pointer.y - cy) * 0.1;
        // ---- calculate positions ----
        for (var i = 0, o; o = vect[i++];) {
            o.points();
        }
        // ---- zIndex sorting ----
        vect.sort(function (p0, p1) {
            return p0.zIndex - p1.zIndex;
        });
        // ---- draw ----
        ctx.lineCap = "round";
        ctx.lineWidth = sw;
        for (var i = 0, o;
			(o = vect[i++]) && o.zIndex < 1000;) {
            o.draw();
        }
    }
    pointer.x = canvas.width / 2;
    pointer.y = canvas.height / 2;
    run();
}();