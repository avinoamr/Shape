define([ "../libs/underscore" ], function() {

    _.extend( Shape.prototype, {

        //
        _visible: true,

        // 
        visible: function( visible ) {

            visible = ( true == visible );
            var ret = this._setget( '_visible', arguments, visible );
            ( ret == this ) && this.trigger( "visible", visible );
            return ret;

        },

        //
        show: function() {

            return this.visible( true );

        },

        //
        hide: function() {

            return this.visible( false );

        },

        //
        toggle: function() {

            return this.visible( !this.visible() );

        }

    });

});