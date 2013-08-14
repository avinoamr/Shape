define([], function() {

    // consts are described as functions in order to maintain a state
    return {

        // positioning
        TOP: function( offset ) {
            return { name: "TOP", offset: offset || 0 };
        },

        BOTTOM: function( offset ) {
            return { name: "BOTTOM", offset: offset || 0 };
        },

        LEFT: function( offset ) {
            return { name: "LEFT", offset: offset || 0 };
        },

        RIGHT: function( offset ) {
            return { name: "RIGHT", offset: offset || 0 };
        },

        CENTER: function( offset ) {
            return { name: "CENTER", offset: offset || 0  };
        },

        // sizing
        FITCONTENTS: function( offset ) {
            return { name: "FITCONTENTS", offset: offset || 0 }
        }

    };

});