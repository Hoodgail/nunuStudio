# Code Guidelines

- This document defines JavaScript ES5, GLSL and HTML coding rules for booth style and functionality.
- The statements in this document should be followed as strictly as possible.
- If any undefined code situation arises it should be discussed by the development team and the document should be updated.
- Format files with \n as the line ending (Unix line endings). Do not use \r\n (Windows line endings) or \r (Apple OS's). 



## JavaScript

### Formatting

- Code should be indented using tabs (don't use spaces for indentation).
  - Allows each development to configure its IDE to display spacing as preferred.
- Never create local copies of constant values, use the constant values directly.
- Avoid creating functions that are specific to a single use scenario.
- Never create single use variables
  - e.g `var a = 2; abc(a);` write `abc(2);` instead.
- Variables should be always explicitly declared.



### Naming

##### Definitions

- **PascalCase** names capitalize the first letter of each word, including the first.
- **lowerCamelCase** names capitalize the first letter of each word, except the first which is always lowercase, even if it’s an acronym.
- **SCREAMING_CAPS** use only uppercase letters, even for acronyms, and separate words with _.
- Avoid using big names, if a name if composed for more than 3 words simplify it.
- Try to keep names in context but perceptible.
  - E.g. If key belong to module there is no need to call it ModuleKey, Key should be enough.

##### Classes, Interfaces, Types

- Classes, typedefs, and types should use `PascalCase`

##### Namespaces

- Module  namespaces should use `PascalCase` but could in some cases use `SCREAMING_CAPS`

##### Variables, Functions

- Variables and methods should use `camelCase`

- When a function is intended to be called as a constructor function (e.g. with the `new` keyword), apply the same rule used for Classes. 

- Avoid `_` prefixes as much as possible, only used for private attributes of `Classes` if necessary.

- With the exception of temporary variables, such as the occasional `i` and `j` that you might use as the iterator index in a for loop, avoid abbreviating or otherwise obfuscating your variable and function names.

- Avoid prefixing or suffixing variables names with the types that they contain.

  - Instead of `studentArray` or `studentArr`, simply use `students` instead.


##### Static constant attributes

- Static constant attributes of a Class/Interface should use `SCREAMING_CAPS` 

##### Files

- Code files should use `PascalCase` in their name, if a file defines a class is should have the same name as the class that is defines.
- Markdown files use `SCREAMING_CAPS` in their name.
- All folders use `camelCase` in their name.



### Imports

- Place external imports before project file imports.
- Separate import categories using a empty line and try to keep modules from the same package/library together.

```javascript
include("lib/abcdef.js");
include("lib/something.min.js");

include("source/module/Derp.js");
include("source/module/Foo.js");

include("source/anothermodule/Thing.js");
include("source/anothermodule/AnotherThing.js");
```



### Comments

##### Comments

- Comments should always use `//`  when they are single line.
- Multiline comments should be written between `/**/`, without any `*` on the beginning of new lines.
- Never place your comments on the same line as code. Try to place the comment above the code witch the comment refers to.
- All comments should use the same indentation as the code block where they are placed.

```javascript
// This is a single line comment.
var a = 2;

/*
This is a multi line comment.
That does not represent documentation.
*/
```

- Comments should never occupy more than 3 lines.
- References to future tasks, (tasks / functionality that will be implemented later and merger on another PR) should start with the `TODO` word and surrounded by `<>`.

```javascript
// TODO <Add new functionality later here>
```



### Documentation

- Documentation is done using JSDoc format.
- Every methods, properties and attributes of Classes, Types, Enums, Interfaces, etc. public or private needs to be documented.
- The only exception is for getters, setters that don't have any code logic associated and inherited properties.
- Local variables should never be documented, they should instead if necessary use simple comments.
- Always use explicitly the @class, @method, @attribute, @property and @static tags.
- Always leave a empty line between the documentation description the the documentation tags.

```javascript
/**
 * Attribute meta is used to indicate information about a object attribute.
 *
 * It is used to create automatically forms to edit the object attributes.
 *
 * @class AttributeMeta
 */
function AttributeMeta(name, type, units, editable)
{
	/**
	 * Name of the attribute.
	 *
	 * @attribute name
	 * @type {String}
	 */
	this.name = name;

	/** 
	 * Indicates if the attribute is editable.
	 *
	 * @attribute editable
	 * @type {Boolean}
	 */
	this.editable = editable !== undefined ? editable : true;
}

/**
 * Attribute defines a distance value.
 *
 * The base unit for all distances is meter.
 *
 * @static
 * @type {Number}
 * @attribute DISTANCE
 */
AttributeMeta.DISTANCE = 201;
```



### Exceptions

- Empty exception handlers should be avoided as much as possible. Use only when strictly necessary.
- If a method requires a error to be handled externally it should throw an Error.
- Error situations should never come as a returned value. Throw an exception to be handled externally instead.
- Always threat exceptions at some level, exceptions can cause the program to stop unnecessarily.
- Always assume that the program is running on strict mode. Some errors regarding syntax and reference access are only thrown in this mode.

```javascript
//Unknown variables are created on use if not running on strict mode.
z = 2;
console.log("Ok");

//Access to unknown variables throws a ReferenceError exception.
"use strict";
z = 2;
console.log("Ok");
```

- Be careful some data related problems in JavaScript might or might not throw an error. If there is a possibility of one of these scenarios use defensive programming to avoid them.

```javascript
//Division by 0 does not generate a error result is Infinity.
var a = 2;
var b = 0;
a = a / b; << Infinity

//Access to undefined attributes of an object does returns undefined.
var b = {};
var c = null;
c = b.abc; >> undefined

//Access to attributes of a null or undefined values throws a TypeError exception.
var b = null; //or var b = undefined;
var c = null;
c = b.abc;
```



### Brackets

- Always use curly brackets even when the code inside the condition only has one statement.
  - Should avoid later on breaking down code when adding new lines.
- Curly brackets should always be placed after the statement on the same line.

```javascript
if(isWeekDay)
{
	print("Bike to work!");
}
```



### Control Statements

- Never place a space between the i`f, for, while` and the condition being defined.
- On `if...else` chained control statements the following statement should start on a new line.
- Prefer to explicitly check the `Boolean` value stored in variables.

```javascript
if(isWeekDay === true)
{
  console.log("Bike to work!");
}
else
{
  console.log("Go dancing or read a book!");
}

```

- On loop statements never store the length of the array up ahead, unless it is necessary.
- Avoid for loops with empty statement use a while loop instead.
- Place brackets on for every `switch` case, even when it only have a single line.
- Only use `switch` where there are multiple cases that can be true from a single value, avoid single options case switches.



### Variable Scopes

- Avoid declaring variables within blocks inside of functions, and instead declare them at the top of each function.
- Avoid creating unnecessary blocks. An non-control structure block, such as the one above, should be avoided. Sometimes blocks are necessary, such as when there is a control structure that requires it.
- If necessary store the reference to `this` in a variable called `self`. Declared on top of the code block that requires it.



### Variables

- Always declare variables on their own line unless they are being declared in a control statement.

```javascript
var text = "abc";
var counter = 0;

for(var i = 0, j= 0;  i < x && j < y; i++; j++)
{
    counter++;
}
```



### Functions

- If a portion of code is used more than once it must be declared into a function.
- Function should be always declared using the keyword `function`.
- For functions assigned to variables, place a `;` after the closing `}`, for functions that are *not* assigned to variables, do not place a `;` after the closing `}`.

```javascript
var doStuff = function(param, param2)
{
};

function doStuff(param, param2)
{
}
```

- Anonymous function are functions without a name, and named function are those with a name.
  - Assigning an anonymous function to a variable does not make that function a named function.
- Avoid nesting functions unnecessarily, if two functions that can each other can be swapped by a single function, use a single function.

- Functions can use encapsulation to define function private variables (e.g for temporary objects).

```javascript
var exampleFunction = function()
{
	var tempA = 0;
	var tempB = "abc";

	return function(parameter)
	{
		something(tempA);
		
		return tempB;
	};
}();
```



### Classes

- Classes should be declared from functions.
- Static attributes of the class should be attached to a Class defining function.
- The prototype of the `Class` should be the `Class` itself in order to make the Class static method available from the object context.

```javascript
function ThisIsAClass(parameter)
{
	this.attribute = "something";
}

ThisIsAClass.STATIC_CONST = 2;

ThisIsAClass.prototype.methodXPTO = function()
{
	return false;
};

var a = new ThisIsAClass();
a.methodXPTO();
a.attribute = "something else";
```

- Inheritance is achieved by calling the base `Class` constructor on the second `Class` constructor and by copying the base class prototype.

```javascript
function OtherClass(parameter)
{
	BaseClass.call(this, parameter);
}

OtherClass.prototype = Object.create(BaseClass.prototype);

OtherClass.prototype.newMethod = function(mode)
{
    return "abc";
};
```

- Static classes should be built from empty `Functions`.
- Multi type inheritance can be used when necessary but only the first type is actually inherited. (only the first type can be checked using the `instanceof` statement).

```javascript
function OtherClass()
{
	BaseClassA.call(this);
	BaseClassB.call(this);
}

OtherClass.prototype = Object.create(BaseClassA.prototype);
Object.assign(OtherClass.prototype, BaseClassB.prototype);

// "a instanceof BaseClassA" returns true
// "a instanceof BaseClassB" returns false
var a = new OtherClass();
```



### Arrays

- Array declaration should be done using the `[]` syntax.
- If the array size is known use the `new Array(length)` constructor.
- For object that need a explicit type declaration always use a typed array (e.g `Float64Array`, `Int8Array`). Unless strictly necessary to use a normal array (e.g array size is unknown).



### Objects

- Objects should be created from classes when their format is used in more than one place.
- Object declaration can be done in a single line up to 3 attributes, more than 3 attributes and the object declarations should always be spitted into lines.
- Use `{key: "val1", key2: "val2"}` never declare objects as `new Object()`.
- There should never be any space between the curly brackets and the attribute name when writing inline.
- Always access object attributes as obj.attribute, only use obj["attribute"] when using a string variable.
```javascript
methodXPTO({a: 123, b: "abc", c: new Abc()});

var b =
{
    a: 123,
    b: "abc",
    c: new Abc(),
    d: 123
};

var c = {};
```



### Strings

- Prefer always to declare strings using the  `"` character.
- The only exception is when using Template Strings or writing multi line strings.
  - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
- Never build multi line strings by concatenation, use template strings or the `\` char on line splits.



### Semicolons

- Always place semicolons after your code statements.
- Missing ASI (automatic semicolon insertion) can trip new devs e.g. `foo() \n (function(){})` will be a single statement (not two). Recommended by TC39 as well.



### Null vs Undefined

- Always use and check them explicitly. They have different meaning.
- Avoid initializing or manually setting a value or attribute as `undefined`. Instead of setting as `undefined` use the `delete` to actually remove the value.

- Use `null` where its a part of the API or conventional. Never return an `undefined` value, if the output expects an object return a `null` instead in case of error or missing data.

```javascript
// Bad
return undefined;

// Good
return null;
return;
```

- Always explicitly check if objects are `null` or `undefined`.

```javascript
// Bad
if (error == null)
    
// Good
if (error === null || error === undefined)
```



## GLSL

- Declare all the GLSL code inline on your JavaScript code.
- Use precision hints whenever its possible.
  - Colors in the `0.0` to `1.0` range can usually be represented using low precision variables.
  - Position data should usually be stored as high precision.

```c
// Defines precision for float and float-derived (vector/matrix) types.
precision highp float;
// Texture2D() result is lowp.
uniform lowp sampler2D sampler; 
varying lowp vec4 color;
// Uses default highp precision.
varying vec2 texCoord;
```

- Avoid branching instructions when possible
  - Branches are discouraged in shaders, as they can reduce the ability to execute operations in parallel.
  - Use preprocessing for branching in all constant values.
- Avoid and/or eliminate loop instructions as much as possible.
- Be careful when performing vectorial operations. Not all graphics processors include vector processors.

```c
highp float f0, f1;
highp vec4 v0, v1;

//Poor use of vector operators
v0 = (v1 * f0) * f1;

//Proper use of vector operations, run the float multiplications first
v0 = v1 * (f0 * f1);
```

- Avoid Computing Array Indices in Shaders
  - Using indices computed in the shader is more expensive than a constant or uniform array index.



## HTML

- All HTML code must be valid and well formed.
- You must validate it against the HTML specification pertaining to the project you are working on.

- Element and attribute names must be in all lower case:

```html
<!-- Correct -->
<input name="name" type="text" />

<!-- Wrong -->
<input name="name" TYPE="text" />
```

- Non-empty elements must have corresponding closing tags.

```html
<h1>My title</h1>
<p>Some text</p>
```

- Empty elements must be followed by a corresponding closing tag:

```html
<span></span>
```

- Elements with a single tag, such as HR, BR, INPUT, IMG must end with `>`:

```html
<br>
<hr>
<img src="john.jpg" alt="John Doe" width="200" height="100">
```

- Nested elements must be nested appropriately - for example:

```html
<!-- Correct -->
<div>
  <p>Some text</p>
</div>
```

- The `<p>` tag and its corresponding closing tag, `</p>`, are both nested inside the `<div>` and `</div>` tags.

- Attribute values, even numeric attributes should be quoted.

```html
<!-- Correct -->
<input name="age" type="text" size="3" />

<!-- Wrong -->
<input name=age type=text size=3 />
```

- Use tabs for code indentation. Use indentation consistently to enhance the readability of the code.
- When elements carry over more than one line of code, indent the contents of elements between the start tag and the end tag. This will make it easy to see where the element begins and ends.

```html
<div class="container">
  <header class="header">
    <h1>Site Name<span></span></h1>
  </header>
  <!-- / header -->
  <hr>
  <nav class="navigation">
    <ul>
      <li><a href="#">Link</a></li>
      <li><a href="#">Link</a></li>
      <li><a href="#">Link</a></li>
      <li><a href="#">Link</a></li>
      <li><a href="#">Link</a></li>
    </ul>
  </nav>
  <!-- / navigation -->
</div>
<!-- / container -->
```

- Set encoding of HTML document and its charset to UTF-8 Normalization Form C (NFC):

```html
<meta charset="utf-8" />
```

- Use comments when necessary to explain portion of the document. Comments booth are written always between `<!-- something -->` and should be indented to the same level of the HTML block.

``` html
<!-- / name-of-class-or-id -->
```



## References

- Here are a couple of references that may be useful. Some of them were used as base for the style described in this document.
- Couple of articles regarding javascript ES5 patterns
  - http://bguiz.github.io/js-standards/intro/
  - https://eli.thegreenplace.net/2013/10/22/classical-inheritance-in-javascript-es5
- [Khronos OpenGL GLSL recommendations](https://www.khronos.org/opengl/wiki/GLSL_:_recommendations)
- [Apple OpenGL ES Best Practices for Shaders](https://developer.apple.com/library/archive/documentation/3DDrawing/Conceptual/OpenGLES_ProgrammingGuide/BestPracticesforShaders/BestPracticesforShaders.html)
- [W3School HTML style guide](https://www.w3schools.com/html/html5_syntax.asp)
