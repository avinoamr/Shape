define([

    "Shape/Class"

], function( Class ) {

    // http://alienryderflex.com/polygon/
    var MouseRect = Class.extend({

        //
        constructor: function( canvas, coords ) {

            this.canvas = canvas;
            this.coords = coords;

        },

        //
        in: function( point ) {

            return ( point.x >= this.coords[ 0 ] && point.y >= this.coords[ 1 ] && point.x <= this.coords[ 2 ] && point.y <= this.coords[ 3 ] );

        }

    });

});