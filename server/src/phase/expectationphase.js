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

class ExpectationPhase extends Phase {
	constructor(nex) {
		super();
		this.nex = nex;
		this.exp = new Expectation();
	}

	start() {
		this.parent = this.nex.getParent();
		this.parent.replaceChildWith(this.nex, this.exp);
		this.exp.appendChild(this.nex);
		super.start();
	}

	getExpectationResult() {
		throw new Error('must implement this');
	}

	finish() {
		this.exp.fulfill(this.getExpectationResult());
	}
}
