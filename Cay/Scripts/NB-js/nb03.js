! function () {

    "use strict";

    function chromaKey(source, id) {
        // create new image
        var imgSource = new Image();
        imgSource.crossOrigin = "Anonymous";
        imgSource.src = source;
        imgSource.onload = function () {
            // render image in canvas
            var jpg = document.createElement('canvas');
            var w = jpg.width = this.width;
            var h = jpg.height = this.height;
            var ctx = jpg.getContext('2d');
            ctx.drawImage(this, 0, 0, w, h);
            // chroma Key
            var img = ctx.getImageData(0, 0, w, h),
				data = img.data;
            for (var i = 0, n = data.length; i < n; i += 4) {
                var r = data[i + 0];
                var g = data[i + 1];
                var b = data[i + 2];
                // make white transparent (rgb > 240, 240, 240)
                if (r > 240 && g > 240 && b > 240) {
                    data[i + 3] = 0;
                }
            }
            // create new transparent image
            var transparent = document.createElement('canvas');
            transparent.width = w;
            transparent.height = h;
            var ctx = transparent.getContext('2d');
            ctx.putImageData(img, 0, 0);
            images[id] = transparent;
        }
    }

    // draw parallax image
    function parallax(id, x, y) {
        var image = images[id];
        if (image) {
            ctx.drawImage(image, x, y);
        }
    }

    // main loop
    function run() {
        // request next frame
        requestAnimationFrame(run);
        // clear screen
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // ease pointer
        pointer.cx += (pointer.x - pointer.cx) / 10;
        pointer.cy += (pointer.y - pointer.cy) / 10;
        var rx = -((canvas.width / 2) - Math.max(15, Math.min(pointer.cx, canvas.width - 15))) / 7;
        var ry = -((canvas.height / 2) - Math.max(0, Math.min(pointer.cy, canvas.height - 5))) / 4.75;
        // parallax
        parallax(0, -20 + (rx / 2), -80 + (ry * 2));
        parallax(1, -40 + (rx / 2), 20 + (ry / 2));
        parallax(2, -20 + (rx / 3), 90 + (ry / 3));
        parallax(3, -20 - (rx / 2), 130 - (ry / 2));
        parallax(4, 0 - (rx / 1), 160 - (ry / 1));
        parallax(5, 240 - (rx * 2), 220 - (ry * 2));
    }

    // canvas
    var canvas = ge1doot.canvas("canvas");
    var ctx = canvas.ctx;
    // pointer
    var pointer = canvas.pointer;
    pointer.cx = pointer.x = canvas.width / 2;
    pointer.cy = 0;
    pointer.y = canvas.height;
    // images
    var images = [];
    // make jpg images transparent images
    chromaKey("http://www.dhteumeuleu.com/images/is05.jpg", 0);
    chromaKey("http://www.dhteumeuleu.com/images/is04.jpg", 1);
    chromaKey("http://www.dhteumeuleu.com/images/is03.jpg", 2);
    chromaKey("http://www.dhteumeuleu.com/images/is02.jpg", 3);
    chromaKey("http://www.dhteumeuleu.com/images/is01.jpg", 4);
    chromaKey("http://www.dhteumeuleu.com/images/is07.jpg", 5);
    // zyva!
    run();

}();