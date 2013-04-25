var Color = require('../src/color.js');
var Gradient = require('../src/gradient.js');


exports.test_construction = function(test)
{
	var col1 = [255, 0, 0, 0];
	var col2 = [0, 0, 255, 1];

	test.throws( function(){ new Gradient(); });
	test.throws( function(){ new Gradient(col1); });
	test.doesNotThrow( function(){ new Gradient(col1, col2); });

	test.done();
};


exports.test_2_color_interpolation = function(test)
{
	var col1 = new Color(255, 0, 0, 0);
	var col2 = new Color(0, 0, 255, 1);

	var grad = new Gradient(col1, col2);

	test.deepEqual( grad.getColorAt(0), col1);
	test.deepEqual( grad.getColorAt(0.25), new Color(191, 0, 64, 0.25));
	test.deepEqual( grad.getColorAt(0.5), new Color(128, 0, 128, 0.5));
	test.deepEqual( grad.getColorAt(0.75), new Color(64, 0, 191, 0.75));
	test.deepEqual( grad.getColorAt(1), col2);

	test.done();
};


exports.test_3_color_equidistant_interpolation = function(test)
{
	var col1 = new Color(255, 0, 0, 0);
	var col2 = new Color(0, 255, 0, 1);
	var col3 = new Color(0, 0, 255, 1);

	var grad = new Gradient(col1, col2, col3);

	test.deepEqual( grad.getColorAt(0), col1);
	test.deepEqual( grad.getColorAt(0.25), new Color(128, 128, 0, 0.5));
	test.deepEqual( grad.getColorAt(0.5), col2);
	test.deepEqual( grad.getColorAt(0.75), new Color(0, 128, 128, 1));
	test.deepEqual( grad.getColorAt(1), col3);

	test.done();
};


exports.test_3_color_custom_distance_interpolation = function(test)
{
	var col1 = new Color(255, 0, 0, 0);
	var col2 = new Color(0, 255, 0, 1);
	var col3 = new Color(0, 0, 255, 1);

	var grad = new Gradient(col1, col3);
	grad.addColor(0.75, col2);

	test.deepEqual( grad.getColorAt(0), col1);
	test.deepEqual( grad.getColorAt(0.25), new Color(170, 85, 0, 1/3));
	test.deepEqual( grad.getColorAt(0.5), new Color(85, 170, 0, 2/3));
	test.deepEqual( grad.getColorAt(0.75), col2);
	test.deepEqual( grad.getColorAt(1), col3);

	test.done();
};

exports.test_immutability = function(test)
{
	var col1 = new Color(255, 0, 0, 0);
	var col2 = new Color(0, 0, 255, 1);

	var grad = new Gradient(col1, col2);

	test.deepEqual( grad.getColorAt(0), col1);

	// deep structural change
	col1.g = 255;

	test.notDeepEqual( grad.getColorAt(0), col1);
	test.deepEqual( grad.getColorAt(0), new Color(255, 0, 0, 0));

	test.done();
};
