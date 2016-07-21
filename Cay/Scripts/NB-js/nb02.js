!function () {

    "use strict";

    // circle class
    var Circle = function (x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = "hsl(47, 30%," + (110 - radius) + "%)";
        this.dragging = false;
        this.dx = 0;
        this.dy = 0;
    }

    /////////////////////////////////////////////////

    // main loop
    function run() {
        // request next frame
        requestAnimationFrame(run);
        // clear screen
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // circles collision
        for (var i = 0, len = circles.length; i < len; i++) {
            var c0 = circles[i];
            for (var j = i + 1; j < len; j++) {
                var c1 = circles[j];
                var dx = c1.x - c0.x;
                var dy = c1.y - c0.y;
                var r = c0.radius + c1.radius;
                var d = dx * dx + dy * dy;
                if (d < r * r) {
                    d = Math.sqrt(d);
                    dx /= d;
                    dy /= d;
                    d = (r - d) * 0.5;
                    dx *= d;
                    dy *= d;
                    if (!c0.dragging) {
                        c0.x -= dx;
                        c0.y -= dy;
                    }
                    if (!c1.dragging) {
                        c1.x += dx;
                        c1.y += dy;
                    }
                }
            }
        }

        // center attraction
        for (var i = 0; i < len; i++) {
            var c0 = circles[i];
            var dx = c0.x - canvas.center.x;
            var dy = c0.y - canvas.center.y;
            var f = 1 / c0.radius;
            c0.x -= dx * 0.1 * f;
            c0.y -= dy * 0.1 * f;
        }

        // draw circles
        for (var i = 0; i < len; i++) {
            var c0 = circles[i];
            ctx.beginPath();
            ctx.arc(c0.x, c0.y, c0.radius - 2, 0, 2 * Math.PI);
            ctx.fillStyle = c0.color;
            ctx.fill();
            // set dragging circle
            if (pointer.isDown && !dragging) {
                if (ctx.isPointInPath(pointer.x, pointer.y)) {
                    dragging = c0;
                    c0.dragging = true;
                    c0.dx = pointer.x - c0.x;
                    c0.dy = pointer.y - c0.y;
                }
            }
        }

        // drag circle
        if (dragging) {
            dragging.x = pointer.x - dragging.dx;
            dragging.y = pointer.y - dragging.dy;
        }

    }

    /////////////////////////////////////////////////

    // canvas
    var canvas = ge1doot.canvas("canvas");
    canvas.center = { x: 0, y: 0 };
    var ctx = canvas.ctx;
    var pointer = canvas.pointer;
    var dragging = false;

    // center
    canvas.resize = function () {
        this.center.x = this.width / 2;
        this.center.y = this.height / 2;
    }
    canvas.resize();

    // create circles
    var circles = [];
    for (var i = 0; i < 100; i++) {
        circles.push(
			new Circle(
				Math.random() * canvas.width,
				Math.random() * canvas.height,
				i < 50 ? Math.random() * 10 + 10 : Math.random() * 90 + 10
			)
		);
    }

    // pointer up
    pointer.up = function () {
        dragging.dragging = false;
        dragging = false;
    }

    // zyva!
    run();

}();