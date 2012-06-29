define([

    "Shape/Class"

], function( Class ) {

    //
    var on_resize = function() {

        var size;
        if ( this.size && ( size = this.size() ) ) {
            var canvas = this.canvas();
            canvas.width = size.x;
            canvas.height = size.y;
        }
        return this;

    };

    var Canvas = Class.extend({

        //
        canvas: function( canvas ) {

            var ret = this._setget( '_canvas', arguments );

            if ( ret == this ) {
                on_resize.apply( this ).on_once( "size", on_resize, this );
            }

            return ret;

        },

        //
        context: function() {

            var context = this._setget( '_context', arguments );
            var canvas;
            if ( !context && ( canvas = this.canvas() ) ) {
                context = canvas.getContext( '2d' );
                this.context( context );
            }

            return context;

        }

    });

    return Canvas;

});