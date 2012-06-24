define([ "../libs/underscore", "../src/Animation" ], function() {

    //
    var on_render_before = function( context ) {
        
        // apply alpha
        context.globalAlpha *= this.alpha();

        // apply background
        var background = this.background();
        if ( null !== background ) {
            var size = this.size();
            context.fillStyle = background;
            context.fillRect( 0, 0, size.w, size.h );
        }

    };

    //
    var on_render_after = function( context ) {
        
        var border = this.border();
        if ( border ) {
            var size = this.size();
            context.strokeStyle = border;
            context.beginPath();
            context.rect( 0, 0, size.w - 1, size.h - 1 );
            context.stroke();
            context.closePath();
        }

    };

    // 
    _.extend( Shape.prototype, {

        // 
        _alpha: 1,

        //
        _background: null,

        //
        _border: null,

        //
        alpha: Shape.animatable(function() {

            return this._setget( '_alpha', arguments );

        }),

        //
        background: function() {

            return this._setget( '_background', arguments );

        },

        //
        border: function() {

            return this._setget( '_border', arguments );

        }

    });


    //
    Shape.on( "create", function( shape ) {
        
        shape.on( "render:before", on_render_before, shape, -30 )
             .on( "render:after", on_render_after, shape, 30 );

    });

});