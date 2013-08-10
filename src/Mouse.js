define([

], function() {

    //
    var capture_mouse = function( mouse, event_name ) {
        var position = this.position(),
            size = this.size();

        // translate the mouse position to local shape coordinates
        mouse = {
            x: mouse.x - position.x,
            y: mouse.y - position.y
        };

        //
        var is_out = false;
        if ( mouse.x < 0 || mouse.y < 0 || mouse.x > size.x || mouse.y > size.y ) {

            // mouse is outside of this shape and its children shapes
            is_out = true;
            if ( this._mouse_position ) {
                this._mouse_position = null;
                this.trigger( "mouse:out" );
            } else {
                return; // point isn't contained by this shape, no need to notify
                        // children
            }
        }

        // check the children
        _( this.children() ).each( function( child ) {
            capture_mouse.call( child, mouse, event_name );
        });

        if ( is_out ) {
            return;
        }

        if ( !this._mouse_position ) {
            this.trigger( "mouse:in" );
        }
        this._mouse_position = mouse;

        if ( event_name ) {
            this.trigger( event_name );
        }
    };

    //
    var mouse_position = function( ev ) {
        var box = { top: 0, left: 0 },
            canvas = this.canvas();

        if ( canvas.getBoundingClientRect ) {
            box = canvas.getBoundingClientRect();
        }

        var docElem = document.documentElement;
        box = {
            top: box.top + window.pageYOffset - docElem.clientTop,
            left: box.left + window.pageXOffset - docElem.clientLeft
        };

        var mouse = {
            x: ev.pageX - box.left,
            y: ev.pageY - box.top
        }

        return mouse;
    };

    //
    return {

        _mixin_shape: true,
        _mouse_position: null,

        //
        _on_canvas_click: function() {
            var mouse = mouse_position.apply( this, arguments );
            capture_mouse.call( this, mouse, "mouse:click" );
        },

        //
        _on_canvas_mouseout: function() {
            capture_mouse.call( this, { x: -1, y: -1 } ); // force mouse out
        },

        //
        _on_canvas_mousemove: function() {
            var mouse = mouse_position.apply( this, arguments );
            capture_mouse.call( this, mouse, "mouse:move" );
        }


    };


});