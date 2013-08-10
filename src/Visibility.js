define([], function() {

    /**
     *
     *
     */
    return {

        _mixin_shape: true,
        _visibility: true,

        //
        visibility: function( visibility ) {
            return this._setget( "_visibility", arguments, visibility, "visibility" );
        },

        //
        show: function() {
            return this.visibility( true );
        },

        //
        hide: function() {
            return this.visibility( false );
        },

        //
        toggle: function() {
            return this.visibility( !this.visibility() );
        }

    };

});