define([
    "Shape/Consts",
], function( Consts ) {

    /**
     *
     *
     */
    return {

        _mixin_shape: true,     

        // 
        rotation: function( rotation ) {

            return this._setget( "_rotation", arguments, rotation, "rotation" ) || 0;

        },

        //
        scale: function( scale ) {

            return this._setget( "_scale", arguments, scale, "scale" ) || null;

        },

    };

});