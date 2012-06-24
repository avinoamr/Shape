define([ "../libs/underscore" ], function() {

    Shape.RESIZE_TO_CONTENT = "to_content";

    //
    var on_render_before = function( context ) {
        
        var image = this.image();
        if ( image ) {
            var size = this.size();
            context.drawImage( this._image.content, 0, 0, size.w, size.h );
        }

    };

    //
    var on_image_ready = function() {

        this.trigger( "image:ready" );

    };


    //
    _.extend( Shape.prototype, {

        //
        image: function( img ) {

            if ( 0 == arguments.length ) {
                return this._image;
            }

            //
            if ( img instanceof Image || "string" == typeof img ) {
                img = { content: img };
            }

            // call all of the image functions defined by the image object
            for ( var name in img ) {
                var func = this[ 'image_' + name ];
                if ( func && "function" == typeof func ) {
                    func.call( this, img[ name ]);
                }
            }

            return this;

        },

        //
        image_content: function( img ) {

            var that = this;

            if ( "string" == typeof img ) {
                var img_url = img;
                img = new Image();

                img.onload = function() {
                    on_image_ready.apply( that );
                }
                img.src = img_url;
                
                if ( img.complete ) {
                    img.onload();
                }
            }

            return this._default( '_image', {} )
                ._setget( '_image.content', arguments, img );
        },

    });

    
    Shape.on( "create", function( shape ) {

        shape.on( "render:before", on_render_before, shape, -20 );

    });

});