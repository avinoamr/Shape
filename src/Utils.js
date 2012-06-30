define([], function() {
   
    return {

        //
        in: function( time, callback, context ) {

            window.setTimeout( function() {
                callback.apply( context );
            }, time );

            return this;
        }

    };

});