
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
        image: "Shape.jpg"
    });

    app.on( "image:ready", function() {
        this.render();
    }, app );

    app.canvas( canvas );

    window.app = app;
    window.Shape = Shape;

});