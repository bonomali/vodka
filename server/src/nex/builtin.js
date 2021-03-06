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



class Builtin extends Lambda {
	constructor(name, params, phaseFactory) {
		super();
		this.name = name;
		this.params = params;
		this.f = null;
		this.lexicalEnv = BUILTINS;

		this.phaseFactory =
			phaseFactory 
				? phaseFactory
				: function(phaseExecutor, nex, env) {
					return new BuiltinCommandPhase(phaseExecutor, nex, env);
				  };
	}

	makeCopy() {
		let r = new Builtin(this.name, this.params, this.subPhaseFactory);
		this.copyFieldsTo(r);
		return r;
	}

	toString() {
		return `[BUILTIN:${this.name}]`;
	}

	setF(f) {
		this.f = f.bind(this);
	}

	static createBuiltin(name, params, f, argEvalFactory) {
		for (let i = 0; i < params.length; i++) {
			params[i].name = BUILTIN_ARG_PREFIX + params[i].name;
		}
		let nex = new Builtin(name, params, argEvalFactory ? argEvalFactory : null);
		nex.setF(f);
		Builtin.bindBuiltinObject(name, nex);
	}

	static bindBuiltinObject(name, nex) {
		BUILTINS.bindUnique(name, nex);
//		nex.evaluate(BUILTINS);
	}

	executor(closure, executionEnv) {
		return this.f(closure, executionEnv);
	}

	getArgEvaluator(args, argEnv, closure) {
		if (this.argEvalFactory) {
			return this.argEvalFactory(this.name, this.params, args, argEnv, closure);
		} else {
			return new BuiltinArgEvaluator(this.name, this.params, args, argEnv, closure);
		}
	}

	getEventTable(context) {
		return null;
	}
	// TODO: move tables from these unused functions into getEventTable

}

