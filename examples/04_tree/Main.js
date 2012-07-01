
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
            sid: 'top-left',
            text: {
                content: "Top Left",
                font: "30px sans-serif",
                background: "yellow"
            },
            border: "white",
        }, {
            sid: 'top-right',
            text: {
                content: "Top Right",
                font: "30px sans-serif",
                background: "yellow"
            },
            border: "white",
        }, {
            sid: 'center',
            text: {
                content: "Center",
                font: "30px sans-serif",
                background: "yellow"
            }
        }, {
            sid: 'bottom-left',
            text: {
                content: "Bottom Left",
                font: "30px sans-serif",
                background: "yellow"
            }
        }, {
            sid: 'bottom-right',
            text: {
                content: "Bottom Right",
                font: "30px sans-serif",
                background: "yellow"
            }
        }]
    });

    //
    app.find( 'top-left' ).position({ x: Shape.LEFT, y: Shape.TOP });
    app.find( 'top-right' ).position({ x: Shape.RIGHT, y: Shape.TOP });
    app.find( 'center' ).position({ x: Shape.CENTER, y: Shape.CENTER( -50 ) });
    app.find( 'bottom-right' ).position({ x: Shape.RIGHT, y: Shape.BOTTOM });
    app.find( 'bottom-left' ).position({ x: Shape.LEFT, y: Shape.BOTTOM });

    app.canvas( canvas ).render();

    window.app = app;
    window.Shape = Shape;

});