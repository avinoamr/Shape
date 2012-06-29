define([

    "Shape/Class"

], function( Class ) {

    /**
     *
     *
     */
    var Visibility = Class.extend({

        //
        visibility: function( visibility ) {

            return this._setget( "_visibility", arguments, "visibility" ) || true;

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

    });

    return Visibility;

});