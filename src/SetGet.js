define([], function() {

    Shape.SetGet = Class.extend({

        _setget: function( parameter, args ) {

            if ( 0 == args.length ) {
                return this[ parameter ];
            }

            this[ parameter ] = args[ 0 ];
            return this;

        }

    });

});