Shape
=====

An HTML5 Engine for Games &amp; Other Interactive Applications 

## Introduction
While there are many HTML5 game engines out there, most are cumbersome to use, requires a lot of boilerplate code, and the learning curve is kinda steep. Shape takes a new approach to creating HTML5 games: simplicity and content-driven, over fully-functional, extremely powerful features.

## Philosophy 
0. It has a philosophy. We're not just putting together a bloated framework for every project out there, but try to focus our engine on a limited set of implementation details to support our vision. 
1. Content-Driven. Games are content. Almost only content. From the obvious (art, sound and text) to the implicit (core game loops, mechanics and behavior) -- it's all content (as opposed to technical platforms), thus we want to be able to describe even the most complex scenarios in a big chunk of data, and to be able to programmatically (or not) manipulate this data to generate the gaming behavior we're after. 
2. Usability over Performance. This is a tricky one: in games, performance is important. Very important. To a point where it turns even simple features into complex, hard-to-maintain, code-bases in order to achieve the performance requirements. We realize that with Javascript being ever-more high-performance (even more than AS3 lately), we prefer to focus more on readble, maintainable code over making micro-optimizations to the performance. 
3. Compact & Minimalism. Shape is not yet another bloated framework for creating the world's most powerful games. It's small, lightweight and compact. 
5. Rapid Development. It must be fast to play with, fast to get started, fast to prototype. More scarce and complex requirements will require mastering the framework, and extending it, obviously. But for the most part -- development should be streamlined to create beautiful applications in minimal efforts.
6. Extensible. To counter-act the missing features and behaviors due to the minimalism of the framework, it should be easily extensible with a set of events. If something doesn't *have* to be part of the framework, it shouldn't. But the events-driven architecture will allow the community and developers to extend the engine's behavior with plugins and extensions. 
                                                                                                                                                                                        
## Getting Started

First, download the Shape.js file, and include it in your application:

```javascript
<script src="Shape.js"></script>
```

Then, create your first shape node:

```javascript
var s = new Shape({
  text: "Hello World"
});
```

Lastly, create a canvas element and attach it to the create shape:

```javascript
var canvas = document.createElement( 'canvas' );
document.body.appendChild( canvas );

s.canvas( canvas );
```

Now, in order to render the Shape's contents:

```javascript
s.render();
```

That's it! 

## API Design

Shape follows some common API design principles of other javascript libraries:

### Accessors and Mutators

Most methods in Shape can be used as both an accessor and mutator to a property. If the method is called without arguments, the property value will be returned. Otherwise, the property will be set to the value of the arguments, and the same instance will be returned:

```javascript
var s = new Shape();

var size = s.size(); // returns the size
s.size({ x: 100, y: 100 }); // sets the size
```

### Chaining methods

Calling methods as accessors (with arguments) will always return the same instance. This allows easily chaining behavior to the Shapes:

```javascript
var s = new Shape();

s.size({ x: 100, y: 100 })
 .position({ x: 50, y: 50 })
 .background( 'yellow' );
```

## Understanding Shapes

Each Shape instance is a Scene Node. It can either define its own content (text, images, etc.), and/or contain a list of child shapes. Calling `.render()` will render the Shape, and all of its child Shapes into all of the attached canvases. 

### Shape( properties )

The Shape constructor receives an object with all of the initial properties of the object. The available properties are *any* of the Shape methods. This follows the content-driven approach, where we can define the entire scene tree (properites, children, animation-frames or even code) in one or (preferably) many objects, and patch them together in the Shape constructor.

```javascript
var s = new Shape({
  size: { x: 100, y: 100 },
  position: { x: 50, y: 50 },
  background: 'yellow',
  children: [ /** ... **/ ]
});
```

Upon instantiation, the Shape will be assigned with an auto-generated unique `.sid` string property that will allow us to easily locate and manipulate it later. You can always define your own `.sid` value in the constructor (but then you will have to ensure uniqueness yourself):

```javascript
var s = new Shape({ sid: 'App_Main_Shape' });
```

Alternatively, you can just define a prefix to the auto-generated sid:

```javascript
var s = new Shape({ sid_prefix: 'MyApp_' }); // the .sid will be "MyApp_19" (or similar)
```

### .add( child_1, child_2, ... )

Adds one or more Shape as a child of the current Shape:

```javascript
var s1 = new Shape({
  text: "Hello World"
});

var s2 = new Shape({
  size: { x: 200, y: 200 }
});

s2.add( s1 ); // will add s1 as a child-shape (or child-node) of the s2 Shape.
```

### .remove( child_1, child_2, ... )

Removes one or more Shape from the children of the current Shape:

```javascript
s2.remove( s1 ); // s1 will no longer be a part of the s2 children list
```

### .children( children ) 

Sets or returns the entire children list of this Shape instance:

```javascript
var child1 = new Shape();
var child2 = new Shape();

var s = new Shape();
s.children([ child1, child2 ]); 
```

<b>Note:</b> In order to follow the content-driven approach, you can define child-shapes in-line (in both `.children()` or `.add()`), which will be automatically converted to Shape instances:

```javascript
var s = new Shape({ sid: 'main' });
s.children([ {
    sid: 'child1',
    size: { x: 100, y: 100 },
  }, 
  {
    sid: 'child2',
    size: { x: 50, y: 50 },
    children: [ /** ... **/ ]
  } 
]);
```

### .parent( parent )

Sets or returns the parent of the current Shape:

```javascript
var p = child2.parent(); // returns s from the example above
```

### .find( sid )

Searches recursively for the Shape with the given sid in the Scene Tree of this Shape:

```javascript
var c = s.find( 'child2' );
c.size(); // returns { x: 50, y: 50 }
```

### .lookup( property, limit )

Searches up the Scene Tree (from this Shape and upwards, up to the *optional* limit) for a given property and returns an array of all of the values:

```javascript
c.lookup( 'sid' ); // returns [ "child2", "main" ]
```

## Transforms

There are several methods for transforming the Shapes in the tree (we've already seen some of them):

### .size( size )

Sets or returns the size of this Shape (an object with `.x` and `.y`):

```javascript
s.size({ x: 100, y: 100 });
```

### .position( position )

Sets or returns the position of this Shape (an object with `.x` and `.y`):

```javascript
s.position({ x: 50, y: 50 });
```

### .rotation( rotation )

Sets or returns the rotation of this Shape (a radian float number):

```javascript
s.rotation( Math.PI / 2 ); // 90 degrees
```

### .scale( scale )

Sets or returns the scale of this Shape (an object with `.x` and `.y`, a value of 1 will not affect scale):

```javascript
s.scale({ x: .5, y: 2 }); // scales the Shape to half its width and twice its height
```

### .autosize( enabled )

Some Shape properties (like images and texts, see below) will automatically reset the size property of the Shape to its contents. For example, a Shape with an image property will be re-sized automatically to the size of the image. You can enable/disable this functionality *before* setting the resize-invoking property:

```javascript
s.autosize( false ); // the size will be fixed
```

## Visibility

Shapes contain simple methods of controlling their visibility.

### .hide()

Will hide this Shape (and its children) on the next render

### .show()

Will display this Shape (and its children) on the next render

### .toggle()

Will toggle the display of this Shape (and its children) on the next render

### .visibility()

Manually controls the visibility of this Shape (and its children) on the next render:

```javascript
s.visibility( false ); // same as: s.hide()
```

## Styling

Shapes support simple methods for controlling their background and border colors. It's important to note that the engine does not suppot vector graphics or the drawing API as a principle, so most graphic effects should be achieved with embedding image shapes. Still, these methods can be useful for debugging, fading animations or clearing the background.

### .background( color )

Sets or returns the background color of this Shape. On each render, the background color will be filled to the entire size defined by the `.size` property of this Shape:

```javascript
s.backgroud( '#FF0000' );
```

### .border( color )

Sets or returns the border color of this Shape. Similar to the `.background()`, it will border along the `.size()` property of this Shape. This is sometimes extra useful for debugging the sizes, mouse events and z-index of Shapes.

```javascript
s.border( '#0000FF' );
```

### .alpha( alpha )

Sets or returns the transparecy of this Shape (and its children). Extremely useful for fading Shapes in and out of view.

```javascript
s.alpha( 0.3 ); // 30% visibility
```
