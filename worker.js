
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
					_0: 'project_id',
					_1: _elm_lang$core$Json_Encode$string(record.projectID)
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
var _vito$cadet$GitHubGraph$CardLocation = F3(
	function (a, b, c) {
		return {id: a, projectID: b, column: c};
	});
var _vito$cadet$GitHubGraph$decodeCardLocation = A2(
	_elm_community$json_extra$Json_Decode_Extra_ops['|:'],
	A2(
		_elm_community$json_extra$Json_Decode_Extra_ops['|:'],
		A2(
			_elm_community$json_extra$Json_Decode_Extra_ops['|:'],
			_elm_lang$core$Json_Decode$succeed(_vito$cadet$GitHubGraph$CardLocation),
			A2(_elm_lang$core$Json_Decode$field, 'id', _elm_lang$core$Json_Decode$string)),
		A2(_elm_lang$core$Json_Decode$field, 'project_id', _elm_lang$core$Json_Decode$string)),
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
				_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$extract(
					A3(
						_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$field,
						'id',
						{ctor: '[]'},
						_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$string))),
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
				_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$extract(
					A3(
						_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$field,
						'id',
						{ctor: '[]'},
						_jamesmacaulay$elm_graphql$GraphQL_Request_Builder$string))),
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

var _vito$cadet$Data$encodeActorEvent = function (_p0) {
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
var _vito$cadet$Data$Data = F6(
	function (a, b, c, d, e, f) {
		return {issues: a, prs: b, references: c, actors: d, projects: e, cards: f};
	});
var _vito$cadet$Data$ActorEvent = F2(
	function (a, b) {
		return {actor: a, createdAt: b};
	});
var _vito$cadet$Data$decodeActorEvent = A2(
	_elm_community$json_extra$Json_Decode_Extra_ops['|:'],
	A2(
		_elm_community$json_extra$Json_Decode_Extra_ops['|:'],
		_elm_lang$core$Json_Decode$succeed(_vito$cadet$Data$ActorEvent),
		A2(_elm_lang$core$Json_Decode$field, 'actor', _vito$cadet$GitHubGraph$decodeUser)),
	A2(_elm_lang$core$Json_Decode$field, 'createdAt', _elm_community$json_extra$Json_Decode_Extra$date));
var _vito$cadet$Data$decodeData = A2(
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
						_elm_lang$core$Json_Decode$succeed(_vito$cadet$Data$Data),
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
					_elm_lang$core$Json_Decode$list(_vito$cadet$Data$decodeActorEvent)))),
		A2(
			_elm_lang$core$Json_Decode$field,
			'projects',
			_elm_lang$core$Json_Decode$list(_vito$cadet$GitHubGraph$decodeProject))),
	A2(
		_elm_lang$core$Json_Decode$field,
		'cards',
		_elm_lang$core$Json_Decode$dict(
			_elm_lang$core$Json_Decode$list(_vito$cadet$GitHubGraph$decodeProjectColumnCard))));
var _vito$cadet$Data$fetch = function (f) {
	return A2(
		_elm_lang$core$Task$attempt,
		f,
		_lukewestby$elm_http_builder$HttpBuilder$toTask(
			A2(
				_lukewestby$elm_http_builder$HttpBuilder$withExpect,
				_elm_lang$http$Http$expectJson(_vito$cadet$Data$decodeData),
				_lukewestby$elm_http_builder$HttpBuilder$get('/data'))));
};

var _vito$cadet$Main$log = F2(
	function (msg, val) {
		return A2(
			_elm_lang$core$Basics$flip,
			_elm_lang$core$Basics$always,
			A2(_elm_lang$core$Debug$log, msg, val));
	});
var _vito$cadet$Main$backOff = F2(
	function (model, cmd) {
		return {
			ctor: '_Tuple2',
			_0: _elm_lang$core$Native_Utils.update(
				model,
				{
					failedQueue: {
						ctor: '::',
						_0: cmd,
						_1: A2(_elm_lang$core$Basics_ops['++'], model.loadQueue, model.failedQueue)
					},
					loadQueue: {ctor: '[]'}
				}),
			_1: _elm_lang$core$Platform_Cmd$none
		};
	});
var _vito$cadet$Main$setIssues = _elm_lang$core$Native_Platform.outgoingPort(
	'setIssues',
	function (v) {
		return [
			v._0,
			_elm_lang$core$Native_List.toArray(v._1).map(
			function (v) {
				return v;
			})
		];
	});
var _vito$cadet$Main$setPullRequests = _elm_lang$core$Native_Platform.outgoingPort(
	'setPullRequests',
	function (v) {
		return [
			v._0,
			_elm_lang$core$Native_List.toArray(v._1).map(
			function (v) {
				return v;
			})
		];
	});
var _vito$cadet$Main$setReferences = _elm_lang$core$Native_Platform.outgoingPort(
	'setReferences',
	function (v) {
		return [
			v._0,
			_elm_lang$core$Native_List.toArray(v._1).map(
			function (v) {
				return v;
			})
		];
	});
var _vito$cadet$Main$setActors = _elm_lang$core$Native_Platform.outgoingPort(
	'setActors',
	function (v) {
		return [
			v._0,
			_elm_lang$core$Native_List.toArray(v._1).map(
			function (v) {
				return v;
			})
		];
	});
var _vito$cadet$Main$setProjects = _elm_lang$core$Native_Platform.outgoingPort(
	'setProjects',
	function (v) {
		return _elm_lang$core$Native_List.toArray(v).map(
			function (v) {
				return v;
			});
	});
var _vito$cadet$Main$setCards = _elm_lang$core$Native_Platform.outgoingPort(
	'setCards',
	function (v) {
		return [
			v._0,
			_elm_lang$core$Native_List.toArray(v._1).map(
			function (v) {
				return v;
			})
		];
	});
var _vito$cadet$Main$Flags = F2(
	function (a, b) {
		return {githubToken: a, githubOrg: b};
	});
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
										return {githubToken: a, githubOrg: b, repos: c, issues: d, prs: e, timelines: f, projects: g, columnCards: h, loadQueue: i, failedQueue: j};
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
var _vito$cadet$Main$TimelineFetched = F2(
	function (a, b) {
		return {ctor: 'TimelineFetched', _0: a, _1: b};
	});
var _vito$cadet$Main$fetchTimeline = F2(
	function (model, id) {
		return A2(
			_elm_lang$core$Task$attempt,
			_vito$cadet$Main$TimelineFetched(id),
			A2(
				_vito$cadet$GitHubGraph$fetchTimeline,
				model.githubToken,
				{id: id}));
	});
var _vito$cadet$Main$PullRequestsFetched = F2(
	function (a, b) {
		return {ctor: 'PullRequestsFetched', _0: a, _1: b};
	});
var _vito$cadet$Main$fetchPullRequests = F2(
	function (model, repo) {
		return A2(
			_elm_lang$core$Task$attempt,
			_vito$cadet$Main$PullRequestsFetched(repo),
			A2(
				_vito$cadet$GitHubGraph$fetchRepoPullRequests,
				model.githubToken,
				{owner: repo.owner, name: repo.name}));
	});
var _vito$cadet$Main$IssuesFetched = F2(
	function (a, b) {
		return {ctor: 'IssuesFetched', _0: a, _1: b};
	});
var _vito$cadet$Main$fetchIssues = F2(
	function (model, repo) {
		return A2(
			_elm_lang$core$Task$attempt,
			_vito$cadet$Main$IssuesFetched(repo),
			A2(
				_vito$cadet$GitHubGraph$fetchRepoIssues,
				model.githubToken,
				{owner: repo.owner, name: repo.name}));
	});
var _vito$cadet$Main$CardsFetched = F2(
	function (a, b) {
		return {ctor: 'CardsFetched', _0: a, _1: b};
	});
var _vito$cadet$Main$fetchCards = F2(
	function (model, col) {
		return A2(
			_elm_lang$core$Task$attempt,
			_vito$cadet$Main$CardsFetched(col),
			A2(
				_vito$cadet$GitHubGraph$fetchProjectColumnCards,
				model.githubToken,
				{id: col.id}));
	});
var _vito$cadet$Main$ProjectsFetched = function (a) {
	return {ctor: 'ProjectsFetched', _0: a};
};
var _vito$cadet$Main$fetchProjects = function (model) {
	return A2(
		_elm_lang$core$Task$attempt,
		_vito$cadet$Main$ProjectsFetched,
		A2(
			_vito$cadet$GitHubGraph$fetchOrgProjects,
			model.githubToken,
			{name: model.githubOrg}));
};
var _vito$cadet$Main$RepositoriesFetched = function (a) {
	return {ctor: 'RepositoriesFetched', _0: a};
};
var _vito$cadet$Main$fetchRepos = function (model) {
	return A2(
		_elm_lang$core$Task$attempt,
		_vito$cadet$Main$RepositoriesFetched,
		A2(
			_vito$cadet$GitHubGraph$fetchOrgRepos,
			model.githubToken,
			{name: model.githubOrg}));
};
var _vito$cadet$Main$update = F2(
	function (msg, model) {
		var _p0 = msg;
		switch (_p0.ctor) {
			case 'Refresh':
				return A3(
					_vito$cadet$Main$log,
					'refreshing',
					_p0._0,
					{
						ctor: '_Tuple2',
						_0: _elm_lang$core$Native_Utils.update(
							model,
							{
								loadQueue: {
									ctor: '::',
									_0: _vito$cadet$Main$fetchRepos(model),
									_1: {
										ctor: '::',
										_0: _vito$cadet$Main$fetchProjects(model),
										_1: model.loadQueue
									}
								}
							}),
						_1: _elm_lang$core$Platform_Cmd$none
					});
			case 'PopQueue':
				var _p1 = model.loadQueue;
				if (_p1.ctor === '::') {
					return {
						ctor: '_Tuple2',
						_0: _elm_lang$core$Native_Utils.update(
							model,
							{loadQueue: _p1._1}),
						_1: _p1._0
					};
				} else {
					return {ctor: '_Tuple2', _0: model, _1: _elm_lang$core$Platform_Cmd$none};
				}
			case 'RetryQueue':
				return A3(
					_vito$cadet$Main$log,
					'retrying failed fetches',
					_elm_lang$core$List$length(model.failedQueue),
					{
						ctor: '_Tuple2',
						_0: _elm_lang$core$Native_Utils.update(
							model,
							{
								failedQueue: {ctor: '[]'},
								loadQueue: A2(_elm_lang$core$Basics_ops['++'], model.failedQueue, model.loadQueue)
							}),
						_1: _elm_lang$core$Platform_Cmd$none
					});
			case 'RepositoriesFetched':
				if (_p0._0.ctor === 'Ok') {
					var _p2 = _p0._0._0;
					return A3(
						_vito$cadet$Main$log,
						'repositories fetched',
						_elm_lang$core$List$length(_p2),
						function () {
							var fetch = function (repo) {
								return {
									ctor: '::',
									_0: A2(_vito$cadet$Main$fetchIssues, model, repo),
									_1: {
										ctor: '::',
										_0: A2(_vito$cadet$Main$fetchPullRequests, model, repo),
										_1: {ctor: '[]'}
									}
								};
							};
							return {
								ctor: '_Tuple2',
								_0: _elm_lang$core$Native_Utils.update(
									model,
									{
										repos: _p2,
										loadQueue: A2(
											_elm_lang$core$Basics_ops['++'],
											A2(_elm_lang$core$List$concatMap, fetch, _p2),
											model.loadQueue)
									}),
								_1: _elm_lang$core$Platform_Cmd$none
							};
						}());
				} else {
					return A3(
						_vito$cadet$Main$log,
						'failed to fetch repos',
						_p0._0._0,
						A2(
							_vito$cadet$Main$backOff,
							model,
							_vito$cadet$Main$fetchRepos(model)));
				}
			case 'ProjectsFetched':
				if (_p0._0.ctor === 'Ok') {
					var _p4 = _p0._0._0;
					return A3(
						_vito$cadet$Main$log,
						'projects fetched',
						_elm_lang$core$List$length(_p4),
						{
							ctor: '_Tuple2',
							_0: _elm_lang$core$Native_Utils.update(
								model,
								{
									projects: _p4,
									loadQueue: A2(
										_elm_lang$core$Basics_ops['++'],
										A2(
											_elm_lang$core$List$concatMap,
											function (_p3) {
												return A2(
													_elm_lang$core$List$map,
													_vito$cadet$Main$fetchCards(model),
													function (_) {
														return _.columns;
													}(_p3));
											},
											_p4),
										model.loadQueue)
								}),
							_1: _vito$cadet$Main$setProjects(
								A2(_elm_lang$core$List$map, _vito$cadet$GitHubGraph$encodeProject, _p4))
						});
				} else {
					return A3(
						_vito$cadet$Main$log,
						'failed to fetch projects',
						_p0._0._0,
						A2(
							_vito$cadet$Main$backOff,
							model,
							_vito$cadet$Main$fetchProjects(model)));
				}
			case 'CardsFetched':
				if (_p0._1.ctor === 'Ok') {
					var _p6 = _p0._0;
					var _p5 = _p0._1._0;
					return A3(
						_vito$cadet$Main$log,
						'cards fetched for',
						_p6.name,
						{
							ctor: '_Tuple2',
							_0: _elm_lang$core$Native_Utils.update(
								model,
								{
									columnCards: A3(_elm_lang$core$Dict$insert, _p6.id, _p5, model.columnCards)
								}),
							_1: _vito$cadet$Main$setCards(
								{
									ctor: '_Tuple2',
									_0: _p6.id,
									_1: A2(_elm_lang$core$List$map, _vito$cadet$GitHubGraph$encodeProjectColumnCard, _p5)
								})
						});
				} else {
					var _p7 = _p0._0;
					return A3(
						_vito$cadet$Main$log,
						'failed to fetch cards',
						{ctor: '_Tuple2', _0: _p7.name, _1: _p0._1._0},
						A2(
							_vito$cadet$Main$backOff,
							model,
							A2(_vito$cadet$Main$fetchCards, model, _p7)));
				}
			case 'IssuesFetched':
				if (_p0._1.ctor === 'Ok') {
					var _p10 = _p0._0;
					var _p9 = _p0._1._0;
					var fetchTimelines = A2(
						_elm_lang$core$List$map,
						function (_p8) {
							return A2(
								_vito$cadet$Main$fetchTimeline,
								model,
								function (_) {
									return _.id;
								}(_p8));
						},
						_p9);
					return A3(
						_vito$cadet$Main$log,
						'issues fetched for',
						_p10.url,
						{
							ctor: '_Tuple2',
							_0: _elm_lang$core$Native_Utils.update(
								model,
								{
									issues: A3(_elm_lang$core$Dict$insert, _p10.id, _p9, model.issues),
									loadQueue: A2(_elm_lang$core$Basics_ops['++'], fetchTimelines, model.loadQueue)
								}),
							_1: _vito$cadet$Main$setIssues(
								{
									ctor: '_Tuple2',
									_0: _p10.id,
									_1: A2(_elm_lang$core$List$map, _vito$cadet$GitHubGraph$encodeIssue, _p9)
								})
						});
				} else {
					var _p11 = _p0._0;
					return A3(
						_vito$cadet$Main$log,
						'failed to fetch issues',
						{ctor: '_Tuple2', _0: _p11.url, _1: _p0._1._0},
						A2(
							_vito$cadet$Main$backOff,
							model,
							A2(_vito$cadet$Main$fetchIssues, model, _p11)));
				}
			case 'PullRequestsFetched':
				if (_p0._1.ctor === 'Ok') {
					var _p14 = _p0._0;
					var _p13 = _p0._1._0;
					var fetchTimelines = A2(
						_elm_lang$core$List$map,
						function (_p12) {
							return A2(
								_vito$cadet$Main$fetchTimeline,
								model,
								function (_) {
									return _.id;
								}(_p12));
						},
						_p13);
					return A3(
						_vito$cadet$Main$log,
						'prs fetched for',
						_p14.url,
						{
							ctor: '_Tuple2',
							_0: _elm_lang$core$Native_Utils.update(
								model,
								{
									prs: A3(_elm_lang$core$Dict$insert, _p14.id, _p13, model.prs),
									loadQueue: A2(_elm_lang$core$Basics_ops['++'], fetchTimelines, model.loadQueue)
								}),
							_1: _vito$cadet$Main$setPullRequests(
								{
									ctor: '_Tuple2',
									_0: _p14.id,
									_1: A2(_elm_lang$core$List$map, _vito$cadet$GitHubGraph$encodePullRequest, _p13)
								})
						});
				} else {
					var _p15 = _p0._0;
					return A3(
						_vito$cadet$Main$log,
						'failed to fetch prs',
						{ctor: '_Tuple2', _0: _p15.url, _1: _p0._1._0},
						A2(
							_vito$cadet$Main$backOff,
							model,
							A2(_vito$cadet$Main$fetchPullRequests, model, _p15)));
				}
			default:
				if (_p0._1.ctor === 'Ok') {
					var _p19 = _p0._1._0;
					var _p18 = _p0._0;
					var commentActor = function (event) {
						var _p16 = event;
						if ((_p16.ctor === 'IssueCommentEvent') && (_p16._0.ctor === 'Just')) {
							return _elm_lang$core$Maybe$Just(
								_vito$cadet$Data$encodeActorEvent(
									{actor: _p16._0._0, createdAt: _p16._1}));
						} else {
							return _elm_lang$core$Maybe$Nothing;
						}
					};
					var actors = A2(_elm_lang$core$List$filterMap, commentActor, _p19);
					var findSource = function (event) {
						var _p17 = event;
						if (_p17.ctor === 'CrossReferencedEvent') {
							return _elm_lang$core$Maybe$Just(_p17._0);
						} else {
							return _elm_lang$core$Maybe$Nothing;
						}
					};
					var edges = A2(_elm_lang$core$List$filterMap, findSource, _p19);
					return A3(
						_vito$cadet$Main$log,
						'timeline fetched for',
						_p18,
						{
							ctor: '_Tuple2',
							_0: model,
							_1: _elm_lang$core$Platform_Cmd$batch(
								{
									ctor: '::',
									_0: _vito$cadet$Main$setReferences(
										{ctor: '_Tuple2', _0: _p18, _1: edges}),
									_1: {
										ctor: '::',
										_0: _vito$cadet$Main$setActors(
											{ctor: '_Tuple2', _0: _p18, _1: actors}),
										_1: {ctor: '[]'}
									}
								})
						});
				} else {
					var _p20 = _p0._0;
					return A3(
						_vito$cadet$Main$log,
						'failed to fetch timeline',
						{ctor: '_Tuple2', _0: _p20, _1: _p0._1._0},
						A2(
							_vito$cadet$Main$backOff,
							model,
							A2(_vito$cadet$Main$fetchTimeline, model, _p20)));
				}
		}
	});
var _vito$cadet$Main$RetryQueue = function (a) {
	return {ctor: 'RetryQueue', _0: a};
};
var _vito$cadet$Main$PopQueue = function (a) {
	return {ctor: 'PopQueue', _0: a};
};
var _vito$cadet$Main$Refresh = function (a) {
	return {ctor: 'Refresh', _0: a};
};
var _vito$cadet$Main$init = function (_p21) {
	var _p22 = _p21;
	return A2(
		_vito$cadet$Main$update,
		_vito$cadet$Main$Refresh(0),
		{
			githubToken: _p22.githubToken,
			githubOrg: _p22.githubOrg,
			repos: {ctor: '[]'},
			issues: _elm_lang$core$Dict$empty,
			prs: _elm_lang$core$Dict$empty,
			timelines: _elm_lang$core$Dict$empty,
			projects: {ctor: '[]'},
			columnCards: _elm_lang$core$Dict$empty,
			loadQueue: {ctor: '[]'},
			failedQueue: {ctor: '[]'}
		});
};
var _vito$cadet$Main$subscriptions = function (model) {
	return _elm_lang$core$Platform_Sub$batch(
		{
			ctor: '::',
			_0: A2(_elm_lang$core$Time$every, 100 * _elm_lang$core$Time$millisecond, _vito$cadet$Main$PopQueue),
			_1: {
				ctor: '::',
				_0: A2(_elm_lang$core$Time$every, 10 * _elm_lang$core$Time$second, _vito$cadet$Main$RetryQueue),
				_1: {
					ctor: '::',
					_0: A2(_elm_lang$core$Time$every, _elm_lang$core$Time$hour, _vito$cadet$Main$Refresh),
					_1: {ctor: '[]'}
				}
			}
		});
};
var _vito$cadet$Main$main = _elm_lang$core$Platform$programWithFlags(
	{init: _vito$cadet$Main$init, update: _vito$cadet$Main$update, subscriptions: _vito$cadet$Main$subscriptions})(
	A2(
		_elm_lang$core$Json_Decode$andThen,
		function (githubOrg) {
			return A2(
				_elm_lang$core$Json_Decode$andThen,
				function (githubToken) {
					return _elm_lang$core$Json_Decode$succeed(
						{githubOrg: githubOrg, githubToken: githubToken});
				},
				A2(_elm_lang$core$Json_Decode$field, 'githubToken', _elm_lang$core$Json_Decode$string));
		},
		A2(_elm_lang$core$Json_Decode$field, 'githubOrg', _elm_lang$core$Json_Decode$string)));

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

