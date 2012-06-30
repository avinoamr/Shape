
require.config({
    paths: {
        "Shape": "../../src"
    },

    // cache bust for require js
    urlArgs: ( "#nobust" == location.hash) ? "" : "bust=" +  (new Date()).getTime()

});

define([
    
    "Shape/Shape"

], function( Shape ) {

    // create the canvases
    var canvas = document.createElement( 'canvas' );
    document.body.appendChild( canvas );

    //
    var app = new Shape({
        canvas: canvas,
        size: { x: 400, y: 200 },
        children: [{
            sid: 'ball',
            image: 'ball.png'
        }]
    });

    //
    var speed = {
        x: Math.random(),
        y: Math.random()
    };

    //
    app.on( "render", function() {

        var ball = this.get( 'ball' );
        ball.size({ x: 30, y: 30 });

        var position = ball.position();
        position.x += speed.x;
        position.y += speed.y;

        if ( position.y > app.size().y - ball.size().y || position.y < 0 ) {
            speed.y *= -1;
        }
        if ( position.x > app.size().x - ball.size().x || position.x < 0 ) {
            speed.x *= -1;
        }


        ball.position( position );

    }, app );

    //
    app.renderloop();

    window.app = app;
    window.Shape = Shape;

});