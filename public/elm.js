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

console.warn('Compiled in DEV mode. Follow the advice at https://elm-lang.org/0.19.1/optimize for better performance and smaller assets.');


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
				+ _Debug_toAnsiString(ansi, $elm$core$Set$toList(value));
		}

		if (tag === 'RBNode_elm_builtin' || tag === 'RBEmpty_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Dict')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Dict$toList(value));
		}

		if (tag === 'Array_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Array')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Array$toList(value));
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
		x = $elm$core$Set$toList(x);
		y = $elm$core$Set$toList(y);
	}
	if (x.$ === 'RBNode_elm_builtin' || x.$ === 'RBEmpty_elm_builtin')
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	/**_UNUSED/
	if (x.$ < 0)
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
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
	return n < 0 ? $elm$core$Basics$LT : n ? $elm$core$Basics$GT : $elm$core$Basics$EQ;
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
		return ord === $elm$core$Basics$EQ ? 0 : ord === $elm$core$Basics$LT ? -1 : 1;
	}));
});



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



var _String_cons = F2(function(chr, str)
{
	return chr + str;
});

function _String_uncons(string)
{
	var word = string.charCodeAt(0);
	return word
		? $elm$core$Maybe$Just(
			0xD800 <= word && word <= 0xDBFF
				? _Utils_Tuple2(_Utils_chr(string[0] + string[1]), string.slice(2))
				: _Utils_Tuple2(_Utils_chr(string[0]), string.slice(1))
		)
		: $elm$core$Maybe$Nothing;
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
			return $elm$core$Maybe$Nothing;
		}
		total = 10 * total + code - 0x30;
	}

	return i == start
		? $elm$core$Maybe$Nothing
		: $elm$core$Maybe$Just(code0 == 0x2D ? -total : total);
}


// FLOAT CONVERSIONS

function _String_toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return $elm$core$Maybe$Nothing;
	}
	var n = +s;
	// faster isNaN check
	return n === n ? $elm$core$Maybe$Just(n) : $elm$core$Maybe$Nothing;
}

function _String_fromList(chars)
{
	return _List_toArray(chars).join('');
}




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



/**/
function _Json_errorToString(error)
{
	return $elm$json$Json$Decode$errorToString(error);
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
		? $elm$core$Result$Ok(value)
		:
	(isFinite(value) && !(value % 1))
		? $elm$core$Result$Ok(value)
		: _Json_expecting('an INT', value);
});

var _Json_decodeBool = _Json_decodePrim(function(value) {
	return (typeof value === 'boolean')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a BOOL', value);
});

var _Json_decodeFloat = _Json_decodePrim(function(value) {
	return (typeof value === 'number')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a FLOAT', value);
});

var _Json_decodeValue = _Json_decodePrim(function(value) {
	return $elm$core$Result$Ok(_Json_wrap(value));
});

var _Json_decodeString = _Json_decodePrim(function(value) {
	return (typeof value === 'string')
		? $elm$core$Result$Ok(value)
		: (value instanceof String)
			? $elm$core$Result$Ok(value + '')
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
		return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'This is not valid JSON! ' + e.message, _Json_wrap(string)));
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
				? $elm$core$Result$Ok(decoder.c)
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
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, field, result.a));

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
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, index, result.a));

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
					if (!$elm$core$Result$isOk(result))
					{
						return $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, key, result.a));
					}
					keyValuePairs = _List_Cons(_Utils_Tuple2(key, result.a), keyValuePairs);
				}
			}
			return $elm$core$Result$Ok($elm$core$List$reverse(keyValuePairs));

		case 9:
			var answer = decoder.f;
			var decoders = decoder.g;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = _Json_runHelp(decoders[i], value);
				if (!$elm$core$Result$isOk(result))
				{
					return result;
				}
				answer = answer(result.a);
			}
			return $elm$core$Result$Ok(answer);

		case 10:
			var result = _Json_runHelp(decoder.b, value);
			return (!$elm$core$Result$isOk(result))
				? result
				: _Json_runHelp(decoder.h(result.a), value);

		case 11:
			var errors = _List_Nil;
			for (var temp = decoder.g; temp.b; temp = temp.b) // WHILE_CONS
			{
				var result = _Json_runHelp(temp.a, value);
				if ($elm$core$Result$isOk(result))
				{
					return result;
				}
				errors = _List_Cons(result.a, errors);
			}
			return $elm$core$Result$Err($elm$json$Json$Decode$OneOf($elm$core$List$reverse(errors)));

		case 1:
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, decoder.a, _Json_wrap(value)));

		case 0:
			return $elm$core$Result$Ok(decoder.a);
	}
}

function _Json_runArrayDecoder(decoder, value, toElmValue)
{
	var len = value.length;
	var array = new Array(len);
	for (var i = 0; i < len; i++)
	{
		var result = _Json_runHelp(decoder, value[i]);
		if (!$elm$core$Result$isOk(result))
		{
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, i, result.a));
		}
		array[i] = result.a;
	}
	return $elm$core$Result$Ok(toElmValue(array));
}

function _Json_isArray(value)
{
	return Array.isArray(value) || (typeof FileList === 'function' && value instanceof FileList);
}

function _Json_toElmArray(array)
{
	return A2($elm$core$Array$initialize, array.length, function(i) { return array[i]; });
}

function _Json_expecting(type, value)
{
	return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'Expecting ' + type, _Json_wrap(value)));
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
	$elm$core$Result$isOk(result) || _Debug_crash(2 /**/, _Json_errorToString(result.a) /**/);
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

		$elm$core$Result$isOk(result) || _Debug_crash(4, name, result.a);

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

	/**_UNUSED/
	var node = args['node'];
	//*/
	/**/
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

function _VirtualDom_noJavaScriptUri_UNUSED(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,'')) ? '' : value;
}

function _VirtualDom_noJavaScriptUri(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,''))
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlUri_UNUSED(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value) ? '' : value;
}

function _VirtualDom_noJavaScriptOrHtmlUri(value)
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
	var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

	// 0 = Normal
	// 1 = MayStopPropagation
	// 2 = MayPreventDefault
	// 3 = Custom

	return {
		$: handler.$,
		a:
			!tag
				? A2($elm$json$Json$Decode$map, func, handler.a)
				:
			A3($elm$json$Json$Decode$map2,
				tag < 3
					? _VirtualDom_mapEventTuple
					: _VirtualDom_mapEventRecord,
				$elm$json$Json$Decode$succeed(func),
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
		message: func(record.message),
		stopPropagation: record.stopPropagation,
		preventDefault: record.preventDefault
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
			&& { passive: $elm$virtual_dom$VirtualDom$toHandlerInt(newHandler) < 2 }
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

		if (!$elm$core$Result$isOk(result))
		{
			return;
		}

		var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

		// 0 = Normal
		// 1 = MayStopPropagation
		// 2 = MayPreventDefault
		// 3 = Custom

		var value = result.a;
		var message = !tag ? value : tag < 3 ? value.a : value.message;
		var stopPropagation = tag == 1 ? value.b : tag == 3 && value.stopPropagation;
		var currentEventNode = (
			stopPropagation && event.stopPropagation(),
			(tag == 2 ? value.b : tag == 3 && value.preventDefault) && event.preventDefault(),
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
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var view = impl.view;
			/**_UNUSED/
			var domNode = args['node'];
			//*/
			/**/
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
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var divertHrefToApp = impl.setup && impl.setup(sendToApp)
			var view = impl.view;
			var title = _VirtualDom_doc.title;
			var bodyNode = _VirtualDom_doc.body;
			var currNode = _VirtualDom_virtualize(bodyNode);
			return _Browser_makeAnimator(initialModel, function(model)
			{
				_VirtualDom_divertHrefToApp = divertHrefToApp;
				var doc = view(model);
				var nextNode = _VirtualDom_node('body')(_List_Nil)(doc.body);
				var patches = _VirtualDom_diff(currNode, nextNode);
				bodyNode = _VirtualDom_applyPatches(bodyNode, currNode, patches, sendToApp);
				currNode = nextNode;
				_VirtualDom_divertHrefToApp = 0;
				(title !== doc.title) && (_VirtualDom_doc.title = title = doc.title);
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
	var onUrlChange = impl.onUrlChange;
	var onUrlRequest = impl.onUrlRequest;
	var key = function() { key.a(onUrlChange(_Browser_getUrl())); };

	return _Browser_document({
		setup: function(sendToApp)
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
					var next = $elm$url$Url$fromString(href).a;
					sendToApp(onUrlRequest(
						(next
							&& curr.protocol === next.protocol
							&& curr.host === next.host
							&& curr.port_.a === next.port_.a
						)
							? $elm$browser$Browser$Internal(next)
							: $elm$browser$Browser$External(href)
					));
				}
			});
		},
		init: function(flags)
		{
			return A3(impl.init, flags, _Browser_getUrl(), key);
		},
		view: impl.view,
		update: impl.update,
		subscriptions: impl.subscriptions
	});
}

function _Browser_getUrl()
{
	return $elm$url$Url$fromString(_VirtualDom_doc.location.href).a || _Debug_crash(1);
}

var _Browser_go = F2(function(key, n)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		n && history.go(n);
		key();
	}));
});

var _Browser_pushUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.pushState({}, '', url);
		key();
	}));
});

var _Browser_replaceUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
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
	return $elm$core$Result$isOk(result) ? $elm$core$Maybe$Just(result.a) : $elm$core$Maybe$Nothing;
});



// PAGE VISIBILITY


function _Browser_visibilityInfo()
{
	return (typeof _VirtualDom_doc.hidden !== 'undefined')
		? { hidden: 'hidden', change: 'visibilitychange' }
		:
	(typeof _VirtualDom_doc.mozHidden !== 'undefined')
		? { hidden: 'mozHidden', change: 'mozvisibilitychange' }
		:
	(typeof _VirtualDom_doc.msHidden !== 'undefined')
		? { hidden: 'msHidden', change: 'msvisibilitychange' }
		:
	(typeof _VirtualDom_doc.webkitHidden !== 'undefined')
		? { hidden: 'webkitHidden', change: 'webkitvisibilitychange' }
		: { hidden: 'hidden', change: 'visibilitychange' };
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
				: _Scheduler_fail($elm$browser$Browser$Dom$NotFound(id))
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
		scene: _Browser_getScene(),
		viewport: {
			x: _Browser_window.pageXOffset,
			y: _Browser_window.pageYOffset,
			width: _Browser_doc.documentElement.clientWidth,
			height: _Browser_doc.documentElement.clientHeight
		}
	};
}

function _Browser_getScene()
{
	var body = _Browser_doc.body;
	var elem = _Browser_doc.documentElement;
	return {
		width: Math.max(body.scrollWidth, body.offsetWidth, elem.scrollWidth, elem.offsetWidth, elem.clientWidth),
		height: Math.max(body.scrollHeight, body.offsetHeight, elem.scrollHeight, elem.offsetHeight, elem.clientHeight)
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
			scene: {
				width: node.scrollWidth,
				height: node.scrollHeight
			},
			viewport: {
				x: node.scrollLeft,
				y: node.scrollTop,
				width: node.clientWidth,
				height: node.clientHeight
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
			scene: _Browser_getScene(),
			viewport: {
				x: x,
				y: y,
				width: _Browser_doc.documentElement.clientWidth,
				height: _Browser_doc.documentElement.clientHeight
			},
			element: {
				x: x + rect.left,
				y: y + rect.top,
				width: rect.width,
				height: rect.height
			}
		};
	});
}



// LOAD and RELOAD


function _Browser_reload(skipCache)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		_VirtualDom_doc.location.reload(skipCache);
	}));
}

function _Browser_load(url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
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
			callback(_Scheduler_fail($elm$http$Http$NetworkError));
		});
		xhr.addEventListener('timeout', function() {
			callback(_Scheduler_fail($elm$http$Http$Timeout));
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
			return callback(_Scheduler_fail($elm$http$Http$BadUrl(request.url)));
		}

		_Http_configureRequest(xhr, request);

		var body = request.body;
		xhr.send($elm$http$Http$Internal$isStringBody(body)
			? (xhr.setRequestHeader('Content-Type', body.a), body.b)
			: body.a
		);

		return function() { xhr.abort(); };
	});
});

function _Http_configureProgress(xhr, maybeProgress)
{
	if (!$elm$core$Maybe$isJust(maybeProgress))
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

	$elm$core$Maybe$isJust(request.timeout) && (xhr.timeout = request.timeout.a);
}


// RESPONSES

function _Http_handleResponse(xhr, responseToResult)
{
	var response = _Http_toResponse(xhr);

	if (xhr.status < 200 || 300 <= xhr.status)
	{
		response.body = xhr.responseText;
		return _Scheduler_fail($elm$http$Http$BadStatus(response));
	}

	var result = responseToResult(response);

	if ($elm$core$Result$isOk(result))
	{
		return _Scheduler_succeed(result.a);
	}
	else
	{
		response.body = xhr.responseText;
		return _Scheduler_fail(A2($elm$http$Http$BadPayload, result.a, response));
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
	var headers = $elm$core$Dict$empty;

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

			headers = A3($elm$core$Dict$update, key, function(oldValue) {
				return $elm$core$Maybe$Just($elm$core$Maybe$isJust(oldValue)
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
			return A2($elm$core$Result$map, func, convertedResponse);
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

	return $elm$http$Http$Internal$FormDataBody(formData);
}


function _Url_percentEncode(string)
{
	return encodeURIComponent(string);
}

function _Url_percentDecode(string)
{
	try
	{
		return $elm$core$Maybe$Just(decodeURIComponent(string));
	}
	catch (e)
	{
		return $elm$core$Maybe$Nothing;
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
			A2($elm$time$Time$customZone, -(new Date().getTimezoneOffset()), _List_Nil)
		));
	});
}


function _Time_getZoneName()
{
	return _Scheduler_binding(function(callback)
	{
		try
		{
			var name = $elm$time$Time$Name(Intl.DateTimeFormat().resolvedOptions().timeZone);
		}
		catch (e)
		{
			var name = $elm$time$Time$Offset(new Date().getTimezoneOffset());
		}
		callback(_Scheduler_succeed(name));
	});
}


// CREATE

var _Regex_never = /.^/;

var _Regex_fromStringWith = F2(function(options, string)
{
	var flags = 'g';
	if (options.multiline) { flags += 'm'; }
	if (options.caseInsensitive) { flags += 'i'; }

	try
	{
		return $elm$core$Maybe$Just(new RegExp(string, flags));
	}
	catch(error)
	{
		return $elm$core$Maybe$Nothing;
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
				? $elm$core$Maybe$Just(submatch)
				: $elm$core$Maybe$Nothing;
		}
		out.push(A4($elm$regex$Regex$Match, result[0], result.index, number, _List_fromArray(subs)));
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
				? $elm$core$Maybe$Just(submatch)
				: $elm$core$Maybe$Nothing;
		}
		return replacer(A4($elm$regex$Regex$Match, match, arguments[arguments.length - 2], count, _List_fromArray(submatches)));
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
		if (!lang && $elm$core$Maybe$isJust(options.defaultHighlighting))
		{
			lang = options.defaultHighlighting.a;
		}

		if (typeof hljs !== 'undefined' && lang && hljs.listLanguages().indexOf(lang) >= 0)
		{
			return hljs.highlight(lang, code, true).value;
		}

		return code;
	}

	var gfm = options.githubFlavored.a;

	return {
		highlight: toHighlight,
		gfm: gfm,
		tables: gfm && gfm.tables,
		breaks: gfm && gfm.breaks,
		sanitize: options.sanitize,
		smartypants: options.smartypants
	};
}
var $author$project$Model$LinkClicked = function (a) {
	return {$: 'LinkClicked', a: a};
};
var $author$project$Model$UrlChanged = function (a) {
	return {$: 'UrlChanged', a: a};
};
var $elm$core$List$cons = _List_cons;
var $elm$core$Elm$JsArray$foldr = _JsArray_foldr;
var $elm$core$Array$foldr = F3(
	function (func, baseCase, _v0) {
		var tree = _v0.c;
		var tail = _v0.d;
		var helper = F2(
			function (node, acc) {
				if (node.$ === 'SubTree') {
					var subTree = node.a;
					return A3($elm$core$Elm$JsArray$foldr, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3($elm$core$Elm$JsArray$foldr, func, acc, values);
				}
			});
		return A3(
			$elm$core$Elm$JsArray$foldr,
			helper,
			A3($elm$core$Elm$JsArray$foldr, func, baseCase, tail),
			tree);
	});
var $elm$core$Array$toList = function (array) {
	return A3($elm$core$Array$foldr, $elm$core$List$cons, _List_Nil, array);
};
var $elm$core$Dict$foldr = F3(
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
					A3($elm$core$Dict$foldr, func, acc, right)),
					$temp$t = left;
				func = $temp$func;
				acc = $temp$acc;
				t = $temp$t;
				continue foldr;
			}
		}
	});
var $elm$core$Dict$toList = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return A2(
					$elm$core$List$cons,
					_Utils_Tuple2(key, value),
					list);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Dict$keys = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return A2($elm$core$List$cons, key, keyList);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Set$toList = function (_v0) {
	var dict = _v0.a;
	return $elm$core$Dict$keys(dict);
};
var $elm$core$Basics$EQ = {$: 'EQ'};
var $elm$core$Basics$GT = {$: 'GT'};
var $elm$core$Basics$LT = {$: 'LT'};
var $elm$core$Result$Err = function (a) {
	return {$: 'Err', a: a};
};
var $elm$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 'Failure', a: a, b: b};
	});
var $elm$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 'Field', a: a, b: b};
	});
var $elm$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 'Index', a: a, b: b};
	});
var $elm$core$Result$Ok = function (a) {
	return {$: 'Ok', a: a};
};
var $elm$json$Json$Decode$OneOf = function (a) {
	return {$: 'OneOf', a: a};
};
var $elm$core$Basics$False = {$: 'False'};
var $elm$core$Basics$add = _Basics_add;
var $elm$core$Maybe$Just = function (a) {
	return {$: 'Just', a: a};
};
var $elm$core$Maybe$Nothing = {$: 'Nothing'};
var $elm$core$String$all = _String_all;
var $elm$core$Basics$and = _Basics_and;
var $elm$core$Basics$append = _Utils_append;
var $elm$json$Json$Encode$encode = _Json_encode;
var $elm$core$String$fromInt = _String_fromNumber;
var $elm$core$String$join = F2(
	function (sep, chunks) {
		return A2(
			_String_join,
			sep,
			_List_toArray(chunks));
	});
var $elm$core$String$split = F2(
	function (sep, string) {
		return _List_fromArray(
			A2(_String_split, sep, string));
	});
var $elm$json$Json$Decode$indent = function (str) {
	return A2(
		$elm$core$String$join,
		'\n    ',
		A2($elm$core$String$split, '\n', str));
};
var $elm$core$List$foldl = F3(
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
var $elm$core$List$length = function (xs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, i) {
				return i + 1;
			}),
		0,
		xs);
};
var $elm$core$List$map2 = _List_map2;
var $elm$core$Basics$le = _Utils_le;
var $elm$core$Basics$sub = _Basics_sub;
var $elm$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_Utils_cmp(lo, hi) < 1) {
				var $temp$lo = lo,
					$temp$hi = hi - 1,
					$temp$list = A2($elm$core$List$cons, hi, list);
				lo = $temp$lo;
				hi = $temp$hi;
				list = $temp$list;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var $elm$core$List$range = F2(
	function (lo, hi) {
		return A3($elm$core$List$rangeHelp, lo, hi, _List_Nil);
	});
var $elm$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$map2,
			f,
			A2(
				$elm$core$List$range,
				0,
				$elm$core$List$length(xs) - 1),
			xs);
	});
var $elm$core$Char$toCode = _Char_toCode;
var $elm$core$Char$isLower = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (97 <= code) && (code <= 122);
};
var $elm$core$Char$isUpper = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 90) && (65 <= code);
};
var $elm$core$Basics$or = _Basics_or;
var $elm$core$Char$isAlpha = function (_char) {
	return $elm$core$Char$isLower(_char) || $elm$core$Char$isUpper(_char);
};
var $elm$core$Char$isDigit = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 57) && (48 <= code);
};
var $elm$core$Char$isAlphaNum = function (_char) {
	return $elm$core$Char$isLower(_char) || ($elm$core$Char$isUpper(_char) || $elm$core$Char$isDigit(_char));
};
var $elm$core$List$reverse = function (list) {
	return A3($elm$core$List$foldl, $elm$core$List$cons, _List_Nil, list);
};
var $elm$core$String$uncons = _String_uncons;
var $elm$json$Json$Decode$errorOneOf = F2(
	function (i, error) {
		return '\n\n(' + ($elm$core$String$fromInt(i + 1) + (') ' + $elm$json$Json$Decode$indent(
			$elm$json$Json$Decode$errorToString(error))));
	});
var $elm$json$Json$Decode$errorToString = function (error) {
	return A2($elm$json$Json$Decode$errorToStringHelp, error, _List_Nil);
};
var $elm$json$Json$Decode$errorToStringHelp = F2(
	function (error, context) {
		errorToStringHelp:
		while (true) {
			switch (error.$) {
				case 'Field':
					var f = error.a;
					var err = error.b;
					var isSimple = function () {
						var _v1 = $elm$core$String$uncons(f);
						if (_v1.$ === 'Nothing') {
							return false;
						} else {
							var _v2 = _v1.a;
							var _char = _v2.a;
							var rest = _v2.b;
							return $elm$core$Char$isAlpha(_char) && A2($elm$core$String$all, $elm$core$Char$isAlphaNum, rest);
						}
					}();
					var fieldName = isSimple ? ('.' + f) : ('[\'' + (f + '\']'));
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, fieldName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'Index':
					var i = error.a;
					var err = error.b;
					var indexName = '[' + ($elm$core$String$fromInt(i) + ']');
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, indexName, context);
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
									$elm$core$String$join,
									'',
									$elm$core$List$reverse(context));
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
										$elm$core$String$join,
										'',
										$elm$core$List$reverse(context));
								}
							}();
							var introduction = starter + (' failed in the following ' + ($elm$core$String$fromInt(
								$elm$core$List$length(errors)) + ' ways:'));
							return A2(
								$elm$core$String$join,
								'\n\n',
								A2(
									$elm$core$List$cons,
									introduction,
									A2($elm$core$List$indexedMap, $elm$json$Json$Decode$errorOneOf, errors)));
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
								$elm$core$String$join,
								'',
								$elm$core$List$reverse(context)) + ':\n\n    ');
						}
					}();
					return introduction + ($elm$json$Json$Decode$indent(
						A2($elm$json$Json$Encode$encode, 4, json)) + ('\n\n' + msg));
			}
		}
	});
var $elm$core$Array$branchFactor = 32;
var $elm$core$Array$Array_elm_builtin = F4(
	function (a, b, c, d) {
		return {$: 'Array_elm_builtin', a: a, b: b, c: c, d: d};
	});
var $elm$core$Elm$JsArray$empty = _JsArray_empty;
var $elm$core$Basics$ceiling = _Basics_ceiling;
var $elm$core$Basics$fdiv = _Basics_fdiv;
var $elm$core$Basics$logBase = F2(
	function (base, number) {
		return _Basics_log(number) / _Basics_log(base);
	});
var $elm$core$Basics$toFloat = _Basics_toFloat;
var $elm$core$Array$shiftStep = $elm$core$Basics$ceiling(
	A2($elm$core$Basics$logBase, 2, $elm$core$Array$branchFactor));
var $elm$core$Array$empty = A4($elm$core$Array$Array_elm_builtin, 0, $elm$core$Array$shiftStep, $elm$core$Elm$JsArray$empty, $elm$core$Elm$JsArray$empty);
var $elm$core$Elm$JsArray$initialize = _JsArray_initialize;
var $elm$core$Array$Leaf = function (a) {
	return {$: 'Leaf', a: a};
};
var $elm$core$Basics$apL = F2(
	function (f, x) {
		return f(x);
	});
var $elm$core$Basics$apR = F2(
	function (x, f) {
		return f(x);
	});
var $elm$core$Basics$eq = _Utils_equal;
var $elm$core$Basics$floor = _Basics_floor;
var $elm$core$Elm$JsArray$length = _JsArray_length;
var $elm$core$Basics$gt = _Utils_gt;
var $elm$core$Basics$max = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) > 0) ? x : y;
	});
var $elm$core$Basics$mul = _Basics_mul;
var $elm$core$Array$SubTree = function (a) {
	return {$: 'SubTree', a: a};
};
var $elm$core$Elm$JsArray$initializeFromList = _JsArray_initializeFromList;
var $elm$core$Array$compressNodes = F2(
	function (nodes, acc) {
		compressNodes:
		while (true) {
			var _v0 = A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodes);
			var node = _v0.a;
			var remainingNodes = _v0.b;
			var newAcc = A2(
				$elm$core$List$cons,
				$elm$core$Array$SubTree(node),
				acc);
			if (!remainingNodes.b) {
				return $elm$core$List$reverse(newAcc);
			} else {
				var $temp$nodes = remainingNodes,
					$temp$acc = newAcc;
				nodes = $temp$nodes;
				acc = $temp$acc;
				continue compressNodes;
			}
		}
	});
var $elm$core$Tuple$first = function (_v0) {
	var x = _v0.a;
	return x;
};
var $elm$core$Array$treeFromBuilder = F2(
	function (nodeList, nodeListSize) {
		treeFromBuilder:
		while (true) {
			var newNodeSize = $elm$core$Basics$ceiling(nodeListSize / $elm$core$Array$branchFactor);
			if (newNodeSize === 1) {
				return A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodeList).a;
			} else {
				var $temp$nodeList = A2($elm$core$Array$compressNodes, nodeList, _List_Nil),
					$temp$nodeListSize = newNodeSize;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue treeFromBuilder;
			}
		}
	});
var $elm$core$Array$builderToArray = F2(
	function (reverseNodeList, builder) {
		if (!builder.nodeListSize) {
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.tail),
				$elm$core$Array$shiftStep,
				$elm$core$Elm$JsArray$empty,
				builder.tail);
		} else {
			var treeLen = builder.nodeListSize * $elm$core$Array$branchFactor;
			var depth = $elm$core$Basics$floor(
				A2($elm$core$Basics$logBase, $elm$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? $elm$core$List$reverse(builder.nodeList) : builder.nodeList;
			var tree = A2($elm$core$Array$treeFromBuilder, correctNodeList, builder.nodeListSize);
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.tail) + treeLen,
				A2($elm$core$Basics$max, 5, depth * $elm$core$Array$shiftStep),
				tree,
				builder.tail);
		}
	});
var $elm$core$Basics$idiv = _Basics_idiv;
var $elm$core$Basics$lt = _Utils_lt;
var $elm$core$Array$initializeHelp = F5(
	function (fn, fromIndex, len, nodeList, tail) {
		initializeHelp:
		while (true) {
			if (fromIndex < 0) {
				return A2(
					$elm$core$Array$builderToArray,
					false,
					{nodeList: nodeList, nodeListSize: (len / $elm$core$Array$branchFactor) | 0, tail: tail});
			} else {
				var leaf = $elm$core$Array$Leaf(
					A3($elm$core$Elm$JsArray$initialize, $elm$core$Array$branchFactor, fromIndex, fn));
				var $temp$fn = fn,
					$temp$fromIndex = fromIndex - $elm$core$Array$branchFactor,
					$temp$len = len,
					$temp$nodeList = A2($elm$core$List$cons, leaf, nodeList),
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
var $elm$core$Basics$remainderBy = _Basics_remainderBy;
var $elm$core$Array$initialize = F2(
	function (len, fn) {
		if (len <= 0) {
			return $elm$core$Array$empty;
		} else {
			var tailLen = len % $elm$core$Array$branchFactor;
			var tail = A3($elm$core$Elm$JsArray$initialize, tailLen, len - tailLen, fn);
			var initialFromIndex = (len - tailLen) - $elm$core$Array$branchFactor;
			return A5($elm$core$Array$initializeHelp, fn, initialFromIndex, len, _List_Nil, tail);
		}
	});
var $elm$core$Basics$True = {$: 'True'};
var $elm$core$Result$isOk = function (result) {
	if (result.$ === 'Ok') {
		return true;
	} else {
		return false;
	}
};
var $elm$json$Json$Decode$andThen = _Json_andThen;
var $elm$json$Json$Decode$map = _Json_map1;
var $elm$json$Json$Decode$map2 = _Json_map2;
var $elm$json$Json$Decode$succeed = _Json_succeed;
var $elm$virtual_dom$VirtualDom$toHandlerInt = function (handler) {
	switch (handler.$) {
		case 'Normal':
			return 0;
		case 'MayStopPropagation':
			return 1;
		case 'MayPreventDefault':
			return 2;
		default:
			return 3;
	}
};
var $elm$browser$Browser$External = function (a) {
	return {$: 'External', a: a};
};
var $elm$browser$Browser$Internal = function (a) {
	return {$: 'Internal', a: a};
};
var $elm$core$Basics$identity = function (x) {
	return x;
};
var $elm$browser$Browser$Dom$NotFound = function (a) {
	return {$: 'NotFound', a: a};
};
var $elm$url$Url$Http = {$: 'Http'};
var $elm$url$Url$Https = {$: 'Https'};
var $elm$url$Url$Url = F6(
	function (protocol, host, port_, path, query, fragment) {
		return {fragment: fragment, host: host, path: path, port_: port_, protocol: protocol, query: query};
	});
var $elm$core$String$contains = _String_contains;
var $elm$core$String$length = _String_length;
var $elm$core$String$slice = _String_slice;
var $elm$core$String$dropLeft = F2(
	function (n, string) {
		return (n < 1) ? string : A3(
			$elm$core$String$slice,
			n,
			$elm$core$String$length(string),
			string);
	});
var $elm$core$String$indexes = _String_indexes;
var $elm$core$String$isEmpty = function (string) {
	return string === '';
};
var $elm$core$String$left = F2(
	function (n, string) {
		return (n < 1) ? '' : A3($elm$core$String$slice, 0, n, string);
	});
var $elm$core$String$toInt = _String_toInt;
var $elm$url$Url$chompBeforePath = F5(
	function (protocol, path, params, frag, str) {
		if ($elm$core$String$isEmpty(str) || A2($elm$core$String$contains, '@', str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, ':', str);
			if (!_v0.b) {
				return $elm$core$Maybe$Just(
					A6($elm$url$Url$Url, protocol, str, $elm$core$Maybe$Nothing, path, params, frag));
			} else {
				if (!_v0.b.b) {
					var i = _v0.a;
					var _v1 = $elm$core$String$toInt(
						A2($elm$core$String$dropLeft, i + 1, str));
					if (_v1.$ === 'Nothing') {
						return $elm$core$Maybe$Nothing;
					} else {
						var port_ = _v1;
						return $elm$core$Maybe$Just(
							A6(
								$elm$url$Url$Url,
								protocol,
								A2($elm$core$String$left, i, str),
								port_,
								path,
								params,
								frag));
					}
				} else {
					return $elm$core$Maybe$Nothing;
				}
			}
		}
	});
var $elm$url$Url$chompBeforeQuery = F4(
	function (protocol, params, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '/', str);
			if (!_v0.b) {
				return A5($elm$url$Url$chompBeforePath, protocol, '/', params, frag, str);
			} else {
				var i = _v0.a;
				return A5(
					$elm$url$Url$chompBeforePath,
					protocol,
					A2($elm$core$String$dropLeft, i, str),
					params,
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompBeforeFragment = F3(
	function (protocol, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '?', str);
			if (!_v0.b) {
				return A4($elm$url$Url$chompBeforeQuery, protocol, $elm$core$Maybe$Nothing, frag, str);
			} else {
				var i = _v0.a;
				return A4(
					$elm$url$Url$chompBeforeQuery,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompAfterProtocol = F2(
	function (protocol, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '#', str);
			if (!_v0.b) {
				return A3($elm$url$Url$chompBeforeFragment, protocol, $elm$core$Maybe$Nothing, str);
			} else {
				var i = _v0.a;
				return A3(
					$elm$url$Url$chompBeforeFragment,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$core$String$startsWith = _String_startsWith;
var $elm$url$Url$fromString = function (str) {
	return A2($elm$core$String$startsWith, 'http://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		$elm$url$Url$Http,
		A2($elm$core$String$dropLeft, 7, str)) : (A2($elm$core$String$startsWith, 'https://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		$elm$url$Url$Https,
		A2($elm$core$String$dropLeft, 8, str)) : $elm$core$Maybe$Nothing);
};
var $elm$core$Basics$never = function (_v0) {
	never:
	while (true) {
		var nvr = _v0.a;
		var $temp$_v0 = nvr;
		_v0 = $temp$_v0;
		continue never;
	}
};
var $elm$core$Task$Perform = function (a) {
	return {$: 'Perform', a: a};
};
var $elm$core$Task$succeed = _Scheduler_succeed;
var $elm$core$Task$init = $elm$core$Task$succeed(_Utils_Tuple0);
var $elm$core$List$foldrHelper = F4(
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
							$elm$core$List$foldl,
							fn,
							acc,
							$elm$core$List$reverse(r4)) : A4($elm$core$List$foldrHelper, fn, acc, ctr + 1, r4);
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
var $elm$core$List$foldr = F3(
	function (fn, acc, ls) {
		return A4($elm$core$List$foldrHelper, fn, acc, 0, ls);
	});
var $elm$core$List$map = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, acc) {
					return A2(
						$elm$core$List$cons,
						f(x),
						acc);
				}),
			_List_Nil,
			xs);
	});
var $elm$core$Task$andThen = _Scheduler_andThen;
var $elm$core$Task$map = F2(
	function (func, taskA) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return $elm$core$Task$succeed(
					func(a));
			},
			taskA);
	});
var $elm$core$Task$map2 = F3(
	function (func, taskA, taskB) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return A2(
					$elm$core$Task$andThen,
					function (b) {
						return $elm$core$Task$succeed(
							A2(func, a, b));
					},
					taskB);
			},
			taskA);
	});
var $elm$core$Task$sequence = function (tasks) {
	return A3(
		$elm$core$List$foldr,
		$elm$core$Task$map2($elm$core$List$cons),
		$elm$core$Task$succeed(_List_Nil),
		tasks);
};
var $elm$core$Platform$sendToApp = _Platform_sendToApp;
var $elm$core$Task$spawnCmd = F2(
	function (router, _v0) {
		var task = _v0.a;
		return _Scheduler_spawn(
			A2(
				$elm$core$Task$andThen,
				$elm$core$Platform$sendToApp(router),
				task));
	});
var $elm$core$Task$onEffects = F3(
	function (router, commands, state) {
		return A2(
			$elm$core$Task$map,
			function (_v0) {
				return _Utils_Tuple0;
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$map,
					$elm$core$Task$spawnCmd(router),
					commands)));
	});
var $elm$core$Task$onSelfMsg = F3(
	function (_v0, _v1, _v2) {
		return $elm$core$Task$succeed(_Utils_Tuple0);
	});
var $elm$core$Task$cmdMap = F2(
	function (tagger, _v0) {
		var task = _v0.a;
		return $elm$core$Task$Perform(
			A2($elm$core$Task$map, tagger, task));
	});
_Platform_effectManagers['Task'] = _Platform_createManager($elm$core$Task$init, $elm$core$Task$onEffects, $elm$core$Task$onSelfMsg, $elm$core$Task$cmdMap);
var $elm$core$Task$command = _Platform_leaf('Task');
var $elm$core$Task$perform = F2(
	function (toMessage, task) {
		return $elm$core$Task$command(
			$elm$core$Task$Perform(
				A2($elm$core$Task$map, toMessage, task)));
	});
var $elm$browser$Browser$application = _Browser_application;
var $elm$json$Json$Decode$field = _Json_decodeField;
var $author$project$Model$DataFetched = function (a) {
	return {$: 'DataFetched', a: a};
};
var $author$project$Model$MeFetched = function (a) {
	return {$: 'MeFetched', a: a};
};
var $author$project$Model$SetCurrentZone = function (a) {
	return {$: 'SetCurrentZone', a: a};
};
var $elm$core$Platform$Cmd$batch = _Platform_batch;
var $author$project$Model$GlobalGraphPage = {$: 'GlobalGraphPage'};
var $author$project$Model$ImpactSort = {$: 'ImpactSort'};
var $elm$core$Dict$RBEmpty_elm_builtin = {$: 'RBEmpty_elm_builtin'};
var $elm$core$Dict$empty = $elm$core$Dict$RBEmpty_elm_builtin;
var $y0hy0h$ordered_containers$OrderedSet$OrderedSet = F2(
	function (a, b) {
		return {$: 'OrderedSet', a: a, b: b};
	});
var $y0hy0h$ordered_containers$OrderedSet$empty = A2($y0hy0h$ordered_containers$OrderedSet$OrderedSet, _List_Nil, $elm$core$Dict$empty);
var $elm$core$Set$Set_elm_builtin = function (a) {
	return {$: 'Set_elm_builtin', a: a};
};
var $elm$core$Set$empty = $elm$core$Set$Set_elm_builtin($elm$core$Dict$empty);
var $author$project$Drag$NotDragging = {$: 'NotDragging'};
var $author$project$Drag$init = $author$project$Drag$NotDragging;
var $elm$time$Time$Posix = function (a) {
	return {$: 'Posix', a: a};
};
var $elm$time$Time$millisToPosix = $elm$time$Time$Posix;
var $elm$time$Time$Zone = F2(
	function (a, b) {
		return {$: 'Zone', a: a, b: b};
	});
var $elm$time$Time$utc = A2($elm$time$Time$Zone, 0, _List_Nil);
var $author$project$Model$empty = function (key) {
	return {
		addingColumnNotes: $elm$core$Dict$empty,
		allLabels: $elm$core$Dict$empty,
		anticipatedCards: $elm$core$Set$empty,
		archive: _List_Nil,
		assignOnlyUsersDrag: $author$project$Drag$init,
		assignUserDrag: $author$project$Drag$init,
		assignableUsers: _List_Nil,
		baseGraphFilter: $elm$core$Maybe$Nothing,
		cardClosers: $elm$core$Dict$empty,
		cardEvents: $elm$core$Dict$empty,
		cardLabelOperations: $elm$core$Dict$empty,
		cardProjects: $elm$core$Dict$empty,
		cardRotations: $elm$core$Dict$empty,
		cardSearch: 'is:open ',
		cards: $elm$core$Dict$empty,
		cardsByMilestone: $elm$core$Dict$empty,
		colorLightnessCache: $elm$core$Dict$empty,
		columnCards: $elm$core$Dict$empty,
		currentTime: $elm$time$Time$millisToPosix(0),
		currentZone: $elm$time$Time$utc,
		dataIndex: 0,
		deletingCards: $elm$core$Set$empty,
		editingCardNotes: $elm$core$Dict$empty,
		graphFilters: _List_Nil,
		graphSort: $author$project$Model$ImpactSort,
		graphs: _List_Nil,
		highlightedCard: $elm$core$Maybe$Nothing,
		highlightedNode: $elm$core$Maybe$Nothing,
		idsByUrl: $elm$core$Dict$empty,
		inFlight: _List_Nil,
		issues: $elm$core$Dict$empty,
		key: key,
		labelSearch: '',
		labelToRepoToId: $elm$core$Dict$empty,
		lastPaired: $elm$core$Dict$empty,
		me: $elm$core$Maybe$Nothing,
		openPRsByRepo: $elm$core$Dict$empty,
		outUsers: $elm$core$Set$empty,
		page: $author$project$Model$GlobalGraphPage,
		pendingAssignments: $elm$core$Dict$empty,
		prReviewers: $elm$core$Dict$empty,
		progress: $elm$core$Dict$empty,
		projectDrag: $author$project$Drag$init,
		projectifyingCards: $elm$core$Set$empty,
		projects: $elm$core$Dict$empty,
		prs: $elm$core$Dict$empty,
		reassignUserDrag: $author$project$Drag$init,
		repoCommits: $elm$core$Dict$empty,
		repoLabels: $elm$core$Dict$empty,
		repoMilestones: $elm$core$Dict$empty,
		repoProjectTemplates: $elm$core$Dict$empty,
		repoProjects: $elm$core$Dict$empty,
		repoReleaseStatuses: $elm$core$Dict$empty,
		repoReleases: $elm$core$Dict$empty,
		repos: $elm$core$Dict$empty,
		reposByLabel: $elm$core$Dict$empty,
		reposByName: $elm$core$Dict$empty,
		selectedCards: $y0hy0h$ordered_containers$OrderedSet$empty,
		showArchivedCards: $elm$core$Set$empty,
		showLabelFilters: false,
		showLabelOperations: false,
		statefulGraphs: _List_Nil,
		suggestedLabels: _List_Nil
	};
};
var $elm$core$Basics$composeL = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var $elm$core$Task$onError = _Scheduler_onError;
var $elm$core$Task$attempt = F2(
	function (resultToMessage, task) {
		return $elm$core$Task$command(
			$elm$core$Task$Perform(
				A2(
					$elm$core$Task$onError,
					A2(
						$elm$core$Basics$composeL,
						A2($elm$core$Basics$composeL, $elm$core$Task$succeed, resultToMessage),
						$elm$core$Result$Err),
					A2(
						$elm$core$Task$andThen,
						A2(
							$elm$core$Basics$composeL,
							A2($elm$core$Basics$composeL, $elm$core$Task$succeed, resultToMessage),
							$elm$core$Result$Ok),
						task))));
	});
var $author$project$Backend$Data = F8(
	function (pairingUsers, repos, repoProjects, repoCommits, repoLabels, repoMilestones, repoReleases, columnCards) {
		return {columnCards: columnCards, pairingUsers: pairingUsers, repoCommits: repoCommits, repoLabels: repoLabels, repoMilestones: repoMilestones, repoProjects: repoProjects, repoReleases: repoReleases, repos: repos};
	});
var $elm_community$json_extra$Json$Decode$Extra$andMap = $elm$json$Json$Decode$map2($elm$core$Basics$apR);
var $author$project$Backend$ColumnCard = F4(
	function (id, isArchived, contentId, note) {
		return {contentId: contentId, id: id, isArchived: isArchived, note: note};
	});
var $elm$json$Json$Decode$bool = _Json_decodeBool;
var $elm$json$Json$Decode$oneOf = _Json_oneOf;
var $elm$json$Json$Decode$maybe = function (decoder) {
	return $elm$json$Json$Decode$oneOf(
		_List_fromArray(
			[
				A2($elm$json$Json$Decode$map, $elm$core$Maybe$Just, decoder),
				$elm$json$Json$Decode$succeed($elm$core$Maybe$Nothing)
			]));
};
var $elm$json$Json$Decode$string = _Json_decodeString;
var $author$project$Backend$decodeColumnCard = A2(
	$elm_community$json_extra$Json$Decode$Extra$andMap,
	$elm$json$Json$Decode$maybe(
		A2($elm$json$Json$Decode$field, 'note', $elm$json$Json$Decode$string)),
	A2(
		$elm_community$json_extra$Json$Decode$Extra$andMap,
		$elm$json$Json$Decode$maybe(
			A2($elm$json$Json$Decode$field, 'contentId', $elm$json$Json$Decode$string)),
		A2(
			$elm_community$json_extra$Json$Decode$Extra$andMap,
			A2($elm$json$Json$Decode$field, 'isArchived', $elm$json$Json$Decode$bool),
			A2(
				$elm_community$json_extra$Json$Decode$Extra$andMap,
				A2($elm$json$Json$Decode$field, 'id', $elm$json$Json$Decode$string),
				$elm$json$Json$Decode$succeed($author$project$Backend$ColumnCard)))));
var $elm$json$Json$Decode$list = _Json_decodeList;
var $author$project$Backend$decodeColumnCards = $elm$json$Json$Decode$list($author$project$Backend$decodeColumnCard);
var $author$project$Backend$CommitsSinceLastRelease = F2(
	function (lastRelease, commits) {
		return {commits: commits, lastRelease: lastRelease};
	});
var $author$project$GitHub$Commit = F8(
	function (url, sha, status, author, committer, authoredAt, committedAt, associatedPullRequests) {
		return {associatedPullRequests: associatedPullRequests, author: author, authoredAt: authoredAt, committedAt: committedAt, committer: committer, sha: sha, status: status, url: url};
	});
var $elm$json$Json$Decode$fail = _Json_fail;
var $elm$parser$Parser$Advanced$Bad = F2(
	function (a, b) {
		return {$: 'Bad', a: a, b: b};
	});
var $elm$parser$Parser$Advanced$Good = F3(
	function (a, b, c) {
		return {$: 'Good', a: a, b: b, c: c};
	});
var $elm$parser$Parser$Advanced$Parser = function (a) {
	return {$: 'Parser', a: a};
};
var $elm$parser$Parser$Advanced$andThen = F2(
	function (callback, _v0) {
		var parseA = _v0.a;
		return $elm$parser$Parser$Advanced$Parser(
			function (s0) {
				var _v1 = parseA(s0);
				if (_v1.$ === 'Bad') {
					var p = _v1.a;
					var x = _v1.b;
					return A2($elm$parser$Parser$Advanced$Bad, p, x);
				} else {
					var p1 = _v1.a;
					var a = _v1.b;
					var s1 = _v1.c;
					var _v2 = callback(a);
					var parseB = _v2.a;
					var _v3 = parseB(s1);
					if (_v3.$ === 'Bad') {
						var p2 = _v3.a;
						var x = _v3.b;
						return A2($elm$parser$Parser$Advanced$Bad, p1 || p2, x);
					} else {
						var p2 = _v3.a;
						var b = _v3.b;
						var s2 = _v3.c;
						return A3($elm$parser$Parser$Advanced$Good, p1 || p2, b, s2);
					}
				}
			});
	});
var $elm$parser$Parser$andThen = $elm$parser$Parser$Advanced$andThen;
var $elm$parser$Parser$ExpectingEnd = {$: 'ExpectingEnd'};
var $elm$parser$Parser$Advanced$AddRight = F2(
	function (a, b) {
		return {$: 'AddRight', a: a, b: b};
	});
var $elm$parser$Parser$Advanced$DeadEnd = F4(
	function (row, col, problem, contextStack) {
		return {col: col, contextStack: contextStack, problem: problem, row: row};
	});
var $elm$parser$Parser$Advanced$Empty = {$: 'Empty'};
var $elm$parser$Parser$Advanced$fromState = F2(
	function (s, x) {
		return A2(
			$elm$parser$Parser$Advanced$AddRight,
			$elm$parser$Parser$Advanced$Empty,
			A4($elm$parser$Parser$Advanced$DeadEnd, s.row, s.col, x, s.context));
	});
var $elm$parser$Parser$Advanced$end = function (x) {
	return $elm$parser$Parser$Advanced$Parser(
		function (s) {
			return _Utils_eq(
				$elm$core$String$length(s.src),
				s.offset) ? A3($elm$parser$Parser$Advanced$Good, false, _Utils_Tuple0, s) : A2(
				$elm$parser$Parser$Advanced$Bad,
				false,
				A2($elm$parser$Parser$Advanced$fromState, s, x));
		});
};
var $elm$parser$Parser$end = $elm$parser$Parser$Advanced$end($elm$parser$Parser$ExpectingEnd);
var $elm$parser$Parser$Advanced$isSubChar = _Parser_isSubChar;
var $elm$core$Basics$negate = function (n) {
	return -n;
};
var $elm$parser$Parser$Advanced$chompWhileHelp = F5(
	function (isGood, offset, row, col, s0) {
		chompWhileHelp:
		while (true) {
			var newOffset = A3($elm$parser$Parser$Advanced$isSubChar, isGood, offset, s0.src);
			if (_Utils_eq(newOffset, -1)) {
				return A3(
					$elm$parser$Parser$Advanced$Good,
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
var $elm$parser$Parser$Advanced$chompWhile = function (isGood) {
	return $elm$parser$Parser$Advanced$Parser(
		function (s) {
			return A5($elm$parser$Parser$Advanced$chompWhileHelp, isGood, s.offset, s.row, s.col, s);
		});
};
var $elm$parser$Parser$chompWhile = $elm$parser$Parser$Advanced$chompWhile;
var $elm$core$Basics$always = F2(
	function (a, _v0) {
		return a;
	});
var $elm$parser$Parser$Advanced$mapChompedString = F2(
	function (func, _v0) {
		var parse = _v0.a;
		return $elm$parser$Parser$Advanced$Parser(
			function (s0) {
				var _v1 = parse(s0);
				if (_v1.$ === 'Bad') {
					var p = _v1.a;
					var x = _v1.b;
					return A2($elm$parser$Parser$Advanced$Bad, p, x);
				} else {
					var p = _v1.a;
					var a = _v1.b;
					var s1 = _v1.c;
					return A3(
						$elm$parser$Parser$Advanced$Good,
						p,
						A2(
							func,
							A3($elm$core$String$slice, s0.offset, s1.offset, s0.src),
							a),
						s1);
				}
			});
	});
var $elm$parser$Parser$Advanced$getChompedString = function (parser) {
	return A2($elm$parser$Parser$Advanced$mapChompedString, $elm$core$Basics$always, parser);
};
var $elm$parser$Parser$getChompedString = $elm$parser$Parser$Advanced$getChompedString;
var $elm$parser$Parser$Problem = function (a) {
	return {$: 'Problem', a: a};
};
var $elm$parser$Parser$Advanced$problem = function (x) {
	return $elm$parser$Parser$Advanced$Parser(
		function (s) {
			return A2(
				$elm$parser$Parser$Advanced$Bad,
				false,
				A2($elm$parser$Parser$Advanced$fromState, s, x));
		});
};
var $elm$parser$Parser$problem = function (msg) {
	return $elm$parser$Parser$Advanced$problem(
		$elm$parser$Parser$Problem(msg));
};
var $elm$core$Basics$round = _Basics_round;
var $elm$parser$Parser$Advanced$succeed = function (a) {
	return $elm$parser$Parser$Advanced$Parser(
		function (s) {
			return A3($elm$parser$Parser$Advanced$Good, false, a, s);
		});
};
var $elm$parser$Parser$succeed = $elm$parser$Parser$Advanced$succeed;
var $elm$core$String$toFloat = _String_toFloat;
var $rtfeldman$elm_iso8601_date_strings$Iso8601$fractionsOfASecondInMs = A2(
	$elm$parser$Parser$andThen,
	function (str) {
		if ($elm$core$String$length(str) <= 9) {
			var _v0 = $elm$core$String$toFloat('0.' + str);
			if (_v0.$ === 'Just') {
				var floatVal = _v0.a;
				return $elm$parser$Parser$succeed(
					$elm$core$Basics$round(floatVal * 1000));
			} else {
				return $elm$parser$Parser$problem('Invalid float: \"' + (str + '\"'));
			}
		} else {
			return $elm$parser$Parser$problem(
				'Expected at most 9 digits, but got ' + $elm$core$String$fromInt(
					$elm$core$String$length(str)));
		}
	},
	$elm$parser$Parser$getChompedString(
		$elm$parser$Parser$chompWhile($elm$core$Char$isDigit)));
var $rtfeldman$elm_iso8601_date_strings$Iso8601$fromParts = F6(
	function (monthYearDayMs, hour, minute, second, ms, utcOffsetMinutes) {
		return $elm$time$Time$millisToPosix((((monthYearDayMs + (((hour * 60) * 60) * 1000)) + (((minute - utcOffsetMinutes) * 60) * 1000)) + (second * 1000)) + ms);
	});
var $elm$parser$Parser$Advanced$map2 = F3(
	function (func, _v0, _v1) {
		var parseA = _v0.a;
		var parseB = _v1.a;
		return $elm$parser$Parser$Advanced$Parser(
			function (s0) {
				var _v2 = parseA(s0);
				if (_v2.$ === 'Bad') {
					var p = _v2.a;
					var x = _v2.b;
					return A2($elm$parser$Parser$Advanced$Bad, p, x);
				} else {
					var p1 = _v2.a;
					var a = _v2.b;
					var s1 = _v2.c;
					var _v3 = parseB(s1);
					if (_v3.$ === 'Bad') {
						var p2 = _v3.a;
						var x = _v3.b;
						return A2($elm$parser$Parser$Advanced$Bad, p1 || p2, x);
					} else {
						var p2 = _v3.a;
						var b = _v3.b;
						var s2 = _v3.c;
						return A3(
							$elm$parser$Parser$Advanced$Good,
							p1 || p2,
							A2(func, a, b),
							s2);
					}
				}
			});
	});
var $elm$parser$Parser$Advanced$ignorer = F2(
	function (keepParser, ignoreParser) {
		return A3($elm$parser$Parser$Advanced$map2, $elm$core$Basics$always, keepParser, ignoreParser);
	});
var $elm$parser$Parser$ignorer = $elm$parser$Parser$Advanced$ignorer;
var $elm$parser$Parser$Advanced$keeper = F2(
	function (parseFunc, parseArg) {
		return A3($elm$parser$Parser$Advanced$map2, $elm$core$Basics$apL, parseFunc, parseArg);
	});
var $elm$parser$Parser$keeper = $elm$parser$Parser$Advanced$keeper;
var $elm$parser$Parser$Advanced$map = F2(
	function (func, _v0) {
		var parse = _v0.a;
		return $elm$parser$Parser$Advanced$Parser(
			function (s0) {
				var _v1 = parse(s0);
				if (_v1.$ === 'Good') {
					var p = _v1.a;
					var a = _v1.b;
					var s1 = _v1.c;
					return A3(
						$elm$parser$Parser$Advanced$Good,
						p,
						func(a),
						s1);
				} else {
					var p = _v1.a;
					var x = _v1.b;
					return A2($elm$parser$Parser$Advanced$Bad, p, x);
				}
			});
	});
var $elm$parser$Parser$map = $elm$parser$Parser$Advanced$map;
var $rtfeldman$elm_iso8601_date_strings$Iso8601$paddedInt = function (quantity) {
	return A2(
		$elm$parser$Parser$andThen,
		function (str) {
			if (_Utils_eq(
				$elm$core$String$length(str),
				quantity)) {
				var _v0 = $elm$core$String$toInt(str);
				if (_v0.$ === 'Just') {
					var intVal = _v0.a;
					return $elm$parser$Parser$succeed(intVal);
				} else {
					return $elm$parser$Parser$problem('Invalid integer: \"' + (str + '\"'));
				}
			} else {
				return $elm$parser$Parser$problem(
					'Expected ' + ($elm$core$String$fromInt(quantity) + (' digits, but got ' + $elm$core$String$fromInt(
						$elm$core$String$length(str)))));
			}
		},
		$elm$parser$Parser$getChompedString(
			$elm$parser$Parser$chompWhile($elm$core$Char$isDigit)));
};
var $elm$parser$Parser$ExpectingSymbol = function (a) {
	return {$: 'ExpectingSymbol', a: a};
};
var $elm$parser$Parser$Advanced$Token = F2(
	function (a, b) {
		return {$: 'Token', a: a, b: b};
	});
var $elm$parser$Parser$Advanced$isSubString = _Parser_isSubString;
var $elm$core$Basics$not = _Basics_not;
var $elm$parser$Parser$Advanced$token = function (_v0) {
	var str = _v0.a;
	var expecting = _v0.b;
	var progress = !$elm$core$String$isEmpty(str);
	return $elm$parser$Parser$Advanced$Parser(
		function (s) {
			var _v1 = A5($elm$parser$Parser$Advanced$isSubString, str, s.offset, s.row, s.col, s.src);
			var newOffset = _v1.a;
			var newRow = _v1.b;
			var newCol = _v1.c;
			return _Utils_eq(newOffset, -1) ? A2(
				$elm$parser$Parser$Advanced$Bad,
				false,
				A2($elm$parser$Parser$Advanced$fromState, s, expecting)) : A3(
				$elm$parser$Parser$Advanced$Good,
				progress,
				_Utils_Tuple0,
				{col: newCol, context: s.context, indent: s.indent, offset: newOffset, row: newRow, src: s.src});
		});
};
var $elm$parser$Parser$Advanced$symbol = $elm$parser$Parser$Advanced$token;
var $elm$parser$Parser$symbol = function (str) {
	return $elm$parser$Parser$Advanced$symbol(
		A2(
			$elm$parser$Parser$Advanced$Token,
			str,
			$elm$parser$Parser$ExpectingSymbol(str)));
};
var $rtfeldman$elm_iso8601_date_strings$Iso8601$epochYear = 1970;
var $rtfeldman$elm_iso8601_date_strings$Iso8601$invalidDay = function (day) {
	return $elm$parser$Parser$problem(
		'Invalid day: ' + $elm$core$String$fromInt(day));
};
var $elm$core$Basics$modBy = _Basics_modBy;
var $elm$core$Basics$neq = _Utils_notEqual;
var $rtfeldman$elm_iso8601_date_strings$Iso8601$isLeapYear = function (year) {
	return (!A2($elm$core$Basics$modBy, 4, year)) && ((!(!A2($elm$core$Basics$modBy, 100, year))) || (!A2($elm$core$Basics$modBy, 400, year)));
};
var $rtfeldman$elm_iso8601_date_strings$Iso8601$leapYearsBefore = function (y1) {
	var y = y1 - 1;
	return (((y / 4) | 0) - ((y / 100) | 0)) + ((y / 400) | 0);
};
var $rtfeldman$elm_iso8601_date_strings$Iso8601$msPerDay = 86400000;
var $rtfeldman$elm_iso8601_date_strings$Iso8601$msPerYear = 31536000000;
var $rtfeldman$elm_iso8601_date_strings$Iso8601$yearMonthDay = function (_v0) {
	var year = _v0.a;
	var month = _v0.b;
	var dayInMonth = _v0.c;
	if (dayInMonth < 0) {
		return $rtfeldman$elm_iso8601_date_strings$Iso8601$invalidDay(dayInMonth);
	} else {
		var succeedWith = function (extraMs) {
			var yearMs = $rtfeldman$elm_iso8601_date_strings$Iso8601$msPerYear * (year - $rtfeldman$elm_iso8601_date_strings$Iso8601$epochYear);
			var days = ((month < 3) || (!$rtfeldman$elm_iso8601_date_strings$Iso8601$isLeapYear(year))) ? (dayInMonth - 1) : dayInMonth;
			var dayMs = $rtfeldman$elm_iso8601_date_strings$Iso8601$msPerDay * (days + ($rtfeldman$elm_iso8601_date_strings$Iso8601$leapYearsBefore(year) - $rtfeldman$elm_iso8601_date_strings$Iso8601$leapYearsBefore($rtfeldman$elm_iso8601_date_strings$Iso8601$epochYear)));
			return $elm$parser$Parser$succeed((extraMs + yearMs) + dayMs);
		};
		switch (month) {
			case 1:
				return (dayInMonth > 31) ? $rtfeldman$elm_iso8601_date_strings$Iso8601$invalidDay(dayInMonth) : succeedWith(0);
			case 2:
				return ((dayInMonth > 29) || ((dayInMonth === 29) && (!$rtfeldman$elm_iso8601_date_strings$Iso8601$isLeapYear(year)))) ? $rtfeldman$elm_iso8601_date_strings$Iso8601$invalidDay(dayInMonth) : succeedWith(2678400000);
			case 3:
				return (dayInMonth > 31) ? $rtfeldman$elm_iso8601_date_strings$Iso8601$invalidDay(dayInMonth) : succeedWith(5097600000);
			case 4:
				return (dayInMonth > 30) ? $rtfeldman$elm_iso8601_date_strings$Iso8601$invalidDay(dayInMonth) : succeedWith(7776000000);
			case 5:
				return (dayInMonth > 31) ? $rtfeldman$elm_iso8601_date_strings$Iso8601$invalidDay(dayInMonth) : succeedWith(10368000000);
			case 6:
				return (dayInMonth > 30) ? $rtfeldman$elm_iso8601_date_strings$Iso8601$invalidDay(dayInMonth) : succeedWith(13046400000);
			case 7:
				return (dayInMonth > 31) ? $rtfeldman$elm_iso8601_date_strings$Iso8601$invalidDay(dayInMonth) : succeedWith(15638400000);
			case 8:
				return (dayInMonth > 31) ? $rtfeldman$elm_iso8601_date_strings$Iso8601$invalidDay(dayInMonth) : succeedWith(18316800000);
			case 9:
				return (dayInMonth > 30) ? $rtfeldman$elm_iso8601_date_strings$Iso8601$invalidDay(dayInMonth) : succeedWith(20995200000);
			case 10:
				return (dayInMonth > 31) ? $rtfeldman$elm_iso8601_date_strings$Iso8601$invalidDay(dayInMonth) : succeedWith(23587200000);
			case 11:
				return (dayInMonth > 30) ? $rtfeldman$elm_iso8601_date_strings$Iso8601$invalidDay(dayInMonth) : succeedWith(26265600000);
			case 12:
				return (dayInMonth > 31) ? $rtfeldman$elm_iso8601_date_strings$Iso8601$invalidDay(dayInMonth) : succeedWith(28857600000);
			default:
				return $elm$parser$Parser$problem(
					'Invalid month: \"' + ($elm$core$String$fromInt(month) + '\"'));
		}
	}
};
var $rtfeldman$elm_iso8601_date_strings$Iso8601$monthYearDayInMs = A2(
	$elm$parser$Parser$andThen,
	$rtfeldman$elm_iso8601_date_strings$Iso8601$yearMonthDay,
	A2(
		$elm$parser$Parser$keeper,
		A2(
			$elm$parser$Parser$keeper,
			A2(
				$elm$parser$Parser$keeper,
				$elm$parser$Parser$succeed(
					F3(
						function (year, month, day) {
							return _Utils_Tuple3(year, month, day);
						})),
				A2(
					$elm$parser$Parser$ignorer,
					$rtfeldman$elm_iso8601_date_strings$Iso8601$paddedInt(4),
					$elm$parser$Parser$symbol('-'))),
			A2(
				$elm$parser$Parser$ignorer,
				$rtfeldman$elm_iso8601_date_strings$Iso8601$paddedInt(2),
				$elm$parser$Parser$symbol('-'))),
		$rtfeldman$elm_iso8601_date_strings$Iso8601$paddedInt(2)));
var $elm$parser$Parser$Advanced$Append = F2(
	function (a, b) {
		return {$: 'Append', a: a, b: b};
	});
var $elm$parser$Parser$Advanced$oneOfHelp = F3(
	function (s0, bag, parsers) {
		oneOfHelp:
		while (true) {
			if (!parsers.b) {
				return A2($elm$parser$Parser$Advanced$Bad, false, bag);
			} else {
				var parse = parsers.a.a;
				var remainingParsers = parsers.b;
				var _v1 = parse(s0);
				if (_v1.$ === 'Good') {
					var step = _v1;
					return step;
				} else {
					var step = _v1;
					var p = step.a;
					var x = step.b;
					if (p) {
						return step;
					} else {
						var $temp$s0 = s0,
							$temp$bag = A2($elm$parser$Parser$Advanced$Append, bag, x),
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
var $elm$parser$Parser$Advanced$oneOf = function (parsers) {
	return $elm$parser$Parser$Advanced$Parser(
		function (s) {
			return A3($elm$parser$Parser$Advanced$oneOfHelp, s, $elm$parser$Parser$Advanced$Empty, parsers);
		});
};
var $elm$parser$Parser$oneOf = $elm$parser$Parser$Advanced$oneOf;
var $rtfeldman$elm_iso8601_date_strings$Iso8601$utcOffsetMinutesFromParts = F3(
	function (multiplier, hours, minutes) {
		return multiplier * ((hours * 60) + minutes);
	});
var $rtfeldman$elm_iso8601_date_strings$Iso8601$iso8601 = A2(
	$elm$parser$Parser$andThen,
	function (datePart) {
		return $elm$parser$Parser$oneOf(
			_List_fromArray(
				[
					A2(
					$elm$parser$Parser$keeper,
					A2(
						$elm$parser$Parser$keeper,
						A2(
							$elm$parser$Parser$keeper,
							A2(
								$elm$parser$Parser$keeper,
								A2(
									$elm$parser$Parser$keeper,
									A2(
										$elm$parser$Parser$ignorer,
										$elm$parser$Parser$succeed(
											$rtfeldman$elm_iso8601_date_strings$Iso8601$fromParts(datePart)),
										$elm$parser$Parser$symbol('T')),
									A2(
										$elm$parser$Parser$ignorer,
										$rtfeldman$elm_iso8601_date_strings$Iso8601$paddedInt(2),
										$elm$parser$Parser$symbol(':'))),
								A2(
									$elm$parser$Parser$ignorer,
									$rtfeldman$elm_iso8601_date_strings$Iso8601$paddedInt(2),
									$elm$parser$Parser$symbol(':'))),
							$rtfeldman$elm_iso8601_date_strings$Iso8601$paddedInt(2)),
						$elm$parser$Parser$oneOf(
							_List_fromArray(
								[
									A2(
									$elm$parser$Parser$keeper,
									A2(
										$elm$parser$Parser$ignorer,
										$elm$parser$Parser$succeed($elm$core$Basics$identity),
										$elm$parser$Parser$symbol('.')),
									$rtfeldman$elm_iso8601_date_strings$Iso8601$fractionsOfASecondInMs),
									$elm$parser$Parser$succeed(0)
								]))),
					$elm$parser$Parser$oneOf(
						_List_fromArray(
							[
								A2(
								$elm$parser$Parser$map,
								function (_v0) {
									return 0;
								},
								$elm$parser$Parser$symbol('Z')),
								A2(
								$elm$parser$Parser$keeper,
								A2(
									$elm$parser$Parser$keeper,
									A2(
										$elm$parser$Parser$keeper,
										$elm$parser$Parser$succeed($rtfeldman$elm_iso8601_date_strings$Iso8601$utcOffsetMinutesFromParts),
										$elm$parser$Parser$oneOf(
											_List_fromArray(
												[
													A2(
													$elm$parser$Parser$map,
													function (_v1) {
														return 1;
													},
													$elm$parser$Parser$symbol('+')),
													A2(
													$elm$parser$Parser$map,
													function (_v2) {
														return -1;
													},
													$elm$parser$Parser$symbol('-'))
												]))),
									A2(
										$elm$parser$Parser$ignorer,
										$rtfeldman$elm_iso8601_date_strings$Iso8601$paddedInt(2),
										$elm$parser$Parser$symbol(':'))),
								$rtfeldman$elm_iso8601_date_strings$Iso8601$paddedInt(2))
							]))),
					A2(
					$elm$parser$Parser$ignorer,
					$elm$parser$Parser$succeed(
						A6($rtfeldman$elm_iso8601_date_strings$Iso8601$fromParts, datePart, 0, 0, 0, 0, 0)),
					$elm$parser$Parser$end)
				]));
	},
	$rtfeldman$elm_iso8601_date_strings$Iso8601$monthYearDayInMs);
var $elm$parser$Parser$DeadEnd = F3(
	function (row, col, problem) {
		return {col: col, problem: problem, row: row};
	});
var $elm$parser$Parser$problemToDeadEnd = function (p) {
	return A3($elm$parser$Parser$DeadEnd, p.row, p.col, p.problem);
};
var $elm$parser$Parser$Advanced$bagToList = F2(
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
						$temp$list = A2($elm$core$List$cons, x, list);
					bag = $temp$bag;
					list = $temp$list;
					continue bagToList;
				default:
					var bag1 = bag.a;
					var bag2 = bag.b;
					var $temp$bag = bag1,
						$temp$list = A2($elm$parser$Parser$Advanced$bagToList, bag2, list);
					bag = $temp$bag;
					list = $temp$list;
					continue bagToList;
			}
		}
	});
var $elm$parser$Parser$Advanced$run = F2(
	function (_v0, src) {
		var parse = _v0.a;
		var _v1 = parse(
			{col: 1, context: _List_Nil, indent: 1, offset: 0, row: 1, src: src});
		if (_v1.$ === 'Good') {
			var value = _v1.b;
			return $elm$core$Result$Ok(value);
		} else {
			var bag = _v1.b;
			return $elm$core$Result$Err(
				A2($elm$parser$Parser$Advanced$bagToList, bag, _List_Nil));
		}
	});
var $elm$parser$Parser$run = F2(
	function (parser, source) {
		var _v0 = A2($elm$parser$Parser$Advanced$run, parser, source);
		if (_v0.$ === 'Ok') {
			var a = _v0.a;
			return $elm$core$Result$Ok(a);
		} else {
			var problems = _v0.a;
			return $elm$core$Result$Err(
				A2($elm$core$List$map, $elm$parser$Parser$problemToDeadEnd, problems));
		}
	});
var $rtfeldman$elm_iso8601_date_strings$Iso8601$toTime = function (str) {
	return A2($elm$parser$Parser$run, $rtfeldman$elm_iso8601_date_strings$Iso8601$iso8601, str);
};
var $elm_community$json_extra$Json$Decode$Extra$datetime = A2(
	$elm$json$Json$Decode$andThen,
	function (dateString) {
		var _v0 = $rtfeldman$elm_iso8601_date_strings$Iso8601$toTime(dateString);
		if (_v0.$ === 'Ok') {
			var v = _v0.a;
			return $elm$json$Json$Decode$succeed(v);
		} else {
			return $elm$json$Json$Decode$fail('Expecting an ISO-8601 formatted date+time string');
		}
	},
	$elm$json$Json$Decode$string);
var $author$project$GitHub$GitActor = F4(
	function (email, name, avatar, user) {
		return {avatar: avatar, email: email, name: name, user: user};
	});
var $author$project$GitHub$User = F6(
	function (id, databaseId, url, login, avatar, name) {
		return {avatar: avatar, databaseId: databaseId, id: id, login: login, name: name, url: url};
	});
var $elm$json$Json$Decode$int = _Json_decodeInt;
var $author$project$GitHub$decodeUser = A2(
	$elm_community$json_extra$Json$Decode$Extra$andMap,
	$elm$json$Json$Decode$maybe(
		A2($elm$json$Json$Decode$field, 'name', $elm$json$Json$Decode$string)),
	A2(
		$elm_community$json_extra$Json$Decode$Extra$andMap,
		A2($elm$json$Json$Decode$field, 'avatar', $elm$json$Json$Decode$string),
		A2(
			$elm_community$json_extra$Json$Decode$Extra$andMap,
			A2($elm$json$Json$Decode$field, 'login', $elm$json$Json$Decode$string),
			A2(
				$elm_community$json_extra$Json$Decode$Extra$andMap,
				A2($elm$json$Json$Decode$field, 'url', $elm$json$Json$Decode$string),
				A2(
					$elm_community$json_extra$Json$Decode$Extra$andMap,
					A2($elm$json$Json$Decode$field, 'database_id', $elm$json$Json$Decode$int),
					A2(
						$elm_community$json_extra$Json$Decode$Extra$andMap,
						A2($elm$json$Json$Decode$field, 'id', $elm$json$Json$Decode$string),
						$elm$json$Json$Decode$succeed($author$project$GitHub$User)))))));
var $author$project$GitHub$decodeGitActor = A2(
	$elm_community$json_extra$Json$Decode$Extra$andMap,
	A2(
		$elm$json$Json$Decode$field,
		'user',
		$elm$json$Json$Decode$maybe($author$project$GitHub$decodeUser)),
	A2(
		$elm_community$json_extra$Json$Decode$Extra$andMap,
		A2($elm$json$Json$Decode$field, 'avatar', $elm$json$Json$Decode$string),
		A2(
			$elm_community$json_extra$Json$Decode$Extra$andMap,
			A2($elm$json$Json$Decode$field, 'name', $elm$json$Json$Decode$string),
			A2(
				$elm_community$json_extra$Json$Decode$Extra$andMap,
				A2($elm$json$Json$Decode$field, 'email', $elm$json$Json$Decode$string),
				$elm$json$Json$Decode$succeed($author$project$GitHub$GitActor)))));
var $author$project$GitHub$Status = F2(
	function (state, contexts) {
		return {contexts: contexts, state: state};
	});
var $author$project$GitHub$StatusContext = F4(
	function (state, context, targetUrl, creator) {
		return {context: context, creator: creator, state: state, targetUrl: targetUrl};
	});
var $author$project$GitHub$Actor = F3(
	function (url, login, avatar) {
		return {avatar: avatar, login: login, url: url};
	});
var $author$project$GitHub$decodeActor = A2(
	$elm_community$json_extra$Json$Decode$Extra$andMap,
	A2($elm$json$Json$Decode$field, 'avatar', $elm$json$Json$Decode$string),
	A2(
		$elm_community$json_extra$Json$Decode$Extra$andMap,
		A2($elm$json$Json$Decode$field, 'login', $elm$json$Json$Decode$string),
		A2(
			$elm_community$json_extra$Json$Decode$Extra$andMap,
			A2($elm$json$Json$Decode$field, 'url', $elm$json$Json$Decode$string),
			$elm$json$Json$Decode$succeed($author$project$GitHub$Actor))));
var $author$project$GitHub$customDecoder = F2(
	function (decoder, toResult) {
		return A2(
			$elm$json$Json$Decode$andThen,
			function (a) {
				var _v0 = toResult(a);
				if (_v0.$ === 'Ok') {
					var b = _v0.a;
					return $elm$json$Json$Decode$succeed(b);
				} else {
					var err = _v0.a;
					return $elm$json$Json$Decode$fail(err);
				}
			},
			decoder);
	});
var $elm$core$Dict$Black = {$: 'Black'};
var $elm$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {$: 'RBNode_elm_builtin', a: a, b: b, c: c, d: d, e: e};
	});
var $elm$core$Dict$Red = {$: 'Red'};
var $elm$core$Dict$balance = F5(
	function (color, key, value, left, right) {
		if ((right.$ === 'RBNode_elm_builtin') && (right.a.$ === 'Red')) {
			var _v1 = right.a;
			var rK = right.b;
			var rV = right.c;
			var rLeft = right.d;
			var rRight = right.e;
			if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) {
				var _v3 = left.a;
				var lK = left.b;
				var lV = left.c;
				var lLeft = left.d;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Red,
					key,
					value,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					rK,
					rV,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, key, value, left, rLeft),
					rRight);
			}
		} else {
			if ((((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) && (left.d.$ === 'RBNode_elm_builtin')) && (left.d.a.$ === 'Red')) {
				var _v5 = left.a;
				var lK = left.b;
				var lV = left.c;
				var _v6 = left.d;
				var _v7 = _v6.a;
				var llK = _v6.b;
				var llV = _v6.c;
				var llLeft = _v6.d;
				var llRight = _v6.e;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Red,
					lK,
					lV,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, llK, llV, llLeft, llRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, key, value, lRight, right));
			} else {
				return A5($elm$core$Dict$RBNode_elm_builtin, color, key, value, left, right);
			}
		}
	});
var $elm$core$Basics$compare = _Utils_compare;
var $elm$core$Dict$insertHelp = F3(
	function (key, value, dict) {
		if (dict.$ === 'RBEmpty_elm_builtin') {
			return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, key, value, $elm$core$Dict$RBEmpty_elm_builtin, $elm$core$Dict$RBEmpty_elm_builtin);
		} else {
			var nColor = dict.a;
			var nKey = dict.b;
			var nValue = dict.c;
			var nLeft = dict.d;
			var nRight = dict.e;
			var _v1 = A2($elm$core$Basics$compare, key, nKey);
			switch (_v1.$) {
				case 'LT':
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						A3($elm$core$Dict$insertHelp, key, value, nLeft),
						nRight);
				case 'EQ':
					return A5($elm$core$Dict$RBNode_elm_builtin, nColor, nKey, value, nLeft, nRight);
				default:
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						nLeft,
						A3($elm$core$Dict$insertHelp, key, value, nRight));
			}
		}
	});
var $elm$core$Dict$insert = F3(
	function (key, value, dict) {
		var _v0 = A3($elm$core$Dict$insertHelp, key, value, dict);
		if ((_v0.$ === 'RBNode_elm_builtin') && (_v0.a.$ === 'Red')) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $elm$core$Dict$fromList = function (assocs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, dict) {
				var key = _v0.a;
				var value = _v0.b;
				return A3($elm$core$Dict$insert, key, value, dict);
			}),
		$elm$core$Dict$empty,
		assocs);
};
var $elm$core$Dict$get = F2(
	function (targetKey, dict) {
		get:
		while (true) {
			if (dict.$ === 'RBEmpty_elm_builtin') {
				return $elm$core$Maybe$Nothing;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var _v1 = A2($elm$core$Basics$compare, targetKey, key);
				switch (_v1.$) {
					case 'LT':
						var $temp$targetKey = targetKey,
							$temp$dict = left;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
					case 'EQ':
						return $elm$core$Maybe$Just(value);
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
var $author$project$GitHub$StatusStateError = {$: 'StatusStateError'};
var $author$project$GitHub$StatusStateExpected = {$: 'StatusStateExpected'};
var $author$project$GitHub$StatusStateFailure = {$: 'StatusStateFailure'};
var $author$project$GitHub$StatusStatePending = {$: 'StatusStatePending'};
var $author$project$GitHub$StatusStateSuccess = {$: 'StatusStateSuccess'};
var $author$project$GitHub$statusStates = _List_fromArray(
	[
		_Utils_Tuple2('EXPECTED', $author$project$GitHub$StatusStateExpected),
		_Utils_Tuple2('ERROR', $author$project$GitHub$StatusStateError),
		_Utils_Tuple2('FAILURE', $author$project$GitHub$StatusStateFailure),
		_Utils_Tuple2('PENDING', $author$project$GitHub$StatusStatePending),
		_Utils_Tuple2('SUCCESS', $author$project$GitHub$StatusStateSuccess)
	]);
var $author$project$GitHub$decodeStatusState = function () {
	var decodeToType = function (string) {
		var _v0 = A2(
			$elm$core$Dict$get,
			string,
			$elm$core$Dict$fromList($author$project$GitHub$statusStates));
		if (_v0.$ === 'Just') {
			var type_ = _v0.a;
			return $elm$core$Result$Ok(type_);
		} else {
			return $elm$core$Result$Err('Not valid pattern for decoder to StatusState. Pattern: ' + string);
		}
	};
	return A2($author$project$GitHub$customDecoder, $elm$json$Json$Decode$string, decodeToType);
}();
var $author$project$GitHub$decodeStatusContext = A2(
	$elm_community$json_extra$Json$Decode$Extra$andMap,
	A2($elm$json$Json$Decode$field, 'creator', $author$project$GitHub$decodeActor),
	A2(
		$elm_community$json_extra$Json$Decode$Extra$andMap,
		A2(
			$elm$json$Json$Decode$field,
			'target_url',
			$elm$json$Json$Decode$maybe($elm$json$Json$Decode$string)),
		A2(
			$elm_community$json_extra$Json$Decode$Extra$andMap,
			A2($elm$json$Json$Decode$field, 'context', $elm$json$Json$Decode$string),
			A2(
				$elm_community$json_extra$Json$Decode$Extra$andMap,
				A2($elm$json$Json$Decode$field, 'state', $author$project$GitHub$decodeStatusState),
				$elm$json$Json$Decode$succeed($author$project$GitHub$StatusContext)))));
var $author$project$GitHub$decodeStatus = A2(
	$elm_community$json_extra$Json$Decode$Extra$andMap,
	A2(
		$elm$json$Json$Decode$field,
		'contexts',
		$elm$json$Json$Decode$list($author$project$GitHub$decodeStatusContext)),
	A2(
		$elm_community$json_extra$Json$Decode$Extra$andMap,
		A2($elm$json$Json$Decode$field, 'state', $author$project$GitHub$decodeStatusState),
		$elm$json$Json$Decode$succeed($author$project$GitHub$Status)));
var $author$project$GitHub$decodeCommit = A2(
	$elm_community$json_extra$Json$Decode$Extra$andMap,
	A2(
		$elm$json$Json$Decode$field,
		'associated_pull_requests',
		$elm$json$Json$Decode$list($elm$json$Json$Decode$string)),
	A2(
		$elm_community$json_extra$Json$Decode$Extra$andMap,
		A2($elm$json$Json$Decode$field, 'committed_at', $elm_community$json_extra$Json$Decode$Extra$datetime),
		A2(
			$elm_community$json_extra$Json$Decode$Extra$andMap,
			A2($elm$json$Json$Decode$field, 'authored_at', $elm_community$json_extra$Json$Decode$Extra$datetime),
			A2(
				$elm_community$json_extra$Json$Decode$Extra$andMap,
				A2(
					$elm$json$Json$Decode$field,
					'committer',
					$elm$json$Json$Decode$maybe($author$project$GitHub$decodeGitActor)),
				A2(
					$elm_community$json_extra$Json$Decode$Extra$andMap,
					A2(
						$elm$json$Json$Decode$field,
						'author',
						$elm$json$Json$Decode$maybe($author$project$GitHub$decodeGitActor)),
					A2(
						$elm_community$json_extra$Json$Decode$Extra$andMap,
						A2(
							$elm$json$Json$Decode$field,
							'status',
							$elm$json$Json$Decode$maybe($author$project$GitHub$decodeStatus)),
						A2(
							$elm_community$json_extra$Json$Decode$Extra$andMap,
							A2($elm$json$Json$Decode$field, 'sha', $elm$json$Json$Decode$string),
							A2(
								$elm_community$json_extra$Json$Decode$Extra$andMap,
								A2($elm$json$Json$Decode$field, 'url', $elm$json$Json$Decode$string),
								$elm$json$Json$Decode$succeed($author$project$GitHub$Commit)))))))));
var $author$project$GitHub$Release = F5(
	function (id, url, createdAt, name, tag) {
		return {createdAt: createdAt, id: id, name: name, tag: tag, url: url};
	});
var $author$project$GitHub$Tag = F2(
	function (name, target) {
		return {name: name, target: target};
	});
var $author$project$GitHub$GitObject = F2(
	function (url, oid) {
		return {oid: oid, url: url};
	});
var $author$project$GitHub$decodeGitObject = A2(
	$elm_community$json_extra$Json$Decode$Extra$andMap,
	A2($elm$json$Json$Decode$field, 'oid', $elm$json$Json$Decode$string),
	A2(
		$elm_community$json_extra$Json$Decode$Extra$andMap,
		A2($elm$json$Json$Decode$field, 'url', $elm$json$Json$Decode$string),
		$elm$json$Json$Decode$succeed($author$project$GitHub$GitObject)));
var $author$project$GitHub$decodeTag = A2(
	$elm_community$json_extra$Json$Decode$Extra$andMap,
	A2($elm$json$Json$Decode$field, 'target', $author$project$GitHub$decodeGitObject),
	A2(
		$elm_community$json_extra$Json$Decode$Extra$andMap,
		A2($elm$json$Json$Decode$field, 'name', $elm$json$Json$Decode$string),
		$elm$json$Json$Decode$succeed($author$project$GitHub$Tag)));
var $author$project$GitHub$decodeRelease = A2(
	$elm_community$json_extra$Json$Decode$Extra$andMap,
	A2(
		$elm$json$Json$Decode$field,
		'tag',
		$elm$json$Json$Decode$maybe($author$project$GitHub$decodeTag)),
	A2(
		$elm_community$json_extra$Json$Decode$Extra$andMap,
		A2(
			$elm$json$Json$Decode$field,
			'name',
			$elm$json$Json$Decode$maybe($elm$json$Json$Decode$string)),
		A2(
			$elm_community$json_extra$Json$Decode$Extra$andMap,
			A2($elm$json$Json$Decode$field, 'created_at', $elm_community$json_extra$Json$Decode$Extra$datetime),
			A2(
				$elm_community$json_extra$Json$Decode$Extra$andMap,
				A2($elm$json$Json$Decode$field, 'url', $elm$json$Json$Decode$string),
				A2(
					$elm_community$json_extra$Json$Decode$Extra$andMap,
					A2($elm$json$Json$Decode$field, 'id', $elm$json$Json$Decode$string),
					$elm$json$Json$Decode$succeed($author$project$GitHub$Release))))));
var $author$project$Backend$decodeCommitsSinceLastRelease = A2(
	$elm_community$json_extra$Json$Decode$Extra$andMap,
	A2(
		$elm$json$Json$Decode$field,
		'commits',
		$elm$json$Json$Decode$list($author$project$GitHub$decodeCommit)),
	A2(
		$elm_community$json_extra$Json$Decode$Extra$andMap,
		A2($elm$json$Json$Decode$field, 'lastRelease', $author$project$GitHub$decodeRelease),
		$elm$json$Json$Decode$succeed($author$project$Backend$CommitsSinceLastRelease)));
var $author$project$GitHub$Label = F3(
	function (id, name, color) {
		return {color: color, id: id, name: name};
	});
var $author$project$GitHub$decodeLabel = A2(
	$elm_community$json_extra$Json$Decode$Extra$andMap,
	A2($elm$json$Json$Decode$field, 'color', $elm$json$Json$Decode$string),
	A2(
		$elm_community$json_extra$Json$Decode$Extra$andMap,
		A2($elm$json$Json$Decode$field, 'name', $elm$json$Json$Decode$string),
		A2(
			$elm_community$json_extra$Json$Decode$Extra$andMap,
			A2($elm$json$Json$Decode$field, 'id', $elm$json$Json$Decode$string),
			$elm$json$Json$Decode$succeed($author$project$GitHub$Label))));
var $author$project$GitHub$Milestone = F6(
	function (id, number, title, state, description, dueOn) {
		return {description: description, dueOn: dueOn, id: id, number: number, state: state, title: title};
	});
var $author$project$GitHub$MilestoneStateClosed = {$: 'MilestoneStateClosed'};
var $author$project$GitHub$MilestoneStateOpen = {$: 'MilestoneStateOpen'};
var $author$project$GitHub$milestoneStates = _List_fromArray(
	[
		_Utils_Tuple2('OPEN', $author$project$GitHub$MilestoneStateOpen),
		_Utils_Tuple2('CLOSED', $author$project$GitHub$MilestoneStateClosed)
	]);
var $author$project$GitHub$decodeMilestoneState = function () {
	var decodeToType = function (string) {
		var _v0 = A2(
			$elm$core$Dict$get,
			string,
			$elm$core$Dict$fromList($author$project$GitHub$milestoneStates));
		if (_v0.$ === 'Just') {
			var type_ = _v0.a;
			return $elm$core$Result$Ok(type_);
		} else {
			return $elm$core$Result$Err('Not valid pattern for decoder to MilestoneState. Pattern: ' + string);
		}
	};
	return A2($author$project$GitHub$customDecoder, $elm$json$Json$Decode$string, decodeToType);
}();
var $author$project$GitHub$decodeMilestone = A2(
	$elm_community$json_extra$Json$Decode$Extra$andMap,
	A2(
		$elm$json$Json$Decode$field,
		'due_on',
		$elm$json$Json$Decode$maybe($elm_community$json_extra$Json$Decode$Extra$datetime)),
	A2(
		$elm_community$json_extra$Json$Decode$Extra$andMap,
		A2(
			$elm$json$Json$Decode$field,
			'description',
			$elm$json$Json$Decode$maybe($elm$json$Json$Decode$string)),
		A2(
			$elm_community$json_extra$Json$Decode$Extra$andMap,
			A2($elm$json$Json$Decode$field, 'state', $author$project$GitHub$decodeMilestoneState),
			A2(
				$elm_community$json_extra$Json$Decode$Extra$andMap,
				A2($elm$json$Json$Decode$field, 'title', $elm$json$Json$Decode$string),
				A2(
					$elm_community$json_extra$Json$Decode$Extra$andMap,
					A2($elm$json$Json$Decode$field, 'number', $elm$json$Json$Decode$int),
					A2(
						$elm_community$json_extra$Json$Decode$Extra$andMap,
						A2($elm$json$Json$Decode$field, 'id', $elm$json$Json$Decode$string),
						$elm$json$Json$Decode$succeed($author$project$GitHub$Milestone)))))));
var $author$project$GitHub$Project = F7(
	function (id, url, owner, name, number, body, columns) {
		return {body: body, columns: columns, id: id, name: name, number: number, owner: owner, url: url};
	});
var $author$project$GitHub$ProjectColumn = F4(
	function (id, name, purpose, databaseId) {
		return {databaseId: databaseId, id: id, name: name, purpose: purpose};
	});
var $author$project$GitHub$ProjectColumnPurposeDone = {$: 'ProjectColumnPurposeDone'};
var $author$project$GitHub$ProjectColumnPurposeInProgress = {$: 'ProjectColumnPurposeInProgress'};
var $author$project$GitHub$ProjectColumnPurposeToDo = {$: 'ProjectColumnPurposeToDo'};
var $author$project$GitHub$projectColumnPurposes = _List_fromArray(
	[
		_Utils_Tuple2('TODO', $author$project$GitHub$ProjectColumnPurposeToDo),
		_Utils_Tuple2('IN_PROGRESS', $author$project$GitHub$ProjectColumnPurposeInProgress),
		_Utils_Tuple2('DONE', $author$project$GitHub$ProjectColumnPurposeDone)
	]);
var $author$project$GitHub$decodeProjectColumnPurpose = function () {
	var decodeToType = function (string) {
		var _v0 = A2(
			$elm$core$Dict$get,
			string,
			$elm$core$Dict$fromList($author$project$GitHub$projectColumnPurposes));
		if (_v0.$ === 'Just') {
			var type_ = _v0.a;
			return $elm$core$Result$Ok(type_);
		} else {
			return $elm$core$Result$Err('Not valid pattern for decoder to ProjectColumnPurpose. Pattern: ' + string);
		}
	};
	return A2($author$project$GitHub$customDecoder, $elm$json$Json$Decode$string, decodeToType);
}();
var $author$project$GitHub$decodeProjectColumn = A2(
	$elm_community$json_extra$Json$Decode$Extra$andMap,
	A2($elm$json$Json$Decode$field, 'database_id', $elm$json$Json$Decode$int),
	A2(
		$elm_community$json_extra$Json$Decode$Extra$andMap,
		A2(
			$elm$json$Json$Decode$field,
			'purpose',
			$elm$json$Json$Decode$maybe($author$project$GitHub$decodeProjectColumnPurpose)),
		A2(
			$elm_community$json_extra$Json$Decode$Extra$andMap,
			A2($elm$json$Json$Decode$field, 'name', $elm$json$Json$Decode$string),
			A2(
				$elm_community$json_extra$Json$Decode$Extra$andMap,
				A2($elm$json$Json$Decode$field, 'id', $elm$json$Json$Decode$string),
				$elm$json$Json$Decode$succeed($author$project$GitHub$ProjectColumn)))));
var $author$project$GitHub$ProjectOwnerOrg = function (a) {
	return {$: 'ProjectOwnerOrg', a: a};
};
var $author$project$GitHub$ProjectOwnerRepo = function (a) {
	return {$: 'ProjectOwnerRepo', a: a};
};
var $author$project$GitHub$ProjectOwnerUser = function (a) {
	return {$: 'ProjectOwnerUser', a: a};
};
var $author$project$GitHub$decodeProjectOwner = $elm$json$Json$Decode$oneOf(
	_List_fromArray(
		[
			A2(
			$elm$json$Json$Decode$field,
			'repository_id',
			A2($elm$json$Json$Decode$map, $author$project$GitHub$ProjectOwnerRepo, $elm$json$Json$Decode$string)),
			A2(
			$elm$json$Json$Decode$field,
			'organization_id',
			A2($elm$json$Json$Decode$map, $author$project$GitHub$ProjectOwnerOrg, $elm$json$Json$Decode$string)),
			A2(
			$elm$json$Json$Decode$field,
			'user_id',
			A2($elm$json$Json$Decode$map, $author$project$GitHub$ProjectOwnerUser, $elm$json$Json$Decode$string))
		]));
var $author$project$GitHub$decodeProject = A2(
	$elm_community$json_extra$Json$Decode$Extra$andMap,
	A2(
		$elm$json$Json$Decode$field,
		'columns',
		$elm$json$Json$Decode$list($author$project$GitHub$decodeProjectColumn)),
	A2(
		$elm_community$json_extra$Json$Decode$Extra$andMap,
		A2($elm$json$Json$Decode$field, 'body', $elm$json$Json$Decode$string),
		A2(
			$elm_community$json_extra$Json$Decode$Extra$andMap,
			A2($elm$json$Json$Decode$field, 'number', $elm$json$Json$Decode$int),
			A2(
				$elm_community$json_extra$Json$Decode$Extra$andMap,
				A2($elm$json$Json$Decode$field, 'name', $elm$json$Json$Decode$string),
				A2(
					$elm_community$json_extra$Json$Decode$Extra$andMap,
					A2($elm$json$Json$Decode$field, 'owner', $author$project$GitHub$decodeProjectOwner),
					A2(
						$elm_community$json_extra$Json$Decode$Extra$andMap,
						A2($elm$json$Json$Decode$field, 'url', $elm$json$Json$Decode$string),
						A2(
							$elm_community$json_extra$Json$Decode$Extra$andMap,
							A2($elm$json$Json$Decode$field, 'id', $elm$json$Json$Decode$string),
							$elm$json$Json$Decode$succeed($author$project$GitHub$Project))))))));
var $author$project$GitHub$Repo = F5(
	function (id, url, owner, name, isArchived) {
		return {id: id, isArchived: isArchived, name: name, owner: owner, url: url};
	});
var $author$project$GitHub$decodeRepo = A2(
	$elm_community$json_extra$Json$Decode$Extra$andMap,
	A2($elm$json$Json$Decode$field, 'is_archived', $elm$json$Json$Decode$bool),
	A2(
		$elm_community$json_extra$Json$Decode$Extra$andMap,
		A2($elm$json$Json$Decode$field, 'name', $elm$json$Json$Decode$string),
		A2(
			$elm_community$json_extra$Json$Decode$Extra$andMap,
			A2($elm$json$Json$Decode$field, 'owner', $elm$json$Json$Decode$string),
			A2(
				$elm_community$json_extra$Json$Decode$Extra$andMap,
				A2($elm$json$Json$Decode$field, 'url', $elm$json$Json$Decode$string),
				A2(
					$elm_community$json_extra$Json$Decode$Extra$andMap,
					A2($elm$json$Json$Decode$field, 'id', $elm$json$Json$Decode$string),
					$elm$json$Json$Decode$succeed($author$project$GitHub$Repo))))));
var $elm$json$Json$Decode$keyValuePairs = _Json_decodeKeyValuePairs;
var $elm$json$Json$Decode$dict = function (decoder) {
	return A2(
		$elm$json$Json$Decode$map,
		$elm$core$Dict$fromList,
		$elm$json$Json$Decode$keyValuePairs(decoder));
};
var $author$project$Backend$decodeData = A2(
	$elm_community$json_extra$Json$Decode$Extra$andMap,
	A2(
		$elm$json$Json$Decode$field,
		'columnCards',
		$elm$json$Json$Decode$dict($author$project$Backend$decodeColumnCards)),
	A2(
		$elm_community$json_extra$Json$Decode$Extra$andMap,
		A2(
			$elm$json$Json$Decode$field,
			'repoReleases',
			$elm$json$Json$Decode$dict(
				$elm$json$Json$Decode$list($author$project$GitHub$decodeRelease))),
		A2(
			$elm_community$json_extra$Json$Decode$Extra$andMap,
			A2(
				$elm$json$Json$Decode$field,
				'repoMilestones',
				$elm$json$Json$Decode$dict(
					$elm$json$Json$Decode$list($author$project$GitHub$decodeMilestone))),
			A2(
				$elm_community$json_extra$Json$Decode$Extra$andMap,
				A2(
					$elm$json$Json$Decode$field,
					'repoLabels',
					$elm$json$Json$Decode$dict(
						$elm$json$Json$Decode$list($author$project$GitHub$decodeLabel))),
				A2(
					$elm_community$json_extra$Json$Decode$Extra$andMap,
					A2(
						$elm$json$Json$Decode$field,
						'repoCommits',
						$elm$json$Json$Decode$dict(
							$elm$json$Json$Decode$dict($author$project$Backend$decodeCommitsSinceLastRelease))),
					A2(
						$elm_community$json_extra$Json$Decode$Extra$andMap,
						A2(
							$elm$json$Json$Decode$field,
							'repoProjects',
							$elm$json$Json$Decode$dict(
								$elm$json$Json$Decode$list($author$project$GitHub$decodeProject))),
						A2(
							$elm_community$json_extra$Json$Decode$Extra$andMap,
							A2(
								$elm$json$Json$Decode$field,
								'repos',
								$elm$json$Json$Decode$dict($author$project$GitHub$decodeRepo)),
							A2(
								$elm_community$json_extra$Json$Decode$Extra$andMap,
								A2(
									$elm$json$Json$Decode$field,
									'pairingUsers',
									$elm$json$Json$Decode$list($author$project$GitHub$decodeUser)),
								$elm$json$Json$Decode$succeed($author$project$Backend$Data)))))))));
var $elm$core$Maybe$andThen = F2(
	function (callback, maybeValue) {
		if (maybeValue.$ === 'Just') {
			var value = maybeValue.a;
			return callback(value);
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $elm$json$Json$Decode$decodeString = _Json_runOnString;
var $elm$http$Http$BadPayload = F2(
	function (a, b) {
		return {$: 'BadPayload', a: a, b: b};
	});
var $elm$http$Http$BadStatus = function (a) {
	return {$: 'BadStatus', a: a};
};
var $elm$http$Http$BadUrl = function (a) {
	return {$: 'BadUrl', a: a};
};
var $elm$http$Http$Internal$FormDataBody = function (a) {
	return {$: 'FormDataBody', a: a};
};
var $elm$http$Http$NetworkError = {$: 'NetworkError'};
var $elm$http$Http$Timeout = {$: 'Timeout'};
var $elm$core$Maybe$isJust = function (maybe) {
	if (maybe.$ === 'Just') {
		return true;
	} else {
		return false;
	}
};
var $elm$http$Http$Internal$isStringBody = function (body) {
	if (body.$ === 'StringBody') {
		return true;
	} else {
		return false;
	}
};
var $elm$core$Result$map = F2(
	function (func, ra) {
		if (ra.$ === 'Ok') {
			var a = ra.a;
			return $elm$core$Result$Ok(
				func(a));
		} else {
			var e = ra.a;
			return $elm$core$Result$Err(e);
		}
	});
var $elm$core$Dict$getMin = function (dict) {
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
var $elm$core$Dict$moveRedLeft = function (dict) {
	if (((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) && (dict.e.$ === 'RBNode_elm_builtin')) {
		if ((dict.e.d.$ === 'RBNode_elm_builtin') && (dict.e.d.a.$ === 'Red')) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v1 = dict.d;
			var lClr = _v1.a;
			var lK = _v1.b;
			var lV = _v1.c;
			var lLeft = _v1.d;
			var lRight = _v1.e;
			var _v2 = dict.e;
			var rClr = _v2.a;
			var rK = _v2.b;
			var rV = _v2.c;
			var rLeft = _v2.d;
			var _v3 = rLeft.a;
			var rlK = rLeft.b;
			var rlV = rLeft.c;
			var rlL = rLeft.d;
			var rlR = rLeft.e;
			var rRight = _v2.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				$elm$core$Dict$Red,
				rlK,
				rlV,
				A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					rlL),
				A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, rK, rV, rlR, rRight));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v4 = dict.d;
			var lClr = _v4.a;
			var lK = _v4.b;
			var lV = _v4.c;
			var lLeft = _v4.d;
			var lRight = _v4.e;
			var _v5 = dict.e;
			var rClr = _v5.a;
			var rK = _v5.b;
			var rV = _v5.c;
			var rLeft = _v5.d;
			var rRight = _v5.e;
			if (clr.$ === 'Black') {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var $elm$core$Dict$moveRedRight = function (dict) {
	if (((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) && (dict.e.$ === 'RBNode_elm_builtin')) {
		if ((dict.d.d.$ === 'RBNode_elm_builtin') && (dict.d.d.a.$ === 'Red')) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v1 = dict.d;
			var lClr = _v1.a;
			var lK = _v1.b;
			var lV = _v1.c;
			var _v2 = _v1.d;
			var _v3 = _v2.a;
			var llK = _v2.b;
			var llV = _v2.c;
			var llLeft = _v2.d;
			var llRight = _v2.e;
			var lRight = _v1.e;
			var _v4 = dict.e;
			var rClr = _v4.a;
			var rK = _v4.b;
			var rV = _v4.c;
			var rLeft = _v4.d;
			var rRight = _v4.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				$elm$core$Dict$Red,
				lK,
				lV,
				A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, llK, llV, llLeft, llRight),
				A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					lRight,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight)));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v5 = dict.d;
			var lClr = _v5.a;
			var lK = _v5.b;
			var lV = _v5.c;
			var lLeft = _v5.d;
			var lRight = _v5.e;
			var _v6 = dict.e;
			var rClr = _v6.a;
			var rK = _v6.b;
			var rV = _v6.c;
			var rLeft = _v6.d;
			var rRight = _v6.e;
			if (clr.$ === 'Black') {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var $elm$core$Dict$removeHelpPrepEQGT = F7(
	function (targetKey, dict, color, key, value, left, right) {
		if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) {
			var _v1 = left.a;
			var lK = left.b;
			var lV = left.c;
			var lLeft = left.d;
			var lRight = left.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				color,
				lK,
				lV,
				lLeft,
				A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, key, value, lRight, right));
		} else {
			_v2$2:
			while (true) {
				if ((right.$ === 'RBNode_elm_builtin') && (right.a.$ === 'Black')) {
					if (right.d.$ === 'RBNode_elm_builtin') {
						if (right.d.a.$ === 'Black') {
							var _v3 = right.a;
							var _v4 = right.d;
							var _v5 = _v4.a;
							return $elm$core$Dict$moveRedRight(dict);
						} else {
							break _v2$2;
						}
					} else {
						var _v6 = right.a;
						var _v7 = right.d;
						return $elm$core$Dict$moveRedRight(dict);
					}
				} else {
					break _v2$2;
				}
			}
			return dict;
		}
	});
var $elm$core$Dict$removeMin = function (dict) {
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
				var _v3 = lLeft.a;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					key,
					value,
					$elm$core$Dict$removeMin(left),
					right);
			} else {
				var _v4 = $elm$core$Dict$moveRedLeft(dict);
				if (_v4.$ === 'RBNode_elm_builtin') {
					var nColor = _v4.a;
					var nKey = _v4.b;
					var nValue = _v4.c;
					var nLeft = _v4.d;
					var nRight = _v4.e;
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						$elm$core$Dict$removeMin(nLeft),
						nRight);
				} else {
					return $elm$core$Dict$RBEmpty_elm_builtin;
				}
			}
		} else {
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				color,
				key,
				value,
				$elm$core$Dict$removeMin(left),
				right);
		}
	} else {
		return $elm$core$Dict$RBEmpty_elm_builtin;
	}
};
var $elm$core$Dict$removeHelp = F2(
	function (targetKey, dict) {
		if (dict.$ === 'RBEmpty_elm_builtin') {
			return $elm$core$Dict$RBEmpty_elm_builtin;
		} else {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_cmp(targetKey, key) < 0) {
				if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Black')) {
					var _v4 = left.a;
					var lLeft = left.d;
					if ((lLeft.$ === 'RBNode_elm_builtin') && (lLeft.a.$ === 'Red')) {
						var _v6 = lLeft.a;
						return A5(
							$elm$core$Dict$RBNode_elm_builtin,
							color,
							key,
							value,
							A2($elm$core$Dict$removeHelp, targetKey, left),
							right);
					} else {
						var _v7 = $elm$core$Dict$moveRedLeft(dict);
						if (_v7.$ === 'RBNode_elm_builtin') {
							var nColor = _v7.a;
							var nKey = _v7.b;
							var nValue = _v7.c;
							var nLeft = _v7.d;
							var nRight = _v7.e;
							return A5(
								$elm$core$Dict$balance,
								nColor,
								nKey,
								nValue,
								A2($elm$core$Dict$removeHelp, targetKey, nLeft),
								nRight);
						} else {
							return $elm$core$Dict$RBEmpty_elm_builtin;
						}
					}
				} else {
					return A5(
						$elm$core$Dict$RBNode_elm_builtin,
						color,
						key,
						value,
						A2($elm$core$Dict$removeHelp, targetKey, left),
						right);
				}
			} else {
				return A2(
					$elm$core$Dict$removeHelpEQGT,
					targetKey,
					A7($elm$core$Dict$removeHelpPrepEQGT, targetKey, dict, color, key, value, left, right));
			}
		}
	});
var $elm$core$Dict$removeHelpEQGT = F2(
	function (targetKey, dict) {
		if (dict.$ === 'RBNode_elm_builtin') {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_eq(targetKey, key)) {
				var _v1 = $elm$core$Dict$getMin(right);
				if (_v1.$ === 'RBNode_elm_builtin') {
					var minKey = _v1.b;
					var minValue = _v1.c;
					return A5(
						$elm$core$Dict$balance,
						color,
						minKey,
						minValue,
						left,
						$elm$core$Dict$removeMin(right));
				} else {
					return $elm$core$Dict$RBEmpty_elm_builtin;
				}
			} else {
				return A5(
					$elm$core$Dict$balance,
					color,
					key,
					value,
					left,
					A2($elm$core$Dict$removeHelp, targetKey, right));
			}
		} else {
			return $elm$core$Dict$RBEmpty_elm_builtin;
		}
	});
var $elm$core$Dict$remove = F2(
	function (key, dict) {
		var _v0 = A2($elm$core$Dict$removeHelp, key, dict);
		if ((_v0.$ === 'RBNode_elm_builtin') && (_v0.a.$ === 'Red')) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $elm$core$Dict$update = F3(
	function (targetKey, alter, dictionary) {
		var _v0 = alter(
			A2($elm$core$Dict$get, targetKey, dictionary));
		if (_v0.$ === 'Just') {
			var value = _v0.a;
			return A3($elm$core$Dict$insert, targetKey, value, dictionary);
		} else {
			return A2($elm$core$Dict$remove, targetKey, dictionary);
		}
	});
var $elm$http$Http$expectStringResponse = _Http_expectStringResponse;
var $author$project$Backend$expectJsonWithIndex = function (decoder) {
	return $elm$http$Http$expectStringResponse(
		function (_v0) {
			var body = _v0.body;
			var headers = _v0.headers;
			var _v1 = _Utils_Tuple2(
				A2($elm$json$Json$Decode$decodeString, decoder, body),
				A2(
					$elm$core$Maybe$andThen,
					$elm$core$String$toInt,
					A2($elm$core$Dict$get, 'x-data-index', headers)));
			if (_v1.a.$ === 'Ok') {
				if (_v1.b.$ === 'Just') {
					var value = _v1.a.a;
					var index = _v1.b.a;
					return $elm$core$Result$Ok(
						{index: index, value: value});
				} else {
					var value = _v1.a.a;
					return $elm$core$Result$Ok(
						{index: 1, value: value});
				}
			} else {
				var msg = _v1.a.a;
				return $elm$core$Result$Err(
					$elm$json$Json$Decode$errorToString(msg));
			}
		});
};
var $elm$http$Http$Internal$EmptyBody = {$: 'EmptyBody'};
var $elm$http$Http$emptyBody = $elm$http$Http$Internal$EmptyBody;
var $lukewestby$elm_http_builder$HttpBuilder$requestWithMethodAndUrl = F2(
	function (method, url) {
		return {
			body: $elm$http$Http$emptyBody,
			cacheBuster: $elm$core$Maybe$Nothing,
			expect: $elm$http$Http$expectStringResponse(
				function (_v0) {
					return $elm$core$Result$Ok(_Utils_Tuple0);
				}),
			headers: _List_Nil,
			method: method,
			queryParams: _List_Nil,
			timeout: $elm$core$Maybe$Nothing,
			url: url,
			withCredentials: false
		};
	});
var $lukewestby$elm_http_builder$HttpBuilder$get = $lukewestby$elm_http_builder$HttpBuilder$requestWithMethodAndUrl('GET');
var $elm$http$Http$Internal$Request = function (a) {
	return {$: 'Request', a: a};
};
var $elm$http$Http$request = $elm$http$Http$Internal$Request;
var $elm$core$Basics$composeR = F3(
	function (f, g, x) {
		return g(
			f(x));
	});
var $elm$url$Url$percentEncode = _Url_percentEncode;
var $lukewestby$elm_http_builder$HttpBuilder$replace = F2(
	function (old, _new) {
		return A2(
			$elm$core$Basics$composeR,
			$elm$core$String$split(old),
			$elm$core$String$join(_new));
	});
var $lukewestby$elm_http_builder$HttpBuilder$queryEscape = A2(
	$elm$core$Basics$composeR,
	$elm$url$Url$percentEncode,
	A2($lukewestby$elm_http_builder$HttpBuilder$replace, '%20', '+'));
var $lukewestby$elm_http_builder$HttpBuilder$queryPair = function (_v0) {
	var key = _v0.a;
	var value = _v0.b;
	return $lukewestby$elm_http_builder$HttpBuilder$queryEscape(key) + ('=' + $lukewestby$elm_http_builder$HttpBuilder$queryEscape(value));
};
var $lukewestby$elm_http_builder$HttpBuilder$joinUrlEncoded = function (args) {
	return A2(
		$elm$core$String$join,
		'&',
		A2($elm$core$List$map, $lukewestby$elm_http_builder$HttpBuilder$queryPair, args));
};
var $lukewestby$elm_http_builder$HttpBuilder$requestUrl = function (builder) {
	var encodedParams = $lukewestby$elm_http_builder$HttpBuilder$joinUrlEncoded(builder.queryParams);
	var fullUrl = $elm$core$String$isEmpty(encodedParams) ? builder.url : (builder.url + ('?' + encodedParams));
	return fullUrl;
};
var $lukewestby$elm_http_builder$HttpBuilder$toRequest = function (builder) {
	return $elm$http$Http$request(
		{
			body: builder.body,
			expect: builder.expect,
			headers: builder.headers,
			method: builder.method,
			timeout: builder.timeout,
			url: $lukewestby$elm_http_builder$HttpBuilder$requestUrl(builder),
			withCredentials: builder.withCredentials
		});
};
var $elm$http$Http$toTask = function (_v0) {
	var request_ = _v0.a;
	return A2(_Http_toTask, request_, $elm$core$Maybe$Nothing);
};
var $lukewestby$elm_http_builder$HttpBuilder$toTaskPlain = function (builder) {
	return $elm$http$Http$toTask(
		$lukewestby$elm_http_builder$HttpBuilder$toRequest(builder));
};
var $elm$time$Time$Name = function (a) {
	return {$: 'Name', a: a};
};
var $elm$time$Time$Offset = function (a) {
	return {$: 'Offset', a: a};
};
var $elm$time$Time$customZone = $elm$time$Time$Zone;
var $elm$time$Time$now = _Time_now($elm$time$Time$millisToPosix);
var $elm$time$Time$posixToMillis = function (_v0) {
	var millis = _v0.a;
	return millis;
};
var $lukewestby$elm_http_builder$HttpBuilder$withQueryParams = F2(
	function (queryParams, builder) {
		return _Utils_update(
			builder,
			{
				queryParams: _Utils_ap(builder.queryParams, queryParams)
			});
	});
var $lukewestby$elm_http_builder$HttpBuilder$toTaskWithCacheBuster = F2(
	function (paramName, builder) {
		var request = function (timestamp) {
			return $lukewestby$elm_http_builder$HttpBuilder$toTaskPlain(
				A2(
					$lukewestby$elm_http_builder$HttpBuilder$withQueryParams,
					_List_fromArray(
						[
							_Utils_Tuple2(
							paramName,
							$elm$core$String$fromInt(
								$elm$time$Time$posixToMillis(timestamp)))
						]),
					builder));
		};
		return A2($elm$core$Task$andThen, request, $elm$time$Time$now);
	});
var $lukewestby$elm_http_builder$HttpBuilder$toTask = function (builder) {
	var _v0 = builder.cacheBuster;
	if (_v0.$ === 'Just') {
		var paramName = _v0.a;
		return A2($lukewestby$elm_http_builder$HttpBuilder$toTaskWithCacheBuster, paramName, builder);
	} else {
		return $lukewestby$elm_http_builder$HttpBuilder$toTaskPlain(builder);
	}
};
var $lukewestby$elm_http_builder$HttpBuilder$withExpect = F2(
	function (expect, builder) {
		return {body: builder.body, cacheBuster: builder.cacheBuster, expect: expect, headers: builder.headers, method: builder.method, queryParams: builder.queryParams, timeout: builder.timeout, url: builder.url, withCredentials: builder.withCredentials};
	});
var $author$project$Backend$fetchData = function (f) {
	return A2(
		$elm$core$Task$attempt,
		f,
		$lukewestby$elm_http_builder$HttpBuilder$toTask(
			A2(
				$lukewestby$elm_http_builder$HttpBuilder$withExpect,
				$author$project$Backend$expectJsonWithIndex($author$project$Backend$decodeData),
				$lukewestby$elm_http_builder$HttpBuilder$get('/data'))));
};
var $author$project$Backend$Me = F2(
	function (token, user) {
		return {token: token, user: user};
	});
var $author$project$Backend$User = F4(
	function (id, login, url, avatar) {
		return {avatar: avatar, id: id, login: login, url: url};
	});
var $author$project$Backend$decodeUser = A2(
	$elm_community$json_extra$Json$Decode$Extra$andMap,
	A2($elm$json$Json$Decode$field, 'avatar_url', $elm$json$Json$Decode$string),
	A2(
		$elm_community$json_extra$Json$Decode$Extra$andMap,
		A2($elm$json$Json$Decode$field, 'html_url', $elm$json$Json$Decode$string),
		A2(
			$elm_community$json_extra$Json$Decode$Extra$andMap,
			A2($elm$json$Json$Decode$field, 'login', $elm$json$Json$Decode$string),
			A2(
				$elm_community$json_extra$Json$Decode$Extra$andMap,
				A2($elm$json$Json$Decode$field, 'id', $elm$json$Json$Decode$int),
				$elm$json$Json$Decode$succeed($author$project$Backend$User)))));
var $author$project$Backend$decodeMe = A2(
	$elm_community$json_extra$Json$Decode$Extra$andMap,
	A2($elm$json$Json$Decode$field, 'user', $author$project$Backend$decodeUser),
	A2(
		$elm_community$json_extra$Json$Decode$Extra$andMap,
		A2($elm$json$Json$Decode$field, 'token', $elm$json$Json$Decode$string),
		$elm$json$Json$Decode$succeed($author$project$Backend$Me)));
var $elm$http$Http$expectJson = function (decoder) {
	return $elm$http$Http$expectStringResponse(
		function (response) {
			var _v0 = A2($elm$json$Json$Decode$decodeString, decoder, response.body);
			if (_v0.$ === 'Err') {
				var decodeError = _v0.a;
				return $elm$core$Result$Err(
					$elm$json$Json$Decode$errorToString(decodeError));
			} else {
				var value = _v0.a;
				return $elm$core$Result$Ok(value);
			}
		});
};
var $author$project$Backend$fetchMe = function (f) {
	return A2(
		$elm$core$Task$attempt,
		f,
		$lukewestby$elm_http_builder$HttpBuilder$toTask(
			A2(
				$lukewestby$elm_http_builder$HttpBuilder$withExpect,
				$elm$http$Http$expectJson(
					$elm$json$Json$Decode$maybe($author$project$Backend$decodeMe)),
				$lukewestby$elm_http_builder$HttpBuilder$get('/me'))));
};
var $elm$time$Time$here = _Time_here(_Utils_Tuple0);
var $author$project$Model$AssignUser = F2(
	function (a, b) {
		return {$: 'AssignUser', a: a, b: b};
	});
var $author$project$Model$CardDataFetched = function (a) {
	return {$: 'CardDataFetched', a: a};
};
var $author$project$Model$GraphsFetched = function (a) {
	return {$: 'GraphsFetched', a: a};
};
var $author$project$Model$Noop = {$: 'Noop'};
var $elm$core$List$filter = F2(
	function (isGood, list) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, xs) {
					return isGood(x) ? A2($elm$core$List$cons, x, xs) : xs;
				}),
			_List_Nil,
			list);
	});
var $elm$core$List$any = F2(
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
var $elm$core$List$member = F2(
	function (x, xs) {
		return A2(
			$elm$core$List$any,
			function (a) {
				return _Utils_eq(a, x);
			},
			xs);
	});
var $author$project$Main$addAssignments = F2(
	function (users, mp) {
		var userIds = A2(
			$elm$core$List$map,
			function ($) {
				return $.id;
			},
			users);
		var beingAssigned = function (_v1) {
			var id = _v1.id;
			return A2($elm$core$List$member, id, userIds);
		};
		if (mp.$ === 'Nothing') {
			return $elm$core$Maybe$Just(
				{assign: users, unassign: _List_Nil});
		} else {
			var p = mp.a;
			return $elm$core$Maybe$Just(
				_Utils_update(
					p,
					{
						assign: _Utils_ap(
							users,
							A2(
								$elm$core$List$filter,
								A2($elm$core$Basics$composeL, $elm$core$Basics$not, beingAssigned),
								p.assign)),
						unassign: A2(
							$elm$core$List$filter,
							A2($elm$core$Basics$composeL, $elm$core$Basics$not, beingAssigned),
							p.unassign)
					}));
		}
	});
var $author$project$Model$CardMoved = F2(
	function (a, b) {
		return {$: 'CardMoved', a: a, b: b};
	});
var $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$ObjectType = {$: 'ObjectType'};
var $jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$SelectionSet = function (a) {
	return {$: 'SelectionSet', a: a};
};
var $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$SpecifiedType = function (a) {
	return {$: 'SpecifiedType', a: a};
};
var $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$ValueSpec = F4(
	function (a, b, c, d) {
		return {$: 'ValueSpec', a: a, b: b, c: c, d: d};
	});
var $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$NonNullFlag = {$: 'NonNullFlag'};
var $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$nonNullFlag = $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$NonNullFlag;
var $jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Util$responseKey = function (fieldInfo) {
	var _v0 = fieldInfo.alias;
	if (_v0.$ === 'Nothing') {
		return fieldInfo.name;
	} else {
		var alias = _v0.a;
		return alias;
	}
};
var $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$selectionDecoder = F2(
	function (selectionAST, decoder) {
		if (selectionAST.$ === 'Field') {
			var fieldInfo = selectionAST.a;
			return A2(
				$elm$core$Basics$composeL,
				$elm$json$Json$Decode$field(
					$jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Util$responseKey(fieldInfo)),
				decoder);
		} else {
			return decoder;
		}
	});
var $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$extract = function (_v0) {
	var selectionAST = _v0.a;
	var decoder = _v0.b;
	var vars = _v0.c;
	var fragments = _v0.d;
	return A4(
		$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$ValueSpec,
		$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$SpecifiedType(
			{
				coreType: $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$ObjectType,
				join: $elm$core$Basics$always,
				nullability: $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$nonNullFlag,
				selectionSet: $jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$SelectionSet(
					_List_fromArray(
						[selectionAST]))
			}),
		A2($jamesmacaulay$elm_graphql$GraphQL$Request$Builder$selectionDecoder, selectionAST, decoder),
		vars,
		fragments);
};
var $jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Field = function (a) {
	return {$: 'Field', a: a};
};
var $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$SelectionSpec = F4(
	function (a, b, c, d) {
		return {$: 'SelectionSpec', a: a, b: b, c: c, d: d};
	});
var $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$getAST = function (_v0) {
	var ast = _v0.a;
	return ast;
};
var $elm$core$Tuple$mapSecond = F2(
	function (func, _v0) {
		var x = _v0.a;
		var y = _v0.b;
		return _Utils_Tuple2(
			x,
			func(y));
	});
var $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$argumentsAST = $elm$core$List$map(
	$elm$core$Tuple$mapSecond($jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$getAST));
var $jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$VariableDefinition = function (a) {
	return {$: 'VariableDefinition', a: a};
};
var $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$toDefinitionAST = function (_var) {
	if (_var.$ === 'RequiredVariable') {
		var variableName = _var.a;
		var typeRef = _var.b;
		return $jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$VariableDefinition(
			{defaultValue: $elm$core$Maybe$Nothing, name: variableName, variableType: typeRef});
	} else {
		var variableName = _var.a;
		var typeRef = _var.b;
		var defaultValue = _var.d;
		return $jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$VariableDefinition(
			{
				defaultValue: $elm$core$Maybe$Just(defaultValue),
				name: variableName,
				variableType: typeRef
			});
	}
};
var $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$Util$variableIsNotInList = F2(
	function (existingVars, thisVar) {
		var thisVarAST = $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$toDefinitionAST(thisVar);
		var sameASTAsThisVar = function (_var) {
			return _Utils_eq(
				$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$toDefinitionAST(_var),
				thisVarAST);
		};
		return !A2($elm$core$List$any, sameASTAsThisVar, existingVars);
	});
var $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$Util$mergeVariables = F2(
	function (varsA, varsB) {
		return _Utils_ap(
			varsA,
			A2(
				$elm$core$List$filter,
				$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$Util$variableIsNotInList(varsA),
				varsB));
	});
var $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$emptySelectionSet = $jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$SelectionSet(_List_Nil);
var $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$selectionSetFromSourceType = function (sourceType) {
	if (sourceType.$ === 'SpecifiedType') {
		var selectionSet = sourceType.a.selectionSet;
		return selectionSet;
	} else {
		return $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$emptySelectionSet;
	}
};
var $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$getVariables = function (_v0) {
	var vars = _v0.b;
	return vars;
};
var $elm$core$Tuple$second = function (_v0) {
	var y = _v0.b;
	return y;
};
var $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$varsFromArguments = function (_arguments) {
	return A3(
		$elm$core$List$foldr,
		A2(
			$elm$core$Basics$composeR,
			$elm$core$Tuple$second,
			A2($elm$core$Basics$composeR, $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$getVariables, $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$Util$mergeVariables)),
		_List_Nil,
		_arguments);
};
var $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field = F3(
	function (name, _arguments, _v0) {
		var sourceType = _v0.a;
		var decoder = _v0.b;
		var fieldVars = _v0.c;
		var fragments = _v0.d;
		var vars = A2(
			$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$Util$mergeVariables,
			$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$varsFromArguments(_arguments),
			fieldVars);
		var astFieldInfo = {
			alias: $elm$core$Maybe$Nothing,
			_arguments: $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$argumentsAST(_arguments),
			directives: _List_Nil,
			name: name,
			selectionSet: $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$selectionSetFromSourceType(sourceType)
		};
		return A4(
			$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$SelectionSpec,
			$jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Field(astFieldInfo),
			decoder,
			vars,
			fragments);
	});
var $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$NonNull = {$: 'NonNull'};
var $jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$StringValue = function (a) {
	return {$: 'StringValue', a: a};
};
var $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$VariableSpec = F3(
	function (a, b, c) {
		return {$: 'VariableSpec', a: a, b: b, c: c};
	});
var $jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$NamedTypeRef = function (a) {
	return {$: 'NamedTypeRef', a: a};
};
var $jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$NonNull = {$: 'NonNull'};
var $jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$TypeRef = F2(
	function (a, b) {
		return {$: 'TypeRef', a: a, b: b};
	});
var $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$TypeRef$namedType = A2(
	$elm$core$Basics$composeL,
	$jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$TypeRef($jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$NonNull),
	$jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$NamedTypeRef);
var $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$TypeRef$id = $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$TypeRef$namedType('ID');
var $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$id = A3($jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$VariableSpec, $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$NonNull, $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$TypeRef$id, $jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$StringValue);
var $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Operation = function (a) {
	return {$: 'Operation', a: a};
};
var $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Document = function (a) {
	return {$: 'Document', a: a};
};
var $jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Document = function (a) {
	return {$: 'Document', a: a};
};
var $jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$FragmentDefinition = function (a) {
	return {$: 'FragmentDefinition', a: a};
};
var $jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$OperationDefinition = function (a) {
	return {$: 'OperationDefinition', a: a};
};
var $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$fragmentDefinitionsFromOperation = function (_v0) {
	var spec = _v0.a.spec;
	var _v1 = spec;
	var fragments = _v1.d;
	return fragments;
};
var $jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Directive = function (a) {
	return {$: 'Directive', a: a};
};
var $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$directiveAST = function (_v0) {
	var name = _v0.a;
	var _arguments = _v0.b;
	return $jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Directive(
		{
			_arguments: $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$argumentsAST(_arguments),
			name: name
		});
};
var $jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Mutation = {$: 'Mutation'};
var $jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Query = {$: 'Query'};
var $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$operationTypeAST = function (operationType) {
	if (operationType.$ === 'QueryOperationType') {
		return $jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Query;
	} else {
		return $jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Mutation;
	}
};
var $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$selectionSetFromSpec = function (_v0) {
	var sourceType = _v0.a;
	return $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$selectionSetFromSourceType(sourceType);
};
var $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$variableDefinitionsAST = function (_v0) {
	var vars = _v0.c;
	return A2($elm$core$List$map, $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$toDefinitionAST, vars);
};
var $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$operationAST = function (_v0) {
	var operationType = _v0.a.operationType;
	var name = _v0.a.name;
	var directives = _v0.a.directives;
	var spec = _v0.a.spec;
	return {
		directives: A2($elm$core$List$map, $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$directiveAST, directives),
		name: name,
		operationType: $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$operationTypeAST(operationType),
		selectionSet: $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$selectionSetFromSpec(spec),
		variableDefinitions: $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$variableDefinitionsAST(spec)
	};
};
var $elm$core$List$append = F2(
	function (xs, ys) {
		if (!ys.b) {
			return xs;
		} else {
			return A3($elm$core$List$foldr, $elm$core$List$cons, ys, xs);
		}
	});
var $elm$core$List$concat = function (lists) {
	return A3($elm$core$List$foldr, $elm$core$List$append, _List_Nil, lists);
};
var $elm$core$List$isEmpty = function (xs) {
	if (!xs.b) {
		return true;
	} else {
		return false;
	}
};
var $elm$core$String$fromFloat = _String_fromNumber;
var $elm$json$Json$Encode$string = _Json_wrap;
var $jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeKeyValuePair = function (_v1) {
	var key = _v1.a;
	var value = _v1.b;
	return key + (': ' + $jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeValue(value));
};
var $jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeValue = function (value) {
	switch (value.$) {
		case 'VariableValue':
			var name = value.b;
			return '$' + name;
		case 'IntValue':
			var _int = value.a;
			return $elm$core$String$fromInt(_int);
		case 'FloatValue':
			var _float = value.a;
			return $elm$core$String$fromFloat(_float);
		case 'StringValue':
			var string = value.a;
			return A2(
				$elm$json$Json$Encode$encode,
				0,
				$elm$json$Json$Encode$string(string));
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
				$elm$core$String$join,
				', ',
				A2($elm$core$List$map, $jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeValue, values)) + ']');
		default:
			var pairs = value.a;
			return '{' + (A2(
				$elm$core$String$join,
				', ',
				A2($elm$core$List$map, $jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeKeyValuePair, pairs)) + '}');
	}
};
var $jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeArgList = function (args) {
	return $elm$core$List$isEmpty(args) ? _List_Nil : _List_fromArray(
		[
			'(' + (A2(
			$elm$core$String$join,
			', ',
			A2($elm$core$List$map, $jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeKeyValuePair, args)) + ')')
		]);
};
var $jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeDirectiveName = function (name) {
	return '@' + name;
};
var $jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeDirective = function (_v0) {
	var name = _v0.a.name;
	var _arguments = _v0.a._arguments;
	return A2(
		$elm$core$String$join,
		'',
		A2(
			$elm$core$List$cons,
			$jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeDirectiveName(name),
			$jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeArgList(_arguments)));
};
var $jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$indent = F2(
	function (level, string) {
		return (level <= 0) ? string : ('  ' + A2($jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$indent, level - 1, string));
	});
var $jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$listFromMaybe = function (m) {
	if (m.$ === 'Nothing') {
		return _List_Nil;
	} else {
		var x = m.a;
		return _List_fromArray(
			[x]);
	}
};
var $elm$core$Maybe$map = F2(
	function (f, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return $elm$core$Maybe$Just(
				f(value));
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeFieldAlias = function (alias) {
	return alias + ':';
};
var $jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeFragmentSpreadName = function (name) {
	return '...' + name;
};
var $jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeFragmentSpread = F2(
	function (indentLevel, _v0) {
		var name = _v0.name;
		var directives = _v0.directives;
		return A2(
			$jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$indent,
			indentLevel,
			A2(
				$elm$core$String$join,
				' ',
				A2(
					$elm$core$List$cons,
					$jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeFragmentSpreadName(name),
					A2($elm$core$List$map, $jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeDirective, directives))));
	});
var $jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeTypeCondition = function (_v0) {
	var namedType = _v0.a;
	return 'on ' + namedType;
};
var $jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeField = F2(
	function (indentLevel, field) {
		return A2(
			$jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$indent,
			indentLevel,
			A2(
				$elm$core$String$join,
				' ',
				$elm$core$List$concat(
					_List_fromArray(
						[
							$jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$listFromMaybe(
							A2($elm$core$Maybe$map, $jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeFieldAlias, field.alias)),
							_List_fromArray(
							[
								A2(
								$elm$core$String$join,
								'',
								A2(
									$elm$core$List$cons,
									field.name,
									$jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeArgList(field._arguments)))
							]),
							A2($elm$core$List$map, $jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeDirective, field.directives),
							A2($jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeSelectionSet, indentLevel, field.selectionSet)
						]))));
	});
var $jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeInlineFragment = F2(
	function (indentLevel, _v2) {
		var typeCondition = _v2.typeCondition;
		var directives = _v2.directives;
		var selectionSet = _v2.selectionSet;
		return A2(
			$jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$indent,
			indentLevel,
			A2(
				$elm$core$String$join,
				' ',
				$elm$core$List$concat(
					_List_fromArray(
						[
							A2(
							$elm$core$List$cons,
							'...',
							$jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$listFromMaybe(
								A2($elm$core$Maybe$map, $jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeTypeCondition, typeCondition))),
							A2($elm$core$List$map, $jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeDirective, directives),
							A2($jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeSelectionSet, indentLevel, selectionSet)
						]))));
	});
var $jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeSelection = F2(
	function (indentLevel, selection) {
		switch (selection.$) {
			case 'Field':
				var field = selection.a;
				return A2($jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeField, indentLevel, field);
			case 'FragmentSpread':
				var fragmentSpread = selection.a;
				return A2($jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeFragmentSpread, indentLevel, fragmentSpread);
			default:
				var inlineFragment = selection.a;
				return A2($jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeInlineFragment, indentLevel, inlineFragment);
		}
	});
var $jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeSelectionSet = F2(
	function (indentLevel, _v0) {
		var selections = _v0.a;
		return $elm$core$List$isEmpty(selections) ? _List_Nil : _List_fromArray(
			[
				'{\n' + (A2(
				$elm$core$String$join,
				'\n',
				A2(
					$elm$core$List$map,
					$jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeSelection(indentLevel + 1),
					selections)) + ('\n' + A2($jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$indent, indentLevel, '}')))
			]);
	});
var $jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeFragmentDefinition = function (_v0) {
	var name = _v0.name;
	var typeCondition = _v0.typeCondition;
	var directives = _v0.directives;
	var selectionSet = _v0.selectionSet;
	return A2(
		$elm$core$String$join,
		' ',
		$elm$core$List$concat(
			_List_fromArray(
				[
					_List_fromArray(
					[
						'fragment',
						name,
						$jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeTypeCondition(typeCondition)
					]),
					A2($elm$core$List$map, $jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeDirective, directives),
					A2($jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeSelectionSet, 0, selectionSet)
				])));
};
var $jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeOperationType = function (opType) {
	if (opType.$ === 'Query') {
		return 'query';
	} else {
		return 'mutation';
	}
};
var $jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeDefaultValue = function (value) {
	return '= ' + $jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeValue(value);
};
var $jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeNullability = function (nullability) {
	if (nullability.$ === 'Nullable') {
		return '';
	} else {
		return '!';
	}
};
var $jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeCoreTypeRef = function (coreTypeRef) {
	if (coreTypeRef.$ === 'NamedTypeRef') {
		var name = coreTypeRef.a;
		return name;
	} else {
		var typeRef = coreTypeRef.a;
		return '[' + ($jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeTypeRef(typeRef) + ']');
	}
};
var $jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeTypeRef = function (_v0) {
	var nullability = _v0.a;
	var coreTypeRef = _v0.b;
	return _Utils_ap(
		$jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeCoreTypeRef(coreTypeRef),
		$jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeNullability(nullability));
};
var $jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeVariableName = function (name) {
	return '$' + name;
};
var $jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeVariableDefinition = function (_v0) {
	var info = _v0.a;
	return A2(
		$elm$core$String$join,
		' ',
		$elm$core$List$concat(
			_List_fromArray(
				[
					_List_fromArray(
					[
						$jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeVariableName(info.name) + ':',
						$jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeTypeRef(info.variableType)
					]),
					$jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$listFromMaybe(
					A2($elm$core$Maybe$map, $jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeDefaultValue, info.defaultValue))
				])));
};
var $jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeVariableDefinitions = function (defs) {
	return $elm$core$List$isEmpty(defs) ? _List_Nil : _List_fromArray(
		[
			'(' + (A2(
			$elm$core$String$join,
			', ',
			A2($elm$core$List$map, $jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeVariableDefinition, defs)) + ')')
		]);
};
var $jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeOperation = function (info) {
	return A2(
		$elm$core$String$join,
		' ',
		$elm$core$List$concat(
			_List_fromArray(
				[
					_List_fromArray(
					[
						$jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeOperationType(info.operationType)
					]),
					$jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$listFromMaybe(info.name),
					$jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeVariableDefinitions(info.variableDefinitions),
					A2($elm$core$List$map, $jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeDirective, info.directives),
					A2($jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeSelectionSet, 0, info.selectionSet)
				])));
};
var $jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeDefinition = function (definition) {
	switch (definition.$) {
		case 'OperationDefinition':
			var operationInfo = definition.a;
			return $jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeOperation(operationInfo);
		case 'QueryShorthand':
			var selectionSet = definition.a;
			return A2(
				$elm$core$String$join,
				'',
				A2($jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeSelectionSet, 0, selectionSet));
		default:
			var fragmentInfo = definition.a;
			return $jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeFragmentDefinition(fragmentInfo);
	}
};
var $jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeDocument = function (_v0) {
	var definitions = _v0.a;
	return A2(
		$elm$core$String$join,
		'\n\n',
		A2($elm$core$List$map, $jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeDefinition, definitions));
};
var $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$document = function (operation) {
	var fragmentDefinitions = $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$fragmentDefinitionsFromOperation(operation);
	var ast = $jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Document(
		_Utils_ap(
			A2($elm$core$List$map, $jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$FragmentDefinition, fragmentDefinitions),
			_List_fromArray(
				[
					$jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$OperationDefinition(
					$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$operationAST(operation))
				])));
	return $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Document(
		{
			ast: ast,
			operation: operation,
			serialized: $jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeDocument(ast)
		});
};
var $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$MutationOperationType = {$: 'MutationOperationType'};
var $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$mutationOperationType = $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$MutationOperationType;
var $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$mutationDocument = function (spec) {
	return $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$document(
		$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Operation(
			{directives: _List_Nil, name: $elm$core$Maybe$Nothing, operationType: $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$mutationOperationType, spec: spec}));
};
var $jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$ObjectValue = function (a) {
	return {$: 'ObjectValue', a: a};
};
var $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$Value = F2(
	function (a, b) {
		return {$: 'Value', a: a, b: b};
	});
var $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$valueVariablesFoldStep = A2($elm$core$Basics$composeR, $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$getVariables, $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$Util$mergeVariables);
var $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$object = function (pairs) {
	return A2(
		$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$Value,
		$jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$ObjectValue(
			A2(
				$elm$core$List$map,
				function (_v0) {
					var k = _v0.a;
					var _v1 = _v0.b;
					var ast = _v1.a;
					return _Utils_Tuple2(k, ast);
				},
				pairs)),
		A3(
			$elm$core$List$foldr,
			A2($elm$core$Basics$composeR, $elm$core$Tuple$second, $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$valueVariablesFoldStep),
			_List_Nil,
			pairs));
};
var $author$project$GitHub$IssueCardContent = function (a) {
	return {$: 'IssueCardContent', a: a};
};
var $author$project$GitHub$ProjectColumnCard = F6(
	function (id, url, columnId, isArchived, content, note) {
		return {columnId: columnId, content: content, id: id, isArchived: isArchived, note: note, url: url};
	});
var $author$project$GitHub$PullRequestCardContent = function (a) {
	return {$: 'PullRequestCardContent', a: a};
};
var $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$BooleanType = {$: 'BooleanType'};
var $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$primitiveSpec = F2(
	function (coreType, decoder) {
		return A4(
			$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$ValueSpec,
			$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$SpecifiedType(
				{coreType: coreType, join: $elm$core$Basics$always, nullability: $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$nonNullFlag, selectionSet: $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$emptySelectionSet}),
			$elm$core$Basics$always(decoder),
			_List_Nil,
			_List_Nil);
	});
var $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$bool = A2($jamesmacaulay$elm_graphql$GraphQL$Request$Builder$primitiveSpec, $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$BooleanType, $elm$json$Json$Decode$bool);
var $jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$InlineFragment = function (a) {
	return {$: 'InlineFragment', a: a};
};
var $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$inlineFragment = F2(
	function (maybeTypeCondition, spec) {
		var _v0 = spec;
		var sourceType = _v0.a;
		var decoder = _v0.b;
		var vars = _v0.c;
		var fragments = _v0.d;
		var astInlineFragmentInfo = {
			directives: _List_Nil,
			selectionSet: $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$selectionSetFromSourceType(sourceType),
			typeCondition: maybeTypeCondition
		};
		return A4(
			$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$SelectionSpec,
			$jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$InlineFragment(astInlineFragmentInfo),
			A2($elm$core$Basics$composeL, $elm$json$Json$Decode$maybe, decoder),
			vars,
			fragments);
	});
var $author$project$GitHub$DateType = {$: 'DateType'};
var $author$project$GitHub$Issue = function (id) {
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
											return function (assignees) {
												return function (labels) {
													return function (cards) {
														return function (milestone) {
															return {assignees: assignees, author: author, cards: cards, commentCount: commentCount, createdAt: createdAt, id: id, labels: labels, milestone: milestone, number: number, reactions: reactions, repo: repo, state: state, title: title, updatedAt: updatedAt, url: url};
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
var $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$aliasAs = F2(
	function (responseKey, selection) {
		var ast = selection.a;
		var decoder = selection.b;
		var vars = selection.c;
		var fragments = selection.d;
		if (ast.$ === 'Field') {
			var info = ast.a;
			return A4(
				$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$SelectionSpec,
				$jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Field(
					_Utils_update(
						info,
						{
							alias: $elm$core$Maybe$Just(responseKey)
						})),
				decoder,
				vars,
				fragments);
		} else {
			return selection;
		}
	});
var $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$customScalar = F2(
	function (customTypeMarker, decoder) {
		return A2($jamesmacaulay$elm_graphql$GraphQL$Request$Builder$primitiveSpec, customTypeMarker, decoder);
	});
var $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$EnumType = function (a) {
	return {$: 'EnumType', a: a};
};
var $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$decoderFromEnumLabel = F2(
	function (fallbackDecoder, labelledValues) {
		var valueFromLabel = function (key) {
			return A2(
				$elm$core$Dict$get,
				key,
				$elm$core$Dict$fromList(labelledValues));
		};
		var decoder = function (enumString) {
			var _v0 = valueFromLabel(enumString);
			if (_v0.$ === 'Just') {
				var value = _v0.a;
				return $elm$json$Json$Decode$succeed(value);
			} else {
				return fallbackDecoder(enumString);
			}
		};
		return decoder;
	});
var $elm$core$Set$insert = F2(
	function (key, _v0) {
		var dict = _v0.a;
		return $elm$core$Set$Set_elm_builtin(
			A3($elm$core$Dict$insert, key, _Utils_Tuple0, dict));
	});
var $elm$core$Set$fromList = function (list) {
	return A3($elm$core$List$foldl, $elm$core$Set$insert, $elm$core$Set$empty, list);
};
var $elm$core$Dict$foldl = F3(
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
					A3($elm$core$Dict$foldl, func, acc, left)),
					$temp$dict = right;
				func = $temp$func;
				acc = $temp$acc;
				dict = $temp$dict;
				continue foldl;
			}
		}
	});
var $elm$core$Dict$filter = F2(
	function (isGood, dict) {
		return A3(
			$elm$core$Dict$foldl,
			F3(
				function (k, v, d) {
					return A2(isGood, k, v) ? A3($elm$core$Dict$insert, k, v, d) : d;
				}),
			$elm$core$Dict$empty,
			dict);
	});
var $elm$core$Dict$member = F2(
	function (key, dict) {
		var _v0 = A2($elm$core$Dict$get, key, dict);
		if (_v0.$ === 'Just') {
			return true;
		} else {
			return false;
		}
	});
var $elm$core$Dict$intersect = F2(
	function (t1, t2) {
		return A2(
			$elm$core$Dict$filter,
			F2(
				function (k, _v0) {
					return A2($elm$core$Dict$member, k, t2);
				}),
			t1);
	});
var $elm$core$Set$intersect = F2(
	function (_v0, _v1) {
		var dict1 = _v0.a;
		var dict2 = _v1.a;
		return $elm$core$Set$Set_elm_builtin(
			A2($elm$core$Dict$intersect, dict1, dict2));
	});
var $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$enumJoin = F2(
	function (_v0, _v1) {
		var labelsA = _v0.a;
		var labelsB = _v1.a;
		return $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$EnumType(
			$elm$core$Set$toList(
				A2(
					$elm$core$Set$intersect,
					$elm$core$Set$fromList(labelsB),
					$elm$core$Set$fromList(labelsA))));
	});
var $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$enumWithFallback = F2(
	function (fallbackDecoder, labelledValues) {
		var labels = A2($elm$core$List$map, $elm$core$Tuple$first, labelledValues);
		var decoderFromLabel = A2($jamesmacaulay$elm_graphql$GraphQL$Request$Builder$decoderFromEnumLabel, fallbackDecoder, labelledValues);
		var decoder = A2($elm$json$Json$Decode$andThen, decoderFromLabel, $elm$json$Json$Decode$string);
		return A4(
			$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$ValueSpec,
			$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$SpecifiedType(
				{
					coreType: $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$EnumType(labels),
					join: $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$enumJoin,
					nullability: $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$nonNullFlag,
					selectionSet: $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$emptySelectionSet
				}),
			$elm$core$Basics$always(decoder),
			_List_Nil,
			_List_Nil);
	});
var $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$enum = $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$enumWithFallback(
	function (label) {
		return $elm$json$Json$Decode$fail(
			'Unexpected enum value ' + A2(
				$elm$json$Json$Encode$encode,
				0,
				$elm$json$Json$Encode$string(label)));
	});
var $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$IntType = {$: 'IntType'};
var $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$int = A2($jamesmacaulay$elm_graphql$GraphQL$Request$Builder$primitiveSpec, $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$IntType, $elm$json$Json$Decode$int);
var $jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$IntValue = function (a) {
	return {$: 'IntValue', a: a};
};
var $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$int = function (x) {
	return A2(
		$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$Value,
		$jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$IntValue(x),
		_List_Nil);
};
var $author$project$GitHub$IssueStateClosed = {$: 'IssueStateClosed'};
var $author$project$GitHub$IssueStateOpen = {$: 'IssueStateOpen'};
var $author$project$GitHub$issueStates = _List_fromArray(
	[
		_Utils_Tuple2('OPEN', $author$project$GitHub$IssueStateOpen),
		_Utils_Tuple2('CLOSED', $author$project$GitHub$IssueStateClosed)
	]);
var $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$emptyObjectSpecifiedType = $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$SpecifiedType(
	{coreType: $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$ObjectType, join: $elm$core$Basics$always, nullability: $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$nonNullFlag, selectionSet: $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$emptySelectionSet});
var $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$object = function (ctr) {
	return A4(
		$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$ValueSpec,
		$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$emptyObjectSpecifiedType,
		$elm$core$Basics$always(
			$elm$json$Json$Decode$succeed(ctr)),
		_List_Nil,
		_List_Nil);
};
var $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$StringType = {$: 'StringType'};
var $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string = A2($jamesmacaulay$elm_graphql$GraphQL$Request$Builder$primitiveSpec, $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$StringType, $elm$json$Json$Decode$string);
var $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$mergeSelectionSets = F2(
	function (_v0, _v1) {
		var selectionsA = _v0.a;
		var selectionsB = _v1.a;
		return $jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$SelectionSet(
			_Utils_ap(selectionsA, selectionsB));
	});
var $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$join = F2(
	function (a, b) {
		var _v0 = _Utils_Tuple2(a, b);
		if (_v0.a.$ === 'SpecifiedType') {
			if (_v0.b.$ === 'SpecifiedType') {
				var typeInfoA = _v0.a.a;
				var typeInfoB = _v0.b.a;
				return $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$SpecifiedType(
					_Utils_update(
						typeInfoA,
						{
							coreType: A2(typeInfoA.join, typeInfoA.coreType, typeInfoB.coreType),
							selectionSet: A2($jamesmacaulay$elm_graphql$GraphQL$Request$Builder$mergeSelectionSets, typeInfoA.selectionSet, typeInfoB.selectionSet)
						}));
			} else {
				var _v2 = _v0.b;
				return a;
			}
		} else {
			var _v1 = _v0.a;
			return b;
		}
	});
var $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$mergeFragments = F2(
	function (fragmentsA, fragmentsB) {
		return _Utils_ap(
			fragmentsA,
			A2(
				$elm$core$List$filter,
				function (fragmentItem) {
					return !A2(
						$elm$core$List$any,
						$elm$core$Basics$eq(fragmentItem),
						fragmentsA);
				},
				fragmentsB));
	});
var $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$map2 = F3(
	function (f, _v0, _v1) {
		var sourceTypeA = _v0.a;
		var decoderA = _v0.b;
		var varsA = _v0.c;
		var fragmentsA = _v0.d;
		var sourceTypeB = _v1.a;
		var decoderB = _v1.b;
		var varsB = _v1.c;
		var fragmentsB = _v1.d;
		var mergedVariables = A2($jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$Util$mergeVariables, varsA, varsB);
		var mergedFragments = A2($jamesmacaulay$elm_graphql$GraphQL$Request$Builder$mergeFragments, fragmentsA, fragmentsB);
		var joinedSourceType = A2($jamesmacaulay$elm_graphql$GraphQL$Request$Builder$join, sourceTypeA, sourceTypeB);
		var joinedDecoder = function (selectionSet) {
			return A3(
				$elm$json$Json$Decode$map2,
				f,
				decoderA(selectionSet),
				decoderB(selectionSet));
		};
		return A4($jamesmacaulay$elm_graphql$GraphQL$Request$Builder$ValueSpec, joinedSourceType, joinedDecoder, mergedVariables, mergedFragments);
	});
var $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with = F2(
	function (selection, objectSpec) {
		return A3(
			$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$map2,
			$elm$core$Basics$apL,
			objectSpec,
			$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$extract(selection));
	});
var $author$project$GitHub$labelObject = A2(
	$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
	A3($jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'color', _List_Nil, $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string),
	A2(
		$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
		A3($jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'name', _List_Nil, $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string),
		A2(
			$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
			A3($jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'id', _List_Nil, $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string),
			$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$object($author$project$GitHub$Label))));
var $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$ListType = function (a) {
	return {$: 'ListType', a: a};
};
var $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$listJoin = F2(
	function (_v0, _v1) {
		var itemSourceTypeA = _v0.a;
		var itemSourceTypeB = _v1.a;
		return $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$ListType(
			A2($jamesmacaulay$elm_graphql$GraphQL$Request$Builder$join, itemSourceTypeA, itemSourceTypeB));
	});
var $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$list = function (_v0) {
	var itemType = _v0.a;
	var decoder = _v0.b;
	var vars = _v0.c;
	var fragments = _v0.d;
	return A4(
		$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$ValueSpec,
		$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$SpecifiedType(
			{
				coreType: $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$ListType(itemType),
				join: $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$listJoin,
				nullability: $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$nonNullFlag,
				selectionSet: $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$selectionSetFromSourceType(itemType)
			}),
		A2($elm$core$Basics$composeL, $elm$json$Json$Decode$list, decoder),
		vars,
		fragments);
};
var $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$AnyType = {$: 'AnyType'};
var $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$SpecifiedTypeInfo = F4(
	function (nullability, coreType, join, selectionSet) {
		return {coreType: coreType, join: join, nullability: nullability, selectionSet: selectionSet};
	});
var $elm$json$Json$Decode$null = _Json_decodeNull;
var $elm$json$Json$Decode$nullable = function (decoder) {
	return $elm$json$Json$Decode$oneOf(
		_List_fromArray(
			[
				$elm$json$Json$Decode$null($elm$core$Maybe$Nothing),
				A2($elm$json$Json$Decode$map, $elm$core$Maybe$Just, decoder)
			]));
};
var $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$NullableFlag = {$: 'NullableFlag'};
var $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$nullableFlag = $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$NullableFlag;
var $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$nullable = function (_v0) {
	var sourceType = _v0.a;
	var decoder = _v0.b;
	var vars = _v0.c;
	var fragments = _v0.d;
	if (sourceType.$ === 'SpecifiedType') {
		var typeInfo = sourceType.a;
		return A4(
			$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$ValueSpec,
			$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$SpecifiedType(
				A4($jamesmacaulay$elm_graphql$GraphQL$Request$Builder$SpecifiedTypeInfo, $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$nullableFlag, typeInfo.coreType, typeInfo.join, typeInfo.selectionSet)),
			A2($elm$core$Basics$composeL, $elm$json$Json$Decode$nullable, decoder),
			vars,
			fragments);
	} else {
		return A4(
			$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$ValueSpec,
			$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$AnyType,
			A2($elm$core$Basics$composeL, $elm$json$Json$Decode$nullable, decoder),
			vars,
			fragments);
	}
};
var $author$project$GitHub$milestoneObject = A2(
	$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
	A3(
		$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
		'dueOn',
		_List_Nil,
		$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$nullable(
			A2($jamesmacaulay$elm_graphql$GraphQL$Request$Builder$customScalar, $author$project$GitHub$DateType, $elm_community$json_extra$Json$Decode$Extra$datetime))),
	A2(
		$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
		A3(
			$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
			'description',
			_List_Nil,
			$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$nullable($jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string)),
		A2(
			$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
			A3(
				$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
				'state',
				_List_Nil,
				$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$enum($author$project$GitHub$milestoneStates)),
			A2(
				$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
				A3($jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'title', _List_Nil, $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string),
				A2(
					$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
					A3($jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'number', _List_Nil, $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$int),
					A2(
						$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
						A3($jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'id', _List_Nil, $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string),
						$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$object($author$project$GitHub$Milestone)))))));
var $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$map = F2(
	function (f, _v0) {
		var sourceType = _v0.a;
		var decoder = _v0.b;
		var vars = _v0.c;
		var fragments = _v0.d;
		return A4(
			$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$ValueSpec,
			sourceType,
			A2(
				$elm$core$Basics$composeR,
				decoder,
				$elm$json$Json$Decode$map(f)),
			vars,
			fragments);
	});
var $author$project$GitHub$ReactionGroup = F2(
	function (type_, count) {
		return {count: count, type_: type_};
	});
var $author$project$GitHub$ReactionTypeConfused = {$: 'ReactionTypeConfused'};
var $author$project$GitHub$ReactionTypeEyes = {$: 'ReactionTypeEyes'};
var $author$project$GitHub$ReactionTypeHeart = {$: 'ReactionTypeHeart'};
var $author$project$GitHub$ReactionTypeHooray = {$: 'ReactionTypeHooray'};
var $author$project$GitHub$ReactionTypeLaugh = {$: 'ReactionTypeLaugh'};
var $author$project$GitHub$ReactionTypeRocket = {$: 'ReactionTypeRocket'};
var $author$project$GitHub$ReactionTypeThumbsDown = {$: 'ReactionTypeThumbsDown'};
var $author$project$GitHub$ReactionTypeThumbsUp = {$: 'ReactionTypeThumbsUp'};
var $author$project$GitHub$reactionTypes = _List_fromArray(
	[
		_Utils_Tuple2('THUMBS_UP', $author$project$GitHub$ReactionTypeThumbsUp),
		_Utils_Tuple2('THUMBS_DOWN', $author$project$GitHub$ReactionTypeThumbsDown),
		_Utils_Tuple2('LAUGH', $author$project$GitHub$ReactionTypeLaugh),
		_Utils_Tuple2('HOORAY', $author$project$GitHub$ReactionTypeHooray),
		_Utils_Tuple2('CONFUSED', $author$project$GitHub$ReactionTypeConfused),
		_Utils_Tuple2('HEART', $author$project$GitHub$ReactionTypeHeart),
		_Utils_Tuple2('ROCKET', $author$project$GitHub$ReactionTypeRocket),
		_Utils_Tuple2('EYES', $author$project$GitHub$ReactionTypeEyes)
	]);
var $author$project$GitHub$reactionGroupObject = A2(
	$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
	A3(
		$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
		'users',
		_List_Nil,
		$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$extract(
			A3($jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'totalCount', _List_Nil, $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$int))),
	A2(
		$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
		A3(
			$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
			'content',
			_List_Nil,
			$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$enum($author$project$GitHub$reactionTypes)),
		$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$object($author$project$GitHub$ReactionGroup)));
var $author$project$GitHub$nonZeroReactionGroups = A2(
	$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$map,
	$elm$core$List$filter(
		A2(
			$elm$core$Basics$composeL,
			$elm$core$Basics$gt(0),
			function ($) {
				return $.count;
			})),
	$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$list($author$project$GitHub$reactionGroupObject));
var $elm$core$List$maybeCons = F3(
	function (f, mx, xs) {
		var _v0 = f(mx);
		if (_v0.$ === 'Just') {
			var x = _v0.a;
			return A2($elm$core$List$cons, x, xs);
		} else {
			return xs;
		}
	});
var $elm$core$List$filterMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			$elm$core$List$maybeCons(f),
			_List_Nil,
			xs);
	});
var $author$project$GitHub$nullableList = function (o) {
	return A2(
		$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$map,
		$elm$core$List$filterMap($elm$core$Basics$identity),
		$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$list(
			$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$nullable(o)));
};
var $author$project$GitHub$CardLocation = F4(
	function (id, url, project, column) {
		return {column: column, id: id, project: project, url: url};
	});
var $author$project$GitHub$columnObject = A2(
	$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
	A3($jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'databaseId', _List_Nil, $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$int),
	A2(
		$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
		A3(
			$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
			'purpose',
			_List_Nil,
			$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$nullable(
				$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$enum($author$project$GitHub$projectColumnPurposes))),
		A2(
			$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
			A3($jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'name', _List_Nil, $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string),
			A2(
				$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
				A3($jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'id', _List_Nil, $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string),
				$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$object($author$project$GitHub$ProjectColumn)))));
var $author$project$GitHub$ProjectLocation = F4(
	function (id, url, name, number) {
		return {id: id, name: name, number: number, url: url};
	});
var $author$project$GitHub$projectLocationObject = A2(
	$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
	A3($jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'number', _List_Nil, $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$int),
	A2(
		$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
		A3($jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'name', _List_Nil, $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string),
		A2(
			$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
			A3($jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'url', _List_Nil, $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string),
			A2(
				$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
				A3($jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'id', _List_Nil, $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string),
				$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$object($author$project$GitHub$ProjectLocation)))));
var $author$project$GitHub$projectCardObject = A2(
	$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
	A3(
		$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
		'column',
		_List_Nil,
		$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$nullable($author$project$GitHub$columnObject)),
	A2(
		$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
		A3($jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'project', _List_Nil, $author$project$GitHub$projectLocationObject),
		A2(
			$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
			A3($jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'url', _List_Nil, $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string),
			A2(
				$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
				A3($jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'id', _List_Nil, $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string),
				$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$object($author$project$GitHub$CardLocation)))));
var $author$project$GitHub$RepoLocation = F4(
	function (id, url, owner, name) {
		return {id: id, name: name, owner: owner, url: url};
	});
var $author$project$GitHub$repoLocationObject = A2(
	$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
	A3($jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'name', _List_Nil, $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string),
	A2(
		$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
		A3(
			$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
			'owner',
			_List_Nil,
			$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$extract(
				A3($jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'login', _List_Nil, $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string))),
		A2(
			$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
			A3($jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'url', _List_Nil, $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string),
			A2(
				$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
				A3($jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'id', _List_Nil, $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string),
				$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$object($author$project$GitHub$RepoLocation)))));
var $author$project$GitHub$userObject = A2(
	$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
	A3(
		$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
		'name',
		_List_Nil,
		$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$nullable($jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string)),
	A2(
		$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
		A3($jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'avatarUrl', _List_Nil, $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string),
		A2(
			$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
			A3($jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'login', _List_Nil, $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string),
			A2(
				$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
				A3($jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'url', _List_Nil, $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string),
				A2(
					$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
					A3($jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'databaseId', _List_Nil, $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$int),
					A2(
						$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
						A3($jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'id', _List_Nil, $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string),
						$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$object($author$project$GitHub$User)))))));
var $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$produce = function (x) {
	return A4(
		$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$ValueSpec,
		$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$AnyType,
		$elm$core$Basics$always(
			$elm$json$Json$Decode$succeed(x)),
		_List_Nil,
		_List_Nil);
};
var $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$withLocalConstant = F2(
	function (x, objectSpec) {
		return A3(
			$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$map2,
			$elm$core$Basics$apL,
			objectSpec,
			$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$produce(x));
	});
var $author$project$GitHub$botObject = A2(
	$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$withLocalConstant,
	$elm$core$Maybe$Nothing,
	A2(
		$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
		A3($jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'avatarUrl', _List_Nil, $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string),
		A2(
			$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
			A3($jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'login', _List_Nil, $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string),
			A2(
				$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
				A3($jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'url', _List_Nil, $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string),
				A2(
					$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
					A3($jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'databaseId', _List_Nil, $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$int),
					A2(
						$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
						A3($jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'id', _List_Nil, $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string),
						$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$object($author$project$GitHub$User)))))));
var $jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$TypeCondition = function (a) {
	return {$: 'TypeCondition', a: a};
};
var $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$onType = $jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$TypeCondition;
var $elm_community$maybe_extra$Maybe$Extra$or = F2(
	function (ma, mb) {
		if (ma.$ === 'Nothing') {
			return mb;
		} else {
			return ma;
		}
	});
var $author$project$GitHub$userOrBotObject = A2(
	$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
	A2(
		$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$inlineFragment,
		$elm$core$Maybe$Just(
			$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$onType('Bot')),
		$author$project$GitHub$botObject),
	A2(
		$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
		A2(
			$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$inlineFragment,
			$elm$core$Maybe$Just(
				$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$onType('User')),
			$author$project$GitHub$userObject),
		$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$object($elm_community$maybe_extra$Maybe$Extra$or)));
var $author$project$GitHub$issueObject = A2(
	$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
	A3(
		$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
		'milestone',
		_List_Nil,
		$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$nullable($author$project$GitHub$milestoneObject)),
	A2(
		$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
		A3(
			$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
			'projectCards',
			_List_fromArray(
				[
					_Utils_Tuple2(
					'first',
					$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$int(10))
				]),
			$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$extract(
				A3(
					$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
					'nodes',
					_List_Nil,
					$author$project$GitHub$nullableList($author$project$GitHub$projectCardObject)))),
		A2(
			$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
			A3(
				$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
				'labels',
				_List_fromArray(
					[
						_Utils_Tuple2(
						'first',
						$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$int(10))
					]),
				$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$extract(
					A3(
						$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
						'nodes',
						_List_Nil,
						$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$list($author$project$GitHub$labelObject)))),
			A2(
				$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
				A3(
					$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
					'assignees',
					_List_fromArray(
						[
							_Utils_Tuple2(
							'first',
							$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$int(10))
						]),
					$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$extract(
						A3(
							$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
							'nodes',
							_List_Nil,
							$author$project$GitHub$nullableList($author$project$GitHub$userObject)))),
				A2(
					$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
					A3($jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'author', _List_Nil, $author$project$GitHub$userOrBotObject),
					A2(
						$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
						A3($jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'reactionGroups', _List_Nil, $author$project$GitHub$nonZeroReactionGroups),
						A2(
							$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
							A3(
								$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
								'comments',
								_List_Nil,
								$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$extract(
									A3($jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'totalCount', _List_Nil, $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$int))),
							A2(
								$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
								A3($jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'title', _List_Nil, $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string),
								A2(
									$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
									A3($jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'number', _List_Nil, $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$int),
									A2(
										$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
										A3($jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'repository', _List_Nil, $author$project$GitHub$repoLocationObject),
										A2(
											$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
											A2(
												$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$aliasAs,
												'issueState',
												A3(
													$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
													'state',
													_List_Nil,
													$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$enum($author$project$GitHub$issueStates))),
											A2(
												$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
												A3(
													$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
													'updatedAt',
													_List_Nil,
													A2($jamesmacaulay$elm_graphql$GraphQL$Request$Builder$customScalar, $author$project$GitHub$DateType, $elm_community$json_extra$Json$Decode$Extra$datetime)),
												A2(
													$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
													A3(
														$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
														'createdAt',
														_List_Nil,
														A2($jamesmacaulay$elm_graphql$GraphQL$Request$Builder$customScalar, $author$project$GitHub$DateType, $elm_community$json_extra$Json$Decode$Extra$datetime)),
													A2(
														$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
														A3($jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'url', _List_Nil, $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string),
														A2(
															$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
															A3($jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'id', _List_Nil, $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string),
															$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$object($author$project$GitHub$Issue))))))))))))))));
var $author$project$GitHub$PullRequest = function (id) {
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
											return function (assignees) {
												return function (labels) {
													return function (cards) {
														return function (additions) {
															return function (deletions) {
																return function (milestone) {
																	return function (mergeable) {
																		return function (lastCommit) {
																			return function (baseRefName) {
																				return function (headRefName) {
																					return {additions: additions, assignees: assignees, author: author, baseRefName: baseRefName, cards: cards, commentCount: commentCount, createdAt: createdAt, deletions: deletions, headRefName: headRefName, id: id, labels: labels, lastCommit: lastCommit, mergeable: mergeable, milestone: milestone, number: number, reactions: reactions, repo: repo, state: state, title: title, updatedAt: updatedAt, url: url};
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
	};
};
var $author$project$GitHub$gitActorObject = A2(
	$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
	A3(
		$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
		'user',
		_List_Nil,
		$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$nullable($author$project$GitHub$userObject)),
	A2(
		$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
		A3($jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'avatarUrl', _List_Nil, $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string),
		A2(
			$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
			A3($jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'name', _List_Nil, $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string),
			A2(
				$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
				A3($jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'email', _List_Nil, $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string),
				$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$object($author$project$GitHub$GitActor)))));
var $author$project$GitHub$actorObject = A2(
	$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
	A3($jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'avatarUrl', _List_Nil, $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string),
	A2(
		$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
		A3($jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'login', _List_Nil, $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string),
		A2(
			$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
			A3($jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'url', _List_Nil, $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string),
			$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$object($author$project$GitHub$Actor))));
var $author$project$GitHub$statusContextObject = A2(
	$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
	A3($jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'creator', _List_Nil, $author$project$GitHub$actorObject),
	A2(
		$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
		A3(
			$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
			'targetUrl',
			_List_Nil,
			$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$nullable($jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string)),
		A2(
			$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
			A3($jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'context', _List_Nil, $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string),
			A2(
				$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
				A3(
					$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
					'state',
					_List_Nil,
					$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$enum($author$project$GitHub$statusStates)),
				$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$object($author$project$GitHub$StatusContext)))));
var $author$project$GitHub$statusObject = A2(
	$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
	A3(
		$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
		'contexts',
		_List_Nil,
		$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$list($author$project$GitHub$statusContextObject)),
	A2(
		$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
		A3(
			$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
			'state',
			_List_Nil,
			$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$enum($author$project$GitHub$statusStates)),
		$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$object($author$project$GitHub$Status)));
var $author$project$GitHub$commitObject = A2(
	$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
	A3(
		$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
		'associatedPullRequests',
		_List_fromArray(
			[
				_Utils_Tuple2(
				'first',
				$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$int(3))
			]),
		$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$extract(
			A3(
				$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
				'nodes',
				_List_Nil,
				$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$list(
					$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$extract(
						A3($jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'id', _List_Nil, $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string)))))),
	A2(
		$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
		A3(
			$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
			'committedDate',
			_List_Nil,
			A2($jamesmacaulay$elm_graphql$GraphQL$Request$Builder$customScalar, $author$project$GitHub$DateType, $elm_community$json_extra$Json$Decode$Extra$datetime)),
		A2(
			$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
			A3(
				$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
				'authoredDate',
				_List_Nil,
				A2($jamesmacaulay$elm_graphql$GraphQL$Request$Builder$customScalar, $author$project$GitHub$DateType, $elm_community$json_extra$Json$Decode$Extra$datetime)),
			A2(
				$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
				A3(
					$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
					'committer',
					_List_Nil,
					$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$nullable($author$project$GitHub$gitActorObject)),
				A2(
					$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
					A3(
						$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
						'author',
						_List_Nil,
						$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$nullable($author$project$GitHub$gitActorObject)),
					A2(
						$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
						A3(
							$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
							'status',
							_List_Nil,
							$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$nullable($author$project$GitHub$statusObject)),
						A2(
							$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
							A3($jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'oid', _List_Nil, $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string),
							A2(
								$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
								A3($jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'url', _List_Nil, $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string),
								$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$object($author$project$GitHub$Commit)))))))));
var $elm$core$List$head = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(x);
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $author$project$GitHub$MergeableStateConflicting = {$: 'MergeableStateConflicting'};
var $author$project$GitHub$MergeableStateMergeable = {$: 'MergeableStateMergeable'};
var $author$project$GitHub$MergeableStateUnknown = {$: 'MergeableStateUnknown'};
var $author$project$GitHub$mergeableStates = _List_fromArray(
	[
		_Utils_Tuple2('MERGEABLE', $author$project$GitHub$MergeableStateMergeable),
		_Utils_Tuple2('CONFLICTING', $author$project$GitHub$MergeableStateConflicting),
		_Utils_Tuple2('UNKNOWN', $author$project$GitHub$MergeableStateUnknown)
	]);
var $author$project$GitHub$PullRequestStateClosed = {$: 'PullRequestStateClosed'};
var $author$project$GitHub$PullRequestStateMerged = {$: 'PullRequestStateMerged'};
var $author$project$GitHub$PullRequestStateOpen = {$: 'PullRequestStateOpen'};
var $author$project$GitHub$pullRequestStates = _List_fromArray(
	[
		_Utils_Tuple2('OPEN', $author$project$GitHub$PullRequestStateOpen),
		_Utils_Tuple2('CLOSED', $author$project$GitHub$PullRequestStateClosed),
		_Utils_Tuple2('MERGED', $author$project$GitHub$PullRequestStateMerged)
	]);
var $author$project$GitHub$prObject = A2(
	$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
	A3($jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'headRefName', _List_Nil, $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string),
	A2(
		$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
		A3($jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'baseRefName', _List_Nil, $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string),
		A2(
			$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
			A3(
				$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
				'commits',
				_List_fromArray(
					[
						_Utils_Tuple2(
						'last',
						$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$int(1))
					]),
				A2(
					$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$map,
					$elm$core$List$head,
					$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$extract(
						A3(
							$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
							'nodes',
							_List_Nil,
							$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$list(
								$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$extract(
									A3($jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'commit', _List_Nil, $author$project$GitHub$commitObject))))))),
			A2(
				$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
				A3(
					$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
					'mergeable',
					_List_Nil,
					$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$enum($author$project$GitHub$mergeableStates)),
				A2(
					$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
					A3(
						$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
						'milestone',
						_List_Nil,
						$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$nullable($author$project$GitHub$milestoneObject)),
					A2(
						$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
						A3($jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'deletions', _List_Nil, $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$int),
						A2(
							$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
							A3($jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'additions', _List_Nil, $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$int),
							A2(
								$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
								A3(
									$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
									'projectCards',
									_List_fromArray(
										[
											_Utils_Tuple2(
											'first',
											$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$int(10))
										]),
									$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$extract(
										A3(
											$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
											'nodes',
											_List_Nil,
											$author$project$GitHub$nullableList($author$project$GitHub$projectCardObject)))),
								A2(
									$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
									A3(
										$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
										'labels',
										_List_fromArray(
											[
												_Utils_Tuple2(
												'first',
												$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$int(10))
											]),
										$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$extract(
											A3(
												$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
												'nodes',
												_List_Nil,
												$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$list($author$project$GitHub$labelObject)))),
									A2(
										$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
										A3(
											$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
											'assignees',
											_List_fromArray(
												[
													_Utils_Tuple2(
													'first',
													$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$int(10))
												]),
											$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$extract(
												A3(
													$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
													'nodes',
													_List_Nil,
													$author$project$GitHub$nullableList($author$project$GitHub$userObject)))),
										A2(
											$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
											A3($jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'author', _List_Nil, $author$project$GitHub$userOrBotObject),
											A2(
												$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
												A3($jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'reactionGroups', _List_Nil, $author$project$GitHub$nonZeroReactionGroups),
												A2(
													$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
													A3(
														$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
														'comments',
														_List_Nil,
														$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$extract(
															A3($jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'totalCount', _List_Nil, $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$int))),
													A2(
														$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
														A3($jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'title', _List_Nil, $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string),
														A2(
															$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
															A3($jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'number', _List_Nil, $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$int),
															A2(
																$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
																A3($jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'repository', _List_Nil, $author$project$GitHub$repoLocationObject),
																A2(
																	$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
																	A2(
																		$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$aliasAs,
																		'prState',
																		A3(
																			$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
																			'state',
																			_List_Nil,
																			$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$enum($author$project$GitHub$pullRequestStates))),
																	A2(
																		$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
																		A3(
																			$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
																			'updatedAt',
																			_List_Nil,
																			A2($jamesmacaulay$elm_graphql$GraphQL$Request$Builder$customScalar, $author$project$GitHub$DateType, $elm_community$json_extra$Json$Decode$Extra$datetime)),
																		A2(
																			$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
																			A3(
																				$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
																				'createdAt',
																				_List_Nil,
																				A2($jamesmacaulay$elm_graphql$GraphQL$Request$Builder$customScalar, $author$project$GitHub$DateType, $elm_community$json_extra$Json$Decode$Extra$datetime)),
																			A2(
																				$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
																				A3($jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'url', _List_Nil, $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string),
																				A2(
																					$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
																					A3($jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'id', _List_Nil, $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string),
																					$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$object($author$project$GitHub$PullRequest))))))))))))))))))))));
var $author$project$GitHub$projectColumnCardObject = function () {
	var content = A2(
		$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
		A2(
			$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$inlineFragment,
			$elm$core$Maybe$Just(
				$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$onType('PullRequest')),
			A2($jamesmacaulay$elm_graphql$GraphQL$Request$Builder$map, $author$project$GitHub$PullRequestCardContent, $author$project$GitHub$prObject)),
		A2(
			$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
			A2(
				$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$inlineFragment,
				$elm$core$Maybe$Just(
					$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$onType('Issue')),
				A2($jamesmacaulay$elm_graphql$GraphQL$Request$Builder$map, $author$project$GitHub$IssueCardContent, $author$project$GitHub$issueObject)),
			$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$object($elm_community$maybe_extra$Maybe$Extra$or)));
	return A2(
		$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
		A3(
			$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
			'note',
			_List_Nil,
			$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$nullable($jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string)),
		A2(
			$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
			A3($jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'content', _List_Nil, content),
			A2(
				$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
				A3($jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'isArchived', _List_Nil, $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$bool),
				A2(
					$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
					A3(
						$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
						'column',
						_List_Nil,
						$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$extract(
							A3($jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'id', _List_Nil, $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string))),
					A2(
						$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
						A3($jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'url', _List_Nil, $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string),
						A2(
							$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
							A3($jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'id', _List_Nil, $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string),
							$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$object($author$project$GitHub$ProjectColumnCard)))))));
}();
var $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$RequiredVariable = F3(
	function (a, b, c) {
		return {$: 'RequiredVariable', a: a, b: b, c: c};
	});
var $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$required = F3(
	function (variableName, extract, _v0) {
		var typeRef = _v0.b;
		var convert = _v0.c;
		return A3(
			$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$RequiredVariable,
			variableName,
			typeRef,
			A2($elm$core$Basics$composeR, extract, convert));
	});
var $jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$VariableValue = F2(
	function (a, b) {
		return {$: 'VariableValue', a: a, b: b};
	});
var $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$name = function (_var) {
	if (_var.$ === 'RequiredVariable') {
		var variableName = _var.a;
		return variableName;
	} else {
		var variableName = _var.a;
		return variableName;
	}
};
var $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$variable = function (_var) {
	return A2(
		$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$Value,
		A2(
			$jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$VariableValue,
			_Utils_Tuple0,
			$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$name(_var)),
		_List_fromArray(
			[_var]));
};
var $author$project$GitHub$addContentCardMutation = function () {
	var contentIDVar = A3(
		$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$required,
		'contentId',
		function ($) {
			return $.contentId;
		},
		$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$id);
	var columnIDVar = A3(
		$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$required,
		'columnId',
		function ($) {
			return $.columnId;
		},
		$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$id);
	return $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$mutationDocument(
		$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$extract(
			A3(
				$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
				'addProjectCard',
				_List_fromArray(
					[
						_Utils_Tuple2(
						'input',
						$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$object(
							_List_fromArray(
								[
									_Utils_Tuple2(
									'projectColumnId',
									$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$variable(columnIDVar)),
									_Utils_Tuple2(
									'contentId',
									$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$variable(contentIDVar))
								])))
					]),
				$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$extract(
					A3(
						$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
						'cardEdge',
						_List_Nil,
						$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$extract(
							A3($jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'node', _List_Nil, $author$project$GitHub$projectColumnCardObject)))))));
}();
var $author$project$GitHub$auth = function (token) {
	return (token === '') ? _List_Nil : _List_fromArray(
		[
			_Utils_Tuple2('Authorization', 'token ' + token)
		]);
};
var $elm$http$Http$Internal$Header = F2(
	function (a, b) {
		return {$: 'Header', a: a, b: b};
	});
var $elm$http$Http$header = $elm$http$Http$Internal$Header;
var $author$project$GitHub$authHeaders = A2(
	$elm$core$Basics$composeL,
	$elm$core$List$map(
		function (_v0) {
			var a = _v0.a;
			var b = _v0.b;
			return A2($elm$http$Http$header, a, b);
		}),
	$author$project$GitHub$auth);
var $author$project$GitHub$authedOptions = function (token) {
	return {
		headers: $author$project$GitHub$authHeaders(token),
		method: 'POST',
		timeout: $elm$core$Maybe$Nothing,
		url: 'https://api.github.com/graphql',
		withCredentials: false
	};
};
var $jamesmacaulay$elm_graphql$GraphQL$Client$Http$Util$defaultExpect = A2(
	$elm$core$Basics$composeL,
	$elm$http$Http$expectJson,
	$elm$json$Json$Decode$field('data'));
var $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$responseDataDecoder = function (_v0) {
	var requestRecord = _v0.a;
	return requestRecord.responseDataDecoder;
};
var $jamesmacaulay$elm_graphql$GraphQL$Client$Http$GraphQLError = function (a) {
	return {$: 'GraphQLError', a: a};
};
var $jamesmacaulay$elm_graphql$GraphQL$Client$Http$HttpError = function (a) {
	return {$: 'HttpError', a: a};
};
var $jamesmacaulay$elm_graphql$GraphQL$Response$RequestError = F2(
	function (message, locations) {
		return {locations: locations, message: message};
	});
var $jamesmacaulay$elm_graphql$GraphQL$Response$DocumentLocation = F2(
	function (line, column) {
		return {column: column, line: line};
	});
var $jamesmacaulay$elm_graphql$GraphQL$Response$documentLocationDecoder = A3(
	$elm$json$Json$Decode$map2,
	$jamesmacaulay$elm_graphql$GraphQL$Response$DocumentLocation,
	A2($elm$json$Json$Decode$field, 'line', $elm$json$Json$Decode$int),
	A2($elm$json$Json$Decode$field, 'column', $elm$json$Json$Decode$int));
var $jamesmacaulay$elm_graphql$GraphQL$Response$errorsDecoder = $elm$json$Json$Decode$list(
	A3(
		$elm$json$Json$Decode$map2,
		$jamesmacaulay$elm_graphql$GraphQL$Response$RequestError,
		A2($elm$json$Json$Decode$field, 'message', $elm$json$Json$Decode$string),
		$elm$json$Json$Decode$oneOf(
			_List_fromArray(
				[
					A2(
					$elm$json$Json$Decode$field,
					'locations',
					$elm$json$Json$Decode$list($jamesmacaulay$elm_graphql$GraphQL$Response$documentLocationDecoder)),
					$elm$json$Json$Decode$succeed(_List_Nil)
				]))));
var $jamesmacaulay$elm_graphql$GraphQL$Client$Http$Util$errorsResponseDecoder = A2($elm$json$Json$Decode$field, 'errors', $jamesmacaulay$elm_graphql$GraphQL$Response$errorsDecoder);
var $elm$core$Result$withDefault = F2(
	function (def, result) {
		if (result.$ === 'Ok') {
			var a = result.a;
			return a;
		} else {
			return def;
		}
	});
var $jamesmacaulay$elm_graphql$GraphQL$Client$Http$Util$convertHttpError = F3(
	function (wrapHttpError, wrapGraphQLError, httpError) {
		var handleErrorWithResponseBody = function (responseBody) {
			return A2(
				$elm$core$Result$withDefault,
				wrapHttpError(httpError),
				A2(
					$elm$core$Result$map,
					wrapGraphQLError,
					A2($elm$json$Json$Decode$decodeString, $jamesmacaulay$elm_graphql$GraphQL$Client$Http$Util$errorsResponseDecoder, responseBody)));
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
var $elm$json$Json$Encode$bool = _Json_wrap;
var $elm$json$Json$Encode$float = _Json_wrap;
var $elm$json$Json$Encode$int = _Json_wrap;
var $elm$json$Json$Encode$list = F2(
	function (func, entries) {
		return _Json_wrap(
			A3(
				$elm$core$List$foldl,
				_Json_addEntry(func),
				_Json_emptyArray(_Utils_Tuple0),
				entries));
	});
var $elm$json$Json$Encode$null = _Json_encodeNull;
var $elm$json$Json$Encode$object = function (pairs) {
	return _Json_wrap(
		A3(
			$elm$core$List$foldl,
			F2(
				function (_v0, obj) {
					var k = _v0.a;
					var v = _v0.b;
					return A3(_Json_addField, k, v, obj);
				}),
			_Json_emptyObject(_Utils_Tuple0),
			pairs));
};
var $jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Value$Json$Encode$encode = function (value) {
	switch (value.$) {
		case 'VariableValue':
			return $elm$json$Json$Encode$null;
		case 'IntValue':
			var _int = value.a;
			return $elm$json$Json$Encode$int(_int);
		case 'FloatValue':
			var _float = value.a;
			return $elm$json$Json$Encode$float(_float);
		case 'StringValue':
			var string = value.a;
			return $elm$json$Json$Encode$string(string);
		case 'BooleanValue':
			var bool = value.a;
			return $elm$json$Json$Encode$bool(bool);
		case 'NullValue':
			return $elm$json$Json$Encode$null;
		case 'EnumValue':
			var string = value.a;
			return $elm$json$Json$Encode$string(string);
		case 'ListValue':
			var values = value.a;
			return A2($elm$json$Json$Encode$list, $jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Value$Json$Encode$encode, values);
		default:
			var kvPairs = value.a;
			return $elm$json$Json$Encode$object(
				A2(
					$elm$core$List$map,
					$elm$core$Tuple$mapSecond($jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Value$Json$Encode$encode),
					kvPairs));
	}
};
var $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$variableValuesToJson = function (kvPairs) {
	return $elm$core$List$isEmpty(kvPairs) ? $elm$core$Maybe$Nothing : $elm$core$Maybe$Just(
		$elm$json$Json$Encode$object(
			A2(
				$elm$core$List$map,
				$elm$core$Tuple$mapSecond($jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Value$Json$Encode$encode),
				kvPairs)));
};
var $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$jsonVariableValues = function (_v0) {
	var variableValues = _v0.a.variableValues;
	return $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$variableValuesToJson(variableValues);
};
var $elm$core$Task$fail = _Scheduler_fail;
var $elm$core$Task$mapError = F2(
	function (convert, task) {
		return A2(
			$elm$core$Task$onError,
			A2($elm$core$Basics$composeL, $elm$core$Task$fail, convert),
			task);
	});
var $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$requestBody = function (_v0) {
	var requestRecord = _v0.a;
	return requestRecord.documentString;
};
var $elm$core$Maybe$withDefault = F2(
	function (_default, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return value;
		} else {
			return _default;
		}
	});
var $jamesmacaulay$elm_graphql$GraphQL$Client$Http$Util$parameterizedUrl = F3(
	function (url, documentString, variableValues) {
		var variablesParam = A2(
			$elm$core$Maybe$withDefault,
			'',
			A2(
				$elm$core$Maybe$map,
				function (obj) {
					return '&variables=' + $elm$url$Url$percentEncode(
						A2($elm$json$Json$Encode$encode, 0, obj));
				},
				variableValues));
		var firstParamPrefix = A2($elm$core$String$contains, '?', url) ? '&' : '?';
		var queryParam = firstParamPrefix + ('query=' + $elm$url$Url$percentEncode(documentString));
		return _Utils_ap(
			url,
			_Utils_ap(queryParam, variablesParam));
	});
var $elm$http$Http$Internal$StringBody = F2(
	function (a, b) {
		return {$: 'StringBody', a: a, b: b};
	});
var $elm$http$Http$jsonBody = function (value) {
	return A2(
		$elm$http$Http$Internal$StringBody,
		'application/json',
		A2($elm$json$Json$Encode$encode, 0, value));
};
var $jamesmacaulay$elm_graphql$GraphQL$Client$Http$Util$postBodyJson = F2(
	function (documentString, variableValues) {
		var extraParams = A2(
			$elm$core$Maybe$withDefault,
			_List_Nil,
			A2(
				$elm$core$Maybe$map,
				function (obj) {
					return _List_fromArray(
						[
							_Utils_Tuple2('variables', obj)
						]);
				},
				variableValues));
		var documentValue = $elm$json$Json$Encode$string(documentString);
		return $elm$json$Json$Encode$object(
			_Utils_ap(
				_List_fromArray(
					[
						_Utils_Tuple2('query', documentValue)
					]),
				extraParams));
	});
var $jamesmacaulay$elm_graphql$GraphQL$Client$Http$Util$postBody = F2(
	function (documentString, variableValues) {
		return $elm$http$Http$jsonBody(
			A2($jamesmacaulay$elm_graphql$GraphQL$Client$Http$Util$postBodyJson, documentString, variableValues));
	});
var $jamesmacaulay$elm_graphql$GraphQL$Client$Http$Util$requestConfig = F4(
	function (requestOptions, documentString, expect, variableValues) {
		var _v0 = (requestOptions.method === 'GET') ? _Utils_Tuple2(
			A3($jamesmacaulay$elm_graphql$GraphQL$Client$Http$Util$parameterizedUrl, requestOptions.url, documentString, variableValues),
			$elm$http$Http$emptyBody) : _Utils_Tuple2(
			requestOptions.url,
			A2($jamesmacaulay$elm_graphql$GraphQL$Client$Http$Util$postBody, documentString, variableValues));
		var url = _v0.a;
		var body = _v0.b;
		return {body: body, expect: expect, headers: requestOptions.headers, method: requestOptions.method, timeout: requestOptions.timeout, url: url, withCredentials: requestOptions.withCredentials};
	});
var $jamesmacaulay$elm_graphql$GraphQL$Client$Http$sendExpecting = F3(
	function (expect, requestOptions, request) {
		var variableValues = $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$jsonVariableValues(request);
		var documentString = $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$requestBody(request);
		return A2(
			$elm$core$Task$mapError,
			A2($jamesmacaulay$elm_graphql$GraphQL$Client$Http$Util$convertHttpError, $jamesmacaulay$elm_graphql$GraphQL$Client$Http$HttpError, $jamesmacaulay$elm_graphql$GraphQL$Client$Http$GraphQLError),
			$elm$http$Http$toTask(
				$elm$http$Http$request(
					A4($jamesmacaulay$elm_graphql$GraphQL$Client$Http$Util$requestConfig, requestOptions, documentString, expect, variableValues))));
	});
var $jamesmacaulay$elm_graphql$GraphQL$Client$Http$send = F2(
	function (options, request) {
		var expect = $jamesmacaulay$elm_graphql$GraphQL$Client$Http$Util$defaultExpect(
			$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$responseDataDecoder(request));
		return A3($jamesmacaulay$elm_graphql$GraphQL$Client$Http$sendExpecting, expect, options, request);
	});
var $jamesmacaulay$elm_graphql$GraphQL$Client$Http$customSendMutation = $jamesmacaulay$elm_graphql$GraphQL$Client$Http$send;
var $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Request = function (a) {
	return {$: 'Request', a: a};
};
var $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$specDecoder = function (_v0) {
	var sourceType = _v0.a;
	var decoderFromSelectionSet = _v0.b;
	return decoderFromSelectionSet(
		$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$selectionSetFromSourceType(sourceType));
};
var $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$documentResponseDecoder = function (_v0) {
	var operation = _v0.a.operation;
	var _v1 = operation;
	var spec = _v1.a.spec;
	return $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$specDecoder(spec);
};
var $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$documentVariables = function (_v0) {
	var operation = _v0.a.operation;
	var _v1 = operation;
	var spec = _v1.a.spec;
	var _v2 = spec;
	var vars = _v2.c;
	return vars;
};
var $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$valueFromSource = F2(
	function (source, _var) {
		if (_var.$ === 'RequiredVariable') {
			var f = _var.c;
			return $elm$core$Maybe$Just(
				_Utils_Tuple2(
					$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$name(_var),
					f(source)));
		} else {
			var f = _var.c;
			var _v1 = f(source);
			if (_v1.$ === 'Nothing') {
				return $elm$core$Maybe$Nothing;
			} else {
				var value = _v1.a;
				return $elm$core$Maybe$Just(
					_Utils_Tuple2(
						$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$name(_var),
						value));
			}
		}
	});
var $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$extractValuesFrom = F2(
	function (source, vars) {
		return A2(
			$elm$core$List$filterMap,
			$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$valueFromSource(source),
			vars);
	});
var $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$request = F2(
	function (vars, doc) {
		var operation = doc.a.operation;
		var ast = doc.a.ast;
		var serialized = doc.a.serialized;
		return $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Request(
			{
				documentAST: ast,
				documentString: serialized,
				responseDataDecoder: $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$documentResponseDecoder(doc),
				variableValues: A2(
					$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$extractValuesFrom,
					vars,
					$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$documentVariables(doc))
			});
	});
var $author$project$GitHub$addContentCard = F3(
	function (token, columnID, contentID) {
		return A2(
			$jamesmacaulay$elm_graphql$GraphQL$Client$Http$customSendMutation,
			$author$project$GitHub$authedOptions(token),
			A2(
				$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$request,
				{columnId: columnID, contentId: contentID},
				$author$project$GitHub$addContentCardMutation));
	});
var $jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$NullValue = {$: 'NullValue'};
var $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$Nullable = {$: 'Nullable'};
var $jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Nullable = {$: 'Nullable'};
var $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$TypeRef$nullable = function (_v0) {
	var coreTypeRef = _v0.b;
	return A2($jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$TypeRef, $jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Nullable, coreTypeRef);
};
var $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$nullable = function (_v0) {
	var _v1 = _v0.a;
	var typeRef = _v0.b;
	var convert = _v0.c;
	return A3(
		$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$VariableSpec,
		$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$Nullable,
		$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$TypeRef$nullable(typeRef),
		A2(
			$elm$core$Basics$composeR,
			$elm$core$Maybe$map(convert),
			$elm$core$Maybe$withDefault($jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$NullValue)));
};
var $author$project$GitHub$moveCardMutation = function () {
	var columnIDVar = A3(
		$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$required,
		'columnId',
		function ($) {
			return $.columnId;
		},
		$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$id);
	var cardIDVar = A3(
		$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$required,
		'cardId',
		function ($) {
			return $.cardId;
		},
		$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$id);
	var afterIDVar = A3(
		$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$required,
		'afterId',
		function ($) {
			return $.afterId;
		},
		$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$nullable($jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$id));
	return $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$mutationDocument(
		$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$extract(
			A3(
				$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
				'moveProjectCard',
				_List_fromArray(
					[
						_Utils_Tuple2(
						'input',
						$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$object(
							_List_fromArray(
								[
									_Utils_Tuple2(
									'columnId',
									$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$variable(columnIDVar)),
									_Utils_Tuple2(
									'cardId',
									$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$variable(cardIDVar)),
									_Utils_Tuple2(
									'afterCardId',
									$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$variable(afterIDVar))
								])))
					]),
				$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$extract(
					A3(
						$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
						'cardEdge',
						_List_Nil,
						$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$extract(
							A3($jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'node', _List_Nil, $author$project$GitHub$projectColumnCardObject)))))));
}();
var $author$project$GitHub$moveCardAfter = F4(
	function (token, columnID, cardID, mafterID) {
		return A2(
			$jamesmacaulay$elm_graphql$GraphQL$Client$Http$customSendMutation,
			$author$project$GitHub$authedOptions(token),
			A2(
				$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$request,
				{afterId: mafterID, cardId: cardID, columnId: columnID},
				$author$project$GitHub$moveCardMutation));
	});
var $author$project$GitHub$addContentCardAfter = F4(
	function (token, columnID, contentID, mafterID) {
		return A2(
			$elm$core$Task$andThen,
			function (_v0) {
				var id = _v0.id;
				return A4($author$project$GitHub$moveCardAfter, token, columnID, id, mafterID);
			},
			A3($author$project$GitHub$addContentCard, token, columnID, contentID));
	});
var $author$project$Effects$contentCardId = F3(
	function (model, projectId, contentId) {
		var _v0 = A2($elm$core$Dict$get, contentId, model.cards);
		if (_v0.$ === 'Just') {
			var card = _v0.a;
			var _v1 = A2(
				$elm$core$List$filter,
				A2(
					$elm$core$Basics$composeL,
					A2(
						$elm$core$Basics$composeL,
						$elm$core$Basics$eq(projectId),
						function ($) {
							return $.id;
						}),
					function ($) {
						return $.project;
					}),
				card.cards);
			if (_v1.b && (!_v1.b.b)) {
				var c = _v1.a;
				return $elm$core$Maybe$Just(c.id);
			} else {
				return $elm$core$Maybe$Nothing;
			}
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $author$project$Model$SetLoading = F2(
	function (a, b) {
		return {$: 'SetLoading', a: a, b: b};
	});
var $author$project$Effects$withSetLoading = F2(
	function (ids, cmd) {
		return A2(
			$elm$core$Task$perform,
			$author$project$Model$SetLoading(ids),
			$elm$core$Task$succeed(cmd));
	});
var $elm$browser$Browser$Navigation$load = _Browser_load;
var $author$project$Effects$withTokenOrLogIn = F2(
	function (model, f) {
		var _v0 = model.me;
		if (_v0.$ === 'Just') {
			var token = _v0.a.token;
			return f(token);
		} else {
			return $elm$browser$Browser$Navigation$load('/auth/github');
		}
	});
var $author$project$Effects$addCard = F3(
	function (model, _v0, contentId) {
		var projectId = _v0.projectId;
		var columnId = _v0.columnId;
		var afterId = _v0.afterId;
		return A2(
			$author$project$Effects$withTokenOrLogIn,
			model,
			function (token) {
				var _v1 = A3($author$project$Effects$contentCardId, model, projectId, contentId);
				if (_v1.$ === 'Just') {
					var cardId = _v1.a;
					return A2(
						$author$project$Effects$withSetLoading,
						_List_fromArray(
							[columnId]),
						A2(
							$elm$core$Task$attempt,
							$author$project$Model$CardMoved(columnId),
							A4($author$project$GitHub$moveCardAfter, token, columnId, cardId, afterId)));
				} else {
					return A2(
						$author$project$Effects$withSetLoading,
						_List_fromArray(
							[columnId]),
						A2(
							$elm$core$Task$attempt,
							$author$project$Model$CardMoved(columnId),
							A4($author$project$GitHub$addContentCardAfter, token, columnId, contentId, afterId)));
				}
			});
	});
var $author$project$Model$DataChanged = F2(
	function (a, b) {
		return {$: 'DataChanged', a: a, b: b};
	});
var $author$project$Model$RefreshQueued = function (a) {
	return {$: 'RefreshQueued', a: a};
};
var $lukewestby$elm_http_builder$HttpBuilder$post = $lukewestby$elm_http_builder$HttpBuilder$requestWithMethodAndUrl('POST');
var $lukewestby$elm_http_builder$HttpBuilder$withHeaders = F2(
	function (headerPairs, builder) {
		return _Utils_update(
			builder,
			{
				headers: _Utils_ap(
					A2(
						$elm$core$List$map,
						function (_v0) {
							var key = _v0.a;
							var value = _v0.b;
							return A2($elm$http$Http$header, key, value);
						},
						headerPairs),
					builder.headers)
			});
	});
var $lukewestby$elm_http_builder$HttpBuilder$withBody = F2(
	function (body, builder) {
		return _Utils_update(
			builder,
			{body: body});
	});
var $lukewestby$elm_http_builder$HttpBuilder$withJsonBody = function (value) {
	return $lukewestby$elm_http_builder$HttpBuilder$withBody(
		$elm$http$Http$jsonBody(value));
};
var $author$project$GitHub$addIssueLabels = F3(
	function (token, issue, names) {
		return A2(
			$elm$core$Task$mapError,
			$jamesmacaulay$elm_graphql$GraphQL$Client$Http$HttpError,
			$lukewestby$elm_http_builder$HttpBuilder$toTask(
				A2(
					$lukewestby$elm_http_builder$HttpBuilder$withJsonBody,
					A2($elm$json$Json$Encode$list, $elm$json$Json$Encode$string, names),
					A2(
						$lukewestby$elm_http_builder$HttpBuilder$withHeaders,
						$author$project$GitHub$auth(token),
						$lukewestby$elm_http_builder$HttpBuilder$post(
							'https://api.github.com/repos/' + (issue.repo.owner + ('/' + (issue.repo.name + ('/issues/' + ($elm$core$String$fromInt(issue.number) + '/labels'))))))))));
	});
var $author$project$Backend$refreshIssue = F2(
	function (id, f) {
		return A2(
			$elm$core$Task$attempt,
			f,
			$lukewestby$elm_http_builder$HttpBuilder$toTask(
				$lukewestby$elm_http_builder$HttpBuilder$get('/refresh?issue=' + id)));
	});
var $author$project$Effects$addIssueLabels = F3(
	function (model, issue, labels) {
		return A2(
			$author$project$Effects$withTokenOrLogIn,
			model,
			function (token) {
				return A2(
					$author$project$Effects$withSetLoading,
					_List_fromArray(
						[issue.id]),
					A2(
						$elm$core$Task$attempt,
						$author$project$Model$DataChanged(
							A2($author$project$Backend$refreshIssue, issue.id, $author$project$Model$RefreshQueued)),
						A3($author$project$GitHub$addIssueLabels, token, issue, labels)));
			});
	});
var $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$TypeRef$string = $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$TypeRef$namedType('String');
var $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$string = A3($jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$VariableSpec, $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$NonNull, $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$TypeRef$string, $jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$StringValue);
var $author$project$GitHub$addNoteCardMutation = function () {
	var noteVar = A3(
		$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$required,
		'note',
		function ($) {
			return $.note;
		},
		$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$string);
	var columnIDVar = A3(
		$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$required,
		'columnId',
		function ($) {
			return $.columnId;
		},
		$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$id);
	return $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$mutationDocument(
		$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$extract(
			A3(
				$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
				'addProjectCard',
				_List_fromArray(
					[
						_Utils_Tuple2(
						'input',
						$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$object(
							_List_fromArray(
								[
									_Utils_Tuple2(
									'projectColumnId',
									$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$variable(columnIDVar)),
									_Utils_Tuple2(
									'note',
									$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$variable(noteVar))
								])))
					]),
				$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$extract(
					A3(
						$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
						'cardEdge',
						_List_Nil,
						$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$extract(
							A3($jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'node', _List_Nil, $author$project$GitHub$projectColumnCardObject)))))));
}();
var $author$project$GitHub$addNoteCard = F3(
	function (token, columnID, note) {
		return A2(
			$jamesmacaulay$elm_graphql$GraphQL$Client$Http$customSendMutation,
			$author$project$GitHub$authedOptions(token),
			A2(
				$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$request,
				{columnId: columnID, note: note},
				$author$project$GitHub$addNoteCardMutation));
	});
var $author$project$Backend$refreshCards = F2(
	function (col, f) {
		return A2(
			$elm$core$Task$attempt,
			f,
			$lukewestby$elm_http_builder$HttpBuilder$toTask(
				$lukewestby$elm_http_builder$HttpBuilder$get('/refresh?columnCards=' + col)));
	});
var $author$project$Effects$addNoteCard = F3(
	function (model, colId, note) {
		return A2(
			$author$project$Effects$withTokenOrLogIn,
			model,
			function (token) {
				return A2(
					$author$project$Effects$withSetLoading,
					_List_fromArray(
						[colId]),
					A2(
						$elm$core$Task$attempt,
						$author$project$Model$DataChanged(
							A2($author$project$Backend$refreshCards, colId, $author$project$Model$RefreshQueued)),
						A2(
							$elm$core$Task$map,
							$elm$core$Basics$always(_Utils_Tuple0),
							A3($author$project$GitHub$addNoteCard, token, colId, note))));
			});
	});
var $author$project$GitHub$addPullRequestLabels = F3(
	function (token, issue, names) {
		return A2(
			$elm$core$Task$mapError,
			$jamesmacaulay$elm_graphql$GraphQL$Client$Http$HttpError,
			$lukewestby$elm_http_builder$HttpBuilder$toTask(
				A2(
					$lukewestby$elm_http_builder$HttpBuilder$withJsonBody,
					A2($elm$json$Json$Encode$list, $elm$json$Json$Encode$string, names),
					A2(
						$lukewestby$elm_http_builder$HttpBuilder$withHeaders,
						$author$project$GitHub$auth(token),
						$lukewestby$elm_http_builder$HttpBuilder$post(
							'https://api.github.com/repos/' + (issue.repo.owner + ('/' + (issue.repo.name + ('/issues/' + ($elm$core$String$fromInt(issue.number) + '/labels'))))))))));
	});
var $author$project$Backend$refreshPR = F2(
	function (id, f) {
		return A2(
			$elm$core$Task$attempt,
			f,
			$lukewestby$elm_http_builder$HttpBuilder$toTask(
				$lukewestby$elm_http_builder$HttpBuilder$get('/refresh?pr=' + id)));
	});
var $author$project$Effects$addPullRequestLabels = F3(
	function (model, pr, labels) {
		return A2(
			$author$project$Effects$withTokenOrLogIn,
			model,
			function (token) {
				return A2(
					$author$project$Effects$withSetLoading,
					_List_fromArray(
						[pr.id]),
					A2(
						$elm$core$Task$attempt,
						$author$project$Model$DataChanged(
							A2($author$project$Backend$refreshPR, pr.id, $author$project$Model$RefreshQueued)),
						A3($author$project$GitHub$addPullRequestLabels, token, pr, labels)));
			});
	});
var $author$project$Main$addUnassignment = F2(
	function (user, mp) {
		if (mp.$ === 'Nothing') {
			return $elm$core$Maybe$Just(
				{
					assign: _List_Nil,
					unassign: _List_fromArray(
						[user])
				});
		} else {
			var p = mp.a;
			return $elm$core$Maybe$Just(
				_Utils_update(
					p,
					{
						assign: A2(
							$elm$core$List$filter,
							A2(
								$elm$core$Basics$composeL,
								$elm$core$Basics$neq(user.id),
								function ($) {
									return $.id;
								}),
							p.assign),
						unassign: A2(
							$elm$core$List$cons,
							user,
							A2(
								$elm$core$List$filter,
								A2(
									$elm$core$Basics$composeL,
									$elm$core$Basics$neq(user.id),
									function ($) {
										return $.id;
									}),
								p.unassign))
					}));
		}
	});
var $author$project$Model$AddLabelOperation = {$: 'AddLabelOperation'};
var $author$project$Label$cardHasLabel = F3(
	function (model, name, card) {
		var mlabelId = A2(
			$elm$core$Maybe$andThen,
			$elm$core$Dict$get(card.repo.id),
			A2($elm$core$Dict$get, name, model.labelToRepoToId));
		if (mlabelId.$ === 'Just') {
			var id = mlabelId.a;
			return A2($elm$core$List$member, id, card.labels);
		} else {
			return false;
		}
	});
var $elm$core$List$concatMap = F2(
	function (f, list) {
		return $elm$core$List$concat(
			A2($elm$core$List$map, f, list));
	});
var $elm$core$List$partition = F2(
	function (pred, list) {
		var step = F2(
			function (x, _v0) {
				var trues = _v0.a;
				var falses = _v0.b;
				return pred(x) ? _Utils_Tuple2(
					A2($elm$core$List$cons, x, trues),
					falses) : _Utils_Tuple2(
					trues,
					A2($elm$core$List$cons, x, falses));
			});
		return A3(
			$elm$core$List$foldr,
			step,
			_Utils_Tuple2(_List_Nil, _List_Nil),
			list);
	});
var $lukewestby$elm_http_builder$HttpBuilder$delete = $lukewestby$elm_http_builder$HttpBuilder$requestWithMethodAndUrl('DELETE');
var $author$project$GitHub$removeIssueLabel = F3(
	function (token, issue, name) {
		return A2(
			$elm$core$Task$mapError,
			$jamesmacaulay$elm_graphql$GraphQL$Client$Http$HttpError,
			$lukewestby$elm_http_builder$HttpBuilder$toTask(
				A2(
					$lukewestby$elm_http_builder$HttpBuilder$withHeaders,
					$author$project$GitHub$auth(token),
					$lukewestby$elm_http_builder$HttpBuilder$delete(
						'https://api.github.com/repos/' + (issue.repo.owner + ('/' + (issue.repo.name + ('/issues/' + ($elm$core$String$fromInt(issue.number) + ('/labels/' + name))))))))));
	});
var $author$project$Effects$removeIssueLabel = F3(
	function (model, issue, label) {
		return A2(
			$author$project$Effects$withTokenOrLogIn,
			model,
			function (token) {
				return A2(
					$author$project$Effects$withSetLoading,
					_List_fromArray(
						[issue.id]),
					A2(
						$elm$core$Task$attempt,
						$author$project$Model$DataChanged(
							A2($author$project$Backend$refreshIssue, issue.id, $author$project$Model$RefreshQueued)),
						A3($author$project$GitHub$removeIssueLabel, token, issue, label)));
			});
	});
var $author$project$GitHub$removePullRequestLabel = F3(
	function (token, issue, name) {
		return A2(
			$elm$core$Task$mapError,
			$jamesmacaulay$elm_graphql$GraphQL$Client$Http$HttpError,
			$lukewestby$elm_http_builder$HttpBuilder$toTask(
				A2(
					$lukewestby$elm_http_builder$HttpBuilder$withHeaders,
					$author$project$GitHub$auth(token),
					$lukewestby$elm_http_builder$HttpBuilder$delete(
						'https://api.github.com/repos/' + (issue.repo.owner + ('/' + (issue.repo.name + ('/issues/' + ($elm$core$String$fromInt(issue.number) + ('/labels/' + name))))))))));
	});
var $author$project$Effects$removePullRequestLabel = F3(
	function (model, pr, label) {
		return A2(
			$author$project$Effects$withTokenOrLogIn,
			model,
			function (token) {
				return A2(
					$author$project$Effects$withSetLoading,
					_List_fromArray(
						[pr.id]),
					A2(
						$elm$core$Task$attempt,
						$author$project$Model$DataChanged(
							A2($author$project$Backend$refreshPR, pr.id, $author$project$Model$RefreshQueued)),
						A3($author$project$GitHub$removePullRequestLabel, token, pr, label)));
			});
	});
var $y0hy0h$ordered_containers$OrderedSet$toList = function (_v0) {
	var list = _v0.a;
	return list;
};
var $author$project$CardOperations$applyLabelOperations = function (model) {
	var cards = A2(
		$elm$core$List$filterMap,
		function (a) {
			return A2($elm$core$Dict$get, a, model.cards);
		},
		$y0hy0h$ordered_containers$OrderedSet$toList(model.selectedCards));
	var _v0 = A2(
		$elm$core$List$partition,
		A2(
			$elm$core$Basics$composeL,
			$elm$core$Basics$eq($author$project$Model$AddLabelOperation),
			$elm$core$Tuple$second),
		$elm$core$Dict$toList(model.cardLabelOperations));
	var addPairs = _v0.a;
	var removePairs = _v0.b;
	var labelsToAdd = A2($elm$core$List$map, $elm$core$Tuple$first, addPairs);
	var adds = A2(
		$elm$core$List$map,
		function (card) {
			var _v2 = card.content;
			if (_v2.$ === 'IssueCardContent') {
				var issue = _v2.a;
				return A3($author$project$Effects$addIssueLabels, model, issue, labelsToAdd);
			} else {
				var pr = _v2.a;
				return A3($author$project$Effects$addPullRequestLabels, model, pr, labelsToAdd);
			}
		},
		cards);
	var labelsToRemove = A2($elm$core$List$map, $elm$core$Tuple$first, removePairs);
	var removals = A2(
		$elm$core$List$concatMap,
		function (name) {
			return A2(
				$elm$core$List$filterMap,
				function (card) {
					if (A3($author$project$Label$cardHasLabel, model, name, card)) {
						var _v1 = card.content;
						if (_v1.$ === 'IssueCardContent') {
							var issue = _v1.a;
							return $elm$core$Maybe$Just(
								A3($author$project$Effects$removeIssueLabel, model, issue, name));
						} else {
							var pr = _v1.a;
							return $elm$core$Maybe$Just(
								A3($author$project$Effects$removePullRequestLabel, model, pr, name));
						}
					} else {
						return $elm$core$Maybe$Nothing;
					}
				},
				cards);
		},
		labelsToRemove);
	return $elm$core$Platform$Cmd$batch(
		_Utils_ap(adds, removals));
};
var $author$project$Model$AssigneesUpdated = function (a) {
	return {$: 'AssigneesUpdated', a: a};
};
var $author$project$GitHub$AssignableIssue = function (a) {
	return {$: 'AssignableIssue', a: a};
};
var $author$project$GitHub$AssignablePullRequest = function (a) {
	return {$: 'AssignablePullRequest', a: a};
};
var $jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$ListValue = function (a) {
	return {$: 'ListValue', a: a};
};
var $jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$ListTypeRef = function (a) {
	return {$: 'ListTypeRef', a: a};
};
var $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$TypeRef$list = A2(
	$elm$core$Basics$composeL,
	$jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$TypeRef($jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$NonNull),
	$jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$ListTypeRef);
var $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$list = function (_v0) {
	var typeRef = _v0.b;
	var convert = _v0.c;
	return A3(
		$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$VariableSpec,
		$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$NonNull,
		$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$TypeRef$list(typeRef),
		A2(
			$elm$core$Basics$composeR,
			$elm$core$List$map(convert),
			$jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$ListValue));
};
var $author$project$GitHub$assignUsersMutation = function () {
	var assigneeIdsVar = A3(
		$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$required,
		'assigneeIds',
		function ($) {
			return $.assigneeIds;
		},
		$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$list($jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$id));
	var assignableIdVar = A3(
		$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$required,
		'assignableId',
		function ($) {
			return $.assignableId;
		},
		$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$id);
	var assignable = A2(
		$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
		A2(
			$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$inlineFragment,
			$elm$core$Maybe$Just(
				$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$onType('PullRequest')),
			A2($jamesmacaulay$elm_graphql$GraphQL$Request$Builder$map, $author$project$GitHub$AssignablePullRequest, $author$project$GitHub$prObject)),
		A2(
			$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
			A2(
				$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$inlineFragment,
				$elm$core$Maybe$Just(
					$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$onType('Issue')),
				A2($jamesmacaulay$elm_graphql$GraphQL$Request$Builder$map, $author$project$GitHub$AssignableIssue, $author$project$GitHub$issueObject)),
			$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$object($elm_community$maybe_extra$Maybe$Extra$or)));
	return $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$mutationDocument(
		$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$extract(
			A3(
				$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
				'addAssigneesToAssignable',
				_List_fromArray(
					[
						_Utils_Tuple2(
						'input',
						$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$object(
							_List_fromArray(
								[
									_Utils_Tuple2(
									'assignableId',
									$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$variable(assignableIdVar)),
									_Utils_Tuple2(
									'assigneeIds',
									$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$variable(assigneeIdsVar))
								])))
					]),
				$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$extract(
					A3($jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'assignable', _List_Nil, assignable)))));
}();
var $author$project$GitHub$assign = F3(
	function (token, assigneeIds, assignableId) {
		return A2(
			$jamesmacaulay$elm_graphql$GraphQL$Client$Http$customSendMutation,
			$author$project$GitHub$authedOptions(token),
			A2(
				$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$request,
				{assignableId: assignableId, assigneeIds: assigneeIds},
				$author$project$GitHub$assignUsersMutation));
	});
var $author$project$Effects$assignUsers = F3(
	function (model, users, id) {
		return A2(
			$author$project$Effects$withTokenOrLogIn,
			model,
			function (token) {
				return A2(
					$author$project$Effects$withSetLoading,
					_List_fromArray(
						[id]),
					A2(
						$elm$core$Task$attempt,
						$author$project$Model$AssigneesUpdated,
						A3(
							$author$project$GitHub$assign,
							token,
							A2(
								$elm$core$List$map,
								function ($) {
									return $.id;
								},
								users),
							id)));
			});
	});
var $author$project$CardOperations$clearSelectedCards = function (model) {
	return _Utils_update(
		model,
		{selectedCards: $y0hy0h$ordered_containers$OrderedSet$empty});
};
var $author$project$Drag$complete = function (mode) {
	return $author$project$Drag$NotDragging;
};
var $author$project$Main$addToList = F2(
	function (x, entry) {
		if (entry.$ === 'Nothing') {
			return $elm$core$Maybe$Just(
				_List_fromArray(
					[x]));
		} else {
			var xs = entry.a;
			return $elm$core$Maybe$Just(
				A2($elm$core$List$cons, x, xs));
		}
	});
var $author$project$Model$ArchiveEvent = F2(
	function (cardId, event) {
		return {cardId: cardId, event: event};
	});
var $author$project$Main$eventMillis = A2(
	$elm$core$Basics$composeR,
	function ($) {
		return $.event;
	},
	A2(
		$elm$core$Basics$composeR,
		function ($) {
			return $.createdAt;
		},
		$elm$time$Time$posixToMillis));
var $elm$core$List$sortWith = _List_sortWith;
var $elm$core$Dict$values = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, valueList) {
				return A2($elm$core$List$cons, value, valueList);
			}),
		_List_Nil,
		dict);
};
var $author$project$Main$computeArchive = F2(
	function (model, cards) {
		var latestFirst = F2(
			function (e1, e2) {
				var _v0 = A2(
					$elm$core$Basics$compare,
					$author$project$Main$eventMillis(e1),
					$author$project$Main$eventMillis(e2));
				switch (_v0.$) {
					case 'EQ':
						return $elm$core$Basics$EQ;
					case 'LT':
						return $elm$core$Basics$GT;
					default:
						return $elm$core$Basics$LT;
				}
			});
		var actorEvents = function (card) {
			return A2(
				$elm$core$List$map,
				$author$project$Model$ArchiveEvent(card.id),
				A2(
					$elm$core$Maybe$withDefault,
					_List_Nil,
					A2($elm$core$Dict$get, card.id, model.cardEvents)));
		};
		var cardEvents = function (card) {
			return A2(
				$elm$core$List$cons,
				{
					cardId: card.id,
					event: {
						avatar: A2(
							$elm$core$Maybe$withDefault,
							'',
							A2(
								$elm$core$Maybe$map,
								function ($) {
									return $.avatar;
								},
								card.author)),
						createdAt: card.createdAt,
						event: 'created',
						url: card.url,
						user: card.author
					}
				},
				actorEvents(card));
		};
		return A2(
			$elm$core$List$sortWith,
			latestFirst,
			A2(
				$elm$core$List$concatMap,
				cardEvents,
				$elm$core$Dict$values(cards)));
	});
var $author$project$Card$IssueState = function (a) {
	return {$: 'IssueState', a: a};
};
var $author$project$Project$detectColumn = {
	backlog: A2(
		$elm$core$Basics$composeL,
		$elm$core$Basics$eq(
			$elm$core$Maybe$Just($author$project$GitHub$ProjectColumnPurposeToDo)),
		function ($) {
			return $.purpose;
		}),
	done: A2(
		$elm$core$Basics$composeL,
		$elm$core$Basics$eq(
			$elm$core$Maybe$Just($author$project$GitHub$ProjectColumnPurposeDone)),
		function ($) {
			return $.purpose;
		}),
	icebox: A2(
		$elm$core$Basics$composeL,
		$elm$core$Basics$eq($elm$core$Maybe$Nothing),
		function ($) {
			return $.purpose;
		}),
	inFlight: A2(
		$elm$core$Basics$composeL,
		$elm$core$Basics$eq(
			$elm$core$Maybe$Just($author$project$GitHub$ProjectColumnPurposeInProgress)),
		function ($) {
			return $.purpose;
		})
};
var $author$project$Card$inColumn = function (match) {
	return $elm$core$List$any(
		A2(
			$elm$core$Basics$composeL,
			A2(
				$elm$core$Basics$composeL,
				$elm$core$Maybe$withDefault(false),
				$elm$core$Maybe$map(match)),
			function ($) {
				return $.column;
			}));
};
var $author$project$Card$cardProcessState = function (_v0) {
	var cards = _v0.cards;
	var labels = _v0.labels;
	return {
		hasEpicLabel: A2(
			$elm$core$List$any,
			A2(
				$elm$core$Basics$composeL,
				$elm$core$Basics$eq('epic'),
				function ($) {
					return $.name;
				}),
			labels),
		hasPausedLabel: A2(
			$elm$core$List$any,
			A2(
				$elm$core$Basics$composeL,
				$elm$core$Basics$eq('paused'),
				function ($) {
					return $.name;
				}),
			labels),
		hasTriageLabel: A2(
			$elm$core$List$any,
			A2(
				$elm$core$Basics$composeL,
				$elm$core$Basics$eq('triage'),
				function ($) {
					return $.name;
				}),
			labels),
		inBacklogColumn: A2($author$project$Card$inColumn, $author$project$Project$detectColumn.backlog, cards),
		inDoneColumn: A2($author$project$Card$inColumn, $author$project$Project$detectColumn.done, cards),
		inIceboxColumn: A2($author$project$Card$inColumn, $author$project$Project$detectColumn.icebox, cards),
		inInFlightColumn: A2($author$project$Card$inColumn, $author$project$Project$detectColumn.inFlight, cards)
	};
};
var $elm$core$List$sum = function (numbers) {
	return A3($elm$core$List$foldl, $elm$core$Basics$add, 0, numbers);
};
var $author$project$GitHub$reactionScore = function (reactions) {
	return $elm$core$List$sum(
		function (a) {
			return A2($elm$core$List$map, a, reactions);
		}(
			function (_v0) {
				var type_ = _v0.type_;
				var count = _v0.count;
				switch (type_.$) {
					case 'ReactionTypeThumbsUp':
						return 2 * count;
					case 'ReactionTypeThumbsDown':
						return (-2) * count;
					case 'ReactionTypeLaugh':
						return count;
					case 'ReactionTypeConfused':
						return -count;
					case 'ReactionTypeHeart':
						return 3 * count;
					case 'ReactionTypeHooray':
						return 3 * count;
					case 'ReactionTypeRocket':
						return 3 * count;
					default:
						return 2 * count;
				}
			}));
};
var $author$project$GitHub$issueScore = function (_v0) {
	var reactions = _v0.reactions;
	var commentCount = _v0.commentCount;
	return $author$project$GitHub$reactionScore(reactions) + (2 * commentCount);
};
var $author$project$Card$fromIssue = function (issue) {
	var id = issue.id;
	var url = issue.url;
	var repo = issue.repo;
	var number = issue.number;
	var title = issue.title;
	var createdAt = issue.createdAt;
	var updatedAt = issue.updatedAt;
	var author = issue.author;
	var assignees = issue.assignees;
	var labels = issue.labels;
	var cards = issue.cards;
	var commentCount = issue.commentCount;
	var reactions = issue.reactions;
	var state = issue.state;
	var milestone = issue.milestone;
	return {
		assignees: assignees,
		author: author,
		cards: cards,
		commentCount: commentCount,
		content: $author$project$GitHub$IssueCardContent(issue),
		createdAt: createdAt,
		id: id,
		labels: A2(
			$elm$core$List$map,
			function ($) {
				return $.id;
			},
			labels),
		milestone: milestone,
		number: number,
		processState: $author$project$Card$cardProcessState(
			{cards: cards, labels: labels}),
		reactions: reactions,
		repo: repo,
		score: $author$project$GitHub$issueScore(issue),
		state: $author$project$Card$IssueState(state),
		title: title,
		updatedAt: updatedAt,
		url: url
	};
};
var $author$project$Card$PullRequestState = function (a) {
	return {$: 'PullRequestState', a: a};
};
var $author$project$GitHub$pullRequestScore = function (_v0) {
	var reactions = _v0.reactions;
	var commentCount = _v0.commentCount;
	return (1000 + $author$project$GitHub$reactionScore(reactions)) + (2 * commentCount);
};
var $author$project$Card$fromPR = function (pr) {
	var id = pr.id;
	var url = pr.url;
	var repo = pr.repo;
	var number = pr.number;
	var title = pr.title;
	var createdAt = pr.createdAt;
	var updatedAt = pr.updatedAt;
	var author = pr.author;
	var assignees = pr.assignees;
	var labels = pr.labels;
	var cards = pr.cards;
	var commentCount = pr.commentCount;
	var reactions = pr.reactions;
	var state = pr.state;
	var milestone = pr.milestone;
	return {
		assignees: assignees,
		author: author,
		cards: cards,
		commentCount: commentCount,
		content: $author$project$GitHub$PullRequestCardContent(pr),
		createdAt: createdAt,
		id: id,
		labels: A2(
			$elm$core$List$map,
			function ($) {
				return $.id;
			},
			labels),
		milestone: milestone,
		number: number,
		processState: $author$project$Card$cardProcessState(
			{cards: cards, labels: labels}),
		reactions: reactions,
		repo: repo,
		score: $author$project$GitHub$pullRequestScore(pr),
		state: $author$project$Card$PullRequestState(state),
		title: title,
		updatedAt: updatedAt,
		url: url
	};
};
var $elm$core$Dict$map = F2(
	function (func, dict) {
		if (dict.$ === 'RBEmpty_elm_builtin') {
			return $elm$core$Dict$RBEmpty_elm_builtin;
		} else {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				color,
				key,
				A2(func, key, value),
				A2($elm$core$Dict$map, func, left),
				A2($elm$core$Dict$map, func, right));
		}
	});
var $elm$core$List$sortBy = _List_sortBy;
var $elm$core$List$sort = function (xs) {
	return A2($elm$core$List$sortBy, $elm$core$Basics$identity, xs);
};
var $elm$core$Dict$union = F2(
	function (t1, t2) {
		return A3($elm$core$Dict$foldl, $elm$core$Dict$insert, t2, t1);
	});
var $author$project$Main$computeCardsView = function (model) {
	var repoIssuesByNumber = A3(
		$elm$core$Dict$foldl,
		F2(
			function (_v11, issue) {
				return A2(
					$elm$core$Dict$update,
					issue.repo.id,
					A2(
						$elm$core$Basics$composeL,
						A2(
							$elm$core$Basics$composeL,
							$elm$core$Maybe$Just,
							A2($elm$core$Dict$insert, issue.number, issue.id)),
						$elm$core$Maybe$withDefault($elm$core$Dict$empty)));
			}),
		$elm$core$Dict$empty,
		model.issues);
	var recordRotation = F2(
		function (start, cur) {
			if (cur.$ === 'Nothing') {
				return $elm$core$Maybe$Just(start);
			} else {
				var ts = cur.a;
				return (_Utils_cmp(
					$elm$time$Time$posixToMillis(start),
					$elm$time$Time$posixToMillis(ts)) > 0) ? $elm$core$Maybe$Just(start) : $elm$core$Maybe$Just(ts);
			}
		});
	var recordPairRotations = F3(
		function (_v9, rotations, acc) {
			return A3(
				$elm$core$List$foldl,
				function (_v8) {
					var users = _v8.users;
					var start = _v8.start;
					return A2(
						$elm$core$Dict$update,
						$elm$core$List$sort(
							A2(
								$elm$core$List$map,
								function ($) {
									return $.id;
								},
								users)),
						recordRotation(start));
				},
				acc,
				rotations);
		});
	var openPRsByRepo = A3(
		$elm$core$Dict$foldl,
		F3(
			function (_v7, pr, prs) {
				return _Utils_eq(pr.state, $author$project$GitHub$PullRequestStateOpen) ? A3(
					$elm$core$Dict$update,
					pr.repo.id,
					$author$project$Main$addToList(pr.id),
					prs) : prs;
			}),
		$elm$core$Dict$empty,
		model.prs);
	var cards = A2(
		$elm$core$Dict$union,
		A2(
			$elm$core$Dict$map,
			$elm$core$Basics$always($author$project$Card$fromIssue),
			model.issues),
		A2(
			$elm$core$Dict$map,
			$elm$core$Basics$always($author$project$Card$fromPR),
			model.prs));
	var cardsByMilestone = A3(
		$elm$core$Dict$foldl,
		F3(
			function (id, card, cbm) {
				var _v6 = card.milestone;
				if (_v6.$ === 'Just') {
					var milestone = _v6.a;
					return A3(
						$elm$core$Dict$update,
						milestone.id,
						$author$project$Main$addToList(id),
						cbm);
				} else {
					return cbm;
				}
			}),
		$elm$core$Dict$empty,
		cards);
	var idsByUrl = A3(
		$elm$core$Dict$foldl,
		F2(
			function (_v4, _v5) {
				var id = _v5.id;
				var url = _v5.url;
				return A2($elm$core$Dict$insert, url, id);
			}),
		model.idsByUrl,
		cards);
	var cardProjects = A3(
		$elm$core$Dict$foldl,
		F3(
			function (repoId, ps, cpsOuter) {
				return A3(
					$elm$core$List$foldl,
					F2(
						function (project, cps) {
							var _v0 = A2($elm$core$String$split, '#', project.name);
							if ((_v0.b && _v0.b.b) && (!_v0.b.b.b)) {
								var _v1 = _v0.b;
								var numStr = _v1.a;
								var _v2 = $elm$core$String$toInt(numStr);
								if (_v2.$ === 'Just') {
									var num = _v2.a;
									var _v3 = A2(
										$elm$core$Maybe$andThen,
										$elm$core$Dict$get(num),
										A2($elm$core$Dict$get, repoId, repoIssuesByNumber));
									if (_v3.$ === 'Just') {
										var issueId = _v3.a;
										return A3($elm$core$Dict$insert, issueId, project.id, cps);
									} else {
										return cps;
									}
								} else {
									return cps;
								}
							} else {
								return cps;
							}
						}),
					cpsOuter,
					ps);
			}),
		$elm$core$Dict$empty,
		model.repoProjects);
	return _Utils_update(
		model,
		{
			archive: A2($author$project$Main$computeArchive, model, cards),
			cardProjects: cardProjects,
			cards: cards,
			cardsByMilestone: cardsByMilestone,
			idsByUrl: idsByUrl,
			lastPaired: A3($elm$core$Dict$foldl, recordPairRotations, $elm$core$Dict$empty, model.cardRotations),
			openPRsByRepo: openPRsByRepo
		});
};
var $elm$core$Debug$log = _Debug_log;
var $author$project$Log$debug = F3(
	function (ctx, thing, a) {
		return A2(
			$elm$core$Basics$always,
			a,
			A2($elm$core$Debug$log, ctx, thing));
	});
var $elm$regex$Regex$Match = F4(
	function (match, index, number, submatches) {
		return {index: index, match: match, number: number, submatches: submatches};
	});
var $elm$regex$Regex$find = _Regex_findAtMost(_Regex_infinity);
var $author$project$Label$hexBrightness = function (h) {
	var _v0 = A2($elm$core$Basics$compare, h, (255 / 2) | 0);
	switch (_v0.$) {
		case 'LT':
			return -1;
		case 'EQ':
			return 0;
		default:
			return 1;
	}
};
var $elm$regex$Regex$fromStringWith = _Regex_fromStringWith;
var $elm$regex$Regex$fromString = function (string) {
	return A2(
		$elm$regex$Regex$fromStringWith,
		{caseInsensitive: false, multiline: false},
		string);
};
var $elm$regex$Regex$never = _Regex_never;
var $author$project$Label$hexRegex = A2(
	$elm$core$Maybe$withDefault,
	$elm$regex$Regex$never,
	$elm$regex$Regex$fromString('([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})'));
var $fredcy$elm_parseint$ParseInt$InvalidRadix = function (a) {
	return {$: 'InvalidRadix', a: a};
};
var $elm$core$Result$andThen = F2(
	function (callback, result) {
		if (result.$ === 'Ok') {
			var value = result.a;
			return callback(value);
		} else {
			var msg = result.a;
			return $elm$core$Result$Err(msg);
		}
	});
var $fredcy$elm_parseint$ParseInt$InvalidChar = function (a) {
	return {$: 'InvalidChar', a: a};
};
var $fredcy$elm_parseint$ParseInt$OutOfRange = function (a) {
	return {$: 'OutOfRange', a: a};
};
var $fredcy$elm_parseint$ParseInt$charOffset = F2(
	function (basis, c) {
		return $elm$core$Char$toCode(c) - $elm$core$Char$toCode(basis);
	});
var $fredcy$elm_parseint$ParseInt$isBetween = F3(
	function (lower, upper, c) {
		var ci = $elm$core$Char$toCode(c);
		return (_Utils_cmp(
			$elm$core$Char$toCode(lower),
			ci) < 1) && (_Utils_cmp(
			ci,
			$elm$core$Char$toCode(upper)) < 1);
	});
var $fredcy$elm_parseint$ParseInt$intFromChar = F2(
	function (radix, c) {
		var validInt = function (i) {
			return (_Utils_cmp(i, radix) < 0) ? $elm$core$Result$Ok(i) : $elm$core$Result$Err(
				$fredcy$elm_parseint$ParseInt$OutOfRange(c));
		};
		var toInt = A3(
			$fredcy$elm_parseint$ParseInt$isBetween,
			_Utils_chr('0'),
			_Utils_chr('9'),
			c) ? $elm$core$Result$Ok(
			A2(
				$fredcy$elm_parseint$ParseInt$charOffset,
				_Utils_chr('0'),
				c)) : (A3(
			$fredcy$elm_parseint$ParseInt$isBetween,
			_Utils_chr('a'),
			_Utils_chr('z'),
			c) ? $elm$core$Result$Ok(
			10 + A2(
				$fredcy$elm_parseint$ParseInt$charOffset,
				_Utils_chr('a'),
				c)) : (A3(
			$fredcy$elm_parseint$ParseInt$isBetween,
			_Utils_chr('A'),
			_Utils_chr('Z'),
			c) ? $elm$core$Result$Ok(
			10 + A2(
				$fredcy$elm_parseint$ParseInt$charOffset,
				_Utils_chr('A'),
				c)) : $elm$core$Result$Err(
			$fredcy$elm_parseint$ParseInt$InvalidChar(c))));
		return A2($elm$core$Result$andThen, validInt, toInt);
	});
var $fredcy$elm_parseint$ParseInt$parseIntR = F2(
	function (radix, rstring) {
		var _v0 = $elm$core$String$uncons(rstring);
		if (_v0.$ === 'Nothing') {
			return $elm$core$Result$Ok(0);
		} else {
			var _v1 = _v0.a;
			var c = _v1.a;
			var rest = _v1.b;
			return A2(
				$elm$core$Result$andThen,
				function (ci) {
					return A2(
						$elm$core$Result$andThen,
						function (ri) {
							return $elm$core$Result$Ok(ci + (ri * radix));
						},
						A2($fredcy$elm_parseint$ParseInt$parseIntR, radix, rest));
				},
				A2($fredcy$elm_parseint$ParseInt$intFromChar, radix, c));
		}
	});
var $elm$core$String$reverse = _String_reverse;
var $fredcy$elm_parseint$ParseInt$parseIntRadix = F2(
	function (radix, string) {
		return ((2 <= radix) && (radix <= 36)) ? A2(
			$fredcy$elm_parseint$ParseInt$parseIntR,
			radix,
			$elm$core$String$reverse(string)) : $elm$core$Result$Err(
			$fredcy$elm_parseint$ParseInt$InvalidRadix(radix));
	});
var $fredcy$elm_parseint$ParseInt$parseIntHex = $fredcy$elm_parseint$ParseInt$parseIntRadix(16);
var $author$project$Label$computeColorIsLight = function (hex) {
	var matches = $elm$core$List$head(
		A2($elm$regex$Regex$find, $author$project$Label$hexRegex, hex));
	var _v0 = A2(
		$elm$core$Maybe$map,
		function ($) {
			return $.submatches;
		},
		matches);
	if ((((((((_v0.$ === 'Just') && _v0.a.b) && (_v0.a.a.$ === 'Just')) && _v0.a.b.b) && (_v0.a.b.a.$ === 'Just')) && _v0.a.b.b.b) && (_v0.a.b.b.a.$ === 'Just')) && (!_v0.a.b.b.b.b)) {
		var _v1 = _v0.a;
		var h1s = _v1.a.a;
		var _v2 = _v1.b;
		var h2s = _v2.a.a;
		var _v3 = _v2.b;
		var h3s = _v3.a.a;
		var _v4 = A2(
			$elm$core$List$map,
			$fredcy$elm_parseint$ParseInt$parseIntHex,
			_List_fromArray(
				[h1s, h2s, h3s]));
		if ((((((_v4.b && (_v4.a.$ === 'Ok')) && _v4.b.b) && (_v4.b.a.$ === 'Ok')) && _v4.b.b.b) && (_v4.b.b.a.$ === 'Ok')) && (!_v4.b.b.b.b)) {
			var h1 = _v4.a.a;
			var _v5 = _v4.b;
			var h2 = _v5.a.a;
			var _v6 = _v5.b;
			var h3 = _v6.a.a;
			return ((($author$project$Label$hexBrightness(h1) + $author$project$Label$hexBrightness(h2)) + $author$project$Label$hexBrightness(h3)) > 0) ? true : false;
		} else {
			return A3($author$project$Log$debug, 'invalid hex', hex, false);
		}
	} else {
		return A3($author$project$Log$debug, 'invalid hex', hex, false);
	}
};
var $author$project$Label$warmColorLightnessCache = F2(
	function (color, mb) {
		if (mb.$ === 'Nothing') {
			return $elm$core$Maybe$Just(
				$author$project$Label$computeColorIsLight(color));
		} else {
			return mb;
		}
	});
var $author$project$Label$cacheColorLightness = function (model) {
	return _Utils_update(
		model,
		{
			colorLightnessCache: A3(
				$elm$core$Dict$foldl,
				F2(
					function (_v0, label) {
						return A2(
							$elm$core$Dict$update,
							label.color,
							$author$project$Label$warmColorLightnessCache(label.color));
					}),
				model.colorLightnessCache,
				model.allLabels)
		});
};
var $elm$core$Dict$singleton = F2(
	function (key, value) {
		return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, key, value, $elm$core$Dict$RBEmpty_elm_builtin, $elm$core$Dict$RBEmpty_elm_builtin);
	});
var $elm$core$String$toLower = _String_toLower;
var $author$project$Main$computeDataView = function (model) {
	var setRepoLabelId = F3(
		function (label, repoId, mrc) {
			if (mrc.$ === 'Just') {
				var rc = mrc.a;
				return $elm$core$Maybe$Just(
					A3($elm$core$Dict$insert, repoId, label.id, rc));
			} else {
				return $elm$core$Maybe$Just(
					A2($elm$core$Dict$singleton, repoId, label.id));
			}
		});
	var reposByName = A3(
		$elm$core$Dict$foldl,
		F2(
			function (id, _v3) {
				var name = _v3.name;
				return A2($elm$core$Dict$insert, name, id);
			}),
		$elm$core$Dict$empty,
		model.repos);
	var repoProjectTemplates = A2(
		$elm$core$Dict$map,
		function (_v2) {
			return $elm$core$List$filter(
				A2(
					$elm$core$Basics$composeL,
					$elm$core$String$startsWith('Template:'),
					function ($) {
						return $.name;
					}));
		},
		model.repoProjects);
	var groupRepoLabels = A3(
		$elm$core$Dict$foldl,
		F3(
			function (repoId, labels, cbn) {
				return A3(
					$elm$core$List$foldl,
					function (label) {
						return A2(
							$elm$core$Dict$update,
							_Utils_Tuple2(
								label.name,
								$elm$core$String$toLower(label.color)),
							$author$project$Main$addToList(repoId));
					},
					cbn,
					labels);
			}),
		$elm$core$Dict$empty,
		model.repoLabels);
	var groupLabelsToRepoToId = A3(
		$elm$core$Dict$foldl,
		F3(
			function (repoId, labels, lrc) {
				return A3(
					$elm$core$List$foldl,
					function (label) {
						return A2(
							$elm$core$Dict$update,
							label.name,
							A2(setRepoLabelId, label, repoId));
					},
					lrc,
					labels);
			}),
		$elm$core$Dict$empty,
		model.repoLabels);
	var allProjects = $elm$core$List$concat(
		$elm$core$Dict$values(model.repoProjects));
	var idsByUrl = A3(
		$elm$core$List$foldl,
		function (_v1) {
			var id = _v1.id;
			var url = _v1.url;
			return A2($elm$core$Dict$insert, url, id);
		},
		model.idsByUrl,
		allProjects);
	var projects = A3(
		$elm$core$List$foldl,
		function (project) {
			return A2($elm$core$Dict$insert, project.id, project);
		},
		$elm$core$Dict$empty,
		allProjects);
	var allLabels = A3(
		$elm$core$Dict$foldl,
		F3(
			function (_v0, labels, als) {
				return A3(
					$elm$core$List$foldl,
					function (label) {
						return A2(
							$elm$core$Dict$insert,
							label.id,
							_Utils_update(
								label,
								{
									color: $elm$core$String$toLower(label.color)
								}));
					},
					als,
					labels);
			}),
		$elm$core$Dict$empty,
		model.repoLabels);
	return $author$project$Label$cacheColorLightness(
		_Utils_update(
			model,
			{allLabels: allLabels, idsByUrl: idsByUrl, labelToRepoToId: groupLabelsToRepoToId, projects: projects, repoProjectTemplates: repoProjectTemplates, reposByLabel: groupRepoLabels, reposByName: reposByName}));
};
var $author$project$Main$byAssignees = function () {
	var addCard = F2(
		function (card, val) {
			if (val.$ === 'Nothing') {
				return $elm$core$Maybe$Just(
					{
						assignees: card.assignees,
						cards: _List_fromArray(
							[card])
					});
			} else {
				var lane = val.a;
				return $elm$core$Maybe$Just(
					_Utils_update(
						lane,
						{
							cards: A2($elm$core$List$cons, card, lane.cards)
						}));
			}
		});
	var groupByAssignees = F2(
		function (card, groups) {
			return A3(
				$elm$core$Dict$update,
				$elm$core$List$sort(
					A2(
						$elm$core$List$map,
						function ($) {
							return $.id;
						},
						card.assignees)),
				addCard(card),
				groups);
		});
	return A2(
		$elm$core$Basics$composeR,
		A2($elm$core$List$foldl, groupByAssignees, $elm$core$Dict$empty),
		A2(
			$elm$core$Basics$composeR,
			$elm$core$Dict$values,
			A2(
				$elm$core$Basics$composeR,
				$elm$core$List$sortBy(
					function (_v0) {
						var assignees = _v0.assignees;
						var cards = _v0.cards;
						return _Utils_Tuple2(
							$elm$core$List$length(assignees),
							$elm$core$List$length(cards));
					}),
				$elm$core$List$reverse)));
}();
var $author$project$Card$isOpen = function (card) {
	var _v0 = card.state;
	_v0$2:
	while (true) {
		if (_v0.$ === 'IssueState') {
			if (_v0.a.$ === 'IssueStateOpen') {
				var _v1 = _v0.a;
				return true;
			} else {
				break _v0$2;
			}
		} else {
			if (_v0.a.$ === 'PullRequestStateOpen') {
				var _v2 = _v0.a;
				return true;
			} else {
				break _v0$2;
			}
		}
	}
	return false;
};
var $elm_community$list_extra$List$Extra$find = F2(
	function (predicate, list) {
		find:
		while (true) {
			if (!list.b) {
				return $elm$core$Maybe$Nothing;
			} else {
				var first = list.a;
				var rest = list.b;
				if (predicate(first)) {
					return $elm$core$Maybe$Just(first);
				} else {
					var $temp$predicate = predicate,
						$temp$list = rest;
					predicate = $temp$predicate;
					list = $temp$list;
					continue find;
				}
			}
		}
	});
var $author$project$CardView$projectProgress = F2(
	function (model, project) {
		var cardCount = function (col) {
			return A2(
				$elm$core$Maybe$withDefault,
				0,
				A2(
					$elm$core$Maybe$map,
					$elm$core$List$length,
					A2($elm$core$Dict$get, col.id, model.columnCards)));
		};
		var countPurpose = function (purpose) {
			return A2(
				$elm$core$Maybe$withDefault,
				0,
				A2(
					$elm$core$Maybe$map,
					cardCount,
					A2(
						$elm_community$list_extra$List$Extra$find,
						A2(
							$elm$core$Basics$composeL,
							$elm$core$Basics$eq(
								$elm$core$Maybe$Just(purpose)),
							function ($) {
								return $.purpose;
							}),
						project.columns)));
		};
		var dones = countPurpose($author$project$GitHub$ProjectColumnPurposeDone);
		var inProgresses = countPurpose($author$project$GitHub$ProjectColumnPurposeInProgress);
		var toDos = countPurpose($author$project$GitHub$ProjectColumnPurposeToDo);
		return _Utils_Tuple3(toDos, inProgresses, dones);
	});
var $author$project$Main$projectProgress = F2(
	function (model, project) {
		var _v0 = A2($author$project$CardView$projectProgress, model, project);
		var toDos = _v0.a;
		var inProgresses = _v0.b;
		var dones = _v0.c;
		return dones / ((toDos + inProgresses) + dones);
	});
var $author$project$Main$reflectPendingAssignments = F2(
	function (model, card) {
		var newAssignees = function () {
			var _v0 = A2($elm$core$Dict$get, card.id, model.pendingAssignments);
			if (_v0.$ === 'Nothing') {
				return card.assignees;
			} else {
				var assign = _v0.a.assign;
				var unassign = _v0.a.unassign;
				var unaffected = function (_v1) {
					var id = _v1.id;
					return !A2(
						$elm$core$List$any,
						A2(
							$elm$core$Basics$composeL,
							$elm$core$Basics$eq(id),
							function ($) {
								return $.id;
							}),
						_Utils_ap(assign, unassign));
				};
				return _Utils_ap(
					assign,
					A2($elm$core$List$filter, unaffected, card.assignees));
			}
		}();
		return _Utils_update(
			card,
			{assignees: newAssignees});
	});
var $author$project$Main$computeProjectLanes = function (model) {
	var isInProgress = function (_v3) {
		var purpose = _v3.purpose;
		_v0$2:
		while (true) {
			if (purpose.$ === 'Just') {
				switch (purpose.a.$) {
					case 'ProjectColumnPurposeInProgress':
						var _v1 = purpose.a;
						return true;
					case 'ProjectColumnPurposeDone':
						var _v2 = purpose.a;
						return true;
					default:
						break _v0$2;
				}
			} else {
				break _v0$2;
			}
		}
		return false;
	};
	var columnCards = function (col) {
		return A2(
			$elm$core$List$filter,
			$author$project$Card$isOpen,
			A2(
				$elm$core$List$filterMap,
				function (id) {
					return A2($elm$core$Dict$get, id, model.cards);
				},
				A2(
					$elm$core$List$filterMap,
					function ($) {
						return $.contentId;
					},
					A2(
						$elm$core$Maybe$withDefault,
						_List_Nil,
						A2($elm$core$Dict$get, col.id, model.columnCards)))));
	};
	var inFlightCards = function (project) {
		var projectCards = A2(
			$elm$core$List$map,
			$author$project$Main$reflectPendingAssignments(model),
			A2(
				$elm$core$List$concatMap,
				columnCards,
				A2($elm$core$List$filter, isInProgress, project.columns)));
		return $elm$core$List$isEmpty(projectCards) ? $elm$core$Maybe$Nothing : $elm$core$Maybe$Just(
			{
				lanes: $author$project$Main$byAssignees(projectCards),
				project: project
			});
	};
	return _Utils_update(
		model,
		{
			inFlight: $elm$core$List$reverse(
				A2(
					$elm$core$List$sortBy,
					A2(
						$elm$core$Basics$composeL,
						$author$project$Main$projectProgress(model),
						function ($) {
							return $.project;
						}),
					A2(
						$elm$core$List$filterMap,
						inFlightCards,
						$elm$core$List$concat(
							$elm$core$Dict$values(model.repoProjects)))))
		});
};
var $author$project$Model$InProjectFilter = function (a) {
	return {$: 'InProjectFilter', a: a};
};
var $author$project$ReleaseStatus$categorizeByCardState = F2(
	function (card, sir) {
		var _v0 = card.state;
		if (_v0.$ === 'IssueState') {
			if (_v0.a.$ === 'IssueStateOpen') {
				var _v1 = _v0.a;
				return _Utils_update(
					sir,
					{
						openIssues: A2($elm$core$List$cons, card, sir.openIssues)
					});
			} else {
				var _v2 = _v0.a;
				return _Utils_update(
					sir,
					{
						closedIssues: A2($elm$core$List$cons, card, sir.closedIssues)
					});
			}
		} else {
			switch (_v0.a.$) {
				case 'PullRequestStateOpen':
					var _v3 = _v0.a;
					return _Utils_update(
						sir,
						{
							openPRs: A2($elm$core$List$cons, card, sir.openPRs)
						});
				case 'PullRequestStateMerged':
					var _v4 = _v0.a;
					return _Utils_update(
						sir,
						{
							mergedPRs: A2($elm$core$List$cons, card, sir.mergedPRs)
						});
				default:
					var _v5 = _v0.a;
					return sir;
			}
		}
	});
var $author$project$ReleaseStatus$categorizeByDocumentedState = F3(
	function (model, card, sir) {
		return A3($author$project$Label$cardHasLabel, model, 'release/documented', card) ? _Utils_update(
			sir,
			{
				documentedCards: A2($elm$core$List$cons, card, sir.documentedCards)
			}) : (A3($author$project$Label$cardHasLabel, model, 'release/undocumented', card) ? _Utils_update(
			sir,
			{
				undocumentedCards: A2($elm$core$List$cons, card, sir.undocumentedCards)
			}) : (A3($author$project$Label$cardHasLabel, model, 'release/no-impact', card) ? _Utils_update(
			sir,
			{
				noImpactCards: A2($elm$core$List$cons, card, sir.noImpactCards)
			}) : _Utils_update(
			sir,
			{
				doneCards: A2($elm$core$List$cons, card, sir.doneCards)
			})));
	});
var $author$project$ReleaseStatus$categorizeCard = F3(
	function (model, card, sir) {
		var byState = A2($author$project$ReleaseStatus$categorizeByCardState, card, sir);
		return $author$project$Card$isOpen(card) ? byState : A3($author$project$ReleaseStatus$categorizeByDocumentedState, model, card, byState);
	});
var $elm$core$String$replace = F3(
	function (before, after, string) {
		return A2(
			$elm$core$String$join,
			after,
			A2($elm$core$String$split, before, string));
	});
var $author$project$ReleaseStatus$refMajorMinor = A2(
	$elm$core$Basics$composeR,
	A2($elm$core$String$replace, 'refs/heads/release/', ''),
	A2($elm$core$String$replace, '.x', ''));
var $author$project$ReleaseStatus$findMatchingMilestone = F2(
	function (ref, milestones) {
		var titlePrefix = 'v' + $author$project$ReleaseStatus$refMajorMinor(ref);
		return A2(
			$elm_community$list_extra$List$Extra$find,
			A2(
				$elm$core$Basics$composeL,
				$elm$core$String$startsWith(titlePrefix),
				function ($) {
					return $.title;
				}),
			milestones);
	});
var $author$project$Card$isMerged = function (card) {
	return _Utils_eq(
		card.state,
		$author$project$Card$PullRequestState($author$project$GitHub$PullRequestStateMerged));
};
var $author$project$ReleaseStatus$issueOrOpenPR = F2(
	function (model, cardId) {
		return A2(
			$elm$core$Maybe$andThen,
			function (card) {
				return $author$project$Card$isMerged(card) ? $elm$core$Maybe$Nothing : $elm$core$Maybe$Just(card);
			},
			A2($elm$core$Dict$get, cardId, model.cards));
	});
var $author$project$ReleaseStatus$milestoneCards = F2(
	function (model, milestone) {
		return A2(
			$elm$core$List$filterMap,
			$author$project$ReleaseStatus$issueOrOpenPR(model),
			A2(
				$elm$core$Maybe$withDefault,
				_List_Nil,
				A2($elm$core$Dict$get, milestone.id, model.cardsByMilestone)));
	});
var $elm$core$String$endsWith = _String_endsWith;
var $author$project$ReleaseStatus$minorMilestone = function (_v0) {
	var title = _v0.title;
	return A2($elm$core$String$startsWith, 'v', title) && A2($elm$core$String$endsWith, '.0', title);
};
var $elm$core$Set$member = F2(
	function (key, _v0) {
		var dict = _v0.a;
		return A2($elm$core$Dict$member, key, dict);
	});
var $elm_community$list_extra$List$Extra$uniqueHelp = F4(
	function (f, existing, remaining, accumulator) {
		uniqueHelp:
		while (true) {
			if (!remaining.b) {
				return $elm$core$List$reverse(accumulator);
			} else {
				var first = remaining.a;
				var rest = remaining.b;
				var computedFirst = f(first);
				if (A2($elm$core$Set$member, computedFirst, existing)) {
					var $temp$f = f,
						$temp$existing = existing,
						$temp$remaining = rest,
						$temp$accumulator = accumulator;
					f = $temp$f;
					existing = $temp$existing;
					remaining = $temp$remaining;
					accumulator = $temp$accumulator;
					continue uniqueHelp;
				} else {
					var $temp$f = f,
						$temp$existing = A2($elm$core$Set$insert, computedFirst, existing),
						$temp$remaining = rest,
						$temp$accumulator = A2($elm$core$List$cons, first, accumulator);
					f = $temp$f;
					existing = $temp$existing;
					remaining = $temp$remaining;
					accumulator = $temp$accumulator;
					continue uniqueHelp;
				}
			}
		}
	});
var $elm_community$list_extra$List$Extra$unique = function (list) {
	return A4($elm_community$list_extra$List$Extra$uniqueHelp, $elm$core$Basics$identity, $elm$core$Set$empty, list, _List_Nil);
};
var $author$project$ReleaseStatus$initFromCommits = F4(
	function (model, repo, ref, _v0) {
		var lastRelease = _v0.lastRelease;
		var commits = _v0.commits;
		var openMilestones = A2(
			$elm$core$List$filter,
			A2(
				$elm$core$Basics$composeL,
				$elm$core$Basics$eq($author$project$GitHub$MilestoneStateOpen),
				function ($) {
					return $.state;
				}),
			A2(
				$elm$core$Maybe$withDefault,
				_List_Nil,
				A2($elm$core$Dict$get, repo.id, model.repoMilestones)));
		var milestone = (ref === 'refs/heads/master') ? $elm$core$List$head(
			A2(
				$elm$core$List$sortBy,
				function ($) {
					return $.title;
				},
				A2($elm$core$List$filter, $author$project$ReleaseStatus$minorMilestone, openMilestones))) : A2($author$project$ReleaseStatus$findMatchingMilestone, ref, openMilestones);
		var mergedPRCards = A2(
			$elm$core$List$filterMap,
			function (id) {
				return A2($elm$core$Dict$get, id, model.cards);
			},
			$elm_community$list_extra$List$Extra$unique(
				A2(
					$elm$core$List$concatMap,
					function ($) {
						return $.associatedPullRequests;
					},
					commits)));
		var allCards = _Utils_ap(
			A2(
				$elm$core$Maybe$withDefault,
				_List_Nil,
				A2(
					$elm$core$Maybe$map,
					$author$project$ReleaseStatus$milestoneCards(model),
					milestone)),
			mergedPRCards);
		return A3(
			$elm$core$List$foldl,
			$author$project$ReleaseStatus$categorizeCard(model),
			{
				closedIssues: _List_Nil,
				documentedCards: _List_Nil,
				doneCards: _List_Nil,
				issue: A2(
					$elm_community$list_extra$List$Extra$find,
					A2($author$project$Label$cardHasLabel, model, 'release'),
					allCards),
				lastRelease: $elm$core$Maybe$Just(lastRelease),
				mergedPRs: _List_Nil,
				milestone: milestone,
				noImpactCards: _List_Nil,
				openIssues: _List_Nil,
				openPRs: _List_Nil,
				ref: $elm$core$Maybe$Just(ref),
				repo: repo,
				totalCommits: $elm$core$List$length(commits),
				undocumentedCards: _List_Nil
			},
			allCards);
	});
var $author$project$ReleaseStatus$initFromMilestone = F3(
	function (model, repo, milestone) {
		return A3(
			$elm$core$List$foldl,
			$author$project$ReleaseStatus$categorizeCard(model),
			{
				closedIssues: _List_Nil,
				documentedCards: _List_Nil,
				doneCards: _List_Nil,
				issue: $elm$core$Maybe$Nothing,
				lastRelease: $elm$core$Maybe$Nothing,
				mergedPRs: _List_Nil,
				milestone: $elm$core$Maybe$Just(milestone),
				noImpactCards: _List_Nil,
				openIssues: _List_Nil,
				openPRs: _List_Nil,
				ref: $elm$core$Maybe$Nothing,
				repo: repo,
				totalCommits: 0,
				undocumentedCards: _List_Nil
			},
			A2($author$project$ReleaseStatus$milestoneCards, model, milestone));
	});
var $author$project$ReleaseStatus$isEmpty = function (_v0) {
	var milestone = _v0.milestone;
	var totalCommits = _v0.totalCommits;
	return _Utils_eq(milestone, $elm$core$Maybe$Nothing) && (!totalCommits);
};
var $elm_community$maybe_extra$Maybe$Extra$foldrValues = F2(
	function (item, list) {
		if (item.$ === 'Nothing') {
			return list;
		} else {
			var v = item.a;
			return A2($elm$core$List$cons, v, list);
		}
	});
var $elm_community$maybe_extra$Maybe$Extra$values = A2($elm$core$List$foldr, $elm_community$maybe_extra$Maybe$Extra$foldrValues, _List_Nil);
var $author$project$ReleaseStatus$init = F2(
	function (model, repo) {
		var refReleases = A2(
			$elm$core$List$filter,
			A2($elm$core$Basics$composeL, $elm$core$Basics$not, $author$project$ReleaseStatus$isEmpty),
			$elm$core$Dict$values(
				A2(
					$elm$core$Dict$map,
					A2($author$project$ReleaseStatus$initFromCommits, model, repo),
					A2(
						$elm$core$Maybe$withDefault,
						$elm$core$Dict$empty,
						A2($elm$core$Dict$get, repo.id, model.repoCommits)))));
		var alreadyRefMilestone = function (m) {
			return A2(
				$elm$core$List$any,
				A2(
					$elm$core$Basics$composeL,
					$elm$core$Basics$eq(m.id),
					function ($) {
						return $.id;
					}),
				$elm_community$maybe_extra$Maybe$Extra$values(
					A2(
						$elm$core$List$map,
						function ($) {
							return $.milestone;
						},
						refReleases)));
		};
		var nakedMilestones = A2(
			$elm$core$List$map,
			A2($author$project$ReleaseStatus$initFromMilestone, model, repo),
			A2(
				$elm$core$List$filter,
				A2($elm$core$Basics$composeL, $elm$core$Basics$not, alreadyRefMilestone),
				A2(
					$elm$core$List$filter,
					A2(
						$elm$core$Basics$composeL,
						$elm$core$Basics$eq($author$project$GitHub$MilestoneStateOpen),
						function ($) {
							return $.state;
						}),
					A2(
						$elm$core$Maybe$withDefault,
						_List_Nil,
						A2($elm$core$Dict$get, repo.id, model.repoMilestones)))));
		return _Utils_ap(refReleases, nakedMilestones);
	});
var $author$project$Main$computeRepoStatuses = function (model) {
	var add = F3(
		function (_v0, repo, acc) {
			var releaseStatuses = A2($author$project$ReleaseStatus$init, model, repo);
			return $elm$core$List$isEmpty(releaseStatuses) ? acc : A3($elm$core$Dict$insert, repo.name, releaseStatuses, acc);
		});
	return _Utils_update(
		model,
		{
			repoReleaseStatuses: A3($elm$core$Dict$foldl, add, $elm$core$Dict$empty, model.repos)
		});
};
var $author$project$StatefulGraph$graphAllActivityCompare = F3(
	function (model, a, b) {
		var latestActivity = A2(
			$elm$core$List$foldl,
			F2(
				function (_v0, latest) {
					var card = _v0.card;
					var updated = $elm$time$Time$posixToMillis(card.updatedAt);
					var mlatest = A2(
						$elm$core$Maybe$map,
						A2(
							$elm$core$Basics$composeR,
							function ($) {
								return $.createdAt;
							},
							$elm$time$Time$posixToMillis),
						A2(
							$elm$core$Maybe$andThen,
							$elm$core$List$head,
							A2($elm$core$Dict$get, card.id, model.cardEvents)));
					if (mlatest.$ === 'Just') {
						var activity = mlatest.a;
						return A2($elm$core$Basics$max, activity, latest);
					} else {
						return A2($elm$core$Basics$max, updated, latest);
					}
				}),
			0);
		return A2(
			$elm$core$Basics$compare,
			latestActivity(a),
			latestActivity(b));
	});
var $author$project$StatefulGraph$graphImpactCompare = F2(
	function (a, b) {
		var _v0 = A2(
			$elm$core$Basics$compare,
			$elm$core$List$length(a),
			$elm$core$List$length(b));
		if (_v0.$ === 'EQ') {
			var graphScore = A2(
				$elm$core$List$foldl,
				F2(
					function (_v1, sum) {
						var card = _v1.card;
						return card.score + sum;
					}),
				0);
			return A2(
				$elm$core$Basics$compare,
				graphScore(a),
				graphScore(b));
		} else {
			var x = _v0;
			return x;
		}
	});
var $elm$core$Dict$isEmpty = function (dict) {
	if (dict.$ === 'RBEmpty_elm_builtin') {
		return true;
	} else {
		return false;
	}
};
var $elm$core$Set$isEmpty = function (_v0) {
	var dict = _v0.a;
	return $elm$core$Dict$isEmpty(dict);
};
var $author$project$StatefulGraph$baseGraphState = function (model) {
	return {allLabels: model.allLabels, anticipatedCards: $elm$core$Set$empty, currentTime: model.currentTime, highlightedNode: $elm$core$Maybe$Nothing, prReviewers: model.prReviewers, selectedCards: $y0hy0h$ordered_containers$OrderedSet$empty};
};
var $elm_community$intdict$IntDict$foldl = F3(
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
						$temp$acc = A3($elm_community$intdict$IntDict$foldl, f, acc, i.left),
						$temp$dict = i.right;
					f = $temp$f;
					acc = $temp$acc;
					dict = $temp$dict;
					continue foldl;
			}
		}
	});
var $author$project$ForceGraph$fold = F3(
	function (f, init, _v0) {
		var nodes = _v0.nodes;
		return A3(
			$elm_community$intdict$IntDict$foldl,
			function (_v1) {
				return f;
			},
			init,
			nodes);
	});
var $elm$core$Bitwise$and = _Bitwise_and;
var $elm$core$Bitwise$complement = _Bitwise_complement;
var $elm$core$Bitwise$or = _Bitwise_or;
var $elm$core$Bitwise$shiftRightZfBy = _Bitwise_shiftRightZfBy;
var $elm_community$intdict$IntDict$highestBitSet = function (n) {
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
var $elm_community$intdict$IntDict$signBit = $elm_community$intdict$IntDict$highestBitSet(-1);
var $elm$core$Bitwise$xor = _Bitwise_xor;
var $elm_community$intdict$IntDict$isBranchingBitSet = function (p) {
	return A2(
		$elm$core$Basics$composeR,
		$elm$core$Bitwise$xor($elm_community$intdict$IntDict$signBit),
		A2(
			$elm$core$Basics$composeR,
			$elm$core$Bitwise$and(p.branchingBit),
			$elm$core$Basics$neq(0)));
};
var $elm_community$intdict$IntDict$higherBitMask = function (branchingBit) {
	return branchingBit ^ (~(branchingBit - 1));
};
var $elm_community$intdict$IntDict$prefixMatches = F2(
	function (p, n) {
		return _Utils_eq(
			n & $elm_community$intdict$IntDict$higherBitMask(p.branchingBit),
			p.prefixBits);
	});
var $elm_community$intdict$IntDict$get = F2(
	function (key, dict) {
		get:
		while (true) {
			switch (dict.$) {
				case 'Empty':
					return $elm$core$Maybe$Nothing;
				case 'Leaf':
					var l = dict.a;
					return _Utils_eq(l.key, key) ? $elm$core$Maybe$Just(l.value) : $elm$core$Maybe$Nothing;
				default:
					var i = dict.a;
					if (!A2($elm_community$intdict$IntDict$prefixMatches, i.prefix, key)) {
						return $elm$core$Maybe$Nothing;
					} else {
						if (A2($elm_community$intdict$IntDict$isBranchingBitSet, i.prefix, key)) {
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
var $author$project$ForceGraph$get = F2(
	function (id, _v0) {
		var nodes = _v0.nodes;
		return A2($elm_community$intdict$IntDict$get, id, nodes);
	});
var $elm$core$List$all = F2(
	function (isOkay, list) {
		return !A2(
			$elm$core$List$any,
			A2($elm$core$Basics$composeL, $elm$core$Basics$not, isOkay),
			list);
	});
var $author$project$StatefulGraph$hasLabelAndColor = F4(
	function (model, name, color, card) {
		var matchingLabels = A2(
			$elm$core$Dict$filter,
			F2(
				function (_v0, l) {
					return _Utils_eq(l.name, name) && _Utils_eq(l.color, color);
				}),
			model.allLabels);
		return A2(
			$elm$core$List$any,
			function (a) {
				return A2($elm$core$Dict$member, a, matchingLabels);
			},
			card.labels);
	});
var $author$project$StatefulGraph$involvesUser = F3(
	function (model, login, card) {
		return A2(
			$elm$core$List$any,
			A2(
				$elm$core$Basics$composeR,
				function ($) {
					return $.user;
				},
				A2(
					$elm$core$Basics$composeR,
					$elm$core$Maybe$map(
						function ($) {
							return $.login;
						}),
					$elm$core$Basics$eq(
						$elm$core$Maybe$Just(login)))),
			A2(
				$elm$core$Maybe$withDefault,
				_List_Nil,
				A2($elm$core$Dict$get, card.id, model.cardEvents)));
	});
var $author$project$StatefulGraph$isInProject = F2(
	function (id, card) {
		var matchesProject = function (_v0) {
			var project = _v0.project;
			return _Utils_eq(project.id, id);
		};
		return A2($elm$core$List$any, matchesProject, card.cards);
	});
var $author$project$Card$isPR = function (card) {
	var _v0 = card.state;
	if (_v0.$ === 'PullRequestState') {
		return true;
	} else {
		return false;
	}
};
var $author$project$Card$isUntriaged = function (card) {
	return card.processState.hasTriageLabel;
};
var $author$project$StatefulGraph$satisfiesFilter = F3(
	function (model, filter, card) {
		switch (filter.$) {
			case 'ExcludeAllFilter':
				return false;
			case 'InProjectFilter':
				var id = filter.a;
				return A2($author$project$StatefulGraph$isInProject, id, card);
			case 'HasLabelFilter':
				var label = filter.a;
				var color = filter.b;
				return A4($author$project$StatefulGraph$hasLabelAndColor, model, label, color, card);
			case 'InvolvesUserFilter':
				var login = filter.a;
				return A3($author$project$StatefulGraph$involvesUser, model, login, card);
			case 'PullRequestsFilter':
				return $author$project$Card$isPR(card);
			case 'IssuesFilter':
				return !$author$project$Card$isPR(card);
			default:
				return $author$project$Card$isUntriaged(card);
		}
	});
var $author$project$StatefulGraph$satisfiesFilters = F3(
	function (model, filters, card) {
		return A2(
			$elm$core$List$all,
			function (a) {
				return A3($author$project$StatefulGraph$satisfiesFilter, model, a, card);
			},
			filters);
	});
var $author$project$StatefulGraph$statefulGraph = F2(
	function (model, fg) {
		var allFilters = function () {
			var _v5 = model.baseGraphFilter;
			if (_v5.$ === 'Just') {
				var f = _v5.a;
				return A2($elm$core$List$cons, f, model.graphFilters);
			} else {
				return model.graphFilters;
			}
		}();
		var _v0 = A3(
			$author$project$ForceGraph$fold,
			F2(
				function (node, _v1) {
					var ns = _v1.a;
					var ms = _v1.b;
					var _v2 = A2($elm$core$Dict$get, node.value, model.cards);
					if (_v2.$ === 'Just') {
						var card = _v2.a;
						var satisfies = A3($author$project$StatefulGraph$satisfiesFilters, model, allFilters, card);
						return _Utils_Tuple2(
							A2(
								$elm$core$List$cons,
								{card: card, filteredOut: !satisfies, mass: node.mass, x: node.x, y: node.y},
								ns),
							satisfies ? A2($elm$core$Set$insert, node.id, ms) : ms);
					} else {
						return _Utils_Tuple2(ns, ms);
					}
				}),
			_Utils_Tuple2(_List_Nil, $elm$core$Set$empty),
			fg);
		var nodes = _v0.a;
		var matches = _v0.b;
		var edges = A2(
			$elm$core$List$filterMap,
			function (_v3) {
				var from = _v3.a;
				var to = _v3.b;
				var _v4 = _Utils_Tuple2(
					A2($author$project$ForceGraph$get, from, fg),
					A2($author$project$ForceGraph$get, to, fg));
				if ((_v4.a.$ === 'Just') && (_v4.b.$ === 'Just')) {
					var fromNode = _v4.a.a;
					var toNode = _v4.b.a;
					return $elm$core$Maybe$Just(
						{
							filteredOut: !(A2($elm$core$Set$member, from, matches) && A2($elm$core$Set$member, to, matches)),
							source: {x: fromNode.x, y: fromNode.y},
							target: {x: toNode.x, y: toNode.y}
						});
				} else {
					return $elm$core$Maybe$Nothing;
				}
			},
			fg.edges);
		return {
			edges: edges,
			matches: matches,
			nodes: nodes,
			state: $author$project$StatefulGraph$baseGraphState(model)
		};
	});
var $author$project$StatefulGraph$init = function (model) {
	var statefulGraphs = A2(
		$elm$core$List$map,
		$author$project$StatefulGraph$statefulGraph(model),
		model.graphs);
	var sortFunc = F2(
		function (a, b) {
			var _v0 = model.graphSort;
			if (_v0.$ === 'ImpactSort') {
				return A2($author$project$StatefulGraph$graphImpactCompare, a.nodes, b.nodes);
			} else {
				return A3($author$project$StatefulGraph$graphAllActivityCompare, model, a.nodes, b.nodes);
			}
		});
	var filteredGraphs = A2(
		$elm$core$List$filter,
		A2(
			$elm$core$Basics$composeL,
			A2($elm$core$Basics$composeL, $elm$core$Basics$not, $elm$core$Set$isEmpty),
			function ($) {
				return $.matches;
			}),
		statefulGraphs);
	return _Utils_update(
		model,
		{
			statefulGraphs: $elm$core$List$reverse(
				A2($elm$core$List$sortWith, sortFunc, filteredGraphs))
		});
};
var $y0hy0h$ordered_containers$OrderedSet$isEmpty = function (oset) {
	return _Utils_eq(oset, $y0hy0h$ordered_containers$OrderedSet$empty);
};
var $author$project$StatefulGraph$isBaseGraphState = F2(
	function (model, state) {
		return _Utils_eq(state.currentTime, model.currentTime) && ($elm$core$Set$isEmpty(state.anticipatedCards) && ($y0hy0h$ordered_containers$OrderedSet$isEmpty(state.selectedCards) && _Utils_eq(state.highlightedNode, $elm$core$Maybe$Nothing)));
	});
var $y0hy0h$ordered_containers$OrderedSet$member = F2(
	function (key, _v0) {
		var dict = _v0.b;
		return A2($elm$core$Dict$member, key, dict);
	});
var $author$project$StatefulGraph$update = function (model) {
	var newState = {allLabels: model.allLabels, anticipatedCards: model.anticipatedCards, currentTime: model.currentTime, highlightedNode: model.highlightedNode, prReviewers: model.prReviewers, selectedCards: model.selectedCards};
	var affectedByState = $elm$core$List$any(
		function (_v0) {
			var card = _v0.card;
			return A2($y0hy0h$ordered_containers$OrderedSet$member, card.id, newState.selectedCards) || (A2($elm$core$Set$member, card.id, newState.anticipatedCards) || _Utils_eq(
				newState.highlightedNode,
				$elm$core$Maybe$Just(card.id)));
		});
	return _Utils_update(
		model,
		{
			statefulGraphs: A2(
				$elm$core$List$map,
				function (sg) {
					return affectedByState(sg.nodes) ? _Utils_update(
						sg,
						{state: newState}) : (A2($author$project$StatefulGraph$isBaseGraphState, model, sg.state) ? sg : _Utils_update(
						sg,
						{
							state: $author$project$StatefulGraph$baseGraphState(model)
						}));
				},
				model.statefulGraphs)
		});
};
var $author$project$Main$computeViewForPage = function (model) {
	var reset = _Utils_update(
		model,
		{baseGraphFilter: $elm$core$Maybe$Nothing, inFlight: _List_Nil, suggestedLabels: _List_Nil});
	var _v0 = model.page;
	switch (_v0.$) {
		case 'GlobalGraphPage':
			return $author$project$StatefulGraph$update(
				$author$project$StatefulGraph$init(reset));
		case 'ProjectPage':
			var id = _v0.a;
			var _v1 = A2($elm$core$Dict$get, id, model.projects);
			if (_v1.$ === 'Just') {
				var project = _v1.a;
				return $author$project$StatefulGraph$update(
					$author$project$StatefulGraph$init(
						_Utils_update(
							reset,
							{
								baseGraphFilter: $elm$core$Maybe$Just(
									$author$project$Model$InProjectFilter(project.id))
							})));
			} else {
				return reset;
			}
		case 'ReleasesPage':
			return $author$project$Main$computeRepoStatuses(reset);
		case 'ReleasePage':
			return $author$project$Main$computeRepoStatuses(
				_Utils_update(
					reset,
					{
						suggestedLabels: _List_fromArray(
							['release/documented', 'release/undocumented', 'release/no-impact'])
					}));
		case 'PairsPage':
			return $author$project$Main$computeProjectLanes(reset);
		default:
			return reset;
	}
};
var $author$project$GitHub$convertProjectCardNoteToIssueMutation = function () {
	var titleVar = A3(
		$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$required,
		'title',
		function ($) {
			return $.title;
		},
		$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$string);
	var repoIDVar = A3(
		$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$required,
		'repoId',
		function ($) {
			return $.repoId;
		},
		$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$id);
	var cardIDVar = A3(
		$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$required,
		'cardId',
		function ($) {
			return $.cardId;
		},
		$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$id);
	var bodyVar = A3(
		$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$required,
		'body',
		function ($) {
			return $.body;
		},
		$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$string);
	return $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$mutationDocument(
		$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$extract(
			A3(
				$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
				'convertProjectCardNoteToIssue',
				_List_fromArray(
					[
						_Utils_Tuple2(
						'input',
						$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$object(
							_List_fromArray(
								[
									_Utils_Tuple2(
									'projectCardId',
									$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$variable(cardIDVar)),
									_Utils_Tuple2(
									'repositoryId',
									$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$variable(repoIDVar)),
									_Utils_Tuple2(
									'title',
									$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$variable(titleVar)),
									_Utils_Tuple2(
									'body',
									$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$variable(bodyVar))
								])))
					]),
				$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$extract(
					A3($jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'projectCard', _List_Nil, $author$project$GitHub$projectColumnCardObject)))));
}();
var $author$project$GitHub$convertCardToIssue = F5(
	function (token, cardID, repoID, title, body) {
		return A2(
			$jamesmacaulay$elm_graphql$GraphQL$Client$Http$customSendMutation,
			$author$project$GitHub$authedOptions(token),
			A2(
				$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$request,
				{body: body, cardId: cardID, repoId: repoID, title: title},
				$author$project$GitHub$convertProjectCardNoteToIssueMutation));
	});
var $elm$core$Platform$Cmd$none = $elm$core$Platform$Cmd$batch(_List_Nil);
var $author$project$Effects$refreshColumnCards = function (id) {
	return A2(
		$author$project$Effects$withSetLoading,
		_List_fromArray(
			[id]),
		A2($author$project$Backend$refreshCards, id, $author$project$Model$RefreshQueued));
};
var $author$project$Effects$convertNoteToIssue = F5(
	function (model, cardId, repoId, title, body) {
		return A2(
			$author$project$Effects$withTokenOrLogIn,
			model,
			function (token) {
				var refreshColumn = function (res) {
					if (res.$ === 'Ok') {
						var columnId = res.a.columnId;
						return A2(
							$author$project$Model$DataChanged,
							$author$project$Effects$refreshColumnCards(columnId),
							$elm$core$Result$Ok(_Utils_Tuple0));
					} else {
						var msg = res.a;
						return A2(
							$author$project$Model$DataChanged,
							$elm$core$Platform$Cmd$none,
							$elm$core$Result$Err(msg));
					}
				};
				return A2(
					$author$project$Effects$withSetLoading,
					_List_fromArray(
						[cardId]),
					A2(
						$elm$core$Task$attempt,
						refreshColumn,
						A5($author$project$GitHub$convertCardToIssue, token, cardId, repoId, title, body)));
			});
	});
var $jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$BooleanValue = function (a) {
	return {$: 'BooleanValue', a: a};
};
var $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$TypeRef$boolean = $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$TypeRef$namedType('Boolean');
var $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$bool = A3($jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$VariableSpec, $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$NonNull, $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$TypeRef$boolean, $jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$BooleanValue);
var $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$assume = function (_v0) {
	var ast = _v0.a;
	var decoder = _v0.b;
	var vars = _v0.c;
	var fragments = _v0.d;
	return A4(
		$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$SelectionSpec,
		ast,
		A2(
			$elm$core$Basics$composeR,
			decoder,
			$elm$json$Json$Decode$andThen(
				function (maybeValue) {
					if (maybeValue.$ === 'Just') {
						var value = maybeValue.a;
						return $elm$json$Json$Decode$succeed(value);
					} else {
						return $elm$json$Json$Decode$fail('Expected a selection to be present in the response with `assume`, but found `Nothing`');
					}
				})),
		vars,
		fragments);
};
var $author$project$GitHub$idObject = $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$extract(
	A3($jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'id', _List_Nil, $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string));
var $author$project$GitHub$maybeOr3 = F3(
	function (ma, mb, mc) {
		return A2(
			$elm_community$maybe_extra$Maybe$Extra$or,
			ma,
			A2($elm_community$maybe_extra$Maybe$Extra$or, mb, mc));
	});
var $author$project$GitHub$projectOwnerObject = A2(
	$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
	A2(
		$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$inlineFragment,
		$elm$core$Maybe$Just(
			$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$onType('User')),
		A2($jamesmacaulay$elm_graphql$GraphQL$Request$Builder$map, $author$project$GitHub$ProjectOwnerUser, $author$project$GitHub$idObject)),
	A2(
		$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
		A2(
			$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$inlineFragment,
			$elm$core$Maybe$Just(
				$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$onType('Organization')),
			A2($jamesmacaulay$elm_graphql$GraphQL$Request$Builder$map, $author$project$GitHub$ProjectOwnerOrg, $author$project$GitHub$idObject)),
		A2(
			$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
			A2(
				$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$inlineFragment,
				$elm$core$Maybe$Just(
					$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$onType('Repository')),
				A2($jamesmacaulay$elm_graphql$GraphQL$Request$Builder$map, $author$project$GitHub$ProjectOwnerRepo, $author$project$GitHub$idObject)),
			$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$object($author$project$GitHub$maybeOr3))));
var $author$project$GitHub$projectObject = A2(
	$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
	A3(
		$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
		'columns',
		_List_fromArray(
			[
				_Utils_Tuple2(
				'first',
				$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$int(50))
			]),
		$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$extract(
			A3(
				$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
				'nodes',
				_List_Nil,
				$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$list($author$project$GitHub$columnObject)))),
	A2(
		$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
		A3($jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'body', _List_Nil, $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string),
		A2(
			$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
			A3($jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'number', _List_Nil, $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$int),
			A2(
				$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
				A3($jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'name', _List_Nil, $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string),
				A2(
					$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
					$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$assume(
						A3($jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'owner', _List_Nil, $author$project$GitHub$projectOwnerObject)),
					A2(
						$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
						A3($jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'url', _List_Nil, $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string),
						A2(
							$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
							A3($jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'id', _List_Nil, $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string),
							$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$object($author$project$GitHub$Project))))))));
var $author$project$GitHub$cloneProjectMutation = $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$mutationDocument(
	$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$extract(
		A3(
			$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
			'cloneProject',
			_List_fromArray(
				[
					_Utils_Tuple2(
					'input',
					$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$object(
						_List_fromArray(
							[
								_Utils_Tuple2(
								'sourceId',
								$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$variable(
									A3(
										$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$required,
										'sourceId',
										function ($) {
											return $.sourceId;
										},
										$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$id))),
								_Utils_Tuple2(
								'targetOwnerId',
								$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$variable(
									A3(
										$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$required,
										'targetOwnerId',
										function ($) {
											return $.targetOwnerId;
										},
										$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$id))),
								_Utils_Tuple2(
								'includeWorkflows',
								$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$variable(
									A3(
										$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$required,
										'includeWorkflows',
										function ($) {
											return $.includeWorkflows;
										},
										$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$bool))),
								_Utils_Tuple2(
								'name',
								$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$variable(
									A3(
										$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$required,
										'name',
										function ($) {
											return $.name;
										},
										$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$string))),
								_Utils_Tuple2(
								'body',
								$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$variable(
									A3(
										$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$required,
										'body',
										function ($) {
											return $.body;
										},
										$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$nullable($jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$string)))),
								_Utils_Tuple2(
								'public',
								$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$variable(
									A3(
										$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$required,
										'public',
										function ($) {
											return $._public;
										},
										$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$bool)))
							])))
				]),
			$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$extract(
				A3($jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'project', _List_Nil, $author$project$GitHub$projectObject)))));
var $author$project$GitHub$cloneProject = F2(
	function (token, cpi) {
		return A2(
			$jamesmacaulay$elm_graphql$GraphQL$Client$Http$customSendMutation,
			$author$project$GitHub$authedOptions(token),
			A2($jamesmacaulay$elm_graphql$GraphQL$Request$Builder$request, cpi, $author$project$GitHub$cloneProjectMutation));
	});
var $author$project$Backend$refreshRepoProjects = F2(
	function (repo, f) {
		return A2(
			$elm$core$Task$attempt,
			f,
			$lukewestby$elm_http_builder$HttpBuilder$toTask(
				$lukewestby$elm_http_builder$HttpBuilder$get('/refresh?repoProjects=' + (repo.owner + ('/' + repo.name)))));
	});
var $author$project$Effects$createProjectForIssue = F3(
	function (model, card, templateProject) {
		var repoSelector = {name: card.repo.name, owner: card.repo.owner};
		var cardNumber = $elm$core$String$fromInt(card.number);
		var projectBody = 'Project corresponding to [issue #' + (cardNumber + ('](' + (card.repo.url + ('/issues/' + (cardNumber + ').')))));
		var projectName = A3($elm$core$String$replace, 'Template: ', '', templateProject.name) + (' #' + cardNumber);
		return A2(
			$author$project$Effects$withTokenOrLogIn,
			model,
			function (token) {
				return A2(
					$elm$core$Task$attempt,
					$author$project$Model$DataChanged(
						A2($author$project$Backend$refreshRepoProjects, repoSelector, $author$project$Model$RefreshQueued)),
					A2(
						$elm$core$Task$map,
						$elm$core$Basics$always(_Utils_Tuple0),
						A2(
							$author$project$GitHub$cloneProject,
							token,
							{
								body: $elm$core$Maybe$Just(projectBody),
								includeWorkflows: true,
								name: projectName,
								_public: true,
								sourceId: templateProject.id,
								targetOwnerId: card.repo.id
							})));
			});
	});
var $author$project$GitHub$deleteProjectCardMutation = function () {
	var cardIDVar = A3(
		$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$required,
		'cardId',
		function ($) {
			return $.cardId;
		},
		$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$id);
	return $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$mutationDocument(
		$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$extract(
			A3(
				$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
				'deleteProjectCard',
				_List_fromArray(
					[
						_Utils_Tuple2(
						'input',
						$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$object(
							_List_fromArray(
								[
									_Utils_Tuple2(
									'cardId',
									$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$variable(cardIDVar))
								])))
					]),
				A3(
					$elm$core$Basics$composeL,
					$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$nullable,
					$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$extract,
					A3(
						$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
						'column',
						_List_Nil,
						$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$extract(
							A3($jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'id', _List_Nil, $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string)))))));
}();
var $author$project$GitHub$deleteProjectCard = F2(
	function (token, cardID) {
		return A2(
			$jamesmacaulay$elm_graphql$GraphQL$Client$Http$customSendMutation,
			$author$project$GitHub$authedOptions(token),
			A2(
				$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$request,
				{cardId: cardID},
				$author$project$GitHub$deleteProjectCardMutation));
	});
var $author$project$Effects$deleteProjectCard = F2(
	function (model, cardId) {
		return A2(
			$author$project$Effects$withTokenOrLogIn,
			model,
			function (token) {
				var refreshColumn = function (res) {
					if (res.$ === 'Ok') {
						if (res.a.$ === 'Just') {
							var colId = res.a.a;
							return A2(
								$author$project$Model$DataChanged,
								$author$project$Effects$refreshColumnCards(colId),
								$elm$core$Result$Ok(_Utils_Tuple0));
						} else {
							var _v1 = res.a;
							return A2(
								$author$project$Model$DataChanged,
								$elm$core$Platform$Cmd$none,
								$elm$core$Result$Ok(_Utils_Tuple0));
						}
					} else {
						var msg = res.a;
						return A2(
							$author$project$Model$DataChanged,
							$elm$core$Platform$Cmd$none,
							$elm$core$Result$Err(msg));
					}
				};
				return A2(
					$author$project$Effects$withSetLoading,
					_List_fromArray(
						[cardId]),
					A2(
						$elm$core$Task$attempt,
						refreshColumn,
						A2($author$project$GitHub$deleteProjectCard, token, cardId)));
			});
	});
var $y0hy0h$ordered_containers$OrderedSet$remove = F2(
	function (key, _v0) {
		var list = _v0.a;
		var dict = _v0.b;
		var _v1 = A2($elm$core$Dict$get, key, dict);
		if (_v1.$ === 'Just') {
			return A2(
				$y0hy0h$ordered_containers$OrderedSet$OrderedSet,
				A2(
					$elm$core$List$filter,
					function (k) {
						return !_Utils_eq(k, key);
					},
					list),
				A2($elm$core$Dict$remove, key, dict));
		} else {
			return A2($y0hy0h$ordered_containers$OrderedSet$OrderedSet, list, dict);
		}
	});
var $author$project$CardOperations$deselectCard = F2(
	function (id, model) {
		return _Utils_update(
			model,
			{
				selectedCards: A2($y0hy0h$ordered_containers$OrderedSet$remove, id, model.selectedCards)
			});
	});
var $author$project$Drag$Dropped = function (a) {
	return {$: 'Dropped', a: a};
};
var $author$project$Drag$drop = function (model) {
	if (model.$ === 'Dropping') {
		var state = model.a;
		return $author$project$Drag$Dropped(state);
	} else {
		return model;
	}
};
var $author$project$Effects$refreshIssue = function (id) {
	return A2(
		$author$project$Effects$withSetLoading,
		_List_fromArray(
			[id]),
		A2($author$project$Backend$refreshIssue, id, $author$project$Model$RefreshQueued));
};
var $author$project$Effects$refreshPR = function (id) {
	return A2(
		$author$project$Effects$withSetLoading,
		_List_fromArray(
			[id]),
		A2($author$project$Backend$refreshPR, id, $author$project$Model$RefreshQueued));
};
var $author$project$CardOperations$dropCard = F4(
	function (model, targetCol, card, drop) {
		var removeCard = $elm$core$List$filter(
			A2(
				$elm$core$Basics$composeL,
				$elm$core$Basics$neq(card.id),
				function ($) {
					return $.id;
				}));
		var removeCardFromOldColumn = function () {
			var _v5 = drop.source;
			if (_v5.$ === 'FromColumnCardSource') {
				var cs = _v5.a;
				return A2(
					$elm$core$Dict$update,
					cs.columnId,
					$elm$core$Maybe$map(removeCard));
			} else {
				return $elm$core$Basics$identity;
			}
		}();
		var insertAfter = F3(
			function (id, _new, cards) {
				if (cards.b) {
					var c = cards.a;
					var rest = cards.b;
					return _Utils_eq(c.id, id) ? A2(
						$elm$core$List$cons,
						c,
						A2($elm$core$List$cons, _new, rest)) : A2(
						$elm$core$List$cons,
						c,
						A3(insertAfter, id, _new, rest));
				} else {
					return _List_fromArray(
						[_new]);
				}
			});
		var colCard = {
			contentId: function () {
				var _v4 = card.content;
				if (_v4.$ === 'Just') {
					if (_v4.a.$ === 'IssueCardContent') {
						var id = _v4.a.a.id;
						return $elm$core$Maybe$Just(id);
					} else {
						var id = _v4.a.a.id;
						return $elm$core$Maybe$Just(id);
					}
				} else {
					return $elm$core$Maybe$Nothing;
				}
			}(),
			id: card.id,
			isArchived: card.isArchived,
			note: card.note
		};
		var insertCard = function (cards) {
			var _v3 = drop.target.afterId;
			if (_v3.$ === 'Nothing') {
				return A2($elm$core$List$cons, colCard, cards);
			} else {
				var cardId = _v3.a;
				return A3(insertAfter, cardId, colCard, cards);
			}
		};
		var addCardToNewColumn = A2(
			$elm$core$Dict$update,
			targetCol,
			$elm$core$Maybe$map(insertCard));
		var movedOptimistically = _Utils_update(
			model,
			{
				columnCards: addCardToNewColumn(
					removeCardFromOldColumn(model.columnCards))
			});
		return _Utils_Tuple2(
			_Utils_update(
				movedOptimistically,
				{
					projectDrag: $author$project$Drag$complete(model.projectDrag)
				}),
			$elm$core$Platform$Cmd$batch(
				_List_fromArray(
					[
						$author$project$Effects$refreshColumnCards(targetCol),
						function () {
						var _v1 = card.content;
						if (_v1.$ === 'Just') {
							if (_v1.a.$ === 'IssueCardContent') {
								var issue = _v1.a.a;
								return $author$project$Effects$refreshIssue(issue.id);
							} else {
								var pr = _v1.a.a;
								return $author$project$Effects$refreshPR(pr.id);
							}
						} else {
							return $elm$core$Platform$Cmd$none;
						}
					}(),
						function () {
						var _v2 = drop.source;
						if (_v2.$ === 'FromColumnCardSource') {
							var cs = _v2.a;
							return _Utils_eq(cs.columnId, targetCol) ? $elm$core$Platform$Cmd$none : $author$project$Effects$refreshColumnCards(cs.columnId);
						} else {
							return $elm$core$Platform$Cmd$none;
						}
					}()
					])));
	});
var $author$project$Backend$CardData = F6(
	function (issues, prs, cardEvents, cardClosers, cardRotations, prReviewers) {
		return {cardClosers: cardClosers, cardEvents: cardEvents, cardRotations: cardRotations, issues: issues, prReviewers: prReviewers, prs: prs};
	});
var $author$project$Backend$CardEvent = F5(
	function (event, url, user, avatar, createdAt) {
		return {avatar: avatar, createdAt: createdAt, event: event, url: url, user: user};
	});
var $author$project$Backend$decodeCardEvent = A2(
	$elm_community$json_extra$Json$Decode$Extra$andMap,
	A2($elm$json$Json$Decode$field, 'createdAt', $elm_community$json_extra$Json$Decode$Extra$datetime),
	A2(
		$elm_community$json_extra$Json$Decode$Extra$andMap,
		A2($elm$json$Json$Decode$field, 'avatar', $elm$json$Json$Decode$string),
		A2(
			$elm_community$json_extra$Json$Decode$Extra$andMap,
			A2(
				$elm$json$Json$Decode$field,
				'user',
				$elm$json$Json$Decode$maybe($author$project$GitHub$decodeUser)),
			A2(
				$elm_community$json_extra$Json$Decode$Extra$andMap,
				A2($elm$json$Json$Decode$field, 'url', $elm$json$Json$Decode$string),
				A2(
					$elm_community$json_extra$Json$Decode$Extra$andMap,
					A2($elm$json$Json$Decode$field, 'event', $elm$json$Json$Decode$string),
					$elm$json$Json$Decode$succeed($author$project$Backend$CardEvent))))));
var $author$project$GitHub$decodeProjectLocation = A2(
	$elm_community$json_extra$Json$Decode$Extra$andMap,
	A2($elm$json$Json$Decode$field, 'number', $elm$json$Json$Decode$int),
	A2(
		$elm_community$json_extra$Json$Decode$Extra$andMap,
		A2($elm$json$Json$Decode$field, 'name', $elm$json$Json$Decode$string),
		A2(
			$elm_community$json_extra$Json$Decode$Extra$andMap,
			A2($elm$json$Json$Decode$field, 'url', $elm$json$Json$Decode$string),
			A2(
				$elm_community$json_extra$Json$Decode$Extra$andMap,
				A2($elm$json$Json$Decode$field, 'id', $elm$json$Json$Decode$string),
				$elm$json$Json$Decode$succeed($author$project$GitHub$ProjectLocation)))));
var $author$project$GitHub$decodeCardLocation = A2(
	$elm_community$json_extra$Json$Decode$Extra$andMap,
	A2(
		$elm$json$Json$Decode$field,
		'column',
		$elm$json$Json$Decode$maybe($author$project$GitHub$decodeProjectColumn)),
	A2(
		$elm_community$json_extra$Json$Decode$Extra$andMap,
		A2($elm$json$Json$Decode$field, 'project', $author$project$GitHub$decodeProjectLocation),
		A2(
			$elm_community$json_extra$Json$Decode$Extra$andMap,
			A2($elm$json$Json$Decode$field, 'url', $elm$json$Json$Decode$string),
			A2(
				$elm_community$json_extra$Json$Decode$Extra$andMap,
				A2($elm$json$Json$Decode$field, 'id', $elm$json$Json$Decode$string),
				$elm$json$Json$Decode$succeed($author$project$GitHub$CardLocation)))));
var $author$project$GitHub$decodeIssueState = function () {
	var decodeToType = function (string) {
		var _v0 = A2(
			$elm$core$Dict$get,
			string,
			$elm$core$Dict$fromList($author$project$GitHub$issueStates));
		if (_v0.$ === 'Just') {
			var type_ = _v0.a;
			return $elm$core$Result$Ok(type_);
		} else {
			return $elm$core$Result$Err('Not valid pattern for decoder to IssueState. Pattern: ' + string);
		}
	};
	return A2($author$project$GitHub$customDecoder, $elm$json$Json$Decode$string, decodeToType);
}();
var $author$project$GitHub$decodeReactionType = function () {
	var decodeToType = function (string) {
		var _v0 = A2(
			$elm$core$Dict$get,
			string,
			$elm$core$Dict$fromList($author$project$GitHub$reactionTypes));
		if (_v0.$ === 'Just') {
			var type_ = _v0.a;
			return $elm$core$Result$Ok(type_);
		} else {
			return $elm$core$Result$Err('Not valid pattern for decoder to ReactionType. Pattern: ' + string);
		}
	};
	return A2($author$project$GitHub$customDecoder, $elm$json$Json$Decode$string, decodeToType);
}();
var $author$project$GitHub$decodeReactionGroup = A2(
	$elm_community$json_extra$Json$Decode$Extra$andMap,
	A2($elm$json$Json$Decode$field, 'count', $elm$json$Json$Decode$int),
	A2(
		$elm_community$json_extra$Json$Decode$Extra$andMap,
		A2($elm$json$Json$Decode$field, 'type_', $author$project$GitHub$decodeReactionType),
		$elm$json$Json$Decode$succeed($author$project$GitHub$ReactionGroup)));
var $author$project$GitHub$decodeRepoLocation = A2(
	$elm_community$json_extra$Json$Decode$Extra$andMap,
	A2($elm$json$Json$Decode$field, 'name', $elm$json$Json$Decode$string),
	A2(
		$elm_community$json_extra$Json$Decode$Extra$andMap,
		A2($elm$json$Json$Decode$field, 'owner', $elm$json$Json$Decode$string),
		A2(
			$elm_community$json_extra$Json$Decode$Extra$andMap,
			A2($elm$json$Json$Decode$field, 'url', $elm$json$Json$Decode$string),
			A2(
				$elm_community$json_extra$Json$Decode$Extra$andMap,
				A2($elm$json$Json$Decode$field, 'id', $elm$json$Json$Decode$string),
				$elm$json$Json$Decode$succeed($author$project$GitHub$RepoLocation)))));
var $author$project$GitHub$decodeIssue = A2(
	$elm_community$json_extra$Json$Decode$Extra$andMap,
	A2(
		$elm$json$Json$Decode$field,
		'milestone',
		$elm$json$Json$Decode$maybe($author$project$GitHub$decodeMilestone)),
	A2(
		$elm_community$json_extra$Json$Decode$Extra$andMap,
		A2(
			$elm$json$Json$Decode$field,
			'cards',
			$elm$json$Json$Decode$list($author$project$GitHub$decodeCardLocation)),
		A2(
			$elm_community$json_extra$Json$Decode$Extra$andMap,
			A2(
				$elm$json$Json$Decode$field,
				'labels',
				$elm$json$Json$Decode$list($author$project$GitHub$decodeLabel)),
			A2(
				$elm_community$json_extra$Json$Decode$Extra$andMap,
				A2(
					$elm$json$Json$Decode$field,
					'assignees',
					$elm$json$Json$Decode$list($author$project$GitHub$decodeUser)),
				A2(
					$elm_community$json_extra$Json$Decode$Extra$andMap,
					A2(
						$elm$json$Json$Decode$field,
						'author',
						$elm$json$Json$Decode$maybe($author$project$GitHub$decodeUser)),
					A2(
						$elm_community$json_extra$Json$Decode$Extra$andMap,
						A2(
							$elm$json$Json$Decode$field,
							'reactions',
							$elm$json$Json$Decode$list($author$project$GitHub$decodeReactionGroup)),
						A2(
							$elm_community$json_extra$Json$Decode$Extra$andMap,
							A2($elm$json$Json$Decode$field, 'comment_count', $elm$json$Json$Decode$int),
							A2(
								$elm_community$json_extra$Json$Decode$Extra$andMap,
								A2($elm$json$Json$Decode$field, 'title', $elm$json$Json$Decode$string),
								A2(
									$elm_community$json_extra$Json$Decode$Extra$andMap,
									A2($elm$json$Json$Decode$field, 'number', $elm$json$Json$Decode$int),
									A2(
										$elm_community$json_extra$Json$Decode$Extra$andMap,
										A2($elm$json$Json$Decode$field, 'repo', $author$project$GitHub$decodeRepoLocation),
										A2(
											$elm_community$json_extra$Json$Decode$Extra$andMap,
											A2($elm$json$Json$Decode$field, 'state', $author$project$GitHub$decodeIssueState),
											A2(
												$elm_community$json_extra$Json$Decode$Extra$andMap,
												A2($elm$json$Json$Decode$field, 'updated_at', $elm_community$json_extra$Json$Decode$Extra$datetime),
												A2(
													$elm_community$json_extra$Json$Decode$Extra$andMap,
													A2($elm$json$Json$Decode$field, 'created_at', $elm_community$json_extra$Json$Decode$Extra$datetime),
													A2(
														$elm_community$json_extra$Json$Decode$Extra$andMap,
														A2($elm$json$Json$Decode$field, 'url', $elm$json$Json$Decode$string),
														A2(
															$elm_community$json_extra$Json$Decode$Extra$andMap,
															A2($elm$json$Json$Decode$field, 'id', $elm$json$Json$Decode$string),
															$elm$json$Json$Decode$succeed($author$project$GitHub$Issue))))))))))))))));
var $author$project$GitHub$decodeMergeableState = function () {
	var decodeToType = function (string) {
		var _v0 = A2(
			$elm$core$Dict$get,
			string,
			$elm$core$Dict$fromList($author$project$GitHub$mergeableStates));
		if (_v0.$ === 'Just') {
			var type_ = _v0.a;
			return $elm$core$Result$Ok(type_);
		} else {
			return $elm$core$Result$Err('Not valid pattern for decoder to MergeableState. Pattern: ' + string);
		}
	};
	return A2($author$project$GitHub$customDecoder, $elm$json$Json$Decode$string, decodeToType);
}();
var $author$project$GitHub$decodePullRequestState = function () {
	var decodeToType = function (string) {
		var _v0 = A2(
			$elm$core$Dict$get,
			string,
			$elm$core$Dict$fromList($author$project$GitHub$pullRequestStates));
		if (_v0.$ === 'Just') {
			var type_ = _v0.a;
			return $elm$core$Result$Ok(type_);
		} else {
			return $elm$core$Result$Err('Not valid pattern for decoder to PullRequestState. Pattern: ' + string);
		}
	};
	return A2($author$project$GitHub$customDecoder, $elm$json$Json$Decode$string, decodeToType);
}();
var $author$project$GitHub$decodePullRequest = A2(
	$elm_community$json_extra$Json$Decode$Extra$andMap,
	A2($elm$json$Json$Decode$field, 'head_ref_name', $elm$json$Json$Decode$string),
	A2(
		$elm_community$json_extra$Json$Decode$Extra$andMap,
		A2($elm$json$Json$Decode$field, 'base_ref_name', $elm$json$Json$Decode$string),
		A2(
			$elm_community$json_extra$Json$Decode$Extra$andMap,
			A2(
				$elm$json$Json$Decode$field,
				'last_commit',
				$elm$json$Json$Decode$maybe($author$project$GitHub$decodeCommit)),
			A2(
				$elm_community$json_extra$Json$Decode$Extra$andMap,
				A2($elm$json$Json$Decode$field, 'mergeable', $author$project$GitHub$decodeMergeableState),
				A2(
					$elm_community$json_extra$Json$Decode$Extra$andMap,
					A2(
						$elm$json$Json$Decode$field,
						'milestone',
						$elm$json$Json$Decode$maybe($author$project$GitHub$decodeMilestone)),
					A2(
						$elm_community$json_extra$Json$Decode$Extra$andMap,
						A2($elm$json$Json$Decode$field, 'deletions', $elm$json$Json$Decode$int),
						A2(
							$elm_community$json_extra$Json$Decode$Extra$andMap,
							A2($elm$json$Json$Decode$field, 'additions', $elm$json$Json$Decode$int),
							A2(
								$elm_community$json_extra$Json$Decode$Extra$andMap,
								A2(
									$elm$json$Json$Decode$field,
									'cards',
									$elm$json$Json$Decode$list($author$project$GitHub$decodeCardLocation)),
								A2(
									$elm_community$json_extra$Json$Decode$Extra$andMap,
									A2(
										$elm$json$Json$Decode$field,
										'labels',
										$elm$json$Json$Decode$list($author$project$GitHub$decodeLabel)),
									A2(
										$elm_community$json_extra$Json$Decode$Extra$andMap,
										A2(
											$elm$json$Json$Decode$field,
											'assignees',
											$elm$json$Json$Decode$list($author$project$GitHub$decodeUser)),
										A2(
											$elm_community$json_extra$Json$Decode$Extra$andMap,
											A2(
												$elm$json$Json$Decode$field,
												'author',
												$elm$json$Json$Decode$maybe($author$project$GitHub$decodeUser)),
											A2(
												$elm_community$json_extra$Json$Decode$Extra$andMap,
												A2(
													$elm$json$Json$Decode$field,
													'reactions',
													$elm$json$Json$Decode$list($author$project$GitHub$decodeReactionGroup)),
												A2(
													$elm_community$json_extra$Json$Decode$Extra$andMap,
													A2($elm$json$Json$Decode$field, 'comment_count', $elm$json$Json$Decode$int),
													A2(
														$elm_community$json_extra$Json$Decode$Extra$andMap,
														A2($elm$json$Json$Decode$field, 'title', $elm$json$Json$Decode$string),
														A2(
															$elm_community$json_extra$Json$Decode$Extra$andMap,
															A2($elm$json$Json$Decode$field, 'number', $elm$json$Json$Decode$int),
															A2(
																$elm_community$json_extra$Json$Decode$Extra$andMap,
																A2($elm$json$Json$Decode$field, 'repo', $author$project$GitHub$decodeRepoLocation),
																A2(
																	$elm_community$json_extra$Json$Decode$Extra$andMap,
																	A2($elm$json$Json$Decode$field, 'state', $author$project$GitHub$decodePullRequestState),
																	A2(
																		$elm_community$json_extra$Json$Decode$Extra$andMap,
																		A2($elm$json$Json$Decode$field, 'updated_at', $elm_community$json_extra$Json$Decode$Extra$datetime),
																		A2(
																			$elm_community$json_extra$Json$Decode$Extra$andMap,
																			A2($elm$json$Json$Decode$field, 'created_at', $elm_community$json_extra$Json$Decode$Extra$datetime),
																			A2(
																				$elm_community$json_extra$Json$Decode$Extra$andMap,
																				A2($elm$json$Json$Decode$field, 'url', $elm$json$Json$Decode$string),
																				A2(
																					$elm_community$json_extra$Json$Decode$Extra$andMap,
																					A2($elm$json$Json$Decode$field, 'id', $elm$json$Json$Decode$string),
																					$elm$json$Json$Decode$succeed($author$project$GitHub$PullRequest))))))))))))))))))))));
var $author$project$GitHub$PullRequestReview = F4(
	function (url, author, state, createdAt) {
		return {author: author, createdAt: createdAt, state: state, url: url};
	});
var $author$project$GitHub$PullRequestReviewStateApproved = {$: 'PullRequestReviewStateApproved'};
var $author$project$GitHub$PullRequestReviewStateChangesRequested = {$: 'PullRequestReviewStateChangesRequested'};
var $author$project$GitHub$PullRequestReviewStateCommented = {$: 'PullRequestReviewStateCommented'};
var $author$project$GitHub$PullRequestReviewStateDismissed = {$: 'PullRequestReviewStateDismissed'};
var $author$project$GitHub$PullRequestReviewStatePending = {$: 'PullRequestReviewStatePending'};
var $author$project$GitHub$pullRequestReviewStates = _List_fromArray(
	[
		_Utils_Tuple2('PENDING', $author$project$GitHub$PullRequestReviewStatePending),
		_Utils_Tuple2('COMMENTED', $author$project$GitHub$PullRequestReviewStateCommented),
		_Utils_Tuple2('APPROVED', $author$project$GitHub$PullRequestReviewStateApproved),
		_Utils_Tuple2('CHANGES_REQUESTED', $author$project$GitHub$PullRequestReviewStateChangesRequested),
		_Utils_Tuple2('DISMISSED', $author$project$GitHub$PullRequestReviewStateDismissed)
	]);
var $author$project$GitHub$decodePullRequestReviewState = function () {
	var decodeToType = function (string) {
		var _v0 = A2(
			$elm$core$Dict$get,
			string,
			$elm$core$Dict$fromList($author$project$GitHub$pullRequestReviewStates));
		if (_v0.$ === 'Just') {
			var type_ = _v0.a;
			return $elm$core$Result$Ok(type_);
		} else {
			return $elm$core$Result$Err('Not valid pattern for decoder to PullRequestReviewState. Pattern: ' + string);
		}
	};
	return A2($author$project$GitHub$customDecoder, $elm$json$Json$Decode$string, decodeToType);
}();
var $author$project$GitHub$decodePullRequestReview = A2(
	$elm_community$json_extra$Json$Decode$Extra$andMap,
	A2($elm$json$Json$Decode$field, 'created_at', $elm_community$json_extra$Json$Decode$Extra$datetime),
	A2(
		$elm_community$json_extra$Json$Decode$Extra$andMap,
		A2($elm$json$Json$Decode$field, 'state', $author$project$GitHub$decodePullRequestReviewState),
		A2(
			$elm_community$json_extra$Json$Decode$Extra$andMap,
			A2($elm$json$Json$Decode$field, 'author', $author$project$GitHub$decodeUser),
			A2(
				$elm_community$json_extra$Json$Decode$Extra$andMap,
				A2($elm$json$Json$Decode$field, 'url', $elm$json$Json$Decode$string),
				$elm$json$Json$Decode$succeed($author$project$GitHub$PullRequestReview)))));
var $author$project$Backend$Rotation = F3(
	function (users, start, end) {
		return {end: end, start: start, users: users};
	});
var $author$project$Backend$decodeRotation = A2(
	$elm_community$json_extra$Json$Decode$Extra$andMap,
	A2(
		$elm$json$Json$Decode$field,
		'end',
		$elm$json$Json$Decode$maybe($elm_community$json_extra$Json$Decode$Extra$datetime)),
	A2(
		$elm_community$json_extra$Json$Decode$Extra$andMap,
		A2($elm$json$Json$Decode$field, 'start', $elm_community$json_extra$Json$Decode$Extra$datetime),
		A2(
			$elm_community$json_extra$Json$Decode$Extra$andMap,
			A2(
				$elm$json$Json$Decode$field,
				'users',
				$elm$json$Json$Decode$list($author$project$GitHub$decodeUser)),
			$elm$json$Json$Decode$succeed($author$project$Backend$Rotation))));
var $author$project$Backend$decodeCardData = A2(
	$elm_community$json_extra$Json$Decode$Extra$andMap,
	A2(
		$elm$json$Json$Decode$field,
		'prReviewers',
		$elm$json$Json$Decode$dict(
			$elm$json$Json$Decode$list($author$project$GitHub$decodePullRequestReview))),
	A2(
		$elm_community$json_extra$Json$Decode$Extra$andMap,
		A2(
			$elm$json$Json$Decode$field,
			'cardRotations',
			$elm$json$Json$Decode$dict(
				$elm$json$Json$Decode$list($author$project$Backend$decodeRotation))),
		A2(
			$elm_community$json_extra$Json$Decode$Extra$andMap,
			A2(
				$elm$json$Json$Decode$field,
				'cardClosers',
				$elm$json$Json$Decode$dict(
					$elm$json$Json$Decode$list($elm$json$Json$Decode$string))),
			A2(
				$elm_community$json_extra$Json$Decode$Extra$andMap,
				A2(
					$elm$json$Json$Decode$field,
					'cardEvents',
					$elm$json$Json$Decode$dict(
						$elm$json$Json$Decode$list($author$project$Backend$decodeCardEvent))),
				A2(
					$elm_community$json_extra$Json$Decode$Extra$andMap,
					A2(
						$elm$json$Json$Decode$field,
						'prs',
						$elm$json$Json$Decode$dict($author$project$GitHub$decodePullRequest)),
					A2(
						$elm_community$json_extra$Json$Decode$Extra$andMap,
						A2(
							$elm$json$Json$Decode$field,
							'issues',
							$elm$json$Json$Decode$dict($author$project$GitHub$decodeIssue)),
						$elm$json$Json$Decode$succeed($author$project$Backend$CardData)))))));
var $author$project$Backend$fetchCardData = function (f) {
	return A2(
		$elm$core$Task$attempt,
		f,
		$lukewestby$elm_http_builder$HttpBuilder$toTask(
			A2(
				$lukewestby$elm_http_builder$HttpBuilder$withExpect,
				$author$project$Backend$expectJsonWithIndex($author$project$Backend$decodeCardData),
				$lukewestby$elm_http_builder$HttpBuilder$get('/cards'))));
};
var $author$project$ForceGraph$DecodedNode = F7(
	function (id, x, y, vy, vx, mass, value) {
		return {id: id, mass: mass, value: value, vx: vx, vy: vy, x: x, y: y};
	});
var $author$project$ForceGraph$ForceGraph = F2(
	function (nodes, edges) {
		return {edges: edges, nodes: nodes};
	});
var $elm_community$intdict$IntDict$Empty = {$: 'Empty'};
var $elm_community$intdict$IntDict$empty = $elm_community$intdict$IntDict$Empty;
var $elm$json$Json$Decode$float = _Json_decodeFloat;
var $elm_community$intdict$IntDict$Inner = function (a) {
	return {$: 'Inner', a: a};
};
var $elm_community$intdict$IntDict$size = function (dict) {
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
var $elm_community$intdict$IntDict$inner = F3(
	function (p, l, r) {
		var _v0 = _Utils_Tuple2(l, r);
		if (_v0.a.$ === 'Empty') {
			var _v1 = _v0.a;
			return r;
		} else {
			if (_v0.b.$ === 'Empty') {
				var _v2 = _v0.b;
				return l;
			} else {
				return $elm_community$intdict$IntDict$Inner(
					{
						left: l,
						prefix: p,
						right: r,
						size: $elm_community$intdict$IntDict$size(l) + $elm_community$intdict$IntDict$size(r)
					});
			}
		}
	});
var $elm_community$intdict$IntDict$lcp = F2(
	function (x, y) {
		var branchingBit = $elm_community$intdict$IntDict$highestBitSet(x ^ y);
		var mask = $elm_community$intdict$IntDict$higherBitMask(branchingBit);
		var prefixBits = x & mask;
		return {branchingBit: branchingBit, prefixBits: prefixBits};
	});
var $elm_community$intdict$IntDict$Leaf = function (a) {
	return {$: 'Leaf', a: a};
};
var $elm_community$intdict$IntDict$leaf = F2(
	function (k, v) {
		return $elm_community$intdict$IntDict$Leaf(
			{key: k, value: v});
	});
var $elm_community$intdict$IntDict$update = F3(
	function (key, alter, dict) {
		var join = F2(
			function (_v2, _v3) {
				var k1 = _v2.a;
				var l = _v2.b;
				var k2 = _v3.a;
				var r = _v3.b;
				var prefix = A2($elm_community$intdict$IntDict$lcp, k1, k2);
				return A2($elm_community$intdict$IntDict$isBranchingBitSet, prefix, k2) ? A3($elm_community$intdict$IntDict$inner, prefix, l, r) : A3($elm_community$intdict$IntDict$inner, prefix, r, l);
			});
		var alteredNode = function (mv) {
			var _v1 = alter(mv);
			if (_v1.$ === 'Just') {
				var v = _v1.a;
				return A2($elm_community$intdict$IntDict$leaf, key, v);
			} else {
				return $elm_community$intdict$IntDict$empty;
			}
		};
		switch (dict.$) {
			case 'Empty':
				return alteredNode($elm$core$Maybe$Nothing);
			case 'Leaf':
				var l = dict.a;
				return _Utils_eq(l.key, key) ? alteredNode(
					$elm$core$Maybe$Just(l.value)) : A2(
					join,
					_Utils_Tuple2(
						key,
						alteredNode($elm$core$Maybe$Nothing)),
					_Utils_Tuple2(l.key, dict));
			default:
				var i = dict.a;
				return A2($elm_community$intdict$IntDict$prefixMatches, i.prefix, key) ? (A2($elm_community$intdict$IntDict$isBranchingBitSet, i.prefix, key) ? A3(
					$elm_community$intdict$IntDict$inner,
					i.prefix,
					i.left,
					A3($elm_community$intdict$IntDict$update, key, alter, i.right)) : A3(
					$elm_community$intdict$IntDict$inner,
					i.prefix,
					A3($elm_community$intdict$IntDict$update, key, alter, i.left),
					i.right)) : A2(
					join,
					_Utils_Tuple2(
						key,
						alteredNode($elm$core$Maybe$Nothing)),
					_Utils_Tuple2(i.prefix.prefixBits, dict));
		}
	});
var $elm_community$intdict$IntDict$insert = F3(
	function (key, value, dict) {
		return A3(
			$elm_community$intdict$IntDict$update,
			key,
			$elm$core$Basics$always(
				$elm$core$Maybe$Just(value)),
			dict);
	});
var $elm$core$Tuple$pair = F2(
	function (a, b) {
		return _Utils_Tuple2(a, b);
	});
var $author$project$ForceGraph$decode = function (decoder) {
	var toDict = A2(
		$elm$core$List$foldl,
		F2(
			function (n, ns) {
				return A3($elm_community$intdict$IntDict$insert, n.id, n, ns);
			}),
		$elm_community$intdict$IntDict$empty);
	var decodeNode = A2(
		$elm_community$json_extra$Json$Decode$Extra$andMap,
		A2($elm$json$Json$Decode$field, 'value', decoder),
		A2(
			$elm_community$json_extra$Json$Decode$Extra$andMap,
			A2($elm$json$Json$Decode$field, 'mass', $elm$json$Json$Decode$float),
			A2(
				$elm_community$json_extra$Json$Decode$Extra$andMap,
				$elm$json$Json$Decode$succeed(0),
				A2(
					$elm_community$json_extra$Json$Decode$Extra$andMap,
					$elm$json$Json$Decode$succeed(0),
					A2(
						$elm_community$json_extra$Json$Decode$Extra$andMap,
						A2($elm$json$Json$Decode$field, 'y', $elm$json$Json$Decode$float),
						A2(
							$elm_community$json_extra$Json$Decode$Extra$andMap,
							A2($elm$json$Json$Decode$field, 'x', $elm$json$Json$Decode$float),
							A2(
								$elm_community$json_extra$Json$Decode$Extra$andMap,
								A2($elm$json$Json$Decode$field, 'id', $elm$json$Json$Decode$int),
								$elm$json$Json$Decode$succeed($author$project$ForceGraph$DecodedNode))))))));
	var decodeEdge = A2(
		$elm_community$json_extra$Json$Decode$Extra$andMap,
		A2($elm$json$Json$Decode$field, 'to', $elm$json$Json$Decode$int),
		A2(
			$elm_community$json_extra$Json$Decode$Extra$andMap,
			A2($elm$json$Json$Decode$field, 'from', $elm$json$Json$Decode$int),
			$elm$json$Json$Decode$succeed($elm$core$Tuple$pair)));
	return A2(
		$elm_community$json_extra$Json$Decode$Extra$andMap,
		A2(
			$elm$json$Json$Decode$field,
			'edges',
			$elm$json$Json$Decode$list(decodeEdge)),
		A2(
			$elm_community$json_extra$Json$Decode$Extra$andMap,
			A2(
				$elm$json$Json$Decode$field,
				'nodes',
				A2(
					$elm$json$Json$Decode$map,
					toDict,
					$elm$json$Json$Decode$list(decodeNode))),
			$elm$json$Json$Decode$succeed($author$project$ForceGraph$ForceGraph)));
};
var $author$project$Backend$decodeGraphs = $elm$json$Json$Decode$list(
	$author$project$ForceGraph$decode($elm$json$Json$Decode$string));
var $author$project$Backend$fetchGraphs = function (f) {
	return A2(
		$elm$core$Task$attempt,
		f,
		$lukewestby$elm_http_builder$HttpBuilder$toTask(
			A2(
				$lukewestby$elm_http_builder$HttpBuilder$withExpect,
				$author$project$Backend$expectJsonWithIndex($author$project$Backend$decodeGraphs),
				$lukewestby$elm_http_builder$HttpBuilder$get('/graphs'))));
};
var $author$project$Main$finishLoadingCardData = function (data) {
	var hasLoaded = F2(
		function (id, _v0) {
			return A2($elm$core$Dict$member, id, data.issues) || A2($elm$core$Dict$member, id, data.prs);
		});
	return $elm$core$Dict$filter(
		F2(
			function (id, p) {
				return !A2(hasLoaded, id, p);
			}));
};
var $author$project$Main$finishLoadingData = function (data) {
	var hasLoaded = F2(
		function (id, _v0) {
			return A2($elm$core$Dict$member, id, data.repos) || A2($elm$core$Dict$member, id, data.columnCards);
		});
	return $elm$core$Dict$filter(
		F2(
			function (id, p) {
				return !A2(hasLoaded, id, p);
			}));
};
var $elm$browser$Browser$Dom$focus = _Browser_call('focus');
var $author$project$CardView$focusId = function (id) {
	return 'focus-' + id;
};
var $author$project$CardView$focusEditNote = function (id) {
	return A2(
		$elm$core$Task$attempt,
		$elm$core$Basics$always($author$project$Model$Noop),
		$elm$browser$Browser$Dom$focus(
			$author$project$CardView$focusId(id)));
};
var $author$project$Main$focusId = function (colId) {
	return 'add-note-' + colId;
};
var $elm_community$list_extra$List$Extra$foldl1 = F2(
	function (func, list) {
		if (!list.b) {
			return $elm$core$Maybe$Nothing;
		} else {
			var x = list.a;
			var xs = list.b;
			return $elm$core$Maybe$Just(
				A3($elm$core$List$foldl, func, x, xs));
		}
	});
var $elm$core$Basics$ge = _Utils_ge;
var $author$project$Backend$CardClosersEvent = F2(
	function (cardId, closers) {
		return {cardId: cardId, closers: closers};
	});
var $author$project$Backend$decodeCardClosersEvent = A2(
	$elm_community$json_extra$Json$Decode$Extra$andMap,
	A2(
		$elm$json$Json$Decode$field,
		'closers',
		$elm$json$Json$Decode$list($elm$json$Json$Decode$string)),
	A2(
		$elm_community$json_extra$Json$Decode$Extra$andMap,
		A2($elm$json$Json$Decode$field, 'cardId', $elm$json$Json$Decode$string),
		$elm$json$Json$Decode$succeed($author$project$Backend$CardClosersEvent)));
var $author$project$Backend$CardEventsEvent = F2(
	function (cardId, events) {
		return {cardId: cardId, events: events};
	});
var $author$project$Backend$decodeCardEventsEvent = A2(
	$elm_community$json_extra$Json$Decode$Extra$andMap,
	A2(
		$elm$json$Json$Decode$field,
		'events',
		$elm$json$Json$Decode$list($author$project$Backend$decodeCardEvent)),
	A2(
		$elm_community$json_extra$Json$Decode$Extra$andMap,
		A2($elm$json$Json$Decode$field, 'cardId', $elm$json$Json$Decode$string),
		$elm$json$Json$Decode$succeed($author$project$Backend$CardEventsEvent)));
var $author$project$Backend$CardRotationsEvent = F2(
	function (cardId, rotations) {
		return {cardId: cardId, rotations: rotations};
	});
var $author$project$Backend$decodeCardRotationsEvent = A2(
	$elm_community$json_extra$Json$Decode$Extra$andMap,
	A2(
		$elm$json$Json$Decode$field,
		'rotations',
		$elm$json$Json$Decode$list($author$project$Backend$decodeRotation)),
	A2(
		$elm_community$json_extra$Json$Decode$Extra$andMap,
		A2($elm$json$Json$Decode$field, 'cardId', $elm$json$Json$Decode$string),
		$elm$json$Json$Decode$succeed($author$project$Backend$CardRotationsEvent)));
var $author$project$Backend$ColumnCardsEvent = F2(
	function (columnId, cards) {
		return {cards: cards, columnId: columnId};
	});
var $author$project$Backend$decodeColumnCardsEvent = A2(
	$elm_community$json_extra$Json$Decode$Extra$andMap,
	A2($elm$json$Json$Decode$field, 'cards', $author$project$Backend$decodeColumnCards),
	A2(
		$elm_community$json_extra$Json$Decode$Extra$andMap,
		A2($elm$json$Json$Decode$field, 'columnId', $elm$json$Json$Decode$string),
		$elm$json$Json$Decode$succeed($author$project$Backend$ColumnCardsEvent)));
var $author$project$Backend$RepoCommitsEvent = F4(
	function (repoId, ref, commits, lastRelease) {
		return {commits: commits, lastRelease: lastRelease, ref: ref, repoId: repoId};
	});
var $author$project$Backend$decodeRepoCommitsEvent = A2(
	$elm_community$json_extra$Json$Decode$Extra$andMap,
	A2($elm$json$Json$Decode$field, 'lastRelease', $author$project$GitHub$decodeRelease),
	A2(
		$elm_community$json_extra$Json$Decode$Extra$andMap,
		A2(
			$elm$json$Json$Decode$field,
			'commits',
			$elm$json$Json$Decode$list($author$project$GitHub$decodeCommit)),
		A2(
			$elm_community$json_extra$Json$Decode$Extra$andMap,
			A2($elm$json$Json$Decode$field, 'ref', $elm$json$Json$Decode$string),
			A2(
				$elm_community$json_extra$Json$Decode$Extra$andMap,
				A2($elm$json$Json$Decode$field, 'repoId', $elm$json$Json$Decode$string),
				$elm$json$Json$Decode$succeed($author$project$Backend$RepoCommitsEvent)))));
var $author$project$Backend$RepoLabelsEvent = F2(
	function (repoId, labels) {
		return {labels: labels, repoId: repoId};
	});
var $author$project$Backend$decodeRepoLabelsEvent = A2(
	$elm_community$json_extra$Json$Decode$Extra$andMap,
	A2(
		$elm$json$Json$Decode$field,
		'labels',
		$elm$json$Json$Decode$list($author$project$GitHub$decodeLabel)),
	A2(
		$elm_community$json_extra$Json$Decode$Extra$andMap,
		A2($elm$json$Json$Decode$field, 'repoId', $elm$json$Json$Decode$string),
		$elm$json$Json$Decode$succeed($author$project$Backend$RepoLabelsEvent)));
var $author$project$Backend$RepoMilestonesEvent = F2(
	function (repoId, milestones) {
		return {milestones: milestones, repoId: repoId};
	});
var $author$project$Backend$decodeRepoMilestonesEvent = A2(
	$elm_community$json_extra$Json$Decode$Extra$andMap,
	A2(
		$elm$json$Json$Decode$field,
		'milestones',
		$elm$json$Json$Decode$list($author$project$GitHub$decodeMilestone)),
	A2(
		$elm_community$json_extra$Json$Decode$Extra$andMap,
		A2($elm$json$Json$Decode$field, 'repoId', $elm$json$Json$Decode$string),
		$elm$json$Json$Decode$succeed($author$project$Backend$RepoMilestonesEvent)));
var $author$project$Backend$RepoProjectsEvent = F2(
	function (repoId, projects) {
		return {projects: projects, repoId: repoId};
	});
var $author$project$Backend$decodeRepoProjectsEvent = A2(
	$elm_community$json_extra$Json$Decode$Extra$andMap,
	A2(
		$elm$json$Json$Decode$field,
		'projects',
		$elm$json$Json$Decode$list($author$project$GitHub$decodeProject)),
	A2(
		$elm_community$json_extra$Json$Decode$Extra$andMap,
		A2($elm$json$Json$Decode$field, 'repoId', $elm$json$Json$Decode$string),
		$elm$json$Json$Decode$succeed($author$project$Backend$RepoProjectsEvent)));
var $author$project$Backend$RepoRefsEvent = F2(
	function (repoId, refs) {
		return {refs: refs, repoId: repoId};
	});
var $author$project$Backend$decodeRepoRefsEvent = A2(
	$elm_community$json_extra$Json$Decode$Extra$andMap,
	A2(
		$elm$json$Json$Decode$field,
		'refs',
		$elm$json$Json$Decode$list($elm$json$Json$Decode$string)),
	A2(
		$elm_community$json_extra$Json$Decode$Extra$andMap,
		A2($elm$json$Json$Decode$field, 'repoId', $elm$json$Json$Decode$string),
		$elm$json$Json$Decode$succeed($author$project$Backend$RepoRefsEvent)));
var $author$project$Backend$RepoReleasesEvent = F2(
	function (repoId, releases) {
		return {releases: releases, repoId: repoId};
	});
var $author$project$Backend$decodeRepoReleasesEvent = A2(
	$elm_community$json_extra$Json$Decode$Extra$andMap,
	A2(
		$elm$json$Json$Decode$field,
		'releases',
		$elm$json$Json$Decode$list($author$project$GitHub$decodeRelease)),
	A2(
		$elm_community$json_extra$Json$Decode$Extra$andMap,
		A2($elm$json$Json$Decode$field, 'repoId', $elm$json$Json$Decode$string),
		$elm$json$Json$Decode$succeed($author$project$Backend$RepoReleasesEvent)));
var $author$project$Backend$ReviewersEvent = F2(
	function (prId, reviewers) {
		return {prId: prId, reviewers: reviewers};
	});
var $author$project$Backend$decodeReviewersEvent = A2(
	$elm_community$json_extra$Json$Decode$Extra$andMap,
	A2(
		$elm$json$Json$Decode$field,
		'reviewers',
		$elm$json$Json$Decode$list($author$project$GitHub$decodePullRequestReview)),
	A2(
		$elm_community$json_extra$Json$Decode$Extra$andMap,
		A2($elm$json$Json$Decode$field, 'prId', $elm$json$Json$Decode$string),
		$elm$json$Json$Decode$succeed($author$project$Backend$ReviewersEvent)));
var $author$project$Main$finishProgress = $elm$core$Dict$remove;
var $author$project$Main$finishLoadingColumnCards = F2(
	function (cards, state) {
		return A3(
			$elm$core$List$foldl,
			function (_v0) {
				var id = _v0.id;
				return $author$project$Main$finishProgress(id);
			},
			state,
			cards);
	});
var $author$project$Main$handleEvent = F4(
	function (event, data, index, model) {
		var withDecoded = F2(
			function (decoder, fn) {
				var _v2 = A2($elm$json$Json$Decode$decodeString, decoder, data);
				if (_v2.$ === 'Ok') {
					var val = _v2.a;
					return A3(
						$author$project$Log$debug,
						'updating ' + event,
						_Utils_Tuple0,
						fn(val));
				} else {
					var err = _v2.a;
					return A3($author$project$Log$debug, 'error decoding event', err, model);
				}
			});
		switch (event) {
			case 'sync':
				return model;
			case 'pairingUsers':
				return A2(
					withDecoded,
					$elm$json$Json$Decode$list($author$project$GitHub$decodeUser),
					function (val) {
						return _Utils_update(
							model,
							{assignableUsers: val});
					});
			case 'columnCards':
				return A2(
					withDecoded,
					$author$project$Backend$decodeColumnCardsEvent,
					function (val) {
						return _Utils_update(
							model,
							{
								columnCards: A3($elm$core$Dict$insert, val.columnId, val.cards, model.columnCards),
								progress: A2(
									$author$project$Main$finishProgress,
									val.columnId,
									A2($author$project$Main$finishLoadingColumnCards, val.cards, model.progress))
							});
					});
			case 'repo':
				return A2(
					withDecoded,
					$author$project$GitHub$decodeRepo,
					function (val) {
						return $author$project$Main$computeDataView(
							_Utils_update(
								model,
								{
									progress: A2($author$project$Main$finishProgress, val.id, model.progress),
									repos: A3($elm$core$Dict$insert, val.id, val, model.repos)
								}));
					});
			case 'repoProjects':
				return A2(
					withDecoded,
					$author$project$Backend$decodeRepoProjectsEvent,
					function (val) {
						return $author$project$Main$computeCardsView(
							$author$project$Main$computeDataView(
								_Utils_update(
									model,
									{
										repoProjects: A3($elm$core$Dict$insert, val.repoId, val.projects, model.repoProjects)
									})));
					});
			case 'repoRefs':
				return A2(
					withDecoded,
					$author$project$Backend$decodeRepoRefsEvent,
					function (val) {
						var existingRefs = A2(
							$elm$core$Maybe$withDefault,
							$elm$core$Dict$empty,
							A2($elm$core$Dict$get, val.repoId, model.repoCommits));
						var syncRef = function (ref) {
							var _v1 = A2($elm$core$Dict$get, ref, existingRefs);
							if (_v1.$ === 'Just') {
								var cs = _v1.a;
								return A2($elm$core$Dict$insert, ref, cs);
							} else {
								return $elm$core$Basics$identity;
							}
						};
						var syncRefs = A2($elm$core$List$foldl, syncRef, $elm$core$Dict$empty);
						return _Utils_update(
							model,
							{
								repoCommits: A3(
									$elm$core$Dict$insert,
									val.repoId,
									syncRefs(val.refs),
									model.repoCommits)
							});
					});
			case 'repoCommits':
				return A2(
					withDecoded,
					$author$project$Backend$decodeRepoCommitsEvent,
					function (val) {
						var commits = {commits: val.commits, lastRelease: val.lastRelease};
						var setRefCommits = A2(
							$elm$core$Basics$composeR,
							$elm$core$Maybe$withDefault($elm$core$Dict$empty),
							A2(
								$elm$core$Basics$composeR,
								A2($elm$core$Dict$insert, val.ref, commits),
								$elm$core$Maybe$Just));
						return _Utils_update(
							model,
							{
								repoCommits: A3($elm$core$Dict$update, val.repoId, setRefCommits, model.repoCommits)
							});
					});
			case 'repoLabels':
				return A2(
					withDecoded,
					$author$project$Backend$decodeRepoLabelsEvent,
					function (val) {
						return _Utils_update(
							model,
							{
								repoLabels: A3($elm$core$Dict$insert, val.repoId, val.labels, model.repoLabels)
							});
					});
			case 'repoMilestones':
				return A2(
					withDecoded,
					$author$project$Backend$decodeRepoMilestonesEvent,
					function (val) {
						return _Utils_update(
							model,
							{
								repoMilestones: A3($elm$core$Dict$insert, val.repoId, val.milestones, model.repoMilestones)
							});
					});
			case 'repoReleases':
				return A2(
					withDecoded,
					$author$project$Backend$decodeRepoReleasesEvent,
					function (val) {
						return _Utils_update(
							model,
							{
								repoReleases: A3($elm$core$Dict$insert, val.repoId, val.releases, model.repoReleases)
							});
					});
			case 'issue':
				return A2(
					withDecoded,
					$author$project$GitHub$decodeIssue,
					function (val) {
						return $author$project$Main$computeCardsView(
							_Utils_update(
								model,
								{
									issues: A3($elm$core$Dict$insert, val.id, val, model.issues),
									progress: A2($author$project$Main$finishProgress, val.id, model.progress)
								}));
					});
			case 'pr':
				return A2(
					withDecoded,
					$author$project$GitHub$decodePullRequest,
					function (val) {
						return $author$project$Main$computeCardsView(
							_Utils_update(
								model,
								{
									progress: A2($author$project$Main$finishProgress, val.id, model.progress),
									prs: A3($elm$core$Dict$insert, val.id, val, model.prs)
								}));
					});
			case 'cardEvents':
				return A2(
					withDecoded,
					$author$project$Backend$decodeCardEventsEvent,
					function (val) {
						return _Utils_update(
							model,
							{
								cardEvents: A3($elm$core$Dict$insert, val.cardId, val.events, model.cardEvents)
							});
					});
			case 'cardClosers':
				return A2(
					withDecoded,
					$author$project$Backend$decodeCardClosersEvent,
					function (val) {
						return _Utils_update(
							model,
							{
								cardClosers: A3($elm$core$Dict$insert, val.cardId, val.closers, model.cardClosers)
							});
					});
			case 'cardRotations':
				return A2(
					withDecoded,
					$author$project$Backend$decodeCardRotationsEvent,
					function (val) {
						return _Utils_update(
							model,
							{
								cardRotations: A3($elm$core$Dict$insert, val.cardId, val.rotations, model.cardRotations)
							});
					});
			case 'prReviewers':
				return A2(
					withDecoded,
					$author$project$Backend$decodeReviewersEvent,
					function (val) {
						return _Utils_update(
							model,
							{
								prReviewers: A3($elm$core$Dict$insert, val.prId, val.reviewers, model.prReviewers)
							});
					});
			case 'graphs':
				return A2(
					withDecoded,
					$author$project$Backend$decodeGraphs,
					function (val) {
						return _Utils_update(
							model,
							{graphs: val});
					});
			default:
				return A3(
					$author$project$Log$debug,
					'event ignored',
					_Utils_Tuple3(event, data, index),
					model);
		}
	});
var $author$project$Card$isPaused = function (card) {
	return card.processState.hasPausedLabel;
};
var $elm$core$String$lines = _String_lines;
var $author$project$Effects$moveCard = F3(
	function (model, _v0, cardId) {
		var columnId = _v0.columnId;
		var afterId = _v0.afterId;
		return A2(
			$author$project$Effects$withTokenOrLogIn,
			model,
			function (token) {
				return A2(
					$author$project$Effects$withSetLoading,
					_List_fromArray(
						[columnId]),
					A2(
						$elm$core$Task$attempt,
						$author$project$Model$CardMoved(columnId),
						A4($author$project$GitHub$moveCardAfter, token, columnId, cardId, afterId)));
			});
	});
var $elm$url$Url$Parser$State = F5(
	function (visited, unvisited, params, frag, value) {
		return {frag: frag, params: params, unvisited: unvisited, value: value, visited: visited};
	});
var $elm$url$Url$Parser$getFirstMatch = function (states) {
	getFirstMatch:
	while (true) {
		if (!states.b) {
			return $elm$core$Maybe$Nothing;
		} else {
			var state = states.a;
			var rest = states.b;
			var _v1 = state.unvisited;
			if (!_v1.b) {
				return $elm$core$Maybe$Just(state.value);
			} else {
				if ((_v1.a === '') && (!_v1.b.b)) {
					return $elm$core$Maybe$Just(state.value);
				} else {
					var $temp$states = rest;
					states = $temp$states;
					continue getFirstMatch;
				}
			}
		}
	}
};
var $elm$url$Url$Parser$removeFinalEmpty = function (segments) {
	if (!segments.b) {
		return _List_Nil;
	} else {
		if ((segments.a === '') && (!segments.b.b)) {
			return _List_Nil;
		} else {
			var segment = segments.a;
			var rest = segments.b;
			return A2(
				$elm$core$List$cons,
				segment,
				$elm$url$Url$Parser$removeFinalEmpty(rest));
		}
	}
};
var $elm$url$Url$Parser$preparePath = function (path) {
	var _v0 = A2($elm$core$String$split, '/', path);
	if (_v0.b && (_v0.a === '')) {
		var segments = _v0.b;
		return $elm$url$Url$Parser$removeFinalEmpty(segments);
	} else {
		var segments = _v0;
		return $elm$url$Url$Parser$removeFinalEmpty(segments);
	}
};
var $elm$url$Url$Parser$addToParametersHelp = F2(
	function (value, maybeList) {
		if (maybeList.$ === 'Nothing') {
			return $elm$core$Maybe$Just(
				_List_fromArray(
					[value]));
		} else {
			var list = maybeList.a;
			return $elm$core$Maybe$Just(
				A2($elm$core$List$cons, value, list));
		}
	});
var $elm$url$Url$percentDecode = _Url_percentDecode;
var $elm$url$Url$Parser$addParam = F2(
	function (segment, dict) {
		var _v0 = A2($elm$core$String$split, '=', segment);
		if ((_v0.b && _v0.b.b) && (!_v0.b.b.b)) {
			var rawKey = _v0.a;
			var _v1 = _v0.b;
			var rawValue = _v1.a;
			var _v2 = $elm$url$Url$percentDecode(rawKey);
			if (_v2.$ === 'Nothing') {
				return dict;
			} else {
				var key = _v2.a;
				var _v3 = $elm$url$Url$percentDecode(rawValue);
				if (_v3.$ === 'Nothing') {
					return dict;
				} else {
					var value = _v3.a;
					return A3(
						$elm$core$Dict$update,
						key,
						$elm$url$Url$Parser$addToParametersHelp(value),
						dict);
				}
			}
		} else {
			return dict;
		}
	});
var $elm$url$Url$Parser$prepareQuery = function (maybeQuery) {
	if (maybeQuery.$ === 'Nothing') {
		return $elm$core$Dict$empty;
	} else {
		var qry = maybeQuery.a;
		return A3(
			$elm$core$List$foldr,
			$elm$url$Url$Parser$addParam,
			$elm$core$Dict$empty,
			A2($elm$core$String$split, '&', qry));
	}
};
var $elm$url$Url$Parser$parse = F2(
	function (_v0, url) {
		var parser = _v0.a;
		return $elm$url$Url$Parser$getFirstMatch(
			parser(
				A5(
					$elm$url$Url$Parser$State,
					_List_Nil,
					$elm$url$Url$Parser$preparePath(url.path),
					$elm$url$Url$Parser$prepareQuery(url.query),
					url.fragment,
					$elm$core$Basics$identity)));
	});
var $elm$browser$Browser$Navigation$pushUrl = _Browser_pushUrl;
var $elm$core$Set$remove = F2(
	function (key, _v0) {
		var dict = _v0.a;
		return $elm$core$Set$Set_elm_builtin(
			A2($elm$core$Dict$remove, key, dict));
	});
var $author$project$Model$AllProjectsPage = {$: 'AllProjectsPage'};
var $author$project$Model$ArchivePage = {$: 'ArchivePage'};
var $author$project$Model$BouncePage = {$: 'BouncePage'};
var $author$project$Model$PairsPage = {$: 'PairsPage'};
var $author$project$Model$ProjectPage = function (a) {
	return {$: 'ProjectPage', a: a};
};
var $author$project$Model$PullRequestsPage = {$: 'PullRequestsPage'};
var $author$project$Model$ReleasePage = F4(
	function (a, b, c, d) {
		return {$: 'ReleasePage', a: a, b: b, c: c, d: d};
	});
var $author$project$Model$ReleasesPage = {$: 'ReleasesPage'};
var $elm$url$Url$Parser$Internal$Parser = function (a) {
	return {$: 'Parser', a: a};
};
var $elm$url$Url$Parser$Query$custom = F2(
	function (key, func) {
		return $elm$url$Url$Parser$Internal$Parser(
			function (dict) {
				return func(
					A2(
						$elm$core$Maybe$withDefault,
						_List_Nil,
						A2($elm$core$Dict$get, key, dict)));
			});
	});
var $elm$url$Url$Parser$Query$int = function (key) {
	return A2(
		$elm$url$Url$Parser$Query$custom,
		key,
		function (stringList) {
			if (stringList.b && (!stringList.b.b)) {
				var str = stringList.a;
				return $elm$core$String$toInt(str);
			} else {
				return $elm$core$Maybe$Nothing;
			}
		});
};
var $elm$url$Url$Parser$Parser = function (a) {
	return {$: 'Parser', a: a};
};
var $elm$url$Url$Parser$mapState = F2(
	function (func, _v0) {
		var visited = _v0.visited;
		var unvisited = _v0.unvisited;
		var params = _v0.params;
		var frag = _v0.frag;
		var value = _v0.value;
		return A5(
			$elm$url$Url$Parser$State,
			visited,
			unvisited,
			params,
			frag,
			func(value));
	});
var $elm$url$Url$Parser$map = F2(
	function (subValue, _v0) {
		var parseArg = _v0.a;
		return $elm$url$Url$Parser$Parser(
			function (_v1) {
				var visited = _v1.visited;
				var unvisited = _v1.unvisited;
				var params = _v1.params;
				var frag = _v1.frag;
				var value = _v1.value;
				return A2(
					$elm$core$List$map,
					$elm$url$Url$Parser$mapState(value),
					parseArg(
						A5($elm$url$Url$Parser$State, visited, unvisited, params, frag, subValue)));
			});
	});
var $elm$url$Url$Parser$oneOf = function (parsers) {
	return $elm$url$Url$Parser$Parser(
		function (state) {
			return A2(
				$elm$core$List$concatMap,
				function (_v0) {
					var parser = _v0.a;
					return parser(state);
				},
				parsers);
		});
};
var $elm$url$Url$Parser$query = function (_v0) {
	var queryParser = _v0.a;
	return $elm$url$Url$Parser$Parser(
		function (_v1) {
			var visited = _v1.visited;
			var unvisited = _v1.unvisited;
			var params = _v1.params;
			var frag = _v1.frag;
			var value = _v1.value;
			return _List_fromArray(
				[
					A5(
					$elm$url$Url$Parser$State,
					visited,
					unvisited,
					params,
					frag,
					value(
						queryParser(params)))
				]);
		});
};
var $elm$url$Url$Parser$slash = F2(
	function (_v0, _v1) {
		var parseBefore = _v0.a;
		var parseAfter = _v1.a;
		return $elm$url$Url$Parser$Parser(
			function (state) {
				return A2(
					$elm$core$List$concatMap,
					parseAfter,
					parseBefore(state));
			});
	});
var $elm$url$Url$Parser$questionMark = F2(
	function (parser, queryParser) {
		return A2(
			$elm$url$Url$Parser$slash,
			parser,
			$elm$url$Url$Parser$query(queryParser));
	});
var $elm$url$Url$Parser$s = function (str) {
	return $elm$url$Url$Parser$Parser(
		function (_v0) {
			var visited = _v0.visited;
			var unvisited = _v0.unvisited;
			var params = _v0.params;
			var frag = _v0.frag;
			var value = _v0.value;
			if (!unvisited.b) {
				return _List_Nil;
			} else {
				var next = unvisited.a;
				var rest = unvisited.b;
				return _Utils_eq(next, str) ? _List_fromArray(
					[
						A5(
						$elm$url$Url$Parser$State,
						A2($elm$core$List$cons, next, visited),
						rest,
						params,
						frag,
						value)
					]) : _List_Nil;
			}
		});
};
var $elm$url$Url$Parser$custom = F2(
	function (tipe, stringToSomething) {
		return $elm$url$Url$Parser$Parser(
			function (_v0) {
				var visited = _v0.visited;
				var unvisited = _v0.unvisited;
				var params = _v0.params;
				var frag = _v0.frag;
				var value = _v0.value;
				if (!unvisited.b) {
					return _List_Nil;
				} else {
					var next = unvisited.a;
					var rest = unvisited.b;
					var _v2 = stringToSomething(next);
					if (_v2.$ === 'Just') {
						var nextValue = _v2.a;
						return _List_fromArray(
							[
								A5(
								$elm$url$Url$Parser$State,
								A2($elm$core$List$cons, next, visited),
								rest,
								params,
								frag,
								value(nextValue))
							]);
					} else {
						return _List_Nil;
					}
				}
			});
	});
var $elm$url$Url$Parser$string = A2($elm$url$Url$Parser$custom, 'STRING', $elm$core$Maybe$Just);
var $elm$url$Url$Parser$Query$string = function (key) {
	return A2(
		$elm$url$Url$Parser$Query$custom,
		key,
		function (stringList) {
			if (stringList.b && (!stringList.b.b)) {
				var str = stringList.a;
				return $elm$core$Maybe$Just(str);
			} else {
				return $elm$core$Maybe$Nothing;
			}
		});
};
var $elm$url$Url$Parser$top = $elm$url$Url$Parser$Parser(
	function (state) {
		return _List_fromArray(
			[state]);
	});
var $author$project$Main$routeParser = $elm$url$Url$Parser$oneOf(
	_List_fromArray(
		[
			A2($elm$url$Url$Parser$map, $author$project$Model$AllProjectsPage, $elm$url$Url$Parser$top),
			A2(
			$elm$url$Url$Parser$map,
			$author$project$Model$AllProjectsPage,
			$elm$url$Url$Parser$s('projects')),
			A2(
			$elm$url$Url$Parser$map,
			$author$project$Model$ProjectPage,
			A2(
				$elm$url$Url$Parser$slash,
				$elm$url$Url$Parser$s('projects'),
				$elm$url$Url$Parser$string)),
			A2(
			$elm$url$Url$Parser$map,
			$author$project$Model$GlobalGraphPage,
			$elm$url$Url$Parser$s('graph')),
			A2(
			$elm$url$Url$Parser$map,
			$author$project$Model$ReleasesPage,
			$elm$url$Url$Parser$s('releases')),
			A2(
			$elm$url$Url$Parser$map,
			$author$project$Model$ReleasePage,
			A2(
				$elm$url$Url$Parser$slash,
				$elm$url$Url$Parser$s('releases'),
				A2(
					$elm$url$Url$Parser$questionMark,
					A2(
						$elm$url$Url$Parser$questionMark,
						A2(
							$elm$url$Url$Parser$questionMark,
							$elm$url$Url$Parser$string,
							$elm$url$Url$Parser$Query$string('ref')),
						$elm$url$Url$Parser$Query$string('milestone')),
					$elm$url$Url$Parser$Query$int('tab')))),
			A2(
			$elm$url$Url$Parser$map,
			$author$project$Model$PullRequestsPage,
			$elm$url$Url$Parser$s('pull-requests')),
			A2(
			$elm$url$Url$Parser$map,
			$author$project$Model$ArchivePage,
			$elm$url$Url$Parser$s('archive')),
			A2(
			$elm$url$Url$Parser$map,
			$author$project$Model$PairsPage,
			$elm$url$Url$Parser$s('pairs')),
			A2(
			$elm$url$Url$Parser$map,
			$author$project$Model$BouncePage,
			A2(
				$elm$url$Url$Parser$slash,
				$elm$url$Url$Parser$s('auth'),
				$elm$url$Url$Parser$s('github'))),
			A2(
			$elm$url$Url$Parser$map,
			$author$project$Model$BouncePage,
			$elm$url$Url$Parser$s('auth')),
			A2(
			$elm$url$Url$Parser$map,
			$author$project$Model$BouncePage,
			$elm$url$Url$Parser$s('logout'))
		]));
var $author$project$Main$filteredCardsByTitle = F2(
	function (model, filters) {
		return A3(
			$elm$core$Dict$foldl,
			F2(
				function (_v0, card) {
					return A2(
						$elm$core$List$all,
						function (f) {
							return f(card);
						},
						filters) ? A2(
						$elm$core$Dict$insert,
						$elm$core$String$toLower(card.title),
						card.id) : $elm$core$Basics$identity;
				}),
			$elm$core$Dict$empty,
			model.cards);
	});
var $author$project$Query$largestMatchFirst = F2(
	function (_v0, _v1) {
		var xi = _v0.a;
		var xl = _v0.b;
		var yi = _v1.a;
		var yl = _v1.b;
		return _Utils_eq(xi, yi) ? A2($elm$core$Basics$compare, yl, xl) : A2($elm$core$Basics$compare, xi, yi);
	});
var $author$project$Query$simplifyResult = F2(
	function (_v0, _v1) {
		var i = _v0.a;
		var l = _v0.b;
		var ms = _v1.a;
		var o = _v1.b;
		return (_Utils_cmp(i + l, o) < 1) ? _Utils_Tuple2(ms, o) : ((_Utils_cmp(i, o) < 0) ? _Utils_Tuple2(
			_Utils_ap(
				ms,
				_List_fromArray(
					[
						_Utils_Tuple2(o, l - (o - i))
					])),
			o + (l - (o - i))) : _Utils_Tuple2(
			_Utils_ap(
				ms,
				_List_fromArray(
					[
						_Utils_Tuple2(i, l)
					])),
			i + l));
	});
var $author$project$Query$wordMatches = F2(
	function (lowerHaystack, lowerNeedle) {
		var len = $elm$core$String$length(lowerNeedle);
		var indexes = (len === 1) ? A2(
			$elm$core$List$map,
			function ($) {
				return $.index;
			},
			A2(
				$elm$regex$Regex$find,
				A2(
					$elm$core$Maybe$withDefault,
					$elm$regex$Regex$never,
					$elm$regex$Regex$fromString('\\b(' + (lowerNeedle + ')\\b'))),
				lowerHaystack)) : A2($elm$core$String$indexes, lowerNeedle, lowerHaystack);
		return A2(
			$elm$core$List$map,
			function (i) {
				return _Utils_Tuple2(i, len);
			},
			indexes);
	});
var $elm$core$String$words = _String_words;
var $author$project$Query$matchWords = F2(
	function (needle, haystack) {
		var matches = A2(
			$elm$core$List$map,
			$author$project$Query$wordMatches(haystack),
			$elm$core$String$words(needle));
		return A2($elm$core$List$any, $elm$core$List$isEmpty, matches) ? $elm$core$Maybe$Nothing : $elm$core$Maybe$Just(
			A3(
				$elm$core$List$foldl,
				$author$project$Query$simplifyResult,
				_Utils_Tuple2(_List_Nil, 0),
				A2(
					$elm$core$List$sortWith,
					$author$project$Query$largestMatchFirst,
					$elm$core$List$concat(matches))).a);
	});
var $author$project$Main$searchFilter = F3(
	function (model, filter, card) {
		_v0$5:
		while (true) {
			if ((filter.b && filter.b.b) && (!filter.b.b.b)) {
				switch (filter.a) {
					case 'label':
						var _v1 = filter.b;
						var name = _v1.a;
						return A3($author$project$Label$cardHasLabel, model, name, card);
					case 'is':
						switch (filter.b.a) {
							case 'pr':
								var _v2 = filter.b;
								return $author$project$Card$isPR(card);
							case 'issue':
								var _v3 = filter.b;
								return !$author$project$Card$isPR(card);
							case 'open':
								var _v4 = filter.b;
								return $author$project$Card$isOpen(card);
							case 'closed':
								var _v5 = filter.b;
								return !$author$project$Card$isOpen(card);
							default:
								break _v0$5;
						}
					default:
						break _v0$5;
				}
			} else {
				break _v0$5;
			}
		}
		return false;
	});
var $author$project$Main$searchCards = F2(
	function (model, str) {
		var tokens = A2($elm$core$String$split, ' ', str);
		var _v0 = A2(
			$elm$core$List$partition,
			$elm$core$String$contains(':'),
			tokens);
		var filterTokens = _v0.a;
		var rest = _v0.b;
		var filters = A2(
			$elm$core$List$map,
			A2(
				$elm$core$Basics$composeR,
				$elm$core$String$split(':'),
				$author$project$Main$searchFilter(model)),
			filterTokens);
		var query = $elm$core$String$toLower(
			A2($elm$core$String$join, ' ', rest));
		var titleMatch = F2(
			function (t, _v2) {
				return !_Utils_eq(
					A2($author$project$Query$matchWords, query, t),
					$elm$core$Maybe$Nothing);
			});
		return ($elm$core$String$length(query) < 2) ? $elm$core$Set$empty : A3(
			$elm$core$Dict$foldl,
			function (_v1) {
				return $elm$core$Set$insert;
			},
			$elm$core$Set$empty,
			A2(
				$elm$core$Dict$filter,
				titleMatch,
				A2($author$project$Main$filteredCardsByTitle, model, filters)));
	});
var $elm$core$Set$foldl = F3(
	function (func, initialState, _v0) {
		var dict = _v0.a;
		return A3(
			$elm$core$Dict$foldl,
			F3(
				function (key, _v1, state) {
					return A2(func, key, state);
				}),
			initialState,
			dict);
	});
var $y0hy0h$ordered_containers$OrderedSet$insert = F2(
	function (key, _v0) {
		var list = _v0.a;
		var dict = _v0.b;
		var _v1 = A2($elm$core$Dict$get, key, dict);
		if (_v1.$ === 'Just') {
			return A2($y0hy0h$ordered_containers$OrderedSet$OrderedSet, list, dict);
		} else {
			return A2(
				$y0hy0h$ordered_containers$OrderedSet$OrderedSet,
				_Utils_ap(
					list,
					_List_fromArray(
						[key])),
				A3($elm$core$Dict$insert, key, _Utils_Tuple0, dict));
		}
	});
var $author$project$CardOperations$selectAnticipatedCards = function (model) {
	return _Utils_update(
		model,
		{
			anticipatedCards: $elm$core$Set$empty,
			selectedCards: A3($elm$core$Set$foldl, $y0hy0h$ordered_containers$OrderedSet$insert, model.selectedCards, model.anticipatedCards)
		});
};
var $author$project$CardOperations$selectCard = F2(
	function (id, model) {
		return _Utils_update(
			model,
			{
				selectedCards: A2($y0hy0h$ordered_containers$OrderedSet$insert, id, model.selectedCards)
			});
	});
var $author$project$Model$ProgressLoading = {$: 'ProgressLoading'};
var $author$project$Main$setLoading = F2(
	function (ids, model) {
		return _Utils_update(
			model,
			{
				progress: A3(
					$elm$core$List$foldl,
					function (id) {
						return A2($elm$core$Dict$insert, id, $author$project$Model$ProgressLoading);
					},
					model.progress,
					ids)
			});
	});
var $author$project$GitHub$updateProjectCardMutation = function () {
	var noteVar = A3(
		$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$required,
		'note',
		function ($) {
			return $.note;
		},
		$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$nullable($jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$string));
	var isArchivedVar = A3(
		$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$required,
		'isArchived',
		function ($) {
			return $.isArchived;
		},
		$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$nullable($jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$bool));
	var cardIDVar = A3(
		$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$required,
		'cardId',
		function ($) {
			return $.cardId;
		},
		$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$id);
	return $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$mutationDocument(
		$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$extract(
			A3(
				$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
				'updateProjectCard',
				_List_fromArray(
					[
						_Utils_Tuple2(
						'input',
						$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$object(
							_List_fromArray(
								[
									_Utils_Tuple2(
									'projectCardId',
									$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$variable(cardIDVar)),
									_Utils_Tuple2(
									'note',
									$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$variable(noteVar)),
									_Utils_Tuple2(
									'isArchived',
									$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$variable(isArchivedVar))
								])))
					]),
				$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$extract(
					A3($jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'projectCard', _List_Nil, $author$project$GitHub$projectColumnCardObject)))));
}();
var $author$project$GitHub$setCardArchived = F3(
	function (token, cardID, archived) {
		return A2(
			$jamesmacaulay$elm_graphql$GraphQL$Client$Http$customSendMutation,
			$author$project$GitHub$authedOptions(token),
			A2(
				$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$request,
				{
					cardId: cardID,
					isArchived: $elm$core$Maybe$Just(archived),
					note: $elm$core$Maybe$Nothing
				},
				$author$project$GitHub$updateProjectCardMutation));
	});
var $author$project$Effects$setProjectCardArchived = F3(
	function (model, cardId, archived) {
		return A2(
			$author$project$Effects$withTokenOrLogIn,
			model,
			function (token) {
				var refreshColumn = function (res) {
					if (res.$ === 'Ok') {
						var columnId = res.a.columnId;
						return A2(
							$author$project$Model$DataChanged,
							$author$project$Effects$refreshColumnCards(columnId),
							$elm$core$Result$Ok(_Utils_Tuple0));
					} else {
						var msg = res.a;
						return A2(
							$author$project$Model$DataChanged,
							$elm$core$Platform$Cmd$none,
							$elm$core$Result$Err(msg));
					}
				};
				return A2(
					$author$project$Effects$withSetLoading,
					_List_fromArray(
						[cardId]),
					A2(
						$elm$core$Task$attempt,
						refreshColumn,
						A3($author$project$GitHub$setCardArchived, token, cardId, archived)));
			});
	});
var $elm$core$Dict$sizeHelp = F2(
	function (n, dict) {
		sizeHelp:
		while (true) {
			if (dict.$ === 'RBEmpty_elm_builtin') {
				return n;
			} else {
				var left = dict.d;
				var right = dict.e;
				var $temp$n = A2($elm$core$Dict$sizeHelp, n + 1, right),
					$temp$dict = left;
				n = $temp$n;
				dict = $temp$dict;
				continue sizeHelp;
			}
		}
	});
var $elm$core$Dict$size = function (dict) {
	return A2($elm$core$Dict$sizeHelp, 0, dict);
};
var $elm$url$Url$addPort = F2(
	function (maybePort, starter) {
		if (maybePort.$ === 'Nothing') {
			return starter;
		} else {
			var port_ = maybePort.a;
			return starter + (':' + $elm$core$String$fromInt(port_));
		}
	});
var $elm$url$Url$addPrefixed = F3(
	function (prefix, maybeSegment, starter) {
		if (maybeSegment.$ === 'Nothing') {
			return starter;
		} else {
			var segment = maybeSegment.a;
			return _Utils_ap(
				starter,
				_Utils_ap(prefix, segment));
		}
	});
var $elm$url$Url$toString = function (url) {
	var http = function () {
		var _v0 = url.protocol;
		if (_v0.$ === 'Http') {
			return 'http://';
		} else {
			return 'https://';
		}
	}();
	return A3(
		$elm$url$Url$addPrefixed,
		'#',
		url.fragment,
		A3(
			$elm$url$Url$addPrefixed,
			'?',
			url.query,
			_Utils_ap(
				A2(
					$elm$url$Url$addPort,
					url.port_,
					_Utils_ap(http, url.host)),
				url.path)));
};
var $elm$core$String$trim = _String_trim;
var $author$project$GitHub$unassignUsersMutation = function () {
	var assigneeIdsVar = A3(
		$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$required,
		'assigneeIds',
		function ($) {
			return $.assigneeIds;
		},
		$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$list($jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$id));
	var assignableIdVar = A3(
		$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$required,
		'assignableId',
		function ($) {
			return $.assignableId;
		},
		$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$id);
	var assignable = A2(
		$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
		A2(
			$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$inlineFragment,
			$elm$core$Maybe$Just(
				$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$onType('PullRequest')),
			A2($jamesmacaulay$elm_graphql$GraphQL$Request$Builder$map, $author$project$GitHub$AssignablePullRequest, $author$project$GitHub$prObject)),
		A2(
			$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
			A2(
				$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$inlineFragment,
				$elm$core$Maybe$Just(
					$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$onType('Issue')),
				A2($jamesmacaulay$elm_graphql$GraphQL$Request$Builder$map, $author$project$GitHub$AssignableIssue, $author$project$GitHub$issueObject)),
			$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$object($elm_community$maybe_extra$Maybe$Extra$or)));
	return $jamesmacaulay$elm_graphql$GraphQL$Request$Builder$mutationDocument(
		$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$extract(
			A3(
				$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
				'removeAssigneesFromAssignable',
				_List_fromArray(
					[
						_Utils_Tuple2(
						'input',
						$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$object(
							_List_fromArray(
								[
									_Utils_Tuple2(
									'assignableId',
									$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$variable(assignableIdVar)),
									_Utils_Tuple2(
									'assigneeIds',
									$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$variable(assigneeIdsVar))
								])))
					]),
				$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$extract(
					A3($jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'assignable', _List_Nil, assignable)))));
}();
var $author$project$GitHub$unassign = F3(
	function (token, assigneeIds, assignableId) {
		return A2(
			$jamesmacaulay$elm_graphql$GraphQL$Client$Http$customSendMutation,
			$author$project$GitHub$authedOptions(token),
			A2(
				$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$request,
				{assignableId: assignableId, assigneeIds: assigneeIds},
				$author$project$GitHub$unassignUsersMutation));
	});
var $author$project$Effects$unassignUsers = F3(
	function (model, users, id) {
		return A2(
			$author$project$Effects$withTokenOrLogIn,
			model,
			function (token) {
				return A2(
					$author$project$Effects$withSetLoading,
					_List_fromArray(
						[id]),
					A2(
						$elm$core$Task$attempt,
						$author$project$Model$AssigneesUpdated,
						A3(
							$author$project$GitHub$unassign,
							token,
							A2(
								$elm$core$List$map,
								function ($) {
									return $.id;
								},
								users),
							id)));
			});
	});
var $author$project$Drag$Dragging = function (a) {
	return {$: 'Dragging', a: a};
};
var $author$project$Drag$Dropping = function (a) {
	return {$: 'Dropping', a: a};
};
var $author$project$Drag$update = F2(
	function (msg, model) {
		switch (model.$) {
			case 'NotDragging':
				if (msg.$ === 'Start') {
					var source = msg.a;
					var startState = msg.b;
					return $author$project$Drag$Dragging(
						{dropCandidate: $elm$core$Maybe$Nothing, neverLeft: true, source: source, start: startState});
				} else {
					return $author$project$Drag$NotDragging;
				}
			case 'Dragging':
				var drag = model.a;
				switch (msg.$) {
					case 'Start':
						return model;
					case 'Over':
						var candidate = msg.a;
						return $author$project$Drag$Dragging(
							_Utils_update(
								drag,
								{dropCandidate: candidate, neverLeft: false}));
					default:
						var _v3 = drag.dropCandidate;
						if (_v3.$ === 'Nothing') {
							return $author$project$Drag$NotDragging;
						} else {
							var target = _v3.a.target;
							var msgFunc = _v3.a.msgFunc;
							return $author$project$Drag$Dropping(
								{
									landed: false,
									msg: A2(msgFunc, drag.source, target),
									source: drag.source,
									start: drag.start,
									target: target
								});
						}
				}
			case 'Dropping':
				return model;
			default:
				return model;
		}
	});
var $author$project$GitHub$updateCardNote = F3(
	function (token, cardID, note) {
		return A2(
			$jamesmacaulay$elm_graphql$GraphQL$Client$Http$customSendMutation,
			$author$project$GitHub$authedOptions(token),
			A2(
				$jamesmacaulay$elm_graphql$GraphQL$Request$Builder$request,
				{
					cardId: cardID,
					isArchived: $elm$core$Maybe$Nothing,
					note: $elm$core$Maybe$Just(note)
				},
				$author$project$GitHub$updateProjectCardMutation));
	});
var $author$project$Effects$updateCardNote = F3(
	function (model, cardId, note) {
		return A2(
			$author$project$Effects$withTokenOrLogIn,
			model,
			function (token) {
				var refreshColumn = function (res) {
					if (res.$ === 'Ok') {
						var columnId = res.a.columnId;
						return A2(
							$author$project$Model$DataChanged,
							$author$project$Effects$refreshColumnCards(columnId),
							$elm$core$Result$Ok(_Utils_Tuple0));
					} else {
						var msg = res.a;
						return A2(
							$author$project$Model$DataChanged,
							$elm$core$Platform$Cmd$none,
							$elm$core$Result$Err(msg));
					}
				};
				return A2(
					$author$project$Effects$withSetLoading,
					_List_fromArray(
						[cardId]),
					A2(
						$elm$core$Task$attempt,
						refreshColumn,
						A3($author$project$GitHub$updateCardNote, token, cardId, note)));
			});
	});
var $author$project$Main$pairUpUser = F2(
	function (target, _v28) {
		var model = _v28.a;
		var msg = _v28.b;
		var lastPaired = F2(
			function (userA, userB) {
				return A2(
					$elm$core$Dict$get,
					$elm$core$List$sort(
						_List_fromArray(
							[userA.id, userB.id])),
					model.lastPaired);
			});
		var pickBestUser = F2(
			function (user, cur) {
				var _v31 = _Utils_Tuple2(
					A2(lastPaired, target, user),
					A2(lastPaired, target, cur));
				if (_v31.a.$ === 'Just') {
					if (_v31.b.$ === 'Just') {
						var tsUser = _v31.a.a;
						var tsCur = _v31.b.a;
						return (_Utils_cmp(
							$elm$time$Time$posixToMillis(tsCur),
							$elm$time$Time$posixToMillis(tsUser)) < 0) ? cur : user;
					} else {
						var _v32 = _v31.b;
						return cur;
					}
				} else {
					if (_v31.b.$ === 'Just') {
						var _v33 = _v31.a;
						return user;
					} else {
						var _v34 = _v31.a;
						var _v35 = _v31.b;
						return (_Utils_cmp(user.id, cur.id) < 0) ? user : cur;
					}
				}
			});
		var _v29 = A2(
			$elm$core$List$partition,
			A2(
				$elm$core$Basics$composeL,
				A2(
					$elm$core$Basics$composeL,
					$elm$core$Basics$eq(1),
					$elm$core$List$length),
				function ($) {
					return $.assignees;
				}),
			A2(
				$elm$core$List$concatMap,
				function ($) {
					return $.lanes;
				},
				model.inFlight));
		var soloLanes = _v29.a;
		var pairingLanes = _v29.b;
		var isPairing = function (user) {
			return A2(
				$elm$core$List$any,
				A2(
					$elm$core$Basics$composeL,
					$elm$core$List$any(
						A2(
							$elm$core$Basics$composeL,
							$elm$core$Basics$eq(user.login),
							function ($) {
								return $.login;
							})),
					function ($) {
						return $.assignees;
					}),
				pairingLanes);
		};
		var pairingPool = A2(
			$elm$core$List$filter,
			A2($elm$core$Basics$composeL, $elm$core$Basics$not, isPairing),
			A2(
				$elm$core$List$concatMap,
				function ($) {
					return $.assignees;
				},
				A2(
					$elm$core$List$filter,
					A2(
						$elm$core$Basics$composeL,
						$elm$core$List$any(
							A2($elm$core$Basics$composeL, $elm$core$Basics$not, $author$project$Card$isPaused)),
						function ($) {
							return $.cards;
						}),
					soloLanes)));
		var _v30 = A2($elm_community$list_extra$List$Extra$foldl1, pickBestUser, pairingPool);
		if (_v30.$ === 'Just') {
			var pair = _v30.a;
			return A3(
				$author$project$Log$debug,
				'chose',
				_Utils_Tuple2(target.login, pair.login),
				function () {
					var activeCards = A2(
						$elm$core$List$concatMap,
						function ($) {
							return $.cards;
						},
						A2(
							$elm$core$List$filter,
							A2(
								$elm$core$Basics$composeL,
								$elm$core$List$any(
									A2(
										$elm$core$Basics$composeL,
										$elm$core$Basics$eq(pair.id),
										function ($) {
											return $.id;
										})),
								function ($) {
									return $.assignees;
								}),
							A2(
								$elm$core$List$concatMap,
								function ($) {
									return $.lanes;
								},
								model.inFlight)));
					return A2(
						$author$project$Main$update,
						A2($author$project$Model$AssignUser, target, activeCards),
						model);
				}());
		} else {
			return A3(
				$author$project$Log$debug,
				'no pair available',
				_Utils_Tuple2(
					target.login,
					A2(
						$elm$core$List$map,
						function ($) {
							return $.login;
						},
						pairingPool)),
				_Utils_Tuple2(model, msg));
		}
	});
var $author$project$Main$update = F2(
	function (msg, model) {
		update:
		while (true) {
			switch (msg.$) {
				case 'Noop':
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				case 'Poll':
					return _Utils_Tuple2(
						model,
						$author$project$Backend$fetchData($author$project$Model$DataFetched));
				case 'LinkClicked':
					var urlRequest = msg.a;
					if (urlRequest.$ === 'Internal') {
						var url = urlRequest.a;
						return _Utils_Tuple2(
							model,
							A2(
								$elm$browser$Browser$Navigation$pushUrl,
								model.key,
								$elm$url$Url$toString(url)));
					} else {
						var href = urlRequest.a;
						return _Utils_Tuple2(
							model,
							$elm$browser$Browser$Navigation$load(href));
					}
				case 'UrlChanged':
					var url = msg.a;
					var _v2 = A2($elm$url$Url$Parser$parse, $author$project$Main$routeParser, url);
					if (_v2.$ === 'Just') {
						if (_v2.a.$ === 'BouncePage') {
							var _v3 = _v2.a;
							return _Utils_Tuple2(
								model,
								$elm$browser$Browser$Navigation$load(
									$elm$url$Url$toString(url)));
						} else {
							var page = _v2.a;
							return _Utils_Tuple2(
								$author$project$Main$computeViewForPage(
									_Utils_update(
										model,
										{page: page})),
								$elm$core$Platform$Cmd$none);
						}
					} else {
						return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
					}
				case 'SetCurrentTime':
					var date = msg.a;
					return _Utils_Tuple2(
						$author$project$StatefulGraph$update(
							_Utils_update(
								model,
								{currentTime: date})),
						$elm$core$Platform$Cmd$none);
				case 'SetCurrentZone':
					var zone = msg.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{currentZone: zone}),
						$elm$core$Platform$Cmd$none);
				case 'SetLoading':
					var ids = msg.a;
					var cmd = msg.b;
					return _Utils_Tuple2(
						A2($author$project$Main$setLoading, ids, model),
						cmd);
				case 'ProjectDrag':
					var subMsg = msg.a;
					var dragModel = A2($author$project$Drag$update, subMsg, model.projectDrag);
					var newModel = _Utils_update(
						model,
						{projectDrag: dragModel});
					if (dragModel.$ === 'Dropping') {
						var state = dragModel.a;
						var $temp$msg = state.msg,
							$temp$model = _Utils_update(
							newModel,
							{
								projectDrag: $author$project$Drag$drop(newModel.projectDrag)
							});
						msg = $temp$msg;
						model = $temp$model;
						continue update;
					} else {
						return _Utils_Tuple2(newModel, $elm$core$Platform$Cmd$none);
					}
				case 'MoveCardAfter':
					var source = msg.a;
					var dest = msg.b;
					if (source.$ === 'FromColumnCardSource') {
						var cardId = source.a.cardId;
						return _Utils_Tuple2(
							model,
							A3($author$project$Effects$moveCard, model, dest, cardId));
					} else {
						var contentId = source.a.contentId;
						return _Utils_Tuple2(
							model,
							A3($author$project$Effects$addCard, model, dest, contentId));
					}
				case 'CardMoved':
					if (msg.b.$ === 'Ok') {
						var targetCol = msg.a;
						var card = msg.b.a;
						var _v6 = model.projectDrag;
						if (_v6.$ === 'Dropped') {
							var drop = _v6.a;
							return A4($author$project$CardOperations$dropCard, model, targetCol, card, drop);
						} else {
							return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
						}
					} else {
						var err = msg.b.a;
						return A3(
							$author$project$Log$debug,
							'failed to move card',
							err,
							_Utils_Tuple2(model, $elm$core$Platform$Cmd$none));
					}
				case 'AssignUserDrag':
					var subMsg = msg.a;
					var dragModel = A2($author$project$Drag$update, subMsg, model.assignUserDrag);
					var newModel = _Utils_update(
						model,
						{assignUserDrag: dragModel});
					if (dragModel.$ === 'Dropping') {
						var state = dragModel.a;
						var $temp$msg = state.msg,
							$temp$model = _Utils_update(
							newModel,
							{
								assignUserDrag: $author$project$Drag$complete(newModel.assignUserDrag)
							});
						msg = $temp$msg;
						model = $temp$model;
						continue update;
					} else {
						return _Utils_Tuple2(newModel, $elm$core$Platform$Cmd$none);
					}
				case 'AssignUser':
					var user = msg.a;
					var cards = msg.b;
					return A3(
						$author$project$Log$debug,
						'assigning',
						_Utils_Tuple2(
							user.login,
							A2(
								$elm$core$List$map,
								function ($) {
									return $.id;
								},
								cards)),
						_Utils_Tuple2(
							$author$project$Main$computeProjectLanes(
								_Utils_update(
									model,
									{
										pendingAssignments: A3(
											$elm$core$List$foldl,
											function (_v8) {
												var id = _v8.id;
												return A2(
													$elm$core$Dict$update,
													id,
													$author$project$Main$addAssignments(
														_List_fromArray(
															[user])));
											},
											model.pendingAssignments,
											cards)
									})),
							$elm$core$Platform$Cmd$none));
				case 'ReassignUserDrag':
					var subMsg = msg.a;
					var dragModel = A2($author$project$Drag$update, subMsg, model.reassignUserDrag);
					var newModel = _Utils_update(
						model,
						{reassignUserDrag: dragModel});
					if (dragModel.$ === 'Dropping') {
						var state = dragModel.a;
						var $temp$msg = state.msg,
							$temp$model = _Utils_update(
							newModel,
							{
								reassignUserDrag: $author$project$Drag$complete(newModel.reassignUserDrag)
							});
						msg = $temp$msg;
						model = $temp$model;
						continue update;
					} else {
						return _Utils_Tuple2(newModel, $elm$core$Platform$Cmd$none);
					}
				case 'ReassignUser':
					var _v10 = msg.a;
					var user = _v10.a;
					var unassignCards = _v10.b;
					var assignCards = msg.b;
					return A3(
						$author$project$Log$debug,
						'reassigning',
						_Utils_Tuple3(
							user.login,
							A2(
								$elm$core$List$map,
								function ($) {
									return $.id;
								},
								unassignCards),
							A2(
								$elm$core$List$map,
								function ($) {
									return $.id;
								},
								assignCards)),
						function () {
							var withUnassignments = function (pas) {
								return A3(
									$elm$core$List$foldl,
									function (_v12) {
										var id = _v12.id;
										return A2(
											$elm$core$Dict$update,
											id,
											$author$project$Main$addUnassignment(user));
									},
									pas,
									unassignCards);
							};
							var withAssignments = function (pas) {
								return A3(
									$elm$core$List$foldl,
									function (_v11) {
										var id = _v11.id;
										return A2(
											$elm$core$Dict$update,
											id,
											$author$project$Main$addAssignments(
												_List_fromArray(
													[user])));
									},
									pas,
									assignCards);
							};
							return _Utils_Tuple2(
								$author$project$Main$computeProjectLanes(
									_Utils_update(
										model,
										{
											pendingAssignments: withUnassignments(
												withAssignments(model.pendingAssignments))
										})),
								$elm$core$Platform$Cmd$none);
						}());
				case 'UnassignUser':
					var user = msg.a;
					var cards = msg.b;
					return A3(
						$author$project$Log$debug,
						'unassigning',
						_Utils_Tuple2(
							user.login,
							A2(
								$elm$core$List$map,
								function ($) {
									return $.id;
								},
								cards)),
						_Utils_Tuple2(
							$author$project$Main$computeProjectLanes(
								_Utils_update(
									model,
									{
										pendingAssignments: A3(
											$elm$core$List$foldl,
											function (_v13) {
												var id = _v13.id;
												return A2(
													$elm$core$Dict$update,
													id,
													$author$project$Main$addUnassignment(user));
											},
											model.pendingAssignments,
											cards)
									})),
							$elm$core$Platform$Cmd$none));
				case 'AssignOnlyUsersDrag':
					var subMsg = msg.a;
					var dragModel = A2($author$project$Drag$update, subMsg, model.assignOnlyUsersDrag);
					var newModel = _Utils_update(
						model,
						{assignOnlyUsersDrag: dragModel});
					if (dragModel.$ === 'Dropping') {
						var state = dragModel.a;
						var $temp$msg = state.msg,
							$temp$model = _Utils_update(
							newModel,
							{
								assignOnlyUsersDrag: $author$project$Drag$complete(newModel.assignOnlyUsersDrag)
							});
						msg = $temp$msg;
						model = $temp$model;
						continue update;
					} else {
						return _Utils_Tuple2(newModel, $elm$core$Platform$Cmd$none);
					}
				case 'AssignOnlyUsers':
					var card = msg.a;
					var users = msg.b;
					return A3(
						$author$project$Log$debug,
						'assigning',
						_Utils_Tuple2(
							A2(
								$elm$core$List$map,
								function ($) {
									return $.login;
								},
								users),
							card.id),
						function () {
							var userIds = A2(
								$elm$core$List$map,
								function ($) {
									return $.id;
								},
								users);
							var beingAssigned = function (_v15) {
								var id = _v15.id;
								return A2($elm$core$List$member, id, userIds);
							};
							var otherAssignees = A2(
								$elm$core$List$filter,
								A2($elm$core$Basics$composeL, $elm$core$Basics$not, beingAssigned),
								card.assignees);
							return _Utils_Tuple2(
								$author$project$Main$computeProjectLanes(
									_Utils_update(
										model,
										{
											pendingAssignments: A3(
												$elm$core$Dict$update,
												card.id,
												$author$project$Main$addAssignments(users),
												A3(
													$elm$core$List$foldl,
													function (other) {
														return A2(
															$elm$core$Dict$update,
															card.id,
															$author$project$Main$addUnassignment(other));
													},
													model.pendingAssignments,
													otherAssignees))
										})),
								$elm$core$Platform$Cmd$none);
						}());
				case 'AssignPairs':
					var assigned = F2(
						function (projectLanes, user) {
							assigned:
							while (true) {
								if (!projectLanes.b) {
									return false;
								} else {
									var lanes = projectLanes.a.lanes;
									var rest = projectLanes.b;
									if (A2(
										$elm$core$List$any,
										A2(
											$elm$core$Basics$composeL,
											$elm$core$List$any(
												A2(
													$elm$core$Basics$composeL,
													$elm$core$Basics$eq(user.id),
													function ($) {
														return $.id;
													})),
											function ($) {
												return $.assignees;
											}),
										lanes)) {
										return true;
									} else {
										var $temp$projectLanes = rest,
											$temp$user = user;
										projectLanes = $temp$projectLanes;
										user = $temp$user;
										continue assigned;
									}
								}
							}
						});
					var assignable = function (user) {
						return (!A2($elm$core$Set$member, user.id, model.outUsers)) && (!A2(assigned, model.inFlight, user));
					};
					var toAssign = A2($elm$core$List$filter, assignable, model.assignableUsers);
					return A3(
						$elm$core$List$foldl,
						$author$project$Main$pairUpUser,
						_Utils_Tuple2(model, $elm$core$Platform$Cmd$none),
						toAssign);
				case 'CommitAssignments':
					var cardAssignments = F2(
						function (cardId, _v18) {
							var assign = _v18.assign;
							var unassign = _v18.unassign;
							var _v17 = _Utils_Tuple2(assign, unassign);
							if (!_v17.a.b) {
								if (!_v17.b.b) {
									return _List_Nil;
								} else {
									return _List_fromArray(
										[
											A3($author$project$Effects$unassignUsers, model, unassign, cardId)
										]);
								}
							} else {
								if (!_v17.b.b) {
									return _List_fromArray(
										[
											A3($author$project$Effects$assignUsers, model, assign, cardId)
										]);
								} else {
									return _List_fromArray(
										[
											A3($author$project$Effects$assignUsers, model, assign, cardId),
											A3($author$project$Effects$unassignUsers, model, unassign, cardId)
										]);
								}
							}
						});
					return _Utils_Tuple2(
						$author$project$Main$computeProjectLanes(
							_Utils_update(
								model,
								{pendingAssignments: $elm$core$Dict$empty})),
						$elm$core$Platform$Cmd$batch(
							A3(
								$elm$core$Dict$foldl,
								F3(
									function (cardId, assignments, effects) {
										return _Utils_ap(
											A2(cardAssignments, cardId, assignments),
											effects);
									}),
								_List_Nil,
								model.pendingAssignments)));
				case 'ResetAssignments':
					return _Utils_Tuple2(
						$author$project$Main$computeProjectLanes(
							_Utils_update(
								model,
								{pendingAssignments: $elm$core$Dict$empty})),
						$elm$core$Platform$Cmd$none);
				case 'AssigneesUpdated':
					if (msg.a.$ === 'Ok') {
						if (msg.a.a.$ === 'Just') {
							var assignable = msg.a.a.a;
							return _Utils_Tuple2(
								model,
								function () {
									if (assignable.$ === 'AssignableIssue') {
										var issue = assignable.a;
										return $author$project$Effects$refreshIssue(issue.id);
									} else {
										var pr = assignable.a;
										return $author$project$Effects$refreshPR(pr.id);
									}
								}());
						} else {
							var _v20 = msg.a.a;
							return A3(
								$author$project$Log$debug,
								'assignment returned nothing',
								_Utils_Tuple0,
								_Utils_Tuple2(model, $elm$core$Platform$Cmd$none));
						}
					} else {
						var err = msg.a.a;
						return A3(
							$author$project$Log$debug,
							'assign failed',
							err,
							_Utils_Tuple2(model, $elm$core$Platform$Cmd$none));
					}
				case 'RefreshQueued':
					if (msg.a.$ === 'Ok') {
						return A3(
							$author$project$Log$debug,
							'refresh queued',
							_Utils_Tuple0,
							_Utils_Tuple2(model, $elm$core$Platform$Cmd$none));
					} else {
						var err = msg.a.a;
						return A3(
							$author$project$Log$debug,
							'refresh failed',
							err,
							_Utils_Tuple2(model, $elm$core$Platform$Cmd$none));
					}
				case 'SearchCards':
					var str = msg.a;
					return _Utils_Tuple2(
						$author$project$StatefulGraph$update(
							_Utils_update(
								model,
								{
									anticipatedCards: A2($author$project$Main$searchCards, model, str),
									cardSearch: str
								})),
						$elm$core$Platform$Cmd$none);
				case 'SelectAnticipatedCards':
					return _Utils_Tuple2(
						$author$project$StatefulGraph$update(
							$author$project$CardOperations$selectAnticipatedCards(model)),
						$elm$core$Platform$Cmd$none);
				case 'SelectCard':
					var id = msg.a;
					return _Utils_Tuple2(
						$author$project$StatefulGraph$update(
							A2($author$project$CardOperations$selectCard, id, model)),
						$elm$core$Platform$Cmd$none);
				case 'ClearSelectedCards':
					return _Utils_Tuple2(
						$author$project$StatefulGraph$update(
							$author$project$CardOperations$clearSelectedCards(model)),
						$elm$core$Platform$Cmd$none);
				case 'DeselectCard':
					var id = msg.a;
					return _Utils_Tuple2(
						$author$project$StatefulGraph$update(
							A2($author$project$CardOperations$deselectCard, id, model)),
						$elm$core$Platform$Cmd$none);
				case 'HighlightNode':
					var id = msg.a;
					return _Utils_Tuple2(
						$author$project$StatefulGraph$update(
							_Utils_update(
								model,
								{
									highlightedNode: $elm$core$Maybe$Just(id)
								})),
						$elm$core$Platform$Cmd$none);
				case 'UnhighlightNode':
					return _Utils_Tuple2(
						$author$project$StatefulGraph$update(
							_Utils_update(
								model,
								{highlightedNode: $elm$core$Maybe$Nothing})),
						$elm$core$Platform$Cmd$none);
				case 'AnticipateCardFromNode':
					var id = msg.a;
					return _Utils_Tuple2(
						$author$project$StatefulGraph$update(
							_Utils_update(
								model,
								{
									anticipatedCards: A2($elm$core$Set$insert, id, model.anticipatedCards),
									highlightedCard: $elm$core$Maybe$Just(id)
								})),
						$elm$core$Platform$Cmd$none);
				case 'UnanticipateCardFromNode':
					var id = msg.a;
					return _Utils_Tuple2(
						$author$project$StatefulGraph$update(
							_Utils_update(
								model,
								{
									anticipatedCards: A2($elm$core$Set$remove, id, model.anticipatedCards),
									highlightedCard: $elm$core$Maybe$Nothing
								})),
						$elm$core$Platform$Cmd$none);
				case 'MeFetched':
					if (msg.a.$ === 'Ok') {
						var me = msg.a.a;
						return _Utils_Tuple2(
							$author$project$StatefulGraph$update(
								_Utils_update(
									model,
									{me: me})),
							$elm$core$Platform$Cmd$none);
					} else {
						var err = msg.a.a;
						return A3(
							$author$project$Log$debug,
							'error fetching self',
							err,
							_Utils_Tuple2(model, $elm$core$Platform$Cmd$none));
					}
				case 'EventReceived':
					var _v21 = msg.a;
					var event = _v21.a;
					var data = _v21.b;
					var indexStr = _v21.c;
					var _v22 = $elm$core$String$toInt(indexStr);
					if (_v22.$ === 'Just') {
						var index = _v22.a;
						return (_Utils_cmp(index, model.dataIndex) > -1) ? (_Utils_eq(index, model.dataIndex + 1) ? _Utils_Tuple2(
							$author$project$Main$computeViewForPage(
								A4(
									$author$project$Main$handleEvent,
									event,
									data,
									index,
									_Utils_update(
										model,
										{dataIndex: index}))),
							$elm$core$Platform$Cmd$none) : _Utils_Tuple2(
							model,
							A3(
								$author$project$Log$debug,
								'skipped a data index; syncing',
								_Utils_Tuple2(model.dataIndex, index),
								$author$project$Backend$fetchData($author$project$Model$DataFetched)))) : A3(
							$author$project$Log$debug,
							'skipping event for stale index',
							_Utils_Tuple2(model.dataIndex, index),
							_Utils_Tuple2(model, $elm$core$Platform$Cmd$none));
					} else {
						return A3(
							$author$project$Log$debug,
							'invalid event index',
							indexStr,
							_Utils_Tuple2(model, $elm$core$Platform$Cmd$none));
					}
				case 'DataFetched':
					if (msg.a.$ === 'Ok') {
						var index = msg.a.a.index;
						var value = msg.a.a.value;
						return (_Utils_cmp(index, model.dataIndex) > 0) ? _Utils_Tuple2(
							$author$project$Main$computeViewForPage(
								$author$project$Main$computeDataView(
									_Utils_update(
										model,
										{
											assignableUsers: value.pairingUsers,
											columnCards: value.columnCards,
											dataIndex: index,
											progress: A2($author$project$Main$finishLoadingData, value, model.progress),
											repoCommits: value.repoCommits,
											repoLabels: value.repoLabels,
											repoMilestones: value.repoMilestones,
											repoProjects: value.repoProjects,
											repoReleases: value.repoReleases,
											repos: value.repos
										}))),
							$author$project$Backend$fetchCardData($author$project$Model$CardDataFetched)) : A3(
							$author$project$Log$debug,
							'ignoring stale index',
							_Utils_Tuple2(index, model.dataIndex),
							_Utils_Tuple2(model, $elm$core$Platform$Cmd$none));
					} else {
						var err = msg.a.a;
						return A3(
							$author$project$Log$debug,
							'error fetching data',
							err,
							_Utils_Tuple2(model, $elm$core$Platform$Cmd$none));
					}
				case 'CardDataFetched':
					if (msg.a.$ === 'Ok') {
						var index = msg.a.a.index;
						var value = msg.a.a.value;
						return A3(
							$author$project$Log$debug,
							'cards fetched',
							_Utils_Tuple2(
								index,
								$elm$core$Dict$size(value.issues) + $elm$core$Dict$size(value.prs)),
							_Utils_Tuple2(
								$author$project$Main$computeViewForPage(
									$author$project$Main$computeCardsView(
										_Utils_update(
											model,
											{
												cardClosers: value.cardClosers,
												cardEvents: value.cardEvents,
												cardRotations: value.cardRotations,
												issues: value.issues,
												prReviewers: value.prReviewers,
												progress: A2($author$project$Main$finishLoadingCardData, value, model.progress),
												prs: value.prs
											}))),
								$author$project$Backend$fetchGraphs($author$project$Model$GraphsFetched)));
					} else {
						var err = msg.a.a;
						return A3(
							$author$project$Log$debug,
							'error fetching cards',
							err,
							_Utils_Tuple2(model, $elm$core$Platform$Cmd$none));
					}
				case 'GraphsFetched':
					if (msg.a.$ === 'Ok') {
						var index = msg.a.a.index;
						var value = msg.a.a.value;
						return A3(
							$author$project$Log$debug,
							'graphs fetched',
							_Utils_Tuple2(
								index,
								$elm$core$List$length(value)),
							_Utils_Tuple2(
								$author$project$Main$computeViewForPage(
									$author$project$StatefulGraph$init(
										_Utils_update(
											model,
											{graphs: value}))),
								$elm$core$Platform$Cmd$none));
					} else {
						var err = msg.a.a;
						return A3(
							$author$project$Log$debug,
							'error fetching graphs',
							err,
							_Utils_Tuple2(model, $elm$core$Platform$Cmd$none));
					}
				case 'LabelCard':
					var card = msg.a;
					var label = msg.b;
					var _v23 = card.content;
					if (_v23.$ === 'IssueCardContent') {
						var issue = _v23.a;
						return _Utils_Tuple2(
							model,
							A3(
								$author$project$Effects$addIssueLabels,
								model,
								issue,
								_List_fromArray(
									[label])));
					} else {
						var pr = _v23.a;
						return _Utils_Tuple2(
							model,
							A3(
								$author$project$Effects$addPullRequestLabels,
								model,
								pr,
								_List_fromArray(
									[label])));
					}
				case 'UnlabelCard':
					var card = msg.a;
					var label = msg.b;
					var _v24 = card.content;
					if (_v24.$ === 'IssueCardContent') {
						var issue = _v24.a;
						return _Utils_Tuple2(
							model,
							A3($author$project$Effects$removeIssueLabel, model, issue, label));
					} else {
						var pr = _v24.a;
						return _Utils_Tuple2(
							model,
							A3($author$project$Effects$removePullRequestLabel, model, pr, label));
					}
				case 'DataChanged':
					if (msg.b.$ === 'Ok') {
						var cb = msg.a;
						return _Utils_Tuple2(model, cb);
					} else {
						var err = msg.b.a;
						return A3(
							$author$project$Log$debug,
							'failed to change data',
							err,
							_Utils_Tuple2(model, $elm$core$Platform$Cmd$none));
					}
				case 'RefreshIssue':
					var id = msg.a;
					return _Utils_Tuple2(
						model,
						$author$project$Effects$refreshIssue(id));
				case 'RefreshPullRequest':
					var id = msg.a;
					return _Utils_Tuple2(
						model,
						$author$project$Effects$refreshPR(id));
				case 'RefreshColumn':
					var id = msg.a;
					return _Utils_Tuple2(
						model,
						$author$project$Effects$refreshColumnCards(id));
				case 'AddFilter':
					var filter = msg.a;
					return _Utils_Tuple2(
						$author$project$StatefulGraph$init(
							_Utils_update(
								model,
								{
									graphFilters: A2($elm$core$List$cons, filter, model.graphFilters)
								})),
						$elm$core$Platform$Cmd$none);
				case 'RemoveFilter':
					var filter = msg.a;
					return _Utils_Tuple2(
						$author$project$StatefulGraph$init(
							_Utils_update(
								model,
								{
									graphFilters: A2(
										$elm$core$List$filter,
										$elm$core$Basics$neq(filter),
										model.graphFilters)
								})),
						$elm$core$Platform$Cmd$none);
				case 'SetGraphSort':
					var sort = msg.a;
					return _Utils_Tuple2(
						$author$project$StatefulGraph$init(
							_Utils_update(
								model,
								{graphSort: sort})),
						$elm$core$Platform$Cmd$none);
				case 'ToggleLabelFilters':
					return _Utils_Tuple2(
						$author$project$StatefulGraph$init(
							_Utils_update(
								model,
								{showLabelFilters: !model.showLabelFilters})),
						$elm$core$Platform$Cmd$none);
				case 'SetLabelSearch':
					var string = msg.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{labelSearch: string}),
						$elm$core$Platform$Cmd$none);
				case 'ToggleLabelOperations':
					return _Utils_Tuple2(
						model.showLabelOperations ? _Utils_update(
							model,
							{cardLabelOperations: $elm$core$Dict$empty, labelSearch: '', showLabelOperations: false}) : _Utils_update(
							model,
							{showLabelOperations: true}),
						$elm$core$Platform$Cmd$none);
				case 'SetLabelOperation':
					var name = msg.a;
					var op = msg.b;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								cardLabelOperations: A3($elm$core$Dict$insert, name, op, model.cardLabelOperations)
							}),
						$elm$core$Platform$Cmd$none);
				case 'UnsetLabelOperation':
					var name = msg.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								cardLabelOperations: A2($elm$core$Dict$remove, name, model.cardLabelOperations)
							}),
						$elm$core$Platform$Cmd$none);
				case 'ApplyLabelOperations':
					return _Utils_Tuple2(
						model,
						$author$project$CardOperations$applyLabelOperations(model));
				case 'SetCreatingColumnNote':
					var id = msg.a;
					var note = msg.b;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								addingColumnNotes: A3($elm$core$Dict$insert, id, note, model.addingColumnNotes)
							}),
						A2(
							$elm$core$Task$attempt,
							$elm$core$Basics$always($author$project$Model$Noop),
							$elm$browser$Browser$Dom$focus(
								$author$project$Main$focusId(id))));
				case 'CancelCreatingColumnNote':
					var id = msg.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								addingColumnNotes: A2($elm$core$Dict$remove, id, model.addingColumnNotes)
							}),
						$elm$core$Platform$Cmd$none);
				case 'CreateColumnNote':
					var id = msg.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								addingColumnNotes: A2($elm$core$Dict$remove, id, model.addingColumnNotes)
							}),
						function () {
							var _v25 = A2(
								$elm$core$Maybe$withDefault,
								'',
								A2($elm$core$Dict$get, id, model.addingColumnNotes));
							if (_v25 === '') {
								return $elm$core$Platform$Cmd$none;
							} else {
								var note = _v25;
								return A3($author$project$Effects$addNoteCard, model, id, note);
							}
						}());
				case 'ConfirmDeleteCard':
					var id = msg.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								deletingCards: A2($elm$core$Set$insert, id, model.deletingCards)
							}),
						$elm$core$Platform$Cmd$none);
				case 'CancelDeleteCard':
					var id = msg.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								deletingCards: A2($elm$core$Set$remove, id, model.deletingCards)
							}),
						$elm$core$Platform$Cmd$none);
				case 'DeleteCard':
					var id = msg.a;
					var ghCardId = msg.b;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								deletingCards: A2($elm$core$Set$remove, id, model.deletingCards)
							}),
						A2($author$project$Effects$deleteProjectCard, model, ghCardId));
				case 'SetCardArchived':
					var ghCardId = msg.a;
					var archived = msg.b;
					return _Utils_Tuple2(
						model,
						A3($author$project$Effects$setProjectCardArchived, model, ghCardId, archived));
				case 'SetEditingCardNote':
					var id = msg.a;
					var val = msg.b;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								editingCardNotes: A3($elm$core$Dict$insert, id, val, model.editingCardNotes)
							}),
						$author$project$CardView$focusEditNote(id));
				case 'CancelEditingCardNote':
					var id = msg.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								editingCardNotes: A2($elm$core$Dict$remove, id, model.editingCardNotes)
							}),
						$elm$core$Platform$Cmd$none);
				case 'UpdateCardNote':
					var id = msg.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								editingCardNotes: A2($elm$core$Dict$remove, id, model.editingCardNotes)
							}),
						function () {
							var _v26 = A2(
								$elm$core$Maybe$withDefault,
								'',
								A2($elm$core$Dict$get, id, model.editingCardNotes));
							if (_v26 === '') {
								return $elm$core$Platform$Cmd$none;
							} else {
								var note = _v26;
								return A3($author$project$Effects$updateCardNote, model, id, note);
							}
						}());
				case 'ConvertEditingCardNoteToIssue':
					var id = msg.a;
					var repoId = msg.b;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								editingCardNotes: A2($elm$core$Dict$remove, id, model.editingCardNotes)
							}),
						function () {
							var note = A2(
								$elm$core$Maybe$withDefault,
								'',
								A2($elm$core$Dict$get, id, model.editingCardNotes));
							var lines = $elm$core$String$lines(note);
							if (!lines.b) {
								return $elm$core$Platform$Cmd$none;
							} else {
								var title = lines.a;
								var rest = lines.b;
								var body = $elm$core$String$trim(
									A2($elm$core$String$join, '\n', rest));
								return A5($author$project$Effects$convertNoteToIssue, model, id, repoId, title, body);
							}
						}());
				case 'ToggleShowArchivedCards':
					var id = msg.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								showArchivedCards: A2($elm$core$Set$member, id, model.showArchivedCards) ? A2($elm$core$Set$remove, id, model.showArchivedCards) : A2($elm$core$Set$insert, id, model.showArchivedCards)
							}),
						$elm$core$Platform$Cmd$none);
				case 'SetUserOut':
					var user = msg.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								outUsers: A2($elm$core$Set$insert, user.id, model.outUsers)
							}),
						$elm$core$Platform$Cmd$none);
				case 'SetUserIn':
					var user = msg.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								outUsers: A2($elm$core$Set$remove, user.id, model.outUsers)
							}),
						$elm$core$Platform$Cmd$none);
				case 'StartProjectifying':
					var cardId = msg.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								projectifyingCards: A2($elm$core$Set$insert, cardId, model.projectifyingCards)
							}),
						$elm$core$Platform$Cmd$none);
				case 'StopProjectifying':
					var cardId = msg.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								projectifyingCards: A2($elm$core$Set$remove, cardId, model.projectifyingCards)
							}),
						$elm$core$Platform$Cmd$none);
				default:
					var card = msg.a;
					var project = msg.b;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								projectifyingCards: A2($elm$core$Set$remove, card.id, model.projectifyingCards)
							}),
						A3($author$project$Effects$createProjectForIssue, model, card, project));
			}
		}
	});
var $author$project$Main$init = F3(
	function (config, url, key) {
		var model = $author$project$Model$empty(key);
		var _v0 = A2(
			$author$project$Main$update,
			$author$project$Model$UrlChanged(url),
			model);
		var navedModel = _v0.a;
		var navedMsgs = _v0.b;
		return _Utils_Tuple2(
			_Utils_update(
				navedModel,
				{
					currentTime: $elm$time$Time$millisToPosix(config.initialTime)
				}),
			$elm$core$Platform$Cmd$batch(
				_List_fromArray(
					[
						$author$project$Backend$fetchData($author$project$Model$DataFetched),
						$author$project$Backend$fetchMe($author$project$Model$MeFetched),
						navedMsgs,
						A2($elm$core$Task$perform, $author$project$Model$SetCurrentZone, $elm$time$Time$here)
					])));
	});
var $author$project$Model$EventReceived = function (a) {
	return {$: 'EventReceived', a: a};
};
var $author$project$Model$Poll = {$: 'Poll'};
var $author$project$Model$SetCurrentTime = function (a) {
	return {$: 'SetCurrentTime', a: a};
};
var $elm$core$Platform$Sub$batch = _Platform_batch;
var $elm$json$Json$Decode$index = _Json_decodeIndex;
var $author$project$Main$eventReceived = _Platform_incomingPort(
	'eventReceived',
	A2(
		$elm$json$Json$Decode$andThen,
		function (_v0) {
			return A2(
				$elm$json$Json$Decode$andThen,
				function (_v1) {
					return A2(
						$elm$json$Json$Decode$andThen,
						function (_v2) {
							return $elm$json$Json$Decode$succeed(
								_Utils_Tuple3(_v0, _v1, _v2));
						},
						A2($elm$json$Json$Decode$index, 2, $elm$json$Json$Decode$string));
				},
				A2($elm$json$Json$Decode$index, 1, $elm$json$Json$Decode$string));
		},
		A2($elm$json$Json$Decode$index, 0, $elm$json$Json$Decode$string)));
var $elm$time$Time$Every = F2(
	function (a, b) {
		return {$: 'Every', a: a, b: b};
	});
var $elm$time$Time$State = F2(
	function (taggers, processes) {
		return {processes: processes, taggers: taggers};
	});
var $elm$time$Time$init = $elm$core$Task$succeed(
	A2($elm$time$Time$State, $elm$core$Dict$empty, $elm$core$Dict$empty));
var $elm$time$Time$addMySub = F2(
	function (_v0, state) {
		var interval = _v0.a;
		var tagger = _v0.b;
		var _v1 = A2($elm$core$Dict$get, interval, state);
		if (_v1.$ === 'Nothing') {
			return A3(
				$elm$core$Dict$insert,
				interval,
				_List_fromArray(
					[tagger]),
				state);
		} else {
			var taggers = _v1.a;
			return A3(
				$elm$core$Dict$insert,
				interval,
				A2($elm$core$List$cons, tagger, taggers),
				state);
		}
	});
var $elm$core$Process$kill = _Scheduler_kill;
var $elm$core$Dict$merge = F6(
	function (leftStep, bothStep, rightStep, leftDict, rightDict, initialResult) {
		var stepState = F3(
			function (rKey, rValue, _v0) {
				stepState:
				while (true) {
					var list = _v0.a;
					var result = _v0.b;
					if (!list.b) {
						return _Utils_Tuple2(
							list,
							A3(rightStep, rKey, rValue, result));
					} else {
						var _v2 = list.a;
						var lKey = _v2.a;
						var lValue = _v2.b;
						var rest = list.b;
						if (_Utils_cmp(lKey, rKey) < 0) {
							var $temp$rKey = rKey,
								$temp$rValue = rValue,
								$temp$_v0 = _Utils_Tuple2(
								rest,
								A3(leftStep, lKey, lValue, result));
							rKey = $temp$rKey;
							rValue = $temp$rValue;
							_v0 = $temp$_v0;
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
		var _v3 = A3(
			$elm$core$Dict$foldl,
			stepState,
			_Utils_Tuple2(
				$elm$core$Dict$toList(leftDict),
				initialResult),
			rightDict);
		var leftovers = _v3.a;
		var intermediateResult = _v3.b;
		return A3(
			$elm$core$List$foldl,
			F2(
				function (_v4, result) {
					var k = _v4.a;
					var v = _v4.b;
					return A3(leftStep, k, v, result);
				}),
			intermediateResult,
			leftovers);
	});
var $elm$core$Platform$sendToSelf = _Platform_sendToSelf;
var $elm$time$Time$setInterval = _Time_setInterval;
var $elm$core$Process$spawn = _Scheduler_spawn;
var $elm$time$Time$spawnHelp = F3(
	function (router, intervals, processes) {
		if (!intervals.b) {
			return $elm$core$Task$succeed(processes);
		} else {
			var interval = intervals.a;
			var rest = intervals.b;
			var spawnTimer = $elm$core$Process$spawn(
				A2(
					$elm$time$Time$setInterval,
					interval,
					A2($elm$core$Platform$sendToSelf, router, interval)));
			var spawnRest = function (id) {
				return A3(
					$elm$time$Time$spawnHelp,
					router,
					rest,
					A3($elm$core$Dict$insert, interval, id, processes));
			};
			return A2($elm$core$Task$andThen, spawnRest, spawnTimer);
		}
	});
var $elm$time$Time$onEffects = F3(
	function (router, subs, _v0) {
		var processes = _v0.processes;
		var rightStep = F3(
			function (_v6, id, _v7) {
				var spawns = _v7.a;
				var existing = _v7.b;
				var kills = _v7.c;
				return _Utils_Tuple3(
					spawns,
					existing,
					A2(
						$elm$core$Task$andThen,
						function (_v5) {
							return kills;
						},
						$elm$core$Process$kill(id)));
			});
		var newTaggers = A3($elm$core$List$foldl, $elm$time$Time$addMySub, $elm$core$Dict$empty, subs);
		var leftStep = F3(
			function (interval, taggers, _v4) {
				var spawns = _v4.a;
				var existing = _v4.b;
				var kills = _v4.c;
				return _Utils_Tuple3(
					A2($elm$core$List$cons, interval, spawns),
					existing,
					kills);
			});
		var bothStep = F4(
			function (interval, taggers, id, _v3) {
				var spawns = _v3.a;
				var existing = _v3.b;
				var kills = _v3.c;
				return _Utils_Tuple3(
					spawns,
					A3($elm$core$Dict$insert, interval, id, existing),
					kills);
			});
		var _v1 = A6(
			$elm$core$Dict$merge,
			leftStep,
			bothStep,
			rightStep,
			newTaggers,
			processes,
			_Utils_Tuple3(
				_List_Nil,
				$elm$core$Dict$empty,
				$elm$core$Task$succeed(_Utils_Tuple0)));
		var spawnList = _v1.a;
		var existingDict = _v1.b;
		var killTask = _v1.c;
		return A2(
			$elm$core$Task$andThen,
			function (newProcesses) {
				return $elm$core$Task$succeed(
					A2($elm$time$Time$State, newTaggers, newProcesses));
			},
			A2(
				$elm$core$Task$andThen,
				function (_v2) {
					return A3($elm$time$Time$spawnHelp, router, spawnList, existingDict);
				},
				killTask));
	});
var $elm$time$Time$onSelfMsg = F3(
	function (router, interval, state) {
		var _v0 = A2($elm$core$Dict$get, interval, state.taggers);
		if (_v0.$ === 'Nothing') {
			return $elm$core$Task$succeed(state);
		} else {
			var taggers = _v0.a;
			var tellTaggers = function (time) {
				return $elm$core$Task$sequence(
					A2(
						$elm$core$List$map,
						function (tagger) {
							return A2(
								$elm$core$Platform$sendToApp,
								router,
								tagger(time));
						},
						taggers));
			};
			return A2(
				$elm$core$Task$andThen,
				function (_v1) {
					return $elm$core$Task$succeed(state);
				},
				A2($elm$core$Task$andThen, tellTaggers, $elm$time$Time$now));
		}
	});
var $elm$time$Time$subMap = F2(
	function (f, _v0) {
		var interval = _v0.a;
		var tagger = _v0.b;
		return A2(
			$elm$time$Time$Every,
			interval,
			A2($elm$core$Basics$composeL, f, tagger));
	});
_Platform_effectManagers['Time'] = _Platform_createManager($elm$time$Time$init, $elm$time$Time$onEffects, $elm$time$Time$onSelfMsg, 0, $elm$time$Time$subMap);
var $elm$time$Time$subscription = _Platform_leaf('Time');
var $elm$time$Time$every = F2(
	function (interval, tagger) {
		return $elm$time$Time$subscription(
			A2($elm$time$Time$Every, interval, tagger));
	});
var $author$project$Main$subscriptions = function (_v0) {
	var minute = 60 * 1000;
	return $elm$core$Platform$Sub$batch(
		_List_fromArray(
			[
				$author$project$Main$eventReceived($author$project$Model$EventReceived),
				A2(
				$elm$time$Time$every,
				minute,
				$elm$core$Basics$always($author$project$Model$Poll)),
				A2($elm$time$Time$every, 60 * minute, $author$project$Model$SetCurrentTime)
			]));
};
var $author$project$Main$titleSuffix = function (s) {
	return $elm$core$String$isEmpty(s) ? 'Cadet' : (s + ' - Cadet');
};
var $author$project$Main$pageTitle = function (model) {
	return $author$project$Main$titleSuffix(
		function () {
			var _v0 = model.page;
			switch (_v0.$) {
				case 'AllProjectsPage':
					return 'Projects';
				case 'GlobalGraphPage':
					return 'Graph';
				case 'ProjectPage':
					var id = _v0.a;
					return A2(
						$elm$core$Maybe$withDefault,
						'',
						A2(
							$elm$core$Maybe$map,
							function ($) {
								return $.name;
							},
							A2($elm$core$Dict$get, id, model.projects)));
				case 'ReleasesPage':
					return 'Releases';
				case 'ReleasePage':
					var repoName = _v0.a;
					return repoName + '  Release';
				case 'PullRequestsPage':
					return 'Pull Requests';
				case 'ArchivePage':
					return 'Archive';
				case 'PairsPage':
					return 'Pairs';
				default:
					return 'Bounce';
			}
		}());
};
var $elm$html$Html$Attributes$stringProperty = F2(
	function (key, string) {
		return A2(
			_VirtualDom_property,
			key,
			$elm$json$Json$Encode$string(string));
	});
var $elm$html$Html$Attributes$class = $elm$html$Html$Attributes$stringProperty('className');
var $elm$html$Html$div = _VirtualDom_node('div');
var $author$project$CardOperations$anticipatedCards = function (model) {
	return A2(
		$elm$core$List$filterMap,
		function (a) {
			return A2($elm$core$Dict$get, a, model.cards);
		},
		A2(
			$elm$core$List$filter,
			A2(
				$elm$core$Basics$composeL,
				$elm$core$Basics$not,
				function (a) {
					return A2($y0hy0h$ordered_containers$OrderedSet$member, a, model.selectedCards);
				}),
			$elm$core$Set$toList(model.anticipatedCards)));
};
var $author$project$CardOperations$selectedCards = function (model) {
	return A2(
		$elm$core$List$filterMap,
		function (a) {
			return A2($elm$core$Dict$get, a, model.cards);
		},
		$y0hy0h$ordered_containers$OrderedSet$toList(model.selectedCards));
};
var $elm$virtual_dom$VirtualDom$text = _VirtualDom_text;
var $elm$html$Html$text = $elm$virtual_dom$VirtualDom$text;
var $author$project$Model$DeselectCard = function (a) {
	return {$: 'DeselectCard', a: a};
};
var $author$project$Model$NewContentCardSource = function (a) {
	return {$: 'NewContentCardSource', a: a};
};
var $author$project$Model$ProjectDrag = function (a) {
	return {$: 'ProjectDrag', a: a};
};
var $capitalist$elm_octicons$Octicons$defaultOptions = {_class: $elm$core$Maybe$Nothing, color: 'black', fillRule: 'evenodd', height: 16, margin: $elm$core$Maybe$Nothing, style: $elm$core$Maybe$Nothing, width: 16};
var $author$project$Drag$End = {$: 'End'};
var $author$project$Drag$Start = F2(
	function (a, b) {
		return {$: 'Start', a: a, b: b};
	});
var $elm$virtual_dom$VirtualDom$attribute = F2(
	function (key, value) {
		return A2(
			_VirtualDom_attribute,
			_VirtualDom_noOnOrFormAction(key),
			_VirtualDom_noJavaScriptOrHtmlUri(value));
	});
var $elm$html$Html$Attributes$attribute = $elm$virtual_dom$VirtualDom$attribute;
var $elm$html$Html$Attributes$classList = function (classes) {
	return $elm$html$Html$Attributes$class(
		A2(
			$elm$core$String$join,
			' ',
			A2(
				$elm$core$List$map,
				$elm$core$Tuple$first,
				A2($elm$core$List$filter, $elm$core$Tuple$second, classes))));
};
var $author$project$Drag$StartState = F2(
	function (elementBounds, element) {
		return {element: element, elementBounds: elementBounds};
	});
var $elm$json$Json$Decode$map3 = _Json_map3;
var $debois$elm_dom$DOM$offsetHeight = A2($elm$json$Json$Decode$field, 'offsetHeight', $elm$json$Json$Decode$float);
var $debois$elm_dom$DOM$offsetWidth = A2($elm$json$Json$Decode$field, 'offsetWidth', $elm$json$Json$Decode$float);
var $elm$json$Json$Decode$map4 = _Json_map4;
var $debois$elm_dom$DOM$offsetLeft = A2($elm$json$Json$Decode$field, 'offsetLeft', $elm$json$Json$Decode$float);
var $debois$elm_dom$DOM$offsetParent = F2(
	function (x, decoder) {
		return $elm$json$Json$Decode$oneOf(
			_List_fromArray(
				[
					A2(
					$elm$json$Json$Decode$field,
					'offsetParent',
					$elm$json$Json$Decode$null(x)),
					A2($elm$json$Json$Decode$field, 'offsetParent', decoder)
				]));
	});
var $debois$elm_dom$DOM$offsetTop = A2($elm$json$Json$Decode$field, 'offsetTop', $elm$json$Json$Decode$float);
var $debois$elm_dom$DOM$scrollLeft = A2($elm$json$Json$Decode$field, 'scrollLeft', $elm$json$Json$Decode$float);
var $debois$elm_dom$DOM$scrollTop = A2($elm$json$Json$Decode$field, 'scrollTop', $elm$json$Json$Decode$float);
var $debois$elm_dom$DOM$position = F2(
	function (x, y) {
		return A2(
			$elm$json$Json$Decode$andThen,
			function (_v0) {
				var x_ = _v0.a;
				var y_ = _v0.b;
				return A2(
					$debois$elm_dom$DOM$offsetParent,
					_Utils_Tuple2(x_, y_),
					A2($debois$elm_dom$DOM$position, x_, y_));
			},
			A5(
				$elm$json$Json$Decode$map4,
				F4(
					function (scrollLeftP, scrollTopP, offsetLeftP, offsetTopP) {
						return _Utils_Tuple2((x + offsetLeftP) - scrollLeftP, (y + offsetTopP) - scrollTopP);
					}),
				$debois$elm_dom$DOM$scrollLeft,
				$debois$elm_dom$DOM$scrollTop,
				$debois$elm_dom$DOM$offsetLeft,
				$debois$elm_dom$DOM$offsetTop));
	});
var $debois$elm_dom$DOM$boundingClientRect = A4(
	$elm$json$Json$Decode$map3,
	F3(
		function (_v0, width, height) {
			var x = _v0.a;
			var y = _v0.b;
			return {height: height, left: x, top: y, width: width};
		}),
	A2($debois$elm_dom$DOM$position, 0, 0),
	$debois$elm_dom$DOM$offsetWidth,
	$debois$elm_dom$DOM$offsetHeight);
var $author$project$Drag$decodeStartState = function (view) {
	return A2(
		$elm_community$json_extra$Json$Decode$Extra$andMap,
		$elm$json$Json$Decode$succeed(view),
		A2(
			$elm_community$json_extra$Json$Decode$Extra$andMap,
			A2($elm$json$Json$Decode$field, 'currentTarget', $debois$elm_dom$DOM$boundingClientRect),
			$elm$json$Json$Decode$succeed($author$project$Drag$StartState)));
};
var $elm$html$Html$Attributes$draggable = _VirtualDom_attribute('draggable');
var $author$project$Drag$isDragging = F2(
	function (source, model) {
		switch (model.$) {
			case 'Dragging':
				var state = model.a;
				return _Utils_eq(state.source, source);
			case 'Dropped':
				var state = model.a;
				return _Utils_eq(state.source, source);
			default:
				return false;
		}
	});
var $elm$virtual_dom$VirtualDom$Normal = function (a) {
	return {$: 'Normal', a: a};
};
var $elm$virtual_dom$VirtualDom$on = _VirtualDom_on;
var $elm$html$Html$Events$on = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$Normal(decoder));
	});
var $author$project$Drag$draggable = F4(
	function (model, wrap, source, view) {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$classList(
					_List_fromArray(
						[
							_Utils_Tuple2('draggable', true),
							_Utils_Tuple2(
							'dragging',
							A2($author$project$Drag$isDragging, source, model))
						])),
					$elm$html$Html$Attributes$draggable('true'),
					A2(
					$elm$html$Html$Events$on,
					'dragstart',
					A2(
						$elm$json$Json$Decode$map,
						A2(
							$elm$core$Basics$composeL,
							wrap,
							$author$project$Drag$Start(source)),
						$author$project$Drag$decodeStartState(view))),
					A2(
					$elm$html$Html$Events$on,
					'dragend',
					$elm$json$Json$Decode$succeed(
						wrap($author$project$Drag$End))),
					A2($elm$html$Html$Attributes$attribute, 'ondragstart', 'event.dataTransfer.setData(\'text/plain\', \'\');')
				]),
			_List_fromArray(
				[view]));
	});
var $author$project$CardOperations$isAnticipated = F2(
	function (model, card) {
		return A2($elm$core$Set$member, card.id, model.anticipatedCards) && (!A2($y0hy0h$ordered_containers$OrderedSet$member, card.id, model.selectedCards));
	});
var $elm$virtual_dom$VirtualDom$Custom = function (a) {
	return {$: 'Custom', a: a};
};
var $elm$html$Html$Events$custom = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$Custom(decoder));
	});
var $author$project$Events$onClickNoBubble = function (msg) {
	return A2(
		$elm$html$Html$Events$custom,
		'click',
		$elm$json$Json$Decode$succeed(
			{message: msg, preventDefault: true, stopPropagation: true}));
};
var $elm$html$Html$span = _VirtualDom_node('span');
var $elm$html$Html$Attributes$tabindex = function (n) {
	return A2(
		_VirtualDom_attribute,
		'tabIndex',
		$elm$core$String$fromInt(n));
};
var $elm$html$Html$a = _VirtualDom_node('a');
var $elm$html$Html$Attributes$href = function (url) {
	return A2(
		$elm$html$Html$Attributes$stringProperty,
		'href',
		_VirtualDom_noJavaScriptUri(url));
};
var $author$project$CardView$octiconOpts = $capitalist$elm_octicons$Octicons$defaultOptions;
var $elm$svg$Svg$Attributes$d = _VirtualDom_attribute('d');
var $elm$svg$Svg$Attributes$fill = _VirtualDom_attribute('fill');
var $elm$svg$Svg$Attributes$fillRule = _VirtualDom_attribute('fill-rule');
var $elm$svg$Svg$Attributes$class = _VirtualDom_attribute('class');
var $elm$svg$Svg$Attributes$height = _VirtualDom_attribute('height');
var $elm$svg$Svg$Attributes$style = _VirtualDom_attribute('style');
var $elm$svg$Svg$trustedNode = _VirtualDom_nodeNS('http://www.w3.org/2000/svg');
var $elm$svg$Svg$svg = $elm$svg$Svg$trustedNode('svg');
var $elm$svg$Svg$Attributes$version = _VirtualDom_attribute('version');
var $elm$svg$Svg$Attributes$viewBox = _VirtualDom_attribute('viewBox');
var $elm$svg$Svg$Attributes$width = _VirtualDom_attribute('width');
var $capitalist$elm_octicons$Octicons$Internal$iconSVG = F5(
	function (viewBox, name, options, attributes, children) {
		var style = function () {
			var _v2 = options.style;
			if (_v2.$ === 'Nothing') {
				return _List_Nil;
			} else {
				var s = _v2.a;
				return _List_fromArray(
					[s]);
			}
		}();
		var margin = function () {
			var _v1 = options.margin;
			if (_v1.$ === 'Nothing') {
				return _List_Nil;
			} else {
				var m = _v1.a;
				return _List_fromArray(
					['margin: ' + m]);
			}
		}();
		var styles = function () {
			var _v0 = $elm$core$List$concat(
				_List_fromArray(
					[style, margin]));
			if (!_v0.b) {
				return _List_Nil;
			} else {
				var lst = _v0;
				return _List_fromArray(
					[
						$elm$svg$Svg$Attributes$style(
						A2($elm$core$String$join, ';', lst))
					]);
			}
		}();
		return A2(
			$elm$svg$Svg$svg,
			$elm$core$List$concat(
				_List_fromArray(
					[
						_List_fromArray(
						[
							$elm$svg$Svg$Attributes$version('1.1'),
							$elm$svg$Svg$Attributes$class(
							A2($elm$core$Maybe$withDefault, 'octicon ' + name, options._class)),
							$elm$svg$Svg$Attributes$width(
							$elm$core$String$fromInt(options.width)),
							$elm$svg$Svg$Attributes$height(
							$elm$core$String$fromInt(options.height)),
							$elm$svg$Svg$Attributes$viewBox(viewBox)
						]),
						attributes,
						styles
					])),
			children);
	});
var $elm$svg$Svg$path = $elm$svg$Svg$trustedNode('path');
var $capitalist$elm_octicons$Octicons$pathIconWithOptions = F4(
	function (path, viewBox, octiconName, options) {
		return A5(
			$capitalist$elm_octicons$Octicons$Internal$iconSVG,
			viewBox,
			octiconName,
			options,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					$elm$svg$Svg$path,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$d(path),
							$elm$svg$Svg$Attributes$fillRule(options.fillRule),
							$elm$svg$Svg$Attributes$fill(options.color)
						]),
					_List_Nil)
				]));
	});
var $capitalist$elm_octicons$Octicons$projectPath = 'M10,12 L13,12 L13,2 L10,2 L10,12 L10,12 Z M6,10 L9,10 L9,2 L6,2 L6,10 L6,10 Z M2,14 L5,14 L5,2 L2,2 L2,14 L2,14 Z M1,15 L14,15 L14,1 L1,1 L1,15 L1,15 Z M14,0 L1,0 C0.448,0 0,0.448 0,1 L0,15 C0,15.552 0.448,16 1,16 L14,16 C14.552,16 15,15.552 15,15 L15,1 C15,0.448 14.552,0 14,0 L14,0 L14,0 Z';
var $capitalist$elm_octicons$Octicons$project = A3($capitalist$elm_octicons$Octicons$pathIconWithOptions, $capitalist$elm_octicons$Octicons$projectPath, '0 0 15 16', 'project');
var $author$project$Colors$gray200 = '#e1e4e8';
var $author$project$Colors$green500 = '#28a745';
var $author$project$Colors$green = $author$project$Colors$green500;
var $author$project$Colors$purple500 = '#6f42c1';
var $author$project$Colors$purple = $author$project$Colors$purple500;
var $elm$virtual_dom$VirtualDom$style = _VirtualDom_style;
var $elm$html$Html$Attributes$style = $elm$virtual_dom$VirtualDom$style;
var $author$project$ProgressBar$view = function (segments) {
	var total = $elm$core$List$sum(
		A2($elm$core$List$map, $elm$core$Tuple$second, segments));
	var width = function (base) {
		var pct = (base / total) * 100;
		return A2(
			$elm$html$Html$Attributes$style,
			'width',
			$elm$core$String$fromFloat(pct) + '%');
	};
	var segment = F2(
		function (color, val) {
			return (!val) ? $elm$html$Html$text('') : A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('segment'),
						A2($elm$html$Html$Attributes$style, 'background-color', color),
						width(val)
					]),
				_List_Nil);
		});
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('progress-bar')
			]),
		A2(
			$elm$core$List$map,
			function (_v0) {
				var c = _v0.a;
				var v = _v0.b;
				return A2(segment, c, v);
			},
			segments));
};
var $author$project$CardView$viewProjectBar = F2(
	function (model, project) {
		var _v0 = A2($author$project$CardView$projectProgress, model, project);
		var toDos = _v0.a;
		var inProgresses = _v0.b;
		var dones = _v0.c;
		return (((toDos + inProgresses) + dones) > 0) ? $author$project$ProgressBar$view(
			_List_fromArray(
				[
					_Utils_Tuple2($author$project$Colors$green, dones),
					_Utils_Tuple2($author$project$Colors$purple, inProgresses),
					_Utils_Tuple2($author$project$Colors$gray200, toDos)
				])) : $author$project$ProgressBar$view(
			_List_fromArray(
				[
					_Utils_Tuple2($author$project$Colors$gray200, 1)
				]));
	});
var $author$project$CardView$viewCardAssociatedProject = F2(
	function (model, card) {
		var _v0 = A2(
			$elm$core$Maybe$andThen,
			function (id) {
				return A2($elm$core$Dict$get, id, model.projects);
			},
			A2($elm$core$Dict$get, card.id, model.cardProjects));
		if (_v0.$ === 'Nothing') {
			return _List_Nil;
		} else {
			var project = _v0.a;
			return _List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('card-projects')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$a,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$href('/projects/' + project.id),
									$elm$html$Html$Attributes$class('card-content')
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('card-squares left vertical')
										]),
									_List_fromArray(
										[
											A2(
											$elm$html$Html$div,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('card-square')
												]),
											_List_fromArray(
												[
													$capitalist$elm_octicons$Octicons$project($author$project$CardView$octiconOpts)
												]))
										])),
									A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('card-info')
										]),
									_List_fromArray(
										[
											A2($author$project$CardView$viewProjectBar, model, project)
										]))
								]))
						]))
				]);
		}
	});
var $author$project$Model$HighlightNode = function (a) {
	return {$: 'HighlightNode', a: a};
};
var $author$project$Model$RefreshIssue = function (a) {
	return {$: 'RefreshIssue', a: a};
};
var $author$project$Model$RefreshPullRequest = function (a) {
	return {$: 'RefreshPullRequest', a: a};
};
var $author$project$Model$SelectCard = function (a) {
	return {$: 'SelectCard', a: a};
};
var $author$project$Model$UnhighlightNode = {$: 'UnhighlightNode'};
var $capitalist$elm_octicons$Octicons$linkExternalPath = 'M11,10 L12,10 L12,13 C12,13.55 11.55,14 11,14 L1,14 C0.45,14 0,13.55 0,13 L0,3 C0,2.45 0.45,2 1,2 L4,2 L4,3 L1,3 L1,13 L11,13 L11,10 L11,10 Z M6,2 L8.25,4.25 L5,7.5 L6.5,9 L9.75,5.75 L12,8 L12,2 L6,2 L6,2 Z';
var $capitalist$elm_octicons$Octicons$linkExternal = A3($capitalist$elm_octicons$Octicons$pathIconWithOptions, $capitalist$elm_octicons$Octicons$linkExternalPath, '0 0 12 16', 'linkExternal');
var $elm$html$Html$Attributes$target = $elm$html$Html$Attributes$stringProperty('target');
var $author$project$CardView$cardExternalIcons = function (card) {
	return A2(
		$elm$core$List$map,
		function (_v0) {
			var url = _v0.url;
			return A2(
				$elm$html$Html$a,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$target('_blank'),
						$elm$html$Html$Attributes$class('external-link'),
						$elm$html$Html$Attributes$href(url)
					]),
				_List_fromArray(
					[
						$capitalist$elm_octicons$Octicons$linkExternal($capitalist$elm_octicons$Octicons$defaultOptions)
					]));
		},
		card.cards);
};
var $author$project$Activity$class = F2(
	function (now, date) {
		var delta = $elm$time$Time$posixToMillis(now) - $elm$time$Time$posixToMillis(date);
		var daysSinceLastUpdate = (delta / (((24 * 60) * 60) * 1000)) | 0;
		return (daysSinceLastUpdate <= 1) ? 'active-today' : ((daysSinceLastUpdate <= 2) ? 'active-yesterday' : ((daysSinceLastUpdate <= 7) ? 'active-this-week' : ((daysSinceLastUpdate <= 30) ? 'active-this-month' : 'active-long-ago')));
	});
var $elm$html$Html$img = _VirtualDom_node('img');
var $elm$html$Html$Events$onClick = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'click',
		$elm$json$Json$Decode$succeed(msg));
};
var $elm$html$Html$Events$onMouseOut = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'mouseout',
		$elm$json$Json$Decode$succeed(msg));
};
var $elm$html$Html$Events$onMouseOver = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'mouseover',
		$elm$json$Json$Decode$succeed(msg));
};
var $author$project$Model$LabelCard = F2(
	function (a, b) {
		return {$: 'LabelCard', a: a, b: b};
	});
var $author$project$Model$UnlabelCard = F2(
	function (a, b) {
		return {$: 'UnlabelCard', a: a, b: b};
	});
var $capitalist$elm_octicons$Octicons$bookmarkPath = 'M9,0 L1,0 C0.27,0 0,0.27 0,1 L0,16 L5,12.91 L10,16 L10,1 C10,0.27 9.73,0 9,0 L9,0 Z M8.22,4.25 L6.36,5.61 L7.08,7.77 C7.14,7.99 7.06,8.05 6.88,7.94 L5,6.6 L3.12,7.94 C2.93,8.05 2.87,7.99 2.92,7.77 L3.64,5.61 L1.78,4.25 C1.61,4.09 1.64,4.02 1.87,4.02 L4.17,3.99 L4.87,1.83 L5.12,1.83 L5.82,3.99 L8.12,4.02 C8.35,4.02 8.39,4.1 8.21,4.25 L8.22,4.25 Z';
var $capitalist$elm_octicons$Octicons$bookmark = A3($capitalist$elm_octicons$Octicons$pathIconWithOptions, $capitalist$elm_octicons$Octicons$bookmarkPath, '0 0 10 16', 'bookmark');
var $author$project$Card$isInFlight = function (card) {
	return card.processState.inInFlightColumn;
};
var $author$project$CardView$pauseIcon = function (card) {
	var _v0 = _Utils_Tuple2(
		$author$project$Card$isInFlight(card),
		$author$project$Card$isPaused(card));
	if (_v0.b) {
		return _List_fromArray(
			[
				A2(
				$elm$html$Html$span,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('pause-toggle paused'),
						$elm$html$Html$Events$onClick(
						A2($author$project$Model$UnlabelCard, card, 'paused'))
					]),
				_List_fromArray(
					[
						$capitalist$elm_octicons$Octicons$bookmark($capitalist$elm_octicons$Octicons$defaultOptions)
					]))
			]);
	} else {
		if (_v0.a) {
			return _List_fromArray(
				[
					A2(
					$elm$html$Html$span,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('pause-toggle'),
							$elm$html$Html$Events$onClick(
							A2($author$project$Model$LabelCard, card, 'paused'))
						]),
					_List_fromArray(
						[
							$capitalist$elm_octicons$Octicons$bookmark($capitalist$elm_octicons$Octicons$defaultOptions)
						]))
				]);
		} else {
			return _List_Nil;
		}
	}
};
var $author$project$Model$SearchCards = function (a) {
	return {$: 'SearchCards', a: a};
};
var $author$project$Label$search = F2(
	function (model, name) {
		return $author$project$Model$SearchCards(
			$elm$core$String$isEmpty(model.cardSearch) ? ('label:' + name) : (model.cardSearch + (' label:' + name)));
	});
var $author$project$Label$colorIsLight = F2(
	function (model, hex) {
		var _v0 = A2($elm$core$Dict$get, hex, model.colorLightnessCache);
		if (_v0.$ === 'Just') {
			var res = _v0.a;
			return res;
		} else {
			return A3(
				$author$project$Log$debug,
				'color lightness cache miss',
				hex,
				$author$project$Label$computeColorIsLight(hex));
		}
	});
var $author$project$Label$colorStyles = F2(
	function (model, color) {
		return _List_fromArray(
			[
				A2($elm$html$Html$Attributes$style, 'background-color', '#' + color),
				A2($author$project$Label$colorIsLight, model, color) ? $elm$html$Html$Attributes$class('light-label') : $elm$html$Html$Attributes$class('dark-label')
			]);
	});
var $author$project$Label$view = F2(
	function (model, label) {
		return A2(
			$elm$html$Html$span,
			A2(
				$elm$core$List$cons,
				$elm$html$Html$Attributes$class('label'),
				A2($author$project$Label$colorStyles, model, label.color)),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$span,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('label-text')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text(label.name)
						]))
				]));
	});
var $author$project$CardView$searchableLabel = F2(
	function (model, labelId) {
		var _v0 = A2($elm$core$Dict$get, labelId, model.allLabels);
		if (_v0.$ === 'Just') {
			var label = _v0.a;
			return A2(
				$elm$html$Html$span,
				_List_fromArray(
					[
						$elm$html$Html$Events$onClick(
						A2($author$project$Label$search, model, label.name))
					]),
				_List_fromArray(
					[
						A2($author$project$Label$view, model, label)
					]));
		} else {
			return $elm$html$Html$text('');
		}
	});
var $elm$html$Html$Attributes$src = function (url) {
	return A2(
		$elm$html$Html$Attributes$stringProperty,
		'src',
		_VirtualDom_noJavaScriptOrHtmlUri(url));
};
var $capitalist$elm_octicons$Octicons$syncPath = 'M10.24,7.4 C10.43,8.68 10.04,10.02 9.04,11 C7.57,12.45 5.3,12.63 3.63,11.54 L4.8,10.4 L0.5,9.8 L1.1,14 L2.41,12.74 C4.77,14.48 8.11,14.31 10.25,12.2 C11.49,10.97 12.06,9.35 11.99,7.74 L10.24,7.4 L10.24,7.4 Z M2.96,5 C4.43,3.55 6.7,3.37 8.37,4.46 L7.2,5.6 L11.5,6.2 L10.9,2 L9.59,3.26 C7.23,1.52 3.89,1.69 1.74,3.8 C0.5,5.03 -0.06,6.65 0.01,8.26 L1.76,8.61 C1.57,7.33 1.96,5.98 2.96,5 L2.96,5 Z';
var $capitalist$elm_octicons$Octicons$sync = A3($capitalist$elm_octicons$Octicons$pathIconWithOptions, $capitalist$elm_octicons$Octicons$syncPath, '0 0 12 16', 'sync');
var $capitalist$elm_octicons$Octicons$gitMergePath = 'M10,7 C9.27,7 8.62,7.41 8.27,8.02 L8.27,8 C7.22,7.98 6,7.64 5.14,6.98 C4.39,6.4 3.64,5.37 3.25,4.54 C3.7,4.18 4,3.62 4,2.99 C4,1.88 3.11,0.99 2,0.99 C0.89,0.99 0,1.89 0,3 C0,3.73 0.41,4.38 1,4.72 L1,11.28 C0.41,11.63 0,12.27 0,13 C0,14.11 0.89,15 2,15 C3.11,15 4,14.11 4,13 C4,12.27 3.59,11.62 3,11.28 L3,7.67 C3.67,8.37 4.44,8.94 5.3,9.36 C6.16,9.78 7.33,9.99 8.27,10 L8.27,9.98 C8.63,10.59 9.27,11 10,11 C11.11,11 12,10.11 12,9 C12,7.89 11.11,7 10,7 L10,7 Z M3.2,13 C3.2,13.66 2.65,14.2 2,14.2 C1.35,14.2 0.8,13.65 0.8,13 C0.8,12.35 1.35,11.8 2,11.8 C2.65,11.8 3.2,12.35 3.2,13 L3.2,13 Z M2,4.2 C1.34,4.2 0.8,3.65 0.8,3 C0.8,2.35 1.35,1.8 2,1.8 C2.65,1.8 3.2,2.35 3.2,3 C3.2,3.65 2.65,4.2 2,4.2 L2,4.2 Z M10,10.2 C9.34,10.2 8.8,9.65 8.8,9 C8.8,8.35 9.35,7.8 10,7.8 C10.65,7.8 11.2,8.35 11.2,9 C11.2,9.65 10.65,10.2 10,10.2 L10,10.2 Z';
var $capitalist$elm_octicons$Octicons$gitMerge = A3($capitalist$elm_octicons$Octicons$pathIconWithOptions, $capitalist$elm_octicons$Octicons$gitMergePath, '0 0 12 16', 'gitMerge');
var $author$project$Colors$red500 = '#d73a49';
var $author$project$Colors$red = $author$project$Colors$red500;
var $capitalist$elm_octicons$Octicons$alertPath = 'M8.865,1.51999998 C8.685,1.20999998 8.355,1.01999998 7.995,1.01999998 C7.635,1.01999998 7.305,1.20999998 7.125,1.51999998 L0.275000001,13.5 C0.0950000006,13.81 0.0950000006,14.19 0.275000001,14.5 C0.465000001,14.81 0.795000001,15 1.145,15 L14.845,15 C15.205,15 15.535,14.81 15.705,14.5 C15.875,14.19 15.885,13.81 15.715,13.5 L8.865,1.51999998 Z M8.995,13 L6.995,13 L6.995,11 L8.995,11 L8.995,13 L8.995,13 Z M8.995,9.99999998 L6.995,9.99999998 L6.995,5.99999998 L8.995,5.99999998 L8.995,9.99999998 L8.995,9.99999998 Z';
var $capitalist$elm_octicons$Octicons$alert = A3($capitalist$elm_octicons$Octicons$pathIconWithOptions, $capitalist$elm_octicons$Octicons$alertPath, '0 0 16 16', 'alert');
var $capitalist$elm_octicons$Octicons$checkPolygon = '12 5 4 13 0 9 1.5 7.5 4 10 10.5 3.5';
var $elm$svg$Svg$Attributes$points = _VirtualDom_attribute('points');
var $elm$svg$Svg$polygon = $elm$svg$Svg$trustedNode('polygon');
var $capitalist$elm_octicons$Octicons$polygonIconWithOptions = F4(
	function (points, viewBox, octiconName, options) {
		return A5(
			$capitalist$elm_octicons$Octicons$Internal$iconSVG,
			viewBox,
			octiconName,
			options,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					$elm$svg$Svg$polygon,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$points(points),
							$elm$svg$Svg$Attributes$fillRule(options.fillRule),
							$elm$svg$Svg$Attributes$fill(options.color)
						]),
					_List_Nil)
				]));
	});
var $capitalist$elm_octicons$Octicons$check = A3($capitalist$elm_octicons$Octicons$polygonIconWithOptions, $capitalist$elm_octicons$Octicons$checkPolygon, '0 0 12 16', 'check');
var $author$project$Colors$orange500 = '#f66a0a';
var $author$project$Colors$orange = $author$project$Colors$orange500;
var $capitalist$elm_octicons$Octicons$primitiveDotPath = 'M0,8 C0,5.8 1.8,4 4,4 C6.2,4 8,5.8 8,8 C8,10.2 6.2,12 4,12 C1.8,12 0,10.2 0,8 L0,8 Z';
var $capitalist$elm_octicons$Octicons$primitiveDot = A3($capitalist$elm_octicons$Octicons$pathIconWithOptions, $capitalist$elm_octicons$Octicons$primitiveDotPath, '0 0 8 16', 'primitiveDot');
var $capitalist$elm_octicons$Octicons$questionPath = 'M6,10 L8,10 L8,12 L6,12 L6,10 L6,10 Z M10,6.5 C10,8.64 8,9 8,9 L6,9 C6,8.45 6.45,8 7,8 L7.5,8 C7.78,8 8,7.78 8,7.5 L8,6.5 C8,6.22 7.78,6 7.5,6 L6.5,6 C6.22,6 6,6.22 6,6.5 L6,7 L4,7 C4,5.5 5.5,4 7,4 C8.5,4 10,5 10,6.5 L10,6.5 Z M7,2.3 C10.14,2.3 12.7,4.86 12.7,8 C12.7,11.14 10.14,13.7 7,13.7 C3.86,13.7 1.3,11.14 1.3,8 C1.3,4.86 3.86,2.3 7,2.3 L7,2.3 Z M7,1 C3.14,1 0,4.14 0,8 C0,11.86 3.14,15 7,15 C10.86,15 14,11.86 14,8 C14,4.14 10.86,1 7,1 L7,1 Z';
var $capitalist$elm_octicons$Octicons$question = A3($capitalist$elm_octicons$Octicons$pathIconWithOptions, $capitalist$elm_octicons$Octicons$questionPath, '0 0 14 16', 'question');
var $capitalist$elm_octicons$Octicons$xPolygon = '7.48 8 11.23 11.75 9.75 13.23 6 9.48 2.25 13.23 0.77 11.75 4.52 8 0.77 4.25 2.25 2.77 6 6.52 9.75 2.77 11.23 4.25';
var $capitalist$elm_octicons$Octicons$x = A3($capitalist$elm_octicons$Octicons$polygonIconWithOptions, $capitalist$elm_octicons$Octicons$xPolygon, '0 0 12 16', 'x');
var $author$project$Colors$yellow500 = '#ffd33d';
var $author$project$Colors$yellow = $author$project$Colors$yellow500;
var $author$project$CardView$summarizeContexts = function (contexts) {
	var states = A2(
		$elm$core$List$map,
		function ($) {
			return $.state;
		},
		contexts);
	return A2(
		$elm$core$List$all,
		$elm$core$Basics$eq($author$project$GitHub$StatusStateSuccess),
		states) ? $capitalist$elm_octicons$Octicons$check(
		_Utils_update(
			$author$project$CardView$octiconOpts,
			{color: $author$project$Colors$green})) : (A2($elm$core$List$member, $author$project$GitHub$StatusStateFailure, states) ? $capitalist$elm_octicons$Octicons$x(
		_Utils_update(
			$author$project$CardView$octiconOpts,
			{color: $author$project$Colors$red})) : (A2($elm$core$List$member, $author$project$GitHub$StatusStateError, states) ? $capitalist$elm_octicons$Octicons$alert(
		_Utils_update(
			$author$project$CardView$octiconOpts,
			{color: $author$project$Colors$orange})) : (A2($elm$core$List$member, $author$project$GitHub$StatusStatePending, states) ? $capitalist$elm_octicons$Octicons$primitiveDot(
		_Utils_update(
			$author$project$CardView$octiconOpts,
			{color: $author$project$Colors$yellow})) : $capitalist$elm_octicons$Octicons$question(
		_Utils_update(
			$author$project$CardView$octiconOpts,
			{color: $author$project$Colors$purple})))));
};
var $author$project$CardView$prIcons = F2(
	function (model, card) {
		var _v0 = card.content;
		if (_v0.$ === 'IssueCardContent') {
			return _List_Nil;
		} else {
			var pr = _v0.a;
			var statusCheck = function () {
				var _v3 = A2(
					$elm$core$Maybe$map,
					function ($) {
						return $.status;
					},
					pr.lastCommit);
				if ((_v3.$ === 'Just') && (_v3.a.$ === 'Just')) {
					var contexts = _v3.a.a.contexts;
					return _List_fromArray(
						[
							A2(
							$elm$html$Html$span,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('status-icon')
								]),
							_List_fromArray(
								[
									$author$project$CardView$summarizeContexts(contexts)
								]))
						]);
				} else {
					return _List_Nil;
				}
			}();
			var reviews = A2(
				$elm$core$Maybe$withDefault,
				_List_Nil,
				A2($elm$core$Dict$get, card.id, model.prReviewers));
			var reviewStates = A2(
				$elm$core$List$map,
				function (r) {
					var reviewClass = function () {
						var _v2 = r.state;
						switch (_v2.$) {
							case 'PullRequestReviewStatePending':
								return 'pending';
							case 'PullRequestReviewStateApproved':
								return 'success';
							case 'PullRequestReviewStateChangesRequested':
								return 'failure';
							case 'PullRequestReviewStateCommented':
								return 'commented';
							default:
								return 'dismissed';
						}
					}();
					return A2(
						$elm$html$Html$img,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class(
								'card-actor ' + (A2($author$project$Activity$class, model.currentTime, r.createdAt) + (' ' + reviewClass))),
								$elm$html$Html$Attributes$src(r.author.avatar)
							]),
						_List_Nil);
				},
				reviews);
			return $elm$core$List$concat(
				_List_fromArray(
					[
						reviewStates,
						statusCheck,
						_List_fromArray(
						[
							$capitalist$elm_octicons$Octicons$gitMerge(
							_Utils_update(
								$author$project$CardView$octiconOpts,
								{
									color: function () {
										var _v1 = pr.mergeable;
										switch (_v1.$) {
											case 'MergeableStateMergeable':
												return $author$project$Colors$green;
											case 'MergeableStateConflicting':
												return $author$project$Colors$red;
											default:
												return $author$project$Colors$yellow;
										}
									}()
								}))
						])
					]));
		}
	});
var $elm$core$List$takeReverse = F3(
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
						$temp$kept = A2($elm$core$List$cons, x, kept);
					n = $temp$n;
					list = $temp$list;
					kept = $temp$kept;
					continue takeReverse;
				}
			}
		}
	});
var $elm$core$List$takeTailRec = F2(
	function (n, list) {
		return $elm$core$List$reverse(
			A3($elm$core$List$takeReverse, n, list, _List_Nil));
	});
var $elm$core$List$takeFast = F3(
	function (ctr, n, list) {
		if (n <= 0) {
			return _List_Nil;
		} else {
			var _v0 = _Utils_Tuple2(n, list);
			_v0$1:
			while (true) {
				_v0$5:
				while (true) {
					if (!_v0.b.b) {
						return list;
					} else {
						if (_v0.b.b.b) {
							switch (_v0.a) {
								case 1:
									break _v0$1;
								case 2:
									var _v2 = _v0.b;
									var x = _v2.a;
									var _v3 = _v2.b;
									var y = _v3.a;
									return _List_fromArray(
										[x, y]);
								case 3:
									if (_v0.b.b.b.b) {
										var _v4 = _v0.b;
										var x = _v4.a;
										var _v5 = _v4.b;
										var y = _v5.a;
										var _v6 = _v5.b;
										var z = _v6.a;
										return _List_fromArray(
											[x, y, z]);
									} else {
										break _v0$5;
									}
								default:
									if (_v0.b.b.b.b && _v0.b.b.b.b.b) {
										var _v7 = _v0.b;
										var x = _v7.a;
										var _v8 = _v7.b;
										var y = _v8.a;
										var _v9 = _v8.b;
										var z = _v9.a;
										var _v10 = _v9.b;
										var w = _v10.a;
										var tl = _v10.b;
										return (ctr > 1000) ? A2(
											$elm$core$List$cons,
											x,
											A2(
												$elm$core$List$cons,
												y,
												A2(
													$elm$core$List$cons,
													z,
													A2(
														$elm$core$List$cons,
														w,
														A2($elm$core$List$takeTailRec, n - 4, tl))))) : A2(
											$elm$core$List$cons,
											x,
											A2(
												$elm$core$List$cons,
												y,
												A2(
													$elm$core$List$cons,
													z,
													A2(
														$elm$core$List$cons,
														w,
														A3($elm$core$List$takeFast, ctr + 1, n - 4, tl)))));
									} else {
										break _v0$5;
									}
							}
						} else {
							if (_v0.a === 1) {
								break _v0$1;
							} else {
								break _v0$5;
							}
						}
					}
				}
				return list;
			}
			var _v1 = _v0.b;
			var x = _v1.a;
			return _List_fromArray(
				[x]);
		}
	});
var $elm$core$List$take = F2(
	function (n, list) {
		return A3($elm$core$List$takeFast, 0, n, list);
	});
var $author$project$CardView$recentEvents = F2(
	function (model, card) {
		var dropDupes = F2(
			function (e, es) {
				if (!es.b) {
					return _List_fromArray(
						[e]);
				} else {
					var avatar = es.a.avatar;
					var rest = es.b;
					return _Utils_eq(avatar, e.avatar) ? A2($elm$core$List$cons, e, rest) : A2($elm$core$List$cons, e, es);
				}
			});
		return $elm$core$List$reverse(
			A2(
				$elm$core$List$take,
				5,
				A3(
					$elm$core$List$foldr,
					dropDupes,
					_List_Nil,
					A2(
						$elm$core$Maybe$withDefault,
						_List_Nil,
						A2($elm$core$Dict$get, card.id, model.cardEvents)))));
	});
var $author$project$CardView$viewEventActor = F2(
	function (model, _v0) {
		var createdAt = _v0.createdAt;
		var avatar = _v0.avatar;
		var url = _v0.url;
		return A2(
			$elm$html$Html$a,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$href(url),
					$elm$html$Html$Attributes$target('_blank')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$img,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class(
							'card-actor ' + A2($author$project$Activity$class, model.currentTime, createdAt)),
							$elm$html$Html$Attributes$src(
							A2($elm$core$String$contains, '?', avatar) ? (avatar + '&s=88') : (avatar + '?s=88')),
							$elm$html$Html$Attributes$draggable('false')
						]),
					_List_Nil)
				]));
	});
var $author$project$CardView$viewCardActivity = F2(
	function (model, card) {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('card-activity')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('card-squares horizontal avatar-stack')
						]),
					A2(
						$elm$core$List$map,
						function (x) {
							return A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('card-square')
									]),
								_List_fromArray(
									[x]));
						},
						A2(
							$elm$core$List$map,
							$author$project$CardView$viewEventActor(model),
							A2($author$project$CardView$recentEvents, model, card)))),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('card-squares horizontal')
						]),
					A2(
						$elm$core$List$map,
						function (x) {
							return A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('card-square')
									]),
								_List_fromArray(
									[x]));
						},
						A2($author$project$CardView$prIcons, model, card)))
				]));
	});
var $capitalist$elm_octicons$Octicons$gitPullRequestPath = 'M11,11.28 L11,5 C10.97,4.22 10.66,3.53 10.06,2.94 C9.46,2.35 8.78,2.03 8,2 L7,2 L7,0 L4,3 L7,6 L7,4 L8,4 C8.27,4.02 8.48,4.11 8.69,4.31 C8.9,4.51 8.99,4.73 9,5 L9,11.28 C8.41,11.62 8,12.26 8,13 C8,14.11 8.89,15 10,15 C11.11,15 12,14.11 12,13 C12,12.27 11.59,11.62 11,11.28 L11,11.28 Z M10,14.2 C9.34,14.2 8.8,13.65 8.8,13 C8.8,12.35 9.35,11.8 10,11.8 C10.65,11.8 11.2,12.35 11.2,13 C11.2,13.65 10.65,14.2 10,14.2 L10,14.2 Z M4,3 C4,1.89 3.11,1 2,1 C0.89,1 0,1.89 0,3 C0,3.73 0.41,4.38 1,4.72 L1,11.28 C0.41,11.62 0,12.26 0,13 C0,14.11 0.89,15 2,15 C3.11,15 4,14.11 4,13 C4,12.27 3.59,11.62 3,11.28 L3,4.72 C3.59,4.38 4,3.74 4,3 L4,3 Z M3.2,13 C3.2,13.66 2.65,14.2 2,14.2 C1.35,14.2 0.8,13.65 0.8,13 C0.8,12.35 1.35,11.8 2,11.8 C2.65,11.8 3.2,12.35 3.2,13 L3.2,13 Z M2,4.2 C1.34,4.2 0.8,3.65 0.8,3 C0.8,2.35 1.35,1.8 2,1.8 C2.65,1.8 3.2,2.35 3.2,3 C3.2,3.65 2.65,4.2 2,4.2 L2,4.2 Z';
var $capitalist$elm_octicons$Octicons$gitPullRequest = A3($capitalist$elm_octicons$Octicons$pathIconWithOptions, $capitalist$elm_octicons$Octicons$gitPullRequestPath, '0 0 12 16', 'gitPullRequest');
var $author$project$Card$isDone = function (card) {
	return card.processState.inDoneColumn;
};
var $capitalist$elm_octicons$Octicons$issueClosedPath = 'M7,10 L9,10 L9,12 L7,12 L7,10 L7,10 Z M9,4 L7,4 L7,9 L9,9 L9,4 L9,4 Z M10.5,5.5 L9.5,6.5 L12,9 L16,4.5 L15,3.5 L12,7 L10.5,5.5 L10.5,5.5 Z M8,13.7 C4.86,13.7 2.3,11.14 2.3,8 C2.3,4.86 4.86,2.3 8,2.3 C9.83,2.3 11.45,3.18 12.5,4.5 L13.42,3.58 C12.14,2 10.19,1 8,1 C4.14,1 1,4.14 1,8 C1,11.86 4.14,15 8,15 C11.86,15 15,11.86 15,8 L13.48,9.52 C12.82,11.93 10.62,13.71 8,13.71 L8,13.7 Z';
var $capitalist$elm_octicons$Octicons$issueClosed = A3($capitalist$elm_octicons$Octicons$pathIconWithOptions, $capitalist$elm_octicons$Octicons$issueClosedPath, '0 0 16 16', 'issueClosed');
var $capitalist$elm_octicons$Octicons$issueOpenedPath = 'M7,2.3 C10.14,2.3 12.7,4.86 12.7,8 C12.7,11.14 10.14,13.7 7,13.7 C3.86,13.7 1.3,11.14 1.3,8 C1.3,4.86 3.86,2.3 7,2.3 L7,2.3 Z M7,1 C3.14,1 0,4.14 0,8 C0,11.86 3.14,15 7,15 C10.86,15 14,11.86 14,8 C14,4.14 10.86,1 7,1 L7,1 Z M8,4 L6,4 L6,9 L8,9 L8,4 L8,4 Z M8,10 L6,10 L6,12 L8,12 L8,10 L8,10 Z';
var $capitalist$elm_octicons$Octicons$issueOpened = A3($capitalist$elm_octicons$Octicons$pathIconWithOptions, $capitalist$elm_octicons$Octicons$issueOpenedPath, '0 0 14 16', 'issueOpened');
var $author$project$CardView$viewCardIcon = function (card) {
	return $author$project$Card$isPR(card) ? $capitalist$elm_octicons$Octicons$gitPullRequest(
		_Utils_update(
			$author$project$CardView$octiconOpts,
			{
				color: $author$project$Card$isMerged(card) ? $author$project$Colors$purple : ($author$project$Card$isOpen(card) ? $author$project$Colors$green : $author$project$Colors$red)
			})) : ($author$project$Card$isOpen(card) ? ($author$project$Card$isDone(card) ? $capitalist$elm_octicons$Octicons$issueClosed(
		_Utils_update(
			$author$project$CardView$octiconOpts,
			{color: $author$project$Colors$green})) : $capitalist$elm_octicons$Octicons$issueOpened(
		_Utils_update(
			$author$project$CardView$octiconOpts,
			{color: $author$project$Colors$green}))) : $capitalist$elm_octicons$Octicons$issueClosed(
		_Utils_update(
			$author$project$CardView$octiconOpts,
			{color: $author$project$Colors$red})));
};
var $author$project$CardView$viewCardMeta = function (card) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('card-meta')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$a,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$href(card.url),
						$elm$html$Html$Attributes$target('_blank'),
						$elm$html$Html$Attributes$draggable('false')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text(
						'#' + $elm$core$String$fromInt(card.number))
					])),
				$elm$html$Html$text(' '),
				$elm$html$Html$text('opened by '),
				function () {
				var _v0 = card.author;
				if (_v0.$ === 'Just') {
					var user = _v0.a;
					return A2(
						$elm$html$Html$a,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$href(user.url),
								$elm$html$Html$Attributes$target('_blank'),
								$elm$html$Html$Attributes$draggable('false')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text(user.login)
							]));
				} else {
					return $elm$html$Html$text('(deleted user)');
				}
			}()
			]));
};
var $author$project$Model$Projectify = F2(
	function (a, b) {
		return {$: 'Projectify', a: a, b: b};
	});
var $author$project$Model$StartProjectifying = function (a) {
	return {$: 'StartProjectifying', a: a};
};
var $author$project$Model$StopProjectifying = function (a) {
	return {$: 'StopProjectifying', a: a};
};
var $elm$html$Html$li = _VirtualDom_node('li');
var $elm$html$Html$ul = _VirtualDom_node('ul');
var $author$project$CardView$viewProjectifyControls = F2(
	function (model, card) {
		var _v0 = A2(
			$elm$core$Maybe$withDefault,
			_List_Nil,
			A2($elm$core$Dict$get, card.repo.id, model.repoProjectTemplates));
		if (!_v0.b) {
			return _List_Nil;
		} else {
			var templates = _v0;
			return _List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('projectify-interaction')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$span,
							_List_fromArray(
								[
									$elm$html$Html$Events$onClick(
									$author$project$Model$StartProjectifying(card.id))
								]),
							_List_fromArray(
								[
									$capitalist$elm_octicons$Octicons$project($capitalist$elm_octicons$Octicons$defaultOptions)
								])),
							A2($elm$core$Set$member, card.id, model.projectifyingCards) ? A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('projectify')
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											$elm$html$Html$Events$onClick(
											$author$project$Model$StopProjectifying(card.id)),
											$elm$html$Html$Attributes$class('click-away-catcher')
										]),
									_List_Nil),
									A2(
									$elm$html$Html$ul,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('projectify-selector')
										]),
									A2(
										$elm$core$List$map,
										function (project) {
											return A2(
												$elm$html$Html$li,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$class('project-choice'),
														$elm$html$Html$Events$onClick(
														A2($author$project$Model$Projectify, card, project))
													]),
												_List_fromArray(
													[
														$elm$html$Html$text(project.name)
													]));
										},
										templates))
								])) : $elm$html$Html$text('')
						]))
				]);
		}
	});
var $capitalist$elm_octicons$Octicons$plusPolygon = '12 9 7 9 7 14 5 14 5 9 0 9 0 7 5 7 5 2 7 2 7 7 12 7';
var $capitalist$elm_octicons$Octicons$plus = A3($capitalist$elm_octicons$Octicons$polygonIconWithOptions, $capitalist$elm_octicons$Octicons$plusPolygon, '0 0 12 16', 'plus');
var $author$project$Model$whenLoggedIn = F2(
	function (model, html) {
		var _v0 = model.me;
		if (_v0.$ === 'Nothing') {
			return $elm$html$Html$text('');
		} else {
			return html;
		}
	});
var $author$project$CardView$viewSuggestedLabel = F3(
	function (model, card, name) {
		var mlabelId = A2(
			$elm$core$Maybe$andThen,
			$elm$core$Dict$get(card.repo.id),
			A2($elm$core$Dict$get, name, model.labelToRepoToId));
		var mlabel = A2(
			$elm$core$Maybe$andThen,
			function (id) {
				return A2($elm$core$Dict$get, id, model.allLabels);
			},
			mlabelId);
		var has = function () {
			if (mlabelId.$ === 'Just') {
				var id = mlabelId.a;
				return A2($elm$core$List$member, id, card.labels);
			} else {
				return false;
			}
		}();
		if (mlabel.$ === 'Nothing') {
			return $elm$html$Html$text('');
		} else {
			var color = mlabel.a.color;
			return A2(
				$author$project$Model$whenLoggedIn,
				model,
				A2(
					$elm$html$Html$span,
					_Utils_ap(
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('label suggested'),
								$elm$html$Html$Attributes$classList(
								_List_fromArray(
									[
										_Utils_Tuple2('has', has)
									])),
								$elm$html$Html$Events$onClick(
								has ? A2($author$project$Model$UnlabelCard, card, name) : A2($author$project$Model$LabelCard, card, name))
							]),
						A2($author$project$Label$colorStyles, model, color)),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$span,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('label-text')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text(name)
								])),
							has ? $capitalist$elm_octicons$Octicons$x($author$project$CardView$octiconOpts) : $capitalist$elm_octicons$Octicons$plus($author$project$CardView$octiconOpts)
						])));
		}
	});
var $author$project$CardView$viewCardContent = F3(
	function (model, controls, card) {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('card-content'),
					$elm$html$Html$Attributes$classList(
					_List_fromArray(
						[
							_Utils_Tuple2(
							'loading',
							A2($elm$core$Dict$member, card.id, model.progress))
						])),
					$elm$html$Html$Attributes$classList(
					_List_fromArray(
						[
							_Utils_Tuple2(
							'paused',
							$author$project$Card$isPaused(card)),
							_Utils_Tuple2(
							'highlighted',
							_Utils_eq(
								model.highlightedCard,
								$elm$core$Maybe$Just(card.id))),
							_Utils_Tuple2(
							A2($author$project$Activity$class, model.currentTime, card.updatedAt),
							$author$project$Card$isPR(card))
						])),
					$elm$html$Html$Events$onClick(
					$author$project$Model$SelectCard(card.id)),
					$elm$html$Html$Events$onMouseOver(
					$author$project$Model$HighlightNode(card.id)),
					$elm$html$Html$Events$onMouseOut($author$project$Model$UnhighlightNode)
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('card-squares left vertical')
						]),
					A2(
						$elm$core$List$map,
						function (x) {
							return A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('card-square')
									]),
								_List_fromArray(
									[x]));
						},
						$elm$core$List$concat(
							_List_fromArray(
								[
									_List_fromArray(
									[
										$author$project$CardView$viewCardIcon(card)
									]),
									A2(
									$elm$core$List$map,
									function (_v0) {
										var avatar = _v0.avatar;
										return A2(
											$elm$html$Html$img,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('card-actor'),
													$elm$html$Html$Attributes$src(avatar)
												]),
											_List_Nil);
									},
									card.assignees),
									A2(
									$elm$core$List$map,
									$author$project$CardView$searchableLabel(model),
									card.labels)
								])))),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('card-info')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$span,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('card-title'),
									$elm$html$Html$Attributes$draggable('false')
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$a,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('title-link'),
											$elm$html$Html$Attributes$href(card.url),
											$elm$html$Html$Attributes$target('_blank')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text(card.title)
										]))
								])),
							$author$project$CardView$viewCardMeta(card),
							A2($author$project$CardView$viewCardActivity, model, card)
						])),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('card-squares right vertical card-controls')
						]),
					A2(
						$elm$core$List$map,
						function (x) {
							return A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('card-square')
									]),
								_List_fromArray(
									[x]));
						},
						$elm$core$List$concat(
							_List_fromArray(
								[
									controls,
									((!_Utils_eq(model.me, $elm$core$Maybe$Nothing)) && ((!$author$project$Card$isPR(card)) && (!A2($elm$core$Dict$member, card.id, model.cardProjects)))) ? A2($author$project$CardView$viewProjectifyControls, model, card) : _List_Nil,
									_List_fromArray(
									[
										A2(
										$elm$html$Html$span,
										_List_fromArray(
											[
												$elm$html$Html$Events$onClick(
												$author$project$Card$isPR(card) ? $author$project$Model$RefreshPullRequest(card.id) : $author$project$Model$RefreshIssue(card.id))
											]),
										_List_fromArray(
											[
												$capitalist$elm_octicons$Octicons$sync($capitalist$elm_octicons$Octicons$defaultOptions)
											]))
									]),
									$author$project$CardView$cardExternalIcons(card),
									_Utils_eq(model.me, $elm$core$Maybe$Nothing) ? _List_Nil : $author$project$CardView$pauseIcon(card),
									A2(
									$elm$core$List$map,
									A2($author$project$CardView$viewSuggestedLabel, model, card),
									model.suggestedLabels)
								]))))
				]));
	});
var $author$project$CardView$viewCard = F3(
	function (model, controls, card) {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('card'),
					$elm$html$Html$Attributes$tabindex(0)
				]),
			$elm$core$List$concat(
				_List_fromArray(
					[
						_List_fromArray(
						[
							A3($author$project$CardView$viewCardContent, model, controls, card)
						]),
						function () {
						var _v0 = A2($elm$core$Dict$get, card.id, model.cardClosers);
						if (_v0.$ === 'Nothing') {
							return _List_Nil;
						} else {
							if (!_v0.a.b) {
								return _List_Nil;
							} else {
								var closers = _v0.a;
								return _List_fromArray(
									[
										A2(
										$elm$html$Html$div,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('card-closers')
											]),
										A2(
											$elm$core$List$map,
											A2($author$project$CardView$viewCardContent, model, _List_Nil),
											A2(
												$elm$core$List$filterMap,
												function (id) {
													return A2($elm$core$Dict$get, id, model.cards);
												},
												closers)))
									]);
							}
						}
					}(),
						A2($author$project$CardView$viewCardAssociatedProject, model, card)
					])));
	});
var $author$project$CardOperations$viewCardEntry = F2(
	function (model, card) {
		var dragSource = $author$project$Model$NewContentCardSource(
			{contentId: card.id});
		var anticipated = A2($author$project$CardOperations$isAnticipated, model, card);
		var controls = (!anticipated) ? _List_fromArray(
			[
				A2(
				$elm$html$Html$span,
				_List_fromArray(
					[
						$author$project$Events$onClickNoBubble(
						$author$project$Model$DeselectCard(card.id))
					]),
				_List_fromArray(
					[
						$capitalist$elm_octicons$Octicons$x($capitalist$elm_octicons$Octicons$defaultOptions)
					]))
			]) : _List_Nil;
		var cardView = A3($author$project$CardView$viewCard, model, controls, card);
		return A4($author$project$Drag$draggable, model.projectDrag, $author$project$Model$ProjectDrag, dragSource, cardView);
	});
var $author$project$Model$AddFilter = function (a) {
	return {$: 'AddFilter', a: a};
};
var $author$project$Model$ApplyLabelOperations = {$: 'ApplyLabelOperations'};
var $author$project$Model$ClearSelectedCards = {$: 'ClearSelectedCards'};
var $author$project$Model$HasLabelFilter = F2(
	function (a, b) {
		return {$: 'HasLabelFilter', a: a, b: b};
	});
var $author$project$Model$RemoveLabelOperation = {$: 'RemoveLabelOperation'};
var $author$project$Model$SetLabelOperation = F2(
	function (a, b) {
		return {$: 'SetLabelOperation', a: a, b: b};
	});
var $author$project$Model$SetLabelSearch = function (a) {
	return {$: 'SetLabelSearch', a: a};
};
var $author$project$Model$ToggleLabelOperations = {$: 'ToggleLabelOperations'};
var $author$project$Model$UnsetLabelOperation = function (a) {
	return {$: 'UnsetLabelOperation', a: a};
};
var $capitalist$elm_octicons$Octicons$dashPolygon = '0 7 0 9 8 9 8 7';
var $capitalist$elm_octicons$Octicons$dash = A3($capitalist$elm_octicons$Octicons$polygonIconWithOptions, $capitalist$elm_octicons$Octicons$dashPolygon, '0 0 8 16', 'dash');
var $elm$html$Html$input = _VirtualDom_node('input');
var $elm$html$Html$Events$alwaysStop = function (x) {
	return _Utils_Tuple2(x, true);
};
var $elm$virtual_dom$VirtualDom$MayStopPropagation = function (a) {
	return {$: 'MayStopPropagation', a: a};
};
var $elm$html$Html$Events$stopPropagationOn = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$MayStopPropagation(decoder));
	});
var $elm$json$Json$Decode$at = F2(
	function (fields, decoder) {
		return A3($elm$core$List$foldr, $elm$json$Json$Decode$field, decoder, fields);
	});
var $elm$html$Html$Events$targetValue = A2(
	$elm$json$Json$Decode$at,
	_List_fromArray(
		['target', 'value']),
	$elm$json$Json$Decode$string);
var $elm$html$Html$Events$onInput = function (tagger) {
	return A2(
		$elm$html$Html$Events$stopPropagationOn,
		'input',
		A2(
			$elm$json$Json$Decode$map,
			$elm$html$Html$Events$alwaysStop,
			A2($elm$json$Json$Decode$map, tagger, $elm$html$Html$Events$targetValue)));
};
var $elm$html$Html$Attributes$placeholder = $elm$html$Html$Attributes$stringProperty('placeholder');
var $capitalist$elm_octicons$Octicons$tagPath = 'M7.73,1.73 C7.26,1.26 6.62,1 5.96,1 L3.5,1 C2.13,1 1,2.13 1,3.5 L1,5.97 C1,6.63 1.27,7.27 1.73,7.74 L7.79,13.8 C8.18,14.19 8.81,14.19 9.2,13.8 L13.79,9.21 C14.18,8.82 14.18,8.19 13.79,7.8 L7.73,1.73 L7.73,1.73 Z M2.38,7.09 C2.07,6.79 1.91,6.39 1.91,5.96 L1.91,3.5 C1.91,2.62 2.63,1.91 3.5,1.91 L5.97,1.91 C6.39,1.91 6.8,2.07 7.1,2.38 L13.24,8.51 L8.51,13.24 L2.38,7.09 L2.38,7.09 Z M3.01,3 L5.01,3 L5.01,5 L3,5 L3,3 L3.01,3 Z';
var $capitalist$elm_octicons$Octicons$tag = A3($capitalist$elm_octicons$Octicons$pathIconWithOptions, $capitalist$elm_octicons$Octicons$tagPath, '0 0 14 16', 'tag');
var $elm$html$Html$Attributes$type_ = $elm$html$Html$Attributes$stringProperty('type');
var $author$project$CardOperations$viewControls = function (model) {
	var viewLabelOperation = F2(
		function (name, color) {
			var _v1 = function () {
				var _v2 = A2($elm$core$Dict$get, name, model.cardLabelOperations);
				if (_v2.$ === 'Just') {
					if (_v2.a.$ === 'AddLabelOperation') {
						var _v3 = _v2.a;
						return _Utils_Tuple3(
							'checked',
							$capitalist$elm_octicons$Octicons$check($capitalist$elm_octicons$Octicons$defaultOptions),
							A2($author$project$Model$SetLabelOperation, name, $author$project$Model$RemoveLabelOperation));
					} else {
						var _v4 = _v2.a;
						return _Utils_Tuple3(
							'unhecked',
							$capitalist$elm_octicons$Octicons$plus($capitalist$elm_octicons$Octicons$defaultOptions),
							$author$project$Model$UnsetLabelOperation(name));
					}
				} else {
					var cards = $author$project$CardOperations$selectedCards(model);
					return ((!$elm$core$List$isEmpty(cards)) && A2(
						$elm$core$List$all,
						A2($author$project$Label$cardHasLabel, model, name),
						cards)) ? _Utils_Tuple3(
						'checked',
						$capitalist$elm_octicons$Octicons$check($capitalist$elm_octicons$Octicons$defaultOptions),
						A2($author$project$Model$SetLabelOperation, name, $author$project$Model$RemoveLabelOperation)) : (A2(
						$elm$core$List$any,
						A2($author$project$Label$cardHasLabel, model, name),
						cards) ? _Utils_Tuple3(
						'mixed',
						$capitalist$elm_octicons$Octicons$dash($capitalist$elm_octicons$Octicons$defaultOptions),
						A2($author$project$Model$SetLabelOperation, name, $author$project$Model$AddLabelOperation)) : _Utils_Tuple3(
						'unchecked',
						$capitalist$elm_octicons$Octicons$plus($capitalist$elm_octicons$Octicons$defaultOptions),
						A2($author$project$Model$SetLabelOperation, name, $author$project$Model$AddLabelOperation)));
				}
			}();
			var checkClass = _v1.a;
			var icon = _v1.b;
			var clickOperation = _v1.c;
			return A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('label-operation')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$span,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('checkbox ' + checkClass),
								$elm$html$Html$Events$onClick(clickOperation)
							]),
						_List_fromArray(
							[icon])),
						A2(
						$elm$html$Html$span,
						_Utils_ap(
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('label'),
									$elm$html$Html$Events$onClick(
									$author$project$Model$AddFilter(
										A2($author$project$Model$HasLabelFilter, name, color)))
								]),
							A2($author$project$Label$colorStyles, model, color)),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$span,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('label-text')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text(name)
									]))
							]))
					]));
		});
	var labelOptions = model.showLabelOperations ? A2(
		$elm$core$List$map,
		function (_v0) {
			var a = _v0.a;
			var b = _v0.b;
			return A2(viewLabelOperation, a, b);
		},
		A2(
			$elm$core$List$filter,
			A2(
				$elm$core$Basics$composeL,
				$elm$core$String$contains(model.labelSearch),
				$elm$core$Tuple$first),
			$elm$core$Dict$keys(model.reposByLabel))) : _List_Nil;
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('sidebar-controls')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('control-knobs')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$span,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('controls-label')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('change:')
							])),
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$classList(
								_List_fromArray(
									[
										_Utils_Tuple2('control-setting', true),
										_Utils_Tuple2('active', model.showLabelOperations)
									])),
								$elm$html$Html$Events$onClick($author$project$Model$ToggleLabelOperations)
							]),
						_List_fromArray(
							[
								$capitalist$elm_octicons$Octicons$tag($capitalist$elm_octicons$Octicons$defaultOptions),
								$elm$html$Html$text('labels')
							])),
						A2(
						$elm$html$Html$span,
						_List_fromArray(
							[
								$elm$html$Html$Events$onClick($author$project$Model$ClearSelectedCards),
								$elm$html$Html$Attributes$class('clear-selected')
							]),
						_List_fromArray(
							[
								$capitalist$elm_octicons$Octicons$x($capitalist$elm_octicons$Octicons$defaultOptions)
							]))
					])),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$classList(
						_List_fromArray(
							[
								_Utils_Tuple2('label-operations', true),
								_Utils_Tuple2('visible', model.showLabelOperations)
							]))
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$input,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$type_('text'),
								$elm$html$Html$Attributes$placeholder('search labels'),
								$elm$html$Html$Events$onInput($author$project$Model$SetLabelSearch)
							]),
						_List_Nil),
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('label-options')
							]),
						labelOptions),
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('buttons')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('button cancel'),
										$elm$html$Html$Events$onClick($author$project$Model$ToggleLabelOperations)
									]),
								_List_fromArray(
									[
										$capitalist$elm_octicons$Octicons$x($capitalist$elm_octicons$Octicons$defaultOptions),
										$elm$html$Html$text('cancel')
									])),
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('button apply'),
										$elm$html$Html$Events$onClick($author$project$Model$ApplyLabelOperations)
									]),
								_List_fromArray(
									[
										$capitalist$elm_octicons$Octicons$check($capitalist$elm_octicons$Octicons$defaultOptions),
										$elm$html$Html$text('apply')
									]))
							]))
					]))
			]));
};
var $author$project$CardOperations$view = function (model) {
	return ($y0hy0h$ordered_containers$OrderedSet$isEmpty(model.selectedCards) && $elm$core$Set$isEmpty(model.anticipatedCards)) ? $elm$html$Html$text('') : A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('main-sidebar')
			]),
		_List_fromArray(
			[
				$author$project$CardOperations$viewControls(model),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('cards selected')
					]),
				A2(
					$elm$core$List$map,
					$author$project$CardOperations$viewCardEntry(model),
					$author$project$CardOperations$selectedCards(model))),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('cards anticipated')
					]),
				A2(
					$elm$core$List$map,
					$author$project$CardOperations$viewCardEntry(model),
					$author$project$CardOperations$anticipatedCards(model)))
			]));
};
var $capitalist$elm_octicons$Octicons$circuitBoardPath = 'M3,5 C3,4.45 3.45,4 4,4 C4.55,4 5,4.45 5,5 C5,5.55 4.55,6 4,6 C3.45,6 3,5.55 3,5 L3,5 Z M11,5 C11,4.45 10.55,4 10,4 C9.45,4 9,4.45 9,5 C9,5.55 9.45,6 10,6 C10.55,6 11,5.55 11,5 L11,5 Z M11,11 C11,10.45 10.55,10 10,10 C9.45,10 9,10.45 9,11 C9,11.55 9.45,12 10,12 C10.55,12 11,11.55 11,11 L11,11 Z M13,1 L5,1 L5,3.17 C5.36,3.36 5.64,3.64 5.83,4 L8.17,4 C8.59,3.22 9.5,2.72 10.51,2.95 C11.26,3.14 11.87,3.75 12.04,4.5 C12.35,5.88 11.32,7.09 9.99,7.09 C9.19,7.09 8.51,6.65 8.16,6 L5.83,6 C5.41,6.8 4.5,7.28 3.49,7.03 C2.76,6.86 2.15,6.25 1.97,5.51 C1.72,4.49 2.2,3.59 3,3.17 L3,1 L1,1 C0.45,1 0,1.45 0,2 L0,14 C0,14.55 0.45,15 1,15 L6,10 L8.17,10 C8.59,9.22 9.5,8.72 10.51,8.95 C11.26,9.14 11.87,9.75 12.04,10.5 C12.35,11.88 11.32,13.09 9.99,13.09 C9.19,13.09 8.51,12.65 8.16,12 L6.99,12 L4,15 L13,15 C13.55,15 14,14.55 14,14 L14,2 C14,1.45 13.55,1 13,1 L13,1 Z';
var $capitalist$elm_octicons$Octicons$circuitBoard = A3($capitalist$elm_octicons$Octicons$pathIconWithOptions, $capitalist$elm_octicons$Octicons$circuitBoardPath, '0 0 14 16', 'circuitBoard');
var $author$project$Main$hideLabel = function (x) {
	return A2(
		$elm$html$Html$span,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('hide-label')
			]),
		_List_fromArray(
			[
				$elm$html$Html$text(x)
			]));
};
var $capitalist$elm_octicons$Octicons$historyPath = 'M8,13 L6,13 L6,6 L11,6 L11,8 L8,8 L8,13 L8,13 Z M7,1 C4.81,1 2.87,2.02 1.59,3.59 L0,2 L0,6 L4,6 L2.5,4.5 C3.55,3.17 5.17,2.3 7,2.3 C10.14,2.3 12.7,4.86 12.7,8 C12.7,11.14 10.14,13.7 7,13.7 C3.86,13.7 1.3,11.14 1.3,8 C1.3,7.66 1.33,7.33 1.39,7 L0.08,7 C0.03,7.33 0,7.66 0,8 C0,11.86 3.14,15 7,15 C10.86,15 14,11.86 14,8 C14,4.14 10.86,1 7,1 L7,1 Z';
var $capitalist$elm_octicons$Octicons$history = A3($capitalist$elm_octicons$Octicons$pathIconWithOptions, $capitalist$elm_octicons$Octicons$historyPath, '0 0 14 16', 'history');
var $capitalist$elm_octicons$Octicons$milestonePath = 'M8,2 L6,2 L6,0 L8,0 L8,2 L8,2 Z M12,7 L2,7 C1.45,7 1,6.55 1,6 L1,4 C1,3.45 1.45,3 2,3 L12,3 L14,5 L12,7 L12,7 Z M8,4 L6,4 L6,6 L8,6 L8,4 L8,4 Z M6,16 L8,16 L8,8 L6,8 L6,16 L6,16 Z';
var $capitalist$elm_octicons$Octicons$milestone = A3($capitalist$elm_octicons$Octicons$pathIconWithOptions, $capitalist$elm_octicons$Octicons$milestonePath, '0 0 14 16', 'milestone');
var $author$project$Main$octiconOpts = $capitalist$elm_octicons$Octicons$defaultOptions;
var $author$project$Main$navButton = F4(
	function (model, icon, label, route) {
		var active = function () {
			var _v0 = model.page;
			switch (_v0.$) {
				case 'AllProjectsPage':
					return label === 'Projects';
				case 'ProjectPage':
					return label === 'Projects';
				case 'GlobalGraphPage':
					return label === 'Graph';
				case 'ArchivePage':
					return label === 'Archive';
				case 'ReleasesPage':
					return label === 'Release';
				case 'ReleasePage':
					return label === 'Release';
				case 'PullRequestsPage':
					return label === 'PRs';
				case 'PairsPage':
					return label === 'Pairs';
				default:
					return false;
			}
		}();
		return A2(
			$elm$html$Html$a,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('button'),
					$elm$html$Html$Attributes$classList(
					_List_fromArray(
						[
							_Utils_Tuple2('active', active)
						])),
					$elm$html$Html$Attributes$href(route)
				]),
			_List_fromArray(
				[
					icon($author$project$Main$octiconOpts),
					$author$project$Main$hideLabel(label)
				]));
	});
var $capitalist$elm_octicons$Octicons$organizationPath = 'M16,12.999 C16,13.438 15.55,13.999 15,13.999 L7.995,13.999 C7.456,13.999 7.001,13.552 7,13 L1,13 C0.46,13 0,12.439 0,12 C0,9.366 3,8 3,8 C3,8 3.229,7.591 3,7 C2.159,6.379 1.942,6.41 2,4 C2.058,1.581 3.367,1 4.5,1 C5.633,1 6.942,1.58 7,4 C7.058,6.41 6.841,6.379 6,7 C5.771,7.59 6,8 6,8 C6,8 7.549,8.711 8.42,10.088 C9.196,9.369 10,8.999 10,8.999 C10,8.999 10.229,8.59 10,7.999 C9.159,7.379 8.942,7.409 9,4.999 C9.058,2.58 10.367,1.999 11.5,1.999 C12.633,1.999 13.937,2.58 13.995,4.999 C14.054,7.409 13.837,7.379 12.995,7.999 C12.766,8.589 12.995,8.999 12.995,8.999 C12.995,8.999 16,10.365 16,12.999';
var $capitalist$elm_octicons$Octicons$organization = A3($capitalist$elm_octicons$Octicons$pathIconWithOptions, $capitalist$elm_octicons$Octicons$organizationPath, '0 0 16 16', 'organization');
var $capitalist$elm_octicons$Octicons$signInPath = 'M7,6.75 L7,12 L11,12 L11,8 L12,8 L12,12 C12,12.55 11.55,13 11,13 L7,13 L7,16 L1.55,13.28 C1.22,13.11 1,12.76 1,12.37 L1,1 C1,0.45 1.45,0 2,0 L11,0 C11.55,0 12,0.45 12,1 L12,4 L11,4 L11,1 L3,1 L7,3 L7,5.25 L10,3 L10,5 L14,5 L14,7 L10,7 L10,9 L7,6.75 L7,6.75 Z';
var $capitalist$elm_octicons$Octicons$signIn = A3($capitalist$elm_octicons$Octicons$pathIconWithOptions, $capitalist$elm_octicons$Octicons$signInPath, '0 0 14 16', 'signIn');
var $author$project$Model$SelectAnticipatedCards = {$: 'SelectAnticipatedCards'};
var $elm$html$Html$form = _VirtualDom_node('form');
var $elm$html$Html$Events$alwaysPreventDefault = function (msg) {
	return _Utils_Tuple2(msg, true);
};
var $elm$virtual_dom$VirtualDom$MayPreventDefault = function (a) {
	return {$: 'MayPreventDefault', a: a};
};
var $elm$html$Html$Events$preventDefaultOn = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$MayPreventDefault(decoder));
	});
var $elm$html$Html$Events$onSubmit = function (msg) {
	return A2(
		$elm$html$Html$Events$preventDefaultOn,
		'submit',
		A2(
			$elm$json$Json$Decode$map,
			$elm$html$Html$Events$alwaysPreventDefault,
			$elm$json$Json$Decode$succeed(msg)));
};
var $elm$html$Html$Attributes$value = $elm$html$Html$Attributes$stringProperty('value');
var $author$project$Main$viewSearch = function (model) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('card-search')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$form,
				_List_fromArray(
					[
						$elm$html$Html$Events$onSubmit($author$project$Model$SelectAnticipatedCards)
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$input,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$type_('search'),
								$elm$html$Html$Attributes$placeholder('search cards'),
								$elm$html$Html$Attributes$value(model.cardSearch),
								$elm$html$Html$Events$onInput($author$project$Model$SearchCards)
							]),
						_List_Nil)
					]))
			]));
};
var $author$project$Main$viewNavBar = function (model) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('nav-bar')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('nav')
					]),
				_List_fromArray(
					[
						A4($author$project$Main$navButton, model, $capitalist$elm_octicons$Octicons$project, 'Projects', '/projects'),
						A4($author$project$Main$navButton, model, $capitalist$elm_octicons$Octicons$history, 'Archive', '/archive'),
						A4($author$project$Main$navButton, model, $capitalist$elm_octicons$Octicons$milestone, 'Release', '/releases'),
						A4($author$project$Main$navButton, model, $capitalist$elm_octicons$Octicons$gitPullRequest, 'PRs', '/pull-requests'),
						A4($author$project$Main$navButton, model, $capitalist$elm_octicons$Octicons$circuitBoard, 'Graph', '/graph'),
						A4($author$project$Main$navButton, model, $capitalist$elm_octicons$Octicons$organization, 'Pairs', '/pairs')
					])),
				function () {
				var _v0 = model.me;
				if (_v0.$ === 'Nothing') {
					return A2(
						$elm$html$Html$a,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('user-info'),
								$elm$html$Html$Attributes$href('/auth/github')
							]),
						_List_fromArray(
							[
								$capitalist$elm_octicons$Octicons$signIn($author$project$Main$octiconOpts),
								$author$project$Main$hideLabel('Sign In')
							]));
				} else {
					var user = _v0.a.user;
					return A2(
						$elm$html$Html$a,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('user-info'),
								$elm$html$Html$Attributes$href(user.url)
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$img,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('user-avatar'),
										$elm$html$Html$Attributes$src(user.avatar)
									]),
								_List_Nil),
								$author$project$Main$hideLabel(user.login)
							]));
				}
			}(),
				$author$project$Main$viewSearch(model)
			]));
};
var $author$project$Main$matchesRelease = F3(
	function (mref, mmilestone, rel) {
		var milestoneMatches = function (milestone) {
			var _v3 = rel.milestone;
			if (_v3.$ === 'Nothing') {
				return milestone === 'none';
			} else {
				var title = _v3.a.title;
				return _Utils_eq(milestone, title);
			}
		};
		var _v0 = _Utils_Tuple2(mref, mmilestone);
		if (_v0.a.$ === 'Just') {
			if (_v0.b.$ === 'Just') {
				var ref = _v0.a.a;
				var milestone = _v0.b.a;
				return _Utils_eq(
					rel.ref,
					$elm$core$Maybe$Just(ref)) && milestoneMatches(milestone);
			} else {
				var ref = _v0.a.a;
				var _v1 = _v0.b;
				return _Utils_eq(
					rel.ref,
					$elm$core$Maybe$Just(ref));
			}
		} else {
			if (_v0.b.$ === 'Just') {
				var _v2 = _v0.a;
				var milestone = _v0.b.a;
				return milestoneMatches(milestone);
			} else {
				return false;
			}
		}
	});
var $capitalist$elm_octicons$Octicons$repoPath = 'M4,9 L3,9 L3,8 L4,8 L4,9 L4,9 Z M4,6 L3,6 L3,7 L4,7 L4,6 L4,6 Z M4,4 L3,4 L3,5 L4,5 L4,4 L4,4 Z M4,2 L3,2 L3,3 L4,3 L4,2 L4,2 Z M12,1 L12,13 C12,13.55 11.55,14 11,14 L6,14 L6,16 L4.5,14.5 L3,16 L3,14 L1,14 C0.45,14 0,13.55 0,13 L0,1 C0,0.45 0.45,0 1,0 L11,0 C11.55,0 12,0.45 12,1 L12,1 Z M11,11 L1,11 L1,13 L3,13 L3,12 L6,12 L6,13 L11,13 L11,11 L11,11 Z M11,1 L2,1 L2,10 L11,10 L11,1 L11,1 Z';
var $capitalist$elm_octicons$Octicons$repo = A3($capitalist$elm_octicons$Octicons$pathIconWithOptions, $capitalist$elm_octicons$Octicons$repoPath, '0 0 12 16', 'repo');
var $author$project$CardView$findProjectCards = F3(
	function (model, columns, pred) {
		findProjectCards:
		while (true) {
			if (!columns.b) {
				return _List_Nil;
			} else {
				var column = columns.a;
				var rest = columns.b;
				var findCard = function (_v3) {
					var contentId = _v3.contentId;
					if (contentId.$ === 'Nothing') {
						return $elm$core$Maybe$Nothing;
					} else {
						var id = contentId.a;
						return A2($elm$core$Dict$get, id, model.cards);
					}
				};
				var columnCards = A2(
					$elm$core$List$filterMap,
					findCard,
					A2(
						$elm$core$Maybe$withDefault,
						_List_Nil,
						A2($elm$core$Dict$get, column.id, model.columnCards)));
				var _v1 = A2($elm_community$list_extra$List$Extra$find, pred, columnCards);
				if (_v1.$ === 'Just') {
					var card = _v1.a;
					return A2(
						$elm$core$List$cons,
						card,
						A3($author$project$CardView$findProjectCards, model, rest, pred));
				} else {
					var $temp$model = model,
						$temp$columns = rest,
						$temp$pred = pred;
					model = $temp$model;
					columns = $temp$columns;
					pred = $temp$pred;
					continue findProjectCards;
				}
			}
		}
	});
var $author$project$Card$isEpic = function (card) {
	return card.processState.hasEpicLabel;
};
var $author$project$CardView$projectExternalIcon = function (project) {
	return A2(
		$elm$html$Html$a,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$target('_blank'),
				$elm$html$Html$Attributes$class('external-link'),
				$elm$html$Html$Attributes$href(project.url)
			]),
		_List_fromArray(
			[
				$capitalist$elm_octicons$Octicons$linkExternal($capitalist$elm_octicons$Octicons$defaultOptions)
			]));
};
var $elm_explorations$markdown$Markdown$defaultOptions = {
	defaultHighlighting: $elm$core$Maybe$Nothing,
	githubFlavored: $elm$core$Maybe$Just(
		{breaks: false, tables: false}),
	sanitize: true,
	smartypants: false
};
var $elm_explorations$markdown$Markdown$toHtmlWith = _Markdown_toHtml;
var $elm_explorations$markdown$Markdown$toHtml = $elm_explorations$markdown$Markdown$toHtmlWith($elm_explorations$markdown$Markdown$defaultOptions);
var $author$project$CardView$viewCardActor = function (_v0) {
	var avatar = _v0.avatar;
	return A2(
		$elm$html$Html$img,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('card-actor'),
				$elm$html$Html$Attributes$src(avatar)
			]),
		_List_Nil);
};
var $author$project$CardView$viewProjectCard = F3(
	function (model, controls, project) {
		var isOpenEpic = function (card) {
			return $author$project$Card$isOpen(card) && $author$project$Card$isEpic(card);
		};
		var projectEpics = A3($author$project$CardView$findProjectCards, model, project.columns, isOpenEpic);
		var activeEpic = A2($elm_community$list_extra$List$Extra$find, $author$project$Card$isInFlight, projectEpics);
		var activeEpicSquares = function () {
			if (activeEpic.$ === 'Nothing') {
				return _List_Nil;
			} else {
				var card = activeEpic.a;
				return $elm$core$List$concat(
					_List_fromArray(
						[
							_List_fromArray(
							[
								A2(
								$elm$html$Html$a,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$href(card.url),
										$elm$html$Html$Attributes$target('_blank')
									]),
								_List_fromArray(
									[
										$author$project$CardView$viewCardIcon(card)
									]))
							]),
							A2($elm$core$List$map, $author$project$CardView$viewCardActor, card.assignees),
							A2(
							$elm$core$List$map,
							$author$project$CardView$searchableLabel(model),
							card.labels)
						]));
			}
		}();
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('card project'),
					$elm$html$Html$Attributes$tabindex(0)
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('card-content')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('card-squares left vertical')
								]),
							A2(
								$elm$core$List$map,
								function (x) {
									return A2(
										$elm$html$Html$div,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('card-square')
											]),
										_List_fromArray(
											[x]));
								},
								A2(
									$elm$core$List$cons,
									$capitalist$elm_octicons$Octicons$project($capitalist$elm_octicons$Octicons$defaultOptions),
									activeEpicSquares))),
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('card-info')
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$span,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('card-title'),
											$elm$html$Html$Attributes$draggable('false')
										]),
									_List_fromArray(
										[
											A2(
											$elm$html$Html$a,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$href('/projects/' + project.id)
												]),
											_List_fromArray(
												[
													$elm$html$Html$text(project.name)
												]))
										])),
									$elm$core$String$isEmpty(project.body) ? $elm$html$Html$text('') : A2(
									$elm_explorations$markdown$Markdown$toHtml,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('project-body')
										]),
									project.body),
									A2($author$project$CardView$viewProjectBar, model, project)
								])),
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('card-squares right vertical card-controls')
								]),
							A2(
								$elm$core$List$map,
								function (x) {
									return A2(
										$elm$html$Html$div,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('card-square')
											]),
										_List_fromArray(
											[x]));
								},
								_Utils_ap(
									controls,
									_List_fromArray(
										[
											$author$project$CardView$projectExternalIcon(project)
										]))))
						])),
					(!$elm$core$List$isEmpty(projectEpics)) ? A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('card-epics')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text(
							$elm$core$String$fromInt(
								$elm$core$List$length(projectEpics))),
							$elm$html$Html$text(' '),
							$elm$html$Html$text(
							function () {
								var _v0 = $elm$core$List$length(projectEpics);
								if (_v0 === 1) {
									return 'epic';
								} else {
									return 'epics';
								}
							}())
						])) : $elm$html$Html$text('')
				]));
	});
var $author$project$Main$viewRepoProjects = F3(
	function (model, repo, projects) {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('fixed-column')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$span,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('column-title')
						]),
					_List_fromArray(
						[
							$capitalist$elm_octicons$Octicons$repo($author$project$Main$octiconOpts),
							A2(
							$elm$html$Html$span,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('column-name')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text(repo.name)
								]))
						])),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('cards')
						]),
					A2(
						$elm$core$List$map,
						A2($author$project$CardView$viewProjectCard, model, _List_Nil),
						projects))
				]));
	});
var $author$project$Model$FromColumnCardSource = function (a) {
	return {$: 'FromColumnCardSource', a: a};
};
var $author$project$Model$MoveCardAfter = F2(
	function (a, b) {
		return {$: 'MoveCardAfter', a: a, b: b};
	});
var $author$project$Model$RefreshColumn = function (a) {
	return {$: 'RefreshColumn', a: a};
};
var $author$project$Model$SetCreatingColumnNote = F2(
	function (a, b) {
		return {$: 'SetCreatingColumnNote', a: a, b: b};
	});
var $author$project$Model$ToggleShowArchivedCards = function (a) {
	return {$: 'ToggleShowArchivedCards', a: a};
};
var $capitalist$elm_octicons$Octicons$bookPath = 'M3,5 L7,5 L7,6 L3,6 L3,5 L3,5 Z M3,8 L7,8 L7,7 L3,7 L3,8 L3,8 Z M3,10 L7,10 L7,9 L3,9 L3,10 L3,10 Z M14,5 L10,5 L10,6 L14,6 L14,5 L14,5 Z M14,7 L10,7 L10,8 L14,8 L14,7 L14,7 Z M14,9 L10,9 L10,10 L14,10 L14,9 L14,9 Z M16,3 L16,12 C16,12.55 15.55,13 15,13 L9.5,13 L8.5,14 L7.5,13 L2,13 C1.45,13 1,12.55 1,12 L1,3 C1,2.45 1.45,2 2,2 L7.5,2 L8.5,3 L9.5,2 L15,2 C15.55,2 16,2.45 16,3 L16,3 Z M8,3.5 L7.5,3 L2,3 L2,12 L8,12 L8,3.5 L8,3.5 Z M15,3 L9.5,3 L9,3.5 L9,12 L15,12 L15,3 L15,3 Z';
var $capitalist$elm_octicons$Octicons$book = A3($capitalist$elm_octicons$Octicons$pathIconWithOptions, $capitalist$elm_octicons$Octicons$bookPath, '0 0 16 16', 'book');
var $capitalist$elm_octicons$Octicons$kebabHorizontalPath = 'M1.5 9C2.32843 9 3 8.32843 3 7.5C3 6.67157 2.32843 6 1.5 6C0.67157 6 0 6.67157 0 7.5C0 8.32843 0.67157 9 1.5 9ZM6.5 9C7.32843 9 8 8.32843 8 7.5C8 6.67157 7.32843 6 6.5 6C5.67157 6 5 6.67157 5 7.5C5 8.32843 5.67157 9 6.5 9ZM13 7.5C13 8.32843 12.3284 9 11.5 9C10.6716 9 10 8.32843 10 7.5C10 6.67157 10.6716 6 11.5 6C12.3284 6 13 6.67157 13 7.5Z';
var $capitalist$elm_octicons$Octicons$kebabHorizontal = A3($capitalist$elm_octicons$Octicons$pathIconWithOptions, $capitalist$elm_octicons$Octicons$kebabHorizontalPath, '0 0 13 16', 'kebabHorizontal');
var $capitalist$elm_octicons$Octicons$pulsePolygon = '11.5 8 8.8 5.4 6.6 8.5 5.5 1.6 2.38 8 0 8 0 10 3.6 10 4.5 8.2 5.4 13.6 9 8.5 10.6 10 14 10 14 8';
var $capitalist$elm_octicons$Octicons$pulse = A3($capitalist$elm_octicons$Octicons$polygonIconWithOptions, $capitalist$elm_octicons$Octicons$pulsePolygon, '0 0 14 16', 'pulse');
var $author$project$Main$columnIcon = function (col) {
	var _v0 = col.purpose;
	if (_v0.$ === 'Nothing') {
		return $capitalist$elm_octicons$Octicons$kebabHorizontal($author$project$Main$octiconOpts);
	} else {
		switch (_v0.a.$) {
			case 'ProjectColumnPurposeToDo':
				var _v1 = _v0.a;
				return $capitalist$elm_octicons$Octicons$book($author$project$Main$octiconOpts);
			case 'ProjectColumnPurposeInProgress':
				var _v2 = _v0.a;
				return $capitalist$elm_octicons$Octicons$pulse($author$project$Main$octiconOpts);
			default:
				var _v3 = _v0.a;
				return $capitalist$elm_octicons$Octicons$check($author$project$Main$octiconOpts);
		}
	}
};
var $author$project$Model$CancelCreatingColumnNote = function (a) {
	return {$: 'CancelCreatingColumnNote', a: a};
};
var $author$project$Model$CreateColumnNote = function (a) {
	return {$: 'CreateColumnNote', a: a};
};
var $elm$html$Html$button = _VirtualDom_node('button');
var $elm$html$Html$Attributes$id = $elm$html$Html$Attributes$stringProperty('id');
var $capitalist$elm_octicons$Octicons$notePath = 'M3,10 L7,10 L7,9 L3,9 L3,10 L3,10 Z M3,8 L9,8 L9,7 L3,7 L3,8 L3,8 Z M3,6 L11,6 L11,5 L3,5 L3,6 L3,6 Z M13,12 L1,12 L1,3 L13,3 L13,12 L13,12 Z M1,2 C0.45,2 0,2.45 0,3 L0,12 C0,12.55 0.45,13 1,13 L13,13 C13.55,13 14,12.55 14,12 L14,3 C14,2.45 13.55,2 13,2 L1,2 L1,2 Z';
var $capitalist$elm_octicons$Octicons$note = A3($capitalist$elm_octicons$Octicons$pathIconWithOptions, $capitalist$elm_octicons$Octicons$notePath, '0 0 14 16', 'note');
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$Enter = {$: 'Enter'};
var $Gizra$elm_keyboard_event$Keyboard$Event$KeyboardEvent = F7(
	function (altKey, ctrlKey, key, keyCode, metaKey, repeat, shiftKey) {
		return {altKey: altKey, ctrlKey: ctrlKey, key: key, keyCode: keyCode, metaKey: metaKey, repeat: repeat, shiftKey: shiftKey};
	});
var $Gizra$elm_keyboard_event$Keyboard$Event$decodeKey = $elm$json$Json$Decode$maybe(
	A2(
		$elm$json$Json$Decode$andThen,
		function (key) {
			return $elm$core$String$isEmpty(key) ? $elm$json$Json$Decode$fail('empty key') : $elm$json$Json$Decode$succeed(key);
		},
		A2($elm$json$Json$Decode$field, 'key', $elm$json$Json$Decode$string)));
var $Gizra$elm_keyboard_event$Keyboard$Event$decodeNonZero = A2(
	$elm$json$Json$Decode$andThen,
	function (code) {
		return (!code) ? $elm$json$Json$Decode$fail('code was zero') : $elm$json$Json$Decode$succeed(code);
	},
	$elm$json$Json$Decode$int);
var $Gizra$elm_keyboard_event$Keyboard$Event$decodeKeyCode = $elm$json$Json$Decode$oneOf(
	_List_fromArray(
		[
			A2($elm$json$Json$Decode$field, 'keyCode', $Gizra$elm_keyboard_event$Keyboard$Event$decodeNonZero),
			A2($elm$json$Json$Decode$field, 'which', $Gizra$elm_keyboard_event$Keyboard$Event$decodeNonZero),
			A2($elm$json$Json$Decode$field, 'charCode', $Gizra$elm_keyboard_event$Keyboard$Event$decodeNonZero),
			$elm$json$Json$Decode$succeed(0)
		]));
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$A = {$: 'A'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$Add = {$: 'Add'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$Alt = {$: 'Alt'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$Ambiguous = function (a) {
	return {$: 'Ambiguous', a: a};
};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$B = {$: 'B'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$Backspace = {$: 'Backspace'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$C = {$: 'C'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$CapsLock = {$: 'CapsLock'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$ChromeSearch = {$: 'ChromeSearch'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$Command = {$: 'Command'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$Ctrl = function (a) {
	return {$: 'Ctrl', a: a};
};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$D = {$: 'D'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$Decimal = {$: 'Decimal'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$Delete = {$: 'Delete'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$Divide = {$: 'Divide'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$Down = {$: 'Down'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$E = {$: 'E'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$Eight = {$: 'Eight'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$End = {$: 'End'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$Escape = {$: 'Escape'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$F = {$: 'F'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$F1 = {$: 'F1'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$F10 = {$: 'F10'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$F11 = {$: 'F11'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$F12 = {$: 'F12'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$F2 = {$: 'F2'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$F3 = {$: 'F3'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$F4 = {$: 'F4'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$F5 = {$: 'F5'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$F6 = {$: 'F6'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$F7 = {$: 'F7'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$F8 = {$: 'F8'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$F9 = {$: 'F9'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$Five = {$: 'Five'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$Four = {$: 'Four'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$G = {$: 'G'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$H = {$: 'H'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$Home = {$: 'Home'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$I = {$: 'I'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$Insert = {$: 'Insert'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$J = {$: 'J'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$K = {$: 'K'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$L = {$: 'L'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$Left = {$: 'Left'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$M = {$: 'M'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$Multiply = {$: 'Multiply'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$N = {$: 'N'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$Nine = {$: 'Nine'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$NumLock = {$: 'NumLock'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$NumpadEight = {$: 'NumpadEight'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$NumpadFive = {$: 'NumpadFive'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$NumpadFour = {$: 'NumpadFour'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$NumpadNine = {$: 'NumpadNine'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$NumpadOne = {$: 'NumpadOne'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$NumpadSeven = {$: 'NumpadSeven'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$NumpadSix = {$: 'NumpadSix'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$NumpadThree = {$: 'NumpadThree'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$NumpadTwo = {$: 'NumpadTwo'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$NumpadZero = {$: 'NumpadZero'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$O = {$: 'O'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$One = {$: 'One'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$P = {$: 'P'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$PageDown = {$: 'PageDown'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$PageUp = {$: 'PageUp'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$PauseBreak = {$: 'PauseBreak'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$PrintScreen = {$: 'PrintScreen'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$Q = {$: 'Q'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$R = {$: 'R'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$Right = {$: 'Right'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$S = {$: 'S'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$ScrollLock = {$: 'ScrollLock'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$Seven = {$: 'Seven'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$Shift = function (a) {
	return {$: 'Shift', a: a};
};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$Six = {$: 'Six'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$Spacebar = {$: 'Spacebar'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$Subtract = {$: 'Subtract'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$T = {$: 'T'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$Tab = {$: 'Tab'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$Three = {$: 'Three'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$Two = {$: 'Two'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$U = {$: 'U'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$Unknown = function (a) {
	return {$: 'Unknown', a: a};
};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$Up = {$: 'Up'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$V = {$: 'V'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$W = {$: 'W'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$Windows = {$: 'Windows'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$X = {$: 'X'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$Y = {$: 'Y'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$Z = {$: 'Z'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$Zero = {$: 'Zero'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$fromCode = function (keyCode) {
	switch (keyCode) {
		case 8:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$Backspace;
		case 9:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$Tab;
		case 13:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$Enter;
		case 16:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$Shift($elm$core$Maybe$Nothing);
		case 17:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$Ctrl($elm$core$Maybe$Nothing);
		case 18:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$Alt;
		case 19:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$PauseBreak;
		case 20:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$CapsLock;
		case 27:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$Escape;
		case 32:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$Spacebar;
		case 33:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$PageUp;
		case 34:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$PageDown;
		case 35:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$End;
		case 36:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$Home;
		case 37:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$Left;
		case 38:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$Up;
		case 39:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$Right;
		case 40:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$Down;
		case 44:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$PrintScreen;
		case 45:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$Insert;
		case 46:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$Delete;
		case 48:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$Zero;
		case 49:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$One;
		case 50:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$Two;
		case 51:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$Three;
		case 52:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$Four;
		case 53:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$Five;
		case 54:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$Six;
		case 55:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$Seven;
		case 56:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$Eight;
		case 57:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$Nine;
		case 65:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$A;
		case 66:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$B;
		case 67:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$C;
		case 68:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$D;
		case 69:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$E;
		case 70:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$F;
		case 71:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$G;
		case 72:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$H;
		case 73:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$I;
		case 74:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$J;
		case 75:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$K;
		case 76:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$L;
		case 77:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$M;
		case 78:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$N;
		case 79:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$O;
		case 80:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$P;
		case 81:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$Q;
		case 82:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$R;
		case 83:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$S;
		case 84:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$T;
		case 85:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$U;
		case 86:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$V;
		case 87:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$W;
		case 88:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$X;
		case 89:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$Y;
		case 90:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$Z;
		case 91:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$Ambiguous(
				_List_fromArray(
					[$SwiftsNamesake$proper_keyboard$Keyboard$Key$Windows, $SwiftsNamesake$proper_keyboard$Keyboard$Key$Command, $SwiftsNamesake$proper_keyboard$Keyboard$Key$ChromeSearch]));
		case 96:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$NumpadZero;
		case 97:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$NumpadOne;
		case 98:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$NumpadTwo;
		case 99:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$NumpadThree;
		case 100:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$NumpadFour;
		case 101:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$NumpadFive;
		case 102:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$NumpadSix;
		case 103:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$NumpadSeven;
		case 104:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$NumpadEight;
		case 105:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$NumpadNine;
		case 106:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$Multiply;
		case 107:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$Add;
		case 109:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$Subtract;
		case 110:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$Decimal;
		case 111:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$Divide;
		case 112:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$F1;
		case 113:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$F2;
		case 114:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$F3;
		case 115:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$F4;
		case 116:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$F5;
		case 117:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$F6;
		case 118:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$F7;
		case 119:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$F8;
		case 120:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$F9;
		case 121:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$F10;
		case 122:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$F11;
		case 123:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$F12;
		case 144:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$NumLock;
		case 145:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$ScrollLock;
		default:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$Unknown(keyCode);
	}
};
var $elm$json$Json$Decode$map7 = _Json_map7;
var $Gizra$elm_keyboard_event$Keyboard$Event$decodeKeyboardEvent = A8(
	$elm$json$Json$Decode$map7,
	$Gizra$elm_keyboard_event$Keyboard$Event$KeyboardEvent,
	A2($elm$json$Json$Decode$field, 'altKey', $elm$json$Json$Decode$bool),
	A2($elm$json$Json$Decode$field, 'ctrlKey', $elm$json$Json$Decode$bool),
	$Gizra$elm_keyboard_event$Keyboard$Event$decodeKey,
	A2($elm$json$Json$Decode$map, $SwiftsNamesake$proper_keyboard$Keyboard$Key$fromCode, $Gizra$elm_keyboard_event$Keyboard$Event$decodeKeyCode),
	A2($elm$json$Json$Decode$field, 'metaKey', $elm$json$Json$Decode$bool),
	A2($elm$json$Json$Decode$field, 'repeat', $elm$json$Json$Decode$bool),
	A2($elm$json$Json$Decode$field, 'shiftKey', $elm$json$Json$Decode$bool));
var $Gizra$elm_keyboard_event$Keyboard$Event$considerKeyboardEvent = function (func) {
	return A2(
		$elm$json$Json$Decode$andThen,
		function (event) {
			var _v0 = func(event);
			if (_v0.$ === 'Just') {
				var msg = _v0.a;
				return $elm$json$Json$Decode$succeed(msg);
			} else {
				return $elm$json$Json$Decode$fail('Ignoring keyboard event');
			}
		},
		$Gizra$elm_keyboard_event$Keyboard$Event$decodeKeyboardEvent);
};
var $author$project$Events$onCtrlEnter = function (msg) {
	return A3(
		$elm$core$Basics$composeL,
		$elm$html$Html$Events$on('keydown'),
		$Gizra$elm_keyboard_event$Keyboard$Event$considerKeyboardEvent,
		function (event) {
			return ((event.ctrlKey || event.metaKey) && _Utils_eq(event.keyCode, $SwiftsNamesake$proper_keyboard$Keyboard$Key$Enter)) ? $elm$core$Maybe$Just(msg) : $elm$core$Maybe$Nothing;
		});
};
var $elm$html$Html$textarea = _VirtualDom_node('textarea');
var $author$project$Main$viewAddingNote = F2(
	function (col, val) {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('editable-card')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('card note'),
							$elm$html$Html$Attributes$tabindex(0),
							$elm$html$Html$Attributes$classList(
							_List_fromArray(
								[
									_Utils_Tuple2(
									'in-flight',
									$author$project$Project$detectColumn.inFlight(col)),
									_Utils_Tuple2(
									'done',
									$author$project$Project$detectColumn.done(col)),
									_Utils_Tuple2(
									'backlog',
									$author$project$Project$detectColumn.backlog(col))
								]))
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('card-content')
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('card-squares left vertical')
										]),
									_List_fromArray(
										[
											A2(
											$elm$html$Html$div,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('card-square')
												]),
											_List_fromArray(
												[
													$capitalist$elm_octicons$Octicons$note($author$project$Main$octiconOpts)
												]))
										])),
									A2(
									$elm_explorations$markdown$Markdown$toHtml,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('card-info card-note')
										]),
									val),
									A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('card-squares right vertical card-controls')
										]),
									_List_Nil)
								]))
						])),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('edit-bubble add-note'),
							$elm$html$Html$Attributes$draggable('true'),
							A2(
							$elm$html$Html$Events$custom,
							'dragstart',
							$elm$json$Json$Decode$succeed(
								{message: $author$project$Model$Noop, preventDefault: true, stopPropagation: true}))
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$form,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('write-note-form'),
									$elm$html$Html$Events$onSubmit(
									$author$project$Model$CreateColumnNote(col.id))
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$textarea,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$placeholder('Enter a note'),
											$elm$html$Html$Attributes$id(
											$author$project$Main$focusId(col.id)),
											$elm$html$Html$Events$onInput(
											$author$project$Model$SetCreatingColumnNote(col.id)),
											$author$project$Events$onCtrlEnter(
											$author$project$Model$CreateColumnNote(col.id))
										]),
									_List_fromArray(
										[
											$elm$html$Html$text(val)
										])),
									A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('buttons')
										]),
									_List_fromArray(
										[
											A2(
											$elm$html$Html$button,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('button cancel'),
													$elm$html$Html$Attributes$type_('reset'),
													$elm$html$Html$Events$onClick(
													$author$project$Model$CancelCreatingColumnNote(col.id))
												]),
											_List_fromArray(
												[
													$capitalist$elm_octicons$Octicons$x($author$project$Main$octiconOpts),
													$elm$html$Html$text('cancel')
												])),
											A2(
											$elm$html$Html$button,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('button apply'),
													$elm$html$Html$Attributes$type_('submit')
												]),
											_List_fromArray(
												[
													$capitalist$elm_octicons$Octicons$check($author$project$Main$octiconOpts),
													$elm$html$Html$text('add')
												]))
										]))
								]))
						]))
				]));
	});
var $author$project$Drag$hasNeverLeft = function (model) {
	if (model.$ === 'Dragging') {
		var neverLeft = model.a.neverLeft;
		return neverLeft;
	} else {
		return false;
	}
};
var $author$project$Drag$Over = function (a) {
	return {$: 'Over', a: a};
};
var $author$project$Drag$onDrop = F2(
	function (candidate, f) {
		return _List_fromArray(
			[
				A2(
				$elm$html$Html$Events$on,
				'dragenter',
				$elm$json$Json$Decode$succeed(
					f(
						$author$project$Drag$Over(
							$elm$core$Maybe$Just(candidate))))),
				A2(
				$elm$html$Html$Events$on,
				'dragleave',
				$elm$json$Json$Decode$succeed(
					f(
						$author$project$Drag$Over($elm$core$Maybe$Nothing)))),
				A2(
				$elm$html$Html$Events$preventDefaultOn,
				'dragover',
				$elm$json$Json$Decode$succeed(
					_Utils_Tuple2(
						f(
							$author$project$Drag$Over(
								$elm$core$Maybe$Just(candidate))),
						true))),
				A2(
				$elm$html$Html$Events$stopPropagationOn,
				'drop',
				$elm$json$Json$Decode$succeed(
					_Utils_Tuple2(
						f($author$project$Drag$End),
						true)))
			]);
	});
var $author$project$Drag$viewDropArea = F4(
	function (model, wrap, candidate, ownSource) {
		var isOver = function () {
			switch (model.$) {
				case 'NotDragging':
					return false;
				case 'Dragging':
					var state = model.a;
					var _v5 = state.dropCandidate;
					if (_v5.$ === 'Just') {
						var target = _v5.a.target;
						return _Utils_eq(target, candidate.target);
					} else {
						return state.neverLeft && _Utils_eq(
							$elm$core$Maybe$Just(state.source),
							ownSource);
					}
				case 'Dropping':
					var target = model.a.target;
					var landed = model.a.landed;
					return _Utils_eq(target, candidate.target) && (!landed);
				default:
					var target = model.a.target;
					var landed = model.a.landed;
					return _Utils_eq(target, candidate.target) && (!landed);
			}
		}();
		var isActive = function () {
			if (model.$ === 'Dragging') {
				return true;
			} else {
				return false;
			}
		}();
		var droppedElement = function () {
			if (model.$ === 'Dropped') {
				var start = model.a.start;
				return isOver ? start.element : $elm$html$Html$text('');
			} else {
				return $elm$html$Html$text('');
			}
		}();
		var dragEvents = isActive ? A2($author$project$Drag$onDrop, candidate, wrap) : _List_Nil;
		return A2(
			$elm$html$Html$div,
			_Utils_ap(
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('drop-area'),
						$elm$html$Html$Attributes$classList(
						_List_fromArray(
							[
								_Utils_Tuple2('active', isActive),
								_Utils_Tuple2(
								'never-left',
								$author$project$Drag$hasNeverLeft(model)),
								_Utils_Tuple2('over', isOver)
							]))
					]),
				_Utils_ap(
					dragEvents,
					A2(
						$elm$core$List$map,
						function (_v0) {
							var x = _v0.a;
							var y = _v0.b;
							return A2($elm$html$Html$Attributes$style, x, y);
						},
						function () {
							switch (model.$) {
								case 'NotDragging':
									return _List_Nil;
								case 'Dragging':
									var start = model.a.start;
									return isOver ? _List_fromArray(
										[
											_Utils_Tuple2(
											'min-height',
											$elm$core$String$fromFloat(start.elementBounds.height) + 'px')
										]) : _List_Nil;
								case 'Dropping':
									var start = model.a.start;
									return isOver ? _List_fromArray(
										[
											_Utils_Tuple2(
											'min-height',
											$elm$core$String$fromFloat(start.elementBounds.height) + 'px')
										]) : _List_Nil;
								default:
									var start = model.a.start;
									return isOver ? _List_fromArray(
										[
											_Utils_Tuple2(
											'min-height',
											$elm$core$String$fromFloat(start.elementBounds.height) + 'px')
										]) : _List_Nil;
							}
						}()))),
			_List_fromArray(
				[droppedElement]));
	});
var $author$project$Model$SetCardArchived = F2(
	function (a, b) {
		return {$: 'SetCardArchived', a: a, b: b};
	});
var $capitalist$elm_octicons$Octicons$archivePath = 'M13 2H1v2h12V2zM0 4a1 1 0 0 0 1 1v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H1a1 1 0 0 0-1 1v2zm2 1h10v9H2V5zm2 3h6V7H4v1z';
var $capitalist$elm_octicons$Octicons$archive = A3($capitalist$elm_octicons$Octicons$pathIconWithOptions, $capitalist$elm_octicons$Octicons$archivePath, '0 0 14 16', 'archive');
var $author$project$CardView$archiveCardControl = function (archiveId) {
	return A2(
		$elm$html$Html$span,
		_List_fromArray(
			[
				$author$project$Events$onClickNoBubble(
				A2($author$project$Model$SetCardArchived, archiveId, true))
			]),
		_List_fromArray(
			[
				$capitalist$elm_octicons$Octicons$archive($author$project$CardView$octiconOpts)
			]));
};
var $author$project$Model$CancelDeleteCard = function (a) {
	return {$: 'CancelDeleteCard', a: a};
};
var $author$project$Model$ConfirmDeleteCard = function (a) {
	return {$: 'ConfirmDeleteCard', a: a};
};
var $author$project$Model$DeleteCard = F2(
	function (a, b) {
		return {$: 'DeleteCard', a: a, b: b};
	});
var $capitalist$elm_octicons$Octicons$trashcanPath = 'M11,2 L9,2 C9,1.45 8.55,1 8,1 L5,1 C4.45,1 4,1.45 4,2 L2,2 C1.45,2 1,2.45 1,3 L1,4 C1,4.55 1.45,5 2,5 L2,14 C2,14.55 2.45,15 3,15 L10,15 C10.55,15 11,14.55 11,14 L11,5 C11.55,5 12,4.55 12,4 L12,3 C12,2.45 11.55,2 11,2 L11,2 Z M10,14 L3,14 L3,5 L4,5 L4,13 L5,13 L5,5 L6,5 L6,13 L7,13 L7,5 L8,5 L8,13 L9,13 L9,5 L10,5 L10,14 L10,14 Z M11,4 L2,4 L2,3 L11,3 L11,4 L11,4 Z';
var $capitalist$elm_octicons$Octicons$trashcan = A3($capitalist$elm_octicons$Octicons$pathIconWithOptions, $capitalist$elm_octicons$Octicons$trashcanPath, '0 0 12 16', 'trashcan');
var $author$project$CardView$deleteCardControl = F3(
	function (model, selfId, deleteId) {
		return A2($elm$core$Set$member, selfId, model.deletingCards) ? A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('with-confirm')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$span,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('cancel-delete-card'),
							$author$project$Events$onClickNoBubble(
							$author$project$Model$CancelDeleteCard(selfId))
						]),
					_List_fromArray(
						[
							$capitalist$elm_octicons$Octicons$x($author$project$CardView$octiconOpts)
						])),
					A2(
					$elm$html$Html$span,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('inline-confirm'),
							$author$project$Events$onClickNoBubble(
							A2($author$project$Model$DeleteCard, selfId, deleteId))
						]),
					_List_fromArray(
						[
							$capitalist$elm_octicons$Octicons$check($author$project$CardView$octiconOpts)
						]))
				])) : A2(
			$elm$html$Html$span,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('delete-card'),
					$author$project$Events$onClickNoBubble(
					$author$project$Model$ConfirmDeleteCard(selfId))
				]),
			_List_fromArray(
				[
					$capitalist$elm_octicons$Octicons$trashcan($author$project$CardView$octiconOpts)
				]));
	});
var $author$project$CardView$unarchiveCardControl = function (archiveId) {
	return A2(
		$elm$html$Html$span,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('unarchive'),
				$author$project$Events$onClickNoBubble(
				A2($author$project$Model$SetCardArchived, archiveId, false))
			]),
		_List_fromArray(
			[
				$capitalist$elm_octicons$Octicons$archive($author$project$CardView$octiconOpts)
			]));
};
var $author$project$CardView$viewLoadingCard = A2(
	$elm$html$Html$div,
	_List_fromArray(
		[
			$elm$html$Html$Attributes$class('card loading')
		]),
	_List_fromArray(
		[
			A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('card-content')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('card-squares left vertical')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$span,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('card-square')
								]),
							_List_fromArray(
								[
									$capitalist$elm_octicons$Octicons$sync($author$project$CardView$octiconOpts)
								]))
						])),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('card-info')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$span,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('loading-text')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('loading...')
								]))
						]))
				]))
		]));
var $author$project$Model$SetEditingCardNote = F2(
	function (a, b) {
		return {$: 'SetEditingCardNote', a: a, b: b};
	});
var $author$project$CardView$cardByUrl = F2(
	function (model, url) {
		return A2(
			$elm$core$Maybe$andThen,
			function (id) {
				return A2($elm$core$Dict$get, id, model.cards);
			},
			A2($elm$core$Dict$get, url, model.idsByUrl));
	});
var $elm_community$maybe_extra$Maybe$Extra$orElseLazy = F2(
	function (fma, mb) {
		if (mb.$ === 'Nothing') {
			return fma(_Utils_Tuple0);
		} else {
			return mb;
		}
	});
var $capitalist$elm_octicons$Octicons$pencilPath = 'M0,12 L0,15 L3,15 L11,7 L8,4 L0,12 L0,12 Z M3,14 L1,14 L1,12 L2,12 L2,13 L3,13 L3,14 L3,14 Z M13.3,4.7 L12,6 L9,3 L10.3,1.7 C10.69,1.31 11.32,1.31 11.71,1.7 L13.3,3.29 C13.69,3.68 13.69,4.31 13.3,4.7 L13.3,4.7 Z';
var $capitalist$elm_octicons$Octicons$pencil = A3($capitalist$elm_octicons$Octicons$pathIconWithOptions, $capitalist$elm_octicons$Octicons$pencilPath, '0 0 14 16', 'pencil');
var $author$project$CardView$projectByUrl = F2(
	function (model, url) {
		return A2(
			$elm$core$Maybe$andThen,
			function (id) {
				return A2($elm$core$Dict$get, id, model.projects);
			},
			A2($elm$core$Dict$get, url, model.idsByUrl));
	});
var $author$project$Model$CancelEditingCardNote = function (a) {
	return {$: 'CancelEditingCardNote', a: a};
};
var $author$project$Model$ConvertEditingCardNoteToIssue = F2(
	function (a, b) {
		return {$: 'ConvertEditingCardNoteToIssue', a: a, b: b};
	});
var $author$project$Model$UpdateCardNote = function (a) {
	return {$: 'UpdateCardNote', a: a};
};
var $author$project$CardView$viewNoteCard = F6(
	function (model, project, col, card, controls, text) {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('editable-card')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('card note'),
							$elm$html$Html$Attributes$classList(
							_List_fromArray(
								[
									_Utils_Tuple2(
									'loading',
									A2($elm$core$Dict$member, card.id, model.progress))
								])),
							$elm$html$Html$Attributes$tabindex(0),
							$elm$html$Html$Attributes$classList(
							_List_fromArray(
								[
									_Utils_Tuple2(
									'in-flight',
									$author$project$Project$detectColumn.inFlight(col)),
									_Utils_Tuple2(
									'done',
									$author$project$Project$detectColumn.done(col)),
									_Utils_Tuple2(
									'backlog',
									$author$project$Project$detectColumn.backlog(col))
								]))
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('card-content')
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('card-squares left vertical')
										]),
									A2(
										$elm$core$List$map,
										function (x) {
											return A2(
												$elm$html$Html$div,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$class('card-square')
													]),
												_List_fromArray(
													[x]));
										},
										_List_fromArray(
											[
												$capitalist$elm_octicons$Octicons$note($capitalist$elm_octicons$Octicons$defaultOptions)
											]))),
									A2(
									$elm_explorations$markdown$Markdown$toHtml,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('card-info card-note')
										]),
									A2(
										$elm$core$Maybe$withDefault,
										text,
										A2($elm$core$Dict$get, card.id, model.editingCardNotes))),
									A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('card-squares right vertical card-controls')
										]),
									A2(
										$elm$core$List$map,
										function (x) {
											return A2(
												$elm$html$Html$div,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$class('card-square')
													]),
												_List_fromArray(
													[x]));
										},
										_Utils_ap(
											controls,
											_List_fromArray(
												[
													A2(
													$elm$html$Html$span,
													_List_fromArray(
														[
															$elm$html$Html$Attributes$class('spin-on-column-refresh'),
															$elm$html$Html$Events$onClick(
															$author$project$Model$RefreshColumn(col.id))
														]),
													_List_fromArray(
														[
															$capitalist$elm_octicons$Octicons$sync($capitalist$elm_octicons$Octicons$defaultOptions)
														]))
												]))))
								]))
						])),
					function () {
					var _v0 = A2($elm$core$Dict$get, card.id, model.editingCardNotes);
					if (_v0.$ === 'Nothing') {
						return $elm$html$Html$text('');
					} else {
						var val = _v0.a;
						return A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('edit-bubble'),
									$elm$html$Html$Attributes$draggable('true'),
									A2(
									$elm$html$Html$Events$custom,
									'dragstart',
									$elm$json$Json$Decode$succeed(
										{message: $author$project$Model$Noop, preventDefault: true, stopPropagation: true}))
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$form,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('write-note-form'),
											$elm$html$Html$Events$onSubmit(
											$author$project$Model$UpdateCardNote(card.id))
										]),
									_List_fromArray(
										[
											A2(
											$elm$html$Html$textarea,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$placeholder('Enter a note'),
													$elm$html$Html$Attributes$id(
													$author$project$CardView$focusId(card.id)),
													$elm$html$Html$Events$onInput(
													$author$project$Model$SetEditingCardNote(card.id)),
													$author$project$Events$onCtrlEnter(
													$author$project$Model$UpdateCardNote(card.id))
												]),
											_List_fromArray(
												[
													$elm$html$Html$text(val)
												])),
											A2(
											$elm$html$Html$div,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('buttons')
												]),
											_List_fromArray(
												[
													A2(
													$elm$html$Html$button,
													_List_fromArray(
														[
															$elm$html$Html$Attributes$class('button cancel'),
															$elm$html$Html$Attributes$type_('reset'),
															$elm$html$Html$Events$onClick(
															$author$project$Model$CancelEditingCardNote(card.id))
														]),
													_List_fromArray(
														[
															$capitalist$elm_octicons$Octicons$x($capitalist$elm_octicons$Octicons$defaultOptions),
															$elm$html$Html$text('cancel')
														])),
													function () {
													var _v1 = project.owner;
													if (_v1.$ === 'ProjectOwnerRepo') {
														var repoId = _v1.a;
														return A2(
															$elm$html$Html$button,
															_List_fromArray(
																[
																	$elm$html$Html$Attributes$class('button convert-to-issue'),
																	$elm$html$Html$Attributes$type_('button'),
																	$elm$html$Html$Events$onClick(
																	A2($author$project$Model$ConvertEditingCardNoteToIssue, card.id, repoId))
																]),
															_List_fromArray(
																[
																	$capitalist$elm_octicons$Octicons$issueOpened($capitalist$elm_octicons$Octicons$defaultOptions),
																	$elm$html$Html$text('convert to issue')
																]));
													} else {
														return $elm$html$Html$text('');
													}
												}(),
													A2(
													$elm$html$Html$button,
													_List_fromArray(
														[
															$elm$html$Html$Attributes$class('button apply'),
															$elm$html$Html$Attributes$type_('submit')
														]),
													_List_fromArray(
														[
															$capitalist$elm_octicons$Octicons$check($capitalist$elm_octicons$Octicons$defaultOptions),
															$elm$html$Html$text('save')
														]))
												]))
										]))
								]));
					}
				}()
				]));
	});
var $author$project$CardView$viewNote = F5(
	function (model, project, col, card, text) {
		var controls = _Utils_eq(model.me, $elm$core$Maybe$Nothing) ? _List_Nil : _List_fromArray(
			[
				A3($author$project$CardView$deleteCardControl, model, card.id, card.id),
				A2(
				$elm$html$Html$span,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('edit-note'),
						$author$project$Events$onClickNoBubble(
						A2($author$project$Model$SetEditingCardNote, card.id, text))
					]),
				_List_fromArray(
					[
						$capitalist$elm_octicons$Octicons$pencil($capitalist$elm_octicons$Octicons$defaultOptions)
					]))
			]);
		return A2($elm$core$Dict$member, card.id, model.editingCardNotes) ? A6($author$project$CardView$viewNoteCard, model, project, col, card, controls, text) : (A2($elm$core$String$startsWith, 'http', text) ? A2(
			$elm$core$Maybe$withDefault,
			A6($author$project$CardView$viewNoteCard, model, project, col, card, controls, text),
			A2(
				$elm_community$maybe_extra$Maybe$Extra$orElseLazy,
				function (_v0) {
					return A2(
						$elm$core$Maybe$map,
						A2($author$project$CardView$viewCard, model, controls),
						A2($author$project$CardView$cardByUrl, model, text));
				},
				A2(
					$elm$core$Maybe$map,
					A2($author$project$CardView$viewProjectCard, model, controls),
					A2($author$project$CardView$projectByUrl, model, text)))) : A6($author$project$CardView$viewNoteCard, model, project, col, card, controls, text));
	});
var $author$project$CardView$viewProjectColumnCard = F4(
	function (model, project, col, ghCard) {
		var _v0 = _Utils_Tuple2(ghCard.note, ghCard.contentId);
		_v0$2:
		while (true) {
			if (_v0.a.$ === 'Just') {
				if (_v0.b.$ === 'Nothing') {
					var n = _v0.a.a;
					var _v1 = _v0.b;
					return A5($author$project$CardView$viewNote, model, project, col, ghCard, n);
				} else {
					break _v0$2;
				}
			} else {
				if (_v0.b.$ === 'Just') {
					var _v2 = _v0.a;
					var contentId = _v0.b.a;
					var _v3 = A2($elm$core$Dict$get, contentId, model.cards);
					if (_v3.$ === 'Just') {
						var c = _v3.a;
						var controls = _Utils_eq(model.me, $elm$core$Maybe$Nothing) ? _List_Nil : ((!$author$project$Card$isOpen(c)) ? _List_fromArray(
							[
								A3($author$project$CardView$deleteCardControl, model, c.id, ghCard.id),
								ghCard.isArchived ? $author$project$CardView$unarchiveCardControl(ghCard.id) : $author$project$CardView$archiveCardControl(ghCard.id)
							]) : _List_fromArray(
							[
								A3($author$project$CardView$deleteCardControl, model, c.id, ghCard.id)
							]));
						return A3($author$project$CardView$viewCard, model, controls, c);
					} else {
						return $author$project$CardView$viewLoadingCard;
					}
				} else {
					break _v0$2;
				}
			}
		}
		return $elm$html$Html$text('impossible: card is neither note nor content');
	});
var $author$project$Main$viewProjectColumn = F3(
	function (model, project, col) {
		var firstDropCandidate = {
			msgFunc: $author$project$Model$MoveCardAfter,
			target: {afterId: $elm$core$Maybe$Nothing, columnId: col.id, projectId: project.id}
		};
		var draggableCard = function (card) {
			var dragId = $author$project$Model$FromColumnCardSource(
				{cardId: card.id, columnId: col.id});
			var afterDropCandidate = {
				msgFunc: $author$project$Model$MoveCardAfter,
				target: {
					afterId: $elm$core$Maybe$Just(card.id),
					columnId: col.id,
					projectId: project.id
				}
			};
			return _List_fromArray(
				[
					A4(
					$author$project$Drag$draggable,
					model.projectDrag,
					$author$project$Model$ProjectDrag,
					dragId,
					A4($author$project$CardView$viewProjectColumnCard, model, project, col, card)),
					A4(
					$author$project$Drag$viewDropArea,
					model.projectDrag,
					$author$project$Model$ProjectDrag,
					afterDropCandidate,
					$elm$core$Maybe$Just(dragId))
				]);
		};
		var cards = A2(
			$elm$core$Maybe$withDefault,
			_List_Nil,
			A2($elm$core$Dict$get, col.id, model.columnCards));
		var addingNote = A2($elm$core$Dict$get, col.id, model.addingColumnNotes);
		var _v0 = A2(
			$elm$core$List$partition,
			function ($) {
				return $.isArchived;
			},
			cards);
		var archived = _v0.a;
		var unarchived = _v0.b;
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('fixed-column'),
					$elm$html$Html$Attributes$classList(
					_List_fromArray(
						[
							_Utils_Tuple2(
							'loading',
							A2($elm$core$Dict$member, col.id, model.progress))
						]))
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('column-title')
						]),
					_List_fromArray(
						[
							$author$project$Main$columnIcon(col),
							A2(
							$elm$html$Html$span,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('column-name')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text(col.name)
								])),
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('column-controls')
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$span,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('refresh-column spin-on-column-refresh'),
											$elm$html$Html$Events$onClick(
											$author$project$Model$RefreshColumn(col.id))
										]),
									_List_fromArray(
										[
											$capitalist$elm_octicons$Octicons$sync($author$project$Main$octiconOpts)
										])),
									A2(
									$author$project$Model$whenLoggedIn,
									model,
									A2(
										$elm$html$Html$span,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('add-card'),
												$elm$html$Html$Events$onClick(
												A2($author$project$Model$SetCreatingColumnNote, col.id, ''))
											]),
										_List_fromArray(
											[
												$capitalist$elm_octicons$Octicons$plus($author$project$Main$octiconOpts)
											])))
								]))
						])),
					(_Utils_eq(addingNote, $elm$core$Maybe$Nothing) && $elm$core$List$isEmpty(cards)) ? A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('no-cards')
						]),
					_List_fromArray(
						[
							A4($author$project$Drag$viewDropArea, model.projectDrag, $author$project$Model$ProjectDrag, firstDropCandidate, $elm$core$Maybe$Nothing)
						])) : A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('cards')
						]),
					$elm$core$List$concat(
						_List_fromArray(
							[
								_List_fromArray(
								[
									A4($author$project$Drag$viewDropArea, model.projectDrag, $author$project$Model$ProjectDrag, firstDropCandidate, $elm$core$Maybe$Nothing)
								]),
								function () {
								if (addingNote.$ === 'Nothing') {
									return _List_Nil;
								} else {
									var note = addingNote.a;
									return _List_fromArray(
										[
											A2($author$project$Main$viewAddingNote, col, note)
										]);
								}
							}(),
								A2($elm$core$List$concatMap, draggableCard, unarchived)
							]))),
					$elm$core$List$isEmpty(archived) ? $elm$html$Html$text('') : A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('archived-cards')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('archived-cards-header'),
									$elm$html$Html$Attributes$classList(
									_List_fromArray(
										[
											_Utils_Tuple2(
											'showing',
											A2($elm$core$Set$member, col.id, model.showArchivedCards))
										])),
									$elm$html$Html$Events$onClick(
									$author$project$Model$ToggleShowArchivedCards(col.id))
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$span,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('counter')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text(
											$elm$core$String$fromInt(
												$elm$core$List$length(archived)))
										])),
									$elm$html$Html$text(' '),
									$elm$html$Html$text('archived cards')
								])),
							A2($elm$core$Set$member, col.id, model.showArchivedCards) ? A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('cards')
								]),
							A2(
								$elm$core$List$cons,
								A4($author$project$Drag$viewDropArea, model.projectDrag, $author$project$Model$ProjectDrag, firstDropCandidate, $elm$core$Maybe$Nothing),
								A2($elm$core$List$concatMap, draggableCard, archived))) : $elm$html$Html$text('')
						]))
				]));
	});
var $author$project$Main$viewRepoRoadmap = F3(
	function (model, repo, project) {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('repo-roadmap')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('page-header')
						]),
					_List_fromArray(
						[
							$capitalist$elm_octicons$Octicons$project($author$project$Main$octiconOpts),
							$elm$html$Html$text(project.name),
							$capitalist$elm_octicons$Octicons$repo($author$project$Main$octiconOpts),
							$elm$html$Html$text(repo.name)
						])),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('fixed-columns')
						]),
					A2(
						$elm$core$List$map,
						A2($author$project$Main$viewProjectColumn, model, project),
						project.columns))
				]));
	});
var $author$project$Main$viewAllProjectsPage = function (model) {
	var extractRoadmaps = F3(
		function (rid, rps, _v5) {
			var rms = _v5.a;
			var ps = _v5.b;
			var _v3 = A2($elm$core$Dict$get, rid, model.repos);
			if (_v3.$ === 'Nothing') {
				return _Utils_Tuple2(rms, ps);
			} else {
				var r = _v3.a;
				if ($elm$core$List$isEmpty(rps)) {
					return _Utils_Tuple2(rms, ps);
				} else {
					var _v4 = A2(
						$elm_community$list_extra$List$Extra$find,
						A2(
							$elm$core$Basics$composeL,
							$elm$core$Basics$eq('Roadmap'),
							function ($) {
								return $.name;
							}),
						rps);
					if (_v4.$ === 'Nothing') {
						return _Utils_Tuple2(
							rms,
							A2(
								$elm$core$List$cons,
								_Utils_Tuple2(r, rps),
								ps));
					} else {
						var rm = _v4.a;
						return _Utils_Tuple2(
							A2(
								$elm$core$List$cons,
								_Utils_Tuple2(r, rm),
								rms),
							ps);
					}
				}
			}
		});
	var _v0 = A3(
		$elm$core$Dict$foldl,
		extractRoadmaps,
		_Utils_Tuple2(_List_Nil, _List_Nil),
		model.repoProjects);
	var roadmaps = _v0.a;
	var projects = _v0.b;
	var allProjects = $elm$core$List$isEmpty(projects) ? _List_Nil : _List_fromArray(
		[
			A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('page-header')
				]),
			_List_fromArray(
				[
					$capitalist$elm_octicons$Octicons$project($author$project$Main$octiconOpts),
					$elm$html$Html$text('All Projects')
				])),
			A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('fixed-columns card-columns')
				]),
			A2(
				$elm$core$List$map,
				function (_v2) {
					var a = _v2.a;
					var b = _v2.b;
					return A3($author$project$Main$viewRepoProjects, model, a, b);
				},
				projects))
		]);
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('page-content')
			]),
		_Utils_ap(
			A2(
				$elm$core$List$map,
				function (_v1) {
					var a = _v1.a;
					var b = _v1.b;
					return A3($author$project$Main$viewRepoRoadmap, model, a, b);
				},
				roadmaps),
			allProjects));
};
var $justinmimbs$time_extra$Time$Extra$Week = {$: 'Week'};
var $justinmimbs$date$Date$Day = {$: 'Day'};
var $justinmimbs$date$Date$Friday = {$: 'Friday'};
var $justinmimbs$date$Date$Monday = {$: 'Monday'};
var $justinmimbs$date$Date$Month = {$: 'Month'};
var $justinmimbs$date$Date$Quarter = {$: 'Quarter'};
var $justinmimbs$date$Date$Saturday = {$: 'Saturday'};
var $justinmimbs$date$Date$Sunday = {$: 'Sunday'};
var $justinmimbs$date$Date$Thursday = {$: 'Thursday'};
var $justinmimbs$date$Date$Tuesday = {$: 'Tuesday'};
var $justinmimbs$date$Date$Wednesday = {$: 'Wednesday'};
var $justinmimbs$date$Date$Week = {$: 'Week'};
var $justinmimbs$date$Date$Year = {$: 'Year'};
var $elm$time$Time$Fri = {$: 'Fri'};
var $elm$time$Time$Mon = {$: 'Mon'};
var $justinmimbs$date$Date$RD = function (a) {
	return {$: 'RD', a: a};
};
var $elm$time$Time$Sat = {$: 'Sat'};
var $elm$time$Time$Sun = {$: 'Sun'};
var $elm$time$Time$Thu = {$: 'Thu'};
var $elm$time$Time$Tue = {$: 'Tue'};
var $elm$time$Time$Wed = {$: 'Wed'};
var $justinmimbs$date$Date$weekdayNumber = function (_v0) {
	var rd = _v0.a;
	var _v1 = A2($elm$core$Basics$modBy, 7, rd);
	if (!_v1) {
		return 7;
	} else {
		var n = _v1;
		return n;
	}
};
var $justinmimbs$date$Date$weekdayToNumber = function (wd) {
	switch (wd.$) {
		case 'Mon':
			return 1;
		case 'Tue':
			return 2;
		case 'Wed':
			return 3;
		case 'Thu':
			return 4;
		case 'Fri':
			return 5;
		case 'Sat':
			return 6;
		default:
			return 7;
	}
};
var $justinmimbs$date$Date$daysSincePreviousWeekday = F2(
	function (wd, date) {
		return A2(
			$elm$core$Basics$modBy,
			7,
			($justinmimbs$date$Date$weekdayNumber(date) + 7) - $justinmimbs$date$Date$weekdayToNumber(wd));
	});
var $justinmimbs$date$Date$isLeapYear = function (y) {
	return ((!A2($elm$core$Basics$modBy, 4, y)) && (!(!A2($elm$core$Basics$modBy, 100, y)))) || (!A2($elm$core$Basics$modBy, 400, y));
};
var $justinmimbs$date$Date$daysBeforeMonth = F2(
	function (y, m) {
		var leapDays = $justinmimbs$date$Date$isLeapYear(y) ? 1 : 0;
		switch (m.$) {
			case 'Jan':
				return 0;
			case 'Feb':
				return 31;
			case 'Mar':
				return 59 + leapDays;
			case 'Apr':
				return 90 + leapDays;
			case 'May':
				return 120 + leapDays;
			case 'Jun':
				return 151 + leapDays;
			case 'Jul':
				return 181 + leapDays;
			case 'Aug':
				return 212 + leapDays;
			case 'Sep':
				return 243 + leapDays;
			case 'Oct':
				return 273 + leapDays;
			case 'Nov':
				return 304 + leapDays;
			default:
				return 334 + leapDays;
		}
	});
var $justinmimbs$date$Date$floorDiv = F2(
	function (a, b) {
		return $elm$core$Basics$floor(a / b);
	});
var $justinmimbs$date$Date$daysBeforeYear = function (y1) {
	var y = y1 - 1;
	var leapYears = (A2($justinmimbs$date$Date$floorDiv, y, 4) - A2($justinmimbs$date$Date$floorDiv, y, 100)) + A2($justinmimbs$date$Date$floorDiv, y, 400);
	return (365 * y) + leapYears;
};
var $justinmimbs$date$Date$firstOfMonth = F2(
	function (y, m) {
		return $justinmimbs$date$Date$RD(
			($justinmimbs$date$Date$daysBeforeYear(y) + A2($justinmimbs$date$Date$daysBeforeMonth, y, m)) + 1);
	});
var $justinmimbs$date$Date$firstOfYear = function (y) {
	return $justinmimbs$date$Date$RD(
		$justinmimbs$date$Date$daysBeforeYear(y) + 1);
};
var $elm$time$Time$Jan = {$: 'Jan'};
var $justinmimbs$date$Date$daysInMonth = F2(
	function (y, m) {
		switch (m.$) {
			case 'Jan':
				return 31;
			case 'Feb':
				return $justinmimbs$date$Date$isLeapYear(y) ? 29 : 28;
			case 'Mar':
				return 31;
			case 'Apr':
				return 30;
			case 'May':
				return 31;
			case 'Jun':
				return 30;
			case 'Jul':
				return 31;
			case 'Aug':
				return 31;
			case 'Sep':
				return 30;
			case 'Oct':
				return 31;
			case 'Nov':
				return 30;
			default:
				return 31;
		}
	});
var $justinmimbs$date$Date$monthToNumber = function (m) {
	switch (m.$) {
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
var $elm$time$Time$Apr = {$: 'Apr'};
var $elm$time$Time$Aug = {$: 'Aug'};
var $elm$time$Time$Dec = {$: 'Dec'};
var $elm$time$Time$Feb = {$: 'Feb'};
var $elm$time$Time$Jul = {$: 'Jul'};
var $elm$time$Time$Jun = {$: 'Jun'};
var $elm$time$Time$Mar = {$: 'Mar'};
var $elm$time$Time$May = {$: 'May'};
var $elm$time$Time$Nov = {$: 'Nov'};
var $elm$time$Time$Oct = {$: 'Oct'};
var $elm$time$Time$Sep = {$: 'Sep'};
var $justinmimbs$date$Date$numberToMonth = function (mn) {
	var _v0 = A2($elm$core$Basics$max, 1, mn);
	switch (_v0) {
		case 1:
			return $elm$time$Time$Jan;
		case 2:
			return $elm$time$Time$Feb;
		case 3:
			return $elm$time$Time$Mar;
		case 4:
			return $elm$time$Time$Apr;
		case 5:
			return $elm$time$Time$May;
		case 6:
			return $elm$time$Time$Jun;
		case 7:
			return $elm$time$Time$Jul;
		case 8:
			return $elm$time$Time$Aug;
		case 9:
			return $elm$time$Time$Sep;
		case 10:
			return $elm$time$Time$Oct;
		case 11:
			return $elm$time$Time$Nov;
		default:
			return $elm$time$Time$Dec;
	}
};
var $justinmimbs$date$Date$toCalendarDateHelp = F3(
	function (y, m, d) {
		toCalendarDateHelp:
		while (true) {
			var monthDays = A2($justinmimbs$date$Date$daysInMonth, y, m);
			var mn = $justinmimbs$date$Date$monthToNumber(m);
			if ((mn < 12) && (_Utils_cmp(d, monthDays) > 0)) {
				var $temp$y = y,
					$temp$m = $justinmimbs$date$Date$numberToMonth(mn + 1),
					$temp$d = d - monthDays;
				y = $temp$y;
				m = $temp$m;
				d = $temp$d;
				continue toCalendarDateHelp;
			} else {
				return {day: d, month: m, year: y};
			}
		}
	});
var $justinmimbs$date$Date$divWithRemainder = F2(
	function (a, b) {
		return _Utils_Tuple2(
			A2($justinmimbs$date$Date$floorDiv, a, b),
			A2($elm$core$Basics$modBy, b, a));
	});
var $justinmimbs$date$Date$year = function (_v0) {
	var rd = _v0.a;
	var _v1 = A2($justinmimbs$date$Date$divWithRemainder, rd, 146097);
	var n400 = _v1.a;
	var r400 = _v1.b;
	var _v2 = A2($justinmimbs$date$Date$divWithRemainder, r400, 36524);
	var n100 = _v2.a;
	var r100 = _v2.b;
	var _v3 = A2($justinmimbs$date$Date$divWithRemainder, r100, 1461);
	var n4 = _v3.a;
	var r4 = _v3.b;
	var _v4 = A2($justinmimbs$date$Date$divWithRemainder, r4, 365);
	var n1 = _v4.a;
	var r1 = _v4.b;
	var n = (!r1) ? 0 : 1;
	return ((((n400 * 400) + (n100 * 100)) + (n4 * 4)) + n1) + n;
};
var $justinmimbs$date$Date$toOrdinalDate = function (_v0) {
	var rd = _v0.a;
	var y = $justinmimbs$date$Date$year(
		$justinmimbs$date$Date$RD(rd));
	return {
		ordinalDay: rd - $justinmimbs$date$Date$daysBeforeYear(y),
		year: y
	};
};
var $justinmimbs$date$Date$toCalendarDate = function (_v0) {
	var rd = _v0.a;
	var date = $justinmimbs$date$Date$toOrdinalDate(
		$justinmimbs$date$Date$RD(rd));
	return A3($justinmimbs$date$Date$toCalendarDateHelp, date.year, $elm$time$Time$Jan, date.ordinalDay);
};
var $justinmimbs$date$Date$month = A2(
	$elm$core$Basics$composeR,
	$justinmimbs$date$Date$toCalendarDate,
	function ($) {
		return $.month;
	});
var $justinmimbs$date$Date$monthToQuarter = function (m) {
	return (($justinmimbs$date$Date$monthToNumber(m) + 2) / 3) | 0;
};
var $justinmimbs$date$Date$quarter = A2($elm$core$Basics$composeR, $justinmimbs$date$Date$month, $justinmimbs$date$Date$monthToQuarter);
var $justinmimbs$date$Date$quarterToMonth = function (q) {
	return $justinmimbs$date$Date$numberToMonth((q * 3) - 2);
};
var $justinmimbs$date$Date$floor = F2(
	function (interval, date) {
		var rd = date.a;
		switch (interval.$) {
			case 'Year':
				return $justinmimbs$date$Date$firstOfYear(
					$justinmimbs$date$Date$year(date));
			case 'Quarter':
				return A2(
					$justinmimbs$date$Date$firstOfMonth,
					$justinmimbs$date$Date$year(date),
					$justinmimbs$date$Date$quarterToMonth(
						$justinmimbs$date$Date$quarter(date)));
			case 'Month':
				return A2(
					$justinmimbs$date$Date$firstOfMonth,
					$justinmimbs$date$Date$year(date),
					$justinmimbs$date$Date$month(date));
			case 'Week':
				return $justinmimbs$date$Date$RD(
					rd - A2($justinmimbs$date$Date$daysSincePreviousWeekday, $elm$time$Time$Mon, date));
			case 'Monday':
				return $justinmimbs$date$Date$RD(
					rd - A2($justinmimbs$date$Date$daysSincePreviousWeekday, $elm$time$Time$Mon, date));
			case 'Tuesday':
				return $justinmimbs$date$Date$RD(
					rd - A2($justinmimbs$date$Date$daysSincePreviousWeekday, $elm$time$Time$Tue, date));
			case 'Wednesday':
				return $justinmimbs$date$Date$RD(
					rd - A2($justinmimbs$date$Date$daysSincePreviousWeekday, $elm$time$Time$Wed, date));
			case 'Thursday':
				return $justinmimbs$date$Date$RD(
					rd - A2($justinmimbs$date$Date$daysSincePreviousWeekday, $elm$time$Time$Thu, date));
			case 'Friday':
				return $justinmimbs$date$Date$RD(
					rd - A2($justinmimbs$date$Date$daysSincePreviousWeekday, $elm$time$Time$Fri, date));
			case 'Saturday':
				return $justinmimbs$date$Date$RD(
					rd - A2($justinmimbs$date$Date$daysSincePreviousWeekday, $elm$time$Time$Sat, date));
			case 'Sunday':
				return $justinmimbs$date$Date$RD(
					rd - A2($justinmimbs$date$Date$daysSincePreviousWeekday, $elm$time$Time$Sun, date));
			default:
				return date;
		}
	});
var $elm$core$Basics$clamp = F3(
	function (low, high, number) {
		return (_Utils_cmp(number, low) < 0) ? low : ((_Utils_cmp(number, high) > 0) ? high : number);
	});
var $justinmimbs$date$Date$fromCalendarDate = F3(
	function (y, m, d) {
		return $justinmimbs$date$Date$RD(
			($justinmimbs$date$Date$daysBeforeYear(y) + A2($justinmimbs$date$Date$daysBeforeMonth, y, m)) + A3(
				$elm$core$Basics$clamp,
				1,
				A2($justinmimbs$date$Date$daysInMonth, y, m),
				d));
	});
var $elm$time$Time$flooredDiv = F2(
	function (numerator, denominator) {
		return $elm$core$Basics$floor(numerator / denominator);
	});
var $elm$time$Time$toAdjustedMinutesHelp = F3(
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
var $elm$time$Time$toAdjustedMinutes = F2(
	function (_v0, time) {
		var defaultOffset = _v0.a;
		var eras = _v0.b;
		return A3(
			$elm$time$Time$toAdjustedMinutesHelp,
			defaultOffset,
			A2(
				$elm$time$Time$flooredDiv,
				$elm$time$Time$posixToMillis(time),
				60000),
			eras);
	});
var $elm$time$Time$toCivil = function (minutes) {
	var rawDay = A2($elm$time$Time$flooredDiv, minutes, 60 * 24) + 719468;
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
var $elm$time$Time$toDay = F2(
	function (zone, time) {
		return $elm$time$Time$toCivil(
			A2($elm$time$Time$toAdjustedMinutes, zone, time)).day;
	});
var $elm$time$Time$toMonth = F2(
	function (zone, time) {
		var _v0 = $elm$time$Time$toCivil(
			A2($elm$time$Time$toAdjustedMinutes, zone, time)).month;
		switch (_v0) {
			case 1:
				return $elm$time$Time$Jan;
			case 2:
				return $elm$time$Time$Feb;
			case 3:
				return $elm$time$Time$Mar;
			case 4:
				return $elm$time$Time$Apr;
			case 5:
				return $elm$time$Time$May;
			case 6:
				return $elm$time$Time$Jun;
			case 7:
				return $elm$time$Time$Jul;
			case 8:
				return $elm$time$Time$Aug;
			case 9:
				return $elm$time$Time$Sep;
			case 10:
				return $elm$time$Time$Oct;
			case 11:
				return $elm$time$Time$Nov;
			default:
				return $elm$time$Time$Dec;
		}
	});
var $elm$time$Time$toYear = F2(
	function (zone, time) {
		return $elm$time$Time$toCivil(
			A2($elm$time$Time$toAdjustedMinutes, zone, time)).year;
	});
var $justinmimbs$date$Date$fromPosix = F2(
	function (zone, posix) {
		return A3(
			$justinmimbs$date$Date$fromCalendarDate,
			A2($elm$time$Time$toYear, zone, posix),
			A2($elm$time$Time$toMonth, zone, posix),
			A2($elm$time$Time$toDay, zone, posix));
	});
var $justinmimbs$date$Date$toRataDie = function (_v0) {
	var rd = _v0.a;
	return rd;
};
var $justinmimbs$time_extra$Time$Extra$dateToMillis = function (date) {
	var daysSinceEpoch = $justinmimbs$date$Date$toRataDie(date) - 719163;
	return daysSinceEpoch * 86400000;
};
var $justinmimbs$time_extra$Time$Extra$timeFromClock = F4(
	function (hour, minute, second, millisecond) {
		return (((hour * 3600000) + (minute * 60000)) + (second * 1000)) + millisecond;
	});
var $elm$time$Time$toHour = F2(
	function (zone, time) {
		return A2(
			$elm$core$Basics$modBy,
			24,
			A2(
				$elm$time$Time$flooredDiv,
				A2($elm$time$Time$toAdjustedMinutes, zone, time),
				60));
	});
var $elm$time$Time$toMillis = F2(
	function (_v0, time) {
		return A2(
			$elm$core$Basics$modBy,
			1000,
			$elm$time$Time$posixToMillis(time));
	});
var $elm$time$Time$toMinute = F2(
	function (zone, time) {
		return A2(
			$elm$core$Basics$modBy,
			60,
			A2($elm$time$Time$toAdjustedMinutes, zone, time));
	});
var $elm$time$Time$toSecond = F2(
	function (_v0, time) {
		return A2(
			$elm$core$Basics$modBy,
			60,
			A2(
				$elm$time$Time$flooredDiv,
				$elm$time$Time$posixToMillis(time),
				1000));
	});
var $justinmimbs$time_extra$Time$Extra$timeFromPosix = F2(
	function (zone, posix) {
		return A4(
			$justinmimbs$time_extra$Time$Extra$timeFromClock,
			A2($elm$time$Time$toHour, zone, posix),
			A2($elm$time$Time$toMinute, zone, posix),
			A2($elm$time$Time$toSecond, zone, posix),
			A2($elm$time$Time$toMillis, zone, posix));
	});
var $justinmimbs$time_extra$Time$Extra$toOffset = F2(
	function (zone, posix) {
		var millis = $elm$time$Time$posixToMillis(posix);
		var localMillis = $justinmimbs$time_extra$Time$Extra$dateToMillis(
			A2($justinmimbs$date$Date$fromPosix, zone, posix)) + A2($justinmimbs$time_extra$Time$Extra$timeFromPosix, zone, posix);
		return ((localMillis - millis) / 60000) | 0;
	});
var $justinmimbs$time_extra$Time$Extra$posixFromDateTime = F3(
	function (zone, date, time) {
		var millis = $justinmimbs$time_extra$Time$Extra$dateToMillis(date) + time;
		var offset0 = A2(
			$justinmimbs$time_extra$Time$Extra$toOffset,
			zone,
			$elm$time$Time$millisToPosix(millis));
		var posix1 = $elm$time$Time$millisToPosix(millis - (offset0 * 60000));
		var offset1 = A2($justinmimbs$time_extra$Time$Extra$toOffset, zone, posix1);
		if (_Utils_eq(offset0, offset1)) {
			return posix1;
		} else {
			var posix2 = $elm$time$Time$millisToPosix(millis - (offset1 * 60000));
			var offset2 = A2($justinmimbs$time_extra$Time$Extra$toOffset, zone, posix2);
			return _Utils_eq(offset1, offset2) ? posix2 : posix1;
		}
	});
var $justinmimbs$time_extra$Time$Extra$floorDate = F3(
	function (dateInterval, zone, posix) {
		return A3(
			$justinmimbs$time_extra$Time$Extra$posixFromDateTime,
			zone,
			A2(
				$justinmimbs$date$Date$floor,
				dateInterval,
				A2($justinmimbs$date$Date$fromPosix, zone, posix)),
			0);
	});
var $justinmimbs$time_extra$Time$Extra$floor = F3(
	function (interval, zone, posix) {
		switch (interval.$) {
			case 'Millisecond':
				return posix;
			case 'Second':
				return A3(
					$justinmimbs$time_extra$Time$Extra$posixFromDateTime,
					zone,
					A2($justinmimbs$date$Date$fromPosix, zone, posix),
					A4(
						$justinmimbs$time_extra$Time$Extra$timeFromClock,
						A2($elm$time$Time$toHour, zone, posix),
						A2($elm$time$Time$toMinute, zone, posix),
						A2($elm$time$Time$toSecond, zone, posix),
						0));
			case 'Minute':
				return A3(
					$justinmimbs$time_extra$Time$Extra$posixFromDateTime,
					zone,
					A2($justinmimbs$date$Date$fromPosix, zone, posix),
					A4(
						$justinmimbs$time_extra$Time$Extra$timeFromClock,
						A2($elm$time$Time$toHour, zone, posix),
						A2($elm$time$Time$toMinute, zone, posix),
						0,
						0));
			case 'Hour':
				return A3(
					$justinmimbs$time_extra$Time$Extra$posixFromDateTime,
					zone,
					A2($justinmimbs$date$Date$fromPosix, zone, posix),
					A4(
						$justinmimbs$time_extra$Time$Extra$timeFromClock,
						A2($elm$time$Time$toHour, zone, posix),
						0,
						0,
						0));
			case 'Day':
				return A3($justinmimbs$time_extra$Time$Extra$floorDate, $justinmimbs$date$Date$Day, zone, posix);
			case 'Month':
				return A3($justinmimbs$time_extra$Time$Extra$floorDate, $justinmimbs$date$Date$Month, zone, posix);
			case 'Year':
				return A3($justinmimbs$time_extra$Time$Extra$floorDate, $justinmimbs$date$Date$Year, zone, posix);
			case 'Quarter':
				return A3($justinmimbs$time_extra$Time$Extra$floorDate, $justinmimbs$date$Date$Quarter, zone, posix);
			case 'Week':
				return A3($justinmimbs$time_extra$Time$Extra$floorDate, $justinmimbs$date$Date$Week, zone, posix);
			case 'Monday':
				return A3($justinmimbs$time_extra$Time$Extra$floorDate, $justinmimbs$date$Date$Monday, zone, posix);
			case 'Tuesday':
				return A3($justinmimbs$time_extra$Time$Extra$floorDate, $justinmimbs$date$Date$Tuesday, zone, posix);
			case 'Wednesday':
				return A3($justinmimbs$time_extra$Time$Extra$floorDate, $justinmimbs$date$Date$Wednesday, zone, posix);
			case 'Thursday':
				return A3($justinmimbs$time_extra$Time$Extra$floorDate, $justinmimbs$date$Date$Thursday, zone, posix);
			case 'Friday':
				return A3($justinmimbs$time_extra$Time$Extra$floorDate, $justinmimbs$date$Date$Friday, zone, posix);
			case 'Saturday':
				return A3($justinmimbs$time_extra$Time$Extra$floorDate, $justinmimbs$date$Date$Saturday, zone, posix);
			default:
				return A3($justinmimbs$time_extra$Time$Extra$floorDate, $justinmimbs$date$Date$Sunday, zone, posix);
		}
	});
var $elm_community$list_extra$List$Extra$takeWhile = function (predicate) {
	var takeWhileMemo = F2(
		function (memo, list) {
			takeWhileMemo:
			while (true) {
				if (!list.b) {
					return $elm$core$List$reverse(memo);
				} else {
					var x = list.a;
					var xs = list.b;
					if (predicate(x)) {
						var $temp$memo = A2($elm$core$List$cons, x, memo),
							$temp$list = xs;
						memo = $temp$memo;
						list = $temp$list;
						continue takeWhileMemo;
					} else {
						return $elm$core$List$reverse(memo);
					}
				}
			}
		});
	return takeWhileMemo(_List_Nil);
};
var $author$project$Main$eventsThisWeek = function (model) {
	var startOfWeek = $elm$time$Time$posixToMillis(
		A3($justinmimbs$time_extra$Time$Extra$floor, $justinmimbs$time_extra$Time$Extra$Week, model.currentZone, model.currentTime));
	return A2(
		$elm_community$list_extra$List$Extra$takeWhile,
		A2(
			$elm$core$Basics$composeR,
			$author$project$Main$eventMillis,
			$elm$core$Basics$lt(startOfWeek)),
		model.archive);
};
var $elm$time$Time$toWeekday = F2(
	function (zone, time) {
		var _v0 = A2(
			$elm$core$Basics$modBy,
			7,
			A2(
				$elm$time$Time$flooredDiv,
				A2($elm$time$Time$toAdjustedMinutes, zone, time),
				60 * 24));
		switch (_v0) {
			case 0:
				return $elm$time$Time$Thu;
			case 1:
				return $elm$time$Time$Fri;
			case 2:
				return $elm$time$Time$Sat;
			case 3:
				return $elm$time$Time$Sun;
			case 4:
				return $elm$time$Time$Mon;
			case 5:
				return $elm$time$Time$Tue;
			default:
				return $elm$time$Time$Wed;
		}
	});
var $author$project$Main$groupEvents = function (zone) {
	var insertEvent = F2(
		function (event, acc) {
			var day = {
				day: A2($elm$time$Time$toDay, zone, event.event.createdAt),
				month: A2($elm$time$Time$toMonth, zone, event.event.createdAt),
				weekday: A2($elm$time$Time$toWeekday, zone, event.event.createdAt),
				year: A2($elm$time$Time$toYear, zone, event.event.createdAt)
			};
			if (acc.b) {
				var _v1 = acc.a;
				var d = _v1.a;
				var es = _v1.b;
				var rest = acc.b;
				return _Utils_eq(d, day) ? A2(
					$elm$core$List$cons,
					_Utils_Tuple2(
						d,
						A2($elm$core$List$cons, event, es)),
					rest) : A2(
					$elm$core$List$cons,
					_Utils_Tuple2(
						day,
						_List_fromArray(
							[event])),
					acc);
			} else {
				return _List_fromArray(
					[
						_Utils_Tuple2(
						day,
						_List_fromArray(
							[event]))
					]);
			}
		});
	return A2($elm$core$List$foldr, insertEvent, _List_Nil);
};
var $capitalist$elm_octicons$Octicons$calendarPath = 'M13,2 L12,2 L12,3.5 C12,3.78 11.78,4 11.5,4 L9.5,4 C9.22,4 9,3.78 9,3.5 L9,2 L6,2 L6,3.5 C6,3.78 5.78,4 5.5,4 L3.5,4 C3.22,4 3,3.78 3,3.5 L3,2 L2,2 C1.45,2 1,2.45 1,3 L1,14 C1,14.55 1.45,15 2,15 L13,15 C13.55,15 14,14.55 14,14 L14,3 C14,2.45 13.55,2 13,2 L13,2 Z M13,14 L2,14 L2,5 L13,5 L13,14 L13,14 Z M5,3 L4,3 L4,1 L5,1 L5,3 L5,3 Z M11,3 L10,3 L10,1 L11,1 L11,3 L11,3 Z M6,7 L5,7 L5,6 L6,6 L6,7 L6,7 Z M8,7 L7,7 L7,6 L8,6 L8,7 L8,7 Z M10,7 L9,7 L9,6 L10,6 L10,7 L10,7 Z M12,7 L11,7 L11,6 L12,6 L12,7 L12,7 Z M4,9 L3,9 L3,8 L4,8 L4,9 L4,9 Z M6,9 L5,9 L5,8 L6,8 L6,9 L6,9 Z M8,9 L7,9 L7,8 L8,8 L8,9 L8,9 Z M10,9 L9,9 L9,8 L10,8 L10,9 L10,9 Z M12,9 L11,9 L11,8 L12,8 L12,9 L12,9 Z M4,11 L3,11 L3,10 L4,10 L4,11 L4,11 Z M6,11 L5,11 L5,10 L6,10 L6,11 L6,11 Z M8,11 L7,11 L7,10 L8,10 L8,11 L8,11 Z M10,11 L9,11 L9,10 L10,10 L10,11 L10,11 Z M12,11 L11,11 L11,10 L12,10 L12,11 L12,11 Z M4,13 L3,13 L3,12 L4,12 L4,13 L4,13 Z M6,13 L5,13 L5,12 L6,12 L6,13 L6,13 Z M8,13 L7,13 L7,12 L8,12 L8,13 L8,13 Z M10,13 L9,13 L9,12 L10,12 L10,13 L10,13 Z';
var $capitalist$elm_octicons$Octicons$calendar = A3($capitalist$elm_octicons$Octicons$pathIconWithOptions, $capitalist$elm_octicons$Octicons$calendarPath, '0 0 14 16', 'calendar');
var $ryannhg$date_format$DateFormat$AmPmUppercase = {$: 'AmPmUppercase'};
var $ryannhg$date_format$DateFormat$amPmUppercase = $ryannhg$date_format$DateFormat$AmPmUppercase;
var $ryannhg$date_format$DateFormat$HourNumber = {$: 'HourNumber'};
var $ryannhg$date_format$DateFormat$hourNumber = $ryannhg$date_format$DateFormat$HourNumber;
var $ryannhg$date_format$DateFormat$MinuteFixed = {$: 'MinuteFixed'};
var $ryannhg$date_format$DateFormat$minuteFixed = $ryannhg$date_format$DateFormat$MinuteFixed;
var $ryannhg$date_format$DateFormat$Text = function (a) {
	return {$: 'Text', a: a};
};
var $ryannhg$date_format$DateFormat$text = $ryannhg$date_format$DateFormat$Text;
var $author$project$Main$absoluteTime = _List_fromArray(
	[
		$ryannhg$date_format$DateFormat$hourNumber,
		$ryannhg$date_format$DateFormat$text(':'),
		$ryannhg$date_format$DateFormat$minuteFixed,
		$ryannhg$date_format$DateFormat$text(' '),
		$ryannhg$date_format$DateFormat$amPmUppercase
	]);
var $capitalist$elm_octicons$Octicons$commentPath = 'M14,1 L2,1 C1.45,1 1,1.45 1,2 L1,10 C1,10.55 1.45,11 2,11 L4,11 L4,14.5 L7.5,11 L14,11 C14.55,11 15,10.55 15,10 L15,2 C15,1.45 14.55,1 14,1 L14,1 Z M14,10 L7,10 L5,12 L5,10 L2,10 L2,2 L14,2 L14,10 L14,10 Z';
var $capitalist$elm_octicons$Octicons$comment = A3($capitalist$elm_octicons$Octicons$pathIconWithOptions, $capitalist$elm_octicons$Octicons$commentPath, '0 0 16 16', 'comment');
var $ryannhg$date_format$DateFormat$Language$Language = F6(
	function (toMonthName, toMonthAbbreviation, toWeekdayName, toWeekdayAbbreviation, toAmPm, toOrdinalSuffix) {
		return {toAmPm: toAmPm, toMonthAbbreviation: toMonthAbbreviation, toMonthName: toMonthName, toOrdinalSuffix: toOrdinalSuffix, toWeekdayAbbreviation: toWeekdayAbbreviation, toWeekdayName: toWeekdayName};
	});
var $ryannhg$date_format$DateFormat$Language$toEnglishAmPm = function (hour) {
	return (hour > 11) ? 'pm' : 'am';
};
var $ryannhg$date_format$DateFormat$Language$toEnglishMonthName = function (month) {
	switch (month.$) {
		case 'Jan':
			return 'January';
		case 'Feb':
			return 'February';
		case 'Mar':
			return 'March';
		case 'Apr':
			return 'April';
		case 'May':
			return 'May';
		case 'Jun':
			return 'June';
		case 'Jul':
			return 'July';
		case 'Aug':
			return 'August';
		case 'Sep':
			return 'September';
		case 'Oct':
			return 'October';
		case 'Nov':
			return 'November';
		default:
			return 'December';
	}
};
var $ryannhg$date_format$DateFormat$Language$toEnglishSuffix = function (num) {
	var _v0 = A2($elm$core$Basics$modBy, 100, num);
	switch (_v0) {
		case 11:
			return 'th';
		case 12:
			return 'th';
		case 13:
			return 'th';
		default:
			var _v1 = A2($elm$core$Basics$modBy, 10, num);
			switch (_v1) {
				case 1:
					return 'st';
				case 2:
					return 'nd';
				case 3:
					return 'rd';
				default:
					return 'th';
			}
	}
};
var $ryannhg$date_format$DateFormat$Language$toEnglishWeekdayName = function (weekday) {
	switch (weekday.$) {
		case 'Mon':
			return 'Monday';
		case 'Tue':
			return 'Tuesday';
		case 'Wed':
			return 'Wednesday';
		case 'Thu':
			return 'Thursday';
		case 'Fri':
			return 'Friday';
		case 'Sat':
			return 'Saturday';
		default:
			return 'Sunday';
	}
};
var $ryannhg$date_format$DateFormat$Language$english = A6(
	$ryannhg$date_format$DateFormat$Language$Language,
	$ryannhg$date_format$DateFormat$Language$toEnglishMonthName,
	A2(
		$elm$core$Basics$composeR,
		$ryannhg$date_format$DateFormat$Language$toEnglishMonthName,
		$elm$core$String$left(3)),
	$ryannhg$date_format$DateFormat$Language$toEnglishWeekdayName,
	A2(
		$elm$core$Basics$composeR,
		$ryannhg$date_format$DateFormat$Language$toEnglishWeekdayName,
		$elm$core$String$left(3)),
	$ryannhg$date_format$DateFormat$Language$toEnglishAmPm,
	$ryannhg$date_format$DateFormat$Language$toEnglishSuffix);
var $ryannhg$date_format$DateFormat$amPm = F3(
	function (language, zone, posix) {
		return language.toAmPm(
			A2($elm$time$Time$toHour, zone, posix));
	});
var $ryannhg$date_format$DateFormat$dayOfMonth = $elm$time$Time$toDay;
var $ryannhg$date_format$DateFormat$days = _List_fromArray(
	[$elm$time$Time$Sun, $elm$time$Time$Mon, $elm$time$Time$Tue, $elm$time$Time$Wed, $elm$time$Time$Thu, $elm$time$Time$Fri, $elm$time$Time$Sat]);
var $ryannhg$date_format$DateFormat$dayOfWeek = F2(
	function (zone, posix) {
		return function (_v1) {
			var i = _v1.a;
			return i;
		}(
			A2(
				$elm$core$Maybe$withDefault,
				_Utils_Tuple2(0, $elm$time$Time$Sun),
				$elm$core$List$head(
					A2(
						$elm$core$List$filter,
						function (_v0) {
							var day = _v0.b;
							return _Utils_eq(
								day,
								A2($elm$time$Time$toWeekday, zone, posix));
						},
						A2(
							$elm$core$List$indexedMap,
							F2(
								function (i, day) {
									return _Utils_Tuple2(i, day);
								}),
							$ryannhg$date_format$DateFormat$days)))));
	});
var $ryannhg$date_format$DateFormat$isLeapYear = function (year_) {
	return (!(!A2($elm$core$Basics$modBy, 4, year_))) ? false : ((!(!A2($elm$core$Basics$modBy, 100, year_))) ? true : ((!(!A2($elm$core$Basics$modBy, 400, year_))) ? false : true));
};
var $ryannhg$date_format$DateFormat$daysInMonth = F2(
	function (year_, month) {
		switch (month.$) {
			case 'Jan':
				return 31;
			case 'Feb':
				return $ryannhg$date_format$DateFormat$isLeapYear(year_) ? 29 : 28;
			case 'Mar':
				return 31;
			case 'Apr':
				return 30;
			case 'May':
				return 31;
			case 'Jun':
				return 30;
			case 'Jul':
				return 31;
			case 'Aug':
				return 31;
			case 'Sep':
				return 30;
			case 'Oct':
				return 31;
			case 'Nov':
				return 30;
			default:
				return 31;
		}
	});
var $ryannhg$date_format$DateFormat$months = _List_fromArray(
	[$elm$time$Time$Jan, $elm$time$Time$Feb, $elm$time$Time$Mar, $elm$time$Time$Apr, $elm$time$Time$May, $elm$time$Time$Jun, $elm$time$Time$Jul, $elm$time$Time$Aug, $elm$time$Time$Sep, $elm$time$Time$Oct, $elm$time$Time$Nov, $elm$time$Time$Dec]);
var $ryannhg$date_format$DateFormat$monthPair = F2(
	function (zone, posix) {
		return A2(
			$elm$core$Maybe$withDefault,
			_Utils_Tuple2(0, $elm$time$Time$Jan),
			$elm$core$List$head(
				A2(
					$elm$core$List$filter,
					function (_v0) {
						var i = _v0.a;
						var m = _v0.b;
						return _Utils_eq(
							m,
							A2($elm$time$Time$toMonth, zone, posix));
					},
					A2(
						$elm$core$List$indexedMap,
						F2(
							function (a, b) {
								return _Utils_Tuple2(a, b);
							}),
						$ryannhg$date_format$DateFormat$months))));
	});
var $ryannhg$date_format$DateFormat$monthNumber_ = F2(
	function (zone, posix) {
		return 1 + function (_v0) {
			var i = _v0.a;
			var m = _v0.b;
			return i;
		}(
			A2($ryannhg$date_format$DateFormat$monthPair, zone, posix));
	});
var $ryannhg$date_format$DateFormat$dayOfYear = F2(
	function (zone, posix) {
		var monthsBeforeThisOne = A2(
			$elm$core$List$take,
			A2($ryannhg$date_format$DateFormat$monthNumber_, zone, posix) - 1,
			$ryannhg$date_format$DateFormat$months);
		var daysBeforeThisMonth = $elm$core$List$sum(
			A2(
				$elm$core$List$map,
				$ryannhg$date_format$DateFormat$daysInMonth(
					A2($elm$time$Time$toYear, zone, posix)),
				monthsBeforeThisOne));
		return daysBeforeThisMonth + A2($ryannhg$date_format$DateFormat$dayOfMonth, zone, posix);
	});
var $ryannhg$date_format$DateFormat$quarter = F2(
	function (zone, posix) {
		return (A2($ryannhg$date_format$DateFormat$monthNumber_, zone, posix) / 4) | 0;
	});
var $elm$core$String$right = F2(
	function (n, string) {
		return (n < 1) ? '' : A3(
			$elm$core$String$slice,
			-n,
			$elm$core$String$length(string),
			string);
	});
var $ryannhg$date_format$DateFormat$toFixedLength = F2(
	function (totalChars, num) {
		var numStr = $elm$core$String$fromInt(num);
		var numZerosNeeded = totalChars - $elm$core$String$length(numStr);
		var zeros = A2(
			$elm$core$String$join,
			'',
			A2(
				$elm$core$List$map,
				function (_v0) {
					return '0';
				},
				A2($elm$core$List$range, 1, numZerosNeeded)));
		return _Utils_ap(zeros, numStr);
	});
var $ryannhg$date_format$DateFormat$toNonMilitary = function (num) {
	return (!num) ? 12 : ((num <= 12) ? num : (num - 12));
};
var $elm$core$String$toUpper = _String_toUpper;
var $ryannhg$date_format$DateFormat$millisecondsPerYear = $elm$core$Basics$round((((1000 * 60) * 60) * 24) * 365.25);
var $ryannhg$date_format$DateFormat$firstDayOfYear = F2(
	function (zone, time) {
		return $elm$time$Time$millisToPosix(
			$ryannhg$date_format$DateFormat$millisecondsPerYear * A2($elm$time$Time$toYear, zone, time));
	});
var $ryannhg$date_format$DateFormat$weekOfYear = F2(
	function (zone, posix) {
		var firstDay = A2($ryannhg$date_format$DateFormat$firstDayOfYear, zone, posix);
		var firstDayOffset = A2($ryannhg$date_format$DateFormat$dayOfWeek, zone, firstDay);
		var daysSoFar = A2($ryannhg$date_format$DateFormat$dayOfYear, zone, posix);
		return (((daysSoFar + firstDayOffset) / 7) | 0) + 1;
	});
var $ryannhg$date_format$DateFormat$year = F2(
	function (zone, time) {
		return $elm$core$String$fromInt(
			A2($elm$time$Time$toYear, zone, time));
	});
var $ryannhg$date_format$DateFormat$piece = F4(
	function (language, zone, posix, token) {
		switch (token.$) {
			case 'MonthNumber':
				return $elm$core$String$fromInt(
					A2($ryannhg$date_format$DateFormat$monthNumber_, zone, posix));
			case 'MonthSuffix':
				return function (num) {
					return _Utils_ap(
						$elm$core$String$fromInt(num),
						language.toOrdinalSuffix(num));
				}(
					A2($ryannhg$date_format$DateFormat$monthNumber_, zone, posix));
			case 'MonthFixed':
				return A2(
					$ryannhg$date_format$DateFormat$toFixedLength,
					2,
					A2($ryannhg$date_format$DateFormat$monthNumber_, zone, posix));
			case 'MonthNameAbbreviated':
				return language.toMonthAbbreviation(
					A2($elm$time$Time$toMonth, zone, posix));
			case 'MonthNameFull':
				return language.toMonthName(
					A2($elm$time$Time$toMonth, zone, posix));
			case 'QuarterNumber':
				return $elm$core$String$fromInt(
					1 + A2($ryannhg$date_format$DateFormat$quarter, zone, posix));
			case 'QuarterSuffix':
				return function (num) {
					return _Utils_ap(
						$elm$core$String$fromInt(num),
						language.toOrdinalSuffix(num));
				}(
					1 + A2($ryannhg$date_format$DateFormat$quarter, zone, posix));
			case 'DayOfMonthNumber':
				return $elm$core$String$fromInt(
					A2($ryannhg$date_format$DateFormat$dayOfMonth, zone, posix));
			case 'DayOfMonthSuffix':
				return function (num) {
					return _Utils_ap(
						$elm$core$String$fromInt(num),
						language.toOrdinalSuffix(num));
				}(
					A2($ryannhg$date_format$DateFormat$dayOfMonth, zone, posix));
			case 'DayOfMonthFixed':
				return A2(
					$ryannhg$date_format$DateFormat$toFixedLength,
					2,
					A2($ryannhg$date_format$DateFormat$dayOfMonth, zone, posix));
			case 'DayOfYearNumber':
				return $elm$core$String$fromInt(
					A2($ryannhg$date_format$DateFormat$dayOfYear, zone, posix));
			case 'DayOfYearSuffix':
				return function (num) {
					return _Utils_ap(
						$elm$core$String$fromInt(num),
						language.toOrdinalSuffix(num));
				}(
					A2($ryannhg$date_format$DateFormat$dayOfYear, zone, posix));
			case 'DayOfYearFixed':
				return A2(
					$ryannhg$date_format$DateFormat$toFixedLength,
					3,
					A2($ryannhg$date_format$DateFormat$dayOfYear, zone, posix));
			case 'DayOfWeekNumber':
				return $elm$core$String$fromInt(
					A2($ryannhg$date_format$DateFormat$dayOfWeek, zone, posix));
			case 'DayOfWeekSuffix':
				return function (num) {
					return _Utils_ap(
						$elm$core$String$fromInt(num),
						language.toOrdinalSuffix(num));
				}(
					A2($ryannhg$date_format$DateFormat$dayOfWeek, zone, posix));
			case 'DayOfWeekNameAbbreviated':
				return language.toWeekdayAbbreviation(
					A2($elm$time$Time$toWeekday, zone, posix));
			case 'DayOfWeekNameFull':
				return language.toWeekdayName(
					A2($elm$time$Time$toWeekday, zone, posix));
			case 'WeekOfYearNumber':
				return $elm$core$String$fromInt(
					A2($ryannhg$date_format$DateFormat$weekOfYear, zone, posix));
			case 'WeekOfYearSuffix':
				return function (num) {
					return _Utils_ap(
						$elm$core$String$fromInt(num),
						language.toOrdinalSuffix(num));
				}(
					A2($ryannhg$date_format$DateFormat$weekOfYear, zone, posix));
			case 'WeekOfYearFixed':
				return A2(
					$ryannhg$date_format$DateFormat$toFixedLength,
					2,
					A2($ryannhg$date_format$DateFormat$weekOfYear, zone, posix));
			case 'YearNumberLastTwo':
				return A2(
					$elm$core$String$right,
					2,
					A2($ryannhg$date_format$DateFormat$year, zone, posix));
			case 'YearNumber':
				return A2($ryannhg$date_format$DateFormat$year, zone, posix);
			case 'AmPmUppercase':
				return $elm$core$String$toUpper(
					A3($ryannhg$date_format$DateFormat$amPm, language, zone, posix));
			case 'AmPmLowercase':
				return $elm$core$String$toLower(
					A3($ryannhg$date_format$DateFormat$amPm, language, zone, posix));
			case 'HourMilitaryNumber':
				return $elm$core$String$fromInt(
					A2($elm$time$Time$toHour, zone, posix));
			case 'HourMilitaryFixed':
				return A2(
					$ryannhg$date_format$DateFormat$toFixedLength,
					2,
					A2($elm$time$Time$toHour, zone, posix));
			case 'HourNumber':
				return $elm$core$String$fromInt(
					$ryannhg$date_format$DateFormat$toNonMilitary(
						A2($elm$time$Time$toHour, zone, posix)));
			case 'HourFixed':
				return A2(
					$ryannhg$date_format$DateFormat$toFixedLength,
					2,
					$ryannhg$date_format$DateFormat$toNonMilitary(
						A2($elm$time$Time$toHour, zone, posix)));
			case 'HourMilitaryFromOneNumber':
				return $elm$core$String$fromInt(
					1 + A2($elm$time$Time$toHour, zone, posix));
			case 'HourMilitaryFromOneFixed':
				return A2(
					$ryannhg$date_format$DateFormat$toFixedLength,
					2,
					1 + A2($elm$time$Time$toHour, zone, posix));
			case 'MinuteNumber':
				return $elm$core$String$fromInt(
					A2($elm$time$Time$toMinute, zone, posix));
			case 'MinuteFixed':
				return A2(
					$ryannhg$date_format$DateFormat$toFixedLength,
					2,
					A2($elm$time$Time$toMinute, zone, posix));
			case 'SecondNumber':
				return $elm$core$String$fromInt(
					A2($elm$time$Time$toSecond, zone, posix));
			case 'SecondFixed':
				return A2(
					$ryannhg$date_format$DateFormat$toFixedLength,
					2,
					A2($elm$time$Time$toSecond, zone, posix));
			case 'MillisecondNumber':
				return $elm$core$String$fromInt(
					A2($elm$time$Time$toMillis, zone, posix));
			case 'MillisecondFixed':
				return A2(
					$ryannhg$date_format$DateFormat$toFixedLength,
					3,
					A2($elm$time$Time$toMillis, zone, posix));
			default:
				var string = token.a;
				return string;
		}
	});
var $ryannhg$date_format$DateFormat$formatWithLanguage = F4(
	function (language, tokens, zone, time) {
		return A2(
			$elm$core$String$join,
			'',
			A2(
				$elm$core$List$map,
				A3($ryannhg$date_format$DateFormat$piece, language, zone, time),
				tokens));
	});
var $ryannhg$date_format$DateFormat$format = $ryannhg$date_format$DateFormat$formatWithLanguage($ryannhg$date_format$DateFormat$Language$english);
var $capitalist$elm_octicons$Octicons$gitCommitPath = 'M10.86,7 C10.41,5.28 8.86,4 7,4 C5.14,4 3.59,5.28 3.14,7 L0,7 L0,9 L3.14,9 C3.59,10.72 5.14,12 7,12 C8.86,12 10.41,10.72 10.86,9 L14,9 L14,7 L10.86,7 L10.86,7 Z M7,10.2 C5.78,10.2 4.8,9.22 4.8,8 C4.8,6.78 5.78,5.8 7,5.8 C8.22,5.8 9.2,6.78 9.2,8 C9.2,9.22 8.22,10.2 7,10.2 L7,10.2 Z';
var $capitalist$elm_octicons$Octicons$gitCommit = A3($capitalist$elm_octicons$Octicons$pathIconWithOptions, $capitalist$elm_octicons$Octicons$gitCommitPath, '0 0 14 16', 'gitCommit');
var $author$project$Colors$gray500 = '#6a737d';
var $author$project$Colors$gray = $author$project$Colors$gray500;
var $author$project$Main$grayOpts = _Utils_update(
	$author$project$Main$octiconOpts,
	{color: $author$project$Colors$gray});
var $capitalist$elm_octicons$Octicons$replyPath = 'M6,3.5 C9.92,3.94 14,6.625 14,13.5 C11.688,8.438 9.25,7.5 6,7.5 L6,11 L0.5,5.5 L6,0 L6,3.5 Z';
var $capitalist$elm_octicons$Octicons$reply = A3($capitalist$elm_octicons$Octicons$pathIconWithOptions, $capitalist$elm_octicons$Octicons$replyPath, '0 0 14 16', 'reply');
var $elm$html$Html$Attributes$title = $elm$html$Html$Attributes$stringProperty('title');
var $author$project$Main$viewArchiveEvent = F2(
	function (model, _v0) {
		var cardId = _v0.cardId;
		var event = _v0.event;
		var _v1 = A2($elm$core$Dict$get, cardId, model.cards);
		if (_v1.$ === 'Nothing') {
			return $elm$html$Html$text('(card missing)');
		} else {
			var card = _v1.a;
			return A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('archive-event'),
						$elm$html$Html$Events$onClick(
						$author$project$Model$SelectCard(card.id))
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$a,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('archive-event-card-icon'),
								$elm$html$Html$Attributes$title(
								card.repo.owner + ('/' + (card.repo.name + (' #' + $elm$core$String$fromInt(card.number))))),
								$elm$html$Html$Attributes$target('_blank'),
								$elm$html$Html$Attributes$href(card.url)
							]),
						_List_fromArray(
							[
								$author$project$CardView$viewCardIcon(card)
							])),
						function () {
						var _v2 = event.event;
						switch (_v2) {
							case 'comment':
								return A2(
									$elm$html$Html$span,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('archive-event-icon')
										]),
									_List_fromArray(
										[
											$capitalist$elm_octicons$Octicons$reply($author$project$Main$grayOpts)
										]));
							case 'commit':
								return A2(
									$elm$html$Html$span,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('archive-event-icon')
										]),
									_List_fromArray(
										[
											$capitalist$elm_octicons$Octicons$gitCommit($author$project$Main$grayOpts)
										]));
							case 'review-pending':
								return A2(
									$elm$html$Html$span,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('archive-event-icon')
										]),
									_List_fromArray(
										[
											$capitalist$elm_octicons$Octicons$primitiveDot(
											_Utils_update(
												$author$project$Main$octiconOpts,
												{color: $author$project$Colors$yellow}))
										]));
							case 'review-comment':
								return A2(
									$elm$html$Html$span,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('archive-event-icon')
										]),
									_List_fromArray(
										[
											$capitalist$elm_octicons$Octicons$comment($author$project$Main$grayOpts)
										]));
							case 'review-approved':
								return A2(
									$elm$html$Html$span,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('archive-event-icon')
										]),
									_List_fromArray(
										[
											$capitalist$elm_octicons$Octicons$check(
											_Utils_update(
												$author$project$Main$octiconOpts,
												{color: $author$project$Colors$green}))
										]));
							case 'review-changes-requested':
								return A2(
									$elm$html$Html$span,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('archive-event-icon')
										]),
									_List_fromArray(
										[
											$capitalist$elm_octicons$Octicons$comment(
											_Utils_update(
												$author$project$Main$octiconOpts,
												{color: $author$project$Colors$red}))
										]));
							case 'review-dismissed':
								return A2(
									$elm$html$Html$span,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('archive-event-icon')
										]),
									_List_fromArray(
										[
											$capitalist$elm_octicons$Octicons$x($author$project$Main$grayOpts)
										]));
							default:
								return $elm$html$Html$text('');
						}
					}(),
						A2(
						$elm$html$Html$a,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('archive-event-title'),
								$elm$html$Html$Attributes$target('_blank'),
								$elm$html$Html$Attributes$href(event.url)
							]),
						_List_fromArray(
							[
								$elm$html$Html$text(card.title)
							])),
						$elm$html$Html$text(' '),
						A2(
						$elm$html$Html$span,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('archive-event-actor')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('by '),
								function () {
								var _v3 = event.user;
								if (_v3.$ === 'Just') {
									var user = _v3.a;
									return A2(
										$elm$html$Html$a,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('archive-event-user'),
												$elm$html$Html$Attributes$href(user.url)
											]),
										_List_fromArray(
											[
												$elm$html$Html$text(
												A2($elm$core$Maybe$withDefault, user.login, user.name))
											]));
								} else {
									return $elm$html$Html$text('');
								}
							}()
							])),
						A2(
						$elm$html$Html$span,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('archive-event-time')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text(
								A3($ryannhg$date_format$DateFormat$format, $author$project$Main$absoluteTime, model.currentZone, event.createdAt))
							]))
					]));
		}
	});
var $author$project$Main$viewMonth = function (month) {
	return $elm$html$Html$text(
		function () {
			switch (month.$) {
				case 'Jan':
					return 'January';
				case 'Feb':
					return 'February';
				case 'Mar':
					return 'March';
				case 'Apr':
					return 'April';
				case 'May':
					return 'May';
				case 'Jun':
					return 'June';
				case 'Jul':
					return 'July';
				case 'Aug':
					return 'August';
				case 'Sep':
					return 'September';
				case 'Oct':
					return 'October';
				case 'Nov':
					return 'November';
				default:
					return 'December';
			}
		}());
};
var $author$project$Main$viewArchiveDay = F3(
	function (model, _v0, events) {
		var year = _v0.year;
		var month = _v0.month;
		var day = _v0.day;
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('archive-day')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$span,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('column-title')
						]),
					_List_fromArray(
						[
							$capitalist$elm_octicons$Octicons$calendar($author$project$Main$octiconOpts),
							A2(
							$elm$html$Html$span,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('column-name')
								]),
							_List_fromArray(
								[
									$author$project$Main$viewMonth(month),
									$elm$html$Html$text(' '),
									$elm$html$Html$text(
									$elm$core$String$fromInt(day)),
									$elm$html$Html$text(', '),
									$elm$html$Html$text(
									$elm$core$String$fromInt(year))
								]))
						])),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('archive-events')
						]),
					A2(
						$elm$core$List$map,
						$author$project$Main$viewArchiveEvent(model),
						events))
				]));
	});
var $author$project$Main$viewArchivePage = function (model) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('page-content')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('page-header')
					]),
				_List_fromArray(
					[
						$capitalist$elm_octicons$Octicons$history($author$project$Main$octiconOpts),
						$elm$html$Html$text('Weekly Archive')
					])),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('archive-columns')
					]),
				A2(
					$elm$core$List$map,
					function (_v0) {
						var a = _v0.a;
						var b = _v0.b;
						return A3($author$project$Main$viewArchiveDay, model, a, b);
					},
					A2(
						$author$project$Main$groupEvents,
						model.currentZone,
						$author$project$Main$eventsThisWeek(model))))
			]));
};
var $author$project$StatefulGraph$graphId = function (graph) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, acc) {
				var card = _v0.card;
				return A2($elm$core$Basics$max, card.id, acc);
			}),
		'',
		graph.nodes);
};
var $elm$virtual_dom$VirtualDom$lazy = _VirtualDom_lazy;
var $elm$html$Html$Lazy$lazy = $elm$virtual_dom$VirtualDom$lazy;
var $elm$virtual_dom$VirtualDom$keyedNode = function (tag) {
	return _VirtualDom_keyedNode(
		_VirtualDom_noScript(tag));
};
var $elm$html$Html$Keyed$node = $elm$virtual_dom$VirtualDom$keyedNode;
var $elm$svg$Svg$g = $elm$svg$Svg$trustedNode('g');
var $elm$svg$Svg$line = $elm$svg$Svg$trustedNode('line');
var $elm$svg$Svg$Attributes$x1 = _VirtualDom_attribute('x1');
var $elm$svg$Svg$Attributes$x2 = _VirtualDom_attribute('x2');
var $elm$svg$Svg$Attributes$y1 = _VirtualDom_attribute('y1');
var $elm$svg$Svg$Attributes$y2 = _VirtualDom_attribute('y2');
var $author$project$StatefulGraph$linkPath = function (_v0) {
	var source = _v0.source;
	var target = _v0.target;
	var filteredOut = _v0.filteredOut;
	return A2(
		$elm$svg$Svg$line,
		_List_fromArray(
			[
				$elm$svg$Svg$Attributes$class('graph-edge'),
				filteredOut ? $elm$svg$Svg$Attributes$class('filtered-out') : $elm$svg$Svg$Attributes$class('filtered-in'),
				$elm$svg$Svg$Attributes$x1(
				$elm$core$String$fromFloat(source.x)),
				$elm$svg$Svg$Attributes$y1(
				$elm$core$String$fromFloat(source.y)),
				$elm$svg$Svg$Attributes$x2(
				$elm$core$String$fromFloat(target.x)),
				$elm$svg$Svg$Attributes$y2(
				$elm$core$String$fromFloat(target.y))
			]),
		_List_Nil);
};
var $elm$core$Basics$min = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) < 0) ? x : y;
	});
var $elm$virtual_dom$VirtualDom$keyedNodeNS = F2(
	function (namespace, tag) {
		return A2(
			_VirtualDom_keyedNodeNS,
			namespace,
			_VirtualDom_noScript(tag));
	});
var $elm$svg$Svg$Keyed$node = $elm$virtual_dom$VirtualDom$keyedNodeNS('http://www.w3.org/2000/svg');
var $author$project$StatefulGraph$flairRadiusBase = 20;
var $author$project$StatefulGraph$cardRadiusWithFlair = F2(
	function (card, mass) {
		var reactionCounts = A2(
			$elm$core$List$map,
			function ($) {
				return $.count;
			},
			card.reactions);
		var highestFlair = A3(
			$elm$core$List$foldl,
			F2(
				function (num, acc) {
					return A2($elm$core$Basics$max, num, acc);
				}),
			0,
			A2($elm$core$List$cons, card.commentCount, reactionCounts));
		return (mass + $author$project$StatefulGraph$flairRadiusBase) + highestFlair;
	});
var $elm$virtual_dom$VirtualDom$lazy4 = _VirtualDom_lazy4;
var $elm$svg$Svg$Lazy$lazy4 = $elm$virtual_dom$VirtualDom$lazy4;
var $author$project$Model$AnticipateCardFromNode = function (a) {
	return {$: 'AnticipateCardFromNode', a: a};
};
var $author$project$Model$UnanticipateCardFromNode = function (a) {
	return {$: 'UnanticipateCardFromNode', a: a};
};
var $elm$svg$Svg$Attributes$alignmentBaseline = _VirtualDom_attribute('alignment-baseline');
var $elm$core$Basics$abs = function (n) {
	return (n < 0) ? (-n) : n;
};
var $elm$core$Basics$acos = _Basics_acos;
var $folkertdev$one_true_path_experiment$LowLevel$Command$EllipticalArc = function (a) {
	return {$: 'EllipticalArc', a: a};
};
var $folkertdev$one_true_path_experiment$LowLevel$Command$arcTo = $folkertdev$one_true_path_experiment$LowLevel$Command$EllipticalArc;
var $folkertdev$svg_path_lowlevel$Path$LowLevel$LargestArc = {$: 'LargestArc'};
var $folkertdev$one_true_path_experiment$LowLevel$Command$largestArc = $folkertdev$svg_path_lowlevel$Path$LowLevel$LargestArc;
var $folkertdev$svg_path_lowlevel$Path$LowLevel$SmallestArc = {$: 'SmallestArc'};
var $folkertdev$one_true_path_experiment$LowLevel$Command$smallestArc = $folkertdev$svg_path_lowlevel$Path$LowLevel$SmallestArc;
var $gampleman$elm_visualization$Shape$Pie$boolToArc = function (b) {
	return b ? $folkertdev$one_true_path_experiment$LowLevel$Command$largestArc : $folkertdev$one_true_path_experiment$LowLevel$Command$smallestArc;
};
var $folkertdev$svg_path_lowlevel$Path$LowLevel$Clockwise = {$: 'Clockwise'};
var $folkertdev$one_true_path_experiment$LowLevel$Command$clockwise = $folkertdev$svg_path_lowlevel$Path$LowLevel$Clockwise;
var $folkertdev$svg_path_lowlevel$Path$LowLevel$CounterClockwise = {$: 'CounterClockwise'};
var $folkertdev$one_true_path_experiment$LowLevel$Command$counterClockwise = $folkertdev$svg_path_lowlevel$Path$LowLevel$CounterClockwise;
var $gampleman$elm_visualization$Shape$Pie$boolToDirection = function (b) {
	return b ? $folkertdev$one_true_path_experiment$LowLevel$Command$counterClockwise : $folkertdev$one_true_path_experiment$LowLevel$Command$clockwise;
};
var $elm$core$Basics$cos = _Basics_cos;
var $folkertdev$one_true_path_experiment$SubPath$Empty = {$: 'Empty'};
var $folkertdev$one_true_path_experiment$SubPath$empty = $folkertdev$one_true_path_experiment$SubPath$Empty;
var $gampleman$elm_visualization$Shape$Pie$epsilon = 1.0e-12;
var $elm$core$Basics$truncate = _Basics_truncate;
var $gampleman$elm_visualization$Shape$Pie$mod = F2(
	function (a, b) {
		var frac = a / b;
		return (frac - (frac | 0)) * b;
	});
var $folkertdev$one_true_path_experiment$LowLevel$Command$MoveTo = function (a) {
	return {$: 'MoveTo', a: a};
};
var $folkertdev$one_true_path_experiment$LowLevel$Command$moveTo = $folkertdev$one_true_path_experiment$LowLevel$Command$MoveTo;
var $elm$core$Basics$pi = _Basics_pi;
var $elm$core$Basics$sin = _Basics_sin;
var $folkertdev$one_true_path_experiment$SubPath$SubPath = function (a) {
	return {$: 'SubPath', a: a};
};
var $folkertdev$elm_deque$Deque$Deque = function (a) {
	return {$: 'Deque', a: a};
};
var $folkertdev$elm_deque$Internal$empty = {front: _List_Nil, rear: _List_Nil, sizeF: 0, sizeR: 0};
var $elm$core$List$drop = F2(
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
var $folkertdev$elm_deque$Internal$rebalance = function (deque) {
	var sizeF = deque.sizeF;
	var sizeR = deque.sizeR;
	var front = deque.front;
	var rear = deque.rear;
	var size1 = ((sizeF + sizeR) / 2) | 0;
	var size2 = (sizeF + sizeR) - size1;
	var balanceConstant = 4;
	if ((sizeF + sizeR) < 2) {
		return deque;
	} else {
		if (_Utils_cmp(sizeF, (balanceConstant * sizeR) + 1) > 0) {
			var newRear = _Utils_ap(
				rear,
				$elm$core$List$reverse(
					A2($elm$core$List$drop, size1, front)));
			var newFront = A2($elm$core$List$take, size1, front);
			return _Utils_update(
				deque,
				{front: newFront, rear: newRear, sizeF: size1, sizeR: size2});
		} else {
			if (_Utils_cmp(sizeR, (balanceConstant * sizeF) + 1) > 0) {
				var newRear = A2($elm$core$List$take, size1, rear);
				var newFront = _Utils_ap(
					front,
					$elm$core$List$reverse(
						A2($elm$core$List$drop, size1, rear)));
				return _Utils_update(
					deque,
					{front: newFront, rear: newRear, sizeF: size1, sizeR: size2});
			} else {
				return deque;
			}
		}
	}
};
var $folkertdev$elm_deque$Internal$fromList = function (list) {
	return $folkertdev$elm_deque$Internal$rebalance(
		_Utils_update(
			$folkertdev$elm_deque$Internal$empty,
			{
				front: list,
				sizeF: $elm$core$List$length(list)
			}));
};
var $folkertdev$elm_deque$Deque$fromList = A2($elm$core$Basics$composeL, $folkertdev$elm_deque$Deque$Deque, $folkertdev$elm_deque$Internal$fromList);
var $folkertdev$one_true_path_experiment$SubPath$with = F2(
	function (moveto, drawtos) {
		return $folkertdev$one_true_path_experiment$SubPath$SubPath(
			{
				drawtos: $folkertdev$elm_deque$Deque$fromList(drawtos),
				moveto: moveto
			});
	});
var $gampleman$elm_visualization$Shape$Pie$arc_ = F6(
	function (x, y, radius, a0, a1, ccw) {
		var tau = 2 * $elm$core$Basics$pi;
		var r = $elm$core$Basics$abs(radius);
		var dy = r * $elm$core$Basics$sin(a0);
		var y0_ = y + dy;
		var dx = r * $elm$core$Basics$cos(a0);
		var x0_ = x + dx;
		var origin = $folkertdev$one_true_path_experiment$LowLevel$Command$moveTo(
			_Utils_Tuple2(x0_, y0_));
		var da = ccw ? (a0 - a1) : (a1 - a0);
		var cw = $gampleman$elm_visualization$Shape$Pie$boolToDirection(!ccw);
		if (!r) {
			return $folkertdev$one_true_path_experiment$SubPath$empty;
		} else {
			if (_Utils_cmp(da, tau - $gampleman$elm_visualization$Shape$Pie$epsilon) > 0) {
				return A2(
					$folkertdev$one_true_path_experiment$SubPath$with,
					origin,
					_List_fromArray(
						[
							$folkertdev$one_true_path_experiment$LowLevel$Command$arcTo(
							_List_fromArray(
								[
									{
									arcFlag: $folkertdev$one_true_path_experiment$LowLevel$Command$largestArc,
									direction: cw,
									radii: _Utils_Tuple2(r, r),
									target: _Utils_Tuple2(x - dx, y - dy),
									xAxisRotate: 0
								}
								])),
							$folkertdev$one_true_path_experiment$LowLevel$Command$arcTo(
							_List_fromArray(
								[
									{
									arcFlag: $folkertdev$one_true_path_experiment$LowLevel$Command$largestArc,
									direction: cw,
									radii: _Utils_Tuple2(r, r),
									target: _Utils_Tuple2(x0_, y0_),
									xAxisRotate: 0
								}
								]))
						]));
			} else {
				var da_ = (da < 0) ? (A2($gampleman$elm_visualization$Shape$Pie$mod, da, tau) + tau) : da;
				return A2(
					$folkertdev$one_true_path_experiment$SubPath$with,
					origin,
					_List_fromArray(
						[
							$folkertdev$one_true_path_experiment$LowLevel$Command$arcTo(
							_List_fromArray(
								[
									{
									arcFlag: $gampleman$elm_visualization$Shape$Pie$boolToArc(
										_Utils_cmp(da_, $elm$core$Basics$pi) > -1),
									direction: cw,
									radii: _Utils_Tuple2(r, r),
									target: _Utils_Tuple2(
										x + (r * $elm$core$Basics$cos(a1)),
										y + (r * $elm$core$Basics$sin(a1))),
									xAxisRotate: 0
								}
								]))
						]));
			}
		}
	});
var $elm$core$Basics$atan2 = _Basics_atan2;
var $folkertdev$one_true_path_experiment$LowLevel$Command$ClosePath = {$: 'ClosePath'};
var $folkertdev$one_true_path_experiment$LowLevel$Command$closePath = $folkertdev$one_true_path_experiment$LowLevel$Command$ClosePath;
var $folkertdev$elm_deque$Internal$popBack = function (deque) {
	var front = deque.front;
	var rear = deque.rear;
	var _v0 = _Utils_Tuple2(front, rear);
	if (!_v0.b.b) {
		if (!_v0.a.b) {
			return _Utils_Tuple2($elm$core$Maybe$Nothing, $folkertdev$elm_deque$Internal$empty);
		} else {
			if (!_v0.a.b.b) {
				var _v1 = _v0.a;
				var x = _v1.a;
				return _Utils_Tuple2(
					$elm$core$Maybe$Just(x),
					$folkertdev$elm_deque$Internal$empty);
			} else {
				return _Utils_Tuple2($elm$core$Maybe$Nothing, $folkertdev$elm_deque$Internal$empty);
			}
		}
	} else {
		var _v2 = _v0.b;
		var r = _v2.a;
		var rs = _v2.b;
		return _Utils_Tuple2(
			$elm$core$Maybe$Just(r),
			$folkertdev$elm_deque$Internal$rebalance(
				_Utils_update(
					deque,
					{rear: rs, sizeR: deque.sizeR - 1})));
	}
};
var $folkertdev$elm_deque$Deque$unwrap = function (_v0) {
	var boundedDeque = _v0.a;
	return boundedDeque;
};
var $folkertdev$elm_deque$Deque$popBack = A2(
	$elm$core$Basics$composeL,
	A2(
		$elm$core$Basics$composeL,
		$elm$core$Tuple$mapSecond($folkertdev$elm_deque$Deque$Deque),
		$folkertdev$elm_deque$Internal$popBack),
	$folkertdev$elm_deque$Deque$unwrap);
var $folkertdev$elm_deque$Deque$mapAbstract = F2(
	function (f, _v0) {
		var _abstract = _v0.a;
		return $folkertdev$elm_deque$Deque$Deque(
			f(_abstract));
	});
var $folkertdev$elm_deque$Deque$pushBack = F2(
	function (elem, _v0) {
		var deque = _v0.a;
		return A2(
			$folkertdev$elm_deque$Deque$mapAbstract,
			$folkertdev$elm_deque$Internal$rebalance,
			$folkertdev$elm_deque$Deque$Deque(
				_Utils_update(
					deque,
					{
						rear: A2($elm$core$List$cons, elem, deque.rear),
						sizeR: deque.sizeR + 1
					})));
	});
var $folkertdev$one_true_path_experiment$SubPath$close = function (subpath) {
	if (subpath.$ === 'Empty') {
		return $folkertdev$one_true_path_experiment$SubPath$Empty;
	} else {
		var moveto = subpath.a.moveto;
		var drawtos = subpath.a.drawtos;
		var _v1 = $folkertdev$elm_deque$Deque$popBack(drawtos);
		if ((_v1.a.$ === 'Just') && (_v1.a.a.$ === 'ClosePath')) {
			var _v2 = _v1.a.a;
			var preceding = _v1.b;
			return subpath;
		} else {
			return $folkertdev$one_true_path_experiment$SubPath$SubPath(
				{
					drawtos: A2($folkertdev$elm_deque$Deque$pushBack, $folkertdev$one_true_path_experiment$LowLevel$Command$closePath, drawtos),
					moveto: moveto
				});
		}
	}
};
var $folkertdev$one_true_path_experiment$SubPath$firstPoint = function (_v0) {
	var moveto = _v0.moveto;
	var p = moveto.a;
	return p;
};
var $folkertdev$one_true_path_experiment$LowLevel$Command$LineTo = function (a) {
	return {$: 'LineTo', a: a};
};
var $folkertdev$one_true_path_experiment$LowLevel$Command$lineTo = $folkertdev$one_true_path_experiment$LowLevel$Command$LineTo;
var $folkertdev$one_true_path_experiment$SubPath$map2 = F3(
	function (f, sub1, sub2) {
		var _v0 = _Utils_Tuple2(sub1, sub2);
		if (_v0.a.$ === 'Empty') {
			if (_v0.b.$ === 'Empty') {
				var _v1 = _v0.a;
				var _v2 = _v0.b;
				return $folkertdev$one_true_path_experiment$SubPath$Empty;
			} else {
				var _v3 = _v0.a;
				var subpath = _v0.b;
				return subpath;
			}
		} else {
			if (_v0.b.$ === 'Empty') {
				var subpath = _v0.a;
				var _v4 = _v0.b;
				return subpath;
			} else {
				var a = _v0.a.a;
				var b = _v0.b.a;
				return A2(f, a, b);
			}
		}
	});
var $folkertdev$one_true_path_experiment$SubPath$pushBack = F2(
	function (drawto, data) {
		return _Utils_update(
			data,
			{
				drawtos: A2($folkertdev$elm_deque$Deque$pushBack, drawto, data.drawtos)
			});
	});
var $folkertdev$elm_deque$Internal$length = function (deque) {
	return deque.sizeF + deque.sizeR;
};
var $folkertdev$elm_deque$Internal$isEmpty = function (deque) {
	return !$folkertdev$elm_deque$Internal$length(deque);
};
var $folkertdev$elm_deque$Deque$isEmpty = A2($elm$core$Basics$composeL, $folkertdev$elm_deque$Internal$isEmpty, $folkertdev$elm_deque$Deque$unwrap);
var $folkertdev$elm_deque$Deque$append = F2(
	function (p, q) {
		var x = p.a;
		var y = q.a;
		return $folkertdev$elm_deque$Deque$isEmpty(p) ? q : ($folkertdev$elm_deque$Deque$isEmpty(q) ? p : $folkertdev$elm_deque$Deque$Deque(
			{
				front: _Utils_ap(
					x.front,
					$elm$core$List$reverse(x.rear)),
				rear: $elm$core$List$reverse(
					_Utils_ap(
						y.front,
						$elm$core$List$reverse(y.rear))),
				sizeF: x.sizeF + x.sizeR,
				sizeR: y.sizeF + y.sizeR
			}));
	});
var $folkertdev$one_true_path_experiment$SubPath$unsafeConcatenate = F2(
	function (a, b) {
		return _Utils_update(
			a,
			{
				drawtos: A2($folkertdev$elm_deque$Deque$append, a.drawtos, b.drawtos)
			});
	});
var $folkertdev$one_true_path_experiment$SubPath$connect = function () {
	var helper = F2(
		function (right, left) {
			return $folkertdev$one_true_path_experiment$SubPath$SubPath(
				A2(
					$folkertdev$one_true_path_experiment$SubPath$unsafeConcatenate,
					A2(
						$folkertdev$one_true_path_experiment$SubPath$pushBack,
						$folkertdev$one_true_path_experiment$LowLevel$Command$lineTo(
							_List_fromArray(
								[
									$folkertdev$one_true_path_experiment$SubPath$firstPoint(right)
								])),
						left),
					right));
		});
	return $folkertdev$one_true_path_experiment$SubPath$map2(helper);
}();
var $elm$core$Basics$pow = _Basics_pow;
var $elm$core$Basics$sqrt = _Basics_sqrt;
var $gampleman$elm_visualization$Shape$Pie$cornerTangents = F7(
	function (x0, y0, x1, y1, r1, rc, cw) {
		var y01 = y0 - y1;
		var x01 = x0 - x1;
		var r = r1 - rc;
		var lo = (cw ? rc : (-rc)) / $elm$core$Basics$sqrt(
			A2($elm$core$Basics$pow, x01, 2) + A2($elm$core$Basics$pow, y01, 2));
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
		var d2 = A2($elm$core$Basics$pow, dx, 2) + A2($elm$core$Basics$pow, dy, 2);
		var d = ((dy < 0) ? (-1) : 1) * $elm$core$Basics$sqrt(
			A2(
				$elm$core$Basics$max,
				0,
				(A2($elm$core$Basics$pow, r, 2) * d2) - A2($elm$core$Basics$pow, dd, 2)));
		var cy1 = (((-dd) * dx) + (dy * d)) / d2;
		var dy1 = cy1 - y00;
		var cy0 = (((-dd) * dx) - (dy * d)) / d2;
		var dy0 = cy0 - y00;
		var cx1 = ((dd * dy) + (dx * d)) / d2;
		var dx1 = cx1 - x00;
		var cx0 = ((dd * dy) - (dx * d)) / d2;
		var dx0 = cx0 - x00;
		var _v0 = (_Utils_cmp(
			A2($elm$core$Basics$pow, dx0, 2) + A2($elm$core$Basics$pow, dy0, 2),
			A2($elm$core$Basics$pow, dx1, 2) + A2($elm$core$Basics$pow, dy1, 2)) > 0) ? _Utils_Tuple2(cx1, cy1) : _Utils_Tuple2(cx0, cy0);
		var fcx = _v0.a;
		var fxy = _v0.b;
		return {cx: fcx, cy: fxy, x01: -ox, x11: fcx * ((r1 / r) - 1), y01: -oy, y11: fxy * ((r1 / r) - 1)};
	});
var $gampleman$elm_visualization$Shape$Pie$intersect = F8(
	function (x0, y0, x1, y1, x2, y2, x3, y3) {
		var y32 = y3 - y2;
		var y10 = y1 - y0;
		var x32 = x3 - x2;
		var x10 = x1 - x0;
		var t = ((x32 * (y0 - y2)) - (y32 * (x0 - x2))) / ((y32 * x10) - (x32 * y10));
		return _Utils_Tuple2(x0 + (t * x10), y0 + (t * y10));
	});
var $ianmackenzie$elm_geometry$Vector2d$components = function (_v0) {
	var components_ = _v0.a;
	return components_;
};
var $ianmackenzie$elm_geometry$Geometry$Types$Vector2d = function (a) {
	return {$: 'Vector2d', a: a};
};
var $ianmackenzie$elm_geometry$Vector2d$fromComponents = $ianmackenzie$elm_geometry$Geometry$Types$Vector2d;
var $ianmackenzie$elm_geometry$Vector2d$difference = F2(
	function (firstVector, secondVector) {
		var _v0 = $ianmackenzie$elm_geometry$Vector2d$components(secondVector);
		var x2 = _v0.a;
		var y2 = _v0.b;
		var _v1 = $ianmackenzie$elm_geometry$Vector2d$components(firstVector);
		var x1 = _v1.a;
		var y1 = _v1.b;
		return $ianmackenzie$elm_geometry$Vector2d$fromComponents(
			_Utils_Tuple2(x1 - x2, y1 - y2));
	});
var $folkertdev$elm_deque$Internal$foldl = F3(
	function (f, initial, deque) {
		return function (initial_) {
			return A3($elm$core$List$foldr, f, initial_, deque.rear);
		}(
			A3($elm$core$List$foldl, f, initial, deque.front));
	});
var $folkertdev$elm_deque$Deque$foldl = F2(
	function (f, initial) {
		return A2(
			$elm$core$Basics$composeL,
			A2($folkertdev$elm_deque$Internal$foldl, f, initial),
			$folkertdev$elm_deque$Deque$unwrap);
	});
var $elm_community$list_extra$List$Extra$last = function (items) {
	last:
	while (true) {
		if (!items.b) {
			return $elm$core$Maybe$Nothing;
		} else {
			if (!items.b.b) {
				var x = items.a;
				return $elm$core$Maybe$Just(x);
			} else {
				var rest = items.b;
				var $temp$items = rest;
				items = $temp$items;
				continue last;
			}
		}
	}
};
var $folkertdev$one_true_path_experiment$LowLevel$Command$updateCursorState = F2(
	function (drawto, state) {
		var noControlPoint = function (currentState) {
			return _Utils_update(
				currentState,
				{previousControlPoint: $elm$core$Maybe$Nothing});
		};
		var maybeUpdateCursor = function (coordinate) {
			return _Utils_update(
				state,
				{
					cursor: A2($elm$core$Maybe$withDefault, state.cursor, coordinate)
				});
		};
		var _v0 = state.cursor;
		var cursorX = _v0.a;
		var cursorY = _v0.b;
		switch (drawto.$) {
			case 'LineTo':
				var coordinates = drawto.a;
				return noControlPoint(
					maybeUpdateCursor(
						$elm_community$list_extra$List$Extra$last(coordinates)));
			case 'CurveTo':
				var coordinates = drawto.a;
				var _v2 = $elm_community$list_extra$List$Extra$last(coordinates);
				if (_v2.$ === 'Nothing') {
					return state;
				} else {
					var _v3 = _v2.a;
					var control1 = _v3.a;
					var control2 = _v3.b;
					var target = _v3.c;
					return _Utils_update(
						state,
						{
							cursor: target,
							previousControlPoint: $elm$core$Maybe$Just(control2)
						});
				}
			case 'QuadraticBezierCurveTo':
				var coordinates = drawto.a;
				var _v4 = $elm_community$list_extra$List$Extra$last(coordinates);
				if (_v4.$ === 'Nothing') {
					return state;
				} else {
					var _v5 = _v4.a;
					var control = _v5.a;
					var target = _v5.b;
					return _Utils_update(
						state,
						{
							cursor: target,
							previousControlPoint: $elm$core$Maybe$Just(control)
						});
				}
			case 'EllipticalArc':
				var _arguments = drawto.a;
				return noControlPoint(
					maybeUpdateCursor(
						A2(
							$elm$core$Maybe$map,
							function ($) {
								return $.target;
							},
							$elm_community$list_extra$List$Extra$last(_arguments))));
			default:
				return noControlPoint(state);
		}
	});
var $folkertdev$one_true_path_experiment$SubPath$finalCursorState = function (_v0) {
	var moveto = _v0.moveto;
	var drawtos = _v0.drawtos;
	var _v1 = moveto;
	var start = _v1.a;
	var initial = {cursor: start, previousControlPoint: $elm$core$Maybe$Nothing, start: start};
	return A3($folkertdev$elm_deque$Deque$foldl, $folkertdev$one_true_path_experiment$LowLevel$Command$updateCursorState, initial, drawtos);
};
var $folkertdev$one_true_path_experiment$SubPath$finalPoint = A2(
	$elm$core$Basics$composeR,
	$folkertdev$one_true_path_experiment$SubPath$finalCursorState,
	function ($) {
		return $.cursor;
	});
var $folkertdev$elm_deque$Internal$map = F2(
	function (f, deque) {
		return {
			front: A2($elm$core$List$map, f, deque.front),
			rear: A2($elm$core$List$map, f, deque.rear),
			sizeF: deque.sizeF,
			sizeR: deque.sizeR
		};
	});
var $folkertdev$elm_deque$Deque$map = function (f) {
	return $folkertdev$elm_deque$Deque$mapAbstract(
		$folkertdev$elm_deque$Internal$map(f));
};
var $folkertdev$one_true_path_experiment$LowLevel$Command$CurveTo = function (a) {
	return {$: 'CurveTo', a: a};
};
var $folkertdev$one_true_path_experiment$LowLevel$Command$QuadraticBezierCurveTo = function (a) {
	return {$: 'QuadraticBezierCurveTo', a: a};
};
var $folkertdev$one_true_path_experiment$LowLevel$Command$mapTuple2 = F2(
	function (f, _v0) {
		var a = _v0.a;
		var b = _v0.b;
		return _Utils_Tuple2(
			f(a),
			f(b));
	});
var $folkertdev$one_true_path_experiment$LowLevel$Command$mapTuple3 = F2(
	function (f, _v0) {
		var a = _v0.a;
		var b = _v0.b;
		var c = _v0.c;
		return _Utils_Tuple3(
			f(a),
			f(b),
			f(c));
	});
var $folkertdev$one_true_path_experiment$LowLevel$Command$mapCoordinateDrawTo = F2(
	function (f, drawto) {
		switch (drawto.$) {
			case 'LineTo':
				var coordinates = drawto.a;
				return $folkertdev$one_true_path_experiment$LowLevel$Command$LineTo(
					A2($elm$core$List$map, f, coordinates));
			case 'CurveTo':
				var coordinates = drawto.a;
				return $folkertdev$one_true_path_experiment$LowLevel$Command$CurveTo(
					A2(
						$elm$core$List$map,
						$folkertdev$one_true_path_experiment$LowLevel$Command$mapTuple3(f),
						coordinates));
			case 'QuadraticBezierCurveTo':
				var coordinates = drawto.a;
				return $folkertdev$one_true_path_experiment$LowLevel$Command$QuadraticBezierCurveTo(
					A2(
						$elm$core$List$map,
						$folkertdev$one_true_path_experiment$LowLevel$Command$mapTuple2(f),
						coordinates));
			case 'EllipticalArc':
				var _arguments = drawto.a;
				return $folkertdev$one_true_path_experiment$LowLevel$Command$EllipticalArc(
					A2(
						$elm$core$List$map,
						function (argument) {
							return _Utils_update(
								argument,
								{
									target: f(argument.target)
								});
						},
						_arguments));
			default:
				return $folkertdev$one_true_path_experiment$LowLevel$Command$ClosePath;
		}
	});
var $folkertdev$one_true_path_experiment$SubPath$mapCoordinateInstructions = F2(
	function (f, _v0) {
		var moveto = _v0.moveto;
		var drawtos = _v0.drawtos;
		var coordinate = moveto.a;
		return {
			drawtos: A2(
				$folkertdev$elm_deque$Deque$map,
				$folkertdev$one_true_path_experiment$LowLevel$Command$mapCoordinateDrawTo(f),
				drawtos),
			moveto: $folkertdev$one_true_path_experiment$LowLevel$Command$MoveTo(
				f(coordinate))
		};
	});
var $ianmackenzie$elm_geometry$Vector2d$sum = F2(
	function (firstVector, secondVector) {
		var _v0 = $ianmackenzie$elm_geometry$Vector2d$components(secondVector);
		var x2 = _v0.a;
		var y2 = _v0.b;
		var _v1 = $ianmackenzie$elm_geometry$Vector2d$components(firstVector);
		var x1 = _v1.a;
		var y1 = _v1.b;
		return $ianmackenzie$elm_geometry$Vector2d$fromComponents(
			_Utils_Tuple2(x1 + x2, y1 + y2));
	});
var $folkertdev$one_true_path_experiment$SubPath$continue = function () {
	var helper = F2(
		function (right, left) {
			var distance = A2(
				$ianmackenzie$elm_geometry$Vector2d$difference,
				$ianmackenzie$elm_geometry$Vector2d$fromComponents(
					$folkertdev$one_true_path_experiment$SubPath$finalPoint(left)),
				$ianmackenzie$elm_geometry$Vector2d$fromComponents(
					$folkertdev$one_true_path_experiment$SubPath$firstPoint(right)));
			var mapper = A2(
				$elm$core$Basics$composeL,
				A2(
					$elm$core$Basics$composeL,
					$ianmackenzie$elm_geometry$Vector2d$components,
					$ianmackenzie$elm_geometry$Vector2d$sum(distance)),
				$ianmackenzie$elm_geometry$Vector2d$fromComponents);
			return $folkertdev$one_true_path_experiment$SubPath$SubPath(
				A2(
					$folkertdev$one_true_path_experiment$SubPath$unsafeConcatenate,
					left,
					A2($folkertdev$one_true_path_experiment$SubPath$mapCoordinateInstructions, mapper, right)));
		});
	return $folkertdev$one_true_path_experiment$SubPath$map2(helper);
}();
var $gampleman$elm_visualization$Shape$Pie$makeArc = F6(
	function (x, y, radius, a0, a1, ccw) {
		return $folkertdev$one_true_path_experiment$SubPath$continue(
			A6($gampleman$elm_visualization$Shape$Pie$arc_, x, y, radius, a0, a1, ccw));
	});
var $elm$core$Basics$asin = _Basics_asin;
var $gampleman$elm_visualization$Shape$Pie$myAsin = function (x) {
	return (x >= 1) ? ($elm$core$Basics$pi / 2) : ((_Utils_cmp(x, -1) < 1) ? ((-$elm$core$Basics$pi) / 2) : $elm$core$Basics$asin(x));
};
var $gampleman$elm_visualization$Shape$Pie$arc = function (arcData) {
	var a1 = arcData.endAngle - ($elm$core$Basics$pi / 2);
	var a0 = arcData.startAngle - ($elm$core$Basics$pi / 2);
	var cw = _Utils_cmp(a1, a0) > 0;
	var da = $elm$core$Basics$abs(a1 - a0);
	var _v0 = (_Utils_cmp(arcData.innerRadius, arcData.outerRadius) > 0) ? _Utils_Tuple2(arcData.outerRadius, arcData.innerRadius) : _Utils_Tuple2(arcData.innerRadius, arcData.outerRadius);
	var r0 = _v0.a;
	var r1 = _v0.b;
	var path = function () {
		if (_Utils_cmp(r1, $gampleman$elm_visualization$Shape$Pie$epsilon) < 1) {
			return _List_fromArray(
				[
					$folkertdev$one_true_path_experiment$SubPath$close(
					A2(
						$folkertdev$one_true_path_experiment$SubPath$with,
						$folkertdev$one_true_path_experiment$LowLevel$Command$moveTo(
							_Utils_Tuple2(0, 0)),
						_List_Nil))
				]);
		} else {
			if (_Utils_cmp(da, (2 * $elm$core$Basics$pi) - $gampleman$elm_visualization$Shape$Pie$epsilon) > 0) {
				var p = A7(
					$gampleman$elm_visualization$Shape$Pie$makeArc,
					0,
					0,
					r1,
					a0,
					a1,
					!cw,
					A2(
						$folkertdev$one_true_path_experiment$SubPath$with,
						$folkertdev$one_true_path_experiment$LowLevel$Command$moveTo(
							_Utils_Tuple2(
								r1 * $elm$core$Basics$cos(a0),
								r1 * $elm$core$Basics$sin(a0))),
						_List_Nil));
				return (_Utils_cmp(r0, $gampleman$elm_visualization$Shape$Pie$epsilon) > 0) ? _List_fromArray(
					[
						p,
						$folkertdev$one_true_path_experiment$SubPath$close(
						A7(
							$gampleman$elm_visualization$Shape$Pie$makeArc,
							0,
							0,
							r0,
							a1,
							a0,
							cw,
							A2(
								$folkertdev$one_true_path_experiment$SubPath$with,
								$folkertdev$one_true_path_experiment$LowLevel$Command$moveTo(
									_Utils_Tuple2(
										r0 * $elm$core$Basics$cos(a1),
										r0 * $elm$core$Basics$sin(a1))),
								_List_Nil)))
					]) : _List_fromArray(
					[
						$folkertdev$one_true_path_experiment$SubPath$close(p)
					]);
			} else {
				var rc = A2(
					$elm$core$Basics$min,
					$elm$core$Basics$abs(r1 - r0) / 2,
					arcData.cornerRadius);
				var ap = arcData.padAngle / 2;
				var rp = (_Utils_cmp(ap, $gampleman$elm_visualization$Shape$Pie$epsilon) > 0) ? ((arcData.padRadius > 0) ? arcData.padRadius : $elm$core$Basics$sqrt(
					A2($elm$core$Basics$pow, r0, 2) + A2($elm$core$Basics$pow, r1, 2))) : 0;
				var p0 = $gampleman$elm_visualization$Shape$Pie$myAsin(
					(rp / r0) * $elm$core$Basics$sin(ap));
				var p1 = $gampleman$elm_visualization$Shape$Pie$myAsin(
					(rp / r1) * $elm$core$Basics$sin(ap));
				var _v1 = (_Utils_cmp(rp, $gampleman$elm_visualization$Shape$Pie$epsilon) > 0) ? ((_Utils_cmp(da - (p1 * 2), $gampleman$elm_visualization$Shape$Pie$epsilon) > 0) ? (cw ? _Utils_Tuple3(a0 + p1, a1 - p1, da - (p1 * 2)) : _Utils_Tuple3(a0 - p1, a1 + p1, da - (p1 * 2))) : _Utils_Tuple3((a0 + a1) / 2, (a0 + a1) / 2, 0)) : _Utils_Tuple3(a0, a1, da);
				var a01 = _v1.a;
				var a11 = _v1.b;
				var da1 = _v1.c;
				var x01 = r1 * $elm$core$Basics$cos(a01);
				var y01 = r1 * $elm$core$Basics$sin(a01);
				var x11 = r1 * $elm$core$Basics$cos(a11);
				var y11 = r1 * $elm$core$Basics$sin(a11);
				var _v2 = (_Utils_cmp(rp, $gampleman$elm_visualization$Shape$Pie$epsilon) > 0) ? ((_Utils_cmp(da - (p0 * 2), $gampleman$elm_visualization$Shape$Pie$epsilon) > 0) ? (cw ? _Utils_Tuple3(a0 + p0, a1 - p0, da - (p0 * 2)) : _Utils_Tuple3(a0 - p0, a1 + p0, da - (p0 * 2))) : _Utils_Tuple3((a0 + a1) / 2, (a0 + a1) / 2, 0)) : _Utils_Tuple3(a0, a1, da);
				var a00 = _v2.a;
				var a10 = _v2.b;
				var da0 = _v2.c;
				var x00 = r0 * $elm$core$Basics$cos(a00);
				var y00 = r0 * $elm$core$Basics$sin(a00);
				var x10 = r0 * $elm$core$Basics$cos(a10);
				var y10 = r0 * $elm$core$Basics$sin(a10);
				var _v3 = (_Utils_cmp(da0, $gampleman$elm_visualization$Shape$Pie$epsilon) > 0) ? A8($gampleman$elm_visualization$Shape$Pie$intersect, x01, y01, x00, y00, x11, y11, x10, y10) : _Utils_Tuple2(x10, y10);
				var ocx = _v3.a;
				var ocy = _v3.b;
				var lc = $elm$core$Basics$sqrt(
					A2($elm$core$Basics$pow, ocx, 2) + A2($elm$core$Basics$pow, ocy, 2));
				var _v4 = _Utils_Tuple2(x11 - ocx, y11 - ocy);
				var bx = _v4.a;
				var by = _v4.b;
				var _v5 = _Utils_Tuple2(x01 - ocx, y01 - ocy);
				var ax = _v5.a;
				var ay = _v5.b;
				var kc = 1 / $elm$core$Basics$sin(
					$elm$core$Basics$acos(
						((ax * bx) + (ay * by)) / ($elm$core$Basics$sqrt(
							A2($elm$core$Basics$pow, ax, 2) + A2($elm$core$Basics$pow, ay, 2)) * $elm$core$Basics$sqrt(
							A2($elm$core$Basics$pow, bx, 2) + A2($elm$core$Basics$pow, by, 2)))) / 2);
				var _v6 = ((_Utils_cmp(rc, $gampleman$elm_visualization$Shape$Pie$epsilon) > 0) && (_Utils_cmp(da, $elm$core$Basics$pi) < 0)) ? _Utils_Tuple2(
					A2($elm$core$Basics$min, rc, (r0 - lc) / (kc - 1)),
					A2($elm$core$Basics$min, rc, (r1 - lc) / (kc + 1))) : _Utils_Tuple2(rc, rc);
				var rc0 = _v6.a;
				var rc1 = _v6.b;
				var outerRing = function () {
					if (_Utils_cmp(da1, $gampleman$elm_visualization$Shape$Pie$epsilon) < 1) {
						return A2(
							$folkertdev$one_true_path_experiment$SubPath$with,
							$folkertdev$one_true_path_experiment$LowLevel$Command$moveTo(
								_Utils_Tuple2(x01, y01)),
							_List_Nil);
					} else {
						if (_Utils_cmp(rc1, $gampleman$elm_visualization$Shape$Pie$epsilon) > 0) {
							var t1 = A7($gampleman$elm_visualization$Shape$Pie$cornerTangents, x11, y11, x10, y10, r1, rc1, cw);
							var t0 = A7($gampleman$elm_visualization$Shape$Pie$cornerTangents, x00, y00, x01, y01, r1, rc1, cw);
							var p = A2(
								$folkertdev$one_true_path_experiment$SubPath$with,
								$folkertdev$one_true_path_experiment$LowLevel$Command$moveTo(
									_Utils_Tuple2(t0.cx + t0.x01, t0.cy + t0.y01)),
								_List_Nil);
							return (_Utils_cmp(rc1, rc) < 0) ? A7(
								$gampleman$elm_visualization$Shape$Pie$makeArc,
								t0.cx,
								t0.cy,
								rc1,
								A2($elm$core$Basics$atan2, t0.y01, t0.x01),
								A2($elm$core$Basics$atan2, t1.y01, t1.x01),
								!cw,
								p) : A7(
								$gampleman$elm_visualization$Shape$Pie$makeArc,
								t1.cx,
								t1.cy,
								rc1,
								A2($elm$core$Basics$atan2, t1.y11, t1.x11),
								A2($elm$core$Basics$atan2, t1.y01, t1.x01),
								!cw,
								A7(
									$gampleman$elm_visualization$Shape$Pie$makeArc,
									0,
									0,
									r1,
									A2($elm$core$Basics$atan2, t0.cy + t0.y11, t0.cx + t0.x11),
									A2($elm$core$Basics$atan2, t1.cy + t1.y11, t1.cx + t1.x11),
									!cw,
									A7(
										$gampleman$elm_visualization$Shape$Pie$makeArc,
										t0.cx,
										t0.cy,
										rc1,
										A2($elm$core$Basics$atan2, t0.y01, t0.x01),
										A2($elm$core$Basics$atan2, t0.y11, t0.x11),
										!cw,
										p)));
						} else {
							return A7(
								$gampleman$elm_visualization$Shape$Pie$makeArc,
								0,
								0,
								r1,
								a01,
								a11,
								!cw,
								A2(
									$folkertdev$one_true_path_experiment$SubPath$with,
									$folkertdev$one_true_path_experiment$LowLevel$Command$moveTo(
										_Utils_Tuple2(x01, y01)),
									_List_Nil));
						}
					}
				}();
				if ((_Utils_cmp(r0, $gampleman$elm_visualization$Shape$Pie$epsilon) < 1) || (_Utils_cmp(da0, $gampleman$elm_visualization$Shape$Pie$epsilon) < 1)) {
					return _List_fromArray(
						[
							$folkertdev$one_true_path_experiment$SubPath$close(
							A2(
								$folkertdev$one_true_path_experiment$SubPath$connect,
								A2(
									$folkertdev$one_true_path_experiment$SubPath$with,
									$folkertdev$one_true_path_experiment$LowLevel$Command$moveTo(
										_Utils_Tuple2(x10, y10)),
									_List_Nil),
								outerRing))
						]);
				} else {
					if (_Utils_cmp(rc0, $gampleman$elm_visualization$Shape$Pie$epsilon) > 0) {
						var t1 = A7($gampleman$elm_visualization$Shape$Pie$cornerTangents, x01, y01, x00, y00, r0, -rc0, cw);
						var t0 = A7($gampleman$elm_visualization$Shape$Pie$cornerTangents, x10, y10, x11, y11, r0, -rc0, cw);
						var p = A2(
							$folkertdev$one_true_path_experiment$SubPath$connect,
							A2(
								$folkertdev$one_true_path_experiment$SubPath$with,
								$folkertdev$one_true_path_experiment$LowLevel$Command$moveTo(
									_Utils_Tuple2(t0.cx + t0.x01, t0.cy + t0.y01)),
								_List_Nil),
							outerRing);
						return (_Utils_cmp(rc0, rc) < 0) ? _List_fromArray(
							[
								$folkertdev$one_true_path_experiment$SubPath$close(
								A7(
									$gampleman$elm_visualization$Shape$Pie$makeArc,
									t0.cx,
									t0.cy,
									rc0,
									A2($elm$core$Basics$atan2, t0.y01, t0.x01),
									A2($elm$core$Basics$atan2, t1.y01, t1.x01),
									!cw,
									p))
							]) : _List_fromArray(
							[
								$folkertdev$one_true_path_experiment$SubPath$close(
								A7(
									$gampleman$elm_visualization$Shape$Pie$makeArc,
									t1.cx,
									t1.cy,
									rc0,
									A2($elm$core$Basics$atan2, t1.y11, t1.x11),
									A2($elm$core$Basics$atan2, t1.y01, t1.x01),
									!cw,
									A7(
										$gampleman$elm_visualization$Shape$Pie$makeArc,
										0,
										0,
										r0,
										A2($elm$core$Basics$atan2, t0.cy + t0.y11, t0.cx + t0.x11),
										A2($elm$core$Basics$atan2, t1.cy + t1.y11, t1.cx + t1.x11),
										cw,
										A7(
											$gampleman$elm_visualization$Shape$Pie$makeArc,
											t0.cx,
											t0.cy,
											rc0,
											A2($elm$core$Basics$atan2, t0.y01, t0.x01),
											A2($elm$core$Basics$atan2, t0.y11, t0.x11),
											!cw,
											p))))
							]);
					} else {
						return _List_fromArray(
							[
								$folkertdev$one_true_path_experiment$SubPath$close(
								A2(
									$folkertdev$one_true_path_experiment$SubPath$connect,
									A6($gampleman$elm_visualization$Shape$Pie$arc_, 0, 0, r0, a10, a00, cw),
									outerRing))
							]);
					}
				}
			}
		}
	}();
	return path;
};
var $gampleman$elm_visualization$Shape$arc = $gampleman$elm_visualization$Shape$Pie$arc;
var $folkertdev$elm_deque$Deque$empty = $folkertdev$elm_deque$Deque$Deque($folkertdev$elm_deque$Internal$empty);
var $folkertdev$one_true_path_experiment$LowLevel$Command$merge = F2(
	function (instruction1, instruction2) {
		var _v0 = _Utils_Tuple2(instruction1, instruction2);
		_v0$5:
		while (true) {
			switch (_v0.a.$) {
				case 'LineTo':
					if (_v0.b.$ === 'LineTo') {
						var p1 = _v0.a.a;
						var p2 = _v0.b.a;
						return $elm$core$Result$Ok(
							$folkertdev$one_true_path_experiment$LowLevel$Command$LineTo(
								_Utils_ap(p1, p2)));
					} else {
						break _v0$5;
					}
				case 'CurveTo':
					if (_v0.b.$ === 'CurveTo') {
						var p1 = _v0.a.a;
						var p2 = _v0.b.a;
						return $elm$core$Result$Ok(
							$folkertdev$one_true_path_experiment$LowLevel$Command$CurveTo(
								_Utils_ap(p1, p2)));
					} else {
						break _v0$5;
					}
				case 'QuadraticBezierCurveTo':
					if (_v0.b.$ === 'QuadraticBezierCurveTo') {
						var p1 = _v0.a.a;
						var p2 = _v0.b.a;
						return $elm$core$Result$Ok(
							$folkertdev$one_true_path_experiment$LowLevel$Command$QuadraticBezierCurveTo(
								_Utils_ap(p1, p2)));
					} else {
						break _v0$5;
					}
				case 'EllipticalArc':
					if (_v0.b.$ === 'EllipticalArc') {
						var p1 = _v0.a.a;
						var p2 = _v0.b.a;
						return $elm$core$Result$Ok(
							$folkertdev$one_true_path_experiment$LowLevel$Command$EllipticalArc(
								_Utils_ap(p1, p2)));
					} else {
						break _v0$5;
					}
				default:
					if (_v0.b.$ === 'ClosePath') {
						var _v1 = _v0.a;
						var _v2 = _v0.b;
						return $elm$core$Result$Ok($folkertdev$one_true_path_experiment$LowLevel$Command$ClosePath);
					} else {
						break _v0$5;
					}
			}
		}
		return $elm$core$Result$Err(
			_Utils_Tuple2(instruction1, instruction2));
	});
var $folkertdev$elm_deque$Internal$toList = function (deque) {
	return _Utils_ap(
		deque.front,
		$elm$core$List$reverse(deque.rear));
};
var $folkertdev$elm_deque$Deque$toList = A2($elm$core$Basics$composeL, $folkertdev$elm_deque$Internal$toList, $folkertdev$elm_deque$Deque$unwrap);
var $folkertdev$one_true_path_experiment$SubPath$compressHelper = function (drawtos) {
	var folder = F2(
		function (instruction, _v3) {
			var previous = _v3.a;
			var accum = _v3.b;
			var _v2 = A2($folkertdev$one_true_path_experiment$LowLevel$Command$merge, previous, instruction);
			if (_v2.$ === 'Ok') {
				var merged = _v2.a;
				return _Utils_Tuple2(merged, accum);
			} else {
				return _Utils_Tuple2(
					instruction,
					A2($elm$core$List$cons, previous, accum));
			}
		});
	var _v0 = $folkertdev$elm_deque$Deque$toList(drawtos);
	if (!_v0.b) {
		return $folkertdev$elm_deque$Deque$empty;
	} else {
		var first = _v0.a;
		var rest = _v0.b;
		return $folkertdev$elm_deque$Deque$fromList(
			$elm$core$List$reverse(
				function (_v1) {
					var a = _v1.a;
					var b = _v1.b;
					return A2($elm$core$List$cons, a, b);
				}(
					A3(
						$elm$core$List$foldl,
						folder,
						_Utils_Tuple2(first, _List_Nil),
						rest))));
	}
};
var $folkertdev$one_true_path_experiment$SubPath$compress = function (subpath) {
	if (subpath.$ === 'Empty') {
		return $folkertdev$one_true_path_experiment$SubPath$Empty;
	} else {
		var data = subpath.a;
		return $folkertdev$one_true_path_experiment$SubPath$SubPath(
			_Utils_update(
				data,
				{
					drawtos: $folkertdev$one_true_path_experiment$SubPath$compressHelper(data.drawtos)
				}));
	}
};
var $folkertdev$svg_path_lowlevel$Path$LowLevel$DecimalPlaces = function (a) {
	return {$: 'DecimalPlaces', a: a};
};
var $folkertdev$svg_path_lowlevel$Path$LowLevel$decimalPlaces = $folkertdev$svg_path_lowlevel$Path$LowLevel$DecimalPlaces;
var $folkertdev$one_true_path_experiment$SubPath$defaultConfig = {decimalPlaces: $elm$core$Maybe$Nothing, mergeAdjacent: false};
var $folkertdev$one_true_path_experiment$SubPath$optionFolder = F2(
	function (option, config) {
		if (option.$ === 'DecimalPlaces') {
			var n = option.a;
			return _Utils_update(
				config,
				{
					decimalPlaces: $elm$core$Maybe$Just(n)
				});
		} else {
			return _Utils_update(
				config,
				{mergeAdjacent: true});
		}
	});
var $elm$core$List$singleton = function (value) {
	return _List_fromArray(
		[value]);
};
var $folkertdev$svg_path_lowlevel$Path$LowLevel$Absolute = {$: 'Absolute'};
var $folkertdev$svg_path_lowlevel$Path$LowLevel$ClosePath = {$: 'ClosePath'};
var $folkertdev$svg_path_lowlevel$Path$LowLevel$CurveTo = F2(
	function (a, b) {
		return {$: 'CurveTo', a: a, b: b};
	});
var $folkertdev$svg_path_lowlevel$Path$LowLevel$EllipticalArc = F2(
	function (a, b) {
		return {$: 'EllipticalArc', a: a, b: b};
	});
var $folkertdev$svg_path_lowlevel$Path$LowLevel$LineTo = F2(
	function (a, b) {
		return {$: 'LineTo', a: a, b: b};
	});
var $folkertdev$svg_path_lowlevel$Path$LowLevel$QuadraticBezierCurveTo = F2(
	function (a, b) {
		return {$: 'QuadraticBezierCurveTo', a: a, b: b};
	});
var $folkertdev$one_true_path_experiment$LowLevel$Command$toLowLevelDrawTo = function (drawto) {
	switch (drawto.$) {
		case 'LineTo':
			var coordinates = drawto.a;
			return A2($folkertdev$svg_path_lowlevel$Path$LowLevel$LineTo, $folkertdev$svg_path_lowlevel$Path$LowLevel$Absolute, coordinates);
		case 'CurveTo':
			var coordinates = drawto.a;
			return A2($folkertdev$svg_path_lowlevel$Path$LowLevel$CurveTo, $folkertdev$svg_path_lowlevel$Path$LowLevel$Absolute, coordinates);
		case 'QuadraticBezierCurveTo':
			var coordinates = drawto.a;
			return A2($folkertdev$svg_path_lowlevel$Path$LowLevel$QuadraticBezierCurveTo, $folkertdev$svg_path_lowlevel$Path$LowLevel$Absolute, coordinates);
		case 'EllipticalArc':
			var _arguments = drawto.a;
			return A2($folkertdev$svg_path_lowlevel$Path$LowLevel$EllipticalArc, $folkertdev$svg_path_lowlevel$Path$LowLevel$Absolute, _arguments);
		default:
			return $folkertdev$svg_path_lowlevel$Path$LowLevel$ClosePath;
	}
};
var $folkertdev$svg_path_lowlevel$Path$LowLevel$MoveTo = F2(
	function (a, b) {
		return {$: 'MoveTo', a: a, b: b};
	});
var $folkertdev$one_true_path_experiment$LowLevel$Command$toLowLevelMoveTo = function (_v0) {
	var target = _v0.a;
	return A2($folkertdev$svg_path_lowlevel$Path$LowLevel$MoveTo, $folkertdev$svg_path_lowlevel$Path$LowLevel$Absolute, target);
};
var $folkertdev$one_true_path_experiment$SubPath$toLowLevel = function (subpath) {
	if (subpath.$ === 'Empty') {
		return $elm$core$Maybe$Nothing;
	} else {
		var moveto = subpath.a.moveto;
		var drawtos = subpath.a.drawtos;
		return $elm$core$Maybe$Just(
			{
				drawtos: A2(
					$elm$core$List$map,
					$folkertdev$one_true_path_experiment$LowLevel$Command$toLowLevelDrawTo,
					$folkertdev$elm_deque$Deque$toList(drawtos)),
				moveto: $folkertdev$one_true_path_experiment$LowLevel$Command$toLowLevelMoveTo(moveto)
			});
	}
};
var $folkertdev$svg_path_lowlevel$Path$LowLevel$defaultConfig = {floatFormatter: $elm$core$String$fromFloat};
var $folkertdev$svg_path_lowlevel$Path$LowLevel$roundTo = F2(
	function (n, value) {
		if (!n) {
			return $elm$core$String$fromInt(
				$elm$core$Basics$round(value));
		} else {
			var sign = (value < 0.0) ? '-' : '';
			var exp = A2($elm$core$Basics$pow, 10, n);
			var raised = $elm$core$Basics$abs(
				$elm$core$Basics$round(value * exp));
			var decimals = raised % exp;
			return (!decimals) ? _Utils_ap(
				sign,
				$elm$core$String$fromInt((raised / exp) | 0)) : (sign + ($elm$core$String$fromInt((raised / exp) | 0) + ('.' + $elm$core$String$fromInt(decimals))));
		}
	});
var $folkertdev$svg_path_lowlevel$Path$LowLevel$optionFolder = F2(
	function (option, config) {
		var n = option.a;
		return _Utils_update(
			config,
			{
				floatFormatter: $folkertdev$svg_path_lowlevel$Path$LowLevel$roundTo(n)
			});
	});
var $folkertdev$svg_path_lowlevel$Path$LowLevel$accumulateOptions = A2($elm$core$List$foldl, $folkertdev$svg_path_lowlevel$Path$LowLevel$optionFolder, $folkertdev$svg_path_lowlevel$Path$LowLevel$defaultConfig);
var $folkertdev$svg_path_lowlevel$Path$LowLevel$isEmpty = function (command) {
	switch (command.$) {
		case 'LineTo':
			var mode = command.a;
			var coordinates = command.b;
			return $elm$core$List$isEmpty(coordinates);
		case 'Horizontal':
			var mode = command.a;
			var coordinates = command.b;
			return $elm$core$List$isEmpty(coordinates);
		case 'Vertical':
			var mode = command.a;
			var coordinates = command.b;
			return $elm$core$List$isEmpty(coordinates);
		case 'CurveTo':
			var mode = command.a;
			var coordinates = command.b;
			return $elm$core$List$isEmpty(coordinates);
		case 'SmoothCurveTo':
			var mode = command.a;
			var coordinates = command.b;
			return $elm$core$List$isEmpty(coordinates);
		case 'QuadraticBezierCurveTo':
			var mode = command.a;
			var coordinates = command.b;
			return $elm$core$List$isEmpty(coordinates);
		case 'SmoothQuadraticBezierCurveTo':
			var mode = command.a;
			var coordinates = command.b;
			return $elm$core$List$isEmpty(coordinates);
		case 'EllipticalArc':
			var mode = command.a;
			var _arguments = command.b;
			return $elm$core$List$isEmpty(_arguments);
		default:
			return false;
	}
};
var $elm$core$String$cons = _String_cons;
var $elm$core$String$fromChar = function (_char) {
	return A2($elm$core$String$cons, _char, '');
};
var $elm$core$Char$toLower = _Char_toLower;
var $elm$core$Char$toUpper = _Char_toUpper;
var $folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCharacter = F2(
	function (mode, character) {
		if (mode.$ === 'Absolute') {
			return $elm$core$String$fromChar(
				$elm$core$Char$toUpper(character));
		} else {
			return $elm$core$String$fromChar(
				$elm$core$Char$toLower(character));
		}
	});
var $folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCoordinate = F2(
	function (config, _v0) {
		var x = _v0.a;
		var y = _v0.b;
		return config.floatFormatter(x) + (',' + config.floatFormatter(y));
	});
var $folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCoordinate2 = F2(
	function (config, _v0) {
		var c1 = _v0.a;
		var c2 = _v0.b;
		return A2($folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCoordinate, config, c1) + (' ' + A2($folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCoordinate, config, c2));
	});
var $folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCoordinate3 = F2(
	function (config, _v0) {
		var c1 = _v0.a;
		var c2 = _v0.b;
		var c3 = _v0.c;
		return A2($folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCoordinate, config, c1) + (' ' + (A2($folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCoordinate, config, c2) + (' ' + A2($folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCoordinate, config, c3))));
	});
var $folkertdev$svg_path_lowlevel$Path$LowLevel$encodeFlags = function (_v0) {
	var arcFlag = _v0.a;
	var direction = _v0.b;
	var _v1 = _Utils_Tuple2(arcFlag, direction);
	if (_v1.a.$ === 'LargestArc') {
		if (_v1.b.$ === 'Clockwise') {
			var _v2 = _v1.a;
			var _v3 = _v1.b;
			return _Utils_Tuple2(1, 0);
		} else {
			var _v6 = _v1.a;
			var _v7 = _v1.b;
			return _Utils_Tuple2(1, 1);
		}
	} else {
		if (_v1.b.$ === 'Clockwise') {
			var _v4 = _v1.a;
			var _v5 = _v1.b;
			return _Utils_Tuple2(0, 0);
		} else {
			var _v8 = _v1.a;
			var _v9 = _v1.b;
			return _Utils_Tuple2(0, 1);
		}
	}
};
var $folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyEllipticalArcArgument = F2(
	function (config, _v0) {
		var radii = _v0.radii;
		var xAxisRotate = _v0.xAxisRotate;
		var arcFlag = _v0.arcFlag;
		var direction = _v0.direction;
		var target = _v0.target;
		var _v1 = $folkertdev$svg_path_lowlevel$Path$LowLevel$encodeFlags(
			_Utils_Tuple2(arcFlag, direction));
		var arc = _v1.a;
		var sweep = _v1.b;
		return A2(
			$elm$core$String$join,
			' ',
			_List_fromArray(
				[
					A2($folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCoordinate, config, radii),
					$elm$core$String$fromFloat(xAxisRotate),
					$elm$core$String$fromInt(arc),
					$elm$core$String$fromInt(sweep),
					A2($folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCoordinate, config, target)
				]));
	});
var $folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyDrawTo = F2(
	function (config, command) {
		if ($folkertdev$svg_path_lowlevel$Path$LowLevel$isEmpty(command)) {
			return '';
		} else {
			switch (command.$) {
				case 'LineTo':
					var mode = command.a;
					var coordinates = command.b;
					return _Utils_ap(
						A2(
							$folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCharacter,
							mode,
							_Utils_chr('L')),
						A2(
							$elm$core$String$join,
							' ',
							A2(
								$elm$core$List$map,
								$folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCoordinate(config),
								coordinates)));
				case 'Horizontal':
					var mode = command.a;
					var coordinates = command.b;
					return $elm$core$List$isEmpty(coordinates) ? '' : _Utils_ap(
						A2(
							$folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCharacter,
							mode,
							_Utils_chr('H')),
						A2(
							$elm$core$String$join,
							' ',
							A2($elm$core$List$map, $elm$core$String$fromFloat, coordinates)));
				case 'Vertical':
					var mode = command.a;
					var coordinates = command.b;
					return _Utils_ap(
						A2(
							$folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCharacter,
							mode,
							_Utils_chr('V')),
						A2(
							$elm$core$String$join,
							' ',
							A2($elm$core$List$map, $elm$core$String$fromFloat, coordinates)));
				case 'CurveTo':
					var mode = command.a;
					var coordinates = command.b;
					return _Utils_ap(
						A2(
							$folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCharacter,
							mode,
							_Utils_chr('C')),
						A2(
							$elm$core$String$join,
							' ',
							A2(
								$elm$core$List$map,
								$folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCoordinate3(config),
								coordinates)));
				case 'SmoothCurveTo':
					var mode = command.a;
					var coordinates = command.b;
					return _Utils_ap(
						A2(
							$folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCharacter,
							mode,
							_Utils_chr('S')),
						A2(
							$elm$core$String$join,
							' ',
							A2(
								$elm$core$List$map,
								$folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCoordinate2(config),
								coordinates)));
				case 'QuadraticBezierCurveTo':
					var mode = command.a;
					var coordinates = command.b;
					return _Utils_ap(
						A2(
							$folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCharacter,
							mode,
							_Utils_chr('Q')),
						A2(
							$elm$core$String$join,
							' ',
							A2(
								$elm$core$List$map,
								$folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCoordinate2(config),
								coordinates)));
				case 'SmoothQuadraticBezierCurveTo':
					var mode = command.a;
					var coordinates = command.b;
					return _Utils_ap(
						A2(
							$folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCharacter,
							mode,
							_Utils_chr('T')),
						A2(
							$elm$core$String$join,
							' ',
							A2(
								$elm$core$List$map,
								$folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCoordinate(config),
								coordinates)));
				case 'EllipticalArc':
					var mode = command.a;
					var _arguments = command.b;
					return _Utils_ap(
						A2(
							$folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCharacter,
							mode,
							_Utils_chr('A')),
						A2(
							$elm$core$String$join,
							' ',
							A2(
								$elm$core$List$map,
								$folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyEllipticalArcArgument(config),
								_arguments)));
				default:
					return 'Z';
			}
		}
	});
var $folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyMoveTo = F2(
	function (config, _v0) {
		var mode = _v0.a;
		var coordinate = _v0.b;
		if (mode.$ === 'Absolute') {
			return 'M' + A2($folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCoordinate, config, coordinate);
		} else {
			return 'm' + A2($folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCoordinate, config, coordinate);
		}
	});
var $folkertdev$svg_path_lowlevel$Path$LowLevel$toStringSubPath = F2(
	function (config, _v0) {
		var moveto = _v0.moveto;
		var drawtos = _v0.drawtos;
		return A2($folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyMoveTo, config, moveto) + (' ' + A2(
			$elm$core$String$join,
			' ',
			A2(
				$elm$core$List$map,
				$folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyDrawTo(config),
				drawtos)));
	});
var $folkertdev$svg_path_lowlevel$Path$LowLevel$toStringWith = F2(
	function (options, subpaths) {
		var config = $folkertdev$svg_path_lowlevel$Path$LowLevel$accumulateOptions(options);
		return A2(
			$elm$core$String$join,
			' ',
			A2(
				$elm$core$List$map,
				$folkertdev$svg_path_lowlevel$Path$LowLevel$toStringSubPath(config),
				subpaths));
	});
var $folkertdev$one_true_path_experiment$SubPath$toStringWith = F2(
	function (options, subpath) {
		var config = A3($elm$core$List$foldl, $folkertdev$one_true_path_experiment$SubPath$optionFolder, $folkertdev$one_true_path_experiment$SubPath$defaultConfig, options);
		var lowLevelOptions = function () {
			var _v0 = config.decimalPlaces;
			if (_v0.$ === 'Nothing') {
				return _List_Nil;
			} else {
				var n = _v0.a;
				return _List_fromArray(
					[
						$folkertdev$svg_path_lowlevel$Path$LowLevel$decimalPlaces(n)
					]);
			}
		}();
		return A2(
			$elm$core$Maybe$withDefault,
			'',
			A2(
				$elm$core$Maybe$map,
				A2(
					$elm$core$Basics$composeL,
					$folkertdev$svg_path_lowlevel$Path$LowLevel$toStringWith(lowLevelOptions),
					$elm$core$List$singleton),
				$folkertdev$one_true_path_experiment$SubPath$toLowLevel(
					(config.mergeAdjacent ? $folkertdev$one_true_path_experiment$SubPath$compress : $elm$core$Basics$identity)(subpath))));
	});
var $folkertdev$one_true_path_experiment$SubPath$toString = function (subpath) {
	return A2($folkertdev$one_true_path_experiment$SubPath$toStringWith, _List_Nil, subpath);
};
var $folkertdev$one_true_path_experiment$Path$toString = A2(
	$elm$core$Basics$composeL,
	$elm$core$String$join(' '),
	$elm$core$List$map($folkertdev$one_true_path_experiment$SubPath$toString));
var $folkertdev$one_true_path_experiment$Path$element = F2(
	function (path, attributes) {
		return A2(
			$elm$svg$Svg$path,
			A2(
				$elm$core$List$cons,
				$elm$svg$Svg$Attributes$d(
					$folkertdev$one_true_path_experiment$Path$toString(path)),
				attributes),
			_List_Nil);
	});
var $elm$core$Array$fromListHelp = F3(
	function (list, nodeList, nodeListSize) {
		fromListHelp:
		while (true) {
			var _v0 = A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, list);
			var jsArray = _v0.a;
			var remainingItems = _v0.b;
			if (_Utils_cmp(
				$elm$core$Elm$JsArray$length(jsArray),
				$elm$core$Array$branchFactor) < 0) {
				return A2(
					$elm$core$Array$builderToArray,
					true,
					{nodeList: nodeList, nodeListSize: nodeListSize, tail: jsArray});
			} else {
				var $temp$list = remainingItems,
					$temp$nodeList = A2(
					$elm$core$List$cons,
					$elm$core$Array$Leaf(jsArray),
					nodeList),
					$temp$nodeListSize = nodeListSize + 1;
				list = $temp$list;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue fromListHelp;
			}
		}
	});
var $elm$core$Array$fromList = function (list) {
	if (!list.b) {
		return $elm$core$Array$empty;
	} else {
		return A3($elm$core$Array$fromListHelp, list, _List_Nil, 0);
	}
};
var $elm$core$Array$bitMask = 4294967295 >>> (32 - $elm$core$Array$shiftStep);
var $elm$core$Elm$JsArray$unsafeGet = _JsArray_unsafeGet;
var $elm$core$Array$getHelp = F3(
	function (shift, index, tree) {
		getHelp:
		while (true) {
			var pos = $elm$core$Array$bitMask & (index >>> shift);
			var _v0 = A2($elm$core$Elm$JsArray$unsafeGet, pos, tree);
			if (_v0.$ === 'SubTree') {
				var subTree = _v0.a;
				var $temp$shift = shift - $elm$core$Array$shiftStep,
					$temp$index = index,
					$temp$tree = subTree;
				shift = $temp$shift;
				index = $temp$index;
				tree = $temp$tree;
				continue getHelp;
			} else {
				var values = _v0.a;
				return A2($elm$core$Elm$JsArray$unsafeGet, $elm$core$Array$bitMask & index, values);
			}
		}
	});
var $elm$core$Bitwise$shiftLeftBy = _Bitwise_shiftLeftBy;
var $elm$core$Array$tailIndex = function (len) {
	return (len >>> 5) << 5;
};
var $elm$core$Array$get = F2(
	function (index, _v0) {
		var len = _v0.a;
		var startShift = _v0.b;
		var tree = _v0.c;
		var tail = _v0.d;
		return ((index < 0) || (_Utils_cmp(index, len) > -1)) ? $elm$core$Maybe$Nothing : ((_Utils_cmp(
			index,
			$elm$core$Array$tailIndex(len)) > -1) ? $elm$core$Maybe$Just(
			A2($elm$core$Elm$JsArray$unsafeGet, $elm$core$Array$bitMask & index, tail)) : $elm$core$Maybe$Just(
			A3($elm$core$Array$getHelp, startShift, index, tree)));
	});
var $gampleman$elm_visualization$Shape$Pie$pie = F2(
	function (settings, data) {
		var unsafeGet = F2(
			function (index, array) {
				unsafeGet:
				while (true) {
					var _v0 = A2($elm$core$Array$get, index, array);
					if (_v0.$ === 'Just') {
						var v = _v0.a;
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
				var v = settings.valueFn(a);
				return (v > 0) ? (v + b) : b;
			});
		var sum = A3($elm$core$List$foldr, summer, 0, data);
		var sortedIndices = A2(
			$elm$core$Basics$composeL,
			A2(
				$elm$core$Basics$composeL,
				$elm$core$List$map($elm$core$Tuple$first),
				$elm$core$List$sortWith(
					F2(
						function (_v2, _v3) {
							var a = _v2.b;
							var b = _v3.b;
							return A2(settings.sortingFn, a, b);
						}))),
			$elm$core$List$indexedMap($elm$core$Tuple$pair));
		var dataArray = $elm$core$Array$fromList(data);
		var da = A2(
			$elm$core$Basics$min,
			2 * $elm$core$Basics$pi,
			A2($elm$core$Basics$max, (-2) * $elm$core$Basics$pi, settings.endAngle - settings.startAngle));
		var p = A2(
			$elm$core$Basics$min,
			$elm$core$Basics$abs(da) / $elm$core$List$length(data),
			settings.padAngle);
		var pa = p * ((da < 0) ? (-1) : 1);
		var k = (!sum) ? 0 : ((da - ($elm$core$List$length(data) * pa)) / sum);
		var computeValue = F2(
			function (el, angle) {
				var value = settings.valueFn(el);
				return {
					cornerRadius: settings.cornerRadius,
					endAngle: (angle + ((value > 0) ? (value * k) : 0)) + pa,
					innerRadius: settings.innerRadius,
					outerRadius: settings.outerRadius,
					padAngle: p,
					padRadius: settings.padRadius,
					startAngle: angle
				};
			});
		var helper = F2(
			function (index, _v1) {
				var angle = _v1.a;
				var result = _v1.b;
				var r = A2(
					computeValue,
					A2(unsafeGet, index, dataArray),
					angle);
				return _Utils_Tuple2(
					r.endAngle,
					A3($elm$core$Dict$insert, index, r, result));
			});
		return $elm$core$Dict$values(
			A3(
				$elm$core$List$foldl,
				helper,
				_Utils_Tuple2(settings.startAngle, $elm$core$Dict$empty),
				sortedIndices(data)).b);
	});
var $gampleman$elm_visualization$Shape$pie = $gampleman$elm_visualization$Shape$Pie$pie;
var $elm$core$List$repeatHelp = F3(
	function (result, n, value) {
		repeatHelp:
		while (true) {
			if (n <= 0) {
				return result;
			} else {
				var $temp$result = A2($elm$core$List$cons, value, result),
					$temp$n = n - 1,
					$temp$value = value;
				result = $temp$result;
				n = $temp$n;
				value = $temp$value;
				continue repeatHelp;
			}
		}
	});
var $elm$core$List$repeat = F2(
	function (n, value) {
		return A3($elm$core$List$repeatHelp, _List_Nil, n, value);
	});
var $author$project$StatefulGraph$cardLabelArcs = F3(
	function (allLabels, card, radius) {
		var labelSegments = A2(
			$gampleman$elm_visualization$Shape$pie,
			{
				cornerRadius: 0,
				endAngle: 2 * $elm$core$Basics$pi,
				innerRadius: radius,
				outerRadius: radius + 3,
				padAngle: 0,
				padRadius: 0,
				sortingFn: F2(
					function (_v0, _v1) {
						return $elm$core$Basics$EQ;
					}),
				startAngle: 0,
				valueFn: $elm$core$Basics$always(1.0)
			},
			A2(
				$elm$core$List$repeat,
				$elm$core$List$length(card.labels),
				1));
		return A3(
			$elm$core$List$map2,
			F2(
				function (arc, label) {
					return A2(
						$folkertdev$one_true_path_experiment$Path$element,
						$gampleman$elm_visualization$Shape$arc(arc),
						_List_fromArray(
							[
								$elm$svg$Svg$Attributes$fill('#' + label.color),
								$elm$svg$Svg$Attributes$class('label-arc')
							]));
				}),
			labelSegments,
			A2(
				$elm$core$List$filterMap,
				function (a) {
					return A2($elm$core$Dict$get, a, allLabels);
				},
				card.labels));
	});
var $elm$svg$Svg$circle = $elm$svg$Svg$trustedNode('circle');
var $author$project$Card$isBacklog = function (card) {
	return card.processState.inBacklogColumn;
};
var $author$project$Card$isIcebox = function (card) {
	return card.processState.inIceboxColumn;
};
var $elm$svg$Svg$Events$onClick = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'click',
		$elm$json$Json$Decode$succeed(msg));
};
var $elm$svg$Svg$Events$onMouseOut = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'mouseout',
		$elm$json$Json$Decode$succeed(msg));
};
var $elm$svg$Svg$Events$onMouseOver = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'mouseover',
		$elm$json$Json$Decode$succeed(msg));
};
var $elm$svg$Svg$Attributes$r = _VirtualDom_attribute('r');
var $elm$svg$Svg$text = $elm$virtual_dom$VirtualDom$text;
var $elm$svg$Svg$Attributes$textAnchor = _VirtualDom_attribute('text-anchor');
var $elm$svg$Svg$text_ = $elm$svg$Svg$trustedNode('text');
var $elm$svg$Svg$Attributes$transform = _VirtualDom_attribute('transform');
var $author$project$StatefulGraph$viewCardCircle = F4(
	function (node, labels, isHighlighted, isSelected) {
		var scale = isHighlighted ? '1.1' : (node.filteredOut ? '0.5' : '1');
		var radii = {
			base: node.mass,
			withFlair: A2($author$project$StatefulGraph$cardRadiusWithFlair, node.card, node.mass),
			withoutFlair: node.mass
		};
		var labelArcs = A3($author$project$StatefulGraph$cardLabelArcs, labels, node.card, node.mass);
		var circle = A2(
			$elm$svg$Svg$g,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					$elm$svg$Svg$circle,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$r(
							$elm$core$String$fromFloat(radii.base)),
							$elm$svg$Svg$Attributes$fill('#fff')
						]),
					_List_Nil),
					A2(
					$elm$svg$Svg$text_,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$textAnchor('middle'),
							$elm$svg$Svg$Attributes$alignmentBaseline('middle'),
							$elm$svg$Svg$Attributes$class('issue-number')
						]),
					_List_fromArray(
						[
							$elm$svg$Svg$text(
							'#' + $elm$core$String$fromInt(node.card.number))
						]))
				]));
		var card = node.card;
		return A2(
			$elm$svg$Svg$g,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$transform(
					'translate(' + ($elm$core$String$fromFloat(node.x) + (',' + ($elm$core$String$fromFloat(node.y) + (') scale(' + (scale + ')')))))),
					$author$project$Card$isInFlight(card) ? $elm$svg$Svg$Attributes$class('in-flight') : ($author$project$Card$isDone(card) ? $elm$svg$Svg$Attributes$class('done') : ($author$project$Card$isIcebox(card) ? $elm$svg$Svg$Attributes$class('icebox') : ($author$project$Card$isBacklog(card) ? $elm$svg$Svg$Attributes$class('backlog') : $elm$svg$Svg$Attributes$class('untriaged')))),
					node.filteredOut ? $elm$svg$Svg$Attributes$class('filtered-out') : $elm$svg$Svg$Attributes$class('filtered-in'),
					$elm$svg$Svg$Events$onMouseOver(
					$author$project$Model$AnticipateCardFromNode(card.id)),
					$elm$svg$Svg$Events$onMouseOut(
					$author$project$Model$UnanticipateCardFromNode(card.id)),
					$elm$svg$Svg$Events$onClick(
					isSelected ? $author$project$Model$DeselectCard(card.id) : $author$project$Model$SelectCard(card.id))
				]),
			A2($elm$core$List$cons, circle, labelArcs));
	});
var $author$project$StatefulGraph$emptyArc = {cornerRadius: 0, endAngle: 0, innerRadius: 0, outerRadius: 0, padAngle: 0, padRadius: 0, startAngle: 0};
var $elm$svg$Svg$foreignObject = $elm$svg$Svg$trustedNode('foreignObject');
var $author$project$StatefulGraph$octiconOpts = $capitalist$elm_octicons$Octicons$defaultOptions;
var $author$project$StatefulGraph$reactionFlairArcs = F3(
	function (reviews, card, radius) {
		var reactionTypeEmoji = function (type_) {
			switch (type_.$) {
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
				case 'ReactionTypeHooray':
					return '🎉';
				case 'ReactionTypeRocket':
					return '🚀';
				default:
					return '👀';
			}
		};
		var prSegments = function () {
			var _v5 = card.content;
			if (_v5.$ === 'IssueCardContent') {
				return _List_Nil;
			} else {
				var pr = _v5.a;
				var statusChecks = function () {
					var _v8 = A2(
						$elm$core$Maybe$map,
						function ($) {
							return $.status;
						},
						pr.lastCommit);
					if ((_v8.$ === 'Just') && (_v8.a.$ === 'Just')) {
						var contexts = _v8.a.a.contexts;
						return function (a) {
							return A2($elm$core$List$map, a, contexts);
						}(
							function (c) {
								return _Utils_Tuple3(
									A2(
										$elm$html$Html$span,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('status-icon')
											]),
										_List_fromArray(
											[
												function () {
												var _v9 = c.state;
												switch (_v9.$) {
													case 'StatusStatePending':
														return $capitalist$elm_octicons$Octicons$primitiveDot(
															_Utils_update(
																$author$project$StatefulGraph$octiconOpts,
																{color: $author$project$Colors$yellow}));
													case 'StatusStateSuccess':
														return $capitalist$elm_octicons$Octicons$check(
															_Utils_update(
																$author$project$StatefulGraph$octiconOpts,
																{color: $author$project$Colors$green}));
													case 'StatusStateFailure':
														return $capitalist$elm_octicons$Octicons$x(
															_Utils_update(
																$author$project$StatefulGraph$octiconOpts,
																{color: $author$project$Colors$red}));
													case 'StatusStateExpected':
														return $capitalist$elm_octicons$Octicons$question(
															_Utils_update(
																$author$project$StatefulGraph$octiconOpts,
																{color: $author$project$Colors$purple}));
													default:
														return $capitalist$elm_octicons$Octicons$alert(
															_Utils_update(
																$author$project$StatefulGraph$octiconOpts,
																{color: $author$project$Colors$orange}));
												}
											}()
											])),
									function () {
										var _v10 = c.state;
										switch (_v10.$) {
											case 'StatusStatePending':
												return 'pending';
											case 'StatusStateSuccess':
												return 'success';
											case 'StatusStateFailure':
												return 'failure';
											case 'StatusStateExpected':
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
					$elm$core$List$map,
					function (r) {
						return _Utils_Tuple3(
							A2(
								$elm$html$Html$img,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('status-actor'),
										$elm$html$Html$Attributes$src(r.author.avatar)
									]),
								_List_Nil),
							function () {
								var _v7 = r.state;
								switch (_v7.$) {
									case 'PullRequestReviewStatePending':
										return 'pending';
									case 'PullRequestReviewStateApproved':
										return 'success';
									case 'PullRequestReviewStateChangesRequested':
										return 'failure';
									case 'PullRequestReviewStateCommented':
										return 'commented';
									default:
										return 'dismissed';
								}
							}(),
							0);
					},
					reviews);
				return A2(
					$elm$core$List$cons,
					_Utils_Tuple3(
						A2(
							$elm$html$Html$span,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('status-icon')
								]),
							_List_fromArray(
								[
									$capitalist$elm_octicons$Octicons$gitMerge($author$project$StatefulGraph$octiconOpts)
								])),
						function () {
							var _v6 = pr.mergeable;
							switch (_v6.$) {
								case 'MergeableStateMergeable':
									return 'success';
								case 'MergeableStateConflicting':
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
			return A2($elm$core$List$map, a, card.reactions);
		}(
			function (_v4) {
				var type_ = _v4.type_;
				var count = _v4.count;
				return _Utils_Tuple3(
					$elm$html$Html$text(
						reactionTypeEmoji(type_)),
					'reaction',
					count);
			});
		var flairs = _Utils_ap(
			prSegments,
			A2(
				$elm$core$List$filter,
				function (_v3) {
					var count = _v3.c;
					return count > 0;
				},
				A2(
					$elm$core$List$cons,
					_Utils_Tuple3(
						$capitalist$elm_octicons$Octicons$comment($author$project$StatefulGraph$octiconOpts),
						'comments',
						card.commentCount),
					emojiReactions)));
		var segments = A2(
			$gampleman$elm_visualization$Shape$pie,
			{cornerRadius: 3, endAngle: 2 * $elm$core$Basics$pi, innerRadius: radius, outerRadius: radius + $author$project$StatefulGraph$flairRadiusBase, padAngle: 0.03, padRadius: 0, sortingFn: $elm$core$Basics$compare, startAngle: 0, valueFn: $elm$core$Basics$identity},
			A2(
				$elm$core$List$repeat,
				$elm$core$List$length(flairs),
				1));
		var reactionSegment = F2(
			function (i, _v2) {
				var _v1 = A2(
					$elm$core$List$take,
					1,
					A2($elm$core$List$drop, i, segments));
				if (_v1.b && (!_v1.b.b)) {
					var s = _v1.a;
					return s;
				} else {
					return A3(
						$author$project$Log$debug,
						'impossible: empty segments',
						_Utils_Tuple2(i, segments),
						$author$project$StatefulGraph$emptyArc);
				}
			});
		return function (a) {
			return A2($elm$core$List$indexedMap, a, flairs);
		}(
			F2(
				function (i, reaction) {
					var content = reaction.a;
					var _class = reaction.b;
					var count = reaction.c;
					var segmentArc = A2(reactionSegment, i, reaction);
					var arc = _Utils_update(
						segmentArc,
						{outerRadius: segmentArc.outerRadius + count});
					var _v0 = function () {
						var r = arc.innerRadius + 12;
						var a = ((arc.startAngle + arc.endAngle) / 2) - ($elm$core$Basics$pi / 2);
						return _Utils_Tuple2(
							($elm$core$Basics$cos(a) * r) - 8,
							($elm$core$Basics$sin(a) * r) - 8);
					}();
					var centroidX = _v0.a;
					var centroidY = _v0.b;
					return A2(
						$elm$svg$Svg$g,
						_List_fromArray(
							[
								$elm$svg$Svg$Attributes$class('reveal')
							]),
						_List_fromArray(
							[
								A2(
								$folkertdev$one_true_path_experiment$Path$element,
								$gampleman$elm_visualization$Shape$arc(arc),
								_List_fromArray(
									[
										$elm$svg$Svg$Attributes$class('flair-arc ' + _class)
									])),
								A2(
								$elm$svg$Svg$foreignObject,
								_List_fromArray(
									[
										$elm$svg$Svg$Attributes$transform(
										'translate(' + ($elm$core$String$fromFloat(centroidX) + (',' + ($elm$core$String$fromFloat(centroidY) + ')')))),
										$elm$svg$Svg$Attributes$class('hidden')
									]),
								_List_fromArray(
									[content]))
							]));
				}));
	});
var $author$project$StatefulGraph$viewCardFlair = F4(
	function (node, currentTime, isHighlighted, prReviewers) {
		var scale = isHighlighted ? '1.1' : (node.filteredOut ? '0.5' : '1');
		var radii = {
			base: node.mass,
			withFlair: A2($author$project$StatefulGraph$cardRadiusWithFlair, node.card, node.mass),
			withoutFlair: node.mass
		};
		var flairArcs = A3(
			$author$project$StatefulGraph$reactionFlairArcs,
			A2(
				$elm$core$Maybe$withDefault,
				_List_Nil,
				A2($elm$core$Dict$get, node.card.id, prReviewers)),
			node.card,
			node.mass);
		var classes = _List_fromArray(
			[
				'flair',
				A2($author$project$Activity$class, currentTime, node.card.updatedAt),
				node.filteredOut ? 'filtered-out' : 'filtered-in'
			]);
		var anticipateRadius = $elm$core$List$isEmpty(node.card.labels) ? (radii.base + 5) : (radii.withoutFlair + 5);
		var anticipatedHalo = isHighlighted ? A2(
			$elm$svg$Svg$circle,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$r(
					$elm$core$String$fromFloat(anticipateRadius)),
					$elm$svg$Svg$Attributes$class('anticipated-circle')
				]),
			_List_Nil) : $elm$svg$Svg$text('');
		return A2(
			$elm$svg$Svg$g,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$transform(
					'translate(' + ($elm$core$String$fromFloat(node.x) + (',' + ($elm$core$String$fromFloat(node.y) + (') scale(' + (scale + ')')))))),
					$elm$svg$Svg$Attributes$class(
					A2($elm$core$String$join, ' ', classes))
				]),
			_Utils_ap(
				flairArcs,
				_List_fromArray(
					[anticipatedHalo])));
	});
var $author$project$StatefulGraph$viewNodeLowerUpper = F3(
	function (state, node, _v0) {
		var fs = _v0.a;
		var ns = _v0.b;
		var bs = _v0.c;
		var radiiWithFlair = A2($author$project$StatefulGraph$cardRadiusWithFlair, node.card, node.mass);
		var isSelected = A2($y0hy0h$ordered_containers$OrderedSet$member, node.card.id, state.selectedCards);
		var isHighlighted = A2($elm$core$Set$member, node.card.id, state.anticipatedCards) || _Utils_eq(
			state.highlightedNode,
			$elm$core$Maybe$Just(node.card.id));
		var bounds = {x1: node.x - radiiWithFlair, x2: node.x + radiiWithFlair, y1: node.y - radiiWithFlair, y2: node.y + radiiWithFlair};
		return _Utils_Tuple3(
			A2(
				$elm$core$List$cons,
				_Utils_Tuple2(
					node.card.id,
					A5($elm$svg$Svg$Lazy$lazy4, $author$project$StatefulGraph$viewCardFlair, node, state.currentTime, isHighlighted, state.prReviewers)),
				fs),
			A2(
				$elm$core$List$cons,
				_Utils_Tuple2(
					node.card.id,
					A5($elm$svg$Svg$Lazy$lazy4, $author$project$StatefulGraph$viewCardCircle, node, state.allLabels, isHighlighted, isSelected)),
				ns),
			A2($elm$core$List$cons, bounds, bs));
	});
var $author$project$StatefulGraph$viewGraph = function (graph) {
	var padding = 10;
	var links = A2($elm$core$List$map, $author$project$StatefulGraph$linkPath, graph.edges);
	var _v0 = A3(
		$elm$core$List$foldl,
		$author$project$StatefulGraph$viewNodeLowerUpper(graph.state),
		_Utils_Tuple3(_List_Nil, _List_Nil, _List_Nil),
		graph.nodes);
	var flairs = _v0.a;
	var nodes = _v0.b;
	var bounds = _v0.c;
	var maxX = A3(
		$elm$core$List$foldl,
		F2(
			function (_v4, acc) {
				var x2 = _v4.x2;
				return A2($elm$core$Basics$max, x2, acc);
			}),
		0,
		bounds) + padding;
	var maxY = A3(
		$elm$core$List$foldl,
		F2(
			function (_v3, acc) {
				var y2 = _v3.y2;
				return A2($elm$core$Basics$max, y2, acc);
			}),
		0,
		bounds) + padding;
	var minX = A3(
		$elm$core$List$foldl,
		F2(
			function (_v2, acc) {
				var x1 = _v2.x1;
				return A2($elm$core$Basics$min, x1, acc);
			}),
		999999,
		bounds) - padding;
	var width = maxX - minX;
	var minY = A3(
		$elm$core$List$foldl,
		F2(
			function (_v1, acc) {
				var y1 = _v1.y1;
				return A2($elm$core$Basics$min, y1, acc);
			}),
		999999,
		bounds) - padding;
	var height = maxY - minY;
	return A2(
		$elm$svg$Svg$svg,
		_List_fromArray(
			[
				$elm$svg$Svg$Attributes$width(
				$elm$core$String$fromFloat(width) + 'px'),
				$elm$svg$Svg$Attributes$style('max-width: 95%'),
				$elm$svg$Svg$Attributes$viewBox(
				$elm$core$String$fromFloat(minX) + (' ' + ($elm$core$String$fromFloat(minY) + (' ' + ($elm$core$String$fromFloat(width) + (' ' + $elm$core$String$fromFloat(height)))))))
			]),
		_List_fromArray(
			[
				A2(
				$elm$svg$Svg$g,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$class('links')
					]),
				links),
				A3(
				$elm$svg$Svg$Keyed$node,
				'g',
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$class('lower')
					]),
				flairs),
				A3(
				$elm$svg$Svg$Keyed$node,
				'g',
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$class('upper')
					]),
				nodes)
			]));
};
var $author$project$Model$AllActivitySort = {$: 'AllActivitySort'};
var $author$project$Model$InvolvesUserFilter = function (a) {
	return {$: 'InvolvesUserFilter', a: a};
};
var $author$project$Model$IssuesFilter = {$: 'IssuesFilter'};
var $author$project$Model$PullRequestsFilter = {$: 'PullRequestsFilter'};
var $author$project$Model$RemoveFilter = function (a) {
	return {$: 'RemoveFilter', a: a};
};
var $author$project$Model$SetGraphSort = function (a) {
	return {$: 'SetGraphSort', a: a};
};
var $author$project$Model$ToggleLabelFilters = {$: 'ToggleLabelFilters'};
var $author$project$Model$UntriagedFilter = {$: 'UntriagedFilter'};
var $capitalist$elm_octicons$Octicons$clockPath = 'M8,8 L11,8 L11,10 L7,10 C6.45,10 6,9.55 6,9 L6,4 L8,4 L8,8 L8,8 Z M7,2.3 C10.14,2.3 12.7,4.86 12.7,8 C12.7,11.14 10.14,13.7 7,13.7 C3.86,13.7 1.3,11.14 1.3,8 C1.3,4.86 3.86,2.3 7,2.3 L7,2.3 Z M7,1 C3.14,1 0,4.14 0,8 C0,11.86 3.14,15 7,15 C10.86,15 14,11.86 14,8 C14,4.14 10.86,1 7,1 L7,1 Z';
var $capitalist$elm_octicons$Octicons$clock = A3($capitalist$elm_octicons$Octicons$pathIconWithOptions, $capitalist$elm_octicons$Octicons$clockPath, '0 0 14 16', 'clock');
var $capitalist$elm_octicons$Octicons$commentDiscussionPath = 'M15,1 L6,1 C5.45,1 5,1.45 5,2 L5,4 L1,4 C0.45,4 0,4.45 0,5 L0,11 C0,11.55 0.45,12 1,12 L2,12 L2,15 L5,12 L9,12 C9.55,12 10,11.55 10,11 L10,9 L11,9 L14,12 L14,9 L15,9 C15.55,9 16,8.55 16,8 L16,2 C16,1.45 15.55,1 15,1 L15,1 Z M9,11 L4.5,11 L3,12.5 L3,11 L1,11 L1,5 L5,5 L5,8 C5,8.55 5.45,9 6,9 L9,9 L9,11 L9,11 Z M15,8 L13,8 L13,9.5 L11.5,8 L6,8 L6,2 L15,2 L15,8 L15,8 Z';
var $capitalist$elm_octicons$Octicons$commentDiscussion = A3($capitalist$elm_octicons$Octicons$pathIconWithOptions, $capitalist$elm_octicons$Octicons$commentDiscussionPath, '0 0 16 16', 'commentDiscussion');
var $capitalist$elm_octicons$Octicons$flamePath = 'M5.05,0.31 C5.86,2.48 5.46,3.69 4.53,4.62 C3.55,5.67 1.98,6.45 0.9,7.98 C-0.55,10.03 -0.8,14.51 4.43,15.68 C2.23,14.52 1.76,11.16 4.13,9.07 C3.52,11.1 4.66,12.4 6.07,11.93 C7.46,11.46 8.37,12.46 8.34,13.6 C8.32,14.38 8.03,15.04 7.21,15.41 C10.63,14.82 11.99,11.99 11.99,9.85 C11.99,7.01 9.46,6.63 10.74,4.24 C9.22,4.37 8.71,5.37 8.85,6.99 C8.94,8.07 7.83,8.79 6.99,8.32 C6.32,7.91 6.33,7.13 6.93,6.54 C8.18,5.31 8.68,2.45 5.05,0.32 L5.03,0.3 L5.05,0.31 Z';
var $capitalist$elm_octicons$Octicons$flame = A3($capitalist$elm_octicons$Octicons$pathIconWithOptions, $capitalist$elm_octicons$Octicons$flamePath, '0 0 12 16', 'flame');
var $author$project$StatefulGraph$hasFilter = F2(
	function (model, filter) {
		return A2($elm$core$List$member, filter, model.graphFilters);
	});
var $capitalist$elm_octicons$Octicons$inboxPath = 'M14,9 L12.87,1.86 C12.79,1.38 12.37,1 11.87,1 L2.13,1 C1.63,1 1.21,1.38 1.13,1.86 L0,9 L0,14 C0,14.55 0.45,15 1,15 L13,15 C13.55,15 14,14.55 14,14 L14,9 L14,9 Z M10.72,9.55 L10.28,10.44 C10.11,10.78 9.76,11 9.37,11 L4.61,11 C4.23,11 3.89,10.78 3.72,10.45 L3.28,9.54 C3.11,9.21 2.76,8.99 2.39,8.99 L1,8.99 L2,1.99 L12,1.99 L13,8.99 L11.62,8.99 C11.23,8.99 10.89,9.21 10.71,9.54 L10.72,9.55 Z';
var $capitalist$elm_octicons$Octicons$inbox = A3($capitalist$elm_octicons$Octicons$pathIconWithOptions, $capitalist$elm_octicons$Octicons$inboxPath, '0 0 14 16', 'inbox');
var $author$project$StatefulGraph$viewGraphControls = function (model) {
	var labelFilters = A2(
		$elm$core$List$filterMap,
		function (filter) {
			if (filter.$ === 'HasLabelFilter') {
				var name = filter.a;
				var color = filter.b;
				return $elm$core$Maybe$Just(
					A2(
						$elm$html$Html$div,
						_Utils_ap(
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('control-setting'),
									$elm$html$Html$Events$onClick(
									$author$project$Model$RemoveFilter(filter))
								]),
							A2($author$project$Label$colorStyles, model, color)),
						_List_fromArray(
							[
								$capitalist$elm_octicons$Octicons$tag($author$project$StatefulGraph$octiconOpts),
								$elm$html$Html$text(name)
							])));
			} else {
				return $elm$core$Maybe$Nothing;
			}
		},
		model.graphFilters);
	var allLabelFilters = function (a) {
		return A2(
			$elm$core$List$filterMap,
			a,
			$elm$core$Dict$toList(model.reposByLabel));
	}(
		function (_v1) {
			var _v2 = _v1.a;
			var name = _v2.a;
			var color = _v2.b;
			return A2($elm$core$String$contains, model.labelSearch, name) ? $elm$core$Maybe$Just(
				A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('label-filter')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$div,
							_Utils_ap(
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('label'),
										$elm$html$Html$Events$onClick(
										$author$project$Model$AddFilter(
											A2($author$project$Model$HasLabelFilter, name, color)))
									]),
								A2($author$project$Label$colorStyles, model, color)),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$span,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('label-text')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text(name)
										]))
								]))
						]))) : $elm$core$Maybe$Nothing;
		});
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('graph-controls')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('control-group')
					]),
				_Utils_ap(
					_List_fromArray(
						[
							A2(
							$elm$html$Html$span,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('controls-label')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('filter:')
								])),
							function () {
							var filter = $author$project$Model$UntriagedFilter;
							return A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$classList(
										_List_fromArray(
											[
												_Utils_Tuple2('control-setting', true),
												_Utils_Tuple2(
												'active',
												A2($author$project$StatefulGraph$hasFilter, model, filter))
											])),
										$elm$html$Html$Events$onClick(
										A2($author$project$StatefulGraph$hasFilter, model, filter) ? $author$project$Model$RemoveFilter(filter) : $author$project$Model$AddFilter(filter))
									]),
								_List_fromArray(
									[
										$capitalist$elm_octicons$Octicons$inbox($author$project$StatefulGraph$octiconOpts),
										$elm$html$Html$text('untriaged')
									]));
						}(),
							function () {
							var filter = $author$project$Model$IssuesFilter;
							return A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$classList(
										_List_fromArray(
											[
												_Utils_Tuple2('control-setting', true),
												_Utils_Tuple2(
												'active',
												A2($author$project$StatefulGraph$hasFilter, model, filter))
											])),
										$elm$html$Html$Events$onClick(
										A2($author$project$StatefulGraph$hasFilter, model, filter) ? $author$project$Model$RemoveFilter(filter) : $author$project$Model$AddFilter(filter))
									]),
								_List_fromArray(
									[
										$capitalist$elm_octicons$Octicons$issueOpened($author$project$StatefulGraph$octiconOpts),
										$elm$html$Html$text('issues')
									]));
						}(),
							function () {
							var filter = $author$project$Model$PullRequestsFilter;
							return A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$classList(
										_List_fromArray(
											[
												_Utils_Tuple2('control-setting', true),
												_Utils_Tuple2(
												'active',
												A2($author$project$StatefulGraph$hasFilter, model, filter))
											])),
										$elm$html$Html$Events$onClick(
										A2($author$project$StatefulGraph$hasFilter, model, filter) ? $author$project$Model$RemoveFilter(filter) : $author$project$Model$AddFilter(filter))
									]),
								_List_fromArray(
									[
										$capitalist$elm_octicons$Octicons$gitPullRequest($author$project$StatefulGraph$octiconOpts),
										$elm$html$Html$text('pull requests')
									]));
						}(),
							function () {
							var _v0 = model.me;
							if (_v0.$ === 'Just') {
								var user = _v0.a.user;
								var filter = $author$project$Model$InvolvesUserFilter(user.login);
								return A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$classList(
											_List_fromArray(
												[
													_Utils_Tuple2('control-setting', true),
													_Utils_Tuple2(
													'active',
													A2($author$project$StatefulGraph$hasFilter, model, filter))
												])),
											$elm$html$Html$Events$onClick(
											A2($author$project$StatefulGraph$hasFilter, model, filter) ? $author$project$Model$RemoveFilter(filter) : $author$project$Model$AddFilter(filter))
										]),
									_List_fromArray(
										[
											$capitalist$elm_octicons$Octicons$commentDiscussion($author$project$StatefulGraph$octiconOpts),
											$elm$html$Html$text('involving me')
										]));
							} else {
								return $elm$html$Html$text('');
							}
						}(),
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('label-selection')
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$classList(
											_List_fromArray(
												[
													_Utils_Tuple2('label-filters', true),
													_Utils_Tuple2('visible', model.showLabelFilters)
												]))
										]),
									_List_fromArray(
										[
											A2(
											$elm$html$Html$div,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('label-options')
												]),
											allLabelFilters),
											A2(
											$elm$html$Html$input,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$type_('text'),
													$elm$html$Html$Events$onInput($author$project$Model$SetLabelSearch)
												]),
											_List_Nil)
										])),
									A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$classList(
											_List_fromArray(
												[
													_Utils_Tuple2('control-setting', true),
													_Utils_Tuple2('active', model.showLabelFilters)
												])),
											$elm$html$Html$Events$onClick($author$project$Model$ToggleLabelFilters)
										]),
									_List_fromArray(
										[
											$capitalist$elm_octicons$Octicons$tag($author$project$StatefulGraph$octiconOpts),
											$elm$html$Html$text('label')
										]))
								]))
						]),
					labelFilters)),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('control-group')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$span,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('controls-label')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('sort:')
							])),
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$classList(
								_List_fromArray(
									[
										_Utils_Tuple2('control-setting', true),
										_Utils_Tuple2(
										'active',
										_Utils_eq(model.graphSort, $author$project$Model$ImpactSort))
									])),
								$elm$html$Html$Events$onClick(
								$author$project$Model$SetGraphSort($author$project$Model$ImpactSort))
							]),
						_List_fromArray(
							[
								$capitalist$elm_octicons$Octicons$flame($author$project$StatefulGraph$octiconOpts),
								$elm$html$Html$text('impact')
							])),
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$classList(
								_List_fromArray(
									[
										_Utils_Tuple2('control-setting', true),
										_Utils_Tuple2(
										'active',
										_Utils_eq(model.graphSort, $author$project$Model$AllActivitySort))
									])),
								$elm$html$Html$Events$onClick(
								$author$project$Model$SetGraphSort($author$project$Model$AllActivitySort))
							]),
						_List_fromArray(
							[
								$capitalist$elm_octicons$Octicons$clock($author$project$StatefulGraph$octiconOpts),
								$elm$html$Html$text('all activity')
							]))
					]))
			]));
};
var $author$project$StatefulGraph$view = function (model) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('spatial-graph')
			]),
		_List_fromArray(
			[
				$author$project$StatefulGraph$viewGraphControls(model),
				A3(
				$elm$html$Html$Keyed$node,
				'div',
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('graphs')
					]),
				A2(
					$elm$core$List$map,
					function (graph) {
						return _Utils_Tuple2(
							$author$project$StatefulGraph$graphId(graph),
							A2($elm$html$Html$Lazy$lazy, $author$project$StatefulGraph$viewGraph, graph));
					},
					model.statefulGraphs))
			]));
};
var $author$project$Main$viewGlobalGraphPage = function (model) {
	return $author$project$StatefulGraph$view(model);
};
var $author$project$Model$AssignOnlyUsers = F2(
	function (a, b) {
		return {$: 'AssignOnlyUsers', a: a, b: b};
	});
var $author$project$Model$AssignOnlyUsersDrag = function (a) {
	return {$: 'AssignOnlyUsersDrag', a: a};
};
var $author$project$Model$AssignPairs = {$: 'AssignPairs'};
var $author$project$Model$AssignUserDrag = function (a) {
	return {$: 'AssignUserDrag', a: a};
};
var $author$project$Model$SetUserIn = function (a) {
	return {$: 'SetUserIn', a: a};
};
var $author$project$Model$SetUserOut = function (a) {
	return {$: 'SetUserOut', a: a};
};
var $capitalist$elm_octicons$Octicons$circleSlashPath = 'M7,1 C3.14,1 0,4.14 0,8 C0,11.86 3.14,15 7,15 C10.86,15 14,11.86 14,8 C14,4.14 10.86,1 7,1 L7,1 Z M7,2.3 C8.3,2.3 9.5,2.74 10.47,3.47 L2.47,11.47 C1.74,10.5 1.3,9.3 1.3,8 C1.3,4.86 3.86,2.3 7,2.3 L7,2.3 Z M7,13.71 C5.7,13.71 4.5,13.27 3.53,12.54 L11.53,4.54 C12.26,5.51 12.7,6.71 12.7,8.01 C12.7,11.15 10.14,13.71 7,13.71 L7,13.71 Z';
var $capitalist$elm_octicons$Octicons$circleSlash = A3($capitalist$elm_octicons$Octicons$pathIconWithOptions, $capitalist$elm_octicons$Octicons$circleSlashPath, '0 0 14 16', 'circleSlash');
var $author$project$Drag$droppable = F4(
	function (model, wrap, candidate, view) {
		var isOver = function () {
			switch (model.$) {
				case 'NotDragging':
					return false;
				case 'Dragging':
					var state = model.a;
					var _v2 = state.dropCandidate;
					if (_v2.$ === 'Just') {
						var target = _v2.a.target;
						return _Utils_eq(target, candidate.target);
					} else {
						return false;
					}
				case 'Dropping':
					var target = model.a.target;
					var landed = model.a.landed;
					return _Utils_eq(target, candidate.target) && (!landed);
				default:
					var target = model.a.target;
					var landed = model.a.landed;
					return _Utils_eq(target, candidate.target) && (!landed);
			}
		}();
		var isActive = function () {
			if (model.$ === 'Dragging') {
				return true;
			} else {
				return false;
			}
		}();
		var dragEvents = isActive ? A2($author$project$Drag$onDrop, candidate, wrap) : _List_Nil;
		return A2(
			$elm$html$Html$div,
			_Utils_ap(
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('droppable'),
						$elm$html$Html$Attributes$classList(
						_List_fromArray(
							[
								_Utils_Tuple2('active', isActive),
								_Utils_Tuple2(
								'never-left',
								$author$project$Drag$hasNeverLeft(model)),
								_Utils_Tuple2('over', isOver)
							]))
					]),
				dragEvents),
			_List_fromArray(
				[view]));
	});
var $capitalist$elm_octicons$Octicons$personPath = 'M12,14.002 C12,14.553 11.553,15 11.002,15 L1.001,15 C0.448,15 0,14.552 0,13.999 L0,13 C0,10.367 4,9 4,9 C4,9 4.229,8.591 4,8 C3.159,7.38 3.056,6.41 3,4 C3.173,1.587 4.867,1 6,1 C7.133,1 8.827,1.586 9,4 C8.944,6.41 8.841,7.38 8,8 C7.771,8.59 8,9 8,9 C8,9 12,10.367 12,13 L12,14.002 Z';
var $capitalist$elm_octicons$Octicons$person = A3($capitalist$elm_octicons$Octicons$pathIconWithOptions, $capitalist$elm_octicons$Octicons$personPath, '0 0 12 16', 'person');
var $author$project$Main$viewAssignableUsers = function (model) {
	var viewUser = function (user) {
		var isOut = A2($elm$core$Set$member, user.id, model.outUsers);
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('side-user assignable-user'),
					$elm$html$Html$Attributes$classList(
					_List_fromArray(
						[
							_Utils_Tuple2('out', isOut)
						]))
				]),
			_List_fromArray(
				[
					$author$project$CardView$viewCardActor(user),
					$elm$html$Html$text(
					A2($elm$core$Maybe$withDefault, user.login, user.name)),
					A2(
					$author$project$Model$whenLoggedIn,
					model,
					A2(
						$elm$html$Html$span,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('out-button'),
								$elm$html$Html$Events$onClick(
								isOut ? $author$project$Model$SetUserIn(user) : $author$project$Model$SetUserOut(user))
							]),
						_List_fromArray(
							[
								$capitalist$elm_octicons$Octicons$circleSlash($author$project$Main$octiconOpts)
							])))
				]));
	};
	var currentAssignments = function (user) {
		return A3(
			$elm$core$List$foldl,
			F2(
				function (_v0, acc) {
					var lanes = _v0.lanes;
					return A3(
						$elm$core$List$foldl,
						F2(
							function (_v1, acc2) {
								var assignees = _v1.assignees;
								var cards = _v1.cards;
								return A2(
									$elm$core$List$any,
									A2(
										$elm$core$Basics$composeL,
										$elm$core$Basics$eq(user.id),
										function ($) {
											return $.id;
										}),
									assignees) ? ($elm$core$List$length(cards) + acc2) : acc2;
							}),
						acc,
						lanes);
				}),
			0,
			model.inFlight);
	};
	var assignableUsers = A2($elm$core$List$sortBy, currentAssignments, model.assignableUsers);
	var assignDropCandidate = function (user) {
		return {
			msgFunc: $author$project$Model$AssignOnlyUsers,
			target: _List_fromArray(
				[user])
		};
	};
	var viewDraggableActor = function (user) {
		return _Utils_eq(model.me, $elm$core$Maybe$Nothing) ? viewUser(user) : A4(
			$author$project$Drag$droppable,
			model.assignOnlyUsersDrag,
			$author$project$Model$AssignOnlyUsersDrag,
			assignDropCandidate(user),
			A4(
				$author$project$Drag$draggable,
				model.assignUserDrag,
				$author$project$Model$AssignUserDrag,
				user,
				viewUser(user)));
	};
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('assignable-users')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('page-header')
					]),
				_List_fromArray(
					[
						$capitalist$elm_octicons$Octicons$person($author$project$Main$octiconOpts),
						$elm$html$Html$text('Assignable Users'),
						A2(
						$author$project$Model$whenLoggedIn,
						model,
						$elm$core$List$isEmpty(assignableUsers) ? $elm$html$Html$text('') : A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('lane-controls buttons')
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$span,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('button shuffle'),
											$elm$html$Html$Events$onClick($author$project$Model$AssignPairs)
										]),
									_List_fromArray(
										[
											$capitalist$elm_octicons$Octicons$organization($author$project$Main$octiconOpts),
											$elm$html$Html$text('pair up')
										]))
								])))
					])),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('side-users')
					]),
				$elm$core$List$isEmpty(assignableUsers) ? _List_fromArray(
					[
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('no-users')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('everyone is assigned!')
							]))
					]) : A2($elm$core$List$map, viewDraggableActor, assignableUsers))
			]));
};
var $author$project$Model$CommitAssignments = {$: 'CommitAssignments'};
var $author$project$Model$ResetAssignments = {$: 'ResetAssignments'};
var $capitalist$elm_octicons$Octicons$listUnorderedPath = 'M2,13 C2,13.59 2,14 1.41,14 L0.59,14 C0,14 0,13.59 0,13 C0,12.41 0,12 0.59,12 L1.4,12 C1.99,12 1.99,12.41 1.99,13 L2,13 Z M4.59,4 L11.4,4 C11.99,4 11.99,3.59 11.99,3 C11.99,2.41 11.99,2 11.4,2 L4.59,2 C4,2 4,2.41 4,3 C4,3.59 4,4 4.59,4 L4.59,4 Z M1.41,7 L0.59,7 C0,7 0,7.41 0,8 C0,8.59 0,9 0.59,9 L1.4,9 C1.99,9 1.99,8.59 1.99,8 C1.99,7.41 1.99,7 1.4,7 L1.41,7 Z M1.41,2 L0.59,2 C0,2 0,2.41 0,3 C0,3.59 0,4 0.59,4 L1.4,4 C1.99,4 1.99,3.59 1.99,3 C1.99,2.41 1.99,2 1.4,2 L1.41,2 Z M11.41,7 L4.59,7 C4,7 4,7.41 4,8 C4,8.59 4,9 4.59,9 L11.4,9 C11.99,9 11.99,8.59 11.99,8 C11.99,7.41 11.99,7 11.4,7 L11.41,7 Z M11.41,12 L4.59,12 C4,12 4,12.41 4,13 C4,13.59 4,14 4.59,14 L11.4,14 C11.99,14 11.99,13.59 11.99,13 C11.99,12.41 11.99,12 11.4,12 L11.41,12 Z';
var $capitalist$elm_octicons$Octicons$listUnordered = A3($capitalist$elm_octicons$Octicons$pathIconWithOptions, $capitalist$elm_octicons$Octicons$listUnorderedPath, '0 0 12 16', 'listUnordered');
var $author$project$Model$ReassignUser = F2(
	function (a, b) {
		return {$: 'ReassignUser', a: a, b: b};
	});
var $author$project$Model$ReassignUserDrag = function (a) {
	return {$: 'ReassignUserDrag', a: a};
};
var $author$project$Main$viewAssignableCard = F2(
	function (model, card) {
		var reassignDropCandidate = {
			msgFunc: $author$project$Model$ReassignUser,
			target: _List_fromArray(
				[card])
		};
		var cardView = A3($author$project$CardView$viewCard, model, _List_Nil, card);
		var assignDropCandidate = {
			msgFunc: $author$project$Model$AssignUser,
			target: _List_fromArray(
				[card])
		};
		return _Utils_eq(model.me, $elm$core$Maybe$Nothing) ? cardView : A4(
			$author$project$Drag$droppable,
			model.reassignUserDrag,
			$author$project$Model$ReassignUserDrag,
			reassignDropCandidate,
			A4(
				$author$project$Drag$droppable,
				model.assignUserDrag,
				$author$project$Model$AssignUserDrag,
				assignDropCandidate,
				A4($author$project$Drag$draggable, model.assignOnlyUsersDrag, $author$project$Model$AssignOnlyUsersDrag, card, cardView)));
	});
var $author$project$Model$UnassignUser = F2(
	function (a, b) {
		return {$: 'UnassignUser', a: a, b: b};
	});
var $author$project$Main$viewAssignedUser = F4(
	function (model, cards, user, html) {
		return _Utils_eq(model.me, $elm$core$Maybe$Nothing) ? html : A4(
			$author$project$Drag$draggable,
			model.reassignUserDrag,
			$author$project$Model$ReassignUserDrag,
			_Utils_Tuple2(user, cards),
			A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('remove-assignee'),
						$elm$html$Html$Events$onClick(
						A2($author$project$Model$UnassignUser, user, cards))
					]),
				_List_fromArray(
					[html])));
	});
var $author$project$Main$viewLaneUsers = F3(
	function (model, users, cards) {
		var viewLaneActor = function (user) {
			return A4(
				$author$project$Main$viewAssignedUser,
				model,
				cards,
				user,
				A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('lane-user')
						]),
					_List_fromArray(
						[
							$author$project$CardView$viewCardActor(user),
							A2(
							$elm$html$Html$span,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('user-name')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text(
									A2($elm$core$Maybe$withDefault, user.login, user.name))
								]))
						])));
		};
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('project-lane-users')
				]),
			_Utils_ap(
				A2($elm$core$List$map, viewLaneActor, users),
				($elm$core$List$length(users) < 2) ? A2(
					$elm$core$List$repeat,
					2 - $elm$core$List$length(users),
					A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('lane-user placeholder')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('card-actor actor-placeholder')
									]),
								_List_fromArray(
									[
										$capitalist$elm_octicons$Octicons$person($author$project$Main$octiconOpts)
									]))
							]))) : _List_Nil));
	});
var $author$project$Main$viewProjectLane = F3(
	function (model, project, _v0) {
		var assignees = _v0.assignees;
		var cards = _v0.cards;
		var reassignDropCandidate = {msgFunc: $author$project$Model$ReassignUser, target: cards};
		var assignOnlyUsersDropCandidate = {msgFunc: $author$project$Model$AssignOnlyUsers, target: assignees};
		var assignDropCandidate = {msgFunc: $author$project$Model$AssignUser, target: cards};
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('project-lane-wrap')
				]),
			_List_fromArray(
				[
					A4(
					$author$project$Drag$droppable,
					model.assignUserDrag,
					$author$project$Model$AssignUserDrag,
					assignDropCandidate,
					A4(
						$author$project$Drag$droppable,
						model.reassignUserDrag,
						$author$project$Model$ReassignUserDrag,
						reassignDropCandidate,
						A4(
							$author$project$Drag$droppable,
							model.assignOnlyUsersDrag,
							$author$project$Model$AssignOnlyUsersDrag,
							assignOnlyUsersDropCandidate,
							A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('project-lane')
									]),
								_List_fromArray(
									[
										A3($author$project$Main$viewLaneUsers, model, assignees, cards),
										A2(
										$elm$html$Html$div,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('project-lane-cards')
											]),
										_List_fromArray(
											[
												A3($author$project$CardView$viewProjectCard, model, _List_Nil, project)
											])),
										A2(
										$elm$html$Html$div,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('project-lane-cards')
											]),
										A2(
											$elm$core$List$map,
											$author$project$Main$viewAssignableCard(model),
											cards))
									])))))
				]));
	});
var $author$project$Main$viewInFlightLanes = function (model) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('in-flight-lanes')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('page-header')
					]),
				_List_fromArray(
					[
						$capitalist$elm_octicons$Octicons$listUnordered($author$project$Main$octiconOpts),
						$elm$html$Html$text('Lanes'),
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('lane-controls buttons')
							]),
						$elm$core$Dict$isEmpty(model.pendingAssignments) ? _List_Nil : _List_fromArray(
							[
								A2(
								$elm$html$Html$span,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('button apply'),
										$elm$html$Html$Events$onClick($author$project$Model$CommitAssignments)
									]),
								_List_fromArray(
									[
										$capitalist$elm_octicons$Octicons$check($author$project$Main$octiconOpts),
										$elm$html$Html$text('apply')
									])),
								A2(
								$elm$html$Html$span,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('button cancel'),
										$elm$html$Html$Events$onClick($author$project$Model$ResetAssignments)
									]),
								_List_fromArray(
									[
										$capitalist$elm_octicons$Octicons$x($author$project$Main$octiconOpts),
										$elm$html$Html$text('cancel')
									]))
							]))
					])),
				function () {
				var viewProjectLanes = function (_v0) {
					var project = _v0.project;
					var lanes = _v0.lanes;
					return A2(
						$elm$core$List$map,
						A2($author$project$Main$viewProjectLane, model, project),
						lanes);
				};
				return A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('project-lanes')
						]),
					A2($elm$core$List$concatMap, viewProjectLanes, model.inFlight));
			}()
			]));
};
var $author$project$Main$viewPairsPage = function (model) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('page-content pair-assignments')
			]),
		_List_fromArray(
			[
				$author$project$Main$viewInFlightLanes(model),
				$author$project$Main$viewAssignableUsers(model)
			]));
};
var $author$project$Main$viewProjectPage = F2(
	function (model, project) {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('page-content')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('project single')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('page-header')
								]),
							_List_fromArray(
								[
									$capitalist$elm_octicons$Octicons$project($author$project$Main$octiconOpts),
									$elm$html$Html$text(project.name)
								])),
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('fixed-columns card-columns')
								]),
							A2(
								$elm$core$List$map,
								A2($author$project$Main$viewProjectColumn, model, project),
								project.columns)),
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('icebox-graph')
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('page-header')
										]),
									_List_fromArray(
										[
											$capitalist$elm_octicons$Octicons$circuitBoard($author$project$Main$octiconOpts),
											$elm$html$Html$text(project.name + ' Graph')
										])),
									$author$project$StatefulGraph$view(model)
								]))
						]))
				]));
	});
var $author$project$Main$viewLeaderboardEntry = function (_v0) {
	var user = _v0.a;
	var count = _v0.b;
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('side-user')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$img,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('card-actor'),
						$elm$html$Html$Attributes$src(user.avatar)
					]),
				_List_Nil),
				$elm$html$Html$text(
				A2($elm$core$Maybe$withDefault, user.login, user.name)),
				A2(
				$elm$html$Html$span,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('leaderboard-count-number')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text(
						$elm$core$String$fromInt(count))
					]))
			]));
};
var $author$project$Main$lastActiveUser = F2(
	function (model, cardId) {
		return A2(
			$elm$core$Maybe$andThen,
			function ($) {
				return $.user;
			},
			A2(
				$elm$core$Maybe$andThen,
				$elm$core$List$head,
				A2($elm$core$Dict$get, cardId, model.cardEvents)));
	});
var $author$project$Main$viewRepoOpenPRs = F3(
	function (model, repo, cards) {
		var lastUpdatedFirst = A2(
			$elm$core$Basics$composeR,
			$elm$core$List$sortBy(
				A2(
					$elm$core$Basics$composeR,
					function ($) {
						return $.updatedAt;
					},
					$elm$time$Time$posixToMillis)),
			$elm$core$List$reverse);
		var categorizePR = F2(
			function (pr, _v2) {
				var ua = _v2.a;
				var tw = _v2.b;
				var uw = _v2.c;
				if ($elm$core$List$isEmpty(pr.assignees)) {
					return _Utils_Tuple3(
						A2($elm$core$List$cons, pr, ua),
						tw,
						uw);
				} else {
					var _v1 = A2($author$project$Main$lastActiveUser, model, pr.id);
					if (_v1.$ === 'Just') {
						var user = _v1.a;
						return A2(
							$elm$core$List$any,
							$elm$core$Basics$eq(user.id),
							A2(
								$elm$core$List$map,
								function ($) {
									return $.id;
								},
								pr.assignees)) ? _Utils_Tuple3(
							ua,
							tw,
							A2($elm$core$List$cons, pr, uw)) : _Utils_Tuple3(
							ua,
							A2($elm$core$List$cons, pr, tw),
							uw);
					} else {
						return _Utils_Tuple3(
							ua,
							A2($elm$core$List$cons, pr, tw),
							uw);
					}
				}
			});
		var _v0 = A3(
			$elm$core$List$foldl,
			categorizePR,
			_Utils_Tuple3(_List_Nil, _List_Nil, _List_Nil),
			cards);
		var unassigned = _v0.a;
		var themWaiting = _v0.b;
		var usWaiting = _v0.c;
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('repo-prs')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('page-header')
						]),
					_List_fromArray(
						[
							$capitalist$elm_octicons$Octicons$repo($author$project$Main$octiconOpts),
							$elm$html$Html$text(repo.name)
						])),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('fixed-columns')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('fixed-column')
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('column-title')
										]),
									_List_fromArray(
										[
											$capitalist$elm_octicons$Octicons$inbox($author$project$Main$octiconOpts),
											A2(
											$elm$html$Html$span,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('column-name')
												]),
											_List_fromArray(
												[
													$elm$html$Html$text('Unassigned')
												]))
										])),
									A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('dashboard-cards')
										]),
									A2(
										$elm$core$List$map,
										A2($author$project$CardView$viewCard, model, _List_Nil),
										lastUpdatedFirst(unassigned)))
								])),
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('fixed-column')
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('column-title')
										]),
									_List_fromArray(
										[
											$capitalist$elm_octicons$Octicons$clock($author$project$Main$octiconOpts),
											A2(
											$elm$html$Html$span,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('column-name')
												]),
											_List_fromArray(
												[
													$elm$html$Html$text('Others Active')
												]))
										])),
									A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('dashboard-cards')
										]),
									A2(
										$elm$core$List$map,
										A2($author$project$CardView$viewCard, model, _List_Nil),
										lastUpdatedFirst(themWaiting)))
								])),
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('fixed-column')
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('column-title')
										]),
									_List_fromArray(
										[
											$capitalist$elm_octicons$Octicons$check($author$project$Main$octiconOpts),
											A2(
											$elm$html$Html$span,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('column-name')
												]),
											_List_fromArray(
												[
													$elm$html$Html$text('Assignee Active')
												]))
										])),
									A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('dashboard-cards')
										]),
									A2(
										$elm$core$List$map,
										A2($author$project$CardView$viewCard, model, _List_Nil),
										lastUpdatedFirst(usWaiting)))
								]))
						]))
				]));
	});
var $author$project$Main$viewPullRequestsPage = function (model) {
	var bumpCount = F2(
		function (user, entry) {
			if (entry.$ === 'Nothing') {
				return $elm$core$Maybe$Just(
					_Utils_Tuple2(user, 1));
			} else {
				var _v2 = entry.a;
				var count = _v2.b;
				return $elm$core$Maybe$Just(
					_Utils_Tuple2(user, count + 1));
			}
		});
	var countAssignees = F2(
		function (pr, counts) {
			return A3(
				$elm$core$List$foldl,
				function (user) {
					return A2(
						$elm$core$Dict$update,
						user.id,
						bumpCount(user));
				},
				counts,
				pr.assignees);
		});
	var assignedPRs = A2(
		$elm$core$List$filter,
		A2(
			$elm$core$Basics$composeL,
			A2($elm$core$Basics$composeL, $elm$core$Basics$not, $elm$core$List$isEmpty),
			function ($) {
				return $.assignees;
			}),
		A2(
			$elm$core$List$filterMap,
			function (prId) {
				return A2($elm$core$Dict$get, prId, model.cards);
			},
			$elm$core$List$concat(
				$elm$core$Dict$values(model.openPRsByRepo))));
	var leaderboard = $elm$core$List$reverse(
		A2(
			$elm$core$List$sortBy,
			$elm$core$Tuple$second,
			$elm$core$Dict$values(
				A3($elm$core$List$foldl, countAssignees, $elm$core$Dict$empty, assignedPRs))));
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('page-content dashboard')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('dashboard-pane')
					]),
				A2(
					$elm$core$List$filterMap,
					$elm$core$Basics$identity,
					A2(
						$elm$core$List$map,
						function (_v0) {
							var repoId = _v0.a;
							var prIds = _v0.b;
							return A2(
								$elm$core$Maybe$map,
								function (repo) {
									var cards = A2(
										$elm$core$List$filterMap,
										function (id) {
											return A2($elm$core$Dict$get, id, model.cards);
										},
										prIds);
									return A3($author$project$Main$viewRepoOpenPRs, model, repo, cards);
								},
								A2($elm$core$Dict$get, repoId, model.repos));
						},
						$elm$core$List$reverse(
							A2(
								$elm$core$List$sortBy,
								A2($elm$core$Basics$composeR, $elm$core$Tuple$second, $elm$core$List$length),
								$elm$core$Dict$toList(model.openPRsByRepo)))))),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('dashboard-pane side-pane')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('page-header')
							]),
						_List_fromArray(
							[
								$capitalist$elm_octicons$Octicons$person($author$project$Main$octiconOpts),
								$elm$html$Html$text('Assignments')
							])),
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('leaderboard')
							]),
						A2($elm$core$List$map, $author$project$Main$viewLeaderboardEntry, leaderboard))
					]))
			]));
};
var $elm$url$Url$Builder$toQueryPair = function (_v0) {
	var key = _v0.a;
	var value = _v0.b;
	return key + ('=' + value);
};
var $elm$url$Url$Builder$toQuery = function (parameters) {
	if (!parameters.b) {
		return '';
	} else {
		return '?' + A2(
			$elm$core$String$join,
			'&',
			A2($elm$core$List$map, $elm$url$Url$Builder$toQueryPair, parameters));
	}
};
var $elm$url$Url$Builder$absolute = F2(
	function (pathSegments, parameters) {
		return '/' + (A2($elm$core$String$join, '/', pathSegments) + $elm$url$Url$Builder$toQuery(parameters));
	});
var $author$project$ReleaseStatus$branchName = function (_v0) {
	var ref = _v0.ref;
	return A3(
		$elm$core$String$replace,
		'refs/heads/',
		'',
		A2($elm$core$Maybe$withDefault, 'impossible', ref));
};
var $elm$html$Html$code = _VirtualDom_node('code');
var $justinmimbs$time_extra$Time$Extra$Day = {$: 'Day'};
var $justinmimbs$time_extra$Time$Extra$Millisecond = {$: 'Millisecond'};
var $justinmimbs$time_extra$Time$Extra$Month = {$: 'Month'};
var $justinmimbs$time_extra$Time$Extra$toFractionalDay = F2(
	function (zone, posix) {
		return A2($justinmimbs$time_extra$Time$Extra$timeFromPosix, zone, posix) / 86400000;
	});
var $justinmimbs$time_extra$Time$Extra$toMonths = F2(
	function (zone, posix) {
		var wholeMonths = (12 * (A2($elm$time$Time$toYear, zone, posix) - 1)) + ($justinmimbs$date$Date$monthToNumber(
			A2($elm$time$Time$toMonth, zone, posix)) - 1);
		var fractionalMonth = (A2($elm$time$Time$toDay, zone, posix) + A2($justinmimbs$time_extra$Time$Extra$toFractionalDay, zone, posix)) / 100;
		return wholeMonths + fractionalMonth;
	});
var $justinmimbs$time_extra$Time$Extra$toRataDieMoment = F2(
	function (zone, posix) {
		return $justinmimbs$date$Date$toRataDie(
			A2($justinmimbs$date$Date$fromPosix, zone, posix)) + A2($justinmimbs$time_extra$Time$Extra$toFractionalDay, zone, posix);
	});
var $justinmimbs$time_extra$Time$Extra$diff = F4(
	function (interval, zone, posix1, posix2) {
		diff:
		while (true) {
			switch (interval.$) {
				case 'Millisecond':
					return $elm$time$Time$posixToMillis(posix2) - $elm$time$Time$posixToMillis(posix1);
				case 'Second':
					return (A4($justinmimbs$time_extra$Time$Extra$diff, $justinmimbs$time_extra$Time$Extra$Millisecond, zone, posix1, posix2) / 1000) | 0;
				case 'Minute':
					return (A4($justinmimbs$time_extra$Time$Extra$diff, $justinmimbs$time_extra$Time$Extra$Millisecond, zone, posix1, posix2) / 60000) | 0;
				case 'Hour':
					return (A4($justinmimbs$time_extra$Time$Extra$diff, $justinmimbs$time_extra$Time$Extra$Millisecond, zone, posix1, posix2) / 3600000) | 0;
				case 'Day':
					return (A2($justinmimbs$time_extra$Time$Extra$toRataDieMoment, zone, posix2) - A2($justinmimbs$time_extra$Time$Extra$toRataDieMoment, zone, posix1)) | 0;
				case 'Month':
					return (A2($justinmimbs$time_extra$Time$Extra$toMonths, zone, posix2) - A2($justinmimbs$time_extra$Time$Extra$toMonths, zone, posix1)) | 0;
				case 'Year':
					return (A4($justinmimbs$time_extra$Time$Extra$diff, $justinmimbs$time_extra$Time$Extra$Month, zone, posix1, posix2) / 12) | 0;
				case 'Quarter':
					return (A4($justinmimbs$time_extra$Time$Extra$diff, $justinmimbs$time_extra$Time$Extra$Month, zone, posix1, posix2) / 3) | 0;
				case 'Week':
					return (A4($justinmimbs$time_extra$Time$Extra$diff, $justinmimbs$time_extra$Time$Extra$Day, zone, posix1, posix2) / 7) | 0;
				default:
					var weekday = interval;
					var $temp$interval = $justinmimbs$time_extra$Time$Extra$Week,
						$temp$zone = zone,
						$temp$posix1 = A3($justinmimbs$time_extra$Time$Extra$floor, weekday, zone, posix1),
						$temp$posix2 = A3($justinmimbs$time_extra$Time$Extra$floor, weekday, zone, posix2);
					interval = $temp$interval;
					zone = $temp$zone;
					posix1 = $temp$posix1;
					posix2 = $temp$posix2;
					continue diff;
			}
		}
	});
var $ryannhg$date_format$DateFormat$DayOfMonthSuffix = {$: 'DayOfMonthSuffix'};
var $ryannhg$date_format$DateFormat$dayOfMonthSuffix = $ryannhg$date_format$DateFormat$DayOfMonthSuffix;
var $ryannhg$date_format$DateFormat$MonthNameFull = {$: 'MonthNameFull'};
var $ryannhg$date_format$DateFormat$monthNameFull = $ryannhg$date_format$DateFormat$MonthNameFull;
var $ryannhg$date_format$DateFormat$YearNumber = {$: 'YearNumber'};
var $ryannhg$date_format$DateFormat$yearNumber = $ryannhg$date_format$DateFormat$YearNumber;
var $author$project$ReleaseStatus$dueDate = _List_fromArray(
	[
		$ryannhg$date_format$DateFormat$monthNameFull,
		$ryannhg$date_format$DateFormat$text(' '),
		$ryannhg$date_format$DateFormat$dayOfMonthSuffix,
		$ryannhg$date_format$DateFormat$text(' '),
		$ryannhg$date_format$DateFormat$yearNumber
	]);
var $capitalist$elm_octicons$Octicons$gitBranchPath = 'M10,5 C10,3.89 9.11,3 8,3 C6.89,3 6,3.89 6,5 C6,5.73 6.41,6.38 7,6.72 L7,7.02 C6.98,7.54 6.77,8 6.37,8.4 C5.97,8.8 5.51,9.01 4.99,9.03 C4.16,9.05 3.51,9.19 2.99,9.48 L2.99,4.72 C3.58,4.38 3.99,3.74 3.99,3 C3.99,1.89 3.1,1 1.99,1 C0.88,1 0,1.89 0,3 C0,3.73 0.41,4.38 1,4.72 L1,11.28 C0.41,11.63 0,12.27 0,13 C0,14.11 0.89,15 2,15 C3.11,15 4,14.11 4,13 C4,12.47 3.8,12 3.47,11.64 C3.56,11.58 3.95,11.23 4.06,11.17 C4.31,11.06 4.62,11 5,11 C6.05,10.95 6.95,10.55 7.75,9.75 C8.55,8.95 8.95,7.77 9,6.73 L8.98,6.73 C9.59,6.37 10,5.73 10,5 L10,5 Z M2,1.8 C2.66,1.8 3.2,2.35 3.2,3 C3.2,3.65 2.65,4.2 2,4.2 C1.35,4.2 0.8,3.65 0.8,3 C0.8,2.35 1.35,1.8 2,1.8 L2,1.8 Z M2,14.21 C1.34,14.21 0.8,13.66 0.8,13.01 C0.8,12.36 1.35,11.81 2,11.81 C2.65,11.81 3.2,12.36 3.2,13.01 C3.2,13.66 2.65,14.21 2,14.21 L2,14.21 Z M8,6.21 C7.34,6.21 6.8,5.66 6.8,5.01 C6.8,4.36 7.35,3.81 8,3.81 C8.65,3.81 9.2,4.36 9.2,5.01 C9.2,5.66 8.65,6.21 8,6.21 L8,6.21 Z';
var $capitalist$elm_octicons$Octicons$gitBranch = A3($capitalist$elm_octicons$Octicons$pathIconWithOptions, $capitalist$elm_octicons$Octicons$gitBranchPath, '0 0 10 16', 'gitBranch');
var $author$project$ReleaseStatus$labelColorByName = F2(
	function (model, name) {
		var mlabel = A2(
			$elm$core$Maybe$andThen,
			function (id) {
				return A2($elm$core$Dict$get, id, model.allLabels);
			},
			A2(
				$elm$core$Maybe$andThen,
				A2($elm$core$Basics$composeL, $elm$core$List$head, $elm$core$Dict$values),
				A2($elm$core$Dict$get, name, model.labelToRepoToId)));
		if (mlabel.$ === 'Just') {
			var label = mlabel.a;
			return '#' + label.color;
		} else {
			return '#ff00ff';
		}
	});
var $author$project$ReleaseStatus$octiconOpts = $capitalist$elm_octicons$Octicons$defaultOptions;
var $ryannhg$date_format$DateFormat$Relative$defaultInSomeDays = function (days) {
	return (days < 2) ? 'tomorrow' : ('in ' + ($elm$core$String$fromInt(days) + ' days'));
};
var $ryannhg$date_format$DateFormat$Relative$defaultInSomeHours = function (hours) {
	return (hours < 2) ? 'in an hour' : ('in ' + ($elm$core$String$fromInt(hours) + ' hours'));
};
var $ryannhg$date_format$DateFormat$Relative$defaultInSomeMinutes = function (minutes) {
	return (minutes < 2) ? 'in a minute' : ('in ' + ($elm$core$String$fromInt(minutes) + ' minutes'));
};
var $ryannhg$date_format$DateFormat$Relative$defaultInSomeMonths = function (months) {
	return (months < 2) ? 'in a month' : ('in ' + ($elm$core$String$fromInt(months) + ' months'));
};
var $ryannhg$date_format$DateFormat$Relative$defaultInSomeSeconds = function (seconds) {
	return (seconds < 30) ? 'in a few seconds' : ('in ' + ($elm$core$String$fromInt(seconds) + ' seconds'));
};
var $ryannhg$date_format$DateFormat$Relative$defaultInSomeYears = function (years) {
	return (years < 2) ? 'in a year' : ('in ' + ($elm$core$String$fromInt(years) + ' years'));
};
var $ryannhg$date_format$DateFormat$Relative$defaultRightNow = 'right now';
var $ryannhg$date_format$DateFormat$Relative$defaultSomeDaysAgo = function (days) {
	return (days < 2) ? 'yesterday' : ($elm$core$String$fromInt(days) + ' days ago');
};
var $ryannhg$date_format$DateFormat$Relative$defaultSomeHoursAgo = function (hours) {
	return (hours < 2) ? 'an hour ago' : ($elm$core$String$fromInt(hours) + ' hours ago');
};
var $ryannhg$date_format$DateFormat$Relative$defaultSomeMinutesAgo = function (minutes) {
	return (minutes < 2) ? 'a minute ago' : ($elm$core$String$fromInt(minutes) + ' minutes ago');
};
var $ryannhg$date_format$DateFormat$Relative$defaultSomeMonthsAgo = function (months) {
	return (months < 2) ? 'last month' : ($elm$core$String$fromInt(months) + ' months ago');
};
var $ryannhg$date_format$DateFormat$Relative$defaultSomeSecondsAgo = function (seconds) {
	return (seconds < 30) ? 'just now' : ($elm$core$String$fromInt(seconds) + ' seconds ago');
};
var $ryannhg$date_format$DateFormat$Relative$defaultSomeYearsAgo = function (years) {
	return (years < 2) ? 'last year' : ($elm$core$String$fromInt(years) + ' years ago');
};
var $ryannhg$date_format$DateFormat$Relative$defaultRelativeOptions = {inSomeDays: $ryannhg$date_format$DateFormat$Relative$defaultInSomeDays, inSomeHours: $ryannhg$date_format$DateFormat$Relative$defaultInSomeHours, inSomeMinutes: $ryannhg$date_format$DateFormat$Relative$defaultInSomeMinutes, inSomeMonths: $ryannhg$date_format$DateFormat$Relative$defaultInSomeMonths, inSomeSeconds: $ryannhg$date_format$DateFormat$Relative$defaultInSomeSeconds, inSomeYears: $ryannhg$date_format$DateFormat$Relative$defaultInSomeYears, rightNow: $ryannhg$date_format$DateFormat$Relative$defaultRightNow, someDaysAgo: $ryannhg$date_format$DateFormat$Relative$defaultSomeDaysAgo, someHoursAgo: $ryannhg$date_format$DateFormat$Relative$defaultSomeHoursAgo, someMinutesAgo: $ryannhg$date_format$DateFormat$Relative$defaultSomeMinutesAgo, someMonthsAgo: $ryannhg$date_format$DateFormat$Relative$defaultSomeMonthsAgo, someSecondsAgo: $ryannhg$date_format$DateFormat$Relative$defaultSomeSecondsAgo, someYearsAgo: $ryannhg$date_format$DateFormat$Relative$defaultSomeYearsAgo};
var $ryannhg$date_format$DateFormat$Relative$RelativeTimeFunctions = F6(
	function (seconds, minutes, hours, days, months, years) {
		return {days: days, hours: hours, minutes: minutes, months: months, seconds: seconds, years: years};
	});
var $ryannhg$date_format$DateFormat$Relative$relativeTimeWithFunctions = F3(
	function (zone, millis, functions) {
		var seconds = (millis / 1000) | 0;
		var posix = $elm$time$Time$millisToPosix(millis);
		var minutes = (seconds / 60) | 0;
		var hours = (minutes / 60) | 0;
		var days = (hours / 24) | 0;
		return (minutes < 1) ? functions.seconds(
			A2($elm$time$Time$toSecond, zone, posix)) : ((hours < 1) ? functions.minutes(
			A2($elm$time$Time$toMinute, zone, posix)) : ((hours < 24) ? functions.hours(
			A2($elm$time$Time$toHour, zone, posix)) : ((days < 30) ? functions.days(days) : ((days < 365) ? functions.months((days / 30) | 0) : functions.years((days / 365) | 0)))));
	});
var $ryannhg$date_format$DateFormat$Relative$toMilliseconds = $elm$time$Time$posixToMillis;
var $ryannhg$date_format$DateFormat$Relative$relativeTimeWithOptions = F3(
	function (options, start, end) {
		var differenceInMilliseconds = $ryannhg$date_format$DateFormat$Relative$toMilliseconds(end) - $ryannhg$date_format$DateFormat$Relative$toMilliseconds(start);
		return (!differenceInMilliseconds) ? options.rightNow : A3(
			$ryannhg$date_format$DateFormat$Relative$relativeTimeWithFunctions,
			$elm$time$Time$utc,
			$elm$core$Basics$abs(differenceInMilliseconds),
			(differenceInMilliseconds < 0) ? A6($ryannhg$date_format$DateFormat$Relative$RelativeTimeFunctions, options.someSecondsAgo, options.someMinutesAgo, options.someHoursAgo, options.someDaysAgo, options.someMonthsAgo, options.someYearsAgo) : A6($ryannhg$date_format$DateFormat$Relative$RelativeTimeFunctions, options.inSomeSeconds, options.inSomeMinutes, options.inSomeHours, options.inSomeDays, options.inSomeMonths, options.inSomeYears));
	});
var $ryannhg$date_format$DateFormat$Relative$relativeTime = $ryannhg$date_format$DateFormat$Relative$relativeTimeWithOptions($ryannhg$date_format$DateFormat$Relative$defaultRelativeOptions);
var $author$project$ReleaseStatus$releaseName = function (rel) {
	var _v0 = A2($elm$core$Maybe$withDefault, '', rel.name);
	if (_v0 === '') {
		return A2(
			$elm$core$Maybe$withDefault,
			'release',
			A2(
				$elm$core$Maybe$map,
				function ($) {
					return $.name;
				},
				rel.tag));
	} else {
		var name = _v0;
		return name;
	}
};
var $elm$url$Url$Builder$QueryParameter = F2(
	function (a, b) {
		return {$: 'QueryParameter', a: a, b: b};
	});
var $elm$url$Url$Builder$string = F2(
	function (key, value) {
		return A2(
			$elm$url$Url$Builder$QueryParameter,
			$elm$url$Url$percentEncode(key),
			$elm$url$Url$percentEncode(value));
	});
var $author$project$ReleaseStatus$viewMetric = F5(
	function (icon, count, plural, singular, description) {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('metric')
				]),
			_List_fromArray(
				[
					icon,
					A2(
					$elm$html$Html$span,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('count')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text(
							$elm$core$String$fromInt(count))
						])),
					$elm$html$Html$text(' '),
					$elm$html$Html$text(
					(count === 1) ? singular : plural),
					$elm$html$Html$text(' '),
					$elm$html$Html$text(description)
				]));
	});
var $author$project$ReleaseStatus$view = F2(
	function (model, sir) {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('card release')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('card-body')
						]),
					_List_fromArray(
						[
							function () {
							var _v0 = _Utils_Tuple2(sir.milestone, sir.ref);
							if (_v0.a.$ === 'Just') {
								var nm = _v0.a.a;
								return A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('release-title')
										]),
									_List_fromArray(
										[
											$capitalist$elm_octicons$Octicons$milestone($author$project$ReleaseStatus$octiconOpts),
											A2(
											$elm$html$Html$a,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('title-link'),
													$elm$html$Html$Attributes$href(
													A2(
														$elm$url$Url$Builder$absolute,
														_List_fromArray(
															['releases', sir.repo.name]),
														_List_fromArray(
															[
																A2($elm$url$Url$Builder$string, 'milestone', nm.title)
															])))
												]),
											_List_fromArray(
												[
													$elm$html$Html$text(nm.title)
												]))
										]));
							} else {
								if (_v0.b.$ === 'Just') {
									var _v1 = _v0.a;
									var ref = _v0.b.a;
									return A2(
										$elm$html$Html$div,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('release-title')
											]),
										_List_fromArray(
											[
												A2(
												$elm$html$Html$a,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$class('title-link'),
														$elm$html$Html$Attributes$href(
														A2(
															$elm$url$Url$Builder$absolute,
															_List_fromArray(
																['releases', sir.repo.name]),
															_List_fromArray(
																[
																	A2($elm$url$Url$Builder$string, 'ref', ref)
																])))
													]),
												_List_fromArray(
													[
														$capitalist$elm_octicons$Octicons$gitBranch($author$project$ReleaseStatus$octiconOpts),
														A2(
														$elm$html$Html$code,
														_List_Nil,
														_List_fromArray(
															[
																$elm$html$Html$text(
																$author$project$ReleaseStatus$branchName(sir))
															]))
													]))
											]));
								} else {
									return $elm$html$Html$text('impossible');
								}
							}
						}(),
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('release-ownership')
								]),
							_List_fromArray(
								[
									function () {
									var _v2 = sir.issue;
									if (_v2.$ === 'Nothing') {
										return A2(
											$elm$html$Html$div,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('actor-placeholder')
												]),
											_List_fromArray(
												[
													$capitalist$elm_octicons$Octicons$person($author$project$ReleaseStatus$octiconOpts)
												]));
									} else {
										var issue = _v2.a;
										return A2(
											$elm$html$Html$div,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('release-issue')
												]),
											_List_fromArray(
												[
													function () {
													var _v3 = A2(
														$elm_community$maybe_extra$Maybe$Extra$or,
														$elm$core$List$head(issue.assignees),
														issue.author);
													if (_v3.$ === 'Nothing') {
														return $elm$html$Html$text('missing owner');
													} else {
														var user = _v3.a;
														return A2(
															$elm$html$Html$img,
															_List_fromArray(
																[
																	$elm$html$Html$Attributes$class('release-avatar'),
																	$elm$html$Html$Attributes$src(user.avatar)
																]),
															_List_Nil);
													}
												}(),
													A2(
													$elm$html$Html$a,
													_List_fromArray(
														[
															$elm$html$Html$Attributes$class('issue-number'),
															$elm$html$Html$Attributes$href(issue.url),
															$elm$html$Html$Attributes$target('_blank')
														]),
													_List_fromArray(
														[
															$elm$html$Html$text('#'),
															$elm$html$Html$text(
															$elm$core$String$fromInt(issue.number))
														]))
												]));
									}
								}()
								])),
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('release-metrics')
								]),
							_List_fromArray(
								[
									function () {
									var _v4 = sir.ref;
									if (_v4.$ === 'Just') {
										return A2(
											$elm$html$Html$div,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('metric')
												]),
											_List_fromArray(
												[
													$capitalist$elm_octicons$Octicons$gitBranch($author$project$ReleaseStatus$octiconOpts),
													A2(
													$elm$html$Html$a,
													_List_fromArray(
														[
															$elm$html$Html$Attributes$class('title-link'),
															$elm$html$Html$Attributes$href(
															sir.repo.url + ('/tree/' + $author$project$ReleaseStatus$branchName(sir))),
															$elm$html$Html$Attributes$target('_blank')
														]),
													_List_fromArray(
														[
															A2(
															$elm$html$Html$code,
															_List_Nil,
															_List_fromArray(
																[
																	$elm$html$Html$text(
																	$author$project$ReleaseStatus$branchName(sir))
																]))
														]))
												]));
									} else {
										return $elm$html$Html$text('');
									}
								}(),
									function () {
									var _v5 = A2(
										$elm$core$Maybe$andThen,
										function ($) {
											return $.dueOn;
										},
										sir.milestone);
									if (_v5.$ === 'Just') {
										var dueOn = _v5.a;
										return A2(
											$elm$html$Html$div,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('metric'),
													$elm$html$Html$Attributes$classList(
													_List_fromArray(
														[
															_Utils_Tuple2(
															'overdue',
															_Utils_cmp(
																$elm$time$Time$posixToMillis(model.currentTime),
																$elm$time$Time$posixToMillis(dueOn)) > 0)
														]))
												]),
											_List_fromArray(
												[
													$capitalist$elm_octicons$Octicons$calendar($author$project$ReleaseStatus$octiconOpts),
													$elm$html$Html$text(
													A3($ryannhg$date_format$DateFormat$format, $author$project$ReleaseStatus$dueDate, $elm$time$Time$utc, dueOn))
												]));
									} else {
										return $elm$html$Html$text('');
									}
								}(),
									function () {
									var _v6 = sir.lastRelease;
									if (_v6.$ === 'Just') {
										var rel = _v6.a;
										return A2(
											$elm$html$Html$div,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('metric'),
													$elm$html$Html$Attributes$classList(
													_List_fromArray(
														[
															_Utils_Tuple2(
															'overdue',
															A4($justinmimbs$time_extra$Time$Extra$diff, $justinmimbs$time_extra$Time$Extra$Week, $elm$time$Time$utc, rel.createdAt, model.currentTime) >= 3)
														]))
												]),
											_List_fromArray(
												[
													$capitalist$elm_octicons$Octicons$tag($author$project$ReleaseStatus$octiconOpts),
													A2(
													$elm$html$Html$a,
													_List_fromArray(
														[
															$elm$html$Html$Attributes$class('title-link'),
															$elm$html$Html$Attributes$href(rel.url),
															$elm$html$Html$Attributes$target('_blank')
														]),
													_List_fromArray(
														[
															$elm$html$Html$text(
															$author$project$ReleaseStatus$releaseName(rel))
														])),
													$elm$html$Html$text(' was '),
													$elm$html$Html$text(
													A2($ryannhg$date_format$DateFormat$Relative$relativeTime, model.currentTime, rel.createdAt))
												]));
									} else {
										return $elm$html$Html$text('');
									}
								}(),
									A5(
									$author$project$ReleaseStatus$viewMetric,
									$capitalist$elm_octicons$Octicons$gitCommit(
										_Utils_update(
											$author$project$ReleaseStatus$octiconOpts,
											{color: $author$project$Colors$gray})),
									sir.totalCommits,
									'commits',
									'commit',
									'since last release'),
									A5(
									$author$project$ReleaseStatus$viewMetric,
									$capitalist$elm_octicons$Octicons$gitPullRequest(
										_Utils_update(
											$author$project$ReleaseStatus$octiconOpts,
											{color: $author$project$Colors$purple})),
									$elm$core$List$length(sir.doneCards),
									'issues/PRs need',
									'issue/PR needs',
									'documentation'),
									$elm$core$List$isEmpty(sir.openIssues) ? $elm$html$Html$text('') : A5(
									$author$project$ReleaseStatus$viewMetric,
									$capitalist$elm_octicons$Octicons$issueOpened(
										_Utils_update(
											$author$project$ReleaseStatus$octiconOpts,
											{color: $author$project$Colors$gray})),
									$elm$core$List$length(sir.openIssues),
									'open issues/PRs',
									'open issue/PR',
									'in milestone')
								])),
							$author$project$ProgressBar$view(
							_List_fromArray(
								[
									_Utils_Tuple2(
									A2($author$project$ReleaseStatus$labelColorByName, model, 'release/no-impact'),
									$elm$core$List$length(sir.noImpactCards)),
									_Utils_Tuple2(
									A2($author$project$ReleaseStatus$labelColorByName, model, 'release/undocumented'),
									$elm$core$List$length(sir.undocumentedCards)),
									_Utils_Tuple2(
									A2($author$project$ReleaseStatus$labelColorByName, model, 'release/documented'),
									$elm$core$List$length(sir.documentedCards)),
									_Utils_Tuple2(
									$author$project$Colors$purple,
									$elm$core$List$length(sir.doneCards)),
									_Utils_Tuple2(
									$author$project$Colors$gray200,
									$elm$core$List$length(sir.openPRs)),
									_Utils_Tuple2(
									$author$project$Colors$gray200,
									$elm$core$List$length(sir.openIssues))
								]))
						]))
				]));
	});
var $author$project$Main$viewLabelByName = F2(
	function (model, name) {
		var mlabel = A2(
			$elm$core$Maybe$andThen,
			function (id) {
				return A2($elm$core$Dict$get, id, model.allLabels);
			},
			A2(
				$elm$core$Maybe$andThen,
				A2($elm$core$Basics$composeL, $elm$core$List$head, $elm$core$Dict$values),
				A2($elm$core$Dict$get, name, model.labelToRepoToId)));
		if (mlabel.$ === 'Just') {
			var label = mlabel.a;
			return A2($author$project$Label$view, model, label);
		} else {
			return $elm$html$Html$text('missing label: ' + name);
		}
	});
var $author$project$Main$viewReleasePage = F2(
	function (model, sir) {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('page-content')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('release-repo-header')
						]),
					_List_fromArray(
						[
							$capitalist$elm_octicons$Octicons$repo($author$project$Main$octiconOpts),
							$elm$html$Html$text(sir.repo.name)
						])),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('single-release')
						]),
					_List_fromArray(
						[
							A2($author$project$ReleaseStatus$view, model, sir)
						])),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('fixed-columns')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('fixed-column')
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('column-title')
										]),
									_List_fromArray(
										[
											$capitalist$elm_octicons$Octicons$issueOpened($author$project$Main$octiconOpts),
											A2(
											$elm$html$Html$span,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('column-name')
												]),
											_List_fromArray(
												[
													$elm$html$Html$text('Open Issues')
												]))
										])),
									A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('cards')
										]),
									A2(
										$elm$core$List$map,
										A2($author$project$CardView$viewCard, model, _List_Nil),
										_Utils_ap(sir.openPRs, sir.openIssues)))
								])),
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('fixed-column')
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('column-title')
										]),
									_List_fromArray(
										[
											$capitalist$elm_octicons$Octicons$question($author$project$Main$octiconOpts),
											A2(
											$elm$html$Html$span,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('column-name')
												]),
											_List_fromArray(
												[
													$elm$html$Html$text('Needs Documentation')
												]))
										])),
									A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('cards')
										]),
									A2(
										$elm$core$List$map,
										A2($author$project$CardView$viewCard, model, _List_Nil),
										sir.doneCards))
								])),
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('fixed-column')
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('column-title')
										]),
									_List_fromArray(
										[
											A2(
											$elm$html$Html$span,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('column-name')
												]),
											_List_fromArray(
												[
													A2($author$project$Main$viewLabelByName, model, 'release/documented')
												]))
										])),
									A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('cards')
										]),
									A2(
										$elm$core$List$map,
										A2($author$project$CardView$viewCard, model, _List_Nil),
										sir.documentedCards))
								])),
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('fixed-column')
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('column-title')
										]),
									_List_fromArray(
										[
											A2(
											$elm$html$Html$span,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('column-name')
												]),
											_List_fromArray(
												[
													A2($author$project$Main$viewLabelByName, model, 'release/undocumented')
												]))
										])),
									A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('cards')
										]),
									A2(
										$elm$core$List$map,
										A2($author$project$CardView$viewCard, model, _List_Nil),
										sir.undocumentedCards))
								])),
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('fixed-column')
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('column-title')
										]),
									_List_fromArray(
										[
											A2(
											$elm$html$Html$span,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('column-name')
												]),
											_List_fromArray(
												[
													A2($author$project$Main$viewLabelByName, model, 'release/no-impact')
												]))
										])),
									A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('cards')
										]),
									A2(
										$elm$core$List$map,
										A2($author$project$CardView$viewCard, model, _List_Nil),
										sir.noImpactCards))
								]))
						]))
				]));
	});
var $author$project$Main$compareReleaseStatus = F2(
	function (a, b) {
		var _v0 = _Utils_Tuple2(a.milestone, b.milestone);
		if (_v0.a.$ === 'Just') {
			if (_v0.b.$ === 'Just') {
				var am = _v0.a.a;
				var bm = _v0.b.a;
				return A2($elm$core$Basics$compare, am.title, bm.title);
			} else {
				var _v1 = _v0.b;
				return $elm$core$Basics$GT;
			}
		} else {
			if (_v0.b.$ === 'Just') {
				var _v2 = _v0.a;
				return $elm$core$Basics$LT;
			} else {
				var _v3 = _v0.a;
				var _v4 = _v0.b;
				var _v5 = _Utils_Tuple2(a.ref, b.ref);
				if ((_v5.a.$ === 'Just') && (_v5.b.$ === 'Just')) {
					var ar = _v5.a.a;
					var br = _v5.b.a;
					return A2($elm$core$Basics$compare, ar, br);
				} else {
					return $elm$core$Basics$EQ;
				}
			}
		}
	});
var $author$project$Main$viewReleasesPage = function (model) {
	var viewRepoReleases = F2(
		function (repoName, releases) {
			return A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('repo-releases')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('release-repo-header')
							]),
						_List_fromArray(
							[
								$capitalist$elm_octicons$Octicons$repo($author$project$Main$octiconOpts),
								$elm$html$Html$text(repoName)
							])),
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('releases')
							]),
						function (x) {
							return _Utils_ap(
								x,
								A2(
									$elm$core$List$repeat,
									5,
									A2(
										$elm$html$Html$div,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('release-even-columns-hack')
											]),
										_List_Nil)));
						}(
							A2(
								$elm$core$List$map,
								$author$project$ReleaseStatus$view(model),
								$elm$core$List$reverse(
									A2($elm$core$List$sortWith, $author$project$Main$compareReleaseStatus, releases)))))
					]));
		});
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('page-content')
			]),
		$elm$core$Dict$values(
			A2($elm$core$Dict$map, viewRepoReleases, model.repoReleaseStatuses)));
};
var $author$project$Main$viewPage = function (model) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('main-content')
			]),
		_List_fromArray(
			[
				function () {
				var _v0 = model.page;
				switch (_v0.$) {
					case 'AllProjectsPage':
						return $author$project$Main$viewAllProjectsPage(model);
					case 'GlobalGraphPage':
						return $author$project$Main$viewGlobalGraphPage(model);
					case 'ProjectPage':
						var id = _v0.a;
						var _v1 = A2($elm$core$Dict$get, id, model.projects);
						if (_v1.$ === 'Just') {
							var project = _v1.a;
							return A2($author$project$Main$viewProjectPage, model, project);
						} else {
							return $elm$html$Html$text('project not found');
						}
					case 'ReleasesPage':
						return $author$project$Main$viewReleasesPage(model);
					case 'ReleasePage':
						var repoName = _v0.a;
						var mref = _v0.b;
						var mmilestone = _v0.c;
						return A2(
							$elm$core$Maybe$withDefault,
							$elm$html$Html$text('release not found'),
							A2(
								$elm$core$Maybe$map,
								$author$project$Main$viewReleasePage(model),
								A2(
									$elm$core$Maybe$andThen,
									$elm_community$list_extra$List$Extra$find(
										A2($author$project$Main$matchesRelease, mref, mmilestone)),
									A2($elm$core$Dict$get, repoName, model.repoReleaseStatuses))));
					case 'PullRequestsPage':
						return $author$project$Main$viewPullRequestsPage(model);
					case 'ArchivePage':
						return $author$project$Main$viewArchivePage(model);
					case 'PairsPage':
						return $author$project$Main$viewPairsPage(model);
					default:
						return $elm$html$Html$text('you shouldn\'t see this');
				}
			}()
			]));
};
var $author$project$Main$viewCadet = function (model) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('cadet')
			]),
		_List_fromArray(
			[
				$author$project$Main$viewNavBar(model),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('side-by-side')
					]),
				_List_fromArray(
					[
						$author$project$Main$viewPage(model),
						$author$project$CardOperations$view(model)
					]))
			]));
};
var $author$project$Main$view = function (model) {
	return {
		body: _List_fromArray(
			[
				$author$project$Main$viewCadet(model)
			]),
		title: $author$project$Main$pageTitle(model)
	};
};
var $author$project$Main$main = $elm$browser$Browser$application(
	{init: $author$project$Main$init, onUrlChange: $author$project$Model$UrlChanged, onUrlRequest: $author$project$Model$LinkClicked, subscriptions: $author$project$Main$subscriptions, update: $author$project$Main$update, view: $author$project$Main$view});
_Platform_export({'Main':{'init':$author$project$Main$main(
	A2(
		$elm$json$Json$Decode$andThen,
		function (initialTime) {
			return $elm$json$Json$Decode$succeed(
				{initialTime: initialTime});
		},
		A2($elm$json$Json$Decode$field, 'initialTime', $elm$json$Json$Decode$int)))(0)}});}(this));