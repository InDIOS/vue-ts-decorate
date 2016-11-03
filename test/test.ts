import { Construct, camelToKebabCase } from '../utils/utilities';
import { Component, Watch, On, Prop, Action, Getter, Mixin, Directive, Filter, VueDirective } from '../index';

function getProps(target: any) {
	let instance = Construct(target);
	console.log(instance.$mixin$);
}

function FakeMixin(options?: any) {
	return function (target: any) {
		console.log(target.prototype);
	}
}

@Mixin()
class ParentAncestor {
	someParentAncestorProperty: string = 'ParentAncestor Property';

	data() {
		return;
	}

	@Watch('someParentAncestorProperty')
	someParentAncestorMethod(): string {
		return 'ParentAncestor Method';
	}
}

@Mixin({
	template: 'Ancestor Template'
})
class Ancestor extends ParentAncestor {
	@Getter('module.prop')
	someAncestorProperty: string;

	@Filter	
	someAncestorMethod() {
		return 'Ancestor Method';
	}

	@On('someEvent')
	someAncestorEvent() {
		return 'Ancestor Method';
	}
}

// console.log(Ancestor);

function someAction() { }

@Mixin()
class Parent /*extends Ancestor*/ {
	@Prop()
	someParentProperty = () => 'Parent property';
	@Action(someAction)
	someParentAction: () => void;

	get someGetProperty() {
		return;
	}

	someAncestorMethod() {
		return 'Ancestor Method overrided';
	}

	ready() {
		return 'Ready Mixin Method';
	}
}

@Directive({ local: true })
class DemoDirective extends VueDirective {
	update(){}
	unbind(){}
}

@Component({ mixins: [ParentAncestor], directives: { DemoDirective }  })
class Child extends Parent implements ParentAncestor {
	data: () => void;
	someParentAncestorProperty: string;
	someParentAncestorMethod: () => string;

	someChildProperty: string = 'Child Property';

	someChildMethod() {
		return 'Child Method';
	}
}

console.log((<any>Child));
