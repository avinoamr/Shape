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

            // exact match
            if ( sid == this.sid ) {
                return this;
            }

            // regexp search
            if ( sid instanceof RegExp && sid.test( this.sid ) ) {
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

        // returns the root parent
        root: function() {
            var parent = this;
            while ( parent.parent() ) {
                parent = parent.parent();
            }
            return parent;
        },

        //
        // sets or returns the list of child shapes
        // Supports both an array of child Shapes/Objects, or an Object of { sid => Shape/Object }
        // TODO: Add a 2nd argument for set or update? or maybe create a separate update_children() method?
        children: function( children ) {

            ( this._children ) || ( this._children = [] );
            if ( 0 == arguments.length ) {
                return this._children;
            }

            // update the children
            if ( children instanceof Array ) {

                this._children = []; // complete re-write of the children list. TODO: use .remove() to support events and other manipulations
                this.add.apply( this, children );

            } else if ( children instanceof Object ) {
                
                // update or add each child
                for ( var sid in children ) {

                    var child = this.find( sid );
                    if ( child ) {

                        child.apply( children[ sid ] );

                    } else {

                        child = children[ sid ];
                        child.sid = sid;
                        this.add( child );

                    }

                }

            }
            
            return this;

        },

        // add child shapes to this object
        add: function( /** shapes **/ ) {

            Shape || require_shape();

            ( this._children ) || ( this._children = [] );
            
            for ( var i = 0 ; i < arguments.length ; i ++ ) {
                var child = arguments[ i ];

                if ( !child.instanceof || !child.instanceof( Shape ) ) {
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