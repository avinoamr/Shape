define([ "../libs/underscore" ], function() {

    _.extend( Shape.prototype, {

        //
        size: function( size ) {

            var ret = this._setget( '_size', arguments ) || { w: 0, h: 0 };
            ( ret != this ) && this.trigger( 'size', size );
            return ret;

        },

        //
        position: function( position ) {

            var ret = this._setget( '_position', arguments ) || { x: 0, y: 0 };
            ( ret != this ) && this.trigger( 'position', position );
            return ret;

        },

        //
        scale: function( scale ) {

            var ret = this._setget( '_scale', arguments ) || 1;
            ( ret != this ) && this.trigger( 'scale', scale );
            return ret;

        },

        // 
        rotation: function( rotation ) {

            var ret = this._setget( '_rotation', arguments ) || 0;
            ( ret != this ) && this.trigger( 'rotation', rotation );
            return ret;

        },

    });

});