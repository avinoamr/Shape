define([
    "Shape/Consts"
], function( Consts ) {
   
    //
    var on_image_ready = function() {

        if ( this.autosize() ) { // we can use FITCONTENTS instead?
            var image = this.image_content();
            this.size({ x: Consts.FITCONTENTS, y: Consts.FITCONTENTS });
        }
        
        this.trigger( "image:ready" );
    };

    /**
     *
     *
     */
    return {

        _mixin_shape: true,

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
                settings[ "image_" + name ] = settings[ name ];
                delete settings[ name ];
            }
            this.apply( settings );

            return this;

        },

        image_size: function() {
            
            var rv = this._setget( "_image.size", arguments );

            if ( !rv ) {
                var img = this.image_content();
                rv = {
                    x: ( img ) ? img.width : 0,
                    y: ( img ) ? img.height : 0
                }
            }

            return rv;

        },

        //
        image_content: function( img ) { //spritesheet()

            var that = this;
            if ( "string" == typeof img ) {
                var img_url = img;
                img = new Image();

                this._setget( '_image.content', [ img ] );

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

        // 
        image_section: function() {

            return this._setget( "_image.section", arguments );

        },

        // 
        spite_size: function() {

            return this._setget( "_image.spritesize", arguments );

        },

        // 
        sprite: function() {

            return this._setget( "_image.sprite", arguments );

        }

        

    };

});