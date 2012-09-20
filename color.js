var Color = function(r, g, b, a)
{
	this.r = Math.max(0, Math.min(r, 255));
	this.g = Math.max(0, Math.min(g, 255));
	this.b = Math.max(0, Math.min(b, 255));
	this.a = isNaN(a) ? 1 : Math.max(0, Math.min(a, 1));
}


Color.prototype.toRGBAString = function()
{
	var channels = [this.r, this.g, this.b];
	return  (this.a >= 1 ? 'rgb(' : (channels.push(this.a), 'rbga(')) + channels.join(', ') + ')';
}

Color.prototype.getMidColor = function(targetCol, ratio)
{
	ratio = isNaN(ratio) ? .5 : Math.max(0, Math.min(ratio, 1));
	return new Color(
		  this.r + (Math.round((targetCol.r - this.r) * ratio))
		, this.g + (Math.round((targetCol.g - this.g) * ratio))
		, this.b + (Math.round((targetCol.b - this.b) * ratio))
		, this.a + (Math.round((targetCol.a - this.a) * ratio))
	);
}

