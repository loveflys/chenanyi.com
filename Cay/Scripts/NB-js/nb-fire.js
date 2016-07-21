//
// Fireworks!
// Action Script by Johannes Jensen, 2009 @ http://wonderfl.net/c/7gZj
// JavaScript port by Gerard Ferrandez, 2015 @ codepen.io/ge1doot
//

! function () {

    "use strict";

    // Rocket class
    function Rocket(x, y) {
        this.index = 0;
        this.x = x;
        this.y = y;
        this.acceleration = 0.2;
        this.velocity = this.acceleration;
        this.explosion = this.acceleration * (50 + Math.random() * 22);
        this.gravity = 0;
        this.rotation = 0;
        // Which direction it'll fly.
        this.steer = (Math.random() * 2) - 1;
        // Set h to the point where the rocket hits the ground.
        this.h = canvas.height - 50;
        this.sent = false;
        this.flameRate = 2;
        this.flameInt = this.flameRate;
        // Draw the rocket and cache it as a Bitmap
        this.shape = rocketBitmap;
    }

    // Converts an angle to radians.
    Rocket.prototype.angleRadians = function (angle) {
        return (angle * Math.PI) / 180;
    }

    // animate rocket
    Rocket.prototype.animation = function () {
        // Is the rocket sent out?
        if (!this.sent) {
            // Is the player touching the ground? If so, make it bounce off the ground!
            if (this.y > this.h - (this.gravity > 0 ? this.gravity : 0) - 15) {
                this.y = this.h - 15;
                this.gravity = -Math.abs(this.gravity * 0.5);
                // Not enough power to bounce off? Send out the rocket!
                if (Math.abs(this.gravity) < 2) {
                    this.sent = true;
                }
            }
            // Assign gravity to the rocket's y position.
            this.y += this.gravity;
            this.gravity += 0.25;
        } else {
            // Steer the rocket's rotation with the steer variable.
            this.rotation += this.steer;
            // Move the rocket.
            this.x += this.velocity * Math.cos(this.angleRadians(this.rotation - 90));
            this.y += this.velocity * Math.sin(this.angleRadians(this.rotation - 90));
            // Accelerate the rocket.
            this.velocity += this.acceleration;
            // Is it time for a flame to come out?
            if (this.flameInt % this.flameRate == 0) {
                // Allocate flame.
                var flame = new Fire(
					this.x + (12 * Math.cos(this.angleRadians(this.rotation + 90))),
					this.y + (15 * Math.sin(this.angleRadians(this.rotation + 90))),
					this.angleRadians(this.rotation + 90 + ((Math.random() * 20) - 10))
				);
                // Add the flame to the flames set
                flames.add(flame);
            }
            this.flameInt++;
            // Did the rocket fly out of the screen? Make it come out at the other side!
            if (this.x < 0) this.x = canvas.width;
            if (this.x > canvas.width) this.x = 0;
            // Is it time to explode yet?
            if (this.velocity >= this.explosion) {
                // Add an explosion
                explosions.add(
					new Explosion(this.x, this.y)
				);
                // Remove the rocket from the set
                rockets.remove(this);

            }
        }
        // draw rocket
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angleRadians(this.rotation));
        ctx.drawImage(this.shape, -12, -15);
        ctx.restore();
    }

    // The flame that comes out from the rockets.
    function Fire(x, y, radians) {
        this.index = 0;
        this.x = x;
        this.y = y;
        this.radians = radians;
        this.scale = 1;
        this.alpha = 1;
        // Pick a random color for the fire.
        var g = [0, 215, 69];
        this.picked = 'rgba(255,' + g[Math.floor(Math.random() * g.length)] + ',0,';
    }

    // Animate the flame.
    Fire.prototype.animation = function () {
        // Move the flame.
        this.x += Math.cos(this.radians);
        this.y += Math.sin(this.radians);
        // Make it grow slowly.
        this.scale += 0.28;
        // Make it fade out.
        this.alpha -= 0.05;
        // draw
        if (this.alpha > 0) {
            ctx.beginPath();
            ctx.fillStyle = this.picked + this.alpha + ')';
            ctx.arc(this.x, this.y, 5 * this.scale, 0, 2 * Math.PI);
            ctx.fill();
        } else {
            // Remove the flame from the set
            flames.remove(this);
        }
    }

    // The actual explosions from the rockets.
    function Explosion(x, y) {
        this.index = 0;
        this.x = x;
        this.y = y;
        // Pick a random color for the explosion.
        var r = [0xC8, 0xF5, 0xF2, 0x04, 0x2D, 0xF0, 0xFF];
        var g = [0x33, 0xAC, 0xFF, 0xC3, 0x64, 0x11, 0xFF];
        var b = [0x04, 0x31, 0x21, 0x16, 0xED, 0xF9, 0xFF];
        var i = Math.floor(Math.random() * g.length);
        this.color = 'rgba(' + r[i] + ',' + g[i] + ',' + b[i] + ',';
        this.lines = 10 + Math.random() * 18;
        this.size = 0;
        this.total = 60 + Math.random() * 80;
        this.opacity = 1;
        this.thickness = 3 + Math.random() * 6;
    }

    // Animate the explosion.
    Explosion.prototype.animation = function () {
        // set the thickness, color and opacity
        ctx.beginPath();
        ctx.strokeStyle = this.color + this.opacity + ')';
        ctx.lineCap = 'round';
        ctx.lineWidth = this.thickness;
        // Make it grow smoothly.
        this.size -= (this.size - this.total) / 5;
        // Loop through angles and draw each line.
        for (var i = 0; i < this.lines; i++) {
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(
				this.x + this.size * Math.cos(2 * Math.PI / this.lines * i),
				this.y + this.size * Math.sin(2 * Math.PI / this.lines * i)
			);
        }
        ctx.stroke();
        // Fade out.
        this.opacity -= 0.02;
        // Is it invisible? If so, delete it.
        if (this.opacity <= 0) {
            // Remove the explosion from the set
            explosions.remove(this);
        }
    }

    // fast reference array
    var ReferenceArray = function () {
        this.elem = [];
        this.count = 0;
        this.indexIterate = 0;
        this.add = function (obj) {
            this.elem[this.count] = obj;
            obj.index = this.count++;
        }
        this.remove = function (obj) {
            var i = obj.index;
            this.count--;
            if (this.count !== i) {
                this.elem[i] = this.elem[this.count];
                this.elem[i].index = i;
                this.indexIterate--;
            }
            this.elem[this.count] = null;
        }
        this.iterate = function (fn) {
            for (this.indexIterate = 0; this.indexIterate < this.count; this.indexIterate++) {
                fn(this.elem[this.indexIterate]);
            }
        }
    }

    // main loop
    function run() {
        // request next frame
        requestAnimationFrame(run);
        // clear screen
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // ground
        ctx.fillStyle = "#111";
        ctx.fillRect(0, canvas.height - 50, canvas.width, 50);
        // animate rockets
        rockets.iterate(function (elem) {
            elem.animation();
        });
        // animate flames
        flames.iterate(function (elem) {
            elem.animation();
        });
        // animate explosions
        explosions.iterate(function (elem) {
            elem.animation();
        });
    }

    // draw the rocket
    function drawRocket() {
        var shape = document.createElement('canvas');
        shape.width = 24;
        shape.height = 30;
        var ict = shape.getContext('2d');
        // body
        ict.beginPath();
        ict.fillStyle = "#777777";
        ict.moveTo(7, 30);
        ict.lineTo(17, 30);
        ict.lineTo(17, 7.5);
        ict.lineTo(12, 0);
        ict.lineTo(7, 7.5);
        ict.lineTo(7, 30);
        ict.closePath();
        ict.fill();
        // left wing
        ict.beginPath();
        ict.fillStyle = "#900000";
        ict.moveTo(7, 30);
        ict.lineTo(0, 30);
        ict.lineTo(7, 23);
        ict.lineTo(7, 30);
        ict.closePath();
        ict.fill();
        // right wing
        ict.beginPath();
        ict.fillStyle = "#900000";
        ict.moveTo(17, 30);
        ict.lineTo(24, 30);
        ict.lineTo(17, 23);
        ict.lineTo(17, 30);
        ict.closePath();
        ict.fill();
        return shape;
    }

    // launch some rockets
    function launch(n, x, y) {
        for (var i = 0; i < n; i++) {
            nLaunch++;
            setTimeout(function () {
                rockets.add(
					new Rocket(x, y)
				);
                nLaunch--;
            }, nLaunch * 64);
        }
    }

    // canvas
    var canvas = ge1doot.canvas("canvas");
    var ctx = canvas.ctx;
    var pointer = canvas.pointer;

    // variables
    var rocketBitmap = drawRocket();
    var rockets = new ReferenceArray();
    var explosions = new ReferenceArray();
    var flames = new ReferenceArray();
    var nLaunch = 0;

    // on click / touch
    pointer.down = function () {
        rockets.add(
			new Rocket(pointer.x, pointer.y)
		);
    }
    pointer.move = function () {
        if (pointer.isDown && nLaunch == 0) {
            launch(1, pointer.x, pointer.y);
        }
    }
    // autolaunch some rockets at startup
    launch(15, canvas.width / 2, canvas.height);
    // zyva!
    run();
}();