Thing.js
========

##### A lightweight, yet powerful, Javascript OOP library for working with classes and objects in a classic-inheritence model #####

## Introduction ##

As Javascript becomes a more popular and complex language for extremely large-scale projects, Object-oriented principles are getting even more 
crucial. Now, Javascript support a prototype-based inheritence model, which is great on it own and is not less functional than the more classic
inheritence model. Still, some might find it a bit more complex to use, the learning curve might be too steep or it might not be the best fit for any project or team out there. 

This library provides an intuitive API for the classic inheritence model, but does so with very little extra weight, and without compromising on Javascript's powerful prototype-driven data model (for example: multiple-inheritence!). 


Getting Started
========

First, <a href="https://raw.github.com/avinoamr/Class.js/master/Class.js">download</a> the `Class.js` file and add it to your application's HTML page:

```html
<script src="Class.js"></script>
```

Alternatively, for server-side environment use:

```javascript
require( './Class' );
```

Then, you can create your first class (within a `<script>` tag):

```javascript
var Animal = Class.extend({
    name: null,
    get_name: function() {
        return this.name;
    }
});
```

Finally, you can create instances of this new class, and use it:

```javascript
var rex = new Animal();
rex.name = "Rex";
rex.get_name(); // returns "Rax"
```

## Inheritence ##

Inheriting from existing classes is achieved with the `.extend()` method:

```javascript
var Dog = Animal.extend({
    constructor: function( name ) {
        this.name = name;
    },
    bark: function() {
        return "Hoof!";
    }
});
```

This will create the new `Dog` class which will sub-class the Animal class. Note the use of the special `constructor` method. This method will be used as the constructor of the class (in this example, it will set the `name` property automatically upon instansiation)

In order to invoke the parent's methods, you can use the `._super()' method (with the list of arguments):

```javascript
var Puppy = Dog.extend({
    get_name: function() {
        // returns the Dog name property appended by " Puppy"
        return this._super( arguments ) + " Puppy";
    }
});
```

Class.js also support multiple inheritence:

```javascript
var A = Class.extend({
    a: 1
});
var B = Class.extend({
    b: 1
});

// instances of C will contain a: 1 and b: 1
var C = Class.extend( A, B, {
    c: 1
}); 
```

Note that calling `._super()` in multiple inheritence will invoke the method of the last class in the extend order.