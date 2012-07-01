define([

    "Shape/../libs/Stats"

], function() {
   
    // stats
    var stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';

    var _attached = false;

    var on_render = function() {
        this.update();
    };

    return {

        monitor: function( shape ) {

            ( !_attached ) && document.body.appendChild( stats.domElement );
            shape.on_once( "render", on_render, stats );
            return shape;

        }

    };

    

});