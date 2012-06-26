define([ "../libs/Class", "../src/Events", "../src/Parameters" ], function() {

    // Base Class for additional functionality
    Shape.Class = Class.extend( Shape.Events, Shape.Parameters, {

        // applies each method and its value to this object
        apply_methods: function( methods ) {

            for ( var name in methods ) {

                if ( this[ name ] && "function" == typeof this[ name ] ) {

                    this[ name ].call( this, methods[ name ] );

                }
            } 

        }

    });
    
});