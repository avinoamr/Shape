define([], function() {

    // temporary context for the .measureText() API
    var context = document.createElement( 'canvas' ).getContext( '2d' );

    var on_text_change = function() {

        if ( !this.autosize() ) {
            return;
        }
        
        context.font = this._text.font;
        this.size({
            x: context.measureText( this._text.content ).width,
            y: +context.font.split( "px" )[ 0 ]
        });
    };

    /**
     *
     *
     *
     */
    return {

        _mixin_shape: true,

        //
        text: function( settings ) {

            if ( 0 == arguments.length ) {
                return this._text;
            }

            //
            if ( "object" != typeof settings ) {
                settings = { content: settings };
            }

            // call all of the image functions defined by the image object
            var nsettings = {};
            for ( var name in settings ) {
                nsettings[ "text_" + name ] = settings[ name ];
            }
            this.apply( nsettings );

            return this;

        },

        //
        text_content: function( content ) {

            var ret = this._setget( '_text.content', arguments, content, "text.content" );
            ( ret == this ) && on_text_change.apply( this );
            return ret;

        },

        //
        text_font: function( font ) {

            var ret = this._setget( '_text.font', arguments, font, "text.font" );
            ( ret == this ) && on_text_change.apply( this );
            return ret;

        },

        //
        text_background: function( background ) {

            return this._setget( '_text.background', arguments, background, "text.background" );

        },

        //
        text_border: function( border ) {

            return this._setget( '_text.border', arguments, border, "text.border" );

        }

    };

});