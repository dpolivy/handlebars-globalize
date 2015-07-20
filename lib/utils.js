var _extend = function(obj) {
	Array.prototype.slice.call(arguments, 1).forEach(function(source) {
		if (source) {
			for (var prop in source) {
				obj[prop] = source[prop];
			}
		}
	});
	return obj;
};

// Return a copy of the object without the blacklisted properties.
var _omit = function(obj) {
	var copy = {};
	var keys = Array.prototype.concat.apply(Array.prototype, Array.prototype.slice.call(arguments, 1));
	for (var key in obj) {
		if (keys.indexOf(key) === -1) copy[key] = obj[key];
	}
	return copy;
};

module.exports = {
	extend: _extend,
	omit: _omit
};