
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

    var canvas = document.createElement( 'canvas' );
    document.body.appendChild( canvas );

    var app = new Shape({
        size: { x: Shape.FITCONTENTS, y: 100 },
        //alpha: 0.7,
        background: 'blue',
        border: 'white',
    });

    var ball = new Shape({
        sid: "ball",
        image: "ball.png",
        border: "red",
        size: { x: 40, y: 40 },
        position: { x: Shape.RIGHT( -10 ), y: Shape.BOTTOM( -10 ) }
    }).on( "image:ready", function() {
        this.root().render();
    });
    app.add( ball );

    var text = new Shape({
        sid: "text",
        text: {
            content: "Hello World Foo Bar Long Text",
            background: "white",
            font: "14px Arial"
        }
    });
    app.add( text );

    app.canvas( canvas ).render();

    window.app = app;
    window.Shape = Shape;

});