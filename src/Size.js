define([
    "Shape/Consts"
], function( Consts ) {

    //
    var autosize = _.extend(
        function( axis, value ) {
            value || ( value = Consts.FITCONTENTS() );

            if ( value.name ) {
                value = autosize[ value.name ].call( this, axis, value );
            }

            return value;
        }, {
        FITCONTENTS: function( axis, value ) {
            var values = [
                    this.image_size()[ axis ],
                    this.text_size()[ axis ]
                ], 
                children = this.children(),
                size_fn = "size_" + axis,
                position_fn = "position_" + axis;
            
            // compute the occupying size (with position) of all children shapes
            for ( var i = 0 ; i < children.length ; i ++ ) {
                var child = children[ i ],
                    size = child[ size_fn ](),
                    position = child._position || {};

                // doesn't compute relative positioning as it's dependent
                // on the size of this shape. Instead, we'll only add the offset
                // contribution to the overall size
                if ( "number" == typeof position[ axis ] ) {
                    position = child[ position_fn ]();
                } else if ( "object" == typeof position[ axis ] ) {
                    position = Math.abs( child._position[ axis ].offset || 0 );
                } else {
                    position = 0;
                }
                values.push( size + position );
            }

            return _( values ).max() + ( value.offset || 0 );

        }
    });

    // a generic function generator for the size getters and setters
    var size_fn = function( axis ) {
        return function( value ) {
            this._size || ( this._size = {} );
            if ( 0 == arguments.length ) {
                // getter
                return autosize.call( this, axis, this._size[ axis ] );
            }

            if ( "undefined" == typeof value ) {
                return this;
            }

            if ( "function" == typeof value ) {
                value = value();
            }

            this._size[ axis ] = value;
            return this; 
        }
    }

    //
    return {
        _mixin_shape: true,
        _size: null,

        //
        size: function( size ) {
            if ( 0 == arguments.length ) {
                return {
                    x: this.size_x(),
                    y: this.size_y()
                }
            }

            return this.size_x( size.x )
                       .size_y( size.y );
        },

        //
        size_x: size_fn( "x" ),
        size_y: size_fn( "y" )

    }


});