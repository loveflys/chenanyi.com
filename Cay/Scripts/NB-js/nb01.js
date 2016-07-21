!function () {

    "use strict";

    // draw lens
    function lens(color, iScale, dist) {
        ctx.beginPath();
        ctx.arc((cx - px) / dist + cx, (cy - py) / dist + cy, dim * iScale, 0, 2 * Math.PI);
        ctx.fillStyle = color;
        ctx.fill();
    }

    /////////////////////////////////////////////////
    // main loop
    function run() {
        // request next frame
        requestAnimationFrame(run);
        // clear screen
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // position
        cx = canvas.width * 0.5;
        cy = canvas.height * 0.5;
        px -= (px - pointer.x) * 0.1;
        py -= (py - pointer.y) * 0.1;
        // background Image
        ctx.globalCompositeOperation = "lighter";
        ctx.save();
        ctx.translate(px, py);
        ctx.rotate(px / 1000);
        ctx.drawImage(bkg, -400, -190);
        ctx.restore();
        // flares
        lens("rgba(173, 143, 115, 0.2)", 1, 1);
        lens("rgba(249, 239, 212, 0.2)", 0.5, 2);
        lens("rgba(171, 160, 220, 0.2)", 0.25, 3);
        lens("rgba(173, 143, 115, 0.2)", 1, 8);
        lens("rgba(249, 239, 212, 0.2)", 0.5, -2);
        lens("rgba(249, 239, 212, 0.2)", 0.25, -4);
        lens("rgba(171, 160, 220, 0.2)", 0.2, -5.5);
    }
    /////////////////////////////////////////////////

    // canvas
    var canvas = ge1doot.canvas("canvas");
    var ctx = canvas.ctx;
    var pointer = canvas.pointer;
    pointer.x = canvas.width / 2.5;
    pointer.y = canvas.height / 2.5;


    // variables
    var dim = 128;
    var px = 0, py = 0, cx, cy;
    var bkg = new Image();
    bkg.src = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/222599/mars2.jpg";


    // zyva!
    run();

}();