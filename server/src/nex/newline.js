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


class Newline extends Separator {
	constructor() {
		super("&nbsp;");
	}

	makeCopy() {
		let r = new Newline();
		this.copyFieldsTo(r);
		return r;
	}

	getText() {
		return '\n';
	}

	getKeyFunnel() {
		return new NewlineKeyFunnel(this);
	}

	renderInto(domNode) {
		super.renderInto(domNode);
		domNode.classList.add('newline');
		domNode.classList.add('data');
		this.renderTags(domNode);
	}

	render(parentDomNode, thisDomNode) {
		super.render(parentDomNode, thisDomNode);
		this.domNode.classList.add('newline');
		this.domNode.classList.add('data');
		this.renderTags();
	}
	getEventTable(context) {
		return null;
	}
	// TODO: move tables from these unused functions into getEventTable
	getKeyFunnelVector(context) {
		return {
			'ShiftTab': 'select-parent',
			'Tab': 'select-next-sibling',
			'ArrowUp': 'move-left-up',
			'ArrowDown': 'move-right-down',
			'ArrowLeft': 'move-left-up',
			'ArrowRight': 'move-right-down',
			'ShiftBackspace': 'remove-selected-and-select-previous-sibling',
			'Backspace': 'remove-selected-and-select-previous-sibling',
			'~': 'insert-command-as-next-sibling',
			'!': 'insert-bool-as-next-sibling',
			'@': 'insert-symbol-as-next-sibling',
			'#': 'insert-integer-as-next-sibling',
			'$': 'insert-string-as-next-sibling',
			'%': 'insert-float-as-next-sibling',
			'^': 'insert-nil-as-next-sibling',
				'(': 'insert-word-as-next-sibling',
				'[': 'insert-line-as-next-sibling',
				'{': 'insert-doc-as-next-sibling',
			'defaultHandle': null
		};
	}

}