
require.config({
    paths: {
        "Shape": "../../src"
    },

    // cache bust for require js
    urlArgs: ( "#nobust" == location.hash) ? "" : "bust=" +  (new Date()).getTime()

});

define([
    
    "Shape/Shape",
    "../Stats"

], function( Shape, Stats ) {

    // create the canvases
    var canvas = document.createElement( 'canvas' );
    document.body.appendChild( canvas );

    //
    var app = new Shape({
        canvas: canvas,
        size: { x: 400, y: 200 },
        children: [{
            sid: 'ball',
            autosize: false,
            image: 'ball.png',
            size: { x: 20, y: 20 }
        }],

        frames: {
            0: { size: { x: 400 } },
            2000: { size: { x: 800 } },
        }
    });

    //
    Stats.monitor( app ).renderloop();

    window.app = app;
    window.Shape = Shape;

});