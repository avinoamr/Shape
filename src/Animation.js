define([

    "Shape/../libs/Tween"

], function() {


    //
    var apply_frame = function( frame ) {

        this.apply( frame );

        return this;
    };
   
    /**
     *
     *
     *
     */
    return {

        _mixin_shape: true,

        //
        frames: function() {

            return this._setget( "_frames", arguments, arguments[ 0 ], "frames" );

        },

        //
        proceed: function() {

            // no active animations, no need to proceed
            if ( !this._tween ) {
                return this;
            }

            var now = Date.now();
            ( !this._last_proceed ) && ( this._last_proceed = now );
            var elapsed = this._last_proceed - now;
            this._last_proceed = now;



            return this;

        },

        //
        play: function() {

            return this;

        },

        // 
        stop: function() {

            return this;

        },

        //
        skip: function( playtime ) {

            this._playtime = playtime;
            delete this._tween;

            // frames
            var frames = this.frames();
            if ( !frames ) {
                return this;
            }
            var frame_keys = _.keys( frames ).sort( function( a, b ) { return a - b; } );

            // previous frame
            var prev, prev_frame;
            if ( frames[ playtime ] ) {

                // found the exact frame
                prev = playtime;
                prev_frame = frames[ playtime ];
                if ( prev_frame.code ) {
                    prev_frame.code.apply( this );
                }

            } else {

                // determine what is the previous frame
                prev = frame_keys[ _.sortedIndex( frame_keys, playtime ) - 1 ];
                prev_frame = frames[ prev ];

            }

            // apply this previous frame
            apply_frame.call( this, prev_frame );

            // determine what is the next frame
            var next = frame_keys[ _.sortedIndex( frame_keys, prev ) + 1 ];
            if ( !next ) {
                return; 
            }
            var next_frame = frames[ next ];

            // create the tween
            console.log( prev_frame, next_frame );
            debugger;
            this._tween = new TWEEN.Tween( _.clone( prev_frame ) )
                .to( _.clone( next_frame ), next - prev )
                .onUpdate(function() {
                    console.log( "update", this );
                })
                .onComplete(function() {

                })
                .start( prev )
                .update( playtime );

            return this;
        },

        //
        rewind: function() {

        },



    };


});