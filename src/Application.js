define([ "../libs/underscore.js" ], function() {
    

    _.extend( Shape.prototype, {

        // sets or returns the canvas element
        // lookup the scene tree to find it
        canvas: function( canvas ) {

            var canvas = this._setget( '_canvas', arguments );

            var parent;
            if ( !canvas && ( parent = this.parent() ) ) {
                canvas = parent.canvas();
            }

            return canvas;

        },

        // sets or returns the context object
        // lookup the scene tree to find it
        context: function( context ) {

            var context = this._setget( '_context', arguments );
            
            var parent;
            if ( !context && ( parent = this.parent() ) ) {
                context = parent.context();
            }

            return context;

        },

        on_size_canvas: function() {

            var canvas = this.canvas();
            var size = this.size();
            canvas.width = size.w;
            canvas.height = size.h;

            return this.trigger( "canvas_resize" );

        },

        //
        // Available settings:
        //  canvas: the canvas DOM element
        //  container: a DOM element to contain the canvas element (only relevant if no canvas was supplied, and will therefor be automatically created)
        //  render: automatically render this Shape upon start
        //  render_loop: automatically start the render loop upon start
        start: function( settings ) {

            settings || ( settings = {} );

            // use the canvas, or create one
            var canvas = settings.canvas;
            if ( !canvas ) {
                canvas = document.createElement( 'canvas' );
                canvas.style.display = "block";

                var container = settings.container || document.getElementsByTagName( 'body' )[ 0 ];
                container.appendChild( canvas );
            }

            var context = canvas.getContext( '2d' );
            this.canvas( canvas )
                .context( context )
                .on_size_canvas()
                .on( "size", this.on_size_canvas, this );

            // auto render
            if ( settings.render ) {
                this.render();
            } else if ( settings.render_loop ) {
                this.render_loop();
            }

            return this;
        }

    });

});