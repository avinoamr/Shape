define([

    "Shape/Consts",
    "Shape/../libs/underscore"

], function( Consts ) {
    
    // auto-positioning
    var autoposition = function( position, parameter, modifiers ) {

        var value = position[ parameter ], divider;
        ( "function" == typeof value ) && ( value = value() );
        ( value.name == modifiers[ 0 ]().name ) && ( value = 0 );
        ( value.name == modifiers[ 1 ]().name ) && ( divider = 1 );
        ( value.name == modifiers[ 2 ]().name ) && ( divider = 2 );

        var offset = value.offset || 0;
        if ( divider ) {
            var parent = this.parent();
            this.assert( parent, "Orphan Shapes can't use Shape.BOTTOM, Shape.RIGHT or Shape.CENTER. Assign it to a parent first." );
            value = parent.size()[ parameter ] / divider - this.size()[ parameter ] / divider;
        }
        value += offset;
        return value;

    };

    /**
     *
     *
     */
    return {

        _mixin_shape: true,

        //
        size: function( size ) {

            return this._setget( "_size", arguments, size, "size" )  || { x: 0, y: 0 };

        },

        //
        position: function( position ) {

            var defaults = { x: 0, y: 0 };
            if ( 0 != arguments.length ) {

                this._defaults({ _size: defaults } );
                _.defaults( position, { x: this._size.x, y: this._size.y } );

                // auto positioning
                position.x = autoposition.call( this, position, "x", [ Consts.LEFT, Consts.RIGHT, Consts.CENTER ]);
                position.y = autoposition.call( this, position, "y", [ Consts.TOP, Consts.BOTTOM, Consts.CENTER ]);
            }

            return this._setget( "_position", arguments, position, "position" ) || defaults;

        },

        // 
        rotation: function( rotation ) {

            return this._setget( "_rotation", arguments, rotation, "rotation" ) || 0;

        },

        //
        scale: function( scale ) {

            return this._setget( "_scale", arguments, scale, "scale" ) || null;

        }

    };

});