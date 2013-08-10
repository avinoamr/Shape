
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
    var label = new Shape({
        sid: "label",
        position: { x: Shape.CENTER, y: Shape.CENTER },
        text: {
            content: "Click a Button",
            background: "white",
            font: "20px Arial Black"
        }
    });

    //
    var btn1 = new Shape({
        sid: "btn1",
        background: "#3133A3", 
        position: { x: Shape.LEFT },
        size: { x: 150, y: 40 },
        children: [
            {
                position: { x: Shape.CENTER, y: 5 },
                text: {
                    content: "Button 1",
                    background: "white",
                    font: "20px Arial Black"
                }
            }
        ]
    }).on( "mouse:in", function() {
        this.background( "#5556A3" );
    }).on( "mouse:out", function() {
        this.background( "#3133A3" );
    }).on( "mouse:click", function() {
        label.text( "Button 1 Clicked" );
    })

    //
    var btn2 = new Shape({
        sid: "btn2",
        background: "#3133A3", 
        position: { x: Shape.CENTER },
        size: { x: 150, y: 40 },
        children: [
            {
                position: { x: Shape.CENTER, y: 5 },
                text: {
                    content: "Button 2",
                    background: "white",
                    font: "20px Arial Black"
                }
            }
        ]
    }).on( "mouse:in", function() {
        this.background( "#5556A3" );
    }).on( "mouse:out", function() {
        this.background( "#3133A3" );
    }).on( "mouse:click", function() {
        label.text( "Button 2 Clicked" );
    })

    //
    var btn3 = new Shape({
        sid: "btn3",
        background: "#3133A3", 
        position: { x: Shape.RIGHT },
        size: { x: 150, y: 40 },
        children: [
            {
                position: { x: Shape.CENTER, y: 5 },
                text: {
                    content: "Button 3",
                    background: "white",
                    font: "20px Arial Black"
                }
            }
        ]
    }).on( "mouse:in", function() {
        this.background( "#5556A3" );
    }).on( "mouse:out", function() {
        this.background( "#3133A3" );
    }).on( "mouse:click", function() {
        label.text( "Button 3 Clicked" );
    })

    //
    var app = new Shape({
        sid: "app",
        size: { x: 500, y: 500 },
        children: [ btn1, btn2, btn3, label ]
    })

    app.canvas( canvas );
    Stats.monitor( app ).renderloop();

    window.app = app;
    window.Shape = Shape;

});