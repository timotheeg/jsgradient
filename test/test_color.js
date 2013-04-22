var Color = require('../src/color.js');

exports.test_inards = function(test)
{
	var col = {r:10, g:20, b:30, a:0.5};

	test.deepEqual( new Color(col.r, col.g, col.b, col.a), col);
	test.done();
};

exports.test_exceptions = function(test)
{
	test.doesNotThrow( function(){ var c = new Color(0, 0, 0); }, "implicit alpha channel");
	test.doesNotThrow( function(){ var c = new Color(0, 0, 0, 0); }, "all channels at value 0");
	test.doesNotThrow( function(){ var c = new Color(0, 0, 0); }, "all color channels at value 0" );
	test.doesNotThrow( function(){ var c = new Color(255, 255, 255); }, "all color channel at value 255" );

	test.throws( function(){ var c = new Color(); }, "no arguments to constructor should throw" );
	test.throws( function(){ var c = new Color(256, 0, 0); }, "red channel out of range" );
	test.throws( function(){ var c = new Color(0, 256, 0); }, "green channel out of range" );
	test.throws( function(){ var c = new Color(0, 0, 256); }, "blue channel out of range" );
	test.throws( function(){ var c = new Color(0, 0, 0, 1.1); }, "alpha channel out of range" );

	test.done();
};


exports.test_construction_factory = function(test)
{
	var col = {r:255, g:0, b:0, a:1};

	test.deepEqual( Color.create(0xFF0000),    col);
	test.deepEqual( Color.create("#FF0000"),   col);
	test.deepEqual( Color.create("#F00"),      col);
	test.deepEqual( Color.create('red'),       col);
	test.deepEqual( Color.create([255, 0, 0]), col);
	test.deepEqual( Color.create(col),         col);
	test.done();
};


exports.test_base16_strings = function(test)
{
	var hexes = "0123456789ABCDEF".split('')
		, c
		, test_single_char = function(){ Color.createFromHexString("#" + c); }
		, test_double_chars = function(){ Color.createFromHexString("#" + c + c); }
		, test_triple_chars = function(){ Color.createFromHexString("#" + c + c + c); };

	for (var i in hexes)
	{
		c = hexes[i];
		test.doesNotThrow( test_single_char, "#" + c + " is valid" );
		test.doesNotThrow( test_double_chars, "#" + c + c + " is valid" );
		test.doesNotThrow( test_triple_chars, "#" + c + c + c + " is valid" );
	}

	// testing invalid hex char
	c = 'G';
	test.throws( test_single_char, "#" + c + " is not valid" );
	test.throws( test_double_chars, "#" + c + c + " is not valid" );
	test.throws( test_triple_chars, "#" + c + c + " is not valid" );

	test.done();
};


exports.test_default_alpha = function(test)
{
	test.equal( Color.create(0xFF0000).a, 1);
	test.done();
};


exports.test_exports = function(test)
{
	var col = {r:255, g:128, b:128, a:1};

	test.equal( Color.create(col).toInt(),        0xFF8080);
	test.equal( Color.create(col).toHexString(),  "#ff8080");
	test.equal( Color.create(col).toString(),     "#ff8080");
	test.equal( Color.create(col).toRGBAString(), "rgb(255,128,128)");

	col.a = 0.5;
	test.equal( Color.create(col).toRGBAString(), "rgba(255,128,128,0.5)");

	test.done();
};

exports.test_interpolation = function(test)
{
	var col1 = new Color(255, 0, 0, 0)
		, col2 = new Color(0, 0, 255, 1);

	test.deepEqual( col1.getMidColor(col2, 0), col1);
	test.deepEqual( col1.getMidColor(col2, 1), col2);

	test.deepEqual( col2.getMidColor(col1, 0), col2);
	test.deepEqual( col2.getMidColor(col1, 1), col1);

	test.deepEqual( col1.getMidColor(col2, 0.25), new Color(191, 0, 64, 0.25));
	test.deepEqual( col1.getMidColor(col2, 0.5), new Color(128, 0, 128, 0.5));
	test.deepEqual( col1.getMidColor(col2, 0.75), new Color(64, 0, 191, 0.75));

	test.done();
};