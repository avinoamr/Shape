define([], function() {

    // we have to reqire the Shape object lazily later because otherwise it will be a circular dependency and will be evaluated 
    // to undefined.
    var Shape;
    var require_shape = function() {
        return Shape || ( Shape = require( "Shape/Shape" ) );
    };
    
    /**
     *
     *
     */
    return {

        _mixin_shape: true,

        // looks up the scene tree and collect all of the values of the requested parameter.
        lookup: function( parameter, limit ) {

            var ret = [];

            var self = this[ parameter ].apply( this );
            if ( self ) {
                ret.push( self );
                limit && ( -- limit ); 
            }

            if ( 0 === limit ) {
                return ret;
            }

            var parent = this.parent();
            if ( parent ) {
                ret = ret.concat( parent.lookup( parameter, limit ) );
            }

            return ret;

        },

        //
        find: function( sid ) {

            // is it this one?
            if ( sid == this.sid ) {
                return this;
            }

            // look in the immediate children
            var children = this.children();
            for ( var i = 0 ; i < children.length ; i ++ ) {
                var child = children[ i ];
                var ret = child.find( sid );
                if ( ret ) {
                    return ret;
                }
            }

        },

        //
        parent: function( parent ) {

            return this._setget( '_parent', arguments );

        },

        // sets or returns the list of child shapes
        children: function( children ) {

            ( this._children ) || ( this._children = [] );
            if ( 0 == arguments.length ) {
                return this._children;
            }

            // update the children
            this._children = []; // complete re-write of the children list. TODO: use .remove() to support events and other manipulations
            this.add.apply( this, children );

            return this;

        },

        // add child shapes to this object
        add: function( /** shapes **/ ) {

            Shape || require_shape();

            for ( var i = 0 ; i < arguments.length ; i ++ ) {
                var child = arguments[ i ];

                if ( !( child instanceof Shape ) ) {
                    child.parent = this;
                    child = new Shape( child );
                }

                this._children.push( child );
                this.trigger( "add", child );
                child.parent( this ); // TODO: should we also remove it from its previous parent? otherwise maybe we need a list of parents (graph)
                child.trigger( "add_to", this );
            }
            return this;

        },

        // remove child shapes from this object
        remove: function( /** shapes **/ ) {

            // TODO

        }

    };

});