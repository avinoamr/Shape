define([

    "Shape/Class",
    //"Shape/../libs/Tween",
    //"Shape/../libs/underscore"

], function( Class ) {

    //
    var interp = function( source, target, value ) {

        var source_type = typeof source,
            target_type = typeof target;

        if ( "number" == source_type && "number" == target_type ) {

            return source + ( target - source ) * value;

        } else if ( "object" == source_type && "object" == target_type ) {

            var ret = {};
            for ( var param in target ) {
                ret[ param ] = interp( source[ param ], target[ param ], value );
            }
            return ret;

        } else if ( 1 == value ) {

            return target;

        }

        return {};


    };

    /**
     *
     *
     *
     */
    return Class.extend({

        //
        _object: {},
        _source: {},
        _target: {},
        _duration: 1000,
        _starttime: 0,
        _easing: TWEEN.Easing.Linear.None,


        //
        constructor: function( object ) {

            this._super( arguments );
            this._object = object;
            this.source( _.clone( object ) );

        },

        //
        source: function() {

            return this._setget( "_source", arguments );

        },

        //
        target: function() {

            return this._setget( "_target", arguments );

        },

        //
        duration: function() {

            return this._setget( "_duration", arguments );

        },

        //
        easing: function( easing ) {

            return this._setget( "_easing", arguments );

        },

        //
        start: function( time ) {

            this._starttime = time;
            return this;

        },

        //
        update: function( time ) {

            var elapsed = ( time - this._starttime ) / this._duration;
            //console.log( time - this._starttime  );
            ( elapsed > 1 ) && ( elapsed = 1 );

            var easing = this.easing();
            var value = easing( elapsed );

            var obj = interp( this._source, this._target, value )
            _.extend( this._object, obj );

            this.trigger( "update", this._object );

            if ( 1 == elapsed ) {
                this.trigger( "complete", this._object );
            }

            return this._object;

        }

    });

});