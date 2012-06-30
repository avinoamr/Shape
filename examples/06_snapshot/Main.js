
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
        size: { x: 400, y: 200 }
    });

    app.render();

    // 
    var count_children = function() {
        document.getElementById( 'count' ).innerHTML = "Count: " + app.children().length;
    };

    window.count_children = count_children;

    // add child
    document.getElementById( 'add' ).addEventListener( 'click', function() {

        app.add({
            size: { x: 10, y: 10 },
            position: {
                x: Math.floor( Math.random() * 390 ),
                y: Math.floor( Math.random() * 190 )
            },
            background: [ "yellow", "red", "blue", "green" ][ Math.floor( Math.random() * 4 ) ]
        });
        app.render();
        count_children();
    });

    var rerender = function() {
        this.render();
    };

    // snapshot
    document.getElementById( 'snapshot' ).addEventListener( 'click', function() {
        app.snapshot();
        app.children()[ 0 ].on_once( "image:ready", rerender, app );
        count_children();
    });

    window.app = app;
    window.Shape = Shape;

});