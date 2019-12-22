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
// test: execution_stepeval_if
/*
Special handling for if builtin in step evalution: it should conditionally only eval the second or third arg depending on the result of the first arg eval boolean... this test covers the following cases: first arg true, three cases (executes up to the point where first arg is evaluated, executes up to the point where second arg is evaluated, finishes execution), -- then, we have first arg false, same three cases, then we have first arg is true (and doesn't require an evaluation, i.e. it's already a boolean priimitive), two cases there (the chosen arg to eval either needs eval or doesn't) - then all that again with a boolean false primitive for first arg.
*/

	// |Shift|~|Shift|+|Backspace|i|o|f|Backspace|Backspace|f|Shift|~|Shift|<|Shift|#|3|3|Backspace|Shift|#|4|Shift|Tab|Shift|~|Shift|+|Shift|#|1|Shift|#|1|Shift|Tab|Shift|~|Shift|+|Shift|#|3|Shift|#|3|Shift|Tab|Tab|Meta|c|v|v|Meta|v|Tab|Tab|Backspace|5|Shift|Tab|Tab|Meta|c|v|v|Shift|~|i|f|Shift|!|Shift|#|Shift|~|Shift|+|Shift|#|3|Shift|#|3|Shift|Tab|Tab|Meta|c|v|Tab|ArrowRight|Backspace|ArrowRight|Shift|#|ArrowLeft|ArrowLeft|y|Shift|Tab|ArrowUp|Meta|c|v|Tab|ArrowRight|ArrowRight|Backspace|Backspace|ArrowLeft|ArrowRight|Shift|#|2|0|Shift|Tab|ArrowDown|Meta|c|v|Tab|Tab|Backspace|Backspace|Shift|#|2|0|Shift|Tab|ArrowUp|ArrowUp|ArrowUp|ArrowUp|ArrowUp|ArrowUp|ArrowUp|ArrowUp|ArrowUp|Meta|Enter|Enter|Enter|ArrowDown|Meta|Enter|Enter|Enter|Enter|Enter|ArrowDown|Meta|Enter|Enter|Enter|Enter|Enter|Enter|ArrowDown|Meta|Enter|Enter|Enter|ArrowDown|Meta|Enter|Enter|Enter|Enter|Enter|ArrowDown|Meta|Enter|Enter|Enter|Enter|Enter|Enter|ArrowDown|Meta|Enter|Enter|Meta|Enter|ArrowDown|Meta|Enter|Enter|ArrowDown|Meta|Enter|Enter|Enter|ArrowDown|Meta|Enter|Enter
	
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
		code:'Backspace'
	});
testactions.push({
		type:'keyup',
		code:'Backspace'
	});
testactions.push({
		type:'keydown',
		code:'KeyI'
	});
testactions.push({
		type:'keydown',
		code:'KeyO'
	});
testactions.push({
		type:'keyup',
		code:'KeyI'
	});
testactions.push({
		type:'keyup',
		code:'KeyO'
	});
testactions.push({
		type:'keydown',
		code:'KeyF'
	});
testactions.push({
		type:'keyup',
		code:'KeyF'
	});
testactions.push({
		type:'keydown',
		code:'Backspace'
	});
testactions.push({
		type:'keyup',
		code:'Backspace'
	});
testactions.push({
		type:'keydown',
		code:'Backspace'
	});
testactions.push({
		type:'keydown',
		code:'KeyF'
	});
testactions.push({
		type:'keyup',
		code:'Backspace'
	});
testactions.push({
		type:'keyup',
		code:'KeyF'
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
		code:'Comma'
	});
testactions.push({
		type:'keyup',
		code:'Comma'
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
		code:'Digit3'
	});
testactions.push({
		type:'keyup',
		code:'Digit3'
	});
testactions.push({
		type:'keydown',
		code:'Backspace'
	});
testactions.push({
		type:'keyup',
		code:'Backspace'
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
		code:'Digit1'
	});
testactions.push({
		type:'keyup',
		code:'Digit1'
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
		code:'Digit1'
	});
testactions.push({
		type:'keyup',
		code:'Digit1'
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
		type:'keydown',
		code:'KeyV'
	});
testactions.push({
		type:'keyup',
		code:'MetaRight'
	});
testactions.push({
		type:'keydown',
		code:'MetaRight'
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
		type:'keydown',
		code:'Backspace'
	});
testactions.push({
		type:'keyup',
		code:'Backspace'
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
		type:'keydown',
		code:'KeyV'
	});
testactions.push({
		type:'keyup',
		code:'MetaRight'
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
		code:'KeyI'
	});
testactions.push({
		type:'keydown',
		code:'KeyF'
	});
testactions.push({
		type:'keyup',
		code:'KeyI'
	});
testactions.push({
		type:'keyup',
		code:'KeyF'
	});
testactions.push({
		type:'keydown',
		code:'ShiftRight'
	});
testactions.push({
		type:'keydown',
		code:'Digit1'
	});
testactions.push({
		type:'keyup',
		code:'Digit1'
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
		code:'Tab'
	});
testactions.push({
		type:'keyup',
		code:'Tab'
	});
testactions.push({
		type:'keydown',
		code:'ArrowRight'
	});
testactions.push({
		type:'keyup',
		code:'ArrowRight'
	});
testactions.push({
		type:'keydown',
		code:'Backspace'
	});
testactions.push({
		type:'keyup',
		code:'Backspace'
	});
testactions.push({
		type:'keydown',
		code:'ArrowRight'
	});
testactions.push({
		type:'keyup',
		code:'ArrowRight'
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
		code:'ArrowLeft'
	});
testactions.push({
		type:'keyup',
		code:'ArrowLeft'
	});
testactions.push({
		type:'keydown',
		code:'ArrowLeft'
	});
testactions.push({
		type:'keyup',
		code:'ArrowLeft'
	});
testactions.push({
		type:'keydown',
		code:'KeyY'
	});
testactions.push({
		type:'keyup',
		code:'KeyY'
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
		code:'ArrowUp'
	});
testactions.push({
		type:'keyup',
		code:'ArrowUp'
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
		code:'Tab'
	});
testactions.push({
		type:'keyup',
		code:'Tab'
	});
testactions.push({
		type:'keydown',
		code:'ArrowRight'
	});
testactions.push({
		type:'keyup',
		code:'ArrowRight'
	});
testactions.push({
		type:'keydown',
		code:'ArrowRight'
	});
testactions.push({
		type:'keyup',
		code:'ArrowRight'
	});
testactions.push({
		type:'keydown',
		code:'Backspace'
	});
testactions.push({
		type:'keyup',
		code:'Backspace'
	});
testactions.push({
		type:'keydown',
		code:'Backspace'
	});
testactions.push({
		type:'keyup',
		code:'Backspace'
	});
testactions.push({
		type:'keydown',
		code:'ArrowLeft'
	});
testactions.push({
		type:'keyup',
		code:'ArrowLeft'
	});
testactions.push({
		type:'keydown',
		code:'ArrowRight'
	});
testactions.push({
		type:'keyup',
		code:'ArrowRight'
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
		code:'Digit2'
	});
testactions.push({
		type:'keyup',
		code:'Digit2'
	});
testactions.push({
		type:'keydown',
		code:'Digit0'
	});
testactions.push({
		type:'keyup',
		code:'Digit0'
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
		code:'ArrowDown'
	});
testactions.push({
		type:'keyup',
		code:'ArrowDown'
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
		type:'keydown',
		code:'Backspace'
	});
testactions.push({
		type:'keyup',
		code:'Backspace'
	});
testactions.push({
		type:'keydown',
		code:'Backspace'
	});
testactions.push({
		type:'keyup',
		code:'Backspace'
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
		code:'Digit2'
	});
testactions.push({
		type:'keyup',
		code:'Digit2'
	});
testactions.push({
		type:'keydown',
		code:'Digit0'
	});
testactions.push({
		type:'keyup',
		code:'Digit0'
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
		code:'ArrowUp'
	});
testactions.push({
		type:'keyup',
		code:'ArrowUp'
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
		code:'ArrowUp'
	});
testactions.push({
		type:'keyup',
		code:'ArrowUp'
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
		code:'ArrowUp'
	});
testactions.push({
		type:'keyup',
		code:'ArrowUp'
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
		code:'ArrowUp'
	});
testactions.push({
		type:'keyup',
		code:'ArrowUp'
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
		type:'keyup',
		code:'MetaLeft'
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
		type:'keyup',
		code:'MetaLeft'
	});

harness.runTest(testactions, 'direct');