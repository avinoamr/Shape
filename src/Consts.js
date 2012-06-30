define([

    "Shape/../libs/underscore"

], function() {

    return {

        // positioning
        TOP: function( offset ) {
            return { name: "TOP", offset: offset };
        },

        BOTTOM: function( offset ) {
            return { name: "BOTTOM", offset: offset };
        },

        LEFT: function( offset ) {
            return { name: "LEFT", offset: offset };
        },

        RIGHT: function( offset ) {
            return { name: "RIGHT", offset: offset };
        },

        CENTER: function( offset ) {
            return { name: "CENTER", offset: offset };
        },

    };

});