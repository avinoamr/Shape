define([ "../libs/Class", "../libs/Tween", "../src/Events" ], function() {

    // 
    var wrap_method = function( method ) {

        var that = this,
            shape = that.shape(),
            time = that.time(),
            easing = that.easing();


        return function( target ) {

            // calculate the current and target values
            var current = _.clone( method.call( shape ) );
            _.isNumber( current ) && ( current = { 'value': current } );
            _.isNumber( target ) && ( target = { 'value': target } );

            //
            var tween = new TWEEN.Tween( current )
                .to( target, time )
                .easing( easing );

            //
            tween.onUpdate(function() {

                var value = ( "undefined" == typeof this[ 'value' ] ) ? this : this[ 'value' ];
                console.log( value );
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
                }

            });

            // add this tween to the list
            this._tweens.push( tween );
            return this;


        };

    };


    //
    Shape.Tween = Class.extend( Shape.Events, {

        //
        constructor: function( shape, time, easing ) {

            this._super( arguments );

            this._shape = shape;
            this._time = time;
            this._easing = easing;
            this._tweens = [];

            shape.on( "update", this.update, this );

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
        time: function() {

            return this._time;

        },

        //
        easing: function() {

            return this._easing || TWEEN.Easing.Linear.None;

        },

        //
        update: function() {

            _.invoke( this._tweens, 'update', [ Date.now() ] );

        },

        //
        start: function() {

            _.invoke( this._tweens, 'start' );
            return this;

        }


    });

});