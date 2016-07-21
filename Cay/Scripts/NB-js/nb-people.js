! function () {
    "use strict";
    // ==== init ====
    var screen = ge1doot.screen.init("canvas", null, true),
      ctx = screen.ctx,
      pointer = screen.pointer.init(),
      list = [],
      nMax = 60,
      ba = 0.02,
      be = 0.79;

    function Sprite(ctx, src) {
        this.ctx = ctx;
        this.elem = new Image();
        this.elem.src = src;
        this.elem.parent = this;
        this.w = 0;
        this.h = 0;
        this.elem.onload = function () {
            this.parent.loaded(this.width, this.height);
        }
    }
    Sprite.prototype = {
        loaded: function (w, h) {
            this.w = w;
            this.h = h;
        },
        draw: function (x, y, angle) {
            this.ctx.save();
            ctx.globalCompositeOperation = "destination-over";
            this.ctx.translate(x, y);
            this.ctx.rotate(angle);
            this.ctx.drawImage(this.elem, -this.w * 0.5, -this.h * 0.5);
            this.ctx.restore();
        }
    }

    function Lost(sprite, parent) {
        this.sprite = sprite;
        this.b = {
            x: screen.width / 2,
            y: screen.height / 2
        },
          this.c = {
              x: screen.width / 2,
              y: screen.height / 2
          },
          this.e = {
              x: 0,
              y: 0
          };
        this.angle = 0;
        this.parent = parent;
    }
    Lost.prototype.anim = function (xm, ym) {
        var e = this.e, b = this.b, c = this.c;
        var dx = (this.parent ? this.parent.b.x : xm) - b.x;
        var dy = (this.parent ? this.parent.b.y : ym) - b.y;
        e.x = b.x - (b.x - c.x) - (b.x - (dx * ba + b.x));
        e.y = b.y - (b.y - c.y) - (b.y - (dy * ba + b.y));
        c.x = e.x - (b.x - e.x) * be;
        c.y = e.y - (b.y - e.y) * be;
        this.angle = Math.atan2(b.y - e.y, 2 + b.x - e.x);
        this.sprite.draw(e.x, e.y, this.angle);
        b.x = e.x;
        b.y = e.y;
    }
    // create instances
    var sprite = new Sprite(ctx, "http://www.dhteumeuleu.com/images/malschp.png");
    pointer.pos.x = screen.width / 2;
    pointer.pos.y = screen.height / 2;
    var lost = null;
    for (var i = 0; i < nMax; i++) {
        lost = new Lost(sprite, lost);
        list.push(lost);
    }
    // main loop
    function run() {
        requestAnimationFrame(run);
        ctx.clearRect(0, 0, screen.width, screen.height);
        for (var i = 0, lost; lost = list[i++];) {
            lost.anim(pointer.pos.x, pointer.pos.y);
        }
    }
    requestAnimationFrame(run);
}();