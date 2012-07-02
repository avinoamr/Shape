define([

    "Shape/Tween"

], function( Tween ) {


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

            // auto-play?
            if ( ( "undefined" == typeof this._playing ) && this._autoplay ) {
                this.play();
            }

            // no active animations, no need to proceed
            if ( !this._tween ) {
                return this;
            }

            var now = Date.now();
            ( !this._last_proceed ) && ( this._last_proceed = now );
            var elapsed = now - this._last_proceed;
            this._last_proceed = now;

            ( !this._playtime ) && ( this._playtime = 0 );

            if ( this._playing ) {
                this._playtime += elapsed;
                this._tween.update( this._playtime );
            }

            return this;

        },

        //
        loop: function( loop ) {

            return this._setget( "_loop", arguments, ( loop == true ) );

        },

        //
        autoplay: function( autoplay ) {

            return this._setget( "_autoplay", arguments, ( autoplay == true ) );

        },

        //
        play: function() {

            this._playing = true;
            ( "number" != typeof this._playtime ) && this.skip( 0 );
            return this;

        },

        // 
        stop: function() {

            this._playing = false;
            return this;

        },

        //
        skip: function( playtime ) {

            this._last_proceed = Date.now();
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
                prev = +frame_keys[ _.sortedIndex( frame_keys, playtime ) - 1 ];
                prev_frame = frames[ prev ];

            }

            // apply this previous frame
            apply_frame.call( this, prev_frame );

            // determine what is the next frame
            var next = +frame_keys[ _.sortedIndex( frame_keys, prev ) + 1 ];
            if ( !next ) {
                
                return ( this._loop ) ? this.skip( 0 ) : this;

            }
            var next_frame = frames[ next ];

            // create the tweens
            var that = this;

            this._tween = new Tween( _.clone( prev_frame ) );
            ( prev_frame.easing ) && ( this._tween.easing( prev_frame.easing ) );
            this._tween.target( next_frame );
            this._tween.duration( next - prev );
            this._tween.on( "update", apply_frame, this );
            this._tween.on( "complete", function() { 
                this.skip( next );
            }, this );
            this._tween.start( prev );

            // first update
            ( this._playing ) || this._tween.update( playtime );

            return this;
        },

        //
        rewind: function() {

            return this.skip( 0 );

        },



    };


});