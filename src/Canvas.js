define([], function() {

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

    //
    var delegate_canvas_events = function( canvas ) {

        var events = [ "mousemove", "mousein", "mouseout", "click", "dblclick" ];
        var self = this;
        _( events ).each( function( eventname ) {
            canvas[ "on" + eventname ] = function() {
                if ( self[ "_on_canvas_" + eventname ] ) {
                    return self[ "_on_canvas_" + eventname ].apply( self, arguments );
                }   
            }
        });

    };

    return {

        _mixin_shape: true,

        //
        canvas: function( canvas ) {

            var ret = this._setget( '_canvas', arguments, canvas, "setcanvas" );

            if ( ret == this ) {
                delegate_canvas_events.apply( this, arguments );
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

        },

        //
        snapshot: function() {

            var canvas = this.canvas();
            if ( !canvas ) {
                var size = this.size();
                canvas = document.createElement( 'canvas' );
                canvas.width = size.x;
                canvas.height = size.y;
            }

            var image = canvas.toDataURL();

            return this.children([{
                image: image
            }]);

        }

    };

});