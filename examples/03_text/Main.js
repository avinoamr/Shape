
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
        //size: { x: 600, y: 300 },
        text: {
            content: "Shape",
            background: "white",
            border: "orange",
            font: "50px GoodDogRegular"
        },
    });

    app.canvas( canvas ).render();

    // on some browsers the above won't render the text because the font is being lazy-loaded whenever it's used. So, this render() will only
    // invoke the lazy-loading, but the font won't be ready in time. This is a work-around for now.
    Shape.in( 1000, function() {
        this.render();
    }, app )

    window.app = app;
    window.Shape = Shape;

});