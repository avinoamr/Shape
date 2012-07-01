define([

    "Shape/Events",
    "Shape/Parameters",
    "Shape/../libs/Class"

], function( Events, Parameters ) {
   
    /**
     *
     *
     */
    return Class.extend( Events, Parameters, {

        //
        _setget: function( parameter, args, value, event_name ) {

            var changed = this[ parameter ] != ( value || args[ 0 ] );
            var ret = this._super( arguments );
            ( ret == this && event_name && changed ) && this.trigger( event_name );
            return ret;

        },

        //
        assert: function( condition, error ) {

            if ( !condition ) {
                throw ( error );
            }
            return this;

        },

        //
        apply: function( parameters ) {

            for ( var parameter in parameters ) {
                if ( this[ parameter ] && "function" == typeof this[ parameter ] ) {
                    this[ parameter ].call( this, parameters[ parameter ] );
                }
            }
            return this;

        }

    });

});