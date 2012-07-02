
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
    var anim = new Shape({
        size: { x: 260, y: 20 },
        children: [{
            sid: 'ball',
            autosize: false,
            image: 'ball.png',
            size: { x: 20, y: 20 }
        }],

        autoplay: true,
        loop: true,

        frames: {
            0: { 
                children: { 
                    'ball': { 
                        position: { 
                            x: 20, 
                        } 
                    } 
                }, 
                easing: TWEEN.Easing.Back.InOut,
                code: function() {
                    console.log( 'on 0' );
                }
            },

            1000: { 
                children: { 
                    'ball': { 
                        position: { 
                            x: 220, 
                        } 
                    } 
                },
                easing: TWEEN.Easing.Back.InOut,
                code: function() {
                    console.log( 'on 1000' );
                }
            },

            2000: {
                children: {
                    'ball': {
                        position: {
                            x: 20
                        }
                    }
                },
                code: function() {
                    console.log( 'on 2000' );
                }
            }
        }
    });

    var app = new Shape({
        canvas: canvas,
        size: { x: 400, y: 200 },
        children: [ anim ]
    });

    anim.position({ x: Shape.CENTER, y: Shape.CENTER });

    //
    Stats.monitor( app ).renderloop();

    window.app = app;
    window.Shape = Shape;

});