define([ "../libs/underscore", 
         "../src/TimelineAnimation", 
         "../src/Tween",
         "../src/Parameters",
         "../src/Events"

         ], function() {


    //
    _.extend(Shape.prototype, {

        //
        animation: function( animation ) {

            if ( 0 == arguments.length ) {
                return this._default( '_animation', {} )._animation;
            }

            if ( "number" == typeof +_.keys( animation )[ 0 ] ) {
                var animation = { "default": animation };
            }

            for ( var name in animation ) {
                ( animation[ name ] instanceof Shape.Animation ) || ( animation[ name ] = new Shape.Animation( animation[ name ] ) );
            }

            this._animation = animation;

        },

        // 
        play: function( name ) {

            name || ( name = "default" );
            this._animation[ name ].play( this );

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

    };



    var apply_state = function ( shape, state ) {

        for ( var name in state ) {
            debugger;
            shape[ name ].call( shape, state[ name ] );
        }

        return shape;

    };

    //
    Shape.Animation = Class.extend( Shape.Parameters, Shape.Events, {

        //
        constructor: function( timeline ) {

            this.timeline( timeline );

        },

        //
        timeline: function( timeline ) {

            if ( 0 == arguments.length ) {
                return this._timeline;
            }

            this._timeline = {};
            for ( var frame in timeline ) {
                this.frame( frame, timeline[ frame ] );
            }

            return this;

        },

        //
        frame: function( frame, state ) {

            if ( 1 == arguments.length ) {
                return this._timeline[ frame ];
            }

            this._default( 'timeline.' + frame, {} );
            this._timeline[ frame ] = state;
            return this;

        },

        loop: function( shape ) {

            this.play( shape ).on( "complete", function() {
                this.loop( shape );
            }, this );

        },

        // 
        play: function( shape, frame_id ) {
            
            frame_id || ( frame_id = 0 );
            var that = this;
            var timeline = this.timeline();
            var frames = _.map( _.keys( timeline ), function( frame ) { return +frame } );
            frames.sort();

            var frame = frames[ frame_id || 0 ];
            var state = timeline[ frame ];

            if ( 0 == frame ) {
                apply_state( shape, state );
                return this.play( shape, ++ frame_id );
            }

            var animate = shape.tween( frame );
            apply_state( animate, state );
            animate.on( "complete", function() {

                var next_frame = frames[ ++frame_id ];
                if ( next_frame ) {
                    that.play.apply( that, shape, frame_id );
                } else {
                    that.trigger( "complete" );
                }

            }).start();

            return this;

        }

    });

});