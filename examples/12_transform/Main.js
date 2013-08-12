
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
        sid: "app",
        size: { x: 500, y: 500 },
    });

    //
    var text = new Shape({
        sid: "text",
        //border: "red",
        text: {
            content: "Hello World",
            background: "white",
            font: "bold 14px Arial"
        }
    })
    //app.add( text );

    var ball = new Shape({
        sid: "ball",
        //border: "red",
        image: "ball.png",
        position: { x: Shape.CENTER, y: 20 },
        size: { x: 30, y: 30 },
    }).on( "image:ready", function() {
        app.render();
    });
    //app.add( ball );

    var container = new Shape({
        sid: "container",
        border: "red",
        size: { x: Shape.FITCONTENTS, y: Shape.FITCONTENTS },
        position: { x: Shape.CENTER },
        children: [ ball, text ]
    });
    app.add( container );

    app.canvas( canvas ).render();

    window.app = app;
    window.Shape = Shape;

});