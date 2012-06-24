define([ "../libs/underscore", "../src/TimelineAnimation", "../src/Tween" ], function() {


    //
    _.extend(Shape.prototype, {

        //
        animations: function() {

            return this._setget( '_animations', arguments );

        },

        //
        animations_add: function( name, animation ) {

        },

        //
        animations_remove: function( name ) {

        },

        // 
        play: function( name ) {

        },

        //
        stop: function() {

        },

        //
        tween: function( time, easing ) {

            return new Shape.Tween( this, time, easing );

        }

    });


    // mark methods as animatable
    Shape.animatable = function( func ) {

        func.animatable = true;
        return func;

    }

});