(function(scope){
'use strict';

function F(arity, fun, wrapper) {
  wrapper.a = arity;
  wrapper.f = fun;
  return wrapper;
}

function F2(fun) {
  return F(2, fun, function(a) { return function(b) { return fun(a,b); }; })
}
function F3(fun) {
  return F(3, fun, function(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  });
}
function F4(fun) {
  return F(4, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  });
}
function F5(fun) {
  return F(5, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  });
}
function F6(fun) {
  return F(6, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  });
}
function F7(fun) {
  return F(7, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  });
}
function F8(fun) {
  return F(8, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  });
}
function F9(fun) {
  return F(9, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  });
}

function A2(fun, a, b) {
  return fun.a === 2 ? fun.f(a, b) : fun(a)(b);
}
function A3(fun, a, b, c) {
  return fun.a === 3 ? fun.f(a, b, c) : fun(a)(b)(c);
}
function A4(fun, a, b, c, d) {
  return fun.a === 4 ? fun.f(a, b, c, d) : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e) {
  return fun.a === 5 ? fun.f(a, b, c, d, e) : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f) {
  return fun.a === 6 ? fun.f(a, b, c, d, e, f) : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g) {
  return fun.a === 7 ? fun.f(a, b, c, d, e, f, g) : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h) {
  return fun.a === 8 ? fun.f(a, b, c, d, e, f, g, h) : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i) {
  return fun.a === 9 ? fun.f(a, b, c, d, e, f, g, h, i) : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}

console.warn('Compiled in DEV mode. Follow the advice at https://elm-lang.org/0.19.0/optimize for better performance and smaller assets.');


var _List_Nil_UNUSED = { $: 0 };
var _List_Nil = { $: '[]' };

function _List_Cons_UNUSED(hd, tl) { return { $: 1, a: hd, b: tl }; }
function _List_Cons(hd, tl) { return { $: '::', a: hd, b: tl }; }


var _List_cons = F2(_List_Cons);

function _List_fromArray(arr)
{
	var out = _List_Nil;
	for (var i = arr.length; i--; )
	{
		out = _List_Cons(arr[i], out);
	}
	return out;
}

function _List_toArray(xs)
{
	for (var out = []; xs.b; xs = xs.b) // WHILE_CONS
	{
		out.push(xs.a);
	}
	return out;
}

var _List_map2 = F3(function(f, xs, ys)
{
	for (var arr = []; xs.b && ys.b; xs = xs.b, ys = ys.b) // WHILE_CONSES
	{
		arr.push(A2(f, xs.a, ys.a));
	}
	return _List_fromArray(arr);
});

var _List_map3 = F4(function(f, xs, ys, zs)
{
	for (var arr = []; xs.b && ys.b && zs.b; xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A3(f, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map4 = F5(function(f, ws, xs, ys, zs)
{
	for (var arr = []; ws.b && xs.b && ys.b && zs.b; ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A4(f, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map5 = F6(function(f, vs, ws, xs, ys, zs)
{
	for (var arr = []; vs.b && ws.b && xs.b && ys.b && zs.b; vs = vs.b, ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A5(f, vs.a, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_sortBy = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		return _Utils_cmp(f(a), f(b));
	}));
});

var _List_sortWith = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		var ord = A2(f, a, b);
		return ord === elm$core$Basics$EQ ? 0 : ord === elm$core$Basics$LT ? -1 : 1;
	}));
});



// EQUALITY

function _Utils_eq(x, y)
{
	for (
		var pair, stack = [], isEqual = _Utils_eqHelp(x, y, 0, stack);
		isEqual && (pair = stack.pop());
		isEqual = _Utils_eqHelp(pair.a, pair.b, 0, stack)
		)
	{}

	return isEqual;
}

function _Utils_eqHelp(x, y, depth, stack)
{
	if (depth > 100)
	{
		stack.push(_Utils_Tuple2(x,y));
		return true;
	}

	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object' || x === null || y === null)
	{
		typeof x === 'function' && _Debug_crash(5);
		return false;
	}

	/**/
	if (x.$ === 'Set_elm_builtin')
	{
		x = elm$core$Set$toList(x);
		y = elm$core$Set$toList(y);
	}
	if (x.$ === 'RBNode_elm_builtin' || x.$ === 'RBEmpty_elm_builtin')
	{
		x = elm$core$Dict$toList(x);
		y = elm$core$Dict$toList(y);
	}
	//*/

	/**_UNUSED/
	if (x.$ < 0)
	{
		x = elm$core$Dict$toList(x);
		y = elm$core$Dict$toList(y);
	}
	//*/

	for (var key in x)
	{
		if (!_Utils_eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

var _Utils_equal = F2(_Utils_eq);
var _Utils_notEqual = F2(function(a, b) { return !_Utils_eq(a,b); });



// COMPARISONS

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

function _Utils_cmp(x, y, ord)
{
	if (typeof x !== 'object')
	{
		return x === y ? /*EQ*/ 0 : x < y ? /*LT*/ -1 : /*GT*/ 1;
	}

	/**/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

	/**_UNUSED/
	if (!x.$)
	//*/
	/**/
	if (x.$[0] === '#')
	//*/
	{
		return (ord = _Utils_cmp(x.a, y.a))
			? ord
			: (ord = _Utils_cmp(x.b, y.b))
				? ord
				: _Utils_cmp(x.c, y.c);
	}

	// traverse conses until end of a list or a mismatch
	for (; x.b && y.b && !(ord = _Utils_cmp(x.a, y.a)); x = x.b, y = y.b) {} // WHILE_CONSES
	return ord || (x.b ? /*GT*/ 1 : y.b ? /*LT*/ -1 : /*EQ*/ 0);
}

var _Utils_lt = F2(function(a, b) { return _Utils_cmp(a, b) < 0; });
var _Utils_le = F2(function(a, b) { return _Utils_cmp(a, b) < 1; });
var _Utils_gt = F2(function(a, b) { return _Utils_cmp(a, b) > 0; });
var _Utils_ge = F2(function(a, b) { return _Utils_cmp(a, b) >= 0; });

var _Utils_compare = F2(function(x, y)
{
	var n = _Utils_cmp(x, y);
	return n < 0 ? elm$core$Basics$LT : n ? elm$core$Basics$GT : elm$core$Basics$EQ;
});


// COMMON VALUES

var _Utils_Tuple0_UNUSED = 0;
var _Utils_Tuple0 = { $: '#0' };

function _Utils_Tuple2_UNUSED(a, b) { return { a: a, b: b }; }
function _Utils_Tuple2(a, b) { return { $: '#2', a: a, b: b }; }

function _Utils_Tuple3_UNUSED(a, b, c) { return { a: a, b: b, c: c }; }
function _Utils_Tuple3(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }

function _Utils_chr_UNUSED(c) { return c; }
function _Utils_chr(c) { return new String(c); }


// RECORDS

function _Utils_update(oldRecord, updatedFields)
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


// APPEND

var _Utils_append = F2(_Utils_ap);

function _Utils_ap(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (!xs.b)
	{
		return ys;
	}
	var root = _List_Cons(xs.a, ys);
	xs = xs.b
	for (var curr = root; xs.b; xs = xs.b) // WHILE_CONS
	{
		curr = curr.b = _List_Cons(xs.a, ys);
	}
	return root;
}



var _JsArray_empty = [];

function _JsArray_singleton(value)
{
    return [value];
}

function _JsArray_length(array)
{
    return array.length;
}

var _JsArray_initialize = F3(function(size, offset, func)
{
    var result = new Array(size);

    for (var i = 0; i < size; i++)
    {
        result[i] = func(offset + i);
    }

    return result;
});

var _JsArray_initializeFromList = F2(function (max, ls)
{
    var result = new Array(max);

    for (var i = 0; i < max && ls.b; i++)
    {
        result[i] = ls.a;
        ls = ls.b;
    }

    result.length = i;
    return _Utils_Tuple2(result, ls);
});

var _JsArray_unsafeGet = F2(function(index, array)
{
    return array[index];
});

var _JsArray_unsafeSet = F3(function(index, value, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[index] = value;
    return result;
});

var _JsArray_push = F2(function(value, array)
{
    var length = array.length;
    var result = new Array(length + 1);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[length] = value;
    return result;
});

var _JsArray_foldl = F3(function(func, acc, array)
{
    var length = array.length;

    for (var i = 0; i < length; i++)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_foldr = F3(function(func, acc, array)
{
    for (var i = array.length - 1; i >= 0; i--)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_map = F2(function(func, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = func(array[i]);
    }

    return result;
});

var _JsArray_indexedMap = F3(function(func, offset, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = A2(func, offset + i, array[i]);
    }

    return result;
});

var _JsArray_slice = F3(function(from, to, array)
{
    return array.slice(from, to);
});

var _JsArray_appendN = F3(function(n, dest, source)
{
    var destLen = dest.length;
    var itemsToCopy = n - destLen;

    if (itemsToCopy > source.length)
    {
        itemsToCopy = source.length;
    }

    var size = destLen + itemsToCopy;
    var result = new Array(size);

    for (var i = 0; i < destLen; i++)
    {
        result[i] = dest[i];
    }

    for (var i = 0; i < itemsToCopy; i++)
    {
        result[i + destLen] = source[i];
    }

    return result;
});



// LOG

var _Debug_log_UNUSED = F2(function(tag, value)
{
	return value;
});

var _Debug_log = F2(function(tag, value)
{
	console.log(tag + ': ' + _Debug_toString(value));
	return value;
});


// TODOS

function _Debug_todo(moduleName, region)
{
	return function(message) {
		_Debug_crash(8, moduleName, region, message);
	};
}

function _Debug_todoCase(moduleName, region, value)
{
	return function(message) {
		_Debug_crash(9, moduleName, region, value, message);
	};
}


// TO STRING

function _Debug_toString_UNUSED(value)
{
	return '<internals>';
}

function _Debug_toString(value)
{
	return _Debug_toAnsiString(false, value);
}

function _Debug_toAnsiString(ansi, value)
{
	if (typeof value === 'function')
	{
		return _Debug_internalColor(ansi, '<function>');
	}

	if (typeof value === 'boolean')
	{
		return _Debug_ctorColor(ansi, value ? 'True' : 'False');
	}

	if (typeof value === 'number')
	{
		return _Debug_numberColor(ansi, value + '');
	}

	if (value instanceof String)
	{
		return _Debug_charColor(ansi, "'" + _Debug_addSlashes(value, true) + "'");
	}

	if (typeof value === 'string')
	{
		return _Debug_stringColor(ansi, '"' + _Debug_addSlashes(value, false) + '"');
	}

	if (typeof value === 'object' && '$' in value)
	{
		var tag = value.$;

		if (typeof tag === 'number')
		{
			return _Debug_internalColor(ansi, '<internals>');
		}

		if (tag[0] === '#')
		{
			var output = [];
			for (var k in value)
			{
				if (k === '$') continue;
				output.push(_Debug_toAnsiString(ansi, value[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (tag === 'Set_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Set')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, elm$core$Set$toList(value));
		}

		if (tag === 'RBNode_elm_builtin' || tag === 'RBEmpty_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Dict')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, elm$core$Dict$toList(value));
		}

		if (tag === 'Array_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Array')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, elm$core$Array$toList(value));
		}

		if (tag === '::' || tag === '[]')
		{
			var output = '[';

			value.b && (output += _Debug_toAnsiString(ansi, value.a), value = value.b)

			for (; value.b; value = value.b) // WHILE_CONS
			{
				output += ',' + _Debug_toAnsiString(ansi, value.a);
			}
			return output + ']';
		}

		var output = '';
		for (var i in value)
		{
			if (i === '$') continue;
			var str = _Debug_toAnsiString(ansi, value[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '[' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return _Debug_ctorColor(ansi, tag) + output;
	}

	if (typeof value === 'object')
	{
		var output = [];
		for (var key in value)
		{
			var field = key[0] === '_' ? key.slice(1) : key;
			output.push(_Debug_fadeColor(ansi, field) + ' = ' + _Debug_toAnsiString(ansi, value[key]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return _Debug_internalColor(ansi, '<internals>');
}

function _Debug_addSlashes(str, isChar)
{
	var s = str
		.replace(/\\/g, '\\\\')
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

function _Debug_ctorColor(ansi, string)
{
	return ansi ? '\x1b[96m' + string + '\x1b[0m' : string;
}

function _Debug_numberColor(ansi, string)
{
	return ansi ? '\x1b[95m' + string + '\x1b[0m' : string;
}

function _Debug_stringColor(ansi, string)
{
	return ansi ? '\x1b[93m' + string + '\x1b[0m' : string;
}

function _Debug_charColor(ansi, string)
{
	return ansi ? '\x1b[92m' + string + '\x1b[0m' : string;
}

function _Debug_fadeColor(ansi, string)
{
	return ansi ? '\x1b[37m' + string + '\x1b[0m' : string;
}

function _Debug_internalColor(ansi, string)
{
	return ansi ? '\x1b[94m' + string + '\x1b[0m' : string;
}



// CRASH


function _Debug_crash_UNUSED(identifier)
{
	throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
}


function _Debug_crash(identifier, fact1, fact2, fact3, fact4)
{
	switch(identifier)
	{
		case 0:
			throw new Error('What node should I take over? In JavaScript I need something like:\n\n    Elm.Main.init({\n        node: document.getElementById("elm-node")\n    })\n\nYou need to do this with any Browser.sandbox or Browser.element program.');

		case 1:
			throw new Error('Browser.application programs cannot handle URLs like this:\n\n    ' + document.location.href + '\n\nWhat is the root? The root of your file system? Try looking at this program with `elm reactor` or some other server.');

		case 2:
			var jsonErrorString = fact1;
			throw new Error('Problem with the flags given to your Elm program on initialization.\n\n' + jsonErrorString);

		case 3:
			var portName = fact1;
			throw new Error('There can only be one port named `' + portName + '`, but your program has multiple.');

		case 4:
			var portName = fact1;
			var problem = fact2;
			throw new Error('Trying to send an unexpected type of value through port `' + portName + '`:\n' + problem);

		case 5:
			throw new Error('Trying to use `(==)` on functions.\nThere is no way to know if functions are "the same" in the Elm sense.\nRead more about this at https://package.elm-lang.org/packages/elm/core/latest/Basics#== which describes why it is this way and what the better version will look like.');

		case 6:
			var moduleName = fact1;
			throw new Error('Your page is loading multiple Elm scripts with a module named ' + moduleName + '. Maybe a duplicate script is getting loaded accidentally? If not, rename one of them so I know which is which!');

		case 8:
			var moduleName = fact1;
			var region = fact2;
			var message = fact3;
			throw new Error('TODO in module `' + moduleName + '` ' + _Debug_regionToString(region) + '\n\n' + message);

		case 9:
			var moduleName = fact1;
			var region = fact2;
			var value = fact3;
			var message = fact4;
			throw new Error(
				'TODO in module `' + moduleName + '` from the `case` expression '
				+ _Debug_regionToString(region) + '\n\nIt received the following value:\n\n    '
				+ _Debug_toString(value).replace('\n', '\n    ')
				+ '\n\nBut the branch that handles it says:\n\n    ' + message.replace('\n', '\n    ')
			);

		case 10:
			throw new Error('Bug in https://github.com/elm/virtual-dom/issues');

		case 11:
			throw new Error('Cannot perform mod 0. Division by zero error.');
	}
}

function _Debug_regionToString(region)
{
	if (region.start.line === region.end.line)
	{
		return 'on line ' + region.start.line;
	}
	return 'on lines ' + region.start.line + ' through ' + region.end.line;
}



// MATH

var _Basics_add = F2(function(a, b) { return a + b; });
var _Basics_sub = F2(function(a, b) { return a - b; });
var _Basics_mul = F2(function(a, b) { return a * b; });
var _Basics_fdiv = F2(function(a, b) { return a / b; });
var _Basics_idiv = F2(function(a, b) { return (a / b) | 0; });
var _Basics_pow = F2(Math.pow);

var _Basics_remainderBy = F2(function(b, a) { return a % b; });

// https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/divmodnote-letter.pdf
var _Basics_modBy = F2(function(modulus, x)
{
	var answer = x % modulus;
	return modulus === 0
		? _Debug_crash(11)
		:
	((answer > 0 && modulus < 0) || (answer < 0 && modulus > 0))
		? answer + modulus
		: answer;
});


// TRIGONOMETRY

var _Basics_pi = Math.PI;
var _Basics_e = Math.E;
var _Basics_cos = Math.cos;
var _Basics_sin = Math.sin;
var _Basics_tan = Math.tan;
var _Basics_acos = Math.acos;
var _Basics_asin = Math.asin;
var _Basics_atan = Math.atan;
var _Basics_atan2 = F2(Math.atan2);


// MORE MATH

function _Basics_toFloat(x) { return x; }
function _Basics_truncate(n) { return n | 0; }
function _Basics_isInfinite(n) { return n === Infinity || n === -Infinity; }

var _Basics_ceiling = Math.ceil;
var _Basics_floor = Math.floor;
var _Basics_round = Math.round;
var _Basics_sqrt = Math.sqrt;
var _Basics_log = Math.log;
var _Basics_isNaN = isNaN;


// BOOLEANS

function _Basics_not(bool) { return !bool; }
var _Basics_and = F2(function(a, b) { return a && b; });
var _Basics_or  = F2(function(a, b) { return a || b; });
var _Basics_xor = F2(function(a, b) { return a !== b; });



function _Char_toCode(char)
{
	var code = char.charCodeAt(0);
	if (0xD800 <= code && code <= 0xDBFF)
	{
		return (code - 0xD800) * 0x400 + char.charCodeAt(1) - 0xDC00 + 0x10000
	}
	return code;
}

function _Char_fromCode(code)
{
	return _Utils_chr(
		(code < 0 || 0x10FFFF < code)
			? '\uFFFD'
			:
		(code <= 0xFFFF)
			? String.fromCharCode(code)
			:
		(code -= 0x10000,
			String.fromCharCode(Math.floor(code / 0x400) + 0xD800)
			+
			String.fromCharCode(code % 0x400 + 0xDC00)
		)
	);
}

function _Char_toUpper(char)
{
	return _Utils_chr(char.toUpperCase());
}

function _Char_toLower(char)
{
	return _Utils_chr(char.toLowerCase());
}

function _Char_toLocaleUpper(char)
{
	return _Utils_chr(char.toLocaleUpperCase());
}

function _Char_toLocaleLower(char)
{
	return _Utils_chr(char.toLocaleLowerCase());
}



var _String_cons = F2(function(chr, str)
{
	return chr + str;
});

function _String_uncons(string)
{
	var word = string.charCodeAt(0);
	return word
		? elm$core$Maybe$Just(
			0xD800 <= word && word <= 0xDBFF
				? _Utils_Tuple2(_Utils_chr(string[0] + string[1]), string.slice(2))
				: _Utils_Tuple2(_Utils_chr(string[0]), string.slice(1))
		)
		: elm$core$Maybe$Nothing;
}

var _String_append = F2(function(a, b)
{
	return a + b;
});

function _String_length(str)
{
	return str.length;
}

var _String_map = F2(function(func, string)
{
	var len = string.length;
	var array = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = string.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			array[i] = func(_Utils_chr(string[i] + string[i+1]));
			i += 2;
			continue;
		}
		array[i] = func(_Utils_chr(string[i]));
		i++;
	}
	return array.join('');
});

var _String_filter = F2(function(isGood, str)
{
	var arr = [];
	var len = str.length;
	var i = 0;
	while (i < len)
	{
		var char = str[i];
		var word = str.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += str[i];
			i++;
		}

		if (isGood(_Utils_chr(char)))
		{
			arr.push(char);
		}
	}
	return arr.join('');
});

function _String_reverse(str)
{
	var len = str.length;
	var arr = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = str.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			arr[len - i] = str[i + 1];
			i++;
			arr[len - i] = str[i - 1];
			i++;
		}
		else
		{
			arr[len - i] = str[i];
			i++;
		}
	}
	return arr.join('');
}

var _String_foldl = F3(function(func, state, string)
{
	var len = string.length;
	var i = 0;
	while (i < len)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += string[i];
			i++;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_foldr = F3(function(func, state, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_split = F2(function(sep, str)
{
	return str.split(sep);
});

var _String_join = F2(function(sep, strs)
{
	return strs.join(sep);
});

var _String_slice = F3(function(start, end, str) {
	return str.slice(start, end);
});

function _String_trim(str)
{
	return str.trim();
}

function _String_trimLeft(str)
{
	return str.replace(/^\s+/, '');
}

function _String_trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function _String_words(str)
{
	return _List_fromArray(str.trim().split(/\s+/g));
}

function _String_lines(str)
{
	return _List_fromArray(str.split(/\r\n|\r|\n/g));
}

function _String_toUpper(str)
{
	return str.toUpperCase();
}

function _String_toLower(str)
{
	return str.toLowerCase();
}

var _String_any = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (isGood(_Utils_chr(char)))
		{
			return true;
		}
	}
	return false;
});

var _String_all = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (!isGood(_Utils_chr(char)))
		{
			return false;
		}
	}
	return true;
});

var _String_contains = F2(function(sub, str)
{
	return str.indexOf(sub) > -1;
});

var _String_startsWith = F2(function(sub, str)
{
	return str.indexOf(sub) === 0;
});

var _String_endsWith = F2(function(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
});

var _String_indexes = F2(function(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _List_Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _List_fromArray(is);
});


// TO STRING

function _String_fromNumber(number)
{
	return number + '';
}


// INT CONVERSIONS

function _String_toInt(str)
{
	var total = 0;
	var code0 = str.charCodeAt(0);
	var start = code0 == 0x2B /* + */ || code0 == 0x2D /* - */ ? 1 : 0;

	for (var i = start; i < str.length; ++i)
	{
		var code = str.charCodeAt(i);
		if (code < 0x30 || 0x39 < code)
		{
			return elm$core$Maybe$Nothing;
		}
		total = 10 * total + code - 0x30;
	}

	return i == start
		? elm$core$Maybe$Nothing
		: elm$core$Maybe$Just(code0 == 0x2D ? -total : total);
}


// FLOAT CONVERSIONS

function _String_toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return elm$core$Maybe$Nothing;
	}
	var n = +s;
	// faster isNaN check
	return n === n ? elm$core$Maybe$Just(n) : elm$core$Maybe$Nothing;
}

function _String_fromList(chars)
{
	return _List_toArray(chars).join('');
}




/**/
function _Json_errorToString(error)
{
	return elm$json$Json$Decode$errorToString(error);
}
//*/


// CORE DECODERS

function _Json_succeed(msg)
{
	return {
		$: 0,
		a: msg
	};
}

function _Json_fail(msg)
{
	return {
		$: 1,
		a: msg
	};
}

function _Json_decodePrim(decoder)
{
	return { $: 2, b: decoder };
}

var _Json_decodeInt = _Json_decodePrim(function(value) {
	return (typeof value !== 'number')
		? _Json_expecting('an INT', value)
		:
	(-2147483647 < value && value < 2147483647 && (value | 0) === value)
		? elm$core$Result$Ok(value)
		:
	(isFinite(value) && !(value % 1))
		? elm$core$Result$Ok(value)
		: _Json_expecting('an INT', value);
});

var _Json_decodeBool = _Json_decodePrim(function(value) {
	return (typeof value === 'boolean')
		? elm$core$Result$Ok(value)
		: _Json_expecting('a BOOL', value);
});

var _Json_decodeFloat = _Json_decodePrim(function(value) {
	return (typeof value === 'number')
		? elm$core$Result$Ok(value)
		: _Json_expecting('a FLOAT', value);
});

var _Json_decodeValue = _Json_decodePrim(function(value) {
	return elm$core$Result$Ok(_Json_wrap(value));
});

var _Json_decodeString = _Json_decodePrim(function(value) {
	return (typeof value === 'string')
		? elm$core$Result$Ok(value)
		: (value instanceof String)
			? elm$core$Result$Ok(value + '')
			: _Json_expecting('a STRING', value);
});

function _Json_decodeList(decoder) { return { $: 3, b: decoder }; }
function _Json_decodeArray(decoder) { return { $: 4, b: decoder }; }

function _Json_decodeNull(value) { return { $: 5, c: value }; }

var _Json_decodeField = F2(function(field, decoder)
{
	return {
		$: 6,
		d: field,
		b: decoder
	};
});

var _Json_decodeIndex = F2(function(index, decoder)
{
	return {
		$: 7,
		e: index,
		b: decoder
	};
});

function _Json_decodeKeyValuePairs(decoder)
{
	return {
		$: 8,
		b: decoder
	};
}

function _Json_mapMany(f, decoders)
{
	return {
		$: 9,
		f: f,
		g: decoders
	};
}

var _Json_andThen = F2(function(callback, decoder)
{
	return {
		$: 10,
		b: decoder,
		h: callback
	};
});

function _Json_oneOf(decoders)
{
	return {
		$: 11,
		g: decoders
	};
}


// DECODING OBJECTS

var _Json_map1 = F2(function(f, d1)
{
	return _Json_mapMany(f, [d1]);
});

var _Json_map2 = F3(function(f, d1, d2)
{
	return _Json_mapMany(f, [d1, d2]);
});

var _Json_map3 = F4(function(f, d1, d2, d3)
{
	return _Json_mapMany(f, [d1, d2, d3]);
});

var _Json_map4 = F5(function(f, d1, d2, d3, d4)
{
	return _Json_mapMany(f, [d1, d2, d3, d4]);
});

var _Json_map5 = F6(function(f, d1, d2, d3, d4, d5)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5]);
});

var _Json_map6 = F7(function(f, d1, d2, d3, d4, d5, d6)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6]);
});

var _Json_map7 = F8(function(f, d1, d2, d3, d4, d5, d6, d7)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
});

var _Json_map8 = F9(function(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
});


// DECODE

var _Json_runOnString = F2(function(decoder, string)
{
	try
	{
		var value = JSON.parse(string);
		return _Json_runHelp(decoder, value);
	}
	catch (e)
	{
		return elm$core$Result$Err(A2(elm$json$Json$Decode$Failure, 'This is not valid JSON! ' + e.message, _Json_wrap(string)));
	}
});

var _Json_run = F2(function(decoder, value)
{
	return _Json_runHelp(decoder, _Json_unwrap(value));
});

function _Json_runHelp(decoder, value)
{
	switch (decoder.$)
	{
		case 2:
			return decoder.b(value);

		case 5:
			return (value === null)
				? elm$core$Result$Ok(decoder.c)
				: _Json_expecting('null', value);

		case 3:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('a LIST', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _List_fromArray);

		case 4:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _Json_toElmArray);

		case 6:
			var field = decoder.d;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return _Json_expecting('an OBJECT with a field named `' + field + '`', value);
			}
			var result = _Json_runHelp(decoder.b, value[field]);
			return (elm$core$Result$isOk(result)) ? result : elm$core$Result$Err(A2(elm$json$Json$Decode$Field, field, result.a));

		case 7:
			var index = decoder.e;
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			if (index >= value.length)
			{
				return _Json_expecting('a LONGER array. Need index ' + index + ' but only see ' + value.length + ' entries', value);
			}
			var result = _Json_runHelp(decoder.b, value[index]);
			return (elm$core$Result$isOk(result)) ? result : elm$core$Result$Err(A2(elm$json$Json$Decode$Index, index, result.a));

		case 8:
			if (typeof value !== 'object' || value === null || _Json_isArray(value))
			{
				return _Json_expecting('an OBJECT', value);
			}

			var keyValuePairs = _List_Nil;
			// TODO test perf of Object.keys and switch when support is good enough
			for (var key in value)
			{
				if (value.hasOwnProperty(key))
				{
					var result = _Json_runHelp(decoder.b, value[key]);
					if (!elm$core$Result$isOk(result))
					{
						return elm$core$Result$Err(A2(elm$json$Json$Decode$Field, key, result.a));
					}
					keyValuePairs = _List_Cons(_Utils_Tuple2(key, result.a), keyValuePairs);
				}
			}
			return elm$core$Result$Ok(elm$core$List$reverse(keyValuePairs));

		case 9:
			var answer = decoder.f;
			var decoders = decoder.g;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = _Json_runHelp(decoders[i], value);
				if (!elm$core$Result$isOk(result))
				{
					return result;
				}
				answer = answer(result.a);
			}
			return elm$core$Result$Ok(answer);

		case 10:
			var result = _Json_runHelp(decoder.b, value);
			return (!elm$core$Result$isOk(result))
				? result
				: _Json_runHelp(decoder.h(result.a), value);

		case 11:
			var errors = _List_Nil;
			for (var temp = decoder.g; temp.b; temp = temp.b) // WHILE_CONS
			{
				var result = _Json_runHelp(temp.a, value);
				if (elm$core$Result$isOk(result))
				{
					return result;
				}
				errors = _List_Cons(result.a, errors);
			}
			return elm$core$Result$Err(elm$json$Json$Decode$OneOf(elm$core$List$reverse(errors)));

		case 1:
			return elm$core$Result$Err(A2(elm$json$Json$Decode$Failure, decoder.a, _Json_wrap(value)));

		case 0:
			return elm$core$Result$Ok(decoder.a);
	}
}

function _Json_runArrayDecoder(decoder, value, toElmValue)
{
	var len = value.length;
	var array = new Array(len);
	for (var i = 0; i < len; i++)
	{
		var result = _Json_runHelp(decoder, value[i]);
		if (!elm$core$Result$isOk(result))
		{
			return elm$core$Result$Err(A2(elm$json$Json$Decode$Index, i, result.a));
		}
		array[i] = result.a;
	}
	return elm$core$Result$Ok(toElmValue(array));
}

function _Json_isArray(value)
{
	return Array.isArray(value) || (typeof FileList === 'function' && value instanceof FileList);
}

function _Json_toElmArray(array)
{
	return A2(elm$core$Array$initialize, array.length, function(i) { return array[i]; });
}

function _Json_expecting(type, value)
{
	return elm$core$Result$Err(A2(elm$json$Json$Decode$Failure, 'Expecting ' + type, _Json_wrap(value)));
}


// EQUALITY

function _Json_equality(x, y)
{
	if (x === y)
	{
		return true;
	}

	if (x.$ !== y.$)
	{
		return false;
	}

	switch (x.$)
	{
		case 0:
		case 1:
			return x.a === y.a;

		case 2:
			return x.b === y.b;

		case 5:
			return x.c === y.c;

		case 3:
		case 4:
		case 8:
			return _Json_equality(x.b, y.b);

		case 6:
			return x.d === y.d && _Json_equality(x.b, y.b);

		case 7:
			return x.e === y.e && _Json_equality(x.b, y.b);

		case 9:
			return x.f === y.f && _Json_listEquality(x.g, y.g);

		case 10:
			return x.h === y.h && _Json_equality(x.b, y.b);

		case 11:
			return _Json_listEquality(x.g, y.g);
	}
}

function _Json_listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!_Json_equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

var _Json_encode = F2(function(indentLevel, value)
{
	return JSON.stringify(_Json_unwrap(value), null, indentLevel) + '';
});

function _Json_wrap(value) { return { $: 0, a: value }; }
function _Json_unwrap(value) { return value.a; }

function _Json_wrap_UNUSED(value) { return value; }
function _Json_unwrap_UNUSED(value) { return value; }

function _Json_emptyArray() { return []; }
function _Json_emptyObject() { return {}; }

var _Json_addField = F3(function(key, value, object)
{
	object[key] = _Json_unwrap(value);
	return object;
});

function _Json_addEntry(func)
{
	return F2(function(entry, array)
	{
		array.push(_Json_unwrap(func(entry)));
		return array;
	});
}

var _Json_encodeNull = _Json_wrap(null);



var _Bitwise_and = F2(function(a, b)
{
	return a & b;
});

var _Bitwise_or = F2(function(a, b)
{
	return a | b;
});

var _Bitwise_xor = F2(function(a, b)
{
	return a ^ b;
});

function _Bitwise_complement(a)
{
	return ~a;
};

var _Bitwise_shiftLeftBy = F2(function(offset, a)
{
	return a << offset;
});

var _Bitwise_shiftRightBy = F2(function(offset, a)
{
	return a >> offset;
});

var _Bitwise_shiftRightZfBy = F2(function(offset, a)
{
	return a >>> offset;
});



// TASKS

function _Scheduler_succeed(value)
{
	return {
		$: 0,
		a: value
	};
}

function _Scheduler_fail(error)
{
	return {
		$: 1,
		a: error
	};
}

function _Scheduler_binding(callback)
{
	return {
		$: 2,
		b: callback,
		c: null
	};
}

var _Scheduler_andThen = F2(function(callback, task)
{
	return {
		$: 3,
		b: callback,
		d: task
	};
});

var _Scheduler_onError = F2(function(callback, task)
{
	return {
		$: 4,
		b: callback,
		d: task
	};
});

function _Scheduler_receive(callback)
{
	return {
		$: 5,
		b: callback
	};
}


// PROCESSES

var _Scheduler_guid = 0;

function _Scheduler_rawSpawn(task)
{
	var proc = {
		$: 0,
		e: _Scheduler_guid++,
		f: task,
		g: null,
		h: []
	};

	_Scheduler_enqueue(proc);

	return proc;
}

function _Scheduler_spawn(task)
{
	return _Scheduler_binding(function(callback) {
		callback(_Scheduler_succeed(_Scheduler_rawSpawn(task)));
	});
}

function _Scheduler_rawSend(proc, msg)
{
	proc.h.push(msg);
	_Scheduler_enqueue(proc);
}

var _Scheduler_send = F2(function(proc, msg)
{
	return _Scheduler_binding(function(callback) {
		_Scheduler_rawSend(proc, msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});

function _Scheduler_kill(proc)
{
	return _Scheduler_binding(function(callback) {
		var task = proc.f;
		if (task.$ === 2 && task.c)
		{
			task.c();
		}

		proc.f = null;

		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
}


/* STEP PROCESSES

type alias Process =
  { $ : tag
  , id : unique_id
  , root : Task
  , stack : null | { $: SUCCEED | FAIL, a: callback, b: stack }
  , mailbox : [msg]
  }

*/


var _Scheduler_working = false;
var _Scheduler_queue = [];


function _Scheduler_enqueue(proc)
{
	_Scheduler_queue.push(proc);
	if (_Scheduler_working)
	{
		return;
	}
	_Scheduler_working = true;
	while (proc = _Scheduler_queue.shift())
	{
		_Scheduler_step(proc);
	}
	_Scheduler_working = false;
}


function _Scheduler_step(proc)
{
	while (proc.f)
	{
		var rootTag = proc.f.$;
		if (rootTag === 0 || rootTag === 1)
		{
			while (proc.g && proc.g.$ !== rootTag)
			{
				proc.g = proc.g.i;
			}
			if (!proc.g)
			{
				return;
			}
			proc.f = proc.g.b(proc.f.a);
			proc.g = proc.g.i;
		}
		else if (rootTag === 2)
		{
			proc.f.c = proc.f.b(function(newRoot) {
				proc.f = newRoot;
				_Scheduler_enqueue(proc);
			});
			return;
		}
		else if (rootTag === 5)
		{
			if (proc.h.length === 0)
			{
				return;
			}
			proc.f = proc.f.b(proc.h.shift());
		}
		else // if (rootTag === 3 || rootTag === 4)
		{
			proc.g = {
				$: rootTag === 3 ? 0 : 1,
				b: proc.f.b,
				i: proc.g
			};
			proc.f = proc.f.d;
		}
	}
}



function _Process_sleep(time)
{
	return _Scheduler_binding(function(callback) {
		var id = setTimeout(function() {
			callback(_Scheduler_succeed(_Utils_Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}




// PROGRAMS


var _Platform_worker = F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function() { return function() {} }
	);
});



// INITIALIZE A PROGRAM


function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder)
{
	var result = A2(_Json_run, flagDecoder, _Json_wrap(args ? args['flags'] : undefined));
	elm$core$Result$isOk(result) || _Debug_crash(2 /**/, _Json_errorToString(result.a) /**/);
	var managers = {};
	result = init(result.a);
	var model = result.a;
	var stepper = stepperBuilder(sendToApp, model);
	var ports = _Platform_setupEffects(managers, sendToApp);

	function sendToApp(msg, viewMetadata)
	{
		result = A2(update, msg, model);
		stepper(model = result.a, viewMetadata);
		_Platform_dispatchEffects(managers, result.b, subscriptions(model));
	}

	_Platform_dispatchEffects(managers, result.b, subscriptions(model));

	return ports ? { ports: ports } : {};
}



// TRACK PRELOADS
//
// This is used by code in elm/browser and elm/http
// to register any HTTP requests that are triggered by init.
//


var _Platform_preload;


function _Platform_registerPreload(url)
{
	_Platform_preload.add(url);
}



// EFFECT MANAGERS


var _Platform_effectManagers = {};


function _Platform_setupEffects(managers, sendToApp)
{
	var ports;

	// setup all necessary effect managers
	for (var key in _Platform_effectManagers)
	{
		var manager = _Platform_effectManagers[key];

		if (manager.a)
		{
			ports = ports || {};
			ports[key] = manager.a(key, sendToApp);
		}

		managers[key] = _Platform_instantiateManager(manager, sendToApp);
	}

	return ports;
}


function _Platform_createManager(init, onEffects, onSelfMsg, cmdMap, subMap)
{
	return {
		b: init,
		c: onEffects,
		d: onSelfMsg,
		e: cmdMap,
		f: subMap
	};
}


function _Platform_instantiateManager(info, sendToApp)
{
	var router = {
		g: sendToApp,
		h: undefined
	};

	var onEffects = info.c;
	var onSelfMsg = info.d;
	var cmdMap = info.e;
	var subMap = info.f;

	function loop(state)
	{
		return A2(_Scheduler_andThen, loop, _Scheduler_receive(function(msg)
		{
			var value = msg.a;

			if (msg.$ === 0)
			{
				return A3(onSelfMsg, router, value, state);
			}

			return cmdMap && subMap
				? A4(onEffects, router, value.i, value.j, state)
				: A3(onEffects, router, cmdMap ? value.i : value.j, state);
		}));
	}

	return router.h = _Scheduler_rawSpawn(A2(_Scheduler_andThen, loop, info.b));
}



// ROUTING


var _Platform_sendToApp = F2(function(router, msg)
{
	return _Scheduler_binding(function(callback)
	{
		router.g(msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});


var _Platform_sendToSelf = F2(function(router, msg)
{
	return A2(_Scheduler_send, router.h, {
		$: 0,
		a: msg
	});
});



// BAGS


function _Platform_leaf(home)
{
	return function(value)
	{
		return {
			$: 1,
			k: home,
			l: value
		};
	};
}


function _Platform_batch(list)
{
	return {
		$: 2,
		m: list
	};
}


var _Platform_map = F2(function(tagger, bag)
{
	return {
		$: 3,
		n: tagger,
		o: bag
	}
});



// PIPE BAGS INTO EFFECT MANAGERS


function _Platform_dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	_Platform_gatherEffects(true, cmdBag, effectsDict, null);
	_Platform_gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		_Scheduler_rawSend(managers[home], {
			$: 'fx',
			a: effectsDict[home] || { i: _List_Nil, j: _List_Nil }
		});
	}
}


function _Platform_gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.$)
	{
		case 1:
			var home = bag.k;
			var effect = _Platform_toEffect(isCmd, home, taggers, bag.l);
			effectsDict[home] = _Platform_insert(isCmd, effect, effectsDict[home]);
			return;

		case 2:
			for (var list = bag.m; list.b; list = list.b) // WHILE_CONS
			{
				_Platform_gatherEffects(isCmd, list.a, effectsDict, taggers);
			}
			return;

		case 3:
			_Platform_gatherEffects(isCmd, bag.o, effectsDict, {
				p: bag.n,
				q: taggers
			});
			return;
	}
}


function _Platform_toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		for (var temp = taggers; temp; temp = temp.q)
		{
			x = temp.p(x);
		}
		return x;
	}

	var map = isCmd
		? _Platform_effectManagers[home].e
		: _Platform_effectManagers[home].f;

	return A2(map, applyTaggers, value)
}


function _Platform_insert(isCmd, newEffect, effects)
{
	effects = effects || { i: _List_Nil, j: _List_Nil };

	isCmd
		? (effects.i = _List_Cons(newEffect, effects.i))
		: (effects.j = _List_Cons(newEffect, effects.j));

	return effects;
}



// PORTS


function _Platform_checkPortName(name)
{
	if (_Platform_effectManagers[name])
	{
		_Debug_crash(3, name)
	}
}



// OUTGOING PORTS


function _Platform_outgoingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		e: _Platform_outgoingPortMap,
		r: converter,
		a: _Platform_setupOutgoingPort
	};
	return _Platform_leaf(name);
}


var _Platform_outgoingPortMap = F2(function(tagger, value) { return value; });


function _Platform_setupOutgoingPort(name)
{
	var subs = [];
	var converter = _Platform_effectManagers[name].r;

	// CREATE MANAGER

	var init = _Process_sleep(0);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, cmdList, state)
	{
		for ( ; cmdList.b; cmdList = cmdList.b) // WHILE_CONS
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = _Json_unwrap(converter(cmdList.a));
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
		}
		return init;
	});

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


function _Platform_incomingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		f: _Platform_incomingPortMap,
		r: converter,
		a: _Platform_setupIncomingPort
	};
	return _Platform_leaf(name);
}


var _Platform_incomingPortMap = F2(function(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});


function _Platform_setupIncomingPort(name, sendToApp)
{
	var subs = _List_Nil;
	var converter = _Platform_effectManagers[name].r;

	// CREATE MANAGER

	var init = _Scheduler_succeed(null);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, subList, state)
	{
		subs = subList;
		return init;
	});

	// PUBLIC API

	function send(incomingValue)
	{
		var result = A2(_Json_run, converter, _Json_wrap(incomingValue));

		elm$core$Result$isOk(result) || _Debug_crash(4, name, result.a);

		var value = result.a;
		for (var temp = subs; temp.b; temp = temp.b) // WHILE_CONS
		{
			sendToApp(temp.a(value));
		}
	}

	return { send: send };
}



// EXPORT ELM MODULES
//
// Have DEBUG and PROD versions so that we can (1) give nicer errors in
// debug mode and (2) not pay for the bits needed for that in prod mode.
//


function _Platform_export_UNUSED(exports)
{
	scope['Elm']
		? _Platform_mergeExportsProd(scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsProd(obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6)
				: _Platform_mergeExportsProd(obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}


function _Platform_export(exports)
{
	scope['Elm']
		? _Platform_mergeExportsDebug('Elm', scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsDebug(moduleName, obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6, moduleName)
				: _Platform_mergeExportsDebug(moduleName + '.' + name, obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}




// STRINGS


var _Parser_isSubString = F5(function(smallString, offset, row, col, bigString)
{
	var smallLength = smallString.length;
	var isGood = offset + smallLength <= bigString.length;

	for (var i = 0; isGood && i < smallLength; )
	{
		var code = bigString.charCodeAt(offset);
		isGood =
			smallString[i++] === bigString[offset++]
			&& (
				code === 0x000A /* \n */
					? ( row++, col=1 )
					: ( col++, (code & 0xF800) === 0xD800 ? smallString[i++] === bigString[offset++] : 1 )
			)
	}

	return _Utils_Tuple3(isGood ? offset : -1, row, col);
});



// CHARS


var _Parser_isSubChar = F3(function(predicate, offset, string)
{
	return (
		string.length <= offset
			? -1
			:
		(string.charCodeAt(offset) & 0xF800) === 0xD800
			? (predicate(_Utils_chr(string.substr(offset, 2))) ? offset + 2 : -1)
			:
		(predicate(_Utils_chr(string[offset]))
			? ((string[offset] === '\n') ? -2 : (offset + 1))
			: -1
		)
	);
});


var _Parser_isAsciiCode = F3(function(code, offset, string)
{
	return string.charCodeAt(offset) === code;
});



// NUMBERS


var _Parser_chompBase10 = F2(function(offset, string)
{
	for (; offset < string.length; offset++)
	{
		var code = string.charCodeAt(offset);
		if (code < 0x30 || 0x39 < code)
		{
			return offset;
		}
	}
	return offset;
});


var _Parser_consumeBase = F3(function(base, offset, string)
{
	for (var total = 0; offset < string.length; offset++)
	{
		var digit = string.charCodeAt(offset) - 0x30;
		if (digit < 0 || base <= digit) break;
		total = base * total + digit;
	}
	return _Utils_Tuple2(offset, total);
});


var _Parser_consumeBase16 = F2(function(offset, string)
{
	for (var total = 0; offset < string.length; offset++)
	{
		var code = string.charCodeAt(offset);
		if (0x30 <= code && code <= 0x39)
		{
			total = 16 * total + code - 0x30;
		}
		else if (0x41 <= code && code <= 0x46)
		{
			total = 16 * total + code - 55;
		}
		else if (0x61 <= code && code <= 0x66)
		{
			total = 16 * total + code - 87;
		}
		else
		{
			break;
		}
	}
	return _Utils_Tuple2(offset, total);
});



// FIND STRING


var _Parser_findSubString = F5(function(smallString, offset, row, col, bigString)
{
	var newOffset = bigString.indexOf(smallString, offset);
	var target = newOffset < 0 ? bigString.length : newOffset + smallString.length;

	while (offset < target)
	{
		var code = bigString.charCodeAt(offset++);
		code === 0x000A /* \n */
			? ( col=1, row++ )
			: ( col++, (code & 0xF800) === 0xD800 && offset++ )
	}

	return _Utils_Tuple3(newOffset, row, col);
});



// SEND REQUEST

var _Http_toTask = F2(function(request, maybeProgress)
{
	return _Scheduler_binding(function(callback)
	{
		var xhr = new XMLHttpRequest();

		_Http_configureProgress(xhr, maybeProgress);

		xhr.addEventListener('error', function() {
			callback(_Scheduler_fail(elm$http$Http$NetworkError));
		});
		xhr.addEventListener('timeout', function() {
			callback(_Scheduler_fail(elm$http$Http$Timeout));
		});
		xhr.addEventListener('load', function() {
			callback(_Http_handleResponse(xhr, request.expect.a));
		});

		try
		{
			xhr.open(request.method, request.url, true);
		}
		catch (e)
		{
			return callback(_Scheduler_fail(elm$http$Http$BadUrl(request.url)));
		}

		_Http_configureRequest(xhr, request);

		var body = request.body;
		xhr.send(elm$http$Http$Internal$isStringBody(body)
			? (xhr.setRequestHeader('Content-Type', body.a), body.b)
			: body.a
		);

		return function() { xhr.abort(); };
	});
});

function _Http_configureProgress(xhr, maybeProgress)
{
	if (!elm$core$Maybe$isJust(maybeProgress))
	{
		return;
	}

	xhr.addEventListener('progress', function(event) {
		if (!event.lengthComputable)
		{
			return;
		}
		_Scheduler_rawSpawn(maybeProgress.a({
			bytes: event.loaded,
			bytesExpected: event.total
		}));
	});
}

function _Http_configureRequest(xhr, request)
{
	for (var headers = request.headers; headers.b; headers = headers.b) // WHILE_CONS
	{
		xhr.setRequestHeader(headers.a.a, headers.a.b);
	}

	xhr.responseType = request.expect.b;
	xhr.withCredentials = request.withCredentials;

	elm$core$Maybe$isJust(request.timeout) && (xhr.timeout = request.timeout.a);
}


// RESPONSES

function _Http_handleResponse(xhr, responseToResult)
{
	var response = _Http_toResponse(xhr);

	if (xhr.status < 200 || 300 <= xhr.status)
	{
		response.body = xhr.responseText;
		return _Scheduler_fail(elm$http$Http$BadStatus(response));
	}

	var result = responseToResult(response);

	if (elm$core$Result$isOk(result))
	{
		return _Scheduler_succeed(result.a);
	}
	else
	{
		response.body = xhr.responseText;
		return _Scheduler_fail(A2(elm$http$Http$BadPayload, result.a, response));
	}
}

function _Http_toResponse(xhr)
{
	return {
		url: xhr.responseURL,
		status: { code: xhr.status, message: xhr.statusText },
		headers: _Http_parseHeaders(xhr.getAllResponseHeaders()),
		body: xhr.response
	};
}

function _Http_parseHeaders(rawHeaders)
{
	var headers = elm$core$Dict$empty;

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

			headers = A3(elm$core$Dict$update, key, function(oldValue) {
				return elm$core$Maybe$Just(elm$core$Maybe$isJust(oldValue)
					? value + ', ' + oldValue.a
					: value
				);
			}, headers);
		}
	}

	return headers;
}


// EXPECTORS

function _Http_expectStringResponse(responseToResult)
{
	return {
		$: 0,
		b: 'text',
		a: responseToResult
	};
}

var _Http_mapExpect = F2(function(func, expect)
{
	return {
		$: 0,
		b: expect.b,
		a: function(response) {
			var convertedResponse = expect.a(response);
			return A2(elm$core$Result$map, func, convertedResponse);
		}
	};
});


// BODY

function _Http_multipart(parts)
{


	for (var formData = new FormData(); parts.b; parts = parts.b) // WHILE_CONS
	{
		var part = parts.a;
		formData.append(part.a, part.b);
	}

	return elm$http$Http$Internal$FormDataBody(formData);
}


function _Url_percentEncode(string)
{
	return encodeURIComponent(string);
}

function _Url_percentDecode(string)
{
	try
	{
		return elm$core$Maybe$Just(decodeURIComponent(string));
	}
	catch (e)
	{
		return elm$core$Maybe$Nothing;
	}
}


function _Time_now(millisToPosix)
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(millisToPosix(Date.now())));
	});
}

var _Time_setInterval = F2(function(interval, task)
{
	return _Scheduler_binding(function(callback)
	{
		var id = setInterval(function() { _Scheduler_rawSpawn(task); }, interval);
		return function() { clearInterval(id); };
	});
});

function _Time_here()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(
			A2(elm$time$Time$customZone, -(new Date().getTimezoneOffset()), _List_Nil)
		));
	});
}


function _Time_getZoneName()
{
	return _Scheduler_binding(function(callback)
	{
		try
		{
			var name = elm$time$Time$Name(Intl.DateTimeFormat().resolvedOptions().timeZone);
		}
		catch (e)
		{
			var name = elm$time$Time$Offset(new Date().getTimezoneOffset());
		}
		callback(_Scheduler_succeed(name));
	});
}
var author$project$Main$Refresh = {$: 'Refresh'};
var elm$core$Array$branchFactor = 32;
var elm$core$Array$Array_elm_builtin = F4(
	function (a, b, c, d) {
		return {$: 'Array_elm_builtin', a: a, b: b, c: c, d: d};
	});
var elm$core$Basics$EQ = {$: 'EQ'};
var elm$core$Basics$GT = {$: 'GT'};
var elm$core$Basics$LT = {$: 'LT'};
var elm$core$Dict$foldr = F3(
	function (func, acc, t) {
		foldr:
		while (true) {
			if (t.$ === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var key = t.b;
				var value = t.c;
				var left = t.d;
				var right = t.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3(elm$core$Dict$foldr, func, acc, right)),
					$temp$t = left;
				func = $temp$func;
				acc = $temp$acc;
				t = $temp$t;
				continue foldr;
			}
		}
	});
var elm$core$List$cons = _List_cons;
var elm$core$Dict$toList = function (dict) {
	return A3(
		elm$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return A2(
					elm$core$List$cons,
					_Utils_Tuple2(key, value),
					list);
			}),
		_List_Nil,
		dict);
};
var elm$core$Dict$keys = function (dict) {
	return A3(
		elm$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return A2(elm$core$List$cons, key, keyList);
			}),
		_List_Nil,
		dict);
};
var elm$core$Set$toList = function (_n0) {
	var dict = _n0.a;
	return elm$core$Dict$keys(dict);
};
var elm$core$Elm$JsArray$foldr = _JsArray_foldr;
var elm$core$Array$foldr = F3(
	function (func, baseCase, _n0) {
		var tree = _n0.c;
		var tail = _n0.d;
		var helper = F2(
			function (node, acc) {
				if (node.$ === 'SubTree') {
					var subTree = node.a;
					return A3(elm$core$Elm$JsArray$foldr, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3(elm$core$Elm$JsArray$foldr, func, acc, values);
				}
			});
		return A3(
			elm$core$Elm$JsArray$foldr,
			helper,
			A3(elm$core$Elm$JsArray$foldr, func, baseCase, tail),
			tree);
	});
var elm$core$Array$toList = function (array) {
	return A3(elm$core$Array$foldr, elm$core$List$cons, _List_Nil, array);
};
var elm$core$Basics$ceiling = _Basics_ceiling;
var elm$core$Basics$fdiv = _Basics_fdiv;
var elm$core$Basics$logBase = F2(
	function (base, number) {
		return _Basics_log(number) / _Basics_log(base);
	});
var elm$core$Basics$toFloat = _Basics_toFloat;
var elm$core$Array$shiftStep = elm$core$Basics$ceiling(
	A2(elm$core$Basics$logBase, 2, elm$core$Array$branchFactor));
var elm$core$Elm$JsArray$empty = _JsArray_empty;
var elm$core$Array$empty = A4(elm$core$Array$Array_elm_builtin, 0, elm$core$Array$shiftStep, elm$core$Elm$JsArray$empty, elm$core$Elm$JsArray$empty);
var elm$core$Array$Leaf = function (a) {
	return {$: 'Leaf', a: a};
};
var elm$core$Array$SubTree = function (a) {
	return {$: 'SubTree', a: a};
};
var elm$core$Elm$JsArray$initializeFromList = _JsArray_initializeFromList;
var elm$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			if (!list.b) {
				return acc;
			} else {
				var x = list.a;
				var xs = list.b;
				var $temp$func = func,
					$temp$acc = A2(func, x, acc),
					$temp$list = xs;
				func = $temp$func;
				acc = $temp$acc;
				list = $temp$list;
				continue foldl;
			}
		}
	});
var elm$core$List$reverse = function (list) {
	return A3(elm$core$List$foldl, elm$core$List$cons, _List_Nil, list);
};
var elm$core$Array$compressNodes = F2(
	function (nodes, acc) {
		compressNodes:
		while (true) {
			var _n0 = A2(elm$core$Elm$JsArray$initializeFromList, elm$core$Array$branchFactor, nodes);
			var node = _n0.a;
			var remainingNodes = _n0.b;
			var newAcc = A2(
				elm$core$List$cons,
				elm$core$Array$SubTree(node),
				acc);
			if (!remainingNodes.b) {
				return elm$core$List$reverse(newAcc);
			} else {
				var $temp$nodes = remainingNodes,
					$temp$acc = newAcc;
				nodes = $temp$nodes;
				acc = $temp$acc;
				continue compressNodes;
			}
		}
	});
var elm$core$Basics$apR = F2(
	function (x, f) {
		return f(x);
	});
var elm$core$Basics$eq = _Utils_equal;
var elm$core$Tuple$first = function (_n0) {
	var x = _n0.a;
	return x;
};
var elm$core$Array$treeFromBuilder = F2(
	function (nodeList, nodeListSize) {
		treeFromBuilder:
		while (true) {
			var newNodeSize = elm$core$Basics$ceiling(nodeListSize / elm$core$Array$branchFactor);
			if (newNodeSize === 1) {
				return A2(elm$core$Elm$JsArray$initializeFromList, elm$core$Array$branchFactor, nodeList).a;
			} else {
				var $temp$nodeList = A2(elm$core$Array$compressNodes, nodeList, _List_Nil),
					$temp$nodeListSize = newNodeSize;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue treeFromBuilder;
			}
		}
	});
var elm$core$Basics$add = _Basics_add;
var elm$core$Basics$apL = F2(
	function (f, x) {
		return f(x);
	});
var elm$core$Basics$floor = _Basics_floor;
var elm$core$Basics$gt = _Utils_gt;
var elm$core$Basics$max = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) > 0) ? x : y;
	});
var elm$core$Basics$mul = _Basics_mul;
var elm$core$Basics$sub = _Basics_sub;
var elm$core$Elm$JsArray$length = _JsArray_length;
var elm$core$Array$builderToArray = F2(
	function (reverseNodeList, builder) {
		if (!builder.nodeListSize) {
			return A4(
				elm$core$Array$Array_elm_builtin,
				elm$core$Elm$JsArray$length(builder.tail),
				elm$core$Array$shiftStep,
				elm$core$Elm$JsArray$empty,
				builder.tail);
		} else {
			var treeLen = builder.nodeListSize * elm$core$Array$branchFactor;
			var depth = elm$core$Basics$floor(
				A2(elm$core$Basics$logBase, elm$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? elm$core$List$reverse(builder.nodeList) : builder.nodeList;
			var tree = A2(elm$core$Array$treeFromBuilder, correctNodeList, builder.nodeListSize);
			return A4(
				elm$core$Array$Array_elm_builtin,
				elm$core$Elm$JsArray$length(builder.tail) + treeLen,
				A2(elm$core$Basics$max, 5, depth * elm$core$Array$shiftStep),
				tree,
				builder.tail);
		}
	});
var elm$core$Basics$False = {$: 'False'};
var elm$core$Basics$idiv = _Basics_idiv;
var elm$core$Basics$lt = _Utils_lt;
var elm$core$Elm$JsArray$initialize = _JsArray_initialize;
var elm$core$Array$initializeHelp = F5(
	function (fn, fromIndex, len, nodeList, tail) {
		initializeHelp:
		while (true) {
			if (fromIndex < 0) {
				return A2(
					elm$core$Array$builderToArray,
					false,
					{nodeList: nodeList, nodeListSize: (len / elm$core$Array$branchFactor) | 0, tail: tail});
			} else {
				var leaf = elm$core$Array$Leaf(
					A3(elm$core$Elm$JsArray$initialize, elm$core$Array$branchFactor, fromIndex, fn));
				var $temp$fn = fn,
					$temp$fromIndex = fromIndex - elm$core$Array$branchFactor,
					$temp$len = len,
					$temp$nodeList = A2(elm$core$List$cons, leaf, nodeList),
					$temp$tail = tail;
				fn = $temp$fn;
				fromIndex = $temp$fromIndex;
				len = $temp$len;
				nodeList = $temp$nodeList;
				tail = $temp$tail;
				continue initializeHelp;
			}
		}
	});
var elm$core$Basics$le = _Utils_le;
var elm$core$Basics$remainderBy = _Basics_remainderBy;
var elm$core$Array$initialize = F2(
	function (len, fn) {
		if (len <= 0) {
			return elm$core$Array$empty;
		} else {
			var tailLen = len % elm$core$Array$branchFactor;
			var tail = A3(elm$core$Elm$JsArray$initialize, tailLen, len - tailLen, fn);
			var initialFromIndex = (len - tailLen) - elm$core$Array$branchFactor;
			return A5(elm$core$Array$initializeHelp, fn, initialFromIndex, len, _List_Nil, tail);
		}
	});
var elm$core$Maybe$Just = function (a) {
	return {$: 'Just', a: a};
};
var elm$core$Maybe$Nothing = {$: 'Nothing'};
var elm$core$Result$Err = function (a) {
	return {$: 'Err', a: a};
};
var elm$core$Result$Ok = function (a) {
	return {$: 'Ok', a: a};
};
var elm$core$Basics$True = {$: 'True'};
var elm$core$Result$isOk = function (result) {
	if (result.$ === 'Ok') {
		return true;
	} else {
		return false;
	}
};
var elm$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 'Failure', a: a, b: b};
	});
var elm$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 'Field', a: a, b: b};
	});
var elm$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 'Index', a: a, b: b};
	});
var elm$json$Json$Decode$OneOf = function (a) {
	return {$: 'OneOf', a: a};
};
var elm$core$Basics$and = _Basics_and;
var elm$core$Basics$append = _Utils_append;
var elm$core$Basics$or = _Basics_or;
var elm$core$Char$toCode = _Char_toCode;
var elm$core$Char$isLower = function (_char) {
	var code = elm$core$Char$toCode(_char);
	return (97 <= code) && (code <= 122);
};
var elm$core$Char$isUpper = function (_char) {
	var code = elm$core$Char$toCode(_char);
	return (code <= 90) && (65 <= code);
};
var elm$core$Char$isAlpha = function (_char) {
	return elm$core$Char$isLower(_char) || elm$core$Char$isUpper(_char);
};
var elm$core$Char$isDigit = function (_char) {
	var code = elm$core$Char$toCode(_char);
	return (code <= 57) && (48 <= code);
};
var elm$core$Char$isAlphaNum = function (_char) {
	return elm$core$Char$isLower(_char) || (elm$core$Char$isUpper(_char) || elm$core$Char$isDigit(_char));
};
var elm$core$List$length = function (xs) {
	return A3(
		elm$core$List$foldl,
		F2(
			function (_n0, i) {
				return i + 1;
			}),
		0,
		xs);
};
var elm$core$List$map2 = _List_map2;
var elm$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_Utils_cmp(lo, hi) < 1) {
				var $temp$lo = lo,
					$temp$hi = hi - 1,
					$temp$list = A2(elm$core$List$cons, hi, list);
				lo = $temp$lo;
				hi = $temp$hi;
				list = $temp$list;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var elm$core$List$range = F2(
	function (lo, hi) {
		return A3(elm$core$List$rangeHelp, lo, hi, _List_Nil);
	});
var elm$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			elm$core$List$map2,
			f,
			A2(
				elm$core$List$range,
				0,
				elm$core$List$length(xs) - 1),
			xs);
	});
var elm$core$String$all = _String_all;
var elm$core$String$fromInt = _String_fromNumber;
var elm$core$String$join = F2(
	function (sep, chunks) {
		return A2(
			_String_join,
			sep,
			_List_toArray(chunks));
	});
var elm$core$String$uncons = _String_uncons;
var elm$core$String$split = F2(
	function (sep, string) {
		return _List_fromArray(
			A2(_String_split, sep, string));
	});
var elm$json$Json$Decode$indent = function (str) {
	return A2(
		elm$core$String$join,
		'\n    ',
		A2(elm$core$String$split, '\n', str));
};
var elm$json$Json$Encode$encode = _Json_encode;
var elm$json$Json$Decode$errorOneOf = F2(
	function (i, error) {
		return '\n\n(' + (elm$core$String$fromInt(i + 1) + (') ' + elm$json$Json$Decode$indent(
			elm$json$Json$Decode$errorToString(error))));
	});
var elm$json$Json$Decode$errorToString = function (error) {
	return A2(elm$json$Json$Decode$errorToStringHelp, error, _List_Nil);
};
var elm$json$Json$Decode$errorToStringHelp = F2(
	function (error, context) {
		errorToStringHelp:
		while (true) {
			switch (error.$) {
				case 'Field':
					var f = error.a;
					var err = error.b;
					var isSimple = function () {
						var _n1 = elm$core$String$uncons(f);
						if (_n1.$ === 'Nothing') {
							return false;
						} else {
							var _n2 = _n1.a;
							var _char = _n2.a;
							var rest = _n2.b;
							return elm$core$Char$isAlpha(_char) && A2(elm$core$String$all, elm$core$Char$isAlphaNum, rest);
						}
					}();
					var fieldName = isSimple ? ('.' + f) : ('[\'' + (f + '\']'));
					var $temp$error = err,
						$temp$context = A2(elm$core$List$cons, fieldName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'Index':
					var i = error.a;
					var err = error.b;
					var indexName = '[' + (elm$core$String$fromInt(i) + ']');
					var $temp$error = err,
						$temp$context = A2(elm$core$List$cons, indexName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'OneOf':
					var errors = error.a;
					if (!errors.b) {
						return 'Ran into a Json.Decode.oneOf with no possibilities' + function () {
							if (!context.b) {
								return '!';
							} else {
								return ' at json' + A2(
									elm$core$String$join,
									'',
									elm$core$List$reverse(context));
							}
						}();
					} else {
						if (!errors.b.b) {
							var err = errors.a;
							var $temp$error = err,
								$temp$context = context;
							error = $temp$error;
							context = $temp$context;
							continue errorToStringHelp;
						} else {
							var starter = function () {
								if (!context.b) {
									return 'Json.Decode.oneOf';
								} else {
									return 'The Json.Decode.oneOf at json' + A2(
										elm$core$String$join,
										'',
										elm$core$List$reverse(context));
								}
							}();
							var introduction = starter + (' failed in the following ' + (elm$core$String$fromInt(
								elm$core$List$length(errors)) + ' ways:'));
							return A2(
								elm$core$String$join,
								'\n\n',
								A2(
									elm$core$List$cons,
									introduction,
									A2(elm$core$List$indexedMap, elm$json$Json$Decode$errorOneOf, errors)));
						}
					}
				default:
					var msg = error.a;
					var json = error.b;
					var introduction = function () {
						if (!context.b) {
							return 'Problem with the given value:\n\n';
						} else {
							return 'Problem with the value at json' + (A2(
								elm$core$String$join,
								'',
								elm$core$List$reverse(context)) + ':\n\n    ');
						}
					}();
					return introduction + (elm$json$Json$Decode$indent(
						A2(elm$json$Json$Encode$encode, 4, json)) + ('\n\n' + msg));
			}
		}
	});
var elm$json$Json$Encode$int = _Json_wrap;
var elm$json$Json$Encode$object = function (pairs) {
	return _Json_wrap(
		A3(
			elm$core$List$foldl,
			F2(
				function (_n0, obj) {
					var k = _n0.a;
					var v = _n0.b;
					return A3(_Json_addField, k, v, obj);
				}),
			_Json_emptyObject(_Utils_Tuple0),
			pairs));
};
var elm$json$Json$Encode$string = _Json_wrap;
var author$project$GitHubGraph$encodeUser = function (record) {
	return elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'id',
				elm$json$Json$Encode$string(record.id)),
				_Utils_Tuple2(
				'database_id',
				elm$json$Json$Encode$int(record.databaseId)),
				_Utils_Tuple2(
				'url',
				elm$json$Json$Encode$string(record.url)),
				_Utils_Tuple2(
				'login',
				elm$json$Json$Encode$string(record.login)),
				_Utils_Tuple2(
				'avatar',
				elm$json$Json$Encode$string(record.avatar))
			]));
};
var elm$core$Basics$composeR = F3(
	function (f, g, x) {
		return g(
			f(x));
	});
var elm$core$Maybe$map = F2(
	function (f, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return elm$core$Maybe$Just(
				f(value));
		} else {
			return elm$core$Maybe$Nothing;
		}
	});
var elm$core$Maybe$withDefault = F2(
	function (_default, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return value;
		} else {
			return _default;
		}
	});
var elm$json$Json$Encode$null = _Json_encodeNull;
var elm_community$json_extra$Json$Encode$Extra$maybe = function (encoder) {
	return A2(
		elm$core$Basics$composeR,
		elm$core$Maybe$map(encoder),
		elm$core$Maybe$withDefault(elm$json$Json$Encode$null));
};
var elm$time$Time$flooredDiv = F2(
	function (numerator, denominator) {
		return elm$core$Basics$floor(numerator / denominator);
	});
var elm$time$Time$posixToMillis = function (_n0) {
	var millis = _n0.a;
	return millis;
};
var elm$time$Time$toAdjustedMinutesHelp = F3(
	function (defaultOffset, posixMinutes, eras) {
		toAdjustedMinutesHelp:
		while (true) {
			if (!eras.b) {
				return posixMinutes + defaultOffset;
			} else {
				var era = eras.a;
				var olderEras = eras.b;
				if (_Utils_cmp(era.start, posixMinutes) < 0) {
					return posixMinutes + era.offset;
				} else {
					var $temp$defaultOffset = defaultOffset,
						$temp$posixMinutes = posixMinutes,
						$temp$eras = olderEras;
					defaultOffset = $temp$defaultOffset;
					posixMinutes = $temp$posixMinutes;
					eras = $temp$eras;
					continue toAdjustedMinutesHelp;
				}
			}
		}
	});
var elm$time$Time$toAdjustedMinutes = F2(
	function (_n0, time) {
		var defaultOffset = _n0.a;
		var eras = _n0.b;
		return A3(
			elm$time$Time$toAdjustedMinutesHelp,
			defaultOffset,
			A2(
				elm$time$Time$flooredDiv,
				elm$time$Time$posixToMillis(time),
				60000),
			eras);
	});
var elm$core$Basics$ge = _Utils_ge;
var elm$core$Basics$negate = function (n) {
	return -n;
};
var elm$time$Time$toCivil = function (minutes) {
	var rawDay = A2(elm$time$Time$flooredDiv, minutes, 60 * 24) + 719468;
	var era = (((rawDay >= 0) ? rawDay : (rawDay - 146096)) / 146097) | 0;
	var dayOfEra = rawDay - (era * 146097);
	var yearOfEra = ((((dayOfEra - ((dayOfEra / 1460) | 0)) + ((dayOfEra / 36524) | 0)) - ((dayOfEra / 146096) | 0)) / 365) | 0;
	var dayOfYear = dayOfEra - (((365 * yearOfEra) + ((yearOfEra / 4) | 0)) - ((yearOfEra / 100) | 0));
	var mp = (((5 * dayOfYear) + 2) / 153) | 0;
	var month = mp + ((mp < 10) ? 3 : (-9));
	var year = yearOfEra + (era * 400);
	return {
		day: (dayOfYear - ((((153 * mp) + 2) / 5) | 0)) + 1,
		month: month,
		year: year + ((month <= 2) ? 1 : 0)
	};
};
var elm$time$Time$toDay = F2(
	function (zone, time) {
		return elm$time$Time$toCivil(
			A2(elm$time$Time$toAdjustedMinutes, zone, time)).day;
	});
var elm$core$Basics$modBy = _Basics_modBy;
var elm$time$Time$toHour = F2(
	function (zone, time) {
		return A2(
			elm$core$Basics$modBy,
			24,
			A2(
				elm$time$Time$flooredDiv,
				A2(elm$time$Time$toAdjustedMinutes, zone, time),
				60));
	});
var elm$time$Time$toMillis = F2(
	function (_n0, time) {
		return A2(
			elm$core$Basics$modBy,
			1000,
			elm$time$Time$posixToMillis(time));
	});
var elm$time$Time$toMinute = F2(
	function (zone, time) {
		return A2(
			elm$core$Basics$modBy,
			60,
			A2(elm$time$Time$toAdjustedMinutes, zone, time));
	});
var elm$time$Time$Apr = {$: 'Apr'};
var elm$time$Time$Aug = {$: 'Aug'};
var elm$time$Time$Dec = {$: 'Dec'};
var elm$time$Time$Feb = {$: 'Feb'};
var elm$time$Time$Jan = {$: 'Jan'};
var elm$time$Time$Jul = {$: 'Jul'};
var elm$time$Time$Jun = {$: 'Jun'};
var elm$time$Time$Mar = {$: 'Mar'};
var elm$time$Time$May = {$: 'May'};
var elm$time$Time$Nov = {$: 'Nov'};
var elm$time$Time$Oct = {$: 'Oct'};
var elm$time$Time$Sep = {$: 'Sep'};
var elm$time$Time$toMonth = F2(
	function (zone, time) {
		var _n0 = elm$time$Time$toCivil(
			A2(elm$time$Time$toAdjustedMinutes, zone, time)).month;
		switch (_n0) {
			case 1:
				return elm$time$Time$Jan;
			case 2:
				return elm$time$Time$Feb;
			case 3:
				return elm$time$Time$Mar;
			case 4:
				return elm$time$Time$Apr;
			case 5:
				return elm$time$Time$May;
			case 6:
				return elm$time$Time$Jun;
			case 7:
				return elm$time$Time$Jul;
			case 8:
				return elm$time$Time$Aug;
			case 9:
				return elm$time$Time$Sep;
			case 10:
				return elm$time$Time$Oct;
			case 11:
				return elm$time$Time$Nov;
			default:
				return elm$time$Time$Dec;
		}
	});
var elm$time$Time$toSecond = F2(
	function (_n0, time) {
		return A2(
			elm$core$Basics$modBy,
			60,
			A2(
				elm$time$Time$flooredDiv,
				elm$time$Time$posixToMillis(time),
				1000));
	});
var elm$time$Time$toYear = F2(
	function (zone, time) {
		return elm$time$Time$toCivil(
			A2(elm$time$Time$toAdjustedMinutes, zone, time)).year;
	});
var elm$time$Time$Zone = F2(
	function (a, b) {
		return {$: 'Zone', a: a, b: b};
	});
var elm$time$Time$utc = A2(elm$time$Time$Zone, 0, _List_Nil);
var rtfeldman$elm_iso8601_date_strings$Iso8601$fromMonth = function (month) {
	switch (month.$) {
		case 'Jan':
			return 1;
		case 'Feb':
			return 2;
		case 'Mar':
			return 3;
		case 'Apr':
			return 4;
		case 'May':
			return 5;
		case 'Jun':
			return 6;
		case 'Jul':
			return 7;
		case 'Aug':
			return 8;
		case 'Sep':
			return 9;
		case 'Oct':
			return 10;
		case 'Nov':
			return 11;
		default:
			return 12;
	}
};
var elm$core$String$cons = _String_cons;
var elm$core$String$fromChar = function (_char) {
	return A2(elm$core$String$cons, _char, '');
};
var elm$core$String$length = _String_length;
var elm$core$Bitwise$and = _Bitwise_and;
var elm$core$Bitwise$shiftRightBy = _Bitwise_shiftRightBy;
var elm$core$String$repeatHelp = F3(
	function (n, chunk, result) {
		return (n <= 0) ? result : A3(
			elm$core$String$repeatHelp,
			n >> 1,
			_Utils_ap(chunk, chunk),
			(!(n & 1)) ? result : _Utils_ap(result, chunk));
	});
var elm$core$String$repeat = F2(
	function (n, chunk) {
		return A3(elm$core$String$repeatHelp, n, chunk, '');
	});
var elm$core$String$padLeft = F3(
	function (n, _char, string) {
		return _Utils_ap(
			A2(
				elm$core$String$repeat,
				n - elm$core$String$length(string),
				elm$core$String$fromChar(_char)),
			string);
	});
var rtfeldman$elm_iso8601_date_strings$Iso8601$toPaddedString = F2(
	function (digits, time) {
		return A3(
			elm$core$String$padLeft,
			digits,
			_Utils_chr('0'),
			elm$core$String$fromInt(time));
	});
var rtfeldman$elm_iso8601_date_strings$Iso8601$fromTime = function (time) {
	return A2(
		rtfeldman$elm_iso8601_date_strings$Iso8601$toPaddedString,
		4,
		A2(elm$time$Time$toYear, elm$time$Time$utc, time)) + ('-' + (A2(
		rtfeldman$elm_iso8601_date_strings$Iso8601$toPaddedString,
		2,
		rtfeldman$elm_iso8601_date_strings$Iso8601$fromMonth(
			A2(elm$time$Time$toMonth, elm$time$Time$utc, time))) + ('-' + (A2(
		rtfeldman$elm_iso8601_date_strings$Iso8601$toPaddedString,
		2,
		A2(elm$time$Time$toDay, elm$time$Time$utc, time)) + ('T' + (A2(
		rtfeldman$elm_iso8601_date_strings$Iso8601$toPaddedString,
		2,
		A2(elm$time$Time$toHour, elm$time$Time$utc, time)) + (':' + (A2(
		rtfeldman$elm_iso8601_date_strings$Iso8601$toPaddedString,
		2,
		A2(elm$time$Time$toMinute, elm$time$Time$utc, time)) + (':' + (A2(
		rtfeldman$elm_iso8601_date_strings$Iso8601$toPaddedString,
		2,
		A2(elm$time$Time$toSecond, elm$time$Time$utc, time)) + ('.' + (A2(
		rtfeldman$elm_iso8601_date_strings$Iso8601$toPaddedString,
		3,
		A2(elm$time$Time$toMillis, elm$time$Time$utc, time)) + 'Z'))))))))))));
};
var author$project$Backend$encodeEventActor = function (_n0) {
	var user = _n0.user;
	var avatar = _n0.avatar;
	var createdAt = _n0.createdAt;
	return elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'user',
				A2(elm_community$json_extra$Json$Encode$Extra$maybe, author$project$GitHubGraph$encodeUser, user)),
				_Utils_Tuple2(
				'avatar',
				elm$json$Json$Encode$string(avatar)),
				_Utils_Tuple2(
				'createdAt',
				elm$json$Json$Encode$string(
					rtfeldman$elm_iso8601_date_strings$Iso8601$fromTime(createdAt)))
			]));
};
var elm$core$Basics$composeL = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var elm$json$Json$Encode$list = F2(
	function (func, entries) {
		return _Json_wrap(
			A3(
				elm$core$List$foldl,
				_Json_addEntry(func),
				_Json_emptyArray(_Utils_Tuple0),
				entries));
	});
var elm_community$intdict$IntDict$foldr = F3(
	function (f, acc, dict) {
		foldr:
		while (true) {
			switch (dict.$) {
				case 'Empty':
					return acc;
				case 'Leaf':
					var l = dict.a;
					return A3(f, l.key, l.value, acc);
				default:
					var i = dict.a;
					var $temp$f = f,
						$temp$acc = A3(elm_community$intdict$IntDict$foldr, f, acc, i.right),
						$temp$dict = i.left;
					f = $temp$f;
					acc = $temp$acc;
					dict = $temp$dict;
					continue foldr;
			}
		}
	});
var elm_community$intdict$IntDict$keys = function (dict) {
	return A3(
		elm_community$intdict$IntDict$foldr,
		F3(
			function (key, value, keyList) {
				return A2(elm$core$List$cons, key, keyList);
			}),
		_List_Nil,
		dict);
};
var author$project$ForceGraph$encodeIntDict = A2(
	elm$core$Basics$composeL,
	elm$json$Json$Encode$list(elm$json$Json$Encode$int),
	elm_community$intdict$IntDict$keys);
var elm$core$Basics$identity = function (x) {
	return x;
};
var elm$json$Json$Encode$float = _Json_wrap;
var elm$core$Maybe$andThen = F2(
	function (callback, maybeValue) {
		if (maybeValue.$ === 'Just') {
			var value = maybeValue.a;
			return callback(value);
		} else {
			return elm$core$Maybe$Nothing;
		}
	});
var elm_community$graph$Graph$unGraph = function (graph) {
	var rep = graph.a;
	return rep;
};
var elm$core$Basics$not = _Basics_not;
var elm$core$Basics$neq = _Utils_notEqual;
var elm$core$Bitwise$xor = _Bitwise_xor;
var elm$core$Bitwise$complement = _Bitwise_complement;
var elm$core$Bitwise$or = _Bitwise_or;
var elm$core$Bitwise$shiftRightZfBy = _Bitwise_shiftRightZfBy;
var elm_community$intdict$IntDict$highestBitSet = function (n) {
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
var elm_community$intdict$IntDict$signBit = elm_community$intdict$IntDict$highestBitSet(-1);
var elm_community$intdict$IntDict$isBranchingBitSet = function (p) {
	return A2(
		elm$core$Basics$composeR,
		elm$core$Bitwise$xor(elm_community$intdict$IntDict$signBit),
		A2(
			elm$core$Basics$composeR,
			elm$core$Bitwise$and(p.branchingBit),
			elm$core$Basics$neq(0)));
};
var elm_community$intdict$IntDict$higherBitMask = function (branchingBit) {
	return branchingBit ^ (~(branchingBit - 1));
};
var elm_community$intdict$IntDict$prefixMatches = F2(
	function (p, n) {
		return _Utils_eq(
			n & elm_community$intdict$IntDict$higherBitMask(p.branchingBit),
			p.prefixBits);
	});
var elm_community$intdict$IntDict$get = F2(
	function (key, dict) {
		get:
		while (true) {
			switch (dict.$) {
				case 'Empty':
					return elm$core$Maybe$Nothing;
				case 'Leaf':
					var l = dict.a;
					return _Utils_eq(l.key, key) ? elm$core$Maybe$Just(l.value) : elm$core$Maybe$Nothing;
				default:
					var i = dict.a;
					if (!A2(elm_community$intdict$IntDict$prefixMatches, i.prefix, key)) {
						return elm$core$Maybe$Nothing;
					} else {
						if (A2(elm_community$intdict$IntDict$isBranchingBitSet, i.prefix, key)) {
							var $temp$key = key,
								$temp$dict = i.right;
							key = $temp$key;
							dict = $temp$dict;
							continue get;
						} else {
							var $temp$key = key,
								$temp$dict = i.left;
							key = $temp$key;
							dict = $temp$dict;
							continue get;
						}
					}
			}
		}
	});
var elm_community$graph$Graph$get = function (nodeId) {
	return A2(
		elm$core$Basics$composeR,
		elm_community$graph$Graph$unGraph,
		elm_community$intdict$IntDict$get(nodeId));
};
var elm_community$intdict$IntDict$findMax = function (dict) {
	findMax:
	while (true) {
		switch (dict.$) {
			case 'Empty':
				return elm$core$Maybe$Nothing;
			case 'Leaf':
				var l = dict.a;
				return elm$core$Maybe$Just(
					_Utils_Tuple2(l.key, l.value));
			default:
				var i = dict.a;
				var $temp$dict = i.right;
				dict = $temp$dict;
				continue findMax;
		}
	}
};
var elm_community$intdict$IntDict$findMin = function (dict) {
	findMin:
	while (true) {
		switch (dict.$) {
			case 'Empty':
				return elm$core$Maybe$Nothing;
			case 'Leaf':
				var l = dict.a;
				return elm$core$Maybe$Just(
					_Utils_Tuple2(l.key, l.value));
			default:
				var i = dict.a;
				var $temp$dict = i.left;
				dict = $temp$dict;
				continue findMin;
		}
	}
};
var elm_community$graph$Graph$nodeIdRange = function (graph) {
	return A2(
		elm$core$Maybe$andThen,
		function (_n0) {
			var min = _n0.a;
			return A2(
				elm$core$Maybe$andThen,
				function (_n1) {
					var max = _n1.a;
					return elm$core$Maybe$Just(
						_Utils_Tuple2(min, max));
				},
				elm_community$intdict$IntDict$findMax(
					elm_community$graph$Graph$unGraph(graph)));
		},
		elm_community$intdict$IntDict$findMin(
			elm_community$graph$Graph$unGraph(graph)));
};
var elm$core$Basics$always = F2(
	function (a, _n0) {
		return a;
	});
var elm_community$graph$Graph$Graph = function (a) {
	return {$: 'Graph', a: a};
};
var elm_community$intdict$IntDict$foldl = F3(
	function (f, acc, dict) {
		foldl:
		while (true) {
			switch (dict.$) {
				case 'Empty':
					return acc;
				case 'Leaf':
					var l = dict.a;
					return A3(f, l.key, l.value, acc);
				default:
					var i = dict.a;
					var $temp$f = f,
						$temp$acc = A3(elm_community$intdict$IntDict$foldl, f, acc, i.left),
						$temp$dict = i.right;
					f = $temp$f;
					acc = $temp$acc;
					dict = $temp$dict;
					continue foldl;
			}
		}
	});
var elm_community$intdict$IntDict$Empty = {$: 'Empty'};
var elm_community$intdict$IntDict$empty = elm_community$intdict$IntDict$Empty;
var elm_community$intdict$IntDict$Inner = function (a) {
	return {$: 'Inner', a: a};
};
var elm_community$intdict$IntDict$size = function (dict) {
	switch (dict.$) {
		case 'Empty':
			return 0;
		case 'Leaf':
			return 1;
		default:
			var i = dict.a;
			return i.size;
	}
};
var elm_community$intdict$IntDict$inner = F3(
	function (p, l, r) {
		var _n0 = _Utils_Tuple2(l, r);
		if (_n0.a.$ === 'Empty') {
			var _n1 = _n0.a;
			return r;
		} else {
			if (_n0.b.$ === 'Empty') {
				var _n2 = _n0.b;
				return l;
			} else {
				return elm_community$intdict$IntDict$Inner(
					{
						left: l,
						prefix: p,
						right: r,
						size: elm_community$intdict$IntDict$size(l) + elm_community$intdict$IntDict$size(r)
					});
			}
		}
	});
var elm_community$intdict$IntDict$lcp = F2(
	function (x, y) {
		var branchingBit = elm_community$intdict$IntDict$highestBitSet(x ^ y);
		var mask = elm_community$intdict$IntDict$higherBitMask(branchingBit);
		var prefixBits = x & mask;
		return {branchingBit: branchingBit, prefixBits: prefixBits};
	});
var elm_community$intdict$IntDict$Leaf = function (a) {
	return {$: 'Leaf', a: a};
};
var elm_community$intdict$IntDict$leaf = F2(
	function (k, v) {
		return elm_community$intdict$IntDict$Leaf(
			{key: k, value: v});
	});
var elm_community$intdict$IntDict$update = F3(
	function (key, alter, dict) {
		var join = F2(
			function (_n2, _n3) {
				var k1 = _n2.a;
				var l = _n2.b;
				var k2 = _n3.a;
				var r = _n3.b;
				var prefix = A2(elm_community$intdict$IntDict$lcp, k1, k2);
				return A2(elm_community$intdict$IntDict$isBranchingBitSet, prefix, k2) ? A3(elm_community$intdict$IntDict$inner, prefix, l, r) : A3(elm_community$intdict$IntDict$inner, prefix, r, l);
			});
		var alteredNode = function (mv) {
			var _n1 = alter(mv);
			if (_n1.$ === 'Just') {
				var v = _n1.a;
				return A2(elm_community$intdict$IntDict$leaf, key, v);
			} else {
				return elm_community$intdict$IntDict$empty;
			}
		};
		switch (dict.$) {
			case 'Empty':
				return alteredNode(elm$core$Maybe$Nothing);
			case 'Leaf':
				var l = dict.a;
				return _Utils_eq(l.key, key) ? alteredNode(
					elm$core$Maybe$Just(l.value)) : A2(
					join,
					_Utils_Tuple2(
						key,
						alteredNode(elm$core$Maybe$Nothing)),
					_Utils_Tuple2(l.key, dict));
			default:
				var i = dict.a;
				return A2(elm_community$intdict$IntDict$prefixMatches, i.prefix, key) ? (A2(elm_community$intdict$IntDict$isBranchingBitSet, i.prefix, key) ? A3(
					elm_community$intdict$IntDict$inner,
					i.prefix,
					i.left,
					A3(elm_community$intdict$IntDict$update, key, alter, i.right)) : A3(
					elm_community$intdict$IntDict$inner,
					i.prefix,
					A3(elm_community$intdict$IntDict$update, key, alter, i.left),
					i.right)) : A2(
					join,
					_Utils_Tuple2(
						key,
						alteredNode(elm$core$Maybe$Nothing)),
					_Utils_Tuple2(i.prefix.prefixBits, dict));
		}
	});
var elm_community$graph$Graph$applyEdgeDiff = F3(
	function (nodeId, diff, graphRep) {
		var updateOutgoingEdge = F2(
			function (upd, node) {
				return _Utils_update(
					node,
					{
						outgoing: A3(elm_community$intdict$IntDict$update, nodeId, upd, node.outgoing)
					});
			});
		var updateIncomingEdge = F2(
			function (upd, node) {
				return _Utils_update(
					node,
					{
						incoming: A3(elm_community$intdict$IntDict$update, nodeId, upd, node.incoming)
					});
			});
		var flippedFoldl = F3(
			function (f, dict, acc) {
				return A3(elm_community$intdict$IntDict$foldl, f, acc, dict);
			});
		var edgeUpdateToMaybe = function (edgeUpdate) {
			if (edgeUpdate.$ === 'Insert') {
				var lbl = edgeUpdate.a;
				return elm$core$Maybe$Just(lbl);
			} else {
				return elm$core$Maybe$Nothing;
			}
		};
		var updateAdjacency = F3(
			function (updateEdge, updatedId, edgeUpdate) {
				var updateLbl = updateEdge(
					elm$core$Basics$always(
						edgeUpdateToMaybe(edgeUpdate)));
				return A2(
					elm_community$intdict$IntDict$update,
					updatedId,
					elm$core$Maybe$map(updateLbl));
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
var elm_community$graph$Graph$Insert = function (a) {
	return {$: 'Insert', a: a};
};
var elm_community$graph$Graph$Remove = function (a) {
	return {$: 'Remove', a: a};
};
var elm_community$graph$Graph$crashHack = function (msg) {
	crashHack:
	while (true) {
		var $temp$msg = msg;
		msg = $temp$msg;
		continue crashHack;
	}
};
var elm_community$graph$Graph$emptyDiff = {incoming: elm_community$intdict$IntDict$empty, outgoing: elm_community$intdict$IntDict$empty};
var elm_community$graph$Graph$computeEdgeDiff = F2(
	function (old, _new) {
		var collectUpdates = F3(
			function (edgeUpdate, updatedId, label) {
				var replaceUpdate = function (old_) {
					var _n5 = _Utils_Tuple2(
						old_,
						edgeUpdate(label));
					if (_n5.a.$ === 'Just') {
						if (_n5.a.a.$ === 'Remove') {
							if (_n5.b.$ === 'Insert') {
								var oldLbl = _n5.a.a.a;
								var newLbl = _n5.b.a;
								return _Utils_eq(oldLbl, newLbl) ? elm$core$Maybe$Nothing : elm$core$Maybe$Just(
									elm_community$graph$Graph$Insert(newLbl));
							} else {
								return elm_community$graph$Graph$crashHack('Graph.computeEdgeDiff: Collected two removals for the same edge. This is an error in the implementation of Graph and you should file a bug report!');
							}
						} else {
							return elm_community$graph$Graph$crashHack('Graph.computeEdgeDiff: Collected inserts before removals. This is an error in the implementation of Graph and you should file a bug report!');
						}
					} else {
						var _n6 = _n5.a;
						var eu = _n5.b;
						return elm$core$Maybe$Just(eu);
					}
				};
				return A2(elm_community$intdict$IntDict$update, updatedId, replaceUpdate);
			});
		var collect = F3(
			function (edgeUpdate, adj, updates) {
				return A3(
					elm_community$intdict$IntDict$foldl,
					collectUpdates(edgeUpdate),
					updates,
					adj);
			});
		var _n0 = _Utils_Tuple2(old, _new);
		if (_n0.a.$ === 'Nothing') {
			if (_n0.b.$ === 'Nothing') {
				var _n1 = _n0.a;
				var _n2 = _n0.b;
				return elm_community$graph$Graph$emptyDiff;
			} else {
				var _n4 = _n0.a;
				var ins = _n0.b.a;
				return {
					incoming: A3(collect, elm_community$graph$Graph$Insert, ins.outgoing, elm_community$intdict$IntDict$empty),
					outgoing: A3(collect, elm_community$graph$Graph$Insert, ins.incoming, elm_community$intdict$IntDict$empty)
				};
			}
		} else {
			if (_n0.b.$ === 'Nothing') {
				var rem = _n0.a.a;
				var _n3 = _n0.b;
				return {
					incoming: A3(collect, elm_community$graph$Graph$Remove, rem.outgoing, elm_community$intdict$IntDict$empty),
					outgoing: A3(collect, elm_community$graph$Graph$Remove, rem.incoming, elm_community$intdict$IntDict$empty)
				};
			} else {
				var rem = _n0.a.a;
				var ins = _n0.b.a;
				return _Utils_eq(rem, ins) ? elm_community$graph$Graph$emptyDiff : {
					incoming: A3(
						collect,
						elm_community$graph$Graph$Insert,
						ins.outgoing,
						A3(collect, elm_community$graph$Graph$Remove, rem.outgoing, elm_community$intdict$IntDict$empty)),
					outgoing: A3(
						collect,
						elm_community$graph$Graph$Insert,
						ins.incoming,
						A3(collect, elm_community$graph$Graph$Remove, rem.incoming, elm_community$intdict$IntDict$empty))
				};
			}
		}
	});
var elm_community$intdict$IntDict$insert = F3(
	function (key, value, dict) {
		return A3(
			elm_community$intdict$IntDict$update,
			key,
			elm$core$Basics$always(
				elm$core$Maybe$Just(value)),
			dict);
	});
var elm_community$intdict$IntDict$filter = F2(
	function (predicate, dict) {
		var add = F3(
			function (k, v, d) {
				return A2(predicate, k, v) ? A3(elm_community$intdict$IntDict$insert, k, v, d) : d;
			});
		return A3(elm_community$intdict$IntDict$foldl, add, elm_community$intdict$IntDict$empty, dict);
	});
var elm_community$intdict$IntDict$member = F2(
	function (key, dict) {
		var _n0 = A2(elm_community$intdict$IntDict$get, key, dict);
		if (_n0.$ === 'Just') {
			return true;
		} else {
			return false;
		}
	});
var elm_community$graph$Graph$update = F2(
	function (nodeId, updater) {
		var wrappedUpdater = function (rep) {
			var old = A2(elm_community$intdict$IntDict$get, nodeId, rep);
			var filterInvalidEdges = function (ctx) {
				return elm_community$intdict$IntDict$filter(
					F2(
						function (id, _n0) {
							return _Utils_eq(id, ctx.node.id) || A2(elm_community$intdict$IntDict$member, id, rep);
						}));
			};
			var cleanUpEdges = function (ctx) {
				return _Utils_update(
					ctx,
					{
						incoming: A2(filterInvalidEdges, ctx, ctx.incoming),
						outgoing: A2(filterInvalidEdges, ctx, ctx.outgoing)
					});
			};
			var _new = A2(
				elm$core$Maybe$map,
				cleanUpEdges,
				updater(old));
			var diff = A2(elm_community$graph$Graph$computeEdgeDiff, old, _new);
			return A3(
				elm_community$intdict$IntDict$update,
				nodeId,
				elm$core$Basics$always(_new),
				A3(elm_community$graph$Graph$applyEdgeDiff, nodeId, diff, rep));
		};
		return A2(
			elm$core$Basics$composeR,
			elm_community$graph$Graph$unGraph,
			A2(elm$core$Basics$composeR, wrappedUpdater, elm_community$graph$Graph$Graph));
	});
var elm_community$graph$Graph$remove = F2(
	function (nodeId, graph) {
		return A3(
			elm_community$graph$Graph$update,
			nodeId,
			elm$core$Basics$always(elm$core$Maybe$Nothing),
			graph);
	});
var elm_community$graph$Graph$fold = F3(
	function (f, acc, graph) {
		var go = F2(
			function (acc1, graph1) {
				go:
				while (true) {
					var maybeContext = A2(
						elm$core$Maybe$andThen,
						function (id) {
							return A2(elm_community$graph$Graph$get, id, graph);
						},
						A2(
							elm$core$Maybe$map,
							elm$core$Tuple$first,
							elm_community$graph$Graph$nodeIdRange(graph1)));
					if (maybeContext.$ === 'Just') {
						var ctx = maybeContext.a;
						var $temp$acc1 = A2(f, ctx, acc1),
							$temp$graph1 = A2(elm_community$graph$Graph$remove, ctx.node.id, graph1);
						acc1 = $temp$acc1;
						graph1 = $temp$graph1;
						continue go;
					} else {
						return acc1;
					}
				}
			});
		return A2(go, acc, graph);
	});
var author$project$ForceGraph$encode = F2(
	function (encoder, _n0) {
		var graph = _n0.graph;
		var encodeNode = function (nc) {
			return elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'id',
						elm$json$Json$Encode$int(nc.node.id)),
						_Utils_Tuple2(
						'incoming',
						author$project$ForceGraph$encodeIntDict(nc.incoming)),
						_Utils_Tuple2(
						'outgoing',
						author$project$ForceGraph$encodeIntDict(nc.outgoing)),
						_Utils_Tuple2(
						'value',
						encoder(nc.node.label.value)),
						_Utils_Tuple2(
						'x',
						elm$json$Json$Encode$float(nc.node.label.x)),
						_Utils_Tuple2(
						'y',
						elm$json$Json$Encode$float(nc.node.label.y)),
						_Utils_Tuple2(
						'size',
						elm$json$Json$Encode$float(nc.node.label.size))
					]));
		};
		var nodes = A3(
			elm_community$graph$Graph$fold,
			F2(
				function (n, ns) {
					return A2(
						elm$core$List$cons,
						encodeNode(n),
						ns);
				}),
			_List_Nil,
			graph);
		return A2(elm$json$Json$Encode$list, elm$core$Basics$identity, nodes);
	});
var author$project$GitHubGraph$IssueStateOpen = {$: 'IssueStateOpen'};
var author$project$GitHubGraph$PullRequestStateOpen = {$: 'PullRequestStateOpen'};
var author$project$GitHubGraph$encodeProjectColumn = function (record) {
	return elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'id',
				elm$json$Json$Encode$string(record.id)),
				_Utils_Tuple2(
				'name',
				elm$json$Json$Encode$string(record.name)),
				_Utils_Tuple2(
				'database_id',
				elm$json$Json$Encode$int(record.databaseId))
			]));
};
var author$project$GitHubGraph$encodeProjectLocation = function (record) {
	return elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'id',
				elm$json$Json$Encode$string(record.id)),
				_Utils_Tuple2(
				'url',
				elm$json$Json$Encode$string(record.url)),
				_Utils_Tuple2(
				'name',
				elm$json$Json$Encode$string(record.name)),
				_Utils_Tuple2(
				'number',
				elm$json$Json$Encode$int(record.number))
			]));
};
var author$project$GitHubGraph$encodeCardLocation = function (record) {
	return elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'id',
				elm$json$Json$Encode$string(record.id)),
				_Utils_Tuple2(
				'url',
				elm$json$Json$Encode$string(record.url)),
				_Utils_Tuple2(
				'project',
				author$project$GitHubGraph$encodeProjectLocation(record.project)),
				_Utils_Tuple2(
				'column',
				A2(elm_community$json_extra$Json$Encode$Extra$maybe, author$project$GitHubGraph$encodeProjectColumn, record.column))
			]));
};
var author$project$GitHubGraph$IssueStateClosed = {$: 'IssueStateClosed'};
var author$project$GitHubGraph$issueStates = _List_fromArray(
	[
		_Utils_Tuple2('OPEN', author$project$GitHubGraph$IssueStateOpen),
		_Utils_Tuple2('CLOSED', author$project$GitHubGraph$IssueStateClosed)
	]);
var author$project$GitHubGraph$encodeIssueState = function (item) {
	return elm$json$Json$Encode$string(
		A3(
			elm$core$List$foldl,
			F2(
				function (_n0, _default) {
					var a = _n0.a;
					var b = _n0.b;
					return _Utils_eq(b, item) ? a : _default;
				}),
			'UNKNOWN',
			author$project$GitHubGraph$issueStates));
};
var author$project$GitHubGraph$encodeLabel = function (record) {
	return elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'id',
				elm$json$Json$Encode$string(record.id)),
				_Utils_Tuple2(
				'name',
				elm$json$Json$Encode$string(record.name)),
				_Utils_Tuple2(
				'color',
				elm$json$Json$Encode$string(record.color))
			]));
};
var author$project$GitHubGraph$MilestoneStateClosed = {$: 'MilestoneStateClosed'};
var author$project$GitHubGraph$MilestoneStateOpen = {$: 'MilestoneStateOpen'};
var author$project$GitHubGraph$milestoneStates = _List_fromArray(
	[
		_Utils_Tuple2('OPEN', author$project$GitHubGraph$MilestoneStateOpen),
		_Utils_Tuple2('CLOSED', author$project$GitHubGraph$MilestoneStateClosed)
	]);
var author$project$GitHubGraph$encodeMilestoneState = function (item) {
	return elm$json$Json$Encode$string(
		A3(
			elm$core$List$foldl,
			F2(
				function (_n0, _default) {
					var a = _n0.a;
					var b = _n0.b;
					return _Utils_eq(b, item) ? a : _default;
				}),
			'UNKNOWN',
			author$project$GitHubGraph$milestoneStates));
};
var author$project$GitHubGraph$encodeMilestone = function (record) {
	return elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'id',
				elm$json$Json$Encode$string(record.id)),
				_Utils_Tuple2(
				'number',
				elm$json$Json$Encode$int(record.number)),
				_Utils_Tuple2(
				'title',
				elm$json$Json$Encode$string(record.title)),
				_Utils_Tuple2(
				'state',
				author$project$GitHubGraph$encodeMilestoneState(record.state)),
				_Utils_Tuple2(
				'description',
				A2(elm_community$json_extra$Json$Encode$Extra$maybe, elm$json$Json$Encode$string, record.description))
			]));
};
var author$project$GitHubGraph$ReactionTypeConfused = {$: 'ReactionTypeConfused'};
var author$project$GitHubGraph$ReactionTypeEyes = {$: 'ReactionTypeEyes'};
var author$project$GitHubGraph$ReactionTypeHeart = {$: 'ReactionTypeHeart'};
var author$project$GitHubGraph$ReactionTypeHooray = {$: 'ReactionTypeHooray'};
var author$project$GitHubGraph$ReactionTypeLaugh = {$: 'ReactionTypeLaugh'};
var author$project$GitHubGraph$ReactionTypeRocket = {$: 'ReactionTypeRocket'};
var author$project$GitHubGraph$ReactionTypeThumbsDown = {$: 'ReactionTypeThumbsDown'};
var author$project$GitHubGraph$ReactionTypeThumbsUp = {$: 'ReactionTypeThumbsUp'};
var author$project$GitHubGraph$reactionTypes = _List_fromArray(
	[
		_Utils_Tuple2('THUMBS_UP', author$project$GitHubGraph$ReactionTypeThumbsUp),
		_Utils_Tuple2('THUMBS_DOWN', author$project$GitHubGraph$ReactionTypeThumbsDown),
		_Utils_Tuple2('LAUGH', author$project$GitHubGraph$ReactionTypeLaugh),
		_Utils_Tuple2('HOORAY', author$project$GitHubGraph$ReactionTypeHooray),
		_Utils_Tuple2('CONFUSED', author$project$GitHubGraph$ReactionTypeConfused),
		_Utils_Tuple2('HEART', author$project$GitHubGraph$ReactionTypeHeart),
		_Utils_Tuple2('ROCKET', author$project$GitHubGraph$ReactionTypeRocket),
		_Utils_Tuple2('EYES', author$project$GitHubGraph$ReactionTypeEyes)
	]);
var author$project$GitHubGraph$encodeReactionType = function (item) {
	return elm$json$Json$Encode$string(
		A3(
			elm$core$List$foldl,
			F2(
				function (_n0, _default) {
					var a = _n0.a;
					var b = _n0.b;
					return _Utils_eq(b, item) ? a : _default;
				}),
			'UNKNOWN',
			author$project$GitHubGraph$reactionTypes));
};
var author$project$GitHubGraph$encodeReactionGroup = function (record) {
	return elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'type_',
				author$project$GitHubGraph$encodeReactionType(record.type_)),
				_Utils_Tuple2(
				'count',
				elm$json$Json$Encode$int(record.count))
			]));
};
var author$project$GitHubGraph$encodeRepoLocation = function (record) {
	return elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'id',
				elm$json$Json$Encode$string(record.id)),
				_Utils_Tuple2(
				'url',
				elm$json$Json$Encode$string(record.url)),
				_Utils_Tuple2(
				'owner',
				elm$json$Json$Encode$string(record.owner)),
				_Utils_Tuple2(
				'name',
				elm$json$Json$Encode$string(record.name))
			]));
};
var author$project$GitHubGraph$encodeIssue = function (record) {
	return elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'id',
				elm$json$Json$Encode$string(record.id)),
				_Utils_Tuple2(
				'url',
				elm$json$Json$Encode$string(record.url)),
				_Utils_Tuple2(
				'created_at',
				elm$json$Json$Encode$string(
					rtfeldman$elm_iso8601_date_strings$Iso8601$fromTime(record.createdAt))),
				_Utils_Tuple2(
				'updated_at',
				elm$json$Json$Encode$string(
					rtfeldman$elm_iso8601_date_strings$Iso8601$fromTime(record.updatedAt))),
				_Utils_Tuple2(
				'state',
				author$project$GitHubGraph$encodeIssueState(record.state)),
				_Utils_Tuple2(
				'repo',
				author$project$GitHubGraph$encodeRepoLocation(record.repo)),
				_Utils_Tuple2(
				'number',
				elm$json$Json$Encode$int(record.number)),
				_Utils_Tuple2(
				'title',
				elm$json$Json$Encode$string(record.title)),
				_Utils_Tuple2(
				'comment_count',
				elm$json$Json$Encode$int(record.commentCount)),
				_Utils_Tuple2(
				'reactions',
				A2(elm$json$Json$Encode$list, author$project$GitHubGraph$encodeReactionGroup, record.reactions)),
				_Utils_Tuple2(
				'author',
				A2(elm_community$json_extra$Json$Encode$Extra$maybe, author$project$GitHubGraph$encodeUser, record.author)),
				_Utils_Tuple2(
				'labels',
				A2(elm$json$Json$Encode$list, author$project$GitHubGraph$encodeLabel, record.labels)),
				_Utils_Tuple2(
				'cards',
				A2(elm$json$Json$Encode$list, author$project$GitHubGraph$encodeCardLocation, record.cards)),
				_Utils_Tuple2(
				'milestone',
				A2(elm_community$json_extra$Json$Encode$Extra$maybe, author$project$GitHubGraph$encodeMilestone, record.milestone))
			]));
};
var author$project$GitHubGraph$encodeProject = function (record) {
	return elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'id',
				elm$json$Json$Encode$string(record.id)),
				_Utils_Tuple2(
				'url',
				elm$json$Json$Encode$string(record.url)),
				_Utils_Tuple2(
				'name',
				elm$json$Json$Encode$string(record.name)),
				_Utils_Tuple2(
				'number',
				elm$json$Json$Encode$int(record.number)),
				_Utils_Tuple2(
				'body',
				elm$json$Json$Encode$string(record.body)),
				_Utils_Tuple2(
				'columns',
				A2(elm$json$Json$Encode$list, author$project$GitHubGraph$encodeProjectColumn, record.columns))
			]));
};
var author$project$GitHubGraph$encodeGitActor = function (record) {
	return elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'email',
				elm$json$Json$Encode$string(record.email)),
				_Utils_Tuple2(
				'name',
				elm$json$Json$Encode$string(record.name)),
				_Utils_Tuple2(
				'avatar',
				elm$json$Json$Encode$string(record.avatar)),
				_Utils_Tuple2(
				'user',
				A2(elm_community$json_extra$Json$Encode$Extra$maybe, author$project$GitHubGraph$encodeUser, record.user))
			]));
};
var author$project$GitHubGraph$encodeActor = function (record) {
	return elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'url',
				elm$json$Json$Encode$string(record.url)),
				_Utils_Tuple2(
				'login',
				elm$json$Json$Encode$string(record.login)),
				_Utils_Tuple2(
				'avatar',
				elm$json$Json$Encode$string(record.avatar))
			]));
};
var author$project$GitHubGraph$StatusStateError = {$: 'StatusStateError'};
var author$project$GitHubGraph$StatusStateExpected = {$: 'StatusStateExpected'};
var author$project$GitHubGraph$StatusStateFailure = {$: 'StatusStateFailure'};
var author$project$GitHubGraph$StatusStatePending = {$: 'StatusStatePending'};
var author$project$GitHubGraph$StatusStateSuccess = {$: 'StatusStateSuccess'};
var author$project$GitHubGraph$statusStates = _List_fromArray(
	[
		_Utils_Tuple2('EXPECTED', author$project$GitHubGraph$StatusStateExpected),
		_Utils_Tuple2('ERROR', author$project$GitHubGraph$StatusStateError),
		_Utils_Tuple2('FAILURE', author$project$GitHubGraph$StatusStateFailure),
		_Utils_Tuple2('PENDING', author$project$GitHubGraph$StatusStatePending),
		_Utils_Tuple2('SUCCESS', author$project$GitHubGraph$StatusStateSuccess)
	]);
var author$project$GitHubGraph$encodeStatusState = function (item) {
	return elm$json$Json$Encode$string(
		A3(
			elm$core$List$foldl,
			F2(
				function (_n0, _default) {
					var a = _n0.a;
					var b = _n0.b;
					return _Utils_eq(b, item) ? a : _default;
				}),
			'UNKNOWN',
			author$project$GitHubGraph$statusStates));
};
var author$project$GitHubGraph$encodeStatusContext = function (record) {
	return elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'state',
				author$project$GitHubGraph$encodeStatusState(record.state)),
				_Utils_Tuple2(
				'context',
				elm$json$Json$Encode$string(record.context)),
				_Utils_Tuple2(
				'target_url',
				A2(elm_community$json_extra$Json$Encode$Extra$maybe, elm$json$Json$Encode$string, record.targetUrl)),
				_Utils_Tuple2(
				'creator',
				author$project$GitHubGraph$encodeActor(record.creator))
			]));
};
var author$project$GitHubGraph$encodeStatus = function (record) {
	return elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'state',
				author$project$GitHubGraph$encodeStatusState(record.state)),
				_Utils_Tuple2(
				'contexts',
				A2(elm$json$Json$Encode$list, author$project$GitHubGraph$encodeStatusContext, record.contexts))
			]));
};
var author$project$GitHubGraph$encodeCommit = function (record) {
	return elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'sha',
				elm$json$Json$Encode$string(record.sha)),
				_Utils_Tuple2(
				'status',
				A2(elm_community$json_extra$Json$Encode$Extra$maybe, author$project$GitHubGraph$encodeStatus, record.status)),
				_Utils_Tuple2(
				'author',
				A2(elm_community$json_extra$Json$Encode$Extra$maybe, author$project$GitHubGraph$encodeGitActor, record.author)),
				_Utils_Tuple2(
				'committer',
				A2(elm_community$json_extra$Json$Encode$Extra$maybe, author$project$GitHubGraph$encodeGitActor, record.author)),
				_Utils_Tuple2(
				'authored_at',
				elm$json$Json$Encode$string(
					rtfeldman$elm_iso8601_date_strings$Iso8601$fromTime(record.authoredAt))),
				_Utils_Tuple2(
				'committed_at',
				elm$json$Json$Encode$string(
					rtfeldman$elm_iso8601_date_strings$Iso8601$fromTime(record.committedAt)))
			]));
};
var author$project$GitHubGraph$MergeableStateConflicting = {$: 'MergeableStateConflicting'};
var author$project$GitHubGraph$MergeableStateMergeable = {$: 'MergeableStateMergeable'};
var author$project$GitHubGraph$MergeableStateUnknown = {$: 'MergeableStateUnknown'};
var author$project$GitHubGraph$mergeableStates = _List_fromArray(
	[
		_Utils_Tuple2('MERGEABLE', author$project$GitHubGraph$MergeableStateMergeable),
		_Utils_Tuple2('CONFLICTING', author$project$GitHubGraph$MergeableStateConflicting),
		_Utils_Tuple2('UNKNOWN', author$project$GitHubGraph$MergeableStateUnknown)
	]);
var author$project$GitHubGraph$encodeMergeableState = function (item) {
	return elm$json$Json$Encode$string(
		A3(
			elm$core$List$foldl,
			F2(
				function (_n0, _default) {
					var a = _n0.a;
					var b = _n0.b;
					return _Utils_eq(b, item) ? a : _default;
				}),
			'UNKNOWN',
			author$project$GitHubGraph$mergeableStates));
};
var author$project$GitHubGraph$PullRequestStateClosed = {$: 'PullRequestStateClosed'};
var author$project$GitHubGraph$PullRequestStateMerged = {$: 'PullRequestStateMerged'};
var author$project$GitHubGraph$pullRequestStates = _List_fromArray(
	[
		_Utils_Tuple2('OPEN', author$project$GitHubGraph$PullRequestStateOpen),
		_Utils_Tuple2('CLOSED', author$project$GitHubGraph$PullRequestStateClosed),
		_Utils_Tuple2('MERGED', author$project$GitHubGraph$PullRequestStateMerged)
	]);
var author$project$GitHubGraph$encodePullRequestState = function (item) {
	return elm$json$Json$Encode$string(
		A3(
			elm$core$List$foldl,
			F2(
				function (_n0, _default) {
					var a = _n0.a;
					var b = _n0.b;
					return _Utils_eq(b, item) ? a : _default;
				}),
			'UNKNOWN',
			author$project$GitHubGraph$pullRequestStates));
};
var author$project$GitHubGraph$encodePullRequest = function (record) {
	return elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'id',
				elm$json$Json$Encode$string(record.id)),
				_Utils_Tuple2(
				'url',
				elm$json$Json$Encode$string(record.url)),
				_Utils_Tuple2(
				'created_at',
				elm$json$Json$Encode$string(
					rtfeldman$elm_iso8601_date_strings$Iso8601$fromTime(record.createdAt))),
				_Utils_Tuple2(
				'updated_at',
				elm$json$Json$Encode$string(
					rtfeldman$elm_iso8601_date_strings$Iso8601$fromTime(record.updatedAt))),
				_Utils_Tuple2(
				'state',
				author$project$GitHubGraph$encodePullRequestState(record.state)),
				_Utils_Tuple2(
				'repo',
				author$project$GitHubGraph$encodeRepoLocation(record.repo)),
				_Utils_Tuple2(
				'number',
				elm$json$Json$Encode$int(record.number)),
				_Utils_Tuple2(
				'title',
				elm$json$Json$Encode$string(record.title)),
				_Utils_Tuple2(
				'comment_count',
				elm$json$Json$Encode$int(record.commentCount)),
				_Utils_Tuple2(
				'reactions',
				A2(elm$json$Json$Encode$list, author$project$GitHubGraph$encodeReactionGroup, record.reactions)),
				_Utils_Tuple2(
				'author',
				A2(elm_community$json_extra$Json$Encode$Extra$maybe, author$project$GitHubGraph$encodeUser, record.author)),
				_Utils_Tuple2(
				'labels',
				A2(elm$json$Json$Encode$list, author$project$GitHubGraph$encodeLabel, record.labels)),
				_Utils_Tuple2(
				'cards',
				A2(elm$json$Json$Encode$list, author$project$GitHubGraph$encodeCardLocation, record.cards)),
				_Utils_Tuple2(
				'additions',
				elm$json$Json$Encode$int(record.additions)),
				_Utils_Tuple2(
				'deletions',
				elm$json$Json$Encode$int(record.deletions)),
				_Utils_Tuple2(
				'milestone',
				A2(elm_community$json_extra$Json$Encode$Extra$maybe, author$project$GitHubGraph$encodeMilestone, record.milestone)),
				_Utils_Tuple2(
				'mergeable',
				author$project$GitHubGraph$encodeMergeableState(record.mergeable)),
				_Utils_Tuple2(
				'last_commit',
				A2(elm_community$json_extra$Json$Encode$Extra$maybe, author$project$GitHubGraph$encodeCommit, record.lastCommit)),
				_Utils_Tuple2(
				'merge_commit',
				A2(elm_community$json_extra$Json$Encode$Extra$maybe, author$project$GitHubGraph$encodeCommit, record.mergeCommit))
			]));
};
var author$project$GitHubGraph$encodeProjectColumnCard = function (record) {
	return elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'id',
				elm$json$Json$Encode$string(record.id)),
				_Utils_Tuple2(
				'url',
				elm$json$Json$Encode$string(record.url)),
				_Utils_Tuple2(
				'content',
				function () {
					var _n0 = record.content;
					if (_n0.$ === 'Just') {
						if (_n0.a.$ === 'IssueCardContent') {
							var issue = _n0.a.a;
							return elm$json$Json$Encode$object(
								_List_fromArray(
									[
										_Utils_Tuple2(
										'issue',
										author$project$GitHubGraph$encodeIssue(issue))
									]));
						} else {
							var pr = _n0.a.a;
							return elm$json$Json$Encode$object(
								_List_fromArray(
									[
										_Utils_Tuple2(
										'pull_request',
										author$project$GitHubGraph$encodePullRequest(pr))
									]));
						}
					} else {
						return elm$json$Json$Encode$null;
					}
				}()),
				_Utils_Tuple2(
				'note',
				A2(elm_community$json_extra$Json$Encode$Extra$maybe, elm$json$Json$Encode$string, record.note))
			]));
};
var author$project$GitHubGraph$PullRequestReviewStateApproved = {$: 'PullRequestReviewStateApproved'};
var author$project$GitHubGraph$PullRequestReviewStateChangesRequested = {$: 'PullRequestReviewStateChangesRequested'};
var author$project$GitHubGraph$PullRequestReviewStateCommented = {$: 'PullRequestReviewStateCommented'};
var author$project$GitHubGraph$PullRequestReviewStateDismissed = {$: 'PullRequestReviewStateDismissed'};
var author$project$GitHubGraph$PullRequestReviewStatePending = {$: 'PullRequestReviewStatePending'};
var author$project$GitHubGraph$pullRequestReviewStates = _List_fromArray(
	[
		_Utils_Tuple2('PENDING', author$project$GitHubGraph$PullRequestReviewStatePending),
		_Utils_Tuple2('COMMENTED', author$project$GitHubGraph$PullRequestReviewStateCommented),
		_Utils_Tuple2('APPROVED', author$project$GitHubGraph$PullRequestReviewStateApproved),
		_Utils_Tuple2('CHANGES_REQUESTED', author$project$GitHubGraph$PullRequestReviewStateChangesRequested),
		_Utils_Tuple2('DISMISSED', author$project$GitHubGraph$PullRequestReviewStateDismissed)
	]);
var author$project$GitHubGraph$encodePullRequestReviewState = function (item) {
	return elm$json$Json$Encode$string(
		A3(
			elm$core$List$foldl,
			F2(
				function (_n0, _default) {
					var a = _n0.a;
					var b = _n0.b;
					return _Utils_eq(b, item) ? a : _default;
				}),
			'UNKNOWN',
			author$project$GitHubGraph$pullRequestReviewStates));
};
var author$project$GitHubGraph$encodePullRequestReview = function (record) {
	return elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'author',
				author$project$GitHubGraph$encodeUser(record.author)),
				_Utils_Tuple2(
				'state',
				author$project$GitHubGraph$encodePullRequestReviewState(record.state)),
				_Utils_Tuple2(
				'created_at',
				elm$json$Json$Encode$string(
					rtfeldman$elm_iso8601_date_strings$Iso8601$fromTime(record.createdAt)))
			]));
};
var author$project$GitHubGraph$encodeGitObject = function (record) {
	return elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'url',
				elm$json$Json$Encode$string(record.url)),
				_Utils_Tuple2(
				'oid',
				elm$json$Json$Encode$string(record.oid))
			]));
};
var author$project$GitHubGraph$encodeTag = function (record) {
	return elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'name',
				elm$json$Json$Encode$string(record.name)),
				_Utils_Tuple2(
				'target',
				author$project$GitHubGraph$encodeGitObject(record.target))
			]));
};
var author$project$GitHubGraph$encodeRelease = function (record) {
	return elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'id',
				elm$json$Json$Encode$string(record.id)),
				_Utils_Tuple2(
				'url',
				elm$json$Json$Encode$string(record.url)),
				_Utils_Tuple2(
				'name',
				A2(elm_community$json_extra$Json$Encode$Extra$maybe, elm$json$Json$Encode$string, record.name)),
				_Utils_Tuple2(
				'tag',
				A2(elm_community$json_extra$Json$Encode$Extra$maybe, author$project$GitHubGraph$encodeTag, record.tag))
			]));
};
var elm$json$Json$Encode$bool = _Json_wrap;
var author$project$GitHubGraph$encodeRepo = function (record) {
	return elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'id',
				elm$json$Json$Encode$string(record.id)),
				_Utils_Tuple2(
				'url',
				elm$json$Json$Encode$string(record.url)),
				_Utils_Tuple2(
				'owner',
				elm$json$Json$Encode$string(record.owner)),
				_Utils_Tuple2(
				'name',
				elm$json$Json$Encode$string(record.name)),
				_Utils_Tuple2(
				'is_archived',
				elm$json$Json$Encode$bool(record.isArchived)),
				_Utils_Tuple2(
				'labels',
				A2(elm$json$Json$Encode$list, author$project$GitHubGraph$encodeLabel, record.labels)),
				_Utils_Tuple2(
				'milestones',
				A2(elm$json$Json$Encode$list, author$project$GitHubGraph$encodeMilestone, record.milestones)),
				_Utils_Tuple2(
				'releases',
				A2(elm$json$Json$Encode$list, author$project$GitHubGraph$encodeRelease, record.releases))
			]));
};
var author$project$GitHubGraph$encodeV3Commit = function (record) {
	return elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'html_url',
				elm$json$Json$Encode$string(record.url)),
				_Utils_Tuple2(
				'sha',
				elm$json$Json$Encode$string(record.sha))
			]));
};
var author$project$GitHubGraph$encodeV3File = function (record) {
	return elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'sha',
				elm$json$Json$Encode$string(record.sha)),
				_Utils_Tuple2(
				'filename',
				elm$json$Json$Encode$string(record.filename)),
				_Utils_Tuple2(
				'status',
				elm$json$Json$Encode$string(record.status))
			]));
};
var author$project$GitHubGraph$encodeV3Comparison = function (record) {
	return elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'html_url',
				elm$json$Json$Encode$string(record.url)),
				_Utils_Tuple2(
				'status',
				elm$json$Json$Encode$string(record.status)),
				_Utils_Tuple2(
				'base_commit',
				author$project$GitHubGraph$encodeV3Commit(record.baseCommit)),
				_Utils_Tuple2(
				'merge_base_commit',
				author$project$GitHubGraph$encodeV3Commit(record.mergeBaseCommit)),
				_Utils_Tuple2(
				'ahead_by',
				elm$json$Json$Encode$int(record.aheadBy)),
				_Utils_Tuple2(
				'behind_by',
				elm$json$Json$Encode$int(record.behindBy)),
				_Utils_Tuple2(
				'total_commits',
				elm$json$Json$Encode$int(record.totalCommits)),
				_Utils_Tuple2(
				'commits',
				A2(elm$json$Json$Encode$list, author$project$GitHubGraph$encodeV3Commit, record.commits)),
				_Utils_Tuple2(
				'files',
				A2(elm$json$Json$Encode$list, author$project$GitHubGraph$encodeV3File, record.files))
			]));
};
var elm$core$Debug$log = _Debug_log;
var author$project$Log$debug = F3(
	function (ctx, thing, a) {
		return A2(
			elm$core$Basics$always,
			a,
			A2(elm$core$Debug$log, ctx, thing));
	});
var author$project$Main$FetchCards = function (a) {
	return {$: 'FetchCards', a: a};
};
var author$project$Main$Noop = {$: 'Noop'};
var elm$core$Platform$Cmd$batch = _Platform_batch;
var elm$core$Platform$Cmd$none = elm$core$Platform$Cmd$batch(_List_Nil);
var author$project$Main$backOff = F2(
	function (model, cmd) {
		return _Utils_Tuple2(
			_Utils_update(
				model,
				{
					failedQueue: A2(
						elm$core$List$cons,
						cmd,
						_Utils_ap(model.loadQueue, model.failedQueue)),
					loadQueue: _List_Nil
				}),
			elm$core$Platform$Cmd$none);
	});
var gampleman$elm_visualization$Force$isCompleted = function (_n0) {
	var alpha = _n0.a.alpha;
	var minAlpha = _n0.a.minAlpha;
	return _Utils_cmp(alpha, minAlpha) < 1;
};
var author$project$ForceGraph$isCompleted = A2(
	elm$core$Basics$composeR,
	function ($) {
		return $.simulation;
	},
	gampleman$elm_visualization$Force$isCompleted);
var author$project$ForceGraph$updateContextWithValue = F2(
	function (nc, value) {
		var ncnode = nc.node;
		var label = ncnode.label;
		return _Utils_update(
			nc,
			{
				node: _Utils_update(
					ncnode,
					{label: value})
			});
	});
var elm$core$List$foldrHelper = F4(
	function (fn, acc, ctr, ls) {
		if (!ls.b) {
			return acc;
		} else {
			var a = ls.a;
			var r1 = ls.b;
			if (!r1.b) {
				return A2(fn, a, acc);
			} else {
				var b = r1.a;
				var r2 = r1.b;
				if (!r2.b) {
					return A2(
						fn,
						a,
						A2(fn, b, acc));
				} else {
					var c = r2.a;
					var r3 = r2.b;
					if (!r3.b) {
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(fn, c, acc)));
					} else {
						var d = r3.a;
						var r4 = r3.b;
						var res = (ctr > 500) ? A3(
							elm$core$List$foldl,
							fn,
							acc,
							elm$core$List$reverse(r4)) : A4(elm$core$List$foldrHelper, fn, acc, ctr + 1, r4);
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(
									fn,
									c,
									A2(fn, d, res))));
					}
				}
			}
		}
	});
var elm$core$List$foldr = F3(
	function (fn, acc, ls) {
		return A4(elm$core$List$foldrHelper, fn, acc, 0, ls);
	});
var author$project$ForceGraph$updateGraphWithList = function () {
	var graphUpdater = function (value) {
		return elm$core$Maybe$map(
			function (ctx) {
				return A2(author$project$ForceGraph$updateContextWithValue, ctx, value);
			});
	};
	return elm$core$List$foldr(
		function (ncnode) {
			return A2(
				elm_community$graph$Graph$update,
				ncnode.id,
				graphUpdater(ncnode));
		});
}();
var elm$core$List$map = F2(
	function (f, xs) {
		return A3(
			elm$core$List$foldr,
			F2(
				function (x, acc) {
					return A2(
						elm$core$List$cons,
						f(x),
						acc);
				}),
			_List_Nil,
			xs);
	});
var elm_community$intdict$IntDict$values = function (dict) {
	return A3(
		elm_community$intdict$IntDict$foldr,
		F3(
			function (key, value, valueList) {
				return A2(elm$core$List$cons, value, valueList);
			}),
		_List_Nil,
		dict);
};
var elm_community$graph$Graph$nodes = A2(
	elm$core$Basics$composeR,
	elm_community$graph$Graph$unGraph,
	A2(
		elm$core$Basics$composeR,
		elm_community$intdict$IntDict$values,
		elm$core$List$map(
			function ($) {
				return $.node;
			})));
var elm$core$Dict$RBEmpty_elm_builtin = {$: 'RBEmpty_elm_builtin'};
var elm$core$Dict$empty = elm$core$Dict$RBEmpty_elm_builtin;
var elm$core$Dict$Black = {$: 'Black'};
var elm$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {$: 'RBNode_elm_builtin', a: a, b: b, c: c, d: d, e: e};
	});
var elm$core$Basics$compare = _Utils_compare;
var elm$core$Dict$Red = {$: 'Red'};
var elm$core$Dict$balance = F5(
	function (color, key, value, left, right) {
		if ((right.$ === 'RBNode_elm_builtin') && (right.a.$ === 'Red')) {
			var _n1 = right.a;
			var rK = right.b;
			var rV = right.c;
			var rLeft = right.d;
			var rRight = right.e;
			if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) {
				var _n3 = left.a;
				var lK = left.b;
				var lV = left.c;
				var lLeft = left.d;
				var lRight = left.e;
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					elm$core$Dict$Red,
					key,
					value,
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Black, lK, lV, lLeft, lRight),
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Black, rK, rV, rLeft, rRight));
			} else {
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					color,
					rK,
					rV,
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, key, value, left, rLeft),
					rRight);
			}
		} else {
			if ((((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) && (left.d.$ === 'RBNode_elm_builtin')) && (left.d.a.$ === 'Red')) {
				var _n5 = left.a;
				var lK = left.b;
				var lV = left.c;
				var _n6 = left.d;
				var _n7 = _n6.a;
				var llK = _n6.b;
				var llV = _n6.c;
				var llLeft = _n6.d;
				var llRight = _n6.e;
				var lRight = left.e;
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					elm$core$Dict$Red,
					lK,
					lV,
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Black, llK, llV, llLeft, llRight),
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Black, key, value, lRight, right));
			} else {
				return A5(elm$core$Dict$RBNode_elm_builtin, color, key, value, left, right);
			}
		}
	});
var elm$core$Dict$insertHelp = F3(
	function (key, value, dict) {
		if (dict.$ === 'RBEmpty_elm_builtin') {
			return A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, key, value, elm$core$Dict$RBEmpty_elm_builtin, elm$core$Dict$RBEmpty_elm_builtin);
		} else {
			var nColor = dict.a;
			var nKey = dict.b;
			var nValue = dict.c;
			var nLeft = dict.d;
			var nRight = dict.e;
			var _n1 = A2(elm$core$Basics$compare, key, nKey);
			switch (_n1.$) {
				case 'LT':
					return A5(
						elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						A3(elm$core$Dict$insertHelp, key, value, nLeft),
						nRight);
				case 'EQ':
					return A5(elm$core$Dict$RBNode_elm_builtin, nColor, nKey, value, nLeft, nRight);
				default:
					return A5(
						elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						nLeft,
						A3(elm$core$Dict$insertHelp, key, value, nRight));
			}
		}
	});
var elm$core$Dict$insert = F3(
	function (key, value, dict) {
		var _n0 = A3(elm$core$Dict$insertHelp, key, value, dict);
		if ((_n0.$ === 'RBNode_elm_builtin') && (_n0.a.$ === 'Red')) {
			var _n1 = _n0.a;
			var k = _n0.b;
			var v = _n0.c;
			var l = _n0.d;
			var r = _n0.e;
			return A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Black, k, v, l, r);
		} else {
			var x = _n0;
			return x;
		}
	});
var elm$core$Dict$values = function (dict) {
	return A3(
		elm$core$Dict$foldr,
		F3(
			function (key, value, valueList) {
				return A2(elm$core$List$cons, value, valueList);
			}),
		_List_Nil,
		dict);
};
var gampleman$elm_visualization$Force$State = function (a) {
	return {$: 'State', a: a};
};
var elm$core$Basics$pow = _Basics_pow;
var elm$core$Basics$sqrt = _Basics_sqrt;
var elm$core$Dict$get = F2(
	function (targetKey, dict) {
		get:
		while (true) {
			if (dict.$ === 'RBEmpty_elm_builtin') {
				return elm$core$Maybe$Nothing;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var _n1 = A2(elm$core$Basics$compare, targetKey, key);
				switch (_n1.$) {
					case 'LT':
						var $temp$targetKey = targetKey,
							$temp$dict = left;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
					case 'EQ':
						return elm$core$Maybe$Just(value);
					default:
						var $temp$targetKey = targetKey,
							$temp$dict = right;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
				}
			}
		}
	});
var elm$core$Dict$map = F2(
	function (func, dict) {
		if (dict.$ === 'RBEmpty_elm_builtin') {
			return elm$core$Dict$RBEmpty_elm_builtin;
		} else {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			return A5(
				elm$core$Dict$RBNode_elm_builtin,
				color,
				key,
				A2(func, key, value),
				A2(elm$core$Dict$map, func, left),
				A2(elm$core$Dict$map, func, right));
		}
	});
var elm$core$Dict$sizeHelp = F2(
	function (n, dict) {
		sizeHelp:
		while (true) {
			if (dict.$ === 'RBEmpty_elm_builtin') {
				return n;
			} else {
				var left = dict.d;
				var right = dict.e;
				var $temp$n = A2(elm$core$Dict$sizeHelp, n + 1, right),
					$temp$dict = left;
				n = $temp$n;
				dict = $temp$dict;
				continue sizeHelp;
			}
		}
	});
var elm$core$Dict$size = function (dict) {
	return A2(elm$core$Dict$sizeHelp, 0, dict);
};
var elm$core$Dict$getMin = function (dict) {
	getMin:
	while (true) {
		if ((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) {
			var left = dict.d;
			var $temp$dict = left;
			dict = $temp$dict;
			continue getMin;
		} else {
			return dict;
		}
	}
};
var elm$core$Dict$moveRedLeft = function (dict) {
	if (((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) && (dict.e.$ === 'RBNode_elm_builtin')) {
		if ((dict.e.d.$ === 'RBNode_elm_builtin') && (dict.e.d.a.$ === 'Red')) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _n1 = dict.d;
			var lClr = _n1.a;
			var lK = _n1.b;
			var lV = _n1.c;
			var lLeft = _n1.d;
			var lRight = _n1.e;
			var _n2 = dict.e;
			var rClr = _n2.a;
			var rK = _n2.b;
			var rV = _n2.c;
			var rLeft = _n2.d;
			var _n3 = rLeft.a;
			var rlK = rLeft.b;
			var rlV = rLeft.c;
			var rlL = rLeft.d;
			var rlR = rLeft.e;
			var rRight = _n2.e;
			return A5(
				elm$core$Dict$RBNode_elm_builtin,
				elm$core$Dict$Red,
				rlK,
				rlV,
				A5(
					elm$core$Dict$RBNode_elm_builtin,
					elm$core$Dict$Black,
					k,
					v,
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, lK, lV, lLeft, lRight),
					rlL),
				A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Black, rK, rV, rlR, rRight));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _n4 = dict.d;
			var lClr = _n4.a;
			var lK = _n4.b;
			var lV = _n4.c;
			var lLeft = _n4.d;
			var lRight = _n4.e;
			var _n5 = dict.e;
			var rClr = _n5.a;
			var rK = _n5.b;
			var rV = _n5.c;
			var rLeft = _n5.d;
			var rRight = _n5.e;
			if (clr.$ === 'Black') {
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					elm$core$Dict$Black,
					k,
					v,
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, rK, rV, rLeft, rRight));
			} else {
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					elm$core$Dict$Black,
					k,
					v,
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var elm$core$Dict$moveRedRight = function (dict) {
	if (((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) && (dict.e.$ === 'RBNode_elm_builtin')) {
		if ((dict.d.d.$ === 'RBNode_elm_builtin') && (dict.d.d.a.$ === 'Red')) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _n1 = dict.d;
			var lClr = _n1.a;
			var lK = _n1.b;
			var lV = _n1.c;
			var _n2 = _n1.d;
			var _n3 = _n2.a;
			var llK = _n2.b;
			var llV = _n2.c;
			var llLeft = _n2.d;
			var llRight = _n2.e;
			var lRight = _n1.e;
			var _n4 = dict.e;
			var rClr = _n4.a;
			var rK = _n4.b;
			var rV = _n4.c;
			var rLeft = _n4.d;
			var rRight = _n4.e;
			return A5(
				elm$core$Dict$RBNode_elm_builtin,
				elm$core$Dict$Red,
				lK,
				lV,
				A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Black, llK, llV, llLeft, llRight),
				A5(
					elm$core$Dict$RBNode_elm_builtin,
					elm$core$Dict$Black,
					k,
					v,
					lRight,
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, rK, rV, rLeft, rRight)));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _n5 = dict.d;
			var lClr = _n5.a;
			var lK = _n5.b;
			var lV = _n5.c;
			var lLeft = _n5.d;
			var lRight = _n5.e;
			var _n6 = dict.e;
			var rClr = _n6.a;
			var rK = _n6.b;
			var rV = _n6.c;
			var rLeft = _n6.d;
			var rRight = _n6.e;
			if (clr.$ === 'Black') {
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					elm$core$Dict$Black,
					k,
					v,
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, rK, rV, rLeft, rRight));
			} else {
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					elm$core$Dict$Black,
					k,
					v,
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var elm$core$Dict$removeHelpPrepEQGT = F7(
	function (targetKey, dict, color, key, value, left, right) {
		if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) {
			var _n1 = left.a;
			var lK = left.b;
			var lV = left.c;
			var lLeft = left.d;
			var lRight = left.e;
			return A5(
				elm$core$Dict$RBNode_elm_builtin,
				color,
				lK,
				lV,
				lLeft,
				A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, key, value, lRight, right));
		} else {
			_n2$2:
			while (true) {
				if ((right.$ === 'RBNode_elm_builtin') && (right.a.$ === 'Black')) {
					if (right.d.$ === 'RBNode_elm_builtin') {
						if (right.d.a.$ === 'Black') {
							var _n3 = right.a;
							var _n4 = right.d;
							var _n5 = _n4.a;
							return elm$core$Dict$moveRedRight(dict);
						} else {
							break _n2$2;
						}
					} else {
						var _n6 = right.a;
						var _n7 = right.d;
						return elm$core$Dict$moveRedRight(dict);
					}
				} else {
					break _n2$2;
				}
			}
			return dict;
		}
	});
var elm$core$Dict$removeMin = function (dict) {
	if ((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) {
		var color = dict.a;
		var key = dict.b;
		var value = dict.c;
		var left = dict.d;
		var lColor = left.a;
		var lLeft = left.d;
		var right = dict.e;
		if (lColor.$ === 'Black') {
			if ((lLeft.$ === 'RBNode_elm_builtin') && (lLeft.a.$ === 'Red')) {
				var _n3 = lLeft.a;
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					color,
					key,
					value,
					elm$core$Dict$removeMin(left),
					right);
			} else {
				var _n4 = elm$core$Dict$moveRedLeft(dict);
				if (_n4.$ === 'RBNode_elm_builtin') {
					var nColor = _n4.a;
					var nKey = _n4.b;
					var nValue = _n4.c;
					var nLeft = _n4.d;
					var nRight = _n4.e;
					return A5(
						elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						elm$core$Dict$removeMin(nLeft),
						nRight);
				} else {
					return elm$core$Dict$RBEmpty_elm_builtin;
				}
			}
		} else {
			return A5(
				elm$core$Dict$RBNode_elm_builtin,
				color,
				key,
				value,
				elm$core$Dict$removeMin(left),
				right);
		}
	} else {
		return elm$core$Dict$RBEmpty_elm_builtin;
	}
};
var elm$core$Dict$removeHelp = F2(
	function (targetKey, dict) {
		if (dict.$ === 'RBEmpty_elm_builtin') {
			return elm$core$Dict$RBEmpty_elm_builtin;
		} else {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_cmp(targetKey, key) < 0) {
				if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Black')) {
					var _n4 = left.a;
					var lLeft = left.d;
					if ((lLeft.$ === 'RBNode_elm_builtin') && (lLeft.a.$ === 'Red')) {
						var _n6 = lLeft.a;
						return A5(
							elm$core$Dict$RBNode_elm_builtin,
							color,
							key,
							value,
							A2(elm$core$Dict$removeHelp, targetKey, left),
							right);
					} else {
						var _n7 = elm$core$Dict$moveRedLeft(dict);
						if (_n7.$ === 'RBNode_elm_builtin') {
							var nColor = _n7.a;
							var nKey = _n7.b;
							var nValue = _n7.c;
							var nLeft = _n7.d;
							var nRight = _n7.e;
							return A5(
								elm$core$Dict$balance,
								nColor,
								nKey,
								nValue,
								A2(elm$core$Dict$removeHelp, targetKey, nLeft),
								nRight);
						} else {
							return elm$core$Dict$RBEmpty_elm_builtin;
						}
					}
				} else {
					return A5(
						elm$core$Dict$RBNode_elm_builtin,
						color,
						key,
						value,
						A2(elm$core$Dict$removeHelp, targetKey, left),
						right);
				}
			} else {
				return A2(
					elm$core$Dict$removeHelpEQGT,
					targetKey,
					A7(elm$core$Dict$removeHelpPrepEQGT, targetKey, dict, color, key, value, left, right));
			}
		}
	});
var elm$core$Dict$removeHelpEQGT = F2(
	function (targetKey, dict) {
		if (dict.$ === 'RBNode_elm_builtin') {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_eq(targetKey, key)) {
				var _n1 = elm$core$Dict$getMin(right);
				if (_n1.$ === 'RBNode_elm_builtin') {
					var minKey = _n1.b;
					var minValue = _n1.c;
					return A5(
						elm$core$Dict$balance,
						color,
						minKey,
						minValue,
						left,
						elm$core$Dict$removeMin(right));
				} else {
					return elm$core$Dict$RBEmpty_elm_builtin;
				}
			} else {
				return A5(
					elm$core$Dict$balance,
					color,
					key,
					value,
					left,
					A2(elm$core$Dict$removeHelp, targetKey, right));
			}
		} else {
			return elm$core$Dict$RBEmpty_elm_builtin;
		}
	});
var elm$core$Dict$remove = F2(
	function (key, dict) {
		var _n0 = A2(elm$core$Dict$removeHelp, key, dict);
		if ((_n0.$ === 'RBNode_elm_builtin') && (_n0.a.$ === 'Red')) {
			var _n1 = _n0.a;
			var k = _n0.b;
			var v = _n0.c;
			var l = _n0.d;
			var r = _n0.e;
			return A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Black, k, v, l, r);
		} else {
			var x = _n0;
			return x;
		}
	});
var elm$core$Dict$update = F3(
	function (targetKey, alter, dictionary) {
		var _n0 = alter(
			A2(elm$core$Dict$get, targetKey, dictionary));
		if (_n0.$ === 'Just') {
			var value = _n0.a;
			return A3(elm$core$Dict$insert, targetKey, value, dictionary);
		} else {
			return A2(elm$core$Dict$remove, targetKey, dictionary);
		}
	});
var elm$core$Basics$isNaN = _Basics_isNaN;
var ianmackenzie$elm_geometry$BoundingBox2d$maxX = function (_n0) {
	var boundingBox = _n0.a;
	return boundingBox.maxX;
};
var ianmackenzie$elm_geometry$BoundingBox2d$maxY = function (_n0) {
	var boundingBox = _n0.a;
	return boundingBox.maxY;
};
var ianmackenzie$elm_geometry$BoundingBox2d$minX = function (_n0) {
	var boundingBox = _n0.a;
	return boundingBox.minX;
};
var ianmackenzie$elm_geometry$BoundingBox2d$minY = function (_n0) {
	var boundingBox = _n0.a;
	return boundingBox.minY;
};
var ianmackenzie$elm_geometry$BoundingBox2d$dimensions = function (boundingBox) {
	return _Utils_Tuple2(
		ianmackenzie$elm_geometry$BoundingBox2d$maxX(boundingBox) - ianmackenzie$elm_geometry$BoundingBox2d$minX(boundingBox),
		ianmackenzie$elm_geometry$BoundingBox2d$maxY(boundingBox) - ianmackenzie$elm_geometry$BoundingBox2d$minY(boundingBox));
};
var ianmackenzie$elm_geometry$Bootstrap$Point2d$coordinates = function (_n0) {
	var coordinates_ = _n0.a;
	return coordinates_;
};
var ianmackenzie$elm_geometry$Geometry$Types$Vector2d = function (a) {
	return {$: 'Vector2d', a: a};
};
var ianmackenzie$elm_geometry$Vector2d$fromComponents = ianmackenzie$elm_geometry$Geometry$Types$Vector2d;
var ianmackenzie$elm_geometry$Vector2d$from = F2(
	function (firstPoint, secondPoint) {
		var _n0 = ianmackenzie$elm_geometry$Bootstrap$Point2d$coordinates(secondPoint);
		var x2 = _n0.a;
		var y2 = _n0.b;
		var _n1 = ianmackenzie$elm_geometry$Bootstrap$Point2d$coordinates(firstPoint);
		var x1 = _n1.a;
		var y1 = _n1.b;
		return ianmackenzie$elm_geometry$Vector2d$fromComponents(
			_Utils_Tuple2(x2 - x1, y2 - y1));
	});
var ianmackenzie$elm_geometry$Vector2d$components = function (_n0) {
	var components_ = _n0.a;
	return components_;
};
var ianmackenzie$elm_geometry$Vector2d$squaredLength = function (vector) {
	var _n0 = ianmackenzie$elm_geometry$Vector2d$components(vector);
	var x = _n0.a;
	var y = _n0.b;
	return (x * x) + (y * y);
};
var ianmackenzie$elm_geometry$Point2d$squaredDistanceFrom = F2(
	function (firstPoint, secondPoint) {
		return ianmackenzie$elm_geometry$Vector2d$squaredLength(
			A2(ianmackenzie$elm_geometry$Vector2d$from, firstPoint, secondPoint));
	});
var ianmackenzie$elm_geometry$Point2d$distanceFrom = F2(
	function (firstPoint, secondPoint) {
		return elm$core$Basics$sqrt(
			A2(ianmackenzie$elm_geometry$Point2d$squaredDistanceFrom, firstPoint, secondPoint));
	});
var ianmackenzie$elm_geometry$Vector2d$scaleBy = F2(
	function (scale, vector) {
		var _n0 = ianmackenzie$elm_geometry$Vector2d$components(vector);
		var x = _n0.a;
		var y = _n0.b;
		return ianmackenzie$elm_geometry$Vector2d$fromComponents(
			_Utils_Tuple2(x * scale, y * scale));
	});
var ianmackenzie$elm_geometry$Vector2d$sum = F2(
	function (firstVector, secondVector) {
		var _n0 = ianmackenzie$elm_geometry$Vector2d$components(secondVector);
		var x2 = _n0.a;
		var y2 = _n0.b;
		var _n1 = ianmackenzie$elm_geometry$Vector2d$components(firstVector);
		var x1 = _n1.a;
		var y1 = _n1.b;
		return ianmackenzie$elm_geometry$Vector2d$fromComponents(
			_Utils_Tuple2(x1 + x2, y1 + y2));
	});
var ianmackenzie$elm_geometry$Vector2d$zero = ianmackenzie$elm_geometry$Vector2d$fromComponents(
	_Utils_Tuple2(0, 0));
var gampleman$elm_visualization$Force$ManyBody$applyForce = F4(
	function (alpha, theta, qtree, vertex) {
		var isFarAway = function (treePart) {
			var distance = A2(ianmackenzie$elm_geometry$Point2d$distanceFrom, vertex.position, treePart.aggregate.position);
			var _n2 = ianmackenzie$elm_geometry$BoundingBox2d$dimensions(treePart.boundingBox);
			var width = _n2.a;
			return _Utils_cmp(width / distance, theta) < 0;
		};
		var calculateVelocity = F2(
			function (target, source) {
				var delta = A2(ianmackenzie$elm_geometry$Vector2d$from, target.position, source.position);
				var weight = (source.strength * alpha) / ianmackenzie$elm_geometry$Vector2d$squaredLength(delta);
				return elm$core$Basics$isNaN(weight) ? ianmackenzie$elm_geometry$Vector2d$zero : A2(ianmackenzie$elm_geometry$Vector2d$scaleBy, weight, delta);
			});
		var useAggregate = function (treePart) {
			return A2(calculateVelocity, vertex, treePart.aggregate);
		};
		switch (qtree.$) {
			case 'Empty':
				return ianmackenzie$elm_geometry$Vector2d$zero;
			case 'Leaf':
				var leaf = qtree.a;
				if (isFarAway(leaf)) {
					return useAggregate(leaf);
				} else {
					var applyForceFromPoint = F2(
						function (point, accum) {
							return _Utils_eq(point.key, vertex.key) ? accum : A2(
								ianmackenzie$elm_geometry$Vector2d$sum,
								A2(calculateVelocity, vertex, point),
								accum);
						});
					var _n1 = leaf.children;
					var first = _n1.a;
					var rest = _n1.b;
					return A3(
						elm$core$List$foldl,
						applyForceFromPoint,
						ianmackenzie$elm_geometry$Vector2d$zero,
						A2(elm$core$List$cons, first, rest));
				}
			default:
				var node = qtree.a;
				if (isFarAway(node)) {
					return useAggregate(node);
				} else {
					var helper = function (tree) {
						return A4(gampleman$elm_visualization$Force$ManyBody$applyForce, alpha, theta, tree, vertex);
					};
					return A2(
						ianmackenzie$elm_geometry$Vector2d$sum,
						helper(node.sw),
						A2(
							ianmackenzie$elm_geometry$Vector2d$sum,
							helper(node.se),
							A2(
								ianmackenzie$elm_geometry$Vector2d$sum,
								helper(node.ne),
								helper(node.nw))));
				}
		}
	});
var ianmackenzie$elm_geometry$Point2d$coordinates = function (_n0) {
	var coordinates_ = _n0.a;
	return coordinates_;
};
var ianmackenzie$elm_geometry$Geometry$Types$Point2d = function (a) {
	return {$: 'Point2d', a: a};
};
var ianmackenzie$elm_geometry$Point2d$fromCoordinates = ianmackenzie$elm_geometry$Geometry$Types$Point2d;
var gampleman$elm_visualization$Force$ManyBody$constructSuperPoint = F2(
	function (first, rest) {
		var initialStrength = first.strength;
		var initialPoint = ianmackenzie$elm_geometry$Point2d$coordinates(first.position);
		var folder = F2(
			function (point, _n3) {
				var _n4 = _n3.a;
				var accumX = _n4.a;
				var accumY = _n4.b;
				var strength = _n3.b;
				var size = _n3.c;
				var _n2 = ianmackenzie$elm_geometry$Point2d$coordinates(point.position);
				var x = _n2.a;
				var y = _n2.b;
				return _Utils_Tuple3(
					_Utils_Tuple2(accumX + x, accumY + y),
					strength + point.strength,
					size + 1);
			});
		var _n0 = A3(
			elm$core$List$foldl,
			folder,
			_Utils_Tuple3(initialPoint, initialStrength, 1),
			rest);
		var _n1 = _n0.a;
		var totalX = _n1.a;
		var totalY = _n1.b;
		var totalStrength = _n0.b;
		var totalSize = _n0.c;
		return {
			position: ianmackenzie$elm_geometry$Point2d$fromCoordinates(
				_Utils_Tuple2(totalX / totalSize, totalY / totalSize)),
			strength: totalStrength
		};
	});
var gampleman$elm_visualization$Force$ManyBody$config = {
	combineAggregates: gampleman$elm_visualization$Force$ManyBody$constructSuperPoint,
	combineVertices: gampleman$elm_visualization$Force$ManyBody$constructSuperPoint,
	toPoint: function ($) {
		return $.position;
	}
};
var gampleman$elm_visualization$Force$QuadTree$Empty = {$: 'Empty'};
var gampleman$elm_visualization$Force$QuadTree$empty = gampleman$elm_visualization$Force$QuadTree$Empty;
var gampleman$elm_visualization$Force$QuadTree$Leaf = function (a) {
	return {$: 'Leaf', a: a};
};
var gampleman$elm_visualization$Force$QuadTree$Node = function (a) {
	return {$: 'Node', a: a};
};
var gampleman$elm_visualization$Force$QuadTree$NE = {$: 'NE'};
var gampleman$elm_visualization$Force$QuadTree$NW = {$: 'NW'};
var gampleman$elm_visualization$Force$QuadTree$SE = {$: 'SE'};
var gampleman$elm_visualization$Force$QuadTree$SW = {$: 'SW'};
var ianmackenzie$elm_geometry$BoundingBox2d$midX = function (_n0) {
	var boundingBox = _n0.a;
	return boundingBox.minX + (0.5 * (boundingBox.maxX - boundingBox.minX));
};
var ianmackenzie$elm_geometry$BoundingBox2d$midY = function (_n0) {
	var boundingBox = _n0.a;
	return boundingBox.minY + (0.5 * (boundingBox.maxY - boundingBox.minY));
};
var ianmackenzie$elm_geometry$BoundingBox2d$centerPoint = function (boundingBox) {
	return ianmackenzie$elm_geometry$Point2d$fromCoordinates(
		_Utils_Tuple2(
			ianmackenzie$elm_geometry$BoundingBox2d$midX(boundingBox),
			ianmackenzie$elm_geometry$BoundingBox2d$midY(boundingBox)));
};
var ianmackenzie$elm_geometry$BoundingBox2d$centroid = function (boundingBox) {
	return ianmackenzie$elm_geometry$BoundingBox2d$centerPoint(boundingBox);
};
var ianmackenzie$elm_geometry$BoundingBox2d$extrema = function (_n0) {
	var extrema_ = _n0.a;
	return extrema_;
};
var gampleman$elm_visualization$Force$QuadTree$quadrant = F2(
	function (boundingBox, point) {
		var _n0 = ianmackenzie$elm_geometry$Point2d$coordinates(point);
		var x = _n0.a;
		var y = _n0.b;
		var _n1 = ianmackenzie$elm_geometry$Point2d$coordinates(
			ianmackenzie$elm_geometry$BoundingBox2d$centroid(boundingBox));
		var midX = _n1.a;
		var midY = _n1.b;
		var _n2 = ianmackenzie$elm_geometry$BoundingBox2d$extrema(boundingBox);
		var minX = _n2.minX;
		var minY = _n2.minY;
		var maxX = _n2.maxX;
		var maxY = _n2.maxY;
		return (_Utils_cmp(y, midY) > -1) ? ((_Utils_cmp(x, midX) > -1) ? gampleman$elm_visualization$Force$QuadTree$NE : gampleman$elm_visualization$Force$QuadTree$NW) : ((_Utils_cmp(x, midX) > -1) ? gampleman$elm_visualization$Force$QuadTree$SE : gampleman$elm_visualization$Force$QuadTree$SW);
	});
var elm$core$Basics$min = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) < 0) ? x : y;
	});
var ianmackenzie$elm_geometry$Geometry$Types$BoundingBox2d = function (a) {
	return {$: 'BoundingBox2d', a: a};
};
var ianmackenzie$elm_geometry$BoundingBox2d$fromExtrema = function (extrema_) {
	return ((_Utils_cmp(extrema_.minX, extrema_.maxX) < 1) && (_Utils_cmp(extrema_.minY, extrema_.maxY) < 1)) ? ianmackenzie$elm_geometry$Geometry$Types$BoundingBox2d(extrema_) : ianmackenzie$elm_geometry$Geometry$Types$BoundingBox2d(
		{
			maxX: A2(elm$core$Basics$max, extrema_.minX, extrema_.maxX),
			maxY: A2(elm$core$Basics$max, extrema_.minY, extrema_.maxY),
			minX: A2(elm$core$Basics$min, extrema_.minX, extrema_.maxX),
			minY: A2(elm$core$Basics$min, extrema_.minY, extrema_.maxY)
		});
};
var ianmackenzie$elm_geometry$BoundingBox2d$singleton = function (point) {
	var _n0 = ianmackenzie$elm_geometry$Point2d$coordinates(point);
	var x = _n0.a;
	var y = _n0.b;
	return ianmackenzie$elm_geometry$BoundingBox2d$fromExtrema(
		{maxX: x, maxY: y, minX: x, minY: y});
};
var gampleman$elm_visualization$Force$QuadTree$singleton = F2(
	function (toPoint, vertex) {
		return gampleman$elm_visualization$Force$QuadTree$Leaf(
			{
				aggregate: _Utils_Tuple0,
				boundingBox: ianmackenzie$elm_geometry$BoundingBox2d$singleton(
					toPoint(vertex)),
				children: _Utils_Tuple2(vertex, _List_Nil)
			});
	});
var ianmackenzie$elm_geometry$BoundingBox2d$contains = F2(
	function (point, boundingBox) {
		var _n0 = ianmackenzie$elm_geometry$Point2d$coordinates(point);
		var x = _n0.a;
		var y = _n0.b;
		return ((_Utils_cmp(
			ianmackenzie$elm_geometry$BoundingBox2d$minX(boundingBox),
			x) < 1) && (_Utils_cmp(
			x,
			ianmackenzie$elm_geometry$BoundingBox2d$maxX(boundingBox)) < 1)) && ((_Utils_cmp(
			ianmackenzie$elm_geometry$BoundingBox2d$minY(boundingBox),
			y) < 1) && (_Utils_cmp(
			y,
			ianmackenzie$elm_geometry$BoundingBox2d$maxY(boundingBox)) < 1));
	});
var ianmackenzie$elm_geometry$BoundingBox2d$hull = F2(
	function (firstBox, secondBox) {
		return ianmackenzie$elm_geometry$BoundingBox2d$fromExtrema(
			{
				maxX: A2(
					elm$core$Basics$max,
					ianmackenzie$elm_geometry$BoundingBox2d$maxX(firstBox),
					ianmackenzie$elm_geometry$BoundingBox2d$maxX(secondBox)),
				maxY: A2(
					elm$core$Basics$max,
					ianmackenzie$elm_geometry$BoundingBox2d$maxY(firstBox),
					ianmackenzie$elm_geometry$BoundingBox2d$maxY(secondBox)),
				minX: A2(
					elm$core$Basics$min,
					ianmackenzie$elm_geometry$BoundingBox2d$minX(firstBox),
					ianmackenzie$elm_geometry$BoundingBox2d$minX(secondBox)),
				minY: A2(
					elm$core$Basics$min,
					ianmackenzie$elm_geometry$BoundingBox2d$minY(firstBox),
					ianmackenzie$elm_geometry$BoundingBox2d$minY(secondBox))
			});
	});
var gampleman$elm_visualization$Force$QuadTree$insertBy = F3(
	function (toPoint, vertex, qtree) {
		switch (qtree.$) {
			case 'Empty':
				return gampleman$elm_visualization$Force$QuadTree$Leaf(
					{
						aggregate: _Utils_Tuple0,
						boundingBox: ianmackenzie$elm_geometry$BoundingBox2d$singleton(
							toPoint(vertex)),
						children: _Utils_Tuple2(vertex, _List_Nil)
					});
			case 'Leaf':
				var leaf = qtree.a;
				var maxSize = 32;
				var _n1 = leaf.children;
				var first = _n1.a;
				var rest = _n1.b;
				var newSize = 2 + elm$core$List$length(rest);
				if (_Utils_cmp(newSize, maxSize) > -1) {
					var initial = gampleman$elm_visualization$Force$QuadTree$Node(
						{
							aggregate: _Utils_Tuple0,
							boundingBox: A2(
								ianmackenzie$elm_geometry$BoundingBox2d$hull,
								leaf.boundingBox,
								ianmackenzie$elm_geometry$BoundingBox2d$singleton(
									toPoint(vertex))),
							ne: gampleman$elm_visualization$Force$QuadTree$Empty,
							nw: gampleman$elm_visualization$Force$QuadTree$Empty,
							se: gampleman$elm_visualization$Force$QuadTree$Empty,
							sw: gampleman$elm_visualization$Force$QuadTree$Empty
						});
					return A3(
						elm$core$List$foldl,
						gampleman$elm_visualization$Force$QuadTree$insertBy(toPoint),
						initial,
						A2(elm$core$List$cons, first, rest));
				} else {
					return gampleman$elm_visualization$Force$QuadTree$Leaf(
						{
							aggregate: _Utils_Tuple0,
							boundingBox: A2(
								ianmackenzie$elm_geometry$BoundingBox2d$hull,
								leaf.boundingBox,
								ianmackenzie$elm_geometry$BoundingBox2d$singleton(
									toPoint(vertex))),
							children: _Utils_Tuple2(
								vertex,
								A2(elm$core$List$cons, first, rest))
						});
				}
			default:
				var node = qtree.a;
				var point = toPoint(vertex);
				if (A2(ianmackenzie$elm_geometry$BoundingBox2d$contains, point, node.boundingBox)) {
					var _n2 = A2(gampleman$elm_visualization$Force$QuadTree$quadrant, node.boundingBox, point);
					switch (_n2.$) {
						case 'NE':
							return gampleman$elm_visualization$Force$QuadTree$Node(
								_Utils_update(
									node,
									{
										ne: A3(gampleman$elm_visualization$Force$QuadTree$insertBy, toPoint, vertex, node.ne)
									}));
						case 'SE':
							return gampleman$elm_visualization$Force$QuadTree$Node(
								_Utils_update(
									node,
									{
										se: A3(gampleman$elm_visualization$Force$QuadTree$insertBy, toPoint, vertex, node.se)
									}));
						case 'NW':
							return gampleman$elm_visualization$Force$QuadTree$Node(
								_Utils_update(
									node,
									{
										nw: A3(gampleman$elm_visualization$Force$QuadTree$insertBy, toPoint, vertex, node.nw)
									}));
						default:
							return gampleman$elm_visualization$Force$QuadTree$Node(
								_Utils_update(
									node,
									{
										sw: A3(gampleman$elm_visualization$Force$QuadTree$insertBy, toPoint, vertex, node.sw)
									}));
					}
				} else {
					var _n3 = ianmackenzie$elm_geometry$BoundingBox2d$extrema(node.boundingBox);
					var minX = _n3.minX;
					var minY = _n3.minY;
					var maxX = _n3.maxX;
					var maxY = _n3.maxY;
					var _n4 = ianmackenzie$elm_geometry$BoundingBox2d$dimensions(node.boundingBox);
					var width = _n4.a;
					var height = _n4.b;
					var _n5 = A2(gampleman$elm_visualization$Force$QuadTree$quadrant, node.boundingBox, point);
					switch (_n5.$) {
						case 'NE':
							return gampleman$elm_visualization$Force$QuadTree$Node(
								{
									aggregate: _Utils_Tuple0,
									boundingBox: ianmackenzie$elm_geometry$BoundingBox2d$fromExtrema(
										{maxX: maxX + width, maxY: maxY + height, minX: minX, minY: minY}),
									ne: A2(gampleman$elm_visualization$Force$QuadTree$singleton, toPoint, vertex),
									nw: gampleman$elm_visualization$Force$QuadTree$Empty,
									se: gampleman$elm_visualization$Force$QuadTree$Empty,
									sw: qtree
								});
						case 'SE':
							return gampleman$elm_visualization$Force$QuadTree$Node(
								{
									aggregate: _Utils_Tuple0,
									boundingBox: ianmackenzie$elm_geometry$BoundingBox2d$fromExtrema(
										{maxX: maxX + width, maxY: maxY, minX: minX, minY: minY - height}),
									ne: gampleman$elm_visualization$Force$QuadTree$Empty,
									nw: qtree,
									se: A2(gampleman$elm_visualization$Force$QuadTree$singleton, toPoint, vertex),
									sw: gampleman$elm_visualization$Force$QuadTree$Empty
								});
						case 'NW':
							return gampleman$elm_visualization$Force$QuadTree$Node(
								{
									aggregate: _Utils_Tuple0,
									boundingBox: ianmackenzie$elm_geometry$BoundingBox2d$fromExtrema(
										{maxX: maxX, maxY: maxY + height, minX: minX - width, minY: minY}),
									ne: gampleman$elm_visualization$Force$QuadTree$Empty,
									nw: A2(gampleman$elm_visualization$Force$QuadTree$singleton, toPoint, vertex),
									se: qtree,
									sw: gampleman$elm_visualization$Force$QuadTree$Empty
								});
						default:
							return gampleman$elm_visualization$Force$QuadTree$Node(
								{
									aggregate: _Utils_Tuple0,
									boundingBox: ianmackenzie$elm_geometry$BoundingBox2d$fromExtrema(
										{maxX: maxX, maxY: maxY, minX: minX - width, minY: minY - height}),
									ne: qtree,
									nw: gampleman$elm_visualization$Force$QuadTree$Empty,
									se: gampleman$elm_visualization$Force$QuadTree$Empty,
									sw: A2(gampleman$elm_visualization$Force$QuadTree$singleton, toPoint, vertex)
								});
					}
				}
		}
	});
var gampleman$elm_visualization$Force$QuadTree$fromList = function (toPoint) {
	return A2(
		elm$core$List$foldl,
		gampleman$elm_visualization$Force$QuadTree$insertBy(toPoint),
		gampleman$elm_visualization$Force$QuadTree$empty);
};
var elm$core$List$maybeCons = F3(
	function (f, mx, xs) {
		var _n0 = f(mx);
		if (_n0.$ === 'Just') {
			var x = _n0.a;
			return A2(elm$core$List$cons, x, xs);
		} else {
			return xs;
		}
	});
var elm$core$List$filterMap = F2(
	function (f, xs) {
		return A3(
			elm$core$List$foldr,
			elm$core$List$maybeCons(f),
			_List_Nil,
			xs);
	});
var gampleman$elm_visualization$Force$QuadTree$getAggregate = function (qtree) {
	switch (qtree.$) {
		case 'Empty':
			return elm$core$Maybe$Nothing;
		case 'Leaf':
			var aggregate = qtree.a.aggregate;
			return elm$core$Maybe$Just(aggregate);
		default:
			var aggregate = qtree.a.aggregate;
			return elm$core$Maybe$Just(aggregate);
	}
};
var gampleman$elm_visualization$Force$QuadTree$performAggregate = F2(
	function (config, vanillaQuadTree) {
		var combineAggregates = config.combineAggregates;
		var combineVertices = config.combineVertices;
		switch (vanillaQuadTree.$) {
			case 'Empty':
				return gampleman$elm_visualization$Force$QuadTree$Empty;
			case 'Leaf':
				var leaf = vanillaQuadTree.a;
				var _n1 = leaf.children;
				var first = _n1.a;
				var rest = _n1.b;
				return gampleman$elm_visualization$Force$QuadTree$Leaf(
					{
						aggregate: A2(combineVertices, first, rest),
						boundingBox: leaf.boundingBox,
						children: _Utils_Tuple2(first, rest)
					});
			default:
				var node = vanillaQuadTree.a;
				var newSw = A2(gampleman$elm_visualization$Force$QuadTree$performAggregate, config, node.sw);
				var newSe = A2(gampleman$elm_visualization$Force$QuadTree$performAggregate, config, node.se);
				var newNw = A2(gampleman$elm_visualization$Force$QuadTree$performAggregate, config, node.nw);
				var newNe = A2(gampleman$elm_visualization$Force$QuadTree$performAggregate, config, node.ne);
				var subresults = A2(
					elm$core$List$filterMap,
					gampleman$elm_visualization$Force$QuadTree$getAggregate,
					_List_fromArray(
						[newNw, newSw, newNe, newSe]));
				if (!subresults.b) {
					return gampleman$elm_visualization$Force$QuadTree$Empty;
				} else {
					var x = subresults.a;
					var xs = subresults.b;
					return gampleman$elm_visualization$Force$QuadTree$Node(
						{
							aggregate: A2(combineAggregates, x, xs),
							boundingBox: node.boundingBox,
							ne: newNe,
							nw: newNw,
							se: newSe,
							sw: newSw
						});
				}
		}
	});
var gampleman$elm_visualization$Force$ManyBody$manyBody = F3(
	function (alpha, theta, vertices) {
		var withAggregates = A2(
			gampleman$elm_visualization$Force$QuadTree$performAggregate,
			gampleman$elm_visualization$Force$ManyBody$config,
			A2(
				gampleman$elm_visualization$Force$QuadTree$fromList,
				function ($) {
					return $.position;
				},
				vertices));
		var updateVertex = function (vertex) {
			return _Utils_update(
				vertex,
				{
					velocity: A2(
						ianmackenzie$elm_geometry$Vector2d$sum,
						vertex.velocity,
						A4(gampleman$elm_visualization$Force$ManyBody$applyForce, alpha, theta, withAggregates, vertex))
				});
		};
		return A2(elm$core$List$map, updateVertex, vertices);
	});
var gampleman$elm_visualization$Force$ManyBody$wrapper = F4(
	function (alpha, theta, strengths, points) {
		var vertices = A2(
			elm$core$List$map,
			function (_n2) {
				var key = _n2.a;
				var point = _n2.b;
				var x = point.x;
				var y = point.y;
				var strength = A2(
					elm$core$Maybe$withDefault,
					0,
					A2(elm$core$Dict$get, key, strengths));
				return {
					key: key,
					position: ianmackenzie$elm_geometry$Point2d$fromCoordinates(
						_Utils_Tuple2(x, y)),
					strength: strength,
					velocity: ianmackenzie$elm_geometry$Vector2d$zero
				};
			},
			elm$core$Dict$toList(points));
		var updater = F2(
			function (newVertex, maybePoint) {
				if (maybePoint.$ === 'Nothing') {
					return elm$core$Maybe$Nothing;
				} else {
					var point = maybePoint.a;
					var _n1 = ianmackenzie$elm_geometry$Vector2d$components(newVertex.velocity);
					var dvx = _n1.a;
					var dvy = _n1.b;
					return elm$core$Maybe$Just(
						_Utils_update(
							point,
							{vx: point.vx + dvx, vy: point.vy + dvy}));
				}
			});
		var newVertices = A3(gampleman$elm_visualization$Force$ManyBody$manyBody, alpha, theta, vertices);
		var folder = F2(
			function (newVertex, pointsDict) {
				return A3(
					elm$core$Dict$update,
					newVertex.key,
					updater(newVertex),
					pointsDict);
			});
		return A3(elm$core$List$foldl, folder, points, newVertices);
	});
var gampleman$elm_visualization$Force$applyForce = F3(
	function (alpha, force, entities) {
		switch (force.$) {
			case 'Center':
				var x = force.a;
				var y = force.b;
				var n = elm$core$Dict$size(entities);
				var _n1 = A3(
					elm$core$Dict$foldr,
					F3(
						function (_n2, ent, _n3) {
							var sx0 = _n3.a;
							var sy0 = _n3.b;
							return _Utils_Tuple2(sx0 + ent.x, sy0 + ent.y);
						}),
					_Utils_Tuple2(0, 0),
					entities);
				var sumx = _n1.a;
				var sumy = _n1.b;
				var sx = (sumx / n) - x;
				var sy = (sumy / n) - y;
				return A2(
					elm$core$Dict$map,
					F2(
						function (_n4, ent) {
							return _Utils_update(
								ent,
								{x: ent.x - sx, y: ent.y - sy});
						}),
					entities);
			case 'Collision':
				var _float = force.a;
				var collisionParamidDict = force.b;
				return entities;
			case 'Links':
				var iters = force.a;
				var lnks = force.b;
				return A3(
					elm$core$List$foldl,
					F2(
						function (_n5, ents) {
							var source = _n5.source;
							var target = _n5.target;
							var distance = _n5.distance;
							var strength = _n5.strength;
							var bias = _n5.bias;
							var _n6 = _Utils_Tuple2(
								A2(elm$core$Dict$get, source, ents),
								A2(elm$core$Dict$get, target, ents));
							if ((_n6.a.$ === 'Just') && (_n6.b.$ === 'Just')) {
								var sourceNode = _n6.a.a;
								var targetNode = _n6.b.a;
								var y = ((targetNode.y + targetNode.vy) - sourceNode.y) - sourceNode.vy;
								var x = ((targetNode.x + targetNode.vx) - sourceNode.x) - sourceNode.vx;
								var d = elm$core$Basics$sqrt(
									A2(elm$core$Basics$pow, x, 2) + A2(elm$core$Basics$pow, y, 2));
								var l = (((d - distance) / d) * alpha) * strength;
								return A3(
									elm$core$Dict$update,
									source,
									elm$core$Maybe$map(
										function (tn) {
											return _Utils_update(
												tn,
												{vx: tn.vx + ((x * l) * (1 - bias)), vy: tn.vy + ((y * l) * (1 - bias))});
										}),
									A3(
										elm$core$Dict$update,
										target,
										elm$core$Maybe$map(
											function (sn) {
												return _Utils_update(
													sn,
													{vx: sn.vx - ((x * l) * bias), vy: sn.vy - ((y * l) * bias)});
											}),
										ents));
							} else {
								var otherwise = _n6;
								return ents;
							}
						}),
					entities,
					lnks);
			case 'ManyBody':
				var theta = force.a;
				var entityStrengths = force.b;
				return A4(gampleman$elm_visualization$Force$ManyBody$wrapper, alpha, theta, entityStrengths, entities);
			case 'X':
				var directionalParamidDict = force.a;
				return entities;
			default:
				var directionalParamidDict = force.a;
				return entities;
		}
	});
var gampleman$elm_visualization$Force$tick = F2(
	function (_n0, nodes) {
		var state = _n0.a;
		var updateEntity = function (ent) {
			return _Utils_update(
				ent,
				{vx: ent.vx * state.velocityDecay, vy: ent.vy * state.velocityDecay, x: ent.x + (ent.vx * state.velocityDecay), y: ent.y + (ent.vy * state.velocityDecay)});
		};
		var dictNodes = A3(
			elm$core$List$foldl,
			function (node) {
				return A2(elm$core$Dict$insert, node.id, node);
			},
			elm$core$Dict$empty,
			nodes);
		var alpha = state.alpha + ((state.alphaTarget - state.alpha) * state.alphaDecay);
		var newNodes = A3(
			elm$core$List$foldl,
			gampleman$elm_visualization$Force$applyForce(alpha),
			dictNodes,
			state.forces);
		return _Utils_Tuple2(
			gampleman$elm_visualization$Force$State(
				_Utils_update(
					state,
					{alpha: alpha})),
			A2(
				elm$core$List$map,
				updateEntity,
				elm$core$Dict$values(newNodes)));
	});
var author$project$ForceGraph$tick = function (_n0) {
	var graph = _n0.graph;
	var simulation = _n0.simulation;
	var _n1 = A2(
		gampleman$elm_visualization$Force$tick,
		simulation,
		A2(
			elm$core$List$map,
			function ($) {
				return $.label;
			},
			elm_community$graph$Graph$nodes(graph)));
	var newState = _n1.a;
	var list = _n1.b;
	return {
		graph: A2(author$project$ForceGraph$updateGraphWithList, graph, list),
		simulation: newState
	};
};
var author$project$ForceGraph$computeSimulation = function (fg) {
	computeSimulation:
	while (true) {
		if (author$project$ForceGraph$isCompleted(fg)) {
			return fg;
		} else {
			var $temp$fg = author$project$ForceGraph$tick(fg);
			fg = $temp$fg;
			continue computeSimulation;
		}
	}
};
var elm$core$Basics$abs = function (n) {
	return (n < 0) ? (-n) : n;
};
var elm$random$Random$Generator = function (a) {
	return {$: 'Generator', a: a};
};
var elm$random$Random$Seed = F2(
	function (a, b) {
		return {$: 'Seed', a: a, b: b};
	});
var elm$random$Random$next = function (_n0) {
	var state0 = _n0.a;
	var incr = _n0.b;
	return A2(elm$random$Random$Seed, ((state0 * 1664525) + incr) >>> 0, incr);
};
var elm$random$Random$peel = function (_n0) {
	var state = _n0.a;
	var word = (state ^ (state >>> ((state >>> 28) + 4))) * 277803737;
	return ((word >>> 22) ^ word) >>> 0;
};
var elm$random$Random$float = F2(
	function (a, b) {
		return elm$random$Random$Generator(
			function (seed0) {
				var seed1 = elm$random$Random$next(seed0);
				var range = elm$core$Basics$abs(b - a);
				var n1 = elm$random$Random$peel(seed1);
				var n0 = elm$random$Random$peel(seed0);
				var lo = (134217727 & n1) * 1.0;
				var hi = (67108863 & n0) * 1.0;
				var val = ((hi * 1.34217728e8) + lo) / 9.007199254740992e15;
				var scaled = (val * range) + a;
				return _Utils_Tuple2(
					scaled,
					elm$random$Random$next(seed1));
			});
	});
var elm$random$Random$initialSeed = function (x) {
	var _n0 = elm$random$Random$next(
		A2(elm$random$Random$Seed, 0, 1013904223));
	var state1 = _n0.a;
	var incr = _n0.b;
	var state2 = (state1 + x) >>> 0;
	return elm$random$Random$next(
		A2(elm$random$Random$Seed, state2, incr));
};
var elm$random$Random$step = F2(
	function (_n0, seed) {
		var generator = _n0.a;
		return generator(seed);
	});
var author$project$ForceGraph$node = function (nc) {
	var ncnode = nc.node;
	var canvas = 500;
	var _n0 = A2(
		elm$random$Random$step,
		A2(elm$random$Random$float, 0, canvas),
		elm$random$Random$initialSeed(ncnode.id));
	var x = _n0.a;
	var s2 = _n0.b;
	var _n1 = A2(
		elm$random$Random$step,
		A2(elm$random$Random$float, 0, canvas),
		s2);
	var y = _n1.a;
	var s3 = _n1.b;
	return {
		incoming: nc.incoming,
		node: {
			id: ncnode.id,
			label: {id: ncnode.id, size: ncnode.label.size, value: ncnode.label.value, vx: 0.0, vy: 0.0, x: x, y: y}
		},
		outgoing: nc.outgoing
	};
};
var elm_community$graph$Graph$edges = function (graph) {
	var flippedFoldl = F3(
		function (f, dict, list) {
			return A3(elm_community$intdict$IntDict$foldl, f, list, dict);
		});
	var prependEdges = F2(
		function (node1, ctx) {
			return A2(
				flippedFoldl,
				F2(
					function (node2, e) {
						return elm$core$List$cons(
							{from: node1, label: e, to: node2});
					}),
				ctx.outgoing);
		});
	return A3(
		flippedFoldl,
		prependEdges,
		elm_community$graph$Graph$unGraph(graph),
		_List_Nil);
};
var elm_community$graph$Graph$empty = elm_community$graph$Graph$Graph(elm_community$intdict$IntDict$empty);
var elm_community$graph$Graph$insert = F2(
	function (nodeContext, graph) {
		return A3(
			elm_community$graph$Graph$update,
			nodeContext.node.id,
			elm$core$Basics$always(
				elm$core$Maybe$Just(nodeContext)),
			graph);
	});
var elm_community$graph$Graph$mapContexts = function (f) {
	return A2(
		elm_community$graph$Graph$fold,
		function (ctx) {
			return elm_community$graph$Graph$insert(
				f(ctx));
		},
		elm_community$graph$Graph$empty);
};
var elm_community$graph$Graph$size = A2(elm$core$Basics$composeR, elm_community$graph$Graph$unGraph, elm_community$intdict$IntDict$size);
var gampleman$elm_visualization$Force$Links = F2(
	function (a, b) {
		return {$: 'Links', a: a, b: b};
	});
var gampleman$elm_visualization$Force$customLinks = F2(
	function (iters, list) {
		var counts = A3(
			elm$core$List$foldr,
			F2(
				function (_n1, d) {
					var source = _n1.source;
					var target = _n1.target;
					return A3(
						elm$core$Dict$update,
						target,
						A2(
							elm$core$Basics$composeL,
							A2(
								elm$core$Basics$composeL,
								elm$core$Maybe$Just,
								elm$core$Maybe$withDefault(1)),
							elm$core$Maybe$map(
								elm$core$Basics$add(1))),
						A3(
							elm$core$Dict$update,
							source,
							A2(
								elm$core$Basics$composeL,
								A2(
									elm$core$Basics$composeL,
									elm$core$Maybe$Just,
									elm$core$Maybe$withDefault(1)),
								elm$core$Maybe$map(
									elm$core$Basics$add(1))),
							d));
				}),
			elm$core$Dict$empty,
			list);
		var count = function (key) {
			return A2(
				elm$core$Maybe$withDefault,
				0,
				A2(elm$core$Dict$get, key, counts));
		};
		return A2(
			gampleman$elm_visualization$Force$Links,
			iters,
			A2(
				elm$core$List$map,
				function (_n0) {
					var source = _n0.source;
					var target = _n0.target;
					var distance = _n0.distance;
					var strength = _n0.strength;
					return {
						bias: count(source) / (count(source) + count(target)),
						distance: distance,
						source: source,
						strength: A2(
							elm$core$Maybe$withDefault,
							1 / A2(
								elm$core$Basics$min,
								count(source),
								count(target)),
							strength),
						target: target
					};
				},
				list));
	});
var gampleman$elm_visualization$Force$iterations = F2(
	function (iters, _n0) {
		var config = _n0.a;
		return gampleman$elm_visualization$Force$State(
			_Utils_update(
				config,
				{
					alphaDecay: 1 - A2(elm$core$Basics$pow, config.minAlpha, 1 / iters)
				}));
	});
var elm$core$Dict$fromList = function (assocs) {
	return A3(
		elm$core$List$foldl,
		F2(
			function (_n0, dict) {
				var key = _n0.a;
				var value = _n0.b;
				return A3(elm$core$Dict$insert, key, value, dict);
			}),
		elm$core$Dict$empty,
		assocs);
};
var gampleman$elm_visualization$Force$ManyBody = F2(
	function (a, b) {
		return {$: 'ManyBody', a: a, b: b};
	});
var gampleman$elm_visualization$Force$customManyBody = function (theta) {
	return A2(
		elm$core$Basics$composeR,
		elm$core$Dict$fromList,
		gampleman$elm_visualization$Force$ManyBody(theta));
};
var gampleman$elm_visualization$Force$manyBodyStrength = function (strength) {
	return A2(
		elm$core$Basics$composeL,
		gampleman$elm_visualization$Force$customManyBody(0.9),
		elm$core$List$map(
			function (key) {
				return _Utils_Tuple2(key, strength);
			}));
};
var gampleman$elm_visualization$Force$simulation = function (forces) {
	return gampleman$elm_visualization$Force$State(
		{
			alpha: 1.0,
			alphaDecay: 1 - A2(elm$core$Basics$pow, 1.0e-3, 1 / 300),
			alphaTarget: 0.0,
			forces: forces,
			minAlpha: 1.0e-3,
			velocityDecay: 0.6
		});
};
var author$project$ForceGraph$fromGraph = function (g) {
	var graph = A2(elm_community$graph$Graph$mapContexts, author$project$ForceGraph$node, g);
	var link = function (_n1) {
		var from = _n1.from;
		var to = _n1.to;
		var distance = function () {
			var _n0 = _Utils_Tuple2(
				A2(elm_community$graph$Graph$get, from, graph),
				A2(elm_community$graph$Graph$get, to, graph));
			if ((_n0.a.$ === 'Just') && (_n0.b.$ === 'Just')) {
				var fnc = _n0.a.a;
				var tnc = _n0.b.a;
				return 20 + elm$core$Basics$ceiling(tnc.node.label.size + fnc.node.label.size);
			} else {
				return 0;
			}
		}();
		return {distance: distance, source: from, strength: elm$core$Maybe$Nothing, target: to};
	};
	var size = elm_community$graph$Graph$size(graph);
	var iterations = (size === 1) ? 1 : ((size < 5) ? 50 : (size * 10));
	var forces = _List_fromArray(
		[
			A2(
			gampleman$elm_visualization$Force$customLinks,
			1,
			A2(
				elm$core$List$map,
				link,
				elm_community$graph$Graph$edges(graph))),
			A2(
			gampleman$elm_visualization$Force$manyBodyStrength,
			-200,
			A2(
				elm$core$List$map,
				function ($) {
					return $.id;
				},
				elm_community$graph$Graph$nodes(graph)))
		]);
	var newSimulation = A2(
		gampleman$elm_visualization$Force$iterations,
		iterations,
		gampleman$elm_visualization$Force$simulation(forces));
	return author$project$ForceGraph$computeSimulation(
		{graph: graph, simulation: newSimulation});
};
var elm$core$Bitwise$shiftLeftBy = _Bitwise_shiftLeftBy;
var author$project$Hash$updateHash = F2(
	function (c, h) {
		return ((5 << h) + h) + elm$core$Char$toCode(c);
	});
var elm$core$String$foldl = _String_foldl;
var author$project$Hash$hash = function (str) {
	return A3(elm$core$String$foldl, author$project$Hash$updateHash, 5381, str);
};
var author$project$Main$cardRadiusBase = function (_n0) {
	var incoming = _n0.incoming;
	var outgoing = _n0.outgoing;
	return 20 + ((elm_community$intdict$IntDict$size(incoming) / 2) + (elm_community$intdict$IntDict$size(outgoing) * 2));
};
var elm$core$List$any = F2(
	function (isOkay, list) {
		any:
		while (true) {
			if (!list.b) {
				return false;
			} else {
				var x = list.a;
				var xs = list.b;
				if (isOkay(x)) {
					return true;
				} else {
					var $temp$isOkay = isOkay,
						$temp$list = xs;
					isOkay = $temp$isOkay;
					list = $temp$list;
					continue any;
				}
			}
		}
	});
var elm$core$List$append = F2(
	function (xs, ys) {
		if (!ys.b) {
			return xs;
		} else {
			return A3(elm$core$List$foldr, elm$core$List$cons, ys, xs);
		}
	});
var elm$core$List$concat = function (lists) {
	return A3(elm$core$List$foldr, elm$core$List$append, _List_Nil, lists);
};
var elm$core$List$partition = F2(
	function (pred, list) {
		var step = F2(
			function (x, _n0) {
				var trues = _n0.a;
				var falses = _n0.b;
				return pred(x) ? _Utils_Tuple2(
					A2(elm$core$List$cons, x, trues),
					falses) : _Utils_Tuple2(
					trues,
					A2(elm$core$List$cons, x, falses));
			});
		return A3(
			elm$core$List$foldr,
			step,
			_Utils_Tuple2(_List_Nil, _List_Nil),
			list);
	});
var author$project$Main$subEdges = function () {
	var edgesRelated = function (edge) {
		return elm$core$List$any(
			function (_n3) {
				var from = _n3.from;
				var to = _n3.to;
				return _Utils_eq(from, edge.from) || (_Utils_eq(from, edge.to) || (_Utils_eq(to, edge.from) || _Utils_eq(to, edge.to)));
			});
	};
	var go = F2(
		function (acc, edges) {
			go:
			while (true) {
				if (!edges.b) {
					return acc;
				} else {
					var edge = edges.a;
					var rest = edges.b;
					var _n1 = A2(
						elm$core$List$partition,
						edgesRelated(edge),
						acc);
					var connected = _n1.a;
					var disconnected = _n1.b;
					if (!connected.b) {
						var $temp$acc = A2(
							elm$core$List$cons,
							_List_fromArray(
								[edge]),
							acc),
							$temp$edges = rest;
						acc = $temp$acc;
						edges = $temp$edges;
						continue go;
					} else {
						var $temp$acc = A2(
							elm$core$List$cons,
							A2(
								elm$core$List$cons,
								edge,
								elm$core$List$concat(connected)),
							disconnected),
							$temp$edges = rest;
						acc = $temp$acc;
						edges = $temp$edges;
						continue go;
					}
				}
			}
		});
	return go(_List_Nil);
}();
var elm$core$Set$Set_elm_builtin = function (a) {
	return {$: 'Set_elm_builtin', a: a};
};
var elm$core$Set$empty = elm$core$Set$Set_elm_builtin(elm$core$Dict$empty);
var elm$core$Set$insert = F2(
	function (key, _n0) {
		var dict = _n0.a;
		return elm$core$Set$Set_elm_builtin(
			A3(elm$core$Dict$insert, key, _Utils_Tuple0, dict));
	});
var elm_community$graph$Graph$inducedSubgraph = F2(
	function (nodeIds_, graph) {
		var insertContextById = F2(
			function (nodeId, acc) {
				var _n0 = A2(elm_community$graph$Graph$get, nodeId, graph);
				if (_n0.$ === 'Just') {
					var ctx = _n0.a;
					return A2(elm_community$graph$Graph$insert, ctx, acc);
				} else {
					return acc;
				}
			});
		return A3(elm$core$List$foldl, insertContextById, elm_community$graph$Graph$empty, nodeIds_);
	});
var elm_community$intdict$IntDict$isEmpty = function (dict) {
	if (dict.$ === 'Empty') {
		return true;
	} else {
		return false;
	}
};
var author$project$Main$subGraphs = function (graph) {
	var subEdgeNodes = A2(
		elm$core$List$foldl,
		F2(
			function (edge, set) {
				return A2(
					elm$core$Set$insert,
					edge.from,
					A2(elm$core$Set$insert, edge.to, set));
			}),
		elm$core$Set$empty);
	var singletonGraphs = A3(
		elm_community$graph$Graph$fold,
		F2(
			function (nc, ncs) {
				return (elm_community$intdict$IntDict$isEmpty(nc.incoming) && elm_community$intdict$IntDict$isEmpty(nc.outgoing)) ? A2(
					elm$core$List$cons,
					A2(elm_community$graph$Graph$insert, nc, elm_community$graph$Graph$empty),
					ncs) : ncs;
			}),
		_List_Nil,
		graph);
	var connectedGraphs = A2(
		elm$core$List$map,
		A2(
			elm$core$Basics$composeL,
			A2(
				elm$core$Basics$composeL,
				function (a) {
					return A2(elm_community$graph$Graph$inducedSubgraph, a, graph);
				},
				elm$core$Set$toList),
			subEdgeNodes),
		author$project$Main$subEdges(
			elm_community$graph$Graph$edges(graph)));
	return _Utils_ap(connectedGraphs, singletonGraphs);
};
var elm_community$graph$Graph$Node = F2(
	function (id, label) {
		return {id: id, label: label};
	});
var elm_community$graph$Graph$NodeContext = F3(
	function (node, incoming, outgoing) {
		return {incoming: incoming, node: node, outgoing: outgoing};
	});
var elm_community$graph$Graph$fromNodesAndEdges = F2(
	function (nodes_, edges_) {
		var nodeRep = A3(
			elm$core$List$foldl,
			function (n) {
				return A2(
					elm_community$intdict$IntDict$insert,
					n.id,
					A3(elm_community$graph$Graph$NodeContext, n, elm_community$intdict$IntDict$empty, elm_community$intdict$IntDict$empty));
			},
			elm_community$intdict$IntDict$empty,
			nodes_);
		var addEdge = F2(
			function (edge, rep) {
				var updateOutgoing = function (ctx) {
					return _Utils_update(
						ctx,
						{
							outgoing: A3(elm_community$intdict$IntDict$insert, edge.to, edge.label, ctx.outgoing)
						});
				};
				var updateIncoming = function (ctx) {
					return _Utils_update(
						ctx,
						{
							incoming: A3(elm_community$intdict$IntDict$insert, edge.from, edge.label, ctx.incoming)
						});
				};
				return A3(
					elm_community$intdict$IntDict$update,
					edge.to,
					elm$core$Maybe$map(updateIncoming),
					A3(
						elm_community$intdict$IntDict$update,
						edge.from,
						elm$core$Maybe$map(updateOutgoing),
						rep));
			});
		var addEdgeIfValid = F2(
			function (edge, rep) {
				return (A2(elm_community$intdict$IntDict$member, edge.from, rep) && A2(elm_community$intdict$IntDict$member, edge.to, rep)) ? A2(addEdge, edge, rep) : rep;
			});
		return elm_community$graph$Graph$Graph(
			A3(elm$core$List$foldl, addEdgeIfValid, nodeRep, edges_));
	});
var author$project$Main$computeGraph = F2(
	function (cardIds, references) {
		var node = F2(
			function (cardId, context) {
				return {
					size: author$project$Main$cardRadiusBase(context),
					value: cardId
				};
			});
		var cardNodeThunks = A2(
			elm$core$List$map,
			function (cardId) {
				return A2(
					elm_community$graph$Graph$Node,
					author$project$Hash$hash(cardId),
					node(cardId));
			},
			cardIds);
		var cardEdges = A3(
			elm$core$List$foldl,
			F2(
				function (_n0, refs) {
					var idStr = _n0.a;
					var sourceIds = _n0.b;
					var id = author$project$Hash$hash(idStr);
					return _Utils_ap(
						A2(
							elm$core$List$map,
							function (sourceId) {
								return {
									from: author$project$Hash$hash(sourceId),
									label: _Utils_Tuple0,
									to: id
								};
							},
							sourceIds),
						refs);
				}),
			_List_Nil,
			references);
		var applyWithContext = function (nc) {
			return {
				incoming: nc.incoming,
				node: {
					id: nc.node.id,
					label: nc.node.label(
						{incoming: nc.incoming, outgoing: nc.outgoing})
				},
				outgoing: nc.outgoing
			};
		};
		var graph = A2(
			elm_community$graph$Graph$mapContexts,
			applyWithContext,
			A2(elm_community$graph$Graph$fromNodesAndEdges, cardNodeThunks, cardEdges));
		return A2(
			elm$core$List$map,
			author$project$ForceGraph$fromGraph,
			author$project$Main$subGraphs(graph));
	});
var elm$json$Json$Decode$field = _Json_decodeField;
var elm$json$Json$Decode$at = F2(
	function (fields, decoder) {
		return A3(elm$core$List$foldr, elm$json$Json$Decode$field, decoder, fields);
	});
var elm$json$Json$Decode$int = _Json_decodeInt;
var elm$json$Json$Decode$map2 = _Json_map2;
var elm$json$Json$Decode$map = _Json_map1;
var elm$json$Json$Decode$oneOf = _Json_oneOf;
var elm$json$Json$Decode$succeed = _Json_succeed;
var elm$json$Json$Decode$maybe = function (decoder) {
	return elm$json$Json$Decode$oneOf(
		_List_fromArray(
			[
				A2(elm$json$Json$Decode$map, elm$core$Maybe$Just, decoder),
				elm$json$Json$Decode$succeed(elm$core$Maybe$Nothing)
			]));
};
var author$project$Main$decodeAffectedColumnIds = A3(
	elm$json$Json$Decode$map2,
	F2(
		function (id, from) {
			if (from.$ === 'Nothing') {
				return _List_fromArray(
					[id]);
			} else {
				var fromId = from.a;
				return _List_fromArray(
					[id, fromId]);
			}
		}),
	A2(
		elm$json$Json$Decode$at,
		_List_fromArray(
			['project_card', 'column_id']),
		elm$json$Json$Decode$int),
	elm$json$Json$Decode$maybe(
		A2(
			elm$json$Json$Decode$at,
			_List_fromArray(
				['changes', 'column_id', 'from']),
			elm$json$Json$Decode$int)));
var author$project$GitHubGraph$IssueOrPRSelector = F3(
	function (owner, repo, number) {
		return {number: number, owner: owner, repo: repo};
	});
var elm$json$Json$Decode$string = _Json_decodeString;
var elm_community$json_extra$Json$Decode$Extra$andMap = elm$json$Json$Decode$map2(elm$core$Basics$apR);
var author$project$Main$decodeIssueOrPRSelector = function (field) {
	return A2(
		elm_community$json_extra$Json$Decode$Extra$andMap,
		A2(
			elm$json$Json$Decode$at,
			_List_fromArray(
				[field, 'number']),
			elm$json$Json$Decode$int),
		A2(
			elm_community$json_extra$Json$Decode$Extra$andMap,
			A2(
				elm$json$Json$Decode$at,
				_List_fromArray(
					['repository', 'name']),
				elm$json$Json$Decode$string),
			A2(
				elm_community$json_extra$Json$Decode$Extra$andMap,
				A2(
					elm$json$Json$Decode$at,
					_List_fromArray(
						['repository', 'owner', 'login']),
					elm$json$Json$Decode$string),
				elm$json$Json$Decode$succeed(author$project$GitHubGraph$IssueOrPRSelector))));
};
var elm$json$Json$Decode$decodeValue = _Json_run;
var author$project$Main$decodeAndFetchIssueOrPR = F4(
	function (field, payload, fetch, model) {
		var _n0 = A2(
			elm$json$Json$Decode$decodeValue,
			author$project$Main$decodeIssueOrPRSelector(field),
			payload);
		if (_n0.$ === 'Ok') {
			var sel = _n0.a;
			return _Utils_update(
				model,
				{
					loadQueue: A2(
						elm$core$List$cons,
						A2(fetch, model, sel),
						model.loadQueue)
				});
		} else {
			var err = _n0.a;
			return A3(
				author$project$Log$debug,
				'failed to decode issue or PR',
				_Utils_Tuple3(err, field, payload),
				model);
		}
	});
var author$project$GitHubGraph$auth = function (token) {
	return (token === '') ? _List_Nil : _List_fromArray(
		[
			_Utils_Tuple2('Authorization', 'token ' + token)
		]);
};
var elm$http$Http$Internal$Header = F2(
	function (a, b) {
		return {$: 'Header', a: a, b: b};
	});
var elm$http$Http$header = elm$http$Http$Internal$Header;
var author$project$GitHubGraph$authHeaders = A2(
	elm$core$Basics$composeL,
	elm$core$List$map(
		function (_n0) {
			var a = _n0.a;
			var b = _n0.b;
			return A2(elm$http$Http$header, a, b);
		}),
	author$project$GitHubGraph$auth);
var author$project$GitHubGraph$authedOptions = function (token) {
	return {
		headers: author$project$GitHubGraph$authHeaders(token),
		method: 'POST',
		timeout: elm$core$Maybe$Nothing,
		url: 'https://api.github.com/graphql',
		withCredentials: false
	};
};
var elm$json$Json$Decode$andThen = _Json_andThen;
var elm$json$Json$Decode$fail = _Json_fail;
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$SelectionSpec = F4(
	function (a, b, c, d) {
		return {$: 'SelectionSpec', a: a, b: b, c: c, d: d};
	});
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$assume = function (_n0) {
	var ast = _n0.a;
	var decoder = _n0.b;
	var vars = _n0.c;
	var fragments = _n0.d;
	return A4(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$SelectionSpec,
		ast,
		A2(
			elm$core$Basics$composeR,
			decoder,
			elm$json$Json$Decode$andThen(
				function (maybeValue) {
					if (maybeValue.$ === 'Just') {
						var value = maybeValue.a;
						return elm$json$Json$Decode$succeed(value);
					} else {
						return elm$json$Json$Decode$fail('Expected a selection to be present in the response with `assume`, but found `Nothing`');
					}
				})),
		vars,
		fragments);
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$ObjectType = {$: 'ObjectType'};
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$SpecifiedType = function (a) {
	return {$: 'SpecifiedType', a: a};
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$ValueSpec = F4(
	function (a, b, c, d) {
		return {$: 'ValueSpec', a: a, b: b, c: c, d: d};
	});
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$NonNullFlag = {$: 'NonNullFlag'};
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$nonNullFlag = jamesmacaulay$elm_graphql$GraphQL$Request$Builder$NonNullFlag;
var jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Util$responseKey = function (fieldInfo) {
	var _n0 = fieldInfo.alias;
	if (_n0.$ === 'Nothing') {
		return fieldInfo.name;
	} else {
		var alias = _n0.a;
		return alias;
	}
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$selectionDecoder = F2(
	function (selectionAST, decoder) {
		if (selectionAST.$ === 'Field') {
			var fieldInfo = selectionAST.a;
			return A2(
				elm$core$Basics$composeL,
				elm$json$Json$Decode$field(
					jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Util$responseKey(fieldInfo)),
				decoder);
		} else {
			return decoder;
		}
	});
var jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$SelectionSet = function (a) {
	return {$: 'SelectionSet', a: a};
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$extract = function (_n0) {
	var selectionAST = _n0.a;
	var decoder = _n0.b;
	var vars = _n0.c;
	var fragments = _n0.d;
	return A4(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$ValueSpec,
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$SpecifiedType(
			{
				coreType: jamesmacaulay$elm_graphql$GraphQL$Request$Builder$ObjectType,
				join: elm$core$Basics$always,
				nullability: jamesmacaulay$elm_graphql$GraphQL$Request$Builder$nonNullFlag,
				selectionSet: jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$SelectionSet(
					_List_fromArray(
						[selectionAST]))
			}),
		A2(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$selectionDecoder, selectionAST, decoder),
		vars,
		fragments);
};
var elm$core$Tuple$mapSecond = F2(
	function (func, _n0) {
		var x = _n0.a;
		var y = _n0.b;
		return _Utils_Tuple2(
			x,
			func(y));
	});
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$getAST = function (_n0) {
	var ast = _n0.a;
	return ast;
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$argumentsAST = elm$core$List$map(
	elm$core$Tuple$mapSecond(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$getAST));
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$emptySelectionSet = jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$SelectionSet(_List_Nil);
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$selectionSetFromSourceType = function (sourceType) {
	if (sourceType.$ === 'SpecifiedType') {
		var selectionSet = sourceType.a.selectionSet;
		return selectionSet;
	} else {
		return jamesmacaulay$elm_graphql$GraphQL$Request$Builder$emptySelectionSet;
	}
};
var elm$core$Tuple$second = function (_n0) {
	var y = _n0.b;
	return y;
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$getVariables = function (_n0) {
	var vars = _n0.b;
	return vars;
};
var elm$core$List$filter = F2(
	function (isGood, list) {
		return A3(
			elm$core$List$foldr,
			F2(
				function (x, xs) {
					return isGood(x) ? A2(elm$core$List$cons, x, xs) : xs;
				}),
			_List_Nil,
			list);
	});
var jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$VariableDefinition = function (a) {
	return {$: 'VariableDefinition', a: a};
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$toDefinitionAST = function (_var) {
	if (_var.$ === 'RequiredVariable') {
		var variableName = _var.a;
		var typeRef = _var.b;
		return jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$VariableDefinition(
			{defaultValue: elm$core$Maybe$Nothing, name: variableName, variableType: typeRef});
	} else {
		var variableName = _var.a;
		var typeRef = _var.b;
		var defaultValue = _var.d;
		return jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$VariableDefinition(
			{
				defaultValue: elm$core$Maybe$Just(defaultValue),
				name: variableName,
				variableType: typeRef
			});
	}
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$Util$variableIsNotInList = F2(
	function (existingVars, thisVar) {
		var thisVarAST = jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$toDefinitionAST(thisVar);
		var sameASTAsThisVar = function (_var) {
			return _Utils_eq(
				jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$toDefinitionAST(_var),
				thisVarAST);
		};
		return !A2(elm$core$List$any, sameASTAsThisVar, existingVars);
	});
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$Util$mergeVariables = F2(
	function (varsA, varsB) {
		return _Utils_ap(
			varsA,
			A2(
				elm$core$List$filter,
				jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$Util$variableIsNotInList(varsA),
				varsB));
	});
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$varsFromArguments = function (_arguments) {
	return A3(
		elm$core$List$foldr,
		A2(
			elm$core$Basics$composeR,
			elm$core$Tuple$second,
			A2(elm$core$Basics$composeR, jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$getVariables, jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$Util$mergeVariables)),
		_List_Nil,
		_arguments);
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Field = function (a) {
	return {$: 'Field', a: a};
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field = F3(
	function (name, _arguments, _n0) {
		var sourceType = _n0.a;
		var decoder = _n0.b;
		var fieldVars = _n0.c;
		var fragments = _n0.d;
		var vars = A2(
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$Util$mergeVariables,
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$varsFromArguments(_arguments),
			fieldVars);
		var astFieldInfo = {
			alias: elm$core$Maybe$Nothing,
			_arguments: jamesmacaulay$elm_graphql$GraphQL$Request$Builder$argumentsAST(_arguments),
			directives: _List_Nil,
			name: name,
			selectionSet: jamesmacaulay$elm_graphql$GraphQL$Request$Builder$selectionSetFromSourceType(sourceType)
		};
		return A4(
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$SelectionSpec,
			jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Field(astFieldInfo),
			decoder,
			vars,
			fragments);
	});
var jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$InlineFragment = function (a) {
	return {$: 'InlineFragment', a: a};
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$inlineFragment = F2(
	function (maybeTypeCondition, spec) {
		var _n0 = spec;
		var sourceType = _n0.a;
		var decoder = _n0.b;
		var vars = _n0.c;
		var fragments = _n0.d;
		var astInlineFragmentInfo = {
			directives: _List_Nil,
			selectionSet: jamesmacaulay$elm_graphql$GraphQL$Request$Builder$selectionSetFromSourceType(sourceType),
			typeCondition: maybeTypeCondition
		};
		return A4(
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$SelectionSpec,
			jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$InlineFragment(astInlineFragmentInfo),
			A2(elm$core$Basics$composeL, elm$json$Json$Decode$maybe, decoder),
			vars,
			fragments);
	});
var jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$TypeCondition = function (a) {
	return {$: 'TypeCondition', a: a};
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$onType = jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$TypeCondition;
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Operation = function (a) {
	return {$: 'Operation', a: a};
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Document = function (a) {
	return {$: 'Document', a: a};
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$fragmentDefinitionsFromOperation = function (_n0) {
	var spec = _n0.a.spec;
	var _n1 = spec;
	var fragments = _n1.d;
	return fragments;
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Directive = function (a) {
	return {$: 'Directive', a: a};
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$directiveAST = function (_n0) {
	var name = _n0.a;
	var _arguments = _n0.b;
	return jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Directive(
		{
			_arguments: jamesmacaulay$elm_graphql$GraphQL$Request$Builder$argumentsAST(_arguments),
			name: name
		});
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Mutation = {$: 'Mutation'};
var jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Query = {$: 'Query'};
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$operationTypeAST = function (operationType) {
	if (operationType.$ === 'QueryOperationType') {
		return jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Query;
	} else {
		return jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Mutation;
	}
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$selectionSetFromSpec = function (_n0) {
	var sourceType = _n0.a;
	return jamesmacaulay$elm_graphql$GraphQL$Request$Builder$selectionSetFromSourceType(sourceType);
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$variableDefinitionsAST = function (_n0) {
	var vars = _n0.c;
	return A2(elm$core$List$map, jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$toDefinitionAST, vars);
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$operationAST = function (_n0) {
	var operationType = _n0.a.operationType;
	var name = _n0.a.name;
	var directives = _n0.a.directives;
	var spec = _n0.a.spec;
	return {
		directives: A2(elm$core$List$map, jamesmacaulay$elm_graphql$GraphQL$Request$Builder$directiveAST, directives),
		name: name,
		operationType: jamesmacaulay$elm_graphql$GraphQL$Request$Builder$operationTypeAST(operationType),
		selectionSet: jamesmacaulay$elm_graphql$GraphQL$Request$Builder$selectionSetFromSpec(spec),
		variableDefinitions: jamesmacaulay$elm_graphql$GraphQL$Request$Builder$variableDefinitionsAST(spec)
	};
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Document = function (a) {
	return {$: 'Document', a: a};
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$FragmentDefinition = function (a) {
	return {$: 'FragmentDefinition', a: a};
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$OperationDefinition = function (a) {
	return {$: 'OperationDefinition', a: a};
};
var elm$core$List$isEmpty = function (xs) {
	if (!xs.b) {
		return true;
	} else {
		return false;
	}
};
var elm$core$String$fromFloat = _String_fromNumber;
var jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeKeyValuePair = function (_n1) {
	var key = _n1.a;
	var value = _n1.b;
	return key + (': ' + jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeValue(value));
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeValue = function (value) {
	switch (value.$) {
		case 'VariableValue':
			var name = value.b;
			return '$' + name;
		case 'IntValue':
			var _int = value.a;
			return elm$core$String$fromInt(_int);
		case 'FloatValue':
			var _float = value.a;
			return elm$core$String$fromFloat(_float);
		case 'StringValue':
			var string = value.a;
			return A2(
				elm$json$Json$Encode$encode,
				0,
				elm$json$Json$Encode$string(string));
		case 'BooleanValue':
			if (value.a) {
				return 'true';
			} else {
				return 'false';
			}
		case 'NullValue':
			return 'null';
		case 'EnumValue':
			var symbol = value.a;
			return symbol;
		case 'ListValue':
			var values = value.a;
			return '[' + (A2(
				elm$core$String$join,
				', ',
				A2(elm$core$List$map, jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeValue, values)) + ']');
		default:
			var pairs = value.a;
			return '{' + (A2(
				elm$core$String$join,
				', ',
				A2(elm$core$List$map, jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeKeyValuePair, pairs)) + '}');
	}
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeArgList = function (args) {
	return elm$core$List$isEmpty(args) ? _List_Nil : _List_fromArray(
		[
			'(' + (A2(
			elm$core$String$join,
			', ',
			A2(elm$core$List$map, jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeKeyValuePair, args)) + ')')
		]);
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeDirectiveName = function (name) {
	return '@' + name;
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeDirective = function (_n0) {
	var name = _n0.a.name;
	var _arguments = _n0.a._arguments;
	return A2(
		elm$core$String$join,
		'',
		A2(
			elm$core$List$cons,
			jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeDirectiveName(name),
			jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeArgList(_arguments)));
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$indent = F2(
	function (level, string) {
		return (level <= 0) ? string : ('  ' + A2(jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$indent, level - 1, string));
	});
var jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$listFromMaybe = function (m) {
	if (m.$ === 'Nothing') {
		return _List_Nil;
	} else {
		var x = m.a;
		return _List_fromArray(
			[x]);
	}
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeFieldAlias = function (alias) {
	return alias + ':';
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeFragmentSpreadName = function (name) {
	return '...' + name;
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeFragmentSpread = F2(
	function (indentLevel, _n0) {
		var name = _n0.name;
		var directives = _n0.directives;
		return A2(
			jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$indent,
			indentLevel,
			A2(
				elm$core$String$join,
				' ',
				A2(
					elm$core$List$cons,
					jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeFragmentSpreadName(name),
					A2(elm$core$List$map, jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeDirective, directives))));
	});
var jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeTypeCondition = function (_n0) {
	var namedType = _n0.a;
	return 'on ' + namedType;
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeField = F2(
	function (indentLevel, field) {
		return A2(
			jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$indent,
			indentLevel,
			A2(
				elm$core$String$join,
				' ',
				elm$core$List$concat(
					_List_fromArray(
						[
							jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$listFromMaybe(
							A2(elm$core$Maybe$map, jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeFieldAlias, field.alias)),
							_List_fromArray(
							[
								A2(
								elm$core$String$join,
								'',
								A2(
									elm$core$List$cons,
									field.name,
									jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeArgList(field._arguments)))
							]),
							A2(elm$core$List$map, jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeDirective, field.directives),
							A2(jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeSelectionSet, indentLevel, field.selectionSet)
						]))));
	});
var jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeInlineFragment = F2(
	function (indentLevel, _n2) {
		var typeCondition = _n2.typeCondition;
		var directives = _n2.directives;
		var selectionSet = _n2.selectionSet;
		return A2(
			jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$indent,
			indentLevel,
			A2(
				elm$core$String$join,
				' ',
				elm$core$List$concat(
					_List_fromArray(
						[
							A2(
							elm$core$List$cons,
							'...',
							jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$listFromMaybe(
								A2(elm$core$Maybe$map, jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeTypeCondition, typeCondition))),
							A2(elm$core$List$map, jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeDirective, directives),
							A2(jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeSelectionSet, indentLevel, selectionSet)
						]))));
	});
var jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeSelection = F2(
	function (indentLevel, selection) {
		switch (selection.$) {
			case 'Field':
				var field = selection.a;
				return A2(jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeField, indentLevel, field);
			case 'FragmentSpread':
				var fragmentSpread = selection.a;
				return A2(jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeFragmentSpread, indentLevel, fragmentSpread);
			default:
				var inlineFragment = selection.a;
				return A2(jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeInlineFragment, indentLevel, inlineFragment);
		}
	});
var jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeSelectionSet = F2(
	function (indentLevel, _n0) {
		var selections = _n0.a;
		return elm$core$List$isEmpty(selections) ? _List_Nil : _List_fromArray(
			[
				'{\n' + (A2(
				elm$core$String$join,
				'\n',
				A2(
					elm$core$List$map,
					jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeSelection(indentLevel + 1),
					selections)) + ('\n' + A2(jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$indent, indentLevel, '}')))
			]);
	});
var jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeFragmentDefinition = function (_n0) {
	var name = _n0.name;
	var typeCondition = _n0.typeCondition;
	var directives = _n0.directives;
	var selectionSet = _n0.selectionSet;
	return A2(
		elm$core$String$join,
		' ',
		elm$core$List$concat(
			_List_fromArray(
				[
					_List_fromArray(
					[
						'fragment',
						name,
						jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeTypeCondition(typeCondition)
					]),
					A2(elm$core$List$map, jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeDirective, directives),
					A2(jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeSelectionSet, 0, selectionSet)
				])));
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeOperationType = function (opType) {
	if (opType.$ === 'Query') {
		return 'query';
	} else {
		return 'mutation';
	}
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeDefaultValue = function (value) {
	return '= ' + jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeValue(value);
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeNullability = function (nullability) {
	if (nullability.$ === 'Nullable') {
		return '';
	} else {
		return '!';
	}
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeCoreTypeRef = function (coreTypeRef) {
	if (coreTypeRef.$ === 'NamedTypeRef') {
		var name = coreTypeRef.a;
		return name;
	} else {
		var typeRef = coreTypeRef.a;
		return '[' + (jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeTypeRef(typeRef) + ']');
	}
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeTypeRef = function (_n0) {
	var nullability = _n0.a;
	var coreTypeRef = _n0.b;
	return _Utils_ap(
		jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeCoreTypeRef(coreTypeRef),
		jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeNullability(nullability));
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeVariableName = function (name) {
	return '$' + name;
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeVariableDefinition = function (_n0) {
	var info = _n0.a;
	return A2(
		elm$core$String$join,
		' ',
		elm$core$List$concat(
			_List_fromArray(
				[
					_List_fromArray(
					[
						jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeVariableName(info.name) + ':',
						jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeTypeRef(info.variableType)
					]),
					jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$listFromMaybe(
					A2(elm$core$Maybe$map, jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeDefaultValue, info.defaultValue))
				])));
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeVariableDefinitions = function (defs) {
	return elm$core$List$isEmpty(defs) ? _List_Nil : _List_fromArray(
		[
			'(' + (A2(
			elm$core$String$join,
			', ',
			A2(elm$core$List$map, jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeVariableDefinition, defs)) + ')')
		]);
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeOperation = function (info) {
	return A2(
		elm$core$String$join,
		' ',
		elm$core$List$concat(
			_List_fromArray(
				[
					_List_fromArray(
					[
						jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeOperationType(info.operationType)
					]),
					jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$listFromMaybe(info.name),
					jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeVariableDefinitions(info.variableDefinitions),
					A2(elm$core$List$map, jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeDirective, info.directives),
					A2(jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeSelectionSet, 0, info.selectionSet)
				])));
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeDefinition = function (definition) {
	switch (definition.$) {
		case 'OperationDefinition':
			var operationInfo = definition.a;
			return jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeOperation(operationInfo);
		case 'QueryShorthand':
			var selectionSet = definition.a;
			return A2(
				elm$core$String$join,
				'',
				A2(jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeSelectionSet, 0, selectionSet));
		default:
			var fragmentInfo = definition.a;
			return jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeFragmentDefinition(fragmentInfo);
	}
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeDocument = function (_n0) {
	var definitions = _n0.a;
	return A2(
		elm$core$String$join,
		'\n\n',
		A2(elm$core$List$map, jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeDefinition, definitions));
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$document = function (operation) {
	var fragmentDefinitions = jamesmacaulay$elm_graphql$GraphQL$Request$Builder$fragmentDefinitionsFromOperation(operation);
	var ast = jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Document(
		_Utils_ap(
			A2(elm$core$List$map, jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$FragmentDefinition, fragmentDefinitions),
			_List_fromArray(
				[
					jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$OperationDefinition(
					jamesmacaulay$elm_graphql$GraphQL$Request$Builder$operationAST(operation))
				])));
	return jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Document(
		{
			ast: ast,
			operation: operation,
			serialized: jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeDocument(ast)
		});
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$QueryOperationType = {$: 'QueryOperationType'};
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$queryOperationType = jamesmacaulay$elm_graphql$GraphQL$Request$Builder$QueryOperationType;
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$queryDocument = function (spec) {
	return jamesmacaulay$elm_graphql$GraphQL$Request$Builder$document(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Operation(
			{directives: _List_Nil, name: elm$core$Maybe$Nothing, operationType: jamesmacaulay$elm_graphql$GraphQL$Request$Builder$queryOperationType, spec: spec}));
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$Value = F2(
	function (a, b) {
		return {$: 'Value', a: a, b: b};
	});
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$name = function (_var) {
	if (_var.$ === 'RequiredVariable') {
		var variableName = _var.a;
		return variableName;
	} else {
		var variableName = _var.a;
		return variableName;
	}
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$VariableValue = F2(
	function (a, b) {
		return {$: 'VariableValue', a: a, b: b};
	});
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$variable = function (_var) {
	return A2(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$Value,
		A2(
			jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$VariableValue,
			_Utils_Tuple0,
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$name(_var)),
		_List_fromArray(
			[_var]));
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$NamedTypeRef = function (a) {
	return {$: 'NamedTypeRef', a: a};
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$NonNull = {$: 'NonNull'};
var jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$TypeRef = F2(
	function (a, b) {
		return {$: 'TypeRef', a: a, b: b};
	});
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$TypeRef$namedType = A2(
	elm$core$Basics$composeL,
	jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$TypeRef(jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$NonNull),
	jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$NamedTypeRef);
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$TypeRef$id = jamesmacaulay$elm_graphql$GraphQL$Request$Builder$TypeRef$namedType('ID');
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$NonNull = {$: 'NonNull'};
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$VariableSpec = F3(
	function (a, b, c) {
		return {$: 'VariableSpec', a: a, b: b, c: c};
	});
var jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$StringValue = function (a) {
	return {$: 'StringValue', a: a};
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$id = A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$VariableSpec, jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$NonNull, jamesmacaulay$elm_graphql$GraphQL$Request$Builder$TypeRef$id, jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$StringValue);
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$RequiredVariable = F3(
	function (a, b, c) {
		return {$: 'RequiredVariable', a: a, b: b, c: c};
	});
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$required = F3(
	function (variableName, extract, _n0) {
		var typeRef = _n0.b;
		var convert = _n0.c;
		return A3(
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$RequiredVariable,
			variableName,
			typeRef,
			A2(elm$core$Basics$composeR, extract, convert));
	});
var author$project$GitHubGraph$objectQuery = F2(
	function (t, obj) {
		var idVar = A3(
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$required,
			'id',
			function ($) {
				return $.id;
			},
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$id);
		var queryRoot = jamesmacaulay$elm_graphql$GraphQL$Request$Builder$extract(
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$assume(
				A3(
					jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
					'node',
					_List_fromArray(
						[
							_Utils_Tuple2(
							'id',
							jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$variable(idVar))
						]),
					jamesmacaulay$elm_graphql$GraphQL$Request$Builder$extract(
						A2(
							jamesmacaulay$elm_graphql$GraphQL$Request$Builder$inlineFragment,
							elm$core$Maybe$Just(
								jamesmacaulay$elm_graphql$GraphQL$Request$Builder$onType(t)),
							obj)))));
		return jamesmacaulay$elm_graphql$GraphQL$Request$Builder$queryDocument(queryRoot);
	});
var author$project$GitHubGraph$DateType = {$: 'DateType'};
var author$project$GitHubGraph$PullRequest = function (id) {
	return function (url) {
		return function (createdAt) {
			return function (updatedAt) {
				return function (state) {
					return function (repo) {
						return function (number) {
							return function (title) {
								return function (commentCount) {
									return function (reactions) {
										return function (author) {
											return function (labels) {
												return function (cards) {
													return function (additions) {
														return function (deletions) {
															return function (milestone) {
																return function (mergeable) {
																	return function (lastCommit) {
																		return function (mergeCommit) {
																			return {additions: additions, author: author, cards: cards, commentCount: commentCount, createdAt: createdAt, deletions: deletions, id: id, labels: labels, lastCommit: lastCommit, mergeCommit: mergeCommit, mergeable: mergeable, milestone: milestone, number: number, reactions: reactions, repo: repo, state: state, title: title, updatedAt: updatedAt, url: url};
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
				};
			};
		};
	};
};
var author$project$GitHubGraph$pickEnum2 = F2(
	function (ma, mb) {
		if (ma.$ === 'Just') {
			var x = ma.a;
			return elm$core$Maybe$Just(x);
		} else {
			return mb;
		}
	});
var author$project$GitHubGraph$User = F5(
	function (id, databaseId, url, login, avatar) {
		return {avatar: avatar, databaseId: databaseId, id: id, login: login, url: url};
	});
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$IntType = {$: 'IntType'};
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$primitiveSpec = F2(
	function (coreType, decoder) {
		return A4(
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$ValueSpec,
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$SpecifiedType(
				{coreType: coreType, join: elm$core$Basics$always, nullability: jamesmacaulay$elm_graphql$GraphQL$Request$Builder$nonNullFlag, selectionSet: jamesmacaulay$elm_graphql$GraphQL$Request$Builder$emptySelectionSet}),
			elm$core$Basics$always(decoder),
			_List_Nil,
			_List_Nil);
	});
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$int = A2(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$primitiveSpec, jamesmacaulay$elm_graphql$GraphQL$Request$Builder$IntType, elm$json$Json$Decode$int);
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$emptyObjectSpecifiedType = jamesmacaulay$elm_graphql$GraphQL$Request$Builder$SpecifiedType(
	{coreType: jamesmacaulay$elm_graphql$GraphQL$Request$Builder$ObjectType, join: elm$core$Basics$always, nullability: jamesmacaulay$elm_graphql$GraphQL$Request$Builder$nonNullFlag, selectionSet: jamesmacaulay$elm_graphql$GraphQL$Request$Builder$emptySelectionSet});
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$object = function (ctr) {
	return A4(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$ValueSpec,
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$emptyObjectSpecifiedType,
		elm$core$Basics$always(
			elm$json$Json$Decode$succeed(ctr)),
		_List_Nil,
		_List_Nil);
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$StringType = {$: 'StringType'};
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string = A2(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$primitiveSpec, jamesmacaulay$elm_graphql$GraphQL$Request$Builder$StringType, elm$json$Json$Decode$string);
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$mergeSelectionSets = F2(
	function (_n0, _n1) {
		var selectionsA = _n0.a;
		var selectionsB = _n1.a;
		return jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$SelectionSet(
			_Utils_ap(selectionsA, selectionsB));
	});
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$join = F2(
	function (a, b) {
		var _n0 = _Utils_Tuple2(a, b);
		if (_n0.a.$ === 'SpecifiedType') {
			if (_n0.b.$ === 'SpecifiedType') {
				var typeInfoA = _n0.a.a;
				var typeInfoB = _n0.b.a;
				return jamesmacaulay$elm_graphql$GraphQL$Request$Builder$SpecifiedType(
					_Utils_update(
						typeInfoA,
						{
							coreType: A2(typeInfoA.join, typeInfoA.coreType, typeInfoB.coreType),
							selectionSet: A2(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$mergeSelectionSets, typeInfoA.selectionSet, typeInfoB.selectionSet)
						}));
			} else {
				var _n2 = _n0.b;
				return a;
			}
		} else {
			var _n1 = _n0.a;
			return b;
		}
	});
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$mergeFragments = F2(
	function (fragmentsA, fragmentsB) {
		return _Utils_ap(
			fragmentsA,
			A2(
				elm$core$List$filter,
				function (fragmentItem) {
					return !A2(
						elm$core$List$any,
						elm$core$Basics$eq(fragmentItem),
						fragmentsA);
				},
				fragmentsB));
	});
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$map2 = F3(
	function (f, _n0, _n1) {
		var sourceTypeA = _n0.a;
		var decoderA = _n0.b;
		var varsA = _n0.c;
		var fragmentsA = _n0.d;
		var sourceTypeB = _n1.a;
		var decoderB = _n1.b;
		var varsB = _n1.c;
		var fragmentsB = _n1.d;
		var mergedVariables = A2(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$Util$mergeVariables, varsA, varsB);
		var mergedFragments = A2(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$mergeFragments, fragmentsA, fragmentsB);
		var joinedSourceType = A2(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$join, sourceTypeA, sourceTypeB);
		var joinedDecoder = function (selectionSet) {
			return A3(
				elm$json$Json$Decode$map2,
				f,
				decoderA(selectionSet),
				decoderB(selectionSet));
		};
		return A4(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$ValueSpec, joinedSourceType, joinedDecoder, mergedVariables, mergedFragments);
	});
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with = F2(
	function (selection, objectSpec) {
		return A3(
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$map2,
			elm$core$Basics$apL,
			objectSpec,
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$extract(selection));
	});
var author$project$GitHubGraph$userObject = A2(
	jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
	A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'avatarUrl', _List_Nil, jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string),
	A2(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
		A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'login', _List_Nil, jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string),
		A2(
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
			A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'url', _List_Nil, jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string),
			A2(
				jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
				A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'databaseId', _List_Nil, jamesmacaulay$elm_graphql$GraphQL$Request$Builder$int),
				A2(
					jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
					A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'id', _List_Nil, jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string),
					jamesmacaulay$elm_graphql$GraphQL$Request$Builder$object(author$project$GitHubGraph$User))))));
var author$project$GitHubGraph$authorObject = A2(
	jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
	A2(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$inlineFragment,
		elm$core$Maybe$Just(
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$onType('Bot')),
		author$project$GitHubGraph$userObject),
	A2(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
		A2(
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$inlineFragment,
			elm$core$Maybe$Just(
				jamesmacaulay$elm_graphql$GraphQL$Request$Builder$onType('User')),
			author$project$GitHubGraph$userObject),
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$object(author$project$GitHubGraph$pickEnum2)));
var author$project$GitHubGraph$Commit = F6(
	function (sha, status, author, committer, authoredAt, committedAt) {
		return {author: author, authoredAt: authoredAt, committedAt: committedAt, committer: committer, sha: sha, status: status};
	});
var author$project$GitHubGraph$GitActor = F4(
	function (email, name, avatar, user) {
		return {avatar: avatar, email: email, name: name, user: user};
	});
var elm$json$Json$Decode$null = _Json_decodeNull;
var elm$json$Json$Decode$nullable = function (decoder) {
	return elm$json$Json$Decode$oneOf(
		_List_fromArray(
			[
				elm$json$Json$Decode$null(elm$core$Maybe$Nothing),
				A2(elm$json$Json$Decode$map, elm$core$Maybe$Just, decoder)
			]));
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$AnyType = {$: 'AnyType'};
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$SpecifiedTypeInfo = F4(
	function (nullability, coreType, join, selectionSet) {
		return {coreType: coreType, join: join, nullability: nullability, selectionSet: selectionSet};
	});
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$NullableFlag = {$: 'NullableFlag'};
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$nullableFlag = jamesmacaulay$elm_graphql$GraphQL$Request$Builder$NullableFlag;
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$nullable = function (_n0) {
	var sourceType = _n0.a;
	var decoder = _n0.b;
	var vars = _n0.c;
	var fragments = _n0.d;
	if (sourceType.$ === 'SpecifiedType') {
		var typeInfo = sourceType.a;
		return A4(
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$ValueSpec,
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$SpecifiedType(
				A4(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$SpecifiedTypeInfo, jamesmacaulay$elm_graphql$GraphQL$Request$Builder$nullableFlag, typeInfo.coreType, typeInfo.join, typeInfo.selectionSet)),
			A2(elm$core$Basics$composeL, elm$json$Json$Decode$nullable, decoder),
			vars,
			fragments);
	} else {
		return A4(
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$ValueSpec,
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$AnyType,
			A2(elm$core$Basics$composeL, elm$json$Json$Decode$nullable, decoder),
			vars,
			fragments);
	}
};
var author$project$GitHubGraph$gitActorObject = A2(
	jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
	A3(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
		'user',
		_List_Nil,
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$nullable(author$project$GitHubGraph$userObject)),
	A2(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
		A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'avatarUrl', _List_Nil, jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string),
		A2(
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
			A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'name', _List_Nil, jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string),
			A2(
				jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
				A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'email', _List_Nil, jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string),
				jamesmacaulay$elm_graphql$GraphQL$Request$Builder$object(author$project$GitHubGraph$GitActor)))));
var author$project$GitHubGraph$Status = F2(
	function (state, contexts) {
		return {contexts: contexts, state: state};
	});
var author$project$GitHubGraph$StatusContext = F4(
	function (state, context, targetUrl, creator) {
		return {context: context, creator: creator, state: state, targetUrl: targetUrl};
	});
var author$project$GitHubGraph$Actor = F3(
	function (url, login, avatar) {
		return {avatar: avatar, login: login, url: url};
	});
var author$project$GitHubGraph$actorObject = A2(
	jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
	A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'avatarUrl', _List_Nil, jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string),
	A2(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
		A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'login', _List_Nil, jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string),
		A2(
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
			A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'url', _List_Nil, jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string),
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$object(author$project$GitHubGraph$Actor))));
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$EnumType = function (a) {
	return {$: 'EnumType', a: a};
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$decoderFromEnumLabel = F2(
	function (fallbackDecoder, labelledValues) {
		var valueFromLabel = function (key) {
			return A2(
				elm$core$Dict$get,
				key,
				elm$core$Dict$fromList(labelledValues));
		};
		var decoder = function (enumString) {
			var _n0 = valueFromLabel(enumString);
			if (_n0.$ === 'Just') {
				var value = _n0.a;
				return elm$json$Json$Decode$succeed(value);
			} else {
				return fallbackDecoder(enumString);
			}
		};
		return decoder;
	});
var elm$core$Set$fromList = function (list) {
	return A3(elm$core$List$foldl, elm$core$Set$insert, elm$core$Set$empty, list);
};
var elm$core$Dict$foldl = F3(
	function (func, acc, dict) {
		foldl:
		while (true) {
			if (dict.$ === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3(elm$core$Dict$foldl, func, acc, left)),
					$temp$dict = right;
				func = $temp$func;
				acc = $temp$acc;
				dict = $temp$dict;
				continue foldl;
			}
		}
	});
var elm$core$Dict$filter = F2(
	function (isGood, dict) {
		return A3(
			elm$core$Dict$foldl,
			F3(
				function (k, v, d) {
					return A2(isGood, k, v) ? A3(elm$core$Dict$insert, k, v, d) : d;
				}),
			elm$core$Dict$empty,
			dict);
	});
var elm$core$Dict$member = F2(
	function (key, dict) {
		var _n0 = A2(elm$core$Dict$get, key, dict);
		if (_n0.$ === 'Just') {
			return true;
		} else {
			return false;
		}
	});
var elm$core$Dict$intersect = F2(
	function (t1, t2) {
		return A2(
			elm$core$Dict$filter,
			F2(
				function (k, _n0) {
					return A2(elm$core$Dict$member, k, t2);
				}),
			t1);
	});
var elm$core$Set$intersect = F2(
	function (_n0, _n1) {
		var dict1 = _n0.a;
		var dict2 = _n1.a;
		return elm$core$Set$Set_elm_builtin(
			A2(elm$core$Dict$intersect, dict1, dict2));
	});
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$enumJoin = F2(
	function (_n0, _n1) {
		var labelsA = _n0.a;
		var labelsB = _n1.a;
		return jamesmacaulay$elm_graphql$GraphQL$Request$Builder$EnumType(
			elm$core$Set$toList(
				A2(
					elm$core$Set$intersect,
					elm$core$Set$fromList(labelsB),
					elm$core$Set$fromList(labelsA))));
	});
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$enumWithFallback = F2(
	function (fallbackDecoder, labelledValues) {
		var labels = A2(elm$core$List$map, elm$core$Tuple$first, labelledValues);
		var decoderFromLabel = A2(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$decoderFromEnumLabel, fallbackDecoder, labelledValues);
		var decoder = A2(elm$json$Json$Decode$andThen, decoderFromLabel, elm$json$Json$Decode$string);
		return A4(
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$ValueSpec,
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$SpecifiedType(
				{
					coreType: jamesmacaulay$elm_graphql$GraphQL$Request$Builder$EnumType(labels),
					join: jamesmacaulay$elm_graphql$GraphQL$Request$Builder$enumJoin,
					nullability: jamesmacaulay$elm_graphql$GraphQL$Request$Builder$nonNullFlag,
					selectionSet: jamesmacaulay$elm_graphql$GraphQL$Request$Builder$emptySelectionSet
				}),
			elm$core$Basics$always(decoder),
			_List_Nil,
			_List_Nil);
	});
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$enum = jamesmacaulay$elm_graphql$GraphQL$Request$Builder$enumWithFallback(
	function (label) {
		return elm$json$Json$Decode$fail(
			'Unexpected enum value ' + A2(
				elm$json$Json$Encode$encode,
				0,
				elm$json$Json$Encode$string(label)));
	});
var author$project$GitHubGraph$statusContextObject = A2(
	jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
	A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'creator', _List_Nil, author$project$GitHubGraph$actorObject),
	A2(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
		A3(
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
			'targetUrl',
			_List_Nil,
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$nullable(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string)),
		A2(
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
			A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'context', _List_Nil, jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string),
			A2(
				jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
				A3(
					jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
					'state',
					_List_Nil,
					jamesmacaulay$elm_graphql$GraphQL$Request$Builder$enum(author$project$GitHubGraph$statusStates)),
				jamesmacaulay$elm_graphql$GraphQL$Request$Builder$object(author$project$GitHubGraph$StatusContext)))));
var elm$json$Json$Decode$list = _Json_decodeList;
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$ListType = function (a) {
	return {$: 'ListType', a: a};
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$listJoin = F2(
	function (_n0, _n1) {
		var itemSourceTypeA = _n0.a;
		var itemSourceTypeB = _n1.a;
		return jamesmacaulay$elm_graphql$GraphQL$Request$Builder$ListType(
			A2(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$join, itemSourceTypeA, itemSourceTypeB));
	});
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$list = function (_n0) {
	var itemType = _n0.a;
	var decoder = _n0.b;
	var vars = _n0.c;
	var fragments = _n0.d;
	return A4(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$ValueSpec,
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$SpecifiedType(
			{
				coreType: jamesmacaulay$elm_graphql$GraphQL$Request$Builder$ListType(itemType),
				join: jamesmacaulay$elm_graphql$GraphQL$Request$Builder$listJoin,
				nullability: jamesmacaulay$elm_graphql$GraphQL$Request$Builder$nonNullFlag,
				selectionSet: jamesmacaulay$elm_graphql$GraphQL$Request$Builder$selectionSetFromSourceType(itemType)
			}),
		A2(elm$core$Basics$composeL, elm$json$Json$Decode$list, decoder),
		vars,
		fragments);
};
var author$project$GitHubGraph$statusObject = A2(
	jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
	A3(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
		'contexts',
		_List_Nil,
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$list(author$project$GitHubGraph$statusContextObject)),
	A2(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
		A3(
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
			'state',
			_List_Nil,
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$enum(author$project$GitHubGraph$statusStates)),
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$object(author$project$GitHubGraph$Status)));
var elm$parser$Parser$DeadEnd = F3(
	function (row, col, problem) {
		return {col: col, problem: problem, row: row};
	});
var elm$parser$Parser$problemToDeadEnd = function (p) {
	return A3(elm$parser$Parser$DeadEnd, p.row, p.col, p.problem);
};
var elm$parser$Parser$Advanced$bagToList = F2(
	function (bag, list) {
		bagToList:
		while (true) {
			switch (bag.$) {
				case 'Empty':
					return list;
				case 'AddRight':
					var bag1 = bag.a;
					var x = bag.b;
					var $temp$bag = bag1,
						$temp$list = A2(elm$core$List$cons, x, list);
					bag = $temp$bag;
					list = $temp$list;
					continue bagToList;
				default:
					var bag1 = bag.a;
					var bag2 = bag.b;
					var $temp$bag = bag1,
						$temp$list = A2(elm$parser$Parser$Advanced$bagToList, bag2, list);
					bag = $temp$bag;
					list = $temp$list;
					continue bagToList;
			}
		}
	});
var elm$parser$Parser$Advanced$run = F2(
	function (_n0, src) {
		var parse = _n0.a;
		var _n1 = parse(
			{col: 1, context: _List_Nil, indent: 1, offset: 0, row: 1, src: src});
		if (_n1.$ === 'Good') {
			var value = _n1.b;
			return elm$core$Result$Ok(value);
		} else {
			var bag = _n1.b;
			return elm$core$Result$Err(
				A2(elm$parser$Parser$Advanced$bagToList, bag, _List_Nil));
		}
	});
var elm$parser$Parser$run = F2(
	function (parser, source) {
		var _n0 = A2(elm$parser$Parser$Advanced$run, parser, source);
		if (_n0.$ === 'Ok') {
			var a = _n0.a;
			return elm$core$Result$Ok(a);
		} else {
			var problems = _n0.a;
			return elm$core$Result$Err(
				A2(elm$core$List$map, elm$parser$Parser$problemToDeadEnd, problems));
		}
	});
var elm$parser$Parser$Advanced$Bad = F2(
	function (a, b) {
		return {$: 'Bad', a: a, b: b};
	});
var elm$parser$Parser$Advanced$Good = F3(
	function (a, b, c) {
		return {$: 'Good', a: a, b: b, c: c};
	});
var elm$parser$Parser$Advanced$Parser = function (a) {
	return {$: 'Parser', a: a};
};
var elm$parser$Parser$Advanced$andThen = F2(
	function (callback, _n0) {
		var parseA = _n0.a;
		return elm$parser$Parser$Advanced$Parser(
			function (s0) {
				var _n1 = parseA(s0);
				if (_n1.$ === 'Bad') {
					var p = _n1.a;
					var x = _n1.b;
					return A2(elm$parser$Parser$Advanced$Bad, p, x);
				} else {
					var p1 = _n1.a;
					var a = _n1.b;
					var s1 = _n1.c;
					var _n2 = callback(a);
					var parseB = _n2.a;
					var _n3 = parseB(s1);
					if (_n3.$ === 'Bad') {
						var p2 = _n3.a;
						var x = _n3.b;
						return A2(elm$parser$Parser$Advanced$Bad, p1 || p2, x);
					} else {
						var p2 = _n3.a;
						var b = _n3.b;
						var s2 = _n3.c;
						return A3(elm$parser$Parser$Advanced$Good, p1 || p2, b, s2);
					}
				}
			});
	});
var elm$parser$Parser$andThen = elm$parser$Parser$Advanced$andThen;
var elm$parser$Parser$ExpectingEnd = {$: 'ExpectingEnd'};
var elm$parser$Parser$Advanced$AddRight = F2(
	function (a, b) {
		return {$: 'AddRight', a: a, b: b};
	});
var elm$parser$Parser$Advanced$DeadEnd = F4(
	function (row, col, problem, contextStack) {
		return {col: col, contextStack: contextStack, problem: problem, row: row};
	});
var elm$parser$Parser$Advanced$Empty = {$: 'Empty'};
var elm$parser$Parser$Advanced$fromState = F2(
	function (s, x) {
		return A2(
			elm$parser$Parser$Advanced$AddRight,
			elm$parser$Parser$Advanced$Empty,
			A4(elm$parser$Parser$Advanced$DeadEnd, s.row, s.col, x, s.context));
	});
var elm$parser$Parser$Advanced$end = function (x) {
	return elm$parser$Parser$Advanced$Parser(
		function (s) {
			return _Utils_eq(
				elm$core$String$length(s.src),
				s.offset) ? A3(elm$parser$Parser$Advanced$Good, false, _Utils_Tuple0, s) : A2(
				elm$parser$Parser$Advanced$Bad,
				false,
				A2(elm$parser$Parser$Advanced$fromState, s, x));
		});
};
var elm$parser$Parser$end = elm$parser$Parser$Advanced$end(elm$parser$Parser$ExpectingEnd);
var elm$parser$Parser$Advanced$map2 = F3(
	function (func, _n0, _n1) {
		var parseA = _n0.a;
		var parseB = _n1.a;
		return elm$parser$Parser$Advanced$Parser(
			function (s0) {
				var _n2 = parseA(s0);
				if (_n2.$ === 'Bad') {
					var p = _n2.a;
					var x = _n2.b;
					return A2(elm$parser$Parser$Advanced$Bad, p, x);
				} else {
					var p1 = _n2.a;
					var a = _n2.b;
					var s1 = _n2.c;
					var _n3 = parseB(s1);
					if (_n3.$ === 'Bad') {
						var p2 = _n3.a;
						var x = _n3.b;
						return A2(elm$parser$Parser$Advanced$Bad, p1 || p2, x);
					} else {
						var p2 = _n3.a;
						var b = _n3.b;
						var s2 = _n3.c;
						return A3(
							elm$parser$Parser$Advanced$Good,
							p1 || p2,
							A2(func, a, b),
							s2);
					}
				}
			});
	});
var elm$parser$Parser$Advanced$ignorer = F2(
	function (keepParser, ignoreParser) {
		return A3(elm$parser$Parser$Advanced$map2, elm$core$Basics$always, keepParser, ignoreParser);
	});
var elm$parser$Parser$ignorer = elm$parser$Parser$Advanced$ignorer;
var elm$parser$Parser$Advanced$keeper = F2(
	function (parseFunc, parseArg) {
		return A3(elm$parser$Parser$Advanced$map2, elm$core$Basics$apL, parseFunc, parseArg);
	});
var elm$parser$Parser$keeper = elm$parser$Parser$Advanced$keeper;
var elm$parser$Parser$Advanced$map = F2(
	function (func, _n0) {
		var parse = _n0.a;
		return elm$parser$Parser$Advanced$Parser(
			function (s0) {
				var _n1 = parse(s0);
				if (_n1.$ === 'Good') {
					var p = _n1.a;
					var a = _n1.b;
					var s1 = _n1.c;
					return A3(
						elm$parser$Parser$Advanced$Good,
						p,
						func(a),
						s1);
				} else {
					var p = _n1.a;
					var x = _n1.b;
					return A2(elm$parser$Parser$Advanced$Bad, p, x);
				}
			});
	});
var elm$parser$Parser$map = elm$parser$Parser$Advanced$map;
var elm$parser$Parser$Advanced$Append = F2(
	function (a, b) {
		return {$: 'Append', a: a, b: b};
	});
var elm$parser$Parser$Advanced$oneOfHelp = F3(
	function (s0, bag, parsers) {
		oneOfHelp:
		while (true) {
			if (!parsers.b) {
				return A2(elm$parser$Parser$Advanced$Bad, false, bag);
			} else {
				var parse = parsers.a.a;
				var remainingParsers = parsers.b;
				var _n1 = parse(s0);
				if (_n1.$ === 'Good') {
					var step = _n1;
					return step;
				} else {
					var step = _n1;
					var p = step.a;
					var x = step.b;
					if (p) {
						return step;
					} else {
						var $temp$s0 = s0,
							$temp$bag = A2(elm$parser$Parser$Advanced$Append, bag, x),
							$temp$parsers = remainingParsers;
						s0 = $temp$s0;
						bag = $temp$bag;
						parsers = $temp$parsers;
						continue oneOfHelp;
					}
				}
			}
		}
	});
var elm$parser$Parser$Advanced$oneOf = function (parsers) {
	return elm$parser$Parser$Advanced$Parser(
		function (s) {
			return A3(elm$parser$Parser$Advanced$oneOfHelp, s, elm$parser$Parser$Advanced$Empty, parsers);
		});
};
var elm$parser$Parser$oneOf = elm$parser$Parser$Advanced$oneOf;
var elm$parser$Parser$Advanced$succeed = function (a) {
	return elm$parser$Parser$Advanced$Parser(
		function (s) {
			return A3(elm$parser$Parser$Advanced$Good, false, a, s);
		});
};
var elm$parser$Parser$succeed = elm$parser$Parser$Advanced$succeed;
var elm$parser$Parser$ExpectingSymbol = function (a) {
	return {$: 'ExpectingSymbol', a: a};
};
var elm$parser$Parser$Advanced$Token = F2(
	function (a, b) {
		return {$: 'Token', a: a, b: b};
	});
var elm$core$String$isEmpty = function (string) {
	return string === '';
};
var elm$parser$Parser$Advanced$isSubString = _Parser_isSubString;
var elm$parser$Parser$Advanced$token = function (_n0) {
	var str = _n0.a;
	var expecting = _n0.b;
	var progress = !elm$core$String$isEmpty(str);
	return elm$parser$Parser$Advanced$Parser(
		function (s) {
			var _n1 = A5(elm$parser$Parser$Advanced$isSubString, str, s.offset, s.row, s.col, s.src);
			var newOffset = _n1.a;
			var newRow = _n1.b;
			var newCol = _n1.c;
			return _Utils_eq(newOffset, -1) ? A2(
				elm$parser$Parser$Advanced$Bad,
				false,
				A2(elm$parser$Parser$Advanced$fromState, s, expecting)) : A3(
				elm$parser$Parser$Advanced$Good,
				progress,
				_Utils_Tuple0,
				{col: newCol, context: s.context, indent: s.indent, offset: newOffset, row: newRow, src: s.src});
		});
};
var elm$parser$Parser$Advanced$symbol = elm$parser$Parser$Advanced$token;
var elm$parser$Parser$symbol = function (str) {
	return elm$parser$Parser$Advanced$symbol(
		A2(
			elm$parser$Parser$Advanced$Token,
			str,
			elm$parser$Parser$ExpectingSymbol(str)));
};
var elm$core$Basics$round = _Basics_round;
var elm$core$String$toFloat = _String_toFloat;
var elm$parser$Parser$Advanced$isSubChar = _Parser_isSubChar;
var elm$parser$Parser$Advanced$chompWhileHelp = F5(
	function (isGood, offset, row, col, s0) {
		chompWhileHelp:
		while (true) {
			var newOffset = A3(elm$parser$Parser$Advanced$isSubChar, isGood, offset, s0.src);
			if (_Utils_eq(newOffset, -1)) {
				return A3(
					elm$parser$Parser$Advanced$Good,
					_Utils_cmp(s0.offset, offset) < 0,
					_Utils_Tuple0,
					{col: col, context: s0.context, indent: s0.indent, offset: offset, row: row, src: s0.src});
			} else {
				if (_Utils_eq(newOffset, -2)) {
					var $temp$isGood = isGood,
						$temp$offset = offset + 1,
						$temp$row = row + 1,
						$temp$col = 1,
						$temp$s0 = s0;
					isGood = $temp$isGood;
					offset = $temp$offset;
					row = $temp$row;
					col = $temp$col;
					s0 = $temp$s0;
					continue chompWhileHelp;
				} else {
					var $temp$isGood = isGood,
						$temp$offset = newOffset,
						$temp$row = row,
						$temp$col = col + 1,
						$temp$s0 = s0;
					isGood = $temp$isGood;
					offset = $temp$offset;
					row = $temp$row;
					col = $temp$col;
					s0 = $temp$s0;
					continue chompWhileHelp;
				}
			}
		}
	});
var elm$parser$Parser$Advanced$chompWhile = function (isGood) {
	return elm$parser$Parser$Advanced$Parser(
		function (s) {
			return A5(elm$parser$Parser$Advanced$chompWhileHelp, isGood, s.offset, s.row, s.col, s);
		});
};
var elm$parser$Parser$chompWhile = elm$parser$Parser$Advanced$chompWhile;
var elm$core$String$slice = _String_slice;
var elm$parser$Parser$Advanced$mapChompedString = F2(
	function (func, _n0) {
		var parse = _n0.a;
		return elm$parser$Parser$Advanced$Parser(
			function (s0) {
				var _n1 = parse(s0);
				if (_n1.$ === 'Bad') {
					var p = _n1.a;
					var x = _n1.b;
					return A2(elm$parser$Parser$Advanced$Bad, p, x);
				} else {
					var p = _n1.a;
					var a = _n1.b;
					var s1 = _n1.c;
					return A3(
						elm$parser$Parser$Advanced$Good,
						p,
						A2(
							func,
							A3(elm$core$String$slice, s0.offset, s1.offset, s0.src),
							a),
						s1);
				}
			});
	});
var elm$parser$Parser$Advanced$getChompedString = function (parser) {
	return A2(elm$parser$Parser$Advanced$mapChompedString, elm$core$Basics$always, parser);
};
var elm$parser$Parser$getChompedString = elm$parser$Parser$Advanced$getChompedString;
var elm$parser$Parser$Problem = function (a) {
	return {$: 'Problem', a: a};
};
var elm$parser$Parser$Advanced$problem = function (x) {
	return elm$parser$Parser$Advanced$Parser(
		function (s) {
			return A2(
				elm$parser$Parser$Advanced$Bad,
				false,
				A2(elm$parser$Parser$Advanced$fromState, s, x));
		});
};
var elm$parser$Parser$problem = function (msg) {
	return elm$parser$Parser$Advanced$problem(
		elm$parser$Parser$Problem(msg));
};
var rtfeldman$elm_iso8601_date_strings$Iso8601$fractionsOfASecondInMs = A2(
	elm$parser$Parser$andThen,
	function (str) {
		if (elm$core$String$length(str) <= 9) {
			var _n0 = elm$core$String$toFloat('0.' + str);
			if (_n0.$ === 'Just') {
				var floatVal = _n0.a;
				return elm$parser$Parser$succeed(
					elm$core$Basics$round(floatVal * 1000));
			} else {
				return elm$parser$Parser$problem('Invalid float: \"' + (str + '\"'));
			}
		} else {
			return elm$parser$Parser$problem(
				'Expected at most 9 digits, but got ' + elm$core$String$fromInt(
					elm$core$String$length(str)));
		}
	},
	elm$parser$Parser$getChompedString(
		elm$parser$Parser$chompWhile(elm$core$Char$isDigit)));
var elm$time$Time$Posix = function (a) {
	return {$: 'Posix', a: a};
};
var elm$time$Time$millisToPosix = elm$time$Time$Posix;
var rtfeldman$elm_iso8601_date_strings$Iso8601$fromParts = F6(
	function (monthYearDayMs, hour, minute, second, ms, utcOffsetMinutes) {
		return elm$time$Time$millisToPosix((((monthYearDayMs + (((hour * 60) * 60) * 1000)) + (((minute - utcOffsetMinutes) * 60) * 1000)) + (second * 1000)) + ms);
	});
var elm$core$String$toInt = _String_toInt;
var rtfeldman$elm_iso8601_date_strings$Iso8601$paddedInt = function (quantity) {
	return A2(
		elm$parser$Parser$andThen,
		function (str) {
			if (_Utils_eq(
				elm$core$String$length(str),
				quantity)) {
				var _n0 = elm$core$String$toInt(str);
				if (_n0.$ === 'Just') {
					var intVal = _n0.a;
					return elm$parser$Parser$succeed(intVal);
				} else {
					return elm$parser$Parser$problem('Invalid integer: \"' + (str + '\"'));
				}
			} else {
				return elm$parser$Parser$problem(
					'Expected ' + (elm$core$String$fromInt(quantity) + (' digits, but got ' + elm$core$String$fromInt(
						elm$core$String$length(str)))));
			}
		},
		elm$parser$Parser$getChompedString(
			elm$parser$Parser$chompWhile(elm$core$Char$isDigit)));
};
var rtfeldman$elm_iso8601_date_strings$Iso8601$epochYear = 1970;
var rtfeldman$elm_iso8601_date_strings$Iso8601$invalidDay = function (day) {
	return elm$parser$Parser$problem(
		'Invalid day: ' + elm$core$String$fromInt(day));
};
var rtfeldman$elm_iso8601_date_strings$Iso8601$isLeapYear = function (year) {
	return (!A2(elm$core$Basics$modBy, 4, year)) && (A2(elm$core$Basics$modBy, 100, year) || (!A2(elm$core$Basics$modBy, 400, year)));
};
var rtfeldman$elm_iso8601_date_strings$Iso8601$leapYearsBefore = function (y1) {
	var y = y1 - 1;
	return (((y / 4) | 0) - ((y / 100) | 0)) + ((y / 400) | 0);
};
var rtfeldman$elm_iso8601_date_strings$Iso8601$msPerDay = 86400000;
var rtfeldman$elm_iso8601_date_strings$Iso8601$msPerYear = 31536000000;
var rtfeldman$elm_iso8601_date_strings$Iso8601$yearMonthDay = function (_n0) {
	var year = _n0.a;
	var month = _n0.b;
	var dayInMonth = _n0.c;
	if (dayInMonth < 0) {
		return rtfeldman$elm_iso8601_date_strings$Iso8601$invalidDay(dayInMonth);
	} else {
		var succeedWith = function (extraMs) {
			var yearMs = rtfeldman$elm_iso8601_date_strings$Iso8601$msPerYear * (year - rtfeldman$elm_iso8601_date_strings$Iso8601$epochYear);
			var days = ((month < 3) || (!rtfeldman$elm_iso8601_date_strings$Iso8601$isLeapYear(year))) ? (dayInMonth - 1) : dayInMonth;
			var dayMs = rtfeldman$elm_iso8601_date_strings$Iso8601$msPerDay * (days + (rtfeldman$elm_iso8601_date_strings$Iso8601$leapYearsBefore(year) - rtfeldman$elm_iso8601_date_strings$Iso8601$leapYearsBefore(rtfeldman$elm_iso8601_date_strings$Iso8601$epochYear)));
			return elm$parser$Parser$succeed((extraMs + yearMs) + dayMs);
		};
		switch (month) {
			case 1:
				return (dayInMonth > 31) ? rtfeldman$elm_iso8601_date_strings$Iso8601$invalidDay(dayInMonth) : succeedWith(0);
			case 2:
				return ((dayInMonth > 29) || ((dayInMonth === 29) && (!rtfeldman$elm_iso8601_date_strings$Iso8601$isLeapYear(year)))) ? rtfeldman$elm_iso8601_date_strings$Iso8601$invalidDay(dayInMonth) : succeedWith(2678400000);
			case 3:
				return (dayInMonth > 31) ? rtfeldman$elm_iso8601_date_strings$Iso8601$invalidDay(dayInMonth) : succeedWith(5097600000);
			case 4:
				return (dayInMonth > 30) ? rtfeldman$elm_iso8601_date_strings$Iso8601$invalidDay(dayInMonth) : succeedWith(7776000000);
			case 5:
				return (dayInMonth > 31) ? rtfeldman$elm_iso8601_date_strings$Iso8601$invalidDay(dayInMonth) : succeedWith(10368000000);
			case 6:
				return (dayInMonth > 30) ? rtfeldman$elm_iso8601_date_strings$Iso8601$invalidDay(dayInMonth) : succeedWith(13046400000);
			case 7:
				return (dayInMonth > 31) ? rtfeldman$elm_iso8601_date_strings$Iso8601$invalidDay(dayInMonth) : succeedWith(15638400000);
			case 8:
				return (dayInMonth > 31) ? rtfeldman$elm_iso8601_date_strings$Iso8601$invalidDay(dayInMonth) : succeedWith(18316800000);
			case 9:
				return (dayInMonth > 30) ? rtfeldman$elm_iso8601_date_strings$Iso8601$invalidDay(dayInMonth) : succeedWith(20995200000);
			case 10:
				return (dayInMonth > 31) ? rtfeldman$elm_iso8601_date_strings$Iso8601$invalidDay(dayInMonth) : succeedWith(23587200000);
			case 11:
				return (dayInMonth > 30) ? rtfeldman$elm_iso8601_date_strings$Iso8601$invalidDay(dayInMonth) : succeedWith(26265600000);
			case 12:
				return (dayInMonth > 31) ? rtfeldman$elm_iso8601_date_strings$Iso8601$invalidDay(dayInMonth) : succeedWith(28857600000);
			default:
				return elm$parser$Parser$problem(
					'Invalid month: \"' + (elm$core$String$fromInt(month) + '\"'));
		}
	}
};
var rtfeldman$elm_iso8601_date_strings$Iso8601$monthYearDayInMs = A2(
	elm$parser$Parser$andThen,
	rtfeldman$elm_iso8601_date_strings$Iso8601$yearMonthDay,
	A2(
		elm$parser$Parser$keeper,
		A2(
			elm$parser$Parser$keeper,
			A2(
				elm$parser$Parser$keeper,
				elm$parser$Parser$succeed(
					F3(
						function (year, month, day) {
							return _Utils_Tuple3(year, month, day);
						})),
				A2(
					elm$parser$Parser$ignorer,
					rtfeldman$elm_iso8601_date_strings$Iso8601$paddedInt(4),
					elm$parser$Parser$symbol('-'))),
			A2(
				elm$parser$Parser$ignorer,
				rtfeldman$elm_iso8601_date_strings$Iso8601$paddedInt(2),
				elm$parser$Parser$symbol('-'))),
		rtfeldman$elm_iso8601_date_strings$Iso8601$paddedInt(2)));
var rtfeldman$elm_iso8601_date_strings$Iso8601$utcOffsetMinutesFromParts = F3(
	function (multiplier, hours, minutes) {
		return multiplier * ((hours * 60) + minutes);
	});
var rtfeldman$elm_iso8601_date_strings$Iso8601$iso8601 = A2(
	elm$parser$Parser$andThen,
	function (datePart) {
		return elm$parser$Parser$oneOf(
			_List_fromArray(
				[
					A2(
					elm$parser$Parser$keeper,
					A2(
						elm$parser$Parser$keeper,
						A2(
							elm$parser$Parser$keeper,
							A2(
								elm$parser$Parser$keeper,
								A2(
									elm$parser$Parser$keeper,
									A2(
										elm$parser$Parser$ignorer,
										elm$parser$Parser$succeed(
											rtfeldman$elm_iso8601_date_strings$Iso8601$fromParts(datePart)),
										elm$parser$Parser$symbol('T')),
									A2(
										elm$parser$Parser$ignorer,
										rtfeldman$elm_iso8601_date_strings$Iso8601$paddedInt(2),
										elm$parser$Parser$symbol(':'))),
								A2(
									elm$parser$Parser$ignorer,
									rtfeldman$elm_iso8601_date_strings$Iso8601$paddedInt(2),
									elm$parser$Parser$symbol(':'))),
							rtfeldman$elm_iso8601_date_strings$Iso8601$paddedInt(2)),
						elm$parser$Parser$oneOf(
							_List_fromArray(
								[
									A2(
									elm$parser$Parser$keeper,
									A2(
										elm$parser$Parser$ignorer,
										elm$parser$Parser$succeed(elm$core$Basics$identity),
										elm$parser$Parser$symbol('.')),
									rtfeldman$elm_iso8601_date_strings$Iso8601$fractionsOfASecondInMs),
									elm$parser$Parser$succeed(0)
								]))),
					elm$parser$Parser$oneOf(
						_List_fromArray(
							[
								A2(
								elm$parser$Parser$map,
								function (_n0) {
									return 0;
								},
								elm$parser$Parser$symbol('Z')),
								A2(
								elm$parser$Parser$keeper,
								A2(
									elm$parser$Parser$keeper,
									A2(
										elm$parser$Parser$keeper,
										elm$parser$Parser$succeed(rtfeldman$elm_iso8601_date_strings$Iso8601$utcOffsetMinutesFromParts),
										elm$parser$Parser$oneOf(
											_List_fromArray(
												[
													A2(
													elm$parser$Parser$map,
													function (_n1) {
														return 1;
													},
													elm$parser$Parser$symbol('+')),
													A2(
													elm$parser$Parser$map,
													function (_n2) {
														return -1;
													},
													elm$parser$Parser$symbol('-'))
												]))),
									A2(
										elm$parser$Parser$ignorer,
										rtfeldman$elm_iso8601_date_strings$Iso8601$paddedInt(2),
										elm$parser$Parser$symbol(':'))),
								rtfeldman$elm_iso8601_date_strings$Iso8601$paddedInt(2))
							]))),
					A2(
					elm$parser$Parser$ignorer,
					elm$parser$Parser$succeed(
						A6(rtfeldman$elm_iso8601_date_strings$Iso8601$fromParts, datePart, 0, 0, 0, 0, 0)),
					elm$parser$Parser$end)
				]));
	},
	rtfeldman$elm_iso8601_date_strings$Iso8601$monthYearDayInMs);
var rtfeldman$elm_iso8601_date_strings$Iso8601$toTime = function (str) {
	return A2(elm$parser$Parser$run, rtfeldman$elm_iso8601_date_strings$Iso8601$iso8601, str);
};
var elm_community$json_extra$Json$Decode$Extra$datetime = A2(
	elm$json$Json$Decode$andThen,
	function (dateString) {
		var _n0 = rtfeldman$elm_iso8601_date_strings$Iso8601$toTime(dateString);
		if (_n0.$ === 'Ok') {
			var v = _n0.a;
			return elm$json$Json$Decode$succeed(v);
		} else {
			return elm$json$Json$Decode$fail('Expecting an ISO-8601 formatted date+time string');
		}
	},
	elm$json$Json$Decode$string);
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$customScalar = F2(
	function (customTypeMarker, decoder) {
		return A2(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$primitiveSpec, customTypeMarker, decoder);
	});
var author$project$GitHubGraph$commitObject = A2(
	jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
	A3(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
		'committedDate',
		_List_Nil,
		A2(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$customScalar, author$project$GitHubGraph$DateType, elm_community$json_extra$Json$Decode$Extra$datetime)),
	A2(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
		A3(
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
			'authoredDate',
			_List_Nil,
			A2(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$customScalar, author$project$GitHubGraph$DateType, elm_community$json_extra$Json$Decode$Extra$datetime)),
		A2(
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
			A3(
				jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
				'committer',
				_List_Nil,
				jamesmacaulay$elm_graphql$GraphQL$Request$Builder$nullable(author$project$GitHubGraph$gitActorObject)),
			A2(
				jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
				A3(
					jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
					'author',
					_List_Nil,
					jamesmacaulay$elm_graphql$GraphQL$Request$Builder$nullable(author$project$GitHubGraph$gitActorObject)),
				A2(
					jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
					A3(
						jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
						'status',
						_List_Nil,
						jamesmacaulay$elm_graphql$GraphQL$Request$Builder$nullable(author$project$GitHubGraph$statusObject)),
					A2(
						jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
						A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'oid', _List_Nil, jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string),
						jamesmacaulay$elm_graphql$GraphQL$Request$Builder$object(author$project$GitHubGraph$Commit)))))));
var author$project$GitHubGraph$Label = F3(
	function (id, name, color) {
		return {color: color, id: id, name: name};
	});
var author$project$GitHubGraph$labelObject = A2(
	jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
	A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'color', _List_Nil, jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string),
	A2(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
		A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'name', _List_Nil, jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string),
		A2(
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
			A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'id', _List_Nil, jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string),
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$object(author$project$GitHubGraph$Label))));
var author$project$GitHubGraph$Milestone = F5(
	function (id, number, title, state, description) {
		return {description: description, id: id, number: number, state: state, title: title};
	});
var author$project$GitHubGraph$milestoneObject = A2(
	jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
	A3(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
		'description',
		_List_Nil,
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$nullable(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string)),
	A2(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
		A3(
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
			'state',
			_List_Nil,
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$enum(author$project$GitHubGraph$milestoneStates)),
		A2(
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
			A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'title', _List_Nil, jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string),
			A2(
				jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
				A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'number', _List_Nil, jamesmacaulay$elm_graphql$GraphQL$Request$Builder$int),
				A2(
					jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
					A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'id', _List_Nil, jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string),
					jamesmacaulay$elm_graphql$GraphQL$Request$Builder$object(author$project$GitHubGraph$Milestone))))));
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$map = F2(
	function (f, _n0) {
		var sourceType = _n0.a;
		var decoder = _n0.b;
		var vars = _n0.c;
		var fragments = _n0.d;
		return A4(
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$ValueSpec,
			sourceType,
			A2(
				elm$core$Basics$composeR,
				decoder,
				elm$json$Json$Decode$map(f)),
			vars,
			fragments);
	});
var author$project$GitHubGraph$nullableList = function (o) {
	return A2(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$map,
		elm$core$List$filterMap(elm$core$Basics$identity),
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$list(
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$nullable(o)));
};
var author$project$GitHubGraph$CardLocation = F4(
	function (id, url, project, column) {
		return {column: column, id: id, project: project, url: url};
	});
var author$project$GitHubGraph$ProjectColumn = F3(
	function (id, name, databaseId) {
		return {databaseId: databaseId, id: id, name: name};
	});
var author$project$GitHubGraph$columnObject = A2(
	jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
	A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'databaseId', _List_Nil, jamesmacaulay$elm_graphql$GraphQL$Request$Builder$int),
	A2(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
		A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'name', _List_Nil, jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string),
		A2(
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
			A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'id', _List_Nil, jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string),
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$object(author$project$GitHubGraph$ProjectColumn))));
var author$project$GitHubGraph$ProjectLocation = F4(
	function (id, url, name, number) {
		return {id: id, name: name, number: number, url: url};
	});
var author$project$GitHubGraph$projectLocationObject = A2(
	jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
	A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'number', _List_Nil, jamesmacaulay$elm_graphql$GraphQL$Request$Builder$int),
	A2(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
		A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'name', _List_Nil, jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string),
		A2(
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
			A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'url', _List_Nil, jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string),
			A2(
				jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
				A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'id', _List_Nil, jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string),
				jamesmacaulay$elm_graphql$GraphQL$Request$Builder$object(author$project$GitHubGraph$ProjectLocation)))));
var author$project$GitHubGraph$projectCardObject = A2(
	jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
	A3(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
		'column',
		_List_Nil,
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$nullable(author$project$GitHubGraph$columnObject)),
	A2(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
		A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'project', _List_Nil, author$project$GitHubGraph$projectLocationObject),
		A2(
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
			A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'url', _List_Nil, jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string),
			A2(
				jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
				A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'id', _List_Nil, jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string),
				jamesmacaulay$elm_graphql$GraphQL$Request$Builder$object(author$project$GitHubGraph$CardLocation)))));
var author$project$GitHubGraph$ReactionGroup = F2(
	function (type_, count) {
		return {count: count, type_: type_};
	});
var author$project$GitHubGraph$reactionGroupObject = A2(
	jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
	A3(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
		'users',
		_List_Nil,
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$extract(
			A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'totalCount', _List_Nil, jamesmacaulay$elm_graphql$GraphQL$Request$Builder$int))),
	A2(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
		A3(
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
			'content',
			_List_Nil,
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$enum(author$project$GitHubGraph$reactionTypes)),
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$object(author$project$GitHubGraph$ReactionGroup)));
var author$project$GitHubGraph$RepoLocation = F4(
	function (id, url, owner, name) {
		return {id: id, name: name, owner: owner, url: url};
	});
var author$project$GitHubGraph$repoLocationObject = A2(
	jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
	A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'name', _List_Nil, jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string),
	A2(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
		A3(
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
			'owner',
			_List_Nil,
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$extract(
				A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'login', _List_Nil, jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string))),
		A2(
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
			A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'url', _List_Nil, jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string),
			A2(
				jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
				A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'id', _List_Nil, jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string),
				jamesmacaulay$elm_graphql$GraphQL$Request$Builder$object(author$project$GitHubGraph$RepoLocation)))));
var elm$core$List$head = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return elm$core$Maybe$Just(x);
	} else {
		return elm$core$Maybe$Nothing;
	}
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$aliasAs = F2(
	function (responseKey, selection) {
		var ast = selection.a;
		var decoder = selection.b;
		var vars = selection.c;
		var fragments = selection.d;
		if (ast.$ === 'Field') {
			var info = ast.a;
			return A4(
				jamesmacaulay$elm_graphql$GraphQL$Request$Builder$SelectionSpec,
				jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Field(
					_Utils_update(
						info,
						{
							alias: elm$core$Maybe$Just(responseKey)
						})),
				decoder,
				vars,
				fragments);
		} else {
			return selection;
		}
	});
var jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$IntValue = function (a) {
	return {$: 'IntValue', a: a};
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$int = function (x) {
	return A2(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$Value,
		jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$IntValue(x),
		_List_Nil);
};
var author$project$GitHubGraph$prObject = A2(
	jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
	A3(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
		'mergeCommit',
		_List_Nil,
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$nullable(author$project$GitHubGraph$commitObject)),
	A2(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
		A3(
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
			'commits',
			_List_fromArray(
				[
					_Utils_Tuple2(
					'last',
					jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$int(1))
				]),
			A2(
				jamesmacaulay$elm_graphql$GraphQL$Request$Builder$map,
				elm$core$List$head,
				jamesmacaulay$elm_graphql$GraphQL$Request$Builder$extract(
					A3(
						jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
						'nodes',
						_List_Nil,
						jamesmacaulay$elm_graphql$GraphQL$Request$Builder$list(
							jamesmacaulay$elm_graphql$GraphQL$Request$Builder$extract(
								A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'commit', _List_Nil, author$project$GitHubGraph$commitObject))))))),
		A2(
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
			A3(
				jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
				'mergeable',
				_List_Nil,
				jamesmacaulay$elm_graphql$GraphQL$Request$Builder$enum(author$project$GitHubGraph$mergeableStates)),
			A2(
				jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
				A3(
					jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
					'milestone',
					_List_Nil,
					jamesmacaulay$elm_graphql$GraphQL$Request$Builder$nullable(author$project$GitHubGraph$milestoneObject)),
				A2(
					jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
					A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'deletions', _List_Nil, jamesmacaulay$elm_graphql$GraphQL$Request$Builder$int),
					A2(
						jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
						A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'additions', _List_Nil, jamesmacaulay$elm_graphql$GraphQL$Request$Builder$int),
						A2(
							jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
							A3(
								jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
								'projectCards',
								_List_fromArray(
									[
										_Utils_Tuple2(
										'first',
										jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$int(10))
									]),
								jamesmacaulay$elm_graphql$GraphQL$Request$Builder$extract(
									A3(
										jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
										'nodes',
										_List_Nil,
										author$project$GitHubGraph$nullableList(author$project$GitHubGraph$projectCardObject)))),
							A2(
								jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
								A3(
									jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
									'labels',
									_List_fromArray(
										[
											_Utils_Tuple2(
											'first',
											jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$int(10))
										]),
									jamesmacaulay$elm_graphql$GraphQL$Request$Builder$extract(
										A3(
											jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
											'nodes',
											_List_Nil,
											jamesmacaulay$elm_graphql$GraphQL$Request$Builder$list(author$project$GitHubGraph$labelObject)))),
								A2(
									jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
									A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'author', _List_Nil, author$project$GitHubGraph$authorObject),
									A2(
										jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
										A3(
											jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
											'reactionGroups',
											_List_Nil,
											jamesmacaulay$elm_graphql$GraphQL$Request$Builder$list(author$project$GitHubGraph$reactionGroupObject)),
										A2(
											jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
											A3(
												jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
												'comments',
												_List_Nil,
												jamesmacaulay$elm_graphql$GraphQL$Request$Builder$extract(
													A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'totalCount', _List_Nil, jamesmacaulay$elm_graphql$GraphQL$Request$Builder$int))),
											A2(
												jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
												A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'title', _List_Nil, jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string),
												A2(
													jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
													A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'number', _List_Nil, jamesmacaulay$elm_graphql$GraphQL$Request$Builder$int),
													A2(
														jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
														A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'repository', _List_Nil, author$project$GitHubGraph$repoLocationObject),
														A2(
															jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
															A2(
																jamesmacaulay$elm_graphql$GraphQL$Request$Builder$aliasAs,
																'prState',
																A3(
																	jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
																	'state',
																	_List_Nil,
																	jamesmacaulay$elm_graphql$GraphQL$Request$Builder$enum(author$project$GitHubGraph$pullRequestStates))),
															A2(
																jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
																A3(
																	jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
																	'updatedAt',
																	_List_Nil,
																	A2(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$customScalar, author$project$GitHubGraph$DateType, elm_community$json_extra$Json$Decode$Extra$datetime)),
																A2(
																	jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
																	A3(
																		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
																		'createdAt',
																		_List_Nil,
																		A2(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$customScalar, author$project$GitHubGraph$DateType, elm_community$json_extra$Json$Decode$Extra$datetime)),
																	A2(
																		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
																		A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'url', _List_Nil, jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string),
																		A2(
																			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
																			A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'id', _List_Nil, jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string),
																			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$object(author$project$GitHubGraph$PullRequest))))))))))))))))))));
var elm$core$Task$fail = _Scheduler_fail;
var elm$core$Task$onError = _Scheduler_onError;
var elm$core$Task$mapError = F2(
	function (convert, task) {
		return A2(
			elm$core$Task$onError,
			A2(elm$core$Basics$composeL, elm$core$Task$fail, convert),
			task);
	});
var elm$http$Http$Internal$Request = function (a) {
	return {$: 'Request', a: a};
};
var elm$http$Http$request = elm$http$Http$Internal$Request;
var elm$core$Maybe$isJust = function (maybe) {
	if (maybe.$ === 'Just') {
		return true;
	} else {
		return false;
	}
};
var elm$core$Result$map = F2(
	function (func, ra) {
		if (ra.$ === 'Ok') {
			var a = ra.a;
			return elm$core$Result$Ok(
				func(a));
		} else {
			var e = ra.a;
			return elm$core$Result$Err(e);
		}
	});
var elm$http$Http$BadPayload = F2(
	function (a, b) {
		return {$: 'BadPayload', a: a, b: b};
	});
var elm$http$Http$BadStatus = function (a) {
	return {$: 'BadStatus', a: a};
};
var elm$http$Http$BadUrl = function (a) {
	return {$: 'BadUrl', a: a};
};
var elm$http$Http$NetworkError = {$: 'NetworkError'};
var elm$http$Http$Timeout = {$: 'Timeout'};
var elm$http$Http$Internal$FormDataBody = function (a) {
	return {$: 'FormDataBody', a: a};
};
var elm$http$Http$Internal$isStringBody = function (body) {
	if (body.$ === 'StringBody') {
		return true;
	} else {
		return false;
	}
};
var elm$http$Http$toTask = function (_n0) {
	var request_ = _n0.a;
	return A2(_Http_toTask, request_, elm$core$Maybe$Nothing);
};
var jamesmacaulay$elm_graphql$GraphQL$Client$Http$GraphQLError = function (a) {
	return {$: 'GraphQLError', a: a};
};
var jamesmacaulay$elm_graphql$GraphQL$Client$Http$HttpError = function (a) {
	return {$: 'HttpError', a: a};
};
var elm$core$Result$withDefault = F2(
	function (def, result) {
		if (result.$ === 'Ok') {
			var a = result.a;
			return a;
		} else {
			return def;
		}
	});
var elm$json$Json$Decode$decodeString = _Json_runOnString;
var jamesmacaulay$elm_graphql$GraphQL$Response$RequestError = F2(
	function (message, locations) {
		return {locations: locations, message: message};
	});
var jamesmacaulay$elm_graphql$GraphQL$Response$DocumentLocation = F2(
	function (line, column) {
		return {column: column, line: line};
	});
var jamesmacaulay$elm_graphql$GraphQL$Response$documentLocationDecoder = A3(
	elm$json$Json$Decode$map2,
	jamesmacaulay$elm_graphql$GraphQL$Response$DocumentLocation,
	A2(elm$json$Json$Decode$field, 'line', elm$json$Json$Decode$int),
	A2(elm$json$Json$Decode$field, 'column', elm$json$Json$Decode$int));
var jamesmacaulay$elm_graphql$GraphQL$Response$errorsDecoder = elm$json$Json$Decode$list(
	A3(
		elm$json$Json$Decode$map2,
		jamesmacaulay$elm_graphql$GraphQL$Response$RequestError,
		A2(elm$json$Json$Decode$field, 'message', elm$json$Json$Decode$string),
		elm$json$Json$Decode$oneOf(
			_List_fromArray(
				[
					A2(
					elm$json$Json$Decode$field,
					'locations',
					elm$json$Json$Decode$list(jamesmacaulay$elm_graphql$GraphQL$Response$documentLocationDecoder)),
					elm$json$Json$Decode$succeed(_List_Nil)
				]))));
var jamesmacaulay$elm_graphql$GraphQL$Client$Http$Util$errorsResponseDecoder = A2(elm$json$Json$Decode$field, 'errors', jamesmacaulay$elm_graphql$GraphQL$Response$errorsDecoder);
var jamesmacaulay$elm_graphql$GraphQL$Client$Http$Util$convertHttpError = F3(
	function (wrapHttpError, wrapGraphQLError, httpError) {
		var handleErrorWithResponseBody = function (responseBody) {
			return A2(
				elm$core$Result$withDefault,
				wrapHttpError(httpError),
				A2(
					elm$core$Result$map,
					wrapGraphQLError,
					A2(elm$json$Json$Decode$decodeString, jamesmacaulay$elm_graphql$GraphQL$Client$Http$Util$errorsResponseDecoder, responseBody)));
		};
		switch (httpError.$) {
			case 'BadStatus':
				var body = httpError.a.body;
				return handleErrorWithResponseBody(body);
			case 'BadPayload':
				var body = httpError.b.body;
				return handleErrorWithResponseBody(body);
			default:
				return wrapHttpError(httpError);
		}
	});
var elm$http$Http$Internal$EmptyBody = {$: 'EmptyBody'};
var elm$http$Http$emptyBody = elm$http$Http$Internal$EmptyBody;
var elm$core$String$contains = _String_contains;
var elm$url$Url$percentEncode = _Url_percentEncode;
var jamesmacaulay$elm_graphql$GraphQL$Client$Http$Util$parameterizedUrl = F3(
	function (url, documentString, variableValues) {
		var variablesParam = A2(
			elm$core$Maybe$withDefault,
			'',
			A2(
				elm$core$Maybe$map,
				function (obj) {
					return '&variables=' + elm$url$Url$percentEncode(
						A2(elm$json$Json$Encode$encode, 0, obj));
				},
				variableValues));
		var firstParamPrefix = A2(elm$core$String$contains, '?', url) ? '&' : '?';
		var queryParam = firstParamPrefix + ('query=' + elm$url$Url$percentEncode(documentString));
		return _Utils_ap(
			url,
			_Utils_ap(queryParam, variablesParam));
	});
var elm$http$Http$Internal$StringBody = F2(
	function (a, b) {
		return {$: 'StringBody', a: a, b: b};
	});
var elm$http$Http$jsonBody = function (value) {
	return A2(
		elm$http$Http$Internal$StringBody,
		'application/json',
		A2(elm$json$Json$Encode$encode, 0, value));
};
var jamesmacaulay$elm_graphql$GraphQL$Client$Http$Util$postBodyJson = F2(
	function (documentString, variableValues) {
		var extraParams = A2(
			elm$core$Maybe$withDefault,
			_List_Nil,
			A2(
				elm$core$Maybe$map,
				function (obj) {
					return _List_fromArray(
						[
							_Utils_Tuple2('variables', obj)
						]);
				},
				variableValues));
		var documentValue = elm$json$Json$Encode$string(documentString);
		return elm$json$Json$Encode$object(
			_Utils_ap(
				_List_fromArray(
					[
						_Utils_Tuple2('query', documentValue)
					]),
				extraParams));
	});
var jamesmacaulay$elm_graphql$GraphQL$Client$Http$Util$postBody = F2(
	function (documentString, variableValues) {
		return elm$http$Http$jsonBody(
			A2(jamesmacaulay$elm_graphql$GraphQL$Client$Http$Util$postBodyJson, documentString, variableValues));
	});
var jamesmacaulay$elm_graphql$GraphQL$Client$Http$Util$requestConfig = F4(
	function (requestOptions, documentString, expect, variableValues) {
		var _n0 = (requestOptions.method === 'GET') ? _Utils_Tuple2(
			A3(jamesmacaulay$elm_graphql$GraphQL$Client$Http$Util$parameterizedUrl, requestOptions.url, documentString, variableValues),
			elm$http$Http$emptyBody) : _Utils_Tuple2(
			requestOptions.url,
			A2(jamesmacaulay$elm_graphql$GraphQL$Client$Http$Util$postBody, documentString, variableValues));
		var url = _n0.a;
		var body = _n0.b;
		return {body: body, expect: expect, headers: requestOptions.headers, method: requestOptions.method, timeout: requestOptions.timeout, url: url, withCredentials: requestOptions.withCredentials};
	});
var jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Value$Json$Encode$encode = function (value) {
	switch (value.$) {
		case 'VariableValue':
			return elm$json$Json$Encode$null;
		case 'IntValue':
			var _int = value.a;
			return elm$json$Json$Encode$int(_int);
		case 'FloatValue':
			var _float = value.a;
			return elm$json$Json$Encode$float(_float);
		case 'StringValue':
			var string = value.a;
			return elm$json$Json$Encode$string(string);
		case 'BooleanValue':
			var bool = value.a;
			return elm$json$Json$Encode$bool(bool);
		case 'NullValue':
			return elm$json$Json$Encode$null;
		case 'EnumValue':
			var string = value.a;
			return elm$json$Json$Encode$string(string);
		case 'ListValue':
			var values = value.a;
			return A2(elm$json$Json$Encode$list, jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Value$Json$Encode$encode, values);
		default:
			var kvPairs = value.a;
			return elm$json$Json$Encode$object(
				A2(
					elm$core$List$map,
					elm$core$Tuple$mapSecond(jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Value$Json$Encode$encode),
					kvPairs));
	}
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$variableValuesToJson = function (kvPairs) {
	return elm$core$List$isEmpty(kvPairs) ? elm$core$Maybe$Nothing : elm$core$Maybe$Just(
		elm$json$Json$Encode$object(
			A2(
				elm$core$List$map,
				elm$core$Tuple$mapSecond(jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Value$Json$Encode$encode),
				kvPairs)));
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$jsonVariableValues = function (_n0) {
	var variableValues = _n0.a.variableValues;
	return jamesmacaulay$elm_graphql$GraphQL$Request$Builder$variableValuesToJson(variableValues);
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$requestBody = function (_n0) {
	var requestRecord = _n0.a;
	return requestRecord.documentString;
};
var jamesmacaulay$elm_graphql$GraphQL$Client$Http$sendExpecting = F3(
	function (expect, requestOptions, request) {
		var variableValues = jamesmacaulay$elm_graphql$GraphQL$Request$Builder$jsonVariableValues(request);
		var documentString = jamesmacaulay$elm_graphql$GraphQL$Request$Builder$requestBody(request);
		return A2(
			elm$core$Task$mapError,
			A2(jamesmacaulay$elm_graphql$GraphQL$Client$Http$Util$convertHttpError, jamesmacaulay$elm_graphql$GraphQL$Client$Http$HttpError, jamesmacaulay$elm_graphql$GraphQL$Client$Http$GraphQLError),
			elm$http$Http$toTask(
				elm$http$Http$request(
					A4(jamesmacaulay$elm_graphql$GraphQL$Client$Http$Util$requestConfig, requestOptions, documentString, expect, variableValues))));
	});
var elm$http$Http$expectStringResponse = _Http_expectStringResponse;
var elm$http$Http$expectJson = function (decoder) {
	return elm$http$Http$expectStringResponse(
		function (response) {
			var _n0 = A2(elm$json$Json$Decode$decodeString, decoder, response.body);
			if (_n0.$ === 'Err') {
				var decodeError = _n0.a;
				return elm$core$Result$Err(
					elm$json$Json$Decode$errorToString(decodeError));
			} else {
				var value = _n0.a;
				return elm$core$Result$Ok(value);
			}
		});
};
var jamesmacaulay$elm_graphql$GraphQL$Client$Http$Util$defaultExpect = A2(
	elm$core$Basics$composeL,
	elm$http$Http$expectJson,
	elm$json$Json$Decode$field('data'));
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$responseDataDecoder = function (_n0) {
	var requestRecord = _n0.a;
	return requestRecord.responseDataDecoder;
};
var jamesmacaulay$elm_graphql$GraphQL$Client$Http$send = F2(
	function (options, request) {
		var expect = jamesmacaulay$elm_graphql$GraphQL$Client$Http$Util$defaultExpect(
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$responseDataDecoder(request));
		return A3(jamesmacaulay$elm_graphql$GraphQL$Client$Http$sendExpecting, expect, options, request);
	});
var jamesmacaulay$elm_graphql$GraphQL$Client$Http$customSendQuery = jamesmacaulay$elm_graphql$GraphQL$Client$Http$send;
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Request = function (a) {
	return {$: 'Request', a: a};
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$specDecoder = function (_n0) {
	var sourceType = _n0.a;
	var decoderFromSelectionSet = _n0.b;
	return decoderFromSelectionSet(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$selectionSetFromSourceType(sourceType));
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$documentResponseDecoder = function (_n0) {
	var operation = _n0.a.operation;
	var _n1 = operation;
	var spec = _n1.a.spec;
	return jamesmacaulay$elm_graphql$GraphQL$Request$Builder$specDecoder(spec);
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$documentVariables = function (_n0) {
	var operation = _n0.a.operation;
	var _n1 = operation;
	var spec = _n1.a.spec;
	var _n2 = spec;
	var vars = _n2.c;
	return vars;
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$valueFromSource = F2(
	function (source, _var) {
		if (_var.$ === 'RequiredVariable') {
			var f = _var.c;
			return elm$core$Maybe$Just(
				_Utils_Tuple2(
					jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$name(_var),
					f(source)));
		} else {
			var f = _var.c;
			var _n1 = f(source);
			if (_n1.$ === 'Nothing') {
				return elm$core$Maybe$Nothing;
			} else {
				var value = _n1.a;
				return elm$core$Maybe$Just(
					_Utils_Tuple2(
						jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$name(_var),
						value));
			}
		}
	});
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$extractValuesFrom = F2(
	function (source, vars) {
		return A2(
			elm$core$List$filterMap,
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$valueFromSource(source),
			vars);
	});
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$request = F2(
	function (vars, doc) {
		var operation = doc.a.operation;
		var ast = doc.a.ast;
		var serialized = doc.a.serialized;
		return jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Request(
			{
				documentAST: ast,
				documentString: serialized,
				responseDataDecoder: jamesmacaulay$elm_graphql$GraphQL$Request$Builder$documentResponseDecoder(doc),
				variableValues: A2(
					jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$extractValuesFrom,
					vars,
					jamesmacaulay$elm_graphql$GraphQL$Request$Builder$documentVariables(doc))
			});
	});
var author$project$GitHubGraph$fetchPullRequest = F2(
	function (token, id) {
		return A2(
			jamesmacaulay$elm_graphql$GraphQL$Client$Http$customSendQuery,
			author$project$GitHubGraph$authedOptions(token),
			A2(
				jamesmacaulay$elm_graphql$GraphQL$Request$Builder$request,
				{id: id},
				A2(author$project$GitHubGraph$objectQuery, 'PullRequest', author$project$GitHubGraph$prObject)));
	});
var author$project$Main$PullRequestFetched = function (a) {
	return {$: 'PullRequestFetched', a: a};
};
var elm$core$Task$Perform = function (a) {
	return {$: 'Perform', a: a};
};
var elm$core$Task$andThen = _Scheduler_andThen;
var elm$core$Task$succeed = _Scheduler_succeed;
var elm$core$Task$init = elm$core$Task$succeed(_Utils_Tuple0);
var elm$core$Task$map = F2(
	function (func, taskA) {
		return A2(
			elm$core$Task$andThen,
			function (a) {
				return elm$core$Task$succeed(
					func(a));
			},
			taskA);
	});
var elm$core$Task$map2 = F3(
	function (func, taskA, taskB) {
		return A2(
			elm$core$Task$andThen,
			function (a) {
				return A2(
					elm$core$Task$andThen,
					function (b) {
						return elm$core$Task$succeed(
							A2(func, a, b));
					},
					taskB);
			},
			taskA);
	});
var elm$core$Task$sequence = function (tasks) {
	return A3(
		elm$core$List$foldr,
		elm$core$Task$map2(elm$core$List$cons),
		elm$core$Task$succeed(_List_Nil),
		tasks);
};
var elm$core$Platform$sendToApp = _Platform_sendToApp;
var elm$core$Task$spawnCmd = F2(
	function (router, _n0) {
		var task = _n0.a;
		return _Scheduler_spawn(
			A2(
				elm$core$Task$andThen,
				elm$core$Platform$sendToApp(router),
				task));
	});
var elm$core$Task$onEffects = F3(
	function (router, commands, state) {
		return A2(
			elm$core$Task$map,
			function (_n0) {
				return _Utils_Tuple0;
			},
			elm$core$Task$sequence(
				A2(
					elm$core$List$map,
					elm$core$Task$spawnCmd(router),
					commands)));
	});
var elm$core$Task$onSelfMsg = F3(
	function (_n0, _n1, _n2) {
		return elm$core$Task$succeed(_Utils_Tuple0);
	});
var elm$core$Task$cmdMap = F2(
	function (tagger, _n0) {
		var task = _n0.a;
		return elm$core$Task$Perform(
			A2(elm$core$Task$map, tagger, task));
	});
_Platform_effectManagers['Task'] = _Platform_createManager(elm$core$Task$init, elm$core$Task$onEffects, elm$core$Task$onSelfMsg, elm$core$Task$cmdMap);
var elm$core$Task$command = _Platform_leaf('Task');
var elm$core$Task$attempt = F2(
	function (resultToMessage, task) {
		return elm$core$Task$command(
			elm$core$Task$Perform(
				A2(
					elm$core$Task$onError,
					A2(
						elm$core$Basics$composeL,
						A2(elm$core$Basics$composeL, elm$core$Task$succeed, resultToMessage),
						elm$core$Result$Err),
					A2(
						elm$core$Task$andThen,
						A2(
							elm$core$Basics$composeL,
							A2(elm$core$Basics$composeL, elm$core$Task$succeed, resultToMessage),
							elm$core$Result$Ok),
						task))));
	});
var author$project$Main$fetchPullRequest = F2(
	function (model, id) {
		return A2(
			elm$core$Task$attempt,
			author$project$Main$PullRequestFetched,
			A2(author$project$GitHubGraph$fetchPullRequest, model.githubToken, id));
	});
var author$project$Main$decodeAndFetchPRForCommit = F2(
	function (payload, model) {
		var _n0 = A2(
			elm$json$Json$Decode$decodeValue,
			A2(elm$json$Json$Decode$field, 'sha', elm$json$Json$Decode$string),
			payload);
		if (_n0.$ === 'Ok') {
			var sha = _n0.a;
			var _n1 = A2(elm$core$Dict$get, sha, model.commitPRs);
			if (_n1.$ === 'Just') {
				var id = _n1.a;
				return A3(
					author$project$Log$debug,
					'refreshing pr for commit',
					_Utils_Tuple2(sha, id),
					_Utils_update(
						model,
						{
							loadQueue: A2(
								elm$core$List$cons,
								A2(author$project$Main$fetchPullRequest, model, id),
								model.loadQueue)
						}));
			} else {
				return A3(author$project$Log$debug, 'no associated pr to refresh', sha, model);
			}
		} else {
			var err = _n0.a;
			return A3(
				author$project$Log$debug,
				'failed to decode sha',
				_Utils_Tuple2(err, payload),
				model);
		}
	});
var author$project$GitHubGraph$RepoSelector = F2(
	function (owner, name) {
		return {name: name, owner: owner};
	});
var author$project$Main$decodeRepoSelector = A2(
	elm_community$json_extra$Json$Decode$Extra$andMap,
	A2(
		elm$json$Json$Decode$at,
		_List_fromArray(
			['repository', 'name']),
		elm$json$Json$Decode$string),
	A2(
		elm_community$json_extra$Json$Decode$Extra$andMap,
		A2(
			elm$json$Json$Decode$at,
			_List_fromArray(
				['repository', 'owner', 'login']),
			elm$json$Json$Decode$string),
		elm$json$Json$Decode$succeed(author$project$GitHubGraph$RepoSelector)));
var author$project$GitHubGraph$Repo = F8(
	function (id, url, owner, name, isArchived, labels, milestones, releases) {
		return {id: id, isArchived: isArchived, labels: labels, milestones: milestones, name: name, owner: owner, releases: releases, url: url};
	});
var author$project$GitHubGraph$Release = F4(
	function (id, url, name, tag) {
		return {id: id, name: name, tag: tag, url: url};
	});
var author$project$GitHubGraph$Tag = F2(
	function (name, target) {
		return {name: name, target: target};
	});
var author$project$GitHubGraph$GitObject = F2(
	function (url, oid) {
		return {oid: oid, url: url};
	});
var author$project$GitHubGraph$gitObjectObject = A2(
	jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
	A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'oid', _List_Nil, jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string),
	A2(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
		A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'commitUrl', _List_Nil, jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string),
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$object(author$project$GitHubGraph$GitObject)));
var author$project$GitHubGraph$tagObject = A2(
	jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
	A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'target', _List_Nil, author$project$GitHubGraph$gitObjectObject),
	A2(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
		A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'name', _List_Nil, jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string),
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$object(author$project$GitHubGraph$Tag)));
var author$project$GitHubGraph$releaseObject = A2(
	jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
	A3(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
		'tag',
		_List_Nil,
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$nullable(author$project$GitHubGraph$tagObject)),
	A2(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
		A3(
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
			'name',
			_List_Nil,
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$nullable(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string)),
		A2(
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
			A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'url', _List_Nil, jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string),
			A2(
				jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
				A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'id', _List_Nil, jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string),
				jamesmacaulay$elm_graphql$GraphQL$Request$Builder$object(author$project$GitHubGraph$Release)))));
var elm$json$Json$Decode$bool = _Json_decodeBool;
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$BooleanType = {$: 'BooleanType'};
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$bool = A2(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$primitiveSpec, jamesmacaulay$elm_graphql$GraphQL$Request$Builder$BooleanType, elm$json$Json$Decode$bool);
var jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$EnumValue = function (a) {
	return {$: 'EnumValue', a: a};
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$enum = function (symbol) {
	return A2(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$Value,
		jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$EnumValue(symbol),
		_List_Nil);
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$valueVariablesFoldStep = A2(elm$core$Basics$composeR, jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$getVariables, jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$Util$mergeVariables);
var jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$ObjectValue = function (a) {
	return {$: 'ObjectValue', a: a};
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$object = function (pairs) {
	return A2(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$Value,
		jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$ObjectValue(
			A2(
				elm$core$List$map,
				function (_n0) {
					var k = _n0.a;
					var _n1 = _n0.b;
					var ast = _n1.a;
					return _Utils_Tuple2(k, ast);
				},
				pairs)),
		A3(
			elm$core$List$foldr,
			A2(elm$core$Basics$composeR, elm$core$Tuple$second, jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$valueVariablesFoldStep),
			_List_Nil,
			pairs));
};
var author$project$GitHubGraph$repoObject = A2(
	jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
	A3(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
		'releases',
		_List_fromArray(
			[
				_Utils_Tuple2(
				'first',
				jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$int(100)),
				_Utils_Tuple2(
				'orderBy',
				jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$object(
					_List_fromArray(
						[
							_Utils_Tuple2(
							'field',
							jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$enum('CREATED_AT')),
							_Utils_Tuple2(
							'direction',
							jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$enum('DESC'))
						])))
			]),
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$extract(
			A3(
				jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
				'nodes',
				_List_Nil,
				jamesmacaulay$elm_graphql$GraphQL$Request$Builder$list(author$project$GitHubGraph$releaseObject)))),
	A2(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
		A3(
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
			'milestones',
			_List_fromArray(
				[
					_Utils_Tuple2(
					'first',
					jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$int(100))
				]),
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$extract(
				A3(
					jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
					'nodes',
					_List_Nil,
					jamesmacaulay$elm_graphql$GraphQL$Request$Builder$list(author$project$GitHubGraph$milestoneObject)))),
		A2(
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
			A3(
				jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
				'labels',
				_List_fromArray(
					[
						_Utils_Tuple2(
						'first',
						jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$int(100))
					]),
				jamesmacaulay$elm_graphql$GraphQL$Request$Builder$extract(
					A3(
						jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
						'nodes',
						_List_Nil,
						jamesmacaulay$elm_graphql$GraphQL$Request$Builder$list(author$project$GitHubGraph$labelObject)))),
			A2(
				jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
				A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'isArchived', _List_Nil, jamesmacaulay$elm_graphql$GraphQL$Request$Builder$bool),
				A2(
					jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
					A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'name', _List_Nil, jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string),
					A2(
						jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
						A3(
							jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
							'owner',
							_List_Nil,
							jamesmacaulay$elm_graphql$GraphQL$Request$Builder$extract(
								A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'login', _List_Nil, jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string))),
						A2(
							jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
							A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'url', _List_Nil, jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string),
							A2(
								jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
								A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'id', _List_Nil, jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string),
								jamesmacaulay$elm_graphql$GraphQL$Request$Builder$object(author$project$GitHubGraph$Repo)))))))));
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$TypeRef$string = jamesmacaulay$elm_graphql$GraphQL$Request$Builder$TypeRef$namedType('String');
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$string = A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$VariableSpec, jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$NonNull, jamesmacaulay$elm_graphql$GraphQL$Request$Builder$TypeRef$string, jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$StringValue);
var author$project$GitHubGraph$repoQuery = function () {
	var ownerVar = A3(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$required,
		'owner',
		function ($) {
			return $.owner;
		},
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$string);
	var nameVar = A3(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$required,
		'name',
		function ($) {
			return $.name;
		},
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$string);
	var queryRoot = jamesmacaulay$elm_graphql$GraphQL$Request$Builder$extract(
		A3(
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
			'repository',
			_List_fromArray(
				[
					_Utils_Tuple2(
					'owner',
					jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$variable(ownerVar)),
					_Utils_Tuple2(
					'name',
					jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$variable(nameVar))
				]),
			author$project$GitHubGraph$repoObject));
	return jamesmacaulay$elm_graphql$GraphQL$Request$Builder$queryDocument(queryRoot);
}();
var author$project$GitHubGraph$fetchRepo = F2(
	function (token, repo) {
		return A2(
			jamesmacaulay$elm_graphql$GraphQL$Client$Http$customSendQuery,
			author$project$GitHubGraph$authedOptions(token),
			A2(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$request, repo, author$project$GitHubGraph$repoQuery));
	});
var author$project$Main$RepositoryFetched = function (a) {
	return {$: 'RepositoryFetched', a: a};
};
var author$project$Main$fetchRepo = F2(
	function (model, sel) {
		return A2(
			elm$core$Task$attempt,
			author$project$Main$RepositoryFetched,
			A2(author$project$GitHubGraph$fetchRepo, model.githubToken, sel));
	});
var author$project$Main$decodeAndFetchRepo = F2(
	function (payload, model) {
		var _n0 = A2(elm$json$Json$Decode$decodeValue, author$project$Main$decodeRepoSelector, payload);
		if (_n0.$ === 'Ok') {
			var sel = _n0.a;
			return _Utils_update(
				model,
				{
					loadQueue: A2(
						elm$core$List$cons,
						A2(author$project$Main$fetchRepo, model, sel),
						model.loadQueue)
				});
		} else {
			var err = _n0.a;
			return A3(
				author$project$Log$debug,
				'failed to decode repo',
				_Utils_Tuple2(err, payload),
				model);
		}
	});
var author$project$Main$eventActor = function (event) {
	switch (event.$) {
		case 'IssueCommentEvent':
			var muser = event.a;
			var date = event.b;
			if (muser.$ === 'Just') {
				var user = muser.a;
				return elm$core$Maybe$Just(
					{
						avatar: user.avatar,
						createdAt: date,
						user: elm$core$Maybe$Just(user)
					});
			} else {
				return elm$core$Maybe$Nothing;
			}
		case 'CommitEvent':
			var commit = event.a;
			var _n2 = _Utils_Tuple2(commit.author, commit.committer);
			if (_n2.a.$ === 'Just') {
				if (_n2.b.$ === 'Just') {
					var author = _n2.a.a;
					var committer = _n2.b.a;
					var _n3 = author.user;
					if (_n3.$ === 'Just') {
						return elm$core$Maybe$Just(
							{avatar: author.avatar, createdAt: commit.committedAt, user: author.user});
					} else {
						return elm$core$Maybe$Just(
							{avatar: committer.avatar, createdAt: commit.committedAt, user: committer.user});
					}
				} else {
					var author = _n2.a.a;
					var _n5 = _n2.b;
					return elm$core$Maybe$Just(
						{avatar: author.avatar, createdAt: commit.committedAt, user: author.user});
				}
			} else {
				if (_n2.b.$ === 'Just') {
					var _n4 = _n2.a;
					var committer = _n2.b.a;
					return elm$core$Maybe$Just(
						{avatar: committer.avatar, createdAt: commit.committedAt, user: committer.user});
				} else {
					var _n6 = _n2.a;
					var _n7 = _n2.b;
					return elm$core$Maybe$Nothing;
				}
			}
		default:
			return elm$core$Maybe$Nothing;
	}
};
var author$project$GitHubGraph$PageInfo = F2(
	function (endCursor, hasNextPage) {
		return {endCursor: endCursor, hasNextPage: hasNextPage};
	});
var author$project$GitHubGraph$PagedResult = F2(
	function (content, pageInfo) {
		return {content: content, pageInfo: pageInfo};
	});
var author$project$GitHubGraph$IssueCardContent = function (a) {
	return {$: 'IssueCardContent', a: a};
};
var author$project$GitHubGraph$ProjectColumnCard = F4(
	function (id, url, content, note) {
		return {content: content, id: id, note: note, url: url};
	});
var author$project$GitHubGraph$PullRequestCardContent = function (a) {
	return {$: 'PullRequestCardContent', a: a};
};
var author$project$GitHubGraph$Issue = function (id) {
	return function (url) {
		return function (createdAt) {
			return function (updatedAt) {
				return function (state) {
					return function (repo) {
						return function (number) {
							return function (title) {
								return function (commentCount) {
									return function (reactions) {
										return function (author) {
											return function (labels) {
												return function (cards) {
													return function (milestone) {
														return {author: author, cards: cards, commentCount: commentCount, createdAt: createdAt, id: id, labels: labels, milestone: milestone, number: number, reactions: reactions, repo: repo, state: state, title: title, updatedAt: updatedAt, url: url};
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
var author$project$GitHubGraph$issueObject = A2(
	jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
	A3(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
		'milestone',
		_List_Nil,
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$nullable(author$project$GitHubGraph$milestoneObject)),
	A2(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
		A3(
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
			'projectCards',
			_List_fromArray(
				[
					_Utils_Tuple2(
					'first',
					jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$int(10))
				]),
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$extract(
				A3(
					jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
					'nodes',
					_List_Nil,
					author$project$GitHubGraph$nullableList(author$project$GitHubGraph$projectCardObject)))),
		A2(
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
			A3(
				jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
				'labels',
				_List_fromArray(
					[
						_Utils_Tuple2(
						'first',
						jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$int(10))
					]),
				jamesmacaulay$elm_graphql$GraphQL$Request$Builder$extract(
					A3(
						jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
						'nodes',
						_List_Nil,
						jamesmacaulay$elm_graphql$GraphQL$Request$Builder$list(author$project$GitHubGraph$labelObject)))),
			A2(
				jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
				A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'author', _List_Nil, author$project$GitHubGraph$authorObject),
				A2(
					jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
					A3(
						jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
						'reactionGroups',
						_List_Nil,
						jamesmacaulay$elm_graphql$GraphQL$Request$Builder$list(author$project$GitHubGraph$reactionGroupObject)),
					A2(
						jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
						A3(
							jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
							'comments',
							_List_Nil,
							jamesmacaulay$elm_graphql$GraphQL$Request$Builder$extract(
								A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'totalCount', _List_Nil, jamesmacaulay$elm_graphql$GraphQL$Request$Builder$int))),
						A2(
							jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
							A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'title', _List_Nil, jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string),
							A2(
								jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
								A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'number', _List_Nil, jamesmacaulay$elm_graphql$GraphQL$Request$Builder$int),
								A2(
									jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
									A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'repository', _List_Nil, author$project$GitHubGraph$repoLocationObject),
									A2(
										jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
										A2(
											jamesmacaulay$elm_graphql$GraphQL$Request$Builder$aliasAs,
											'issueState',
											A3(
												jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
												'state',
												_List_Nil,
												jamesmacaulay$elm_graphql$GraphQL$Request$Builder$enum(author$project$GitHubGraph$issueStates))),
										A2(
											jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
											A3(
												jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
												'updatedAt',
												_List_Nil,
												A2(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$customScalar, author$project$GitHubGraph$DateType, elm_community$json_extra$Json$Decode$Extra$datetime)),
											A2(
												jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
												A3(
													jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
													'createdAt',
													_List_Nil,
													A2(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$customScalar, author$project$GitHubGraph$DateType, elm_community$json_extra$Json$Decode$Extra$datetime)),
												A2(
													jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
													A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'url', _List_Nil, jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string),
													A2(
														jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
														A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'id', _List_Nil, jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string),
														jamesmacaulay$elm_graphql$GraphQL$Request$Builder$object(author$project$GitHubGraph$Issue)))))))))))))));
var author$project$GitHubGraph$projectColumnCardObject = function () {
	var content = A2(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
		A2(
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$inlineFragment,
			elm$core$Maybe$Just(
				jamesmacaulay$elm_graphql$GraphQL$Request$Builder$onType('PullRequest')),
			A2(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$map, author$project$GitHubGraph$PullRequestCardContent, author$project$GitHubGraph$prObject)),
		A2(
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
			A2(
				jamesmacaulay$elm_graphql$GraphQL$Request$Builder$inlineFragment,
				elm$core$Maybe$Just(
					jamesmacaulay$elm_graphql$GraphQL$Request$Builder$onType('Issue')),
				A2(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$map, author$project$GitHubGraph$IssueCardContent, author$project$GitHubGraph$issueObject)),
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$object(author$project$GitHubGraph$pickEnum2)));
	return A2(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
		A3(
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
			'note',
			_List_Nil,
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$nullable(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string)),
		A2(
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
			A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'content', _List_Nil, content),
			A2(
				jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
				A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'url', _List_Nil, jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string),
				A2(
					jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
					A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'id', _List_Nil, jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string),
					jamesmacaulay$elm_graphql$GraphQL$Request$Builder$object(author$project$GitHubGraph$ProjectColumnCard)))));
}();
var jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Nullable = {$: 'Nullable'};
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$TypeRef$nullable = function (_n0) {
	var coreTypeRef = _n0.b;
	return A2(jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$TypeRef, jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Nullable, coreTypeRef);
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$Nullable = {$: 'Nullable'};
var jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$NullValue = {$: 'NullValue'};
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$nullable = function (_n0) {
	var _n1 = _n0.a;
	var typeRef = _n0.b;
	var convert = _n0.c;
	return A3(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$VariableSpec,
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$Nullable,
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$TypeRef$nullable(typeRef),
		A2(
			elm$core$Basics$composeR,
			elm$core$Maybe$map(convert),
			elm$core$Maybe$withDefault(jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$NullValue)));
};
var author$project$GitHubGraph$cardsQuery = function () {
	var pageInfo = A2(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
		A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'hasNextPage', _List_Nil, jamesmacaulay$elm_graphql$GraphQL$Request$Builder$bool),
		A2(
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
			A3(
				jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
				'endCursor',
				_List_Nil,
				jamesmacaulay$elm_graphql$GraphQL$Request$Builder$nullable(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string)),
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$object(author$project$GitHubGraph$PageInfo)));
	var paged = A2(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
		A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'pageInfo', _List_Nil, pageInfo),
		A2(
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
			A3(
				jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
				'nodes',
				_List_Nil,
				jamesmacaulay$elm_graphql$GraphQL$Request$Builder$list(author$project$GitHubGraph$projectColumnCardObject)),
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$object(author$project$GitHubGraph$PagedResult)));
	var idVar = A3(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$required,
		'id',
		A2(
			elm$core$Basics$composeL,
			function ($) {
				return $.id;
			},
			function ($) {
				return $.selector;
			}),
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$id);
	var afterVar = A3(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$required,
		'after',
		function ($) {
			return $.after;
		},
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$nullable(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$string));
	var pageArgs = _List_fromArray(
		[
			_Utils_Tuple2(
			'first',
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$int(100)),
			_Utils_Tuple2(
			'after',
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$variable(afterVar))
		]);
	var cards = jamesmacaulay$elm_graphql$GraphQL$Request$Builder$extract(
		A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'cards', pageArgs, paged));
	var queryRoot = jamesmacaulay$elm_graphql$GraphQL$Request$Builder$extract(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$assume(
			A3(
				jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
				'node',
				_List_fromArray(
					[
						_Utils_Tuple2(
						'id',
						jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$variable(idVar))
					]),
				jamesmacaulay$elm_graphql$GraphQL$Request$Builder$extract(
					A2(
						jamesmacaulay$elm_graphql$GraphQL$Request$Builder$inlineFragment,
						elm$core$Maybe$Just(
							jamesmacaulay$elm_graphql$GraphQL$Request$Builder$onType('ProjectColumn')),
						cards)))));
	return jamesmacaulay$elm_graphql$GraphQL$Request$Builder$queryDocument(queryRoot);
}();
var author$project$GitHubGraph$fetchPaged = F3(
	function (doc, token, psel) {
		var fetchNextPage = function (_n0) {
			var content = _n0.content;
			var pageInfo = _n0.pageInfo;
			return pageInfo.hasNextPage ? A2(
				elm$core$Task$map,
				elm$core$Basics$append(content),
				A3(
					author$project$GitHubGraph$fetchPaged,
					doc,
					token,
					_Utils_update(
						psel,
						{after: pageInfo.endCursor}))) : elm$core$Task$succeed(content);
		};
		return A2(
			elm$core$Task$andThen,
			fetchNextPage,
			A2(
				jamesmacaulay$elm_graphql$GraphQL$Client$Http$customSendQuery,
				author$project$GitHubGraph$authedOptions(token),
				A2(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$request, psel, doc)));
	});
var author$project$GitHubGraph$fetchProjectColumnCards = F2(
	function (token, col) {
		return A3(
			author$project$GitHubGraph$fetchPaged,
			author$project$GitHubGraph$cardsQuery,
			token,
			{after: elm$core$Maybe$Nothing, selector: col});
	});
var author$project$Main$CardsFetched = F2(
	function (a, b) {
		return {$: 'CardsFetched', a: a, b: b};
	});
var author$project$Main$fetchCards = F2(
	function (model, colId) {
		return A2(
			elm$core$Task$attempt,
			author$project$Main$CardsFetched(colId),
			A2(
				author$project$GitHubGraph$fetchProjectColumnCards,
				model.githubToken,
				{id: colId}));
	});
var author$project$GitHubGraph$V3Comparison = F9(
	function (url, status, baseCommit, mergeBaseCommit, aheadBy, behindBy, totalCommits, commits, files) {
		return {aheadBy: aheadBy, baseCommit: baseCommit, behindBy: behindBy, commits: commits, files: files, mergeBaseCommit: mergeBaseCommit, status: status, totalCommits: totalCommits, url: url};
	});
var author$project$GitHubGraph$V3Commit = F2(
	function (url, sha) {
		return {sha: sha, url: url};
	});
var author$project$GitHubGraph$decodeV3Commit = A2(
	elm_community$json_extra$Json$Decode$Extra$andMap,
	A2(elm$json$Json$Decode$field, 'sha', elm$json$Json$Decode$string),
	A2(
		elm_community$json_extra$Json$Decode$Extra$andMap,
		A2(elm$json$Json$Decode$field, 'html_url', elm$json$Json$Decode$string),
		elm$json$Json$Decode$succeed(author$project$GitHubGraph$V3Commit)));
var author$project$GitHubGraph$V3File = F3(
	function (sha, filename, status) {
		return {filename: filename, sha: sha, status: status};
	});
var author$project$GitHubGraph$decodeV3File = A2(
	elm_community$json_extra$Json$Decode$Extra$andMap,
	A2(elm$json$Json$Decode$field, 'status', elm$json$Json$Decode$string),
	A2(
		elm_community$json_extra$Json$Decode$Extra$andMap,
		A2(elm$json$Json$Decode$field, 'filename', elm$json$Json$Decode$string),
		A2(
			elm_community$json_extra$Json$Decode$Extra$andMap,
			A2(elm$json$Json$Decode$field, 'sha', elm$json$Json$Decode$string),
			elm$json$Json$Decode$succeed(author$project$GitHubGraph$V3File))));
var author$project$GitHubGraph$decodeV3Comparison = A2(
	elm_community$json_extra$Json$Decode$Extra$andMap,
	A2(
		elm$json$Json$Decode$field,
		'files',
		elm$json$Json$Decode$list(author$project$GitHubGraph$decodeV3File)),
	A2(
		elm_community$json_extra$Json$Decode$Extra$andMap,
		A2(
			elm$json$Json$Decode$field,
			'commits',
			elm$json$Json$Decode$list(author$project$GitHubGraph$decodeV3Commit)),
		A2(
			elm_community$json_extra$Json$Decode$Extra$andMap,
			A2(elm$json$Json$Decode$field, 'total_commits', elm$json$Json$Decode$int),
			A2(
				elm_community$json_extra$Json$Decode$Extra$andMap,
				A2(elm$json$Json$Decode$field, 'behind_by', elm$json$Json$Decode$int),
				A2(
					elm_community$json_extra$Json$Decode$Extra$andMap,
					A2(elm$json$Json$Decode$field, 'ahead_by', elm$json$Json$Decode$int),
					A2(
						elm_community$json_extra$Json$Decode$Extra$andMap,
						A2(elm$json$Json$Decode$field, 'merge_base_commit', author$project$GitHubGraph$decodeV3Commit),
						A2(
							elm_community$json_extra$Json$Decode$Extra$andMap,
							A2(elm$json$Json$Decode$field, 'base_commit', author$project$GitHubGraph$decodeV3Commit),
							A2(
								elm_community$json_extra$Json$Decode$Extra$andMap,
								A2(elm$json$Json$Decode$field, 'status', elm$json$Json$Decode$string),
								A2(
									elm_community$json_extra$Json$Decode$Extra$andMap,
									A2(elm$json$Json$Decode$field, 'html_url', elm$json$Json$Decode$string),
									elm$json$Json$Decode$succeed(author$project$GitHubGraph$V3Comparison))))))))));
var lukewestby$elm_http_builder$HttpBuilder$requestWithMethodAndUrl = F2(
	function (method, url) {
		return {
			body: elm$http$Http$emptyBody,
			cacheBuster: elm$core$Maybe$Nothing,
			expect: elm$http$Http$expectStringResponse(
				function (_n0) {
					return elm$core$Result$Ok(_Utils_Tuple0);
				}),
			headers: _List_Nil,
			method: method,
			queryParams: _List_Nil,
			timeout: elm$core$Maybe$Nothing,
			url: url,
			withCredentials: false
		};
	});
var lukewestby$elm_http_builder$HttpBuilder$get = lukewestby$elm_http_builder$HttpBuilder$requestWithMethodAndUrl('GET');
var lukewestby$elm_http_builder$HttpBuilder$replace = F2(
	function (old, _new) {
		return A2(
			elm$core$Basics$composeR,
			elm$core$String$split(old),
			elm$core$String$join(_new));
	});
var lukewestby$elm_http_builder$HttpBuilder$queryEscape = A2(
	elm$core$Basics$composeR,
	elm$url$Url$percentEncode,
	A2(lukewestby$elm_http_builder$HttpBuilder$replace, '%20', '+'));
var lukewestby$elm_http_builder$HttpBuilder$queryPair = function (_n0) {
	var key = _n0.a;
	var value = _n0.b;
	return lukewestby$elm_http_builder$HttpBuilder$queryEscape(key) + ('=' + lukewestby$elm_http_builder$HttpBuilder$queryEscape(value));
};
var lukewestby$elm_http_builder$HttpBuilder$joinUrlEncoded = function (args) {
	return A2(
		elm$core$String$join,
		'&',
		A2(elm$core$List$map, lukewestby$elm_http_builder$HttpBuilder$queryPair, args));
};
var lukewestby$elm_http_builder$HttpBuilder$requestUrl = function (builder) {
	var encodedParams = lukewestby$elm_http_builder$HttpBuilder$joinUrlEncoded(builder.queryParams);
	var fullUrl = elm$core$String$isEmpty(encodedParams) ? builder.url : (builder.url + ('?' + encodedParams));
	return fullUrl;
};
var lukewestby$elm_http_builder$HttpBuilder$toRequest = function (builder) {
	return elm$http$Http$request(
		{
			body: builder.body,
			expect: builder.expect,
			headers: builder.headers,
			method: builder.method,
			timeout: builder.timeout,
			url: lukewestby$elm_http_builder$HttpBuilder$requestUrl(builder),
			withCredentials: builder.withCredentials
		});
};
var lukewestby$elm_http_builder$HttpBuilder$toTaskPlain = function (builder) {
	return elm$http$Http$toTask(
		lukewestby$elm_http_builder$HttpBuilder$toRequest(builder));
};
var elm$time$Time$Name = function (a) {
	return {$: 'Name', a: a};
};
var elm$time$Time$Offset = function (a) {
	return {$: 'Offset', a: a};
};
var elm$time$Time$customZone = elm$time$Time$Zone;
var elm$time$Time$now = _Time_now(elm$time$Time$millisToPosix);
var lukewestby$elm_http_builder$HttpBuilder$withQueryParams = F2(
	function (queryParams, builder) {
		return _Utils_update(
			builder,
			{
				queryParams: _Utils_ap(builder.queryParams, queryParams)
			});
	});
var lukewestby$elm_http_builder$HttpBuilder$toTaskWithCacheBuster = F2(
	function (paramName, builder) {
		var request = function (timestamp) {
			return lukewestby$elm_http_builder$HttpBuilder$toTaskPlain(
				A2(
					lukewestby$elm_http_builder$HttpBuilder$withQueryParams,
					_List_fromArray(
						[
							_Utils_Tuple2(
							paramName,
							elm$core$String$fromInt(
								elm$time$Time$posixToMillis(timestamp)))
						]),
					builder));
		};
		return A2(elm$core$Task$andThen, request, elm$time$Time$now);
	});
var lukewestby$elm_http_builder$HttpBuilder$toTask = function (builder) {
	var _n0 = builder.cacheBuster;
	if (_n0.$ === 'Just') {
		var paramName = _n0.a;
		return A2(lukewestby$elm_http_builder$HttpBuilder$toTaskWithCacheBuster, paramName, builder);
	} else {
		return lukewestby$elm_http_builder$HttpBuilder$toTaskPlain(builder);
	}
};
var lukewestby$elm_http_builder$HttpBuilder$withExpectJson = F2(
	function (decoder, builder) {
		return {
			body: builder.body,
			cacheBuster: builder.cacheBuster,
			expect: elm$http$Http$expectJson(decoder),
			headers: builder.headers,
			method: builder.method,
			queryParams: builder.queryParams,
			timeout: builder.timeout,
			url: builder.url,
			withCredentials: builder.withCredentials
		};
	});
var lukewestby$elm_http_builder$HttpBuilder$withHeaders = F2(
	function (headerPairs, builder) {
		return _Utils_update(
			builder,
			{
				headers: _Utils_ap(
					A2(
						elm$core$List$map,
						function (_n0) {
							var key = _n0.a;
							var value = _n0.b;
							return A2(elm$http$Http$header, key, value);
						},
						headerPairs),
					builder.headers)
			});
	});
var author$project$GitHubGraph$compareRepoRefs = F4(
	function (token, repo, base, mergeBase) {
		return A2(
			elm$core$Task$mapError,
			jamesmacaulay$elm_graphql$GraphQL$Client$Http$HttpError,
			lukewestby$elm_http_builder$HttpBuilder$toTask(
				A2(
					lukewestby$elm_http_builder$HttpBuilder$withExpectJson,
					author$project$GitHubGraph$decodeV3Comparison,
					A2(
						lukewestby$elm_http_builder$HttpBuilder$withHeaders,
						author$project$GitHubGraph$auth(token),
						lukewestby$elm_http_builder$HttpBuilder$get('https://api.github.com/repos/' + (repo.owner + ('/' + (repo.name + ('/compare/' + (base + ('...' + mergeBase)))))))))));
	});
var author$project$Main$ComparisonFetched = F2(
	function (a, b) {
		return {$: 'ComparisonFetched', a: a, b: b};
	});
var author$project$Main$fetchComparison = F2(
	function (model, repo) {
		var findTag = function (releases) {
			findTag:
			while (true) {
				if (!releases.b) {
					return 'HEAD';
				} else {
					var release = releases.a;
					var rest = releases.b;
					var _n1 = release.tag;
					if (_n1.$ === 'Just') {
						var t = _n1.a;
						return t.name;
					} else {
						var $temp$releases = rest;
						releases = $temp$releases;
						continue findTag;
					}
				}
			}
		};
		var base = findTag(repo.releases);
		return A2(
			elm$core$Task$attempt,
			author$project$Main$ComparisonFetched(repo),
			A4(
				author$project$GitHubGraph$compareRepoRefs,
				model.githubToken,
				{name: repo.name, owner: repo.owner},
				base,
				'HEAD'));
	});
var author$project$GitHubGraph$fetchIssue = F2(
	function (token, id) {
		return A2(
			jamesmacaulay$elm_graphql$GraphQL$Client$Http$customSendQuery,
			author$project$GitHubGraph$authedOptions(token),
			A2(
				jamesmacaulay$elm_graphql$GraphQL$Request$Builder$request,
				{id: id},
				A2(author$project$GitHubGraph$objectQuery, 'Issue', author$project$GitHubGraph$issueObject)));
	});
var author$project$Main$IssueFetched = function (a) {
	return {$: 'IssueFetched', a: a};
};
var author$project$Main$fetchIssue = F2(
	function (model, id) {
		return A2(
			elm$core$Task$attempt,
			author$project$Main$IssueFetched,
			A2(author$project$GitHubGraph$fetchIssue, model.githubToken, id));
	});
var author$project$GitHubGraph$CommitEvent = function (a) {
	return {$: 'CommitEvent', a: a};
};
var author$project$GitHubGraph$CrossReferencedEvent = function (a) {
	return {$: 'CrossReferencedEvent', a: a};
};
var author$project$GitHubGraph$IssueCommentEvent = F2(
	function (a, b) {
		return {$: 'IssueCommentEvent', a: a, b: b};
	});
var author$project$GitHubGraph$pickEnum3 = F3(
	function (ma, mb, mc) {
		return A2(
			author$project$GitHubGraph$pickEnum2,
			ma,
			A2(author$project$GitHubGraph$pickEnum2, mb, mc));
	});
var author$project$GitHubGraph$timelineQuery = function () {
	var sourceID = A2(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
		A2(
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$inlineFragment,
			elm$core$Maybe$Just(
				jamesmacaulay$elm_graphql$GraphQL$Request$Builder$onType('PullRequest')),
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$extract(
				A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'id', _List_Nil, jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string))),
		A2(
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
			A2(
				jamesmacaulay$elm_graphql$GraphQL$Request$Builder$inlineFragment,
				elm$core$Maybe$Just(
					jamesmacaulay$elm_graphql$GraphQL$Request$Builder$onType('Issue')),
				jamesmacaulay$elm_graphql$GraphQL$Request$Builder$extract(
					A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'id', _List_Nil, jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string))),
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$object(author$project$GitHubGraph$pickEnum2)));
	var pageInfo = A2(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
		A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'hasNextPage', _List_Nil, jamesmacaulay$elm_graphql$GraphQL$Request$Builder$bool),
		A2(
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
			A3(
				jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
				'endCursor',
				_List_Nil,
				jamesmacaulay$elm_graphql$GraphQL$Request$Builder$nullable(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string)),
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$object(author$project$GitHubGraph$PageInfo)));
	var issueIdVar = A3(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$required,
		'issueId',
		A2(
			elm$core$Basics$composeL,
			function ($) {
				return $.id;
			},
			function ($) {
				return $.selector;
			}),
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$id);
	var issueCommentEvent = A2(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
		A3(
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
			'createdAt',
			_List_Nil,
			A2(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$customScalar, author$project$GitHubGraph$DateType, elm_community$json_extra$Json$Decode$Extra$datetime)),
		A2(
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
			A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'author', _List_Nil, author$project$GitHubGraph$authorObject),
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$object(author$project$GitHubGraph$IssueCommentEvent)));
	var crossReferencedEvent = A2(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$assume(
			A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'source', _List_Nil, sourceID)),
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$object(author$project$GitHubGraph$CrossReferencedEvent));
	var commitEvent = A2(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$map, author$project$GitHubGraph$CommitEvent, author$project$GitHubGraph$commitObject);
	var event = A2(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
		A2(
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$inlineFragment,
			elm$core$Maybe$Just(
				jamesmacaulay$elm_graphql$GraphQL$Request$Builder$onType('Commit')),
			commitEvent),
		A2(
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
			A2(
				jamesmacaulay$elm_graphql$GraphQL$Request$Builder$inlineFragment,
				elm$core$Maybe$Just(
					jamesmacaulay$elm_graphql$GraphQL$Request$Builder$onType('CrossReferencedEvent')),
				crossReferencedEvent),
			A2(
				jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
				A2(
					jamesmacaulay$elm_graphql$GraphQL$Request$Builder$inlineFragment,
					elm$core$Maybe$Just(
						jamesmacaulay$elm_graphql$GraphQL$Request$Builder$onType('IssueComment')),
					issueCommentEvent),
				jamesmacaulay$elm_graphql$GraphQL$Request$Builder$object(author$project$GitHubGraph$pickEnum3))));
	var paged = A2(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
		A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'pageInfo', _List_Nil, pageInfo),
		A2(
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
			A3(
				jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
				'nodes',
				_List_Nil,
				A2(
					jamesmacaulay$elm_graphql$GraphQL$Request$Builder$map,
					elm$core$List$filterMap(elm$core$Basics$identity),
					jamesmacaulay$elm_graphql$GraphQL$Request$Builder$list(event))),
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$object(author$project$GitHubGraph$PagedResult)));
	var afterVar = A3(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$required,
		'after',
		function ($) {
			return $.after;
		},
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$nullable(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$string));
	var pageArgs = _List_fromArray(
		[
			_Utils_Tuple2(
			'first',
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$int(100)),
			_Utils_Tuple2(
			'after',
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$variable(afterVar))
		]);
	var timeline = jamesmacaulay$elm_graphql$GraphQL$Request$Builder$extract(
		A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'timeline', pageArgs, paged));
	var issueOrPRTimeline = A2(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
		A2(
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$inlineFragment,
			elm$core$Maybe$Just(
				jamesmacaulay$elm_graphql$GraphQL$Request$Builder$onType('PullRequest')),
			timeline),
		A2(
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
			A2(
				jamesmacaulay$elm_graphql$GraphQL$Request$Builder$inlineFragment,
				elm$core$Maybe$Just(
					jamesmacaulay$elm_graphql$GraphQL$Request$Builder$onType('Issue')),
				timeline),
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$object(author$project$GitHubGraph$pickEnum2)));
	var queryRoot = jamesmacaulay$elm_graphql$GraphQL$Request$Builder$extract(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$assume(
			A3(
				jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
				'node',
				_List_fromArray(
					[
						_Utils_Tuple2(
						'id',
						jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$variable(issueIdVar))
					]),
				issueOrPRTimeline)));
	return jamesmacaulay$elm_graphql$GraphQL$Request$Builder$queryDocument(queryRoot);
}();
var author$project$GitHubGraph$fetchTimeline = F2(
	function (token, issue) {
		return A3(
			author$project$GitHubGraph$fetchPaged,
			author$project$GitHubGraph$timelineQuery,
			token,
			{after: elm$core$Maybe$Nothing, selector: issue});
	});
var author$project$Main$IssueTimelineFetched = F2(
	function (a, b) {
		return {$: 'IssueTimelineFetched', a: a, b: b};
	});
var author$project$Main$fetchIssueTimeline = F2(
	function (model, id) {
		return model.skipTimeline ? elm$core$Platform$Cmd$none : A2(
			elm$core$Task$attempt,
			author$project$Main$IssueTimelineFetched(id),
			A2(
				author$project$GitHubGraph$fetchTimeline,
				model.githubToken,
				{id: id}));
	});
var author$project$GitHubGraph$issuesQuery = function () {
	var repoNameVar = A3(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$required,
		'repoName',
		A2(
			elm$core$Basics$composeL,
			function ($) {
				return $.name;
			},
			function ($) {
				return $.selector;
			}),
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$string);
	var pageInfo = A2(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
		A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'hasNextPage', _List_Nil, jamesmacaulay$elm_graphql$GraphQL$Request$Builder$bool),
		A2(
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
			A3(
				jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
				'endCursor',
				_List_Nil,
				jamesmacaulay$elm_graphql$GraphQL$Request$Builder$nullable(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string)),
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$object(author$project$GitHubGraph$PageInfo)));
	var paged = A2(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
		A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'pageInfo', _List_Nil, pageInfo),
		A2(
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
			A3(
				jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
				'nodes',
				_List_Nil,
				jamesmacaulay$elm_graphql$GraphQL$Request$Builder$list(author$project$GitHubGraph$issueObject)),
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$object(author$project$GitHubGraph$PagedResult)));
	var orgNameVar = A3(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$required,
		'orgName',
		A2(
			elm$core$Basics$composeL,
			function ($) {
				return $.owner;
			},
			function ($) {
				return $.selector;
			}),
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$string);
	var afterVar = A3(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$required,
		'after',
		function ($) {
			return $.after;
		},
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$nullable(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$string));
	var pageArgs = _List_fromArray(
		[
			_Utils_Tuple2(
			'first',
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$int(100)),
			_Utils_Tuple2(
			'after',
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$variable(afterVar))
		]);
	var queryRoot = jamesmacaulay$elm_graphql$GraphQL$Request$Builder$extract(
		A3(
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
			'repository',
			_List_fromArray(
				[
					_Utils_Tuple2(
					'owner',
					jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$variable(orgNameVar)),
					_Utils_Tuple2(
					'name',
					jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$variable(repoNameVar))
				]),
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$extract(
				A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'issues', pageArgs, paged))));
	return jamesmacaulay$elm_graphql$GraphQL$Request$Builder$queryDocument(queryRoot);
}();
var author$project$GitHubGraph$fetchRepoIssues = F2(
	function (token, repo) {
		return A3(
			author$project$GitHubGraph$fetchPaged,
			author$project$GitHubGraph$issuesQuery,
			token,
			{after: elm$core$Maybe$Nothing, selector: repo});
	});
var author$project$Main$IssuesFetched = F2(
	function (a, b) {
		return {$: 'IssuesFetched', a: a, b: b};
	});
var author$project$Main$fetchIssues = F2(
	function (model, repo) {
		return A2(
			elm$core$Task$attempt,
			author$project$Main$IssuesFetched(repo),
			A2(
				author$project$GitHubGraph$fetchRepoIssues,
				model.githubToken,
				{name: repo.name, owner: repo.owner}));
	});
var author$project$GitHubGraph$PullRequestReview = F3(
	function (author, state, createdAt) {
		return {author: author, createdAt: createdAt, state: state};
	});
var author$project$GitHubGraph$prReviewObject = A2(
	jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
	A3(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
		'createdAt',
		_List_Nil,
		A2(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$customScalar, author$project$GitHubGraph$DateType, elm_community$json_extra$Json$Decode$Extra$datetime)),
	A2(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
		A3(
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
			'state',
			_List_Nil,
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$enum(author$project$GitHubGraph$pullRequestReviewStates)),
		A2(
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$assume(
				A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'author', _List_Nil, author$project$GitHubGraph$authorObject)),
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$object(author$project$GitHubGraph$PullRequestReview))));
var author$project$GitHubGraph$prReviewQuery = function () {
	var pageInfo = A2(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
		A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'hasNextPage', _List_Nil, jamesmacaulay$elm_graphql$GraphQL$Request$Builder$bool),
		A2(
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
			A3(
				jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
				'endCursor',
				_List_Nil,
				jamesmacaulay$elm_graphql$GraphQL$Request$Builder$nullable(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string)),
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$object(author$project$GitHubGraph$PageInfo)));
	var paged = A2(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
		A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'pageInfo', _List_Nil, pageInfo),
		A2(
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
			A3(
				jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
				'nodes',
				_List_Nil,
				jamesmacaulay$elm_graphql$GraphQL$Request$Builder$list(author$project$GitHubGraph$prReviewObject)),
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$object(author$project$GitHubGraph$PagedResult)));
	var issueCommentEvent = A2(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
		A3(
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
			'createdAt',
			_List_Nil,
			A2(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$customScalar, author$project$GitHubGraph$DateType, elm_community$json_extra$Json$Decode$Extra$datetime)),
		A2(
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
			A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'author', _List_Nil, author$project$GitHubGraph$authorObject),
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$object(author$project$GitHubGraph$IssueCommentEvent)));
	var idVar = A3(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$required,
		'id',
		A2(
			elm$core$Basics$composeL,
			function ($) {
				return $.id;
			},
			function ($) {
				return $.selector;
			}),
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$id);
	var afterVar = A3(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$required,
		'after',
		function ($) {
			return $.after;
		},
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$nullable(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$string));
	var pageArgs = _List_fromArray(
		[
			_Utils_Tuple2(
			'first',
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$int(100)),
			_Utils_Tuple2(
			'after',
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$variable(afterVar))
		]);
	var reviews = jamesmacaulay$elm_graphql$GraphQL$Request$Builder$extract(
		A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'reviews', pageArgs, paged));
	var queryRoot = jamesmacaulay$elm_graphql$GraphQL$Request$Builder$extract(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$assume(
			A3(
				jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
				'node',
				_List_fromArray(
					[
						_Utils_Tuple2(
						'id',
						jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$variable(idVar))
					]),
				jamesmacaulay$elm_graphql$GraphQL$Request$Builder$extract(
					A2(
						jamesmacaulay$elm_graphql$GraphQL$Request$Builder$inlineFragment,
						elm$core$Maybe$Just(
							jamesmacaulay$elm_graphql$GraphQL$Request$Builder$onType('PullRequest')),
						reviews)))));
	return jamesmacaulay$elm_graphql$GraphQL$Request$Builder$queryDocument(queryRoot);
}();
var author$project$GitHubGraph$fetchPullRequestReviews = F2(
	function (token, pr) {
		return A3(
			author$project$GitHubGraph$fetchPaged,
			author$project$GitHubGraph$prReviewQuery,
			token,
			{after: elm$core$Maybe$Nothing, selector: pr});
	});
var author$project$Main$PullRequestTimelineAndReviewsFetched = F2(
	function (a, b) {
		return {$: 'PullRequestTimelineAndReviewsFetched', a: a, b: b};
	});
var author$project$Main$fetchPRTimelineAndReviews = F2(
	function (model, id) {
		var fetchTimeline = model.skipTimeline ? elm$core$Task$succeed(_List_Nil) : A2(
			author$project$GitHubGraph$fetchTimeline,
			model.githubToken,
			{id: id});
		return A2(
			elm$core$Task$attempt,
			author$project$Main$PullRequestTimelineAndReviewsFetched(id),
			A2(
				elm$core$Task$andThen,
				function (timeline) {
					return A2(
						elm$core$Task$map,
						function (b) {
							return _Utils_Tuple2(timeline, b);
						},
						A2(
							author$project$GitHubGraph$fetchPullRequestReviews,
							model.githubToken,
							{id: id}));
				},
				fetchTimeline));
	});
var author$project$GitHubGraph$Project = F6(
	function (id, url, name, number, body, columns) {
		return {body: body, columns: columns, id: id, name: name, number: number, url: url};
	});
var author$project$GitHubGraph$projectObject = A2(
	jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
	A3(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
		'columns',
		_List_fromArray(
			[
				_Utils_Tuple2(
				'first',
				jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$int(50))
			]),
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$extract(
			A3(
				jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
				'nodes',
				_List_Nil,
				jamesmacaulay$elm_graphql$GraphQL$Request$Builder$list(author$project$GitHubGraph$columnObject)))),
	A2(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
		A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'body', _List_Nil, jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string),
		A2(
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
			A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'number', _List_Nil, jamesmacaulay$elm_graphql$GraphQL$Request$Builder$int),
			A2(
				jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
				A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'name', _List_Nil, jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string),
				A2(
					jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
					A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'url', _List_Nil, jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string),
					A2(
						jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
						A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'id', _List_Nil, jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string),
						jamesmacaulay$elm_graphql$GraphQL$Request$Builder$object(author$project$GitHubGraph$Project)))))));
var jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$ListValue = function (a) {
	return {$: 'ListValue', a: a};
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$list = function (values) {
	return A2(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$Value,
		jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$ListValue(
			A2(
				elm$core$List$map,
				function (_n0) {
					var ast = _n0.a;
					return ast;
				},
				values)),
		A3(elm$core$List$foldr, jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$valueVariablesFoldStep, _List_Nil, values));
};
var author$project$GitHubGraph$projectsQuery = function () {
	var pageInfo = A2(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
		A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'hasNextPage', _List_Nil, jamesmacaulay$elm_graphql$GraphQL$Request$Builder$bool),
		A2(
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
			A3(
				jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
				'endCursor',
				_List_Nil,
				jamesmacaulay$elm_graphql$GraphQL$Request$Builder$nullable(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string)),
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$object(author$project$GitHubGraph$PageInfo)));
	var paged = A2(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
		A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'pageInfo', _List_Nil, pageInfo),
		A2(
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
			A3(
				jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
				'nodes',
				_List_Nil,
				jamesmacaulay$elm_graphql$GraphQL$Request$Builder$list(author$project$GitHubGraph$projectObject)),
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$object(author$project$GitHubGraph$PagedResult)));
	var orgNameVar = A3(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$required,
		'orgName',
		A2(
			elm$core$Basics$composeL,
			function ($) {
				return $.name;
			},
			function ($) {
				return $.selector;
			}),
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$string);
	var afterVar = A3(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$required,
		'after',
		function ($) {
			return $.after;
		},
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$nullable(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$string));
	var pageArgs = _List_fromArray(
		[
			_Utils_Tuple2(
			'first',
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$int(100)),
			_Utils_Tuple2(
			'after',
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$variable(afterVar)),
			_Utils_Tuple2(
			'states',
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$list(
				_List_fromArray(
					[
						jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$enum('OPEN')
					])))
		]);
	var queryRoot = jamesmacaulay$elm_graphql$GraphQL$Request$Builder$extract(
		A3(
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
			'organization',
			_List_fromArray(
				[
					_Utils_Tuple2(
					'login',
					jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$variable(orgNameVar))
				]),
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$extract(
				A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'projects', pageArgs, paged))));
	return jamesmacaulay$elm_graphql$GraphQL$Request$Builder$queryDocument(queryRoot);
}();
var author$project$GitHubGraph$fetchOrgProjects = F2(
	function (token, org) {
		return A3(
			author$project$GitHubGraph$fetchPaged,
			author$project$GitHubGraph$projectsQuery,
			token,
			{after: elm$core$Maybe$Nothing, selector: org});
	});
var author$project$Main$ProjectsFetched = F2(
	function (a, b) {
		return {$: 'ProjectsFetched', a: a, b: b};
	});
var author$project$Main$fetchProjects = F2(
	function (model, nextMsg) {
		return A2(
			elm$core$Task$attempt,
			author$project$Main$ProjectsFetched(nextMsg),
			A2(
				author$project$GitHubGraph$fetchOrgProjects,
				model.githubToken,
				{name: model.githubOrg}));
	});
var author$project$GitHubGraph$pullRequestsQuery = function () {
	var repoNameVar = A3(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$required,
		'repoName',
		A2(
			elm$core$Basics$composeL,
			function ($) {
				return $.name;
			},
			function ($) {
				return $.selector;
			}),
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$string);
	var pageInfo = A2(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
		A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'hasNextPage', _List_Nil, jamesmacaulay$elm_graphql$GraphQL$Request$Builder$bool),
		A2(
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
			A3(
				jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
				'endCursor',
				_List_Nil,
				jamesmacaulay$elm_graphql$GraphQL$Request$Builder$nullable(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string)),
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$object(author$project$GitHubGraph$PageInfo)));
	var paged = A2(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
		A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'pageInfo', _List_Nil, pageInfo),
		A2(
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
			A3(
				jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
				'nodes',
				_List_Nil,
				jamesmacaulay$elm_graphql$GraphQL$Request$Builder$list(author$project$GitHubGraph$prObject)),
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$object(author$project$GitHubGraph$PagedResult)));
	var orgNameVar = A3(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$required,
		'orgName',
		A2(
			elm$core$Basics$composeL,
			function ($) {
				return $.owner;
			},
			function ($) {
				return $.selector;
			}),
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$string);
	var afterVar = A3(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$required,
		'after',
		function ($) {
			return $.after;
		},
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$nullable(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$string));
	var pageArgs = _List_fromArray(
		[
			_Utils_Tuple2(
			'first',
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$int(100)),
			_Utils_Tuple2(
			'after',
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$variable(afterVar))
		]);
	var queryRoot = jamesmacaulay$elm_graphql$GraphQL$Request$Builder$extract(
		A3(
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
			'repository',
			_List_fromArray(
				[
					_Utils_Tuple2(
					'owner',
					jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$variable(orgNameVar)),
					_Utils_Tuple2(
					'name',
					jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$variable(repoNameVar))
				]),
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$extract(
				A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'pullRequests', pageArgs, paged))));
	return jamesmacaulay$elm_graphql$GraphQL$Request$Builder$queryDocument(queryRoot);
}();
var author$project$GitHubGraph$fetchRepoPullRequests = F2(
	function (token, repo) {
		return A3(
			author$project$GitHubGraph$fetchPaged,
			author$project$GitHubGraph$pullRequestsQuery,
			token,
			{after: elm$core$Maybe$Nothing, selector: repo});
	});
var author$project$Main$PullRequestsFetched = F2(
	function (a, b) {
		return {$: 'PullRequestsFetched', a: a, b: b};
	});
var author$project$Main$fetchPullRequests = F2(
	function (model, repo) {
		return A2(
			elm$core$Task$attempt,
			author$project$Main$PullRequestsFetched(repo),
			A2(
				author$project$GitHubGraph$fetchRepoPullRequests,
				model.githubToken,
				{name: repo.name, owner: repo.owner}));
	});
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$TypeRef$int = jamesmacaulay$elm_graphql$GraphQL$Request$Builder$TypeRef$namedType('Int');
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$int = A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$VariableSpec, jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$NonNull, jamesmacaulay$elm_graphql$GraphQL$Request$Builder$TypeRef$int, jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$IntValue);
var author$project$GitHubGraph$issueQuery = function () {
	var repoNameVar = A3(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$required,
		'repoName',
		function ($) {
			return $.repo;
		},
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$string);
	var orgNameVar = A3(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$required,
		'orgName',
		function ($) {
			return $.owner;
		},
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$string);
	var numberVar = A3(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$required,
		'number',
		function ($) {
			return $.number;
		},
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$int);
	var queryRoot = jamesmacaulay$elm_graphql$GraphQL$Request$Builder$extract(
		A3(
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
			'repository',
			_List_fromArray(
				[
					_Utils_Tuple2(
					'owner',
					jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$variable(orgNameVar)),
					_Utils_Tuple2(
					'name',
					jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$variable(repoNameVar))
				]),
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$extract(
				A3(
					jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
					'issue',
					_List_fromArray(
						[
							_Utils_Tuple2(
							'number',
							jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$variable(numberVar))
						]),
					author$project$GitHubGraph$issueObject))));
	return jamesmacaulay$elm_graphql$GraphQL$Request$Builder$queryDocument(queryRoot);
}();
var author$project$GitHubGraph$fetchRepoIssue = F2(
	function (token, sel) {
		return A2(
			jamesmacaulay$elm_graphql$GraphQL$Client$Http$customSendQuery,
			author$project$GitHubGraph$authedOptions(token),
			A2(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$request, sel, author$project$GitHubGraph$issueQuery));
	});
var author$project$Main$fetchRepoIssue = F2(
	function (model, sel) {
		return A2(
			elm$core$Task$attempt,
			author$project$Main$IssueFetched,
			A2(author$project$GitHubGraph$fetchRepoIssue, model.githubToken, sel));
	});
var author$project$GitHubGraph$pullRequestQuery = function () {
	var repoNameVar = A3(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$required,
		'repoName',
		function ($) {
			return $.repo;
		},
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$string);
	var orgNameVar = A3(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$required,
		'orgName',
		function ($) {
			return $.owner;
		},
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$string);
	var numberVar = A3(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$required,
		'number',
		function ($) {
			return $.number;
		},
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$int);
	var queryRoot = jamesmacaulay$elm_graphql$GraphQL$Request$Builder$extract(
		A3(
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
			'repository',
			_List_fromArray(
				[
					_Utils_Tuple2(
					'owner',
					jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$variable(orgNameVar)),
					_Utils_Tuple2(
					'name',
					jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$variable(repoNameVar))
				]),
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$extract(
				A3(
					jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
					'pullRequest',
					_List_fromArray(
						[
							_Utils_Tuple2(
							'number',
							jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$variable(numberVar))
						]),
					author$project$GitHubGraph$prObject))));
	return jamesmacaulay$elm_graphql$GraphQL$Request$Builder$queryDocument(queryRoot);
}();
var author$project$GitHubGraph$fetchRepoPullRequest = F2(
	function (token, sel) {
		return A2(
			jamesmacaulay$elm_graphql$GraphQL$Client$Http$customSendQuery,
			author$project$GitHubGraph$authedOptions(token),
			A2(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$request, sel, author$project$GitHubGraph$pullRequestQuery));
	});
var author$project$Main$fetchRepoPullRequest = F2(
	function (model, sel) {
		return A2(
			elm$core$Task$attempt,
			author$project$Main$PullRequestFetched,
			A2(author$project$GitHubGraph$fetchRepoPullRequest, model.githubToken, sel));
	});
var author$project$Main$fetchRepoIssueOrPR = F2(
	function (model, sel) {
		return elm$core$Platform$Cmd$batch(
			_List_fromArray(
				[
					A2(author$project$Main$fetchRepoIssue, model, sel),
					A2(author$project$Main$fetchRepoPullRequest, model, sel)
				]));
	});
var author$project$GitHubGraph$reposQuery = function () {
	var pageInfo = A2(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
		A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'hasNextPage', _List_Nil, jamesmacaulay$elm_graphql$GraphQL$Request$Builder$bool),
		A2(
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
			A3(
				jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
				'endCursor',
				_List_Nil,
				jamesmacaulay$elm_graphql$GraphQL$Request$Builder$nullable(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string)),
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$object(author$project$GitHubGraph$PageInfo)));
	var paged = A2(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
		A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'pageInfo', _List_Nil, pageInfo),
		A2(
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
			A3(
				jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
				'nodes',
				_List_Nil,
				jamesmacaulay$elm_graphql$GraphQL$Request$Builder$list(author$project$GitHubGraph$repoObject)),
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$object(author$project$GitHubGraph$PagedResult)));
	var orgNameVar = A3(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$required,
		'orgName',
		A2(
			elm$core$Basics$composeL,
			function ($) {
				return $.name;
			},
			function ($) {
				return $.selector;
			}),
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$string);
	var afterVar = A3(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$required,
		'after',
		function ($) {
			return $.after;
		},
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$nullable(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$string));
	var pageArgs = _List_fromArray(
		[
			_Utils_Tuple2(
			'first',
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$int(100)),
			_Utils_Tuple2(
			'after',
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$variable(afterVar))
		]);
	var queryRoot = jamesmacaulay$elm_graphql$GraphQL$Request$Builder$extract(
		A3(
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
			'organization',
			_List_fromArray(
				[
					_Utils_Tuple2(
					'login',
					jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$variable(orgNameVar))
				]),
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$extract(
				A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'repositories', pageArgs, paged))));
	return jamesmacaulay$elm_graphql$GraphQL$Request$Builder$queryDocument(queryRoot);
}();
var author$project$GitHubGraph$fetchOrgRepos = F2(
	function (token, org) {
		return A3(
			author$project$GitHubGraph$fetchPaged,
			author$project$GitHubGraph$reposQuery,
			token,
			{after: elm$core$Maybe$Nothing, selector: org});
	});
var author$project$Main$RepositoriesFetched = function (a) {
	return {$: 'RepositoriesFetched', a: a};
};
var author$project$Main$fetchRepos = function (model) {
	return A2(
		elm$core$Task$attempt,
		author$project$Main$RepositoriesFetched,
		A2(
			author$project$GitHubGraph$fetchOrgRepos,
			model.githubToken,
			{name: model.githubOrg}));
};
var author$project$Main$setActors = _Platform_outgoingPort(
	'setActors',
	function ($) {
		var a = $.a;
		var b = $.b;
		return A2(
			elm$json$Json$Encode$list,
			elm$core$Basics$identity,
			_List_fromArray(
				[
					elm$json$Json$Encode$string(a),
					elm$json$Json$Encode$list(elm$core$Basics$identity)(b)
				]));
	});
var author$project$Main$setCards = _Platform_outgoingPort(
	'setCards',
	function ($) {
		var a = $.a;
		var b = $.b;
		return A2(
			elm$json$Json$Encode$list,
			elm$core$Basics$identity,
			_List_fromArray(
				[
					elm$json$Json$Encode$string(a),
					elm$json$Json$Encode$list(elm$core$Basics$identity)(b)
				]));
	});
var author$project$Main$setComparison = _Platform_outgoingPort(
	'setComparison',
	function ($) {
		var a = $.a;
		var b = $.b;
		return A2(
			elm$json$Json$Encode$list,
			elm$core$Basics$identity,
			_List_fromArray(
				[
					elm$json$Json$Encode$string(a),
					elm$core$Basics$identity(b)
				]));
	});
var author$project$Main$setGraphs = _Platform_outgoingPort('setGraphs', elm$core$Basics$identity);
var author$project$Main$setIssue = _Platform_outgoingPort('setIssue', elm$core$Basics$identity);
var author$project$Main$setIssues = _Platform_outgoingPort(
	'setIssues',
	elm$json$Json$Encode$list(elm$core$Basics$identity));
var author$project$Main$setProjects = _Platform_outgoingPort(
	'setProjects',
	elm$json$Json$Encode$list(elm$core$Basics$identity));
var author$project$Main$setPullRequest = _Platform_outgoingPort('setPullRequest', elm$core$Basics$identity);
var author$project$Main$setPullRequests = _Platform_outgoingPort(
	'setPullRequests',
	elm$json$Json$Encode$list(elm$core$Basics$identity));
var author$project$Main$setReferences = _Platform_outgoingPort(
	'setReferences',
	function ($) {
		var a = $.a;
		var b = $.b;
		return A2(
			elm$json$Json$Encode$list,
			elm$core$Basics$identity,
			_List_fromArray(
				[
					elm$json$Json$Encode$string(a),
					elm$json$Json$Encode$list(elm$json$Json$Encode$string)(b)
				]));
	});
var author$project$Main$setRepo = _Platform_outgoingPort('setRepo', elm$core$Basics$identity);
var author$project$Main$setRepos = _Platform_outgoingPort(
	'setRepos',
	elm$json$Json$Encode$list(elm$core$Basics$identity));
var author$project$Main$setReviewers = _Platform_outgoingPort(
	'setReviewers',
	function ($) {
		var a = $.a;
		var b = $.b;
		return A2(
			elm$json$Json$Encode$list,
			elm$core$Basics$identity,
			_List_fromArray(
				[
					elm$json$Json$Encode$string(a),
					elm$json$Json$Encode$list(elm$core$Basics$identity)(b)
				]));
	});
var elm$core$List$concatMap = F2(
	function (f, list) {
		return elm$core$List$concat(
			A2(elm$core$List$map, f, list));
	});
var elm$core$List$member = F2(
	function (x, xs) {
		return A2(
			elm$core$List$any,
			function (a) {
				return _Utils_eq(a, x);
			},
			xs);
	});
var elm$core$List$sortBy = _List_sortBy;
var author$project$Main$update = F2(
	function (msg, model) {
		switch (msg.$) {
			case 'Noop':
				return _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
			case 'Refresh':
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							loadQueue: A2(
								elm$core$List$cons,
								author$project$Main$fetchRepos(model),
								A2(
									elm$core$List$cons,
									A2(author$project$Main$fetchProjects, model, author$project$Main$FetchCards),
									model.loadQueue))
						}),
					elm$core$Platform$Cmd$none);
			case 'PopQueue':
				var _n1 = model.loadQueue;
				if (_n1.b) {
					var first = _n1.a;
					var rest = _n1.b;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{loadQueue: rest}),
						first);
				} else {
					return _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
				}
			case 'RetryQueue':
				return elm$core$List$isEmpty(model.failedQueue) ? _Utils_Tuple2(model, elm$core$Platform$Cmd$none) : A3(
					author$project$Log$debug,
					'retrying failed fetches',
					elm$core$List$length(model.failedQueue),
					_Utils_Tuple2(
						_Utils_update(
							model,
							{
								failedQueue: _List_Nil,
								loadQueue: _Utils_ap(model.failedQueue, model.loadQueue)
							}),
						elm$core$Platform$Cmd$none));
			case 'GraphRefreshRequested':
				var cardIds = msg.a;
				var references = msg.b;
				var graphs = A2(author$project$Main$computeGraph, cardIds, references);
				return A3(
					author$project$Log$debug,
					'computed graphs',
					elm$core$List$length(graphs),
					_Utils_Tuple2(
						model,
						author$project$Main$setGraphs(
							A2(
								elm$json$Json$Encode$list,
								author$project$ForceGraph$encode(elm$json$Json$Encode$string),
								graphs))));
			case 'RefreshRequested':
				switch (msg.a) {
					case 'columnCards':
						var colId = msg.b;
						return _Utils_Tuple2(
							model,
							A2(author$project$Main$fetchCards, model, colId));
					case 'repo':
						var ownerAndName = msg.b;
						var _n2 = A2(elm$core$String$split, '/', ownerAndName);
						if (_n2.b && _n2.b.b) {
							var owner = _n2.a;
							var _n3 = _n2.b;
							var name = _n3.a;
							return _Utils_Tuple2(
								model,
								A2(
									author$project$Main$fetchRepo,
									model,
									{name: name, owner: owner}));
						} else {
							return _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
						}
					case 'issue':
						var id = msg.b;
						return _Utils_Tuple2(
							model,
							A2(author$project$Main$fetchIssue, model, id));
					case 'pr':
						var id = msg.b;
						return _Utils_Tuple2(
							model,
							A2(author$project$Main$fetchPullRequest, model, id));
					default:
						var field = msg.a;
						var id = msg.b;
						return A3(
							author$project$Log$debug,
							'cannot refresh',
							_Utils_Tuple2(field, id),
							_Utils_Tuple2(model, elm$core$Platform$Cmd$none));
				}
			case 'HookReceived':
				switch (msg.a) {
					case 'label':
						var payload = msg.b;
						return A3(
							author$project$Log$debug,
							'label hook received; refreshing repo',
							_Utils_Tuple0,
							_Utils_Tuple2(
								A2(author$project$Main$decodeAndFetchRepo, payload, model),
								elm$core$Platform$Cmd$none));
					case 'issues':
						var payload = msg.b;
						return A3(
							author$project$Log$debug,
							'issue hook received; refreshing issue and timeline',
							_Utils_Tuple0,
							_Utils_Tuple2(
								A4(author$project$Main$decodeAndFetchIssueOrPR, 'issue', payload, author$project$Main$fetchRepoIssue, model),
								elm$core$Platform$Cmd$none));
					case 'issue_comment':
						var payload = msg.b;
						return A3(
							author$project$Log$debug,
							'issue_comment hook received; refreshing issue and timeline',
							_Utils_Tuple0,
							_Utils_Tuple2(
								A4(author$project$Main$decodeAndFetchIssueOrPR, 'issue', payload, author$project$Main$fetchRepoIssueOrPR, model),
								elm$core$Platform$Cmd$none));
					case 'pull_request':
						var payload = msg.b;
						return A3(
							author$project$Log$debug,
							'pull_request hook received; refreshing pr and timeline',
							_Utils_Tuple0,
							_Utils_Tuple2(
								A4(author$project$Main$decodeAndFetchIssueOrPR, 'pull_request', payload, author$project$Main$fetchRepoPullRequest, model),
								elm$core$Platform$Cmd$none));
					case 'pull_request_review':
						var payload = msg.b;
						return A3(
							author$project$Log$debug,
							'pull_request_review hook received; refreshing pr and timeline',
							_Utils_Tuple0,
							_Utils_Tuple2(
								A4(author$project$Main$decodeAndFetchIssueOrPR, 'pull_request', payload, author$project$Main$fetchRepoPullRequest, model),
								elm$core$Platform$Cmd$none));
					case 'pull_request_review_comment':
						var payload = msg.b;
						return A3(
							author$project$Log$debug,
							'pull_request_review_comment hook received; refreshing pr and timeline',
							_Utils_Tuple0,
							_Utils_Tuple2(
								A4(author$project$Main$decodeAndFetchIssueOrPR, 'pull_request', payload, author$project$Main$fetchRepoPullRequest, model),
								elm$core$Platform$Cmd$none));
					case 'milestone':
						var payload = msg.b;
						return A3(
							author$project$Log$debug,
							'milestone hook received; refreshing repo',
							_Utils_Tuple0,
							_Utils_Tuple2(
								A2(author$project$Main$decodeAndFetchRepo, payload, model),
								elm$core$Platform$Cmd$none));
					case 'project':
						var payload = msg.b;
						return A3(
							author$project$Log$debug,
							'project hook received; refreshing projects',
							_Utils_Tuple0,
							_Utils_Tuple2(
								_Utils_update(
									model,
									{
										loadQueue: A2(
											elm$core$List$cons,
											A2(
												author$project$Main$fetchProjects,
												model,
												elm$core$Basics$always(author$project$Main$Noop)),
											model.loadQueue)
									}),
								elm$core$Platform$Cmd$none));
					case 'project_column':
						var payload = msg.b;
						return A3(
							author$project$Log$debug,
							'project_column hook received; refreshing projects',
							_Utils_Tuple0,
							_Utils_Tuple2(
								_Utils_update(
									model,
									{
										loadQueue: A2(
											elm$core$List$cons,
											A2(
												author$project$Main$fetchProjects,
												model,
												elm$core$Basics$always(author$project$Main$Noop)),
											model.loadQueue)
									}),
								elm$core$Platform$Cmd$none));
					case 'project_card':
						var payload = msg.b;
						return A3(
							author$project$Log$debug,
							'project_card hook received; refreshing projects and cards',
							_Utils_Tuple0,
							function () {
								var _n4 = A2(elm$json$Json$Decode$decodeValue, author$project$Main$decodeAffectedColumnIds, payload);
								if (_n4.$ === 'Err') {
									var err = _n4.a;
									return A3(
										author$project$Log$debug,
										'failed to decode column ids',
										err,
										_Utils_Tuple2(model, elm$core$Platform$Cmd$none));
								} else {
									var ids = _n4.a;
									var affectedColumns = A2(
										elm$core$List$filter,
										A2(
											elm$core$Basics$composeL,
											function (a) {
												return A2(elm$core$List$member, a, ids);
											},
											function ($) {
												return $.databaseId;
											}),
										A2(
											elm$core$List$concatMap,
											function ($) {
												return $.columns;
											},
											model.projects));
									return _Utils_Tuple2(
										_Utils_update(
											model,
											{
												loadQueue: _Utils_ap(
													A2(
														elm$core$List$map,
														A2(
															elm$core$Basics$composeL,
															author$project$Main$fetchCards(model),
															function ($) {
																return $.id;
															}),
														affectedColumns),
													model.loadQueue)
											}),
										elm$core$Platform$Cmd$none);
								}
							}());
					case 'repository':
						var payload = msg.b;
						return A3(
							author$project$Log$debug,
							'repository hook received; refreshing repo',
							_Utils_Tuple0,
							_Utils_Tuple2(
								A2(author$project$Main$decodeAndFetchRepo, payload, model),
								elm$core$Platform$Cmd$none));
					case 'status':
						var payload = msg.b;
						return A3(
							author$project$Log$debug,
							'status hook received; refreshing associated pr',
							_Utils_Tuple0,
							_Utils_Tuple2(
								A2(author$project$Main$decodeAndFetchPRForCommit, payload, model),
								elm$core$Platform$Cmd$none));
					default:
						var event = msg.a;
						var payload = msg.b;
						return A3(
							author$project$Log$debug,
							'hook received',
							_Utils_Tuple2(event, payload),
							_Utils_Tuple2(model, elm$core$Platform$Cmd$none));
				}
			case 'RepositoriesFetched':
				if (msg.a.$ === 'Ok') {
					var repos = msg.a.a;
					return A3(
						author$project$Log$debug,
						'repositories fetched',
						A2(
							elm$core$List$map,
							function ($) {
								return $.name;
							},
							repos),
						function () {
							var fetch = function (repo) {
								return _List_fromArray(
									[
										A2(author$project$Main$fetchIssues, model, repo),
										A2(author$project$Main$fetchPullRequests, model, repo),
										A2(author$project$Main$fetchComparison, model, repo)
									]);
							};
							var activeRepos = A2(
								elm$core$List$filter,
								A2(
									elm$core$Basics$composeL,
									elm$core$Basics$not,
									function ($) {
										return $.isArchived;
									}),
								repos);
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										loadQueue: _Utils_ap(
											A2(elm$core$List$concatMap, fetch, activeRepos),
											model.loadQueue)
									}),
								author$project$Main$setRepos(
									A2(elm$core$List$map, author$project$GitHubGraph$encodeRepo, activeRepos)));
						}());
				} else {
					var err = msg.a.a;
					return A3(
						author$project$Log$debug,
						'failed to fetch repos',
						err,
						A2(
							author$project$Main$backOff,
							model,
							author$project$Main$fetchRepos(model)));
				}
			case 'RepositoryFetched':
				if (msg.a.$ === 'Ok') {
					var repo = msg.a.a;
					return A3(
						author$project$Log$debug,
						'repository fetched',
						repo.name,
						_Utils_Tuple2(
							model,
							author$project$Main$setRepo(
								author$project$GitHubGraph$encodeRepo(repo))));
				} else {
					var err = msg.a.a;
					return A3(
						author$project$Log$debug,
						'failed to fetch repos',
						err,
						_Utils_Tuple2(model, elm$core$Platform$Cmd$none));
				}
			case 'ProjectsFetched':
				if (msg.b.$ === 'Ok') {
					var nextMsg = msg.a;
					var projects = msg.b.a;
					return A3(
						author$project$Log$debug,
						'projects fetched',
						A2(
							elm$core$List$map,
							function ($) {
								return $.name;
							},
							projects),
						function () {
							var _n5 = A2(
								author$project$Main$update,
								nextMsg(projects),
								_Utils_update(
									model,
									{projects: projects}));
							var next = _n5.a;
							var cmd = _n5.b;
							return _Utils_Tuple2(
								next,
								elm$core$Platform$Cmd$batch(
									_List_fromArray(
										[
											author$project$Main$setProjects(
											A2(elm$core$List$map, author$project$GitHubGraph$encodeProject, projects))
										])));
						}());
				} else {
					var nextMsg = msg.a;
					var err = msg.b.a;
					return A3(
						author$project$Log$debug,
						'failed to fetch projects',
						err,
						A2(
							author$project$Main$backOff,
							model,
							A2(author$project$Main$fetchProjects, model, nextMsg)));
				}
			case 'FetchCards':
				var projects = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							loadQueue: _Utils_ap(
								A2(
									elm$core$List$concatMap,
									A2(
										elm$core$Basics$composeL,
										elm$core$List$map(
											A2(
												elm$core$Basics$composeL,
												author$project$Main$fetchCards(model),
												function ($) {
													return $.id;
												})),
										function ($) {
											return $.columns;
										}),
									projects),
								model.loadQueue)
						}),
					elm$core$Platform$Cmd$none);
			case 'CardsFetched':
				if (msg.b.$ === 'Ok') {
					var colId = msg.a;
					var cards = msg.b.a;
					return A3(
						author$project$Log$debug,
						'cards fetched for',
						colId,
						_Utils_Tuple2(
							model,
							author$project$Main$setCards(
								_Utils_Tuple2(
									colId,
									A2(elm$core$List$map, author$project$GitHubGraph$encodeProjectColumnCard, cards)))));
				} else {
					var colId = msg.a;
					var err = msg.b.a;
					return A3(
						author$project$Log$debug,
						'failed to fetch cards',
						_Utils_Tuple2(colId, err),
						A2(
							author$project$Main$backOff,
							model,
							A2(author$project$Main$fetchCards, model, colId)));
				}
			case 'IssuesFetched':
				if (msg.b.$ === 'Ok') {
					var repo = msg.a;
					var issues = msg.b.a;
					var fetchTimelines = A2(
						elm$core$List$map,
						A2(
							elm$core$Basics$composeL,
							author$project$Main$fetchIssueTimeline(model),
							function ($) {
								return $.id;
							}),
						A2(
							elm$core$List$filter,
							A2(
								elm$core$Basics$composeR,
								function ($) {
									return $.state;
								},
								elm$core$Basics$eq(author$project$GitHubGraph$IssueStateOpen)),
							issues));
					return A3(
						author$project$Log$debug,
						'issues fetched for',
						repo.url,
						_Utils_Tuple2(
							_Utils_update(
								model,
								{
									loadQueue: _Utils_ap(model.loadQueue, fetchTimelines)
								}),
							author$project$Main$setIssues(
								A2(elm$core$List$map, author$project$GitHubGraph$encodeIssue, issues))));
				} else {
					var repo = msg.a;
					var err = msg.b.a;
					return A3(
						author$project$Log$debug,
						'failed to fetch issues',
						_Utils_Tuple2(repo.url, err),
						A2(
							author$project$Main$backOff,
							model,
							A2(author$project$Main$fetchIssues, model, repo)));
				}
			case 'IssueFetched':
				if (msg.a.$ === 'Ok') {
					var issue = msg.a.a;
					return A3(
						author$project$Log$debug,
						'issue fetched',
						issue.url,
						_Utils_Tuple2(
							_Utils_update(
								model,
								{
									loadQueue: A2(
										elm$core$List$cons,
										A2(author$project$Main$fetchIssueTimeline, model, issue.id),
										model.loadQueue)
								}),
							author$project$Main$setIssue(
								author$project$GitHubGraph$encodeIssue(issue))));
				} else {
					var err = msg.a.a;
					return A3(
						author$project$Log$debug,
						'failed to fetch issue',
						err,
						_Utils_Tuple2(model, elm$core$Platform$Cmd$none));
				}
			case 'ComparisonFetched':
				if (msg.b.$ === 'Err') {
					var repo = msg.a;
					var err = msg.b.a;
					return A3(
						author$project$Log$debug,
						'failed to fetch comparison',
						_Utils_Tuple2(repo.url, err),
						A2(
							author$project$Main$backOff,
							model,
							A2(author$project$Main$fetchComparison, model, repo)));
				} else {
					var repo = msg.a;
					var comparison = msg.b.a;
					return A3(
						author$project$Log$debug,
						'comparison fetched for',
						repo.url,
						_Utils_Tuple2(
							model,
							author$project$Main$setComparison(
								_Utils_Tuple2(
									repo.id,
									author$project$GitHubGraph$encodeV3Comparison(comparison)))));
				}
			case 'PullRequestsFetched':
				if (msg.b.$ === 'Ok') {
					var repo = msg.a;
					var prs = msg.b.a;
					var openPRs = A2(
						elm$core$List$filter,
						A2(
							elm$core$Basics$composeR,
							function ($) {
								return $.state;
							},
							elm$core$Basics$eq(author$project$GitHubGraph$PullRequestStateOpen)),
						prs);
					var fetchTimelines = A2(
						elm$core$List$map,
						A2(
							elm$core$Basics$composeL,
							author$project$Main$fetchPRTimelineAndReviews(model),
							function ($) {
								return $.id;
							}),
						openPRs);
					var commitPRs = A3(
						elm$core$List$foldl,
						function (pr) {
							var _n6 = pr.lastCommit;
							if (_n6.$ === 'Just') {
								var sha = _n6.a.sha;
								return A2(elm$core$Dict$insert, sha, pr.id);
							} else {
								return elm$core$Basics$identity;
							}
						},
						model.commitPRs,
						openPRs);
					return A3(
						author$project$Log$debug,
						'prs fetched for',
						repo.url,
						_Utils_Tuple2(
							_Utils_update(
								model,
								{
									commitPRs: commitPRs,
									loadQueue: _Utils_ap(model.loadQueue, fetchTimelines)
								}),
							author$project$Main$setPullRequests(
								A2(elm$core$List$map, author$project$GitHubGraph$encodePullRequest, prs))));
				} else {
					var repo = msg.a;
					var err = msg.b.a;
					return A3(
						author$project$Log$debug,
						'failed to fetch prs',
						_Utils_Tuple2(repo.url, err),
						A2(
							author$project$Main$backOff,
							model,
							A2(author$project$Main$fetchPullRequests, model, repo)));
				}
			case 'PullRequestFetched':
				if (msg.a.$ === 'Ok') {
					var pr = msg.a.a;
					return A3(
						author$project$Log$debug,
						'pr fetched',
						pr.url,
						_Utils_Tuple2(
							_Utils_update(
								model,
								{
									commitPRs: function () {
										var _n7 = pr.lastCommit;
										if (_n7.$ === 'Just') {
											var sha = _n7.a.sha;
											return A3(elm$core$Dict$insert, sha, pr.id, model.commitPRs);
										} else {
											return model.commitPRs;
										}
									}(),
									loadQueue: A2(
										elm$core$List$cons,
										A2(author$project$Main$fetchPRTimelineAndReviews, model, pr.id),
										model.loadQueue)
								}),
							author$project$Main$setPullRequest(
								author$project$GitHubGraph$encodePullRequest(pr))));
				} else {
					var err = msg.a.a;
					return A3(
						author$project$Log$debug,
						'failed to fetch pr',
						err,
						_Utils_Tuple2(model, elm$core$Platform$Cmd$none));
				}
			case 'IssueTimelineFetched':
				if (msg.b.$ === 'Ok') {
					var id = msg.a;
					var timeline = msg.b.a;
					var findSource = function (event) {
						if (event.$ === 'CrossReferencedEvent') {
							var eid = event.a;
							return elm$core$Maybe$Just(eid);
						} else {
							return elm$core$Maybe$Nothing;
						}
					};
					var edges = A2(elm$core$List$filterMap, findSource, timeline);
					var actors = A2(
						elm$core$List$map,
						author$project$Backend$encodeEventActor,
						A2(elm$core$List$filterMap, author$project$Main$eventActor, timeline));
					return A3(
						author$project$Log$debug,
						'timeline fetched for',
						id,
						_Utils_Tuple2(
							model,
							elm$core$Platform$Cmd$batch(
								_List_fromArray(
									[
										author$project$Main$setReferences(
										_Utils_Tuple2(id, edges)),
										author$project$Main$setActors(
										_Utils_Tuple2(id, actors))
									]))));
				} else {
					var id = msg.a;
					var err = msg.b.a;
					return A3(
						author$project$Log$debug,
						'failed to fetch timeline',
						_Utils_Tuple2(id, err),
						A2(
							author$project$Main$backOff,
							model,
							A2(author$project$Main$fetchIssueTimeline, model, id)));
				}
			default:
				if (msg.b.$ === 'Ok') {
					var id = msg.a;
					var _n9 = msg.b.a;
					var timeline = _n9.a;
					var reviews = _n9.b;
					var reviewers = A2(
						elm$core$List$map,
						author$project$GitHubGraph$encodePullRequestReview,
						elm$core$Dict$values(
							A3(
								elm$core$List$foldl,
								function (r) {
									var _n11 = r.state;
									switch (_n11.$) {
										case 'PullRequestReviewStatePending':
											return A2(elm$core$Dict$insert, r.author.id, r);
										case 'PullRequestReviewStateCommented':
											return elm$core$Basics$identity;
										case 'PullRequestReviewStateApproved':
											return A2(elm$core$Dict$insert, r.author.id, r);
										case 'PullRequestReviewStateChangesRequested':
											return A2(elm$core$Dict$insert, r.author.id, r);
										default:
											return elm$core$Dict$remove(r.author.id);
									}
								},
								elm$core$Dict$empty,
								reviews)));
					var reviewActor = function (review) {
						return {
							avatar: review.author.avatar,
							createdAt: review.createdAt,
							user: elm$core$Maybe$Just(review.author)
						};
					};
					var findSource = function (event) {
						if (event.$ === 'CrossReferencedEvent') {
							var eid = event.a;
							return elm$core$Maybe$Just(eid);
						} else {
							return elm$core$Maybe$Nothing;
						}
					};
					var edges = A2(elm$core$List$filterMap, findSource, timeline);
					var actors = A2(
						elm$core$List$map,
						author$project$Backend$encodeEventActor,
						A2(
							elm$core$List$sortBy,
							A2(
								elm$core$Basics$composeL,
								elm$time$Time$posixToMillis,
								function ($) {
									return $.createdAt;
								}),
							_Utils_ap(
								A2(elm$core$List$filterMap, author$project$Main$eventActor, timeline),
								A2(elm$core$List$map, reviewActor, reviews))));
					return A3(
						author$project$Log$debug,
						'timeline and reviews fetched for',
						id,
						_Utils_Tuple2(
							model,
							elm$core$Platform$Cmd$batch(
								_List_fromArray(
									[
										author$project$Main$setReferences(
										_Utils_Tuple2(id, edges)),
										author$project$Main$setActors(
										_Utils_Tuple2(id, actors)),
										author$project$Main$setReviewers(
										_Utils_Tuple2(id, reviewers))
									]))));
				} else {
					var id = msg.a;
					var err = msg.b.a;
					return A3(
						author$project$Log$debug,
						'failed to fetch timeline and reviews',
						_Utils_Tuple2(id, err),
						A2(
							author$project$Main$backOff,
							model,
							A2(author$project$Main$fetchPRTimelineAndReviews, model, id)));
				}
		}
	});
var author$project$Main$init = function (_n0) {
	var githubToken = _n0.githubToken;
	var githubOrg = _n0.githubOrg;
	var skipTimeline = _n0.skipTimeline;
	var noRefresh = _n0.noRefresh;
	return A2(
		author$project$Main$update,
		author$project$Main$Refresh,
		{commitPRs: elm$core$Dict$empty, failedQueue: _List_Nil, githubOrg: githubOrg, githubToken: githubToken, loadQueue: _List_Nil, noRefresh: noRefresh, projects: _List_Nil, skipTimeline: skipTimeline});
};
var author$project$Main$GraphRefreshRequested = F2(
	function (a, b) {
		return {$: 'GraphRefreshRequested', a: a, b: b};
	});
var author$project$Main$HookReceived = F2(
	function (a, b) {
		return {$: 'HookReceived', a: a, b: b};
	});
var author$project$Main$PopQueue = {$: 'PopQueue'};
var author$project$Main$RefreshRequested = F2(
	function (a, b) {
		return {$: 'RefreshRequested', a: a, b: b};
	});
var author$project$Main$RetryQueue = {$: 'RetryQueue'};
var elm$json$Json$Decode$index = _Json_decodeIndex;
var elm$json$Json$Decode$value = _Json_decodeValue;
var author$project$Main$hook = _Platform_incomingPort(
	'hook',
	A2(
		elm$json$Json$Decode$andThen,
		function (x0) {
			return A2(
				elm$json$Json$Decode$andThen,
				function (x1) {
					return elm$json$Json$Decode$succeed(
						_Utils_Tuple2(x0, x1));
				},
				A2(elm$json$Json$Decode$index, 1, elm$json$Json$Decode$value));
		},
		A2(elm$json$Json$Decode$index, 0, elm$json$Json$Decode$string)));
var author$project$Main$refresh = _Platform_incomingPort(
	'refresh',
	A2(
		elm$json$Json$Decode$andThen,
		function (x0) {
			return A2(
				elm$json$Json$Decode$andThen,
				function (x1) {
					return elm$json$Json$Decode$succeed(
						_Utils_Tuple2(x0, x1));
				},
				A2(elm$json$Json$Decode$index, 1, elm$json$Json$Decode$string));
		},
		A2(elm$json$Json$Decode$index, 0, elm$json$Json$Decode$string)));
var author$project$Main$refreshGraph = _Platform_incomingPort(
	'refreshGraph',
	A2(
		elm$json$Json$Decode$andThen,
		function (x0) {
			return A2(
				elm$json$Json$Decode$andThen,
				function (x1) {
					return elm$json$Json$Decode$succeed(
						_Utils_Tuple2(x0, x1));
				},
				A2(
					elm$json$Json$Decode$index,
					1,
					elm$json$Json$Decode$list(
						A2(
							elm$json$Json$Decode$andThen,
							function (x0) {
								return A2(
									elm$json$Json$Decode$andThen,
									function (x1) {
										return elm$json$Json$Decode$succeed(
											_Utils_Tuple2(x0, x1));
									},
									A2(
										elm$json$Json$Decode$index,
										1,
										elm$json$Json$Decode$list(elm$json$Json$Decode$string)));
							},
							A2(elm$json$Json$Decode$index, 0, elm$json$Json$Decode$string)))));
		},
		A2(
			elm$json$Json$Decode$index,
			0,
			elm$json$Json$Decode$list(elm$json$Json$Decode$string))));
var elm$core$Platform$Sub$batch = _Platform_batch;
var elm$core$Platform$Sub$none = elm$core$Platform$Sub$batch(_List_Nil);
var elm$time$Time$Every = F2(
	function (a, b) {
		return {$: 'Every', a: a, b: b};
	});
var elm$time$Time$State = F2(
	function (taggers, processes) {
		return {processes: processes, taggers: taggers};
	});
var elm$time$Time$init = elm$core$Task$succeed(
	A2(elm$time$Time$State, elm$core$Dict$empty, elm$core$Dict$empty));
var elm$core$Dict$merge = F6(
	function (leftStep, bothStep, rightStep, leftDict, rightDict, initialResult) {
		var stepState = F3(
			function (rKey, rValue, _n0) {
				stepState:
				while (true) {
					var list = _n0.a;
					var result = _n0.b;
					if (!list.b) {
						return _Utils_Tuple2(
							list,
							A3(rightStep, rKey, rValue, result));
					} else {
						var _n2 = list.a;
						var lKey = _n2.a;
						var lValue = _n2.b;
						var rest = list.b;
						if (_Utils_cmp(lKey, rKey) < 0) {
							var $temp$rKey = rKey,
								$temp$rValue = rValue,
								$temp$_n0 = _Utils_Tuple2(
								rest,
								A3(leftStep, lKey, lValue, result));
							rKey = $temp$rKey;
							rValue = $temp$rValue;
							_n0 = $temp$_n0;
							continue stepState;
						} else {
							if (_Utils_cmp(lKey, rKey) > 0) {
								return _Utils_Tuple2(
									list,
									A3(rightStep, rKey, rValue, result));
							} else {
								return _Utils_Tuple2(
									rest,
									A4(bothStep, lKey, lValue, rValue, result));
							}
						}
					}
				}
			});
		var _n3 = A3(
			elm$core$Dict$foldl,
			stepState,
			_Utils_Tuple2(
				elm$core$Dict$toList(leftDict),
				initialResult),
			rightDict);
		var leftovers = _n3.a;
		var intermediateResult = _n3.b;
		return A3(
			elm$core$List$foldl,
			F2(
				function (_n4, result) {
					var k = _n4.a;
					var v = _n4.b;
					return A3(leftStep, k, v, result);
				}),
			intermediateResult,
			leftovers);
	});
var elm$core$Process$kill = _Scheduler_kill;
var elm$time$Time$addMySub = F2(
	function (_n0, state) {
		var interval = _n0.a;
		var tagger = _n0.b;
		var _n1 = A2(elm$core$Dict$get, interval, state);
		if (_n1.$ === 'Nothing') {
			return A3(
				elm$core$Dict$insert,
				interval,
				_List_fromArray(
					[tagger]),
				state);
		} else {
			var taggers = _n1.a;
			return A3(
				elm$core$Dict$insert,
				interval,
				A2(elm$core$List$cons, tagger, taggers),
				state);
		}
	});
var elm$core$Platform$sendToSelf = _Platform_sendToSelf;
var elm$core$Process$spawn = _Scheduler_spawn;
var elm$time$Time$setInterval = _Time_setInterval;
var elm$time$Time$spawnHelp = F3(
	function (router, intervals, processes) {
		if (!intervals.b) {
			return elm$core$Task$succeed(processes);
		} else {
			var interval = intervals.a;
			var rest = intervals.b;
			var spawnTimer = elm$core$Process$spawn(
				A2(
					elm$time$Time$setInterval,
					interval,
					A2(elm$core$Platform$sendToSelf, router, interval)));
			var spawnRest = function (id) {
				return A3(
					elm$time$Time$spawnHelp,
					router,
					rest,
					A3(elm$core$Dict$insert, interval, id, processes));
			};
			return A2(elm$core$Task$andThen, spawnRest, spawnTimer);
		}
	});
var elm$time$Time$onEffects = F3(
	function (router, subs, _n0) {
		var processes = _n0.processes;
		var rightStep = F3(
			function (_n6, id, _n7) {
				var spawns = _n7.a;
				var existing = _n7.b;
				var kills = _n7.c;
				return _Utils_Tuple3(
					spawns,
					existing,
					A2(
						elm$core$Task$andThen,
						function (_n5) {
							return kills;
						},
						elm$core$Process$kill(id)));
			});
		var newTaggers = A3(elm$core$List$foldl, elm$time$Time$addMySub, elm$core$Dict$empty, subs);
		var leftStep = F3(
			function (interval, taggers, _n4) {
				var spawns = _n4.a;
				var existing = _n4.b;
				var kills = _n4.c;
				return _Utils_Tuple3(
					A2(elm$core$List$cons, interval, spawns),
					existing,
					kills);
			});
		var bothStep = F4(
			function (interval, taggers, id, _n3) {
				var spawns = _n3.a;
				var existing = _n3.b;
				var kills = _n3.c;
				return _Utils_Tuple3(
					spawns,
					A3(elm$core$Dict$insert, interval, id, existing),
					kills);
			});
		var _n1 = A6(
			elm$core$Dict$merge,
			leftStep,
			bothStep,
			rightStep,
			newTaggers,
			processes,
			_Utils_Tuple3(
				_List_Nil,
				elm$core$Dict$empty,
				elm$core$Task$succeed(_Utils_Tuple0)));
		var spawnList = _n1.a;
		var existingDict = _n1.b;
		var killTask = _n1.c;
		return A2(
			elm$core$Task$andThen,
			function (newProcesses) {
				return elm$core$Task$succeed(
					A2(elm$time$Time$State, newTaggers, newProcesses));
			},
			A2(
				elm$core$Task$andThen,
				function (_n2) {
					return A3(elm$time$Time$spawnHelp, router, spawnList, existingDict);
				},
				killTask));
	});
var elm$time$Time$onSelfMsg = F3(
	function (router, interval, state) {
		var _n0 = A2(elm$core$Dict$get, interval, state.taggers);
		if (_n0.$ === 'Nothing') {
			return elm$core$Task$succeed(state);
		} else {
			var taggers = _n0.a;
			var tellTaggers = function (time) {
				return elm$core$Task$sequence(
					A2(
						elm$core$List$map,
						function (tagger) {
							return A2(
								elm$core$Platform$sendToApp,
								router,
								tagger(time));
						},
						taggers));
			};
			return A2(
				elm$core$Task$andThen,
				function (_n1) {
					return elm$core$Task$succeed(state);
				},
				A2(elm$core$Task$andThen, tellTaggers, elm$time$Time$now));
		}
	});
var elm$time$Time$subMap = F2(
	function (f, _n0) {
		var interval = _n0.a;
		var tagger = _n0.b;
		return A2(
			elm$time$Time$Every,
			interval,
			A2(elm$core$Basics$composeL, f, tagger));
	});
_Platform_effectManagers['Time'] = _Platform_createManager(elm$time$Time$init, elm$time$Time$onEffects, elm$time$Time$onSelfMsg, 0, elm$time$Time$subMap);
var elm$time$Time$subscription = _Platform_leaf('Time');
var elm$time$Time$every = F2(
	function (interval, tagger) {
		return elm$time$Time$subscription(
			A2(elm$time$Time$Every, interval, tagger));
	});
var author$project$Main$subscriptions = function (model) {
	return elm$core$Platform$Sub$batch(
		_List_fromArray(
			[
				A2(
				elm$time$Time$every,
				500,
				elm$core$Basics$always(author$project$Main$PopQueue)),
				A2(
				elm$time$Time$every,
				60 * 1000,
				elm$core$Basics$always(author$project$Main$RetryQueue)),
				model.noRefresh ? elm$core$Platform$Sub$none : A2(
				elm$time$Time$every,
				(60 * 60) * 1000,
				elm$core$Basics$always(author$project$Main$Refresh)),
				author$project$Main$refresh(
				function (_n0) {
					var a = _n0.a;
					var b = _n0.b;
					return A2(author$project$Main$RefreshRequested, a, b);
				}),
				author$project$Main$refreshGraph(
				function (_n1) {
					var a = _n1.a;
					var b = _n1.b;
					return A2(author$project$Main$GraphRefreshRequested, a, b);
				}),
				author$project$Main$hook(
				function (_n2) {
					var a = _n2.a;
					var b = _n2.b;
					return A2(author$project$Main$HookReceived, a, b);
				})
			]));
};
var elm$core$Platform$worker = _Platform_worker;
var author$project$Main$main = elm$core$Platform$worker(
	{init: author$project$Main$init, subscriptions: author$project$Main$subscriptions, update: author$project$Main$update});
_Platform_export({'Main':{'init':author$project$Main$main(
	A2(
		elm$json$Json$Decode$andThen,
		function (skipTimeline) {
			return A2(
				elm$json$Json$Decode$andThen,
				function (noRefresh) {
					return A2(
						elm$json$Json$Decode$andThen,
						function (githubToken) {
							return A2(
								elm$json$Json$Decode$andThen,
								function (githubOrg) {
									return elm$json$Json$Decode$succeed(
										{githubOrg: githubOrg, githubToken: githubToken, noRefresh: noRefresh, skipTimeline: skipTimeline});
								},
								A2(elm$json$Json$Decode$field, 'githubOrg', elm$json$Json$Decode$string));
						},
						A2(elm$json$Json$Decode$field, 'githubToken', elm$json$Json$Decode$string));
				},
				A2(elm$json$Json$Decode$field, 'noRefresh', elm$json$Json$Decode$bool));
		},
		A2(elm$json$Json$Decode$field, 'skipTimeline', elm$json$Json$Decode$bool)))(0)}});}(this));