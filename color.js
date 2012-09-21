(function(undefined)
{
	Color = function(r, g, b, a)
	{
		this.r = Math.max(0, Math.min(r, 255));
		this.g = Math.max(0, Math.min(g, 255));
		this.b = Math.max(0, Math.min(b, 255));
		this.a = isNaN(a) ? 1 : Math.max(0, Math.min(a, 1));
	}

	Color.create = function(entry)
	{
		if (entry instanceof Color) return entry;

		var ztype = typeof(entry);
		if (ztype == "number")
		{
			entry = Math.round(entry);
			return new Color(
				  (entry & 0xff0000) >> 16
				, (entry & 0xff00) >> 8
				, (entry & 0xff)
			);
		}
		else if (ztype == "string")
		{
			entry = entry.toLowerCase();
			if (named_cache[entry]) return named_cache[entry];
			if (named[entry]) return named_cache[entry] = this.parseHexString(named[entry]);
			return this.parseHexString(entry);
		}
		else if (ztype == "object")
		{
			if (!(isNaN(entry.r) || isNaN(entry.g) || isNaN(entry.b)))
			{
				return new Color(entry.r, entry.g, entry.b, entry.a);
			} 
		}

		throw "Not a color";
	}

	
	// regexps will only be lazy-initialized
	var res = null;
	Color.parseHexString = function(s)
	{
		if (!res)
		{
			res = [
				  [new RegExp('^#([0-9a-f])$'), function(m)
				  {
					var v = parseInt(m[1] + m[1], 16);
					return new Color(v, v, v);
				  }]
				, [new RegExp('^#([0-9a-f]{2})$'), function(m)
				  {
					var v = parseInt(m[1], 16); 
					return new Color(v, v, v);
				  }]
				, [new RegExp('^#([0-9a-f]{3})$'), function(m)
				  {
					var s = m[1]; 
					return new Color(
						  parseInt(s.charAt(0) + s.charAt(0), 16)
						, parseInt(s.charAt(1) + s.charAt(1), 16) 
						, parseInt(s.charAt(2) + s.charAt(2), 16)
					);
				  }]
				, [new RegExp('^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$'), function(m)
				  {
					return new Color(
						  parseInt(m[1], 16)
						, parseInt(m[2], 16)
						, parseInt(m[3], 16)
					);
				  }]
			];
		}

		var m;
		for (idx=res.length; idx-->0;)
		{
			if (m = res[idx][0].exec(s)) return res[idx][1](m);
		}

		throw "Not a valid hex color";
	}


	var p = Color.prototype;
	p.toRGBAString = function()
	{
		var channels = [this.r, this.g, this.b];
		return  (this.a >= 1 ? 'rgb(' : (channels.push(this.a), 'rbga(')) + channels.join(', ') + ')';
	}

	p.toHexString = function()
	{
		var r = this.r.toString(16);
		var g = this.g.toString(16);
		var b = this.b.toString(16);
		return '#'
			+ (r.length < 2 ? '0' : '' ) + r
			+ (g.length < 2 ? '0' : '' ) + g
			+ (b.length < 2 ? '0' : '' ) + b;
	}

	p.toString = p.toHexString;

	p.getMidColor = function(targetCol, ratio)
	{
		ratio = isNaN(ratio) ? .5 : Math.max(0, Math.min(ratio, 1));
		return new Color(
			  this.r + (Math.round((targetCol.r - this.r) * ratio))
			, this.g + (Math.round((targetCol.g - this.g) * ratio))
			, this.b + (Math.round((targetCol.b - this.b) * ratio))
			, this.a + (Math.round((targetCol.a - this.a) * ratio))
		);
	}

	var named_cache = {}, named = {
		     aqua: "#0ff"
		,   black: "#0"
		,    blue: "#00f"
		, fuchsia: "#f0f"
		,    grey: "#80"
		,    gray: "#80"
		,   green: "#008000"
		,    lime: "#0f0"
		,  maroon: "#800000"
		,    navy: "#000080"
		,   olive: "#808000"
		,  purple: "#800080"
		,     red: "#f00"
		,  silver: "#c0"
		,    teal: "#008080"
		,   white: "#f"
		,  yellow: "#ff0"
	};
	
})();
