define([

    "Shape/Class",
    "Shape/Transform",
    "Shape/Style",
    "Shape/Visibility",
    "Shape/Image",
    "Shape/Canvas",
    "Shape/Tree"

], function( Class, Transform, Style, Visibility, ShapeImage, Canvas, Tree ) {

    //
    var render = function( context ) {

        context.save();

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
        if ( null !== background ) {
            context.fillStyle = background;
            context.fillRect( 0, 0, size.x, size.y );
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


        context.restore();

        return this;

    };

    /**
     *
     *
     */
    var Render = Class.extend( Transform, Style, Visibility, Canvas, Tree, ShapeImage, {

        //
        render: function() {

            //
            if ( !this.visibility() || 0 == this.alpha() ) {
                return this;
            }

            // notify listeners that we're about to render
            this.trigger( "render" );

            // render to all contexts
            var contexts = this.lookup( 'context' );
            for ( var i = 0 ; i < contexts.length ; i ++ ) {
                render.call( this, contexts[ i ] );
            }

            // render children
            

            return this;

        }

    });

    return Render;

});