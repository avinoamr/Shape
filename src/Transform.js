define([
    "Shape/Consts",
], function( Consts ) {
    
    // auto-positioning
    var autoposition = function( position, parameter ) {

        var modifiers = {
            "x": [ Consts.LEFT, Consts.RIGHT, Consts.CENTER ],
            "y": [ Consts.TOP, Consts.BOTTOM, Consts.CENTER ]
        }[ parameter ];

        var value = position[ parameter ], divider;
        ( _( value ).isFunction() ) && ( value = value() );
        ( value.name == modifiers[ 0 ]().name ) && ( value = 0 );
        ( value.name == modifiers[ 1 ]().name ) && ( divider = 1 );
        ( value.name == modifiers[ 2 ]().name ) && ( divider = 2 );

        var offset = value.offset || 0;
        if ( divider ) {
            var parent = this.parent();
            this.assert( parent, "Orphan Shapes can't use relative positioning. Assign it to a parent first." );
            this.assert( !parent._size || _( parent._size[ parameter ] ).isNumber(), "Cannot apply autopositioning when the parent Shape uses autosizing" );
            value = ( parent.size()[ parameter ] / divider ) - ( this.size()[ parameter ] / divider );
        }
        value += offset;
        return value;

    };

    // auto-sizing
    var autosize = function( size, parameter ) {
        var value = size[ parameter ];
        ( _( value ).isFunction() ) && ( value = value() );

        if ( value.name == Consts.FITCONTENTS().name ) {
            var offset = value.offset || 0,
                children = this.children();

            value = this.image_size()[ parameter ];
            for ( var i = 0 ; i < children.length ; i += 1 ) {
                var child_position = children[ i ].position()[ parameter ]
                var child_size = children[ i ].size()[ parameter ];
                value = _.max( [ value, child_position + child_size ] );
            }

            value += offset;
        }

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

            var defaults = { x: 0, y: 0 };
            if ( 0 != arguments.length ) {

                size = _.clone( size );
                this._defaults({ _size: defaults });
                _.defaults( size, { x: this._size.x, y: this._size.y } );
            }

            var rv = this._setget( "_size", arguments, size, "size" ) || defaults;

            // apply the auto-sizing
            if ( !_( rv.x ).isUndefined() && !_( rv.y ).isUndefined() ) {
                rv = _( rv ).clone();
                rv.x = autosize.call( this, rv, "x" );
                rv.y = autosize.call( this, rv, "y" );
            }

            return rv;

        },

        //
        position: function( position ) {

            var defaults = { x: 0, y: 0 };
            if ( 0 != arguments.length ) {

                position = _.clone( position );
                this._defaults({ _position: defaults } );
                _.defaults( position, { x: this._position.x, y: this._position.y } );
            }

            var rv = this._setget( "_position", arguments, position, "position" ) || defaults;

            // apply the auto-positioning
            if ( !_( rv.x ).isUndefined() && !_( rv.y ).isUndefined() ) {
                rv = _( rv ).clone();
                rv.x = autoposition.call( this, rv, "x" );
                rv.y = autoposition.call( this, rv, "y" );
            }

            return rv;

        },

        // 
        rotation: function( rotation ) {

            return this._setget( "_rotation", arguments, rotation, "rotation" ) || 0;

        },

        //
        scale: function( scale ) {

            return this._setget( "_scale", arguments, scale, "scale" ) || null;

        },

        //
        autosize: function( autosize ) {

            var ret = this._setget( "_autosize", arguments, ( autosize == true ), "autosize" );
            ( "undefined" == typeof ret ) && ( ret = true );
            return ret;

        }

    };

});