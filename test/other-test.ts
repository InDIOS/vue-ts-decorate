import { Construct, getAllProperties } from '../utils/utilities';
import { assign } from '../utils/tools';

function AllProps(target: any) {
	applyMixins(target, [Disposable, Activatable]);
	let instance = Construct(target);
	// console.log(instance);
	// console.log(getAllProperties(instance));
}

// Disposable Mixin
class Disposable {
	isDisposed: boolean;
	dispose() {
		this.isDisposed = true;
	}

}

// Activatable Mixin
class Activatable {
	isActive: boolean;
	activate() {
		this.isActive = true;
	}
	deactivate() {
		this.isActive = false;
	}
}

@AllProps
class SmartObject implements Disposable, Activatable {

	// Disposable
	isDisposed: boolean/* = false*/;
	dispose: () => void;
	// Activatable
	isActive: boolean/* = false*/;
	activate: () => void;
	deactivate: () => void;

	interact() {
		this.activate();
	}
}

let smartObj = new SmartObject();
smartObj.interact();

////////////////////////////////////////
// In your runtime library somewhere
////////////////////////////////////////

function applyMixins(derivedCtor: any, baseCtors: any[]) {
	baseCtors.forEach(baseCtor => {
		Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
			derivedCtor.prototype[name] = baseCtor.prototype[name];
		});
	});
}

// Merging objects

/*function func() {
	console.log('func');
}

var o1 = { a: 1 };
var o2 = { b: 2 };
var o3 = { c: 3 };

var obj = assign(func, o1, o2, o3);
console.log(obj); // { a: 1, b: 2, c: 3 }
console.log(func);  // { a: 1, b: 2, c: 3 }, target object itself is changed.
obj();
func();*/

// Cloning an object

/*var a, b;

a = { foo: { bar: 'baz' } };  // initial value of a

b = assign({}, a);                 // clone a -> b
a.foo.bar = 'foo';            // change a

console.log(a);               // show a
console.log(b);*/

// Circular References

/*var a, b;

a = { hello: 'world' };

a.myself = a;
b = assign({}, a);
a.myself.hello = 'World';
console.log(a);
console.log(b);*/

// Deep Clone

/*function test() {
	let a = { b: { c: 4 }, d: { e: { f: 1 } } }
	let g = assign({}, a)
	let h = JSON.parse(JSON.stringify(a));
	console.log(g.d) // { e: { f: 1 } }
	g.d.e = 32
	console.log('g.d.e set to 32.') // g.d.e set to 32.
	console.log(g) // { b: { c: 4 }, d: { e: 32 } }
	console.log(a) // { b: { c: 4 }, d: { e: { f: 1 } } }
	console.log(h) // { b: { c: 4 }, d: { e: { f: 1 } } }
	h.d.e = 54
	console.log('h.d.e set to 54.') // h.d.e set to 54.
	console.log(g) // { b: { c: 4 }, d: { e: 32 } }
	console.log(a) // { b: { c: 4 }, d: { e: { f: 1 } } }
	console.log(h) // { b: { c: 4 }, d: { e: 54 } }
}
test();*/
