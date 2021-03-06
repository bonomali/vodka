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

var CLIPBOARD = null;

class Manipulator {

	doCut() {
		CLIPBOARD = selectedNex.makeCopy();
		let x = selectedNex;
		this.selectPreviousSibling() || this.selectParent();		
		this.removeNex(x);
	}

	doCopy() {
		CLIPBOARD = selectedNex.makeCopy();
	}

	doPaste() {
		if (isInsertionPoint(selectedNex)) {
			this.replaceSelectedWith(CLIPBOARD.makeCopy())
		} else {
			this.insertAfterSelectedAndSelect(CLIPBOARD.makeCopy())
		}
	}

	findNextSiblingThatSatisfies(f) {
		while (this.selectNextSibling()) {
			if (f(selectedNex)) {
				return true;
			}
		}
		return false;
	}

	// used for up and down arrows.

	selectCorrespondingLetterInPreviousLine() {
		// get the current line and the previous line.
		let enclosingLine = this.getEnclosingLine(selectedNex);
		if (!enclosingLine) return false;
		let doc = enclosingLine.getParent();
		if (!doc) return false;
		let previousLine = doc.getChildBefore(enclosingLine);
		if (!previousLine) return false;

		let original = selectedNex;
		let targetX = original.getLeftX();
		let c;

		previousLine.setSelected();
		this.selectFirstLeaf();
		let lastX = selectedNex.getLeftX();
		if (targetX <= lastX) {
			return true;
		}

		do {
			if (this.getEnclosingLine(selectedNex) != previousLine) {
				this.selectPreviousLeaf();
				break;
			}
			let x = selectedNex.getLeftX();
			if (x > targetX) {
				// this is the one
				break;
			}
		} while(this.selectNextLeaf());

		return true;
	}

	selectCorrespondingLetterInNextLine() {
		// get the current line and the previous line.
		let enclosingLine = this.getEnclosingLine(selectedNex);
		if (!enclosingLine) return false;
		let doc = enclosingLine.getParent();
		if (!doc) return false;
		let nextLine = doc.getChildAfter(enclosingLine);
		if (!nextLine) return false;

		let original = selectedNex;
		let targetX = original.getLeftX();
		let c;

		nextLine.setSelected();
		this.selectFirstLeaf();
		let lastX = selectedNex.getLeftX();
		if (targetX <= lastX) {
			return true;
		}

		do {
			if (this.getEnclosingLine(selectedNex) != nextLine) {
				this.selectPreviousLeaf();
				break;
			}
			let x = selectedNex.getLeftX();
			if (x > targetX) {
				// this is the one
				break;
			}
		} while(this.selectNextLeaf());

		return true;
	}

	getEnclosingLine(s) {
		while(s = s.getParent()) {
			if (s instanceof Line) {
				return s;
			}
		}
		return null;
	}

	// traversal

	selectPreviousLeaf() {
		let first = selectedNex;
		while(!this.selectPreviousSibling()) {
			let p = this.selectParent();
			if (!p || isCodeContainer(selectedNex)) {
				first.setSelected();
				return false;
			}
		}
		while(!isCodeContainer(selectedNex) && this.selectLastChild());
		return true;
	}

	selectNextLeaf() {
		let first = selectedNex;
		while(!this.selectNextSibling()) {
			let p = this.selectParent();
			if (!p || isCodeContainer(selectedNex)) {
				first.setSelected();
				return false;
			}
		}
		while(!isCodeContainer(selectedNex) && this.selectFirstChild());
		return true;
	}

	selectFirstLeaf() {
		let c = selectedNex;
		while(c instanceof NexContainer && c.hasChildren()) {
			c = c.getFirstChild();
		}
		c.setSelected();
		return true;
	}

	// generic selection stuff

	selectLastChild() {
		let s = selectedNex;
		if (!(s instanceof NexContainer)) return false;
		let c = s.getLastChild();
		if (c) {
			c.setSelected();
			return true;
		}
		return false;
	}

	selectFirstChild() {
		let s = selectedNex;
		if (!(s instanceof NexContainer)) return false;
		let c = s.getFirstChild();
		if (c) {
			c.setSelected();
			return true;
		}
		return false;
	}

	selectNthChild(n) {
		let s = selectedNex;
		if (n >= s.children.length) return false;
		if (n < 0) return false;
		let c = s.children[n];
		if (!c) return false;
		c.setSelected();
		return true;
	}

	selectNextSibling() {
		let s = selectedNex;
		let p = s.getParent();
		if (!p) return false;
		let nextSib = p.getNextSibling(s);
		if (nextSib) {
			nextSib.setSelected();
			return true;
		}
		return false;
	}

	selectPreviousSibling() {
		let s = selectedNex;
		let p = s.getParent();
		if (!p) return false;
		let sib = p.getPreviousSibling(s);
		if (sib) {
			sib.setSelected();
			return true;
		}
		return false;
	}

	selectParent() {
		let s = selectedNex;
		let p = s.getParent();
		if (!p) return false;
		p.setSelected();
		return true;
	}

	// CRUD operations

	appendNewEString() {
		let s = selectedNex;
		let i = 0;
		for(i = 0;
			s.getChildAt(i) && s.getChildAt(i) instanceof EString;
			i++);
		// i is the insertion point
		let n = new EString();
		s.insertChildAt(n, i);
		n.setSelected();
	}

	appendAndSelect(data) {
		let s = selectedNex;
		let newdata = data;
		s.appendChild(newdata);
		newdata.setSelected();
		return true;		
	}

	insertAfterSelected(data) {
		let s = selectedNex;
		let p = s.getParent();
		if (!p) return false;
		p.insertChildAfter(data, s);
		return true;
	}

	insertAfterSelectedAndSelect(data) {
		return this.insertAfterSelected(data)
			&& this.selectNextSibling();
	}

	insertBeforeSelected(data) {
		let s = selectedNex;
		let p = s.getParent();
		if (!p) return false;
		p.insertChildBefore(data, s);
		return true;
	}

	insertBeforeSelectedAndSelect(data) {
		return this.insertBeforeSelected(data)
			&& this.selectPreviousSibling();
	}

	attemptToRemoveLastItemInCommand() {
		let p = selectedNex.getParent();
		if (!p) return false;
		if (p.numChildren() == 1 && isCodeContainer(p)) {
			if (!this.removeNex(selectedNex)) return false;
			p.setSelected();
			this.appendAndSelect(new InsertionPoint());
			return true;
		}
		return false;
	}

	removeSelectedAndSelectPreviousSibling() {
		let toDel = selectedNex;
		return (
			this.attemptToRemoveLastItemInCommand()
			||
			(this.selectPreviousSibling() || this.selectParent())
			&&
			this.removeNex(toDel)
		);	
	}

	removeSelectedAndSelectPreviousLeaf() {
		let toDel = selectedNex;
		return (
			this.attemptToRemoveLastItemInCommand()
			||
			(this.selectPreviousLeaf() || this.selectParent())
			&&
			this.removeNex(toDel)
		);	
	}

	removeNex(toDel) {
		let p = toDel.getParent();
		if (!p) return false;
		if (toDel.isSelected()) {
			p.setSelected();
		}
		p.removeChild(toDel);
		return true;
	}

	replaceSelectedWith(nex) {
		let s = selectedNex;
		if (s === nex) return true; // trivially true
		let p = s.getParent(true);
		if (!p) return false;
		p.replaceChildWith(s, nex);
		nex.setSelected();
		return true;
	}

	replaceSelectedWithNewCommand() {
		let s = selectedNex;
		let p = s.getParent(true);
		if (!p) return false;
		let nex = new Command();
		p.replaceChildWith(s, nex);
		nex.setSelected();
		return true;
	}

	// split/join

	selectTopmostEnclosingLine() {
		let p = selectedNex.getParent();
		if (!p) return false;
		while(!isLine(p)) {
			p = p.getParent();
			if (!p) return false;
		}
		while(isLine(p)) {
			let p2 = p.getParent();
			if (p2 && isLine(p2)) {
				p = p2;
			} else {
				break;
			}
		}
		p.setSelected();
		return true;
	}

	gatherRemainingSiblingsIntoNewLine() {
		let ln = new Line();
		ln.appendChild(new Newline());
		this.moveRemainingSiblingsInto(ln);
		return ln;
	}

	moveRemainingSiblingsInto(nex) {
		let s = selectedNex;
		let p = s.getParent();
		if (!p) return false;
		if (p.getLastChild() == s) {
			return true; // nothing to do
		}
		let c;
		while (c = p.getChildAfter(s)) {
			p.removeChild(c);
			nex.appendChild(c);
		}
//		let p2 = p.getParent();
//		p2.insertChildAfter(on, p);
//		return true;		
	}

	split(nex) {
		let s = selectedNex;
		let p = s.getParent();
		if (!p) return false;
		if (p.getLastChild() == s) {
			return true; // nothing to do
		}
		let c;
		while (c = p.getChildAfter(s)) {
			p.removeChild(c);
			nex.appendChild(c);
		}
		let p2 = p.getParent();
		p2.insertChildAfter(nex, p);
		return true;		
	}

	putAllNextSiblingsInNewLine() {
		return this.split(new Line())
	}

	splitCurrentWordIntoTwo() {
		return this.split(new Word())
	}

	joinSelectedWithNextSibling() {
		// note that after joining, the thing
		// to select is the last thing in
		// the first of the two
		// things being joined.
		let s = selectedNex;
		let toSelect = s.getLastChild();
		if (!toSelect) {
			return false;
		}
		let p = s.getParent();
		if (!p) return false;
		let c = p.getChildAfter(s);
		if (!c) return false;		
		let c2;
		while (c2 = c.removeFirstChild()) {
			s.appendChild(c2);
		}
		// now that c is empty, delete it.
		p.removeChild(c);
		toSelect.setSelected();
		return true;
	}

	join(p, a, b) {
		let c;
		while (c = b.removeFirstChild()) {
			a.appendChild(c);
		}
		// now that c is empty, delete it.
		p.removeChild(b);
		return true;
	}

	joinSelectedToNextSiblingIfSameType() {
		let s = selectedNex;
		let p = s.getParent();
		if (!p) return false;
		let c = p.getChildAfter(s);
		if ((s instanceof Line && c instanceof Line)
				|| (s instanceof Word && c instanceof Word)
				|| (s instanceof Doc && c instanceof Doc)) {
			return this.joinSelectedWithNextSibling();
		}
	}

	joinParentOfSelectedToNextSiblingIfSameType() {
		let s = selectedNex;
		let p = s.getParent();
		if (!p) return false;
		p.setSelected();
		this.joinSelectedToNextSiblingIfSameType();
	}

	joinToSiblingIfSame(s) {
		let p = s.getParent();
		if (!p) return false;
		let c = p.getChildAfter(s);
		if ((s instanceof Line && c instanceof Line)
				|| (s instanceof Word && c instanceof Word)
				|| (s instanceof Doc && c instanceof Doc)) {
			return this.join(p, s, c);
		}
	}

	// wrapping

	wrapSelectedInCommand() {
		let s = selectedNex;
		let p = s.getParent(true);
		if (!p) return false;
		let c = new Command();
		p.replaceChildWith(s, c);
		c.appendChild(s);
		c.setSelected();
		return true;
	}

	// idk

	startNewEString() {
		selectedNex.createNewEString();
		return true;
	}

}