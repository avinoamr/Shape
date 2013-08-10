
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

    //
    var Btn = Shape.extend({
        constructor: function( label, settings ) {
            _( settings ).extend({
                background: "#3133A3",
                size: { x: Shape.FITCONTENTS( 15 ), y: Shape.FITCONTENTS( 15 ) },
                children: [
                    {
                        position: { x: 15, y: 5 },
                        text: {
                            content: label,
                            background: "white",
                            font: "22px Arial Black"
                        }
                    },
                    {
                        position: { x: 15, y: 35 },
                        text: {
                            content: "Don't click",
                            background: "white",
                            font: "10px Arial"
                        }
                    }
                ]
            });
            this._super( [ settings ] );
        }
    });

    //
    var app = new Shape({
        sid: "app",
        size: { x: 500, y: 500 },
        children: [
            new Btn( "Button 1", { position: { x: Shape.LEFT } } ),
            new Btn( "Button 2", { position: { x: Shape.CENTER } } ),
            new Btn( "Button 3", { position: { x: Shape.RIGHT } } )
        ]
    })

    app.canvas( canvas ).render();

    window.app = app;
    window.Shape = Shape;

});