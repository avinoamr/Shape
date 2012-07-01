
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
    var canvas_one = document.createElement( 'canvas' );
    document.getElementById( 'one' ).appendChild( canvas_one );

    var canvas_two = document.createElement( 'canvas' );
    document.getElementById( 'two' ).appendChild( canvas_two );

    var canvas_three = document.createElement( 'canvas' );
    document.getElementById( 'three' ).appendChild( canvas_three );

    //
    var two = new Shape({
        canvas: canvas_two,
        size: { x: 400, y: 200 },
        children: [{
            sid: 'two_text',
            text: {
                content: "Two",
                font: "30px sans-serif",
                background: "white"
            }
        }]
    });

    //
    var three = new Shape({
        canvas: canvas_three,
        size: { x: 400, y: 200 },
        children: [{
            sid: 'three_text',
            text: {
                content: "Three",
                font: "30px sans-serif",
                background: "white"
            }
        }]
    });
    three.children()[ 0 ].position({ x: Shape.RIGHT });

    //
    var app = new Shape({
        sid: 'app',
        size: { x: 400, y: 200 },
        canvas: canvas_one,
        children: [ two, three ]
    });

    app.render();

    window.app = app;
    window.Shape = Shape;

});