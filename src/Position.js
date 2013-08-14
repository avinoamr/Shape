define([
    "Shape/Consts"
], function( Consts ) {

    //
    var autoposition = _.extend( 
        function( axis, value ) {
            value || ( value = 0 );

            if ( value.name ) {
                value = autoposition[ value.name ].call( this, axis, value );
            }

            return value;
        }, {
        REVERSE: function( axis, value ) {
            value = value.offset;
            var parent = this.parent();
            if ( !parent ) {
                return value;
            }

            var size_fn = "size_" + axis;
            value += parent[ size_fn ]() - this[ size_fn ]();
            return value;
        },
        TOP: function( axis, value ) {
            return value.offset;
        },
        LEFT: function( axis, value ) {
            return value.offset;
        },
        RIGHT: function( axis, value ) {
            return autoposition.REVERSE.call( this, "x", value );
        },
        BOTTOM: function( axis, value ) {
            return autoposition.REVERSE.call( this, "y", value );
        },
        CENTER: function( axis, value ) {
            value = value.offset;
            var parent = this.parent();
            if ( !parent ) {
                return value
            }

            var size_fn = "size_" + axis;
            value += ( parent[ size_fn ]() / 2 ) - ( this[ size_fn ]() / 2 );
            return value;
        }

    });


    // a generic function generator for the position getters and setters
    var position_fn = function( axis ) {
        return function( value ) {
            this._position || ( this._position = {} );
            if ( 0 == arguments.length ) {
                return autoposition.call( this, axis, this._position[ axis ] );
            }

            if ( "undefined" == typeof value ) {
                return this;
            }

            if ( "function" == typeof value ) {
                value = value();
            }

            this._position[ axis ] = value;
            return this;
        };
    }

    //
    return {
        _mixin_shape: true,
        _position: null,

        //
        position: function( position ) {
            if ( 0 == arguments.length ) {
                return {
                    x: this.position_x(),
                    y: this.position_y()
                }
            }

            return this.position_x( position.x )
                       .position_y( position.y );
        },

        //
        position_x: position_fn( "x" ),
        position_y: position_fn( "y" )

    };


});