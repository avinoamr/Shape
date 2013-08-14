
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
        size: { x: 600, y: 300 },
        alpha: 0.3,
        background: 'blue',
        border: 'white',
    });

    var ball = new Shape({
        image: "ball.png",
        border: "red",
    }).on( "image:ready", function() {
        this.root().render();
    });
    app.add( ball );

    app.canvas( canvas ).render();

    window.app = app;
    window.Shape = Shape;

});