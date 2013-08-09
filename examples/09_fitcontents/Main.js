
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

    var canvas = document.createElement( 'canvas' );
    document.body.appendChild( canvas );

    var ready = 0;
    var img1 = new Shape({
        image: "ball.png",
        size: { x: 50, y: 50 },
        autosize: false
    }).on( "image:ready", function() {
        if ( ++ready == 2 ) {
            this.root().render();
        }
    });

    var img2 = new Shape({
        image: "ball.png",
        size: { x: 50, y: 50 },
        position: { x: 200, y: 200 },
        autosize: false
    }).on( "image:ready", function() {
        if ( ++ready == 2 ) {
            this.root().render();
        }
    });

    //
    var container = new Shape({
        children: [ img1, img2 ],
        border: "red",
        size: { x: Shape.FITCONTENTS, y: Shape.FITCONTENTS }
    });

    var app = new Shape({
        children: [ container ],
        size: { x: 500, y: 500 }
    })

    app.canvas( canvas );

    window.app = app;
    window.Shape = Shape;

});