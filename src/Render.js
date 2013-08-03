define([

    //"Shape/../libs/rAF"

], function() {

    //
    var render = function( context ) {

        // clear the canvas (if this node is attached to it directly)
        var size = this.size();
        if ( this.canvas() == context.canvas ) {
            context.clearRect( 0, 0, size.x, size.y );
        }

        // transforms
        var position = this.position();
        if ( position ) {
            context.translate( position.x, position.y );
        }

        var rotation = this.rotation();
        if ( rotation ) {
            context.rotate( rotation );
        }

        var scale = this.scale();
        if ( scale ) {
            context.scale( scale.x, scale.y );
        }

        // alpha
        context.globalAlpha *= this.alpha();

        // background
        var background = this.background();
        if ( background ) {
            context.fillStyle = background;
            context.fillRect( 0, 0, size.x, size.y );
        }

        // image
        var image = this.image();
        if ( image ) {
            var size = this.size();
            context.drawImage( image.content, 0, 0, size.x, size.y );
        }

        // text
        var text = this.text();
        if ( text ) {
            context.font = text.font;
            context.textBaseline = 'top';
            if ( text.background ) {
                context.fillStyle = text.background;
                context.fillText( text.content, 0, 0 );
            }
            if ( text.border ) {
                context.strokeStyle = text.border;
                context.strokeText( text.content, 0, 0 );
            }
        }

        // border
        var border = this.border();
        if ( border ) {
            var size = this.size();
            context.strokeStyle = border;
            context.beginPath();
            context.rect( 0, 0, size.x - 1, size.y - 1 );
            context.stroke();
            context.closePath();
        }

        return this;

    };

    /**
     *
     *
     */
    return {

        _mixin_shape: true,

        _renderloop: true,

        //
        render: function( contexts ) {

            //
            if ( !this.visibility() || 0 == this.alpha() ) {
                return this;
            }

            // update the animation
            this.proceed();

            // notify listeners that we're about to render
            this.trigger( "render" );

            // render to all contexts
            if ( !contexts ) {
                contexts = this.lookup( 'context' );
            }
            for ( var i = 0 ; i < contexts.length ; i ++ ) {
                contexts[ i ].save();
                render.call( this, contexts[ i ] );
            }

            // render children
            var children = this.children();
            var args = ( 0 == arguments.length ) ? [] : [ contexts ]; 
            for ( var i = 0 ; i < children.length ; i ++ ) {
                var child = children[ i ];
                child.render.apply( child, args );
            }

            for ( var i = 0 ; i < contexts.length ; i ++ ) {
                contexts[ i ].restore();
            }

            return this;

        },

        //
        renderloop: function( enable ) {

            this._renderloop = ( "undefined" == typeof enable ) ? true : ( enable == true );

            var that = this;
            (function() {

                if ( that._renderloop ) {
                    requestAnimationFrame( arguments.callee );
                    that.render();
                }

            })();

            return this;

        }

    };

});