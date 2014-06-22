# bezier

  Bezier Curve functions in a handy CommonJS module (Component/Component style).
  
  Supports Linear, Quadratic and Cubic Bezier curves. By default curves are Cubic.
  
  Also supports a limited 'Find the value of Y at X' functionality via an optionally built lookup table of a configurable number of samples. Used in this
  way it is advisable to precompute your curves and store them for later use rather than generating from scratch each time.

## Installation

Browserify/NPM

```sh
    $ npm install --save gm-bezier
```

Component

```sh
    $ component install charlottegore/bezier
```

## API

    var bezier = require('bezier');
    
    // create a default zeroed curve.
    var curve = bezier();
  
  Create a new Bezier Curve.
  
    // create a curve initialised with a config object
    var curve = bezier({ c1 : c1, c2 : c2, c3: c3, c4: c4 });

### .c1()

    curve.c1( coords )

  Set C1. C1 is the start point of the curve.

  coords can come in the form `{ top: number, left : number}` or `{ x : number, y : `number`} or `[number, number]`

### .c2()

    curve.c2( coords )

  Set C2. C2 is the first control point.

  coords can come in the form `{ top: number, left : number}` or `{ x : number, y : `number`} or `[number, number]`


### .c3()

    curve.c3( coords )

  Set C3. C3 is the second control point.

  coords can come in the form `{ top: number, left : number}` or `{ x : number, y : `number`} or `[number, number]`

### .c4()

    curve.c4( coords )

  Set C4. C4 is the end point of the curve.

  coords can come in the form `{ top: number, left : number}` or `{ x : number, y : `number`} or `[number, number]`

### .buildLookup( [Optional: samples] )

    curve.buildLookup() // builds a lookup table of 1000 samples
    curve.buildLookup(100) // builds a 100 sample lookup table
    
  Iterates through the curve recording the value of X and Y. This allows you to then attempt to get the approximate value of Y for any particular value of X.
  
### .findYAtX( `x` )

    curve
      .buildLookup()
      .findYAtX(0.5) // === 0.334453
      
  Find the approximate value of y = x(t). The more samples in the lookup table, the greater the accuracy and more CPU intensive it becomes to match. 

### .renderToCanvas()

    curve.renderToCanvas( context )

  draws the curve to the context. 

### .point()

    curve.point( percent ) 

  `percent` being a floating point number between 0 and 1, representing the start and end of the curve. Returns an object: `{x : val, y: val}`.

### .pointArray()

    curve.pointArray( percent )

  `percent` being a floating point number between 0 and 1, representing the start and end of the curve. Returns an array: `[x, y]`.

### .pointCss()

    curve.pointCss( percent )

  `percent` being a floating point number between 0 and 1, representing the start and end of the curve. Returns an object: `{ top: val, left: val}`.

    
### .isCubic()

    curve
      .isCubic()
      .c1( c1 )
      .c2( c2 )
      .c3( c3 )
      .c4( c4 )
      
  Explicitly sets the curve back to Cubic. This is the default, though. Doesn't need calling.
    
### .isLinear()

    curve
      .isLinear()
      .c1([10,10])
      .c2([20,20])
      
  Linear 'curve' mode - a straight line from C1 to C2.
  
### .isQuadratic()

    curve
      .isQuadratic()
      .c1( c1 )
      .c2( c2 )
      .c3( c3 )
      
  Quadratic curve mode. Only three control points required.

## Test

  test/testrunner.html can be opened in a local browser assuming you have installed the npm deps.

    npm install
    make test

## License

  MIT
