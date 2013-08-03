define([], function() {

    /**
     *
     *
     */
    return {

        _mixin_shape: true,

        //
        alpha: function( alpha ) {

            return this._setget( "_alpha", arguments, alpha, "alpha" );

        },

        //
        background: function( background ) {

            return this._setget( "_background", arguments, background, "background" );

        },

        //
        border: function( border ) {
            if ( !_( border ).isObject() ) {
                border = {
                    color: border
                }
            }
            return this._setget( "_border", arguments, border, "border" );

        }

    };

});