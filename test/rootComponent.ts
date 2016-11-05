import { Component, Prop, Watch, On, Once } from '../index';

let testElement = document.createElement('div');
testElement.id = 'test';
document.body.insertBefore(testElement, document.body.firstChild);

@Component({ el: '#test' })
class TestComponent {
	someProperty: string = 'Hello!';
	testProp: { prop: string } = { prop: 'test prop' };

	@Prop()
	someProp: string;

	@Prop({
		type: String
	})
	someDefaultProp: string = 'some default value';

	@Prop()
	someObjProp: { someDefault: string } = { someDefault: 'value' };

	@Prop()
	someFuncProp() {
		return;
	}

	testMethod() {
		return;
	}

	ready() {
		return;
	}

	@Watch('testProp', { deep: true })
	testPropWatcher(newVal, oldVal) {
		return;
	}

	@Watch('someProperty')
	somePropertyWatcher(newVal, oldVal) {
		return;
	}

	@On('eventToEmit')
	someEvent() {
		return;
	}

	@Once('eventToEmitOnce')
	someEventOnce() {
		return;
	}
}

export = TestComponent;