/**
 * Class.js
 * A lightweight, yet powerful, Javascript OOP library for working with classes and objects in a classic-inheritence model.
 *
 * USAGE
 * For complete documentation see README.md or https://github.com/avinoamr/Class.js 
 * 
 * CREDITS
 * This code is heavily inspired by (and in some parts uses) other wonderful libraries: 
 *   
 *   Underscore.js : http://underscorejs.org/
 *   Backbone.js : http://backbonejs.org/
 *   Google Closure: https://developers.google.com/closure/library/docs/introduction
 *   John Resig's Blog: http://ejohn.org/blog/simple-javascript-inheritance/
 *   
 * 
 * LICENSE
 * The MIT License
 * 
 *   Copyright (c) 2010-2012 Roi Avinoam <avinoamr at gmail dot com> and Class.js authors.
 * 
 *   Permission is hereby granted, free of charge, to any person obtaining a copy
 *   of this software and associated documentation files (the "Software"), to deal
 *   in the Software without restriction, including without limitation the rights
 *   to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *   copies of the Software, and to permit persons to whom the Software is
 *   furnished to do so, subject to the following conditions:
 *   
 *   The above copyright notice and this permission notice shall be included in
 *   all copies or substantial portions of the Software.
 *   
 *   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *   IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *   FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *   AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *   LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *   OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *   THE SOFTWARE.
 *
 *
 *
 */

(function() {

    // a utility method for merging objects (similar to underscore's _.extend() )
    var merge = function( obj ) {
        for ( var i = 1 ; i < arguments.length ; i ++ ) {
            for ( var name in arguments[ i ] ) {
                obj[ name ] = arguments[ i ][ name ];
            }
        }
        return obj;
    };

    // explain?
    var fn_test = /\b_super\b/;
    if ( /xyz/.test( function() { xyz; }  ) ) {
        fn_test = /.*/;
    }

    // Shared empty constructor function to aid in prototype-chain creation.
    var ctor = function(){};

    // Helper function to correctly set up the prototype chain, for subclasses.
    // Similar to `goog.inherits`, but uses a hash of prototype properties and
    // class properties to be extended.
    var inherits = function( parents, prototype ) {

        prototype || ( prototype = {} );
        parents || ( parents = [] );

        // last parent will be used as the super (unless defined otherwise explicitly on the call to _super() )
        var _super = parents[ parents.length - 1 ].prototype; 

        //
        var wrap_method = function( name, method, _super ) {

            var super_method = function( args ) {
                return _super[ name ].apply( this, args );
            };

            return function Object() { // we call it 'Object' just in order to present it correctly in the dev-tools (instead of showing 'wrap_method')
                var tmp = this[ "_super" ];
                this._super = super_method;
                var ret = method.apply( this, arguments );
                
                if ( "undefined" != typeof tmp ) {
                    this._super = tmp;
                } else {
                    delete this._super;
                }

                return ret;
            };

        };

        // The constructor function for the new subclass is either defined by you
        // (the "constructor" property in your `extend` definition), or defaulted
        // by us to simply call the parent's constructor.
        var constructor;
        if ( prototype && prototype.hasOwnProperty( 'constructor' ) ) {

            constructor = prototype.constructor;

        } else {

            constructor = function() {
                _super.constructor.apply( this, arguments );
            };

        }

        var Class = wrap_method( 'constructor', constructor, _super );

        // inherit class (static) properties from parent.
        merge.apply( {}, [ Class ].concat( parents ) );

        // Set the prototype chain to inherit from `parent`, without calling
        // `parent`'s constructor function.
        ctor.prototype = {};
        var i = 0;
        for ( var i = 0; i < parents.length ; i ++ ) {
            merge( ctor.prototype, parents[ i ].prototype );
        }
        Class.prototype = new ctor();

        // support the super() method in all methods
        for ( var name in prototype ) {

            // is it an override?
            if ( "function" != typeof prototype[ name ] ) continue;
            if ( "function" != typeof _super[ name ] ) continue;
            if ( !fn_test.test( prototype[ name ] ) ) continue;

            prototype[ name ] = wrap_method( name, prototype[ name ], _super );

        }

        merge( Class.prototype, prototype );

        Class.prototype.constructor = Class;

        // reference to the classe's parent prototype (to act as super)
        Class._super = _super;
        
        return Class;

    };

    var extend = function( /**  parents, and finally the object **/ ) {

        // extract the list of objects from the arguments
        var prototype = {}, parents = [ this ];
        for ( var i = 0 ; i < arguments.length ; i ++ ) {
            var arg = arguments[ i ];

            if ( "function" == typeof arg ) {
                parents.push( arg );
            } else {
                merge( prototype, arg );
            }

        }

        // create and return the subclass
        return inherits( parents, prototype );
    };

    // inject functionality and properties from other classes or objects into the current Class
    // note that any conflicting properties will override this function's properties (including the constructor)
    var mixin = function( /** Classes or objects **/ ) {

        for ( var i = 0 ; i < arguments.length ; i ++ ) {

            var obj = arguments[ i ];
            ( "function" == typeof arguments[ i ] ) && obj = obj.prototype;

            for ( var name in obj ) {
                this.prototype[ name ] = obj[ name ];
            }

        }

        return this;

    };

    // create the base Class
    var Class = function() {};
    Class.extend = extend;
    Class.mixin = mixin;

    // cliient-side
    if ( "undefined" != typeof window ) {
        window.Class = Class;
    } 

    // server-side
    if ( "undefined" != typeof module ) {
        module.exports = Class;
    }

})();