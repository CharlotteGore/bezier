var BezierCurve = function( config ){

	if(!config){
		var config = {};		
	}

	this._c1 = config.c1 || [0,0];
	this._c2 = config.c2 || [0,0];
	this._c3 = config.c3 || [0,0];
	this._c4 = config.c4 || [0,0];

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

var getPoint = function( t, i ){

	return this._c1[ i ] * (t * t * t)  + this._c3[ i ] * (3 * t * t * (1 - t)) + this._c2[ i ] * (3 * t * (1 - t) * (1 - t)) + this._c4[ i ] * ((1 - t) * (1 - t) * (1 - t)); 

}


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
	},

	xAtTime : function( time ){

		return getPoint.call(this, time, 0);

	},

	yAtTime : function( time ){

		return getPoint.call(this, time, 1);

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
