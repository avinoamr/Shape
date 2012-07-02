
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
    var app = new Shape({
        canvas: canvas,
        size: { x: 400, y: 200 },
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
                            x: 0, 
                            y: 0 
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
                            x: 200, 
                            y: 0 
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
                            x: 0
                        }
                    }
                },
                code: function() {
                    console.log( 'on 2000' );
                }
            }
        }
    });

    //
    Stats.monitor( app ).renderloop();

    window.app = app;
    window.Shape = Shape;

});