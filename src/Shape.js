/**
 * 
 * 
 *  
 * 
 */
define([

    "Shape/Render"

], 

function( Render ) {

    /**
     * Shape
     * 
     *
     */
    var Shape = Render.extend({

        //
        sid: null,

        //
        constructor: function( settings ) {

            // shape id
            var sid_prefix = settings.sid_prefix || "Shape_";
            this.sid = settings.sid || sid_prefix + ( ++ Shape._uniqid );

            this.apply( settings );
        }

    });

    //
    Shape._uniqid = 0;
    
    return Shape;

});

