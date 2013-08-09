
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
        background: "blue", 
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
        this.background( "green" );
    }).on( "mouse:out", function() {
        this.background( "blue" );
    })

    //
    var btn2 = new Shape({
        sid: "btn2",
        background: "blue", 
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
    }).on( "mouse:move", function() {
        console.log( this.sid, "MOVING" );
    });

    //
    var btn3 = new Shape({
        sid: "btn3",
        background: "blue", 
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
    }).on( "mouse:move", function() {
        this.background( "yellow" );
        console.log( this.sid, "MOVING" );
    });

    //
    var app = new Shape({
        sid: "app",
        size: { x: 500, y: 500 },
        children: [ btn1, btn2, btn3, label ]
    }).on( "mouse:move", function() {
        console.log( this.sid, "MOVING" );
    });

    app.canvas( canvas );

    var shape_capture = function( point ) {

        var position = this.position(),
            size = this.size();

        // translate the point to local shape coordinates
        point = {
            x: point.x - position.x,
            y: point.y - position.y
        };

        if ( point.x < 0 || point.y < 0 || point.x > size.x || point.y > size.y ) {

            if ( this._mouse_in ) {
                this._mouse_in = false;
                this.trigger( "mouse:out" );
            } else {
                return; // point isn't contained by this shape
            }
        }
        
        // check the children
        var children = this.children();
        for ( var i = 0 ; i < children.length ; i += 1 ) {
            shape_capture.call( children[ i ], point );
        }

        if ( !this._mouse_in ) {
            this._mouse_in = true;
            this.trigger( "mouse:in" );
        }

        this.trigger( "mouse:move" );
    };

    canvas.onmousemove = function( ev ) {
        var box = { top: 0, left: 0 };  
        if ( this.getBoundingClientRect ) {
            box = this.getBoundingClientRect();
        }

        var docElem = document.documentElement;
        box = {
            top: box.top + window.pageYOffset - docElem.clientTop,
            left: box.left + window.pageXOffset - docElem.clientLeft
        };

        var mouse = {
            x: ev.pageX - box.left,
            y: ev.pageY - box.top
        }

        shape_capture.call( app, mouse );
    };

    canvas.onmouseout = function( ev ) {
        console.log( "MOUSE OUT" );
        shape_capture.call( app, { x: -1, y: -1 }); // forces mouse:out events
    }

    Stats.monitor( app ).renderloop();

    window.app = app;
    window.Shape = Shape;

});