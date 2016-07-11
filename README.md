# dont-collide

A throttle for functions that calls external sources. Developed in order to prevent "Connection refused" errors.

Use it to prevent collisions and "denial of service" when sending data in a loop to an external source.

* Easy to use and fast to implement
* Ultra lightweight
* Support for sum function return data as array
* Support for function return data to be returned in a callback for each function call

## Basic usage

Use [npm](https://www.npmjs.com/) to install the module:

```
	npm install dont-collide
```

Then use `dontCollide` like this:

```javascript
var dontCollide = require('dont-collide');

var dc = dontCollide();

dc.throttle(
	function(p1, p2, p3) { 
		console.log('Fired: ' + p1 + ' - ' + p2 + ' - ' + p3);	
	}
	,1,2,3);

/*
Outputs

Fired: 1 - 2 - 3

*/
```

## Usage where return data is returned is summed up in an array

```javascript
var dontCollide = require('dont-collide');

let cb = function(results) {
	for(var i = 0; i < results.length; i++){
		console.log("CorrelationId: " + results[i].correlationId + "\nResult: " + results[i].result + "\n\n");
	}
}

var dc = dontCollide({ finalize: cb });

dc.throttle({ correlationId: 20, fn: function(){ return 'Mr. T' }});
dc.throttle({ correlationId: 30, fn: function(){ return 'Face' }});
dc.throttle({ correlationId: 40, fn: function(){ return 'Hannibal' }});

/*
Outputs:

CorrelationId: 20
Result: Mr. T


CorrelationId: 30
Result: Face


CorrelationId: 40
Result: Hannibal
*/
```

## Usage where return data is provided through callback
```javascript
var dontCollide = require('dont-collide');

let cb = (result) => {
		console.log("CorrelationId: " + result.correlationId + "\nResult: " + result.result + "\n\n");
}

var dc = dontCollide();

dc.throttle({ correlationId: 20, fn: function(){ return 'Mr. T' }, callback: cb});
dc.throttle({ correlationId: 30, fn: function(){ return 'Face' }, callback: cb});
dc.throttle({ correlationId: 40, fn: function(){ return 'Hannibal' }, callback: cb});

/*
Outputs:

CorrelationId: 20
Result: Mr. T


CorrelationId: 30
Result: Face


CorrelationId: 40
Result: Hannibal
*/
```
## Instance options

You can of course provide options for setting up dont-collide.

### interval

Number

Default: 1

Time gap in miliseconds between each function call. 

```javascript
var dc = dontCollide({ interval: 1000 });
```
This sets the interval to one call each second.


### finalize

Function

Default: Empty function

The callback function which is called when all function calls are completed.

```javascript
var dc = dontCollide({ finalize: function(results) { console.log(result.correlationId + " - " + result.result); } });
```
This sets the interval to one call each second.


## Throttle options

### correlationId

String or number

Default: 0

An id to recognize your request on. Useful if some function call takes longer than others 

```javascript
dc.throttle({ correlationId: 20, fn: function(){ return 'Mr. T' }});
```

### fn

Function

Required.

The function you wish to execute with throttling

```javascript
dc.throttle({ fn: function(num1, num2){ console.log(num1 + num2) }}, 5, 10);

/*
Outputs

15
*/
```

Actually, if you don't wish to set any other options, you can just send the function alone.

```javascript
dc.throttle(function(num1, num2){ console.log(num1 + num2) }, 5, 10);

/*
Outputs

15
*/
```

You can always pass parameters by sending a parameter list after the options (or your function).


### callback

Function

Default: null

A function that is called with the result for every execution. If this is set for a call to throttle, then the result will not go into the results that is send to the finalize function.

```javascript
dc.throttle({ fn: function(){ return 'Mr. T' }, callback: function(rs){ console.log(rs.result); } });

/*
Outputs

Mr. T
*/
```

# Tests

To run tests on this module, make sure that the modules for the tests are installed

```
	npm install dont-collide --dev
```

Then run:

```
	npm test
```

#Release notes

* 1.0.0 - First working version

#Keywords

* throttle
* throttling
* function queue
* method queue
* queue
* dont-collide

# License

The MIT License (MIT)

Copyright (c) 2016 Thorbjørn Gliese Jelgren (The Right Foot, www.therightfoot.dk)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

