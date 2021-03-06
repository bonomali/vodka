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

class SeparatorKeyFunnel extends LetterKeyFunnel {
	appendSeparator(letter) {
		manipulator.insertAfterSelectedAndSelect(new Separator(letter));
	};

	appendText(letter) {
		if (isInDocContext(this.s)) {
			let newword = new Word();
			let newletter = new Letter(letter);
			newword.appendChild(newletter);
			manipulator.insertAfterSelectedAndSelect(newword);
			manipulator.joinToSiblingIfSame(newword);
			newletter.setSelected();
		} else {
			manipulator.insertAfterSelectedAndSelect(new Letter(letter));
		}
	}

	doShiftBackspace() {
		manipulator.removeSelectedAndSelectPreviousLeaf();
		let p = selectedNex.getParent();
		manipulator.joinToSiblingIfSame(p);
	}

	insertNewCodeObject(obj) {
		manipulator.insertAfterSelectedAndSelect(obj);			
	}

	doEnter() {
		let newline = new Newline();
		manipulator.insertAfterSelected(newline)
			&& manipulator.putAllNextSiblingsInNewLine()
			&& newline.setSelected();
	}
}