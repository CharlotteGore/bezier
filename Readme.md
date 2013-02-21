
# bezier

  Bezier Curve functions in a handy CommonJS module (Component/Component style).

## Installation

    $ component install charlottegore/bezier

## API

    var bezier = require('bezier');

    var curve = bezier();

### .c1()

    curve.c1( coords )

  c1 is the start point of the curve.

  coords can come in the form `{ top: number, left : number}` or `{ x : number, y : `number`} or `[number, number]`

### .c2()

    curve.c2( coords )

  c2 is the first control point.

  coords can come in the form `{ top: number, left : number}` or `{ x : number, y : `number`} or `[number, number]`


### .c3()

    curve.c3( coords )

  c3 is the second control point.

  coords can come in the form `{ top: number, left : number}` or `{ x : number, y : `number`} or `[number, number]`

### .c4()

    curve.c4( coords )

  c4 is the end point of the curve.

  coords can come in the form `{ top: number, left : number}` or `{ x : number, y : `number`} or `[number, number]`

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

## Test

  test/testrunner.html can be opened in a local browser assuming you have installed the npm deps.

    npm install
    make test

## License

  MIT
