jsgradient
==========

Simple Gradient management library in js, useful to create heatmaps

This tiny lib is not suited to draw or animate, for that you might want to look at jquery and jquery-color. 

The purpose of the lib is to allow you to define Graidnet with an arbitrary number of colors to represent a color-based continuous scale, and determine what color you need to pick for a given position on the scale. 

For example, if you want to make a table representing success and failure ratios of a number of tests, going from all fail (red), to all pass (green), with yellow for 50%, The Gradient class allows you to determine what color to set the background of each cell in the table.

Code samples:

(Equidistant gradient)
```javascript
var grad = new Gradient('red', 'yellow', 'green');
console.log( grad.getColorAt(0.5).toHexString() ); // #ffff00 
console.log( grad.getColorAt(0.3).toHexString() ); // #ff9900
console.log( grad.getColorAt(0.9).toHexString() ); // #339900
```
