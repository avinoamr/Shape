
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
        children: [{
            text: {
                content: "Left",
                font: "30px sans-serif",
                background: "yellow"
            },
            border: "white",
        }, {
            text: {
                content: "Right",
                font: "30px sans-serif",
                background: "yellow"
            },
            border: "white",
            position: { x: 500, y: 0 }
        }]
    });

    app.canvas( canvas ).render();

    window.app = app;
    window.Shape = Shape;

});