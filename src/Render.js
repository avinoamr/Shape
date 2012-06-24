define([ "../libs/underscore", "../libs/rAF.js" ], function() {
   
    _.extend( Shape.prototype, {

        //
        update: function() {
            
            this.trigger( "update" );
            _.invoke( this.children(), "update" );
            return this;
            
        },

        // 
        _render_this: function( context ) {

            return this;

        },

        //
        render: function( context ) {

            // don't render further if the shape is invisible (through visibility or alpha)
            // note that a side-effect of this is that render events or behavior will not be triggered
            // on this Shape of its children. This is fine, because a good practice is to decouple
            // logic or other non-render behavior for the render process. 
            if ( !this.visible() || 0 == this.alpha() ) {
                return this;
            }

            // retrieve the context
            context || ( context = this.context() );

            // save the current state of the context
            context.save();

            var size = this.size();
            context.clearRect( 0, 0, size.w, size.h );

            // plugins to run before the render
            this.trigger( "render:before", context );

            // placeholder for allowing sub-classes to easily add render logic
            this._render_this( context );

            // render children
            _.invoke( this.children(), 'render', context );

            // plugins to run after the render
            this.trigger( "render:after", context );

            // restore the previous state of the context
            context.restore();

            return this;

        },

        //
        render_loop: function() {

            var that = this;

            (function() {

                requestAnimationFrame( arguments.callee );
                that.update();
                that.render();

            })();

            return this;

        }

    });

});