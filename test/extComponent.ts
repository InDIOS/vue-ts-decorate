import { Component, Prop, Watch, On, Once } from '../index';

@Component({ template: '<h1>{{ msg }}</h1>' })
class ExtComponent {
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

export = ExtComponent;