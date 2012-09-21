jsgradient
==========

Simple Gradient management library in js, useful to create heatmaps

Warning: this tiny lib is not suited to draw or animate (it has no knowlege of the DOM); for that you might want to look at jquery and jquery-color. 

The purpose of the lib is to allow you to define Gradients with an arbitrary number of colors to represent a color-based continuous scale, and determine what color you need to pick for a given position on the scale.

For example, if you want to make a table representing success and failure ratios of a number of tests with color information, going from all fail (red), to all pass (green), with yellow for 50%, The Gradient class allows you to determine what color to set the background of each cell in the table.

Code samples:

(Equidistant gradient)
```javascript
var grad = new Gradient('red', 'yellow', 'green');
console.log( grad.getColorAt(0).toHexString() );   // #ff0000 
console.log( grad.getColorAt(0.5).toHexString() ); // #ffff00 
console.log( grad.getColorAt(0.3).toHexString() ); // #ff9900
console.log( grad.getColorAt(0.9).toHexString() ); // #339900
```

Several "definitions" of colors can be provided (RGBA only for now). See test.html for some example of the way colors can be passed to the gradient.

Features:
* linear gradients with arbitrary number of colors
* arbitrary distance between colors supported in the gradient dfinition
* multiple color definitions (hex strings, (some) named colors, 32 bit ints, Color objects)
