define([

    "Shape/Class",
    "Shape/Utils",
    "Shape/Consts",
    "Shape/Transform",
    "Shape/Canvas",
    "Shape/Image",
    "Shape/Text",
    "Shape/Style",
    "Shape/Visibility",
    "Shape/Animation",
    "Shape/Tree",
    "Shape/Render",

], function( Class, Utils, Consts ) {

    /**
     * Shape
     * 
     */
    var Shape = {

        //
        sid: null,

        //
        constructor: function( settings ) {

            // shape id
            settings || ( settings = {} );
            var sid_prefix = settings.sid_prefix || "Shape_";
            this.sid = settings.sid || sid_prefix + ( ++ Shape._uniqid );
            this.apply( settings );
        }

    };

    // mix-in the other Shape behavior
    for ( var i = 0 ; i < arguments.length ; i ++ ) {
        var mixin = arguments[ i ];
        if ( mixin && mixin._mixin_shape ) {
            _.extend( Shape, mixin );
        }
    }
    delete Shape._mixin_shape;

    // 
    Shape = Class.extend( Shape );
    
    // attach external functionality
    _.extend( Shape, Utils, Consts, {
        _uniqid: 0
    });
    
    return Shape;

});

