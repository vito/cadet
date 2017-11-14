
(function() {
'use strict';

function F2(fun)
{
  function wrapper(a) { return function(b) { return fun(a,b); }; }
  wrapper.arity = 2;
  wrapper.func = fun;
  return wrapper;
}

function F3(fun)
{
  function wrapper(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  }
  wrapper.arity = 3;
  wrapper.func = fun;
  return wrapper;
}

function F4(fun)
{
  function wrapper(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  }
  wrapper.arity = 4;
  wrapper.func = fun;
  return wrapper;
}

function F5(fun)
{
  function wrapper(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  }
  wrapper.arity = 5;
  wrapper.func = fun;
  return wrapper;
}

function F6(fun)
{
  function wrapper(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  }
  wrapper.arity = 6;
  wrapper.func = fun;
  return wrapper;
}

function F7(fun)
{
  function wrapper(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  }
  wrapper.arity = 7;
  wrapper.func = fun;
  return wrapper;
}

function F8(fun)
{
  function wrapper(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  }
  wrapper.arity = 8;
  wrapper.func = fun;
  return wrapper;
}

function F9(fun)
{
  function wrapper(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  }
  wrapper.arity = 9;
  wrapper.func = fun;
  return wrapper;
}

function A2(fun, a, b)
{
  return fun.arity === 2
    ? fun.func(a, b)
    : fun(a)(b);
}
function A3(fun, a, b, c)
{
  return fun.arity === 3
    ? fun.func(a, b, c)
    : fun(a)(b)(c);
}
function A4(fun, a, b, c, d)
{
  return fun.arity === 4
    ? fun.func(a, b, c, d)
    : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e)
{
  return fun.arity === 5
    ? fun.func(a, b, c, d, e)
    : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f)
{
  return fun.arity === 6
    ? fun.func(a, b, c, d, e, f)
    : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g)
{
  return fun.arity === 7
    ? fun.func(a, b, c, d, e, f, g)
    : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h)
{
  return fun.arity === 8
    ? fun.func(a, b, c, d, e, f, g, h)
    : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i)
{
  return fun.arity === 9
    ? fun.func(a, b, c, d, e, f, g, h, i)
    : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}

//import Native.Utils //

var _elm_lang$core$Native_Basics = function() {

function div(a, b)
{
	return (a / b) | 0;
}
function rem(a, b)
{
	return a % b;
}
function mod(a, b)
{
	if (b === 0)
	{
		throw new Error('Cannot perform mod 0. Division by zero error.');
	}
	var r = a % b;
	var m = a === 0 ? 0 : (b > 0 ? (a >= 0 ? r : r + b) : -mod(-a, -b));

	return m === b ? 0 : m;
}
function logBase(base, n)
{
	return Math.log(n) / Math.log(base);
}
function negate(n)
{
	return -n;
}
function abs(n)
{
	return n < 0 ? -n : n;
}

function min(a, b)
{
	return _elm_lang$core$Native_Utils.cmp(a, b) < 0 ? a : b;
}
function max(a, b)
{
	return _elm_lang$core$Native_Utils.cmp(a, b) > 0 ? a : b;
}
function clamp(lo, hi, n)
{
	return _elm_lang$core$Native_Utils.cmp(n, lo) < 0
		? lo
		: _elm_lang$core$Native_Utils.cmp(n, hi) > 0
			? hi
			: n;
}

var ord = ['LT', 'EQ', 'GT'];

function compare(x, y)
{
	return { ctor: ord[_elm_lang$core$Native_Utils.cmp(x, y) + 1] };
}

function xor(a, b)
{
	return a !== b;
}
function not(b)
{
	return !b;
}
function isInfinite(n)
{
	return n === Infinity || n === -Infinity;
}

function truncate(n)
{
	return n | 0;
}

function degrees(d)
{
	return d * Math.PI / 180;
}
function turns(t)
{
	return 2 * Math.PI * t;
}
function fromPolar(point)
{
	var r = point._0;
	var t = point._1;
	return _elm_lang$core$Native_Utils.Tuple2(r * Math.cos(t), r * Math.sin(t));
}
function toPolar(point)
{
	var x = point._0;
	var y = point._1;
	return _elm_lang$core$Native_Utils.Tuple2(Math.sqrt(x * x + y * y), Math.atan2(y, x));
}

return {
	div: F2(div),
	rem: F2(rem),
	mod: F2(mod),

	pi: Math.PI,
	e: Math.E,
	cos: Math.cos,
	sin: Math.sin,
	tan: Math.tan,
	acos: Math.acos,
	asin: Math.asin,
	atan: Math.atan,
	atan2: F2(Math.atan2),

	degrees: degrees,
	turns: turns,
	fromPolar: fromPolar,
	toPolar: toPolar,

	sqrt: Math.sqrt,
	logBase: F2(logBase),
	negate: negate,
	abs: abs,
	min: F2(min),
	max: F2(max),
	clamp: F3(clamp),
	compare: F2(compare),

	xor: F2(xor),
	not: not,

	truncate: truncate,
	ceiling: Math.ceil,
	floor: Math.floor,
	round: Math.round,
	toFloat: function(x) { return x; },
	isNaN: isNaN,
	isInfinite: isInfinite
};

}();
//import //

var _elm_lang$core$Native_Utils = function() {

// COMPARISONS

function eq(x, y)
{
	var stack = [];
	var isEqual = eqHelp(x, y, 0, stack);
	var pair;
	while (isEqual && (pair = stack.pop()))
	{
		isEqual = eqHelp(pair.x, pair.y, 0, stack);
	}
	return isEqual;
}


function eqHelp(x, y, depth, stack)
{
	if (depth > 100)
	{
		stack.push({ x: x, y: y });
		return true;
	}

	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object')
	{
		if (typeof x === 'function')
		{
			throw new Error(
				'Trying to use `(==)` on functions. There is no way to know if functions are "the same" in the Elm sense.'
				+ ' Read more about this at http://package.elm-lang.org/packages/elm-lang/core/latest/Basics#=='
				+ ' which describes why it is this way and what the better version will look like.'
			);
		}
		return false;
	}

	if (x === null || y === null)
	{
		return false
	}

	if (x instanceof Date)
	{
		return x.getTime() === y.getTime();
	}

	if (!('ctor' in x))
	{
		for (var key in x)
		{
			if (!eqHelp(x[key], y[key], depth + 1, stack))
			{
				return false;
			}
		}
		return true;
	}

	// convert Dicts and Sets to lists
	if (x.ctor === 'RBNode_elm_builtin' || x.ctor === 'RBEmpty_elm_builtin')
	{
		x = _elm_lang$core$Dict$toList(x);
		y = _elm_lang$core$Dict$toList(y);
	}
	if (x.ctor === 'Set_elm_builtin')
	{
		x = _elm_lang$core$Set$toList(x);
		y = _elm_lang$core$Set$toList(y);
	}

	// check if lists are equal without recursion
	if (x.ctor === '::')
	{
		var a = x;
		var b = y;
		while (a.ctor === '::' && b.ctor === '::')
		{
			if (!eqHelp(a._0, b._0, depth + 1, stack))
			{
				return false;
			}
			a = a._1;
			b = b._1;
		}
		return a.ctor === b.ctor;
	}

	// check if Arrays are equal
	if (x.ctor === '_Array')
	{
		var xs = _elm_lang$core$Native_Array.toJSArray(x);
		var ys = _elm_lang$core$Native_Array.toJSArray(y);
		if (xs.length !== ys.length)
		{
			return false;
		}
		for (var i = 0; i < xs.length; i++)
		{
			if (!eqHelp(xs[i], ys[i], depth + 1, stack))
			{
				return false;
			}
		}
		return true;
	}

	if (!eqHelp(x.ctor, y.ctor, depth + 1, stack))
	{
		return false;
	}

	for (var key in x)
	{
		if (!eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

var LT = -1, EQ = 0, GT = 1;

function cmp(x, y)
{
	if (typeof x !== 'object')
	{
		return x === y ? EQ : x < y ? LT : GT;
	}

	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? EQ : a < b ? LT : GT;
	}

	if (x.ctor === '::' || x.ctor === '[]')
	{
		while (x.ctor === '::' && y.ctor === '::')
		{
			var ord = cmp(x._0, y._0);
			if (ord !== EQ)
			{
				return ord;
			}
			x = x._1;
			y = y._1;
		}
		return x.ctor === y.ctor ? EQ : x.ctor === '[]' ? LT : GT;
	}

	if (x.ctor.slice(0, 6) === '_Tuple')
	{
		var ord;
		var n = x.ctor.slice(6) - 0;
		var err = 'cannot compare tuples with more than 6 elements.';
		if (n === 0) return EQ;
		if (n >= 1) { ord = cmp(x._0, y._0); if (ord !== EQ) return ord;
		if (n >= 2) { ord = cmp(x._1, y._1); if (ord !== EQ) return ord;
		if (n >= 3) { ord = cmp(x._2, y._2); if (ord !== EQ) return ord;
		if (n >= 4) { ord = cmp(x._3, y._3); if (ord !== EQ) return ord;
		if (n >= 5) { ord = cmp(x._4, y._4); if (ord !== EQ) return ord;
		if (n >= 6) { ord = cmp(x._5, y._5); if (ord !== EQ) return ord;
		if (n >= 7) throw new Error('Comparison error: ' + err); } } } } } }
		return EQ;
	}

	throw new Error(
		'Comparison error: comparison is only defined on ints, '
		+ 'floats, times, chars, strings, lists of comparable values, '
		+ 'and tuples of comparable values.'
	);
}


// COMMON VALUES

var Tuple0 = {
	ctor: '_Tuple0'
};

function Tuple2(x, y)
{
	return {
		ctor: '_Tuple2',
		_0: x,
		_1: y
	};
}

function chr(c)
{
	return new String(c);
}


// GUID

var count = 0;
function guid(_)
{
	return count++;
}


// RECORDS

function update(oldRecord, updatedFields)
{
	var newRecord = {};

	for (var key in oldRecord)
	{
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
	}

	return newRecord;
}


//// LIST STUFF ////

var Nil = { ctor: '[]' };

function Cons(hd, tl)
{
	return {
		ctor: '::',
		_0: hd,
		_1: tl
	};
}

function append(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (xs.ctor === '[]')
	{
		return ys;
	}
	var root = Cons(xs._0, Nil);
	var curr = root;
	xs = xs._1;
	while (xs.ctor !== '[]')
	{
		curr._1 = Cons(xs._0, Nil);
		xs = xs._1;
		curr = curr._1;
	}
	curr._1 = ys;
	return root;
}


// CRASHES

function crash(moduleName, region)
{
	return function(message) {
		throw new Error(
			'Ran into a `Debug.crash` in module `' + moduleName + '` ' + regionToString(region) + '\n'
			+ 'The message provided by the code author is:\n\n    '
			+ message
		);
	};
}

function crashCase(moduleName, region, value)
{
	return function(message) {
		throw new Error(
			'Ran into a `Debug.crash` in module `' + moduleName + '`\n\n'
			+ 'This was caused by the `case` expression ' + regionToString(region) + '.\n'
			+ 'One of the branches ended with a crash and the following value got through:\n\n    ' + toString(value) + '\n\n'
			+ 'The message provided by the code author is:\n\n    '
			+ message
		);
	};
}

function regionToString(region)
{
	if (region.start.line == region.end.line)
	{
		return 'on line ' + region.start.line;
	}
	return 'between lines ' + region.start.line + ' and ' + region.end.line;
}


// TO STRING

function toString(v)
{
	var type = typeof v;
	if (type === 'function')
	{
		return '<function>';
	}

	if (type === 'boolean')
	{
		return v ? 'True' : 'False';
	}

	if (type === 'number')
	{
		return v + '';
	}

	if (v instanceof String)
	{
		return '\'' + addSlashes(v, true) + '\'';
	}

	if (type === 'string')
	{
		return '"' + addSlashes(v, false) + '"';
	}

	if (v === null)
	{
		return 'null';
	}

	if (type === 'object' && 'ctor' in v)
	{
		var ctorStarter = v.ctor.substring(0, 5);

		if (ctorStarter === '_Tupl')
		{
			var output = [];
			for (var k in v)
			{
				if (k === 'ctor') continue;
				output.push(toString(v[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (ctorStarter === '_Task')
		{
			return '<task>'
		}

		if (v.ctor === '_Array')
		{
			var list = _elm_lang$core$Array$toList(v);
			return 'Array.fromList ' + toString(list);
		}

		if (v.ctor === '<decoder>')
		{
			return '<decoder>';
		}

		if (v.ctor === '_Process')
		{
			return '<process:' + v.id + '>';
		}

		if (v.ctor === '::')
		{
			var output = '[' + toString(v._0);
			v = v._1;
			while (v.ctor === '::')
			{
				output += ',' + toString(v._0);
				v = v._1;
			}
			return output + ']';
		}

		if (v.ctor === '[]')
		{
			return '[]';
		}

		if (v.ctor === 'Set_elm_builtin')
		{
			return 'Set.fromList ' + toString(_elm_lang$core$Set$toList(v));
		}

		if (v.ctor === 'RBNode_elm_builtin' || v.ctor === 'RBEmpty_elm_builtin')
		{
			return 'Dict.fromList ' + toString(_elm_lang$core$Dict$toList(v));
		}

		var output = '';
		for (var i in v)
		{
			if (i === 'ctor') continue;
			var str = toString(v[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return v.ctor + output;
	}

	if (type === 'object')
	{
		if (v instanceof Date)
		{
			return '<' + v.toString() + '>';
		}

		if (v.elm_web_socket)
		{
			return '<websocket>';
		}

		var output = [];
		for (var k in v)
		{
			output.push(k + ' = ' + toString(v[k]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return '<internal structure>';
}

function addSlashes(str, isChar)
{
	var s = str.replace(/\\/g, '\\\\')
			  .replace(/\n/g, '\\n')
			  .replace(/\t/g, '\\t')
			  .replace(/\r/g, '\\r')
			  .replace(/\v/g, '\\v')
			  .replace(/\0/g, '\\0');
	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}


return {
	eq: eq,
	cmp: cmp,
	Tuple0: Tuple0,
	Tuple2: Tuple2,
	chr: chr,
	update: update,
	guid: guid,

	append: F2(append),

	crash: crash,
	crashCase: crashCase,

	toString: toString
};

}();
var _elm_lang$core$Basics$never = function (_p0) {
	never:
	while (true) {
		var _p1 = _p0;
		var _v1 = _p1._0;
		_p0 = _v1;
		continue never;
	}
};
var _elm_lang$core$Basics$uncurry = F2(
	function (f, _p2) {
		var _p3 = _p2;
		return A2(f, _p3._0, _p3._1);
	});
var _elm_lang$core$Basics$curry = F3(
	function (f, a, b) {
		return f(
			{ctor: '_Tuple2', _0: a, _1: b});
	});
var _elm_lang$core$Basics$flip = F3(
	function (f, b, a) {
		return A2(f, a, b);
	});
var _elm_lang$core$Basics$always = F2(
	function (a, _p4) {
		return a;
	});
var _elm_lang$core$Basics$identity = function (x) {
	return x;
};
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['<|'] = F2(
	function (f, x) {
		return f(x);
	});
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['|>'] = F2(
	function (x, f) {
		return f(x);
	});
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['>>'] = F3(
	function (f, g, x) {
		return g(
			f(x));
	});
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['<<'] = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['++'] = _elm_lang$core$Native_Utils.append;
var _elm_lang$core$Basics$toString = _elm_lang$core$Native_Utils.toString;
var _elm_lang$core$Basics$isInfinite = _elm_lang$core$Native_Basics.isInfinite;
var _elm_lang$core$Basics$isNaN = _elm_lang$core$Native_Basics.isNaN;
var _elm_lang$core$Basics$toFloat = _elm_lang$core$Native_Basics.toFloat;
var _elm_lang$core$Basics$ceiling = _elm_lang$core$Native_Basics.ceiling;
var _elm_lang$core$Basics$floor = _elm_lang$core$Native_Basics.floor;
var _elm_lang$core$Basics$truncate = _elm_lang$core$Native_Basics.truncate;
var _elm_lang$core$Basics$round = _elm_lang$core$Native_Basics.round;
var _elm_lang$core$Basics$not = _elm_lang$core$Native_Basics.not;
var _elm_lang$core$Basics$xor = _elm_lang$core$Native_Basics.xor;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['||'] = _elm_lang$core$Native_Basics.or;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['&&'] = _elm_lang$core$Native_Basics.and;
var _elm_lang$core$Basics$max = _elm_lang$core$Native_Basics.max;
var _elm_lang$core$Basics$min = _elm_lang$core$Native_Basics.min;
var _elm_lang$core$Basics$compare = _elm_lang$core$Native_Basics.compare;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['>='] = _elm_lang$core$Native_Basics.ge;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['<='] = _elm_lang$core$Native_Basics.le;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['>'] = _elm_lang$core$Native_Basics.gt;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['<'] = _elm_lang$core$Native_Basics.lt;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['/='] = _elm_lang$core$Native_Basics.neq;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['=='] = _elm_lang$core$Native_Basics.eq;
var _elm_lang$core$Basics$e = _elm_lang$core$Native_Basics.e;
var _elm_lang$core$Basics$pi = _elm_lang$core$Native_Basics.pi;
var _elm_lang$core$Basics$clamp = _elm_lang$core$Native_Basics.clamp;
var _elm_lang$core$Basics$logBase = _elm_lang$core$Native_Basics.logBase;
var _elm_lang$core$Basics$abs = _elm_lang$core$Native_Basics.abs;
var _elm_lang$core$Basics$negate = _elm_lang$core$Native_Basics.negate;
var _elm_lang$core$Basics$sqrt = _elm_lang$core$Native_Basics.sqrt;
var _elm_lang$core$Basics$atan2 = _elm_lang$core$Native_Basics.atan2;
var _elm_lang$core$Basics$atan = _elm_lang$core$Native_Basics.atan;
var _elm_lang$core$Basics$asin = _elm_lang$core$Native_Basics.asin;
var _elm_lang$core$Basics$acos = _elm_lang$core$Native_Basics.acos;
var _elm_lang$core$Basics$tan = _elm_lang$core$Native_Basics.tan;
var _elm_lang$core$Basics$sin = _elm_lang$core$Native_Basics.sin;
var _elm_lang$core$Basics$cos = _elm_lang$core$Native_Basics.cos;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['^'] = _elm_lang$core$Native_Basics.exp;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['%'] = _elm_lang$core$Native_Basics.mod;
var _elm_lang$core$Basics$rem = _elm_lang$core$Native_Basics.rem;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['//'] = _elm_lang$core$Native_Basics.div;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['/'] = _elm_lang$core$Native_Basics.floatDiv;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['*'] = _elm_lang$core$Native_Basics.mul;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['-'] = _elm_lang$core$Native_Basics.sub;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['+'] = _elm_lang$core$Native_Basics.add;
var _elm_lang$core$Basics$toPolar = _elm_lang$core$Native_Basics.toPolar;
var _elm_lang$core$Basics$fromPolar = _elm_lang$core$Native_Basics.fromPolar;
var _elm_lang$core$Basics$turns = _elm_lang$core$Native_Basics.turns;
var _elm_lang$core$Basics$degrees = _elm_lang$core$Native_Basics.degrees;
var _elm_lang$core$Basics$radians = function (t) {
	return t;
};
var _elm_lang$core$Basics$GT = {ctor: 'GT'};
var _elm_lang$core$Basics$EQ = {ctor: 'EQ'};
var _elm_lang$core$Basics$LT = {ctor: 'LT'};
var _elm_lang$core$Basics$JustOneMore = function (a) {
	return {ctor: 'JustOneMore', _0: a};
};

//import Native.Utils //

var _elm_lang$core$Native_Debug = function() {

function log(tag, value)
{
	var msg = tag + ': ' + _elm_lang$core$Native_Utils.toString(value);
	var process = process || {};
	if (process.stdout)
	{
		process.stdout.write(msg);
	}
	else
	{
		console.log(msg);
	}
	return value;
}

function crash(message)
{
	throw new Error(message);
}

return {
	crash: crash,
	log: F2(log)
};

}();
var _elm_lang$core$Debug$crash = _elm_lang$core$Native_Debug.crash;
var _elm_lang$core$Debug$log = _elm_lang$core$Native_Debug.log;

var _elm_lang$core$Maybe$withDefault = F2(
	function ($default, maybe) {
		var _p0 = maybe;
		if (_p0.ctor === 'Just') {
			return _p0._0;
		} else {
			return $default;
		}
	});
var _elm_lang$core$Maybe$Nothing = {ctor: 'Nothing'};
var _elm_lang$core$Maybe$andThen = F2(
	function (callback, maybeValue) {
		var _p1 = maybeValue;
		if (_p1.ctor === 'Just') {
			return callback(_p1._0);
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _elm_lang$core$Maybe$Just = function (a) {
	return {ctor: 'Just', _0: a};
};
var _elm_lang$core$Maybe$map = F2(
	function (f, maybe) {
		var _p2 = maybe;
		if (_p2.ctor === 'Just') {
			return _elm_lang$core$Maybe$Just(
				f(_p2._0));
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _elm_lang$core$Maybe$map2 = F3(
	function (func, ma, mb) {
		var _p3 = {ctor: '_Tuple2', _0: ma, _1: mb};
		if (((_p3.ctor === '_Tuple2') && (_p3._0.ctor === 'Just')) && (_p3._1.ctor === 'Just')) {
			return _elm_lang$core$Maybe$Just(
				A2(func, _p3._0._0, _p3._1._0));
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _elm_lang$core$Maybe$map3 = F4(
	function (func, ma, mb, mc) {
		var _p4 = {ctor: '_Tuple3', _0: ma, _1: mb, _2: mc};
		if ((((_p4.ctor === '_Tuple3') && (_p4._0.ctor === 'Just')) && (_p4._1.ctor === 'Just')) && (_p4._2.ctor === 'Just')) {
			return _elm_lang$core$Maybe$Just(
				A3(func, _p4._0._0, _p4._1._0, _p4._2._0));
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _elm_lang$core$Maybe$map4 = F5(
	function (func, ma, mb, mc, md) {
		var _p5 = {ctor: '_Tuple4', _0: ma, _1: mb, _2: mc, _3: md};
		if (((((_p5.ctor === '_Tuple4') && (_p5._0.ctor === 'Just')) && (_p5._1.ctor === 'Just')) && (_p5._2.ctor === 'Just')) && (_p5._3.ctor === 'Just')) {
			return _elm_lang$core$Maybe$Just(
				A4(func, _p5._0._0, _p5._1._0, _p5._2._0, _p5._3._0));
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _elm_lang$core$Maybe$map5 = F6(
	function (func, ma, mb, mc, md, me) {
		var _p6 = {ctor: '_Tuple5', _0: ma, _1: mb, _2: mc, _3: md, _4: me};
		if ((((((_p6.ctor === '_Tuple5') && (_p6._0.ctor === 'Just')) && (_p6._1.ctor === 'Just')) && (_p6._2.ctor === 'Just')) && (_p6._3.ctor === 'Just')) && (_p6._4.ctor === 'Just')) {
			return _elm_lang$core$Maybe$Just(
				A5(func, _p6._0._0, _p6._1._0, _p6._2._0, _p6._3._0, _p6._4._0));
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});

//import Native.Utils //

var _elm_lang$core$Native_List = function() {

var Nil = { ctor: '[]' };

function Cons(hd, tl)
{
	return { ctor: '::', _0: hd, _1: tl };
}

function fromArray(arr)
{
	var out = Nil;
	for (var i = arr.length; i--; )
	{
		out = Cons(arr[i], out);
	}
	return out;
}

function toArray(xs)
{
	var out = [];
	while (xs.ctor !== '[]')
	{
		out.push(xs._0);
		xs = xs._1;
	}
	return out;
}

function foldr(f, b, xs)
{
	var arr = toArray(xs);
	var acc = b;
	for (var i = arr.length; i--; )
	{
		acc = A2(f, arr[i], acc);
	}
	return acc;
}

function map2(f, xs, ys)
{
	var arr = [];
	while (xs.ctor !== '[]' && ys.ctor !== '[]')
	{
		arr.push(A2(f, xs._0, ys._0));
		xs = xs._1;
		ys = ys._1;
	}
	return fromArray(arr);
}

function map3(f, xs, ys, zs)
{
	var arr = [];
	while (xs.ctor !== '[]' && ys.ctor !== '[]' && zs.ctor !== '[]')
	{
		arr.push(A3(f, xs._0, ys._0, zs._0));
		xs = xs._1;
		ys = ys._1;
		zs = zs._1;
	}
	return fromArray(arr);
}

function map4(f, ws, xs, ys, zs)
{
	var arr = [];
	while (   ws.ctor !== '[]'
		   && xs.ctor !== '[]'
		   && ys.ctor !== '[]'
		   && zs.ctor !== '[]')
	{
		arr.push(A4(f, ws._0, xs._0, ys._0, zs._0));
		ws = ws._1;
		xs = xs._1;
		ys = ys._1;
		zs = zs._1;
	}
	return fromArray(arr);
}

function map5(f, vs, ws, xs, ys, zs)
{
	var arr = [];
	while (   vs.ctor !== '[]'
		   && ws.ctor !== '[]'
		   && xs.ctor !== '[]'
		   && ys.ctor !== '[]'
		   && zs.ctor !== '[]')
	{
		arr.push(A5(f, vs._0, ws._0, xs._0, ys._0, zs._0));
		vs = vs._1;
		ws = ws._1;
		xs = xs._1;
		ys = ys._1;
		zs = zs._1;
	}
	return fromArray(arr);
}

function sortBy(f, xs)
{
	return fromArray(toArray(xs).sort(function(a, b) {
		return _elm_lang$core$Native_Utils.cmp(f(a), f(b));
	}));
}

function sortWith(f, xs)
{
	return fromArray(toArray(xs).sort(function(a, b) {
		var ord = f(a)(b).ctor;
		return ord === 'EQ' ? 0 : ord === 'LT' ? -1 : 1;
	}));
}

return {
	Nil: Nil,
	Cons: Cons,
	cons: F2(Cons),
	toArray: toArray,
	fromArray: fromArray,

	foldr: F3(foldr),

	map2: F3(map2),
	map3: F4(map3),
	map4: F5(map4),
	map5: F6(map5),
	sortBy: F2(sortBy),
	sortWith: F2(sortWith)
};

}();
var _elm_lang$core$List$sortWith = _elm_lang$core$Native_List.sortWith;
var _elm_lang$core$List$sortBy = _elm_lang$core$Native_List.sortBy;
var _elm_lang$core$List$sort = function (xs) {
	return A2(_elm_lang$core$List$sortBy, _elm_lang$core$Basics$identity, xs);
};
var _elm_lang$core$List$singleton = function (value) {
	return {
		ctor: '::',
		_0: value,
		_1: {ctor: '[]'}
	};
};
var _elm_lang$core$List$drop = F2(
	function (n, list) {
		drop:
		while (true) {
			if (_elm_lang$core$Native_Utils.cmp(n, 0) < 1) {
				return list;
			} else {
				var _p0 = list;
				if (_p0.ctor === '[]') {
					return list;
				} else {
					var _v1 = n - 1,
						_v2 = _p0._1;
					n = _v1;
					list = _v2;
					continue drop;
				}
			}
		}
	});
var _elm_lang$core$List$map5 = _elm_lang$core$Native_List.map5;
var _elm_lang$core$List$map4 = _elm_lang$core$Native_List.map4;
var _elm_lang$core$List$map3 = _elm_lang$core$Native_List.map3;
var _elm_lang$core$List$map2 = _elm_lang$core$Native_List.map2;
var _elm_lang$core$List$any = F2(
	function (isOkay, list) {
		any:
		while (true) {
			var _p1 = list;
			if (_p1.ctor === '[]') {
				return false;
			} else {
				if (isOkay(_p1._0)) {
					return true;
				} else {
					var _v4 = isOkay,
						_v5 = _p1._1;
					isOkay = _v4;
					list = _v5;
					continue any;
				}
			}
		}
	});
var _elm_lang$core$List$all = F2(
	function (isOkay, list) {
		return !A2(
			_elm_lang$core$List$any,
			function (_p2) {
				return !isOkay(_p2);
			},
			list);
	});
var _elm_lang$core$List$foldr = _elm_lang$core$Native_List.foldr;
var _elm_lang$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			var _p3 = list;
			if (_p3.ctor === '[]') {
				return acc;
			} else {
				var _v7 = func,
					_v8 = A2(func, _p3._0, acc),
					_v9 = _p3._1;
				func = _v7;
				acc = _v8;
				list = _v9;
				continue foldl;
			}
		}
	});
var _elm_lang$core$List$length = function (xs) {
	return A3(
		_elm_lang$core$List$foldl,
		F2(
			function (_p4, i) {
				return i + 1;
			}),
		0,
		xs);
};
var _elm_lang$core$List$sum = function (numbers) {
	return A3(
		_elm_lang$core$List$foldl,
		F2(
			function (x, y) {
				return x + y;
			}),
		0,
		numbers);
};
var _elm_lang$core$List$product = function (numbers) {
	return A3(
		_elm_lang$core$List$foldl,
		F2(
			function (x, y) {
				return x * y;
			}),
		1,
		numbers);
};
var _elm_lang$core$List$maximum = function (list) {
	var _p5 = list;
	if (_p5.ctor === '::') {
		return _elm_lang$core$Maybe$Just(
			A3(_elm_lang$core$List$foldl, _elm_lang$core$Basics$max, _p5._0, _p5._1));
	} else {
		return _elm_lang$core$Maybe$Nothing;
	}
};
var _elm_lang$core$List$minimum = function (list) {
	var _p6 = list;
	if (_p6.ctor === '::') {
		return _elm_lang$core$Maybe$Just(
			A3(_elm_lang$core$List$foldl, _elm_lang$core$Basics$min, _p6._0, _p6._1));
	} else {
		return _elm_lang$core$Maybe$Nothing;
	}
};
var _elm_lang$core$List$member = F2(
	function (x, xs) {
		return A2(
			_elm_lang$core$List$any,
			function (a) {
				return _elm_lang$core$Native_Utils.eq(a, x);
			},
			xs);
	});
var _elm_lang$core$List$isEmpty = function (xs) {
	var _p7 = xs;
	if (_p7.ctor === '[]') {
		return true;
	} else {
		return false;
	}
};
var _elm_lang$core$List$tail = function (list) {
	var _p8 = list;
	if (_p8.ctor === '::') {
		return _elm_lang$core$Maybe$Just(_p8._1);
	} else {
		return _elm_lang$core$Maybe$Nothing;
	}
};
var _elm_lang$core$List$head = function (list) {
	var _p9 = list;
	if (_p9.ctor === '::') {
		return _elm_lang$core$Maybe$Just(_p9._0);
	} else {
		return _elm_lang$core$Maybe$Nothing;
	}
};
var _elm_lang$core$List_ops = _elm_lang$core$List_ops || {};
_elm_lang$core$List_ops['::'] = _elm_lang$core$Native_List.cons;
var _elm_lang$core$List$map = F2(
	function (f, xs) {
		return A3(
			_elm_lang$core$List$foldr,
			F2(
				function (x, acc) {
					return {
						ctor: '::',
						_0: f(x),
						_1: acc
					};
				}),
			{ctor: '[]'},
			xs);
	});
var _elm_lang$core$List$filter = F2(
	function (pred, xs) {
		var conditionalCons = F2(
			function (front, back) {
				return pred(front) ? {ctor: '::', _0: front, _1: back} : back;
			});
		return A3(
			_elm_lang$core$List$foldr,
			conditionalCons,
			{ctor: '[]'},
			xs);
	});
var _elm_lang$core$List$maybeCons = F3(
	function (f, mx, xs) {
		var _p10 = f(mx);
		if (_p10.ctor === 'Just') {
			return {ctor: '::', _0: _p10._0, _1: xs};
		} else {
			return xs;
		}
	});
var _elm_lang$core$List$filterMap = F2(
	function (f, xs) {
		return A3(
			_elm_lang$core$List$foldr,
			_elm_lang$core$List$maybeCons(f),
			{ctor: '[]'},
			xs);
	});
var _elm_lang$core$List$reverse = function (list) {
	return A3(
		_elm_lang$core$List$foldl,
		F2(
			function (x, y) {
				return {ctor: '::', _0: x, _1: y};
			}),
		{ctor: '[]'},
		list);
};
var _elm_lang$core$List$scanl = F3(
	function (f, b, xs) {
		var scan1 = F2(
			function (x, accAcc) {
				var _p11 = accAcc;
				if (_p11.ctor === '::') {
					return {
						ctor: '::',
						_0: A2(f, x, _p11._0),
						_1: accAcc
					};
				} else {
					return {ctor: '[]'};
				}
			});
		return _elm_lang$core$List$reverse(
			A3(
				_elm_lang$core$List$foldl,
				scan1,
				{
					ctor: '::',
					_0: b,
					_1: {ctor: '[]'}
				},
				xs));
	});
var _elm_lang$core$List$append = F2(
	function (xs, ys) {
		var _p12 = ys;
		if (_p12.ctor === '[]') {
			return xs;
		} else {
			return A3(
				_elm_lang$core$List$foldr,
				F2(
					function (x, y) {
						return {ctor: '::', _0: x, _1: y};
					}),
				ys,
				xs);
		}
	});
var _elm_lang$core$List$concat = function (lists) {
	return A3(
		_elm_lang$core$List$foldr,
		_elm_lang$core$List$append,
		{ctor: '[]'},
		lists);
};
var _elm_lang$core$List$concatMap = F2(
	function (f, list) {
		return _elm_lang$core$List$concat(
			A2(_elm_lang$core$List$map, f, list));
	});
var _elm_lang$core$List$partition = F2(
	function (pred, list) {
		var step = F2(
			function (x, _p13) {
				var _p14 = _p13;
				var _p16 = _p14._0;
				var _p15 = _p14._1;
				return pred(x) ? {
					ctor: '_Tuple2',
					_0: {ctor: '::', _0: x, _1: _p16},
					_1: _p15
				} : {
					ctor: '_Tuple2',
					_0: _p16,
					_1: {ctor: '::', _0: x, _1: _p15}
				};
			});
		return A3(
			_elm_lang$core$List$foldr,
			step,
			{
				ctor: '_Tuple2',
				_0: {ctor: '[]'},
				_1: {ctor: '[]'}
			},
			list);
	});
var _elm_lang$core$List$unzip = function (pairs) {
	var step = F2(
		function (_p18, _p17) {
			var _p19 = _p18;
			var _p20 = _p17;
			return {
				ctor: '_Tuple2',
				_0: {ctor: '::', _0: _p19._0, _1: _p20._0},
				_1: {ctor: '::', _0: _p19._1, _1: _p20._1}
			};
		});
	return A3(
		_elm_lang$core$List$foldr,
		step,
		{
			ctor: '_Tuple2',
			_0: {ctor: '[]'},
			_1: {ctor: '[]'}
		},
		pairs);
};
var _elm_lang$core$List$intersperse = F2(
	function (sep, xs) {
		var _p21 = xs;
		if (_p21.ctor === '[]') {
			return {ctor: '[]'};
		} else {
			var step = F2(
				function (x, rest) {
					return {
						ctor: '::',
						_0: sep,
						_1: {ctor: '::', _0: x, _1: rest}
					};
				});
			var spersed = A3(
				_elm_lang$core$List$foldr,
				step,
				{ctor: '[]'},
				_p21._1);
			return {ctor: '::', _0: _p21._0, _1: spersed};
		}
	});
var _elm_lang$core$List$takeReverse = F3(
	function (n, list, taken) {
		takeReverse:
		while (true) {
			if (_elm_lang$core$Native_Utils.cmp(n, 0) < 1) {
				return taken;
			} else {
				var _p22 = list;
				if (_p22.ctor === '[]') {
					return taken;
				} else {
					var _v23 = n - 1,
						_v24 = _p22._1,
						_v25 = {ctor: '::', _0: _p22._0, _1: taken};
					n = _v23;
					list = _v24;
					taken = _v25;
					continue takeReverse;
				}
			}
		}
	});
var _elm_lang$core$List$takeTailRec = F2(
	function (n, list) {
		return _elm_lang$core$List$reverse(
			A3(
				_elm_lang$core$List$takeReverse,
				n,
				list,
				{ctor: '[]'}));
	});
var _elm_lang$core$List$takeFast = F3(
	function (ctr, n, list) {
		if (_elm_lang$core$Native_Utils.cmp(n, 0) < 1) {
			return {ctor: '[]'};
		} else {
			var _p23 = {ctor: '_Tuple2', _0: n, _1: list};
			_v26_5:
			do {
				_v26_1:
				do {
					if (_p23.ctor === '_Tuple2') {
						if (_p23._1.ctor === '[]') {
							return list;
						} else {
							if (_p23._1._1.ctor === '::') {
								switch (_p23._0) {
									case 1:
										break _v26_1;
									case 2:
										return {
											ctor: '::',
											_0: _p23._1._0,
											_1: {
												ctor: '::',
												_0: _p23._1._1._0,
												_1: {ctor: '[]'}
											}
										};
									case 3:
										if (_p23._1._1._1.ctor === '::') {
											return {
												ctor: '::',
												_0: _p23._1._0,
												_1: {
													ctor: '::',
													_0: _p23._1._1._0,
													_1: {
														ctor: '::',
														_0: _p23._1._1._1._0,
														_1: {ctor: '[]'}
													}
												}
											};
										} else {
											break _v26_5;
										}
									default:
										if ((_p23._1._1._1.ctor === '::') && (_p23._1._1._1._1.ctor === '::')) {
											var _p28 = _p23._1._1._1._0;
											var _p27 = _p23._1._1._0;
											var _p26 = _p23._1._0;
											var _p25 = _p23._1._1._1._1._0;
											var _p24 = _p23._1._1._1._1._1;
											return (_elm_lang$core$Native_Utils.cmp(ctr, 1000) > 0) ? {
												ctor: '::',
												_0: _p26,
												_1: {
													ctor: '::',
													_0: _p27,
													_1: {
														ctor: '::',
														_0: _p28,
														_1: {
															ctor: '::',
															_0: _p25,
															_1: A2(_elm_lang$core$List$takeTailRec, n - 4, _p24)
														}
													}
												}
											} : {
												ctor: '::',
												_0: _p26,
												_1: {
													ctor: '::',
													_0: _p27,
													_1: {
														ctor: '::',
														_0: _p28,
														_1: {
															ctor: '::',
															_0: _p25,
															_1: A3(_elm_lang$core$List$takeFast, ctr + 1, n - 4, _p24)
														}
													}
												}
											};
										} else {
											break _v26_5;
										}
								}
							} else {
								if (_p23._0 === 1) {
									break _v26_1;
								} else {
									break _v26_5;
								}
							}
						}
					} else {
						break _v26_5;
					}
				} while(false);
				return {
					ctor: '::',
					_0: _p23._1._0,
					_1: {ctor: '[]'}
				};
			} while(false);
			return list;
		}
	});
var _elm_lang$core$List$take = F2(
	function (n, list) {
		return A3(_elm_lang$core$List$takeFast, 0, n, list);
	});
var _elm_lang$core$List$repeatHelp = F3(
	function (result, n, value) {
		repeatHelp:
		while (true) {
			if (_elm_lang$core$Native_Utils.cmp(n, 0) < 1) {
				return result;
			} else {
				var _v27 = {ctor: '::', _0: value, _1: result},
					_v28 = n - 1,
					_v29 = value;
				result = _v27;
				n = _v28;
				value = _v29;
				continue repeatHelp;
			}
		}
	});
var _elm_lang$core$List$repeat = F2(
	function (n, value) {
		return A3(
			_elm_lang$core$List$repeatHelp,
			{ctor: '[]'},
			n,
			value);
	});
var _elm_lang$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_elm_lang$core$Native_Utils.cmp(lo, hi) < 1) {
				var _v30 = lo,
					_v31 = hi - 1,
					_v32 = {ctor: '::', _0: hi, _1: list};
				lo = _v30;
				hi = _v31;
				list = _v32;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var _elm_lang$core$List$range = F2(
	function (lo, hi) {
		return A3(
			_elm_lang$core$List$rangeHelp,
			lo,
			hi,
			{ctor: '[]'});
	});
var _elm_lang$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			_elm_lang$core$List$map2,
			f,
			A2(
				_elm_lang$core$List$range,
				0,
				_elm_lang$core$List$length(xs) - 1),
			xs);
	});

var _elm_lang$core$Result$toMaybe = function (result) {
	var _p0 = result;
	if (_p0.ctor === 'Ok') {
		return _elm_lang$core$Maybe$Just(_p0._0);
	} else {
		return _elm_lang$core$Maybe$Nothing;
	}
};
var _elm_lang$core$Result$withDefault = F2(
	function (def, result) {
		var _p1 = result;
		if (_p1.ctor === 'Ok') {
			return _p1._0;
		} else {
			return def;
		}
	});
var _elm_lang$core$Result$Err = function (a) {
	return {ctor: 'Err', _0: a};
};
var _elm_lang$core$Result$andThen = F2(
	function (callback, result) {
		var _p2 = result;
		if (_p2.ctor === 'Ok') {
			return callback(_p2._0);
		} else {
			return _elm_lang$core$Result$Err(_p2._0);
		}
	});
var _elm_lang$core$Result$Ok = function (a) {
	return {ctor: 'Ok', _0: a};
};
var _elm_lang$core$Result$map = F2(
	function (func, ra) {
		var _p3 = ra;
		if (_p3.ctor === 'Ok') {
			return _elm_lang$core$Result$Ok(
				func(_p3._0));
		} else {
			return _elm_lang$core$Result$Err(_p3._0);
		}
	});
var _elm_lang$core$Result$map2 = F3(
	function (func, ra, rb) {
		var _p4 = {ctor: '_Tuple2', _0: ra, _1: rb};
		if (_p4._0.ctor === 'Ok') {
			if (_p4._1.ctor === 'Ok') {
				return _elm_lang$core$Result$Ok(
					A2(func, _p4._0._0, _p4._1._0));
			} else {
				return _elm_lang$core$Result$Err(_p4._1._0);
			}
		} else {
			return _elm_lang$core$Result$Err(_p4._0._0);
		}
	});
var _elm_lang$core$Result$map3 = F4(
	function (func, ra, rb, rc) {
		var _p5 = {ctor: '_Tuple3', _0: ra, _1: rb, _2: rc};
		if (_p5._0.ctor === 'Ok') {
			if (_p5._1.ctor === 'Ok') {
				if (_p5._2.ctor === 'Ok') {
					return _elm_lang$core$Result$Ok(
						A3(func, _p5._0._0, _p5._1._0, _p5._2._0));
				} else {
					return _elm_lang$core$Result$Err(_p5._2._0);
				}
			} else {
				return _elm_lang$core$Result$Err(_p5._1._0);
			}
		} else {
			return _elm_lang$core$Result$Err(_p5._0._0);
		}
	});
var _elm_lang$core$Result$map4 = F5(
	function (func, ra, rb, rc, rd) {
		var _p6 = {ctor: '_Tuple4', _0: ra, _1: rb, _2: rc, _3: rd};
		if (_p6._0.ctor === 'Ok') {
			if (_p6._1.ctor === 'Ok') {
				if (_p6._2.ctor === 'Ok') {
					if (_p6._3.ctor === 'Ok') {
						return _elm_lang$core$Result$Ok(
							A4(func, _p6._0._0, _p6._1._0, _p6._2._0, _p6._3._0));
					} else {
						return _elm_lang$core$Result$Err(_p6._3._0);
					}
				} else {
					return _elm_lang$core$Result$Err(_p6._2._0);
				}
			} else {
				return _elm_lang$core$Result$Err(_p6._1._0);
			}
		} else {
			return _elm_lang$core$Result$Err(_p6._0._0);
		}
	});
var _elm_lang$core$Result$map5 = F6(
	function (func, ra, rb, rc, rd, re) {
		var _p7 = {ctor: '_Tuple5', _0: ra, _1: rb, _2: rc, _3: rd, _4: re};
		if (_p7._0.ctor === 'Ok') {
			if (_p7._1.ctor === 'Ok') {
				if (_p7._2.ctor === 'Ok') {
					if (_p7._3.ctor === 'Ok') {
						if (_p7._4.ctor === 'Ok') {
							return _elm_lang$core$Result$Ok(
								A5(func, _p7._0._0, _p7._1._0, _p7._2._0, _p7._3._0, _p7._4._0));
						} else {
							return _elm_lang$core$Result$Err(_p7._4._0);
						}
					} else {
						return _elm_lang$core$Result$Err(_p7._3._0);
					}
				} else {
					return _elm_lang$core$Result$Err(_p7._2._0);
				}
			} else {
				return _elm_lang$core$Result$Err(_p7._1._0);
			}
		} else {
			return _elm_lang$core$Result$Err(_p7._0._0);
		}
	});
var _elm_lang$core$Result$mapError = F2(
	function (f, result) {
		var _p8 = result;
		if (_p8.ctor === 'Ok') {
			return _elm_lang$core$Result$Ok(_p8._0);
		} else {
			return _elm_lang$core$Result$Err(
				f(_p8._0));
		}
	});
var _elm_lang$core$Result$fromMaybe = F2(
	function (err, maybe) {
		var _p9 = maybe;
		if (_p9.ctor === 'Just') {
			return _elm_lang$core$Result$Ok(_p9._0);
		} else {
			return _elm_lang$core$Result$Err(err);
		}
	});

//import Maybe, Native.List, Native.Utils, Result //

var _elm_lang$core$Native_String = function() {

function isEmpty(str)
{
	return str.length === 0;
}
function cons(chr, str)
{
	return chr + str;
}
function uncons(str)
{
	var hd = str[0];
	if (hd)
	{
		return _elm_lang$core$Maybe$Just(_elm_lang$core$Native_Utils.Tuple2(_elm_lang$core$Native_Utils.chr(hd), str.slice(1)));
	}
	return _elm_lang$core$Maybe$Nothing;
}
function append(a, b)
{
	return a + b;
}
function concat(strs)
{
	return _elm_lang$core$Native_List.toArray(strs).join('');
}
function length(str)
{
	return str.length;
}
function map(f, str)
{
	var out = str.split('');
	for (var i = out.length; i--; )
	{
		out[i] = f(_elm_lang$core$Native_Utils.chr(out[i]));
	}
	return out.join('');
}
function filter(pred, str)
{
	return str.split('').map(_elm_lang$core$Native_Utils.chr).filter(pred).join('');
}
function reverse(str)
{
	return str.split('').reverse().join('');
}
function foldl(f, b, str)
{
	var len = str.length;
	for (var i = 0; i < len; ++i)
	{
		b = A2(f, _elm_lang$core$Native_Utils.chr(str[i]), b);
	}
	return b;
}
function foldr(f, b, str)
{
	for (var i = str.length; i--; )
	{
		b = A2(f, _elm_lang$core$Native_Utils.chr(str[i]), b);
	}
	return b;
}
function split(sep, str)
{
	return _elm_lang$core$Native_List.fromArray(str.split(sep));
}
function join(sep, strs)
{
	return _elm_lang$core$Native_List.toArray(strs).join(sep);
}
function repeat(n, str)
{
	var result = '';
	while (n > 0)
	{
		if (n & 1)
		{
			result += str;
		}
		n >>= 1, str += str;
	}
	return result;
}
function slice(start, end, str)
{
	return str.slice(start, end);
}
function left(n, str)
{
	return n < 1 ? '' : str.slice(0, n);
}
function right(n, str)
{
	return n < 1 ? '' : str.slice(-n);
}
function dropLeft(n, str)
{
	return n < 1 ? str : str.slice(n);
}
function dropRight(n, str)
{
	return n < 1 ? str : str.slice(0, -n);
}
function pad(n, chr, str)
{
	var half = (n - str.length) / 2;
	return repeat(Math.ceil(half), chr) + str + repeat(half | 0, chr);
}
function padRight(n, chr, str)
{
	return str + repeat(n - str.length, chr);
}
function padLeft(n, chr, str)
{
	return repeat(n - str.length, chr) + str;
}

function trim(str)
{
	return str.trim();
}
function trimLeft(str)
{
	return str.replace(/^\s+/, '');
}
function trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function words(str)
{
	return _elm_lang$core$Native_List.fromArray(str.trim().split(/\s+/g));
}
function lines(str)
{
	return _elm_lang$core$Native_List.fromArray(str.split(/\r\n|\r|\n/g));
}

function toUpper(str)
{
	return str.toUpperCase();
}
function toLower(str)
{
	return str.toLowerCase();
}

function any(pred, str)
{
	for (var i = str.length; i--; )
	{
		if (pred(_elm_lang$core$Native_Utils.chr(str[i])))
		{
			return true;
		}
	}
	return false;
}
function all(pred, str)
{
	for (var i = str.length; i--; )
	{
		if (!pred(_elm_lang$core$Native_Utils.chr(str[i])))
		{
			return false;
		}
	}
	return true;
}

function contains(sub, str)
{
	return str.indexOf(sub) > -1;
}
function startsWith(sub, str)
{
	return str.indexOf(sub) === 0;
}
function endsWith(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
}
function indexes(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _elm_lang$core$Native_List.Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _elm_lang$core$Native_List.fromArray(is);
}


function toInt(s)
{
	var len = s.length;

	// if empty
	if (len === 0)
	{
		return intErr(s);
	}

	// if hex
	var c = s[0];
	if (c === '0' && s[1] === 'x')
	{
		for (var i = 2; i < len; ++i)
		{
			var c = s[i];
			if (('0' <= c && c <= '9') || ('A' <= c && c <= 'F') || ('a' <= c && c <= 'f'))
			{
				continue;
			}
			return intErr(s);
		}
		return _elm_lang$core$Result$Ok(parseInt(s, 16));
	}

	// is decimal
	if (c > '9' || (c < '0' && c !== '-' && c !== '+'))
	{
		return intErr(s);
	}
	for (var i = 1; i < len; ++i)
	{
		var c = s[i];
		if (c < '0' || '9' < c)
		{
			return intErr(s);
		}
	}

	return _elm_lang$core$Result$Ok(parseInt(s, 10));
}

function intErr(s)
{
	return _elm_lang$core$Result$Err("could not convert string '" + s + "' to an Int");
}


function toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return floatErr(s);
	}
	var n = +s;
	// faster isNaN check
	return n === n ? _elm_lang$core$Result$Ok(n) : floatErr(s);
}

function floatErr(s)
{
	return _elm_lang$core$Result$Err("could not convert string '" + s + "' to a Float");
}


function toList(str)
{
	return _elm_lang$core$Native_List.fromArray(str.split('').map(_elm_lang$core$Native_Utils.chr));
}
function fromList(chars)
{
	return _elm_lang$core$Native_List.toArray(chars).join('');
}

return {
	isEmpty: isEmpty,
	cons: F2(cons),
	uncons: uncons,
	append: F2(append),
	concat: concat,
	length: length,
	map: F2(map),
	filter: F2(filter),
	reverse: reverse,
	foldl: F3(foldl),
	foldr: F3(foldr),

	split: F2(split),
	join: F2(join),
	repeat: F2(repeat),

	slice: F3(slice),
	left: F2(left),
	right: F2(right),
	dropLeft: F2(dropLeft),
	dropRight: F2(dropRight),

	pad: F3(pad),
	padLeft: F3(padLeft),
	padRight: F3(padRight),

	trim: trim,
	trimLeft: trimLeft,
	trimRight: trimRight,

	words: words,
	lines: lines,

	toUpper: toUpper,
	toLower: toLower,

	any: F2(any),
	all: F2(all),

	contains: F2(contains),
	startsWith: F2(startsWith),
	endsWith: F2(endsWith),
	indexes: F2(indexes),

	toInt: toInt,
	toFloat: toFloat,
	toList: toList,
	fromList: fromList
};

}();

//import Native.Utils //

var _elm_lang$core$Native_Char = function() {

return {
	fromCode: function(c) { return _elm_lang$core$Native_Utils.chr(String.fromCharCode(c)); },
	toCode: function(c) { return c.charCodeAt(0); },
	toUpper: function(c) { return _elm_lang$core$Native_Utils.chr(c.toUpperCase()); },
	toLower: function(c) { return _elm_lang$core$Native_Utils.chr(c.toLowerCase()); },
	toLocaleUpper: function(c) { return _elm_lang$core$Native_Utils.chr(c.toLocaleUpperCase()); },
	toLocaleLower: function(c) { return _elm_lang$core$Native_Utils.chr(c.toLocaleLowerCase()); }
};

}();
var _elm_lang$core$Char$fromCode = _elm_lang$core$Native_Char.fromCode;
var _elm_lang$core$Char$toCode = _elm_lang$core$Native_Char.toCode;
var _elm_lang$core$Char$toLocaleLower = _elm_lang$core$Native_Char.toLocaleLower;
var _elm_lang$core$Char$toLocaleUpper = _elm_lang$core$Native_Char.toLocaleUpper;
var _elm_lang$core$Char$toLower = _elm_lang$core$Native_Char.toLower;
var _elm_lang$core$Char$toUpper = _elm_lang$core$Native_Char.toUpper;
var _elm_lang$core$Char$isBetween = F3(
	function (low, high, $char) {
		var code = _elm_lang$core$Char$toCode($char);
		return (_elm_lang$core$Native_Utils.cmp(
			code,
			_elm_lang$core$Char$toCode(low)) > -1) && (_elm_lang$core$Native_Utils.cmp(
			code,
			_elm_lang$core$Char$toCode(high)) < 1);
	});
var _elm_lang$core$Char$isUpper = A2(
	_elm_lang$core$Char$isBetween,
	_elm_lang$core$Native_Utils.chr('A'),
	_elm_lang$core$Native_Utils.chr('Z'));
var _elm_lang$core$Char$isLower = A2(
	_elm_lang$core$Char$isBetween,
	_elm_lang$core$Native_Utils.chr('a'),
	_elm_lang$core$Native_Utils.chr('z'));
var _elm_lang$core$Char$isDigit = A2(
	_elm_lang$core$Char$isBetween,
	_elm_lang$core$Native_Utils.chr('0'),
	_elm_lang$core$Native_Utils.chr('9'));
var _elm_lang$core$Char$isOctDigit = A2(
	_elm_lang$core$Char$isBetween,
	_elm_lang$core$Native_Utils.chr('0'),
	_elm_lang$core$Native_Utils.chr('7'));
var _elm_lang$core$Char$isHexDigit = function ($char) {
	return _elm_lang$core$Char$isDigit($char) || (A3(
		_elm_lang$core$Char$isBetween,
		_elm_lang$core$Native_Utils.chr('a'),
		_elm_lang$core$Native_Utils.chr('f'),
		$char) || A3(
		_elm_lang$core$Char$isBetween,
		_elm_lang$core$Native_Utils.chr('A'),
		_elm_lang$core$Native_Utils.chr('F'),
		$char));
};

var _elm_lang$core$String$fromList = _elm_lang$core$Native_String.fromList;
var _elm_lang$core$String$toList = _elm_lang$core$Native_String.toList;
var _elm_lang$core$String$toFloat = _elm_lang$core$Native_String.toFloat;
var _elm_lang$core$String$toInt = _elm_lang$core$Native_String.toInt;
var _elm_lang$core$String$indices = _elm_lang$core$Native_String.indexes;
var _elm_lang$core$String$indexes = _elm_lang$core$Native_String.indexes;
var _elm_lang$core$String$endsWith = _elm_lang$core$Native_String.endsWith;
var _elm_lang$core$String$startsWith = _elm_lang$core$Native_String.startsWith;
var _elm_lang$core$String$contains = _elm_lang$core$Native_String.contains;
var _elm_lang$core$String$all = _elm_lang$core$Native_String.all;
var _elm_lang$core$String$any = _elm_lang$core$Native_String.any;
var _elm_lang$core$String$toLower = _elm_lang$core$Native_String.toLower;
var _elm_lang$core$String$toUpper = _elm_lang$core$Native_String.toUpper;
var _elm_lang$core$String$lines = _elm_lang$core$Native_String.lines;
var _elm_lang$core$String$words = _elm_lang$core$Native_String.words;
var _elm_lang$core$String$trimRight = _elm_lang$core$Native_String.trimRight;
var _elm_lang$core$String$trimLeft = _elm_lang$core$Native_String.trimLeft;
var _elm_lang$core$String$trim = _elm_lang$core$Native_String.trim;
var _elm_lang$core$String$padRight = _elm_lang$core$Native_String.padRight;
var _elm_lang$core$String$padLeft = _elm_lang$core$Native_String.padLeft;
var _elm_lang$core$String$pad = _elm_lang$core$Native_String.pad;
var _elm_lang$core$String$dropRight = _elm_lang$core$Native_String.dropRight;
var _elm_lang$core$String$dropLeft = _elm_lang$core$Native_String.dropLeft;
var _elm_lang$core$String$right = _elm_lang$core$Native_String.right;
var _elm_lang$core$String$left = _elm_lang$core$Native_String.left;
var _elm_lang$core$String$slice = _elm_lang$core$Native_String.slice;
var _elm_lang$core$String$repeat = _elm_lang$core$Native_String.repeat;
var _elm_lang$core$String$join = _elm_lang$core$Native_String.join;
var _elm_lang$core$String$split = _elm_lang$core$Native_String.split;
var _elm_lang$core$String$foldr = _elm_lang$core$Native_String.foldr;
var _elm_lang$core$String$foldl = _elm_lang$core$Native_String.foldl;
var _elm_lang$core$String$reverse = _elm_lang$core$Native_String.reverse;
var _elm_lang$core$String$filter = _elm_lang$core$Native_String.filter;
var _elm_lang$core$String$map = _elm_lang$core$Native_String.map;
var _elm_lang$core$String$length = _elm_lang$core$Native_String.length;
var _elm_lang$core$String$concat = _elm_lang$core$Native_String.concat;
var _elm_lang$core$String$append = _elm_lang$core$Native_String.append;
var _elm_lang$core$String$uncons = _elm_lang$core$Native_String.uncons;
var _elm_lang$core$String$cons = _elm_lang$core$Native_String.cons;
var _elm_lang$core$String$fromChar = function ($char) {
	return A2(_elm_lang$core$String$cons, $char, '');
};
var _elm_lang$core$String$isEmpty = _elm_lang$core$Native_String.isEmpty;

var _elm_lang$core$Tuple$mapSecond = F2(
	function (func, _p0) {
		var _p1 = _p0;
		return {
			ctor: '_Tuple2',
			_0: _p1._0,
			_1: func(_p1._1)
		};
	});
var _elm_lang$core$Tuple$mapFirst = F2(
	function (func, _p2) {
		var _p3 = _p2;
		return {
			ctor: '_Tuple2',
			_0: func(_p3._0),
			_1: _p3._1
		};
	});
var _elm_lang$core$Tuple$second = function (_p4) {
	var _p5 = _p4;
	return _p5._1;
};
var _elm_lang$core$Tuple$first = function (_p6) {
	var _p7 = _p6;
	return _p7._0;
};

//import //

var _elm_lang$core$Native_Platform = function() {


// PROGRAMS

function program(impl)
{
	return function(flagDecoder)
	{
		return function(object, moduleName)
		{
			object['worker'] = function worker(flags)
			{
				if (typeof flags !== 'undefined')
				{
					throw new Error(
						'The `' + moduleName + '` module does not need flags.\n'
						+ 'Call ' + moduleName + '.worker() with no arguments and you should be all set!'
					);
				}

				return initialize(
					impl.init,
					impl.update,
					impl.subscriptions,
					renderer
				);
			};
		};
	};
}

function programWithFlags(impl)
{
	return function(flagDecoder)
	{
		return function(object, moduleName)
		{
			object['worker'] = function worker(flags)
			{
				if (typeof flagDecoder === 'undefined')
				{
					throw new Error(
						'Are you trying to sneak a Never value into Elm? Trickster!\n'
						+ 'It looks like ' + moduleName + '.main is defined with `programWithFlags` but has type `Program Never`.\n'
						+ 'Use `program` instead if you do not want flags.'
					);
				}

				var result = A2(_elm_lang$core$Native_Json.run, flagDecoder, flags);
				if (result.ctor === 'Err')
				{
					throw new Error(
						moduleName + '.worker(...) was called with an unexpected argument.\n'
						+ 'I tried to convert it to an Elm value, but ran into this problem:\n\n'
						+ result._0
					);
				}

				return initialize(
					impl.init(result._0),
					impl.update,
					impl.subscriptions,
					renderer
				);
			};
		};
	};
}

function renderer(enqueue, _)
{
	return function(_) {};
}


// HTML TO PROGRAM

function htmlToProgram(vnode)
{
	var emptyBag = batch(_elm_lang$core$Native_List.Nil);
	var noChange = _elm_lang$core$Native_Utils.Tuple2(
		_elm_lang$core$Native_Utils.Tuple0,
		emptyBag
	);

	return _elm_lang$virtual_dom$VirtualDom$program({
		init: noChange,
		view: function(model) { return main; },
		update: F2(function(msg, model) { return noChange; }),
		subscriptions: function (model) { return emptyBag; }
	});
}


// INITIALIZE A PROGRAM

function initialize(init, update, subscriptions, renderer)
{
	// ambient state
	var managers = {};
	var updateView;

	// init and update state in main process
	var initApp = _elm_lang$core$Native_Scheduler.nativeBinding(function(callback) {
		var model = init._0;
		updateView = renderer(enqueue, model);
		var cmds = init._1;
		var subs = subscriptions(model);
		dispatchEffects(managers, cmds, subs);
		callback(_elm_lang$core$Native_Scheduler.succeed(model));
	});

	function onMessage(msg, model)
	{
		return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback) {
			var results = A2(update, msg, model);
			model = results._0;
			updateView(model);
			var cmds = results._1;
			var subs = subscriptions(model);
			dispatchEffects(managers, cmds, subs);
			callback(_elm_lang$core$Native_Scheduler.succeed(model));
		});
	}

	var mainProcess = spawnLoop(initApp, onMessage);

	function enqueue(msg)
	{
		_elm_lang$core$Native_Scheduler.rawSend(mainProcess, msg);
	}

	var ports = setupEffects(managers, enqueue);

	return ports ? { ports: ports } : {};
}


// EFFECT MANAGERS

var effectManagers = {};

function setupEffects(managers, callback)
{
	var ports;

	// setup all necessary effect managers
	for (var key in effectManagers)
	{
		var manager = effectManagers[key];

		if (manager.isForeign)
		{
			ports = ports || {};
			ports[key] = manager.tag === 'cmd'
				? setupOutgoingPort(key)
				: setupIncomingPort(key, callback);
		}

		managers[key] = makeManager(manager, callback);
	}

	return ports;
}

function makeManager(info, callback)
{
	var router = {
		main: callback,
		self: undefined
	};

	var tag = info.tag;
	var onEffects = info.onEffects;
	var onSelfMsg = info.onSelfMsg;

	function onMessage(msg, state)
	{
		if (msg.ctor === 'self')
		{
			return A3(onSelfMsg, router, msg._0, state);
		}

		var fx = msg._0;
		switch (tag)
		{
			case 'cmd':
				return A3(onEffects, router, fx.cmds, state);

			case 'sub':
				return A3(onEffects, router, fx.subs, state);

			case 'fx':
				return A4(onEffects, router, fx.cmds, fx.subs, state);
		}
	}

	var process = spawnLoop(info.init, onMessage);
	router.self = process;
	return process;
}

function sendToApp(router, msg)
{
	return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback)
	{
		router.main(msg);
		callback(_elm_lang$core$Native_Scheduler.succeed(_elm_lang$core$Native_Utils.Tuple0));
	});
}

function sendToSelf(router, msg)
{
	return A2(_elm_lang$core$Native_Scheduler.send, router.self, {
		ctor: 'self',
		_0: msg
	});
}


// HELPER for STATEFUL LOOPS

function spawnLoop(init, onMessage)
{
	var andThen = _elm_lang$core$Native_Scheduler.andThen;

	function loop(state)
	{
		var handleMsg = _elm_lang$core$Native_Scheduler.receive(function(msg) {
			return onMessage(msg, state);
		});
		return A2(andThen, loop, handleMsg);
	}

	var task = A2(andThen, loop, init);

	return _elm_lang$core$Native_Scheduler.rawSpawn(task);
}


// BAGS

function leaf(home)
{
	return function(value)
	{
		return {
			type: 'leaf',
			home: home,
			value: value
		};
	};
}

function batch(list)
{
	return {
		type: 'node',
		branches: list
	};
}

function map(tagger, bag)
{
	return {
		type: 'map',
		tagger: tagger,
		tree: bag
	}
}


// PIPE BAGS INTO EFFECT MANAGERS

function dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	gatherEffects(true, cmdBag, effectsDict, null);
	gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		var fx = home in effectsDict
			? effectsDict[home]
			: {
				cmds: _elm_lang$core$Native_List.Nil,
				subs: _elm_lang$core$Native_List.Nil
			};

		_elm_lang$core$Native_Scheduler.rawSend(managers[home], { ctor: 'fx', _0: fx });
	}
}

function gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.type)
	{
		case 'leaf':
			var home = bag.home;
			var effect = toEffect(isCmd, home, taggers, bag.value);
			effectsDict[home] = insert(isCmd, effect, effectsDict[home]);
			return;

		case 'node':
			var list = bag.branches;
			while (list.ctor !== '[]')
			{
				gatherEffects(isCmd, list._0, effectsDict, taggers);
				list = list._1;
			}
			return;

		case 'map':
			gatherEffects(isCmd, bag.tree, effectsDict, {
				tagger: bag.tagger,
				rest: taggers
			});
			return;
	}
}

function toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		var temp = taggers;
		while (temp)
		{
			x = temp.tagger(x);
			temp = temp.rest;
		}
		return x;
	}

	var map = isCmd
		? effectManagers[home].cmdMap
		: effectManagers[home].subMap;

	return A2(map, applyTaggers, value)
}

function insert(isCmd, newEffect, effects)
{
	effects = effects || {
		cmds: _elm_lang$core$Native_List.Nil,
		subs: _elm_lang$core$Native_List.Nil
	};
	if (isCmd)
	{
		effects.cmds = _elm_lang$core$Native_List.Cons(newEffect, effects.cmds);
		return effects;
	}
	effects.subs = _elm_lang$core$Native_List.Cons(newEffect, effects.subs);
	return effects;
}


// PORTS

function checkPortName(name)
{
	if (name in effectManagers)
	{
		throw new Error('There can only be one port named `' + name + '`, but your program has multiple.');
	}
}


// OUTGOING PORTS

function outgoingPort(name, converter)
{
	checkPortName(name);
	effectManagers[name] = {
		tag: 'cmd',
		cmdMap: outgoingPortMap,
		converter: converter,
		isForeign: true
	};
	return leaf(name);
}

var outgoingPortMap = F2(function cmdMap(tagger, value) {
	return value;
});

function setupOutgoingPort(name)
{
	var subs = [];
	var converter = effectManagers[name].converter;

	// CREATE MANAGER

	var init = _elm_lang$core$Native_Scheduler.succeed(null);

	function onEffects(router, cmdList, state)
	{
		while (cmdList.ctor !== '[]')
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = converter(cmdList._0);
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
			cmdList = cmdList._1;
		}
		return init;
	}

	effectManagers[name].init = init;
	effectManagers[name].onEffects = F3(onEffects);

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}


// INCOMING PORTS

function incomingPort(name, converter)
{
	checkPortName(name);
	effectManagers[name] = {
		tag: 'sub',
		subMap: incomingPortMap,
		converter: converter,
		isForeign: true
	};
	return leaf(name);
}

var incomingPortMap = F2(function subMap(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});

function setupIncomingPort(name, callback)
{
	var sentBeforeInit = [];
	var subs = _elm_lang$core$Native_List.Nil;
	var converter = effectManagers[name].converter;
	var currentOnEffects = preInitOnEffects;
	var currentSend = preInitSend;

	// CREATE MANAGER

	var init = _elm_lang$core$Native_Scheduler.succeed(null);

	function preInitOnEffects(router, subList, state)
	{
		var postInitResult = postInitOnEffects(router, subList, state);

		for(var i = 0; i < sentBeforeInit.length; i++)
		{
			postInitSend(sentBeforeInit[i]);
		}

		sentBeforeInit = null; // to release objects held in queue
		currentSend = postInitSend;
		currentOnEffects = postInitOnEffects;
		return postInitResult;
	}

	function postInitOnEffects(router, subList, state)
	{
		subs = subList;
		return init;
	}

	function onEffects(router, subList, state)
	{
		return currentOnEffects(router, subList, state);
	}

	effectManagers[name].init = init;
	effectManagers[name].onEffects = F3(onEffects);

	// PUBLIC API

	function preInitSend(value)
	{
		sentBeforeInit.push(value);
	}

	function postInitSend(value)
	{
		var temp = subs;
		while (temp.ctor !== '[]')
		{
			callback(temp._0(value));
			temp = temp._1;
		}
	}

	function send(incomingValue)
	{
		var result = A2(_elm_lang$core$Json_Decode$decodeValue, converter, incomingValue);
		if (result.ctor === 'Err')
		{
			throw new Error('Trying to send an unexpected type of value through port `' + name + '`:\n' + result._0);
		}

		currentSend(result._0);
	}

	return { send: send };
}

return {
	// routers
	sendToApp: F2(sendToApp),
	sendToSelf: F2(sendToSelf),

	// global setup
	effectManagers: effectManagers,
	outgoingPort: outgoingPort,
	incomingPort: incomingPort,

	htmlToProgram: htmlToProgram,
	program: program,
	programWithFlags: programWithFlags,
	initialize: initialize,

	// effect bags
	leaf: leaf,
	batch: batch,
	map: F2(map)
};

}();

//import Native.Utils //

var _elm_lang$core$Native_Scheduler = function() {

var MAX_STEPS = 10000;


// TASKS

function succeed(value)
{
	return {
		ctor: '_Task_succeed',
		value: value
	};
}

function fail(error)
{
	return {
		ctor: '_Task_fail',
		value: error
	};
}

function nativeBinding(callback)
{
	return {
		ctor: '_Task_nativeBinding',
		callback: callback,
		cancel: null
	};
}

function andThen(callback, task)
{
	return {
		ctor: '_Task_andThen',
		callback: callback,
		task: task
	};
}

function onError(callback, task)
{
	return {
		ctor: '_Task_onError',
		callback: callback,
		task: task
	};
}

function receive(callback)
{
	return {
		ctor: '_Task_receive',
		callback: callback
	};
}


// PROCESSES

function rawSpawn(task)
{
	var process = {
		ctor: '_Process',
		id: _elm_lang$core$Native_Utils.guid(),
		root: task,
		stack: null,
		mailbox: []
	};

	enqueue(process);

	return process;
}

function spawn(task)
{
	return nativeBinding(function(callback) {
		var process = rawSpawn(task);
		callback(succeed(process));
	});
}

function rawSend(process, msg)
{
	process.mailbox.push(msg);
	enqueue(process);
}

function send(process, msg)
{
	return nativeBinding(function(callback) {
		rawSend(process, msg);
		callback(succeed(_elm_lang$core$Native_Utils.Tuple0));
	});
}

function kill(process)
{
	return nativeBinding(function(callback) {
		var root = process.root;
		if (root.ctor === '_Task_nativeBinding' && root.cancel)
		{
			root.cancel();
		}

		process.root = null;

		callback(succeed(_elm_lang$core$Native_Utils.Tuple0));
	});
}

function sleep(time)
{
	return nativeBinding(function(callback) {
		var id = setTimeout(function() {
			callback(succeed(_elm_lang$core$Native_Utils.Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}


// STEP PROCESSES

function step(numSteps, process)
{
	while (numSteps < MAX_STEPS)
	{
		var ctor = process.root.ctor;

		if (ctor === '_Task_succeed')
		{
			while (process.stack && process.stack.ctor === '_Task_onError')
			{
				process.stack = process.stack.rest;
			}
			if (process.stack === null)
			{
				break;
			}
			process.root = process.stack.callback(process.root.value);
			process.stack = process.stack.rest;
			++numSteps;
			continue;
		}

		if (ctor === '_Task_fail')
		{
			while (process.stack && process.stack.ctor === '_Task_andThen')
			{
				process.stack = process.stack.rest;
			}
			if (process.stack === null)
			{
				break;
			}
			process.root = process.stack.callback(process.root.value);
			process.stack = process.stack.rest;
			++numSteps;
			continue;
		}

		if (ctor === '_Task_andThen')
		{
			process.stack = {
				ctor: '_Task_andThen',
				callback: process.root.callback,
				rest: process.stack
			};
			process.root = process.root.task;
			++numSteps;
			continue;
		}

		if (ctor === '_Task_onError')
		{
			process.stack = {
				ctor: '_Task_onError',
				callback: process.root.callback,
				rest: process.stack
			};
			process.root = process.root.task;
			++numSteps;
			continue;
		}

		if (ctor === '_Task_nativeBinding')
		{
			process.root.cancel = process.root.callback(function(newRoot) {
				process.root = newRoot;
				enqueue(process);
			});

			break;
		}

		if (ctor === '_Task_receive')
		{
			var mailbox = process.mailbox;
			if (mailbox.length === 0)
			{
				break;
			}

			process.root = process.root.callback(mailbox.shift());
			++numSteps;
			continue;
		}

		throw new Error(ctor);
	}

	if (numSteps < MAX_STEPS)
	{
		return numSteps + 1;
	}
	enqueue(process);

	return numSteps;
}


// WORK QUEUE

var working = false;
var workQueue = [];

function enqueue(process)
{
	workQueue.push(process);

	if (!working)
	{
		setTimeout(work, 0);
		working = true;
	}
}

function work()
{
	var numSteps = 0;
	var process;
	while (numSteps < MAX_STEPS && (process = workQueue.shift()))
	{
		if (process.root)
		{
			numSteps = step(numSteps, process);
		}
	}
	if (!process)
	{
		working = false;
		return;
	}
	setTimeout(work, 0);
}


return {
	succeed: succeed,
	fail: fail,
	nativeBinding: nativeBinding,
	andThen: F2(andThen),
	onError: F2(onError),
	receive: receive,

	spawn: spawn,
	kill: kill,
	sleep: sleep,
	send: F2(send),

	rawSpawn: rawSpawn,
	rawSend: rawSend
};

}();
var _elm_lang$core$Platform_Cmd$batch = _elm_lang$core$Native_Platform.batch;
var _elm_lang$core$Platform_Cmd$none = _elm_lang$core$Platform_Cmd$batch(
	{ctor: '[]'});
var _elm_lang$core$Platform_Cmd_ops = _elm_lang$core$Platform_Cmd_ops || {};
_elm_lang$core$Platform_Cmd_ops['!'] = F2(
	function (model, commands) {
		return {
			ctor: '_Tuple2',
			_0: model,
			_1: _elm_lang$core$Platform_Cmd$batch(commands)
		};
	});
var _elm_lang$core$Platform_Cmd$map = _elm_lang$core$Native_Platform.map;
var _elm_lang$core$Platform_Cmd$Cmd = {ctor: 'Cmd'};

var _elm_lang$core$Platform_Sub$batch = _elm_lang$core$Native_Platform.batch;
var _elm_lang$core$Platform_Sub$none = _elm_lang$core$Platform_Sub$batch(
	{ctor: '[]'});
var _elm_lang$core$Platform_Sub$map = _elm_lang$core$Native_Platform.map;
var _elm_lang$core$Platform_Sub$Sub = {ctor: 'Sub'};

var _elm_lang$core$Platform$hack = _elm_lang$core$Native_Scheduler.succeed;
var _elm_lang$core$Platform$sendToSelf = _elm_lang$core$Native_Platform.sendToSelf;
var _elm_lang$core$Platform$sendToApp = _elm_lang$core$Native_Platform.sendToApp;
var _elm_lang$core$Platform$programWithFlags = _elm_lang$core$Native_Platform.programWithFlags;
var _elm_lang$core$Platform$program = _elm_lang$core$Native_Platform.program;
var _elm_lang$core$Platform$Program = {ctor: 'Program'};
var _elm_lang$core$Platform$Task = {ctor: 'Task'};
var _elm_lang$core$Platform$ProcessId = {ctor: 'ProcessId'};
var _elm_lang$core$Platform$Router = {ctor: 'Router'};

var _avh4$elm_fifo$Fifo$toList = function (_p0) {
	var _p1 = _p0;
	return A2(
		_elm_lang$core$Basics_ops['++'],
		_p1._0,
		_elm_lang$core$List$reverse(_p1._1));
};
var _avh4$elm_fifo$Fifo$Fifo = F2(
	function (a, b) {
		return {ctor: 'Fifo', _0: a, _1: b};
	});
var _avh4$elm_fifo$Fifo$empty = A2(
	_avh4$elm_fifo$Fifo$Fifo,
	{ctor: '[]'},
	{ctor: '[]'});
var _avh4$elm_fifo$Fifo$insert = F2(
	function (a, _p2) {
		var _p3 = _p2;
		return A2(
			_avh4$elm_fifo$Fifo$Fifo,
			_p3._0,
			{ctor: '::', _0: a, _1: _p3._1});
	});
var _avh4$elm_fifo$Fifo$remove = function (fifo) {
	remove:
	while (true) {
		var _p4 = fifo;
		if (_p4._0.ctor === '[]') {
			if (_p4._1.ctor === '[]') {
				return {ctor: '_Tuple2', _0: _elm_lang$core$Maybe$Nothing, _1: _avh4$elm_fifo$Fifo$empty};
			} else {
				var _v3 = A2(
					_avh4$elm_fifo$Fifo$Fifo,
					_elm_lang$core$List$reverse(_p4._1),
					{ctor: '[]'});
				fifo = _v3;
				continue remove;
			}
		} else {
			return {
				ctor: '_Tuple2',
				_0: _elm_lang$core$Maybe$Just(_p4._0._0),
				_1: A2(_avh4$elm_fifo$Fifo$Fifo, _p4._0._1, _p4._1)
			};
		}
	}
};
var _avh4$elm_fifo$Fifo$fromList = function (list) {
	return A2(
		_avh4$elm_fifo$Fifo$Fifo,
		list,
		{ctor: '[]'});
};

var _ccapndave$elm_update_extra$Update_Extra$identity = function (model) {
	return A2(
		_elm_lang$core$Platform_Cmd_ops['!'],
		model,
		{ctor: '[]'});
};
var _ccapndave$elm_update_extra$Update_Extra$mapCmd = F2(
	function (tagger, _p0) {
		var _p1 = _p0;
		return {
			ctor: '_Tuple2',
			_0: _p1._0,
			_1: A2(_elm_lang$core$Platform_Cmd$map, tagger, _p1._1)
		};
	});
var _ccapndave$elm_update_extra$Update_Extra$addCmd = F2(
	function (cmd_, _p2) {
		var _p3 = _p2;
		return {
			ctor: '_Tuple2',
			_0: _p3._0,
			_1: _elm_lang$core$Platform_Cmd$batch(
				{
					ctor: '::',
					_0: _p3._1,
					_1: {
						ctor: '::',
						_0: cmd_,
						_1: {ctor: '[]'}
					}
				})
		};
	});
var _ccapndave$elm_update_extra$Update_Extra$updateModel = F2(
	function (f, _p4) {
		var _p5 = _p4;
		return {
			ctor: '_Tuple2',
			_0: f(_p5._0),
			_1: _p5._1
		};
	});
var _ccapndave$elm_update_extra$Update_Extra$filter = F2(
	function (pred, f) {
		return pred ? f : _elm_lang$core$Basics$identity;
	});
var _ccapndave$elm_update_extra$Update_Extra$andThen = F3(
	function (update, msg, _p6) {
		var _p7 = _p6;
		var _p8 = A2(update, msg, _p7._0);
		var model_ = _p8._0;
		var cmd_ = _p8._1;
		return {
			ctor: '_Tuple2',
			_0: model_,
			_1: _elm_lang$core$Platform_Cmd$batch(
				{
					ctor: '::',
					_0: _p7._1,
					_1: {
						ctor: '::',
						_0: cmd_,
						_1: {ctor: '[]'}
					}
				})
		};
	});
var _ccapndave$elm_update_extra$Update_Extra$sequence = F3(
	function (update, msgs, init) {
		var foldUpdate = _ccapndave$elm_update_extra$Update_Extra$andThen(update);
		return A3(_elm_lang$core$List$foldl, foldUpdate, init, msgs);
	});

var _elm_community$graph$Graph_Tree$pushMany = F2(
	function (vals, queue) {
		return A3(_elm_lang$core$List$foldl, _avh4$elm_fifo$Fifo$insert, queue, vals);
	});
var _elm_community$graph$Graph_Tree$listForTraversal = F2(
	function (traversal, tree) {
		var acc = _elm_lang$core$Basics$identity;
		var f = F3(
			function (label, children, rest) {
				return function (_p0) {
					return rest(
						A2(
							F2(
								function (x, y) {
									return {ctor: '::', _0: x, _1: y};
								}),
							label,
							_p0));
				};
			});
		return A4(
			traversal,
			f,
			acc,
			tree,
			{ctor: '[]'});
	});
var _elm_community$graph$Graph_Tree$size = function (tree) {
	var _p1 = tree;
	return _p1._0;
};
var _elm_community$graph$Graph_Tree$root = function (tree) {
	var _p2 = tree;
	return _p2._1;
};
var _elm_community$graph$Graph_Tree$height = function (tree) {
	var go = F2(
		function (h, t) {
			var _p3 = _elm_community$graph$Graph_Tree$root(t);
			if (_p3.ctor === 'Just') {
				return A3(
					_elm_lang$core$List$foldl,
					function (_p4) {
						return _elm_lang$core$Basics$max(
							A2(go, h + 1, _p4));
					},
					h + 1,
					_p3._0._1);
			} else {
				return h;
			}
		});
	return A2(go, 0, tree);
};
var _elm_community$graph$Graph_Tree$levelOrder = F3(
	function (visit, acc, tree) {
		var go = F2(
			function (acc, toVisit) {
				go:
				while (true) {
					var _p5 = _avh4$elm_fifo$Fifo$remove(toVisit);
					if (_p5._0.ctor === 'Nothing') {
						return acc;
					} else {
						var _p8 = _p5._1;
						var _p6 = _elm_community$graph$Graph_Tree$root(_p5._0._0);
						if (_p6.ctor === 'Nothing') {
							var _v5 = acc,
								_v6 = _p8;
							acc = _v5;
							toVisit = _v6;
							continue go;
						} else {
							var _p7 = _p6._0._1;
							var _v7 = A3(visit, _p6._0._0, _p7, acc),
								_v8 = A2(_elm_community$graph$Graph_Tree$pushMany, _p7, _p8);
							acc = _v7;
							toVisit = _v8;
							continue go;
						}
					}
				}
			});
		return A2(
			go,
			acc,
			A2(_avh4$elm_fifo$Fifo$insert, tree, _avh4$elm_fifo$Fifo$empty));
	});
var _elm_community$graph$Graph_Tree$levelOrderList = _elm_community$graph$Graph_Tree$listForTraversal(_elm_community$graph$Graph_Tree$levelOrder);
var _elm_community$graph$Graph_Tree$postOrder = F3(
	function (visit, acc, tree) {
		var folder = _elm_lang$core$Basics$flip(
			_elm_community$graph$Graph_Tree$postOrder(visit));
		var _p9 = _elm_community$graph$Graph_Tree$root(tree);
		if (_p9.ctor === 'Nothing') {
			return acc;
		} else {
			var _p10 = _p9._0._1;
			return A3(
				visit,
				_p9._0._0,
				_p10,
				A3(_elm_lang$core$List$foldl, folder, acc, _p10));
		}
	});
var _elm_community$graph$Graph_Tree$postOrderList = _elm_community$graph$Graph_Tree$listForTraversal(_elm_community$graph$Graph_Tree$postOrder);
var _elm_community$graph$Graph_Tree$preOrder = F3(
	function (visit, acc, tree) {
		var folder = _elm_lang$core$Basics$flip(
			_elm_community$graph$Graph_Tree$preOrder(visit));
		var _p11 = _elm_community$graph$Graph_Tree$root(tree);
		if (_p11.ctor === 'Nothing') {
			return acc;
		} else {
			var _p12 = _p11._0._1;
			return A3(
				_elm_lang$core$List$foldl,
				folder,
				A3(visit, _p11._0._0, _p12, acc),
				_p12);
		}
	});
var _elm_community$graph$Graph_Tree$preOrderList = _elm_community$graph$Graph_Tree$listForTraversal(_elm_community$graph$Graph_Tree$preOrder);
var _elm_community$graph$Graph_Tree$MkTree = F2(
	function (a, b) {
		return {ctor: 'MkTree', _0: a, _1: b};
	});
var _elm_community$graph$Graph_Tree$empty = A2(_elm_community$graph$Graph_Tree$MkTree, 0, _elm_lang$core$Maybe$Nothing);
var _elm_community$graph$Graph_Tree$isEmpty = function (tree) {
	return _elm_lang$core$Native_Utils.eq(tree, _elm_community$graph$Graph_Tree$empty);
};
var _elm_community$graph$Graph_Tree$inner = F2(
	function (label, children) {
		var nonEmptyChildren = A2(
			_elm_lang$core$List$filter,
			function (_p13) {
				return !_elm_community$graph$Graph_Tree$isEmpty(_p13);
			},
			children);
		var totalSize = A3(
			_elm_lang$core$List$foldl,
			function (_p14) {
				return F2(
					function (x, y) {
						return x + y;
					})(
					_elm_community$graph$Graph_Tree$size(_p14));
			},
			1,
			nonEmptyChildren);
		return A2(
			_elm_community$graph$Graph_Tree$MkTree,
			totalSize,
			_elm_lang$core$Maybe$Just(
				{ctor: '_Tuple2', _0: label, _1: nonEmptyChildren}));
	});
var _elm_community$graph$Graph_Tree$leaf = function (val) {
	return A2(
		_elm_community$graph$Graph_Tree$inner,
		val,
		{ctor: '[]'});
};
var _elm_community$graph$Graph_Tree$unfoldTree = F2(
	function (next, seed) {
		var _p15 = next(seed);
		var label = _p15._0;
		var seeds = _p15._1;
		return A2(
			_elm_community$graph$Graph_Tree$inner,
			label,
			A2(
				_elm_lang$core$List$map,
				_elm_community$graph$Graph_Tree$unfoldTree(next),
				seeds));
	});
var _elm_community$graph$Graph_Tree$unfoldForest = F2(
	function (next, seeds) {
		return A2(
			_elm_lang$core$List$map,
			_elm_community$graph$Graph_Tree$unfoldTree(next),
			seeds);
	});

var _elm_lang$core$Native_Bitwise = function() {

return {
	and: F2(function and(a, b) { return a & b; }),
	or: F2(function or(a, b) { return a | b; }),
	xor: F2(function xor(a, b) { return a ^ b; }),
	complement: function complement(a) { return ~a; },
	shiftLeftBy: F2(function(offset, a) { return a << offset; }),
	shiftRightBy: F2(function(offset, a) { return a >> offset; }),
	shiftRightZfBy: F2(function(offset, a) { return a >>> offset; })
};

}();

var _elm_lang$core$Bitwise$shiftRightZfBy = _elm_lang$core$Native_Bitwise.shiftRightZfBy;
var _elm_lang$core$Bitwise$shiftRightBy = _elm_lang$core$Native_Bitwise.shiftRightBy;
var _elm_lang$core$Bitwise$shiftLeftBy = _elm_lang$core$Native_Bitwise.shiftLeftBy;
var _elm_lang$core$Bitwise$complement = _elm_lang$core$Native_Bitwise.complement;
var _elm_lang$core$Bitwise$xor = _elm_lang$core$Native_Bitwise.xor;
var _elm_lang$core$Bitwise$or = _elm_lang$core$Native_Bitwise.or;
var _elm_lang$core$Bitwise$and = _elm_lang$core$Native_Bitwise.and;

var _elm_community$intdict$IntDict$combineBits = F3(
	function (a, b, mask) {
		return (a & (~mask)) | (b & mask);
	});
var _elm_community$intdict$IntDict$foldr = F3(
	function (f, acc, dict) {
		foldr:
		while (true) {
			var _p0 = dict;
			switch (_p0.ctor) {
				case 'Empty':
					return acc;
				case 'Leaf':
					var _p1 = _p0._0;
					return A3(f, _p1.key, _p1.value, acc);
				default:
					var _p2 = _p0._0;
					var _v1 = f,
						_v2 = A3(_elm_community$intdict$IntDict$foldr, f, acc, _p2.right),
						_v3 = _p2.left;
					f = _v1;
					acc = _v2;
					dict = _v3;
					continue foldr;
			}
		}
	});
var _elm_community$intdict$IntDict$keys = function (dict) {
	return A3(
		_elm_community$intdict$IntDict$foldr,
		F3(
			function (key, value, keyList) {
				return {ctor: '::', _0: key, _1: keyList};
			}),
		{ctor: '[]'},
		dict);
};
var _elm_community$intdict$IntDict$values = function (dict) {
	return A3(
		_elm_community$intdict$IntDict$foldr,
		F3(
			function (key, value, valueList) {
				return {ctor: '::', _0: value, _1: valueList};
			}),
		{ctor: '[]'},
		dict);
};
var _elm_community$intdict$IntDict$toList = function (dict) {
	return A3(
		_elm_community$intdict$IntDict$foldr,
		F3(
			function (key, value, list) {
				return {
					ctor: '::',
					_0: {ctor: '_Tuple2', _0: key, _1: value},
					_1: list
				};
			}),
		{ctor: '[]'},
		dict);
};
var _elm_community$intdict$IntDict$toString = function (dict) {
	return A2(
		_elm_lang$core$Basics_ops['++'],
		'IntDict.fromList ',
		_elm_lang$core$Basics$toString(
			_elm_community$intdict$IntDict$toList(dict)));
};
var _elm_community$intdict$IntDict$foldl = F3(
	function (f, acc, dict) {
		foldl:
		while (true) {
			var _p3 = dict;
			switch (_p3.ctor) {
				case 'Empty':
					return acc;
				case 'Leaf':
					var _p4 = _p3._0;
					return A3(f, _p4.key, _p4.value, acc);
				default:
					var _p5 = _p3._0;
					var _v5 = f,
						_v6 = A3(_elm_community$intdict$IntDict$foldl, f, acc, _p5.left),
						_v7 = _p5.right;
					f = _v5;
					acc = _v6;
					dict = _v7;
					continue foldl;
			}
		}
	});
var _elm_community$intdict$IntDict$findMax = function (dict) {
	findMax:
	while (true) {
		var _p6 = dict;
		switch (_p6.ctor) {
			case 'Empty':
				return _elm_lang$core$Maybe$Nothing;
			case 'Leaf':
				var _p7 = _p6._0;
				return _elm_lang$core$Maybe$Just(
					{ctor: '_Tuple2', _0: _p7.key, _1: _p7.value});
			default:
				var _v9 = _p6._0.right;
				dict = _v9;
				continue findMax;
		}
	}
};
var _elm_community$intdict$IntDict$findMin = function (dict) {
	findMin:
	while (true) {
		var _p8 = dict;
		switch (_p8.ctor) {
			case 'Empty':
				return _elm_lang$core$Maybe$Nothing;
			case 'Leaf':
				var _p9 = _p8._0;
				return _elm_lang$core$Maybe$Just(
					{ctor: '_Tuple2', _0: _p9.key, _1: _p9.value});
			default:
				var _v11 = _p8._0.left;
				dict = _v11;
				continue findMin;
		}
	}
};
var _elm_community$intdict$IntDict$size = function (dict) {
	var _p10 = dict;
	switch (_p10.ctor) {
		case 'Empty':
			return 0;
		case 'Leaf':
			return 1;
		default:
			return _p10._0.size;
	}
};
var _elm_community$intdict$IntDict$isEmpty = function (dict) {
	var _p11 = dict;
	if (_p11.ctor === 'Empty') {
		return true;
	} else {
		return false;
	}
};
var _elm_community$intdict$IntDict$highestBitSet = function (n) {
	var shiftOr = F2(
		function (i, shift) {
			return i | (i >>> shift);
		});
	var n1 = A2(shiftOr, n, 1);
	var n2 = A2(shiftOr, n1, 2);
	var n3 = A2(shiftOr, n2, 4);
	var n4 = A2(shiftOr, n3, 8);
	var n5 = A2(shiftOr, n4, 16);
	return n5 & (~(n5 >>> 1));
};
var _elm_community$intdict$IntDict$signBit = _elm_community$intdict$IntDict$highestBitSet(-1);
var _elm_community$intdict$IntDict$mostSignificantBranchingBit = F2(
	function (a, b) {
		return (_elm_lang$core$Native_Utils.eq(a, _elm_community$intdict$IntDict$signBit) || _elm_lang$core$Native_Utils.eq(b, _elm_community$intdict$IntDict$signBit)) ? _elm_community$intdict$IntDict$signBit : A2(_elm_lang$core$Basics$max, a, b);
	});
var _elm_community$intdict$IntDict$isBranchingBitSet = function (p) {
	return function (_p12) {
		return A2(
			F2(
				function (x, y) {
					return !_elm_lang$core$Native_Utils.eq(x, y);
				}),
			0,
			p.branchingBit & (_elm_community$intdict$IntDict$signBit ^ _p12));
	};
};
var _elm_community$intdict$IntDict$higherBitMask = function (branchingBit) {
	return branchingBit ^ (~(branchingBit - 1));
};
var _elm_community$intdict$IntDict$prefixMatches = F2(
	function (p, n) {
		return _elm_lang$core$Native_Utils.eq(
			n & _elm_community$intdict$IntDict$higherBitMask(p.branchingBit),
			p.prefixBits);
	});
var _elm_community$intdict$IntDict$get = F2(
	function (key, dict) {
		get:
		while (true) {
			var _p13 = dict;
			switch (_p13.ctor) {
				case 'Empty':
					return _elm_lang$core$Maybe$Nothing;
				case 'Leaf':
					var _p14 = _p13._0;
					return _elm_lang$core$Native_Utils.eq(_p14.key, key) ? _elm_lang$core$Maybe$Just(_p14.value) : _elm_lang$core$Maybe$Nothing;
				default:
					var _p15 = _p13._0;
					if (!A2(_elm_community$intdict$IntDict$prefixMatches, _p15.prefix, key)) {
						return _elm_lang$core$Maybe$Nothing;
					} else {
						if (A2(_elm_community$intdict$IntDict$isBranchingBitSet, _p15.prefix, key)) {
							var _v15 = key,
								_v16 = _p15.right;
							key = _v15;
							dict = _v16;
							continue get;
						} else {
							var _v17 = key,
								_v18 = _p15.left;
							key = _v17;
							dict = _v18;
							continue get;
						}
					}
			}
		}
	});
var _elm_community$intdict$IntDict$member = F2(
	function (key, dict) {
		var _p16 = A2(_elm_community$intdict$IntDict$get, key, dict);
		if (_p16.ctor === 'Just') {
			return true;
		} else {
			return false;
		}
	});
var _elm_community$intdict$IntDict$lcp = F2(
	function (x, y) {
		var diff = x ^ y;
		var branchingBit = _elm_community$intdict$IntDict$highestBitSet(diff);
		var mask = _elm_community$intdict$IntDict$higherBitMask(branchingBit);
		var prefixBits = x & mask;
		return {prefixBits: prefixBits, branchingBit: branchingBit};
	});
var _elm_community$intdict$IntDict$isValidKey = function (k) {
	return _elm_lang$core$Native_Utils.eq(k | 0, k);
};
var _elm_community$intdict$IntDict$KeyPrefix = F2(
	function (a, b) {
		return {prefixBits: a, branchingBit: b};
	});
var _elm_community$intdict$IntDict$InnerType = F4(
	function (a, b, c, d) {
		return {prefix: a, left: b, right: c, size: d};
	});
var _elm_community$intdict$IntDict$Inner = function (a) {
	return {ctor: 'Inner', _0: a};
};
var _elm_community$intdict$IntDict$inner = F3(
	function (p, l, r) {
		var _p17 = {ctor: '_Tuple2', _0: l, _1: r};
		if (_p17._0.ctor === 'Empty') {
			return r;
		} else {
			if (_p17._1.ctor === 'Empty') {
				return l;
			} else {
				return _elm_community$intdict$IntDict$Inner(
					{
						prefix: p,
						left: l,
						right: r,
						size: _elm_community$intdict$IntDict$size(l) + _elm_community$intdict$IntDict$size(r)
					});
			}
		}
	});
var _elm_community$intdict$IntDict$Leaf = function (a) {
	return {ctor: 'Leaf', _0: a};
};
var _elm_community$intdict$IntDict$leaf = F2(
	function (k, v) {
		return _elm_community$intdict$IntDict$Leaf(
			{key: k, value: v});
	});
var _elm_community$intdict$IntDict$singleton = F2(
	function (key, value) {
		return A2(_elm_community$intdict$IntDict$leaf, key, value);
	});
var _elm_community$intdict$IntDict$Empty = {ctor: 'Empty'};
var _elm_community$intdict$IntDict$empty = _elm_community$intdict$IntDict$Empty;
var _elm_community$intdict$IntDict$update = F3(
	function (key, alter, dict) {
		var join = F2(
			function (_p19, _p18) {
				var _p20 = _p19;
				var _p24 = _p20._1;
				var _p21 = _p18;
				var _p23 = _p21._1;
				var _p22 = _p21._0;
				var prefix = A2(_elm_community$intdict$IntDict$lcp, _p20._0, _p22);
				return A2(_elm_community$intdict$IntDict$isBranchingBitSet, prefix, _p22) ? A3(_elm_community$intdict$IntDict$inner, prefix, _p24, _p23) : A3(_elm_community$intdict$IntDict$inner, prefix, _p23, _p24);
			});
		var alteredNode = function (mv) {
			var _p25 = alter(mv);
			if (_p25.ctor === 'Just') {
				return A2(_elm_community$intdict$IntDict$leaf, key, _p25._0);
			} else {
				return _elm_community$intdict$IntDict$empty;
			}
		};
		var _p26 = dict;
		switch (_p26.ctor) {
			case 'Empty':
				return alteredNode(_elm_lang$core$Maybe$Nothing);
			case 'Leaf':
				var _p27 = _p26._0;
				return _elm_lang$core$Native_Utils.eq(_p27.key, key) ? alteredNode(
					_elm_lang$core$Maybe$Just(_p27.value)) : A2(
					join,
					{
						ctor: '_Tuple2',
						_0: key,
						_1: alteredNode(_elm_lang$core$Maybe$Nothing)
					},
					{ctor: '_Tuple2', _0: _p27.key, _1: dict});
			default:
				var _p28 = _p26._0;
				return A2(_elm_community$intdict$IntDict$prefixMatches, _p28.prefix, key) ? (A2(_elm_community$intdict$IntDict$isBranchingBitSet, _p28.prefix, key) ? A3(
					_elm_community$intdict$IntDict$inner,
					_p28.prefix,
					_p28.left,
					A3(_elm_community$intdict$IntDict$update, key, alter, _p28.right)) : A3(
					_elm_community$intdict$IntDict$inner,
					_p28.prefix,
					A3(_elm_community$intdict$IntDict$update, key, alter, _p28.left),
					_p28.right)) : A2(
					join,
					{
						ctor: '_Tuple2',
						_0: key,
						_1: alteredNode(_elm_lang$core$Maybe$Nothing)
					},
					{ctor: '_Tuple2', _0: _p28.prefix.prefixBits, _1: dict});
		}
	});
var _elm_community$intdict$IntDict$insert = F3(
	function (key, value, dict) {
		return A3(
			_elm_community$intdict$IntDict$update,
			key,
			_elm_lang$core$Basics$always(
				_elm_lang$core$Maybe$Just(value)),
			dict);
	});
var _elm_community$intdict$IntDict$remove = F2(
	function (key, dict) {
		return A3(
			_elm_community$intdict$IntDict$update,
			key,
			_elm_lang$core$Basics$always(_elm_lang$core$Maybe$Nothing),
			dict);
	});
var _elm_community$intdict$IntDict$filter = F2(
	function (predicate, dict) {
		var add = F3(
			function (k, v, d) {
				return A2(predicate, k, v) ? A3(_elm_community$intdict$IntDict$insert, k, v, d) : d;
			});
		return A3(_elm_community$intdict$IntDict$foldl, add, _elm_community$intdict$IntDict$empty, dict);
	});
var _elm_community$intdict$IntDict$map = F2(
	function (f, dict) {
		var _p29 = dict;
		switch (_p29.ctor) {
			case 'Empty':
				return _elm_community$intdict$IntDict$empty;
			case 'Leaf':
				var _p30 = _p29._0;
				return A2(
					_elm_community$intdict$IntDict$leaf,
					_p30.key,
					A2(f, _p30.key, _p30.value));
			default:
				var _p31 = _p29._0;
				return A3(
					_elm_community$intdict$IntDict$inner,
					_p31.prefix,
					A2(_elm_community$intdict$IntDict$map, f, _p31.left),
					A2(_elm_community$intdict$IntDict$map, f, _p31.right));
		}
	});
var _elm_community$intdict$IntDict$partition = F2(
	function (predicate, dict) {
		var add = F3(
			function (key, value, _p32) {
				var _p33 = _p32;
				var _p35 = _p33._1;
				var _p34 = _p33._0;
				return A2(predicate, key, value) ? {
					ctor: '_Tuple2',
					_0: A3(_elm_community$intdict$IntDict$insert, key, value, _p34),
					_1: _p35
				} : {
					ctor: '_Tuple2',
					_0: _p34,
					_1: A3(_elm_community$intdict$IntDict$insert, key, value, _p35)
				};
			});
		return A3(
			_elm_community$intdict$IntDict$foldl,
			add,
			{ctor: '_Tuple2', _0: _elm_community$intdict$IntDict$empty, _1: _elm_community$intdict$IntDict$empty},
			dict);
	});
var _elm_community$intdict$IntDict$fromList = function (pairs) {
	return A3(
		_elm_lang$core$List$foldl,
		_elm_lang$core$Basics$uncurry(_elm_community$intdict$IntDict$insert),
		_elm_community$intdict$IntDict$empty,
		pairs);
};
var _elm_community$intdict$IntDict$before = F2(
	function (key, dict) {
		var go = F2(
			function (def, dict) {
				go:
				while (true) {
					var _p36 = dict;
					switch (_p36.ctor) {
						case 'Empty':
							return _elm_community$intdict$IntDict$findMax(def);
						case 'Leaf':
							var _p37 = _p36._0;
							return (_elm_lang$core$Native_Utils.cmp(_p37.key, key) > -1) ? _elm_community$intdict$IntDict$findMax(def) : _elm_lang$core$Maybe$Just(
								{ctor: '_Tuple2', _0: _p37.key, _1: _p37.value});
						default:
							var _p38 = _p36._0;
							if (!A2(_elm_community$intdict$IntDict$prefixMatches, _p38.prefix, key)) {
								return (_elm_lang$core$Native_Utils.cmp(_p38.prefix.prefixBits, key) > 0) ? _elm_community$intdict$IntDict$findMax(def) : _elm_community$intdict$IntDict$findMax(_p38.right);
							} else {
								if (A2(_elm_community$intdict$IntDict$isBranchingBitSet, _p38.prefix, key)) {
									var _v28 = _p38.left,
										_v29 = _p38.right;
									def = _v28;
									dict = _v29;
									continue go;
								} else {
									var _v30 = def,
										_v31 = _p38.left;
									def = _v30;
									dict = _v31;
									continue go;
								}
							}
					}
				}
			});
		return A2(go, _elm_community$intdict$IntDict$Empty, dict);
	});
var _elm_community$intdict$IntDict$after = F2(
	function (key, dict) {
		var go = F2(
			function (def, dict) {
				go:
				while (true) {
					var _p39 = dict;
					switch (_p39.ctor) {
						case 'Empty':
							return _elm_community$intdict$IntDict$findMin(def);
						case 'Leaf':
							var _p40 = _p39._0;
							return (_elm_lang$core$Native_Utils.cmp(_p40.key, key) < 1) ? _elm_community$intdict$IntDict$findMin(def) : _elm_lang$core$Maybe$Just(
								{ctor: '_Tuple2', _0: _p40.key, _1: _p40.value});
						default:
							var _p41 = _p39._0;
							if (!A2(_elm_community$intdict$IntDict$prefixMatches, _p41.prefix, key)) {
								return (_elm_lang$core$Native_Utils.cmp(_p41.prefix.prefixBits, key) < 0) ? _elm_community$intdict$IntDict$findMin(def) : _elm_community$intdict$IntDict$findMin(_p41.left);
							} else {
								if (A2(_elm_community$intdict$IntDict$isBranchingBitSet, _p41.prefix, key)) {
									var _v33 = def,
										_v34 = _p41.right;
									def = _v33;
									dict = _v34;
									continue go;
								} else {
									var _v35 = _p41.right,
										_v36 = _p41.left;
									def = _v35;
									dict = _v36;
									continue go;
								}
							}
					}
				}
			});
		return A2(go, _elm_community$intdict$IntDict$Empty, dict);
	});
var _elm_community$intdict$IntDict$Right = {ctor: 'Right'};
var _elm_community$intdict$IntDict$Left = {ctor: 'Left'};
var _elm_community$intdict$IntDict$Disjunct = F2(
	function (a, b) {
		return {ctor: 'Disjunct', _0: a, _1: b};
	});
var _elm_community$intdict$IntDict$Parent = F2(
	function (a, b) {
		return {ctor: 'Parent', _0: a, _1: b};
	});
var _elm_community$intdict$IntDict$SamePrefix = {ctor: 'SamePrefix'};
var _elm_community$intdict$IntDict$determineBranchRelation = F2(
	function (l, r) {
		var childEdge = F2(
			function (prefix, c) {
				return A2(_elm_community$intdict$IntDict$isBranchingBitSet, prefix, c.prefix.prefixBits) ? _elm_community$intdict$IntDict$Right : _elm_community$intdict$IntDict$Left;
			});
		var rp = r.prefix;
		var lp = l.prefix;
		var mask = _elm_community$intdict$IntDict$highestBitSet(
			A2(_elm_community$intdict$IntDict$mostSignificantBranchingBit, lp.branchingBit, rp.branchingBit));
		var modifiedRightPrefix = A3(_elm_community$intdict$IntDict$combineBits, rp.prefixBits, ~lp.prefixBits, mask);
		var prefix = A2(_elm_community$intdict$IntDict$lcp, lp.prefixBits, modifiedRightPrefix);
		return _elm_lang$core$Native_Utils.eq(lp, rp) ? _elm_community$intdict$IntDict$SamePrefix : (_elm_lang$core$Native_Utils.eq(prefix, lp) ? A2(
			_elm_community$intdict$IntDict$Parent,
			_elm_community$intdict$IntDict$Left,
			A2(childEdge, l.prefix, r)) : (_elm_lang$core$Native_Utils.eq(prefix, rp) ? A2(
			_elm_community$intdict$IntDict$Parent,
			_elm_community$intdict$IntDict$Right,
			A2(childEdge, r.prefix, l)) : A2(
			_elm_community$intdict$IntDict$Disjunct,
			prefix,
			A2(childEdge, prefix, l))));
	});
var _elm_community$intdict$IntDict$uniteWith = F3(
	function (merger, l, r) {
		var mergeWith = F3(
			function (key, left, right) {
				var _p42 = {ctor: '_Tuple2', _0: left, _1: right};
				if (_p42._0.ctor === 'Just') {
					if (_p42._1.ctor === 'Just') {
						return _elm_lang$core$Maybe$Just(
							A3(merger, key, _p42._0._0, _p42._1._0));
					} else {
						return left;
					}
				} else {
					if (_p42._1.ctor === 'Just') {
						return right;
					} else {
						return _elm_lang$core$Native_Utils.crashCase(
							'IntDict',
							{
								start: {line: 709, column: 13},
								end: {line: 720, column: 154}
							},
							_p42)('IntDict.uniteWith: mergeWith was called with 2 Nothings. This is a bug in the implementation, please file a bug report!');
					}
				}
			});
		var _p44 = {ctor: '_Tuple2', _0: l, _1: r};
		_v38_2:
		do {
			_v38_1:
			do {
				switch (_p44._0.ctor) {
					case 'Empty':
						return r;
					case 'Leaf':
						switch (_p44._1.ctor) {
							case 'Empty':
								break _v38_1;
							case 'Leaf':
								break _v38_2;
							default:
								break _v38_2;
						}
					default:
						switch (_p44._1.ctor) {
							case 'Empty':
								break _v38_1;
							case 'Leaf':
								var _p46 = _p44._1._0;
								return A3(
									_elm_community$intdict$IntDict$update,
									_p46.key,
									function (l_) {
										return A3(
											mergeWith,
											_p46.key,
											l_,
											_elm_lang$core$Maybe$Just(_p46.value));
									},
									l);
							default:
								var _p49 = _p44._1._0;
								var _p48 = _p44._0._0;
								var _p47 = A2(_elm_community$intdict$IntDict$determineBranchRelation, _p48, _p49);
								switch (_p47.ctor) {
									case 'SamePrefix':
										return A3(
											_elm_community$intdict$IntDict$inner,
											_p48.prefix,
											A3(_elm_community$intdict$IntDict$uniteWith, merger, _p48.left, _p49.left),
											A3(_elm_community$intdict$IntDict$uniteWith, merger, _p48.right, _p49.right));
									case 'Parent':
										if (_p47._0.ctor === 'Left') {
											if (_p47._1.ctor === 'Right') {
												return A3(
													_elm_community$intdict$IntDict$inner,
													_p48.prefix,
													_p48.left,
													A3(_elm_community$intdict$IntDict$uniteWith, merger, _p48.right, r));
											} else {
												return A3(
													_elm_community$intdict$IntDict$inner,
													_p48.prefix,
													A3(_elm_community$intdict$IntDict$uniteWith, merger, _p48.left, r),
													_p48.right);
											}
										} else {
											if (_p47._1.ctor === 'Right') {
												return A3(
													_elm_community$intdict$IntDict$inner,
													_p49.prefix,
													_p49.left,
													A3(_elm_community$intdict$IntDict$uniteWith, merger, l, _p49.right));
											} else {
												return A3(
													_elm_community$intdict$IntDict$inner,
													_p49.prefix,
													A3(_elm_community$intdict$IntDict$uniteWith, merger, l, _p49.left),
													_p49.right);
											}
										}
									default:
										if (_p47._1.ctor === 'Left') {
											return A3(_elm_community$intdict$IntDict$inner, _p47._0, l, r);
										} else {
											return A3(_elm_community$intdict$IntDict$inner, _p47._0, r, l);
										}
								}
						}
				}
			} while(false);
			return l;
		} while(false);
		var _p45 = _p44._0._0;
		return A3(
			_elm_community$intdict$IntDict$update,
			_p45.key,
			function (r_) {
				return A3(
					mergeWith,
					_p45.key,
					_elm_lang$core$Maybe$Just(_p45.value),
					r_);
			},
			r);
	});
var _elm_community$intdict$IntDict$union = _elm_community$intdict$IntDict$uniteWith(
	F3(
		function (key, old, $new) {
			return old;
		}));
var _elm_community$intdict$IntDict$intersect = F2(
	function (l, r) {
		intersect:
		while (true) {
			var _p50 = {ctor: '_Tuple2', _0: l, _1: r};
			_v40_2:
			do {
				_v40_1:
				do {
					switch (_p50._0.ctor) {
						case 'Empty':
							return _elm_community$intdict$IntDict$Empty;
						case 'Leaf':
							switch (_p50._1.ctor) {
								case 'Empty':
									break _v40_1;
								case 'Leaf':
									break _v40_2;
								default:
									break _v40_2;
							}
						default:
							switch (_p50._1.ctor) {
								case 'Empty':
									break _v40_1;
								case 'Leaf':
									var _p52 = _p50._1._0;
									var _p51 = A2(_elm_community$intdict$IntDict$get, _p52.key, l);
									if (_p51.ctor === 'Just') {
										return A2(_elm_community$intdict$IntDict$leaf, _p52.key, _p51._0);
									} else {
										return _elm_community$intdict$IntDict$Empty;
									}
								default:
									var _p55 = _p50._1._0;
									var _p54 = _p50._0._0;
									var _p53 = A2(_elm_community$intdict$IntDict$determineBranchRelation, _p54, _p55);
									switch (_p53.ctor) {
										case 'SamePrefix':
											return A3(
												_elm_community$intdict$IntDict$inner,
												_p54.prefix,
												A2(_elm_community$intdict$IntDict$intersect, _p54.left, _p55.left),
												A2(_elm_community$intdict$IntDict$intersect, _p54.right, _p55.right));
										case 'Parent':
											if (_p53._0.ctor === 'Left') {
												if (_p53._1.ctor === 'Right') {
													var _v43 = _p54.right,
														_v44 = r;
													l = _v43;
													r = _v44;
													continue intersect;
												} else {
													var _v45 = _p54.left,
														_v46 = r;
													l = _v45;
													r = _v46;
													continue intersect;
												}
											} else {
												if (_p53._1.ctor === 'Right') {
													var _v47 = l,
														_v48 = _p55.right;
													l = _v47;
													r = _v48;
													continue intersect;
												} else {
													var _v49 = l,
														_v50 = _p55.left;
													l = _v49;
													r = _v50;
													continue intersect;
												}
											}
										default:
											return _elm_community$intdict$IntDict$Empty;
									}
							}
					}
				} while(false);
				return _elm_community$intdict$IntDict$Empty;
			} while(false);
			return A2(_elm_community$intdict$IntDict$member, _p50._0._0.key, r) ? l : _elm_community$intdict$IntDict$Empty;
		}
	});
var _elm_community$intdict$IntDict$diff = F2(
	function (l, r) {
		diff:
		while (true) {
			var _p56 = {ctor: '_Tuple2', _0: l, _1: r};
			_v51_2:
			do {
				_v51_1:
				do {
					switch (_p56._0.ctor) {
						case 'Empty':
							return _elm_community$intdict$IntDict$Empty;
						case 'Leaf':
							switch (_p56._1.ctor) {
								case 'Empty':
									break _v51_1;
								case 'Leaf':
									break _v51_2;
								default:
									break _v51_2;
							}
						default:
							switch (_p56._1.ctor) {
								case 'Empty':
									break _v51_1;
								case 'Leaf':
									return A2(_elm_community$intdict$IntDict$remove, _p56._1._0.key, l);
								default:
									var _p59 = _p56._1._0;
									var _p58 = _p56._0._0;
									var _p57 = A2(_elm_community$intdict$IntDict$determineBranchRelation, _p58, _p59);
									switch (_p57.ctor) {
										case 'SamePrefix':
											return A3(
												_elm_community$intdict$IntDict$inner,
												_p58.prefix,
												A2(_elm_community$intdict$IntDict$diff, _p58.left, _p59.left),
												A2(_elm_community$intdict$IntDict$diff, _p58.right, _p59.right));
										case 'Parent':
											if (_p57._0.ctor === 'Left') {
												if (_p57._1.ctor === 'Left') {
													return A3(
														_elm_community$intdict$IntDict$inner,
														_p58.prefix,
														A2(_elm_community$intdict$IntDict$diff, _p58.left, r),
														_p58.right);
												} else {
													return A3(
														_elm_community$intdict$IntDict$inner,
														_p58.prefix,
														_p58.left,
														A2(_elm_community$intdict$IntDict$diff, _p58.right, r));
												}
											} else {
												if (_p57._1.ctor === 'Left') {
													var _v53 = l,
														_v54 = _p59.left;
													l = _v53;
													r = _v54;
													continue diff;
												} else {
													var _v55 = l,
														_v56 = _p59.right;
													l = _v55;
													r = _v56;
													continue diff;
												}
											}
										default:
											return l;
									}
							}
					}
				} while(false);
				return l;
			} while(false);
			return A2(_elm_community$intdict$IntDict$member, _p56._0._0.key, r) ? _elm_community$intdict$IntDict$Empty : l;
		}
	});
var _elm_community$intdict$IntDict$merge = F6(
	function (left, both, right, l, r, acc) {
		var m = A3(_elm_community$intdict$IntDict$merge, left, both, right);
		var _p60 = {ctor: '_Tuple2', _0: l, _1: r};
		_v57_2:
		do {
			_v57_1:
			do {
				switch (_p60._0.ctor) {
					case 'Empty':
						return A3(_elm_community$intdict$IntDict$foldl, right, acc, r);
					case 'Leaf':
						switch (_p60._1.ctor) {
							case 'Empty':
								break _v57_1;
							case 'Leaf':
								break _v57_2;
							default:
								break _v57_2;
						}
					default:
						switch (_p60._1.ctor) {
							case 'Empty':
								break _v57_1;
							case 'Leaf':
								var _p64 = _p60._1._0;
								var _p63 = A2(_elm_community$intdict$IntDict$get, _p64.key, l);
								if (_p63.ctor === 'Nothing') {
									return A3(
										m,
										l,
										_elm_community$intdict$IntDict$Empty,
										A3(right, _p64.key, _p64.value, acc));
								} else {
									return A3(
										m,
										A2(_elm_community$intdict$IntDict$remove, _p64.key, l),
										_elm_community$intdict$IntDict$Empty,
										A4(both, _p64.key, _p63._0, _p64.value, acc));
								}
							default:
								var _p67 = _p60._1._0;
								var _p66 = _p60._0._0;
								var _p65 = A2(_elm_community$intdict$IntDict$determineBranchRelation, _p66, _p67);
								switch (_p65.ctor) {
									case 'SamePrefix':
										return A3(
											m,
											_p66.right,
											_p67.right,
											A3(m, _p66.left, _p67.left, acc));
									case 'Parent':
										if (_p65._0.ctor === 'Left') {
											if (_p65._1.ctor === 'Left') {
												return A3(
													m,
													_p66.right,
													_elm_community$intdict$IntDict$Empty,
													A3(m, _p66.left, r, acc));
											} else {
												return A3(
													m,
													_p66.right,
													r,
													A3(m, _p66.left, _elm_community$intdict$IntDict$Empty, acc));
											}
										} else {
											if (_p65._1.ctor === 'Left') {
												return A3(
													m,
													_elm_community$intdict$IntDict$Empty,
													_p67.right,
													A3(m, l, _p67.left, acc));
											} else {
												return A3(
													m,
													l,
													_p67.right,
													A3(m, _elm_community$intdict$IntDict$Empty, _p67.left, acc));
											}
										}
									default:
										if (_p65._1.ctor === 'Left') {
											return A3(
												m,
												_elm_community$intdict$IntDict$Empty,
												r,
												A3(m, l, _elm_community$intdict$IntDict$Empty, acc));
										} else {
											return A3(
												m,
												l,
												_elm_community$intdict$IntDict$Empty,
												A3(m, _elm_community$intdict$IntDict$Empty, r, acc));
										}
								}
						}
				}
			} while(false);
			return A3(_elm_community$intdict$IntDict$foldl, left, acc, l);
		} while(false);
		var _p62 = _p60._0._0;
		var _p61 = A2(_elm_community$intdict$IntDict$get, _p62.key, r);
		if (_p61.ctor === 'Nothing') {
			return A3(
				m,
				_elm_community$intdict$IntDict$Empty,
				r,
				A3(left, _p62.key, _p62.value, acc));
		} else {
			return A3(
				m,
				_elm_community$intdict$IntDict$Empty,
				A2(_elm_community$intdict$IntDict$remove, _p62.key, r),
				A4(both, _p62.key, _p62.value, _p61._0, acc));
		}
	});

var _elm_community$graph$Graph$ignorePath = F4(
	function (visit, path, _p0, acc) {
		var _p1 = path;
		if (_p1.ctor === '[]') {
			return _elm_lang$core$Native_Utils.crashCase(
				'Graph',
				{
					start: {line: 1084, column: 5},
					end: {line: 1089, column: 26}
				},
				_p1)('Graph.ignorePath: No algorithm should ever pass an empty path into this BfsNodeVisitor.');
		} else {
			return A2(visit, _p1._0, acc);
		}
	});
var _elm_community$graph$Graph$onFinish = F3(
	function (visitor, ctx, acc) {
		return {
			ctor: '_Tuple2',
			_0: acc,
			_1: visitor(ctx)
		};
	});
var _elm_community$graph$Graph$onDiscovery = F3(
	function (visitor, ctx, acc) {
		return {
			ctor: '_Tuple2',
			_0: A2(visitor, ctx, acc),
			_1: _elm_lang$core$Basics$identity
		};
	});
var _elm_community$graph$Graph$alongIncomingEdges = function (ctx) {
	return _elm_community$intdict$IntDict$keys(ctx.incoming);
};
var _elm_community$graph$Graph$alongOutgoingEdges = function (ctx) {
	return _elm_community$intdict$IntDict$keys(ctx.outgoing);
};
var _elm_community$graph$Graph$applyEdgeDiff = F3(
	function (nodeId, diff, graphRep) {
		var updateOutgoingEdge = F2(
			function (upd, node) {
				return _elm_lang$core$Native_Utils.update(
					node,
					{
						outgoing: A3(_elm_community$intdict$IntDict$update, nodeId, upd, node.outgoing)
					});
			});
		var updateIncomingEdge = F2(
			function (upd, node) {
				return _elm_lang$core$Native_Utils.update(
					node,
					{
						incoming: A3(_elm_community$intdict$IntDict$update, nodeId, upd, node.incoming)
					});
			});
		var edgeUpdateToMaybe = function (edgeUpdate) {
			var _p3 = edgeUpdate;
			if (_p3.ctor === 'Insert') {
				return _elm_lang$core$Maybe$Just(_p3._0);
			} else {
				return _elm_lang$core$Maybe$Nothing;
			}
		};
		var updateAdjacency = F3(
			function (updateEdge, updatedId, edgeUpdate) {
				var updateLbl = updateEdge(
					_elm_lang$core$Basics$always(
						edgeUpdateToMaybe(edgeUpdate)));
				return A2(
					_elm_community$intdict$IntDict$update,
					updatedId,
					_elm_lang$core$Maybe$map(updateLbl));
			});
		var flippedFoldl = F3(
			function (f, dict, acc) {
				return A3(_elm_community$intdict$IntDict$foldl, f, acc, dict);
			});
		return A3(
			flippedFoldl,
			updateAdjacency(updateOutgoingEdge),
			diff.outgoing,
			A3(
				flippedFoldl,
				updateAdjacency(updateIncomingEdge),
				diff.incoming,
				graphRep));
	});
var _elm_community$graph$Graph$emptyDiff = {incoming: _elm_community$intdict$IntDict$empty, outgoing: _elm_community$intdict$IntDict$empty};
var _elm_community$graph$Graph$unGraph = function (graph) {
	var _p4 = graph;
	return _p4._0;
};
var _elm_community$graph$Graph$size = function (_p5) {
	return _elm_community$intdict$IntDict$size(
		_elm_community$graph$Graph$unGraph(_p5));
};
var _elm_community$graph$Graph$member = function (nodeId) {
	return function (_p6) {
		return A2(
			_elm_community$intdict$IntDict$member,
			nodeId,
			_elm_community$graph$Graph$unGraph(_p6));
	};
};
var _elm_community$graph$Graph$get = function (nodeId) {
	return function (_p7) {
		return A2(
			_elm_community$intdict$IntDict$get,
			nodeId,
			_elm_community$graph$Graph$unGraph(_p7));
	};
};
var _elm_community$graph$Graph$unsafeGet = F3(
	function (msg, id, graph) {
		var _p8 = A2(_elm_community$graph$Graph$get, id, graph);
		if (_p8.ctor === 'Nothing') {
			return _elm_lang$core$Native_Utils.crashCase(
				'Graph',
				{
					start: {line: 735, column: 5},
					end: {line: 740, column: 16}
				},
				_p8)(msg);
		} else {
			return _p8._0;
		}
	});
var _elm_community$graph$Graph$topologicalSort = function (_p10) {
	var _p11 = _p10;
	var error = 'Graph.topologicalSort: Invalid `AcyclicGraph`, where the ordering contained nodes not present in the graph';
	return A2(
		_elm_lang$core$List$map,
		function (id) {
			return A3(_elm_community$graph$Graph$unsafeGet, error, id, _p11._0);
		},
		_p11._1);
};
var _elm_community$graph$Graph$nodeIdRange = function (graph) {
	return A2(
		_elm_lang$core$Maybe$andThen,
		function (_p12) {
			var _p13 = _p12;
			return A2(
				_elm_lang$core$Maybe$andThen,
				function (_p14) {
					var _p15 = _p14;
					return _elm_lang$core$Maybe$Just(
						{ctor: '_Tuple2', _0: _p13._0, _1: _p15._0});
				},
				_elm_community$intdict$IntDict$findMax(
					_elm_community$graph$Graph$unGraph(graph)));
		},
		_elm_community$intdict$IntDict$findMin(
			_elm_community$graph$Graph$unGraph(graph)));
};
var _elm_community$graph$Graph$nodes = function (_p16) {
	return A2(
		_elm_lang$core$List$map,
		function (_) {
			return _.node;
		},
		_elm_community$intdict$IntDict$values(
			_elm_community$graph$Graph$unGraph(_p16)));
};
var _elm_community$graph$Graph$nodeIds = function (_p17) {
	return _elm_community$intdict$IntDict$keys(
		_elm_community$graph$Graph$unGraph(_p17));
};
var _elm_community$graph$Graph$edges = function (graph) {
	var flippedFoldl = F3(
		function (f, dict, list) {
			return A3(_elm_community$intdict$IntDict$foldl, f, list, dict);
		});
	var prependEdges = F2(
		function (node1, ctx) {
			return A2(
				flippedFoldl,
				F2(
					function (node2, e) {
						return F2(
							function (x, y) {
								return {ctor: '::', _0: x, _1: y};
							})(
							{to: node2, from: node1, label: e});
					}),
				ctx.outgoing);
		});
	return A3(
		flippedFoldl,
		prependEdges,
		_elm_community$graph$Graph$unGraph(graph),
		{ctor: '[]'});
};
var _elm_community$graph$Graph$toString = function (graph) {
	var edgeList = _elm_community$graph$Graph$edges(graph);
	var nodeList = _elm_community$graph$Graph$nodes(graph);
	return A2(
		_elm_lang$core$Basics_ops['++'],
		'Graph.fromNodesAndEdges ',
		A2(
			_elm_lang$core$Basics_ops['++'],
			_elm_lang$core$Basics$toString(nodeList),
			A2(
				_elm_lang$core$Basics_ops['++'],
				' ',
				_elm_lang$core$Basics$toString(edgeList))));
};
var _elm_community$graph$Graph$Node = F2(
	function (a, b) {
		return {id: a, label: b};
	});
var _elm_community$graph$Graph$Edge = F3(
	function (a, b, c) {
		return {from: a, to: b, label: c};
	});
var _elm_community$graph$Graph$NodeContext = F3(
	function (a, b, c) {
		return {node: a, incoming: b, outgoing: c};
	});
var _elm_community$graph$Graph$EdgeDiff = F2(
	function (a, b) {
		return {incoming: a, outgoing: b};
	});
var _elm_community$graph$Graph$Graph = function (a) {
	return {ctor: 'Graph', _0: a};
};
var _elm_community$graph$Graph$empty = _elm_community$graph$Graph$Graph(_elm_community$intdict$IntDict$empty);
var _elm_community$graph$Graph$isEmpty = function (graph) {
	return _elm_lang$core$Native_Utils.eq(graph, _elm_community$graph$Graph$empty);
};
var _elm_community$graph$Graph$fromNodesAndEdges = F2(
	function (nodes, edges) {
		var addEdge = F2(
			function (edge, rep) {
				var updateIncoming = function (ctx) {
					return _elm_lang$core$Native_Utils.update(
						ctx,
						{
							incoming: A3(_elm_community$intdict$IntDict$insert, edge.from, edge.label, ctx.incoming)
						});
				};
				var updateOutgoing = function (ctx) {
					return _elm_lang$core$Native_Utils.update(
						ctx,
						{
							outgoing: A3(_elm_community$intdict$IntDict$insert, edge.to, edge.label, ctx.outgoing)
						});
				};
				return A3(
					_elm_community$intdict$IntDict$update,
					edge.to,
					_elm_lang$core$Maybe$map(updateIncoming),
					A3(
						_elm_community$intdict$IntDict$update,
						edge.from,
						_elm_lang$core$Maybe$map(updateOutgoing),
						rep));
			});
		var addEdgeIfValid = F2(
			function (edge, rep) {
				return (A2(_elm_community$intdict$IntDict$member, edge.from, rep) && A2(_elm_community$intdict$IntDict$member, edge.to, rep)) ? A2(addEdge, edge, rep) : rep;
			});
		var nodeRep = A3(
			_elm_lang$core$List$foldl,
			function (n) {
				return A2(
					_elm_community$intdict$IntDict$insert,
					n.id,
					A3(_elm_community$graph$Graph$NodeContext, n, _elm_community$intdict$IntDict$empty, _elm_community$intdict$IntDict$empty));
			},
			_elm_community$intdict$IntDict$empty,
			nodes);
		return _elm_community$graph$Graph$Graph(
			A3(_elm_lang$core$List$foldl, addEdgeIfValid, nodeRep, edges));
	});
var _elm_community$graph$Graph$fromNodeLabelsAndEdgePairs = F2(
	function (labels, edgePairs) {
		var edges = A2(
			_elm_lang$core$List$map,
			function (_p18) {
				var _p19 = _p18;
				return A3(
					_elm_community$graph$Graph$Edge,
					_p19._0,
					_p19._1,
					{ctor: '_Tuple0'});
			},
			edgePairs);
		var nodes = _elm_lang$core$Tuple$second(
			A3(
				_elm_lang$core$List$foldl,
				F2(
					function (lbl, _p20) {
						var _p21 = _p20;
						var _p22 = _p21._0;
						return {
							ctor: '_Tuple2',
							_0: _p22 + 1,
							_1: {
								ctor: '::',
								_0: A2(_elm_community$graph$Graph$Node, _p22, lbl),
								_1: _p21._1
							}
						};
					}),
				{
					ctor: '_Tuple2',
					_0: 0,
					_1: {ctor: '[]'}
				},
				labels));
		return A2(_elm_community$graph$Graph$fromNodesAndEdges, nodes, edges);
	});
var _elm_community$graph$Graph$symmetricClosure = function (edgeMerger) {
	var orderedEdgeMerger = F4(
		function (from, to, outgoing, incoming) {
			return (_elm_lang$core$Native_Utils.cmp(from, to) < 1) ? A4(edgeMerger, from, to, outgoing, incoming) : A4(edgeMerger, to, from, incoming, outgoing);
		});
	var updateContext = F2(
		function (nodeId, ctx) {
			var edges = A3(
				_elm_community$intdict$IntDict$uniteWith,
				orderedEdgeMerger(nodeId),
				ctx.outgoing,
				ctx.incoming);
			return _elm_lang$core$Native_Utils.update(
				ctx,
				{outgoing: edges, incoming: edges});
		});
	return function (_p23) {
		return _elm_community$graph$Graph$Graph(
			A2(
				_elm_community$intdict$IntDict$map,
				updateContext,
				_elm_community$graph$Graph$unGraph(_p23)));
	};
};
var _elm_community$graph$Graph$reverseEdges = function () {
	var updateContext = F2(
		function (nodeId, ctx) {
			return _elm_lang$core$Native_Utils.update(
				ctx,
				{outgoing: ctx.incoming, incoming: ctx.outgoing});
		});
	return function (_p24) {
		return _elm_community$graph$Graph$Graph(
			A2(
				_elm_community$intdict$IntDict$map,
				updateContext,
				_elm_community$graph$Graph$unGraph(_p24)));
	};
}();
var _elm_community$graph$Graph$Remove = function (a) {
	return {ctor: 'Remove', _0: a};
};
var _elm_community$graph$Graph$Insert = function (a) {
	return {ctor: 'Insert', _0: a};
};
var _elm_community$graph$Graph$computeEdgeDiff = F2(
	function (old, $new) {
		var collectUpdates = F3(
			function (edgeUpdate, updatedId, label) {
				var replaceUpdate = function (old) {
					var _p25 = {
						ctor: '_Tuple2',
						_0: old,
						_1: edgeUpdate(label)
					};
					if (_p25._0.ctor === 'Just') {
						if (_p25._0._0.ctor === 'Remove') {
							if (_p25._1.ctor === 'Insert') {
								var _p26 = _p25._1._0;
								return _elm_lang$core$Native_Utils.eq(_p25._0._0._0, _p26) ? _elm_lang$core$Maybe$Nothing : _elm_lang$core$Maybe$Just(
									_elm_community$graph$Graph$Insert(_p26));
							} else {
								return _elm_lang$core$Native_Utils.crashCase(
									'Graph',
									{
										start: {line: 247, column: 21},
										end: {line: 261, column: 36}
									},
									_p25)('Graph.computeEdgeDiff: Collected two removals for the same edge. This is an error in the implementation of Graph and you should file a bug report!');
							}
						} else {
							return _elm_lang$core$Native_Utils.crashCase(
								'Graph',
								{
									start: {line: 247, column: 21},
									end: {line: 261, column: 36}
								},
								_p25)('Graph.computeEdgeDiff: Collected inserts before removals. This is an error in the implementation of Graph and you should file a bug report!');
						}
					} else {
						return _elm_lang$core$Maybe$Just(_p25._1);
					}
				};
				return A2(_elm_community$intdict$IntDict$update, updatedId, replaceUpdate);
			});
		var collect = F3(
			function (edgeUpdate, adj, updates) {
				return A3(
					_elm_community$intdict$IntDict$foldl,
					collectUpdates(edgeUpdate),
					updates,
					adj);
			});
		var _p29 = {ctor: '_Tuple2', _0: old, _1: $new};
		if (_p29._0.ctor === 'Nothing') {
			if (_p29._1.ctor === 'Nothing') {
				return _elm_community$graph$Graph$emptyDiff;
			} else {
				var _p31 = _p29._1._0;
				return {
					outgoing: A3(collect, _elm_community$graph$Graph$Insert, _p31.incoming, _elm_community$intdict$IntDict$empty),
					incoming: A3(collect, _elm_community$graph$Graph$Insert, _p31.outgoing, _elm_community$intdict$IntDict$empty)
				};
			}
		} else {
			if (_p29._1.ctor === 'Nothing') {
				var _p30 = _p29._0._0;
				return {
					outgoing: A3(collect, _elm_community$graph$Graph$Remove, _p30.incoming, _elm_community$intdict$IntDict$empty),
					incoming: A3(collect, _elm_community$graph$Graph$Remove, _p30.outgoing, _elm_community$intdict$IntDict$empty)
				};
			} else {
				var _p33 = _p29._0._0;
				var _p32 = _p29._1._0;
				return _elm_lang$core$Native_Utils.eq(_p33, _p32) ? _elm_community$graph$Graph$emptyDiff : {
					outgoing: A3(
						collect,
						_elm_community$graph$Graph$Insert,
						_p32.incoming,
						A3(collect, _elm_community$graph$Graph$Remove, _p33.incoming, _elm_community$intdict$IntDict$empty)),
					incoming: A3(
						collect,
						_elm_community$graph$Graph$Insert,
						_p32.outgoing,
						A3(collect, _elm_community$graph$Graph$Remove, _p33.outgoing, _elm_community$intdict$IntDict$empty))
				};
			}
		}
	});
var _elm_community$graph$Graph$update = F2(
	function (nodeId, updater) {
		var wrappedUpdater = function (rep) {
			var filterInvalidEdges = function (ctx) {
				return _elm_community$intdict$IntDict$filter(
					F2(
						function (id, _p34) {
							return _elm_lang$core$Native_Utils.eq(id, ctx.node.id) || A2(_elm_community$intdict$IntDict$member, id, rep);
						}));
			};
			var cleanUpEdges = function (ctx) {
				return _elm_lang$core$Native_Utils.update(
					ctx,
					{
						incoming: A2(filterInvalidEdges, ctx, ctx.incoming),
						outgoing: A2(filterInvalidEdges, ctx, ctx.outgoing)
					});
			};
			var old = A2(_elm_community$intdict$IntDict$get, nodeId, rep);
			var $new = A2(
				_elm_lang$core$Maybe$map,
				cleanUpEdges,
				updater(old));
			var diff = A2(_elm_community$graph$Graph$computeEdgeDiff, old, $new);
			return A3(
				_elm_community$intdict$IntDict$update,
				nodeId,
				_elm_lang$core$Basics$always($new),
				A3(_elm_community$graph$Graph$applyEdgeDiff, nodeId, diff, rep));
		};
		return function (_p35) {
			return _elm_community$graph$Graph$Graph(
				wrappedUpdater(
					_elm_community$graph$Graph$unGraph(_p35)));
		};
	});
var _elm_community$graph$Graph$insert = F2(
	function (nodeContext, graph) {
		return A3(
			_elm_community$graph$Graph$update,
			nodeContext.node.id,
			_elm_lang$core$Basics$always(
				_elm_lang$core$Maybe$Just(nodeContext)),
			graph);
	});
var _elm_community$graph$Graph$inducedSubgraph = F2(
	function (nodeIds, graph) {
		var insertContextById = F2(
			function (nodeId, acc) {
				var _p36 = A2(_elm_community$graph$Graph$get, nodeId, graph);
				if (_p36.ctor === 'Just') {
					return A2(_elm_community$graph$Graph$insert, _p36._0, acc);
				} else {
					return acc;
				}
			});
		return A3(_elm_lang$core$List$foldl, insertContextById, _elm_community$graph$Graph$empty, nodeIds);
	});
var _elm_community$graph$Graph$remove = F2(
	function (nodeId, graph) {
		return A3(
			_elm_community$graph$Graph$update,
			nodeId,
			_elm_lang$core$Basics$always(_elm_lang$core$Maybe$Nothing),
			graph);
	});
var _elm_community$graph$Graph$fold = F3(
	function (f, acc, graph) {
		var go = F2(
			function (acc, graph1) {
				go:
				while (true) {
					var maybeContext = A2(
						_elm_lang$core$Maybe$andThen,
						function (id) {
							return A2(_elm_community$graph$Graph$get, id, graph);
						},
						A2(
							_elm_lang$core$Maybe$map,
							_elm_lang$core$Tuple$first,
							_elm_community$graph$Graph$nodeIdRange(graph1)));
					var _p37 = maybeContext;
					if (_p37.ctor === 'Just') {
						var _p38 = _p37._0;
						var _v13 = A2(f, _p38, acc),
							_v14 = A2(_elm_community$graph$Graph$remove, _p38.node.id, graph1);
						acc = _v13;
						graph1 = _v14;
						continue go;
					} else {
						return acc;
					}
				}
			});
		return A2(go, acc, graph);
	});
var _elm_community$graph$Graph$mapContexts = function (f) {
	return A2(
		_elm_community$graph$Graph$fold,
		function (ctx) {
			return _elm_community$graph$Graph$insert(
				f(ctx));
		},
		_elm_community$graph$Graph$empty);
};
var _elm_community$graph$Graph$mapNodes = function (f) {
	return A2(
		_elm_community$graph$Graph$fold,
		function (ctx) {
			return _elm_community$graph$Graph$insert(
				_elm_lang$core$Native_Utils.update(
					ctx,
					{
						node: {
							id: ctx.node.id,
							label: f(ctx.node.label)
						}
					}));
		},
		_elm_community$graph$Graph$empty);
};
var _elm_community$graph$Graph$mapEdges = function (f) {
	return A2(
		_elm_community$graph$Graph$fold,
		function (ctx) {
			return _elm_community$graph$Graph$insert(
				_elm_lang$core$Native_Utils.update(
					ctx,
					{
						outgoing: A2(
							_elm_community$intdict$IntDict$map,
							F2(
								function (n, e) {
									return f(e);
								}),
							ctx.outgoing),
						incoming: A2(
							_elm_community$intdict$IntDict$map,
							F2(
								function (n, e) {
									return f(e);
								}),
							ctx.incoming)
					}));
		},
		_elm_community$graph$Graph$empty);
};
var _elm_community$graph$Graph$guidedDfs = F5(
	function (selectNeighbors, visitNode, seeds, acc, graph) {
		var go = F3(
			function (seeds, acc, graph) {
				go:
				while (true) {
					var _p39 = seeds;
					if (_p39.ctor === '[]') {
						return {ctor: '_Tuple2', _0: acc, _1: graph};
					} else {
						var _p45 = _p39._1;
						var _p44 = _p39._0;
						var _p40 = A2(_elm_community$graph$Graph$get, _p44, graph);
						if (_p40.ctor === 'Nothing') {
							var _v17 = _p45,
								_v18 = acc,
								_v19 = graph;
							seeds = _v17;
							acc = _v18;
							graph = _v19;
							continue go;
						} else {
							var _p43 = _p40._0;
							var _p41 = A2(visitNode, _p43, acc);
							var accAfterDiscovery = _p41._0;
							var finishNode = _p41._1;
							var _p42 = A3(
								go,
								selectNeighbors(_p43),
								accAfterDiscovery,
								A2(_elm_community$graph$Graph$remove, _p44, graph));
							var accBeforeFinish = _p42._0;
							var graph1 = _p42._1;
							var accAfterFinish = finishNode(accBeforeFinish);
							var _v20 = _p45,
								_v21 = accAfterFinish,
								_v22 = graph1;
							seeds = _v20;
							acc = _v21;
							graph = _v22;
							continue go;
						}
					}
				}
			});
		return A3(go, seeds, acc, graph);
	});
var _elm_community$graph$Graph$dfs = F3(
	function (visitNode, acc, graph) {
		return _elm_lang$core$Tuple$first(
			A5(
				_elm_community$graph$Graph$guidedDfs,
				_elm_community$graph$Graph$alongOutgoingEdges,
				visitNode,
				_elm_community$graph$Graph$nodeIds(graph),
				acc,
				graph));
	});
var _elm_community$graph$Graph$dfsForest = F2(
	function (seeds, graph) {
		var visitNode = F2(
			function (ctx, trees) {
				return {
					ctor: '_Tuple2',
					_0: {ctor: '[]'},
					_1: function (children) {
						return {
							ctor: '::',
							_0: A2(_elm_community$graph$Graph_Tree$inner, ctx, children),
							_1: trees
						};
					}
				};
			});
		return _elm_lang$core$List$reverse(
			_elm_lang$core$Tuple$first(
				A5(
					_elm_community$graph$Graph$guidedDfs,
					_elm_community$graph$Graph$alongOutgoingEdges,
					visitNode,
					seeds,
					{ctor: '[]'},
					graph)));
	});
var _elm_community$graph$Graph$dfsTree = F2(
	function (seed, graph) {
		var _p46 = A2(
			_elm_community$graph$Graph$dfsForest,
			{
				ctor: '::',
				_0: seed,
				_1: {ctor: '[]'}
			},
			graph);
		if (_p46.ctor === '[]') {
			return _elm_community$graph$Graph_Tree$empty;
		} else {
			if (_p46._1.ctor === '[]') {
				return _p46._0;
			} else {
				return _elm_lang$core$Native_Utils.crashCase(
					'Graph',
					{
						start: {line: 1020, column: 5},
						end: {line: 1028, column: 126}
					},
					_p46)('dfsTree: There can\'t be more than one DFS tree. This invariant is violated, please report this bug.');
			}
		}
	});
var _elm_community$graph$Graph$guidedBfs = F5(
	function (selectNeighbors, visitNode, seeds, acc, graph) {
		var enqueueMany = F4(
			function (distance, parentPath, nodeIds, queue) {
				return A3(
					_elm_lang$core$List$foldl,
					_avh4$elm_fifo$Fifo$insert,
					queue,
					A2(
						_elm_lang$core$List$map,
						function (id) {
							return {ctor: '_Tuple3', _0: id, _1: parentPath, _2: distance};
						},
						nodeIds));
			});
		var go = F3(
			function (seeds, acc, graph) {
				go:
				while (true) {
					var _p48 = _avh4$elm_fifo$Fifo$remove(seeds);
					if (_p48._0.ctor === 'Nothing') {
						return {ctor: '_Tuple2', _0: acc, _1: graph};
					} else {
						var _p53 = _p48._1;
						var _p52 = _p48._0._0._0;
						var _p51 = _p48._0._0._2;
						var _p49 = A2(_elm_community$graph$Graph$get, _p52, graph);
						if (_p49.ctor === 'Nothing') {
							var _v26 = _p53,
								_v27 = acc,
								_v28 = graph;
							seeds = _v26;
							acc = _v27;
							graph = _v28;
							continue go;
						} else {
							var _p50 = _p49._0;
							var path = {ctor: '::', _0: _p50, _1: _p48._0._0._1};
							var accAfterVisit = A3(visitNode, path, _p51, acc);
							var seeds2 = A4(
								enqueueMany,
								_p51 + 1,
								path,
								selectNeighbors(_p50),
								_p53);
							var _v29 = seeds2,
								_v30 = accAfterVisit,
								_v31 = A2(_elm_community$graph$Graph$remove, _p52, graph);
							seeds = _v29;
							acc = _v30;
							graph = _v31;
							continue go;
						}
					}
				}
			});
		return A3(
			go,
			A4(
				enqueueMany,
				0,
				{ctor: '[]'},
				seeds,
				_avh4$elm_fifo$Fifo$empty),
			acc,
			graph);
	});
var _elm_community$graph$Graph$bfs = F3(
	function (visitNode, acc, graph) {
		bfs:
		while (true) {
			var _p54 = _elm_community$graph$Graph$nodeIdRange(graph);
			if (_p54.ctor === 'Nothing') {
				return acc;
			} else {
				var _p55 = A5(
					_elm_community$graph$Graph$guidedBfs,
					_elm_community$graph$Graph$alongOutgoingEdges,
					visitNode,
					{
						ctor: '::',
						_0: _p54._0._0,
						_1: {ctor: '[]'}
					},
					acc,
					graph);
				var finalAcc = _p55._0;
				var restgraph1 = _p55._1;
				var _v33 = visitNode,
					_v34 = finalAcc,
					_v35 = restgraph1;
				visitNode = _v33;
				acc = _v34;
				graph = _v35;
				continue bfs;
			}
		}
	});
var _elm_community$graph$Graph$heightLevels = function (_p56) {
	var _p57 = _p56;
	var _p70 = _p57._0;
	var subtract = F2(
		function (a, b) {
			return b - a;
		});
	var decrementAndNoteSources = F3(
		function (id, _p59, _p58) {
			var _p60 = _p58;
			var _p64 = _p60._0;
			var indegreesDec = A3(
				_elm_community$intdict$IntDict$update,
				id,
				_elm_lang$core$Maybe$map(
					subtract(1)),
				_p60._1);
			var _p61 = A2(_elm_community$intdict$IntDict$get, id, indegreesDec);
			if ((_p61.ctor === 'Just') && (_p61._0 === 0)) {
				var _p62 = A2(_elm_community$graph$Graph$get, id, _p70);
				if (_p62.ctor === 'Just') {
					return {
						ctor: '_Tuple2',
						_0: {ctor: '::', _0: _p62._0, _1: _p64},
						_1: indegreesDec
					};
				} else {
					return _elm_lang$core$Native_Utils.crashCase(
						'Graph',
						{
							start: {line: 1220, column: 21},
							end: {line: 1225, column: 157}
						},
						_p62)('Graph.heightLevels: Could not get a node of a graph which should be there by invariants. Please file a bug report!');
				}
			} else {
				return {ctor: '_Tuple2', _0: _p64, _1: indegreesDec};
			}
		});
	var decrementIndegrees = F3(
		function (source, nextLevel, indegrees) {
			return A3(
				_elm_community$intdict$IntDict$foldl,
				decrementAndNoteSources,
				{ctor: '_Tuple2', _0: nextLevel, _1: indegrees},
				source.outgoing);
		});
	var go = F4(
		function (currentLevel, nextLevel, indegrees, graph) {
			var _p65 = {ctor: '_Tuple2', _0: currentLevel, _1: nextLevel};
			if (_p65._0.ctor === '[]') {
				if (_p65._1.ctor === '[]') {
					return {
						ctor: '::',
						_0: {ctor: '[]'},
						_1: {ctor: '[]'}
					};
				} else {
					return {
						ctor: '::',
						_0: {ctor: '[]'},
						_1: A4(
							go,
							nextLevel,
							{ctor: '[]'},
							indegrees,
							graph)
					};
				}
			} else {
				var _p69 = _p65._0._0;
				var _p66 = A3(decrementIndegrees, _p69, nextLevel, indegrees);
				var nextLevel1 = _p66._0;
				var indegrees1 = _p66._1;
				var _p67 = A4(
					go,
					_p65._0._1,
					nextLevel1,
					indegrees1,
					A2(_elm_community$graph$Graph$remove, _p69.node.id, graph));
				if (_p67.ctor === '[]') {
					return _elm_lang$core$Native_Utils.crashCase(
						'Graph',
						{
							start: {line: 1246, column: 21},
							end: {line: 1251, column: 56}
						},
						_p67)('Graph.heightLevels: Reached a branch which is impossible by invariants. Please file a bug report!');
				} else {
					return {
						ctor: '::',
						_0: {ctor: '::', _0: _p69, _1: _p67._0},
						_1: _p67._1
					};
				}
			}
		});
	var countIndegrees = A2(
		_elm_community$graph$Graph$fold,
		function (ctx) {
			return A2(
				_elm_community$intdict$IntDict$insert,
				ctx.node.id,
				_elm_community$intdict$IntDict$size(ctx.incoming));
		},
		_elm_community$intdict$IntDict$empty);
	var isSource = function (ctx) {
		return _elm_community$intdict$IntDict$isEmpty(ctx.incoming);
	};
	var sources = A3(
		_elm_community$graph$Graph$fold,
		F2(
			function (ctx, acc) {
				return isSource(ctx) ? {ctor: '::', _0: ctx, _1: acc} : acc;
			}),
		{ctor: '[]'},
		_p70);
	return A4(
		go,
		sources,
		{ctor: '[]'},
		countIndegrees(_p70),
		_p70);
};
var _elm_community$graph$Graph$AcyclicGraph = F2(
	function (a, b) {
		return {ctor: 'AcyclicGraph', _0: a, _1: b};
	});
var _elm_community$graph$Graph$checkForBackEdges = F2(
	function (ordering, graph) {
		var success = function (_p71) {
			return A2(_elm_community$graph$Graph$AcyclicGraph, graph, ordering);
		};
		var check = F2(
			function (id, _p72) {
				var _p73 = _p72;
				var error = 'Graph.checkForBackEdges: `ordering` didn\'t contain `id`';
				var ctx = A3(_elm_community$graph$Graph$unsafeGet, error, id, graph);
				var backSetWithId = A3(
					_elm_community$intdict$IntDict$insert,
					id,
					{ctor: '_Tuple0'},
					_p73._0);
				var backEdges = A2(_elm_community$intdict$IntDict$intersect, ctx.outgoing, backSetWithId);
				var _p74 = _elm_community$intdict$IntDict$findMin(backEdges);
				if (_p74.ctor === 'Nothing') {
					return _elm_lang$core$Result$Ok(
						{
							ctor: '_Tuple2',
							_0: backSetWithId,
							_1: {ctor: '_Tuple0'}
						});
				} else {
					return _elm_lang$core$Result$Err(
						A3(_elm_community$graph$Graph$Edge, id, _p74._0._0, _p74._0._1));
				}
			});
		return A2(
			_elm_lang$core$Result$map,
			success,
			A3(
				_elm_lang$core$List$foldl,
				F2(
					function (id, res) {
						return A2(
							_elm_lang$core$Result$andThen,
							check(id),
							res);
					}),
				_elm_lang$core$Result$Ok(
					{
						ctor: '_Tuple2',
						_0: _elm_community$intdict$IntDict$empty,
						_1: {ctor: '_Tuple0'}
					}),
				ordering));
	});
var _elm_community$graph$Graph$checkAcyclic = function (graph) {
	var reversePostOrder = A3(
		_elm_community$graph$Graph$dfs,
		_elm_community$graph$Graph$onFinish(
			function (_p75) {
				return F2(
					function (x, y) {
						return {ctor: '::', _0: x, _1: y};
					})(
					function (_) {
						return _.id;
					}(
						function (_) {
							return _.node;
						}(_p75)));
			}),
		{ctor: '[]'},
		graph);
	return A2(_elm_community$graph$Graph$checkForBackEdges, reversePostOrder, graph);
};
var _elm_community$graph$Graph$stronglyConnectedComponents = function (graph) {
	var reversePostOrder = A3(
		_elm_community$graph$Graph$dfs,
		_elm_community$graph$Graph$onFinish(
			function (_p76) {
				return F2(
					function (x, y) {
						return {ctor: '::', _0: x, _1: y};
					})(
					function (_) {
						return _.id;
					}(
						function (_) {
							return _.node;
						}(_p76)));
			}),
		{ctor: '[]'},
		graph);
	return A2(
		_elm_lang$core$Result$mapError,
		function (_p77) {
			var forest = A2(
				_elm_community$graph$Graph$dfsForest,
				reversePostOrder,
				_elm_community$graph$Graph$reverseEdges(graph));
			return A2(
				_elm_lang$core$List$map,
				function (_p78) {
					return _elm_community$graph$Graph$reverseEdges(
						A3(
							_elm_lang$core$List$foldr,
							_elm_community$graph$Graph$insert,
							_elm_community$graph$Graph$empty,
							_elm_community$graph$Graph_Tree$preOrderList(_p78)));
				},
				forest);
		},
		A2(_elm_community$graph$Graph$checkForBackEdges, reversePostOrder, graph));
};

//import Result //

var _elm_lang$core$Native_Date = function() {

function fromString(str)
{
	var date = new Date(str);
	return isNaN(date.getTime())
		? _elm_lang$core$Result$Err('Unable to parse \'' + str + '\' as a date. Dates must be in the ISO 8601 format.')
		: _elm_lang$core$Result$Ok(date);
}

var dayTable = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
var monthTable =
	['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
	 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];


return {
	fromString: fromString,
	year: function(d) { return d.getFullYear(); },
	month: function(d) { return { ctor: monthTable[d.getMonth()] }; },
	day: function(d) { return d.getDate(); },
	hour: function(d) { return d.getHours(); },
	minute: function(d) { return d.getMinutes(); },
	second: function(d) { return d.getSeconds(); },
	millisecond: function(d) { return d.getMilliseconds(); },
	toTime: function(d) { return d.getTime(); },
	fromTime: function(t) { return new Date(t); },
	dayOfWeek: function(d) { return { ctor: dayTable[d.getDay()] }; }
};

}();
var _elm_lang$core$Task$onError = _elm_lang$core$Native_Scheduler.onError;
var _elm_lang$core$Task$andThen = _elm_lang$core$Native_Scheduler.andThen;
var _elm_lang$core$Task$spawnCmd = F2(
	function (router, _p0) {
		var _p1 = _p0;
		return _elm_lang$core$Native_Scheduler.spawn(
			A2(
				_elm_lang$core$Task$andThen,
				_elm_lang$core$Platform$sendToApp(router),
				_p1._0));
	});
var _elm_lang$core$Task$fail = _elm_lang$core$Native_Scheduler.fail;
var _elm_lang$core$Task$mapError = F2(
	function (convert, task) {
		return A2(
			_elm_lang$core$Task$onError,
			function (_p2) {
				return _elm_lang$core$Task$fail(
					convert(_p2));
			},
			task);
	});
var _elm_lang$core$Task$succeed = _elm_lang$core$Native_Scheduler.succeed;
var _elm_lang$core$Task$map = F2(
	function (func, taskA) {
		return A2(
			_elm_lang$core$Task$andThen,
			function (a) {
				return _elm_lang$core$Task$succeed(
					func(a));
			},
			taskA);
	});
var _elm_lang$core$Task$map2 = F3(
	function (func, taskA, taskB) {
		return A2(
			_elm_lang$core$Task$andThen,
			function (a) {
				return A2(
					_elm_lang$core$Task$andThen,
					function (b) {
						return _elm_lang$core$Task$succeed(
							A2(func, a, b));
					},
					taskB);
			},
			taskA);
	});
var _elm_lang$core$Task$map3 = F4(
	function (func, taskA, taskB, taskC) {
		return A2(
			_elm_lang$core$Task$andThen,
			function (a) {
				return A2(
					_elm_lang$core$Task$andThen,
					function (b) {
						return A2(
							_elm_lang$core$Task$andThen,
							function (c) {
								return _elm_lang$core$Task$succeed(
									A3(func, a, b, c));
							},
							taskC);
					},
					taskB);
			},
			taskA);
	});
var _elm_lang$core$Task$map4 = F5(
	function (func, taskA, taskB, taskC, taskD) {
		return A2(
			_elm_lang$core$Task$andThen,
			function (a) {
				return A2(
					_elm_lang$core$Task$andThen,
					function (b) {
						return A2(
							_elm_lang$core$Task$andThen,
							function (c) {
								return A2(
									_elm_lang$core$Task$andThen,
									function (d) {
										return _elm_lang$core$Task$succeed(
											A4(func, a, b, c, d));
									},
									taskD);
							},
							taskC);
					},
					taskB);
			},
			taskA);
	});
var _elm_lang$core$Task$map5 = F6(
	function (func, taskA, taskB, taskC, taskD, taskE) {
		return A2(
			_elm_lang$core$Task$andThen,
			function (a) {
				return A2(
					_elm_lang$core$Task$andThen,
					function (b) {
						return A2(
							_elm_lang$core$Task$andThen,
							function (c) {
								return A2(
									_elm_lang$core$Task$andThen,
									function (d) {
										return A2(
											_elm_lang$core$Task$andThen,
											function (e) {
												return _elm_lang$core$Task$succeed(
													A5(func, a, b, c, d, e));
											},
											taskE);
									},
									taskD);
							},
							taskC);
					},
					taskB);
			},
			taskA);
	});
var _elm_lang$core$Task$sequence = function (tasks) {
	var _p3 = tasks;
	if (_p3.ctor === '[]') {
		return _elm_lang$core$Task$succeed(
			{ctor: '[]'});
	} else {
		return A3(
			_elm_lang$core$Task$map2,
			F2(
				function (x, y) {
					return {ctor: '::', _0: x, _1: y};
				}),
			_p3._0,
			_elm_lang$core$Task$sequence(_p3._1));
	}
};
var _elm_lang$core$Task$onEffects = F3(
	function (router, commands, state) {
		return A2(
			_elm_lang$core$Task$map,
			function (_p4) {
				return {ctor: '_Tuple0'};
			},
			_elm_lang$core$Task$sequence(
				A2(
					_elm_lang$core$List$map,
					_elm_lang$core$Task$spawnCmd(router),
					commands)));
	});
var _elm_lang$core$Task$init = _elm_lang$core$Task$succeed(
	{ctor: '_Tuple0'});
var _elm_lang$core$Task$onSelfMsg = F3(
	function (_p7, _p6, _p5) {
		return _elm_lang$core$Task$succeed(
			{ctor: '_Tuple0'});
	});
var _elm_lang$core$Task$command = _elm_lang$core$Native_Platform.leaf('Task');
var _elm_lang$core$Task$Perform = function (a) {
	return {ctor: 'Perform', _0: a};
};
var _elm_lang$core$Task$perform = F2(
	function (toMessage, task) {
		return _elm_lang$core$Task$command(
			_elm_lang$core$Task$Perform(
				A2(_elm_lang$core$Task$map, toMessage, task)));
	});
var _elm_lang$core$Task$attempt = F2(
	function (resultToMessage, task) {
		return _elm_lang$core$Task$command(
			_elm_lang$core$Task$Perform(
				A2(
					_elm_lang$core$Task$onError,
					function (_p8) {
						return _elm_lang$core$Task$succeed(
							resultToMessage(
								_elm_lang$core$Result$Err(_p8)));
					},
					A2(
						_elm_lang$core$Task$andThen,
						function (_p9) {
							return _elm_lang$core$Task$succeed(
								resultToMessage(
									_elm_lang$core$Result$Ok(_p9)));
						},
						task))));
	});
var _elm_lang$core$Task$cmdMap = F2(
	function (tagger, _p10) {
		var _p11 = _p10;
		return _elm_lang$core$Task$Perform(
			A2(_elm_lang$core$Task$map, tagger, _p11._0));
	});
_elm_lang$core$Native_Platform.effectManagers['Task'] = {pkg: 'elm-lang/core', init: _elm_lang$core$Task$init, onEffects: _elm_lang$core$Task$onEffects, onSelfMsg: _elm_lang$core$Task$onSelfMsg, tag: 'cmd', cmdMap: _elm_lang$core$Task$cmdMap};

var _elm_lang$core$Dict$foldr = F3(
	function (f, acc, t) {
		foldr:
		while (true) {
			var _p0 = t;
			if (_p0.ctor === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var _v1 = f,
					_v2 = A3(
					f,
					_p0._1,
					_p0._2,
					A3(_elm_lang$core$Dict$foldr, f, acc, _p0._4)),
					_v3 = _p0._3;
				f = _v1;
				acc = _v2;
				t = _v3;
				continue foldr;
			}
		}
	});
var _elm_lang$core$Dict$keys = function (dict) {
	return A3(
		_elm_lang$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return {ctor: '::', _0: key, _1: keyList};
			}),
		{ctor: '[]'},
		dict);
};
var _elm_lang$core$Dict$values = function (dict) {
	return A3(
		_elm_lang$core$Dict$foldr,
		F3(
			function (key, value, valueList) {
				return {ctor: '::', _0: value, _1: valueList};
			}),
		{ctor: '[]'},
		dict);
};
var _elm_lang$core$Dict$toList = function (dict) {
	return A3(
		_elm_lang$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return {
					ctor: '::',
					_0: {ctor: '_Tuple2', _0: key, _1: value},
					_1: list
				};
			}),
		{ctor: '[]'},
		dict);
};
var _elm_lang$core$Dict$foldl = F3(
	function (f, acc, dict) {
		foldl:
		while (true) {
			var _p1 = dict;
			if (_p1.ctor === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var _v5 = f,
					_v6 = A3(
					f,
					_p1._1,
					_p1._2,
					A3(_elm_lang$core$Dict$foldl, f, acc, _p1._3)),
					_v7 = _p1._4;
				f = _v5;
				acc = _v6;
				dict = _v7;
				continue foldl;
			}
		}
	});
var _elm_lang$core$Dict$merge = F6(
	function (leftStep, bothStep, rightStep, leftDict, rightDict, initialResult) {
		var stepState = F3(
			function (rKey, rValue, _p2) {
				stepState:
				while (true) {
					var _p3 = _p2;
					var _p9 = _p3._1;
					var _p8 = _p3._0;
					var _p4 = _p8;
					if (_p4.ctor === '[]') {
						return {
							ctor: '_Tuple2',
							_0: _p8,
							_1: A3(rightStep, rKey, rValue, _p9)
						};
					} else {
						var _p7 = _p4._1;
						var _p6 = _p4._0._1;
						var _p5 = _p4._0._0;
						if (_elm_lang$core$Native_Utils.cmp(_p5, rKey) < 0) {
							var _v10 = rKey,
								_v11 = rValue,
								_v12 = {
								ctor: '_Tuple2',
								_0: _p7,
								_1: A3(leftStep, _p5, _p6, _p9)
							};
							rKey = _v10;
							rValue = _v11;
							_p2 = _v12;
							continue stepState;
						} else {
							if (_elm_lang$core$Native_Utils.cmp(_p5, rKey) > 0) {
								return {
									ctor: '_Tuple2',
									_0: _p8,
									_1: A3(rightStep, rKey, rValue, _p9)
								};
							} else {
								return {
									ctor: '_Tuple2',
									_0: _p7,
									_1: A4(bothStep, _p5, _p6, rValue, _p9)
								};
							}
						}
					}
				}
			});
		var _p10 = A3(
			_elm_lang$core$Dict$foldl,
			stepState,
			{
				ctor: '_Tuple2',
				_0: _elm_lang$core$Dict$toList(leftDict),
				_1: initialResult
			},
			rightDict);
		var leftovers = _p10._0;
		var intermediateResult = _p10._1;
		return A3(
			_elm_lang$core$List$foldl,
			F2(
				function (_p11, result) {
					var _p12 = _p11;
					return A3(leftStep, _p12._0, _p12._1, result);
				}),
			intermediateResult,
			leftovers);
	});
var _elm_lang$core$Dict$reportRemBug = F4(
	function (msg, c, lgot, rgot) {
		return _elm_lang$core$Native_Debug.crash(
			_elm_lang$core$String$concat(
				{
					ctor: '::',
					_0: 'Internal red-black tree invariant violated, expected ',
					_1: {
						ctor: '::',
						_0: msg,
						_1: {
							ctor: '::',
							_0: ' and got ',
							_1: {
								ctor: '::',
								_0: _elm_lang$core$Basics$toString(c),
								_1: {
									ctor: '::',
									_0: '/',
									_1: {
										ctor: '::',
										_0: lgot,
										_1: {
											ctor: '::',
											_0: '/',
											_1: {
												ctor: '::',
												_0: rgot,
												_1: {
													ctor: '::',
													_0: '\nPlease report this bug to <https://github.com/elm-lang/core/issues>',
													_1: {ctor: '[]'}
												}
											}
										}
									}
								}
							}
						}
					}
				}));
	});
var _elm_lang$core$Dict$isBBlack = function (dict) {
	var _p13 = dict;
	_v14_2:
	do {
		if (_p13.ctor === 'RBNode_elm_builtin') {
			if (_p13._0.ctor === 'BBlack') {
				return true;
			} else {
				break _v14_2;
			}
		} else {
			if (_p13._0.ctor === 'LBBlack') {
				return true;
			} else {
				break _v14_2;
			}
		}
	} while(false);
	return false;
};
var _elm_lang$core$Dict$sizeHelp = F2(
	function (n, dict) {
		sizeHelp:
		while (true) {
			var _p14 = dict;
			if (_p14.ctor === 'RBEmpty_elm_builtin') {
				return n;
			} else {
				var _v16 = A2(_elm_lang$core$Dict$sizeHelp, n + 1, _p14._4),
					_v17 = _p14._3;
				n = _v16;
				dict = _v17;
				continue sizeHelp;
			}
		}
	});
var _elm_lang$core$Dict$size = function (dict) {
	return A2(_elm_lang$core$Dict$sizeHelp, 0, dict);
};
var _elm_lang$core$Dict$get = F2(
	function (targetKey, dict) {
		get:
		while (true) {
			var _p15 = dict;
			if (_p15.ctor === 'RBEmpty_elm_builtin') {
				return _elm_lang$core$Maybe$Nothing;
			} else {
				var _p16 = A2(_elm_lang$core$Basics$compare, targetKey, _p15._1);
				switch (_p16.ctor) {
					case 'LT':
						var _v20 = targetKey,
							_v21 = _p15._3;
						targetKey = _v20;
						dict = _v21;
						continue get;
					case 'EQ':
						return _elm_lang$core$Maybe$Just(_p15._2);
					default:
						var _v22 = targetKey,
							_v23 = _p15._4;
						targetKey = _v22;
						dict = _v23;
						continue get;
				}
			}
		}
	});
var _elm_lang$core$Dict$member = F2(
	function (key, dict) {
		var _p17 = A2(_elm_lang$core$Dict$get, key, dict);
		if (_p17.ctor === 'Just') {
			return true;
		} else {
			return false;
		}
	});
var _elm_lang$core$Dict$maxWithDefault = F3(
	function (k, v, r) {
		maxWithDefault:
		while (true) {
			var _p18 = r;
			if (_p18.ctor === 'RBEmpty_elm_builtin') {
				return {ctor: '_Tuple2', _0: k, _1: v};
			} else {
				var _v26 = _p18._1,
					_v27 = _p18._2,
					_v28 = _p18._4;
				k = _v26;
				v = _v27;
				r = _v28;
				continue maxWithDefault;
			}
		}
	});
var _elm_lang$core$Dict$NBlack = {ctor: 'NBlack'};
var _elm_lang$core$Dict$BBlack = {ctor: 'BBlack'};
var _elm_lang$core$Dict$Black = {ctor: 'Black'};
var _elm_lang$core$Dict$blackish = function (t) {
	var _p19 = t;
	if (_p19.ctor === 'RBNode_elm_builtin') {
		var _p20 = _p19._0;
		return _elm_lang$core$Native_Utils.eq(_p20, _elm_lang$core$Dict$Black) || _elm_lang$core$Native_Utils.eq(_p20, _elm_lang$core$Dict$BBlack);
	} else {
		return true;
	}
};
var _elm_lang$core$Dict$Red = {ctor: 'Red'};
var _elm_lang$core$Dict$moreBlack = function (color) {
	var _p21 = color;
	switch (_p21.ctor) {
		case 'Black':
			return _elm_lang$core$Dict$BBlack;
		case 'Red':
			return _elm_lang$core$Dict$Black;
		case 'NBlack':
			return _elm_lang$core$Dict$Red;
		default:
			return _elm_lang$core$Native_Debug.crash('Can\'t make a double black node more black!');
	}
};
var _elm_lang$core$Dict$lessBlack = function (color) {
	var _p22 = color;
	switch (_p22.ctor) {
		case 'BBlack':
			return _elm_lang$core$Dict$Black;
		case 'Black':
			return _elm_lang$core$Dict$Red;
		case 'Red':
			return _elm_lang$core$Dict$NBlack;
		default:
			return _elm_lang$core$Native_Debug.crash('Can\'t make a negative black node less black!');
	}
};
var _elm_lang$core$Dict$LBBlack = {ctor: 'LBBlack'};
var _elm_lang$core$Dict$LBlack = {ctor: 'LBlack'};
var _elm_lang$core$Dict$RBEmpty_elm_builtin = function (a) {
	return {ctor: 'RBEmpty_elm_builtin', _0: a};
};
var _elm_lang$core$Dict$empty = _elm_lang$core$Dict$RBEmpty_elm_builtin(_elm_lang$core$Dict$LBlack);
var _elm_lang$core$Dict$isEmpty = function (dict) {
	return _elm_lang$core$Native_Utils.eq(dict, _elm_lang$core$Dict$empty);
};
var _elm_lang$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {ctor: 'RBNode_elm_builtin', _0: a, _1: b, _2: c, _3: d, _4: e};
	});
var _elm_lang$core$Dict$ensureBlackRoot = function (dict) {
	var _p23 = dict;
	if ((_p23.ctor === 'RBNode_elm_builtin') && (_p23._0.ctor === 'Red')) {
		return A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, _p23._1, _p23._2, _p23._3, _p23._4);
	} else {
		return dict;
	}
};
var _elm_lang$core$Dict$lessBlackTree = function (dict) {
	var _p24 = dict;
	if (_p24.ctor === 'RBNode_elm_builtin') {
		return A5(
			_elm_lang$core$Dict$RBNode_elm_builtin,
			_elm_lang$core$Dict$lessBlack(_p24._0),
			_p24._1,
			_p24._2,
			_p24._3,
			_p24._4);
	} else {
		return _elm_lang$core$Dict$RBEmpty_elm_builtin(_elm_lang$core$Dict$LBlack);
	}
};
var _elm_lang$core$Dict$balancedTree = function (col) {
	return function (xk) {
		return function (xv) {
			return function (yk) {
				return function (yv) {
					return function (zk) {
						return function (zv) {
							return function (a) {
								return function (b) {
									return function (c) {
										return function (d) {
											return A5(
												_elm_lang$core$Dict$RBNode_elm_builtin,
												_elm_lang$core$Dict$lessBlack(col),
												yk,
												yv,
												A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, xk, xv, a, b),
												A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, zk, zv, c, d));
										};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var _elm_lang$core$Dict$blacken = function (t) {
	var _p25 = t;
	if (_p25.ctor === 'RBEmpty_elm_builtin') {
		return _elm_lang$core$Dict$RBEmpty_elm_builtin(_elm_lang$core$Dict$LBlack);
	} else {
		return A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, _p25._1, _p25._2, _p25._3, _p25._4);
	}
};
var _elm_lang$core$Dict$redden = function (t) {
	var _p26 = t;
	if (_p26.ctor === 'RBEmpty_elm_builtin') {
		return _elm_lang$core$Native_Debug.crash('can\'t make a Leaf red');
	} else {
		return A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Red, _p26._1, _p26._2, _p26._3, _p26._4);
	}
};
var _elm_lang$core$Dict$balanceHelp = function (tree) {
	var _p27 = tree;
	_v36_6:
	do {
		_v36_5:
		do {
			_v36_4:
			do {
				_v36_3:
				do {
					_v36_2:
					do {
						_v36_1:
						do {
							_v36_0:
							do {
								if (_p27.ctor === 'RBNode_elm_builtin') {
									if (_p27._3.ctor === 'RBNode_elm_builtin') {
										if (_p27._4.ctor === 'RBNode_elm_builtin') {
											switch (_p27._3._0.ctor) {
												case 'Red':
													switch (_p27._4._0.ctor) {
														case 'Red':
															if ((_p27._3._3.ctor === 'RBNode_elm_builtin') && (_p27._3._3._0.ctor === 'Red')) {
																break _v36_0;
															} else {
																if ((_p27._3._4.ctor === 'RBNode_elm_builtin') && (_p27._3._4._0.ctor === 'Red')) {
																	break _v36_1;
																} else {
																	if ((_p27._4._3.ctor === 'RBNode_elm_builtin') && (_p27._4._3._0.ctor === 'Red')) {
																		break _v36_2;
																	} else {
																		if ((_p27._4._4.ctor === 'RBNode_elm_builtin') && (_p27._4._4._0.ctor === 'Red')) {
																			break _v36_3;
																		} else {
																			break _v36_6;
																		}
																	}
																}
															}
														case 'NBlack':
															if ((_p27._3._3.ctor === 'RBNode_elm_builtin') && (_p27._3._3._0.ctor === 'Red')) {
																break _v36_0;
															} else {
																if ((_p27._3._4.ctor === 'RBNode_elm_builtin') && (_p27._3._4._0.ctor === 'Red')) {
																	break _v36_1;
																} else {
																	if (((((_p27._0.ctor === 'BBlack') && (_p27._4._3.ctor === 'RBNode_elm_builtin')) && (_p27._4._3._0.ctor === 'Black')) && (_p27._4._4.ctor === 'RBNode_elm_builtin')) && (_p27._4._4._0.ctor === 'Black')) {
																		break _v36_4;
																	} else {
																		break _v36_6;
																	}
																}
															}
														default:
															if ((_p27._3._3.ctor === 'RBNode_elm_builtin') && (_p27._3._3._0.ctor === 'Red')) {
																break _v36_0;
															} else {
																if ((_p27._3._4.ctor === 'RBNode_elm_builtin') && (_p27._3._4._0.ctor === 'Red')) {
																	break _v36_1;
																} else {
																	break _v36_6;
																}
															}
													}
												case 'NBlack':
													switch (_p27._4._0.ctor) {
														case 'Red':
															if ((_p27._4._3.ctor === 'RBNode_elm_builtin') && (_p27._4._3._0.ctor === 'Red')) {
																break _v36_2;
															} else {
																if ((_p27._4._4.ctor === 'RBNode_elm_builtin') && (_p27._4._4._0.ctor === 'Red')) {
																	break _v36_3;
																} else {
																	if (((((_p27._0.ctor === 'BBlack') && (_p27._3._3.ctor === 'RBNode_elm_builtin')) && (_p27._3._3._0.ctor === 'Black')) && (_p27._3._4.ctor === 'RBNode_elm_builtin')) && (_p27._3._4._0.ctor === 'Black')) {
																		break _v36_5;
																	} else {
																		break _v36_6;
																	}
																}
															}
														case 'NBlack':
															if (_p27._0.ctor === 'BBlack') {
																if ((((_p27._4._3.ctor === 'RBNode_elm_builtin') && (_p27._4._3._0.ctor === 'Black')) && (_p27._4._4.ctor === 'RBNode_elm_builtin')) && (_p27._4._4._0.ctor === 'Black')) {
																	break _v36_4;
																} else {
																	if ((((_p27._3._3.ctor === 'RBNode_elm_builtin') && (_p27._3._3._0.ctor === 'Black')) && (_p27._3._4.ctor === 'RBNode_elm_builtin')) && (_p27._3._4._0.ctor === 'Black')) {
																		break _v36_5;
																	} else {
																		break _v36_6;
																	}
																}
															} else {
																break _v36_6;
															}
														default:
															if (((((_p27._0.ctor === 'BBlack') && (_p27._3._3.ctor === 'RBNode_elm_builtin')) && (_p27._3._3._0.ctor === 'Black')) && (_p27._3._4.ctor === 'RBNode_elm_builtin')) && (_p27._3._4._0.ctor === 'Black')) {
																break _v36_5;
															} else {
																break _v36_6;
															}
													}
												default:
													switch (_p27._4._0.ctor) {
														case 'Red':
															if ((_p27._4._3.ctor === 'RBNode_elm_builtin') && (_p27._4._3._0.ctor === 'Red')) {
																break _v36_2;
															} else {
																if ((_p27._4._4.ctor === 'RBNode_elm_builtin') && (_p27._4._4._0.ctor === 'Red')) {
																	break _v36_3;
																} else {
																	break _v36_6;
																}
															}
														case 'NBlack':
															if (((((_p27._0.ctor === 'BBlack') && (_p27._4._3.ctor === 'RBNode_elm_builtin')) && (_p27._4._3._0.ctor === 'Black')) && (_p27._4._4.ctor === 'RBNode_elm_builtin')) && (_p27._4._4._0.ctor === 'Black')) {
																break _v36_4;
															} else {
																break _v36_6;
															}
														default:
															break _v36_6;
													}
											}
										} else {
											switch (_p27._3._0.ctor) {
												case 'Red':
													if ((_p27._3._3.ctor === 'RBNode_elm_builtin') && (_p27._3._3._0.ctor === 'Red')) {
														break _v36_0;
													} else {
														if ((_p27._3._4.ctor === 'RBNode_elm_builtin') && (_p27._3._4._0.ctor === 'Red')) {
															break _v36_1;
														} else {
															break _v36_6;
														}
													}
												case 'NBlack':
													if (((((_p27._0.ctor === 'BBlack') && (_p27._3._3.ctor === 'RBNode_elm_builtin')) && (_p27._3._3._0.ctor === 'Black')) && (_p27._3._4.ctor === 'RBNode_elm_builtin')) && (_p27._3._4._0.ctor === 'Black')) {
														break _v36_5;
													} else {
														break _v36_6;
													}
												default:
													break _v36_6;
											}
										}
									} else {
										if (_p27._4.ctor === 'RBNode_elm_builtin') {
											switch (_p27._4._0.ctor) {
												case 'Red':
													if ((_p27._4._3.ctor === 'RBNode_elm_builtin') && (_p27._4._3._0.ctor === 'Red')) {
														break _v36_2;
													} else {
														if ((_p27._4._4.ctor === 'RBNode_elm_builtin') && (_p27._4._4._0.ctor === 'Red')) {
															break _v36_3;
														} else {
															break _v36_6;
														}
													}
												case 'NBlack':
													if (((((_p27._0.ctor === 'BBlack') && (_p27._4._3.ctor === 'RBNode_elm_builtin')) && (_p27._4._3._0.ctor === 'Black')) && (_p27._4._4.ctor === 'RBNode_elm_builtin')) && (_p27._4._4._0.ctor === 'Black')) {
														break _v36_4;
													} else {
														break _v36_6;
													}
												default:
													break _v36_6;
											}
										} else {
											break _v36_6;
										}
									}
								} else {
									break _v36_6;
								}
							} while(false);
							return _elm_lang$core$Dict$balancedTree(_p27._0)(_p27._3._3._1)(_p27._3._3._2)(_p27._3._1)(_p27._3._2)(_p27._1)(_p27._2)(_p27._3._3._3)(_p27._3._3._4)(_p27._3._4)(_p27._4);
						} while(false);
						return _elm_lang$core$Dict$balancedTree(_p27._0)(_p27._3._1)(_p27._3._2)(_p27._3._4._1)(_p27._3._4._2)(_p27._1)(_p27._2)(_p27._3._3)(_p27._3._4._3)(_p27._3._4._4)(_p27._4);
					} while(false);
					return _elm_lang$core$Dict$balancedTree(_p27._0)(_p27._1)(_p27._2)(_p27._4._3._1)(_p27._4._3._2)(_p27._4._1)(_p27._4._2)(_p27._3)(_p27._4._3._3)(_p27._4._3._4)(_p27._4._4);
				} while(false);
				return _elm_lang$core$Dict$balancedTree(_p27._0)(_p27._1)(_p27._2)(_p27._4._1)(_p27._4._2)(_p27._4._4._1)(_p27._4._4._2)(_p27._3)(_p27._4._3)(_p27._4._4._3)(_p27._4._4._4);
			} while(false);
			return A5(
				_elm_lang$core$Dict$RBNode_elm_builtin,
				_elm_lang$core$Dict$Black,
				_p27._4._3._1,
				_p27._4._3._2,
				A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, _p27._1, _p27._2, _p27._3, _p27._4._3._3),
				A5(
					_elm_lang$core$Dict$balance,
					_elm_lang$core$Dict$Black,
					_p27._4._1,
					_p27._4._2,
					_p27._4._3._4,
					_elm_lang$core$Dict$redden(_p27._4._4)));
		} while(false);
		return A5(
			_elm_lang$core$Dict$RBNode_elm_builtin,
			_elm_lang$core$Dict$Black,
			_p27._3._4._1,
			_p27._3._4._2,
			A5(
				_elm_lang$core$Dict$balance,
				_elm_lang$core$Dict$Black,
				_p27._3._1,
				_p27._3._2,
				_elm_lang$core$Dict$redden(_p27._3._3),
				_p27._3._4._3),
			A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, _p27._1, _p27._2, _p27._3._4._4, _p27._4));
	} while(false);
	return tree;
};
var _elm_lang$core$Dict$balance = F5(
	function (c, k, v, l, r) {
		var tree = A5(_elm_lang$core$Dict$RBNode_elm_builtin, c, k, v, l, r);
		return _elm_lang$core$Dict$blackish(tree) ? _elm_lang$core$Dict$balanceHelp(tree) : tree;
	});
var _elm_lang$core$Dict$bubble = F5(
	function (c, k, v, l, r) {
		return (_elm_lang$core$Dict$isBBlack(l) || _elm_lang$core$Dict$isBBlack(r)) ? A5(
			_elm_lang$core$Dict$balance,
			_elm_lang$core$Dict$moreBlack(c),
			k,
			v,
			_elm_lang$core$Dict$lessBlackTree(l),
			_elm_lang$core$Dict$lessBlackTree(r)) : A5(_elm_lang$core$Dict$RBNode_elm_builtin, c, k, v, l, r);
	});
var _elm_lang$core$Dict$removeMax = F5(
	function (c, k, v, l, r) {
		var _p28 = r;
		if (_p28.ctor === 'RBEmpty_elm_builtin') {
			return A3(_elm_lang$core$Dict$rem, c, l, r);
		} else {
			return A5(
				_elm_lang$core$Dict$bubble,
				c,
				k,
				v,
				l,
				A5(_elm_lang$core$Dict$removeMax, _p28._0, _p28._1, _p28._2, _p28._3, _p28._4));
		}
	});
var _elm_lang$core$Dict$rem = F3(
	function (color, left, right) {
		var _p29 = {ctor: '_Tuple2', _0: left, _1: right};
		if (_p29._0.ctor === 'RBEmpty_elm_builtin') {
			if (_p29._1.ctor === 'RBEmpty_elm_builtin') {
				var _p30 = color;
				switch (_p30.ctor) {
					case 'Red':
						return _elm_lang$core$Dict$RBEmpty_elm_builtin(_elm_lang$core$Dict$LBlack);
					case 'Black':
						return _elm_lang$core$Dict$RBEmpty_elm_builtin(_elm_lang$core$Dict$LBBlack);
					default:
						return _elm_lang$core$Native_Debug.crash('cannot have bblack or nblack nodes at this point');
				}
			} else {
				var _p33 = _p29._1._0;
				var _p32 = _p29._0._0;
				var _p31 = {ctor: '_Tuple3', _0: color, _1: _p32, _2: _p33};
				if ((((_p31.ctor === '_Tuple3') && (_p31._0.ctor === 'Black')) && (_p31._1.ctor === 'LBlack')) && (_p31._2.ctor === 'Red')) {
					return A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, _p29._1._1, _p29._1._2, _p29._1._3, _p29._1._4);
				} else {
					return A4(
						_elm_lang$core$Dict$reportRemBug,
						'Black/LBlack/Red',
						color,
						_elm_lang$core$Basics$toString(_p32),
						_elm_lang$core$Basics$toString(_p33));
				}
			}
		} else {
			if (_p29._1.ctor === 'RBEmpty_elm_builtin') {
				var _p36 = _p29._1._0;
				var _p35 = _p29._0._0;
				var _p34 = {ctor: '_Tuple3', _0: color, _1: _p35, _2: _p36};
				if ((((_p34.ctor === '_Tuple3') && (_p34._0.ctor === 'Black')) && (_p34._1.ctor === 'Red')) && (_p34._2.ctor === 'LBlack')) {
					return A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, _p29._0._1, _p29._0._2, _p29._0._3, _p29._0._4);
				} else {
					return A4(
						_elm_lang$core$Dict$reportRemBug,
						'Black/Red/LBlack',
						color,
						_elm_lang$core$Basics$toString(_p35),
						_elm_lang$core$Basics$toString(_p36));
				}
			} else {
				var _p40 = _p29._0._2;
				var _p39 = _p29._0._4;
				var _p38 = _p29._0._1;
				var newLeft = A5(_elm_lang$core$Dict$removeMax, _p29._0._0, _p38, _p40, _p29._0._3, _p39);
				var _p37 = A3(_elm_lang$core$Dict$maxWithDefault, _p38, _p40, _p39);
				var k = _p37._0;
				var v = _p37._1;
				return A5(_elm_lang$core$Dict$bubble, color, k, v, newLeft, right);
			}
		}
	});
var _elm_lang$core$Dict$map = F2(
	function (f, dict) {
		var _p41 = dict;
		if (_p41.ctor === 'RBEmpty_elm_builtin') {
			return _elm_lang$core$Dict$RBEmpty_elm_builtin(_elm_lang$core$Dict$LBlack);
		} else {
			var _p42 = _p41._1;
			return A5(
				_elm_lang$core$Dict$RBNode_elm_builtin,
				_p41._0,
				_p42,
				A2(f, _p42, _p41._2),
				A2(_elm_lang$core$Dict$map, f, _p41._3),
				A2(_elm_lang$core$Dict$map, f, _p41._4));
		}
	});
var _elm_lang$core$Dict$Same = {ctor: 'Same'};
var _elm_lang$core$Dict$Remove = {ctor: 'Remove'};
var _elm_lang$core$Dict$Insert = {ctor: 'Insert'};
var _elm_lang$core$Dict$update = F3(
	function (k, alter, dict) {
		var up = function (dict) {
			var _p43 = dict;
			if (_p43.ctor === 'RBEmpty_elm_builtin') {
				var _p44 = alter(_elm_lang$core$Maybe$Nothing);
				if (_p44.ctor === 'Nothing') {
					return {ctor: '_Tuple2', _0: _elm_lang$core$Dict$Same, _1: _elm_lang$core$Dict$empty};
				} else {
					return {
						ctor: '_Tuple2',
						_0: _elm_lang$core$Dict$Insert,
						_1: A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Red, k, _p44._0, _elm_lang$core$Dict$empty, _elm_lang$core$Dict$empty)
					};
				}
			} else {
				var _p55 = _p43._2;
				var _p54 = _p43._4;
				var _p53 = _p43._3;
				var _p52 = _p43._1;
				var _p51 = _p43._0;
				var _p45 = A2(_elm_lang$core$Basics$compare, k, _p52);
				switch (_p45.ctor) {
					case 'EQ':
						var _p46 = alter(
							_elm_lang$core$Maybe$Just(_p55));
						if (_p46.ctor === 'Nothing') {
							return {
								ctor: '_Tuple2',
								_0: _elm_lang$core$Dict$Remove,
								_1: A3(_elm_lang$core$Dict$rem, _p51, _p53, _p54)
							};
						} else {
							return {
								ctor: '_Tuple2',
								_0: _elm_lang$core$Dict$Same,
								_1: A5(_elm_lang$core$Dict$RBNode_elm_builtin, _p51, _p52, _p46._0, _p53, _p54)
							};
						}
					case 'LT':
						var _p47 = up(_p53);
						var flag = _p47._0;
						var newLeft = _p47._1;
						var _p48 = flag;
						switch (_p48.ctor) {
							case 'Same':
								return {
									ctor: '_Tuple2',
									_0: _elm_lang$core$Dict$Same,
									_1: A5(_elm_lang$core$Dict$RBNode_elm_builtin, _p51, _p52, _p55, newLeft, _p54)
								};
							case 'Insert':
								return {
									ctor: '_Tuple2',
									_0: _elm_lang$core$Dict$Insert,
									_1: A5(_elm_lang$core$Dict$balance, _p51, _p52, _p55, newLeft, _p54)
								};
							default:
								return {
									ctor: '_Tuple2',
									_0: _elm_lang$core$Dict$Remove,
									_1: A5(_elm_lang$core$Dict$bubble, _p51, _p52, _p55, newLeft, _p54)
								};
						}
					default:
						var _p49 = up(_p54);
						var flag = _p49._0;
						var newRight = _p49._1;
						var _p50 = flag;
						switch (_p50.ctor) {
							case 'Same':
								return {
									ctor: '_Tuple2',
									_0: _elm_lang$core$Dict$Same,
									_1: A5(_elm_lang$core$Dict$RBNode_elm_builtin, _p51, _p52, _p55, _p53, newRight)
								};
							case 'Insert':
								return {
									ctor: '_Tuple2',
									_0: _elm_lang$core$Dict$Insert,
									_1: A5(_elm_lang$core$Dict$balance, _p51, _p52, _p55, _p53, newRight)
								};
							default:
								return {
									ctor: '_Tuple2',
									_0: _elm_lang$core$Dict$Remove,
									_1: A5(_elm_lang$core$Dict$bubble, _p51, _p52, _p55, _p53, newRight)
								};
						}
				}
			}
		};
		var _p56 = up(dict);
		var flag = _p56._0;
		var updatedDict = _p56._1;
		var _p57 = flag;
		switch (_p57.ctor) {
			case 'Same':
				return updatedDict;
			case 'Insert':
				return _elm_lang$core$Dict$ensureBlackRoot(updatedDict);
			default:
				return _elm_lang$core$Dict$blacken(updatedDict);
		}
	});
var _elm_lang$core$Dict$insert = F3(
	function (key, value, dict) {
		return A3(
			_elm_lang$core$Dict$update,
			key,
			_elm_lang$core$Basics$always(
				_elm_lang$core$Maybe$Just(value)),
			dict);
	});
var _elm_lang$core$Dict$singleton = F2(
	function (key, value) {
		return A3(_elm_lang$core$Dict$insert, key, value, _elm_lang$core$Dict$empty);
	});
var _elm_lang$core$Dict$union = F2(
	function (t1, t2) {
		return A3(_elm_lang$core$Dict$foldl, _elm_lang$core$Dict$insert, t2, t1);
	});
var _elm_lang$core$Dict$filter = F2(
	function (predicate, dictionary) {
		var add = F3(
			function (key, value, dict) {
				return A2(predicate, key, value) ? A3(_elm_lang$core$Dict$insert, key, value, dict) : dict;
			});
		return A3(_elm_lang$core$Dict$foldl, add, _elm_lang$core$Dict$empty, dictionary);
	});
var _elm_lang$core$Dict$intersect = F2(
	function (t1, t2) {
		return A2(
			_elm_lang$core$Dict$filter,
			F2(
				function (k, _p58) {
					return A2(_elm_lang$core$Dict$member, k, t2);
				}),
			t1);
	});
var _elm_lang$core$Dict$partition = F2(
	function (predicate, dict) {
		var add = F3(
			function (key, value, _p59) {
				var _p60 = _p59;
				var _p62 = _p60._1;
				var _p61 = _p60._0;
				return A2(predicate, key, value) ? {
					ctor: '_Tuple2',
					_0: A3(_elm_lang$core$Dict$insert, key, value, _p61),
					_1: _p62
				} : {
					ctor: '_Tuple2',
					_0: _p61,
					_1: A3(_elm_lang$core$Dict$insert, key, value, _p62)
				};
			});
		return A3(
			_elm_lang$core$Dict$foldl,
			add,
			{ctor: '_Tuple2', _0: _elm_lang$core$Dict$empty, _1: _elm_lang$core$Dict$empty},
			dict);
	});
var _elm_lang$core$Dict$fromList = function (assocs) {
	return A3(
		_elm_lang$core$List$foldl,
		F2(
			function (_p63, dict) {
				var _p64 = _p63;
				return A3(_elm_lang$core$Dict$insert, _p64._0, _p64._1, dict);
			}),
		_elm_lang$core$Dict$empty,
		assocs);
};
var _elm_lang$core$Dict$remove = F2(
	function (key, dict) {
		return A3(
			_elm_lang$core$Dict$update,
			key,
			_elm_lang$core$Basics$always(_elm_lang$core$Maybe$Nothing),
			dict);
	});
var _elm_lang$core$Dict$diff = F2(
	function (t1, t2) {
		return A3(
			_elm_lang$core$Dict$foldl,
			F3(
				function (k, v, t) {
					return A2(_elm_lang$core$Dict$remove, k, t);
				}),
			t1,
			t2);
	});

//import Native.Scheduler //

var _elm_lang$core$Native_Time = function() {

var now = _elm_lang$core$Native_Scheduler.nativeBinding(function(callback)
{
	callback(_elm_lang$core$Native_Scheduler.succeed(Date.now()));
});

function setInterval_(interval, task)
{
	return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback)
	{
		var id = setInterval(function() {
			_elm_lang$core$Native_Scheduler.rawSpawn(task);
		}, interval);

		return function() { clearInterval(id); };
	});
}

return {
	now: now,
	setInterval_: F2(setInterval_)
};

}();
var _elm_lang$core$Time$setInterval = _elm_lang$core$Native_Time.setInterval_;
var _elm_lang$core$Time$spawnHelp = F3(
	function (router, intervals, processes) {
		var _p0 = intervals;
		if (_p0.ctor === '[]') {
			return _elm_lang$core$Task$succeed(processes);
		} else {
			var _p1 = _p0._0;
			var spawnRest = function (id) {
				return A3(
					_elm_lang$core$Time$spawnHelp,
					router,
					_p0._1,
					A3(_elm_lang$core$Dict$insert, _p1, id, processes));
			};
			var spawnTimer = _elm_lang$core$Native_Scheduler.spawn(
				A2(
					_elm_lang$core$Time$setInterval,
					_p1,
					A2(_elm_lang$core$Platform$sendToSelf, router, _p1)));
			return A2(_elm_lang$core$Task$andThen, spawnRest, spawnTimer);
		}
	});
var _elm_lang$core$Time$addMySub = F2(
	function (_p2, state) {
		var _p3 = _p2;
		var _p6 = _p3._1;
		var _p5 = _p3._0;
		var _p4 = A2(_elm_lang$core$Dict$get, _p5, state);
		if (_p4.ctor === 'Nothing') {
			return A3(
				_elm_lang$core$Dict$insert,
				_p5,
				{
					ctor: '::',
					_0: _p6,
					_1: {ctor: '[]'}
				},
				state);
		} else {
			return A3(
				_elm_lang$core$Dict$insert,
				_p5,
				{ctor: '::', _0: _p6, _1: _p4._0},
				state);
		}
	});
var _elm_lang$core$Time$inMilliseconds = function (t) {
	return t;
};
var _elm_lang$core$Time$millisecond = 1;
var _elm_lang$core$Time$second = 1000 * _elm_lang$core$Time$millisecond;
var _elm_lang$core$Time$minute = 60 * _elm_lang$core$Time$second;
var _elm_lang$core$Time$hour = 60 * _elm_lang$core$Time$minute;
var _elm_lang$core$Time$inHours = function (t) {
	return t / _elm_lang$core$Time$hour;
};
var _elm_lang$core$Time$inMinutes = function (t) {
	return t / _elm_lang$core$Time$minute;
};
var _elm_lang$core$Time$inSeconds = function (t) {
	return t / _elm_lang$core$Time$second;
};
var _elm_lang$core$Time$now = _elm_lang$core$Native_Time.now;
var _elm_lang$core$Time$onSelfMsg = F3(
	function (router, interval, state) {
		var _p7 = A2(_elm_lang$core$Dict$get, interval, state.taggers);
		if (_p7.ctor === 'Nothing') {
			return _elm_lang$core$Task$succeed(state);
		} else {
			var tellTaggers = function (time) {
				return _elm_lang$core$Task$sequence(
					A2(
						_elm_lang$core$List$map,
						function (tagger) {
							return A2(
								_elm_lang$core$Platform$sendToApp,
								router,
								tagger(time));
						},
						_p7._0));
			};
			return A2(
				_elm_lang$core$Task$andThen,
				function (_p8) {
					return _elm_lang$core$Task$succeed(state);
				},
				A2(_elm_lang$core$Task$andThen, tellTaggers, _elm_lang$core$Time$now));
		}
	});
var _elm_lang$core$Time$subscription = _elm_lang$core$Native_Platform.leaf('Time');
var _elm_lang$core$Time$State = F2(
	function (a, b) {
		return {taggers: a, processes: b};
	});
var _elm_lang$core$Time$init = _elm_lang$core$Task$succeed(
	A2(_elm_lang$core$Time$State, _elm_lang$core$Dict$empty, _elm_lang$core$Dict$empty));
var _elm_lang$core$Time$onEffects = F3(
	function (router, subs, _p9) {
		var _p10 = _p9;
		var rightStep = F3(
			function (_p12, id, _p11) {
				var _p13 = _p11;
				return {
					ctor: '_Tuple3',
					_0: _p13._0,
					_1: _p13._1,
					_2: A2(
						_elm_lang$core$Task$andThen,
						function (_p14) {
							return _p13._2;
						},
						_elm_lang$core$Native_Scheduler.kill(id))
				};
			});
		var bothStep = F4(
			function (interval, taggers, id, _p15) {
				var _p16 = _p15;
				return {
					ctor: '_Tuple3',
					_0: _p16._0,
					_1: A3(_elm_lang$core$Dict$insert, interval, id, _p16._1),
					_2: _p16._2
				};
			});
		var leftStep = F3(
			function (interval, taggers, _p17) {
				var _p18 = _p17;
				return {
					ctor: '_Tuple3',
					_0: {ctor: '::', _0: interval, _1: _p18._0},
					_1: _p18._1,
					_2: _p18._2
				};
			});
		var newTaggers = A3(_elm_lang$core$List$foldl, _elm_lang$core$Time$addMySub, _elm_lang$core$Dict$empty, subs);
		var _p19 = A6(
			_elm_lang$core$Dict$merge,
			leftStep,
			bothStep,
			rightStep,
			newTaggers,
			_p10.processes,
			{
				ctor: '_Tuple3',
				_0: {ctor: '[]'},
				_1: _elm_lang$core$Dict$empty,
				_2: _elm_lang$core$Task$succeed(
					{ctor: '_Tuple0'})
			});
		var spawnList = _p19._0;
		var existingDict = _p19._1;
		var killTask = _p19._2;
		return A2(
			_elm_lang$core$Task$andThen,
			function (newProcesses) {
				return _elm_lang$core$Task$succeed(
					A2(_elm_lang$core$Time$State, newTaggers, newProcesses));
			},
			A2(
				_elm_lang$core$Task$andThen,
				function (_p20) {
					return A3(_elm_lang$core$Time$spawnHelp, router, spawnList, existingDict);
				},
				killTask));
	});
var _elm_lang$core$Time$Every = F2(
	function (a, b) {
		return {ctor: 'Every', _0: a, _1: b};
	});
var _elm_lang$core$Time$every = F2(
	function (interval, tagger) {
		return _elm_lang$core$Time$subscription(
			A2(_elm_lang$core$Time$Every, interval, tagger));
	});
var _elm_lang$core$Time$subMap = F2(
	function (f, _p21) {
		var _p22 = _p21;
		return A2(
			_elm_lang$core$Time$Every,
			_p22._0,
			function (_p23) {
				return f(
					_p22._1(_p23));
			});
	});
_elm_lang$core$Native_Platform.effectManagers['Time'] = {pkg: 'elm-lang/core', init: _elm_lang$core$Time$init, onEffects: _elm_lang$core$Time$onEffects, onSelfMsg: _elm_lang$core$Time$onSelfMsg, tag: 'sub', subMap: _elm_lang$core$Time$subMap};

var _elm_lang$core$Date$millisecond = _elm_lang$core$Native_Date.millisecond;
var _elm_lang$core$Date$second = _elm_lang$core$Native_Date.second;
var _elm_lang$core$Date$minute = _elm_lang$core$Native_Date.minute;
var _elm_lang$core$Date$hour = _elm_lang$core$Native_Date.hour;
var _elm_lang$core$Date$dayOfWeek = _elm_lang$core$Native_Date.dayOfWeek;
var _elm_lang$core$Date$day = _elm_lang$core$Native_Date.day;
var _elm_lang$core$Date$month = _elm_lang$core$Native_Date.month;
var _elm_lang$core$Date$year = _elm_lang$core$Native_Date.year;
var _elm_lang$core$Date$fromTime = _elm_lang$core$Native_Date.fromTime;
var _elm_lang$core$Date$toTime = _elm_lang$core$Native_Date.toTime;
var _elm_lang$core$Date$fromString = _elm_lang$core$Native_Date.fromString;
var _elm_lang$core$Date$now = A2(_elm_lang$core$Task$map, _elm_lang$core$Date$fromTime, _elm_lang$core$Time$now);
var _elm_lang$core$Date$Date = {ctor: 'Date'};
var _elm_lang$core$Date$Sun = {ctor: 'Sun'};
var _elm_lang$core$Date$Sat = {ctor: 'Sat'};
var _elm_lang$core$Date$Fri = {ctor: 'Fri'};
var _elm_lang$core$Date$Thu = {ctor: 'Thu'};
var _elm_lang$core$Date$Wed = {ctor: 'Wed'};
var _elm_lang$core$Date$Tue = {ctor: 'Tue'};
var _elm_lang$core$Date$Mon = {ctor: 'Mon'};
var _elm_lang$core$Date$Dec = {ctor: 'Dec'};
var _elm_lang$core$Date$Nov = {ctor: 'Nov'};
var _elm_lang$core$Date$Oct = {ctor: 'Oct'};
var _elm_lang$core$Date$Sep = {ctor: 'Sep'};
var _elm_lang$core$Date$Aug = {ctor: 'Aug'};
var _elm_lang$core$Date$Jul = {ctor: 'Jul'};
var _elm_lang$core$Date$Jun = {ctor: 'Jun'};
var _elm_lang$core$Date$May = {ctor: 'May'};
var _elm_lang$core$Date$Apr = {ctor: 'Apr'};
var _elm_lang$core$Date$Mar = {ctor: 'Mar'};
var _elm_lang$core$Date$Feb = {ctor: 'Feb'};
var _elm_lang$core$Date$Jan = {ctor: 'Jan'};

//import Native.List //

var _elm_lang$core$Native_Array = function() {

// A RRB-Tree has two distinct data types.
// Leaf -> "height"  is always 0
//         "table"   is an array of elements
// Node -> "height"  is always greater than 0
//         "table"   is an array of child nodes
//         "lengths" is an array of accumulated lengths of the child nodes

// M is the maximal table size. 32 seems fast. E is the allowed increase
// of search steps when concatting to find an index. Lower values will
// decrease balancing, but will increase search steps.
var M = 32;
var E = 2;

// An empty array.
var empty = {
	ctor: '_Array',
	height: 0,
	table: []
};


function get(i, array)
{
	if (i < 0 || i >= length(array))
	{
		throw new Error(
			'Index ' + i + ' is out of range. Check the length of ' +
			'your array first or use getMaybe or getWithDefault.');
	}
	return unsafeGet(i, array);
}


function unsafeGet(i, array)
{
	for (var x = array.height; x > 0; x--)
	{
		var slot = i >> (x * 5);
		while (array.lengths[slot] <= i)
		{
			slot++;
		}
		if (slot > 0)
		{
			i -= array.lengths[slot - 1];
		}
		array = array.table[slot];
	}
	return array.table[i];
}


// Sets the value at the index i. Only the nodes leading to i will get
// copied and updated.
function set(i, item, array)
{
	if (i < 0 || length(array) <= i)
	{
		return array;
	}
	return unsafeSet(i, item, array);
}


function unsafeSet(i, item, array)
{
	array = nodeCopy(array);

	if (array.height === 0)
	{
		array.table[i] = item;
	}
	else
	{
		var slot = getSlot(i, array);
		if (slot > 0)
		{
			i -= array.lengths[slot - 1];
		}
		array.table[slot] = unsafeSet(i, item, array.table[slot]);
	}
	return array;
}


function initialize(len, f)
{
	if (len <= 0)
	{
		return empty;
	}
	var h = Math.floor( Math.log(len) / Math.log(M) );
	return initialize_(f, h, 0, len);
}

function initialize_(f, h, from, to)
{
	if (h === 0)
	{
		var table = new Array((to - from) % (M + 1));
		for (var i = 0; i < table.length; i++)
		{
		  table[i] = f(from + i);
		}
		return {
			ctor: '_Array',
			height: 0,
			table: table
		};
	}

	var step = Math.pow(M, h);
	var table = new Array(Math.ceil((to - from) / step));
	var lengths = new Array(table.length);
	for (var i = 0; i < table.length; i++)
	{
		table[i] = initialize_(f, h - 1, from + (i * step), Math.min(from + ((i + 1) * step), to));
		lengths[i] = length(table[i]) + (i > 0 ? lengths[i-1] : 0);
	}
	return {
		ctor: '_Array',
		height: h,
		table: table,
		lengths: lengths
	};
}

function fromList(list)
{
	if (list.ctor === '[]')
	{
		return empty;
	}

	// Allocate M sized blocks (table) and write list elements to it.
	var table = new Array(M);
	var nodes = [];
	var i = 0;

	while (list.ctor !== '[]')
	{
		table[i] = list._0;
		list = list._1;
		i++;

		// table is full, so we can push a leaf containing it into the
		// next node.
		if (i === M)
		{
			var leaf = {
				ctor: '_Array',
				height: 0,
				table: table
			};
			fromListPush(leaf, nodes);
			table = new Array(M);
			i = 0;
		}
	}

	// Maybe there is something left on the table.
	if (i > 0)
	{
		var leaf = {
			ctor: '_Array',
			height: 0,
			table: table.splice(0, i)
		};
		fromListPush(leaf, nodes);
	}

	// Go through all of the nodes and eventually push them into higher nodes.
	for (var h = 0; h < nodes.length - 1; h++)
	{
		if (nodes[h].table.length > 0)
		{
			fromListPush(nodes[h], nodes);
		}
	}

	var head = nodes[nodes.length - 1];
	if (head.height > 0 && head.table.length === 1)
	{
		return head.table[0];
	}
	else
	{
		return head;
	}
}

// Push a node into a higher node as a child.
function fromListPush(toPush, nodes)
{
	var h = toPush.height;

	// Maybe the node on this height does not exist.
	if (nodes.length === h)
	{
		var node = {
			ctor: '_Array',
			height: h + 1,
			table: [],
			lengths: []
		};
		nodes.push(node);
	}

	nodes[h].table.push(toPush);
	var len = length(toPush);
	if (nodes[h].lengths.length > 0)
	{
		len += nodes[h].lengths[nodes[h].lengths.length - 1];
	}
	nodes[h].lengths.push(len);

	if (nodes[h].table.length === M)
	{
		fromListPush(nodes[h], nodes);
		nodes[h] = {
			ctor: '_Array',
			height: h + 1,
			table: [],
			lengths: []
		};
	}
}

// Pushes an item via push_ to the bottom right of a tree.
function push(item, a)
{
	var pushed = push_(item, a);
	if (pushed !== null)
	{
		return pushed;
	}

	var newTree = create(item, a.height);
	return siblise(a, newTree);
}

// Recursively tries to push an item to the bottom-right most
// tree possible. If there is no space left for the item,
// null will be returned.
function push_(item, a)
{
	// Handle resursion stop at leaf level.
	if (a.height === 0)
	{
		if (a.table.length < M)
		{
			var newA = {
				ctor: '_Array',
				height: 0,
				table: a.table.slice()
			};
			newA.table.push(item);
			return newA;
		}
		else
		{
		  return null;
		}
	}

	// Recursively push
	var pushed = push_(item, botRight(a));

	// There was space in the bottom right tree, so the slot will
	// be updated.
	if (pushed !== null)
	{
		var newA = nodeCopy(a);
		newA.table[newA.table.length - 1] = pushed;
		newA.lengths[newA.lengths.length - 1]++;
		return newA;
	}

	// When there was no space left, check if there is space left
	// for a new slot with a tree which contains only the item
	// at the bottom.
	if (a.table.length < M)
	{
		var newSlot = create(item, a.height - 1);
		var newA = nodeCopy(a);
		newA.table.push(newSlot);
		newA.lengths.push(newA.lengths[newA.lengths.length - 1] + length(newSlot));
		return newA;
	}
	else
	{
		return null;
	}
}

// Converts an array into a list of elements.
function toList(a)
{
	return toList_(_elm_lang$core$Native_List.Nil, a);
}

function toList_(list, a)
{
	for (var i = a.table.length - 1; i >= 0; i--)
	{
		list =
			a.height === 0
				? _elm_lang$core$Native_List.Cons(a.table[i], list)
				: toList_(list, a.table[i]);
	}
	return list;
}

// Maps a function over the elements of an array.
function map(f, a)
{
	var newA = {
		ctor: '_Array',
		height: a.height,
		table: new Array(a.table.length)
	};
	if (a.height > 0)
	{
		newA.lengths = a.lengths;
	}
	for (var i = 0; i < a.table.length; i++)
	{
		newA.table[i] =
			a.height === 0
				? f(a.table[i])
				: map(f, a.table[i]);
	}
	return newA;
}

// Maps a function over the elements with their index as first argument.
function indexedMap(f, a)
{
	return indexedMap_(f, a, 0);
}

function indexedMap_(f, a, from)
{
	var newA = {
		ctor: '_Array',
		height: a.height,
		table: new Array(a.table.length)
	};
	if (a.height > 0)
	{
		newA.lengths = a.lengths;
	}
	for (var i = 0; i < a.table.length; i++)
	{
		newA.table[i] =
			a.height === 0
				? A2(f, from + i, a.table[i])
				: indexedMap_(f, a.table[i], i == 0 ? from : from + a.lengths[i - 1]);
	}
	return newA;
}

function foldl(f, b, a)
{
	if (a.height === 0)
	{
		for (var i = 0; i < a.table.length; i++)
		{
			b = A2(f, a.table[i], b);
		}
	}
	else
	{
		for (var i = 0; i < a.table.length; i++)
		{
			b = foldl(f, b, a.table[i]);
		}
	}
	return b;
}

function foldr(f, b, a)
{
	if (a.height === 0)
	{
		for (var i = a.table.length; i--; )
		{
			b = A2(f, a.table[i], b);
		}
	}
	else
	{
		for (var i = a.table.length; i--; )
		{
			b = foldr(f, b, a.table[i]);
		}
	}
	return b;
}

// TODO: currently, it slices the right, then the left. This can be
// optimized.
function slice(from, to, a)
{
	if (from < 0)
	{
		from += length(a);
	}
	if (to < 0)
	{
		to += length(a);
	}
	return sliceLeft(from, sliceRight(to, a));
}

function sliceRight(to, a)
{
	if (to === length(a))
	{
		return a;
	}

	// Handle leaf level.
	if (a.height === 0)
	{
		var newA = { ctor:'_Array', height:0 };
		newA.table = a.table.slice(0, to);
		return newA;
	}

	// Slice the right recursively.
	var right = getSlot(to, a);
	var sliced = sliceRight(to - (right > 0 ? a.lengths[right - 1] : 0), a.table[right]);

	// Maybe the a node is not even needed, as sliced contains the whole slice.
	if (right === 0)
	{
		return sliced;
	}

	// Create new node.
	var newA = {
		ctor: '_Array',
		height: a.height,
		table: a.table.slice(0, right),
		lengths: a.lengths.slice(0, right)
	};
	if (sliced.table.length > 0)
	{
		newA.table[right] = sliced;
		newA.lengths[right] = length(sliced) + (right > 0 ? newA.lengths[right - 1] : 0);
	}
	return newA;
}

function sliceLeft(from, a)
{
	if (from === 0)
	{
		return a;
	}

	// Handle leaf level.
	if (a.height === 0)
	{
		var newA = { ctor:'_Array', height:0 };
		newA.table = a.table.slice(from, a.table.length + 1);
		return newA;
	}

	// Slice the left recursively.
	var left = getSlot(from, a);
	var sliced = sliceLeft(from - (left > 0 ? a.lengths[left - 1] : 0), a.table[left]);

	// Maybe the a node is not even needed, as sliced contains the whole slice.
	if (left === a.table.length - 1)
	{
		return sliced;
	}

	// Create new node.
	var newA = {
		ctor: '_Array',
		height: a.height,
		table: a.table.slice(left, a.table.length + 1),
		lengths: new Array(a.table.length - left)
	};
	newA.table[0] = sliced;
	var len = 0;
	for (var i = 0; i < newA.table.length; i++)
	{
		len += length(newA.table[i]);
		newA.lengths[i] = len;
	}

	return newA;
}

// Appends two trees.
function append(a,b)
{
	if (a.table.length === 0)
	{
		return b;
	}
	if (b.table.length === 0)
	{
		return a;
	}

	var c = append_(a, b);

	// Check if both nodes can be crunshed together.
	if (c[0].table.length + c[1].table.length <= M)
	{
		if (c[0].table.length === 0)
		{
			return c[1];
		}
		if (c[1].table.length === 0)
		{
			return c[0];
		}

		// Adjust .table and .lengths
		c[0].table = c[0].table.concat(c[1].table);
		if (c[0].height > 0)
		{
			var len = length(c[0]);
			for (var i = 0; i < c[1].lengths.length; i++)
			{
				c[1].lengths[i] += len;
			}
			c[0].lengths = c[0].lengths.concat(c[1].lengths);
		}

		return c[0];
	}

	if (c[0].height > 0)
	{
		var toRemove = calcToRemove(a, b);
		if (toRemove > E)
		{
			c = shuffle(c[0], c[1], toRemove);
		}
	}

	return siblise(c[0], c[1]);
}

// Returns an array of two nodes; right and left. One node _may_ be empty.
function append_(a, b)
{
	if (a.height === 0 && b.height === 0)
	{
		return [a, b];
	}

	if (a.height !== 1 || b.height !== 1)
	{
		if (a.height === b.height)
		{
			a = nodeCopy(a);
			b = nodeCopy(b);
			var appended = append_(botRight(a), botLeft(b));

			insertRight(a, appended[1]);
			insertLeft(b, appended[0]);
		}
		else if (a.height > b.height)
		{
			a = nodeCopy(a);
			var appended = append_(botRight(a), b);

			insertRight(a, appended[0]);
			b = parentise(appended[1], appended[1].height + 1);
		}
		else
		{
			b = nodeCopy(b);
			var appended = append_(a, botLeft(b));

			var left = appended[0].table.length === 0 ? 0 : 1;
			var right = left === 0 ? 1 : 0;
			insertLeft(b, appended[left]);
			a = parentise(appended[right], appended[right].height + 1);
		}
	}

	// Check if balancing is needed and return based on that.
	if (a.table.length === 0 || b.table.length === 0)
	{
		return [a, b];
	}

	var toRemove = calcToRemove(a, b);
	if (toRemove <= E)
	{
		return [a, b];
	}
	return shuffle(a, b, toRemove);
}

// Helperfunctions for append_. Replaces a child node at the side of the parent.
function insertRight(parent, node)
{
	var index = parent.table.length - 1;
	parent.table[index] = node;
	parent.lengths[index] = length(node);
	parent.lengths[index] += index > 0 ? parent.lengths[index - 1] : 0;
}

function insertLeft(parent, node)
{
	if (node.table.length > 0)
	{
		parent.table[0] = node;
		parent.lengths[0] = length(node);

		var len = length(parent.table[0]);
		for (var i = 1; i < parent.lengths.length; i++)
		{
			len += length(parent.table[i]);
			parent.lengths[i] = len;
		}
	}
	else
	{
		parent.table.shift();
		for (var i = 1; i < parent.lengths.length; i++)
		{
			parent.lengths[i] = parent.lengths[i] - parent.lengths[0];
		}
		parent.lengths.shift();
	}
}

// Returns the extra search steps for E. Refer to the paper.
function calcToRemove(a, b)
{
	var subLengths = 0;
	for (var i = 0; i < a.table.length; i++)
	{
		subLengths += a.table[i].table.length;
	}
	for (var i = 0; i < b.table.length; i++)
	{
		subLengths += b.table[i].table.length;
	}

	var toRemove = a.table.length + b.table.length;
	return toRemove - (Math.floor((subLengths - 1) / M) + 1);
}

// get2, set2 and saveSlot are helpers for accessing elements over two arrays.
function get2(a, b, index)
{
	return index < a.length
		? a[index]
		: b[index - a.length];
}

function set2(a, b, index, value)
{
	if (index < a.length)
	{
		a[index] = value;
	}
	else
	{
		b[index - a.length] = value;
	}
}

function saveSlot(a, b, index, slot)
{
	set2(a.table, b.table, index, slot);

	var l = (index === 0 || index === a.lengths.length)
		? 0
		: get2(a.lengths, a.lengths, index - 1);

	set2(a.lengths, b.lengths, index, l + length(slot));
}

// Creates a node or leaf with a given length at their arrays for perfomance.
// Is only used by shuffle.
function createNode(h, length)
{
	if (length < 0)
	{
		length = 0;
	}
	var a = {
		ctor: '_Array',
		height: h,
		table: new Array(length)
	};
	if (h > 0)
	{
		a.lengths = new Array(length);
	}
	return a;
}

// Returns an array of two balanced nodes.
function shuffle(a, b, toRemove)
{
	var newA = createNode(a.height, Math.min(M, a.table.length + b.table.length - toRemove));
	var newB = createNode(a.height, newA.table.length - (a.table.length + b.table.length - toRemove));

	// Skip the slots with size M. More precise: copy the slot references
	// to the new node
	var read = 0;
	while (get2(a.table, b.table, read).table.length % M === 0)
	{
		set2(newA.table, newB.table, read, get2(a.table, b.table, read));
		set2(newA.lengths, newB.lengths, read, get2(a.lengths, b.lengths, read));
		read++;
	}

	// Pulling items from left to right, caching in a slot before writing
	// it into the new nodes.
	var write = read;
	var slot = new createNode(a.height - 1, 0);
	var from = 0;

	// If the current slot is still containing data, then there will be at
	// least one more write, so we do not break this loop yet.
	while (read - write - (slot.table.length > 0 ? 1 : 0) < toRemove)
	{
		// Find out the max possible items for copying.
		var source = get2(a.table, b.table, read);
		var to = Math.min(M - slot.table.length, source.table.length);

		// Copy and adjust size table.
		slot.table = slot.table.concat(source.table.slice(from, to));
		if (slot.height > 0)
		{
			var len = slot.lengths.length;
			for (var i = len; i < len + to - from; i++)
			{
				slot.lengths[i] = length(slot.table[i]);
				slot.lengths[i] += (i > 0 ? slot.lengths[i - 1] : 0);
			}
		}

		from += to;

		// Only proceed to next slots[i] if the current one was
		// fully copied.
		if (source.table.length <= to)
		{
			read++; from = 0;
		}

		// Only create a new slot if the current one is filled up.
		if (slot.table.length === M)
		{
			saveSlot(newA, newB, write, slot);
			slot = createNode(a.height - 1, 0);
			write++;
		}
	}

	// Cleanup after the loop. Copy the last slot into the new nodes.
	if (slot.table.length > 0)
	{
		saveSlot(newA, newB, write, slot);
		write++;
	}

	// Shift the untouched slots to the left
	while (read < a.table.length + b.table.length )
	{
		saveSlot(newA, newB, write, get2(a.table, b.table, read));
		read++;
		write++;
	}

	return [newA, newB];
}

// Navigation functions
function botRight(a)
{
	return a.table[a.table.length - 1];
}
function botLeft(a)
{
	return a.table[0];
}

// Copies a node for updating. Note that you should not use this if
// only updating only one of "table" or "lengths" for performance reasons.
function nodeCopy(a)
{
	var newA = {
		ctor: '_Array',
		height: a.height,
		table: a.table.slice()
	};
	if (a.height > 0)
	{
		newA.lengths = a.lengths.slice();
	}
	return newA;
}

// Returns how many items are in the tree.
function length(array)
{
	if (array.height === 0)
	{
		return array.table.length;
	}
	else
	{
		return array.lengths[array.lengths.length - 1];
	}
}

// Calculates in which slot of "table" the item probably is, then
// find the exact slot via forward searching in  "lengths". Returns the index.
function getSlot(i, a)
{
	var slot = i >> (5 * a.height);
	while (a.lengths[slot] <= i)
	{
		slot++;
	}
	return slot;
}

// Recursively creates a tree with a given height containing
// only the given item.
function create(item, h)
{
	if (h === 0)
	{
		return {
			ctor: '_Array',
			height: 0,
			table: [item]
		};
	}
	return {
		ctor: '_Array',
		height: h,
		table: [create(item, h - 1)],
		lengths: [1]
	};
}

// Recursively creates a tree that contains the given tree.
function parentise(tree, h)
{
	if (h === tree.height)
	{
		return tree;
	}

	return {
		ctor: '_Array',
		height: h,
		table: [parentise(tree, h - 1)],
		lengths: [length(tree)]
	};
}

// Emphasizes blood brotherhood beneath two trees.
function siblise(a, b)
{
	return {
		ctor: '_Array',
		height: a.height + 1,
		table: [a, b],
		lengths: [length(a), length(a) + length(b)]
	};
}

function toJSArray(a)
{
	var jsArray = new Array(length(a));
	toJSArray_(jsArray, 0, a);
	return jsArray;
}

function toJSArray_(jsArray, i, a)
{
	for (var t = 0; t < a.table.length; t++)
	{
		if (a.height === 0)
		{
			jsArray[i + t] = a.table[t];
		}
		else
		{
			var inc = t === 0 ? 0 : a.lengths[t - 1];
			toJSArray_(jsArray, i + inc, a.table[t]);
		}
	}
}

function fromJSArray(jsArray)
{
	if (jsArray.length === 0)
	{
		return empty;
	}
	var h = Math.floor(Math.log(jsArray.length) / Math.log(M));
	return fromJSArray_(jsArray, h, 0, jsArray.length);
}

function fromJSArray_(jsArray, h, from, to)
{
	if (h === 0)
	{
		return {
			ctor: '_Array',
			height: 0,
			table: jsArray.slice(from, to)
		};
	}

	var step = Math.pow(M, h);
	var table = new Array(Math.ceil((to - from) / step));
	var lengths = new Array(table.length);
	for (var i = 0; i < table.length; i++)
	{
		table[i] = fromJSArray_(jsArray, h - 1, from + (i * step), Math.min(from + ((i + 1) * step), to));
		lengths[i] = length(table[i]) + (i > 0 ? lengths[i - 1] : 0);
	}
	return {
		ctor: '_Array',
		height: h,
		table: table,
		lengths: lengths
	};
}

return {
	empty: empty,
	fromList: fromList,
	toList: toList,
	initialize: F2(initialize),
	append: F2(append),
	push: F2(push),
	slice: F3(slice),
	get: F2(get),
	set: F3(set),
	map: F2(map),
	indexedMap: F2(indexedMap),
	foldl: F3(foldl),
	foldr: F3(foldr),
	length: length,

	toJSArray: toJSArray,
	fromJSArray: fromJSArray
};

}();
var _elm_lang$core$Array$append = _elm_lang$core$Native_Array.append;
var _elm_lang$core$Array$length = _elm_lang$core$Native_Array.length;
var _elm_lang$core$Array$isEmpty = function (array) {
	return _elm_lang$core$Native_Utils.eq(
		_elm_lang$core$Array$length(array),
		0);
};
var _elm_lang$core$Array$slice = _elm_lang$core$Native_Array.slice;
var _elm_lang$core$Array$set = _elm_lang$core$Native_Array.set;
var _elm_lang$core$Array$get = F2(
	function (i, array) {
		return ((_elm_lang$core$Native_Utils.cmp(0, i) < 1) && (_elm_lang$core$Native_Utils.cmp(
			i,
			_elm_lang$core$Native_Array.length(array)) < 0)) ? _elm_lang$core$Maybe$Just(
			A2(_elm_lang$core$Native_Array.get, i, array)) : _elm_lang$core$Maybe$Nothing;
	});
var _elm_lang$core$Array$push = _elm_lang$core$Native_Array.push;
var _elm_lang$core$Array$empty = _elm_lang$core$Native_Array.empty;
var _elm_lang$core$Array$filter = F2(
	function (isOkay, arr) {
		var update = F2(
			function (x, xs) {
				return isOkay(x) ? A2(_elm_lang$core$Native_Array.push, x, xs) : xs;
			});
		return A3(_elm_lang$core$Native_Array.foldl, update, _elm_lang$core$Native_Array.empty, arr);
	});
var _elm_lang$core$Array$foldr = _elm_lang$core$Native_Array.foldr;
var _elm_lang$core$Array$foldl = _elm_lang$core$Native_Array.foldl;
var _elm_lang$core$Array$indexedMap = _elm_lang$core$Native_Array.indexedMap;
var _elm_lang$core$Array$map = _elm_lang$core$Native_Array.map;
var _elm_lang$core$Array$toIndexedList = function (array) {
	return A3(
		_elm_lang$core$List$map2,
		F2(
			function (v0, v1) {
				return {ctor: '_Tuple2', _0: v0, _1: v1};
			}),
		A2(
			_elm_lang$core$List$range,
			0,
			_elm_lang$core$Native_Array.length(array) - 1),
		_elm_lang$core$Native_Array.toList(array));
};
var _elm_lang$core$Array$toList = _elm_lang$core$Native_Array.toList;
var _elm_lang$core$Array$fromList = _elm_lang$core$Native_Array.fromList;
var _elm_lang$core$Array$initialize = _elm_lang$core$Native_Array.initialize;
var _elm_lang$core$Array$repeat = F2(
	function (n, e) {
		return A2(
			_elm_lang$core$Array$initialize,
			n,
			_elm_lang$core$Basics$always(e));
	});
var _elm_lang$core$Array$Array = {ctor: 'Array'};

//import Maybe, Native.Array, Native.List, Native.Utils, Result //

var _elm_lang$core$Native_Json = function() {


// CORE DECODERS

function succeed(msg)
{
	return {
		ctor: '<decoder>',
		tag: 'succeed',
		msg: msg
	};
}

function fail(msg)
{
	return {
		ctor: '<decoder>',
		tag: 'fail',
		msg: msg
	};
}

function decodePrimitive(tag)
{
	return {
		ctor: '<decoder>',
		tag: tag
	};
}

function decodeContainer(tag, decoder)
{
	return {
		ctor: '<decoder>',
		tag: tag,
		decoder: decoder
	};
}

function decodeNull(value)
{
	return {
		ctor: '<decoder>',
		tag: 'null',
		value: value
	};
}

function decodeField(field, decoder)
{
	return {
		ctor: '<decoder>',
		tag: 'field',
		field: field,
		decoder: decoder
	};
}

function decodeIndex(index, decoder)
{
	return {
		ctor: '<decoder>',
		tag: 'index',
		index: index,
		decoder: decoder
	};
}

function decodeKeyValuePairs(decoder)
{
	return {
		ctor: '<decoder>',
		tag: 'key-value',
		decoder: decoder
	};
}

function mapMany(f, decoders)
{
	return {
		ctor: '<decoder>',
		tag: 'map-many',
		func: f,
		decoders: decoders
	};
}

function andThen(callback, decoder)
{
	return {
		ctor: '<decoder>',
		tag: 'andThen',
		decoder: decoder,
		callback: callback
	};
}

function oneOf(decoders)
{
	return {
		ctor: '<decoder>',
		tag: 'oneOf',
		decoders: decoders
	};
}


// DECODING OBJECTS

function map1(f, d1)
{
	return mapMany(f, [d1]);
}

function map2(f, d1, d2)
{
	return mapMany(f, [d1, d2]);
}

function map3(f, d1, d2, d3)
{
	return mapMany(f, [d1, d2, d3]);
}

function map4(f, d1, d2, d3, d4)
{
	return mapMany(f, [d1, d2, d3, d4]);
}

function map5(f, d1, d2, d3, d4, d5)
{
	return mapMany(f, [d1, d2, d3, d4, d5]);
}

function map6(f, d1, d2, d3, d4, d5, d6)
{
	return mapMany(f, [d1, d2, d3, d4, d5, d6]);
}

function map7(f, d1, d2, d3, d4, d5, d6, d7)
{
	return mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
}

function map8(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
}


// DECODE HELPERS

function ok(value)
{
	return { tag: 'ok', value: value };
}

function badPrimitive(type, value)
{
	return { tag: 'primitive', type: type, value: value };
}

function badIndex(index, nestedProblems)
{
	return { tag: 'index', index: index, rest: nestedProblems };
}

function badField(field, nestedProblems)
{
	return { tag: 'field', field: field, rest: nestedProblems };
}

function badIndex(index, nestedProblems)
{
	return { tag: 'index', index: index, rest: nestedProblems };
}

function badOneOf(problems)
{
	return { tag: 'oneOf', problems: problems };
}

function bad(msg)
{
	return { tag: 'fail', msg: msg };
}

function badToString(problem)
{
	var context = '_';
	while (problem)
	{
		switch (problem.tag)
		{
			case 'primitive':
				return 'Expecting ' + problem.type
					+ (context === '_' ? '' : ' at ' + context)
					+ ' but instead got: ' + jsToString(problem.value);

			case 'index':
				context += '[' + problem.index + ']';
				problem = problem.rest;
				break;

			case 'field':
				context += '.' + problem.field;
				problem = problem.rest;
				break;

			case 'oneOf':
				var problems = problem.problems;
				for (var i = 0; i < problems.length; i++)
				{
					problems[i] = badToString(problems[i]);
				}
				return 'I ran into the following problems'
					+ (context === '_' ? '' : ' at ' + context)
					+ ':\n\n' + problems.join('\n');

			case 'fail':
				return 'I ran into a `fail` decoder'
					+ (context === '_' ? '' : ' at ' + context)
					+ ': ' + problem.msg;
		}
	}
}

function jsToString(value)
{
	return value === undefined
		? 'undefined'
		: JSON.stringify(value);
}


// DECODE

function runOnString(decoder, string)
{
	var json;
	try
	{
		json = JSON.parse(string);
	}
	catch (e)
	{
		return _elm_lang$core$Result$Err('Given an invalid JSON: ' + e.message);
	}
	return run(decoder, json);
}

function run(decoder, value)
{
	var result = runHelp(decoder, value);
	return (result.tag === 'ok')
		? _elm_lang$core$Result$Ok(result.value)
		: _elm_lang$core$Result$Err(badToString(result));
}

function runHelp(decoder, value)
{
	switch (decoder.tag)
	{
		case 'bool':
			return (typeof value === 'boolean')
				? ok(value)
				: badPrimitive('a Bool', value);

		case 'int':
			if (typeof value !== 'number') {
				return badPrimitive('an Int', value);
			}

			if (-2147483647 < value && value < 2147483647 && (value | 0) === value) {
				return ok(value);
			}

			if (isFinite(value) && !(value % 1)) {
				return ok(value);
			}

			return badPrimitive('an Int', value);

		case 'float':
			return (typeof value === 'number')
				? ok(value)
				: badPrimitive('a Float', value);

		case 'string':
			return (typeof value === 'string')
				? ok(value)
				: (value instanceof String)
					? ok(value + '')
					: badPrimitive('a String', value);

		case 'null':
			return (value === null)
				? ok(decoder.value)
				: badPrimitive('null', value);

		case 'value':
			return ok(value);

		case 'list':
			if (!(value instanceof Array))
			{
				return badPrimitive('a List', value);
			}

			var list = _elm_lang$core$Native_List.Nil;
			for (var i = value.length; i--; )
			{
				var result = runHelp(decoder.decoder, value[i]);
				if (result.tag !== 'ok')
				{
					return badIndex(i, result)
				}
				list = _elm_lang$core$Native_List.Cons(result.value, list);
			}
			return ok(list);

		case 'array':
			if (!(value instanceof Array))
			{
				return badPrimitive('an Array', value);
			}

			var len = value.length;
			var array = new Array(len);
			for (var i = len; i--; )
			{
				var result = runHelp(decoder.decoder, value[i]);
				if (result.tag !== 'ok')
				{
					return badIndex(i, result);
				}
				array[i] = result.value;
			}
			return ok(_elm_lang$core$Native_Array.fromJSArray(array));

		case 'maybe':
			var result = runHelp(decoder.decoder, value);
			return (result.tag === 'ok')
				? ok(_elm_lang$core$Maybe$Just(result.value))
				: ok(_elm_lang$core$Maybe$Nothing);

		case 'field':
			var field = decoder.field;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return badPrimitive('an object with a field named `' + field + '`', value);
			}

			var result = runHelp(decoder.decoder, value[field]);
			return (result.tag === 'ok') ? result : badField(field, result);

		case 'index':
			var index = decoder.index;
			if (!(value instanceof Array))
			{
				return badPrimitive('an array', value);
			}
			if (index >= value.length)
			{
				return badPrimitive('a longer array. Need index ' + index + ' but there are only ' + value.length + ' entries', value);
			}

			var result = runHelp(decoder.decoder, value[index]);
			return (result.tag === 'ok') ? result : badIndex(index, result);

		case 'key-value':
			if (typeof value !== 'object' || value === null || value instanceof Array)
			{
				return badPrimitive('an object', value);
			}

			var keyValuePairs = _elm_lang$core$Native_List.Nil;
			for (var key in value)
			{
				var result = runHelp(decoder.decoder, value[key]);
				if (result.tag !== 'ok')
				{
					return badField(key, result);
				}
				var pair = _elm_lang$core$Native_Utils.Tuple2(key, result.value);
				keyValuePairs = _elm_lang$core$Native_List.Cons(pair, keyValuePairs);
			}
			return ok(keyValuePairs);

		case 'map-many':
			var answer = decoder.func;
			var decoders = decoder.decoders;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = runHelp(decoders[i], value);
				if (result.tag !== 'ok')
				{
					return result;
				}
				answer = answer(result.value);
			}
			return ok(answer);

		case 'andThen':
			var result = runHelp(decoder.decoder, value);
			return (result.tag !== 'ok')
				? result
				: runHelp(decoder.callback(result.value), value);

		case 'oneOf':
			var errors = [];
			var temp = decoder.decoders;
			while (temp.ctor !== '[]')
			{
				var result = runHelp(temp._0, value);

				if (result.tag === 'ok')
				{
					return result;
				}

				errors.push(result);

				temp = temp._1;
			}
			return badOneOf(errors);

		case 'fail':
			return bad(decoder.msg);

		case 'succeed':
			return ok(decoder.msg);
	}
}


// EQUALITY

function equality(a, b)
{
	if (a === b)
	{
		return true;
	}

	if (a.tag !== b.tag)
	{
		return false;
	}

	switch (a.tag)
	{
		case 'succeed':
		case 'fail':
			return a.msg === b.msg;

		case 'bool':
		case 'int':
		case 'float':
		case 'string':
		case 'value':
			return true;

		case 'null':
			return a.value === b.value;

		case 'list':
		case 'array':
		case 'maybe':
		case 'key-value':
			return equality(a.decoder, b.decoder);

		case 'field':
			return a.field === b.field && equality(a.decoder, b.decoder);

		case 'index':
			return a.index === b.index && equality(a.decoder, b.decoder);

		case 'map-many':
			if (a.func !== b.func)
			{
				return false;
			}
			return listEquality(a.decoders, b.decoders);

		case 'andThen':
			return a.callback === b.callback && equality(a.decoder, b.decoder);

		case 'oneOf':
			return listEquality(a.decoders, b.decoders);
	}
}

function listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

function encode(indentLevel, value)
{
	return JSON.stringify(value, null, indentLevel);
}

function identity(value)
{
	return value;
}

function encodeObject(keyValuePairs)
{
	var obj = {};
	while (keyValuePairs.ctor !== '[]')
	{
		var pair = keyValuePairs._0;
		obj[pair._0] = pair._1;
		keyValuePairs = keyValuePairs._1;
	}
	return obj;
}

return {
	encode: F2(encode),
	runOnString: F2(runOnString),
	run: F2(run),

	decodeNull: decodeNull,
	decodePrimitive: decodePrimitive,
	decodeContainer: F2(decodeContainer),

	decodeField: F2(decodeField),
	decodeIndex: F2(decodeIndex),

	map1: F2(map1),
	map2: F3(map2),
	map3: F4(map3),
	map4: F5(map4),
	map5: F6(map5),
	map6: F7(map6),
	map7: F8(map7),
	map8: F9(map8),
	decodeKeyValuePairs: decodeKeyValuePairs,

	andThen: F2(andThen),
	fail: fail,
	succeed: succeed,
	oneOf: oneOf,

	identity: identity,
	encodeNull: null,
	encodeArray: _elm_lang$core$Native_Array.toJSArray,
	encodeList: _elm_lang$core$Native_List.toArray,
	encodeObject: encodeObject,

	equality: equality
};

}();

var _elm_lang$core$Json_Encode$list = _elm_lang$core$Native_Json.encodeList;
var _elm_lang$core$Json_Encode$array = _elm_lang$core$Native_Json.encodeArray;
var _elm_lang$core$Json_Encode$object = _elm_lang$core$Native_Json.encodeObject;
var _elm_lang$core$Json_Encode$null = _elm_lang$core$Native_Json.encodeNull;
var _elm_lang$core$Json_Encode$bool = _elm_lang$core$Native_Json.identity;
var _elm_lang$core$Json_Encode$float = _elm_lang$core$Native_Json.identity;
var _elm_lang$core$Json_Encode$int = _elm_lang$core$Native_Json.identity;
var _elm_lang$core$Json_Encode$string = _elm_lang$core$Native_Json.identity;
var _elm_lang$core$Json_Encode$encode = _elm_lang$core$Native_Json.encode;
var _elm_lang$core$Json_Encode$Value = {ctor: 'Value'};

var _elm_lang$core$Json_Decode$null = _elm_lang$core$Native_Json.decodeNull;
var _elm_lang$core$Json_Decode$value = _elm_lang$core$Native_Json.decodePrimitive('value');
var _elm_lang$core$Json_Decode$andThen = _elm_lang$core$Native_Json.andThen;
var _elm_lang$core$Json_Decode$fail = _elm_lang$core$Native_Json.fail;
var _elm_lang$core$Json_Decode$succeed = _elm_lang$core$Native_Json.succeed;
var _elm_lang$core$Json_Decode$lazy = function (thunk) {
	return A2(
		_elm_lang$core$Json_Decode$andThen,
		thunk,
		_elm_lang$core$Json_Decode$succeed(
			{ctor: '_Tuple0'}));
};
var _elm_lang$core$Json_Decode$decodeValue = _elm_lang$core$Native_Json.run;
var _elm_lang$core$Json_Decode$decodeString = _elm_lang$core$Native_Json.runOnString;
var _elm_lang$core$Json_Decode$map8 = _elm_lang$core$Native_Json.map8;
var _elm_lang$core$Json_Decode$map7 = _elm_lang$core$Native_Json.map7;
var _elm_lang$core$Json_Decode$map6 = _elm_lang$core$Native_Json.map6;
var _elm_lang$core$Json_Decode$map5 = _elm_lang$core$Native_Json.map5;
var _elm_lang$core$Json_Decode$map4 = _elm_lang$core$Native_Json.map4;
var _elm_lang$core$Json_Decode$map3 = _elm_lang$core$Native_Json.map3;
var _elm_lang$core$Json_Decode$map2 = _elm_lang$core$Native_Json.map2;
var _elm_lang$core$Json_Decode$map = _elm_lang$core$Native_Json.map1;
var _elm_lang$core$Json_Decode$oneOf = _elm_lang$core$Native_Json.oneOf;
var _elm_lang$core$Json_Decode$maybe = function (decoder) {
	return A2(_elm_lang$core$Native_Json.decodeContainer, 'maybe', decoder);
};
var _elm_lang$core$Json_Decode$index = _elm_lang$core$Native_Json.decodeIndex;
var _elm_lang$core$Json_Decode$field = _elm_lang$core$Native_Json.decodeField;
var _elm_lang$core$Json_Decode$at = F2(
	function (fields, decoder) {
		return A3(_elm_lang$core$List$foldr, _elm_lang$core$Json_Decode$field, decoder, fields);
	});
var _elm_lang$core$Json_Decode$keyValuePairs = _elm_lang$core$Native_Json.decodeKeyValuePairs;
var _elm_lang$core$Json_Decode$dict = function (decoder) {
	return A2(
		_elm_lang$core$Json_Decode$map,
		_elm_lang$core$Dict$fromList,
		_elm_lang$core$Json_Decode$keyValuePairs(decoder));
};
var _elm_lang$core$Json_Decode$array = function (decoder) {
	return A2(_elm_lang$core$Native_Json.decodeContainer, 'array', decoder);
};
var _elm_lang$core$Json_Decode$list = function (decoder) {
	return A2(_elm_lang$core$Native_Json.decodeContainer, 'list', decoder);
};
var _elm_lang$core$Json_Decode$nullable = function (decoder) {
	return _elm_lang$core$Json_Decode$oneOf(
		{
			ctor: '::',
			_0: _elm_lang$core$Json_Decode$null(_elm_lang$core$Maybe$Nothing),
			_1: {
				ctor: '::',
				_0: A2(_elm_lang$core$Json_Decode$map, _elm_lang$core$Maybe$Just, decoder),
				_1: {ctor: '[]'}
			}
		});
};
var _elm_lang$core$Json_Decode$float = _elm_lang$core$Native_Json.decodePrimitive('float');
var _elm_lang$core$Json_Decode$int = _elm_lang$core$Native_Json.decodePrimitive('int');
var _elm_lang$core$Json_Decode$bool = _elm_lang$core$Native_Json.decodePrimitive('bool');
var _elm_lang$core$Json_Decode$string = _elm_lang$core$Native_Json.decodePrimitive('string');
var _elm_lang$core$Json_Decode$Decoder = {ctor: 'Decoder'};

var _elm_lang$core$Set$foldr = F3(
	function (f, b, _p0) {
		var _p1 = _p0;
		return A3(
			_elm_lang$core$Dict$foldr,
			F3(
				function (k, _p2, b) {
					return A2(f, k, b);
				}),
			b,
			_p1._0);
	});
var _elm_lang$core$Set$foldl = F3(
	function (f, b, _p3) {
		var _p4 = _p3;
		return A3(
			_elm_lang$core$Dict$foldl,
			F3(
				function (k, _p5, b) {
					return A2(f, k, b);
				}),
			b,
			_p4._0);
	});
var _elm_lang$core$Set$toList = function (_p6) {
	var _p7 = _p6;
	return _elm_lang$core$Dict$keys(_p7._0);
};
var _elm_lang$core$Set$size = function (_p8) {
	var _p9 = _p8;
	return _elm_lang$core$Dict$size(_p9._0);
};
var _elm_lang$core$Set$member = F2(
	function (k, _p10) {
		var _p11 = _p10;
		return A2(_elm_lang$core$Dict$member, k, _p11._0);
	});
var _elm_lang$core$Set$isEmpty = function (_p12) {
	var _p13 = _p12;
	return _elm_lang$core$Dict$isEmpty(_p13._0);
};
var _elm_lang$core$Set$Set_elm_builtin = function (a) {
	return {ctor: 'Set_elm_builtin', _0: a};
};
var _elm_lang$core$Set$empty = _elm_lang$core$Set$Set_elm_builtin(_elm_lang$core$Dict$empty);
var _elm_lang$core$Set$singleton = function (k) {
	return _elm_lang$core$Set$Set_elm_builtin(
		A2(
			_elm_lang$core$Dict$singleton,
			k,
			{ctor: '_Tuple0'}));
};
var _elm_lang$core$Set$insert = F2(
	function (k, _p14) {
		var _p15 = _p14;
		return _elm_lang$core$Set$Set_elm_builtin(
			A3(
				_elm_lang$core$Dict$insert,
				k,
				{ctor: '_Tuple0'},
				_p15._0));
	});
var _elm_lang$core$Set$fromList = function (xs) {
	return A3(_elm_lang$core$List$foldl, _elm_lang$core$Set$insert, _elm_lang$core$Set$empty, xs);
};
var _elm_lang$core$Set$map = F2(
	function (f, s) {
		return _elm_lang$core$Set$fromList(
			A2(
				_elm_lang$core$List$map,
				f,
				_elm_lang$core$Set$toList(s)));
	});
var _elm_lang$core$Set$remove = F2(
	function (k, _p16) {
		var _p17 = _p16;
		return _elm_lang$core$Set$Set_elm_builtin(
			A2(_elm_lang$core$Dict$remove, k, _p17._0));
	});
var _elm_lang$core$Set$union = F2(
	function (_p19, _p18) {
		var _p20 = _p19;
		var _p21 = _p18;
		return _elm_lang$core$Set$Set_elm_builtin(
			A2(_elm_lang$core$Dict$union, _p20._0, _p21._0));
	});
var _elm_lang$core$Set$intersect = F2(
	function (_p23, _p22) {
		var _p24 = _p23;
		var _p25 = _p22;
		return _elm_lang$core$Set$Set_elm_builtin(
			A2(_elm_lang$core$Dict$intersect, _p24._0, _p25._0));
	});
var _elm_lang$core$Set$diff = F2(
	function (_p27, _p26) {
		var _p28 = _p27;
		var _p29 = _p26;
		return _elm_lang$core$Set$Set_elm_builtin(
			A2(_elm_lang$core$Dict$diff, _p28._0, _p29._0));
	});
var _elm_lang$core$Set$filter = F2(
	function (p, _p30) {
		var _p31 = _p30;
		return _elm_lang$core$Set$Set_elm_builtin(
			A2(
				_elm_lang$core$Dict$filter,
				F2(
					function (k, _p32) {
						return p(k);
					}),
				_p31._0));
	});
var _elm_lang$core$Set$partition = F2(
	function (p, _p33) {
		var _p34 = _p33;
		var _p35 = A2(
			_elm_lang$core$Dict$partition,
			F2(
				function (k, _p36) {
					return p(k);
				}),
			_p34._0);
		var p1 = _p35._0;
		var p2 = _p35._1;
		return {
			ctor: '_Tuple2',
			_0: _elm_lang$core$Set$Set_elm_builtin(p1),
			_1: _elm_lang$core$Set$Set_elm_builtin(p2)
		};
	});

var _elm_community$json_extra$Json_Decode_Extra$combine = A2(
	_elm_lang$core$List$foldr,
	_elm_lang$core$Json_Decode$map2(
		F2(
			function (x, y) {
				return {ctor: '::', _0: x, _1: y};
			})),
	_elm_lang$core$Json_Decode$succeed(
		{ctor: '[]'}));
var _elm_community$json_extra$Json_Decode_Extra$collection = function (decoder) {
	return A2(
		_elm_lang$core$Json_Decode$andThen,
		function (length) {
			return _elm_community$json_extra$Json_Decode_Extra$combine(
				A2(
					_elm_lang$core$List$map,
					function (index) {
						return A2(
							_elm_lang$core$Json_Decode$field,
							_elm_lang$core$Basics$toString(index),
							decoder);
					},
					A2(_elm_lang$core$List$range, 0, length - 1)));
		},
		A2(_elm_lang$core$Json_Decode$field, 'length', _elm_lang$core$Json_Decode$int));
};
var _elm_community$json_extra$Json_Decode_Extra$fromResult = function (result) {
	var _p0 = result;
	if (_p0.ctor === 'Ok') {
		return _elm_lang$core$Json_Decode$succeed(_p0._0);
	} else {
		return _elm_lang$core$Json_Decode$fail(_p0._0);
	}
};
var _elm_community$json_extra$Json_Decode_Extra$parseInt = A2(
	_elm_lang$core$Json_Decode$andThen,
	function (_p1) {
		return _elm_community$json_extra$Json_Decode_Extra$fromResult(
			_elm_lang$core$String$toInt(_p1));
	},
	_elm_lang$core$Json_Decode$string);
var _elm_community$json_extra$Json_Decode_Extra$parseFloat = A2(
	_elm_lang$core$Json_Decode$andThen,
	function (_p2) {
		return _elm_community$json_extra$Json_Decode_Extra$fromResult(
			_elm_lang$core$String$toFloat(_p2));
	},
	_elm_lang$core$Json_Decode$string);
var _elm_community$json_extra$Json_Decode_Extra$doubleEncoded = function (decoder) {
	return A2(
		_elm_lang$core$Json_Decode$andThen,
		function (_p3) {
			return _elm_community$json_extra$Json_Decode_Extra$fromResult(
				A2(_elm_lang$core$Json_Decode$decodeString, decoder, _p3));
		},
		_elm_lang$core$Json_Decode$string);
};
var _elm_community$json_extra$Json_Decode_Extra$keys = A2(
	_elm_lang$core$Json_Decode$map,
	A2(
		_elm_lang$core$List$foldl,
		F2(
			function (_p4, acc) {
				var _p5 = _p4;
				return {ctor: '::', _0: _p5._0, _1: acc};
			}),
		{ctor: '[]'}),
	_elm_lang$core$Json_Decode$keyValuePairs(
		_elm_lang$core$Json_Decode$succeed(
			{ctor: '_Tuple0'})));
var _elm_community$json_extra$Json_Decode_Extra$sequenceHelp = F2(
	function (decoders, jsonValues) {
		return (!_elm_lang$core$Native_Utils.eq(
			_elm_lang$core$List$length(jsonValues),
			_elm_lang$core$List$length(decoders))) ? _elm_lang$core$Json_Decode$fail('Number of decoders does not match number of values') : _elm_community$json_extra$Json_Decode_Extra$fromResult(
			A3(
				_elm_lang$core$List$foldr,
				_elm_lang$core$Result$map2(
					F2(
						function (x, y) {
							return {ctor: '::', _0: x, _1: y};
						})),
				_elm_lang$core$Result$Ok(
					{ctor: '[]'}),
				A3(_elm_lang$core$List$map2, _elm_lang$core$Json_Decode$decodeValue, decoders, jsonValues)));
	});
var _elm_community$json_extra$Json_Decode_Extra$sequence = function (decoders) {
	return A2(
		_elm_lang$core$Json_Decode$andThen,
		_elm_community$json_extra$Json_Decode_Extra$sequenceHelp(decoders),
		_elm_lang$core$Json_Decode$list(_elm_lang$core$Json_Decode$value));
};
var _elm_community$json_extra$Json_Decode_Extra$indexedList = function (indexedDecoder) {
	return A2(
		_elm_lang$core$Json_Decode$andThen,
		function (values) {
			return _elm_community$json_extra$Json_Decode_Extra$sequence(
				A2(
					_elm_lang$core$List$map,
					indexedDecoder,
					A2(
						_elm_lang$core$List$range,
						0,
						_elm_lang$core$List$length(values) - 1)));
		},
		_elm_lang$core$Json_Decode$list(_elm_lang$core$Json_Decode$value));
};
var _elm_community$json_extra$Json_Decode_Extra$optionalField = F2(
	function (fieldName, decoder) {
		var finishDecoding = function (json) {
			var _p6 = A2(
				_elm_lang$core$Json_Decode$decodeValue,
				A2(_elm_lang$core$Json_Decode$field, fieldName, _elm_lang$core$Json_Decode$value),
				json);
			if (_p6.ctor === 'Ok') {
				return A2(
					_elm_lang$core$Json_Decode$map,
					_elm_lang$core$Maybe$Just,
					A2(_elm_lang$core$Json_Decode$field, fieldName, decoder));
			} else {
				return _elm_lang$core$Json_Decode$succeed(_elm_lang$core$Maybe$Nothing);
			}
		};
		return A2(_elm_lang$core$Json_Decode$andThen, finishDecoding, _elm_lang$core$Json_Decode$value);
	});
var _elm_community$json_extra$Json_Decode_Extra$withDefault = F2(
	function (fallback, decoder) {
		return A2(
			_elm_lang$core$Json_Decode$map,
			_elm_lang$core$Maybe$withDefault(fallback),
			_elm_lang$core$Json_Decode$maybe(decoder));
	});
var _elm_community$json_extra$Json_Decode_Extra$decodeDictFromTuples = F2(
	function (keyDecoder, tuples) {
		var _p7 = tuples;
		if (_p7.ctor === '[]') {
			return _elm_lang$core$Json_Decode$succeed(_elm_lang$core$Dict$empty);
		} else {
			var _p8 = A2(_elm_lang$core$Json_Decode$decodeString, keyDecoder, _p7._0._0);
			if (_p8.ctor === 'Ok') {
				return A2(
					_elm_lang$core$Json_Decode$andThen,
					function (_p9) {
						return _elm_lang$core$Json_Decode$succeed(
							A3(_elm_lang$core$Dict$insert, _p8._0, _p7._0._1, _p9));
					},
					A2(_elm_community$json_extra$Json_Decode_Extra$decodeDictFromTuples, keyDecoder, _p7._1));
			} else {
				return _elm_lang$core$Json_Decode$fail(_p8._0);
			}
		}
	});
var _elm_community$json_extra$Json_Decode_Extra$dict2 = F2(
	function (keyDecoder, valueDecoder) {
		return A2(
			_elm_lang$core$Json_Decode$andThen,
			_elm_community$json_extra$Json_Decode_Extra$decodeDictFromTuples(keyDecoder),
			_elm_lang$core$Json_Decode$keyValuePairs(valueDecoder));
	});
var _elm_community$json_extra$Json_Decode_Extra$set = function (decoder) {
	return A2(
		_elm_lang$core$Json_Decode$map,
		_elm_lang$core$Set$fromList,
		_elm_lang$core$Json_Decode$list(decoder));
};
var _elm_community$json_extra$Json_Decode_Extra$date = A2(
	_elm_lang$core$Json_Decode$andThen,
	function (_p10) {
		return _elm_community$json_extra$Json_Decode_Extra$fromResult(
			_elm_lang$core$Date$fromString(_p10));
	},
	_elm_lang$core$Json_Decode$string);
var _elm_community$json_extra$Json_Decode_Extra$andMap = _elm_lang$core$Json_Decode$map2(
	F2(
		function (x, y) {
			return y(x);
		}));
var _elm_community$json_extra$Json_Decode_Extra_ops = _elm_community$json_extra$Json_Decode_Extra_ops || {};
_elm_community$json_extra$Json_Decode_Extra_ops['|:'] = _elm_lang$core$Basics$flip(_elm_community$json_extra$Json_Decode_Extra$andMap);

var _elm_community$json_extra$Json_Encode_Extra$dict = F3(
	function (toKey, toValue, dict) {
		return _elm_lang$core$Json_Encode$object(
			A2(
				_elm_lang$core$List$map,
				function (_p0) {
					var _p1 = _p0;
					return {
						ctor: '_Tuple2',
						_0: toKey(_p1._0),
						_1: toValue(_p1._1)
					};
				},
				_elm_lang$core$Dict$toList(dict)));
	});
var _elm_community$json_extra$Json_Encode_Extra$maybe = function (encoder) {
	return function (_p2) {
		return A2(
			_elm_lang$core$Maybe$withDefault,
			_elm_lang$core$Json_Encode$null,
			A2(_elm_lang$core$Maybe$map, encoder, _p2));
	};
};

var _elm_community$list_extra$List_Extra$greedyGroupsOfWithStep = F3(
	function (size, step, xs) {
		var okayXs = _elm_lang$core$Native_Utils.cmp(
			_elm_lang$core$List$length(xs),
			0) > 0;
		var okayArgs = (_elm_lang$core$Native_Utils.cmp(size, 0) > 0) && (_elm_lang$core$Native_Utils.cmp(step, 0) > 0);
		var xs_ = A2(_elm_lang$core$List$drop, step, xs);
		var group = A2(_elm_lang$core$List$take, size, xs);
		return (okayArgs && okayXs) ? {
			ctor: '::',
			_0: group,
			_1: A3(_elm_community$list_extra$List_Extra$greedyGroupsOfWithStep, size, step, xs_)
		} : {ctor: '[]'};
	});
var _elm_community$list_extra$List_Extra$greedyGroupsOf = F2(
	function (size, xs) {
		return A3(_elm_community$list_extra$List_Extra$greedyGroupsOfWithStep, size, size, xs);
	});
var _elm_community$list_extra$List_Extra$groupsOfWithStep = F3(
	function (size, step, xs) {
		var okayArgs = (_elm_lang$core$Native_Utils.cmp(size, 0) > 0) && (_elm_lang$core$Native_Utils.cmp(step, 0) > 0);
		var xs_ = A2(_elm_lang$core$List$drop, step, xs);
		var group = A2(_elm_lang$core$List$take, size, xs);
		var okayLength = _elm_lang$core$Native_Utils.eq(
			size,
			_elm_lang$core$List$length(group));
		return (okayArgs && okayLength) ? {
			ctor: '::',
			_0: group,
			_1: A3(_elm_community$list_extra$List_Extra$groupsOfWithStep, size, step, xs_)
		} : {ctor: '[]'};
	});
var _elm_community$list_extra$List_Extra$groupsOf = F2(
	function (size, xs) {
		return A3(_elm_community$list_extra$List_Extra$groupsOfWithStep, size, size, xs);
	});
var _elm_community$list_extra$List_Extra$zip5 = _elm_lang$core$List$map5(
	F5(
		function (v0, v1, v2, v3, v4) {
			return {ctor: '_Tuple5', _0: v0, _1: v1, _2: v2, _3: v3, _4: v4};
		}));
var _elm_community$list_extra$List_Extra$zip4 = _elm_lang$core$List$map4(
	F4(
		function (v0, v1, v2, v3) {
			return {ctor: '_Tuple4', _0: v0, _1: v1, _2: v2, _3: v3};
		}));
var _elm_community$list_extra$List_Extra$zip3 = _elm_lang$core$List$map3(
	F3(
		function (v0, v1, v2) {
			return {ctor: '_Tuple3', _0: v0, _1: v1, _2: v2};
		}));
var _elm_community$list_extra$List_Extra$zip = _elm_lang$core$List$map2(
	F2(
		function (v0, v1) {
			return {ctor: '_Tuple2', _0: v0, _1: v1};
		}));
var _elm_community$list_extra$List_Extra$isPrefixOf = F2(
	function (prefix, xs) {
		var _p0 = {ctor: '_Tuple2', _0: prefix, _1: xs};
		if (_p0._0.ctor === '[]') {
			return true;
		} else {
			if (_p0._1.ctor === '[]') {
				return false;
			} else {
				return _elm_lang$core$Native_Utils.eq(_p0._0._0, _p0._1._0) && A2(_elm_community$list_extra$List_Extra$isPrefixOf, _p0._0._1, _p0._1._1);
			}
		}
	});
var _elm_community$list_extra$List_Extra$isSuffixOf = F2(
	function (suffix, xs) {
		return A2(
			_elm_community$list_extra$List_Extra$isPrefixOf,
			_elm_lang$core$List$reverse(suffix),
			_elm_lang$core$List$reverse(xs));
	});
var _elm_community$list_extra$List_Extra$selectSplit = function (xs) {
	var _p1 = xs;
	if (_p1.ctor === '[]') {
		return {ctor: '[]'};
	} else {
		var _p5 = _p1._1;
		var _p4 = _p1._0;
		return {
			ctor: '::',
			_0: {
				ctor: '_Tuple3',
				_0: {ctor: '[]'},
				_1: _p4,
				_2: _p5
			},
			_1: A2(
				_elm_lang$core$List$map,
				function (_p2) {
					var _p3 = _p2;
					return {
						ctor: '_Tuple3',
						_0: {ctor: '::', _0: _p4, _1: _p3._0},
						_1: _p3._1,
						_2: _p3._2
					};
				},
				_elm_community$list_extra$List_Extra$selectSplit(_p5))
		};
	}
};
var _elm_community$list_extra$List_Extra$select = function (xs) {
	var _p6 = xs;
	if (_p6.ctor === '[]') {
		return {ctor: '[]'};
	} else {
		var _p10 = _p6._1;
		var _p9 = _p6._0;
		return {
			ctor: '::',
			_0: {ctor: '_Tuple2', _0: _p9, _1: _p10},
			_1: A2(
				_elm_lang$core$List$map,
				function (_p7) {
					var _p8 = _p7;
					return {
						ctor: '_Tuple2',
						_0: _p8._0,
						_1: {ctor: '::', _0: _p9, _1: _p8._1}
					};
				},
				_elm_community$list_extra$List_Extra$select(_p10))
		};
	}
};
var _elm_community$list_extra$List_Extra$tailsHelp = F2(
	function (e, list) {
		var _p11 = list;
		if (_p11.ctor === '::') {
			var _p12 = _p11._0;
			return {
				ctor: '::',
				_0: {ctor: '::', _0: e, _1: _p12},
				_1: {ctor: '::', _0: _p12, _1: _p11._1}
			};
		} else {
			return {ctor: '[]'};
		}
	});
var _elm_community$list_extra$List_Extra$tails = A2(
	_elm_lang$core$List$foldr,
	_elm_community$list_extra$List_Extra$tailsHelp,
	{
		ctor: '::',
		_0: {ctor: '[]'},
		_1: {ctor: '[]'}
	});
var _elm_community$list_extra$List_Extra$isInfixOf = F2(
	function (infix, xs) {
		return A2(
			_elm_lang$core$List$any,
			_elm_community$list_extra$List_Extra$isPrefixOf(infix),
			_elm_community$list_extra$List_Extra$tails(xs));
	});
var _elm_community$list_extra$List_Extra$inits = A2(
	_elm_lang$core$List$foldr,
	F2(
		function (e, acc) {
			return {
				ctor: '::',
				_0: {ctor: '[]'},
				_1: A2(
					_elm_lang$core$List$map,
					F2(
						function (x, y) {
							return {ctor: '::', _0: x, _1: y};
						})(e),
					acc)
			};
		}),
	{
		ctor: '::',
		_0: {ctor: '[]'},
		_1: {ctor: '[]'}
	});
var _elm_community$list_extra$List_Extra$groupWhileTransitively = F2(
	function (cmp, xs_) {
		var _p13 = xs_;
		if (_p13.ctor === '[]') {
			return {ctor: '[]'};
		} else {
			if (_p13._1.ctor === '[]') {
				return {
					ctor: '::',
					_0: {
						ctor: '::',
						_0: _p13._0,
						_1: {ctor: '[]'}
					},
					_1: {ctor: '[]'}
				};
			} else {
				var _p15 = _p13._0;
				var _p14 = A2(_elm_community$list_extra$List_Extra$groupWhileTransitively, cmp, _p13._1);
				if (_p14.ctor === '::') {
					return A2(cmp, _p15, _p13._1._0) ? {
						ctor: '::',
						_0: {ctor: '::', _0: _p15, _1: _p14._0},
						_1: _p14._1
					} : {
						ctor: '::',
						_0: {
							ctor: '::',
							_0: _p15,
							_1: {ctor: '[]'}
						},
						_1: _p14
					};
				} else {
					return {ctor: '[]'};
				}
			}
		}
	});
var _elm_community$list_extra$List_Extra$stripPrefix = F2(
	function (prefix, xs) {
		var step = F2(
			function (e, m) {
				var _p16 = m;
				if (_p16.ctor === 'Nothing') {
					return _elm_lang$core$Maybe$Nothing;
				} else {
					if (_p16._0.ctor === '[]') {
						return _elm_lang$core$Maybe$Nothing;
					} else {
						return _elm_lang$core$Native_Utils.eq(e, _p16._0._0) ? _elm_lang$core$Maybe$Just(_p16._0._1) : _elm_lang$core$Maybe$Nothing;
					}
				}
			});
		return A3(
			_elm_lang$core$List$foldl,
			step,
			_elm_lang$core$Maybe$Just(xs),
			prefix);
	});
var _elm_community$list_extra$List_Extra$dropWhileRight = function (p) {
	return A2(
		_elm_lang$core$List$foldr,
		F2(
			function (x, xs) {
				return (p(x) && _elm_lang$core$List$isEmpty(xs)) ? {ctor: '[]'} : {ctor: '::', _0: x, _1: xs};
			}),
		{ctor: '[]'});
};
var _elm_community$list_extra$List_Extra$takeWhileRight = function (p) {
	var step = F2(
		function (x, _p17) {
			var _p18 = _p17;
			var _p19 = _p18._0;
			return (p(x) && _p18._1) ? {
				ctor: '_Tuple2',
				_0: {ctor: '::', _0: x, _1: _p19},
				_1: true
			} : {ctor: '_Tuple2', _0: _p19, _1: false};
		});
	return function (_p20) {
		return _elm_lang$core$Tuple$first(
			A3(
				_elm_lang$core$List$foldr,
				step,
				{
					ctor: '_Tuple2',
					_0: {ctor: '[]'},
					_1: true
				},
				_p20));
	};
};
var _elm_community$list_extra$List_Extra$splitAt = F2(
	function (n, xs) {
		return {
			ctor: '_Tuple2',
			_0: A2(_elm_lang$core$List$take, n, xs),
			_1: A2(_elm_lang$core$List$drop, n, xs)
		};
	});
var _elm_community$list_extra$List_Extra$groupsOfVarying_ = F3(
	function (listOflengths, list, accu) {
		groupsOfVarying_:
		while (true) {
			var _p21 = {ctor: '_Tuple2', _0: listOflengths, _1: list};
			if (((_p21.ctor === '_Tuple2') && (_p21._0.ctor === '::')) && (_p21._1.ctor === '::')) {
				var _p22 = A2(_elm_community$list_extra$List_Extra$splitAt, _p21._0._0, list);
				var head = _p22._0;
				var tail = _p22._1;
				var _v11 = _p21._0._1,
					_v12 = tail,
					_v13 = {ctor: '::', _0: head, _1: accu};
				listOflengths = _v11;
				list = _v12;
				accu = _v13;
				continue groupsOfVarying_;
			} else {
				return _elm_lang$core$List$reverse(accu);
			}
		}
	});
var _elm_community$list_extra$List_Extra$groupsOfVarying = F2(
	function (listOflengths, list) {
		return A3(
			_elm_community$list_extra$List_Extra$groupsOfVarying_,
			listOflengths,
			list,
			{ctor: '[]'});
	});
var _elm_community$list_extra$List_Extra$unfoldr = F2(
	function (f, seed) {
		var _p23 = f(seed);
		if (_p23.ctor === 'Nothing') {
			return {ctor: '[]'};
		} else {
			return {
				ctor: '::',
				_0: _p23._0._0,
				_1: A2(_elm_community$list_extra$List_Extra$unfoldr, f, _p23._0._1)
			};
		}
	});
var _elm_community$list_extra$List_Extra$scanr1 = F2(
	function (f, xs_) {
		var _p24 = xs_;
		if (_p24.ctor === '[]') {
			return {ctor: '[]'};
		} else {
			if (_p24._1.ctor === '[]') {
				return {
					ctor: '::',
					_0: _p24._0,
					_1: {ctor: '[]'}
				};
			} else {
				var _p25 = A2(_elm_community$list_extra$List_Extra$scanr1, f, _p24._1);
				if (_p25.ctor === '::') {
					return {
						ctor: '::',
						_0: A2(f, _p24._0, _p25._0),
						_1: _p25
					};
				} else {
					return {ctor: '[]'};
				}
			}
		}
	});
var _elm_community$list_extra$List_Extra$scanr = F3(
	function (f, acc, xs_) {
		var _p26 = xs_;
		if (_p26.ctor === '[]') {
			return {
				ctor: '::',
				_0: acc,
				_1: {ctor: '[]'}
			};
		} else {
			var _p27 = A3(_elm_community$list_extra$List_Extra$scanr, f, acc, _p26._1);
			if (_p27.ctor === '::') {
				return {
					ctor: '::',
					_0: A2(f, _p26._0, _p27._0),
					_1: _p27
				};
			} else {
				return {ctor: '[]'};
			}
		}
	});
var _elm_community$list_extra$List_Extra$scanl1 = F2(
	function (f, xs_) {
		var _p28 = xs_;
		if (_p28.ctor === '[]') {
			return {ctor: '[]'};
		} else {
			return A3(_elm_lang$core$List$scanl, f, _p28._0, _p28._1);
		}
	});
var _elm_community$list_extra$List_Extra$indexedFoldr = F3(
	function (func, acc, list) {
		var step = F2(
			function (x, _p29) {
				var _p30 = _p29;
				var _p31 = _p30._0;
				return {
					ctor: '_Tuple2',
					_0: _p31 - 1,
					_1: A3(func, _p31, x, _p30._1)
				};
			});
		return _elm_lang$core$Tuple$second(
			A3(
				_elm_lang$core$List$foldr,
				step,
				{
					ctor: '_Tuple2',
					_0: _elm_lang$core$List$length(list) - 1,
					_1: acc
				},
				list));
	});
var _elm_community$list_extra$List_Extra$indexedFoldl = F3(
	function (func, acc, list) {
		var step = F2(
			function (x, _p32) {
				var _p33 = _p32;
				var _p34 = _p33._0;
				return {
					ctor: '_Tuple2',
					_0: _p34 + 1,
					_1: A3(func, _p34, x, _p33._1)
				};
			});
		return _elm_lang$core$Tuple$second(
			A3(
				_elm_lang$core$List$foldl,
				step,
				{ctor: '_Tuple2', _0: 0, _1: acc},
				list));
	});
var _elm_community$list_extra$List_Extra$foldr1 = F2(
	function (f, xs) {
		var mf = F2(
			function (x, m) {
				return _elm_lang$core$Maybe$Just(
					function () {
						var _p35 = m;
						if (_p35.ctor === 'Nothing') {
							return x;
						} else {
							return A2(f, x, _p35._0);
						}
					}());
			});
		return A3(_elm_lang$core$List$foldr, mf, _elm_lang$core$Maybe$Nothing, xs);
	});
var _elm_community$list_extra$List_Extra$foldl1 = F2(
	function (f, xs) {
		var mf = F2(
			function (x, m) {
				return _elm_lang$core$Maybe$Just(
					function () {
						var _p36 = m;
						if (_p36.ctor === 'Nothing') {
							return x;
						} else {
							return A2(f, _p36._0, x);
						}
					}());
			});
		return A3(_elm_lang$core$List$foldl, mf, _elm_lang$core$Maybe$Nothing, xs);
	});
var _elm_community$list_extra$List_Extra$interweaveHelp = F3(
	function (l1, l2, acc) {
		interweaveHelp:
		while (true) {
			var _p37 = {ctor: '_Tuple2', _0: l1, _1: l2};
			_v24_1:
			do {
				if (_p37._0.ctor === '::') {
					if (_p37._1.ctor === '::') {
						var _v25 = _p37._0._1,
							_v26 = _p37._1._1,
							_v27 = A2(
							_elm_lang$core$Basics_ops['++'],
							acc,
							{
								ctor: '::',
								_0: _p37._0._0,
								_1: {
									ctor: '::',
									_0: _p37._1._0,
									_1: {ctor: '[]'}
								}
							});
						l1 = _v25;
						l2 = _v26;
						acc = _v27;
						continue interweaveHelp;
					} else {
						break _v24_1;
					}
				} else {
					if (_p37._1.ctor === '[]') {
						break _v24_1;
					} else {
						return A2(_elm_lang$core$Basics_ops['++'], acc, _p37._1);
					}
				}
			} while(false);
			return A2(_elm_lang$core$Basics_ops['++'], acc, _p37._0);
		}
	});
var _elm_community$list_extra$List_Extra$interweave = F2(
	function (l1, l2) {
		return A3(
			_elm_community$list_extra$List_Extra$interweaveHelp,
			l1,
			l2,
			{ctor: '[]'});
	});
var _elm_community$list_extra$List_Extra$permutations = function (xs_) {
	var _p38 = xs_;
	if (_p38.ctor === '[]') {
		return {
			ctor: '::',
			_0: {ctor: '[]'},
			_1: {ctor: '[]'}
		};
	} else {
		var f = function (_p39) {
			var _p40 = _p39;
			return A2(
				_elm_lang$core$List$map,
				F2(
					function (x, y) {
						return {ctor: '::', _0: x, _1: y};
					})(_p40._0),
				_elm_community$list_extra$List_Extra$permutations(_p40._1));
		};
		return A2(
			_elm_lang$core$List$concatMap,
			f,
			_elm_community$list_extra$List_Extra$select(_p38));
	}
};
var _elm_community$list_extra$List_Extra$isPermutationOf = F2(
	function (permut, xs) {
		return A2(
			_elm_lang$core$List$member,
			permut,
			_elm_community$list_extra$List_Extra$permutations(xs));
	});
var _elm_community$list_extra$List_Extra$subsequencesNonEmpty = function (xs) {
	var _p41 = xs;
	if (_p41.ctor === '[]') {
		return {ctor: '[]'};
	} else {
		var _p42 = _p41._0;
		var f = F2(
			function (ys, r) {
				return {
					ctor: '::',
					_0: ys,
					_1: {
						ctor: '::',
						_0: {ctor: '::', _0: _p42, _1: ys},
						_1: r
					}
				};
			});
		return {
			ctor: '::',
			_0: {
				ctor: '::',
				_0: _p42,
				_1: {ctor: '[]'}
			},
			_1: A3(
				_elm_lang$core$List$foldr,
				f,
				{ctor: '[]'},
				_elm_community$list_extra$List_Extra$subsequencesNonEmpty(_p41._1))
		};
	}
};
var _elm_community$list_extra$List_Extra$subsequences = function (xs) {
	return {
		ctor: '::',
		_0: {ctor: '[]'},
		_1: _elm_community$list_extra$List_Extra$subsequencesNonEmpty(xs)
	};
};
var _elm_community$list_extra$List_Extra$isSubsequenceOf = F2(
	function (subseq, xs) {
		return A2(
			_elm_lang$core$List$member,
			subseq,
			_elm_community$list_extra$List_Extra$subsequences(xs));
	});
var _elm_community$list_extra$List_Extra$transpose = function (ll) {
	transpose:
	while (true) {
		var _p43 = ll;
		if (_p43.ctor === '[]') {
			return {ctor: '[]'};
		} else {
			if (_p43._0.ctor === '[]') {
				var _v32 = _p43._1;
				ll = _v32;
				continue transpose;
			} else {
				var _p44 = _p43._1;
				var tails = A2(_elm_lang$core$List$filterMap, _elm_lang$core$List$tail, _p44);
				var heads = A2(_elm_lang$core$List$filterMap, _elm_lang$core$List$head, _p44);
				return {
					ctor: '::',
					_0: {ctor: '::', _0: _p43._0._0, _1: heads},
					_1: _elm_community$list_extra$List_Extra$transpose(
						{ctor: '::', _0: _p43._0._1, _1: tails})
				};
			}
		}
	}
};
var _elm_community$list_extra$List_Extra$intercalate = function (xs) {
	return function (_p45) {
		return _elm_lang$core$List$concat(
			A2(_elm_lang$core$List$intersperse, xs, _p45));
	};
};
var _elm_community$list_extra$List_Extra$filterNot = F2(
	function (pred, list) {
		return A2(
			_elm_lang$core$List$filter,
			function (_p46) {
				return !pred(_p46);
			},
			list);
	});
var _elm_community$list_extra$List_Extra$removeAt = F2(
	function (index, l) {
		if (_elm_lang$core$Native_Utils.cmp(index, 0) < 0) {
			return l;
		} else {
			var tail = _elm_lang$core$List$tail(
				A2(_elm_lang$core$List$drop, index, l));
			var head = A2(_elm_lang$core$List$take, index, l);
			var _p47 = tail;
			if (_p47.ctor === 'Nothing') {
				return l;
			} else {
				return A2(_elm_lang$core$List$append, head, _p47._0);
			}
		}
	});
var _elm_community$list_extra$List_Extra$stableSortWith = F2(
	function (pred, list) {
		var predWithIndex = F2(
			function (_p49, _p48) {
				var _p50 = _p49;
				var _p51 = _p48;
				var result = A2(pred, _p50._0, _p51._0);
				var _p52 = result;
				if (_p52.ctor === 'EQ') {
					return A2(_elm_lang$core$Basics$compare, _p50._1, _p51._1);
				} else {
					return result;
				}
			});
		var listWithIndex = A2(
			_elm_lang$core$List$indexedMap,
			F2(
				function (i, a) {
					return {ctor: '_Tuple2', _0: a, _1: i};
				}),
			list);
		return A2(
			_elm_lang$core$List$map,
			_elm_lang$core$Tuple$first,
			A2(_elm_lang$core$List$sortWith, predWithIndex, listWithIndex));
	});
var _elm_community$list_extra$List_Extra$setAt = F3(
	function (index, value, l) {
		if (_elm_lang$core$Native_Utils.cmp(index, 0) < 0) {
			return _elm_lang$core$Maybe$Nothing;
		} else {
			var tail = _elm_lang$core$List$tail(
				A2(_elm_lang$core$List$drop, index, l));
			var head = A2(_elm_lang$core$List$take, index, l);
			var _p53 = tail;
			if (_p53.ctor === 'Nothing') {
				return _elm_lang$core$Maybe$Nothing;
			} else {
				return _elm_lang$core$Maybe$Just(
					A2(
						_elm_lang$core$List$append,
						head,
						{ctor: '::', _0: value, _1: _p53._0}));
			}
		}
	});
var _elm_community$list_extra$List_Extra$remove = F2(
	function (x, xs) {
		var _p54 = xs;
		if (_p54.ctor === '[]') {
			return {ctor: '[]'};
		} else {
			var _p56 = _p54._1;
			var _p55 = _p54._0;
			return _elm_lang$core$Native_Utils.eq(x, _p55) ? _p56 : {
				ctor: '::',
				_0: _p55,
				_1: A2(_elm_community$list_extra$List_Extra$remove, x, _p56)
			};
		}
	});
var _elm_community$list_extra$List_Extra$updateIfIndex = F3(
	function (predicate, update, list) {
		return A2(
			_elm_lang$core$List$indexedMap,
			F2(
				function (i, x) {
					return predicate(i) ? update(x) : x;
				}),
			list);
	});
var _elm_community$list_extra$List_Extra$updateAt = F3(
	function (index, update, list) {
		return ((_elm_lang$core$Native_Utils.cmp(index, 0) < 0) || (_elm_lang$core$Native_Utils.cmp(
			index,
			_elm_lang$core$List$length(list)) > -1)) ? _elm_lang$core$Maybe$Nothing : _elm_lang$core$Maybe$Just(
			A3(
				_elm_community$list_extra$List_Extra$updateIfIndex,
				F2(
					function (x, y) {
						return _elm_lang$core$Native_Utils.eq(x, y);
					})(index),
				update,
				list));
	});
var _elm_community$list_extra$List_Extra$updateIf = F3(
	function (predicate, update, list) {
		return A2(
			_elm_lang$core$List$map,
			function (item) {
				return predicate(item) ? update(item) : item;
			},
			list);
	});
var _elm_community$list_extra$List_Extra$replaceIf = F3(
	function (predicate, replacement, list) {
		return A3(
			_elm_community$list_extra$List_Extra$updateIf,
			predicate,
			_elm_lang$core$Basics$always(replacement),
			list);
	});
var _elm_community$list_extra$List_Extra$findIndices = function (p) {
	return function (_p57) {
		return A2(
			_elm_lang$core$List$map,
			_elm_lang$core$Tuple$first,
			A2(
				_elm_lang$core$List$filter,
				function (_p58) {
					var _p59 = _p58;
					return p(_p59._1);
				},
				A2(
					_elm_lang$core$List$indexedMap,
					F2(
						function (v0, v1) {
							return {ctor: '_Tuple2', _0: v0, _1: v1};
						}),
					_p57)));
	};
};
var _elm_community$list_extra$List_Extra$findIndex = function (p) {
	return function (_p60) {
		return _elm_lang$core$List$head(
			A2(_elm_community$list_extra$List_Extra$findIndices, p, _p60));
	};
};
var _elm_community$list_extra$List_Extra$splitWhen = F2(
	function (predicate, list) {
		return A2(
			_elm_lang$core$Maybe$map,
			function (i) {
				return A2(_elm_community$list_extra$List_Extra$splitAt, i, list);
			},
			A2(_elm_community$list_extra$List_Extra$findIndex, predicate, list));
	});
var _elm_community$list_extra$List_Extra$elemIndices = function (x) {
	return _elm_community$list_extra$List_Extra$findIndices(
		F2(
			function (x, y) {
				return _elm_lang$core$Native_Utils.eq(x, y);
			})(x));
};
var _elm_community$list_extra$List_Extra$elemIndex = function (x) {
	return _elm_community$list_extra$List_Extra$findIndex(
		F2(
			function (x, y) {
				return _elm_lang$core$Native_Utils.eq(x, y);
			})(x));
};
var _elm_community$list_extra$List_Extra$find = F2(
	function (predicate, list) {
		find:
		while (true) {
			var _p61 = list;
			if (_p61.ctor === '[]') {
				return _elm_lang$core$Maybe$Nothing;
			} else {
				var _p62 = _p61._0;
				if (predicate(_p62)) {
					return _elm_lang$core$Maybe$Just(_p62);
				} else {
					var _v41 = predicate,
						_v42 = _p61._1;
					predicate = _v41;
					list = _v42;
					continue find;
				}
			}
		}
	});
var _elm_community$list_extra$List_Extra$notMember = function (x) {
	return function (_p63) {
		return !A2(_elm_lang$core$List$member, x, _p63);
	};
};
var _elm_community$list_extra$List_Extra$andThen = _elm_lang$core$List$concatMap;
var _elm_community$list_extra$List_Extra$lift2 = F3(
	function (f, la, lb) {
		return A2(
			_elm_community$list_extra$List_Extra$andThen,
			function (a) {
				return A2(
					_elm_community$list_extra$List_Extra$andThen,
					function (b) {
						return {
							ctor: '::',
							_0: A2(f, a, b),
							_1: {ctor: '[]'}
						};
					},
					lb);
			},
			la);
	});
var _elm_community$list_extra$List_Extra$lift3 = F4(
	function (f, la, lb, lc) {
		return A2(
			_elm_community$list_extra$List_Extra$andThen,
			function (a) {
				return A2(
					_elm_community$list_extra$List_Extra$andThen,
					function (b) {
						return A2(
							_elm_community$list_extra$List_Extra$andThen,
							function (c) {
								return {
									ctor: '::',
									_0: A3(f, a, b, c),
									_1: {ctor: '[]'}
								};
							},
							lc);
					},
					lb);
			},
			la);
	});
var _elm_community$list_extra$List_Extra$lift4 = F5(
	function (f, la, lb, lc, ld) {
		return A2(
			_elm_community$list_extra$List_Extra$andThen,
			function (a) {
				return A2(
					_elm_community$list_extra$List_Extra$andThen,
					function (b) {
						return A2(
							_elm_community$list_extra$List_Extra$andThen,
							function (c) {
								return A2(
									_elm_community$list_extra$List_Extra$andThen,
									function (d) {
										return {
											ctor: '::',
											_0: A4(f, a, b, c, d),
											_1: {ctor: '[]'}
										};
									},
									ld);
							},
							lc);
					},
					lb);
			},
			la);
	});
var _elm_community$list_extra$List_Extra$andMap = F2(
	function (l, fl) {
		return A3(
			_elm_lang$core$List$map2,
			F2(
				function (x, y) {
					return x(y);
				}),
			fl,
			l);
	});
var _elm_community$list_extra$List_Extra$uniqueHelp = F3(
	function (f, existing, remaining) {
		uniqueHelp:
		while (true) {
			var _p64 = remaining;
			if (_p64.ctor === '[]') {
				return {ctor: '[]'};
			} else {
				var _p66 = _p64._1;
				var _p65 = _p64._0;
				var computedFirst = f(_p65);
				if (A2(_elm_lang$core$Set$member, computedFirst, existing)) {
					var _v44 = f,
						_v45 = existing,
						_v46 = _p66;
					f = _v44;
					existing = _v45;
					remaining = _v46;
					continue uniqueHelp;
				} else {
					return {
						ctor: '::',
						_0: _p65,
						_1: A3(
							_elm_community$list_extra$List_Extra$uniqueHelp,
							f,
							A2(_elm_lang$core$Set$insert, computedFirst, existing),
							_p66)
					};
				}
			}
		}
	});
var _elm_community$list_extra$List_Extra$uniqueBy = F2(
	function (f, list) {
		return A3(_elm_community$list_extra$List_Extra$uniqueHelp, f, _elm_lang$core$Set$empty, list);
	});
var _elm_community$list_extra$List_Extra$allDifferentBy = F2(
	function (f, list) {
		return _elm_lang$core$Native_Utils.eq(
			_elm_lang$core$List$length(list),
			_elm_lang$core$List$length(
				A2(_elm_community$list_extra$List_Extra$uniqueBy, f, list)));
	});
var _elm_community$list_extra$List_Extra$allDifferent = function (list) {
	return A2(_elm_community$list_extra$List_Extra$allDifferentBy, _elm_lang$core$Basics$identity, list);
};
var _elm_community$list_extra$List_Extra$unique = function (list) {
	return A3(_elm_community$list_extra$List_Extra$uniqueHelp, _elm_lang$core$Basics$identity, _elm_lang$core$Set$empty, list);
};
var _elm_community$list_extra$List_Extra$dropWhile = F2(
	function (predicate, list) {
		dropWhile:
		while (true) {
			var _p67 = list;
			if (_p67.ctor === '[]') {
				return {ctor: '[]'};
			} else {
				if (predicate(_p67._0)) {
					var _v48 = predicate,
						_v49 = _p67._1;
					predicate = _v48;
					list = _v49;
					continue dropWhile;
				} else {
					return list;
				}
			}
		}
	});
var _elm_community$list_extra$List_Extra$takeWhile = function (predicate) {
	var takeWhileMemo = F2(
		function (memo, list) {
			takeWhileMemo:
			while (true) {
				var _p68 = list;
				if (_p68.ctor === '[]') {
					return _elm_lang$core$List$reverse(memo);
				} else {
					var _p69 = _p68._0;
					if (predicate(_p69)) {
						var _v51 = {ctor: '::', _0: _p69, _1: memo},
							_v52 = _p68._1;
						memo = _v51;
						list = _v52;
						continue takeWhileMemo;
					} else {
						return _elm_lang$core$List$reverse(memo);
					}
				}
			}
		});
	return takeWhileMemo(
		{ctor: '[]'});
};
var _elm_community$list_extra$List_Extra$span = F2(
	function (p, xs) {
		return {
			ctor: '_Tuple2',
			_0: A2(_elm_community$list_extra$List_Extra$takeWhile, p, xs),
			_1: A2(_elm_community$list_extra$List_Extra$dropWhile, p, xs)
		};
	});
var _elm_community$list_extra$List_Extra$break = function (p) {
	return _elm_community$list_extra$List_Extra$span(
		function (_p70) {
			return !p(_p70);
		});
};
var _elm_community$list_extra$List_Extra$groupWhile = F2(
	function (eq, xs_) {
		var _p71 = xs_;
		if (_p71.ctor === '[]') {
			return {ctor: '[]'};
		} else {
			var _p73 = _p71._0;
			var _p72 = A2(
				_elm_community$list_extra$List_Extra$span,
				eq(_p73),
				_p71._1);
			var ys = _p72._0;
			var zs = _p72._1;
			return {
				ctor: '::',
				_0: {ctor: '::', _0: _p73, _1: ys},
				_1: A2(_elm_community$list_extra$List_Extra$groupWhile, eq, zs)
			};
		}
	});
var _elm_community$list_extra$List_Extra$group = _elm_community$list_extra$List_Extra$groupWhile(
	F2(
		function (x, y) {
			return _elm_lang$core$Native_Utils.eq(x, y);
		}));
var _elm_community$list_extra$List_Extra$minimumBy = F2(
	function (f, ls) {
		var minBy = F2(
			function (x, _p74) {
				var _p75 = _p74;
				var _p76 = _p75._1;
				var fx = f(x);
				return (_elm_lang$core$Native_Utils.cmp(fx, _p76) < 0) ? {ctor: '_Tuple2', _0: x, _1: fx} : {ctor: '_Tuple2', _0: _p75._0, _1: _p76};
			});
		var _p77 = ls;
		if (_p77.ctor === '::') {
			if (_p77._1.ctor === '[]') {
				return _elm_lang$core$Maybe$Just(_p77._0);
			} else {
				var _p78 = _p77._0;
				return _elm_lang$core$Maybe$Just(
					_elm_lang$core$Tuple$first(
						A3(
							_elm_lang$core$List$foldl,
							minBy,
							{
								ctor: '_Tuple2',
								_0: _p78,
								_1: f(_p78)
							},
							_p77._1)));
			}
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _elm_community$list_extra$List_Extra$maximumBy = F2(
	function (f, ls) {
		var maxBy = F2(
			function (x, _p79) {
				var _p80 = _p79;
				var _p81 = _p80._1;
				var fx = f(x);
				return (_elm_lang$core$Native_Utils.cmp(fx, _p81) > 0) ? {ctor: '_Tuple2', _0: x, _1: fx} : {ctor: '_Tuple2', _0: _p80._0, _1: _p81};
			});
		var _p82 = ls;
		if (_p82.ctor === '::') {
			if (_p82._1.ctor === '[]') {
				return _elm_lang$core$Maybe$Just(_p82._0);
			} else {
				var _p83 = _p82._0;
				return _elm_lang$core$Maybe$Just(
					_elm_lang$core$Tuple$first(
						A3(
							_elm_lang$core$List$foldl,
							maxBy,
							{
								ctor: '_Tuple2',
								_0: _p83,
								_1: f(_p83)
							},
							_p82._1)));
			}
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _elm_community$list_extra$List_Extra$uncons = function (xs) {
	var _p84 = xs;
	if (_p84.ctor === '[]') {
		return _elm_lang$core$Maybe$Nothing;
	} else {
		return _elm_lang$core$Maybe$Just(
			{ctor: '_Tuple2', _0: _p84._0, _1: _p84._1});
	}
};
var _elm_community$list_extra$List_Extra$swapAt = F3(
	function (index1, index2, l) {
		swapAt:
		while (true) {
			if (_elm_lang$core$Native_Utils.eq(index1, index2)) {
				return _elm_lang$core$Maybe$Just(l);
			} else {
				if (_elm_lang$core$Native_Utils.cmp(index1, index2) > 0) {
					var _v59 = index2,
						_v60 = index1,
						_v61 = l;
					index1 = _v59;
					index2 = _v60;
					l = _v61;
					continue swapAt;
				} else {
					if (_elm_lang$core$Native_Utils.cmp(index1, 0) < 0) {
						return _elm_lang$core$Maybe$Nothing;
					} else {
						var _p85 = A2(_elm_community$list_extra$List_Extra$splitAt, index1, l);
						var part1 = _p85._0;
						var tail1 = _p85._1;
						var _p86 = A2(_elm_community$list_extra$List_Extra$splitAt, index2 - index1, tail1);
						var head2 = _p86._0;
						var tail2 = _p86._1;
						return A3(
							_elm_lang$core$Maybe$map2,
							F2(
								function (_p88, _p87) {
									var _p89 = _p88;
									var _p90 = _p87;
									return _elm_lang$core$List$concat(
										{
											ctor: '::',
											_0: part1,
											_1: {
												ctor: '::',
												_0: {ctor: '::', _0: _p90._0, _1: _p89._1},
												_1: {
													ctor: '::',
													_0: {ctor: '::', _0: _p89._0, _1: _p90._1},
													_1: {ctor: '[]'}
												}
											}
										});
								}),
							_elm_community$list_extra$List_Extra$uncons(head2),
							_elm_community$list_extra$List_Extra$uncons(tail2));
					}
				}
			}
		}
	});
var _elm_community$list_extra$List_Extra$iterate = F2(
	function (f, x) {
		var _p91 = f(x);
		if (_p91.ctor === 'Just') {
			return {
				ctor: '::',
				_0: x,
				_1: A2(_elm_community$list_extra$List_Extra$iterate, f, _p91._0)
			};
		} else {
			return {
				ctor: '::',
				_0: x,
				_1: {ctor: '[]'}
			};
		}
	});
var _elm_community$list_extra$List_Extra$getAt = F2(
	function (idx, xs) {
		return (_elm_lang$core$Native_Utils.cmp(idx, 0) < 0) ? _elm_lang$core$Maybe$Nothing : _elm_lang$core$List$head(
			A2(_elm_lang$core$List$drop, idx, xs));
	});
var _elm_community$list_extra$List_Extra_ops = _elm_community$list_extra$List_Extra_ops || {};
_elm_community$list_extra$List_Extra_ops['!!'] = _elm_lang$core$Basics$flip(_elm_community$list_extra$List_Extra$getAt);
var _elm_community$list_extra$List_Extra$init = function () {
	var maybe = F2(
		function (d, f) {
			return function (_p92) {
				return A2(
					_elm_lang$core$Maybe$withDefault,
					d,
					A2(_elm_lang$core$Maybe$map, f, _p92));
			};
		});
	return A2(
		_elm_lang$core$List$foldr,
		function (x) {
			return function (_p93) {
				return _elm_lang$core$Maybe$Just(
					A3(
						maybe,
						{ctor: '[]'},
						F2(
							function (x, y) {
								return {ctor: '::', _0: x, _1: y};
							})(x),
						_p93));
			};
		},
		_elm_lang$core$Maybe$Nothing);
}();
var _elm_community$list_extra$List_Extra$last = _elm_community$list_extra$List_Extra$foldl1(
	_elm_lang$core$Basics$flip(_elm_lang$core$Basics$always));

var _elm_lang$animation_frame$Native_AnimationFrame = function()
{

function create()
{
	return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback)
	{
		var id = requestAnimationFrame(function() {
			callback(_elm_lang$core$Native_Scheduler.succeed(Date.now()));
		});

		return function() {
			cancelAnimationFrame(id);
		};
	});
}

return {
	create: create
};

}();

var _elm_lang$core$Process$kill = _elm_lang$core$Native_Scheduler.kill;
var _elm_lang$core$Process$sleep = _elm_lang$core$Native_Scheduler.sleep;
var _elm_lang$core$Process$spawn = _elm_lang$core$Native_Scheduler.spawn;

var _elm_lang$animation_frame$AnimationFrame$rAF = _elm_lang$animation_frame$Native_AnimationFrame.create(
	{ctor: '_Tuple0'});
var _elm_lang$animation_frame$AnimationFrame$subscription = _elm_lang$core$Native_Platform.leaf('AnimationFrame');
var _elm_lang$animation_frame$AnimationFrame$State = F3(
	function (a, b, c) {
		return {subs: a, request: b, oldTime: c};
	});
var _elm_lang$animation_frame$AnimationFrame$init = _elm_lang$core$Task$succeed(
	A3(
		_elm_lang$animation_frame$AnimationFrame$State,
		{ctor: '[]'},
		_elm_lang$core$Maybe$Nothing,
		0));
var _elm_lang$animation_frame$AnimationFrame$onEffects = F3(
	function (router, subs, _p0) {
		var _p1 = _p0;
		var _p5 = _p1.request;
		var _p4 = _p1.oldTime;
		var _p2 = {ctor: '_Tuple2', _0: _p5, _1: subs};
		if (_p2._0.ctor === 'Nothing') {
			if (_p2._1.ctor === '[]') {
				return _elm_lang$core$Task$succeed(
					A3(
						_elm_lang$animation_frame$AnimationFrame$State,
						{ctor: '[]'},
						_elm_lang$core$Maybe$Nothing,
						_p4));
			} else {
				return A2(
					_elm_lang$core$Task$andThen,
					function (pid) {
						return A2(
							_elm_lang$core$Task$andThen,
							function (time) {
								return _elm_lang$core$Task$succeed(
									A3(
										_elm_lang$animation_frame$AnimationFrame$State,
										subs,
										_elm_lang$core$Maybe$Just(pid),
										time));
							},
							_elm_lang$core$Time$now);
					},
					_elm_lang$core$Process$spawn(
						A2(
							_elm_lang$core$Task$andThen,
							_elm_lang$core$Platform$sendToSelf(router),
							_elm_lang$animation_frame$AnimationFrame$rAF)));
			}
		} else {
			if (_p2._1.ctor === '[]') {
				return A2(
					_elm_lang$core$Task$andThen,
					function (_p3) {
						return _elm_lang$core$Task$succeed(
							A3(
								_elm_lang$animation_frame$AnimationFrame$State,
								{ctor: '[]'},
								_elm_lang$core$Maybe$Nothing,
								_p4));
					},
					_elm_lang$core$Process$kill(_p2._0._0));
			} else {
				return _elm_lang$core$Task$succeed(
					A3(_elm_lang$animation_frame$AnimationFrame$State, subs, _p5, _p4));
			}
		}
	});
var _elm_lang$animation_frame$AnimationFrame$onSelfMsg = F3(
	function (router, newTime, _p6) {
		var _p7 = _p6;
		var _p10 = _p7.subs;
		var diff = newTime - _p7.oldTime;
		var send = function (sub) {
			var _p8 = sub;
			if (_p8.ctor === 'Time') {
				return A2(
					_elm_lang$core$Platform$sendToApp,
					router,
					_p8._0(newTime));
			} else {
				return A2(
					_elm_lang$core$Platform$sendToApp,
					router,
					_p8._0(diff));
			}
		};
		return A2(
			_elm_lang$core$Task$andThen,
			function (pid) {
				return A2(
					_elm_lang$core$Task$andThen,
					function (_p9) {
						return _elm_lang$core$Task$succeed(
							A3(
								_elm_lang$animation_frame$AnimationFrame$State,
								_p10,
								_elm_lang$core$Maybe$Just(pid),
								newTime));
					},
					_elm_lang$core$Task$sequence(
						A2(_elm_lang$core$List$map, send, _p10)));
			},
			_elm_lang$core$Process$spawn(
				A2(
					_elm_lang$core$Task$andThen,
					_elm_lang$core$Platform$sendToSelf(router),
					_elm_lang$animation_frame$AnimationFrame$rAF)));
	});
var _elm_lang$animation_frame$AnimationFrame$Diff = function (a) {
	return {ctor: 'Diff', _0: a};
};
var _elm_lang$animation_frame$AnimationFrame$diffs = function (tagger) {
	return _elm_lang$animation_frame$AnimationFrame$subscription(
		_elm_lang$animation_frame$AnimationFrame$Diff(tagger));
};
var _elm_lang$animation_frame$AnimationFrame$Time = function (a) {
	return {ctor: 'Time', _0: a};
};
var _elm_lang$animation_frame$AnimationFrame$times = function (tagger) {
	return _elm_lang$animation_frame$AnimationFrame$subscription(
		_elm_lang$animation_frame$AnimationFrame$Time(tagger));
};
var _elm_lang$animation_frame$AnimationFrame$subMap = F2(
	function (func, sub) {
		var _p11 = sub;
		if (_p11.ctor === 'Time') {
			return _elm_lang$animation_frame$AnimationFrame$Time(
				function (_p12) {
					return func(
						_p11._0(_p12));
				});
		} else {
			return _elm_lang$animation_frame$AnimationFrame$Diff(
				function (_p13) {
					return func(
						_p11._0(_p13));
				});
		}
	});
_elm_lang$core$Native_Platform.effectManagers['AnimationFrame'] = {pkg: 'elm-lang/animation-frame', init: _elm_lang$animation_frame$AnimationFrame$init, onEffects: _elm_lang$animation_frame$AnimationFrame$onEffects, onSelfMsg: _elm_lang$animation_frame$AnimationFrame$onSelfMsg, tag: 'sub', subMap: _elm_lang$animation_frame$AnimationFrame$subMap};

//import Maybe, Native.List //

var _elm_lang$core$Native_Regex = function() {

function escape(str)
{
	return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}
function caseInsensitive(re)
{
	return new RegExp(re.source, 'gi');
}
function regex(raw)
{
	return new RegExp(raw, 'g');
}

function contains(re, string)
{
	return string.match(re) !== null;
}

function find(n, re, str)
{
	n = n.ctor === 'All' ? Infinity : n._0;
	var out = [];
	var number = 0;
	var string = str;
	var lastIndex = re.lastIndex;
	var prevLastIndex = -1;
	var result;
	while (number++ < n && (result = re.exec(string)))
	{
		if (prevLastIndex === re.lastIndex) break;
		var i = result.length - 1;
		var subs = new Array(i);
		while (i > 0)
		{
			var submatch = result[i];
			subs[--i] = submatch === undefined
				? _elm_lang$core$Maybe$Nothing
				: _elm_lang$core$Maybe$Just(submatch);
		}
		out.push({
			match: result[0],
			submatches: _elm_lang$core$Native_List.fromArray(subs),
			index: result.index,
			number: number
		});
		prevLastIndex = re.lastIndex;
	}
	re.lastIndex = lastIndex;
	return _elm_lang$core$Native_List.fromArray(out);
}

function replace(n, re, replacer, string)
{
	n = n.ctor === 'All' ? Infinity : n._0;
	var count = 0;
	function jsReplacer(match)
	{
		if (count++ >= n)
		{
			return match;
		}
		var i = arguments.length - 3;
		var submatches = new Array(i);
		while (i > 0)
		{
			var submatch = arguments[i];
			submatches[--i] = submatch === undefined
				? _elm_lang$core$Maybe$Nothing
				: _elm_lang$core$Maybe$Just(submatch);
		}
		return replacer({
			match: match,
			submatches: _elm_lang$core$Native_List.fromArray(submatches),
			index: arguments[arguments.length - 2],
			number: count
		});
	}
	return string.replace(re, jsReplacer);
}

function split(n, re, str)
{
	n = n.ctor === 'All' ? Infinity : n._0;
	if (n === Infinity)
	{
		return _elm_lang$core$Native_List.fromArray(str.split(re));
	}
	var string = str;
	var result;
	var out = [];
	var start = re.lastIndex;
	var restoreLastIndex = re.lastIndex;
	while (n--)
	{
		if (!(result = re.exec(string))) break;
		out.push(string.slice(start, result.index));
		start = re.lastIndex;
	}
	out.push(string.slice(start));
	re.lastIndex = restoreLastIndex;
	return _elm_lang$core$Native_List.fromArray(out);
}

return {
	regex: regex,
	caseInsensitive: caseInsensitive,
	escape: escape,

	contains: F2(contains),
	find: F3(find),
	replace: F4(replace),
	split: F3(split)
};

}();

var _elm_lang$core$Random$onSelfMsg = F3(
	function (_p1, _p0, seed) {
		return _elm_lang$core$Task$succeed(seed);
	});
var _elm_lang$core$Random$magicNum8 = 2147483562;
var _elm_lang$core$Random$range = function (_p2) {
	return {ctor: '_Tuple2', _0: 0, _1: _elm_lang$core$Random$magicNum8};
};
var _elm_lang$core$Random$magicNum7 = 2147483399;
var _elm_lang$core$Random$magicNum6 = 2147483563;
var _elm_lang$core$Random$magicNum5 = 3791;
var _elm_lang$core$Random$magicNum4 = 40692;
var _elm_lang$core$Random$magicNum3 = 52774;
var _elm_lang$core$Random$magicNum2 = 12211;
var _elm_lang$core$Random$magicNum1 = 53668;
var _elm_lang$core$Random$magicNum0 = 40014;
var _elm_lang$core$Random$step = F2(
	function (_p3, seed) {
		var _p4 = _p3;
		return _p4._0(seed);
	});
var _elm_lang$core$Random$onEffects = F3(
	function (router, commands, seed) {
		var _p5 = commands;
		if (_p5.ctor === '[]') {
			return _elm_lang$core$Task$succeed(seed);
		} else {
			var _p6 = A2(_elm_lang$core$Random$step, _p5._0._0, seed);
			var value = _p6._0;
			var newSeed = _p6._1;
			return A2(
				_elm_lang$core$Task$andThen,
				function (_p7) {
					return A3(_elm_lang$core$Random$onEffects, router, _p5._1, newSeed);
				},
				A2(_elm_lang$core$Platform$sendToApp, router, value));
		}
	});
var _elm_lang$core$Random$listHelp = F4(
	function (list, n, generate, seed) {
		listHelp:
		while (true) {
			if (_elm_lang$core$Native_Utils.cmp(n, 1) < 0) {
				return {
					ctor: '_Tuple2',
					_0: _elm_lang$core$List$reverse(list),
					_1: seed
				};
			} else {
				var _p8 = generate(seed);
				var value = _p8._0;
				var newSeed = _p8._1;
				var _v2 = {ctor: '::', _0: value, _1: list},
					_v3 = n - 1,
					_v4 = generate,
					_v5 = newSeed;
				list = _v2;
				n = _v3;
				generate = _v4;
				seed = _v5;
				continue listHelp;
			}
		}
	});
var _elm_lang$core$Random$minInt = -2147483648;
var _elm_lang$core$Random$maxInt = 2147483647;
var _elm_lang$core$Random$iLogBase = F2(
	function (b, i) {
		return (_elm_lang$core$Native_Utils.cmp(i, b) < 0) ? 1 : (1 + A2(_elm_lang$core$Random$iLogBase, b, (i / b) | 0));
	});
var _elm_lang$core$Random$command = _elm_lang$core$Native_Platform.leaf('Random');
var _elm_lang$core$Random$Generator = function (a) {
	return {ctor: 'Generator', _0: a};
};
var _elm_lang$core$Random$list = F2(
	function (n, _p9) {
		var _p10 = _p9;
		return _elm_lang$core$Random$Generator(
			function (seed) {
				return A4(
					_elm_lang$core$Random$listHelp,
					{ctor: '[]'},
					n,
					_p10._0,
					seed);
			});
	});
var _elm_lang$core$Random$map = F2(
	function (func, _p11) {
		var _p12 = _p11;
		return _elm_lang$core$Random$Generator(
			function (seed0) {
				var _p13 = _p12._0(seed0);
				var a = _p13._0;
				var seed1 = _p13._1;
				return {
					ctor: '_Tuple2',
					_0: func(a),
					_1: seed1
				};
			});
	});
var _elm_lang$core$Random$map2 = F3(
	function (func, _p15, _p14) {
		var _p16 = _p15;
		var _p17 = _p14;
		return _elm_lang$core$Random$Generator(
			function (seed0) {
				var _p18 = _p16._0(seed0);
				var a = _p18._0;
				var seed1 = _p18._1;
				var _p19 = _p17._0(seed1);
				var b = _p19._0;
				var seed2 = _p19._1;
				return {
					ctor: '_Tuple2',
					_0: A2(func, a, b),
					_1: seed2
				};
			});
	});
var _elm_lang$core$Random$pair = F2(
	function (genA, genB) {
		return A3(
			_elm_lang$core$Random$map2,
			F2(
				function (v0, v1) {
					return {ctor: '_Tuple2', _0: v0, _1: v1};
				}),
			genA,
			genB);
	});
var _elm_lang$core$Random$map3 = F4(
	function (func, _p22, _p21, _p20) {
		var _p23 = _p22;
		var _p24 = _p21;
		var _p25 = _p20;
		return _elm_lang$core$Random$Generator(
			function (seed0) {
				var _p26 = _p23._0(seed0);
				var a = _p26._0;
				var seed1 = _p26._1;
				var _p27 = _p24._0(seed1);
				var b = _p27._0;
				var seed2 = _p27._1;
				var _p28 = _p25._0(seed2);
				var c = _p28._0;
				var seed3 = _p28._1;
				return {
					ctor: '_Tuple2',
					_0: A3(func, a, b, c),
					_1: seed3
				};
			});
	});
var _elm_lang$core$Random$map4 = F5(
	function (func, _p32, _p31, _p30, _p29) {
		var _p33 = _p32;
		var _p34 = _p31;
		var _p35 = _p30;
		var _p36 = _p29;
		return _elm_lang$core$Random$Generator(
			function (seed0) {
				var _p37 = _p33._0(seed0);
				var a = _p37._0;
				var seed1 = _p37._1;
				var _p38 = _p34._0(seed1);
				var b = _p38._0;
				var seed2 = _p38._1;
				var _p39 = _p35._0(seed2);
				var c = _p39._0;
				var seed3 = _p39._1;
				var _p40 = _p36._0(seed3);
				var d = _p40._0;
				var seed4 = _p40._1;
				return {
					ctor: '_Tuple2',
					_0: A4(func, a, b, c, d),
					_1: seed4
				};
			});
	});
var _elm_lang$core$Random$map5 = F6(
	function (func, _p45, _p44, _p43, _p42, _p41) {
		var _p46 = _p45;
		var _p47 = _p44;
		var _p48 = _p43;
		var _p49 = _p42;
		var _p50 = _p41;
		return _elm_lang$core$Random$Generator(
			function (seed0) {
				var _p51 = _p46._0(seed0);
				var a = _p51._0;
				var seed1 = _p51._1;
				var _p52 = _p47._0(seed1);
				var b = _p52._0;
				var seed2 = _p52._1;
				var _p53 = _p48._0(seed2);
				var c = _p53._0;
				var seed3 = _p53._1;
				var _p54 = _p49._0(seed3);
				var d = _p54._0;
				var seed4 = _p54._1;
				var _p55 = _p50._0(seed4);
				var e = _p55._0;
				var seed5 = _p55._1;
				return {
					ctor: '_Tuple2',
					_0: A5(func, a, b, c, d, e),
					_1: seed5
				};
			});
	});
var _elm_lang$core$Random$andThen = F2(
	function (callback, _p56) {
		var _p57 = _p56;
		return _elm_lang$core$Random$Generator(
			function (seed) {
				var _p58 = _p57._0(seed);
				var result = _p58._0;
				var newSeed = _p58._1;
				var _p59 = callback(result);
				var genB = _p59._0;
				return genB(newSeed);
			});
	});
var _elm_lang$core$Random$State = F2(
	function (a, b) {
		return {ctor: 'State', _0: a, _1: b};
	});
var _elm_lang$core$Random$initState = function (seed) {
	var s = A2(_elm_lang$core$Basics$max, seed, 0 - seed);
	var q = (s / (_elm_lang$core$Random$magicNum6 - 1)) | 0;
	var s2 = A2(_elm_lang$core$Basics_ops['%'], q, _elm_lang$core$Random$magicNum7 - 1);
	var s1 = A2(_elm_lang$core$Basics_ops['%'], s, _elm_lang$core$Random$magicNum6 - 1);
	return A2(_elm_lang$core$Random$State, s1 + 1, s2 + 1);
};
var _elm_lang$core$Random$next = function (_p60) {
	var _p61 = _p60;
	var _p63 = _p61._1;
	var _p62 = _p61._0;
	var k2 = (_p63 / _elm_lang$core$Random$magicNum3) | 0;
	var rawState2 = (_elm_lang$core$Random$magicNum4 * (_p63 - (k2 * _elm_lang$core$Random$magicNum3))) - (k2 * _elm_lang$core$Random$magicNum5);
	var newState2 = (_elm_lang$core$Native_Utils.cmp(rawState2, 0) < 0) ? (rawState2 + _elm_lang$core$Random$magicNum7) : rawState2;
	var k1 = (_p62 / _elm_lang$core$Random$magicNum1) | 0;
	var rawState1 = (_elm_lang$core$Random$magicNum0 * (_p62 - (k1 * _elm_lang$core$Random$magicNum1))) - (k1 * _elm_lang$core$Random$magicNum2);
	var newState1 = (_elm_lang$core$Native_Utils.cmp(rawState1, 0) < 0) ? (rawState1 + _elm_lang$core$Random$magicNum6) : rawState1;
	var z = newState1 - newState2;
	var newZ = (_elm_lang$core$Native_Utils.cmp(z, 1) < 0) ? (z + _elm_lang$core$Random$magicNum8) : z;
	return {
		ctor: '_Tuple2',
		_0: newZ,
		_1: A2(_elm_lang$core$Random$State, newState1, newState2)
	};
};
var _elm_lang$core$Random$split = function (_p64) {
	var _p65 = _p64;
	var _p68 = _p65._1;
	var _p67 = _p65._0;
	var _p66 = _elm_lang$core$Tuple$second(
		_elm_lang$core$Random$next(_p65));
	var t1 = _p66._0;
	var t2 = _p66._1;
	var new_s2 = _elm_lang$core$Native_Utils.eq(_p68, 1) ? (_elm_lang$core$Random$magicNum7 - 1) : (_p68 - 1);
	var new_s1 = _elm_lang$core$Native_Utils.eq(_p67, _elm_lang$core$Random$magicNum6 - 1) ? 1 : (_p67 + 1);
	return {
		ctor: '_Tuple2',
		_0: A2(_elm_lang$core$Random$State, new_s1, t2),
		_1: A2(_elm_lang$core$Random$State, t1, new_s2)
	};
};
var _elm_lang$core$Random$Seed = function (a) {
	return {ctor: 'Seed', _0: a};
};
var _elm_lang$core$Random$int = F2(
	function (a, b) {
		return _elm_lang$core$Random$Generator(
			function (_p69) {
				var _p70 = _p69;
				var _p75 = _p70._0;
				var base = 2147483561;
				var f = F3(
					function (n, acc, state) {
						f:
						while (true) {
							var _p71 = n;
							if (_p71 === 0) {
								return {ctor: '_Tuple2', _0: acc, _1: state};
							} else {
								var _p72 = _p75.next(state);
								var x = _p72._0;
								var nextState = _p72._1;
								var _v27 = n - 1,
									_v28 = x + (acc * base),
									_v29 = nextState;
								n = _v27;
								acc = _v28;
								state = _v29;
								continue f;
							}
						}
					});
				var _p73 = (_elm_lang$core$Native_Utils.cmp(a, b) < 0) ? {ctor: '_Tuple2', _0: a, _1: b} : {ctor: '_Tuple2', _0: b, _1: a};
				var lo = _p73._0;
				var hi = _p73._1;
				var k = (hi - lo) + 1;
				var n = A2(_elm_lang$core$Random$iLogBase, base, k);
				var _p74 = A3(f, n, 1, _p75.state);
				var v = _p74._0;
				var nextState = _p74._1;
				return {
					ctor: '_Tuple2',
					_0: lo + A2(_elm_lang$core$Basics_ops['%'], v, k),
					_1: _elm_lang$core$Random$Seed(
						_elm_lang$core$Native_Utils.update(
							_p75,
							{state: nextState}))
				};
			});
	});
var _elm_lang$core$Random$bool = A2(
	_elm_lang$core$Random$map,
	F2(
		function (x, y) {
			return _elm_lang$core$Native_Utils.eq(x, y);
		})(1),
	A2(_elm_lang$core$Random$int, 0, 1));
var _elm_lang$core$Random$float = F2(
	function (a, b) {
		return _elm_lang$core$Random$Generator(
			function (seed) {
				var _p76 = A2(
					_elm_lang$core$Random$step,
					A2(_elm_lang$core$Random$int, _elm_lang$core$Random$minInt, _elm_lang$core$Random$maxInt),
					seed);
				var number = _p76._0;
				var newSeed = _p76._1;
				var negativeOneToOne = _elm_lang$core$Basics$toFloat(number) / _elm_lang$core$Basics$toFloat(_elm_lang$core$Random$maxInt - _elm_lang$core$Random$minInt);
				var _p77 = (_elm_lang$core$Native_Utils.cmp(a, b) < 0) ? {ctor: '_Tuple2', _0: a, _1: b} : {ctor: '_Tuple2', _0: b, _1: a};
				var lo = _p77._0;
				var hi = _p77._1;
				var scaled = ((lo + hi) / 2) + ((hi - lo) * negativeOneToOne);
				return {ctor: '_Tuple2', _0: scaled, _1: newSeed};
			});
	});
var _elm_lang$core$Random$initialSeed = function (n) {
	return _elm_lang$core$Random$Seed(
		{
			state: _elm_lang$core$Random$initState(n),
			next: _elm_lang$core$Random$next,
			split: _elm_lang$core$Random$split,
			range: _elm_lang$core$Random$range
		});
};
var _elm_lang$core$Random$init = A2(
	_elm_lang$core$Task$andThen,
	function (t) {
		return _elm_lang$core$Task$succeed(
			_elm_lang$core$Random$initialSeed(
				_elm_lang$core$Basics$round(t)));
	},
	_elm_lang$core$Time$now);
var _elm_lang$core$Random$Generate = function (a) {
	return {ctor: 'Generate', _0: a};
};
var _elm_lang$core$Random$generate = F2(
	function (tagger, generator) {
		return _elm_lang$core$Random$command(
			_elm_lang$core$Random$Generate(
				A2(_elm_lang$core$Random$map, tagger, generator)));
	});
var _elm_lang$core$Random$cmdMap = F2(
	function (func, _p78) {
		var _p79 = _p78;
		return _elm_lang$core$Random$Generate(
			A2(_elm_lang$core$Random$map, func, _p79._0));
	});
_elm_lang$core$Native_Platform.effectManagers['Random'] = {pkg: 'elm-lang/core', init: _elm_lang$core$Random$init, onEffects: _elm_lang$core$Random$onEffects, onSelfMsg: _elm_lang$core$Random$onSelfMsg, tag: 'cmd', cmdMap: _elm_lang$core$Random$cmdMap};

var _elm_lang$core$Regex$split = _elm_lang$core$Native_Regex.split;
var _elm_lang$core$Regex$replace = _elm_lang$core$Native_Regex.replace;
var _elm_lang$core$Regex$find = _elm_lang$core$Native_Regex.find;
var _elm_lang$core$Regex$contains = _elm_lang$core$Native_Regex.contains;
var _elm_lang$core$Regex$caseInsensitive = _elm_lang$core$Native_Regex.caseInsensitive;
var _elm_lang$core$Regex$regex = _elm_lang$core$Native_Regex.regex;
var _elm_lang$core$Regex$escape = _elm_lang$core$Native_Regex.escape;
var _elm_lang$core$Regex$Match = F4(
	function (a, b, c, d) {
		return {match: a, submatches: b, index: c, number: d};
	});
var _elm_lang$core$Regex$Regex = {ctor: 'Regex'};
var _elm_lang$core$Regex$AtMost = function (a) {
	return {ctor: 'AtMost', _0: a};
};
var _elm_lang$core$Regex$All = {ctor: 'All'};

var _elm_lang$dom$Native_Dom = function() {

var fakeNode = {
	addEventListener: function() {},
	removeEventListener: function() {}
};

var onDocument = on(typeof document !== 'undefined' ? document : fakeNode);
var onWindow = on(typeof window !== 'undefined' ? window : fakeNode);

function on(node)
{
	return function(eventName, decoder, toTask)
	{
		return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback) {

			function performTask(event)
			{
				var result = A2(_elm_lang$core$Json_Decode$decodeValue, decoder, event);
				if (result.ctor === 'Ok')
				{
					_elm_lang$core$Native_Scheduler.rawSpawn(toTask(result._0));
				}
			}

			node.addEventListener(eventName, performTask);

			return function()
			{
				node.removeEventListener(eventName, performTask);
			};
		});
	};
}

var rAF = typeof requestAnimationFrame !== 'undefined'
	? requestAnimationFrame
	: function(callback) { callback(); };

function withNode(id, doStuff)
{
	return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback)
	{
		rAF(function()
		{
			var node = document.getElementById(id);
			if (node === null)
			{
				callback(_elm_lang$core$Native_Scheduler.fail({ ctor: 'NotFound', _0: id }));
				return;
			}
			callback(_elm_lang$core$Native_Scheduler.succeed(doStuff(node)));
		});
	});
}


// FOCUS

function focus(id)
{
	return withNode(id, function(node) {
		node.focus();
		return _elm_lang$core$Native_Utils.Tuple0;
	});
}

function blur(id)
{
	return withNode(id, function(node) {
		node.blur();
		return _elm_lang$core$Native_Utils.Tuple0;
	});
}


// SCROLLING

function getScrollTop(id)
{
	return withNode(id, function(node) {
		return node.scrollTop;
	});
}

function setScrollTop(id, desiredScrollTop)
{
	return withNode(id, function(node) {
		node.scrollTop = desiredScrollTop;
		return _elm_lang$core$Native_Utils.Tuple0;
	});
}

function toBottom(id)
{
	return withNode(id, function(node) {
		node.scrollTop = node.scrollHeight;
		return _elm_lang$core$Native_Utils.Tuple0;
	});
}

function getScrollLeft(id)
{
	return withNode(id, function(node) {
		return node.scrollLeft;
	});
}

function setScrollLeft(id, desiredScrollLeft)
{
	return withNode(id, function(node) {
		node.scrollLeft = desiredScrollLeft;
		return _elm_lang$core$Native_Utils.Tuple0;
	});
}

function toRight(id)
{
	return withNode(id, function(node) {
		node.scrollLeft = node.scrollWidth;
		return _elm_lang$core$Native_Utils.Tuple0;
	});
}


// SIZE

function width(options, id)
{
	return withNode(id, function(node) {
		switch (options.ctor)
		{
			case 'Content':
				return node.scrollWidth;
			case 'VisibleContent':
				return node.clientWidth;
			case 'VisibleContentWithBorders':
				return node.offsetWidth;
			case 'VisibleContentWithBordersAndMargins':
				var rect = node.getBoundingClientRect();
				return rect.right - rect.left;
		}
	});
}

function height(options, id)
{
	return withNode(id, function(node) {
		switch (options.ctor)
		{
			case 'Content':
				return node.scrollHeight;
			case 'VisibleContent':
				return node.clientHeight;
			case 'VisibleContentWithBorders':
				return node.offsetHeight;
			case 'VisibleContentWithBordersAndMargins':
				var rect = node.getBoundingClientRect();
				return rect.bottom - rect.top;
		}
	});
}

return {
	onDocument: F3(onDocument),
	onWindow: F3(onWindow),

	focus: focus,
	blur: blur,

	getScrollTop: getScrollTop,
	setScrollTop: F2(setScrollTop),
	getScrollLeft: getScrollLeft,
	setScrollLeft: F2(setScrollLeft),
	toBottom: toBottom,
	toRight: toRight,

	height: F2(height),
	width: F2(width)
};

}();

var _elm_lang$dom$Dom_LowLevel$onWindow = _elm_lang$dom$Native_Dom.onWindow;
var _elm_lang$dom$Dom_LowLevel$onDocument = _elm_lang$dom$Native_Dom.onDocument;

var _elm_lang$virtual_dom$VirtualDom_Debug$wrap;
var _elm_lang$virtual_dom$VirtualDom_Debug$wrapWithFlags;

var _elm_lang$virtual_dom$Native_VirtualDom = function() {

var STYLE_KEY = 'STYLE';
var EVENT_KEY = 'EVENT';
var ATTR_KEY = 'ATTR';
var ATTR_NS_KEY = 'ATTR_NS';

var localDoc = typeof document !== 'undefined' ? document : {};


////////////  VIRTUAL DOM NODES  ////////////


function text(string)
{
	return {
		type: 'text',
		text: string
	};
}


function node(tag)
{
	return F2(function(factList, kidList) {
		return nodeHelp(tag, factList, kidList);
	});
}


function nodeHelp(tag, factList, kidList)
{
	var organized = organizeFacts(factList);
	var namespace = organized.namespace;
	var facts = organized.facts;

	var children = [];
	var descendantsCount = 0;
	while (kidList.ctor !== '[]')
	{
		var kid = kidList._0;
		descendantsCount += (kid.descendantsCount || 0);
		children.push(kid);
		kidList = kidList._1;
	}
	descendantsCount += children.length;

	return {
		type: 'node',
		tag: tag,
		facts: facts,
		children: children,
		namespace: namespace,
		descendantsCount: descendantsCount
	};
}


function keyedNode(tag, factList, kidList)
{
	var organized = organizeFacts(factList);
	var namespace = organized.namespace;
	var facts = organized.facts;

	var children = [];
	var descendantsCount = 0;
	while (kidList.ctor !== '[]')
	{
		var kid = kidList._0;
		descendantsCount += (kid._1.descendantsCount || 0);
		children.push(kid);
		kidList = kidList._1;
	}
	descendantsCount += children.length;

	return {
		type: 'keyed-node',
		tag: tag,
		facts: facts,
		children: children,
		namespace: namespace,
		descendantsCount: descendantsCount
	};
}


function custom(factList, model, impl)
{
	var facts = organizeFacts(factList).facts;

	return {
		type: 'custom',
		facts: facts,
		model: model,
		impl: impl
	};
}


function map(tagger, node)
{
	return {
		type: 'tagger',
		tagger: tagger,
		node: node,
		descendantsCount: 1 + (node.descendantsCount || 0)
	};
}


function thunk(func, args, thunk)
{
	return {
		type: 'thunk',
		func: func,
		args: args,
		thunk: thunk,
		node: undefined
	};
}

function lazy(fn, a)
{
	return thunk(fn, [a], function() {
		return fn(a);
	});
}

function lazy2(fn, a, b)
{
	return thunk(fn, [a,b], function() {
		return A2(fn, a, b);
	});
}

function lazy3(fn, a, b, c)
{
	return thunk(fn, [a,b,c], function() {
		return A3(fn, a, b, c);
	});
}



// FACTS


function organizeFacts(factList)
{
	var namespace, facts = {};

	while (factList.ctor !== '[]')
	{
		var entry = factList._0;
		var key = entry.key;

		if (key === ATTR_KEY || key === ATTR_NS_KEY || key === EVENT_KEY)
		{
			var subFacts = facts[key] || {};
			subFacts[entry.realKey] = entry.value;
			facts[key] = subFacts;
		}
		else if (key === STYLE_KEY)
		{
			var styles = facts[key] || {};
			var styleList = entry.value;
			while (styleList.ctor !== '[]')
			{
				var style = styleList._0;
				styles[style._0] = style._1;
				styleList = styleList._1;
			}
			facts[key] = styles;
		}
		else if (key === 'namespace')
		{
			namespace = entry.value;
		}
		else if (key === 'className')
		{
			var classes = facts[key];
			facts[key] = typeof classes === 'undefined'
				? entry.value
				: classes + ' ' + entry.value;
		}
 		else
		{
			facts[key] = entry.value;
		}
		factList = factList._1;
	}

	return {
		facts: facts,
		namespace: namespace
	};
}



////////////  PROPERTIES AND ATTRIBUTES  ////////////


function style(value)
{
	return {
		key: STYLE_KEY,
		value: value
	};
}


function property(key, value)
{
	return {
		key: key,
		value: value
	};
}


function attribute(key, value)
{
	return {
		key: ATTR_KEY,
		realKey: key,
		value: value
	};
}


function attributeNS(namespace, key, value)
{
	return {
		key: ATTR_NS_KEY,
		realKey: key,
		value: {
			value: value,
			namespace: namespace
		}
	};
}


function on(name, options, decoder)
{
	return {
		key: EVENT_KEY,
		realKey: name,
		value: {
			options: options,
			decoder: decoder
		}
	};
}


function equalEvents(a, b)
{
	if (a.options !== b.options)
	{
		if (a.options.stopPropagation !== b.options.stopPropagation || a.options.preventDefault !== b.options.preventDefault)
		{
			return false;
		}
	}
	return _elm_lang$core$Native_Json.equality(a.decoder, b.decoder);
}


function mapProperty(func, property)
{
	if (property.key !== EVENT_KEY)
	{
		return property;
	}
	return on(
		property.realKey,
		property.value.options,
		A2(_elm_lang$core$Json_Decode$map, func, property.value.decoder)
	);
}


////////////  RENDER  ////////////


function render(vNode, eventNode)
{
	switch (vNode.type)
	{
		case 'thunk':
			if (!vNode.node)
			{
				vNode.node = vNode.thunk();
			}
			return render(vNode.node, eventNode);

		case 'tagger':
			var subNode = vNode.node;
			var tagger = vNode.tagger;

			while (subNode.type === 'tagger')
			{
				typeof tagger !== 'object'
					? tagger = [tagger, subNode.tagger]
					: tagger.push(subNode.tagger);

				subNode = subNode.node;
			}

			var subEventRoot = { tagger: tagger, parent: eventNode };
			var domNode = render(subNode, subEventRoot);
			domNode.elm_event_node_ref = subEventRoot;
			return domNode;

		case 'text':
			return localDoc.createTextNode(vNode.text);

		case 'node':
			var domNode = vNode.namespace
				? localDoc.createElementNS(vNode.namespace, vNode.tag)
				: localDoc.createElement(vNode.tag);

			applyFacts(domNode, eventNode, vNode.facts);

			var children = vNode.children;

			for (var i = 0; i < children.length; i++)
			{
				domNode.appendChild(render(children[i], eventNode));
			}

			return domNode;

		case 'keyed-node':
			var domNode = vNode.namespace
				? localDoc.createElementNS(vNode.namespace, vNode.tag)
				: localDoc.createElement(vNode.tag);

			applyFacts(domNode, eventNode, vNode.facts);

			var children = vNode.children;

			for (var i = 0; i < children.length; i++)
			{
				domNode.appendChild(render(children[i]._1, eventNode));
			}

			return domNode;

		case 'custom':
			var domNode = vNode.impl.render(vNode.model);
			applyFacts(domNode, eventNode, vNode.facts);
			return domNode;
	}
}



////////////  APPLY FACTS  ////////////


function applyFacts(domNode, eventNode, facts)
{
	for (var key in facts)
	{
		var value = facts[key];

		switch (key)
		{
			case STYLE_KEY:
				applyStyles(domNode, value);
				break;

			case EVENT_KEY:
				applyEvents(domNode, eventNode, value);
				break;

			case ATTR_KEY:
				applyAttrs(domNode, value);
				break;

			case ATTR_NS_KEY:
				applyAttrsNS(domNode, value);
				break;

			case 'value':
				if (domNode[key] !== value)
				{
					domNode[key] = value;
				}
				break;

			default:
				domNode[key] = value;
				break;
		}
	}
}

function applyStyles(domNode, styles)
{
	var domNodeStyle = domNode.style;

	for (var key in styles)
	{
		domNodeStyle[key] = styles[key];
	}
}

function applyEvents(domNode, eventNode, events)
{
	var allHandlers = domNode.elm_handlers || {};

	for (var key in events)
	{
		var handler = allHandlers[key];
		var value = events[key];

		if (typeof value === 'undefined')
		{
			domNode.removeEventListener(key, handler);
			allHandlers[key] = undefined;
		}
		else if (typeof handler === 'undefined')
		{
			var handler = makeEventHandler(eventNode, value);
			domNode.addEventListener(key, handler);
			allHandlers[key] = handler;
		}
		else
		{
			handler.info = value;
		}
	}

	domNode.elm_handlers = allHandlers;
}

function makeEventHandler(eventNode, info)
{
	function eventHandler(event)
	{
		var info = eventHandler.info;

		var value = A2(_elm_lang$core$Native_Json.run, info.decoder, event);

		if (value.ctor === 'Ok')
		{
			var options = info.options;
			if (options.stopPropagation)
			{
				event.stopPropagation();
			}
			if (options.preventDefault)
			{
				event.preventDefault();
			}

			var message = value._0;

			var currentEventNode = eventNode;
			while (currentEventNode)
			{
				var tagger = currentEventNode.tagger;
				if (typeof tagger === 'function')
				{
					message = tagger(message);
				}
				else
				{
					for (var i = tagger.length; i--; )
					{
						message = tagger[i](message);
					}
				}
				currentEventNode = currentEventNode.parent;
			}
		}
	};

	eventHandler.info = info;

	return eventHandler;
}

function applyAttrs(domNode, attrs)
{
	for (var key in attrs)
	{
		var value = attrs[key];
		if (typeof value === 'undefined')
		{
			domNode.removeAttribute(key);
		}
		else
		{
			domNode.setAttribute(key, value);
		}
	}
}

function applyAttrsNS(domNode, nsAttrs)
{
	for (var key in nsAttrs)
	{
		var pair = nsAttrs[key];
		var namespace = pair.namespace;
		var value = pair.value;

		if (typeof value === 'undefined')
		{
			domNode.removeAttributeNS(namespace, key);
		}
		else
		{
			domNode.setAttributeNS(namespace, key, value);
		}
	}
}



////////////  DIFF  ////////////


function diff(a, b)
{
	var patches = [];
	diffHelp(a, b, patches, 0);
	return patches;
}


function makePatch(type, index, data)
{
	return {
		index: index,
		type: type,
		data: data,
		domNode: undefined,
		eventNode: undefined
	};
}


function diffHelp(a, b, patches, index)
{
	if (a === b)
	{
		return;
	}

	var aType = a.type;
	var bType = b.type;

	// Bail if you run into different types of nodes. Implies that the
	// structure has changed significantly and it's not worth a diff.
	if (aType !== bType)
	{
		patches.push(makePatch('p-redraw', index, b));
		return;
	}

	// Now we know that both nodes are the same type.
	switch (bType)
	{
		case 'thunk':
			var aArgs = a.args;
			var bArgs = b.args;
			var i = aArgs.length;
			var same = a.func === b.func && i === bArgs.length;
			while (same && i--)
			{
				same = aArgs[i] === bArgs[i];
			}
			if (same)
			{
				b.node = a.node;
				return;
			}
			b.node = b.thunk();
			var subPatches = [];
			diffHelp(a.node, b.node, subPatches, 0);
			if (subPatches.length > 0)
			{
				patches.push(makePatch('p-thunk', index, subPatches));
			}
			return;

		case 'tagger':
			// gather nested taggers
			var aTaggers = a.tagger;
			var bTaggers = b.tagger;
			var nesting = false;

			var aSubNode = a.node;
			while (aSubNode.type === 'tagger')
			{
				nesting = true;

				typeof aTaggers !== 'object'
					? aTaggers = [aTaggers, aSubNode.tagger]
					: aTaggers.push(aSubNode.tagger);

				aSubNode = aSubNode.node;
			}

			var bSubNode = b.node;
			while (bSubNode.type === 'tagger')
			{
				nesting = true;

				typeof bTaggers !== 'object'
					? bTaggers = [bTaggers, bSubNode.tagger]
					: bTaggers.push(bSubNode.tagger);

				bSubNode = bSubNode.node;
			}

			// Just bail if different numbers of taggers. This implies the
			// structure of the virtual DOM has changed.
			if (nesting && aTaggers.length !== bTaggers.length)
			{
				patches.push(makePatch('p-redraw', index, b));
				return;
			}

			// check if taggers are "the same"
			if (nesting ? !pairwiseRefEqual(aTaggers, bTaggers) : aTaggers !== bTaggers)
			{
				patches.push(makePatch('p-tagger', index, bTaggers));
			}

			// diff everything below the taggers
			diffHelp(aSubNode, bSubNode, patches, index + 1);
			return;

		case 'text':
			if (a.text !== b.text)
			{
				patches.push(makePatch('p-text', index, b.text));
				return;
			}

			return;

		case 'node':
			// Bail if obvious indicators have changed. Implies more serious
			// structural changes such that it's not worth it to diff.
			if (a.tag !== b.tag || a.namespace !== b.namespace)
			{
				patches.push(makePatch('p-redraw', index, b));
				return;
			}

			var factsDiff = diffFacts(a.facts, b.facts);

			if (typeof factsDiff !== 'undefined')
			{
				patches.push(makePatch('p-facts', index, factsDiff));
			}

			diffChildren(a, b, patches, index);
			return;

		case 'keyed-node':
			// Bail if obvious indicators have changed. Implies more serious
			// structural changes such that it's not worth it to diff.
			if (a.tag !== b.tag || a.namespace !== b.namespace)
			{
				patches.push(makePatch('p-redraw', index, b));
				return;
			}

			var factsDiff = diffFacts(a.facts, b.facts);

			if (typeof factsDiff !== 'undefined')
			{
				patches.push(makePatch('p-facts', index, factsDiff));
			}

			diffKeyedChildren(a, b, patches, index);
			return;

		case 'custom':
			if (a.impl !== b.impl)
			{
				patches.push(makePatch('p-redraw', index, b));
				return;
			}

			var factsDiff = diffFacts(a.facts, b.facts);
			if (typeof factsDiff !== 'undefined')
			{
				patches.push(makePatch('p-facts', index, factsDiff));
			}

			var patch = b.impl.diff(a,b);
			if (patch)
			{
				patches.push(makePatch('p-custom', index, patch));
				return;
			}

			return;
	}
}


// assumes the incoming arrays are the same length
function pairwiseRefEqual(as, bs)
{
	for (var i = 0; i < as.length; i++)
	{
		if (as[i] !== bs[i])
		{
			return false;
		}
	}

	return true;
}


// TODO Instead of creating a new diff object, it's possible to just test if
// there *is* a diff. During the actual patch, do the diff again and make the
// modifications directly. This way, there's no new allocations. Worth it?
function diffFacts(a, b, category)
{
	var diff;

	// look for changes and removals
	for (var aKey in a)
	{
		if (aKey === STYLE_KEY || aKey === EVENT_KEY || aKey === ATTR_KEY || aKey === ATTR_NS_KEY)
		{
			var subDiff = diffFacts(a[aKey], b[aKey] || {}, aKey);
			if (subDiff)
			{
				diff = diff || {};
				diff[aKey] = subDiff;
			}
			continue;
		}

		// remove if not in the new facts
		if (!(aKey in b))
		{
			diff = diff || {};
			diff[aKey] =
				(typeof category === 'undefined')
					? (typeof a[aKey] === 'string' ? '' : null)
					:
				(category === STYLE_KEY)
					? ''
					:
				(category === EVENT_KEY || category === ATTR_KEY)
					? undefined
					:
				{ namespace: a[aKey].namespace, value: undefined };

			continue;
		}

		var aValue = a[aKey];
		var bValue = b[aKey];

		// reference equal, so don't worry about it
		if (aValue === bValue && aKey !== 'value'
			|| category === EVENT_KEY && equalEvents(aValue, bValue))
		{
			continue;
		}

		diff = diff || {};
		diff[aKey] = bValue;
	}

	// add new stuff
	for (var bKey in b)
	{
		if (!(bKey in a))
		{
			diff = diff || {};
			diff[bKey] = b[bKey];
		}
	}

	return diff;
}


function diffChildren(aParent, bParent, patches, rootIndex)
{
	var aChildren = aParent.children;
	var bChildren = bParent.children;

	var aLen = aChildren.length;
	var bLen = bChildren.length;

	// FIGURE OUT IF THERE ARE INSERTS OR REMOVALS

	if (aLen > bLen)
	{
		patches.push(makePatch('p-remove-last', rootIndex, aLen - bLen));
	}
	else if (aLen < bLen)
	{
		patches.push(makePatch('p-append', rootIndex, bChildren.slice(aLen)));
	}

	// PAIRWISE DIFF EVERYTHING ELSE

	var index = rootIndex;
	var minLen = aLen < bLen ? aLen : bLen;
	for (var i = 0; i < minLen; i++)
	{
		index++;
		var aChild = aChildren[i];
		diffHelp(aChild, bChildren[i], patches, index);
		index += aChild.descendantsCount || 0;
	}
}



////////////  KEYED DIFF  ////////////


function diffKeyedChildren(aParent, bParent, patches, rootIndex)
{
	var localPatches = [];

	var changes = {}; // Dict String Entry
	var inserts = []; // Array { index : Int, entry : Entry }
	// type Entry = { tag : String, vnode : VNode, index : Int, data : _ }

	var aChildren = aParent.children;
	var bChildren = bParent.children;
	var aLen = aChildren.length;
	var bLen = bChildren.length;
	var aIndex = 0;
	var bIndex = 0;

	var index = rootIndex;

	while (aIndex < aLen && bIndex < bLen)
	{
		var a = aChildren[aIndex];
		var b = bChildren[bIndex];

		var aKey = a._0;
		var bKey = b._0;
		var aNode = a._1;
		var bNode = b._1;

		// check if keys match

		if (aKey === bKey)
		{
			index++;
			diffHelp(aNode, bNode, localPatches, index);
			index += aNode.descendantsCount || 0;

			aIndex++;
			bIndex++;
			continue;
		}

		// look ahead 1 to detect insertions and removals.

		var aLookAhead = aIndex + 1 < aLen;
		var bLookAhead = bIndex + 1 < bLen;

		if (aLookAhead)
		{
			var aNext = aChildren[aIndex + 1];
			var aNextKey = aNext._0;
			var aNextNode = aNext._1;
			var oldMatch = bKey === aNextKey;
		}

		if (bLookAhead)
		{
			var bNext = bChildren[bIndex + 1];
			var bNextKey = bNext._0;
			var bNextNode = bNext._1;
			var newMatch = aKey === bNextKey;
		}


		// swap a and b
		if (aLookAhead && bLookAhead && newMatch && oldMatch)
		{
			index++;
			diffHelp(aNode, bNextNode, localPatches, index);
			insertNode(changes, localPatches, aKey, bNode, bIndex, inserts);
			index += aNode.descendantsCount || 0;

			index++;
			removeNode(changes, localPatches, aKey, aNextNode, index);
			index += aNextNode.descendantsCount || 0;

			aIndex += 2;
			bIndex += 2;
			continue;
		}

		// insert b
		if (bLookAhead && newMatch)
		{
			index++;
			insertNode(changes, localPatches, bKey, bNode, bIndex, inserts);
			diffHelp(aNode, bNextNode, localPatches, index);
			index += aNode.descendantsCount || 0;

			aIndex += 1;
			bIndex += 2;
			continue;
		}

		// remove a
		if (aLookAhead && oldMatch)
		{
			index++;
			removeNode(changes, localPatches, aKey, aNode, index);
			index += aNode.descendantsCount || 0;

			index++;
			diffHelp(aNextNode, bNode, localPatches, index);
			index += aNextNode.descendantsCount || 0;

			aIndex += 2;
			bIndex += 1;
			continue;
		}

		// remove a, insert b
		if (aLookAhead && bLookAhead && aNextKey === bNextKey)
		{
			index++;
			removeNode(changes, localPatches, aKey, aNode, index);
			insertNode(changes, localPatches, bKey, bNode, bIndex, inserts);
			index += aNode.descendantsCount || 0;

			index++;
			diffHelp(aNextNode, bNextNode, localPatches, index);
			index += aNextNode.descendantsCount || 0;

			aIndex += 2;
			bIndex += 2;
			continue;
		}

		break;
	}

	// eat up any remaining nodes with removeNode and insertNode

	while (aIndex < aLen)
	{
		index++;
		var a = aChildren[aIndex];
		var aNode = a._1;
		removeNode(changes, localPatches, a._0, aNode, index);
		index += aNode.descendantsCount || 0;
		aIndex++;
	}

	var endInserts;
	while (bIndex < bLen)
	{
		endInserts = endInserts || [];
		var b = bChildren[bIndex];
		insertNode(changes, localPatches, b._0, b._1, undefined, endInserts);
		bIndex++;
	}

	if (localPatches.length > 0 || inserts.length > 0 || typeof endInserts !== 'undefined')
	{
		patches.push(makePatch('p-reorder', rootIndex, {
			patches: localPatches,
			inserts: inserts,
			endInserts: endInserts
		}));
	}
}



////////////  CHANGES FROM KEYED DIFF  ////////////


var POSTFIX = '_elmW6BL';


function insertNode(changes, localPatches, key, vnode, bIndex, inserts)
{
	var entry = changes[key];

	// never seen this key before
	if (typeof entry === 'undefined')
	{
		entry = {
			tag: 'insert',
			vnode: vnode,
			index: bIndex,
			data: undefined
		};

		inserts.push({ index: bIndex, entry: entry });
		changes[key] = entry;

		return;
	}

	// this key was removed earlier, a match!
	if (entry.tag === 'remove')
	{
		inserts.push({ index: bIndex, entry: entry });

		entry.tag = 'move';
		var subPatches = [];
		diffHelp(entry.vnode, vnode, subPatches, entry.index);
		entry.index = bIndex;
		entry.data.data = {
			patches: subPatches,
			entry: entry
		};

		return;
	}

	// this key has already been inserted or moved, a duplicate!
	insertNode(changes, localPatches, key + POSTFIX, vnode, bIndex, inserts);
}


function removeNode(changes, localPatches, key, vnode, index)
{
	var entry = changes[key];

	// never seen this key before
	if (typeof entry === 'undefined')
	{
		var patch = makePatch('p-remove', index, undefined);
		localPatches.push(patch);

		changes[key] = {
			tag: 'remove',
			vnode: vnode,
			index: index,
			data: patch
		};

		return;
	}

	// this key was inserted earlier, a match!
	if (entry.tag === 'insert')
	{
		entry.tag = 'move';
		var subPatches = [];
		diffHelp(vnode, entry.vnode, subPatches, index);

		var patch = makePatch('p-remove', index, {
			patches: subPatches,
			entry: entry
		});
		localPatches.push(patch);

		return;
	}

	// this key has already been removed or moved, a duplicate!
	removeNode(changes, localPatches, key + POSTFIX, vnode, index);
}



////////////  ADD DOM NODES  ////////////
//
// Each DOM node has an "index" assigned in order of traversal. It is important
// to minimize our crawl over the actual DOM, so these indexes (along with the
// descendantsCount of virtual nodes) let us skip touching entire subtrees of
// the DOM if we know there are no patches there.


function addDomNodes(domNode, vNode, patches, eventNode)
{
	addDomNodesHelp(domNode, vNode, patches, 0, 0, vNode.descendantsCount, eventNode);
}


// assumes `patches` is non-empty and indexes increase monotonically.
function addDomNodesHelp(domNode, vNode, patches, i, low, high, eventNode)
{
	var patch = patches[i];
	var index = patch.index;

	while (index === low)
	{
		var patchType = patch.type;

		if (patchType === 'p-thunk')
		{
			addDomNodes(domNode, vNode.node, patch.data, eventNode);
		}
		else if (patchType === 'p-reorder')
		{
			patch.domNode = domNode;
			patch.eventNode = eventNode;

			var subPatches = patch.data.patches;
			if (subPatches.length > 0)
			{
				addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
			}
		}
		else if (patchType === 'p-remove')
		{
			patch.domNode = domNode;
			patch.eventNode = eventNode;

			var data = patch.data;
			if (typeof data !== 'undefined')
			{
				data.entry.data = domNode;
				var subPatches = data.patches;
				if (subPatches.length > 0)
				{
					addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
				}
			}
		}
		else
		{
			patch.domNode = domNode;
			patch.eventNode = eventNode;
		}

		i++;

		if (!(patch = patches[i]) || (index = patch.index) > high)
		{
			return i;
		}
	}

	switch (vNode.type)
	{
		case 'tagger':
			var subNode = vNode.node;

			while (subNode.type === "tagger")
			{
				subNode = subNode.node;
			}

			return addDomNodesHelp(domNode, subNode, patches, i, low + 1, high, domNode.elm_event_node_ref);

		case 'node':
			var vChildren = vNode.children;
			var childNodes = domNode.childNodes;
			for (var j = 0; j < vChildren.length; j++)
			{
				low++;
				var vChild = vChildren[j];
				var nextLow = low + (vChild.descendantsCount || 0);
				if (low <= index && index <= nextLow)
				{
					i = addDomNodesHelp(childNodes[j], vChild, patches, i, low, nextLow, eventNode);
					if (!(patch = patches[i]) || (index = patch.index) > high)
					{
						return i;
					}
				}
				low = nextLow;
			}
			return i;

		case 'keyed-node':
			var vChildren = vNode.children;
			var childNodes = domNode.childNodes;
			for (var j = 0; j < vChildren.length; j++)
			{
				low++;
				var vChild = vChildren[j]._1;
				var nextLow = low + (vChild.descendantsCount || 0);
				if (low <= index && index <= nextLow)
				{
					i = addDomNodesHelp(childNodes[j], vChild, patches, i, low, nextLow, eventNode);
					if (!(patch = patches[i]) || (index = patch.index) > high)
					{
						return i;
					}
				}
				low = nextLow;
			}
			return i;

		case 'text':
		case 'thunk':
			throw new Error('should never traverse `text` or `thunk` nodes like this');
	}
}



////////////  APPLY PATCHES  ////////////


function applyPatches(rootDomNode, oldVirtualNode, patches, eventNode)
{
	if (patches.length === 0)
	{
		return rootDomNode;
	}

	addDomNodes(rootDomNode, oldVirtualNode, patches, eventNode);
	return applyPatchesHelp(rootDomNode, patches);
}

function applyPatchesHelp(rootDomNode, patches)
{
	for (var i = 0; i < patches.length; i++)
	{
		var patch = patches[i];
		var localDomNode = patch.domNode
		var newNode = applyPatch(localDomNode, patch);
		if (localDomNode === rootDomNode)
		{
			rootDomNode = newNode;
		}
	}
	return rootDomNode;
}

function applyPatch(domNode, patch)
{
	switch (patch.type)
	{
		case 'p-redraw':
			return applyPatchRedraw(domNode, patch.data, patch.eventNode);

		case 'p-facts':
			applyFacts(domNode, patch.eventNode, patch.data);
			return domNode;

		case 'p-text':
			domNode.replaceData(0, domNode.length, patch.data);
			return domNode;

		case 'p-thunk':
			return applyPatchesHelp(domNode, patch.data);

		case 'p-tagger':
			if (typeof domNode.elm_event_node_ref !== 'undefined')
			{
				domNode.elm_event_node_ref.tagger = patch.data;
			}
			else
			{
				domNode.elm_event_node_ref = { tagger: patch.data, parent: patch.eventNode };
			}
			return domNode;

		case 'p-remove-last':
			var i = patch.data;
			while (i--)
			{
				domNode.removeChild(domNode.lastChild);
			}
			return domNode;

		case 'p-append':
			var newNodes = patch.data;
			for (var i = 0; i < newNodes.length; i++)
			{
				domNode.appendChild(render(newNodes[i], patch.eventNode));
			}
			return domNode;

		case 'p-remove':
			var data = patch.data;
			if (typeof data === 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
				return domNode;
			}
			var entry = data.entry;
			if (typeof entry.index !== 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
			}
			entry.data = applyPatchesHelp(domNode, data.patches);
			return domNode;

		case 'p-reorder':
			return applyPatchReorder(domNode, patch);

		case 'p-custom':
			var impl = patch.data;
			return impl.applyPatch(domNode, impl.data);

		default:
			throw new Error('Ran into an unknown patch!');
	}
}


function applyPatchRedraw(domNode, vNode, eventNode)
{
	var parentNode = domNode.parentNode;
	var newNode = render(vNode, eventNode);

	if (typeof newNode.elm_event_node_ref === 'undefined')
	{
		newNode.elm_event_node_ref = domNode.elm_event_node_ref;
	}

	if (parentNode && newNode !== domNode)
	{
		parentNode.replaceChild(newNode, domNode);
	}
	return newNode;
}


function applyPatchReorder(domNode, patch)
{
	var data = patch.data;

	// remove end inserts
	var frag = applyPatchReorderEndInsertsHelp(data.endInserts, patch);

	// removals
	domNode = applyPatchesHelp(domNode, data.patches);

	// inserts
	var inserts = data.inserts;
	for (var i = 0; i < inserts.length; i++)
	{
		var insert = inserts[i];
		var entry = insert.entry;
		var node = entry.tag === 'move'
			? entry.data
			: render(entry.vnode, patch.eventNode);
		domNode.insertBefore(node, domNode.childNodes[insert.index]);
	}

	// add end inserts
	if (typeof frag !== 'undefined')
	{
		domNode.appendChild(frag);
	}

	return domNode;
}


function applyPatchReorderEndInsertsHelp(endInserts, patch)
{
	if (typeof endInserts === 'undefined')
	{
		return;
	}

	var frag = localDoc.createDocumentFragment();
	for (var i = 0; i < endInserts.length; i++)
	{
		var insert = endInserts[i];
		var entry = insert.entry;
		frag.appendChild(entry.tag === 'move'
			? entry.data
			: render(entry.vnode, patch.eventNode)
		);
	}
	return frag;
}


// PROGRAMS

var program = makeProgram(checkNoFlags);
var programWithFlags = makeProgram(checkYesFlags);

function makeProgram(flagChecker)
{
	return F2(function(debugWrap, impl)
	{
		return function(flagDecoder)
		{
			return function(object, moduleName, debugMetadata)
			{
				var checker = flagChecker(flagDecoder, moduleName);
				if (typeof debugMetadata === 'undefined')
				{
					normalSetup(impl, object, moduleName, checker);
				}
				else
				{
					debugSetup(A2(debugWrap, debugMetadata, impl), object, moduleName, checker);
				}
			};
		};
	});
}

function staticProgram(vNode)
{
	var nothing = _elm_lang$core$Native_Utils.Tuple2(
		_elm_lang$core$Native_Utils.Tuple0,
		_elm_lang$core$Platform_Cmd$none
	);
	return A2(program, _elm_lang$virtual_dom$VirtualDom_Debug$wrap, {
		init: nothing,
		view: function() { return vNode; },
		update: F2(function() { return nothing; }),
		subscriptions: function() { return _elm_lang$core$Platform_Sub$none; }
	})();
}


// FLAG CHECKERS

function checkNoFlags(flagDecoder, moduleName)
{
	return function(init, flags, domNode)
	{
		if (typeof flags === 'undefined')
		{
			return init;
		}

		var errorMessage =
			'The `' + moduleName + '` module does not need flags.\n'
			+ 'Initialize it with no arguments and you should be all set!';

		crash(errorMessage, domNode);
	};
}

function checkYesFlags(flagDecoder, moduleName)
{
	return function(init, flags, domNode)
	{
		if (typeof flagDecoder === 'undefined')
		{
			var errorMessage =
				'Are you trying to sneak a Never value into Elm? Trickster!\n'
				+ 'It looks like ' + moduleName + '.main is defined with `programWithFlags` but has type `Program Never`.\n'
				+ 'Use `program` instead if you do not want flags.'

			crash(errorMessage, domNode);
		}

		var result = A2(_elm_lang$core$Native_Json.run, flagDecoder, flags);
		if (result.ctor === 'Ok')
		{
			return init(result._0);
		}

		var errorMessage =
			'Trying to initialize the `' + moduleName + '` module with an unexpected flag.\n'
			+ 'I tried to convert it to an Elm value, but ran into this problem:\n\n'
			+ result._0;

		crash(errorMessage, domNode);
	};
}

function crash(errorMessage, domNode)
{
	if (domNode)
	{
		domNode.innerHTML =
			'<div style="padding-left:1em;">'
			+ '<h2 style="font-weight:normal;"><b>Oops!</b> Something went wrong when starting your Elm program.</h2>'
			+ '<pre style="padding-left:1em;">' + errorMessage + '</pre>'
			+ '</div>';
	}

	throw new Error(errorMessage);
}


//  NORMAL SETUP

function normalSetup(impl, object, moduleName, flagChecker)
{
	object['embed'] = function embed(node, flags)
	{
		while (node.lastChild)
		{
			node.removeChild(node.lastChild);
		}

		return _elm_lang$core$Native_Platform.initialize(
			flagChecker(impl.init, flags, node),
			impl.update,
			impl.subscriptions,
			normalRenderer(node, impl.view)
		);
	};

	object['fullscreen'] = function fullscreen(flags)
	{
		return _elm_lang$core$Native_Platform.initialize(
			flagChecker(impl.init, flags, document.body),
			impl.update,
			impl.subscriptions,
			normalRenderer(document.body, impl.view)
		);
	};
}

function normalRenderer(parentNode, view)
{
	return function(tagger, initialModel)
	{
		var eventNode = { tagger: tagger, parent: undefined };
		var initialVirtualNode = view(initialModel);
		var domNode = render(initialVirtualNode, eventNode);
		parentNode.appendChild(domNode);
		return makeStepper(domNode, view, initialVirtualNode, eventNode);
	};
}


// STEPPER

var rAF =
	typeof requestAnimationFrame !== 'undefined'
		? requestAnimationFrame
		: function(callback) { setTimeout(callback, 1000 / 60); };

function makeStepper(domNode, view, initialVirtualNode, eventNode)
{
	var state = 'NO_REQUEST';
	var currNode = initialVirtualNode;
	var nextModel;

	function updateIfNeeded()
	{
		switch (state)
		{
			case 'NO_REQUEST':
				throw new Error(
					'Unexpected draw callback.\n' +
					'Please report this to <https://github.com/elm-lang/virtual-dom/issues>.'
				);

			case 'PENDING_REQUEST':
				rAF(updateIfNeeded);
				state = 'EXTRA_REQUEST';

				var nextNode = view(nextModel);
				var patches = diff(currNode, nextNode);
				domNode = applyPatches(domNode, currNode, patches, eventNode);
				currNode = nextNode;

				return;

			case 'EXTRA_REQUEST':
				state = 'NO_REQUEST';
				return;
		}
	}

	return function stepper(model)
	{
		if (state === 'NO_REQUEST')
		{
			rAF(updateIfNeeded);
		}
		state = 'PENDING_REQUEST';
		nextModel = model;
	};
}


// DEBUG SETUP

function debugSetup(impl, object, moduleName, flagChecker)
{
	object['fullscreen'] = function fullscreen(flags)
	{
		var popoutRef = { doc: undefined };
		return _elm_lang$core$Native_Platform.initialize(
			flagChecker(impl.init, flags, document.body),
			impl.update(scrollTask(popoutRef)),
			impl.subscriptions,
			debugRenderer(moduleName, document.body, popoutRef, impl.view, impl.viewIn, impl.viewOut)
		);
	};

	object['embed'] = function fullscreen(node, flags)
	{
		var popoutRef = { doc: undefined };
		return _elm_lang$core$Native_Platform.initialize(
			flagChecker(impl.init, flags, node),
			impl.update(scrollTask(popoutRef)),
			impl.subscriptions,
			debugRenderer(moduleName, node, popoutRef, impl.view, impl.viewIn, impl.viewOut)
		);
	};
}

function scrollTask(popoutRef)
{
	return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback)
	{
		var doc = popoutRef.doc;
		if (doc)
		{
			var msgs = doc.getElementsByClassName('debugger-sidebar-messages')[0];
			if (msgs)
			{
				msgs.scrollTop = msgs.scrollHeight;
			}
		}
		callback(_elm_lang$core$Native_Scheduler.succeed(_elm_lang$core$Native_Utils.Tuple0));
	});
}


function debugRenderer(moduleName, parentNode, popoutRef, view, viewIn, viewOut)
{
	return function(tagger, initialModel)
	{
		var appEventNode = { tagger: tagger, parent: undefined };
		var eventNode = { tagger: tagger, parent: undefined };

		// make normal stepper
		var appVirtualNode = view(initialModel);
		var appNode = render(appVirtualNode, appEventNode);
		parentNode.appendChild(appNode);
		var appStepper = makeStepper(appNode, view, appVirtualNode, appEventNode);

		// make overlay stepper
		var overVirtualNode = viewIn(initialModel)._1;
		var overNode = render(overVirtualNode, eventNode);
		parentNode.appendChild(overNode);
		var wrappedViewIn = wrapViewIn(appEventNode, overNode, viewIn);
		var overStepper = makeStepper(overNode, wrappedViewIn, overVirtualNode, eventNode);

		// make debugger stepper
		var debugStepper = makeDebugStepper(initialModel, viewOut, eventNode, parentNode, moduleName, popoutRef);

		return function stepper(model)
		{
			appStepper(model);
			overStepper(model);
			debugStepper(model);
		}
	};
}

function makeDebugStepper(initialModel, view, eventNode, parentNode, moduleName, popoutRef)
{
	var curr;
	var domNode;

	return function stepper(model)
	{
		if (!model.isDebuggerOpen)
		{
			return;
		}

		if (!popoutRef.doc)
		{
			curr = view(model);
			domNode = openDebugWindow(moduleName, popoutRef, curr, eventNode);
			return;
		}

		// switch to document of popout
		localDoc = popoutRef.doc;

		var next = view(model);
		var patches = diff(curr, next);
		domNode = applyPatches(domNode, curr, patches, eventNode);
		curr = next;

		// switch back to normal document
		localDoc = document;
	};
}

function openDebugWindow(moduleName, popoutRef, virtualNode, eventNode)
{
	var w = 900;
	var h = 360;
	var x = screen.width - w;
	var y = screen.height - h;
	var debugWindow = window.open('', '', 'width=' + w + ',height=' + h + ',left=' + x + ',top=' + y);

	// switch to window document
	localDoc = debugWindow.document;

	popoutRef.doc = localDoc;
	localDoc.title = 'Debugger - ' + moduleName;
	localDoc.body.style.margin = '0';
	localDoc.body.style.padding = '0';
	var domNode = render(virtualNode, eventNode);
	localDoc.body.appendChild(domNode);

	localDoc.addEventListener('keydown', function(event) {
		if (event.metaKey && event.which === 82)
		{
			window.location.reload();
		}
		if (event.which === 38)
		{
			eventNode.tagger({ ctor: 'Up' });
			event.preventDefault();
		}
		if (event.which === 40)
		{
			eventNode.tagger({ ctor: 'Down' });
			event.preventDefault();
		}
	});

	function close()
	{
		popoutRef.doc = undefined;
		debugWindow.close();
	}
	window.addEventListener('unload', close);
	debugWindow.addEventListener('unload', function() {
		popoutRef.doc = undefined;
		window.removeEventListener('unload', close);
		eventNode.tagger({ ctor: 'Close' });
	});

	// switch back to the normal document
	localDoc = document;

	return domNode;
}


// BLOCK EVENTS

function wrapViewIn(appEventNode, overlayNode, viewIn)
{
	var ignorer = makeIgnorer(overlayNode);
	var blocking = 'Normal';
	var overflow;

	var normalTagger = appEventNode.tagger;
	var blockTagger = function() {};

	return function(model)
	{
		var tuple = viewIn(model);
		var newBlocking = tuple._0.ctor;
		appEventNode.tagger = newBlocking === 'Normal' ? normalTagger : blockTagger;
		if (blocking !== newBlocking)
		{
			traverse('removeEventListener', ignorer, blocking);
			traverse('addEventListener', ignorer, newBlocking);

			if (blocking === 'Normal')
			{
				overflow = document.body.style.overflow;
				document.body.style.overflow = 'hidden';
			}

			if (newBlocking === 'Normal')
			{
				document.body.style.overflow = overflow;
			}

			blocking = newBlocking;
		}
		return tuple._1;
	}
}

function traverse(verbEventListener, ignorer, blocking)
{
	switch(blocking)
	{
		case 'Normal':
			return;

		case 'Pause':
			return traverseHelp(verbEventListener, ignorer, mostEvents);

		case 'Message':
			return traverseHelp(verbEventListener, ignorer, allEvents);
	}
}

function traverseHelp(verbEventListener, handler, eventNames)
{
	for (var i = 0; i < eventNames.length; i++)
	{
		document.body[verbEventListener](eventNames[i], handler, true);
	}
}

function makeIgnorer(overlayNode)
{
	return function(event)
	{
		if (event.type === 'keydown' && event.metaKey && event.which === 82)
		{
			return;
		}

		var isScroll = event.type === 'scroll' || event.type === 'wheel';

		var node = event.target;
		while (node !== null)
		{
			if (node.className === 'elm-overlay-message-details' && isScroll)
			{
				return;
			}

			if (node === overlayNode && !isScroll)
			{
				return;
			}
			node = node.parentNode;
		}

		event.stopPropagation();
		event.preventDefault();
	}
}

var mostEvents = [
	'click', 'dblclick', 'mousemove',
	'mouseup', 'mousedown', 'mouseenter', 'mouseleave',
	'touchstart', 'touchend', 'touchcancel', 'touchmove',
	'pointerdown', 'pointerup', 'pointerover', 'pointerout',
	'pointerenter', 'pointerleave', 'pointermove', 'pointercancel',
	'dragstart', 'drag', 'dragend', 'dragenter', 'dragover', 'dragleave', 'drop',
	'keyup', 'keydown', 'keypress',
	'input', 'change',
	'focus', 'blur'
];

var allEvents = mostEvents.concat('wheel', 'scroll');


return {
	node: node,
	text: text,
	custom: custom,
	map: F2(map),

	on: F3(on),
	style: style,
	property: F2(property),
	attribute: F2(attribute),
	attributeNS: F3(attributeNS),
	mapProperty: F2(mapProperty),

	lazy: F2(lazy),
	lazy2: F3(lazy2),
	lazy3: F4(lazy3),
	keyedNode: F3(keyedNode),

	program: program,
	programWithFlags: programWithFlags,
	staticProgram: staticProgram
};

}();

var _elm_lang$virtual_dom$VirtualDom$programWithFlags = function (impl) {
	return A2(_elm_lang$virtual_dom$Native_VirtualDom.programWithFlags, _elm_lang$virtual_dom$VirtualDom_Debug$wrapWithFlags, impl);
};
var _elm_lang$virtual_dom$VirtualDom$program = function (impl) {
	return A2(_elm_lang$virtual_dom$Native_VirtualDom.program, _elm_lang$virtual_dom$VirtualDom_Debug$wrap, impl);
};
var _elm_lang$virtual_dom$VirtualDom$keyedNode = _elm_lang$virtual_dom$Native_VirtualDom.keyedNode;
var _elm_lang$virtual_dom$VirtualDom$lazy3 = _elm_lang$virtual_dom$Native_VirtualDom.lazy3;
var _elm_lang$virtual_dom$VirtualDom$lazy2 = _elm_lang$virtual_dom$Native_VirtualDom.lazy2;
var _elm_lang$virtual_dom$VirtualDom$lazy = _elm_lang$virtual_dom$Native_VirtualDom.lazy;
var _elm_lang$virtual_dom$VirtualDom$defaultOptions = {stopPropagation: false, preventDefault: false};
var _elm_lang$virtual_dom$VirtualDom$onWithOptions = _elm_lang$virtual_dom$Native_VirtualDom.on;
var _elm_lang$virtual_dom$VirtualDom$on = F2(
	function (eventName, decoder) {
		return A3(_elm_lang$virtual_dom$VirtualDom$onWithOptions, eventName, _elm_lang$virtual_dom$VirtualDom$defaultOptions, decoder);
	});
var _elm_lang$virtual_dom$VirtualDom$style = _elm_lang$virtual_dom$Native_VirtualDom.style;
var _elm_lang$virtual_dom$VirtualDom$mapProperty = _elm_lang$virtual_dom$Native_VirtualDom.mapProperty;
var _elm_lang$virtual_dom$VirtualDom$attributeNS = _elm_lang$virtual_dom$Native_VirtualDom.attributeNS;
var _elm_lang$virtual_dom$VirtualDom$attribute = _elm_lang$virtual_dom$Native_VirtualDom.attribute;
var _elm_lang$virtual_dom$VirtualDom$property = _elm_lang$virtual_dom$Native_VirtualDom.property;
var _elm_lang$virtual_dom$VirtualDom$map = _elm_lang$virtual_dom$Native_VirtualDom.map;
var _elm_lang$virtual_dom$VirtualDom$text = _elm_lang$virtual_dom$Native_VirtualDom.text;
var _elm_lang$virtual_dom$VirtualDom$node = _elm_lang$virtual_dom$Native_VirtualDom.node;
var _elm_lang$virtual_dom$VirtualDom$Options = F2(
	function (a, b) {
		return {stopPropagation: a, preventDefault: b};
	});
var _elm_lang$virtual_dom$VirtualDom$Node = {ctor: 'Node'};
var _elm_lang$virtual_dom$VirtualDom$Property = {ctor: 'Property'};

var _elm_lang$html$Html$programWithFlags = _elm_lang$virtual_dom$VirtualDom$programWithFlags;
var _elm_lang$html$Html$program = _elm_lang$virtual_dom$VirtualDom$program;
var _elm_lang$html$Html$beginnerProgram = function (_p0) {
	var _p1 = _p0;
	return _elm_lang$html$Html$program(
		{
			init: A2(
				_elm_lang$core$Platform_Cmd_ops['!'],
				_p1.model,
				{ctor: '[]'}),
			update: F2(
				function (msg, model) {
					return A2(
						_elm_lang$core$Platform_Cmd_ops['!'],
						A2(_p1.update, msg, model),
						{ctor: '[]'});
				}),
			view: _p1.view,
			subscriptions: function (_p2) {
				return _elm_lang$core$Platform_Sub$none;
			}
		});
};
var _elm_lang$html$Html$map = _elm_lang$virtual_dom$VirtualDom$map;
var _elm_lang$html$Html$text = _elm_lang$virtual_dom$VirtualDom$text;
var _elm_lang$html$Html$node = _elm_lang$virtual_dom$VirtualDom$node;
var _elm_lang$html$Html$body = _elm_lang$html$Html$node('body');
var _elm_lang$html$Html$section = _elm_lang$html$Html$node('section');
var _elm_lang$html$Html$nav = _elm_lang$html$Html$node('nav');
var _elm_lang$html$Html$article = _elm_lang$html$Html$node('article');
var _elm_lang$html$Html$aside = _elm_lang$html$Html$node('aside');
var _elm_lang$html$Html$h1 = _elm_lang$html$Html$node('h1');
var _elm_lang$html$Html$h2 = _elm_lang$html$Html$node('h2');
var _elm_lang$html$Html$h3 = _elm_lang$html$Html$node('h3');
var _elm_lang$html$Html$h4 = _elm_lang$html$Html$node('h4');
var _elm_lang$html$Html$h5 = _elm_lang$html$Html$node('h5');
var _elm_lang$html$Html$h6 = _elm_lang$html$Html$node('h6');
var _elm_lang$html$Html$header = _elm_lang$html$Html$node('header');
var _elm_lang$html$Html$footer = _elm_lang$html$Html$node('footer');
var _elm_lang$html$Html$address = _elm_lang$html$Html$node('address');
var _elm_lang$html$Html$main_ = _elm_lang$html$Html$node('main');
var _elm_lang$html$Html$p = _elm_lang$html$Html$node('p');
var _elm_lang$html$Html$hr = _elm_lang$html$Html$node('hr');
var _elm_lang$html$Html$pre = _elm_lang$html$Html$node('pre');
var _elm_lang$html$Html$blockquote = _elm_lang$html$Html$node('blockquote');
var _elm_lang$html$Html$ol = _elm_lang$html$Html$node('ol');
var _elm_lang$html$Html$ul = _elm_lang$html$Html$node('ul');
var _elm_lang$html$Html$li = _elm_lang$html$Html$node('li');
var _elm_lang$html$Html$dl = _elm_lang$html$Html$node('dl');
var _elm_lang$html$Html$dt = _elm_lang$html$Html$node('dt');
var _elm_lang$html$Html$dd = _elm_lang$html$Html$node('dd');
var _elm_lang$html$Html$figure = _elm_lang$html$Html$node('figure');
var _elm_lang$html$Html$figcaption = _elm_lang$html$Html$node('figcaption');
var _elm_lang$html$Html$div = _elm_lang$html$Html$node('div');
var _elm_lang$html$Html$a = _elm_lang$html$Html$node('a');
var _elm_lang$html$Html$em = _elm_lang$html$Html$node('em');
var _elm_lang$html$Html$strong = _elm_lang$html$Html$node('strong');
var _elm_lang$html$Html$small = _elm_lang$html$Html$node('small');
var _elm_lang$html$Html$s = _elm_lang$html$Html$node('s');
var _elm_lang$html$Html$cite = _elm_lang$html$Html$node('cite');
var _elm_lang$html$Html$q = _elm_lang$html$Html$node('q');
var _elm_lang$html$Html$dfn = _elm_lang$html$Html$node('dfn');
var _elm_lang$html$Html$abbr = _elm_lang$html$Html$node('abbr');
var _elm_lang$html$Html$time = _elm_lang$html$Html$node('time');
var _elm_lang$html$Html$code = _elm_lang$html$Html$node('code');
var _elm_lang$html$Html$var = _elm_lang$html$Html$node('var');
var _elm_lang$html$Html$samp = _elm_lang$html$Html$node('samp');
var _elm_lang$html$Html$kbd = _elm_lang$html$Html$node('kbd');
var _elm_lang$html$Html$sub = _elm_lang$html$Html$node('sub');
var _elm_lang$html$Html$sup = _elm_lang$html$Html$node('sup');
var _elm_lang$html$Html$i = _elm_lang$html$Html$node('i');
var _elm_lang$html$Html$b = _elm_lang$html$Html$node('b');
var _elm_lang$html$Html$u = _elm_lang$html$Html$node('u');
var _elm_lang$html$Html$mark = _elm_lang$html$Html$node('mark');
var _elm_lang$html$Html$ruby = _elm_lang$html$Html$node('ruby');
var _elm_lang$html$Html$rt = _elm_lang$html$Html$node('rt');
var _elm_lang$html$Html$rp = _elm_lang$html$Html$node('rp');
var _elm_lang$html$Html$bdi = _elm_lang$html$Html$node('bdi');
var _elm_lang$html$Html$bdo = _elm_lang$html$Html$node('bdo');
var _elm_lang$html$Html$span = _elm_lang$html$Html$node('span');
var _elm_lang$html$Html$br = _elm_lang$html$Html$node('br');
var _elm_lang$html$Html$wbr = _elm_lang$html$Html$node('wbr');
var _elm_lang$html$Html$ins = _elm_lang$html$Html$node('ins');
var _elm_lang$html$Html$del = _elm_lang$html$Html$node('del');
var _elm_lang$html$Html$img = _elm_lang$html$Html$node('img');
var _elm_lang$html$Html$iframe = _elm_lang$html$Html$node('iframe');
var _elm_lang$html$Html$embed = _elm_lang$html$Html$node('embed');
var _elm_lang$html$Html$object = _elm_lang$html$Html$node('object');
var _elm_lang$html$Html$param = _elm_lang$html$Html$node('param');
var _elm_lang$html$Html$video = _elm_lang$html$Html$node('video');
var _elm_lang$html$Html$audio = _elm_lang$html$Html$node('audio');
var _elm_lang$html$Html$source = _elm_lang$html$Html$node('source');
var _elm_lang$html$Html$track = _elm_lang$html$Html$node('track');
var _elm_lang$html$Html$canvas = _elm_lang$html$Html$node('canvas');
var _elm_lang$html$Html$math = _elm_lang$html$Html$node('math');
var _elm_lang$html$Html$table = _elm_lang$html$Html$node('table');
var _elm_lang$html$Html$caption = _elm_lang$html$Html$node('caption');
var _elm_lang$html$Html$colgroup = _elm_lang$html$Html$node('colgroup');
var _elm_lang$html$Html$col = _elm_lang$html$Html$node('col');
var _elm_lang$html$Html$tbody = _elm_lang$html$Html$node('tbody');
var _elm_lang$html$Html$thead = _elm_lang$html$Html$node('thead');
var _elm_lang$html$Html$tfoot = _elm_lang$html$Html$node('tfoot');
var _elm_lang$html$Html$tr = _elm_lang$html$Html$node('tr');
var _elm_lang$html$Html$td = _elm_lang$html$Html$node('td');
var _elm_lang$html$Html$th = _elm_lang$html$Html$node('th');
var _elm_lang$html$Html$form = _elm_lang$html$Html$node('form');
var _elm_lang$html$Html$fieldset = _elm_lang$html$Html$node('fieldset');
var _elm_lang$html$Html$legend = _elm_lang$html$Html$node('legend');
var _elm_lang$html$Html$label = _elm_lang$html$Html$node('label');
var _elm_lang$html$Html$input = _elm_lang$html$Html$node('input');
var _elm_lang$html$Html$button = _elm_lang$html$Html$node('button');
var _elm_lang$html$Html$select = _elm_lang$html$Html$node('select');
var _elm_lang$html$Html$datalist = _elm_lang$html$Html$node('datalist');
var _elm_lang$html$Html$optgroup = _elm_lang$html$Html$node('optgroup');
var _elm_lang$html$Html$option = _elm_lang$html$Html$node('option');
var _elm_lang$html$Html$textarea = _elm_lang$html$Html$node('textarea');
var _elm_lang$html$Html$keygen = _elm_lang$html$Html$node('keygen');
var _elm_lang$html$Html$output = _elm_lang$html$Html$node('output');
var _elm_lang$html$Html$progress = _elm_lang$html$Html$node('progress');
var _elm_lang$html$Html$meter = _elm_lang$html$Html$node('meter');
var _elm_lang$html$Html$details = _elm_lang$html$Html$node('details');
var _elm_lang$html$Html$summary = _elm_lang$html$Html$node('summary');
var _elm_lang$html$Html$menuitem = _elm_lang$html$Html$node('menuitem');
var _elm_lang$html$Html$menu = _elm_lang$html$Html$node('menu');

var _elm_lang$html$Html_Attributes$map = _elm_lang$virtual_dom$VirtualDom$mapProperty;
var _elm_lang$html$Html_Attributes$attribute = _elm_lang$virtual_dom$VirtualDom$attribute;
var _elm_lang$html$Html_Attributes$contextmenu = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'contextmenu', value);
};
var _elm_lang$html$Html_Attributes$draggable = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'draggable', value);
};
var _elm_lang$html$Html_Attributes$itemprop = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'itemprop', value);
};
var _elm_lang$html$Html_Attributes$tabindex = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'tabIndex',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$charset = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'charset', value);
};
var _elm_lang$html$Html_Attributes$height = function (value) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'height',
		_elm_lang$core$Basics$toString(value));
};
var _elm_lang$html$Html_Attributes$width = function (value) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'width',
		_elm_lang$core$Basics$toString(value));
};
var _elm_lang$html$Html_Attributes$formaction = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'formAction', value);
};
var _elm_lang$html$Html_Attributes$list = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'list', value);
};
var _elm_lang$html$Html_Attributes$minlength = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'minLength',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$maxlength = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'maxlength',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$size = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'size',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$form = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'form', value);
};
var _elm_lang$html$Html_Attributes$cols = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'cols',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$rows = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'rows',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$challenge = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'challenge', value);
};
var _elm_lang$html$Html_Attributes$media = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'media', value);
};
var _elm_lang$html$Html_Attributes$rel = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'rel', value);
};
var _elm_lang$html$Html_Attributes$datetime = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'datetime', value);
};
var _elm_lang$html$Html_Attributes$pubdate = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'pubdate', value);
};
var _elm_lang$html$Html_Attributes$colspan = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'colspan',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$rowspan = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'rowspan',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$manifest = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'manifest', value);
};
var _elm_lang$html$Html_Attributes$property = _elm_lang$virtual_dom$VirtualDom$property;
var _elm_lang$html$Html_Attributes$stringProperty = F2(
	function (name, string) {
		return A2(
			_elm_lang$html$Html_Attributes$property,
			name,
			_elm_lang$core$Json_Encode$string(string));
	});
var _elm_lang$html$Html_Attributes$class = function (name) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'className', name);
};
var _elm_lang$html$Html_Attributes$id = function (name) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'id', name);
};
var _elm_lang$html$Html_Attributes$title = function (name) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'title', name);
};
var _elm_lang$html$Html_Attributes$accesskey = function ($char) {
	return A2(
		_elm_lang$html$Html_Attributes$stringProperty,
		'accessKey',
		_elm_lang$core$String$fromChar($char));
};
var _elm_lang$html$Html_Attributes$dir = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'dir', value);
};
var _elm_lang$html$Html_Attributes$dropzone = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'dropzone', value);
};
var _elm_lang$html$Html_Attributes$lang = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'lang', value);
};
var _elm_lang$html$Html_Attributes$content = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'content', value);
};
var _elm_lang$html$Html_Attributes$httpEquiv = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'httpEquiv', value);
};
var _elm_lang$html$Html_Attributes$language = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'language', value);
};
var _elm_lang$html$Html_Attributes$src = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'src', value);
};
var _elm_lang$html$Html_Attributes$alt = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'alt', value);
};
var _elm_lang$html$Html_Attributes$preload = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'preload', value);
};
var _elm_lang$html$Html_Attributes$poster = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'poster', value);
};
var _elm_lang$html$Html_Attributes$kind = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'kind', value);
};
var _elm_lang$html$Html_Attributes$srclang = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'srclang', value);
};
var _elm_lang$html$Html_Attributes$sandbox = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'sandbox', value);
};
var _elm_lang$html$Html_Attributes$srcdoc = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'srcdoc', value);
};
var _elm_lang$html$Html_Attributes$type_ = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'type', value);
};
var _elm_lang$html$Html_Attributes$value = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'value', value);
};
var _elm_lang$html$Html_Attributes$defaultValue = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'defaultValue', value);
};
var _elm_lang$html$Html_Attributes$placeholder = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'placeholder', value);
};
var _elm_lang$html$Html_Attributes$accept = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'accept', value);
};
var _elm_lang$html$Html_Attributes$acceptCharset = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'acceptCharset', value);
};
var _elm_lang$html$Html_Attributes$action = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'action', value);
};
var _elm_lang$html$Html_Attributes$autocomplete = function (bool) {
	return A2(
		_elm_lang$html$Html_Attributes$stringProperty,
		'autocomplete',
		bool ? 'on' : 'off');
};
var _elm_lang$html$Html_Attributes$enctype = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'enctype', value);
};
var _elm_lang$html$Html_Attributes$method = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'method', value);
};
var _elm_lang$html$Html_Attributes$name = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'name', value);
};
var _elm_lang$html$Html_Attributes$pattern = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'pattern', value);
};
var _elm_lang$html$Html_Attributes$for = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'htmlFor', value);
};
var _elm_lang$html$Html_Attributes$max = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'max', value);
};
var _elm_lang$html$Html_Attributes$min = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'min', value);
};
var _elm_lang$html$Html_Attributes$step = function (n) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'step', n);
};
var _elm_lang$html$Html_Attributes$wrap = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'wrap', value);
};
var _elm_lang$html$Html_Attributes$usemap = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'useMap', value);
};
var _elm_lang$html$Html_Attributes$shape = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'shape', value);
};
var _elm_lang$html$Html_Attributes$coords = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'coords', value);
};
var _elm_lang$html$Html_Attributes$keytype = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'keytype', value);
};
var _elm_lang$html$Html_Attributes$align = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'align', value);
};
var _elm_lang$html$Html_Attributes$cite = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'cite', value);
};
var _elm_lang$html$Html_Attributes$href = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'href', value);
};
var _elm_lang$html$Html_Attributes$target = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'target', value);
};
var _elm_lang$html$Html_Attributes$downloadAs = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'download', value);
};
var _elm_lang$html$Html_Attributes$hreflang = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'hreflang', value);
};
var _elm_lang$html$Html_Attributes$ping = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'ping', value);
};
var _elm_lang$html$Html_Attributes$start = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$stringProperty,
		'start',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$headers = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'headers', value);
};
var _elm_lang$html$Html_Attributes$scope = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'scope', value);
};
var _elm_lang$html$Html_Attributes$boolProperty = F2(
	function (name, bool) {
		return A2(
			_elm_lang$html$Html_Attributes$property,
			name,
			_elm_lang$core$Json_Encode$bool(bool));
	});
var _elm_lang$html$Html_Attributes$hidden = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'hidden', bool);
};
var _elm_lang$html$Html_Attributes$contenteditable = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'contentEditable', bool);
};
var _elm_lang$html$Html_Attributes$spellcheck = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'spellcheck', bool);
};
var _elm_lang$html$Html_Attributes$async = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'async', bool);
};
var _elm_lang$html$Html_Attributes$defer = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'defer', bool);
};
var _elm_lang$html$Html_Attributes$scoped = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'scoped', bool);
};
var _elm_lang$html$Html_Attributes$autoplay = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'autoplay', bool);
};
var _elm_lang$html$Html_Attributes$controls = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'controls', bool);
};
var _elm_lang$html$Html_Attributes$loop = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'loop', bool);
};
var _elm_lang$html$Html_Attributes$default = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'default', bool);
};
var _elm_lang$html$Html_Attributes$seamless = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'seamless', bool);
};
var _elm_lang$html$Html_Attributes$checked = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'checked', bool);
};
var _elm_lang$html$Html_Attributes$selected = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'selected', bool);
};
var _elm_lang$html$Html_Attributes$autofocus = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'autofocus', bool);
};
var _elm_lang$html$Html_Attributes$disabled = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'disabled', bool);
};
var _elm_lang$html$Html_Attributes$multiple = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'multiple', bool);
};
var _elm_lang$html$Html_Attributes$novalidate = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'noValidate', bool);
};
var _elm_lang$html$Html_Attributes$readonly = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'readOnly', bool);
};
var _elm_lang$html$Html_Attributes$required = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'required', bool);
};
var _elm_lang$html$Html_Attributes$ismap = function (value) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'isMap', value);
};
var _elm_lang$html$Html_Attributes$download = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'download', bool);
};
var _elm_lang$html$Html_Attributes$reversed = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'reversed', bool);
};
var _elm_lang$html$Html_Attributes$classList = function (list) {
	return _elm_lang$html$Html_Attributes$class(
		A2(
			_elm_lang$core$String$join,
			' ',
			A2(
				_elm_lang$core$List$map,
				_elm_lang$core$Tuple$first,
				A2(_elm_lang$core$List$filter, _elm_lang$core$Tuple$second, list))));
};
var _elm_lang$html$Html_Attributes$style = _elm_lang$virtual_dom$VirtualDom$style;

var _elm_lang$html$Html_Events$keyCode = A2(_elm_lang$core$Json_Decode$field, 'keyCode', _elm_lang$core$Json_Decode$int);
var _elm_lang$html$Html_Events$targetChecked = A2(
	_elm_lang$core$Json_Decode$at,
	{
		ctor: '::',
		_0: 'target',
		_1: {
			ctor: '::',
			_0: 'checked',
			_1: {ctor: '[]'}
		}
	},
	_elm_lang$core$Json_Decode$bool);
var _elm_lang$html$Html_Events$targetValue = A2(
	_elm_lang$core$Json_Decode$at,
	{
		ctor: '::',
		_0: 'target',
		_1: {
			ctor: '::',
			_0: 'value',
			_1: {ctor: '[]'}
		}
	},
	_elm_lang$core$Json_Decode$string);
var _elm_lang$html$Html_Events$defaultOptions = _elm_lang$virtual_dom$VirtualDom$defaultOptions;
var _elm_lang$html$Html_Events$onWithOptions = _elm_lang$virtual_dom$VirtualDom$onWithOptions;
var _elm_lang$html$Html_Events$on = _elm_lang$virtual_dom$VirtualDom$on;
var _elm_lang$html$Html_Events$onFocus = function (msg) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'focus',
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _elm_lang$html$Html_Events$onBlur = function (msg) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'blur',
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _elm_lang$html$Html_Events$onSubmitOptions = _elm_lang$core$Native_Utils.update(
	_elm_lang$html$Html_Events$defaultOptions,
	{preventDefault: true});
var _elm_lang$html$Html_Events$onSubmit = function (msg) {
	return A3(
		_elm_lang$html$Html_Events$onWithOptions,
		'submit',
		_elm_lang$html$Html_Events$onSubmitOptions,
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _elm_lang$html$Html_Events$onCheck = function (tagger) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'change',
		A2(_elm_lang$core$Json_Decode$map, tagger, _elm_lang$html$Html_Events$targetChecked));
};
var _elm_lang$html$Html_Events$onInput = function (tagger) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'input',
		A2(_elm_lang$core$Json_Decode$map, tagger, _elm_lang$html$Html_Events$targetValue));
};
var _elm_lang$html$Html_Events$onMouseOut = function (msg) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'mouseout',
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _elm_lang$html$Html_Events$onMouseOver = function (msg) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'mouseover',
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _elm_lang$html$Html_Events$onMouseLeave = function (msg) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'mouseleave',
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _elm_lang$html$Html_Events$onMouseEnter = function (msg) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'mouseenter',
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _elm_lang$html$Html_Events$onMouseUp = function (msg) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'mouseup',
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _elm_lang$html$Html_Events$onMouseDown = function (msg) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'mousedown',
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _elm_lang$html$Html_Events$onDoubleClick = function (msg) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'dblclick',
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _elm_lang$html$Html_Events$onClick = function (msg) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'click',
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _elm_lang$html$Html_Events$Options = F2(
	function (a, b) {
		return {stopPropagation: a, preventDefault: b};
	});

var _elm_lang$html$Html_Lazy$lazy3 = _elm_lang$virtual_dom$VirtualDom$lazy3;
var _elm_lang$html$Html_Lazy$lazy2 = _elm_lang$virtual_dom$VirtualDom$lazy2;
var _elm_lang$html$Html_Lazy$lazy = _elm_lang$virtual_dom$VirtualDom$lazy;

var _elm_lang$http$Native_Http = function() {


// ENCODING AND DECODING

function encodeUri(string)
{
	return encodeURIComponent(string);
}

function decodeUri(string)
{
	try
	{
		return _elm_lang$core$Maybe$Just(decodeURIComponent(string));
	}
	catch(e)
	{
		return _elm_lang$core$Maybe$Nothing;
	}
}


// SEND REQUEST

function toTask(request, maybeProgress)
{
	return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback)
	{
		var xhr = new XMLHttpRequest();

		configureProgress(xhr, maybeProgress);

		xhr.addEventListener('error', function() {
			callback(_elm_lang$core$Native_Scheduler.fail({ ctor: 'NetworkError' }));
		});
		xhr.addEventListener('timeout', function() {
			callback(_elm_lang$core$Native_Scheduler.fail({ ctor: 'Timeout' }));
		});
		xhr.addEventListener('load', function() {
			callback(handleResponse(xhr, request.expect.responseToResult));
		});

		try
		{
			xhr.open(request.method, request.url, true);
		}
		catch (e)
		{
			return callback(_elm_lang$core$Native_Scheduler.fail({ ctor: 'BadUrl', _0: request.url }));
		}

		configureRequest(xhr, request);
		send(xhr, request.body);

		return function() { xhr.abort(); };
	});
}

function configureProgress(xhr, maybeProgress)
{
	if (maybeProgress.ctor === 'Nothing')
	{
		return;
	}

	xhr.addEventListener('progress', function(event) {
		if (!event.lengthComputable)
		{
			return;
		}
		_elm_lang$core$Native_Scheduler.rawSpawn(maybeProgress._0({
			bytes: event.loaded,
			bytesExpected: event.total
		}));
	});
}

function configureRequest(xhr, request)
{
	function setHeader(pair)
	{
		xhr.setRequestHeader(pair._0, pair._1);
	}

	A2(_elm_lang$core$List$map, setHeader, request.headers);
	xhr.responseType = request.expect.responseType;
	xhr.withCredentials = request.withCredentials;

	if (request.timeout.ctor === 'Just')
	{
		xhr.timeout = request.timeout._0;
	}
}

function send(xhr, body)
{
	switch (body.ctor)
	{
		case 'EmptyBody':
			xhr.send();
			return;

		case 'StringBody':
			xhr.setRequestHeader('Content-Type', body._0);
			xhr.send(body._1);
			return;

		case 'FormDataBody':
			xhr.send(body._0);
			return;
	}
}


// RESPONSES

function handleResponse(xhr, responseToResult)
{
	var response = toResponse(xhr);

	if (xhr.status < 200 || 300 <= xhr.status)
	{
		response.body = xhr.responseText;
		return _elm_lang$core$Native_Scheduler.fail({
			ctor: 'BadStatus',
			_0: response
		});
	}

	var result = responseToResult(response);

	if (result.ctor === 'Ok')
	{
		return _elm_lang$core$Native_Scheduler.succeed(result._0);
	}
	else
	{
		response.body = xhr.responseText;
		return _elm_lang$core$Native_Scheduler.fail({
			ctor: 'BadPayload',
			_0: result._0,
			_1: response
		});
	}
}

function toResponse(xhr)
{
	return {
		status: { code: xhr.status, message: xhr.statusText },
		headers: parseHeaders(xhr.getAllResponseHeaders()),
		url: xhr.responseURL,
		body: xhr.response
	};
}

function parseHeaders(rawHeaders)
{
	var headers = _elm_lang$core$Dict$empty;

	if (!rawHeaders)
	{
		return headers;
	}

	var headerPairs = rawHeaders.split('\u000d\u000a');
	for (var i = headerPairs.length; i--; )
	{
		var headerPair = headerPairs[i];
		var index = headerPair.indexOf('\u003a\u0020');
		if (index > 0)
		{
			var key = headerPair.substring(0, index);
			var value = headerPair.substring(index + 2);

			headers = A3(_elm_lang$core$Dict$update, key, function(oldValue) {
				if (oldValue.ctor === 'Just')
				{
					return _elm_lang$core$Maybe$Just(value + ', ' + oldValue._0);
				}
				return _elm_lang$core$Maybe$Just(value);
			}, headers);
		}
	}

	return headers;
}


// EXPECTORS

function expectStringResponse(responseToResult)
{
	return {
		responseType: 'text',
		responseToResult: responseToResult
	};
}

function mapExpect(func, expect)
{
	return {
		responseType: expect.responseType,
		responseToResult: function(response) {
			var convertedResponse = expect.responseToResult(response);
			return A2(_elm_lang$core$Result$map, func, convertedResponse);
		}
	};
}


// BODY

function multipart(parts)
{
	var formData = new FormData();

	while (parts.ctor !== '[]')
	{
		var part = parts._0;
		formData.append(part._0, part._1);
		parts = parts._1;
	}

	return { ctor: 'FormDataBody', _0: formData };
}

return {
	toTask: F2(toTask),
	expectStringResponse: expectStringResponse,
	mapExpect: F2(mapExpect),
	multipart: multipart,
	encodeUri: encodeUri,
	decodeUri: decodeUri
};

}();

var _elm_lang$http$Http_Internal$map = F2(
	function (func, request) {
		return _elm_lang$core$Native_Utils.update(
			request,
			{
				expect: A2(_elm_lang$http$Native_Http.mapExpect, func, request.expect)
			});
	});
var _elm_lang$http$Http_Internal$RawRequest = F7(
	function (a, b, c, d, e, f, g) {
		return {method: a, headers: b, url: c, body: d, expect: e, timeout: f, withCredentials: g};
	});
var _elm_lang$http$Http_Internal$Request = function (a) {
	return {ctor: 'Request', _0: a};
};
var _elm_lang$http$Http_Internal$Expect = {ctor: 'Expect'};
var _elm_lang$http$Http_Internal$FormDataBody = {ctor: 'FormDataBody'};
var _elm_lang$http$Http_Internal$StringBody = F2(
	function (a, b) {
		return {ctor: 'StringBody', _0: a, _1: b};
	});
var _elm_lang$http$Http_Internal$EmptyBody = {ctor: 'EmptyBody'};
var _elm_lang$http$Http_Internal$Header = F2(
	function (a, b) {
		return {ctor: 'Header', _0: a, _1: b};
	});

var _elm_lang$http$Http$decodeUri = _elm_lang$http$Native_Http.decodeUri;
var _elm_lang$http$Http$encodeUri = _elm_lang$http$Native_Http.encodeUri;
var _elm_lang$http$Http$expectStringResponse = _elm_lang$http$Native_Http.expectStringResponse;
var _elm_lang$http$Http$expectJson = function (decoder) {
	return _elm_lang$http$Http$expectStringResponse(
		function (response) {
			return A2(_elm_lang$core$Json_Decode$decodeString, decoder, response.body);
		});
};
var _elm_lang$http$Http$expectString = _elm_lang$http$Http$expectStringResponse(
	function (response) {
		return _elm_lang$core$Result$Ok(response.body);
	});
var _elm_lang$http$Http$multipartBody = _elm_lang$http$Native_Http.multipart;
var _elm_lang$http$Http$stringBody = _elm_lang$http$Http_Internal$StringBody;
var _elm_lang$http$Http$jsonBody = function (value) {
	return A2(
		_elm_lang$http$Http_Internal$StringBody,
		'application/json',
		A2(_elm_lang$core$Json_Encode$encode, 0, value));
};
var _elm_lang$http$Http$emptyBody = _elm_lang$http$Http_Internal$EmptyBody;
var _elm_lang$http$Http$header = _elm_lang$http$Http_Internal$Header;
var _elm_lang$http$Http$request = _elm_lang$http$Http_Internal$Request;
var _elm_lang$http$Http$post = F3(
	function (url, body, decoder) {
		return _elm_lang$http$Http$request(
			{
				method: 'POST',
				headers: {ctor: '[]'},
				url: url,
				body: body,
				expect: _elm_lang$http$Http$expectJson(decoder),
				timeout: _elm_lang$core$Maybe$Nothing,
				withCredentials: false
			});
	});
var _elm_lang$http$Http$get = F2(
	function (url, decoder) {
		return _elm_lang$http$Http$request(
			{
				method: 'GET',
				headers: {ctor: '[]'},
				url: url,
				body: _elm_lang$http$Http$emptyBody,
				expect: _elm_lang$http$Http$expectJson(decoder),
				timeout: _elm_lang$core$Maybe$Nothing,
				withCredentials: false
			});
	});
var _elm_lang$http$Http$getString = function (url) {
	return _elm_lang$http$Http$request(
		{
			method: 'GET',
			headers: {ctor: '[]'},
			url: url,
			body: _elm_lang$http$Http$emptyBody,
			expect: _elm_lang$http$Http$expectString,
			timeout: _elm_lang$core$Maybe$Nothing,
			withCredentials: false
		});
};
var _elm_lang$http$Http$toTask = function (_p0) {
	var _p1 = _p0;
	return A2(_elm_lang$http$Native_Http.toTask, _p1._0, _elm_lang$core$Maybe$Nothing);
};
var _elm_lang$http$Http$send = F2(
	function (resultToMessage, request) {
		return A2(
			_elm_lang$core$Task$attempt,
			resultToMessage,
			_elm_lang$http$Http$toTask(request));
	});
var _elm_lang$http$Http$Response = F4(
	function (a, b, c, d) {
		return {url: a, status: b, headers: c, body: d};
	});
var _elm_lang$http$Http$BadPayload = F2(
	function (a, b) {
		return {ctor: 'BadPayload', _0: a, _1: b};
	});
var _elm_lang$http$Http$BadStatus = function (a) {
	return {ctor: 'BadStatus', _0: a};
};
var _elm_lang$http$Http$NetworkError = {ctor: 'NetworkError'};
var _elm_lang$http$Http$Timeout = {ctor: 'Timeout'};
var _elm_lang$http$Http$BadUrl = function (a) {
	return {ctor: 'BadUrl', _0: a};
};
var _elm_lang$http$Http$StringPart = F2(
	function (a, b) {
		return {ctor: 'StringPart', _0: a, _1: b};
	});
var _elm_lang$http$Http$stringPart = _elm_lang$http$Http$StringPart;

var _elm_lang$navigation$Native_Navigation = function() {


// FAKE NAVIGATION

function go(n)
{
	return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback)
	{
		if (n !== 0)
		{
			history.go(n);
		}
		callback(_elm_lang$core$Native_Scheduler.succeed(_elm_lang$core$Native_Utils.Tuple0));
	});
}

function pushState(url)
{
	return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback)
	{
		history.pushState({}, '', url);
		callback(_elm_lang$core$Native_Scheduler.succeed(getLocation()));
	});
}

function replaceState(url)
{
	return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback)
	{
		history.replaceState({}, '', url);
		callback(_elm_lang$core$Native_Scheduler.succeed(getLocation()));
	});
}


// REAL NAVIGATION

function reloadPage(skipCache)
{
	return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback)
	{
		document.location.reload(skipCache);
		callback(_elm_lang$core$Native_Scheduler.succeed(_elm_lang$core$Native_Utils.Tuple0));
	});
}

function setLocation(url)
{
	return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback)
	{
		try
		{
			window.location = url;
		}
		catch(err)
		{
			// Only Firefox can throw a NS_ERROR_MALFORMED_URI exception here.
			// Other browsers reload the page, so let's be consistent about that.
			document.location.reload(false);
		}
		callback(_elm_lang$core$Native_Scheduler.succeed(_elm_lang$core$Native_Utils.Tuple0));
	});
}


// GET LOCATION

function getLocation()
{
	var location = document.location;

	return {
		href: location.href,
		host: location.host,
		hostname: location.hostname,
		protocol: location.protocol,
		origin: location.origin,
		port_: location.port,
		pathname: location.pathname,
		search: location.search,
		hash: location.hash,
		username: location.username,
		password: location.password
	};
}


// DETECT IE11 PROBLEMS

function isInternetExplorer11()
{
	return window.navigator.userAgent.indexOf('Trident') !== -1;
}


return {
	go: go,
	setLocation: setLocation,
	reloadPage: reloadPage,
	pushState: pushState,
	replaceState: replaceState,
	getLocation: getLocation,
	isInternetExplorer11: isInternetExplorer11
};

}();

var _elm_lang$navigation$Navigation$replaceState = _elm_lang$navigation$Native_Navigation.replaceState;
var _elm_lang$navigation$Navigation$pushState = _elm_lang$navigation$Native_Navigation.pushState;
var _elm_lang$navigation$Navigation$go = _elm_lang$navigation$Native_Navigation.go;
var _elm_lang$navigation$Navigation$reloadPage = _elm_lang$navigation$Native_Navigation.reloadPage;
var _elm_lang$navigation$Navigation$setLocation = _elm_lang$navigation$Native_Navigation.setLocation;
var _elm_lang$navigation$Navigation_ops = _elm_lang$navigation$Navigation_ops || {};
_elm_lang$navigation$Navigation_ops['&>'] = F2(
	function (task1, task2) {
		return A2(
			_elm_lang$core$Task$andThen,
			function (_p0) {
				return task2;
			},
			task1);
	});
var _elm_lang$navigation$Navigation$notify = F3(
	function (router, subs, location) {
		var send = function (_p1) {
			var _p2 = _p1;
			return A2(
				_elm_lang$core$Platform$sendToApp,
				router,
				_p2._0(location));
		};
		return A2(
			_elm_lang$navigation$Navigation_ops['&>'],
			_elm_lang$core$Task$sequence(
				A2(_elm_lang$core$List$map, send, subs)),
			_elm_lang$core$Task$succeed(
				{ctor: '_Tuple0'}));
	});
var _elm_lang$navigation$Navigation$cmdHelp = F3(
	function (router, subs, cmd) {
		var _p3 = cmd;
		switch (_p3.ctor) {
			case 'Jump':
				return _elm_lang$navigation$Navigation$go(_p3._0);
			case 'New':
				return A2(
					_elm_lang$core$Task$andThen,
					A2(_elm_lang$navigation$Navigation$notify, router, subs),
					_elm_lang$navigation$Navigation$pushState(_p3._0));
			case 'Modify':
				return A2(
					_elm_lang$core$Task$andThen,
					A2(_elm_lang$navigation$Navigation$notify, router, subs),
					_elm_lang$navigation$Navigation$replaceState(_p3._0));
			case 'Visit':
				return _elm_lang$navigation$Navigation$setLocation(_p3._0);
			default:
				return _elm_lang$navigation$Navigation$reloadPage(_p3._0);
		}
	});
var _elm_lang$navigation$Navigation$killPopWatcher = function (popWatcher) {
	var _p4 = popWatcher;
	if (_p4.ctor === 'Normal') {
		return _elm_lang$core$Process$kill(_p4._0);
	} else {
		return A2(
			_elm_lang$navigation$Navigation_ops['&>'],
			_elm_lang$core$Process$kill(_p4._0),
			_elm_lang$core$Process$kill(_p4._1));
	}
};
var _elm_lang$navigation$Navigation$onSelfMsg = F3(
	function (router, location, state) {
		return A2(
			_elm_lang$navigation$Navigation_ops['&>'],
			A3(_elm_lang$navigation$Navigation$notify, router, state.subs, location),
			_elm_lang$core$Task$succeed(state));
	});
var _elm_lang$navigation$Navigation$subscription = _elm_lang$core$Native_Platform.leaf('Navigation');
var _elm_lang$navigation$Navigation$command = _elm_lang$core$Native_Platform.leaf('Navigation');
var _elm_lang$navigation$Navigation$Location = function (a) {
	return function (b) {
		return function (c) {
			return function (d) {
				return function (e) {
					return function (f) {
						return function (g) {
							return function (h) {
								return function (i) {
									return function (j) {
										return function (k) {
											return {href: a, host: b, hostname: c, protocol: d, origin: e, port_: f, pathname: g, search: h, hash: i, username: j, password: k};
										};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var _elm_lang$navigation$Navigation$State = F2(
	function (a, b) {
		return {subs: a, popWatcher: b};
	});
var _elm_lang$navigation$Navigation$init = _elm_lang$core$Task$succeed(
	A2(
		_elm_lang$navigation$Navigation$State,
		{ctor: '[]'},
		_elm_lang$core$Maybe$Nothing));
var _elm_lang$navigation$Navigation$Reload = function (a) {
	return {ctor: 'Reload', _0: a};
};
var _elm_lang$navigation$Navigation$reload = _elm_lang$navigation$Navigation$command(
	_elm_lang$navigation$Navigation$Reload(false));
var _elm_lang$navigation$Navigation$reloadAndSkipCache = _elm_lang$navigation$Navigation$command(
	_elm_lang$navigation$Navigation$Reload(true));
var _elm_lang$navigation$Navigation$Visit = function (a) {
	return {ctor: 'Visit', _0: a};
};
var _elm_lang$navigation$Navigation$load = function (url) {
	return _elm_lang$navigation$Navigation$command(
		_elm_lang$navigation$Navigation$Visit(url));
};
var _elm_lang$navigation$Navigation$Modify = function (a) {
	return {ctor: 'Modify', _0: a};
};
var _elm_lang$navigation$Navigation$modifyUrl = function (url) {
	return _elm_lang$navigation$Navigation$command(
		_elm_lang$navigation$Navigation$Modify(url));
};
var _elm_lang$navigation$Navigation$New = function (a) {
	return {ctor: 'New', _0: a};
};
var _elm_lang$navigation$Navigation$newUrl = function (url) {
	return _elm_lang$navigation$Navigation$command(
		_elm_lang$navigation$Navigation$New(url));
};
var _elm_lang$navigation$Navigation$Jump = function (a) {
	return {ctor: 'Jump', _0: a};
};
var _elm_lang$navigation$Navigation$back = function (n) {
	return _elm_lang$navigation$Navigation$command(
		_elm_lang$navigation$Navigation$Jump(0 - n));
};
var _elm_lang$navigation$Navigation$forward = function (n) {
	return _elm_lang$navigation$Navigation$command(
		_elm_lang$navigation$Navigation$Jump(n));
};
var _elm_lang$navigation$Navigation$cmdMap = F2(
	function (_p5, myCmd) {
		var _p6 = myCmd;
		switch (_p6.ctor) {
			case 'Jump':
				return _elm_lang$navigation$Navigation$Jump(_p6._0);
			case 'New':
				return _elm_lang$navigation$Navigation$New(_p6._0);
			case 'Modify':
				return _elm_lang$navigation$Navigation$Modify(_p6._0);
			case 'Visit':
				return _elm_lang$navigation$Navigation$Visit(_p6._0);
			default:
				return _elm_lang$navigation$Navigation$Reload(_p6._0);
		}
	});
var _elm_lang$navigation$Navigation$Monitor = function (a) {
	return {ctor: 'Monitor', _0: a};
};
var _elm_lang$navigation$Navigation$program = F2(
	function (locationToMessage, stuff) {
		var init = stuff.init(
			_elm_lang$navigation$Native_Navigation.getLocation(
				{ctor: '_Tuple0'}));
		var subs = function (model) {
			return _elm_lang$core$Platform_Sub$batch(
				{
					ctor: '::',
					_0: _elm_lang$navigation$Navigation$subscription(
						_elm_lang$navigation$Navigation$Monitor(locationToMessage)),
					_1: {
						ctor: '::',
						_0: stuff.subscriptions(model),
						_1: {ctor: '[]'}
					}
				});
		};
		return _elm_lang$html$Html$program(
			{init: init, view: stuff.view, update: stuff.update, subscriptions: subs});
	});
var _elm_lang$navigation$Navigation$programWithFlags = F2(
	function (locationToMessage, stuff) {
		var init = function (flags) {
			return A2(
				stuff.init,
				flags,
				_elm_lang$navigation$Native_Navigation.getLocation(
					{ctor: '_Tuple0'}));
		};
		var subs = function (model) {
			return _elm_lang$core$Platform_Sub$batch(
				{
					ctor: '::',
					_0: _elm_lang$navigation$Navigation$subscription(
						_elm_lang$navigation$Navigation$Monitor(locationToMessage)),
					_1: {
						ctor: '::',
						_0: stuff.subscriptions(model),
						_1: {ctor: '[]'}
					}
				});
		};
		return _elm_lang$html$Html$programWithFlags(
			{init: init, view: stuff.view, update: stuff.update, subscriptions: subs});
	});
var _elm_lang$navigation$Navigation$subMap = F2(
	function (func, _p7) {
		var _p8 = _p7;
		return _elm_lang$navigation$Navigation$Monitor(
			function (_p9) {
				return func(
					_p8._0(_p9));
			});
	});
var _elm_lang$navigation$Navigation$InternetExplorer = F2(
	function (a, b) {
		return {ctor: 'InternetExplorer', _0: a, _1: b};
	});
var _elm_lang$navigation$Navigation$Normal = function (a) {
	return {ctor: 'Normal', _0: a};
};
var _elm_lang$navigation$Navigation$spawnPopWatcher = function (router) {
	var reportLocation = function (_p10) {
		return A2(
			_elm_lang$core$Platform$sendToSelf,
			router,
			_elm_lang$navigation$Native_Navigation.getLocation(
				{ctor: '_Tuple0'}));
	};
	return _elm_lang$navigation$Native_Navigation.isInternetExplorer11(
		{ctor: '_Tuple0'}) ? A3(
		_elm_lang$core$Task$map2,
		_elm_lang$navigation$Navigation$InternetExplorer,
		_elm_lang$core$Process$spawn(
			A3(_elm_lang$dom$Dom_LowLevel$onWindow, 'popstate', _elm_lang$core$Json_Decode$value, reportLocation)),
		_elm_lang$core$Process$spawn(
			A3(_elm_lang$dom$Dom_LowLevel$onWindow, 'hashchange', _elm_lang$core$Json_Decode$value, reportLocation))) : A2(
		_elm_lang$core$Task$map,
		_elm_lang$navigation$Navigation$Normal,
		_elm_lang$core$Process$spawn(
			A3(_elm_lang$dom$Dom_LowLevel$onWindow, 'popstate', _elm_lang$core$Json_Decode$value, reportLocation)));
};
var _elm_lang$navigation$Navigation$onEffects = F4(
	function (router, cmds, subs, _p11) {
		var _p12 = _p11;
		var _p15 = _p12.popWatcher;
		var stepState = function () {
			var _p13 = {ctor: '_Tuple2', _0: subs, _1: _p15};
			_v6_2:
			do {
				if (_p13._0.ctor === '[]') {
					if (_p13._1.ctor === 'Just') {
						return A2(
							_elm_lang$navigation$Navigation_ops['&>'],
							_elm_lang$navigation$Navigation$killPopWatcher(_p13._1._0),
							_elm_lang$core$Task$succeed(
								A2(_elm_lang$navigation$Navigation$State, subs, _elm_lang$core$Maybe$Nothing)));
					} else {
						break _v6_2;
					}
				} else {
					if (_p13._1.ctor === 'Nothing') {
						return A2(
							_elm_lang$core$Task$map,
							function (_p14) {
								return A2(
									_elm_lang$navigation$Navigation$State,
									subs,
									_elm_lang$core$Maybe$Just(_p14));
							},
							_elm_lang$navigation$Navigation$spawnPopWatcher(router));
					} else {
						break _v6_2;
					}
				}
			} while(false);
			return _elm_lang$core$Task$succeed(
				A2(_elm_lang$navigation$Navigation$State, subs, _p15));
		}();
		return A2(
			_elm_lang$navigation$Navigation_ops['&>'],
			_elm_lang$core$Task$sequence(
				A2(
					_elm_lang$core$List$map,
					A2(_elm_lang$navigation$Navigation$cmdHelp, router, subs),
					cmds)),
			stepState);
	});
_elm_lang$core$Native_Platform.effectManagers['Navigation'] = {pkg: 'elm-lang/navigation', init: _elm_lang$navigation$Navigation$init, onEffects: _elm_lang$navigation$Navigation$onEffects, onSelfMsg: _elm_lang$navigation$Navigation$onSelfMsg, tag: 'fx', cmdMap: _elm_lang$navigation$Navigation$cmdMap, subMap: _elm_lang$navigation$Navigation$subMap};

var _elm_lang$svg$Svg$map = _elm_lang$virtual_dom$VirtualDom$map;
var _elm_lang$svg$Svg$text = _elm_lang$virtual_dom$VirtualDom$text;
var _elm_lang$svg$Svg$svgNamespace = A2(
	_elm_lang$virtual_dom$VirtualDom$property,
	'namespace',
	_elm_lang$core$Json_Encode$string('http://www.w3.org/2000/svg'));
var _elm_lang$svg$Svg$node = F3(
	function (name, attributes, children) {
		return A3(
			_elm_lang$virtual_dom$VirtualDom$node,
			name,
			{ctor: '::', _0: _elm_lang$svg$Svg$svgNamespace, _1: attributes},
			children);
	});
var _elm_lang$svg$Svg$svg = _elm_lang$svg$Svg$node('svg');
var _elm_lang$svg$Svg$foreignObject = _elm_lang$svg$Svg$node('foreignObject');
var _elm_lang$svg$Svg$animate = _elm_lang$svg$Svg$node('animate');
var _elm_lang$svg$Svg$animateColor = _elm_lang$svg$Svg$node('animateColor');
var _elm_lang$svg$Svg$animateMotion = _elm_lang$svg$Svg$node('animateMotion');
var _elm_lang$svg$Svg$animateTransform = _elm_lang$svg$Svg$node('animateTransform');
var _elm_lang$svg$Svg$mpath = _elm_lang$svg$Svg$node('mpath');
var _elm_lang$svg$Svg$set = _elm_lang$svg$Svg$node('set');
var _elm_lang$svg$Svg$a = _elm_lang$svg$Svg$node('a');
var _elm_lang$svg$Svg$defs = _elm_lang$svg$Svg$node('defs');
var _elm_lang$svg$Svg$g = _elm_lang$svg$Svg$node('g');
var _elm_lang$svg$Svg$marker = _elm_lang$svg$Svg$node('marker');
var _elm_lang$svg$Svg$mask = _elm_lang$svg$Svg$node('mask');
var _elm_lang$svg$Svg$pattern = _elm_lang$svg$Svg$node('pattern');
var _elm_lang$svg$Svg$switch = _elm_lang$svg$Svg$node('switch');
var _elm_lang$svg$Svg$symbol = _elm_lang$svg$Svg$node('symbol');
var _elm_lang$svg$Svg$desc = _elm_lang$svg$Svg$node('desc');
var _elm_lang$svg$Svg$metadata = _elm_lang$svg$Svg$node('metadata');
var _elm_lang$svg$Svg$title = _elm_lang$svg$Svg$node('title');
var _elm_lang$svg$Svg$feBlend = _elm_lang$svg$Svg$node('feBlend');
var _elm_lang$svg$Svg$feColorMatrix = _elm_lang$svg$Svg$node('feColorMatrix');
var _elm_lang$svg$Svg$feComponentTransfer = _elm_lang$svg$Svg$node('feComponentTransfer');
var _elm_lang$svg$Svg$feComposite = _elm_lang$svg$Svg$node('feComposite');
var _elm_lang$svg$Svg$feConvolveMatrix = _elm_lang$svg$Svg$node('feConvolveMatrix');
var _elm_lang$svg$Svg$feDiffuseLighting = _elm_lang$svg$Svg$node('feDiffuseLighting');
var _elm_lang$svg$Svg$feDisplacementMap = _elm_lang$svg$Svg$node('feDisplacementMap');
var _elm_lang$svg$Svg$feFlood = _elm_lang$svg$Svg$node('feFlood');
var _elm_lang$svg$Svg$feFuncA = _elm_lang$svg$Svg$node('feFuncA');
var _elm_lang$svg$Svg$feFuncB = _elm_lang$svg$Svg$node('feFuncB');
var _elm_lang$svg$Svg$feFuncG = _elm_lang$svg$Svg$node('feFuncG');
var _elm_lang$svg$Svg$feFuncR = _elm_lang$svg$Svg$node('feFuncR');
var _elm_lang$svg$Svg$feGaussianBlur = _elm_lang$svg$Svg$node('feGaussianBlur');
var _elm_lang$svg$Svg$feImage = _elm_lang$svg$Svg$node('feImage');
var _elm_lang$svg$Svg$feMerge = _elm_lang$svg$Svg$node('feMerge');
var _elm_lang$svg$Svg$feMergeNode = _elm_lang$svg$Svg$node('feMergeNode');
var _elm_lang$svg$Svg$feMorphology = _elm_lang$svg$Svg$node('feMorphology');
var _elm_lang$svg$Svg$feOffset = _elm_lang$svg$Svg$node('feOffset');
var _elm_lang$svg$Svg$feSpecularLighting = _elm_lang$svg$Svg$node('feSpecularLighting');
var _elm_lang$svg$Svg$feTile = _elm_lang$svg$Svg$node('feTile');
var _elm_lang$svg$Svg$feTurbulence = _elm_lang$svg$Svg$node('feTurbulence');
var _elm_lang$svg$Svg$font = _elm_lang$svg$Svg$node('font');
var _elm_lang$svg$Svg$linearGradient = _elm_lang$svg$Svg$node('linearGradient');
var _elm_lang$svg$Svg$radialGradient = _elm_lang$svg$Svg$node('radialGradient');
var _elm_lang$svg$Svg$stop = _elm_lang$svg$Svg$node('stop');
var _elm_lang$svg$Svg$circle = _elm_lang$svg$Svg$node('circle');
var _elm_lang$svg$Svg$ellipse = _elm_lang$svg$Svg$node('ellipse');
var _elm_lang$svg$Svg$image = _elm_lang$svg$Svg$node('image');
var _elm_lang$svg$Svg$line = _elm_lang$svg$Svg$node('line');
var _elm_lang$svg$Svg$path = _elm_lang$svg$Svg$node('path');
var _elm_lang$svg$Svg$polygon = _elm_lang$svg$Svg$node('polygon');
var _elm_lang$svg$Svg$polyline = _elm_lang$svg$Svg$node('polyline');
var _elm_lang$svg$Svg$rect = _elm_lang$svg$Svg$node('rect');
var _elm_lang$svg$Svg$use = _elm_lang$svg$Svg$node('use');
var _elm_lang$svg$Svg$feDistantLight = _elm_lang$svg$Svg$node('feDistantLight');
var _elm_lang$svg$Svg$fePointLight = _elm_lang$svg$Svg$node('fePointLight');
var _elm_lang$svg$Svg$feSpotLight = _elm_lang$svg$Svg$node('feSpotLight');
var _elm_lang$svg$Svg$altGlyph = _elm_lang$svg$Svg$node('altGlyph');
var _elm_lang$svg$Svg$altGlyphDef = _elm_lang$svg$Svg$node('altGlyphDef');
var _elm_lang$svg$Svg$altGlyphItem = _elm_lang$svg$Svg$node('altGlyphItem');
var _elm_lang$svg$Svg$glyph = _elm_lang$svg$Svg$node('glyph');
var _elm_lang$svg$Svg$glyphRef = _elm_lang$svg$Svg$node('glyphRef');
var _elm_lang$svg$Svg$textPath = _elm_lang$svg$Svg$node('textPath');
var _elm_lang$svg$Svg$text_ = _elm_lang$svg$Svg$node('text');
var _elm_lang$svg$Svg$tref = _elm_lang$svg$Svg$node('tref');
var _elm_lang$svg$Svg$tspan = _elm_lang$svg$Svg$node('tspan');
var _elm_lang$svg$Svg$clipPath = _elm_lang$svg$Svg$node('clipPath');
var _elm_lang$svg$Svg$colorProfile = _elm_lang$svg$Svg$node('colorProfile');
var _elm_lang$svg$Svg$cursor = _elm_lang$svg$Svg$node('cursor');
var _elm_lang$svg$Svg$filter = _elm_lang$svg$Svg$node('filter');
var _elm_lang$svg$Svg$script = _elm_lang$svg$Svg$node('script');
var _elm_lang$svg$Svg$style = _elm_lang$svg$Svg$node('style');
var _elm_lang$svg$Svg$view = _elm_lang$svg$Svg$node('view');

var _elm_lang$svg$Svg_Attributes$writingMode = _elm_lang$virtual_dom$VirtualDom$attribute('writing-mode');
var _elm_lang$svg$Svg_Attributes$wordSpacing = _elm_lang$virtual_dom$VirtualDom$attribute('word-spacing');
var _elm_lang$svg$Svg_Attributes$visibility = _elm_lang$virtual_dom$VirtualDom$attribute('visibility');
var _elm_lang$svg$Svg_Attributes$unicodeBidi = _elm_lang$virtual_dom$VirtualDom$attribute('unicode-bidi');
var _elm_lang$svg$Svg_Attributes$textRendering = _elm_lang$virtual_dom$VirtualDom$attribute('text-rendering');
var _elm_lang$svg$Svg_Attributes$textDecoration = _elm_lang$virtual_dom$VirtualDom$attribute('text-decoration');
var _elm_lang$svg$Svg_Attributes$textAnchor = _elm_lang$virtual_dom$VirtualDom$attribute('text-anchor');
var _elm_lang$svg$Svg_Attributes$stroke = _elm_lang$virtual_dom$VirtualDom$attribute('stroke');
var _elm_lang$svg$Svg_Attributes$strokeWidth = _elm_lang$virtual_dom$VirtualDom$attribute('stroke-width');
var _elm_lang$svg$Svg_Attributes$strokeOpacity = _elm_lang$virtual_dom$VirtualDom$attribute('stroke-opacity');
var _elm_lang$svg$Svg_Attributes$strokeMiterlimit = _elm_lang$virtual_dom$VirtualDom$attribute('stroke-miterlimit');
var _elm_lang$svg$Svg_Attributes$strokeLinejoin = _elm_lang$virtual_dom$VirtualDom$attribute('stroke-linejoin');
var _elm_lang$svg$Svg_Attributes$strokeLinecap = _elm_lang$virtual_dom$VirtualDom$attribute('stroke-linecap');
var _elm_lang$svg$Svg_Attributes$strokeDashoffset = _elm_lang$virtual_dom$VirtualDom$attribute('stroke-dashoffset');
var _elm_lang$svg$Svg_Attributes$strokeDasharray = _elm_lang$virtual_dom$VirtualDom$attribute('stroke-dasharray');
var _elm_lang$svg$Svg_Attributes$stopOpacity = _elm_lang$virtual_dom$VirtualDom$attribute('stop-opacity');
var _elm_lang$svg$Svg_Attributes$stopColor = _elm_lang$virtual_dom$VirtualDom$attribute('stop-color');
var _elm_lang$svg$Svg_Attributes$shapeRendering = _elm_lang$virtual_dom$VirtualDom$attribute('shape-rendering');
var _elm_lang$svg$Svg_Attributes$pointerEvents = _elm_lang$virtual_dom$VirtualDom$attribute('pointer-events');
var _elm_lang$svg$Svg_Attributes$overflow = _elm_lang$virtual_dom$VirtualDom$attribute('overflow');
var _elm_lang$svg$Svg_Attributes$opacity = _elm_lang$virtual_dom$VirtualDom$attribute('opacity');
var _elm_lang$svg$Svg_Attributes$mask = _elm_lang$virtual_dom$VirtualDom$attribute('mask');
var _elm_lang$svg$Svg_Attributes$markerStart = _elm_lang$virtual_dom$VirtualDom$attribute('marker-start');
var _elm_lang$svg$Svg_Attributes$markerMid = _elm_lang$virtual_dom$VirtualDom$attribute('marker-mid');
var _elm_lang$svg$Svg_Attributes$markerEnd = _elm_lang$virtual_dom$VirtualDom$attribute('marker-end');
var _elm_lang$svg$Svg_Attributes$lightingColor = _elm_lang$virtual_dom$VirtualDom$attribute('lighting-color');
var _elm_lang$svg$Svg_Attributes$letterSpacing = _elm_lang$virtual_dom$VirtualDom$attribute('letter-spacing');
var _elm_lang$svg$Svg_Attributes$kerning = _elm_lang$virtual_dom$VirtualDom$attribute('kerning');
var _elm_lang$svg$Svg_Attributes$imageRendering = _elm_lang$virtual_dom$VirtualDom$attribute('image-rendering');
var _elm_lang$svg$Svg_Attributes$glyphOrientationVertical = _elm_lang$virtual_dom$VirtualDom$attribute('glyph-orientation-vertical');
var _elm_lang$svg$Svg_Attributes$glyphOrientationHorizontal = _elm_lang$virtual_dom$VirtualDom$attribute('glyph-orientation-horizontal');
var _elm_lang$svg$Svg_Attributes$fontWeight = _elm_lang$virtual_dom$VirtualDom$attribute('font-weight');
var _elm_lang$svg$Svg_Attributes$fontVariant = _elm_lang$virtual_dom$VirtualDom$attribute('font-variant');
var _elm_lang$svg$Svg_Attributes$fontStyle = _elm_lang$virtual_dom$VirtualDom$attribute('font-style');
var _elm_lang$svg$Svg_Attributes$fontStretch = _elm_lang$virtual_dom$VirtualDom$attribute('font-stretch');
var _elm_lang$svg$Svg_Attributes$fontSize = _elm_lang$virtual_dom$VirtualDom$attribute('font-size');
var _elm_lang$svg$Svg_Attributes$fontSizeAdjust = _elm_lang$virtual_dom$VirtualDom$attribute('font-size-adjust');
var _elm_lang$svg$Svg_Attributes$fontFamily = _elm_lang$virtual_dom$VirtualDom$attribute('font-family');
var _elm_lang$svg$Svg_Attributes$floodOpacity = _elm_lang$virtual_dom$VirtualDom$attribute('flood-opacity');
var _elm_lang$svg$Svg_Attributes$floodColor = _elm_lang$virtual_dom$VirtualDom$attribute('flood-color');
var _elm_lang$svg$Svg_Attributes$filter = _elm_lang$virtual_dom$VirtualDom$attribute('filter');
var _elm_lang$svg$Svg_Attributes$fill = _elm_lang$virtual_dom$VirtualDom$attribute('fill');
var _elm_lang$svg$Svg_Attributes$fillRule = _elm_lang$virtual_dom$VirtualDom$attribute('fill-rule');
var _elm_lang$svg$Svg_Attributes$fillOpacity = _elm_lang$virtual_dom$VirtualDom$attribute('fill-opacity');
var _elm_lang$svg$Svg_Attributes$enableBackground = _elm_lang$virtual_dom$VirtualDom$attribute('enable-background');
var _elm_lang$svg$Svg_Attributes$dominantBaseline = _elm_lang$virtual_dom$VirtualDom$attribute('dominant-baseline');
var _elm_lang$svg$Svg_Attributes$display = _elm_lang$virtual_dom$VirtualDom$attribute('display');
var _elm_lang$svg$Svg_Attributes$direction = _elm_lang$virtual_dom$VirtualDom$attribute('direction');
var _elm_lang$svg$Svg_Attributes$cursor = _elm_lang$virtual_dom$VirtualDom$attribute('cursor');
var _elm_lang$svg$Svg_Attributes$color = _elm_lang$virtual_dom$VirtualDom$attribute('color');
var _elm_lang$svg$Svg_Attributes$colorRendering = _elm_lang$virtual_dom$VirtualDom$attribute('color-rendering');
var _elm_lang$svg$Svg_Attributes$colorProfile = _elm_lang$virtual_dom$VirtualDom$attribute('color-profile');
var _elm_lang$svg$Svg_Attributes$colorInterpolation = _elm_lang$virtual_dom$VirtualDom$attribute('color-interpolation');
var _elm_lang$svg$Svg_Attributes$colorInterpolationFilters = _elm_lang$virtual_dom$VirtualDom$attribute('color-interpolation-filters');
var _elm_lang$svg$Svg_Attributes$clip = _elm_lang$virtual_dom$VirtualDom$attribute('clip');
var _elm_lang$svg$Svg_Attributes$clipRule = _elm_lang$virtual_dom$VirtualDom$attribute('clip-rule');
var _elm_lang$svg$Svg_Attributes$clipPath = _elm_lang$virtual_dom$VirtualDom$attribute('clip-path');
var _elm_lang$svg$Svg_Attributes$baselineShift = _elm_lang$virtual_dom$VirtualDom$attribute('baseline-shift');
var _elm_lang$svg$Svg_Attributes$alignmentBaseline = _elm_lang$virtual_dom$VirtualDom$attribute('alignment-baseline');
var _elm_lang$svg$Svg_Attributes$zoomAndPan = _elm_lang$virtual_dom$VirtualDom$attribute('zoomAndPan');
var _elm_lang$svg$Svg_Attributes$z = _elm_lang$virtual_dom$VirtualDom$attribute('z');
var _elm_lang$svg$Svg_Attributes$yChannelSelector = _elm_lang$virtual_dom$VirtualDom$attribute('yChannelSelector');
var _elm_lang$svg$Svg_Attributes$y2 = _elm_lang$virtual_dom$VirtualDom$attribute('y2');
var _elm_lang$svg$Svg_Attributes$y1 = _elm_lang$virtual_dom$VirtualDom$attribute('y1');
var _elm_lang$svg$Svg_Attributes$y = _elm_lang$virtual_dom$VirtualDom$attribute('y');
var _elm_lang$svg$Svg_Attributes$xmlSpace = A2(_elm_lang$virtual_dom$VirtualDom$attributeNS, 'http://www.w3.org/XML/1998/namespace', 'xml:space');
var _elm_lang$svg$Svg_Attributes$xmlLang = A2(_elm_lang$virtual_dom$VirtualDom$attributeNS, 'http://www.w3.org/XML/1998/namespace', 'xml:lang');
var _elm_lang$svg$Svg_Attributes$xmlBase = A2(_elm_lang$virtual_dom$VirtualDom$attributeNS, 'http://www.w3.org/XML/1998/namespace', 'xml:base');
var _elm_lang$svg$Svg_Attributes$xlinkType = A2(_elm_lang$virtual_dom$VirtualDom$attributeNS, 'http://www.w3.org/1999/xlink', 'xlink:type');
var _elm_lang$svg$Svg_Attributes$xlinkTitle = A2(_elm_lang$virtual_dom$VirtualDom$attributeNS, 'http://www.w3.org/1999/xlink', 'xlink:title');
var _elm_lang$svg$Svg_Attributes$xlinkShow = A2(_elm_lang$virtual_dom$VirtualDom$attributeNS, 'http://www.w3.org/1999/xlink', 'xlink:show');
var _elm_lang$svg$Svg_Attributes$xlinkRole = A2(_elm_lang$virtual_dom$VirtualDom$attributeNS, 'http://www.w3.org/1999/xlink', 'xlink:role');
var _elm_lang$svg$Svg_Attributes$xlinkHref = A2(_elm_lang$virtual_dom$VirtualDom$attributeNS, 'http://www.w3.org/1999/xlink', 'xlink:href');
var _elm_lang$svg$Svg_Attributes$xlinkArcrole = A2(_elm_lang$virtual_dom$VirtualDom$attributeNS, 'http://www.w3.org/1999/xlink', 'xlink:arcrole');
var _elm_lang$svg$Svg_Attributes$xlinkActuate = A2(_elm_lang$virtual_dom$VirtualDom$attributeNS, 'http://www.w3.org/1999/xlink', 'xlink:actuate');
var _elm_lang$svg$Svg_Attributes$xChannelSelector = _elm_lang$virtual_dom$VirtualDom$attribute('xChannelSelector');
var _elm_lang$svg$Svg_Attributes$x2 = _elm_lang$virtual_dom$VirtualDom$attribute('x2');
var _elm_lang$svg$Svg_Attributes$x1 = _elm_lang$virtual_dom$VirtualDom$attribute('x1');
var _elm_lang$svg$Svg_Attributes$xHeight = _elm_lang$virtual_dom$VirtualDom$attribute('x-height');
var _elm_lang$svg$Svg_Attributes$x = _elm_lang$virtual_dom$VirtualDom$attribute('x');
var _elm_lang$svg$Svg_Attributes$widths = _elm_lang$virtual_dom$VirtualDom$attribute('widths');
var _elm_lang$svg$Svg_Attributes$width = _elm_lang$virtual_dom$VirtualDom$attribute('width');
var _elm_lang$svg$Svg_Attributes$viewTarget = _elm_lang$virtual_dom$VirtualDom$attribute('viewTarget');
var _elm_lang$svg$Svg_Attributes$viewBox = _elm_lang$virtual_dom$VirtualDom$attribute('viewBox');
var _elm_lang$svg$Svg_Attributes$vertOriginY = _elm_lang$virtual_dom$VirtualDom$attribute('vert-origin-y');
var _elm_lang$svg$Svg_Attributes$vertOriginX = _elm_lang$virtual_dom$VirtualDom$attribute('vert-origin-x');
var _elm_lang$svg$Svg_Attributes$vertAdvY = _elm_lang$virtual_dom$VirtualDom$attribute('vert-adv-y');
var _elm_lang$svg$Svg_Attributes$version = _elm_lang$virtual_dom$VirtualDom$attribute('version');
var _elm_lang$svg$Svg_Attributes$values = _elm_lang$virtual_dom$VirtualDom$attribute('values');
var _elm_lang$svg$Svg_Attributes$vMathematical = _elm_lang$virtual_dom$VirtualDom$attribute('v-mathematical');
var _elm_lang$svg$Svg_Attributes$vIdeographic = _elm_lang$virtual_dom$VirtualDom$attribute('v-ideographic');
var _elm_lang$svg$Svg_Attributes$vHanging = _elm_lang$virtual_dom$VirtualDom$attribute('v-hanging');
var _elm_lang$svg$Svg_Attributes$vAlphabetic = _elm_lang$virtual_dom$VirtualDom$attribute('v-alphabetic');
var _elm_lang$svg$Svg_Attributes$unitsPerEm = _elm_lang$virtual_dom$VirtualDom$attribute('units-per-em');
var _elm_lang$svg$Svg_Attributes$unicodeRange = _elm_lang$virtual_dom$VirtualDom$attribute('unicode-range');
var _elm_lang$svg$Svg_Attributes$unicode = _elm_lang$virtual_dom$VirtualDom$attribute('unicode');
var _elm_lang$svg$Svg_Attributes$underlineThickness = _elm_lang$virtual_dom$VirtualDom$attribute('underline-thickness');
var _elm_lang$svg$Svg_Attributes$underlinePosition = _elm_lang$virtual_dom$VirtualDom$attribute('underline-position');
var _elm_lang$svg$Svg_Attributes$u2 = _elm_lang$virtual_dom$VirtualDom$attribute('u2');
var _elm_lang$svg$Svg_Attributes$u1 = _elm_lang$virtual_dom$VirtualDom$attribute('u1');
var _elm_lang$svg$Svg_Attributes$type_ = _elm_lang$virtual_dom$VirtualDom$attribute('type');
var _elm_lang$svg$Svg_Attributes$transform = _elm_lang$virtual_dom$VirtualDom$attribute('transform');
var _elm_lang$svg$Svg_Attributes$to = _elm_lang$virtual_dom$VirtualDom$attribute('to');
var _elm_lang$svg$Svg_Attributes$title = _elm_lang$virtual_dom$VirtualDom$attribute('title');
var _elm_lang$svg$Svg_Attributes$textLength = _elm_lang$virtual_dom$VirtualDom$attribute('textLength');
var _elm_lang$svg$Svg_Attributes$targetY = _elm_lang$virtual_dom$VirtualDom$attribute('targetY');
var _elm_lang$svg$Svg_Attributes$targetX = _elm_lang$virtual_dom$VirtualDom$attribute('targetX');
var _elm_lang$svg$Svg_Attributes$target = _elm_lang$virtual_dom$VirtualDom$attribute('target');
var _elm_lang$svg$Svg_Attributes$tableValues = _elm_lang$virtual_dom$VirtualDom$attribute('tableValues');
var _elm_lang$svg$Svg_Attributes$systemLanguage = _elm_lang$virtual_dom$VirtualDom$attribute('systemLanguage');
var _elm_lang$svg$Svg_Attributes$surfaceScale = _elm_lang$virtual_dom$VirtualDom$attribute('surfaceScale');
var _elm_lang$svg$Svg_Attributes$style = _elm_lang$virtual_dom$VirtualDom$attribute('style');
var _elm_lang$svg$Svg_Attributes$string = _elm_lang$virtual_dom$VirtualDom$attribute('string');
var _elm_lang$svg$Svg_Attributes$strikethroughThickness = _elm_lang$virtual_dom$VirtualDom$attribute('strikethrough-thickness');
var _elm_lang$svg$Svg_Attributes$strikethroughPosition = _elm_lang$virtual_dom$VirtualDom$attribute('strikethrough-position');
var _elm_lang$svg$Svg_Attributes$stitchTiles = _elm_lang$virtual_dom$VirtualDom$attribute('stitchTiles');
var _elm_lang$svg$Svg_Attributes$stemv = _elm_lang$virtual_dom$VirtualDom$attribute('stemv');
var _elm_lang$svg$Svg_Attributes$stemh = _elm_lang$virtual_dom$VirtualDom$attribute('stemh');
var _elm_lang$svg$Svg_Attributes$stdDeviation = _elm_lang$virtual_dom$VirtualDom$attribute('stdDeviation');
var _elm_lang$svg$Svg_Attributes$startOffset = _elm_lang$virtual_dom$VirtualDom$attribute('startOffset');
var _elm_lang$svg$Svg_Attributes$spreadMethod = _elm_lang$virtual_dom$VirtualDom$attribute('spreadMethod');
var _elm_lang$svg$Svg_Attributes$speed = _elm_lang$virtual_dom$VirtualDom$attribute('speed');
var _elm_lang$svg$Svg_Attributes$specularExponent = _elm_lang$virtual_dom$VirtualDom$attribute('specularExponent');
var _elm_lang$svg$Svg_Attributes$specularConstant = _elm_lang$virtual_dom$VirtualDom$attribute('specularConstant');
var _elm_lang$svg$Svg_Attributes$spacing = _elm_lang$virtual_dom$VirtualDom$attribute('spacing');
var _elm_lang$svg$Svg_Attributes$slope = _elm_lang$virtual_dom$VirtualDom$attribute('slope');
var _elm_lang$svg$Svg_Attributes$seed = _elm_lang$virtual_dom$VirtualDom$attribute('seed');
var _elm_lang$svg$Svg_Attributes$scale = _elm_lang$virtual_dom$VirtualDom$attribute('scale');
var _elm_lang$svg$Svg_Attributes$ry = _elm_lang$virtual_dom$VirtualDom$attribute('ry');
var _elm_lang$svg$Svg_Attributes$rx = _elm_lang$virtual_dom$VirtualDom$attribute('rx');
var _elm_lang$svg$Svg_Attributes$rotate = _elm_lang$virtual_dom$VirtualDom$attribute('rotate');
var _elm_lang$svg$Svg_Attributes$result = _elm_lang$virtual_dom$VirtualDom$attribute('result');
var _elm_lang$svg$Svg_Attributes$restart = _elm_lang$virtual_dom$VirtualDom$attribute('restart');
var _elm_lang$svg$Svg_Attributes$requiredFeatures = _elm_lang$virtual_dom$VirtualDom$attribute('requiredFeatures');
var _elm_lang$svg$Svg_Attributes$requiredExtensions = _elm_lang$virtual_dom$VirtualDom$attribute('requiredExtensions');
var _elm_lang$svg$Svg_Attributes$repeatDur = _elm_lang$virtual_dom$VirtualDom$attribute('repeatDur');
var _elm_lang$svg$Svg_Attributes$repeatCount = _elm_lang$virtual_dom$VirtualDom$attribute('repeatCount');
var _elm_lang$svg$Svg_Attributes$renderingIntent = _elm_lang$virtual_dom$VirtualDom$attribute('rendering-intent');
var _elm_lang$svg$Svg_Attributes$refY = _elm_lang$virtual_dom$VirtualDom$attribute('refY');
var _elm_lang$svg$Svg_Attributes$refX = _elm_lang$virtual_dom$VirtualDom$attribute('refX');
var _elm_lang$svg$Svg_Attributes$radius = _elm_lang$virtual_dom$VirtualDom$attribute('radius');
var _elm_lang$svg$Svg_Attributes$r = _elm_lang$virtual_dom$VirtualDom$attribute('r');
var _elm_lang$svg$Svg_Attributes$primitiveUnits = _elm_lang$virtual_dom$VirtualDom$attribute('primitiveUnits');
var _elm_lang$svg$Svg_Attributes$preserveAspectRatio = _elm_lang$virtual_dom$VirtualDom$attribute('preserveAspectRatio');
var _elm_lang$svg$Svg_Attributes$preserveAlpha = _elm_lang$virtual_dom$VirtualDom$attribute('preserveAlpha');
var _elm_lang$svg$Svg_Attributes$pointsAtZ = _elm_lang$virtual_dom$VirtualDom$attribute('pointsAtZ');
var _elm_lang$svg$Svg_Attributes$pointsAtY = _elm_lang$virtual_dom$VirtualDom$attribute('pointsAtY');
var _elm_lang$svg$Svg_Attributes$pointsAtX = _elm_lang$virtual_dom$VirtualDom$attribute('pointsAtX');
var _elm_lang$svg$Svg_Attributes$points = _elm_lang$virtual_dom$VirtualDom$attribute('points');
var _elm_lang$svg$Svg_Attributes$pointOrder = _elm_lang$virtual_dom$VirtualDom$attribute('point-order');
var _elm_lang$svg$Svg_Attributes$patternUnits = _elm_lang$virtual_dom$VirtualDom$attribute('patternUnits');
var _elm_lang$svg$Svg_Attributes$patternTransform = _elm_lang$virtual_dom$VirtualDom$attribute('patternTransform');
var _elm_lang$svg$Svg_Attributes$patternContentUnits = _elm_lang$virtual_dom$VirtualDom$attribute('patternContentUnits');
var _elm_lang$svg$Svg_Attributes$pathLength = _elm_lang$virtual_dom$VirtualDom$attribute('pathLength');
var _elm_lang$svg$Svg_Attributes$path = _elm_lang$virtual_dom$VirtualDom$attribute('path');
var _elm_lang$svg$Svg_Attributes$panose1 = _elm_lang$virtual_dom$VirtualDom$attribute('panose-1');
var _elm_lang$svg$Svg_Attributes$overlineThickness = _elm_lang$virtual_dom$VirtualDom$attribute('overline-thickness');
var _elm_lang$svg$Svg_Attributes$overlinePosition = _elm_lang$virtual_dom$VirtualDom$attribute('overline-position');
var _elm_lang$svg$Svg_Attributes$origin = _elm_lang$virtual_dom$VirtualDom$attribute('origin');
var _elm_lang$svg$Svg_Attributes$orientation = _elm_lang$virtual_dom$VirtualDom$attribute('orientation');
var _elm_lang$svg$Svg_Attributes$orient = _elm_lang$virtual_dom$VirtualDom$attribute('orient');
var _elm_lang$svg$Svg_Attributes$order = _elm_lang$virtual_dom$VirtualDom$attribute('order');
var _elm_lang$svg$Svg_Attributes$operator = _elm_lang$virtual_dom$VirtualDom$attribute('operator');
var _elm_lang$svg$Svg_Attributes$offset = _elm_lang$virtual_dom$VirtualDom$attribute('offset');
var _elm_lang$svg$Svg_Attributes$numOctaves = _elm_lang$virtual_dom$VirtualDom$attribute('numOctaves');
var _elm_lang$svg$Svg_Attributes$name = _elm_lang$virtual_dom$VirtualDom$attribute('name');
var _elm_lang$svg$Svg_Attributes$mode = _elm_lang$virtual_dom$VirtualDom$attribute('mode');
var _elm_lang$svg$Svg_Attributes$min = _elm_lang$virtual_dom$VirtualDom$attribute('min');
var _elm_lang$svg$Svg_Attributes$method = _elm_lang$virtual_dom$VirtualDom$attribute('method');
var _elm_lang$svg$Svg_Attributes$media = _elm_lang$virtual_dom$VirtualDom$attribute('media');
var _elm_lang$svg$Svg_Attributes$max = _elm_lang$virtual_dom$VirtualDom$attribute('max');
var _elm_lang$svg$Svg_Attributes$mathematical = _elm_lang$virtual_dom$VirtualDom$attribute('mathematical');
var _elm_lang$svg$Svg_Attributes$maskUnits = _elm_lang$virtual_dom$VirtualDom$attribute('maskUnits');
var _elm_lang$svg$Svg_Attributes$maskContentUnits = _elm_lang$virtual_dom$VirtualDom$attribute('maskContentUnits');
var _elm_lang$svg$Svg_Attributes$markerWidth = _elm_lang$virtual_dom$VirtualDom$attribute('markerWidth');
var _elm_lang$svg$Svg_Attributes$markerUnits = _elm_lang$virtual_dom$VirtualDom$attribute('markerUnits');
var _elm_lang$svg$Svg_Attributes$markerHeight = _elm_lang$virtual_dom$VirtualDom$attribute('markerHeight');
var _elm_lang$svg$Svg_Attributes$local = _elm_lang$virtual_dom$VirtualDom$attribute('local');
var _elm_lang$svg$Svg_Attributes$limitingConeAngle = _elm_lang$virtual_dom$VirtualDom$attribute('limitingConeAngle');
var _elm_lang$svg$Svg_Attributes$lengthAdjust = _elm_lang$virtual_dom$VirtualDom$attribute('lengthAdjust');
var _elm_lang$svg$Svg_Attributes$lang = _elm_lang$virtual_dom$VirtualDom$attribute('lang');
var _elm_lang$svg$Svg_Attributes$keyTimes = _elm_lang$virtual_dom$VirtualDom$attribute('keyTimes');
var _elm_lang$svg$Svg_Attributes$keySplines = _elm_lang$virtual_dom$VirtualDom$attribute('keySplines');
var _elm_lang$svg$Svg_Attributes$keyPoints = _elm_lang$virtual_dom$VirtualDom$attribute('keyPoints');
var _elm_lang$svg$Svg_Attributes$kernelUnitLength = _elm_lang$virtual_dom$VirtualDom$attribute('kernelUnitLength');
var _elm_lang$svg$Svg_Attributes$kernelMatrix = _elm_lang$virtual_dom$VirtualDom$attribute('kernelMatrix');
var _elm_lang$svg$Svg_Attributes$k4 = _elm_lang$virtual_dom$VirtualDom$attribute('k4');
var _elm_lang$svg$Svg_Attributes$k3 = _elm_lang$virtual_dom$VirtualDom$attribute('k3');
var _elm_lang$svg$Svg_Attributes$k2 = _elm_lang$virtual_dom$VirtualDom$attribute('k2');
var _elm_lang$svg$Svg_Attributes$k1 = _elm_lang$virtual_dom$VirtualDom$attribute('k1');
var _elm_lang$svg$Svg_Attributes$k = _elm_lang$virtual_dom$VirtualDom$attribute('k');
var _elm_lang$svg$Svg_Attributes$intercept = _elm_lang$virtual_dom$VirtualDom$attribute('intercept');
var _elm_lang$svg$Svg_Attributes$in2 = _elm_lang$virtual_dom$VirtualDom$attribute('in2');
var _elm_lang$svg$Svg_Attributes$in_ = _elm_lang$virtual_dom$VirtualDom$attribute('in');
var _elm_lang$svg$Svg_Attributes$ideographic = _elm_lang$virtual_dom$VirtualDom$attribute('ideographic');
var _elm_lang$svg$Svg_Attributes$id = _elm_lang$virtual_dom$VirtualDom$attribute('id');
var _elm_lang$svg$Svg_Attributes$horizOriginY = _elm_lang$virtual_dom$VirtualDom$attribute('horiz-origin-y');
var _elm_lang$svg$Svg_Attributes$horizOriginX = _elm_lang$virtual_dom$VirtualDom$attribute('horiz-origin-x');
var _elm_lang$svg$Svg_Attributes$horizAdvX = _elm_lang$virtual_dom$VirtualDom$attribute('horiz-adv-x');
var _elm_lang$svg$Svg_Attributes$height = _elm_lang$virtual_dom$VirtualDom$attribute('height');
var _elm_lang$svg$Svg_Attributes$hanging = _elm_lang$virtual_dom$VirtualDom$attribute('hanging');
var _elm_lang$svg$Svg_Attributes$gradientUnits = _elm_lang$virtual_dom$VirtualDom$attribute('gradientUnits');
var _elm_lang$svg$Svg_Attributes$gradientTransform = _elm_lang$virtual_dom$VirtualDom$attribute('gradientTransform');
var _elm_lang$svg$Svg_Attributes$glyphRef = _elm_lang$virtual_dom$VirtualDom$attribute('glyphRef');
var _elm_lang$svg$Svg_Attributes$glyphName = _elm_lang$virtual_dom$VirtualDom$attribute('glyph-name');
var _elm_lang$svg$Svg_Attributes$g2 = _elm_lang$virtual_dom$VirtualDom$attribute('g2');
var _elm_lang$svg$Svg_Attributes$g1 = _elm_lang$virtual_dom$VirtualDom$attribute('g1');
var _elm_lang$svg$Svg_Attributes$fy = _elm_lang$virtual_dom$VirtualDom$attribute('fy');
var _elm_lang$svg$Svg_Attributes$fx = _elm_lang$virtual_dom$VirtualDom$attribute('fx');
var _elm_lang$svg$Svg_Attributes$from = _elm_lang$virtual_dom$VirtualDom$attribute('from');
var _elm_lang$svg$Svg_Attributes$format = _elm_lang$virtual_dom$VirtualDom$attribute('format');
var _elm_lang$svg$Svg_Attributes$filterUnits = _elm_lang$virtual_dom$VirtualDom$attribute('filterUnits');
var _elm_lang$svg$Svg_Attributes$filterRes = _elm_lang$virtual_dom$VirtualDom$attribute('filterRes');
var _elm_lang$svg$Svg_Attributes$externalResourcesRequired = _elm_lang$virtual_dom$VirtualDom$attribute('externalResourcesRequired');
var _elm_lang$svg$Svg_Attributes$exponent = _elm_lang$virtual_dom$VirtualDom$attribute('exponent');
var _elm_lang$svg$Svg_Attributes$end = _elm_lang$virtual_dom$VirtualDom$attribute('end');
var _elm_lang$svg$Svg_Attributes$elevation = _elm_lang$virtual_dom$VirtualDom$attribute('elevation');
var _elm_lang$svg$Svg_Attributes$edgeMode = _elm_lang$virtual_dom$VirtualDom$attribute('edgeMode');
var _elm_lang$svg$Svg_Attributes$dy = _elm_lang$virtual_dom$VirtualDom$attribute('dy');
var _elm_lang$svg$Svg_Attributes$dx = _elm_lang$virtual_dom$VirtualDom$attribute('dx');
var _elm_lang$svg$Svg_Attributes$dur = _elm_lang$virtual_dom$VirtualDom$attribute('dur');
var _elm_lang$svg$Svg_Attributes$divisor = _elm_lang$virtual_dom$VirtualDom$attribute('divisor');
var _elm_lang$svg$Svg_Attributes$diffuseConstant = _elm_lang$virtual_dom$VirtualDom$attribute('diffuseConstant');
var _elm_lang$svg$Svg_Attributes$descent = _elm_lang$virtual_dom$VirtualDom$attribute('descent');
var _elm_lang$svg$Svg_Attributes$decelerate = _elm_lang$virtual_dom$VirtualDom$attribute('decelerate');
var _elm_lang$svg$Svg_Attributes$d = _elm_lang$virtual_dom$VirtualDom$attribute('d');
var _elm_lang$svg$Svg_Attributes$cy = _elm_lang$virtual_dom$VirtualDom$attribute('cy');
var _elm_lang$svg$Svg_Attributes$cx = _elm_lang$virtual_dom$VirtualDom$attribute('cx');
var _elm_lang$svg$Svg_Attributes$contentStyleType = _elm_lang$virtual_dom$VirtualDom$attribute('contentStyleType');
var _elm_lang$svg$Svg_Attributes$contentScriptType = _elm_lang$virtual_dom$VirtualDom$attribute('contentScriptType');
var _elm_lang$svg$Svg_Attributes$clipPathUnits = _elm_lang$virtual_dom$VirtualDom$attribute('clipPathUnits');
var _elm_lang$svg$Svg_Attributes$class = _elm_lang$virtual_dom$VirtualDom$attribute('class');
var _elm_lang$svg$Svg_Attributes$capHeight = _elm_lang$virtual_dom$VirtualDom$attribute('cap-height');
var _elm_lang$svg$Svg_Attributes$calcMode = _elm_lang$virtual_dom$VirtualDom$attribute('calcMode');
var _elm_lang$svg$Svg_Attributes$by = _elm_lang$virtual_dom$VirtualDom$attribute('by');
var _elm_lang$svg$Svg_Attributes$bias = _elm_lang$virtual_dom$VirtualDom$attribute('bias');
var _elm_lang$svg$Svg_Attributes$begin = _elm_lang$virtual_dom$VirtualDom$attribute('begin');
var _elm_lang$svg$Svg_Attributes$bbox = _elm_lang$virtual_dom$VirtualDom$attribute('bbox');
var _elm_lang$svg$Svg_Attributes$baseProfile = _elm_lang$virtual_dom$VirtualDom$attribute('baseProfile');
var _elm_lang$svg$Svg_Attributes$baseFrequency = _elm_lang$virtual_dom$VirtualDom$attribute('baseFrequency');
var _elm_lang$svg$Svg_Attributes$azimuth = _elm_lang$virtual_dom$VirtualDom$attribute('azimuth');
var _elm_lang$svg$Svg_Attributes$autoReverse = _elm_lang$virtual_dom$VirtualDom$attribute('autoReverse');
var _elm_lang$svg$Svg_Attributes$attributeType = _elm_lang$virtual_dom$VirtualDom$attribute('attributeType');
var _elm_lang$svg$Svg_Attributes$attributeName = _elm_lang$virtual_dom$VirtualDom$attribute('attributeName');
var _elm_lang$svg$Svg_Attributes$ascent = _elm_lang$virtual_dom$VirtualDom$attribute('ascent');
var _elm_lang$svg$Svg_Attributes$arabicForm = _elm_lang$virtual_dom$VirtualDom$attribute('arabic-form');
var _elm_lang$svg$Svg_Attributes$amplitude = _elm_lang$virtual_dom$VirtualDom$attribute('amplitude');
var _elm_lang$svg$Svg_Attributes$allowReorder = _elm_lang$virtual_dom$VirtualDom$attribute('allowReorder');
var _elm_lang$svg$Svg_Attributes$alphabetic = _elm_lang$virtual_dom$VirtualDom$attribute('alphabetic');
var _elm_lang$svg$Svg_Attributes$additive = _elm_lang$virtual_dom$VirtualDom$attribute('additive');
var _elm_lang$svg$Svg_Attributes$accumulate = _elm_lang$virtual_dom$VirtualDom$attribute('accumulate');
var _elm_lang$svg$Svg_Attributes$accelerate = _elm_lang$virtual_dom$VirtualDom$attribute('accelerate');
var _elm_lang$svg$Svg_Attributes$accentHeight = _elm_lang$virtual_dom$VirtualDom$attribute('accent-height');

var _elm_lang$svg$Svg_Events$on = _elm_lang$virtual_dom$VirtualDom$on;
var _elm_lang$svg$Svg_Events$simpleOn = F2(
	function (name, msg) {
		return A2(
			_elm_lang$svg$Svg_Events$on,
			name,
			_elm_lang$core$Json_Decode$succeed(msg));
	});
var _elm_lang$svg$Svg_Events$onBegin = _elm_lang$svg$Svg_Events$simpleOn('begin');
var _elm_lang$svg$Svg_Events$onEnd = _elm_lang$svg$Svg_Events$simpleOn('end');
var _elm_lang$svg$Svg_Events$onRepeat = _elm_lang$svg$Svg_Events$simpleOn('repeat');
var _elm_lang$svg$Svg_Events$onAbort = _elm_lang$svg$Svg_Events$simpleOn('abort');
var _elm_lang$svg$Svg_Events$onError = _elm_lang$svg$Svg_Events$simpleOn('error');
var _elm_lang$svg$Svg_Events$onResize = _elm_lang$svg$Svg_Events$simpleOn('resize');
var _elm_lang$svg$Svg_Events$onScroll = _elm_lang$svg$Svg_Events$simpleOn('scroll');
var _elm_lang$svg$Svg_Events$onLoad = _elm_lang$svg$Svg_Events$simpleOn('load');
var _elm_lang$svg$Svg_Events$onUnload = _elm_lang$svg$Svg_Events$simpleOn('unload');
var _elm_lang$svg$Svg_Events$onZoom = _elm_lang$svg$Svg_Events$simpleOn('zoom');
var _elm_lang$svg$Svg_Events$onActivate = _elm_lang$svg$Svg_Events$simpleOn('activate');
var _elm_lang$svg$Svg_Events$onClick = _elm_lang$svg$Svg_Events$simpleOn('click');
var _elm_lang$svg$Svg_Events$onFocusIn = _elm_lang$svg$Svg_Events$simpleOn('focusin');
var _elm_lang$svg$Svg_Events$onFocusOut = _elm_lang$svg$Svg_Events$simpleOn('focusout');
var _elm_lang$svg$Svg_Events$onMouseDown = _elm_lang$svg$Svg_Events$simpleOn('mousedown');
var _elm_lang$svg$Svg_Events$onMouseMove = _elm_lang$svg$Svg_Events$simpleOn('mousemove');
var _elm_lang$svg$Svg_Events$onMouseOut = _elm_lang$svg$Svg_Events$simpleOn('mouseout');
var _elm_lang$svg$Svg_Events$onMouseOver = _elm_lang$svg$Svg_Events$simpleOn('mouseover');
var _elm_lang$svg$Svg_Events$onMouseUp = _elm_lang$svg$Svg_Events$simpleOn('mouseup');

var _elm_lang$svg$Svg_Lazy$lazy3 = _elm_lang$virtual_dom$VirtualDom$lazy3;
var _elm_lang$svg$Svg_Lazy$lazy2 = _elm_lang$virtual_dom$VirtualDom$lazy2;
var _elm_lang$svg$Svg_Lazy$lazy = _elm_lang$virtual_dom$VirtualDom$lazy;

var _fredcy$elm_parseint$ParseInt$charFromInt = function (i) {
	return (_elm_lang$core$Native_Utils.cmp(i, 10) < 0) ? _elm_lang$core$Char$fromCode(
		i + _elm_lang$core$Char$toCode(
			_elm_lang$core$Native_Utils.chr('0'))) : ((_elm_lang$core$Native_Utils.cmp(i, 36) < 0) ? _elm_lang$core$Char$fromCode(
		(i - 10) + _elm_lang$core$Char$toCode(
			_elm_lang$core$Native_Utils.chr('A'))) : _elm_lang$core$Native_Utils.crash(
		'ParseInt',
		{
			start: {line: 158, column: 9},
			end: {line: 158, column: 20}
		})(
		_elm_lang$core$Basics$toString(i)));
};
var _fredcy$elm_parseint$ParseInt$toRadixUnsafe = F2(
	function (radix, i) {
		return (_elm_lang$core$Native_Utils.cmp(i, radix) < 0) ? _elm_lang$core$String$fromChar(
			_fredcy$elm_parseint$ParseInt$charFromInt(i)) : A2(
			_elm_lang$core$Basics_ops['++'],
			A2(_fredcy$elm_parseint$ParseInt$toRadixUnsafe, radix, (i / radix) | 0),
			_elm_lang$core$String$fromChar(
				_fredcy$elm_parseint$ParseInt$charFromInt(
					A2(_elm_lang$core$Basics_ops['%'], i, radix))));
	});
var _fredcy$elm_parseint$ParseInt$toOct = _fredcy$elm_parseint$ParseInt$toRadixUnsafe(8);
var _fredcy$elm_parseint$ParseInt$toHex = _fredcy$elm_parseint$ParseInt$toRadixUnsafe(16);
var _fredcy$elm_parseint$ParseInt$isBetween = F3(
	function (lower, upper, c) {
		var ci = _elm_lang$core$Char$toCode(c);
		return (_elm_lang$core$Native_Utils.cmp(
			_elm_lang$core$Char$toCode(lower),
			ci) < 1) && (_elm_lang$core$Native_Utils.cmp(
			ci,
			_elm_lang$core$Char$toCode(upper)) < 1);
	});
var _fredcy$elm_parseint$ParseInt$charOffset = F2(
	function (basis, c) {
		return _elm_lang$core$Char$toCode(c) - _elm_lang$core$Char$toCode(basis);
	});
var _fredcy$elm_parseint$ParseInt$InvalidRadix = function (a) {
	return {ctor: 'InvalidRadix', _0: a};
};
var _fredcy$elm_parseint$ParseInt$toRadix = F2(
	function (radix, i) {
		return ((_elm_lang$core$Native_Utils.cmp(2, radix) < 1) && (_elm_lang$core$Native_Utils.cmp(radix, 36) < 1)) ? ((_elm_lang$core$Native_Utils.cmp(i, 0) < 0) ? _elm_lang$core$Result$Ok(
			A2(
				_elm_lang$core$Basics_ops['++'],
				'-',
				A2(_fredcy$elm_parseint$ParseInt$toRadixUnsafe, radix, 0 - i))) : _elm_lang$core$Result$Ok(
			A2(_fredcy$elm_parseint$ParseInt$toRadixUnsafe, radix, i))) : _elm_lang$core$Result$Err(
			_fredcy$elm_parseint$ParseInt$InvalidRadix(radix));
	});
var _fredcy$elm_parseint$ParseInt$OutOfRange = function (a) {
	return {ctor: 'OutOfRange', _0: a};
};
var _fredcy$elm_parseint$ParseInt$InvalidChar = function (a) {
	return {ctor: 'InvalidChar', _0: a};
};
var _fredcy$elm_parseint$ParseInt$intFromChar = F2(
	function (radix, c) {
		var validInt = function (i) {
			return (_elm_lang$core$Native_Utils.cmp(i, radix) < 0) ? _elm_lang$core$Result$Ok(i) : _elm_lang$core$Result$Err(
				_fredcy$elm_parseint$ParseInt$OutOfRange(c));
		};
		var toInt = A3(
			_fredcy$elm_parseint$ParseInt$isBetween,
			_elm_lang$core$Native_Utils.chr('0'),
			_elm_lang$core$Native_Utils.chr('9'),
			c) ? _elm_lang$core$Result$Ok(
			A2(
				_fredcy$elm_parseint$ParseInt$charOffset,
				_elm_lang$core$Native_Utils.chr('0'),
				c)) : (A3(
			_fredcy$elm_parseint$ParseInt$isBetween,
			_elm_lang$core$Native_Utils.chr('a'),
			_elm_lang$core$Native_Utils.chr('z'),
			c) ? _elm_lang$core$Result$Ok(
			10 + A2(
				_fredcy$elm_parseint$ParseInt$charOffset,
				_elm_lang$core$Native_Utils.chr('a'),
				c)) : (A3(
			_fredcy$elm_parseint$ParseInt$isBetween,
			_elm_lang$core$Native_Utils.chr('A'),
			_elm_lang$core$Native_Utils.chr('Z'),
			c) ? _elm_lang$core$Result$Ok(
			10 + A2(
				_fredcy$elm_parseint$ParseInt$charOffset,
				_elm_lang$core$Native_Utils.chr('A'),
				c)) : _elm_lang$core$Result$Err(
			_fredcy$elm_parseint$ParseInt$InvalidChar(c))));
		return A2(_elm_lang$core$Result$andThen, validInt, toInt);
	});
var _fredcy$elm_parseint$ParseInt$parseIntR = F2(
	function (radix, rstring) {
		var _p0 = _elm_lang$core$String$uncons(rstring);
		if (_p0.ctor === 'Nothing') {
			return _elm_lang$core$Result$Ok(0);
		} else {
			return A2(
				_elm_lang$core$Result$andThen,
				function (ci) {
					return A2(
						_elm_lang$core$Result$andThen,
						function (ri) {
							return _elm_lang$core$Result$Ok(ci + (ri * radix));
						},
						A2(_fredcy$elm_parseint$ParseInt$parseIntR, radix, _p0._0._1));
				},
				A2(_fredcy$elm_parseint$ParseInt$intFromChar, radix, _p0._0._0));
		}
	});
var _fredcy$elm_parseint$ParseInt$parseIntRadix = F2(
	function (radix, string) {
		return ((_elm_lang$core$Native_Utils.cmp(2, radix) < 1) && (_elm_lang$core$Native_Utils.cmp(radix, 36) < 1)) ? A2(
			_fredcy$elm_parseint$ParseInt$parseIntR,
			radix,
			_elm_lang$core$String$reverse(string)) : _elm_lang$core$Result$Err(
			_fredcy$elm_parseint$ParseInt$InvalidRadix(radix));
	});
var _fredcy$elm_parseint$ParseInt$parseInt = _fredcy$elm_parseint$ParseInt$parseIntRadix(10);
var _fredcy$elm_parseint$ParseInt$parseIntOct = _fredcy$elm_parseint$ParseInt$parseIntRadix(8);
var _fredcy$elm_parseint$ParseInt$parseIntHex = _fredcy$elm_parseint$ParseInt$parseIntRadix(16);

var _gampleman$elm_visualization$Visualization_Force$isCompleted = function (_p0) {
	var _p1 = _p0;
	return _elm_lang$core$Native_Utils.cmp(_p1._0.alpha, _p1._0.minAlpha) < 1;
};
var _gampleman$elm_visualization$Visualization_Force$applyForce = F3(
	function (alpha, force, entities) {
		var _p2 = force;
		switch (_p2.ctor) {
			case 'Center':
				var n = _elm_lang$core$Basics$toFloat(
					_elm_lang$core$Dict$size(entities));
				var _p3 = A3(
					_elm_lang$core$Dict$foldr,
					F3(
						function (_p5, ent, _p4) {
							var _p6 = _p4;
							return {ctor: '_Tuple2', _0: _p6._0 + ent.x, _1: _p6._1 + ent.y};
						}),
					{ctor: '_Tuple2', _0: 0, _1: 0},
					entities);
				var sumx = _p3._0;
				var sumy = _p3._1;
				var sx = (sumx / n) - _p2._0;
				var sy = (sumy / n) - _p2._1;
				return A2(
					_elm_lang$core$Dict$map,
					F2(
						function (_p7, ent) {
							return _elm_lang$core$Native_Utils.update(
								ent,
								{x: ent.x - sx, y: ent.y - sy});
						}),
					entities);
			case 'Collision':
				return _elm_lang$core$Native_Utils.crashCase(
					'Visualization.Force',
					{
						start: {line: 111, column: 5},
						end: {line: 197, column: 42}
					},
					_p2)('not implemented');
			case 'Links':
				return A3(
					_elm_lang$core$List$foldl,
					F2(
						function (_p9, ents) {
							var _p10 = _p9;
							var _p16 = _p10.target;
							var _p15 = _p10.source;
							var _p14 = _p10.bias;
							var _p11 = {
								ctor: '_Tuple2',
								_0: A2(_elm_lang$core$Dict$get, _p15, ents),
								_1: A2(_elm_lang$core$Dict$get, _p16, ents)
							};
							if (((_p11.ctor === '_Tuple2') && (_p11._0.ctor === 'Just')) && (_p11._1.ctor === 'Just')) {
								var _p13 = _p11._1._0;
								var _p12 = _p11._0._0;
								var y = ((_p13.y + _p13.vy) - _p12.y) - _p12.vy;
								var x = ((_p13.x + _p13.vx) - _p12.x) - _p12.vx;
								var d = _elm_lang$core$Basics$sqrt(
									Math.pow(x, 2) + Math.pow(y, 2));
								var l = (((d - _p10.distance) / d) * alpha) * _p10.strength;
								return A3(
									_elm_lang$core$Dict$update,
									_p15,
									_elm_lang$core$Maybe$map(
										function (tn) {
											return _elm_lang$core$Native_Utils.update(
												tn,
												{vx: tn.vx + ((x * l) * (1 - _p14)), vy: tn.vy + ((y * l) * (1 - _p14))});
										}),
									A3(
										_elm_lang$core$Dict$update,
										_p16,
										_elm_lang$core$Maybe$map(
											function (sn) {
												return _elm_lang$core$Native_Utils.update(
													sn,
													{vx: sn.vx - ((x * l) * _p14), vy: sn.vy - ((y * l) * _p14)});
											}),
										ents));
							} else {
								return ents;
							}
						}),
					entities,
					_p2._1);
			case 'ManyBody':
				return A2(
					_elm_lang$core$Dict$map,
					F2(
						function (key, opEntity) {
							return A3(
								_elm_lang$core$Dict$foldr,
								F3(
									function (key2, entity2, entity) {
										if (!_elm_lang$core$Native_Utils.eq(key, key2)) {
											var strength = A2(
												_elm_lang$core$Maybe$withDefault,
												0,
												A2(
													_elm_lang$core$Maybe$map,
													function (_) {
														return _.strength;
													},
													A2(_elm_lang$core$Dict$get, key2, _p2._3)));
											var y = entity2.y - entity.y;
											var x = entity2.x - entity.x;
											var l = Math.pow(x, 2) + Math.pow(y, 2);
											var w = (strength * alpha) / l;
											return _elm_lang$core$Native_Utils.update(
												entity,
												{vx: entity.vx + (x * w), vy: entity.vy + (y * w)});
										} else {
											return entity;
										}
									}),
								opEntity,
								entities);
						}),
					entities);
			case 'X':
				return _elm_lang$core$Native_Utils.crashCase(
					'Visualization.Force',
					{
						start: {line: 111, column: 5},
						end: {line: 197, column: 42}
					},
					_p2)('not implemented');
			default:
				return _elm_lang$core$Native_Utils.crashCase(
					'Visualization.Force',
					{
						start: {line: 111, column: 5},
						end: {line: 197, column: 42}
					},
					_p2)('not implemented');
		}
	});
var _gampleman$elm_visualization$Visualization_Force$initialAngle = _elm_lang$core$Basics$pi * (3 - _elm_lang$core$Basics$sqrt(5));
var _gampleman$elm_visualization$Visualization_Force$initialRadius = 10;
var _gampleman$elm_visualization$Visualization_Force$entity = F2(
	function (index, a) {
		var angle = _elm_lang$core$Basics$toFloat(index) * _gampleman$elm_visualization$Visualization_Force$initialAngle;
		var radius = _elm_lang$core$Basics$sqrt(
			_elm_lang$core$Basics$toFloat(index)) * _gampleman$elm_visualization$Visualization_Force$initialRadius;
		return {
			x: radius * _elm_lang$core$Basics$cos(angle),
			y: radius * _elm_lang$core$Basics$sin(angle),
			vx: 0.0,
			vy: 0.0,
			id: index,
			value: a
		};
	});
var _gampleman$elm_visualization$Visualization_Force$CollisionParam = F2(
	function (a, b) {
		return {radius: a, strength: b};
	});
var _gampleman$elm_visualization$Visualization_Force$LinkParam = F5(
	function (a, b, c, d, e) {
		return {source: a, target: b, distance: c, strength: d, bias: e};
	});
var _gampleman$elm_visualization$Visualization_Force$ManyBodyParam = function (a) {
	return {strength: a};
};
var _gampleman$elm_visualization$Visualization_Force$DirectionalParam = F2(
	function (a, b) {
		return {force: a, position: b};
	});
var _gampleman$elm_visualization$Visualization_Force$State = function (a) {
	return {ctor: 'State', _0: a};
};
var _gampleman$elm_visualization$Visualization_Force$tick = F2(
	function (_p19, nodes) {
		var _p20 = _p19;
		var _p21 = _p20._0;
		var updateEntity = function (ent) {
			return _elm_lang$core$Native_Utils.update(
				ent,
				{x: ent.x + (ent.vx * _p21.velocityDecay), vx: ent.vx * _p21.velocityDecay, y: ent.y + (ent.vy * _p21.velocityDecay), vy: ent.vy * _p21.velocityDecay});
		};
		var dictNodes = A3(
			_elm_lang$core$List$foldl,
			function (node) {
				return A2(_elm_lang$core$Dict$insert, node.id, node);
			},
			_elm_lang$core$Dict$empty,
			nodes);
		var alpha = _p21.alpha + ((_p21.alphaTarget - _p21.alpha) * _p21.alphaDecay);
		var newNodes = A3(
			_elm_lang$core$List$foldl,
			_gampleman$elm_visualization$Visualization_Force$applyForce(alpha),
			dictNodes,
			_p21.forces);
		return {
			ctor: '_Tuple2',
			_0: _gampleman$elm_visualization$Visualization_Force$State(
				_elm_lang$core$Native_Utils.update(
					_p21,
					{alpha: alpha})),
			_1: A2(
				_elm_lang$core$List$map,
				updateEntity,
				_elm_lang$core$Dict$values(newNodes))
		};
	});
var _gampleman$elm_visualization$Visualization_Force$computeSimulation = F2(
	function (state, entities) {
		computeSimulation:
		while (true) {
			if (_gampleman$elm_visualization$Visualization_Force$isCompleted(state)) {
				return entities;
			} else {
				var _p22 = A2(_gampleman$elm_visualization$Visualization_Force$tick, state, entities);
				var newState = _p22._0;
				var newEntities = _p22._1;
				var _v6 = newState,
					_v7 = newEntities;
				state = _v6;
				entities = _v7;
				continue computeSimulation;
			}
		}
	});
var _gampleman$elm_visualization$Visualization_Force$simulation = function (forces) {
	return _gampleman$elm_visualization$Visualization_Force$State(
		{
			forces: forces,
			alpha: 1.0,
			minAlpha: 1.0e-3,
			alphaDecay: 1 - Math.pow(1.0e-3, 1 / 300),
			alphaTarget: 0.0,
			velocityDecay: 0.6
		});
};
var _gampleman$elm_visualization$Visualization_Force$iterations = F2(
	function (iterations, _p23) {
		var _p24 = _p23;
		var _p25 = _p24._0;
		return _gampleman$elm_visualization$Visualization_Force$State(
			_elm_lang$core$Native_Utils.update(
				_p25,
				{
					alphaDecay: 1 - Math.pow(
						_p25.minAlpha,
						1 / _elm_lang$core$Basics$toFloat(iterations))
				}));
	});
var _gampleman$elm_visualization$Visualization_Force$reheat = function (_p26) {
	var _p27 = _p26;
	return _gampleman$elm_visualization$Visualization_Force$State(
		_elm_lang$core$Native_Utils.update(
			_p27._0,
			{alpha: 1.0}));
};
var _gampleman$elm_visualization$Visualization_Force$Y = function (a) {
	return {ctor: 'Y', _0: a};
};
var _gampleman$elm_visualization$Visualization_Force$X = function (a) {
	return {ctor: 'X', _0: a};
};
var _gampleman$elm_visualization$Visualization_Force$ManyBody = F4(
	function (a, b, c, d) {
		return {ctor: 'ManyBody', _0: a, _1: b, _2: c, _3: d};
	});
var _gampleman$elm_visualization$Visualization_Force$manyBodyStrength = function (strength) {
	return function (_p28) {
		return A4(
			_gampleman$elm_visualization$Visualization_Force$ManyBody,
			0.9,
			1,
			1 / 0,
			_elm_lang$core$Dict$fromList(
				A2(
					_elm_lang$core$List$map,
					function (key) {
						return {
							ctor: '_Tuple2',
							_0: key,
							_1: {strength: strength}
						};
					},
					_p28)));
	};
};
var _gampleman$elm_visualization$Visualization_Force$manyBody = _gampleman$elm_visualization$Visualization_Force$manyBodyStrength(-30);
var _gampleman$elm_visualization$Visualization_Force$Links = F2(
	function (a, b) {
		return {ctor: 'Links', _0: a, _1: b};
	});
var _gampleman$elm_visualization$Visualization_Force$customLinks = F2(
	function (iterations, list) {
		var counts = A3(
			_elm_lang$core$List$foldr,
			F2(
				function (_p29, d) {
					var _p30 = _p29;
					return A3(
						_elm_lang$core$Dict$update,
						_p30.target,
						function (_p31) {
							return _elm_lang$core$Maybe$Just(
								A2(
									_elm_lang$core$Maybe$withDefault,
									1,
									A2(
										_elm_lang$core$Maybe$map,
										F2(
											function (x, y) {
												return x + y;
											})(1),
										_p31)));
						},
						A3(
							_elm_lang$core$Dict$update,
							_p30.source,
							function (_p32) {
								return _elm_lang$core$Maybe$Just(
									A2(
										_elm_lang$core$Maybe$withDefault,
										1,
										A2(
											_elm_lang$core$Maybe$map,
											F2(
												function (x, y) {
													return x + y;
												})(1),
											_p32)));
							},
							d));
				}),
			_elm_lang$core$Dict$empty,
			list);
		var count = function (key) {
			return A2(
				_elm_lang$core$Maybe$withDefault,
				0,
				A2(_elm_lang$core$Dict$get, key, counts));
		};
		return A2(
			_gampleman$elm_visualization$Visualization_Force$Links,
			iterations,
			A2(
				_elm_lang$core$List$map,
				function (_p33) {
					var _p34 = _p33;
					var _p36 = _p34.target;
					var _p35 = _p34.source;
					return {
						source: _p35,
						target: _p36,
						distance: _p34.distance,
						strength: A2(
							_elm_lang$core$Maybe$withDefault,
							1 / A2(
								_elm_lang$core$Basics$min,
								count(_p35),
								count(_p36)),
							_p34.strength),
						bias: count(_p35) / (count(_p35) + count(_p36))
					};
				},
				list));
	});
var _gampleman$elm_visualization$Visualization_Force$links = function (_p37) {
	return A2(
		_gampleman$elm_visualization$Visualization_Force$customLinks,
		1,
		A2(
			_elm_lang$core$List$map,
			function (_p38) {
				var _p39 = _p38;
				return {source: _p39._0, target: _p39._1, distance: 30, strength: _elm_lang$core$Maybe$Nothing};
			},
			_p37));
};
var _gampleman$elm_visualization$Visualization_Force$Collision = F2(
	function (a, b) {
		return {ctor: 'Collision', _0: a, _1: b};
	});
var _gampleman$elm_visualization$Visualization_Force$Center = F2(
	function (a, b) {
		return {ctor: 'Center', _0: a, _1: b};
	});
var _gampleman$elm_visualization$Visualization_Force$center = _gampleman$elm_visualization$Visualization_Force$Center;

var _gampleman$elm_visualization$Visualization_Path$mod = F2(
	function (a, b) {
		var frac = a / b;
		return (frac - _elm_lang$core$Basics$toFloat(
			_elm_lang$core$Basics$truncate(frac))) * b;
	});
var _gampleman$elm_visualization$Visualization_Path$stringify = F2(
	function (item, _p0) {
		var _p1 = _p0;
		var _p19 = _p1._4;
		var _p18 = _p1._2;
		var _p17 = _p1._3;
		var _p16 = _p1._1;
		var _p15 = _p1._0;
		var _p14 = _p1._5;
		var boolToFloat = function (b) {
			return b ? 1 : 0;
		};
		var epsilon = 1.0e-6;
		var append = F3(
			function (cmd, values, str) {
				return A2(
					_elm_lang$core$Basics_ops['++'],
					str,
					A2(
						_elm_lang$core$Basics_ops['++'],
						cmd,
						A2(
							_elm_lang$core$String$join,
							',',
							A2(_elm_lang$core$List$map, _elm_lang$core$Basics$toString, values))));
			});
		var stringifyArc = F5(
			function (x1_, y1_, x2_, y2_, radius) {
				var y21 = y2_ - y1_;
				var x21 = x2_ - x1_;
				var l21_2 = Math.pow(x21, 2) + Math.pow(y21, 2);
				var l21 = _elm_lang$core$Basics$sqrt(l21_2);
				var y0_ = _p19;
				var y01 = y0_ - y1_;
				var y20 = y2_ - y0_;
				var x0_ = _p17;
				var x01 = x0_ - x1_;
				var l01_2 = Math.pow(x01, 2) + Math.pow(y01, 2);
				var l01 = _elm_lang$core$Basics$sqrt(l01_2);
				var x20 = x2_ - x0_;
				var l20_2 = Math.pow(x20, 2) + Math.pow(y20, 2);
				var r = _elm_lang$core$Basics$abs(radius);
				var l = r * _elm_lang$core$Basics$tan(
					(_elm_lang$core$Basics$pi - _elm_lang$core$Basics$acos(((l21_2 + l01_2) - l20_2) / ((2 * l21) * l01))) / 2);
				var t01 = l / l01;
				var str_ = (_elm_lang$core$Native_Utils.cmp(
					_elm_lang$core$Basics$abs(t01 - 1),
					epsilon) > 0) ? A3(
					append,
					'L',
					{
						ctor: '::',
						_0: x1_ + (t01 * x01),
						_1: {
							ctor: '::',
							_0: y1_ + (t01 * y01),
							_1: {ctor: '[]'}
						}
					},
					_p15) : _p15;
				var t21 = l / l21;
				return _p14 ? {
					ctor: '_Tuple6',
					_0: A3(
						append,
						'M',
						{
							ctor: '::',
							_0: x1_,
							_1: {
								ctor: '::',
								_0: y1_,
								_1: {ctor: '[]'}
							}
						},
						_p15),
					_1: _p16,
					_2: _p18,
					_3: x1_,
					_4: y1_,
					_5: false
				} : ((_elm_lang$core$Native_Utils.cmp(l01_2, epsilon) < 0) ? {ctor: '_Tuple6', _0: _p15, _1: _p16, _2: _p18, _3: _p17, _4: _p19, _5: _p14} : (((!(_elm_lang$core$Native_Utils.cmp(
					_elm_lang$core$Basics$abs((y01 * x21) - (y21 * x01)),
					epsilon) > 0)) || _elm_lang$core$Native_Utils.eq(r, 0)) ? {
					ctor: '_Tuple6',
					_0: A3(
						append,
						'L',
						{
							ctor: '::',
							_0: x1_,
							_1: {
								ctor: '::',
								_0: y1_,
								_1: {ctor: '[]'}
							}
						},
						_p15),
					_1: _p16,
					_2: _p18,
					_3: x1_,
					_4: y1_,
					_5: false
				} : {
					ctor: '_Tuple6',
					_0: A3(
						append,
						'A',
						{
							ctor: '::',
							_0: r,
							_1: {
								ctor: '::',
								_0: r,
								_1: {
									ctor: '::',
									_0: 0,
									_1: {
										ctor: '::',
										_0: 0,
										_1: {
											ctor: '::',
											_0: (_elm_lang$core$Native_Utils.cmp(y01 * x20, x01 * y20) > 0) ? 1 : 0,
											_1: {
												ctor: '::',
												_0: x1_ + (t21 * x21),
												_1: {
													ctor: '::',
													_0: y1_ + (t21 * y21),
													_1: {ctor: '[]'}
												}
											}
										}
									}
								}
							}
						},
						str_),
					_1: _p16,
					_2: _p18,
					_3: x1_ + (t21 * x21),
					_4: y1_ + (t21 * y21),
					_5: false
				}));
			});
		var stringifyArcCustom = F6(
			function (x, y, radius, a0, a1, ccw) {
				var da = ccw ? (a0 - a1) : (a1 - a0);
				var tau = 2 * _elm_lang$core$Basics$pi;
				var cw = boolToFloat(!ccw);
				var r = _elm_lang$core$Basics$abs(radius);
				var dx = r * _elm_lang$core$Basics$cos(a0);
				var x0_ = x + dx;
				var dy = r * _elm_lang$core$Basics$sin(a0);
				var y0_ = y + dy;
				var str_ = _p14 ? A3(
					append,
					'M',
					{
						ctor: '::',
						_0: x0_,
						_1: {
							ctor: '::',
							_0: y0_,
							_1: {ctor: '[]'}
						}
					},
					_p15) : (((_elm_lang$core$Native_Utils.cmp(
					_elm_lang$core$Basics$abs(_p17 - x0_),
					epsilon) > 0) || (_elm_lang$core$Native_Utils.cmp(
					_elm_lang$core$Basics$abs(_p19 - y0_),
					epsilon) > 0)) ? A3(
					append,
					'L',
					{
						ctor: '::',
						_0: x0_,
						_1: {
							ctor: '::',
							_0: y0_,
							_1: {ctor: '[]'}
						}
					},
					_p15) : _p15);
				if (_elm_lang$core$Native_Utils.eq(r, 0)) {
					return {ctor: '_Tuple6', _0: str_, _1: _p16, _2: _p18, _3: _p17, _4: _p19, _5: _p14};
				} else {
					if (_elm_lang$core$Native_Utils.cmp(da, tau - epsilon) > 0) {
						return {
							ctor: '_Tuple6',
							_0: A3(
								append,
								'A',
								{
									ctor: '::',
									_0: r,
									_1: {
										ctor: '::',
										_0: r,
										_1: {
											ctor: '::',
											_0: 0,
											_1: {
												ctor: '::',
												_0: 1,
												_1: {
													ctor: '::',
													_0: cw,
													_1: {
														ctor: '::',
														_0: x0_,
														_1: {
															ctor: '::',
															_0: y0_,
															_1: {ctor: '[]'}
														}
													}
												}
											}
										}
									}
								},
								A3(
									append,
									'A',
									{
										ctor: '::',
										_0: r,
										_1: {
											ctor: '::',
											_0: r,
											_1: {
												ctor: '::',
												_0: 0,
												_1: {
													ctor: '::',
													_0: 1,
													_1: {
														ctor: '::',
														_0: cw,
														_1: {
															ctor: '::',
															_0: x - dx,
															_1: {
																ctor: '::',
																_0: y - dy,
																_1: {ctor: '[]'}
															}
														}
													}
												}
											}
										}
									},
									str_)),
							_1: _p16,
							_2: _p18,
							_3: x0_,
							_4: y0_,
							_5: false
						};
					} else {
						var da_ = (_elm_lang$core$Native_Utils.cmp(da, 0) < 0) ? (A2(_gampleman$elm_visualization$Visualization_Path$mod, da, tau) + tau) : da;
						return {
							ctor: '_Tuple6',
							_0: A3(
								append,
								'A',
								{
									ctor: '::',
									_0: r,
									_1: {
										ctor: '::',
										_0: r,
										_1: {
											ctor: '::',
											_0: 0,
											_1: {
												ctor: '::',
												_0: boolToFloat(
													_elm_lang$core$Native_Utils.cmp(da_, _elm_lang$core$Basics$pi) > -1),
												_1: {
													ctor: '::',
													_0: cw,
													_1: {
														ctor: '::',
														_0: x + (r * _elm_lang$core$Basics$cos(a1)),
														_1: {
															ctor: '::',
															_0: y + (r * _elm_lang$core$Basics$sin(a1)),
															_1: {ctor: '[]'}
														}
													}
												}
											}
										}
									}
								},
								str_),
							_1: _p16,
							_2: _p18,
							_3: x + (r * _elm_lang$core$Basics$cos(a1)),
							_4: y + (r * _elm_lang$core$Basics$sin(a1)),
							_5: false
						};
					}
				}
			});
		var _p2 = item;
		switch (_p2.ctor) {
			case 'Move':
				var _p4 = _p2._0._1;
				var _p3 = _p2._0._0;
				return {
					ctor: '_Tuple6',
					_0: A3(
						append,
						'M',
						{
							ctor: '::',
							_0: _p3,
							_1: {
								ctor: '::',
								_0: _p4,
								_1: {ctor: '[]'}
							}
						},
						_p15),
					_1: _p3,
					_2: _p4,
					_3: _p3,
					_4: _p4,
					_5: false
				};
			case 'Close':
				return _p14 ? {ctor: '_Tuple6', _0: _p15, _1: _p16, _2: _p18, _3: _p17, _4: _p19, _5: _p14} : {
					ctor: '_Tuple6',
					_0: A3(
						append,
						'Z',
						{ctor: '[]'},
						_p15),
					_1: _p16,
					_2: _p18,
					_3: _p16,
					_4: _p18,
					_5: false
				};
			case 'Line':
				var _p6 = _p2._0._1;
				var _p5 = _p2._0._0;
				return {
					ctor: '_Tuple6',
					_0: A3(
						append,
						'L',
						{
							ctor: '::',
							_0: _p5,
							_1: {
								ctor: '::',
								_0: _p6,
								_1: {ctor: '[]'}
							}
						},
						_p15),
					_1: _p16,
					_2: _p18,
					_3: _p5,
					_4: _p6,
					_5: false
				};
			case 'QuadraticCurve':
				var _p8 = _p2._1._1;
				var _p7 = _p2._1._0;
				return {
					ctor: '_Tuple6',
					_0: A3(
						append,
						'Q',
						{
							ctor: '::',
							_0: _p2._0._0,
							_1: {
								ctor: '::',
								_0: _p2._0._1,
								_1: {
									ctor: '::',
									_0: _p7,
									_1: {
										ctor: '::',
										_0: _p8,
										_1: {ctor: '[]'}
									}
								}
							}
						},
						_p15),
					_1: _p16,
					_2: _p18,
					_3: _p7,
					_4: _p8,
					_5: false
				};
			case 'BezierCurve':
				var _p10 = _p2._2._1;
				var _p9 = _p2._2._0;
				return {
					ctor: '_Tuple6',
					_0: A3(
						append,
						'C',
						{
							ctor: '::',
							_0: _p2._0._0,
							_1: {
								ctor: '::',
								_0: _p2._0._1,
								_1: {
									ctor: '::',
									_0: _p2._1._0,
									_1: {
										ctor: '::',
										_0: _p2._1._1,
										_1: {
											ctor: '::',
											_0: _p9,
											_1: {
												ctor: '::',
												_0: _p10,
												_1: {ctor: '[]'}
											}
										}
									}
								}
							}
						},
						_p15),
					_1: _p16,
					_2: _p18,
					_3: _p9,
					_4: _p10,
					_5: false
				};
			case 'Arc':
				return A5(stringifyArc, _p2._0._0, _p2._0._1, _p2._1._0, _p2._1._1, _p2._2);
			case 'ArcCustom':
				return A6(stringifyArcCustom, _p2._0._0, _p2._0._1, _p2._1, _p2._2, _p2._3, _p2._4);
			default:
				var _p13 = _p2._0._1;
				var _p12 = _p2._0._0;
				var _p11 = _p2._1._0;
				return {
					ctor: '_Tuple6',
					_0: A3(
						append,
						'Z',
						{ctor: '[]'},
						A3(
							append,
							'h',
							{
								ctor: '::',
								_0: 0 - _p11,
								_1: {ctor: '[]'}
							},
							A3(
								append,
								'v',
								{
									ctor: '::',
									_0: _p2._1._1,
									_1: {ctor: '[]'}
								},
								A3(
									append,
									'h',
									{
										ctor: '::',
										_0: _p11,
										_1: {ctor: '[]'}
									},
									A3(
										append,
										'M',
										{
											ctor: '::',
											_0: _p12,
											_1: {
												ctor: '::',
												_0: _p13,
												_1: {ctor: '[]'}
											}
										},
										_p15))))),
					_1: _p12,
					_2: _p13,
					_3: _p12,
					_4: _p13,
					_5: false
				};
		}
	});
var _gampleman$elm_visualization$Visualization_Path$toAttrString = function (path) {
	var _p20 = A3(
		_elm_lang$core$List$foldl,
		_gampleman$elm_visualization$Visualization_Path$stringify,
		{ctor: '_Tuple6', _0: '', _1: 0, _2: 0, _3: 0, _4: 0, _5: true},
		path);
	var result = _p20._0;
	return result;
};
var _gampleman$elm_visualization$Visualization_Path$begin = {ctor: '[]'};
var _gampleman$elm_visualization$Visualization_Path$push = F2(
	function (el, list) {
		return A2(
			_elm_lang$core$Basics_ops['++'],
			list,
			{
				ctor: '::',
				_0: el,
				_1: {ctor: '[]'}
			});
	});
var _gampleman$elm_visualization$Visualization_Path$Rect = F2(
	function (a, b) {
		return {ctor: 'Rect', _0: a, _1: b};
	});
var _gampleman$elm_visualization$Visualization_Path$rect = F4(
	function (x, y, w, h) {
		return _gampleman$elm_visualization$Visualization_Path$push(
			A2(
				_gampleman$elm_visualization$Visualization_Path$Rect,
				{ctor: '_Tuple2', _0: x, _1: y},
				{ctor: '_Tuple2', _0: w, _1: h}));
	});
var _gampleman$elm_visualization$Visualization_Path$ArcCustom = F5(
	function (a, b, c, d, e) {
		return {ctor: 'ArcCustom', _0: a, _1: b, _2: c, _3: d, _4: e};
	});
var _gampleman$elm_visualization$Visualization_Path$arc = F6(
	function (x, y, radius, startAngle, endAngle, anticlockwise) {
		return _gampleman$elm_visualization$Visualization_Path$push(
			A5(
				_gampleman$elm_visualization$Visualization_Path$ArcCustom,
				{ctor: '_Tuple2', _0: x, _1: y},
				radius,
				startAngle,
				endAngle,
				anticlockwise));
	});
var _gampleman$elm_visualization$Visualization_Path$Arc = F3(
	function (a, b, c) {
		return {ctor: 'Arc', _0: a, _1: b, _2: c};
	});
var _gampleman$elm_visualization$Visualization_Path$arcTo = F5(
	function (x1, y1, x2, y2, radius) {
		return _gampleman$elm_visualization$Visualization_Path$push(
			A3(
				_gampleman$elm_visualization$Visualization_Path$Arc,
				{ctor: '_Tuple2', _0: x1, _1: y1},
				{ctor: '_Tuple2', _0: x2, _1: y2},
				radius));
	});
var _gampleman$elm_visualization$Visualization_Path$BezierCurve = F3(
	function (a, b, c) {
		return {ctor: 'BezierCurve', _0: a, _1: b, _2: c};
	});
var _gampleman$elm_visualization$Visualization_Path$bezierCurveTo = F6(
	function (cpx1, cpy1, cpx2, cpy2, x, y) {
		return _gampleman$elm_visualization$Visualization_Path$push(
			A3(
				_gampleman$elm_visualization$Visualization_Path$BezierCurve,
				{ctor: '_Tuple2', _0: cpx1, _1: cpy1},
				{ctor: '_Tuple2', _0: cpx2, _1: cpy2},
				{ctor: '_Tuple2', _0: x, _1: y}));
	});
var _gampleman$elm_visualization$Visualization_Path$QuadraticCurve = F2(
	function (a, b) {
		return {ctor: 'QuadraticCurve', _0: a, _1: b};
	});
var _gampleman$elm_visualization$Visualization_Path$quadraticCurveTo = F4(
	function (cpx, cpy, x, y) {
		return _gampleman$elm_visualization$Visualization_Path$push(
			A2(
				_gampleman$elm_visualization$Visualization_Path$QuadraticCurve,
				{ctor: '_Tuple2', _0: cpx, _1: cpy},
				{ctor: '_Tuple2', _0: x, _1: y}));
	});
var _gampleman$elm_visualization$Visualization_Path$Line = function (a) {
	return {ctor: 'Line', _0: a};
};
var _gampleman$elm_visualization$Visualization_Path$lineTo = F2(
	function (x, y) {
		return _gampleman$elm_visualization$Visualization_Path$push(
			_gampleman$elm_visualization$Visualization_Path$Line(
				{ctor: '_Tuple2', _0: x, _1: y}));
	});
var _gampleman$elm_visualization$Visualization_Path$Close = {ctor: 'Close'};
var _gampleman$elm_visualization$Visualization_Path$close = _gampleman$elm_visualization$Visualization_Path$push(_gampleman$elm_visualization$Visualization_Path$Close);
var _gampleman$elm_visualization$Visualization_Path$Move = function (a) {
	return {ctor: 'Move', _0: a};
};
var _gampleman$elm_visualization$Visualization_Path$moveTo = F2(
	function (x, y) {
		return _gampleman$elm_visualization$Visualization_Path$push(
			_gampleman$elm_visualization$Visualization_Path$Move(
				{ctor: '_Tuple2', _0: x, _1: y}));
	});

var _gampleman$elm_visualization$Visualization_StackOffset$pairwise = F2(
	function (f, list) {
		var _p0 = list;
		if (_p0.ctor === '[]') {
			return {ctor: '[]'};
		} else {
			return A3(_elm_lang$core$List$map2, f, list, _p0._1);
		}
	});
var _gampleman$elm_visualization$Visualization_StackOffset$diverging = function (series) {
	var _p1 = series;
	if (_p1.ctor === '[]') {
		return {ctor: '[]'};
	} else {
		var folder = F2(
			function (_p3, _p2) {
				var _p4 = _p3;
				var _p9 = _p4._1;
				var _p5 = _p2;
				var _p8 = _p5._0;
				var _p7 = _p5._1;
				var _p6 = _p5._2;
				var dy = _p9 - _p4._0;
				return (_elm_lang$core$Native_Utils.cmp(dy, 0) > -1) ? {
					ctor: '_Tuple3',
					_0: _p8 + dy,
					_1: _p7,
					_2: {
						ctor: '::',
						_0: {ctor: '_Tuple2', _0: _p8, _1: _p8 + dy},
						_1: _p6
					}
				} : ((_elm_lang$core$Native_Utils.cmp(dy, 0) < 0) ? {
					ctor: '_Tuple3',
					_0: _p8,
					_1: _p7 + dy,
					_2: {
						ctor: '::',
						_0: {ctor: '_Tuple2', _0: _p7 + dy, _1: _p7},
						_1: _p6
					}
				} : {
					ctor: '_Tuple3',
					_0: _p8,
					_1: _p7,
					_2: {
						ctor: '::',
						_0: {ctor: '_Tuple2', _0: _p8, _1: _p9},
						_1: _p6
					}
				});
			});
		var modifyColumn = function (column) {
			return _elm_lang$core$List$reverse(
				function (_p10) {
					var _p11 = _p10;
					return _p11._2;
				}(
					A3(
						_elm_lang$core$List$foldl,
						folder,
						{
							ctor: '_Tuple3',
							_0: 0,
							_1: 0,
							_2: {ctor: '[]'}
						},
						column)));
		};
		return _elm_community$list_extra$List_Extra$transpose(
			A2(
				_elm_lang$core$List$map,
				modifyColumn,
				_elm_community$list_extra$List_Extra$transpose(series)));
	}
};
var _gampleman$elm_visualization$Visualization_StackOffset$none = function (series) {
	var _p12 = series;
	if (_p12.ctor === '[]') {
		return {ctor: '[]'};
	} else {
		var weirdAdd = F2(
			function (_p14, _p13) {
				var _p15 = _p14;
				var _p19 = _p15._1;
				var _p16 = _p13;
				var _p18 = _p16._1;
				var _p17 = _p16._0;
				return _elm_lang$core$Basics$isNaN(_p18) ? {ctor: '_Tuple2', _0: _p17, _1: _p19 + _p17} : {ctor: '_Tuple2', _0: _p18, _1: _p19 + _p18};
			});
		var helper = F2(
			function (s1, _p20) {
				var _p21 = _p20;
				var _p22 = _p21._0;
				return {
					ctor: '_Tuple2',
					_0: A3(_elm_lang$core$List$map2, weirdAdd, s1, _p22),
					_1: {ctor: '::', _0: _p22, _1: _p21._1}
				};
			});
		return _elm_lang$core$List$reverse(
			A2(
				_elm_lang$core$Basics$uncurry,
				F2(
					function (x, y) {
						return {ctor: '::', _0: x, _1: y};
					}),
				A3(
					_elm_lang$core$List$foldl,
					helper,
					{
						ctor: '_Tuple2',
						_0: _p12._0,
						_1: {ctor: '[]'}
					},
					_p12._1)));
	}
};
var _gampleman$elm_visualization$Visualization_StackOffset$expand = function (series) {
	var normalizeColumn = function (column) {
		var deltas = A2(
			_elm_lang$core$List$map,
			function (_p23) {
				return _elm_lang$core$Basics$abs(
					A2(
						_elm_lang$core$Basics$uncurry,
						F2(
							function (x, y) {
								return x - y;
							}),
						_p23));
			},
			column);
		var total = _elm_lang$core$List$sum(deltas);
		return A2(
			_elm_lang$core$List$map,
			function (value) {
				return {ctor: '_Tuple2', _0: 0, _1: value / total};
			},
			deltas);
	};
	return _gampleman$elm_visualization$Visualization_StackOffset$none(
		_elm_community$list_extra$List_Extra$transpose(
			A2(
				_elm_lang$core$List$map,
				normalizeColumn,
				_elm_community$list_extra$List_Extra$transpose(series))));
};
var _gampleman$elm_visualization$Visualization_StackOffset$silhouette = function (series) {
	var _p24 = series;
	if (_p24.ctor === '[]') {
		return {ctor: '[]'};
	} else {
		var ys = A2(
			_elm_lang$core$List$map,
			function (_p25) {
				return _elm_lang$core$List$sum(
					A2(_elm_lang$core$List$map, _elm_lang$core$Tuple$second, _p25));
			},
			_elm_community$list_extra$List_Extra$transpose(series));
		return _gampleman$elm_visualization$Visualization_StackOffset$none(
			{
				ctor: '::',
				_0: A3(
					_elm_lang$core$List$map2,
					F2(
						function (_p26, newY) {
							var _p27 = _p26;
							return {ctor: '_Tuple2', _0: (0 - newY) / 2, _1: _p27._1 + ((0 - newY) / 2)};
						}),
					_p24._0,
					ys),
				_1: _p24._1
			});
	}
};
var _gampleman$elm_visualization$Visualization_StackOffset$wiggle = function (series) {
	var _p28 = series;
	if (_p28.ctor === '[]') {
		return {ctor: '[]'};
	} else {
		var safeDivision = F2(
			function (a, b) {
				return _elm_lang$core$Native_Utils.eq(b, 0) ? 0 : (a / b);
			});
		var scanner = F2(
			function (_p29, yValue) {
				var _p30 = _p29;
				return yValue - A2(safeDivision, _p30._1, _p30._0);
			});
		var folder = F2(
			function (_p32, _p31) {
				var _p33 = _p32;
				var _p36 = _p33._1;
				var _p34 = _p31;
				var _p35 = _p34._0;
				var delta = _p36 - _p33._0;
				return {ctor: '_Tuple2', _0: delta + _p35, _1: ((_p35 + (delta / 2)) * _p36) + _p34._1};
			});
		var deltaFractions = F2(
			function (previous, current) {
				return _elm_lang$core$Tuple$second(
					A3(
						_elm_lang$core$List$foldl,
						folder,
						{ctor: '_Tuple2', _0: 0, _1: 0},
						A3(
							_elm_lang$core$List$map2,
							F2(
								function (v0, v1) {
									return {ctor: '_Tuple2', _0: v0, _1: v1};
								}),
							previous,
							current)));
			});
		var columns = _elm_community$list_extra$List_Extra$transpose(
			A2(
				_elm_lang$core$List$map,
				_elm_lang$core$List$map(_elm_lang$core$Tuple$second),
				series));
		var newFirst = A3(
			_elm_lang$core$List$map2,
			F2(
				function (_p37, yValue) {
					var _p38 = _p37;
					return {ctor: '_Tuple2', _0: yValue, _1: _p38._1 + yValue};
				}),
			_p28._0,
			A3(
				_elm_lang$core$List$scanl,
				scanner,
				0,
				A3(
					_elm_lang$core$List$map2,
					F2(
						function (v0, v1) {
							return {ctor: '_Tuple2', _0: v0, _1: v1};
						}),
					A2(
						_elm_lang$core$List$map,
						_elm_lang$core$List$sum,
						A2(_elm_lang$core$List$drop, 1, columns)),
					A2(_gampleman$elm_visualization$Visualization_StackOffset$pairwise, deltaFractions, columns))));
		return _gampleman$elm_visualization$Visualization_StackOffset$none(
			{ctor: '::', _0: newFirst, _1: _p28._1});
	}
};

var _gampleman$elm_visualization$Visualization_Shape$sortByInsideOut = F2(
	function (toNumber, items) {
		var folder = F2(
			function (_p1, _p0) {
				var _p2 = _p1;
				var _p9 = _p2._1;
				var _p8 = _p2._0;
				var _p3 = _p0;
				var _p7 = _p3._3;
				var _p6 = _p3._2;
				var _p5 = _p3._1;
				var _p4 = _p3._0;
				return (_elm_lang$core$Native_Utils.cmp(_p6, _p4) < 0) ? {
					ctor: '_Tuple4',
					_0: _p4,
					_1: _p5,
					_2: _p6 + _p9,
					_3: {ctor: '::', _0: _p8, _1: _p7}
				} : {
					ctor: '_Tuple4',
					_0: _p4 + _p9,
					_1: {ctor: '::', _0: _p8, _1: _p5},
					_2: _p6,
					_3: _p7
				};
			});
		var withSum = A2(
			_elm_lang$core$List$map,
			function (element) {
				return {
					ctor: '_Tuple2',
					_0: element,
					_1: toNumber(element)
				};
			},
			items);
		var _p10 = A3(
			_elm_lang$core$List$foldl,
			folder,
			{
				ctor: '_Tuple4',
				_0: 0,
				_1: {ctor: '[]'},
				_2: 0,
				_3: {ctor: '[]'}
			},
			A2(_elm_lang$core$List$sortBy, _elm_lang$core$Tuple$second, withSum));
		var bottom = _p10._1;
		var top = _p10._3;
		return A2(
			_elm_lang$core$Basics_ops['++'],
			_elm_lang$core$List$reverse(bottom),
			top);
	});
var _gampleman$elm_visualization$Visualization_Shape$stackOffsetWiggle = _gampleman$elm_visualization$Visualization_StackOffset$wiggle;
var _gampleman$elm_visualization$Visualization_Shape$stackOffsetSilhouette = _gampleman$elm_visualization$Visualization_StackOffset$silhouette;
var _gampleman$elm_visualization$Visualization_Shape$stackOffsetExpand = _gampleman$elm_visualization$Visualization_StackOffset$expand;
var _gampleman$elm_visualization$Visualization_Shape$stackOffsetDiverging = _gampleman$elm_visualization$Visualization_StackOffset$diverging;
var _gampleman$elm_visualization$Visualization_Shape$stackOffsetNone = _gampleman$elm_visualization$Visualization_StackOffset$none;
var _gampleman$elm_visualization$Visualization_Shape$calculateExtremes = function (coords) {
	var folder = F2(
		function (_p12, _p11) {
			var _p13 = _p12;
			var _p16 = _p13._1;
			var _p15 = _p13._0;
			var _p14 = _p11;
			return {
				ctor: '_Tuple2',
				_0: A2(
					_elm_lang$core$Basics$min,
					_p14._0,
					A2(_elm_lang$core$Basics$min, _p15, _p16)),
				_1: A2(
					_elm_lang$core$Basics$max,
					_p14._1,
					A2(_elm_lang$core$Basics$max, _p15, _p16))
			};
		});
	return A3(
		_elm_lang$core$List$foldl,
		F2(
			function (_p18, _p17) {
				var _p19 = _p18;
				var _p20 = _p17;
				return {
					ctor: '_Tuple2',
					_0: A2(_elm_lang$core$Basics$min, _p19._0, _p20._0),
					_1: A2(_elm_lang$core$Basics$max, _p19._1, _p20._1)
				};
			}),
		{ctor: '_Tuple2', _0: 0, _1: 0},
		A2(
			_elm_lang$core$List$map,
			A2(
				_elm_lang$core$List$foldl,
				folder,
				{ctor: '_Tuple2', _0: 0, _1: 0}),
			coords));
};
var _gampleman$elm_visualization$Visualization_Shape$stack = function (_p21) {
	var _p22 = _p21;
	var _p23 = _elm_lang$core$List$unzip(
		_p22.order(_p22.data));
	var labels = _p23._0;
	var values = _p23._1;
	var stacked = _p22.offset(
		A2(
			_elm_lang$core$List$map,
			_elm_lang$core$List$map(
				function (e) {
					return {ctor: '_Tuple2', _0: 0, _1: e};
				}),
			values));
	return {
		values: stacked,
		labels: labels,
		extent: _gampleman$elm_visualization$Visualization_Shape$calculateExtremes(stacked)
	};
};
var _gampleman$elm_visualization$Visualization_Shape$slope2 = F3(
	function (_p25, _p24, t) {
		var _p26 = _p25;
		var _p27 = _p24;
		var h = _p27._0 - _p26._0;
		return _elm_lang$core$Native_Utils.eq(h, 0) ? t : (((3 * (_p27._1 - _p26._1)) / h) - (t / 2));
	});
var _gampleman$elm_visualization$Visualization_Shape$sign = function (x) {
	return (_elm_lang$core$Native_Utils.cmp(x, 0) < 0) ? -1 : 1;
};
var _gampleman$elm_visualization$Visualization_Shape$slope3 = F3(
	function (_p30, _p29, _p28) {
		var _p31 = _p30;
		var _p32 = _p29;
		var _p35 = _p32._1;
		var _p34 = _p32._0;
		var _p33 = _p28;
		var h1 = _p33._0 - _p34;
		var h0 = _p34 - _p31._0;
		var h = _elm_lang$core$Native_Utils.eq(h1, 0) ? ((_elm_lang$core$Native_Utils.cmp(h0, 0) < 0) ? 0 : h0) : h1;
		var s0 = (_p35 - _p31._1) / h;
		var s1 = (_p33._1 - _p35) / h;
		var p = ((s0 * h1) + (s1 * h0)) / (h0 + h1);
		return (_gampleman$elm_visualization$Visualization_Shape$sign(s0) + _gampleman$elm_visualization$Visualization_Shape$sign(s1)) * A2(
			_elm_lang$core$Basics$min,
			A2(
				_elm_lang$core$Basics$min,
				_elm_lang$core$Basics$abs(s0),
				_elm_lang$core$Basics$abs(s1)),
			0.5 * _elm_lang$core$Basics$abs(p));
	});
var _gampleman$elm_visualization$Visualization_Shape$pie = F2(
	function (settings, data) {
		var unsafeGet = F2(
			function (index, array) {
				var _p36 = A2(_elm_lang$core$Array$get, index, array);
				if (_p36.ctor === 'Just') {
					return _p36._0;
				} else {
					return _elm_lang$core$Native_Utils.crashCase(
						'Visualization.Shape',
						{
							start: {line: 714, column: 13},
							end: {line: 719, column: 59}
						},
						_p36)('This should never happen');
				}
			});
		var dataArray = _elm_lang$core$Array$fromList(data);
		var sortedIndices = function (_p38) {
			return A2(
				_elm_lang$core$List$map,
				_elm_lang$core$Tuple$first,
				A2(
					_elm_lang$core$List$sortWith,
					F2(
						function (_p40, _p39) {
							var _p41 = _p40;
							var _p42 = _p39;
							return A2(settings.sortingFn, _p41._1, _p42._1);
						}),
					A2(
						_elm_lang$core$List$indexedMap,
						F2(
							function (v0, v1) {
								return {ctor: '_Tuple2', _0: v0, _1: v1};
							}),
						_p38)));
		};
		var da = A2(
			_elm_lang$core$Basics$min,
			2 * _elm_lang$core$Basics$pi,
			A2(_elm_lang$core$Basics$max, -2 * _elm_lang$core$Basics$pi, settings.endAngle - settings.startAngle));
		var p = A2(
			_elm_lang$core$Basics$min,
			_elm_lang$core$Basics$abs(da) / _elm_lang$core$Basics$toFloat(
				_elm_lang$core$List$length(data)),
			settings.padAngle);
		var pa = p * ((_elm_lang$core$Native_Utils.cmp(da, 0) < 0) ? -1 : 1);
		var summer = F2(
			function (a, b) {
				var v = settings.valueFn(a);
				return (_elm_lang$core$Native_Utils.cmp(v, 0) > 0) ? (v + b) : b;
			});
		var sum = A3(_elm_lang$core$List$foldr, summer, 0, data);
		var k = _elm_lang$core$Native_Utils.eq(sum, 0) ? 0 : ((da - (_elm_lang$core$Basics$toFloat(
			_elm_lang$core$List$length(data)) * pa)) / sum);
		var computeValue = F2(
			function (el, angle) {
				var value = settings.valueFn(el);
				return {
					innerRadius: settings.innerRadius,
					outerRadius: settings.outerRadius,
					cornerRadius: settings.cornerRadius,
					startAngle: angle,
					endAngle: (angle + ((_elm_lang$core$Native_Utils.cmp(value, 0) > 0) ? (value * k) : 0)) + pa,
					padAngle: p,
					padRadius: settings.padRadius
				};
			});
		var helper = F2(
			function (index, _p43) {
				var _p44 = _p43;
				var r = A2(
					computeValue,
					A2(unsafeGet, index, dataArray),
					_p44._0);
				return {
					ctor: '_Tuple2',
					_0: r.endAngle,
					_1: A3(_elm_lang$core$Dict$insert, index, r, _p44._1)
				};
			});
		return _elm_lang$core$Dict$values(
			_elm_lang$core$Tuple$second(
				A3(
					_elm_lang$core$List$foldl,
					helper,
					{ctor: '_Tuple2', _0: settings.startAngle, _1: _elm_lang$core$Dict$empty},
					sortedIndices(data))));
	});
var _gampleman$elm_visualization$Visualization_Shape$defaultPieConfig = {startAngle: 0, endAngle: 2 * _elm_lang$core$Basics$pi, padAngle: 0, sortingFn: _elm_lang$core$Basics$compare, valueFn: _elm_lang$core$Basics$identity, innerRadius: 0, outerRadius: 100, cornerRadius: 0, padRadius: 0};
var _gampleman$elm_visualization$Visualization_Shape$centroid = function (arcData) {
	var a = ((arcData.startAngle + arcData.endAngle) / 2) - (_elm_lang$core$Basics$pi / 2);
	var r = (arcData.innerRadius + arcData.outerRadius) / 2;
	return {
		ctor: '_Tuple2',
		_0: _elm_lang$core$Basics$cos(a) * r,
		_1: _elm_lang$core$Basics$sin(a) * r
	};
};
var _gampleman$elm_visualization$Visualization_Shape$myAsin = function (x) {
	return (_elm_lang$core$Native_Utils.cmp(x, 1) > -1) ? (_elm_lang$core$Basics$pi / 2) : ((_elm_lang$core$Native_Utils.cmp(x, -1) < 1) ? ((0 - _elm_lang$core$Basics$pi) / 2) : _elm_lang$core$Basics$asin(x));
};
var _gampleman$elm_visualization$Visualization_Shape$cornerTangents = F7(
	function (x0, y0, x1, y1, r1, rc, cw) {
		var r = r1 - rc;
		var y01 = y0 - y1;
		var x01 = x0 - x1;
		var lo = (cw ? rc : (0 - rc)) / _elm_lang$core$Basics$sqrt(
			Math.pow(x01, 2) + Math.pow(y01, 2));
		var ox = lo * y01;
		var x11 = x0 + ox;
		var x10 = x1 + ox;
		var x00 = (x11 + x10) / 2;
		var dx = x10 - x11;
		var oy = (0 - lo) * x01;
		var y11 = y0 + oy;
		var y10 = y1 + oy;
		var y00 = (y11 + y10) / 2;
		var dy = y10 - y11;
		var d2 = Math.pow(dx, 2) + Math.pow(dy, 2);
		var dd = (x11 * y10) - (x10 * y11);
		var d = ((_elm_lang$core$Native_Utils.cmp(dy, 0) < 0) ? -1 : 1) * _elm_lang$core$Basics$sqrt(
			A2(
				_elm_lang$core$Basics$max,
				0,
				(Math.pow(r, 2) * d2) - Math.pow(dd, 2)));
		var cx0 = ((dd * dy) - (dx * d)) / d2;
		var dx0 = cx0 - x00;
		var cy0 = (((0 - dd) * dx) - (dy * d)) / d2;
		var dy0 = cy0 - y00;
		var cx1 = ((dd * dy) + (dx * d)) / d2;
		var dx1 = cx1 - x00;
		var cy1 = (((0 - dd) * dx) + (dy * d)) / d2;
		var dy1 = cy1 - y00;
		var _p45 = (_elm_lang$core$Native_Utils.cmp(
			Math.pow(dx0, 2) + Math.pow(dy0, 2),
			Math.pow(dx1, 2) + Math.pow(dy1, 2)) > 0) ? {ctor: '_Tuple2', _0: cx1, _1: cy1} : {ctor: '_Tuple2', _0: cx0, _1: cy0};
		var fcx = _p45._0;
		var fxy = _p45._1;
		return {cx: fcx, cy: fxy, x01: 0 - ox, y01: 0 - oy, x11: fcx * ((r1 / r) - 1), y11: fxy * ((r1 / r) - 1)};
	});
var _gampleman$elm_visualization$Visualization_Shape$intersect = F8(
	function (x0, y0, x1, y1, x2, y2, x3, y3) {
		var y32 = y3 - y2;
		var x32 = x3 - x2;
		var y10 = y1 - y0;
		var x10 = x1 - x0;
		var t = ((x32 * (y0 - y2)) - (y32 * (x0 - x2))) / ((y32 * x10) - (x32 * y10));
		return {ctor: '_Tuple2', _0: x0 + (t * x10), _1: y0 + (t * y10)};
	});
var _gampleman$elm_visualization$Visualization_Shape$epsilon = 1.0e-12;
var _gampleman$elm_visualization$Visualization_Shape$arc = function (arcData) {
	var a1 = arcData.endAngle - (_elm_lang$core$Basics$pi / 2);
	var a0 = arcData.startAngle - (_elm_lang$core$Basics$pi / 2);
	var da = _elm_lang$core$Basics$abs(a1 - a0);
	var cw = _elm_lang$core$Native_Utils.cmp(a1, a0) > 0;
	var _p46 = (_elm_lang$core$Native_Utils.cmp(arcData.innerRadius, arcData.outerRadius) > 0) ? {ctor: '_Tuple2', _0: arcData.outerRadius, _1: arcData.innerRadius} : {ctor: '_Tuple2', _0: arcData.innerRadius, _1: arcData.outerRadius};
	var r0 = _p46._0;
	var r1 = _p46._1;
	var path = function () {
		if (_elm_lang$core$Native_Utils.cmp(r1, _gampleman$elm_visualization$Visualization_Shape$epsilon) < 1) {
			return A3(_gampleman$elm_visualization$Visualization_Path$moveTo, 0, 0, _gampleman$elm_visualization$Visualization_Path$begin);
		} else {
			if (_elm_lang$core$Native_Utils.cmp(da, (2 * _elm_lang$core$Basics$pi) - _gampleman$elm_visualization$Visualization_Shape$epsilon) > 0) {
				var p = A7(
					_gampleman$elm_visualization$Visualization_Path$arc,
					0,
					0,
					r1,
					a0,
					a1,
					!cw,
					A3(
						_gampleman$elm_visualization$Visualization_Path$moveTo,
						r1 * _elm_lang$core$Basics$cos(a0),
						r1 * _elm_lang$core$Basics$sin(a0),
						_gampleman$elm_visualization$Visualization_Path$begin));
				return (_elm_lang$core$Native_Utils.cmp(r0, _gampleman$elm_visualization$Visualization_Shape$epsilon) > 0) ? A7(
					_gampleman$elm_visualization$Visualization_Path$arc,
					0,
					0,
					r0,
					a1,
					a0,
					cw,
					A3(
						_gampleman$elm_visualization$Visualization_Path$moveTo,
						r0 * _elm_lang$core$Basics$cos(a1),
						r0 * _elm_lang$core$Basics$sin(a1),
						p)) : p;
			} else {
				var rc = A2(
					_elm_lang$core$Basics$min,
					_elm_lang$core$Basics$abs(r1 - r0) / 2,
					arcData.cornerRadius);
				var ap = arcData.padAngle / 2;
				var rp = (_elm_lang$core$Native_Utils.cmp(ap, _gampleman$elm_visualization$Visualization_Shape$epsilon) > 0) ? ((_elm_lang$core$Native_Utils.cmp(arcData.padRadius, 0) > 0) ? arcData.padRadius : _elm_lang$core$Basics$sqrt(
					Math.pow(r0, 2) + Math.pow(r1, 2))) : 0;
				var p0 = _gampleman$elm_visualization$Visualization_Shape$myAsin(
					(rp / r0) * _elm_lang$core$Basics$sin(ap));
				var _p47 = (_elm_lang$core$Native_Utils.cmp(rp, _gampleman$elm_visualization$Visualization_Shape$epsilon) > 0) ? ((_elm_lang$core$Native_Utils.cmp(da - (p0 * 2), _gampleman$elm_visualization$Visualization_Shape$epsilon) > 0) ? (cw ? {ctor: '_Tuple3', _0: a0 + p0, _1: a1 - p0, _2: da - (p0 * 2)} : {ctor: '_Tuple3', _0: a0 - p0, _1: a1 + p0, _2: da - (p0 * 2)}) : {ctor: '_Tuple3', _0: (a0 + a1) / 2, _1: (a0 + a1) / 2, _2: 0}) : {ctor: '_Tuple3', _0: a0, _1: a1, _2: da};
				var a00 = _p47._0;
				var a10 = _p47._1;
				var da0 = _p47._2;
				var x10 = r0 * _elm_lang$core$Basics$cos(a10);
				var y10 = r0 * _elm_lang$core$Basics$sin(a10);
				var x00 = r0 * _elm_lang$core$Basics$cos(a00);
				var y00 = r0 * _elm_lang$core$Basics$sin(a00);
				var p1 = _gampleman$elm_visualization$Visualization_Shape$myAsin(
					(rp / r1) * _elm_lang$core$Basics$sin(ap));
				var _p48 = (_elm_lang$core$Native_Utils.cmp(rp, _gampleman$elm_visualization$Visualization_Shape$epsilon) > 0) ? ((_elm_lang$core$Native_Utils.cmp(da - (p1 * 2), _gampleman$elm_visualization$Visualization_Shape$epsilon) > 0) ? (cw ? {ctor: '_Tuple3', _0: a0 + p1, _1: a1 - p1, _2: da - (p1 * 2)} : {ctor: '_Tuple3', _0: a0 - p1, _1: a1 + p1, _2: da - (p1 * 2)}) : {ctor: '_Tuple3', _0: (a0 + a1) / 2, _1: (a0 + a1) / 2, _2: 0}) : {ctor: '_Tuple3', _0: a0, _1: a1, _2: da};
				var a01 = _p48._0;
				var a11 = _p48._1;
				var da1 = _p48._2;
				var x01 = r1 * _elm_lang$core$Basics$cos(a01);
				var y01 = r1 * _elm_lang$core$Basics$sin(a01);
				var x11 = r1 * _elm_lang$core$Basics$cos(a11);
				var y11 = r1 * _elm_lang$core$Basics$sin(a11);
				var _p49 = (_elm_lang$core$Native_Utils.cmp(da0, _gampleman$elm_visualization$Visualization_Shape$epsilon) > 0) ? A8(_gampleman$elm_visualization$Visualization_Shape$intersect, x01, y01, x00, y00, x11, y11, x10, y10) : {ctor: '_Tuple2', _0: x10, _1: y10};
				var ocx = _p49._0;
				var ocy = _p49._1;
				var lc = _elm_lang$core$Basics$sqrt(
					Math.pow(ocx, 2) + Math.pow(ocy, 2));
				var _p50 = {ctor: '_Tuple4', _0: x01 - ocx, _1: y01 - ocy, _2: x11 - ocx, _3: y11 - ocy};
				var ax = _p50._0;
				var ay = _p50._1;
				var bx = _p50._2;
				var by = _p50._3;
				var kc = 1 / _elm_lang$core$Basics$sin(
					_elm_lang$core$Basics$acos(
						((ax * bx) + (ay * by)) / (_elm_lang$core$Basics$sqrt(
							Math.pow(ax, 2) + Math.pow(ay, 2)) * _elm_lang$core$Basics$sqrt(
							Math.pow(bx, 2) + Math.pow(by, 2)))) / 2);
				var _p51 = ((_elm_lang$core$Native_Utils.cmp(rc, _gampleman$elm_visualization$Visualization_Shape$epsilon) > 0) && (_elm_lang$core$Native_Utils.cmp(da, _elm_lang$core$Basics$pi) < 0)) ? {
					ctor: '_Tuple2',
					_0: A2(_elm_lang$core$Basics$min, rc, (r0 - lc) / (kc - 1)),
					_1: A2(_elm_lang$core$Basics$min, rc, (r1 - lc) / (kc + 1))
				} : {ctor: '_Tuple2', _0: rc, _1: rc};
				var rc0 = _p51._0;
				var rc1 = _p51._1;
				var outerRing = function () {
					if (_elm_lang$core$Native_Utils.cmp(da1, _gampleman$elm_visualization$Visualization_Shape$epsilon) < 1) {
						return A3(_gampleman$elm_visualization$Visualization_Path$moveTo, x01, y01, _gampleman$elm_visualization$Visualization_Path$begin);
					} else {
						if (_elm_lang$core$Native_Utils.cmp(rc1, _gampleman$elm_visualization$Visualization_Shape$epsilon) > 0) {
							var t1 = A7(_gampleman$elm_visualization$Visualization_Shape$cornerTangents, x11, y11, x10, y10, r1, rc1, cw);
							var t0 = A7(_gampleman$elm_visualization$Visualization_Shape$cornerTangents, x00, y00, x01, y01, r1, rc1, cw);
							var p = A3(_gampleman$elm_visualization$Visualization_Path$moveTo, t0.cx + t0.x01, t0.cy + t0.y01, _gampleman$elm_visualization$Visualization_Path$begin);
							return (_elm_lang$core$Native_Utils.cmp(rc1, rc) < 0) ? A7(
								_gampleman$elm_visualization$Visualization_Path$arc,
								t0.cx,
								t0.cy,
								rc1,
								A2(_elm_lang$core$Basics$atan2, t0.y01, t0.x01),
								A2(_elm_lang$core$Basics$atan2, t1.y01, t1.x01),
								!cw,
								p) : A7(
								_gampleman$elm_visualization$Visualization_Path$arc,
								t1.cx,
								t1.cy,
								rc1,
								A2(_elm_lang$core$Basics$atan2, t1.y11, t1.x11),
								A2(_elm_lang$core$Basics$atan2, t1.y01, t1.x01),
								!cw,
								A7(
									_gampleman$elm_visualization$Visualization_Path$arc,
									0,
									0,
									r1,
									A2(_elm_lang$core$Basics$atan2, t0.cy + t0.y11, t0.cx + t0.x11),
									A2(_elm_lang$core$Basics$atan2, t1.cy + t1.y11, t1.cx + t1.x11),
									!cw,
									A7(
										_gampleman$elm_visualization$Visualization_Path$arc,
										t0.cx,
										t0.cy,
										rc1,
										A2(_elm_lang$core$Basics$atan2, t0.y01, t0.x01),
										A2(_elm_lang$core$Basics$atan2, t0.y11, t0.x11),
										!cw,
										p)));
						} else {
							return A7(
								_gampleman$elm_visualization$Visualization_Path$arc,
								0,
								0,
								r1,
								a01,
								a11,
								!cw,
								A3(_gampleman$elm_visualization$Visualization_Path$moveTo, x01, y01, _gampleman$elm_visualization$Visualization_Path$begin));
						}
					}
				}();
				if ((_elm_lang$core$Native_Utils.cmp(r0, _gampleman$elm_visualization$Visualization_Shape$epsilon) < 1) || (_elm_lang$core$Native_Utils.cmp(da0, _gampleman$elm_visualization$Visualization_Shape$epsilon) < 1)) {
					return A3(_gampleman$elm_visualization$Visualization_Path$lineTo, x10, y10, outerRing);
				} else {
					if (_elm_lang$core$Native_Utils.cmp(rc0, _gampleman$elm_visualization$Visualization_Shape$epsilon) > 0) {
						var t1 = A7(_gampleman$elm_visualization$Visualization_Shape$cornerTangents, x01, y01, x00, y00, r0, 0 - rc0, cw);
						var t0 = A7(_gampleman$elm_visualization$Visualization_Shape$cornerTangents, x10, y10, x11, y11, r0, 0 - rc0, cw);
						var p = A3(_gampleman$elm_visualization$Visualization_Path$lineTo, t0.cx + t0.x01, t0.cy + t0.y01, outerRing);
						return (_elm_lang$core$Native_Utils.cmp(rc0, rc) < 0) ? A7(
							_gampleman$elm_visualization$Visualization_Path$arc,
							t0.cx,
							t0.cy,
							rc0,
							A2(_elm_lang$core$Basics$atan2, t0.y01, t0.x01),
							A2(_elm_lang$core$Basics$atan2, t1.y01, t1.x01),
							!cw,
							p) : A7(
							_gampleman$elm_visualization$Visualization_Path$arc,
							t1.cx,
							t1.cy,
							rc0,
							A2(_elm_lang$core$Basics$atan2, t1.y11, t1.x11),
							A2(_elm_lang$core$Basics$atan2, t1.y01, t1.x01),
							!cw,
							A7(
								_gampleman$elm_visualization$Visualization_Path$arc,
								0,
								0,
								r0,
								A2(_elm_lang$core$Basics$atan2, t0.cy + t0.y11, t0.cx + t0.x11),
								A2(_elm_lang$core$Basics$atan2, t1.cy + t1.y11, t1.cx + t1.x11),
								cw,
								A7(
									_gampleman$elm_visualization$Visualization_Path$arc,
									t0.cx,
									t0.cy,
									rc0,
									A2(_elm_lang$core$Basics$atan2, t0.y01, t0.x01),
									A2(_elm_lang$core$Basics$atan2, t0.y11, t0.x11),
									!cw,
									p)));
					} else {
						return A7(_gampleman$elm_visualization$Visualization_Path$arc, 0, 0, r0, a10, a00, cw, outerRing);
					}
				}
			}
		}
	}();
	return _gampleman$elm_visualization$Visualization_Path$toAttrString(
		_gampleman$elm_visualization$Visualization_Path$close(path));
};
var _gampleman$elm_visualization$Visualization_Shape$Arc = F7(
	function (a, b, c, d, e, f, g) {
		return {innerRadius: a, outerRadius: b, cornerRadius: c, startAngle: d, endAngle: e, padAngle: f, padRadius: g};
	});
var _gampleman$elm_visualization$Visualization_Shape$PieConfig = F9(
	function (a, b, c, d, e, f, g, h, i) {
		return {startAngle: a, endAngle: b, padAngle: c, sortingFn: d, valueFn: e, innerRadius: f, outerRadius: g, cornerRadius: h, padRadius: i};
	});
var _gampleman$elm_visualization$Visualization_Shape$StackConfig = F3(
	function (a, b, c) {
		return {data: a, offset: b, order: c};
	});
var _gampleman$elm_visualization$Visualization_Shape$StackResult = F3(
	function (a, b, c) {
		return {values: a, labels: b, extent: c};
	});
var _gampleman$elm_visualization$Visualization_Shape$Area = function (a) {
	return {ctor: 'Area', _0: a};
};
var _gampleman$elm_visualization$Visualization_Shape$area = F2(
	function (curve, data) {
		var makeCurves = F2(
			function (datum, _p52) {
				var _p53 = _p52;
				var _p54 = {ctor: '_Tuple3', _0: _p53._0, _1: datum, _2: _p53._1};
				if (_p54._1.ctor === 'Nothing') {
					return {ctor: '_Tuple2', _0: _elm_lang$core$Maybe$Nothing, _1: _p54._2};
				} else {
					if (_p54._0.ctor === 'Nothing') {
						var _p55 = _p54._1._0;
						return {
							ctor: '_Tuple2',
							_0: _elm_lang$core$Maybe$Just(_p55),
							_1: {
								ctor: '::',
								_0: _gampleman$elm_visualization$Visualization_Shape$Area(
									{
										ctor: '::',
										_0: _p55,
										_1: {ctor: '[]'}
									}),
								_1: _p54._2
							}
						};
					} else {
						if ((_p54._2.ctor === '::') && (_p54._2._0.ctor === 'Area')) {
							var _p56 = _p54._1._0;
							return {
								ctor: '_Tuple2',
								_0: _elm_lang$core$Maybe$Just(_p56),
								_1: {
									ctor: '::',
									_0: _gampleman$elm_visualization$Visualization_Shape$Area(
										{ctor: '::', _0: _p56, _1: _p54._2._0._0}),
									_1: _p54._2._1
								}
							};
						} else {
							var _p57 = _p54._1._0;
							return {
								ctor: '_Tuple2',
								_0: _elm_lang$core$Maybe$Just(_p57),
								_1: {
									ctor: '::',
									_0: _gampleman$elm_visualization$Visualization_Shape$Area(
										{
											ctor: '::',
											_0: _p57,
											_1: {ctor: '[]'}
										}),
									_1: _p54._2
								}
							};
						}
					}
				}
			});
		return _gampleman$elm_visualization$Visualization_Path$toAttrString(
			A2(
				_elm_lang$core$List$concatMap,
				curve,
				_elm_lang$core$Tuple$second(
					A3(
						_elm_lang$core$List$foldr,
						makeCurves,
						{
							ctor: '_Tuple2',
							_0: _elm_lang$core$Maybe$Nothing,
							_1: {ctor: '[]'}
						},
						data))));
	});
var _gampleman$elm_visualization$Visualization_Shape$Line = function (a) {
	return {ctor: 'Line', _0: a};
};
var _gampleman$elm_visualization$Visualization_Shape$applyRecursivelyForArea = F2(
	function (fn, points) {
		var points1 = _elm_lang$core$List$reverse(
			A2(_elm_lang$core$List$map, _elm_lang$core$Tuple$second, points));
		var points0 = A2(_elm_lang$core$List$map, _elm_lang$core$Tuple$first, points);
		var _p58 = {
			ctor: '_Tuple2',
			_0: fn(
				_gampleman$elm_visualization$Visualization_Shape$Line(points1)),
			_1: points1
		};
		if ((((_p58.ctor === '_Tuple2') && (_p58._0.ctor === '::')) && (_p58._1.ctor === '::')) && (_p58._1._0.ctor === '_Tuple2')) {
			return A2(
				_elm_lang$core$Basics_ops['++'],
				A3(
					_gampleman$elm_visualization$Visualization_Path$lineTo,
					_p58._1._0._0,
					_p58._1._0._1,
					fn(
						_gampleman$elm_visualization$Visualization_Shape$Line(points0))),
				_gampleman$elm_visualization$Visualization_Path$close(_p58._0._1));
		} else {
			return {ctor: '[]'};
		}
	});
var _gampleman$elm_visualization$Visualization_Shape$linearCurve = function (part) {
	var _p59 = part;
	if (_p59.ctor === 'Line') {
		if (_p59._0.ctor === '[]') {
			return {ctor: '[]'};
		} else {
			return {
				ctor: '::',
				_0: _gampleman$elm_visualization$Visualization_Path$Move(_p59._0._0),
				_1: A2(_elm_lang$core$List$map, _gampleman$elm_visualization$Visualization_Path$Line, _p59._0._1)
			};
		}
	} else {
		return A2(_gampleman$elm_visualization$Visualization_Shape$applyRecursivelyForArea, _gampleman$elm_visualization$Visualization_Shape$linearCurve, _p59._0);
	}
};
var _gampleman$elm_visualization$Visualization_Shape$monotoneInXCurve = function (part) {
	var point = F5(
		function (_p61, _p60, t0, t1, path) {
			var _p62 = _p61;
			var _p66 = _p62._0;
			var _p63 = _p60;
			var _p65 = _p63._1;
			var _p64 = _p63._0;
			var dx = (_p64 - _p66) / 3;
			return A7(_gampleman$elm_visualization$Visualization_Path$bezierCurveTo, _p66 + dx, _p62._1 + (dx * t0), _p64 - dx, _p65 - (dx * t1), _p64, _p65, path);
		});
	var finalize = function (_p67) {
		var _p68 = _p67;
		var _p75 = _p68._1._1;
		var _p74 = _p68._0._1;
		var _p73 = _p68._1._0;
		var _p72 = _p68._0._0;
		var _p71 = _p68._3;
		var _p69 = _p68._2;
		if (_p69.ctor === 'Nothing') {
			return A3(_gampleman$elm_visualization$Visualization_Path$lineTo, _p73, _p75, _p71);
		} else {
			var _p70 = _p69._0;
			return A5(
				point,
				{ctor: '_Tuple2', _0: _p72, _1: _p74},
				{ctor: '_Tuple2', _0: _p73, _1: _p75},
				_p70,
				A3(
					_gampleman$elm_visualization$Visualization_Shape$slope2,
					{ctor: '_Tuple2', _0: _p72, _1: _p74},
					{ctor: '_Tuple2', _0: _p73, _1: _p75},
					_p70),
				_p71);
		}
	};
	var helper = F2(
		function (_p77, _p76) {
			var _p78 = _p77;
			var _p86 = _p78._1;
			var _p85 = _p78._0;
			var _p79 = _p76;
			var _p84 = _p79._1._1;
			var _p83 = _p79._0._1;
			var _p82 = _p79._1._0;
			var _p81 = _p79._0._0;
			var t1 = A3(
				_gampleman$elm_visualization$Visualization_Shape$slope3,
				{ctor: '_Tuple2', _0: _p81, _1: _p83},
				{ctor: '_Tuple2', _0: _p82, _1: _p84},
				{ctor: '_Tuple2', _0: _p85, _1: _p86});
			var t0 = function () {
				var _p80 = _p79._2;
				if (_p80.ctor === 'Nothing') {
					return A3(
						_gampleman$elm_visualization$Visualization_Shape$slope2,
						{ctor: '_Tuple2', _0: _p81, _1: _p83},
						{ctor: '_Tuple2', _0: _p82, _1: _p84},
						t1);
				} else {
					return _p80._0;
				}
			}();
			return {
				ctor: '_Tuple4',
				_0: {ctor: '_Tuple2', _0: _p82, _1: _p84},
				_1: {ctor: '_Tuple2', _0: _p85, _1: _p86},
				_2: _elm_lang$core$Maybe$Just(t1),
				_3: A5(
					point,
					{ctor: '_Tuple2', _0: _p81, _1: _p83},
					{ctor: '_Tuple2', _0: _p82, _1: _p84},
					t0,
					t1,
					_p79._3)
			};
		});
	var _p87 = part;
	if (_p87.ctor === 'Line') {
		if (_p87._0.ctor === '[]') {
			return {ctor: '[]'};
		} else {
			if (_p87._0._1.ctor === '[]') {
				return {ctor: '[]'};
			} else {
				var _p88 = _p87._0._0;
				return finalize(
					A3(
						_elm_lang$core$List$foldl,
						helper,
						{
							ctor: '_Tuple4',
							_0: _p88,
							_1: _p87._0._1._0,
							_2: _elm_lang$core$Maybe$Nothing,
							_3: {
								ctor: '::',
								_0: _gampleman$elm_visualization$Visualization_Path$Move(_p88),
								_1: {ctor: '[]'}
							}
						},
						_p87._0._1._1));
			}
		}
	} else {
		return A2(_gampleman$elm_visualization$Visualization_Shape$applyRecursivelyForArea, _gampleman$elm_visualization$Visualization_Shape$monotoneInXCurve, _p87._0);
	}
};
var _gampleman$elm_visualization$Visualization_Shape$line = F2(
	function (curve, data) {
		var makeCurves = F2(
			function (datum, _p89) {
				var _p90 = _p89;
				var _p91 = {ctor: '_Tuple3', _0: _p90._0, _1: datum, _2: _p90._1};
				if (_p91._1.ctor === 'Nothing') {
					return {ctor: '_Tuple2', _0: _elm_lang$core$Maybe$Nothing, _1: _p91._2};
				} else {
					if (_p91._0.ctor === 'Nothing') {
						var _p92 = _p91._1._0;
						return {
							ctor: '_Tuple2',
							_0: _elm_lang$core$Maybe$Just(_p92),
							_1: {
								ctor: '::',
								_0: _gampleman$elm_visualization$Visualization_Shape$Line(
									{
										ctor: '::',
										_0: _p92,
										_1: {ctor: '[]'}
									}),
								_1: _p91._2
							}
						};
					} else {
						if ((_p91._2.ctor === '::') && (_p91._2._0.ctor === 'Line')) {
							var _p93 = _p91._1._0;
							return {
								ctor: '_Tuple2',
								_0: _elm_lang$core$Maybe$Just(_p93),
								_1: {
									ctor: '::',
									_0: _gampleman$elm_visualization$Visualization_Shape$Line(
										{ctor: '::', _0: _p93, _1: _p91._2._0._0}),
									_1: _p91._2._1
								}
							};
						} else {
							var _p94 = _p91._1._0;
							return {
								ctor: '_Tuple2',
								_0: _elm_lang$core$Maybe$Just(_p94),
								_1: {
									ctor: '::',
									_0: _gampleman$elm_visualization$Visualization_Shape$Line(
										{
											ctor: '::',
											_0: _p94,
											_1: {ctor: '[]'}
										}),
									_1: _p91._2
								}
							};
						}
					}
				}
			});
		return _gampleman$elm_visualization$Visualization_Path$toAttrString(
			A2(
				_elm_lang$core$List$concatMap,
				curve,
				_elm_lang$core$Tuple$second(
					A3(
						_elm_lang$core$List$foldr,
						makeCurves,
						{
							ctor: '_Tuple2',
							_0: _elm_lang$core$Maybe$Nothing,
							_1: {ctor: '[]'}
						},
						data))));
	});

var _jamesmacaulay$elm_graphql$GraphQL_Response$RequestError = F2(
	function (a, b) {
		return {message: a, locations: b};
	});
var _jamesmacaulay$elm_graphql$GraphQL_Response$DocumentLocation = F2(
	function (a, b) {
		return {line: a, column: b};
	});
var _jamesmacaulay$elm_graphql$GraphQL_Response$documentLocationDecoder = A3(
	_elm_lang$core$Json_Decode$map2,
	_jamesmacaulay$elm_graphql$GraphQL_Response$DocumentLocation,
	A2(_elm_lang$core$Json_Decode$field, 'line', _elm_lang$core$Json_Decode$int),
	A2(_elm_lang$core$Json_Decode$field, 'column', _elm_lang$core$Json_Decode$int));
var _jamesmacaulay$elm_graphql$GraphQL_Response$errorsDecoder = _elm_lang$core$Json_Decode$list(
	A3(
		_elm_lang$core$Json_Decode$map2,
		_jamesmacaulay$elm_graphql$GraphQL_Response$RequestError,
		A2(_elm_lang$core$Json_Decode$field, 'message', _elm_lang$core$Json_Decode$string),
		_elm_lang$core$Json_Decode$oneOf(
			{
				ctor: '::',
				_0: A2(
					_elm_lang$core$Json_Decode$field,
					'locations',
					_elm_lang$core$Json_Decode$list(_jamesmacaulay$elm_graphql$GraphQL_Response$documentLocationDecoder)),
				_1: {
					ctor: '::',
					_0: _elm_lang$core$Json_Decode$succeed(
						{ctor: '[]'}),
					_1: {ctor: '[]'}
				}
			})));

var _jamesmacaulay$elm_graphql$GraphQL_Client_Http_Util$errorsResponseDecoder = A2(_elm_lang$core$Json_Decode$field, 'errors', _jamesmacaulay$elm_graphql$GraphQL_Response$errorsDecoder);
var _jamesmacaulay$elm_graphql$GraphQL_Client_Http_Util$convertHttpError = F3(
	function (wrapHttpError, wrapGraphQLError, httpError) {
		var handleErrorWithResponseBody = function (responseBody) {
			return A2(
				_elm_lang$core$Result$withDefault,
				wrapHttpError(httpError),
				A2(
					_elm_lang$core$Result$map,
					wrapGraphQLError,
					A2(_elm_lang$core$Json_Decode$decodeString, _jamesmacaulay$elm_graphql$GraphQL_Client_Http_Util$errorsResponseDecoder, responseBody)));
		};
		var _p0 = httpError;
		switch (_p0.ctor) {
			case 'BadStatus':
				return handleErrorWithResponseBody(_p0._0.body);
			case 'BadPayload':
				return handleErrorWithResponseBody(_p0._1.body);
			default:
				return wrapHttpError(httpError);
		}
	});
var _jamesmacaulay$elm_graphql$GraphQL_Client_Http_Util$defaultExpect = function (_p1) {
	return _elm_lang$http$Http$expectJson(
		A2(_elm_lang$core$Json_Decode$field, 'data', _p1));
};
var _jamesmacaulay$elm_graphql$GraphQL_Client_Http_Util$defaultRequestOptions = function (url) {
	return {
		method: 'POST',
		headers: {ctor: '[]'},
		url: url,
		timeout: _elm_lang$core$Maybe$Nothing,
		withCredentials: false
	};
};
var _jamesmacaulay$elm_graphql$GraphQL_Client_Http_Util$parameterizedUrl = F3(
	function (url, documentString, variableValues) {
		var variablesParam = A2(
			_elm_lang$core$Maybe$withDefault,
			'',
			A2(
				_elm_lang$core$Maybe$map,
				function (obj) {
					return A2(
						_elm_lang$core$Basics_ops['++'],
						'&variables=',
						_elm_lang$http$Http$encodeUri(
							A2(_elm_lang$core$Json_Encode$encode, 0, obj)));
				},
				variableValues));
		var firstParamPrefix = A2(_elm_lang$core$String$contains, '?', url) ? '&' : '?';
		var queryParam = A2(
			_elm_lang$core$Basics_ops['++'],
			firstParamPrefix,
			A2(
				_elm_lang$core$Basics_ops['++'],
				'query=',
				_elm_lang$http$Http$encodeUri(documentString)));
		return A2(
			_elm_lang$core$Basics_ops['++'],
			url,
			A2(_elm_lang$core$Basics_ops['++'], queryParam, variablesParam));
	});
var _jamesmacaulay$elm_graphql$GraphQL_Client_Http_Util$postBodyJson = F2(
	function (documentString, variableValues) {
		var extraParams = A2(
			_elm_lang$core$Maybe$withDefault,
			{ctor: '[]'},
			A2(
				_elm_lang$core$Maybe$map,
				function (obj) {
					return {
						ctor: '::',
						_0: {ctor: '_Tuple2', _0: 'variables', _1: obj},
						_1: {ctor: '[]'}
					};
				},
				variableValues));
		var documentValue = _elm_lang$core$Json_Encode$string(documentString);
		return _elm_lang$core$Json_Encode$object(
			A2(
				_elm_lang$core$Basics_ops['++'],
				{
					ctor: '::',
					_0: {ctor: '_Tuple2', _0: 'query', _1: documentValue},
					_1: {ctor: '[]'}
				},
				extraParams));
	});
var _jamesmacaulay$elm_graphql$GraphQL_Client_Http_Util$postBody = F2(
	function (documentString, variableValues) {
		return _elm_lang$http$Http$jsonBody(
			A2(_jamesmacaulay$elm_graphql$GraphQL_Client_Http_Util$postBodyJson, documentString, variableValues));
	});
var _jamesmacaulay$elm_graphql$GraphQL_Client_Http_Util$requestConfig = F4(
	function (requestOptions, documentString, expect, variableValues) {
		var _p2 = _elm_lang$core$Native_Utils.eq(requestOptions.method, 'GET') ? {
			ctor: '_Tuple2',
			_0: A3(_jamesmacaulay$elm_graphql$GraphQL_Client_Http_Util$parameterizedUrl, requestOptions.url, documentString, variableValues),
			_1: _elm_lang$http$Http$emptyBody
		} : {
			ctor: '_Tuple2',
			_0: requestOptions.url,
			_1: A2(_jamesmacaulay$elm_graphql$GraphQL_Client_Http_Util$postBody, documentString, variableValues)
		};
		var url = _p2._0;
		var body = _p2._1;
		return {method: requestOptions.method, headers: requestOptions.headers, url: url, body: body, expect: expect, timeout: requestOptions.timeout, withCredentials: requestOptions.withCredentials};
	});
var _jamesmacaulay$elm_graphql$GraphQL_Client_Http_Util$RequestOptions = F5(
	function (a, b, c, d, e) {
		return {method: a, headers: b, url: c, timeout: d, withCredentials: e};
	});
var _jamesmacaulay$elm_graphql$GraphQL_Client_Http_Util$RequestError = F2(
	function (a, b) {
		return {message: a, locations: b};
	});
var _jamesmacaulay$elm_graphql$GraphQL_Client_Http_Util$DocumentLocation = F2(
	function (a, b) {
		return {line: a, column: b};
	});
var _jamesmacaulay$elm_graphql$GraphQL_Client_Http_Util$RequestConfig = F7(
	function (a, b, c, d, e, f, g) {
		return {method: a, headers: b, url: c, body: d, expect: e, timeout: f, withCredentials: g};
	});
var _jamesmacaulay$elm_graphql$GraphQL_Client_Http_Util$GraphQLError = function (a) {
	return {ctor: 'GraphQLError', _0: a};
};
var _jamesmacaulay$elm_graphql$GraphQL_Client_Http_Util$HttpError = function (a) {
	return {ctor: 'HttpError', _0: a};
};

var _jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST$OperationDefinitionInfo = F5(
	function (a, b, c, d, e) {
		return {operationType: a, name: b, variableDefinitions: c, directives: d, selectionSet: e};
	});
var _jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST$FieldInfo = F5(
	function (a, b, c, d, e) {
		return {alias: a, name: b, $arguments: c, directives: d, selectionSet: e};
	});
var _jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST$FragmentSpreadInfo = F2(
	function (a, b) {
		return {name: a, directives: b};
	});
var _jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST$InlineFragmentInfo = F3(
	function (a, b, c) {
		return {typeCondition: a, directives: b, selectionSet: c};
	});
var _jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST$FragmentDefinitionInfo = F4(
	function (a, b, c, d) {
		return {name: a, typeCondition: b, directives: c, selectionSet: d};
	});
var _jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST$VariableDefinitionInfo = F3(
	function (a, b, c) {
		return {name: a, variableType: b, defaultValue: c};
	});
var _jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST$DirectiveInfo = F2(
	function (a, b) {
		return {name: a, $arguments: b};
	});
var _jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST$Document = function (a) {
	return {ctor: 'Document', _0: a};
};
var _jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST$FragmentDefinition = function (a) {
	return {ctor: 'FragmentDefinition', _0: a};
};
var _jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST$QueryShorthand = function (a) {
	return {ctor: 'QueryShorthand', _0: a};
};
var _jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST$OperationDefinition = function (a) {
	return {ctor: 'OperationDefinition', _0: a};
};
var _jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST$Mutation = {ctor: 'Mutation'};
var _jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST$Query = {ctor: 'Query'};
var _jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST$SelectionSet = function (a) {
	return {ctor: 'SelectionSet', _0: a};
};
var _jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST$InlineFragment = function (a) {
	return {ctor: 'InlineFragment', _0: a};
};
var _jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST$FragmentSpread = function (a) {
	return {ctor: 'FragmentSpread', _0: a};
};
var _jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST$Field = function (a) {
	return {ctor: 'Field', _0: a};
};
var _jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST$TypeCondition = function (a) {
	return {ctor: 'TypeCondition', _0: a};
};
var _jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST$ObjectValue = function (a) {
	return {ctor: 'ObjectValue', _0: a};
};
var _jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST$ListValue = function (a) {
	return {ctor: 'ListValue', _0: a};
};
var _jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST$EnumValue = function (a) {
	return {ctor: 'EnumValue', _0: a};
};
var _jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST$NullValue = {ctor: 'NullValue'};
var _jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST$BooleanValue = function (a) {
	return {ctor: 'BooleanValue', _0: a};
};
var _jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST$StringValue = function (a) {
	return {ctor: 'StringValue', _0: a};
};
var _jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST$FloatValue = function (a) {
	return {ctor: 'FloatValue', _0: a};
};
var _jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST$IntValue = function (a) {
	return {ctor: 'IntValue', _0: a};
};
var _jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST$VariableValue = F2(
	function (a, b) {
		return {ctor: 'VariableValue', _0: a, _1: b};
	});
var _jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST$VariableDefinition = function (a) {
	return {ctor: 'VariableDefinition', _0: a};
};
var _jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST$TypeRef = F2(
	function (a, b) {
		return {ctor: 'TypeRef', _0: a, _1: b};
	});
var _jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST$NonNull = {ctor: 'NonNull'};
var _jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST$Nullable = {ctor: 'Nullable'};
var _jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST$ListTypeRef = function (a) {
	return {ctor: 'ListTypeRef', _0: a};
};
var _jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST$NamedTypeRef = function (a) {
	return {ctor: 'NamedTypeRef', _0: a};
};
var _jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST$Directive = function (a) {
	return {ctor: 'Directive', _0: a};
};

var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder_TypeRef$nullable = function (_p0) {
	var _p1 = _p0;
	return A2(_jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST$TypeRef, _jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST$Nullable, _p1._1);
};
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder_TypeRef$list = function (_p2) {
	return A2(
		_jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST$TypeRef,
		_jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST$NonNull,
		_jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST$ListTypeRef(_p2));
};
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder_TypeRef$namedType = function (_p3) {
	return A2(
		_jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST$TypeRef,
		_jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST$NonNull,
		_jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST$NamedTypeRef(_p3));
};
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder_TypeRef$int = _jamesmacaulay$elm_graphql$GraphQL_Request_Builder_TypeRef$namedType('Int');
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder_TypeRef$float = _jamesmacaulay$elm_graphql$GraphQL_Request_Builder_TypeRef$namedType('Float');
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder_TypeRef$string = _jamesmacaulay$elm_graphql$GraphQL_Request_Builder_TypeRef$namedType('String');
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder_TypeRef$boolean = _jamesmacaulay$elm_graphql$GraphQL_Request_Builder_TypeRef$namedType('Boolean');
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder_TypeRef$id = _jamesmacaulay$elm_graphql$GraphQL_Request_Builder_TypeRef$namedType('ID');

var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Variable$toDefinitionAST = function ($var) {
	var _p0 = $var;
	if (_p0.ctor === 'RequiredVariable') {
		return _jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST$VariableDefinition(
			{name: _p0._0, variableType: _p0._1, defaultValue: _elm_lang$core$Maybe$Nothing});
	} else {
		return _jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST$VariableDefinition(
			{
				name: _p0._0,
				variableType: _p0._1,
				defaultValue: _elm_lang$core$Maybe$Just(_p0._3)
			});
	}
};
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Variable$name = function ($var) {
	var _p1 = $var;
	if (_p1.ctor === 'RequiredVariable') {
		return _p1._0;
	} else {
		return _p1._0;
	}
};
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Variable$valueFromSource = F2(
	function (source, $var) {
		var _p2 = $var;
		if (_p2.ctor === 'RequiredVariable') {
			return _elm_lang$core$Maybe$Just(
				{
					ctor: '_Tuple2',
					_0: _jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Variable$name($var),
					_1: _p2._2(source)
				});
		} else {
			var _p3 = _p2._2(source);
			if (_p3.ctor === 'Nothing') {
				return _elm_lang$core$Maybe$Nothing;
			} else {
				return _elm_lang$core$Maybe$Just(
					{
						ctor: '_Tuple2',
						_0: _jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Variable$name($var),
						_1: _p3._0
					});
			}
		}
	});
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Variable$extractValuesFrom = F2(
	function (source, vars) {
		return A2(
			_elm_lang$core$List$filterMap,
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Variable$valueFromSource(source),
			vars);
	});
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Variable$fieldTuple = F2(
	function (source, _p4) {
		var _p5 = _p4;
		return A2(
			_elm_lang$core$Maybe$map,
			function (value) {
				return {ctor: '_Tuple2', _0: _p5._0, _1: value};
			},
			_p5._2(source));
	});
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Variable$VariableSpec = F3(
	function (a, b, c) {
		return {ctor: 'VariableSpec', _0: a, _1: b, _2: c};
	});
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Variable$Nullable = {ctor: 'Nullable'};
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Variable$nullable = function (_p6) {
	var _p7 = _p6;
	return A3(
		_jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Variable$VariableSpec,
		_jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Variable$Nullable,
		_jamesmacaulay$elm_graphql$GraphQL_Request_Builder_TypeRef$nullable(_p7._1),
		function (_p8) {
			return A2(
				_elm_lang$core$Maybe$withDefault,
				_jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST$NullValue,
				A2(_elm_lang$core$Maybe$map, _p7._2, _p8));
		});
};
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Variable$NonNull = {ctor: 'NonNull'};
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Variable$int = A3(_jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Variable$VariableSpec, _jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Variable$NonNull, _jamesmacaulay$elm_graphql$GraphQL_Request_Builder_TypeRef$int, _jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST$IntValue);
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Variable$float = A3(_jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Variable$VariableSpec, _jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Variable$NonNull, _jamesmacaulay$elm_graphql$GraphQL_Request_Builder_TypeRef$float, _jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST$FloatValue);
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Variable$string = A3(_jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Variable$VariableSpec, _jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Variable$NonNull, _jamesmacaulay$elm_graphql$GraphQL_Request_Builder_TypeRef$string, _jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST$StringValue);
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Variable$bool = A3(_jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Variable$VariableSpec, _jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Variable$NonNull, _jamesmacaulay$elm_graphql$GraphQL_Request_Builder_TypeRef$boolean, _jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST$BooleanValue);
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Variable$id = A3(_jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Variable$VariableSpec, _jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Variable$NonNull, _jamesmacaulay$elm_graphql$GraphQL_Request_Builder_TypeRef$id, _jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST$StringValue);
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Variable$enum = F2(
	function (typeName, convert) {
		return A3(
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Variable$VariableSpec,
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Variable$NonNull,
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder_TypeRef$namedType(typeName),
			function (_p9) {
				return _jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST$EnumValue(
					convert(_p9));
			});
	});
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Variable$list = function (_p10) {
	var _p11 = _p10;
	return A3(
		_jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Variable$VariableSpec,
		_jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Variable$NonNull,
		_jamesmacaulay$elm_graphql$GraphQL_Request_Builder_TypeRef$list(_p11._1),
		function (_p12) {
			return _jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST$ListValue(
				A2(_elm_lang$core$List$map, _p11._2, _p12));
		});
};
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Variable$object = F2(
	function (typeName, fields) {
		return A3(
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Variable$VariableSpec,
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Variable$NonNull,
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder_TypeRef$namedType(typeName),
			function (source) {
				return _jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST$ObjectValue(
					A2(
						_elm_lang$core$List$filterMap,
						_jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Variable$fieldTuple(source),
						fields));
			});
	});
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Variable$OptionalVariable = F4(
	function (a, b, c, d) {
		return {ctor: 'OptionalVariable', _0: a, _1: b, _2: c, _3: d};
	});
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Variable$optional = F4(
	function (name, extractMaybe, _p13, defaultValue) {
		var _p14 = _p13;
		var _p16 = _p14._2;
		return A4(
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Variable$OptionalVariable,
			name,
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder_TypeRef$nullable(_p14._1),
			function (_p15) {
				return A2(
					_elm_lang$core$Maybe$map,
					_p16,
					extractMaybe(_p15));
			},
			_p16(defaultValue));
	});
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Variable$RequiredVariable = F3(
	function (a, b, c) {
		return {ctor: 'RequiredVariable', _0: a, _1: b, _2: c};
	});
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Variable$required = F3(
	function (name, extract, _p17) {
		var _p18 = _p17;
		return A3(
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Variable$RequiredVariable,
			name,
			_p18._1,
			function (_p19) {
				return _p18._2(
					extract(_p19));
			});
	});
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Variable$Field = F3(
	function (a, b, c) {
		return {ctor: 'Field', _0: a, _1: b, _2: c};
	});
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Variable$field = F3(
	function (name, extract, _p20) {
		var _p21 = _p20;
		return A3(
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Variable$Field,
			name,
			_p21._1,
			function (_p22) {
				return _elm_lang$core$Maybe$Just(
					_p21._2(
						extract(_p22)));
			});
	});
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Variable$optionalField = F3(
	function (name, extract, _p23) {
		var _p24 = _p23;
		return A3(
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Variable$Field,
			name,
			_p24._1,
			function (_p25) {
				return A2(
					_elm_lang$core$Maybe$map,
					_p24._2,
					extract(_p25));
			});
	});

var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Variable_Util$variableIsNotInList = F2(
	function (existingVars, thisVar) {
		var thisVarAST = _jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Variable$toDefinitionAST(thisVar);
		var sameASTAsThisVar = function ($var) {
			return _elm_lang$core$Native_Utils.eq(
				_jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Variable$toDefinitionAST($var),
				thisVarAST);
		};
		return !A2(_elm_lang$core$List$any, sameASTAsThisVar, existingVars);
	});
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Variable_Util$mergeVariables = F2(
	function (varsA, varsB) {
		return A2(
			_elm_lang$core$Basics_ops['++'],
			varsA,
			A2(
				_elm_lang$core$List$filter,
				_jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Variable_Util$variableIsNotInList(varsA),
				varsB));
	});

var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Arg$getVariables = function (_p0) {
	var _p1 = _p0;
	return _p1._1;
};
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Arg$getAST = function (_p2) {
	var _p3 = _p2;
	return _p3._0;
};
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Arg$valueVariablesFoldStep = function (_p4) {
	return _jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Variable_Util$mergeVariables(
		_jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Arg$getVariables(_p4));
};
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Arg$Value = F2(
	function (a, b) {
		return {ctor: 'Value', _0: a, _1: b};
	});
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Arg$variable = function ($var) {
	return A2(
		_jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Arg$Value,
		A2(
			_jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST$VariableValue,
			{ctor: '_Tuple0'},
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Variable$name($var)),
		{
			ctor: '::',
			_0: $var,
			_1: {ctor: '[]'}
		});
};
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Arg$int = function (x) {
	return A2(
		_jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Arg$Value,
		_jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST$IntValue(x),
		{ctor: '[]'});
};
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Arg$float = function (x) {
	return A2(
		_jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Arg$Value,
		_jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST$FloatValue(x),
		{ctor: '[]'});
};
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Arg$string = function (x) {
	return A2(
		_jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Arg$Value,
		_jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST$StringValue(x),
		{ctor: '[]'});
};
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Arg$bool = function (x) {
	return A2(
		_jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Arg$Value,
		_jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST$BooleanValue(x),
		{ctor: '[]'});
};
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Arg$true = _jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Arg$bool(true);
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Arg$false = _jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Arg$bool(false);
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Arg$null = A2(
	_jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Arg$Value,
	_jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST$NullValue,
	{ctor: '[]'});
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Arg$enum = function (symbol) {
	return A2(
		_jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Arg$Value,
		_jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST$EnumValue(symbol),
		{ctor: '[]'});
};
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Arg$object = function (pairs) {
	return A2(
		_jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Arg$Value,
		_jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST$ObjectValue(
			A2(
				_elm_lang$core$List$map,
				function (_p5) {
					var _p6 = _p5;
					return {ctor: '_Tuple2', _0: _p6._0, _1: _p6._1._0};
				},
				pairs)),
		A3(
			_elm_lang$core$List$foldr,
			function (_p7) {
				return _jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Arg$valueVariablesFoldStep(
					_elm_lang$core$Tuple$second(_p7));
			},
			{ctor: '[]'},
			pairs));
};
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Arg$list = function (values) {
	return A2(
		_jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Arg$Value,
		_jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST$ListValue(
			A2(
				_elm_lang$core$List$map,
				function (_p8) {
					var _p9 = _p8;
					return _p9._0;
				},
				values)),
		A3(
			_elm_lang$core$List$foldr,
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Arg$valueVariablesFoldStep,
			{ctor: '[]'},
			values));
};

var _jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST_Serialize$serializeTypeCondition = function (_p0) {
	var _p1 = _p0;
	return A2(_elm_lang$core$Basics_ops['++'], 'on ', _p1._0);
};
var _jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST_Serialize$serializeFragmentSpreadName = function (name) {
	return A2(_elm_lang$core$Basics_ops['++'], '...', name);
};
var _jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST_Serialize$serializeFieldAlias = function (alias) {
	return A2(_elm_lang$core$Basics_ops['++'], alias, ':');
};
var _jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST_Serialize$indent = F2(
	function (level, string) {
		return (_elm_lang$core$Native_Utils.cmp(level, 0) < 1) ? string : A2(
			_elm_lang$core$Basics_ops['++'],
			'  ',
			A2(_jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST_Serialize$indent, level - 1, string));
	});
var _jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST_Serialize$serializeDirectiveName = function (name) {
	return A2(_elm_lang$core$Basics_ops['++'], '@', name);
};
var _jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST_Serialize$serializeValue = function (value) {
	var _p2 = value;
	switch (_p2.ctor) {
		case 'VariableValue':
			return A2(_elm_lang$core$Basics_ops['++'], '$', _p2._1);
		case 'IntValue':
			return _elm_lang$core$Basics$toString(_p2._0);
		case 'FloatValue':
			return _elm_lang$core$Basics$toString(_p2._0);
		case 'StringValue':
			return _elm_lang$core$Basics$toString(_p2._0);
		case 'BooleanValue':
			if (_p2._0 === true) {
				return 'true';
			} else {
				return 'false';
			}
		case 'NullValue':
			return 'null';
		case 'EnumValue':
			return _p2._0;
		case 'ListValue':
			return A2(
				_elm_lang$core$Basics_ops['++'],
				'[',
				A2(
					_elm_lang$core$Basics_ops['++'],
					A2(
						_elm_lang$core$String$join,
						', ',
						A2(_elm_lang$core$List$map, _jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST_Serialize$serializeValue, _p2._0)),
					']'));
		default:
			return A2(
				_elm_lang$core$Basics_ops['++'],
				'{',
				A2(
					_elm_lang$core$Basics_ops['++'],
					A2(
						_elm_lang$core$String$join,
						', ',
						A2(_elm_lang$core$List$map, _jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST_Serialize$serializeKeyValuePair, _p2._0)),
					'}'));
	}
};
var _jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST_Serialize$serializeKeyValuePair = function (_p3) {
	var _p4 = _p3;
	return A2(
		_elm_lang$core$Basics_ops['++'],
		_p4._0,
		A2(
			_elm_lang$core$Basics_ops['++'],
			': ',
			_jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST_Serialize$serializeValue(_p4._1)));
};
var _jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST_Serialize$serializeArgList = function (args) {
	return _elm_lang$core$List$isEmpty(args) ? {ctor: '[]'} : {
		ctor: '::',
		_0: A2(
			_elm_lang$core$Basics_ops['++'],
			'(',
			A2(
				_elm_lang$core$Basics_ops['++'],
				A2(
					_elm_lang$core$String$join,
					', ',
					A2(_elm_lang$core$List$map, _jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST_Serialize$serializeKeyValuePair, args)),
				')')),
		_1: {ctor: '[]'}
	};
};
var _jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST_Serialize$serializeDirective = function (_p5) {
	var _p6 = _p5;
	return A2(
		_elm_lang$core$String$join,
		'',
		{
			ctor: '::',
			_0: _jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST_Serialize$serializeDirectiveName(_p6._0.name),
			_1: _jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST_Serialize$serializeArgList(_p6._0.$arguments)
		});
};
var _jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST_Serialize$serializeFragmentSpread = F2(
	function (indentLevel, _p7) {
		var _p8 = _p7;
		return A2(
			_jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST_Serialize$indent,
			indentLevel,
			A2(
				_elm_lang$core$String$join,
				' ',
				{
					ctor: '::',
					_0: _jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST_Serialize$serializeFragmentSpreadName(_p8.name),
					_1: A2(_elm_lang$core$List$map, _jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST_Serialize$serializeDirective, _p8.directives)
				}));
	});
var _jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST_Serialize$serializeNullability = function (nullability) {
	var _p9 = nullability;
	if (_p9.ctor === 'Nullable') {
		return '';
	} else {
		return '!';
	}
};
var _jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST_Serialize$serializeDefaultValue = function (value) {
	return A2(
		_elm_lang$core$Basics_ops['++'],
		'= ',
		_jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST_Serialize$serializeValue(value));
};
var _jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST_Serialize$serializeTypeRef = function (_p10) {
	var _p11 = _p10;
	return A2(
		_elm_lang$core$Basics_ops['++'],
		_jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST_Serialize$serializeCoreTypeRef(_p11._1),
		_jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST_Serialize$serializeNullability(_p11._0));
};
var _jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST_Serialize$serializeCoreTypeRef = function (coreTypeRef) {
	var _p12 = coreTypeRef;
	if (_p12.ctor === 'NamedTypeRef') {
		return _p12._0;
	} else {
		return A2(
			_elm_lang$core$Basics_ops['++'],
			'[',
			A2(
				_elm_lang$core$Basics_ops['++'],
				_jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST_Serialize$serializeTypeRef(_p12._0),
				']'));
	}
};
var _jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST_Serialize$serializeVariableName = function (name) {
	return A2(_elm_lang$core$Basics_ops['++'], '$', name);
};
var _jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST_Serialize$serializeOperationType = function (opType) {
	var _p13 = opType;
	if (_p13.ctor === 'Query') {
		return 'query';
	} else {
		return 'mutation';
	}
};
var _jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST_Serialize$listFromMaybe = function (m) {
	var _p14 = m;
	if (_p14.ctor === 'Nothing') {
		return {ctor: '[]'};
	} else {
		return {
			ctor: '::',
			_0: _p14._0,
			_1: {ctor: '[]'}
		};
	}
};
var _jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST_Serialize$serializeVariableDefinition = function (_p15) {
	var _p16 = _p15;
	var _p17 = _p16._0;
	return A2(
		_elm_lang$core$String$join,
		' ',
		_elm_lang$core$List$concat(
			{
				ctor: '::',
				_0: {
					ctor: '::',
					_0: A2(
						_elm_lang$core$Basics_ops['++'],
						_jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST_Serialize$serializeVariableName(_p17.name),
						':'),
					_1: {
						ctor: '::',
						_0: _jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST_Serialize$serializeTypeRef(_p17.variableType),
						_1: {ctor: '[]'}
					}
				},
				_1: {
					ctor: '::',
					_0: _jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST_Serialize$listFromMaybe(
						A2(_elm_lang$core$Maybe$map, _jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST_Serialize$serializeDefaultValue, _p17.defaultValue)),
					_1: {ctor: '[]'}
				}
			}));
};
var _jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST_Serialize$serializeVariableDefinitions = function (defs) {
	return _elm_lang$core$List$isEmpty(defs) ? {ctor: '[]'} : {
		ctor: '::',
		_0: A2(
			_elm_lang$core$Basics_ops['++'],
			'(',
			A2(
				_elm_lang$core$Basics_ops['++'],
				A2(
					_elm_lang$core$String$join,
					', ',
					A2(_elm_lang$core$List$map, _jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST_Serialize$serializeVariableDefinition, defs)),
				')')),
		_1: {ctor: '[]'}
	};
};
var _jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST_Serialize$serializeInlineFragment = F2(
	function (indentLevel, _p18) {
		var _p19 = _p18;
		return A2(
			_jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST_Serialize$indent,
			indentLevel,
			A2(
				_elm_lang$core$String$join,
				' ',
				_elm_lang$core$List$concat(
					{
						ctor: '::',
						_0: {
							ctor: '::',
							_0: '...',
							_1: _jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST_Serialize$listFromMaybe(
								A2(_elm_lang$core$Maybe$map, _jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST_Serialize$serializeTypeCondition, _p19.typeCondition))
						},
						_1: {
							ctor: '::',
							_0: A2(_elm_lang$core$List$map, _jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST_Serialize$serializeDirective, _p19.directives),
							_1: {
								ctor: '::',
								_0: A2(_jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST_Serialize$serializeSelectionSet, indentLevel, _p19.selectionSet),
								_1: {ctor: '[]'}
							}
						}
					})));
	});
var _jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST_Serialize$serializeSelectionSet = F2(
	function (indentLevel, _p20) {
		var _p21 = _p20;
		var _p22 = _p21._0;
		return _elm_lang$core$List$isEmpty(_p22) ? {ctor: '[]'} : {
			ctor: '::',
			_0: A2(
				_elm_lang$core$Basics_ops['++'],
				'{\n',
				A2(
					_elm_lang$core$Basics_ops['++'],
					A2(
						_elm_lang$core$String$join,
						'\n',
						A2(
							_elm_lang$core$List$map,
							_jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST_Serialize$serializeSelection(indentLevel + 1),
							_p22)),
					A2(
						_elm_lang$core$Basics_ops['++'],
						'\n',
						A2(_jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST_Serialize$indent, indentLevel, '}')))),
			_1: {ctor: '[]'}
		};
	});
var _jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST_Serialize$serializeSelection = F2(
	function (indentLevel, selection) {
		var _p23 = selection;
		switch (_p23.ctor) {
			case 'Field':
				return A2(_jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST_Serialize$serializeField, indentLevel, _p23._0);
			case 'FragmentSpread':
				return A2(_jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST_Serialize$serializeFragmentSpread, indentLevel, _p23._0);
			default:
				return A2(_jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST_Serialize$serializeInlineFragment, indentLevel, _p23._0);
		}
	});
var _jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST_Serialize$serializeField = F2(
	function (indentLevel, field) {
		return A2(
			_jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST_Serialize$indent,
			indentLevel,
			A2(
				_elm_lang$core$String$join,
				' ',
				_elm_lang$core$List$concat(
					{
						ctor: '::',
						_0: _jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST_Serialize$listFromMaybe(
							A2(_elm_lang$core$Maybe$map, _jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST_Serialize$serializeFieldAlias, field.alias)),
						_1: {
							ctor: '::',
							_0: {
								ctor: '::',
								_0: A2(
									_elm_lang$core$String$join,
									'',
									{
										ctor: '::',
										_0: field.name,
										_1: _jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST_Serialize$serializeArgList(field.$arguments)
									}),
								_1: {ctor: '[]'}
							},
							_1: {
								ctor: '::',
								_0: A2(_elm_lang$core$List$map, _jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST_Serialize$serializeDirective, field.directives),
								_1: {
									ctor: '::',
									_0: A2(_jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST_Serialize$serializeSelectionSet, indentLevel, field.selectionSet),
									_1: {ctor: '[]'}
								}
							}
						}
					})));
	});
var _jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST_Serialize$serializeOperation = function (info) {
	return A2(
		_elm_lang$core$String$join,
		' ',
		_elm_lang$core$List$concat(
			{
				ctor: '::',
				_0: {
					ctor: '::',
					_0: _jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST_Serialize$serializeOperationType(info.operationType),
					_1: {ctor: '[]'}
				},
				_1: {
					ctor: '::',
					_0: _jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST_Serialize$listFromMaybe(info.name),
					_1: {
						ctor: '::',
						_0: _jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST_Serialize$serializeVariableDefinitions(info.variableDefinitions),
						_1: {
							ctor: '::',
							_0: A2(_elm_lang$core$List$map, _jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST_Serialize$serializeDirective, info.directives),
							_1: {
								ctor: '::',
								_0: A2(_jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST_Serialize$serializeSelectionSet, 0, info.selectionSet),
								_1: {ctor: '[]'}
							}
						}
					}
				}
			}));
};
var _jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST_Serialize$serializeFragmentDefinition = function (_p24) {
	var _p25 = _p24;
	return A2(
		_elm_lang$core$String$join,
		' ',
		_elm_lang$core$List$concat(
			{
				ctor: '::',
				_0: {
					ctor: '::',
					_0: 'fragment',
					_1: {
						ctor: '::',
						_0: _p25.name,
						_1: {
							ctor: '::',
							_0: _jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST_Serialize$serializeTypeCondition(_p25.typeCondition),
							_1: {ctor: '[]'}
						}
					}
				},
				_1: {
					ctor: '::',
					_0: A2(_elm_lang$core$List$map, _jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST_Serialize$serializeDirective, _p25.directives),
					_1: {
						ctor: '::',
						_0: A2(_jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST_Serialize$serializeSelectionSet, 0, _p25.selectionSet),
						_1: {ctor: '[]'}
					}
				}
			}));
};
var _jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST_Serialize$serializeDefinition = function (definition) {
	var _p26 = definition;
	switch (_p26.ctor) {
		case 'OperationDefinition':
			return _jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST_Serialize$serializeOperation(_p26._0);
		case 'QueryShorthand':
			return A2(
				_elm_lang$core$String$join,
				'',
				A2(_jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST_Serialize$serializeSelectionSet, 0, _p26._0));
		default:
			return _jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST_Serialize$serializeFragmentDefinition(_p26._0);
	}
};
var _jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST_Serialize$serializeDocument = function (_p27) {
	var _p28 = _p27;
	return A2(
		_elm_lang$core$String$join,
		'\n\n',
		A2(_elm_lang$core$List$map, _jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST_Serialize$serializeDefinition, _p28._0));
};

var _jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST_Util$responseKey = function (fieldInfo) {
	var _p0 = fieldInfo.alias;
	if (_p0.ctor === 'Nothing') {
		return fieldInfo.name;
	} else {
		return _p0._0;
	}
};

var _jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST_Value_Json_Encode$encode = function (value) {
	var _p0 = value;
	switch (_p0.ctor) {
		case 'VariableValue':
			return _elm_lang$core$Json_Encode$null;
		case 'IntValue':
			return _elm_lang$core$Json_Encode$int(_p0._0);
		case 'FloatValue':
			return _elm_lang$core$Json_Encode$float(_p0._0);
		case 'StringValue':
			return _elm_lang$core$Json_Encode$string(_p0._0);
		case 'BooleanValue':
			return _elm_lang$core$Json_Encode$bool(_p0._0);
		case 'NullValue':
			return _elm_lang$core$Json_Encode$null;
		case 'EnumValue':
			return _elm_lang$core$Json_Encode$string(_p0._0);
		case 'ListValue':
			return _elm_lang$core$Json_Encode$list(
				A2(_elm_lang$core$List$map, _jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST_Value_Json_Encode$encode, _p0._0));
		default:
			return _elm_lang$core$Json_Encode$object(
				A2(
					_elm_lang$core$List$map,
					_elm_lang$core$Tuple$mapSecond(_jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST_Value_Json_Encode$encode),
					_p0._0));
	}
};

var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$mergeFragments = F2(
	function (fragmentsA, fragmentsB) {
		return A2(
			_elm_lang$core$Basics_ops['++'],
			fragmentsA,
			A2(
				_elm_lang$core$List$filter,
				function (fragment) {
					return !A2(
						_elm_lang$core$List$any,
						F2(
							function (x, y) {
								return _elm_lang$core$Native_Utils.eq(x, y);
							})(fragment),
						fragmentsA);
				},
				fragmentsB));
	});
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$documentVariables = function (_p0) {
	var _p1 = _p0;
	var _p2 = _p1._0.operation;
	var spec = _p2._0.spec;
	var _p3 = spec;
	var vars = _p3._2;
	return vars;
};
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$documentString = function (_p4) {
	var _p5 = _p4;
	return _p5._0.serialized;
};
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$documentAST = function (_p6) {
	var _p7 = _p6;
	return _p7._0.ast;
};
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$operationTypeAST = function (operationType) {
	var _p8 = operationType;
	if (_p8.ctor === 'QueryOperationType') {
		return _jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST$Query;
	} else {
		return _jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST$Mutation;
	}
};
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$variableDefinitionsAST = function (_p9) {
	var _p10 = _p9;
	return A2(_elm_lang$core$List$map, _jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Variable$toDefinitionAST, _p10._2);
};
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$emptySelectionSet = _jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST$SelectionSet(
	{ctor: '[]'});
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$selectionSetFromSourceType = function (sourceType) {
	var _p11 = sourceType;
	if (_p11.ctor === 'SpecifiedType') {
		return _p11._0.selectionSet;
	} else {
		return _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$emptySelectionSet;
	}
};
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$selectionSetFromSpec = function (_p12) {
	var _p13 = _p12;
	return _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$selectionSetFromSourceType(_p13._0);
};
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$specDecoder = function (_p14) {
	var _p15 = _p14;
	return _p15._1(
		_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$selectionSetFromSourceType(_p15._0));
};
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$documentResponseDecoder = function (_p16) {
	var _p17 = _p16;
	var _p18 = _p17._0.operation;
	var spec = _p18._0.spec;
	return _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$specDecoder(spec);
};
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$mergeSelectionSets = F2(
	function (_p20, _p19) {
		var _p21 = _p20;
		var _p22 = _p19;
		return _jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST$SelectionSet(
			A2(_elm_lang$core$Basics_ops['++'], _p21._0, _p22._0));
	});
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$decoderFromEnumLabel = F2(
	function (fallbackDecoder, labelledValues) {
		var valueFromLabel = A2(
			_elm_lang$core$Basics$flip,
			_elm_lang$core$Dict$get,
			_elm_lang$core$Dict$fromList(labelledValues));
		var decoder = function (enumString) {
			var _p23 = valueFromLabel(enumString);
			if (_p23.ctor === 'Just') {
				return _elm_lang$core$Json_Decode$succeed(_p23._0);
			} else {
				return fallbackDecoder(enumString);
			}
		};
		return decoder;
	});
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$varsFromArguments = function ($arguments) {
	return A3(
		_elm_lang$core$List$foldr,
		function (_p24) {
			return _jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Variable_Util$mergeVariables(
				_jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Arg$getVariables(
					_elm_lang$core$Tuple$second(_p24)));
		},
		{ctor: '[]'},
		$arguments);
};
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$varsFromDirectives = _elm_lang$core$List$concatMap(
	function (_p25) {
		return _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$varsFromArguments(
			_elm_lang$core$Tuple$second(_p25));
	});
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$fragmentVariables = function (_p26) {
	var _p27 = _p26;
	var _p28 = _p27._0.spec;
	var specVariables = _p28._2;
	var directiveVariables = _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$varsFromDirectives(_p27._0.directives);
	return A2(_jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Variable_Util$mergeVariables, directiveVariables, specVariables);
};
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$argumentsAST = _elm_lang$core$List$map(
	_elm_lang$core$Tuple$mapSecond(_jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Arg$getAST));
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$directiveAST = function (_p29) {
	var _p30 = _p29;
	return _jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST$Directive(
		{
			name: _p30._0,
			$arguments: _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$argumentsAST(_p30._1)
		});
};
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$updateInfoWithDirectives = F2(
	function (directives, info) {
		return _elm_lang$core$Native_Utils.update(
			info,
			{
				directives: A2(_elm_lang$core$List$map, _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$directiveAST, directives)
			});
	});
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$selectionASTWithDirectives = F2(
	function (directives, selection) {
		var _p31 = selection;
		switch (_p31.ctor) {
			case 'Field':
				return _jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST$Field(
					A2(_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$updateInfoWithDirectives, directives, _p31._0));
			case 'FragmentSpread':
				return _jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST$FragmentSpread(
					A2(_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$updateInfoWithDirectives, directives, _p31._0));
			default:
				return _jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST$InlineFragment(
					A2(_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$updateInfoWithDirectives, directives, _p31._0));
		}
	});
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$operationAST = function (_p32) {
	var _p33 = _p32;
	var _p34 = _p33._0.spec;
	return {
		operationType: _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$operationTypeAST(_p33._0.operationType),
		name: _p33._0.name,
		variableDefinitions: _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$variableDefinitionsAST(_p34),
		directives: A2(_elm_lang$core$List$map, _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$directiveAST, _p33._0.directives),
		selectionSet: _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$selectionSetFromSpec(_p34)
	};
};
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$fragmentAST = function (_p35) {
	var _p36 = _p35;
	return {
		name: _p36._0.name,
		typeCondition: _p36._0.typeCondition,
		directives: A2(_elm_lang$core$List$map, _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$directiveAST, _p36._0.directives),
		selectionSet: _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$selectionSetFromSpec(_p36._0.spec)
	};
};
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$onType = _jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST$TypeCondition;
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$fragmentDefinitionsFromOperation = function (_p37) {
	var _p38 = _p37;
	var _p39 = _p38._0.spec;
	var fragments = _p39._3;
	return fragments;
};
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$responseDataDecoder = function (_p40) {
	var _p41 = _p40;
	return _p41._0.responseDataDecoder;
};
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$variableValuesToJson = function (kvPairs) {
	return _elm_lang$core$List$isEmpty(kvPairs) ? _elm_lang$core$Maybe$Nothing : _elm_lang$core$Maybe$Just(
		_elm_lang$core$Json_Encode$object(
			A2(
				_elm_lang$core$List$map,
				_elm_lang$core$Tuple$mapSecond(_jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST_Value_Json_Encode$encode),
				kvPairs)));
};
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$jsonVariableValues = function (_p42) {
	var _p43 = _p42;
	return _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$variableValuesToJson(_p43._0.variableValues);
};
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$requestBody = function (_p44) {
	var _p45 = _p44;
	return _p45._0.documentString;
};
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$selectionDecoder = F2(
	function (selectionAST, decoder) {
		var _p46 = selectionAST;
		if (_p46.ctor === 'Field') {
			return function (_p47) {
				return A2(
					_elm_lang$core$Json_Decode$field,
					_jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST_Util$responseKey(_p46._0),
					decoder(_p47));
			};
		} else {
			return decoder;
		}
	});
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$SpecifiedTypeInfo = F4(
	function (a, b, c, d) {
		return {nullability: a, coreType: b, join: c, selectionSet: d};
	});
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$Request = function (a) {
	return {ctor: 'Request', _0: a};
};
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$request = F2(
	function (vars, _p48) {
		var _p49 = _p48;
		var _p50 = _p49;
		return _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$Request(
			{
				documentAST: _p49._0.ast,
				documentString: _p49._0.serialized,
				variableValues: A2(
					_jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Variable$extractValuesFrom,
					vars,
					_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$documentVariables(_p50)),
				responseDataDecoder: _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$documentResponseDecoder(_p50)
			});
	});
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$Document = function (a) {
	return {ctor: 'Document', _0: a};
};
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$document = function (operation) {
	var fragmentDefinitions = _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$fragmentDefinitionsFromOperation(operation);
	var ast = _jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST$Document(
		A2(
			_elm_lang$core$Basics_ops['++'],
			A2(_elm_lang$core$List$map, _jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST$FragmentDefinition, fragmentDefinitions),
			{
				ctor: '::',
				_0: _jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST$OperationDefinition(
					_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$operationAST(operation)),
				_1: {ctor: '[]'}
			}));
	return _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$Document(
		{
			operation: operation,
			ast: ast,
			serialized: _jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST_Serialize$serializeDocument(ast)
		});
};
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$Operation = function (a) {
	return {ctor: 'Operation', _0: a};
};
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$MutationOperationType = {ctor: 'MutationOperationType'};
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$mutationOperationType = _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$MutationOperationType;
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$mutationDocument = function (spec) {
	return _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$document(
		_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$Operation(
			{
				operationType: _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$mutationOperationType,
				name: _elm_lang$core$Maybe$Nothing,
				directives: {ctor: '[]'},
				spec: spec
			}));
};
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$QueryOperationType = {ctor: 'QueryOperationType'};
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$queryOperationType = _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$QueryOperationType;
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$queryDocument = function (spec) {
	return _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$document(
		_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$Operation(
			{
				operationType: _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$queryOperationType,
				name: _elm_lang$core$Maybe$Nothing,
				directives: {ctor: '[]'},
				spec: spec
			}));
};
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$Query = {ctor: 'Query'};
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$Mutation = {ctor: 'Mutation'};
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$Fragment = function (a) {
	return {ctor: 'Fragment', _0: a};
};
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$fragment = F3(
	function (name, typeCondition, spec) {
		return _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$Fragment(
			{
				name: name,
				typeCondition: typeCondition,
				directives: {ctor: '[]'},
				spec: spec
			});
	});
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$ValueSpec = F4(
	function (a, b, c, d) {
		return {ctor: 'ValueSpec', _0: a, _1: b, _2: c, _3: d};
	});
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$map = F2(
	function (f, _p51) {
		var _p52 = _p51;
		return A4(
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$ValueSpec,
			_p52._0,
			function (_p53) {
				return A2(
					_elm_lang$core$Json_Decode$map,
					f,
					_p52._1(_p53));
			},
			_p52._2,
			_p52._3);
	});
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$SelectionSpec = F4(
	function (a, b, c, d) {
		return {ctor: 'SelectionSpec', _0: a, _1: b, _2: c, _3: d};
	});
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$field = F3(
	function (name, $arguments, _p54) {
		var _p55 = _p54;
		var vars = A2(
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Variable_Util$mergeVariables,
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$varsFromArguments($arguments),
			_p55._2);
		var astFieldInfo = {
			alias: _elm_lang$core$Maybe$Nothing,
			name: name,
			$arguments: _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$argumentsAST($arguments),
			directives: {ctor: '[]'},
			selectionSet: _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$selectionSetFromSourceType(_p55._0)
		};
		return A4(
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$SelectionSpec,
			_jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST$Field(astFieldInfo),
			_p55._1,
			vars,
			_p55._3);
	});
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$withDirectives = F2(
	function (directives, _p56) {
		var _p57 = _p56;
		return A4(
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$SelectionSpec,
			A2(_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$selectionASTWithDirectives, directives, _p57._0),
			function (_p58) {
				return _elm_lang$core$Json_Decode$maybe(
					_p57._1(_p58));
			},
			A2(
				_jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Variable_Util$mergeVariables,
				_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$varsFromDirectives(directives),
				_p57._2),
			_p57._3);
	});
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$assume = function (_p59) {
	var _p60 = _p59;
	return A4(
		_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$SelectionSpec,
		_p60._0,
		function (_p61) {
			return A2(
				_elm_lang$core$Json_Decode$andThen,
				function (maybeValue) {
					var _p62 = maybeValue;
					if (_p62.ctor === 'Just') {
						return _elm_lang$core$Json_Decode$succeed(_p62._0);
					} else {
						return _elm_lang$core$Json_Decode$fail('Expected a selection to be present in the response with `assume`, but found `Nothing`');
					}
				},
				_p60._1(_p61));
		},
		_p60._2,
		_p60._3);
};
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$aliasAs = F2(
	function (responseKey, _p63) {
		var _p64 = _p63;
		var _p65 = _p64._0;
		if (_p65.ctor === 'Field') {
			return A4(
				_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$SelectionSpec,
				_jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST$Field(
					_elm_lang$core$Native_Utils.update(
						_p65._0,
						{
							alias: _elm_lang$core$Maybe$Just(responseKey)
						})),
				_p64._1,
				_p64._2,
				_p64._3);
		} else {
			return _p64;
		}
	});
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$fragmentSpread = function (_p66) {
	var _p67 = _p66;
	var _p70 = _p67;
	var _p68 = _p67._0.spec;
	var decoder = _p68._1;
	var nestedFragments = _p68._3;
	var astFragmentSpreadInfo = {
		name: _p67._0.name,
		directives: {ctor: '[]'}
	};
	return A4(
		_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$SelectionSpec,
		_jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST$FragmentSpread(astFragmentSpreadInfo),
		function (_p69) {
			return _elm_lang$core$Json_Decode$maybe(
				decoder(_p69));
		},
		_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$fragmentVariables(_p70),
		A2(
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$mergeFragments,
			{
				ctor: '::',
				_0: _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$fragmentAST(_p70),
				_1: {ctor: '[]'}
			},
			nestedFragments));
};
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$inlineFragment = F2(
	function (maybeTypeCondition, spec) {
		var _p71 = spec;
		var sourceType = _p71._0;
		var decoder = _p71._1;
		var vars = _p71._2;
		var fragments = _p71._3;
		var astInlineFragmentInfo = {
			typeCondition: maybeTypeCondition,
			directives: {ctor: '[]'},
			selectionSet: _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$selectionSetFromSourceType(sourceType)
		};
		return A4(
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$SelectionSpec,
			_jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST$InlineFragment(astInlineFragmentInfo),
			function (_p72) {
				return _elm_lang$core$Json_Decode$maybe(
					decoder(_p72));
			},
			vars,
			fragments);
	});
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$Field = {ctor: 'Field'};
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$FragmentSpread = {ctor: 'FragmentSpread'};
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$InlineFragment = {ctor: 'InlineFragment'};
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$AnyType = {ctor: 'AnyType'};
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$produce = function (x) {
	return A4(
		_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$ValueSpec,
		_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$AnyType,
		_elm_lang$core$Basics$always(
			_elm_lang$core$Json_Decode$succeed(x)),
		{ctor: '[]'},
		{ctor: '[]'});
};
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$SpecifiedType = function (a) {
	return {ctor: 'SpecifiedType', _0: a};
};
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$join = F2(
	function (a, b) {
		var _p73 = {ctor: '_Tuple2', _0: a, _1: b};
		if (_p73._0.ctor === 'SpecifiedType') {
			if (_p73._1.ctor === 'SpecifiedType') {
				var _p75 = _p73._1._0;
				var _p74 = _p73._0._0;
				return _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$SpecifiedType(
					_elm_lang$core$Native_Utils.update(
						_p74,
						{
							coreType: A2(_p74.join, _p74.coreType, _p75.coreType),
							selectionSet: A2(_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$mergeSelectionSets, _p74.selectionSet, _p75.selectionSet)
						}));
			} else {
				return a;
			}
		} else {
			return b;
		}
	});
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$map2 = F3(
	function (f, _p77, _p76) {
		var _p78 = _p77;
		var _p79 = _p76;
		var mergedFragments = A2(_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$mergeFragments, _p78._3, _p79._3);
		var mergedVariables = A2(_jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Variable_Util$mergeVariables, _p78._2, _p79._2);
		var joinedDecoder = function (selectionSet) {
			return A3(
				_elm_lang$core$Json_Decode$map2,
				f,
				_p78._1(selectionSet),
				_p79._1(selectionSet));
		};
		var joinedSourceType = A2(_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$join, _p78._0, _p79._0);
		return A4(_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$ValueSpec, joinedSourceType, joinedDecoder, mergedVariables, mergedFragments);
	});
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$withLocalConstant = F2(
	function (x, objectSpec) {
		return A3(
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$map2,
			F2(
				function (x, y) {
					return x(y);
				}),
			objectSpec,
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$produce(x));
	});
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$Nullable = {ctor: 'Nullable'};
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$NonNull = {ctor: 'NonNull'};
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$NonNullFlag = {ctor: 'NonNullFlag'};
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$nonNullFlag = _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$NonNullFlag;
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$primitiveSpec = F2(
	function (coreType, decoder) {
		return A4(
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$ValueSpec,
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$SpecifiedType(
				{nullability: _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$nonNullFlag, coreType: coreType, join: _elm_lang$core$Basics$always, selectionSet: _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$emptySelectionSet}),
			_elm_lang$core$Basics$always(decoder),
			{ctor: '[]'},
			{ctor: '[]'});
	});
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$customScalar = F2(
	function (customTypeMarker, decoder) {
		return A2(_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$primitiveSpec, customTypeMarker, decoder);
	});
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$NullableFlag = {ctor: 'NullableFlag'};
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$nullableFlag = _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$NullableFlag;
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$nullable = function (_p80) {
	var _p81 = _p80;
	var _p87 = _p81._2;
	var _p86 = _p81._3;
	var _p85 = _p81._1;
	var _p82 = _p81._0;
	if (_p82.ctor === 'SpecifiedType') {
		return A4(
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$ValueSpec,
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$SpecifiedType(
				_elm_lang$core$Native_Utils.update(
					_p82._0,
					{nullability: _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$nullableFlag})),
			function (_p83) {
				return _elm_lang$core$Json_Decode$nullable(
					_p85(_p83));
			},
			_p87,
			_p86);
	} else {
		return A4(
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$ValueSpec,
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$AnyType,
			function (_p84) {
				return _elm_lang$core$Json_Decode$nullable(
					_p85(_p84));
			},
			_p87,
			_p86);
	}
};
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$IntType = {ctor: 'IntType'};
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$int = A2(_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$primitiveSpec, _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$IntType, _elm_lang$core$Json_Decode$int);
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$FloatType = {ctor: 'FloatType'};
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$float = A2(_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$primitiveSpec, _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$FloatType, _elm_lang$core$Json_Decode$float);
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$StringType = {ctor: 'StringType'};
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$string = A2(_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$primitiveSpec, _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$StringType, _elm_lang$core$Json_Decode$string);
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$BooleanType = {ctor: 'BooleanType'};
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$bool = A2(_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$primitiveSpec, _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$BooleanType, _elm_lang$core$Json_Decode$bool);
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$IdType = {ctor: 'IdType'};
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$id = A2(_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$primitiveSpec, _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$IdType, _elm_lang$core$Json_Decode$string);
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$EnumType = function (a) {
	return {ctor: 'EnumType', _0: a};
};
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$enumJoin = F2(
	function (_p89, _p88) {
		var _p90 = _p89;
		var _p91 = _p88;
		return _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$EnumType(
			_elm_lang$core$Set$toList(
				A2(
					_elm_lang$core$Set$intersect,
					_elm_lang$core$Set$fromList(_p91._0),
					_elm_lang$core$Set$fromList(_p90._0))));
	});
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$enumWithFallback = F2(
	function (fallbackDecoder, labelledValues) {
		var labels = A2(_elm_lang$core$List$map, _elm_lang$core$Tuple$first, labelledValues);
		var decoderFromLabel = A2(_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$decoderFromEnumLabel, fallbackDecoder, labelledValues);
		var decoder = A2(_elm_lang$core$Json_Decode$andThen, decoderFromLabel, _elm_lang$core$Json_Decode$string);
		return A4(
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$ValueSpec,
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$SpecifiedType(
				{
					nullability: _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$nonNullFlag,
					coreType: _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$EnumType(labels),
					join: _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$enumJoin,
					selectionSet: _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$emptySelectionSet
				}),
			_elm_lang$core$Basics$always(decoder),
			{ctor: '[]'},
			{ctor: '[]'});
	});
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$enum = _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$enumWithFallback(
	function (label) {
		return _elm_lang$core$Json_Decode$fail(
			A2(
				_elm_lang$core$Basics_ops['++'],
				'Unexpected enum value ',
				_elm_lang$core$Basics$toString(label)));
	});
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$enumWithDefault = function (ctr) {
	return _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$enumWithFallback(
		function (label) {
			return _elm_lang$core$Json_Decode$succeed(
				ctr(label));
		});
};
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$ListType = function (a) {
	return {ctor: 'ListType', _0: a};
};
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$listJoin = F2(
	function (_p93, _p92) {
		var _p94 = _p93;
		var _p95 = _p92;
		return _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$ListType(
			A2(_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$join, _p94._0, _p95._0));
	});
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$list = function (_p96) {
	var _p97 = _p96;
	var _p99 = _p97._0;
	return A4(
		_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$ValueSpec,
		_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$SpecifiedType(
			{
				nullability: _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$nonNullFlag,
				coreType: _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$ListType(_p99),
				join: _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$listJoin,
				selectionSet: _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$selectionSetFromSourceType(_p99)
			}),
		function (_p98) {
			return _elm_lang$core$Json_Decode$list(
				_p97._1(_p98));
		},
		_p97._2,
		_p97._3);
};
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$ObjectType = {ctor: 'ObjectType'};
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$extract = function (_p100) {
	var _p101 = _p100;
	var _p102 = _p101._0;
	return A4(
		_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$ValueSpec,
		_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$SpecifiedType(
			{
				nullability: _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$nonNullFlag,
				coreType: _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$ObjectType,
				join: _elm_lang$core$Basics$always,
				selectionSet: _jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST$SelectionSet(
					{
						ctor: '::',
						_0: _p102,
						_1: {ctor: '[]'}
					})
			}),
		A2(_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$selectionDecoder, _p102, _p101._1),
		_p101._2,
		_p101._3);
};
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$keyValuePairs = function (selections) {
	return A3(
		_elm_lang$core$List$foldr,
		F2(
			function (_p103, accSpec) {
				var _p104 = _p103;
				var _p105 = _p104._0;
				if (_p105.ctor === 'Field') {
					var keyValueSpec = A2(
						_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$map,
						function (value) {
							return {
								ctor: '_Tuple2',
								_0: _jamesmacaulay$elm_graphql$GraphQL_Request_Document_AST_Util$responseKey(_p105._0),
								_1: value
							};
						},
						_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$extract(_p104));
					return A3(
						_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$map2,
						F2(
							function (x, y) {
								return {ctor: '::', _0: x, _1: y};
							}),
						keyValueSpec,
						accSpec);
				} else {
					return accSpec;
				}
			}),
		_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$produce(
			{ctor: '[]'}),
		selections);
};
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$dict = function (_p106) {
	return A2(
		_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$map,
		_elm_lang$core$Dict$fromList,
		_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$keyValuePairs(_p106));
};
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$with = F2(
	function (selection, objectSpec) {
		return A3(
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$map2,
			F2(
				function (x, y) {
					return x(y);
				}),
			objectSpec,
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$extract(selection));
	});
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$emptyObjectSpecifiedType = _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$SpecifiedType(
	{nullability: _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$nonNullFlag, coreType: _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$ObjectType, join: _elm_lang$core$Basics$always, selectionSet: _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$emptySelectionSet});
var _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$object = function (ctr) {
	return A4(
		_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$ValueSpec,
		_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$emptyObjectSpecifiedType,
		_elm_lang$core$Basics$always(
			_elm_lang$core$Json_Decode$succeed(ctr)),
		{ctor: '[]'},
		{ctor: '[]'});
};

var _jamesmacaulay$elm_graphql$GraphQL_Client_Http$rawExpect = _elm_lang$http$Http$expectStringResponse(_elm_lang$core$Result$Ok);
var _jamesmacaulay$elm_graphql$GraphQL_Client_Http$RequestError = F2(
	function (a, b) {
		return {message: a, locations: b};
	});
var _jamesmacaulay$elm_graphql$GraphQL_Client_Http$DocumentLocation = F2(
	function (a, b) {
		return {line: a, column: b};
	});
var _jamesmacaulay$elm_graphql$GraphQL_Client_Http$RequestOptions = F5(
	function (a, b, c, d, e) {
		return {method: a, headers: b, url: c, timeout: d, withCredentials: e};
	});
var _jamesmacaulay$elm_graphql$GraphQL_Client_Http$GraphQLError = function (a) {
	return {ctor: 'GraphQLError', _0: a};
};
var _jamesmacaulay$elm_graphql$GraphQL_Client_Http$HttpError = function (a) {
	return {ctor: 'HttpError', _0: a};
};
var _jamesmacaulay$elm_graphql$GraphQL_Client_Http$sendExpecting = F3(
	function (expect, requestOptions, request) {
		var variableValues = _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$jsonVariableValues(request);
		var documentString = _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$requestBody(request);
		return A2(
			_elm_lang$core$Task$mapError,
			A2(_jamesmacaulay$elm_graphql$GraphQL_Client_Http_Util$convertHttpError, _jamesmacaulay$elm_graphql$GraphQL_Client_Http$HttpError, _jamesmacaulay$elm_graphql$GraphQL_Client_Http$GraphQLError),
			_elm_lang$http$Http$toTask(
				_elm_lang$http$Http$request(
					A4(_jamesmacaulay$elm_graphql$GraphQL_Client_Http_Util$requestConfig, requestOptions, documentString, expect, variableValues))));
	});
var _jamesmacaulay$elm_graphql$GraphQL_Client_Http$sendQueryRaw = function (_p0) {
	return A2(
		_jamesmacaulay$elm_graphql$GraphQL_Client_Http$sendExpecting,
		_jamesmacaulay$elm_graphql$GraphQL_Client_Http$rawExpect,
		_jamesmacaulay$elm_graphql$GraphQL_Client_Http_Util$defaultRequestOptions(_p0));
};
var _jamesmacaulay$elm_graphql$GraphQL_Client_Http$sendMutationRaw = function (_p1) {
	return A2(
		_jamesmacaulay$elm_graphql$GraphQL_Client_Http$sendExpecting,
		_jamesmacaulay$elm_graphql$GraphQL_Client_Http$rawExpect,
		_jamesmacaulay$elm_graphql$GraphQL_Client_Http_Util$defaultRequestOptions(_p1));
};
var _jamesmacaulay$elm_graphql$GraphQL_Client_Http$customSendQueryRaw = _jamesmacaulay$elm_graphql$GraphQL_Client_Http$sendExpecting(_jamesmacaulay$elm_graphql$GraphQL_Client_Http$rawExpect);
var _jamesmacaulay$elm_graphql$GraphQL_Client_Http$customSendMutationRaw = _jamesmacaulay$elm_graphql$GraphQL_Client_Http$sendExpecting(_jamesmacaulay$elm_graphql$GraphQL_Client_Http$rawExpect);
var _jamesmacaulay$elm_graphql$GraphQL_Client_Http$send = F2(
	function (options, request) {
		var expect = _jamesmacaulay$elm_graphql$GraphQL_Client_Http_Util$defaultExpect(
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$responseDataDecoder(request));
		return A3(_jamesmacaulay$elm_graphql$GraphQL_Client_Http$sendExpecting, expect, options, request);
	});
var _jamesmacaulay$elm_graphql$GraphQL_Client_Http$sendQuery = function (_p2) {
	return _jamesmacaulay$elm_graphql$GraphQL_Client_Http$send(
		_jamesmacaulay$elm_graphql$GraphQL_Client_Http_Util$defaultRequestOptions(_p2));
};
var _jamesmacaulay$elm_graphql$GraphQL_Client_Http$sendMutation = function (_p3) {
	return _jamesmacaulay$elm_graphql$GraphQL_Client_Http$send(
		_jamesmacaulay$elm_graphql$GraphQL_Client_Http_Util$defaultRequestOptions(_p3));
};
var _jamesmacaulay$elm_graphql$GraphQL_Client_Http$customSendQuery = _jamesmacaulay$elm_graphql$GraphQL_Client_Http$send;
var _jamesmacaulay$elm_graphql$GraphQL_Client_Http$customSendMutation = _jamesmacaulay$elm_graphql$GraphQL_Client_Http$send;

var _lukewestby$elm_http_builder$HttpBuilder$replace = F2(
	function (old, $new) {
		return function (_p0) {
			return A2(
				_elm_lang$core$String$join,
				$new,
				A2(_elm_lang$core$String$split, old, _p0));
		};
	});
var _lukewestby$elm_http_builder$HttpBuilder$queryEscape = function (_p1) {
	return A3(
		_lukewestby$elm_http_builder$HttpBuilder$replace,
		'%20',
		'+',
		_elm_lang$http$Http$encodeUri(_p1));
};
var _lukewestby$elm_http_builder$HttpBuilder$queryPair = function (_p2) {
	var _p3 = _p2;
	return A2(
		_elm_lang$core$Basics_ops['++'],
		_lukewestby$elm_http_builder$HttpBuilder$queryEscape(_p3._0),
		A2(
			_elm_lang$core$Basics_ops['++'],
			'=',
			_lukewestby$elm_http_builder$HttpBuilder$queryEscape(_p3._1)));
};
var _lukewestby$elm_http_builder$HttpBuilder$joinUrlEncoded = function (args) {
	return A2(
		_elm_lang$core$String$join,
		'&',
		A2(_elm_lang$core$List$map, _lukewestby$elm_http_builder$HttpBuilder$queryPair, args));
};
var _lukewestby$elm_http_builder$HttpBuilder$toRequest = function (builder) {
	var encodedParams = _lukewestby$elm_http_builder$HttpBuilder$joinUrlEncoded(builder.queryParams);
	var fullUrl = _elm_lang$core$String$isEmpty(encodedParams) ? builder.url : A2(
		_elm_lang$core$Basics_ops['++'],
		builder.url,
		A2(_elm_lang$core$Basics_ops['++'], '?', encodedParams));
	return _elm_lang$http$Http$request(
		{method: builder.method, url: fullUrl, headers: builder.headers, body: builder.body, expect: builder.expect, timeout: builder.timeout, withCredentials: builder.withCredentials});
};
var _lukewestby$elm_http_builder$HttpBuilder$toTaskPlain = function (builder) {
	return _elm_lang$http$Http$toTask(
		_lukewestby$elm_http_builder$HttpBuilder$toRequest(builder));
};
var _lukewestby$elm_http_builder$HttpBuilder$withCacheBuster = F2(
	function (paramName, builder) {
		return _elm_lang$core$Native_Utils.update(
			builder,
			{
				cacheBuster: _elm_lang$core$Maybe$Just(paramName)
			});
	});
var _lukewestby$elm_http_builder$HttpBuilder$withQueryParams = F2(
	function (queryParams, builder) {
		return _elm_lang$core$Native_Utils.update(
			builder,
			{
				queryParams: A2(_elm_lang$core$Basics_ops['++'], builder.queryParams, queryParams)
			});
	});
var _lukewestby$elm_http_builder$HttpBuilder$toTaskWithCacheBuster = F2(
	function (paramName, builder) {
		var request = function (timestamp) {
			return _lukewestby$elm_http_builder$HttpBuilder$toTaskPlain(
				A2(
					_lukewestby$elm_http_builder$HttpBuilder$withQueryParams,
					{
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: paramName,
							_1: _elm_lang$core$Basics$toString(timestamp)
						},
						_1: {ctor: '[]'}
					},
					builder));
		};
		return A2(_elm_lang$core$Task$andThen, request, _elm_lang$core$Time$now);
	});
var _lukewestby$elm_http_builder$HttpBuilder$toTask = function (builder) {
	var _p4 = builder.cacheBuster;
	if (_p4.ctor === 'Just') {
		return A2(_lukewestby$elm_http_builder$HttpBuilder$toTaskWithCacheBuster, _p4._0, builder);
	} else {
		return _lukewestby$elm_http_builder$HttpBuilder$toTaskPlain(builder);
	}
};
var _lukewestby$elm_http_builder$HttpBuilder$send = F2(
	function (tagger, builder) {
		return A2(
			_elm_lang$core$Task$attempt,
			tagger,
			_lukewestby$elm_http_builder$HttpBuilder$toTask(builder));
	});
var _lukewestby$elm_http_builder$HttpBuilder$withExpect = F2(
	function (expect, builder) {
		return _elm_lang$core$Native_Utils.update(
			builder,
			{expect: expect});
	});
var _lukewestby$elm_http_builder$HttpBuilder$withCredentials = function (builder) {
	return _elm_lang$core$Native_Utils.update(
		builder,
		{withCredentials: true});
};
var _lukewestby$elm_http_builder$HttpBuilder$withTimeout = F2(
	function (timeout, builder) {
		return _elm_lang$core$Native_Utils.update(
			builder,
			{
				timeout: _elm_lang$core$Maybe$Just(timeout)
			});
	});
var _lukewestby$elm_http_builder$HttpBuilder$withBody = F2(
	function (body, builder) {
		return _elm_lang$core$Native_Utils.update(
			builder,
			{body: body});
	});
var _lukewestby$elm_http_builder$HttpBuilder$withStringBody = F2(
	function (contentType, value) {
		return _lukewestby$elm_http_builder$HttpBuilder$withBody(
			A2(_elm_lang$http$Http$stringBody, contentType, value));
	});
var _lukewestby$elm_http_builder$HttpBuilder$withUrlEncodedBody = function (_p5) {
	return A2(
		_lukewestby$elm_http_builder$HttpBuilder$withStringBody,
		'application/x-www-form-urlencoded',
		_lukewestby$elm_http_builder$HttpBuilder$joinUrlEncoded(_p5));
};
var _lukewestby$elm_http_builder$HttpBuilder$withJsonBody = function (value) {
	return _lukewestby$elm_http_builder$HttpBuilder$withBody(
		_elm_lang$http$Http$jsonBody(value));
};
var _lukewestby$elm_http_builder$HttpBuilder$withMultipartStringBody = function (partPairs) {
	return _lukewestby$elm_http_builder$HttpBuilder$withBody(
		_elm_lang$http$Http$multipartBody(
			A2(
				_elm_lang$core$List$map,
				_elm_lang$core$Basics$uncurry(_elm_lang$http$Http$stringPart),
				partPairs)));
};
var _lukewestby$elm_http_builder$HttpBuilder$withHeaders = F2(
	function (headerPairs, builder) {
		return _elm_lang$core$Native_Utils.update(
			builder,
			{
				headers: A2(
					_elm_lang$core$Basics_ops['++'],
					A2(
						_elm_lang$core$List$map,
						_elm_lang$core$Basics$uncurry(_elm_lang$http$Http$header),
						headerPairs),
					builder.headers)
			});
	});
var _lukewestby$elm_http_builder$HttpBuilder$withHeader = F3(
	function (key, value, builder) {
		return _elm_lang$core$Native_Utils.update(
			builder,
			{
				headers: {
					ctor: '::',
					_0: A2(_elm_lang$http$Http$header, key, value),
					_1: builder.headers
				}
			});
	});
var _lukewestby$elm_http_builder$HttpBuilder$requestWithMethodAndUrl = F2(
	function (method, url) {
		return {
			method: method,
			url: url,
			headers: {ctor: '[]'},
			body: _elm_lang$http$Http$emptyBody,
			expect: _elm_lang$http$Http$expectStringResponse(
				function (_p6) {
					return _elm_lang$core$Result$Ok(
						{ctor: '_Tuple0'});
				}),
			timeout: _elm_lang$core$Maybe$Nothing,
			withCredentials: false,
			queryParams: {ctor: '[]'},
			cacheBuster: _elm_lang$core$Maybe$Nothing
		};
	});
var _lukewestby$elm_http_builder$HttpBuilder$get = _lukewestby$elm_http_builder$HttpBuilder$requestWithMethodAndUrl('GET');
var _lukewestby$elm_http_builder$HttpBuilder$post = _lukewestby$elm_http_builder$HttpBuilder$requestWithMethodAndUrl('POST');
var _lukewestby$elm_http_builder$HttpBuilder$put = _lukewestby$elm_http_builder$HttpBuilder$requestWithMethodAndUrl('PUT');
var _lukewestby$elm_http_builder$HttpBuilder$patch = _lukewestby$elm_http_builder$HttpBuilder$requestWithMethodAndUrl('PATCH');
var _lukewestby$elm_http_builder$HttpBuilder$delete = _lukewestby$elm_http_builder$HttpBuilder$requestWithMethodAndUrl('DELETE');
var _lukewestby$elm_http_builder$HttpBuilder$options = _lukewestby$elm_http_builder$HttpBuilder$requestWithMethodAndUrl('OPTIONS');
var _lukewestby$elm_http_builder$HttpBuilder$trace = _lukewestby$elm_http_builder$HttpBuilder$requestWithMethodAndUrl('TRACE');
var _lukewestby$elm_http_builder$HttpBuilder$head = _lukewestby$elm_http_builder$HttpBuilder$requestWithMethodAndUrl('HEAD');
var _lukewestby$elm_http_builder$HttpBuilder$RequestBuilder = F9(
	function (a, b, c, d, e, f, g, h, i) {
		return {method: a, headers: b, url: c, body: d, expect: e, timeout: f, withCredentials: g, queryParams: h, cacheBuster: i};
	});


var _sporto$erl$Erl_Query$getValuesForKey = function (key) {
	return function (_p0) {
		return A2(
			_elm_lang$core$List$map,
			_elm_lang$core$Tuple$second,
			A2(
				_elm_lang$core$List$filter,
				function (_p1) {
					var _p2 = _p1;
					return _elm_lang$core$Native_Utils.eq(_p2._0, key);
				},
				_p0));
	};
};
var _sporto$erl$Erl_Query$remove = F2(
	function (key, query) {
		return A2(
			_elm_lang$core$List$filter,
			function (_p3) {
				var _p4 = _p3;
				return !_elm_lang$core$Native_Utils.eq(_p4._0, key);
			},
			query);
	});
var _sporto$erl$Erl_Query$add = F2(
	function (key, val) {
		return function (_p5) {
			return _elm_lang$core$List$reverse(
				A2(
					F2(
						function (x, y) {
							return {ctor: '::', _0: x, _1: y};
						}),
					{ctor: '_Tuple2', _0: key, _1: val},
					_elm_lang$core$List$reverse(_p5)));
		};
	});
var _sporto$erl$Erl_Query$set = F3(
	function (key, val, query) {
		var without = A2(_sporto$erl$Erl_Query$remove, key, query);
		return A3(_sporto$erl$Erl_Query$add, key, val, without);
	});
var _sporto$erl$Erl_Query$toString = function (query) {
	var encodedTuples = A2(
		_elm_lang$core$List$map,
		function (_p6) {
			var _p7 = _p6;
			return {
				ctor: '_Tuple2',
				_0: _elm_lang$http$Http$encodeUri(_p7._0),
				_1: _elm_lang$http$Http$encodeUri(_p7._1)
			};
		},
		query);
	var parts = A2(
		_elm_lang$core$List$map,
		function (_p8) {
			var _p9 = _p8;
			return A2(
				_elm_lang$core$Basics_ops['++'],
				_p9._0,
				A2(_elm_lang$core$Basics_ops['++'], '=', _p9._1));
		},
		encodedTuples);
	return _elm_lang$core$List$isEmpty(query) ? '' : A2(
		_elm_lang$core$Basics_ops['++'],
		'?',
		A2(_elm_lang$core$String$join, '&', parts));
};
var _sporto$erl$Erl_Query$queryStringElementToTuple = function (element) {
	var splitted = A2(_elm_lang$core$String$split, '=', element);
	var first = A2(
		_elm_lang$core$Maybe$withDefault,
		'',
		_elm_lang$core$List$head(splitted));
	var firstDecoded = A2(
		_elm_lang$core$Maybe$withDefault,
		'',
		_elm_lang$http$Http$decodeUri(first));
	var second = A2(
		_elm_lang$core$Maybe$withDefault,
		'',
		_elm_lang$core$List$head(
			A2(_elm_lang$core$List$drop, 1, splitted)));
	var secondDecoded = A2(
		_elm_lang$core$Maybe$withDefault,
		'',
		_elm_lang$http$Http$decodeUri(second));
	return {ctor: '_Tuple2', _0: firstDecoded, _1: secondDecoded};
};
var _sporto$erl$Erl_Query$parse = function (queryString) {
	var trimmed = A2(
		_elm_lang$core$String$join,
		'',
		A2(_elm_lang$core$String$split, '?', queryString));
	var splitted = A2(_elm_lang$core$String$split, '&', trimmed);
	return _elm_lang$core$String$isEmpty(trimmed) ? {ctor: '[]'} : A2(_elm_lang$core$List$map, _sporto$erl$Erl_Query$queryStringElementToTuple, splitted);
};

var _sporto$erl$Erl$appendPathSegments = F2(
	function (segments, url) {
		var newPath = A2(_elm_lang$core$List$append, url.path, segments);
		return _elm_lang$core$Native_Utils.update(
			url,
			{path: newPath});
	});
var _sporto$erl$Erl$getQueryValuesForKey = F2(
	function (key, url) {
		return A2(_sporto$erl$Erl_Query$getValuesForKey, key, url.query);
	});
var _sporto$erl$Erl$removeQuery = F2(
	function (key, url) {
		return _elm_lang$core$Native_Utils.update(
			url,
			{
				query: A2(_sporto$erl$Erl_Query$remove, key, url.query)
			});
	});
var _sporto$erl$Erl$setQuery = F3(
	function (key, val, url) {
		return _elm_lang$core$Native_Utils.update(
			url,
			{
				query: A3(_sporto$erl$Erl_Query$set, key, val, url.query)
			});
	});
var _sporto$erl$Erl$addQuery = F3(
	function (key, val, url) {
		return _elm_lang$core$Native_Utils.update(
			url,
			{
				query: A3(_sporto$erl$Erl_Query$add, key, val, url.query)
			});
	});
var _sporto$erl$Erl$clearQuery = function (url) {
	return _elm_lang$core$Native_Utils.update(
		url,
		{
			query: {ctor: '[]'}
		});
};
var _sporto$erl$Erl$new = {
	protocol: '',
	username: '',
	password: '',
	host: {ctor: '[]'},
	path: {ctor: '[]'},
	hasLeadingSlash: false,
	hasTrailingSlash: false,
	port_: 0,
	hash: '',
	query: {ctor: '[]'}
};
var _sporto$erl$Erl$hashToString = function (url) {
	return _elm_lang$core$String$isEmpty(url.hash) ? '' : A2(_elm_lang$core$Basics_ops['++'], '#', url.hash);
};
var _sporto$erl$Erl$trailingSlashComponent = function (url) {
	return _elm_lang$core$Native_Utils.eq(url.hasTrailingSlash, true) ? '/' : '';
};
var _sporto$erl$Erl$portComponent = function (url) {
	var _p0 = url.port_;
	switch (_p0) {
		case 0:
			return '';
		case 80:
			return '';
		default:
			return A2(
				_elm_lang$core$Basics_ops['++'],
				':',
				_elm_lang$core$Basics$toString(url.port_));
	}
};
var _sporto$erl$Erl$hostComponent = function (url) {
	return _elm_lang$http$Http$encodeUri(
		A2(_elm_lang$core$String$join, '.', url.host));
};
var _sporto$erl$Erl$pathComponent = function (url) {
	var leadingSlash = ((!_elm_lang$core$Native_Utils.eq(
		_sporto$erl$Erl$hostComponent(url),
		'')) || url.hasLeadingSlash) ? '/' : '';
	var encoded = A2(_elm_lang$core$List$map, _elm_lang$http$Http$encodeUri, url.path);
	return _elm_lang$core$Native_Utils.eq(
		_elm_lang$core$List$length(url.path),
		0) ? '' : A2(
		_elm_lang$core$Basics_ops['++'],
		leadingSlash,
		A2(_elm_lang$core$String$join, '/', encoded));
};
var _sporto$erl$Erl$protocolComponent = function (url) {
	var _p1 = url.protocol;
	if (_p1 === '') {
		return '';
	} else {
		return A2(_elm_lang$core$Basics_ops['++'], url.protocol, '://');
	}
};
var _sporto$erl$Erl$queryToString = function (_p2) {
	return _sporto$erl$Erl_Query$toString(
		function (_) {
			return _.query;
		}(_p2));
};
var _sporto$erl$Erl$toAbsoluteString = function (url) {
	var hash = _sporto$erl$Erl$hashToString(url);
	var query_ = _sporto$erl$Erl$queryToString(url);
	var trailingSlash_ = _sporto$erl$Erl$trailingSlashComponent(url);
	var path_ = _sporto$erl$Erl$pathComponent(url);
	return A2(
		_elm_lang$core$Basics_ops['++'],
		path_,
		A2(
			_elm_lang$core$Basics_ops['++'],
			trailingSlash_,
			A2(_elm_lang$core$Basics_ops['++'], query_, hash)));
};
var _sporto$erl$Erl$toString = function (url) {
	var port_ = _sporto$erl$Erl$portComponent(url);
	var host_ = _sporto$erl$Erl$hostComponent(url);
	var protocol_ = _sporto$erl$Erl$protocolComponent(url);
	return A2(
		_elm_lang$core$Basics_ops['++'],
		protocol_,
		A2(
			_elm_lang$core$Basics_ops['++'],
			host_,
			A2(
				_elm_lang$core$Basics_ops['++'],
				port_,
				_sporto$erl$Erl$toAbsoluteString(url))));
};
var _sporto$erl$Erl$parseQuery = _sporto$erl$Erl_Query$parse;
var _sporto$erl$Erl$extractQuery = function (str) {
	var query = A2(
		_elm_lang$core$Maybe$withDefault,
		'',
		_elm_lang$core$List$head(
			A2(
				_elm_lang$core$String$split,
				'#',
				A2(
					_elm_lang$core$Maybe$withDefault,
					'',
					_elm_lang$core$List$head(
						A2(
							_elm_lang$core$List$drop,
							1,
							A2(_elm_lang$core$String$split, '?', str)))))));
	return _elm_lang$core$String$isEmpty(query) ? '' : A2(_elm_lang$core$Basics_ops['++'], '?', query);
};
var _sporto$erl$Erl$queryFromAll = function (all) {
	return _sporto$erl$Erl$parseQuery(
		_sporto$erl$Erl$extractQuery(all));
};
var _sporto$erl$Erl$extractHash = function (str) {
	return A2(
		_elm_lang$core$Maybe$withDefault,
		'',
		_elm_lang$core$List$head(
			A2(
				_elm_lang$core$List$drop,
				1,
				A2(_elm_lang$core$String$split, '#', str))));
};
var _sporto$erl$Erl$hashFromAll = function (str) {
	return _sporto$erl$Erl$extractHash(str);
};
var _sporto$erl$Erl$parseHost = function (str) {
	return A2(_elm_lang$core$String$split, '.', str);
};
var _sporto$erl$Erl$schemeHostDelim = function (str) {
	return A2(_elm_lang$core$String$startsWith, '//', str) ? _elm_lang$core$Maybe$Just('//') : (A2(_elm_lang$core$String$contains, '://', str) ? _elm_lang$core$Maybe$Just('://') : _elm_lang$core$Maybe$Nothing);
};
var _sporto$erl$Erl$extractProtocol = function (str) {
	var parts = A2(_elm_lang$core$String$split, '://', str);
	var _p3 = _elm_lang$core$List$length(parts);
	if (_p3 === 1) {
		return '';
	} else {
		return A2(
			_elm_lang$core$Maybe$withDefault,
			'',
			_elm_lang$core$List$head(parts));
	}
};
var _sporto$erl$Erl$extractPort = function (str) {
	var rx = _elm_lang$core$Regex$regex(':\\d+');
	var res = A3(
		_elm_lang$core$Regex$find,
		_elm_lang$core$Regex$AtMost(1),
		rx,
		str);
	return function (result) {
		var _p4 = result;
		if (_p4.ctor === 'Ok') {
			return _p4._0;
		} else {
			var _p5 = _sporto$erl$Erl$extractProtocol(str);
			switch (_p5) {
				case 'http':
					return 80;
				case 'https':
					return 443;
				case 'ftp':
					return 21;
				case 'sftp':
					return 22;
				default:
					return 0;
			}
		}
	}(
		_elm_lang$core$String$toInt(
			A2(
				_elm_lang$core$String$dropLeft,
				1,
				A2(
					_elm_lang$core$Maybe$withDefault,
					'',
					_elm_lang$core$List$head(
						A2(
							_elm_lang$core$List$map,
							function (_) {
								return _.match;
							},
							res))))));
};
var _sporto$erl$Erl$leftFrom = F2(
	function (delimiter, str) {
		var parts = A2(_elm_lang$core$String$split, delimiter, str);
		var head = _elm_lang$core$List$head(parts);
		var _p6 = _elm_lang$core$List$length(parts);
		switch (_p6) {
			case 0:
				return '';
			case 1:
				return '';
			default:
				return A2(_elm_lang$core$Maybe$withDefault, '', head);
		}
	});
var _sporto$erl$Erl$leftFromOrSame = F2(
	function (delimiter, str) {
		var parts = A2(_elm_lang$core$String$split, delimiter, str);
		return A2(
			_elm_lang$core$Maybe$withDefault,
			'',
			_elm_lang$core$List$head(parts));
	});
var _sporto$erl$Erl$rightFromOrSame = F2(
	function (delimiter, str) {
		var parts = A2(_elm_lang$core$String$split, delimiter, str);
		return A2(
			_elm_lang$core$Maybe$withDefault,
			'',
			_elm_lang$core$List$head(
				_elm_lang$core$List$reverse(parts)));
	});
var _sporto$erl$Erl$rightFromLeftMost = F2(
	function (delimiter, str) {
		var parts = A2(_elm_lang$core$String$split, delimiter, str);
		var _p7 = _elm_lang$core$List$length(parts);
		switch (_p7) {
			case 0:
				return '';
			case 1:
				return '';
			default:
				return A2(
					_elm_lang$core$String$join,
					delimiter,
					A2(
						_elm_lang$core$Maybe$withDefault,
						{ctor: '[]'},
						_elm_lang$core$List$tail(parts)));
		}
	});
var _sporto$erl$Erl$extractHost = function (str) {
	var delim = _sporto$erl$Erl$schemeHostDelim(str);
	var _p8 = delim;
	if (_p8.ctor === 'Just') {
		return A2(
			_sporto$erl$Erl$leftFromOrSame,
			':',
			A2(
				_sporto$erl$Erl$leftFromOrSame,
				'/',
				A2(_sporto$erl$Erl$rightFromLeftMost, _p8._0, str)));
	} else {
		var rx = '((\\w|-)+\\.)+(\\w|-)+';
		return A2(
			_elm_lang$core$Maybe$withDefault,
			'',
			_elm_lang$core$List$head(
				A2(
					_elm_lang$core$List$map,
					function (_) {
						return _.match;
					},
					A3(
						_elm_lang$core$Regex$find,
						_elm_lang$core$Regex$AtMost(1),
						_elm_lang$core$Regex$regex(rx),
						A2(_sporto$erl$Erl$leftFromOrSame, '/', str)))));
	}
};
var _sporto$erl$Erl$host = function (str) {
	return _sporto$erl$Erl$parseHost(
		_sporto$erl$Erl$extractHost(str));
};
var _sporto$erl$Erl$extractPath = function (str) {
	var delim = _sporto$erl$Erl$schemeHostDelim(str);
	var trimmed = function () {
		var _p9 = delim;
		if (_p9.ctor === 'Just') {
			return A2(_sporto$erl$Erl$rightFromLeftMost, _p9._0, str);
		} else {
			return str;
		}
	}();
	var host = _sporto$erl$Erl$extractHost(str);
	return A4(
		_elm_lang$core$Regex$replace,
		_elm_lang$core$Regex$AtMost(1),
		_elm_lang$core$Regex$regex(
			A2(
				_elm_lang$core$Basics_ops['++'],
				'^.*?',
				A2(
					_elm_lang$core$Basics_ops['++'],
					_elm_lang$core$Regex$escape(host),
					'(:\\d+)?'))),
		function (_p10) {
			return '';
		},
		A2(
			_sporto$erl$Erl$leftFromOrSame,
			'#',
			A2(_sporto$erl$Erl$leftFromOrSame, '?', trimmed)));
};
var _sporto$erl$Erl$hasLeadingSlashFromAll = function (str) {
	return A2(
		_elm_lang$core$Regex$contains,
		_elm_lang$core$Regex$regex('^/'),
		_sporto$erl$Erl$extractPath(str));
};
var _sporto$erl$Erl$hasTrailingSlashFromAll = function (str) {
	return A2(
		_elm_lang$core$Regex$contains,
		_elm_lang$core$Regex$regex('/$'),
		_sporto$erl$Erl$extractPath(str));
};
var _sporto$erl$Erl$rightFrom = F2(
	function (delimiter, str) {
		var parts = A2(_elm_lang$core$String$split, delimiter, str);
		var _p11 = _elm_lang$core$List$length(parts);
		switch (_p11) {
			case 0:
				return '';
			case 1:
				return '';
			default:
				return A2(
					_elm_lang$core$Maybe$withDefault,
					'',
					_elm_lang$core$List$head(
						_elm_lang$core$List$reverse(parts)));
		}
	});
var _sporto$erl$Erl$notEmpty = function (str) {
	return !_elm_lang$core$String$isEmpty(str);
};
var _sporto$erl$Erl$parsePath = function (str) {
	return A2(
		_elm_lang$core$List$map,
		_elm_lang$core$Maybe$withDefault(''),
		A2(
			_elm_lang$core$List$map,
			_elm_lang$http$Http$decodeUri,
			A2(
				_elm_lang$core$List$filter,
				_sporto$erl$Erl$notEmpty,
				A2(_elm_lang$core$String$split, '/', str))));
};
var _sporto$erl$Erl$pathFromAll = function (str) {
	return _sporto$erl$Erl$parsePath(
		_sporto$erl$Erl$extractPath(str));
};
var _sporto$erl$Erl$parse = function (str) {
	return {
		host: _sporto$erl$Erl$host(str),
		hash: _sporto$erl$Erl$hashFromAll(str),
		password: '',
		path: _sporto$erl$Erl$pathFromAll(str),
		hasLeadingSlash: _sporto$erl$Erl$hasLeadingSlashFromAll(str),
		hasTrailingSlash: _sporto$erl$Erl$hasTrailingSlashFromAll(str),
		port_: _sporto$erl$Erl$extractPort(str),
		protocol: _sporto$erl$Erl$extractProtocol(str),
		query: _sporto$erl$Erl$queryFromAll(str),
		username: ''
	};
};
var _sporto$erl$Erl$Url = function (a) {
	return function (b) {
		return function (c) {
			return function (d) {
				return function (e) {
					return function (f) {
						return function (g) {
							return function (h) {
								return function (i) {
									return function (j) {
										return {protocol: a, username: b, password: c, host: d, port_: e, path: f, hasLeadingSlash: g, hasTrailingSlash: h, hash: i, query: j};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};

var _rgrempel$elm_route_url$RouteUrl$url2path = function (url) {
	return A2(
		_elm_lang$core$Basics_ops['++'],
		'/',
		A2(
			_elm_lang$core$Basics_ops['++'],
			A2(_elm_lang$core$String$join, '/', url.path),
			(url.hasTrailingSlash && (!_elm_lang$core$List$isEmpty(url.path))) ? '/' : ''));
};
var _rgrempel$elm_route_url$RouteUrl$eqUrl = F2(
	function (u1, u2) {
		return _elm_lang$core$Native_Utils.eq(u1.path, u2.path) && (_elm_lang$core$Native_Utils.eq(u1.hasTrailingSlash, u2.hasTrailingSlash) && (_elm_lang$core$Native_Utils.eq(u1.hash, u2.hash) && _elm_lang$core$Native_Utils.eq(u1.query, u2.query)));
	});
var _rgrempel$elm_route_url$RouteUrl$checkDistinctUrl = F2(
	function (old, $new) {
		return A2(
			_rgrempel$elm_route_url$RouteUrl$eqUrl,
			_sporto$erl$Erl$parse($new.url),
			old) ? _elm_lang$core$Maybe$Nothing : _elm_lang$core$Maybe$Just($new);
	});
var _rgrempel$elm_route_url$RouteUrl$mapUrl = F2(
	function (func, c1) {
		return _elm_lang$core$Native_Utils.update(
			c1,
			{
				url: func(c1.url)
			});
	});
var _rgrempel$elm_route_url$RouteUrl$normalizeUrl = F2(
	function (old, change) {
		return A2(
			_rgrempel$elm_route_url$RouteUrl$mapUrl,
			A2(_elm_lang$core$String$startsWith, '?', change.url) ? function (url) {
				return A2(
					_elm_lang$core$Basics_ops['++'],
					_rgrempel$elm_route_url$RouteUrl$url2path(old),
					url);
			} : (A2(_elm_lang$core$String$startsWith, '#', change.url) ? function (url) {
				return A2(
					_elm_lang$core$Basics_ops['++'],
					_rgrempel$elm_route_url$RouteUrl$url2path(old),
					A2(
						_elm_lang$core$Basics_ops['++'],
						_sporto$erl$Erl$queryToString(old),
						url));
			} : function (url) {
				return url;
			}),
			change);
	});
var _rgrempel$elm_route_url$RouteUrl$urlChange2Cmd = function (change) {
	return function () {
		var _p0 = change.entry;
		if (_p0.ctor === 'NewEntry') {
			return _elm_lang$navigation$Navigation$newUrl;
		} else {
			return _elm_lang$navigation$Navigation$modifyUrl;
		}
	}()(change.url);
};
var _rgrempel$elm_route_url$RouteUrl$runNavigationAppWithFlags = function (app) {
	return A2(
		_elm_lang$navigation$Navigation$programWithFlags,
		app.locationToMessage,
		{init: app.init, update: app.update, view: app.view, subscriptions: app.subscriptions});
};
var _rgrempel$elm_route_url$RouteUrl$runNavigationApp = function (app) {
	return A2(
		_elm_lang$navigation$Navigation$program,
		app.locationToMessage,
		{init: app.init, update: app.update, view: app.view, subscriptions: app.subscriptions});
};
var _rgrempel$elm_route_url$RouteUrl$unwrapMsg = F3(
	function (handleLocation, handleUserMsg, wrapped) {
		var _p1 = wrapped;
		if (_p1.ctor === 'RouterMsg') {
			return handleLocation(_p1._0);
		} else {
			return handleUserMsg(_p1._0);
		}
	});
var _rgrempel$elm_route_url$RouteUrl$unwrapModel = function (_p2) {
	var _p3 = _p2;
	return _p3._0;
};
var _rgrempel$elm_route_url$RouteUrl$appWithFlags2Common = function (app) {
	return {delta2url: app.delta2url, location2messages: app.location2messages, update: app.update, subscriptions: app.subscriptions, view: app.view};
};
var _rgrempel$elm_route_url$RouteUrl$app2Common = function (app) {
	return {delta2url: app.delta2url, location2messages: app.location2messages, update: app.update, subscriptions: app.subscriptions, view: app.view};
};
var _rgrempel$elm_route_url$RouteUrl$App = F6(
	function (a, b, c, d, e, f) {
		return {delta2url: a, location2messages: b, init: c, update: d, subscriptions: e, view: f};
	});
var _rgrempel$elm_route_url$RouteUrl$AppWithFlags = F6(
	function (a, b, c, d, e, f) {
		return {delta2url: a, location2messages: b, init: c, update: d, subscriptions: e, view: f};
	});
var _rgrempel$elm_route_url$RouteUrl$AppCommon = F5(
	function (a, b, c, d, e) {
		return {delta2url: a, location2messages: b, update: c, subscriptions: d, view: e};
	});
var _rgrempel$elm_route_url$RouteUrl$UrlChange = F2(
	function (a, b) {
		return {entry: a, url: b};
	});
var _rgrempel$elm_route_url$RouteUrl$RouterModel = F2(
	function (a, b) {
		return {reportedUrl: a, expectedUrlChanges: b};
	});
var _rgrempel$elm_route_url$RouteUrl$NavigationApp = F5(
	function (a, b, c, d, e) {
		return {locationToMessage: a, init: b, update: c, view: d, subscriptions: e};
	});
var _rgrempel$elm_route_url$RouteUrl$NavigationAppWithFlags = F5(
	function (a, b, c, d, e) {
		return {locationToMessage: a, init: b, update: c, view: d, subscriptions: e};
	});
var _rgrempel$elm_route_url$RouteUrl$ModifyEntry = {ctor: 'ModifyEntry'};
var _rgrempel$elm_route_url$RouteUrl$NewEntry = {ctor: 'NewEntry'};
var _rgrempel$elm_route_url$RouteUrl$WrappedModel = F2(
	function (a, b) {
		return {ctor: 'WrappedModel', _0: a, _1: b};
	});
var _rgrempel$elm_route_url$RouteUrl$mapModel = F2(
	function (mapper, _p4) {
		var _p5 = _p4;
		return A2(
			_rgrempel$elm_route_url$RouteUrl$WrappedModel,
			mapper(_p5._0),
			_p5._1);
	});
var _rgrempel$elm_route_url$RouteUrl$UserMsg = function (a) {
	return {ctor: 'UserMsg', _0: a};
};
var _rgrempel$elm_route_url$RouteUrl$wrapUserMsg = _rgrempel$elm_route_url$RouteUrl$UserMsg;
var _rgrempel$elm_route_url$RouteUrl$view = F2(
	function (app, _p6) {
		var _p7 = _p6;
		return A2(
			_elm_lang$html$Html$map,
			_rgrempel$elm_route_url$RouteUrl$UserMsg,
			app.view(_p7._0));
	});
var _rgrempel$elm_route_url$RouteUrl$subscriptions = F2(
	function (app, _p8) {
		var _p9 = _p8;
		return A2(
			_elm_lang$core$Platform_Sub$map,
			_rgrempel$elm_route_url$RouteUrl$UserMsg,
			app.subscriptions(_p9._0));
	});
var _rgrempel$elm_route_url$RouteUrl$initWithFlags = F4(
	function (appInit, app, flags, location) {
		var routerModel = {
			expectedUrlChanges: 0,
			reportedUrl: _sporto$erl$Erl$parse(location.href)
		};
		var _p10 = A3(
			_ccapndave$elm_update_extra$Update_Extra$sequence,
			app.update,
			app.location2messages(location),
			appInit(flags));
		var userModel = _p10._0;
		var command = _p10._1;
		return {
			ctor: '_Tuple2',
			_0: A2(_rgrempel$elm_route_url$RouteUrl$WrappedModel, userModel, routerModel),
			_1: A2(_elm_lang$core$Platform_Cmd$map, _rgrempel$elm_route_url$RouteUrl$UserMsg, command)
		};
	});
var _rgrempel$elm_route_url$RouteUrl$init = F3(
	function (appInit, app, location) {
		var routerModel = {
			expectedUrlChanges: 0,
			reportedUrl: _sporto$erl$Erl$parse(location.href)
		};
		var _p11 = A3(
			_ccapndave$elm_update_extra$Update_Extra$sequence,
			app.update,
			app.location2messages(location),
			appInit);
		var userModel = _p11._0;
		var command = _p11._1;
		return {
			ctor: '_Tuple2',
			_0: A2(_rgrempel$elm_route_url$RouteUrl$WrappedModel, userModel, routerModel),
			_1: A2(_elm_lang$core$Platform_Cmd$map, _rgrempel$elm_route_url$RouteUrl$UserMsg, command)
		};
	});
var _rgrempel$elm_route_url$RouteUrl$update = F3(
	function (app, msg, _p12) {
		var _p13 = _p12;
		var _p21 = _p13._0;
		var _p20 = _p13._1;
		var _p14 = msg;
		if (_p14.ctor === 'RouterMsg') {
			var _p16 = _p14._0;
			var newRouterModel = {
				reportedUrl: _sporto$erl$Erl$parse(_p16.href),
				expectedUrlChanges: (_elm_lang$core$Native_Utils.cmp(_p20.expectedUrlChanges, 0) > 0) ? (_p20.expectedUrlChanges - 1) : 0
			};
			if (_elm_lang$core$Native_Utils.cmp(_p20.expectedUrlChanges, 0) > 0) {
				return {
					ctor: '_Tuple2',
					_0: A2(_rgrempel$elm_route_url$RouteUrl$WrappedModel, _p21, newRouterModel),
					_1: _elm_lang$core$Platform_Cmd$none
				};
			} else {
				var _p15 = A3(
					_ccapndave$elm_update_extra$Update_Extra$sequence,
					app.update,
					app.location2messages(_p16),
					{ctor: '_Tuple2', _0: _p21, _1: _elm_lang$core$Platform_Cmd$none});
				var newUserModel = _p15._0;
				var commands = _p15._1;
				return {
					ctor: '_Tuple2',
					_0: A2(_rgrempel$elm_route_url$RouteUrl$WrappedModel, newUserModel, newRouterModel),
					_1: A2(_elm_lang$core$Platform_Cmd$map, _rgrempel$elm_route_url$RouteUrl$UserMsg, commands)
				};
			}
		} else {
			var _p17 = A2(app.update, _p14._0, _p21);
			var newUserModel = _p17._0;
			var userCommand = _p17._1;
			var maybeUrlChange = A2(
				_elm_lang$core$Maybe$andThen,
				_rgrempel$elm_route_url$RouteUrl$checkDistinctUrl(_p20.reportedUrl),
				A2(
					_elm_lang$core$Maybe$map,
					_rgrempel$elm_route_url$RouteUrl$normalizeUrl(_p20.reportedUrl),
					A2(app.delta2url, _p21, newUserModel)));
			var _p18 = maybeUrlChange;
			if (_p18.ctor === 'Just') {
				var _p19 = _p18._0;
				return {
					ctor: '_Tuple2',
					_0: A2(
						_rgrempel$elm_route_url$RouteUrl$WrappedModel,
						newUserModel,
						{
							reportedUrl: _sporto$erl$Erl$parse(_p19.url),
							expectedUrlChanges: _p20.expectedUrlChanges + 1
						}),
					_1: A2(
						_elm_lang$core$Platform_Cmd$map,
						_rgrempel$elm_route_url$RouteUrl$UserMsg,
						_elm_lang$core$Platform_Cmd$batch(
							{
								ctor: '::',
								_0: _rgrempel$elm_route_url$RouteUrl$urlChange2Cmd(_p19),
								_1: {
									ctor: '::',
									_0: userCommand,
									_1: {ctor: '[]'}
								}
							}))
				};
			} else {
				return {
					ctor: '_Tuple2',
					_0: A2(_rgrempel$elm_route_url$RouteUrl$WrappedModel, newUserModel, _p20),
					_1: A2(_elm_lang$core$Platform_Cmd$map, _rgrempel$elm_route_url$RouteUrl$UserMsg, userCommand)
				};
			}
		}
	});
var _rgrempel$elm_route_url$RouteUrl$RouterMsg = function (a) {
	return {ctor: 'RouterMsg', _0: a};
};
var _rgrempel$elm_route_url$RouteUrl$wrapLocation = _rgrempel$elm_route_url$RouteUrl$RouterMsg;
var _rgrempel$elm_route_url$RouteUrl$navigationApp = function (app) {
	var common = _rgrempel$elm_route_url$RouteUrl$app2Common(app);
	return {
		locationToMessage: _rgrempel$elm_route_url$RouteUrl$RouterMsg,
		init: A2(_rgrempel$elm_route_url$RouteUrl$init, app.init, common),
		update: _rgrempel$elm_route_url$RouteUrl$update(common),
		view: _rgrempel$elm_route_url$RouteUrl$view(common),
		subscriptions: _rgrempel$elm_route_url$RouteUrl$subscriptions(common)
	};
};
var _rgrempel$elm_route_url$RouteUrl$program = function (_p22) {
	return _rgrempel$elm_route_url$RouteUrl$runNavigationApp(
		_rgrempel$elm_route_url$RouteUrl$navigationApp(_p22));
};
var _rgrempel$elm_route_url$RouteUrl$navigationAppWithFlags = function (app) {
	var common = _rgrempel$elm_route_url$RouteUrl$appWithFlags2Common(app);
	return {
		locationToMessage: _rgrempel$elm_route_url$RouteUrl$RouterMsg,
		init: A2(_rgrempel$elm_route_url$RouteUrl$initWithFlags, app.init, common),
		update: _rgrempel$elm_route_url$RouteUrl$update(common),
		view: _rgrempel$elm_route_url$RouteUrl$view(common),
		subscriptions: _rgrempel$elm_route_url$RouteUrl$subscriptions(common)
	};
};
var _rgrempel$elm_route_url$RouteUrl$programWithFlags = function (_p23) {
	return _rgrempel$elm_route_url$RouteUrl$runNavigationAppWithFlags(
		_rgrempel$elm_route_url$RouteUrl$navigationAppWithFlags(_p23));
};

var _rgrempel$elm_route_url$RouteUrl_Builder$toChange = F2(
	function (stuffIntoHash, _p0) {
		var _p1 = _p0;
		var _p4 = _p1._0;
		var hashPrefix = stuffIntoHash ? '$' : '#';
		var formattedHash = _elm_lang$core$Native_Utils.eq(_p4.hash, '') ? '' : A2(
			_elm_lang$core$Basics_ops['++'],
			hashPrefix,
			_elm_lang$http$Http$encodeUri(_p4.hash));
		var eachQuery = function (_p2) {
			var _p3 = _p2;
			return A2(
				_elm_lang$core$Basics_ops['++'],
				_elm_lang$http$Http$encodeUri(_p3._0),
				A2(
					_elm_lang$core$Basics_ops['++'],
					'=',
					_elm_lang$http$Http$encodeUri(_p3._1)));
		};
		var joinedPath = A2(
			_elm_lang$core$String$join,
			'/',
			A2(_elm_lang$core$List$map, _elm_lang$http$Http$encodeUri, _p4.path));
		var queryPrefix = stuffIntoHash ? '^' : '?';
		var joinedQuery = _elm_lang$core$List$isEmpty(_p4.query) ? '' : A2(
			_elm_lang$core$Basics_ops['++'],
			queryPrefix,
			A2(
				_elm_lang$core$String$join,
				'&',
				A2(_elm_lang$core$List$map, eachQuery, _p4.query)));
		var prefix = stuffIntoHash ? '#!/' : '/';
		return {
			entry: _p4.entry,
			url: A2(
				_elm_lang$core$Basics_ops['++'],
				prefix,
				A2(
					_elm_lang$core$Basics_ops['++'],
					joinedPath,
					A2(_elm_lang$core$Basics_ops['++'], joinedQuery, formattedHash)))
		};
	});
var _rgrempel$elm_route_url$RouteUrl_Builder$toUrlChange = _rgrempel$elm_route_url$RouteUrl_Builder$toChange(false);
var _rgrempel$elm_route_url$RouteUrl_Builder$toHashChange = _rgrempel$elm_route_url$RouteUrl_Builder$toChange(true);
var _rgrempel$elm_route_url$RouteUrl_Builder$hash = function (_p5) {
	var _p6 = _p5;
	return _p6._0.hash;
};
var _rgrempel$elm_route_url$RouteUrl_Builder$getQuery = F2(
	function (key, _p7) {
		var _p8 = _p7;
		return A2(
			_elm_lang$core$List$filterMap,
			function (_p9) {
				var _p10 = _p9;
				return _elm_lang$core$Native_Utils.eq(_p10._0, key) ? _elm_lang$core$Maybe$Just(_p10._1) : _elm_lang$core$Maybe$Nothing;
			},
			_p8._0.query);
	});
var _rgrempel$elm_route_url$RouteUrl_Builder$query = function (_p11) {
	var _p12 = _p11;
	return _p12._0.query;
};
var _rgrempel$elm_route_url$RouteUrl_Builder$path = function (_p13) {
	var _p14 = _p13;
	return _p14._0.path;
};
var _rgrempel$elm_route_url$RouteUrl_Builder$entry = function (_p15) {
	var _p16 = _p15;
	return _p16._0.entry;
};
var _rgrempel$elm_route_url$RouteUrl_Builder$Builder = function (a) {
	return {ctor: 'Builder', _0: a};
};
var _rgrempel$elm_route_url$RouteUrl_Builder$builder = _rgrempel$elm_route_url$RouteUrl_Builder$Builder(
	{
		entry: _rgrempel$elm_route_url$RouteUrl$NewEntry,
		path: {ctor: '[]'},
		query: {ctor: '[]'},
		hash: ''
	});
var _rgrempel$elm_route_url$RouteUrl_Builder$newEntry = function (_p17) {
	var _p18 = _p17;
	return _rgrempel$elm_route_url$RouteUrl_Builder$Builder(
		_elm_lang$core$Native_Utils.update(
			_p18._0,
			{entry: _rgrempel$elm_route_url$RouteUrl$NewEntry}));
};
var _rgrempel$elm_route_url$RouteUrl_Builder$modifyEntry = function (_p19) {
	var _p20 = _p19;
	return _rgrempel$elm_route_url$RouteUrl_Builder$Builder(
		_elm_lang$core$Native_Utils.update(
			_p20._0,
			{entry: _rgrempel$elm_route_url$RouteUrl$ModifyEntry}));
};
var _rgrempel$elm_route_url$RouteUrl_Builder$modifyPath = F2(
	function (func, _p21) {
		var _p22 = _p21;
		var _p23 = _p22._0;
		return _rgrempel$elm_route_url$RouteUrl_Builder$Builder(
			_elm_lang$core$Native_Utils.update(
				_p23,
				{
					path: func(_p23.path)
				}));
	});
var _rgrempel$elm_route_url$RouteUrl_Builder$prependToPath = function (_p24) {
	return _rgrempel$elm_route_url$RouteUrl_Builder$modifyPath(
		_elm_lang$core$List$append(_p24));
};
var _rgrempel$elm_route_url$RouteUrl_Builder$appendToPath = function (_p25) {
	return _rgrempel$elm_route_url$RouteUrl_Builder$modifyPath(
		A2(_elm_lang$core$Basics$flip, _elm_lang$core$List$append, _p25));
};
var _rgrempel$elm_route_url$RouteUrl_Builder$replacePath = F2(
	function (list, _p26) {
		var _p27 = _p26;
		return _rgrempel$elm_route_url$RouteUrl_Builder$Builder(
			_elm_lang$core$Native_Utils.update(
				_p27._0,
				{path: list}));
	});
var _rgrempel$elm_route_url$RouteUrl_Builder$modifyQuery = F2(
	function (func, _p28) {
		var _p29 = _p28;
		var _p30 = _p29._0;
		return _rgrempel$elm_route_url$RouteUrl_Builder$Builder(
			_elm_lang$core$Native_Utils.update(
				_p30,
				{
					query: func(_p30.query)
				}));
	});
var _rgrempel$elm_route_url$RouteUrl_Builder$insertQuery = F2(
	function (newKey, newValue) {
		return _rgrempel$elm_route_url$RouteUrl_Builder$modifyQuery(
			function (query) {
				return function (_p31) {
					var _p32 = _p31;
					var _p33 = _p32._0;
					return _p32._1 ? _elm_lang$core$List$reverse(_p33) : _elm_lang$core$List$reverse(
						{
							ctor: '::',
							_0: {ctor: '_Tuple2', _0: newKey, _1: newValue},
							_1: _p33
						});
				}(
					A3(
						_elm_lang$core$List$foldl,
						F2(
							function (_p35, _p34) {
								var _p36 = _p35;
								var _p40 = _p36._0;
								var _p37 = _p34;
								var _p39 = _p37._1;
								var _p38 = _p37._0;
								return _elm_lang$core$Native_Utils.eq(newKey, _p40) ? (_p39 ? {ctor: '_Tuple2', _0: _p38, _1: _p39} : {
									ctor: '_Tuple2',
									_0: {
										ctor: '::',
										_0: {ctor: '_Tuple2', _0: newKey, _1: newValue},
										_1: _p38
									},
									_1: true
								}) : {
									ctor: '_Tuple2',
									_0: {
										ctor: '::',
										_0: {ctor: '_Tuple2', _0: _p40, _1: _p36._1},
										_1: _p38
									},
									_1: _p39
								};
							}),
						{
							ctor: '_Tuple2',
							_0: {ctor: '[]'},
							_1: false
						},
						query));
			});
	});
var _rgrempel$elm_route_url$RouteUrl_Builder$addQuery = F2(
	function (key, value) {
		return _rgrempel$elm_route_url$RouteUrl_Builder$modifyQuery(
			function (query) {
				return _elm_lang$core$List$reverse(
					{
						ctor: '::',
						_0: {ctor: '_Tuple2', _0: key, _1: value},
						_1: _elm_lang$core$List$reverse(query)
					});
			});
	});
var _rgrempel$elm_route_url$RouteUrl_Builder$removeQuery = function (key) {
	return _rgrempel$elm_route_url$RouteUrl_Builder$modifyQuery(
		_elm_lang$core$List$filter(
			function (_p41) {
				var _p42 = _p41;
				return !_elm_lang$core$Native_Utils.eq(_p42._0, key);
			}));
};
var _rgrempel$elm_route_url$RouteUrl_Builder$replaceQuery = F2(
	function (query, _p43) {
		var _p44 = _p43;
		return _rgrempel$elm_route_url$RouteUrl_Builder$Builder(
			_elm_lang$core$Native_Utils.update(
				_p44._0,
				{query: query}));
	});
var _rgrempel$elm_route_url$RouteUrl_Builder$modifyHash = F2(
	function (func, _p45) {
		var _p46 = _p45;
		var _p47 = _p46._0;
		return _rgrempel$elm_route_url$RouteUrl_Builder$Builder(
			_elm_lang$core$Native_Utils.update(
				_p47,
				{
					hash: func(_p47.hash)
				}));
	});
var _rgrempel$elm_route_url$RouteUrl_Builder$replaceHash = F2(
	function (hash, _p48) {
		var _p49 = _p48;
		return _rgrempel$elm_route_url$RouteUrl_Builder$Builder(
			_elm_lang$core$Native_Utils.update(
				_p49._0,
				{hash: hash}));
	});
var _rgrempel$elm_route_url$RouteUrl_Builder$fromUrl = function (url) {
	var erl = _sporto$erl$Erl$parse(url);
	return _rgrempel$elm_route_url$RouteUrl_Builder$Builder(
		{
			entry: _rgrempel$elm_route_url$RouteUrl$NewEntry,
			path: erl.path,
			query: erl.query,
			hash: A2(
				_elm_lang$core$Maybe$withDefault,
				'',
				_elm_lang$http$Http$decodeUri(erl.hash))
		});
};
var _rgrempel$elm_route_url$RouteUrl_Builder$fromHash = function (url) {
	var unwrapped = _sporto$erl$Erl$parse(
		A4(
			_elm_lang$core$Regex$replace,
			_elm_lang$core$Regex$AtMost(1),
			_elm_lang$core$Regex$regex('\\^'),
			_elm_lang$core$Basics$always('?'),
			A4(
				_elm_lang$core$Regex$replace,
				_elm_lang$core$Regex$AtMost(1),
				_elm_lang$core$Regex$regex('$'),
				_elm_lang$core$Basics$always('#'),
				A4(
					_elm_lang$core$Regex$replace,
					_elm_lang$core$Regex$AtMost(1),
					_elm_lang$core$Regex$regex('^!'),
					_elm_lang$core$Basics$always(''),
					function (_) {
						return _.hash;
					}(
						_sporto$erl$Erl$parse(url))))));
	return _rgrempel$elm_route_url$RouteUrl_Builder$Builder(
		{entry: _rgrempel$elm_route_url$RouteUrl$NewEntry, path: unwrapped.path, query: unwrapped.query, hash: unwrapped.hash});
};

var _vito$cadet$GitHubGraph$customDecoder = F2(
	function (decoder, toResult) {
		return A2(
			_elm_lang$core$Json_Decode$andThen,
			function (a) {
				var _p0 = toResult(a);
				if (_p0.ctor === 'Ok') {
					return _elm_lang$core$Json_Decode$succeed(_p0._0);
				} else {
					return _elm_lang$core$Json_Decode$fail(_p0._0);
				}
			},
			decoder);
	});
var _vito$cadet$GitHubGraph$encodeOrgSelector = function (record) {
	return _elm_lang$core$Json_Encode$object(
		{
			ctor: '::',
			_0: {
				ctor: '_Tuple2',
				_0: 'name',
				_1: _elm_lang$core$Json_Encode$string(record.name)
			},
			_1: {ctor: '[]'}
		});
};
var _vito$cadet$GitHubGraph$encodeRepoSelector = function (record) {
	return _elm_lang$core$Json_Encode$object(
		{
			ctor: '::',
			_0: {
				ctor: '_Tuple2',
				_0: 'owner',
				_1: _elm_lang$core$Json_Encode$string(record.owner)
			},
			_1: {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'name',
					_1: _elm_lang$core$Json_Encode$string(record.name)
				},
				_1: {ctor: '[]'}
			}
		});
};
var _vito$cadet$GitHubGraph$encodeProjectColumnCard = function (record) {
	return _elm_lang$core$Json_Encode$object(
		{
			ctor: '::',
			_0: {
				ctor: '_Tuple2',
				_0: 'id',
				_1: _elm_lang$core$Json_Encode$string(record.id)
			},
			_1: {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'item_id',
					_1: A2(_elm_community$json_extra$Json_Encode_Extra$maybe, _elm_lang$core$Json_Encode$string, record.itemID)
				},
				_1: {
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'note',
						_1: A2(_elm_community$json_extra$Json_Encode_Extra$maybe, _elm_lang$core$Json_Encode$string, record.note)
					},
					_1: {ctor: '[]'}
				}
			}
		});
};
var _vito$cadet$GitHubGraph$encodeProjectColumn = function (record) {
	return _elm_lang$core$Json_Encode$object(
		{
			ctor: '::',
			_0: {
				ctor: '_Tuple2',
				_0: 'id',
				_1: _elm_lang$core$Json_Encode$string(record.id)
			},
			_1: {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'name',
					_1: _elm_lang$core$Json_Encode$string(record.name)
				},
				_1: {ctor: '[]'}
			}
		});
};
var _vito$cadet$GitHubGraph$encodeProjectLocation = function (record) {
	return _elm_lang$core$Json_Encode$object(
		{
			ctor: '::',
			_0: {
				ctor: '_Tuple2',
				_0: 'id',
				_1: _elm_lang$core$Json_Encode$string(record.id)
			},
			_1: {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'url',
					_1: _elm_lang$core$Json_Encode$string(record.url)
				},
				_1: {
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'name',
						_1: _elm_lang$core$Json_Encode$string(record.name)
					},
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'number',
							_1: _elm_lang$core$Json_Encode$int(record.number)
						},
						_1: {ctor: '[]'}
					}
				}
			}
		});
};
var _vito$cadet$GitHubGraph$encodeCardLocation = function (record) {
	return _elm_lang$core$Json_Encode$object(
		{
			ctor: '::',
			_0: {
				ctor: '_Tuple2',
				_0: 'id',
				_1: _elm_lang$core$Json_Encode$string(record.id)
			},
			_1: {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'project',
					_1: _vito$cadet$GitHubGraph$encodeProjectLocation(record.project)
				},
				_1: {
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'column',
						_1: A2(_elm_community$json_extra$Json_Encode_Extra$maybe, _vito$cadet$GitHubGraph$encodeProjectColumn, record.column)
					},
					_1: {ctor: '[]'}
				}
			}
		});
};
var _vito$cadet$GitHubGraph$encodeProject = function (record) {
	return _elm_lang$core$Json_Encode$object(
		{
			ctor: '::',
			_0: {
				ctor: '_Tuple2',
				_0: 'id',
				_1: _elm_lang$core$Json_Encode$string(record.id)
			},
			_1: {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'url',
					_1: _elm_lang$core$Json_Encode$string(record.url)
				},
				_1: {
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'name',
						_1: _elm_lang$core$Json_Encode$string(record.name)
					},
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'number',
							_1: _elm_lang$core$Json_Encode$int(record.number)
						},
						_1: {
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: 'columns',
								_1: _elm_lang$core$Json_Encode$list(
									A2(_elm_lang$core$List$map, _vito$cadet$GitHubGraph$encodeProjectColumn, record.columns))
							},
							_1: {ctor: '[]'}
						}
					}
				}
			}
		});
};
var _vito$cadet$GitHubGraph$encodeUser = function (record) {
	return _elm_lang$core$Json_Encode$object(
		{
			ctor: '::',
			_0: {
				ctor: '_Tuple2',
				_0: 'id',
				_1: _elm_lang$core$Json_Encode$string(record.id)
			},
			_1: {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'url',
					_1: _elm_lang$core$Json_Encode$string(record.url)
				},
				_1: {
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'login',
						_1: _elm_lang$core$Json_Encode$string(record.login)
					},
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'avatar',
							_1: _elm_lang$core$Json_Encode$string(record.avatar)
						},
						_1: {ctor: '[]'}
					}
				}
			}
		});
};
var _vito$cadet$GitHubGraph$encodeLabel = function (record) {
	return _elm_lang$core$Json_Encode$object(
		{
			ctor: '::',
			_0: {
				ctor: '_Tuple2',
				_0: 'name',
				_1: _elm_lang$core$Json_Encode$string(record.name)
			},
			_1: {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'color',
					_1: _elm_lang$core$Json_Encode$string(record.color)
				},
				_1: {ctor: '[]'}
			}
		});
};
var _vito$cadet$GitHubGraph$encodeRepo = function (record) {
	return _elm_lang$core$Json_Encode$object(
		{
			ctor: '::',
			_0: {
				ctor: '_Tuple2',
				_0: 'id',
				_1: _elm_lang$core$Json_Encode$string(record.id)
			},
			_1: {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'url',
					_1: _elm_lang$core$Json_Encode$string(record.url)
				},
				_1: {
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'owner',
						_1: _elm_lang$core$Json_Encode$string(record.owner)
					},
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'name',
							_1: _elm_lang$core$Json_Encode$string(record.name)
						},
						_1: {ctor: '[]'}
					}
				}
			}
		});
};
var _vito$cadet$GitHubGraph$pickEnum2 = F2(
	function (ma, mb) {
		var _p1 = ma;
		if (_p1.ctor === 'Just') {
			return _elm_lang$core$Maybe$Just(_p1._0);
		} else {
			return mb;
		}
	});
var _vito$cadet$GitHubGraph$auth = function (token) {
	return _elm_lang$core$Native_Utils.eq(token, '') ? {ctor: '[]'} : {
		ctor: '::',
		_0: {
			ctor: '_Tuple2',
			_0: 'Authorization',
			_1: A2(_elm_lang$core$Basics_ops['++'], 'token ', token)
		},
		_1: {ctor: '[]'}
	};
};
var _vito$cadet$GitHubGraph$authHeaders = function (_p2) {
	return A2(
		_elm_lang$core$List$map,
		_elm_lang$core$Basics$uncurry(_elm_lang$http$Http$header),
		_vito$cadet$GitHubGraph$auth(_p2));
};
var _vito$cadet$GitHubGraph$authedOptions = function (token) {
	return {
		method: 'POST',
		headers: _vito$cadet$GitHubGraph$authHeaders(token),
		url: 'https://api.github.com/graphql',
		timeout: _elm_lang$core$Maybe$Nothing,
		withCredentials: false
	};
};
var _vito$cadet$GitHubGraph$fetchPaged = F3(
	function (doc, token, psel) {
		var fetchNextPage = function (_p3) {
			var _p4 = _p3;
			var _p6 = _p4.pageInfo;
			var _p5 = _p4.content;
			return _p6.hasNextPage ? A2(
				_elm_lang$core$Task$map,
				F2(
					function (x, y) {
						return A2(_elm_lang$core$Basics_ops['++'], x, y);
					})(_p5),
				A3(
					_vito$cadet$GitHubGraph$fetchPaged,
					doc,
					token,
					_elm_lang$core$Native_Utils.update(
						psel,
						{after: _p6.endCursor}))) : _elm_lang$core$Task$succeed(_p5);
		};
		return A2(
			_elm_lang$core$Task$andThen,
			fetchNextPage,
			A2(
				_jamesmacaulay$elm_graphql$GraphQL_Client_Http$customSendQuery,
				_vito$cadet$GitHubGraph$authedOptions(token),
				A2(_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$request, psel, doc)));
	});
var _vito$cadet$GitHubGraph$reactionScore = function (reactions) {
	return _elm_lang$core$List$sum(
		A3(
			_elm_lang$core$Basics$flip,
			_elm_lang$core$List$map,
			reactions,
			function (_p7) {
				var _p8 = _p7;
				var _p10 = _p8.count;
				var _p9 = _p8.type_;
				switch (_p9.ctor) {
					case 'ReactionTypeThumbsUp':
						return 2 * _p10;
					case 'ReactionTypeThumbsDown':
						return -2 * _p10;
					case 'ReactionTypeLaugh':
						return _p10;
					case 'ReactionTypeConfused':
						return 0 - _p10;
					case 'ReactionTypeHeart':
						return 3 * _p10;
					default:
						return 3 * _p10;
				}
			}));
};
var _vito$cadet$GitHubGraph$pullRequestScore = function (_p11) {
	var _p12 = _p11;
	return (1000 + _vito$cadet$GitHubGraph$reactionScore(_p12.reactions)) + (2 * _p12.commentCount);
};
var _vito$cadet$GitHubGraph$issueScore = function (_p13) {
	var _p14 = _p13;
	return _vito$cadet$GitHubGraph$reactionScore(_p14.reactions) + (2 * _p14.commentCount);
};
var _vito$cadet$GitHubGraph$Repo = F4(
	function (a, b, c, d) {
		return {id: a, url: b, owner: c, name: d};
	});
var _vito$cadet$GitHubGraph$decodeRepo = A2(
	_elm_community$json_extra$Json_Decode_Extra_ops['|:'],
	A2(
		_elm_community$json_extra$Json_Decode_Extra_ops['|:'],
		A2(
			_elm_community$json_extra$Json_Decode_Extra_ops['|:'],
			A2(
				_elm_community$json_extra$Json_Decode_Extra_ops['|:'],
				_elm_lang$core$Json_Decode$succeed(_vito$cadet$GitHubGraph$Repo),
				A2(_elm_lang$core$Json_Decode$field, 'id', _elm_lang$core$Json_Decode$string)),
			A2(_elm_lang$core$Json_Decode$field, 'url', _elm_lang$core$Json_Decode$string)),
		A2(_elm_lang$core$Json_Decode$field, 'owner', _elm_lang$core$Json_Decode$string)),
	A2(_elm_lang$core$Json_Decode$field, 'name', _elm_lang$core$Json_Decode$string));
var _vito$cadet$GitHubGraph$Issue = function (a) {
	return function (b) {
		return function (c) {
			return function (d) {
				return function (e) {
					return function (f) {
						return function (g) {
							return function (h) {
								return function (i) {
									return function (j) {
										return function (k) {
											return function (l) {
												return {id: a, url: b, createdAt: c, updatedAt: d, state: e, number: f, title: g, commentCount: h, reactions: i, author: j, labels: k, cards: l};
											};
										};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var _vito$cadet$GitHubGraph$PullRequest = function (a) {
	return function (b) {
		return function (c) {
			return function (d) {
				return function (e) {
					return function (f) {
						return function (g) {
							return function (h) {
								return function (i) {
									return function (j) {
										return function (k) {
											return function (l) {
												return function (m) {
													return function (n) {
														return {id: a, url: b, createdAt: c, updatedAt: d, state: e, number: f, title: g, commentCount: h, reactions: i, author: j, labels: k, cards: l, additions: m, deletions: n};
													};
												};
											};
										};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var _vito$cadet$GitHubGraph$Label = F2(
	function (a, b) {
		return {name: a, color: b};
	});
var _vito$cadet$GitHubGraph$decodeLabel = A2(
	_elm_community$json_extra$Json_Decode_Extra_ops['|:'],
	A2(
		_elm_community$json_extra$Json_Decode_Extra_ops['|:'],
		_elm_lang$core$Json_Decode$succeed(_vito$cadet$GitHubGraph$Label),
		A2(_elm_lang$core$Json_Decode$field, 'name', _elm_lang$core$Json_Decode$string)),
	A2(_elm_lang$core$Json_Decode$field, 'color', _elm_lang$core$Json_Decode$string));
var _vito$cadet$GitHubGraph$ReactionGroup = F2(
	function (a, b) {
		return {type_: a, count: b};
	});
var _vito$cadet$GitHubGraph$User = F4(
	function (a, b, c, d) {
		return {id: a, url: b, login: c, avatar: d};
	});
var _vito$cadet$GitHubGraph$decodeUser = A2(
	_elm_community$json_extra$Json_Decode_Extra_ops['|:'],
	A2(
		_elm_community$json_extra$Json_Decode_Extra_ops['|:'],
		A2(
			_elm_community$json_extra$Json_Decode_Extra_ops['|:'],
			A2(
				_elm_community$json_extra$Json_Decode_Extra_ops['|:'],
				_elm_lang$core$Json_Decode$succeed(_vito$cadet$GitHubGraph$User),
				A2(_elm_lang$core$Json_Decode$field, 'id', _elm_lang$core$Json_Decode$string)),
			A2(_elm_lang$core$Json_Decode$field, 'url', _elm_lang$core$Json_Decode$string)),
		A2(_elm_lang$core$Json_Decode$field, 'login', _elm_lang$core$Json_Decode$string)),
	A2(_elm_lang$core$Json_Decode$field, 'avatar', _elm_lang$core$Json_Decode$string));
var _vito$cadet$GitHubGraph$Project = F5(
	function (a, b, c, d, e) {
		return {id: a, url: b, name: c, number: d, columns: e};
	});
var _vito$cadet$GitHubGraph$ProjectColumn = F2(
	function (a, b) {
		return {id: a, name: b};
	});
var _vito$cadet$GitHubGraph$decodeProjectColumn = A2(
	_elm_community$json_extra$Json_Decode_Extra_ops['|:'],
	A2(
		_elm_community$json_extra$Json_Decode_Extra_ops['|:'],
		_elm_lang$core$Json_Decode$succeed(_vito$cadet$GitHubGraph$ProjectColumn),
		A2(_elm_lang$core$Json_Decode$field, 'id', _elm_lang$core$Json_Decode$string)),
	A2(_elm_lang$core$Json_Decode$field, 'name', _elm_lang$core$Json_Decode$string));
var _vito$cadet$GitHubGraph$decodeProject = A2(
	_elm_community$json_extra$Json_Decode_Extra_ops['|:'],
	A2(
		_elm_community$json_extra$Json_Decode_Extra_ops['|:'],
		A2(
			_elm_community$json_extra$Json_Decode_Extra_ops['|:'],
			A2(
				_elm_community$json_extra$Json_Decode_Extra_ops['|:'],
				A2(
					_elm_community$json_extra$Json_Decode_Extra_ops['|:'],
					_elm_lang$core$Json_Decode$succeed(_vito$cadet$GitHubGraph$Project),
					A2(_elm_lang$core$Json_Decode$field, 'id', _elm_lang$core$Json_Decode$string)),
				A2(_elm_lang$core$Json_Decode$field, 'url', _elm_lang$core$Json_Decode$string)),
			A2(_elm_lang$core$Json_Decode$field, 'name', _elm_lang$core$Json_Decode$string)),
		A2(_elm_lang$core$Json_Decode$field, 'number', _elm_lang$core$Json_Decode$int)),
	A2(
		_elm_lang$core$Json_Decode$field,
		'columns',
		_elm_lang$core$Json_Decode$list(_vito$cadet$GitHubGraph$decodeProjectColumn)));
var _vito$cadet$GitHubGraph$ProjectColumnCard = F3(
	function (a, b, c) {
		return {id: a, itemID: b, note: c};
	});
var _vito$cadet$GitHubGraph$decodeProjectColumnCard = A2(
	_elm_community$json_extra$Json_Decode_Extra_ops['|:'],
	A2(
		_elm_community$json_extra$Json_Decode_Extra_ops['|:'],
		A2(
			_elm_community$json_extra$Json_Decode_Extra_ops['|:'],
			_elm_lang$core$Json_Decode$succeed(_vito$cadet$GitHubGraph$ProjectColumnCard),
			A2(_elm_lang$core$Json_Decode$field, 'id', _elm_lang$core$Json_Decode$string)),
		A2(
			_elm_lang$core$Json_Decode$field,
			'item_id',
			_elm_lang$core$Json_Decode$maybe(_elm_lang$core$Json_Decode$string))),
	A2(
		_elm_lang$core$Json_Decode$field,
		'note',
		_elm_lang$core$Json_Decode$maybe(_elm_lang$core$Json_Decode$string)));
var _vito$cadet$GitHubGraph$ProjectLocation = F4(
	function (a, b, c, d) {
		return {id: a, url: b, name: c, number: d};
	});
var _vito$cadet$GitHubGraph$decodeProjectLocation = A2(
	_elm_community$json_extra$Json_Decode_Extra_ops['|:'],
	A2(
		_elm_community$json_extra$Json_Decode_Extra_ops['|:'],
		A2(
			_elm_community$json_extra$Json_Decode_Extra_ops['|:'],
			A2(
				_elm_community$json_extra$Json_Decode_Extra_ops['|:'],
				_elm_lang$core$Json_Decode$succeed(_vito$cadet$GitHubGraph$ProjectLocation),
				A2(_elm_lang$core$Json_Decode$field, 'id', _elm_lang$core$Json_Decode$string)),
			A2(_elm_lang$core$Json_Decode$field, 'url', _elm_lang$core$Json_Decode$string)),
		A2(_elm_lang$core$Json_Decode$field, 'name', _elm_lang$core$Json_Decode$string)),
	A2(_elm_lang$core$Json_Decode$field, 'number', _elm_lang$core$Json_Decode$int));
var _vito$cadet$GitHubGraph$CardLocation = F3(
	function (a, b, c) {
		return {id: a, project: b, column: c};
	});
var _vito$cadet$GitHubGraph$decodeCardLocation = A2(
	_elm_community$json_extra$Json_Decode_Extra_ops['|:'],
	A2(
		_elm_community$json_extra$Json_Decode_Extra_ops['|:'],
		A2(
			_elm_community$json_extra$Json_Decode_Extra_ops['|:'],
			_elm_lang$core$Json_Decode$succeed(_vito$cadet$GitHubGraph$CardLocation),
			A2(_elm_lang$core$Json_Decode$field, 'id', _elm_lang$core$Json_Decode$string)),
		A2(_elm_lang$core$Json_Decode$field, 'project', _vito$cadet$GitHubGraph$decodeProjectLocation)),
	A2(
		_elm_lang$core$Json_Decode$field,
		'column',
		_elm_lang$core$Json_Decode$maybe(_vito$cadet$GitHubGraph$decodeProjectColumn)));
var _vito$cadet$GitHubGraph$OrgSelector = function (a) {
	return {name: a};
};
var _vito$cadet$GitHubGraph$decodeOrgSelector = A2(
	_elm_community$json_extra$Json_Decode_Extra_ops['|:'],
	_elm_lang$core$Json_Decode$succeed(_vito$cadet$GitHubGraph$OrgSelector),
	A2(_elm_lang$core$Json_Decode$field, 'name', _elm_lang$core$Json_Decode$string));
var _vito$cadet$GitHubGraph$RepoSelector = F2(
	function (a, b) {
		return {owner: a, name: b};
	});
var _vito$cadet$GitHubGraph$decodeRepoSelector = A2(
	_elm_community$json_extra$Json_Decode_Extra_ops['|:'],
	A2(
		_elm_community$json_extra$Json_Decode_Extra_ops['|:'],
		_elm_lang$core$Json_Decode$succeed(_vito$cadet$GitHubGraph$RepoSelector),
		A2(_elm_lang$core$Json_Decode$field, 'owner', _elm_lang$core$Json_Decode$string)),
	A2(_elm_lang$core$Json_Decode$field, 'name', _elm_lang$core$Json_Decode$string));
var _vito$cadet$GitHubGraph$IDSelector = function (a) {
	return {id: a};
};
var _vito$cadet$GitHubGraph$PagedSelector = F2(
	function (a, b) {
		return {selector: a, after: b};
	});
var _vito$cadet$GitHubGraph$PagedResult = F2(
	function (a, b) {
		return {content: a, pageInfo: b};
	});
var _vito$cadet$GitHubGraph$PageInfo = F2(
	function (a, b) {
		return {endCursor: a, hasNextPage: b};
	});
var _vito$cadet$GitHubGraph$reposQuery = function () {
	var pageInfo = A2(
		_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$with,
		A3(
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$field,
			'hasNextPage',
			{ctor: '[]'},
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$bool),
		A2(
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$with,
			A3(
				_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$field,
				'endCursor',
				{ctor: '[]'},
				_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$nullable(_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$string)),
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$object(_vito$cadet$GitHubGraph$PageInfo)));
	var repo = A2(
		_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$with,
		A3(
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$field,
			'name',
			{ctor: '[]'},
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$string),
		A2(
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$with,
			A3(
				_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$field,
				'owner',
				{ctor: '[]'},
				_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$extract(
					A3(
						_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$field,
						'login',
						{ctor: '[]'},
						_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$string))),
			A2(
				_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$with,
				A3(
					_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$field,
					'url',
					{ctor: '[]'},
					_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$string),
				A2(
					_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$with,
					A3(
						_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$field,
						'id',
						{ctor: '[]'},
						_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$string),
					_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$object(_vito$cadet$GitHubGraph$Repo)))));
	var paged = A2(
		_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$with,
		A3(
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$field,
			'pageInfo',
			{ctor: '[]'},
			pageInfo),
		A2(
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$with,
			A3(
				_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$field,
				'nodes',
				{ctor: '[]'},
				_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$list(repo)),
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$object(_vito$cadet$GitHubGraph$PagedResult)));
	var afterVar = A3(
		_jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Variable$required,
		'after',
		function (_) {
			return _.after;
		},
		_jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Variable$nullable(_jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Variable$string));
	var pageArgs = {
		ctor: '::',
		_0: {
			ctor: '_Tuple2',
			_0: 'first',
			_1: _jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Arg$int(100)
		},
		_1: {
			ctor: '::',
			_0: {
				ctor: '_Tuple2',
				_0: 'after',
				_1: _jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Arg$variable(afterVar)
			},
			_1: {ctor: '[]'}
		}
	};
	var orgNameVar = A3(
		_jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Variable$required,
		'orgName',
		function (_p15) {
			return function (_) {
				return _.name;
			}(
				function (_) {
					return _.selector;
				}(_p15));
		},
		_jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Variable$string);
	var queryRoot = _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$extract(
		A3(
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$field,
			'organization',
			{
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'login',
					_1: _jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Arg$variable(orgNameVar)
				},
				_1: {ctor: '[]'}
			},
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$extract(
				A3(_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$field, 'repositories', pageArgs, paged))));
	return _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$queryDocument(queryRoot);
}();
var _vito$cadet$GitHubGraph$fetchOrgRepos = F2(
	function (token, org) {
		return A3(
			_vito$cadet$GitHubGraph$fetchPaged,
			_vito$cadet$GitHubGraph$reposQuery,
			token,
			{selector: org, after: _elm_lang$core$Maybe$Nothing});
	});
var _vito$cadet$GitHubGraph$projectsQuery = function () {
	var pageInfo = A2(
		_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$with,
		A3(
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$field,
			'hasNextPage',
			{ctor: '[]'},
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$bool),
		A2(
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$with,
			A3(
				_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$field,
				'endCursor',
				{ctor: '[]'},
				_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$nullable(_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$string)),
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$object(_vito$cadet$GitHubGraph$PageInfo)));
	var column = A2(
		_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$with,
		A3(
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$field,
			'name',
			{ctor: '[]'},
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$string),
		A2(
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$with,
			A3(
				_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$field,
				'id',
				{ctor: '[]'},
				_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$string),
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$object(_vito$cadet$GitHubGraph$ProjectColumn)));
	var project = A2(
		_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$with,
		A3(
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$field,
			'columns',
			{
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'first',
					_1: _jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Arg$int(50)
				},
				_1: {ctor: '[]'}
			},
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$extract(
				A3(
					_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$field,
					'nodes',
					{ctor: '[]'},
					_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$list(column)))),
		A2(
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$with,
			A3(
				_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$field,
				'number',
				{ctor: '[]'},
				_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$int),
			A2(
				_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$with,
				A3(
					_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$field,
					'name',
					{ctor: '[]'},
					_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$string),
				A2(
					_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$with,
					A3(
						_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$field,
						'url',
						{ctor: '[]'},
						_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$string),
					A2(
						_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$with,
						A3(
							_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$field,
							'id',
							{ctor: '[]'},
							_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$string),
						_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$object(_vito$cadet$GitHubGraph$Project))))));
	var paged = A2(
		_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$with,
		A3(
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$field,
			'pageInfo',
			{ctor: '[]'},
			pageInfo),
		A2(
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$with,
			A3(
				_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$field,
				'nodes',
				{ctor: '[]'},
				_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$list(project)),
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$object(_vito$cadet$GitHubGraph$PagedResult)));
	var afterVar = A3(
		_jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Variable$required,
		'after',
		function (_) {
			return _.after;
		},
		_jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Variable$nullable(_jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Variable$string));
	var pageArgs = {
		ctor: '::',
		_0: {
			ctor: '_Tuple2',
			_0: 'first',
			_1: _jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Arg$int(100)
		},
		_1: {
			ctor: '::',
			_0: {
				ctor: '_Tuple2',
				_0: 'after',
				_1: _jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Arg$variable(afterVar)
			},
			_1: {ctor: '[]'}
		}
	};
	var orgNameVar = A3(
		_jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Variable$required,
		'orgName',
		function (_p16) {
			return function (_) {
				return _.name;
			}(
				function (_) {
					return _.selector;
				}(_p16));
		},
		_jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Variable$string);
	var queryRoot = _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$extract(
		A3(
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$field,
			'organization',
			{
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'login',
					_1: _jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Arg$variable(orgNameVar)
				},
				_1: {ctor: '[]'}
			},
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$extract(
				A3(_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$field, 'projects', pageArgs, paged))));
	return _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$queryDocument(queryRoot);
}();
var _vito$cadet$GitHubGraph$fetchOrgProjects = F2(
	function (token, org) {
		return A3(
			_vito$cadet$GitHubGraph$fetchPaged,
			_vito$cadet$GitHubGraph$projectsQuery,
			token,
			{selector: org, after: _elm_lang$core$Maybe$Nothing});
	});
var _vito$cadet$GitHubGraph$cardsQuery = function () {
	var pageInfo = A2(
		_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$with,
		A3(
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$field,
			'hasNextPage',
			{ctor: '[]'},
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$bool),
		A2(
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$with,
			A3(
				_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$field,
				'endCursor',
				{ctor: '[]'},
				_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$nullable(_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$string)),
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$object(_vito$cadet$GitHubGraph$PageInfo)));
	var itemID = A2(
		_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$with,
		A2(
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$inlineFragment,
			_elm_lang$core$Maybe$Just(
				_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$onType('PullRequest')),
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$extract(
				A3(
					_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$field,
					'id',
					{ctor: '[]'},
					_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$string))),
		A2(
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$with,
			A2(
				_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$inlineFragment,
				_elm_lang$core$Maybe$Just(
					_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$onType('Issue')),
				_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$extract(
					A3(
						_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$field,
						'id',
						{ctor: '[]'},
						_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$string))),
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$object(_vito$cadet$GitHubGraph$pickEnum2)));
	var card = A2(
		_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$with,
		A3(
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$field,
			'note',
			{ctor: '[]'},
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$nullable(_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$string)),
		A2(
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$with,
			A3(
				_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$field,
				'content',
				{ctor: '[]'},
				itemID),
			A2(
				_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$with,
				A3(
					_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$field,
					'id',
					{ctor: '[]'},
					_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$string),
				_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$object(_vito$cadet$GitHubGraph$ProjectColumnCard))));
	var paged = A2(
		_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$with,
		A3(
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$field,
			'pageInfo',
			{ctor: '[]'},
			pageInfo),
		A2(
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$with,
			A3(
				_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$field,
				'nodes',
				{ctor: '[]'},
				_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$list(card)),
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$object(_vito$cadet$GitHubGraph$PagedResult)));
	var afterVar = A3(
		_jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Variable$required,
		'after',
		function (_) {
			return _.after;
		},
		_jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Variable$nullable(_jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Variable$string));
	var pageArgs = {
		ctor: '::',
		_0: {
			ctor: '_Tuple2',
			_0: 'first',
			_1: _jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Arg$int(100)
		},
		_1: {
			ctor: '::',
			_0: {
				ctor: '_Tuple2',
				_0: 'after',
				_1: _jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Arg$variable(afterVar)
			},
			_1: {ctor: '[]'}
		}
	};
	var cards = _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$extract(
		A3(_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$field, 'cards', pageArgs, paged));
	var idVar = A3(
		_jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Variable$required,
		'id',
		function (_p17) {
			return function (_) {
				return _.id;
			}(
				function (_) {
					return _.selector;
				}(_p17));
		},
		_jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Variable$id);
	var queryRoot = _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$extract(
		_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$assume(
			A3(
				_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$field,
				'node',
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'id',
						_1: _jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Arg$variable(idVar)
					},
					_1: {ctor: '[]'}
				},
				_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$extract(
					A2(
						_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$inlineFragment,
						_elm_lang$core$Maybe$Just(
							_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$onType('ProjectColumn')),
						cards)))));
	return _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$queryDocument(queryRoot);
}();
var _vito$cadet$GitHubGraph$fetchProjectColumnCards = F2(
	function (token, col) {
		return A3(
			_vito$cadet$GitHubGraph$fetchPaged,
			_vito$cadet$GitHubGraph$cardsQuery,
			token,
			{selector: col, after: _elm_lang$core$Maybe$Nothing});
	});
var _vito$cadet$GitHubGraph$IssueStateClosed = {ctor: 'IssueStateClosed'};
var _vito$cadet$GitHubGraph$IssueStateOpen = {ctor: 'IssueStateOpen'};
var _vito$cadet$GitHubGraph$issueStates = {
	ctor: '::',
	_0: {ctor: '_Tuple2', _0: 'OPEN', _1: _vito$cadet$GitHubGraph$IssueStateOpen},
	_1: {
		ctor: '::',
		_0: {ctor: '_Tuple2', _0: 'CLOSED', _1: _vito$cadet$GitHubGraph$IssueStateClosed},
		_1: {ctor: '[]'}
	}
};
var _vito$cadet$GitHubGraph$decodeIssueState = function () {
	var decodeToType = function (string) {
		var _p18 = A2(
			_elm_lang$core$Dict$get,
			string,
			_elm_lang$core$Dict$fromList(_vito$cadet$GitHubGraph$issueStates));
		if (_p18.ctor === 'Just') {
			return _elm_lang$core$Result$Ok(_p18._0);
		} else {
			return _elm_lang$core$Result$Err(
				A2(
					_elm_lang$core$Basics_ops['++'],
					'Not valid pattern for decoder to IssueState. Pattern: ',
					_elm_lang$core$Basics$toString(string)));
		}
	};
	return A2(_vito$cadet$GitHubGraph$customDecoder, _elm_lang$core$Json_Decode$string, decodeToType);
}();
var _vito$cadet$GitHubGraph$encodeIssueState = function (item) {
	return _elm_lang$core$Json_Encode$string(
		A3(
			_elm_lang$core$List$foldl,
			F2(
				function (_p19, $default) {
					var _p20 = _p19;
					return _elm_lang$core$Native_Utils.eq(_p20._1, item) ? _p20._0 : $default;
				}),
			'UNKNOWN',
			_vito$cadet$GitHubGraph$issueStates));
};
var _vito$cadet$GitHubGraph$PullRequestStateMerged = {ctor: 'PullRequestStateMerged'};
var _vito$cadet$GitHubGraph$PullRequestStateClosed = {ctor: 'PullRequestStateClosed'};
var _vito$cadet$GitHubGraph$PullRequestStateOpen = {ctor: 'PullRequestStateOpen'};
var _vito$cadet$GitHubGraph$pullRequestStates = {
	ctor: '::',
	_0: {ctor: '_Tuple2', _0: 'OPEN', _1: _vito$cadet$GitHubGraph$PullRequestStateOpen},
	_1: {
		ctor: '::',
		_0: {ctor: '_Tuple2', _0: 'CLOSED', _1: _vito$cadet$GitHubGraph$PullRequestStateClosed},
		_1: {
			ctor: '::',
			_0: {ctor: '_Tuple2', _0: 'MERGED', _1: _vito$cadet$GitHubGraph$PullRequestStateMerged},
			_1: {ctor: '[]'}
		}
	}
};
var _vito$cadet$GitHubGraph$decodePullRequestState = function () {
	var decodeToType = function (string) {
		var _p21 = A2(
			_elm_lang$core$Dict$get,
			string,
			_elm_lang$core$Dict$fromList(_vito$cadet$GitHubGraph$pullRequestStates));
		if (_p21.ctor === 'Just') {
			return _elm_lang$core$Result$Ok(_p21._0);
		} else {
			return _elm_lang$core$Result$Err(
				A2(
					_elm_lang$core$Basics_ops['++'],
					'Not valid pattern for decoder to PullRequestState. Pattern: ',
					_elm_lang$core$Basics$toString(string)));
		}
	};
	return A2(_vito$cadet$GitHubGraph$customDecoder, _elm_lang$core$Json_Decode$string, decodeToType);
}();
var _vito$cadet$GitHubGraph$encodePullRequestState = function (item) {
	return _elm_lang$core$Json_Encode$string(
		A3(
			_elm_lang$core$List$foldl,
			F2(
				function (_p22, $default) {
					var _p23 = _p22;
					return _elm_lang$core$Native_Utils.eq(_p23._1, item) ? _p23._0 : $default;
				}),
			'UNKNOWN',
			_vito$cadet$GitHubGraph$pullRequestStates));
};
var _vito$cadet$GitHubGraph$ReactionTypeHeart = {ctor: 'ReactionTypeHeart'};
var _vito$cadet$GitHubGraph$ReactionTypeConfused = {ctor: 'ReactionTypeConfused'};
var _vito$cadet$GitHubGraph$ReactionTypeHooray = {ctor: 'ReactionTypeHooray'};
var _vito$cadet$GitHubGraph$ReactionTypeLaugh = {ctor: 'ReactionTypeLaugh'};
var _vito$cadet$GitHubGraph$ReactionTypeThumbsDown = {ctor: 'ReactionTypeThumbsDown'};
var _vito$cadet$GitHubGraph$ReactionTypeThumbsUp = {ctor: 'ReactionTypeThumbsUp'};
var _vito$cadet$GitHubGraph$reactionTypes = {
	ctor: '::',
	_0: {ctor: '_Tuple2', _0: 'THUMBS_UP', _1: _vito$cadet$GitHubGraph$ReactionTypeThumbsUp},
	_1: {
		ctor: '::',
		_0: {ctor: '_Tuple2', _0: 'THUMBS_DOWN', _1: _vito$cadet$GitHubGraph$ReactionTypeThumbsDown},
		_1: {
			ctor: '::',
			_0: {ctor: '_Tuple2', _0: 'LAUGH', _1: _vito$cadet$GitHubGraph$ReactionTypeLaugh},
			_1: {
				ctor: '::',
				_0: {ctor: '_Tuple2', _0: 'HOORAY', _1: _vito$cadet$GitHubGraph$ReactionTypeHooray},
				_1: {
					ctor: '::',
					_0: {ctor: '_Tuple2', _0: 'CONFUSED', _1: _vito$cadet$GitHubGraph$ReactionTypeConfused},
					_1: {
						ctor: '::',
						_0: {ctor: '_Tuple2', _0: 'HEART', _1: _vito$cadet$GitHubGraph$ReactionTypeHeart},
						_1: {ctor: '[]'}
					}
				}
			}
		}
	}
};
var _vito$cadet$GitHubGraph$decodeReactionType = function () {
	var decodeToType = function (string) {
		var _p24 = A2(
			_elm_lang$core$Dict$get,
			string,
			_elm_lang$core$Dict$fromList(_vito$cadet$GitHubGraph$reactionTypes));
		if (_p24.ctor === 'Just') {
			return _elm_lang$core$Result$Ok(_p24._0);
		} else {
			return _elm_lang$core$Result$Err(
				A2(
					_elm_lang$core$Basics_ops['++'],
					'Not valid pattern for decoder to ReactionType. Pattern: ',
					_elm_lang$core$Basics$toString(string)));
		}
	};
	return A2(_vito$cadet$GitHubGraph$customDecoder, _elm_lang$core$Json_Decode$string, decodeToType);
}();
var _vito$cadet$GitHubGraph$decodeReactionGroup = A2(
	_elm_community$json_extra$Json_Decode_Extra_ops['|:'],
	A2(
		_elm_community$json_extra$Json_Decode_Extra_ops['|:'],
		_elm_lang$core$Json_Decode$succeed(_vito$cadet$GitHubGraph$ReactionGroup),
		A2(_elm_lang$core$Json_Decode$field, 'type_', _vito$cadet$GitHubGraph$decodeReactionType)),
	A2(_elm_lang$core$Json_Decode$field, 'count', _elm_lang$core$Json_Decode$int));
var _vito$cadet$GitHubGraph$decodeIssue = A2(
	_elm_community$json_extra$Json_Decode_Extra_ops['|:'],
	A2(
		_elm_community$json_extra$Json_Decode_Extra_ops['|:'],
		A2(
			_elm_community$json_extra$Json_Decode_Extra_ops['|:'],
			A2(
				_elm_community$json_extra$Json_Decode_Extra_ops['|:'],
				A2(
					_elm_community$json_extra$Json_Decode_Extra_ops['|:'],
					A2(
						_elm_community$json_extra$Json_Decode_Extra_ops['|:'],
						A2(
							_elm_community$json_extra$Json_Decode_Extra_ops['|:'],
							A2(
								_elm_community$json_extra$Json_Decode_Extra_ops['|:'],
								A2(
									_elm_community$json_extra$Json_Decode_Extra_ops['|:'],
									A2(
										_elm_community$json_extra$Json_Decode_Extra_ops['|:'],
										A2(
											_elm_community$json_extra$Json_Decode_Extra_ops['|:'],
											A2(
												_elm_community$json_extra$Json_Decode_Extra_ops['|:'],
												_elm_lang$core$Json_Decode$succeed(_vito$cadet$GitHubGraph$Issue),
												A2(_elm_lang$core$Json_Decode$field, 'id', _elm_lang$core$Json_Decode$string)),
											A2(_elm_lang$core$Json_Decode$field, 'url', _elm_lang$core$Json_Decode$string)),
										A2(_elm_lang$core$Json_Decode$field, 'created_at', _elm_community$json_extra$Json_Decode_Extra$date)),
									A2(_elm_lang$core$Json_Decode$field, 'updated_at', _elm_community$json_extra$Json_Decode_Extra$date)),
								A2(_elm_lang$core$Json_Decode$field, 'state', _vito$cadet$GitHubGraph$decodeIssueState)),
							A2(_elm_lang$core$Json_Decode$field, 'number', _elm_lang$core$Json_Decode$int)),
						A2(_elm_lang$core$Json_Decode$field, 'title', _elm_lang$core$Json_Decode$string)),
					A2(_elm_lang$core$Json_Decode$field, 'comment_count', _elm_lang$core$Json_Decode$int)),
				A2(
					_elm_lang$core$Json_Decode$field,
					'reactions',
					_elm_lang$core$Json_Decode$list(_vito$cadet$GitHubGraph$decodeReactionGroup))),
			A2(
				_elm_lang$core$Json_Decode$field,
				'author',
				_elm_lang$core$Json_Decode$maybe(_vito$cadet$GitHubGraph$decodeUser))),
		A2(
			_elm_lang$core$Json_Decode$field,
			'labels',
			_elm_lang$core$Json_Decode$list(_vito$cadet$GitHubGraph$decodeLabel))),
	A2(
		_elm_lang$core$Json_Decode$field,
		'cards',
		_elm_lang$core$Json_Decode$list(_vito$cadet$GitHubGraph$decodeCardLocation)));
var _vito$cadet$GitHubGraph$decodePullRequest = A2(
	_elm_community$json_extra$Json_Decode_Extra_ops['|:'],
	A2(
		_elm_community$json_extra$Json_Decode_Extra_ops['|:'],
		A2(
			_elm_community$json_extra$Json_Decode_Extra_ops['|:'],
			A2(
				_elm_community$json_extra$Json_Decode_Extra_ops['|:'],
				A2(
					_elm_community$json_extra$Json_Decode_Extra_ops['|:'],
					A2(
						_elm_community$json_extra$Json_Decode_Extra_ops['|:'],
						A2(
							_elm_community$json_extra$Json_Decode_Extra_ops['|:'],
							A2(
								_elm_community$json_extra$Json_Decode_Extra_ops['|:'],
								A2(
									_elm_community$json_extra$Json_Decode_Extra_ops['|:'],
									A2(
										_elm_community$json_extra$Json_Decode_Extra_ops['|:'],
										A2(
											_elm_community$json_extra$Json_Decode_Extra_ops['|:'],
											A2(
												_elm_community$json_extra$Json_Decode_Extra_ops['|:'],
												A2(
													_elm_community$json_extra$Json_Decode_Extra_ops['|:'],
													A2(
														_elm_community$json_extra$Json_Decode_Extra_ops['|:'],
														_elm_lang$core$Json_Decode$succeed(_vito$cadet$GitHubGraph$PullRequest),
														A2(_elm_lang$core$Json_Decode$field, 'id', _elm_lang$core$Json_Decode$string)),
													A2(_elm_lang$core$Json_Decode$field, 'url', _elm_lang$core$Json_Decode$string)),
												A2(_elm_lang$core$Json_Decode$field, 'created_at', _elm_community$json_extra$Json_Decode_Extra$date)),
											A2(_elm_lang$core$Json_Decode$field, 'updated_at', _elm_community$json_extra$Json_Decode_Extra$date)),
										A2(_elm_lang$core$Json_Decode$field, 'state', _vito$cadet$GitHubGraph$decodePullRequestState)),
									A2(_elm_lang$core$Json_Decode$field, 'number', _elm_lang$core$Json_Decode$int)),
								A2(_elm_lang$core$Json_Decode$field, 'title', _elm_lang$core$Json_Decode$string)),
							A2(_elm_lang$core$Json_Decode$field, 'comment_count', _elm_lang$core$Json_Decode$int)),
						A2(
							_elm_lang$core$Json_Decode$field,
							'reactions',
							_elm_lang$core$Json_Decode$list(_vito$cadet$GitHubGraph$decodeReactionGroup))),
					A2(
						_elm_lang$core$Json_Decode$field,
						'author',
						_elm_lang$core$Json_Decode$maybe(_vito$cadet$GitHubGraph$decodeUser))),
				A2(
					_elm_lang$core$Json_Decode$field,
					'labels',
					_elm_lang$core$Json_Decode$list(_vito$cadet$GitHubGraph$decodeLabel))),
			A2(
				_elm_lang$core$Json_Decode$field,
				'cards',
				_elm_lang$core$Json_Decode$list(_vito$cadet$GitHubGraph$decodeCardLocation))),
		A2(_elm_lang$core$Json_Decode$field, 'additions', _elm_lang$core$Json_Decode$int)),
	A2(_elm_lang$core$Json_Decode$field, 'deletions', _elm_lang$core$Json_Decode$int));
var _vito$cadet$GitHubGraph$encodeReactionType = function (item) {
	return _elm_lang$core$Json_Encode$string(
		A3(
			_elm_lang$core$List$foldl,
			F2(
				function (_p25, $default) {
					var _p26 = _p25;
					return _elm_lang$core$Native_Utils.eq(_p26._1, item) ? _p26._0 : $default;
				}),
			'UNKNOWN',
			_vito$cadet$GitHubGraph$reactionTypes));
};
var _vito$cadet$GitHubGraph$encodeReactionGroup = function (record) {
	return _elm_lang$core$Json_Encode$object(
		{
			ctor: '::',
			_0: {
				ctor: '_Tuple2',
				_0: 'type_',
				_1: _vito$cadet$GitHubGraph$encodeReactionType(record.type_)
			},
			_1: {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'count',
					_1: _elm_lang$core$Json_Encode$int(record.count)
				},
				_1: {ctor: '[]'}
			}
		});
};
var _vito$cadet$GitHubGraph$encodeIssue = function (record) {
	return _elm_lang$core$Json_Encode$object(
		{
			ctor: '::',
			_0: {
				ctor: '_Tuple2',
				_0: 'id',
				_1: _elm_lang$core$Json_Encode$string(record.id)
			},
			_1: {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'url',
					_1: _elm_lang$core$Json_Encode$string(record.url)
				},
				_1: {
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'created_at',
						_1: _elm_lang$core$Json_Encode$string(
							_elm_lang$core$Basics$toString(record.createdAt))
					},
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'updated_at',
							_1: _elm_lang$core$Json_Encode$string(
								_elm_lang$core$Basics$toString(record.updatedAt))
						},
						_1: {
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: 'state',
								_1: _vito$cadet$GitHubGraph$encodeIssueState(record.state)
							},
							_1: {
								ctor: '::',
								_0: {
									ctor: '_Tuple2',
									_0: 'number',
									_1: _elm_lang$core$Json_Encode$int(record.number)
								},
								_1: {
									ctor: '::',
									_0: {
										ctor: '_Tuple2',
										_0: 'title',
										_1: _elm_lang$core$Json_Encode$string(record.title)
									},
									_1: {
										ctor: '::',
										_0: {
											ctor: '_Tuple2',
											_0: 'comment_count',
											_1: _elm_lang$core$Json_Encode$int(record.commentCount)
										},
										_1: {
											ctor: '::',
											_0: {
												ctor: '_Tuple2',
												_0: 'reactions',
												_1: _elm_lang$core$Json_Encode$list(
													A2(_elm_lang$core$List$map, _vito$cadet$GitHubGraph$encodeReactionGroup, record.reactions))
											},
											_1: {
												ctor: '::',
												_0: {
													ctor: '_Tuple2',
													_0: 'author',
													_1: A2(_elm_community$json_extra$Json_Encode_Extra$maybe, _vito$cadet$GitHubGraph$encodeUser, record.author)
												},
												_1: {
													ctor: '::',
													_0: {
														ctor: '_Tuple2',
														_0: 'labels',
														_1: _elm_lang$core$Json_Encode$list(
															A2(_elm_lang$core$List$map, _vito$cadet$GitHubGraph$encodeLabel, record.labels))
													},
													_1: {
														ctor: '::',
														_0: {
															ctor: '_Tuple2',
															_0: 'cards',
															_1: _elm_lang$core$Json_Encode$list(
																A2(_elm_lang$core$List$map, _vito$cadet$GitHubGraph$encodeCardLocation, record.cards))
														},
														_1: {ctor: '[]'}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		});
};
var _vito$cadet$GitHubGraph$encodePullRequest = function (record) {
	return _elm_lang$core$Json_Encode$object(
		{
			ctor: '::',
			_0: {
				ctor: '_Tuple2',
				_0: 'id',
				_1: _elm_lang$core$Json_Encode$string(record.id)
			},
			_1: {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'url',
					_1: _elm_lang$core$Json_Encode$string(record.url)
				},
				_1: {
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'created_at',
						_1: _elm_lang$core$Json_Encode$string(
							_elm_lang$core$Basics$toString(record.createdAt))
					},
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'updated_at',
							_1: _elm_lang$core$Json_Encode$string(
								_elm_lang$core$Basics$toString(record.updatedAt))
						},
						_1: {
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: 'state',
								_1: _vito$cadet$GitHubGraph$encodePullRequestState(record.state)
							},
							_1: {
								ctor: '::',
								_0: {
									ctor: '_Tuple2',
									_0: 'number',
									_1: _elm_lang$core$Json_Encode$int(record.number)
								},
								_1: {
									ctor: '::',
									_0: {
										ctor: '_Tuple2',
										_0: 'title',
										_1: _elm_lang$core$Json_Encode$string(record.title)
									},
									_1: {
										ctor: '::',
										_0: {
											ctor: '_Tuple2',
											_0: 'comment_count',
											_1: _elm_lang$core$Json_Encode$int(record.commentCount)
										},
										_1: {
											ctor: '::',
											_0: {
												ctor: '_Tuple2',
												_0: 'reactions',
												_1: _elm_lang$core$Json_Encode$list(
													A2(_elm_lang$core$List$map, _vito$cadet$GitHubGraph$encodeReactionGroup, record.reactions))
											},
											_1: {
												ctor: '::',
												_0: {
													ctor: '_Tuple2',
													_0: 'author',
													_1: A2(_elm_community$json_extra$Json_Encode_Extra$maybe, _vito$cadet$GitHubGraph$encodeUser, record.author)
												},
												_1: {
													ctor: '::',
													_0: {
														ctor: '_Tuple2',
														_0: 'labels',
														_1: _elm_lang$core$Json_Encode$list(
															A2(_elm_lang$core$List$map, _vito$cadet$GitHubGraph$encodeLabel, record.labels))
													},
													_1: {
														ctor: '::',
														_0: {
															ctor: '_Tuple2',
															_0: 'cards',
															_1: _elm_lang$core$Json_Encode$list(
																A2(_elm_lang$core$List$map, _vito$cadet$GitHubGraph$encodeCardLocation, record.cards))
														},
														_1: {
															ctor: '::',
															_0: {
																ctor: '_Tuple2',
																_0: 'additions',
																_1: _elm_lang$core$Json_Encode$int(record.additions)
															},
															_1: {
																ctor: '::',
																_0: {
																	ctor: '_Tuple2',
																	_0: 'deletions',
																	_1: _elm_lang$core$Json_Encode$int(record.deletions)
																},
																_1: {ctor: '[]'}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		});
};
var _vito$cadet$GitHubGraph$CrossReferencedEvent = function (a) {
	return {ctor: 'CrossReferencedEvent', _0: a};
};
var _vito$cadet$GitHubGraph$IssueCommentEvent = F2(
	function (a, b) {
		return {ctor: 'IssueCommentEvent', _0: a, _1: b};
	});
var _vito$cadet$GitHubGraph$DateType = {ctor: 'DateType'};
var _vito$cadet$GitHubGraph$issuesQuery = function () {
	var pageInfo = A2(
		_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$with,
		A3(
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$field,
			'hasNextPage',
			{ctor: '[]'},
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$bool),
		A2(
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$with,
			A3(
				_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$field,
				'endCursor',
				{ctor: '[]'},
				_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$nullable(_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$string)),
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$object(_vito$cadet$GitHubGraph$PageInfo)));
	var column = A2(
		_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$with,
		A3(
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$field,
			'name',
			{ctor: '[]'},
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$string),
		A2(
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$with,
			A3(
				_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$field,
				'id',
				{ctor: '[]'},
				_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$string),
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$object(_vito$cadet$GitHubGraph$ProjectColumn)));
	var projectLocation = A2(
		_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$with,
		A3(
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$field,
			'number',
			{ctor: '[]'},
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$int),
		A2(
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$with,
			A3(
				_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$field,
				'name',
				{ctor: '[]'},
				_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$string),
			A2(
				_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$with,
				A3(
					_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$field,
					'url',
					{ctor: '[]'},
					_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$string),
				A2(
					_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$with,
					A3(
						_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$field,
						'id',
						{ctor: '[]'},
						_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$string),
					_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$object(_vito$cadet$GitHubGraph$ProjectLocation)))));
	var projectCard = A2(
		_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$with,
		A3(
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$field,
			'column',
			{ctor: '[]'},
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$nullable(column)),
		A2(
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$with,
			A3(
				_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$field,
				'project',
				{ctor: '[]'},
				projectLocation),
			A2(
				_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$with,
				A3(
					_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$field,
					'id',
					{ctor: '[]'},
					_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$string),
				_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$object(_vito$cadet$GitHubGraph$CardLocation))));
	var label = A2(
		_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$with,
		A3(
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$field,
			'color',
			{ctor: '[]'},
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$string),
		A2(
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$with,
			A3(
				_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$field,
				'name',
				{ctor: '[]'},
				_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$string),
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$object(_vito$cadet$GitHubGraph$Label)));
	var reactionGroup = A2(
		_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$with,
		A3(
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$field,
			'users',
			{ctor: '[]'},
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$extract(
				A3(
					_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$field,
					'totalCount',
					{ctor: '[]'},
					_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$int))),
		A2(
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$with,
			A3(
				_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$field,
				'content',
				{ctor: '[]'},
				_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$enum(_vito$cadet$GitHubGraph$reactionTypes)),
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$object(_vito$cadet$GitHubGraph$ReactionGroup)));
	var author = _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$assume(
		A2(
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$inlineFragment,
			_elm_lang$core$Maybe$Just(
				_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$onType('User')),
			A2(
				_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$with,
				A3(
					_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$field,
					'avatarUrl',
					{ctor: '[]'},
					_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$string),
				A2(
					_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$with,
					A3(
						_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$field,
						'login',
						{ctor: '[]'},
						_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$string),
					A2(
						_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$with,
						A3(
							_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$field,
							'url',
							{ctor: '[]'},
							_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$string),
						A2(
							_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$with,
							A3(
								_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$field,
								'id',
								{ctor: '[]'},
								_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$string),
							_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$object(_vito$cadet$GitHubGraph$User)))))));
	var issue = A2(
		_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$with,
		A3(
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$field,
			'projectCards',
			{
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'first',
					_1: _jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Arg$int(10)
				},
				_1: {ctor: '[]'}
			},
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$extract(
				A3(
					_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$field,
					'nodes',
					{ctor: '[]'},
					_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$list(projectCard)))),
		A2(
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$with,
			A3(
				_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$field,
				'labels',
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'first',
						_1: _jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Arg$int(10)
					},
					_1: {ctor: '[]'}
				},
				_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$extract(
					A3(
						_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$field,
						'nodes',
						{ctor: '[]'},
						_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$list(label)))),
			A2(
				_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$with,
				A3(
					_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$field,
					'author',
					{ctor: '[]'},
					_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$nullable(
						_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$extract(author))),
				A2(
					_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$with,
					A3(
						_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$field,
						'reactionGroups',
						{ctor: '[]'},
						_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$list(reactionGroup)),
					A2(
						_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$with,
						A3(
							_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$field,
							'comments',
							{ctor: '[]'},
							_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$extract(
								A3(
									_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$field,
									'totalCount',
									{ctor: '[]'},
									_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$int))),
						A2(
							_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$with,
							A3(
								_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$field,
								'title',
								{ctor: '[]'},
								_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$string),
							A2(
								_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$with,
								A3(
									_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$field,
									'number',
									{ctor: '[]'},
									_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$int),
								A2(
									_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$with,
									A3(
										_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$field,
										'state',
										{ctor: '[]'},
										_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$enum(_vito$cadet$GitHubGraph$issueStates)),
									A2(
										_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$with,
										A3(
											_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$field,
											'updatedAt',
											{ctor: '[]'},
											A2(_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$customScalar, _vito$cadet$GitHubGraph$DateType, _elm_community$json_extra$Json_Decode_Extra$date)),
										A2(
											_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$with,
											A3(
												_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$field,
												'createdAt',
												{ctor: '[]'},
												A2(_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$customScalar, _vito$cadet$GitHubGraph$DateType, _elm_community$json_extra$Json_Decode_Extra$date)),
											A2(
												_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$with,
												A3(
													_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$field,
													'url',
													{ctor: '[]'},
													_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$string),
												A2(
													_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$with,
													A3(
														_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$field,
														'id',
														{ctor: '[]'},
														_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$string),
													_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$object(_vito$cadet$GitHubGraph$Issue)))))))))))));
	var paged = A2(
		_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$with,
		A3(
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$field,
			'pageInfo',
			{ctor: '[]'},
			pageInfo),
		A2(
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$with,
			A3(
				_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$field,
				'nodes',
				{ctor: '[]'},
				_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$list(issue)),
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$object(_vito$cadet$GitHubGraph$PagedResult)));
	var afterVar = A3(
		_jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Variable$required,
		'after',
		function (_) {
			return _.after;
		},
		_jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Variable$nullable(_jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Variable$string));
	var pageArgs = {
		ctor: '::',
		_0: {
			ctor: '_Tuple2',
			_0: 'first',
			_1: _jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Arg$int(100)
		},
		_1: {
			ctor: '::',
			_0: {
				ctor: '_Tuple2',
				_0: 'states',
				_1: _jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Arg$list(
					{
						ctor: '::',
						_0: _jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Arg$enum('OPEN'),
						_1: {ctor: '[]'}
					})
			},
			_1: {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'after',
					_1: _jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Arg$variable(afterVar)
				},
				_1: {ctor: '[]'}
			}
		}
	};
	var repoNameVar = A3(
		_jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Variable$required,
		'repoName',
		function (_p27) {
			return function (_) {
				return _.name;
			}(
				function (_) {
					return _.selector;
				}(_p27));
		},
		_jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Variable$string);
	var orgNameVar = A3(
		_jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Variable$required,
		'orgName',
		function (_p28) {
			return function (_) {
				return _.owner;
			}(
				function (_) {
					return _.selector;
				}(_p28));
		},
		_jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Variable$string);
	var queryRoot = _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$extract(
		A3(
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$field,
			'repository',
			{
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'owner',
					_1: _jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Arg$variable(orgNameVar)
				},
				_1: {
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'name',
						_1: _jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Arg$variable(repoNameVar)
					},
					_1: {ctor: '[]'}
				}
			},
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$extract(
				A3(_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$field, 'issues', pageArgs, paged))));
	return _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$queryDocument(queryRoot);
}();
var _vito$cadet$GitHubGraph$fetchRepoIssues = F2(
	function (token, repo) {
		return A3(
			_vito$cadet$GitHubGraph$fetchPaged,
			_vito$cadet$GitHubGraph$issuesQuery,
			token,
			{selector: repo, after: _elm_lang$core$Maybe$Nothing});
	});
var _vito$cadet$GitHubGraph$pullRequestsQuery = function () {
	var pageInfo = A2(
		_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$with,
		A3(
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$field,
			'hasNextPage',
			{ctor: '[]'},
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$bool),
		A2(
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$with,
			A3(
				_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$field,
				'endCursor',
				{ctor: '[]'},
				_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$nullable(_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$string)),
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$object(_vito$cadet$GitHubGraph$PageInfo)));
	var column = A2(
		_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$with,
		A3(
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$field,
			'name',
			{ctor: '[]'},
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$string),
		A2(
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$with,
			A3(
				_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$field,
				'id',
				{ctor: '[]'},
				_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$string),
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$object(_vito$cadet$GitHubGraph$ProjectColumn)));
	var projectLocation = A2(
		_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$with,
		A3(
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$field,
			'number',
			{ctor: '[]'},
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$int),
		A2(
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$with,
			A3(
				_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$field,
				'name',
				{ctor: '[]'},
				_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$string),
			A2(
				_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$with,
				A3(
					_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$field,
					'url',
					{ctor: '[]'},
					_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$string),
				A2(
					_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$with,
					A3(
						_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$field,
						'id',
						{ctor: '[]'},
						_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$string),
					_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$object(_vito$cadet$GitHubGraph$ProjectLocation)))));
	var projectCard = A2(
		_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$with,
		A3(
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$field,
			'column',
			{ctor: '[]'},
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$nullable(column)),
		A2(
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$with,
			A3(
				_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$field,
				'project',
				{ctor: '[]'},
				projectLocation),
			A2(
				_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$with,
				A3(
					_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$field,
					'id',
					{ctor: '[]'},
					_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$string),
				_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$object(_vito$cadet$GitHubGraph$CardLocation))));
	var label = A2(
		_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$with,
		A3(
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$field,
			'color',
			{ctor: '[]'},
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$string),
		A2(
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$with,
			A3(
				_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$field,
				'name',
				{ctor: '[]'},
				_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$string),
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$object(_vito$cadet$GitHubGraph$Label)));
	var reactionGroup = A2(
		_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$with,
		A3(
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$field,
			'users',
			{ctor: '[]'},
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$extract(
				A3(
					_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$field,
					'totalCount',
					{ctor: '[]'},
					_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$int))),
		A2(
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$with,
			A3(
				_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$field,
				'content',
				{ctor: '[]'},
				_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$enum(_vito$cadet$GitHubGraph$reactionTypes)),
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$object(_vito$cadet$GitHubGraph$ReactionGroup)));
	var author = _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$assume(
		A2(
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$inlineFragment,
			_elm_lang$core$Maybe$Just(
				_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$onType('User')),
			A2(
				_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$with,
				A3(
					_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$field,
					'avatarUrl',
					{ctor: '[]'},
					_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$string),
				A2(
					_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$with,
					A3(
						_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$field,
						'login',
						{ctor: '[]'},
						_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$string),
					A2(
						_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$with,
						A3(
							_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$field,
							'url',
							{ctor: '[]'},
							_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$string),
						A2(
							_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$with,
							A3(
								_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$field,
								'id',
								{ctor: '[]'},
								_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$string),
							_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$object(_vito$cadet$GitHubGraph$User)))))));
	var issue = A2(
		_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$with,
		A3(
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$field,
			'deletions',
			{ctor: '[]'},
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$int),
		A2(
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$with,
			A3(
				_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$field,
				'additions',
				{ctor: '[]'},
				_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$int),
			A2(
				_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$with,
				A3(
					_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$field,
					'projectCards',
					{
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'first',
							_1: _jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Arg$int(10)
						},
						_1: {ctor: '[]'}
					},
					_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$extract(
						A3(
							_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$field,
							'nodes',
							{ctor: '[]'},
							_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$list(projectCard)))),
				A2(
					_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$with,
					A3(
						_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$field,
						'labels',
						{
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: 'first',
								_1: _jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Arg$int(10)
							},
							_1: {ctor: '[]'}
						},
						_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$extract(
							A3(
								_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$field,
								'nodes',
								{ctor: '[]'},
								_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$list(label)))),
					A2(
						_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$with,
						A3(
							_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$field,
							'author',
							{ctor: '[]'},
							_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$nullable(
								_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$extract(author))),
						A2(
							_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$with,
							A3(
								_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$field,
								'reactionGroups',
								{ctor: '[]'},
								_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$list(reactionGroup)),
							A2(
								_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$with,
								A3(
									_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$field,
									'comments',
									{ctor: '[]'},
									_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$extract(
										A3(
											_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$field,
											'totalCount',
											{ctor: '[]'},
											_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$int))),
								A2(
									_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$with,
									A3(
										_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$field,
										'title',
										{ctor: '[]'},
										_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$string),
									A2(
										_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$with,
										A3(
											_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$field,
											'number',
											{ctor: '[]'},
											_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$int),
										A2(
											_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$with,
											A3(
												_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$field,
												'state',
												{ctor: '[]'},
												_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$enum(_vito$cadet$GitHubGraph$pullRequestStates)),
											A2(
												_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$with,
												A3(
													_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$field,
													'updatedAt',
													{ctor: '[]'},
													A2(_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$customScalar, _vito$cadet$GitHubGraph$DateType, _elm_community$json_extra$Json_Decode_Extra$date)),
												A2(
													_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$with,
													A3(
														_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$field,
														'createdAt',
														{ctor: '[]'},
														A2(_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$customScalar, _vito$cadet$GitHubGraph$DateType, _elm_community$json_extra$Json_Decode_Extra$date)),
													A2(
														_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$with,
														A3(
															_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$field,
															'url',
															{ctor: '[]'},
															_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$string),
														A2(
															_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$with,
															A3(
																_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$field,
																'id',
																{ctor: '[]'},
																_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$string),
															_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$object(_vito$cadet$GitHubGraph$PullRequest)))))))))))))));
	var paged = A2(
		_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$with,
		A3(
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$field,
			'pageInfo',
			{ctor: '[]'},
			pageInfo),
		A2(
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$with,
			A3(
				_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$field,
				'nodes',
				{ctor: '[]'},
				_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$list(issue)),
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$object(_vito$cadet$GitHubGraph$PagedResult)));
	var afterVar = A3(
		_jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Variable$required,
		'after',
		function (_) {
			return _.after;
		},
		_jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Variable$nullable(_jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Variable$string));
	var pageArgs = {
		ctor: '::',
		_0: {
			ctor: '_Tuple2',
			_0: 'first',
			_1: _jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Arg$int(100)
		},
		_1: {
			ctor: '::',
			_0: {
				ctor: '_Tuple2',
				_0: 'states',
				_1: _jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Arg$list(
					{
						ctor: '::',
						_0: _jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Arg$enum('OPEN'),
						_1: {ctor: '[]'}
					})
			},
			_1: {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'after',
					_1: _jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Arg$variable(afterVar)
				},
				_1: {ctor: '[]'}
			}
		}
	};
	var repoNameVar = A3(
		_jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Variable$required,
		'repoName',
		function (_p29) {
			return function (_) {
				return _.name;
			}(
				function (_) {
					return _.selector;
				}(_p29));
		},
		_jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Variable$string);
	var orgNameVar = A3(
		_jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Variable$required,
		'orgName',
		function (_p30) {
			return function (_) {
				return _.owner;
			}(
				function (_) {
					return _.selector;
				}(_p30));
		},
		_jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Variable$string);
	var queryRoot = _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$extract(
		A3(
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$field,
			'repository',
			{
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'owner',
					_1: _jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Arg$variable(orgNameVar)
				},
				_1: {
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'name',
						_1: _jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Arg$variable(repoNameVar)
					},
					_1: {ctor: '[]'}
				}
			},
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$extract(
				A3(_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$field, 'pullRequests', pageArgs, paged))));
	return _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$queryDocument(queryRoot);
}();
var _vito$cadet$GitHubGraph$fetchRepoPullRequests = F2(
	function (token, repo) {
		return A3(
			_vito$cadet$GitHubGraph$fetchPaged,
			_vito$cadet$GitHubGraph$pullRequestsQuery,
			token,
			{selector: repo, after: _elm_lang$core$Maybe$Nothing});
	});
var _vito$cadet$GitHubGraph$timelineQuery = function () {
	var pageInfo = A2(
		_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$with,
		A3(
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$field,
			'hasNextPage',
			{ctor: '[]'},
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$bool),
		A2(
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$with,
			A3(
				_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$field,
				'endCursor',
				{ctor: '[]'},
				_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$nullable(_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$string)),
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$object(_vito$cadet$GitHubGraph$PageInfo)));
	var sourceID = A2(
		_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$with,
		A2(
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$inlineFragment,
			_elm_lang$core$Maybe$Just(
				_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$onType('PullRequest')),
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$extract(
				A3(
					_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$field,
					'id',
					{ctor: '[]'},
					_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$string))),
		A2(
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$with,
			A2(
				_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$inlineFragment,
				_elm_lang$core$Maybe$Just(
					_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$onType('Issue')),
				_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$extract(
					A3(
						_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$field,
						'id',
						{ctor: '[]'},
						_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$string))),
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$object(_vito$cadet$GitHubGraph$pickEnum2)));
	var crossReferencedEvent = A2(
		_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$with,
		_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$assume(
			A3(
				_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$field,
				'source',
				{ctor: '[]'},
				sourceID)),
		_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$object(_vito$cadet$GitHubGraph$CrossReferencedEvent));
	var author = _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$assume(
		A2(
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$inlineFragment,
			_elm_lang$core$Maybe$Just(
				_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$onType('User')),
			A2(
				_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$with,
				A3(
					_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$field,
					'avatarUrl',
					{ctor: '[]'},
					_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$string),
				A2(
					_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$with,
					A3(
						_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$field,
						'login',
						{ctor: '[]'},
						_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$string),
					A2(
						_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$with,
						A3(
							_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$field,
							'url',
							{ctor: '[]'},
							_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$string),
						A2(
							_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$with,
							A3(
								_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$field,
								'id',
								{ctor: '[]'},
								_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$string),
							_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$object(_vito$cadet$GitHubGraph$User)))))));
	var issueCommentEvent = A2(
		_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$with,
		A3(
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$field,
			'createdAt',
			{ctor: '[]'},
			A2(_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$customScalar, _vito$cadet$GitHubGraph$DateType, _elm_community$json_extra$Json_Decode_Extra$date)),
		A2(
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$with,
			A3(
				_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$field,
				'author',
				{ctor: '[]'},
				_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$nullable(
					_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$extract(author))),
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$object(_vito$cadet$GitHubGraph$IssueCommentEvent)));
	var event = A2(
		_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$with,
		A2(
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$inlineFragment,
			_elm_lang$core$Maybe$Just(
				_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$onType('CrossReferencedEvent')),
			crossReferencedEvent),
		A2(
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$with,
			A2(
				_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$inlineFragment,
				_elm_lang$core$Maybe$Just(
					_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$onType('IssueComment')),
				issueCommentEvent),
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$object(_vito$cadet$GitHubGraph$pickEnum2)));
	var paged = A2(
		_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$with,
		A3(
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$field,
			'pageInfo',
			{ctor: '[]'},
			pageInfo),
		A2(
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$with,
			A3(
				_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$field,
				'nodes',
				{ctor: '[]'},
				A2(
					_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$map,
					_elm_lang$core$List$filterMap(_elm_lang$core$Basics$identity),
					_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$list(event))),
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$object(_vito$cadet$GitHubGraph$PagedResult)));
	var afterVar = A3(
		_jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Variable$required,
		'after',
		function (_) {
			return _.after;
		},
		_jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Variable$nullable(_jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Variable$string));
	var pageArgs = {
		ctor: '::',
		_0: {
			ctor: '_Tuple2',
			_0: 'first',
			_1: _jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Arg$int(100)
		},
		_1: {
			ctor: '::',
			_0: {
				ctor: '_Tuple2',
				_0: 'after',
				_1: _jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Arg$variable(afterVar)
			},
			_1: {ctor: '[]'}
		}
	};
	var timeline = _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$extract(
		A3(_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$field, 'timeline', pageArgs, paged));
	var issueOrPRTimeline = A2(
		_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$with,
		A2(
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$inlineFragment,
			_elm_lang$core$Maybe$Just(
				_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$onType('PullRequest')),
			timeline),
		A2(
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$with,
			A2(
				_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$inlineFragment,
				_elm_lang$core$Maybe$Just(
					_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$onType('Issue')),
				timeline),
			_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$object(_vito$cadet$GitHubGraph$pickEnum2)));
	var issueIdVar = A3(
		_jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Variable$required,
		'issueId',
		function (_p31) {
			return function (_) {
				return _.id;
			}(
				function (_) {
					return _.selector;
				}(_p31));
		},
		_jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Variable$id);
	var queryRoot = _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$extract(
		_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$assume(
			A3(
				_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$field,
				'node',
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'id',
						_1: _jamesmacaulay$elm_graphql$GraphQL_Request_Builder_Arg$variable(issueIdVar)
					},
					_1: {ctor: '[]'}
				},
				issueOrPRTimeline)));
	return _jamesmacaulay$elm_graphql$GraphQL_Request_Builder$queryDocument(queryRoot);
}();
var _vito$cadet$GitHubGraph$fetchTimeline = F2(
	function (token, issue) {
		return A3(
			_vito$cadet$GitHubGraph$fetchPaged,
			_vito$cadet$GitHubGraph$timelineQuery,
			token,
			{selector: issue, after: _elm_lang$core$Maybe$Nothing});
	});

var _vito$cadet$Backend$encodeActorEvent = function (_p0) {
	var _p1 = _p0;
	return _elm_lang$core$Json_Encode$object(
		{
			ctor: '::',
			_0: {
				ctor: '_Tuple2',
				_0: 'actor',
				_1: _vito$cadet$GitHubGraph$encodeUser(_p1.actor)
			},
			_1: {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'createdAt',
					_1: _elm_lang$core$Json_Encode$string(
						_elm_lang$core$Basics$toString(_p1.createdAt))
				},
				_1: {ctor: '[]'}
			}
		});
};
var _vito$cadet$Backend$emptyData = {
	issues: _elm_lang$core$Dict$empty,
	prs: _elm_lang$core$Dict$empty,
	references: _elm_lang$core$Dict$empty,
	actors: _elm_lang$core$Dict$empty,
	projects: {ctor: '[]'},
	cards: _elm_lang$core$Dict$empty
};
var _vito$cadet$Backend$Data = F6(
	function (a, b, c, d, e, f) {
		return {issues: a, prs: b, references: c, actors: d, projects: e, cards: f};
	});
var _vito$cadet$Backend$Me = F2(
	function (a, b) {
		return {token: a, user: b};
	});
var _vito$cadet$Backend$User = F4(
	function (a, b, c, d) {
		return {id: a, login: b, url: c, avatar: d};
	});
var _vito$cadet$Backend$decodeUser = A2(
	_elm_community$json_extra$Json_Decode_Extra_ops['|:'],
	A2(
		_elm_community$json_extra$Json_Decode_Extra_ops['|:'],
		A2(
			_elm_community$json_extra$Json_Decode_Extra_ops['|:'],
			A2(
				_elm_community$json_extra$Json_Decode_Extra_ops['|:'],
				_elm_lang$core$Json_Decode$succeed(_vito$cadet$Backend$User),
				A2(_elm_lang$core$Json_Decode$field, 'id', _elm_lang$core$Json_Decode$int)),
			A2(_elm_lang$core$Json_Decode$field, 'login', _elm_lang$core$Json_Decode$string)),
		A2(_elm_lang$core$Json_Decode$field, 'html_url', _elm_lang$core$Json_Decode$string)),
	A2(_elm_lang$core$Json_Decode$field, 'avatar_url', _elm_lang$core$Json_Decode$string));
var _vito$cadet$Backend$decodeMe = A2(
	_elm_community$json_extra$Json_Decode_Extra_ops['|:'],
	A2(
		_elm_community$json_extra$Json_Decode_Extra_ops['|:'],
		_elm_lang$core$Json_Decode$succeed(_vito$cadet$Backend$Me),
		A2(_elm_lang$core$Json_Decode$field, 'token', _elm_lang$core$Json_Decode$string)),
	A2(_elm_lang$core$Json_Decode$field, 'user', _vito$cadet$Backend$decodeUser));
var _vito$cadet$Backend$fetchMe = function (f) {
	return A2(
		_elm_lang$core$Task$attempt,
		f,
		_lukewestby$elm_http_builder$HttpBuilder$toTask(
			A2(
				_lukewestby$elm_http_builder$HttpBuilder$withExpect,
				_elm_lang$http$Http$expectJson(_vito$cadet$Backend$decodeMe),
				_lukewestby$elm_http_builder$HttpBuilder$get('/me'))));
};
var _vito$cadet$Backend$ActorEvent = F2(
	function (a, b) {
		return {actor: a, createdAt: b};
	});
var _vito$cadet$Backend$decodeActorEvent = A2(
	_elm_community$json_extra$Json_Decode_Extra_ops['|:'],
	A2(
		_elm_community$json_extra$Json_Decode_Extra_ops['|:'],
		_elm_lang$core$Json_Decode$succeed(_vito$cadet$Backend$ActorEvent),
		A2(_elm_lang$core$Json_Decode$field, 'actor', _vito$cadet$GitHubGraph$decodeUser)),
	A2(_elm_lang$core$Json_Decode$field, 'createdAt', _elm_community$json_extra$Json_Decode_Extra$date));
var _vito$cadet$Backend$decodeData = A2(
	_elm_community$json_extra$Json_Decode_Extra_ops['|:'],
	A2(
		_elm_community$json_extra$Json_Decode_Extra_ops['|:'],
		A2(
			_elm_community$json_extra$Json_Decode_Extra_ops['|:'],
			A2(
				_elm_community$json_extra$Json_Decode_Extra_ops['|:'],
				A2(
					_elm_community$json_extra$Json_Decode_Extra_ops['|:'],
					A2(
						_elm_community$json_extra$Json_Decode_Extra_ops['|:'],
						_elm_lang$core$Json_Decode$succeed(_vito$cadet$Backend$Data),
						A2(
							_elm_lang$core$Json_Decode$field,
							'issues',
							_elm_lang$core$Json_Decode$dict(
								_elm_lang$core$Json_Decode$list(_vito$cadet$GitHubGraph$decodeIssue)))),
					A2(
						_elm_lang$core$Json_Decode$field,
						'prs',
						_elm_lang$core$Json_Decode$dict(
							_elm_lang$core$Json_Decode$list(_vito$cadet$GitHubGraph$decodePullRequest)))),
				A2(
					_elm_lang$core$Json_Decode$field,
					'references',
					_elm_lang$core$Json_Decode$dict(
						_elm_lang$core$Json_Decode$list(_elm_lang$core$Json_Decode$string)))),
			A2(
				_elm_lang$core$Json_Decode$field,
				'actors',
				_elm_lang$core$Json_Decode$dict(
					_elm_lang$core$Json_Decode$list(_vito$cadet$Backend$decodeActorEvent)))),
		A2(
			_elm_lang$core$Json_Decode$field,
			'projects',
			_elm_lang$core$Json_Decode$list(_vito$cadet$GitHubGraph$decodeProject))),
	A2(
		_elm_lang$core$Json_Decode$field,
		'cards',
		_elm_lang$core$Json_Decode$dict(
			_elm_lang$core$Json_Decode$list(_vito$cadet$GitHubGraph$decodeProjectColumnCard))));
var _vito$cadet$Backend$fetchData = function (f) {
	return A2(
		_elm_lang$core$Task$attempt,
		f,
		_lukewestby$elm_http_builder$HttpBuilder$toTask(
			A2(
				_lukewestby$elm_http_builder$HttpBuilder$withExpect,
				_elm_lang$http$Http$expectJson(_vito$cadet$Backend$decodeData),
				_lukewestby$elm_http_builder$HttpBuilder$get('/data'))));
};

var _vito$cadet$ForceGraph$updateContextWithValue = F2(
	function (nodeCtx, value) {
		var node = nodeCtx.node;
		var label = node.label;
		return _elm_lang$core$Native_Utils.update(
			nodeCtx,
			{
				node: _elm_lang$core$Native_Utils.update(
					node,
					{label: value})
			});
	});
var _vito$cadet$ForceGraph$updateGraphWithList = function () {
	var graphUpdater = function (value) {
		return _elm_lang$core$Maybe$map(
			function (ctx) {
				return A2(_vito$cadet$ForceGraph$updateContextWithValue, ctx, value);
			});
	};
	return _elm_lang$core$List$foldr(
		function (node) {
			return A2(
				_elm_community$graph$Graph$update,
				node.id,
				graphUpdater(node));
		});
}();
var _vito$cadet$ForceGraph$isCompleted = function (_p0) {
	return _gampleman$elm_visualization$Visualization_Force$isCompleted(
		function (_) {
			return _.simulation;
		}(_p0));
};
var _vito$cadet$ForceGraph$tick = function (_p1) {
	var _p2 = _p1;
	var _p4 = _p2.graph;
	var _p3 = A2(
		_gampleman$elm_visualization$Visualization_Force$tick,
		_p2.simulation,
		A2(
			_elm_lang$core$List$map,
			function (_) {
				return _.label;
			},
			_elm_community$graph$Graph$nodes(_p4)));
	var newState = _p3._0;
	var list = _p3._1;
	return {
		graph: A2(_vito$cadet$ForceGraph$updateGraphWithList, _p4, list),
		simulation: newState
	};
};
var _vito$cadet$ForceGraph$simulate = F2(
	function (num, fg) {
		simulate:
		while (true) {
			if (_elm_lang$core$Native_Utils.eq(num, 0)) {
				return fg;
			} else {
				var _v1 = num - 1,
					_v2 = _vito$cadet$ForceGraph$tick(fg);
				num = _v1;
				fg = _v2;
				continue simulate;
			}
		}
	});
var _vito$cadet$ForceGraph$node = function (nc) {
	var canvas = 500;
	var node = nc.node;
	var _p5 = A2(
		_elm_lang$core$Random$step,
		A2(_elm_lang$core$Random$float, 0, canvas),
		_elm_lang$core$Random$initialSeed(node.id));
	var x = _p5._0;
	var s2 = _p5._1;
	var _p6 = A2(
		_elm_lang$core$Random$step,
		A2(_elm_lang$core$Random$float, 0, canvas),
		s2);
	var y = _p6._0;
	var s3 = _p6._1;
	return _elm_lang$core$Native_Utils.update(
		nc,
		{
			node: _elm_lang$core$Native_Utils.update(
				node,
				{
					label: {x: x, y: y, vx: 0.0, vy: 0.0, id: node.id, value: node.label}
				})
		});
};
var _vito$cadet$ForceGraph$update = F3(
	function (id, f, fg) {
		return _elm_lang$core$Native_Utils.update(
			fg,
			{
				graph: A3(
					_elm_community$graph$Graph$update,
					id,
					_elm_lang$core$Maybe$map(
						function (nc) {
							var node = nc.node;
							var label = node.label;
							var value = label.value;
							return _elm_lang$core$Native_Utils.update(
								nc,
								{
									node: _elm_lang$core$Native_Utils.update(
										node,
										{
											label: _elm_lang$core$Native_Utils.update(
												label,
												{
													value: f(value)
												})
										})
								});
						}),
					fg.graph)
			});
	});
var _vito$cadet$ForceGraph$member = function (id) {
	return function (_p7) {
		return A2(
			_elm_community$graph$Graph$member,
			id,
			function (_) {
				return _.graph;
			}(_p7));
	};
};
var _vito$cadet$ForceGraph$fromGraph = function (g) {
	var graph = A2(_elm_community$graph$Graph$mapContexts, _vito$cadet$ForceGraph$node, g);
	var link = function (_p8) {
		var _p9 = _p8;
		var _p13 = _p9.to;
		var _p12 = _p9.from;
		var distance = function () {
			var _p10 = {
				ctor: '_Tuple2',
				_0: A2(_elm_community$graph$Graph$get, _p12, graph),
				_1: A2(_elm_community$graph$Graph$get, _p13, graph)
			};
			if (((_p10.ctor === '_Tuple2') && (_p10._0.ctor === 'Just')) && (_p10._1.ctor === 'Just')) {
				return 40 + (A2(
					_elm_lang$core$Basics$max,
					_elm_community$intdict$IntDict$size(_p10._1._0.incoming),
					_elm_community$intdict$IntDict$size(_p10._0._0.outgoing)) * 5);
			} else {
				return _elm_lang$core$Native_Utils.crashCase(
					'ForceGraph',
					{
						start: {line: 28, column: 21},
						end: {line: 33, column: 69}
					},
					_p10)('impossible: unknown target');
			}
		}();
		return {
			source: _p12,
			target: _p13,
			distance: _elm_lang$core$Basics$toFloat(distance),
			strength: _elm_lang$core$Maybe$Nothing
		};
	};
	var forces = {
		ctor: '::',
		_0: A2(
			_gampleman$elm_visualization$Visualization_Force$customLinks,
			1,
			A2(
				_elm_lang$core$List$map,
				link,
				_elm_community$graph$Graph$edges(graph))),
		_1: {
			ctor: '::',
			_0: A2(
				_gampleman$elm_visualization$Visualization_Force$manyBodyStrength,
				-120,
				A2(
					_elm_lang$core$List$map,
					function (_) {
						return _.id;
					},
					_elm_community$graph$Graph$nodes(graph))),
			_1: {ctor: '[]'}
		}
	};
	var newSimulation = A2(
		_gampleman$elm_visualization$Visualization_Force$iterations,
		_elm_community$graph$Graph$size(graph) * 10,
		_gampleman$elm_visualization$Visualization_Force$simulation(forces));
	return A2(
		_vito$cadet$ForceGraph$simulate,
		10,
		{graph: graph, simulation: newSimulation});
};
var _vito$cadet$ForceGraph$ForceGraph = F2(
	function (a, b) {
		return {graph: a, simulation: b};
	});

var _vito$cadet$Hash$updateHash = F2(
	function (c, h) {
		return ((5 << h) + h) + _elm_lang$core$Char$toCode(c);
	});
var _vito$cadet$Hash$hash = function (str) {
	return A3(_elm_lang$core$String$foldl, _vito$cadet$Hash$updateHash, 5381, str);
};

var _vito$cadet$StrictEvents$customDecoder = F2(
	function (decoder, toResult) {
		return A2(
			_elm_lang$core$Json_Decode$andThen,
			function (a) {
				var _p0 = toResult(a);
				if (_p0.ctor === 'Ok') {
					return _elm_lang$core$Json_Decode$succeed(_p0._0);
				} else {
					return _elm_lang$core$Json_Decode$fail(_p0._0);
				}
			},
			decoder);
	});
var _vito$cadet$StrictEvents$assertLeftButton = A2(
	_vito$cadet$StrictEvents$customDecoder,
	A2(_elm_lang$core$Json_Decode$field, 'button', _elm_lang$core$Json_Decode$int),
	function (button) {
		return _elm_lang$core$Native_Utils.eq(button, 0) ? _elm_lang$core$Result$Ok(
			{ctor: '_Tuple0'}) : _elm_lang$core$Result$Err('not left button');
	});
var _vito$cadet$StrictEvents$assertNo = function (prop) {
	return A2(
		_vito$cadet$StrictEvents$customDecoder,
		A2(_elm_lang$core$Json_Decode$field, prop, _elm_lang$core$Json_Decode$bool),
		function (val) {
			return (!val) ? _elm_lang$core$Result$Ok(
				{ctor: '_Tuple0'}) : _elm_lang$core$Result$Err(
				A2(_elm_lang$core$Basics_ops['++'], prop, ' used - skipping'));
		});
};
var _vito$cadet$StrictEvents$assertNoModifier = A2(
	_elm_lang$core$Json_Decode$andThen,
	function (_p1) {
		return A2(
			_elm_lang$core$Json_Decode$andThen,
			function (_p2) {
				return A2(
					_elm_lang$core$Json_Decode$andThen,
					function (_p3) {
						return _vito$cadet$StrictEvents$assertNo('shiftKey');
					},
					_vito$cadet$StrictEvents$assertNo('metaKey'));
			},
			_vito$cadet$StrictEvents$assertNo('altKey'));
	},
	_vito$cadet$StrictEvents$assertNo('ctrlKey'));
var _vito$cadet$StrictEvents$determineClickMsg = F2(
	function (clickMsg, shiftClickMsg) {
		return A2(
			_vito$cadet$StrictEvents$customDecoder,
			A2(_elm_lang$core$Json_Decode$field, 'shiftKey', _elm_lang$core$Json_Decode$bool),
			function (shiftKey) {
				return shiftKey ? _elm_lang$core$Result$Ok(shiftClickMsg) : _elm_lang$core$Result$Ok(clickMsg);
			});
	});
var _vito$cadet$StrictEvents$onLeftMouseDownCapturing = F2(
	function (captured, msg) {
		return A3(
			_elm_lang$html$Html_Events$onWithOptions,
			'mousedown',
			{stopPropagation: false, preventDefault: true},
			A2(
				_elm_lang$core$Json_Decode$andThen,
				function (_p4) {
					return A2(
						_elm_lang$core$Json_Decode$andThen,
						function (_p5) {
							return A2(_elm_lang$core$Json_Decode$map, msg, captured);
						},
						_vito$cadet$StrictEvents$assertLeftButton);
				},
				_vito$cadet$StrictEvents$assertNoModifier));
	});
var _vito$cadet$StrictEvents$onLeftMouseDown = function (msg) {
	return A2(
		_vito$cadet$StrictEvents$onLeftMouseDownCapturing,
		_elm_lang$core$Json_Decode$succeed(
			{ctor: '_Tuple0'}),
		_elm_lang$core$Basics$always(msg));
};
var _vito$cadet$StrictEvents$onLeftClickOrShiftLeftClick = F2(
	function (msg, shiftMsg) {
		return A3(
			_elm_lang$html$Html_Events$onWithOptions,
			'click',
			{stopPropagation: false, preventDefault: true},
			A2(
				_elm_lang$core$Json_Decode$andThen,
				function (_p6) {
					return A2(
						_elm_lang$core$Json_Decode$andThen,
						function (_p7) {
							return A2(
								_elm_lang$core$Json_Decode$andThen,
								function (_p8) {
									return A2(
										_elm_lang$core$Json_Decode$andThen,
										function (_p9) {
											return A2(_vito$cadet$StrictEvents$determineClickMsg, msg, shiftMsg);
										},
										_vito$cadet$StrictEvents$assertNo('metaKey'));
								},
								_vito$cadet$StrictEvents$assertNo('altKey'));
						},
						_vito$cadet$StrictEvents$assertNo('ctrlKey'));
				},
				_vito$cadet$StrictEvents$assertLeftButton));
	});
var _vito$cadet$StrictEvents$onLeftClickCapturing = F3(
	function (preventDefault, captured, msg) {
		return A3(
			_elm_lang$html$Html_Events$onWithOptions,
			'click',
			{stopPropagation: false, preventDefault: preventDefault},
			A2(
				_elm_lang$core$Json_Decode$andThen,
				function (_p10) {
					return A2(
						_elm_lang$core$Json_Decode$andThen,
						function (_p11) {
							return A2(_elm_lang$core$Json_Decode$map, msg, captured);
						},
						_vito$cadet$StrictEvents$assertLeftButton);
				},
				_vito$cadet$StrictEvents$assertNoModifier));
	});
var _vito$cadet$StrictEvents$onLeftClickNoPreventDefault = function (msg) {
	return A3(
		_vito$cadet$StrictEvents$onLeftClickCapturing,
		false,
		_elm_lang$core$Json_Decode$succeed(
			{ctor: '_Tuple0'}),
		_elm_lang$core$Basics$always(msg));
};
var _vito$cadet$StrictEvents$onLeftClick = function (msg) {
	return A3(
		_vito$cadet$StrictEvents$onLeftClickCapturing,
		true,
		_elm_lang$core$Json_Decode$succeed(
			{ctor: '_Tuple0'}),
		_elm_lang$core$Basics$always(msg));
};
var _vito$cadet$StrictEvents$MouseWheelEvent = F2(
	function (a, b) {
		return {deltaX: a, deltaY: b};
	});
var _vito$cadet$StrictEvents$decodeMouseWheelEvent = A3(
	_elm_lang$core$Json_Decode$map2,
	_vito$cadet$StrictEvents$MouseWheelEvent,
	A2(_elm_lang$core$Json_Decode$field, 'deltaX', _elm_lang$core$Json_Decode$float),
	A2(_elm_lang$core$Json_Decode$field, 'deltaY', _elm_lang$core$Json_Decode$float));
var _vito$cadet$StrictEvents$onMouseWheel = function (cons) {
	return A3(
		_elm_lang$html$Html_Events$onWithOptions,
		'mousewheel',
		{stopPropagation: false, preventDefault: true},
		A2(_elm_lang$core$Json_Decode$map, cons, _vito$cadet$StrictEvents$decodeMouseWheelEvent));
};
var _vito$cadet$StrictEvents$ScrollState = F3(
	function (a, b, c) {
		return {scrollHeight: a, scrollTop: b, clientHeight: c};
	});
var _vito$cadet$StrictEvents$decodeScrollEvent = A4(
	_elm_lang$core$Json_Decode$map3,
	_vito$cadet$StrictEvents$ScrollState,
	A2(
		_elm_lang$core$Json_Decode$at,
		{
			ctor: '::',
			_0: 'target',
			_1: {
				ctor: '::',
				_0: 'scrollHeight',
				_1: {ctor: '[]'}
			}
		},
		_elm_lang$core$Json_Decode$float),
	A2(
		_elm_lang$core$Json_Decode$at,
		{
			ctor: '::',
			_0: 'target',
			_1: {
				ctor: '::',
				_0: 'scrollTop',
				_1: {ctor: '[]'}
			}
		},
		_elm_lang$core$Json_Decode$float),
	A2(
		_elm_lang$core$Json_Decode$at,
		{
			ctor: '::',
			_0: 'target',
			_1: {
				ctor: '::',
				_0: 'clientHeight',
				_1: {ctor: '[]'}
			}
		},
		_elm_lang$core$Json_Decode$float));
var _vito$cadet$StrictEvents$onScroll = function (cons) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'scroll',
		A2(_elm_lang$core$Json_Decode$map, cons, _vito$cadet$StrictEvents$decodeScrollEvent));
};

var _vito$cadet$Main$nodeBounds = function (nc) {
	var y = nc.node.label.y;
	var x = nc.node.label.x;
	return nc.node.label.value.bounds(
		{x: x, y: y});
};
var _vito$cadet$Main$subEdges = function (edges) {
	var edgesContains = function (nodeId) {
		return _elm_lang$core$List$any(
			function (_p0) {
				var _p1 = _p0;
				return _elm_lang$core$Native_Utils.eq(_p1.from, nodeId) || _elm_lang$core$Native_Utils.eq(_p1.to, nodeId);
			});
	};
	var go = F2(
		function (edges, acc) {
			go:
			while (true) {
				var _p2 = edges;
				if (_p2.ctor === '[]') {
					return acc;
				} else {
					var _p6 = _p2._1;
					var _p5 = _p2._0;
					var hasNeither = A2(
						_elm_lang$core$List$filter,
						function (es) {
							return (!A2(edgesContains, _p5.from, es)) && (!A2(edgesContains, _p5.to, es));
						},
						acc);
					var hasTo = A2(
						_elm_lang$core$List$filter,
						edgesContains(_p5.to),
						acc);
					var hasFrom = A2(
						_elm_lang$core$List$filter,
						edgesContains(_p5.from),
						acc);
					var _p3 = {ctor: '_Tuple2', _0: hasFrom, _1: hasTo};
					_v2_4:
					do {
						if (_p3.ctor === '_Tuple2') {
							if (_p3._0.ctor === '::') {
								if (_p3._0._1.ctor === '[]') {
									if (_p3._1.ctor === '::') {
										if (_p3._1._1.ctor === '[]') {
											var _v3 = _p6,
												_v4 = {
												ctor: '::',
												_0: {
													ctor: '::',
													_0: _p5,
													_1: A2(_elm_lang$core$Basics_ops['++'], _p3._0._0, _p3._1._0)
												},
												_1: hasNeither
											};
											edges = _v3;
											acc = _v4;
											continue go;
										} else {
											break _v2_4;
										}
									} else {
										var _v5 = _p6,
											_v6 = {
											ctor: '::',
											_0: {ctor: '::', _0: _p5, _1: _p3._0._0},
											_1: hasNeither
										};
										edges = _v5;
										acc = _v6;
										continue go;
									}
								} else {
									break _v2_4;
								}
							} else {
								if (_p3._1.ctor === '[]') {
									var _v7 = _p6,
										_v8 = {
										ctor: '::',
										_0: {
											ctor: '::',
											_0: _p5,
											_1: {ctor: '[]'}
										},
										_1: acc
									};
									edges = _v7;
									acc = _v8;
									continue go;
								} else {
									if (_p3._1._1.ctor === '[]') {
										var _v9 = _p6,
											_v10 = {
											ctor: '::',
											_0: {ctor: '::', _0: _p5, _1: _p3._1._0},
											_1: hasNeither
										};
										edges = _v9;
										acc = _v10;
										continue go;
									} else {
										break _v2_4;
									}
								}
							}
						} else {
							break _v2_4;
						}
					} while(false);
					return _elm_lang$core$Native_Utils.crashCase(
						'Main',
						{
							start: {line: 1259, column: 25},
							end: {line: 1273, column: 57}
						},
						_p3)('impossible');
				}
			}
		});
	return A2(
		go,
		edges,
		{ctor: '[]'});
};
var _vito$cadet$Main$subGraphs = function (graph) {
	var subEdgeNodes = A2(
		_elm_lang$core$List$foldl,
		F2(
			function (edge, set) {
				return A2(
					_elm_lang$core$Set$insert,
					edge.from,
					A2(_elm_lang$core$Set$insert, edge.to, set));
			}),
		_elm_lang$core$Set$empty);
	var connectedGraphs = A2(
		_elm_lang$core$List$map,
		function (_p7) {
			return A3(
				_elm_lang$core$Basics$flip,
				_elm_community$graph$Graph$inducedSubgraph,
				graph,
				_elm_lang$core$Set$toList(
					subEdgeNodes(_p7)));
		},
		_vito$cadet$Main$subEdges(
			_elm_community$graph$Graph$edges(graph)));
	var singletons = A3(
		_elm_community$graph$Graph$fold,
		F2(
			function (nc, ncs) {
				return (_elm_community$intdict$IntDict$isEmpty(nc.incoming) && _elm_community$intdict$IntDict$isEmpty(nc.outgoing)) ? {ctor: '::', _0: nc, _1: ncs} : ncs;
			}),
		{ctor: '[]'},
		graph);
	var singletonGraphs = A2(
		_elm_lang$core$List$map,
		A2(_elm_lang$core$Basics$flip, _elm_community$graph$Graph$insert, _elm_community$graph$Graph$empty),
		singletons);
	return A2(_elm_lang$core$Basics_ops['++'], connectedGraphs, singletonGraphs);
};
var _vito$cadet$Main$isOrgMember = F2(
	function (users, user) {
		return A2(
			_elm_lang$core$List$any,
			function (x) {
				return _elm_lang$core$Native_Utils.eq(x.id, user.id);
			},
			A2(
				_elm_lang$core$Maybe$withDefault,
				{ctor: '[]'},
				users));
	});
var _vito$cadet$Main$hexBrightness = function (h) {
	var _p8 = A2(_elm_lang$core$Basics$compare, h, (255 / 2) | 0);
	switch (_p8.ctor) {
		case 'LT':
			return -1;
		case 'EQ':
			return 0;
		default:
			return 1;
	}
};
var _vito$cadet$Main$hexRegex = _elm_lang$core$Regex$regex('([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})');
var _vito$cadet$Main$colorIsLight = function (hex) {
	var matches = _elm_lang$core$List$head(
		A3(
			_elm_lang$core$Regex$find,
			_elm_lang$core$Regex$AtMost(1),
			_vito$cadet$Main$hexRegex,
			hex));
	var _p9 = A2(
		_elm_lang$core$Maybe$map,
		function (_) {
			return _.submatches;
		},
		matches);
	if ((((((((_p9.ctor === 'Just') && (_p9._0.ctor === '::')) && (_p9._0._0.ctor === 'Just')) && (_p9._0._1.ctor === '::')) && (_p9._0._1._0.ctor === 'Just')) && (_p9._0._1._1.ctor === '::')) && (_p9._0._1._1._0.ctor === 'Just')) && (_p9._0._1._1._1.ctor === '[]')) {
		var _p10 = A2(
			_elm_lang$core$List$map,
			_fredcy$elm_parseint$ParseInt$parseIntHex,
			{
				ctor: '::',
				_0: _p9._0._0._0,
				_1: {
					ctor: '::',
					_0: _p9._0._1._0._0,
					_1: {
						ctor: '::',
						_0: _p9._0._1._1._0._0,
						_1: {ctor: '[]'}
					}
				}
			});
		if (((((((_p10.ctor === '::') && (_p10._0.ctor === 'Ok')) && (_p10._1.ctor === '::')) && (_p10._1._0.ctor === 'Ok')) && (_p10._1._1.ctor === '::')) && (_p10._1._1._0.ctor === 'Ok')) && (_p10._1._1._1.ctor === '[]')) {
			return (_elm_lang$core$Native_Utils.cmp(
				(_vito$cadet$Main$hexBrightness(_p10._0._0) + _vito$cadet$Main$hexBrightness(_p10._1._0._0)) + _vito$cadet$Main$hexBrightness(_p10._1._1._0._0),
				0) > 0) ? true : false;
		} else {
			return _elm_lang$core$Native_Utils.crashCase(
				'Main',
				{
					start: {line: 1186, column: 17},
					end: {line: 1194, column: 50}
				},
				_p10)('invalid hex');
		}
	} else {
		return _elm_lang$core$Native_Utils.crashCase(
			'Main',
			{
				start: {line: 1184, column: 9},
				end: {line: 1197, column: 42}
			},
			_p9)('invalid hex');
	}
};
var _vito$cadet$Main$viewLabel = function (_p13) {
	var _p14 = _p13;
	var _p15 = _p14.color;
	return A2(
		_elm_lang$html$Html$span,
		{
			ctor: '::',
			_0: _elm_lang$html$Html_Attributes$class('card-label'),
			_1: {
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$style(
					{
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'background-color',
							_1: A2(_elm_lang$core$Basics_ops['++'], '#', _p15)
						},
						_1: {
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: 'color',
								_1: _vito$cadet$Main$colorIsLight(_p15) ? 'rgba(0, 0, 0, .8)' : '#fff'
							},
							_1: {ctor: '[]'}
						}
					}),
				_1: {ctor: '[]'}
			}
		},
		{
			ctor: '::',
			_0: A2(
				_elm_lang$html$Html$span,
				{
					ctor: '::',
					_0: _elm_lang$html$Html_Attributes$class('card-label-text'),
					_1: {ctor: '[]'}
				},
				{
					ctor: '::',
					_0: _elm_lang$html$Html$text(_p14.name),
					_1: {ctor: '[]'}
				}),
			_1: {ctor: '[]'}
		});
};
var _vito$cadet$Main$recentActors = F2(
	function (model, card) {
		return _elm_lang$core$List$reverse(
			A2(
				_elm_lang$core$List$take,
				3,
				_elm_lang$core$List$reverse(
					A2(
						_elm_lang$core$Maybe$withDefault,
						{ctor: '[]'},
						A2(_elm_lang$core$Dict$get, card.id, model.data.actors)))));
	});
var _vito$cadet$Main$isAnticipated = F2(
	function (model, card) {
		return A2(_elm_lang$core$List$member, card.id, model.anticipatedCards) && (!A2(_elm_lang$core$List$member, card.id, model.selectedCards));
	});
var _vito$cadet$Main$inColumn = F2(
	function (name, card) {
		return A2(
			_elm_lang$core$List$member,
			name,
			A2(
				_elm_lang$core$List$filterMap,
				function (_p16) {
					return A2(
						_elm_lang$core$Maybe$map,
						function (_) {
							return _.name;
						},
						function (_) {
							return _.column;
						}(_p16));
				},
				card.cards));
	});
var _vito$cadet$Main$isInFlight = _vito$cadet$Main$inColumn('In Flight');
var _vito$cadet$Main$isDone = _vito$cadet$Main$inColumn('Done');
var _vito$cadet$Main$isBacklog = _vito$cadet$Main$inColumn('Backlog');
var _vito$cadet$Main$isInProject = F2(
	function (name, card) {
		return A2(
			_elm_lang$core$List$member,
			name,
			A2(
				_elm_lang$core$List$map,
				function (_p17) {
					return function (_) {
						return _.name;
					}(
						function (_) {
							return _.project;
						}(_p17));
				},
				card.cards));
	});
var _vito$cadet$Main$activityOpacity = F2(
	function (now, date) {
		var daysSinceLastUpdate = (_elm_lang$core$Date$toTime(now) / (24 * _elm_lang$core$Time$hour)) - (_elm_lang$core$Date$toTime(date) / (24 * _elm_lang$core$Time$hour));
		return (_elm_lang$core$Native_Utils.cmp(daysSinceLastUpdate, 1) < 1) ? 1 : ((_elm_lang$core$Native_Utils.cmp(daysSinceLastUpdate, 2) < 1) ? 0.75 : ((_elm_lang$core$Native_Utils.cmp(daysSinceLastUpdate, 7) < 1) ? 0.5 : 0.25));
	});
var _vito$cadet$Main$viewCardActor = F2(
	function (model, _p18) {
		var _p19 = _p18;
		return A2(
			_elm_lang$html$Html$img,
			{
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$class('card-actor'),
				_1: {
					ctor: '::',
					_0: _elm_lang$html$Html_Attributes$style(
						{
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: 'opacity',
								_1: _elm_lang$core$Basics$toString(
									A2(_vito$cadet$Main$activityOpacity, model.currentDate, _p19.createdAt))
							},
							_1: {ctor: '[]'}
						}),
					_1: {
						ctor: '::',
						_0: _elm_lang$html$Html_Attributes$src(
							A2(_elm_lang$core$Basics_ops['++'], _p19.actor.avatar, '&s=88')),
						_1: {ctor: '[]'}
					}
				}
			},
			{ctor: '[]'});
	});
var _vito$cadet$Main$viewCardNodeFlair = F4(
	function (card, flair, _p20, state) {
		var _p21 = _p20;
		return A2(
			_elm_lang$svg$Svg$g,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$opacity(
					_elm_lang$core$Basics$toString(
						A2(_vito$cadet$Main$activityOpacity, state.currentDate, card.updatedAt) * 0.75)),
				_1: {
					ctor: '::',
					_0: _elm_lang$svg$Svg_Attributes$transform(
						A2(
							_elm_lang$core$Basics_ops['++'],
							'translate(',
							A2(
								_elm_lang$core$Basics_ops['++'],
								_elm_lang$core$Basics$toString(_p21.x),
								A2(
									_elm_lang$core$Basics_ops['++'],
									', ',
									A2(
										_elm_lang$core$Basics_ops['++'],
										_elm_lang$core$Basics$toString(_p21.y),
										')'))))),
					_1: {ctor: '[]'}
				}
			},
			flair);
	});
var _vito$cadet$Main$renderCardNode = F2(
	function (card, state) {
		return {ctor: '[]'};
	});
var _vito$cadet$Main$flairRadiusBase = 16;
var _vito$cadet$Main$issueRadius = F2(
	function (card, _p22) {
		var _p23 = _p22;
		return 15 + ((_elm_lang$core$Basics$toFloat(
			_elm_community$intdict$IntDict$size(_p23.incoming)) / 2) + _elm_lang$core$Basics$toFloat(
			_elm_community$intdict$IntDict$size(_p23.outgoing) * 2));
	});
var _vito$cadet$Main$issueRadiusWithLabels = F2(
	function (card, context) {
		return A2(_vito$cadet$Main$issueRadius, card, context) + 3;
	});
var _vito$cadet$Main$issueRadiusWithFlair = F2(
	function (card, context) {
		var reactionCounts = A2(
			_elm_lang$core$List$map,
			function (_) {
				return _.count;
			},
			card.reactions);
		var highestFlair = A3(
			_elm_lang$core$List$foldl,
			F2(
				function (num, acc) {
					return A2(_elm_lang$core$Basics$max, num, acc);
				}),
			0,
			{ctor: '::', _0: card.commentCount, _1: reactionCounts});
		return (A2(_vito$cadet$Main$issueRadiusWithLabels, card, context) + _vito$cadet$Main$flairRadiusBase) + _elm_lang$core$Basics$toFloat(highestFlair);
	});
var _vito$cadet$Main$nodeFlairArcs = F2(
	function (card, context) {
		var innerCentroid = function (arc) {
			var a = ((arc.startAngle + arc.endAngle) / 2) - (_elm_lang$core$Basics$pi / 2);
			var r = arc.innerRadius + 10;
			return {
				ctor: '_Tuple2',
				_0: _elm_lang$core$Basics$cos(a) * r,
				_1: _elm_lang$core$Basics$sin(a) * r
			};
		};
		var reactionTypeEmoji = function (type_) {
			var _p24 = type_;
			switch (_p24.ctor) {
				case 'ReactionTypeThumbsUp':
					return '👍';
				case 'ReactionTypeThumbsDown':
					return '👎';
				case 'ReactionTypeLaugh':
					return '😄';
				case 'ReactionTypeConfused':
					return '😕';
				case 'ReactionTypeHeart':
					return '💖';
				default:
					return '🎉';
			}
		};
		var emojiReactions = A3(
			_elm_lang$core$Basics$flip,
			_elm_lang$core$List$map,
			card.reactions,
			function (_p25) {
				var _p26 = _p25;
				return {
					ctor: '_Tuple2',
					_0: reactionTypeEmoji(_p26.type_),
					_1: _p26.count
				};
			});
		var flairs = A2(
			_elm_lang$core$List$filter,
			function (_p27) {
				return A3(
					_elm_lang$core$Basics$flip,
					F2(
						function (x, y) {
							return _elm_lang$core$Native_Utils.cmp(x, y) > 0;
						}),
					0,
					_elm_lang$core$Tuple$second(_p27));
			},
			{
				ctor: '::',
				_0: {ctor: '_Tuple2', _0: '💬', _1: card.commentCount},
				_1: emojiReactions
			});
		var radius = A2(_vito$cadet$Main$issueRadiusWithLabels, card, context);
		var reactionSegment = F2(
			function (i, _p28) {
				var _p29 = _p28;
				var segments = A2(
					_gampleman$elm_visualization$Visualization_Shape$pie,
					{
						startAngle: 0,
						endAngle: 2 * _elm_lang$core$Basics$pi,
						padAngle: 3.0e-2,
						sortingFn: F2(
							function (_p31, _p30) {
								return _elm_lang$core$Basics$EQ;
							}),
						valueFn: _elm_lang$core$Basics$always(1.0),
						innerRadius: radius,
						outerRadius: (radius + _vito$cadet$Main$flairRadiusBase) + _elm_lang$core$Basics$toFloat(_p29._1),
						cornerRadius: 3,
						padRadius: 0
					},
					A2(
						_elm_lang$core$List$repeat,
						_elm_lang$core$List$length(flairs),
						1));
				var _p32 = A2(
					_elm_lang$core$List$take,
					1,
					A2(_elm_lang$core$List$drop, i, segments));
				if ((_p32.ctor === '::') && (_p32._1.ctor === '[]')) {
					return _p32._0;
				} else {
					return _elm_lang$core$Native_Utils.crashCase(
						'Main',
						{
							start: {line: 919, column: 17},
							end: {line: 924, column: 49}
						},
						_p32)('impossible');
				}
			});
		return A3(
			_elm_lang$core$Basics$flip,
			_elm_lang$core$List$indexedMap,
			flairs,
			F2(
				function (i, _p34) {
					var _p35 = _p34;
					var arc = A2(reactionSegment, i, _p35);
					return A2(
						_elm_lang$svg$Svg$g,
						{
							ctor: '::',
							_0: _elm_lang$svg$Svg_Attributes$class('reveal'),
							_1: {ctor: '[]'}
						},
						{
							ctor: '::',
							_0: A2(
								_elm_lang$svg$Svg$path,
								{
									ctor: '::',
									_0: _elm_lang$svg$Svg_Attributes$d(
										_gampleman$elm_visualization$Visualization_Shape$arc(arc)),
									_1: {
										ctor: '::',
										_0: _elm_lang$svg$Svg_Attributes$fill('#fff'),
										_1: {ctor: '[]'}
									}
								},
								{ctor: '[]'}),
							_1: {
								ctor: '::',
								_0: A2(
									_elm_lang$svg$Svg$text_,
									{
										ctor: '::',
										_0: _elm_lang$svg$Svg_Attributes$transform(
											A2(
												_elm_lang$core$Basics_ops['++'],
												'translate',
												_elm_lang$core$Basics$toString(
													innerCentroid(arc)))),
										_1: {
											ctor: '::',
											_0: _elm_lang$svg$Svg_Attributes$textAnchor('middle'),
											_1: {
												ctor: '::',
												_0: _elm_lang$svg$Svg_Attributes$alignmentBaseline('middle'),
												_1: {
													ctor: '::',
													_0: _elm_lang$svg$Svg_Attributes$class('hidden'),
													_1: {ctor: '[]'}
												}
											}
										}
									},
									{
										ctor: '::',
										_0: _elm_lang$svg$Svg$text(_p35._0),
										_1: {ctor: '[]'}
									}),
								_1: {ctor: '[]'}
							}
						});
				}));
	});
var _vito$cadet$Main$nodeLabelArcs = F2(
	function (card, context) {
		var radius = A2(_vito$cadet$Main$issueRadius, card, context);
		var labelSegments = A2(
			_gampleman$elm_visualization$Visualization_Shape$pie,
			{
				startAngle: 0,
				endAngle: 2 * _elm_lang$core$Basics$pi,
				padAngle: 0,
				sortingFn: F2(
					function (_p37, _p36) {
						return _elm_lang$core$Basics$EQ;
					}),
				valueFn: _elm_lang$core$Basics$always(1.0),
				innerRadius: radius,
				outerRadius: radius + 3,
				cornerRadius: 0,
				padRadius: 0
			},
			A2(
				_elm_lang$core$List$repeat,
				_elm_lang$core$List$length(card.labels),
				1));
		return A3(
			_elm_lang$core$List$map2,
			F2(
				function (arc, label) {
					return A2(
						_elm_lang$svg$Svg$path,
						{
							ctor: '::',
							_0: _elm_lang$svg$Svg_Attributes$d(
								_gampleman$elm_visualization$Visualization_Shape$arc(arc)),
							_1: {
								ctor: '::',
								_0: _elm_lang$svg$Svg_Attributes$fill(
									A2(_elm_lang$core$Basics_ops['++'], '#', label.color)),
								_1: {ctor: '[]'}
							}
						},
						{ctor: '[]'});
				}),
			labelSegments,
			card.labels);
	});
var _vito$cadet$Main$linkPath = F2(
	function (graph, edge) {
		var target = function () {
			var _p39 = A2(
				_elm_lang$core$Maybe$map,
				function (_p38) {
					return function (_) {
						return _.label;
					}(
						function (_) {
							return _.node;
						}(_p38));
				},
				A2(_elm_community$graph$Graph$get, edge.to, graph));
			if (_p39.ctor === 'Just') {
				return {x: _p39._0.x, y: _p39._0.y};
			} else {
				return {x: 0, y: 0};
			}
		}();
		var source = function () {
			var _p41 = A2(
				_elm_lang$core$Maybe$map,
				function (_p40) {
					return function (_) {
						return _.label;
					}(
						function (_) {
							return _.node;
						}(_p40));
				},
				A2(_elm_community$graph$Graph$get, edge.from, graph));
			if (_p41.ctor === 'Just') {
				return {x: _p41._0.x, y: _p41._0.y};
			} else {
				return {x: 0, y: 0};
			}
		}();
		return A2(
			_elm_lang$svg$Svg$line,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$strokeWidth('4'),
				_1: {
					ctor: '::',
					_0: _elm_lang$svg$Svg_Attributes$stroke('rgba(0,0,0,.2)'),
					_1: {
						ctor: '::',
						_0: _elm_lang$svg$Svg_Attributes$x1(
							_elm_lang$core$Basics$toString(source.x)),
						_1: {
							ctor: '::',
							_0: _elm_lang$svg$Svg_Attributes$y1(
								_elm_lang$core$Basics$toString(source.y)),
							_1: {
								ctor: '::',
								_0: _elm_lang$svg$Svg_Attributes$x2(
									_elm_lang$core$Basics$toString(target.x)),
								_1: {
									ctor: '::',
									_0: _elm_lang$svg$Svg_Attributes$y2(
										_elm_lang$core$Basics$toString(target.y)),
									_1: {ctor: '[]'}
								}
							}
						}
					}
				}
			},
			{ctor: '[]'});
	});
var _vito$cadet$Main$viewNodeLowerUpper = F3(
	function (state, _p43, _p42) {
		var _p44 = _p43;
		var _p46 = _p44.node;
		var _p45 = _p42;
		var pos = {x: _p46.label.x, y: _p46.label.y};
		return {
			ctor: '_Tuple2',
			_0: {
				ctor: '::',
				_0: A3(_elm_lang$svg$Svg_Lazy$lazy2, _p46.label.value.viewLower, pos, state),
				_1: _p45._0
			},
			_1: {
				ctor: '::',
				_0: A3(_elm_lang$svg$Svg_Lazy$lazy2, _p46.label.value.viewUpper, pos, state),
				_1: _p45._1
			}
		};
	});
var _vito$cadet$Main$viewGraph = F2(
	function (model, _p47) {
		var _p48 = _p47;
		var _p58 = _p48.graph;
		var state = {currentDate: model.currentDate, selectedCards: model.selectedCards};
		var _p49 = A3(
			_elm_community$graph$Graph$fold,
			_vito$cadet$Main$viewNodeLowerUpper(state),
			{
				ctor: '_Tuple2',
				_0: {ctor: '[]'},
				_1: {ctor: '[]'}
			},
			_p58);
		var flairs = _p49._0;
		var nodes = _p49._1;
		var links = A2(
			_elm_lang$core$List$map,
			_elm_lang$svg$Svg_Lazy$lazy(
				_vito$cadet$Main$linkPath(_p58)),
			_elm_community$graph$Graph$edges(_p58));
		var padding = 10;
		var nodeContexts = A3(
			_elm_community$graph$Graph$fold,
			F2(
				function (x, y) {
					return {ctor: '::', _0: x, _1: y};
				}),
			{ctor: '[]'},
			_p58);
		var bounds = A2(_elm_lang$core$List$map, _vito$cadet$Main$nodeBounds, nodeContexts);
		var minX = A3(
			_elm_lang$core$List$foldl,
			F2(
				function (_p50, acc) {
					var _p51 = _p50;
					return A2(_elm_lang$core$Basics$min, _p51.x1, acc);
				}),
			999999,
			bounds) - padding;
		var minY = A3(
			_elm_lang$core$List$foldl,
			F2(
				function (_p52, acc) {
					var _p53 = _p52;
					return A2(_elm_lang$core$Basics$min, _p53.y1, acc);
				}),
			999999,
			bounds) - padding;
		var maxX = A3(
			_elm_lang$core$List$foldl,
			F2(
				function (_p54, acc) {
					var _p55 = _p54;
					return A2(_elm_lang$core$Basics$max, _p55.x2, acc);
				}),
			0,
			bounds) + padding;
		var width = maxX - minX;
		var maxY = A3(
			_elm_lang$core$List$foldl,
			F2(
				function (_p56, acc) {
					var _p57 = _p56;
					return A2(_elm_lang$core$Basics$max, _p57.y2, acc);
				}),
			0,
			bounds) + padding;
		var height = maxY - minY;
		return A2(
			_elm_lang$svg$Svg$svg,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$width(
					A2(
						_elm_lang$core$Basics_ops['++'],
						_elm_lang$core$Basics$toString(width),
						'px')),
				_1: {
					ctor: '::',
					_0: _elm_lang$svg$Svg_Attributes$height(
						A2(
							_elm_lang$core$Basics_ops['++'],
							_elm_lang$core$Basics$toString(height),
							'px')),
					_1: {
						ctor: '::',
						_0: _elm_lang$svg$Svg_Attributes$viewBox(
							A2(
								_elm_lang$core$Basics_ops['++'],
								_elm_lang$core$Basics$toString(minX),
								A2(
									_elm_lang$core$Basics_ops['++'],
									' ',
									A2(
										_elm_lang$core$Basics_ops['++'],
										_elm_lang$core$Basics$toString(minY),
										A2(
											_elm_lang$core$Basics_ops['++'],
											' ',
											A2(
												_elm_lang$core$Basics_ops['++'],
												_elm_lang$core$Basics$toString(width),
												A2(
													_elm_lang$core$Basics_ops['++'],
													' ',
													_elm_lang$core$Basics$toString(height)))))))),
						_1: {ctor: '[]'}
					}
				}
			},
			{
				ctor: '::',
				_0: A2(
					_elm_lang$svg$Svg$g,
					{
						ctor: '::',
						_0: _elm_lang$svg$Svg_Attributes$class('links'),
						_1: {ctor: '[]'}
					},
					links),
				_1: {
					ctor: '::',
					_0: A2(
						_elm_lang$svg$Svg$g,
						{
							ctor: '::',
							_0: _elm_lang$svg$Svg_Attributes$class('lower'),
							_1: {ctor: '[]'}
						},
						flairs),
					_1: {
						ctor: '::',
						_0: A2(
							_elm_lang$svg$Svg$g,
							{
								ctor: '::',
								_0: _elm_lang$svg$Svg_Attributes$class('upper'),
								_1: {ctor: '[]'}
							},
							nodes),
						_1: {ctor: '[]'}
					}
				}
			});
	});
var _vito$cadet$Main$graphCompare = F2(
	function (a, b) {
		var _p59 = A2(
			_elm_lang$core$Basics$compare,
			_elm_community$graph$Graph$size(a.graph),
			_elm_community$graph$Graph$size(b.graph));
		if (_p59.ctor === 'EQ') {
			var graphScore = function (_p60) {
				return A3(
					_elm_lang$core$List$foldl,
					F2(
						function (x, y) {
							return x + y;
						}),
					0,
					A2(
						_elm_lang$core$List$map,
						function (_p61) {
							return function (_) {
								return _.score;
							}(
								function (_) {
									return _.value;
								}(
									function (_) {
										return _.label;
									}(_p61)));
						},
						_elm_community$graph$Graph$nodes(_p60)));
			};
			return A2(
				_elm_lang$core$Basics$compare,
				graphScore(a.graph),
				graphScore(b.graph));
		} else {
			return _p59;
		}
	});
var _vito$cadet$Main$selectStatefulProject = function (project) {
	var rest = A2(
		_elm_lang$core$List$filter,
		function (_p62) {
			return !A3(
				_elm_lang$core$Basics$flip,
				_elm_lang$core$List$member,
				{
					ctor: '::',
					_0: 'Backlog',
					_1: {
						ctor: '::',
						_0: 'In Flight',
						_1: {
							ctor: '::',
							_0: 'Done',
							_1: {ctor: '[]'}
						}
					}
				},
				function (_) {
					return _.name;
				}(_p62));
		},
		project.columns);
	var findColumn = function (name) {
		var _p64 = A2(
			_elm_lang$core$List$filter,
			function (_p63) {
				return A2(
					F2(
						function (x, y) {
							return _elm_lang$core$Native_Utils.eq(x, y);
						}),
					name,
					function (_) {
						return _.name;
					}(_p63));
			},
			project.columns);
		if ((_p64.ctor === '::') && (_p64._1.ctor === '[]')) {
			return _elm_lang$core$Maybe$Just(_p64._0);
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	};
	var backlog = findColumn('Backlog');
	var inFlight = findColumn('In Flight');
	var done = findColumn('Done');
	var _p65 = {ctor: '_Tuple3', _0: backlog, _1: inFlight, _2: done};
	if ((((_p65.ctor === '_Tuple3') && (_p65._0.ctor === 'Just')) && (_p65._1.ctor === 'Just')) && (_p65._2.ctor === 'Just')) {
		return _elm_lang$core$Maybe$Just(
			{id: project.id, name: project.name, backlog: _p65._0._0, inFlight: _p65._1._0, done: _p65._2._0, problemSpace: rest});
	} else {
		return _elm_lang$core$Maybe$Nothing;
	}
};
var _vito$cadet$Main$viewGlobalGraphPage = function (model) {
	return A2(
		_elm_lang$html$Html$div,
		{
			ctor: '::',
			_0: _elm_lang$html$Html_Attributes$class('spatial-graph'),
			_1: {ctor: '[]'}
		},
		A2(
			_elm_lang$core$List$map,
			_elm_lang$html$Html_Lazy$lazy(
				_vito$cadet$Main$viewGraph(model)),
			model.cardGraphs));
};
var _vito$cadet$Main$prCard = function (_p66) {
	var _p67 = _p66;
	return {
		isPullRequest: true,
		id: _p67.id,
		url: _p67.url,
		number: _p67.number,
		title: _p67.title,
		updatedAt: _p67.updatedAt,
		author: _p67.author,
		labels: _p67.labels,
		cards: _p67.cards,
		commentCount: _p67.commentCount,
		reactions: _p67.reactions,
		score: _vito$cadet$GitHubGraph$pullRequestScore(_p67)
	};
};
var _vito$cadet$Main$issueCard = function (_p68) {
	var _p69 = _p68;
	return {
		isPullRequest: false,
		id: _p69.id,
		url: _p69.url,
		number: _p69.number,
		title: _p69.title,
		updatedAt: _p69.updatedAt,
		author: _p69.author,
		labels: _p69.labels,
		cards: _p69.cards,
		commentCount: _p69.commentCount,
		reactions: _p69.reactions,
		score: _vito$cadet$GitHubGraph$pullRequestScore(_p69)
	};
};
var _vito$cadet$Main$delta2url = F2(
	function (a, b) {
		var withSelection = _rgrempel$elm_route_url$RouteUrl_Builder$replaceHash(
			A2(_elm_lang$core$String$join, ',', b.selectedCards));
		var withPagePath = function () {
			var _p70 = b.page;
			switch (_p70.ctor) {
				case 'GlobalGraphPage':
					return _rgrempel$elm_route_url$RouteUrl_Builder$replacePath(
						{ctor: '[]'});
				case 'AllProjectsPage':
					return _rgrempel$elm_route_url$RouteUrl_Builder$replacePath(
						{
							ctor: '::',
							_0: 'projects',
							_1: {ctor: '[]'}
						});
				default:
					return _rgrempel$elm_route_url$RouteUrl_Builder$replacePath(
						{
							ctor: '::',
							_0: 'projects',
							_1: {
								ctor: '::',
								_0: _p70._0,
								_1: {ctor: '[]'}
							}
						});
			}
		}();
		var withPageEntry = _elm_lang$core$Native_Utils.eq(a.page, b.page) ? _elm_lang$core$Basics$identity : _rgrempel$elm_route_url$RouteUrl_Builder$newEntry;
		var builder = A3(
			_elm_lang$core$List$foldl,
			F2(
				function (f, b) {
					return f(b);
				}),
			_rgrempel$elm_route_url$RouteUrl_Builder$builder,
			{
				ctor: '::',
				_0: withPageEntry,
				_1: {
					ctor: '::',
					_0: withPagePath,
					_1: {
						ctor: '::',
						_0: withSelection,
						_1: {ctor: '[]'}
					}
				}
			});
		return _elm_lang$core$Maybe$Just(
			_rgrempel$elm_route_url$RouteUrl_Builder$toUrlChange(builder));
	});
var _vito$cadet$Main$Config = function (a) {
	return {initialDate: a};
};
var _vito$cadet$Main$Model = function (a) {
	return function (b) {
		return function (c) {
			return function (d) {
				return function (e) {
					return function (f) {
						return function (g) {
							return function (h) {
								return function (i) {
									return function (j) {
										return {config: a, me: b, page: c, currentDate: d, data: e, allCards: f, selectedCards: g, anticipatedCards: h, cardGraphs: i, computeGraph: j};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var _vito$cadet$Main$CardState = F2(
	function (a, b) {
		return {currentDate: a, selectedCards: b};
	});
var _vito$cadet$Main$Card = function (a) {
	return function (b) {
		return function (c) {
			return function (d) {
				return function (e) {
					return function (f) {
						return function (g) {
							return function (h) {
								return function (i) {
									return function (j) {
										return function (k) {
											return function (l) {
												return {isPullRequest: a, id: b, url: c, number: d, title: e, updatedAt: f, author: g, labels: h, cards: i, commentCount: j, reactions: k, score: l};
											};
										};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var _vito$cadet$Main$Position = F2(
	function (a, b) {
		return {x: a, y: b};
	});
var _vito$cadet$Main$CardNodeRadii = F3(
	function (a, b, c) {
		return {base: a, withLabels: b, withFlair: c};
	});
var _vito$cadet$Main$NodeBounds = F4(
	function (a, b, c, d) {
		return {x1: a, y1: b, x2: c, y2: d};
	});
var _vito$cadet$Main$Node = F4(
	function (a, b, c, d) {
		return {viewLower: a, viewUpper: b, bounds: c, score: d};
	});
var _vito$cadet$Main$ProjectState = F6(
	function (a, b, c, d, e, f) {
		return {id: a, name: b, backlog: c, inFlight: d, done: e, problemSpace: f};
	});
var _vito$cadet$Main$GraphContext = F2(
	function (a, b) {
		return {incoming: a, outgoing: b};
	});
var _vito$cadet$Main$ClearSelectedCards = {ctor: 'ClearSelectedCards'};
var _vito$cadet$Main$SelectAnticipatedCards = {ctor: 'SelectAnticipatedCards'};
var _vito$cadet$Main$SearchCards = function (a) {
	return {ctor: 'SearchCards', _0: a};
};
var _vito$cadet$Main$viewSearch = A2(
	_elm_lang$html$Html$div,
	{
		ctor: '::',
		_0: _elm_lang$html$Html_Attributes$class('card-search'),
		_1: {ctor: '[]'}
	},
	{
		ctor: '::',
		_0: A2(
			_elm_lang$html$Html$span,
			{
				ctor: '::',
				_0: _elm_lang$html$Html_Events$onClick(_vito$cadet$Main$ClearSelectedCards),
				_1: {
					ctor: '::',
					_0: _elm_lang$html$Html_Attributes$class('octicon octicon-x clear-selected'),
					_1: {ctor: '[]'}
				}
			},
			{
				ctor: '::',
				_0: _elm_lang$html$Html$text(''),
				_1: {ctor: '[]'}
			}),
		_1: {
			ctor: '::',
			_0: A2(
				_elm_lang$html$Html$form,
				{
					ctor: '::',
					_0: _elm_lang$html$Html_Events$onSubmit(_vito$cadet$Main$SelectAnticipatedCards),
					_1: {ctor: '[]'}
				},
				{
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$input,
						{
							ctor: '::',
							_0: _elm_lang$html$Html_Events$onInput(_vito$cadet$Main$SearchCards),
							_1: {
								ctor: '::',
								_0: _elm_lang$html$Html_Attributes$placeholder('filter cards'),
								_1: {ctor: '[]'}
							}
						},
						{ctor: '[]'}),
					_1: {ctor: '[]'}
				}),
			_1: {ctor: '[]'}
		}
	});
var _vito$cadet$Main$UnanticipateCard = function (a) {
	return {ctor: 'UnanticipateCard', _0: a};
};
var _vito$cadet$Main$AnticipateCard = function (a) {
	return {ctor: 'AnticipateCard', _0: a};
};
var _vito$cadet$Main$DeselectCard = function (a) {
	return {ctor: 'DeselectCard', _0: a};
};
var _vito$cadet$Main$SelectCard = function (a) {
	return {ctor: 'SelectCard', _0: a};
};
var _vito$cadet$Main$viewCardNode = F5(
	function (card, radii, labels, _p71, state) {
		var _p72 = _p71;
		var circleWithNumber = (!card.isPullRequest) ? {
			ctor: '::',
			_0: A2(
				_elm_lang$svg$Svg$circle,
				{
					ctor: '::',
					_0: _elm_lang$svg$Svg_Attributes$r(
						_elm_lang$core$Basics$toString(radii.base)),
					_1: {
						ctor: '::',
						_0: _elm_lang$svg$Svg_Attributes$fill('#fff'),
						_1: {ctor: '[]'}
					}
				},
				{ctor: '[]'}),
			_1: {
				ctor: '::',
				_0: A2(
					_elm_lang$svg$Svg$text_,
					{
						ctor: '::',
						_0: _elm_lang$svg$Svg_Attributes$textAnchor('middle'),
						_1: {
							ctor: '::',
							_0: _elm_lang$svg$Svg_Attributes$alignmentBaseline('middle'),
							_1: {
								ctor: '::',
								_0: _elm_lang$svg$Svg_Attributes$class('issue-number'),
								_1: {ctor: '[]'}
							}
						}
					},
					{
						ctor: '::',
						_0: _elm_lang$svg$Svg$text(
							_elm_lang$core$Basics$toString(card.number)),
						_1: {ctor: '[]'}
					}),
				_1: {ctor: '[]'}
			}
		} : {
			ctor: '::',
			_0: A2(
				_elm_lang$svg$Svg$circle,
				{
					ctor: '::',
					_0: _elm_lang$svg$Svg_Attributes$r(
						_elm_lang$core$Basics$toString(radii.base)),
					_1: {
						ctor: '::',
						_0: _elm_lang$svg$Svg_Attributes$class('pr-circle'),
						_1: {ctor: '[]'}
					}
				},
				{ctor: '[]'}),
			_1: {
				ctor: '::',
				_0: A2(
					_elm_lang$svg$Svg$text_,
					{
						ctor: '::',
						_0: _elm_lang$svg$Svg_Attributes$textAnchor('middle'),
						_1: {
							ctor: '::',
							_0: _elm_lang$svg$Svg_Attributes$alignmentBaseline('middle'),
							_1: {
								ctor: '::',
								_0: _elm_lang$svg$Svg_Attributes$fill('#fff'),
								_1: {ctor: '[]'}
							}
						}
					},
					{
						ctor: '::',
						_0: _elm_lang$svg$Svg$text(
							_elm_lang$core$Basics$toString(card.number)),
						_1: {ctor: '[]'}
					}),
				_1: {ctor: '[]'}
			}
		};
		var isSelected = A2(_elm_lang$core$List$member, card.id, state.selectedCards);
		return A2(
			_elm_lang$svg$Svg$g,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$transform(
					A2(
						_elm_lang$core$Basics_ops['++'],
						'translate(',
						A2(
							_elm_lang$core$Basics_ops['++'],
							_elm_lang$core$Basics$toString(_p72.x),
							A2(
								_elm_lang$core$Basics_ops['++'],
								', ',
								A2(
									_elm_lang$core$Basics_ops['++'],
									_elm_lang$core$Basics$toString(_p72.y),
									')'))))),
				_1: {
					ctor: '::',
					_0: _elm_lang$svg$Svg_Events$onMouseOver(
						_vito$cadet$Main$AnticipateCard(card.id)),
					_1: {
						ctor: '::',
						_0: _elm_lang$svg$Svg_Events$onMouseOut(
							_vito$cadet$Main$UnanticipateCard(card.id)),
						_1: {
							ctor: '::',
							_0: _elm_lang$svg$Svg_Events$onClick(
								isSelected ? _vito$cadet$Main$DeselectCard(card.id) : _vito$cadet$Main$SelectCard(card.id)),
							_1: {ctor: '[]'}
						}
					}
				}
			},
			A2(_elm_lang$core$Basics_ops['++'], circleWithNumber, labels));
	});
var _vito$cadet$Main$cardNode = F2(
	function (card, context) {
		var radii = {
			base: A2(_vito$cadet$Main$issueRadius, card, context),
			withLabels: A2(_vito$cadet$Main$issueRadiusWithLabels, card, context),
			withFlair: A2(_vito$cadet$Main$issueRadiusWithFlair, card, context)
		};
		var labels = A2(_vito$cadet$Main$nodeLabelArcs, card, context);
		var flair = A2(_vito$cadet$Main$nodeFlairArcs, card, context);
		return {
			viewLower: A2(_vito$cadet$Main$viewCardNodeFlair, card, flair),
			viewUpper: A3(_vito$cadet$Main$viewCardNode, card, radii, labels),
			bounds: function (_p73) {
				var _p74 = _p73;
				var _p76 = _p74.y;
				var _p75 = _p74.x;
				return {x1: _p75 - radii.withFlair, y1: _p76 - radii.withFlair, x2: _p75 + radii.withFlair, y2: _p76 + radii.withFlair};
			},
			score: card.score
		};
	});
var _vito$cadet$Main$computeReferenceGraph = F2(
	function (data, cards) {
		var applyWithContext = function (_p77) {
			var _p78 = _p77;
			var _p79 = _p78.node;
			var context = {incoming: _p78.incoming, outgoing: _p78.outgoing};
			return _elm_lang$core$Native_Utils.update(
				_p78,
				{
					node: _elm_lang$core$Native_Utils.update(
						_p79,
						{
							label: _p79.label(context)
						})
				});
		};
		var cardNodeThunks = A2(
			_elm_lang$core$List$map,
			function (card) {
				return A2(
					_elm_community$graph$Graph$Node,
					_vito$cadet$Hash$hash(card.id),
					_vito$cadet$Main$cardNode(card));
			},
			cards);
		var cardEdges = A3(
			_elm_lang$core$Dict$foldl,
			F3(
				function (idStr, sourceIds, refs) {
					var id = _vito$cadet$Hash$hash(idStr);
					return A2(
						_elm_lang$core$Basics_ops['++'],
						A2(
							_elm_lang$core$List$map,
							function (sourceId) {
								return {
									from: _vito$cadet$Hash$hash(sourceId),
									to: id,
									label: {ctor: '_Tuple0'}
								};
							},
							sourceIds),
						refs);
				}),
			{ctor: '[]'},
			data.references);
		var graph = A2(
			_elm_community$graph$Graph$mapContexts,
			applyWithContext,
			A2(_elm_community$graph$Graph$fromNodesAndEdges, cardNodeThunks, cardEdges));
		return _elm_lang$core$List$reverse(
			A2(
				_elm_lang$core$List$sortWith,
				_vito$cadet$Main$graphCompare,
				A2(
					_elm_lang$core$List$map,
					_vito$cadet$ForceGraph$fromGraph,
					_vito$cadet$Main$subGraphs(graph))));
	});
var _vito$cadet$Main$update = F2(
	function (msg, model) {
		var _p80 = msg;
		switch (_p80.ctor) {
			case 'Noop':
				return {ctor: '_Tuple2', _0: model, _1: _elm_lang$core$Platform_Cmd$none};
			case 'SetPage':
				var _p82 = _p80._0;
				var compute = F2(
					function (data, cards) {
						var _p81 = _p82;
						if (_p81.ctor === 'ProjectPage') {
							return A2(
								_vito$cadet$Main$computeReferenceGraph,
								data,
								A2(
									_elm_lang$core$List$filter,
									_vito$cadet$Main$isInProject(_p81._0),
									cards));
						} else {
							return A2(_vito$cadet$Main$computeReferenceGraph, data, cards);
						}
					});
				return {
					ctor: '_Tuple2',
					_0: _elm_lang$core$Native_Utils.update(
						model,
						{
							page: _p82,
							cardGraphs: A2(
								compute,
								model.data,
								_elm_lang$core$Dict$values(model.allCards)),
							computeGraph: compute
						}),
					_1: _elm_lang$core$Platform_Cmd$none
				};
			case 'Tick':
				return {
					ctor: '_Tuple2',
					_0: _elm_lang$core$Native_Utils.update(
						model,
						{
							cardGraphs: A2(
								_elm_lang$core$List$map,
								function (g) {
									return _vito$cadet$ForceGraph$isCompleted(g) ? g : _vito$cadet$ForceGraph$tick(g);
								},
								model.cardGraphs)
						}),
					_1: _elm_lang$core$Platform_Cmd$none
				};
			case 'SetCurrentDate':
				return {
					ctor: '_Tuple2',
					_0: _elm_lang$core$Native_Utils.update(
						model,
						{currentDate: _p80._0}),
					_1: _elm_lang$core$Platform_Cmd$none
				};
			case 'SearchCards':
				if (_p80._0 === '') {
					return {
						ctor: '_Tuple2',
						_0: _elm_lang$core$Native_Utils.update(
							model,
							{
								anticipatedCards: {ctor: '[]'}
							}),
						_1: _elm_lang$core$Platform_Cmd$none
					};
				} else {
					var cardMatch = function (_p83) {
						var _p84 = _p83;
						return A2(
							_elm_lang$core$String$contains,
							_elm_lang$core$String$toLower(_p80._0),
							_elm_lang$core$String$toLower(_p84.title)) ? _elm_lang$core$Maybe$Just(_p84.id) : _elm_lang$core$Maybe$Nothing;
					};
					var foundCards = A2(
						_elm_lang$core$List$filterMap,
						cardMatch,
						_elm_lang$core$Dict$values(model.allCards));
					return {
						ctor: '_Tuple2',
						_0: _elm_lang$core$Native_Utils.update(
							model,
							{anticipatedCards: foundCards}),
						_1: _elm_lang$core$Platform_Cmd$none
					};
				}
			case 'SelectAnticipatedCards':
				return {
					ctor: '_Tuple2',
					_0: _elm_lang$core$Native_Utils.update(
						model,
						{
							anticipatedCards: {ctor: '[]'},
							selectedCards: A2(_elm_lang$core$Basics_ops['++'], model.selectedCards, model.anticipatedCards)
						}),
					_1: _elm_lang$core$Platform_Cmd$none
				};
			case 'SelectCard':
				var _p85 = _p80._0;
				return {
					ctor: '_Tuple2',
					_0: _elm_lang$core$Native_Utils.update(
						model,
						{
							selectedCards: A2(_elm_lang$core$List$member, _p85, model.selectedCards) ? model.selectedCards : A2(
								_elm_lang$core$Basics_ops['++'],
								model.selectedCards,
								{
									ctor: '::',
									_0: _p85,
									_1: {ctor: '[]'}
								})
						}),
					_1: _elm_lang$core$Platform_Cmd$none
				};
			case 'ClearSelectedCards':
				return {
					ctor: '_Tuple2',
					_0: _elm_lang$core$Native_Utils.update(
						model,
						{
							selectedCards: {ctor: '[]'}
						}),
					_1: _elm_lang$core$Platform_Cmd$none
				};
			case 'DeselectCard':
				return {
					ctor: '_Tuple2',
					_0: _elm_lang$core$Native_Utils.update(
						model,
						{
							selectedCards: A2(
								_elm_lang$core$List$filter,
								F2(
									function (x, y) {
										return !_elm_lang$core$Native_Utils.eq(x, y);
									})(_p80._0),
								model.selectedCards)
						}),
					_1: _elm_lang$core$Platform_Cmd$none
				};
			case 'AnticipateCard':
				return {
					ctor: '_Tuple2',
					_0: _elm_lang$core$Native_Utils.update(
						model,
						{
							anticipatedCards: {ctor: '::', _0: _p80._0, _1: model.anticipatedCards}
						}),
					_1: _elm_lang$core$Platform_Cmd$none
				};
			case 'UnanticipateCard':
				return {
					ctor: '_Tuple2',
					_0: _elm_lang$core$Native_Utils.update(
						model,
						{
							anticipatedCards: A2(
								_elm_lang$core$List$filter,
								F2(
									function (x, y) {
										return !_elm_lang$core$Native_Utils.eq(x, y);
									})(_p80._0),
								model.anticipatedCards)
						}),
					_1: _elm_lang$core$Platform_Cmd$none
				};
			case 'MeFetched':
				if (_p80._0.ctor === 'Ok') {
					return {
						ctor: '_Tuple2',
						_0: _elm_lang$core$Native_Utils.update(
							model,
							{
								me: _elm_lang$core$Maybe$Just(_p80._0._0)
							}),
						_1: _elm_lang$core$Platform_Cmd$none
					};
				} else {
					return A3(
						_elm_lang$core$Basics$flip,
						_elm_lang$core$Basics$always,
						A2(_elm_lang$core$Debug$log, 'error fetching self', _p80._0._0),
						{ctor: '_Tuple2', _0: model, _1: _elm_lang$core$Platform_Cmd$none});
				}
			default:
				if (_p80._0.ctor === 'Ok') {
					var _p88 = _p80._0._0;
					var withIssues = A3(
						_elm_lang$core$Dict$foldl,
						F3(
							function (_p86, is, cards) {
								return A3(
									_elm_lang$core$List$foldl,
									function (i) {
										return A2(
											_elm_lang$core$Dict$insert,
											i.id,
											_vito$cadet$Main$issueCard(i));
									},
									cards,
									is);
							}),
						_elm_lang$core$Dict$empty,
						_p88.issues);
					var withPRs = A3(
						_elm_lang$core$Dict$foldl,
						F3(
							function (_p87, ps, cards) {
								return A3(
									_elm_lang$core$List$foldl,
									function (p) {
										return A2(
											_elm_lang$core$Dict$insert,
											p.id,
											_vito$cadet$Main$prCard(p));
									},
									cards,
									ps);
							}),
						withIssues,
						_p88.prs);
					var allCards = withPRs;
					return {
						ctor: '_Tuple2',
						_0: _elm_lang$core$Native_Utils.update(
							model,
							{
								data: _p88,
								allCards: allCards,
								cardGraphs: A2(
									model.computeGraph,
									_p88,
									_elm_lang$core$Dict$values(allCards))
							}),
						_1: _elm_lang$core$Platform_Cmd$none
					};
				} else {
					return A3(
						_elm_lang$core$Basics$flip,
						_elm_lang$core$Basics$always,
						A2(_elm_lang$core$Debug$log, 'error fetching data', _p80._0._0),
						{ctor: '_Tuple2', _0: model, _1: _elm_lang$core$Platform_Cmd$none});
				}
		}
	});
var _vito$cadet$Main$viewCard = F2(
	function (model, card) {
		return A2(
			_elm_lang$html$Html$div,
			{
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$classList(
					{
						ctor: '::',
						_0: {ctor: '_Tuple2', _0: 'card', _1: true},
						_1: {
							ctor: '::',
							_0: {ctor: '_Tuple2', _0: 'card-info', _1: true},
							_1: {
								ctor: '::',
								_0: {
									ctor: '_Tuple2',
									_0: 'in-flight',
									_1: _vito$cadet$Main$isInFlight(card)
								},
								_1: {
									ctor: '::',
									_0: {
										ctor: '_Tuple2',
										_0: 'done',
										_1: _vito$cadet$Main$isDone(card)
									},
									_1: {
										ctor: '::',
										_0: {
											ctor: '_Tuple2',
											_0: 'backlog',
											_1: _vito$cadet$Main$isBacklog(card)
										},
										_1: {
											ctor: '::',
											_0: {
												ctor: '_Tuple2',
												_0: 'anticipated',
												_1: A2(_vito$cadet$Main$isAnticipated, model, card)
											},
											_1: {ctor: '[]'}
										}
									}
								}
							}
						}
					}),
				_1: {
					ctor: '::',
					_0: _elm_lang$html$Html_Events$onClick(
						_vito$cadet$Main$SelectCard(card.id)),
					_1: {ctor: '[]'}
				}
			},
			{
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$div,
					{
						ctor: '::',
						_0: _elm_lang$html$Html_Attributes$class('card-actors'),
						_1: {ctor: '[]'}
					},
					A2(
						_elm_lang$core$List$map,
						_vito$cadet$Main$viewCardActor(model),
						A2(_vito$cadet$Main$recentActors, model, card))),
				_1: {
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$a,
						{
							ctor: '::',
							_0: _elm_lang$html$Html_Attributes$href(card.url),
							_1: {
								ctor: '::',
								_0: _elm_lang$html$Html_Attributes$target('_blank'),
								_1: {
									ctor: '::',
									_0: _elm_lang$html$Html_Attributes$class('card-title'),
									_1: {ctor: '[]'}
								}
							}
						},
						{
							ctor: '::',
							_0: _elm_lang$html$Html$text(card.title),
							_1: {ctor: '[]'}
						}),
					_1: {
						ctor: '::',
						_0: A2(
							_elm_lang$html$Html$span,
							{
								ctor: '::',
								_0: _elm_lang$html$Html_Attributes$class('card-labels'),
								_1: {ctor: '[]'}
							},
							A2(_elm_lang$core$List$map, _vito$cadet$Main$viewLabel, card.labels)),
						_1: {
							ctor: '::',
							_0: A2(
								_elm_lang$html$Html$div,
								{
									ctor: '::',
									_0: _elm_lang$html$Html_Attributes$class('card-meta'),
									_1: {ctor: '[]'}
								},
								{
									ctor: '::',
									_0: A2(
										_elm_lang$html$Html$a,
										{
											ctor: '::',
											_0: _elm_lang$html$Html_Attributes$href(card.url),
											_1: {
												ctor: '::',
												_0: _elm_lang$html$Html_Attributes$target('_blank'),
												_1: {ctor: '[]'}
											}
										},
										{
											ctor: '::',
											_0: _elm_lang$html$Html$text(
												A2(
													_elm_lang$core$Basics_ops['++'],
													'#',
													_elm_lang$core$Basics$toString(card.number))),
											_1: {ctor: '[]'}
										}),
									_1: {
										ctor: '::',
										_0: _elm_lang$html$Html$text(' '),
										_1: {
											ctor: '::',
											_0: _elm_lang$html$Html$text('opened by '),
											_1: {
												ctor: '::',
												_0: function () {
													var _p89 = card.author;
													if (_p89.ctor === 'Just') {
														var _p90 = _p89._0;
														return A2(
															_elm_lang$html$Html$a,
															{
																ctor: '::',
																_0: _elm_lang$html$Html_Attributes$href(_p90.url),
																_1: {
																	ctor: '::',
																	_0: _elm_lang$html$Html_Attributes$target('_blank'),
																	_1: {ctor: '[]'}
																}
															},
															{
																ctor: '::',
																_0: _elm_lang$html$Html$text(_p90.login),
																_1: {ctor: '[]'}
															});
													} else {
														return _elm_lang$html$Html$text('(deleted user)');
													}
												}(),
												_1: {ctor: '[]'}
											}
										}
									}
								}),
							_1: {ctor: '[]'}
						}
					}
				}
			});
	});
var _vito$cadet$Main$viewProjectColumnCard = F2(
	function (model, _p91) {
		var _p92 = _p91;
		var _p93 = {ctor: '_Tuple2', _0: _p92.note, _1: _p92.itemID};
		_v46_2:
		do {
			if (_p93.ctor === '_Tuple2') {
				if (_p93._0.ctor === 'Just') {
					if (_p93._1.ctor === 'Nothing') {
						return _elm_lang$html$Html$text('');
					} else {
						break _v46_2;
					}
				} else {
					if (_p93._1.ctor === 'Just') {
						var _p94 = A2(_elm_lang$core$Dict$get, _p93._1._0, model.allCards);
						if (_p94.ctor === 'Just') {
							return A2(_vito$cadet$Main$viewCard, model, _p94._0);
						} else {
							return _elm_lang$html$Html$text('');
						}
					} else {
						break _v46_2;
					}
				}
			} else {
				break _v46_2;
			}
		} while(false);
		return _elm_lang$core$Native_Utils.crashCase(
			'Main',
			{
				start: {line: 574, column: 5},
				end: {line: 588, column: 37}
			},
			_p93)('impossible');
	});
var _vito$cadet$Main$viewProjectColumn = F2(
	function (model, _p96) {
		var _p97 = _p96;
		var cards = A2(
			_elm_lang$core$Maybe$withDefault,
			{ctor: '[]'},
			A2(_elm_lang$core$Dict$get, _p97.id, model.data.cards));
		return A2(
			_elm_lang$html$Html$div,
			{
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$class('cards'),
				_1: {ctor: '[]'}
			},
			A2(
				_elm_lang$core$List$map,
				_vito$cadet$Main$viewProjectColumnCard(model),
				A2(_elm_lang$core$List$take, 3, cards)));
	});
var _vito$cadet$Main$viewFullProjectColumn = F2(
	function (model, _p98) {
		var _p99 = _p98;
		var cards = A2(
			_elm_lang$core$Maybe$withDefault,
			{ctor: '[]'},
			A2(_elm_lang$core$Dict$get, _p99.id, model.data.cards));
		return A2(
			_elm_lang$html$Html$div,
			{
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$class('cards'),
				_1: {ctor: '[]'}
			},
			A2(
				_elm_lang$core$List$map,
				_vito$cadet$Main$viewProjectColumnCard(model),
				cards));
	});
var _vito$cadet$Main$viewSingleProject = F2(
	function (model, _p100) {
		var _p101 = _p100;
		return A2(
			_elm_lang$html$Html$div,
			{
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$class('project single'),
				_1: {ctor: '[]'}
			},
			{
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$div,
					{
						ctor: '::',
						_0: _elm_lang$html$Html_Attributes$class('project-columns'),
						_1: {ctor: '[]'}
					},
					{
						ctor: '::',
						_0: A2(
							_elm_lang$html$Html$div,
							{
								ctor: '::',
								_0: _elm_lang$html$Html_Attributes$class('column name-column'),
								_1: {ctor: '[]'}
							},
							{
								ctor: '::',
								_0: A2(
									_elm_lang$html$Html$h4,
									{ctor: '[]'},
									{
										ctor: '::',
										_0: _elm_lang$html$Html$text(_p101.name),
										_1: {ctor: '[]'}
									}),
								_1: {ctor: '[]'}
							}),
						_1: {
							ctor: '::',
							_0: A2(
								_elm_lang$html$Html$div,
								{
									ctor: '::',
									_0: _elm_lang$html$Html_Attributes$class('column done-column'),
									_1: {ctor: '[]'}
								},
								{
									ctor: '::',
									_0: A2(_vito$cadet$Main$viewFullProjectColumn, model, _p101.done),
									_1: {ctor: '[]'}
								}),
							_1: {
								ctor: '::',
								_0: A2(
									_elm_lang$html$Html$div,
									{
										ctor: '::',
										_0: _elm_lang$html$Html_Attributes$class('column in-flight-column'),
										_1: {ctor: '[]'}
									},
									{
										ctor: '::',
										_0: A2(_vito$cadet$Main$viewFullProjectColumn, model, _p101.inFlight),
										_1: {ctor: '[]'}
									}),
								_1: {
									ctor: '::',
									_0: A2(
										_elm_lang$html$Html$div,
										{
											ctor: '::',
											_0: _elm_lang$html$Html_Attributes$class('column backlog-column'),
											_1: {ctor: '[]'}
										},
										{
											ctor: '::',
											_0: A2(_vito$cadet$Main$viewFullProjectColumn, model, _p101.backlog),
											_1: {ctor: '[]'}
										}),
									_1: {ctor: '[]'}
								}
							}
						}
					}),
				_1: {
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$div,
						{
							ctor: '::',
							_0: _elm_lang$html$Html_Attributes$class('spatial-graph'),
							_1: {ctor: '[]'}
						},
						A2(
							_elm_lang$core$List$map,
							_elm_lang$html$Html_Lazy$lazy(
								_vito$cadet$Main$viewGraph(model)),
							model.cardGraphs)),
					_1: {ctor: '[]'}
				}
			});
	});
var _vito$cadet$Main$viewProjectPage = F2(
	function (model, name) {
		var statefulProjects = A2(_elm_lang$core$List$filterMap, _vito$cadet$Main$selectStatefulProject, model.data.projects);
		var mproject = _elm_lang$core$List$head(
			A2(
				_elm_lang$core$List$filter,
				function (_p102) {
					return A2(
						F2(
							function (x, y) {
								return _elm_lang$core$Native_Utils.eq(x, y);
							}),
						name,
						function (_) {
							return _.name;
						}(_p102));
				},
				statefulProjects));
		var _p103 = mproject;
		if (_p103.ctor === 'Just') {
			return A2(_vito$cadet$Main$viewSingleProject, model, _p103._0);
		} else {
			return _elm_lang$html$Html$text('project not found');
		}
	});
var _vito$cadet$Main$viewCardEntry = F2(
	function (model, card) {
		var anticipated = A2(_vito$cadet$Main$isAnticipated, model, card);
		return A2(
			_elm_lang$html$Html$div,
			{
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$class('card-controls'),
				_1: {ctor: '[]'}
			},
			{
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$div,
					{
						ctor: '::',
						_0: _elm_lang$html$Html_Attributes$class('card-buttons'),
						_1: {ctor: '[]'}
					},
					{
						ctor: '::',
						_0: (!anticipated) ? A2(
							_elm_lang$html$Html$span,
							{
								ctor: '::',
								_0: _elm_lang$html$Html_Events$onClick(
									_vito$cadet$Main$DeselectCard(card.id)),
								_1: {
									ctor: '::',
									_0: _elm_lang$html$Html_Attributes$class('octicon octicon-x'),
									_1: {ctor: '[]'}
								}
							},
							{
								ctor: '::',
								_0: _elm_lang$html$Html$text(''),
								_1: {ctor: '[]'}
							}) : _elm_lang$html$Html$text(''),
						_1: {ctor: '[]'}
					}),
				_1: {
					ctor: '::',
					_0: A2(_vito$cadet$Main$viewCard, model, card),
					_1: {ctor: '[]'}
				}
			});
	});
var _vito$cadet$Main$DataFetched = function (a) {
	return {ctor: 'DataFetched', _0: a};
};
var _vito$cadet$Main$MeFetched = function (a) {
	return {ctor: 'MeFetched', _0: a};
};
var _vito$cadet$Main$SetCurrentDate = function (a) {
	return {ctor: 'SetCurrentDate', _0: a};
};
var _vito$cadet$Main$Tick = function (a) {
	return {ctor: 'Tick', _0: a};
};
var _vito$cadet$Main$subscriptions = function (model) {
	return _elm_lang$core$Platform_Sub$batch(
		{
			ctor: '::',
			_0: A2(
				_elm_lang$core$Time$every,
				_elm_lang$core$Time$second,
				function (_p104) {
					return _vito$cadet$Main$SetCurrentDate(
						_elm_lang$core$Date$fromTime(_p104));
				}),
			_1: {
				ctor: '::',
				_0: A2(_elm_lang$core$List$all, _vito$cadet$ForceGraph$isCompleted, model.cardGraphs) ? _elm_lang$core$Platform_Sub$none : _elm_lang$animation_frame$AnimationFrame$times(_vito$cadet$Main$Tick),
				_1: {ctor: '[]'}
			}
		});
};
var _vito$cadet$Main$SetPage = function (a) {
	return {ctor: 'SetPage', _0: a};
};
var _vito$cadet$Main$Noop = {ctor: 'Noop'};
var _vito$cadet$Main$ProjectPage = function (a) {
	return {ctor: 'ProjectPage', _0: a};
};
var _vito$cadet$Main$viewProject = F2(
	function (model, _p105) {
		var _p106 = _p105;
		var _p107 = _p106.name;
		return A2(
			_elm_lang$html$Html$div,
			{
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$class('project'),
				_1: {ctor: '[]'}
			},
			{
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$div,
					{
						ctor: '::',
						_0: _elm_lang$html$Html_Attributes$class('project-columns'),
						_1: {ctor: '[]'}
					},
					{
						ctor: '::',
						_0: A2(
							_elm_lang$html$Html$div,
							{
								ctor: '::',
								_0: _elm_lang$html$Html_Attributes$class('column name-column'),
								_1: {ctor: '[]'}
							},
							{
								ctor: '::',
								_0: A2(
									_elm_lang$html$Html$h4,
									{ctor: '[]'},
									{
										ctor: '::',
										_0: A2(
											_elm_lang$html$Html$a,
											{
												ctor: '::',
												_0: _elm_lang$html$Html_Attributes$href(
													A2(_elm_lang$core$Basics_ops['++'], '/projects/', _p107)),
												_1: {
													ctor: '::',
													_0: _vito$cadet$StrictEvents$onLeftClick(
														_vito$cadet$Main$SetPage(
															_vito$cadet$Main$ProjectPage(_p107))),
													_1: {ctor: '[]'}
												}
											},
											{
												ctor: '::',
												_0: _elm_lang$html$Html$text(_p107),
												_1: {ctor: '[]'}
											}),
										_1: {ctor: '[]'}
									}),
								_1: {ctor: '[]'}
							}),
						_1: {
							ctor: '::',
							_0: A2(
								_elm_lang$html$Html$div,
								{
									ctor: '::',
									_0: _elm_lang$html$Html_Attributes$class('column backlog-column'),
									_1: {ctor: '[]'}
								},
								{
									ctor: '::',
									_0: A2(_vito$cadet$Main$viewProjectColumn, model, _p106.backlog),
									_1: {ctor: '[]'}
								}),
							_1: {
								ctor: '::',
								_0: A2(
									_elm_lang$html$Html$div,
									{
										ctor: '::',
										_0: _elm_lang$html$Html_Attributes$class('column in-flight-column'),
										_1: {ctor: '[]'}
									},
									{
										ctor: '::',
										_0: A2(_vito$cadet$Main$viewProjectColumn, model, _p106.inFlight),
										_1: {ctor: '[]'}
									}),
								_1: {
									ctor: '::',
									_0: A2(
										_elm_lang$html$Html$div,
										{
											ctor: '::',
											_0: _elm_lang$html$Html_Attributes$class('column done-column'),
											_1: {ctor: '[]'}
										},
										{
											ctor: '::',
											_0: A2(_vito$cadet$Main$viewProjectColumn, model, _p106.done),
											_1: {ctor: '[]'}
										}),
									_1: {ctor: '[]'}
								}
							}
						}
					}),
				_1: {
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$div,
						{
							ctor: '::',
							_0: _elm_lang$html$Html_Attributes$class('project-spacer-columns'),
							_1: {ctor: '[]'}
						},
						{
							ctor: '::',
							_0: A2(
								_elm_lang$html$Html$div,
								{
									ctor: '::',
									_0: _elm_lang$html$Html_Attributes$class('column name-column'),
									_1: {ctor: '[]'}
								},
								{ctor: '[]'}),
							_1: {
								ctor: '::',
								_0: A2(
									_elm_lang$html$Html$div,
									{
										ctor: '::',
										_0: _elm_lang$html$Html_Attributes$class('column backlog-column'),
										_1: {ctor: '[]'}
									},
									{ctor: '[]'}),
								_1: {
									ctor: '::',
									_0: A2(
										_elm_lang$html$Html$div,
										{
											ctor: '::',
											_0: _elm_lang$html$Html_Attributes$class('column in-flight-column'),
											_1: {ctor: '[]'}
										},
										{ctor: '[]'}),
									_1: {
										ctor: '::',
										_0: A2(
											_elm_lang$html$Html$div,
											{
												ctor: '::',
												_0: _elm_lang$html$Html_Attributes$class('column done-column'),
												_1: {ctor: '[]'}
											},
											{ctor: '[]'}),
										_1: {ctor: '[]'}
									}
								}
							}
						}),
					_1: {ctor: '[]'}
				}
			});
	});
var _vito$cadet$Main$viewAllProjectsPage = function (model) {
	var statefulProjects = A2(_elm_lang$core$List$filterMap, _vito$cadet$Main$selectStatefulProject, model.data.projects);
	return A2(
		_elm_lang$html$Html$div,
		{
			ctor: '::',
			_0: _elm_lang$html$Html_Attributes$class('project-table'),
			_1: {ctor: '[]'}
		},
		{
			ctor: '::',
			_0: A2(
				_elm_lang$html$Html$div,
				{
					ctor: '::',
					_0: _elm_lang$html$Html_Attributes$class('project-name-columns'),
					_1: {ctor: '[]'}
				},
				{
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$div,
						{
							ctor: '::',
							_0: _elm_lang$html$Html_Attributes$class('column name-column'),
							_1: {ctor: '[]'}
						},
						{ctor: '[]'}),
					_1: {
						ctor: '::',
						_0: A2(
							_elm_lang$html$Html$div,
							{
								ctor: '::',
								_0: _elm_lang$html$Html_Attributes$class('column backlog-column'),
								_1: {ctor: '[]'}
							},
							{
								ctor: '::',
								_0: A2(
									_elm_lang$html$Html$h4,
									{ctor: '[]'},
									{
										ctor: '::',
										_0: _elm_lang$html$Html$text('Backlog'),
										_1: {ctor: '[]'}
									}),
								_1: {ctor: '[]'}
							}),
						_1: {
							ctor: '::',
							_0: A2(
								_elm_lang$html$Html$div,
								{
									ctor: '::',
									_0: _elm_lang$html$Html_Attributes$class('column in-flight-column'),
									_1: {ctor: '[]'}
								},
								{
									ctor: '::',
									_0: A2(
										_elm_lang$html$Html$h4,
										{ctor: '[]'},
										{
											ctor: '::',
											_0: _elm_lang$html$Html$text('In Flight'),
											_1: {ctor: '[]'}
										}),
									_1: {ctor: '[]'}
								}),
							_1: {
								ctor: '::',
								_0: A2(
									_elm_lang$html$Html$div,
									{
										ctor: '::',
										_0: _elm_lang$html$Html_Attributes$class('column done-column'),
										_1: {ctor: '[]'}
									},
									{
										ctor: '::',
										_0: A2(
											_elm_lang$html$Html$h4,
											{ctor: '[]'},
											{
												ctor: '::',
												_0: _elm_lang$html$Html$text('Done'),
												_1: {ctor: '[]'}
											}),
										_1: {ctor: '[]'}
									}),
								_1: {ctor: '[]'}
							}
						}
					}
				}),
			_1: {
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$div,
					{
						ctor: '::',
						_0: _elm_lang$html$Html_Attributes$class('projects'),
						_1: {ctor: '[]'}
					},
					A2(
						_elm_lang$core$List$map,
						_vito$cadet$Main$viewProject(model),
						statefulProjects)),
				_1: {ctor: '[]'}
			}
		});
};
var _vito$cadet$Main$AllProjectsPage = {ctor: 'AllProjectsPage'};
var _vito$cadet$Main$GlobalGraphPage = {ctor: 'GlobalGraphPage'};
var _vito$cadet$Main$location2messages = function (loc) {
	var builder = _rgrempel$elm_route_url$RouteUrl_Builder$fromUrl(loc.href);
	var path = _rgrempel$elm_route_url$RouteUrl_Builder$path(builder);
	var page = function () {
		var _p108 = path;
		_v53_3:
		do {
			if (_p108.ctor === '[]') {
				return _vito$cadet$Main$SetPage(_vito$cadet$Main$GlobalGraphPage);
			} else {
				if (_p108._0 === 'projects') {
					if (_p108._1.ctor === '[]') {
						return _vito$cadet$Main$SetPage(_vito$cadet$Main$AllProjectsPage);
					} else {
						if (_p108._1._1.ctor === '[]') {
							return _vito$cadet$Main$SetPage(
								_vito$cadet$Main$ProjectPage(_p108._1._0));
						} else {
							break _v53_3;
						}
					}
				} else {
					break _v53_3;
				}
			}
		} while(false);
		return _vito$cadet$Main$SetPage(_vito$cadet$Main$GlobalGraphPage);
	}();
	var hash = _rgrempel$elm_route_url$RouteUrl_Builder$hash(builder);
	var selection = A2(
		_elm_lang$core$List$map,
		_vito$cadet$Main$SelectCard,
		A2(_elm_lang$core$String$split, ',', hash));
	return {ctor: '::', _0: page, _1: selection};
};
var _vito$cadet$Main$init = function (config) {
	return {
		ctor: '_Tuple2',
		_0: {
			config: config,
			page: _vito$cadet$Main$GlobalGraphPage,
			me: _elm_lang$core$Maybe$Nothing,
			data: _vito$cadet$Backend$emptyData,
			allCards: _elm_lang$core$Dict$empty,
			selectedCards: {ctor: '[]'},
			anticipatedCards: {ctor: '[]'},
			currentDate: _elm_lang$core$Date$fromTime(config.initialDate),
			cardGraphs: {ctor: '[]'},
			computeGraph: _vito$cadet$Main$computeReferenceGraph
		},
		_1: _elm_lang$core$Platform_Cmd$batch(
			{
				ctor: '::',
				_0: _vito$cadet$Backend$fetchData(_vito$cadet$Main$DataFetched),
				_1: {
					ctor: '::',
					_0: _vito$cadet$Backend$fetchMe(_vito$cadet$Main$MeFetched),
					_1: {ctor: '[]'}
				}
			})
	};
};
var _vito$cadet$Main$viewNavBar = function (model) {
	return A2(
		_elm_lang$html$Html$div,
		{
			ctor: '::',
			_0: _elm_lang$html$Html_Attributes$class('bottom-bar'),
			_1: {ctor: '[]'}
		},
		{
			ctor: '::',
			_0: A2(
				_elm_lang$html$Html$div,
				{
					ctor: '::',
					_0: _elm_lang$html$Html_Attributes$class('nav'),
					_1: {ctor: '[]'}
				},
				{
					ctor: '::',
					_0: function () {
						var _p109 = model.me;
						if (_p109.ctor === 'Nothing') {
							return A2(
								_elm_lang$html$Html$a,
								{
									ctor: '::',
									_0: _elm_lang$html$Html_Attributes$class('button user-info'),
									_1: {
										ctor: '::',
										_0: _elm_lang$html$Html_Attributes$href('/auth/github'),
										_1: {ctor: '[]'}
									}
								},
								{
									ctor: '::',
									_0: A2(
										_elm_lang$html$Html$span,
										{
											ctor: '::',
											_0: _elm_lang$html$Html_Attributes$class('log-in-icon octicon octicon-sign-in'),
											_1: {ctor: '[]'}
										},
										{ctor: '[]'}),
									_1: {
										ctor: '::',
										_0: _elm_lang$html$Html$text('log in'),
										_1: {ctor: '[]'}
									}
								});
						} else {
							var _p110 = _p109._0.user;
							return A2(
								_elm_lang$html$Html$a,
								{
									ctor: '::',
									_0: _elm_lang$html$Html_Attributes$class('button user-info'),
									_1: {
										ctor: '::',
										_0: _elm_lang$html$Html_Attributes$href(_p110.url),
										_1: {ctor: '[]'}
									}
								},
								{
									ctor: '::',
									_0: A2(
										_elm_lang$html$Html$img,
										{
											ctor: '::',
											_0: _elm_lang$html$Html_Attributes$class('user-avatar'),
											_1: {
												ctor: '::',
												_0: _elm_lang$html$Html_Attributes$src(_p110.avatar),
												_1: {ctor: '[]'}
											}
										},
										{ctor: '[]'}),
									_1: {
										ctor: '::',
										_0: _elm_lang$html$Html$text(_p110.login),
										_1: {ctor: '[]'}
									}
								});
						}
					}(),
					_1: {
						ctor: '::',
						_0: A2(
							_elm_lang$html$Html$a,
							{
								ctor: '::',
								_0: _elm_lang$html$Html_Attributes$class('button'),
								_1: {
									ctor: '::',
									_0: _elm_lang$html$Html_Attributes$href('/'),
									_1: {
										ctor: '::',
										_0: _vito$cadet$StrictEvents$onLeftClick(
											_vito$cadet$Main$SetPage(_vito$cadet$Main$GlobalGraphPage)),
										_1: {ctor: '[]'}
									}
								}
							},
							{
								ctor: '::',
								_0: A2(
									_elm_lang$html$Html$span,
									{
										ctor: '::',
										_0: _elm_lang$html$Html_Attributes$class('octicon octicon-globe'),
										_1: {ctor: '[]'}
									},
									{ctor: '[]'}),
								_1: {ctor: '[]'}
							}),
						_1: {
							ctor: '::',
							_0: A2(
								_elm_lang$html$Html$a,
								{
									ctor: '::',
									_0: _elm_lang$html$Html_Attributes$class('button'),
									_1: {
										ctor: '::',
										_0: _elm_lang$html$Html_Attributes$href('/projects'),
										_1: {
											ctor: '::',
											_0: _vito$cadet$StrictEvents$onLeftClick(
												_vito$cadet$Main$SetPage(_vito$cadet$Main$AllProjectsPage)),
											_1: {ctor: '[]'}
										}
									}
								},
								{
									ctor: '::',
									_0: A2(
										_elm_lang$html$Html$span,
										{
											ctor: '::',
											_0: _elm_lang$html$Html_Attributes$class('octicon octicon-list-unordered'),
											_1: {ctor: '[]'}
										},
										{ctor: '[]'}),
									_1: {ctor: '[]'}
								}),
							_1: {ctor: '[]'}
						}
					}
				}),
			_1: {
				ctor: '::',
				_0: _vito$cadet$Main$viewSearch,
				_1: {ctor: '[]'}
			}
		});
};
var _vito$cadet$Main$view = function (model) {
	var selectedCards = A2(
		_elm_lang$core$List$map,
		_vito$cadet$Main$viewCardEntry(model),
		A2(
			_elm_lang$core$List$filterMap,
			A2(_elm_lang$core$Basics$flip, _elm_lang$core$Dict$get, model.allCards),
			model.selectedCards));
	var anticipatedCards = A2(
		_elm_lang$core$List$map,
		_vito$cadet$Main$viewCardEntry(model),
		A2(
			_elm_lang$core$List$filterMap,
			A2(_elm_lang$core$Basics$flip, _elm_lang$core$Dict$get, model.allCards),
			A2(
				_elm_lang$core$List$filter,
				function (_p111) {
					return !A3(_elm_lang$core$Basics$flip, _elm_lang$core$List$member, model.selectedCards, _p111);
				},
				model.anticipatedCards)));
	var sidebarCards = A2(_elm_lang$core$Basics_ops['++'], selectedCards, anticipatedCards);
	return A2(
		_elm_lang$html$Html$div,
		{
			ctor: '::',
			_0: _elm_lang$html$Html_Attributes$class('cadet'),
			_1: {ctor: '[]'}
		},
		{
			ctor: '::',
			_0: A2(
				_elm_lang$html$Html$div,
				{
					ctor: '::',
					_0: _elm_lang$html$Html_Attributes$class('main-page'),
					_1: {ctor: '[]'}
				},
				{
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$div,
						{
							ctor: '::',
							_0: _elm_lang$html$Html_Attributes$class('page-content'),
							_1: {ctor: '[]'}
						},
						{
							ctor: '::',
							_0: function () {
								var _p112 = model.page;
								switch (_p112.ctor) {
									case 'GlobalGraphPage':
										return _vito$cadet$Main$viewGlobalGraphPage(model);
									case 'AllProjectsPage':
										return _vito$cadet$Main$viewAllProjectsPage(model);
									default:
										return A2(_vito$cadet$Main$viewProjectPage, model, _p112._0);
								}
							}(),
							_1: {ctor: '[]'}
						}),
					_1: {
						ctor: '::',
						_0: A2(
							_elm_lang$html$Html$div,
							{
								ctor: '::',
								_0: _elm_lang$html$Html_Attributes$class('page-sidebar'),
								_1: {ctor: '[]'}
							},
							{
								ctor: '::',
								_0: _elm_lang$core$List$isEmpty(sidebarCards) ? A2(
									_elm_lang$html$Html$div,
									{
										ctor: '::',
										_0: _elm_lang$html$Html_Attributes$class('no-cards'),
										_1: {ctor: '[]'}
									},
									{
										ctor: '::',
										_0: _elm_lang$html$Html$text('no cards selected'),
										_1: {ctor: '[]'}
									}) : A2(
									_elm_lang$html$Html$div,
									{
										ctor: '::',
										_0: _elm_lang$html$Html_Attributes$class('cards'),
										_1: {ctor: '[]'}
									},
									sidebarCards),
								_1: {ctor: '[]'}
							}),
						_1: {ctor: '[]'}
					}
				}),
			_1: {
				ctor: '::',
				_0: _vito$cadet$Main$viewNavBar(model),
				_1: {ctor: '[]'}
			}
		});
};
var _vito$cadet$Main$main = _rgrempel$elm_route_url$RouteUrl$programWithFlags(
	{init: _vito$cadet$Main$init, update: _vito$cadet$Main$update, view: _vito$cadet$Main$view, subscriptions: _vito$cadet$Main$subscriptions, delta2url: _vito$cadet$Main$delta2url, location2messages: _vito$cadet$Main$location2messages})(
	A2(
		_elm_lang$core$Json_Decode$andThen,
		function (initialDate) {
			return _elm_lang$core$Json_Decode$succeed(
				{initialDate: initialDate});
		},
		A2(_elm_lang$core$Json_Decode$field, 'initialDate', _elm_lang$core$Json_Decode$float)));

var Elm = {};
Elm['Main'] = Elm['Main'] || {};
if (typeof _vito$cadet$Main$main !== 'undefined') {
    _vito$cadet$Main$main(Elm['Main'], 'Main', undefined);
}

if (typeof define === "function" && define['amd'])
{
  define([], function() { return Elm; });
  return;
}

if (typeof module === "object")
{
  module['exports'] = Elm;
  return;
}

var globalElm = this['Elm'];
if (typeof globalElm === "undefined")
{
  this['Elm'] = Elm;
  return;
}

for (var publicModule in Elm)
{
  if (publicModule in globalElm)
  {
    throw new Error('There are two Elm modules called `' + publicModule + '` on this page! Rename one of them.');
  }
  globalElm[publicModule] = Elm[publicModule];
}

}).call(this);

