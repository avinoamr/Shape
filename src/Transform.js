define([ "../libs/underscore", "../src/Animation" ], function() {

    //
    Shape.FIT_TO_IMAGE = "to_image";
    Shape.FIT_TO_TEXT = "to_text";

    //
    var on_render_before = function( context ) {

        var position = this.position();
        if ( position ) {
            context.translate( position.x, position.y );
        }

        var rotation = this.rotation();
        if ( rotation ) {
            context.rotate( rotation );
        }
        

    };

    //
    _.extend( Shape.prototype, {

        //
        size: Shape.animatable(function( size ) {

            var ret = this._setget( '_size', arguments ) || { w: 0, h: 0 };
            ( ret == this ) && this.trigger( 'size', size );
            return ret;

        }),

        //
        position: Shape.animatable(function( position ) {

            var ret = this._setget( '_position', arguments ) || { x: 0, y: 0 };
            ( ret == this ) && this.trigger( 'position', position );
            return ret;

        }),

        //
        scale: Shape.animatable(function( scale ) {

            var ret = this._setget( '_scale', arguments ) || 1;
            ( ret == this ) && this.trigger( 'scale', scale );
            return ret;

        }),

        // 
        rotation: Shape.animatable(function( rotation ) {

            var ret = this._setget( '_rotation', arguments ) || 0;
            ( ret == this ) && this.trigger( 'rotation', rotation );
            return ret;

        }),

        //
        fit: function() {

            return this._setget( '_fit', arguments );

        }

    });


    // 
    Shape.on( "create", function( shape ) {

        shape.on( "render:before", on_render_before, shape, -40 );

    });

});