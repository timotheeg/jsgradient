Gradient = function(/*variable length Color objects*/)
{
	// constructor assume equidistant colors
	var len = arguments.length;
	if (len <= 1 ) throw "A Gradient needs at least 2 colors";

	var step = 1 / (len-1);
	var cur = 0;
	var m = this.markers = [];
	for(var idx=0; idx<len; idx++, cur+=step)
	{
		m.push({val: cur, col: arguments[idx]});
	}

	// to prevent potential float errors, we set last entry explicitely as 1;
	m[len-1].val=1;
}

Gradient.prototype.addColor = function(val, col)
{
	// add a color, garanteeing the markers array os ordered by value
	var m = this.markers;
	val = Math.max(0, Math.min(val, 1));
	for (var idx=m.length; idx-->0;)
	{
		if (val === m[idx].val)
		{
			m[idx].col = col;
			break;
		}
		else if (val > m[idx].val)
		{
			m.splice(idx + 1, 0, {val: val, col: col});
			break;
		}
	};
}

Gradient.prototype.getColorAt = function(ratio)
{
	// 1. find slice where ratio falls
	var m = this.markers;
	val = Math.max(0, Math.min(ratio, 1));
	for (var idx=m.length; idx-->0;)
	{
		if (ratio === m[idx].val)
		{
			return m[idx].col;
		}
		if (ratio > m[idx].val)
		{
			// 2. normalize ratio within slice
			var slice_ratio = (ratio - m[idx].val) / (m[idx+1].val - m[idx].val);
			return m[idx].col.getMidColor(m[idx+1].col, slice_ratio);
		}
	};
	// should never reach here!
	throw "Something's fucked up!";
}

