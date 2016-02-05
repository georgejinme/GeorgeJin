$(document).ready(function(){
	initPath()
})



var initPath = function(){
	var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    window.requestAnimFrame = (function() {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            function(callback) {
                window.setTimeout(callback, 1000 / 60);
            };
    })();
    var number_of_curves=32;
    var C = [];
    var curve = function(cp1x, cp1y, cp2x, cp2y, x, y, cp1xvx,cp1xvy,cp1yvx,cp1yvy,cp2xvx,cp2xvy,cp2yvx,cp2yvy) {
        this.cp1x = cp1x;
        this.cp1y = cp1y;
        this.cp2x = cp2x;
        this.cp2y = cp2y;
        this.x = x;
        this.y = y;

        this.cp1xvx = cp1xvx;
        this.cp1xvy = cp1xvy;
        this.cp1yvx = cp1yvx;
        this.cp1yvy = cp1yvy;

        this.cp2xvx = cp2xvx;
        this.cp2xvy = cp2xvy;
        this.cp2yvx = cp2yvx;
        this.cp2yvy = cp2yvy;
    };


    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function setBG() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function init() {
        for (var i = 0; i < number_of_curves; i++) {
            var cp1x = Math.random() * canvas.width;
            var cp1y = Math.random() * canvas.height;
            var cp2x = Math.random() * canvas.width;
            var cp2y = Math.random() * canvas.height;
            var x = canvas.width;
            var y = canvas.height / 2;

            var cp1xvx = Math.random() * 2 - 1;
            var cp1xvy = Math.random() * 2 - 1;

            var cp1yvx = Math.random() * 2 - 1;
            var cp1yvy = Math.random() * 2 - 1;

            var cp2xvx= Math.random() * 2 - 1;
            var cp2xvy= Math.random() * 2 - 1;

            var cp2yvx = Math.random() * 2 - 1;
            var cp2yvy = Math.random() * 2 - 1;


            C.push(
                new curve(
                    cp1x, cp1y, cp2x, cp2y,
                    x, y,
                    cp1xvx,cp1xvy,cp1yvx,cp1yvy,
                    cp2xvx,cp2xvy,cp2yvx,cp2yvy
                )
            );
        }
    }

    function draw_curves(bg) {
        setBG();
        ctx.lineWidth=1;
        ctx.strokeStyle = bg;

        for (var i = 0; i < C.length; i++) {

            ctx.beginPath();
            ctx.moveTo(0, canvas.height / 2);
            ctx.bezierCurveTo(
                C[i].cp1x, C[i].cp1y,
                C[i].cp2x, C[i].cp2y,
                canvas.width, C[i].y
            );
            ctx.stroke();

            if (C[i].cp1x < 0 || C[i].cp1x > canvas.width) {
                C[i].cp1x -= C[i].cp1xvx;
                C[i].cp1xvx *= -1;
            }
            if (C[i].cp1y < 0 || C[i].cp1y > canvas.height) {
                C[i].cp1y -= C[i].cp1yvy;
                C[i].cp1yvy *= -1;
            }

            if (C[i].cp2x < 0 || C[i].cp2x > canvas.width) {
                C[i].cp2x -= C[i].cp2xvx;
                C[i].cp2xvx *= -1;
            }
            if (C[i].cp2y < 0 || C[i].cp2y > canvas.height) {
                C[i].cp2y -= C[i].cp2yvy;
                C[i].cp2yvy *= -1;
            }

            C[i].cp1y += C[i].cp1yvy;
            C[i].cp1x += C[i].cp1xvx;
            C[i].cp2x += C[i].cp2xvx;
            C[i].cp2y += C[i].cp2yvy;
        }
        requestAnimFrame(draw_curves);
    }
    resize();
    setBG();
    init();
    draw_curves('rgba(142, 229, 238, 1)');
}
