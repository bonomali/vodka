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

function insertOrAppend(s, obj) {
	if (s.hasChildren()) {
		manipulator.insertAfterSelectedAndSelect(obj);
	} else {
		manipulator.appendAndSelect(obj);
	}
}

var UNHANDLED_KEY = 'unhandled_key'
var ContextType = {};
ContextType.PASSTHROUGH = 0;
ContextType.COMMAND = 1;
ContextType.DOC = 2;

// These KeyResponseFunctions are all untested and not integrated. Need to integrate
// one at a time and test.

var KeyResponseFunctions = {
	// if we make generator functions, like insert-or-append(thing) instead of
	// insert-or-append-command, we have to make it so that we don't accidentally
	// end up constructing the object once and trying to reinsert it.
	// Currently the nexes recreate their key funnel vector every time a key is pressed,
	// but that's obviously inefficient and user created nexes might not do that.

	// movement
	'move-left-up': function(s) {
		manipulator.selectPreviousSibling()
			||  manipulator.insertBeforeSelectedAndSelect(new InsertionPoint());
	},
	'move-right-down': function(s) {
		manipulator.selectNextSibling()
			|| manipulator.insertAfterSelectedAndSelect(new InsertionPoint());
	},
	'move-to-previous-leaf': function(s) {		
		manipulator.selectPreviousLeaf()
			||  manipulator.insertBeforeSelectedAndSelect(new InsertionPoint());
	},
	'move-to-next-leaf': function(s) {		
		manipulator.selectNextLeaf()
			||  manipulator.insertAfterSelectedAndSelect(new InsertionPoint());
	},


	// 'legacy-integer-backspace': function(s) {
	// 	let t = this.s.getRawValue();
	// 	if (t == '0') {
	// 		this.doShiftBackspace();
	// 		return;
	// 	}
	// 	this.s.deleteLastLetter();
	// 	t = this.s.getRawValue();
	// 	if (t == '') {
	// 		this.s.setValue('0');
	// 	}
	// },

	'select-parent': function(s) { manipulator.selectParent(); },
	'select-first-child-or-create-insertion-point': function(s) {
		if (!manipulator.selectFirstChild()) {
			return manipulator.appendAndSelect(new InsertionPoint());
		} else return true;
	},
	// 'select-next-sibling': function(s) { manipulator.selectNextSibling(); },
	// 'select-first-child-or-fail': function(s) { manipulator.selectFirstChild(); },

	// 'select-parent-and-remove-self': function(s) { manipulator.selectParent() && manipulator.removeNex(s); },

	// 'start-modal-editing': function(s) { s.startModalEditing(); },

	// 'replace-selected-with-command': function(s) { manipulator.replaceSelectedWith(new Command()); },
	// 'replace-selected-with-bool': function(s) { manipulator.replaceSelectedWith(new Bool()); },
	// 'replace-selected-with-symbol': function(s) { manipulator.replaceSelectedWith(new ESymbol()); },
	// 'replace-selected-with-integer': function(s) { manipulator.replaceSelectedWith(new Integer()); },
	// 'replace-selected-with-string': function(s) { manipulator.replaceSelectedWith(new EString()); },
	// 'replace-selected-with-float': function(s) { manipulator.replaceSelectedWith(new Float()); },
	// 'replace-selected-with-nil': function(s) { manipulator.replaceSelectedWith(new Nil()); },
	// 'replace-selected-with-word': function(s) { manipulator.replaceSelectedWith(new Word()); },
	// 'replace-selected-with-line': function(s) { manipulator.replaceSelectedWith(new Line()); },
	// 'replace-selected-with-doc': function(s) { manipulator.replaceSelectedWith(new Doc()); },

	// 'insert-or-append-command': function(s) { insertOrAppend(s, new Command()); },
	// 'insert-or-append-bool': function(s) { insertOrAppend(s, new Bool()); },
	// 'insert-or-append-symbol': function(s) { insertOrAppend(s, new ESymbol()); },
	// 'insert-or-append-integer': function(s) { insertOrAppend(s, new Integer()); },
	// 'insert-or-append-string': function(s) { insertOrAppend(s, new EString()); },
	// 'insert-or-append-float': function(s) { insertOrAppend(s, new Float()); },
	// 'insert-or-append-nil': function(s) { insertOrAppend(s, new Nil()); },

	'insert-command-as-next-sibling': function(s) { manipulator.insertAfterSelectedAndSelect(new Command()); },
	'insert-bool-as-next-sibling': function(s) { manipulator.insertAfterSelectedAndSelect(new Bool()); },
	'insert-symbol-as-next-sibling': function(s) { manipulator.insertAfterSelectedAndSelect(new ESymbol()); },
	'insert-integer-as-next-sibling': function(s) { manipulator.insertAfterSelectedAndSelect(new Integer()); },
	'insert-string-as-next-sibling': function(s) { manipulator.insertAfterSelectedAndSelect(new EString()); },
	'insert-float-as-next-sibling': function(s) { manipulator.insertAfterSelectedAndSelect(new Float()); },
	'insert-nil-as-next-sibling': function(s) { manipulator.insertAfterSelectedAndSelect(new Nil()); },
	'insert-lambda-as-next-sibling': function(s) { manipulator.insertAfterSelectedAndSelect(new Lambda()); },
	'insert-word-as-next-sibling': function(s) { manipulator.insertAfterSelectedAndSelect(new Word()); },
	'insert-line-as-next-sibling': function(s) { manipulator.insertAfterSelectedAndSelect(new Line()); },
	'insert-doc-as-next-sibling': function(s) { manipulator.insertAfterSelectedAndSelect(new Doc()); },
	'insert-zlist-as-next-sibling': function(s) { manipulator.insertAfterSelectedAndSelect(new Zlist()); },

	// WIP
	'insert-type-as-next-sibling': function(s) {
		manipulator.insertAfterSelectedAndSelect(new Type());
	},

	'split-word-and-insert-separator': function(s) {
		manipulator.splitCurrentWordIntoTwo()
			&& manipulator.selectParent()
			&& manipulator.insertAfterSelectedAndSelect(new Separator(s));
	},

	'remove-separator-and-possibly-join-words': function(s) {
		manipulator.removeSelectedAndSelectPreviousLeaf();
		let p = selectedNex.getParent();
		manipulator.joinToSiblingIfSame(p);
	},

	// previously, inserting code objects in doc mode from a letter would append them to
	// the parent in a weird way.
	// all deprecated
	'legacy-insert-command-as-next-sibling-of-parent': function(s) { manipulator.selectParent() && manipulator.insertAfterSelectedAndSelect(new Command()); },
	'legacy-insert-bool-as-next-sibling-of-parent': function(s) { manipulator.selectParent() && manipulator.insertAfterSelectedAndSelect(new Bool()); },
	'legacy-insert-symbol-as-next-sibling-of-parent': function(s) { manipulator.selectParent() && manipulator.insertAfterSelectedAndSelect(new ESymbol()); },
	'legacy-insert-integer-as-next-sibling-of-parent': function(s) { manipulator.selectParent() && manipulator.insertAfterSelectedAndSelect(new Integer()); },
	'legacy-insert-string-as-next-sibling-of-parent': function(s) { manipulator.selectParent() && manipulator.insertAfterSelectedAndSelect(new EString()); },
	'legacy-insert-float-as-next-sibling-of-parent': function(s) { manipulator.selectParent() && manipulator.insertAfterSelectedAndSelect(new Float()); },
	'legacy-insert-nil-as-next-sibling-of-parent': function(s) { manipulator.selectParent() && manipulator.insertAfterSelectedAndSelect(new Nil()); },
	'legacy-insert-lambda-as-next-sibling-of-parent': function(s) { manipulator.selectParent() && manipulator.insertAfterSelectedAndSelect(new Lambda()); },


	'insert-letter-after-separator': function(s) {
		let newword = new Word();
		let newletter = new Letter(s);
		newword.appendChild(newletter);
		manipulator.insertAfterSelectedAndSelect(newword);
		manipulator.joinToSiblingIfSame(newword);
		newletter.setSelected();
	},

	// 'move-left-up-and-remove-self': function(s) {
	// 	(manipulator.selectPreviousSibling()
	// 		|| manipulator.selectParent())
	// 	&& manipulator.removeNex(s);
	// },
	// 'move-right-down-and-remove-self': function(s) {
	// 	(manipulator.selectNextSibling()
	// 		||  manipulator.selectParent())
	// 	&& manipulator.removeNex(s);
	// },

	// 'move-to-previous-leaf-and-remove-self': function(s) {		
	// 	manipulator.selectPreviousLeaf()
	// 	&& manipulator.removeNex(s);
	// },
	// 'move-to-next-leaf-and-remove-self': function(s) {		
	// 	manipulator.selectNextLeaf()
	// 	&& manipulator.removeNex(s);
	// },
	'move-to-corresponding-letter-in-previous-line': function(s) {
		manipulator.selectCorrespondingLetterInPreviousLine()
			 || manipulator.selectPreviousSibling()
			 ||  manipulator.insertBeforeSelectedAndSelect(new InsertionPoint())
			;
	},
	'move-to-corresponding-letter-in-next-line': function(s) {
		manipulator.selectCorrespondingLetterInNextLine()
			 || manipulator.selectNextSibling()
			 ||  manipulator.insertAfterSelectedAndSelect(new InsertionPoint())
			;
	},


	// 'insert-or-append-word': function(s) { insertOrAppend(s, new Word()); },
	// 'insert-or-append-line': function(s) { insertOrAppend(s, new Line()); },
	// 'insert-or-append-doc': function(s) { insertOrAppend(s, new Doc()); },
	// 'insert-or-append-word-to-doc': function(s) {
	// 	if (s.hasChildren()) {
	// 		manipulator.insertAfterSelectedAndSelect(new Word());
	// 	} else {
	// 		manipulator.appendAndSelect(new Line());
	// 		manipulator.appendAndSelect(new Word());
	// 	}
	// },
	// 'insert-or-append-doc-to-doc': function(s) {
	// 	if (s.hasChildren()) {
	// 		manipulator.insertAfterSelectedAndSelect(new Doc());
	// 	} else {
	// 		manipulator.appendAndSelect(new Line());
	// 		manipulator.appendAndSelect(new Doc());
	// 	}
	// },

	// 'remove-if-empty': function(s) {
	// 	if (!s.hasChildren()) {
	// 		manipulator.removeSelectedAndSelectPreviousLeaf();
	// 	}
	// },

	'call-delete-handler-then-remove-selected-and-select-previous-sibling': function(s) {
		s.callDeleteHandler();
		manipulator.removeSelectedAndSelectPreviousSibling();
	},

	'remove-selected-and-select-previous-sibling': function(s) {
		manipulator.removeSelectedAndSelectPreviousSibling();
	},
	// 'delete-last-letter-or-remove-selected-and-select-previous-sibling': function(s) {
	// 	if (!s.isEmpty()) {
	// 		s.deleteLastLetter();
	// 	} else {
	// 		manipulator.removeSelectedAndSelectPreviousSibling();
	// 	}
	// },
	// 'delete-last-letter-or-remove-selected-and-select-previous-leaf': function(s) {
	// 	if (!s.isEmpty()) {
	// 		s.deleteLastLetter();
	// 	} else {
	// 		manipulator.removeSelectedAndSelectPreviousLeaf();
	// 	}
	// },

	'remove-selected-and-select-previous-leaf': function(s) {
		let p = s.getParent();
		manipulator.removeSelectedAndSelectPreviousLeaf();
		if (!p.hasChildren()) {
			manipulator.removeNex(p);
		}
	},
	// // deprecated I think
	// 'legacy-remove-selected-and-select-previous-leaf': function(s) {
	// 	manipulator.removeSelectedAndSelectPreviousLeaf();
	// },



 	// 'remove-selected-insertion-point-and-select-previous-leaf': function(s) {
	// 	if (manipulator.selectPreviousLeaf()) {
	// 		let parent = s.getParent();
	// 		manipulator.removeNex(s);
	// 		if (!parent.hasChildren()) {
	// 			manipulator.removeNex(parent);
	// 		}
	// 	} else {
	// 		manipulator.selectParent();
	// 		manipulator.removeNex(s);
	// 	}
	// },

	// 'legacy-unchecked-remove-selected-and-select-previous-leaf': function(s) {
	// 	manipulator.selectPreviousLeaf() || manipulator.selectParent();
	// 	manipulator.removeNex(this.s);
	// },



	// 'delete-last-letter-or-remove-selected-and-select-previous-leaf': function(s) {
	// 	(!s.isEmpty()) ? s.deleteLastLetter() : manipulator.removeSelectedAndSelectPreviousLeaf();
	// },

	// 'just-make-new-line': function(s) {
	// 	manipulator.insertAfterSelectedAndSelect(new Line());
	// },
	'do-line-break-after-letter': function(s) {
		let newline = new Newline();
		if (isWord(s.getParent())) {
			manipulator.splitCurrentWordIntoTwo()
				&& manipulator.selectParent()
				&& manipulator.insertAfterSelected(newline)
				&& manipulator.putAllNextSiblingsInNewLine()
				&& newline.setSelected();			
		} else {
			// treat as separator.
			manipulator.insertAfterSelected(newline)
				&& manipulator.putAllNextSiblingsInNewLine()
				&& newline.setSelected();

		}
	},
	// 'create-new-line-from-inside-line': function(s) {
	// 	manipulator.putAllNextSiblingsInNewLine()
	// 	||
	// 	(
	// 		manipulator.selectParent()
	// 		&& manipulator.insertAfterSelectedAndSelect(new Line())
	// 		)
	// },


	// I hate commas
	'':''
}

class KeyDispatcher {
	dispatch(keycode, whichkey, hasShift, hasCtrl, hasAlt) {
		let keyContext = ContextType.COMMAND;
		let p = selectedNex.getParent();
		if (p) {
			while((keyContext = p.getContextType()) == ContextType.PASSTHROUGH) {
				p = p.getParent();
			}
		}
		let eventName = this.getEventName(keycode, hasShift, hasCtrl, hasAlt);
		// there are a few special cases
		if (eventName == '|') {
			// vertical bar is unusable - 'internal use only'
			return false; // to cancel browser event
		} else if (eventName == 'Alt-x') {
			manipulator.doCut();
			return false; // to cancel browser event
		} else if (eventName == 'Alt-c') {
			manipulator.doCopy();
			return false; // to cancel browser event
		} else if (eventName == 'Alt-v') {
			manipulator.doPaste();
			return false; // to cancel browser event
		} else if (eventName == 'Escape') {
			this.doEscape();
			return false; // to cancel browser event
		} else if (eventName == 'AltEnter') {
			this.doAltEnter();
			return false; // to cancel browser event
		// TODO: string opening and closing is mapped to shift-enter,
		// but this should be reserved for only executing code.
//		} else if (eventName == 'ShiftEnter') {
//			this.doShiftEnter();
//			return false; // to cancel browser event
		} else if (eventName == '`') {
			// reserved for future use
			return false; // to cancel browser event
		} else {
			// otherwise try the table first, then the keyfunnel
			let table = selectedNex.getEventTable(keyContext);
			if (table) {
				if (table[eventName]) {
					if (table[eventName] instanceof Nex) {
						evaluateNex(table[eventName]);
					} else {
						KeyResponseFunctions[table[eventName]](selectedNex);
						return false; // to cancel browser event
					}
				}
				if (table.defaultHandle) {
					try {
						table.defaultHandle(eventName);
					} catch (e) {
						if (e == UNHANDLED_KEY) {
							console.log("UNHANDLED KEY " +
											':' + 'keycode=' + keycode +
											',' + 'whichkey=' + whichkey +
											',' + 'hasShift=' + hasShift +
											',' + 'hasCtrl=' + hasCtrl +
											',' + 'hasAlt=' + hasAlt);
							return true;
						} else throw e;
					}
					return false; // to cancel browser event
				}
			}
			// fall back to legacy code
			let funnel = selectedNex.getInputFunnel();
			if (funnel) {
				let r = funnel.processEvent(keycode, whichkey, hasShift, hasCtrl, hasAlt);
				return r;
			}
			// didn't handle event, let the browser handle it.
			return true;
		}
	}

	getEventName(keycode, hasShift, hasCtrl, hasAlt) {
		if (keycode == 'Enter' && hasAlt) {
			return 'AltEnter';
		} else if (keycode == 'Enter' && hasShift) {
			return 'ShiftEnter';
		} else if (keycode == 'Tab' && hasShift) {
			return 'ShiftTab';
		} else if (keycode == ' ' && hasShift) {
			return 'ShiftSpace';
		// } else if (keycode == ' ') {
		// 	return 'Space';
		} else if (keycode == 'Backspace' && hasShift) {
			return 'ShiftBackspace';
		} else if (keycode == 'x' && hasAlt) {
			return 'Alt-x';
		} else if (keycode == 'c' && hasAlt) {
			return 'Alt-c';
		} else if (keycode == 'v' && hasAlt) {
			return 'Alt-v';
		} else {
			return keycode;
		}
	}

	doEscape() {
		current_render_type = (
			current_render_type == NEX_RENDER_TYPE_EXPLODED
			? NEX_RENDER_TYPE_NORMAL
			:  NEX_RENDER_TYPE_EXPLODED
			);
		root.setRenderType(current_render_type);
	}

	doShiftEnter() {
		let n = this.evaluateNex(selectedNex);
		if (n) {
			manipulator.replaceSelectedWith(n);			
		}
	}

	evaluateNex(nex) {
		let result;
		try {
			result = nex.evaluate(BUILTINS);
		} catch (e) {
			if (e instanceof EError) {
				result = e;
			} else {
				throw e;
			}
		}
		return result;
	}


	doAltEnter() {
		let s = selectedNex;
		let phaseExecutor = s.phaseExecutor;
		let firstStep = false;
		if (!phaseExecutor) {
			firstStep = true;
			phaseExecutor = new PhaseExecutor();
			s.pushNexPhase(phaseExecutor, BUILTINS);
		}
		phaseExecutor.doNextStep();
		if (!phaseExecutor.finished()) {
			// the resolution of an expectation will change the selected nex,
			// so need to set it back
			if (firstStep) {
				// the first step is PROBABLY an expectation phase
				let operativeNex = s.getParent();
				operativeNex.setSelected();
				operativeNex.phaseExecutor = phaseExecutor;
			} else {
				s.setSelected();
			}
		} else {
			// if I don't explicitly set the selected nex, it'll be the
			// result of the last resolved expectation, probably
			s.phaseExecutor = null;
		}
	}
}