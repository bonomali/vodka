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

function createTagBuiltins() {
	Builtin.createBuiltin(
		'add-tag',
		[
			{name: 'a0', type:'*', skipeval:true},
			{name: 'a1', type:'EString'}
		],
		function(env, argEnv) {
			let n = env.lb('a0');
			let tagname = env.lb('a1').getFullTypedValue();
			n.addTag(new Tag(tagname));
			return n;
		}
	);

	Builtin.createBuiltin(
		'remove-tag',
		[
			{name: 'a0', type:'*', skipeval:true},
			{name: 'a1', type:'EString'}
		],
		function(env, argEnv) {
			let n = env.lb('a0');
			let tagname = env.lb('a1').getFullTypedValue();
			let tag = new Tag(tagname);
			n.removeTag(tag);
			return n;
		}
	);

	Builtin.createBuiltin(
		'has-tag',
		[
			{name: 'a0', type:'*', skipeval:true},
			{name: 'a1', type:'EString'}
		],
		function(env, argEnv) {
			let n = env.lb('a0');
			let tagname = env.lb('a1').getFullTypedValue();
			let tag = new Tag(tagname);
			if (n.hasTag(tag)) {
				return new Bool(true);
			} else {
				return new Bool(false);
			}
		}
	);
}
