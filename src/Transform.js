define([

    "Shape/Class",
    "Shape/../libs/underscore"

], function( Class ) {
    
    /**
     *
     *
     */
    var Transform = Class.extend({

        //
        size: function( size ) {

            return this._setget( "_size", arguments, size, "size" )  || { x: 0, y: 0 };

        },

        //
        position: function( position ) {

            return this._setget( "_position", arguments, position, "position" ) || { x: 0, y: 0 };

        },

        // 
        rotation: function( rotation ) {

            return this._setget( "_rotation", arguments, rotation, "rotation" ) || 0;

        },

        //
        scale: function( scale ) {

            return this._setget( "_scale", arguments, scale, "scale" ) || null;

        }

    });

    return Transform;

});