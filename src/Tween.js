define([ "../libs/Class", "../libs/Tween", "../src/Events" ], function() {


    // mix-in the tween-related methods to the Shape class
    _.extend(Shape.prototype, {

        //
        tween: function( duration, easing ) {

            return new Shape.Tween( this, duration, easing );

        }

    });

    // 
    var wrap_method = function( method ) {

        var that = this,
            shape = that.shape(),
            duration = that.duration(),
            easing = that.easing();


        return function( target ) {

            // calculate the current and target values
            var current = _.clone( method.call( shape ) );
            _.isNumber( current ) && ( current = { 'value': current } );
            _.isNumber( target ) && ( target = { 'value': target } );

            //
            var tween = new TWEEN.Tween( current )
                .to( target, duration )
                .easing( easing );

            //
            tween.onUpdate(function() {

                var value = ( "undefined" == typeof this[ 'value' ] ) ? this : this[ 'value' ];
                method.apply( shape, [ value ] );

            });

            //
            tween.onComplete(function() {

                // remove this tween from the animation
                _.each( that._tweens, function( i_tween, i) {

                    if ( tween == i_tween ) {
                        that._tweens.splice( i, 1 );
                    }

                });

                // notify listeners that this animate object is complete
                if ( 0 == that._tweens.length ) {
                    that.trigger( "complete" );
                    shape.off( "update", that.update, that );
                }

            });

            // add this tween to the list
            this._tweens.push( tween );
            return this;


        };

    };


    //
    Shape.Tween = Shape.Class.extend({

        //
        constructor: function( shape, duration, easing ) {

            this._super( arguments );

            this._shape = shape;
            this._duration = duration;
            this._easing = easing;
            this._tweens = [];

            this._lastupdate = 0;
            this._playtime = null;
            this._playing = null; // null indicates that this tween was never played for the first time
            this._started = false;

            this.shape().on( "update", this.update, this );

            //
            for ( var name in shape ) {

                var value = shape[ name ];
                if ( "function" == typeof( value ) && true == value.animatable ) {
                    this[ name ] = wrap_method.call( this, value );
                }

            }

        },

        // 
        shape: function() {

            return this._shape;

        },

        //
        duration: function() {

            return this._duration;

        },

        //
        easing: function() {

            return this._easing || TWEEN.Easing.Linear.None;

        },

        //
        update: function( force_play ) {

            var now = Date.now();
            var elapsed = ( this._lastupdate ) ? now - this._lastupdate : 0;
            this._lastupdate = now;

            if ( this._playing || force_play ) {
                this._playtime += elapsed;
                _.invoke( this._tweens, 'update', [ this._playtime ] );
            }

        },

        //
        rewind: function() {

            this._playtime && ( this._playtime = 0 );
            return this;

        },

        //
        skip: function( to ) {

            this._playtime = to;
            this._start().update( true );
            return this;

        },

        //
        _start: function() {

            if ( null === this._playing ) {
                this._playing = false;
                _.invoke( this._tweens, 'start', [ 0 ] );
            }
            return this;

        },

        //
        play: function() {

            if ( !this._playing ) {

                this._start();
                this._playing = true;

            }

            return this;

        },

        stop: function() {

            if ( this._playing ) {
                this._playing = false;
            }

            return this;

        }

    });

});