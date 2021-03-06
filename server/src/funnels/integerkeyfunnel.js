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



class IntegerKeyFunnel extends ValueKeyFunnel {
	constructor(sel) {
		super(sel);
	}

	appendWithChecks(txt) {
		let t = this.s.getRawValue();
		if (t == '0') {
			if (txt == '0') {
				return;
			} else {
				this.s.setValue(txt);
			}
		} else if (t == '-') {
			if (txt == '0') {
				return;
			} else {
				this.s.appendText(txt);
			}
		} else {
			if (txt == '-') {
				return;
			} else {
				this.s.appendText(txt);
			}
		}
	}

	doBackspace() {
		let t = this.s.getRawValue();
		if (t == '0') {
			this.doShiftBackspace();
			return;
		}
		this.s.deleteLastLetter();
		t = this.s.getRawValue();
		if (t == '') {
			this.s.setValue('0');
		}
	}


	appendText(txt) {
		let allowed = /^[0-9]$/;
		if (allowed.test(txt)) {
			this.appendWithChecks(txt);
		} else {
			manipulator.insertAfterSelectedAndSelect(new Word())
				&& selectedNex.getKeyFunnel().appendText(txt);			
		}
	}

	appendSeparator(txt) {
		let allowedIntegerNumberChar = /^[-]$/;
		if (allowedIntegerNumberChar.test(txt)) {
			this.appendWithChecks(txt);
		} else {
			manipulator.insertAfterSelectedAndSelect(new Separator(txt));
		}
	}
}