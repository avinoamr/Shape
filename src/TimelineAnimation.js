define([ "../libs/Class", "../src/Events", "../src/Tween" ], function() {


    //
    Shape.TimelineAnimation = Class.extend( Shape.Events, {

        //
        constructor: function( shape, timeline ) {

            this._super( arguments );

            this._shape = shape;
            this._timeline = timeline;

        },

        //
        shape: function() {

            return this._shape;

        },

        //
        timeline: function() {

            return this._timeline;

        },

        //
        play: function() {

        },

        // 
        stop: function() {

        }

    });

});