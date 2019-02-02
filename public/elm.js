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




var _List_Nil = { $: 0 };
var _List_Nil_UNUSED = { $: '[]' };

function _List_Cons(hd, tl) { return { $: 1, a: hd, b: tl }; }
function _List_Cons_UNUSED(hd, tl) { return { $: '::', a: hd, b: tl }; }


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

	/**_UNUSED/
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

	/**/
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

	/**_UNUSED/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

	/**/
	if (!x.$)
	//*/
	/**_UNUSED/
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

var _Utils_Tuple0 = 0;
var _Utils_Tuple0_UNUSED = { $: '#0' };

function _Utils_Tuple2(a, b) { return { a: a, b: b }; }
function _Utils_Tuple2_UNUSED(a, b) { return { $: '#2', a: a, b: b }; }

function _Utils_Tuple3(a, b, c) { return { a: a, b: b, c: c }; }
function _Utils_Tuple3_UNUSED(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }

function _Utils_chr(c) { return c; }
function _Utils_chr_UNUSED(c) { return new String(c); }


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

var _Debug_log = F2(function(tag, value)
{
	return value;
});

var _Debug_log_UNUSED = F2(function(tag, value)
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

function _Debug_toString(value)
{
	return '<internals>';
}

function _Debug_toString_UNUSED(value)
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


function _Debug_crash(identifier)
{
	throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
}


function _Debug_crash_UNUSED(identifier, fact1, fact2, fact3, fact4)
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
	if (region.aE.b0 === region.fg.b0)
	{
		return 'on line ' + region.aE.b0;
	}
	return 'on lines ' + region.aE.b0 + ' through ' + region.fg.b0;
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




/**_UNUSED/
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

function _Json_wrap_UNUSED(value) { return { $: 0, a: value }; }
function _Json_unwrap_UNUSED(value) { return value.a; }

function _Json_wrap(value) { return value; }
function _Json_unwrap(value) { return value; }

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
			callback(_Http_handleResponse(xhr, request.dm.a));
		});

		try
		{
			xhr.open(request.hr, request.ib, true);
		}
		catch (e)
		{
			return callback(_Scheduler_fail(elm$http$Http$BadUrl(request.ib)));
		}

		_Http_configureRequest(xhr, request);

		var body = request.gM;
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
			gP: event.loaded,
			gQ: event.total
		}));
	});
}

function _Http_configureRequest(xhr, request)
{
	for (var headers = request.he; headers.b; headers = headers.b) // WHILE_CONS
	{
		xhr.setRequestHeader(headers.a.a, headers.a.b);
	}

	xhr.responseType = request.dm.b;
	xhr.withCredentials = request.ih;

	elm$core$Maybe$isJust(request.h1) && (xhr.timeout = request.h1.a);
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
		ib: xhr.responseURL,
		gq: { gU: xhr.status, aS: xhr.statusText },
		he: _Http_parseHeaders(xhr.getAllResponseHeaders()),
		gM: xhr.response
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
		impl.hk,
		impl.ia,
		impl.hY,
		function() { return function() {} }
	);
});



// INITIALIZE A PROGRAM


function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder)
{
	var result = A2(_Json_run, flagDecoder, _Json_wrap(args ? args['flags'] : undefined));
	elm$core$Result$isOk(result) || _Debug_crash(2 /**_UNUSED/, _Json_errorToString(result.a) /**/);
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


function _Platform_export(exports)
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


function _Platform_export_UNUSED(exports)
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


// CREATE

var _Regex_never = /.^/;

var _Regex_fromStringWith = F2(function(options, string)
{
	var flags = 'g';
	if (options.fR) { flags += 'm'; }
	if (options.eT) { flags += 'i'; }

	try
	{
		return elm$core$Maybe$Just(new RegExp(string, flags));
	}
	catch(error)
	{
		return elm$core$Maybe$Nothing;
	}
});


// USE

var _Regex_contains = F2(function(re, string)
{
	return string.match(re) !== null;
});


var _Regex_findAtMost = F3(function(n, re, str)
{
	var out = [];
	var number = 0;
	var string = str;
	var lastIndex = re.lastIndex;
	var prevLastIndex = -1;
	var result;
	while (number++ < n && (result = re.exec(string)))
	{
		if (prevLastIndex == re.lastIndex) break;
		var i = result.length - 1;
		var subs = new Array(i);
		while (i > 0)
		{
			var submatch = result[i];
			subs[--i] = submatch
				? elm$core$Maybe$Just(submatch)
				: elm$core$Maybe$Nothing;
		}
		out.push(A4(elm$regex$Regex$Match, result[0], result.index, number, _List_fromArray(subs)));
		prevLastIndex = re.lastIndex;
	}
	re.lastIndex = lastIndex;
	return _List_fromArray(out);
});


var _Regex_replaceAtMost = F4(function(n, re, replacer, string)
{
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
			submatches[--i] = submatch
				? elm$core$Maybe$Just(submatch)
				: elm$core$Maybe$Nothing;
		}
		return replacer(A4(elm$regex$Regex$Match, match, arguments[arguments.length - 2], count, _List_fromArray(submatches)));
	}
	return string.replace(re, jsReplacer);
});

var _Regex_splitAtMost = F3(function(n, re, str)
{
	var string = str;
	var out = [];
	var start = re.lastIndex;
	var restoreLastIndex = re.lastIndex;
	while (n--)
	{
		var result = re.exec(string);
		if (!result) break;
		out.push(string.slice(start, result.index));
		start = re.lastIndex;
	}
	out.push(string.slice(start));
	re.lastIndex = restoreLastIndex;
	return _List_fromArray(out);
});

var _Regex_infinity = Infinity;




// HELPERS


var _VirtualDom_divertHrefToApp;

var _VirtualDom_doc = typeof document !== 'undefined' ? document : {};


function _VirtualDom_appendChild(parent, child)
{
	parent.appendChild(child);
}

var _VirtualDom_init = F4(function(virtualNode, flagDecoder, debugMetadata, args)
{
	// NOTE: this function needs _Platform_export available to work

	/**/
	var node = args['node'];
	//*/
	/**_UNUSED/
	var node = args && args['node'] ? args['node'] : _Debug_crash(0);
	//*/

	node.parentNode.replaceChild(
		_VirtualDom_render(virtualNode, function() {}),
		node
	);

	return {};
});



// TEXT


function _VirtualDom_text(string)
{
	return {
		$: 0,
		a: string
	};
}



// NODE


var _VirtualDom_nodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 1,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_node = _VirtualDom_nodeNS(undefined);



// KEYED NODE


var _VirtualDom_keyedNodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 2,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_keyedNode = _VirtualDom_keyedNodeNS(undefined);



// CUSTOM


function _VirtualDom_custom(factList, model, render, diff)
{
	return {
		$: 3,
		d: _VirtualDom_organizeFacts(factList),
		g: model,
		h: render,
		i: diff
	};
}



// MAP


var _VirtualDom_map = F2(function(tagger, node)
{
	return {
		$: 4,
		j: tagger,
		k: node,
		b: 1 + (node.b || 0)
	};
});



// LAZY


function _VirtualDom_thunk(refs, thunk)
{
	return {
		$: 5,
		l: refs,
		m: thunk,
		k: undefined
	};
}

var _VirtualDom_lazy = F2(function(func, a)
{
	return _VirtualDom_thunk([func, a], function() {
		return func(a);
	});
});

var _VirtualDom_lazy2 = F3(function(func, a, b)
{
	return _VirtualDom_thunk([func, a, b], function() {
		return A2(func, a, b);
	});
});

var _VirtualDom_lazy3 = F4(function(func, a, b, c)
{
	return _VirtualDom_thunk([func, a, b, c], function() {
		return A3(func, a, b, c);
	});
});

var _VirtualDom_lazy4 = F5(function(func, a, b, c, d)
{
	return _VirtualDom_thunk([func, a, b, c, d], function() {
		return A4(func, a, b, c, d);
	});
});

var _VirtualDom_lazy5 = F6(function(func, a, b, c, d, e)
{
	return _VirtualDom_thunk([func, a, b, c, d, e], function() {
		return A5(func, a, b, c, d, e);
	});
});

var _VirtualDom_lazy6 = F7(function(func, a, b, c, d, e, f)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f], function() {
		return A6(func, a, b, c, d, e, f);
	});
});

var _VirtualDom_lazy7 = F8(function(func, a, b, c, d, e, f, g)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g], function() {
		return A7(func, a, b, c, d, e, f, g);
	});
});

var _VirtualDom_lazy8 = F9(function(func, a, b, c, d, e, f, g, h)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g, h], function() {
		return A8(func, a, b, c, d, e, f, g, h);
	});
});



// FACTS


var _VirtualDom_on = F2(function(key, handler)
{
	return {
		$: 'a0',
		n: key,
		o: handler
	};
});
var _VirtualDom_style = F2(function(key, value)
{
	return {
		$: 'a1',
		n: key,
		o: value
	};
});
var _VirtualDom_property = F2(function(key, value)
{
	return {
		$: 'a2',
		n: key,
		o: value
	};
});
var _VirtualDom_attribute = F2(function(key, value)
{
	return {
		$: 'a3',
		n: key,
		o: value
	};
});
var _VirtualDom_attributeNS = F3(function(namespace, key, value)
{
	return {
		$: 'a4',
		n: key,
		o: { f: namespace, o: value }
	};
});



// XSS ATTACK VECTOR CHECKS


function _VirtualDom_noScript(tag)
{
	return tag == 'script' ? 'p' : tag;
}

function _VirtualDom_noOnOrFormAction(key)
{
	return /^(on|formAction$)/i.test(key) ? 'data-' + key : key;
}

function _VirtualDom_noInnerHtmlOrFormAction(key)
{
	return key == 'innerHTML' || key == 'formAction' ? 'data-' + key : key;
}

function _VirtualDom_noJavaScriptUri(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,'')) ? '' : value;
}

function _VirtualDom_noJavaScriptUri_UNUSED(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,''))
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlUri(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value) ? '' : value;
}

function _VirtualDom_noJavaScriptOrHtmlUri_UNUSED(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value)
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}



// MAP FACTS


var _VirtualDom_mapAttribute = F2(function(func, attr)
{
	return (attr.$ === 'a0')
		? A2(_VirtualDom_on, attr.n, _VirtualDom_mapHandler(func, attr.o))
		: attr;
});

function _VirtualDom_mapHandler(func, handler)
{
	var tag = elm$virtual_dom$VirtualDom$toHandlerInt(handler);

	// 0 = Normal
	// 1 = MayStopPropagation
	// 2 = MayPreventDefault
	// 3 = Custom

	return {
		$: handler.$,
		a:
			!tag
				? A2(elm$json$Json$Decode$map, func, handler.a)
				:
			A3(elm$json$Json$Decode$map2,
				tag < 3
					? _VirtualDom_mapEventTuple
					: _VirtualDom_mapEventRecord,
				elm$json$Json$Decode$succeed(func),
				handler.a
			)
	};
}

var _VirtualDom_mapEventTuple = F2(function(func, tuple)
{
	return _Utils_Tuple2(func(tuple.a), tuple.b);
});

var _VirtualDom_mapEventRecord = F2(function(func, record)
{
	return {
		aS: func(record.aS),
		el: record.el,
		d6: record.d6
	}
});



// ORGANIZE FACTS


function _VirtualDom_organizeFacts(factList)
{
	for (var facts = {}; factList.b; factList = factList.b) // WHILE_CONS
	{
		var entry = factList.a;

		var tag = entry.$;
		var key = entry.n;
		var value = entry.o;

		if (tag === 'a2')
		{
			(key === 'className')
				? _VirtualDom_addClass(facts, key, _Json_unwrap(value))
				: facts[key] = _Json_unwrap(value);

			continue;
		}

		var subFacts = facts[tag] || (facts[tag] = {});
		(tag === 'a3' && key === 'class')
			? _VirtualDom_addClass(subFacts, key, value)
			: subFacts[key] = value;
	}

	return facts;
}

function _VirtualDom_addClass(object, key, newClass)
{
	var classes = object[key];
	object[key] = classes ? classes + ' ' + newClass : newClass;
}



// RENDER


function _VirtualDom_render(vNode, eventNode)
{
	var tag = vNode.$;

	if (tag === 5)
	{
		return _VirtualDom_render(vNode.k || (vNode.k = vNode.m()), eventNode);
	}

	if (tag === 0)
	{
		return _VirtualDom_doc.createTextNode(vNode.a);
	}

	if (tag === 4)
	{
		var subNode = vNode.k;
		var tagger = vNode.j;

		while (subNode.$ === 4)
		{
			typeof tagger !== 'object'
				? tagger = [tagger, subNode.j]
				: tagger.push(subNode.j);

			subNode = subNode.k;
		}

		var subEventRoot = { j: tagger, p: eventNode };
		var domNode = _VirtualDom_render(subNode, subEventRoot);
		domNode.elm_event_node_ref = subEventRoot;
		return domNode;
	}

	if (tag === 3)
	{
		var domNode = vNode.h(vNode.g);
		_VirtualDom_applyFacts(domNode, eventNode, vNode.d);
		return domNode;
	}

	// at this point `tag` must be 1 or 2

	var domNode = vNode.f
		? _VirtualDom_doc.createElementNS(vNode.f, vNode.c)
		: _VirtualDom_doc.createElement(vNode.c);

	if (_VirtualDom_divertHrefToApp && vNode.c == 'a')
	{
		domNode.addEventListener('click', _VirtualDom_divertHrefToApp(domNode));
	}

	_VirtualDom_applyFacts(domNode, eventNode, vNode.d);

	for (var kids = vNode.e, i = 0; i < kids.length; i++)
	{
		_VirtualDom_appendChild(domNode, _VirtualDom_render(tag === 1 ? kids[i] : kids[i].b, eventNode));
	}

	return domNode;
}



// APPLY FACTS


function _VirtualDom_applyFacts(domNode, eventNode, facts)
{
	for (var key in facts)
	{
		var value = facts[key];

		key === 'a1'
			? _VirtualDom_applyStyles(domNode, value)
			:
		key === 'a0'
			? _VirtualDom_applyEvents(domNode, eventNode, value)
			:
		key === 'a3'
			? _VirtualDom_applyAttrs(domNode, value)
			:
		key === 'a4'
			? _VirtualDom_applyAttrsNS(domNode, value)
			:
		((key !== 'value' && key !== 'checked') || domNode[key] !== value) && (domNode[key] = value);
	}
}



// APPLY STYLES


function _VirtualDom_applyStyles(domNode, styles)
{
	var domNodeStyle = domNode.style;

	for (var key in styles)
	{
		domNodeStyle[key] = styles[key];
	}
}



// APPLY ATTRS


function _VirtualDom_applyAttrs(domNode, attrs)
{
	for (var key in attrs)
	{
		var value = attrs[key];
		typeof value !== 'undefined'
			? domNode.setAttribute(key, value)
			: domNode.removeAttribute(key);
	}
}



// APPLY NAMESPACED ATTRS


function _VirtualDom_applyAttrsNS(domNode, nsAttrs)
{
	for (var key in nsAttrs)
	{
		var pair = nsAttrs[key];
		var namespace = pair.f;
		var value = pair.o;

		typeof value !== 'undefined'
			? domNode.setAttributeNS(namespace, key, value)
			: domNode.removeAttributeNS(namespace, key);
	}
}



// APPLY EVENTS


function _VirtualDom_applyEvents(domNode, eventNode, events)
{
	var allCallbacks = domNode.elmFs || (domNode.elmFs = {});

	for (var key in events)
	{
		var newHandler = events[key];
		var oldCallback = allCallbacks[key];

		if (!newHandler)
		{
			domNode.removeEventListener(key, oldCallback);
			allCallbacks[key] = undefined;
			continue;
		}

		if (oldCallback)
		{
			var oldHandler = oldCallback.q;
			if (oldHandler.$ === newHandler.$)
			{
				oldCallback.q = newHandler;
				continue;
			}
			domNode.removeEventListener(key, oldCallback);
		}

		oldCallback = _VirtualDom_makeCallback(eventNode, newHandler);
		domNode.addEventListener(key, oldCallback,
			_VirtualDom_passiveSupported
			&& { passive: elm$virtual_dom$VirtualDom$toHandlerInt(newHandler) < 2 }
		);
		allCallbacks[key] = oldCallback;
	}
}



// PASSIVE EVENTS


var _VirtualDom_passiveSupported;

try
{
	window.addEventListener('t', null, Object.defineProperty({}, 'passive', {
		get: function() { _VirtualDom_passiveSupported = true; }
	}));
}
catch(e) {}



// EVENT HANDLERS


function _VirtualDom_makeCallback(eventNode, initialHandler)
{
	function callback(event)
	{
		var handler = callback.q;
		var result = _Json_runHelp(handler.a, event);

		if (!elm$core$Result$isOk(result))
		{
			return;
		}

		var tag = elm$virtual_dom$VirtualDom$toHandlerInt(handler);

		// 0 = Normal
		// 1 = MayStopPropagation
		// 2 = MayPreventDefault
		// 3 = Custom

		var value = result.a;
		var message = !tag ? value : tag < 3 ? value.a : value.aS;
		var stopPropagation = tag == 1 ? value.b : tag == 3 && value.el;
		var currentEventNode = (
			stopPropagation && event.stopPropagation(),
			(tag == 2 ? value.b : tag == 3 && value.d6) && event.preventDefault(),
			eventNode
		);
		var tagger;
		var i;
		while (tagger = currentEventNode.j)
		{
			if (typeof tagger == 'function')
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
			currentEventNode = currentEventNode.p;
		}
		currentEventNode(message, stopPropagation); // stopPropagation implies isSync
	}

	callback.q = initialHandler;

	return callback;
}

function _VirtualDom_equalEvents(x, y)
{
	return x.$ == y.$ && _Json_equality(x.a, y.a);
}



// DIFF


// TODO: Should we do patches like in iOS?
//
// type Patch
//   = At Int Patch
//   | Batch (List Patch)
//   | Change ...
//
// How could it not be better?
//
function _VirtualDom_diff(x, y)
{
	var patches = [];
	_VirtualDom_diffHelp(x, y, patches, 0);
	return patches;
}


function _VirtualDom_pushPatch(patches, type, index, data)
{
	var patch = {
		$: type,
		r: index,
		s: data,
		t: undefined,
		u: undefined
	};
	patches.push(patch);
	return patch;
}


function _VirtualDom_diffHelp(x, y, patches, index)
{
	if (x === y)
	{
		return;
	}

	var xType = x.$;
	var yType = y.$;

	// Bail if you run into different types of nodes. Implies that the
	// structure has changed significantly and it's not worth a diff.
	if (xType !== yType)
	{
		if (xType === 1 && yType === 2)
		{
			y = _VirtualDom_dekey(y);
			yType = 1;
		}
		else
		{
			_VirtualDom_pushPatch(patches, 0, index, y);
			return;
		}
	}

	// Now we know that both nodes are the same $.
	switch (yType)
	{
		case 5:
			var xRefs = x.l;
			var yRefs = y.l;
			var i = xRefs.length;
			var same = i === yRefs.length;
			while (same && i--)
			{
				same = xRefs[i] === yRefs[i];
			}
			if (same)
			{
				y.k = x.k;
				return;
			}
			y.k = y.m();
			var subPatches = [];
			_VirtualDom_diffHelp(x.k, y.k, subPatches, 0);
			subPatches.length > 0 && _VirtualDom_pushPatch(patches, 1, index, subPatches);
			return;

		case 4:
			// gather nested taggers
			var xTaggers = x.j;
			var yTaggers = y.j;
			var nesting = false;

			var xSubNode = x.k;
			while (xSubNode.$ === 4)
			{
				nesting = true;

				typeof xTaggers !== 'object'
					? xTaggers = [xTaggers, xSubNode.j]
					: xTaggers.push(xSubNode.j);

				xSubNode = xSubNode.k;
			}

			var ySubNode = y.k;
			while (ySubNode.$ === 4)
			{
				nesting = true;

				typeof yTaggers !== 'object'
					? yTaggers = [yTaggers, ySubNode.j]
					: yTaggers.push(ySubNode.j);

				ySubNode = ySubNode.k;
			}

			// Just bail if different numbers of taggers. This implies the
			// structure of the virtual DOM has changed.
			if (nesting && xTaggers.length !== yTaggers.length)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			// check if taggers are "the same"
			if (nesting ? !_VirtualDom_pairwiseRefEqual(xTaggers, yTaggers) : xTaggers !== yTaggers)
			{
				_VirtualDom_pushPatch(patches, 2, index, yTaggers);
			}

			// diff everything below the taggers
			_VirtualDom_diffHelp(xSubNode, ySubNode, patches, index + 1);
			return;

		case 0:
			if (x.a !== y.a)
			{
				_VirtualDom_pushPatch(patches, 3, index, y.a);
			}
			return;

		case 1:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKids);
			return;

		case 2:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKeyedKids);
			return;

		case 3:
			if (x.h !== y.h)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
			factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

			var patch = y.i(x.g, y.g);
			patch && _VirtualDom_pushPatch(patches, 5, index, patch);

			return;
	}
}

// assumes the incoming arrays are the same length
function _VirtualDom_pairwiseRefEqual(as, bs)
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

function _VirtualDom_diffNodes(x, y, patches, index, diffKids)
{
	// Bail if obvious indicators have changed. Implies more serious
	// structural changes such that it's not worth it to diff.
	if (x.c !== y.c || x.f !== y.f)
	{
		_VirtualDom_pushPatch(patches, 0, index, y);
		return;
	}

	var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
	factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

	diffKids(x, y, patches, index);
}



// DIFF FACTS


// TODO Instead of creating a new diff object, it's possible to just test if
// there *is* a diff. During the actual patch, do the diff again and make the
// modifications directly. This way, there's no new allocations. Worth it?
function _VirtualDom_diffFacts(x, y, category)
{
	var diff;

	// look for changes and removals
	for (var xKey in x)
	{
		if (xKey === 'a1' || xKey === 'a0' || xKey === 'a3' || xKey === 'a4')
		{
			var subDiff = _VirtualDom_diffFacts(x[xKey], y[xKey] || {}, xKey);
			if (subDiff)
			{
				diff = diff || {};
				diff[xKey] = subDiff;
			}
			continue;
		}

		// remove if not in the new facts
		if (!(xKey in y))
		{
			diff = diff || {};
			diff[xKey] =
				!category
					? (typeof x[xKey] === 'string' ? '' : null)
					:
				(category === 'a1')
					? ''
					:
				(category === 'a0' || category === 'a3')
					? undefined
					:
				{ f: x[xKey].f, o: undefined };

			continue;
		}

		var xValue = x[xKey];
		var yValue = y[xKey];

		// reference equal, so don't worry about it
		if (xValue === yValue && xKey !== 'value' && xKey !== 'checked'
			|| category === 'a0' && _VirtualDom_equalEvents(xValue, yValue))
		{
			continue;
		}

		diff = diff || {};
		diff[xKey] = yValue;
	}

	// add new stuff
	for (var yKey in y)
	{
		if (!(yKey in x))
		{
			diff = diff || {};
			diff[yKey] = y[yKey];
		}
	}

	return diff;
}



// DIFF KIDS


function _VirtualDom_diffKids(xParent, yParent, patches, index)
{
	var xKids = xParent.e;
	var yKids = yParent.e;

	var xLen = xKids.length;
	var yLen = yKids.length;

	// FIGURE OUT IF THERE ARE INSERTS OR REMOVALS

	if (xLen > yLen)
	{
		_VirtualDom_pushPatch(patches, 6, index, {
			v: yLen,
			i: xLen - yLen
		});
	}
	else if (xLen < yLen)
	{
		_VirtualDom_pushPatch(patches, 7, index, {
			v: xLen,
			e: yKids
		});
	}

	// PAIRWISE DIFF EVERYTHING ELSE

	for (var minLen = xLen < yLen ? xLen : yLen, i = 0; i < minLen; i++)
	{
		var xKid = xKids[i];
		_VirtualDom_diffHelp(xKid, yKids[i], patches, ++index);
		index += xKid.b || 0;
	}
}



// KEYED DIFF


function _VirtualDom_diffKeyedKids(xParent, yParent, patches, rootIndex)
{
	var localPatches = [];

	var changes = {}; // Dict String Entry
	var inserts = []; // Array { index : Int, entry : Entry }
	// type Entry = { tag : String, vnode : VNode, index : Int, data : _ }

	var xKids = xParent.e;
	var yKids = yParent.e;
	var xLen = xKids.length;
	var yLen = yKids.length;
	var xIndex = 0;
	var yIndex = 0;

	var index = rootIndex;

	while (xIndex < xLen && yIndex < yLen)
	{
		var x = xKids[xIndex];
		var y = yKids[yIndex];

		var xKey = x.a;
		var yKey = y.a;
		var xNode = x.b;
		var yNode = y.b;

		var newMatch = undefined;
		var oldMatch = undefined;

		// check if keys match

		if (xKey === yKey)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNode, localPatches, index);
			index += xNode.b || 0;

			xIndex++;
			yIndex++;
			continue;
		}

		// look ahead 1 to detect insertions and removals.

		var xNext = xKids[xIndex + 1];
		var yNext = yKids[yIndex + 1];

		if (xNext)
		{
			var xNextKey = xNext.a;
			var xNextNode = xNext.b;
			oldMatch = yKey === xNextKey;
		}

		if (yNext)
		{
			var yNextKey = yNext.a;
			var yNextNode = yNext.b;
			newMatch = xKey === yNextKey;
		}


		// swap x and y
		if (newMatch && oldMatch)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			_VirtualDom_insertNode(changes, localPatches, xKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNextNode, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		// insert y
		if (newMatch)
		{
			index++;
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			index += xNode.b || 0;

			xIndex += 1;
			yIndex += 2;
			continue;
		}

		// remove x
		if (oldMatch)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 1;
			continue;
		}

		// remove x, insert y
		if (xNext && xNextKey === yNextKey)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNextNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		break;
	}

	// eat up any remaining nodes with removeNode and insertNode

	while (xIndex < xLen)
	{
		index++;
		var x = xKids[xIndex];
		var xNode = x.b;
		_VirtualDom_removeNode(changes, localPatches, x.a, xNode, index);
		index += xNode.b || 0;
		xIndex++;
	}

	while (yIndex < yLen)
	{
		var endInserts = endInserts || [];
		var y = yKids[yIndex];
		_VirtualDom_insertNode(changes, localPatches, y.a, y.b, undefined, endInserts);
		yIndex++;
	}

	if (localPatches.length > 0 || inserts.length > 0 || endInserts)
	{
		_VirtualDom_pushPatch(patches, 8, rootIndex, {
			w: localPatches,
			x: inserts,
			y: endInserts
		});
	}
}



// CHANGES FROM KEYED DIFF


var _VirtualDom_POSTFIX = '_elmW6BL';


function _VirtualDom_insertNode(changes, localPatches, key, vnode, yIndex, inserts)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		entry = {
			c: 0,
			z: vnode,
			r: yIndex,
			s: undefined
		};

		inserts.push({ r: yIndex, A: entry });
		changes[key] = entry;

		return;
	}

	// this key was removed earlier, a match!
	if (entry.c === 1)
	{
		inserts.push({ r: yIndex, A: entry });

		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(entry.z, vnode, subPatches, entry.r);
		entry.r = yIndex;
		entry.s.s = {
			w: subPatches,
			A: entry
		};

		return;
	}

	// this key has already been inserted or moved, a duplicate!
	_VirtualDom_insertNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, yIndex, inserts);
}


function _VirtualDom_removeNode(changes, localPatches, key, vnode, index)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		var patch = _VirtualDom_pushPatch(localPatches, 9, index, undefined);

		changes[key] = {
			c: 1,
			z: vnode,
			r: index,
			s: patch
		};

		return;
	}

	// this key was inserted earlier, a match!
	if (entry.c === 0)
	{
		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(vnode, entry.z, subPatches, index);

		_VirtualDom_pushPatch(localPatches, 9, index, {
			w: subPatches,
			A: entry
		});

		return;
	}

	// this key has already been removed or moved, a duplicate!
	_VirtualDom_removeNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, index);
}



// ADD DOM NODES
//
// Each DOM node has an "index" assigned in order of traversal. It is important
// to minimize our crawl over the actual DOM, so these indexes (along with the
// descendantsCount of virtual nodes) let us skip touching entire subtrees of
// the DOM if we know there are no patches there.


function _VirtualDom_addDomNodes(domNode, vNode, patches, eventNode)
{
	_VirtualDom_addDomNodesHelp(domNode, vNode, patches, 0, 0, vNode.b, eventNode);
}


// assumes `patches` is non-empty and indexes increase monotonically.
function _VirtualDom_addDomNodesHelp(domNode, vNode, patches, i, low, high, eventNode)
{
	var patch = patches[i];
	var index = patch.r;

	while (index === low)
	{
		var patchType = patch.$;

		if (patchType === 1)
		{
			_VirtualDom_addDomNodes(domNode, vNode.k, patch.s, eventNode);
		}
		else if (patchType === 8)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var subPatches = patch.s.w;
			if (subPatches.length > 0)
			{
				_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
			}
		}
		else if (patchType === 9)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var data = patch.s;
			if (data)
			{
				data.A.s = domNode;
				var subPatches = data.w;
				if (subPatches.length > 0)
				{
					_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
				}
			}
		}
		else
		{
			patch.t = domNode;
			patch.u = eventNode;
		}

		i++;

		if (!(patch = patches[i]) || (index = patch.r) > high)
		{
			return i;
		}
	}

	var tag = vNode.$;

	if (tag === 4)
	{
		var subNode = vNode.k;

		while (subNode.$ === 4)
		{
			subNode = subNode.k;
		}

		return _VirtualDom_addDomNodesHelp(domNode, subNode, patches, i, low + 1, high, domNode.elm_event_node_ref);
	}

	// tag must be 1 or 2 at this point

	var vKids = vNode.e;
	var childNodes = domNode.childNodes;
	for (var j = 0; j < vKids.length; j++)
	{
		low++;
		var vKid = tag === 1 ? vKids[j] : vKids[j].b;
		var nextLow = low + (vKid.b || 0);
		if (low <= index && index <= nextLow)
		{
			i = _VirtualDom_addDomNodesHelp(childNodes[j], vKid, patches, i, low, nextLow, eventNode);
			if (!(patch = patches[i]) || (index = patch.r) > high)
			{
				return i;
			}
		}
		low = nextLow;
	}
	return i;
}



// APPLY PATCHES


function _VirtualDom_applyPatches(rootDomNode, oldVirtualNode, patches, eventNode)
{
	if (patches.length === 0)
	{
		return rootDomNode;
	}

	_VirtualDom_addDomNodes(rootDomNode, oldVirtualNode, patches, eventNode);
	return _VirtualDom_applyPatchesHelp(rootDomNode, patches);
}

function _VirtualDom_applyPatchesHelp(rootDomNode, patches)
{
	for (var i = 0; i < patches.length; i++)
	{
		var patch = patches[i];
		var localDomNode = patch.t
		var newNode = _VirtualDom_applyPatch(localDomNode, patch);
		if (localDomNode === rootDomNode)
		{
			rootDomNode = newNode;
		}
	}
	return rootDomNode;
}

function _VirtualDom_applyPatch(domNode, patch)
{
	switch (patch.$)
	{
		case 0:
			return _VirtualDom_applyPatchRedraw(domNode, patch.s, patch.u);

		case 4:
			_VirtualDom_applyFacts(domNode, patch.u, patch.s);
			return domNode;

		case 3:
			domNode.replaceData(0, domNode.length, patch.s);
			return domNode;

		case 1:
			return _VirtualDom_applyPatchesHelp(domNode, patch.s);

		case 2:
			if (domNode.elm_event_node_ref)
			{
				domNode.elm_event_node_ref.j = patch.s;
			}
			else
			{
				domNode.elm_event_node_ref = { j: patch.s, p: patch.u };
			}
			return domNode;

		case 6:
			var data = patch.s;
			for (var i = 0; i < data.i; i++)
			{
				domNode.removeChild(domNode.childNodes[data.v]);
			}
			return domNode;

		case 7:
			var data = patch.s;
			var kids = data.e;
			var i = data.v;
			var theEnd = domNode.childNodes[i];
			for (; i < kids.length; i++)
			{
				domNode.insertBefore(_VirtualDom_render(kids[i], patch.u), theEnd);
			}
			return domNode;

		case 9:
			var data = patch.s;
			if (!data)
			{
				domNode.parentNode.removeChild(domNode);
				return domNode;
			}
			var entry = data.A;
			if (typeof entry.r !== 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
			}
			entry.s = _VirtualDom_applyPatchesHelp(domNode, data.w);
			return domNode;

		case 8:
			return _VirtualDom_applyPatchReorder(domNode, patch);

		case 5:
			return patch.s(domNode);

		default:
			_Debug_crash(10); // 'Ran into an unknown patch!'
	}
}


function _VirtualDom_applyPatchRedraw(domNode, vNode, eventNode)
{
	var parentNode = domNode.parentNode;
	var newNode = _VirtualDom_render(vNode, eventNode);

	if (!newNode.elm_event_node_ref)
	{
		newNode.elm_event_node_ref = domNode.elm_event_node_ref;
	}

	if (parentNode && newNode !== domNode)
	{
		parentNode.replaceChild(newNode, domNode);
	}
	return newNode;
}


function _VirtualDom_applyPatchReorder(domNode, patch)
{
	var data = patch.s;

	// remove end inserts
	var frag = _VirtualDom_applyPatchReorderEndInsertsHelp(data.y, patch);

	// removals
	domNode = _VirtualDom_applyPatchesHelp(domNode, data.w);

	// inserts
	var inserts = data.x;
	for (var i = 0; i < inserts.length; i++)
	{
		var insert = inserts[i];
		var entry = insert.A;
		var node = entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u);
		domNode.insertBefore(node, domNode.childNodes[insert.r]);
	}

	// add end inserts
	if (frag)
	{
		_VirtualDom_appendChild(domNode, frag);
	}

	return domNode;
}


function _VirtualDom_applyPatchReorderEndInsertsHelp(endInserts, patch)
{
	if (!endInserts)
	{
		return;
	}

	var frag = _VirtualDom_doc.createDocumentFragment();
	for (var i = 0; i < endInserts.length; i++)
	{
		var insert = endInserts[i];
		var entry = insert.A;
		_VirtualDom_appendChild(frag, entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u)
		);
	}
	return frag;
}


function _VirtualDom_virtualize(node)
{
	// TEXT NODES

	if (node.nodeType === 3)
	{
		return _VirtualDom_text(node.textContent);
	}


	// WEIRD NODES

	if (node.nodeType !== 1)
	{
		return _VirtualDom_text('');
	}


	// ELEMENT NODES

	var attrList = _List_Nil;
	var attrs = node.attributes;
	for (var i = attrs.length; i--; )
	{
		var attr = attrs[i];
		var name = attr.name;
		var value = attr.value;
		attrList = _List_Cons( A2(_VirtualDom_attribute, name, value), attrList );
	}

	var tag = node.tagName.toLowerCase();
	var kidList = _List_Nil;
	var kids = node.childNodes;

	for (var i = kids.length; i--; )
	{
		kidList = _List_Cons(_VirtualDom_virtualize(kids[i]), kidList);
	}
	return A3(_VirtualDom_node, tag, attrList, kidList);
}

function _VirtualDom_dekey(keyedNode)
{
	var keyedKids = keyedNode.e;
	var len = keyedKids.length;
	var kids = new Array(len);
	for (var i = 0; i < len; i++)
	{
		kids[i] = keyedKids[i].b;
	}

	return {
		$: 1,
		c: keyedNode.c,
		d: keyedNode.d,
		e: kids,
		f: keyedNode.f,
		b: keyedNode.b
	};
}




// ELEMENT


var _Debugger_element;

var _Browser_element = _Debugger_element || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.hk,
		impl.ia,
		impl.hY,
		function(sendToApp, initialModel) {
			var view = impl.id;
			/**/
			var domNode = args['node'];
			//*/
			/**_UNUSED/
			var domNode = args && args['node'] ? args['node'] : _Debug_crash(0);
			//*/
			var currNode = _VirtualDom_virtualize(domNode);

			return _Browser_makeAnimator(initialModel, function(model)
			{
				var nextNode = view(model);
				var patches = _VirtualDom_diff(currNode, nextNode);
				domNode = _VirtualDom_applyPatches(domNode, currNode, patches, sendToApp);
				currNode = nextNode;
			});
		}
	);
});



// DOCUMENT


var _Debugger_document;

var _Browser_document = _Debugger_document || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.hk,
		impl.ia,
		impl.hY,
		function(sendToApp, initialModel) {
			var divertHrefToApp = impl.b9 && impl.b9(sendToApp)
			var view = impl.id;
			var title = _VirtualDom_doc.title;
			var bodyNode = _VirtualDom_doc.body;
			var currNode = _VirtualDom_virtualize(bodyNode);
			return _Browser_makeAnimator(initialModel, function(model)
			{
				_VirtualDom_divertHrefToApp = divertHrefToApp;
				var doc = view(model);
				var nextNode = _VirtualDom_node('body')(_List_Nil)(doc.gM);
				var patches = _VirtualDom_diff(currNode, nextNode);
				bodyNode = _VirtualDom_applyPatches(bodyNode, currNode, patches, sendToApp);
				currNode = nextNode;
				_VirtualDom_divertHrefToApp = 0;
				(title !== doc.bF) && (_VirtualDom_doc.title = title = doc.bF);
			});
		}
	);
});



// ANIMATION


var _Browser_cancelAnimationFrame =
	typeof cancelAnimationFrame !== 'undefined'
		? cancelAnimationFrame
		: function(id) { clearTimeout(id); };

var _Browser_requestAnimationFrame =
	typeof requestAnimationFrame !== 'undefined'
		? requestAnimationFrame
		: function(callback) { return setTimeout(callback, 1000 / 60); };


function _Browser_makeAnimator(model, draw)
{
	draw(model);

	var state = 0;

	function updateIfNeeded()
	{
		state = state === 1
			? 0
			: ( _Browser_requestAnimationFrame(updateIfNeeded), draw(model), 1 );
	}

	return function(nextModel, isSync)
	{
		model = nextModel;

		isSync
			? ( draw(model),
				state === 2 && (state = 1)
				)
			: ( state === 0 && _Browser_requestAnimationFrame(updateIfNeeded),
				state = 2
				);
	};
}



// APPLICATION


function _Browser_application(impl)
{
	var onUrlChange = impl.hH;
	var onUrlRequest = impl.hI;
	var key = function() { key.a(onUrlChange(_Browser_getUrl())); };

	return _Browser_document({
		b9: function(sendToApp)
		{
			key.a = sendToApp;
			_Browser_window.addEventListener('popstate', key);
			_Browser_window.navigator.userAgent.indexOf('Trident') < 0 || _Browser_window.addEventListener('hashchange', key);

			return F2(function(domNode, event)
			{
				if (!event.ctrlKey && !event.metaKey && !event.shiftKey && event.button < 1 && !domNode.target && !domNode.hasAttribute('download'))
				{
					event.preventDefault();
					var href = domNode.href;
					var curr = _Browser_getUrl();
					var next = elm$url$Url$fromString(href).a;
					sendToApp(onUrlRequest(
						(next
							&& curr.f4 === next.f4
							&& curr.fr === next.fr
							&& curr.f_.a === next.f_.a
						)
							? elm$browser$Browser$Internal(next)
							: elm$browser$Browser$External(href)
					));
				}
			});
		},
		hk: function(flags)
		{
			return A3(impl.hk, flags, _Browser_getUrl(), key);
		},
		id: impl.id,
		ia: impl.ia,
		hY: impl.hY
	});
}

function _Browser_getUrl()
{
	return elm$url$Url$fromString(_VirtualDom_doc.location.href).a || _Debug_crash(1);
}

var _Browser_go = F2(function(key, n)
{
	return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function() {
		n && history.go(n);
		key();
	}));
});

var _Browser_pushUrl = F2(function(key, url)
{
	return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function() {
		history.pushState({}, '', url);
		key();
	}));
});

var _Browser_replaceUrl = F2(function(key, url)
{
	return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function() {
		history.replaceState({}, '', url);
		key();
	}));
});



// GLOBAL EVENTS


var _Browser_fakeNode = { addEventListener: function() {}, removeEventListener: function() {} };
var _Browser_doc = typeof document !== 'undefined' ? document : _Browser_fakeNode;
var _Browser_window = typeof window !== 'undefined' ? window : _Browser_fakeNode;

var _Browser_on = F3(function(node, eventName, sendToSelf)
{
	return _Scheduler_spawn(_Scheduler_binding(function(callback)
	{
		function handler(event)	{ _Scheduler_rawSpawn(sendToSelf(event)); }
		node.addEventListener(eventName, handler, _VirtualDom_passiveSupported && { passive: true });
		return function() { node.removeEventListener(eventName, handler); };
	}));
});

var _Browser_decodeEvent = F2(function(decoder, event)
{
	var result = _Json_runHelp(decoder, event);
	return elm$core$Result$isOk(result) ? elm$core$Maybe$Just(result.a) : elm$core$Maybe$Nothing;
});



// PAGE VISIBILITY


function _Browser_visibilityInfo()
{
	return (typeof _VirtualDom_doc.hidden !== 'undefined')
		? { hg: 'hidden', gS: 'visibilitychange' }
		:
	(typeof _VirtualDom_doc.mozHidden !== 'undefined')
		? { hg: 'mozHidden', gS: 'mozvisibilitychange' }
		:
	(typeof _VirtualDom_doc.msHidden !== 'undefined')
		? { hg: 'msHidden', gS: 'msvisibilitychange' }
		:
	(typeof _VirtualDom_doc.webkitHidden !== 'undefined')
		? { hg: 'webkitHidden', gS: 'webkitvisibilitychange' }
		: { hg: 'hidden', gS: 'visibilitychange' };
}



// ANIMATION FRAMES


function _Browser_rAF()
{
	return _Scheduler_binding(function(callback)
	{
		var id = _Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(Date.now()));
		});

		return function() {
			_Browser_cancelAnimationFrame(id);
		};
	});
}


function _Browser_now()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(Date.now()));
	});
}



// DOM STUFF


function _Browser_withNode(id, doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			var node = document.getElementById(id);
			callback(node
				? _Scheduler_succeed(doStuff(node))
				: _Scheduler_fail(elm$browser$Browser$Dom$NotFound(id))
			);
		});
	});
}


function _Browser_withWindow(doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(doStuff()));
		});
	});
}


// FOCUS and BLUR


var _Browser_call = F2(function(functionName, id)
{
	return _Browser_withNode(id, function(node) {
		node[functionName]();
		return _Utils_Tuple0;
	});
});



// WINDOW VIEWPORT


function _Browser_getViewport()
{
	return {
		gj: _Browser_getScene(),
		gC: {
			ij: _Browser_window.pageXOffset,
			im: _Browser_window.pageYOffset,
			gF: _Browser_doc.documentElement.clientWidth,
			ds: _Browser_doc.documentElement.clientHeight
		}
	};
}

function _Browser_getScene()
{
	var body = _Browser_doc.body;
	var elem = _Browser_doc.documentElement;
	return {
		gF: Math.max(body.scrollWidth, body.offsetWidth, elem.scrollWidth, elem.offsetWidth, elem.clientWidth),
		ds: Math.max(body.scrollHeight, body.offsetHeight, elem.scrollHeight, elem.offsetHeight, elem.clientHeight)
	};
}

var _Browser_setViewport = F2(function(x, y)
{
	return _Browser_withWindow(function()
	{
		_Browser_window.scroll(x, y);
		return _Utils_Tuple0;
	});
});



// ELEMENT VIEWPORT


function _Browser_getViewportOf(id)
{
	return _Browser_withNode(id, function(node)
	{
		return {
			gj: {
				gF: node.scrollWidth,
				ds: node.scrollHeight
			},
			gC: {
				ij: node.scrollLeft,
				im: node.scrollTop,
				gF: node.clientWidth,
				ds: node.clientHeight
			}
		};
	});
}


var _Browser_setViewportOf = F3(function(id, x, y)
{
	return _Browser_withNode(id, function(node)
	{
		node.scrollLeft = x;
		node.scrollTop = y;
		return _Utils_Tuple0;
	});
});



// ELEMENT


function _Browser_getElement(id)
{
	return _Browser_withNode(id, function(node)
	{
		var rect = node.getBoundingClientRect();
		var x = _Browser_window.pageXOffset;
		var y = _Browser_window.pageYOffset;
		return {
			gj: _Browser_getScene(),
			gC: {
				ij: x,
				im: y,
				gF: _Browser_doc.documentElement.clientWidth,
				ds: _Browser_doc.documentElement.clientHeight
			},
			fe: {
				ij: x + rect.left,
				im: y + rect.top,
				gF: rect.width,
				ds: rect.height
			}
		};
	});
}



// LOAD and RELOAD


function _Browser_reload(skipCache)
{
	return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		_VirtualDom_doc.location.reload(skipCache);
	}));
}

function _Browser_load(url)
{
	return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		try
		{
			_Browser_window.location = url;
		}
		catch(err)
		{
			// Only Firefox can throw a NS_ERROR_MALFORMED_URI exception here.
			// Other browsers reload the page, so let's be consistent about that.
			_VirtualDom_doc.location.reload(false);
		}
	}));
}




// VIRTUAL-DOM WIDGETS


var _Markdown_toHtml = F3(function(options, factList, rawMarkdown)
{
	return _VirtualDom_custom(
		factList,
		{
			a: options,
			b: rawMarkdown
		},
		_Markdown_render,
		_Markdown_diff
	);
});



// WIDGET IMPLEMENTATION


function _Markdown_render(model)
{
	return A2(_Markdown_replace, model, _VirtualDom_doc.createElement('div'));
}


function _Markdown_diff(x, y)
{
	return x.b === y.b && x.a === y.a
		? false
		: _Markdown_replace(y);
}


var _Markdown_replace = F2(function(model, div)
{
	div.innerHTML = _Markdown_marked(model.b, _Markdown_formatOptions(model.a));
	return div;
});



// ACTUAL MARKDOWN PARSER


var _Markdown_marked = function() {
	// catch the `marked` object regardless of the outer environment.
	// (ex. a CommonJS module compatible environment.)
	// note that this depends on marked's implementation of environment detection.
	var module = {};
	var exports = module.exports = {};

	/**
	 * marked - a markdown parser
	 * Copyright (c) 2011-2014, Christopher Jeffrey. (MIT Licensed)
	 * https://github.com/chjj/marked
	 * commit cd2f6f5b7091154c5526e79b5f3bfb4d15995a51
	 */
	(function(){var block={newline:/^\n+/,code:/^( {4}[^\n]+\n*)+/,fences:noop,hr:/^( *[-*_]){3,} *(?:\n+|$)/,heading:/^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/,nptable:noop,lheading:/^([^\n]+)\n *(=|-){2,} *(?:\n+|$)/,blockquote:/^( *>[^\n]+(\n(?!def)[^\n]+)*\n*)+/,list:/^( *)(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,html:/^ *(?:comment *(?:\n|\s*$)|closed *(?:\n{2,}|\s*$)|closing *(?:\n{2,}|\s*$))/,def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +["(]([^\n]+)[")])? *(?:\n+|$)/,table:noop,paragraph:/^((?:[^\n]+\n?(?!hr|heading|lheading|blockquote|tag|def))+)\n*/,text:/^[^\n]+/};block.bullet=/(?:[*+-]|\d+\.)/;block.item=/^( *)(bull) [^\n]*(?:\n(?!\1bull )[^\n]*)*/;block.item=replace(block.item,"gm")(/bull/g,block.bullet)();block.list=replace(block.list)(/bull/g,block.bullet)("hr","\\n+(?=\\1?(?:[-*_] *){3,}(?:\\n+|$))")("def","\\n+(?="+block.def.source+")")();block.blockquote=replace(block.blockquote)("def",block.def)();block._tag="(?!(?:"+"a|em|strong|small|s|cite|q|dfn|abbr|data|time|code"+"|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo"+"|span|br|wbr|ins|del|img)\\b)\\w+(?!:/|[^\\w\\s@]*@)\\b";block.html=replace(block.html)("comment",/<!--[\s\S]*?-->/)("closed",/<(tag)[\s\S]+?<\/\1>/)("closing",/<tag(?:"[^"]*"|'[^']*'|[^'">])*?>/)(/tag/g,block._tag)();block.paragraph=replace(block.paragraph)("hr",block.hr)("heading",block.heading)("lheading",block.lheading)("blockquote",block.blockquote)("tag","<"+block._tag)("def",block.def)();block.normal=merge({},block);block.gfm=merge({},block.normal,{fences:/^ *(`{3,}|~{3,})[ \.]*(\S+)? *\n([\s\S]*?)\s*\1 *(?:\n+|$)/,paragraph:/^/,heading:/^ *(#{1,6}) +([^\n]+?) *#* *(?:\n+|$)/});block.gfm.paragraph=replace(block.paragraph)("(?!","(?!"+block.gfm.fences.source.replace("\\1","\\2")+"|"+block.list.source.replace("\\1","\\3")+"|")();block.tables=merge({},block.gfm,{nptable:/^ *(\S.*\|.*)\n *([-:]+ *\|[-| :]*)\n((?:.*\|.*(?:\n|$))*)\n*/,table:/^ *\|(.+)\n *\|( *[-:]+[-| :]*)\n((?: *\|.*(?:\n|$))*)\n*/});function Lexer(options){this.tokens=[];this.tokens.links={};this.options=options||marked.defaults;this.rules=block.normal;if(this.options.gfm){if(this.options.tables){this.rules=block.tables}else{this.rules=block.gfm}}}Lexer.rules=block;Lexer.lex=function(src,options){var lexer=new Lexer(options);return lexer.lex(src)};Lexer.prototype.lex=function(src){src=src.replace(/\r\n|\r/g,"\n").replace(/\t/g,"    ").replace(/\u00a0/g," ").replace(/\u2424/g,"\n");return this.token(src,true)};Lexer.prototype.token=function(src,top,bq){var src=src.replace(/^ +$/gm,""),next,loose,cap,bull,b,item,space,i,l;while(src){if(cap=this.rules.newline.exec(src)){src=src.substring(cap[0].length);if(cap[0].length>1){this.tokens.push({type:"space"})}}if(cap=this.rules.code.exec(src)){src=src.substring(cap[0].length);cap=cap[0].replace(/^ {4}/gm,"");this.tokens.push({type:"code",text:!this.options.pedantic?cap.replace(/\n+$/,""):cap});continue}if(cap=this.rules.fences.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"code",lang:cap[2],text:cap[3]||""});continue}if(cap=this.rules.heading.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"heading",depth:cap[1].length,text:cap[2]});continue}if(top&&(cap=this.rules.nptable.exec(src))){src=src.substring(cap[0].length);item={type:"table",header:cap[1].replace(/^ *| *\| *$/g,"").split(/ *\| */),align:cap[2].replace(/^ *|\| *$/g,"").split(/ *\| */),cells:cap[3].replace(/\n$/,"").split("\n")};for(i=0;i<item.align.length;i++){if(/^ *-+: *$/.test(item.align[i])){item.align[i]="right"}else if(/^ *:-+: *$/.test(item.align[i])){item.align[i]="center"}else if(/^ *:-+ *$/.test(item.align[i])){item.align[i]="left"}else{item.align[i]=null}}for(i=0;i<item.cells.length;i++){item.cells[i]=item.cells[i].split(/ *\| */)}this.tokens.push(item);continue}if(cap=this.rules.lheading.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"heading",depth:cap[2]==="="?1:2,text:cap[1]});continue}if(cap=this.rules.hr.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"hr"});continue}if(cap=this.rules.blockquote.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"blockquote_start"});cap=cap[0].replace(/^ *> ?/gm,"");this.token(cap,top,true);this.tokens.push({type:"blockquote_end"});continue}if(cap=this.rules.list.exec(src)){src=src.substring(cap[0].length);bull=cap[2];this.tokens.push({type:"list_start",ordered:bull.length>1});cap=cap[0].match(this.rules.item);next=false;l=cap.length;i=0;for(;i<l;i++){item=cap[i];space=item.length;item=item.replace(/^ *([*+-]|\d+\.) +/,"");if(~item.indexOf("\n ")){space-=item.length;item=!this.options.pedantic?item.replace(new RegExp("^ {1,"+space+"}","gm"),""):item.replace(/^ {1,4}/gm,"")}if(this.options.smartLists&&i!==l-1){b=block.bullet.exec(cap[i+1])[0];if(bull!==b&&!(bull.length>1&&b.length>1)){src=cap.slice(i+1).join("\n")+src;i=l-1}}loose=next||/\n\n(?!\s*$)/.test(item);if(i!==l-1){next=item.charAt(item.length-1)==="\n";if(!loose)loose=next}this.tokens.push({type:loose?"loose_item_start":"list_item_start"});this.token(item,false,bq);this.tokens.push({type:"list_item_end"})}this.tokens.push({type:"list_end"});continue}if(cap=this.rules.html.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:this.options.sanitize?"paragraph":"html",pre:!this.options.sanitizer&&(cap[1]==="pre"||cap[1]==="script"||cap[1]==="style"),text:cap[0]});continue}if(!bq&&top&&(cap=this.rules.def.exec(src))){src=src.substring(cap[0].length);this.tokens.links[cap[1].toLowerCase()]={href:cap[2],title:cap[3]};continue}if(top&&(cap=this.rules.table.exec(src))){src=src.substring(cap[0].length);item={type:"table",header:cap[1].replace(/^ *| *\| *$/g,"").split(/ *\| */),align:cap[2].replace(/^ *|\| *$/g,"").split(/ *\| */),cells:cap[3].replace(/(?: *\| *)?\n$/,"").split("\n")};for(i=0;i<item.align.length;i++){if(/^ *-+: *$/.test(item.align[i])){item.align[i]="right"}else if(/^ *:-+: *$/.test(item.align[i])){item.align[i]="center"}else if(/^ *:-+ *$/.test(item.align[i])){item.align[i]="left"}else{item.align[i]=null}}for(i=0;i<item.cells.length;i++){item.cells[i]=item.cells[i].replace(/^ *\| *| *\| *$/g,"").split(/ *\| */)}this.tokens.push(item);continue}if(top&&(cap=this.rules.paragraph.exec(src))){src=src.substring(cap[0].length);this.tokens.push({type:"paragraph",text:cap[1].charAt(cap[1].length-1)==="\n"?cap[1].slice(0,-1):cap[1]});continue}if(cap=this.rules.text.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"text",text:cap[0]});continue}if(src){throw new Error("Infinite loop on byte: "+src.charCodeAt(0))}}return this.tokens};var inline={escape:/^\\([\\`*{}\[\]()#+\-.!_>])/,autolink:/^<([^ >]+(@|:\/)[^ >]+)>/,url:noop,tag:/^<!--[\s\S]*?-->|^<\/?\w+(?:"[^"]*"|'[^']*'|[^'">])*?>/,link:/^!?\[(inside)\]\(href\)/,reflink:/^!?\[(inside)\]\s*\[([^\]]*)\]/,nolink:/^!?\[((?:\[[^\]]*\]|[^\[\]])*)\]/,strong:/^_\_([\s\S]+?)_\_(?!_)|^\*\*([\s\S]+?)\*\*(?!\*)/,em:/^\b_((?:[^_]|_\_)+?)_\b|^\*((?:\*\*|[\s\S])+?)\*(?!\*)/,code:/^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/,br:/^ {2,}\n(?!\s*$)/,del:noop,text:/^[\s\S]+?(?=[\\<!\[_*`]| {2,}\n|$)/};inline._inside=/(?:\[[^\]]*\]|[^\[\]]|\](?=[^\[]*\]))*/;inline._href=/\s*<?([\s\S]*?)>?(?:\s+['"]([\s\S]*?)['"])?\s*/;inline.link=replace(inline.link)("inside",inline._inside)("href",inline._href)();inline.reflink=replace(inline.reflink)("inside",inline._inside)();inline.normal=merge({},inline);inline.pedantic=merge({},inline.normal,{strong:/^_\_(?=\S)([\s\S]*?\S)_\_(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,em:/^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/});inline.gfm=merge({},inline.normal,{escape:replace(inline.escape)("])","~|])")(),url:/^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/,del:/^~~(?=\S)([\s\S]*?\S)~~/,text:replace(inline.text)("]|","~]|")("|","|https?://|")()});inline.breaks=merge({},inline.gfm,{br:replace(inline.br)("{2,}","*")(),text:replace(inline.gfm.text)("{2,}","*")()});function InlineLexer(links,options){this.options=options||marked.defaults;this.links=links;this.rules=inline.normal;this.renderer=this.options.renderer||new Renderer;this.renderer.options=this.options;if(!this.links){throw new Error("Tokens array requires a `links` property.")}if(this.options.gfm){if(this.options.breaks){this.rules=inline.breaks}else{this.rules=inline.gfm}}else if(this.options.pedantic){this.rules=inline.pedantic}}InlineLexer.rules=inline;InlineLexer.output=function(src,links,options){var inline=new InlineLexer(links,options);return inline.output(src)};InlineLexer.prototype.output=function(src){var out="",link,text,href,cap;while(src){if(cap=this.rules.escape.exec(src)){src=src.substring(cap[0].length);out+=cap[1];continue}if(cap=this.rules.autolink.exec(src)){src=src.substring(cap[0].length);if(cap[2]==="@"){text=cap[1].charAt(6)===":"?this.mangle(cap[1].substring(7)):this.mangle(cap[1]);href=this.mangle("mailto:")+text}else{text=escape(cap[1]);href=text}out+=this.renderer.link(href,null,text);continue}if(!this.inLink&&(cap=this.rules.url.exec(src))){src=src.substring(cap[0].length);text=escape(cap[1]);href=text;out+=this.renderer.link(href,null,text);continue}if(cap=this.rules.tag.exec(src)){if(!this.inLink&&/^<a /i.test(cap[0])){this.inLink=true}else if(this.inLink&&/^<\/a>/i.test(cap[0])){this.inLink=false}src=src.substring(cap[0].length);out+=this.options.sanitize?this.options.sanitizer?this.options.sanitizer(cap[0]):escape(cap[0]):cap[0];continue}if(cap=this.rules.link.exec(src)){src=src.substring(cap[0].length);this.inLink=true;out+=this.outputLink(cap,{href:cap[2],title:cap[3]});this.inLink=false;continue}if((cap=this.rules.reflink.exec(src))||(cap=this.rules.nolink.exec(src))){src=src.substring(cap[0].length);link=(cap[2]||cap[1]).replace(/\s+/g," ");link=this.links[link.toLowerCase()];if(!link||!link.href){out+=cap[0].charAt(0);src=cap[0].substring(1)+src;continue}this.inLink=true;out+=this.outputLink(cap,link);this.inLink=false;continue}if(cap=this.rules.strong.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.strong(this.output(cap[2]||cap[1]));continue}if(cap=this.rules.em.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.em(this.output(cap[2]||cap[1]));continue}if(cap=this.rules.code.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.codespan(escape(cap[2],true));continue}if(cap=this.rules.br.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.br();continue}if(cap=this.rules.del.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.del(this.output(cap[1]));continue}if(cap=this.rules.text.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.text(escape(this.smartypants(cap[0])));continue}if(src){throw new Error("Infinite loop on byte: "+src.charCodeAt(0))}}return out};InlineLexer.prototype.outputLink=function(cap,link){var href=escape(link.href),title=link.title?escape(link.title):null;return cap[0].charAt(0)!=="!"?this.renderer.link(href,title,this.output(cap[1])):this.renderer.image(href,title,escape(cap[1]))};InlineLexer.prototype.smartypants=function(text){if(!this.options.smartypants)return text;return text.replace(/---/g,"—").replace(/--/g,"–").replace(/(^|[-\u2014\/(\[{"\s])'/g,"$1‘").replace(/'/g,"’").replace(/(^|[-\u2014\/(\[{\u2018\s])"/g,"$1“").replace(/"/g,"”").replace(/\.{3}/g,"…")};InlineLexer.prototype.mangle=function(text){if(!this.options.mangle)return text;var out="",l=text.length,i=0,ch;for(;i<l;i++){ch=text.charCodeAt(i);if(Math.random()>.5){ch="x"+ch.toString(16)}out+="&#"+ch+";"}return out};function Renderer(options){this.options=options||{}}Renderer.prototype.code=function(code,lang,escaped){if(this.options.highlight){var out=this.options.highlight(code,lang);if(out!=null&&out!==code){escaped=true;code=out}}if(!lang){return"<pre><code>"+(escaped?code:escape(code,true))+"\n</code></pre>"}return'<pre><code class="'+this.options.langPrefix+escape(lang,true)+'">'+(escaped?code:escape(code,true))+"\n</code></pre>\n"};Renderer.prototype.blockquote=function(quote){return"<blockquote>\n"+quote+"</blockquote>\n"};Renderer.prototype.html=function(html){return html};Renderer.prototype.heading=function(text,level,raw){return"<h"+level+' id="'+this.options.headerPrefix+raw.toLowerCase().replace(/[^\w]+/g,"-")+'">'+text+"</h"+level+">\n"};Renderer.prototype.hr=function(){return this.options.xhtml?"<hr/>\n":"<hr>\n"};Renderer.prototype.list=function(body,ordered){var type=ordered?"ol":"ul";return"<"+type+">\n"+body+"</"+type+">\n"};Renderer.prototype.listitem=function(text){return"<li>"+text+"</li>\n"};Renderer.prototype.paragraph=function(text){return"<p>"+text+"</p>\n"};Renderer.prototype.table=function(header,body){return"<table>\n"+"<thead>\n"+header+"</thead>\n"+"<tbody>\n"+body+"</tbody>\n"+"</table>\n"};Renderer.prototype.tablerow=function(content){return"<tr>\n"+content+"</tr>\n"};Renderer.prototype.tablecell=function(content,flags){var type=flags.header?"th":"td";var tag=flags.align?"<"+type+' style="text-align:'+flags.align+'">':"<"+type+">";return tag+content+"</"+type+">\n"};Renderer.prototype.strong=function(text){return"<strong>"+text+"</strong>"};Renderer.prototype.em=function(text){return"<em>"+text+"</em>"};Renderer.prototype.codespan=function(text){return"<code>"+text+"</code>"};Renderer.prototype.br=function(){return this.options.xhtml?"<br/>":"<br>"};Renderer.prototype.del=function(text){return"<del>"+text+"</del>"};Renderer.prototype.link=function(href,title,text){if(this.options.sanitize){try{var prot=decodeURIComponent(unescape(href)).replace(/[^\w:]/g,"").toLowerCase()}catch(e){return""}if(prot.indexOf("javascript:")===0||prot.indexOf("vbscript:")===0||prot.indexOf("data:")===0){return""}}var out='<a href="'+href+'"';if(title){out+=' title="'+title+'"'}out+=">"+text+"</a>";return out};Renderer.prototype.image=function(href,title,text){var out='<img src="'+href+'" alt="'+text+'"';if(title){out+=' title="'+title+'"'}out+=this.options.xhtml?"/>":">";return out};Renderer.prototype.text=function(text){return text};function Parser(options){this.tokens=[];this.token=null;this.options=options||marked.defaults;this.options.renderer=this.options.renderer||new Renderer;this.renderer=this.options.renderer;this.renderer.options=this.options}Parser.parse=function(src,options,renderer){var parser=new Parser(options,renderer);return parser.parse(src)};Parser.prototype.parse=function(src){this.inline=new InlineLexer(src.links,this.options,this.renderer);this.tokens=src.reverse();var out="";while(this.next()){out+=this.tok()}return out};Parser.prototype.next=function(){return this.token=this.tokens.pop()};Parser.prototype.peek=function(){return this.tokens[this.tokens.length-1]||0};Parser.prototype.parseText=function(){var body=this.token.text;while(this.peek().type==="text"){body+="\n"+this.next().text}return this.inline.output(body)};Parser.prototype.tok=function(){switch(this.token.type){case"space":{return""}case"hr":{return this.renderer.hr()}case"heading":{return this.renderer.heading(this.inline.output(this.token.text),this.token.depth,this.token.text)}case"code":{return this.renderer.code(this.token.text,this.token.lang,this.token.escaped)}case"table":{var header="",body="",i,row,cell,flags,j;cell="";for(i=0;i<this.token.header.length;i++){flags={header:true,align:this.token.align[i]};cell+=this.renderer.tablecell(this.inline.output(this.token.header[i]),{header:true,align:this.token.align[i]})}header+=this.renderer.tablerow(cell);for(i=0;i<this.token.cells.length;i++){row=this.token.cells[i];cell="";for(j=0;j<row.length;j++){cell+=this.renderer.tablecell(this.inline.output(row[j]),{header:false,align:this.token.align[j]})}body+=this.renderer.tablerow(cell)}return this.renderer.table(header,body)}case"blockquote_start":{var body="";while(this.next().type!=="blockquote_end"){body+=this.tok()}return this.renderer.blockquote(body)}case"list_start":{var body="",ordered=this.token.ordered;while(this.next().type!=="list_end"){body+=this.tok()}return this.renderer.list(body,ordered)}case"list_item_start":{var body="";while(this.next().type!=="list_item_end"){body+=this.token.type==="text"?this.parseText():this.tok()}return this.renderer.listitem(body)}case"loose_item_start":{var body="";while(this.next().type!=="list_item_end"){body+=this.tok()}return this.renderer.listitem(body)}case"html":{var html=!this.token.pre&&!this.options.pedantic?this.inline.output(this.token.text):this.token.text;return this.renderer.html(html)}case"paragraph":{return this.renderer.paragraph(this.inline.output(this.token.text))}case"text":{return this.renderer.paragraph(this.parseText())}}};function escape(html,encode){return html.replace(!encode?/&(?!#?\w+;)/g:/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function unescape(html){return html.replace(/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/g,function(_,n){n=n.toLowerCase();if(n==="colon")return":";if(n.charAt(0)==="#"){return n.charAt(1)==="x"?String.fromCharCode(parseInt(n.substring(2),16)):String.fromCharCode(+n.substring(1))}return""})}function replace(regex,opt){regex=regex.source;opt=opt||"";return function self(name,val){if(!name)return new RegExp(regex,opt);val=val.source||val;val=val.replace(/(^|[^\[])\^/g,"$1");regex=regex.replace(name,val);return self}}function noop(){}noop.exec=noop;function merge(obj){var i=1,target,key;for(;i<arguments.length;i++){target=arguments[i];for(key in target){if(Object.prototype.hasOwnProperty.call(target,key)){obj[key]=target[key]}}}return obj}function marked(src,opt,callback){if(callback||typeof opt==="function"){if(!callback){callback=opt;opt=null}opt=merge({},marked.defaults,opt||{});var highlight=opt.highlight,tokens,pending,i=0;try{tokens=Lexer.lex(src,opt)}catch(e){return callback(e)}pending=tokens.length;var done=function(err){if(err){opt.highlight=highlight;return callback(err)}var out;try{out=Parser.parse(tokens,opt)}catch(e){err=e}opt.highlight=highlight;return err?callback(err):callback(null,out)};if(!highlight||highlight.length<3){return done()}delete opt.highlight;if(!pending)return done();for(;i<tokens.length;i++){(function(token){if(token.type!=="code"){return--pending||done()}return highlight(token.text,token.lang,function(err,code){if(err)return done(err);if(code==null||code===token.text){return--pending||done()}token.text=code;token.escaped=true;--pending||done()})})(tokens[i])}return}try{if(opt)opt=merge({},marked.defaults,opt);return Parser.parse(Lexer.lex(src,opt),opt)}catch(e){e.message+="\nPlease report this to https://github.com/chjj/marked.";if((opt||marked.defaults).silent){return"<p>An error occured:</p><pre>"+escape(e.message+"",true)+"</pre>"}throw e}}marked.options=marked.setOptions=function(opt){merge(marked.defaults,opt);return marked};marked.defaults={gfm:true,tables:true,breaks:false,pedantic:false,sanitize:false,sanitizer:null,mangle:true,smartLists:false,silent:false,highlight:null,langPrefix:"lang-",smartypants:false,headerPrefix:"",renderer:new Renderer,xhtml:false};marked.Parser=Parser;marked.parser=Parser.parse;marked.Renderer=Renderer;marked.Lexer=Lexer;marked.lexer=Lexer.lex;marked.InlineLexer=InlineLexer;marked.inlineLexer=InlineLexer.output;marked.parse=marked;if(typeof module!=="undefined"&&typeof exports==="object"){module.exports=marked}else if(typeof define==="function"&&define.amd){define(function(){return marked})}else{this.marked=marked}}).call(function(){return this||(typeof window!=="undefined"?window:global)}());

	return module.exports;
}();


// FORMAT OPTIONS FOR MARKED IMPLEMENTATION

function _Markdown_formatOptions(options)
{
	function toHighlight(code, lang)
	{
		if (!lang && elm$core$Maybe$isJust(options.e7))
		{
			lang = options.e7.a;
		}

		if (typeof hljs !== 'undefined' && lang && hljs.listLanguages().indexOf(lang) >= 0)
		{
			return hljs.highlight(lang, code, true).value;
		}

		return code;
	}

	var gfm = options.fo.a;

	return {
		highlight: toHighlight,
		gfm: gfm,
		tables: gfm && gfm.h$,
		breaks: gfm && gfm.gO,
		sanitize: options.gh,
		smartypants: options.gn
	};
}
var author$project$Main$LinkClicked = function (a) {
	return {$: 0, a: a};
};
var author$project$Main$UrlChanged = function (a) {
	return {$: 1, a: a};
};
var elm$core$Dict$RBEmpty_elm_builtin = {$: -2};
var elm$core$Dict$empty = elm$core$Dict$RBEmpty_elm_builtin;
var author$project$Backend$emptyData = {eG: elm$core$Dict$empty, eY: elm$core$Dict$empty, fA: elm$core$Dict$empty, f3: elm$core$Dict$empty, f5: elm$core$Dict$empty, f8: elm$core$Dict$empty, ga: elm$core$Dict$empty, ge: elm$core$Dict$empty};
var author$project$Backend$Data = F8(
	function (repos, issues, prs, projects, columnCards, references, actors, reviewers) {
		return {eG: actors, eY: columnCards, fA: issues, f3: projects, f5: prs, f8: references, ga: repos, ge: reviewers};
	});
var author$project$Backend$ColumnCard = F3(
	function (id, contentId, note) {
		return {gY: contentId, fu: id, hE: note};
	});
var elm$core$Basics$apL = F2(
	function (f, x) {
		return f(x);
	});
var elm$core$Basics$apR = F2(
	function (x, f) {
		return f(x);
	});
var elm$core$Array$branchFactor = 32;
var elm$core$Array$Array_elm_builtin = F4(
	function (a, b, c, d) {
		return {$: 0, a: a, b: b, c: c, d: d};
	});
var elm$core$Basics$EQ = 1;
var elm$core$Basics$GT = 2;
var elm$core$Basics$LT = 0;
var elm$core$Dict$foldr = F3(
	function (func, acc, t) {
		foldr:
		while (true) {
			if (t.$ === -2) {
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
	var dict = _n0;
	return elm$core$Dict$keys(dict);
};
var elm$core$Elm$JsArray$foldr = _JsArray_foldr;
var elm$core$Array$foldr = F3(
	function (func, baseCase, _n0) {
		var tree = _n0.c;
		var tail = _n0.d;
		var helper = F2(
			function (node, acc) {
				if (!node.$) {
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
	return {$: 1, a: a};
};
var elm$core$Array$SubTree = function (a) {
	return {$: 0, a: a};
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
		if (!builder.v) {
			return A4(
				elm$core$Array$Array_elm_builtin,
				elm$core$Elm$JsArray$length(builder.x),
				elm$core$Array$shiftStep,
				elm$core$Elm$JsArray$empty,
				builder.x);
		} else {
			var treeLen = builder.v * elm$core$Array$branchFactor;
			var depth = elm$core$Basics$floor(
				A2(elm$core$Basics$logBase, elm$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? elm$core$List$reverse(builder.y) : builder.y;
			var tree = A2(elm$core$Array$treeFromBuilder, correctNodeList, builder.v);
			return A4(
				elm$core$Array$Array_elm_builtin,
				elm$core$Elm$JsArray$length(builder.x) + treeLen,
				A2(elm$core$Basics$max, 5, depth * elm$core$Array$shiftStep),
				tree,
				builder.x);
		}
	});
var elm$core$Basics$False = 1;
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
					{y: nodeList, v: (len / elm$core$Array$branchFactor) | 0, x: tail});
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
	return {$: 0, a: a};
};
var elm$core$Maybe$Nothing = {$: 1};
var elm$core$Result$Err = function (a) {
	return {$: 1, a: a};
};
var elm$core$Result$Ok = function (a) {
	return {$: 0, a: a};
};
var elm$core$Basics$True = 0;
var elm$core$Result$isOk = function (result) {
	if (!result.$) {
		return true;
	} else {
		return false;
	}
};
var elm$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 3, a: a, b: b};
	});
var elm$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var elm$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var elm$json$Json$Decode$OneOf = function (a) {
	return {$: 2, a: a};
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
				case 0:
					var f = error.a;
					var err = error.b;
					var isSimple = function () {
						var _n1 = elm$core$String$uncons(f);
						if (_n1.$ === 1) {
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
				case 1:
					var i = error.a;
					var err = error.b;
					var indexName = '[' + (elm$core$String$fromInt(i) + ']');
					var $temp$error = err,
						$temp$context = A2(elm$core$List$cons, indexName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 2:
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
var elm$json$Json$Decode$field = _Json_decodeField;
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
var elm$json$Json$Decode$string = _Json_decodeString;
var elm$json$Json$Decode$map2 = _Json_map2;
var elm_community$json_extra$Json$Decode$Extra$andMap = elm$json$Json$Decode$map2(elm$core$Basics$apR);
var author$project$Backend$decodeColumnCard = A2(
	elm_community$json_extra$Json$Decode$Extra$andMap,
	elm$json$Json$Decode$maybe(
		A2(elm$json$Json$Decode$field, 'note', elm$json$Json$Decode$string)),
	A2(
		elm_community$json_extra$Json$Decode$Extra$andMap,
		elm$json$Json$Decode$maybe(
			A2(elm$json$Json$Decode$field, 'contentId', elm$json$Json$Decode$string)),
		A2(
			elm_community$json_extra$Json$Decode$Extra$andMap,
			A2(elm$json$Json$Decode$field, 'id', elm$json$Json$Decode$string),
			elm$json$Json$Decode$succeed(author$project$Backend$ColumnCard))));
var elm$json$Json$Decode$list = _Json_decodeList;
var author$project$Backend$decodeCards = elm$json$Json$Decode$list(author$project$Backend$decodeColumnCard);
var author$project$Backend$EventActor = F3(
	function (user, avatar, createdAt) {
		return {da: avatar, e3: createdAt, ev: user};
	});
var author$project$GitHubGraph$User = F5(
	function (id, databaseId, url, login, avatar) {
		return {da: avatar, cD: databaseId, fu: id, hn: login, ib: url};
	});
var elm$json$Json$Decode$int = _Json_decodeInt;
var author$project$GitHubGraph$decodeUser = A2(
	elm_community$json_extra$Json$Decode$Extra$andMap,
	A2(elm$json$Json$Decode$field, 'avatar', elm$json$Json$Decode$string),
	A2(
		elm_community$json_extra$Json$Decode$Extra$andMap,
		A2(elm$json$Json$Decode$field, 'login', elm$json$Json$Decode$string),
		A2(
			elm_community$json_extra$Json$Decode$Extra$andMap,
			A2(elm$json$Json$Decode$field, 'url', elm$json$Json$Decode$string),
			A2(
				elm_community$json_extra$Json$Decode$Extra$andMap,
				A2(elm$json$Json$Decode$field, 'database_id', elm$json$Json$Decode$int),
				A2(
					elm_community$json_extra$Json$Decode$Extra$andMap,
					A2(elm$json$Json$Decode$field, 'id', elm$json$Json$Decode$string),
					elm$json$Json$Decode$succeed(author$project$GitHubGraph$User))))));
var elm$json$Json$Decode$andThen = _Json_andThen;
var elm$json$Json$Decode$fail = _Json_fail;
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
var elm$parser$Parser$DeadEnd = F3(
	function (row, col, problem) {
		return {eW: col, f$: problem, gf: row};
	});
var elm$parser$Parser$problemToDeadEnd = function (p) {
	return A3(elm$parser$Parser$DeadEnd, p.gf, p.eW, p.f$);
};
var elm$parser$Parser$Advanced$bagToList = F2(
	function (bag, list) {
		bagToList:
		while (true) {
			switch (bag.$) {
				case 0:
					return list;
				case 1:
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
		var parse = _n0;
		var _n1 = parse(
			{eW: 1, e0: _List_Nil, n: 1, b: 0, gf: 1, a: src});
		if (!_n1.$) {
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
		if (!_n0.$) {
			var a = _n0.a;
			return elm$core$Result$Ok(a);
		} else {
			var problems = _n0.a;
			return elm$core$Result$Err(
				A2(elm$core$List$map, elm$parser$Parser$problemToDeadEnd, problems));
		}
	});
var elm$core$Basics$identity = function (x) {
	return x;
};
var elm$core$Basics$negate = function (n) {
	return -n;
};
var elm$parser$Parser$Advanced$Bad = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var elm$parser$Parser$Advanced$Good = F3(
	function (a, b, c) {
		return {$: 0, a: a, b: b, c: c};
	});
var elm$parser$Parser$Advanced$Parser = elm$core$Basics$identity;
var elm$parser$Parser$Advanced$andThen = F2(
	function (callback, _n0) {
		var parseA = _n0;
		return function (s0) {
			var _n1 = parseA(s0);
			if (_n1.$ === 1) {
				var p = _n1.a;
				var x = _n1.b;
				return A2(elm$parser$Parser$Advanced$Bad, p, x);
			} else {
				var p1 = _n1.a;
				var a = _n1.b;
				var s1 = _n1.c;
				var _n2 = callback(a);
				var parseB = _n2;
				var _n3 = parseB(s1);
				if (_n3.$ === 1) {
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
		};
	});
var elm$parser$Parser$andThen = elm$parser$Parser$Advanced$andThen;
var elm$parser$Parser$ExpectingEnd = {$: 10};
var elm$core$String$length = _String_length;
var elm$parser$Parser$Advanced$AddRight = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var elm$parser$Parser$Advanced$DeadEnd = F4(
	function (row, col, problem, contextStack) {
		return {eW: col, gZ: contextStack, f$: problem, gf: row};
	});
var elm$parser$Parser$Advanced$Empty = {$: 0};
var elm$parser$Parser$Advanced$fromState = F2(
	function (s, x) {
		return A2(
			elm$parser$Parser$Advanced$AddRight,
			elm$parser$Parser$Advanced$Empty,
			A4(elm$parser$Parser$Advanced$DeadEnd, s.gf, s.eW, x, s.e0));
	});
var elm$parser$Parser$Advanced$end = function (x) {
	return function (s) {
		return _Utils_eq(
			elm$core$String$length(s.a),
			s.b) ? A3(elm$parser$Parser$Advanced$Good, false, 0, s) : A2(
			elm$parser$Parser$Advanced$Bad,
			false,
			A2(elm$parser$Parser$Advanced$fromState, s, x));
	};
};
var elm$parser$Parser$end = elm$parser$Parser$Advanced$end(elm$parser$Parser$ExpectingEnd);
var elm$core$Basics$always = F2(
	function (a, _n0) {
		return a;
	});
var elm$parser$Parser$Advanced$map2 = F3(
	function (func, _n0, _n1) {
		var parseA = _n0;
		var parseB = _n1;
		return function (s0) {
			var _n2 = parseA(s0);
			if (_n2.$ === 1) {
				var p = _n2.a;
				var x = _n2.b;
				return A2(elm$parser$Parser$Advanced$Bad, p, x);
			} else {
				var p1 = _n2.a;
				var a = _n2.b;
				var s1 = _n2.c;
				var _n3 = parseB(s1);
				if (_n3.$ === 1) {
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
		};
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
		var parse = _n0;
		return function (s0) {
			var _n1 = parse(s0);
			if (!_n1.$) {
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
		};
	});
var elm$parser$Parser$map = elm$parser$Parser$Advanced$map;
var elm$parser$Parser$Advanced$Append = F2(
	function (a, b) {
		return {$: 2, a: a, b: b};
	});
var elm$parser$Parser$Advanced$oneOfHelp = F3(
	function (s0, bag, parsers) {
		oneOfHelp:
		while (true) {
			if (!parsers.b) {
				return A2(elm$parser$Parser$Advanced$Bad, false, bag);
			} else {
				var parse = parsers.a;
				var remainingParsers = parsers.b;
				var _n1 = parse(s0);
				if (!_n1.$) {
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
	return function (s) {
		return A3(elm$parser$Parser$Advanced$oneOfHelp, s, elm$parser$Parser$Advanced$Empty, parsers);
	};
};
var elm$parser$Parser$oneOf = elm$parser$Parser$Advanced$oneOf;
var elm$parser$Parser$Advanced$succeed = function (a) {
	return function (s) {
		return A3(elm$parser$Parser$Advanced$Good, false, a, s);
	};
};
var elm$parser$Parser$succeed = elm$parser$Parser$Advanced$succeed;
var elm$parser$Parser$ExpectingSymbol = function (a) {
	return {$: 8, a: a};
};
var elm$parser$Parser$Advanced$Token = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var elm$core$Basics$not = _Basics_not;
var elm$core$String$isEmpty = function (string) {
	return string === '';
};
var elm$parser$Parser$Advanced$isSubString = _Parser_isSubString;
var elm$parser$Parser$Advanced$token = function (_n0) {
	var str = _n0.a;
	var expecting = _n0.b;
	var progress = !elm$core$String$isEmpty(str);
	return function (s) {
		var _n1 = A5(elm$parser$Parser$Advanced$isSubString, str, s.b, s.gf, s.eW, s.a);
		var newOffset = _n1.a;
		var newRow = _n1.b;
		var newCol = _n1.c;
		return _Utils_eq(newOffset, -1) ? A2(
			elm$parser$Parser$Advanced$Bad,
			false,
			A2(elm$parser$Parser$Advanced$fromState, s, expecting)) : A3(
			elm$parser$Parser$Advanced$Good,
			progress,
			0,
			{eW: newCol, e0: s.e0, n: s.n, b: newOffset, gf: newRow, a: s.a});
	};
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
			var newOffset = A3(elm$parser$Parser$Advanced$isSubChar, isGood, offset, s0.a);
			if (_Utils_eq(newOffset, -1)) {
				return A3(
					elm$parser$Parser$Advanced$Good,
					_Utils_cmp(s0.b, offset) < 0,
					0,
					{eW: col, e0: s0.e0, n: s0.n, b: offset, gf: row, a: s0.a});
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
	return function (s) {
		return A5(elm$parser$Parser$Advanced$chompWhileHelp, isGood, s.b, s.gf, s.eW, s);
	};
};
var elm$parser$Parser$chompWhile = elm$parser$Parser$Advanced$chompWhile;
var elm$core$String$slice = _String_slice;
var elm$parser$Parser$Advanced$mapChompedString = F2(
	function (func, _n0) {
		var parse = _n0;
		return function (s0) {
			var _n1 = parse(s0);
			if (_n1.$ === 1) {
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
						A3(elm$core$String$slice, s0.b, s1.b, s0.a),
						a),
					s1);
			}
		};
	});
var elm$parser$Parser$Advanced$getChompedString = function (parser) {
	return A2(elm$parser$Parser$Advanced$mapChompedString, elm$core$Basics$always, parser);
};
var elm$parser$Parser$getChompedString = elm$parser$Parser$Advanced$getChompedString;
var elm$parser$Parser$Problem = function (a) {
	return {$: 12, a: a};
};
var elm$parser$Parser$Advanced$problem = function (x) {
	return function (s) {
		return A2(
			elm$parser$Parser$Advanced$Bad,
			false,
			A2(elm$parser$Parser$Advanced$fromState, s, x));
	};
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
			if (!_n0.$) {
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
var elm$time$Time$Posix = elm$core$Basics$identity;
var elm$time$Time$millisToPosix = elm$core$Basics$identity;
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
				if (!_n0.$) {
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
var elm$core$Basics$modBy = _Basics_modBy;
var elm$core$Basics$neq = _Utils_notEqual;
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
		if (!_n0.$) {
			var v = _n0.a;
			return elm$json$Json$Decode$succeed(v);
		} else {
			return elm$json$Json$Decode$fail('Expecting an ISO-8601 formatted date+time string');
		}
	},
	elm$json$Json$Decode$string);
var author$project$Backend$decodeEventActor = A2(
	elm_community$json_extra$Json$Decode$Extra$andMap,
	A2(elm$json$Json$Decode$field, 'createdAt', elm_community$json_extra$Json$Decode$Extra$datetime),
	A2(
		elm_community$json_extra$Json$Decode$Extra$andMap,
		A2(elm$json$Json$Decode$field, 'avatar', elm$json$Json$Decode$string),
		A2(
			elm_community$json_extra$Json$Decode$Extra$andMap,
			A2(
				elm$json$Json$Decode$field,
				'user',
				elm$json$Json$Decode$maybe(author$project$GitHubGraph$decodeUser)),
			elm$json$Json$Decode$succeed(author$project$Backend$EventActor))));
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
														return {aw: author, cx: cards, bd: commentCount, e3: createdAt, fu: id, bk: labels, cO: milestone, k: number, by: reactions, q: repo, _: state, bF: title, c5: updatedAt, ib: url};
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
var author$project$GitHubGraph$CardLocation = F4(
	function (id, url, project, column) {
		return {eX: column, fu: id, f2: project, ib: url};
	});
var author$project$GitHubGraph$ProjectColumn = F3(
	function (id, name, databaseId) {
		return {cD: databaseId, fu: id, ht: name};
	});
var author$project$GitHubGraph$decodeProjectColumn = A2(
	elm_community$json_extra$Json$Decode$Extra$andMap,
	A2(elm$json$Json$Decode$field, 'database_id', elm$json$Json$Decode$int),
	A2(
		elm_community$json_extra$Json$Decode$Extra$andMap,
		A2(elm$json$Json$Decode$field, 'name', elm$json$Json$Decode$string),
		A2(
			elm_community$json_extra$Json$Decode$Extra$andMap,
			A2(elm$json$Json$Decode$field, 'id', elm$json$Json$Decode$string),
			elm$json$Json$Decode$succeed(author$project$GitHubGraph$ProjectColumn))));
var author$project$GitHubGraph$ProjectLocation = F4(
	function (id, url, name, number) {
		return {fu: id, ht: name, k: number, ib: url};
	});
var author$project$GitHubGraph$decodeProjectLocation = A2(
	elm_community$json_extra$Json$Decode$Extra$andMap,
	A2(elm$json$Json$Decode$field, 'number', elm$json$Json$Decode$int),
	A2(
		elm_community$json_extra$Json$Decode$Extra$andMap,
		A2(elm$json$Json$Decode$field, 'name', elm$json$Json$Decode$string),
		A2(
			elm_community$json_extra$Json$Decode$Extra$andMap,
			A2(elm$json$Json$Decode$field, 'url', elm$json$Json$Decode$string),
			A2(
				elm_community$json_extra$Json$Decode$Extra$andMap,
				A2(elm$json$Json$Decode$field, 'id', elm$json$Json$Decode$string),
				elm$json$Json$Decode$succeed(author$project$GitHubGraph$ProjectLocation)))));
var author$project$GitHubGraph$decodeCardLocation = A2(
	elm_community$json_extra$Json$Decode$Extra$andMap,
	A2(
		elm$json$Json$Decode$field,
		'column',
		elm$json$Json$Decode$maybe(author$project$GitHubGraph$decodeProjectColumn)),
	A2(
		elm_community$json_extra$Json$Decode$Extra$andMap,
		A2(elm$json$Json$Decode$field, 'project', author$project$GitHubGraph$decodeProjectLocation),
		A2(
			elm_community$json_extra$Json$Decode$Extra$andMap,
			A2(elm$json$Json$Decode$field, 'url', elm$json$Json$Decode$string),
			A2(
				elm_community$json_extra$Json$Decode$Extra$andMap,
				A2(elm$json$Json$Decode$field, 'id', elm$json$Json$Decode$string),
				elm$json$Json$Decode$succeed(author$project$GitHubGraph$CardLocation)))));
var author$project$GitHubGraph$customDecoder = F2(
	function (decoder, toResult) {
		return A2(
			elm$json$Json$Decode$andThen,
			function (a) {
				var _n0 = toResult(a);
				if (!_n0.$) {
					var b = _n0.a;
					return elm$json$Json$Decode$succeed(b);
				} else {
					var err = _n0.a;
					return elm$json$Json$Decode$fail(err);
				}
			},
			decoder);
	});
var author$project$GitHubGraph$IssueStateClosed = 1;
var author$project$GitHubGraph$IssueStateOpen = 0;
var author$project$GitHubGraph$issueStates = _List_fromArray(
	[
		_Utils_Tuple2('OPEN', 0),
		_Utils_Tuple2('CLOSED', 1)
	]);
var elm$core$Dict$Black = 1;
var elm$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {$: -1, a: a, b: b, c: c, d: d, e: e};
	});
var elm$core$Basics$compare = _Utils_compare;
var elm$core$Dict$Red = 0;
var elm$core$Dict$balance = F5(
	function (color, key, value, left, right) {
		if ((right.$ === -1) && (!right.a)) {
			var _n1 = right.a;
			var rK = right.b;
			var rV = right.c;
			var rLeft = right.d;
			var rRight = right.e;
			if ((left.$ === -1) && (!left.a)) {
				var _n3 = left.a;
				var lK = left.b;
				var lV = left.c;
				var lLeft = left.d;
				var lRight = left.e;
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					0,
					key,
					value,
					A5(elm$core$Dict$RBNode_elm_builtin, 1, lK, lV, lLeft, lRight),
					A5(elm$core$Dict$RBNode_elm_builtin, 1, rK, rV, rLeft, rRight));
			} else {
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					color,
					rK,
					rV,
					A5(elm$core$Dict$RBNode_elm_builtin, 0, key, value, left, rLeft),
					rRight);
			}
		} else {
			if ((((left.$ === -1) && (!left.a)) && (left.d.$ === -1)) && (!left.d.a)) {
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
					0,
					lK,
					lV,
					A5(elm$core$Dict$RBNode_elm_builtin, 1, llK, llV, llLeft, llRight),
					A5(elm$core$Dict$RBNode_elm_builtin, 1, key, value, lRight, right));
			} else {
				return A5(elm$core$Dict$RBNode_elm_builtin, color, key, value, left, right);
			}
		}
	});
var elm$core$Dict$insertHelp = F3(
	function (key, value, dict) {
		if (dict.$ === -2) {
			return A5(elm$core$Dict$RBNode_elm_builtin, 0, key, value, elm$core$Dict$RBEmpty_elm_builtin, elm$core$Dict$RBEmpty_elm_builtin);
		} else {
			var nColor = dict.a;
			var nKey = dict.b;
			var nValue = dict.c;
			var nLeft = dict.d;
			var nRight = dict.e;
			var _n1 = A2(elm$core$Basics$compare, key, nKey);
			switch (_n1) {
				case 0:
					return A5(
						elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						A3(elm$core$Dict$insertHelp, key, value, nLeft),
						nRight);
				case 1:
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
		if ((_n0.$ === -1) && (!_n0.a)) {
			var _n1 = _n0.a;
			var k = _n0.b;
			var v = _n0.c;
			var l = _n0.d;
			var r = _n0.e;
			return A5(elm$core$Dict$RBNode_elm_builtin, 1, k, v, l, r);
		} else {
			var x = _n0;
			return x;
		}
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
var elm$core$Dict$get = F2(
	function (targetKey, dict) {
		get:
		while (true) {
			if (dict.$ === -2) {
				return elm$core$Maybe$Nothing;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var _n1 = A2(elm$core$Basics$compare, targetKey, key);
				switch (_n1) {
					case 0:
						var $temp$targetKey = targetKey,
							$temp$dict = left;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
					case 1:
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
var author$project$GitHubGraph$decodeIssueState = function () {
	var decodeToType = function (string) {
		var _n0 = A2(
			elm$core$Dict$get,
			string,
			elm$core$Dict$fromList(author$project$GitHubGraph$issueStates));
		if (!_n0.$) {
			var type_ = _n0.a;
			return elm$core$Result$Ok(type_);
		} else {
			return elm$core$Result$Err('Not valid pattern for decoder to IssueState. Pattern: ' + string);
		}
	};
	return A2(author$project$GitHubGraph$customDecoder, elm$json$Json$Decode$string, decodeToType);
}();
var author$project$GitHubGraph$Label = F3(
	function (id, name, color) {
		return {cz: color, fu: id, ht: name};
	});
var author$project$GitHubGraph$decodeLabel = A2(
	elm_community$json_extra$Json$Decode$Extra$andMap,
	A2(elm$json$Json$Decode$field, 'color', elm$json$Json$Decode$string),
	A2(
		elm_community$json_extra$Json$Decode$Extra$andMap,
		A2(elm$json$Json$Decode$field, 'name', elm$json$Json$Decode$string),
		A2(
			elm_community$json_extra$Json$Decode$Extra$andMap,
			A2(elm$json$Json$Decode$field, 'id', elm$json$Json$Decode$string),
			elm$json$Json$Decode$succeed(author$project$GitHubGraph$Label))));
var author$project$GitHubGraph$Milestone = F5(
	function (id, number, title, state, description) {
		return {fa: description, fu: id, k: number, _: state, bF: title};
	});
var author$project$GitHubGraph$MilestoneStateClosed = 1;
var author$project$GitHubGraph$MilestoneStateOpen = 0;
var author$project$GitHubGraph$milestoneStates = _List_fromArray(
	[
		_Utils_Tuple2('OPEN', 0),
		_Utils_Tuple2('CLOSED', 1)
	]);
var author$project$GitHubGraph$decodeMilestoneState = function () {
	var decodeToType = function (string) {
		var _n0 = A2(
			elm$core$Dict$get,
			string,
			elm$core$Dict$fromList(author$project$GitHubGraph$milestoneStates));
		if (!_n0.$) {
			var type_ = _n0.a;
			return elm$core$Result$Ok(type_);
		} else {
			return elm$core$Result$Err('Not valid pattern for decoder to MilestoneState. Pattern: ' + string);
		}
	};
	return A2(author$project$GitHubGraph$customDecoder, elm$json$Json$Decode$string, decodeToType);
}();
var author$project$GitHubGraph$decodeMilestone = A2(
	elm_community$json_extra$Json$Decode$Extra$andMap,
	A2(
		elm$json$Json$Decode$field,
		'description',
		elm$json$Json$Decode$maybe(elm$json$Json$Decode$string)),
	A2(
		elm_community$json_extra$Json$Decode$Extra$andMap,
		A2(elm$json$Json$Decode$field, 'state', author$project$GitHubGraph$decodeMilestoneState),
		A2(
			elm_community$json_extra$Json$Decode$Extra$andMap,
			A2(elm$json$Json$Decode$field, 'title', elm$json$Json$Decode$string),
			A2(
				elm_community$json_extra$Json$Decode$Extra$andMap,
				A2(elm$json$Json$Decode$field, 'number', elm$json$Json$Decode$int),
				A2(
					elm_community$json_extra$Json$Decode$Extra$andMap,
					A2(elm$json$Json$Decode$field, 'id', elm$json$Json$Decode$string),
					elm$json$Json$Decode$succeed(author$project$GitHubGraph$Milestone))))));
var author$project$GitHubGraph$ReactionGroup = F2(
	function (type_, count) {
		return {dh: count, es: type_};
	});
var author$project$GitHubGraph$ReactionTypeConfused = 4;
var author$project$GitHubGraph$ReactionTypeEyes = 7;
var author$project$GitHubGraph$ReactionTypeHeart = 5;
var author$project$GitHubGraph$ReactionTypeHooray = 3;
var author$project$GitHubGraph$ReactionTypeLaugh = 2;
var author$project$GitHubGraph$ReactionTypeRocket = 6;
var author$project$GitHubGraph$ReactionTypeThumbsDown = 1;
var author$project$GitHubGraph$ReactionTypeThumbsUp = 0;
var author$project$GitHubGraph$reactionTypes = _List_fromArray(
	[
		_Utils_Tuple2('THUMBS_UP', 0),
		_Utils_Tuple2('THUMBS_DOWN', 1),
		_Utils_Tuple2('LAUGH', 2),
		_Utils_Tuple2('HOORAY', 3),
		_Utils_Tuple2('CONFUSED', 4),
		_Utils_Tuple2('HEART', 5),
		_Utils_Tuple2('ROCKET', 6),
		_Utils_Tuple2('EYES', 7)
	]);
var author$project$GitHubGraph$decodeReactionType = function () {
	var decodeToType = function (string) {
		var _n0 = A2(
			elm$core$Dict$get,
			string,
			elm$core$Dict$fromList(author$project$GitHubGraph$reactionTypes));
		if (!_n0.$) {
			var type_ = _n0.a;
			return elm$core$Result$Ok(type_);
		} else {
			return elm$core$Result$Err('Not valid pattern for decoder to ReactionType. Pattern: ' + string);
		}
	};
	return A2(author$project$GitHubGraph$customDecoder, elm$json$Json$Decode$string, decodeToType);
}();
var author$project$GitHubGraph$decodeReactionGroup = A2(
	elm_community$json_extra$Json$Decode$Extra$andMap,
	A2(elm$json$Json$Decode$field, 'count', elm$json$Json$Decode$int),
	A2(
		elm_community$json_extra$Json$Decode$Extra$andMap,
		A2(elm$json$Json$Decode$field, 'type_', author$project$GitHubGraph$decodeReactionType),
		elm$json$Json$Decode$succeed(author$project$GitHubGraph$ReactionGroup)));
var author$project$GitHubGraph$RepoLocation = F4(
	function (id, url, owner, name) {
		return {fu: id, ht: name, hN: owner, ib: url};
	});
var author$project$GitHubGraph$decodeRepoLocation = A2(
	elm_community$json_extra$Json$Decode$Extra$andMap,
	A2(elm$json$Json$Decode$field, 'name', elm$json$Json$Decode$string),
	A2(
		elm_community$json_extra$Json$Decode$Extra$andMap,
		A2(elm$json$Json$Decode$field, 'owner', elm$json$Json$Decode$string),
		A2(
			elm_community$json_extra$Json$Decode$Extra$andMap,
			A2(elm$json$Json$Decode$field, 'url', elm$json$Json$Decode$string),
			A2(
				elm_community$json_extra$Json$Decode$Extra$andMap,
				A2(elm$json$Json$Decode$field, 'id', elm$json$Json$Decode$string),
				elm$json$Json$Decode$succeed(author$project$GitHubGraph$RepoLocation)))));
var author$project$GitHubGraph$decodeIssue = A2(
	elm_community$json_extra$Json$Decode$Extra$andMap,
	A2(
		elm$json$Json$Decode$field,
		'milestone',
		elm$json$Json$Decode$maybe(author$project$GitHubGraph$decodeMilestone)),
	A2(
		elm_community$json_extra$Json$Decode$Extra$andMap,
		A2(
			elm$json$Json$Decode$field,
			'cards',
			elm$json$Json$Decode$list(author$project$GitHubGraph$decodeCardLocation)),
		A2(
			elm_community$json_extra$Json$Decode$Extra$andMap,
			A2(
				elm$json$Json$Decode$field,
				'labels',
				elm$json$Json$Decode$list(author$project$GitHubGraph$decodeLabel)),
			A2(
				elm_community$json_extra$Json$Decode$Extra$andMap,
				A2(
					elm$json$Json$Decode$field,
					'author',
					elm$json$Json$Decode$maybe(author$project$GitHubGraph$decodeUser)),
				A2(
					elm_community$json_extra$Json$Decode$Extra$andMap,
					A2(
						elm$json$Json$Decode$field,
						'reactions',
						elm$json$Json$Decode$list(author$project$GitHubGraph$decodeReactionGroup)),
					A2(
						elm_community$json_extra$Json$Decode$Extra$andMap,
						A2(elm$json$Json$Decode$field, 'comment_count', elm$json$Json$Decode$int),
						A2(
							elm_community$json_extra$Json$Decode$Extra$andMap,
							A2(elm$json$Json$Decode$field, 'title', elm$json$Json$Decode$string),
							A2(
								elm_community$json_extra$Json$Decode$Extra$andMap,
								A2(elm$json$Json$Decode$field, 'number', elm$json$Json$Decode$int),
								A2(
									elm_community$json_extra$Json$Decode$Extra$andMap,
									A2(elm$json$Json$Decode$field, 'repo', author$project$GitHubGraph$decodeRepoLocation),
									A2(
										elm_community$json_extra$Json$Decode$Extra$andMap,
										A2(elm$json$Json$Decode$field, 'state', author$project$GitHubGraph$decodeIssueState),
										A2(
											elm_community$json_extra$Json$Decode$Extra$andMap,
											A2(elm$json$Json$Decode$field, 'updated_at', elm_community$json_extra$Json$Decode$Extra$datetime),
											A2(
												elm_community$json_extra$Json$Decode$Extra$andMap,
												A2(elm$json$Json$Decode$field, 'created_at', elm_community$json_extra$Json$Decode$Extra$datetime),
												A2(
													elm_community$json_extra$Json$Decode$Extra$andMap,
													A2(elm$json$Json$Decode$field, 'url', elm$json$Json$Decode$string),
													A2(
														elm_community$json_extra$Json$Decode$Extra$andMap,
														A2(elm$json$Json$Decode$field, 'id', elm$json$Json$Decode$string),
														elm$json$Json$Decode$succeed(author$project$GitHubGraph$Issue)))))))))))))));
var author$project$GitHubGraph$Project = F5(
	function (id, url, name, number, columns) {
		return {eZ: columns, fu: id, ht: name, k: number, ib: url};
	});
var author$project$GitHubGraph$decodeProject = A2(
	elm_community$json_extra$Json$Decode$Extra$andMap,
	A2(
		elm$json$Json$Decode$field,
		'columns',
		elm$json$Json$Decode$list(author$project$GitHubGraph$decodeProjectColumn)),
	A2(
		elm_community$json_extra$Json$Decode$Extra$andMap,
		A2(elm$json$Json$Decode$field, 'number', elm$json$Json$Decode$int),
		A2(
			elm_community$json_extra$Json$Decode$Extra$andMap,
			A2(elm$json$Json$Decode$field, 'name', elm$json$Json$Decode$string),
			A2(
				elm_community$json_extra$Json$Decode$Extra$andMap,
				A2(elm$json$Json$Decode$field, 'url', elm$json$Json$Decode$string),
				A2(
					elm_community$json_extra$Json$Decode$Extra$andMap,
					A2(elm$json$Json$Decode$field, 'id', elm$json$Json$Decode$string),
					elm$json$Json$Decode$succeed(author$project$GitHubGraph$Project))))));
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
																		return {eI: additions, aw: author, cx: cards, bd: commentCount, e3: createdAt, e9: deletions, fu: id, bk: labels, fD: lastCommit, fJ: mergeable, cO: milestone, k: number, by: reactions, q: repo, _: state, bF: title, c5: updatedAt, ib: url};
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
var author$project$GitHubGraph$Commit = F6(
	function (sha, status, author, committer, authoredAt, committedAt) {
		return {aw: author, eP: authoredAt, e_: committedAt, gX: committer, gm: sha, gq: status};
	});
var author$project$GitHubGraph$GitActor = F4(
	function (email, name, avatar, user) {
		return {da: avatar, ff: email, ht: name, ev: user};
	});
var author$project$GitHubGraph$decodeGitActor = A2(
	elm_community$json_extra$Json$Decode$Extra$andMap,
	A2(
		elm$json$Json$Decode$field,
		'user',
		elm$json$Json$Decode$maybe(author$project$GitHubGraph$decodeUser)),
	A2(
		elm_community$json_extra$Json$Decode$Extra$andMap,
		A2(elm$json$Json$Decode$field, 'avatar', elm$json$Json$Decode$string),
		A2(
			elm_community$json_extra$Json$Decode$Extra$andMap,
			A2(elm$json$Json$Decode$field, 'name', elm$json$Json$Decode$string),
			A2(
				elm_community$json_extra$Json$Decode$Extra$andMap,
				A2(elm$json$Json$Decode$field, 'email', elm$json$Json$Decode$string),
				elm$json$Json$Decode$succeed(author$project$GitHubGraph$GitActor)))));
var author$project$GitHubGraph$Status = F2(
	function (state, contexts) {
		return {e1: contexts, _: state};
	});
var author$project$GitHubGraph$StatusContext = F4(
	function (state, context, targetUrl, creator) {
		return {e0: context, e4: creator, _: state, gv: targetUrl};
	});
var author$project$GitHubGraph$Actor = F3(
	function (url, login, avatar) {
		return {da: avatar, hn: login, ib: url};
	});
var author$project$GitHubGraph$decodeActor = A2(
	elm_community$json_extra$Json$Decode$Extra$andMap,
	A2(elm$json$Json$Decode$field, 'avatar', elm$json$Json$Decode$string),
	A2(
		elm_community$json_extra$Json$Decode$Extra$andMap,
		A2(elm$json$Json$Decode$field, 'login', elm$json$Json$Decode$string),
		A2(
			elm_community$json_extra$Json$Decode$Extra$andMap,
			A2(elm$json$Json$Decode$field, 'url', elm$json$Json$Decode$string),
			elm$json$Json$Decode$succeed(author$project$GitHubGraph$Actor))));
var author$project$GitHubGraph$StatusStateError = 1;
var author$project$GitHubGraph$StatusStateExpected = 0;
var author$project$GitHubGraph$StatusStateFailure = 2;
var author$project$GitHubGraph$StatusStatePending = 3;
var author$project$GitHubGraph$StatusStateSuccess = 4;
var author$project$GitHubGraph$statusStates = _List_fromArray(
	[
		_Utils_Tuple2('EXPECTED', 0),
		_Utils_Tuple2('ERROR', 1),
		_Utils_Tuple2('FAILURE', 2),
		_Utils_Tuple2('PENDING', 3),
		_Utils_Tuple2('SUCCESS', 4)
	]);
var author$project$GitHubGraph$decodeStatusState = function () {
	var decodeToType = function (string) {
		var _n0 = A2(
			elm$core$Dict$get,
			string,
			elm$core$Dict$fromList(author$project$GitHubGraph$statusStates));
		if (!_n0.$) {
			var type_ = _n0.a;
			return elm$core$Result$Ok(type_);
		} else {
			return elm$core$Result$Err('Not valid pattern for decoder to StatusState. Pattern: ' + string);
		}
	};
	return A2(author$project$GitHubGraph$customDecoder, elm$json$Json$Decode$string, decodeToType);
}();
var author$project$GitHubGraph$decodeStatusContext = A2(
	elm_community$json_extra$Json$Decode$Extra$andMap,
	A2(elm$json$Json$Decode$field, 'creator', author$project$GitHubGraph$decodeActor),
	A2(
		elm_community$json_extra$Json$Decode$Extra$andMap,
		A2(
			elm$json$Json$Decode$field,
			'target_url',
			elm$json$Json$Decode$maybe(elm$json$Json$Decode$string)),
		A2(
			elm_community$json_extra$Json$Decode$Extra$andMap,
			A2(elm$json$Json$Decode$field, 'context', elm$json$Json$Decode$string),
			A2(
				elm_community$json_extra$Json$Decode$Extra$andMap,
				A2(elm$json$Json$Decode$field, 'state', author$project$GitHubGraph$decodeStatusState),
				elm$json$Json$Decode$succeed(author$project$GitHubGraph$StatusContext)))));
var author$project$GitHubGraph$decodeStatus = A2(
	elm_community$json_extra$Json$Decode$Extra$andMap,
	A2(
		elm$json$Json$Decode$field,
		'contexts',
		elm$json$Json$Decode$list(author$project$GitHubGraph$decodeStatusContext)),
	A2(
		elm_community$json_extra$Json$Decode$Extra$andMap,
		A2(elm$json$Json$Decode$field, 'state', author$project$GitHubGraph$decodeStatusState),
		elm$json$Json$Decode$succeed(author$project$GitHubGraph$Status)));
var author$project$GitHubGraph$decodeCommit = A2(
	elm_community$json_extra$Json$Decode$Extra$andMap,
	A2(elm$json$Json$Decode$field, 'committed_at', elm_community$json_extra$Json$Decode$Extra$datetime),
	A2(
		elm_community$json_extra$Json$Decode$Extra$andMap,
		A2(elm$json$Json$Decode$field, 'authored_at', elm_community$json_extra$Json$Decode$Extra$datetime),
		A2(
			elm_community$json_extra$Json$Decode$Extra$andMap,
			A2(
				elm$json$Json$Decode$field,
				'committer',
				elm$json$Json$Decode$maybe(author$project$GitHubGraph$decodeGitActor)),
			A2(
				elm_community$json_extra$Json$Decode$Extra$andMap,
				A2(
					elm$json$Json$Decode$field,
					'author',
					elm$json$Json$Decode$maybe(author$project$GitHubGraph$decodeGitActor)),
				A2(
					elm_community$json_extra$Json$Decode$Extra$andMap,
					A2(
						elm$json$Json$Decode$field,
						'status',
						elm$json$Json$Decode$maybe(author$project$GitHubGraph$decodeStatus)),
					A2(
						elm_community$json_extra$Json$Decode$Extra$andMap,
						A2(elm$json$Json$Decode$field, 'sha', elm$json$Json$Decode$string),
						elm$json$Json$Decode$succeed(author$project$GitHubGraph$Commit)))))));
var author$project$GitHubGraph$MergeableStateConflicting = 1;
var author$project$GitHubGraph$MergeableStateMergeable = 0;
var author$project$GitHubGraph$MergeableStateUnknown = 2;
var author$project$GitHubGraph$mergeableStates = _List_fromArray(
	[
		_Utils_Tuple2('MERGEABLE', 0),
		_Utils_Tuple2('CONFLICTING', 1),
		_Utils_Tuple2('UNKNOWN', 2)
	]);
var author$project$GitHubGraph$decodeMergeableState = function () {
	var decodeToType = function (string) {
		var _n0 = A2(
			elm$core$Dict$get,
			string,
			elm$core$Dict$fromList(author$project$GitHubGraph$mergeableStates));
		if (!_n0.$) {
			var type_ = _n0.a;
			return elm$core$Result$Ok(type_);
		} else {
			return elm$core$Result$Err('Not valid pattern for decoder to MergeableState. Pattern: ' + string);
		}
	};
	return A2(author$project$GitHubGraph$customDecoder, elm$json$Json$Decode$string, decodeToType);
}();
var author$project$GitHubGraph$PullRequestStateClosed = 1;
var author$project$GitHubGraph$PullRequestStateMerged = 2;
var author$project$GitHubGraph$PullRequestStateOpen = 0;
var author$project$GitHubGraph$pullRequestStates = _List_fromArray(
	[
		_Utils_Tuple2('OPEN', 0),
		_Utils_Tuple2('CLOSED', 1),
		_Utils_Tuple2('MERGED', 2)
	]);
var author$project$GitHubGraph$decodePullRequestState = function () {
	var decodeToType = function (string) {
		var _n0 = A2(
			elm$core$Dict$get,
			string,
			elm$core$Dict$fromList(author$project$GitHubGraph$pullRequestStates));
		if (!_n0.$) {
			var type_ = _n0.a;
			return elm$core$Result$Ok(type_);
		} else {
			return elm$core$Result$Err('Not valid pattern for decoder to PullRequestState. Pattern: ' + string);
		}
	};
	return A2(author$project$GitHubGraph$customDecoder, elm$json$Json$Decode$string, decodeToType);
}();
var author$project$GitHubGraph$decodePullRequest = A2(
	elm_community$json_extra$Json$Decode$Extra$andMap,
	A2(
		elm$json$Json$Decode$field,
		'last_commit',
		elm$json$Json$Decode$maybe(author$project$GitHubGraph$decodeCommit)),
	A2(
		elm_community$json_extra$Json$Decode$Extra$andMap,
		A2(elm$json$Json$Decode$field, 'mergeable', author$project$GitHubGraph$decodeMergeableState),
		A2(
			elm_community$json_extra$Json$Decode$Extra$andMap,
			A2(
				elm$json$Json$Decode$field,
				'milestone',
				elm$json$Json$Decode$maybe(author$project$GitHubGraph$decodeMilestone)),
			A2(
				elm_community$json_extra$Json$Decode$Extra$andMap,
				A2(elm$json$Json$Decode$field, 'deletions', elm$json$Json$Decode$int),
				A2(
					elm_community$json_extra$Json$Decode$Extra$andMap,
					A2(elm$json$Json$Decode$field, 'additions', elm$json$Json$Decode$int),
					A2(
						elm_community$json_extra$Json$Decode$Extra$andMap,
						A2(
							elm$json$Json$Decode$field,
							'cards',
							elm$json$Json$Decode$list(author$project$GitHubGraph$decodeCardLocation)),
						A2(
							elm_community$json_extra$Json$Decode$Extra$andMap,
							A2(
								elm$json$Json$Decode$field,
								'labels',
								elm$json$Json$Decode$list(author$project$GitHubGraph$decodeLabel)),
							A2(
								elm_community$json_extra$Json$Decode$Extra$andMap,
								A2(
									elm$json$Json$Decode$field,
									'author',
									elm$json$Json$Decode$maybe(author$project$GitHubGraph$decodeUser)),
								A2(
									elm_community$json_extra$Json$Decode$Extra$andMap,
									A2(
										elm$json$Json$Decode$field,
										'reactions',
										elm$json$Json$Decode$list(author$project$GitHubGraph$decodeReactionGroup)),
									A2(
										elm_community$json_extra$Json$Decode$Extra$andMap,
										A2(elm$json$Json$Decode$field, 'comment_count', elm$json$Json$Decode$int),
										A2(
											elm_community$json_extra$Json$Decode$Extra$andMap,
											A2(elm$json$Json$Decode$field, 'title', elm$json$Json$Decode$string),
											A2(
												elm_community$json_extra$Json$Decode$Extra$andMap,
												A2(elm$json$Json$Decode$field, 'number', elm$json$Json$Decode$int),
												A2(
													elm_community$json_extra$Json$Decode$Extra$andMap,
													A2(elm$json$Json$Decode$field, 'repo', author$project$GitHubGraph$decodeRepoLocation),
													A2(
														elm_community$json_extra$Json$Decode$Extra$andMap,
														A2(elm$json$Json$Decode$field, 'state', author$project$GitHubGraph$decodePullRequestState),
														A2(
															elm_community$json_extra$Json$Decode$Extra$andMap,
															A2(elm$json$Json$Decode$field, 'updated_at', elm_community$json_extra$Json$Decode$Extra$datetime),
															A2(
																elm_community$json_extra$Json$Decode$Extra$andMap,
																A2(elm$json$Json$Decode$field, 'created_at', elm_community$json_extra$Json$Decode$Extra$datetime),
																A2(
																	elm_community$json_extra$Json$Decode$Extra$andMap,
																	A2(elm$json$Json$Decode$field, 'url', elm$json$Json$Decode$string),
																	A2(
																		elm_community$json_extra$Json$Decode$Extra$andMap,
																		A2(elm$json$Json$Decode$field, 'id', elm$json$Json$Decode$string),
																		elm$json$Json$Decode$succeed(author$project$GitHubGraph$PullRequest)))))))))))))))))));
var author$project$GitHubGraph$PullRequestReview = F3(
	function (author, state, createdAt) {
		return {aw: author, e3: createdAt, _: state};
	});
var author$project$GitHubGraph$PullRequestReviewStateApproved = 2;
var author$project$GitHubGraph$PullRequestReviewStateChangesRequested = 3;
var author$project$GitHubGraph$PullRequestReviewStateCommented = 1;
var author$project$GitHubGraph$PullRequestReviewStateDismissed = 4;
var author$project$GitHubGraph$PullRequestReviewStatePending = 0;
var author$project$GitHubGraph$pullRequestReviewStates = _List_fromArray(
	[
		_Utils_Tuple2('PENDING', 0),
		_Utils_Tuple2('COMMENTED', 1),
		_Utils_Tuple2('APPROVED', 2),
		_Utils_Tuple2('CHANGES_REQUESTED', 3),
		_Utils_Tuple2('DISMISSED', 4)
	]);
var author$project$GitHubGraph$decodePullRequestReviewState = function () {
	var decodeToType = function (string) {
		var _n0 = A2(
			elm$core$Dict$get,
			string,
			elm$core$Dict$fromList(author$project$GitHubGraph$pullRequestReviewStates));
		if (!_n0.$) {
			var type_ = _n0.a;
			return elm$core$Result$Ok(type_);
		} else {
			return elm$core$Result$Err('Not valid pattern for decoder to PullRequestReviewState. Pattern: ' + string);
		}
	};
	return A2(author$project$GitHubGraph$customDecoder, elm$json$Json$Decode$string, decodeToType);
}();
var author$project$GitHubGraph$decodePullRequestReview = A2(
	elm_community$json_extra$Json$Decode$Extra$andMap,
	A2(elm$json$Json$Decode$field, 'created_at', elm_community$json_extra$Json$Decode$Extra$datetime),
	A2(
		elm_community$json_extra$Json$Decode$Extra$andMap,
		A2(elm$json$Json$Decode$field, 'state', author$project$GitHubGraph$decodePullRequestReviewState),
		A2(
			elm_community$json_extra$Json$Decode$Extra$andMap,
			A2(elm$json$Json$Decode$field, 'author', author$project$GitHubGraph$decodeUser),
			elm$json$Json$Decode$succeed(author$project$GitHubGraph$PullRequestReview))));
var author$project$GitHubGraph$Repo = F7(
	function (id, url, owner, name, isArchived, labels, milestones) {
		return {fu: id, fz: isArchived, bk: labels, fK: milestones, ht: name, hN: owner, ib: url};
	});
var elm$json$Json$Decode$bool = _Json_decodeBool;
var author$project$GitHubGraph$decodeRepo = A2(
	elm_community$json_extra$Json$Decode$Extra$andMap,
	A2(
		elm$json$Json$Decode$field,
		'milestones',
		elm$json$Json$Decode$list(author$project$GitHubGraph$decodeMilestone)),
	A2(
		elm_community$json_extra$Json$Decode$Extra$andMap,
		A2(
			elm$json$Json$Decode$field,
			'labels',
			elm$json$Json$Decode$list(author$project$GitHubGraph$decodeLabel)),
		A2(
			elm_community$json_extra$Json$Decode$Extra$andMap,
			A2(elm$json$Json$Decode$field, 'is_archived', elm$json$Json$Decode$bool),
			A2(
				elm_community$json_extra$Json$Decode$Extra$andMap,
				A2(elm$json$Json$Decode$field, 'name', elm$json$Json$Decode$string),
				A2(
					elm_community$json_extra$Json$Decode$Extra$andMap,
					A2(elm$json$Json$Decode$field, 'owner', elm$json$Json$Decode$string),
					A2(
						elm_community$json_extra$Json$Decode$Extra$andMap,
						A2(elm$json$Json$Decode$field, 'url', elm$json$Json$Decode$string),
						A2(
							elm_community$json_extra$Json$Decode$Extra$andMap,
							A2(elm$json$Json$Decode$field, 'id', elm$json$Json$Decode$string),
							elm$json$Json$Decode$succeed(author$project$GitHubGraph$Repo))))))));
var elm$json$Json$Decode$keyValuePairs = _Json_decodeKeyValuePairs;
var elm$json$Json$Decode$dict = function (decoder) {
	return A2(
		elm$json$Json$Decode$map,
		elm$core$Dict$fromList,
		elm$json$Json$Decode$keyValuePairs(decoder));
};
var author$project$Backend$decodeData = A2(
	elm_community$json_extra$Json$Decode$Extra$andMap,
	A2(
		elm$json$Json$Decode$field,
		'reviewers',
		elm$json$Json$Decode$dict(
			elm$json$Json$Decode$list(author$project$GitHubGraph$decodePullRequestReview))),
	A2(
		elm_community$json_extra$Json$Decode$Extra$andMap,
		A2(
			elm$json$Json$Decode$field,
			'actors',
			elm$json$Json$Decode$dict(
				elm$json$Json$Decode$list(author$project$Backend$decodeEventActor))),
		A2(
			elm_community$json_extra$Json$Decode$Extra$andMap,
			A2(
				elm$json$Json$Decode$field,
				'references',
				elm$json$Json$Decode$dict(
					elm$json$Json$Decode$list(elm$json$Json$Decode$string))),
			A2(
				elm_community$json_extra$Json$Decode$Extra$andMap,
				A2(
					elm$json$Json$Decode$field,
					'columnCards',
					elm$json$Json$Decode$dict(author$project$Backend$decodeCards)),
				A2(
					elm_community$json_extra$Json$Decode$Extra$andMap,
					A2(
						elm$json$Json$Decode$field,
						'projects',
						elm$json$Json$Decode$dict(author$project$GitHubGraph$decodeProject)),
					A2(
						elm_community$json_extra$Json$Decode$Extra$andMap,
						A2(
							elm$json$Json$Decode$field,
							'prs',
							elm$json$Json$Decode$dict(author$project$GitHubGraph$decodePullRequest)),
						A2(
							elm_community$json_extra$Json$Decode$Extra$andMap,
							A2(
								elm$json$Json$Decode$field,
								'issues',
								elm$json$Json$Decode$dict(author$project$GitHubGraph$decodeIssue)),
							A2(
								elm_community$json_extra$Json$Decode$Extra$andMap,
								A2(
									elm$json$Json$Decode$field,
									'repos',
									elm$json$Json$Decode$dict(author$project$GitHubGraph$decodeRepo)),
								elm$json$Json$Decode$succeed(author$project$Backend$Data)))))))));
var elm$core$Maybe$andThen = F2(
	function (callback, maybeValue) {
		if (!maybeValue.$) {
			var value = maybeValue.a;
			return callback(value);
		} else {
			return elm$core$Maybe$Nothing;
		}
	});
var elm$core$Dict$getMin = function (dict) {
	getMin:
	while (true) {
		if ((dict.$ === -1) && (dict.d.$ === -1)) {
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
	if (((dict.$ === -1) && (dict.d.$ === -1)) && (dict.e.$ === -1)) {
		if ((dict.e.d.$ === -1) && (!dict.e.d.a)) {
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
				0,
				rlK,
				rlV,
				A5(
					elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5(elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					rlL),
				A5(elm$core$Dict$RBNode_elm_builtin, 1, rK, rV, rlR, rRight));
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
			if (clr === 1) {
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5(elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5(elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			} else {
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5(elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5(elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var elm$core$Dict$moveRedRight = function (dict) {
	if (((dict.$ === -1) && (dict.d.$ === -1)) && (dict.e.$ === -1)) {
		if ((dict.d.d.$ === -1) && (!dict.d.d.a)) {
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
				0,
				lK,
				lV,
				A5(elm$core$Dict$RBNode_elm_builtin, 1, llK, llV, llLeft, llRight),
				A5(
					elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					lRight,
					A5(elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight)));
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
			if (clr === 1) {
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5(elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5(elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			} else {
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5(elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5(elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var elm$core$Dict$removeHelpPrepEQGT = F7(
	function (targetKey, dict, color, key, value, left, right) {
		if ((left.$ === -1) && (!left.a)) {
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
				A5(elm$core$Dict$RBNode_elm_builtin, 0, key, value, lRight, right));
		} else {
			_n2$2:
			while (true) {
				if ((right.$ === -1) && (right.a === 1)) {
					if (right.d.$ === -1) {
						if (right.d.a === 1) {
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
	if ((dict.$ === -1) && (dict.d.$ === -1)) {
		var color = dict.a;
		var key = dict.b;
		var value = dict.c;
		var left = dict.d;
		var lColor = left.a;
		var lLeft = left.d;
		var right = dict.e;
		if (lColor === 1) {
			if ((lLeft.$ === -1) && (!lLeft.a)) {
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
				if (_n4.$ === -1) {
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
		if (dict.$ === -2) {
			return elm$core$Dict$RBEmpty_elm_builtin;
		} else {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_cmp(targetKey, key) < 0) {
				if ((left.$ === -1) && (left.a === 1)) {
					var _n4 = left.a;
					var lLeft = left.d;
					if ((lLeft.$ === -1) && (!lLeft.a)) {
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
						if (_n7.$ === -1) {
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
		if (dict.$ === -1) {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_eq(targetKey, key)) {
				var _n1 = elm$core$Dict$getMin(right);
				if (_n1.$ === -1) {
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
		if ((_n0.$ === -1) && (!_n0.a)) {
			var _n1 = _n0.a;
			var k = _n0.b;
			var v = _n0.c;
			var l = _n0.d;
			var r = _n0.e;
			return A5(elm$core$Dict$RBNode_elm_builtin, 1, k, v, l, r);
		} else {
			var x = _n0;
			return x;
		}
	});
var elm$core$Dict$update = F3(
	function (targetKey, alter, dictionary) {
		var _n0 = alter(
			A2(elm$core$Dict$get, targetKey, dictionary));
		if (!_n0.$) {
			var value = _n0.a;
			return A3(elm$core$Dict$insert, targetKey, value, dictionary);
		} else {
			return A2(elm$core$Dict$remove, targetKey, dictionary);
		}
	});
var elm$core$Maybe$isJust = function (maybe) {
	if (!maybe.$) {
		return true;
	} else {
		return false;
	}
};
var elm$core$Result$map = F2(
	function (func, ra) {
		if (!ra.$) {
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
		return {$: 4, a: a, b: b};
	});
var elm$http$Http$BadStatus = function (a) {
	return {$: 3, a: a};
};
var elm$http$Http$BadUrl = function (a) {
	return {$: 0, a: a};
};
var elm$http$Http$NetworkError = {$: 2};
var elm$http$Http$Timeout = {$: 1};
var elm$http$Http$Internal$FormDataBody = function (a) {
	return {$: 2, a: a};
};
var elm$http$Http$Internal$isStringBody = function (body) {
	if (body.$ === 1) {
		return true;
	} else {
		return false;
	}
};
var elm$http$Http$expectStringResponse = _Http_expectStringResponse;
var elm$json$Json$Decode$decodeString = _Json_runOnString;
var author$project$Backend$expectJsonWithIndex = function (decoder) {
	return elm$http$Http$expectStringResponse(
		function (_n0) {
			var body = _n0.gM;
			var headers = _n0.he;
			var _n1 = _Utils_Tuple2(
				A2(elm$json$Json$Decode$decodeString, decoder, body),
				A2(
					elm$core$Maybe$andThen,
					elm$core$String$toInt,
					A2(elm$core$Dict$get, 'x-data-index', headers)));
			if (!_n1.a.$) {
				if (!_n1.b.$) {
					var value = _n1.a.a;
					var index = _n1.b.a;
					return elm$core$Result$Ok(
						{dF: index, ew: value});
				} else {
					var value = _n1.a.a;
					return elm$core$Result$Ok(
						{dF: 1, ew: value});
				}
			} else {
				var msg = _n1.a.a;
				return elm$core$Result$Err(
					elm$json$Json$Decode$errorToString(msg));
			}
		});
};
var elm$core$Basics$composeL = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var elm$core$Task$Perform = elm$core$Basics$identity;
var elm$core$Task$andThen = _Scheduler_andThen;
var elm$core$Task$succeed = _Scheduler_succeed;
var elm$core$Task$init = elm$core$Task$succeed(0);
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
		var task = _n0;
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
				return 0;
			},
			elm$core$Task$sequence(
				A2(
					elm$core$List$map,
					elm$core$Task$spawnCmd(router),
					commands)));
	});
var elm$core$Task$onSelfMsg = F3(
	function (_n0, _n1, _n2) {
		return elm$core$Task$succeed(0);
	});
var elm$core$Task$cmdMap = F2(
	function (tagger, _n0) {
		var task = _n0;
		return A2(elm$core$Task$map, tagger, task);
	});
_Platform_effectManagers['Task'] = _Platform_createManager(elm$core$Task$init, elm$core$Task$onEffects, elm$core$Task$onSelfMsg, elm$core$Task$cmdMap);
var elm$core$Task$command = _Platform_leaf('Task');
var elm$core$Task$onError = _Scheduler_onError;
var elm$core$Task$attempt = F2(
	function (resultToMessage, task) {
		return elm$core$Task$command(
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
					task)));
	});
var elm$http$Http$Internal$EmptyBody = {$: 0};
var elm$http$Http$emptyBody = elm$http$Http$Internal$EmptyBody;
var lukewestby$elm_http_builder$HttpBuilder$requestWithMethodAndUrl = F2(
	function (method, url) {
		return {
			gM: elm$http$Http$emptyBody,
			al: elm$core$Maybe$Nothing,
			dm: elm$http$Http$expectStringResponse(
				function (_n0) {
					return elm$core$Result$Ok(0);
				}),
			he: _List_Nil,
			hr: method,
			ae: _List_Nil,
			h1: elm$core$Maybe$Nothing,
			ib: url,
			ih: false
		};
	});
var lukewestby$elm_http_builder$HttpBuilder$get = lukewestby$elm_http_builder$HttpBuilder$requestWithMethodAndUrl('GET');
var elm$http$Http$toTask = function (_n0) {
	var request_ = _n0;
	return A2(_Http_toTask, request_, elm$core$Maybe$Nothing);
};
var elm$http$Http$Internal$Request = elm$core$Basics$identity;
var elm$http$Http$request = elm$core$Basics$identity;
var elm$core$Basics$composeR = F3(
	function (f, g, x) {
		return g(
			f(x));
	});
var elm$url$Url$percentEncode = _Url_percentEncode;
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
	var encodedParams = lukewestby$elm_http_builder$HttpBuilder$joinUrlEncoded(builder.ae);
	var fullUrl = elm$core$String$isEmpty(encodedParams) ? builder.ib : (builder.ib + ('?' + encodedParams));
	return fullUrl;
};
var lukewestby$elm_http_builder$HttpBuilder$toRequest = function (builder) {
	return elm$http$Http$request(
		{
			gM: builder.gM,
			dm: builder.dm,
			he: builder.he,
			hr: builder.hr,
			h1: builder.h1,
			ib: lukewestby$elm_http_builder$HttpBuilder$requestUrl(builder),
			ih: builder.ih
		});
};
var lukewestby$elm_http_builder$HttpBuilder$toTaskPlain = function (builder) {
	return elm$http$Http$toTask(
		lukewestby$elm_http_builder$HttpBuilder$toRequest(builder));
};
var elm$time$Time$Name = function (a) {
	return {$: 0, a: a};
};
var elm$time$Time$Offset = function (a) {
	return {$: 1, a: a};
};
var elm$time$Time$Zone = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var elm$time$Time$customZone = elm$time$Time$Zone;
var elm$time$Time$now = _Time_now(elm$time$Time$millisToPosix);
var elm$time$Time$posixToMillis = function (_n0) {
	var millis = _n0;
	return millis;
};
var lukewestby$elm_http_builder$HttpBuilder$withQueryParams = F2(
	function (queryParams, builder) {
		return _Utils_update(
			builder,
			{
				ae: _Utils_ap(builder.ae, queryParams)
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
	var _n0 = builder.al;
	if (!_n0.$) {
		var paramName = _n0.a;
		return A2(lukewestby$elm_http_builder$HttpBuilder$toTaskWithCacheBuster, paramName, builder);
	} else {
		return lukewestby$elm_http_builder$HttpBuilder$toTaskPlain(builder);
	}
};
var lukewestby$elm_http_builder$HttpBuilder$withExpect = F2(
	function (expect, builder) {
		return {gM: builder.gM, al: builder.al, dm: expect, he: builder.he, hr: builder.hr, ae: builder.ae, h1: builder.h1, ib: builder.ib, ih: builder.ih};
	});
var author$project$Backend$fetchData = function (f) {
	return A2(
		elm$core$Task$attempt,
		f,
		lukewestby$elm_http_builder$HttpBuilder$toTask(
			A2(
				lukewestby$elm_http_builder$HttpBuilder$withExpect,
				author$project$Backend$expectJsonWithIndex(author$project$Backend$decodeData),
				lukewestby$elm_http_builder$HttpBuilder$get('/data'))));
};
var author$project$Backend$Me = F2(
	function (token, user) {
		return {h9: token, ev: user};
	});
var author$project$Backend$User = F4(
	function (id, login, url, avatar) {
		return {da: avatar, fu: id, hn: login, ib: url};
	});
var author$project$Backend$decodeUser = A2(
	elm_community$json_extra$Json$Decode$Extra$andMap,
	A2(elm$json$Json$Decode$field, 'avatar_url', elm$json$Json$Decode$string),
	A2(
		elm_community$json_extra$Json$Decode$Extra$andMap,
		A2(elm$json$Json$Decode$field, 'html_url', elm$json$Json$Decode$string),
		A2(
			elm_community$json_extra$Json$Decode$Extra$andMap,
			A2(elm$json$Json$Decode$field, 'login', elm$json$Json$Decode$string),
			A2(
				elm_community$json_extra$Json$Decode$Extra$andMap,
				A2(elm$json$Json$Decode$field, 'id', elm$json$Json$Decode$int),
				elm$json$Json$Decode$succeed(author$project$Backend$User)))));
var author$project$Backend$decodeMe = A2(
	elm_community$json_extra$Json$Decode$Extra$andMap,
	A2(elm$json$Json$Decode$field, 'user', author$project$Backend$decodeUser),
	A2(
		elm_community$json_extra$Json$Decode$Extra$andMap,
		A2(elm$json$Json$Decode$field, 'token', elm$json$Json$Decode$string),
		elm$json$Json$Decode$succeed(author$project$Backend$Me)));
var elm$http$Http$expectJson = function (decoder) {
	return elm$http$Http$expectStringResponse(
		function (response) {
			var _n0 = A2(elm$json$Json$Decode$decodeString, decoder, response.gM);
			if (_n0.$ === 1) {
				var decodeError = _n0.a;
				return elm$core$Result$Err(
					elm$json$Json$Decode$errorToString(decodeError));
			} else {
				var value = _n0.a;
				return elm$core$Result$Ok(value);
			}
		});
};
var author$project$Backend$fetchMe = function (f) {
	return A2(
		elm$core$Task$attempt,
		f,
		lukewestby$elm_http_builder$HttpBuilder$toTask(
			A2(
				lukewestby$elm_http_builder$HttpBuilder$withExpect,
				elm$http$Http$expectJson(
					elm$json$Json$Decode$maybe(author$project$Backend$decodeMe)),
				lukewestby$elm_http_builder$HttpBuilder$get('/me'))));
};
var author$project$Drag$NotDragging = {$: 0};
var author$project$Drag$init = author$project$Drag$NotDragging;
var author$project$Main$DataFetched = function (a) {
	return {$: 14, a: a};
};
var author$project$Main$GlobalGraphPage = {$: 1};
var author$project$Main$ImpactSort = {$: 0};
var author$project$Main$MeFetched = function (a) {
	return {$: 13, a: a};
};
var lukewestby$elm_http_builder$HttpBuilder$withTimeout = F2(
	function (timeout, builder) {
		return _Utils_update(
			builder,
			{
				h1: elm$core$Maybe$Just(timeout)
			});
	});
var author$project$Backend$pollData = function (f) {
	return A2(
		elm$core$Task$attempt,
		f,
		lukewestby$elm_http_builder$HttpBuilder$toTask(
			A2(
				lukewestby$elm_http_builder$HttpBuilder$withTimeout,
				60 * 1000,
				A2(
					lukewestby$elm_http_builder$HttpBuilder$withExpect,
					author$project$Backend$expectJsonWithIndex(author$project$Backend$decodeData),
					lukewestby$elm_http_builder$HttpBuilder$get('/poll')))));
};
var author$project$Backend$refreshCards = F2(
	function (col, f) {
		return A2(
			elm$core$Task$attempt,
			f,
			lukewestby$elm_http_builder$HttpBuilder$toTask(
				A2(
					lukewestby$elm_http_builder$HttpBuilder$withExpect,
					author$project$Backend$expectJsonWithIndex(author$project$Backend$decodeCards),
					lukewestby$elm_http_builder$HttpBuilder$get('/refresh?columnCards=' + col))));
	});
var author$project$Backend$refreshIssue = F2(
	function (id, f) {
		return A2(
			elm$core$Task$attempt,
			f,
			lukewestby$elm_http_builder$HttpBuilder$toTask(
				A2(
					lukewestby$elm_http_builder$HttpBuilder$withExpect,
					author$project$Backend$expectJsonWithIndex(author$project$GitHubGraph$decodeIssue),
					lukewestby$elm_http_builder$HttpBuilder$get('/refresh?issue=' + id))));
	});
var author$project$Backend$refreshPR = F2(
	function (id, f) {
		return A2(
			elm$core$Task$attempt,
			f,
			lukewestby$elm_http_builder$HttpBuilder$toTask(
				A2(
					lukewestby$elm_http_builder$HttpBuilder$withExpect,
					author$project$Backend$expectJsonWithIndex(author$project$GitHubGraph$decodePullRequest),
					lukewestby$elm_http_builder$HttpBuilder$get('/refresh?pr=' + id))));
	});
var author$project$Backend$refreshRepo = F2(
	function (repo, f) {
		return A2(
			elm$core$Task$attempt,
			f,
			lukewestby$elm_http_builder$HttpBuilder$toTask(
				A2(
					lukewestby$elm_http_builder$HttpBuilder$withExpect,
					author$project$Backend$expectJsonWithIndex(author$project$GitHubGraph$decodeRepo),
					lukewestby$elm_http_builder$HttpBuilder$get('/refresh?repo=' + (repo.hN + ('/' + repo.ht))))));
	});
var author$project$Drag$complete = function (mode) {
	return author$project$Drag$NotDragging;
};
var author$project$Drag$Dropped = function (a) {
	return {$: 3, a: a};
};
var author$project$Drag$drop = function (model) {
	if (model.$ === 2) {
		var state = model.a;
		return author$project$Drag$Dropped(state);
	} else {
		return model;
	}
};
var author$project$Drag$land = function (model) {
	if (model.$ === 3) {
		var state = model.a;
		return author$project$Drag$Dropped(
			_Utils_update(
				state,
				{b_: true}));
	} else {
		return model;
	}
};
var author$project$Drag$Dragging = function (a) {
	return {$: 1, a: a};
};
var author$project$Drag$Dropping = function (a) {
	return {$: 2, a: a};
};
var author$project$Drag$update = F2(
	function (msg, model) {
		switch (model.$) {
			case 0:
				if (!msg.$) {
					var source = msg.a;
					var startState = msg.b;
					return author$project$Drag$Dragging(
						{bR: elm$core$Maybe$Nothing, b1: true, aD: source, aE: startState});
				} else {
					return author$project$Drag$NotDragging;
				}
			case 1:
				var drag = model.a;
				switch (msg.$) {
					case 0:
						return model;
					case 1:
						var candidate = msg.a;
						return author$project$Drag$Dragging(
							_Utils_update(
								drag,
								{bR: candidate, b1: false}));
					default:
						var _n3 = drag.bR;
						if (_n3.$ === 1) {
							return author$project$Drag$NotDragging;
						} else {
							var target = _n3.a.av;
							var msgFunc = _n3.a.fQ;
							return author$project$Drag$Dropping(
								{
									b_: false,
									fP: A2(msgFunc, drag.aD, target),
									aD: drag.aD,
									aE: drag.aE,
									av: target
								});
						}
				}
			case 2:
				return model;
			default:
				return model;
		}
	});
var gampleman$elm_visualization$Force$isCompleted = function (_n0) {
	var alpha = _n0.a9;
	var minAlpha = _n0.dS;
	return _Utils_cmp(alpha, minAlpha) < 1;
};
var author$project$ForceGraph$isCompleted = A2(
	elm$core$Basics$composeR,
	function ($) {
		return $.ca;
	},
	gampleman$elm_visualization$Force$isCompleted);
var author$project$ForceGraph$updateContextWithValue = F2(
	function (nc, value) {
		var ncnode = nc.aU;
		var label = ncnode.ar;
		return _Utils_update(
			nc,
			{
				aU: _Utils_update(
					ncnode,
					{ar: value})
			});
	});
var elm$core$Maybe$map = F2(
	function (f, maybe) {
		if (!maybe.$) {
			var value = maybe.a;
			return elm$core$Maybe$Just(
				f(value));
		} else {
			return elm$core$Maybe$Nothing;
		}
	});
var elm_community$graph$Graph$Graph = elm$core$Basics$identity;
var elm_community$intdict$IntDict$foldl = F3(
	function (f, acc, dict) {
		foldl:
		while (true) {
			switch (dict.$) {
				case 0:
					return acc;
				case 1:
					var l = dict.a;
					return A3(f, l.dH, l.ew, acc);
				default:
					var i = dict.a;
					var $temp$f = f,
						$temp$acc = A3(elm_community$intdict$IntDict$foldl, f, acc, i.fE),
						$temp$dict = i.d;
					f = $temp$f;
					acc = $temp$acc;
					dict = $temp$dict;
					continue foldl;
			}
		}
	});
var elm_community$intdict$IntDict$Empty = {$: 0};
var elm_community$intdict$IntDict$empty = elm_community$intdict$IntDict$Empty;
var elm_community$intdict$IntDict$Inner = function (a) {
	return {$: 2, a: a};
};
var elm_community$intdict$IntDict$size = function (dict) {
	switch (dict.$) {
		case 0:
			return 0;
		case 1:
			return 1;
		default:
			var i = dict.a;
			return i.cZ;
	}
};
var elm_community$intdict$IntDict$inner = F3(
	function (p, l, r) {
		var _n0 = _Utils_Tuple2(l, r);
		if (!_n0.a.$) {
			var _n1 = _n0.a;
			return r;
		} else {
			if (!_n0.b.$) {
				var _n2 = _n0.b;
				return l;
			} else {
				return elm_community$intdict$IntDict$Inner(
					{
						fE: l,
						f: p,
						d: r,
						cZ: elm_community$intdict$IntDict$size(l) + elm_community$intdict$IntDict$size(r)
					});
			}
		}
	});
var elm$core$Bitwise$and = _Bitwise_and;
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
			elm$core$Bitwise$and(p.ba),
			elm$core$Basics$neq(0)));
};
var elm_community$intdict$IntDict$higherBitMask = function (branchingBit) {
	return branchingBit ^ (~(branchingBit - 1));
};
var elm_community$intdict$IntDict$lcp = F2(
	function (x, y) {
		var branchingBit = elm_community$intdict$IntDict$highestBitSet(x ^ y);
		var mask = elm_community$intdict$IntDict$higherBitMask(branchingBit);
		var prefixBits = x & mask;
		return {ba: branchingBit, at: prefixBits};
	});
var elm_community$intdict$IntDict$Leaf = function (a) {
	return {$: 1, a: a};
};
var elm_community$intdict$IntDict$leaf = F2(
	function (k, v) {
		return elm_community$intdict$IntDict$Leaf(
			{dH: k, ew: v});
	});
var elm_community$intdict$IntDict$prefixMatches = F2(
	function (p, n) {
		return _Utils_eq(
			n & elm_community$intdict$IntDict$higherBitMask(p.ba),
			p.at);
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
			if (!_n1.$) {
				var v = _n1.a;
				return A2(elm_community$intdict$IntDict$leaf, key, v);
			} else {
				return elm_community$intdict$IntDict$empty;
			}
		};
		switch (dict.$) {
			case 0:
				return alteredNode(elm$core$Maybe$Nothing);
			case 1:
				var l = dict.a;
				return _Utils_eq(l.dH, key) ? alteredNode(
					elm$core$Maybe$Just(l.ew)) : A2(
					join,
					_Utils_Tuple2(
						key,
						alteredNode(elm$core$Maybe$Nothing)),
					_Utils_Tuple2(l.dH, dict));
			default:
				var i = dict.a;
				return A2(elm_community$intdict$IntDict$prefixMatches, i.f, key) ? (A2(elm_community$intdict$IntDict$isBranchingBitSet, i.f, key) ? A3(
					elm_community$intdict$IntDict$inner,
					i.f,
					i.fE,
					A3(elm_community$intdict$IntDict$update, key, alter, i.d)) : A3(
					elm_community$intdict$IntDict$inner,
					i.f,
					A3(elm_community$intdict$IntDict$update, key, alter, i.fE),
					i.d)) : A2(
					join,
					_Utils_Tuple2(
						key,
						alteredNode(elm$core$Maybe$Nothing)),
					_Utils_Tuple2(i.f.at, dict));
		}
	});
var elm_community$graph$Graph$applyEdgeDiff = F3(
	function (nodeId, diff, graphRep) {
		var updateOutgoingEdge = F2(
			function (upd, node) {
				return _Utils_update(
					node,
					{
						fT: A3(elm_community$intdict$IntDict$update, nodeId, upd, node.fT)
					});
			});
		var updateIncomingEdge = F2(
			function (upd, node) {
				return _Utils_update(
					node,
					{
						fv: A3(elm_community$intdict$IntDict$update, nodeId, upd, node.fv)
					});
			});
		var flippedFoldl = F3(
			function (f, dict, acc) {
				return A3(elm_community$intdict$IntDict$foldl, f, acc, dict);
			});
		var edgeUpdateToMaybe = function (edgeUpdate) {
			if (!edgeUpdate.$) {
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
			diff.fT,
			A3(
				flippedFoldl,
				updateAdjacency(updateIncomingEdge),
				diff.fv,
				graphRep));
	});
var elm_community$graph$Graph$Insert = function (a) {
	return {$: 0, a: a};
};
var elm_community$graph$Graph$Remove = function (a) {
	return {$: 1, a: a};
};
var elm_community$graph$Graph$crashHack = function (msg) {
	crashHack:
	while (true) {
		var $temp$msg = msg;
		msg = $temp$msg;
		continue crashHack;
	}
};
var elm_community$graph$Graph$emptyDiff = {fv: elm_community$intdict$IntDict$empty, fT: elm_community$intdict$IntDict$empty};
var elm_community$graph$Graph$computeEdgeDiff = F2(
	function (old, _new) {
		var collectUpdates = F3(
			function (edgeUpdate, updatedId, label) {
				var replaceUpdate = function (old_) {
					var _n5 = _Utils_Tuple2(
						old_,
						edgeUpdate(label));
					if (!_n5.a.$) {
						if (_n5.a.a.$ === 1) {
							if (!_n5.b.$) {
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
		if (_n0.a.$ === 1) {
			if (_n0.b.$ === 1) {
				var _n1 = _n0.a;
				var _n2 = _n0.b;
				return elm_community$graph$Graph$emptyDiff;
			} else {
				var _n4 = _n0.a;
				var ins = _n0.b.a;
				return {
					fv: A3(collect, elm_community$graph$Graph$Insert, ins.fT, elm_community$intdict$IntDict$empty),
					fT: A3(collect, elm_community$graph$Graph$Insert, ins.fv, elm_community$intdict$IntDict$empty)
				};
			}
		} else {
			if (_n0.b.$ === 1) {
				var rem = _n0.a.a;
				var _n3 = _n0.b;
				return {
					fv: A3(collect, elm_community$graph$Graph$Remove, rem.fT, elm_community$intdict$IntDict$empty),
					fT: A3(collect, elm_community$graph$Graph$Remove, rem.fv, elm_community$intdict$IntDict$empty)
				};
			} else {
				var rem = _n0.a.a;
				var ins = _n0.b.a;
				return _Utils_eq(rem, ins) ? elm_community$graph$Graph$emptyDiff : {
					fv: A3(
						collect,
						elm_community$graph$Graph$Insert,
						ins.fT,
						A3(collect, elm_community$graph$Graph$Remove, rem.fT, elm_community$intdict$IntDict$empty)),
					fT: A3(
						collect,
						elm_community$graph$Graph$Insert,
						ins.fv,
						A3(collect, elm_community$graph$Graph$Remove, rem.fv, elm_community$intdict$IntDict$empty))
				};
			}
		}
	});
var elm_community$graph$Graph$unGraph = function (graph) {
	var rep = graph;
	return rep;
};
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
var elm_community$intdict$IntDict$get = F2(
	function (key, dict) {
		get:
		while (true) {
			switch (dict.$) {
				case 0:
					return elm$core$Maybe$Nothing;
				case 1:
					var l = dict.a;
					return _Utils_eq(l.dH, key) ? elm$core$Maybe$Just(l.ew) : elm$core$Maybe$Nothing;
				default:
					var i = dict.a;
					if (!A2(elm_community$intdict$IntDict$prefixMatches, i.f, key)) {
						return elm$core$Maybe$Nothing;
					} else {
						if (A2(elm_community$intdict$IntDict$isBranchingBitSet, i.f, key)) {
							var $temp$key = key,
								$temp$dict = i.d;
							key = $temp$key;
							dict = $temp$dict;
							continue get;
						} else {
							var $temp$key = key,
								$temp$dict = i.fE;
							key = $temp$key;
							dict = $temp$dict;
							continue get;
						}
					}
			}
		}
	});
var elm_community$intdict$IntDict$member = F2(
	function (key, dict) {
		var _n0 = A2(elm_community$intdict$IntDict$get, key, dict);
		if (!_n0.$) {
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
							return _Utils_eq(id, ctx.aU.fu) || A2(elm_community$intdict$IntDict$member, id, rep);
						}));
			};
			var cleanUpEdges = function (ctx) {
				return _Utils_update(
					ctx,
					{
						fv: A2(filterInvalidEdges, ctx, ctx.fv),
						fT: A2(filterInvalidEdges, ctx, ctx.fT)
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
			A2(elm$core$Basics$composeR, wrappedUpdater, elm$core$Basics$identity));
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
				ncnode.fu,
				graphUpdater(ncnode));
		});
}();
var elm_community$intdict$IntDict$foldr = F3(
	function (f, acc, dict) {
		foldr:
		while (true) {
			switch (dict.$) {
				case 0:
					return acc;
				case 1:
					var l = dict.a;
					return A3(f, l.dH, l.ew, acc);
				default:
					var i = dict.a;
					var $temp$f = f,
						$temp$acc = A3(elm_community$intdict$IntDict$foldr, f, acc, i.d),
						$temp$dict = i.fE;
					f = $temp$f;
					acc = $temp$acc;
					dict = $temp$dict;
					continue foldr;
			}
		}
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
				return $.aU;
			})));
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
var gampleman$elm_visualization$Force$State = elm$core$Basics$identity;
var elm$core$Basics$pow = _Basics_pow;
var elm$core$Basics$sqrt = _Basics_sqrt;
var elm$core$Dict$map = F2(
	function (func, dict) {
		if (dict.$ === -2) {
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
			if (dict.$ === -2) {
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
var elm$core$Maybe$withDefault = F2(
	function (_default, maybe) {
		if (!maybe.$) {
			var value = maybe.a;
			return value;
		} else {
			return _default;
		}
	});
var elm$core$Basics$isNaN = _Basics_isNaN;
var ianmackenzie$elm_geometry$BoundingBox2d$maxX = function (_n0) {
	var boundingBox = _n0;
	return boundingBox.bl;
};
var ianmackenzie$elm_geometry$BoundingBox2d$maxY = function (_n0) {
	var boundingBox = _n0;
	return boundingBox.bm;
};
var ianmackenzie$elm_geometry$BoundingBox2d$minX = function (_n0) {
	var boundingBox = _n0;
	return boundingBox.bn;
};
var ianmackenzie$elm_geometry$BoundingBox2d$minY = function (_n0) {
	var boundingBox = _n0;
	return boundingBox.bo;
};
var ianmackenzie$elm_geometry$BoundingBox2d$dimensions = function (boundingBox) {
	return _Utils_Tuple2(
		ianmackenzie$elm_geometry$BoundingBox2d$maxX(boundingBox) - ianmackenzie$elm_geometry$BoundingBox2d$minX(boundingBox),
		ianmackenzie$elm_geometry$BoundingBox2d$maxY(boundingBox) - ianmackenzie$elm_geometry$BoundingBox2d$minY(boundingBox));
};
var ianmackenzie$elm_geometry$Bootstrap$Point2d$coordinates = function (_n0) {
	var coordinates_ = _n0;
	return coordinates_;
};
var ianmackenzie$elm_geometry$Geometry$Types$Vector2d = elm$core$Basics$identity;
var ianmackenzie$elm_geometry$Vector2d$fromComponents = elm$core$Basics$identity;
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
	var components_ = _n0;
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
			var distance = A2(ianmackenzie$elm_geometry$Point2d$distanceFrom, vertex.hO, treePart.eK.hO);
			var _n2 = ianmackenzie$elm_geometry$BoundingBox2d$dimensions(treePart.gN);
			var width = _n2.a;
			return _Utils_cmp(width / distance, theta) < 0;
		};
		var calculateVelocity = F2(
			function (target, source) {
				var delta = A2(ianmackenzie$elm_geometry$Vector2d$from, target.hO, source.hO);
				var weight = (source.hW * alpha) / ianmackenzie$elm_geometry$Vector2d$squaredLength(delta);
				return elm$core$Basics$isNaN(weight) ? ianmackenzie$elm_geometry$Vector2d$zero : A2(ianmackenzie$elm_geometry$Vector2d$scaleBy, weight, delta);
			});
		var useAggregate = function (treePart) {
			return A2(calculateVelocity, vertex, treePart.eK);
		};
		switch (qtree.$) {
			case 0:
				return ianmackenzie$elm_geometry$Vector2d$zero;
			case 1:
				var leaf = qtree.a;
				if (isFarAway(leaf)) {
					return useAggregate(leaf);
				} else {
					var applyForceFromPoint = F2(
						function (point, accum) {
							return _Utils_eq(point.dH, vertex.dH) ? accum : A2(
								ianmackenzie$elm_geometry$Vector2d$sum,
								A2(calculateVelocity, vertex, point),
								accum);
						});
					var _n1 = leaf.gT;
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
						helper(node.hZ),
						A2(
							ianmackenzie$elm_geometry$Vector2d$sum,
							helper(node.hU),
							A2(
								ianmackenzie$elm_geometry$Vector2d$sum,
								helper(node.hv),
								helper(node.hG))));
				}
		}
	});
var ianmackenzie$elm_geometry$Point2d$coordinates = function (_n0) {
	var coordinates_ = _n0;
	return coordinates_;
};
var ianmackenzie$elm_geometry$Geometry$Types$Point2d = elm$core$Basics$identity;
var ianmackenzie$elm_geometry$Point2d$fromCoordinates = elm$core$Basics$identity;
var gampleman$elm_visualization$Force$ManyBody$constructSuperPoint = F2(
	function (first, rest) {
		var initialStrength = first.hW;
		var initialPoint = ianmackenzie$elm_geometry$Point2d$coordinates(first.hO);
		var folder = F2(
			function (point, _n3) {
				var _n4 = _n3.a;
				var accumX = _n4.a;
				var accumY = _n4.b;
				var strength = _n3.b;
				var size = _n3.c;
				var _n2 = ianmackenzie$elm_geometry$Point2d$coordinates(point.hO);
				var x = _n2.a;
				var y = _n2.b;
				return _Utils_Tuple3(
					_Utils_Tuple2(accumX + x, accumY + y),
					strength + point.hW,
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
			hO: ianmackenzie$elm_geometry$Point2d$fromCoordinates(
				_Utils_Tuple2(totalX / totalSize, totalY / totalSize)),
			hW: totalStrength
		};
	});
var gampleman$elm_visualization$Force$ManyBody$config = {
	gV: gampleman$elm_visualization$Force$ManyBody$constructSuperPoint,
	gW: gampleman$elm_visualization$Force$ManyBody$constructSuperPoint,
	h6: function ($) {
		return $.hO;
	}
};
var gampleman$elm_visualization$Force$QuadTree$Empty = {$: 0};
var gampleman$elm_visualization$Force$QuadTree$empty = gampleman$elm_visualization$Force$QuadTree$Empty;
var elm$core$Basics$ge = _Utils_ge;
var gampleman$elm_visualization$Force$QuadTree$Leaf = function (a) {
	return {$: 1, a: a};
};
var gampleman$elm_visualization$Force$QuadTree$Node = function (a) {
	return {$: 2, a: a};
};
var gampleman$elm_visualization$Force$QuadTree$NE = 0;
var gampleman$elm_visualization$Force$QuadTree$NW = 1;
var gampleman$elm_visualization$Force$QuadTree$SE = 2;
var gampleman$elm_visualization$Force$QuadTree$SW = 3;
var ianmackenzie$elm_geometry$BoundingBox2d$midX = function (_n0) {
	var boundingBox = _n0;
	return boundingBox.bn + (0.5 * (boundingBox.bl - boundingBox.bn));
};
var ianmackenzie$elm_geometry$BoundingBox2d$midY = function (_n0) {
	var boundingBox = _n0;
	return boundingBox.bo + (0.5 * (boundingBox.bm - boundingBox.bo));
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
	var extrema_ = _n0;
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
		var minX = _n2.bn;
		var minY = _n2.bo;
		var maxX = _n2.bl;
		var maxY = _n2.bm;
		return (_Utils_cmp(y, midY) > -1) ? ((_Utils_cmp(x, midX) > -1) ? 0 : 1) : ((_Utils_cmp(x, midX) > -1) ? 2 : 3);
	});
var elm$core$Basics$min = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) < 0) ? x : y;
	});
var ianmackenzie$elm_geometry$Geometry$Types$BoundingBox2d = elm$core$Basics$identity;
var ianmackenzie$elm_geometry$BoundingBox2d$fromExtrema = function (extrema_) {
	return ((_Utils_cmp(extrema_.bn, extrema_.bl) < 1) && (_Utils_cmp(extrema_.bo, extrema_.bm) < 1)) ? extrema_ : {
		bl: A2(elm$core$Basics$max, extrema_.bn, extrema_.bl),
		bm: A2(elm$core$Basics$max, extrema_.bo, extrema_.bm),
		bn: A2(elm$core$Basics$min, extrema_.bn, extrema_.bl),
		bo: A2(elm$core$Basics$min, extrema_.bo, extrema_.bm)
	};
};
var ianmackenzie$elm_geometry$BoundingBox2d$singleton = function (point) {
	var _n0 = ianmackenzie$elm_geometry$Point2d$coordinates(point);
	var x = _n0.a;
	var y = _n0.b;
	return ianmackenzie$elm_geometry$BoundingBox2d$fromExtrema(
		{bl: x, bm: y, bn: x, bo: y});
};
var gampleman$elm_visualization$Force$QuadTree$singleton = F2(
	function (toPoint, vertex) {
		return gampleman$elm_visualization$Force$QuadTree$Leaf(
			{
				eK: 0,
				gN: ianmackenzie$elm_geometry$BoundingBox2d$singleton(
					toPoint(vertex)),
				gT: _Utils_Tuple2(vertex, _List_Nil)
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
				bl: A2(
					elm$core$Basics$max,
					ianmackenzie$elm_geometry$BoundingBox2d$maxX(firstBox),
					ianmackenzie$elm_geometry$BoundingBox2d$maxX(secondBox)),
				bm: A2(
					elm$core$Basics$max,
					ianmackenzie$elm_geometry$BoundingBox2d$maxY(firstBox),
					ianmackenzie$elm_geometry$BoundingBox2d$maxY(secondBox)),
				bn: A2(
					elm$core$Basics$min,
					ianmackenzie$elm_geometry$BoundingBox2d$minX(firstBox),
					ianmackenzie$elm_geometry$BoundingBox2d$minX(secondBox)),
				bo: A2(
					elm$core$Basics$min,
					ianmackenzie$elm_geometry$BoundingBox2d$minY(firstBox),
					ianmackenzie$elm_geometry$BoundingBox2d$minY(secondBox))
			});
	});
var gampleman$elm_visualization$Force$QuadTree$insertBy = F3(
	function (toPoint, vertex, qtree) {
		switch (qtree.$) {
			case 0:
				return gampleman$elm_visualization$Force$QuadTree$Leaf(
					{
						eK: 0,
						gN: ianmackenzie$elm_geometry$BoundingBox2d$singleton(
							toPoint(vertex)),
						gT: _Utils_Tuple2(vertex, _List_Nil)
					});
			case 1:
				var leaf = qtree.a;
				var maxSize = 32;
				var _n1 = leaf.gT;
				var first = _n1.a;
				var rest = _n1.b;
				var newSize = 2 + elm$core$List$length(rest);
				if (_Utils_cmp(newSize, maxSize) > -1) {
					var initial = gampleman$elm_visualization$Force$QuadTree$Node(
						{
							eK: 0,
							gN: A2(
								ianmackenzie$elm_geometry$BoundingBox2d$hull,
								leaf.gN,
								ianmackenzie$elm_geometry$BoundingBox2d$singleton(
									toPoint(vertex))),
							hv: gampleman$elm_visualization$Force$QuadTree$Empty,
							hG: gampleman$elm_visualization$Force$QuadTree$Empty,
							hU: gampleman$elm_visualization$Force$QuadTree$Empty,
							hZ: gampleman$elm_visualization$Force$QuadTree$Empty
						});
					return A3(
						elm$core$List$foldl,
						gampleman$elm_visualization$Force$QuadTree$insertBy(toPoint),
						initial,
						A2(elm$core$List$cons, first, rest));
				} else {
					return gampleman$elm_visualization$Force$QuadTree$Leaf(
						{
							eK: 0,
							gN: A2(
								ianmackenzie$elm_geometry$BoundingBox2d$hull,
								leaf.gN,
								ianmackenzie$elm_geometry$BoundingBox2d$singleton(
									toPoint(vertex))),
							gT: _Utils_Tuple2(
								vertex,
								A2(elm$core$List$cons, first, rest))
						});
				}
			default:
				var node = qtree.a;
				var point = toPoint(vertex);
				if (A2(ianmackenzie$elm_geometry$BoundingBox2d$contains, point, node.gN)) {
					var _n2 = A2(gampleman$elm_visualization$Force$QuadTree$quadrant, node.gN, point);
					switch (_n2) {
						case 0:
							return gampleman$elm_visualization$Force$QuadTree$Node(
								_Utils_update(
									node,
									{
										hv: A3(gampleman$elm_visualization$Force$QuadTree$insertBy, toPoint, vertex, node.hv)
									}));
						case 2:
							return gampleman$elm_visualization$Force$QuadTree$Node(
								_Utils_update(
									node,
									{
										hU: A3(gampleman$elm_visualization$Force$QuadTree$insertBy, toPoint, vertex, node.hU)
									}));
						case 1:
							return gampleman$elm_visualization$Force$QuadTree$Node(
								_Utils_update(
									node,
									{
										hG: A3(gampleman$elm_visualization$Force$QuadTree$insertBy, toPoint, vertex, node.hG)
									}));
						default:
							return gampleman$elm_visualization$Force$QuadTree$Node(
								_Utils_update(
									node,
									{
										hZ: A3(gampleman$elm_visualization$Force$QuadTree$insertBy, toPoint, vertex, node.hZ)
									}));
					}
				} else {
					var _n3 = ianmackenzie$elm_geometry$BoundingBox2d$extrema(node.gN);
					var minX = _n3.bn;
					var minY = _n3.bo;
					var maxX = _n3.bl;
					var maxY = _n3.bm;
					var _n4 = ianmackenzie$elm_geometry$BoundingBox2d$dimensions(node.gN);
					var width = _n4.a;
					var height = _n4.b;
					var _n5 = A2(gampleman$elm_visualization$Force$QuadTree$quadrant, node.gN, point);
					switch (_n5) {
						case 0:
							return gampleman$elm_visualization$Force$QuadTree$Node(
								{
									eK: 0,
									gN: ianmackenzie$elm_geometry$BoundingBox2d$fromExtrema(
										{bl: maxX + width, bm: maxY + height, bn: minX, bo: minY}),
									hv: A2(gampleman$elm_visualization$Force$QuadTree$singleton, toPoint, vertex),
									hG: gampleman$elm_visualization$Force$QuadTree$Empty,
									hU: gampleman$elm_visualization$Force$QuadTree$Empty,
									hZ: qtree
								});
						case 2:
							return gampleman$elm_visualization$Force$QuadTree$Node(
								{
									eK: 0,
									gN: ianmackenzie$elm_geometry$BoundingBox2d$fromExtrema(
										{bl: maxX + width, bm: maxY, bn: minX, bo: minY - height}),
									hv: gampleman$elm_visualization$Force$QuadTree$Empty,
									hG: qtree,
									hU: A2(gampleman$elm_visualization$Force$QuadTree$singleton, toPoint, vertex),
									hZ: gampleman$elm_visualization$Force$QuadTree$Empty
								});
						case 1:
							return gampleman$elm_visualization$Force$QuadTree$Node(
								{
									eK: 0,
									gN: ianmackenzie$elm_geometry$BoundingBox2d$fromExtrema(
										{bl: maxX, bm: maxY + height, bn: minX - width, bo: minY}),
									hv: gampleman$elm_visualization$Force$QuadTree$Empty,
									hG: A2(gampleman$elm_visualization$Force$QuadTree$singleton, toPoint, vertex),
									hU: qtree,
									hZ: gampleman$elm_visualization$Force$QuadTree$Empty
								});
						default:
							return gampleman$elm_visualization$Force$QuadTree$Node(
								{
									eK: 0,
									gN: ianmackenzie$elm_geometry$BoundingBox2d$fromExtrema(
										{bl: maxX, bm: maxY, bn: minX - width, bo: minY - height}),
									hv: qtree,
									hG: gampleman$elm_visualization$Force$QuadTree$Empty,
									hU: gampleman$elm_visualization$Force$QuadTree$Empty,
									hZ: A2(gampleman$elm_visualization$Force$QuadTree$singleton, toPoint, vertex)
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
		if (!_n0.$) {
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
		case 0:
			return elm$core$Maybe$Nothing;
		case 1:
			var aggregate = qtree.a.eK;
			return elm$core$Maybe$Just(aggregate);
		default:
			var aggregate = qtree.a.eK;
			return elm$core$Maybe$Just(aggregate);
	}
};
var gampleman$elm_visualization$Force$QuadTree$performAggregate = F2(
	function (config, vanillaQuadTree) {
		var combineAggregates = config.gV;
		var combineVertices = config.gW;
		switch (vanillaQuadTree.$) {
			case 0:
				return gampleman$elm_visualization$Force$QuadTree$Empty;
			case 1:
				var leaf = vanillaQuadTree.a;
				var _n1 = leaf.gT;
				var first = _n1.a;
				var rest = _n1.b;
				return gampleman$elm_visualization$Force$QuadTree$Leaf(
					{
						eK: A2(combineVertices, first, rest),
						gN: leaf.gN,
						gT: _Utils_Tuple2(first, rest)
					});
			default:
				var node = vanillaQuadTree.a;
				var newSw = A2(gampleman$elm_visualization$Force$QuadTree$performAggregate, config, node.hZ);
				var newSe = A2(gampleman$elm_visualization$Force$QuadTree$performAggregate, config, node.hU);
				var newNw = A2(gampleman$elm_visualization$Force$QuadTree$performAggregate, config, node.hG);
				var newNe = A2(gampleman$elm_visualization$Force$QuadTree$performAggregate, config, node.hv);
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
							eK: A2(combineAggregates, x, xs),
							gN: node.gN,
							hv: newNe,
							hG: newNw,
							hU: newSe,
							hZ: newSw
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
					return $.hO;
				},
				vertices));
		var updateVertex = function (vertex) {
			return _Utils_update(
				vertex,
				{
					cn: A2(
						ianmackenzie$elm_geometry$Vector2d$sum,
						vertex.cn,
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
				var x = point.ij;
				var y = point.im;
				var strength = A2(
					elm$core$Maybe$withDefault,
					0,
					A2(elm$core$Dict$get, key, strengths));
				return {
					dH: key,
					hO: ianmackenzie$elm_geometry$Point2d$fromCoordinates(
						_Utils_Tuple2(x, y)),
					hW: strength,
					cn: ianmackenzie$elm_geometry$Vector2d$zero
				};
			},
			elm$core$Dict$toList(points));
		var updater = F2(
			function (newVertex, maybePoint) {
				if (maybePoint.$ === 1) {
					return elm$core$Maybe$Nothing;
				} else {
					var point = maybePoint.a;
					var _n1 = ianmackenzie$elm_geometry$Vector2d$components(newVertex.cn);
					var dvx = _n1.a;
					var dvy = _n1.b;
					return elm$core$Maybe$Just(
						_Utils_update(
							point,
							{ie: point.ie + dvx, $8: point.$8 + dvy}));
				}
			});
		var newVertices = A3(gampleman$elm_visualization$Force$ManyBody$manyBody, alpha, theta, vertices);
		var folder = F2(
			function (newVertex, pointsDict) {
				return A3(
					elm$core$Dict$update,
					newVertex.dH,
					updater(newVertex),
					pointsDict);
			});
		return A3(elm$core$List$foldl, folder, points, newVertices);
	});
var gampleman$elm_visualization$Force$applyForce = F3(
	function (alpha, force, entities) {
		switch (force.$) {
			case 0:
				var x = force.a;
				var y = force.b;
				var n = elm$core$Dict$size(entities);
				var _n1 = A3(
					elm$core$Dict$foldr,
					F3(
						function (_n2, ent, _n3) {
							var sx0 = _n3.a;
							var sy0 = _n3.b;
							return _Utils_Tuple2(sx0 + ent.ij, sy0 + ent.im);
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
								{ij: ent.ij - sx, im: ent.im - sy});
						}),
					entities);
			case 1:
				var _float = force.a;
				var collisionParamidDict = force.b;
				return entities;
			case 2:
				var iters = force.a;
				var lnks = force.b;
				return A3(
					elm$core$List$foldl,
					F2(
						function (_n5, ents) {
							var source = _n5.aD;
							var target = _n5.av;
							var distance = _n5.g1;
							var strength = _n5.hW;
							var bias = _n5.dd;
							var _n6 = _Utils_Tuple2(
								A2(elm$core$Dict$get, source, ents),
								A2(elm$core$Dict$get, target, ents));
							if ((!_n6.a.$) && (!_n6.b.$)) {
								var sourceNode = _n6.a.a;
								var targetNode = _n6.b.a;
								var y = ((targetNode.im + targetNode.$8) - sourceNode.im) - sourceNode.$8;
								var x = ((targetNode.ij + targetNode.ie) - sourceNode.ij) - sourceNode.ie;
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
												{ie: tn.ie + ((x * l) * (1 - bias)), $8: tn.$8 + ((y * l) * (1 - bias))});
										}),
									A3(
										elm$core$Dict$update,
										target,
										elm$core$Maybe$map(
											function (sn) {
												return _Utils_update(
													sn,
													{ie: sn.ie - ((x * l) * bias), $8: sn.$8 - ((y * l) * bias)});
											}),
										ents));
							} else {
								var otherwise = _n6;
								return ents;
							}
						}),
					entities,
					lnks);
			case 3:
				var theta = force.a;
				var entityStrengths = force.b;
				return A4(gampleman$elm_visualization$Force$ManyBody$wrapper, alpha, theta, entityStrengths, entities);
			case 4:
				var directionalParamidDict = force.a;
				return entities;
			default:
				var directionalParamidDict = force.a;
				return entities;
		}
	});
var gampleman$elm_visualization$Force$tick = F2(
	function (_n0, nodes) {
		var state = _n0;
		var updateEntity = function (ent) {
			return _Utils_update(
				ent,
				{ie: ent.ie * state.co, $8: ent.$8 * state.co, ij: ent.ij + (ent.ie * state.co), im: ent.im + (ent.$8 * state.co)});
		};
		var dictNodes = A3(
			elm$core$List$foldl,
			function (node) {
				return A2(elm$core$Dict$insert, node.fu, node);
			},
			elm$core$Dict$empty,
			nodes);
		var alpha = state.a9 + ((state.eN - state.a9) * state.c7);
		var newNodes = A3(
			elm$core$List$foldl,
			gampleman$elm_visualization$Force$applyForce(alpha),
			dictNodes,
			state.fm);
		return _Utils_Tuple2(
			_Utils_update(
				state,
				{a9: alpha}),
			A2(
				elm$core$List$map,
				updateEntity,
				elm$core$Dict$values(newNodes)));
	});
var author$project$ForceGraph$tick = function (_n0) {
	var graph = _n0.a0;
	var simulation = _n0.ca;
	var _n1 = A2(
		gampleman$elm_visualization$Force$tick,
		simulation,
		A2(
			elm$core$List$map,
			function ($) {
				return $.ar;
			},
			elm_community$graph$Graph$nodes(graph)));
	var newState = _n1.a;
	var list = _n1.b;
	return {
		a0: A2(author$project$ForceGraph$updateGraphWithList, graph, list),
		ca: newState
	};
};
var author$project$GitHubGraph$IssueCardContent = function (a) {
	return {$: 0, a: a};
};
var author$project$GitHubGraph$PullRequestCardContent = function (a) {
	return {$: 1, a: a};
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
var author$project$Log$debug = F3(
	function (ctx, err, a) {
		return a;
	});
var author$project$Main$AddLabelOperation = 0;
var author$project$Main$CardDropContentRefreshed = function (a) {
	return {$: 9, a: a};
};
var author$project$Main$CardDropSourceRefreshed = function (a) {
	return {$: 10, a: a};
};
var author$project$Main$CardDropTargetRefreshed = function (a) {
	return {$: 11, a: a};
};
var author$project$Main$ExcludeAllFilter = {$: 0};
var author$project$Main$InProjectFilter = function (a) {
	return {$: 1, a: a};
};
var author$project$Main$IssueRefreshed = function (a) {
	return {$: 51, a: a};
};
var author$project$Main$MirrorLabel = function (a) {
	return {$: 24, a: a};
};
var author$project$Main$MirrorMilestone = function (a) {
	return {$: 41, a: a};
};
var author$project$Main$PullRequestRefreshed = function (a) {
	return {$: 53, a: a};
};
var author$project$Main$RepoRefreshed = function (a) {
	return {$: 38, a: a};
};
var author$project$GitHubGraph$ProjectColumnCard = F4(
	function (id, url, content, note) {
		return {cB: content, fu: id, hE: note, ib: url};
	});
var author$project$GitHubGraph$DateType = 0;
var author$project$GitHubGraph$pickEnum2 = F2(
	function (ma, mb) {
		if (!ma.$) {
			var x = ma.a;
			return elm$core$Maybe$Just(x);
		} else {
			return mb;
		}
	});
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$SelectionSpec = F4(
	function (a, b, c, d) {
		return {$: 0, a: a, b: b, c: c, d: d};
	});
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
var jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$SelectionSet = elm$core$Basics$identity;
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$emptySelectionSet = _List_Nil;
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$selectionSetFromSourceType = function (sourceType) {
	if (!sourceType.$) {
		var selectionSet = sourceType.a.I;
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
var jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$VariableDefinition = elm$core$Basics$identity;
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$toDefinitionAST = function (_var) {
	if (!_var.$) {
		var variableName = _var.a;
		var typeRef = _var.b;
		return {e8: elm$core$Maybe$Nothing, ht: variableName, gA: typeRef};
	} else {
		var variableName = _var.a;
		var typeRef = _var.b;
		var defaultValue = _var.d;
		return {
			e8: elm$core$Maybe$Just(defaultValue),
			ht: variableName,
			gA: typeRef
		};
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
	return {$: 0, a: a};
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
			eL: elm$core$Maybe$Nothing,
			ak: jamesmacaulay$elm_graphql$GraphQL$Request$Builder$argumentsAST(_arguments),
			J: _List_Nil,
			ht: name,
			I: jamesmacaulay$elm_graphql$GraphQL$Request$Builder$selectionSetFromSourceType(sourceType)
		};
		return A4(
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$SelectionSpec,
			jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Field(astFieldInfo),
			decoder,
			vars,
			fragments);
	});
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$IntType = 0;
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$SpecifiedType = function (a) {
	return {$: 0, a: a};
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$ValueSpec = F4(
	function (a, b, c, d) {
		return {$: 0, a: a, b: b, c: c, d: d};
	});
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$NonNullFlag = 1;
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$nonNullFlag = 1;
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$primitiveSpec = F2(
	function (coreType, decoder) {
		return A4(
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$ValueSpec,
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$SpecifiedType(
				{ao: coreType, aQ: elm$core$Basics$always, br: jamesmacaulay$elm_graphql$GraphQL$Request$Builder$nonNullFlag, I: jamesmacaulay$elm_graphql$GraphQL$Request$Builder$emptySelectionSet}),
			elm$core$Basics$always(decoder),
			_List_Nil,
			_List_Nil);
	});
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$int = A2(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$primitiveSpec, 0, elm$json$Json$Decode$int);
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$ObjectType = 0;
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$emptyObjectSpecifiedType = jamesmacaulay$elm_graphql$GraphQL$Request$Builder$SpecifiedType(
	{ao: 0, aQ: elm$core$Basics$always, br: jamesmacaulay$elm_graphql$GraphQL$Request$Builder$nonNullFlag, I: jamesmacaulay$elm_graphql$GraphQL$Request$Builder$emptySelectionSet});
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$object = function (ctr) {
	return A4(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$ValueSpec,
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$emptyObjectSpecifiedType,
		elm$core$Basics$always(
			elm$json$Json$Decode$succeed(ctr)),
		_List_Nil,
		_List_Nil);
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$StringType = 0;
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string = A2(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$primitiveSpec, 0, elm$json$Json$Decode$string);
var jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Util$responseKey = function (fieldInfo) {
	var _n0 = fieldInfo.eL;
	if (_n0.$ === 1) {
		return fieldInfo.ht;
	} else {
		var alias = _n0.a;
		return alias;
	}
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$selectionDecoder = F2(
	function (selectionAST, decoder) {
		if (!selectionAST.$) {
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
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$extract = function (_n0) {
	var selectionAST = _n0.a;
	var decoder = _n0.b;
	var vars = _n0.c;
	var fragments = _n0.d;
	return A4(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$ValueSpec,
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$SpecifiedType(
			{
				ao: 0,
				aQ: elm$core$Basics$always,
				br: jamesmacaulay$elm_graphql$GraphQL$Request$Builder$nonNullFlag,
				I: _List_fromArray(
					[selectionAST])
			}),
		A2(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$selectionDecoder, selectionAST, decoder),
		vars,
		fragments);
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$mergeSelectionSets = F2(
	function (_n0, _n1) {
		var selectionsA = _n0;
		var selectionsB = _n1;
		return _Utils_ap(selectionsA, selectionsB);
	});
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$join = F2(
	function (a, b) {
		var _n0 = _Utils_Tuple2(a, b);
		if (!_n0.a.$) {
			if (!_n0.b.$) {
				var typeInfoA = _n0.a.a;
				var typeInfoB = _n0.b.a;
				return jamesmacaulay$elm_graphql$GraphQL$Request$Builder$SpecifiedType(
					_Utils_update(
						typeInfoA,
						{
							ao: A2(typeInfoA.aQ, typeInfoA.ao, typeInfoB.ao),
							I: A2(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$mergeSelectionSets, typeInfoA.I, typeInfoB.I)
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
var jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$InlineFragment = function (a) {
	return {$: 2, a: a};
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$inlineFragment = F2(
	function (maybeTypeCondition, spec) {
		var _n0 = spec;
		var sourceType = _n0.a;
		var decoder = _n0.b;
		var vars = _n0.c;
		var fragments = _n0.d;
		var astInlineFragmentInfo = {
			J: _List_Nil,
			I: jamesmacaulay$elm_graphql$GraphQL$Request$Builder$selectionSetFromSourceType(sourceType),
			c4: maybeTypeCondition
		};
		return A4(
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$SelectionSpec,
			jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$InlineFragment(astInlineFragmentInfo),
			A2(elm$core$Basics$composeL, elm$json$Json$Decode$maybe, decoder),
			vars,
			fragments);
	});
var jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$TypeCondition = elm$core$Basics$identity;
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$onType = elm$core$Basics$identity;
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
var elm$json$Json$Encode$string = _Json_wrap;
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$EnumType = elm$core$Basics$identity;
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
			if (!_n0.$) {
				var value = _n0.a;
				return elm$json$Json$Decode$succeed(value);
			} else {
				return fallbackDecoder(enumString);
			}
		};
		return decoder;
	});
var elm$core$Set$Set_elm_builtin = elm$core$Basics$identity;
var elm$core$Set$empty = elm$core$Dict$empty;
var elm$core$Set$insert = F2(
	function (key, _n0) {
		var dict = _n0;
		return A3(elm$core$Dict$insert, key, 0, dict);
	});
var elm$core$Set$fromList = function (list) {
	return A3(elm$core$List$foldl, elm$core$Set$insert, elm$core$Set$empty, list);
};
var elm$core$Dict$foldl = F3(
	function (func, acc, dict) {
		foldl:
		while (true) {
			if (dict.$ === -2) {
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
		if (!_n0.$) {
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
		var dict1 = _n0;
		var dict2 = _n1;
		return A2(elm$core$Dict$intersect, dict1, dict2);
	});
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$enumJoin = F2(
	function (_n0, _n1) {
		var labelsA = _n0;
		var labelsB = _n1;
		return elm$core$Set$toList(
			A2(
				elm$core$Set$intersect,
				elm$core$Set$fromList(labelsB),
				elm$core$Set$fromList(labelsA)));
	});
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$enumWithFallback = F2(
	function (fallbackDecoder, labelledValues) {
		var labels = A2(elm$core$List$map, elm$core$Tuple$first, labelledValues);
		var decoderFromLabel = A2(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$decoderFromEnumLabel, fallbackDecoder, labelledValues);
		var decoder = A2(elm$json$Json$Decode$andThen, decoderFromLabel, elm$json$Json$Decode$string);
		return A4(
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$ValueSpec,
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$SpecifiedType(
				{ao: labels, aQ: jamesmacaulay$elm_graphql$GraphQL$Request$Builder$enumJoin, br: jamesmacaulay$elm_graphql$GraphQL$Request$Builder$nonNullFlag, I: jamesmacaulay$elm_graphql$GraphQL$Request$Builder$emptySelectionSet}),
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
var elm$json$Json$Decode$null = _Json_decodeNull;
var elm$json$Json$Decode$nullable = function (decoder) {
	return elm$json$Json$Decode$oneOf(
		_List_fromArray(
			[
				elm$json$Json$Decode$null(elm$core$Maybe$Nothing),
				A2(elm$json$Json$Decode$map, elm$core$Maybe$Just, decoder)
			]));
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$AnyType = {$: 1};
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$SpecifiedTypeInfo = F4(
	function (nullability, coreType, join, selectionSet) {
		return {ao: coreType, aQ: join, br: nullability, I: selectionSet};
	});
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$NullableFlag = 0;
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$nullableFlag = 0;
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$nullable = function (_n0) {
	var sourceType = _n0.a;
	var decoder = _n0.b;
	var vars = _n0.c;
	var fragments = _n0.d;
	if (!sourceType.$) {
		var typeInfo = sourceType.a;
		return A4(
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$ValueSpec,
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$SpecifiedType(
				A4(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$SpecifiedTypeInfo, jamesmacaulay$elm_graphql$GraphQL$Request$Builder$nullableFlag, typeInfo.ao, typeInfo.aQ, typeInfo.I)),
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
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$ListType = elm$core$Basics$identity;
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$listJoin = F2(
	function (_n0, _n1) {
		var itemSourceTypeA = _n0;
		var itemSourceTypeB = _n1;
		return A2(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$join, itemSourceTypeA, itemSourceTypeB);
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
				ao: itemType,
				aQ: jamesmacaulay$elm_graphql$GraphQL$Request$Builder$listJoin,
				br: jamesmacaulay$elm_graphql$GraphQL$Request$Builder$nonNullFlag,
				I: jamesmacaulay$elm_graphql$GraphQL$Request$Builder$selectionSetFromSourceType(itemType)
			}),
		A2(elm$core$Basics$composeL, elm$json$Json$Decode$list, decoder),
		vars,
		fragments);
};
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
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$aliasAs = F2(
	function (responseKey, selection) {
		var ast = selection.a;
		var decoder = selection.b;
		var vars = selection.c;
		var fragments = selection.d;
		if (!ast.$) {
			var info = ast.a;
			return A4(
				jamesmacaulay$elm_graphql$GraphQL$Request$Builder$SelectionSpec,
				jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Field(
					_Utils_update(
						info,
						{
							eL: elm$core$Maybe$Just(responseKey)
						})),
				decoder,
				vars,
				fragments);
		} else {
			return selection;
		}
	});
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$customScalar = F2(
	function (customTypeMarker, decoder) {
		return A2(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$primitiveSpec, customTypeMarker, decoder);
	});
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$Value = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$IntValue = function (a) {
	return {$: 1, a: a};
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$int = function (x) {
	return A2(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$Value,
		jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$IntValue(x),
		_List_Nil);
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
												A2(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$customScalar, 0, elm_community$json_extra$Json$Decode$Extra$datetime)),
											A2(
												jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
												A3(
													jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
													'createdAt',
													_List_Nil,
													A2(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$customScalar, 0, elm_community$json_extra$Json$Decode$Extra$datetime)),
												A2(
													jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
													A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'url', _List_Nil, jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string),
													A2(
														jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
														A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'id', _List_Nil, jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string),
														jamesmacaulay$elm_graphql$GraphQL$Request$Builder$object(author$project$GitHubGraph$Issue)))))))))))))));
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
var author$project$GitHubGraph$commitObject = A2(
	jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
	A3(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
		'committedDate',
		_List_Nil,
		A2(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$customScalar, 0, elm_community$json_extra$Json$Decode$Extra$datetime)),
	A2(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
		A3(
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
			'authoredDate',
			_List_Nil,
			A2(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$customScalar, 0, elm_community$json_extra$Json$Decode$Extra$datetime)),
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
var elm$core$List$head = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return elm$core$Maybe$Just(x);
	} else {
		return elm$core$Maybe$Nothing;
	}
};
var author$project$GitHubGraph$prObject = A2(
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
																A2(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$customScalar, 0, elm_community$json_extra$Json$Decode$Extra$datetime)),
															A2(
																jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
																A3(
																	jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
																	'createdAt',
																	_List_Nil,
																	A2(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$customScalar, 0, elm_community$json_extra$Json$Decode$Extra$datetime)),
																A2(
																	jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
																	A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'url', _List_Nil, jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string),
																	A2(
																		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
																		A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'id', _List_Nil, jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string),
																		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$object(author$project$GitHubGraph$PullRequest)))))))))))))))))));
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
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Operation = elm$core$Basics$identity;
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Document = elm$core$Basics$identity;
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$fragmentDefinitionsFromOperation = function (_n0) {
	var spec = _n0.Z;
	var _n1 = spec;
	var fragments = _n1.d;
	return fragments;
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Directive = elm$core$Basics$identity;
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$directiveAST = function (_n0) {
	var name = _n0.a;
	var _arguments = _n0.b;
	return {
		ak: jamesmacaulay$elm_graphql$GraphQL$Request$Builder$argumentsAST(_arguments),
		ht: name
	};
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Mutation = 1;
var jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Query = 0;
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$operationTypeAST = function (operationType) {
	if (!operationType) {
		return 0;
	} else {
		return 1;
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
	var operationType = _n0.bs;
	var name = _n0.ht;
	var directives = _n0.J;
	var spec = _n0.Z;
	return {
		J: A2(elm$core$List$map, jamesmacaulay$elm_graphql$GraphQL$Request$Builder$directiveAST, directives),
		ht: name,
		bs: jamesmacaulay$elm_graphql$GraphQL$Request$Builder$operationTypeAST(operationType),
		I: jamesmacaulay$elm_graphql$GraphQL$Request$Builder$selectionSetFromSpec(spec),
		ic: jamesmacaulay$elm_graphql$GraphQL$Request$Builder$variableDefinitionsAST(spec)
	};
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Document = elm$core$Basics$identity;
var jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$FragmentDefinition = function (a) {
	return {$: 2, a: a};
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$OperationDefinition = function (a) {
	return {$: 0, a: a};
};
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
		case 0:
			var name = value.b;
			return '$' + name;
		case 1:
			var _int = value.a;
			return elm$core$String$fromInt(_int);
		case 2:
			var _float = value.a;
			return elm$core$String$fromFloat(_float);
		case 3:
			var string = value.a;
			return A2(
				elm$json$Json$Encode$encode,
				0,
				elm$json$Json$Encode$string(string));
		case 4:
			if (value.a) {
				return 'true';
			} else {
				return 'false';
			}
		case 5:
			return 'null';
		case 6:
			var symbol = value.a;
			return symbol;
		case 7:
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
	var name = _n0.ht;
	var _arguments = _n0.ak;
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
	if (m.$ === 1) {
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
		var name = _n0.ht;
		var directives = _n0.J;
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
	var namedType = _n0;
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
							A2(elm$core$Maybe$map, jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeFieldAlias, field.eL)),
							_List_fromArray(
							[
								A2(
								elm$core$String$join,
								'',
								A2(
									elm$core$List$cons,
									field.ht,
									jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeArgList(field.ak)))
							]),
							A2(elm$core$List$map, jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeDirective, field.J),
							A2(jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeSelectionSet, indentLevel, field.I)
						]))));
	});
var jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeInlineFragment = F2(
	function (indentLevel, _n2) {
		var typeCondition = _n2.c4;
		var directives = _n2.J;
		var selectionSet = _n2.I;
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
			case 0:
				var field = selection.a;
				return A2(jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeField, indentLevel, field);
			case 1:
				var fragmentSpread = selection.a;
				return A2(jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeFragmentSpread, indentLevel, fragmentSpread);
			default:
				var inlineFragment = selection.a;
				return A2(jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeInlineFragment, indentLevel, inlineFragment);
		}
	});
var jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeSelectionSet = F2(
	function (indentLevel, _n0) {
		var selections = _n0;
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
	var name = _n0.ht;
	var typeCondition = _n0.c4;
	var directives = _n0.J;
	var selectionSet = _n0.I;
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
	if (!opType) {
		return 'query';
	} else {
		return 'mutation';
	}
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeDefaultValue = function (value) {
	return '= ' + jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeValue(value);
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeNullability = function (nullability) {
	if (!nullability) {
		return '';
	} else {
		return '!';
	}
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeCoreTypeRef = function (coreTypeRef) {
	if (!coreTypeRef.$) {
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
	var info = _n0;
	return A2(
		elm$core$String$join,
		' ',
		elm$core$List$concat(
			_List_fromArray(
				[
					_List_fromArray(
					[
						jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeVariableName(info.ht) + ':',
						jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeTypeRef(info.gA)
					]),
					jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$listFromMaybe(
					A2(elm$core$Maybe$map, jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeDefaultValue, info.e8))
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
						jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeOperationType(info.bs)
					]),
					jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$listFromMaybe(info.ht),
					jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeVariableDefinitions(info.ic),
					A2(elm$core$List$map, jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeDirective, info.J),
					A2(jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeSelectionSet, 0, info.I)
				])));
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeDefinition = function (definition) {
	switch (definition.$) {
		case 0:
			var operationInfo = definition.a;
			return jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeOperation(operationInfo);
		case 1:
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
	var definitions = _n0;
	return A2(
		elm$core$String$join,
		'\n\n',
		A2(elm$core$List$map, jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeDefinition, definitions));
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$document = function (operation) {
	var fragmentDefinitions = jamesmacaulay$elm_graphql$GraphQL$Request$Builder$fragmentDefinitionsFromOperation(operation);
	var ast = _Utils_ap(
		A2(elm$core$List$map, jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$FragmentDefinition, fragmentDefinitions),
		_List_fromArray(
			[
				jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$OperationDefinition(
				jamesmacaulay$elm_graphql$GraphQL$Request$Builder$operationAST(operation))
			]));
	return {
		c9: ast,
		cR: operation,
		ed: jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeDocument(ast)
	};
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$MutationOperationType = 1;
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$mutationOperationType = 1;
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$mutationDocument = function (spec) {
	return jamesmacaulay$elm_graphql$GraphQL$Request$Builder$document(
		{J: _List_Nil, ht: elm$core$Maybe$Nothing, bs: jamesmacaulay$elm_graphql$GraphQL$Request$Builder$mutationOperationType, Z: spec});
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$valueVariablesFoldStep = A2(elm$core$Basics$composeR, jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$getVariables, jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$Util$mergeVariables);
var jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$ObjectValue = function (a) {
	return {$: 8, a: a};
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
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$name = function (_var) {
	if (!_var.$) {
		var variableName = _var.a;
		return variableName;
	} else {
		var variableName = _var.a;
		return variableName;
	}
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$VariableValue = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$variable = function (_var) {
	return A2(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$Value,
		A2(
			jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$VariableValue,
			0,
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$name(_var)),
		_List_fromArray(
			[_var]));
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$NamedTypeRef = function (a) {
	return {$: 0, a: a};
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$NonNull = 1;
var jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$TypeRef = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$TypeRef$namedType = A2(
	elm$core$Basics$composeL,
	jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$TypeRef(1),
	jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$NamedTypeRef);
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$TypeRef$id = jamesmacaulay$elm_graphql$GraphQL$Request$Builder$TypeRef$namedType('ID');
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$NonNull = 0;
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$VariableSpec = F3(
	function (a, b, c) {
		return {$: 0, a: a, b: b, c: c};
	});
var jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$StringValue = function (a) {
	return {$: 3, a: a};
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$id = A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$VariableSpec, 0, jamesmacaulay$elm_graphql$GraphQL$Request$Builder$TypeRef$id, jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$StringValue);
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$RequiredVariable = F3(
	function (a, b, c) {
		return {$: 0, a: a, b: b, c: c};
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
var author$project$GitHubGraph$addCardMutation = function () {
	var contentIDVar = A3(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$required,
		'contentId',
		function ($) {
			return $.gY;
		},
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$id);
	var columnIDVar = A3(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$required,
		'columnId',
		function ($) {
			return $.cA;
		},
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$id);
	return jamesmacaulay$elm_graphql$GraphQL$Request$Builder$mutationDocument(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$extract(
			A3(
				jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
				'addProjectCard',
				_List_fromArray(
					[
						_Utils_Tuple2(
						'input',
						jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$object(
							_List_fromArray(
								[
									_Utils_Tuple2(
									'projectColumnId',
									jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$variable(columnIDVar)),
									_Utils_Tuple2(
									'contentId',
									jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$variable(contentIDVar))
								])))
					]),
				jamesmacaulay$elm_graphql$GraphQL$Request$Builder$extract(
					A3(
						jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
						'cardEdge',
						_List_Nil,
						jamesmacaulay$elm_graphql$GraphQL$Request$Builder$extract(
							A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'node', _List_Nil, author$project$GitHubGraph$projectColumnCardObject)))))));
}();
var author$project$GitHubGraph$auth = function (token) {
	return (token === '') ? _List_Nil : _List_fromArray(
		[
			_Utils_Tuple2('Authorization', 'token ' + token)
		]);
};
var elm$http$Http$Internal$Header = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
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
		he: author$project$GitHubGraph$authHeaders(token),
		hr: 'POST',
		h1: elm$core$Maybe$Nothing,
		ib: 'https://api.github.com/graphql',
		ih: false
	};
};
var elm$core$Task$fail = _Scheduler_fail;
var elm$core$Task$mapError = F2(
	function (convert, task) {
		return A2(
			elm$core$Task$onError,
			A2(elm$core$Basics$composeL, elm$core$Task$fail, convert),
			task);
	});
var jamesmacaulay$elm_graphql$GraphQL$Client$Http$GraphQLError = function (a) {
	return {$: 1, a: a};
};
var jamesmacaulay$elm_graphql$GraphQL$Client$Http$HttpError = function (a) {
	return {$: 0, a: a};
};
var elm$core$Result$withDefault = F2(
	function (def, result) {
		if (!result.$) {
			var a = result.a;
			return a;
		} else {
			return def;
		}
	});
var jamesmacaulay$elm_graphql$GraphQL$Response$RequestError = F2(
	function (message, locations) {
		return {hm: locations, aS: message};
	});
var jamesmacaulay$elm_graphql$GraphQL$Response$DocumentLocation = F2(
	function (line, column) {
		return {eX: column, b0: line};
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
			case 3:
				var body = httpError.a.gM;
				return handleErrorWithResponseBody(body);
			case 4:
				var body = httpError.b.gM;
				return handleErrorWithResponseBody(body);
			default:
				return wrapHttpError(httpError);
		}
	});
var elm$core$String$contains = _String_contains;
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
		return {$: 1, a: a, b: b};
	});
var elm$http$Http$jsonBody = function (value) {
	return A2(
		elm$http$Http$Internal$StringBody,
		'application/json',
		A2(elm$json$Json$Encode$encode, 0, value));
};
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
			_Json_emptyObject(0),
			pairs));
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
		var _n0 = (requestOptions.hr === 'GET') ? _Utils_Tuple2(
			A3(jamesmacaulay$elm_graphql$GraphQL$Client$Http$Util$parameterizedUrl, requestOptions.ib, documentString, variableValues),
			elm$http$Http$emptyBody) : _Utils_Tuple2(
			requestOptions.ib,
			A2(jamesmacaulay$elm_graphql$GraphQL$Client$Http$Util$postBody, documentString, variableValues));
		var url = _n0.a;
		var body = _n0.b;
		return {gM: body, dm: expect, he: requestOptions.he, hr: requestOptions.hr, h1: requestOptions.h1, ib: url, ih: requestOptions.ih};
	});
var elm$json$Json$Encode$bool = _Json_wrap;
var elm$json$Json$Encode$float = _Json_wrap;
var elm$json$Json$Encode$int = _Json_wrap;
var elm$json$Json$Encode$list = F2(
	function (func, entries) {
		return _Json_wrap(
			A3(
				elm$core$List$foldl,
				_Json_addEntry(func),
				_Json_emptyArray(0),
				entries));
	});
var elm$json$Json$Encode$null = _Json_encodeNull;
var jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Value$Json$Encode$encode = function (value) {
	switch (value.$) {
		case 0:
			return elm$json$Json$Encode$null;
		case 1:
			var _int = value.a;
			return elm$json$Json$Encode$int(_int);
		case 2:
			var _float = value.a;
			return elm$json$Json$Encode$float(_float);
		case 3:
			var string = value.a;
			return elm$json$Json$Encode$string(string);
		case 4:
			var bool = value.a;
			return elm$json$Json$Encode$bool(bool);
		case 5:
			return elm$json$Json$Encode$null;
		case 6:
			var string = value.a;
			return elm$json$Json$Encode$string(string);
		case 7:
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
	var variableValues = _n0.gB;
	return jamesmacaulay$elm_graphql$GraphQL$Request$Builder$variableValuesToJson(variableValues);
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$requestBody = function (_n0) {
	var requestRecord = _n0;
	return requestRecord.fb;
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
var jamesmacaulay$elm_graphql$GraphQL$Client$Http$Util$defaultExpect = A2(
	elm$core$Basics$composeL,
	elm$http$Http$expectJson,
	elm$json$Json$Decode$field('data'));
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$responseDataDecoder = function (_n0) {
	var requestRecord = _n0;
	return requestRecord.gd;
};
var jamesmacaulay$elm_graphql$GraphQL$Client$Http$send = F2(
	function (options, request) {
		var expect = jamesmacaulay$elm_graphql$GraphQL$Client$Http$Util$defaultExpect(
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$responseDataDecoder(request));
		return A3(jamesmacaulay$elm_graphql$GraphQL$Client$Http$sendExpecting, expect, options, request);
	});
var jamesmacaulay$elm_graphql$GraphQL$Client$Http$customSendMutation = jamesmacaulay$elm_graphql$GraphQL$Client$Http$send;
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Request = elm$core$Basics$identity;
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$specDecoder = function (_n0) {
	var sourceType = _n0.a;
	var decoderFromSelectionSet = _n0.b;
	return decoderFromSelectionSet(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$selectionSetFromSourceType(sourceType));
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$documentResponseDecoder = function (_n0) {
	var operation = _n0.cR;
	var _n1 = operation;
	var spec = _n1.Z;
	return jamesmacaulay$elm_graphql$GraphQL$Request$Builder$specDecoder(spec);
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$documentVariables = function (_n0) {
	var operation = _n0.cR;
	var _n1 = operation;
	var spec = _n1.Z;
	var _n2 = spec;
	var vars = _n2.c;
	return vars;
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$valueFromSource = F2(
	function (source, _var) {
		if (!_var.$) {
			var f = _var.c;
			return elm$core$Maybe$Just(
				_Utils_Tuple2(
					jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$name(_var),
					f(source)));
		} else {
			var f = _var.c;
			var _n1 = f(source);
			if (_n1.$ === 1) {
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
		var operation = doc.cR;
		var ast = doc.c9;
		var serialized = doc.ed;
		return {
			g2: ast,
			fb: serialized,
			gd: jamesmacaulay$elm_graphql$GraphQL$Request$Builder$documentResponseDecoder(doc),
			gB: A2(
				jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$extractValuesFrom,
				vars,
				jamesmacaulay$elm_graphql$GraphQL$Request$Builder$documentVariables(doc))
		};
	});
var author$project$GitHubGraph$addContentCard = F3(
	function (token, columnID, contentID) {
		return A2(
			jamesmacaulay$elm_graphql$GraphQL$Client$Http$customSendMutation,
			author$project$GitHubGraph$authedOptions(token),
			A2(
				jamesmacaulay$elm_graphql$GraphQL$Request$Builder$request,
				{cA: columnID, gY: contentID},
				author$project$GitHubGraph$addCardMutation));
	});
var jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Nullable = 0;
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$TypeRef$nullable = function (_n0) {
	var coreTypeRef = _n0.b;
	return A2(jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$TypeRef, 0, coreTypeRef);
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$Nullable = 0;
var jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$NullValue = {$: 5};
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$nullable = function (_n0) {
	var _n1 = _n0.a;
	var typeRef = _n0.b;
	var convert = _n0.c;
	return A3(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$VariableSpec,
		0,
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$TypeRef$nullable(typeRef),
		A2(
			elm$core$Basics$composeR,
			elm$core$Maybe$map(convert),
			elm$core$Maybe$withDefault(jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$NullValue)));
};
var author$project$GitHubGraph$moveCardMutation = function () {
	var columnIDVar = A3(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$required,
		'columnId',
		function ($) {
			return $.cA;
		},
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$id);
	var cardIDVar = A3(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$required,
		'cardId',
		function ($) {
			return $.eS;
		},
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$id);
	var afterIDVar = A3(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$required,
		'afterId',
		function ($) {
			return $.eJ;
		},
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$nullable(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$id));
	return jamesmacaulay$elm_graphql$GraphQL$Request$Builder$mutationDocument(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$extract(
			A3(
				jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
				'moveProjectCard',
				_List_fromArray(
					[
						_Utils_Tuple2(
						'input',
						jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$object(
							_List_fromArray(
								[
									_Utils_Tuple2(
									'columnId',
									jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$variable(columnIDVar)),
									_Utils_Tuple2(
									'cardId',
									jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$variable(cardIDVar)),
									_Utils_Tuple2(
									'afterCardId',
									jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$variable(afterIDVar))
								])))
					]),
				jamesmacaulay$elm_graphql$GraphQL$Request$Builder$extract(
					A3(
						jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
						'cardEdge',
						_List_Nil,
						jamesmacaulay$elm_graphql$GraphQL$Request$Builder$extract(
							A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'node', _List_Nil, author$project$GitHubGraph$projectColumnCardObject)))))));
}();
var author$project$GitHubGraph$moveCardAfter = F4(
	function (token, columnID, cardID, mafterID) {
		return A2(
			jamesmacaulay$elm_graphql$GraphQL$Client$Http$customSendMutation,
			author$project$GitHubGraph$authedOptions(token),
			A2(
				jamesmacaulay$elm_graphql$GraphQL$Request$Builder$request,
				{eJ: mafterID, eS: cardID, cA: columnID},
				author$project$GitHubGraph$moveCardMutation));
	});
var author$project$GitHubGraph$addContentCardAfter = F4(
	function (token, columnID, contentID, mafterID) {
		return A2(
			elm$core$Task$andThen,
			function (_n0) {
				var id = _n0.fu;
				return A4(author$project$GitHubGraph$moveCardAfter, token, columnID, id, mafterID);
			},
			A3(author$project$GitHubGraph$addContentCard, token, columnID, contentID));
	});
var author$project$Main$CardMoved = F2(
	function (a, b) {
		return {$: 8, a: a, b: b};
	});
var author$project$Main$contentCardId = F3(
	function (model, projectId, contentId) {
		var _n0 = A2(elm$core$Dict$get, contentId, model.p);
		if (!_n0.$) {
			var card = _n0.a;
			var _n1 = A2(
				elm$core$List$filter,
				A2(
					elm$core$Basics$composeL,
					A2(
						elm$core$Basics$composeL,
						elm$core$Basics$eq(projectId),
						function ($) {
							return $.fu;
						}),
					function ($) {
						return $.f2;
					}),
				card.cx);
			if (_n1.b && (!_n1.b.b)) {
				var c = _n1.a;
				return elm$core$Maybe$Just(c.fu);
			} else {
				return elm$core$Maybe$Nothing;
			}
		} else {
			return elm$core$Maybe$Nothing;
		}
	});
var elm$core$Platform$Cmd$batch = _Platform_batch;
var elm$core$Platform$Cmd$none = elm$core$Platform$Cmd$batch(_List_Nil);
var author$project$Main$addCard = F3(
	function (model, _n0, contentId) {
		var projectId = _n0.b7;
		var columnId = _n0.cA;
		var afterId = _n0.eJ;
		var _n1 = model.g;
		if (!_n1.$) {
			var token = _n1.a.h9;
			var _n2 = A3(author$project$Main$contentCardId, model, projectId, contentId);
			if (!_n2.$) {
				var cardId = _n2.a;
				return A2(
					elm$core$Task$attempt,
					author$project$Main$CardMoved(columnId),
					A4(author$project$GitHubGraph$moveCardAfter, token, columnId, cardId, afterId));
			} else {
				return A2(
					elm$core$Task$attempt,
					author$project$Main$CardMoved(columnId),
					A4(author$project$GitHubGraph$addContentCardAfter, token, columnId, contentId, afterId));
			}
		} else {
			return elm$core$Platform$Cmd$none;
		}
	});
var lukewestby$elm_http_builder$HttpBuilder$post = lukewestby$elm_http_builder$HttpBuilder$requestWithMethodAndUrl('POST');
var lukewestby$elm_http_builder$HttpBuilder$withHeaders = F2(
	function (headerPairs, builder) {
		return _Utils_update(
			builder,
			{
				he: _Utils_ap(
					A2(
						elm$core$List$map,
						function (_n0) {
							var key = _n0.a;
							var value = _n0.b;
							return A2(elm$http$Http$header, key, value);
						},
						headerPairs),
					builder.he)
			});
	});
var lukewestby$elm_http_builder$HttpBuilder$withBody = F2(
	function (body, builder) {
		return _Utils_update(
			builder,
			{gM: body});
	});
var lukewestby$elm_http_builder$HttpBuilder$withJsonBody = function (value) {
	return lukewestby$elm_http_builder$HttpBuilder$withBody(
		elm$http$Http$jsonBody(value));
};
var author$project$GitHubGraph$addIssueLabels = F3(
	function (token, issue, names) {
		return A2(
			elm$core$Task$mapError,
			jamesmacaulay$elm_graphql$GraphQL$Client$Http$HttpError,
			lukewestby$elm_http_builder$HttpBuilder$toTask(
				A2(
					lukewestby$elm_http_builder$HttpBuilder$withJsonBody,
					A2(elm$json$Json$Encode$list, elm$json$Json$Encode$string, names),
					A2(
						lukewestby$elm_http_builder$HttpBuilder$withHeaders,
						author$project$GitHubGraph$auth(token),
						lukewestby$elm_http_builder$HttpBuilder$post(
							'https://api.github.com/repos/' + (issue.q.hN + ('/' + (issue.q.ht + ('/issues/' + (elm$core$String$fromInt(issue.k) + '/labels'))))))))));
	});
var author$project$Main$DataChanged = F2(
	function (a, b) {
		return {$: 63, a: a, b: b};
	});
var author$project$Main$addIssueLabels = F3(
	function (model, issue, labels) {
		var _n0 = model.g;
		if (!_n0.$) {
			var token = _n0.a.h9;
			return A2(
				elm$core$Task$attempt,
				author$project$Main$DataChanged(
					A2(author$project$Backend$refreshIssue, issue.fu, author$project$Main$IssueRefreshed)),
				A3(author$project$GitHubGraph$addIssueLabels, token, issue, labels));
		} else {
			return elm$core$Platform$Cmd$none;
		}
	});
var author$project$GitHubGraph$addPullRequestLabels = F3(
	function (token, issue, names) {
		return A2(
			elm$core$Task$mapError,
			jamesmacaulay$elm_graphql$GraphQL$Client$Http$HttpError,
			lukewestby$elm_http_builder$HttpBuilder$toTask(
				A2(
					lukewestby$elm_http_builder$HttpBuilder$withJsonBody,
					A2(elm$json$Json$Encode$list, elm$json$Json$Encode$string, names),
					A2(
						lukewestby$elm_http_builder$HttpBuilder$withHeaders,
						author$project$GitHubGraph$auth(token),
						lukewestby$elm_http_builder$HttpBuilder$post(
							'https://api.github.com/repos/' + (issue.q.hN + ('/' + (issue.q.ht + ('/issues/' + (elm$core$String$fromInt(issue.k) + '/labels'))))))))));
	});
var author$project$Main$addPullRequestLabels = F3(
	function (model, pr, labels) {
		var _n0 = model.g;
		if (!_n0.$) {
			var token = _n0.a.h9;
			return A2(
				elm$core$Task$attempt,
				author$project$Main$DataChanged(
					A2(author$project$Backend$refreshPR, pr.fu, author$project$Main$PullRequestRefreshed)),
				A3(author$project$GitHubGraph$addPullRequestLabels, token, pr, labels));
		} else {
			return elm$core$Platform$Cmd$none;
		}
	});
var lukewestby$elm_http_builder$HttpBuilder$patch = lukewestby$elm_http_builder$HttpBuilder$requestWithMethodAndUrl('PATCH');
var author$project$GitHubGraph$closeRepoMilestone = F3(
	function (token, repo, milestone) {
		return A2(
			elm$core$Task$mapError,
			jamesmacaulay$elm_graphql$GraphQL$Client$Http$HttpError,
			lukewestby$elm_http_builder$HttpBuilder$toTask(
				A2(
					lukewestby$elm_http_builder$HttpBuilder$withJsonBody,
					elm$json$Json$Encode$object(
						_List_fromArray(
							[
								_Utils_Tuple2(
								'state',
								elm$json$Json$Encode$string('closed'))
							])),
					A2(
						lukewestby$elm_http_builder$HttpBuilder$withHeaders,
						author$project$GitHubGraph$auth(token),
						lukewestby$elm_http_builder$HttpBuilder$patch(
							'https://api.github.com/repos/' + (repo.hN + ('/' + (repo.ht + ('/milestones/' + elm$core$String$fromInt(milestone.k))))))))));
	});
var author$project$Main$MilestoneChanged = F2(
	function (a, b) {
		return {$: 44, a: a, b: b};
	});
var author$project$Main$closeMilestone = F3(
	function (model, repo, milestone) {
		var _n0 = model.g;
		if (!_n0.$) {
			var token = _n0.a.h9;
			return A2(
				elm$core$Task$attempt,
				author$project$Main$MilestoneChanged(repo),
				A3(author$project$GitHubGraph$closeRepoMilestone, token, repo, milestone));
		} else {
			return elm$core$Platform$Cmd$none;
		}
	});
var author$project$Main$hexBrightness = function (h) {
	var _n0 = A2(elm$core$Basics$compare, h, (255 / 2) | 0);
	switch (_n0) {
		case 0:
			return -1;
		case 1:
			return 0;
		default:
			return 1;
	}
};
var elm$regex$Regex$Match = F4(
	function (match, index, number, submatches) {
		return {dF: index, ho: match, k: number, hX: submatches};
	});
var elm$regex$Regex$fromStringWith = _Regex_fromStringWith;
var elm$regex$Regex$fromString = function (string) {
	return A2(
		elm$regex$Regex$fromStringWith,
		{eT: false, fR: false},
		string);
};
var elm$regex$Regex$never = _Regex_never;
var author$project$Main$hexRegex = A2(
	elm$core$Maybe$withDefault,
	elm$regex$Regex$never,
	elm$regex$Regex$fromString('([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})'));
var elm$regex$Regex$find = _Regex_findAtMost(_Regex_infinity);
var elm$core$String$reverse = _String_reverse;
var fredcy$elm_parseint$ParseInt$InvalidRadix = function (a) {
	return {$: 2, a: a};
};
var elm$core$Result$andThen = F2(
	function (callback, result) {
		if (!result.$) {
			var value = result.a;
			return callback(value);
		} else {
			var msg = result.a;
			return elm$core$Result$Err(msg);
		}
	});
var fredcy$elm_parseint$ParseInt$InvalidChar = function (a) {
	return {$: 0, a: a};
};
var fredcy$elm_parseint$ParseInt$OutOfRange = function (a) {
	return {$: 1, a: a};
};
var fredcy$elm_parseint$ParseInt$charOffset = F2(
	function (basis, c) {
		return elm$core$Char$toCode(c) - elm$core$Char$toCode(basis);
	});
var fredcy$elm_parseint$ParseInt$isBetween = F3(
	function (lower, upper, c) {
		var ci = elm$core$Char$toCode(c);
		return (_Utils_cmp(
			elm$core$Char$toCode(lower),
			ci) < 1) && (_Utils_cmp(
			ci,
			elm$core$Char$toCode(upper)) < 1);
	});
var fredcy$elm_parseint$ParseInt$intFromChar = F2(
	function (radix, c) {
		var validInt = function (i) {
			return (_Utils_cmp(i, radix) < 0) ? elm$core$Result$Ok(i) : elm$core$Result$Err(
				fredcy$elm_parseint$ParseInt$OutOfRange(c));
		};
		var toInt = A3(fredcy$elm_parseint$ParseInt$isBetween, '0', '9', c) ? elm$core$Result$Ok(
			A2(fredcy$elm_parseint$ParseInt$charOffset, '0', c)) : (A3(fredcy$elm_parseint$ParseInt$isBetween, 'a', 'z', c) ? elm$core$Result$Ok(
			10 + A2(fredcy$elm_parseint$ParseInt$charOffset, 'a', c)) : (A3(fredcy$elm_parseint$ParseInt$isBetween, 'A', 'Z', c) ? elm$core$Result$Ok(
			10 + A2(fredcy$elm_parseint$ParseInt$charOffset, 'A', c)) : elm$core$Result$Err(
			fredcy$elm_parseint$ParseInt$InvalidChar(c))));
		return A2(elm$core$Result$andThen, validInt, toInt);
	});
var fredcy$elm_parseint$ParseInt$parseIntR = F2(
	function (radix, rstring) {
		var _n0 = elm$core$String$uncons(rstring);
		if (_n0.$ === 1) {
			return elm$core$Result$Ok(0);
		} else {
			var _n1 = _n0.a;
			var c = _n1.a;
			var rest = _n1.b;
			return A2(
				elm$core$Result$andThen,
				function (ci) {
					return A2(
						elm$core$Result$andThen,
						function (ri) {
							return elm$core$Result$Ok(ci + (ri * radix));
						},
						A2(fredcy$elm_parseint$ParseInt$parseIntR, radix, rest));
				},
				A2(fredcy$elm_parseint$ParseInt$intFromChar, radix, c));
		}
	});
var fredcy$elm_parseint$ParseInt$parseIntRadix = F2(
	function (radix, string) {
		return ((2 <= radix) && (radix <= 36)) ? A2(
			fredcy$elm_parseint$ParseInt$parseIntR,
			radix,
			elm$core$String$reverse(string)) : elm$core$Result$Err(
			fredcy$elm_parseint$ParseInt$InvalidRadix(radix));
	});
var fredcy$elm_parseint$ParseInt$parseIntHex = fredcy$elm_parseint$ParseInt$parseIntRadix(16);
var author$project$Main$computeColorIsLight = function (hex) {
	var matches = elm$core$List$head(
		A2(elm$regex$Regex$find, author$project$Main$hexRegex, hex));
	var _n0 = A2(
		elm$core$Maybe$map,
		function ($) {
			return $.hX;
		},
		matches);
	if ((((((((!_n0.$) && _n0.a.b) && (!_n0.a.a.$)) && _n0.a.b.b) && (!_n0.a.b.a.$)) && _n0.a.b.b.b) && (!_n0.a.b.b.a.$)) && (!_n0.a.b.b.b.b)) {
		var _n1 = _n0.a;
		var h1s = _n1.a.a;
		var _n2 = _n1.b;
		var h2s = _n2.a.a;
		var _n3 = _n2.b;
		var h3s = _n3.a.a;
		var _n4 = A2(
			elm$core$List$map,
			fredcy$elm_parseint$ParseInt$parseIntHex,
			_List_fromArray(
				[h1s, h2s, h3s]));
		if ((((((_n4.b && (!_n4.a.$)) && _n4.b.b) && (!_n4.b.a.$)) && _n4.b.b.b) && (!_n4.b.b.a.$)) && (!_n4.b.b.b.b)) {
			var h1 = _n4.a.a;
			var _n5 = _n4.b;
			var h2 = _n5.a.a;
			var _n6 = _n5.b;
			var h3 = _n6.a.a;
			return (((author$project$Main$hexBrightness(h1) + author$project$Main$hexBrightness(h2)) + author$project$Main$hexBrightness(h3)) > 0) ? true : false;
		} else {
			return A3(author$project$Log$debug, 'invalid hex', hex, false);
		}
	} else {
		return A3(author$project$Log$debug, 'invalid hex', hex, false);
	}
};
var author$project$Main$isBug = function (card) {
	return card.ac.$7;
};
var author$project$Main$isEnhancement = function (card) {
	return card.ac.dp;
};
var author$project$Main$PullRequestState = function (a) {
	return {$: 1, a: a};
};
var author$project$Main$isMerged = function (card) {
	return _Utils_eq(
		card._,
		author$project$Main$PullRequestState(2));
};
var author$project$Main$isAcceptedPR = function (card) {
	return (author$project$Main$isEnhancement(card) || author$project$Main$isBug(card)) && author$project$Main$isMerged(card);
};
var author$project$Main$isOpen = function (card) {
	var _n0 = card._;
	_n0$2:
	while (true) {
		if (!_n0.$) {
			if (!_n0.a) {
				var _n1 = _n0.a;
				return true;
			} else {
				break _n0$2;
			}
		} else {
			if (!_n0.a) {
				var _n2 = _n0.a;
				return true;
			} else {
				break _n0$2;
			}
		}
	}
	return false;
};
var author$project$Main$isPR = function (card) {
	var _n0 = card._;
	if (_n0.$ === 1) {
		return true;
	} else {
		return false;
	}
};
var elm$core$Dict$union = F2(
	function (t1, t2) {
		return A3(elm$core$Dict$foldl, elm$core$Dict$insert, t2, t1);
	});
var elm$core$Set$union = F2(
	function (_n0, _n1) {
		var dict1 = _n0;
		var dict2 = _n1;
		return A2(elm$core$Dict$union, dict1, dict2);
	});
var elm$core$String$toLower = _String_toLower;
var author$project$Main$computeDataView = function (origModel) {
	var dataView = origModel.D;
	var add = function (x) {
		return A2(
			elm$core$Basics$composeL,
			A2(
				elm$core$Basics$composeL,
				elm$core$Maybe$Just,
				elm$core$Maybe$withDefault(
					_List_fromArray(
						[x]))),
			elm$core$Maybe$map(
				elm$core$List$cons(x)));
	};
	var groupRepoLabels = A2(
		elm$core$Dict$foldl,
		F3(
			function (_n6, repo, cbn) {
				return A3(
					elm$core$List$foldl,
					function (label) {
						return A2(
							elm$core$Dict$update,
							_Utils_Tuple2(
								label.ht,
								elm$core$String$toLower(label.cz)),
							add(repo));
					},
					cbn,
					repo.bk);
			}),
		elm$core$Dict$empty);
	var model = origModel.aC ? _Utils_update(
		origModel,
		{
			D: _Utils_update(
				dataView,
				{
					aB: groupRepoLabels(origModel.c.ga)
				})
		}) : origModel;
	var _n0 = model.bv;
	switch (_n0.$) {
		case 4:
			var nextMilestoneCards = A3(
				elm$core$Dict$foldl,
				F3(
					function (_n4, card, acc) {
						return (_Utils_eq(card.cO, elm$core$Maybe$Nothing) && author$project$Main$isAcceptedPR(card)) ? A2(elm$core$List$cons, card, acc) : acc;
					}),
				_List_Nil,
				model.p);
			var cardsByMilestone = A3(
				elm$core$Dict$foldl,
				F3(
					function (_n2, card, acc) {
						var _n3 = card.cO;
						if (!_n3.$) {
							var milestone = _n3.a;
							return A3(
								elm$core$Dict$update,
								milestone.bF,
								add(card),
								acc);
						} else {
							return acc;
						}
					}),
				elm$core$Dict$empty,
				model.p);
			var allMilestones = elm$core$Set$toList(
				A3(
					elm$core$Dict$foldl,
					F2(
						function (_n1, repo) {
							return elm$core$Set$union(
								elm$core$Set$fromList(
									A2(
										elm$core$List$map,
										function ($) {
											return $.bF;
										},
										A2(
											elm$core$List$filter,
											A2(
												elm$core$Basics$composeL,
												elm$core$Basics$eq(0),
												function ($) {
													return $._;
												}),
											repo.fK))));
						}),
					elm$core$Set$empty,
					model.c.ga));
			return _Utils_update(
				model,
				{
					D: _Utils_update(
						dataView,
						{cp: allMilestones, cy: cardsByMilestone, cQ: nextMilestoneCards})
				});
		case 5:
			var prsByRepo = A3(
				elm$core$Dict$foldl,
				F3(
					function (_n5, card, acc) {
						return (author$project$Main$isOpen(card) && author$project$Main$isPR(card)) ? A3(
							elm$core$Dict$update,
							card.q.fu,
							add(card),
							acc) : acc;
					}),
				elm$core$Dict$empty,
				model.p);
			return _Utils_update(
				model,
				{
					D: _Utils_update(
						dataView,
						{cX: prsByRepo})
				});
		case 3:
			return _Utils_update(
				model,
				{
					D: _Utils_update(
						dataView,
						{
							aB: groupRepoLabels(model.c.ga)
						})
				});
		case 1:
			return _Utils_update(
				model,
				{
					D: _Utils_update(
						dataView,
						{
							aB: groupRepoLabels(model.c.ga)
						})
				});
		case 2:
			return _Utils_update(
				model,
				{
					D: _Utils_update(
						dataView,
						{
							aB: groupRepoLabels(model.c.ga)
						})
				});
		default:
			return model;
	}
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
var elm$random$Random$Generator = elm$core$Basics$identity;
var elm$random$Random$Seed = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
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
		return function (seed0) {
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
		};
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
		var generator = _n0;
		return generator(seed);
	});
var author$project$ForceGraph$node = function (nc) {
	var ncnode = nc.aU;
	var canvas = 500;
	var _n0 = A2(
		elm$random$Random$step,
		A2(elm$random$Random$float, 0, canvas),
		elm$random$Random$initialSeed(ncnode.fu));
	var x = _n0.a;
	var s2 = _n0.b;
	var _n1 = A2(
		elm$random$Random$step,
		A2(elm$random$Random$float, 0, canvas),
		s2);
	var y = _n1.a;
	var s3 = _n1.b;
	return {
		fv: nc.fv,
		aU: {
			fu: ncnode.fu,
			ar: {fu: ncnode.fu, cZ: ncnode.ar.cZ, ew: ncnode.ar.ew, ie: 0.0, $8: 0.0, ij: x, im: y}
		},
		fT: nc.fT
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
							{hd: node1, ar: e, h2: node2});
					}),
				ctx.fT);
		});
	return A3(
		flippedFoldl,
		prependEdges,
		elm_community$graph$Graph$unGraph(graph),
		_List_Nil);
};
var elm_community$graph$Graph$get = function (nodeId) {
	return A2(
		elm$core$Basics$composeR,
		elm_community$graph$Graph$unGraph,
		elm_community$intdict$IntDict$get(nodeId));
};
var elm_community$graph$Graph$empty = elm_community$intdict$IntDict$empty;
var elm_community$intdict$IntDict$findMax = function (dict) {
	findMax:
	while (true) {
		switch (dict.$) {
			case 0:
				return elm$core$Maybe$Nothing;
			case 1:
				var l = dict.a;
				return elm$core$Maybe$Just(
					_Utils_Tuple2(l.dH, l.ew));
			default:
				var i = dict.a;
				var $temp$dict = i.d;
				dict = $temp$dict;
				continue findMax;
		}
	}
};
var elm_community$intdict$IntDict$findMin = function (dict) {
	findMin:
	while (true) {
		switch (dict.$) {
			case 0:
				return elm$core$Maybe$Nothing;
			case 1:
				var l = dict.a;
				return elm$core$Maybe$Just(
					_Utils_Tuple2(l.dH, l.ew));
			default:
				var i = dict.a;
				var $temp$dict = i.fE;
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
					if (!maybeContext.$) {
						var ctx = maybeContext.a;
						var $temp$acc1 = A2(f, ctx, acc1),
							$temp$graph1 = A2(elm_community$graph$Graph$remove, ctx.aU.fu, graph1);
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
var elm_community$graph$Graph$insert = F2(
	function (nodeContext, graph) {
		return A3(
			elm_community$graph$Graph$update,
			nodeContext.aU.fu,
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
		return {$: 2, a: a, b: b};
	});
var gampleman$elm_visualization$Force$customLinks = F2(
	function (iters, list) {
		var counts = A3(
			elm$core$List$foldr,
			F2(
				function (_n1, d) {
					var source = _n1.aD;
					var target = _n1.av;
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
					var source = _n0.aD;
					var target = _n0.av;
					var distance = _n0.g1;
					var strength = _n0.hW;
					return {
						dd: count(source) / (count(source) + count(target)),
						g1: distance,
						aD: source,
						hW: A2(
							elm$core$Maybe$withDefault,
							1 / A2(
								elm$core$Basics$min,
								count(source),
								count(target)),
							strength),
						av: target
					};
				},
				list));
	});
var gampleman$elm_visualization$Force$iterations = F2(
	function (iters, _n0) {
		var config = _n0;
		return _Utils_update(
			config,
			{
				c7: 1 - A2(elm$core$Basics$pow, config.dS, 1 / iters)
			});
	});
var gampleman$elm_visualization$Force$ManyBody = F2(
	function (a, b) {
		return {$: 3, a: a, b: b};
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
	return {
		a9: 1.0,
		c7: 1 - A2(elm$core$Basics$pow, 1.0e-3, 1 / 300),
		eN: 0.0,
		fm: forces,
		dS: 1.0e-3,
		co: 0.6
	};
};
var author$project$ForceGraph$fromGraph = function (g) {
	var graph = A2(elm_community$graph$Graph$mapContexts, author$project$ForceGraph$node, g);
	var link = function (_n1) {
		var from = _n1.hd;
		var to = _n1.h2;
		var distance = function () {
			var _n0 = _Utils_Tuple2(
				A2(elm_community$graph$Graph$get, from, graph),
				A2(elm_community$graph$Graph$get, to, graph));
			if ((!_n0.a.$) && (!_n0.b.$)) {
				var fnc = _n0.a.a;
				var tnc = _n0.b.a;
				return 20 + elm$core$Basics$ceiling(tnc.aU.ar.cZ + fnc.aU.ar.cZ);
			} else {
				return 0;
			}
		}();
		return {g1: distance, aD: from, hW: elm$core$Maybe$Nothing, av: to};
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
					return $.fu;
				},
				elm_community$graph$Graph$nodes(graph)))
		]);
	var newSimulation = A2(
		gampleman$elm_visualization$Force$iterations,
		iterations,
		gampleman$elm_visualization$Force$simulation(forces));
	return author$project$ForceGraph$computeSimulation(
		{a0: graph, ca: newSimulation});
};
var y0hy0h$ordered_containers$OrderedSet$OrderedSet = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var y0hy0h$ordered_containers$OrderedSet$empty = A2(y0hy0h$ordered_containers$OrderedSet$OrderedSet, _List_Nil, elm$core$Dict$empty);
var author$project$Main$baseGraphState = function (model) {
	return {u: elm$core$Set$empty, cw: model.c.eG, M: model.M, m: model.m, W: elm$core$Maybe$Nothing, g: model.g, s: y0hy0h$ordered_containers$OrderedSet$empty};
};
var author$project$Main$cardRadiusBase = F2(
	function (card, _n0) {
		var incoming = _n0.fv;
		var outgoing = _n0.fT;
		return (15 + ((elm_community$intdict$IntDict$size(incoming) / 2) + (elm_community$intdict$IntDict$size(outgoing) * 2))) + function () {
			var _n1 = card.cB;
			if (_n1.$ === 1) {
				var pr = _n1.a;
				return A2(elm$core$Basics$min, 50, (pr.eI + pr.e9) / 50);
			} else {
				return 0;
			}
		}();
	});
var elm$core$Basics$pi = _Basics_pi;
var elm$core$List$repeatHelp = F3(
	function (result, n, value) {
		repeatHelp:
		while (true) {
			if (n <= 0) {
				return result;
			} else {
				var $temp$result = A2(elm$core$List$cons, value, result),
					$temp$n = n - 1,
					$temp$value = value;
				result = $temp$result;
				n = $temp$n;
				value = $temp$value;
				continue repeatHelp;
			}
		}
	});
var elm$core$List$repeat = F2(
	function (n, value) {
		return A3(elm$core$List$repeatHelp, _List_Nil, n, value);
	});
var elm$virtual_dom$VirtualDom$toHandlerInt = function (handler) {
	switch (handler.$) {
		case 0:
			return 0;
		case 1:
			return 1;
		case 2:
			return 2;
		default:
			return 3;
	}
};
var elm$svg$Svg$Attributes$fill = _VirtualDom_attribute('fill');
var elm$svg$Svg$trustedNode = _VirtualDom_nodeNS('http://www.w3.org/2000/svg');
var elm$svg$Svg$path = elm$svg$Svg$trustedNode('path');
var elm$svg$Svg$Attributes$d = _VirtualDom_attribute('d');
var elm$core$List$singleton = function (value) {
	return _List_fromArray(
		[value]);
};
var folkertdev$one_true_path_experiment$SubPath$Empty = {$: 1};
var folkertdev$one_true_path_experiment$SubPath$SubPath = function (a) {
	return {$: 0, a: a};
};
var folkertdev$elm_deque$Deque$Deque = elm$core$Basics$identity;
var folkertdev$elm_deque$Internal$empty = {aq: _List_Nil, au: _List_Nil, af: 0, ag: 0};
var folkertdev$elm_deque$Deque$empty = folkertdev$elm_deque$Internal$empty;
var elm$core$List$drop = F2(
	function (n, list) {
		drop:
		while (true) {
			if (n <= 0) {
				return list;
			} else {
				if (!list.b) {
					return list;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs;
					n = $temp$n;
					list = $temp$list;
					continue drop;
				}
			}
		}
	});
var elm$core$List$takeReverse = F3(
	function (n, list, kept) {
		takeReverse:
		while (true) {
			if (n <= 0) {
				return kept;
			} else {
				if (!list.b) {
					return kept;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs,
						$temp$kept = A2(elm$core$List$cons, x, kept);
					n = $temp$n;
					list = $temp$list;
					kept = $temp$kept;
					continue takeReverse;
				}
			}
		}
	});
var elm$core$List$takeTailRec = F2(
	function (n, list) {
		return elm$core$List$reverse(
			A3(elm$core$List$takeReverse, n, list, _List_Nil));
	});
var elm$core$List$takeFast = F3(
	function (ctr, n, list) {
		if (n <= 0) {
			return _List_Nil;
		} else {
			var _n0 = _Utils_Tuple2(n, list);
			_n0$1:
			while (true) {
				_n0$5:
				while (true) {
					if (!_n0.b.b) {
						return list;
					} else {
						if (_n0.b.b.b) {
							switch (_n0.a) {
								case 1:
									break _n0$1;
								case 2:
									var _n2 = _n0.b;
									var x = _n2.a;
									var _n3 = _n2.b;
									var y = _n3.a;
									return _List_fromArray(
										[x, y]);
								case 3:
									if (_n0.b.b.b.b) {
										var _n4 = _n0.b;
										var x = _n4.a;
										var _n5 = _n4.b;
										var y = _n5.a;
										var _n6 = _n5.b;
										var z = _n6.a;
										return _List_fromArray(
											[x, y, z]);
									} else {
										break _n0$5;
									}
								default:
									if (_n0.b.b.b.b && _n0.b.b.b.b.b) {
										var _n7 = _n0.b;
										var x = _n7.a;
										var _n8 = _n7.b;
										var y = _n8.a;
										var _n9 = _n8.b;
										var z = _n9.a;
										var _n10 = _n9.b;
										var w = _n10.a;
										var tl = _n10.b;
										return (ctr > 1000) ? A2(
											elm$core$List$cons,
											x,
											A2(
												elm$core$List$cons,
												y,
												A2(
													elm$core$List$cons,
													z,
													A2(
														elm$core$List$cons,
														w,
														A2(elm$core$List$takeTailRec, n - 4, tl))))) : A2(
											elm$core$List$cons,
											x,
											A2(
												elm$core$List$cons,
												y,
												A2(
													elm$core$List$cons,
													z,
													A2(
														elm$core$List$cons,
														w,
														A3(elm$core$List$takeFast, ctr + 1, n - 4, tl)))));
									} else {
										break _n0$5;
									}
							}
						} else {
							if (_n0.a === 1) {
								break _n0$1;
							} else {
								break _n0$5;
							}
						}
					}
				}
				return list;
			}
			var _n1 = _n0.b;
			var x = _n1.a;
			return _List_fromArray(
				[x]);
		}
	});
var elm$core$List$take = F2(
	function (n, list) {
		return A3(elm$core$List$takeFast, 0, n, list);
	});
var folkertdev$elm_deque$Internal$rebalance = function (deque) {
	var sizeF = deque.af;
	var sizeR = deque.ag;
	var front = deque.aq;
	var rear = deque.au;
	var size1 = ((sizeF + sizeR) / 2) | 0;
	var size2 = (sizeF + sizeR) - size1;
	var balanceConstant = 4;
	if ((sizeF + sizeR) < 2) {
		return deque;
	} else {
		if (_Utils_cmp(sizeF, (balanceConstant * sizeR) + 1) > 0) {
			var newRear = _Utils_ap(
				rear,
				elm$core$List$reverse(
					A2(elm$core$List$drop, size1, front)));
			var newFront = A2(elm$core$List$take, size1, front);
			return _Utils_update(
				deque,
				{aq: newFront, au: newRear, af: size1, ag: size2});
		} else {
			if (_Utils_cmp(sizeR, (balanceConstant * sizeF) + 1) > 0) {
				var newRear = A2(elm$core$List$take, size1, rear);
				var newFront = _Utils_ap(
					front,
					elm$core$List$reverse(
						A2(elm$core$List$drop, size1, rear)));
				return _Utils_update(
					deque,
					{aq: newFront, au: newRear, af: size1, ag: size2});
			} else {
				return deque;
			}
		}
	}
};
var folkertdev$elm_deque$Internal$fromList = function (list) {
	return folkertdev$elm_deque$Internal$rebalance(
		_Utils_update(
			folkertdev$elm_deque$Internal$empty,
			{
				aq: list,
				af: elm$core$List$length(list)
			}));
};
var folkertdev$elm_deque$Deque$fromList = A2(elm$core$Basics$composeL, elm$core$Basics$identity, folkertdev$elm_deque$Internal$fromList);
var folkertdev$elm_deque$Deque$unwrap = function (_n0) {
	var boundedDeque = _n0;
	return boundedDeque;
};
var folkertdev$elm_deque$Internal$toList = function (deque) {
	return _Utils_ap(
		deque.aq,
		elm$core$List$reverse(deque.au));
};
var folkertdev$elm_deque$Deque$toList = A2(elm$core$Basics$composeL, folkertdev$elm_deque$Internal$toList, folkertdev$elm_deque$Deque$unwrap);
var folkertdev$one_true_path_experiment$LowLevel$Command$ClosePath = {$: 4};
var folkertdev$one_true_path_experiment$LowLevel$Command$CurveTo = function (a) {
	return {$: 1, a: a};
};
var folkertdev$one_true_path_experiment$LowLevel$Command$EllipticalArc = function (a) {
	return {$: 3, a: a};
};
var folkertdev$one_true_path_experiment$LowLevel$Command$LineTo = function (a) {
	return {$: 0, a: a};
};
var folkertdev$one_true_path_experiment$LowLevel$Command$QuadraticBezierCurveTo = function (a) {
	return {$: 2, a: a};
};
var folkertdev$one_true_path_experiment$LowLevel$Command$merge = F2(
	function (instruction1, instruction2) {
		var _n0 = _Utils_Tuple2(instruction1, instruction2);
		_n0$5:
		while (true) {
			switch (_n0.a.$) {
				case 0:
					if (!_n0.b.$) {
						var p1 = _n0.a.a;
						var p2 = _n0.b.a;
						return elm$core$Result$Ok(
							folkertdev$one_true_path_experiment$LowLevel$Command$LineTo(
								_Utils_ap(p1, p2)));
					} else {
						break _n0$5;
					}
				case 1:
					if (_n0.b.$ === 1) {
						var p1 = _n0.a.a;
						var p2 = _n0.b.a;
						return elm$core$Result$Ok(
							folkertdev$one_true_path_experiment$LowLevel$Command$CurveTo(
								_Utils_ap(p1, p2)));
					} else {
						break _n0$5;
					}
				case 2:
					if (_n0.b.$ === 2) {
						var p1 = _n0.a.a;
						var p2 = _n0.b.a;
						return elm$core$Result$Ok(
							folkertdev$one_true_path_experiment$LowLevel$Command$QuadraticBezierCurveTo(
								_Utils_ap(p1, p2)));
					} else {
						break _n0$5;
					}
				case 3:
					if (_n0.b.$ === 3) {
						var p1 = _n0.a.a;
						var p2 = _n0.b.a;
						return elm$core$Result$Ok(
							folkertdev$one_true_path_experiment$LowLevel$Command$EllipticalArc(
								_Utils_ap(p1, p2)));
					} else {
						break _n0$5;
					}
				default:
					if (_n0.b.$ === 4) {
						var _n1 = _n0.a;
						var _n2 = _n0.b;
						return elm$core$Result$Ok(folkertdev$one_true_path_experiment$LowLevel$Command$ClosePath);
					} else {
						break _n0$5;
					}
			}
		}
		return elm$core$Result$Err(
			_Utils_Tuple2(instruction1, instruction2));
	});
var folkertdev$one_true_path_experiment$SubPath$compressHelper = function (drawtos) {
	var folder = F2(
		function (instruction, _n3) {
			var previous = _n3.a;
			var accum = _n3.b;
			var _n2 = A2(folkertdev$one_true_path_experiment$LowLevel$Command$merge, previous, instruction);
			if (!_n2.$) {
				var merged = _n2.a;
				return _Utils_Tuple2(merged, accum);
			} else {
				return _Utils_Tuple2(
					instruction,
					A2(elm$core$List$cons, previous, accum));
			}
		});
	var _n0 = folkertdev$elm_deque$Deque$toList(drawtos);
	if (!_n0.b) {
		return folkertdev$elm_deque$Deque$empty;
	} else {
		var first = _n0.a;
		var rest = _n0.b;
		return folkertdev$elm_deque$Deque$fromList(
			elm$core$List$reverse(
				function (_n1) {
					var a = _n1.a;
					var b = _n1.b;
					return A2(elm$core$List$cons, a, b);
				}(
					A3(
						elm$core$List$foldl,
						folder,
						_Utils_Tuple2(first, _List_Nil),
						rest))));
	}
};
var folkertdev$one_true_path_experiment$SubPath$compress = function (subpath) {
	if (subpath.$ === 1) {
		return folkertdev$one_true_path_experiment$SubPath$Empty;
	} else {
		var data = subpath.a;
		return folkertdev$one_true_path_experiment$SubPath$SubPath(
			_Utils_update(
				data,
				{
					fc: folkertdev$one_true_path_experiment$SubPath$compressHelper(data.fc)
				}));
	}
};
var folkertdev$one_true_path_experiment$SubPath$defaultConfig = {cE: elm$core$Maybe$Nothing, cN: false};
var folkertdev$one_true_path_experiment$SubPath$optionFolder = F2(
	function (option, config) {
		if (!option.$) {
			var n = option.a;
			return _Utils_update(
				config,
				{
					cE: elm$core$Maybe$Just(n)
				});
		} else {
			return _Utils_update(
				config,
				{cN: true});
		}
	});
var folkertdev$svg_path_lowlevel$Path$LowLevel$Absolute = 1;
var folkertdev$svg_path_lowlevel$Path$LowLevel$ClosePath = {$: 8};
var folkertdev$svg_path_lowlevel$Path$LowLevel$CurveTo = F2(
	function (a, b) {
		return {$: 3, a: a, b: b};
	});
var folkertdev$svg_path_lowlevel$Path$LowLevel$EllipticalArc = F2(
	function (a, b) {
		return {$: 7, a: a, b: b};
	});
var folkertdev$svg_path_lowlevel$Path$LowLevel$LineTo = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var folkertdev$svg_path_lowlevel$Path$LowLevel$QuadraticBezierCurveTo = F2(
	function (a, b) {
		return {$: 5, a: a, b: b};
	});
var folkertdev$one_true_path_experiment$LowLevel$Command$toLowLevelDrawTo = function (drawto) {
	switch (drawto.$) {
		case 0:
			var coordinates = drawto.a;
			return A2(folkertdev$svg_path_lowlevel$Path$LowLevel$LineTo, 1, coordinates);
		case 1:
			var coordinates = drawto.a;
			return A2(folkertdev$svg_path_lowlevel$Path$LowLevel$CurveTo, 1, coordinates);
		case 2:
			var coordinates = drawto.a;
			return A2(folkertdev$svg_path_lowlevel$Path$LowLevel$QuadraticBezierCurveTo, 1, coordinates);
		case 3:
			var _arguments = drawto.a;
			return A2(folkertdev$svg_path_lowlevel$Path$LowLevel$EllipticalArc, 1, _arguments);
		default:
			return folkertdev$svg_path_lowlevel$Path$LowLevel$ClosePath;
	}
};
var folkertdev$svg_path_lowlevel$Path$LowLevel$MoveTo = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var folkertdev$one_true_path_experiment$LowLevel$Command$toLowLevelMoveTo = function (_n0) {
	var target = _n0;
	return A2(folkertdev$svg_path_lowlevel$Path$LowLevel$MoveTo, 1, target);
};
var folkertdev$one_true_path_experiment$SubPath$toLowLevel = function (subpath) {
	if (subpath.$ === 1) {
		return elm$core$Maybe$Nothing;
	} else {
		var moveto = subpath.a.fO;
		var drawtos = subpath.a.fc;
		return elm$core$Maybe$Just(
			{
				fc: A2(
					elm$core$List$map,
					folkertdev$one_true_path_experiment$LowLevel$Command$toLowLevelDrawTo,
					folkertdev$elm_deque$Deque$toList(drawtos)),
				fO: folkertdev$one_true_path_experiment$LowLevel$Command$toLowLevelMoveTo(moveto)
			});
	}
};
var folkertdev$svg_path_lowlevel$Path$LowLevel$DecimalPlaces = elm$core$Basics$identity;
var folkertdev$svg_path_lowlevel$Path$LowLevel$decimalPlaces = elm$core$Basics$identity;
var folkertdev$svg_path_lowlevel$Path$LowLevel$defaultConfig = {bV: elm$core$String$fromFloat};
var folkertdev$svg_path_lowlevel$Path$LowLevel$roundTo = F2(
	function (n, value) {
		if (!n) {
			return elm$core$String$fromInt(
				elm$core$Basics$round(value));
		} else {
			var sign = (value < 0.0) ? '-' : '';
			var exp = A2(elm$core$Basics$pow, 10, n);
			var raised = elm$core$Basics$abs(
				elm$core$Basics$round(value * exp));
			var decimals = raised % exp;
			return (!decimals) ? _Utils_ap(
				sign,
				elm$core$String$fromInt((raised / exp) | 0)) : (sign + (elm$core$String$fromInt((raised / exp) | 0) + ('.' + elm$core$String$fromInt(decimals))));
		}
	});
var folkertdev$svg_path_lowlevel$Path$LowLevel$optionFolder = F2(
	function (option, config) {
		var n = option;
		return _Utils_update(
			config,
			{
				bV: folkertdev$svg_path_lowlevel$Path$LowLevel$roundTo(n)
			});
	});
var folkertdev$svg_path_lowlevel$Path$LowLevel$accumulateOptions = A2(elm$core$List$foldl, folkertdev$svg_path_lowlevel$Path$LowLevel$optionFolder, folkertdev$svg_path_lowlevel$Path$LowLevel$defaultConfig);
var folkertdev$svg_path_lowlevel$Path$LowLevel$isEmpty = function (command) {
	switch (command.$) {
		case 0:
			var mode = command.a;
			var coordinates = command.b;
			return elm$core$List$isEmpty(coordinates);
		case 1:
			var mode = command.a;
			var coordinates = command.b;
			return elm$core$List$isEmpty(coordinates);
		case 2:
			var mode = command.a;
			var coordinates = command.b;
			return elm$core$List$isEmpty(coordinates);
		case 3:
			var mode = command.a;
			var coordinates = command.b;
			return elm$core$List$isEmpty(coordinates);
		case 4:
			var mode = command.a;
			var coordinates = command.b;
			return elm$core$List$isEmpty(coordinates);
		case 5:
			var mode = command.a;
			var coordinates = command.b;
			return elm$core$List$isEmpty(coordinates);
		case 6:
			var mode = command.a;
			var coordinates = command.b;
			return elm$core$List$isEmpty(coordinates);
		case 7:
			var mode = command.a;
			var _arguments = command.b;
			return elm$core$List$isEmpty(_arguments);
		default:
			return false;
	}
};
var elm$core$Char$toLower = _Char_toLower;
var elm$core$Char$toUpper = _Char_toUpper;
var elm$core$String$cons = _String_cons;
var elm$core$String$fromChar = function (_char) {
	return A2(elm$core$String$cons, _char, '');
};
var folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCharacter = F2(
	function (mode, character) {
		if (mode === 1) {
			return elm$core$String$fromChar(
				elm$core$Char$toUpper(character));
		} else {
			return elm$core$String$fromChar(
				elm$core$Char$toLower(character));
		}
	});
var folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCoordinate = F2(
	function (config, _n0) {
		var x = _n0.a;
		var y = _n0.b;
		return config.bV(x) + (',' + config.bV(y));
	});
var folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCoordinate2 = F2(
	function (config, _n0) {
		var c1 = _n0.a;
		var c2 = _n0.b;
		return A2(folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCoordinate, config, c1) + (' ' + A2(folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCoordinate, config, c2));
	});
var folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCoordinate3 = F2(
	function (config, _n0) {
		var c1 = _n0.a;
		var c2 = _n0.b;
		var c3 = _n0.c;
		return A2(folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCoordinate, config, c1) + (' ' + (A2(folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCoordinate, config, c2) + (' ' + A2(folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCoordinate, config, c3))));
	});
var folkertdev$svg_path_lowlevel$Path$LowLevel$encodeFlags = function (_n0) {
	var arcFlag = _n0.a;
	var direction = _n0.b;
	var _n1 = _Utils_Tuple2(arcFlag, direction);
	if (_n1.a === 1) {
		if (!_n1.b) {
			var _n2 = _n1.a;
			var _n3 = _n1.b;
			return _Utils_Tuple2(1, 0);
		} else {
			var _n6 = _n1.a;
			var _n7 = _n1.b;
			return _Utils_Tuple2(1, 1);
		}
	} else {
		if (!_n1.b) {
			var _n4 = _n1.a;
			var _n5 = _n1.b;
			return _Utils_Tuple2(0, 0);
		} else {
			var _n8 = _n1.a;
			var _n9 = _n1.b;
			return _Utils_Tuple2(0, 1);
		}
	}
};
var folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyEllipticalArcArgument = F2(
	function (config, _n0) {
		var radii = _n0.aW;
		var xAxisRotate = _n0.aJ;
		var arcFlag = _n0.c8;
		var direction = _n0.dk;
		var target = _n0.av;
		var _n1 = folkertdev$svg_path_lowlevel$Path$LowLevel$encodeFlags(
			_Utils_Tuple2(arcFlag, direction));
		var arc = _n1.a;
		var sweep = _n1.b;
		return A2(
			elm$core$String$join,
			' ',
			_List_fromArray(
				[
					A2(folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCoordinate, config, radii),
					elm$core$String$fromFloat(xAxisRotate),
					elm$core$String$fromInt(arc),
					elm$core$String$fromInt(sweep),
					A2(folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCoordinate, config, target)
				]));
	});
var folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyDrawTo = F2(
	function (config, command) {
		if (folkertdev$svg_path_lowlevel$Path$LowLevel$isEmpty(command)) {
			return '';
		} else {
			switch (command.$) {
				case 0:
					var mode = command.a;
					var coordinates = command.b;
					return _Utils_ap(
						A2(folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCharacter, mode, 'L'),
						A2(
							elm$core$String$join,
							' ',
							A2(
								elm$core$List$map,
								folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCoordinate(config),
								coordinates)));
				case 1:
					var mode = command.a;
					var coordinates = command.b;
					return elm$core$List$isEmpty(coordinates) ? '' : _Utils_ap(
						A2(folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCharacter, mode, 'H'),
						A2(
							elm$core$String$join,
							' ',
							A2(elm$core$List$map, elm$core$String$fromFloat, coordinates)));
				case 2:
					var mode = command.a;
					var coordinates = command.b;
					return _Utils_ap(
						A2(folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCharacter, mode, 'V'),
						A2(
							elm$core$String$join,
							' ',
							A2(elm$core$List$map, elm$core$String$fromFloat, coordinates)));
				case 3:
					var mode = command.a;
					var coordinates = command.b;
					return _Utils_ap(
						A2(folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCharacter, mode, 'C'),
						A2(
							elm$core$String$join,
							' ',
							A2(
								elm$core$List$map,
								folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCoordinate3(config),
								coordinates)));
				case 4:
					var mode = command.a;
					var coordinates = command.b;
					return _Utils_ap(
						A2(folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCharacter, mode, 'S'),
						A2(
							elm$core$String$join,
							' ',
							A2(
								elm$core$List$map,
								folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCoordinate2(config),
								coordinates)));
				case 5:
					var mode = command.a;
					var coordinates = command.b;
					return _Utils_ap(
						A2(folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCharacter, mode, 'Q'),
						A2(
							elm$core$String$join,
							' ',
							A2(
								elm$core$List$map,
								folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCoordinate2(config),
								coordinates)));
				case 6:
					var mode = command.a;
					var coordinates = command.b;
					return _Utils_ap(
						A2(folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCharacter, mode, 'T'),
						A2(
							elm$core$String$join,
							' ',
							A2(
								elm$core$List$map,
								folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCoordinate(config),
								coordinates)));
				case 7:
					var mode = command.a;
					var _arguments = command.b;
					return _Utils_ap(
						A2(folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCharacter, mode, 'A'),
						A2(
							elm$core$String$join,
							' ',
							A2(
								elm$core$List$map,
								folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyEllipticalArcArgument(config),
								_arguments)));
				default:
					return 'Z';
			}
		}
	});
var folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyMoveTo = F2(
	function (config, _n0) {
		var mode = _n0.a;
		var coordinate = _n0.b;
		if (mode === 1) {
			return 'M' + A2(folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCoordinate, config, coordinate);
		} else {
			return 'm' + A2(folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCoordinate, config, coordinate);
		}
	});
var folkertdev$svg_path_lowlevel$Path$LowLevel$toStringSubPath = F2(
	function (config, _n0) {
		var moveto = _n0.fO;
		var drawtos = _n0.fc;
		return A2(folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyMoveTo, config, moveto) + (' ' + A2(
			elm$core$String$join,
			' ',
			A2(
				elm$core$List$map,
				folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyDrawTo(config),
				drawtos)));
	});
var folkertdev$svg_path_lowlevel$Path$LowLevel$toStringWith = F2(
	function (options, subpaths) {
		var config = folkertdev$svg_path_lowlevel$Path$LowLevel$accumulateOptions(options);
		return A2(
			elm$core$String$join,
			' ',
			A2(
				elm$core$List$map,
				folkertdev$svg_path_lowlevel$Path$LowLevel$toStringSubPath(config),
				subpaths));
	});
var folkertdev$one_true_path_experiment$SubPath$toStringWith = F2(
	function (options, subpath) {
		var config = A3(elm$core$List$foldl, folkertdev$one_true_path_experiment$SubPath$optionFolder, folkertdev$one_true_path_experiment$SubPath$defaultConfig, options);
		var lowLevelOptions = function () {
			var _n0 = config.cE;
			if (_n0.$ === 1) {
				return _List_Nil;
			} else {
				var n = _n0.a;
				return _List_fromArray(
					[
						folkertdev$svg_path_lowlevel$Path$LowLevel$decimalPlaces(n)
					]);
			}
		}();
		return A2(
			elm$core$Maybe$withDefault,
			'',
			A2(
				elm$core$Maybe$map,
				A2(
					elm$core$Basics$composeL,
					folkertdev$svg_path_lowlevel$Path$LowLevel$toStringWith(lowLevelOptions),
					elm$core$List$singleton),
				folkertdev$one_true_path_experiment$SubPath$toLowLevel(
					(config.cN ? folkertdev$one_true_path_experiment$SubPath$compress : elm$core$Basics$identity)(subpath))));
	});
var folkertdev$one_true_path_experiment$SubPath$toString = function (subpath) {
	return A2(folkertdev$one_true_path_experiment$SubPath$toStringWith, _List_Nil, subpath);
};
var folkertdev$one_true_path_experiment$Path$toString = A2(
	elm$core$Basics$composeL,
	elm$core$String$join(' '),
	elm$core$List$map(folkertdev$one_true_path_experiment$SubPath$toString));
var folkertdev$one_true_path_experiment$Path$element = F2(
	function (path, attributes) {
		return A2(
			elm$svg$Svg$path,
			A2(
				elm$core$List$cons,
				elm$svg$Svg$Attributes$d(
					folkertdev$one_true_path_experiment$Path$toString(path)),
				attributes),
			_List_Nil);
	});
var elm$core$Basics$acos = _Basics_acos;
var elm$core$Basics$atan2 = _Basics_atan2;
var elm$core$Basics$cos = _Basics_cos;
var elm$core$Basics$sin = _Basics_sin;
var folkertdev$one_true_path_experiment$LowLevel$Command$MoveTo = elm$core$Basics$identity;
var folkertdev$one_true_path_experiment$LowLevel$Command$moveTo = elm$core$Basics$identity;
var folkertdev$elm_deque$Internal$popBack = function (deque) {
	var front = deque.aq;
	var rear = deque.au;
	var _n0 = _Utils_Tuple2(front, rear);
	if (!_n0.b.b) {
		if (!_n0.a.b) {
			return _Utils_Tuple2(elm$core$Maybe$Nothing, folkertdev$elm_deque$Internal$empty);
		} else {
			if (!_n0.a.b.b) {
				var _n1 = _n0.a;
				var x = _n1.a;
				return _Utils_Tuple2(
					elm$core$Maybe$Just(x),
					folkertdev$elm_deque$Internal$empty);
			} else {
				return _Utils_Tuple2(elm$core$Maybe$Nothing, folkertdev$elm_deque$Internal$empty);
			}
		}
	} else {
		var _n2 = _n0.b;
		var r = _n2.a;
		var rs = _n2.b;
		return _Utils_Tuple2(
			elm$core$Maybe$Just(r),
			folkertdev$elm_deque$Internal$rebalance(
				_Utils_update(
					deque,
					{au: rs, ag: deque.ag - 1})));
	}
};
var folkertdev$elm_deque$Deque$popBack = A2(
	elm$core$Basics$composeL,
	A2(
		elm$core$Basics$composeL,
		elm$core$Tuple$mapSecond(elm$core$Basics$identity),
		folkertdev$elm_deque$Internal$popBack),
	folkertdev$elm_deque$Deque$unwrap);
var folkertdev$elm_deque$Deque$mapAbstract = F2(
	function (f, _n0) {
		var _abstract = _n0;
		return f(_abstract);
	});
var folkertdev$elm_deque$Deque$pushBack = F2(
	function (elem, _n0) {
		var deque = _n0;
		return A2(
			folkertdev$elm_deque$Deque$mapAbstract,
			folkertdev$elm_deque$Internal$rebalance,
			_Utils_update(
				deque,
				{
					au: A2(elm$core$List$cons, elem, deque.au),
					ag: deque.ag + 1
				}));
	});
var folkertdev$one_true_path_experiment$LowLevel$Command$closePath = folkertdev$one_true_path_experiment$LowLevel$Command$ClosePath;
var folkertdev$one_true_path_experiment$SubPath$close = function (subpath) {
	if (subpath.$ === 1) {
		return folkertdev$one_true_path_experiment$SubPath$Empty;
	} else {
		var moveto = subpath.a.fO;
		var drawtos = subpath.a.fc;
		var _n1 = folkertdev$elm_deque$Deque$popBack(drawtos);
		if ((!_n1.a.$) && (_n1.a.a.$ === 4)) {
			var _n2 = _n1.a.a;
			var preceding = _n1.b;
			return subpath;
		} else {
			return folkertdev$one_true_path_experiment$SubPath$SubPath(
				{
					fc: A2(folkertdev$elm_deque$Deque$pushBack, folkertdev$one_true_path_experiment$LowLevel$Command$closePath, drawtos),
					fO: moveto
				});
		}
	}
};
var folkertdev$one_true_path_experiment$LowLevel$Command$lineTo = folkertdev$one_true_path_experiment$LowLevel$Command$LineTo;
var folkertdev$one_true_path_experiment$SubPath$firstPoint = function (_n0) {
	var moveto = _n0.fO;
	var p = moveto;
	return p;
};
var folkertdev$one_true_path_experiment$SubPath$map2 = F3(
	function (f, sub1, sub2) {
		var _n0 = _Utils_Tuple2(sub1, sub2);
		if (_n0.a.$ === 1) {
			if (_n0.b.$ === 1) {
				var _n1 = _n0.a;
				var _n2 = _n0.b;
				return folkertdev$one_true_path_experiment$SubPath$Empty;
			} else {
				var _n3 = _n0.a;
				var subpath = _n0.b;
				return subpath;
			}
		} else {
			if (_n0.b.$ === 1) {
				var subpath = _n0.a;
				var _n4 = _n0.b;
				return subpath;
			} else {
				var a = _n0.a.a;
				var b = _n0.b.a;
				return A2(f, a, b);
			}
		}
	});
var folkertdev$one_true_path_experiment$SubPath$pushBack = F2(
	function (drawto, data) {
		return _Utils_update(
			data,
			{
				fc: A2(folkertdev$elm_deque$Deque$pushBack, drawto, data.fc)
			});
	});
var folkertdev$elm_deque$Internal$length = function (deque) {
	return deque.af + deque.ag;
};
var folkertdev$elm_deque$Internal$isEmpty = function (deque) {
	return !folkertdev$elm_deque$Internal$length(deque);
};
var folkertdev$elm_deque$Deque$isEmpty = A2(elm$core$Basics$composeL, folkertdev$elm_deque$Internal$isEmpty, folkertdev$elm_deque$Deque$unwrap);
var folkertdev$elm_deque$Deque$append = F2(
	function (p, q) {
		var x = p;
		var y = q;
		return folkertdev$elm_deque$Deque$isEmpty(p) ? q : (folkertdev$elm_deque$Deque$isEmpty(q) ? p : {
			aq: _Utils_ap(
				x.aq,
				elm$core$List$reverse(x.au)),
			au: elm$core$List$reverse(
				_Utils_ap(
					y.aq,
					elm$core$List$reverse(y.au))),
			af: x.af + x.ag,
			ag: y.af + y.ag
		});
	});
var folkertdev$one_true_path_experiment$SubPath$unsafeConcatenate = F2(
	function (a, b) {
		return _Utils_update(
			a,
			{
				fc: A2(folkertdev$elm_deque$Deque$append, a.fc, b.fc)
			});
	});
var folkertdev$one_true_path_experiment$SubPath$connect = function () {
	var helper = F2(
		function (right, left) {
			return folkertdev$one_true_path_experiment$SubPath$SubPath(
				A2(
					folkertdev$one_true_path_experiment$SubPath$unsafeConcatenate,
					A2(
						folkertdev$one_true_path_experiment$SubPath$pushBack,
						folkertdev$one_true_path_experiment$LowLevel$Command$lineTo(
							_List_fromArray(
								[
									folkertdev$one_true_path_experiment$SubPath$firstPoint(right)
								])),
						left),
					right));
		});
	return folkertdev$one_true_path_experiment$SubPath$map2(helper);
}();
var folkertdev$one_true_path_experiment$SubPath$with = F2(
	function (moveto, drawtos) {
		return folkertdev$one_true_path_experiment$SubPath$SubPath(
			{
				fc: folkertdev$elm_deque$Deque$fromList(drawtos),
				fO: moveto
			});
	});
var folkertdev$one_true_path_experiment$LowLevel$Command$arcTo = folkertdev$one_true_path_experiment$LowLevel$Command$EllipticalArc;
var folkertdev$svg_path_lowlevel$Path$LowLevel$LargestArc = 1;
var folkertdev$one_true_path_experiment$LowLevel$Command$largestArc = 1;
var folkertdev$one_true_path_experiment$SubPath$empty = folkertdev$one_true_path_experiment$SubPath$Empty;
var folkertdev$svg_path_lowlevel$Path$LowLevel$SmallestArc = 0;
var folkertdev$one_true_path_experiment$LowLevel$Command$smallestArc = 0;
var gampleman$elm_visualization$Shape$Pie$boolToArc = function (b) {
	return b ? folkertdev$one_true_path_experiment$LowLevel$Command$largestArc : folkertdev$one_true_path_experiment$LowLevel$Command$smallestArc;
};
var folkertdev$svg_path_lowlevel$Path$LowLevel$Clockwise = 0;
var folkertdev$one_true_path_experiment$LowLevel$Command$clockwise = 0;
var folkertdev$svg_path_lowlevel$Path$LowLevel$CounterClockwise = 1;
var folkertdev$one_true_path_experiment$LowLevel$Command$counterClockwise = 1;
var gampleman$elm_visualization$Shape$Pie$boolToDirection = function (b) {
	return b ? folkertdev$one_true_path_experiment$LowLevel$Command$counterClockwise : folkertdev$one_true_path_experiment$LowLevel$Command$clockwise;
};
var gampleman$elm_visualization$Shape$Pie$epsilon = 1.0e-12;
var elm$core$Basics$truncate = _Basics_truncate;
var gampleman$elm_visualization$Shape$Pie$mod = F2(
	function (a, b) {
		var frac = a / b;
		return (frac - (frac | 0)) * b;
	});
var gampleman$elm_visualization$Shape$Pie$arc_ = F6(
	function (x, y, radius, a0, a1, ccw) {
		var tau = 2 * elm$core$Basics$pi;
		var r = elm$core$Basics$abs(radius);
		var dy = r * elm$core$Basics$sin(a0);
		var y0_ = y + dy;
		var dx = r * elm$core$Basics$cos(a0);
		var x0_ = x + dx;
		var origin = folkertdev$one_true_path_experiment$LowLevel$Command$moveTo(
			_Utils_Tuple2(x0_, y0_));
		var da = ccw ? (a0 - a1) : (a1 - a0);
		var cw = gampleman$elm_visualization$Shape$Pie$boolToDirection(!ccw);
		if (!r) {
			return folkertdev$one_true_path_experiment$SubPath$empty;
		} else {
			if (_Utils_cmp(da, tau - gampleman$elm_visualization$Shape$Pie$epsilon) > 0) {
				return A2(
					folkertdev$one_true_path_experiment$SubPath$with,
					origin,
					_List_fromArray(
						[
							folkertdev$one_true_path_experiment$LowLevel$Command$arcTo(
							_List_fromArray(
								[
									{
									c8: folkertdev$one_true_path_experiment$LowLevel$Command$largestArc,
									dk: cw,
									aW: _Utils_Tuple2(r, r),
									av: _Utils_Tuple2(x - dx, y - dy),
									aJ: 0
								}
								])),
							folkertdev$one_true_path_experiment$LowLevel$Command$arcTo(
							_List_fromArray(
								[
									{
									c8: folkertdev$one_true_path_experiment$LowLevel$Command$largestArc,
									dk: cw,
									aW: _Utils_Tuple2(r, r),
									av: _Utils_Tuple2(x0_, y0_),
									aJ: 0
								}
								]))
						]));
			} else {
				var da_ = (da < 0) ? (A2(gampleman$elm_visualization$Shape$Pie$mod, da, tau) + tau) : da;
				return A2(
					folkertdev$one_true_path_experiment$SubPath$with,
					origin,
					_List_fromArray(
						[
							folkertdev$one_true_path_experiment$LowLevel$Command$arcTo(
							_List_fromArray(
								[
									{
									c8: gampleman$elm_visualization$Shape$Pie$boolToArc(
										_Utils_cmp(da_, elm$core$Basics$pi) > -1),
									dk: cw,
									aW: _Utils_Tuple2(r, r),
									av: _Utils_Tuple2(
										x + (r * elm$core$Basics$cos(a1)),
										y + (r * elm$core$Basics$sin(a1))),
									aJ: 0
								}
								]))
						]));
			}
		}
	});
var gampleman$elm_visualization$Shape$Pie$cornerTangents = F7(
	function (x0, y0, x1, y1, r1, rc, cw) {
		var y01 = y0 - y1;
		var x01 = x0 - x1;
		var r = r1 - rc;
		var lo = (cw ? rc : (-rc)) / elm$core$Basics$sqrt(
			A2(elm$core$Basics$pow, x01, 2) + A2(elm$core$Basics$pow, y01, 2));
		var ox = lo * y01;
		var x10 = x1 + ox;
		var x11 = x0 + ox;
		var x00 = (x11 + x10) / 2;
		var oy = (-lo) * x01;
		var y10 = y1 + oy;
		var y11 = y0 + oy;
		var y00 = (y11 + y10) / 2;
		var dy = y10 - y11;
		var dx = x10 - x11;
		var dd = (x11 * y10) - (x10 * y11);
		var d2 = A2(elm$core$Basics$pow, dx, 2) + A2(elm$core$Basics$pow, dy, 2);
		var d = ((dy < 0) ? (-1) : 1) * elm$core$Basics$sqrt(
			A2(
				elm$core$Basics$max,
				0,
				(A2(elm$core$Basics$pow, r, 2) * d2) - A2(elm$core$Basics$pow, dd, 2)));
		var cy1 = (((-dd) * dx) + (dy * d)) / d2;
		var dy1 = cy1 - y00;
		var cy0 = (((-dd) * dx) - (dy * d)) / d2;
		var dy0 = cy0 - y00;
		var cx1 = ((dd * dy) + (dx * d)) / d2;
		var dx1 = cx1 - x00;
		var cx0 = ((dd * dy) - (dx * d)) / d2;
		var dx0 = cx0 - x00;
		var _n0 = (_Utils_cmp(
			A2(elm$core$Basics$pow, dx0, 2) + A2(elm$core$Basics$pow, dy0, 2),
			A2(elm$core$Basics$pow, dx1, 2) + A2(elm$core$Basics$pow, dy1, 2)) > 0) ? _Utils_Tuple2(cx1, cy1) : _Utils_Tuple2(cx0, cy0);
		var fcx = _n0.a;
		var fxy = _n0.b;
		return {N: fcx, O: fxy, ah: -ox, aI: fcx * ((r1 / r) - 1), ai: -oy, aK: fxy * ((r1 / r) - 1)};
	});
var gampleman$elm_visualization$Shape$Pie$intersect = F8(
	function (x0, y0, x1, y1, x2, y2, x3, y3) {
		var y32 = y3 - y2;
		var y10 = y1 - y0;
		var x32 = x3 - x2;
		var x10 = x1 - x0;
		var t = ((x32 * (y0 - y2)) - (y32 * (x0 - x2))) / ((y32 * x10) - (x32 * y10));
		return _Utils_Tuple2(x0 + (t * x10), y0 + (t * y10));
	});
var folkertdev$elm_deque$Internal$foldl = F3(
	function (f, initial, deque) {
		return function (initial_) {
			return A3(elm$core$List$foldr, f, initial_, deque.au);
		}(
			A3(elm$core$List$foldl, f, initial, deque.aq));
	});
var folkertdev$elm_deque$Deque$foldl = F2(
	function (f, initial) {
		return A2(
			elm$core$Basics$composeL,
			A2(folkertdev$elm_deque$Internal$foldl, f, initial),
			folkertdev$elm_deque$Deque$unwrap);
	});
var elm_community$list_extra$List$Extra$last = function (items) {
	last:
	while (true) {
		if (!items.b) {
			return elm$core$Maybe$Nothing;
		} else {
			if (!items.b.b) {
				var x = items.a;
				return elm$core$Maybe$Just(x);
			} else {
				var rest = items.b;
				var $temp$items = rest;
				items = $temp$items;
				continue last;
			}
		}
	}
};
var folkertdev$one_true_path_experiment$LowLevel$Command$updateCursorState = F2(
	function (drawto, state) {
		var noControlPoint = function (currentState) {
			return _Utils_update(
				currentState,
				{G: elm$core$Maybe$Nothing});
		};
		var maybeUpdateCursor = function (coordinate) {
			return _Utils_update(
				state,
				{
					o: A2(elm$core$Maybe$withDefault, state.o, coordinate)
				});
		};
		var _n0 = state.o;
		var cursorX = _n0.a;
		var cursorY = _n0.b;
		switch (drawto.$) {
			case 0:
				var coordinates = drawto.a;
				return noControlPoint(
					maybeUpdateCursor(
						elm_community$list_extra$List$Extra$last(coordinates)));
			case 1:
				var coordinates = drawto.a;
				var _n2 = elm_community$list_extra$List$Extra$last(coordinates);
				if (_n2.$ === 1) {
					return state;
				} else {
					var _n3 = _n2.a;
					var control1 = _n3.a;
					var control2 = _n3.b;
					var target = _n3.c;
					return _Utils_update(
						state,
						{
							o: target,
							G: elm$core$Maybe$Just(control2)
						});
				}
			case 2:
				var coordinates = drawto.a;
				var _n4 = elm_community$list_extra$List$Extra$last(coordinates);
				if (_n4.$ === 1) {
					return state;
				} else {
					var _n5 = _n4.a;
					var control = _n5.a;
					var target = _n5.b;
					return _Utils_update(
						state,
						{
							o: target,
							G: elm$core$Maybe$Just(control)
						});
				}
			case 3:
				var _arguments = drawto.a;
				return noControlPoint(
					maybeUpdateCursor(
						A2(
							elm$core$Maybe$map,
							function ($) {
								return $.av;
							},
							elm_community$list_extra$List$Extra$last(_arguments))));
			default:
				return noControlPoint(state);
		}
	});
var folkertdev$one_true_path_experiment$SubPath$finalCursorState = function (_n0) {
	var moveto = _n0.fO;
	var drawtos = _n0.fc;
	var _n1 = moveto;
	var start = _n1;
	var initial = {o: start, G: elm$core$Maybe$Nothing, aE: start};
	return A3(folkertdev$elm_deque$Deque$foldl, folkertdev$one_true_path_experiment$LowLevel$Command$updateCursorState, initial, drawtos);
};
var folkertdev$one_true_path_experiment$SubPath$finalPoint = A2(
	elm$core$Basics$composeR,
	folkertdev$one_true_path_experiment$SubPath$finalCursorState,
	function ($) {
		return $.o;
	});
var folkertdev$elm_deque$Internal$map = F2(
	function (f, deque) {
		return {
			aq: A2(elm$core$List$map, f, deque.aq),
			au: A2(elm$core$List$map, f, deque.au),
			af: deque.af,
			ag: deque.ag
		};
	});
var folkertdev$elm_deque$Deque$map = function (f) {
	return folkertdev$elm_deque$Deque$mapAbstract(
		folkertdev$elm_deque$Internal$map(f));
};
var folkertdev$one_true_path_experiment$LowLevel$Command$mapTuple2 = F2(
	function (f, _n0) {
		var a = _n0.a;
		var b = _n0.b;
		return _Utils_Tuple2(
			f(a),
			f(b));
	});
var folkertdev$one_true_path_experiment$LowLevel$Command$mapTuple3 = F2(
	function (f, _n0) {
		var a = _n0.a;
		var b = _n0.b;
		var c = _n0.c;
		return _Utils_Tuple3(
			f(a),
			f(b),
			f(c));
	});
var folkertdev$one_true_path_experiment$LowLevel$Command$mapCoordinateDrawTo = F2(
	function (f, drawto) {
		switch (drawto.$) {
			case 0:
				var coordinates = drawto.a;
				return folkertdev$one_true_path_experiment$LowLevel$Command$LineTo(
					A2(elm$core$List$map, f, coordinates));
			case 1:
				var coordinates = drawto.a;
				return folkertdev$one_true_path_experiment$LowLevel$Command$CurveTo(
					A2(
						elm$core$List$map,
						folkertdev$one_true_path_experiment$LowLevel$Command$mapTuple3(f),
						coordinates));
			case 2:
				var coordinates = drawto.a;
				return folkertdev$one_true_path_experiment$LowLevel$Command$QuadraticBezierCurveTo(
					A2(
						elm$core$List$map,
						folkertdev$one_true_path_experiment$LowLevel$Command$mapTuple2(f),
						coordinates));
			case 3:
				var _arguments = drawto.a;
				return folkertdev$one_true_path_experiment$LowLevel$Command$EllipticalArc(
					A2(
						elm$core$List$map,
						function (argument) {
							return _Utils_update(
								argument,
								{
									av: f(argument.av)
								});
						},
						_arguments));
			default:
				return folkertdev$one_true_path_experiment$LowLevel$Command$ClosePath;
		}
	});
var folkertdev$one_true_path_experiment$SubPath$mapCoordinateInstructions = F2(
	function (f, _n0) {
		var moveto = _n0.fO;
		var drawtos = _n0.fc;
		var coordinate = moveto;
		return {
			fc: A2(
				folkertdev$elm_deque$Deque$map,
				folkertdev$one_true_path_experiment$LowLevel$Command$mapCoordinateDrawTo(f),
				drawtos),
			fO: f(coordinate)
		};
	});
var ianmackenzie$elm_geometry$Vector2d$difference = F2(
	function (firstVector, secondVector) {
		var _n0 = ianmackenzie$elm_geometry$Vector2d$components(secondVector);
		var x2 = _n0.a;
		var y2 = _n0.b;
		var _n1 = ianmackenzie$elm_geometry$Vector2d$components(firstVector);
		var x1 = _n1.a;
		var y1 = _n1.b;
		return ianmackenzie$elm_geometry$Vector2d$fromComponents(
			_Utils_Tuple2(x1 - x2, y1 - y2));
	});
var folkertdev$one_true_path_experiment$SubPath$continue = function () {
	var helper = F2(
		function (right, left) {
			var distance = A2(
				ianmackenzie$elm_geometry$Vector2d$difference,
				ianmackenzie$elm_geometry$Vector2d$fromComponents(
					folkertdev$one_true_path_experiment$SubPath$finalPoint(left)),
				ianmackenzie$elm_geometry$Vector2d$fromComponents(
					folkertdev$one_true_path_experiment$SubPath$firstPoint(right)));
			var mapper = A2(
				elm$core$Basics$composeL,
				A2(
					elm$core$Basics$composeL,
					ianmackenzie$elm_geometry$Vector2d$components,
					ianmackenzie$elm_geometry$Vector2d$sum(distance)),
				ianmackenzie$elm_geometry$Vector2d$fromComponents);
			return folkertdev$one_true_path_experiment$SubPath$SubPath(
				A2(
					folkertdev$one_true_path_experiment$SubPath$unsafeConcatenate,
					left,
					A2(folkertdev$one_true_path_experiment$SubPath$mapCoordinateInstructions, mapper, right)));
		});
	return folkertdev$one_true_path_experiment$SubPath$map2(helper);
}();
var gampleman$elm_visualization$Shape$Pie$makeArc = F6(
	function (x, y, radius, a0, a1, ccw) {
		return folkertdev$one_true_path_experiment$SubPath$continue(
			A6(gampleman$elm_visualization$Shape$Pie$arc_, x, y, radius, a0, a1, ccw));
	});
var elm$core$Basics$asin = _Basics_asin;
var gampleman$elm_visualization$Shape$Pie$myAsin = function (x) {
	return (x >= 1) ? (elm$core$Basics$pi / 2) : ((_Utils_cmp(x, -1) < 1) ? ((-elm$core$Basics$pi) / 2) : elm$core$Basics$asin(x));
};
var gampleman$elm_visualization$Shape$Pie$arc = function (arcData) {
	var a1 = arcData.bT - (elm$core$Basics$pi / 2);
	var a0 = arcData.cc - (elm$core$Basics$pi / 2);
	var cw = _Utils_cmp(a1, a0) > 0;
	var da = elm$core$Basics$abs(a1 - a0);
	var _n0 = (_Utils_cmp(arcData.bY, arcData.bu) > 0) ? _Utils_Tuple2(arcData.bu, arcData.bY) : _Utils_Tuple2(arcData.bY, arcData.bu);
	var r0 = _n0.a;
	var r1 = _n0.b;
	var path = function () {
		if (_Utils_cmp(r1, gampleman$elm_visualization$Shape$Pie$epsilon) < 1) {
			return _List_fromArray(
				[
					folkertdev$one_true_path_experiment$SubPath$close(
					A2(
						folkertdev$one_true_path_experiment$SubPath$with,
						folkertdev$one_true_path_experiment$LowLevel$Command$moveTo(
							_Utils_Tuple2(0, 0)),
						_List_Nil))
				]);
		} else {
			if (_Utils_cmp(da, (2 * elm$core$Basics$pi) - gampleman$elm_visualization$Shape$Pie$epsilon) > 0) {
				var p = A7(
					gampleman$elm_visualization$Shape$Pie$makeArc,
					0,
					0,
					r1,
					a0,
					a1,
					!cw,
					A2(
						folkertdev$one_true_path_experiment$SubPath$with,
						folkertdev$one_true_path_experiment$LowLevel$Command$moveTo(
							_Utils_Tuple2(
								r1 * elm$core$Basics$cos(a0),
								r1 * elm$core$Basics$sin(a0))),
						_List_Nil));
				return (_Utils_cmp(r0, gampleman$elm_visualization$Shape$Pie$epsilon) > 0) ? _List_fromArray(
					[
						p,
						folkertdev$one_true_path_experiment$SubPath$close(
						A7(
							gampleman$elm_visualization$Shape$Pie$makeArc,
							0,
							0,
							r0,
							a1,
							a0,
							cw,
							A2(
								folkertdev$one_true_path_experiment$SubPath$with,
								folkertdev$one_true_path_experiment$LowLevel$Command$moveTo(
									_Utils_Tuple2(
										r0 * elm$core$Basics$cos(a1),
										r0 * elm$core$Basics$sin(a1))),
								_List_Nil)))
					]) : _List_fromArray(
					[
						folkertdev$one_true_path_experiment$SubPath$close(p)
					]);
			} else {
				var rc = A2(
					elm$core$Basics$min,
					elm$core$Basics$abs(r1 - r0) / 2,
					arcData.cC);
				var ap = arcData.cU / 2;
				var rp = (_Utils_cmp(ap, gampleman$elm_visualization$Shape$Pie$epsilon) > 0) ? ((arcData.cV > 0) ? arcData.cV : elm$core$Basics$sqrt(
					A2(elm$core$Basics$pow, r0, 2) + A2(elm$core$Basics$pow, r1, 2))) : 0;
				var p0 = gampleman$elm_visualization$Shape$Pie$myAsin(
					(rp / r0) * elm$core$Basics$sin(ap));
				var p1 = gampleman$elm_visualization$Shape$Pie$myAsin(
					(rp / r1) * elm$core$Basics$sin(ap));
				var _n1 = (_Utils_cmp(rp, gampleman$elm_visualization$Shape$Pie$epsilon) > 0) ? ((_Utils_cmp(da - (p1 * 2), gampleman$elm_visualization$Shape$Pie$epsilon) > 0) ? (cw ? _Utils_Tuple3(a0 + p1, a1 - p1, da - (p1 * 2)) : _Utils_Tuple3(a0 - p1, a1 + p1, da - (p1 * 2))) : _Utils_Tuple3((a0 + a1) / 2, (a0 + a1) / 2, 0)) : _Utils_Tuple3(a0, a1, da);
				var a01 = _n1.a;
				var a11 = _n1.b;
				var da1 = _n1.c;
				var x01 = r1 * elm$core$Basics$cos(a01);
				var y01 = r1 * elm$core$Basics$sin(a01);
				var x11 = r1 * elm$core$Basics$cos(a11);
				var y11 = r1 * elm$core$Basics$sin(a11);
				var _n2 = (_Utils_cmp(rp, gampleman$elm_visualization$Shape$Pie$epsilon) > 0) ? ((_Utils_cmp(da - (p0 * 2), gampleman$elm_visualization$Shape$Pie$epsilon) > 0) ? (cw ? _Utils_Tuple3(a0 + p0, a1 - p0, da - (p0 * 2)) : _Utils_Tuple3(a0 - p0, a1 + p0, da - (p0 * 2))) : _Utils_Tuple3((a0 + a1) / 2, (a0 + a1) / 2, 0)) : _Utils_Tuple3(a0, a1, da);
				var a00 = _n2.a;
				var a10 = _n2.b;
				var da0 = _n2.c;
				var x00 = r0 * elm$core$Basics$cos(a00);
				var y00 = r0 * elm$core$Basics$sin(a00);
				var x10 = r0 * elm$core$Basics$cos(a10);
				var y10 = r0 * elm$core$Basics$sin(a10);
				var _n3 = (_Utils_cmp(da0, gampleman$elm_visualization$Shape$Pie$epsilon) > 0) ? A8(gampleman$elm_visualization$Shape$Pie$intersect, x01, y01, x00, y00, x11, y11, x10, y10) : _Utils_Tuple2(x10, y10);
				var ocx = _n3.a;
				var ocy = _n3.b;
				var lc = elm$core$Basics$sqrt(
					A2(elm$core$Basics$pow, ocx, 2) + A2(elm$core$Basics$pow, ocy, 2));
				var _n4 = _Utils_Tuple2(x11 - ocx, y11 - ocy);
				var bx = _n4.a;
				var by = _n4.b;
				var _n5 = _Utils_Tuple2(x01 - ocx, y01 - ocy);
				var ax = _n5.a;
				var ay = _n5.b;
				var kc = 1 / elm$core$Basics$sin(
					elm$core$Basics$acos(
						((ax * bx) + (ay * by)) / (elm$core$Basics$sqrt(
							A2(elm$core$Basics$pow, ax, 2) + A2(elm$core$Basics$pow, ay, 2)) * elm$core$Basics$sqrt(
							A2(elm$core$Basics$pow, bx, 2) + A2(elm$core$Basics$pow, by, 2)))) / 2);
				var _n6 = ((_Utils_cmp(rc, gampleman$elm_visualization$Shape$Pie$epsilon) > 0) && (_Utils_cmp(da, elm$core$Basics$pi) < 0)) ? _Utils_Tuple2(
					A2(elm$core$Basics$min, rc, (r0 - lc) / (kc - 1)),
					A2(elm$core$Basics$min, rc, (r1 - lc) / (kc + 1))) : _Utils_Tuple2(rc, rc);
				var rc0 = _n6.a;
				var rc1 = _n6.b;
				var outerRing = function () {
					if (_Utils_cmp(da1, gampleman$elm_visualization$Shape$Pie$epsilon) < 1) {
						return A2(
							folkertdev$one_true_path_experiment$SubPath$with,
							folkertdev$one_true_path_experiment$LowLevel$Command$moveTo(
								_Utils_Tuple2(x01, y01)),
							_List_Nil);
					} else {
						if (_Utils_cmp(rc1, gampleman$elm_visualization$Shape$Pie$epsilon) > 0) {
							var t1 = A7(gampleman$elm_visualization$Shape$Pie$cornerTangents, x11, y11, x10, y10, r1, rc1, cw);
							var t0 = A7(gampleman$elm_visualization$Shape$Pie$cornerTangents, x00, y00, x01, y01, r1, rc1, cw);
							var p = A2(
								folkertdev$one_true_path_experiment$SubPath$with,
								folkertdev$one_true_path_experiment$LowLevel$Command$moveTo(
									_Utils_Tuple2(t0.N + t0.ah, t0.O + t0.ai)),
								_List_Nil);
							return (_Utils_cmp(rc1, rc) < 0) ? A7(
								gampleman$elm_visualization$Shape$Pie$makeArc,
								t0.N,
								t0.O,
								rc1,
								A2(elm$core$Basics$atan2, t0.ai, t0.ah),
								A2(elm$core$Basics$atan2, t1.ai, t1.ah),
								!cw,
								p) : A7(
								gampleman$elm_visualization$Shape$Pie$makeArc,
								t1.N,
								t1.O,
								rc1,
								A2(elm$core$Basics$atan2, t1.aK, t1.aI),
								A2(elm$core$Basics$atan2, t1.ai, t1.ah),
								!cw,
								A7(
									gampleman$elm_visualization$Shape$Pie$makeArc,
									0,
									0,
									r1,
									A2(elm$core$Basics$atan2, t0.O + t0.aK, t0.N + t0.aI),
									A2(elm$core$Basics$atan2, t1.O + t1.aK, t1.N + t1.aI),
									!cw,
									A7(
										gampleman$elm_visualization$Shape$Pie$makeArc,
										t0.N,
										t0.O,
										rc1,
										A2(elm$core$Basics$atan2, t0.ai, t0.ah),
										A2(elm$core$Basics$atan2, t0.aK, t0.aI),
										!cw,
										p)));
						} else {
							return A7(
								gampleman$elm_visualization$Shape$Pie$makeArc,
								0,
								0,
								r1,
								a01,
								a11,
								!cw,
								A2(
									folkertdev$one_true_path_experiment$SubPath$with,
									folkertdev$one_true_path_experiment$LowLevel$Command$moveTo(
										_Utils_Tuple2(x01, y01)),
									_List_Nil));
						}
					}
				}();
				if ((_Utils_cmp(r0, gampleman$elm_visualization$Shape$Pie$epsilon) < 1) || (_Utils_cmp(da0, gampleman$elm_visualization$Shape$Pie$epsilon) < 1)) {
					return _List_fromArray(
						[
							folkertdev$one_true_path_experiment$SubPath$close(
							A2(
								folkertdev$one_true_path_experiment$SubPath$connect,
								A2(
									folkertdev$one_true_path_experiment$SubPath$with,
									folkertdev$one_true_path_experiment$LowLevel$Command$moveTo(
										_Utils_Tuple2(x10, y10)),
									_List_Nil),
								outerRing))
						]);
				} else {
					if (_Utils_cmp(rc0, gampleman$elm_visualization$Shape$Pie$epsilon) > 0) {
						var t1 = A7(gampleman$elm_visualization$Shape$Pie$cornerTangents, x01, y01, x00, y00, r0, -rc0, cw);
						var t0 = A7(gampleman$elm_visualization$Shape$Pie$cornerTangents, x10, y10, x11, y11, r0, -rc0, cw);
						var p = A2(
							folkertdev$one_true_path_experiment$SubPath$connect,
							A2(
								folkertdev$one_true_path_experiment$SubPath$with,
								folkertdev$one_true_path_experiment$LowLevel$Command$moveTo(
									_Utils_Tuple2(t0.N + t0.ah, t0.O + t0.ai)),
								_List_Nil),
							outerRing);
						return (_Utils_cmp(rc0, rc) < 0) ? _List_fromArray(
							[
								folkertdev$one_true_path_experiment$SubPath$close(
								A7(
									gampleman$elm_visualization$Shape$Pie$makeArc,
									t0.N,
									t0.O,
									rc0,
									A2(elm$core$Basics$atan2, t0.ai, t0.ah),
									A2(elm$core$Basics$atan2, t1.ai, t1.ah),
									!cw,
									p))
							]) : _List_fromArray(
							[
								folkertdev$one_true_path_experiment$SubPath$close(
								A7(
									gampleman$elm_visualization$Shape$Pie$makeArc,
									t1.N,
									t1.O,
									rc0,
									A2(elm$core$Basics$atan2, t1.aK, t1.aI),
									A2(elm$core$Basics$atan2, t1.ai, t1.ah),
									!cw,
									A7(
										gampleman$elm_visualization$Shape$Pie$makeArc,
										0,
										0,
										r0,
										A2(elm$core$Basics$atan2, t0.O + t0.aK, t0.N + t0.aI),
										A2(elm$core$Basics$atan2, t1.O + t1.aK, t1.N + t1.aI),
										cw,
										A7(
											gampleman$elm_visualization$Shape$Pie$makeArc,
											t0.N,
											t0.O,
											rc0,
											A2(elm$core$Basics$atan2, t0.ai, t0.ah),
											A2(elm$core$Basics$atan2, t0.aK, t0.aI),
											!cw,
											p))))
							]);
					} else {
						return _List_fromArray(
							[
								folkertdev$one_true_path_experiment$SubPath$close(
								A2(
									folkertdev$one_true_path_experiment$SubPath$connect,
									A6(gampleman$elm_visualization$Shape$Pie$arc_, 0, 0, r0, a10, a00, cw),
									outerRing))
							]);
					}
				}
			}
		}
	}();
	return path;
};
var gampleman$elm_visualization$Shape$arc = gampleman$elm_visualization$Shape$Pie$arc;
var elm$core$Array$fromListHelp = F3(
	function (list, nodeList, nodeListSize) {
		fromListHelp:
		while (true) {
			var _n0 = A2(elm$core$Elm$JsArray$initializeFromList, elm$core$Array$branchFactor, list);
			var jsArray = _n0.a;
			var remainingItems = _n0.b;
			if (_Utils_cmp(
				elm$core$Elm$JsArray$length(jsArray),
				elm$core$Array$branchFactor) < 0) {
				return A2(
					elm$core$Array$builderToArray,
					true,
					{y: nodeList, v: nodeListSize, x: jsArray});
			} else {
				var $temp$list = remainingItems,
					$temp$nodeList = A2(
					elm$core$List$cons,
					elm$core$Array$Leaf(jsArray),
					nodeList),
					$temp$nodeListSize = nodeListSize + 1;
				list = $temp$list;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue fromListHelp;
			}
		}
	});
var elm$core$Array$fromList = function (list) {
	if (!list.b) {
		return elm$core$Array$empty;
	} else {
		return A3(elm$core$Array$fromListHelp, list, _List_Nil, 0);
	}
};
var elm$core$Array$bitMask = 4294967295 >>> (32 - elm$core$Array$shiftStep);
var elm$core$Elm$JsArray$unsafeGet = _JsArray_unsafeGet;
var elm$core$Array$getHelp = F3(
	function (shift, index, tree) {
		getHelp:
		while (true) {
			var pos = elm$core$Array$bitMask & (index >>> shift);
			var _n0 = A2(elm$core$Elm$JsArray$unsafeGet, pos, tree);
			if (!_n0.$) {
				var subTree = _n0.a;
				var $temp$shift = shift - elm$core$Array$shiftStep,
					$temp$index = index,
					$temp$tree = subTree;
				shift = $temp$shift;
				index = $temp$index;
				tree = $temp$tree;
				continue getHelp;
			} else {
				var values = _n0.a;
				return A2(elm$core$Elm$JsArray$unsafeGet, elm$core$Array$bitMask & index, values);
			}
		}
	});
var elm$core$Array$tailIndex = function (len) {
	return (len >>> 5) << 5;
};
var elm$core$Array$get = F2(
	function (index, _n0) {
		var len = _n0.a;
		var startShift = _n0.b;
		var tree = _n0.c;
		var tail = _n0.d;
		return ((index < 0) || (_Utils_cmp(index, len) > -1)) ? elm$core$Maybe$Nothing : ((_Utils_cmp(
			index,
			elm$core$Array$tailIndex(len)) > -1) ? elm$core$Maybe$Just(
			A2(elm$core$Elm$JsArray$unsafeGet, elm$core$Array$bitMask & index, tail)) : elm$core$Maybe$Just(
			A3(elm$core$Array$getHelp, startShift, index, tree)));
	});
var elm$core$List$sortWith = _List_sortWith;
var elm$core$Tuple$pair = F2(
	function (a, b) {
		return _Utils_Tuple2(a, b);
	});
var gampleman$elm_visualization$Shape$Pie$pie = F2(
	function (settings, data) {
		var unsafeGet = F2(
			function (index, array) {
				unsafeGet:
				while (true) {
					var _n0 = A2(elm$core$Array$get, index, array);
					if (!_n0.$) {
						var v = _n0.a;
						return v;
					} else {
						var $temp$index = index,
							$temp$array = array;
						index = $temp$index;
						array = $temp$array;
						continue unsafeGet;
					}
				}
			});
		var summer = F2(
			function (a, b) {
				var v = settings.ex(a);
				return (v > 0) ? (v + b) : b;
			});
		var sum = A3(elm$core$List$foldr, summer, 0, data);
		var sortedIndices = A2(
			elm$core$Basics$composeL,
			A2(
				elm$core$Basics$composeL,
				elm$core$List$map(elm$core$Tuple$first),
				elm$core$List$sortWith(
					F2(
						function (_n2, _n3) {
							var a = _n2.b;
							var b = _n3.b;
							return A2(settings.ek, a, b);
						}))),
			elm$core$List$indexedMap(elm$core$Tuple$pair));
		var dataArray = elm$core$Array$fromList(data);
		var da = A2(
			elm$core$Basics$min,
			2 * elm$core$Basics$pi,
			A2(elm$core$Basics$max, (-2) * elm$core$Basics$pi, settings.bT - settings.cc));
		var p = A2(
			elm$core$Basics$min,
			elm$core$Basics$abs(da) / elm$core$List$length(data),
			settings.cU);
		var pa = p * ((da < 0) ? (-1) : 1);
		var k = (!sum) ? 0 : ((da - (elm$core$List$length(data) * pa)) / sum);
		var computeValue = F2(
			function (el, angle) {
				var value = settings.ex(el);
				return {
					cC: settings.cC,
					bT: (angle + ((value > 0) ? (value * k) : 0)) + pa,
					bY: settings.bY,
					bu: settings.bu,
					cU: p,
					cV: settings.cV,
					cc: angle
				};
			});
		var helper = F2(
			function (index, _n1) {
				var angle = _n1.a;
				var result = _n1.b;
				var r = A2(
					computeValue,
					A2(unsafeGet, index, dataArray),
					angle);
				return _Utils_Tuple2(
					r.bT,
					A3(elm$core$Dict$insert, index, r, result));
			});
		return elm$core$Dict$values(
			A3(
				elm$core$List$foldl,
				helper,
				_Utils_Tuple2(settings.cc, elm$core$Dict$empty),
				sortedIndices(data)).b);
	});
var gampleman$elm_visualization$Shape$pie = gampleman$elm_visualization$Shape$Pie$pie;
var author$project$Main$cardLabelArcs = F3(
	function (allLabels, card, context) {
		var radius = A2(author$project$Main$cardRadiusBase, card, context);
		var labelSegments = A2(
			gampleman$elm_visualization$Shape$pie,
			{
				cC: 0,
				bT: 2 * elm$core$Basics$pi,
				bY: radius,
				bu: radius + 3,
				cU: 0,
				cV: 0,
				ek: F2(
					function (_n0, _n1) {
						return 1;
					}),
				cc: 0,
				ex: elm$core$Basics$always(1.0)
			},
			A2(
				elm$core$List$repeat,
				elm$core$List$length(card.bk),
				1));
		return A3(
			elm$core$List$map2,
			F2(
				function (arc, label) {
					return A2(
						folkertdev$one_true_path_experiment$Path$element,
						gampleman$elm_visualization$Shape$arc(arc),
						_List_fromArray(
							[
								elm$svg$Svg$Attributes$fill('#' + label.cz)
							]));
				}),
			labelSegments,
			A2(
				elm$core$List$filterMap,
				function (a) {
					return A2(elm$core$Dict$get, a, allLabels);
				},
				card.bk));
	});
var author$project$Main$cardRadiusWithLabels = F2(
	function (card, context) {
		return A2(author$project$Main$cardRadiusBase, card, context) + 3;
	});
var author$project$Main$cardRadiusWithoutFlair = F2(
	function (card, context) {
		return A2(author$project$Main$cardRadiusWithLabels, card, context);
	});
var author$project$Main$flairRadiusBase = 20;
var author$project$Main$cardRadiusWithFlair = F2(
	function (card, context) {
		var reactionCounts = A2(
			elm$core$List$map,
			function ($) {
				return $.dh;
			},
			card.by);
		var highestFlair = A3(
			elm$core$List$foldl,
			F2(
				function (num, acc) {
					return A2(elm$core$Basics$max, num, acc);
				}),
			0,
			A2(elm$core$List$cons, card.bd, reactionCounts));
		return (A2(author$project$Main$cardRadiusWithoutFlair, card, context) + author$project$Main$flairRadiusBase) + highestFlair;
	});
var author$project$Main$emptyArc = {cC: 0, bT: 0, bY: 0, bu: 0, cU: 0, cV: 0, cc: 0};
var elm$svg$Svg$g = elm$svg$Svg$trustedNode('g');
var elm$svg$Svg$Attributes$class = _VirtualDom_attribute('class');
var author$project$Main$prCircle = F3(
	function (pr, card, context) {
		var radius = A2(author$project$Main$cardRadiusBase, card, context);
		var flairs = _List_fromArray(
			[
				_Utils_Tuple2('deletions', pr.e9),
				_Utils_Tuple2('additions', pr.eI)
			]);
		var segments = A2(
			gampleman$elm_visualization$Shape$pie,
			{
				cC: 0,
				bT: 2 * elm$core$Basics$pi,
				bY: 0,
				bu: radius,
				cU: 0,
				cV: 0,
				ek: F2(
					function (_n2, _n3) {
						return 1;
					}),
				cc: 0,
				ex: elm$core$Basics$toFloat
			},
			A2(elm$core$List$map, elm$core$Tuple$second, flairs));
		var segment = function (i) {
			var _n1 = A2(
				elm$core$List$take,
				1,
				A2(elm$core$List$drop, i, segments));
			if (_n1.b && (!_n1.b.b)) {
				var s = _n1.a;
				return s;
			} else {
				return A3(
					author$project$Log$debug,
					'impossible: empty segments',
					_Utils_Tuple2(i, segments),
					author$project$Main$emptyArc);
			}
		};
		return A2(
			elm$svg$Svg$g,
			_List_Nil,
			function (a) {
				return A2(elm$core$List$indexedMap, a, flairs);
			}(
				F2(
					function (i, _n0) {
						var classes = _n0.a;
						var count = _n0.b;
						var arc = segment(i);
						return A2(
							folkertdev$one_true_path_experiment$Path$element,
							gampleman$elm_visualization$Shape$arc(arc),
							_List_fromArray(
								[
									elm$svg$Svg$Attributes$class('pr-arc ' + classes)
								]));
					})));
	});
var elm$html$Html$img = _VirtualDom_node('img');
var elm$html$Html$span = _VirtualDom_node('span');
var elm$virtual_dom$VirtualDom$text = _VirtualDom_text;
var elm$html$Html$text = elm$virtual_dom$VirtualDom$text;
var elm$html$Html$Attributes$stringProperty = F2(
	function (key, string) {
		return A2(
			_VirtualDom_property,
			key,
			elm$json$Json$Encode$string(string));
	});
var elm$html$Html$Attributes$class = elm$html$Html$Attributes$stringProperty('className');
var elm$html$Html$Attributes$classList = function (classes) {
	return elm$html$Html$Attributes$class(
		A2(
			elm$core$String$join,
			' ',
			A2(
				elm$core$List$map,
				elm$core$Tuple$first,
				A2(elm$core$List$filter, elm$core$Tuple$second, classes))));
};
var elm$html$Html$Attributes$src = function (url) {
	return A2(
		elm$html$Html$Attributes$stringProperty,
		'src',
		_VirtualDom_noJavaScriptOrHtmlUri(url));
};
var elm$svg$Svg$foreignObject = elm$svg$Svg$trustedNode('foreignObject');
var elm$svg$Svg$Attributes$transform = _VirtualDom_attribute('transform');
var author$project$Main$reactionFlairArcs = F3(
	function (reviews, card, context) {
		var reactionTypeEmoji = function (type_) {
			switch (type_) {
				case 0:
					return '👍';
				case 1:
					return '👎';
				case 2:
					return '😄';
				case 4:
					return '😕';
				case 5:
					return '💖';
				case 3:
					return '🎉';
				case 6:
					return '🚀';
				default:
					return '👀';
			}
		};
		var radius = A2(author$project$Main$cardRadiusWithoutFlair, card, context);
		var prSegments = function () {
			var _n7 = card.cB;
			if (!_n7.$) {
				return _List_Nil;
			} else {
				var pr = _n7.a;
				var statusChecks = function () {
					var _n10 = A2(
						elm$core$Maybe$map,
						function ($) {
							return $.gq;
						},
						pr.fD);
					if ((!_n10.$) && (!_n10.a.$)) {
						var contexts = _n10.a.a.e1;
						return function (a) {
							return A2(elm$core$List$map, a, contexts);
						}(
							function (c) {
								return _Utils_Tuple3(
									A2(
										elm$html$Html$span,
										_List_fromArray(
											[
												elm$html$Html$Attributes$classList(
												_List_fromArray(
													[
														_Utils_Tuple2('status-icon', true),
														_Utils_Tuple2('octicon', true),
														_Utils_Tuple2(
														function () {
															var _n11 = c._;
															switch (_n11) {
																case 3:
																	return 'octicon-primitive-dot';
																case 4:
																	return 'octicon-check';
																case 2:
																	return 'octicon-x';
																case 0:
																	return 'octicon-question';
																default:
																	return 'octicon-alert';
															}
														}(),
														true)
													]))
											]),
										_List_Nil),
									function () {
										var _n12 = c._;
										switch (_n12) {
											case 3:
												return 'pending';
											case 4:
												return 'success';
											case 2:
												return 'failure';
											case 0:
												return 'expected';
											default:
												return 'error';
										}
									}(),
									0);
							});
					} else {
						return _List_Nil;
					}
				}();
				var reviewStates = A2(
					elm$core$List$map,
					function (r) {
						return _Utils_Tuple3(
							A2(
								elm$html$Html$img,
								_List_fromArray(
									[
										elm$html$Html$Attributes$class('status-actor'),
										elm$html$Html$Attributes$src(r.aw.da)
									]),
								_List_Nil),
							function () {
								var _n9 = r._;
								switch (_n9) {
									case 0:
										return 'pending';
									case 2:
										return 'success';
									case 3:
										return 'failure';
									case 1:
										return 'commented';
									default:
										return 'dismissed';
								}
							}(),
							0);
					},
					reviews);
				return A2(
					elm$core$List$cons,
					_Utils_Tuple3(
						A2(
							elm$html$Html$span,
							_List_fromArray(
								[
									elm$html$Html$Attributes$class('status-icon octicon octicon-git-merge')
								]),
							_List_Nil),
						function () {
							var _n8 = pr.fJ;
							switch (_n8) {
								case 0:
									return 'success';
								case 1:
									return 'failure';
								default:
									return 'pending';
							}
						}(),
						0),
					_Utils_ap(statusChecks, reviewStates));
			}
		}();
		var emojiReactions = function (a) {
			return A2(elm$core$List$map, a, card.by);
		}(
			function (_n6) {
				var type_ = _n6.es;
				var count = _n6.dh;
				return _Utils_Tuple3(
					elm$html$Html$text(
						reactionTypeEmoji(type_)),
					'reaction',
					count);
			});
		var flairs = _Utils_ap(
			prSegments,
			A2(
				elm$core$List$filter,
				function (_n5) {
					var count = _n5.c;
					return count > 0;
				},
				A2(
					elm$core$List$cons,
					_Utils_Tuple3(
						A2(
							elm$html$Html$span,
							_List_fromArray(
								[
									elm$html$Html$Attributes$class('octicon octicon-comment')
								]),
							_List_Nil),
						'comments',
						card.bd),
					emojiReactions)));
		var segments = A2(
			gampleman$elm_visualization$Shape$pie,
			{
				cC: 3,
				bT: 2 * elm$core$Basics$pi,
				bY: radius,
				bu: radius + author$project$Main$flairRadiusBase,
				cU: 3.0e-2,
				cV: 0,
				ek: F2(
					function (_n3, _n4) {
						return 1;
					}),
				cc: 0,
				ex: elm$core$Basics$always(1.0)
			},
			A2(
				elm$core$List$repeat,
				elm$core$List$length(flairs),
				1));
		var reactionSegment = F2(
			function (i, _n2) {
				var count = _n2.c;
				var _n1 = A2(
					elm$core$List$take,
					1,
					A2(elm$core$List$drop, i, segments));
				if (_n1.b && (!_n1.b.b)) {
					var s = _n1.a;
					return s;
				} else {
					return A3(
						author$project$Log$debug,
						'impossible: empty segments',
						_Utils_Tuple2(i, segments),
						author$project$Main$emptyArc);
				}
			});
		return function (a) {
			return A2(elm$core$List$indexedMap, a, flairs);
		}(
			F2(
				function (i, reaction) {
					var content = reaction.a;
					var _class = reaction.b;
					var count = reaction.c;
					var segmentArc = A2(reactionSegment, i, reaction);
					var arc = _Utils_update(
						segmentArc,
						{bu: segmentArc.bu + count});
					var _n0 = function () {
						var r = arc.bY + 12;
						var a = ((arc.cc + arc.bT) / 2) - (elm$core$Basics$pi / 2);
						return _Utils_Tuple2(
							(elm$core$Basics$cos(a) * r) - 8,
							(elm$core$Basics$sin(a) * r) - 8);
					}();
					var centroidX = _n0.a;
					var centroidY = _n0.b;
					return A2(
						elm$svg$Svg$g,
						_List_fromArray(
							[
								elm$svg$Svg$Attributes$class('reveal')
							]),
						_List_fromArray(
							[
								A2(
								folkertdev$one_true_path_experiment$Path$element,
								gampleman$elm_visualization$Shape$arc(arc),
								_List_fromArray(
									[
										elm$svg$Svg$Attributes$class('flair-arc ' + _class)
									])),
								A2(
								elm$svg$Svg$foreignObject,
								_List_fromArray(
									[
										elm$svg$Svg$Attributes$transform(
										'translate(' + (elm$core$String$fromFloat(centroidX) + (',' + (elm$core$String$fromFloat(centroidY) + ')')))),
										elm$svg$Svg$Attributes$class('hidden')
									]),
								_List_fromArray(
									[content]))
							]));
				}));
	});
var author$project$Main$AnticipateCardFromNode = function (a) {
	return {$: 19, a: a};
};
var author$project$Main$DeselectCard = function (a) {
	return {$: 16, a: a};
};
var author$project$Main$SelectCard = function (a) {
	return {$: 15, a: a};
};
var author$project$Main$UnanticipateCardFromNode = function (a) {
	return {$: 20, a: a};
};
var author$project$Main$isBacklog = function (card) {
	return card.ac.dv;
};
var author$project$Main$isDone = function (card) {
	return card.ac.dw;
};
var author$project$Main$isIcebox = function (card) {
	return card.ac.dx;
};
var author$project$Main$isInFlight = function (card) {
	return card.ac.dy;
};
var elm$core$Set$member = F2(
	function (key, _n0) {
		var dict = _n0;
		return A2(elm$core$Dict$member, key, dict);
	});
var elm$svg$Svg$circle = elm$svg$Svg$trustedNode('circle');
var elm$svg$Svg$Attributes$r = _VirtualDom_attribute('r');
var elm$svg$Svg$Attributes$strokeWidth = _VirtualDom_attribute('stroke-width');
var elm$virtual_dom$VirtualDom$Normal = function (a) {
	return {$: 0, a: a};
};
var elm$virtual_dom$VirtualDom$on = _VirtualDom_on;
var elm$html$Html$Events$on = F2(
	function (event, decoder) {
		return A2(
			elm$virtual_dom$VirtualDom$on,
			event,
			elm$virtual_dom$VirtualDom$Normal(decoder));
	});
var elm$svg$Svg$Events$onClick = function (msg) {
	return A2(
		elm$html$Html$Events$on,
		'click',
		elm$json$Json$Decode$succeed(msg));
};
var elm$svg$Svg$Events$onMouseOut = function (msg) {
	return A2(
		elm$html$Html$Events$on,
		'mouseout',
		elm$json$Json$Decode$succeed(msg));
};
var elm$svg$Svg$Events$onMouseOver = function (msg) {
	return A2(
		elm$html$Html$Events$on,
		'mouseover',
		elm$json$Json$Decode$succeed(msg));
};
var y0hy0h$ordered_containers$OrderedSet$member = F2(
	function (key, _n0) {
		var dict = _n0.b;
		return A2(elm$core$Dict$member, key, dict);
	});
var author$project$Main$viewCardNode = F6(
	function (card, radii, circle, labels, _n0, state) {
		var x = _n0.ij;
		var y = _n0.im;
		var projectHalo = A2(
			elm$svg$Svg$circle,
			_List_fromArray(
				[
					elm$svg$Svg$Attributes$strokeWidth('2px'),
					elm$svg$Svg$Attributes$r(
					elm$core$String$fromFloat(radii.bK + 4)),
					author$project$Main$isInFlight(card) ? elm$svg$Svg$Attributes$class('project-status in-flight') : (author$project$Main$isDone(card) ? elm$svg$Svg$Attributes$class('project-status done') : (author$project$Main$isIcebox(card) ? elm$svg$Svg$Attributes$class('project-status icebox') : (author$project$Main$isBacklog(card) ? elm$svg$Svg$Attributes$class('project-status backlog') : elm$svg$Svg$Attributes$class('project-status untriaged'))))
				]),
			_List_Nil);
		var isSelected = A2(y0hy0h$ordered_containers$OrderedSet$member, card.fu, state.s);
		var isHighlighted = A2(elm$core$Set$member, card.fu, state.u) || _Utils_eq(
			state.W,
			elm$core$Maybe$Just(card.fu));
		var scale = isHighlighted ? '1.1' : '1';
		return A2(
			elm$svg$Svg$g,
			_List_fromArray(
				[
					elm$svg$Svg$Attributes$transform(
					'translate(' + (elm$core$String$fromFloat(x) + (',' + (elm$core$String$fromFloat(y) + (') scale(' + (scale + ')')))))),
					author$project$Main$isInFlight(card) ? elm$svg$Svg$Attributes$class('in-flight') : (author$project$Main$isDone(card) ? elm$svg$Svg$Attributes$class('done') : (author$project$Main$isIcebox(card) ? elm$svg$Svg$Attributes$class('icebox') : (author$project$Main$isBacklog(card) ? elm$svg$Svg$Attributes$class('backlog') : elm$svg$Svg$Attributes$class('untriaged')))),
					elm$svg$Svg$Events$onMouseOver(
					author$project$Main$AnticipateCardFromNode(card.fu)),
					elm$svg$Svg$Events$onMouseOut(
					author$project$Main$UnanticipateCardFromNode(card.fu)),
					elm$svg$Svg$Events$onClick(
					isSelected ? author$project$Main$DeselectCard(card.fu) : author$project$Main$SelectCard(card.fu))
				]),
			A2(
				elm$core$List$cons,
				circle,
				_Utils_ap(
					labels,
					_List_fromArray(
						[projectHalo]))));
	});
var author$project$Main$activityClass = F2(
	function (now, date) {
		var delta = elm$time$Time$posixToMillis(now) - elm$time$Time$posixToMillis(date);
		var daysSinceLastUpdate = (delta / (((24 * 60) * 60) * 1000)) | 0;
		return (daysSinceLastUpdate <= 1) ? 'active-today' : ((daysSinceLastUpdate <= 2) ? 'active-yesterday' : ((daysSinceLastUpdate <= 7) ? 'active-this-week' : ((daysSinceLastUpdate <= 30) ? 'active-this-month' : 'active-long-ago')));
	});
var author$project$Main$lastActivityIsByUser = F3(
	function (cardEvents, login, card) {
		var events = A2(
			elm$core$Maybe$withDefault,
			_List_Nil,
			A2(elm$core$Dict$get, card.fu, cardEvents));
		var _n0 = elm$core$List$head(
			elm$core$List$reverse(events));
		if (!_n0.$) {
			var user = _n0.a.ev;
			if (!user.$) {
				var u = user.a;
				return _Utils_eq(u.hn, login);
			} else {
				return false;
			}
		} else {
			return false;
		}
	});
var elm$svg$Svg$text = elm$virtual_dom$VirtualDom$text;
var author$project$Main$viewCardNodeFlair = F5(
	function (card, radii, flair, _n0, state) {
		var x = _n0.ij;
		var y = _n0.im;
		var isHighlighted = A2(elm$core$Set$member, card.fu, state.u) || _Utils_eq(
			state.W,
			elm$core$Maybe$Just(card.fu));
		var scale = isHighlighted ? '1.1' : '1';
		var classes = _Utils_ap(
			_List_fromArray(
				[
					'flair',
					A2(author$project$Main$activityClass, state.M, card.c5)
				]),
			function () {
				var _n1 = state.g;
				if (_n1.$ === 1) {
					return _List_Nil;
				} else {
					var user = _n1.a.ev;
					return A3(author$project$Main$lastActivityIsByUser, state.cw, user.hn, card) ? _List_fromArray(
						['last-activity-is-me']) : _List_Nil;
				}
			}());
		var anticipateRadius = elm$core$List$isEmpty(card.bk) ? (radii.bK + 5) : (radii.eB + 5);
		var anticipatedHalo = isHighlighted ? A2(
			elm$svg$Svg$circle,
			_List_fromArray(
				[
					elm$svg$Svg$Attributes$r(
					elm$core$String$fromFloat(anticipateRadius)),
					elm$svg$Svg$Attributes$class('anticipated-circle')
				]),
			_List_Nil) : elm$svg$Svg$text('');
		return A2(
			elm$svg$Svg$g,
			_List_fromArray(
				[
					elm$svg$Svg$Attributes$transform(
					'translate(' + (elm$core$String$fromFloat(x) + (',' + (elm$core$String$fromFloat(y) + (') scale(' + (scale + ')')))))),
					elm$svg$Svg$Attributes$class(
					A2(elm$core$String$join, ' ', classes))
				]),
			_Utils_ap(
				flair,
				_List_fromArray(
					[anticipatedHalo])));
	});
var elm$svg$Svg$text_ = elm$svg$Svg$trustedNode('text');
var elm$svg$Svg$Attributes$alignmentBaseline = _VirtualDom_attribute('alignment-baseline');
var elm$svg$Svg$Attributes$textAnchor = _VirtualDom_attribute('text-anchor');
var author$project$Main$cardNode = F3(
	function (model, card, context) {
		var radii = {
			bK: A2(author$project$Main$cardRadiusBase, card, context),
			bI: A2(author$project$Main$cardRadiusWithFlair, card, context),
			eB: A2(author$project$Main$cardRadiusWithoutFlair, card, context)
		};
		var labelArcs = A3(author$project$Main$cardLabelArcs, model.aj, card, context);
		var flairArcs = A3(
			author$project$Main$reactionFlairArcs,
			A2(
				elm$core$Maybe$withDefault,
				_List_Nil,
				A2(elm$core$Dict$get, card.fu, model.c.ge)),
			card,
			context);
		var circle = function () {
			var _n1 = card.cB;
			if (!_n1.$) {
				return A2(
					elm$svg$Svg$g,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							elm$svg$Svg$circle,
							_List_fromArray(
								[
									elm$svg$Svg$Attributes$r(
									elm$core$String$fromFloat(radii.bK)),
									elm$svg$Svg$Attributes$fill('#fff')
								]),
							_List_Nil),
							A2(
							elm$svg$Svg$text_,
							_List_fromArray(
								[
									elm$svg$Svg$Attributes$textAnchor('middle'),
									elm$svg$Svg$Attributes$alignmentBaseline('middle'),
									elm$svg$Svg$Attributes$class('issue-number')
								]),
							_List_fromArray(
								[
									elm$svg$Svg$text(
									elm$core$String$fromInt(card.k))
								]))
						]));
			} else {
				var pr = _n1.a;
				return A2(
					elm$svg$Svg$g,
					_List_Nil,
					_List_fromArray(
						[
							A3(author$project$Main$prCircle, pr, card, context),
							A2(
							elm$svg$Svg$text_,
							_List_fromArray(
								[
									elm$svg$Svg$Attributes$textAnchor('middle'),
									elm$svg$Svg$Attributes$alignmentBaseline('middle'),
									elm$svg$Svg$Attributes$fill('#fff')
								]),
							_List_fromArray(
								[
									elm$svg$Svg$text(
									elm$core$String$fromInt(card.k))
								]))
						]));
			}
		}();
		return {
			df: function (_n0) {
				var x = _n0.ij;
				var y = _n0.im;
				return {eC: x - radii.bI, eD: x + radii.bI, eE: y - radii.bI, eF: y + radii.bI};
			},
			bb: card,
			a4: card.a4,
			ey: A3(author$project$Main$viewCardNodeFlair, card, radii, flairArcs),
			ez: A4(author$project$Main$viewCardNode, card, radii, circle, labelArcs)
		};
	});
var elm$core$List$maximum = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return elm$core$Maybe$Just(
			A3(elm$core$List$foldl, elm$core$Basics$max, x, xs));
	} else {
		return elm$core$Maybe$Nothing;
	}
};
var author$project$Main$graphAllActivityCompare = F3(
	function (model, a, b) {
		var latestActivity = function (g) {
			return A2(
				elm$core$Maybe$withDefault,
				0,
				elm$core$List$maximum(
					A2(
						elm$core$List$map,
						function (n) {
							return elm$time$Time$posixToMillis(
								A2(
									elm$core$Maybe$withDefault,
									n.ar.ew.bb.c5,
									elm$core$List$head(
										A2(
											elm$core$List$map,
											function ($) {
												return $.e3;
											},
											elm$core$List$reverse(
												A2(
													elm$core$Maybe$withDefault,
													_List_Nil,
													A2(elm$core$Dict$get, n.ar.ew.bb.fu, model.c.eG)))))));
						},
						elm_community$graph$Graph$nodes(g))));
		};
		return A2(
			elm$core$Basics$compare,
			latestActivity(a.a0),
			latestActivity(b.a0));
	});
var author$project$Main$graphSizeCompare = F2(
	function (a, b) {
		var _n0 = A2(
			elm$core$Basics$compare,
			elm_community$graph$Graph$size(a.a0),
			elm_community$graph$Graph$size(b.a0));
		if (_n0 === 1) {
			var graphScore = A2(
				elm$core$Basics$composeL,
				A2(
					elm$core$Basics$composeL,
					A2(elm$core$List$foldl, elm$core$Basics$add, 0),
					elm$core$List$map(
						A2(
							elm$core$Basics$composeR,
							function ($) {
								return $.ar;
							},
							A2(
								elm$core$Basics$composeR,
								function ($) {
									return $.ew;
								},
								function ($) {
									return $.a4;
								})))),
				elm_community$graph$Graph$nodes);
			return A2(
				elm$core$Basics$compare,
				graphScore(a.a0),
				graphScore(b.a0));
		} else {
			var x = _n0;
			return x;
		}
	});
var author$project$Main$graphUserActivityCompare = F4(
	function (model, login, a, b) {
		var latestUserActivity = function (g) {
			return A2(
				elm$core$Maybe$withDefault,
				0,
				elm$core$List$maximum(
					A2(
						elm$core$List$map,
						function (n) {
							return A2(
								elm$core$Maybe$withDefault,
								0,
								elm$core$List$head(
									A2(
										elm$core$List$map,
										A2(
											elm$core$Basics$composeR,
											function ($) {
												return $.e3;
											},
											elm$time$Time$posixToMillis),
										A2(
											elm$core$List$filter,
											A2(
												elm$core$Basics$composeR,
												function ($) {
													return $.ev;
												},
												A2(
													elm$core$Basics$composeR,
													elm$core$Maybe$map(
														function ($) {
															return $.hn;
														}),
													elm$core$Basics$eq(
														elm$core$Maybe$Just(login)))),
											elm$core$List$reverse(
												A2(
													elm$core$Maybe$withDefault,
													_List_Nil,
													A2(elm$core$Dict$get, n.ar.ew.bb.fu, model.c.eG)))))));
						},
						elm_community$graph$Graph$nodes(g))));
		};
		return A2(
			elm$core$Basics$compare,
			latestUserActivity(a.a0),
			latestUserActivity(b.a0));
	});
var author$project$Main$hasLabelAndColor = F4(
	function (model, name, color, card) {
		var matchingLabels = A2(
			elm$core$Dict$filter,
			F2(
				function (_n0, l) {
					return _Utils_eq(l.ht, name) && _Utils_eq(l.cz, color);
				}),
			model.aj);
		return A2(
			elm$core$List$any,
			function (a) {
				return A2(elm$core$Dict$member, a, matchingLabels);
			},
			card.bk);
	});
var author$project$Main$involvesUser = F3(
	function (model, login, card) {
		return A2(
			elm$core$List$any,
			A2(
				elm$core$Basics$composeR,
				function ($) {
					return $.ev;
				},
				A2(
					elm$core$Basics$composeR,
					elm$core$Maybe$map(
						function ($) {
							return $.hn;
						}),
					elm$core$Basics$eq(
						elm$core$Maybe$Just(login)))),
			A2(
				elm$core$Maybe$withDefault,
				_List_Nil,
				A2(elm$core$Dict$get, card.fu, model.c.eG)));
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
var author$project$Main$isInProject = F2(
	function (name, card) {
		return A2(
			elm$core$List$member,
			name,
			A2(
				elm$core$List$map,
				A2(
					elm$core$Basics$composeR,
					function ($) {
						return $.f2;
					},
					function ($) {
						return $.ht;
					}),
				card.cx));
	});
var author$project$Main$isUntriaged = function (card) {
	return elm$core$List$isEmpty(card.cx);
};
var author$project$Main$satisfiesFilter = F3(
	function (model, filter, card) {
		switch (filter.$) {
			case 0:
				return false;
			case 1:
				var name = filter.a;
				return A2(author$project$Main$isInProject, name, card);
			case 2:
				var label = filter.a;
				var color = filter.b;
				return A4(author$project$Main$hasLabelAndColor, model, label, color, card);
			case 3:
				var login = filter.a;
				return A3(author$project$Main$involvesUser, model, login, card);
			case 4:
				return author$project$Main$isPR(card);
			default:
				return author$project$Main$isUntriaged(card);
		}
	});
var elm$core$List$all = F2(
	function (isOkay, list) {
		return !A2(
			elm$core$List$any,
			A2(elm$core$Basics$composeL, elm$core$Basics$not, isOkay),
			list);
	});
var author$project$Main$satisfiesFilters = F3(
	function (model, filters, card) {
		return A2(
			elm$core$List$all,
			function (a) {
				return A3(author$project$Main$satisfiesFilter, model, a, card);
			},
			filters);
	});
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
				var from = _n3.hd;
				var to = _n3.h2;
				return _Utils_eq(from, edge.hd) || (_Utils_eq(from, edge.h2) || (_Utils_eq(to, edge.hd) || _Utils_eq(to, edge.h2)));
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
var elm_community$graph$Graph$inducedSubgraph = F2(
	function (nodeIds_, graph) {
		var insertContextById = F2(
			function (nodeId, acc) {
				var _n0 = A2(elm_community$graph$Graph$get, nodeId, graph);
				if (!_n0.$) {
					var ctx = _n0.a;
					return A2(elm_community$graph$Graph$insert, ctx, acc);
				} else {
					return acc;
				}
			});
		return A3(elm$core$List$foldl, insertContextById, elm_community$graph$Graph$empty, nodeIds_);
	});
var elm_community$intdict$IntDict$isEmpty = function (dict) {
	if (!dict.$) {
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
					edge.hd,
					A2(elm$core$Set$insert, edge.h2, set));
			}),
		elm$core$Set$empty);
	var singletons = A3(
		elm_community$graph$Graph$fold,
		F2(
			function (nc, ncs) {
				return (elm_community$intdict$IntDict$isEmpty(nc.fv) && elm_community$intdict$IntDict$isEmpty(nc.fT)) ? A2(elm$core$List$cons, nc, ncs) : ncs;
			}),
		_List_Nil,
		graph);
	var singletonGraphs = A2(
		elm$core$List$map,
		function (a) {
			return A2(elm_community$graph$Graph$insert, a, elm_community$graph$Graph$empty);
		},
		singletons);
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
		return {fu: id, ar: label};
	});
var elm_community$graph$Graph$NodeContext = F3(
	function (node, incoming, outgoing) {
		return {fv: incoming, aU: node, fT: outgoing};
	});
var elm_community$graph$Graph$fromNodesAndEdges = F2(
	function (nodes_, edges_) {
		var nodeRep = A3(
			elm$core$List$foldl,
			function (n) {
				return A2(
					elm_community$intdict$IntDict$insert,
					n.fu,
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
							fT: A3(elm_community$intdict$IntDict$insert, edge.h2, edge.ar, ctx.fT)
						});
				};
				var updateIncoming = function (ctx) {
					return _Utils_update(
						ctx,
						{
							fv: A3(elm_community$intdict$IntDict$insert, edge.hd, edge.ar, ctx.fv)
						});
				};
				return A3(
					elm_community$intdict$IntDict$update,
					edge.h2,
					elm$core$Maybe$map(updateIncoming),
					A3(
						elm_community$intdict$IntDict$update,
						edge.hd,
						elm$core$Maybe$map(updateOutgoing),
						rep));
			});
		var addEdgeIfValid = F2(
			function (edge, rep) {
				return (A2(elm_community$intdict$IntDict$member, edge.hd, rep) && A2(elm_community$intdict$IntDict$member, edge.h2, rep)) ? A2(addEdge, edge, rep) : rep;
			});
		return A3(elm$core$List$foldl, addEdgeIfValid, nodeRep, edges_);
	});
var author$project$Main$computeGraph = function (model) {
	var sortFunc = function () {
		var _n2 = model.aO;
		switch (_n2.$) {
			case 0:
				return author$project$Main$graphSizeCompare;
			case 1:
				var login = _n2.a;
				return A2(author$project$Main$graphUserActivityCompare, model, login);
			default:
				return author$project$Main$graphAllActivityCompare(model);
		}
	}();
	var node = F2(
		function (card, context) {
			return {
				cZ: A2(author$project$Main$cardRadiusBase, card, context),
				ew: A3(author$project$Main$cardNode, model, card, context)
			};
		});
	var cardEdges = A3(
		elm$core$Dict$foldl,
		F3(
			function (idStr, sourceIds, refs) {
				var id = author$project$Hash$hash(idStr);
				return _Utils_ap(
					A2(
						elm$core$List$map,
						function (sourceId) {
							return {
								hd: author$project$Hash$hash(sourceId),
								ar: 0,
								h2: id
							};
						},
						sourceIds),
					refs);
			}),
		_List_Nil,
		model.c.f8);
	var baseState = author$project$Main$baseGraphState(model);
	var applyWithContext = function (nc) {
		return {
			fv: nc.fv,
			aU: {
				fu: nc.aU.fu,
				ar: nc.aU.ar(
					{fv: nc.fv, fT: nc.fT})
			},
			fT: nc.fT
		};
	};
	var allFilters = function () {
		var _n1 = model.cs;
		if (!_n1.$) {
			var f = _n1.a;
			return A2(elm$core$List$cons, f, model.ab);
		} else {
			return model.ab;
		}
	}();
	var cardNodeThunks = A3(
		elm$core$Dict$foldl,
		F3(
			function (_n0, card, thunks) {
				return (A3(author$project$Main$satisfiesFilters, model, allFilters, card) && author$project$Main$isOpen(card)) ? A2(
					elm$core$List$cons,
					A2(
						elm_community$graph$Graph$Node,
						author$project$Hash$hash(card.fu),
						node(card)),
					thunks) : thunks;
			}),
		_List_Nil,
		model.p);
	var graph = A2(
		elm_community$graph$Graph$mapContexts,
		applyWithContext,
		A2(elm_community$graph$Graph$fromNodesAndEdges, cardNodeThunks, cardEdges));
	return _Utils_update(
		model,
		{
			ax: A2(
				elm$core$List$map,
				function (g) {
					return _Utils_Tuple2(baseState, g);
				},
				elm$core$List$reverse(
					A2(
						elm$core$List$sortWith,
						sortFunc,
						A2(
							elm$core$List$map,
							author$project$ForceGraph$fromGraph,
							author$project$Main$subGraphs(graph)))))
		});
};
var elm$core$Dict$isEmpty = function (dict) {
	if (dict.$ === -2) {
		return true;
	} else {
		return false;
	}
};
var elm$core$Set$isEmpty = function (_n0) {
	var dict = _n0;
	return elm$core$Dict$isEmpty(dict);
};
var y0hy0h$ordered_containers$OrderedSet$isEmpty = function (oset) {
	return _Utils_eq(oset, y0hy0h$ordered_containers$OrderedSet$empty);
};
var author$project$Main$isBaseGraphState = F2(
	function (model, state) {
		return _Utils_eq(state.M, model.M) && (_Utils_eq(state.g, model.g) && (_Utils_eq(state.m, model.m) && (elm$core$Set$isEmpty(state.u) && (y0hy0h$ordered_containers$OrderedSet$isEmpty(state.s) && _Utils_eq(state.W, elm$core$Maybe$Nothing)))));
	});
var author$project$Main$computeGraphState = function (model) {
	var newState = {u: model.u, cw: model.c.eG, M: model.M, m: model.m, W: model.W, g: model.g, s: model.s};
	var affectedByState = function (_n2) {
		var graph = _n2.a0;
		return A3(
			elm_community$graph$Graph$fold,
			F2(
				function (_n1, affected) {
					var node = _n1.aU;
					if (affected) {
						return true;
					} else {
						var id = node.ar.ew.bb.fu;
						return A2(y0hy0h$ordered_containers$OrderedSet$member, id, newState.s) || (A2(elm$core$Set$member, id, newState.u) || _Utils_eq(
							newState.W,
							elm$core$Maybe$Just(id)));
					}
				}),
			false,
			graph);
	};
	return _Utils_update(
		model,
		{
			ax: A2(
				elm$core$List$map,
				function (_n0) {
					var s = _n0.a;
					var g = _n0.b;
					return affectedByState(g) ? _Utils_Tuple2(newState, g) : (A2(author$project$Main$isBaseGraphState, model, s) ? _Utils_Tuple2(s, g) : _Utils_Tuple2(
						author$project$Main$baseGraphState(model),
						g));
				},
				model.ax)
		});
};
var author$project$GitHubGraph$encodeLabelPatch = F2(
	function (name, color) {
		return elm$json$Json$Encode$object(
			_List_fromArray(
				[
					_Utils_Tuple2(
					'name',
					elm$json$Json$Encode$string(name)),
					_Utils_Tuple2(
					'color',
					elm$json$Json$Encode$string(color))
				]));
	});
var author$project$GitHubGraph$createRepoLabel = F4(
	function (token, repo, name, color) {
		return A2(
			elm$core$Task$mapError,
			jamesmacaulay$elm_graphql$GraphQL$Client$Http$HttpError,
			lukewestby$elm_http_builder$HttpBuilder$toTask(
				A2(
					lukewestby$elm_http_builder$HttpBuilder$withJsonBody,
					A2(author$project$GitHubGraph$encodeLabelPatch, name, color),
					A2(
						lukewestby$elm_http_builder$HttpBuilder$withHeaders,
						author$project$GitHubGraph$auth(token),
						lukewestby$elm_http_builder$HttpBuilder$post('https://api.github.com/repos/' + (repo.hN + ('/' + (repo.ht + '/labels'))))))));
	});
var author$project$Main$LabelChanged = F2(
	function (a, b) {
		return {$: 37, a: a, b: b};
	});
var author$project$Main$createLabel = F3(
	function (model, repo, label) {
		var _n0 = model.g;
		if (!_n0.$) {
			var token = _n0.a.h9;
			return A2(
				elm$core$Task$attempt,
				author$project$Main$LabelChanged(repo),
				A4(author$project$GitHubGraph$createRepoLabel, token, repo, label.ht, label.cz));
		} else {
			return elm$core$Platform$Cmd$none;
		}
	});
var author$project$GitHubGraph$createRepoMilestone = F3(
	function (token, repo, title) {
		return A2(
			elm$core$Task$mapError,
			jamesmacaulay$elm_graphql$GraphQL$Client$Http$HttpError,
			lukewestby$elm_http_builder$HttpBuilder$toTask(
				A2(
					lukewestby$elm_http_builder$HttpBuilder$withJsonBody,
					elm$json$Json$Encode$object(
						_List_fromArray(
							[
								_Utils_Tuple2(
								'title',
								elm$json$Json$Encode$string(title))
							])),
					A2(
						lukewestby$elm_http_builder$HttpBuilder$withHeaders,
						author$project$GitHubGraph$auth(token),
						lukewestby$elm_http_builder$HttpBuilder$post('https://api.github.com/repos/' + (repo.hN + ('/' + (repo.ht + '/milestones'))))))));
	});
var author$project$Main$createMilestone = F3(
	function (model, repo, title) {
		var _n0 = model.g;
		if (!_n0.$) {
			var token = _n0.a.h9;
			return A2(
				elm$core$Task$attempt,
				author$project$Main$MilestoneChanged(repo),
				A3(author$project$GitHubGraph$createRepoMilestone, token, repo, title));
		} else {
			return elm$core$Platform$Cmd$none;
		}
	});
var lukewestby$elm_http_builder$HttpBuilder$delete = lukewestby$elm_http_builder$HttpBuilder$requestWithMethodAndUrl('DELETE');
var author$project$GitHubGraph$deleteRepoLabel = F3(
	function (token, repo, name) {
		return A2(
			elm$core$Task$mapError,
			jamesmacaulay$elm_graphql$GraphQL$Client$Http$HttpError,
			lukewestby$elm_http_builder$HttpBuilder$toTask(
				A2(
					lukewestby$elm_http_builder$HttpBuilder$withHeaders,
					author$project$GitHubGraph$auth(token),
					lukewestby$elm_http_builder$HttpBuilder$delete('https://api.github.com/repos/' + (repo.hN + ('/' + (repo.ht + ('/labels/' + name))))))));
	});
var author$project$Main$deleteLabel = F3(
	function (model, repo, label) {
		var _n0 = model.g;
		if (!_n0.$) {
			var token = _n0.a.h9;
			return A2(
				elm$core$Task$attempt,
				author$project$Main$LabelChanged(repo),
				A3(author$project$GitHubGraph$deleteRepoLabel, token, repo, label.ht));
		} else {
			return elm$core$Platform$Cmd$none;
		}
	});
var author$project$GitHubGraph$deleteRepoMilestone = F3(
	function (token, repo, milestone) {
		return A2(
			elm$core$Task$mapError,
			jamesmacaulay$elm_graphql$GraphQL$Client$Http$HttpError,
			lukewestby$elm_http_builder$HttpBuilder$toTask(
				A2(
					lukewestby$elm_http_builder$HttpBuilder$withHeaders,
					author$project$GitHubGraph$auth(token),
					lukewestby$elm_http_builder$HttpBuilder$delete(
						'https://api.github.com/repos/' + (repo.hN + ('/' + (repo.ht + ('/milestones/' + elm$core$String$fromInt(milestone.k)))))))));
	});
var author$project$Main$deleteMilestone = F3(
	function (model, repo, milestone) {
		var _n0 = model.g;
		if (!_n0.$) {
			var token = _n0.a.h9;
			return A2(
				elm$core$Task$attempt,
				author$project$Main$MilestoneChanged(repo),
				A3(author$project$GitHubGraph$deleteRepoMilestone, token, repo, milestone));
		} else {
			return elm$core$Platform$Cmd$none;
		}
	});
var elm$core$List$sum = function (numbers) {
	return A3(elm$core$List$foldl, elm$core$Basics$add, 0, numbers);
};
var author$project$GitHubGraph$reactionScore = function (reactions) {
	return elm$core$List$sum(
		function (a) {
			return A2(elm$core$List$map, a, reactions);
		}(
			function (_n0) {
				var type_ = _n0.es;
				var count = _n0.dh;
				switch (type_) {
					case 0:
						return 2 * count;
					case 1:
						return (-2) * count;
					case 2:
						return count;
					case 4:
						return -count;
					case 5:
						return 3 * count;
					case 3:
						return 3 * count;
					case 6:
						return 3 * count;
					default:
						return 2 * count;
				}
			}));
};
var author$project$GitHubGraph$issueScore = function (_n0) {
	var reactions = _n0.by;
	var commentCount = _n0.bd;
	return author$project$GitHubGraph$reactionScore(reactions) + (2 * commentCount);
};
var author$project$Main$IssueState = function (a) {
	return {$: 0, a: a};
};
var elm$core$String$startsWith = _String_startsWith;
var author$project$Main$detectColumn = {
	cq: elm$core$String$startsWith('Backlog'),
	aM: elm$core$Basics$eq('Done'),
	bg: elm$core$Basics$eq('Icebox'),
	aP: elm$core$Basics$eq('In Flight')
};
var author$project$Main$inColumn = function (match) {
	return elm$core$List$any(
		A2(
			elm$core$Basics$composeL,
			A2(
				elm$core$Basics$composeL,
				elm$core$Maybe$withDefault(false),
				elm$core$Maybe$map(
					A2(
						elm$core$Basics$composeL,
						match,
						function ($) {
							return $.ht;
						}))),
			function ($) {
				return $.eX;
			}));
};
var author$project$Main$cardProcessState = function (_n0) {
	var cards = _n0.cx;
	var labels = _n0.bk;
	return {
		$7: A2(
			elm$core$List$any,
			A2(
				elm$core$Basics$composeL,
				elm$core$Basics$eq('bug'),
				function ($) {
					return $.ht;
				}),
			labels),
		dp: A2(
			elm$core$List$any,
			A2(
				elm$core$Basics$composeL,
				elm$core$Basics$eq('enhancement'),
				function ($) {
					return $.ht;
				}),
			labels),
		dq: A2(
			elm$core$List$any,
			A2(
				elm$core$Basics$composeL,
				elm$core$Basics$eq('paused'),
				function ($) {
					return $.ht;
				}),
			labels),
		dr: A2(
			elm$core$List$any,
			A2(
				elm$core$Basics$composeL,
				elm$core$Basics$eq('wontfix'),
				function ($) {
					return $.ht;
				}),
			labels),
		dv: A2(author$project$Main$inColumn, author$project$Main$detectColumn.cq, cards),
		dw: A2(author$project$Main$inColumn, author$project$Main$detectColumn.aM, cards),
		dx: A2(author$project$Main$inColumn, author$project$Main$detectColumn.bg, cards),
		dy: A2(author$project$Main$inColumn, author$project$Main$detectColumn.aP, cards)
	};
};
var author$project$Main$issueCard = function (issue) {
	var id = issue.fu;
	var url = issue.ib;
	var repo = issue.q;
	var number = issue.k;
	var title = issue.bF;
	var updatedAt = issue.c5;
	var author = issue.aw;
	var labels = issue.bk;
	var cards = issue.cx;
	var commentCount = issue.bd;
	var reactions = issue.by;
	var state = issue._;
	var milestone = issue.cO;
	return {
		aw: author,
		cx: cards,
		bd: commentCount,
		cB: author$project$GitHubGraph$IssueCardContent(issue),
		fu: id,
		bk: A2(
			elm$core$List$map,
			function ($) {
				return $.fu;
			},
			labels),
		cO: milestone,
		k: number,
		ac: author$project$Main$cardProcessState(
			{cx: cards, bk: labels}),
		by: reactions,
		q: repo,
		a4: author$project$GitHubGraph$issueScore(issue),
		_: author$project$Main$IssueState(state),
		bF: title,
		c5: updatedAt,
		ib: url
	};
};
var author$project$GitHubGraph$pullRequestScore = function (_n0) {
	var reactions = _n0.by;
	var commentCount = _n0.bd;
	return (1000 + author$project$GitHubGraph$reactionScore(reactions)) + (2 * commentCount);
};
var author$project$Main$prCard = function (pr) {
	var id = pr.fu;
	var url = pr.ib;
	var repo = pr.q;
	var number = pr.k;
	var title = pr.bF;
	var updatedAt = pr.c5;
	var author = pr.aw;
	var labels = pr.bk;
	var cards = pr.cx;
	var commentCount = pr.bd;
	var reactions = pr.by;
	var state = pr._;
	var milestone = pr.cO;
	return {
		aw: author,
		cx: cards,
		bd: commentCount,
		cB: author$project$GitHubGraph$PullRequestCardContent(pr),
		fu: id,
		bk: A2(
			elm$core$List$map,
			function ($) {
				return $.fu;
			},
			labels),
		cO: milestone,
		k: number,
		ac: author$project$Main$cardProcessState(
			{cx: cards, bk: labels}),
		by: reactions,
		q: repo,
		a4: author$project$GitHubGraph$pullRequestScore(pr),
		_: author$project$Main$PullRequestState(state),
		bF: title,
		c5: updatedAt,
		ib: url
	};
};
var author$project$Main$finishProjectDragRefresh = function (model) {
	var updateContent = F2(
		function (content, m) {
			var data = m.c;
			if (!content.$) {
				var issue = content.a;
				return _Utils_update(
					m,
					{
						p: A3(
							elm$core$Dict$insert,
							issue.fu,
							author$project$Main$issueCard(issue),
							m.p),
						c: _Utils_update(
							data,
							{
								fA: A3(elm$core$Dict$insert, issue.fu, issue, data.fA)
							})
					});
			} else {
				var pr = content.a;
				return _Utils_update(
					m,
					{
						p: A3(
							elm$core$Dict$insert,
							pr.fu,
							author$project$Main$prCard(pr),
							m.p),
						c: _Utils_update(
							data,
							{
								f5: A3(elm$core$Dict$insert, pr.fu, pr, data.f5)
							})
					});
			}
		});
	var updateColumn = F3(
		function (id, cards, m) {
			var data = m.c;
			return _Utils_update(
				m,
				{
					c: _Utils_update(
						data,
						{
							eY: A3(elm$core$Dict$insert, id, cards, data.eY)
						})
				});
		});
	var _n0 = model.ad;
	if (_n0.$ === 1) {
		return model;
	} else {
		var pdr = _n0.a;
		var _n1 = _Utils_Tuple2(
			_Utils_Tuple3(pdr.gY, pdr.cB, pdr.c_),
			_Utils_Tuple3(pdr.cb, pdr.c0, pdr.ce));
		_n1$6:
		while (true) {
			if (!_n1.a.a.$) {
				if (!_n1.a.b.$) {
					if (_n1.a.c.$ === 1) {
						if (((_n1.b.a.$ === 1) && (!_n1.b.b.$)) && (!_n1.b.c.$)) {
							var _n4 = _n1.a;
							var c = _n4.b.a;
							var _n5 = _n4.c;
							var _n6 = _n1.b;
							var _n7 = _n6.a;
							var tid = _n6.b.a;
							var tcs = _n6.c.a;
							return author$project$Main$computeGraph(
								A3(
									updateColumn,
									tid,
									tcs,
									A2(
										updateContent,
										c,
										_Utils_update(
											model,
											{
												h: author$project$Drag$complete(model.h)
											}))));
						} else {
							break _n1$6;
						}
					} else {
						if ((!_n1.b.b.$) && (!_n1.b.c.$)) {
							if (!_n1.b.a.$) {
								var _n2 = _n1.a;
								var c = _n2.b.a;
								var sid = _n2.c.a;
								var _n3 = _n1.b;
								var scs = _n3.a.a;
								var tid = _n3.b.a;
								var tcs = _n3.c.a;
								return author$project$Main$computeGraph(
									A3(
										updateColumn,
										tid,
										tcs,
										A3(
											updateColumn,
											sid,
											scs,
											A2(
												updateContent,
												c,
												_Utils_update(
													model,
													{
														h: author$project$Drag$complete(model.h)
													})))));
							} else {
								var _n8 = _n1.a;
								var c = _n8.b.a;
								var _n9 = _n1.b;
								var tid = _n9.b.a;
								var tcs = _n9.c.a;
								return A3(
									updateColumn,
									tid,
									tcs,
									A2(
										updateContent,
										c,
										_Utils_update(
											model,
											{
												h: author$project$Drag$land(model.h)
											})));
							}
						} else {
							break _n1$6;
						}
					}
				} else {
					break _n1$6;
				}
			} else {
				if (_n1.a.b.$ === 1) {
					if (_n1.a.c.$ === 1) {
						if (((_n1.b.a.$ === 1) && (!_n1.b.b.$)) && (!_n1.b.c.$)) {
							var _n14 = _n1.a;
							var _n15 = _n14.a;
							var _n16 = _n14.b;
							var _n17 = _n14.c;
							var _n18 = _n1.b;
							var _n19 = _n18.a;
							var tid = _n18.b.a;
							var tcs = _n18.c.a;
							return A3(
								updateColumn,
								tid,
								tcs,
								_Utils_update(
									model,
									{
										h: author$project$Drag$complete(model.h)
									}));
						} else {
							break _n1$6;
						}
					} else {
						if ((!_n1.b.b.$) && (!_n1.b.c.$)) {
							if (!_n1.b.a.$) {
								var _n10 = _n1.a;
								var _n11 = _n10.a;
								var _n12 = _n10.b;
								var sid = _n10.c.a;
								var _n13 = _n1.b;
								var scs = _n13.a.a;
								var tid = _n13.b.a;
								var tcs = _n13.c.a;
								return A3(
									updateColumn,
									tid,
									tcs,
									A3(
										updateColumn,
										sid,
										scs,
										_Utils_update(
											model,
											{
												h: author$project$Drag$complete(model.h)
											})));
							} else {
								var _n20 = _n1.a;
								var _n21 = _n20.a;
								var _n22 = _n20.b;
								var _n23 = _n1.b;
								var tid = _n23.b.a;
								var tcs = _n23.c.a;
								return A3(
									updateColumn,
									tid,
									tcs,
									_Utils_update(
										model,
										{
											h: author$project$Drag$land(model.h)
										}));
							}
						} else {
							break _n1$6;
						}
					}
				} else {
					break _n1$6;
				}
			}
		}
		return model;
	}
};
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
var elm$random$Random$int = F2(
	function (a, b) {
		return function (seed0) {
			var _n0 = (_Utils_cmp(a, b) < 0) ? _Utils_Tuple2(a, b) : _Utils_Tuple2(b, a);
			var lo = _n0.a;
			var hi = _n0.b;
			var range = (hi - lo) + 1;
			if (!((range - 1) & range)) {
				return _Utils_Tuple2(
					(((range - 1) & elm$random$Random$peel(seed0)) >>> 0) + lo,
					elm$random$Random$next(seed0));
			} else {
				var threshhold = (((-range) >>> 0) % range) >>> 0;
				var accountForBias = function (seed) {
					accountForBias:
					while (true) {
						var x = elm$random$Random$peel(seed);
						var seedN = elm$random$Random$next(seed);
						if (_Utils_cmp(x, threshhold) < 0) {
							var $temp$seed = seedN;
							seed = $temp$seed;
							continue accountForBias;
						} else {
							return _Utils_Tuple2((x % range) + lo, seedN);
						}
					}
				};
				return accountForBias(seed0);
			}
		};
	});
var elm$core$Char$fromCode = _Char_fromCode;
var fredcy$elm_parseint$ParseInt$charFromInt = function (i) {
	return (i < 10) ? elm$core$Char$fromCode(
		i + elm$core$Char$toCode('0')) : ((i < 36) ? elm$core$Char$fromCode(
		(i - 10) + elm$core$Char$toCode('A')) : '?');
};
var fredcy$elm_parseint$ParseInt$toRadixUnsafe = F2(
	function (radix, i) {
		return (_Utils_cmp(i, radix) < 0) ? elm$core$String$fromChar(
			fredcy$elm_parseint$ParseInt$charFromInt(i)) : _Utils_ap(
			A2(fredcy$elm_parseint$ParseInt$toRadixUnsafe, radix, (i / radix) | 0),
			elm$core$String$fromChar(
				fredcy$elm_parseint$ParseInt$charFromInt(
					A2(elm$core$Basics$modBy, radix, i))));
	});
var fredcy$elm_parseint$ParseInt$toHex = fredcy$elm_parseint$ParseInt$toRadixUnsafe(16);
var author$project$Main$generateColor = function (seed) {
	var _n0 = A2(
		elm$random$Random$step,
		A2(elm$random$Random$int, 0, 16777215),
		elm$random$Random$initialSeed(seed));
	var randomColor = _n0.a;
	return A3(
		elm$core$String$padLeft,
		6,
		'0',
		fredcy$elm_parseint$ParseInt$toHex(randomColor));
};
var author$project$Main$hasLabel = F3(
	function (model, name, card) {
		var matchingLabels = A2(
			elm$core$Dict$filter,
			F2(
				function (_n0, l) {
					return _Utils_eq(l.ht, name);
				}),
			model.aj);
		return A2(
			elm$core$List$any,
			function (a) {
				return A2(elm$core$Dict$member, a, matchingLabels);
			},
			card.bk);
	});
var author$project$Main$labelKey = function (label) {
	return _Utils_Tuple2(
		label.ht,
		elm$core$String$toLower(label.cz));
};
var author$project$Main$matchesLabel = F2(
	function (sl, l) {
		return _Utils_eq(l.ht, sl.ht) && _Utils_eq(
			elm$core$String$toLower(l.cz),
			elm$core$String$toLower(sl.cz));
	});
var author$project$Main$moveCard = F3(
	function (model, _n0, cardId) {
		var columnId = _n0.cA;
		var afterId = _n0.eJ;
		var _n1 = model.g;
		if (!_n1.$) {
			var token = _n1.a.h9;
			return A2(
				elm$core$Task$attempt,
				author$project$Main$CardMoved(columnId),
				A4(author$project$GitHubGraph$moveCardAfter, token, columnId, cardId, afterId));
		} else {
			return elm$core$Platform$Cmd$none;
		}
	});
var elm$core$Result$toMaybe = function (result) {
	if (!result.$) {
		var v = result.a;
		return elm$core$Maybe$Just(v);
	} else {
		return elm$core$Maybe$Nothing;
	}
};
var author$project$Main$randomizeColor = function (label) {
	var currentColor = A2(
		elm$core$Maybe$withDefault,
		0,
		elm$core$Result$toMaybe(
			fredcy$elm_parseint$ParseInt$parseIntHex(label.cz)));
	var randomHex = author$project$Main$generateColor(currentColor);
	return _Utils_update(
		label,
		{cz: randomHex});
};
var author$project$GitHubGraph$removeIssueLabel = F3(
	function (token, issue, name) {
		return A2(
			elm$core$Task$mapError,
			jamesmacaulay$elm_graphql$GraphQL$Client$Http$HttpError,
			lukewestby$elm_http_builder$HttpBuilder$toTask(
				A2(
					lukewestby$elm_http_builder$HttpBuilder$withHeaders,
					author$project$GitHubGraph$auth(token),
					lukewestby$elm_http_builder$HttpBuilder$delete(
						'https://api.github.com/repos/' + (issue.q.hN + ('/' + (issue.q.ht + ('/issues/' + (elm$core$String$fromInt(issue.k) + ('/labels/' + name))))))))));
	});
var author$project$Main$removeIssueLabel = F3(
	function (model, issue, label) {
		var _n0 = model.g;
		if (!_n0.$) {
			var token = _n0.a.h9;
			return A2(
				elm$core$Task$attempt,
				author$project$Main$DataChanged(
					A2(author$project$Backend$refreshIssue, issue.fu, author$project$Main$IssueRefreshed)),
				A3(author$project$GitHubGraph$removeIssueLabel, token, issue, label));
		} else {
			return elm$core$Platform$Cmd$none;
		}
	});
var author$project$GitHubGraph$removePullRequestLabel = F3(
	function (token, issue, name) {
		return A2(
			elm$core$Task$mapError,
			jamesmacaulay$elm_graphql$GraphQL$Client$Http$HttpError,
			lukewestby$elm_http_builder$HttpBuilder$toTask(
				A2(
					lukewestby$elm_http_builder$HttpBuilder$withHeaders,
					author$project$GitHubGraph$auth(token),
					lukewestby$elm_http_builder$HttpBuilder$delete(
						'https://api.github.com/repos/' + (issue.q.hN + ('/' + (issue.q.ht + ('/issues/' + (elm$core$String$fromInt(issue.k) + ('/labels/' + name))))))))));
	});
var author$project$Main$removePullRequestLabel = F3(
	function (model, pr, label) {
		var _n0 = model.g;
		if (!_n0.$) {
			var token = _n0.a.h9;
			return A2(
				elm$core$Task$attempt,
				author$project$Main$DataChanged(
					A2(author$project$Backend$refreshPR, pr.fu, author$project$Main$PullRequestRefreshed)),
				A3(author$project$GitHubGraph$removePullRequestLabel, token, pr, label));
		} else {
			return elm$core$Platform$Cmd$none;
		}
	});
var author$project$Main$AllProjectsPage = {$: 0};
var author$project$Main$BouncePage = {$: 6};
var author$project$Main$LabelsPage = {$: 3};
var author$project$Main$MilestonesPage = {$: 4};
var author$project$Main$ProjectPage = function (a) {
	return {$: 2, a: a};
};
var author$project$Main$PullRequestsPage = {$: 5};
var elm$url$Url$Parser$Parser = elm$core$Basics$identity;
var elm$url$Url$Parser$State = F5(
	function (visited, unvisited, params, frag, value) {
		return {a$: frag, a2: params, aY: unvisited, ew: value, a7: visited};
	});
var elm$url$Url$Parser$mapState = F2(
	function (func, _n0) {
		var visited = _n0.a7;
		var unvisited = _n0.aY;
		var params = _n0.a2;
		var frag = _n0.a$;
		var value = _n0.ew;
		return A5(
			elm$url$Url$Parser$State,
			visited,
			unvisited,
			params,
			frag,
			func(value));
	});
var elm$url$Url$Parser$map = F2(
	function (subValue, _n0) {
		var parseArg = _n0;
		return function (_n1) {
			var visited = _n1.a7;
			var unvisited = _n1.aY;
			var params = _n1.a2;
			var frag = _n1.a$;
			var value = _n1.ew;
			return A2(
				elm$core$List$map,
				elm$url$Url$Parser$mapState(value),
				parseArg(
					A5(elm$url$Url$Parser$State, visited, unvisited, params, frag, subValue)));
		};
	});
var elm$core$List$concatMap = F2(
	function (f, list) {
		return elm$core$List$concat(
			A2(elm$core$List$map, f, list));
	});
var elm$url$Url$Parser$oneOf = function (parsers) {
	return function (state) {
		return A2(
			elm$core$List$concatMap,
			function (_n0) {
				var parser = _n0;
				return parser(state);
			},
			parsers);
	};
};
var elm$url$Url$Parser$s = function (str) {
	return function (_n0) {
		var visited = _n0.a7;
		var unvisited = _n0.aY;
		var params = _n0.a2;
		var frag = _n0.a$;
		var value = _n0.ew;
		if (!unvisited.b) {
			return _List_Nil;
		} else {
			var next = unvisited.a;
			var rest = unvisited.b;
			return _Utils_eq(next, str) ? _List_fromArray(
				[
					A5(
					elm$url$Url$Parser$State,
					A2(elm$core$List$cons, next, visited),
					rest,
					params,
					frag,
					value)
				]) : _List_Nil;
		}
	};
};
var elm$url$Url$Parser$slash = F2(
	function (_n0, _n1) {
		var parseBefore = _n0;
		var parseAfter = _n1;
		return function (state) {
			return A2(
				elm$core$List$concatMap,
				parseAfter,
				parseBefore(state));
		};
	});
var elm$url$Url$Parser$custom = F2(
	function (tipe, stringToSomething) {
		return function (_n0) {
			var visited = _n0.a7;
			var unvisited = _n0.aY;
			var params = _n0.a2;
			var frag = _n0.a$;
			var value = _n0.ew;
			if (!unvisited.b) {
				return _List_Nil;
			} else {
				var next = unvisited.a;
				var rest = unvisited.b;
				var _n2 = stringToSomething(next);
				if (!_n2.$) {
					var nextValue = _n2.a;
					return _List_fromArray(
						[
							A5(
							elm$url$Url$Parser$State,
							A2(elm$core$List$cons, next, visited),
							rest,
							params,
							frag,
							value(nextValue))
						]);
				} else {
					return _List_Nil;
				}
			}
		};
	});
var elm$url$Url$Parser$string = A2(elm$url$Url$Parser$custom, 'STRING', elm$core$Maybe$Just);
var elm$url$Url$Parser$top = function (state) {
	return _List_fromArray(
		[state]);
};
var author$project$Main$routeParser = elm$url$Url$Parser$oneOf(
	_List_fromArray(
		[
			A2(elm$url$Url$Parser$map, author$project$Main$AllProjectsPage, elm$url$Url$Parser$top),
			A2(
			elm$url$Url$Parser$map,
			author$project$Main$AllProjectsPage,
			elm$url$Url$Parser$s('projects')),
			A2(
			elm$url$Url$Parser$map,
			author$project$Main$ProjectPage,
			A2(
				elm$url$Url$Parser$slash,
				elm$url$Url$Parser$s('projects'),
				elm$url$Url$Parser$string)),
			A2(
			elm$url$Url$Parser$map,
			author$project$Main$GlobalGraphPage,
			elm$url$Url$Parser$s('graph')),
			A2(
			elm$url$Url$Parser$map,
			author$project$Main$LabelsPage,
			elm$url$Url$Parser$s('labels')),
			A2(
			elm$url$Url$Parser$map,
			author$project$Main$MilestonesPage,
			elm$url$Url$Parser$s('milestones')),
			A2(
			elm$url$Url$Parser$map,
			author$project$Main$PullRequestsPage,
			elm$url$Url$Parser$s('pull-requests')),
			A2(
			elm$url$Url$Parser$map,
			author$project$Main$BouncePage,
			A2(
				elm$url$Url$Parser$slash,
				elm$url$Url$Parser$s('auth'),
				elm$url$Url$Parser$s('github'))),
			A2(
			elm$url$Url$Parser$map,
			author$project$Main$BouncePage,
			elm$url$Url$Parser$s('auth')),
			A2(
			elm$url$Url$Parser$map,
			author$project$Main$BouncePage,
			elm$url$Url$Parser$s('logout'))
		]));
var elm_community$json_extra$Json$Encode$Extra$maybe = function (encoder) {
	return A2(
		elm$core$Basics$composeR,
		elm$core$Maybe$map(encoder),
		elm$core$Maybe$withDefault(elm$json$Json$Encode$null));
};
var author$project$GitHubGraph$setIssueMilestone = F3(
	function (token, issue, mmilestone) {
		return A2(
			elm$core$Task$mapError,
			jamesmacaulay$elm_graphql$GraphQL$Client$Http$HttpError,
			lukewestby$elm_http_builder$HttpBuilder$toTask(
				A2(
					lukewestby$elm_http_builder$HttpBuilder$withJsonBody,
					elm$json$Json$Encode$object(
						_List_fromArray(
							[
								_Utils_Tuple2(
								'milestone',
								A2(
									elm_community$json_extra$Json$Encode$Extra$maybe,
									elm$json$Json$Encode$int,
									A2(
										elm$core$Maybe$map,
										function ($) {
											return $.k;
										},
										mmilestone)))
							])),
					A2(
						lukewestby$elm_http_builder$HttpBuilder$withHeaders,
						author$project$GitHubGraph$auth(token),
						lukewestby$elm_http_builder$HttpBuilder$patch(
							'https://api.github.com/repos/' + (issue.q.hN + ('/' + (issue.q.ht + ('/issues/' + elm$core$String$fromInt(issue.k))))))))));
	});
var author$project$Main$IssueMilestoned = F2(
	function (a, b) {
		return {$: 48, a: a, b: b};
	});
var author$project$Main$setIssueMilestone = F3(
	function (model, issue, mmilestone) {
		var _n0 = model.g;
		if (!_n0.$) {
			var token = _n0.a.h9;
			return A2(
				elm$core$Task$attempt,
				author$project$Main$IssueMilestoned(issue),
				A3(author$project$GitHubGraph$setIssueMilestone, token, issue, mmilestone));
		} else {
			return elm$core$Platform$Cmd$none;
		}
	});
var author$project$GitHubGraph$setPullRequestMilestone = F3(
	function (token, pr, mmilestone) {
		return A2(
			elm$core$Task$mapError,
			jamesmacaulay$elm_graphql$GraphQL$Client$Http$HttpError,
			lukewestby$elm_http_builder$HttpBuilder$toTask(
				A2(
					lukewestby$elm_http_builder$HttpBuilder$withJsonBody,
					elm$json$Json$Encode$object(
						_List_fromArray(
							[
								_Utils_Tuple2(
								'milestone',
								A2(
									elm_community$json_extra$Json$Encode$Extra$maybe,
									elm$json$Json$Encode$int,
									A2(
										elm$core$Maybe$map,
										function ($) {
											return $.k;
										},
										mmilestone)))
							])),
					A2(
						lukewestby$elm_http_builder$HttpBuilder$withHeaders,
						author$project$GitHubGraph$auth(token),
						lukewestby$elm_http_builder$HttpBuilder$patch(
							'https://api.github.com/repos/' + (pr.q.hN + ('/' + (pr.q.ht + ('/issues/' + elm$core$String$fromInt(pr.k))))))))));
	});
var author$project$Main$PullRequestMilestoned = F2(
	function (a, b) {
		return {$: 49, a: a, b: b};
	});
var author$project$Main$setPRMilestone = F3(
	function (model, pr, mmilestone) {
		var _n0 = model.g;
		if (!_n0.$) {
			var token = _n0.a.h9;
			return A2(
				elm$core$Task$attempt,
				author$project$Main$PullRequestMilestoned(pr),
				A3(author$project$GitHubGraph$setPullRequestMilestone, token, pr, mmilestone));
		} else {
			return elm$core$Platform$Cmd$none;
		}
	});
var author$project$GitHubGraph$updateRepoLabel = F5(
	function (token, repo, label, name, color) {
		return A2(
			elm$core$Task$mapError,
			jamesmacaulay$elm_graphql$GraphQL$Client$Http$HttpError,
			lukewestby$elm_http_builder$HttpBuilder$toTask(
				A2(
					lukewestby$elm_http_builder$HttpBuilder$withJsonBody,
					A2(author$project$GitHubGraph$encodeLabelPatch, name, color),
					A2(
						lukewestby$elm_http_builder$HttpBuilder$withHeaders,
						author$project$GitHubGraph$auth(token),
						lukewestby$elm_http_builder$HttpBuilder$patch('https://api.github.com/repos/' + (repo.hN + ('/' + (repo.ht + ('/labels/' + label.ht)))))))));
	});
var author$project$Main$updateLabel = F4(
	function (model, repo, label1, label2) {
		var _n0 = model.g;
		if (!_n0.$) {
			var token = _n0.a.h9;
			return A2(
				elm$core$Task$attempt,
				author$project$Main$LabelChanged(repo),
				A5(author$project$GitHubGraph$updateRepoLabel, token, repo, label1, label2.ht, label2.cz));
		} else {
			return elm$core$Platform$Cmd$none;
		}
	});
var elm$browser$Browser$External = function (a) {
	return {$: 1, a: a};
};
var elm$browser$Browser$Internal = function (a) {
	return {$: 0, a: a};
};
var elm$browser$Browser$Dom$NotFound = elm$core$Basics$identity;
var elm$core$Basics$never = function (_n0) {
	never:
	while (true) {
		var nvr = _n0;
		var $temp$_n0 = nvr;
		_n0 = $temp$_n0;
		continue never;
	}
};
var elm$core$Task$perform = F2(
	function (toMessage, task) {
		return elm$core$Task$command(
			A2(elm$core$Task$map, toMessage, task));
	});
var elm$core$String$dropLeft = F2(
	function (n, string) {
		return (n < 1) ? string : A3(
			elm$core$String$slice,
			n,
			elm$core$String$length(string),
			string);
	});
var elm$url$Url$Http = 0;
var elm$url$Url$Https = 1;
var elm$core$String$indexes = _String_indexes;
var elm$core$String$left = F2(
	function (n, string) {
		return (n < 1) ? '' : A3(elm$core$String$slice, 0, n, string);
	});
var elm$url$Url$Url = F6(
	function (protocol, host, port_, path, query, fragment) {
		return {fn: fragment, fr: host, fY: path, f_: port_, f4: protocol, f6: query};
	});
var elm$url$Url$chompBeforePath = F5(
	function (protocol, path, params, frag, str) {
		if (elm$core$String$isEmpty(str) || A2(elm$core$String$contains, '@', str)) {
			return elm$core$Maybe$Nothing;
		} else {
			var _n0 = A2(elm$core$String$indexes, ':', str);
			if (!_n0.b) {
				return elm$core$Maybe$Just(
					A6(elm$url$Url$Url, protocol, str, elm$core$Maybe$Nothing, path, params, frag));
			} else {
				if (!_n0.b.b) {
					var i = _n0.a;
					var _n1 = elm$core$String$toInt(
						A2(elm$core$String$dropLeft, i + 1, str));
					if (_n1.$ === 1) {
						return elm$core$Maybe$Nothing;
					} else {
						var port_ = _n1;
						return elm$core$Maybe$Just(
							A6(
								elm$url$Url$Url,
								protocol,
								A2(elm$core$String$left, i, str),
								port_,
								path,
								params,
								frag));
					}
				} else {
					return elm$core$Maybe$Nothing;
				}
			}
		}
	});
var elm$url$Url$chompBeforeQuery = F4(
	function (protocol, params, frag, str) {
		if (elm$core$String$isEmpty(str)) {
			return elm$core$Maybe$Nothing;
		} else {
			var _n0 = A2(elm$core$String$indexes, '/', str);
			if (!_n0.b) {
				return A5(elm$url$Url$chompBeforePath, protocol, '/', params, frag, str);
			} else {
				var i = _n0.a;
				return A5(
					elm$url$Url$chompBeforePath,
					protocol,
					A2(elm$core$String$dropLeft, i, str),
					params,
					frag,
					A2(elm$core$String$left, i, str));
			}
		}
	});
var elm$url$Url$chompBeforeFragment = F3(
	function (protocol, frag, str) {
		if (elm$core$String$isEmpty(str)) {
			return elm$core$Maybe$Nothing;
		} else {
			var _n0 = A2(elm$core$String$indexes, '?', str);
			if (!_n0.b) {
				return A4(elm$url$Url$chompBeforeQuery, protocol, elm$core$Maybe$Nothing, frag, str);
			} else {
				var i = _n0.a;
				return A4(
					elm$url$Url$chompBeforeQuery,
					protocol,
					elm$core$Maybe$Just(
						A2(elm$core$String$dropLeft, i + 1, str)),
					frag,
					A2(elm$core$String$left, i, str));
			}
		}
	});
var elm$url$Url$chompAfterProtocol = F2(
	function (protocol, str) {
		if (elm$core$String$isEmpty(str)) {
			return elm$core$Maybe$Nothing;
		} else {
			var _n0 = A2(elm$core$String$indexes, '#', str);
			if (!_n0.b) {
				return A3(elm$url$Url$chompBeforeFragment, protocol, elm$core$Maybe$Nothing, str);
			} else {
				var i = _n0.a;
				return A3(
					elm$url$Url$chompBeforeFragment,
					protocol,
					elm$core$Maybe$Just(
						A2(elm$core$String$dropLeft, i + 1, str)),
					A2(elm$core$String$left, i, str));
			}
		}
	});
var elm$url$Url$fromString = function (str) {
	return A2(elm$core$String$startsWith, 'http://', str) ? A2(
		elm$url$Url$chompAfterProtocol,
		0,
		A2(elm$core$String$dropLeft, 7, str)) : (A2(elm$core$String$startsWith, 'https://', str) ? A2(
		elm$url$Url$chompAfterProtocol,
		1,
		A2(elm$core$String$dropLeft, 8, str)) : elm$core$Maybe$Nothing);
};
var elm$browser$Browser$Navigation$load = _Browser_load;
var elm$browser$Browser$Navigation$pushUrl = _Browser_pushUrl;
var elm$core$Set$foldr = F3(
	function (func, initialState, _n0) {
		var dict = _n0;
		return A3(
			elm$core$Dict$foldr,
			F3(
				function (key, _n1, state) {
					return A2(func, key, state);
				}),
			initialState,
			dict);
	});
var elm$core$Set$remove = F2(
	function (key, _n0) {
		var dict = _n0;
		return A2(elm$core$Dict$remove, key, dict);
	});
var elm$url$Url$addPort = F2(
	function (maybePort, starter) {
		if (maybePort.$ === 1) {
			return starter;
		} else {
			var port_ = maybePort.a;
			return starter + (':' + elm$core$String$fromInt(port_));
		}
	});
var elm$url$Url$addPrefixed = F3(
	function (prefix, maybeSegment, starter) {
		if (maybeSegment.$ === 1) {
			return starter;
		} else {
			var segment = maybeSegment.a;
			return _Utils_ap(
				starter,
				_Utils_ap(prefix, segment));
		}
	});
var elm$url$Url$toString = function (url) {
	var http = function () {
		var _n0 = url.f4;
		if (!_n0) {
			return 'http://';
		} else {
			return 'https://';
		}
	}();
	return A3(
		elm$url$Url$addPrefixed,
		'#',
		url.fn,
		A3(
			elm$url$Url$addPrefixed,
			'?',
			url.f6,
			_Utils_ap(
				A2(
					elm$url$Url$addPort,
					url.f_,
					_Utils_ap(http, url.fr)),
				url.fY)));
};
var elm$url$Url$Parser$getFirstMatch = function (states) {
	getFirstMatch:
	while (true) {
		if (!states.b) {
			return elm$core$Maybe$Nothing;
		} else {
			var state = states.a;
			var rest = states.b;
			var _n1 = state.aY;
			if (!_n1.b) {
				return elm$core$Maybe$Just(state.ew);
			} else {
				if ((_n1.a === '') && (!_n1.b.b)) {
					return elm$core$Maybe$Just(state.ew);
				} else {
					var $temp$states = rest;
					states = $temp$states;
					continue getFirstMatch;
				}
			}
		}
	}
};
var elm$url$Url$Parser$removeFinalEmpty = function (segments) {
	if (!segments.b) {
		return _List_Nil;
	} else {
		if ((segments.a === '') && (!segments.b.b)) {
			return _List_Nil;
		} else {
			var segment = segments.a;
			var rest = segments.b;
			return A2(
				elm$core$List$cons,
				segment,
				elm$url$Url$Parser$removeFinalEmpty(rest));
		}
	}
};
var elm$url$Url$Parser$preparePath = function (path) {
	var _n0 = A2(elm$core$String$split, '/', path);
	if (_n0.b && (_n0.a === '')) {
		var segments = _n0.b;
		return elm$url$Url$Parser$removeFinalEmpty(segments);
	} else {
		var segments = _n0;
		return elm$url$Url$Parser$removeFinalEmpty(segments);
	}
};
var elm$url$Url$percentDecode = _Url_percentDecode;
var elm$url$Url$Parser$addToParametersHelp = F2(
	function (value, maybeList) {
		if (maybeList.$ === 1) {
			return elm$core$Maybe$Just(
				_List_fromArray(
					[value]));
		} else {
			var list = maybeList.a;
			return elm$core$Maybe$Just(
				A2(elm$core$List$cons, value, list));
		}
	});
var elm$url$Url$Parser$addParam = F2(
	function (segment, dict) {
		var _n0 = A2(elm$core$String$split, '=', segment);
		if ((_n0.b && _n0.b.b) && (!_n0.b.b.b)) {
			var rawKey = _n0.a;
			var _n1 = _n0.b;
			var rawValue = _n1.a;
			var _n2 = elm$url$Url$percentDecode(rawKey);
			if (_n2.$ === 1) {
				return dict;
			} else {
				var key = _n2.a;
				var _n3 = elm$url$Url$percentDecode(rawValue);
				if (_n3.$ === 1) {
					return dict;
				} else {
					var value = _n3.a;
					return A3(
						elm$core$Dict$update,
						key,
						elm$url$Url$Parser$addToParametersHelp(value),
						dict);
				}
			}
		} else {
			return dict;
		}
	});
var elm$url$Url$Parser$prepareQuery = function (maybeQuery) {
	if (maybeQuery.$ === 1) {
		return elm$core$Dict$empty;
	} else {
		var qry = maybeQuery.a;
		return A3(
			elm$core$List$foldr,
			elm$url$Url$Parser$addParam,
			elm$core$Dict$empty,
			A2(elm$core$String$split, '&', qry));
	}
};
var elm$url$Url$Parser$parse = F2(
	function (_n0, url) {
		var parser = _n0;
		return elm$url$Url$Parser$getFirstMatch(
			parser(
				A5(
					elm$url$Url$Parser$State,
					_List_Nil,
					elm$url$Url$Parser$preparePath(url.fY),
					elm$url$Url$Parser$prepareQuery(url.f6),
					url.fn,
					elm$core$Basics$identity)));
	});
var y0hy0h$ordered_containers$OrderedSet$insert = F2(
	function (key, _n0) {
		var list = _n0.a;
		var dict = _n0.b;
		var _n1 = A2(elm$core$Dict$get, key, dict);
		if (!_n1.$) {
			return A2(y0hy0h$ordered_containers$OrderedSet$OrderedSet, list, dict);
		} else {
			return A2(
				y0hy0h$ordered_containers$OrderedSet$OrderedSet,
				_Utils_ap(
					list,
					_List_fromArray(
						[key])),
				A3(elm$core$Dict$insert, key, 0, dict));
		}
	});
var y0hy0h$ordered_containers$OrderedSet$remove = F2(
	function (key, _n0) {
		var list = _n0.a;
		var dict = _n0.b;
		var _n1 = A2(elm$core$Dict$get, key, dict);
		if (!_n1.$) {
			return A2(
				y0hy0h$ordered_containers$OrderedSet$OrderedSet,
				A2(
					elm$core$List$filter,
					function (k) {
						return !_Utils_eq(k, key);
					},
					list),
				A2(elm$core$Dict$remove, key, dict));
		} else {
			return A2(y0hy0h$ordered_containers$OrderedSet$OrderedSet, list, dict);
		}
	});
var y0hy0h$ordered_containers$OrderedSet$toList = function (_n0) {
	var list = _n0.a;
	return list;
};
var author$project$Main$update = F2(
	function (msg, model) {
		update:
		while (true) {
			switch (msg.$) {
				case 3:
					return model.bZ ? _Utils_Tuple2(model, elm$core$Platform$Cmd$none) : _Utils_Tuple2(
						_Utils_update(
							model,
							{bZ: true}),
						author$project$Backend$fetchData(author$project$Main$DataFetched));
				case 0:
					var urlRequest = msg.a;
					if (!urlRequest.$) {
						var url = urlRequest.a;
						return _Utils_Tuple2(
							model,
							A2(
								elm$browser$Browser$Navigation$pushUrl,
								model.dH,
								elm$url$Url$toString(url)));
					} else {
						var href = urlRequest.a;
						return _Utils_Tuple2(
							model,
							elm$browser$Browser$Navigation$load(href));
					}
				case 1:
					var url = msg.a;
					var _n2 = A2(elm$url$Url$Parser$parse, author$project$Main$routeParser, url);
					if (!_n2.$) {
						if (_n2.a.$ === 6) {
							var _n3 = _n2.a;
							return _Utils_Tuple2(
								model,
								elm$browser$Browser$Navigation$load(
									elm$url$Url$toString(url)));
						} else {
							var page = _n2.a;
							var baseGraphFilter = function () {
								switch (page.$) {
									case 0:
										return elm$core$Maybe$Just(author$project$Main$ExcludeAllFilter);
									case 1:
										return elm$core$Maybe$Nothing;
									case 2:
										var name = page.a;
										return elm$core$Maybe$Just(
											author$project$Main$InProjectFilter(name));
									case 3:
										return elm$core$Maybe$Just(author$project$Main$ExcludeAllFilter);
									case 4:
										return elm$core$Maybe$Just(author$project$Main$ExcludeAllFilter);
									case 5:
										return elm$core$Maybe$Just(author$project$Main$ExcludeAllFilter);
									default:
										return elm$core$Maybe$Nothing;
								}
							}();
							return _Utils_Tuple2(
								author$project$Main$computeGraph(
									author$project$Main$computeDataView(
										_Utils_update(
											model,
											{cs: baseGraphFilter, bv: page}))),
								elm$core$Platform$Cmd$none);
						}
					} else {
						return _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
					}
				case 2:
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								ax: A2(
									elm$core$List$map,
									function (_n5) {
										var s = _n5.a;
										var g = _n5.b;
										return author$project$ForceGraph$isCompleted(g) ? _Utils_Tuple2(s, g) : _Utils_Tuple2(
											s,
											author$project$ForceGraph$tick(g));
									},
									model.ax)
							}),
						elm$core$Platform$Cmd$none);
				case 4:
					var date = msg.a;
					return _Utils_Tuple2(
						author$project$Main$computeGraphState(
							_Utils_update(
								model,
								{M: date})),
						elm$core$Platform$Cmd$none);
				case 5:
					var subMsg = msg.a;
					var dragModel = A2(author$project$Drag$update, subMsg, model.h);
					var newModel = _Utils_update(
						model,
						{h: dragModel});
					if (dragModel.$ === 2) {
						var state = dragModel.a;
						var $temp$msg = state.fP,
							$temp$model = _Utils_update(
							newModel,
							{
								h: author$project$Drag$drop(newModel.h)
							});
						msg = $temp$msg;
						model = $temp$model;
						continue update;
					} else {
						return _Utils_Tuple2(newModel, elm$core$Platform$Cmd$none);
					}
				case 6:
					var subMsg = msg.a;
					var dragModel = A2(author$project$Drag$update, subMsg, model.E);
					var newModel = _Utils_update(
						model,
						{E: dragModel});
					if (dragModel.$ === 2) {
						var state = dragModel.a;
						var $temp$msg = state.fP,
							$temp$model = _Utils_update(
							newModel,
							{
								h: author$project$Drag$drop(newModel.h)
							});
						msg = $temp$msg;
						model = $temp$model;
						continue update;
					} else {
						return _Utils_Tuple2(newModel, elm$core$Platform$Cmd$none);
					}
				case 7:
					var source = msg.a;
					var dest = msg.b;
					if (!source.$) {
						var cardId = source.a.eS;
						return _Utils_Tuple2(
							model,
							A3(author$project$Main$moveCard, model, dest, cardId));
					} else {
						var contentId = source.a.gY;
						return _Utils_Tuple2(
							model,
							A3(author$project$Main$addCard, model, dest, contentId));
					}
				case 8:
					if (!msg.b.$) {
						var col = msg.a;
						var content = msg.b.a.cB;
						var _n9 = model.h;
						if (_n9.$ === 3) {
							var drag = _n9.a;
							var wrapValue = F2(
								function (f, indexed) {
									return _Utils_update(
										indexed,
										{
											ew: f(indexed.ew)
										});
								});
							var msourceId = function () {
								var _n13 = drag.aD;
								if (!_n13.$) {
									var cs = _n13.a;
									return _Utils_eq(cs.cA, col) ? elm$core$Maybe$Nothing : elm$core$Maybe$Just(cs.cA);
								} else {
									return elm$core$Maybe$Nothing;
								}
							}();
							var _n10 = function () {
								if (!content.$) {
									if (!content.a.$) {
										var issue = content.a.a;
										return _Utils_Tuple2(
											elm$core$Maybe$Just(issue.fu),
											A2(
												author$project$Backend$refreshIssue,
												issue.fu,
												A2(
													elm$core$Basics$composeL,
													author$project$Main$CardDropContentRefreshed,
													elm$core$Result$map(
														function (x) {
															return {
																dF: x.dF,
																ew: author$project$GitHubGraph$IssueCardContent(x.ew)
															};
														}))));
									} else {
										var pr = content.a.a;
										return _Utils_Tuple2(
											elm$core$Maybe$Just(pr.fu),
											A2(
												author$project$Backend$refreshPR,
												pr.fu,
												A2(
													elm$core$Basics$composeL,
													author$project$Main$CardDropContentRefreshed,
													elm$core$Result$map(
														function (x) {
															return {
																dF: x.dF,
																ew: author$project$GitHubGraph$PullRequestCardContent(x.ew)
															};
														}))));
									}
								} else {
									return _Utils_Tuple2(elm$core$Maybe$Nothing, elm$core$Platform$Cmd$none);
								}
							}();
							var mcontentId = _n10.a;
							var refreshContent = _n10.b;
							if (!msourceId.$) {
								var sourceId = msourceId.a;
								return _Utils_Tuple2(
									_Utils_update(
										model,
										{
											ad: elm$core$Maybe$Just(
												{
													cB: elm$core$Maybe$Nothing,
													gY: mcontentId,
													cb: elm$core$Maybe$Nothing,
													c_: elm$core$Maybe$Just(sourceId),
													ce: elm$core$Maybe$Nothing,
													c0: elm$core$Maybe$Just(col)
												})
										}),
									elm$core$Platform$Cmd$batch(
										_List_fromArray(
											[
												refreshContent,
												A2(author$project$Backend$refreshCards, sourceId, author$project$Main$CardDropSourceRefreshed),
												A2(author$project$Backend$refreshCards, col, author$project$Main$CardDropTargetRefreshed)
											])));
							} else {
								return _Utils_Tuple2(
									_Utils_update(
										model,
										{
											ad: elm$core$Maybe$Just(
												{
													cB: elm$core$Maybe$Nothing,
													gY: mcontentId,
													cb: elm$core$Maybe$Nothing,
													c_: elm$core$Maybe$Nothing,
													ce: elm$core$Maybe$Nothing,
													c0: elm$core$Maybe$Just(col)
												})
										}),
									elm$core$Platform$Cmd$batch(
										_List_fromArray(
											[
												refreshContent,
												A2(author$project$Backend$refreshCards, col, author$project$Main$CardDropTargetRefreshed)
											])));
							}
						} else {
							return _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
						}
					} else {
						var col = msg.a;
						var err = msg.b.a;
						return A3(
							author$project$Log$debug,
							'failed to move card',
							err,
							_Utils_Tuple2(model, elm$core$Platform$Cmd$none));
					}
				case 9:
					if (!msg.a.$) {
						var index = msg.a.a.dF;
						var value = msg.a.a.ew;
						var _n14 = model.ad;
						if (_n14.$ === 1) {
							return _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
						} else {
							var pdr = _n14.a;
							return _Utils_Tuple2(
								author$project$Main$finishProjectDragRefresh(
									_Utils_update(
										model,
										{
											m: A2(elm$core$Basics$max, index, model.m),
											ad: elm$core$Maybe$Just(
												_Utils_update(
													pdr,
													{
														cB: elm$core$Maybe$Just(value)
													}))
										})),
								elm$core$Platform$Cmd$none);
						}
					} else {
						var err = msg.a.a;
						return A3(
							author$project$Log$debug,
							'failed to refresh card',
							err,
							_Utils_Tuple2(model, elm$core$Platform$Cmd$none));
					}
				case 10:
					if (!msg.a.$) {
						var index = msg.a.a.dF;
						var value = msg.a.a.ew;
						var _n15 = model.ad;
						if (_n15.$ === 1) {
							return _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
						} else {
							var pdr = _n15.a;
							return _Utils_Tuple2(
								author$project$Main$finishProjectDragRefresh(
									_Utils_update(
										model,
										{
											m: A2(elm$core$Basics$max, index, model.m),
											ad: elm$core$Maybe$Just(
												_Utils_update(
													pdr,
													{
														cb: elm$core$Maybe$Just(value)
													}))
										})),
								elm$core$Platform$Cmd$none);
						}
					} else {
						var err = msg.a.a;
						return A3(
							author$project$Log$debug,
							'failed to refresh card',
							err,
							_Utils_Tuple2(model, elm$core$Platform$Cmd$none));
					}
				case 11:
					if (!msg.a.$) {
						var index = msg.a.a.dF;
						var value = msg.a.a.ew;
						var _n16 = model.ad;
						if (_n16.$ === 1) {
							return _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
						} else {
							var pdr = _n16.a;
							return _Utils_Tuple2(
								author$project$Main$finishProjectDragRefresh(
									_Utils_update(
										model,
										{
											m: A2(elm$core$Basics$max, index, model.m),
											ad: elm$core$Maybe$Just(
												_Utils_update(
													pdr,
													{
														ce: elm$core$Maybe$Just(value)
													}))
										})),
								elm$core$Platform$Cmd$none);
						}
					} else {
						var err = msg.a.a;
						return A3(
							author$project$Log$debug,
							'failed to refresh card',
							err,
							_Utils_Tuple2(model, elm$core$Platform$Cmd$none));
					}
				case 12:
					if (!msg.b.$) {
						var col = msg.a;
						var index = msg.b.a.dF;
						var value = msg.b.a.ew;
						var data = model.c;
						var newData = _Utils_update(
							data,
							{
								eY: A3(elm$core$Dict$insert, col, value, data.eY)
							});
						return _Utils_Tuple2(
							author$project$Main$computeDataView(
								_Utils_update(
									model,
									{
										c: newData,
										m: A2(elm$core$Basics$max, index, model.m)
									})),
							elm$core$Platform$Cmd$none);
					} else {
						var col = msg.a;
						var err = msg.b.a;
						return A3(
							author$project$Log$debug,
							'failed to refresh cards',
							err,
							_Utils_Tuple2(model, elm$core$Platform$Cmd$none));
					}
				case 21:
					var str = msg.a;
					var tokens = A2(elm$core$String$split, ' ', str);
					var cardsByTitle = A3(
						elm$core$Dict$foldl,
						F2(
							function (_n21, card) {
								return A2(
									elm$core$Dict$insert,
									elm$core$String$toLower(card.bF),
									card);
							}),
						elm$core$Dict$empty,
						model.p);
					var _n17 = A2(
						elm$core$List$partition,
						elm$core$String$contains(':'),
						tokens);
					var filterTokens = _n17.a;
					var rest = _n17.b;
					var filters = A2(
						elm$core$List$map,
						elm$core$String$split(':'),
						filterTokens);
					var query = elm$core$String$toLower(
						A2(elm$core$String$join, ' ', rest));
					var cardMatch = F2(
						function (title, card) {
							return ((elm$core$String$length(query) < 2) && elm$core$List$isEmpty(filters)) ? false : (A2(elm$core$String$contains, query, title) ? function (a) {
								return A2(elm$core$List$all, a, filters);
							}(
								function (filter) {
									if (((filter.b && (filter.a === 'label')) && filter.b.b) && (!filter.b.b.b)) {
										var _n20 = filter.b;
										var name = _n20.a;
										return A3(author$project$Main$hasLabel, model, name, card);
									} else {
										return false;
									}
								}) : false);
						});
					var foundCards = A3(
						elm$core$Dict$foldl,
						F2(
							function (_n18, card) {
								return elm$core$Set$insert(card.fu);
							}),
						elm$core$Set$empty,
						A2(elm$core$Dict$filter, cardMatch, cardsByTitle));
					return _Utils_Tuple2(
						author$project$Main$computeGraphState(
							_Utils_update(
								model,
								{u: foundCards, bc: str})),
						elm$core$Platform$Cmd$none);
				case 22:
					return _Utils_Tuple2(
						author$project$Main$computeGraphState(
							_Utils_update(
								model,
								{
									u: elm$core$Set$empty,
									s: A3(elm$core$Set$foldr, y0hy0h$ordered_containers$OrderedSet$insert, model.s, model.u)
								})),
						elm$core$Platform$Cmd$none);
				case 15:
					var id = msg.a;
					return _Utils_Tuple2(
						author$project$Main$computeGraphState(
							_Utils_update(
								model,
								{
									s: A2(y0hy0h$ordered_containers$OrderedSet$insert, id, model.s)
								})),
						elm$core$Platform$Cmd$none);
				case 23:
					return _Utils_Tuple2(
						author$project$Main$computeGraphState(
							_Utils_update(
								model,
								{s: y0hy0h$ordered_containers$OrderedSet$empty})),
						elm$core$Platform$Cmd$none);
				case 16:
					var id = msg.a;
					return _Utils_Tuple2(
						author$project$Main$computeGraphState(
							_Utils_update(
								model,
								{
									s: A2(y0hy0h$ordered_containers$OrderedSet$remove, id, model.s)
								})),
						elm$core$Platform$Cmd$none);
				case 17:
					var id = msg.a;
					return _Utils_Tuple2(
						author$project$Main$computeGraphState(
							_Utils_update(
								model,
								{
									W: elm$core$Maybe$Just(id)
								})),
						elm$core$Platform$Cmd$none);
				case 18:
					var id = msg.a;
					return _Utils_Tuple2(
						author$project$Main$computeGraphState(
							_Utils_update(
								model,
								{W: elm$core$Maybe$Nothing})),
						elm$core$Platform$Cmd$none);
				case 19:
					var id = msg.a;
					return _Utils_Tuple2(
						author$project$Main$computeGraphState(
							_Utils_update(
								model,
								{
									u: A2(elm$core$Set$insert, id, model.u),
									bX: elm$core$Maybe$Just(id)
								})),
						elm$core$Platform$Cmd$none);
				case 20:
					var id = msg.a;
					return _Utils_Tuple2(
						author$project$Main$computeGraphState(
							_Utils_update(
								model,
								{
									u: A2(elm$core$Set$remove, id, model.u),
									bX: elm$core$Maybe$Nothing
								})),
						elm$core$Platform$Cmd$none);
				case 13:
					if (!msg.a.$) {
						var me = msg.a.a;
						return _Utils_Tuple2(
							author$project$Main$computeGraphState(
								_Utils_update(
									model,
									{g: me})),
							elm$core$Platform$Cmd$none);
					} else {
						var err = msg.a.a;
						return A3(
							author$project$Log$debug,
							'error fetching self',
							err,
							_Utils_Tuple2(model, elm$core$Platform$Cmd$none));
					}
				case 14:
					if (!msg.a.$) {
						var index = msg.a.a.dF;
						var value = msg.a.a.ew;
						return _Utils_Tuple2(
							function () {
								if (_Utils_cmp(index, model.m) > 0) {
									var prCards = A2(
										elm$core$Dict$map,
										function (_n26) {
											return author$project$Main$prCard;
										},
										value.f5);
									var issueCards = A2(
										elm$core$Dict$map,
										function (_n25) {
											return author$project$Main$issueCard;
										},
										value.fA);
									var allLabels = A3(
										elm$core$Dict$foldl,
										F3(
											function (_n24, r, ls) {
												return A3(
													elm$core$List$foldl,
													function (l) {
														return A2(elm$core$Dict$insert, l.fu, l);
													},
													ls,
													r.bk);
											}),
										elm$core$Dict$empty,
										value.ga);
									var colorLightnessCache = A3(
										elm$core$Dict$foldl,
										F3(
											function (_n22, _n23, cache) {
												var color = _n23.cz;
												return A3(
													elm$core$Dict$insert,
													color,
													author$project$Main$computeColorIsLight(color),
													cache);
											}),
										elm$core$Dict$empty,
										allLabels);
									var allCards = A2(elm$core$Dict$union, issueCards, prCards);
									return author$project$Main$computeGraphState(
										author$project$Main$computeGraph(
											author$project$Main$computeDataView(
												_Utils_update(
													model,
													{p: allCards, aj: allLabels, bN: colorLightnessCache, c: value, m: index}))));
								} else {
									return A3(
										author$project$Log$debug,
										'ignoring stale index',
										_Utils_Tuple2(index, model.m),
										model);
								}
							}(),
							author$project$Backend$pollData(author$project$Main$DataFetched));
					} else {
						var err = msg.a.a;
						return A3(
							author$project$Log$debug,
							'error fetching data',
							err,
							_Utils_Tuple2(
								_Utils_update(
									model,
									{bZ: false}),
								elm$core$Platform$Cmd$none));
					}
				case 24:
					var newLabel = msg.a;
					var cmds = A3(
						elm$core$Dict$foldl,
						F3(
							function (_n27, r, acc) {
								var _n28 = A2(
									elm$core$List$filter,
									A2(
										elm$core$Basics$composeL,
										elm$core$Basics$eq(newLabel.ht),
										function ($) {
											return $.ht;
										}),
									r.bk);
								if (!_n28.b) {
									return A2(
										elm$core$List$cons,
										A3(author$project$Main$createLabel, model, r, newLabel),
										acc);
								} else {
									var label = _n28.a;
									return _Utils_eq(label.cz, newLabel.cz) ? acc : A2(
										elm$core$List$cons,
										A4(author$project$Main$updateLabel, model, r, label, newLabel),
										acc);
								}
							}),
						_List_Nil,
						model.c.ga);
					return _Utils_Tuple2(
						model,
						elm$core$Platform$Cmd$batch(cmds));
				case 25:
					var label = msg.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								ap: A2(
									elm$core$Set$insert,
									author$project$Main$labelKey(label),
									model.ap)
							}),
						elm$core$Platform$Cmd$none);
				case 26:
					var label = msg.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								ap: A2(
									elm$core$Set$remove,
									author$project$Main$labelKey(label),
									model.ap)
							}),
						elm$core$Platform$Cmd$none);
				case 27:
					var label = msg.a;
					var cmds = A3(
						elm$core$Dict$foldl,
						F3(
							function (_n29, r, acc) {
								var _n30 = A2(
									elm$core$List$filter,
									author$project$Main$matchesLabel(label),
									r.bk);
								if (!_n30.b) {
									return acc;
								} else {
									var repoLabel = _n30.a;
									return A2(
										elm$core$List$cons,
										A3(author$project$Main$deleteLabel, model, r, repoLabel),
										acc);
								}
							}),
						_List_Nil,
						model.c.ga);
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								ap: A2(
									elm$core$Set$remove,
									author$project$Main$labelKey(label),
									model.ap)
							}),
						elm$core$Platform$Cmd$batch(cmds));
				case 28:
					var label = msg.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								t: A3(
									elm$core$Dict$insert,
									author$project$Main$labelKey(label),
									label,
									model.t)
							}),
						elm$core$Platform$Cmd$none);
				case 29:
					var label = msg.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								t: A2(
									elm$core$Dict$remove,
									author$project$Main$labelKey(label),
									model.t)
							}),
						elm$core$Platform$Cmd$none);
				case 30:
					var label = msg.a;
					var newName = msg.b;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								t: A3(
									elm$core$Dict$update,
									author$project$Main$labelKey(label),
									elm$core$Maybe$map(
										function (newLabel) {
											return _Utils_update(
												newLabel,
												{ht: newName});
										}),
									model.t)
							}),
						elm$core$Platform$Cmd$none);
				case 31:
					var newColor = msg.a;
					var newLabel = model.F;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								t: A2(
									elm$core$Dict$map,
									F2(
										function (_n31, label) {
											return _Utils_update(
												label,
												{cz: newColor});
										}),
									model.t),
								F: elm$core$String$isEmpty(newLabel.ht) ? newLabel : _Utils_update(
									newLabel,
									{cz: newColor}),
								bp: !elm$core$String$isEmpty(newLabel.ht)
							}),
						elm$core$Platform$Cmd$none);
				case 32:
					var label = msg.a;
					var _n32 = A2(
						elm$core$Dict$get,
						author$project$Main$labelKey(label),
						model.t);
					if (_n32.$ === 1) {
						return _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
					} else {
						var newLabel = _n32.a;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									t: A3(
										elm$core$Dict$insert,
										author$project$Main$labelKey(label),
										author$project$Main$randomizeColor(newLabel),
										model.t)
								}),
							elm$core$Platform$Cmd$none);
					}
				case 33:
					var oldLabel = msg.a;
					var _n33 = A2(
						elm$core$Dict$get,
						author$project$Main$labelKey(oldLabel),
						model.t);
					if (_n33.$ === 1) {
						return _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
					} else {
						var newLabel = _n33.a;
						var cmds = A3(
							elm$core$Dict$foldl,
							F3(
								function (_n34, r, acc) {
									var _n35 = A2(
										elm$core$List$filter,
										author$project$Main$matchesLabel(oldLabel),
										r.bk);
									if (_n35.b) {
										var repoLabel = _n35.a;
										return A2(
											elm$core$List$cons,
											A4(author$project$Main$updateLabel, model, r, repoLabel, newLabel),
											acc);
									} else {
										return acc;
									}
								}),
							_List_Nil,
							model.c.ga);
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									t: A2(
										elm$core$Dict$remove,
										author$project$Main$labelKey(oldLabel),
										model.t)
								}),
							elm$core$Platform$Cmd$batch(cmds));
					}
				case 34:
					if (model.F.ht === '') {
						return _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
					} else {
						var $temp$msg = author$project$Main$MirrorLabel(model.F),
							$temp$model = _Utils_update(
							model,
							{
								F: {cz: 'ffffff', ht: ''},
								bp: false
							});
						msg = $temp$msg;
						model = $temp$model;
						continue update;
					}
				case 35:
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								F: author$project$Main$randomizeColor(model.F),
								bp: true
							}),
						elm$core$Platform$Cmd$none);
				case 36:
					var name = msg.a;
					var newLabel = model.F;
					var newColor = model.bp ? model.F.cz : author$project$Main$generateColor(
						author$project$Hash$hash(name));
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								F: _Utils_update(
									newLabel,
									{cz: newColor, ht: name})
							}),
						elm$core$Platform$Cmd$none);
				case 37:
					if (!msg.b.$) {
						var repo = msg.a;
						var repoSel = {ht: repo.ht, hN: repo.hN};
						return _Utils_Tuple2(
							model,
							A2(author$project$Backend$refreshRepo, repoSel, author$project$Main$RepoRefreshed));
					} else {
						var repo = msg.a;
						var err = msg.b.a;
						return A3(
							author$project$Log$debug,
							'failed to modify labels',
							err,
							_Utils_Tuple2(model, elm$core$Platform$Cmd$none));
					}
				case 38:
					if (!msg.a.$) {
						var index = msg.a.a.dF;
						var value = msg.a.a.ew;
						var data = model.c;
						var allLabels = A3(
							elm$core$List$foldl,
							function (l) {
								return A2(elm$core$Dict$insert, l.fu, l);
							},
							model.aj,
							value.bk);
						var colorLightnessCache = A3(
							elm$core$Dict$foldl,
							F3(
								function (_n36, _n37, cache) {
									var color = _n37.cz;
									return A3(
										elm$core$Dict$insert,
										color,
										author$project$Main$computeColorIsLight(color),
										cache);
								}),
							elm$core$Dict$empty,
							allLabels);
						return _Utils_Tuple2(
							author$project$Main$computeDataView(
								_Utils_update(
									model,
									{
										aj: allLabels,
										bN: colorLightnessCache,
										c: _Utils_update(
											data,
											{
												ga: A3(elm$core$Dict$insert, value.fu, value, data.ga)
											}),
										m: A2(elm$core$Basics$max, index, model.m)
									})),
							elm$core$Platform$Cmd$none);
					} else {
						var err = msg.a.a;
						return A3(
							author$project$Log$debug,
							'failed to refresh repo',
							err,
							_Utils_Tuple2(model, elm$core$Platform$Cmd$none));
					}
				case 39:
					var card = msg.a;
					var _n38 = card.cB;
					if (!_n38.$) {
						var issue = _n38.a;
						return _Utils_Tuple2(
							model,
							A3(
								author$project$Main$addIssueLabels,
								model,
								issue,
								_List_fromArray(
									['paused'])));
					} else {
						var pr = _n38.a;
						return _Utils_Tuple2(
							model,
							A3(
								author$project$Main$addPullRequestLabels,
								model,
								pr,
								_List_fromArray(
									['paused'])));
					}
				case 40:
					var card = msg.a;
					var _n39 = card.cB;
					if (!_n39.$) {
						var issue = _n39.a;
						return _Utils_Tuple2(
							model,
							A3(author$project$Main$removeIssueLabel, model, issue, 'paused'));
					} else {
						var pr = _n39.a;
						return _Utils_Tuple2(
							model,
							A3(author$project$Main$removePullRequestLabel, model, pr, 'paused'));
					}
				case 41:
					var title = msg.a;
					var cmds = A3(
						elm$core$Dict$foldl,
						F3(
							function (_n40, r, acc) {
								return A2(
									elm$core$List$any,
									A2(
										elm$core$Basics$composeL,
										elm$core$Basics$eq(title),
										function ($) {
											return $.bF;
										}),
									r.fK) ? acc : A2(
									elm$core$List$cons,
									A3(author$project$Main$createMilestone, model, r, title),
									acc);
							}),
						_List_Nil,
						model.c.ga);
					return _Utils_Tuple2(
						model,
						elm$core$Platform$Cmd$batch(cmds));
				case 42:
					var title = msg.a;
					var cmds = A3(
						elm$core$Dict$foldl,
						F3(
							function (_n41, r, acc) {
								var _n42 = A2(
									elm$core$List$filter,
									A2(
										elm$core$Basics$composeL,
										elm$core$Basics$eq(title),
										function ($) {
											return $.bF;
										}),
									r.fK);
								if (_n42.b) {
									var m = _n42.a;
									return A2(
										elm$core$List$cons,
										A3(author$project$Main$closeMilestone, model, r, m),
										acc);
								} else {
									return acc;
								}
							}),
						_List_Nil,
						model.c.ga);
					return _Utils_Tuple2(
						model,
						elm$core$Platform$Cmd$batch(cmds));
				case 43:
					var title = msg.a;
					var cmds = A3(
						elm$core$Dict$foldl,
						F3(
							function (_n43, r, acc) {
								var _n44 = A2(
									elm$core$List$filter,
									A2(
										elm$core$Basics$composeL,
										elm$core$Basics$eq(title),
										function ($) {
											return $.bF;
										}),
									r.fK);
								if (_n44.b) {
									var m = _n44.a;
									return A2(
										elm$core$List$cons,
										A3(author$project$Main$deleteMilestone, model, r, m),
										acc);
								} else {
									return acc;
								}
							}),
						_List_Nil,
						model.c.ga);
					return _Utils_Tuple2(
						model,
						elm$core$Platform$Cmd$batch(cmds));
				case 44:
					if (!msg.b.$) {
						var repo = msg.a;
						var repoSel = {ht: repo.ht, hN: repo.hN};
						return _Utils_Tuple2(
							model,
							A2(author$project$Backend$refreshRepo, repoSel, author$project$Main$RepoRefreshed));
					} else {
						var repo = msg.a;
						var err = msg.b.a;
						return A3(
							author$project$Log$debug,
							'failed to modify labels',
							err,
							_Utils_Tuple2(model, elm$core$Platform$Cmd$none));
					}
				case 45:
					var name = msg.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{b2: name}),
						elm$core$Platform$Cmd$none);
				case 46:
					var _n45 = model.b2;
					if (_n45 === '') {
						return _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
					} else {
						var name = _n45;
						var $temp$msg = author$project$Main$MirrorMilestone(name),
							$temp$model = model;
						msg = $temp$msg;
						model = $temp$model;
						continue update;
					}
				case 47:
					var card = msg.a;
					var mtitle = msg.b;
					var set = function () {
						var _n49 = card.cB;
						if (!_n49.$) {
							var issue = _n49.a;
							return A2(author$project$Main$setIssueMilestone, model, issue);
						} else {
							var pr = _n49.a;
							return A2(author$project$Main$setPRMilestone, model, pr);
						}
					}();
					if (mtitle.$ === 1) {
						return _Utils_Tuple2(
							model,
							set(elm$core$Maybe$Nothing));
					} else {
						var title = mtitle.a;
						var _n47 = A2(elm$core$Dict$get, card.q.fu, model.c.ga);
						if (!_n47.$) {
							var repo = _n47.a;
							var _n48 = A2(
								elm$core$List$filter,
								A2(
									elm$core$Basics$composeL,
									elm$core$Basics$eq(title),
									function ($) {
										return $.bF;
									}),
								repo.fK);
							if (_n48.b) {
								var milestone = _n48.a;
								return _Utils_Tuple2(
									model,
									set(
										elm$core$Maybe$Just(milestone)));
							} else {
								return _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
							}
						} else {
							return _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
						}
					}
				case 48:
					if (!msg.b.$) {
						var issue = msg.a;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									E: author$project$Drag$land(model.E)
								}),
							A2(author$project$Backend$refreshIssue, issue.fu, author$project$Main$IssueRefreshed));
					} else {
						var issue = msg.a;
						var err = msg.b.a;
						return A3(
							author$project$Log$debug,
							'failed to change milestone',
							err,
							_Utils_Tuple2(model, elm$core$Platform$Cmd$none));
					}
				case 63:
					if (!msg.b.$) {
						var cb = msg.a;
						return _Utils_Tuple2(model, cb);
					} else {
						var cb = msg.a;
						var err = msg.b.a;
						return A3(
							author$project$Log$debug,
							'failed to change data',
							err,
							_Utils_Tuple2(model, elm$core$Platform$Cmd$none));
					}
				case 50:
					var id = msg.a;
					return _Utils_Tuple2(
						model,
						A2(author$project$Backend$refreshIssue, id, author$project$Main$IssueRefreshed));
				case 51:
					if (!msg.a.$) {
						var index = msg.a.a.dF;
						var value = msg.a.a.ew;
						return _Utils_Tuple2(
							author$project$Main$computeDataView(
								_Utils_update(
									model,
									{
										p: A3(
											elm$core$Dict$insert,
											value.fu,
											author$project$Main$issueCard(value),
											model.p),
										m: A2(elm$core$Basics$max, index, model.m),
										E: author$project$Drag$complete(model.E)
									})),
							elm$core$Platform$Cmd$none);
					} else {
						var err = msg.a.a;
						return A3(
							author$project$Log$debug,
							'failed to refresh issue',
							err,
							_Utils_Tuple2(model, elm$core$Platform$Cmd$none));
					}
				case 49:
					if (!msg.b.$) {
						var pr = msg.a;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									E: author$project$Drag$land(model.E)
								}),
							A2(author$project$Backend$refreshPR, pr.fu, author$project$Main$PullRequestRefreshed));
					} else {
						var pr = msg.a;
						var err = msg.b.a;
						return A3(
							author$project$Log$debug,
							'failed to change milestone',
							err,
							_Utils_Tuple2(model, elm$core$Platform$Cmd$none));
					}
				case 52:
					var id = msg.a;
					return _Utils_Tuple2(
						model,
						A2(author$project$Backend$refreshPR, id, author$project$Main$PullRequestRefreshed));
				case 53:
					if (!msg.a.$) {
						var index = msg.a.a.dF;
						var value = msg.a.a.ew;
						return _Utils_Tuple2(
							author$project$Main$computeDataView(
								_Utils_update(
									model,
									{
										p: A3(
											elm$core$Dict$insert,
											value.fu,
											author$project$Main$prCard(value),
											model.p),
										m: A2(elm$core$Basics$max, index, model.m),
										E: author$project$Drag$complete(model.E)
									})),
							elm$core$Platform$Cmd$none);
					} else {
						var err = msg.a.a;
						return A3(
							author$project$Log$debug,
							'failed to refresh pr',
							err,
							_Utils_Tuple2(model, elm$core$Platform$Cmd$none));
					}
				case 54:
					var filter = msg.a;
					return _Utils_Tuple2(
						author$project$Main$computeGraph(
							_Utils_update(
								model,
								{
									ab: A2(elm$core$List$cons, filter, model.ab)
								})),
						elm$core$Platform$Cmd$none);
				case 55:
					var filter = msg.a;
					return _Utils_Tuple2(
						author$project$Main$computeGraph(
							_Utils_update(
								model,
								{
									ab: A2(
										elm$core$List$filter,
										elm$core$Basics$neq(filter),
										model.ab)
								})),
						elm$core$Platform$Cmd$none);
				case 56:
					var sort = msg.a;
					return _Utils_Tuple2(
						author$project$Main$computeGraph(
							_Utils_update(
								model,
								{aO: sort})),
						elm$core$Platform$Cmd$none);
				case 57:
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{bA: !model.bA}),
						elm$core$Platform$Cmd$none);
				case 58:
					var string = msg.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{bj: string}),
						elm$core$Platform$Cmd$none);
				case 59:
					return _Utils_Tuple2(
						model.aC ? _Utils_update(
							model,
							{ay: elm$core$Dict$empty, bj: '', aC: false}) : author$project$Main$computeDataView(
							_Utils_update(
								model,
								{aC: true})),
						elm$core$Platform$Cmd$none);
				case 60:
					var name = msg.a;
					var op = msg.b;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								ay: A3(elm$core$Dict$insert, name, op, model.ay)
							}),
						elm$core$Platform$Cmd$none);
				case 61:
					var name = msg.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								ay: A2(elm$core$Dict$remove, name, model.ay)
							}),
						elm$core$Platform$Cmd$none);
				default:
					var cards = A2(
						elm$core$List$filterMap,
						function (a) {
							return A2(elm$core$Dict$get, a, model.p);
						},
						y0hy0h$ordered_containers$OrderedSet$toList(model.s));
					var _n50 = A2(
						elm$core$List$partition,
						A2(
							elm$core$Basics$composeL,
							elm$core$Basics$eq(0),
							elm$core$Tuple$second),
						elm$core$Dict$toList(model.ay));
					var addPairs = _n50.a;
					var removePairs = _n50.b;
					var labelsToAdd = A2(elm$core$List$map, elm$core$Tuple$first, addPairs);
					var adds = A2(
						elm$core$List$map,
						function (card) {
							var _n52 = card.cB;
							if (!_n52.$) {
								var issue = _n52.a;
								return A3(author$project$Main$addIssueLabels, model, issue, labelsToAdd);
							} else {
								var pr = _n52.a;
								return A3(author$project$Main$addPullRequestLabels, model, pr, labelsToAdd);
							}
						},
						cards);
					var labelsToRemove = A2(elm$core$List$map, elm$core$Tuple$first, removePairs);
					var removals = A2(
						elm$core$List$concatMap,
						function (name) {
							return A2(
								elm$core$List$filterMap,
								function (card) {
									if (A3(author$project$Main$hasLabel, model, name, card)) {
										var _n51 = card.cB;
										if (!_n51.$) {
											var issue = _n51.a;
											return elm$core$Maybe$Just(
												A3(author$project$Main$removeIssueLabel, model, issue, name));
										} else {
											var pr = _n51.a;
											return elm$core$Maybe$Just(
												A3(author$project$Main$removePullRequestLabel, model, pr, name));
										}
									} else {
										return elm$core$Maybe$Nothing;
									}
								},
								cards);
						},
						labelsToRemove);
					return _Utils_Tuple2(
						model,
						elm$core$Platform$Cmd$batch(
							_Utils_ap(adds, removals)));
			}
		}
	});
var author$project$Main$init = F3(
	function (config, url, key) {
		var model = {
			p: elm$core$Dict$empty,
			aj: elm$core$Dict$empty,
			u: elm$core$Set$empty,
			cs: elm$core$Maybe$Nothing,
			ax: _List_Nil,
			ay: elm$core$Dict$empty,
			bc: '',
			bN: elm$core$Dict$empty,
			e$: config,
			M: elm$time$Time$millisToPosix(config.dG),
			c: author$project$Backend$emptyData,
			m: 0,
			D: {cp: _List_Nil, cy: elm$core$Dict$empty, cQ: _List_Nil, cX: elm$core$Dict$empty, aB: elm$core$Dict$empty},
			ap: elm$core$Set$empty,
			t: elm$core$Dict$empty,
			ab: _List_Nil,
			aO: author$project$Main$ImpactSort,
			bX: elm$core$Maybe$Nothing,
			W: elm$core$Maybe$Nothing,
			bZ: true,
			dH: key,
			bj: '',
			g: elm$core$Maybe$Nothing,
			E: author$project$Drag$init,
			F: {cz: 'ffffff', ht: ''},
			bp: false,
			b2: '',
			bv: author$project$Main$GlobalGraphPage,
			h: author$project$Drag$init,
			ad: elm$core$Maybe$Nothing,
			s: y0hy0h$ordered_containers$OrderedSet$empty,
			bA: false,
			aC: false
		};
		var _n0 = A2(
			author$project$Main$update,
			author$project$Main$UrlChanged(url),
			model);
		var navedModel = _n0.a;
		var navedMsgs = _n0.b;
		return _Utils_Tuple2(
			navedModel,
			elm$core$Platform$Cmd$batch(
				_List_fromArray(
					[
						author$project$Backend$fetchData(author$project$Main$DataFetched),
						author$project$Backend$fetchMe(author$project$Main$MeFetched),
						navedMsgs
					])));
	});
var author$project$Main$RetryPolling = {$: 3};
var author$project$Main$SetCurrentTime = function (a) {
	return {$: 4, a: a};
};
var author$project$Main$Tick = function (a) {
	return {$: 2, a: a};
};
var elm$browser$Browser$AnimationManager$Time = function (a) {
	return {$: 0, a: a};
};
var elm$browser$Browser$AnimationManager$State = F3(
	function (subs, request, oldTime) {
		return {dY: oldTime, gb: request, gt: subs};
	});
var elm$browser$Browser$AnimationManager$init = elm$core$Task$succeed(
	A3(elm$browser$Browser$AnimationManager$State, _List_Nil, elm$core$Maybe$Nothing, 0));
var elm$browser$Browser$AnimationManager$now = _Browser_now(0);
var elm$browser$Browser$AnimationManager$rAF = _Browser_rAF(0);
var elm$core$Platform$sendToSelf = _Platform_sendToSelf;
var elm$core$Process$kill = _Scheduler_kill;
var elm$core$Process$spawn = _Scheduler_spawn;
var elm$browser$Browser$AnimationManager$onEffects = F3(
	function (router, subs, _n0) {
		var request = _n0.gb;
		var oldTime = _n0.dY;
		var _n1 = _Utils_Tuple2(request, subs);
		if (_n1.a.$ === 1) {
			if (!_n1.b.b) {
				var _n2 = _n1.a;
				return elm$browser$Browser$AnimationManager$init;
			} else {
				var _n4 = _n1.a;
				return A2(
					elm$core$Task$andThen,
					function (pid) {
						return A2(
							elm$core$Task$andThen,
							function (time) {
								return elm$core$Task$succeed(
									A3(
										elm$browser$Browser$AnimationManager$State,
										subs,
										elm$core$Maybe$Just(pid),
										time));
							},
							elm$browser$Browser$AnimationManager$now);
					},
					elm$core$Process$spawn(
						A2(
							elm$core$Task$andThen,
							elm$core$Platform$sendToSelf(router),
							elm$browser$Browser$AnimationManager$rAF)));
			}
		} else {
			if (!_n1.b.b) {
				var pid = _n1.a.a;
				return A2(
					elm$core$Task$andThen,
					function (_n3) {
						return elm$browser$Browser$AnimationManager$init;
					},
					elm$core$Process$kill(pid));
			} else {
				return elm$core$Task$succeed(
					A3(elm$browser$Browser$AnimationManager$State, subs, request, oldTime));
			}
		}
	});
var elm$browser$Browser$AnimationManager$onSelfMsg = F3(
	function (router, newTime, _n0) {
		var subs = _n0.gt;
		var oldTime = _n0.dY;
		var send = function (sub) {
			if (!sub.$) {
				var tagger = sub.a;
				return A2(
					elm$core$Platform$sendToApp,
					router,
					tagger(
						elm$time$Time$millisToPosix(newTime)));
			} else {
				var tagger = sub.a;
				return A2(
					elm$core$Platform$sendToApp,
					router,
					tagger(newTime - oldTime));
			}
		};
		return A2(
			elm$core$Task$andThen,
			function (pid) {
				return A2(
					elm$core$Task$andThen,
					function (_n1) {
						return elm$core$Task$succeed(
							A3(
								elm$browser$Browser$AnimationManager$State,
								subs,
								elm$core$Maybe$Just(pid),
								newTime));
					},
					elm$core$Task$sequence(
						A2(elm$core$List$map, send, subs)));
			},
			elm$core$Process$spawn(
				A2(
					elm$core$Task$andThen,
					elm$core$Platform$sendToSelf(router),
					elm$browser$Browser$AnimationManager$rAF)));
	});
var elm$browser$Browser$AnimationManager$Delta = function (a) {
	return {$: 1, a: a};
};
var elm$browser$Browser$AnimationManager$subMap = F2(
	function (func, sub) {
		if (!sub.$) {
			var tagger = sub.a;
			return elm$browser$Browser$AnimationManager$Time(
				A2(elm$core$Basics$composeL, func, tagger));
		} else {
			var tagger = sub.a;
			return elm$browser$Browser$AnimationManager$Delta(
				A2(elm$core$Basics$composeL, func, tagger));
		}
	});
_Platform_effectManagers['Browser.AnimationManager'] = _Platform_createManager(elm$browser$Browser$AnimationManager$init, elm$browser$Browser$AnimationManager$onEffects, elm$browser$Browser$AnimationManager$onSelfMsg, 0, elm$browser$Browser$AnimationManager$subMap);
var elm$browser$Browser$AnimationManager$subscription = _Platform_leaf('Browser.AnimationManager');
var elm$browser$Browser$AnimationManager$onAnimationFrame = function (tagger) {
	return elm$browser$Browser$AnimationManager$subscription(
		elm$browser$Browser$AnimationManager$Time(tagger));
};
var elm$browser$Browser$Events$onAnimationFrame = elm$browser$Browser$AnimationManager$onAnimationFrame;
var elm$core$Platform$Sub$batch = _Platform_batch;
var elm$core$Platform$Sub$none = elm$core$Platform$Sub$batch(_List_Nil);
var elm$time$Time$Every = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var elm$time$Time$State = F2(
	function (taggers, processes) {
		return {f1: processes, gu: taggers};
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
var elm$time$Time$addMySub = F2(
	function (_n0, state) {
		var interval = _n0.a;
		var tagger = _n0.b;
		var _n1 = A2(elm$core$Dict$get, interval, state);
		if (_n1.$ === 1) {
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
		var processes = _n0.f1;
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
				elm$core$Task$succeed(0)));
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
		var _n0 = A2(elm$core$Dict$get, interval, state.gu);
		if (_n0.$ === 1) {
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
				A2(elm$time$Time$every, (60 * 60) * 1000, author$project$Main$SetCurrentTime),
				A2(
				elm$time$Time$every,
				5 * 1000,
				elm$core$Basics$always(author$project$Main$RetryPolling)),
				A2(
				elm$core$List$all,
				A2(elm$core$Basics$composeR, elm$core$Tuple$second, author$project$ForceGraph$isCompleted),
				model.ax) ? elm$core$Platform$Sub$none : elm$browser$Browser$Events$onAnimationFrame(author$project$Main$Tick)
			]));
};
var author$project$Main$selectStatefulProject = function (project) {
	var findColumns = function (match) {
		return A2(
			elm$core$List$filter,
			A2(
				elm$core$Basics$composeL,
				match,
				function ($) {
					return $.ht;
				}),
			project.eZ);
	};
	var icebox = findColumns(author$project$Main$detectColumn.bg);
	var inFlights = findColumns(author$project$Main$detectColumn.aP);
	var dones = findColumns(author$project$Main$detectColumn.aM);
	var backlogs = findColumns(author$project$Main$detectColumn.cq);
	var _n0 = _Utils_Tuple2(
		backlogs,
		_Utils_Tuple3(icebox, inFlights, dones));
	if ((((((_n0.a.b && _n0.b.a.b) && (!_n0.b.a.b.b)) && _n0.b.b.b) && (!_n0.b.b.b.b)) && _n0.b.c.b) && (!_n0.b.c.b.b)) {
		var bs = _n0.a;
		var _n1 = _n0.b;
		var _n2 = _n1.a;
		var ib = _n2.a;
		var _n3 = _n1.b;
		var i = _n3.a;
		var _n4 = _n1.c;
		var d = _n4.a;
		return elm$core$Maybe$Just(
			{cr: bs, aM: d, bg: ib, aP: i, f2: project});
	} else {
		return elm$core$Maybe$Nothing;
	}
};
var author$project$Main$onlyOpenCards = function (model) {
	return elm$core$List$filter(
		function (_n0) {
			var contentId = _n0.gY;
			if (!contentId.$) {
				var id = contentId.a;
				var _n2 = A2(elm$core$Dict$get, id, model.p);
				if (!_n2.$) {
					var card = _n2.a;
					return author$project$Main$isOpen(card);
				} else {
					return false;
				}
			} else {
				return false;
			}
		});
};
var author$project$Drag$hasNeverLeft = function (model) {
	if (model.$ === 1) {
		var neverLeft = model.a.b1;
		return neverLeft;
	} else {
		return false;
	}
};
var author$project$Drag$End = {$: 2};
var author$project$Drag$Over = function (a) {
	return {$: 1, a: a};
};
var elm$virtual_dom$VirtualDom$MayPreventDefault = function (a) {
	return {$: 2, a: a};
};
var elm$html$Html$Events$preventDefaultOn = F2(
	function (event, decoder) {
		return A2(
			elm$virtual_dom$VirtualDom$on,
			event,
			elm$virtual_dom$VirtualDom$MayPreventDefault(decoder));
	});
var elm$virtual_dom$VirtualDom$MayStopPropagation = function (a) {
	return {$: 1, a: a};
};
var elm$html$Html$Events$stopPropagationOn = F2(
	function (event, decoder) {
		return A2(
			elm$virtual_dom$VirtualDom$on,
			event,
			elm$virtual_dom$VirtualDom$MayStopPropagation(decoder));
	});
var author$project$Drag$onDrop = F2(
	function (candidate, f) {
		return _List_fromArray(
			[
				A2(
				elm$html$Html$Events$on,
				'dragenter',
				elm$json$Json$Decode$succeed(
					f(
						author$project$Drag$Over(
							elm$core$Maybe$Just(candidate))))),
				A2(
				elm$html$Html$Events$on,
				'dragleave',
				elm$json$Json$Decode$succeed(
					f(
						author$project$Drag$Over(elm$core$Maybe$Nothing)))),
				A2(
				elm$html$Html$Events$preventDefaultOn,
				'dragover',
				elm$json$Json$Decode$succeed(
					_Utils_Tuple2(
						f(
							author$project$Drag$Over(
								elm$core$Maybe$Just(candidate))),
						true))),
				A2(
				elm$html$Html$Events$stopPropagationOn,
				'drop',
				elm$json$Json$Decode$succeed(
					_Utils_Tuple2(
						f(author$project$Drag$End),
						true)))
			]);
	});
var elm$html$Html$div = _VirtualDom_node('div');
var elm$virtual_dom$VirtualDom$style = _VirtualDom_style;
var elm$html$Html$Attributes$style = elm$virtual_dom$VirtualDom$style;
var author$project$Drag$viewDropArea = F4(
	function (model, wrap, candidate, ownSource) {
		var isOver = function () {
			switch (model.$) {
				case 0:
					return false;
				case 1:
					var state = model.a;
					var _n5 = state.bR;
					if (!_n5.$) {
						var target = _n5.a.av;
						return _Utils_eq(target, candidate.av);
					} else {
						return state.b1 && _Utils_eq(
							elm$core$Maybe$Just(state.aD),
							ownSource);
					}
				case 2:
					var target = model.a.av;
					var landed = model.a.b_;
					return _Utils_eq(target, candidate.av) && (!landed);
				default:
					var target = model.a.av;
					var landed = model.a.b_;
					return _Utils_eq(target, candidate.av) && (!landed);
			}
		}();
		var isActive = function () {
			if (model.$ === 1) {
				return true;
			} else {
				return false;
			}
		}();
		var droppedElement = function () {
			if (model.$ === 3) {
				var start = model.a.aE;
				return isOver ? start.fe : elm$html$Html$text('');
			} else {
				return elm$html$Html$text('');
			}
		}();
		var dragEvents = isActive ? A2(author$project$Drag$onDrop, candidate, wrap) : _List_Nil;
		return A2(
			elm$html$Html$div,
			_Utils_ap(
				_List_fromArray(
					[
						elm$html$Html$Attributes$classList(
						_List_fromArray(
							[
								_Utils_Tuple2('drop-area', true),
								_Utils_Tuple2('active', isActive),
								_Utils_Tuple2(
								'never-left',
								author$project$Drag$hasNeverLeft(model)),
								_Utils_Tuple2('over', isOver)
							]))
					]),
				_Utils_ap(
					dragEvents,
					A2(
						elm$core$List$map,
						function (_n0) {
							var x = _n0.a;
							var y = _n0.b;
							return A2(elm$html$Html$Attributes$style, x, y);
						},
						function () {
							switch (model.$) {
								case 0:
									return _List_Nil;
								case 1:
									var start = model.a.aE;
									return isOver ? _List_fromArray(
										[
											_Utils_Tuple2(
											'min-height',
											elm$core$String$fromFloat(start.cG.ds) + 'px')
										]) : _List_Nil;
								case 2:
									var start = model.a.aE;
									return isOver ? _List_fromArray(
										[
											_Utils_Tuple2(
											'min-height',
											elm$core$String$fromFloat(start.cG.ds) + 'px')
										]) : _List_Nil;
								default:
									var start = model.a.aE;
									return isOver ? _List_fromArray(
										[
											_Utils_Tuple2(
											'min-height',
											elm$core$String$fromFloat(start.cG.ds) + 'px')
										]) : _List_Nil;
							}
						}()))),
			_List_fromArray(
				[droppedElement]));
	});
var author$project$Main$MoveCardAfter = F2(
	function (a, b) {
		return {$: 7, a: a, b: b};
	});
var author$project$Main$ProjectDrag = function (a) {
	return {$: 5, a: a};
};
var author$project$Drag$Start = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var author$project$Drag$StartState = F2(
	function (elementBounds, element) {
		return {fe: element, cG: elementBounds};
	});
var elm$json$Json$Decode$float = _Json_decodeFloat;
var debois$elm_dom$DOM$offsetHeight = A2(elm$json$Json$Decode$field, 'offsetHeight', elm$json$Json$Decode$float);
var debois$elm_dom$DOM$offsetWidth = A2(elm$json$Json$Decode$field, 'offsetWidth', elm$json$Json$Decode$float);
var debois$elm_dom$DOM$offsetLeft = A2(elm$json$Json$Decode$field, 'offsetLeft', elm$json$Json$Decode$float);
var debois$elm_dom$DOM$offsetParent = F2(
	function (x, decoder) {
		return elm$json$Json$Decode$oneOf(
			_List_fromArray(
				[
					A2(
					elm$json$Json$Decode$field,
					'offsetParent',
					elm$json$Json$Decode$null(x)),
					A2(elm$json$Json$Decode$field, 'offsetParent', decoder)
				]));
	});
var debois$elm_dom$DOM$offsetTop = A2(elm$json$Json$Decode$field, 'offsetTop', elm$json$Json$Decode$float);
var debois$elm_dom$DOM$scrollLeft = A2(elm$json$Json$Decode$field, 'scrollLeft', elm$json$Json$Decode$float);
var debois$elm_dom$DOM$scrollTop = A2(elm$json$Json$Decode$field, 'scrollTop', elm$json$Json$Decode$float);
var elm$json$Json$Decode$map4 = _Json_map4;
var debois$elm_dom$DOM$position = F2(
	function (x, y) {
		return A2(
			elm$json$Json$Decode$andThen,
			function (_n0) {
				var x_ = _n0.a;
				var y_ = _n0.b;
				return A2(
					debois$elm_dom$DOM$offsetParent,
					_Utils_Tuple2(x_, y_),
					A2(debois$elm_dom$DOM$position, x_, y_));
			},
			A5(
				elm$json$Json$Decode$map4,
				F4(
					function (scrollLeftP, scrollTopP, offsetLeftP, offsetTopP) {
						return _Utils_Tuple2((x + offsetLeftP) - scrollLeftP, (y + offsetTopP) - scrollTopP);
					}),
				debois$elm_dom$DOM$scrollLeft,
				debois$elm_dom$DOM$scrollTop,
				debois$elm_dom$DOM$offsetLeft,
				debois$elm_dom$DOM$offsetTop));
	});
var elm$json$Json$Decode$map3 = _Json_map3;
var debois$elm_dom$DOM$boundingClientRect = A4(
	elm$json$Json$Decode$map3,
	F3(
		function (_n0, width, height) {
			var x = _n0.a;
			var y = _n0.b;
			return {ds: height, fE: x, gx: y, gF: width};
		}),
	A2(debois$elm_dom$DOM$position, 0, 0),
	debois$elm_dom$DOM$offsetWidth,
	debois$elm_dom$DOM$offsetHeight);
var author$project$Drag$decodeStartState = function (view) {
	return A2(
		elm_community$json_extra$Json$Decode$Extra$andMap,
		elm$json$Json$Decode$succeed(view),
		A2(
			elm_community$json_extra$Json$Decode$Extra$andMap,
			A2(elm$json$Json$Decode$field, 'currentTarget', debois$elm_dom$DOM$boundingClientRect),
			elm$json$Json$Decode$succeed(author$project$Drag$StartState)));
};
var author$project$Drag$isDragging = F2(
	function (source, model) {
		switch (model.$) {
			case 1:
				var state = model.a;
				return _Utils_eq(state.aD, source);
			case 3:
				var state = model.a;
				return _Utils_eq(state.aD, source);
			default:
				return false;
		}
	});
var elm$virtual_dom$VirtualDom$attribute = F2(
	function (key, value) {
		return A2(
			_VirtualDom_attribute,
			_VirtualDom_noOnOrFormAction(key),
			_VirtualDom_noJavaScriptOrHtmlUri(value));
	});
var elm$html$Html$Attributes$attribute = elm$virtual_dom$VirtualDom$attribute;
var elm$html$Html$Attributes$draggable = _VirtualDom_attribute('draggable');
var author$project$Drag$draggable = F4(
	function (model, wrap, source, view) {
		return A2(
			elm$html$Html$div,
			_List_fromArray(
				[
					elm$html$Html$Attributes$classList(
					_List_fromArray(
						[
							_Utils_Tuple2('draggable', true),
							_Utils_Tuple2(
							'dragging',
							A2(author$project$Drag$isDragging, source, model))
						])),
					elm$html$Html$Attributes$draggable('true'),
					A2(
					elm$html$Html$Events$on,
					'dragstart',
					A2(
						elm$json$Json$Decode$map,
						A2(
							elm$core$Basics$composeL,
							wrap,
							author$project$Drag$Start(source)),
						author$project$Drag$decodeStartState(view))),
					A2(
					elm$html$Html$Events$on,
					'dragend',
					elm$json$Json$Decode$succeed(
						wrap(author$project$Drag$End))),
					A2(elm$html$Html$Attributes$attribute, 'ondragstart', 'event.dataTransfer.setData(\'text/plain\', \'\');')
				]),
			_List_fromArray(
				[view]));
	});
var author$project$Main$FromColumnCardSource = function (a) {
	return {$: 0, a: a};
};
var author$project$Main$HighlightNode = function (a) {
	return {$: 17, a: a};
};
var author$project$Main$PauseCard = function (a) {
	return {$: 39, a: a};
};
var author$project$Main$RefreshIssue = function (a) {
	return {$: 50, a: a};
};
var author$project$Main$RefreshPullRequest = function (a) {
	return {$: 52, a: a};
};
var author$project$Main$UnhighlightNode = function (a) {
	return {$: 18, a: a};
};
var author$project$Main$UnpauseCard = function (a) {
	return {$: 40, a: a};
};
var elm$html$Html$a = _VirtualDom_node('a');
var elm$html$Html$Attributes$href = function (url) {
	return A2(
		elm$html$Html$Attributes$stringProperty,
		'href',
		_VirtualDom_noJavaScriptUri(url));
};
var elm$html$Html$Attributes$target = elm$html$Html$Attributes$stringProperty('target');
var author$project$Main$externalIcons = function (card) {
	return A2(
		elm$core$List$map,
		function (_n0) {
			var url = _n0.ib;
			return A2(
				elm$html$Html$a,
				_List_fromArray(
					[
						elm$html$Html$Attributes$target('_blank'),
						elm$html$Html$Attributes$class('external-link octicon octicon-link-external'),
						elm$html$Html$Attributes$href(url)
					]),
				_List_Nil);
		},
		card.cx);
};
var author$project$Main$isAnticipated = F2(
	function (model, card) {
		return A2(elm$core$Set$member, card.fu, model.u) && (!A2(y0hy0h$ordered_containers$OrderedSet$member, card.fu, model.s));
	});
var author$project$Main$isPaused = function (card) {
	return card.ac.dq;
};
var author$project$Main$prIcons = F2(
	function (model, card) {
		var _n0 = card.cB;
		if (!_n0.$) {
			return _List_Nil;
		} else {
			var pr = _n0.a;
			var statusChecks = function () {
				var _n3 = A2(
					elm$core$Maybe$map,
					function ($) {
						return $.gq;
					},
					pr.fD);
				if ((!_n3.$) && (!_n3.a.$)) {
					var contexts = _n3.a.a.e1;
					return function (a) {
						return A2(elm$core$List$map, a, contexts);
					}(
						function (c) {
							return A2(
								elm$html$Html$span,
								_List_fromArray(
									[
										elm$html$Html$Attributes$classList(
										_List_fromArray(
											[
												_Utils_Tuple2('status-icon', true),
												_Utils_Tuple2('octicon', true),
												_Utils_Tuple2(
												function () {
													var _n4 = c._;
													switch (_n4) {
														case 3:
															return 'octicon-primitive-dot';
														case 4:
															return 'octicon-check';
														case 2:
															return 'octicon-x';
														case 0:
															return 'octicon-question';
														default:
															return 'octicon-alert';
													}
												}(),
												true),
												_Utils_Tuple2(
												function () {
													var _n5 = c._;
													switch (_n5) {
														case 3:
															return 'pending';
														case 4:
															return 'success';
														case 2:
															return 'failure';
														case 0:
															return 'expected';
														default:
															return 'error';
													}
												}(),
												true)
											]))
									]),
								_List_Nil);
						});
				} else {
					return _List_Nil;
				}
			}();
			var reviews = A2(
				elm$core$Maybe$withDefault,
				_List_Nil,
				A2(elm$core$Dict$get, card.fu, model.c.ge));
			var reviewStates = A2(
				elm$core$List$map,
				function (r) {
					var reviewClass = function () {
						var _n2 = r._;
						switch (_n2) {
							case 0:
								return 'pending';
							case 2:
								return 'success';
							case 3:
								return 'failure';
							case 1:
								return 'commented';
							default:
								return 'dismissed';
						}
					}();
					return A2(
						elm$html$Html$img,
						_List_fromArray(
							[
								elm$html$Html$Attributes$class('status-actor ' + reviewClass),
								elm$html$Html$Attributes$src(r.aw.da)
							]),
						_List_Nil);
				},
				reviews);
			var mergeClass = function () {
				var _n1 = pr.fJ;
				switch (_n1) {
					case 0:
						return 'success';
					case 1:
						return 'failure';
					default:
						return 'pending';
				}
			}();
			return A2(
				elm$core$List$cons,
				A2(
					elm$html$Html$span,
					_List_fromArray(
						[
							elm$html$Html$Attributes$class('status-icon octicon octicon-git-merge ' + mergeClass)
						]),
					_List_Nil),
				_Utils_ap(statusChecks, reviewStates));
		}
	});
var author$project$Main$recentActors = F2(
	function (model, card) {
		return elm$core$List$reverse(
			A2(
				elm$core$List$take,
				3,
				elm$core$List$reverse(
					A2(
						elm$core$Maybe$withDefault,
						_List_Nil,
						A2(elm$core$Dict$get, card.fu, model.c.eG)))));
	});
var author$project$Main$viewCardActor = F2(
	function (model, _n0) {
		var createdAt = _n0.e3;
		var avatar = _n0.da;
		return A2(
			elm$html$Html$img,
			_List_fromArray(
				[
					elm$html$Html$Attributes$class(
					'card-actor ' + A2(author$project$Main$activityClass, model.M, createdAt)),
					elm$html$Html$Attributes$src(avatar + '&s=88'),
					elm$html$Html$Attributes$draggable('false')
				]),
			_List_Nil);
	});
var author$project$Main$colorIsLight = F2(
	function (model, hex) {
		var _n0 = A2(elm$core$Dict$get, hex, model.bN);
		if (!_n0.$) {
			var res = _n0.a;
			return res;
		} else {
			return author$project$Main$computeColorIsLight(
				A3(author$project$Log$debug, 'color lightness cache miss', hex, hex));
		}
	});
var author$project$Main$labelColorStyles = F2(
	function (model, color) {
		return _List_fromArray(
			[
				A2(elm$html$Html$Attributes$style, 'background-color', '#' + color),
				A2(
				elm$html$Html$Attributes$style,
				'color',
				A2(author$project$Main$colorIsLight, model, color) ? 'rgba(0, 0, 0, .8)' : '#fff')
			]);
	});
var author$project$Main$SearchCards = function (a) {
	return {$: 21, a: a};
};
var author$project$Main$searchLabel = F2(
	function (model, name) {
		return author$project$Main$SearchCards(
			elm$core$String$isEmpty(model.bc) ? ('label:' + name) : (model.bc + (' label:' + name)));
	});
var elm$html$Html$Events$onClick = function (msg) {
	return A2(
		elm$html$Html$Events$on,
		'click',
		elm$json$Json$Decode$succeed(msg));
};
var author$project$Main$viewLabel = F2(
	function (model, id) {
		var _n0 = function () {
			var _n1 = A2(elm$core$Dict$get, id, model.aj);
			if (!_n1.$) {
				var label = _n1.a;
				return _Utils_Tuple2(label.ht, label.cz);
			} else {
				return _Utils_Tuple2('unknown', 'ff00ff');
			}
		}();
		var name = _n0.a;
		var color = _n0.b;
		return A2(
			elm$html$Html$span,
			_Utils_ap(
				_List_fromArray(
					[
						elm$html$Html$Attributes$class('label'),
						elm$html$Html$Events$onClick(
						A2(author$project$Main$searchLabel, model, name))
					]),
				A2(author$project$Main$labelColorStyles, model, color)),
			_List_fromArray(
				[
					A2(
					elm$html$Html$span,
					_List_fromArray(
						[
							elm$html$Html$Attributes$class('label-text')
						]),
					_List_fromArray(
						[
							elm$html$Html$text(name)
						]))
				]));
	});
var elm$html$Html$Events$onMouseOut = function (msg) {
	return A2(
		elm$html$Html$Events$on,
		'mouseout',
		elm$json$Json$Decode$succeed(msg));
};
var elm$html$Html$Events$onMouseOver = function (msg) {
	return A2(
		elm$html$Html$Events$on,
		'mouseover',
		elm$json$Json$Decode$succeed(msg));
};
var author$project$Main$viewCard = F2(
	function (model, card) {
		return A2(
			elm$html$Html$div,
			_List_fromArray(
				[
					elm$html$Html$Attributes$classList(
					_List_fromArray(
						[
							_Utils_Tuple2('card', true),
							_Utils_Tuple2(
							'in-flight',
							author$project$Main$isInFlight(card)),
							_Utils_Tuple2(
							'done',
							author$project$Main$isDone(card)),
							_Utils_Tuple2(
							'icebox',
							author$project$Main$isIcebox(card)),
							_Utils_Tuple2(
							'backlog',
							author$project$Main$isBacklog(card)),
							_Utils_Tuple2(
							'paused',
							author$project$Main$isPaused(card)),
							_Utils_Tuple2(
							'anticipated',
							A2(author$project$Main$isAnticipated, model, card)),
							_Utils_Tuple2(
							'highlighted',
							_Utils_eq(
								model.bX,
								elm$core$Maybe$Just(card.fu))),
							_Utils_Tuple2(
							A2(author$project$Main$activityClass, model.M, card.c5),
							author$project$Main$isPR(card)),
							_Utils_Tuple2(
							'last-activity-is-me',
							function () {
								var _n0 = model.g;
								if (!_n0.$) {
									var user = _n0.a.ev;
									return A3(author$project$Main$lastActivityIsByUser, model.c.eG, user.hn, card);
								} else {
									return false;
								}
							}())
						])),
					elm$html$Html$Events$onClick(
					author$project$Main$SelectCard(card.fu)),
					elm$html$Html$Events$onMouseOver(
					author$project$Main$HighlightNode(card.fu)),
					elm$html$Html$Events$onMouseOut(
					author$project$Main$UnhighlightNode(card.fu))
				]),
			_List_fromArray(
				[
					A2(
					elm$html$Html$div,
					_List_fromArray(
						[
							elm$html$Html$Attributes$class('card-info')
						]),
					_List_fromArray(
						[
							A2(
							elm$html$Html$div,
							_List_fromArray(
								[
									elm$html$Html$Attributes$class('card-actors')
								]),
							A2(
								elm$core$List$map,
								author$project$Main$viewCardActor(model),
								A2(author$project$Main$recentActors, model, card))),
							A2(
							elm$html$Html$span,
							_List_fromArray(
								[
									elm$html$Html$Attributes$class('card-title'),
									elm$html$Html$Attributes$draggable('false')
								]),
							_Utils_ap(
								_List_fromArray(
									[
										A2(
										elm$html$Html$a,
										_List_fromArray(
											[
												elm$html$Html$Attributes$href(card.ib),
												elm$html$Html$Attributes$target('_blank')
											]),
										_List_fromArray(
											[
												elm$html$Html$text(card.bF)
											]))
									]),
								author$project$Main$externalIcons(card))),
							A2(
							elm$html$Html$span,
							_List_fromArray(
								[
									elm$html$Html$Attributes$class('card-labels')
								]),
							A2(
								elm$core$List$map,
								author$project$Main$viewLabel(model),
								card.bk)),
							A2(
							elm$html$Html$div,
							_List_fromArray(
								[
									elm$html$Html$Attributes$class('card-meta')
								]),
							_List_fromArray(
								[
									A2(
									elm$html$Html$a,
									_List_fromArray(
										[
											elm$html$Html$Attributes$href(card.ib),
											elm$html$Html$Attributes$target('_blank'),
											elm$html$Html$Attributes$draggable('false')
										]),
									_List_fromArray(
										[
											elm$html$Html$text(
											'#' + elm$core$String$fromInt(card.k))
										])),
									elm$html$Html$text(' '),
									elm$html$Html$text('opened by '),
									function () {
									var _n1 = card.aw;
									if (!_n1.$) {
										var user = _n1.a;
										return A2(
											elm$html$Html$a,
											_List_fromArray(
												[
													elm$html$Html$Attributes$href(user.ib),
													elm$html$Html$Attributes$target('_blank'),
													elm$html$Html$Attributes$draggable('false')
												]),
											_List_fromArray(
												[
													elm$html$Html$text(user.hn)
												]));
									} else {
										return elm$html$Html$text('(deleted user)');
									}
								}()
								]))
						])),
					A2(
					elm$html$Html$div,
					_List_fromArray(
						[
							elm$html$Html$Attributes$class('card-icons')
						]),
					_Utils_ap(
						_List_fromArray(
							[
								A2(
								elm$html$Html$span,
								_List_fromArray(
									[
										elm$html$Html$Attributes$classList(
										_List_fromArray(
											[
												_Utils_Tuple2('octicon', true),
												_Utils_Tuple2(
												'open',
												author$project$Main$isOpen(card)),
												_Utils_Tuple2(
												'closed',
												!author$project$Main$isOpen(card)),
												_Utils_Tuple2(
												'merged',
												author$project$Main$isMerged(card)),
												_Utils_Tuple2(
												'octicon-issue-opened',
												_Utils_eq(
													card._,
													author$project$Main$IssueState(0))),
												_Utils_Tuple2(
												'octicon-issue-closed',
												_Utils_eq(
													card._,
													author$project$Main$IssueState(1))),
												_Utils_Tuple2(
												'octicon-git-pull-request',
												author$project$Main$isPR(card))
											])),
										elm$html$Html$Events$onClick(
										author$project$Main$isPR(card) ? author$project$Main$RefreshPullRequest(card.fu) : author$project$Main$RefreshIssue(card.fu))
									]),
								_List_Nil),
								function () {
								var _n2 = _Utils_Tuple2(
									author$project$Main$isInFlight(card),
									author$project$Main$isPaused(card));
								if (_n2.a) {
									if (_n2.b) {
										return A2(
											elm$html$Html$span,
											_List_fromArray(
												[
													elm$html$Html$Attributes$class('octicon unpause octicon-bookmark'),
													elm$html$Html$Events$onClick(
													author$project$Main$UnpauseCard(card))
												]),
											_List_Nil);
									} else {
										return A2(
											elm$html$Html$span,
											_List_fromArray(
												[
													elm$html$Html$Attributes$class('octicon pause octicon-bookmark'),
													elm$html$Html$Events$onClick(
													author$project$Main$PauseCard(card))
												]),
											_List_Nil);
									}
								} else {
									return elm$html$Html$text('');
								}
							}()
							]),
						A2(author$project$Main$prIcons, model, card)))
				]));
	});
var elm_explorations$markdown$Markdown$defaultOptions = {
	e7: elm$core$Maybe$Nothing,
	fo: elm$core$Maybe$Just(
		{gO: false, h$: false}),
	gh: true,
	gn: false
};
var elm_explorations$markdown$Markdown$toHtmlWith = _Markdown_toHtml;
var elm_explorations$markdown$Markdown$toHtml = elm_explorations$markdown$Markdown$toHtmlWith(elm_explorations$markdown$Markdown$defaultOptions);
var author$project$Main$viewNoteCard = F3(
	function (model, col, text) {
		return A2(
			elm$html$Html$div,
			_List_fromArray(
				[
					elm$html$Html$Attributes$classList(
					_List_fromArray(
						[
							_Utils_Tuple2('card', true),
							_Utils_Tuple2(
							'in-flight',
							author$project$Main$detectColumn.aP(col.ht)),
							_Utils_Tuple2(
							'done',
							author$project$Main$detectColumn.aM(col.ht)),
							_Utils_Tuple2(
							'backlog',
							author$project$Main$detectColumn.cq(col.ht))
						]))
				]),
			_List_fromArray(
				[
					A2(
					elm$html$Html$div,
					_List_fromArray(
						[
							elm$html$Html$Attributes$class('card-info card-note')
						]),
					_List_fromArray(
						[
							A2(elm_explorations$markdown$Markdown$toHtml, _List_Nil, text)
						])),
					A2(
					elm$html$Html$div,
					_List_fromArray(
						[
							elm$html$Html$Attributes$class('card-icons')
						]),
					_List_fromArray(
						[
							A2(
							elm$html$Html$span,
							_List_fromArray(
								[
									elm$html$Html$Attributes$class('octicon octicon-book')
								]),
							_List_Nil)
						]))
				]));
	});
var author$project$Main$viewProjectColumnCard = F4(
	function (model, project, col, ghCard) {
		var dropCandidate = {
			fQ: author$project$Main$MoveCardAfter,
			av: {
				eJ: elm$core$Maybe$Just(ghCard.fu),
				cA: col.fu,
				b7: project.fu
			}
		};
		var dragId = author$project$Main$FromColumnCardSource(
			{eS: ghCard.fu, cA: col.fu});
		var _n0 = _Utils_Tuple2(ghCard.hE, ghCard.gY);
		_n0$2:
		while (true) {
			if (!_n0.a.$) {
				if (_n0.b.$ === 1) {
					var n = _n0.a.a;
					var _n1 = _n0.b;
					return _List_fromArray(
						[
							A4(
							author$project$Drag$draggable,
							model.h,
							author$project$Main$ProjectDrag,
							dragId,
							A3(author$project$Main$viewNoteCard, model, col, n)),
							A4(
							author$project$Drag$viewDropArea,
							model.h,
							author$project$Main$ProjectDrag,
							dropCandidate,
							elm$core$Maybe$Just(dragId))
						]);
				} else {
					break _n0$2;
				}
			} else {
				if (!_n0.b.$) {
					var _n2 = _n0.a;
					var contentId = _n0.b.a;
					var _n3 = A2(elm$core$Dict$get, contentId, model.p);
					if (!_n3.$) {
						var card = _n3.a;
						return _List_fromArray(
							[
								A4(
								author$project$Drag$draggable,
								model.h,
								author$project$Main$ProjectDrag,
								dragId,
								A2(author$project$Main$viewCard, model, card)),
								A4(
								author$project$Drag$viewDropArea,
								model.h,
								author$project$Main$ProjectDrag,
								dropCandidate,
								elm$core$Maybe$Just(dragId))
							]);
					} else {
						return A3(author$project$Log$debug, 'impossible: content has no card', contentId, _List_Nil);
					}
				} else {
					break _n0$2;
				}
			}
		}
		return A3(author$project$Log$debug, 'impossible?: card has no note or content', ghCard, _List_Nil);
	});
var author$project$Main$viewProjectColumn = F4(
	function (model, project, mod, col) {
		var dropCandidate = {
			fQ: author$project$Main$MoveCardAfter,
			av: {eJ: elm$core$Maybe$Nothing, cA: col.fu, b7: project.fu}
		};
		var cards = mod(
			A2(
				elm$core$Maybe$withDefault,
				_List_Nil,
				A2(elm$core$Dict$get, col.fu, model.c.eY)));
		return A2(
			elm$html$Html$div,
			_List_fromArray(
				[
					elm$html$Html$Attributes$class('project-column')
				]),
			_List_fromArray(
				[
					A2(
					elm$html$Html$div,
					_List_fromArray(
						[
							elm$html$Html$Attributes$class('column-name')
						]),
					_List_fromArray(
						[
							A2(
							elm$html$Html$a,
							_List_fromArray(
								[
									elm$html$Html$Attributes$href('/projects/' + project.ht)
								]),
							_List_fromArray(
								[
									elm$html$Html$text(col.ht)
								]))
						])),
					elm$core$List$isEmpty(cards) ? A2(
					elm$html$Html$div,
					_List_fromArray(
						[
							elm$html$Html$Attributes$class('no-cards')
						]),
					_List_fromArray(
						[
							A4(author$project$Drag$viewDropArea, model.h, author$project$Main$ProjectDrag, dropCandidate, elm$core$Maybe$Nothing)
						])) : A2(
					elm$html$Html$div,
					_List_fromArray(
						[
							elm$html$Html$Attributes$class('cards')
						]),
					A2(
						elm$core$List$cons,
						A4(author$project$Drag$viewDropArea, model.h, author$project$Main$ProjectDrag, dropCandidate, elm$core$Maybe$Nothing),
						A2(
							elm$core$List$concatMap,
							A3(author$project$Main$viewProjectColumnCard, model, project, col),
							cards)))
				]));
	});
var elm$html$Html$h4 = _VirtualDom_node('h4');
var author$project$Main$viewProject = F2(
	function (model, _n0) {
		var project = _n0.f2;
		var backlogs = _n0.cr;
		var inFlight = _n0.aP;
		var done = _n0.aM;
		return A2(
			elm$html$Html$div,
			_List_fromArray(
				[
					elm$html$Html$Attributes$class('project')
				]),
			_List_fromArray(
				[
					A2(
					elm$html$Html$div,
					_List_fromArray(
						[
							elm$html$Html$Attributes$class('project-columns')
						]),
					_List_fromArray(
						[
							A2(
							elm$html$Html$div,
							_List_fromArray(
								[
									elm$html$Html$Attributes$class('column name-column')
								]),
							_List_fromArray(
								[
									A2(
									elm$html$Html$h4,
									_List_Nil,
									_List_fromArray(
										[
											A2(
											elm$html$Html$a,
											_List_fromArray(
												[
													elm$html$Html$Attributes$href('/projects/' + project.ht)
												]),
											_List_fromArray(
												[
													elm$html$Html$text(project.ht)
												]))
										]))
								])),
							A2(
							elm$html$Html$div,
							_List_fromArray(
								[
									elm$html$Html$Attributes$class('column backlog-column')
								]),
							A2(
								elm$core$List$map,
								function (backlog) {
									return A4(
										author$project$Main$viewProjectColumn,
										model,
										project,
										elm$core$List$take(3),
										backlog);
								},
								backlogs)),
							A2(
							elm$html$Html$div,
							_List_fromArray(
								[
									elm$html$Html$Attributes$class('column in-flight-column')
								]),
							_List_fromArray(
								[
									A4(author$project$Main$viewProjectColumn, model, project, elm$core$Basics$identity, inFlight)
								])),
							A2(
							elm$html$Html$div,
							_List_fromArray(
								[
									elm$html$Html$Attributes$class('column done-column')
								]),
							_List_fromArray(
								[
									A4(
									author$project$Main$viewProjectColumn,
									model,
									project,
									author$project$Main$onlyOpenCards(model),
									done)
								]))
						]))
				]));
	});
var author$project$Main$viewAllProjectsPage = function (model) {
	var statefulProjects = A2(
		elm$core$List$filterMap,
		author$project$Main$selectStatefulProject,
		elm$core$Dict$values(model.c.f3));
	return A2(
		elm$html$Html$div,
		_List_fromArray(
			[
				elm$html$Html$Attributes$class('project-table')
			]),
		_List_fromArray(
			[
				A2(
				elm$html$Html$div,
				_List_fromArray(
					[
						elm$html$Html$Attributes$class('projects')
					]),
				A2(
					elm$core$List$map,
					author$project$Main$viewProject(model),
					statefulProjects))
			]));
};
var author$project$Main$NewContentCardSource = function (a) {
	return {$: 1, a: a};
};
var author$project$Main$viewCardEntry = F2(
	function (model, card) {
		var dragSource = author$project$Main$NewContentCardSource(
			{gY: card.fu});
		var cardView = A2(author$project$Main$viewCard, model, card);
		var anticipated = A2(author$project$Main$isAnticipated, model, card);
		return A2(
			elm$html$Html$div,
			_List_fromArray(
				[
					elm$html$Html$Attributes$class('card-controls')
				]),
			_List_fromArray(
				[
					A4(author$project$Drag$draggable, model.h, author$project$Main$ProjectDrag, dragSource, cardView),
					A2(
					elm$html$Html$div,
					_List_fromArray(
						[
							elm$html$Html$Attributes$class('card-buttons')
						]),
					_List_fromArray(
						[
							(!anticipated) ? A2(
							elm$html$Html$span,
							_List_fromArray(
								[
									elm$html$Html$Events$onClick(
									author$project$Main$DeselectCard(card.fu)),
									elm$html$Html$Attributes$class('octicon octicon-x')
								]),
							_List_fromArray(
								[
									elm$html$Html$text('')
								])) : elm$html$Html$text('')
						]))
				]));
	});
var author$project$Main$CreateLabel = {$: 34};
var author$project$Main$RandomizeNewLabelColor = {$: 35};
var author$project$Main$SetNewLabelName = function (a) {
	return {$: 36, a: a};
};
var author$project$Main$DeleteLabel = function (a) {
	return {$: 27, a: a};
};
var author$project$Main$EditLabel = function (a) {
	return {$: 33, a: a};
};
var author$project$Main$RandomizeLabelColor = function (a) {
	return {$: 32, a: a};
};
var author$project$Main$SetLabelColor = function (a) {
	return {$: 31, a: a};
};
var author$project$Main$SetLabelName = F2(
	function (a, b) {
		return {$: 30, a: a, b: b};
	});
var author$project$Main$StartDeletingLabel = function (a) {
	return {$: 25, a: a};
};
var author$project$Main$StartEditingLabel = function (a) {
	return {$: 28, a: a};
};
var author$project$Main$StopDeletingLabel = function (a) {
	return {$: 26, a: a};
};
var author$project$Main$StopEditingLabel = function (a) {
	return {$: 29, a: a};
};
var author$project$Main$includesLabel = F3(
	function (model, label, labelIds) {
		return A2(
			elm$core$List$any,
			function (id) {
				var _n0 = A2(elm$core$Dict$get, id, model.aj);
				if (!_n0.$) {
					var l = _n0.a;
					return A2(author$project$Main$matchesLabel, label, l);
				} else {
					return false;
				}
			},
			labelIds);
	});
var elm$html$Html$form = _VirtualDom_node('form');
var elm$html$Html$input = _VirtualDom_node('input');
var elm$html$Html$Attributes$title = elm$html$Html$Attributes$stringProperty('title');
var elm$html$Html$Attributes$value = elm$html$Html$Attributes$stringProperty('value');
var elm$html$Html$Events$alwaysStop = function (x) {
	return _Utils_Tuple2(x, true);
};
var elm$json$Json$Decode$at = F2(
	function (fields, decoder) {
		return A3(elm$core$List$foldr, elm$json$Json$Decode$field, decoder, fields);
	});
var elm$html$Html$Events$targetValue = A2(
	elm$json$Json$Decode$at,
	_List_fromArray(
		['target', 'value']),
	elm$json$Json$Decode$string);
var elm$html$Html$Events$onInput = function (tagger) {
	return A2(
		elm$html$Html$Events$stopPropagationOn,
		'input',
		A2(
			elm$json$Json$Decode$map,
			elm$html$Html$Events$alwaysStop,
			A2(elm$json$Json$Decode$map, tagger, elm$html$Html$Events$targetValue)));
};
var elm$html$Html$Events$alwaysPreventDefault = function (msg) {
	return _Utils_Tuple2(msg, true);
};
var elm$html$Html$Events$onSubmit = function (msg) {
	return A2(
		elm$html$Html$Events$preventDefaultOn,
		'submit',
		A2(
			elm$json$Json$Decode$map,
			elm$html$Html$Events$alwaysPreventDefault,
			elm$json$Json$Decode$succeed(msg)));
};
var author$project$Main$viewLabelRow = F3(
	function (model, label, repos) {
		var stateKey = author$project$Main$labelKey(label);
		var _n0 = A3(
			elm$core$Dict$foldl,
			F3(
				function (_n1, c, _n2) {
					var ps = _n2.a;
					var is = _n2.b;
					return (author$project$Main$isOpen(c) && A3(author$project$Main$includesLabel, model, label, c.bk)) ? (author$project$Main$isPR(c) ? _Utils_Tuple2(
						A2(elm$core$List$cons, c, ps),
						is) : _Utils_Tuple2(
						ps,
						A2(elm$core$List$cons, c, is))) : _Utils_Tuple2(ps, is);
				}),
			_Utils_Tuple2(_List_Nil, _List_Nil),
			model.p);
		var prs = _n0.a;
		var issues = _n0.b;
		return A2(
			elm$html$Html$div,
			_List_fromArray(
				[
					elm$html$Html$Attributes$class('label-row')
				]),
			_List_fromArray(
				[
					A2(
					elm$html$Html$div,
					_List_fromArray(
						[
							elm$html$Html$Attributes$class('label-cell')
						]),
					_List_fromArray(
						[
							A2(
							elm$html$Html$div,
							_List_fromArray(
								[
									elm$html$Html$Attributes$class('label-name')
								]),
							_List_fromArray(
								[
									function () {
									var _n3 = A2(elm$core$Dict$get, stateKey, model.t);
									if (_n3.$ === 1) {
										return A2(
											elm$html$Html$div,
											_List_fromArray(
												[
													elm$html$Html$Attributes$class('label-background')
												]),
											_List_fromArray(
												[
													(elm$core$String$isEmpty(model.F.ht) && elm$core$Dict$isEmpty(model.t)) ? A2(
													elm$html$Html$span,
													_Utils_ap(
														_List_fromArray(
															[
																elm$html$Html$Attributes$class('label-icon octicon octicon-tag'),
																elm$html$Html$Events$onClick(
																A2(author$project$Main$searchLabel, model, label.ht))
															]),
														A2(author$project$Main$labelColorStyles, model, label.cz)),
													_List_Nil) : A2(
													elm$html$Html$span,
													_Utils_ap(
														_List_fromArray(
															[
																elm$html$Html$Attributes$class('label-icon label-color-control octicon octicon-paintcan'),
																elm$html$Html$Events$onClick(
																author$project$Main$SetLabelColor(label.cz))
															]),
														A2(author$project$Main$labelColorStyles, model, label.cz)),
													_List_Nil),
													A2(
													elm$html$Html$span,
													_Utils_ap(
														_List_fromArray(
															[
																elm$html$Html$Attributes$class('label big'),
																elm$html$Html$Events$onClick(
																A2(author$project$Main$searchLabel, model, label.ht))
															]),
														A2(author$project$Main$labelColorStyles, model, label.cz)),
													_List_fromArray(
														[
															A2(
															elm$html$Html$span,
															_List_fromArray(
																[
																	elm$html$Html$Attributes$class('label-text')
																]),
															_List_fromArray(
																[
																	elm$html$Html$text(label.ht)
																]))
														]))
												]));
									} else {
										var newLabel = _n3.a;
										return A2(
											elm$html$Html$form,
											_List_fromArray(
												[
													elm$html$Html$Attributes$class('label-edit'),
													elm$html$Html$Events$onSubmit(
													author$project$Main$EditLabel(label))
												]),
											_List_fromArray(
												[
													A2(
													elm$html$Html$span,
													_Utils_ap(
														_List_fromArray(
															[
																elm$html$Html$Attributes$class('label-icon label-color-control octicon octicon-sync'),
																elm$html$Html$Events$onClick(
																author$project$Main$RandomizeLabelColor(label))
															]),
														A2(author$project$Main$labelColorStyles, model, newLabel.cz)),
													_List_Nil),
													A2(
													elm$html$Html$input,
													_Utils_ap(
														_List_fromArray(
															[
																elm$html$Html$Events$onInput(
																author$project$Main$SetLabelName(label)),
																elm$html$Html$Attributes$value(newLabel.ht)
															]),
														A2(author$project$Main$labelColorStyles, model, newLabel.cz)),
													_List_Nil)
												]));
									}
								}()
								]))
						])),
					A2(
					elm$html$Html$div,
					_List_fromArray(
						[
							elm$html$Html$Attributes$class('label-cell')
						]),
					_List_fromArray(
						[
							A2(
							elm$html$Html$div,
							_List_fromArray(
								[
									elm$html$Html$Attributes$class('label-counts first')
								]),
							_List_fromArray(
								[
									A2(
									elm$html$Html$span,
									_List_fromArray(
										[
											elm$html$Html$Attributes$class('count')
										]),
									_List_fromArray(
										[
											A2(
											elm$html$Html$span,
											_List_fromArray(
												[
													elm$html$Html$Attributes$class('octicon octicon-issue-opened')
												]),
											_List_Nil),
											A2(
											elm$html$Html$span,
											_List_fromArray(
												[
													elm$html$Html$Attributes$class('count-number')
												]),
											_List_fromArray(
												[
													elm$html$Html$text(
													elm$core$String$fromInt(
														elm$core$List$length(issues)))
												]))
										]))
								]))
						])),
					A2(
					elm$html$Html$div,
					_List_fromArray(
						[
							elm$html$Html$Attributes$class('label-cell')
						]),
					_List_fromArray(
						[
							A2(
							elm$html$Html$div,
							_List_fromArray(
								[
									elm$html$Html$Attributes$class('label-counts')
								]),
							_List_fromArray(
								[
									A2(
									elm$html$Html$span,
									_List_fromArray(
										[
											elm$html$Html$Attributes$class('count')
										]),
									_List_fromArray(
										[
											A2(
											elm$html$Html$span,
											_List_fromArray(
												[
													elm$html$Html$Attributes$class('octicon octicon-git-pull-request')
												]),
											_List_Nil),
											A2(
											elm$html$Html$span,
											_List_fromArray(
												[
													elm$html$Html$Attributes$class('count-number')
												]),
											_List_fromArray(
												[
													elm$html$Html$text(
													elm$core$String$fromInt(
														elm$core$List$length(prs)))
												]))
										]))
								]))
						])),
					A2(
					elm$html$Html$div,
					_List_fromArray(
						[
							elm$html$Html$Attributes$class('label-cell')
						]),
					_List_fromArray(
						[
							A2(
							elm$html$Html$div,
							_List_fromArray(
								[
									elm$html$Html$Attributes$class('label-counts last')
								]),
							_List_fromArray(
								[
									A2(
									elm$html$Html$span,
									_List_fromArray(
										[
											elm$html$Html$Attributes$class('count'),
											elm$html$Html$Attributes$title(
											A2(
												elm$core$String$join,
												', ',
												A2(
													elm$core$List$map,
													function ($) {
														return $.ht;
													},
													repos)))
										]),
									_List_fromArray(
										[
											A2(
											elm$html$Html$span,
											_List_fromArray(
												[
													elm$html$Html$Attributes$class('octicon octicon-repo')
												]),
											_List_Nil),
											A2(
											elm$html$Html$span,
											_List_fromArray(
												[
													elm$html$Html$Attributes$class('count-number')
												]),
											_List_fromArray(
												[
													elm$html$Html$text(
													elm$core$String$fromInt(
														elm$core$List$length(repos)))
												]))
										]))
								]))
						])),
					A2(
					elm$html$Html$div,
					_List_fromArray(
						[
							elm$html$Html$Attributes$class('label-cell drawer-cell')
						]),
					_List_fromArray(
						[
							A2(
							elm$html$Html$div,
							_List_fromArray(
								[
									elm$html$Html$Attributes$class('label-controls')
								]),
							_List_fromArray(
								[
									A2(
									elm$html$Html$span,
									_List_fromArray(
										[
											elm$html$Html$Events$onClick(
											author$project$Main$MirrorLabel(label)),
											elm$html$Html$Attributes$class('button octicon octicon-mirror')
										]),
									_List_Nil),
									A2(elm$core$Dict$member, stateKey, model.t) ? A2(
									elm$html$Html$span,
									_List_fromArray(
										[
											elm$html$Html$Events$onClick(
											author$project$Main$StopEditingLabel(label)),
											elm$html$Html$Attributes$class('button octicon octicon-x')
										]),
									_List_Nil) : A2(
									elm$html$Html$span,
									_List_fromArray(
										[
											elm$html$Html$Events$onClick(
											author$project$Main$StartEditingLabel(label)),
											elm$html$Html$Attributes$class('button octicon octicon-pencil')
										]),
									_List_Nil),
									A2(elm$core$Set$member, stateKey, model.ap) ? A2(
									elm$html$Html$span,
									_List_fromArray(
										[
											elm$html$Html$Events$onClick(
											author$project$Main$StopDeletingLabel(label)),
											elm$html$Html$Attributes$class('button close octicon octicon-x')
										]),
									_List_Nil) : A2(
									elm$html$Html$span,
									_List_fromArray(
										[
											elm$html$Html$Events$onClick(
											author$project$Main$StartDeletingLabel(label)),
											elm$html$Html$Attributes$class('button octicon octicon-trashcan')
										]),
									_List_Nil)
								])),
							function () {
							var isEditing = A2(elm$core$Dict$member, stateKey, model.t);
							var isDeleting = A2(elm$core$Set$member, stateKey, model.ap);
							return A2(
								elm$html$Html$div,
								_List_fromArray(
									[
										elm$html$Html$Attributes$classList(
										_List_fromArray(
											[
												_Utils_Tuple2('label-confirm', true),
												_Utils_Tuple2('active', isDeleting || isEditing)
											]))
									]),
								_List_fromArray(
									[
										isDeleting ? A2(
										elm$html$Html$span,
										_List_fromArray(
											[
												elm$html$Html$Events$onClick(
												author$project$Main$DeleteLabel(label)),
												elm$html$Html$Attributes$class('button delete octicon octicon-check')
											]),
										_List_Nil) : A2(
										elm$html$Html$span,
										_List_fromArray(
											[
												elm$html$Html$Events$onClick(
												author$project$Main$EditLabel(label)),
												elm$html$Html$Attributes$class('button edit octicon octicon-check')
											]),
										_List_Nil)
									]));
						}()
						]))
				]));
	});
var author$project$Main$viewLabelsPage = function (model) {
	var newLabel = A2(
		elm$html$Html$div,
		_List_fromArray(
			[
				elm$html$Html$Attributes$class('label-row')
			]),
		_List_fromArray(
			[
				A2(
				elm$html$Html$div,
				_List_fromArray(
					[
						elm$html$Html$Attributes$class('label-cell')
					]),
				_List_fromArray(
					[
						A2(
						elm$html$Html$div,
						_List_fromArray(
							[
								elm$html$Html$Attributes$class('label-name')
							]),
						_List_fromArray(
							[
								A2(
								elm$html$Html$form,
								_List_fromArray(
									[
										elm$html$Html$Attributes$class('label-edit'),
										elm$html$Html$Events$onSubmit(author$project$Main$CreateLabel)
									]),
								_List_fromArray(
									[
										A2(
										elm$html$Html$span,
										_Utils_ap(
											_List_fromArray(
												[
													elm$html$Html$Attributes$class('label-icon label-color-control octicon octicon-sync'),
													elm$html$Html$Events$onClick(author$project$Main$RandomizeNewLabelColor)
												]),
											A2(author$project$Main$labelColorStyles, model, model.F.cz)),
										_List_Nil),
										A2(
										elm$html$Html$input,
										_Utils_ap(
											_List_fromArray(
												[
													elm$html$Html$Events$onInput(author$project$Main$SetNewLabelName),
													elm$html$Html$Attributes$value(model.F.ht)
												]),
											A2(author$project$Main$labelColorStyles, model, model.F.cz)),
										_List_Nil)
									]))
							]))
					])),
				A2(
				elm$html$Html$div,
				_List_fromArray(
					[
						elm$html$Html$Attributes$class('label-cell')
					]),
				_List_fromArray(
					[
						A2(
						elm$html$Html$div,
						_List_fromArray(
							[
								elm$html$Html$Attributes$class('label-controls')
							]),
						_List_fromArray(
							[
								A2(
								elm$html$Html$span,
								_List_fromArray(
									[
										elm$html$Html$Events$onClick(author$project$Main$CreateLabel),
										elm$html$Html$Attributes$class('button octicon octicon-plus')
									]),
								_List_Nil)
							]))
					])),
				A2(
				elm$html$Html$div,
				_List_fromArray(
					[
						elm$html$Html$Attributes$class('label-cell')
					]),
				_List_fromArray(
					[
						A2(
						elm$html$Html$div,
						_List_fromArray(
							[
								elm$html$Html$Attributes$class('label-counts first')
							]),
						_List_Nil)
					])),
				A2(
				elm$html$Html$div,
				_List_fromArray(
					[
						elm$html$Html$Attributes$class('label-cell')
					]),
				_List_fromArray(
					[
						A2(
						elm$html$Html$div,
						_List_fromArray(
							[
								elm$html$Html$Attributes$class('label-counts')
							]),
						_List_Nil)
					])),
				A2(
				elm$html$Html$div,
				_List_fromArray(
					[
						elm$html$Html$Attributes$class('label-cell')
					]),
				_List_fromArray(
					[
						A2(
						elm$html$Html$div,
						_List_fromArray(
							[
								elm$html$Html$Attributes$class('label-counts last')
							]),
						_List_Nil)
					]))
			]));
	var labelRows = function (a) {
		return A2(
			elm$core$List$map,
			a,
			elm$core$Dict$toList(model.D.aB));
	}(
		function (_n0) {
			var _n1 = _n0.a;
			var name = _n1.a;
			var color = _n1.b;
			var repos = _n0.b;
			return A3(
				author$project$Main$viewLabelRow,
				model,
				{cz: color, ht: name},
				repos);
		});
	return A2(
		elm$html$Html$div,
		_List_fromArray(
			[
				elm$html$Html$Attributes$class('all-labels')
			]),
		A2(elm$core$List$cons, newLabel, labelRows));
};
var author$project$Main$CreateMilestone = {$: 46};
var author$project$Main$SetNewMilestoneName = function (a) {
	return {$: 45, a: a};
};
var author$project$Main$newMilestone = function (model) {
	return A2(
		elm$html$Html$form,
		_List_fromArray(
			[
				elm$html$Html$Attributes$class('new-milestone'),
				elm$html$Html$Events$onSubmit(author$project$Main$CreateMilestone)
			]),
		_List_fromArray(
			[
				A2(
				elm$html$Html$input,
				_List_fromArray(
					[
						elm$html$Html$Events$onInput(author$project$Main$SetNewMilestoneName),
						elm$html$Html$Attributes$value(model.b2)
					]),
				_List_Nil),
				A2(
				elm$html$Html$span,
				_List_fromArray(
					[
						elm$html$Html$Events$onClick(author$project$Main$CreateMilestone),
						elm$html$Html$Attributes$class('button octicon octicon-plus')
					]),
				_List_Nil)
			]));
};
var author$project$Main$MilestoneDrag = function (a) {
	return {$: 6, a: a};
};
var author$project$Main$SetCardMilestone = F2(
	function (a, b) {
		return {$: 47, a: a, b: b};
	});
var author$project$Main$viewInbox = F2(
	function (model, cards) {
		return A2(
			elm$html$Html$div,
			_List_fromArray(
				[
					elm$html$Html$Attributes$class('milestone inbox')
				]),
			_List_fromArray(
				[
					A2(
					elm$html$Html$div,
					_List_fromArray(
						[
							elm$html$Html$Attributes$class('milestone-title')
						]),
					_List_fromArray(
						[
							A2(
							elm$html$Html$div,
							_List_fromArray(
								[
									elm$html$Html$Attributes$class('milestone-title-label')
								]),
							_List_fromArray(
								[
									A2(
									elm$html$Html$span,
									_List_fromArray(
										[
											elm$html$Html$Attributes$class('octicon octicon-inbox')
										]),
									_List_Nil),
									elm$html$Html$text('Inbox')
								]))
						])),
					A2(
					elm$html$Html$div,
					_List_fromArray(
						[
							elm$html$Html$Attributes$class('cards')
						]),
					A2(
						elm$core$List$map,
						function (card) {
							return A4(
								author$project$Drag$draggable,
								model.E,
								author$project$Main$MilestoneDrag,
								card,
								A2(author$project$Main$viewCard, model, card));
						},
						cards)),
					A4(
					author$project$Drag$viewDropArea,
					model.E,
					author$project$Main$MilestoneDrag,
					{fQ: author$project$Main$SetCardMilestone, av: elm$core$Maybe$Nothing},
					elm$core$Maybe$Nothing)
				]));
	});
var author$project$Main$CloseMilestone = function (a) {
	return {$: 42, a: a};
};
var author$project$Main$DeleteMilestone = function (a) {
	return {$: 43, a: a};
};
var author$project$Main$viewMilestone = F3(
	function (model, title, cards) {
		return A2(
			elm$html$Html$div,
			_List_fromArray(
				[
					elm$html$Html$Attributes$class('milestone')
				]),
			_List_fromArray(
				[
					A2(
					elm$html$Html$div,
					_List_fromArray(
						[
							elm$html$Html$Attributes$class('milestone-title')
						]),
					_List_fromArray(
						[
							A2(
							elm$html$Html$div,
							_List_fromArray(
								[
									elm$html$Html$Attributes$class('milestone-title-label')
								]),
							_List_fromArray(
								[
									A2(
									elm$html$Html$span,
									_List_fromArray(
										[
											elm$html$Html$Attributes$class('octicon octicon-milestone')
										]),
									_List_Nil),
									elm$html$Html$text(title)
								])),
							A2(
							elm$html$Html$div,
							_List_fromArray(
								[
									elm$html$Html$Attributes$class('milestone-title-controls')
								]),
							_List_fromArray(
								[
									A2(
									elm$html$Html$span,
									_List_fromArray(
										[
											elm$html$Html$Attributes$class('octicon octicon-mirror'),
											elm$html$Html$Events$onClick(
											author$project$Main$MirrorMilestone(title))
										]),
									_List_Nil),
									A2(
									elm$html$Html$span,
									_List_fromArray(
										[
											elm$html$Html$Attributes$class('octicon octicon-check'),
											elm$html$Html$Events$onClick(
											author$project$Main$CloseMilestone(title))
										]),
									_List_Nil),
									A2(
									elm$html$Html$span,
									_List_fromArray(
										[
											elm$html$Html$Attributes$class('octicon octicon-trashcan'),
											elm$html$Html$Events$onClick(
											author$project$Main$DeleteMilestone(title))
										]),
									_List_Nil)
								]))
						])),
					A2(
					elm$html$Html$div,
					_List_fromArray(
						[
							elm$html$Html$Attributes$class('cards')
						]),
					A2(
						elm$core$List$map,
						function (card) {
							return A4(
								author$project$Drag$draggable,
								model.E,
								author$project$Main$MilestoneDrag,
								card,
								A2(author$project$Main$viewCard, model, card));
						},
						cards)),
					A4(
					author$project$Drag$viewDropArea,
					model.E,
					author$project$Main$MilestoneDrag,
					{
						fQ: author$project$Main$SetCardMilestone,
						av: elm$core$Maybe$Just(title)
					},
					elm$core$Maybe$Nothing)
				]));
	});
var author$project$Main$viewMilestonesPage = function (model) {
	var nextMilestone = A2(author$project$Main$viewInbox, model, model.D.cQ);
	var milestones = A2(
		elm$core$List$map,
		function (title) {
			var milestoneCards = A2(
				elm$core$Maybe$withDefault,
				_List_Nil,
				A2(elm$core$Dict$get, title, model.D.cy));
			return A3(author$project$Main$viewMilestone, model, title, milestoneCards);
		},
		model.D.cp);
	return A2(
		elm$html$Html$div,
		_List_fromArray(
			[
				elm$html$Html$Attributes$class('all-milestones')
			]),
		A2(
			elm$core$List$cons,
			author$project$Main$newMilestone(model),
			A2(elm$core$List$cons, nextMilestone, milestones)));
};
var author$project$Main$SelectAnticipatedCards = {$: 22};
var elm$html$Html$Attributes$placeholder = elm$html$Html$Attributes$stringProperty('placeholder');
var elm$html$Html$Attributes$type_ = elm$html$Html$Attributes$stringProperty('type');
var author$project$Main$viewSearch = function (model) {
	return A2(
		elm$html$Html$div,
		_List_fromArray(
			[
				elm$html$Html$Attributes$class('card-search')
			]),
		_List_fromArray(
			[
				A2(
				elm$html$Html$form,
				_List_fromArray(
					[
						elm$html$Html$Events$onSubmit(author$project$Main$SelectAnticipatedCards)
					]),
				_List_fromArray(
					[
						A2(
						elm$html$Html$input,
						_List_fromArray(
							[
								elm$html$Html$Attributes$type_('search'),
								elm$html$Html$Attributes$placeholder('search cards'),
								elm$html$Html$Attributes$value(model.bc),
								elm$html$Html$Events$onInput(author$project$Main$SearchCards)
							]),
						_List_Nil)
					]))
			]));
};
var author$project$Main$viewNavBar = function (model) {
	return A2(
		elm$html$Html$div,
		_List_fromArray(
			[
				elm$html$Html$Attributes$class('bottom-bar')
			]),
		_List_fromArray(
			[
				A2(
				elm$html$Html$div,
				_List_fromArray(
					[
						elm$html$Html$Attributes$class('nav')
					]),
				_List_fromArray(
					[
						function () {
						var _n0 = model.g;
						if (_n0.$ === 1) {
							return A2(
								elm$html$Html$a,
								_List_fromArray(
									[
										elm$html$Html$Attributes$class('button user-info'),
										elm$html$Html$Attributes$href('/auth/github')
									]),
								_List_fromArray(
									[
										A2(
										elm$html$Html$span,
										_List_fromArray(
											[
												elm$html$Html$Attributes$class('log-in-icon octicon octicon-sign-in')
											]),
										_List_Nil),
										elm$html$Html$text('log in')
									]));
						} else {
							var user = _n0.a.ev;
							return A2(
								elm$html$Html$a,
								_List_fromArray(
									[
										elm$html$Html$Attributes$class('button user-info'),
										elm$html$Html$Attributes$href(user.ib)
									]),
								_List_fromArray(
									[
										A2(
										elm$html$Html$img,
										_List_fromArray(
											[
												elm$html$Html$Attributes$class('user-avatar'),
												elm$html$Html$Attributes$src(user.da)
											]),
										_List_Nil),
										elm$html$Html$text(user.hn)
									]));
						}
					}(),
						A2(
						elm$html$Html$a,
						_List_fromArray(
							[
								elm$html$Html$Attributes$class('button'),
								elm$html$Html$Attributes$href('/')
							]),
						_List_fromArray(
							[
								A2(
								elm$html$Html$span,
								_List_fromArray(
									[
										elm$html$Html$Attributes$class('octicon octicon-list-unordered')
									]),
								_List_Nil)
							])),
						A2(
						elm$html$Html$a,
						_List_fromArray(
							[
								elm$html$Html$Attributes$class('button'),
								elm$html$Html$Attributes$href('/graph')
							]),
						_List_fromArray(
							[
								A2(
								elm$html$Html$span,
								_List_fromArray(
									[
										elm$html$Html$Attributes$class('octicon octicon-globe')
									]),
								_List_Nil)
							])),
						A2(
						elm$html$Html$a,
						_List_fromArray(
							[
								elm$html$Html$Attributes$class('button'),
								elm$html$Html$Attributes$href('/labels')
							]),
						_List_fromArray(
							[
								A2(
								elm$html$Html$span,
								_List_fromArray(
									[
										elm$html$Html$Attributes$class('octicon octicon-tag')
									]),
								_List_Nil)
							])),
						A2(
						elm$html$Html$a,
						_List_fromArray(
							[
								elm$html$Html$Attributes$class('button'),
								elm$html$Html$Attributes$href('/milestones')
							]),
						_List_fromArray(
							[
								A2(
								elm$html$Html$span,
								_List_fromArray(
									[
										elm$html$Html$Attributes$class('octicon octicon-milestone')
									]),
								_List_Nil)
							])),
						A2(
						elm$html$Html$a,
						_List_fromArray(
							[
								elm$html$Html$Attributes$class('button'),
								elm$html$Html$Attributes$href('/pull-requests')
							]),
						_List_fromArray(
							[
								A2(
								elm$html$Html$span,
								_List_fromArray(
									[
										elm$html$Html$Attributes$class('octicon octicon-git-pull-request')
									]),
								_List_Nil)
							]))
					])),
				author$project$Main$viewSearch(model)
			]));
};
var elm$svg$Svg$line = elm$svg$Svg$trustedNode('line');
var elm$svg$Svg$Attributes$x1 = _VirtualDom_attribute('x1');
var elm$svg$Svg$Attributes$x2 = _VirtualDom_attribute('x2');
var elm$svg$Svg$Attributes$y1 = _VirtualDom_attribute('y1');
var elm$svg$Svg$Attributes$y2 = _VirtualDom_attribute('y2');
var author$project$Main$linkPath = F2(
	function (graph, edge) {
		var target = function () {
			var _n1 = A2(
				elm$core$Maybe$map,
				A2(
					elm$core$Basics$composeR,
					function ($) {
						return $.aU;
					},
					function ($) {
						return $.ar;
					}),
				A2(elm_community$graph$Graph$get, edge.h2, graph));
			if (!_n1.$) {
				var x = _n1.a.ij;
				var y = _n1.a.im;
				return {ij: x, im: y};
			} else {
				return {ij: 0, im: 0};
			}
		}();
		var source = function () {
			var _n0 = A2(
				elm$core$Maybe$map,
				A2(
					elm$core$Basics$composeR,
					function ($) {
						return $.aU;
					},
					function ($) {
						return $.ar;
					}),
				A2(elm_community$graph$Graph$get, edge.hd, graph));
			if (!_n0.$) {
				var x = _n0.a.ij;
				var y = _n0.a.im;
				return {ij: x, im: y};
			} else {
				return {ij: 0, im: 0};
			}
		}();
		return A2(
			elm$svg$Svg$line,
			_List_fromArray(
				[
					elm$svg$Svg$Attributes$class('graph-edge'),
					elm$svg$Svg$Attributes$x1(
					elm$core$String$fromFloat(source.ij)),
					elm$svg$Svg$Attributes$y1(
					elm$core$String$fromFloat(source.im)),
					elm$svg$Svg$Attributes$x2(
					elm$core$String$fromFloat(target.ij)),
					elm$svg$Svg$Attributes$y2(
					elm$core$String$fromFloat(target.im))
				]),
			_List_Nil);
	});
var author$project$Main$nodeBounds = function (nc) {
	var y = nc.aU.ar.im;
	var x = nc.aU.ar.ij;
	return nc.aU.ar.ew.df(
		{ij: x, im: y});
};
var elm$virtual_dom$VirtualDom$lazy2 = _VirtualDom_lazy2;
var elm$svg$Svg$Lazy$lazy2 = elm$virtual_dom$VirtualDom$lazy2;
var author$project$Main$viewNodeLowerUpper = F3(
	function (state, _n0, _n1) {
		var node = _n0.aU;
		var fs = _n1.a;
		var ns = _n1.b;
		var pos = {ij: node.ar.ij, im: node.ar.im};
		return _Utils_Tuple2(
			A2(
				elm$core$List$cons,
				A3(elm$svg$Svg$Lazy$lazy2, node.ar.ew.ey, pos, state),
				fs),
			A2(
				elm$core$List$cons,
				A3(elm$svg$Svg$Lazy$lazy2, node.ar.ew.ez, pos, state),
				ns));
	});
var elm$svg$Svg$svg = elm$svg$Svg$trustedNode('svg');
var elm$svg$Svg$Attributes$height = _VirtualDom_attribute('height');
var elm$svg$Svg$Attributes$viewBox = _VirtualDom_attribute('viewBox');
var elm$svg$Svg$Attributes$width = _VirtualDom_attribute('width');
var author$project$Main$viewGraph = F2(
	function (state, _n0) {
		var graph = _n0.a0;
		var padding = 10;
		var nodeContexts = A3(elm_community$graph$Graph$fold, elm$core$List$cons, _List_Nil, graph);
		var links = A2(
			elm$core$List$map,
			A2(elm$svg$Svg$Lazy$lazy2, author$project$Main$linkPath, graph),
			elm_community$graph$Graph$edges(graph));
		var bounds = A2(elm$core$List$map, author$project$Main$nodeBounds, nodeContexts);
		var maxX = A3(
			elm$core$List$foldl,
			F2(
				function (_n5, acc) {
					var x2 = _n5.eD;
					return A2(elm$core$Basics$max, x2, acc);
				}),
			0,
			bounds) + padding;
		var maxY = A3(
			elm$core$List$foldl,
			F2(
				function (_n4, acc) {
					var y2 = _n4.eF;
					return A2(elm$core$Basics$max, y2, acc);
				}),
			0,
			bounds) + padding;
		var minX = A3(
			elm$core$List$foldl,
			F2(
				function (_n3, acc) {
					var x1 = _n3.eC;
					return A2(elm$core$Basics$min, x1, acc);
				}),
			999999,
			bounds) - padding;
		var width = maxX - minX;
		var minY = A3(
			elm$core$List$foldl,
			F2(
				function (_n2, acc) {
					var y1 = _n2.eE;
					return A2(elm$core$Basics$min, y1, acc);
				}),
			999999,
			bounds) - padding;
		var height = maxY - minY;
		var _n1 = A3(
			elm_community$graph$Graph$fold,
			author$project$Main$viewNodeLowerUpper(state),
			_Utils_Tuple2(_List_Nil, _List_Nil),
			graph);
		var flairs = _n1.a;
		var nodes = _n1.b;
		return A2(
			elm$svg$Svg$svg,
			_List_fromArray(
				[
					elm$svg$Svg$Attributes$width(
					elm$core$String$fromFloat(width) + 'px'),
					elm$svg$Svg$Attributes$height(
					elm$core$String$fromFloat(height) + 'px'),
					elm$svg$Svg$Attributes$viewBox(
					elm$core$String$fromFloat(minX) + (' ' + (elm$core$String$fromFloat(minY) + (' ' + (elm$core$String$fromFloat(width) + (' ' + elm$core$String$fromFloat(height)))))))
				]),
			_List_fromArray(
				[
					A2(
					elm$svg$Svg$g,
					_List_fromArray(
						[
							elm$svg$Svg$Attributes$class('lower')
						]),
					flairs),
					A2(
					elm$svg$Svg$g,
					_List_fromArray(
						[
							elm$svg$Svg$Attributes$class('links')
						]),
					links),
					A2(
					elm$svg$Svg$g,
					_List_fromArray(
						[
							elm$svg$Svg$Attributes$class('upper')
						]),
					nodes)
				]));
	});
var author$project$Main$AddFilter = function (a) {
	return {$: 54, a: a};
};
var author$project$Main$AllActivitySort = {$: 2};
var author$project$Main$HasLabelFilter = F2(
	function (a, b) {
		return {$: 2, a: a, b: b};
	});
var author$project$Main$InvolvesUserFilter = function (a) {
	return {$: 3, a: a};
};
var author$project$Main$PullRequestsFilter = {$: 4};
var author$project$Main$RemoveFilter = function (a) {
	return {$: 55, a: a};
};
var author$project$Main$SetGraphSort = function (a) {
	return {$: 56, a: a};
};
var author$project$Main$SetLabelSearch = function (a) {
	return {$: 58, a: a};
};
var author$project$Main$ToggleLabelFilters = {$: 57};
var author$project$Main$UntriagedFilter = {$: 5};
var author$project$Main$UserActivitySort = function (a) {
	return {$: 1, a: a};
};
var author$project$Main$hasFilter = F2(
	function (model, filter) {
		return A2(elm$core$List$member, filter, model.ab);
	});
var author$project$Main$viewGraphControls = function (model) {
	var labelFilters = A2(
		elm$core$List$filterMap,
		function (filter) {
			if (filter.$ === 2) {
				var name = filter.a;
				var color = filter.b;
				return elm$core$Maybe$Just(
					A2(
						elm$html$Html$div,
						_Utils_ap(
							_List_fromArray(
								[
									elm$html$Html$Attributes$class('control-setting'),
									elm$html$Html$Events$onClick(
									author$project$Main$RemoveFilter(filter))
								]),
							A2(author$project$Main$labelColorStyles, model, color)),
						_List_fromArray(
							[
								A2(
								elm$html$Html$span,
								_List_fromArray(
									[
										elm$html$Html$Attributes$class('octicon octicon-tag')
									]),
								_List_Nil),
								elm$html$Html$text(name)
							])));
			} else {
				return elm$core$Maybe$Nothing;
			}
		},
		model.ab);
	var allLabelFilters = function (a) {
		return A2(
			elm$core$List$filterMap,
			a,
			elm$core$Dict$toList(model.D.aB));
	}(
		function (_n2) {
			var _n3 = _n2.a;
			var name = _n3.a;
			var color = _n3.b;
			return A2(elm$core$String$contains, model.bj, name) ? elm$core$Maybe$Just(
				A2(
					elm$html$Html$div,
					_List_fromArray(
						[
							elm$html$Html$Attributes$class('label-filter')
						]),
					_List_fromArray(
						[
							A2(
							elm$html$Html$div,
							_Utils_ap(
								_List_fromArray(
									[
										elm$html$Html$Attributes$class('label'),
										elm$html$Html$Events$onClick(
										author$project$Main$AddFilter(
											A2(author$project$Main$HasLabelFilter, name, color)))
									]),
								A2(author$project$Main$labelColorStyles, model, color)),
							_List_fromArray(
								[
									A2(
									elm$html$Html$span,
									_List_fromArray(
										[
											elm$html$Html$Attributes$class('octicon octicon-tag')
										]),
									_List_Nil),
									elm$html$Html$text(name)
								]))
						]))) : elm$core$Maybe$Nothing;
		});
	return A2(
		elm$html$Html$div,
		_List_fromArray(
			[
				elm$html$Html$Attributes$class('graph-controls')
			]),
		_List_fromArray(
			[
				A2(
				elm$html$Html$div,
				_List_fromArray(
					[
						elm$html$Html$Attributes$class('control-group')
					]),
				_Utils_ap(
					_List_fromArray(
						[
							A2(
							elm$html$Html$span,
							_List_fromArray(
								[
									elm$html$Html$Attributes$class('controls-label')
								]),
							_List_fromArray(
								[
									elm$html$Html$text('filter:')
								])),
							function () {
							var filter = author$project$Main$UntriagedFilter;
							return A2(
								elm$html$Html$div,
								_List_fromArray(
									[
										elm$html$Html$Attributes$classList(
										_List_fromArray(
											[
												_Utils_Tuple2('control-setting', true),
												_Utils_Tuple2(
												'active',
												A2(author$project$Main$hasFilter, model, filter))
											])),
										elm$html$Html$Events$onClick(
										A2(author$project$Main$hasFilter, model, filter) ? author$project$Main$RemoveFilter(filter) : author$project$Main$AddFilter(filter))
									]),
								_List_fromArray(
									[
										A2(
										elm$html$Html$span,
										_List_fromArray(
											[
												elm$html$Html$Attributes$class('octicon octicon-inbox')
											]),
										_List_Nil),
										elm$html$Html$text('untriaged')
									]));
						}(),
							function () {
							var filter = author$project$Main$PullRequestsFilter;
							return A2(
								elm$html$Html$div,
								_List_fromArray(
									[
										elm$html$Html$Attributes$classList(
										_List_fromArray(
											[
												_Utils_Tuple2('control-setting', true),
												_Utils_Tuple2(
												'active',
												A2(author$project$Main$hasFilter, model, filter))
											])),
										elm$html$Html$Events$onClick(
										A2(author$project$Main$hasFilter, model, filter) ? author$project$Main$RemoveFilter(filter) : author$project$Main$AddFilter(filter))
									]),
								_List_fromArray(
									[
										A2(
										elm$html$Html$span,
										_List_fromArray(
											[
												elm$html$Html$Attributes$class('octicon octicon-git-pull-request')
											]),
										_List_Nil),
										elm$html$Html$text('pull requests')
									]));
						}(),
							function () {
							var _n0 = model.g;
							if (!_n0.$) {
								var user = _n0.a.ev;
								var filter = author$project$Main$InvolvesUserFilter(user.hn);
								return A2(
									elm$html$Html$div,
									_List_fromArray(
										[
											elm$html$Html$Attributes$classList(
											_List_fromArray(
												[
													_Utils_Tuple2('control-setting', true),
													_Utils_Tuple2(
													'active',
													A2(author$project$Main$hasFilter, model, filter))
												])),
											elm$html$Html$Events$onClick(
											A2(author$project$Main$hasFilter, model, filter) ? author$project$Main$RemoveFilter(filter) : author$project$Main$AddFilter(filter))
										]),
									_List_fromArray(
										[
											A2(
											elm$html$Html$span,
											_List_fromArray(
												[
													elm$html$Html$Attributes$class('octicon octicon-comment-discussion')
												]),
											_List_Nil),
											elm$html$Html$text('involving me')
										]));
							} else {
								return elm$html$Html$text('');
							}
						}(),
							A2(
							elm$html$Html$div,
							_List_fromArray(
								[
									elm$html$Html$Attributes$class('label-selection')
								]),
							_List_fromArray(
								[
									A2(
									elm$html$Html$div,
									_List_fromArray(
										[
											elm$html$Html$Attributes$classList(
											_List_fromArray(
												[
													_Utils_Tuple2('label-filters', true),
													_Utils_Tuple2('visible', model.bA)
												]))
										]),
									_List_fromArray(
										[
											A2(
											elm$html$Html$div,
											_List_fromArray(
												[
													elm$html$Html$Attributes$class('label-options')
												]),
											allLabelFilters),
											A2(
											elm$html$Html$input,
											_List_fromArray(
												[
													elm$html$Html$Attributes$type_('text'),
													elm$html$Html$Events$onInput(author$project$Main$SetLabelSearch)
												]),
											_List_Nil)
										])),
									A2(
									elm$html$Html$div,
									_List_fromArray(
										[
											elm$html$Html$Attributes$classList(
											_List_fromArray(
												[
													_Utils_Tuple2('control-setting', true),
													_Utils_Tuple2('active', model.bA)
												])),
											elm$html$Html$Events$onClick(author$project$Main$ToggleLabelFilters)
										]),
									_List_fromArray(
										[
											A2(
											elm$html$Html$span,
											_List_fromArray(
												[
													elm$html$Html$Attributes$class('octicon octicon-tag')
												]),
											_List_Nil),
											elm$html$Html$text('label')
										]))
								]))
						]),
					labelFilters)),
				A2(
				elm$html$Html$div,
				_List_fromArray(
					[
						elm$html$Html$Attributes$class('control-group')
					]),
				_List_fromArray(
					[
						A2(
						elm$html$Html$span,
						_List_fromArray(
							[
								elm$html$Html$Attributes$class('controls-label')
							]),
						_List_fromArray(
							[
								elm$html$Html$text('sort:')
							])),
						A2(
						elm$html$Html$div,
						_List_fromArray(
							[
								elm$html$Html$Attributes$classList(
								_List_fromArray(
									[
										_Utils_Tuple2('control-setting', true),
										_Utils_Tuple2(
										'active',
										_Utils_eq(model.aO, author$project$Main$ImpactSort))
									])),
								elm$html$Html$Events$onClick(
								author$project$Main$SetGraphSort(author$project$Main$ImpactSort))
							]),
						_List_fromArray(
							[
								A2(
								elm$html$Html$span,
								_List_fromArray(
									[
										elm$html$Html$Attributes$class('octicon octicon-flame')
									]),
								_List_Nil),
								elm$html$Html$text('impact')
							])),
						A2(
						elm$html$Html$div,
						_List_fromArray(
							[
								elm$html$Html$Attributes$classList(
								_List_fromArray(
									[
										_Utils_Tuple2('control-setting', true),
										_Utils_Tuple2(
										'active',
										_Utils_eq(model.aO, author$project$Main$AllActivitySort))
									])),
								elm$html$Html$Events$onClick(
								author$project$Main$SetGraphSort(author$project$Main$AllActivitySort))
							]),
						_List_fromArray(
							[
								A2(
								elm$html$Html$span,
								_List_fromArray(
									[
										elm$html$Html$Attributes$class('octicon octicon-clock')
									]),
								_List_Nil),
								elm$html$Html$text('all activity')
							])),
						function () {
						var _n1 = model.g;
						if (!_n1.$) {
							var user = _n1.a.ev;
							return A2(
								elm$html$Html$div,
								_List_fromArray(
									[
										elm$html$Html$Attributes$classList(
										_List_fromArray(
											[
												_Utils_Tuple2('control-setting', true),
												_Utils_Tuple2(
												'active',
												_Utils_eq(
													model.aO,
													author$project$Main$UserActivitySort(user.hn)))
											])),
										elm$html$Html$Events$onClick(
										author$project$Main$SetGraphSort(
											author$project$Main$UserActivitySort(user.hn)))
									]),
								_List_fromArray(
									[
										A2(
										elm$html$Html$span,
										_List_fromArray(
											[
												elm$html$Html$Attributes$class('octicon octicon-clock')
											]),
										_List_Nil),
										elm$html$Html$text('my activity')
									]));
						} else {
							return elm$html$Html$text('');
						}
					}()
					]))
			]));
};
var elm$html$Html$Lazy$lazy2 = elm$virtual_dom$VirtualDom$lazy2;
var author$project$Main$viewSpatialGraph = function (model) {
	return A2(
		elm$html$Html$div,
		_List_fromArray(
			[
				elm$html$Html$Attributes$class('spatial-graph')
			]),
		A2(
			elm$core$List$cons,
			author$project$Main$viewGraphControls(model),
			A2(
				elm$core$List$map,
				F2(
					function (f, _n0) {
						var a = _n0.a;
						var b = _n0.b;
						return A2(f, a, b);
					})(
					elm$html$Html$Lazy$lazy2(author$project$Main$viewGraph)),
				model.ax)));
};
var author$project$Main$viewSingleProject = F2(
	function (model, _n0) {
		var project = _n0.f2;
		var icebox = _n0.bg;
		var backlogs = _n0.cr;
		var inFlight = _n0.aP;
		var done = _n0.aM;
		return A2(
			elm$html$Html$div,
			_List_fromArray(
				[
					elm$html$Html$Attributes$class('project single')
				]),
			_List_fromArray(
				[
					A2(
					elm$html$Html$div,
					_List_fromArray(
						[
							elm$html$Html$Attributes$class('project-columns')
						]),
					_Utils_ap(
						_List_fromArray(
							[
								A2(
								elm$html$Html$div,
								_List_fromArray(
									[
										elm$html$Html$Attributes$class('column name-column')
									]),
								_List_fromArray(
									[
										A2(
										elm$html$Html$h4,
										_List_Nil,
										_List_fromArray(
											[
												elm$html$Html$text(project.ht)
											]))
									])),
								A2(
								elm$html$Html$div,
								_List_fromArray(
									[
										elm$html$Html$Attributes$class('column done-column')
									]),
								_List_fromArray(
									[
										A4(
										author$project$Main$viewProjectColumn,
										model,
										project,
										author$project$Main$onlyOpenCards(model),
										done)
									])),
								A2(
								elm$html$Html$div,
								_List_fromArray(
									[
										elm$html$Html$Attributes$class('column in-flight-column')
									]),
								_List_fromArray(
									[
										A4(author$project$Main$viewProjectColumn, model, project, elm$core$Basics$identity, inFlight)
									]))
							]),
						A2(
							elm$core$List$map,
							function (backlog) {
								return A2(
									elm$html$Html$div,
									_List_fromArray(
										[
											elm$html$Html$Attributes$class('column backlog-column')
										]),
									_List_fromArray(
										[
											A4(author$project$Main$viewProjectColumn, model, project, elm$core$Basics$identity, backlog)
										]));
							},
							backlogs))),
					A2(
					elm$html$Html$div,
					_List_fromArray(
						[
							elm$html$Html$Attributes$class('icebox-graph')
						]),
					_List_fromArray(
						[
							author$project$Main$viewSpatialGraph(model),
							function () {
							var dropCandidate = {
								fQ: author$project$Main$MoveCardAfter,
								av: {eJ: elm$core$Maybe$Nothing, cA: icebox.fu, b7: project.fu}
							};
							return A4(author$project$Drag$viewDropArea, model.h, author$project$Main$ProjectDrag, dropCandidate, elm$core$Maybe$Nothing);
						}()
						]))
				]));
	});
var author$project$Main$viewProjectPage = F2(
	function (model, name) {
		var statefulProjects = A2(
			elm$core$List$filterMap,
			author$project$Main$selectStatefulProject,
			elm$core$Dict$values(model.c.f3));
		var mproject = elm$core$List$head(
			A2(
				elm$core$List$filter,
				A2(
					elm$core$Basics$composeL,
					A2(
						elm$core$Basics$composeL,
						elm$core$Basics$eq(name),
						function ($) {
							return $.ht;
						}),
					function ($) {
						return $.f2;
					}),
				statefulProjects));
		if (!mproject.$) {
			var project = mproject.a;
			return A2(author$project$Main$viewSingleProject, model, project);
		} else {
			return elm$html$Html$text('project not found');
		}
	});
var elm$core$List$sortBy = _List_sortBy;
var author$project$Main$viewPullRequestsPage = function (model) {
	var viewRepoPRs = F2(
		function (repo, prs) {
			return A2(
				elm$html$Html$div,
				_List_fromArray(
					[
						elm$html$Html$Attributes$class('repo-pull-requests')
					]),
				_List_fromArray(
					[
						A2(
						elm$html$Html$div,
						_List_fromArray(
							[
								elm$html$Html$Attributes$class('repo-name')
							]),
						_List_fromArray(
							[
								A2(
								elm$html$Html$div,
								_List_fromArray(
									[
										elm$html$Html$Attributes$class('repo-name-label')
									]),
								_List_fromArray(
									[
										A2(
										elm$html$Html$span,
										_List_fromArray(
											[
												elm$html$Html$Attributes$class('octicon octicon-repo')
											]),
										_List_Nil),
										elm$html$Html$text(repo.ht)
									]))
							])),
						A2(
						elm$html$Html$div,
						_List_fromArray(
							[
								elm$html$Html$Attributes$class('cards')
							]),
						A2(
							elm$core$List$map,
							author$project$Main$viewCard(model),
							prs))
					]));
		});
	var getRepo = F3(
		function (repoId, prs, acc) {
			var _n1 = A2(elm$core$Dict$get, repoId, model.c.ga);
			if (!_n1.$) {
				var repo = _n1.a;
				return A2(
					elm$core$List$cons,
					_Utils_Tuple2(repo, prs),
					acc);
			} else {
				return acc;
			}
		});
	return A2(
		elm$html$Html$div,
		_List_fromArray(
			[
				elm$html$Html$Attributes$class('all-pull-requests')
			]),
		A2(
			elm$core$List$map,
			function (_n0) {
				var a = _n0.a;
				var b = _n0.b;
				return A2(viewRepoPRs, a, b);
			},
			elm$core$List$reverse(
				A2(
					elm$core$List$sortBy,
					A2(elm$core$Basics$composeR, elm$core$Tuple$second, elm$core$List$length),
					A3(elm$core$Dict$foldl, getRepo, _List_Nil, model.D.cX)))));
};
var author$project$Main$ApplyLabelOperations = {$: 62};
var author$project$Main$ClearSelectedCards = {$: 23};
var author$project$Main$RemoveLabelOperation = 1;
var author$project$Main$SetLabelOperation = F2(
	function (a, b) {
		return {$: 60, a: a, b: b};
	});
var author$project$Main$ToggleLabelOperations = {$: 59};
var author$project$Main$UnsetLabelOperation = function (a) {
	return {$: 61, a: a};
};
var author$project$Main$viewSidebarControls = function (model) {
	var viewLabelOperation = F2(
		function (name, color) {
			var _n1 = function () {
				var _n2 = A2(elm$core$Dict$get, name, model.ay);
				if (!_n2.$) {
					if (!_n2.a) {
						var _n3 = _n2.a;
						return _Utils_Tuple2(
							'checked octicon octicon-check',
							A2(author$project$Main$SetLabelOperation, name, 1));
					} else {
						var _n4 = _n2.a;
						return _Utils_Tuple2(
							'unhecked octicon',
							author$project$Main$UnsetLabelOperation(name));
					}
				} else {
					var cards = A2(
						elm$core$List$filterMap,
						function (a) {
							return A2(elm$core$Dict$get, a, model.p);
						},
						y0hy0h$ordered_containers$OrderedSet$toList(model.s));
					return ((!elm$core$List$isEmpty(cards)) && A2(
						elm$core$List$all,
						A2(author$project$Main$hasLabel, model, name),
						cards)) ? _Utils_Tuple2(
						'checked octicon octicon-check',
						A2(author$project$Main$SetLabelOperation, name, 1)) : (A2(
						elm$core$List$any,
						A2(author$project$Main$hasLabel, model, name),
						cards) ? _Utils_Tuple2(
						'mixed octicon octicon-dash',
						A2(author$project$Main$SetLabelOperation, name, 0)) : _Utils_Tuple2(
						'unchecked octicon',
						A2(author$project$Main$SetLabelOperation, name, 0)));
				}
			}();
			var checkClass = _n1.a;
			var clickOperation = _n1.b;
			return A2(
				elm$html$Html$div,
				_List_fromArray(
					[
						elm$html$Html$Attributes$class('label-operation')
					]),
				_List_fromArray(
					[
						A2(
						elm$html$Html$span,
						_List_fromArray(
							[
								elm$html$Html$Attributes$class('checkbox ' + checkClass),
								elm$html$Html$Events$onClick(clickOperation)
							]),
						_List_Nil),
						A2(
						elm$html$Html$span,
						_Utils_ap(
							_List_fromArray(
								[
									elm$html$Html$Attributes$class('label'),
									elm$html$Html$Events$onClick(
									author$project$Main$AddFilter(
										A2(author$project$Main$HasLabelFilter, name, color)))
								]),
							A2(author$project$Main$labelColorStyles, model, color)),
						_List_fromArray(
							[
								A2(
								elm$html$Html$span,
								_List_fromArray(
									[
										elm$html$Html$Attributes$class('octicon octicon-tag')
									]),
								_List_Nil),
								elm$html$Html$text(name)
							]))
					]));
		});
	var labelOptions = model.aC ? A2(
		elm$core$List$map,
		function (_n0) {
			var a = _n0.a;
			var b = _n0.b;
			return A2(viewLabelOperation, a, b);
		},
		A2(
			elm$core$List$filter,
			A2(
				elm$core$Basics$composeL,
				elm$core$String$contains(model.bj),
				elm$core$Tuple$first),
			elm$core$Dict$keys(model.D.aB))) : _List_Nil;
	return A2(
		elm$html$Html$div,
		_List_fromArray(
			[
				elm$html$Html$Attributes$class('sidebar-controls')
			]),
		_List_fromArray(
			[
				A2(
				elm$html$Html$div,
				_List_fromArray(
					[
						elm$html$Html$Attributes$class('control-knobs')
					]),
				_List_fromArray(
					[
						A2(
						elm$html$Html$span,
						_List_fromArray(
							[
								elm$html$Html$Attributes$class('controls-label')
							]),
						_List_fromArray(
							[
								elm$html$Html$text('change:')
							])),
						A2(
						elm$html$Html$div,
						_List_fromArray(
							[
								elm$html$Html$Attributes$classList(
								_List_fromArray(
									[
										_Utils_Tuple2('control-setting', true),
										_Utils_Tuple2('active', model.aC)
									])),
								elm$html$Html$Events$onClick(author$project$Main$ToggleLabelOperations)
							]),
						_List_fromArray(
							[
								A2(
								elm$html$Html$span,
								_List_fromArray(
									[
										elm$html$Html$Attributes$class('octicon octicon-tag')
									]),
								_List_Nil),
								elm$html$Html$text('labels')
							])),
						A2(
						elm$html$Html$span,
						_List_fromArray(
							[
								elm$html$Html$Events$onClick(author$project$Main$ClearSelectedCards),
								elm$html$Html$Attributes$class('octicon octicon-x clear-selected')
							]),
						_List_fromArray(
							[
								elm$html$Html$text('')
							]))
					])),
				A2(
				elm$html$Html$div,
				_List_fromArray(
					[
						elm$html$Html$Attributes$classList(
						_List_fromArray(
							[
								_Utils_Tuple2('label-operations', true),
								_Utils_Tuple2('visible', model.aC)
							]))
					]),
				_List_fromArray(
					[
						A2(
						elm$html$Html$input,
						_List_fromArray(
							[
								elm$html$Html$Attributes$type_('text'),
								elm$html$Html$Attributes$placeholder('search labels'),
								elm$html$Html$Events$onInput(author$project$Main$SetLabelSearch)
							]),
						_List_Nil),
						A2(
						elm$html$Html$div,
						_List_fromArray(
							[
								elm$html$Html$Attributes$class('label-options')
							]),
						labelOptions),
						A2(
						elm$html$Html$div,
						_List_fromArray(
							[
								elm$html$Html$Attributes$class('buttons')
							]),
						_List_fromArray(
							[
								A2(
								elm$html$Html$div,
								_List_fromArray(
									[
										elm$html$Html$Attributes$class('button cancel'),
										elm$html$Html$Events$onClick(author$project$Main$ToggleLabelOperations)
									]),
								_List_fromArray(
									[
										A2(
										elm$html$Html$span,
										_List_fromArray(
											[
												elm$html$Html$Attributes$class('octicon octicon-x')
											]),
										_List_Nil),
										elm$html$Html$text('cancel')
									])),
								A2(
								elm$html$Html$div,
								_List_fromArray(
									[
										elm$html$Html$Attributes$class('button apply'),
										elm$html$Html$Events$onClick(author$project$Main$ApplyLabelOperations)
									]),
								_List_fromArray(
									[
										A2(
										elm$html$Html$span,
										_List_fromArray(
											[
												elm$html$Html$Attributes$class('octicon octicon-check')
											]),
										_List_Nil),
										elm$html$Html$text('apply')
									]))
							]))
					]))
			]));
};
var author$project$Main$viewPage = function (model) {
	var selectedCards = A2(
		elm$core$List$map,
		author$project$Main$viewCardEntry(model),
		A2(
			elm$core$List$filterMap,
			function (a) {
				return A2(elm$core$Dict$get, a, model.p);
			},
			y0hy0h$ordered_containers$OrderedSet$toList(model.s)));
	var anticipatedCards = A2(
		elm$core$List$map,
		author$project$Main$viewCardEntry(model),
		A2(
			elm$core$List$filterMap,
			function (a) {
				return A2(elm$core$Dict$get, a, model.p);
			},
			A2(
				elm$core$List$filter,
				A2(
					elm$core$Basics$composeL,
					elm$core$Basics$not,
					function (a) {
						return A2(y0hy0h$ordered_containers$OrderedSet$member, a, model.s);
					}),
				elm$core$Set$toList(model.u))));
	var sidebarCards = _Utils_ap(
		anticipatedCards,
		elm$core$List$reverse(selectedCards));
	return A2(
		elm$html$Html$div,
		_List_fromArray(
			[
				elm$html$Html$Attributes$class('cadet')
			]),
		_List_fromArray(
			[
				A2(
				elm$html$Html$div,
				_List_fromArray(
					[
						elm$html$Html$Attributes$classList(
						_List_fromArray(
							[
								_Utils_Tuple2('main-page', true),
								_Utils_Tuple2(
								'contains-graph',
								function () {
									var _n0 = model.bv;
									switch (_n0.$) {
										case 1:
											return true;
										case 2:
											var id = _n0.a;
											return true;
										default:
											return false;
									}
								}())
							]))
					]),
				_List_fromArray(
					[
						A2(
						elm$html$Html$div,
						_List_fromArray(
							[
								elm$html$Html$Attributes$class('page-content')
							]),
						_List_fromArray(
							[
								function () {
								var _n1 = model.bv;
								switch (_n1.$) {
									case 0:
										return author$project$Main$viewAllProjectsPage(model);
									case 1:
										return author$project$Main$viewSpatialGraph(model);
									case 2:
										var id = _n1.a;
										return A2(author$project$Main$viewProjectPage, model, id);
									case 3:
										return author$project$Main$viewLabelsPage(model);
									case 4:
										return author$project$Main$viewMilestonesPage(model);
									case 5:
										return author$project$Main$viewPullRequestsPage(model);
									default:
										return elm$html$Html$text('you shouldn\'t see this');
								}
							}()
							])),
						A2(
						elm$html$Html$div,
						_List_fromArray(
							[
								elm$html$Html$Attributes$classList(
								_List_fromArray(
									[
										_Utils_Tuple2('page-sidebar', true),
										_Utils_Tuple2(
										'empty',
										elm$core$List$isEmpty(sidebarCards))
									]))
							]),
						_List_fromArray(
							[
								author$project$Main$viewSidebarControls(model),
								elm$core$List$isEmpty(sidebarCards) ? A2(
								elm$html$Html$div,
								_List_fromArray(
									[
										elm$html$Html$Attributes$class('no-cards')
									]),
								_List_fromArray(
									[
										elm$html$Html$text('no cards selected')
									])) : A2(
								elm$html$Html$div,
								_List_fromArray(
									[
										elm$html$Html$Attributes$class('cards')
									]),
								sidebarCards)
							]))
					])),
				author$project$Main$viewNavBar(model)
			]));
};
var author$project$Main$view = function (model) {
	return {
		gM: _List_fromArray(
			[
				author$project$Main$viewPage(model)
			]),
		bF: 'Cadet'
	};
};
var elm$browser$Browser$application = _Browser_application;
var author$project$Main$main = elm$browser$Browser$application(
	{hk: author$project$Main$init, hH: author$project$Main$UrlChanged, hI: author$project$Main$LinkClicked, hY: author$project$Main$subscriptions, ia: author$project$Main$update, id: author$project$Main$view});
_Platform_export({'Main':{'init':author$project$Main$main(
	A2(
		elm$json$Json$Decode$andThen,
		function (initialTime) {
			return elm$json$Json$Decode$succeed(
				{dG: initialTime});
		},
		A2(elm$json$Json$Decode$field, 'initialTime', elm$json$Json$Decode$int)))(0)}});}(this));