define([
    "Shape/Consts"
], function( Consts ) {

    // temporary context for the .measureText() API
    var context = document.createElement( 'canvas' ).getContext( '2d' );

    var get_text_size = function() {
        if ( !this._text || !this._text.content ) {
            return { x: 0, y: 0 };
        }
        context.font = this._text.font;
        context.textBaseline = 'top';
        return {
            x: context.measureText( this._text.content ).width,
            y: +context.font.split( "px" )[ 0 ]
        }
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

        text_size: function() {
            
            var rv = this._setget( "_text.size", arguments );

            if ( !rv ) {
                rv = get_text_size.apply( this );
            }

            return rv;

        },

        //
        text_content: function( content ) {

            var ret = this._setget( '_text.content', arguments, content, "text.content" );
            return ret;

        },

        //
        text_font: function( font ) {

            var ret = this._setget( '_text.font', arguments, font, "text.font" );
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