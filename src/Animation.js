define([ "../libs/underscore",  
         "../src/Class",
         "../src/Tween",
         "../src/Parameters",
         "../src/Events"

         ], function() {


    // mix-in the animation-related methods to the Shape class
    _.extend(Shape.prototype, {

        // set or return the animations-set of this Shape
        // An animation set is an array of animation names and their animation properties (as used by the Animation class)
        // if the animation argument is a string, the relevant animation will be returned
        animation: function( animation ) {

            this._default( '_animation', {} );
            if ( 0 == arguments.length ) {
                return this._animation;
            } else if ( "string" == typeof animation ) {
                return this._animation[ animation ] || null; // return the animation instance
            }

            for ( var name in animation ) {
                ( animation[ name ] instanceof Shape.Animation ) || ( animation[ name ] = new Shape.Animation( this, animation[ name ] ) );
            }

            this._animation = animation;

        },

    });


    // mark methods as animatable
    Shape.animatable = function( func ) {

        func.animatable = true;
        return func;

    };

    // utility boolean function that determines if a number n is between (inclusive) two other numbers: n1 and n2
    // TODO: move this into a utility class?
    var between = function( n, n1, n2 ) {
        return ( n >= n1 && n <= n2 ) || ( n <= n1 && n >= n2 );
    };

    //
    Shape.Animation = Shape.Class.extend({

        //
        constructor: function( shape, settings ) {
            this._super( arguments );

            settings || ( settings = {} );

            this._playing = null;
            this._tween = null;

            this._shape = shape;
            this.timeline( settings.timeline );

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

            this._default( 'timeline.' + frame, {} )
                ._timeline[ +frame ] = state;

            return this;

        },

        // 
        rewind: function() {

            return this.skip( 0 );

        },

        // 
        skip: function( to ) {

            // find the relevant timeline frame
            var timeline = this.timeline();
            var prev, next;
            var keys = _.map( _.keys( timeline ), function( key ) { return +key } ).sort();
            for ( var i = 0 ; i < keys.length - 1 ; i ++ ) {
                if ( to == keys[ i + 1 ] ) {
                    prev = keys[ i + 1 ];
                    next = keys[ i + 2 ];
                    break;
                } else if ( to >= keys[ i ] && to < keys[ i + 1 ] ) {
                    prev = keys[ i ];
                    next = keys[ i + 1 ];
                    break;
                }
            }

            // set the shape's state to the previous frame
            var prev_frame = timeline[ prev ];
            this._shape.apply_methods( prev_frame );

            // execute code
            if ( to == prev && prev_frame.code ) {
                prev_frame.code.apply( this );
            }

            // tween to the next frame
            if ( !next ) {
                this.trigger( "complete" );
                return this;
            }

            var next_frame = timeline[ next ];
            var tween = this._shape.tween( next - prev );
            tween.apply_methods( next_frame );
            tween.skip( to - prev );
            
            if ( this._playing ) {
                tween.play();
            }

            tween.on( "complete", function() {
                this.skip( next );
            }, this );

            this._tween = tween;

            return this;

        },

        //
        stop: function() {

            this._playing = false;
            ( this._tween ) && this._tween.stop();
            return this;

        },

        // 
        play: function() {
            
            ( this._playing == null ) && this.rewind();
            this._playing = true;
            ( this._tween ) && this._tween.play();
            return this;

        }

    });

});