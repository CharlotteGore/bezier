var bezier = require('bezier');

describe('Bezier module', function () {
    it('should export a function', function () {
        bezier.should.be.a('function');
    });

    it('should return a bezier object', function(){
    	bezier().should.be.a('object');
    });

    it('should be queryable', function(){

    	var query = bezier().query();

    	query.should.have.property('c1').with.length(2);
    	query.should.have.property('c2').with.length(2);
    	query.should.have.property('c3').with.length(2);
    	query.should.have.property('c4').with.length(2);

    });

    it('should reset to zero by default', function(){

    	var query = bezier().query();

    	query.c1[0].should.equal(0);
    	query.c1[1].should.equal(0);

    	query.c2[0].should.equal(0);
    	query.c2[1].should.equal(0);

    	query.c3[0].should.equal(0);
    	query.c3[1].should.equal(0);

    	query.c4[0].should.equal(0);
    	query.c4[1].should.equal(0);

    });


    it('should allow control points to be set with an array', function(){

    	var curve = bezier();

    	curve.c1([10,15])
			.c2([20,25])
			.c3([30,35])
			.c4([40,45]);

    	var query = curve.query();

    	query.c1[0].should.equal(10);
    	query.c1[1].should.equal(15);

    	query.c2[0].should.equal(20);
    	query.c2[1].should.equal(25);

    	query.c3[0].should.equal(30);
    	query.c3[1].should.equal(35);

    	query.c4[0].should.equal(40);
    	query.c4[1].should.equal(45);

    });


    it('should allow control points to be set with an a top/left object', function(){

    	var curve = bezier();

    	curve.c1({ left: 10, top : 15})
			.c2({ left: 20, top : 25})
			.c3({ left: 30, top : 35})
			.c4({ left: 40, top : 45});

    	var query = curve.query();

    	query.c1[0].should.equal(10);
    	query.c1[1].should.equal(15);

    	query.c2[0].should.equal(20);
    	query.c2[1].should.equal(25);

    	query.c3[0].should.equal(30);
    	query.c3[1].should.equal(35);

    	query.c4[0].should.equal(40);
    	query.c4[1].should.equal(45);

    });

    it('should allow control points to be set with an x/y object', function(){

    	var curve = bezier();

    	curve.c1({ x: 10, y: 15})
			.c2({ x: 20, y : 25})
			.c3({ x: 30, y : 35})
			.c4({ x: 40, y : 45});

    	var query = curve.query();

    	query.c1[0].should.equal(10);
    	query.c1[1].should.equal(15);

    	query.c2[0].should.equal(20);
    	query.c2[1].should.equal(25);

    	query.c3[0].should.equal(30);
    	query.c3[1].should.equal(35);

    	query.c4[0].should.equal(40);
    	query.c4[1].should.equal(45);

    });

    it('should allow control points to be set with an x/y object', function(){

    	var curve = bezier();

    	curve.c1({ x: 10, y: 15})
			.c2({ x: 20, y : 25})
			.c3({ x: 30, y : 35})
			.c4({ x: 40, y : 45});

    	var query = curve.query();

    	query.c1[0].should.equal(10);
    	query.c1[1].should.equal(15);

    	query.c2[0].should.equal(20);
    	query.c2[1].should.equal(25);

    	query.c3[0].should.equal(30);
    	query.c3[1].should.equal(35);

    	query.c4[0].should.equal(40);
    	query.c4[1].should.equal(45);

    });

   	it('should return an array when using pointArray()', function(){

   		var curve = bezier();

   		curve
   			.c1({ x : 10, y : 15})
   			.c2({ x : 10, y : 25})
   			.c3({ x : 20, y : 25})
   			.c4({ x : 20, y : 15})

   		curve.pointArray(0).should.be.an('array')

   	});

    it('should return an object with top/left when using pointCss()', function(){

   		var curve = bezier();

   		curve
   			.c1({ x : 10, y : 15})
   			.c2({ x : 10, y : 25})
   			.c3({ x : 20, y : 25})
   			.c4({ x : 20, y : 15})

   		curve.pointCss(0).should.have.property('top');
   		curve.pointCss(0).should.have.property('left');

   	});

   	it('should return an object with x/y when using point()', function(){

   		var curve = bezier();

   		curve
   			.c1({ x : 10, y : 15})
   			.c2({ x : 10, y : 25})
   			.c3({ x : 20, y : 25})
   			.c4({ x : 20, y : 15})

   		curve.point(0).should.have.property('x');
   		curve.point(0).should.have.property('y');

   	});

   	it('should return the start of the curve at 0%', function(){

   		var curve = bezier();

   		curve
   			.c1({ x : 10, y : 15})
   			.c2({ x : 10, y : 25})
   			.c3({ x : 20, y : 25})
   			.c4({ x : 20, y : 15})

   		var point = curve.point(0);

   		point.x.should.equal(10);
   		point.y.should.equal(15);


   	});


   	it('should return the end of the curve at 100%', function(){

   		var curve = bezier();

   		curve
   			.c1({ x : 10, y : 15})
   			.c2({ x : 10, y : 25})
   			.c3({ x : 20, y : 25})
   			.c4({ x : 20, y : 15})

   		var point = curve.point(1);

   		point.x.should.equal(20);
   		point.y.should.equal(15);


   	});

   	it('should return the correct values for 50%', function(){

   		var curve = bezier();

   		curve
   			.c1({ x : 10, y : 15})
   			.c2({ x : 10, y : 25})
   			.c3({ x : 20, y : 25})
   			.c4({ x : 20, y : 15})

   		var point = curve.point(0.5);

   		point.x.should.equal(15);
   		point.y.should.equal(22.5);


   	});

   	it('should return the correct values for 25%', function(){

   		var curve = bezier();

   		curve
   			.c1({ x : 10, y : 15})
   			.c2({ x : 10, y : 25})
   			.c3({ x : 20, y : 25})
   			.c4({ x : 20, y : 15})

   		var point = curve.point(0.25);

   		point.x.should.equal(11.5625);
   		point.y.should.equal(20.625);


   	});

   	it('should return the correct values for 75%', function(){

   		var curve = bezier();

   		curve
   			.c1({ x : 10, y : 15})
   			.c2({ x : 10, y : 25})
   			.c3({ x : 20, y : 25})
   			.c4({ x : 20, y : 15})

   		var point = curve.point(0.75);

   		point.x.should.equal(18.4375);
   		point.y.should.equal(20.625);


   	});

});