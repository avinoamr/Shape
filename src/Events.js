define([], function() {

    Shape.Events = Class.extend({

        on: function( name, callback, context ) {

            this._events = this._events || {};

            this._events[ name ] = this._events[ name ] || [];
            this._events[ name ].push( { callback: callback, context: context } );

            return this;

        },

        off: function( name, callback, context ) {

            this._events = this._events || {};

            if ( !callback ) {
                delete this._events[ name ];
            }

            var calls = this._events[ name ] || [];
            for ( var i = 0 ; i < calls.length ; i ++ ) {
                if ( callback == calls[ i ][ 'callback' ] && ( !context || context == calls[ i ][ 'context' ] ) ) {
                    calls.splice( i, 1 );
                }
            }

            return this;

        },

        trigger: function( name ) {

            this._events = this._events || {};

            var calls = this._events[ name ] || [];
            var args = _.toArray( arguments );
            args.splice( 0, 1 );
            for ( var i = 0 ; i < calls.length ; i ++ ) {
                calls[ i ][ 'callback' ].apply( calls[ i ][ 'context' ], args );
            }

            return this;

        }


    });

});