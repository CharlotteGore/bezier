var search = require('binary-search');

var getLinearPoint = function( t, i ){

	var _t = (1 - t);

	return (_t * this._c1[i]) + (t * this._c2[i]);

};

var getQuadraticPoint = function(t, i){

	var _t = (1 - t);

	return (this._c1[ i ] * (_t * _t)) + (this._c2[i] * ( (2 * _t) * t ) ) + (this._c3[i] * (t * t));

};

var getCubicPoint = function( t, i ){

	var _t = (1 - t);

	return ( this._c1[ i ] * (_t * _t * _t ) ) + ( this._c2[ i ] * ( (3 * _t * _t ) * t ) ) + ( this._c3[ i ] * ( ( 3 * _t ) * ( t * t ) ) ) + this._c4[ i ] * (t * t * t); 

};

var BezierCurve = function( config ){

	var self = this;

	if(!config){
		var config = {};		
	}

	this._c1 = config.c1 || [0,0];
	this._c2 = config.c2 || [0,0];
	this._c3 = config.c3 || [0,0];
	this._c4 = config.c4 || [0,0];

	this.isCubic();

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

	isLinear : function(){

		var self = this;

		this.b = function(t, i){

			return getLinearPoint.call(self, t, i);

		}

		return this;

	},

	isQuadratic : function(){

		var self = this;

		this.b = function(t, i){

			return getQuadraticPoint.call(self, t, i);

		};

		return this;

	},

	isCubic : function(){

		var self = this;

		this.b = function(t, i){

			return getCubicPoint.call(self, t, i);

		};

		return this;


	},

	point : function( n ){

		var self = this;

		return {

			x : self.b(n, 0),
			y : self.b(n, 1)

		};

	},


	pointCss : function( n ){

		var self = this

		return {

			left : self.b(n, 0),
			top : self.b(n, 1)

		};

	},


	renderToCanvas : function( context ){

		context.beginPath();
		context.moveTo(this._c1[0], this._c1[1]);
		context.bezierCurveTo(this._c2[0], this._c2[1], this._c3[0], this._c3[1], this._c4[0], this._c4[1]);
		context.stroke();

	},
	
	pointArray : function( n ){

		return [ this.b(n, 0), this.b(n, 1) ];
	},

	xAtTime : function( n ){

		return this.b(n, 0);

	},

	yAtTime : function( n ){

		return this.b(n, 1);

	},

	buildLookup : function( samples ){

		var x = this._x = [];
		var y = this._y = [];
		var t;
		var size = samples || 10000;

		for(var i = 0; i < size; i++){

			t = i / size;
			x.push(this.xAtTime( t ));
			y.push(this.yAtTime( t ));

		}

		return this;

	},

	findYAtX : function( target ){

		;
		return this._y[ search(this._x, target)[0] ];

	},

	query : function(){

		return {
			c1 : this._c1,
			c2 : this._c2,
			c3 : this._c3,
			c4 : this._c4
		};

	}

}

module.exports = function(c1, c2, c3, c4){
	
	return new BezierCurve(c1, c2, c3, c4);

}
