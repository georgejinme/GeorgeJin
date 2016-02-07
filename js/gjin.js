$(document).ready(function(){
	initPath()
    initTitle()
    initNavTrigger()
    initNav()
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

var initTitle = function() {
    $(".fadeInLeft").textillate({
        initialDelay: 500,
        in: {
            effect: 'fadeInLeft',
            callback: function(){
                $(".myProjectBtn").fadeIn()
            }
        }
    })
}

var initNavTrigger = function() {
    var pathA = document.getElementById('pathA'),
    pathC = document.getElementById('pathC'),
    segmentA = new Segment(pathA, 8, 32),
    segmentC = new Segment(pathC, 8, 32);

    // Linear section, with a callback to the next
    function inAC(s) { s.draw('80% - 24', '80%', 0.3, {delay: 0.1, callback: function(){ inAC2(s) }}); }

    // Elastic section, using elastic-out easing function
    function inAC2(s) { s.draw('100% - 54.5', '100% - 30.5', 0.6, {easing: ease.ease('elastic-out', 1, 0.3)}); }

    // Initialize
    var pathB = document.getElementById('pathB'),
        segmentB = new Segment(pathB, 8, 32);

    // Expand the bar a bit
    function inB(s) { s.draw(8 - 6, 32 + 6, 0.1, {callback: function(){ inB2(s) }}); }

    // Reduce with a bounce effect
    function inB2(s) { s.draw(8 + 12, 32 - 12, 0.3, {easing: ease.ease('bounce-out', 1, 0.3)}); }


    function outAC(s) { s.draw('90% - 24', '90%', 0.1, {easing: ease.ease('elastic-in', 1, 0.3), callback: function(){ outAC2(s) }}); }
    function outAC2(s) { s.draw('20% - 24', '20%', 0.3, {callback: function(){ outAC3(s) }}); }
    function outAC3(s) { s.draw(8, 32, 0.7, {easing: ease.ease('elastic-out', 1, 0.3)}); }

    function outB(s) { s.draw(8, 32, 0.7, {delay: 0.1, easing: ease.ease('elastic-out', 2, 0.4)}); }

    var trigger = $('#menu-icon-trigger')
    var toCloseIcon = true;

    trigger.click(function(){
        if (toCloseIcon) {
            inAC(segmentA);
            inB(segmentB);
            inAC(segmentC);
        } else {
            outAC(segmentA);
            outB(segmentB);
            outAC(segmentC);
        }
        toCloseIcon = !toCloseIcon
    })
}


var initNav = function() {
    function mobilecheck() {
        var check = false;
        (function(a){if(/(android|ipad|playbook|silk|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
        return check;
    }

    function init() {

        var menu = document.getElementById( 'bt-menu' ),
            trigger = menu.querySelector( '.menu-icon-trigger' ),
            // event type (if mobile, use touch events)
            eventtype = mobilecheck() ? 'touchstart' : 'click',
            resetMenu = function() {
                classie.remove( menu, 'bt-menu-open' );
                classie.add( menu, 'bt-menu-close' );
            },
            closeClickFn = function( ev ) {
                resetMenu();
                overlay.removeEventListener( eventtype, closeClickFn );
            };

        var overlay = document.createElement('div');
        overlay.className = 'bt-overlay';
        menu.appendChild( overlay );

        trigger.addEventListener( eventtype, function( ev ) {
            ev.stopPropagation();
            ev.preventDefault();
            
            if( classie.has( menu, 'bt-menu-open' ) ) {
                resetMenu();
            }
            else {
                classie.remove( menu, 'bt-menu-close' );
                classie.add( menu, 'bt-menu-open' );
                overlay.addEventListener( eventtype, closeClickFn );
            }
        });

    }

    init();
}






