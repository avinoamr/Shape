define([ 

    //"Shape/../libs/Class",
    //"Shape/../libs/underscore"

], function() {

    /**
     *
     *
     */
    var Events = Class.extend({

        //
        on: function( name, callback, context, order ) {

            order || ( order = 0 );
            context || ( context = this );
            this._events = this._events || {};
            this._events[ name ] = this._events[ name ] || [];
            this._events[ name ].push( { callback: callback, context: context, order: order } );

            // sort by order
            // TODO: this might be kinda slow and inefficient. Consider using a different mechanism for controling the order
            // in which the events are triggered. In most Observable-like design patterns, it's considered good practice
            // to not support ordering, or assume there's no order thus leaving the developer to take care of his own
            // callback invocations where needed. This is good for most cases, but will break our rendering process because 
            // some of the Shape modules perform translations and other transforms during rendering
            this._events[ name ] = _.sortBy( this._events[ name ], function( event_obj ) {

                return event_obj.order;

            });

            return this;

        },

        //
        on_once: function( name, callback, context ) {

            return this.off( name, callback, context )
                       .on( name, callback, context );

        },

        //
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

            // clean up 
            // micro-optimization to make .trigger() faster by not having to even look through an empty object
            // we want to be able to send many triggers with epsilon performance impact
            if ( !calls ) {
                delete this._events[ name ];
            }
            if ( !_.keys( this._events ).length ) {
                delete this._events;
            }

            return this;

        },

        trigger: function( name ) {

            // run away quickly if no events are bound
            if ( !this._events ) {
                return this;
            }

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

    return Events;

});