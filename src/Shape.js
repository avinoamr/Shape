
// temporary Shape object 
var Shape = function() {};

define([ "../libs/Class.js", 
         "../libs/underscore.js", 
         "../libs/Tween.js", 
         "../src/Events", 
         "../src/Parameters", 
         "../src/Application", 
         "../src/Transform", 
         "../src/Visibility",
         "../src/Style", 
         "../src/Render", 
         "../src/Image", 
         "../src/Text", 
         "../src/Animation" 

        ], function() {


    // we're going to override the Shape object with a function
    // then, we'll need to re-apply the current properties of the Shape object
    var shape_obj = Shape = window.Shape;

    // Main Shape object (each Shape represents a Node in the Scene Graph)
    var Shape = window.Shape = Class.extend( Shape.Events, Shape.Parameters, {

        // a unique id per instance of Shape
        sid: null,

        // list of child shapes
        _children: [],

        //
        // Available settings
        //  sid: the sid to use for this Shape
        //  sid_prefix: a prefix string to prepend to the auto-generated sid (irrelevant if the sid was explicitly delivered)
        //  (any other method of Shape)
        constructor: function( settings ) {

            this._super( arguments );

            settings || ( settings = {} );

            var sid_prefix = settings.sid_prefix || "Shape_";
            this.sid = settings.sid || sid_prefix + ( ++ Shape._uniqid );
            this._children = _.clone( this._children );

            // init events 
            Shape.trigger( "create", this );

            // shape & scene generation support
            // attempts to invoke any method that matches the settings 
            // bootstraps this Shape and its properties
            // this design follows the content-driven principle of the engine
            for ( var name in settings ) {
                if ( this[ name ] && "function" == typeof this[ name ] ) {

                    this[ name ].call( this, settings[ name ] );

                }
            } 

        },

        // sets or returns the list of child shapes
        children: function( children ) {

            if ( 0 == arguments.length ) {
                return this._children;
            }

            // update the children
            this._children = []; // complete re-write of the children list. TODO: use .remove() to support events and other manipulations
            this.add.apply( this, children );

            return this;
            return this._setget( '_children', arguments );

        },

        //
        find: function( pattern ) {

            // TODO

        },

        //
        parent: function( parent ) {

            return this._setget( '_parent', arguments );

        },

        //
        root: function() {
            var parent = this;
            while ( parent._parent != null ) {
                parent = parent._parent;
            }
            return parent;
        },

        // add child shapes to this object
        add: function( /** shapes **/ ) {

            for ( var i = 0 ; i < arguments.length ; i ++ ) {
                var child = arguments[ i ];

                if ( !( child instanceof Shape ) ) {
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



    });


    //
    Shape._uniqid = 0;


    // re-apply the properties of the Shape object
    // this allows other classes to extend the Shape object before it's been created
    _.extend( Shape, shape_obj );
    _.extend( Shape.prototype, shape_obj.prototype );

});