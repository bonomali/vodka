/*
This file is part of Vodka.

Vodka is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Vodka is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with Vodka.  If not, see <https://www.gnu.org/licenses/>.
*/
// test: execution_stepeval_multiple
/*
makes sure that you can simultaneously step evaluate multiple expressions at the same time without either of them "losing their place" in the sequence/stack of execution (i.e. the current step stack is stored at the root expectation for each step execution run)
*/

	// |Shift|~|Shift|+|Shift|~|Shift|+|Shift|#|3|Shift|#|4|Shift|Tab|Shift|~|Shift|+|Shift|#|4|Shift|#|5|Shift|Tab|Tab|Meta|c|v|ArrowUp|Meta|Enter|Enter|Enter|ArrowDown|Meta|Enter|Enter|Enter|Enter|Enter|ArrowUp|Meta|Enter|Enter|Enter|ArrowDown
	
var harness = require('../testharness');

var testactions = [];

testactions.push({
		type:'keydown',
		code:'ShiftRight'
	});
testactions.push({
		type:'keydown',
		code:'Backquote'
	});
testactions.push({
		type:'keyup',
		code:'Backquote'
	});
testactions.push({
		type:'keyup',
		code:'ShiftRight'
	});
testactions.push({
		type:'keydown',
		code:'ShiftLeft'
	});
testactions.push({
		type:'keydown',
		code:'Equal'
	});
testactions.push({
		type:'keyup',
		code:'Equal'
	});
testactions.push({
		type:'keyup',
		code:'ShiftLeft'
	});
testactions.push({
		type:'keydown',
		code:'ShiftRight'
	});
testactions.push({
		type:'keydown',
		code:'Backquote'
	});
testactions.push({
		type:'keyup',
		code:'Backquote'
	});
testactions.push({
		type:'keyup',
		code:'ShiftRight'
	});
testactions.push({
		type:'keydown',
		code:'ShiftLeft'
	});
testactions.push({
		type:'keydown',
		code:'Equal'
	});
testactions.push({
		type:'keyup',
		code:'Equal'
	});
testactions.push({
		type:'keyup',
		code:'ShiftLeft'
	});
testactions.push({
		type:'keydown',
		code:'ShiftRight'
	});
testactions.push({
		type:'keydown',
		code:'Digit3'
	});
testactions.push({
		type:'keyup',
		code:'Digit3'
	});
testactions.push({
		type:'keyup',
		code:'ShiftRight'
	});
testactions.push({
		type:'keydown',
		code:'Digit3'
	});
testactions.push({
		type:'keyup',
		code:'Digit3'
	});
testactions.push({
		type:'keydown',
		code:'ShiftRight'
	});
testactions.push({
		type:'keydown',
		code:'Digit3'
	});
testactions.push({
		type:'keyup',
		code:'Digit3'
	});
testactions.push({
		type:'keyup',
		code:'ShiftRight'
	});
testactions.push({
		type:'keydown',
		code:'Digit4'
	});
testactions.push({
		type:'keyup',
		code:'Digit4'
	});
testactions.push({
		type:'keydown',
		code:'ShiftRight'
	});
testactions.push({
		type:'keydown',
		code:'Tab'
	});
testactions.push({
		type:'keyup',
		code:'Tab'
	});
testactions.push({
		type:'keyup',
		code:'ShiftRight'
	});
testactions.push({
		type:'keydown',
		code:'ShiftRight'
	});
testactions.push({
		type:'keydown',
		code:'Backquote'
	});
testactions.push({
		type:'keyup',
		code:'Backquote'
	});
testactions.push({
		type:'keyup',
		code:'ShiftRight'
	});
testactions.push({
		type:'keydown',
		code:'ShiftLeft'
	});
testactions.push({
		type:'keydown',
		code:'Equal'
	});
testactions.push({
		type:'keyup',
		code:'Equal'
	});
testactions.push({
		type:'keyup',
		code:'ShiftLeft'
	});
testactions.push({
		type:'keydown',
		code:'ShiftRight'
	});
testactions.push({
		type:'keydown',
		code:'Digit3'
	});
testactions.push({
		type:'keyup',
		code:'Digit3'
	});
testactions.push({
		type:'keyup',
		code:'ShiftRight'
	});
testactions.push({
		type:'keydown',
		code:'Digit4'
	});
testactions.push({
		type:'keyup',
		code:'Digit4'
	});
testactions.push({
		type:'keydown',
		code:'ShiftRight'
	});
testactions.push({
		type:'keydown',
		code:'Digit3'
	});
testactions.push({
		type:'keyup',
		code:'Digit3'
	});
testactions.push({
		type:'keyup',
		code:'ShiftRight'
	});
testactions.push({
		type:'keydown',
		code:'Digit5'
	});
testactions.push({
		type:'keyup',
		code:'Digit5'
	});
testactions.push({
		type:'keydown',
		code:'ShiftRight'
	});
testactions.push({
		type:'keydown',
		code:'Tab'
	});
testactions.push({
		type:'keyup',
		code:'Tab'
	});
testactions.push({
		type:'keydown',
		code:'Tab'
	});
testactions.push({
		type:'keyup',
		code:'Tab'
	});
testactions.push({
		type:'keyup',
		code:'ShiftRight'
	});
testactions.push({
		type:'keydown',
		code:'MetaRight'
	});
testactions.push({
		type:'keydown',
		code:'KeyC'
	});
testactions.push({
		type:'keydown',
		code:'KeyV'
	});
testactions.push({
		type:'keyup',
		code:'MetaRight'
	});
testactions.push({
		type:'keydown',
		code:'ArrowUp'
	});
testactions.push({
		type:'keyup',
		code:'ArrowUp'
	});
testactions.push({
		type:'keydown',
		code:'MetaLeft'
	});
testactions.push({
		type:'keydown',
		code:'Enter'
	});
testactions.push({
		type:'keydown',
		code:'Enter'
	});
testactions.push({
		type:'keydown',
		code:'Enter'
	});
testactions.push({
		type:'keyup',
		code:'MetaLeft'
	});
testactions.push({
		type:'keydown',
		code:'ArrowDown'
	});
testactions.push({
		type:'keyup',
		code:'ArrowDown'
	});
testactions.push({
		type:'keydown',
		code:'MetaLeft'
	});
testactions.push({
		type:'keydown',
		code:'Enter'
	});
testactions.push({
		type:'keydown',
		code:'Enter'
	});
testactions.push({
		type:'keydown',
		code:'Enter'
	});
testactions.push({
		type:'keydown',
		code:'Enter'
	});
testactions.push({
		type:'keydown',
		code:'Enter'
	});
testactions.push({
		type:'keyup',
		code:'MetaLeft'
	});
testactions.push({
		type:'keydown',
		code:'ArrowUp'
	});
testactions.push({
		type:'keyup',
		code:'ArrowUp'
	});
testactions.push({
		type:'keydown',
		code:'MetaLeft'
	});
testactions.push({
		type:'keydown',
		code:'Enter'
	});
testactions.push({
		type:'keydown',
		code:'Enter'
	});
testactions.push({
		type:'keydown',
		code:'Enter'
	});
testactions.push({
		type:'keyup',
		code:'MetaLeft'
	});
testactions.push({
		type:'keydown',
		code:'ArrowDown'
	});
testactions.push({
		type:'keyup',
		code:'ArrowDown'
	});

harness.runTest(testactions, 'direct');
