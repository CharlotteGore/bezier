var BezierCurve = function(){

	return this;

};

var checkCoord = function( o ){

	if(typeof o.top !== 'undefined' && typeof o.left !== 'undefined'){

		return [o.left, o.top];

	}else if(typeof o.x !== 'undefined' && typeof o.y !== 'undefined'){

		return [o.x, o.y];

	}else if(typeof o[0] === 'number' && typeof o[1] === 'number'){

		return o

	}else{

		throw new Error('Input unacceptable');

	}

};

var getPoint = (function(){

	var b1 = function (t)  { 
		return (t * t * t); 
	};		
	var b2 = function (t)  { 
		return (3 * t * t * (1 - t)); 
	};		
	var b3 = function (t)  { 
		return (3 * t * (1 - t) * (1 - t)); 
	};		
	var b4 = function (t)  { 
		return ((1 - t) * (1 - t) * (1 - t)); 
	};

	return function( t, i ){

		return this._c1[ i ] * b1( t )  + this._c2[ i ] * b2( t ) + this._c3[ i ] * b3( t ) + this._c4[ i ] * b4( t ); 

	}

})();

BezierCurve.prototype = {

	c1 : function( coord ){

		this._c1 = checkCoord(coord);

		return this;

	},

	c2 : function( coord ){

		this._c2 = checkCoord(coord);

		return this;

	},

	c3 : function( coord ){

		this._c3 = checkCoord(coord);

		return this;

	},

	c4 : function( coord ){

		this._c4 = checkCoord(coord);

		return this;

	},

	point : function( n ){

		return {

			x : getPoint.call(this, n, 0),
			y : getPoint.call(this, n, 1)

		};

	},


	pointCss : function( n ){

		return {

			left : getPoint.call(this, n, 0),
			top : getPoint.call(this, n, 1)

		};

	},


	renderToCanvas : function( context ){

		context.beginPath();
		context.moveTo(this._c1[0], this._c1[1]);
		context.bezierCurveTo(this._c2[0], this._c2[1], this._c3[0], this._c3[1], this._c4[0], this._c4[1]);
		context.stroke();

	},
	
	pointArray : function( n ){

		return [ getPoint.call(this, n, 0), getPoint.call(this, n, 1) ];
	}

}

module.exports = function(c1, c2, c3, c4){
	
	return new BezierCurve(c1, c2, c3, c4);

}