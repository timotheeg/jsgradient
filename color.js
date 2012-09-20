var Color = function(r, g, b, a)
{
	// todo normalize enties (0-255)
	this.r = r;
	this.g = g;
	this.b = b;
	this.a = (a === 0) ? 0 : (a||1);
}


Color.prototype.toRGBAString = function()
{
	var col = [this.r, this.g, this.b];
	return  (this.a >= 1 ? 'rgb(' : (col.push(this.a), 'rbga(')) + col.join(', ') + ')';
}

Color.prototype.getMidColor = function(targetCol, ratio)
{
	ratio = Math.max(0, Math.min(ratio, 1));
	return new Color(
		  this.r + (Math.round((targetCol.r - this.r) * ratio))
		, this.g + (Math.round((targetCol.g - this.g) * ratio))
		, this.b + (Math.round((targetCol.b - this.b) * ratio))
		, this.a + (Math.round((targetCol.a - this.a) * ratio))
	);
}

