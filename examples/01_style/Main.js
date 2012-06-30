
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
        alpha: 0.7,
        background: 'blue',
        border: 'white',
    });

    app.canvas( canvas ).render();

    window.app = app;
    window.Shape = Shape;

});