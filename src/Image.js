define([

    "Shape/Class"

], function( Class ) {
   
    //
    var on_image_ready = function() {
        var image = this.image_content();
        this.size({ x: image.width, y: image.height });
        this.trigger( "image:ready" );
    };

    /**
     *
     *
     */
    var ShapeImage = Class.extend({

        //
        image: function( settings ) {

            if ( 0 == arguments.length ) {
                return this._image;
            }

            //
            if ( "string" == typeof settings || settings instanceof Image ) {
                settings = { content: settings };
            }

            // call all of the image functions defined by the image object
            for ( var name in settings ) {
                settings[ name ] = "image_" + settings;
            }
            this.apply( settings );

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

            return this._setget( '_image.content', arguments, img );
        },

    });

    return ShapeImage;

});