define([

    //"Shape/../libs/Class",
    //"Shape/../libs/underscore"

], function() {

    /**
     * 
     * 
     */
    var Parameters = Class.extend({

        // sets or returns a parameter from this object based on the number of arguments delivered to the function (similar to jQuery's API)
        // if the args list is empty, the value will be returns
        // otherwise, the parameter will be set to the delivered value (or to the first arg in the list, if no value was delivered)
        // this method also supports sub-properties when the parameter is of the following form: 'obj.parameter.sub_parameter'
        _setget: function( parameter, args, value ) {

            var obj = this;
            var chain = parameter.split( '.' );
            var parameter = chain[ chain.length - 1 ];

            for ( var i = 0 ; i < chain.length - 1 ; i ++ ) {
                if ( !obj[ chain[ i ] ] ) {
                    obj[ chain[ i ] ] = {};
                }
                obj = obj[ chain[ i ] ];
            }

            if ( 0 == args.length ) {
                return obj[ parameter ];
            }

            ( "undefined" == typeof value ) && ( value = args[ 0 ] );
            obj[ parameter ] = value;

            return this;

        },

        // also supports sub-parameters (similiar to the ._setget() format)
        _defaults: function( obj ) {

            _.defaults( this, obj );
            return this;

            var obj = this;
            var chain = parameter.split( '.' );
            var parameter = chain[ chain.length - 1];

            for ( var i = 0 ; i < chain.length - 1 ; i ++ ) {
                if ( "undefined" == typeof obj[ chain[ i ] ] ) {
                    obj[ chain[ i ] ] = {};
                }
                obj = obj[ chain[ i ] ];
            }

            ( "undefined" == typeof obj[ parameter ] ) && ( obj[ parameter ] = value );
            return this;

        },

    }); 

    return Parameters;

})