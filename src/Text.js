define([ "../libs/underscore", "../src/Events" ], function() {
   
    //
    var on_render_before = function( context ) {

        var text = this.text_content();
        if ( text ) {
            context.font = this.text_font();
            context.fillStyle = this.text_color();
            context.textBaseline = 'top';
            context.fillText( text, 0, 0 );
        }

    };


    //
    _.extend(Shape.prototype, {

        //
        text: function( txt ) {

            if ( 0 == arguments.length ) {
                return this._text;
            }

            //
            if ( "object" != typeof txt ) {
                txt = { content: txt };
            }

            // call all of the image functions defined by the image object
            for ( var name in txt ) {
                var func = this[ 'text_' + name ];
                if ( func && "function" == typeof func ) {
                    func.call( this, txt[ name ]);
                }
            }

            return this;

        },

        //
        text_content: function( content ) {

            return this._default( '_text.content', "" )
                ._setget( '_text.content', arguments );

        },

        //
        text_font: function() {

            return this._default( '_text.font', '28px sans-serif' )
                ._setget( '_text.font', arguments );

        },

        //
        text_color: function() {

            return this._default( '_text.color', 'white' )
                ._setget( '_text.color', arguments );

        },

    });


    //
    Shape.on( "create", function( shape ) {
        shape.on( "render:before", on_render_before, shape, -10 );
    });


});